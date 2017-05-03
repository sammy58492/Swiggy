<?php
error_reporting(0);
session_start();
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

$id = $_REQUEST["id"];

require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sqlmakse12','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlmakse12',array($id));
	$fetchData = pg_fetch_array($search);
	$data=json_decode($fetchData['data']);
	//echo "<pre>";
   // print_r($data);
	$total=$data->total;
	//$total = 1.00;
	$businessid = $data->business[0]->id;
	
	
	/**************************/
	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	
		
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
	
	if($panelsetting == 1){	
	
		$paynl_pay = $bData['paynl_pay'];
		$paynl_apitoken = $bData['paynl_apitoken'];
		$paynl_serviceid = $bData['paynl_serviceid'];
		
		
	}else{
	
	if(empty($bData['paynl_pay'])|| empty($bData['paynl_apitoken']) || empty($bData['paynl_serviceid'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,25));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='paynl_pay'){
					$paynl_pay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='paynl_apitoken'){
					$paynl_apitoken = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='paynl_serviceid'){
					$paynl_serviceid = $cre->value;
					$flag=false;
				}
				
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,25));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='paynl_pay'){
					$paynl_pay = $creall->value;
				}
				if($creall->paymentfield =='paynl_apitoken'){
					$paynl_apitoken = $creall->value;
				}
				if($creall->paymentfield =='paynl_serviceid'){
					$paynl_serviceid = $creall->value;
				}
				
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,25));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='paynl_pay'){
					$paynl_pay = $creall->value;
				}
				if($creall->paymentfield =='paynl_apitoken'){
					$paynl_apitoken = $creall->value;
				}
				if($creall->paymentfield =='paynl_serviceid'){
					$paynl_serviceid = $creall->value;
				}
				
			
				
							
			}
				
			}
		}else{		
			
			$paynl_pay = $bData['paynl_pay'];
			$paynl_apitoken = $bData['paynl_apitoken'];
			$paynl_serviceid = $bData['paynl_serviceid'];
			
		}	
		
	}
	
?>
<?php
//echo $paynl_apitoken;
//echo $paynl_serviceid;
require_once 'vendor/autoload.php';

\Paynl\Config::setApiToken('e41f83b246b706291ea9ad798ccfd9f0fee5e0ab');
\Paynl\Config::setServiceId('SL-3490-4320');

$strUrl = 'https://rest-api.pay.nl/v5/Transaction/start/json?';
 
//# Add arguments
$arrArguments['token'] = '4830f1a5be689901d095ab8af595a9839ce7adb3';
$arrArguments['serviceId'] = 'SL-7378-6230';
$arrArguments['amount'] = $total*100;
$arrArguments['paymentMethod'] = '706';
$arrArguments['ipAddress'] = '75.126.173.142';
$arrArguments['finishUrl'] = 'http://'.$_SERVER["HTTP_HOST"].'/panel/payment-gateway/paynl/success.php?id='.$id;
$arrArguments['transaction']['description'] = 'Order Id '.$id;
 
//# Prepare and call API URL
$strUrl .= http_build_query($arrArguments);
$jsonResult = file_get_contents($strUrl);
//print_r($jsonResult);
$data = json_decode($jsonResult);
$data = (array)$data;
$transaction = (array)$data['transaction'];
$data = $transaction['paymentURL'];
//echo $data;
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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/bootstrap-min.js"></script>
<script src="js/bootstrap-formhelpers-min.js"></script>
<script type="text/javascript" src="js/bootstrapValidator-min.js"></script>



<link rel="stylesheet" type="text/css" href="css/css.css">
</head>
<body>

 <div id="preloader"></div>
 <h3><?= $lang_resource['PAYMENT_GATEWAY_ALL_PAYMENT_PROCESSING'] ?></h3>
<script>
window.location.href = "<?=$data?>"
</script>

</body>

</html>
