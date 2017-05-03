<?php
require_once('settings.php');
require_once('multilanguage.php');

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$json = file_get_contents('php://input');
$obj = json_decode( $json );



	$rand = mt_rand ();
	$imagename = $rand.$_FILES['img']['name'];
	$target_Path = $CFG->dirimages."temp/".$imagename;
	if(move_uploaded_file($_FILES['img']['tmp_name'], $target_Path )){
		$response['link'] = $target_Path;
		$response['status'] = true;
	}else{
		$response['status'] = false;
	}

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); 
  
echo json_encode($response);

?>
