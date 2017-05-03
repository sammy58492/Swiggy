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

$country = $obj->{'country'};


/*$country = '3';*/
$cities = array();

$link = ConnectDB();

pg_prepare($link,'sql','SELECT * from w_franchises WHERE country=$1 AND scriptid=$2');
$result = pg_execute($link,'sql',array($country,'0'));
$i =0;
if(pg_num_rows($result)>0){
	while($row = pg_fetch_array($result)){
		$cities[$i]['id'] = $row['id'];
		$rowarray = fetch_all_city_lang($row['id'],$link);
		$cities[$i]['name'] = $rowarray['city_lang'];
		$cities[$i]['country'] = $row['country'];
		$i++;
	}
	$response['status'] = true;
}else{
	$response['status'] = false;
}
$response['city'] = $cities;
pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);

?>
