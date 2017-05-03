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
$pwd = $obj->{'pwd'};

/*$email = 'superadmin@orderingco.com';
$pwd = 'super';*/

$response = array();
	
$link = ConnectDB();

pg_prepare($link,'sql','SELECT * from w_users WHERE email=$1 and pwd=$2');
$result = pg_execute($link,'sql',array($email,$pwd));

if (pg_num_rows($result)==1){
	$row = pg_fetch_array($result);

	$response['status'] = true;
	$response['id'] = $row['id'];
	$rowarray = fetch_user_lang($row['id'],$link);
	$response['name'] = $rowarray['name_lang'];
	$response['lastname'] = $rowarray['lastname_lang'];
	$response['lastname2'] = $rowarray['lastname2_lang'];
	$response['email'] = $row['email'];
	$response['password'] = $row['pwd'];
	$response['address'] = $rowarray['street_lang'];
	$response['colony'] = $rowarray['colony_lang'];
	$response['zip'] = $row['cp'];
	$response['country'] = $row['country'];
	$response['city'] = $row['city'];
	$response['cityname'] = fetch_city_lang($row['city'],$link);
	$response['tel'] = $row['tel'];
	$response['cel'] = $row['cel'];
	$response['level'] = $row['level'];
	$response['occupation'] = $rowarray['job_lang'];

}else{
 $response['status'] = false;
}

pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); 
echo json_encode($response);


?>