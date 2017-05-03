<?php 
session_start();
	 global $lang_resource;
include 'WebFramework.inc.php';
include 'TransactFramework.inc.php'; 
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
	
		$p_api_username = $bData['p_api_username'];
		$p_api_password = $bData['p_api_password'];
		$p_api_signature = $bData['p_api_signature'];
		$paypalpro_pay = $bData['paypalpro_pay'];
		
		
	}else{
	
	if(empty($bData['p_api_username'])|| empty($bData['p_api_password']) || empty($bData['p_api_signature'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,19));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='paygistix_username'){
					$paygistix_username = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='paygistix_password'){
					$paygistix_password = $cre->value;
					$flag=false;
				}
				
				if($cre->paymentfield =='paygistix_pay'){
					$paygistix_pay = $cre->value;
					$flag=false;
				}
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,19));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='paygistix_username'){
					$paygistix_username = $creall->value;
				}
				if($creall->paymentfield =='paygistix_password'){
					$paygistix_password = $creall->value;
				}
				if($creall->paymentfield =='paygistix_pay'){
					$paygistix_pay = $creall->value;
				}
				
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,18));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='paygistix_username'){
					$paygistix_username = $creall->value;
				}
				if($creall->paymentfield =='paygistix_password'){
					$paygistix_password = $creall->value;
				}
				if($creall->paymentfield =='paygistix_pay'){
					$paygistix_pay = $creall->value;
				}
				
			
				
							
			}
				
			}
		}else{		
			
			$paygistix_username = $bData['paygistix_username'];
			$paygistix_password = $bData['paygistix_password'];
			$paygistix_pay = $bData['paygistix_pay'];
		
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

<link rel="stylesheet" type="text/css" href="css/css.css">
</head>
<body >
<!-- <div id="preloader"></div>
 <h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>-->


  <?php
  


if (isset($_POST["submit"])) {
	
	$sUserName = 'buypasstest';
	$sPassword = 'Paylogtest1';
	
	// Create instance of TransactionFramework
	$PXTransactObject = new PaygistixTransactClass();
	
    // Define the arguments needed for ProcessCreditCardAuth
    $PCCAuthArgsObject = new ProcessCreditCardArgsClass();
    $PCCAuthArgsObject->CardNum = $_REQUEST [ 'cardnumber' ];
    $PCCAuthArgsObject->ExpDate =  $_POST['select2'].$_POST['select3'];
    $PCCAuthArgsObject->NameOnCard = $_REQUEST [ 'cardholdername' ];	
    $PCCAuthArgsObject->Amount = $_REQUEST [ 'amount' ];

    // Call the ProcessCreditCardAuth method
	$PCCAuthResult = $PXTransactObject->ProcessCreditCardAuth ( $sUserName, $sPassword, $PCCAuthArgsObject );
	
	// Store the PNRef locally for the Force
	$sStoredPNRef = $PCCAuthResult->PNRef;

	
	// FORCE
    $PCCForceArgsObject = new ProcessCreditCardArgsClass();
	$PCCForceArgsObject->CardNum = $_REQUEST [ 'cardnumber' ];
    $PCCForceArgsObject->ExpDate =  $_POST['select2'].$_POST['select3'];
    $PCCForceArgsObject->NameOnCard = $_REQUEST [ 'cardholdername' ];	
    $PCCForceArgsObject->Amount = $_REQUEST [ 'amount' ];
    $PCCForceArgsObject->PNRef = $sStoredPNRef; //a saved PNRef from a previous transaction
	
	// Call the ProcessCreditCardForce method
	$PCCForceResult = $PXTransactObject->ProcessCreditCardForce ( $sUserName, $sPassword, $PCCForceArgsObject );
	

	//print_r($result_array);
	if($PCCAuthResult->Result=="0"){$success=1;}else{ $error=$PCCForceResult->ResponseMessage;}
}
?>

<?php if($success !="")
  {
	  ?>
      <div id="preloader"></div>
      <h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>
      <script>
	  window.open("success.php?id=<?=$_REQUEST['id']?>&txnid=<?=$PCCAuthResult->PNRef?>","_self");
	  </script>
      <?php
  }
 
   ?>



<div class="header">
    <div class="logo container">
      <a href="http://beta.orderingonlinesystem.com/"><img alt="OOS" src="../../images/logo/1/normal.jpg"></a>
    </div>
  </div> 
    <div class="main-header">
    <div class="main-header-left"></div>
    <div class="main-header-center container  geo"><?=$lang_resource['PAYEEZY_GATEWAY_PAYMENT_CARD_DETAILS']?></div>
    <div class="main-header-right"><div class="merger"></div></div>
  </div>  
    <div class="main">
      <div class="container">
       <div class="main-content">
                <div class="content-header-logos">
          <img src="paygistix.png">          
        </div>
        <form action="" method="POST" id="payment-form" class="form-horizontal">
  <div class="row row-centered">
  <div class="col-md-4 col-md-offset-4">
  
  <div class="alert alert-danger" id="a_x200" style="display: none;"> <strong>Error!</strong> <span class="payment-errors"></span> </div>
  <span class="payment-success">
   <?php

   if($error !="")
  {
	echo $error;
	  ?>
    <script>
	  window.open("failure.php?id=<?=$_REQUEST['id']?>&txnid=<?=$PCCAuthResult->PNRef?>","_self");
	  </script>  
  <?php
  }
   ?>
  
  </span>
  <fieldset style="display:none;">

  <!-- Form Name -->
  <legend>Billing Details</legend>
  
  <!-- Street -->
  <div class="form-group">
    <label class="col-sm-4 control-label" for="textinput">Street</label>
    <div class="col-sm-6">
      <input type="text" name="street" placeholder="Street" class="address form-control" value="<?php echo $data->buyer->address; ?>" >
    </div>
  </div>
  
  <!-- City -->
  <div class="form-group">
    <label class="col-sm-4 control-label" for="textinput">City</label>
    <div class="col-sm-6">
      <input type="text" name="city" placeholder="City" class="city form-control" value="<?php echo $data->buyer->cityname; ?>">
    </div>
  </div>
  
  <!-- State -->
  <div class="form-group">
    <label class="col-sm-4 control-label" for="textinput">State</label>
    <div class="col-sm-6">
      <input type="text" name="state" maxlength="65" placeholder="State" class="state form-control" value="<?php echo $data->buyer->cityname; ?>">
    </div>
  </div>
  
  <!-- Postcal Code -->
  <div class="form-group">
    <label class="col-sm-4 control-label" for="textinput">Postal Code</label>
    <div class="col-sm-6">
      <input type="text" name="zip" maxlength="9" placeholder="Postal Code" class="zip form-control" value="<?php echo $data->buyer->zipcode; ?>">
    </div>
  </div>
  
  <!-- Country -->
  <div class="form-group">
    <label class="col-sm-4 control-label" for="textinput">Country</label>
    <div class="col-sm-6"> 
      <input type="text" name="country" placeholder="Country" class="country form-control" value="<?php echo $data->buyer->countryname; ?>" >
    <!--  <div class="country bfh-selectbox bfh-countries" name="country" placeholder="Select Country" data-flags="true" data-filter="true"> </div>-->
    </div>
  </div>
  
  <!-- Email -->
  <div class="form-group">
    <label class="col-sm-4 control-label" for="textinput">Email</label>
    <div class="col-sm-6">
      <input type="text" name="email" maxlength="65" placeholder="Email" class="email form-control" value="<?php echo $data->buyer->email; ?>">
    </div>
  </div>
  </fieldset>
  
  <fieldset>
  
    <legend><?=$lang_resource['PAYMENT_GATEWAY_CARD_DETAILS']?></legend>
    
    <!-- Card Holder Name -->
    <div class="form-group">
      <label class="col-sm-4 control-label"  for="textinput"><?=$lang_resource['PAYMENT_GATEWAY_CARD_HOLDER_NAME']?></label>
      <div class="col-sm-6">
        <input type="text" name="cardholdername" maxlength="70" placeholder="Card Holder Name" class="card-holder-name form-control" value="<?php echo $data->buyer->name; ?>">
      </div>
    </div>
    
    <!-- Card Number -->
    <div class="form-group">
      <label class="col-sm-4 control-label" for="textinput"><?=$lang_resource['PAYMENT_GATEWAY_CARD_NUMBER']?></label>
      <div class="col-sm-6">
        <input type="text" name="cardnumber" maxlength="19" placeholder="Card Number" class="form-control" value="<?php echo $data->buyer->stripecardno; ?>" required>
      </div>
    </div>
      <div class="form-group">
      <label class="col-sm-4 control-label" for="textinput"><?=$lang_resource['PAYMENT_GATEWAY_CARD_TYPE']?></label>
      <div class="col-sm-6">
        <div class="form-inline">
          <select name="cardtype" data-stripe="exp-month" class="card-type stripe-sensitive required form-control" required>
            <option value="Visa" >Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Discover">Discover</option>
            <option value="Amex">Amex</option>
            <option value="JCB">JCB</option>
            <option value="Maestro">Maestro</option>
          </select>
          </div>
        </div>
       </div>
    <!-- Expiry-->
    <div class="form-group">
      <label class="col-sm-4 control-label" for="textinput"><?=$lang_resource['PAYMENT_GATEWAY_CARD_EXPIRY_DATE']?></label>
      <div class="col-sm-6">
        <div class="form-inline">
          <select name="select2" data-stripe="exp-month" class="card-expiry-month stripe-sensitive required form-control" required>
            <option value="01" >01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10" selected="selected">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <span> / </span>
          <select name="select3" data-stripe="exp-year" class="card-expiry-year stripe-sensitive required form-control" required>
           <option value="15">2015</option>
            <option value="16">2016</option>
            <option value="17">2017</option>
            <option value="18">2018</option>
            <option value="19">2019</option>
            <option value="20">2020</option>
          </select>
  <!--        <script type="text/javascript">
            var select = $(".card-expiry-year"),
            year = new Date().getFullYear();
 
            for (var i = 0; i < 12; i++) {
                select.append($("<option value='"+(i + year)+"' "+(i === 0 ? "selected" : "")+">"+(i + year)+"</option>"))
            }
        </script> -->
        </div>
      </div>
    </div>
    
    <!-- CVV -->
    <div class="form-group">
      <label class="col-sm-4 control-label" for="textinput"><?=$lang_resource['PAYMENT_GATEWAY_CVV_NUMBER']?></label>
      <div class="col-sm-3">
        <input type="password"  id="cvv" placeholder="CVV" maxlength="4" class="card-cvc form-control" required >
      </div>
    </div>
     <div class="form-group">
      <label class="col-sm-4 control-label" for="textinput"><?=$lang_resource['PAYMENT_GATEWAY_TOTAL_AMOUNT']?></label>
      <div class="col-sm-3">
    <input type="text" readonly name="amount" id="amount" value="<?php echo $total;?>" ><?php echo $cityCurrency; ?>
    </div>
    </div>
    
     
    <div class="control-group">
      <div class="controls">
        <center>
          <button class="btn btn-success" type="submit" name="submit"><?=$lang_resource['PAYMENT_GATEWAY_PAY_NOW']?></button>
        </center>
      </div>
    </div>
  </fieldset>
</form>
        </div>
        </div>
    </div>
    </div>
    <div class="main-footer">
    <div class="container">
      <a href="http://<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME']?>/">©2015 <?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME']?></a>
     
    </div>
  </div>
  </div>
  
  </div>
  </div>
</body>

</html>
