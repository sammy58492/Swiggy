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
	case 'DeleteDriverManager':
		DeleteDriverManager($_POST['data']);
	break;
	case 'SaveDriver':
		SaveDriver($_POST['data']);
	break;
	case 'GetEmailAvailability':
		GetEmailAvailability($_POST['email'],$_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchAllCountriesIDData':
		FetchAllCountriesIDData($_POST['data']);
	break;
	case 'FetchAllCityIDData':
		FetchAllCityIDData($_POST['data'],$_POST['countryid']);
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

function DeleteDriverManager($data)
	{
	AdminsOnly();
	require('../config.php');	
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
			$link = ConnectDB($CFG);
		   pg_prepare($link,'sql00','SELECT usr FROM w_drivermanager WHERE id=$1');
		   $result = pg_execute($link,'sql00',array($id));
	       $usr = pg_fetch_array($result); 
		   
		   pg_prepare($link,'sql01','DELETE FROM w_users WHERE id=$1');
		   $result = pg_execute($link,'sql01',array($usr['usr']));
	
			pg_prepare($link,'sql0','DELETE FROM w_drivermanager WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
			pg_close($link);
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql0','DELETE FROM w_drivermanager_lang WHERE drivermanager_id=$1');
			$result = pg_execute($link,'sql0',array($id));
			pg_close($link);
			
			}

			
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

	if ($id)
		{
		
		pg_prepare($link,'sql','SELECT * from w_users WHERE email=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		
		pg_prepare($link,'sql','SELECT * from w_users WHERE email=$1');
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

	pg_prepare($link,'sqli','UPDATE w_drivermanager SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
function SaveDriver($data)
	{
	//AdminsOnly();
	require('../config.php');
	$link = ConnectDB();
	$data = json_decode($data);
	
	$temp=null;
	foreach($data->fields as $name=>$set){
		$set->value = str_replace("@@","+",$set->value);
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);

		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');*/		


	}
	$form = $data;
	$usrid = $form->id;
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);


	$lastnameval = $form->fields->lastname->value;
	$lastnamelang = explode(",",$lastnameval);
	
	$addressval = $form->fields->address->value;
	$addresslang = explode(",",$addressval);
	
	
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
	
	
	foreach($form->fields as $name=>$set){
	
	$temp->$name->value=$set->value;
	}
	
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
		$formuser->fields->level->value = 5;
		
		$user_id = InsertQuery('w_users',$formuser->fields,$CFG);
		
		//$temp->fields->usr=new stdClass();
		$temp->usr->value = $user_id;
		$usrid = InsertQuery('w_drivermanager',$temp,$CFG);
		foreach($namelang as $key=>$nlang){

			if(!empty($nlang)){		
				unset($datas->fields);
				$datas->fields->drivermanager_id = new stdClass();
				$datas->fields->drivermanager_id->ivalue = '';
				$datas->fields->drivermanager_id->value = $usrid;		

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

				InsertQuery('w_drivermanager_lang',$datas->fields,$CFG);
			}				
		}


		
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
		$formuser->fields->street->value = str_replace("***",",",$form->fields->address->value);
		$formuser->fields->cel=new stdClass();
		$formuser->fields->cel->value = $form->fields->mobile->value;
		$formuser->fields->country=new stdClass();
		$formuser->fields->country->value = $form->fields->country->value;
		$formuser->fields->city=new stdClass();
		$formuser->fields->city->value = $form->fields->city->value;
		$formuser->fields->cp=new stdClass();
		$formuser->fields->cp->value = $form->fields->zip->value;
		unset($form->fields->level);
		unset($form->fields->location);
		//print_r($form);exit;
	    
		UpdateQuery('w_users',$formuser->fields,$form->usr,$CFG);
		
		UpdateQuery('w_drivermanager',$temp,$form->id,$CFG);
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){
				$link = ConnectDB();	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_drivermanager_lang where lang_id=$1 AND drivermanager_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$usrid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->drivermanager_id = new stdClass();
					$forms->fields->drivermanager_id->ivalue = '';
					$forms->fields->drivermanager_id->value = $usrid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->lastname_lang = new stdClass();
					$forms->fields->lastname_lang->value = $lastnamelang[$key];
					$forms->fields->lastname_lang->ivalue = '';
					
					$forms->fields->address_lang = new stdClass();
					$forms->fields->address_lang->value = str_replace("***",",",$addresslang[$key]);
					$forms->fields->address_lang->ivalue = '';

					InsertQuery('w_drivermanager_lang',$forms->fields,$CFG);

				}else{
					$addresslang[$key]=str_replace("***",",",$addresslang[$key]);
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_drivermanager_lang SET name_lang=$1,lastname_lang=$2,address_lang=$3 where lang_id=$4 and drivermanager_id=$5');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$lastnamelang[$key],$addresslang[$key],$key,$usrid));					
				}
									
			}				
		}
		
		
		}

	}	

/*************************************************/
function FetchAllCountriesIDData($data){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sql','SELECT * from w_countries ORDER BY id ASC');
	$result = pg_execute($link,'sql',array());
	$countries = array();
	
	while($row = pg_fetch_array($result)){
		unset($country);
		$country->id = $row['id'];
		$country->name = FetchCountriesLangDefault($defultlang,$row['id'],$link);
		if($country->name !=null)
		array_push($countries,$country);	
	}
	echo json_encode($countries);
}

function FetchCountriesLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}


function FetchAllCityIDData($data,$countryid){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sqlcity','SELECT * from w_franchises WHERE country=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sqlcity',array($countryid));
	$cities = array();
	
	while($row = pg_fetch_array($result)){
		unset($city);
		$city->id = $row['id'];
		$city->city = FetchCityLangDefault($defultlang,$row['id'],$link);
		if($city->city !=null)
		array_push($cities,$city);	
	}
	echo json_encode($cities);
}

function FetchCityLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlcitydefalutlang'.$cid,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlcitydefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
}	
?>
