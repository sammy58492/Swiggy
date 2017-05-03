<?php
 
session_start();
//global $lang_resource;
$id = $_REQUEST["id"];

//$lang_resource = GetLangFile();
$lang_file = 'lang.en.php';
require($_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file);
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sqlmakse121','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlmakse121',array($id));
	$fetchData = pg_fetch_array($search);
	$data=json_decode($fetchData['data']);
	//echo "<pre>";
   // print_r($data);
	$total=$data->total;
	//$total = 1.00;
	$businessid = $data->business[0]->id;
	
	
	/**************************/
	pg_prepare($link,'sqlpayment1'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment1'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	
		
	pg_prepare($link,'sqlipn21','SELECT * FROM w_business WHERE id = $1;');
	$searchs = pg_execute($link,'sqlipn21',array($businessid));
	$bData = pg_fetch_array($searchs);


	//select currency code for business city
	$cityID = $bData['city'];
	pg_prepare($link,'sqlccbc1','SELECT currency FROM w_franchises WHERE id = $1;');
	$currency_sql = pg_execute($link,'sqlccbc1',array($cityID));

	$currency_arry = pg_fetch_array($currency_sql);
	if($bData['currency'] != "" || !empty($bData['currency'])){
		$cityCurrency = $bData['currency'];
	}else{
		$cityCurrency = $currency_arry['currency'];
	}
	
	if($panelsetting == 1){	
		$azul_pay = $bData['azul_pay'];
		$azul_merchantname = $bData['azul_merchantname'];
		$azul_merchantid = $bData['azul_merchantid'];
		$azul_merchanttype = $bData['azul_merchanttype'];
		$azul_authkey = $bData['azul_authkey'];
		
		
	}else{
	
	if(empty($bData['azul_merchantname'])|| empty($bData['azul_merchantid']) || empty($bData['azul_merchanttype']) || empty($bData['azul_authkey'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall1','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay1'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay1'.$businessid,array($businessid,12));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='azul_pay'){
					$azul_pay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='azul_merchantname'){
					$azul_merchantname = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='azul_merchantid'){
					$azul_merchantid = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='azul_merchanttype'){
					$azul_merchanttype = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='azul_authkey'){
					$azul_authkey = $cre->value;
					$flag=false;
				}
				
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,23));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='azul_pay'){
					$azul_pay = $creall->value;
				}
				if($creall->paymentfield =='azul_merchantname'){
					$azul_merchantname = $creall->value;
				}
				if($creall->paymentfield =='azul_merchantid'){
					$azul_merchantid = $creall->value;
				}
				if($creall->paymentfield =='azul_merchanttype'){
					$azul_merchanttype = $creall->value;
				}
				if($creall->paymentfield =='azul_authkey'){
					$azul_authkey = $creall->value;
				}
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,23));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='azul_pay'){
					$azul_pay = $creall->value;
				}
				if($creall->paymentfield =='azul_merchantname'){
					$azul_merchantname = $creall->value;
				}
				if($creall->paymentfield =='azul_merchantid'){
					$azul_merchantid = $creall->value;
				}
				if($creall->paymentfield =='azul_merchanttype'){
					$azul_merchanttype = $creall->value;
				}
				if($creall->paymentfield =='azul_authkey'){
					$azul_authkey = $creall->value;
				}
			
				
							
			}
				
			}
		}else{		
			$azul_pay = $bData['azul_pay'];
			$azul_merchantname = $bData['azul_merchantname'];
			$azul_merchantid = $bData['azul_merchantid'];
			$azul_merchanttype = $bData['azul_merchanttype'];
			$azul_authkey = $bData['azul_authkey'];
		}	
		
	}

	
?>
<?php
if($azul_pay=='0')
{
		$submiturl='https://pruebas.azul.com.do/PaymentPage/';
}
else
{
		$submiturl='https://pagos.azul.com.do/paymentpage/default.aspx';
}
$MerchantId = "39147960017";
$MerchantType ="OKPIDELO.COM";
$MerchantName ="okpidelo";
$CurrencyCode ="$";
$OrderNumber = rand(100000,1000000);
$Amount = $total*100;
$Tax = "0000";
$ApprovedUrl = "http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/azul/success.php?id=".$id;
$DeclinedUrl = "http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/azul/failure.php?id=".$id;
$CancelUrl = "http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/azul/failure.php?id=".$id;
$ResponsePostUrl = "";
$UseCustomField1 = "1";
$CustomField1Label = "Custom1";
$CustomField1Value = "Value1";
$UseCustomField2 = "1";
$CustomField2Label = "Custom2";
$CustomField2Value = "Value2";
$AuthKey = "snocueisluxgadsxaoyapauuonbipxtkuhigduwlntandsuvipdasyemsfiojhtr2NmplVn9Uk1BGL4ZJmbjLYobfsFRPO05G5nxe5nYvz9RrySusLVpYAKJQ1WRb49c";

$AuthHash = $MerchantId.$MerchantType.$MerchantName.$CurrencyCode.$OrderNumber.$Amount.$Tax.$ApprovedUrl.$DeclinedUrl.$CancelUrl.$ResponsePostUrl.$UseCustomField1.$CustomField1Label.$CustomField1Value.$UseCustomField2.$CustomField2Label.$CustomField2Value.$AuthKey;
$AuthHash = hash('sha512', $AuthHash);
?>	
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Secure Payment Form</title>
<link rel="stylesheet" href="css/bootstrap-min.css">
<link rel="stylesheet" href="css/bootstrap-formhelpers-min.css" media="screen">
<link rel="stylesheet" href="css/bootstrapValidator-min.css"/>
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
<link rel="stylesheet" href="css/bootstrap-side-notes.css" />
<style type="text/css">
.col-centered {
    display:inline-block;
    float:none;
    text-align:left;
    margin-right:-4px;
}
.row-centered {
	margin-left: 9px;
	margin-right: 9px;
}

#preloader {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: rgba(255,255,255,0.7) url(loadingpaypal.gif) no-repeat center center;
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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/bootstrap-min.js"></script>
<script src="js/bootstrap-formhelpers-min.js"></script>
<script type="text/javascript" src="js/bootstrapValidator-min.js"></script>
<script type="text/javascript" src="ufcValidator.js"></script>
<script type="text/javascript" src="globalpay.js"></script>
 <script>
   
    function submitGlobalForm() {
		document.getElementById("formglobal").submit();
    }
  </script>
<link rel="stylesheet" type="text/css" href="css/css.css">
</head>
<body onLoad="submitGlobalForm();">

 <div id="preloader"></div>
 <h3>Payment Processing................................</h3>
 
<form id="formglobal" method="post" action="<?=$submiturl?>">

  <input type="hidden" id="MerchantId" name="MerchantId" value="<?=$MerchantId?>" >
  <input type="hidden" id="MerchantName" name="MerchantName" value="<?=$MerchantType?>" >
  <input type="hidden" id="MerchantType" name="MerchantType" value="<?=$MerchantName?>" >
  <input type="hidden" id="CurrencyCode" name="CurrencyCode" value="<?=$CurrencyCode?>" >
  <input type="hidden" id="ApprovedUrl" name="ApprovedUrl" value="<?=$ApprovedUrl?>" >
  <input type="hidden" id="DeclinedUrl" name="DeclinedUrl" value="<?=$DeclinedUrl?>" >
  <input type="hidden" id="CancelUrl" name="CancelUrl" value="<?=$CancelUrl?>" >
  <input type="hidden" id="ResponsePostUrl" name="ResponsePostUrl" value="" >
  <input type="hidden" id="UseCustomField1" name="UseCustomField1" value="1" >
  <input type="hidden" id="CustomField1Label" name="CustomField1Label" value="Custom1" >
  <input type="hidden" id="CustomField1Value" name="CustomField1Value" value="Value1" >
  <input type="hidden" id="UseCustomField2" name="UseCustomField2" value="1" >
  <input type="hidden" id="CustomField2Label" name="CustomField2Label" value="Custom2" >
  <input type="hidden" id="CustomField2Value" name="CustomField2Value" value="Value2" >
  <input type="hidden" id="AuthHash" name="AuthHash" value="<?=$AuthHash?>" >
  <input type="hidden" name="OrderNumber"	value="<?=$OrderNumber?>"	 >
  <input type="hidden" name="Amount"	value="<?=$Amount?>"	 >
  <input type="hidden" name="ITBIS"	value="<?=$Tax?>"	 >
</form>
</body>

</html>
