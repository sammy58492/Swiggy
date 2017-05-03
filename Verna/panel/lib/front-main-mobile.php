<?php
define("IS_PAYPAL_ENABLED", 1);
    
/**
* SPBAS License Validation
*
* @license 		Commercial / Proprietary
* @copyright	SolidPHP, Inc.
* @package		SPBAS_License_Method
* @author		Andy Rockwell <support@solidphp.com>
*/
class spbas
	{
	var $errors;
	var $license_key;
	var $api_server;
	var $remote_port;
	var $remote_timeout;
	var $local_key_storage;
	var $read_query;
	var $update_query;
	var $local_key_path;
	var $local_key_name;
	var $local_key_transport_order;
	var $local_key_grace_period;
	var $local_key_last;
	var $validate_download_access;
	var $release_date;
	var $key_data;
	var $status_messages;
	var $valid_for_product_tiers;

	function spbas()
		{
		$this->errors=false;
		$this->remote_port=80;
		$this->remote_timeout=10;
		$this->valid_local_key_types=array('spbas');
		$this->local_key_type='spbas';
		$this->local_key_storage='filesystem';
		$this->local_key_grace_period=0;
		$this->local_key_last=0;
		$this->read_query=false;
		$this->update_query=false;
		$this->local_key_path='./';
		$this->local_key_name='license.txt';
		$this->local_key_transport_order='scf';
		$this->validate_download_access=false;
		$this->release_date=false;
		$this->valid_for_product_tiers=false;

		$this->key_data=array(
						'custom_fields' => array(),
						'download_access_expires' => 0,
						'license_expires' => 0,
						'local_key_expires' => 30,
						'status' => 'Invalid',
						);

		$this->status_messages=array(
						'active' => 'This license is active.',
						'suspended' => 'Error: This license has been suspended.',
						'expired' => 'Error: This license has expired.',
						'pending' => 'Error: This license is pending review.',
						'download_access_expired' => 'Error: This version of the software was released '.
													 'after your download access expired. Please '.
													 'downgrade or contact support for more information.',
						'missing_license_key' => 'Error: The license key variable is empty.',
						'unknown_local_key_type' => 'Error: An unknown type of local key validation was requested.',
						'could_not_obtain_local_key' => 'Error: I could not obtain a new local license key.',
						'maximum_grace_period_expired' => 'Error: The maximum local license key grace period has expired.',
						'local_key_tampering' => 'Error: The local license key has been tampered with or is invalid.',
						'local_key_invalid_for_location' => 'Error: The local license key is invalid for this location.',
						'missing_license_file' => "Error: Please create the following file (and directories if they don't exist already):<br />\r\n<br />\r\n",
						'license_file_not_writable' => 'Error: Please make the following path writable:<br />',
						'invalid_local_key_storage' => 'Error: I could not determine the local key storage on clear.',
						'could_not_save_local_key' => 'Error: I could not save the local license key.',
						'license_key_string_mismatch' => 'Error: The local key is invalid for this license.',
						);

		// replace plain text messages with tags, make the tags keys for this localization array on the server side.
		// move all plain text messages to tags & localizations
		$this->localization=array(
						'active' => 'This license is active.',
						'suspended' => 'Error: This license has been suspended.',
						'expired' => 'Error: This license has expired.',
						'pending' => 'Error: This license is pending review.',
						'download_access_expired' => 'Error: This version of the software was released '.
													 'after your download access expired. Please '.
													 'downgrade or contact support for more information.',
						);
		}

	/**
	* Validate the license
	*
	* @return string
	*/
	function validate()
		{
		// Make sure we have a license key.
		if (!$this->license_key)
			{
			return $this->errors=$this->status_messages['missing_license_key'];
			}

		// Make sure we have a valid local key type.
		if (!in_array(strtolower($this->local_key_type), $this->valid_local_key_types))
			{
			return $this->errors=$this->status_messages['unknown_local_key_type'];
			}

		// Read in the local key.
		$this->trigger_grace_period=$this->status_messages['could_not_obtain_local_key'];
		switch($this->local_key_storage)
			{
			case 'database':
				$local_key=$this->db_read_local_key();
				break;

			case 'filesystem':
				$local_key=$this->read_local_key();
				break;

			default:
				return $this->errors=$this->status_messages['missing_license_key'];
			}

		// The local key has expired, we can't go remote and we have grace periods defined.
		if ($this->errors==$this->trigger_grace_period&&$this->local_key_grace_period)
			{
			// Process the grace period request
			$grace=$this->process_grace_period($this->local_key_last);
			if ($grace['write'])
				{
				// We've consumed one of the allowed grace periods.
				if ($this->local_key_storage=='database')
					{
					$this->db_write_local_key($grace['local_key']);
					}
				elseif ($this->local_key_storage=='filesystem')
					{
					$this->write_local_key($grace['local_key'], "{$this->local_key_path}{$this->local_key_name}");
					}
				}

			// We've consumed all the allowed grace periods.
			if ($grace['errors']) { return $this->errors=$grace['errors']; }

			// We are in a valid grace period, let it slide!
			$this->errors=false;
			return $this;
			}

		// Did reading in the local key go ok?
		if ($this->errors)
			{
			return $this->errors;
			}

		// Validate the local key.
		return $this->validate_local_key($local_key);
		}

	/**
	* Calculate the maximum grace period in unix timestamp.
	*
	* @param integer $local_key_expires
	* @param integer $grace
	* @return integer
	*/
	function calc_max_grace($local_key_expires, $grace)
		{
		return ((integer)$local_key_expires+((integer)$grace*86400));
		}

	/**
	* Process the grace period for the local key.
	*
	* @param string $local_key
	* @return string
	*/
	function process_grace_period($local_key)
		{
		// Get the local key expire date
		$local_key_src=$this->decode_key($local_key);
		$parts=$this->split_key($local_key_src);
		$key_data=unserialize($parts[0]);
		$local_key_expires=(integer)$key_data['local_key_expires'];
		unset($parts, $key_data);

		// Build the grace period rules
		$write_new_key=false;
		$parts=explode("\n\n", $local_key); $local_key=$parts[0];
		foreach ($local_key_grace_period=explode(',', $this->local_key_grace_period) as $key => $grace)
			{
			// add the separator
			if (!$key) { $local_key.="\n"; }

			// we only want to log days past
			if ($this->calc_max_grace($local_key_expires, $grace)>time()) { continue; }

			// log the new attempt, we'll try again next time
			$local_key.="\n{$grace}";

			$write_new_key=true;
			}

		// Are we at the maximum limit?
		if (time()>$this->calc_max_grace($local_key_expires, array_pop($local_key_grace_period)))
			{
			return array('write' => false, 'local_key' => '', 'errors' => $this->status_messages['maximum_grace_period_expired']);
			}

		return array('write' => $write_new_key, 'local_key' => $local_key, 'errors' => false);
		}

	/**
	* Are we still in a grace period?
	*
	* @param string $local_key
	* @param integer $local_key_expires
	* @return integer
	*/
	function in_grace_period($local_key, $local_key_expires)
		{
		$grace=$this->split_key($local_key, "\n\n");
		if (!isset($grace[1])) { return -1; }

		return (integer)($this->calc_max_grace($local_key_expires, array_pop(explode("\n", $grace[1])))-time());
		}

	/**
	* Validate the local license key.
	*
	* @param string $local_key
	* @return string
	*/
	function decode_key($local_key)
		{
		return base64_decode(str_replace("\n", '', urldecode($local_key)));
		}

	/**
	* Validate the local license key.
	*
	* @param string $local_key
	* @param string $token		{spbas} or \n\n
	* @return string
	*/
	function split_key($local_key, $token='{spbas}')
		{
		return explode($token, $local_key);
		}

	/**
	* Does the key match anything valid?
	*
	* @param string $key
	* @param array $valid_accesses
	* @return array
	*/
	function validate_access($key, $valid_accesses)
		{
		return in_array($key, (array)$valid_accesses);
		}

	/**
	* Create an array of wildcard IP addresses
	*
	* @param string $key
	* @param array $valid_accesses
	* @return array
	*/
	function wildcard_ip($key)
		{
		$octets=explode('.', $key);

		array_pop($octets);
		$ip_range[]=implode('.', $octets).'.*';

		array_pop($octets);
		$ip_range[]=implode('.', $octets).'.*';

		array_pop($octets);
		$ip_range[]=implode('.', $octets).'.*';

		return $ip_range;
		}

	/**
	* Create an array of wildcard IP addresses
	*
	* @param string $key
	* @param array $valid_accesses
	* @return array
	*/
	function wildcard_domain($key)
		{
		return '*.'.str_replace('www.', '', $key);
		}

	/**
	* Create a wildcard server hostname
	*
	* @param string $key
	* @param array $valid_accesses
	* @return array
	*/
	function wildcard_server_hostname($key)
		{
		$hostname=explode('.', $key);
		unset($hostname[0]);

		$hostname=(!isset($hostname[1]))?array($key):$hostname;

		return '*.'.implode('.', $hostname);
		}

	/**
	* Extract a specific set of access details from the instance
	*
	* @param array $instances
	* @param string $enforce
	* @return array
	*/
	function extract_access_set($instances, $enforce)
		{
		foreach ($instances as $key => $instance)
			{
			if ($key!=$enforce) { continue; }
			return $instance;
			}

		return array();
		}

	/**
	* Validate the local license key.
	*
	* @param string $local_key
	* @return string
	*/
	function validate_local_key($local_key)
		{
		// Convert the license into a usable form.
		$local_key_src=$this->decode_key($local_key);

		// Break the key into parts.
		$parts=$this->split_key($local_key_src);

		// If we don't have all the required parts then we can't validate the key.
		if (!isset($parts[1]))
			{
			return $this->errors=$this->status_messages['local_key_tampering'];
			}

		// Make sure the data wasn't forged.
		if (md5($this->secret_key.$parts[0])!=$parts[1])
			{
			return $this->errors=$this->status_messages['local_key_tampering'];
			}
		unset($this->secret_key);

		// The local key data in usable form.
		$key_data=unserialize($parts[0]);
		$instance=$key_data['instance']; unset($key_data['instance']);
		$enforce=$key_data['enforce']; unset($key_data['enforce']);
		$this->key_data=$key_data;

		// Make sure this local key is valid for the license key string
		if ((string)$key_data['license_key_string']!=(string)$this->license_key)
			{
			return $this->errors=$this->status_messages['license_key_string_mismatch'];
			}

		// Make sure we are dealing with an active license.
		if ((string)$key_data['status']!='active')
			{
			return $this->errors=$this->status_messages[$key_data['status']];
			}

		// License string expiration check
		if ((string)$key_data['license_expires']!='never'&&(integer)$key_data['license_expires']<time())
			{
			return $this->errors=$this->status_messages['expired'];
			}

		// Local key expiration check
		if ((string)$key_data['local_key_expires']!='never'&&(integer)$key_data['local_key_expires']<time())
			{
			if ($this->in_grace_period($local_key, $key_data['local_key_expires'])<0)
				{
				// It's absolutely expired, go remote for a new key!
				$this->clear_cache_local_key(true);
				return $this->validate();
				}
			}

		// Download access check
		if ($this->validate_download_access
			&&strtolower($key_data['download_access_expires'])!='never'
			&&(integer)$key_data['download_access_expires']<strtotime($this->release_date))
			{
			return $this->errors=$this->status_messages['download_access_expired'];
			}

		// Is this key valid for this location?
		$conflicts=array();
		$access_details=$this->access_details();
		foreach ((array)$enforce as $key)
			{
			$valid_accesses=$this->extract_access_set($instance, $key);
			if (!$this->validate_access($access_details[$key], $valid_accesses))
				{
				$conflicts[$key]=true;

				// check for wildcards
				if (in_array($key, array('ip', 'server_ip')))
					{
					foreach ($this->wildcard_ip($access_details[$key]) as $ip)
						{
						if ($this->validate_access($ip, $valid_accesses))
							{
							unset($conflicts[$key]);
							break;
							}
						}
					}
				elseif (in_array($key, array('domain')))
					{
					if ($this->validate_access($this->wildcard_domain($access_details[$key]) , $valid_accesses))
						{
						unset($conflicts[$key]);
						}
					}
				elseif (in_array($key, array('server_hostname')))
					{
					if ($this->validate_access($this->wildcard_server_hostname($access_details[$key]) , $valid_accesses))
						{
						unset($conflicts[$key]);
						}
					}
				}
			}

		// Is the local key valid for this location?
		if (!empty($conflicts))
			{
			return $this->errors=$this->status_messages['local_key_invalid_for_location'];
			}
		}

	/**
	* Read in a new local key from the database.
	*
	* @return string
	*/
	function db_read_local_key()
		{
		$query=@mysql_query($this->read_query);
		if ($mysql_error=mysql_error()) { return $this -> errors="Error: {$mysql_error}"; }

		$result=@mysql_fetch_assoc($query);
		if ($mysql_error=mysql_error()) { return $this -> errors="Error: {$mysql_error}"; }

		// is the local key empty?
		if (!$result['local_key'])
			{
			// Yes, fetch a new local key.
			$result['local_key']=$this->fetch_new_local_key();

			// did fetching the new key go ok?
			if ($this->errors) { return $this->errors; }

			// Write the new local key.
			$this->db_write_local_key($result['local_key']);
			}

		 // return the local key
		return $this->local_key_last=$result['local_key'];
		}

	/**
	* Write the local key to the database.
	*
	* @return string|boolean string on error; boolean true on success
	*/
	function db_write_local_key($local_key)
		{
		@mysql_query(str_replace('{local_key}', $local_key, $this->update_query));
		if ($mysql_error=mysql_error()) { return $this -> errors="Error: {$mysql_error}"; }

		return true;
		}

	/**
	* Read in the local license key.
	*
	* @return string
	*/
	function read_local_key()
		{
		if (!file_exists($path="{$this->local_key_path}{$this->local_key_name}"))
			{
			return $this -> errors=$this->status_messages['missing_license_file'].$path;
			}

		if (!is_writable($path))
			{
			return $this -> errors=$this->status_messages['license_file_not_writable'].$path;
			}

		// is the local key empty?
		if (!$local_key=@file_get_contents($path))
			{
			// Yes, fetch a new local key.
			$local_key=$this->fetch_new_local_key();

			// did fetching the new key go ok?
			if ($this->errors) { return $this->errors; }

			// Write the new local key.
			$this->write_local_key(urldecode($local_key), $path);
			}

		 // return the local key
		return $this->local_key_last=$local_key;
		}

	/**
	* Clear the local key file cache by passing in ?clear_local_key_cache=y
	*
	* @param boolean $clear
	* @return string on error
	*/
	function clear_cache_local_key($clear=false)
		{
		switch(strtolower($this->local_key_storage))
			{
			case 'database':
				$this->db_write_local_key('');
				break;

			case 'filesystem':
				$this->write_local_key('', "{$this->local_key_path}{$this->local_key_name}");
				break;

			default:
				return $this -> errors=$this->status_messages['invalid_local_key_storage'];
			}
		}

	/**
	* Write the local key to a file for caching.
	*
	* @param string $local_key
	* @param string $path
	* @return string|boolean string on error; boolean true on success
	*/
	function write_local_key($local_key, $path)
		{
		$fp=@fopen($path, 'w');
		if (!$fp) { return $this -> errors=$this->status_messages['could_not_save_local_key']; }
		@fwrite($fp, $local_key);
		@fclose($fp);

		return true;
		}

	/**
	* Query the API for a new local key
	*
	* @return string|false string local key on success; boolean false on failure.
	*/
	function fetch_new_local_key()
		{
		// build a querystring
		$querystring="mod=license&task=SPBAS_validate_license&license_key={$this->license_key}&";
		$querystring.=$this->build_querystring($this->access_details());

		// was there an error building the access details?
		if ($this->errors) { return false; }

		$priority=$this->local_key_transport_order;
		while (strlen($priority))
			{
			$use=substr($priority, 0, 1);

			// try fsockopen()
			if ($use=='s')
				{
				if ($result=$this->use_fsockopen($this->api_server, $querystring))
					{
					break;
					}
				}

			// try curl()
			if ($use=='c')
				{
				if ($result=$this->use_curl($this->api_server, $querystring))
					{
					break;
					}
				}

			// try fopen()
			if ($use=='f')
				{
				if ($result=$this->use_fopen($this->api_server, $querystring))
					{
					break;
					}
				}

			$priority=substr($priority, 1);
			}

		if (!$result)
			{
			$this->errors=$this->status_messages['could_not_obtain_local_key'];
			return false;
			}

		if (substr($result, 0, 7)=='Invalid')
			{
			$this->errors=str_replace('Invalid', 'Error', $result);
			return false;
			}

		if (substr($result, 0, 5)=='Error')
			{
			$this->errors=$result;
			return false;
			}

		return $result;
		}

	/**
	* Convert an array to querystring key/value pairs
	*
	* @param array $array
	* @return string
	*/
	function build_querystring($array)
		{
		$buffer='';
		foreach ((array)$array as $key => $value)
			{
			if ($buffer) { $buffer.='&'; }
			$buffer.="{$key}={$value}";
			}

		return $buffer;
		}

	/**
	* Build an array of access details
	*
	* @return array
	*/
	function access_details()
		{
		$access_details=array();

		// Try phpinfo()
		if (function_exists('phpinfo'))
			{
			ob_start();
			phpinfo();
			$phpinfo=ob_get_contents();
			ob_end_clean();

			$list=strip_tags($phpinfo);
			$access_details['domain']=$this->scrape_phpinfo($list, 'HTTP_HOST');
			$access_details['ip']=$this->scrape_phpinfo($list, 'SERVER_ADDR');
			$access_details['directory']=$this->scrape_phpinfo($list, 'SCRIPT_FILENAME');
			$access_details['server_hostname']=$this->scrape_phpinfo($list, 'System');
			$access_details['server_ip']=@gethostbyname($access_details['server_hostname']);
			}

		// Try legacy.
		$access_details['domain']=($access_details['domain'])?$access_details['domain']:$_SERVER['HTTP_HOST'];
		$access_details['ip']=($access_details['ip'])?$access_details['ip']:$this->server_addr();
		$access_details['directory']=($access_details['directory'])?$access_details['directory']:$this->path_translated();
		$access_details['server_hostname']=($access_details['server_hostname'])?$access_details['server_hostname']:@gethostbyaddr($access_details['ip']);
		$access_details['server_hostname']=($access_details['server_hostname'])?$access_details['server_hostname']:'Unknown';
		$access_details['server_ip']=($access_details['server_ip'])?$access_details['server_ip']:@gethostbyaddr($access_details['ip']);
		$access_details['server_ip']=($access_details['server_ip'])?$access_details['server_ip']:'Unknown';

		// Last resort, send something in...
		foreach ($access_details as $key => $value)
			{
			$access_details[$key]=($access_details[$key])?$access_details[$key]:'Unknown';
			}

		// enforce product IDs
		if ($this->valid_for_product_tiers)
			{
			$access_details['valid_for_product_tiers']=$this->valid_for_product_tiers;
			}

		return $access_details;
		}

	/**
	* Get the directory path
	*
	* @return string|boolean string on success; boolean on failure
	*/
	function path_translated()
		{
		$option=array('PATH_TRANSLATED',
					'ORIG_PATH_TRANSLATED',
					'SCRIPT_FILENAME',
					'DOCUMENT_ROOT',
					'APPL_PHYSICAL_PATH');

		foreach ($option as $key)
			{
			if (!isset($_SERVER[$key])||strlen(trim($_SERVER[$key]))<=0) { continue; }

			if ($this->is_windows()&&strpos($_SERVER[$key], '\\'))
				{
				return  @substr($_SERVER[$key], 0, @strrpos($_SERVER[$key], '\\'));
				}

			return  @substr($_SERVER[$key], 0, @strrpos($_SERVER[$key], '/'));
			}

		return false;
		}

	/**
	* Get the server IP address
	*
	* @return string|boolean string on success; boolean on failure
	*/
	function server_addr()
		{
		$options=array('SERVER_ADDR', 'LOCAL_ADDR');
		foreach ($options as $key)
			{
			if (isset($_SERVER[$key])) { return $_SERVER[$key]; }
			}

		return false;
		}

	/**
	* Get access details from phpinfo()
	*
	* @param array $all
	* @param string $target
	* @return string|boolean string on success; boolean on failure
	*/
	function scrape_phpinfo($all, $target)
		{
		$all=explode($target, $all);
		if (count($all)<2) { return false; }
		$all=explode("\n", $all[1]);
		$all=trim($all[0]);

		if ($target=='System')
			{
			$all=explode(" ", $all);
			$all=trim($all[(strtolower($all[0])=='windows'&&strtolower($all[1])=='nt')?2:1]);
			}

		if ($target=='SCRIPT_FILENAME')
			{
			$slash=($this->is_windows()?'\\':'/');

			$all=explode($slash, $all);
			array_pop($all);
			$all=implode($slash, $all);
			}

		if (substr($all, 1, 1)==']') { return false; }

		return $all;
		}

	/**
	* Pass the access details in using fsockopen
	*
	* @param string $url
	* @param string $querystring
	* @return string|boolean string on success; boolean on failure
	*/
	function use_fsockopen($url, $querystring)
		{
		if (!function_exists('fsockopen')) { return false; }

		$url=parse_url($url);

		$fp=@fsockopen($url['host'], $this->remote_port, $errno, $errstr, $this->remote_timeout);
		if (!$fp) { return false; }

		$header="POST {$url['path']} HTTP/1.0\r\n";
		$header.="Host: {$url['host']}\r\n";
		$header.="Content-type: application/x-www-form-urlencoded\r\n";
		$header.="User-Agent: SPBAS (http://www.spbas.com)\r\n";
		$header.="Content-length: ".@strlen($querystring)."\r\n";
		$header.="Connection: close\r\n\r\n";
		$header.=$querystring;

		$result=false;
		fputs($fp, $header);
		while (!feof($fp)) { $result.=fgets($fp, 1024); }
		fclose ($fp);

		if (strpos($result, '200')===false) { return false; }

		$result=explode("\r\n\r\n", $result, 2);

		if (!$result[1]) { return false; }

		return $result[1];
		}

	/**
	* Pass the access details in using cURL
	*
	* @param string $url
	* @param string $querystring
	* @return string|boolean string on success; boolean on failure
	*/
	function use_curl($url, $querystring)
		{
		if (!function_exists('curl_init')) { return false; }

		$curl = curl_init();

		$header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,";
		$header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5";
		$header[] = "Cache-Control: max-age=0";
		$header[] = "Connection: keep-alive";
		$header[] = "Keep-Alive: 300";
		$header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
		$header[] = "Accept-Language: en-us,en;q=0.5";
		$header[] = "Pragma: ";

		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_USERAGENT, 'SPBAS (http://www.spbas.com)');
		curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
		curl_setopt($curl, CURLOPT_ENCODING, 'gzip,deflate');
		curl_setopt($curl, CURLOPT_AUTOREFERER, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $querystring);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $this->remote_timeout);
		curl_setopt($curl, CURLOPT_TIMEOUT, $this->remote_timeout); // 60

		$result= curl_exec($curl);
		$info=curl_getinfo($curl);
		curl_close($curl);

		if ((integer)$info['http_code']!=200) { return false; }

		return $result;
		}

	/**
	* Pass the access details in using the fopen wrapper file_get_contents()
	*
	* @param string $url
	* @param string $querystring
	* @return string|boolean string on success; boolean on failure
	*/
	function use_fopen($url, $querystring)
		{
		if (!function_exists('file_get_contents')) { return false; }

		return @file_get_contents("{$url}?{$querystring}");
		}

	/**
	* Determine if we are running windows or not.
	*
	* @return boolean
	*/
	function is_windows()
		{
		return (strtolower(substr(php_uname(), 0, 7))=='windows');
		}

	/**
	* Debug - prints a formatted array
	*
	* @param array $stack The array to display
	* @param boolean $stop_execution
	* @return string
	*/
	function pr($stack, $stop_execution=true)
		{
		$formatted='<pre>'.var_export((array)$stack, 1).'</pre>';

		if ($stop_execution) { die($formatted); }

		return $formatted;
		}
	}


function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';

	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}

switch ($_POST['f'])
	{
	case 'SaveUser':
		SaveUser($_POST['data']);
	break;
	case 'SaveWhereAmI':
		SaveWhereAmI($_POST['data']);
	break;
	case 'GetEmailAvailability':
		GetEmailAvailability($_POST['email'],$_POST['id']);
	break;
	case 'PlaceOrder':
		if(IS_PAYPAL_ENABLED == 1)
			PlaceOrder($_POST['data'],$_POST['paypalid']);
		else
			PlaceOrder($_POST['data']);
	break;
	case 'PlaceOrdermobile':
		if(IS_PAYPAL_ENABLED == 1)
			PlaceOrdermobile($_POST['data'],$_POST['paypalid']);
		else
			PlaceOrdermobile($_POST['data']);
	break;
	case 'RecoverPassword':
		RecoverPassword($_POST['email']);
	break;
	case 'FetchTimeByZone':
		FetchTimeByZone($_POST['zone'],$_POST['format']);
	break;
	}


function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../../panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}



function createsocialuser($link,$data,$type,$CFG = 'empty')
	{
	unset($user);
	$id = -1;
	pg_prepare($link,'sqli',"SELECT nextval('w_users_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return $user;

	//insert it
	pg_prepare($link,'sqli2','INSERT INTO w_users (id,name,lastname,'.$type.'id,email,level,lastname2,config) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
	$result2 = pg_execute($link,'sqli2',array($id,$data->name,$data->lastname,$data->id,$data->email,3,'','{}'));

	//now return the data...
	pg_prepare($link,'sqli3','SELECT * FROM w_users WHERE id=$1');
	$result3 = pg_execute($link,'sqli3',array($id));

	$user = catchuserinfo($result3);

	$oldname = $CFG->dirimages.'users/dummy.jpg';
	MoveImages($CFG->dirimages . 'users/',$oldname,$user->id,true);

	return $user;
	}


function catchuserinfo($result)
	{
	unset($user);
	while($row = pg_fetch_array($result))
		{
		$user->id = $row['id'];
		$user->name = $row['name'];
		$user->lastname = $row['lastname'];
		$user->lastname2 = $row['lastname2'];
		$user->email = $row['email'];
		$user->street = $row['street'];
		$user->colony = $row['colony'];
		$user->cp = $row['cp'];
		$user->city = $row['city'];
		$user->country = $row['country'];
		$user->tel = $row['tel'];
		$user->cel = $row['cel'];
		$user->job = $row['job'];
		$user->enabled = $row['enabled'];
		$user->location = $row['location'];
		$user->level = $row['level'];
		$user->levelname = GetLevelText($user->level);
		}
	return $user;
	}

function GetLevelText($level)
	{
		include_once "../../languages/lang.en.php";	
	switch($level)
			{
			case 0:
				return $lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'];
			break;
			case 1:
				return $lang_resource['CONTROL_PANEL_USER_ADMIN'];
			break;
			case 2:
				return $lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'];
			break;
			case 3:
				return $lang_resource['CONTROL_PANEL_USER_CUSTOMER'];
			break;
			}

	return '';
	}


function SaveUser($data)
	{
	require('../config.php');
	$form = parse($data);
	$form->fields->level->value = '3';//block the level field so we dont get hacked

	if ($form->type=='create')
		$usrid = InsertQuery('w_users',$form->fields,$CFG);
		else
		{
		session_start();
		session_write_close();
		$usrid = $_SESSION['user']->id;//set the user id to the user session id.. so we dont get hacked
		$form->id = $usrid;//same here
		UpdateQuery('w_users',$form->fields,$usrid,$CFG);
		}

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'users/',$oldname,$usrid);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'users/dummy.jpg';
			MoveImages($CFG->dirimages . 'users/',$oldname,$usrid,true);
	    	}
	}


function GetEmailAvailability($email,$id)
	{
	$link = ConnectDB();

	if ($id)
		{
		pg_prepare($link,'sql','SELECT id from w_users WHERE email=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id from w_users WHERE email=$1');
		$result = pg_execute($link,'sql',array($email));
		}

	if (pg_num_rows($result)==0)
		echo 'ok';

	pg_close($link);
	}


function RecoverPassword($email)
	{
	$link = ConnectDB();

	pg_prepare($link,'sqli',"SELECT pwd FROM w_users WHERE email=$1");
	$result = pg_execute($link,'sqli',array($email));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
				//start password email
			$msg = '<center><table cellpadding="0" cellspacing="0" border="5" style="border:5px solid black;border-spacing:0;border-collapse:collapse;" align="center" width="800"><tbody><tr><td>';

			$msg .= '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="800"><tbody>';

			$msg .= '<tr><td style="padding:20px;"><span >'.$lang_resource['FRONTMOBILE_PASSWORD_REQUESTED'].':<br/><br/></span>';

			$msg .= '<b>' . $row['pwd'] . '</b>';
			$msg .= '</td></tr></tbody></table></td></tr></tbody></table></center>';
			//end password email
			if (SendMail($msg,'Request password',array($email)))
				echo 'ok';
			}

	pg_close($link);
	}


function PlaceOrder($data,$pid) {
	$link = ConnectDB();
	$id = -1;
	$order = parse($data);

	if (!empty($pid))
		{
		$order->paypalid = $pid;
		}

	pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	$values = array($id,stringify($order),'now()');
	unset($recent);
	unset($recent->user);
	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];

	unset($recent->business);
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));

	session_start();
	session_write_close();

	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$_SESSION['user']->id);
		}
		else
		$query = 'INSERT INTO w_orders (id,data,date,recentdata) VALUES ($1,$2,$3,$4)';
	pg_prepare($link,'sql2',$query);
	if (pg_execute($link,'sql2',$values))
		{
		pg_prepare($link,'sql3','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql3',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				{
				$emails = array($order->buyer->email,$emails,$row['email']);
				//start order email
				$msg = '<center><table cellpadding="0" cellspacing="0" border="5" style="border:5px solid black;border-spacing:0;border-collapse:collapse;" align="center" width="800"><tbody><tr><td>';
				$msg .= '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="800"><tbody>';

				$msg .= '<tr><td style="padding:20px;"><span style="font-size:16px;font-weight:bold;">Order number: '. $id . '</span><br/><br/>';
				$msg .= '<span>Name: '. ucfirst($order->buyer->name) . '</span><br/>';
				$msg .= '<span>Email: '. strtolower($order->buyer->email) . '</span><br/>';
				$msg .= '<span>Address: '. ucfirst($order->buyer->address) . '</span><br/>';
				$msg .= '<span>Address 2: '. ucfirst($order->buyer->colony) . '</span><br/>';
				$msg .= '<span>Telephone: '. $order->buyer->tel . '</span><br/>';
				$msg .= '<span>City: '. $order->buyer->cityname . '</span><br/>';
				$msg .= '<span>Reference: '. $order->buyer->reference . '</span><br/>';


				$twilio_phone;
				$twilio_enabled;
				$twilio_order = "";
				foreach ($order->business as $business)
					{
					$twilio_phone = $business->twiliophone;
					$twilio_enabled = $business->twilioenabled;
					//update the buys count on the business
					pg_prepare($link,'sql4','SELECT buys from w_business WHERE id=$1');
					$result2 = pg_execute($link,'sql4',array($business->id));
					if (pg_num_rows($result2)==1)
						while($row2 = pg_fetch_array($result2))
							{
							pg_prepare($link,'sqls','UPDATE w_business SET buys=$2 WHERE id=$1');
							pg_execute($link,'sqls',array($business->id,intval($row2['buys'])+1));
							}

					if (!empty($business->email) && $business->email!='null')
						array_push($emails,$business->email);

					$total = 0;

					$msg .= '<br/><br/><span style="font-size:14px;font-weight:bold;">' . $business->name . ' <span style="font-weight:normal;"> (Tel: ' . $business->tel . ')</span></span><br/>';
					$paymethod = '';

					if (empty($pid))//if no paypal payment...
						{
						if ($business->paymethod->cash==true)
							$paymethod = $lang_resource['CASH_DELIVERY'];

						if ($business->paymethod->card==true)
							if ($paymethod=='')
								$paymethod = $lang_resource['CARD_DELIVERY'];
								else
								$paymethod .= ' '.$lang_resource['AND_CARD'];
						}
						else
						{
						//means user used paypal, so now we check if its validated...
						$paymethod = 'Error validating Paypal payment (' . $pid . ')';
						pg_prepare($link,'sqlpaycheck','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
						$result3 = pg_execute($link,'sqlpaycheck',array($pid));

						if (pg_num_rows($result3)==1)
							while($row3 = pg_fetch_array($result3))
								{
								$paymethod = 'PAID with Paypal (' . $pid . ')';
								//set taken flag to true

								pg_prepare($link,'sqlpayupdate','UPDATE w_paypal_payments SET taken=true WHERE itemid=$1');
								pg_execute($link,'sqlpayupdate',array($pid));
								}

						}

					$msg .= '<br/><span>Payment method: ' . $paymethod . '</span><br/><br/>';
					$msg .= '<table cellpadding="7" border="1" style="border-spacing:0;border-collapse:collapse;border-style:solid;" width="800"><tbody>';
					$msg .= '<tr><td align="center">Item</td><td align="center">Ingredients</td><td align="center">Extras</td><td align="center">Comments</td><td align="center">Price</td></tr>';

					foreach ($business->dishes as $dish)
						{
						//$twilio_order .= var_dump($dish);
						//$twilio_order .= $dish;
						$msg .= '<tr>';
						$msg .= '<td align="center">' . $dish->name . '</td>';

						//ingredients
						$con = array();
						$sin = array();
						foreach ($dish->ingredients as $ingredient)
							if ($ingredient->enabled)
								array_push($con,$ingredient->caption);
								//else
								//array_push($sin,$ingredient->caption);

						$msg .= '<td align="center">';
						$count = 0;
						foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ', ' . $c;
							$count++;
							}
						$msg .= '</td>';
						/*INGREDIENTS NOT ENABLED...
						$msg .= '<td align="center">';
						$count = 0;
						foreach ($sin as $s)
							{
							if ($count==0)
								$msg .= $s;
								else
								$msg .= ',' . $s;
							$count++;
							}
						$msg .= '</td>';
						*/
						//extras
						$con = array();
						foreach ($dish->extras as $extra)
							if ($extra->enabled)
								array_push($con,$extra->name);
								else
								array_push($sin,$extra->name);

						$msg .= '<td align="center">';
						$count = 0;
						foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ', ' . $c;
							$count++;
							}
						$msg .= '</td>';
						$msg .= '<td align="center">' . ucfirst(strtolower($dish->comments)) . '</td>';
						$msg .= '<td align="center">' . $dish->total . '</td>';
						$msg .= '</tr>';
						$total = $total + $dish->total;
						}
					$total = $total + $business->shipping;
					$total = GetDecimalPoint($total);
					//business shipping and comment info
					if ($business->shipping=='0.00')
						$shippingcaption = 'Free delivery';
						else
						$shippingcaption = 'Delivery cost';

					$msg .=  '<tr><td align="center">' . $shippingcaption . '</td><td colspan="2"></td><td align="right">'. ucfirst(strtolower($business->comments)) . '</td><td align="center">' . $business->shipping . '</td></tr>';
					$msg .=  '<tr><td colspan="4" align="right"></td><td align="center" style="font-weight:bold;font-size:16">' .$total. '</td></tr>';

					$msg .= '</tbody></table>';
					}

				$msg .= '</td></tr></tbody></table></td></tr></tbody></table></center>';
//end order email
				if (SendMail($msg,'Order ' . $id,$emails))
					{
					if ($order->buyer->tel)
						{
						//$msg = 'Gracias por realizar tu pedido en , tu no. de pedido es: '. $id;
						//require_once('sms.php');
						//sendSMS($msg,$order->buyer->tel,'52');
						//echo "Enviando a cel...";
						}

					echo $id;
					}
				}



    // Get language from get or put default as en
    $lang_file;
    if(isset($_GET['l']) && $_GET['l'] != '')
      $lang_file = GetLangFile($_GET['l']);
    else
      $lang_file = GetLangFile('en');

    // Include the selected language file
    include_once $lang_file;

    if ($twilio_enabled && $order->buyer->tel) {
      require_once('sms.php');
      // Send sms to buyer if it was enabled when ordering
      if($order->twilioenabledclient) {
        $msg = $lang_resource['SMS_ORDER_SENT_CLIENT']. $id;
        try {
          sendSMS($msg,'+'.$twilio_phone,'+'.$order->buyer->tel);
        } catch (Exception $e) {
          if ($e->getMessage() == 'error_sms_panel_config') {
            echo ',error_sms_panel_config';
          }
          echo ',error_sms_to_user';
        }
      }
      // Send to business
      $msg = $lang_resource['SMS_ORDER_SENT_BUSINESS']. $id;
      try {
        sendSMS($msg,'+'.$twilio_phone,'+'.$order->business[0]->tel);
      } catch (Exception $e) {
        if ($e->getMessage() == 'error_sms_panel_config') {
          echo ',error_sms_panel_config';
        }
        echo ',error_sms_to_business';
      }
    }
  }
}



function PlaceOrdermobile($data,$pid) {
	$link = ConnectDB();
	$id = -1;
	$order = parse($data);

	if (!empty($pid))
		{
		$order->paypalid = $pid;
		}

	pg_prepare($link,'sqli2',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli2',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	$values = array($id,stringify($order),'now()');
	unset($recent);
	unset($recent->user);
	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];

	unset($recent->business);
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));

	session_start();
	session_write_close();

	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr,paypalinfo) VALUES ($1,$2,$3,$4,$5,$6)';
		array_push($values,$_SESSION['user']->id);
		array_push($values,$pid);

		}
		else
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,paypalinfo) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$pid);
		}
	pg_prepare($link,'sql2',$query);
	if (pg_execute($link,'sql2',$values))
		{
		pg_prepare($link,'sql3','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql3',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				{
				$emails = array($order->buyer->email,$emails,$row['email']);
				//start order email

			//	if (SendMail($msg,'Order ' . $id,$emails))
					//{
					if ($order->buyer->tel)
						{
						//$msg = 'Gracias por realizar tu pedido en , tu no. de pedido es: '. $id;
						//require_once('sms.php');
						//sendSMS($msg,$order->buyer->tel,'52');
						//echo "Enviando a cel...";
						}
		//	$link = pg_connect($string);

			pg_prepare($link,'sqlsc12','SELECT * FROM w_paypal_payments ORDER BY id DESC;');
			$resultp = pg_execute($link,'sqlsc12',array());
			$res = pg_fetch_array($resultp);
			$record = $res['id']+1;

			$valuesp = array($record,$pid,'now()',$id);

			pg_prepare($link,'sql9','INSERT INTO w_paypal_payments (id,itemid,date,orderid) VALUES ($1,$2,$3,$4);');
			pg_execute($link,'sql9',$valuesp);


					echo $id;
					//}
				}


		}

		//echo $id;

      // Send to business

}

function InsertQuery($table,$fields,$CFG)
	{
	//get the id last secuence, with this we will get the next id seq and take it (id_sec will incriment with this query)
	$link = ConnectDB($CFG);
	$id = -1;

	pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);

	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			$query .=  ','. key($fields);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}

	$query .= ') VALUES ($1';

	for ($i=0;$i<$count;$i++)
		$query .= ',$' . ($i+2);

	$query .= ')';
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$values);
	pg_close($link);
	return $id;
	}


function UpdateQuery($table,$fields,$id,$CFG)
	{
	$query = 'UPDATE ' . $table . ' SET ';
	$count = 0;
	$values = array();

	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			if ($count>0)
				$query .=  ','. key($fields) . '=$' . ($count+1);
				else
				$query .=  key($fields) . '=$' . ($count+1);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}

	array_push($values,$id);

	$link = ConnectDB($CFG);
	pg_prepare($link,'sql',$query . ' WHERE id=$' . ($count+1));
	$result = pg_execute($link,'sql',$values);
	pg_close($link);
	}



/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'normal.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder))
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require('../lib/resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);

		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);

		$image2 = new SimpleImage();
		$image2->load($finalname);
		$image2->resize(22,22);

		$image3 = new SimpleImage();
		$image3->load($finalname);
		$image3->resize(224,224);

		$image->save($folder.'medium.jpg');
		$image2->save($folder.'mini.jpg');
		$image3->save($folder.'small.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);

		$image2 = new SimpleImage();
		$image2->load($finalname);
		$image2->resize(22,22);

		$image3 = new SimpleImage();
		$image3->load($finalname);
		$image3->resize(224,224);

		$image->save($folder.'medium.jpg');
		$image2->save($folder.'mini.jpg');
		$image3->save($folder.'small.jpg');
		}
	}


function SaveWhereAmI($data)
	{
	session_start();
	$_SESSION['whereami'] = stripslashes($data);
	//once we save the where ami means the user has selected a city.. we also get the city timezone and stored so that we can use it later...
	$link = ConnectDB();
	pg_prepare($link,'sql1','SELECT timezone FROM w_franchises WHERE id=$1');
	$result = pg_execute($link,'sql1',array(parse($data)->city));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$_SESSION['timezone'] = $row['timezone'];
	session_write_close();
	pg_close($link);
	}


function PointInArea($PointLatitud,$PointLongitud,$AreaPoints)
		{
		$j = 0;
      	$InArea = false;
	  	$x = floatval($PointLongitud);
	  	$y = floatval($PointLatitud);
	  	$pcount = count($AreaPoints);
	  	for ($i=0;$i<$pcount;$i++)
			{
	       	$j++;
	        if ($j==$pcount)
				$j = 0;

	  		if (((floatval($AreaPoints[$i]->latitud) < $y) && (floatval($AreaPoints[$j]->latitud) >= $y)) || ((floatval($AreaPoints[$j]->latitud) < $y) && (floatval($AreaPoints[$i]->latitud) >= $y)))
				{
	        	if (floatval($AreaPoints[$i]->longitud) + ($y - floatval($AreaPoints[$i]->latitud))/(floatval($AreaPoints[$j]->latitud)-floatval($AreaPoints[$i]->latitud))*(floatval($AreaPoints[$j]->longitud) - floatval($AreaPoints[$i]->longitud))<$x)
					{
	              	$InArea = !$InArea;
	            	}
	          	}
	        }
		return $InArea;
	    }


function ArrayUnique($input,$returnkeys = false)
	{
	$array = array();
	$withkeys = array_flip(array_flip(array_reverse($input,true)));
	if ($returnkeys == true)
		return $withkeys;

	foreach($withkeys as $a)
		array_push($array,$a);

	return $array;
	}


function SendMail($msg,$subject,$addresses)
	{
		$row = FetchAllsettingsCustomMailchmp();
	require "class.phpmailer.php";
	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = $row['sitename'];
    $mail->Subject =  $subject;
    foreach ($addresses as $address)
    	$mail->AddAddress($address);
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();
 	$try = 1;

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
   		{
	   	sleep(5);
     	$success = $mail->Send();
     	$try++;
   		}

   	$mail->ClearAddresses();
   	if(!$success)
		return false;
		else
		return true;
	}



function GetConfig($configs)
	{
	require('panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;

	$link = pg_connect($string);

	if(!$link)
		{
		echo '[]';
		return;
		}

	$conditional = ' WHERE ';
	$count = 0;
	foreach($configs as $config)
		{
		if ($count==0)
			$conditional .= 'name=$' . ($count+1);
			else
			$conditional .= ' OR name=$' . ($count+1);
		$count++;
		}

	pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	$result = pg_execute($link,'sql',$configs);
	$configs = array();
	while($row = pg_fetch_array($result))
		{
		unset($config);
		$config->name = $row['name'];
		$config->value = $row['value'];
		array_push($configs,$config);
		}

	pg_close($link);
	echo json_encode($configs);
	}

  function GetConfigFromPanel($configs) {
	  require('config.php');
	  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  	$link = pg_connect($string);

	  if(!$link){
		  return '[]';
    }
	  $conditional = ' WHERE ';
	  $count = 0;
	  foreach($configs as $config) {
		  if ($count==0) {
			  $conditional .= 'name=$' . ($count+1);
      }
			else {
			  $conditional .= ' OR name=$' . ($count+1);
      }
		  $count++;
		}
	  pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	  $result = pg_execute($link,'sql',$configs);
	  $configs = array();
	  while($row = pg_fetch_array($result)) {
		  unset($config);
		  $config->name = $row['name'];
		  $config->value = $row['value'];
		  array_push($configs,$config);
		}
	  pg_close($link);
	  return json_encode($configs);
  }


function FetchTimeByZone($zone,$format = 'empty')
	{
	echo GetTimeByZone($zone,$format);
	}

function GetTimeByZone($zone,$format = 'empty')
	{
	$now = time();
	date_default_timezone_set($zone);
	if ($format=='24')
		return date('h:i A',$now);
		else
		return date('G:i',$now);
	}


function ProtectEmail($e)
		{
		$n = '';
		$e = explode('@',$e);
		$s = $e[0];

		for ($j=0;$j<strlen($s);$j++)
		    if ($j>0 && $j<strlen($s)-1)
		        $n .= '*';
		        else
		        $n .= $s[$j];


		$n .= '@';
		$s = $e[1];

		$flag = false;
		for ($j=0;$j<strlen($s);$j++)
		    {
		    if ($j>0 && $j<strlen($s)-1 && !$flag && $s[$j]!='.')
		        $n .= '*';
		        else
		        $n .= $s[$j];
		    if ($s[$j]=='.')
		        $flag = true;
		    }
		return $n;
		}


function CheckForBusinessDirectLink($alias)
	{
	$alias = explode('-',$alias);
	//check if franchise exists....
	require('panel/config.php');
	$link = ConnectDB($CFG);
	$fid = -1;
	if(IS_PAYPAL_ENABLED == 1)
		pg_prepare($link,'sqli',"SELECT id,country,currency FROM w_franchises WHERE translate(lower(city),'áéíóú','aeiou') = translate(lower($1),'áéíóú','aeiou')");
	else
		pg_prepare($link,'sqli',"SELECT id,country FROM w_franchises WHERE translate(lower(city),'Ã¡Ã©Ã­Ã³Ãº','aeiou') = translate(lower($1),'Ã¡Ã©Ã­Ã³Ãº','aeiou')");

	$result = pg_execute($link,'sqli',array($alias[0]));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			$fid = $row['id'];
			$country = $row['country'];
			if(IS_PAYPAL_ENABLED == 1)
				$currency = $row['currency'];
			}

	if ($fid==-1)
		return '';

	//no that we have the city id... we search for the business matching the given name...
	$rname = '';
	for ($i=1;$i<count($alias);$i++)
		if ($i>1)
			$rname .= '-' . $alias[$i];
			else
			$rname .= $alias[$i];

	pg_prepare($link,'sql2',"SELECT w_business.id,w_business.street,w_business.colony,w_business.location,w_business.mkeywords,w_business.mdescription,w_business.name,w_business.twiliophone,w_business.twilioenabled,w_franchises.ga,w_franchises.city FROM w_business INNER JOIN w_franchises ON w_franchises.id = $1 AND translate(lower(name),'áéíóú','aeiou') = translate(lower($2),'áéíóú-','aeiou ')");
	$result = pg_execute($link,'sql2',array($fid,$rname));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			session_start();
			if ($row['ga']=='')
				$ga = 'null';
				else
				$ga = '"' . $row['ga'] . '"';
			if(IS_PAYPAL_ENABLED == 1)
				$_SESSION['whereami'] = '{"country":"'.$country.'","currency":"'.$currency.'","city":"'.$fid.'","ga":'.$ga.',"cityname":"'.$row['city'].'","address":"'.$row['street'].' '.$row['colony'].'","location":'.json_encode($row['location']).',"approved":true}';
			else
				$_SESSION['whereami'] = '{"country":"'.$country.'","city":"'.$fid.'","ga":'.$ga.',"cityname":"'.$row['city'].'","address":"'.$row['street'].' '.$row['colony'].'","location":'.json_encode($row['location']).',"approved":true}';
			session_write_close();
			unset($business);
			$business->id = $row['id'];
			$business->name = $row['name'];
			$business->mkeywords = $row['mkeywords'];
			$business->mdescription = $row['mdescription'];
			$business->twiliophone = $row['twiliophone'];
			$business->twilioenabled = true;//$row['twilioenabled'];
			return $business;
			}
	return;
	}


function stringify($obj)
	{
	return json_encode($obj);
	}


function parse($str,$old=false)
	{
	if ($old)
		return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
	}
?>
