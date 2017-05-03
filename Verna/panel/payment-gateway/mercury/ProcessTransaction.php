<?php 
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
?>
<html>
    <head>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>

<script type="text/javascript">
jQuery(document).ready(function($) {
// site preloader -- also uncomment the div in the header and the css style for #preloader
$(window).load(function(){
$('#preloader').fadeOut('slow',function(){$(this).remove();});
});

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
   
   <body >
  	 <div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>



</body>
</html>
<?php
require('../../config.php');
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

$id=$_REQUEST['id'];

pg_prepare($link,'sqlipn0','SELECT * FROM w_orders WHERE id = $1;');
$search = pg_execute($link,'sqlipn0',array($id));
$fetchData = pg_fetch_array($search);
// echo "<pre>";
// print_r($fetchData['data']);
$data=json_decode($fetchData['data']);

$bu=$data->business[0]->id;
$acno=$data->buyer->mercury_acno;
$exdmm=$data->buyer->mercury_exmm;
$exdyy=$data->buyer->mercury_exyy;
$total=$data->total;


/**************************/
pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
$row2 = pg_fetch_array($result2);
$panelsetting = $row2['value'];

pg_prepare($link,'sqlipn1','SELECT * FROM w_business WHERE id = $1;');
$search1 = pg_execute($link,'sqlipn1',array($bu));
$fetchData1 = pg_fetch_array($search1);

if($panelsetting == 1){	
$mercury_id = $fetchData1['mercury_id'];
$mercury_pass = $fetchData1['mercury_pass'];
}else{
	if($fetchData1['mercury_id'] =="" || $fetchData1['mercury_pass'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			
			pg_prepare($link,'sql2pay'.$bu,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$bu,array($bu,7));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='mercury_id'){
					$mercury_id = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='mercury_pass'){
					$mercury_pass = $cre->value;
					$flag=false;
				}					
			}
			
		if($flag==true){
			//all
				$result3 = pg_execute($link,'sql2payall',array($all,7));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='mercury_id'){
					$mercury_id = $creall->value;
				}
				if($creall->paymentfield =='mercury_pass'){
					$mercury_pass = $creall->value;
				}
							
				
			}
			
		}
			
		}else{
			//all
				$result3 = pg_execute($link,'sql2payall',array($all,7));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='mercury_id'){
					$mercury_id = $creall->value;
				}
				if($creall->paymentfield =='mercury_pass'){
					$mercury_pass = $creall->value;
				}
							
				
			}	
				
		}
			
		}else{
			$mercury_id = $fetchData1['mercury_id'];
			$mercury_pass = $fetchData1['mercury_pass'];
		}
	
	
}



// STEP 1: Build the request array
$requestData = array
(
		/*"MerchantID" => $_REQUEST["MerchantID"],
		"LaneID" => $_REQUEST["02"],
		"TranType" => $_REQUEST["TranType"],
		"TranCode" => $_REQUEST["TranCode"],
		"InvoiceNo" => $_REQUEST["InvoiceNo"],
		"RefNo" => $_REQUEST["RefNo"],
		"AcctNo" => $_REQUEST["AcctNo"],
		"ExpDate" => $_REQUEST["ExpDate"],
		"Memo" => $_REQUEST["Memo"],
		"Purchase" => $_REQUEST["Purchase"]*/
		
		"MerchantID" => $mercury_id,
		"LaneID" => $_REQUEST["02"], 
		"TranType" => 'Credit',
		"TranCode" => 'Sale',
		"InvoiceNo" => '12345',
		"RefNo" => '12345',
		"AcctNo" => $acno,
		"ExpDate" => $exdmm.$exdyy,
		"Memo" => 'Testing WebServices PHP',
		"Purchase" => $total
);

// STEP 2: Use helper class to process the MercuryGift Web Services transaction
include_once("Mercury_Web_Services_SOAP_Helper.php");
$soapHelper = new Mercury_Web_Services_SOAP_Helper();
if ($requestData["TranType"] == "PrePaid")
{
	$responseData = $soapHelper->gift_transaction($requestData, $mercury_pass);
}
else 
{
	// Add Token request keys for Credit Transactions
	$requestData["Frequency"] = "OneTime";
	$requestData["RecordNo"] = "RecordNumberRequested";
	$responseData = $soapHelper->credit_transaction($requestData, $mercury_pass);
}

//echo "<h2>Request Data</h2>";
//print_r($requestData);

// STEP 3: Read parsed response to check for approval
if ($responseData["CmdStatus"] <> ""
		&& $responseData["CmdStatus"] == "Approved")
{
	$AuthCode = $responseData['AuthCode'];
	echo "<script>window.location='mercury_return.php?id=$id&AuthCode=$AuthCode'</script>";
	break;
					
	/*echo "<font color=\"green\">";
	echo "<h2>Approved Response Data</h2>";
	print_r($responseData);
	echo "</font>";*/
}
else
{
	echo "<font color=\"red\">";
	echo "<h2>Declined/Error Response Data</h2>";
	print_r($responseData);
	echo "</font>";
}

?>
