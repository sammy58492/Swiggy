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
	case 'SaveUser':
		SaveUser($_POST['data']);
	break;
	case 'GetEmailAvailability':
		GetEmailAvailability($_POST['email'],$_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	default:
		die();
	break;
	}

/*******************************************************UPDATE GLOBAL USER PREFS************************************************/

function SaveConfig($config)
	{
	$link = ConnectDB();
	pg_prepare($link,'sql','UPDATE w_users SET config=$1 WHERE id=$2');
	$result = pg_execute($link,'sql',array($config,$_SESSION['user']->id));
	pg_close($link);	
	}

/*************************************************************GET USER CONFIG***************************************************************/

function GetUserConfig()
	{
	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT config FROM w_users WHERE id=$1');
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

		pg_prepare($link,'sql','SELECT name,lastname,lastname2,email,street,colony,cp,city,tel,cel,job,location,level from w_users WHERE id=$1');
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
		
		pg_prepare($link,'sqllangdatadel0','DELETE FROM w_users_lang WHERE users=$1');
		$result = pg_execute($link,'sqllangdatadel0',array($id));
		
		if ($_SESSION['user']->level<$user->level)
			{
			RemoveDir($CFG->dirimages . 'users/' . $id . '/');
			pg_prepare($link,'sql0','DELETE FROM w_users WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
			if ($user->level==1)//if deleting user that is admin, he cannot be admin of franchise if we founded as it
				{
				pg_prepare($link,'sql1','SELECT id FROM w_franchises WHERE admin=$1');
				$result = pg_execute($link,'sql1',array($id));
				if (pg_num_rows($result)>0)  
					{
					//get the superadmin id for asigning as admin of franchise
					pg_prepare($link,'sql2','SELECT id FROM w_users WHERE level=$1');
						$result2 = pg_execute($link,'sql2',array('0'));
						if (pg_num_rows($result2)==1)  
							while($row2 = pg_fetch_array($result2))
							$adminid = new stdClass();
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
					pg_prepare($link,'sql5','SELECT id FROM w_users WHERE level=$1');
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
		
	
	require('../config.php');
	//print_r($data);
	$data = parse($data);
	//$form = json_decode($data);
	$link = ConnectDB();
	$temp=null;
	
	foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);

		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	
		
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);	


		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	$form = $data;	
	$usrid = $form->id;
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);


	$lastnameval = $form->fields->lastname->value;
	$lastnamelang = explode(",",$lastnameval);
	
	$lastname2val = $form->fields->lastname2->value;
	$lastname2lang = explode(",",$lastname2val);
	
	$addressval = $form->fields->street->value;
	$addresslang = explode(",",$addressval);
	
	$jobval = $form->fields->job->value;
	$joblang = explode(",",$jobval);
	
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
	
	foreach($lastname2lang as $key=>$last2lang){

		if($key == $defaultid){	
			$form->fields->lastname2->value = $last2lang;
		}
	}
	
	foreach($addresslang as $key=>$adlang){

		if($key == $defaultid){	
			$form->fields->street->value = str_replace("***",",",$adlang);
		}
	}
	foreach($joblang as $key=>$jolang){

		if($key == $defaultid){	
			$form->fields->job->value = $jolang;
		}
	}
	
	
	$temp = new stdClass();
	foreach($form->fields as $name=>$set){
	$temp->$name = new stdClass();
	$temp->$name->value=$set->value;
	}
	
	echo $_SERVER['DOCUMENT_ROOT'];
	
	if ($form->type=='create'){
		
	$temp->email->value = strtolower($temp->email->value);
		$usrid = InsertQuery('w_users',$temp,$CFG);	
		
		foreach($namelang as $key=>$nlang){

			if(!empty($nlang)){		
				//unset($datas->fields);
				$datas = new stdClass();
				$datas->fields->users_id = new stdClass();
				$datas->fields->users_id->ivalue = '';
				$datas->fields->users_id->value = $usrid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->name_lang = new stdClass();
				$datas->fields->name_lang->value = $nlang;
				$datas->fields->name_lang->ivalue = '';
				
				$datas->fields->lastname_lang = new stdClass();
				$datas->fields->lastname_lang->value = $lastnamelang[$key];
				$datas->fields->lastname_lang->ivalue = '';
				
				$datas->fields->lastname2_lang = new stdClass();
				$datas->fields->lastname2_lang->value = $lastname2lang[$key];
				$datas->fields->lastname2_lang->ivalue = '';
				
				$datas->fields->street_lang = new stdClass();
				$datas->fields->street_lang->value = str_replace("***",",",$addresslang[$key]);
				$datas->fields->street_lang->ivalue = '';
				
				$datas->fields->job_lang = new stdClass();
				$datas->fields->job_lang->value = $joblang[$key];
				$datas->fields->job_lang->ivalue = '';

				InsertQuery('w_users_lang',$datas->fields,$CFG);
			}				
		}	
		
	}else
		{
			//print_r($temp->email->value);
			$temp->email->value = strtolower($temp->email->value);
		UpdateQuery('w_users',$temp,$usrid,$CFG);
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){
				$link = ConnectDB();	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_users_lang where lang_id=$1 AND users_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$usrid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->users_id = new stdClass();
					$forms->fields->users_id->ivalue = '';
					$forms->fields->users_id->value = $usrid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->lastname_lang = new stdClass();
					$forms->fields->lastname_lang->value = $lastnamelang[$key];
					$forms->fields->lastname_lang->ivalue = '';
					
					$forms->fields->lastname2_lang = new stdClass();
					$forms->fields->lastname2_lang->value = $lastname2lang[$key];
					$forms->fields->lastname2_lang->ivalue = '';
					
					$forms->fields->street_lang = new stdClass();
					$forms->fields->street_lang->value = str_replace("***",",",$addresslang[$key]);
					$forms->fields->street_lang->ivalue = '';
					
					$forms->fields->job_lang = new stdClass();
					$forms->fields->job_lang->value = $joblang[$key];
					$forms->fields->job_lang->ivalue = '';

					InsertQuery('w_users_lang',$forms->fields,$CFG);

				}else{
					$addresslang[$key]=str_replace("***",",",$addresslang[$key]);
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_users_lang SET name_lang=$1,lastname_lang=$2,street_lang=$3,lastname2_lang=$4,job_lang=$5 where lang_id=$6 and users_id=$7');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$lastnamelang[$key],$addresslang[$key],$lastname2lang[$key],$joblang[$key],$key,$usrid));					
				}
									
			}				
		}
		
		$link = ConnectDB($CFG);
		if ($form->fields->level->value!=1)//if saving user is not an admin, he cannot be admin of franchise if we founded as it
			{
			pg_prepare($link,'sql1','SELECT id FROM w_franchises WHERE admin=$1');
			$result = pg_execute($link,'sql1',array($usrid));
			if (pg_num_rows($result)>0)  
				{
				//get the superadmin id for asigning as admin of franchise
				pg_prepare($link,'sql2','SELECT id FROM w_users WHERE level=$1');
					$result2 = pg_execute($link,'sql2',array('0'));
					if (pg_num_rows($result2)==1)  
						while($row2 = pg_fetch_array($result2))
							$adminid = $row2['id'];

				while($row = pg_fetch_array($result))//if we do got franchises where he is admin... remove it
					{
					$franchiseid = $row['id'];
					pg_prepare($link,'sql3'.$row['id'],'UPDATE w_franchises SET admin=$1 WHERE id=$2');
					pg_execute($link,'sql3'.$row['id'],array($adminid,$franchiseid));
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
				pg_prepare($link,'sql5','SELECT id FROM w_users WHERE level=$1');
					$result2 = pg_execute($link,'sql5',array('0'));
					if (pg_num_rows($result2)==1)  
						while($row2 = pg_fetch_array($result2))
							$adminid = $row2['id'];

				while($row = pg_fetch_array($result))//if we do got businesses where he is provider... remove it
					{
					$businessid = $row['id'];					
					pg_prepare($link,'sql6'.$row['id'],'UPDATE w_business SET provider=$1 WHERE id=$2');
					pg_execute($link,'sql6'.$row['id'],array($adminid,$businessid));
					}
				}
			}

		pg_close($link);
		}

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image)
		{
		$oldname = $CFG->dir.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'users/',$oldname,$usrid);
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','UPDATE w_users SET isimg=$1 WHERE id=$2');
	    pg_execute($link,'sql',array(1,$usrid));
		pg_close($link);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{   $link = ConnectDB($CFG);
	    	    pg_prepare($link,'sql','UPDATE w_users SET isimg=$1 WHERE id=$2');
				pg_execute($link,'sql',array(0,$usrid));
				pg_close($link);
	    	}
	}

/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'normal.jpg';
	
	//if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = explode(".",$form->image);
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
		$email = strtolower($email);
	$link = ConnectDB();

	if ($id)
		{
		pg_prepare($link,'sql','SELECT id from w_users WHERE lower(email)=lower($1) and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id from w_users WHERE lower(email)=lower($1)');
		$result = pg_execute($link,'sql',array($email));
		}

	if (pg_num_rows($result)==0)  
		echo 'ok';
	
	pg_close($link);
	}

function SetEnabled($id,$enabled)
	{
	AdminsOnly();
	
	$link = ConnectDB();		
	$data = parse($data);

	$user = GetUserData($id,$link);//get user data to see if user can modify the enables status

	if ($user->level=='0')
		die();

	pg_prepare($link,'sqli','UPDATE w_users SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
?>
