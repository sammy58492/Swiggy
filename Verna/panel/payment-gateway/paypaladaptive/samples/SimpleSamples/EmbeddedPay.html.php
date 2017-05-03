<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>PayPal Adaptive Payments - Pay</title>
<link rel="stylesheet" type="text/css" href="../Common/sdk.css" />
<script type="text/javascript" src="../Common/sdk_functions.js"></script>
<script type="text/javascript" src="../Common/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="../Common/jquery.qtip-1.0.0-rc3.min.js">
dgFlow = top.dgFlow || top.opener.top.dgFlow;
dgFlow.closeFlow();
top.close();
</script>

</head>
<?php	
	$serverName = $_SERVER['SERVER_NAME'];
	$serverPort = $_SERVER['SERVER_PORT'];
	$url = dirname('http://' . $serverName . ':' . $serverPort . $_SERVER['REQUEST_URI']);
	$returnUrl = $url . "/../WebflowReturnPage.php";
	$cancelUrl =  $url . "/EmbeddedPay.php";
?>

<body>
	<div id="wrapper">
		<img src="https://devtools-paypal.com/image/bdg_payments_by_pp_2line.png"/>
		<div id="header">
			<h3>Embedded Pay</h3>
			<div id="apidetails">The Pay API operation is used to transfer
				funds from a sender's PayPal account to one or more receivers'
				PayPal accounts.
				An embedded payment is a payment that initiates a visual presentation of the Adaptive Payments payment flow in which the sender appears to never leave your checkout or payment page. Embedded payments make it easier for a sender to make a payment because PayPal may allow the sender to bypass the PayPal login step.  </div>
		</div>
		<div id="request_form">
			<form action="EmbeddedPay.php" method="post">
				<div class="params">
					<div class="param_name">Action type *</div>
					<div class="param_value">
						<select name="actionType" id="actionType">
							<option value="PAY">PAY</option>
							<option value="CREATE">CREATE</option>
							<option value="PAY_PRIMARY">PAY_PRIMARY</option>
						</select>
					</div>
				</div>
								<div class="params">
					<div class="param_name">Return Url</div>
					<div class="param_value">
						<input name="returnUrl" id="returnUrl" value="<?php echo $returnUrl;?>" />
					</div>
				</div>	
				<div class="params">
					<div class="param_name">Cancel Url *</div>
					<div class="param_value">
						<input name="cancelUrl" id="cancelUrl" value="<?php echo $cancelUrl;?>" />
					</div>
				</div>
				<div class="params">
					<div class="param_name">Currency code *</div>
					<div class="param_value">
						<input name="currencyCode" value="USD" />
					</div>
				</div>

				<div class="section_header">Receiver info</div>
				<table class="params" id="receiverTable">
					<tr>
						<th></th>
						<th>Email *</th>
						<th>Amount *</th>
					</tr>
					<tr id="receiverTable_0">
						<td align="left"><input type="checkbox" name="receiver[]" id="receiver_0" disabled="disabled" /></td>
						<td>
							<input type="text" name="receiverEmail[]" id="receiveremail_0" value="platfo_1255612361_per@gmail.com">
						</td>
						<td>
							<input type="text" name="receiverAmount[]" id="amount_0" value="1.0" class="smallfield">
						</td>
					
					</tr>
				</table>

	
				<div class="submit">
					<input type="submit" value="Submit" />
				</div>
			</form>
		</div>
		<a href="../index.php">Home</a>
	</div>
</body>
</html>
