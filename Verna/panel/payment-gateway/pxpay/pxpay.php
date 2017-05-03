<?php session_start();
	 global $lang_resource;
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['l'] = $row1['id'];
	}


	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_static');
    $result = pg_execute($link,'sqlfetchlang',array());
 
	  while($row = pg_fetch_array($result)){
		 
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	  }
	  return $lang_resource;
	  pg_close($link);
}
$lang_resource = GetLangFile();
/*
#
# This function is a simple example of
# how to send and receive Payment Express XML
# messages to process a transaction.
#
*/

#main start

$id = $_REQUEST["id"];

$Action = $_REQUEST["Action"];
$CardName = $_REQUEST["CardName"];
$Amount = $_REQUEST["Amount"];
$CardNum = $_REQUEST["CardNum"];
$ExMnth = $_REQUEST["ExMnth"];
$ExYear = $_REQUEST["ExYear"];
$MerchRef = $_REQUEST["MerchRef"];


require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sqlmakse12','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlmakse12',array($id));
	$fetchData = pg_fetch_array($search);
	$data=json_decode($fetchData['data']);

	$total=$data->total;
	$businessid = $data->business[0]->id;
	
	
	/**************************/
	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	
		
	pg_prepare($link,'sqlipn2','SELECT * FROM w_business WHERE id = $1;');
	$searchs = pg_execute($link,'sqlipn2',array($businessid));
	$bData = pg_fetch_array($searchs);

	//select currency code for business city
	$cityID = $bData['city'];
	pg_prepare($link,'sqlccbc','SELECT currency FROM w_franchises WHERE id = $1;');
	$currency_sql = pg_execute($link,'sqlccbc',array($cityID));

	$currency_arry = pg_fetch_array($currency_sql);
	if($bData['currency'] != "" || !empty($bData['currency'])){
		$cityCurrency = $bData['currency'];
	}else{
		$cityCurrency = $currency_arry['currency'];
	}
	
	if($panelsetting == 1){	
		$pexpressusername = $bData['pexpressusername'];
		$pexpresspassword = $bData['pexpresspass'];
		
	}else{
	
		if($bData['pexpressusername'] =="" || $bData['pexpresspass'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,11));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='pexpressusername'){
					$pexpressusername = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='pexpresspass'){
					$pexpresspassword = $cre->value;
					$flag=false;
				}	
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,11));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='pexpressusername'){
					$pexpressusername = $creall->value;
				}
				if($creall->paymentfield =='pexpresspass'){
					$pexpresspassword = $creall->value;
				}
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,11));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='pexpressusername'){
					$pexpressusername = $creall->value;
				}
				if($creall->paymentfield =='pexpresspass'){
					$pexpresspassword = $creall->value;
				}
				
							
			}
				
			}
		}else{
			$pexpressusername = $bData['pexpressusername'];
			$pexpresspassword = $bData['pexpresspass'];
		}	
		
	}

	$username = $data->buyer->name;
	$useremail = $data->buyer->email;
	$useraddress = $data->buyer->street;
	$useraddress1 = $data->buyer->colony;
	$usercountry = $data->buyer->countryname;
 
 

If ($Action == "Submit")
{
	//process_request($CardName, $Amount, $CardNum, $ExMnth, $ExYear, $MerchRef);
	process_request($pexpressusername, $pexpresspassword, $total, $cityCurrency, $username, $useremail,$useraddress,$useraddress1,$usercountry);
}
?>
<html>
<head>
<title>Payment Express PXPost Sample -- PHP</title>

<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

	<script type="text/javascript">
	jQuery(document).ready(function($) {
	// site preloader -- also uncomment the div in the header and the css style for #preloader
		$(window).load(function(){
			$('#preloader').fadeOut('slow',function(){$(this).remove();});
		});
	});
	</script>



	<style>
	#preloader {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		overflow: visible;
		background: rgba(255,255,255,0.7) url(../../../images/loadingpaypal.gif) no-repeat center center;
	}
	h3{
		position:absolute;
		bottom:100px;
		width:100%;
		text-align:center;
		color:red;
		z-index: 999;
		font-family: 'Open Sans', sans-serif;
	}

	</style>
	<script type="text/javascript">
	$(document).ready(function(){
    	$("#pxexpress").submit();
	});
	</script>

</head>
<body>
	<div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>
 <!--<div align="center"><img src="paymentexpressdemo.gif"></div>-->
<?php
     
function process_request($pexpressusername, $pexpresspassword, $total, $cityCurrency, $username, $useremail,$useraddress,$useraddress1,$usercountry)
{
	$cmdDoTxnTransaction .= "<GenerateRequest>";
	$cmdDoTxnTransaction .= "<PxPayUserId>".$pexpressusername."</PxPayUserId>";//"<PxPayUserId>OasisPalmsHotel_Dev</PxPayUserId>";
	$cmdDoTxnTransaction .= "<PxPayKey>".$pexpresspassword."</PxPayKey>";//"<PxPayKey>9123bdd552d513bd60b652ab8f69949c7f6806d87f10023317d1e64c7ddb75b9</PxPayKey>";
	$cmdDoTxnTransaction .= "<MerchantReference>Purchase</MerchantReference>";
	$cmdDoTxnTransaction .= "<TxnType>Purchase</TxnType>";
	$cmdDoTxnTransaction .= "<AmountInput>".$total."</AmountInput>";//" <AmountInput>0.01</AmountInput>";
	$cmdDoTxnTransaction .= "<CurrencyInput>".$cityCurrency."</CurrencyInput>";//"<CurrencyInput>NZD</CurrencyInput>";
	$cmdDoTxnTransaction .= "<CardHolderName>".$username."</CardHolderName>";
	$cmdDoTxnTransaction .= "<EmailAddress>".$useremail."</EmailAddress>";
    $cmdDoTxnTransaction .= "<TxnData1>".$useraddress."</TxnData1>";
    $cmdDoTxnTransaction .= "<TxnData2>".$useraddress1."</TxnData2>";
    $cmdDoTxnTransaction .= "<TxnData3>".$usercountry."</TxnData3>";
    $cmdDoTxnTransaction .= "<TxnId></TxnId>";
    $cmdDoTxnTransaction .= "<BillingId></BillingId>";
    $cmdDoTxnTransaction .= "<EnableAddBillCard></EnableAddBillCard>";
    $cmdDoTxnTransaction .= "<UrlSuccess>http://beta.orderingonlinesystem.com/panel/payment-gateway/pxpay/success.php?id=".$_REQUEST["id"]."</UrlSuccess>";
    $cmdDoTxnTransaction .= "<UrlFail>http://beta.orderingonlinesystem.com/panel/payment-gateway/pxpay/fail.php?id=".$_REQUEST["id"]."</UrlFail>";
    $cmdDoTxnTransaction .= "<Opt></Opt>";
	$cmdDoTxnTransaction .= "</GenerateRequest>";
               
	$URL = "sec.paymentexpress.com/pxpay/pxaccess.aspx";
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
	/*echo "<pre>";
	print_r ($params);
	echo "</pre>";*/
	
	$payment_url = $params[1][URI];	
	
?>
	<script type="text/javascript">
		window.location.href = '<?php echo $payment_url; ?>';
	</script>

<?php		 
	
}
?>
<form method="POST" id="pxexpress">
<input type="hidden" name="Action" value="Submit"><BR><BR>
<table align="center" border="0">
<td>
<BR><BR><BR>
<!-- <input type="submit" value="Checkout using Pxpay"> -->
</td>
</tr>
</table>
</form>
</body>
</html>
