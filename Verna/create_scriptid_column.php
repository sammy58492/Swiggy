<?php
error_reporting(0);
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
	require('panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
	{
		die('Database Connection fail go to panel/config.php');
	}
	else
	{
		return $link;
	}
}



/*function TableExist($link,$tablename) {

pg_prepare($link,'sqlTable'.$tablename,"select count(*) from pg_class where relname=$1 and relkind=$2");
$exist_tbl = pg_execute($link,'sqlTable'.$tablename,array($tablename,'r'));
$exist_tbl =pg_fetch_array($exist_tbl);
return $exist_tbl;
}*/


/*----------------------------- table and fields creation start -----------------------------*/
function columnExist($link,$tablename,$columnname) {
pg_prepare($link,'sqlADDCOLs'.$tablename.$columnname,"SELECT column_name  FROM information_schema.columns WHERE table_name=$1 and column_name=$2");
    $chk_record = pg_execute($link,'sqlADDCOLs'.$tablename.$columnname,array($tablename,$columnname));
	$fetch_record =  pg_fetch_array($chk_record);
	return $fetch_record;
	}	
function ColumnAddText($link,$tablename,$columnname) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname text");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	
	}		
function ColumnAddInteger($link,$tablename,$columnname) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname integer default 0");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	
	}	
function ColumnAddBoolean($link,$tablename,$columnname) {
	pg_prepare($link,'sqlBOOLCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname boolean default false");
    $result = pg_execute($link,'sqlBOOLCOL'.$tablename.$columnname,array());
	}
function TimestampWithoutTimeZone($link,$tablename,$columnname) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname timestamp without time zone");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	}

if(isset($_POST["submit"]))
{
	//echo "<center>Table and Data Created and Inserted Successfully</center>"; 


$link = ConnectDB();
		
require('panel/config.php');
$user_name  = $CFG->dbuser;
	
$w_account = columnExist($link,'w_account','scriptid');
$w_ads = columnExist($link,'w_ads','scriptid');
$w_bringg_driver = columnExist($link,'w_bringg_driver','scriptid');
$w_business = columnExist($link,'w_business','scriptid');
$w_business_photos = columnExist($link,'w_business_photos','scriptid');
$w_business_points = columnExist($link,'w_business_points','scriptid');
$w_categories = columnExist($link,'w_categories','scriptid');
$w_checkout = columnExist($link,'w_checkout','scriptid');



$w_contactus = columnExist($link,'w_contactus','scriptid');
$w_countries = columnExist($link,'w_countries','scriptid');
$w_delivary_neighborhood = columnExist($link,'w_delivary_neighborhood','scriptid');
$w_deliverykm = columnExist($link,'w_deliverykm','scriptid');
$w_deliveryzone = columnExist($link,'w_deliveryzone','scriptid');
$w_discount = columnExist($link,'w_discount','scriptid');
$w_discountoffer = columnExist($link,'w_discountoffer','scriptid');
$w_dishes = columnExist($link,'w_dishes','scriptid');
$w_driver = columnExist($link,'w_driver','scriptid');
$w_drivergroup = columnExist($link,'w_drivergroup','scriptid');
$w_drivermanager = columnExist($link,'w_drivermanager','scriptid');
$w_extras = columnExist($link,'w_extras','scriptid');
$w_extras_options = columnExist($link,'w_extras_options','scriptid');
$w_favbus = columnExist($link,'w_favbus','scriptid');
$w_footer = columnExist($link,'w_footer','scriptid');
$w_footercms = columnExist($link,'w_footercms','scriptid');
$w_franchises = columnExist($link,'w_franchises','scriptid');

$w_gallery = columnExist($link,'w_gallery','scriptid');
$w_gcm = columnExist($link,'w_gcm','scriptid');
$w_invoice = columnExist($link,'w_invoice','scriptid');
$w_invoiceconf = columnExist($link,'w_invoiceconf','scriptid');
$w_lang_admin = columnExist($link,'w_lang_admin','scriptid');
$w_lang_static = columnExist($link,'w_lang_static','scriptid');
$w_makepayment = columnExist($link,'w_makepayment','scriptid');
$w_menus = columnExist($link,'w_menus','scriptid');
$w_neighborhood = columnExist($link,'w_neighborhood','scriptid');
$w_order_request = columnExist($link,'w_order_request','scriptid');
$w_orders = columnExist($link,'w_orders','scriptid');
$w_paymentgateway = columnExist($link,'w_paymentgateway','scriptid');
$w_paymentgateway_details = columnExist($link,'w_paymentgateway_details','scriptid');
$w_paypal_payments = columnExist($link,'w_paypal_payments','scriptid');
$w_printer_model = columnExist($link,'w_printer_model','scriptid');
$w_printerpath = columnExist($link,'w_printerpath','scriptid');
$w_requestcollectiondeliveryfee = columnExist($link,'w_requestcollectiondeliveryfee','scriptid');
$w_reserve = columnExist($link,'w_reserve','scriptid');
$w_reserve_book = columnExist($link,'w_reserve_book','scriptid');
$w_reserve_chart = columnExist($link,'w_reserve_chart','scriptid');
$w_review = columnExist($link,'w_review','scriptid');
$w_search_statistic = columnExist($link,'w_search_statistic','scriptid');
$w_splitpaymain = columnExist($link,'w_splitpaymain','scriptid');


$w_user_extras = columnExist($link,'w_user_extras','scriptid');
$w_user_points = columnExist($link,'w_user_points','scriptid');
$w_users = columnExist($link,'w_users','scriptid');
$w_zipcode = columnExist($link,'w_zipcode','scriptid');
$w_zipcodevalidation = columnExist($link,'w_zipcodevalidation','scriptid');

if($w_account['column_name'] == '' ) {
ColumnAddInteger($link,'w_account','scriptid');
}
if($w_ads['column_name'] == '' ) {
ColumnAddInteger($link,'w_ads','scriptid');
}
if($w_bringg_driver['column_name'] == '' ) {
ColumnAddInteger($link,'w_bringg_driver','scriptid');
}
if($w_business['column_name'] == '' ) {
ColumnAddInteger($link,'w_business','scriptid');
}
if($w_business_photos['column_name'] == '' ) {
ColumnAddInteger($link,'w_business_photos','scriptid');
}
if($w_business_points['column_name'] == '' ) {
ColumnAddInteger($link,'w_business_points','scriptid');
}
if($w_categories['column_name'] == '' ) {
ColumnAddInteger($link,'w_categories','scriptid');
}
if($w_checkout['column_name'] == '' ) {
ColumnAddInteger($link,'w_checkout','scriptid');
}

if($w_contactus['column_name'] == '' ) {
ColumnAddInteger($link,'w_contactus','scriptid');
}
if($w_countries['column_name'] == '' ) {
ColumnAddInteger($link,'w_countries','scriptid');
}
if($w_delivary_neighborhood['column_name'] == '' ) {
ColumnAddInteger($link,'w_delivary_neighborhood','scriptid');
}
if($w_deliverykm['column_name'] == '' ) {
ColumnAddInteger($link,'w_deliverykm','scriptid');
}
if($w_deliveryzone['column_name'] == '' ) {
ColumnAddInteger($link,'w_deliveryzone','scriptid');
}
if($w_discount['column_name'] == '' ) {
ColumnAddInteger($link,'w_discount','scriptid');
}
if($w_discountoffer['column_name'] == '' ) {
ColumnAddInteger($link,'w_discountoffer','scriptid');
}
if($w_dishes['column_name'] == '' ) {
ColumnAddInteger($link,'w_dishes','scriptid');
}
if($w_driver['column_name'] == '' ) {
ColumnAddInteger($link,'w_driver','scriptid');
}
if($w_drivergroup['column_name'] == '' ) {
ColumnAddInteger($link,'w_drivergroup','scriptid');
}
if($w_drivermanager['column_name'] == '' ) {
ColumnAddInteger($link,'w_drivermanager','scriptid');
}
if($w_extras['column_name'] == '' ) {
ColumnAddInteger($link,'w_extras','scriptid');
}
if($w_extras_options['column_name'] == '' ) {
ColumnAddInteger($link,'w_extras_options','scriptid');
}
if($w_favbus['column_name'] == '' ) {
ColumnAddInteger($link,'w_favbus','scriptid');
}
if($w_footer['column_name'] == '' ) {
ColumnAddInteger($link,'w_footer','scriptid');
}
if($w_footercms['column_name'] == '' ) {
ColumnAddInteger($link,'w_footercms','scriptid');
}
if($w_franchises['column_name'] == '' ) {
ColumnAddInteger($link,'w_franchises','scriptid');
}

if($w_gallery['column_name'] == '' ) {
ColumnAddInteger($link,'w_gallery','scriptid');
}
if($w_gcm['column_name'] == '' ) {
ColumnAddInteger($link,'w_gcm','scriptid');
}
if($w_invoice['column_name'] == '' ) {
ColumnAddInteger($link,'w_invoice','scriptid');
}
if($w_invoiceconf['column_name'] == '' ) {
ColumnAddInteger($link,'w_invoiceconf','scriptid');
}
if($w_lang_admin['column_name'] == '' ) {
ColumnAddInteger($link,'w_lang_admin','scriptid');
}
if($w_lang_static['column_name'] == '' ) {
ColumnAddInteger($link,'w_lang_static','scriptid');
}
if($w_makepayment['column_name'] == '' ) {
ColumnAddInteger($link,'w_makepayment','scriptid');
}
if($w_menus['column_name'] == '' ) {
ColumnAddInteger($link,'w_menus','scriptid');
}
if($w_neighborhood['column_name'] == '' ) {
ColumnAddInteger($link,'w_neighborhood','scriptid');
}
if($w_order_request['column_name'] == '' ) {
ColumnAddInteger($link,'w_order_request','scriptid');
}
if($w_orders['column_name'] == '' ) {
ColumnAddInteger($link,'w_orders','scriptid');
}
if($w_paymentgateway['column_name'] == '' ) {
ColumnAddInteger($link,'w_paymentgateway','scriptid');
}
if($w_paymentgateway_details['column_name'] == '' ) {
ColumnAddInteger($link,'w_paymentgateway_details','scriptid');
}
if($w_paypal_payments['column_name'] == '' ) {
ColumnAddInteger($link,'w_paypal_payments','scriptid');
}
if($w_printer_model['column_name'] == '' ) {
ColumnAddInteger($link,'w_printer_model','scriptid');
}
if($w_printerpath['column_name'] == '' ) {
ColumnAddInteger($link,'w_printerpath','scriptid');
}
if($w_requestcollectiondeliveryfee['column_name'] == '' ) {
ColumnAddInteger($link,'w_requestcollectiondeliveryfee','scriptid');
}
if($w_reserve['column_name'] == '' ) {
ColumnAddInteger($link,'w_reserve','scriptid');
}
if($w_reserve_book['column_name'] == '' ) {
ColumnAddInteger($link,'w_reserve_book','scriptid');
}
if($w_reserve_chart['column_name'] == '' ) {
ColumnAddInteger($link,'w_reserve_chart','scriptid');
}
if($w_review['column_name'] == '' ) {
ColumnAddInteger($link,'w_review','scriptid');
}
if($w_search_statistic['column_name'] == '' ) {
ColumnAddInteger($link,'w_search_statistic','scriptid');
}
if($w_splitpaymain['column_name'] == '' ) {
ColumnAddInteger($link,'w_splitpaymain','scriptid');
}

if($w_user_extras['column_name'] == '' ) {
ColumnAddInteger($link,'w_user_extras','scriptid');
}
if($w_user_points['column_name'] == '' ) {
ColumnAddInteger($link,'w_user_points','scriptid');
}
if($w_users['column_name'] == '' ) {
ColumnAddInteger($link,'w_users','scriptid');
}
if($w_zipcode['column_name'] == '' ) {
ColumnAddInteger($link,'w_zipcode','scriptid');
}
if($w_zipcodevalidation['column_name'] == '' ) {
ColumnAddInteger($link,'w_zipcodevalidation','scriptid');
}


echo "<center>scriptid column created Successfully</center>"; 
/*----------------------------- All Lang Table and Sequence and Data Insert End -----------------------------*/
}
?>
<center>
<form method="post">
<input type="submit" name="submit" value="Submit" style="width:100px; height:50px; background-color:#0CF;" />
</form>
</center>