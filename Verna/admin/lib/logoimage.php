<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{

	case 'SaveLogo':
		SaveLogo($_POST['data']);
	break;
	case 'FetchImageStatus' :
	FetchImageStatus();
	break;
	default:
		die();
	break;
	}

/*******************************************SAVE LoGo*********************************************************************/
function FetchImageStatus(){
	require('../config.php');
	$path1 = $CFG->dirimages . 'logo/1';
	$path2 = $CFG->dirimages . 'logo/2';
	 $image = new stdClass();
	if(is_dir($path1)){
		$image->status1 = true;	
	}else{
		$image->status1 = false;		
	}
	if(is_dir($path2)){
		$image->status2 = true;	
	}else{
		$image->status2 = false;		
	}
	
	echo json_encode($image);
}

function SaveLogo($data)
	{
	require('../config.php');
	$link = ConnectDB();	
	$form = parse($data);
	$adid = $form->id;
	
	
	require('resize.php');
		if ($form->image1)
		{
			//echo 1;
		$oldname = $CFG->dir.'temp/'.$form->image1;
		MoveImages($CFG->dirimages . 'logo/1/',$oldname,$adid,false,0);
	    }	
			
		if ($form->image2)
		{
		$oldname = $CFG->dir.'temp/'.$form->image2;
		MoveImages($CFG->dirimages . 'logo/3/',$oldname,$adid,false,0);
	    }
		
	}

function MoveImages($root,$oldname,$usrid,$dummy,$type)
	{
	$folder = $root .$usrid.'/';
	$finalname = $folder.'original.jpg';
	$finalname1 = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension


	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);

		imagepng($output,$finalname);

		imagepng($output,$finalname1);
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
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(493,241);
			$image->save($folder.'real.jpg');
			
			//$image = new SimpleImage();
			//$image->load($finalname);
			//$image->resize(401,62);
			//$image->save($folder.'normal.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(493,241);
			$image->save($folder.'real.jpg');
			
			//$image = new SimpleImage();
			//$image->load($finalname);
			//$image->resize(401,62);
			//$image->save($folder.'normal.jpg');
			}
		}
		else
		{
		copy($oldname,$finalname);
		copy($oldname,$finalname1);
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
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(493,241);
			$image->save($folder.'real.jpg');
			
			//$image = new SimpleImage();
			//$image->load($finalname);
			//$image->resize(401,62);
			//$image->save($folder.'normal.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(493,241);
			$image->save($folder.'real.jpg');
			
			//$image = new SimpleImage();
			//$image->load($finalname);
			//$image->resize(401,62);
			//$image->save($folder.'normal.jpg');
			}
		}
	}

?>
