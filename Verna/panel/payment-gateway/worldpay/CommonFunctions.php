<?php
//Functions to pull result from XML
function GetXMLValue($XMLElement, $XML, $pattern) {
	$soapArray = null;
	$ToReturn = null;
	if (preg_match('#<'.$XMLElement.'>('.$pattern.')</'.$XMLElement.'>#iU', $XML, $soapArray)) {
		$ToReturn = $soapArray[1];
	} else {
		$ToReturn = $XMLElement . " Not Found";
	}
	
	return $ToReturn;
}

function GetCrossReference($XML) {
	$soapArray = null;
	$ToReturn = null;
	if (preg_match('#<TransactionOutputData CrossReference="(.+)">#iU', $XML, $soapArray)) {
		$ToReturn = $soapArray[1];
	} else {
		$ToReturn = "No Data Found";
	}
	
	return $ToReturn;
}

function stripGWInvalidChars($strToCheck) {
	$toReplace = array("<","&");
	$replaceWith = array("","&amp;");
	$cleanString = str_replace($toReplace, $replaceWith, $strToCheck);
	return $cleanString;
}

// remove/convert restricted characters to html equivalent and ensure values don’t go over the amount allowed
function clean($string, $numberLimit) {
	// remove restricted characters
	$toReplace = array("#","\\",">","<", "\"", "[", "]");
	$string = str_replace($toReplace, "", $string);

	// remove html special chars and turn into html equivalent value
	$string = htmlspecialchars($string);
	
	// now ensure it doesnt exceed the allowed amount
	$string = substr($string, 0, $numberLimit);
		
	//return clean string
	return $string;
}

//get the error from the gateway and show a friendly message to the user i.e invalid card number
function getErrorFromGateway($szMessageDetail){
	if ($szMessageDetail == "Invalid card type"){
		// invalid card type/number
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_CARD_NO'];
	}
	else if ($szMessageDetail == "Passed variable (PaymentMessage.CardDetails.CV2) has an invalid value"){
		// invalid CV2
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_CV2_NUMBER'];
	}
	else if ($szMessageDetail == "Required variable (PaymentMessage.CardDetails.CardNumber) is missing"){
		// no card number entered
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_NO_CARD_ENTERED'];
	}
	else if ($szMessageDetail == "Passed variable (PaymentMessage.CardDetails.CardNumber) has an invalid value"){
		// invalid card number - normally caused by exceeding the length
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_CARD_NUMBER'];
	}
	else if ($szMessageDetail == "Required variable (PaymentMessage.CardDetails.ExpiryDate.Month) is missing"){
		// missing expiry month
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_MONTH_MISSING'];
	}
	else if ($szMessageDetail == "Required variable (PaymentMessage.CardDetails.ExpiryDate.Year) is missing"){
		// missing expiry year
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_YEAR'];
	}
	else if ($szMessageDetail == "Passed variable (PaymentMessage.CardDetails.ExpiryDate.Year) has an invalid value"){
		// invalid expiry year -  - normally caused by exceeding the length
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_YEAR'];
	}
	else if ($szMessageDetail == "Passed variable (PaymentMessage.CardDetails.ExpiryDate.Month) has an invalid value"){
		// invalid expiry month -  - normally caused by exceeding the length
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_MONTH'];
	}
	else if ($szMessageDetail == "Passed variable (PaymentMessage.CardDetails.IssueNumber) has an invalid value"){
		// invalid issue number - normally caused by exceeding the length
		$szMessageError = $lang_resource['PAYMENT_GATEWAY_ALL_INVALID_ISSUE_NUMBER'];
	}
	else {
		// other error - return what the gateway advised
		$szMessageError = $szMessageDetail;
	}
	
	//return the error from gateway
	return $szMessageError;
}
?>