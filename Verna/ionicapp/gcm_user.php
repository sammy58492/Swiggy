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
$device_id = $obj->{'device_id'};
$device_kind = $obj->{'kind'};

// $device_kind = 1 for IOS
// $device_kind = 0 for Android
$response = array();

// $response['UserID'] = $user_id;
// $response['DeviceID'] = $device_id;
// $response['DeviceKind'] = $device_kind;

// header('Content-Type: application/json; charset=utf-8');
// header("Access-Control-Allow-Origin: *");

// echo json_encode($response);

// exit();

$link = ConnectDB();

if ($device_id != ''){
	pg_prepare($link,'sql','SELECT * FROM w_gcm WHERE user_id=$1');
	$result = pg_execute($link,'sql',array($user_id));

	if(pg_num_rows($result) == 0 ){
		pg_prepare($link,'sql2','SELECT max(id) as id FROM w_gcm');
		$result2 = pg_execute($link,'sql2',array());
		if(pg_num_rows($result2) == 0){
			$id = 1;
		}else{
			$row = pg_fetch_array($result2);
			$id = $row['id'] + 1;
		}

		if($device_kind == 0){
			pg_prepare($link,'sql1','INSERT INTO w_gcm (id,user_id,gcm_id) VALUES($1,$2,$3)');
			$response['gcm_id'] = true;
		}else{
			pg_prepare($link,'sql1','INSERT INTO w_gcm (id,user_id,apns_id) VALUES($1,$2,$3)');
			$response['apns_id'] = true;
		}

		$result3 = pg_execute($link,'sql1',array($id,$user_id,$device_id));
		
	}else{
		$row1 = pg_fetch_array($result);
		if($device_kind == 0){
			pg_prepare($link,'sql1','UPDATE w_gcm SET gcm_id=$1 WHERE id=$2');
			$response['gcm_id update'] = true;
		}else{
			pg_prepare($link,'sql1','UPDATE w_gcm SET apns_id=$1 WHERE id=$2');
			$response['apns_id update'] = true;
		}
		$result3 = pg_execute($link,'sql1',array($device_id,$row1['id']));
	}	
}else{
	$response['message'] = 'Failed';
}

pg_close($link);

// header('Content-Type: application/json; charset=utf-8');
// header("Access-Control-Allow-Origin: *");

echo json_encode($response);

?>