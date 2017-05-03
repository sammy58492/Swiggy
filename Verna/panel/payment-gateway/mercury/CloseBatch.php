<?php

// STEP 1: Build Batch Summary request array
$batchSummaryRequest = array
(
		"MerchantID" => $_REQUEST["MerchantID"],
		"TranCode" => "BatchSummary",
		"Memo" => "Testing WebServices PHP"
);

// STEP 2: Use helper class to process the Web Services transaction
include_once("Mercury_Web_Services_SOAP_Helper.php");
$soapHelper = new Mercury_Web_Services_SOAP_Helper();
$batchSummaryResponse = $soapHelper->credit_transaction($batchSummaryRequest, $_REQUEST["Password"]);

echo "<h2>Batch Summary Request Data</h2>";
print_r($batchSummaryRequest);

// STEP 3: Read parsed response to check for Ssuccess
if ($batchSummaryResponse["CmdStatus"] <> ""
		&& $batchSummaryResponse["CmdStatus"] == "Success")
{
	echo "<font color=\"green\">";
	echo "<h2>Batch Summary Response Data</h2>";
	print_r($batchSummaryResponse);
	echo "</font>";
	
	// STEP 1.b: On successful Batch Summary use the results to build a Batch Close
	$batchCloseRequest = array
	(
			"MerchantID" => $_REQUEST["MerchantID"],
			"TranCode" => "BatchClose",
			"Memo" => "Testing WebServices PHP",
			"BatchNo" => $batchSummaryResponse["BatchNo"],
			"BatchItemCount" => $batchSummaryResponse["BatchItemCount"],
			"NetBatchTotal" => $batchSummaryResponse["NetBatchTotal"],
			"CreditPurchaseCount" => $batchSummaryResponse["CreditPurchaseCount"],
			"CreditPurchaseAmount" => $batchSummaryResponse["CreditPurchaseAmount"],
			"CreditReturnCount" => $batchSummaryResponse["CreditReturnCount"],
			"CreditReturnAmount" => $batchSummaryResponse["CreditReturnAmount"],
			"DebitPurchaseCount" => $batchSummaryResponse["DebitPurchaseCount"],
			"DebitPurchaseAmount" => $batchSummaryResponse["DebitPurchaseAmount"],
			"DebitReturnCount" => $batchSummaryResponse["DebitReturnCount"],
			"DebitReturnAmount" => $batchSummaryResponse["DebitReturnAmount"]			
	);
	
	// STEP 2.b: Use helper class to process the Web Services transaction
	$batchCloseResponse = $soapHelper->credit_transaction($batchCloseRequest, $_REQUEST["Password"]);
	
	echo "<h2>Batch Close Request Data</h2>";
	print_r($batchCloseRequest);
	
	// STEP 3.b: Read parsed response to check for Success
	if ($batchCloseResponse["CmdStatus"] <> ""
			&& $batchCloseResponse["CmdStatus"] == "Success")
	{
		echo "<font color=\"green\">";
		echo "<h2>Batch Close Response Data</h2>";
		print_r($batchCloseResponse);
		echo "</font>";
	}
	else
	{
		echo "<font color=\"red\">";
		echo "<h2>Declined/Error Batch Close sResponse Data</h2>";
		print_r($batchCloseResponse);
		echo "</font>";
	}
	
}
else
{
	echo "<font color=\"red\">";
	echo "<h2>Declined/Error Batch Summary sResponse Data</h2>";
	print_r($batchSummaryResponse);
	echo "</font>";
}

?>