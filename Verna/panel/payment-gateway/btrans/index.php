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
		$btrans_pay = $bData['btrans_pay'];
		$btrans_merchantname = $bData['btrans_merchantname'];
		$btrans_merchantnumber = $bData['btrans_merchantnumber'];
		$btrans_merchanttype = $bData['btrans_merchanttype'];
		$btrans_merchantterminal = $bData['btrans_merchantterminal'];
		
		
	}else{
	
	if(empty($bData['btrans_merchantname'])|| empty($bData['btrans_merchantnumber']) || empty($bData['btrans_merchanttype']) || empty($bData['btrans_merchantterminal'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall1','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay1'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay1'.$businessid,array($businessid,11));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='btrans_pay'){
					$btrans_pay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='btrans_merchantname'){
					$btrans_merchantname = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='btrans_merchantnumber'){
					$btrans_merchantnumber = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='btrans_merchanttype'){
					$btrans_merchanttype = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='btrans_merchantterminal'){
					$btrans_merchantterminal = $cre->value;
					$flag=false;
				}
				
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,11));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='btrans_pay'){
					$btrans_pay = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchantname'){
					$btrans_merchantname = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchantnumber'){
					$btrans_merchantnumber = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchanttype'){
					$btrans_merchanttype = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchantterminal'){
					$btrans_merchantterminal = $creall->value;
				}
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,11));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='btrans_pay'){
					$btrans_pay = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchantname'){
					$btrans_merchantname = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchantnumber'){
					$btrans_merchantnumber = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchanttype'){
					$btrans_merchanttype = $creall->value;
				}
				if($creall->paymentfield =='btrans_merchantterminal'){
					$btrans_merchantterminal = $creall->value;
				}
			
				
							
			}
				
			}
		}else{		
			$btrans_pay = $bData['btrans_pay'];
			$btrans_merchantname = $bData['btrans_merchantname'];
			$btrans_merchantnumber = $bData['btrans_merchantnumber'];
			$btrans_merchanttype = $bData['btrans_merchanttype'];
			$btrans_merchantterminal = $bData['btrans_merchantterminal'];
		}	
		
	}

	
?>
<?php
if($btrans_pay=='0')
{
		$submiturl='https://cert.btrans.evertecinc.com/postwebbtrans/amexpostlog.php';
}
else
{
		$submiturl='https://btrans.evertecinc.com/postwebbtrans/post.php';
}
$total=$total*100;
$strlen = strlen($total);
$negtival = 12-$strlen;
$str= '000000000000';
$total1 =  substr($str,-$negtival);
$total = $total1.$total;
$MerchantType =$btrans_merchanttype;
$MerchantNumber = $btrans_merchantnumber;
$MerchantTerminal =$btrans_merchantterminal;
$TransactionId = date('ymd');
$Amount =$total;
$Tax = "000000000000";
$KeyEncriptionKey = md5($MerchantType.$MerchantNumber.$MerchantTerminal.$TransactionId.$Amount.$Tax);
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

<p><input name="TransactionType" value="0200" type="hidden"></p>	
<p><input name="CurrencyCode"	value="214"	type="hidden"></p>	
<p><input name="AcquiringInstitutionCode"	value="349"	type="hidden"></p>	
<p><input name="MerchantType"	value="<?=$MerchantType?>"	type="hidden"></p>	
<p><input name="MerchantNumber"	value="<?=$MerchantNumber?>"	type="hidden"></p>	
<p><input name='MerchantNumber_amex'	Value='000009378594379' type="hidden"></p>	
<p><input name="MerchantTerminal"	value="<?=$MerchantTerminal?>"	type="hidden"></p>	
<p><input name='MerchantTerminal_amex'	Value='WEB00001'	type="hidden"></p>	
<p><input name="ReturnUrl"	value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/btrans/success.php?id=<?=$id?>"	type="hidden"></p>	
<p><input name="CancelUrl"	value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/btrans/failure.php?id=<?=$id?>"	type="hidden"></p>	
<p><input name="PageLanguaje"	value="ENG"	type="hidden"></p>	
<p></p>	
<p></p>	
<p></p>	
<p></p>	
<p><input name="MerchantName"	value="<?=$btrans_merchantname?>"	type="hidden"></p>	
<p><input name="KeyEncriptionKey"	value="<?=$KeyEncriptionKey?>"	type="hidden"></p>	
<p><input name="Ipclient"	value="10.199.999.999"	type="hidden"></p>	
<p></p>			
				
<table width="450" border="0" cellpadding="1" >
	<tr>
    <td colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td></td>
    <td><input name="OrdenId"	value="<?=$id?>"	type="hidden" readonly="readonly"></td>
  </tr>
  <tr>
    <td></td>
    <td><input name="TransactionId"	value="<?=$TransactionId?>"	type="hidden" readonly="readonly"></td>
  </tr>
  <tr>
    <td></td>
    <td><input name="Amount"	value="<?=$Amount?>"	type="hidden" readonly="readonly"></td>
  </tr>
  <tr>
    <td></td>
    <td><input name="Tax"	value="<?=$Tax?>"	type="hidden" readonly="readonly"></td>
  </tr>
  <tr>
    <td></td>
    <td><!--<input value="Pay Now" name="" type="submit">--></td>
  </tr>
</table>
 
</form>
</body>

</html>
