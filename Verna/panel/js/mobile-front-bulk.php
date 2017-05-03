<?php
require $_SERVER['DOCUMENT_ROOT']."/panel/config.php";

function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}
function FetchAllsettingsCustomOrg()
       {
      include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
      $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);
       pg_prepare($link,'sql3','SELECT * from w_configs ');
       $result = pg_execute($link,'sql3',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
       }
	   
	 function langFetching ($langid){ 
include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);
pg_prepare($link,'sqllan3','SELECT * from w_lang_static WHERE langid=$1');
$results = pg_execute($link,'sqllan3',array($langid));
$lang_resource = array();
while($lrow = pg_fetch_array($results)){
  $lankey=$lrow['lang_key'];
  $lang_resource[$lankey] = $lrow['langtext'];
}
return   $lang_resource;
}
 function sciptName($script_id,$theme_id_check)
   { 
    include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
    pg_prepare($link,'sqlSwnm','SELECT * from w_switch_script where id=$1 ');
       $scriptResult = pg_execute($link,'sqlSwnm',array($script_id));	   
	   $scriptname = pg_fetch_array($scriptResult);
	   
	   if($scriptname['name'] == "OOS") {
		   
	if($theme_id_check == "1")
	 $moduleName = "mobile-reservation";
	else if($theme_id_check == "12")
	 $moduleName = "jean-mobile-theme";
	 else if($theme_id_check == "17")
	 $moduleName = "weedpecker-mobile-theme";
	 else if($theme_id_check == "19")
	 $moduleName = "itrue-mobile-theme";
   else if($theme_id_check == "21")
    $moduleName = "savvii-mobile-theme";
 	else if($theme_id_check == "22")
    $moduleName = "dryco-mobile-theme"; 

	}

	 else {
		$moduleName = $scriptname['name'];
		}
	   
	  
    return  $moduleName;
  }
 
// Get language from get or put default as en
$lang_file;
/*if(isset($_GET['l']) && $_GET['l'] != '')
	$lang_file = GetLangFile($_GET['l']);
else
	$lang_file = GetLangFile('en');*/
	
 $lang_file = GetLangFile('en');

  $lang_resource = langFetching($_SESSION['lang']);
  $script_id = $_REQUEST['script_id'];
  $theme_id_check = $_REQUEST['theme_id'];
  $moduleName = sciptName( $script_id,$theme_id_check);	
 
  $records = FetchAllsettingsCustomOrg();
  include_once $lang_file;
	
// Include the selected language file
//include_once $lang_file;



  session_start();

  include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
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



if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/javascript; charset: UTF-8");
include('md5.js');
include('../'.$moduleName.'/isMobile.js');
include('front.js');
include('../'.$moduleName.'/WhereAmIBox.js');
include('shopping.js');
include('../'.$moduleName.'/more.js');
include('../payment-gateway/maksekeskus/maksekeskus.js');
include('../payment-gateway/voguepay/voguepay.js');
include('../payment-gateway/skrill/skrill.js');
include('../payment-gateway/pxpay/pexpress.js');
include('../payment-gateway/transactium/transactium.js');
include('../payment-gateway/paypal/paypal.js');
include('../payment-gateway/paypaladaptive/paypaladaptive.js');
include('../payment-gateway/mercadopago/mercadopago.js');
include('productoption_mobile.js');
include('adsmanager.js');
include('tags.js');
include('../'.$moduleName.'/front-visuals.js');
include('browserdetect.js');
include('../'.$moduleName.'/popup.js');
include('social.js');
include('../'.$moduleName.'/front-forms.js');
include('product-options-forms.js');
include('uploader.js');
include('googlemap.js');
include('../'.$moduleName.'/autopopulate.js');
include('switch.js');
include('howbox.js');
include('tip.js');
include('multipleinput.js');
include('jCarouselLite.js');
include('../'.$moduleName.'/checkouts.js');
include('../'.$moduleName.'/business-list.js');
include('../'.$moduleName.'/menu-list.js');
include('../'.$moduleName.'/myaccount.js');
include('../'.$moduleName.'/payment.js');

include('teakewaymap.js');

include('../'.$moduleName.'/cms/mobile-cms.js');
include('../payment-gateway/braintreepayments/braintree.js');
include('../payment-gateway/authorizenet/authorizenet.js');
include('../payment-gateway/worldpay/merchant.js');
include('../payment-gateway/mercury/mercury.js');
include('../payment-gateway/payeezy/payeezy.js');
include('../payment-gateway/payu/payu.js');
include('../payment-gateway/stripe/stripe.js');
include('../payment-gateway/paypalpro/paypalpro.js');
include('../payment-gateway/paygistix/paygistix.js');
include('../payment-gateway/global/global.js');
include('../payment-gateway/btrans/btrans.js');
include('../payment-gateway/bsa/bsa.js');
include('../payment-gateway/azul/azul.js');
include('../payment-gateway/quickpay/quickpay.js');
include('../payment-gateway/paynl/paynl.js');
include('../payment-gateway/zaakpay/zaakpay.js');
if($theme_id_check == "21"){	
include('../'.$moduleName.'/front-custom.js');	
}
ob_end_flush();
?>
