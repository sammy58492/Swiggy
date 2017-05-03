<?php
session_start();
require_once("Config.php");
require_once("CommonFunctions.php");

//XML Headers used in cURL - remember to change the function after thepaymentgateway.net in SOAPAction when changing the XML to call a different function
$headers = array(
			'SOAPAction:https://www.thepaymentgateway.net/CardDetailsTransaction',
			'Content-Type: text/xml; charset = utf-8',
			'Connection: close'
		);

$Amount = 1000; //Amount must be passed as an integer in pence
$CurrencyCode = "826"; //826 = GBP

$OrderID = $_POST['OrderID'];
$OrderDescription = "Order " . $OrderID; //Order Description for this new transaction

$CardName = stripGWInvalidChars($_POST['CardName']);
$CardNumber = $_POST['CardNumber'];
$ExpMonth = $_POST['ExpMonth'];
$ExpYear = $_POST['ExpYear'];
$CV2 = $_POST['CV2'];
$IssueNumber = $_POST['IssueNumber'];

$Address1 = stripGWInvalidChars($_POST['Address1']);
$Address2 = stripGWInvalidChars($_POST['Address2']);
$Address3 = stripGWInvalidChars($_POST['Address3']);
$Address4 = stripGWInvalidChars($_POST['Address4']);
$City = stripGWInvalidChars($_POST['City']);
$State = stripGWInvalidChars($_POST['State']);
$Postcode = stripGWInvalidChars($_POST['Postcode']);
$Country = stripGWInvalidChars($_POST['Country']);
$EmailAddress = stripGWInvalidChars($_POST['EmailAddress']);
$PhoneNumber = stripGWInvalidChars($_POST['PhoneNumber']);

$IPAddress = $_SERVER['REMOTE_ADDR'];

//XML to send to the Gateway. Clean it up and make sure it doesnt exceed the allowed limits
$xml = '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
<CardDetailsTransaction xmlns="https://www.thepaymentgateway.net/">
<PaymentMessage>
<MerchantAuthentication MerchantID="'. trim($MerchantID) .'" Password="'. trim($Password) .'" />
<TransactionDetails Amount="'. $Amount .'" CurrencyCode="'. $CurrencyCode .'">
<MessageDetails TransactionType="SALE" />
<OrderID>'. clean($OrderID, 50) .'</OrderID>
<OrderDescription>'. clean($OrderDescription, 256) . '</OrderDescription>
<TransactionControl>
<EchoCardType>TRUE</EchoCardType>
<EchoAVSCheckResult>TRUE</EchoAVSCheckResult>
<EchoCV2CheckResult>TRUE</EchoCV2CheckResult>
<EchoAmountReceived>TRUE</EchoAmountReceived>
<DuplicateDelay>20</DuplicateDelay>
<CustomVariables>
<GenericVariable Name="MyInputVariable" Value="Ping" />
</CustomVariables>
</TransactionControl>
</TransactionDetails>
<CardDetails>
<CardName>'. clean($CardName, 100) .'</CardName>
<CardNumber>'. $CardNumber .'</CardNumber>
<StartDate Month="" Year="" />
<ExpiryDate Month="'. $ExpMonth .'" Year="'. $ExpYear .'" />
<CV2>'. $CV2 .'</CV2>
<IssueNumber>'. $IssueNumber .'</IssueNumber>
</CardDetails>
<CustomerDetails>
<BillingAddress>
<Address1>'. clean($Address1, 100) .'</Address1>
<Address2>'. clean($Address2, 50) .'</Address2>
<Address3>'. clean($Address3, 50) .'</Address3>
<Address4>'. clean($Address4, 50) .'</Address4>
<City>'. clean($City, 50) .'</City>
<State>'. clean($State, 50) .'</State>
<PostCode>'. clean($Postcode, 50) .'</PostCode>
<CountryCode>'. $CountryCode .'</CountryCode>
</BillingAddress>
<EmailAddress>'. clean($EmailAddress, 100) .'</EmailAddress>
<PhoneNumber>'. clean($PhoneNumber, 30) .'</PhoneNumber>
<CustomerIPAddress>'. $IPAddress .'</CustomerIPAddress>
</CustomerDetails>
<PassOutData>Some data to be passed out</PassOutData>
</PaymentMessage>
</CardDetailsTransaction>
</soap:Body>
</soap:Envelope>';

$gwId = 1;
$domain = "cardsaveonlinepayments.com";
$port = "4430";
$transattempt = 1;
$soapSuccess = false;

//It will attempt each of the gateway servers (gw1, gw2 & gw3) 3 times each before totally failing
while(!$soapSuccess && $gwId <= 3 && $transattempt <= 3) {		
	
	//builds the URL to post to (rather than it being hard coded - means we can loop through all 3 gateway servers)
	$url = 'https://gw'.$gwId.'.'.$domain.':'.$port.'/';
	
	//initialise cURL
	$curl = curl_init();
	
	//set the options
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers); 
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $xml);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_ENCODING, 'UTF-8');
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	
	//Execute cURL request
	//$ret = returned XML
	$ret = curl_exec($curl);
	//$err = returned error number
	$err = curl_errno($curl);
	//retHead = returned XML header
	$retHead = curl_getinfo($curl);
	
	//close cURL connection
	curl_close($curl);
	$curl = null;
	
	//if no error returned
	if($err == 0) {
		//Get the status code
		$StatusCode = GetXMLValue("StatusCode", $ret, "[0-9]+");
		
		if(is_numeric($StatusCode)) {
			//request was processed correctly
			
			if( $StatusCode != 30 ) {
				//set success flag so it will not run the request again.
				$soapSuccess = true;
				
				//grab some of the most commonly used information from the response
				$szMessage = GetXMLValue("Message", $ret, ".+");
				$szAuthCode = GetXMLValue("AuthCode", $ret, ".+");
				$szCrossReference = GetCrossReference($ret);
				$szAddressNumericCheckResult = GetXMLValue("AddressNumericCheckResult", $ret, ".+");
				$szPostCodeCheckResult = GetXMLValue("PostCodeCheckResult", $ret, ".+");
				$szCV2CheckResult = GetXMLValue("CV2CheckResult", $ret, ".+");
				$szThreeDSecureAuthenticationCheckResult = GetXMLValue("ThreeDSecureAuthenticationCheckResult", $ret, ".+");				
								
				switch ($StatusCode) {				
					case 0:
						// transaction authorised
						$Response = "Transaction Sucessful: " . $szMessage;
						$Response .= "<BR>OrderID: " . $OrderID;
						$Response .= "<BR>AuthCode: " . $szAuthCode;
						$Response .= "<BR>CrossReference: " . $szCrossReference;
						break;			
					case 3:
						//3D Secure Auth required
						//Gather required variables
						$PaREQ = GetXMLValue("PaREQ", $ret, ".+");								
						$ACSURL = GetXMLValue("ACSURL", $ret, ".+");						
						$FormAction = $WebAddress . "/3DSecure.php";								
						$TermURL = $WebAddress . "/3DSecure-IFrame.php";								
						$Process3DSURL = $WebAddress . "/3DSecureProcess.php";
						
						//Set CardSave_Direct_OrderID Session variable, can be used to update order after 3DS.
						$_SESSION['CardSave_Direct_OrderID'] = $OrderID;
						
						$res =  '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">' .
						'<html><head>' .
						'<script type="text/javascript"> function OnLoadEvent() { document.form.submit(); }</script>' .
						'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' . 
						'<title>3D-Secure Redirect</title>' .             
						'</head>' . 
						'<body OnLoad="OnLoadEvent();">' .
						'<form name="form" action="' . $FormAction . '" method="POST" >' .
						'<input type="hidden" name="PaReq" value="' . $PaREQ . '"/>' .
						'<input type="hidden" name="MD" value="' . $szCrossReference . '"/>' .
						'<input type="hidden" name="TermUrl" value="' . $TermURL . '"/>' .
						'<input type="hidden" name="ACSURL" value="' . $ACSURL . '"/>' .
						'<input type="hidden" name="Process3DSURL" value="' . $Process3DSURL . '"/>' .
						'<noscript>' .
						'<center><p>Please click button below to Authenticate your card</p><input type="submit" value="' . $lang_resource['PAYMENT_GATEWAY_ALL_GO'] . '"/></p></center>' .
						'</noscript>' .
						'</form></body></html>';
						echo $res;
						break;
					case 4:
						//Card Referred - treat as a decline
						$Response = "Card Referred";
						break;
					case 5:
						//Card declined
						$Response = "Your payment was not successful.";
					
						if ($szAddressNumericCheckResult == "FAILED") {
							$Response .= "<br>Billing address check failed - Please check your billing address.";
						}
						
						if ($szPostCodeCheckResult == "FAILED") {
							$Response .= "<br>Billing postcode check failed - Please check your billing postcode.";
						}
						
						if ($szCV2CheckResult == "FAILED") {
							$Response .= "<br>The CV2 number you entered is incorrect.";
						}
						
						if ($szThreeDSecureAuthenticationCheckResult == "FAILED") {
							$Response .= "<br>Your bank declined the transaction due to Verified by Visa / MasterCard SecureCode.";
						}
						
						if ($szMessage == "Card declined" || $szMessage == "Card referred") {
							$Response .= "<br>Your bank declined the payment.";
						}
						break;
					case 20:
						//duplicate transaction - check PreviousTransactionResult for PreviousStatusCode & PreviousMessage
						$soapPreviousTransactionResult = null;
						$PreviousTransactionResult = null;
						if (preg_match('#<PreviousTransactionResult>(.+)</PreviousTransactionResult>#iU', $ret, $soapPreviousTransactionResult)) {
							$PreviousTransactionResult = $soapPreviousTransactionResult[1];
							
							$PreviousMessage = GetXMLValue("Message", $PreviousTransactionResult, ".+");
							$PreviousStatusCode = GetXMLValue("StatusCode", $PreviousTransactionResult, ".+");
						}
					
						// need to look at the previous status code to see if the transaction was successful
						if ($PreviousStatusCode == 0) {
							$szMessage = $PreviousMessage;
							// transaction authorised
							$Response = "Transaction Sucessful: " . $szMessage;
							$Response .= "<BR>OrderID: " . $_SESSION['CardSave_Direct_OrderID'];
							$Response .= "<BR>CrossReference: " . $szCrossReference;
						} else {
							$szMessage = $PreviousMessage;
							// transaction not authorised
							$Response = "Your payment was not successful.";
						}
						break;
					default:
						$Response = "Unknown response: " . $szMessage;
						$Response .= "<BR>Returned XML: <xmp>" . $ret . "</xmp>";
						break;				
				}
				
			}
			else {
				// status code is 30 - error occured
				// get the reason from the xml
				$szMessageDetail = GetXMLValue("Detail", $ret, ".+");
				
				//run the function to get the cause of the error
				$Response = "Error occurred: ";
				$Response .= getErrorFromGateway($szMessageDetail);
			}
		}
	}
	
	//increment the transaction attempt if <=2
	if($transattempt <=2) {
		$transattempt++;
	} else {
		//reset transaction attempt to 1 & incremend $gwID (to use next numeric gateway number (eg. use gw2 rather than gw1 now))
		$transattempt = 1;
		$gwId++;
	}			
}

//echo the response to the user
echo $Response;
?>