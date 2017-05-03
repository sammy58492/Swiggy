<?php
/*function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/admin/languages/'.$lang_file;
}*/

function FetchAllsettingsCustomOrg(){

	include_once $_SERVER['DOCUMENT_ROOT'].'/admin/config.php';
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	pg_prepare($link,'sql3','SELECT * from w_configs ');
	$result = pg_execute($link,'sql3',array());

	while($row = pg_fetch_array($result)){

		$id = $row['id'];
		$name =  $row['name'];
		$setting[$name] = $row['value'];

	}
	return $setting;
}
$records = FetchAllsettingsCustomOrg();	

// Get language from get or put default as en
/*$lang_file;
if(isset($_GET['l']) && $_GET['l'] != '')
	$lang_file = GetLangFile($_GET['l']);
else
	$lang_file = GetLangFile('en');
	
// Include the selected language file
include_once $lang_file;*/

  include $_SERVER['DOCUMENT_ROOT'].'/admin/config.php';
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);

	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['admin_lang'] = $row1['id'];
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
  $script_id = $_REQUEST['script_id'];
  $theme_id = $_REQUEST['theme_id'];
  if(isset($_REQUEST['template']) && $_REQUEST['template'] !="" )
  $template = "?template=open";
  else 
  $template = "";
  // Get language from get or put default as en
  $moduleName = sciptName($_REQUEST['script_id']);
  
   $module_common_js = "panel/".$moduleName."/admin/admin_js";
	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_admin');
  $result = pg_execute($link,'sqlfetchlang',array());
  while($row = pg_fetch_array($result)){
	$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['admin_lang']];    
  }
  
if($script_id ==1){
	$_SESSION['scriptid']=0;
	} else {
    $_SESSION['scriptid']=$script_id;
	}

 

if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/javascript; charset: UTF-8");
switch($_GET['u'])
	{
	case '0':

		include('browserdetect.js');
		include('bootstrap-datepicker.js');
		include('switch.js');
		include('panel-visuals.php');
		include('panel.php');
		include('jquery.bpopup.min.js');
		include('popup.js');
		include('forms.js');
		include('multipleinput.js');
		include('googlemap.js');	
		include('draggableaccordion.js');	
		
		


		/*For Orders*/
		include('jquery.dataTables.min.js');
		include('bootstrap.datatable.js');
		include('orders.js');
		/*For Orders print*/
		include('order_print.js');

		/*For Booking*/
		include('bookings.js');
		
		/* For Business */
	    include('business.js');		
	    include('invoicesettings.js');
		//Tab1
		include('resturant_info.js');		
		//Tab2
		include('deliveryzone.js');
		include('deliverybykm.js');
		include('ziplisteachbusiness.js');
		//include('ziplisteachbusiness.js');
		include('deliverycity.js');
		//Tab3
		include('catagories.js');
		//Tab4
		include('product_option.js');
		//Tab5
		include('products.js');
		//Tab6
		include('menu-catalog.js');
		include('schedule.js');
		//Tab7
		include('galleryimg.js');
		//Tab8
		include('order_notification.js');
		//Tab9
		include('Order_reservation.js');
		//Tab10
		include('MetaSeo.js');
		//Tab11
		include('apps_notification.js');
		//Tab12
		include('businesswidgets.js');
		include('reviews_settings.js');
		/* For Business */
		

		/* For My Invoice */
		include('myinvoice.js');
		/* For My Invoice */

		/* For Invoice */
		include('invoiceconfiguration.js');
		
		/* For Invoice */

		/* For Discount Codes */
		include('discountcode.js');
		/* For Discount Codes */
		
		/* For Automatic Discount Codes */
		include('discountoffer.js');
		/* For Automatic Discount Codes */


		
			/*For Business Review*/
		include('Business_Review.js');
		/*For Business Review*/
		include('business_photo.js');

		/* For City-Admin */
		include('franchises.php');
		/* For City-Admin */

		/* For Users */
		include('users.js');
		/* For Users */

		/*For Driver*/
		include('driversection.js');
		include('drivermanager.js');
		include('drivergroup.js');
		include('driver.js');
		/*For Driver*/
		
		/*For MultiDeliveryzone*/
		include('multideliveryzonesection.js');
		include('DeliveryzoneByMap.js');
		include('deliveryzonebykm.js');
		include('multideliverybyzip.js');
		/*For MultiDeliveryzone*/
		include('MultiDeliveryNeighborhoodSection.js');
		/* For Ads */
		include('ads.js');
		/* For Ads */
		
		/*Statistics Tab*/
		
		/*Statistics Tab*/
		/*Statistics Tab*/
		include('searchstatisticsnew.js');
		/*Statistics Tab*/
		/*Statistics Tab*/
		include('statistics.js');
		include('jquery-flot.js');
		/*Statistics Tab*/

		/* For My profile */
		include('myprofile.js');
		/* For My profile */

		/* For CMS */		
		include('panel_cms.js');
		/* For CMS */
		
		/* For Landing Page Settings */
		include('landingpage.js');
		//include('landingreport.js');
		/* For Landing Page Settings */
		/* For Config */
		include('sitesetting.js');
		include('sitesection.js');
		include('gprs.js');
		include('permissionuser.js');
		include('SplitPayment.js');		
		include('site_schedule.js');
		include('SiteScheduleText.js');
		include('SpecialEnterprise.js');		
		include('configapps.js');
		include('SiteSwitchingSettings.js');	
		include ('item_point_settings.js');

		//Template Settings
		include('Website.js');
		include('Logoimage.js');
		include('HomeHeader.js');
		include('FrontPage.js');
		include('searchbox.js');
		include('FooterPage.js');
		include('businesspage.js');
		include('businesspage.js');
		include('checkoutdetails.js');
		include('SitePageSettings.js');
		include('DigitsDecimalSettings.js');
		include('EmergencyNoSettings.js');
		include('maps.js');
		include('PaginationSettings.js');

		//Payment Gateway
		include('paymentgateway_settings.js');

		include('PanelSetting.js');
		// for widget  start
		include('widgetSetting.js');
		include('widgetSettingFinal.js');
		// for widget end
		/* For Config */
		include('neighborhood.js');
		include('countrysettings.js');
		include('soundnotification.js');
		/* For Language Settings */
		include('languagesettings.js');
		/* For Language Settings */
		
		/* For Manage Language*/
		include('managelanguage.js');
		include('adminlanguage.js');
		include('lang.js');
		include('MultiDeliveryNeighborhoodSection.js');
		/* For Manage Language*/
		
		
		/* For request collection*/
		include('requestcollection.js');
		/* For request collection */
		
		/* For printer path*/
		include('printerpath.js');
		/* For printer path */
		/* For zipcode pattern*/
		include('ZipcodePattern.js');
		/* For zipcode pattern*/
		/*For Item Point Permission*/
		//include('item_point_settings.js');
		/*For Item Point Permission*/
		/*For Global Item Point */
		include('global_point_settings.js');
		/*For Global Item Point */
		/*For Point Settings */
		include('pointsettings.js');
		/*For Point Settings */
		/*For User Points settings*/
		include('userspoint.js');



		include('commision.js');
		/*create order for admin panel*/
		include('createorder.js');
		include('adminproductoption.js');
		if($moduleName !="front-reservation" && $moduleName !="mobile-reservation" ) {
		include('../../panel/'.$moduleName.'/admin/admin_js/extra_include_script_js.php');
		}
		
		include('../../panel/payment-gateway/skrill/skrill.js');
		include('../../panel/payment-gateway/transactium/transactium.js');
		include('../../panel/payment-gateway/pxpay/pexpress.js');
		include('../../panel/payment-gateway/maksekeskus/maksekeskus.js');
		include('../../panel/payment-gateway/voguepay/voguepay.js');
		include('../../panel/payment-gateway/payeezy/payeezy.js');
		include('../../panel/payment-gateway/mercadopago/mercadopago.js');
		include('../../panel/payment-gateway/paypal/paypal.js');
		include('../../panel/payment-gateway/paypaladaptive/paypaladaptive.js');
		
		include('../../panel/payment-gateway/braintreepayments/braintree.js');
		include('../../panel/payment-gateway/authorizenet/authorizenet.js');
		include('../../panel/payment-gateway/worldpay/merchant.js');
		include('../../panel/payment-gateway/mercury/mercury.js');
	break;
	
	case '1':

		include('browserdetect.js');
		include('bootstrap-datepicker.js');
		include('switch.js');
		include('panel-visuals.php');
		include('panel.php');
		include('jquery.bpopup.min.js');
		include('popup.js');
		include('forms.js');
		include('multipleinput.js');
		include('googlemap.js');
		include('draggableaccordion.js');

		include('admin.php');
		/* For My profile */
		include('myprofile.js');
		/* For My profile */
		/*For Orders*/
		include('jquery.dataTables.min.js');
		include('bootstrap.datatable.js');
		include('orders.js');
		/*For Orders print*/
		include('order_print.js');

		/*For Booking*/
		include('bookings.js');

		/* For Business */
	    include('business.js');	
	    include('invoicesettings.js');
		//Tab1
		include('resturant_info.js');		
		//Tab2
		include('deliveryzone.js');
		include('deliverybykm.js');
		include('ziplisteachbusiness.js');
		//Tab3
		include('catagories.js');
		//Tab4
		include('product_option.js');
		//Tab5
		include('products.js');
		//Tab6
		include('menu-catalog.js');
		include('schedule.js');
		//Tab7
		include('galleryimg.js');
		//Tab8
		include('order_notification.js');
		//Tab9
		include('Order_reservation.js');
		//Tab10
		include('MetaSeo.js');
		//Tab11
		include('apps_notification.js');
		//Tab12
		include('reviews_settings.js');
		/* For Business */

		/* For Users */
		include('users.js');
		/* For Users */
		/*Statistics Tab*/
		
		include('searchstatisticsnew.js');
		/*Statistics Tab*/	
		
		/*Statistics Tab*/
		include('statistics.js');
		include('jquery-flot.js');
		/*Statistics Tab*/


		/* For Discount Codes */
		include('discountcode.js');
		/* For Discount Codes */
		
		/* For Automatic Discount Codes */
		include('discountoffer.js');
		/* For Automatic Discount Codes */

      /* For printer path*/
		include('printerpath.js');
		/* For printer path */
    /* For zipcode pattern*/
		include('ZipcodePattern.js');
		/* For zipcode pattern*/
		include('createorder.js');
		
	break;
	
	case '2':
		include('browserdetect.js');
		include('bootstrap-datepicker.js');
		include('switch.js');
		include('panel-visuals.php');
		include('panel.php');
		include('jquery.bpopup.min.js');
		include('popup.js');
		include('forms.js');
		include('multipleinput.js');
		include('googlemap.js');
		include('draggableaccordion.js');
		
		include('provider.php');

		/*For Orders*/
		include('jquery.dataTables.min.js');
		include('bootstrap.datatable.js');
		include('orders.js');
		/*For Orders print*/
		include('order_print.js');

		/*For Booking*/
		include('bookings.js');
		
		/* For Business */
	    include('business.js');
	    include('invoicesettings.js');
		//Tab1
		include('resturant_info.js');		
		//Tab2
		include('deliveryzone.js');
		include('deliverybykm.js');
		include('ziplisteachbusiness.js');
		//Tab3
		include('catagories.js');
		//Tab4
		include('product_option.js');
		//Tab5
		include('products.js');
		//Tab6
		include('menu-catalog.js');
		include('schedule.js');
		//Tab7
		include('galleryimg.js');
		//Tab8
		include('order_notification.js');
		//Tab9
		include('Order_reservation.js');
		//Tab10
		include('MetaSeo.js');
		//Tab11
		include('apps_notification.js');
		//Tab12
		include('reviews_settings.js');
		
		/* For Business */

		/* For My Invoice */
		include('myinvoice.js');
		/* For My Invoice */
		
		/* For Discount Codes */
		include('discountcode.js');
		/* For Discount Codes */
		
		/* For Automatic Discount Codes */
		include('discountoffer.js');
		/* For Automatic Discount Codes */
		
		
		/* For Users */
		include('users.js');
		/* For Users */
		
		/*Statistics Tab*/
		include('statistics.js');
		include('jquery-flot.js');
		/*Statistics Tab*/
		
		include('soundnotification.js');
		/* For My profile */
		include('myprofile.js');
		include('MultiDeliveryNeighborhoodSection.js');
		/* For My profile */
		
		/* For printer path*/
		include('printerpath.js');
		/* For printer path */
/* For zipcode pattern*/
		include('ZipcodePattern.js');
		/* For zipcode pattern*/
			/*create order for admin panel*/
		include('createorder.js');			
			
	break;
	
	case '4':
		include('browserdetect.js');
		include('bootstrap-datepicker.js');
		include('switch.js');
		include('panel-visuals.php');
		include('panel.php');
		include('jquery.bpopup.min.js');
		include('popup.js');
		include('forms.js');
		include('driver-front.php');
		include('orders.js');
		/* For My profile */
		include('driverMyprofile.js');
		/* For My profile */
	break;
	
	case '5':
		include('panel.php');
		include('browserdetect.js');
		include('bootstrap-datepicker.js');
		include('switch.js');
		include('panel-visuals.php');		
		include('jquery.bpopup.min.js');
		include('popup.js');
		include('forms.js');
		include('drivermanager-front.php');
		include('orders.js');
		
		include('multipleinput.js');
		
		/*Driver*/
		include('driversection.js');
		include('drivergroup.js');
		include('driver.js');
		/*Driver*/

		/* For My profile */
		include('drivermanagerMyprofile.js');
		/* For My profile */

	break;
	
	}
ob_end_flush();
?>
