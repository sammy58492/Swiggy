<?php
  function GetLangFile($lang){
    $lang_file = 'lang.'.$lang.'.php';
    return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
  }
  function FetchAllsettingsCustomOrg(){
    include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
    pg_prepare($link,'sql3','SELECT * from w_configs ');
    $result = pg_execute($link,'sql3',array());
    //$settings = array();
    while($row = pg_fetch_array($result)){
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
  
   function sciptName($script_id)
   { 
    include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
    pg_prepare($link,'sqlSwnm','SELECT * from w_switch_script where id=$1 ');
       $scriptResult = pg_execute($link,'sqlSwnm',array($script_id));	   
	   $scriptname = pg_fetch_array($scriptResult);
	  
    return   $scriptname['name'];
  }
  
  if($script_id ==1){
	$_SESSION['scriptid']=0;
	} else {
    $_SESSION['scriptid']=$script_id;
	}
  
    function thmeName($theme_id)
   { 
    include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
    pg_prepare($link,'sqlSwth','SELECT * from w_switch_script_theme where id=$1 ');
       $scriptResult = pg_execute($link,'sqlSwth',array($theme_id));	   
	   $scriptname = pg_fetch_array($scriptResult);
	  
    return   $scriptname['name'];
  }
  $script_id = $_REQUEST['script_id'];
  $theme_id = $_REQUEST['theme_id'];
  $DeviceType = $_REQUEST['device'];
  
  $moduleName = sciptName($script_id);
  $theme_name = thmeName($theme_id);

  /*if(isset($_GET['l']) && $_GET['l'] != '')
    $lang_file = GetLangFile($_GET['l']);
  else*/
    $lang_file = GetLangFile('en');

  $lang_resource = langFetching($_SESSION['lang']);
  $records = FetchAllsettingsCustomOrg();
  include_once $lang_file;

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

  pg_close($link);
 
   $page_link = $moduleName."/".$DeviceType."/theme/".$theme_name."/templates";
   $module_common_js = $moduleName."/js/";
   $module_image_link = "panel/".$moduleName."/".$DeviceType."/theme/".$theme_name."/assets";
 

if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/javascript; charset: UTF-8");
include('md5.js');
include('../'.$page_link.'/isMobile.js');
include('front.js');
include('../'.$page_link.'/WhereAmIBox.js');
include('front_switch.js');
include('shopping.js');
include('../payment-gateway/maksekeskus/maksekeskus.js');
include('../payment-gateway/voguepay/voguepay.js');

include('../payment-gateway/skrill/skrill.js');

include('../payment-gateway/pxpay/pexpress.js');
include('../payment-gateway/transactium/transactium.js');
include('../payment-gateway/paypal/paypal.js');
include('../payment-gateway/paypaladaptive/paypaladaptive.js');
include('../payment-gateway/mercadopago/mercadopago.js');
include('productoption.js');
include('adsmanager.js');
include('tags.js');
include('../'.$page_link.'/front-visuals.js');
include('browserdetect.js');
include('../'.$page_link.'/popup.js');
include('social.js');
include('../'.$page_link.'/front-forms.js');
include('product-options-forms.js');
include('uploader.js');
include('googlemap.js');
include('../'.$moduleName.'/autopopulate.js');
include('howbox.js');
include('tip.js');
include('multipleinput.js');
include('jquery.sticky-kit.js');
include('jCarouselLite.js');
include('dishscrollbar.js');
include('../'.$page_link.'/myaccount.js');
include('../'.$page_link.'/checkouts.js');
include('../'.$page_link.'/menu-list.js');
include('../'.$page_link.'/business-list.js');
include('../'.$page_link.'/payment.js');

include('teakewaymap.js');


include('../payment-gateway/braintreepayments/braintree.js');
include('../payment-gateway/authorizenet/authorizenet.js');
include('../payment-gateway/worldpay/merchant.js');
include('../payment-gateway/mercury/mercury.js');
include('../payment-gateway/payeezy/payeezy.js');

include('../'.$moduleName.'/cms/mobile-cms.js');
include('../'.$page_link.'/extra_include_js.php');

ob_end_flush();

?>
