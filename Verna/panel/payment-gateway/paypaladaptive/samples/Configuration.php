<?php 
class Configuration
{
	public static function ConnectDB($CFG = 'empty')
	{
		if ($CFG=='empty')
		require('../config.php');
		$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
		$link = pg_connect($string);
		if(!$link)
			die('');
			else
			return $link;
	}
	
	// For a full list of configuration parameters refer in wiki page (https://github.com/paypal/sdk-core-php/wiki/Configuring-the-SDK)
	public static function getConfig()
	{
		$link = ConnectDB();
		pg_prepare($link,'sqlp','SELECT value FROM w_configs WHERE name=$1');
		$resultp = pg_execute($link,'sqlp',array('paymentmode'));
		$rowp = pg_fetch_array($resultp);
		if($rowp['value'] == 0){
			$paymode= 'sandbox';
		}else{
			$paymode= 'live';
		}
		
		$config = array(
				// values: 'sandbox' for testing
				//		   'live' for production
				"mode" => $paymode

				// These values are defaulted in SDK. If you want to override default values, uncomment it and add your value.
				// "http.ConnectionTimeOut" => "5000",
				// "http.Retry" => "2",
			);
		return $config;
	}
	
	// Creates a configuration array containing credentials and other required configuration parameters.
	public static function getAcctAndConfig()
	{
		$link = ConnectDB();
		pg_prepare($link,'sqlpusername','SELECT value FROM w_configs WHERE name=$1');
		$result = pg_execute($link,'sqlpusername',array('pusername'));
		$row = pg_fetch_array($result);
		$UserName= $row['value'];
		
		
		pg_prepare($link,'sqlppassword','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link,'sqlppassword',array('ppassword'));
		$row3 = pg_fetch_array($result3);
		$Password= $row3['value'];
		
		pg_prepare($link,'sqlpsign','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link,'sqlpsign',array('psign'));
		$row3 = pg_fetch_array($result3);
		$Signature= $row3['value'];
		
		pg_prepare($link,'sqlpappid','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link,'sqlpappid',array('pappid'));
		$row3 = pg_fetch_array($result3);
		$AppId= $row3['value'];
		
		
		
				
		$config = array(
				// Signature Credential
				/*"acct1.UserName" => $UserName,
				"acct1.Password" => $Password,
				"acct1.Signature" => $Signature,
				"acct1.AppId" => $AppId
				*/
				"acct1.UserName" => "seller12345456_api1.gmail.com",
				"acct1.Password" => "XK43KXE2HLSSG97C",
				"acct1.Signature" => "AiPC9BjkCyDFQXbSkoZcgqH3hpacAVPwmLpN.6mbFOJuNxxYw-qFdK1t",
				"acct1.AppId" => "APP-80W284485P519543T"

				// Sample Certificate Credential
				// "acct1.UserName" => "certuser_biz_api1.paypal.com",
				// "acct1.Password" => "D6JNKKULHN3G5B8A",
				// Certificate path relative to config folder or absolute path in file system
				// "acct1.CertPath" => "cert_key.pem",
				// "acct1.AppId" => "APP-80W284485P519543T"
				);

		return array_merge($config, self::getConfig());;
	}

}