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

$city = $obj->{'city'};


/*$city = '4';*/
$neighborhoods = array();

$link = ConnectDB();

pg_prepare($link,'sql','SELECT * from w_neighborhood WHERE city=$1 AND scriptid=$2');
$result = pg_execute($link,'sql',array($city,'0'));

$i=0;
if(pg_num_rows($result)>0){
	while($row = pg_fetch_array($result)){
	$neighborhoods[$i]['id'] = $row['id'];
	$rowarray = fetch_all_neighborhood_lang($row['id'],$link);
	$neighborhoods[$i]['name'] = $rowarray['name_lang'];
	$i++;
	}
	$response['status'] = true;
}else{
$response['status'] = false;
}
$response['colony'] = $neighborhoods;


pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
 
echo json_encode($response);

?>
