<?php session_start();
	 global $lang_resource;
function GetLangFile()
{
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
require_once('lib/Braintree.php');

require('../../config.php');

        if(isset($_POST['orderid']))
          {
          $id = $_POST['orderid'];
          }
        if(isset($_REQUEST['iid']))
          {
	$id = $_REQUEST['iid'];
           }
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sqlipn0','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlipn0',array($id));
	 $fetchData = pg_fetch_array($search);
	//print_r($fetchData);
	
	/***************************/
        
	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	$data=json_decode($fetchData['data']);
	$businessid = $data->business[0]->id;
	pg_prepare($link,'sqlipn2','SELECT environment,merchant_id,public_key,private_key FROM w_business WHERE id = $1;');
	$searchs = pg_execute($link,'sqlipn2',array($businessid));
	 $bData = pg_fetch_array($searchs);
	 
	if($panelsetting == 1){	
	
	           
			$environment = $bData['environment'];
			$merchant_id =  $bData['merchant_id'];
			$public_key =  $bData['public_key'];
			$private_key =  $bData['private_key'];
	}else{
	
	
	
	
	if($bData['environment'] =="" || $bData['merchant_id'] =="" || $bData['public_key'] =="" || $bData['private_key']==""){
		
	
		
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
		
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,6));
			if(pg_num_rows($result2)>0){
				
		
				
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='environment'){
					$environment = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='merchant_id'){
					$merchant_id = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='public_key'){
					$public_key = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='private_key'){
					$private_key = $cre->value;
					$flag=false;
				}				
			}
			if($flag==true){
			
			
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,6));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='environment'){
					$environment = $creall->value;
				}
				if($creall->paymentfield =='merchant_id'){
					$merchant_id = $creall->value;
				}
				if($creall->paymentfield =='public_key'){
					$public_key = $creall->value;
				}
				if($creall->paymentfield =='private_key'){
					$private_key = $creall->value;
				}	
							
				
			}
				
			}
			
		}else{
			      
	
				
				$result3 = pg_execute($link,'sql2payall',array($all,6));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='environment'){
					$environment = $creall->value;
				}
				if($creall->paymentfield =='merchant_id'){
					$merchant_id = $creall->value;
				}
				if($creall->paymentfield =='public_key'){
					$public_key = $creall->value;
				}
				
				if($creall->paymentfield =='private_key'){
			    $private_key = $creall->value;
				}	
							
				
			}
				
		}
			
			
		}else{
		
		
		
			$environment = $bData['environment'];
			$merchant_id =  $bData['merchant_id'];
			$public_key =  $bData['public_key'];
			$private_key =  $bData['private_key'];
			
		
		}
		
	}
	//echo $environment;
	if($environment==1){
                
		  Braintree_Configuration::environment('production');
	}else{
		  Braintree_Configuration::environment('sandbox');
	}
	$customer_name=$data->buyer->name;
	$email=$data->buyer->email;
	$credit_card_number=$data->braintreePaymentInfo[0]->credit_card_number;
	$ex_dt=$data->braintreePaymentInfo[0]->ex_dt;
	$ccv=$data->braintreePaymentInfo[0]->ccv;
	//echo $merchant_id."<br>";echo $public_key."<br>";echo $private_key;
	//echo Braintree_TransparentRedirect::url();
    /*Braintree_Configuration::environment('production');
    Braintree_Configuration::merchantId("8thmmnw5jzv577wg");
    Braintree_Configuration::publicKey("xxp8zxjvsschk2zm");
    Braintree_Configuration::privateKey("5a50e2199e914886f2062cec2449106d");*/
Braintree_Configuration::merchantId($merchant_id);
    Braintree_Configuration::publicKey($public_key);
    Braintree_Configuration::privateKey($private_key);
	$totalamt = $data->total;
	 if($data->buyer->tips > 0){
		 $totalamt = $totalamt + $data->buyer->tips;
		}
		
		$clientToken = Braintree_ClientToken::generate(array());
	
?>
<!doctype html>
<html>
    <head>
        
<script type="text/javascript" src="https://js.braintreegateway.com/js/beta/braintree-hosted-fields-beta.18.min.js"></script> 
<script src="https://js.braintreegateway.com/js/braintree-2.29.0.min.js"></script>
<!-- Load the Client component. -->
<script src="https://js.braintreegateway.com/web/3.3.0/js/client.min.js"></script>

<!-- Load the 3D Secure component. -->
<script src="https://js.braintreegateway.com/web/3.3.0/js/three-d-secure.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
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
    </head>
   
   <body  <?php      if (!isset($_GET["id"])) {?> onLoad="" <?php }?>>
   <div id="preloader"></div>
   <h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>
<div id="bt_paypal_container"></div>
<div class="loader_container">
    <div class="loader_img loader"></div>
  </div>
   <?php
      if(isset($_POST['payment_method_token']))
	{
        
      $customer_firstname   = $_POST["first_name"];
	$customer_lastname    = $_POST['last_name'];
	$customer_email       = $_POST['email'];
	$firstname = $_POST['first_name'];
	$lastname  = $_POST['last_name'];
	$email     = $_POST['email'];
          $sale = array(

				'amount'   => $_POST['amount'],
				'orderId'  => $_POST['orderid'],
				'paymentMethodNonce' => $_POST['payment_method_token'],   // Autogenerated field from braintree
				'customer' => array(
								'firstName' => $customer_firstname,
								'lastName'  => $customer_lastname,
								
								'email'     => $customer_email
							  ),
				'billing' => array(
								'firstName'         => $firstname,
								'lastName'          => $lastname
								
							 ),
				'options' => array(
								'submitForSettlement'   => true,
								'storeInVaultOnSuccess' => true,
								'three_d_secure' =>  true
							 )
			);
            
						
	$result = Braintree_Transaction::sale($sale);
if (isset($result) && $result->success) { 
		$transaction = $result->transaction;
	 	$collection_id=htmlentities($transaction->id);
		pg_prepare($link,'sqlu','UPDATE w_orders SET collection_id=$1 WHERE id=$2');
         pg_execute($link,'sqlu',array($collection_id,$_POST['orderid']));
		echo '<script>window.location="http://'.$_SERVER["HTTP_HOST"].'/panel/payment-gateway/braintreepayments/braintree_return.php?collection_id='.$collection_id.'&id='.$_POST['orderid'].'"</script>';	
        }else{
				echo '<script>window.location="http://'.$_SERVER["HTTP_HOST"].'/panel/payment-gateway/braintreepayments/braintree_return.php?id='.$_POST['orderid'].'"</script>';
		
		}
	}
           if (isset($_GET["iid"])) {
			?>
    <form name="braintree1"  id="braintree1" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
     <?php $date=explode("/",$ex_dt);
           $mon=$date[0];$year=$date[1]; ?>
      <input type="hidden" name="amount" id="transaction[amount]" value="<?php echo $totalamt;?>"/>
    <input type="hidden" name="first_name" id="transaction[customer][first_name]" value="<?php echo $customer_name;?>"/>
    <input type="hidden" name="last_name" id="transaction[customer][last_name]" value=""/>
    <input type="hidden" name="email" id="transaction[customer][email]" value="<?php echo $email;?>"/>
    <input type="hidden" name="number" id="transaction[credit_card][number]" value="<?php echo $credit_card_number;?>"/>
    <input type="hidden" name="expiration_date" id="transaction[credit_card][expiration_date]" value="<?php echo $ex_dt;?>"/>
    <input type="hidden" name="cvv" id="transaction[credit_card][cvv]" value="<?php echo $ccv;?>"/>
     <input type="hidden" name="merchant_id" id="merchant_id" value="<?php echo $merchant_id;?>"/>
      <input type="hidden" name="environment" id="environment" value="<?php echo $environment;?>"/>
       <input type="hidden" name="public_key" id="public_key" value="<?php echo $public_key;?>"/>
        <input type="hidden" name="private_key" id="private_key" value="<?php echo $private_key;?>"/>
<input type="hidden" name="orderid" id="" value="<?php echo $_GET["iid"];?>"/>
<input type="hidden" name="payment_method_token" id="payment_token" value=""/>
    </form>
       <?php } ?>
    </body>
<?php  if (isset($_GET["iid"])) { ?>
<script type="text/javascript">
	(function() {
                var $obj='';
		var BTFn = {};
		var bt_client_token = '<?php echo $clientToken; ?>';
var client = new braintree.api.Client({
                        clientToken: bt_client_token
                    });
client.verify3DS({
  amount: '<?php echo $totalamt; ?>',
  creditCard: {
    number: '<?php echo $credit_card_number;?>',
    cvv: '<?php echo $ccv; ?>',
    expirationMonth: '<?php echo $mon; ?>', // or expirationMonth
    expirationYear: '<?php echo $year; ?>',
  }
}, function (error, response) {
  if (!error) {
 
    $("#payment_token").val(response.nonce);
    $("#braintree1").submit();

  } else {
    // Handle errors
    var p = document.createElement('p');
    p.innerHTML = error.message;
    document.body.appendChild(p);
  }
});
          
	})();
	</script>
<?php } ?>
</html>
