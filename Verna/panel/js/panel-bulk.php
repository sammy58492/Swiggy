<?php
function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}
//Time selection settings. 
function FetchAllsettingsCustomOrg()
       {
      include_once $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
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

// Get language from get or put default as en
$lang_file;
if(isset($_GET['l']) && $_GET['l'] != '')
	$lang_file = GetLangFile($_GET['l']);
else
	$lang_file = GetLangFile('en');
//Time selection settings. 	
$records = FetchAllsettingsCustomOrg();	
// Include the selected language file
include_once $lang_file;

if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/javascript; charset: UTF-8");
switch($_GET['u'])
	{
	case '0':
		include('jquery-ui.js');
		include('sms.js');
		include('../payment-gateway/mercadopago/mercadopago.js');
		include('superadmin.php');
		include('franchises.php');
		include('ads.js');
		include('discountcode.js');
		include('discountoffer.js');
		include('deliverybykm.js');
		include('users.php');
		include('business.php');
		include('panel.php');
		include('browserdetect.js');
		include('multipleinput.js');
		include('draggableaccordion.js');
		include('popup_panel.js');
		include('uploader.js');
		include('googlemap_panel.js');
		include('forms.js');
		include('panel-visuals.php');
		include('switch.js');
		include('orders.js');
		include('zipbusiness.js');
		include('galleryimg.js');
		include('ziplisteachbusiness.js');
		include('deliveryzone.js');
		include('footerpages.js');
		include('logoImage.js');
		include('frontimage_upload.js');
		include('jquery-flot.js');
		include('statistics.php');
		include('drivermanager.php');
		include('drivergroup.php');
		include('driver.php');
		include('splitpayment.js');
		include('printerset.js');
		include('invoicedtl.js'); 
		include('makepayment.js'); 
		include('../cms/panel_cms.js');
		
		
	break;
	case '1':
		include('jquery-ui.js');
		include('admin.php');
		include('users.php');
		include('business.php');
		include('panel.php');
		include('discountcode.js');
		include('discountoffer.js');
		include('browserdetect.js');
		include('multipleinput.js');
		include('draggableaccordion.js');
		include('popup_panel.js');
		include('uploader.js');
		include('googlemap.js');
		include('forms.js');
		include('panel-visuals.php');
		include('switch.js');
		include('orders.js');
		include('jquery-flot.js');
		include('statistics.php');
		include('makepayment.js'); 
		include('zipbusiness.js');
		include('invoicedtl.js'); 
	    include('ziplisteachbusiness.js');
	break;
	case '2':
		include('jquery-ui.js');
		include('provider.php');
		include('business.php');
		include('panel.php');
		include('browserdetect.js');
		include('multipleinput.js');
		include('discountcode.js');
		include('discountoffer.js');
		include('draggableaccordion.js');
		include('popup_panel.js');
		include('uploader.js');
		include('googlemap.js');
		include('forms.js');
		include('panel-visuals.php');
		include('switch.js');
		include('orders.js');
		include('splitpayment.js');
		include('printerset.js');
		include('makepayment.js'); 
		include('zipbusiness.js');
		include('invoicedtl.js'); 
	    include('ziplisteachbusiness.js');
		
	break;
	case '4':
		include('jquery-ui.js');
		include('driver-front.php');
		include('panel.php');
		include('browserdetect.js');
		include('multipleinput.js');
		include('draggableaccordion.js');
		include('popup_panel.js');
		include('uploader.js');
		include('googlemap.js');
		include('forms.js');
		include('panel-visuals.php');
		include('switch.js');
		include('orders.js');
		include('driver.php');
	break;
	case '5':
		include('jquery-ui.js');
		include('drivermanager-front.php');
		include('panel.php');
		include('browserdetect.js');
		include('multipleinput.js');
		include('draggableaccordion.js');
		include('popup_panel.js');
		include('uploader.js');
		include('googlemap.js');
		include('forms.js');
		include('panel-visuals.php');
		include('switch.js');
		include('orders.js');
		include('drivermanager.php');
		include('drivergroup.php');
		include('driver.php');
	break;
	}
ob_end_flush();
?>
