<?php
require_once('settings.php');
require_once('multilanguage.php');
require_once('payment-main.php');
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

pg_prepare($link,'sqlcheckout','SELECT * FROM w_checkout');
$result2 = pg_execute($link,'sqlcheckout',array());
$checkout = array();

while($row2 = pg_fetch_array($result2)){
	$checkout[$row2['field_name']]['id']=$row2['id'];
	$checkout[$row2['field_name']]['field_name']=$row2['field_name'];
	$checkout[$row2['field_name']]['required']=$row2['required'];

	$checkout[$row2['field_name']]['status']=($row2['status']=='t')?true:false;
		
}
$response['status'] = true;
$response['checkout'] = $checkout;

pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);

?>