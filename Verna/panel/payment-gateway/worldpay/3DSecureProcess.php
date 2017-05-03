<?php
session_start();
require_once("Config.php");
require_once("CommonFunctions.php");

//XML Headers used in cURL - remember to change the function after thepaymentgateway.net in SOAPAction when changing the XML to call a different function
$headers = array(
			'SOAPAction:https://www.thepaymentgateway.net/ThreeDSecureAuthentication',
			'Content-Type: text/xml; charset = utf-8',
			'Connection: close'
		);

$PaRES = $_POST['PaRes'];
$MD = $_POST['MD'];

//XML to send to the Gateway - again clean it up just in chase
$xml = '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
<ThreeDSecureAuthentication xmlns="https://www.thepaymentgateway.net/">
<ThreeDSecureMessage>
<MerchantAuthentication MerchantID="'. trim($MerchantID) .'" Password="'. trim($Password) .'" />
<ThreeDSecureInputData CrossReference="'. $MD .'">
<PaRES>'. $PaRES .'</PaRES>
</ThreeDSecureInputData>
<PassOutData>Some data to be passed out</PassOutData>
</ThreeDSecureMessage>
</ThreeDSecureAuthentication>
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
				
				//collect some of the most commonly used information from the response
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
						$Response .= "<BR>OrderID: " . $_SESSION['CardSave_Direct_OrderID'];
						$Response .= "<BR>AuthCode: " . $szAuthCode;
						$Response .= "<BR>CrossReference: " . $szCrossReference;
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
						$Response = "An error has occurred: " . $szMessage;
						break;					
				}
			}
			else {
			// status code is 30 - error occured
				$Response = "An error has occurred: " . $szMessage;
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

//show final response to user
echo $Response;
?>