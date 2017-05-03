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
	case 'GetGroupNameAvailability':
		GetGroupNameAvailability($_POST['group_name'],$_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchAllRestData':
			FetchAllRestData();
			break;
	case 'FetchAllDriverManagerData':
			FetchAllDriverManagerData();
			break;
	/*case 'GetGroupNameAvailability':
		GetGroupNameAvailability($_POST['email'],$_POST['id']);
	break;*/
	case 'DeleteDriverGroup':
		DeleteDriverGroup($_POST['data']);
		break;
	default:
		die();
	break;
	}

/*******************************************************UPDATE GLOBAL USER PREFS************************************************/

function SaveConfig($config)
	{
	$link = ConnectDB();
	pg_prepare($link,'sql','UPDATE w_drivergroup SET config=$1 WHERE id=$2');
	$result = pg_execute($link,'sql',array($config,$_SESSION['user']->id));
	pg_close($link);	
	}

/*************************************************************GET USER CONFIG***************************************************************/

function GetUserConfig()
	{
	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT config FROM w_drivergroup WHERE id=$1');
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

		pg_prepare($link,'sql','SELECT name,lastname,lastname2,email,street,colony,cp,city,tel,cel,job,location,level from w_drivergroup WHERE id=$1');
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
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
	
			pg_prepare($link,'sql0','DELETE FROM w_drivergroup WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
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
		$usrid = InsertQuery('w_drivergroup',$form->fields,$CFG);	
		else
		{
		UpdateQuery('w_drivergroup',$form->fields,$usrid,$CFG);
		$link = ConnectDB($CFG);
		if ($form->fields->level->value!=1)//if saving user is not an admin, he cannot be admin of franchise if we founded as it
			{
			pg_prepare($link,'sql1','SELECT id FROM w_franchises WHERE admin=$1');
			$result = pg_execute($link,'sql1',array($usrid));
			if (pg_num_rows($result)>0)  
				{
				//get the superadmin id for asigning as admin of franchise
				pg_prepare($link,'sql2','SELECT id FROM w_drivergroup WHERE level=$1');
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
				pg_prepare($link,'sql5','SELECT id FROM w_drivergroup WHERE level=$1');
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
			pg_prepare($link,'sql','UPDATE w_drivergroup SET isimg=$1 WHERE id=$2');
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
				pg_prepare($link,'sql','UPDATE w_drivergroup SET isimg=$1 WHERE id=$2');
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
		pg_prepare($link,'sql','SELECT id from w_drivergroup WHERE email=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id from w_drivergroup WHERE email=$1');
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

	pg_prepare($link,'sqli','UPDATE w_drivergroup SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
function SaveDriver($data)
	{
	//AdminsOnly();
	require('../config.php');
	$form = parse($data);
	print_r($form);
	$usrid = $form->id;
	
	if ($form->type=='create')
	{
		$usrid = InsertQuery('w_drivergroup',$form->fields,$CFG);
		
	}
		else
		{
		UpdateQuery('w_drivergroup',$form->fields,$usrid,$CFG);
		$link = ConnectDB($CFG);
		pg_close($link);
		}

	}	
	

function FetchAllRestData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}



function GetAllRestData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sql31','SELECT * from w_business WHERE enabled=$1	');
	$result = pg_execute($link,'sql31',array('TRUE'));

	$returants = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['name'];
		array_push($returants,$returant);
		}
		
		

	return $returants;
}	
	

function FetchAllDriverManagerData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllDriverManagerData());
}


function GetAllDriverManagerData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	if($_SESSION['user']->level==5){
	pg_prepare($link,'sql31','SELECT * from w_drivermanager WHERE usr=$1');
	$result = pg_execute($link,'sql31',array($_SESSION['user']->id));
	}
	else
	{
		pg_prepare($link,'sql31','SELECT * from w_drivermanager WHERE enabled=$1');
	    $result = pg_execute($link,'sql31',array('TRUE'));
	}

	$returants = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['name'];
		array_push($returants,$returant);
		}
		
		

	return $returants;
}


function GetGroupNameAvailability($group_name,$id)
	{
	$link = ConnectDB();

	if ($id)
		{
		pg_prepare($link,'sql','SELECT id from w_drivergroup WHERE group_name=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($group_name,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id from w_drivergroup WHERE group_name=$1');
		$result = pg_execute($link,'sql',array($group_name));
		}

	if (pg_num_rows($result)==0)  
		echo 'ok';
	
	pg_close($link);
	}
	
	
function DeleteDriverGroup($data)
	{
	//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
	
			pg_prepare($link,'sql0','DELETE FROM w_drivergroup WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
				}
			
		pg_close($link);	
			
    }
	

	
	
?>