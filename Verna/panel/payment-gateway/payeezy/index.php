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

	$total=$data->total;
	
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
	
		$payeezyapikey = $bData['payeezyapikey'];
		$payeezyapisecret = $bData['payeezyapisecret'];
		$payeezyjssecurity = $bData['payeezyjssecurity'];
		$payeezymerchant = $bData['payeezymerchant'];
		
	}else{
	
	if(empty($bData['payeezyapikey'])|| empty($bData['payeezyapisecret']) || empty($bData['payeezyjssecurity']) || empty($bData['payeezymerchant'])){
		
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			pg_prepare($link,'sql2pay'.$businessid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$businessid,array($businessid,15));
			if(pg_num_rows($result2)>0){
			$row = pg_fetch_array($result2);			
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='payeezyapikey'){
					$payeezyapikey = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='payeezyapisecret'){
					$payeezyapisecret = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='payeezyjssecurity'){
					$payeezyjssecurity = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='payeezymerchant'){
					$payeezymerchant = $cre->value;
					$flag=false;
				}
				
								
			}
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,15));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='payeezyapikey'){
					$payeezyapikey = $creall->value;
				}
				if($creall->paymentfield =='payeezyapisecret'){
					$payeezyapisecret = $creall->value;
				}
				if($creall->paymentfield =='payeezyjssecurity'){
					$payeezyjssecurity = $creall->value;
				}
				if($creall->paymentfield =='payeezymerchant'){
					$payeezymerchant = $creall->value;
				}
				
					
							
			}
			}
			
			
			}else{
				
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,15));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='payeezyapikey'){
					$payeezyapikey = $creall->value;
				}
				if($creall->paymentfield =='payeezyapisecret'){
					$payeezyapisecret = $creall->value;
				}
				if($creall->paymentfield =='payeezyjssecurity'){
					$payeezyjssecurity = $creall->value;
				}
				if($creall->paymentfield =='payeezymerchant'){
					$payeezymerchant = $creall->value;
				}
			
				
							
			}
				
			}
		}else{		
			
			$payeezyapikey = $bData['payeezyapikey'];
			$payeezyapisecret = $bData['payeezyapisecret'];
			$payeezyjssecurity = $bData['payeezyjssecurity'];
			$payeezymerchant = $bData['payeezymerchant'];
		}	
		
	}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Payeezy JS Sample file - Generate token method -
  sample_v3.2.html</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<meta name="layout" content="main" />

<style>
.line-separator {
  height: .2px;
  background: #717171;
  border-bottom: 1px solid #d3d3d3;
}
</style>

<!-- Payeezy JS and jquery reference Java-script files   -->
<script src="jquery-1.11.3.min.js" type="text/javascript"></script>
<script src="payeezy_v3.2.js" type="text/javascript"></script>

<script type="text/javascript">

    <!-- handling response from Payeezy server -->
    var responseHandler = function(status, response) {
   /* alert(status);
    alert(JSON.stringify(response));*/
        var $form = $('#payment-info-form');
        $('#someHiddenDiv').hide();
        if (status != 201) {
             if (response.error && status != 400) {
               var error = response["error"];
               var errormsg = error["messages"];
               var errorcode = JSON.stringify(errormsg[0].code, null, 4);
               var errorMessages = JSON.stringify(errormsg[0].description, null, 4); 
               $('#payment-errors').html( 'Error Code:' + errorcode + ', Error Messages:'
                                + errorMessages);
            }
            if (status == 400 || status == 500) {
               $('#payment-errors').html('');
               var errormsg = response.Error.messages;
               var errorMessages = "";
               for(var i in errormsg){
                var ecode = errormsg[i].code;
                var eMessage = errormsg[i].description;
                errorMessages = errorMessages + 'Error Code:' + ecode + ', Error Messages:'
                                + eMessage;
                }
           
               $('#payment-errors').html( errorMessages);
            }

            $form.find('button').prop('disabled', false);
        } else {
            $('#payment-errors').html('');
      
      var type = response.token.type;
      var value = response.token.value;
      var cardholder_name = response.token.cardholder_name;
      var exp_date = response.token.exp_date;
      var month = exp_date.substr(0, 2);
      var year = exp_date.substr(2, 2);
	  var amount = document.getElementById("amount").value;
	  var currency_code = document.getElementById("currency_code").value;
	   var or_id = document.getElementById("or_id").value;
       /*     $('#response_msg').html('Payeezy response -<br> Token Value: ' + value+'<br> Card Type: ' + type+'<br> Cardholder Name: ' + cardholder_name+'<br> Card Exp Date: ' + month +'-20'+year);
            $('#response_note')
                    .html(
                            " Note: Use this token for authorize and/or purchase transactions. For more details, visit https://developer.payeezy.com/payeezy-api-reference/apis");
            $form.find('button').prop('disabled', false);*/
			window.open('payment_made.php?id='+or_id+'&value='+value+'&type='+type+'&name='+cardholder_name+'&exp_date='+exp_date+'&amount='+amount+'&currency_code='+currency_code,'_self');
        }

    };

    <!-- Building JSON resquest and submitting request to Payeezy sever -->
    jQuery(function($) {
        $('#payment-info-form').submit(function(e) {                    
            $('#response_msg').html('');
            $('#response_note').html('');
            $('#payment-errors').html('');

            var $form = $(this);
            $form.find('button').prop('disabled', true);
            var apiKey = document.getElementById("apikey").value;
            var js_security_key = document.getElementById("js_security_key").value;
			var amount = document.getElementById("amount").value;
			var currency_code = document.getElementById("currency_code").value;
            
            <!-- Setting Key parameters for Payeezy gettoken method --> 
            Payeezy.setApiKey(apiKey);
            Payeezy.setJs_Security_Key(js_security_key);
            Payeezy.setTa_token(ta_token);
            Payeezy.createToken(responseHandler);
            $('#someHiddenDiv').show();
            return false;
        });
    });
</script>

<script type="text/javascript">
<!--
strLocale_loc = new Object();

strLocale_loc.enter_cvc = '<?=$lang_resource['PAYEEZY_GATEWAY_CVC']?>';
strLocale_loc.enter_cid = '<?=$lang_resource['PAYEEZY_GATEWAY_AMEX_CID_CODE']?>';
strLocale_loc.enter_cvc2 = '<?=$lang_resource['PAYEEZY_GATEWAY_CVC2']?>';
strLocale_loc.enter_pin = '<?=$lang_resource['PAYEEZY_GATEWAY_PIN_CODE']?>';
strLocale_loc.enter_name = '<?=$lang_resource['PAYEEZY_GATEWAY_ENTER_NAME']?>';
strLocale_loc.enter_cardnr = '<?=$lang_resource['PAYEEZY_GATEWAY_CARD_NUMBER']?>';
strLocale_loc.enter_expiry = '<?=$lang_resource['PAYEEZY_GATEWAY_EXP_DATE']?>';
strLocale_loc.cvc2_label = '<?=$lang_resource['PAYEEZY_GATEWAY_CVC2_LABEL']?>';
strLocale_loc.pin_label = '<?=$lang_resource['PAYEEZY_GATEWAY_PIN_LEBEL']?>';

if (typeof(window['strLocale']) != 'undefined') {
  strLocale_loc = strLocale;
}
function isNumeric(str){
  for (i = 0; i < str.length; ++i) {
    if (str.charAt(i) < '0' || str.charAt(i) > '9')
       return false;
  }
  return true;
}
function isCvc2Incapable(cardnr) {
    var re = new RegExp('$^');
    if (cardnr && cardnr.match(re))
        return true;
    else
        return false;
}
function isAMEX(str){
  if (str.length < 2) {return false;}
  if (str.charAt(0) == '3'){
    if (str.charAt(1) == '4' || str.charAt(1) == '7')
       return true;
  }
  return false;
}
function cvcCheck(str, cnum){
  var enable_cvc2_incapable_cards = false;
  if (!isNumeric(str)){
     if (enable_cvc2_incapable_cards && isCvc2Incapable(cnum))
         alert(strLocale_loc.enter_pin);
     else
         alert(strLocale_loc.enter_cvc);
     return false;
  }
  if (enable_cvc2_incapable_cards && isCvc2Incapable(cnum)) {
     if (str.length < 4) {
       alert(strLocale_loc.enter_pin);
     } else
       return true;
  } else if (isAMEX(cnum)){
     if (str.length == 4){
        return true;
     } else {
        alert(strLocale_loc.enter_cid);
        return false;
     }
  } else {
    if (str.length == 3) {
        return true;
     } else {
        alert(strLocale_loc.enter_cvc2);
        return false;
     }
  }
}
function FormValidator(form) {
    // HTML formas validacija 
    if (form.cardname.value == '') { 
    alert(strLocale_loc.enter_name); 
    form.cardname.focus();
    return (false); 
    } 
    if (form.cardnr.value.length < 13 || !isNumeric(form.cardnr.value)) { 
    alert(strLocale_loc.enter_cardnr); 
    form.cardnr.focus();
    return (false); 
    } 
    vm = form.validMONTH.value;
    if (vm.length != 2 || (vm!='01'&&vm!='02'&&vm!='03'&&vm!='04'&&vm!='05'&&vm!='06'&&vm!='07'&&vm!='08'&&vm!='09'&&vm!='10'&&vm!='11'&&vm!='12'&&vm!='99')) { 
    alert(strLocale_loc.enter_expiry); 
    form.validMONTH.focus();
    return (false); 
    } 
    if (form.validYEAR.value.length != 2 || !isNumeric(form.validYEAR.value)) { 
    alert(strLocale_loc.enter_expiry); 
    form.validYEAR.focus();
    return (false); 
    } 
    if (!cvcCheck(form.cvc2.value, form.cardnr.value)){
    form.cvc2.focus();
    return (false); 
    } 
  return (true); 
}
function on_cardnr_keyup() {
    var cardnr = document.getElementById('cardnr');
    var cvc2_label = document.getElementById('cvc2_label');
    if (!cvc2_label)
        return;
    if (isCvc2Incapable(cardnr.value)) {
        cvc2_label.innerHTML = strLocale_loc['pin_label'];
    } else {
        cvc2_label.innerHTML = strLocale_loc['cvc2_label'];
    }
}
function get_form(n) {
    if(n<100){
        var form = document.getElementById("cardentry");
        if (form == null){
            n++
            setTimeout("get_form("+n+")",100);
        } else {
            form.setAttribute("onSubmit","return FormValidator(this)");
        }
    }
}
get_form(0)
//-->
</script>


    <script type="text/javascript">
      var cardMessage = '<?=$lang_resource['PAYEEZY_GATEWAY_CARD_NO_ERROR']?>';
      var cardnameMessage = '<?=$lang_resource['PAYEEZY_GATEWAY_CARD_HOLDER_NAME_ERROR']?>';
      var cvcMessage = '<?=$lang_resource['PAYEEZY_GATEWAY_CVC_NUMBER_ERROR']?>';
	  
      function DialogShow(name){
        document.getElementById(name).style.display="block";
      }
      function DialogHide(name){
        document.getElementById(name).style.display="none";
      }
    </script>
<script type="text/javascript" src="ufc-utils.js"></script>
<script type="text/javascript" src="ufcValidator.js"></script>

<link rel="stylesheet" type="text/css" href="css/css.css">


</head>

<body>
<div class="header">
    <div class="logo container">
      <a href="http://beta.orderingonlinesystem.com/"><img alt="TBC Bank" src="../../images/logo/1/normal.jpg"></a>
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
          <img src="images/PayeezyLogo.png">          
        </div>
        <h4 style="color: red">
			<span id="payment-errors"></span>
		</h4>
		<h4 style="color: green">
			<span id="response_msg"></span>
		</h4>
		<h4 style="color: blue">
			<span id="response_note"></span>
		</h4>
		<div id="someHiddenDiv" style="display: none; color: red"><?=$lang_resource['PAYEEZY_GATEWAY_PAYMENT_REQUEST']?>...</div>
        <div class="card-data">
        
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody><tr>
                <td align="center">
                  <form onSubmit="return FormValidator(this)" name="payment-info-form" id="payment-info-form"  method="post" autocomplete="off">
  <input type="hidden" id="or_id" value="<?=$id?>" >

                  <input value="No Cardholdername" id="cardname" name="cardname" autocomplete="off" size="19" maxlength="100" hidden="yes" type="hidden"><table>
          
                  <tbody>
                  <tr style="display:none;">
        <td align="right">API Key :</td>
        <td><input type="text" name="apikey" id="apikey"
          value="<?=$payeezyapikey?>" /></td>
      </tr>
      <tr style="display:none;">
        <td align="right">API Secret :</td>
        <td><input type="text" name="apisecret" id="apisecret"
          value="<?=$payeezyapisecret?>" />
        </td>
      </tr>
      <tr style="display:none;">
        <td align="right">JS Security Key :</td>
        <td><input type="text" name="js_security_key"
          id="js_security_key"
          value="<?=$payeezyjssecurity?>" /></td>
      </tr>
      <tr style="display:none;">
        <td align="right">Merchant Token :</td>
        <td><input type="text" name="token" id="token"
          value="<?=$payeezymerchant?>" /></td>
      </tr>
      <tr style="display:none;">
        <td align="right">Auth :</td>
        <td><select name="auth" id="auth" payeezy-data="auth">
            <option value="false">false</option>
            <option value="true">true</option>
        </select></td>
      </tr>
      <tr style="display:none;">
        <td align="right">TA Token :</td>
        <td><input type="text" name="ta_token" id="ta_token"
          payeezy-data="ta_token" value="NOIW" /></td>
      </tr>

                  <tr>
                    <td><?=$lang_resource['PAYEEZY_INPUT_CARD_HOLDER_NAME']?> : </td>
                    <td><input kl_virtual_keyboard_secure_input="on" class="input_cardn" id="cardholdername" name="cardholdername" autocomplete="off" size="19" type="text" payeezy-data="cardholder_name" ></td>
                    </tr>


                                      <tr>
                                      <td><?=$lang_resource['PAYEEZY_INPUT_CARD_TYPE']?> :<a onMouseOver="" onMouseOut="" class="">&nbsp; &nbsp;
                                            
                                            </a>
                                          </td><td><select class="select_card" payeezy-data="card_type">
                                                  <option value="visa">Visa</option>
                                                  <option value="mastercard">Master Card</option>
                                                  <option value="American Express">American Express</option>
                                                  <option value="discover">Discover</option>
                                      </select></td>
                                      </tr>                                  
                                      
                                      <tr>
                                      <td><?=$lang_resource['PAYEEZY_INPUT_CARD_NUMBER']?> :<a onMouseOver="DialogShow('Dialog_CARD_Modal');" onMouseOut="DialogHide('Dialog_CARD_Modal');" class="Open">&nbsp;?&nbsp;
                                            <div class="Dialog_CARD_Modal" id="Dialog_CARD_Modal">
                                                <div class="hover_header geo"><p>WHAT IS CARD NUMBER</p></div>
                                                <div class="hover_body geo">
                                                    <img src="images/card_number.png" class="hover_header_img">
                                                    <p>Enter 16 digit number displayed on the front face of your card.</p>
                                                </div>
                                            </div>
                                            </a>
                                          </td><td><input kl_virtual_keyboard_secure_input="on" class="input_cardn" onFocus="setClass('cardnr','input_cardn')" onBlur="validateLength('cardnr',16)" onKeyPress="enterOnlyNumber(event)" onKeyUp="checkCurdNumber()" id="cardnr" name="cardnr" autocomplete="off" size="19" maxlength="19" type="text" payeezy-data="cc_number" ></td>
                                      </tr>
                                      
                                      <tr><td> <?=$lang_resource['PAYEEZY_INPUT_CARD_EXP_DATE']?>:</td>
                                      <td><select class="select_m" onkeyup="checkExpMonth()" id="expmonth" name="validMONTH" payeezy-data="exp_month" >
                                      <option selected="selected" value="01">01</option><option value="02">02</option>
                                      <option value="03">03</option><option value="04">04</option>
                                      <option value="05">05</option><option value="06">06</option>
                                      <option value="07">07</option><option value="08">08</option>
                                      <option value="09">09</option><option value="10">10</option>
                                      <option value="11">11</option><option value="12">12</option>
                                      </select> 
                                      <select class="select_y" onkeyup="checkExpYear()" id="expyear" name="validYEAR" payeezy-data="exp_year" >
                                      <option selected="selected" value="15">15</option><option value="16">16</option>
                                      <option value="17">17</option><option value="18">18</option>
                                      <option value="19">19</option><option value="20">20</option>
                                      <option value="21">21</option>
                                      </select> 
                                      <div class="DivMonth">Month</div><div class="DivYear">Year</div>
                                      </td>
                                      </tr>
                                      
                                      <tr><td><?=$lang_resource['PAYEEZY_INPUT_CARD_CVV']?> :<a onMouseOver="DialogShow('Dialog_CCV_Modal');" onMouseOut="DialogHide('Dialog_CCV_Modal');" class="Open" >&nbsp;?&nbsp;
                                                <div class="Dialog_CCV_Modal" id="Dialog_CCV_Modal">
                                                   <div class="hover_header geo"><p>WHAT IS CCV AND CVC</p></div>
                                                   <div class="hover_body geo">
                                                        <img src="images/cvc_on_card.png" class="hover_header_img">
                                                        <p>For Visa And Master Card Enter three digit on the signature strip.</p>
                                                    </div>
                                                </div>
                            
                                        </a></td><td><input class="input_cvc" onFocus="setClass('cvc2','input_cvc')" onBlur="validateLength('cvc2',3)" onKeyPress="enterOnlyNumber(event)" id="cvc2" name="cvc2" autocomplete="off" size="4" maxlength="3" type="text" payeezy-data="cvv_code" ></td>
                                      </tr>
                                      
                                      <tr><td><?=$lang_resource['PAYEEZY_INPUT_AMOUNT']?> :</td><td><input type="text" readonly name="amount" id="amount" value="<?php echo $total;?>" ><?php echo $cityCurrency; ?><input type="hidden" name="currency_code" id="currency_code" value="<?php echo $cityCurrency; ?>" ></td></tr>
                                      
                                      <tr><td colspan="2"><div class="buttons">
                                                            <table>
                                                                <tbody><tr>
                                                                   <td id="generate-token">
                                                                    <button type="submit" class="confirm eng">
                                                                        PAY 
                                                                    </button>
                                                                   </td>
                                                                  </tr>
                                                            </tbody></table>
                                                         </div>
                                        </td></tr>
                 </tbody>
                                 </table>
                 </form>
                 <p></p>
                 </td>
                </tr>
              </tbody></table>
           
            
              
        </div>  
            </div>
        </div>
    </div>
    <div class="main-footer">
    <div class="container">
      <a href="http://<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME']?>/">©2015 <?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME']?></a>
    </div>
  </div>
  
</body>

</html>
