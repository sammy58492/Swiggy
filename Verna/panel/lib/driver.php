<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

// bringg

	
switch ($_POST['f'])
	{
	case 'SaveConfig':
		SaveConfig($_POST['config']);
	break;
	case 'GetUserConfig':
		GetUserConfig();
	break;
	case 'DeleteUser':
		DeleteUser($_POST['data']);
	break;
	case 'DeleteDriver':
		DeleteDriver($_POST['data']);
	break;
	case 'SaveDriver':
		SaveDriver($_POST['data']);
	break;
	case 'SaveDriverData':
		SaveDriverData($_POST['data']);
	break;
	case 'GetEmailAvailability':
		GetEmailAvailability($_POST['email'],$_POST['id']);
	break;
	case 'GetDriverEmailAvailability':
		GetDriverEmailAvailability($_POST['email'],$_POST['mobile'],$_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
		case 'FetchAllDriverGroupData':
			FetchAllDriverGroupData();
			break;
	default:
		die();
	break;
	}

/*******************************************************UPDATE GLOBAL USER PREFS************************************************/

function SaveConfig($config)
	{
	$link = ConnectDB();
	pg_prepare($link,'sql','UPDATE w_drivermanager SET config=$1 WHERE id=$2');
	$result = pg_execute($link,'sql',array($config,$_SESSION['user']->id));
	pg_close($link);	
	}

/*************************************************************GET USER CONFIG***************************************************************/

function GetUserConfig()
	{
	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT config FROM w_drivermanager WHERE id=$1');
	$result = pg_execute($link,'sql',array($_SESSION['user']->id));
	pg_close($link);			
		
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			echo stripslashes($row['config']);
	}

/*************************************************************GET USER DATA***************************************************************/

function GetUserData($id,$sendedlink)
	{
	if (empty($id))//when user logs ask for his data and he doesnt have his id so it comes empty
		return($_SESSION['user']);
		else
		{
		AdminsOnly();
		if ($sendedlink==null)
			$link = ConnectDB();
			else
			$link = $sendedlink;

		pg_prepare($link,'sql','SELECT name,lastname,lastname2,email,street,colony,cp,city,tel,cel,job,location,level from w_drivermanager WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));

		if ($sendedlink==null)
			pg_close($link);
		
		unset($user);
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user->id = $id;
				$user->name = $row['name'];
				$user->lastname = $row['lastname'];
				$user->lastname2 = $row['lastname2'];
				$user->email = $row['email'];
				$user->street = $row['street'];
				$user->colony = $row['colony'];
				$user->cp = $row['cp'];
				$user->city = $row['city'];
				$user->tel = $row['tel'];
				$user->cel = $row['cel'];
				$user->job = $row['job'];
				$user->location = $row['location'];
				$user->level = $row['level'];
				$user->levelname = GetLevelText($user->level);
				if ($user->id!=$_SESSION['user']->id && $user->level<=$_SESSION['user']->level)//if the user asking for users data has less privileges he wont get the data
					return '';
				}
		
		return $user;
		}
		
	}

/********************************************DELETE USER****************************************************************/

function DeleteUser($data)
	{
	AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
		//get the user to delete level and check if this user has privileges to delete it
		$user = GetUserData($id,$link);

		if ($_SESSION['user']->level<$user->level)
			{
			RemoveDir($CFG->dirimages . 'users/' . $id . '/');
			pg_prepare($link,'sql0','DELETE FROM w_drivermanager WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
			if ($user->level==1)//if deleting user that is admin, he cannot be admin of franchise if we founded as it
				{
				pg_prepare($link,'sql1','SELECT id FROM w_franchises WHERE admin=$1');
				$result = pg_execute($link,'sql1',array($id));
				if (pg_num_rows($result)>0)  
					{
					//get the superadmin id for asigning as admin of franchise
					pg_prepare($link,'sql2','SELECT id FROM w_drivermanager WHERE level=$1');
						$result2 = pg_execute($link,'sql2',array('0'));
						if (pg_num_rows($result2)==1)  
							while($row2 = pg_fetch_array($result2))
								$adminid = $row2['id'];

					while($row = pg_fetch_array($result))//if we do got franchises where he is admin... remove it
						{
						$franchiseid = $row['id'];
						pg_prepare($link,'sql3','UPDATE w_franchises SET admin=$1 WHERE id=$2');
						pg_execute($link,'sql3',array($adminid,$franchiseid));
						}
					}
				}
			
			if ($user->level==2)//if deleting user that is a provider, he cannot be provider of restaurant if we founded as it
				{
				pg_prepare($link,'sql4','SELECT id FROM w_business WHERE provider=$1');
				$result = pg_execute($link,'sql4',array($id));
				if (pg_num_rows($result)>0)  
					{
					//get the superadmin id for asigning as owner of the business
					pg_prepare($link,'sql5','SELECT id FROM w_drivermanager WHERE level=$1');
						$result2 = pg_execute($link,'sql5',array('0'));
						if (pg_num_rows($result2)==1)  
							while($row2 = pg_fetch_array($result2))
								$adminid = $row2['id'];

					while($row = pg_fetch_array($result))//if we do got businesses where he is provider... remove it
						{
						$businessid = $row['id'];					
						pg_prepare($link,'sql6','UPDATE w_business SET provider=$1 WHERE id=$2');
						pg_execute($link,'sql6',array($adminid,$businessid));
						}
					}
				}

			}	
		}
	pg_close($link);
	}

/*******************************************SAVE USER*********************************************************************/

function SaveUser($data)
	{
	AdminsOnly();
	require('../config.php');
	$form = parse($data);
	$usrid = $form->id;
	
	if ($form->type=='create')
		$usrid = InsertQuery('w_drivermanager',$form->fields,$CFG);	
		else
		{
		UpdateQuery('w_drivermanager',$form->fields,$usrid,$CFG);
		$link = ConnectDB($CFG);
		if ($form->fields->level->value!=1)//if saving user is not an admin, he cannot be admin of franchise if we founded as it
			{
			pg_prepare($link,'sql1','SELECT id FROM w_franchises WHERE admin=$1');
			$result = pg_execute($link,'sql1',array($usrid));
			if (pg_num_rows($result)>0)  
				{
				//get the superadmin id for asigning as admin of franchise
				pg_prepare($link,'sql2','SELECT id FROM w_drivermanager WHERE level=$1');
					$result2 = pg_execute($link,'sql2',array('0'));
					if (pg_num_rows($result2)==1)  
						while($row2 = pg_fetch_array($result2))
							$adminid = $row2['id'];

				while($row = pg_fetch_array($result))//if we do got franchises where he is admin... remove it
					{
					$franchiseid = $row['id'];
					pg_prepare($link,'sql3','UPDATE w_franchises SET admin=$1 WHERE id=$2');
					pg_execute($link,'sql3',array($adminid,$franchiseid));
					}
				}
			}
		
		if ($form->fields->level->value!=2)//if saving user is not a provider, he cannot be provider of restaurant if we founded as it
			{
			pg_prepare($link,'sql4','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql4',array($usrid));
			if (pg_num_rows($result)>0)  
				{
				//get the superadmin id for asigning as owner of the business
				pg_prepare($link,'sql5','SELECT id FROM w_drivermanager WHERE level=$1');
					$result2 = pg_execute($link,'sql5',array('0'));
					if (pg_num_rows($result2)==1)  
						while($row2 = pg_fetch_array($result2))
							$adminid = $row2['id'];

				while($row = pg_fetch_array($result))//if we do got businesses where he is provider... remove it
					{
					$businessid = $row['id'];					
					pg_prepare($link,'sql6','UPDATE w_business SET provider=$1 WHERE id=$2');
					pg_execute($link,'sql6',array($adminid,$businessid));
					}
				}
			}

		pg_close($link);
		}

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'users/',$oldname,$usrid);
		
		//NASIM +919475635421
			$link = ConnectDB();		
			pg_prepare($link,'sql','UPDATE w_drivermanager SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql',array(1,$usrid));
			pg_close($link);
		//NASIM +919475635421
		
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	//$oldname = $CFG->dirimages.'users/dummy.jpg';
			//MoveImages($CFG->dirimages . 'users/',$oldname,$usrid,true);
			
			//NASIM +919475635421
				$link = ConnectDB();		
				pg_prepare($link,'sql','UPDATE w_drivermanager SET isimg=$1 WHERE id=$2');
				pg_execute($link,'sql',array(0,$usrid));
				pg_close($link);
			//NASIM +919475635421
			
	    	}
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

	require('resize.php');
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

function GetEmailAvailability($email,$id)
	{
	$link = ConnectDB();
	
	//Fetch user id for driver id 4id
	pg_prepare($link,'sql106','SELECT usr from w_drivermanager WHERE id = $1');
	$result106 = pg_execute($link,'sql106',array($id));
	$row106 = pg_fetch_array($result106);
	
	$id = $row106[0];
	

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
	
	
function GetDriverEmailAvailability($email,$mobile,$id)
	{
	$link = ConnectDB();

	if ($id)
		{
		pg_prepare($link,'sql','SELECT id,usr from w_driver WHERE email=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id,usr from w_driver WHERE email=$1');
		$result = pg_execute($link,'sql',array($email));
		}
	if ($id)
		{
		$fetch_result = pg_fetch_array($result)	;
		pg_prepare($link,'sqlp','SELECT id from w_users WHERE email=$1 and id!=$2');
		$resultp = pg_execute($link,'sqlp',array($email,$fetch_result['usr']));
		}
		else
		{
		pg_prepare($link,'sqlp','SELECT id from w_users WHERE email=$1');
		$resultp = pg_execute($link,'sqlp',array($email));
		}	
	if ($id)
		{
		pg_prepare($link,'sqld1','SELECT id,usr from w_driver WHERE mobile=$1 and id!=$2');
		$results = pg_execute($link,'sqld1',array($mobile,$id));
		}
		else
		{
		pg_prepare($link,'sqld1','SELECT id,usr from w_driver WHERE mobile=$1');
		$results = pg_execute($link,'sqld1',array($mobile));
		}	

	if (pg_num_rows($result)==0 && pg_num_rows($results)==0 && pg_num_rows($resultp)==0)  
		echo 'ok';
	
	pg_close($link);
	}
	
	

function SetEnabled($id,$enabled)
	{
	AdminsOnly();
	
	$link = ConnectDB();		
	$data = parse($data);


	pg_prepare($link,'sqli','UPDATE w_driver SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
function SaveDriver($data)
	{
	//AdminsOnly();
	require('../config.php');
	$form = parse($data);
	//print_r($form);
	$usrid = $form->id;
	$link = ConnectDB();
	$permission = 'BRING_PERMISSION';
	pg_prepare($link,'sqlbringpermission','SELECT * from w_configs WHERE name=$1');
	$res1 = pg_execute($link,'sqlbringpermission',array($permission));
	$rows = pg_fetch_array($res1);
	if($rows['value']==1){
	
	if ($form->type=='create')
	{
				        $url = 'http://api.bringg.com/partner_api/users';

						$data_string = array(
						'company_id' => BRINGG_COMPANY_ID,
						'name' => $form->fields->name->value." ".$form->fields->lastname->value,
						'email' => $form->fields->email->value,
		     			'password' =>  $form->fields->pwd->value,
						'phone' =>   $form->fields->mobile->value,
						'admin' => "true",
						'access_token' => BRINGG_ACCESS_TOKEN,
						'timestamp' => date('Y-m-d H:i:s')
						);
						$secret_key = BRINGG_SECRET_KEY;
						
						// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
						$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
						
						//print("The signature: " + $signature);
						
						$data_string["signature"] = $signature;
						
						//print("this is the data string: ");
						//print_r($data_string);
						
						$content = json_encode($data_string);
						
						//print("The content: " + $content);
						// $data_string = json_encode($data);
						$ch=curl_init($url);
						curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
						curl_setopt($ch, CURLOPT_HEADER, false);
						curl_setopt($ch, CURLOPT_HTTPHEADER,
						array('Content-Type:application/json',
						'Content-Length: ' . strlen($content))
						);
						curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
						$json_response = curl_exec($ch);
						$status = curl_getinfo($ch);
						curl_close($ch);
						$return_data = json_decode($json_response);
					
						
							if($return_data->error) {
							echo $return_data->error;
							}
							else if($return_data->message->phone) {
								
							  echo $return_data->message->phone[0];
							  exit;
								}
							else {
								
								$formuser->fields->name=new stdClass();
								$formuser->fields->name->value = $form->fields->name->value;
								$formuser->fields->pwd=new stdClass();
								$formuser->fields->pwd->value = $form->fields->pwd->value;
								$formuser->fields->email=new stdClass();
								$formuser->fields->email->value = $form->fields->email->value;
								$formuser->fields->level=new stdClass();
								$formuser->fields->level->value = 4;
								//print_r($formuser); exit;
								
								 $user_id = InsertQuery('w_users',$formuser->fields,$CFG);
								    
										$form->fields->usr=new stdClass();
										$form->fields->usr->value = $user_id;
										
										
									
								    $bringg_driverid = $return_data->id;
									$form->fields->bringg_driverid=new stdClass();
									$form->fields->bringg_driverid->value = $return_data->id; 
									
									
									if($form->fields->bringg_driverid->value != "") {
									$usrid = InsertQuery('w_driver',$form->fields,$CFG);
									echo "OK";
									} 
									else {
									echo "Sorry Please input valid information";		
										}
		

								
							}																				

	}
		else
		{
			$bringg_driverid = $form->bringg_driverid;
			
			
			$url = 'http://api.bringg.com/partner_api/users/'.$bringg_driverid;

			$data_string = array(
			'company_id' => BRINGG_COMPANY_ID,
			'name' => $form->fields->name->value." ".$form->fields->lastname->value,
			'email' => $form->fields->email->value,
		    'password' =>  $form->fields->pwd->value,
			'phone' =>   $form->fields->mobile->value,
			'admin' => "true",
			'access_token' => BRINGG_ACCESS_TOKEN,
			'timestamp' => date('Y-m-d H:i:s')
			);
			$secret_key = BRINGG_SECRET_KEY;
			
			$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
			$data_string["signature"] = $signature;
			$content = json_encode($data_string);
			
			$ch=curl_init($url);
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER,
			array('Content-Type:application/json',
			'Content-Length: ' . strlen($content))
			);
			
			$json_response = curl_exec($ch);
			
			$status = curl_getinfo($ch);
			
			curl_close($ch);
			$return_data = json_decode($json_response);
			/*print_r($return_data);
			echo $return_data->id;*/
			if($return_data->error) {
							echo $return_data->error;
							}
			else if($return_data->message->phone) {
								
							  echo $return_data->message->phone[0];
							  exit;
			}
			else {
			
			
			
		UpdateQuery('w_driver',$form->fields,$usrid,$CFG);
		
		
		
		
		$formuser->fields->name=new stdClass();
		$formuser->fields->name->value = $form->fields->name->value;
		$formuser->fields->pwd=new stdClass();
		$formuser->fields->pwd->value = $form->fields->pwd->value;
		$formuser->fields->email=new stdClass();
		$formuser->fields->email->value = $form->fields->email->value;
		//print_r($formuser); 
	    UpdateQuery('w_users',$formuser->fields,$form->usr,$CFG);
		echo 'OK';
			}
		
		
		}
		
	}else{
		if ($form->type=='create')
		{
		
		$formuser->fields->name=new stdClass();
		$formuser->fields->name->value = $form->fields->name->value;
		$formuser->fields->lastname2=new stdClass();
		$formuser->fields->lastname2->value = $form->fields->lastname->value;
		$formuser->fields->pwd=new stdClass();
		$formuser->fields->pwd->value = $form->fields->pwd->value;
		$formuser->fields->email=new stdClass();
		$formuser->fields->email->value = $form->fields->email->value;
		$formuser->fields->street=new stdClass();
		$formuser->fields->street->value = $form->fields->address->value;
		$formuser->fields->cel=new stdClass();
		$formuser->fields->cel->value = $form->fields->mobile->value;
		$formuser->fields->country=new stdClass();
		$formuser->fields->country->value = $form->fields->country->value;
		$formuser->fields->city=new stdClass();
		$formuser->fields->city->value = $form->fields->city->value;
		$formuser->fields->cp=new stdClass();
		$formuser->fields->cp->value = $form->fields->zip->value;
		$formuser->fields->level=new stdClass();
		$formuser->fields->level->value = 4;
		//print_r($formuser); exit;
		
	    $user_id = InsertQuery('w_users',$formuser->fields,$CFG);
		
		$form->fields->usr=new stdClass();
		$form->fields->usr->value = $user_id;
		
		$usrid = InsertQuery('w_driver',$form->fields,$CFG);
	}
		else
		{
			
		
		
		
		$formuser->fields->name=new stdClass();
		$formuser->fields->name->value = $form->fields->name->value;
		$formuser->fields->lastname2=new stdClass();
		$formuser->fields->lastname2->value = $form->fields->lastname->value;
		$formuser->fields->pwd=new stdClass();
		$formuser->fields->pwd->value = $form->fields->pwd->value;
		$formuser->fields->email=new stdClass();
		$formuser->fields->email->value = $form->fields->email->value;
		$formuser->fields->street=new stdClass();
		$formuser->fields->street->value = $form->fields->address->value;
		$formuser->fields->cel=new stdClass();
		$formuser->fields->cel->value = $form->fields->mobile->value;
		$formuser->fields->country=new stdClass();
		$formuser->fields->country->value = $form->fields->country->value;
		$formuser->fields->city=new stdClass();
		$formuser->fields->city->value = $form->fields->city->value;
		$formuser->fields->cp=new stdClass();
		$formuser->fields->cp->value = $form->fields->zip->value;
		$formuser->fields->level=new stdClass();
		$formuser->fields->level->value = 4;
		print_r($form); 
	    UpdateQuery('w_users',$formuser->fields,$form->usr,$CFG);
		unset($form->fields->level);
		unset($form->fields->location);
		
		$usrid = $form->id;
		UpdateQuery('w_driver',$form->fields,$usrid,$CFG);
		
		
		}	
		
	}

	}	
	
function SaveDriverData($data)
	{
		
	//AdminsOnly();
	require('../config.php');
	$form = parse($data);
	//print_r($form);
	$usrid = $form->id;
	
	if ($form->type=='create')
	{
		$usrid = InsertQuery('w_driver',$form->fields,$CFG);
		
	}
		else
		{
		UpdateQuery('w_driver',$form->fields,$usrid,$CFG);
		
	
		$link = ConnectDB($CFG);
		pg_close($link);
		}

	}		
	
	
function FetchAllDriverGroupData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllDriverGroupData());
}	
	
	
function GetAllDriverGroupData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	if($_SESSION['user']->level=='5')
					{
						$usr = $_SESSION['user']->id;
						pg_prepare($link,'sql314','SELECT id from w_drivermanager WHERE usr=$1');
	                    $result = pg_execute($link,'sql314',array($usr));
						$row = pg_fetch_array($result);
						
						pg_prepare($link,'sql315','SELECT * from w_drivergroup WHERE drivermanager_id=$1 AND enabled=$2');
	                    $result = pg_execute($link,'sql315',array($row['id'],'TRUE'));
					
					}
	             else 
				 {
	pg_prepare($link,'sql31','SELECT * from w_drivergroup WHERE enabled=$1');
	$result = pg_execute($link,'sql31',array('TRUE'));
				 }
				 
	$returants = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['group_name'];
		array_push($returants,$returant);
		}
		
		

	return $returants;
}



function DeleteDriver($data)
	{
	//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
	       pg_prepare($link,'sql00','SELECT usr,bringg_driverid FROM w_driver WHERE id=$1');
		   $result = pg_execute($link,'sql00',array($id));
	       $usr = pg_fetch_array($result); 
		   
		   
		   $url = 'http://api.bringg.com/partner_api/users/'.$usr['bringg_driverid'];

			$data_string = array(
			'company_id' => BRINGG_COMPANY_ID,
			'access_token' => BRINGG_ACCESS_TOKEN,
			'timestamp' => date('Y-m-d H:i:s')
			);
			$secret_key = BRINGG_SECRET_KEY;
			
			// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
			$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
			
			//print("The signature: " + $signature);
			
			$data_string["signature"] = $signature;
			
			//print("this is the data string: ");
			//print_r($data_string);
			
			$content = json_encode($data_string);
			
			//print("The content: " + $content);
			// $data_string = json_encode($data);
			$ch=curl_init($url);
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER,
			array('Content-Type:application/json',
			'Content-Length: ' . strlen($content))
			);
			
			//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
			
			$json_response = curl_exec($ch);
			
			$status = curl_getinfo($ch);
			
			curl_close($ch);
			$return_data = json_decode($json_response);
		   
		   pg_prepare($link,'sql01','DELETE FROM w_users WHERE id=$1');
			$result = pg_execute($link,'sql01',array($usr['usr']));
		   	
			pg_prepare($link,'sql0','DELETE FROM w_driver WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
				}
			
		pg_close($link);	
			
    }	
	
	
?>