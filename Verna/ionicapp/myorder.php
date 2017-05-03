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
$lang_resource = GetLangFileStaticIOS();
$usr = $obj->{'usr'};
//$usr = -1;

$link = ConnectDB();

function usersOrdercitybylang($id,$cid){
	$link = ConnectDB();
	
	$result1 = pg_execute($link,'sqlusercitylang555',array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}

$response = array();
$order = array();

	pg_prepare($link,'sql8','SELECT id,date,data,status FROM w_orders WHERE usr=$1 AND scriptid=$2 ORDER BY id DESC');
	$result = pg_execute($link,'sql8',array($usr,0));

	pg_prepare($link,'sqlusercitylang555','SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	if(pg_num_rows($result)>0){
		$i= 0;
	while($row = pg_fetch_array($result))
		{

		$order[$i]['id'] = $row['id'];
		$date = explode(':',$row['date']);
		$order[$i]['date'] = $date[0] . ':' . $date[1];
		$order[$i]['status'] = $row['status'];
		$data = json_decode($row['data']);
		$order[$i]['cityid'] = $data->buyer->city;
		$order[$i]['data'] = json_encode($data);
		if($data->buyer->city!=""){
		$order[$i]['city'] = usersOrdercitybylang($data->buyer->city,$row['id']);
		}
		$order[$i]['busname'] = $data->business[0]->name;
		
		switch ($order[$i]['status'])
			{
			case '0':
				$order[$i]['statustext'] = $lang_resource['ORDER_PENDING'];
			break;
			case '1':
				$order[$i]['statustext'] = $lang_resource['ORDER_COMPLETED'];
			break;
			case '2':
				$order[$i]['statustext'] = $lang_resource['ORDER_CANCELLED'];
			break;
			case '3':
				$order[$i]['statustext'] = $lang_resource['V3_ORDER_Preparation'];
			break;
			case '4':
				$order[$i]['statustext'] = $lang_resource['V3_ORDER_ORDER_ON_ITS_WAY'];
			break;
			case '5':
				$order[$i]['statustext'] = $lang_resource['V3_ORDER_CANCELLED_RESTAURANT'];
			break;
			case '6':
				$order[$i]['statustext'] = $lang_resource['ORDER_STATUS_CANCELLEDBYDRIVER'];
			break;
			case '7':
				$order[$i]['statustext'] = $lang_resource['ORDER_STATUS_ACCEPTEDBYRESTAURANT'];
			break;
			}


			$i++;
			
		}
		$response['orders'] = $order;
		$response['status'] = true;	
	}
	else
	{
		$response['status'] = false;	
	}

	header('Content-Type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *"); 
 
	echo json_encode($response);

?>