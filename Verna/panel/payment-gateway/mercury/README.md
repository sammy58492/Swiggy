WebServices.PHP
============================

Simple PHP web app to demo processing transactions with Mercury's web services platform.

3 step process to integrate to Mercury Web Services.

##STEP 1: Build the request array
    
Create request arrray and add all the Key/Value pairs.
  
```PHP
$requestData = array
(
  	"MerchantID" => $_REQUEST["MerchantID"],
  	"LaneID" => $_REQUEST["02"],
	"TranType" => $_REQUEST["TranType"],
	"TranCode" => $_REQUEST["TranCode"],
	"InvoiceNo" => $_REQUEST["InvoiceNo"],
	"RefNo" => $_REQUEST["RefNo"],
	"AcctNo" => $_REQUEST["AcctNo"],
	"ExpDate" => $_REQUEST["ExpDate"],
	"Memo" => $_REQUEST["Memo"],
	"Purchase" => $_REQUEST["Purchase"]
);
```
  
##STEP 2: Use helper class to process transaction

Store the response array for further processing.

```PHP
include_once("Mercury_Web_Services_SOAP_Helper.php");
$soapHelper = new Mercury_Web_Services_SOAP_Helper();
$responseData = $soapHelper->credit_transaction($requestData, $_REQUEST["Password"]);
```

##STEP 3: Read response array to check for approval

Approved transactions will have a CmdStatus equal to "Approved".

```PHP
if ($responseData["CmdStatus"] <> ""
  	&& $responseData["CmdStatus"] == "Approved")
{
	echo "<font color=\"green\">";
	echo "<h2>Approved Response Data</h2>";
	print_r($responseData);
	echo "</font>";
}
else
{
	echo "<font color=\"red\">";
	echo "<h2>Declined/Error Response Data</h2>";
	print_r($responseData);
	echo "</font>";
}
```

###©2014 Mercury Payment Systems, LLC - all rights reserved.

Disclaimer:
This software and all specifications and documentation contained herein or provided to you hereunder (the "Software") are provided free of charge strictly on an "AS IS" basis. No representations or warranties are expressed or implied, including, but not limited to, warranties of suitability, quality, merchantability, or fitness for a particular purpose (irrespective of any course of dealing, custom or usage of trade), and all such warranties are expressly and specifically disclaimed. Mercury Payment Systems shall have no liability or responsibility to you nor any other person or entity with respect to any liability, loss, or damage, including lost profits whether foreseeable or not, or other obligation for any cause whatsoever, caused or alleged to be caused directly or indirectly by the Software. Use of the Software signifies agreement with this disclaimer notice.
