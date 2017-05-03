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
$id = $obj->{'id'};

//$id = 668;
$link = ConnectDB();
$response = array();
$order = array();

	pg_prepare($link,'sql1','SELECT usr,data,comment,date,status,driver_id,driver_comment,transactium_tid,transactium_status,requestcollectiondata,stripe_result,payu_result FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql1',array($id));
	unset($order);
	//include_once("../../languages/lang.en.php");
	if(pg_num_rows($result)>0){
	while($row = pg_fetch_array($result))
		{
		//check if he owns this order
		/*if ($row['usr']==$_SESSION['user']->id || $row['usr']==-1)
			{*/
			
//			$order['statusshow'] = false;
			if($row["requestcollectiondata"]==''){
				$data = json_decode($row['data']);
			}else{
				$requestcollectiondata=json_decode($row["requestcollectiondata"]);
			}
			/*if ($row['usr']==-1)
				{*/
				if($_SESSION['user']->id == $row['usr']){
					$order->statusshow = true;
				}else if($row['usr'] == -1){
					$order->statusshow = true;
				}
				if(!empty($requestcollectiondata)){
					$order->requestcollectiondata=true;
					
					$data->buyer->customer_name=$requestcollectiondata[0]->customer_name;
					$data->buyer->customer_address1=$requestcollectiondata[0]->customer_address1;
					$data->buyer->customer_address2=$requestcollectiondata[0]->customer_address2;
					$data->buyer->customer_town=$requestcollectiondata[0]->customer_town;
					$data->buyer->customer_postcode=$requestcollectiondata[0]->customer_postcode;
					$data->buyer->customer_contactno=$requestcollectiondata[0]->customer_contactno;
					$data->buyer->customer_note=$requestcollectiondata[0]->customer_note;
					
					$data->resturent->resturent_name=$requestcollectiondata[0]->resturent_name;
					$data->resturent->resturent_address1=$requestcollectiondata[0]->resturent_address1;
					$data->resturent->resturent_address2=$requestcollectiondata[0]->resturent_address2;
					$data->resturent->resturent_town=$requestcollectiondata[0]->resturent_town;
					$data->resturent->resturent_postcode=$requestcollectiondata[0]->resturent_postcode;
					$data->resturent->resturent_contactno=$requestcollectiondata[0]->resturent_contactno;
					
					pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
					$resulttimeformat = pg_execute($link,'sqltmfrm',array());
					$rowtimeformat = pg_fetch_array($resulttimeformat);
					 $htime = date("H",strtotime($requestcollectiondata[0]->resturent_collection_time));
				  $mtime = date("i",strtotime($requestcollectiondata[0]->resturent_collection_time));
				 $time_format=$rowtimeformat['value'];
				 $str='';
							if($time_format==12){
								
									$str='PM';
									if($htime<12){
										$str='AM';
									}
									$htime=floor($htime%12);
									
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime);
									}
									if (intval($mtime) < 10) {
										$mtime = "0".intval($mtime);
									}
							}else{
								
								if($htime>=24){
										 $str='AM';
										$htime=floor($htime%12);
										
									}
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime);
									}
									if (intval($mtime) < 10) {
										$mtime= "0".intval($mtime);
									}
							}
				  $date = date("d/m/Y",strtotime($requestcollectiondata[0]->resturent_collection_time));
				  
					$data->resturent->resturent_collection_time=$date."&nbsp;".$htime.":".$mtime."&nbsp;".$str;
					$data->resturent->resturent_other_value=$requestcollectiondata[0]->resturent_other_value;
					$data->resturent->resturent_other_reference=$requestcollectiondata[0]->resturent_other_reference;
					$order->deliveryprice=$requestcollectiondata[0]->deliveryprice;
					
				}else{
				$data->buyer->email = $data->buyer->email;
				$data->buyer->name = $data->buyer->name;
				$data->buyer->tel = $data->buyer->tel;
				$data->buyer->address = $data->buyer->address;
				}
				//}
				
			/*for reserve*/	
				$data1=json_decode($row['data']);
	//print_r($data1);
				
	pg_prepare($link,'sqlroom','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resultroom = pg_execute($link,'sqlroom',array(2,$data1->business[0]->id));
	
	
	$rowroom = pg_fetch_array($resultroom);
	
//	$order['roomprice'] = $rowroom['price'];		
	
	pg_prepare($link,'sqltable','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resulttable = pg_execute($link,'sqltable',array(1,$data1->business[0]->id));
	$rowtable = pg_fetch_array($resulttable);
	
	$order['tableprice'] = $rowtable['price'];		

	pg_prepare($link,'sqlfree','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resultfree = pg_execute($link,'sqlfree',array(3,$data1->business[0]->id));
	$rowfree = pg_fetch_array($resultfree);
	
	$order['freeprice'] = $rowfree['price'];		

	/*for reserve*/	
	pg_prepare($link,'sqlbp','SELECT reorder FROM w_business WHERE id=$1');
	$freorderp = pg_execute($link,'sqlbp',array($data->business[0]->id));	
	$rreorderp = pg_fetch_array($freorderp);
		
			$order['businessid'] = $data->business[0]->id;
			$order['bpermission'] = $rreorderp['reorder'];
			
			$order['id'] = $id;
			$order['data'] = json_encode($data);
			$order['date'] = $row['date'];
			$order['usr'] = $row['usr'];
			$order['comment'] = $row['comment'];
			$order['strip_enable'] =$row['stripe_result'];
			$order['payu_result'] =$row['payu_result'];
			$order['driver_comment'] = $row['driver_comment'];
			$order['transactium_tid'] = $row['transactium_tid'];
			$order['transactium_status'] = $row['transactium_status'];
			
			//Get Driver GPS url if Driver Accepted Order
			$order['gprs_url'] = NULL;
			if($row['driver_id'] && ($row['status']==4))
			{
			pg_prepare($link,'sql33','SELECT gprs_url FROM w_driver WHERE id=$1');
	        $result12 = pg_execute($link,'sql33',array($row['driver_id']));
			$row12 = pg_fetch_array($result12);
			$order['gprs_url'] = $row12['gprs_url'];
			}
			
			$order['statnum'] = $row['status'];
			
			switch ($row['status'])
				{
				case '0':
					$order['status'] = $lang_resource['ORDER_PENDING'];
				break;
				case '1':
					$order['status'] = $lang_resource['ORDER_COMPLETED'];
				break;
				case '2':
					$order['status'] = $lang_resource['ORDER_CANCELLED'];
				break;
				case '3':
					$order['status'] = $lang_resource['V3_ORDER_Preparation'];
				break;
				case '4':
					$order['status'] = $lang_resource['ORDER_STATUS_ONITSWAY'];
				break;
				case '5':
					$order['status'] = $lang_resource['V3_ORDER_CANCELLED_RESTAURANT'];
				break;
				case '6':
					$order['status'] = $lang_resource['ORDER_STATUS_CANCELLEDBYDRIVER'];
				break;
				case '7':
					$order['status'] = $lang_resource['ORDER_STATUS_ACCEPTEDBYRESTAURANT'];
				break;
				}
			//}
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