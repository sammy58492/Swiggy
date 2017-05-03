<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
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
		GetDriverEmailAvailability($_POST['email'],$_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchAllDriverGroupData':
		FetchAllDriverGroupData();
	break;
	case 'FetchAllDriverGroupData1':
		FetchAllDriverGroupData1();
	break;
	
	case 'FetchAllDriverGroupIDData':
		FetchAllDriverGroupIDData($_POST['data']);
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
	
	
function GetDriverEmailAvailability($email,$id)
	{
	$link = ConnectDB();

	/*if ($id)
		{
		pg_prepare($link,'sql','SELECT id from w_driver WHERE email=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id from w_driver WHERE email=$1');
		$result = pg_execute($link,'sql',array($email));
		}*/

		//Fetch user id for driver id 4id
	pg_prepare($link,'sql106','SELECT usr from w_driver WHERE email = $1');
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
	
	

function SetEnabled($id,$enabled)
	{
	//AdminsOnly();
	
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
	$link = ConnectDB();
	//
	$data = json_decode($data);
	//print_r($data);
	$form = new stdClass();
	$temp=null;
	/*foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);

		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);	




	}*/
	$form = $data;
	//print_r($form);
	
	$usrid = $form->id;
	$user_id_update= $form->usr;

	
	pg_prepare($link,'sqludriverlangfetch','SELECT id FROM w_driver_lang where driver_id=$1');
	$result_id2 = pg_execute($link,'sqludriverlangfetch',array($usrid));
	$driver_lang_update=pg_fetch_array($result_id2);
	
	pg_prepare($link,'sqluserlangfetch','SELECT id FROM w_users_lang where users_id=$1');
	$result_id1 = pg_execute($link,'sqluserlangfetch',array($user_id_update));
	$user_lang_update=pg_fetch_array($result_id1);
	
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);


	$lastnameval = $form->fields->lastname->value;
	$lastnamelang = explode(",",$lastnameval);
	
	$addressval = $form->fields->address->value;
	$addresslang = explode(",",$addressval);
	
	$backgroundval = $form->fields->background->value;
	$backgroundlang = explode(",",$backgroundval);
	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($namelang as $key=>$nlang){

		if($key == $defaultid){	
			$form->fields->name->value = $nlang;
		}
	}
	
	foreach($lastnamelang as $key=>$lastlang){

		if($key == $defaultid){	
			$form->fields->lastname->value = $lastlang;
		}
	}
	foreach($addresslang as $key=>$adlang){

		if($key == $defaultid){	
			$form->fields->address->value = str_replace("***",",",$adlang);
		}
	}
	
	foreach($backgroundlang as $key=>$backlang){

		if($key == $defaultid){	
			$form->fields->background->value = $backlang;
		}
	}
	$level = array();
	$temp=null;
	$temp = new stdClass();
	
	//print_r($form->fields);
	foreach($form->fields as $name=>$set){
	$temp->$name = new stdClass();
	$temp->$name->value=$set->value;
	
	}
	
	
	
	
	
	$permission2 = 'BRINGG_COMPANY_ID';
	pg_prepare($link,'sqlbringpermission2','SELECT * from w_configs WHERE name=$1');
	$res2 = pg_execute($link,'sqlbringpermission2',array($permission2));
	$rows2 = pg_fetch_array($res2);
	
	
	$permission = 'BRING_PERMISSION';
	pg_prepare($link,'sqlbringpermission','SELECT * from w_configs WHERE name=$1');
	$res1 = pg_execute($link,'sqlbringpermission',array($permission));
	$rows = pg_fetch_array($res1);
	
				$formuser = new stdClass();	
				$formuser->fields = new stdClass();
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
					$formuser->fields->street->value = str_replace("***",",",$form->fields->address->value);
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
				
					
					$user_id = InsertQuery('w_users',$formuser->fields,$CFG);	
					$temp->usr->value = $user_id;
					
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
					unset($formuserlang->fields);
					$formuserlang->fields->users_id=new stdClass();
					$formuserlang->fields->users_id->value = $user_id;
					$formuserlang->fields->lang_id=new stdClass();
					$formuserlang->fields->lang_id->value = $key;
					$formuserlang->fields->name_lang=new stdClass();
					$formuserlang->fields->name_lang->value = $form->fields->name->value;
					$formuserlang->fields->lastname_lang=new stdClass();
					$formuserlang->fields->lastname_lang->value = $form->fields->lastname->value;
					$formuserlang->fields->lastname2_lang=new stdClass();
					$formuserlang->fields->lastname2_lang->value = $form->fields->lastname->value;
					$formuserlang->fields->street_lang=new stdClass();
					$formuserlang->fields->street_lang->value = str_replace("***",",",$form->fields->address->value);
					$formuserlang->fields->colony_lang=new stdClass();
					$formuserlang->fields->colony_lang->value = $form->fields->zip->value;
					$formuserlang->fields->status=new stdClass();
					$formuserlang->fields->status->value = 'true';
					$user_lang_id=InsertQuery('w_users_lang',$formuserlang->fields,$CFG);	
						}
					}
						
					
					
					$temp->scriptid->value=$_SESSION['scriptid'];				
					$usrid = InsertQuery('w_driver',$temp,$CFG);
					
					
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
						unset($datas->fields);
						$datas->fields->driver_id = new stdClass();
						$datas->fields->driver_id->ivalue = '';
						$datas->fields->driver_id->value = $usrid;		
		
						$datas->fields->lang_id = new stdClass();
						$datas->fields->lang_id->value = $key;
						$datas->fields->lang_id->ivalue = '';
		
						$datas->fields->name_lang = new stdClass();
						$datas->fields->name_lang->value = $nlang;
						$datas->fields->name_lang->ivalue = '';
						
						$datas->fields->lastname_lang = new stdClass();
						$datas->fields->lastname_lang->value = $lastnamelang[$key];
						$datas->fields->lastname_lang->ivalue = '';
						
						$datas->fields->address_lang = new stdClass();
						$datas->fields->address_lang->value = str_replace("***",",",$addresslang[$key]);
						$datas->fields->address_lang->ivalue = '';
						
						$datas->fields->background_lang = new stdClass();
						$datas->fields->background_lang->value = $backgroundlang[$key];
						$datas->fields->background_lang->ivalue = '';
		                
		  				$driver_lang_id=InsertQuery('w_driver_lang',$datas->fields,$CFG);
						
					}				
				}
							
					
				}else
				{
					/*echo $temp->level->value = $form->fields->level->value;
					echo "aaaaaaaaaaaaaa";
					print_r($form->fields->level);*/
					UpdateQuery('w_driver',$temp,$usrid,$CFG);
					
					$formuser->fields->name = new stdClass();
					$formuser->fields->name->ivalue = '';
					$formuser->fields->name->value = $form->fields->name->value;
					
					$formuser->fields->lastname2 = new stdClass();
					$formuser->fields->lastname2->ivalue = '';
					$formuser->fields->lastname2->value = $form->fields->lastname->value;
					
					$formuser->fields->pwd = new stdClass();
					$formuser->fields->pwd->ivalue = '';
					$formuser->fields->pwd->value = $form->fields->pwd->value;
					
					$formuser->fields->email = new stdClass();
					$formuser->fields->email->ivalue = '';
					$formuser->fields->email->value = $form->fields->email->value;
					
					$formuser->fields->street = new stdClass();
					$formuser->fields->street->ivalue = '';
					$formuser->fields->street->value = str_replace("***",",",$form->fields->address->value);
					
					$formuser->fields->cel = new stdClass();
					$formuser->fields->cel->ivalue = '';
					$formuser->fields->cel->value = $form->fields->mobile->value;
					
					$formuser->fields->country = new stdClass();
					$formuser->fields->country->ivalue = '';
					$formuser->fields->country->value = $form->fields->country->value;
					
					$formuser->fields->city = new stdClass();
					$formuser->fields->city->ivalue = '';
					$formuser->fields->city->value = $form->fields->city->value;
					
					$formuser->fields->cp = new stdClass();
					$formuser->fields->cp->ivalue = '';
					$formuser->fields->cp->value = $form->fields->zip->value;
					
					$formuser->fields->level = new stdClass();
					$formuser->fields->level->ivalue = '';
					$formuser->fields->level->value = 4;
					print_r($formuser->fields);
					
					UpdateQuery('w_users',$formuser->fields,$_SESSION['user']->id,$CFG);
					
					
					
					
					$formuserlang = new stdClass();
					foreach($namelang as $key=>$nlang){
					
					if(!empty($nlang)){		
					
					//unset($formuserlang->fields);
					
					$formuserlang->fields = new stdClass();
					
					$formuserlang->fields->users_id = new stdClass();					
					$formuserlang->fields->users_id->value = $user_id_update;
					
					$formuserlang->fields->lang_id = new stdClass();
					$formuserlang->fields->lang_id->value = $key;
					
					$formuserlang->fields->name_lang = new stdClass();
					$formuserlang->fields->name_lang->value = $form->fields->name->value;
					
					$formuserlang->fields->lastname_lang = new stdClass();
					$formuserlang->fields->lastname_lang->value = $form->fields->lastname->value;
					
					$formuserlang->fields->lastname2_lang = new stdClass();
					$formuserlang->fields->lastname2_lang->value = $form->fields->lastname->value;
					
					$formuserlang->fields->street_lang = new stdClass();
					$formuserlang->fields->street_lang->value = str_replace("***",",",$form->fields->address->value);
					$formuserlang->fields->colony_lang = new stdClass();
					$formuserlang->fields->colony_lang->value = $form->fields->zip->value;
				$formuserlang->fields->status = new stdClass();
					$formuserlang->fields->status->value = 'true';
					//print_r($formuserlang->fields);
				
					//UpdateQuery('w_users_lang',$formuserlang->fields,$user_lang_update["id"],$CFG);
					$link = ConnectDB();
					pg_prepare($link,'sqllangupdate'.$_SESSION['l'],'UPDATE w_users_lang SET name_lang=$1,lastname_lang=$2,street_lang=$3,lastname2_lang=$4 where lang_id=$5 and users_id=$6');
					pg_execute($link,'sqllangupdate'.$_SESSION['l'],array($formuserlang->fields->name_lang->value,$formuserlang->fields->lastname_lang->value,$formuserlang->fields->street_lang->value,$formuserlang->fields->lastname2_lang->value,$_SESSION['l'],$_SESSION['user']->id));					
						}
					}
					
					$datas = new stdClass();
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
						//unset($datas->fields);
						$datas->fields = new stdClass();
						
						$datas->fields->driver_id = new stdClass();	
						
						$datas->fields->driver_id->ivalue = '';
						$datas->fields->driver_id->value = $usrid;		
		
						$datas->fields->lang_id = new stdClass();	
						
						$datas->fields->lang_id->value = $key;
						$datas->fields->lang_id->ivalue = '';
		
						$datas->fields->name_lang = new stdClass();
						$datas->fields->name_lang->value = $nlang;
						$datas->fields->name_lang->ivalue = '';
						
						$datas->fields->lastname_lang = new stdClass();
						$datas->fields->lastname_lang->value = $lastnamelang[$key];
						$datas->fields->lastname_lang->ivalue = '';
						
						$datas->fields->address_lang = new stdClass();
						$datas->fields->address_lang->value = str_replace("***",",",$addresslang[$key]);
						$datas->fields->address_lang->ivalue = '';
						
						$datas->fields->background_lang = new stdClass();
						$datas->fields->background_lang->value = $backgroundlang[$key];
						$datas->fields->background_lang->ivalue = '';
		          		echo $driver_lang_update["id"];
		  				UpdateQuery('w_driver_lang',$datas->fields,$driver_lang_update["id"],$CFG);
						
					}				
				}
							
					//UpdateQuery('w_driver_lang',$datas->fields,$CFG);
					
					
				
					$link = ConnectDB($CFG);
					pg_close($link);
					}	
					
				

}	
	
function SaveDriverData($data)
	{ 
		//AdminsOnly();
	require('../config.php');	
	$link = ConnectDB();
	
	$data = parse($data);
	
	$temp=null;
	foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);

		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);	




	}
	$form = $data;
//	print_r($form);
	$usrid = $form->id;
	$user_id_update= $form->usr;
	//echo $user_id_update;
	
	pg_prepare($link,'sqludriverlangfetch','SELECT id FROM w_driver_lang where driver_id=$1');
	$result_id2 = pg_execute($link,'sqludriverlangfetch',array($usrid));
	$driver_lang_update=pg_fetch_array($result_id2);
	
	pg_prepare($link,'sqluserlangfetch','SELECT id FROM w_users_lang where users_id=$1');
	$result_id1 = pg_execute($link,'sqluserlangfetch',array($user_id_update));
	$user_lang_update=pg_fetch_array($result_id1);
	
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);


	$lastnameval = $form->fields->lastname->value;
	$lastnamelang = explode(",",$lastnameval);
	
	$addressval = $form->fields->address->value;
	$addresslang = explode(",",$addressval);
	
	$backgroundval = $form->fields->background->value;
	$backgroundlang = explode(",",$backgroundval);
	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($namelang as $key=>$nlang){

		if($key == $defaultid){	
			$form->fields->name->value = $nlang;
		}
	}
	
	foreach($lastnamelang as $key=>$lastlang){

		if($key == $defaultid){	
			$form->fields->lastname->value = $lastlang;
		}
	}
	foreach($addresslang as $key=>$adlang){

		if($key == $defaultid){	
			$form->fields->address->value = str_replace("***",",",$adlang);
		}
	}
	
	foreach($backgroundlang as $key=>$backlang){

		if($key == $defaultid){	
			$form->fields->background->value = $backlang;
		}
	}
	
	
	foreach($form->fields as $name=>$set){
	
	$temp->$name->value=$set->value;
	}
	
	
	
	
	
	$permission2 = 'BRINGG_COMPANY_ID';
	pg_prepare($link,'sqlbringpermission2','SELECT * from w_configs WHERE name=$1');
	$res2 = pg_execute($link,'sqlbringpermission2',array($permission2));
	$rows2 = pg_fetch_array($res2);
	
	
	$permission = 'BRING_PERMISSION';
	pg_prepare($link,'sqlbringpermission','SELECT * from w_configs WHERE name=$1');
	$res1 = pg_execute($link,'sqlbringpermission',array($permission));
	$rows = pg_fetch_array($res1);
	
	
				
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
					$formuser->fields->street->value = str_replace("***",",",$form->fields->address->value);
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
				
					
					$user_id = InsertQuery('w_users',$formuser->fields,$CFG);	
					$temp->usr->value = $user_id;
					
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
					unset($formuserlang->fields);
					$formuserlang->fields->users_id=new stdClass();
					$formuserlang->fields->users_id->value = $user_id;
					$formuserlang->fields->lang_id=new stdClass();
					$formuserlang->fields->lang_id->value = $key;
					$formuserlang->fields->name_lang=new stdClass();
					$formuserlang->fields->name_lang->value = $form->fields->name->value;
					$formuserlang->fields->lastname_lang=new stdClass();
					$formuserlang->fields->lastname_lang->value = $form->fields->lastname->value;
					$formuserlang->fields->lastname2_lang=new stdClass();
					$formuserlang->fields->lastname2_lang->value = $form->fields->lastname->value;
					$formuserlang->fields->street_lang=new stdClass();
					$formuserlang->fields->street_lang->value = str_replace("***",",",$form->fields->address->value);
					$formuserlang->fields->colony_lang=new stdClass();
					$formuserlang->fields->colony_lang->value = $form->fields->zip->value;
					$formuserlang->fields->status=new stdClass();
					$formuserlang->fields->status->value = 'true';
					$user_lang_id=InsertQuery('w_users_lang',$formuserlang->fields,$CFG);	
						}
					}
						
					
					
					$temp->scriptid->value=$_SESSION['scriptid'];				
					$usrid = InsertQuery('w_driver',$temp,$CFG);
					
					
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
						unset($datas->fields);
						$datas->fields->driver_id = new stdClass();
						$datas->fields->driver_id->ivalue = '';
						$datas->fields->driver_id->value = $usrid;		
		
						$datas->fields->lang_id = new stdClass();
						$datas->fields->lang_id->value = $key;
						$datas->fields->lang_id->ivalue = '';
		
						$datas->fields->name_lang = new stdClass();
						$datas->fields->name_lang->value = $nlang;
						$datas->fields->name_lang->ivalue = '';
						
						$datas->fields->lastname_lang = new stdClass();
						$datas->fields->lastname_lang->value = $lastnamelang[$key];
						$datas->fields->lastname_lang->ivalue = '';
						
						$datas->fields->address_lang = new stdClass();
						$datas->fields->address_lang->value = str_replace("***",",",$addresslang[$key]);
						$datas->fields->address_lang->ivalue = '';
						
						$datas->fields->background_lang = new stdClass();
						$datas->fields->background_lang->value = $backgroundlang[$key];
						$datas->fields->background_lang->ivalue = '';
		                
		  				$driver_lang_id=InsertQuery('w_driver_lang',$datas->fields,$CFG);
						
					}				
				}
							
					
				}else
				{
					UpdateQuery('w_driver',$temp,$usrid,$CFG);
					
					$formuser->fields->name->value = $form->fields->name->value;
					
					$formuser->fields->lastname2->value = $form->fields->lastname->value;
					
					$formuser->fields->pwd->value = $form->fields->pwd->value;
					
					$formuser->fields->email->value = $form->fields->email->value;
					
					$formuser->fields->street->value = str_replace("***",",",$form->fields->address->value);
					
					$formuser->fields->cel->value = $form->fields->mobile->value;
					
					$formuser->fields->country->value = $form->fields->country->value;
					
					$formuser->fields->city->value = $form->fields->city->value;
					
					$formuser->fields->cp->value = $form->fields->zip->value;
					
					$formuser->fields->level->value = 4;
					//print_r($formuser->fields);
					UpdateQuery('w_users',$formuser->fields,$user_id_update,$CFG);
					
					
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
					unset($formuserlang->fields);
				
					$formuserlang->fields->users_id->value = $user_id_update;
					
					$formuserlang->fields->lang_id->value = $key;
					
					$formuserlang->fields->name_lang->value = $form->fields->name->value;
					
					$formuserlang->fields->lastname_lang->value = $form->fields->lastname->value;
					
					$formuserlang->fields->lastname2_lang->value = $form->fields->lastname->value;
					
					$formuserlang->fields->street_lang->value = str_replace("***",",",$form->fields->address->value);
					
					$formuserlang->fields->colony_lang->value = $form->fields->zip->value;
				
					$formuserlang->fields->status->value = 'true';
					//print_r($formuserlang->fields);
					//echo $user_lang_update["id"];
					UpdateQuery('w_users_lang',$formuserlang->fields,$user_lang_update["id"],$CFG);
						}
					}
					
					
					foreach($namelang as $key=>$nlang){

					if(!empty($nlang)){		
						unset($datas->fields);
						
						$datas->fields->driver_id->ivalue = '';
						$datas->fields->driver_id->value = $usrid;		
		
						
						$datas->fields->lang_id->value = $key;
						$datas->fields->lang_id->ivalue = '';
		
						
						$datas->fields->name_lang->value = $nlang;
						$datas->fields->name_lang->ivalue = '';
						
						
						$datas->fields->lastname_lang->value = $lastnamelang[$key];
						$datas->fields->lastname_lang->ivalue = '';
						
						
						$datas->fields->address_lang->value = str_replace("***",",",$addresslang[$key]);
						$datas->fields->address_lang->ivalue = '';
						
						
						$datas->fields->background_lang->value = $backgroundlang[$key];
						$datas->fields->background_lang->ivalue = '';
		               echo $driver_lang_update["id"];
		  				UpdateQuery('w_driver_lang',$datas->fields,$driver_lang_update["id"],$CFG);
						
					}				
				}
							
					//UpdateQuery('w_driver_lang',$datas->fields,$CFG);
					
					
				
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
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result4 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result4);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	if($_SESSION['user']->level=='5')
					{
						$usr = $_SESSION['user']->id;
						pg_prepare($link,'sql314','SELECT id from w_drivermanager WHERE usr=$1');
	                    $result = pg_execute($link,'sql314',array($usr));
						$row = pg_fetch_array($result);
						
						pg_prepare($link,'sql315','SELECT * from w_drivergroup WHERE drivermanager_id=$1 AND enabled=$2 AND scriptid=$3');
	                    $result = pg_execute($link,'sql315',array($row['id'],'TRUE',$_SESSION['scriptid']));
					
					}
	             else 
				 {
	pg_prepare($link,'sql31','SELECT * from w_drivergroup WHERE enabled=$1 AND scriptid=$2');
	$result = pg_execute($link,'sql31',array('TRUE',$_SESSION['scriptid']));
				 }
				 
	$returants = array();
	
	while($row = pg_fetch_array($result))
		{
	//	unset($returant);
		$returant = new stdClass();
		$returant->id = $row['id'];
		$returant->caption = FetchDriverNameLangDefault($defultlang,$row['id'],$link);
		if($returant->caption !=null)
		array_push($returants,$returant);
		}
		
		

	return $returants;
}

function FetchDriverNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlangdrivergroup4'.$cid,'SELECT * from w_drivergroup_lang WHERE drivergroup_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdrivergroup4'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['group_name_lang'];
}

function DeleteDriver($data)
	{
	//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	/////////////bring delete///////////////
		 pg_prepare($link,'sq200','SELECT bringg_driverid FROM w_driver WHERE id=$1');
		 $result22 = pg_execute($link,'sq200',array($data->ids[0]));
	     $usr12 = pg_fetch_array($result22); 
		   
	
		
		/*$url = 'http://api.bringg.com/partner_api/users/'.$usr12['bringg_driverid'];
		
		$data_string = array(
		'company_id' => "4168",
		'access_token' => "pyZgq26MSTrjBJys5zxe",
		'timestamp' => date('Y-m-d H:i:s')
		);
		$secret_key = "fATzKYy-phnMUBKdjx8H";
		
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
		$return_data = json_decode($json_response);*/
		
	/*	echo "<pre>";
		print_r($return_data);
		echo "</pre>";
		*/
		
	
	/////////////bring delete end//////////
	
	foreach ($data->ids as $id)
		{
	       pg_prepare($link,'sql00','SELECT usr FROM w_driver WHERE id=$1');
		   $result = pg_execute($link,'sql00',array($id));
	       $usr = pg_fetch_array($result); 
		   
		   pg_prepare($link,'sql01','DELETE FROM w_users WHERE id=$1');
			$result = pg_execute($link,'sql01',array($usr['usr']));
		   	
			pg_prepare($link,'sql0','DELETE FROM w_driver WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
			pg_prepare($link,'sql058','DELETE FROM w_driver_lang WHERE driver_id=$1');
			$result = pg_execute($link,'sql058',array($id));
			
				}
			
		pg_close($link);	
			
    }	
	

function FetchAllDriverGroupIDData($data){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sqldri','SELECT * from w_drivergroup ORDER BY id ASC');
	$result = pg_execute($link,'sqldri',array());
	$drivergroups = array();
	
	while($row = pg_fetch_array($result)){
		unset($drivergroup);
		$drivergroup->id = $row['id'];
		$drivergroup->group_name = FetchDriverGroupNameLangDefault($defultlang,$row['id'],$link);
		if($drivergroup->group_name !=null)
		array_push($drivergroups,$drivergroup);	
	}
	echo json_encode($drivergroups);
}

function FetchDriverGroupNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlcitydefalutlang'.$cid,'SELECT * from w_drivergroup_lang WHERE drivergroup_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlcitydefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['group_name_lang'];
}
	
?>
