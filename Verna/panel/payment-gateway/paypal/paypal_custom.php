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
//require('../../../languages/lang.en.php');

	$id=$_REQUEST['id'];
	require('../../config.php');
	require('../../lib/front-main.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
$email ='';
$paypal_type ='';
$siteurl ='';
$total='';
$palink ='';
	pg_prepare($link,'sqlipn0','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlipn0',array($id));
	 $fetchData = pg_fetch_array($search);
	$data=json_decode($fetchData['data']);
	
	$businessid = $data->business[0]->id;
	
/**************************/
	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	//request collection start
	

	 if(trim($fetchData["requestcollectiondata"])!=''){
		 $requestcollectiondata=json_decode($fetchData['requestcollectiondata']);
		 pg_prepare($link,'sqlipn211','SELECT * FROM w_configs');
				$searchs = pg_execute($link,'sqlipn211',array());
				while($cData = pg_fetch_array($searchs)){
						if($cData['name'] == 'requestCollectionSettingPaypal'){
						$email = $cData['value'];
						}
						if($cData['name'] == 'requestCollectionSettingPaypalType'){
						$paypal_type = $cData['value'];
						}
						if($cData['name'] == 'siteurl'){
						$siteurl = $cData['value'];
						}
				
				}
				if(isset($requestcollectiondata[0])){
					$total=$requestcollectiondata[0]->deliveryprice;
				}
				
				
				$name = "Delivery Fee";
				
				 if($paypal_type == 1){
		$palink = "https://www.paypal.com/cgi-bin/webscr"; 
	}
	else{
		$palink = "https://www.sandbox.paypal.com/cgi-bin/webscr";
		}
		 
/*request collection end */	 }else{
	pg_prepare($link,'sqlipn2','SELECT * FROM w_business WHERE id = $1;');
	$searchs = pg_execute($link,'sqlipn2',array($businessid));
	$bData = pg_fetch_array($searchs);
	$name = $bData['name'];
	if($panelsetting == 1){	 
		$email = $bData['paypal'];
		
		if($bData['paypal_type'] == 1){
			$palink = "https://www.paypal.com/cgi-bin/webscr"; 
		}else{
			$palink = "https://www.sandbox.paypal.com/cgi-bin/webscr";
		}
	}else{
		if($bData['paypal'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,3));
			if(pg_num_rows($result2)>0){
				$row = pg_fetch_array($result2);
							
				$credential = json_decode($row['credential']);
				$flag=true;
				foreach($credential as $cre){
					if($cre->paymentfield =='paypalemail'){
						$email = $cre->value;
						$flag=false;
					}
					if($cre->paymentfield =='paypal_type')	{
						if($cre->value == 1){
							$palink = "https://www.paypal.com/cgi-bin/webscr"; 
						}else{
							$palink = "https://www.sandbox.paypal.com/cgi-bin/webscr";
						}
					}			
				}			
			}else{
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,3));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
					if($creall->paymentfield =='paypalemail'){
						$email = $creall->value;
					}	
					if($cre->paymentfield =='paypal_type')	{
						if($cre->value == 1){
							$palink = "https://www.paypal.com/cgi-bin/webscr"; 
						}else{
							$palink = "https://www.sandbox.paypal.com/cgi-bin/webscr";
						}
					}			
				}
			}
		}else{
			$email = $bData['paypal'];
			if($bData['paypal_type'] == 1){
				$palink = "https://www.paypal.com/cgi-bin/webscr"; 
			}else{
				$palink = "https://www.sandbox.paypal.com/cgi-bin/webscr";
			}
		}
		//$palink = "https://www.paypal.com/cgi-bin/webscr"; 
		
	}

	
	 //echo $palink ;
	 //select currency code for business city
		 
	/* $cityID = $bData['city'];
	 pg_prepare($link,'sqlccbc','SELECT currency FROM w_franchises WHERE id = $1;');
	 $currency_sql = pg_execute($link,'sqlccbc',array($cityID));
	
	 $currency_arry = pg_fetch_array($currency_sql);
	 $cityCurrency = $currency_arry[0];
	 */
	//////// /currency set///////////////////////
	
		
	 
	   pg_prepare($link,'sqlcurrency','SELECT * FROM w_business WHERE id = $1');
	 $currency_sql_business = pg_execute($link,'sqlcurrency',array($businessid));
	 $currency_arry_fetch = pg_fetch_array($currency_sql_business);
	 
	 if($currency_arry_fetch['paypalcurrency']!='NULL' || $currency_arry_fetch['paypalcurrency']!=''){
		 
		 $cityCurrency = $currency_arry_fetch['paypalcurrency'];
		
	 }else{ 
		 
		pg_prepare($link,'sqlcurrencydetails','SELECT * FROM w_paymentgateway_details WHERE business_id = $1');
		 $currency_sql_business = pg_execute($link,'sqlcurrencydetails',array($businessid));
		 $currency_arry_fetch = pg_fetch_array($currency_sql_business); 
		 $data1 = json_decode($currency_arry_fetch['credential']);
		 $cityCurrency =  $data1[2]->value;
		
	 }
	 
	 if($cityCurrency==''){
		 $all='-1';
		 $paypal='3';
		 pg_prepare($link,'sqlcurrencydetailsall','SELECT * FROM w_paymentgateway_details where business_id=$1 and paymentgateway_id=$2');
	 	 $currency_sql_business_all = pg_execute($link,'sqlcurrencydetailsall',array($all,$paypal));
	 	 $currency_arry_fetch = pg_fetch_array($currency_sql_business_all); 
		 
		 $data1 = json_decode($currency_arry_fetch['credential']);
		 $cityCurrency =  $data1[2]->value;
		
	 }
	 
	  /////////currency set end///////////////////////
	 
	
	
	$total=$data->total;
	
	

 }
 
?> 

<!doctype html>
<html>
    <head>

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function($) {
// site preloader -- also uncomment the div in the header and the css style for #preloader
$(window).load(function(){
$('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});
</script>-->



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
   
   <body onLoad="javascript: document.paypal.submit();">
  	 <div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>



<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_self" name="paypal" >
       <input type="hidden" name="return" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php?item_number=<?=$id?>"/>
		<input type="hidden" name="notify_url" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>
       <input type="hidden" name="cmd" value="_xclick">
       <input type="hidden" name="business" value="<?php echo $email ?>">
        <input type="hidden" name="lc" value="">
        <input type="hidden" name="item_name" value="<?php echo $name ?>">
        <input type="hidden" name="item_number" value="<?php echo $id ?>">
       <input type="hidden" name="amount" value="<?php echo $total ?>">
        <input type="hidden" name="currency_code" value="<?php echo $cityCurrency;?>">
      <input type="hidden" name="button_subtype" value="services">
       <input type="hidden" name="no_note" value="0">
       <input type="hidden" name="cn" value="">
        <input type="hidden" name="no_shipping" value="1">
   
       
       <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">
</form>
</body>
</html>
