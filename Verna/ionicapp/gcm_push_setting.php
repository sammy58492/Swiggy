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

$user_id = $obj->{'user_id'};
$login_status = $obj->{'login_status'};

$link = ConnectDB();

pg_prepare($link,'sql','SELECT * FROM w_gcm WHERE user_id=$1');
$result = pg_execute($link,'sql',array($user_id));

if(pg_num_rows($result) != 0 ){
	$row1 = pg_fetch_array($result);
	pg_prepare($link,'sql1','UPDATE w_gcm SET login_status=$1 WHERE id=$2');
	$result3 = pg_execute($link,'sql1',array($login_status,$row1['id']));
}

pg_close($link);

//header('Content-Type: application/json; charset=utf-8');
//header("Access-Control-Allow-Origin: *");

echo json_encode($result3);

?>