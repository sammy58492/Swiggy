<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllDriversData':
		FetchAllAdsData($_POST['filters']);
	break;
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SaveAd':
		SaveAd($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/

function GetAllAdsData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
		$query = 'SELECT * FROM w_driver';

	if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			if ($count>0)
				$conditionals .= ',' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);
	pg_close($link);
	
	$drivers = array();
	while($row = pg_fetch_array($result))
		{
		unset($driver);
		
		$driver->id = $row['id'];
		$driver->name = $row['name'];
		$driver->lastname = $row['lastname'];
		$driver->phonenumber = $row['phonenumber'];
		$driver->description = $row['description'];
		$driver->enabled = $row['enabled'];
		$driver->email = $row['email'];
		
		array_push($drivers,$driver);
		}

	return $drivers;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAllAdsData($filters)
	{
	SuperAdminsOnly();
	echo json_encode(GetAllAdsData($filters));
	}

/********************************************DELETE FRANCHISE****************************************************************/

function DeleteAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'driver/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_driver WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveAd($data)
	{
	require('../config.php');
	$link = ConnectDB();	
	$form = parse($data);
	$adid = $form->id;
	
	require('resize.php');
		if ($form->image1)
		{
			//echo 1;
		$oldname = $CFG->dirimages.'temp/'.$form->image1;
		MoveImages($CFG->dirimages . 'banner/1/',$oldname,$adid,false,0);
	    }
	/*else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
				//echo 2;
	    	$oldname = $CFG->dirimages.'banner/1/dummy.jpg';
			MoveImages($CFG->dirimages.'banner/1/',$oldname,$adid,true,0);
	    	}*/
			
		if ($form->image2)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image2;
		MoveImages($CFG->dirimages . 'banner/2/',$oldname,$adid,false,0);
	    }
	/*else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'banner/2/dummy.jpg';
			MoveImages($CFG->dirimages.'banner/2/',$oldname,$adid,true,0);
	    	}*/
			
		if ($form->image3)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image3;
		MoveImages($CFG->dirimages . 'banner/3/',$oldname,$adid,false,0);
	    }
	/*else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'banner/3/dummy.jpg';
			MoveImages($CFG->dirimages.'banner/3/',$oldname,$adid,true,0);
	    	}	*/
	if ($form->image4)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image4;
		MoveImages($CFG->dirimages . 'banner/4/',$oldname,$adid,false,0);
	    }
	/*else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'banner/4/dummy.jpg';
			MoveImages($CFG->dirimages.'banner/4/',$oldname,$adid,true,0);
	    	}*/		
		

	}

function MoveImages($root,$oldname,$usrid,$dummy,$type)
	{
	$folder = $root .$usrid.'/';
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension


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

		if ($type=='0')
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1100,201);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1350,774);
			$image->save($folder.'banner.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			}
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		//create thumbnail and regular size
		if ($type=='0')
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1100,201);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1350,774);
			$image->save($folder.'banner.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			}
		}
	}


function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_driver SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
	
function GetDriverData($id,$email)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_driver  WHERE id=$1');
	$res=pg_execute($link,'sql',array($id));
	$rec = pg_fetch_array($res);
	$usr = $rec['usr'];
			if($email!="null")
			{
			pg_prepare($link,'sqls9','UPDATE w_users SET email=$1 WHERE id=$2');
			pg_execute($link,'sqls9',array($email,$usr));
			}
	}
function checkunique($email)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sqla2','SELECT * FROM w_users  WHERE email=$1');
	$res=pg_execute($link,'sqla2',array($email));
	$record = pg_num_rows($res);
	
	 return $record;
	}	
	



?>
