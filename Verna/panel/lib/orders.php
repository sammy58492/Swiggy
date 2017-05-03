<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

require "class.phpmailer.php";

function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';

	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f'])
	{
	case 'FetchAllOrdersData':
		FetchAllOrdersData($_POST['filters'],$_POST['business']);
	break;
	case 'FetchOrderData':
		FetchOrderData($_POST['id']);
	break;
	case 'DeleteOrder':
		DeleteOrder($_POST['data']);
	break;
	case 'SaveOrder':
		SaveOrder($_POST['data']);
	break;
	case 'FetchDriverGroup':
		FetchDriverGroup($_POST['order_id']);
	break;
	case 'ApprovedOrder':
		ApprovedOrder($_POST['id']);
	break;

	default:
		die();
	break;
	}



function ApprovedOrder($id){

	$link = ConnectDB();
	pg_prepare($link,'sql31','UPDATE w_orders SET soundstatus=$1 WHERE id=$2');
	echo pg_execute($link,'sql31',array(1,$id));


}




##############Fetch Driver For a order#########################
function FetchDriverGroup($order_id)
{
	//SuperAdminsOnly();
	$link = ConnectDB();

	pg_prepare($link,'sql31','SELECT data from w_orders WHERE id=$1');
	$result = pg_execute($link,'sql31',array($order_id));
    pg_prepare($link,'sql333','SELECT id,name,delivering_orders from w_driver WHERE group_id=$1');
    if(pg_num_rows($result) == 1){
	$row = pg_fetch_array($result);
	$data = parse($row['data']);
	}

	 $bus_id = $data->business[0]->id;

	pg_prepare($link,'sql32','SELECT id,business from w_drivergroup');
	$result2 = pg_execute($link,'sql32',array());

	$group_id = array();

	while($row = pg_fetch_array($result2))
	{
		$a = parse($row['business']);


		if(in_array($bus_id,$a) || in_array("-1",$a))
		{

			unset($group);
			$group->id = $row['id'];
			array_push($group_id,$group);
		}

	}

	$driver_id = array();

	foreach($group_id as $grp_id)
	{

	$result3 = pg_execute($link,'sql333',array($grp_id->id));
	  while($row = pg_fetch_array($result3))
		{
	    unset($returant);
		$returant->id = $row['id'];

		if($row['delivering_orders']>0)
		$caption_str = $row['name']." (Delivering".$row['delivering_orders']."orders)";
		else
		$caption_str = $row['name'];

		$returant->caption = $caption_str;
		array_push($driver_id,$returant);

		}
	}

	echo json_encode($driver_id);

	//print_r($group_id);
}

/*******************************************GET ORDERS DATA**********************************************/


function FetchAllOrdersData($filters,$withbusiness)
	{
	//ProvidersOnly();
	$link = ConnectDB();
	$conditionalsvalues = array(500);
	
	if ($_SESSION['user']->level=='4')
		{
			pg_prepare($link,'sql-driver','SELECT id FROM w_driver WHERE usr=$1');
		    $resultD = pg_execute($link,'sql-driver',array($_SESSION['user']->id));
			$driver_array = pg_fetch_array($resultD); 
			$driver_id = $driver_array[0];
			$where = "WHERE driver_id=".$driver_id;
			$query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.status FROM w_orders '.$where.' ORDER BY id  DESC limit $1';
		}
		else
		{
	 $query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.status FROM w_orders ORDER BY id DESC limit $1';
		}

	include_once "../../languages/lang.en.php";
	
	

	if (!empty($filters))
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

	if ($_SESSION['user']->level=='1')//get all franchises from which the admin is admin
		{
		$citys = array();
		pg_prepare($link,'sql','SELECT id FROM w_franchises WHERE admin=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result))
			{
			array_push($citys,$row['id']);
			}
		}
		else
		if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
			}

   



	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	$orders = array();
	pg_prepare($link,'sqlcityid','SELECT * FROM w_business WHERE id=$1');
	pg_prepare($link,'sqlcityname','SELECT * FROM w_franchises WHERE id=$1');
	while($row = pg_fetch_array($result))
		{

		$data = json_decode($row['data']);

		$continue = false;
		if ($_SESSION['user']->level=='0')
			$continue = true;
			else
			{
			if ($_SESSION['user']->level=='1')
				{
					if($citys!="") {
				foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$continue = true;
						break;
						}
					}
				}
				else
				if ($_SESSION['user']->level=='2')
					{
						if($businesss!="") {
							foreach ($businesss as $business){
								if($data->business !=''){
									foreach ($data->business as $databusiness){
										if ($databusiness->id==$business)
											$continue = true;
									}
								}
							}
						}
					}
					else
				if ($_SESSION['user']->level=='4')
					{
										$continue = true;
							
					}


			}

		if ($continue==true)
			{
			unset($order);
			$order->id = $row['id'];
			$date = explode(':',$row['date']);
			$order->date = $date[0] . ':' . $date[1];
			unset($city);
			$city->id = $data->buyer->city;
			/*****fetch city id*******/
			$order->businessidd  = $data->business[0]->id;
			$res1 = pg_execute($link,'sqlcityid',array($order->businessidd));
			$rowcity = pg_fetch_array($res1);
			$cityid = $rowcity['city'];
			
			/*****fetch city id end*******/
			/*****fetch city name*******/
			$res2 = pg_execute($link,'sqlcityname',array($cityid));
			$rowcityname = pg_fetch_array($res2);
			$city->name = $rowcityname['city'];
			//$order->cityname=$rowcityname['city'];
			/*****fetch city name end*******/
			$order->city = $city;

			if (!empty($withbusiness))
				{
				$businesss = array();
					if($businesss!="" && $data->business) {
				foreach ($data->business as $business)
					{
					unset($bdata);
					$bdata->id = $business->id;
					$bdata->name = $business->name;
					array_push($businesss,$bdata);
					}
					}
				$order->business = $businesss;
				}
			$order->status = $row['status'];
			switch ($order->status)
				{
				case '0':
					$order->statustext = $lang_resource['ORDER_STATUS_PENDING'];
				break;
				case '1':
					$order->statustext = $lang_resource['ORDER_STATUS_DELIVERED'];
				break;
				case '2':
					$order->statustext = $lang_resource['ORDER_STATUS_CANCELLED'];
				break;
				case '3':
					$order->statustext = $lang_resource['ORDER_STATUS_PREPARATION'];
				break;
				case '4':
					$order->statustext = $lang_resource['ORDER_STATUS_ONITSWAY'];
				break;
				case '5':
					$order->statustext = $lang_resource['ORDER_STATUS_CANCELLEDBYRESTAURANT'];
				break;
				case '6':
					$order->statustext = $lang_resource['ORDER_STATUS_CANCELLEDBYDRIVER'];
				break;
				case '7':
					$order->statustext = $lang_resource['ORDER_STATUS_ACCEPTEDBYRESTAURANT'];
				break;
				}

			array_push($orders,$order);
			}
		}

	echo json_encode($orders);
	pg_close($link);
	}


function FetchOrderData($id)
	{
	echo json_encode(GetOrderData($id));
	}


function GetOrderData($id,$CFG = 'empty')
{
	
	//ProvidersOnly();
	if (!empty($CFG))
		$link = ConnectDB($CFG);
		else
		$link = ConnectDB();

	if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
					
				array_push($businesss,$row['id']);
				}
			}



	pg_prepare($link,'sql1','SELECT * FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql1',array($id));
	unset($order);
	while($row = pg_fetch_array($result))
		{
		$data = json_decode($row['data']);
		$b_id = ($data->business[0]->id);
		
		if ($_SESSION['user']->level=='2')
			{
			foreach ($data->business as $databusiness)
				{
				$founded = false;
				foreach ($businesss as $business)
					{
					if ($business==$databusiness->id)
						$founded = true;
					}
				if ($founded==false)
					unset($databusiness->id);
				}
			}

		pg_prepare($link,'sqlcurrency','SELECT currency FROM w_business WHERE id=$1');
			$result = pg_execute($link,'sqlcurrency',array($b_id));
			$rowc = pg_fetch_array($result);
			$currency = $rowc['currency'];
			
		pg_prepare($link,'sqlRTitle','SELECT name FROM w_reserve WHERE id =$1');

	if($data->reserveQty) {

		foreach($data->reserveQty as $name_room=>$key)
		{
				$r=0;
				$t=0;
				$f=0;
			if($name_room == "Room") {

			 foreach($key as $room) {

					$room_data = explode("_",$room);

					$resultTileroom = pg_execute($link,'sqlRTitle',array($room_data[0]));

					$titleroom = pg_fetch_array($resultTileroom);



					$data->reserveQty->Room[$r] = $titleroom['name']."_".$room_data[1];

					$r++;
					}
			}
			if($name_room == "Table") {

			 	foreach($key as $table) {

					$table_data = explode("_",$table);

					$resultTiletable = pg_execute($link,'sqlRTitle',array($table_data[0]));

					$titletable = pg_fetch_array($resultTiletable);


					$data->reserveQty->Table[$t] = $titletable['name']."_".$table_data[1];

					$t++;
					}

			}
			if($name_room == "Free") {

					foreach($key as $free) {

					$free_data = explode("_",$free);

					$resultTilefree = pg_execute($link,'sqlRTitle',array($free_data[0]));

					$titlefree = pg_fetch_array($resultTilefree);

					$data->reserveQty->Free[$f] = $titlefree['name']."_".$free_data[1];

					$f++;
					}
			}
		}
	}

	/*print_r($data->reserveQty->Room);
	exit();*/
	pg_prepare($link,'sqlroom','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resultroom = pg_execute($link,'sqlroom',array(2,$data->business[0]->id));
	$rowroom = pg_fetch_array($resultroom);

	$order->roomprice = $rowroom['price'];

	pg_prepare($link,'sqltable','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resulttable = pg_execute($link,'sqltable',array(1,$data->business[0]->id));
	$rowtable = pg_fetch_array($resulttable);

	$order->tableprice = $rowtable['price'];

	pg_prepare($link,'sqlfree','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resultfree = pg_execute($link,'sqlfree',array(3,$data->business[0]->id));
	$rowfree = pg_fetch_array($resultfree);

	$order->freeprice = $rowfree['price'];





		$order->id = $id;
		$order->data = json_encode($data);
		if(IS_REVIEW_ENABLED == 1)
			$order->datos = stripslashes($row['data']);
			
		$order->currency = currency_symbol($rowc['currency']);	
		
		
		$order->date = $row['date'];
		$order->dateform = date("jS F Y",strtotime($row['date']));
		$order->comment = $row['comment'];
		$order->status = $row['status'];
		$order->driver_id = $row['driver_id'];
		$order->driver_comment = $row['driver_comment'];

        $order->a_trnx_code = $row['a_trnx_code'];
		$order->collection_id = $row['collection_id'];    

		//Get Driver name
		pg_prepare($link,'sql88','SELECT name FROM w_driver WHERE id=$1');
	    $result88 = pg_execute($link,'sql88',array($order->driver_id));
		$row88 = pg_fetch_array($result88);
		$order->driver_name = $row88['name'];
		}
	pg_close($link);
	return $order;
	}
function DeleteOrder($data)
	{
	AdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	
	 pg_prepare($link,'sqlcde3','SELECT * from w_configs ');
       $configResult = pg_execute($link,'sqlcde3',array());

       //$settings = array();
	   
	   

       while($conf = pg_fetch_array($configResult))
               {

                $name = $conf['name'];
               $setting[$name] = $conf['value'];
               //array_push($settings,$setting);
			   
               }
			  
			   
	foreach ($data->ids as $id)
		{
			pg_prepare($link,'sqft1','SELECT bringg_order_id FROM w_orders WHERE id=$1');
			$resultQw = pg_execute($link,'sqft1',array($id));
			$resultQw_fetch = pg_fetch_array($resultQw);
		
		    $url = 'http://api.bringg.com/partner_api/tasks/'.$resultQw_fetch['bringg_order_id'];
				
			
							
			$data_string = array(
			'company_id' => $setting['BRINGG_COMPANY_ID'],
			'access_token' =>  $setting['BRINGG_ACCESS_TOKEN'],
			'timestamp' => date('Y-m-d H:i:s')
			);
			$secret_key = $setting['BRINGG_SECRET_KEY'];
			
			// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
			$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
			
			//print("The signature: " + $signature);
			
			$data_string["signature"] = $signature;
			
			//print("this is the data string: ");
			//print_r($data_string);
			
			$content = json_encode($data_string);
			
			//print("The content: " + $content);
			// $data_string = json_encode($data);
			$ch=curl_init($url);
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER,
			array('Content-Type:application/json',
			'Content-Length: ' . strlen($content))
			);
			
			//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
			
			$json_response = curl_exec($ch);
			
			$status = curl_getinfo($ch);
			
			curl_close($ch);
			$return_data = json_decode($json_response);
			
			
			
			
			
		pg_prepare($link,'sql','DELETE FROM w_orders WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}

  function GetBusinessData($id)
{
      $link = ConnectDB();

  $query = 'SELECT id,data,date FROM w_orders WHERE id=$1';
  pg_prepare($link,'sql1',$query);
	$result2 = pg_execute($link,'sql1',array($id));
  $info2 = array();
  while($row = pg_fetch_array($result2))
		{
			$data2 = json_decode($row['data']);
      $data2->id = $row['id'];
      $data2->date = $row['date'];
	  $data2->customslug =  $data2->customslug;
      array_push($info2,$data2);
     }
    pg_close($link);
    return $info2;
}
/*review the restaurant(02-08-2014)*/
function GetBusinessNameData($id) {

	  $link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

  $rk =pg_fetch_array($result);

	return $rk['customslug'];
	}
/*review the restaurant(02-08-2014)*/

function SaveOrder($data)
	{
	//ProvidersOnly();
	
	$form = parse($data);
	

	//echo $form->driverid;
	require('../config.php');
	require('../../languages/lang.en.php');

    //get the data object from the db so we can take the email and send a notif to the user
	$info = GetOrderData($form->id,$CFG);
		echo	$order_his_id = $form->id;
		echo "=";

	//save the order to the db
	if ($form->type=='modify')
		UpdateQuery('w_orders',$form->fields,$form->id,$CFG);



	unset($order);
    $order->id = $info->id;
   if (!isset($form->fields->driver_id->value)) {
	if(isset($form->driverid)) {
		//echo "1";
	 $driver_id = $form->driverid;
	}
   }
   else if ($form->fields->driver_id->value =='null') {
	if($form->driverid) {
	 $driver_id = $form->driverid;
	}
   }
    else {
	  // echo "2";
    $driver_id = $form->fields->driver_id->value;

   }
  
   
   if($driver_id != "") {
	   $link = ConnectDB();
	   pg_prepare($link,'sqlcf3','SELECT * from w_configs ');
       $configResult = pg_execute($link,'sqlcf3',array());

       //$settings = array();
	   
	   

       while($conf = pg_fetch_array($configResult))
               {

                $name = $conf['name'];
               $setting[$name] = $conf['value'];
               //array_push($settings,$setting);
			   
               }
	  
	 		
	  		pg_prepare($link,'sqlOS1','SELECT bringg_order_id,bringg_customer_id FROM w_orders WHERE id=$1');
			$getRec = pg_execute($link,'sqlOS1',array($order_his_id));
			$fetchRec = pg_fetch_array($getRec);
			/*echo $fetchRec['bringg_order_id']."/";
			echo $fetchRec['bringg_customer_id']."/";*/
			
			pg_prepare($link,'sqlDS1','SELECT bringg_driverid FROM w_driver WHERE id=$1');
			$getDivRec = pg_execute($link,'sqlDS1',array($driver_id));
			$fetchDivRec = pg_fetch_array($getDivRec);
			/*	echo $fetchDivRec['bringg_driverid'];*/
		
				 if($fetchRec['bringg_order_id'] >0 ) {
					
					
					 
					  $urls = 'http://api.bringg.com/partner_api/tasks/'.trim($fetchRec['bringg_order_id']);
					  $bringg_driver_id = trim($fetchDivRec['bringg_driverid']);
					$data_string = array(
					'customer_id' => $fetchRec['bringg_customer_id'],
					'company_id' => $setting['BRINGG_COMPANY_ID'],
					'user_id' => $bringg_driver_id,
					'note' =>  $form->fields->driver_comment->value,
					'access_token' => $setting['BRINGG_ACCESS_TOKEN'],
					'timestamp' => date('Y-m-d H:i:s')
					);
					$secret_key = $setting['BRINGG_SECRET_KEY'];
					
					
					$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
					
					//print("The signature: " + $signature);
					
					$data_string["signature"] = $signature;
					
					$content = json_encode($data_string);
					
					$ch=curl_init($urls);
					curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
					curl_setopt($ch, CURLOPT_HEADER, false);
					
					curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json','Content-Length: ' . strlen($content)));
					
					
										
					$json_response = curl_exec($ch);
					curl_close($ch);
					$return_datas = json_decode($json_response);
					
					
					
					
				 }
					
					

  }

  // echo  $driver_id;exit;
	// echo $driver_id = $form->fields->driver_id->value;
	/* echo $driver_id ;
	 exit;*/

	/*
	    pg_prepare($link,'sql222','SELECT driver_id FROM w_orders WHERE id = $1');
		$result22 = pg_execute($link,'sql222',array($order->id));
		 $row = pg_fetch_array($result22);
		echo $driver_id = $row['driver_id'];


	exit;*/

	if(IS_REVIEW_ENABLED == 1)
		$order->business->id = $info->data->business->id;
	$order->comment = $form->fields->comment->value;
	$order->driver_comment = $form->fields->driver_comment->value;

	switch ($form->fields->status->value)
		{
		case '0':
			$order->status = $lang_resource['ORDERS_PANDING'];
			$ost = 0;
		break;
		case '1':
			$order->status = $lang_resource['ORDER_STATUS_DELIVERED'];
			$ost = 1;
		break;
		case '2':
			$order->status = $lang_resource['ORDERS_CANCLLED'];
			$ost = 2;
		break;
		case '3':
			$order->status = $lang_resource['ORDER_STATUS_Preparation'];
			$ost = 3;
		break;
		case '4':
			$order->status = $lang_resource['ORDER_STATUS_ONITSWAY'];
			$ost = 4;
		break;
		case '5':
			$order->status = $lang_resource['V3_ORDER_CANCELLED_RESTAURANT'];
			$ost = 5;
		break;
		case '6':
			$order->status = $lang_resource['V3_ORDER_CANCELLED_DRIVER'];
			$ost = 6;
		break;
		case '7':
			$order->status = $lang_resource['V3_ORDER_RESTAURANT_ACCEPTED'];
			$ost = 7;
			break;   
		}

	 $data = json_decode($info->data);
	
	$order->email = $data->buyer->email;

	$business_data = GetBusinessData($form->id);

	$twilio_phone = $business_data[0]->business[0]->twiliophone;
	$twilio_enabled = $business_data[0]->business[0]->twilioenabled;

	$order->business =  $business_data[0]->business[0];
	
	
	

	// Get language from get or put default as en
	$lang_file;
	if(isset($_GET['l']) && $_GET['l'] != '')
		$lang_file = GetLangFile($_GET['l']);
	else
		$lang_file = GetLangFile('en');

	// Include the selected language file
	include_once $lang_file;

	if ($twilio_enabled && $business_data[0]->buyer->tel)
	{
		require_once('sms.php');
		// Send sms to buyer if it was enabled when ordering

		include_once "../templates/review-order-sms.php";

		if($business_data[0]->twilioenabledclient=="true")
		{
			// Send sms for status
			$msg = $lang_resource['SMS_ORDER_STATUS_CHANGED'].$order->id.$lang_resource['SMS_ORDER_STATUS_CHANGED_2']. $order->status;
			sendSMS($msg,'+'.$twilio_phone,'+'.$business_data[0]->buyer->tel);

			// Send sms for comments
			$msg = $lang_resource['SMS_ORDER_COMMENT_CHANGED'].$order->id.$lang_resource['SMS_ORDER_COMMENT_CHANGED_2']. $order->comment;
			sendSMS($msg,'+'.$twilio_phone,'+'.$business_data[0]->buyer->tel);
		}

		//echo "sms was sent";
	}
	else
	{
		//echo "sms wasnt sent";
	}

   // if(IS_REVIEW_ENABLED == 1)
			$business_data = GetBusinessData($form->id);

		for ($i=0;$i<count($business_data);$i++)
		{
			$order_id = $business_data[$i];
			foreach ($order_id->business as $business)
						{
			 $business_id->id = $business->id;

			}

		}
		//echo $driver_id; exit;

		$buname = GetBusinessNameData($business_id->id);
		//$buname='restaurant-Bellavino';
		//Fetch super admin mail
		$link = ConnectDB();
			 pg_prepare($link,'sql213','SELECT email from w_users WHERE level=$1');
		     $result213 = pg_execute($link,'sql213',array('0'));
			 $row213 = pg_fetch_array($result213);
			 $super_mail = $row213['email'];


            #########Mail Header##########
			$headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
           // Additional headers
            $headers .= 'From: Online Ordering <you@example.com>' . "\r\n";

            #####Use Mail#########
					
		//echo "Order: ".$order->id;

	//ORDER STATUS UPDATE EMAIL
	include_once "../templates/order-status-update-email.php";
	//ORDER STATUS UPDATE EMAIL END




		  if($driver_id){


		  if(($ost==1) || ($ost==5) || ($ost==2))
		  {
			 pg_prepare($link,'sql445','UPDATE w_driver SET delivering_orders = delivering_orders - 1 WHERE id = $1');
			 $result = pg_execute($link,'sql445',array($driver_id));


		  }

		  }

	}

function GetConfigFromPanel($configs)
{
    require('./../config.php');
    $string = "host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link   = pg_connect($string);

    if (!$link) {
        return '[]';
    }
    $conditional = ' WHERE ';
    $count       = 0;
    foreach ($configs as $config) {
        if ($count == 0) {
            $conditional .= 'name=$' . ($count + 1);
        } else {
            $conditional .= ' OR name=$' . ($count + 1);
        }
        $count++;
    }
    pg_prepare($link, 'sql', 'SELECT value,name FROM w_configs' . $conditional);
    $result  = pg_execute($link, 'sql', $configs);
    $configs = array();
    while ($row = pg_fetch_array($result)) {
        unset($config);
        $config->name  = $row['name'];
        $config->value = $row['value'];
        array_push($configs, $config);
    }
    pg_close($link);
    return json_encode($configs);
}
function currency_symbol($sitecurrency){
		if($sitecurrency == 'AED'){
	return 'AED';			
	}
	if($sitecurrency == 'USD'){
	return '$';			
	}
	if($sitecurrency == 'EUR'){
	return '€';			
	}
	if($sitecurrency == 'MXN'){
	return '$';			
	}
	if($sitecurrency == 'AUD'){
	return '﷼';			
	}
	if($sitecurrency == 'BRL'){
	return 'R$';			
	}
	if($sitecurrency == 'CAD'){
	return '$';			
	}
	if($sitecurrency == 'CZK'){
	return 'Kč';			
	}
	if($sitecurrency == 'DKK'){
	return 'kr';			
	}
	if($sitecurrency == 'HKD'){
	return '$';			
	}
	if($sitecurrency == 'HUF'){
	return 'Ft';			
	}
	if($sitecurrency == 'ILS'){
	return '₪';			
	}
	if($sitecurrency == 'JPY'){
	return '¥';			
	}
	if($sitecurrency == 'MYR'){
	return 'RM';			
	}
	if($sitecurrency == 'NOK'){
	return 'kr';			
	}
	if($sitecurrency == 'NZD'){
	return '$';			
	}
	if($sitecurrency == 'PHP'){
	return '₱';			
	}
	if($sitecurrency == 'PLN'){
	return 'zł';			
	}
	if($sitecurrency == 'GBP'){
	return '£';			
	}
	if($sitecurrency == 'SGD'){
	return '$';			
	}
	if($sitecurrency == 'SEK'){
	return 'kr';			
	}
	if($sitecurrency == 'CHF'){
	return 'CHF';			
	}
	if($sitecurrency == 'TWD'){
	return 'NT$';			
	}
	if($sitecurrency == 'THB'){
	return '฿';			
	}
	if($sitecurrency == 'TRY'){
	return '₤';			
	}if($sitecurrency == 'LYD'){
	return 'LYD';			
	}
	
}
?>
