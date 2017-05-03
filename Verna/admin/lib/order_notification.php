<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f']){
	
	case 'FetchBusinessDataByID':
		FetchBusinessDataByID($_POST['id']);
	break;
	case 'statuschanged':
		statuschanged($_POST['id'],$_POST['name'],$_POST['status']);
	break;
	case 'FetchDataEmailNotification':
		FetchDataEmailNotification($_POST['id']);
	break;
	case 'FetchBringgid':
		FetchBringgid($_POST['id']);
	break;
	case 'SaveEmail':
		Save($_POST['data']);
	break;
	case 'SaveBringg':
		SaveBringg($_POST['data']);
	break;
	case 'FetchBusinessGprsDataByID':
		FetchBusinessGprsDataByID($_POST['id']);
	break;
	case 'FetchBusinessSmsDataByID':
		FetchBusinessSmsDataByID($_POST['id']);
	break;
	case 'SaveSms':
		Save($_POST['data']);
	break;
	case 'GoogleSave':
		GoogleSave($_POST['data']);
	break;
	case 'BringSave':
		Save($_POST['data']);
	break;
	case 'FetchPaymentDataByID':
		FetchPaymentDataByID($_POST['id']);
	break;
	case 'FetchAllPrinterModel':
		FetchAllPrinterModel();
	break;	
	
	
	case 'FetchBusinessPaypalDataByID':
		FetchBusinessPaypalDataByID($_POST['id']);
	break;
	case 'SavePaypal':
		Save($_POST['data']);
	break;
	case 'FetchBusinessPaypalAdaptiveDataByID':
		FetchBusinessPaypalAdaptiveDataByID($_POST['id']);
	break;
	case 'SavePaypalAdaptive':
		SavePaypalAdaptive($_POST['data']);
	break;
	case 'FetchBusinessAuthorizeDataByID':
		FetchBusinessAuthorizeDataByID($_POST['id']);
	break;
	case 'SaveAuthorize':
		Save($_POST['data']);
	break;
	case 'FetchBusinessBraintreeDataByID':
		FetchBusinessBraintreeDataByID($_POST['id']);
	break;
	case 'SaveBraintree':
		Save($_POST['data']);
	break;
	case 'FetchBusinessMarcoDataByID':
		FetchBusinessMarcoDataByID($_POST['id']);
	break;
	case 'SaveMarco':
		Save($_POST['data']);
	break;
	case 'Saveprinter':
		Saveprinter($_POST['data'],$_POST['id']);
	break;
	case 'FetchBusinessMercuryDataByID':
		FetchBusinessMercuryDataByID($_POST['id']);
	break;
	case 'SaveMercury':
		Save($_POST['data']);
	break;
	case 'FetchBusinessWolrdPayDataByID':
		FetchBusinessWolrdPayDataByID($_POST['id']);
	break;
	case 'SaveWorld':
		Save($_POST['data']);
	break;
	case 'FetchPrinterData':
		FetchPrinterData($_POST['id']);
	break;
	
	case 'FetchBusinessTransactiumDataByID':
		FetchBusinessTransactiumDataByID($_POST['id']);
	break;
	case 'SaveTransactium':
		Save($_POST['data']);
	break;
	
	case 'FetchBusinessPexpressDataByID':
		FetchBusinessPexpressDataByID($_POST['id']);
	break;
	case 'SavePexpress':
		Save($_POST['data']);
	break;
	case 'FetchBusinessMakeskeskusDataByID':
		FetchBusinessMakeskeskusDataByID($_POST['id']);
	break;
	case 'FetchBusinessVoguepayDataByID':
		FetchBusinessVoguepayDataByID($_POST['id']);
	break;
	case 'SaveVoguepay':
		Save($_POST['data']);
	break;
	
	case 'SaveMakeskeskus':
		Save($_POST['data']);
	break;
	
	case 'FetchBusinessSkrillDataByID':
		FetchBusinessSkrillDataByID($_POST['id']);
	break;

	case 'FetchBusinessPayeezyDataByID':
		FetchBusinessPayeezyDataByID($_POST['id']);
	break;
	case 'FetchBusinessPayUDataByID':
		FetchBusinessPayUDataByID($_POST['id']);
	break;
	case 'FetchBusinessStripeDataByID':
		FetchBusinessStripeDataByID($_POST['id']);
	break;
	case 'FetchBusinessPaypalproByID':
		FetchBusinessPaypalproByID($_POST['id']);
	break;
	case 'FetchBusinessPaygistixByID':
		FetchBusinessPaygistixByID($_POST['id']);
	break;
	case 'SaveBringgCompanyAndUser':
		SaveBringgCompanyAndUser($_POST['data']);
	break;
	case 'FetchBusinessGlobalDataByID':
		FetchBusinessGlobalDataByID($_POST['id']);
	break;
	case 'FetchBusinessBtransDataByID':
		FetchBusinessBtransDataByID($_POST['id']);
	break;
	case 'FetchBusinessBsaDataByID':
		FetchBusinessBsaDataByID($_POST['id']);
	break;
	case 'FetchBusinessAzulDataByID':
		FetchBusinessAzulDataByID($_POST['id']);
	break;
	case 'FetchBusinessQuickpayByID':
		FetchBusinessQuickpayByID($_POST['id']);
	break;
	case 'FetchBusinessPaynlByID':
		FetchBusinessPaynlByID($_POST['id']);
	break;
	case 'FetchBusinessZaakpayByID':
		FetchBusinessZaakpayByID($_POST['id']);
	break;
	case 'SaveSkrill':
		Save($_POST['data']);
	break;
	case 'SavePayeezy':
		Save($_POST['data']);
	break;
	case 'SavePayU':
		Save($_POST['data']);
	break;
	case 'SaveStripe':
		Save($_POST['data']);
	break;
	
	case 'Savepaypalpro':
		Save($_POST['data']);
	break;
	case 'Savepaygistix':
		Save($_POST['data']);
	break;
	case 'SaveGlobal':
		Save($_POST['data']);
	break;
	case 'SaveBtrans':
		Save($_POST['data']);
	break;
	case 'SaveBsa':
		Save($_POST['data']);
	break;
	case 'SaveAzul':
		Save($_POST['data']);
	break;
	case 'SaveQuickpay':
		Save($_POST['data']);
	break;
	case 'Savepaynl':
		Save($_POST['data']);
	break;
	case 'Savezaakpay':
		Save($_POST['data']);
	break;
	default:
		die();
	break;
}
function FetchBusinessDataByID($id){

	$link = ConnectDB();
	
	pg_prepare($link,'sqldrs','SELECT * from w_configs WHERE name=$1');
	$resultd = pg_execute($link,'sqldrs',array('BRINGG_PERMISSION_EACH_RESTAURANT'));
	$rowCon = pg_fetch_array($resultd);

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->googleanalytic = $row['googleanalytic'];
	$business->acceptemail = $row['acceptemail'];
	$business->acceptgprs = $row['acceptgprs'];
	$business->acceptsms = $row['acceptsms'];
		
	$business->acceptcash = $row['acceptcash'];
	$business->acceptcard = $row['acceptcard'];
	$business->acceptpaypal = $row['acceptpaypal'];
	$business->acceptpaypaladaptive = $row['acceptpaypaladaptive'];
	$business->acceptauthorize = $row['acceptauthorize'];
	$business->acceptbraintree = $row['acceptbraintree'];	
	$business->acceptmarco = $row['acceptmarco'];
	$business->acceptmercury = $row['acceptmercury'];
	$business->acceptworldpay = $row['acceptworldpay'];
	$business->accepttransactium = $row['accepttransactium'];
	$business->acceptpexpress = $row['acceptpexpress'];	
	$business->acceptmaksekeskus = $row['acceptmaksekeskus'];
	$business->acceptvoguepay = $row['acceptvoguepay'];	
	$business->acceptskrill = $row['acceptskrill'];	
	$business->acceptpayeezy = $row['acceptpayeezy'];
	$business->acceptpayu = $row['acceptpayu'];
	$business->acceptstripe = $row['acceptstripe'];
	$business->acceptpaypalpro = $row['acceptpaypalpro'];
	$business->acceptpaygistix = $row['acceptpaygistix'];
	$business->acceptglobal = $row['acceptglobal'];
	$business->acceptbtrans = $row['acceptbtrans'];	
	$business->btrans_pay = $row['btrans_pay'];
	$business->acceptbsa = $row['acceptbsa'];
	$business->acceptazul = $row['acceptazul'];	
	$business->acceptquickpay = $row['acceptquickpay'];
	$business->acceptpaynl = $row['acceptpaynl'];
	$business->acceptzaakpay = $row['acceptzaakpay'];
	$business->btrans_merchantname = $row['btrans_merchantname'];
	$business->btrans_merchantnumber = $row['btrans_merchantnumber'];
	$business->btrans_merchanttype = $row['btrans_merchanttype'];	
	$business->btrans_merchantterminal = $row['btrans_merchantterminal'];
	$business->bring_permission_type = $row['bring_permission_type'];
	$business->bring_access_token_live = $row['bring_access_token_live'];
	$business->bring_secret_key_live = $row['bring_secret_key_live'];
	$business->bring_access_token_test = $row['bring_access_token_test'];
	$business->bring_secret_key_test = $row['bring_secret_key_test'];
	
	$business->ALL_BRINGG_PERMISSION_EACH_RESTAURANT = $rowCon['value'];	

	

	echo json_encode($business);
}
function FetchPrinterData($id)
{
	//echo $id;exit;
	$link = ConnectDB();
	$orders = array();
	pg_prepare($link,'sql','SELECT name,value from w_configs');
	$result = pg_execute($link,'sql',array());
	
	pg_prepare($link,'sql2','SELECT * from w_business WHERE id=$1');
	$result2 = pg_execute($link,'sql2',array($id));
	$row2 = pg_fetch_array($result2);
	
	

$spiltform = array();
//unset($makept);
$makept = new stdClass();
while($row = pg_fetch_array($result)){
	if($row["name"]=="apn"){
	$makept->apn = $row['value'];
	}
	if($row["name"]=="sip"){
	$makept->sip = $row['value'];
	}
}
$makept->pfp = $row2['pfp'];
$makept->cfp = $row2['cfp'];
$makept->printer_model = $row2['printer_model'];

array_push($spiltform,$makept);
echo json_encode($spiltform);


}
function FetchAllPrinterModel()
{
	$link = ConnectDB();
	pg_prepare($link,'sql3','SELECT * from w_printer_model');
	$result3 = pg_execute($link,'sql3',array());
	
	$allprinter = array();
	
	
	while($row3 = pg_fetch_array($result3))
	{
		unset($printerobj);
		$printerobj = new stdClass();
		$printerobj->id = $row3['id'];
		$printerobj->model_name = $row3['model_name'];
		array_push($allprinter,$printerobj);
	}


  //return $allprinter;
  echo json_encode($allprinter);	
	
}

function statuschanged($id,$name,$status){

	$link = ConnectDB();
	if($name == 'acceptemail')
		$sql = 'UPDATE w_business SET acceptemail=$1 where id=$2';
	if($name == 'acceptgprs')
		$sql = 'UPDATE w_business SET acceptgprs=$1 where id=$2';
	if($name == 'acceptsms')
		$sql = 'UPDATE w_business SET acceptsms=$1 where id=$2';
	
	if($name == 'acceptcash')
		$sql = 'UPDATE w_business SET acceptcash=$1 where id=$2';
	if($name == 'acceptcard')
		$sql = 'UPDATE w_business SET acceptcard=$1 where id=$2';
	if($name == 'acceptpaypal')
		$sql = 'UPDATE w_business SET acceptpaypal=$1 where id=$2';
	if($name == 'acceptpaypaladaptive')
		$sql = 'UPDATE w_business SET acceptpaypaladaptive=$1 where id=$2';
	if($name == 'acceptauthorize')
		$sql = 'UPDATE w_business SET acceptauthorize=$1 where id=$2';
	if($name == 'acceptbraintree')
		$sql = 'UPDATE w_business SET acceptbraintree=$1 where id=$2';	
	if($name == 'acceptmarco')
		$sql = 'UPDATE w_business SET acceptmarco=$1 where id=$2';	
	if($name == 'acceptmercury')
		$sql = 'UPDATE w_business SET acceptmercury=$1 where id=$2';
	if($name == 'acceptworldpay')
		$sql = 'UPDATE w_business SET acceptworldpay=$1 where id=$2';
		
	if($name == 'accepttransactium')
		$sql = 'UPDATE w_business SET accepttransactium=$1 where id=$2';
		
	if($name == 'acceptpexpress')
		$sql = 'UPDATE w_business SET acceptpexpress=$1 where id=$2';
		
	if($name == 'acceptmaksekeskus')
		$sql = 'UPDATE w_business SET acceptmaksekeskus=$1 where id=$2';
		
	if($name == 'acceptvoguepay')
		$sql = 'UPDATE w_business SET acceptvoguepay=$1 where id=$2';
		
	if($name == 'acceptskrill')
		$sql = 'UPDATE w_business SET acceptskrill=$1 where id=$2';

	if($name == 'acceptpayeezy')
		$sql = 'UPDATE w_business SET acceptpayeezy=$1 where id=$2';
	
	if($name == 'acceptpayu')
		$sql = 'UPDATE w_business SET acceptpayu=$1 where id=$2';
		
	if($name == 'acceptstripe')
		$sql = 'UPDATE w_business SET acceptstripe=$1 where id=$2';
		
	if($name == 'acceptpaypalpro')
		$sql = 'UPDATE w_business SET acceptpaypalpro=$1 where id=$2';
		
	if($name == 'acceptpaygistix')
		$sql = 'UPDATE w_business SET acceptpaygistix=$1 where id=$2';
		
	if($name == 'acceptglobal')
		$sql = 'UPDATE w_business SET acceptglobal=$1 where id=$2';
		
	if($name == 'acceptbtrans')
		$sql = 'UPDATE w_business SET acceptbtrans=$1 where id=$2';
		
	if($name == 'acceptbsa')
		$sql = 'UPDATE w_business SET acceptbsa=$1 where id=$2';
	if($name == 'acceptazul')
		$sql = 'UPDATE w_business SET acceptazul=$1 where id=$2';
	if($name == 'acceptquickpay')
		$sql = 'UPDATE w_business SET acceptquickpay=$1 where id=$2';
	if($name == 'acceptpaynl')
		$sql = 'UPDATE w_business SET acceptpaynl=$1 where id=$2';
	if($name == 'acceptzaakpay')
		$sql = 'UPDATE w_business SET acceptzaakpay=$1 where id=$2';
		
	pg_prepare($link,'sql',$sql);
	$result = pg_execute($link,'sql',array($status,$id));
	if($result){
		echo "ok";
	}
	
}
function Saveprinter($data,$id){
	 /*$form = json_deocde($data);
	 print_r($form);
	 $id = $form->id;
	
	if ($form->type=='modify')
		{
		UpdateQuery('w_business',$form->fields,$form->id);
	
		}*/
		
		$link = ConnectDB();
		
		pg_prepare($link,'sqlprint','UPDATE w_business SET printer_model=$1 WHERE id=$2');
		$var1 = pg_execute($link,'sqlprint',array($data,$id));
		
		echo $var1;
		
		
}
function GoogleSave($data){
$link = ConnectDB();

	 $form = parse($data);
		print_r($form);
	$id = $form->id;
	  $value= $form->fields->trackingid->value;

		pg_prepare($link,'sqlgoogle','UPDATE w_business SET googleanalytic=$2 WHERE id=$1');
		pg_execute($link,'sqlgoogle',array($id,$value));

}


function Save($data){

	$form = parse($data);
//	print_r($form);
	$id = $form->id;
	
	if ($form->type=='create')
		{
		$id = InsertQuery('w_business',$form->fields);	
		echo $id;
		}
		else
		UpdateQuery('w_business',$form->fields,$form->id);

}

function SaveBringg($data){
$link = ConnectDB();
	$form = parse($data);
	//echo "<pre>";
	//print_r($form);
	$id = $form->id;
	
	//echo $form->fields->BRINGG_COMPANY_ID_LIVE->value;
	
		 pg_prepare($link,'sqlbrgg134','UPDATE w_business SET bring_access_token_live=$1,bring_secret_key_live=$2,bring_access_token_test=$3,bring_secret_key_test=$4,bringg_company_id_test=$5,bringg_company_id_live=$6,bringg_company_name_live=$7,bringg_company_name_test=$8,bringg_key_type=$9 WHERE id=$10');
	pg_execute($link,'sqlbrgg134',array($form->fields->BRIMG_ACCESS_TOKEN_LIVE->value,$form->fields->BRIMG_SECRET_KEY_LIVE->value,$form->fields->BRIMG_ACCESS_TOKEN_TEST->value,$form->fields->BRIMG_SECRET_KEY_TEST->value,$form->fields->BRINGG_COMPANY_ID_TEST->value,$form->fields->BRINGG_COMPANY_ID_LIVE->value,$form->fields->BRINGG_COMPANY_NAME_LIVE->value,$form->fields->BRINGG_COMPANY_NAME_TEST->value,$form->fields->BRING_PERMISSION_TYPE->value,$form->id));
		
		  echo "success";
}
function FetchBringgid($id){

	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT id,bringgcompanyid,bringg_userid,bringg_password,bringg_email,bringg_address,bringg_username,bring_permission_type,bring_access_token_live,bring_secret_key_live,bring_access_token_test,bring_secret_key_test,bringg_company_id_test,bringg_company_id_live,bringg_company_name_live,bringg_company_name_test,bringg_key_type FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	
	$business = new stdClass();
	$business->id = $row['id'];
	$business->bringg_key = $row['bringg_key_type'];
	$business->bringg_company_id_live = $row['bringg_company_id_live'];
	$business->bringg_company_name_live = $row['bringg_company_name_live'];
	$business->bring_access_token_live = $row['bring_access_token_live'];
	$business->bring_secret_key_live = $row['bring_secret_key_live'];
	$business->bringg_company_id_test = $row['bringg_company_id_test'];
	$business->bringg_company_name_test = $row['bringg_company_name_test'];
	$business->bring_access_token_test = $row['bring_access_token_test'];
	$business->bring_secret_key_test = $row['bring_secret_key_test'];
	$business->bringgcompanyid = $row['bringgcompanyid'];
	$business->bringg_userid = $row['bringg_userid'];
	$business->bringg_password = $row['bringg_password'];
	$business->bringg_email = $row['bringg_email'];
	$business->bringg_address = $row['bringg_address'];
	$business->bringg_username = $row['bringg_username'];
	echo json_encode($business);
}

function FetchDataEmailNotification($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->email = $row['email'];

	echo json_encode($business);
}

function FetchBusinessGprsDataByID($id){
	$link = ConnectDB();
	pg_prepare($link,'sql3','SELECT * from w_printer_model');
	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);

	$business->pfp = $row['pfp'];
	$business->cfp = $row['cfp'];

	pg_prepare($link,'sql1','SELECT name,value from w_configs');
	$result2 = pg_execute($link,'sql1',array());
	while($row2 = pg_fetch_array($result2)){
		if($row2["name"]=="apn"){
			$business->apn = $row2['value'];
		}
		if($row2["name"]=="sip"){
			$business->sip = $row2['value'];
		}
		
		
		$result3 = pg_execute($link,'sql3',array());		
		$allprinter = array();				
		while($row3 = pg_fetch_array($result3))
		{
			unset($printerobj);
			$printerobj->id = $row3['id'];
			$printerobj->model_name = $row3['model_name'];
			array_push($allprinter,$printerobj);
						
		}
	
		

	}
	

	//echo json_encode($business);
	echo json_encode($allprinter);
	
}
function FetchBusinessSmsDataByID($id){
	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->twiliophone = $row['twiliophone'];
	$business->cel = $row['cel'];

	echo json_encode($business);	
}


function FetchBusinessPaypalDataByID($id){
	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);

	$business = new stdClass();
	$business->id = $row['id'];
	$business->paypal = $row['paypal'];
	$business->paypal_type = $row['paypal_type'];
	$business->paypalcurrency = $row['paypalcurrency'];

	echo json_encode($business);	
}
function FetchBusinessPaypalAdaptiveDataByID($id){
	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_splitpaymain WHERE bus_id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	
	$business = new stdClass();
	$business->id = $row['id'];
	$business->bid = $row['bus_id'];
	$business->splitcase = $row['splitcase'];
	$business->com_per = $row['com_per'];
	$business->com_rate = $row['com_rate'];
	$business->tax = $row['tax'];
	$business->applytax = $row['applytax'];
	$business->citytax = $row['citytax'];
	$business->custom = $row['custom'];
	$business->paymail = $row['paymail'];
	$business->payadaptivemail = $row['payadaptivemail'];

	echo json_encode($business);	
}
function SavePaypalAdaptive($data){

	$form = json_decode($data);

	$id = $form->id;
	
	if ($form->type=='create')
		{
		$id = InsertQuery('w_splitpaymain',$form->fields);	
		echo $id;
		}
		else
		UpdateQuery('w_splitpaymain',$form->fields,$form->id);

}
function FetchBusinessAuthorizeDataByID($id){
	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->payment_type = $row['payment_type'];
	$business->aplid = $row['aplid'];
	$business->tkey = $row['tkey'];

	echo json_encode($business);	
}

function FetchBusinessBraintreeDataByID($id){
	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	
	$business = new stdClass();
	$business->id = $row['id'];
	$business->environment = $row['environment'];
	$business->merchant_id = $row['merchant_id'];
	$business->public_key = $row['public_key'];
	$business->private_key = $row['private_key'];

	echo json_encode($business);	
}
function FetchBusinessMarcoDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->clientkey = $row['clientkey'];
	$business->secretkey = $row['secretkey'];
	

	echo json_encode($business);	
}
function FetchBusinessMercuryDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->mercury_id = $row['mercury_id'];
	$business->mercury_pass = $row['mercury_pass'];
	

	echo json_encode($business);	
}
function FetchBusinessWolrdPayDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->cardsaveid = $row['cardsaveid'];
	$business->cardsavepass = $row['cardsavepass'];
	

	echo json_encode($business);	
}

function FetchBusinessTransactiumDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->transactiumusername = $row['transactiumusername'];
	$business->transactiumpass = $row['transactiumpass'];
	$business->transactiumtag = $row['transactiumtag'];
	

	echo json_encode($business);	
}

function FetchBusinessPexpressDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->pexpressusername = $row['pexpressusername'];
	$business->pexpresspass = $row['pexpresspass'];
	

	echo json_encode($business);	
}


function FetchBusinessMakeskeskusDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->maksekeskus_pay = $row['maksekeskus_pay'];
	$business->maksekeskus_shopid = $row['maksekeskus_shopid'];
	$business->maksekeskus_secretkey = $row['maksekeskus_secretkey'];
	

	echo json_encode($business);	
}

function FetchBusinessVoguepayDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->vogue_pay = $row['vogue_pay'];
	$business->vogue_merchant_id = $row['vogue_merchant_id'];
	

	echo json_encode($business);	
}


function FetchBusinessSkrillDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->skrillemail = $row['skrillemail'];
	

	echo json_encode($business);	
}


function FetchBusinessPayeezyDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->payeezyapikey = $row['payeezyapikey'];
	$business->payeezyapisecret = $row['payeezyapisecret'];
	$business->payeezyjssecurity = $row['payeezyjssecurity'];
	$business->payeezymerchant = $row['payeezymerchant'];
	

	echo json_encode($business);	
}

function FetchBusinessPayUDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	
	$business = new stdClass();
	$business->id = $row['id'];
	$business->payumerchantkey = $row['payumerchantkey'];
	$business->payumerchantsalt = $row['payumerchantsalt'];
	$business->payumerchantid = $row['payumerchantid'];
	
	
	

	echo json_encode($business);	
}


function FetchBusinessStripeDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->stripe_pay = $row['stripe_pay'];
	$business->stripeapikey = $row['stripeapikey'];
	$business->publishablekey = $row['publishablekey'];
	
	
	

	echo json_encode($business);	
}

function FetchBusinessPaypalproByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->p_api_username = $row['p_api_username'];
	$business->p_api_password = $row['p_api_password'];
	$business->p_api_signature = $row['p_api_signature'];
	$business->paypalpro_pay = $row['paypalpro_pay'];

	echo json_encode($business);	
}
function FetchBusinessPaygistixByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->paygistix_pay = $row['paygistix_pay'];
	$business->paygistix_username = $row['paygistix_username'];
	$business->paygistix_password = $row['paygistix_password'];
	

	echo json_encode($business);	
}

function FetchBusinessGlobalDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->global_pay = $row['global_pay'];
	$business->global_sresecureid = $row['global_sresecureid'];
	$business->global_password = $row['global_password'];
	

	echo json_encode($business);	
}

function FetchBusinessBtransDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->acceptbtrans = $row['acceptbtrans'];	
	$business->btrans_pay = $row['btrans_pay'];
	$business->btrans_merchantname = $row['btrans_merchantname'];
	$business->btrans_merchantnumber = $row['btrans_merchantnumber'];
	$business->btrans_merchanttype = $row['btrans_merchanttype'];	
	$business->btrans_merchantterminal = $row['btrans_merchantterminal'];

	echo json_encode($business);	
}

function FetchBusinessBsaDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->bsapay = $row['bsapay'];
	$business->bsachannels = $row['bsachannels'];
	$business->bsamerchantcode = $row['bsamerchantcode'];
	$business->bsaterminal = $row['bsaterminal'];
	$business->bsatransationtype = $row['bsatransationtype'];
	$business->bsacurrency = $row['bsacurrency'];
	echo json_encode($business);	
}
function FetchBusinessAzulDataByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->acceptazul = $row['acceptazul'];	
	$business->azul_pay = $row['azul_pay'];
	$business->azul_merchantname = $row['azul_merchantname'];
	$business->azul_merchantid = $row['azul_merchantid'];
	$business->azul_merchanttype = $row['azul_merchanttype'];	
	$business->azul_authkey = $row['azul_authkey'];
	

	echo json_encode($business);	
}
function FetchBusinessQuickpayByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->quick_pay = $row['quick_pay'];
	$business->quickpay_merchant = $row['quickpay_merchant'];
	$business->quickpay_md5secret = $row['quickpay_md5secret'];
	

	echo json_encode($business);	
}
function FetchBusinessPaynlByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->acceptpaynl = $row['acceptpaynl'];	
	$business->paynl_pay = $row['paynl_pay'];
	$business->paynl_apitoken = $row['paynl_apitoken'];
	$business->paynl_serviceid = $row['paynl_serviceid'];


	echo json_encode($business);	
}
function FetchBusinessZaakpayByID($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->zaakpay_pay = $row['zaakpay_pay'];
	$business->zaakpay_merchantid = $row['zaakpay_merchantid'];
	$business->zaakpay_secretkey = $row['zaakpay_secretkey'];
	

	echo json_encode($business);	
}

function FetchPaymentDataByID($id){
	
	$link = ConnectDB();
	$bb="-1";
	pg_prepare($link,'sql','SELECT DISTINCT paymentgateway_id FROM w_paymentgateway_details WHERE (business_id=$1 or business_id=$2) and enabled=$3 ORDER BY paymentgateway_id ASC');
	$result = pg_execute($link,'sql',array($id,$bb,1));
	$paymentgateways = array();
	while($row = pg_fetch_array($result)){
		$paymentgateway = new stdClass();
	//	unset($paymentgateway);
			//$paymentgateway->business_id = $row['business_id'];
			$paymentgateway->paymentgateway_id = $row['paymentgateway_id'];
		array_push($paymentgateways,$paymentgateway);
	}
	

	echo json_encode($paymentgateways);
	
}
function SaveBringgCompanyAndUser($value){
	
	$link = ConnectDB();
	$form = parse($value);

	pg_prepare($link,'sqlbrp','SELECT value FROM w_configs WHERE name=$1');
	$resultpremission = pg_execute($link,'sqlbrp',array("BRING_PERMISSION_TYPE"));
	$configbrpe  = pg_fetch_array($resultpremission);


   if($configbrpe['BRING_PERMISSION_TYPE'] == 'true'){
   	$test = "true";
	pg_prepare($link,'sqlbr','SELECT value FROM w_configs WHERE name=$1');
	$resultbr = pg_execute($link,'sqlbr',array("BRIMG_ACCESS_TOKEN_LIVE"));
	$configbr  = pg_fetch_array($resultbr);
	
	pg_prepare($link,'sqlbr2','SELECT value FROM w_configs WHERE name=$1');
	$resultbr2 = pg_execute($link,'sqlbr2',array("BRIMG_SECRET_KEY_LIVE"));
	$configbr2  = pg_fetch_array($resultbr2);



   } else {
	$test = "false";
	pg_prepare($link,'sqlbr','SELECT value FROM w_configs WHERE name=$1');
	$resultbr = pg_execute($link,'sqlbr',array("BRIMG_ACCESS_TOKEN_TEST"));
	$configbr  = pg_fetch_array($resultbr);
	
	pg_prepare($link,'sqlbr2','SELECT value FROM w_configs WHERE name=$1');
	$resultbr2 = pg_execute($link,'sqlbr2',array("BRIMG_SECRET_KEY_TEST"));
	$configbr2  = pg_fetch_array($resultbr2);

   }
	
	
	
	

	
	
		
	//////////////bring////////////////////
			$url = 'http://api.bringg.com/partner_api/companies';
						$data_string = array(
						'name' => $form->fields->BRINGG_USER_NAME->value,
						'test' => $test,
						'address' => $form->fields->BRINGG_ADDRESS->value,
						'phone' =>"9903232664",
						'access_token' => $configbr['value'],
						'timestamp' => date('Y-m-d H:i:s')
						);
						$secret_key = $configbr2['value'];
						
					
						$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
						
					    $data_string["signature"] = $signature;
				
						
					    $content = json_encode($data_string);
					
						$ch=curl_init($url);
						curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
						curl_setopt($ch, CURLOPT_HEADER, false);
						curl_setopt($ch, CURLOPT_HTTPHEADER,
						array('Content-Type:application/json',
						'Content-Length: ' . strlen($content))
						);
						curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
						$json_response = curl_exec($ch);
						$status = curl_getinfo($ch);
						curl_close($ch);
						$return_data = json_decode($json_response);
						
						/*print_r($return_data);*/

/*echo "<pre>";
print_r($return_data);*/
						
			if($return_data->error) {
			echo $return_data->error;
			} else if($return_data->message->phone) {
								
			echo $return_data->message->phone[0];
							
			} else  {
			if($return_data->company->id) {
				
				
				$urluser = 'http://api.bringg.com/partner_api/users';
				
				$data_string_user = array(
				'company_id' => $return_data->company->id,
				'name' => $form->fields->BRINGG_USER_NAME->value,
				'email' => $form->fields->BRINGG_EMAIL->value,
				'password' => $form->fields->BRINGG_PASSWORD->value,
				'admin' => "true",
				//'access_token' => "pyZgq26MSTrjBJys5zxe",
				'access_token' => $configbr['value'],
				'timestamp' => date('Y-m-d H:i:s')
				);
				$secret_key = $configbr2['value'];
				
				// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
				$signature = hash_hmac("sha1", http_build_query($data_string_user), $secret_key);
				
				//print("The signature: " + $signature);
				
				$data_string_user["signature"] = $signature;
				
				//print("this is the data string: ");
				//print_r($data_string);
				
				$contents = json_encode($data_string_user);
				
				//print("The content: " + $content);
				// $data_string = json_encode($data);
				$ch=curl_init($urluser);
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $contents);
				curl_setopt($ch, CURLOPT_HEADER, false);
				curl_setopt($ch, CURLOPT_HTTPHEADER,
				array('Content-Type:application/json',
				'Content-Length: ' . strlen($contents))
				);
				curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
				//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
				
				$json_responses = curl_exec($ch);
				
				$status = curl_getinfo($ch);
				
				curl_close($ch);
				
				$return_data_user = json_decode($json_responses);
				
				
	        pg_prepare($link,'sqlbrgg1','UPDATE w_business SET bringpermission=$1,bringgcompanyid= $2,bringg_userid= $3, bringg_password=$4, bringg_address=$5, bringg_username=$6,bringg_email=$7 WHERE id=$8');
			pg_execute($link,'sqlbrgg1',array('1',$return_data->company->id,$return_data_user->id,$form->fields->BRINGG_PASSWORD->value,$form->fields->BRINGG_ADDRESS->value,$form->fields->BRINGG_USER_NAME->value,$form->fields->BRINGG_EMAIL->value,$form->id));
		
		  echo "success";
			}
			else {
			echo "Sorry! Bringg Apps not created successfully ";	
				
				}
			} 

	
}
?>
