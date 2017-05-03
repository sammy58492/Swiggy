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

$id = $_REQUEST["id"];

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

		
	pg_prepare($link,'sqlipn2','SELECT * FROM w_business WHERE id=$1;');
	$searchs = pg_execute($link,'sqlipn2',array($businessid));
	$bData = pg_fetch_array($searchs);

	//select currency code for business city
	$cityID = $bData['city'];
	pg_prepare($link,'sqlccbc','SELECT currency FROM w_franchises WHERE id=$1;');
	$currency_sql = pg_execute($link,'sqlccbc',array($cityID));

	$currency_arry = pg_fetch_array($currency_sql);
	
	if($bData['currency'] != "" || !empty($bData['currency'])){
		$cityCurrency = $bData['currency'];
	}else{
		$cityCurrency = $currency_arry['currency'];
	}

	if($panelsetting == 1){	
		$skrillemail = $bData['skrillemail'];
		
	}else{

	
		if($bData['skrillemail'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,14));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='skrillemail'){
					$skrillemail = $cre->value;
					$flag=false;
				}
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,14));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='skrillemail'){
					$skrillemail = $creall->value;
				}
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,14));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='skrillemail'){
					$skrillemail = $creall->value;
				}
			
				
							
			}
				
			}
		}else{
			
			$skrillemail = $bData['skrillemail'];
		}	
		
	}

	
$pagelink = "https://www.moneybookers.com/app/payment.pl";
?>
<!doctype html>
<html>
    <head>

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>

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
	background: rgba(255,255,255,0.7) url(loadingpaypal.gif) no-repeat center center;
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
  
    </head>
   
   <body onLoad="javascript: document.skrill.submit();">
  	 <div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>



<form action='<?php echo $pagelink ?>' method="post" target="_self" name="skrill">
 <input type="hidden" name="pay_to_email" value="<?php echo $skrillemail;?>">
 <input type="hidden" name="transaction_id" value="<?php echo $id ?>">
 <input type="hidden" name="return_url"
value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/skrill/payment_made.php?id=<?php echo $_REQUEST["id"]?>">
 <input type="hidden" name="cancel_url" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/skrill/payment_cancelled.php?id=<?php echo $_REQUEST["id"]?>">
 <input type="hidden" name="status_url" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/skrill/process_payment.php?id=<?php echo $_REQUEST["id"]?>">
 
 <input type="hidden" name="language" value="EN">
 <input type="hidden" name="merchant_fields" value="customer_number,
session_id">
 <input type="hidden" name="customer_number" value="C1234">
 <input type="hidden" name="session_ID" value="A3DFA2234">
 <input type="hidden" name="pay_from_email" value="<?php echo $data->buyer->email?>">
 <input type="hidden" name="amount2_description" value="Product Price:">
 <input type="hidden" name="amount3_description" value="Handling Fees &
Charges:">
 <input type="hidden" name="amount" value="<?php echo $total;?>">
 <input type="hidden" name="currency" value="<?php echo $cityCurrency;?>">
 <input type="hidden" name="firstname" value="<?php echo $data->buyer->name?>">
 <input type="hidden" name="lastname" value="<?php echo $data->buyer->lastname2?>">
 <input type="hidden" name="address" value="<?php echo $data->buyer->address?>">
 <input type="hidden" name="postal_code" value="<?php echo $data->buyer->zipcode?>">
 <input type="hidden" name="city" value="<?php echo $data->buyer->cityname?>">
 <input type="hidden" name="country" value="">
 <input type="hidden" name="detail1_description" value="Product ID:">
 <input type="hidden" name="detail1_text" value="4509334">
 <input type="hidden" name="detail2_description" value="Description:">
 <input type="hidden" name="detail2_text" value="Romeo and Juliet (W.
Shakespeare)">
 <input type="hidden" name="detail3_description" value="Special
Conditions:">
 <input type="hidden" name="detail3_text" value="5-6 days for delivery">
 <input type="hidden" name="confirmation_note" value="Sample merchant
wishes you pleasure reading your new book!">
 <input type="hidden" value="Pay!">
</form>

</body>
</html>