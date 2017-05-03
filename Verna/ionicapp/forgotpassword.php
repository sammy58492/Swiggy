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

$email = $obj->{'email'};
$link = ConnectDB();
pg_prepare($link,'sqli',"SELECT pwd FROM w_users WHERE email=$1");
$result = pg_execute($link,'sqli',array($email));
$lang_resource = GetLangFileStaticIOS();
if(pg_num_rows($result)>0){
	while($row = pg_fetch_array($result))
	{ 
include_once("../panel/templates/recover-password.php");
//end password email

if (SendMail($msg,$lang_resource['FRONTMOBILE_PASSWORD_REQUESTED1'],array($email)))
$response['status'] = true;
	}
}else{
$response['status'] = false;
}

pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);

?>
