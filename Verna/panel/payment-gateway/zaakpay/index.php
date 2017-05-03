<?php
 
session_start();
//global $lang_resource;
$id = $_REQUEST["id"];
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
		$zaakpay_pay = $bData['zaakpay_pay'];
		$zaakpay_merchantid = $bData['zaakpay_merchantid'];
		$zaakpay_secretkey = $bData['zaakpay_secretkey'];
		
		
		
	}else{
	
	if(empty($bData['zaakpay_pay'])|| empty($bData['zaakpay_merchantid']) || empty($bData['zaakpay_secretkey'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall1','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay1'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay1'.$businessid,array($businessid,26));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='zaakpay_pay'){
					$zaakpay_pay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='zaakpay_merchantid'){
					$zaakpay_merchantid = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='zaakpay_secretkey'){
					$zaakpay_secretkey = $cre->value;
					$flag=false;
				}
				
				
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,26));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='zaakpay_pay'){
					$zaakpay_pay = $creall->value;
				}
				if($creall->paymentfield =='zaakpay_merchantid'){
					$zaakpay_merchantid = $creall->value;
				}
				if($creall->paymentfield =='zaakpay_secretkey'){
					$zaakpay_secretkey = $creall->value;
				}
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,26));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='zaakpay_pay'){
					$zaakpay_pay = $creall->value;
				}
				if($creall->paymentfield =='zaakpay_merchantid'){
					$zaakpay_merchantid = $creall->value;
				}
				if($creall->paymentfield =='zaakpay_secretkey'){
					$zaakpay_secretkey = $creall->value;
				}
				
			
				
							
			}
				
			}
		}else{		
			$zaakpay_pay = $bData['zaakpay_pay'];
			$zaakpay_merchantid = $bData['zaakpay_merchantid'];
			$zaakpay_secretkey = $bData['zaakpay_secretkey'];
		}	
		
	}

	
?>
<?php

$total=$total*100;

?>	
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Secure Payment Form</title>

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




 <script>
   
    function submitGlobalForm() {
		document.getElementById("formglobal").submit();
    }
  </script>
  <script>



function submitForm(){
	var today = new Date();
	var dateString = String(today.getFullYear()).concat("-").concat(String(today.getMonth()+1)).concat("-").concat(String(today.getDate()));
	document.getElementById("txnDate").value= dateString;
			var form = document.forms[0];
			form.action = "posttozaakpay.php";
			form.submit();
			}
</script>

</head>
<body onLoad="submitForm();">

 <div id="preloader"></div>
 <h3><?=$lang_resource['PAYMENT_GATEWAY_ALL_PAYMENT_PROCESSING']?></h3>
 
<form action="posttozaakpay.php" method="post">

<input type="hidden" name="merchantIdentifier" value="<?=$zaakpay_merchantid?>" />
<input type="hidden" id="orderId" name="orderId" value="<?=$id?>" />
<input type="hidden" name="returnUrl" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/zaakpay/success.php?id=<?=$id?>" />
<input type="hidden" name="buyerEmail" value="<?php echo $data->buyer->email; ?>"  />
<input type="hidden" name="buyerFirstName" value="<?php echo $data->buyer->name; ?>" />
<input type="hidden" name="buyerLastName" value="<?php echo $data->buyer->lastname2; ?>" /> 
<input type="hidden" name="buyerAddress" value="<?php echo $data->buyer->address; ?>" />
<input type="hidden" name="buyerCity" value="<?php echo $data->buyer->cityname; ?>" />
<input type="hidden" name="buyerState" value="<?php echo $data->buyer->cityname; ?>" />
<input type="hidden" name="buyerCountry" value="India" />
<input type="hidden" name="buyerPincode" value="<?php echo $data->buyer->zipcode; ?>" />
<input type="hidden" name="buyerPhoneNumber" value="<?php echo $data->buyer->tel; ?>" />
<input type="hidden" name="txnType" value="1" />
<input type="hidden" name="zpPayOption" value="1" />
<input type="hidden" name="mode" value="<?=$zaakpay_pay?>" /> 
<input type="hidden" name="currency" value="INR" />
<input type="hidden" name="amount" value="<?=$total?>" />
<input type="hidden" name="merchantIpAddress" value="127.0.0.1" />
<input type="hidden" name="purpose" value="1" />
<input type="hidden" name="productDescription" value="<?php echo $data->business[1]->name; ?>" />
<input type="hidden" name="key" value="<?=$zaakpay_secretkey?>" />
<input type="hidden" name="txnDate" id="txnDate" />


</form>
</body>

</html>
