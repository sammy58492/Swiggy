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

$link = ConnectDB();

pg_prepare($link,'sql','SELECT * from w_countries WHERE scriptid=$1');
$result = pg_execute($link,'sql',array('0'));
$countryres = array();
$i =0;
if(pg_num_rows($result)>0){
	while($row = pg_fetch_array($result)){	
		$countryres[$i]['id'] = $row['id'];	
		$countryres[$i]['name'] = fetch_country_lang($row['id'],$link);
		$i++;	
	}
	$response['status'] = true;
}else{
	$response['status'] = false;
}

$response['country'] = $countryres;
pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
  
echo json_encode($response);
?>
