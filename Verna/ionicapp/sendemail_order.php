<?php 
require_once('settings.php');
require_once('multilanguage.php');
session_start();

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
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$json = file_get_contents('php://input');
$obj = json_decode( $json );

$response = array();
$link = ConnectDB();

global $lang_resource;
/*$id = $obj->{'orderId'};
$userid = $obj->{'id'};
$data = $obj->{'data'};
$ordercomment = $obj->{'orderComment'};*/

$id = $_REQUEST['orderId'];
$userid = $_REQUEST['id'];
$data = $_REQUEST['data'];
$ordercomment = $_REQUEST['orderComment'];

$lang_resource = GetLangFileStaticIOS();

$order = parse($data);
$scriptid = 0;

pg_prepare($link,'sqlbusinesstime',"SELECT * FROM w_business where id=$1");
$res22 = pg_execute($link, 'sqlbusinesstime', array($order->business[0]->id));
$ro22 = pg_fetch_array($res22);

date_default_timezone_set($ro22['timezone']);
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

$response['id'] = $id;

pg_prepare($link,'sqlo','SELECT * FROM w_orders WHERE id=$1');
$result = pg_execute($link,'sqlo',array($id));
	
$row = pg_fetch_array($result);
$data=$row['data'];
$data=json_decode($data);

pg_prepare($link,'sqlob','SELECT * FROM w_business WHERE id=$1');
$result1 = pg_execute($link,'sqlob',array($data->business[0]->id));
$row1 = pg_fetch_array($result1);

$response['name'] = $data->business[0]->name;;
$response['tel'] = $data->business[0]->tel;

$response['businessaddress'] = $row1['street'].','.$data->buyer->cityname;
$response['customeraddress'] = $data->buyer->address;
$response['deliverytype'] = $data->buyer->deliveryType;

pg_close($link);

$response['status'] = true;

if($response['status'] == true){
	$link = ConnectDB();	

	//echo json_encode($response);

	//exit;

	$emails = array($data->buyer->email);

	pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
	$result = pg_execute($link,'sql33',array($data->buyer->city));

	$row = pg_fetch_array($result);
	array_push($emails,$row['email']);		
	
	//ORDER MAIL TEMPLATE INCLUDE START
	include_once "../panel/templates/order-email-template.php";
	//ORDER MAIL TEMPLATE INCLUDE END		
	SendMail($msg,'Order ' . $id,$emails);

	header('Content-Type: application/json');  
	echo json_encode($response);
	
	$checkfields = (array)$data->buyer->checkoutfields;
	if(in_array('Receive SMS', $checkfields)){
		include_once "../panel/templates/place-order-sms.php";
		if ($twilio_enabled && $order->buyer->tel) {
			require_once('../panel/lib/sms.php');
			// Send sms to buyer if it was enabled when ordering
			$twilioenabledclient=0;
			$twilioenabledclient=(string)$order->twilioenabledclient;
			if(($twilioenabledclient==1)) {
				$msg = $sms_resource['SMS_ORDER_SENT_CLIENT']. $id;
				try {
					sendSMS($msg,'+'.$twilio_phone,'+'.$data->buyer->tel);
				} catch (Exception $e) {
					if ($e->getMessage() == 'error_sms_panel_config') {
						//echo ',error_sms_panel_config';
					}
					//print_r($e->getMessage());
					//echo ',error_sms_to_user';
				}
			}
			// Send to business
			$msg = $sms_resource['SMS_ORDER_SENT_BUSINESS']. $id;
			try {
				sendSMS($msg,'+'.$twilio_phone,'+'.$data->business[0]->tel);
			} catch (Exception $e) {
				if ($e->getMessage() == 'error_sms_panel_config') {
					//echo ',error_sms_panel_config';
				}
				//print_r($e->getMessage());
				//echo ',error_sms_to_business';
			}
		}
	}	
}
?>