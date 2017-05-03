<?php
error_reporting(E_ERROR | E_PARSE);
$oid = $_REQUEST['id'];
function ConnectDB($CFG = 'empty')
{
	if ($CFG=='empty')
		require('../../../../config.php');
		
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
}
function parse($str)
	{
	//return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and  forward
	}
/*
 * Use the Pay API operation to transfer funds from a sender’s PayPal account to one or more receivers’ PayPal accounts. You can use the Pay API operation to make simple payments, chained payments, or parallel payments; these payments can be explicitly approved, preapproved, or implicitly approved.

 Use the Pay API operation to transfer funds from a sender's PayPal account to one or more receivers' PayPal accounts. You can use the Pay API operation to make simple payments, chained payments, or parallel payments; these payments can be explicitly approved, preapproved, or implicitly approved. 

 Parallel payments are useful in cases when a buyer intends to make a single payment for items from multiple sellers. Examples include the following scenarios:

    a single payment for multiple items from different merchants, such as a combination of items in your inventory and items that partners drop ship for you.
    purchases of items related to an event, such as a trip that requires airfare, car rental, and a hotel booking.
 
 * Create your PayRequest message by setting the common fields. If you want more than a simple payment, add fields for the specific kind of request, which include parallel payments, chained payments, implicit payments, and preapproved payments.
 */
require_once('../PPBootStrap.php');
require_once('../Common/Constants.php');
define("DEFAULT_SELECT", "- Select -");

$link = ConnectDB();
/*Fetch email from config settings */
pg_prepare($link,'sql','SELECT value FROM w_configs WHERE name=$1');
$result = pg_execute($link,'sql',array('semail'));
$row = pg_fetch_array($result);

/*Fetch order details  total, tax, business id */
pg_prepare($link,'sql1','SELECT * FROM w_orders WHERE id=$1');
$result1 = pg_execute($link,'sql1',array($oid));
$row1 = pg_fetch_array($result1);
$data=parse($row1['data']);

$shipping = $data->business[0]->shipping;
if($data->buyer->taxtype == 1){
    $tax = $data->tax;	
}else{
	$tax = 0;	
}

$total = $data->total - $tax - $shipping;
$totalwithtax = $data->total - $shipping ;



$businessid = $data->business[0]->id;
	
pg_prepare($link,'sqlipn2','SELECT * FROM w_business WHERE id = $1;');
$searchs = pg_execute($link,'sqlipn2',array($businessid));
$bData = pg_fetch_array($searchs);

//select currency code for business city
$cityID = $bData['city'];
pg_prepare($link,'sqlccbc','SELECT currency FROM w_franchises WHERE id = $1;');
$currency_sql = pg_execute($link,'sqlccbc',array($cityID));

$currency_arry = pg_fetch_array($currency_sql);
$cityCurrency = $currency_arry[0];
 

/*Fetch Splitpaymain */
pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
$row2 = pg_fetch_array($result2);
$panelsetting = $row2['value'];

/****For Configs data********/
pg_prepare($link,'sqlcom_per','SELECT value FROM w_configs WHERE name=$1');
$resultcom_per = pg_execute($link,'sqlcom_per',array('com_per'));

pg_prepare($link,'sq','SELECT value FROM w_configs WHERE name=$1');
$re = pg_execute($link,'sq',array('com_rate'));

pg_prepare($link,'sqltax','SELECT value FROM w_configs WHERE name=$1');
$resulttax = pg_execute($link,'sqltax',array('tax'));

pg_prepare($link,'sqlcustom','SELECT value FROM w_configs WHERE name=$1');
$resultcustom = pg_execute($link,'sqlcustom',array('custom'));
/****For Configs data********/

pg_prepare($link,'sql2','SELECT * FROM w_splitpaymain WHERE bus_id=$1');
$result2 = pg_execute($link,'sql2',array($data->business[0]->id));
$row2 = pg_fetch_array($result2);


if($panelsetting == 1){	
$payadaptivemail = $row2['payadaptivemail'];
if($row2['splitcase'] == 2){
	$com_per = $row2['com_per'];
	$com_rate = $row2['com_rate'];
	$custom = $row2['custom'];
	$taxs = $row2['tax'];
	if($row2['tax'] == 0)
		$taxinclude = 0;
	if($row2['tax'] == 1)
		$taxinclude = $tax;
	if($row2['tax'] == 2)
		$taxinclude =($totalwithtax * $custom)/100;
}
if($row2['splitcase'] == 1){
	$rowcom_per = pg_fetch_array($resultcom_per);
	$com_per = $rowcom_per['value'];

	$ro = pg_fetch_array($re);
	$com_rate = $ro['value'];

	$rowtax = pg_fetch_array($resulttax);
	$taxs = $rowtax['value'];

	$rowcustom = pg_fetch_array($resultcustom);
	$custom = $rowcustom['value'];
	
	if($rowtax['value'] == 0)
		$taxinclude = 0;
	if($rowtax['value'] == 1)
		$taxinclude = $tax;
	if($rowtax['value'] == 2)
		 $taxinclude =($totalwithtax * $custom)/100;
}
}else{
	// For Credential
	if($row2['payadaptivemail']==""){
		
		$all = "-1";
		pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
		pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
		$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,4));
		
		if(pg_num_rows($result2)>0){
			
			$row = pg_fetch_array($result2);		
			$credential = parse($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='payadaptivemail'){
					$payadaptivemail = $cre->value;
				}
				if($cre->paymentfield =='splitcase'){
					$splitcase = $cre->value;
				}
				if($cre->paymentfield =='com_per'){
				$com_per = $cre->value;
				}
				if($cre->paymentfield =='com_rate'){
				$com_rate = $cre->value;
				}
				if($cre->paymentfield =='custom'){
				$custom = $cre->value;
				}
				if($cre->paymentfield =='tax'){
				$taxs = $cre->value;
				}
				
			}
				if($splitcase==2){					
					if($taxs == 0)
					$taxinclude = 0;
					if($taxs == 1)
					$taxinclude = $tax;
					if($taxs == 2)
					$taxinclude =($totalwithtax * $custom)/100;	
				}
				if($splitcase == 1){
				$rowcom_per = pg_fetch_array($resultcom_per);
				$com_per = $rowcom_per['value'];
				
				$ro = pg_fetch_array($re);
				$com_rate = $ro['value'];
				
				$rowtax = pg_fetch_array($resulttax);
				$taxs = $rowtax['value'];
				
				$rowcustom = pg_fetch_array($resultcustom);
				$custom = $rowcustom['value'];
				
				if($rowtax['value'] == 0)
					$taxinclude = 0;
				if($rowtax['value'] == 1)
					$taxinclude = $tax;
				if($rowtax['value'] == 2)
					 $taxinclude =($totalwithtax * $custom)/100;
				}
				
								
			
			
		}else{
				
			//all
				$result3 = pg_execute($link,'sql2payall',array($all,4));
				$row2 = pg_fetch_array($result3);			
				$credentialall = parse($row2['credential']);
				
				foreach($credentialall as $creall){
					if($creall->paymentfield =='payadaptivemail'){
						$payadaptivemail = $creall->value;
					}
					if($creall->paymentfield =='splitcase'){
						$splitcase = $creall->value;
					}
				}
				if($splitcase==2){
					
				if($creall->paymentfield =='com_per'){
				$com_per = $creall->value;
				}
				if($creall->paymentfield =='com_rate'){
				$com_rate = $creall->value;
				}
				if($creall->paymentfield =='custom'){
				$custom = $creall->value;
				}
				if($creall->paymentfield =='tax'){
				$taxs = $creall->value;
				}
				if($taxs == 0)
				$taxinclude = 0;
				if($taxs == 1)
				$taxinclude = $tax;
				if($taxs == 2)
				$taxinclude =($totalwithtax * $custom)/100;

			}
			if($splitcase == 1){
				
				$rowcom_per = pg_fetch_array($resultcom_per);
				$com_per = $rowcom_per['value'];
				
				$ro = pg_fetch_array($re);
				$com_rate = $ro['value'];
				
				$rowtax = pg_fetch_array($resulttax);
				$taxs = $rowtax['value'];
				
				$rowcustom = pg_fetch_array($resultcustom);
				$custom = $rowcustom['value'];
				
				if($rowtax['value'] == 0)
					$taxinclude = 0;
				if($rowtax['value'] == 1)
					$taxinclude = $tax;
				if($rowtax['value'] == 2)
					 $taxinclude =($totalwithtax * $custom)/100;
				}
				
							
			
				
		}
		
		
	}else{
	$payadaptivemail = $row2['payadaptivemail'];
	if($row2['splitcase'] == 2){
	$com_per = $row2['com_per'];
	$com_rate = $row2['com_rate'];
	$custom = $row2['custom'];
	$taxs = $row2['tax'];
	if($row2['tax'] == 0)
		$taxinclude = 0;
	if($row2['tax'] == 1)
		$taxinclude = $tax;
	if($row2['tax'] == 2)
		$taxinclude =($totalwithtax * $custom)/100;
	}
	if($row2['splitcase'] == 1){
	$rowcom_per = pg_fetch_array($resultcom_per);
	$com_per = $rowcom_per['value'];

	$ro = pg_fetch_array($re);
	$com_rate = $ro['value'];

	$rowtax = pg_fetch_array($resulttax);
	$taxs = $rowtax['value'];

	$rowcustom = pg_fetch_array($resultcustom);
	$custom = $rowcustom['value'];
	
	if($rowtax['value'] == 0)
		$taxinclude = 0;
	if($rowtax['value'] == 1)
		$taxinclude = $tax;
	if($rowtax['value'] == 2)
		 $taxinclude =($totalwithtax * $custom)/100;
	}	
 }
	
	
}


/* taxs = 0 means no included tax */
if($taxs == 0){
	$adminamount = (($totalwithtax * $com_per)/100) + $com_rate;
	$businessamount = $totalwithtax - $adminamount + $shipping;
}


/* taxs = 1 means City tax included */
if($taxs == 1){
	$adminamount = (($total * $com_per)/100) + $com_rate + $taxinclude;
	$businessamount = $totalwithtax - $adminamount + $shipping;
}
/* taxs = 2 means custom tax included */
if($taxs == 2){
	$adminamount = (($totalwithtax * $com_per)/100) + $com_rate + $taxinclude;
	$businessamount = $totalwithtax - $adminamount + $shipping;
}

$data->buyer->adminamount = round($adminamount, 2);
$data->buyer->businessamount = round($businessamount, 2);
$data = json_encode($data);
pg_prepare($link,'sqld2','update w_orders set data=$2 where id=$1');
$fetch_insert = pg_execute($link,'sqld2',array($oid,$data));


/*Admin*/		 
$_POST['receiverEmail'][0]=$row['value'];
$_POST['receiverAmount'][0]=round($adminamount, 2);
$_POST['primaryReceiver'][0]="false";
/*Business*/
$_POST['receiverEmail'][1]=$payadaptivemail;
$_POST['receiverAmount'][1]=round($businessamount, 2);
//$_POST['receiverAmount'][1]=2.0;
$_POST['primaryReceiver'][1]="false";

$_POST['actionType']="PAY";
$_POST['cancelUrl']="http://".$_SERVER["HTTP_HOST"]."";
$_POST['currencyCode']=$cityCurrency;
$_POST['returnUrl']="http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/paypaladaptive/paypaladaptive_return.php?id=$oid";
$_POST['ipnNotificationUrl']="http://".$_SERVER["HTTP_HOST"]."panel/payment-gateway/paypaladaptive/paypaladaptive_return.php";


//print_r($_POST);exit;


if(isset($_POST['receiverEmail'])) {
	$receiver = array();
	/*
	 * A receiver's email address 
	 */
	for($i=0; $i<count($_POST['receiverEmail']); $i++) {
		$receiver[$i] = new Receiver();
		$receiver[$i]->email = $_POST['receiverEmail'][$i];
		/*
		 *  	Amount to be credited to the receiver's account 
		 */
		$receiver[$i]->amount = $_POST['receiverAmount'][$i];
		/*
		 * Set to true to indicate a chained payment; only one receiver can be a primary receiver. Omit this field, or set it to false for simple and parallel payments. 
		 */
		$receiver[$i]->primary = $_POST['primaryReceiver'][$i];

	}
	$receiverList = new ReceiverList($receiver);
}
/*print_r($receiverList);*/
/*
 * The action for this request. Possible values are:

    PAY – Use this option if you are not using the Pay request in combination with ExecutePayment.
    CREATE – Use this option to set up the payment instructions with SetPaymentOptions and then execute the payment at a later time with the ExecutePayment.
    PAY_PRIMARY – For chained payments only, specify this value to delay payments to the secondary receivers; only the payment to the primary receiver is processed.

 */
/*
 * The code for the currency in which the payment is made; you can specify only one currency, regardless of the number of receivers 
 */
/*
 * URL to redirect the sender's browser to after canceling the approval for a payment; it is always required but only used for payments that require approval (explicit payments) 
 */
/*
 * URL to redirect the sender's browser to after the sender has logged into PayPal and approved a payment; it is always required but only used if a payment requires explicit approval 
 */
$payRequest = new PayRequest(new RequestEnvelope("en_US"), $_POST['actionType'], $_POST['cancelUrl'], $_POST['currencyCode'], $receiverList, $_POST['returnUrl']);
// Add optional params

if($_POST["memo"] != "") {
	$payRequest->memo = $_POST["memo"];
}


/*
 * 	 ## Creating service wrapper object
Creating service wrapper object to make API call and loading
Configuration::getAcctAndConfig() returns array that contains credential and config parameters
 */
$service = new AdaptivePaymentsService(Configuration::getAcctAndConfig());

try {
	/* wrap API method calls on the service object with a try catch */
	$response = $service->Pay($payRequest);
} catch(Exception $ex) {
	require_once '../Common/Error.php';
	exit;
}

/* Make the call to PayPal to get the Pay token
 If the API call succeded, then redirect the buyer to PayPal
to begin to authorize payment.  If an error occured, show the
resulting errors */


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<title>PayPal Adaptive Payments - Parallel Pay Response</title>
<link href="../Common/sdk.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../Common/tooltip.js">
    </script>
    
    
    
</head>

<body>	
	<div id="wrapper">
		<!--<img src="https://devtools-paypal.com/image/bdg_payments_by_pp_2line.png"/>-->
		<div id="response_form">
			<!--<h3>Pay - Response</h3>		-->	
            

<style>
#circularG{
position:relative;
width:128px;
height:128px;
margin:0 auto;
}

.circularG{
position:absolute;
background-color:#39E3D5;
width:29px;
height:29px;
-moz-border-radius:19px;
-moz-animation-name:bounce_circularG;
-moz-animation-duration:1.04s;
-moz-animation-iteration-count:infinite;
-moz-animation-direction:linear;
-webkit-border-radius:19px;
-webkit-animation-name:bounce_circularG;
-webkit-animation-duration:1.04s;
-webkit-animation-iteration-count:infinite;
-webkit-animation-direction:linear;
-ms-border-radius:19px;
-ms-animation-name:bounce_circularG;
-ms-animation-duration:1.04s;
-ms-animation-iteration-count:infinite;
-ms-animation-direction:linear;
-o-border-radius:19px;
-o-animation-name:bounce_circularG;
-o-animation-duration:1.04s;
-o-animation-iteration-count:infinite;
-o-animation-direction:linear;
border-radius:19px;
animation-name:bounce_circularG;
animation-duration:1.04s;
animation-iteration-count:infinite;
animation-direction:linear;
}

#circularG_1{
left:0;
top:50px;
-moz-animation-delay:0.39s;
-webkit-animation-delay:0.39s;
-ms-animation-delay:0.39s;
-o-animation-delay:0.39s;
animation-delay:0.39s;
}

#circularG_2{
left:14px;
top:14px;
-moz-animation-delay:0.52s;
-webkit-animation-delay:0.52s;
-ms-animation-delay:0.52s;
-o-animation-delay:0.52s;
animation-delay:0.52s;
}

#circularG_3{
top:0;
left:50px;
-moz-animation-delay:0.65s;
-webkit-animation-delay:0.65s;
-ms-animation-delay:0.65s;
-o-animation-delay:0.65s;
animation-delay:0.65s;
}

#circularG_4{
right:14px;
top:14px;
-moz-animation-delay:0.78s;
-webkit-animation-delay:0.78s;
-ms-animation-delay:0.78s;
-o-animation-delay:0.78s;
animation-delay:0.78s;
}

#circularG_5{
right:0;
top:50px;
-moz-animation-delay:0.91s;
-webkit-animation-delay:0.91s;
-ms-animation-delay:0.91s;
-o-animation-delay:0.91s;
animation-delay:0.91s;
}

#circularG_6{
right:14px;
bottom:14px;
-moz-animation-delay:1.04s;
-webkit-animation-delay:1.04s;
-ms-animation-delay:1.04s;
-o-animation-delay:1.04s;
animation-delay:1.04s;
}

#circularG_7{
left:50px;
bottom:0;
-moz-animation-delay:1.17s;
-webkit-animation-delay:1.17s;
-ms-animation-delay:1.17s;
-o-animation-delay:1.17s;
animation-delay:1.17s;
}

#circularG_8{
left:14px;
bottom:14px;
-moz-animation-delay:1.3s;
-webkit-animation-delay:1.3s;
-ms-animation-delay:1.3s;
-o-animation-delay:1.3s;
animation-delay:1.3s;
}

@-moz-keyframes bounce_circularG{
0%{
-moz-transform:scale(1)}

100%{
-moz-transform:scale(.3)}

}

@-webkit-keyframes bounce_circularG{
0%{
-webkit-transform:scale(1)}

100%{
-webkit-transform:scale(.3)}

}

@-ms-keyframes bounce_circularG{
0%{
-ms-transform:scale(1)}

100%{
-ms-transform:scale(.3)}

}

@-o-keyframes bounce_circularG{
0%{
-o-transform:scale(1)}

100%{
-o-transform:scale(.3)}

}

@keyframes bounce_circularG{
0%{
transform:scale(1)}

100%{
transform:scale(.3)}

}

</style>
<div id="circularG">
<div id="circularG_1" class="circularG">
</div>
<div id="circularG_2" class="circularG">
</div>
<div id="circularG_3" class="circularG">
</div>
<div id="circularG_4" class="circularG">
</div>
<div id="circularG_5" class="circularG">
</div>
<div id="circularG_6" class="circularG">
</div>
<div id="circularG_7" class="circularG">
</div>
<div id="circularG_8" class="circularG">
</div>
</div>
            
<?php

//echo "payment processing.................";
$ack = strtoupper($response->responseEnvelope->ack);
if($ack != "SUCCESS") {
	echo "<b>Error </b>";
	echo "<pre>";
	echo "</pre>";
} else {
	$link = ConnectDB();
	pg_prepare($link,'sqlpay','SELECT value FROM w_configs WHERE name=$1');
	$resultp = pg_execute($link,'sqlpay',array('paymentmode'));
	$rowp = pg_fetch_array($resultp);
	if($rowp['value'] == 0){
		$paymode= PAYPAL_REDIRECT_URL;
	}else{
		$paymode= PAYPAL_REDIRECT_URL_LIVE;
	}
	$payKey = $response->payKey;
	$payPalURL = $paymode . '_ap-payment&paykey=' . $payKey;
	echo '<script>window.location="'.$payPalURL.'"</script>';
			/*echo "<table>";
			echo "<tr><td>Ack :</td><td><div id='Ack'>$ack</div> </td></tr>";
			echo "<tr><td>PayKey :</td><td><div id='PayKey'>$payKey</div> </td></tr>";
			echo "<tr><td><a href=$payPalURL><b>Redirect URL to Complete Payment </b></a></td></tr>";
			echo "</table>";
	echo "<pre>";
	print_r($response);
	echo "</pre>";	*/
}
echo $payPalURL;
require_once '../Common/Response.php';
?>
		</div>
	</div>
</body>
</html>
