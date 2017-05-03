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

$response = array();    
$link = ConnectDB();

$order_id = $obj->{'order_id'};
$status = $obj->{'status'};
$commnet = $obj->{'commnet'};
$driver_commnet = $obj->{'driver_commnet'};
$driver_id = $obj->{'driver_id'};

pg_prepare($link,'sql','UPDATE w_orders SET status=$1,comment=$2,driver_comment=$3,driver_id=$4 WHERE id=$5');
pg_execute($link,'sql',array($status,$commnet,$driver_commnet,$driver_id,$order_id));

$response['status']=true;

pg_close($link);

header('Content-Type: application/json');  
echo json_encode($response);
?>