<?php 
require_once('settings.php');
require_once('multilanguage.php');
session_start();

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



$response = array();
$link = ConnectDB();
global $lang_resource;
$id = $obj->{'id'};



pg_prepare($link,'sqlo','SELECT * FROM w_orders WHERE id=$1');
$result = pg_execute($link,'sqlo',array($id));



if(pg_num_rows($result)>0){
	
$row = pg_fetch_array($result);
$data=$row['data'];
$data=json_decode($data);

pg_prepare($link,'sqlob','SELECT * FROM w_business WHERE id=$1');
$result1 = pg_execute($link,'sqlob',array($data->business[0]->id));
$row1 = pg_fetch_array($result1);

$response['status'] = true;
$response['name'] = $data->business[0]->name;;
$response['tel'] = $data->business[0]->tel;

$response['businessaddress'] = $row1['street'];
$response['customeraddress'] = $data->buyer->address;
}else{
$response['status'] = false;	
}


pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);
?>