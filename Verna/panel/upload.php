<?php


if ($_SERVER['HTTP_FILENAME'])
	XhrMethod();
	else
	PostMethod();


function XhrMethod()
	{
	require_once('config.php');
	$dir = $CFG->dirimagesxhr . "temp/";
	$fileid = $_SERVER['HTTP_FILEID'];
	$filename = FilenameFilterXhr($fileid,$_SERVER['HTTP_FILENAME'],$_SERVER['HTTP_RANDOMNAME']);
	$uploaded = file_put_contents($dir . $filename,file_get_contents('php://input'));
	if ($uploaded) 
		$status = '{"id":"'.$fileid.'","name":"'.$filename.'","status":"success"}';
		else
		$status = '{"id":"'.$fileid.'","status":"failed"}';

	echo $status;
	}


function PostMethod()
	{
	require_once('config.php');
	$dir = $CFG->dirimages . "temp/";
	$files = $_FILES['file'];
	$count = 0;
	$uploadedcount = 0;
	$response = '[';
	foreach ($files['error'] as $id => $err)
		{
		if ($err == UPLOAD_ERR_OK)
			{
			$count++;
			$filename = FilenameFilterPost($id,$files['name'][$id],$_POST['random']);

			if ($filename!='')
				{
				$uploaded = move_uploaded_file(	$files['tmp_name'][$id],$dir. $filename);
				if ($uploaded) 
					$status = '{"id":"' . $id . '","name":"'.$filename.'","status":"success"}';
					else
					$status = '{"id":"' . $id . '","status":"failed"}';
				}
				else
				$status = '{"id":"' . $id . '","status":"failed"}';
			if ($count>1)
				$response .= ',';
			$response .= $status;
			}	
		}
	
	$response .= ']';
	echo '<script language="javascript" type="text/javascript">';
	echo "window.top.window.Uploader.UploadComplete('".$response."');";
	echo '</script>';
	}


function FilenameFilterXhr($fileid,$filename,$random)
	{
	$whitelist = array('jpg','png','jpeg');
	$extarray = split('\.',basename($filename));
	$extension = strtolower($extarray[count($extarray)-1]);
	
	if ($random=='true')
		$filename = substr(md5(uniqid(rand())),0,10);
		else
		$filename = strtolower($extarray[0]);

	$validextension = false;
	foreach ($whitelist as $item)
		if ($item==$extension)
			$validextension = true;

	if ($validextension)
		return $filename.'.'.$extension;
		else
		die('{"id":"'.$fileid.'","status":"failed"}');
	}


function FilenameFilterPost($fileid,$filename,$random)
	{
	$whitelist = array('jpg','png','jpeg');
	$extarray = split('\.',basename($filename));
	$extension = strtolower($extarray[count($extarray)-1]);
	
	if ($random=='true')
		$filename = substr(md5(uniqid(rand())),0,10);
		else
		$filename = strtolower($extarray[0]);

	$validextension = false;
	foreach ($whitelist as $item)
		if ($item==$extension)
			$validextension = true;

	if ($validextension)
		return $filename.'.'.$extension;
		else
		return '';
	}
?>
