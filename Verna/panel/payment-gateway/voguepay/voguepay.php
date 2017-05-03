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
	$comments = "Test Description";	

	
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
		$voguepay = $bData['vogue_pay'];
		$merchantid = $bData['vogue_merchant_id'];
		
	}else{
	
		if($bData['vogue_pay'] =="" || $bData['vogue_merchant_id'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,13));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='vogue_pay'){
					$voguepay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='vogue_merchant_id'){
					$merchantid = $cre->value;
					$flag=false;
				}	
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,13));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='vogue_pay'){
					$voguepay = $creall->value;
				}
				if($creall->paymentfield =='vogue_merchant_id'){
					$merchantid = $creall->value;
				}
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,13));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='vogue_pay'){
					$voguepay = $creall->value;
				}
				if($creall->paymentfield =='vogue_merchant_id'){
					$merchantid = $creall->value;
				}
				
							
			}
				
			}
		}else{
			$voguepay = $bData['vogue_pay'];
			$merchantid = $bData['vogue_merchant_id'];
		}	
		
	}
$pagelink = "https://voguepay.com/pay/";
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
   
   <body onLoad="javascript: document.voguepay.submit();">
  	 <div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>
<form action='<?php echo $pagelink ?>' method="post" target="_self" name="voguepay">

<input type='hidden' name='v_merchant_id' value='<?php echo $merchantid ?>' />
<input type='hidden' name='merchant_ref' value='234-567-890' />
<input type='hidden' name='memo' value='<?php echo $comments ?>' />
<input type='hidden' name='notify_url' value='http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/voguepay/notification.php?id=<?php echo $_REQUEST["id"]?>' />
<input type='hidden' name='success_url' value='http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/voguepay/thank_you.php?id=<?php echo $_REQUEST["id"]?>' />
<input type='hidden' name='fail_url' value='http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/voguepay/failed.php?id=<?php echo $_REQUEST["id"]?>' />

<input type='hidden' name='developer_code' value='pq7778ehh9YbZ' />
<input type='hidden' name='store_id' value='<?php echo $id ?>' />

<input type='hidden' name='total' value='<?php echo $total?>' />

<input type='hidden' src='http://voguepay.com/images/buttons/buynow_blue.png' alt='Submit' />

</form>
</body>
</html>