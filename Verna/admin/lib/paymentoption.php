<?php

	require('../config.php');
	$id=$_REQUEST['id'];
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sql1','SELECT * FROM w_invoiceconf');
	$result = pg_execute($link,'sql1',array());
	$row = pg_fetch_array($result);
	$mail = $row['vatpaypalemail'];
	
	pg_prepare($link,'sql_m','SELECT * FROM w_makepayment WHERE invoice_id=$1');
	$result2 = pg_execute($link,'sql_m',array($id));
	if(pg_num_rows($result2) == 0){
		pg_prepare($link,'sql_a','SELECT * FROM w_invoice WHERE id=$1');
		$result1 = pg_execute($link,'sql_a',array($id));
		$paidvalue = $row['invoicepay'];
	}else{
		while($row9 = pg_fetch_array($result2)){
		
			$paidvalue = $row9['pdue'];
		}
	
	}

 echo "Payment Processing................................";

?>

<!doctype html>
<html>
    <head>
      
  
    </head>
   
   <body onLoad="javascript: document.paypal_form.submit();">
    
    <form method="post" name="paypal_form" action="https://www.paypal.com/cgi-bin/devscr">

    <input type="hidden" name="business" value="<?php echo $mail; ?>" />
    <input type="hidden" name="cmd" value="_xclick" />
    <!-- the next three need to be created -->
    <input type="hidden" name="return" value="" />
    <input type="hidden" name="cancel_return" value="" />
    <input type="hidden" name="notify_url" value="" />
    <input type="hidden" name="rm" value="2" />
    <input type="hidden" name="currency_code" value="USD" />
    <input type="hidden" name="lc" value="US" />
    <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest" />
    <input type="hidden" name="cbt" value="Continue" />
    
    <!-- Payment Page Information -->
    <input type="hidden" name="no_shipping" value="" />
    <input type="hidden" name="shipping" value="">
    <input type="hidden" name="no_note" value="1" />
    <input type="hidden" name="cn" value="Comments" />
    <input type="hidden" name="cs" value="" />
    
    <!-- Product Information -->
    <input type="hidden" name="item_name" value="OOS Payment" />
    <input type="hidden" name="amount" value="<?php echo $paidvalue; ?>" />
    <input type="hidden" name="invoice" value="<?php echo $id; ?>" />
    <input type="hidden" name="tx" value="" />
   <!-- <input type="hidden" name="quantity" value="1" />-->
    <input type="hidden" name="undefined_quantity" value="" />

    
    <!-- Shipping and Misc Information -->
    <input type="hidden" name="shipping" value="" />
    <input type="hidden" name="shipping2" value="" />
    <input type="hidden" name="handling" value="" />
    <input type="hidden" name="tax" value="" />
    <input type="hidden" name="custom" value="" />
    
    <!-- Customer Information -->
    <input type="hidden" name="full_name" value="" />
    <input type="hidden" name="night_phone_b" value="" />
    <input type="hidden" name="night_phone_c" value="" />
  
    </form>
       	<!--<a href="<?php  //echo $preferenceResult["response"]["sandbox_init_point"]; ?>" name="MP-Checkout" class="orange-ar-m-sq-arall">Pay</a>-->
       
    </body>
</html>
