<?php  session_start();
	 global $lang_resource;
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['l'] = $row1['id'];
	}


	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_static');
    $result = pg_execute($link,'sqlfetchlang',array());
 
	  while($row = pg_fetch_array($result)){
		 
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	  }
	  return $lang_resource;
	  pg_close($link);
}

$lang_resource = GetLangFile();
	/*require_once("config.php");*/
	
	$price		= $_POST["product"]; // DO CHECKS, THAT ORDER TOTAL IS CORRECT
	$id		= $_POST["productid"];

	require('../../config.php');
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);


pg_prepare($link,'sqlmakse12','SELECT * FROM w_orders WHERE id = $1;');
$search = pg_execute($link,'sqlmakse12',array($id));
$fetchData = pg_fetch_array($search);
$data=json_decode($fetchData['data']);

$total=$data->total;
$businessid = $data->business[0]->id;
	
pg_prepare($link,'sqlipn2','SELECT * FROM w_business WHERE id = $1;');
$searchs = pg_execute($link,'sqlipn2',array($businessid));
$bData = pg_fetch_array($searchs);

//select currency code for business city
$cityID = $bData['city'];
pg_prepare($link,'sqlccbc','SELECT currency FROM w_franchises WHERE id = $1;');
$currency_sql = pg_execute($link,'sqlccbc',array($cityID));

$currency_arry = pg_fetch_array($currency_sql);
if($bData['currency'] != "" || !empty($bData['currency'])){
		$cityCurrency = $bData['currency'];
	}else{
		$cityCurrency = $currency_arry['currency'];
	}


//set order-id in session
session_start();
$_SESSION['order_id'] = $id;


/**************************/
	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];


if($panelsetting == 1){	
		$mak_type = $bData['maksekeskus_pay'];
		$mak_shopid = $bData['maksekeskus_shopid'];
		$mak_secretkey = $bData['maksekeskus_secretkey'];
		
	}else{
	
		
	
		if($bData['maksekeskus_pay'] =="" || $bData['maksekeskus_shopid'] =="" || $bData['maksekeskus_secretkey'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,12));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='maksekeskus_pay'){
					$mak_type = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='maksekeskus_shopid'){
					$mak_shopid = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='maksekeskus_secretkey'){
					$mak_secretkey = $cre->value;
					$flag=false;
				}	
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,12));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='maksekeskus_pay'){
					$mak_type = $creall->value;
				}
				if($creall->paymentfield =='maksekeskus_shopid'){
					$mak_shopid = $creall->value;
				}
				if($creall->paymentfield =='maksekeskus_secretkey'){
					$mak_secretkey = $creall->value;
				}
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,12));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='maksekeskus_pay'){
					$mak_type = $creall->value;
				}
				if($creall->paymentfield =='maksekeskus_shopid'){
					$mak_shopid = $creall->value;
				}
				if($creall->paymentfield =='maksekeskus_secretkey'){
					$mak_secretkey = $creall->value;
				}
				
							
			}
				
			}
		}else{
			$mak_type = $bData['maksekeskus_pay'];
			$mak_shopid = $bData['maksekeskus_shopid'];
			$mak_secretkey = $bData['maksekeskus_secretkey'];
		}	
		
	
	
		
	}



$_CONFIG["shop_UUUID"]		= $mak_shopid; //"935e924c-2749-4c6d-a8ab-a195f041337d";//"935e924c-2749-4c6d-a8ab-a195f041337d"; // Maksekeskus.ee Shop ID
$_CONFIG["shop_SECRET_ID"]	= $mak_secretkey; //"5lS25Ark8vQen0leAg7bDKzrLKMq679iJy8J8YRRifrqVW3SmCVHRD1EFAGI8rH7"; // Maksekeskus.ee Secret key
$_CONFIG["country"]			= "ee"; // Customer’s country preference. If defined, only the payment methods available in the given country are offered. Defaults to ee (Estonia). Based on user setting
$_CONFIG["locale"]			= "et"; // Customer’s language preference. Defaults to et (Estonian). Languages currently available: et; en; ru; lv. Based on user setting
if($mak_type == 0)
$_CONFIG["payment_url"]		= "https://payment-test.maksekeskus.ee/pay/1/signed.html"; // TESTING URL! For LIVE usage, use following: https://payment.maksekeskus.ee/pay/1/signed.html
else
$_CONFIG["payment_url"]		= "https://payment.maksekeskus.ee/pay/1/signed.html"; // TESTING URL! For LIVE usage, use following: https://payment.maksekeskus.ee/pay/1/signed.html	







	$reference	= $_SESSION['order_id']; // Merchant’s order’s reference ID, ie. to associate payment data in MK and merchant’s systems. FOR EXAMPLE - ORDER ID
	
	$payment_data	= array(
		'shop' => $_CONFIG["shop_UUUID"],
		'amount' => $price,
		'reference' => $reference,
		'country' => $_CONFIG["country"],	
		'locale' => $_CONFIG["locale"]);
	
	 $JSON		= json_encode($payment_data);
	 $JSON_html	= htmlentities($JSON);
	
	$MAC		= strtoupper(hash('sha512', $JSON.$_CONFIG["shop_SECRET_ID"]));

?>
</pre>
<!DOCTYPE html>
<html lang="ee">
<head>
	<meta charset="utf-8">

	<title>Maksekeskuse </title>
	<meta name="description" content="Maksekeskuse DEMO">
	<meta name="author" content="Mart Leib">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

	<script type="text/javascript">
	jQuery(document).ready(function($) {
	// site preloader -- also uncomment the div in the header and the css style for #preloader
		$(window).load(function(){
			$('#preloader').fadeOut('slow',function(){$(this).remove();});
		});
	});
	</script>

	<script type="text/javascript">
	$(document).ready(function(){
    	$("#paymaske").submit();
	});
	</script>

	<style>
	#preloader {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		overflow: visible;
		background: rgba(255,255,255,0.7) url(../../../images/loadingpaypal.gif) no-repeat center center;
	}
	h3{
		position:absolute;
		bottom:100px;
		width:100%;
		text-align:center;
		color:red;
		z-index: 999;
		font-family: 'Open Sans', sans-serif;
	}

	</style>

</head>
<body>


	<div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>
 
	<form action="<?=$_CONFIG["payment_url"]?>" method="post" id="paymaske">		
		<input name="json" type="hidden" value="<?=$JSON_html?>" />
		<input name="mac" type="hidden" value="<?=$MAC?>" />		
	</form>
</body>
</html>