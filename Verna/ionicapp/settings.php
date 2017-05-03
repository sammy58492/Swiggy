<?php
function ConnectDB($CFG = 'empty'){
	if ($CFG=='empty')
		require('config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
	else
		return $link;
}

function parse($str){
	return json_decode($str);
	
}


function GetLangFileStaticIOS(){	

	require('config.php');
	$link1 = ConnectDB();
	pg_prepare($link1,'sqlfetchlang','SELECT * from w_lang_static');
	$result = pg_execute($link1,'sqlfetchlang',array());
	while($row = pg_fetch_array($result)){
		$lang_resource[$row['lang_key']] = $row['langtext_1'];    
	}
	return $lang_resource;
	pg_close($link1);
}



function SendMail($msg,$subject,$addresses){

	$row = FetchAllsettingsCustomMailchmp();
	include_once('phpmailer/PHPMailerAutoload.php');
	//Fetch from email here
	
	//end fetch
	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = 'Ordering Online System';
    $mail->Subject =  $subject;
    foreach ($addresses as $address)
    	$mail->AddAddress($address);
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();
 	$try = 1;

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
   		{
	   	sleep(5);
     	$success = $mail->Send();
     	$try++;
   		}

   	$mail->ClearAddresses();
   	if(!$success)
		return false;
		else
		return true;
}
	
	
	
	
	
function FetchAllsettingsCustomMailchmp(){
	$test = require('../panel/config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,'sqlmailchamp','SELECT * from w_configs ');
    $result = pg_execute($link,'sqlmailchamp',array());

    while($row = pg_fetch_array($result)){
		
		$id = $row['id'];
		$name =  $row['name'];
		$setting[$name] = $row['value'];
    }
	
	return $setting;
}


function MoveImages($root,$oldname,$usrid)
	{
	$folder = $root .$usrid.'/';
	$finalname = $folder.'normal.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder))
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$imgpath);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require('../panel/lib/resize.php');
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


function PointInArea($PointLatitud,$PointLongitud,$AreaPoints)
		{
		$j = 0;
      	$InArea = false;
	  	$x = floatval($PointLongitud);
	  	$y = floatval($PointLatitud);
	  	$pcount = count($AreaPoints);
	  	for ($i=0;$i<$pcount;$i++)
			{
	       	$j++;
	        if ($j==$pcount)
				$j = 0;

	  		if (((floatval($AreaPoints[$i]->latitud) < $y) && (floatval($AreaPoints[$j]->latitud) >= $y)) || ((floatval($AreaPoints[$j]->latitud) < $y) && (floatval($AreaPoints[$i]->latitud) >= $y)))
				{
	        	if (floatval($AreaPoints[$i]->longitud) + ($y - floatval($AreaPoints[$i]->latitud))/(floatval($AreaPoints[$j]->latitud)-floatval($AreaPoints[$i]->latitud))*(floatval($AreaPoints[$j]->longitud) - floatval($AreaPoints[$i]->longitud))<$x)
					{
	              	$InArea = !$InArea;
	            	}
	          	}
	        }
		return $InArea;
	    }



function push_notification($id){
	$link = ConnectDB();
	$json = 'A NEW ORDER PLACED, ORDER ID IS '.$id;
	$message = array("price" => $json);
	pg_prepare($link,'sql','SELECT * FROM w_gcm WHERE login_status=1');
	$result = pg_execute($link,'sql',array());
	$registatoin_ids = array();
	while($row=pg_fetch_array($result)){
		array_push($registatoin_ids, $row['gcm_id']);		
	}
	print_r($registatoin_ids);
	//array_push($registatoin_ids, 'AIzaSyDIFd-F6txsLzKrBGdbBvx1VqCSVS7ys5k');
	send_notification($registatoin_ids, $message);
		
}

function send_notification($registatoin_ids, $message) {
	$url = 'https://android.googleapis.com/gcm/send';

	$fields = array(
		'registration_ids' => $registatoin_ids,
		'data' => $message,
	);

	/*$headers = array(
		'Authorization: key=AIzaSyBTXlKdwadyvTSBGLBlJB9ZtZ4_SB9eOag',
		'Content-Type: application/json'
	);
	*/
	$headers = array(
		'Authorization: key=AIzaSyCH4hL3Mc7jh8wejEe3MBLDRe68MwoJujc',
		'Content-Type: application/json'
	);
	// Open connection
	$ch = curl_init();

	// Set the url, number of POST vars, POST data
	curl_setopt($ch, CURLOPT_URL, $url);

	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Disabling SSL Certificate support temporarly
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

	// Execute post
	$result = curl_exec($ch);
	if ($result === FALSE) {
		die('Curl failed: ' . curl_error($ch));
	}

	// Close connection
	curl_close($ch);
	// echo $result;
}



?>