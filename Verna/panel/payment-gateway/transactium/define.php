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
define('HPSURL',"https://psp.stg.transactium.com/hps/webservice/hpws/v1500.asmx?WSDL");
define('JSURL',"https://psp.stg.transactium.com/hpservices/site/js/startHPS.js");

session_start();
$id = $_SESSION['order_id'];
unset($_SESSION['order_id']);

require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	
	pg_prepare($link,'sqlsecure','SELECT * FROM w_orders WHERE id = $1;');
	$result = pg_execute($link,'sqlsecure',array($id));
	$fetchdata = pg_fetch_array($result);
	$data=json_decode($fetchdata['data']);

	$businessid = $data->business[0]->id;
	
	
	
	/**************************/
	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	
	
	pg_prepare($link,'sqlb','SELECT * FROM w_business WHERE id = $1;');
	$searchs = pg_execute($link,'sqlb',array($businessid));
	$bdata = pg_fetch_array($searchs);
	if($panelsetting == 1){	
		$tusername = $bdata['transactiumusername'];
		$tpass = $bdata['transactiumpass'];
		$ttag = $bdata['transactiumtag'];
	}else{
		
		
		  
		if($bdata['transactiumusername'] =="" || $bdata['transactiumpass'] =="" || $bdata['transactiumtag'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,10));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='transactiumusername'){
					$tusername = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='transactiumpass'){
					$tpass = $cre->value;
					$flag=false;
				}	
				if($creall->paymentfield =='transactiumtag'){
					$ttag = $cre->value;
				}				
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,10));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='transactiumusername'){
					$tusername = $creall->value;
				}
				if($creall->paymentfield =='transactiumpass'){
					$tpass = $creall->value;
				}
				if($creall->paymentfield =='transactiumtag'){
					$ttag = $creall->value;
				}	
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,10));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='transactiumusername'){
					$tusername = $creall->value;
				}
				if($creall->paymentfield =='transactiumpass'){
					$tpass = $creall->value;
				}
				if($creall->paymentfield =='transactiumtag'){
					$ttag = $creall->value;
				}	
							
			}
				
			}
		}else{
			$tusername = $bdata['transactiumusername'];
			$tpass = $bdata['transactiumpass'];
			$ttag = $bdata['transactiumtag'];
		}  
		  
	  
		
	}



/* Note: These are default credentials.  Please note that you should have your own username and password. */
define('USERNAME',$tusername);
define('PASSWORD',$tpass);
define('TAG',$ttag);
//define('BASE',"http://samplecode.dev.transactium.com/HPS/PHP/MerchantTestShop/");
define('BASE',"http://" . $_SERVER['SERVER_NAME']."/panel/payment-gateway/transactium/");
?>