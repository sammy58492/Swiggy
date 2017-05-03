<?php
/*
#
# This function is a simple example of
# how to send and receive Payment Express XML
# messages to process a transaction.
#
*/

#main start
$Action = $_REQUEST["Action"];
$CardName = $_REQUEST["CardName"];
$Amount = $_REQUEST["Amount"];
$CardNum = $_REQUEST["CardNum"];
$ExMnth = $_REQUEST["ExMnth"];
$ExYear = $_REQUEST["ExYear"];
$MerchRef = $_REQUEST["MerchRef"];
 
If ($Action == "Submit")
{
	process_request($CardName, $Amount, $CardNum, $ExMnth, $ExYear, $MerchRef);
}
?>
<html>
<head>
<title>Payment Express PXPost Sample -- PHP</title>
</head>
<body>
 <!--<div align="center"><img src="paymentexpressdemo.gif"></div>-->
<?php
     
function process_request($name,$amount,$ccnum,$ccmm,$ccyy,$merchRef)
{
	$cmdDoTxnTransaction .= "<Txn>";
	$cmdDoTxnTransaction .= "<PostUsername>oasispalmshotel_dev</PostUsername>"; #Insert your Payment Express Username here
	$cmdDoTxnTransaction .= "<PostPassword>Ma1nland</PostPassword>"; #Insert your Payment Express Password here
	$cmdDoTxnTransaction .= "<Amount>$amount</Amount>";
	$cmdDoTxnTransaction .= "<InputCurrency>USD</InputCurrency>";
	$cmdDoTxnTransaction .= "<CardHolderName>$name</CardHolderName>";
	$cmdDoTxnTransaction .= "<CardNumber>$ccnum</CardNumber>";
	$cmdDoTxnTransaction .= "<DateExpiry>$ccmm$ccyy</DateExpiry>";
	$cmdDoTxnTransaction .= "<TxnType>Purchase</TxnType>";
	$cmdDoTxnTransaction .= "<MerchantReference>$merchRef</MerchantReference>";
	$cmdDoTxnTransaction .= "</Txn>";
               
	$URL = "sec.paymentexpress.com/pxpost.aspx";
	//echo "\n\n\n\nSENT:\n$cmdDoTxnTransaction\n\n\n\n\n$";
              
	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL,"https://".$URL);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,$cmdDoTxnTransaction);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); //Needs to be included if no *.crt is available to verify SSL certificates
 
	$result = curl_exec ($ch); 
	curl_close ($ch);
                
	parse_xml($result);
}
 
function parse_xml($data)
{
	$xml_parser = xml_parser_create();
	xml_parse_into_struct($xml_parser, $data, $vals, $index);
	xml_parser_free($xml_parser);
     
	$params = array();
	$level = array();
	foreach ($vals as $xml_elem) {
	if ($xml_elem['type'] == 'open') 
	{
		if (array_key_exists('attributes',$xml_elem)) {
		list($level[$xml_elem['level']],$extra) = array_values($xml_elem['attributes']);
	} 
	else 
	{
		$level[$xml_elem['level']] = $xml_elem['tag'];
	}
}
	if ($xml_elem['type'] == 'complete') 
	{
		$start_level = 1;
		$php_stmt = '$params';
				 
		while($start_level < $xml_elem['level']) 
		{
			$php_stmt .= '[$level['.$start_level.']]';
			$start_level++;
		}
		$php_stmt .= '[$xml_elem[\'tag\']] = $xml_elem[\'value\'];';
		eval($php_stmt);
	}
}
     
	//Uncommenting this block will display the entire array and show all values returned.
	echo "<pre>";
	print_r ($params);
	echo "</pre>";
	
			 
	$success = $params[TXN][SUCCESS];
		 
	$MerchantReference = $params[TXN][$success][MERCHANTREFERENCE];
	$CardHolderName = $params[TXN][$success][CARDHOLDERNAME];
	$AuthCode = $params[TXN][$success][AUTHCODE];
	$Amount = $params[TXN][$success][AMOUNT];
	$CurrencyName = $params[TXN][$success][CURRENCYNAME];
	$TxnType = $params[TXN][$success][TXNTYPE];
	$CardNumber = $params[TXN][$success][CARDNUMBER];
	$DateExpiry = $params[TXN][$success][DATEEXPIRY];
	$CardHolderResponseText = $params[TXN][$success][CARDHOLDERRESPONSETEXT];
	$CardHolderResponseDescription = $params[TXN][$success][CARDHOLDERRESPONSEDESCRIPTION];
	$MerchantResponseText = $params[TXN][$success][MERCHANTRESPONSETEXT];
	$DPSTxnRef = $params[TXN][$success][DPSTXNREF];
			 
	$html = "<table align='center' width='500' style='FONT-SIZE: 10pt; FONT-FAMILY: Arial, Helvetica, sans-serif'>";
	$html .= "<BR><hr><BR>";
	$html .= "<tr><td>Merchant Reference: </td><td>$MerchantReference</td></tr>";
	$html .= "<tr><td>CardHolderName: </td><td>$CardHolderName</td></tr>";
	$html .= "<tr><td>AuthCode: </td><td>$AuthCode</td></tr>";
	$html .= "<tr><td>Amount: </td><td>$Amount</td></tr>";
	$html .= "<tr><td>CurrencyName: </td><td>$CurrencyName</td></tr>";
	$html .= "<tr><td>DateExpiry: </td><td>$DateExpiry</td></tr>";
	$html .= "<tr><td>CardHolderResponseText: </td><td>$CardHOlderResponseText</td></tr>";
	$html .= "<tr><td>CardHolderResponseDescription: </td><td>$CardHolderResponseDescription</td></tr>";
	$html .= "<tr><td>MerchantResponseText: </td><td>$MerchantResponseText</td></tr>";
	$html .= "<tr><td>TxnType: </td><td>$TxnType</td></tr>";
	$html .= "<tr><td>DPSTxnRef: </td><td>$DPSTxnRef</td></tr>";
	$html .= "</table>";
	//$html .= "</body></html>";
			 
	echo $html;     
}
?>
<form method="POST">
<input type="hidden" name="Action" value="Submit"><BR><BR>
<table align="center" width="550" style="FONT-SIZE: 10pt; FONT-FAMILY: Arial, Helvetica, sans-serif" border="0">
<tr>
<td width="280">
<table style="FONT-SIZE: 10pt; FONT-FAMILY: Arial, Helvetica, sans-serif">
<tr>
<td colspan="2">Name (as it appears on the card)<BR>
<input type="text" name="CardName" value="Mr John Smith" size="26">
</td>
</tr>
<tr><td colspan="2">Card Number<BR>
<input type="text" name="CardNum" value="4111111111111111" maxlength="16" size="26">
</td>
</tr>
<tr><td>Amount<BR>
<input type="text" name="Amount" value="1.80" size="9">
</td>
<td>Merchant Reference<BR>
<input type="text" name="MerchRef" value="invoice 84325" size="12">
</td>
</tr>
</table>
</td>
<td>Expiry Date<BR>
<select name="ExMnth"><option value="01">01</option>
    <option value="02">02</option>
    <option value="03">03</option>
    <option value="04">04</option>
    <option value="05">05</option>
    <option value="06">06</option>
    <option value="07">07</option>
    <option value="08">08</option>
    <option value="09">09</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
</select>
<select name="ExYear"><option value="05">05</option>
    <option value="06">06</option>
    <option value="07">07</option>
    <option value="08">08</option>
    <option value="09">09</option>
</select><BR><BR><BR><BR>
</td>
<td align="right">
<BR><BR><BR>
<input type="submit" value="process">
</td>
</tr>
</table>
</form>
</body>
</html>
