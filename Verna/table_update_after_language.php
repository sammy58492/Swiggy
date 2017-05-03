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



function TableExist($link,$tablename) {

pg_prepare($link,'sqlTable'.$tablename,"select count(*) from pg_class where relname=$1 and relkind=$2");
$exist_tbl = pg_execute($link,'sqlTable'.$tablename,array($tablename,'r'));
$exist_tbl =pg_fetch_array($exist_tbl);
return $exist_tbl;
}


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
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname integer");
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
	
$record_deliveryzone_acceptemail = columnExist($link,'w_business','acceptemail');
$record_deliveryzone_acceptgprs = columnExist($link,'w_business','acceptgprs');
$record_deliveryzone_acceptsms = columnExist($link,'w_business','acceptsms');
$record_deliveryzone_acceptinvoice = columnExist($link,'w_business','acceptinvoice');
$record_deliveryzone_sameadd = columnExist($link,'w_business','sameadd');
$record_deliveryzone_acceptpaypaladaptive = columnExist($link,'w_business','acceptpaypaladaptive');
$record_deliveryzone_acceptauthorize = columnExist($link,'w_business','acceptauthorize');
$record_deliveryzone_acceptbraintree = columnExist($link,'w_business','acceptbraintree');
$record_deliveryzone_paypal_type = columnExist($link,'w_business','paypal_type');
$record_deliveryzone_mercury_id = columnExist($link,'w_business','mercury_id');
$record_deliveryzone_mercury_pass = columnExist($link,'w_business','mercury_pass');
$record_deliveryzone_businesspagecustomtext = columnExist($link,'w_business','businesspagecustomtext');
$record_deliveryzone_printer_model = columnExist($link,'w_business','printer_model');
$record_deliveryzone_acceptmercury = columnExist($link,'w_business','acceptmercury');
$record_deliveryzone_acceptworldpay = columnExist($link,'w_business','acceptworldpay');
$record_deliveryzone_last_update_invoice = columnExist($link,'w_business','last_update_invoice');
$record_deliveryzone_accepttransactium = columnExist($link,'w_business','accepttransactium');
$record_deliveryzone_transactiumusername = columnExist($link,'w_business','transactiumusername');
$record_deliveryzone_transactiumpass = columnExist($link,'w_business','transactiumpass');
$record_deliveryzone_transactiumtag = columnExist($link,'w_business','transactiumtag');
$record_deliveryzone_bringgcompanyid = columnExist($link,'w_business','bringgcompanyid');
$record_deliveryzone_acceptpexpress = columnExist($link,'w_business','acceptpexpress');
$record_deliveryzone_pexpressusername = columnExist($link,'w_business','pexpressusername');
$record_deliveryzone_pexpresspass = columnExist($link,'w_business','pexpresspass');
$record_deliveryzone_acceptmaksekeskus = columnExist($link,'w_business','acceptmaksekeskus');
$record_deliveryzone_maksekeskus_pay = columnExist($link,'w_business','maksekeskus_pay');
$record_deliveryzone_maksekeskus_shopid = columnExist($link,'w_business','maksekeskus_shopid');
$record_deliveryzone_maksekeskus_secretkey = columnExist($link,'w_business','maksekeskus_secretkey');
$record_deliveryzone_paypalcurrency = columnExist($link,'w_business','paypalcurrency');
$record_deliveryzone_timezone = columnExist($link,'w_business','timezone');
$record_deliveryzone_currency = columnExist($link,'w_business','currency');
$record_deliveryzone_tax = columnExist($link,'w_business','tax');
$record_deliveryzone_taxtype = columnExist($link,'w_business','taxtype');
$record_deliveryzone_googleanalytic = columnExist($link,'w_business','googleanalytic');
$record_deliveryzone_acceptvoguepay = columnExist($link,'w_business','acceptvoguepay');
$record_deliveryzone_vogue_pay = columnExist($link,'w_business','vogue_pay');
$record_deliveryzone_vogue_merchant_id = columnExist($link,'w_business','vogue_merchant_id');
$record_deliveryzone_bringpermission = columnExist($link,'w_business','bringpermission');
$record_deliveryzone_acceptskrill = columnExist($link,'w_business','acceptskrill');
$record_deliveryzone_skrillemail = columnExist($link,'w_business','skrillemail');
$record_deliveryzone_deliverytime = columnExist($link,'w_business','deliverytime');
$record_deliveryzone_pickuptime = columnExist($link,'w_business','pickuptime');
$record_deliveryzone_acceptpayeezy = columnExist($link,'w_business','acceptpayeezy');
$record_deliveryzone_payeezyapikey = columnExist($link,'w_business','payeezyapikey');
$record_deliveryzone_payeezyapisecret = columnExist($link,'w_business','payeezyapisecret');
$record_deliveryzone_payeezyjssecurity = columnExist($link,'w_business','payeezyjssecurity');
$record_deliveryzone_payeezymerchant = columnExist($link,'w_business','payeezymerchant');
$record_deliveryzone_bringg_userid = columnExist($link,'w_business','bringg_userid');
$record_deliveryzone_bringg_password = columnExist($link,'w_business','bringg_password');
$record_deliveryzone_bringg_address = columnExist($link,'w_business','bringg_address');
$record_deliveryzone_bringg_username = columnExist($link,'w_business','bringg_username');
$record_deliveryzone_bringg_email = columnExist($link,'w_business','bringg_email');
$record_deliveryzone_bring_permission_type = columnExist($link,'w_business','bring_permission_type');
$record_deliveryzone_bring_access_token_live = columnExist($link,'w_business','bring_access_token_live');
$record_deliveryzone_bring_secret_key_live = columnExist($link,'w_business','bring_secret_key_live');
$record_deliveryzone_bring_access_token_test = columnExist($link,'w_business','bring_access_token_test');
$record_deliveryzone_bring_secret_key_test = columnExist($link,'w_business','bring_secret_key_test');
$record_deliveryzone_bring_px_result = columnExist($link,'w_orders','px_result');
$record_deliveryzone_bring_px_userid = columnExist($link,'w_orders','px_userid');
$record_deliveryzone_bringg_company_id = columnExist($link,'w_orders','bringg_company_id');
$record_deliveryzone_driver_bring_id = columnExist($link,'w_orders','driver_bring_id');


if($record_deliveryzone_acceptemail['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptemail');
}

if($record_deliveryzone_acceptgprs['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptgprs');
}

if($record_deliveryzone_acceptsms['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptsms');
}

if($record_deliveryzone_acceptinvoice['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptinvoice');
}

if($record_deliveryzone_sameadd['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','sameadd');
}

if($record_deliveryzone_acceptpaypaladaptive['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptpaypaladaptive');
}

if($record_deliveryzone_acceptauthorize['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptauthorize');
}

if($record_deliveryzone_acceptbraintree['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptbraintree');
}

if($record_deliveryzone_paypal_type['column_name'] == '' ) {
ColumnAddText($link,'w_business','paypal_type');
}

if($record_deliveryzone_mercury_id['column_name'] == '' ) {
ColumnAddText($link,'w_business','mercury_id');
}

if($record_deliveryzone_mercury_pass['column_name'] == '' ) {
ColumnAddText($link,'w_business','mercury_pass');
}

if($record_deliveryzone_businesspagecustomtext['column_name'] == '' ) {
ColumnAddText($link,'w_business','businesspagecustomtext');
}

if($record_deliveryzone_printer_model['column_name'] == '' ) {
ColumnAddText($link,'w_business','printer_model');
}

if($record_deliveryzone_acceptmercury['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptmercury');
}

if($record_deliveryzone_acceptworldpay['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptworldpay');
}

if($record_deliveryzone_last_update_invoice['column_name'] == '' ) {
TimestampWithoutTimeZone($link,'w_business','last_update_invoice');
}

if($record_deliveryzone_accepttransactium['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','accepttransactium');
}

if($record_deliveryzone_transactiumusername['column_name'] == '' ) {
ColumnAddText($link,'w_business','transactiumusername');
}

if($record_deliveryzone_transactiumpass['column_name'] == '' ) {
ColumnAddText($link,'w_business','transactiumpass');
}

if($record_deliveryzone_transactiumtag['column_name'] == '' ) {
ColumnAddText($link,'w_business','transactiumtag');
}

if($record_deliveryzone_bringgcompanyid['column_name'] == '' ) {
ColumnAddText($link,'w_business','bringgcompanyid');
}

if($record_deliveryzone_acceptpexpress['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptpexpress');
}

if($record_deliveryzone_pexpressusername['column_name'] == '' ) {
ColumnAddText($link,'w_business','pexpressusername');
}

if($record_deliveryzone_pexpresspass['column_name'] == '' ) {
ColumnAddText($link,'w_business','pexpresspass');
}

if($record_deliveryzone_acceptmaksekeskus['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptmaksekeskus');
}

if($record_deliveryzone_maksekeskus_pay['column_name'] == '' ) {
ColumnAddText($link,'w_business','maksekeskus_pay');
}

if($record_deliveryzone_maksekeskus_shopid['column_name'] == '' ) {
ColumnAddText($link,'w_business','maksekeskus_shopid');
}

if($record_deliveryzone_maksekeskus_secretkey['column_name'] == '' ) {
ColumnAddText($link,'w_business','maksekeskus_secretkey');
}

if($record_deliveryzone_paypalcurrency['column_name'] == '' ) {
ColumnAddText($link,'w_business','paypalcurrency');
}

if($record_deliveryzone_timezone['column_name'] == '' ) {
ColumnAddText($link,'w_business','timezone');
}

if($record_deliveryzone_currency['column_name'] == '' ) {
ColumnAddText($link,'w_business','currency');
}

if($record_deliveryzone_tax['column_name'] == '' ) {
ColumnAddText($link,'w_business','tax');
}

if($record_deliveryzone_taxtype['column_name'] == '' ) {
ColumnAddInteger($link,'w_business','taxtype');
}

if($record_deliveryzone_googleanalytic['column_name'] == '' ) {
ColumnAddText($link,'w_business','googleanalytic');
}

if($record_deliveryzone_acceptvoguepay['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptvoguepay');
}

if($record_deliveryzone_vogue_pay['column_name'] == '' ) {
ColumnAddText($link,'w_business','vogue_pay');
}

if($record_deliveryzone_vogue_merchant_id['column_name'] == '' ) {
ColumnAddText($link,'w_business','vogue_merchant_id');
}

if($record_deliveryzone_bringpermission['column_name'] == '' ) {
ColumnAddInteger($link,'w_business','bringpermission');
}

if($record_deliveryzone_acceptskrill['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptskrill');
}

if($record_deliveryzone_skrillemail['column_name'] == '' ) {
ColumnAddText($link,'w_business','skrillemail');
}

if($record_deliveryzone_deliverytime['column_name'] == '' ) {
ColumnAddText($link,'w_business','deliverytime');
}

if($record_deliveryzone_pickuptime['column_name'] == '' ) {
ColumnAddText($link,'w_business','pickuptime');
}

if($record_deliveryzone_acceptpayeezy['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','acceptpayeezy');
}

if($record_deliveryzone_payeezyapikey['column_name'] == '' ) {
ColumnAddText($link,'w_business','payeezyapikey');
}

if($record_deliveryzone_payeezyapisecret['column_name'] == '' ) {
ColumnAddText($link,'w_business','payeezyapisecret');
}

if($record_deliveryzone_payeezyjssecurity['column_name'] == '' ) {
ColumnAddText($link,'w_business','payeezyjssecurity');
}

if($record_deliveryzone_payeezymerchant['column_name'] == '' ) {
ColumnAddText($link,'w_business','payeezymerchant');
}

if($record_deliveryzone_bringg_userid['column_name'] == '' ) {
ColumnAddInteger($link,'w_business','bringg_userid');
}

if($record_deliveryzone_bringg_password['column_name'] == '' ) {
ColumnAddText($link,'w_business','bringg_password');
}

if($record_deliveryzone_bringg_address['column_name'] == '' ) {
ColumnAddText($link,'w_business','bringg_address');
}

if($record_deliveryzone_bringg_username['column_name'] == '' ) {
ColumnAddText($link,'w_business','bringg_username');
}

if($record_deliveryzone_bringg_email['column_name'] == '' ) {
ColumnAddText($link,'w_business','bringg_email');
}

if($record_deliveryzone_bring_permission_type['column_name'] == '' ) {
ColumnAddBoolean($link,'w_business','bring_permission_type');
}

if($record_deliveryzone_bring_access_token_live['column_name'] == '' ) {
ColumnAddText($link,'w_business','bring_access_token_live');
}

if($record_deliveryzone_bring_secret_key_live['column_name'] == '' ) {
ColumnAddText($link,'w_business','bring_secret_key_live');
}

if($record_deliveryzone_bring_access_token_test['column_name'] == '' ) {
ColumnAddText($link,'w_business','bring_access_token_test');
}

if($record_deliveryzone_bring_secret_key_test['column_name'] == '' ) {
ColumnAddText($link,'w_business','bring_secret_key_test');
}

if($record_deliveryzone_bring_px_result['column_name'] == '' ) {
ColumnAddText($link,'w_orders','px_result');
}

if($record_deliveryzone_bring_px_userid['column_name'] == '' ) {
ColumnAddText($link,'w_orders','px_userid');
}

if($record_deliveryzone_bringg_company_id['column_name'] == '' ) {
ColumnAddText($link,'w_orders','bringg_company_id');
}

if($record_deliveryzone_driver_bring_id['column_name'] == '' ) {
ColumnAddText($link,'w_orders','driver_bring_id');
}

/*----------------------------- table and fields creation end -----------------------------*/
/*---------------------- Config table testing --------------------------------*/

$fields = array("distanceformat","timeformat","currency","sitescheduletext1","sitescheduletext2","sitescheduletext3","siteschedule","businesspageheadersetting","businesspagefootersetting","businesspagprograssbarsetting","servicefee","defaulttimezone","BRINGG_COMPANY_ID","BRINGG_ACCESS_TOKEN","BRINGG_SECRET_KEY","SET_DRIVER_DELIVERY_TIME","trackingid","panelsetting","adminpermission","businesspermission","ConfigNewData","requestCollectionSettingPaypalType","requestCollectionSettingcity","requestCollectionSettinglocation","requestCollectionSettingPaypal","pagination","BRING_PERMISSION","chatinc","olarklive","requestCollectionSettingenabled","businesspagimagesetting","zipvalmax","zipvalmin	","requestcollectionschedule","specialenterprise","sildersetiings","crazyegg","BRINGG_USER_NAME","BRINGG_ADDRESS","BRINGG_EMAIL","BRINGG_PASSWORD","BRINGG_USER_ID","BRINGG_PERMISSION_EACH_RESTAURANT","BRINGG_PHONE","BRIMG_SECRET_KEY_LIVE","BRING_PERMISSION_TYPE","BRIMG_ACCESS_TOKEN_LIVE","BRIMG_ACCESS_TOKEN_TEST","BRIMG_SECRET_KEY_TEST");
	
foreach($fields as $key){
	//echo $key;
	//echo "<br>";
	
		
	pg_prepare($link,'sql'.$key,'SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql'.$key,array($key));
	$n = pg_num_rows($result);
	if($n > 0)
	{
		//echo "Already Exist";
	}
	else
	{
		//insert query
		pg_prepare($link,'sqlp'.$key,'SELECT MAX(id) as lastid FROM w_configs');
		$result = pg_execute($link,'sqlp'.$key,array());
		$row = pg_fetch_array($result);
		$lastid = $row["lastid"] + 1;
		
		pg_prepare($link,'sqli2'.$key,'INSERT INTO w_configs (id,name,value) VALUES ($1,$2,$3)');
		$result2 = pg_execute($link,'sqli2'.$key,array($lastid,$key,''));		
	}
}

/*----------------------------- table and fields creation End -----------------------------*/







/*----------------------------- All Lang Table and Sequence and Data Insert Start -----------------------------*/


$w_lang_admin_table_exist =TableExist($link,'w_lang_admin') ;

if($w_lang_admin_table_exist['count'] == 0) {

					$sql1 = "CREATE TABLE w_lang_admin (id integer NOT NULL, lang_key text, enabled boolean DEFAULT true, langid integer, langtext_1 text, langtext_2 text,langtext_3 text, langtext_4 text, langtext_5 text, langtext_7 text)";
					
					pg_prepare($link,'sql111',$sql1);
					$result1 = pg_execute($link,'sql111',array());
					
					$sql11 = "ALTER TABLE public.w_lang_admin OWNER TO $user_name";
					pg_prepare($link,'sql1111',$sql11);
					$result11 = pg_execute($link,'sql1111',array());
					
					$sql2 = "CREATE SEQUENCE w_lang_admin_id_seq
						START WITH 1808
						INCREMENT BY 1
						NO MINVALUE
						MAXVALUE 9999
						CACHE 1";
						
					pg_prepare($link,'sql121',$sql2);
					$result12 = pg_execute($link,'sql121',array());
					
					$sql21 = "ALTER TABLE public.w_lang_admin_id_seq OWNER TO $user_name";
					
					pg_prepare($link,'sql211',$sql21);
					$result21 = pg_execute($link,'sql211',array());
}

$w_lang_setting_table_exist =TableExist($link,'w_lang_setting') ;

if($w_lang_setting_table_exist['count'] == 0) {

					$sql3 = "CREATE TABLE w_lang_setting (
						id integer NOT NULL,
						lang_text text,
						opdefault integer,
						enabled boolean DEFAULT true,
						lang_short_code text,
						isimg integer DEFAULT 0
					)";
					
					pg_prepare($link,'sql312',$sql3);
					$result13= pg_execute($link,'sql312',array());
					
					$sql31 = "ALTER TABLE public.w_lang_setting OWNER TO $user_name";
					pg_prepare($link,'sql311',$sql31);
					$result31 = pg_execute($link,'sql311',array());
					
					$sql4 = "CREATE SEQUENCE w_lang_setting_id_seq
						START WITH 2
						INCREMENT BY 1
						NO MINVALUE
						MAXVALUE 99999
						CACHE 1";
						
					pg_prepare($link,'sql411',$sql4);
					$result4 = pg_execute($link,'sql411',array());
					
					
					$sql41 = "ALTER TABLE public.w_lang_setting_id_seq OWNER TO $user_name";
					pg_prepare($link,'sql4111',$sql41);
					$result41 = pg_execute($link,'sql4111',array());
					
					
					pg_prepare($link,'sqli2232','INSERT INTO w_lang_setting (id,lang_text,opdefault,enabled,lang_short_code,isimg) VALUES ($1,$2,$3,$4,$5,$6)');
					$result212 = pg_execute($link,'sqli2232',array('1','English','1','TRUE','ENG','1'));	

}

$w_lang_static_table_exist =TableExist($link,'w_lang_static') ;

if($w_lang_static_table_exist['count'] == 0) {
						$sql5 = "CREATE TABLE w_lang_static (
							id integer NOT NULL,
							lang_key text,
							enabled boolean DEFAULT true,
							langid integer,
							langtext_1 text)";
						pg_prepare($link,'sql511',$sql5);
						$result5 = pg_execute($link,'sql511',array());
						
						$sql51 = "ALTER TABLE public.w_lang_static OWNER TO $user_name";
						pg_prepare($link,'sql5111',$sql51);
						$result51 = pg_execute($link,'sql5111',array());
						
						$sql6 = "CREATE SEQUENCE w_lang_static_id_seq
							START WITH 2122
							INCREMENT BY 1
							NO MINVALUE
							MAXVALUE 99999
							CACHE 1";
						pg_prepare($link,'sql611',$sql6);
						$result6 = pg_execute($link,'sql611',array());
						
						$sql61 = "ALTER TABLE public.w_lang_static_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql6111',$sql61);
						$result61 = pg_execute($link,'sql6111',array());
}


$w_business_lang_table_exist =TableExist($link,'w_business_lang') ;

if($w_business_lang_table_exist['count'] == 0) {
	
						$sql7 = "CREATE TABLE w_business_lang (
							id integer NOT NULL,
							business_id integer NOT NULL,
							lang_id integer NOT NULL,
							name_lang text NOT NULL,
							street_lang text NOT NULL,
							status boolean DEFAULT true,
							colony_lang text
						)";
						pg_prepare($link,'sql7i',$sql7);
						$result7 = pg_execute($link,'sql7i',array());
						
						$sql71 = "ALTER TABLE public.w_business_lang OWNER TO $user_name";
						pg_prepare($link,'sql71i',$sql71);
						$result71 = pg_execute($link,'sql71i',array());
						
						
						$sql8 = "CREATE SEQUENCE w_business_lang_id_seq
							START WITH 1
							INCREMENT BY 1
							NO MINVALUE
							MAXVALUE 9999
							CACHE 1";
						pg_prepare($link,'sql8i',$sql8);
						$result8 = pg_execute($link,'sql8i',array());
						
						$sql81 = "ALTER TABLE public.w_business_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql81i',$sql81);
						$result81 = pg_execute($link,'sql81i',array());


						$sql9 = "CREATE TABLE w_business_meta_seo_lang (
							id integer NOT NULL,
							business_id integer NOT NULL,
							lang_id integer NOT NULL,
							promotion_lang text,
							abusiness_lang text,
							status boolean DEFAULT true
						)";
						pg_prepare($link,'sql9i',$sql9);
						$result9 = pg_execute($link,'sql9i',array());
						
						$sql91 = "ALTER TABLE public.w_business_meta_seo_lang OWNER TO $user_name";
						pg_prepare($link,'sql91i',$sql91);
						$result91 = pg_execute($link,'sql91i',array());
						
						
						$sql10 = "CREATE SEQUENCE w_business_meta_seo_lang_id_seq
							START WITH 1
							INCREMENT BY 1
							NO MINVALUE
							MAXVALUE 9999
							CACHE 1";
						pg_prepare($link,'sql10i',$sql10);
						$result10 = pg_execute($link,'sql10i',array());
						
						$sql101 = "ALTER TABLE public.w_business_meta_seo_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql101i',$sql101);
						$result101 = pg_execute($link,'sql101i',array());





	pg_prepare($link,'sqlse','SELECT * FROM w_business');
	$resultse = pg_execute($link,'sqlse',array());
	$n = pg_num_rows($resultse);
	if($n > 0)
	{
		while($row = pg_fetch_array($resultse))
		{
			$i++;
			pg_prepare($link,'sqllastid'.$i,"SELECT nextval('w_business_lang_id_seq') as key");
			$result_lang_id = pg_execute($link,'sqllastid'.$i,array());
			$row_lang_id = pg_fetch_array($result_lang_id);
			
			$id = $row_lang_id['key'];
			
			$buss_id = $row['id'];
			$name =  $row['name'];
			$street =  $row['street'];
			$colony =  $row['colony'];
			$promotion_lang =  $row['promotion']; 
			$abusiness_lang =  $row['abusiness']; 
			
			pg_prepare($link,'sqliw_b_lan'.$id,'INSERT INTO w_business_lang (id,business_id,lang_id,name_lang,street_lang,status,colony_lang) VALUES ($1,$2,$3,$4,$5,$6,$7)');
$result_b_lan = pg_execute($link,'sqliw_b_lan'.$id,array($id,$buss_id,'1',$name,$street,'TRUE',$colony));	
			
			pg_prepare($link,'sqllastid1'.$i,"SELECT nextval('w_business_meta_seo_lang_id_seq') as key");
			$result_seo_lang_id = pg_execute($link,'sqllastid1'.$i,array());
			$row_seo_lang_id = pg_fetch_array($result_seo_lang_id);
			
			$lastid = $row_seo_lang_id['key'];
			
			pg_prepare($link,'sqliw_seob_lan'.$id,'INSERT INTO w_business_meta_seo_lang (id,business_id,lang_id,promotion_lang,abusiness_lang,status) VALUES ($1,$2,$3,$4,$5,$6)');
$result_b_lan = pg_execute($link,'sqliw_seob_lan'.$id,array($id,$buss_id,'1',$promotion_lang,$abusiness_lang,'TRUE'));
		
		}
		
		
	}
	else
	{
		echo "No Data Found in w_business";
	}
}


$w_ads_lang_table_exist =TableExist($link,'w_ads_lang') ;

if($w_ads_lang_table_exist['count'] == 0) {
	
						$sql13 = "CREATE TABLE w_ads_lang (
									id integer NOT NULL,
									ads_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									status boolean DEFAULT true
								)";
						pg_prepare($link,'sql13i',$sql13);
						$result13 = pg_execute($link,'sql13i',array());
						
						$sql13alt = "ALTER TABLE public.w_ads_lang OWNER TO $user_name";
						pg_prepare($link,'sql13alti',$sql13alt);
						$result11alt = pg_execute($link,'sql13alti',array());
						
						
						$sql14 = "CREATE SEQUENCE w_ads_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";
						pg_prepare($link,'sql14i',$sql14);
						$result14sq = pg_execute($link,'sql14i',array());
						
						$sql14alt = "ALTER TABLE public.w_ads_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql14alti',$sql14alt);
						$resultsql14alt = pg_execute($link,'sql14alti',array());




						pg_prepare($link,'sqladsse','SELECT * FROM w_ads');
						$resultadsse = pg_execute($link,'sqladsse',array());
						$n = pg_num_rows($resultadsse);
						if($n > 0)
						{
							while($row_ads = pg_fetch_array($resultadsse))
							{
								$i++;
								pg_prepare($link,'sqllastadsid'.$i,"SELECT nextval('w_ads_lang_id_seq') as key");
								$result_ads_id = pg_execute($link,'sqllastadsid'.$i,array());
								$row_ads_id = pg_fetch_array($result_ads_id);
								
								$id = $row_ads_id['key'];
								
								$ads_id = $row_ads['id'];
								$ads_name =  $row_ads['name'];
								$enabled =  $row_ads['enabled'];
								
								
								pg_prepare($link,'sqliw_ads_lan'.$id,'INSERT INTO w_ads_lang (id,ads_id,lang_id,name_lang,status) VALUES ($1,$2,$3,$4,$5)');
					$result_ads_lan = pg_execute($link,'sqliw_ads_lan'.$id,array($id,$ads_id,'1',$ads_name,$enabled));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_ads";
						}
}





$w_categories_lang_table_exist =TableExist($link,'w_categories_lang') ;

if($w_categories_lang_table_exist['count'] == 0) {
	
						$sql11 = "CREATE TABLE w_categories_lang (
								id integer NOT NULL,
								categories_id integer NOT NULL,
								lang_id integer NOT NULL,
								name_lang text NOT NULL,
								status boolean DEFAULT true,
								business_id integer NOT NULL)";
						pg_prepare($link,'sql11i',$sql11);
						$result11 = pg_execute($link,'sql11i',array());
						
						$sql11alt = "ALTER TABLE public.w_categories_lang OWNER TO $user_name";
						pg_prepare($link,'sql11alti',$sql11alt);
						$result11alt = pg_execute($link,'sql11alti',array());
						
						
						$sql12 = "CREATE SEQUENCE w_categories_lang_id_seq
								START WITH 1
								INCREMENT BY 1
								NO MINVALUE
								MAXVALUE 9999
								CACHE 1";
						pg_prepare($link,'sql12i',$sql12);
						$result12sq = pg_execute($link,'sql12i',array());
						
						$sql12alt = "ALTER TABLE public.w_categories_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql12alti',$sql12alt);
						$resultsql12alt = pg_execute($link,'sql12alti',array());




						pg_prepare($link,'sqlcatse','SELECT * FROM w_categories');
						$resultcatse = pg_execute($link,'sqlcatse',array());
						$n = pg_num_rows($resultcatse);
						if($n > 0)
						{
							while($row_cat = pg_fetch_array($resultcatse))
							{
								$i++;
								pg_prepare($link,'sqllastcatid'.$i,"SELECT nextval('w_categories_lang_id_seq') as key");
								$result_cat_id = pg_execute($link,'sqllastcatid'.$i,array());
								$row_cat_id = pg_fetch_array($result_cat_id);
								
								$id = $row_cat_id['key'];
								
								$cat_id = $row_cat['id'];
								$cat_name =  $row_cat['name'];
								$business =  $row_cat['business'];
								
								
								pg_prepare($link,'sqliw_cat_lan'.$id,'INSERT INTO w_categories_lang (id,categories_id,lang_id,name_lang,status,business_id) VALUES ($1,$2,$3,$4,$5,$6)');
					$result_cat_lan = pg_execute($link,'sqliw_cat_lan'.$id,array($id,$cat_id,'1',$cat_name,'TRUE',$business));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_categories";
						}
}


$w_countries_lang_table_exist =TableExist($link,'w_countries_lang') ;
if($w_countries_lang_table_exist['count'] == 0) {
	
						$sql15 = "CREATE TABLE w_countries_lang (
									id integer NOT NULL,
									country_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									status boolean DEFAULT true
								)";
						pg_prepare($link,'sql15i',$sql15);
						$result15 = pg_execute($link,'sql15i',array());
						
						$sql15alt = "ALTER TABLE public.w_countries_lang OWNER TO $user_name";
						pg_prepare($link,'sql15alti',$sql15alt);
						$result15alt = pg_execute($link,'sql15alti',array());
						
						
						$sql16 = "CREATE SEQUENCE w_countries_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 999999
									CACHE 1";
						pg_prepare($link,'sql16i',$sql16);
						$result16sq = pg_execute($link,'sql16i',array());
						
						$sql16alt = "ALTER TABLE public.w_countries_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql16alti',$sql16alt);
						$resultsql16alt = pg_execute($link,'sql16alti',array());


						pg_prepare($link,'sqlcntryse','SELECT * FROM w_countries');
						$resultcntryse = pg_execute($link,'sqlcntryse',array());
						$n = pg_num_rows($resultcntryse);
						
						if($n > 0)
						{
							pg_prepare($link,'sqliw_cntry_lan','INSERT INTO w_countries_lang (id,country_id,lang_id,name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							while($row_cntry = pg_fetch_array($resultcntryse))
							{
								$i++;
								pg_prepare($link,'sqllastcntryid'.$i,"SELECT nextval('w_countries_lang_id_seq') as key");
								$result_cntry_id = pg_execute($link,'sqllastcntryid'.$i,array());
								$row_cntry_id = pg_fetch_array($result_cntry_id);
								
								$id = $row_ads_id['key'];
								
								$cntry_id = $row_cntry['id'];
								$cntry_name = $row_cntry['name'];
								
								
								
								
							    $result_cntry_lan = pg_execute($link,'sqliw_cntry_lan',array($id,$cntry_id,'1',$cntry_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_countries";
						}
}


$w_delivary_neighborhood_lang_table_exist =TableExist($link,'w_delivary_neighborhood_lang') ;
if($w_delivary_neighborhood_lang_table_exist['count'] == 0) {
	
						$sql17 = "CREATE TABLE w_delivary_neighborhood_lang (
										id integer NOT NULL,
										neighborhood_id integer NOT NULL,
										lang_id integer NOT NULL,
										zone_name_lang text NOT NULL,
										status boolean DEFAULT true
									)";
						pg_prepare($link,'sql17i',$sql17);
						$result17 = pg_execute($link,'sql17i',array());
						
						$sql17alt = "ALTER TABLE public.w_delivary_neighborhood_lang OWNER TO $user_name";
						pg_prepare($link,'sql17alti',$sql17alt);
						$result17alt = pg_execute($link,'sql17alti',array());
						
						
						$sql18 = "CREATE SEQUENCE w_delivary_neighborhood_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";
						pg_prepare($link,'sql18i',$sql18);
						$result18sq = pg_execute($link,'sql18i',array());
						
						$sql18alt = "ALTER TABLE public.w_delivary_neighborhood_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql18alti',$sql18alt);
						$resultsql18alt = pg_execute($link,'sql18alti',array());


						pg_prepare($link,'sqlnigse','SELECT * FROM w_delivary_neighborhood');
						$resultnigse = pg_execute($link,'sqlnigse',array());
						$n = pg_num_rows($resultnigse);
						
						if($n > 0)
						{
							while($row_nig = pg_fetch_array($resultnigse))
							{
								$i++;
								pg_prepare($link,'sqllastnigid'.$i,"SELECT nextval('w_delivary_neighborhood_lang_id_seq') as key");
								$result_nig_id = pg_execute($link,'sqllastnigid'.$i,array());
								$row_nig_id = pg_fetch_array($result_nig_id);
								
								$id = $row_nig_id['key'];
								
								$row_nig_id = $row_nig['id'];
								$row_nig_name = $row_nig['zone_name'];
								
								
								
								pg_prepare($link,'sqliw_nig_lan'.$id,'INSERT INTO w_delivary_neighborhood_lang (id,neighborhood_id,lang_id,zone_name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_nig_lan = pg_execute($link,'sqliw_nig_lan'.$id,array($id,$row_nig_id,'1',$row_nig_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_countries";
						}
}

$w_deliverykm_lang_table_exist =TableExist($link,'w_deliverykm_lang') ;
if($w_deliverykm_lang_table_exist['count'] == 0) {
	
						$sql19 = "CREATE TABLE w_deliverykm_lang (
									id integer NOT NULL,
									deliverykm_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									status boolean DEFAULT true
								)";
						pg_prepare($link,'sql19i',$sql19);
						$result19 = pg_execute($link,'sql19i',array());
						
						$sql19alt = "ALTER TABLE public.w_deliverykm_lang OWNER TO $user_name";
						pg_prepare($link,'sql19alti',$sql19alt);
						$result19alt = pg_execute($link,'sql19alti',array());
						
						
						$sql20 = "CREATE SEQUENCE w_deliverykm_lang_id_seq
								START WITH 1
								INCREMENT BY 1
								NO MINVALUE
								MAXVALUE 9999
								CACHE 1";
						pg_prepare($link,'sql20i',$sql20);
						$result20sq = pg_execute($link,'sql20i',array());
						
						$sql20alt = "ALTER TABLE public.w_deliverykm_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql20alti',$sql20alt);
						$resultsql20alt = pg_execute($link,'sql20alti',array());


						pg_prepare($link,'sqldlvse','SELECT * FROM w_deliverykm');
						$resultdlvse = pg_execute($link,'sqldlvse',array());
						$n = pg_num_rows($resultdlvse);
						
						if($n > 0)
						{
							while($row_dlv = pg_fetch_array($resultdlvse))
							{
								$i++;
								pg_prepare($link,'sqllastdlvid'.$i,"SELECT nextval('w_deliverykm_lang_id_seq') as key");
								$result_dlv_id = pg_execute($link,'sqllastdlvid'.$i,array());
								$row_dlv_id = pg_fetch_array($result_dlv_id);
								
								$id = $row_dlv_id['key'];
								
								$row_dlv_id = $row_dlv['id'];
								$row_dlv_name = $row_dlv['name'];
								
								
								
								pg_prepare($link,'sqliw_dlv_lan'.$id,'INSERT INTO w_deliverykm_lang (id,deliverykm_id,lang_id,name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_nig_lan = pg_execute($link,'sqliw_dlv_lan'.$id,array($id,$row_dlv_id,'1',$row_dlv_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_deliverykm_lang";
						}
}

$w_deliveryzone_lang_table_exist =TableExist($link,'w_deliveryzone_lang') ;
if($w_deliveryzone_lang_table_exist['count'] == 0) {
	
						$sql21 = "CREATE TABLE w_deliveryzone_lang (
										id integer NOT NULL,
										deliveryzone_id integer NOT NULL,
										lang_id integer NOT NULL,
										zonename_lang text NOT NULL,
										address_lang text NOT NULL,
										status boolean DEFAULT true
									)";
						pg_prepare($link,'sql21i',$sql21);
						$result21 = pg_execute($link,'sql21i',array());
						
						$sql21alt = "ALTER TABLE public.w_deliveryzone_lang OWNER TO $user_name";
						pg_prepare($link,'sql21alti',$sql21alt);
						$result21alt = pg_execute($link,'sql21alti',array());
						
						
						$sql22 = "CREATE SEQUENCE w_deliveryzone_lang_id_seq
								START WITH 1
								INCREMENT BY 1
								NO MINVALUE
								MAXVALUE 9999
								CACHE 1";
						pg_prepare($link,'sql22i',$sql22);
						$result22sq = pg_execute($link,'sql22i',array());
						
						$sql22alt = "ALTER TABLE public.w_deliveryzone_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql22alti',$sql22alt);
						$resultsql22alt = pg_execute($link,'sql22alti',array());


						pg_prepare($link,'sqldlgse','SELECT * FROM w_deliveryzone');
						$resultdlgse = pg_execute($link,'sqldlgse',array());
						$n = pg_num_rows($resultdlgse);
						
						if($n > 0)
						{
							while($row_dlg = pg_fetch_array($resultdlgse))
							{
								$i++;
								pg_prepare($link,'sqllastdlgid'.$i,"SELECT nextval('w_deliveryzone_lang_id_seq') as key");
								$result_dlg_id = pg_execute($link,'sqllastdlgid'.$i,array());
								$row_dlg_id = pg_fetch_array($result_dlg_id);
								
								$id = $row_dlg_id['key'];
								
								$row_dlg_id = $row_dlg['id'];
								$row_dlg_name = $row_dlg['zonename'];
								$row_dlg_address = $row_dlg['address'];
								
								
								
								pg_prepare($link,'sqliw_dlg_lan'.$id,'INSERT INTO w_deliveryzone_lang (id,deliveryzone_id,lang_id,	zonename_lang,address_lang,status) VALUES ($1,$2,$3,$4,$5,$6)');
							    $result_dlg_lan = pg_execute($link,'sqliw_dlg_lan'.$id,array($id,$row_dlg_id,'1',$row_dlg_name,$row_dlg_address,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_deliveryzone";
						}
}


$w_discountoffer_lang_table_exist =TableExist($link,'w_discountoffer_lang') ;
if($w_discountoffer_lang_table_exist['count'] == 0) {
	
						$sql23 = "CREATE TABLE w_discountoffer_lang (
									id integer NOT NULL,
									disoffer_id integer NOT NULL,
									lang_id integer NOT NULL,
									discounttext_lang text NOT NULL,
									status boolean DEFAULT true
								)";
						pg_prepare($link,'sql23i',$sql23);
						$result23 = pg_execute($link,'sql23i',array());
						
						$sql23alt = "ALTER TABLE public.w_discountoffer_lang OWNER TO $user_name";
						pg_prepare($link,'sql23alti',$sql23alt);
						$result23alt = pg_execute($link,'sql23alti',array());
						
						
						$sql24 = "CREATE SEQUENCE w_discountoffer_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";
									
									
						pg_prepare($link,'sql24i',$sql24);
						$result24sq = pg_execute($link,'sql24i',array());
						
						$sql24alt = "ALTER TABLE public.w_discountoffer_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql24alti',$sql24alt);
						$resultsql24alt = pg_execute($link,'sql24alti',array());


						pg_prepare($link,'sqlwdlse','SELECT * FROM w_discountoffer');
						$resultwdlse = pg_execute($link,'sqlwdlse',array());
						$n = pg_num_rows($resultwdlse);
						
						if($n > 0)
						{
							while($row_wdl = pg_fetch_array($resultwdlse))
							{
								$i++;
								pg_prepare($link,'sqllastwdlid'.$i,"SELECT nextval('w_discountoffer_lang_id_seq') as key");
								$result_wdl_id = pg_execute($link,'sqllastwdlid'.$i,array());
								$row_wdl_id = pg_fetch_array($result_wdl_id);
								
								$id = $row_wdl_id['key'];
								
								$row_wdl_id = $row_wdl['id'];
								$row_wdl_name = $row_wdl['discounttext'];
								
								
								
								pg_prepare($link,'sqliw_wdl_lan'.$id,'INSERT INTO w_discountoffer_lang (id,disoffer_id,lang_id,	discounttext_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_wdl_lan = pg_execute($link,'sqliw_wdl_lan'.$id,array($id,$row_wdl_id,'1',$row_wdl_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_discountoffer";
						}
}

$w_dishes_lang_table_exist =TableExist($link,'w_dishes_lang') ;
if($w_dishes_lang_table_exist['count'] == 0) {
	
						$sql25 = "CREATE TABLE w_dishes_lang (
									id integer NOT NULL,
									dishes_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NULL,
									description_lang text NULL,
									status boolean DEFAULT true
								)";
						pg_prepare($link,'sql25i',$sql25);
						$result25 = pg_execute($link,'sql25i',array());
						
						$sql25alt = "ALTER TABLE public.w_dishes_lang OWNER TO $user_name";
						pg_prepare($link,'sql25alti',$sql25alt);
						$result25alt = pg_execute($link,'sql25alti',array());
						
						
						$sql26 = "CREATE SEQUENCE w_dishes_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";
									
									
						pg_prepare($link,'sql26i',$sql26);
						$result26sq = pg_execute($link,'sql26i',array());
						
						$sql26alt = "ALTER TABLE public.w_dishes_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql26alti',$sql26alt);
						$resultsql26alt = pg_execute($link,'sql26alti',array());


						pg_prepare($link,'sqldishse','SELECT * FROM w_dishes');
						$resultdishse = pg_execute($link,'sqldishse',array());
						$n = pg_num_rows($resultdishse);
						
						if($n > 0)
						{
							while($row_dish = pg_fetch_array($resultdishse))
							{
								$i++;
								pg_prepare($link,'sqllastdishid'.$i,"SELECT nextval('w_dishes_lang_id_seq') as key");
								$result_dish_id = pg_execute($link,'sqllastdishid'.$i,array());
								$row_dish_id = pg_fetch_array($result_dish_id);
								
								$id = $row_dish_id['key'];
								
								$row_dish_id = $row_dish['id'];
								$row_dish_name = $row_dish['name'];
								
								$row_dish_description = $row_dish['description'];
								
								
								pg_prepare($link,'sqliw_dish_lan'.$id,'INSERT INTO w_dishes_lang (id,dishes_id,lang_id,name_lang,description_lang,status) VALUES ($1,$2,$3,$4,$5,$6)');
							    $result_dish_lan = pg_execute($link,'sqliw_dish_lan'.$id,array($id,$row_dish_id,'1',$row_dish_name,$row_dish_description,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_dishes";
						}
}

$w_driver_lang_table_exist =TableExist($link,'w_driver_lang') ;
if($w_driver_lang_table_exist['count'] == 0) {
	
						$sql27 = "CREATE TABLE w_driver_lang (
									id integer NOT NULL,
									driver_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									lastname_lang text NOT NULL,
									address_lang text NOT NULL,
									background_lang text,
									status boolean DEFAULT true
								)";
								
						pg_prepare($link,'sql27i',$sql27);
						$result27 = pg_execute($link,'sql27i',array());
						
						$sql27alt = "ALTER TABLE public.w_driver_lang OWNER TO $user_name";
						pg_prepare($link,'sql27alti',$sql27alt);
						$result27alt = pg_execute($link,'sql27alti',array());
						
						
						$sql28 = "CREATE SEQUENCE w_driver_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";
									
									
						pg_prepare($link,'sql28i',$sql28);
						$result28sq = pg_execute($link,'sql28i',array());
						
						$sql28alt = "ALTER TABLE public.w_driver_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql28alti',$sql28alt);
						$resultsql28alt = pg_execute($link,'sql28alti',array());


						pg_prepare($link,'sqldrivrse','SELECT * FROM w_driver');
						$resultdrivrse = pg_execute($link,'sqldrivrse',array());
						$n = pg_num_rows($resultdrivrse);
						
						if($n > 0)
						{
							while($row_drivr = pg_fetch_array($resultdrivrse))
							{
								$i++;
								pg_prepare($link,'sqllastdrivrid'.$i,"SELECT nextval('w_driver_lang_id_seq') as key");
								$result_drivr_id = pg_execute($link,'sqllastdrivrid'.$i,array());
								$row_drivr_id = pg_fetch_array($result_drivr_id);
								
								$id = $row_drivr_id['key'];
								
								$row_drivr_id = $row_drivr['id'];
								$row_drivr_name = $row_drivr['name'];
								$row_drivr_lastname = $row_drivr['lastname'];
								$row_drivr_address = $row_drivr['address'];
								$row_drivr_background = $row_drivr['background'];
								
								
								pg_prepare($link,'sqliw_drivr_lan'.$id,'INSERT INTO w_driver_lang (id,driver_id,lang_id,name_lang,lastname_lang,address_lang,background_lang,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
							    $result_drivr_lan = pg_execute($link,'sqliw_drivr_lan'.$id,array($id,$row_drivr_id,'1',$row_drivr_name,$row_drivr_lastname,$row_drivr_address,$row_drivr_background,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_drive";
						}
}

$w_drivergroup_lang_table_exist =TableExist($link,'w_drivergroup_lang') ;
if($w_drivergroup_lang_table_exist['count'] == 0) {
	
						$sql29 = "CREATE TABLE w_drivergroup_lang (
									id integer NOT NULL,
									drivergroup_id integer NOT NULL,
									lang_id integer NOT NULL,
									group_name_lang text NOT NULL,
									status boolean DEFAULT true
								)";
																
						pg_prepare($link,'sql29i',$sql29);
						$result29 = pg_execute($link,'sql29i',array());
						
						$sql29alt = "ALTER TABLE public.w_drivergroup_lang OWNER TO $user_name";
						pg_prepare($link,'sql29alti',$sql29alt);
						$result29alt = pg_execute($link,'sql29alti',array());
						
						
						$sql30 = "CREATE SEQUENCE w_drivergroup_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql30i',$sql30);
						$result30sq = pg_execute($link,'sql30i',array());
						
						$sql30alt = "ALTER TABLE public.w_drivergroup_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql30alti',$sql30alt);
						$resultsql30alt = pg_execute($link,'sql30alti',array());


						pg_prepare($link,'sqldrgrse','SELECT * FROM w_drivergroup');
						$resultdrgrse = pg_execute($link,'sqldrgrse',array());
						$n = pg_num_rows($resultdrgrse);
						
						if($n > 0)
						{
							while($row_drgr = pg_fetch_array($resultdrgrse))
							{
								$i++;
								pg_prepare($link,'sqllastdrgrid'.$i,"SELECT nextval('w_drivergroup_lang_id_seq') as key");
								$result_drgr_id = pg_execute($link,'sqllastdrgrid'.$i,array());
								$row_drgr_id = pg_fetch_array($result_drgr_id);
								
								$id = $row_drgr_id['key'];
								
								$row_drgr_id = $row_drgr['id'];
								$row_drgr_name = $row_drgr['group_name'];
								
								
								
								pg_prepare($link,'sqliw_drgr_lan'.$id,'INSERT INTO w_drivergroup_lang (id,drivergroup_id 	,lang_id,group_name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_drgr_lan = pg_execute($link,'sqliw_drgr_lan'.$id,array($id,$row_drgr_id,'1',$row_drgr_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_drivergroup";
						}
}
$w_drivermanager_lang_table_exist =TableExist($link,'w_drivermanager_lang') ;
if($w_drivermanager_lang_table_exist['count'] == 0) {
	
						$sql31 = "CREATE TABLE w_drivermanager_lang (
										id integer NOT NULL,
										drivermanager_id integer NOT NULL,
										lang_id integer NOT NULL,
										name_lang text NOT NULL,
										lastname_lang text NOT NULL,
										address_lang text NOT NULL,
										status boolean DEFAULT true
									)";
																
						pg_prepare($link,'sql31i',$sql31);
						$result31 = pg_execute($link,'sql31i',array());
						
						$sql31alt = "ALTER TABLE public.w_drivermanager_lang OWNER TO $user_name";
						pg_prepare($link,'sql31alti',$sql31alt);
						$result31alt = pg_execute($link,'sql31alti',array());
						
						
						$sql32 = "CREATE SEQUENCE w_drivermanager_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql32i',$sql32);
						$result32sq = pg_execute($link,'sql32i',array());
						
						$sql32alt = "ALTER TABLE public.w_drivermanager_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql32alti',$sql32alt);
						$resultsql32alt = pg_execute($link,'sql32alti',array());


						pg_prepare($link,'sqldrmanse','SELECT * FROM w_drivermanager');
						$resultdrmanse = pg_execute($link,'sqldrmanse',array());
						$n = pg_num_rows($resultdrmanse);
						
						if($n > 0)
						{
							while($row_drman = pg_fetch_array($resultdrmanse))
							{
								$i++;
								pg_prepare($link,'sqllastdrmanid'.$i,"SELECT nextval('w_drivermanager_lang_id_seq') as key");
								$result_drman_id = pg_execute($link,'sqllastdrmanid'.$i,array());
								$row_drman_id = pg_fetch_array($result_drman_id);
								
								$id = $row_drman_id['key'];
								
								$row_drman_id = $row_drman['id'];
								$row_drman_name = $row_drman['name'];
								$row_drman_lastname = $row_drman['lastname'];
								$row_drman_address = $row_drman['address'];
								
								
								pg_prepare($link,'sqliw_drman_lan'.$id,'INSERT INTO w_drivermanager_lang (id,drivermanager_id,lang_id,name_lang,lastname_lang,address_lang,status) VALUES ($1,$2,$3,$4,$5,$6,$7)');
							    $result_drman_lan = pg_execute($link,'sqliw_drman_lan'.$id,array($id,$row_drman_id,'1',$row_drman_name,$row_drman_lastname,$row_drman_address,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_drivermanager";
						}
}

$w_footer_lang_table_exist =TableExist($link,'w_footer_lang') ;
if($w_footer_lang_table_exist['count'] == 0) {
	
						$sql33 = "CREATE TABLE w_footer_lang (
									id integer NOT NULL,
									footer_id integer NOT NULL,
									lang_id integer NOT NULL,
									pagename_lang text NOT NULL,
									status boolean DEFAULT true
								)";
																
						pg_prepare($link,'sql33i',$sql33);
						$result33 = pg_execute($link,'sql33i',array());
						
						$sql33alt = "ALTER TABLE public.w_footer_lang OWNER TO $user_name";
						pg_prepare($link,'sql33alti',$sql33alt);
						$result33alt = pg_execute($link,'sql33alti',array());
						
						
						$sql34 = "CREATE SEQUENCE w_footer_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql34i',$sql34);
						$result34sq = pg_execute($link,'sql34i',array());
						
						$sql34alt = "ALTER TABLE public.w_footer_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql34alti',$sql34alt);
						$resultsql34alt = pg_execute($link,'sql34alti',array());


						pg_prepare($link,'sqlftrse','SELECT * FROM w_footer');
						$resultftrse = pg_execute($link,'sqlftrse',array());
						$n = pg_num_rows($resultftrse);
						
						if($n > 0)
						{
							while($row_ftr = pg_fetch_array($resultftrse))
							{
								$i++;
								pg_prepare($link,'sqllastftrid'.$i,"SELECT nextval('w_footer_lang_id_seq') as key");
								$result_ftr_id = pg_execute($link,'sqllastftrid'.$i,array());
								$row_ftr_id = pg_fetch_array($result_ftr_id);
								
								$id = $row_ftr_id['key'];
								
								$row_ftr_id = $row_ftr['id'];
								$row_ftr_name = $row_ftr['pagename'];
							
							
								
								
								pg_prepare($link,'sqliw_ftr_lan'.$id,'INSERT INTO w_footer_lang (id,footer_id,lang_id,pagename_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_ftr_lan = pg_execute($link,'sqliw_ftr_lan'.$id,array($id,$row_ftr_id,'1',$row_ftr_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_footer";
						}
}

$w_footercms_lang_table_exist =TableExist($link,'w_footercms_lang') ;
if($w_footercms_lang_table_exist['count'] == 0) {
	
						$sql35 = "CREATE TABLE w_footercms_lang (
									id integer NOT NULL,
									footercms_id integer NOT NULL,
									lang_id integer NOT NULL,
									pagetitle_lang text NOT NULL,
									pageheading_lang text NOT NULL,
									pagecontent_lang text,
									metakeyword_lang text NOT NULL,
									metacontent_lang text NOT NULL,
									customurl_lang text,
									status boolean DEFAULT true
								)";
																
						pg_prepare($link,'sql35i',$sql35);
						$result35 = pg_execute($link,'sql35i',array());
						
						$sql35alt = "ALTER TABLE public.w_footercms_lang OWNER TO $user_name";
						pg_prepare($link,'sql35alti',$sql35alt);
						$result35alt = pg_execute($link,'sql35alti',array());
						
						
						$sql36 = "CREATE SEQUENCE w_footercms_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql36i',$sql36);
						$result36sq = pg_execute($link,'sql36i',array());
						
						$sql36alt = "ALTER TABLE public.w_footercms_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql36alti',$sql36alt);
						$resultsql36alt = pg_execute($link,'sql36alti',array());


						pg_prepare($link,'sqlftrcmsse','SELECT * FROM w_footercms');
						$resultftrcmsse = pg_execute($link,'sqlftrcmsse',array());
						$n = pg_num_rows($resultftrcmsse);
						
						if($n > 0)
						{
							while($row_ftrcms = pg_fetch_array($resultftrcmsse))
							{
								$i++;
								pg_prepare($link,'sqllastftrcmsid'.$i,"SELECT nextval('w_footercms_lang_id_seq') as key");
								$result_ftrcms_id = pg_execute($link,'sqllastftrcmsid'.$i,array());
								$row_ftrcms_id = pg_fetch_array($result_ftrcms_id);
								
								$id = $row_ftrcms_id['key'];
								
								$row_ftrcms_id = $row_ftrcms['id'];
								$row_ftrcms_pagetitle = $row_ftrcms['pagetitle'];
								$row_ftrcms_pageheading = $row_ftrcms['pageheading'];
								$row_ftrcms_pagecontent = $row_ftrcms['pagecontent'];
								$row_ftrcms_metakeyword = $row_ftrcms['metakeyword'];
								$row_ftrcms_metacontent = $row_ftrcms['metacontent'];
								$row_ftrcms_customurl = $row_ftrcms['customurl'];
							
							
								
								
								pg_prepare($link,'sqliw_ftrcms_lan'.$id,'INSERT INTO w_footercms_lang (id,footercms_id,lang_id,pagetitle_lang,pageheading_lang,pagecontent_lang,metakeyword_lang,metacontent_lang,customurl_lang,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)');
							    $result_ftrcms_lan = pg_execute($link,'sqliw_ftrcms_lan'.$id,array($id,$row_ftrcms_id,'1',$row_ftrcms_pagetitle,$row_ftrcms_pageheading,$row_ftrcms_pagecontent,$row_ftrcms_metakeyword,$row_ftrcms_metacontent,$row_ftrcms_customurl,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_footercms";
						}
}
$w_franchises_lang_table_exist =TableExist($link,'w_franchises_lang') ;
if($w_franchises_lang_table_exist['count'] == 0) {
	
						$sql37 = "CREATE TABLE w_franchises_lang (
									id integer NOT NULL,
									city_id integer NOT NULL,
									lang_id integer NOT NULL,
									city_lang text NOT NULL,
									status boolean DEFAULT true
								)";
																
						pg_prepare($link,'sql37i',$sql37);
						$result37 = pg_execute($link,'sql37i',array());
						
						$sql37alt = "ALTER TABLE public.w_franchises_lang OWNER TO $user_name";
						pg_prepare($link,'sql37alti',$sql37alt);
						$result37alt = pg_execute($link,'sql37alti',array());
						
						
						$sql38 = "CREATE SEQUENCE w_franchises_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql38i',$sql38);
						$result38sq = pg_execute($link,'sql38i',array());
						
						$sql38alt = "ALTER TABLE public.w_franchises_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql38alti',$sql38alt);
						$resultsql38alt = pg_execute($link,'sql38alti',array());


						pg_prepare($link,'sqlfranse','SELECT * FROM w_franchises');
						$resultfranse = pg_execute($link,'sqlfranse',array());
						$n = pg_num_rows($resultfranse);
						
						if($n > 0)
						{
							while($row_fran = pg_fetch_array($resultfranse))
							{
								$i++;
								pg_prepare($link,'sqllastfranid'.$i,"SELECT nextval('w_franchises_lang_id_seq') as key");
								$result_fran_id = pg_execute($link,'sqllastfranid'.$i,array());
								$row_fran_id = pg_fetch_array($result_fran_id);
								
								$id = $row_fran_id['key'];
								
								$row_fran_id = $row_fran['id'];
								$row_fran_name = $row_fran['city'];
							
							
								
								
								pg_prepare($link,'sqliw_fran_lan'.$id,'INSERT INTO w_franchises_lang (id,city_id,lang_id,city_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_fran_lan = pg_execute($link,'sqliw_fran_lan'.$id,array($id,$row_fran_id,'1',$row_fran_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_franchises";
						}
}

$w_neighborhood_lang_table_exist =TableExist($link,'w_neighborhood_lang') ;
if($w_neighborhood_lang_table_exist['count'] == 0) {
	
						$sql39 = "CREATE TABLE w_neighborhood_lang (
									id integer NOT NULL,
									neighborhood_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									status boolean DEFAULT true
								)";
																
						pg_prepare($link,'sql39i',$sql39);
						$result39 = pg_execute($link,'sql39i',array());
						
						$sql39alt = "ALTER TABLE public.w_neighborhood_lang OWNER TO $user_name";
						pg_prepare($link,'sql39alti',$sql39alt);
						$result39alt = pg_execute($link,'sql39alti',array());
						
						
						$sql40 = "CREATE SEQUENCE w_neighborhood_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql40i',$sql40);
						$result40sq = pg_execute($link,'sql40i',array());
						
						$sql40alt = "ALTER TABLE public.w_neighborhood_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql40alti',$sql40alt);
						$resultsql40alt = pg_execute($link,'sql40alti',array());


						pg_prepare($link,'sqlnighdse','SELECT * FROM w_neighborhood');
						$resultnighdse = pg_execute($link,'sqlnighdse',array());
						$n = pg_num_rows($resultnighdse);
						
						if($n > 0)
						{
							while($row_nighd = pg_fetch_array($resultnighdse))
							{
								$i++;
								pg_prepare($link,'sqllastnighdid'.$i,"SELECT nextval('w_neighborhood_lang_id_seq') as key");
								$result_nighd_id = pg_execute($link,'sqllastnighdid'.$i,array());
								$row_nighd_id = pg_fetch_array($result_nighd_id);
								
								$id = $row_nighd_id['key'];
								
								$row_nighd_id = $row_nighd['id'];
								$row_nighd_name = $row_nighd['name'];
							
							
								
								
								pg_prepare($link,'sqliw_nighd_lan'.$id,'INSERT INTO w_neighborhood_lang (id,neighborhood_id,lang_id,name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_nighd_lan = pg_execute($link,'sqliw_nighd_lan'.$id,array($id,$row_nighd_id,'1',$row_nighd_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_neighborhood";
						}
}
$w_users_lang_table_exist =TableExist($link,'w_users_lang') ;
if($w_users_lang_table_exist['count'] == 0) {
	
						$sql41 = "CREATE TABLE w_users_lang (
									id integer NOT NULL,
									users_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text,
									lastname_lang text,
									lastname2_lang text,
									street_lang text,
									colony_lang text,
									job_lang text,
									status boolean DEFAULT true
								)";
																
						pg_prepare($link,'sql41i',$sql41);
						$result41 = pg_execute($link,'sql41i',array());
						
						$sql41alt = "ALTER TABLE public.w_users_lang OWNER TO $user_name";
						pg_prepare($link,'sql41alti',$sql41alt);
						$result41alt = pg_execute($link,'sql41alti',array());
						
						
						$sql42 = "CREATE SEQUENCE w_users_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql42i',$sql42);
						$result42sq = pg_execute($link,'sql42i',array());
						
						$sql42alt = "ALTER TABLE public.w_users_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql42alti',$sql42alt);
						$resultsql42alt = pg_execute($link,'sql42alti',array());


						pg_prepare($link,'sqluserse','SELECT * FROM w_users');
						$resultuserse = pg_execute($link,'sqluserse',array());
						$n = pg_num_rows($resultuserse);
						
						if($n > 0)
						{
							while($row_user = pg_fetch_array($resultuserse))
							{
								$i++;
								pg_prepare($link,'sqllastuserid'.$i,"SELECT nextval('w_users_lang_id_seq') as key");
								$result_user_id = pg_execute($link,'sqllastuserid'.$i,array());
								$row_user_id = pg_fetch_array($result_user_id);
								
								$id = $row_user_id['key'];
								
								$row_user_id = $row_user['id'];
								$row_user_name = $row_user['name'];
								$row_user_lastname = $row_user['lastname'];
								$row_user_lastname2 = $row_user['lastname2'];
								$row_user_street = $row_user['street'];
								$row_user_colony = $row_user['colony'];
								$row_user_job = $row_user['job'];
							
								
								
								pg_prepare($link,'sqliw_user_lan'.$id,'INSERT INTO w_users_lang (id,users_id,lang_id,name_lang,lastname_lang,lastname2_lang,street_lang,colony_lang,job_lang,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)');
							    $result_user_lan = pg_execute($link,'sqliw_user_lan'.$id,array($id,$row_user_id,'1',$row_user_name,$row_user_lastname,$row_user_lastname2,$row_user_street,$row_user_colony,$row_user_job,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_users";
						}
}
$w_gallery_lang_table_exist =TableExist($link,'w_gallery_lang') ;
if($w_gallery_lang_table_exist['count'] == 0) {
	
						$sql43 = "CREATE TABLE w_gallery_lang (
									id integer NOT NULL,
									gallery_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									status boolean DEFAULT true
								)";
																								
						pg_prepare($link,'sql43i',$sql43);
						$result43 = pg_execute($link,'sql43i',array());
						
						$sql43alt = "ALTER TABLE public.w_gallery_lang OWNER TO $user_name";
						pg_prepare($link,'sql43alti',$sql43alt);
						$result43alt = pg_execute($link,'sql43alti',array());
						
						
						$sql44 = "
								CREATE SEQUENCE w_gallery_lang_id_seq
								START WITH 1
								INCREMENT BY 1
								NO MINVALUE
								MAXVALUE 9999
								CACHE 1";

									
									
						pg_prepare($link,'sql44i',$sql44);
						$result44sq = pg_execute($link,'sql44i',array());
						
						$sql44alt = "ALTER TABLE public.w_gallery_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql44alti',$sql44alt);
						$resultsql44alt = pg_execute($link,'sql44alti',array());


						pg_prepare($link,'sqlgallse','SELECT * FROM w_gallery');
						$resultgallse = pg_execute($link,'sqlgallse',array());
						$n = pg_num_rows($resultgallse);
						
						if($n > 0)
						{
							while($row_gall = pg_fetch_array($resultgallse))
							{
								$i++;
								pg_prepare($link,'sqllastgallid'.$i,"SELECT nextval('w_gallery_lang_id_seq') as key");
								$result_gall_id = pg_execute($link,'sqllastgallid'.$i,array());
								$row_gall_id = pg_fetch_array($result_gall_id);
								
								$id = $row_gall_id['key'];
								
								$row_gall_id = $row_gall['id'];
								$row_gall_name = $row_gall['name'];
								
							
								
								
								pg_prepare($link,'sqliw_gall_lan'.$id,'INSERT INTO w_gallery_lang (id,gallery_id,lang_id,name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_gall_lan = pg_execute($link,'sqliw_gall_lan'.$id,array($id,$row_gall_id,'1',$row_gall_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_gallery";
						}
}
$w_extras_lang_table_exist =TableExist($link,'w_extras_lang') ;
if($w_extras_lang_table_exist['count'] == 0) {
	
						$sql45 = "CREATE TABLE w_extras_lang (
									id integer NOT NULL,
									extras_id integer NOT NULL,
									lang_id integer NOT NULL,
									set_lang text NOT NULL,
									text_to_end_user_lang text NOT NULL,
									status boolean DEFAULT true
								)";
																								
						pg_prepare($link,'sql45i',$sql45);
						$result45 = pg_execute($link,'sql45i',array());
						
						$sql45alt = "ALTER TABLE public.w_extras_lang OWNER TO $user_name";
						pg_prepare($link,'sql45alti',$sql45alt);
						$result45alt = pg_execute($link,'sql45alti',array());
						
						
						$sql46 = "CREATE SEQUENCE w_extras_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql46i',$sql46);
						$result46sq = pg_execute($link,'sql46i',array());
						
						$sql46alt = "ALTER TABLE public.w_extras_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql46alti',$sql46alt);
						$resultsql46alt = pg_execute($link,'sql46alti',array());


						pg_prepare($link,'sqlextse','SELECT * FROM w_extras');
						$resultextse = pg_execute($link,'sqlextse',array());
						$n = pg_num_rows($resultextse);
						
						if($n > 0)
						{
							while($row_ext = pg_fetch_array($resultextse))
							{
								$i++;
								pg_prepare($link,'sqllastextid'.$i,"SELECT nextval('w_extras_lang_id_seq') as key");
								$result_ext_id = pg_execute($link,'sqllastextid'.$i,array());
								$row_ext_id = pg_fetch_array($result_ext_id);
								
								$id = $row_ext_id['key'];
								
								$row_ext_id = $row_ext['id'];
								$row_ext_set = $row_ext['set'];
								$row_ext_text_to_end_user = $row_ext['text_to_end_user'];
								
							
								
								
								pg_prepare($link,'sqliw_ext_lan'.$id,'INSERT INTO w_extras_lang (id,extras_id,lang_id,set_lang,text_to_end_user_lang, 	status) VALUES ($1,$2,$3,$4,$5,$6)');
							    $result_ext_lan = pg_execute($link,'sqliw_ext_lan'.$id,array($id,$row_ext_id,'1',$row_ext_set,$row_ext_text_to_end_user,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_extras";
						}
}

$w_extras_options_lang_table_exist =TableExist($link,'w_extras_options_lang') ;
if($w_extras_options_lang_table_exist['count'] == 0) {
	
						$sql47 = "CREATE TABLE w_extras_options_lang (
										id integer NOT NULL,
										extras_options_id integer NOT NULL,
										lang_id integer NOT NULL,
										option_name_lang text NOT NULL,
										option_text_to_end_user_lang text,
										status boolean DEFAULT true,
										choice_name_lang text,
										extras_choice_id integer,
										extras_id integer
									)";
																																	
						pg_prepare($link,'sql47i',$sql47);
						$result47 = pg_execute($link,'sql47i',array());
						
						$sql47alt = "ALTER TABLE public.w_extras_options_lang OWNER TO $user_name";
						pg_prepare($link,'sql47alti',$sql47alt);
						$result47alt = pg_execute($link,'sql47alti',array());
						
						
						$sql48 = "CREATE SEQUENCE w_extras_options_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql48i',$sql48);
						$result48sq = pg_execute($link,'sql48i',array());
						
						$sql48alt = "ALTER TABLE public.w_extras_options_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql48alti',$sql48alt);
						$resultsql48alt = pg_execute($link,'sql48alti',array());


						pg_prepare($link,'sqlextoptse','SELECT * FROM w_extras_options');
						$resultextoptse = pg_execute($link,'sqlextoptse',array());
						$n = pg_num_rows($resultextoptse);
						
						if($n > 0)
						{
							while($row_extopt = pg_fetch_array($resultextoptse))
							{
								$i++;
								pg_prepare($link,'sqllastextoptid'.$i,"SELECT nextval('w_extras_options_lang_id_seq') as key");
								$result_extopt_id = pg_execute($link,'sqllastextoptid'.$i,array());
								$row_extopt_id = pg_fetch_array($result_extopt_id);
								
								$id = $row_extopt_id['key'];
								
								$row_extopt_id = $row_extopt['id'];
								$row_extopt_option_id = $row_extopt['option_id'];
								$row_extopt_option_name = $row_extopt['option_name'];
								$row_extopt_choice_name = $row_extopt['choice_name'];
								$row_extopt_option_text_to_end_user = $row_extopt['option_text_to_end_user'];
								$row_extopt_choice_id = $row_extopt['choice_id'];
							
								
								
								pg_prepare($link,'sqliw_extopt_lan'.$id,'INSERT INTO w_extras_options_lang(id,extras_options_id,lang_id,option_name_lang,option_text_to_end_user_lang,status,choice_name_lang,extras_choice_id,extras_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
							    $result_extopt_lan = pg_execute($link,'sqliw_extopt_lan'.$id,array($id,$row_extopt_option_id,'1',$row_extopt_option_name,$row_extopt_option_text_to_end_user,'TRUE',$row_extopt_choice_name,$row_extopt_choice_id,$row_extopt_id));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_extras_options";
						}
}
$w_reserve_lang_table_exist =TableExist($link,'w_reserve_lang') ;
if($w_reserve_lang_table_exist['count'] == 0) {
	
						$sql49 = "CREATE TABLE w_reserve_lang (
									id integer NOT NULL,
									reserve_id integer NOT NULL,
									lang_id integer NOT NULL,
									name_lang text NOT NULL,
									status boolean DEFAULT true
									)";
																																	
						pg_prepare($link,'sql49i',$sql49);
						$result49 = pg_execute($link,'sql49i',array());
						
						$sql49alt = "ALTER TABLE public.w_reserve_lang OWNER TO $user_name";
						pg_prepare($link,'sql49alti',$sql49alt);
						$result49alt = pg_execute($link,'sql49alti',array());
						
						
						$sql50 = "CREATE SEQUENCE w_reserve_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql50i',$sql50);
						$result50sq = pg_execute($link,'sql50i',array());
						
						$sql50alt = "ALTER TABLE public.w_reserve_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql50alti',$sql50alt);
						$resultsql50alt = pg_execute($link,'sql50alti',array());


						pg_prepare($link,'sqlreservse','SELECT * FROM w_reserve');
						$resultreservse = pg_execute($link,'sqlreservse',array());
						$n = pg_num_rows($resultreservse);
						
						if($n > 0)
						{
							while($row_reserv = pg_fetch_array($resultreservse))
							{
								$i++;
								pg_prepare($link,'sqllastreservid'.$i,"SELECT nextval('w_reserve_lang_id_seq') as key");
								$result_reserv_id = pg_execute($link,'sqllastreservid'.$i,array());
								$row_reserv_id = pg_fetch_array($result_reserv_id);
								
								$id = $row_reserv_id['key'];
								
								$row_reserv_id = $row_reserv['id'];
								
								$row_reserv_name = $row_reserv['name'];
								
							
								
								
								pg_prepare($link,'sqliw_reserv_lan'.$id,'INSERT INTO w_reserve_lang(id,reserve_id,lang_id,name_lang,status) VALUES ($1,$2,$3,$4,$5)');
							    $result_reserv_lan = pg_execute($link,'sqliw_reserv_lan'.$id,array($id,$row_reserv_id,'1',$row_reserv_name,'TRUE'));	
								
								
							
							}
							
							
						}
						else
						{
							echo "No Data Found in w_reserve";
						}
}

$w_menus_lang_table_exist =TableExist($link,'w_menus_lang') ;
if($w_menus_lang_table_exist['count'] == 0) {
	
						$sql51 = "CREATE TABLE w_menus_lang (
										id integer NOT NULL,
										menus_id integer NOT NULL,
										lang_id integer NOT NULL,
										name_lang text NOT NULL,
										comments_lang text,
										status boolean DEFAULT true
									)";
																																	
						pg_prepare($link,'sql51i',$sql51);
						$result51 = pg_execute($link,'sql51i',array());
						
						$sql51alt = "ALTER TABLE public.w_menus_lang OWNER TO $user_name";
						pg_prepare($link,'sql51alti',$sql51alt);
						$result51alt = pg_execute($link,'sql51alti',array());
						
						
						$sql52 = "CREATE SEQUENCE w_menus_lang_id_seq
									START WITH 1
									INCREMENT BY 1
									NO MINVALUE
									MAXVALUE 9999
									CACHE 1";

									
									
						pg_prepare($link,'sql52i',$sql52);
						$result52sq = pg_execute($link,'sql52i',array());
						
						$sql52alt = "ALTER TABLE public.w_menus_lang_id_seq OWNER TO $user_name";
						pg_prepare($link,'sql52alti',$sql52alt);
						$resultsql52alt = pg_execute($link,'sql52alti',array());


						pg_prepare($link,'sqlmenuse','SELECT * FROM w_menus');
						$resultmenuse = pg_execute($link,'sqlmenuse',array());
						$n = pg_num_rows($resultmenuse);
						
						if($n > 0)
						{
							while($row_menu = pg_fetch_array($resultmenuse))
							{
								$i++;
								pg_prepare($link,'sqllastmenuid'.$i,"SELECT nextval('w_menus_lang_id_seq') as key");
								$result_menu_id = pg_execute($link,'sqllastmenuid'.$i,array());
								$row_menu_id = pg_fetch_array($result_menu_id);
								
								$id = $row_menu_id['key'];
								
								$row_menu_id = $row_menu['id'];
								
								$row_menu_name = $row_menu['name'];
								
							     $row_menu_comments = $row_menu['comments'];
								
								
								pg_prepare($link,'sqliw_menu_lan'.$id,'INSERT INTO w_menus_lang(id,menus_id,lang_id,name_lang,comments_lang,status) VALUES ($1,$2,$3,$4,$5,$6)');
							    $result_menu_lan = pg_execute($link,'sqliw_menu_lan'.$id,array($id,$row_menu_id,'1',$row_menu_name,$row_menu_comments,'TRUE'));	
								
								
							
							}
							
							

						}
						else
						{
							echo "No Data Found in w_menus";
						}
}


echo "<center>Table and Data Created and Inserted Successfully</center>"; 
/*----------------------------- All Lang Table and Sequence and Data Insert End -----------------------------*/
}
?>
<center>
<form method="post">
<input type="submit" name="submit" value="Submit" style="width:100px; height:50px; background-color:#0CF;" />
</form>
</center>