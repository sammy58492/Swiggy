<?php
/*
'**********************************************************************
' D I S C L A I M E R
' WARNING: ANY USE BY YOU OF THE SAMPLE CODE PROVIDED IS AT YOUR OWN RISK.
' Transactium © provides this code "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and/or fitness for a particular purpose.
'**********************************************************************
*/
?>
<?php
	session_start();
	$id = $_REQUEST["id"];
	$_SESSION['order_id'] = $id;
	include('define.php');
	include('utils.php');

	

	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	
	pg_prepare($link,'sqlsecuretotal','SELECT * FROM w_orders WHERE id = $1;');
	$result1 = pg_execute($link,'sqlsecuretotal',array($id));
	$fetchdata1 = pg_fetch_array($result1);
	$totaldata=json_decode($fetchdata1['data']);

	$total=round($totaldata->total*100);
	
	// Check for previously active hpsid
	// This will only exist if use double clicks or opens two payments concurrently from the same browser
	$hpsid = $_SESSION['hpsid'];
	
	// If HPSID existed in session then check status.
	if (!empty($hpsid))
	{
		try
		{
			$hp = new CTransactiumHPP(USERNAME,PASSWORD);
			$payment = $hp->GetHostedPayment($_SESSION["hpsid"]);

			// If status is not one of the expected types for a payment in progress then clean all variables to create a new payment.
			if ($payment->GetHostedPaymentResult->Status != "InProgress" && $payment->GetHostedPaymentResult->Status != "Pending")
			{
				$hpsid = "";
				$_SESSION['hpsid'] = "";
				$_SESSION['HPSURL'] = "";
			}
		}
		catch (Exception $e)
		{
				//If exception occurs, then one should log and investigate it
				//it is beyond this example to determine what should be logged and how
				throw $e;
		} 
	}
	
	// Create a new Hosted Payment if required.
	try
	{
		if (empty($hpsid))
		{
			//DO NOT MODIFY TIMEZONE - THIS IS TRANSACTIUM'S TIME ZONE
			//$date=TransactionData::now();
	
			//ADD 5 minutes to compute valid until
			//$date->add(new DateInterval("PT5M"));
			//$validuntil=$date->format('Y-m-d\TH:i:s');
			date_default_timezone_set('GMT');
			$da = date('Y-m-d\TH:i:s', time());

			//echo 'date->'.$da;

			$date=date_create($da, timezone_open("GMT"));
			date_modify($date,"+5 min");			
			$validuntil = date_format($date,"Y-m-d\TH:i:s");

			//echo 'valid->'. $validuntil;
		
			
			$params=array('URLs'=>array(
							//Please NOTE: whilst Approved and Declined URL will WORK for localhost, PushURL has to be a fully qualified, resolvable URL, using HTTP or HTTPS and on port 80 / 443
							// Only TRUE SSL certificates are supported, dummy certificates wil not be accepted.
									'ApprovedURL'=>BASE.'end.php?id='.$_REQUEST["id"].'',
									'DeclinedURL'=>BASE.'end.php?id='.$_REQUEST["id"].'',
									),
							'Appearance'=>array(
									// 'LanguageCode' => "", //hosted payment frame language code if specific one required
									'SkinFolder' => "takeout"
									),
							'Client'=>array(
									// 'CardHolderName' => "", //If the cardholder name is known enter it here
									// 'ClientReference' => "", //client reference SUGGEST TO USE CLIENT ID / EMAIL ADDRESS or HASH of them
									// 'OrderReference' => "", //order reference SUGGEST TO USE INVOICE / ORDER NUMBER or HASH
									'ClientIPRestriction' => $_SERVER['REMOTE_ADDR'] //customer IP
									),
							'Billing'=>array(
									// 'CountryCode' => "MT", //customer billing country code
									// 'Email' => "" //customer email address
							),
							'Customer'=>array(),
							'Shipping'=>array(),
							'Behaviour'=>array(
									'ReceiptPage'=>'1',//Whether or not to provide a standard Transactium receipt page after the transaction process has completed
									'ErrorPage'=>'1',//Whether or not to provie a standard Transactium error page in the case that an error occurs
									'DynamicAmount'=>'Fixed',//Whether or not the end user is allowed to change the transaction amount
									'ProcessWithFixedCard'=>'0',//See documentation for proper usage of this - typically False
									'ProcessWithSavePI'=>'0',//See documentation for proper usage of this - typically False
									'ProcessWithRandomCode'=>'0',//See documentation for proper usage of this - this is ONLY available on SELECTED acquirers.
									//Uncomment to use previous payments
									/*'PreviousPayments'=> new SoapVar(
										array(
											//Value & FriendlyName
											new SoapVar(array('Value' => 'DEV000XXXX'), SOAP_ENC_OBJECT, 'PaymentReference', 'http://transactium.com/HPP/', 'PreviousPaymentReference', 'http://transactium.com/HPP/') //PaymentReference or PaymentInstrument
										), 
										SOAP_ENC_OBJECT, null, 'http://transactium.com/HPP/', 'PreviousPayments'
									)*/
							),
							'Tag'=>TAG,
							'Currency'=>'EUR',
							'RequireAllApproved'=>'0',
							'ValidUntil'=>$validuntil,
							'TotalAmount'=>$total,
							'Type'=>'Sale');

			// Execute Request and Create new Hosted payment.
			$resp=new CTransactiumHPP(USERNAME,PASSWORD);
			$resp = $resp->CreateHostedPayment($params);

			//print_r($payment); //DEBUG ONLY
			$_SESSION['hpsid']=$resp->CreateHostedPaymentResult->ID;
			$_SESSION['HPSURL']=$resp->CreateHostedPaymentResult->URL;
		}
	}
	catch (SoapFault $e)
	{
		//this will work only in TRACE
		print_r($e);
		print_r($resp->__getLastRequest());
		throw $e;
	}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
	<head runat="server">
		<title>Merchant Test Shop</title>

        <link rel="stylesheet" type="text/css" href="css/css.css">
	</head>
	
	<body>
					
			
                    <div class="header">
		<div class="logo container">
			<a href="http://beta.orderingonlinesystem.com/"><img alt="TBC Bank" src="images/tbc-logo-1.png"></a>
		</div>
	</div> 
    <div class="main-header">
		<div class="main-header-left"></div>
		<div class="main-header-center container  geo">ENTER YOUR PAYMENT CARD DETAILS</div>
		<div class="main-header-right"><div class="merger"></div></div>
	</div>	
    <div class="main">
	    <div class="container">
		    <div class="main-content">                
				<div class="card-data">
				
					<!--SCRIPT 1 - SET HPS URL-->
					<script type="text/javascript">HPS_redirectUrl = "<?php echo ($_SESSION['HPSURL']); ?>";</script>
					<!--SCRIPT 2 - CALL JS FILE ON SERVER TO RENDER HPP IFRAME-->
					<script type="text/javascript" src="<?php echo (JSURL);?>" id="hpsscript"></script>
					<!--SCRIPT 3-->
					  
						  
				</div>	
            </div>
        </div>
    </div>
    <div class="main-footer">
		<div class="container">
			<a href="http://beta.orderingonlinesystem.com/">©2015 orderingonlinesystem</a>
		</div>
	</div>
	</body>
</html>
