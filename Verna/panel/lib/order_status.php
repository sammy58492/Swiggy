<?php 
require_once('settings_lib.php');

$json = file_get_contents('php://input');
$obj = json_decode( $json );

$response = array();

$link = ConnectDB();

$order_id = $obj->{'order_id'};
$status = $obj->{'status'};


pg_prepare($link,'sql','UPDATE w_orders SET status=$1 WHERE id=$2');
pg_execute($link,'sql',array($status,$order_id));

pg_prepare($link,'sql1','SELECT * FROM w_orders WHERE id=$1');
$result = pg_execute($link,'sql1',array($order_id));
$row = pg_fetch_array($result);

if($row['status'] == $status){

	$response['status']=true;
}else{
	$response['status']=false;
}
pg_close($link);

header('Content-Type: application/json');  
echo json_encode($response);


?>