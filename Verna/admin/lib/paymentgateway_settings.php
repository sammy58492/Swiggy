<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);
switch ($_POST['f']){
	case 'FetchPaymentSettings':
		FetchPaymentSettings();
	break;	
	
	case 'FetchAllBusiness':
		FetchAllBusiness();
	break;
	case 'SavePaymentSettings':
		SavePaymentSettings($_POST['data']);
	break;
	case 'FetchPaymentListById':
		FetchPaymentListById($_POST['id']);
	break;
	case 'DeletePaymentSettings':
		DeletePaymentSettings($_POST['data']);
	break;
	default:
		die();
	break;
}
function FetchPaymentSettings(){
	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT distinct business_id FROM w_paymentgateway_details WHERE user_type=0');
	$result = pg_execute($link,'sql',array());
	$business = array();
	while($row = pg_fetch_array($result)){
		array_push($business, $row['business_id']);
	}
	
	$paymentbusinessslist = array();
	$i = 0;
	foreach($business as $bu){
		//unset($set);
		$set = new stdClass();
		$set->business_id = $bu;
		$set->business_name = FetchBusinessName($bu,$i);
		$set->payment_name = FetchAllPaymentName($bu,$i);

		array_push($paymentbusinessslist, $set);
		$i++;
	}
	

	pg_close($link);
	echo json_encode($paymentbusinessslist);	
}

function FetchBusinessName($id,$i){
	$link1 = ConnectDB();
	if($id == -1){
		return "All";
	}else{
		pg_prepare($link1,'sqlb'.$i,'SELECT * FROM w_business WHERE id=$1');
		$result = pg_execute($link1,'sqlb'.$i,array($id));
		$row = pg_fetch_array($result);
		return $row['name'];
		pg_close($link1);
	}
	
	
}

function FetchAllPaymentName($id,$i){
	$link1 = ConnectDB();
	pg_prepare($link1,'sqlp'.$i,'select * from w_paymentgateway where id in(SELECT paymentgateway_id FROM w_paymentgateway_details WHERE business_id=$1 and enabled=$2)');
	$result = pg_execute($link1,'sqlp'.$i,array($id,1));
	$paymentname =array();	
	while($row=pg_fetch_array($result)){
		//unset($pname);
		$pname = new stdClass();
		$pname->id = $row['id'];
		$pname->name = $row['name'];
		array_push($paymentname, $pname);		
	}
	
	return $paymentname;
}
function FetchPaymentListById($id){

	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT * FROM w_paymentgateway_details WHERE user_type=0 and business_id=$1');
	$result = pg_execute($link,'sql',array($id));
	$paymentlist = array();
	
	while($row = pg_fetch_array($result)){
		$paymentlist[$row['paymentgateway_id']]['paymentgateway_id'] = $row['paymentgateway_id'];
		$data = json_decode($row['credential']);		
		$credential = array();		
		if($data !=""){
			foreach($data as $cre){
				$credential[$cre->paymentfield] = $cre->value;				
			}
		}
		$paymentlist[$row['paymentgateway_id']]['credential'] = $credential;
		$paymentlist[$row['paymentgateway_id']]['enabled'] = $row['enabled'];
		
	}
	$response = array();
	$response['business_id'] = $id;
	$response['paymentlist'] = $paymentlist;

	pg_close($link);
	echo json_encode($response);	
}



function FetchAllBusiness(){
	$link = ConnectDB();
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	pg_prepare($link,'sqlbn','SELECT * from w_business');
	$result = pg_execute($link,'sqlbn',array());
	$business = array();
	$bus = new stdClass();
	$bus->id = '-1';
	$bus->name = 'All';
	array_push($business, $bus);
	while($row = pg_fetch_array($result)){
	//	unset($bus);
		$bus = new stdClass();
		$bus->id = $row['id'];
		$bus->name = Fetchbusinesslangname($defultlang,$row['id'],$link);
		if($bus->name !=null)
		array_push($business, $bus);
	}
	echo json_encode($business);
}

function Fetchbusinesslangname($defultlang,$cid,$link){

	pg_prepare($link,'sqlbusinessdefalutlang'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlbusinessdefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}

function SavePaymentSettings($data){
	$link = ConnectDB();
	//print_r($data);
	$data=parse($data);
	pg_prepare($link,'sql',"SELECT nextval('w_paymentgateway_details_id_seq') as key");
	pg_prepare($link,'sql1',"SELECT * from w_paymentgateway_details where paymentgateway_id=$1 and business_id=$2 and user_type=$3");
	pg_prepare($link,'sql2',"INSERT INTO w_paymentgateway_details (id,paymentgateway_id,business_id,user_type,credential,enabled) VALUES ($1,$2,$3,$4,$5,$6)");
	pg_prepare($link,'sql3',"UPDATE w_paymentgateway_details SET paymentgateway_id=$2,business_id=$3,user_type=$4,credential=$5,enabled=$6 WHERE id=$1");

	//print_r($data);
	foreach($data as $datas){
		$result = pg_execute($link,'sql1',array($datas->paymentgateway_id,$datas->business_id,$datas->user_type));	
		if(pg_num_rows($result)==1){
			$row=pg_fetch_array($result);
			$id = $row['id'];

			pg_execute($link,'sql3',array($id,$datas->paymentgateway_id,$datas->business_id,$datas->user_type,json_encode($datas->credential),$datas->enabled));
			//Update
		}else{
			$result = pg_execute($link,'sql',array());		
			if (pg_num_rows($result)==1)
				$row = pg_fetch_array($result);
				$id = $row['key'];

			pg_execute($link,'sql2',array($id,$datas->paymentgateway_id,$datas->business_id,$datas->user_type,json_encode($datas->credential),$datas->enabled));
			//Create
		}	
	}
}


function DeletePaymentSettings($data){
	SuperAdminsOnly();	
	$link = ConnectDB();		
	$data = parse($data);

	/*$data->ids = array_unique($data->ids);*/
	pg_prepare($link,'sql','DELETE FROM w_paymentgateway_details WHERE business_id=$1 and user_type=0');
	foreach ($data->ids as $id){	
		$result = pg_execute($link,'sql',array($id));	
	}
	pg_close($link);
}
?>
