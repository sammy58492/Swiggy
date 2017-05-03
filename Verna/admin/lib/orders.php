<?php
//session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

require "phpmailer/PHPMailerAutoload.php";


define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f'])
	{
	case 'FetchAllOrdersData':
		FetchAllOrdersData($_POST['filters'],$_POST['business']);
	break;
	case 'FetchOrderData':
		FetchOrderData($_POST['id'],$_POST['zone3']);
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
	case 'FetchAllCityData':
		FetchAllCityData();
	break;
	case 'FetchMapData':
		FetchMapData();
	break;
	case 'FetchAllResData':
		FetchAllResData();
	break;
	case 'SearchOrderData':
		SearchOrderData($_POST['data']);
	break;
	case 'FetchAllOrderId':
		FetchAllOrderId($_POST['filters'],$_POST['business']);
	break;
	
	case 'DeleteOrderById':
		DeleteOrderById($_POST['id']);
	break;
	case 'ChangeStatusMultiple':
		ChangeStatusMultiple($_POST['status'],$_POST['data']);
	break;
	
	case 'FetchOrderReserveData':
		FetchOrderReserveData($_POST['bid']);
	break;
	case 'FetchAllCurrency':
			FetchAllCurrency();
	break;
    case 'GetNeighborDataById':
			GetNeighborDataById($_POST['id']);
	break;

	default:
		die();
	break;
	}



function GetConfigFromPanel($configs) {
	  require('./../config.php');
	  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  	$link = pg_connect($string);

	  if(!$link){
		  return '[]';
    }
	  $conditional = ' WHERE ';
	  $count = 0;
	  foreach($configs as $config) {
		  if ($count==0) {
			  $conditional .= 'name=$' . ($count+1);
      }
			else {
			  $conditional .= ' OR name=$' . ($count+1);
      }
		  $count++;
		}
		 pg_query($link, "DEALLOCATE ALL");
	  pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	  $result = pg_execute($link,'sql',$configs);
	  $configs = array();
	  while($row = pg_fetch_array($result)) {
		  unset($config);
		  $config = new stdClass();
		  $config->name = $row['name'];
		  $config->value = $row['value'];
		  array_push($configs,$config);
		}
	  pg_close($link);
	  return json_encode($configs);
  }
##############Fetch Driver For a order#########################
function FetchDriverGroup($order_id)
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}


	pg_prepare($link,'sql31','SELECT * from w_orders WHERE id=$1');
	$result = pg_execute($link,'sql31',array($order_id));
    pg_prepare($link,'sql333','SELECT * from w_driver WHERE group_id=$1');
    if(pg_num_rows($result) == 1){
	$row = pg_fetch_array($result);
	$data = parse($row['data']);
	$order_company_id = $row['bringg_company_id'];
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
			$group = new stdClass();
			//unset($group);
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
		$returant = new stdClass();
	    //unset($returant);
		$returant->id = $row['id'];
		$rename = Fetchdriverlangname($defaultid,$row['id'],$link);

		if($row['delivering_orders']>0)
		$caption_str = $rename." (Delivering".$row['delivering_orders']."orders)";
		else
		$caption_str = $rename;

		$returant->caption = $caption_str;
		if($order_company_id == $row['bringg_company_id'] )
		$returant->bringgpermission = true;
		else 
		$returant->bringgpermission = false;
		
		if($returant->caption !=null)
		array_push($driver_id,$returant);

		}
	}

	echo json_encode($driver_id);

	//print_r($group_id);
}


function Fetchdriverlangname($defultlang,$cid,$link){

	pg_prepare($link,'sqlbusinessdefalutlang'.$cid,'SELECT * from w_driver_lang WHERE driver_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlbusinessdefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}

/*******************************************GET ORDERS DATA**********************************************/


function FetchAllOrdersData($filters,$withbusiness)
	{
	$lang_resource = GetLangFile();
	//ProvidersOnly();
	$link = ConnectDB();
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	
	
	 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
					$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	$conditionalsvalues = array(500);
	
	if ($_SESSION['user']->level=='4')
		{
			pg_prepare($link,'sql-driver','SELECT id FROM w_driver WHERE usr=$1');
		    $resultD = pg_execute($link,'sql-driver',array($_SESSION['user']->id));
			$driver_array = pg_fetch_array($resultD); 
			$driver_id = $driver_array[0];
			$where = "WHERE driver_id=".$driver_id;
			$query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.parent_id,w_orders.status,w_orders.requestcollectiondata FROM w_orders '.$where.' AND scriptid=$2 ORDER BY id  DESC limit $1';
		}
		else
		{
	 $query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.parent_id,w_orders.status,w_orders.requestcollectiondata FROM w_orders WHERE scriptid=$2 ORDER BY id DESC limit $1';
		}

	//$query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.status FROM w_orders ORDER BY id DESC limit $1';
	array_push($conditionalsvalues,$_SESSION['scriptid']);
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
	

	if ($_SESSION['user']->level=='5'){
		$businesssdriver = array();
		pg_prepare($link,'sql','SELECT business FROM w_drivergroup WHERE drivermanager_id=(SELECT id FROM w_drivermanager WHERE usr=$1) and enabled=$2');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id,TRUE));	

		while($row = pg_fetch_array($result)){			
			$dr = parse($row['business']);
			foreach ($dr as $key => $value) {
				array_push($businesssdriver,$value);
			}
		}
	}
	
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	$orders = array();
	pg_prepare($link,'sqlcityid','SELECT * FROM w_business WHERE id=$1');
	pg_prepare($link,'sqlcityname','SELECT * FROM w_franchises WHERE id=$1');
	pg_prepare($link,'sqlordercitydefalutlang','SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$cd = 0;
	while($row = pg_fetch_array($result)){
		$data = json_decode($row['data']);
		//request collection start
			if($row['requestcollectiondata']!=''){
			
			$requestcollectiondata=json_decode($row['requestcollectiondata'],true);
			foreach($requestcollectiondata as $rk=>$rval){
				
				$resturent_collection_time=$rval["resturent_collection_time"];
				
					$rowtimeformat = pg_fetch_array($resulttimeformat);
					 $htime = date("H",strtotime($rval['resturent_collection_time']));
				  $mtime = date("i",strtotime($rval['resturent_collection_time']));
				  $time_format=$rowtimeformat['value'];
				 $str='';
							if($time_format==12){
								
									$str='PM';
									if($htime<12){
										$str='AM';
									}
									$htime=floor($htime%12);
									
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime) ;
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
				
				   $date = date("d/m/Y",strtotime($rval["resturent_collection_time"]));
				 
					 $requestcollectiondata[$k]["resturent_collection_time"]=$date."&nbsp;".$htime.":".$mtime."&nbsp;".$str;
					
			}
			
			pg_prepare($link,'sql1212222212'.$row["id"],'SELECT id,city FROM w_franchises WHERE lower(city)=$1');
		$resultcity = pg_execute($link,'sql1212222212'.$row["id"],array(strtolower($requestcollectiondata[0]["customer_town"])));
		
		while($rowcity = pg_fetch_array($resultcity)){
			
			$data->buyer->city=$rowcity["id"];
			$data->buyer->cityname=$rowcity["cityname"];
			
		}
				$data->buyer->name=$requestcollectiondata[0]["customer_name"];
				
			$data->business[0]->name =$requestcollectiondata[0]["resturent_name"];
			$data->total = $requestcollectiondata[0]["deliveryprice"];
			/*if(isset($_GET['l']) && $_GET['l'] != '')
		$lang_file = GetLangFile($_GET['l']);
	else
		$lang_file = GetLangFile('en');
			include_once $lang_file;*/
		 	$data->buyer->deliveryType=$lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'];
		}
	//	print_r($data);
		//request collection  end 
		$continue = false;
		if ($_SESSION['user']->level=='0')
			$continue = true;
		else{
			if ($_SESSION['user']->level=='1'){
				if($citys!="") {
					foreach ($citys as $city)
						if ($city==$data->buyer->city){
							$continue = true;
							break;
						}
				}
			}else if ($_SESSION['user']->level=='2'){
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
			}else if ($_SESSION['user']->level=='4'){
				$continue = true;
			}else if ($_SESSION['user']->level=='5'){
				if(in_array('-1',$businesssdriver)){
					$continue = true;
				}else{
					if(in_array($data->business[0]->id,$businesssdriver)){
						$continue = true;
					}
				}				
			}

		}

		if ($continue==true)
			{
				$order = new stdClass();
			//unset($order);
			
			
			
			$order->id = $row['id'];
			$order->parent_id = $row['parent_id'];
			$order->data1 = $row['data'];
			
			$date = explode(':',$row['date']);
			$order->date = $date[0] . ':' . $date[1];
			
			$order->name =$data->buyer->name;
			$order->deliverytype =strtolower($data->buyer->deliveryType);
		    $city = new stdClass();
		  //unset($city);
			$city->id = $data->buyer->city;
			$city->name = $data->buyer->cityname;
			//$order->city = $city;			
			/*****fetch city id*******/
			$order->businessidd  = $data->business[0]->id;
			$res1 = pg_execute($link,'sqlcityid',array($order->businessidd));
			$rowcity = pg_fetch_array($res1);
			$cityid = $rowcity['city'];
			
			
			$currency = $rowcity['currency'];
			$order->currency = currency_symbol($currency);
			/*****fetch city id end*******/
			/*****fetch city name*******/
			$res2 = pg_execute($link,'sqlcityname',array($cityid));
			$rowcityname = pg_fetch_array($res2);
			$city->name = FetchOrdersCityLangDefault($defultlang,$rowcityname['id'],$link,$order->id,$cd);
			//$order->cityname=$rowcityname['city'];
			/*****fetch city name end*******/
			
			
			$order->city = $city;	
			$order->bname = FetchOrdersBusinessLangDefault($defultlang,$data->business[0]->id,$link,$order->id,$cd);
			$order->total = $data->total;
			$order->preorder = $data->preorder;
			$order->deliverydate = strtolower($data->buyer->deliverydate);
			
		//	$order->pretime = $data->preordertimehh .':'. $data->preordertimemm;
		$order->pretime = $data->buyer->deliveryhours .':'. $data->buyer->deliveryminute;
			
			$order->bid = $data->business[0]->id;
			if($data->reservestatus){
			$order->reservestatus = true;
			}else{
			$order->reservestatus = false;	
			}
			
			$order->dis = $data->business[0]->dishes;
			
			if($data->business[0]->dishes!=null && $order->reservestatus==true){
			$order->orderlist = 1;
			}elseif($data->business[0]->dishes!=null){
			$order->orderlist = 1;	
			}
			else{
			$order->orderlist = 2;	
			}
				if($row['requestcollectiondata']!=''){
					$order->orderlist = 1;	
				}
		
			if (!empty($withbusiness))
				{
					
				$businesssn = array();
				
				
				if ($_SESSION['user']->level =='2'){
				
					foreach ($businesss as $business){
						if($data->business !=''){
							foreach ($data->business as $databusiness){
							
								if ($databusiness->id==$business) {
									
									unset($bdata);
									
									$bdata->id = $databusiness->id;
									$bdata->name = $databusiness->name;
									array_push($businesssn,$bdata);
					
								}
							}
						}
					}
				
				} else {
				
				
					if($data->business!="") {
				foreach ($data->business as $business)
					{
					//unset($bdata);
					$bdata = new stdClass();
					$bdata->id = $business->id;
					$bdata->name = $business->name;
					array_push($businesssn,$bdata);
					}
					}
				}
				$order->business = $businesssn;
				
					}
			$order->status = $row['status'];
		
			switch ($order->status)
				{
				case '0':
					$order->statustext = $lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PENDING_IN'];
				break;
				case '1':
					$order->statustext = $lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_COMPLETED'];
				break;
				case '2':
					$order->statustext = $lang_resource['INVOICE_CANCELED'];
				break;
				case '3':
					$order->statustext = $lang_resource['ORDER_PROGRESS_TAB1'];
				break;
				case '4':
					$order->statustext = $lang_resource['ORDER_PROGRESS_ORDER_WAY'];
				break;
				case '5':
					$order->statustext = $lang_resource['ORDER_PROGRESS_CAN_BY_RES'];
				break;
				case '6':
					$order->statustext = $lang_resource['ORDER_PROGRESS_CAN_BY_DRI'];
				break;
				case '7':
					$order->statustext = $lang_resource['ORDER_PROGRESS_ACCEPT_BY_RES']; 
				break;
				}

			array_push($orders,$order);
			}
			$cd++;
		}

	echo json_encode($orders);
	pg_close($link);
	}

/*function FetchOrdersCityLangDefault($defultlang,$cid,$link,$oid,$cd){

	pg_prepare($link,'sqlordercitydefalutlang'.$cid.$oid.$cd,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlordercitydefalutlang'.$cid.$oid.$cd,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
	
}*/

function FetchOrdersCityLangDefault($defultlang,$cid,$link,$oid,$cd){

	$result4 = pg_execute($link,'sqlordercitydefalutlang',array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
	
}


function FetchOrdersBusinessLangDefault($defultlang,$cid,$link,$oid,$cd){

	pg_prepare($link,'sqlorderbusinessdefalutlang'.$cid.$oid.$cd,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlorderbusinessdefalutlang'.$cid.$oid.$cd,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}

function FetchOrderData($id,$zone3)
	{
	echo json_encode(GetOrderData($id,$zone3));
	}


function GetOrderData($id,$zone3,$CFG = 'empty')
{
	//ProvidersOnly();
	if (!empty($CFG))
		$link = ConnectDB($CFG);
		else
		$link = ConnectDB();

	 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
	$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	
	
	pg_prepare($link,'sqlbringgpermission',"SELECT * from w_configs WHERE name='BRING_PERMISSION' ");
	$resulbringgpermission = pg_execute($link,'sqlbringgpermission',array());
	$fetchConfigsDataBringg = pg_fetch_array($resulbringgpermission);
	
	
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
	$user_address = "";
	 $user_address1 = str_replace('%20',' ',$data->buyer->address); 
	 //$user_address1 .= str_replace('%F6','ö',$user_address1);
	 $user_address .= str_replace('%2C',' ',$user_address1);
	 $user_address = str_replace('%F6','ö',$user_address);
	 $data->buyer->address = $user_address;
	$requestcollectiondata= json_decode($row['requestcollectiondata']);
	if(!empty($requestcollectiondata)){
	foreach($requestcollectiondata as $rk=>$rval){
				
				$resturent_collection_time=$rval->resturent_collection_time;
				
					$rowtimeformat = pg_fetch_array($resulttimeformat);
					 $htime = date("H",strtotime($rval->resturent_collection_time));
				  $mtime = date("i",strtotime($rval->resturent_collection_time));
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
				
				   $date = date("d/m/Y",strtotime($rval->resturent_collection_time));
				 
					 $requestcollectiondata[$rk]->resturent_collection_time=$date."&nbsp;".$htime.":".$mtime."&nbsp;".$str;
					
			}
	}
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

		pg_prepare($link,'sqlRTitle','SELECT id,name FROM w_reserve WHERE id =$1');

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



					$data->reserveQty->Room[$r] = $titleroom['id']."_".$room_data[1];

					$r++;
					}
			}
			if($name_room == "Table") {

			 	foreach($key as $table) {

					$table_data = explode("_",$table);

					$resultTiletable = pg_execute($link,'sqlRTitle',array($table_data[0]));

					$titletable = pg_fetch_array($resultTiletable);


					$data->reserveQty->Table[$t] = $titletable['id']."_".$table_data[1];

					$t++;
					}

			}
			if($name_room == "Free") {

					foreach($key as $free) {

					$free_data = explode("_",$free);

					$resultTilefree = pg_execute($link,'sqlRTitle',array($free_data[0]));

					$titlefree = pg_fetch_array($resultTilefree);

					$data->reserveQty->Free[$f] = $titlefree['id']."_".$free_data[1];

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

	$order = new stdClass();
	$order->roomprice = $rowroom['price'];

	pg_prepare($link,'sqltable','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resulttable = pg_execute($link,'sqltable',array(1,$data->business[0]->id));
	$rowtable = pg_fetch_array($resulttable);

	$order->tableprice = $rowtable['price'];

	pg_prepare($link,'sqlfree','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
	$resultfree = pg_execute($link,'sqlfree',array(3,$data->business[0]->id));
	$rowfree = pg_fetch_array($resultfree);

	$order->freeprice = $rowfree['price'];

		


		$order->bid = $data->business[0]->id;
		$order->id = $id;
		$order->data = json_encode($data);
			$order->requestcollectiondata = json_encode($requestcollectiondata);
		if(empty($requestcollectiondata)){
			$order->requestcollection =0;
		}else{
			$order->requestcollection =1;
		}
		if(IS_REVIEW_ENABLED == 1)
			$order->datos = stripslashes($row['data']);
		
		$order->date = $row['date'];
		date_default_timezone_set($zone3);
		$order->dateform = date("jS F Y",strtotime($row['date']));
		$order->comment = $row['comment'];
		if($_SESSION['scriptid']==0 && $user_address !=""){
		//$location = '';
		//echo $user_address;
		$user_address = preg_replace('/[^a-zA-Z0-9\[\]\.\(\)]/s', '',$user_address);
		//echo $user_address;
		$location = get_lat_long($user_address);
		}else{
		$location = '';
		}
		$order->userlocation = json_encode($location);
		$order->status = $row['status'];
		$order->driver_id = $row['driver_id'];
		$order->bringgpermission = $fetchConfigsDataBringg['value'];
		$order->bringg_order_id = $row['bringg_order_id'];
		$order->bringg_company_id = $row['bringg_company_id'];
		
		$order->payeezy_result = $row['payeezy_result'];
		$order->global_result = $row['global_result'];
		
		$order->driver_comment = $row['driver_comment'];
		$order->transactium_tid = $row['transactium_tid'];
		$order->transactium_status = $row['transactium_status'];
		$order->paypaltx = $row['paypaltx'];
		$order->collection_id = $row['collection_id'];

		$order->paypalpro_result = $row['paypalpro_result'];
		$order->payeezy_result = $row['payeezy_result'];
		$order->stripe_result = $row['stripe_result'];
		$order->payu_result = $row['payu_result'];

		$order->a_trnx_code = $row['a_trnx_code'];
		$order->btrans_result = $row['btrans_result'];
		$order->bsa_result = $row['bsa_result'];
		$order->azul_result = $row['azul_result'];
		$order->quickpay_result = $row['quickpay_result'];
		$order->paynl_result = $row['paynl_result'];
		$order->zaakpay_result = $row['zaakpay_result'];
		//Braintree Details
		$data=json_decode($row['data']);	
		$order->braintree_firstname=$data->braintreePaymentInfo[0]->braintree_firstname;
        $order->braintree_lastname=$data->braintreePaymentInfo[0]->braintree_lastname;
		$order->braintree_address1=$data->braintreePaymentInfo[0]->braintree_address1;
		$order->braintree_address2=$data->braintreePaymentInfo[0]->braintree_address2;
		$order->braintree_city=$data->braintreePaymentInfo[0]->braintree_city;
		$order->braintree_state=$data->braintreePaymentInfo[0]->braintree_state;
		$order->braintree_zipcode=$data->braintreePaymentInfo[0]->braintree_zipcode;


		//Get Driver name
		pg_prepare($link,'sql88','SELECT name FROM w_driver WHERE id=$1');
	    $result88 = pg_execute($link,'sql88',array($order->driver_id));
		$row88 = pg_fetch_array($result88);
		$order->driver_name = $row88['name'];
		
		
		pg_prepare($link,'sql22','SELECT deliverytime,pickuptime,currency FROM w_business WHERE id=$1');
	    $result22 = pg_execute($link,'sql22',array($data->business[0]->id));
		$row22 = pg_fetch_array($result22);
		$order->deliverytime = $row22['deliverytime'];
		$order->pickuptime = $row22['pickuptime'];
		$currency = $row22['currency'];
		$order->currency = currency_symbol($currency);
		}
	pg_close($link);
	return $order;
	}
	
function DeleteOrderById($id){
	
	$link = ConnectDB();
	pg_prepare($link,'sql','DELETE FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	pg_close($link);
}
	
function DeleteOrder($data)
	{
	//AdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		
		
		
		//check for printer
		
     $sqlbus = "SELECT data,status FROM w_orders WHERE id = $1";
	 pg_prepare($link,'sqlbus',$sqlbus);
	$bus_fetch_sql = pg_execute($link,'sqlbus',array($id));
	
	while($bus_array = pg_fetch_array($bus_fetch_sql))
	{
		$bus_data = json_decode($bus_array[0]);
		$status = $bus_array[1];
		
	}
	
	$rest = $bus_data->business[0]->id;
	
	//get printer file path
	//Fetch Dynamic printer path for order business
		$DynamicPrinterPath =  "../../orders/".$rest.".txt"; //default path
		 $PathQueue = $rest;
		 
		 // $file_name = $PathQueue."_".$id;
		// echo "file-name1=".$file_name;
		 
		 
		//1. check main settings
		 pg_prepare($link,'sql_print',"SELECT * FROM w_printerpath");
	     $result_print = pg_execute($link,'sql_print',array());
		
		 while($array_print = pg_fetch_array($result_print))
		 {
			 $array_print_val = json_decode($array_print['printer_restaurant']);
			 
			 if(($array_print_val[0] == -1) || in_array($rest,$array_print_val))
			 { //check if assigned for all or particular business
				 
				 $DynamicPrinterPath = "../../orders/".$array_print['path'].".txt";
				 $PathQueue = $array_print['path'];
				 break;
			 }
			 
		 }
		 
	
	
	
	
	//case1
		 $file_name = $PathQueue."_".$id;
		// echo "file-name2=".$file_name;
		 
		if(file_exists("../../orders/".$file_name.".txt"))
		{
			echo "t1";
		   // exit;
			unlink("../../orders/".$file_name.".txt");
			
		}
		else
		{
			echo "t2";
		//	exit;
			
		if($status == 0)	
		{
	if(file_exists($DynamicPrinterPath)){
		
			$files = glob("../../orders/*.txt");
		    $printer_array = array();
			
			foreach($files as $file)
			{
				$file = substr($file,6);
				// echo "file=".$file;
				// echo "\n";
				
				// echo "path=".$PathQueue;
				
			    $valx1 = explode(".",$file);
				$valx2 = explode("_",$valx1[0]);
			
				if($valx2[0] == "orders/".$PathQueue)
				{
					array_push($printer_array,$file);
				}
				
			}
			
			
			$file_size = count($printer_array);
			
			
			
			if($file_size > 1)
			{
				unlink($DynamicPrinterPath);
				$fp = fopen($DynamicPrinterPath, "w");
				
				copy("../../".$printer_array[1], $DynamicPrinterPath);
				unlink("../../".$printer_array[1]);
				fclose($fp);
			}
			else if($file_size == 1)
			{
				
				unlink($DynamicPrinterPath);
				
				$fp = fopen($DynamicPrinterPath, "w");
				fclose($fp);
				
			}
			
		}
	
	}
		}
		
		
		pg_prepare($link,'sql','DELETE FROM w_orders WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		
		}
	pg_close($link);
	}

  function GetBusinessData($id)
{
      $link = ConnectDB();

  $query = 'SELECT id,data,date FROM w_orders WHERE id=$1';
  pg_prepare($link,'sql1'.$id,$query);
	$result2 = pg_execute($link,'sql1'.$id,array($id));
  $info2 = array();
  while($row = pg_fetch_array($result2))
		{
	  $data2 = parse($row['data']);
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
	require('../config.php');
	$link = ConnectDB();

	$lang_resource = GetLangFile();
	//ProvidersOnly();
	$form = json_decode($data);

	//echo $form->driverid;
	$orderid = $form->id;
    //get the data object from the db so we can take the email and send a notif to the user
	$info = GetOrderData($form->id,$CFG);



	//save the order to the db
	if ($form->type=='modify')
		UpdateQuery('w_orders',$form->fields,$form->id,$CFG);



	//unset($order);
	 $order = new stdClass();
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

/////////////////////bring start/////////////////////////////////

       if($driver_id != "") {
		require('../config.php');	
		 $link = ConnectDB();  
		  pg_prepare($link,'sqlOS1','SELECT  * FROM w_orders WHERE id=$1');
		  $getRec1= pg_execute($link,'sqlOS1',array($form->id));
		  $fetchRec = pg_fetch_array($getRec1);
		  
		  $business = parse($fetchRec['data']);
		  $business_id =  $business->business[0]->id;
		  
		  pg_prepare($link,'sqlcf3','SELECT * from w_configs ');
		  $configResult = pg_execute($link,'sqlcf3',array());
		  while($conf = pg_fetch_array($configResult))
          {
                $name = $conf['name'];
               $setting[$name] = $conf['value'];
          }
		
     					
			pg_prepare($link,'sqlbringpermissionbr','SELECT * from w_business WHERE id=$1');
			$resbr = pg_execute($link,'sqlbringpermissionbr',array($business_id ));
			$rowbr = pg_fetch_array($resbr);
		
			
			/*$permission = 'BRING_PERMISSION';
			pg_prepare($link,'sqlbringpermission','SELECT * from w_configs WHERE name=$1');
			$res1 = pg_execute($link,'sqlbringpermission',array($permission));
			$rows = pg_fetch_array($res1);*/
			
			pg_prepare($link,'sqlDS1','SELECT * FROM w_driver WHERE id=$1');
			$getDivRec = pg_execute($link,'sqlDS1',array($driver_id));
			$fetchDivRec = pg_fetch_array($getDivRec);
				/*echo $fetchRec['bringg_order_id'];
				echo "/".$setting['BRING_PERMISSION'];
				echo "/".$fetchRec['bringg_company_id'];*/
				
				 $bringg_token  = $fetchRec['bringg_access_token'];
				 $bringg_secret  = $fetchRec['bringg_secret_token'];
					
			
	
		
				 if($fetchRec['bringg_order_id'] != 0 && $setting['BRING_PERMISSION']==1 && $fetchRec['bringg_company_id'] != 'NULL' ) {
			
	$bringg_driver_id = $fetchDivRec['bringg_driverid'];
	if(isset($bringg_driver_id) && $fetchRec['bringg_company_id'] == $fetchDivRec['bringg_company_id'] ) {
		
	
		
				    $urls = 'http://api.bringg.com/partner_api/tasks/'.trim($fetchRec['bringg_order_id']);
					$bringg_driver_id = trim($bringg_driver_id);
					$data_string = array(
					'customer_id' => $fetchRec['bringg_customer_id'],
					'company_id' => $fetchRec['bringg_company_id'],
					'user_id' => $bringg_driver_id,
					'note' =>  $form->fields->driver_comment->value,
					'access_token' =>  $bringg_token,
					'timestamp' => date('Y-m-d H:i:s')
					);
					$secret_key = $bringg_secret;
					
					
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
					
					
					pg_prepare($link,'sqlopr2','UPDATE w_orders SET driver_bring_id=$1 WHERE id=$2');
					pg_execute($link,'sqlopr2',array($bringg_driver_id,$form->id ));
					
					
	}
					
				 }
					
	   }

  
  
////////////////////bring end//////////////////////////////////
	if(IS_REVIEW_ENABLED == 1)
	$order->business = new stdClass();

	$order->business->id = $info->data->business->id;
	$order->comment = $form->fields->comment->value;
	$order->driver_comment = $form->fields->driver_comment->value;
	$form->fields->status->value;
	switch ($form->fields->status->value)
		{
		case '0':
			$order->status = $lang_resource['ORDER_PENDING'];
			$ost = 0;
		break;
		case '1':
			$order->status = $lang_resource['ORDER_COMPLETED'];
			$ost = 1;
		break;
		case '2':
		
			$order->status = $lang_resource['ORDER_CANCELLED'];
			$ost = 2;
		break;
		case '7':
			$order->status = $lang_resource['ORDER_PROGRESS_ACCEPT_BY_RES'];
			$ost = 7;
		break;
		case '4':
			$order->status = $lang_resource['ORDER_PROGRESS_ORDER_WAY'];
			$ost = 4;
		break;
		case '5':
			$order->status = $lang_resource['ORDER_PROGRESS_CAN_BY_RES'];
			$ost = 5;
		break;
		case '6':
			$order->status = $lang_resource['ORDER_PROGRESS_CAN_BY_DRI'];
			$ost = 6;
		break;
		}

	$data = parse($info->data);

	$order->email = $data->buyer->email;

	



			$business_data = GetBusinessData($form->id);
			
	
		 $link = ConnectDB();
		 $buname = $business_data[0]->customslug;
		
		//Fetch super admin mail
		
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

          $link = ConnectDB();

	pg_prepare($link,'sqlorderfetch','SELECT * FROM w_orders WHERE id=$1');
	$resultorder = pg_execute($link,'sqlorderfetch',array($orderid));

	$roworder = pg_fetch_array($resultorder);
	$info = $roworder['data'];
	

	$data = json_decode($info);
	//print_r($data);
	//echo $business_data = $data->business[0];
	
	//fetch colony for user from id
	//fetch neighborhood from id
	   if($data->buyer->colony)
	   {
	   pg_prepare($link,'sqlNNN','SELECT * from w_neighborhood WHERE id=$1');

		$result_NN = pg_execute($link,'sqlNNN',array((int)$data->buyer->colony));

         if(pg_num_rows($result_NN) > 0)
		 {
		 $result_rec_NN = pg_fetch_array($result_NN);
		 $data->buyer->colony = $result_rec_NN['name'];
		 }
		 else
		 {
			$data->buyer->colony = ""; 
		 }
	   }
	
	
	
	 $user_mail = $data->buyer->email;//User Mail
	 $bus_mail =  $data->business[0]->email; //Restaurant Mail
	 $bus_id =  $data->business[0]->id; //Bus owner mail

	 $business_data = GetBusinessData($form->id);
	 $buname = $business_data[0]->customslug;
	/*------- fetch email permission ------------*/
	$link = ConnectDB();
	$scriptid = $_SESSION['scriptid'];
	pg_prepare($link,'emailpermi','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
	$emailper_res = pg_execute($link,'emailpermi',array('ORDER_STATUS_EMAIL',$scriptid));
	$emailper_row = pg_fetch_array($emailper_res);
	$order_email_status = $emailper_row['status'];
	
	/*------- fetch email permission ------------*/
	if($order_email_status == 't')
	{
		
		//ORDER STATUS UPDATE EMAIL
		include_once "../templates/order-status-update-email.php";
		//ORDER STATUS UPDATE EMAIL END
	}//end of ORDER_STATUS_EMAIL



		  if($driver_id){


		  if(($ost==1) || ($ost==5) || ($ost==2))
		  {
			 pg_prepare($link,'sql445','UPDATE w_driver SET delivering_orders = delivering_orders - 1 WHERE id = $1');
			 $result = pg_execute($link,'sql445',array($driver_id));


		  }

		  }

		  

	

	$order->business =  $business_data[0]->business[0];

	// Get language from get or put default as en
	/*$lang_file;
	if(isset($_GET['l']) && $_GET['l'] != '')
		$lang_file = GetLangFile($_GET['l']);
	else
		$lang_file = GetLangFile('en');*/

	// Include the selected language file
	//include_once $lang_file;
	
	$twilio_phone = $business_data[0]->business[0]->twiliophone;
	$twilio_enabled = $business_data[0]->business[0]->acceptsms;




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

	}

function FetchAllCityData(){
	$link = ConnectDB();
	$lang_resource = GetLangFile();
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$query = 'SELECT * FROM w_franchises where scriptid=$1 and enabled=$2';
	pg_prepare($link,'sqlc',$query);
	$result = pg_execute($link,'sqlc',array($_SESSION['scriptid'],'TRUE'));
	$citys = array();
	$city = new stdClass();
		$city->id = '';
		
      	$city->caption = $lang_resource['CONTROL_ADMIN_PANEL_CITY_SELECT'];
      	array_push($citys,$city);
    while($row = pg_fetch_array($result)){
		$city = new stdClass();
	//  unset($city);
      $city->id = $row['id'];
      $city->caption = FetchCityLangDefault($defultlang,$row['id'],$link);
	  if($city->caption !=null)
      array_push($citys,$city);
     }
    pg_close($link);

    echo  json_encode($citys);
}
function FetchMapData(){
	$link = ConnectDB();
	$lang_resource = GetLangFile();
	pg_prepare($link,'sqldmap','SELECT * from w_checkout WHERE field_name=$1');
	$result1 = pg_execute($link,'sqldmap',array('ChackoutMap'));
	$rows = pg_fetch_array($result1);
	
  //  pg_close($link);

    echo $rows['status'];
}
function FetchCityLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlcitydefalutlang'.$cid,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlcitydefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
}

function FetchAllResData(){
	$link = ConnectDB();
	$lang_resource = GetLangFile();
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	
	$resturants = array();
	$resturant = new stdClass();
	$resturant->id = '';
	
  	$resturant->caption = $lang_resource['CONTROL_ADMIN_PANEL_RESTURANT_SELECT'];
  	array_push($resturants,$resturant);
	if($_SESSION['user']->level == 0){
		$query = 'SELECT * FROM w_business WHERE scriptid=$1';
		pg_prepare($link,'sqlr',$query);
		$result = pg_execute($link,'sqlr',array($_SESSION['scriptid']));
	}else if($_SESSION['user']->level == 1){
		pg_prepare($link,'sqlr','SELECT w_business.id,w_business.name,w_business.scriptid FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id WHERE w_franchises.admin =$1 AND w_business.scriptid=$2');
		$result = pg_execute($link,'sqlr',array($_SESSION['user']->id,$_SESSION['scriptid']));
	}else if($_SESSION['user']->level == 2){
		pg_prepare($link,'sqlr','SELECT w_business.id,w_business.name,w_business.scriptid FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id and w_users.id=$1 WHERE w_business.scriptid=$2');
		$result = pg_execute($link,'sqlr',array($_SESSION['user']->id,$_SESSION['scriptid']));
	}else{
		echo  json_encode($resturants);
		exit;
	}
	

		

    while($row = pg_fetch_array($result)){
		$resturant = new stdClass();
	//  unset($resturant);
      $resturant->id = $row['id'];
      $resturant->caption = FetchBusinessLangDefault($defultlang,$row['id'],$link);
	  if($resturant->caption !=null)
      array_push($resturants,$resturant);
     }
    pg_close($link);

    echo  json_encode($resturants);
}


function FetchBusinessLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlbusinessdefalutlang'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlbusinessdefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
}

function SearchOrderData($data){
	$lang_resource = GetLangFile();
	$form = parse($data);
	$adid = $form->id;
	$link = ConnectDB();

	

	$conditionalsvalues = array();

	$query = 'SELECT w_orders.id,w_orders.parent_id,w_orders.data,w_orders.date,w_orders.status FROM w_orders ORDER BY id DESC ';



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
	pg_prepare($link,'sqlcityid25','SELECT * FROM w_business WHERE id=$1');
	while($row = pg_fetch_array($result))
		{

		$data = parse($row['data']);

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
							foreach ($businesss as $business)
								if($data->business !=""){
									foreach ($data->business as $databusiness)
										if ($databusiness->id==$business)
											$continue = true;
								}
							}
					}


			}

		if ($continue==true)
			{
			//unset($order);
			$order = new stdClass();
			$order->id = $row['id'];
			$order->parent_id = $row['parent_id'];
			$date = explode(':',$row['date']);
			$order->date = $date[0] . ':' . $date[1];
			//unset($city);
			$city = new stdClass();
			$city->id = $data->buyer->city;
			$city->name = $data->buyer->cityname;
			$order->city = $city;
			$order->cityid = $data->buyer->city;
			$order->cityname = $data->buyer->cityname;
			$order->bname = $data->business[0]->name;
			$order->bid = $data->business[0]->id;
			$order->total = $data->grandtotal;
			$order->preorder = $data->preorder;

			$res1 = pg_execute($link,'sqlcityid25',array($order->bid));
			$rowcity = pg_fetch_array($res1);
			$cityid = $rowcity['city'];
			
			
			$currency = $rowcity['currency'];
			$order->currency = currency_symbol($currency);
			
			$order->deliverydate = $data->buyer->deliverydate;
			$order->pretime = $data->buyer->deliveryhours .':'. $data->buyer->deliveryminute;
			
			if($data->reservestatus){
				$order->reservestatus = true;
			}else{
				$order->reservestatus = false;	
			}			
			$order->dis = $data->business[0]->dishes;			
			if($data->business[0]->dishes!=null && $order->reservestatus==true){
				$order->orderlist = 1;
			}elseif($data->business[0]->dishes!=null){
				$order->orderlist = 1;	
			}else{
				$order->orderlist = 2;	
			}

			if (!empty($withbusiness))
				{
				$businesss = array();
					if($businesss!="") {
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
					$order->statustext = $lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PENDING_IN'];
				break;
				case '1':
					$order->statustext = $lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_COMPLETED'];
				break;
				case '2':
					$order->statustext = $lang_resource['INVOICE_CANCELED'];
				break;
				case '3':
					$order->statustext = $lang_resource['ORDER_PROGRESS_TAB1'];
				break;
				case '4':
					$order->statustext = $lang_resource['ORDER_PROGRESS_ORDER_WAY'];
				break;
				case '5':
					$order->statustext = $lang_resource['ORDER_PROGRESS_CAN_BY_RES'];
				break;
				case '6':
					$order->statustext = $lang_resource['ORDER_PROGRESS_CAN_BY_DRI'];
				break;
				}

			array_push($orders,$order);
			}
		}


/**************************************************************** Filter Section *****************************************************************/
    $datepickerfrom = $form->fields->datepickerfrom->value;
	$datepickerto = $form->fields->datepickerto->value;
	$search = $form->fields->search->value;
	$cityname = $form->fields->cityname->value;
	$resname = $form->fields->resname->value;

/* Filter by Resturant */

if($resname !=""){
	$allorderFilter = array();
	$filterresturant = $resname;
	if($filterresturant!=''){

		foreach($orders as $order){
			if($order->bid == $filterresturant)
					array_push($allorderFilter,$order);
		}
		$orders  = array();
			foreach($allorderFilter as $order){
					array_push($orders,$order);
			}
		}
}
/* Filter by City */
if($cityname !=""){
	$allorderFilter = array();
	$filtercity = $cityname;
	if($filtercity!=''){

		foreach($orders as $order){
			if($order->cityid == $filtercity)
					array_push($allorderFilter,$order);
		}
		$orders  = array();
			foreach($allorderFilter as $order){
					array_push($orders,$order);
			}
		}
}
/* Filter by Date */


if($datepickerfrom !="" && $datepickerto !="" ){
	$allorderFilter = array();

	$datepickerfrom = explode("/",$datepickerfrom);//m-d-y
	$filterdatef = $datepickerfrom[2].'-'.$datepickerfrom[0].'-'.$datepickerfrom[1];//y-m-d
	$filterdatef=date('Y-m-d', strtotime($filterdatef));


	$datepickerto = explode("/",$datepickerto);//d-m-y
	$filterdatet = $datepickerto[2].'-'.$datepickerto[0].'-'.$datepickerto[1];//y-m-d
	$filterdatet=date('Y-m-d', strtotime($filterdatet));

	if($form->fields->datepickerto->value!='' && $form->fields->datepickerto->value!=''){
		foreach($orders as $order){

			if((date('Y-m-d', strtotime($order->date)) >= $filterdatef) && (date('Y-m-d', strtotime($order->date)) <= $filterdatet))
					array_push($allorderFilter,$order);
		}

		$orders  = array();
			foreach($allorderFilter as $order){
					array_push($orders,$order);
			}
		}
}

/* Filter by search name */

	$allorderFilter = array();
	$filterrest = $search;
	//$slength = strlen($filterrest);
	if($filterrest!=''){
		foreach($orders as $order){

			if (strpos(strtolower($order->bname),strtolower($filterrest))!== false) {
					array_push($allorderFilter,$order);

			}
		}
		$orders  = array();
			foreach($allorderFilter as $order){
					array_push($orders,$order);
			}
	}


	echo json_encode($orders);
	pg_close($link);
	}

function FetchAllOrderId($filters,$withbusiness){

	$link = ConnectDB();
	pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
	$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	$conditionalsvalues = array(500);
	
	if ($_SESSION['user']->level=='4'){
		pg_prepare($link,'sql-driver','SELECT id FROM w_driver WHERE usr=$1');
		$resultD = pg_execute($link,'sql-driver',array($_SESSION['user']->id));
		$driver_array = pg_fetch_array($resultD); 
		$driver_id = $driver_array[0];
		$where = "WHERE driver_id=".$driver_id;
		$query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.status,w_orders.requestcollectiondata FROM w_orders '.$where.' ORDER BY id  DESC limit $1';
	}else{
	 	$query = 'SELECT w_orders.id,w_orders.data,w_orders.date,w_orders.status,w_orders.requestcollectiondata FROM w_orders ORDER BY id DESC limit $1';
	}

	if (!empty($filters))
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter){
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
	

	if ($_SESSION['user']->level=='5'){
		$businesssdriver = array();
		pg_prepare($link,'sql','SELECT business FROM w_drivergroup WHERE drivermanager_id=(SELECT id FROM w_drivermanager WHERE usr=$1) and enabled=$2');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id,TRUE));	

		while($row = pg_fetch_array($result)){			
			$dr = parse($row['business']);
			foreach ($dr as $key => $value) {
				array_push($businesssdriver,$value);
			}
		}
	}

	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	$orders = array();
	pg_prepare($link,'sqlcityid','SELECT * FROM w_business WHERE id=$1');
	pg_prepare($link,'sqlcityname','SELECT * FROM w_franchises WHERE id=$1');
	$cd = 0;
	while($row = pg_fetch_array($result)){
		$data = json_decode($row['data']);

		$continue = false;
		if ($_SESSION['user']->level=='0')
			$continue = true;
		else{
			if ($_SESSION['user']->level=='1'){
				if($citys!="") {
					foreach ($citys as $city)
						if ($city==$data->buyer->city){
							$continue = true;
							break;
						}
				}
			}else if ($_SESSION['user']->level=='2'){
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
			}else if ($_SESSION['user']->level=='4'){
				$continue = true;
			}else if ($_SESSION['user']->level=='5'){
				if(in_array('-1',$businesssdriver)){
					$continue = true;
				}else{
					if(in_array($data->business[0]->id,$businesssdriver)){
						$continue = true;
					}
				}				
			}

		}

		if ($continue==true){
			array_push($orders,$row['id']);
		}
	}		

	echo json_encode($orders);
	pg_close($link);
}

function ChangeStatusMultiple($status,$data){
	$lang_resource = GetLangFile();
	require('../config.php');
	$link = ConnectDB();
	
	//Fetch Super Admin Email Address
	pg_prepare($link,'sqlsuperadmin','SELECT email from w_users WHERE level=$1');
	$resultadmin = pg_execute($link,'sqlsuperadmin',array('0'));
	$rowadmin = pg_fetch_array($resultadmin);
	$super_mail = $rowadmin['email'];

	//Fetch Config link
	pg_prepare($link,'sqlfb','SELECT value FROM w_configs where name=$1');
	$resultfb = pg_execute($link,'sqlfb',array('facebooklink'));
	$rowfb = pg_fetch_array($resultfb);
	$fblink = $rowfb['value'];
		
	pg_prepare($link,'sqltw','SELECT value FROM w_configs where name=$1');
	$resulttw = pg_execute($link,'sqltw',array('twitterlink'));
	$rowtw = pg_fetch_array($resulttw);
	$twlink = $rowtw['value'];

	pg_prepare($link,'sqlrss','SELECT value FROM w_configs where name=$1');
	$resultrss = pg_execute($link,'sqlrss',array('rsslink'));
	$rowrss = pg_fetch_array($resultrss);
	$rsslink = $rowrss['value'];

	$setting=array();
	pg_prepare($link,'sqlconfig','SELECT * from w_configs ');
    $resultconfig = pg_execute($link,'sqlconfig',array());

    while($rowconfig = pg_fetch_array($resultconfig)){
		$setting[$rowconfig['name']] = $rowconfig['value'];

    }
	$rowEmail = $setting;
	
	//Fetch Order Details
	$data = parse($data);
	
	////////////////// FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	pg_prepare($link,'sqlmand1','SELECT * from w_configs WHERE name=$1');
	$resp1 = pg_execute($link,'sqlmand1',array('mandrillsettings'));
	$rowsp1 = pg_fetch_array($resp1);
	
	pg_prepare($link,'sqlmand2','SELECT * from w_configs WHERE name=$1');
	$resp2 = pg_execute($link,'sqlmand2',array('mandrillhost'));
	$rowsp2 = pg_fetch_array($resp2);
	
	pg_prepare($link,'sqlmand3','SELECT * from w_configs WHERE name=$1');
	$resp3 = pg_execute($link,'sqlmand3',array('mandrill_port'));
	$rowsp3 = pg_fetch_array($resp3);
	
	pg_prepare($link,'sqlmand4','SELECT * from w_configs WHERE name=$1');
	$resp4 = pg_execute($link,'sqlmand4',array('mandrillsmtp'));
	$rowsp4 = pg_fetch_array($resp4);
	
	pg_prepare($link,'sqlmand5','SELECT * from w_configs WHERE name=$1');
	$resp5 = pg_execute($link,'sqlmand5',array('mandrillmtp'));
	$rowsp5 = pg_fetch_array($resp5);

//////////////////END FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	

	$count = 0;
	foreach ($data->ids as $id){
		unset($link);
		$link = ConnectDB();
		pg_prepare($link,'sqlstatusmultiple'.$id,'UPDATE w_orders SET status=$1 WHERE id=$2');
		$result = pg_execute($link,'sqlstatusmultiple'.$id,array($status,$id));
		$order = new stdClass();
		$order->id = $id;

  		switch ($status){
			case '0':
				$order->status = $lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PENDING_IN'];
				$ost = 0;
			break;
			case '1':
				$order->status = $lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_COMPLETED'];
				$ost = 1;
			break;
			case '2':
				$order->status = $lang_resource['INVOICE_CANCELED'];
				$ost = 2;
			break;
			case '3':
				$order->status = $lang_resource['ORDER_PROGRESS_TAB1'];
				$ost = 3;
			break;
			case '4':
				$order->status = $lang_resource['ORDER_PROGRESS_ORDER_WAY'];
				$ost = 4;
			break;
			case '5':
				$order->status = $lang_resource['ORDER_PROGRESS_CAN_BY_RES'];
				$ost = 5;
			break;
			case '6':
				$order->status = $lang_resource['ORDER_PROGRESS_CAN_BY_DRI'];
				$ost = 6;
			break;
		}

		unset($business_data);

		$business_data = GetOrderDataForStatusmultiple($id,$count);			
		
		$order->businessid =  $business_data[0]->business[0]->id;
		$order->businessname =  $business_data[0]->business[0]->name;

		//Fetch Email Address of Buyer,Business, Business Owner
		$businessemail =  $business_data[0]->business[0]->email;
		$business_owner_email = GetBusinessOwnerEmail($order->businessid,$count);
		$useremail =  $business_data[0]->buyer->email;
		$buname = $business_data[0]->customslug;

		$count++;

		//Mail Sent
		


		
		if($ost !=0){
			if($ost==1){
				unset($msg_rev);
				include "../templates/review_email_user.php";
							
				
				
				if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
				{
					include_once "lib/swift_required.php";
							
							
							//$mailer[$useremail]=$useremail;
							
				
							$subject = $lang_resource['ORDER_STATUS_MULTIPLE_CHANGE'];
							$from = array($rowEmail['email_from'] =>$rowEmail['sitename']);
							$to = array(
									$useremail  => $useremail
									);
							
							$text = "Order";
							$html = $msg_rev;
							
							$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
							$transport->setUsername($rowsp4['value']);
							$transport->setPassword($rowsp5['value']);
							$swift = Swift_Mailer::newInstance($transport);
							
							$message = new Swift_Message($subject);
							
							$message->setFrom($from);
							$message->setBody($html, 'text/html');
							$message->setTo($to);
							$message->addPart($text, 'text/plain');
							
							if ($recipients = $swift->send($message, $failures))
							{
							 //echo 'Message successfully sent!';
							 $success = 1;
							} else {
							 //echo "There was an error:\n";
							 //print_r($failures);
							 $success = 0;
							}
				}
				else{
							  
								$mail = new PHPMailer();
								$mail->PluginDir = "";
								$mail->Host = "localhost";
								$mail->From = $rowEmail['email_from'];
								$mail->FromName = $rowEmail['sitename'];
								$mail->Subject =   $lang_resource['ORDER_STATUS_MULTIPLE_CHANGE'];
								$mail->AddAddress($useremail);
								$mail->MsgHTML($msg_rev);
								$mail->IsHTML(true);
								$mail->AltBody ="Order";
								$mail->CharSet = 'UTF-8';
								$mail->Send();	
							}
			}
			unset($msg);
			include "../templates/current_order_status.php";
			
			if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
			{
				include_once "lib/swift_required.php";
				
				
				/*$mailer[$useremail]=$useremail;
				$mailer[$businessemail]=$businessemail;
				$mailer[$business_owner_email]=$business_owner_email;
				$mailer[$super_mail]=$super_mail;*/
				

				$subject = $lang_resource['ORDER_STATUS_MULTIPLE_CHANGE'];
				$from = array($rowEmail['email_from'] =>$rowEmail['sitename']);
				$to = array(
						 $useremail  => $useremail,
						 $businessemail => $businessemail,
						 $business_owner_email => $business_owner_email,
						 $super_mail => $super_mail
						);
				
				$text = "Order";
				$html = $msg;
				
				$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
				$transport->setUsername($rowsp4['value']);
				$transport->setPassword($rowsp5['value']);
				$swift = Swift_Mailer::newInstance($transport);
				
				$message = new Swift_Message($subject);
				
				$message->setFrom($from);
				$message->setBody($html, 'text/html');
				$message->setTo($to);
				$message->addPart($text, 'text/plain');
				
				if ($recipients = $swift->send($message, $failures))
				{
				 //echo 'Message successfully sent!';
				 $success = 1;
				} else {
				 //echo "There was an error:\n";
				 //print_r($failures);
				 $success = 0;
				}
		}
		else{
			
			$mail1 = new PHPMailer();
			$mail1->PluginDir = "";
			$mail1->Host = "localhost";
			$mail1->From = $rowEmail['email_from'];
			$mail1->FromName = $rowEmail['sitename'];
			$mail1->Subject =  $lang_resource['ORDER_STATUS_MULTIPLE_CHANGE'];
			$mail1->AddAddress($useremail);
			$mail1->AddAddress($businessemail);
			$mail1->AddAddress($business_owner_email);
			$mail1->AddAddress($super_mail);
			$mail1->MsgHTML($msg);
			$mail1->IsHTML(true);
			$mail1->AltBody ="Order";
			$mail1->CharSet = 'UTF-8';
			$mail1->Send();
		}
			
		}
	}
}	

function GetBusinessOwnerEmail($id,$count){
	$link = ConnectDB();
	$query = 'SELECT * FROM w_business WHERE id=$1';
	pg_prepare($link,'sqlbusinessdata'.$count,$query);
	$result = pg_execute($link,'sqlbusinessdata'.$count,array($id));
	$row = pg_fetch_array($result);

	$query1 = 'SELECT * FROM w_users WHERE id=$1';
	pg_prepare($link,'sqlbusinesswneremail'.$count,$query1);
	$result1 = pg_execute($link,'sqlbusinesswneremail'.$count,array($row['provider']));
	$row1 = pg_fetch_array($result1);
	pg_close($link);
	return $row1['email'];
}	

function GetOrderDataForStatusmultiple($id,$count){

	$link = ConnectDB();
	$query = 'SELECT id,data,date FROM w_orders WHERE id=$1';
	pg_prepare($link,'sqlorderdata'.$count,$query);
	$result2 = pg_execute($link,'sqlorderdata'.$count,array($id));
  	$info2 = array();
  	while($row = pg_fetch_array($result2)){  		
		$data2 = parse($row['data']);
		$data2->id = $row['id'];
		$data2->date = $row['date'];
		$data2->customslug =  $data2->customslug;
		array_push($info2,$data2);
    }    
    pg_close($link);
    return $info2;
}

function FetchOrderReserveData($bid){
			$link = ConnectDB();
			$reservequery = 'SELECT * from w_reserve WHERE  business=$1';
						pg_prepare($link,'sqlr2',$reservequery);
						$reserverecord = pg_execute($link,'sqlr2',array($bid));
					
						$reserves = array();
						
						while($row = pg_fetch_array($reserverecord)){
						
						//unset($reserve);
						$reserve = new stdClass();
						$reserve->id = $row['id'];
						$reserve->rtype = $row['rtype'];
								
						$reserve->guest = $row['guest'];
						$reserve->name = $row['name'];
						$reserve->business = $row['business'];
						array_push($reserves,$reserve);
						
						}
					echo json_encode($reserves);
					pg_close($link);
}

function FetchAllCurrency()
{
	$link = ConnectDB();
	pg_prepare($link,'sqldd','SELECT * from w_configs WHERE name=$1');
	$resultd = pg_execute($link,'sqldd',array('currency'));
	
	$rowd = pg_fetch_array($resultd);		
	$currency= $rowd['value'];	
	echo $currency;

}

function GetNeighborDataById($id)
{
	
	$link = ConnectDB();
	pg_prepare($link,'sqlNNNN','SELECT name from w_neighborhood WHERE id=$1');
	$resultd = @pg_execute($link,'sqlNNNN',array($id));
	
	if(@pg_num_rows($resultd) > 0)
	{
	$rowd = pg_fetch_array($resultd);		
	$currency= $rowd['name'];	
	echo $currency;
	}
	else
	{
	 echo ""; 	
	}
	
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
	return '$';			
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
	}
	if($sitecurrency == 'ALL'){
	return 'Lek';			
	}
	
	if($sitecurrency == 'AFN'){
	return '؋';			
	}
	if($sitecurrency == 'ARS'){
	return '$';			
	}
	if($sitecurrency == 'AWG'){
	return 'ƒ';			
	}
	if($sitecurrency == 'AZN'){
	return 'ман';			
	}
	if($sitecurrency == 'BSD'){
	return '$';			
	}
	if($sitecurrency == 'BBD'){
	return '$';			
	}
	if($sitecurrency == 'BYR'){
	return 'p.';			
	}
	
	if($sitecurrency == 'BZD'){
	return 'BZ$';			
	}
	if($sitecurrency == 'BMD'){
	return '$';			
	}
	if($sitecurrency == 'BOB'){
	return '$b';			
	}
	if($sitecurrency == 'BAM'){
	return 'KM';			
	}
	
	if($sitecurrency == 'BWP'){
	return 'P';			
	}
	if($sitecurrency == 'BGN'){
	return 'лв';			
	}
	if($sitecurrency == 'BND'){
	return '$';			
	}
	if($sitecurrency == 'KHR'){
	return '៛';			
	}
	if($sitecurrency == 'KYD'){
	return '$';			
	}
	if($sitecurrency == 'CLP'){
	return '$';			
	}
	if($sitecurrency == 'CNY'){
	return '¥';			
	}
	if($sitecurrency == 'COP'){
	return '$';			
	}
	if($sitecurrency == 'CRC'){
	return '₡';			
	}
	if($sitecurrency == 'HRK'){
	return 'kn';			
	}
	
	if($sitecurrency == 'CUP'){
	return '₱';			
	}
	if($sitecurrency == 'DOP'){
	return 'RD$';			
	}
	if($sitecurrency == 'XCD'){
	return '$';			
	}
	if($sitecurrency == 'EGP'){
	return 'Egp';			
	}
	if($sitecurrency == 'SVC'){
	return '$';			
	}
	if($sitecurrency == 'EEK'){
	return 'kr';			
	}
	if($sitecurrency == 'FKP'){
	return '£';			
	}
	if($sitecurrency == 'FJD'){
	return '$';			
	}
	if($sitecurrency == 'FCFA'){
	return 'CFA';			
	}
	if($sitecurrency == 'GHC'){
	return '¢';			
	}
	if($sitecurrency == 'GIP'){
	return '£';			
	}
	if($sitecurrency == 'GTQ'){
	return 'Q';			
	}
	if($sitecurrency == 'GGP'){
	return '£';			
	}
	if($sitecurrency == 'GYD'){
	return '$';			
	}
	if($sitecurrency == 'HNL'){
	return 'L';			
	}
	if($sitecurrency == 'ISK'){
	return 'kr';			
	}
	if($sitecurrency == 'INR'){
	return 'रु';			
	}
	if($sitecurrency == 'IDR'){
	return 'Rp';			
	}
	if($sitecurrency == 'IRR'){
	return '﷼';			
	}
	
	if($sitecurrency == 'IMP'){
	return '£';			
	}
	if($sitecurrency == 'JMD'){
	return 'J$';			
	}
	if($sitecurrency == 'JEP'){
	return '£';			
	}
	if($sitecurrency == 'KZT'){
	return 'лв';			
	}
	if($sitecurrency == 'KPW'){
	return '₩';			
	}
	if($sitecurrency == 'JOD'){
	return 'JOD';			
	}
	if($sitecurrency == 'KRW'){
	return '₩';			
	}
	if($sitecurrency == 'LAK'){
	return '₭';			
	}
	if($sitecurrency == 'LVL'){
	return 'Ls';			
	}
	if($sitecurrency == 'LBP'){
	return '£';			
	}
	if($sitecurrency == 'LRD'){
	return '$';			
	}
	if($sitecurrency == 'LTL'){
	return 'Lt';			
	}
	if($sitecurrency == 'MKD'){
	return 'ден';			
	}
	if($sitecurrency == 'MDL'){
	return 'MDL';			
	}
	if($sitecurrency == 'MUR'){
	return '₨';			
	}
	if($sitecurrency == 'MNT'){
	return '₮';			
	}
	if($sitecurrency == 'MZN'){
	return 'MT';			
	}
	if($sitecurrency == 'NAD'){
	return '$';			
	}
	
	if($sitecurrency == 'NPR'){
	return 'ƒ';			
	}if($sitecurrency == 'NIO'){
	return 'C$';			
	}if($sitecurrency == 'NGN'){
	return '₦';			
	}if($sitecurrency == 'OMR'){
	return '﷼';			
	}if($sitecurrency == 'PKR'){
	return '₨';			
	}if($sitecurrency == 'PAB'){
	return 'B/.';			
	}if($sitecurrency == 'PYG'){
	return 'Gs';			
	}if($sitecurrency == 'PEN'){
	return 'S/.';			
	}if($sitecurrency == 'QAR'){
	return '﷼';			
	}if($sitecurrency == 'RON'){
	return 'lei';			
	}if($sitecurrency == 'RUB'){
	return 'руб';			
	}if($sitecurrency == 'SHP'){
	return '£';			
	}if($sitecurrency == 'SAR'){
	return '﷼';			
	}if($sitecurrency == 'RSD'){
	return 'Дин.';			
	}if($sitecurrency == 'SCR'){
	return '₨';			
	}if($sitecurrency == 'SBD'){
	return '$';			
	}if($sitecurrency == 'SOS'){
	return 'S';			
	}if($sitecurrency == 'ZAR'){
	return 'R';			
	}if($sitecurrency == 'LKR'){
	return '₨';			
	}if($sitecurrency == 'SRD'){
	return '$';			
	}if($sitecurrency == 'SYP'){
	return '£';			
	}if($sitecurrency == 'TTD'){
	return 'TT$';			
	}if($sitecurrency == 'TVD'){
	return '$';			
	}if($sitecurrency == 'UAH'){
	return '₴';			
	}if($sitecurrency == 'UYU'){
	return '$U';			
	}if($sitecurrency == 'UZS'){
	return 'лв';			
	}if($sitecurrency == 'VEF'){
	return 'Bs';			
	}if($sitecurrency == 'VND'){
	return '₫';			
	}if($sitecurrency == 'YER'){
	return '﷼';			
	}if($sitecurrency == 'ZWD'){
	return 'Z$';			
	}if($sitecurrency == 'LYD'){
	return 'LYD';			
	}
	
}
 function get_lat_long($address){
 //$address = 'kolkata sodepur';
    $address = str_replace(" ", "+", $address);
	
	//echo  $address;

    $json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
    $json = json_decode($json);

    $lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
    $long = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
    $record['lat'] = $lat;
	$record['long'] = $long;
	
	
    return $record;
}
?>
