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
	//echo "<pre>";
   // print_r($data);
	$total=$data->total;
	//$total = 1.00;
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
	
		$payumerchantkey = $bData['payumerchantkey'];
		$payumerchantsalt = $bData['payumerchantsalt'];
		$payumerchantid = $bData['payumerchantid'];
		
		
	}else{
	
	if(empty($bData['payumerchantkey'])|| empty($bData['payumerchantsalt']) || empty($bData['payumerchantid'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,16));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='payumerchantkey'){
					$payumerchantkey = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='payumerchantsalt'){
					$payumerchantsalt = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='payumerchantid'){
					$payumerchantid = $cre->value;
					$flag=false;
				}
				
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,15));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='payumerchantkey'){
					$payumerchantkey = $creall->value;
				}
				if($creall->paymentfield =='payumerchantsalt'){
					$payumerchantsalt = $creall->value;
				}
				if($creall->paymentfield =='payumerchantid'){
					$payumerchantid = $creall->value;
				}
				
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,15));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='payumerchantkey'){
					$payumerchantkey = $creall->value;
				}
				if($creall->paymentfield =='payumerchantsalt'){
					$payumerchantsalt = $creall->value;
				}
				if($creall->paymentfield =='payumerchantid'){
					$payumerchantid = $creall->value;
				}
				
			
				
							
			}
				
			}
		}else{		
			
			$payumerchantkey = $bData['payumerchantkey'];
			$payumerchantsalt = $bData['payumerchantsalt'];
			$payumerchantid = $bData['payumerchantid'];
			
		}	
		
	}
	
	
	////////////////////////////////PAY U START //////////////////////////////////////////////////
	
	// Merchant key here as provided by Payu
$MERCHANT_KEY = $payumerchantkey;

// Merchant Salt as provided by Payu
$SALT = $payumerchantsalt;
// Merchant key here as provided by Payu
/*$MERCHANT_KEY = "JBZaLc";

// Merchant Salt as provided by Payu
$SALT = "GQs7yium";*/

// End point - change to https://secure.payu.in for LIVE mode
$PAYU_BASE_URL = "https://secure.payu.in";

$action = '';

$posted = array();
if(!empty($_POST)) {
    //print_r($_POST);
  foreach($_POST as $key => $value) {    
    $posted[$key] = $value; 
	
  }
}

$formError = 0;

if(empty($posted['txnid'])) {
  // Generate random transaction id
  $txnid = substr(hash('sha256', mt_rand() . microtime()), 0, 20);
} else {
  $txnid = $posted['txnid'];
}
$hash = '';
// Hash Sequence
$hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";
if(empty($posted['hash']) && sizeof($posted) > 0) {
  if(
          empty($posted['key'])
          || empty($posted['txnid'])
          || empty($posted['amount'])
          || empty($posted['firstname'])
          || empty($posted['email'])
          || empty($posted['phone'])
          || empty($posted['productinfo'])
          || empty($posted['surl'])
          || empty($posted['furl'])
		  || empty($posted['service_provider'])
  ) {
    $formError = 1;
  } else {
    //$posted['productinfo'] = json_encode(json_decode('[{"name":"tutionfee","description":"","value":"500","isRequired":"false"},{"name":"developmentfee","description":"monthly tution fee","value":"1500","isRequired":"false"}]'));
	$hashVarsSeq = explode('|', $hashSequence);
    $hash_string = '';	
	foreach($hashVarsSeq as $hash_var) {
      $hash_string .= isset($posted[$hash_var]) ? $posted[$hash_var] : '';
      $hash_string .= '|';
    }

    $hash_string .= $SALT;


    $hash = strtolower(hash('sha512', $hash_string));
    $action = $PAYU_BASE_URL . '/_payment';
  }
} elseif(!empty($posted['hash'])) {
  $hash = $posted['hash'];
  $action = $PAYU_BASE_URL . '/_payment';
}
	
	////////////////////////////////PAY U END //////////////////////////////////////////////////
	
	
	
	
	
	
?>
<html>
  <head>
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
  <script>
   
    function submitPayuForm() {
      var payuForm = document.forms.payuForm;
      payuForm.submit();
    }
  </script>
  </head>
  <body onLoad="submitPayuForm()">
  
   <div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>
    <form action="<?php echo $action; ?>" method="post" name="payuForm">
      <input type="hidden" name="key" value="<?php echo $MERCHANT_KEY ?>" />
      <input type="hidden" name="hash" value="<?php echo $hash ?>"/>
      <input type="hidden" name="txnid" value="<?php echo $txnid ?>" />
      <table>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" name="amount" value="<?php echo $total?>" /></td>
          <td></td>
          <td><input type="hidden" name="firstname" id="firstname" value=" <?php echo $data->buyer->name; ?>" /></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" name="email" id="email" value="<?php echo $data->buyer->email; ?>" /></td>
          <td></td>
          <td><input type="hidden" name="phone" value="<?php echo $data->buyer->tel; ?>" /></td>
        </tr>
        <tr>
          <td> </td>
          <td colspan="3"><input type="hidden" name="productinfo" value="<?php echo $data->business[1]->name; ?>" /></td>
        </tr>
        <tr>
          <td> </td>
          <td colspan="3"><input type="hidden" name="surl" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/payu/success.php?id=<?php echo $_REQUEST["id"]?>" size="64" /></td>
        </tr>
        <tr>
          <td> </td>
          <td colspan="3"><input type="hidden" name="furl" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/payu/failure.php?id=<?php echo $_REQUEST["id"]?>" size="64" /></td>
        </tr>

        <tr>
          <td colspan="3"><input type="hidden"  name="service_provider" value="payu_paisa" size="64" /></td>
        </tr>

        <tr>
          <td></td>
        </tr>
        <tr>
          <td> </td>
          <td><input type="hidden" name="lastname" id="lastname" value="<?php echo $data->buyer->lastname2; ?>" /></td>
          <td> </td>
          <td><input type="hidden" name="curl" value="http://<?=$_SERVER["HTTP_HOST"]?>/<?php echo $data->customslug; ?>" /></td>
        </tr>
        <tr>
          <td> </td>
          <td><input type="hidden" name="address1" value="<?php echo $data->buyer->address; ?>" /></td>
          <td></td>
          <td><input type="hidden" name="address2" value="<?php echo $data->buyer->street; ?>" /></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" name="city" value="<?php echo $data->buyer->cityname; ?>" /></td>
          <td></td>
          <td><input type="hidden" name="state" value="<?php echo (empty($posted['state'])) ? '' : $posted['state']; ?>" /></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" name="country" value="<?php echo $data->buyer->countryname; ?>" /></td>
          <td></td>
          <td><input type="hidden" name="zipcode" value="<?php echo $data->buyer->zipcode; ?>" /></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" name="udf1" value="<?php echo (empty($posted['udf1'])) ? '' : $posted['udf1']; ?>" /></td>
          <td></td>
          <td><input type="hidden" name="udf2" value="<?php echo (empty($posted['udf2'])) ? '' : $posted['udf2']; ?>" /></td>
        </tr>
        <tr>
          <td> </td>
          <td><input type="hidden" name="udf3" value="<?php echo (empty($posted['udf3'])) ? '' : $posted['udf3']; ?>" /></td>
          <td> </td>
          <td><input type="hidden" name="udf4" value="<?php echo (empty($posted['udf4'])) ? '' : $posted['udf4']; ?>" /></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" name="udf5" value="<?php echo (empty($posted['udf5'])) ? '' : $posted['udf5']; ?>" /></td>
          <td></td>
          <td><input type="hidden" name="pg" value="<?php echo (empty($posted['pg'])) ? '' : $posted['pg']; ?>" /></td>
        </tr>
        <tr>
          <?php if(!$hash) { ?>
            <td colspan="4"><input type="submit" value="Submit" /></td>
          <?php } ?>
        </tr>
      </table>
    </form>
  </body>
</html>
