<?php 
require_once('settings.php');

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
$id = -1;

$user_id = $obj->{'user_id'};
$user_city = $obj->{'user_city'};
$order = $obj->{'placed_data'};

/*print_r($placed_data);
exit;
$order = json_decode($placed_data);
*/


pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

pg_prepare($link,'sqldf33','SELECT * from w_franchises WHERE id=$1');
$result_time_zone = pg_execute($link,'sqldf33',array($user_city));
$result_rec = pg_fetch_array($result_time_zone);
date_default_timezone_set($result_rec['timezone']);
$date = date("Y-m-d H:i:s");

$values = array($id,json_encode($order),$date);


$recent = new stdClass();
$recent->user = new stdClass();

$name = explode(' ',$order->buyer->name);
$lastname = substr($name[1], 0, 1);
if ($lastname!='')
	$recent->user->name = $name[0] . ' ' . $lastname . '.';
else
	$recent->user->name = $name[0]; 

$recent->business= new stdClass();
$recent->business->id = $order->business[0]->id;
$recent->business->name = $order->business[0]->name;
array_push($values,json_encode($recent));

$query = 'INSERT INTO w_orders (id,data,date,recentdata) VALUES ($1,$2,$3,$4)';
pg_prepare($link,'sql2',$query);
/*if (pg_execute($link,'sql2',$values)){
	$response['status'] = true;
	push_notification($id);
}else{
	$response['status'] = false;
}*/

if (pg_execute($link,'sql2',$values)){
	push_notification($id);
	$response['status'] = true;

	$emails = array($order->buyer->email);

	pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
	$result = pg_execute($link,'sql33',array($order->buyer->city));

		$row = pg_fetch_array($result);
		array_push($emails,$row['email']);		

		include_once "template/lang_en.php";
		//ORDER MAIL TEMPLATE INCLUDE START
		include_once "template/order-email-template.php";
		//ORDER MAIL TEMPLATE INCLUDE END

		SendMail($msg,'Order ' . $id,$emails);

	
}else{
	$response['status'] = false;
}
 
pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);
?>
