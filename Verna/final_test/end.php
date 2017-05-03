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
include('define.php');
include('utils.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
	<head runat="server">
		<title>Merchant Test Shop</title>
	</head>

	<body>
		<table cellpadding="5" cellspacing="5" width="100%" border="0">
			<tr><td colspan="3" style="border: 1px solid #c0c0c0; font-family: Tahoma; font-size: 32px; font-weight: bold; color: #ff0000" align="center">Merchant Test Shop<br /></td></tr>
			<tr>
				<td align="center" width="200px" valign="top" style="border: 1px solid #c0c0c0; height: 500px; background-color: #f1f1f1">
					<div style="font-family: Tahoma; font-size: 20px;"><b>Menu</b></div>
					<div style="font-family: Tahoma; font-size: 10px;"><b>Link 1</b></div>
					<div style="font-family: Tahoma; font-size: 10px;"><b>Link 2</b></div>
					<div style="font-family: Tahoma; font-size: 10px;"><b>Link 3</b></div>
					<div style="font-family: Tahoma; font-size: 10px;"><b>Link 4</b></div>
				</td>
				<td style="border: 1px solid #c0c0c0;" valign="top" align="center">
					<div style="font-family: Tahoma; font-size: 20px;"><b>Payment Result</b></div>
					<!-- SHOW PAYMENT INFORMATION-->
					<div style="font-family: Tahoma; font-size: 10px;">
						<?php
						if ($_SESSION["hpsid"]!=$_GET["hpsid"])
						{
							?>
							<b>HPSID MISMATCH</b>
							<?php
						}
						else
						{
							$hp = new CTransactiumHPP(USERNAME,PASSWORD);
							$payment = $hp->GetHostedPayment($_SESSION["hpsid"]);
							?>
							Transaction ID: <b><?php echo ($_SESSION["hpsid"]); ?></b><br>
							Status: <b><?php echo($payment->GetHostedPaymentResult->Status); ?></b>
							<?php
						}
						?>
					</div>
				</td>
				<td align="center" width="200px" valign="top" style="border: 1px solid #c0c0c0; height: 500px; background-color: #c0c0c0">
					<div style="font-family: Tahoma; font-size: 20px;"><b>Shopping Cart</b></div>
					<div style="font-family: Tahoma; font-size: 10px;">Empty</div>
					<div><br /></div>
					<div style="font-family: Tahoma; font-size: 14px;"><b>Order Information</b></div>
					<div style="font-family: Tahoma; font-size: 12px;">Total:&nbsp;<b>-</b></div>
					<div><br /></div>
					<div><input type="button" value="Continue" style="width: 100px; height: 25px; font-family: Tahoma; font-size: 12px; font-weight: bold; color: #ffffff; background-color: #121212;" ID="btnContinue" onclick="location.href='index.php';" /></div>
				</td>
			</tr>
			<tr><td colspan="3" style="border: 1px solid #c0c0c0; font-family: Tahoma; font-size: 12px; font-weight: bold; color: #110000" align="center">All Rights Reserved Â© 2008<br />Merchant Test Shop</td></tr>
		</table>
	</body>
</html>
