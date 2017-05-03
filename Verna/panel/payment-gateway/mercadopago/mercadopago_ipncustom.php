<?php
require_once "mercadopago.php";
//require_once("lib/front-main.php");
	require('../../config.php');
	$id=$_REQUEST['id'];
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sqlipn0','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlipn0',array($id));
	 $fetchData = pg_fetch_array($search);
	$data=json_decode($fetchData['data']);
	
	$businessid = $data->business[0]->id;
	
	/**************/
	 pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	pg_prepare($link,'sqlipn2','SELECT secretkey,clientkey FROM w_business WHERE id = $1;');
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
	$client_id = $bData['clientkey'];
	$secretkey =  $bData['secretkey'];
	}else{
	
	if($bData['clientkey'] =="" || $bData['secretkey'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,9));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='clientkey'){
					$client_id = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='secretkey'){
					$secretkey = $cre->value;
					$flag=false;
				}				
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,9));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='clientkey'){
					$client_id = $creall->value;
				}
				if($creall->paymentfield =='secretkey'){
					$secretkey = $creall->value;
				}
							
				
			}
				
			}
			
			
		}else{
			//all
				$result3 = pg_execute($link,'sql2payall',array($all,9));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='clientkey'){
					$client_id = $creall->value;
				}
				if($creall->paymentfield =='secretkey'){
					$secretkey = $creall->value;
				}
							
				
			}
			
		}
			
		}else{
			$client_id = $bData['clientkey'];
			$secretkey =  $bData['secretkey'];
		}	
		
	}
	
	$totalamt = round($data->total);

$mp = new MP($client_id ,$secretkey);
$mp->sandbox_mode(TRUE);
$accessToken = $mp->get_access_token();

if($_REQUEST['siteFrom']=="mobile")
{
	$preference = array(
		"items" => array(
			array(
				"id" => $id,
				"title" => "Order-".$id,
				"quantity" => 1,
				"currency_id" => $cityCurrency,
				"unit_price" => $totalamt
			)
		),
		"back_urls" => array(
				"success" => "http://".$_SERVER["HTTP_HOST"]."/confirmation.php",
				"failure" => "http://".$_SERVER["HTTP_HOST"]."/mobile.php",
				"pending" => "http://".$_SERVER["HTTP_HOST"]."/confirmation.php"
		),
		
	);
	
}
else
{
	$preference = array(
		"items" => array(
			array(
				"id" => $id,
				"title" => "Order-".$id,
				"quantity" => 1,
				"currency_id" => $cityCurrency,
				"unit_price" => $totalamt
			)
		),
		"back_urls" => array(
				"success" => "http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/mercadopago/mercadopago_return.php",
				"failure" => "http://".$_SERVER["HTTP_HOST"]."",
				"pending" => "http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/mercadopago/mercadopago_return.php"
		),
		
		
	);
}

$preferenceResult = $mp->create_preference($preference);





 echo $lang_resource['PAYMENT_GATEWAY_ALL_PAYMENT_PROCESSING'];

?>

<!doctype html>
<html>
    <head>
       <!-- <title>MercadoPago SDK - Create Preference and Show Checkout Example</title>-->
  
    </head>
   
   <body onLoad="javascript: document.macro.submit();">
    <form name="macro" action="<?php echo $preferenceResult["response"]["sandbox_init_point"]; ?>" method="post">
  
    </form>
       
    </body>
</html>
