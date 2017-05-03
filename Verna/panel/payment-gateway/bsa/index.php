<?php
 
session_start();
//global $lang_resource;
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
	pg_prepare($link,'sqlmakse121','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlmakse121',array($id));
	$fetchData = pg_fetch_array($search);
	$data=json_decode($fetchData['data']);
	//echo "<pre>";
   // print_r($data);
	$total=$data->total;
	//$total = 1.00;
	$businessid = $data->business[0]->id;
	
	
	/**************************/
	pg_prepare($link,'sqlpayment1'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment1'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	
	
		
	pg_prepare($link,'sqlipn21','SELECT * FROM w_business WHERE id = $1;');
	$searchs = pg_execute($link,'sqlipn21',array($businessid));
	$bData = pg_fetch_array($searchs);


	//select currency code for business city
	$cityID = $bData['city'];
	pg_prepare($link,'sqlccbc1','SELECT currency FROM w_franchises WHERE id = $1;');
	$currency_sql = pg_execute($link,'sqlccbc1',array($cityID));

	$currency_arry = pg_fetch_array($currency_sql);
	if($bData['currency'] != "" || !empty($bData['currency'])){
		$cityCurrency = $bData['currency'];
	}else{
		$cityCurrency = $currency_arry['currency'];
	}
	
	if($panelsetting == 1){	
		$bsapay = $bData['bsapay'];
		$bsachannels = $bData['bsachannels'];
		$bsamerchantcode = $bData['bsamerchantcode'];
		$bsaterminal = $bData['bsaterminal'];
		$bsatransationtype = $bData['bsatransationtype'];
		$bsacurrency = $bData['bsacurrency'];
		
		
	}else{
	
	if(empty($bData['bsachannels'])|| empty($bData['bsamerchantcode']) || empty($bData['bsaterminal']) || empty($bData['bsatransationtype'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall1','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay1'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay1'.$businessid,array($businessid,17));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='bsapay'){
					$bsapay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='bsachannels'){
					$bsachannels = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='bsamerchantcode'){
					$bsamerchantcode = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='bsaterminal'){
					$bsaterminal = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='bsatransationtype'){
					$bsatransationtype = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='bsacurrency'){
					$bsacurrency = $cre->value;
					$flag=false;
				}
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,17));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='bsapay'){
					$bsapay = $creall->value;
				}
				if($creall->paymentfield =='bsachannels'){
					$bsachannels = $creall->value;
				}
				if($creall->paymentfield =='bsamerchantcode'){
					$bsamerchantcode = $creall->value;
				}
				if($creall->paymentfield =='bsaterminal'){
					$bsaterminal = $creall->value;
					
				}
				if($creall->paymentfield =='bsatransationtype'){
					$bsatransationtype = $creall->value;
				}
				if($creall->paymentfield =='bsacurrency'){
					$bsacurrency = $creall->value;
				}
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,17));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='bsapay'){
					$bsapay = $creall->value;
				}
				if($creall->paymentfield =='bsachannels'){
					$bsachannels = $creall->value;
				}
				if($creall->paymentfield =='bsamerchantcode'){
					$bsamerchantcode = $creall->value;
				}
				if($creall->paymentfield =='bsaterminal'){
					$bsaterminal = $creall->value;
					
				}
				if($creall->paymentfield =='bsatransationtype'){
					$bsatransationtype = $creall->value;
				}
				if($creall->paymentfield =='bsacurrency'){
					$bsacurrency = $creall->value;
				}
					
							
			}
				
			}
		}else{		
		$bsapay = $bData['bsapay'];
		$bsachannels = $bData['bsachannels'];
		$bsamerchantcode = $bData['bsamerchantcode'];
		$bsaterminal = $bData['bsaterminal'];
		$bsatransationtype = $bData['bsatransationtype'];
		$bsacurrency = $bData['bsacurrency'];
		}	
		
	}

	
?>
<?php



	// Se incluye la librería

	include 'apiRedsys.php';

	// Se crea Objeto

	$miObj = new RedsysAPI;

		

	// Valores de entrada

	$fuc="992161273";

	$terminal="1";

	$moneda="978";

	$trans="0";

	$url="http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/bsa/success.php?id=".$id;

	$urlOKKO="http://".$_SERVER["HTTP_HOST"]."/panel/payment-gateway/bsa/success.php?id=".$id;

	$id=time();

	$amount=$total*100;

	

	// Se Rellenan los campos

	$miObj->setParameter("DS_MERCHANT_AMOUNT",$amount);

	$miObj->setParameter("DS_MERCHANT_ORDER",strval($id));

	$miObj->setParameter("DS_MERCHANT_MERCHANTCODE",$fuc);

	$miObj->setParameter("DS_MERCHANT_CURRENCY",$moneda);

	$miObj->setParameter("DS_MERCHANT_TRANSACTIONTYPE",$trans);

	$miObj->setParameter("DS_MERCHANT_TERMINAL",$terminal);

	$miObj->setParameter("DS_MERCHANT_MERCHANTURL",$url);

	$miObj->setParameter("DS_MERCHANT_URLOK",$urlOKKO);		

	$miObj->setParameter("DS_MERCHANT_URLKO",$urlOKKO);



	//Datos de configuración

	$version="HMAC_SHA256_V1";

	$kc = '5W9zd2VmJpJ4fbCU4tKDW/VH/1LWjBY+';//Clave recuperada de CANALES

	// Se generan los parámetros de la petición

	$request = "";

	$params = $miObj->createMerchantParameters();

	$signature = $miObj->createMerchantSignature($kc);


 

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Secure Payment Form</title>
<link rel="stylesheet" href="css/bootstrap-min.css">
<link rel="stylesheet" href="css/bootstrap-formhelpers-min.css" media="screen">
<link rel="stylesheet" href="css/bootstrapValidator-min.css"/>
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
<link rel="stylesheet" href="css/bootstrap-side-notes.css" />
<style type="text/css">
.col-centered {
    display:inline-block;
    float:none;
    text-align:left;
    margin-right:-4px;
}
.row-centered {
	margin-left: 9px;
	margin-right: 9px;
}

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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/bootstrap-min.js"></script>
<script src="js/bootstrap-formhelpers-min.js"></script>
<script type="text/javascript" src="js/bootstrapValidator-min.js"></script>
<script type="text/javascript" src="ufcValidator.js"></script>
<script type="text/javascript" src="globalpay.js"></script>
 <script>
   
    function submitGlobalForm() {
		document.getElementById("formglobal").submit();
    }
  </script>
<link rel="stylesheet" type="text/css" href="css/css.css">
</head>
<body onLoad="submitGlobalForm();">

 <div id="preloader"></div>
 <h3><?=$lang_resource['PAYMENT_GATEWAY_ALL_PAYMENT_PROCESSING']?></h3>
 <form id="formglobal" name="frm" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST" >

<input type="hidden" name="Ds_SignatureVersion" value="<?php echo $version; ?>"/></br>

<input type="hidden" name="Ds_MerchantParameters" value="<?php echo $params; ?>"/></br>

<input type="hidden" name="Ds_Signature" value="<?php echo $signature; ?>"/></br>

<!--<input type="submit" value="Enviar" >-->

</form>

</body>

</html>
