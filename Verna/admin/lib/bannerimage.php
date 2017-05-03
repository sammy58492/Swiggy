<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'SaveBanner':
		SaveBanner($_POST['data']);
	break;
	case 'FetchAllBanner':
		FetchAllBanner($_POST['data']);
	break;
	default:
        die();
        break;
	}
	
/*********************************FETCH BANNER***********************************/

function FetchAllBanner(){
	require('../config.php');
	$path1 = $CFG->dirimages . 'banner/home1';
	$path2 = $CFG->dirimages . 'banner/home2';
	$path3 = $CFG->dirimages . 'banner/home3';
	$path4 = $CFG->dirimages . 'banner/home4';
	 $banner = new stdClass();
	if(is_dir($path1)){
		$banner->status1 = true;	
	}else{
		$banner->status1 = false;		
	}
	if(is_dir($path2)){
		$banner->status2 = true;	
	}else{
		$banner->status2 = false;		
	}
	if(is_dir($path3)){
		$banner->status3 = true;	
	}else{
		$banner->status3 = false;		
	}
	if(is_dir($path4)){
		$banner->status4 = true;	
	}else{
		$banner->status4 = false;		
	}
	
	echo json_encode($banner);
}



/*******************************************SAVE BANNER*********************************************************************/
function SaveBanner($data){
	require('../config.php');
	$link = ConnectDB();	
	$form = parse($data);
	$adid = $form->id;
	require('resize.php');

	if ($form->image1){			
		$oldname = $CFG->dir.'temp/'.$form->image1;
		if($_SESSION['scriptid'] == 0 ) {
			MoveImages($CFG->dirimages . 'banner/home1/',$oldname,$adid,false,0);	
		}else {
			MoveImages($CFG->dirimages . 'banner/home1/'.$_SESSION['scriptid'].'/',$oldname,$adid,false,0);	
		}
	}

	if ($form->image2){
		$oldname = $CFG->dir.'temp/'.$form->image2;
		if($_SESSION['scriptid'] == 0 ) {
			MoveImages($CFG->dirimages . 'banner/home2/',$oldname,$adid,false,0);
		}else{
			MoveImages($CFG->dirimages . 'banner/home2/'.$_SESSION['scriptid'].'/',$oldname,$adid,false,0);	
		}	
	}

	if ($form->image3){
		$oldname = $CFG->dir.'temp/'.$form->image3;
		if($_SESSION['scriptid'] == 0 ) {
			MoveImages($CFG->dirimages . 'banner/home3/',$oldname,$adid,false,0);
		}else{
			MoveImages($CFG->dirimages . 'banner/home3/'.$_SESSION['scriptid'].'/',$oldname,$adid,false,0);	
		}	
	}	

	if ($form->image4){
		$oldname = $CFG->dir.'temp/'.$form->image4;
		if($_SESSION['scriptid'] == 0 ) {
			MoveImages($CFG->dirimages . 'banner/home4/',$oldname,$adid,false,0);
		}else{
			MoveImages($CFG->dirimages . 'banner/home4/'.$_SESSION['scriptid'].'/',$oldname,$adid,false,0);	
		}
	}
}

function MoveImages($root,$oldname,$usrid,$dummy,$type){
	$folder = $root;
	$finalname = $folder.'normal.jpg';	
	if(preg_match('/[.]/', $folder)) die();
	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	if ($ext=='png'){//if png convert it to jpg
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);
		//create thumbnail and regular size
		if ($type=='0'){
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1100,201);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1350,1102);
			$image->save($folder.'banner.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
		
		}else{

			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
		}
	}else{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		//create thumbnail and regular size
		if ($type=='0'){
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1100,201);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1350,1102);
			$image->save($folder.'banner.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
		
		}else{

			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(470,230);
			$image->save($folder.'splited.jpg');
		}
	}
}
?>
