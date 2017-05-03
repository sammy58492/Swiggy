<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'DeleteCategory':
		DeleteCategory($_POST['data']);
	break;
	case 'SaveCategory':
		SaveCategory($_POST['data']);
	break;
	case 'SaveZipcode':
		SaveZipcode($_POST['data']);
	break;
	case 'DeleteZipcode':
		DeleteZipcode($_POST['data']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET CATEGORY DATA******************************************************/

/********************************************DELETE CATEGORY****************************************************************/

function DeleteCategory($data)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_categories WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
		
		
	pg_close($link);
	}
	function DeleteZipcode($data)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_zipcode WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}

/*******************************************SAVE CATEGORY*********************************************************************/
function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require_once('resize.php');
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
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(164,150);
		$image->save($folder.'panel.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'preview.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');


		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(164,150);
		$image->save($folder.'panel.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'preview.jpg');
		}
	}
function SaveCategory($data)
	{
	
	SuperAdminsOnly();
	$form = parse($data);
	require('../config.php');
	
	
	if ($form->type=='create'){
		 $query = InsertQuery('w_categories',$form->fields);	
	}else{
		if($form->fields->name->value!='null'){
			$query = UpdateQuery('w_categories',$form->fields,$form->id);
		}else{
			$query=$form->id;
		}
	}
		print_r($form);
		if ($form->image)
		{ 	
		//print_r($CFG->dirimages);
	$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'category/',$oldname,$query,false,'/1');
		$link = ConnectDB();
			
			pg_prepare($link,'sql1','UPDATE w_categories SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql1',array(1,$query));
			pg_close($link);
		
	    }
	}
	
function SaveZipcode($data)
	{
	//SuperAdminsOnly(); 
	$form = parse($data);
	
	if ($form->type=='create')
		$query = InsertQuery('w_zipcode',$form->fields);	
		else
		$query = UpdateQuery('w_zipcode',$form->fields,$form->id);
	}	


?>
