<?php
 
session_start();
global $lang_resource;
$id = $_REQUEST["id"];
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
	
		$acceptglobal = $bData['acceptglobal'];
		$global_pay = $bData['global_pay'];
		$global_sresecureid = $bData['global_sresecureid'];
		$global_password = $bData['global_password'];
		
		
	}else{
	
	if(empty($bData['acceptglobal'])|| empty($bData['global_pay']) || empty($bData['global_sresecureid']) || empty($bData['global_password'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall1','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay1'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay1'.$businessid,array($businessid,20));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='global_pay'){
					$global_pay = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='global_sresecureid'){
					$global_sresecureid = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='global_password'){
					$global_password = $cre->value;
					$flag=false;
				}
				
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,20));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='global_pay'){
					$global_pay = $creall->value;
				}
				if($creall->paymentfield =='global_sresecureid'){
					$global_sresecureid = $creall->value;
				}
				if($creall->paymentfield =='global_password'){
					$global_password = $creall->value;
				}
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall1',array($all,20));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='global_pay'){
					$global_pay = $creall->value;
				}
				if($creall->paymentfield =='global_sresecureid'){
					$global_sresecureid = $creall->value;
				}
				if($creall->paymentfield =='global_password'){
					$global_password = $creall->value;
				}
			
				
							
			}
				
			}
		}else{		
			
			$global_pay = $bData['global_pay'];
			$global_sresecureid = $bData['global_sresecureid'];
			$global_password = $bData['global_password'];
		}	
		
	}

	
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
 <h3>Payment Processing................................</h3>
 
<form name="formglobal" id="formglobal" method="post" action="https://safe.gtpaysecure.net/securepayments/a1/cc_collection.php" style="display:none;">
    <input type="hidden" name="CRESecureID"  value="<?=$global_sresecureid?>" />
    <input type="hidden" name="return_url"          value="https://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/global/success.php?id=<?=$id?>" />
    <input type="hidden" name="content_template_url"         value="https://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/global/payment.php" />
    <input type="hidden" name="sess_id" value="e91dd8af53j35k072s0bubjtn7" />
    <input type="hidden" name="sess_name" value="session" />
    <input type="hidden" name="allowed_types"          value="Visa|MasterCard|American Express" />
    <p>
      <label>Order Amount:
        <input type="text" name="total_amt" value="<?=$total?>" />
      </label>
    </p>
  
    <p>
      <label>Order  ID:
        <input type="hidden" name="order_id" value="<?=$id?>" />
      </label>
    </p>
    <input type="hidden" name="lang" value="en_US" />
    <p>
      <label>Street Address:
        <input type="hidden" name="customer_address" value="<?php echo $data->buyer->address.', '.$data->buyer->cityname.', '.$data->buyer->countryname; ?>" />
      </label>
    </p>
    <p>
      <label>Email Address:
        <input type="hidden" name="customer_email" value="<?php echo $data->buyer->email; ?>" />
      </label>
    </p>
    <p>
      <label>Phone Number:
        <input type="hidden" name="customer_phone" value="<?php echo $data->buyer->tel; ?>"/>
      </label>
    </p>
    <p>
      <label>Postal Code: 
        <input type="hidden" name="customer_postal_code" value="<?php echo $data->buyer->zipcode; ?>" />
    
      </label>
    </p>
    <p>
<!--      <label style="display:none;">
        <input type="submit" name="submit" value="Submit" />
      </label>-->
    </p>
  </form>
</body>

</html>
