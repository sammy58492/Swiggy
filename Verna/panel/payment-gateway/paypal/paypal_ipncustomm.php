<?php 
  //echo "verified by paypal......................";
			
			$item_id = $_REQUEST['item_number'];    
			
			if(!empty($item_id))
			{			
			require("config.php"); 
			$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
			$link = pg_connect($string);
			
			pg_prepare($link,'sqlsc0','SELECT * FROM w_paypal_payments;');
			$result = pg_execute($link,'sqlsc0',array());
			 $res = pg_num_rows($result);
			 $record = $res+1;
			 
			 $values = array($record,$item_id,'now()');
			
			pg_prepare($link,'sql0','INSERT INTO w_paypal_payments (id,itemid,date) VALUES ($1,$2,$3);');
			pg_execute($link,'sql0',$values);
			
			}
		

?>
<html>
<head>

</head>
<body onLoad="windowClose();">
<p><?=$lang_resource['PAYMENT_GATEWAY_ALL_TANKYOU_PAYMENT'];?></p>
</body>
</html>
