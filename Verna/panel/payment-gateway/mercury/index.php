<html>
<head>
	<title>MercuryGift Web Services Sample</title>
</head>
<body>
	<table width="400" border="0" align="center" cellpadding="0" cellspacing="1">
		<!-- Credit Transactions -->
		<tr>
			<td>
				<form name="form1" method="post" action="ProcessTransaction.php">
					<table width="100%" border="0" cellspacing="1" cellpadding="3">
						<tr>
							<td width="100%" colspan="4"><h2>Credit Transactions</h2></td>
						</tr>
						<tr>
							<td width="15%">MerchantID:</td>
							<td width="30%"><input name="MerchantID" type="text" id="MerchantID" size="50" value="023358150511666"></td>
							<td width="15%">Password:</td>
							<td width="30%"><input name="Password" type="text" id="Password" size="50" value="xyz"></td>
						</tr>
						
						<tr>
							<td width="15%">TranType:</td>
							<td width="30%"><input name="TranType" type="text" id="TranType" size="50" value="Credit"></td>
							<td width="15%">TranCode:</td>
							<td width="30%">
								<select name="TranCode"  id="TranCode">
									<option>Sale</option>
									<option>Return</option>
								</select>
							</td>
						</tr>
						
						<tr>
							<td width="15%">InvoiceNo:</td>
							<td width="30%"><input name="InvoiceNo" type="text" id="InvoiceNo" size="50" value="12345"></td>
							<td width="15%">RefNo:</td>
							<td width="30%"><input name="RefNo" type="text" id="RefNo" size="50" value="12345"></td>
						</tr>
						
						<tr>
							<td width="15%">AcctNo:</td>
							<td width="30%"><input name="AcctNo" type="text" id="AcctNo" size="50" value="5499990123456781"></td>
							<td width="15%">ExpDate:</td>
							<td width="30%"><input name="ExpDate" type="text" id="ExpDate" size="50" value="1215"></td>
						</tr>
						
						<tr>
							<td width="15%">Purchase:</td>
							<td width="30%"><input name="Purchase" type="text" id="Purchase" size="50" value="2.25"></td>
							<td width="15%">Memo:</td>
							<td width="30%"><input name="Memo" type="text" id="Memo" size="50" value="Testing WebServices PHP"></td>
						</tr>
						
						<tr>
							<td colspan="2"><input type="submit" name="Submit" value="Submit"> <input type="reset" name="reset" value="Reset"></td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						
					</table>
				</form>
			</td>
		</tr>
	
		<!-- Gift Transactions -->
		<tr>
			<td>
				<form name="form2" method="post" action="ProcessTransaction.php">
					<table width="100%" border="0" cellspacing="1" cellpadding="3">
						<tr>
							<td width="100%" colspan="4"><h2>Gift Transactions</h2></td>
						</tr>
						<tr>
							<td width="15%">MerchantID:</td>
							<td width="30%"><input name="MerchantID" type="text" id="MerchantID" size="50" value="023358150511666"></td>
							<td width="15%">Password:</td>
							<td width="30%"><input name="Password" type="text" id="Password" size="50" value="xyz"></td>
						</tr>
						
						<tr>
							<td width="15%">TranType:</td>
							<td width="30%"><input name="TranType" type="text" id="TranType" size="50" value="PrePaid"></td>
							<td width="15%">TranCode:</td>
							<td width="30%">
								<select name="TranCode" id="TranCode">
									<option>Balance</option>
									<option>Sale</option>
									<option>Reload</option>
									<option>Issue</option>
								</select>
							</td>
						</tr>
						
						<tr>
							<td width="15%">InvoiceNo:</td>
							<td width="30%"><input name="InvoiceNo" type="text" id="InvoiceNo" size="50" value="12345"></td>
							<td width="15%">RefNo:</td>
							<td width="30%"><input name="RefNo" type="text" id="RefNo" size="50" value="12345"></td>
						</tr>
						
						<tr>
							<td width="15%">AcctNo:</td>
							<td width="30%"><input name="AcctNo" type="text" id="AcctNo" size="50" value="6050110010021824998"></td>
							<td width="15%">Memo:</td>
							<td width="30%"><input name="Memo" type="text" id="Memo" size="50" value="Testing WebServices PHP"></td>
						</tr>
						
						<tr>
							<td width="15%">Purchase:</td>
							<td width="30%"><input name="Purchase" type="text" id="Purchase" size="50" value="2.25"></td>
							<td width="15%">&nbsp;</td>
							<td width="30%">&nbsp;</td>
						</tr>
						
						<tr>
							<td colspan="2"><input type="submit" name="Submit" value="Submit"> <input type="reset" name="reset" value="Reset"></td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						
					</table>
				</form>
			</td>
		</tr>
		
		<!-- Close Batch -->
		<tr>
			<td>
				<form name="form3" method="post" action="CloseBatch.php">
					<table width="100%" border="0" cellspacing="1" cellpadding="3">
						<tr>
							<td width="100%" colspan="4"><h2>Close Batch</h2></td>
						</tr>
						<tr>
							<td width="15%">MerchantID:</td>
							<td width="30%"><input name="MerchantID" type="text" id="MerchantID" size="50" value="023358150511666"></td>
							<td width="15%">Password:</td>
							<td width="30%"><input name="Password" type="text" id="Password" size="50" value="xyz"></td>
						</tr>
						
						<tr>
							<td colspan="2"><input type="submit" name="Submit" value="Close Batch"></td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						
					</table>
				</form>
			</td>
		</tr>
	</table>

</body>
</html>