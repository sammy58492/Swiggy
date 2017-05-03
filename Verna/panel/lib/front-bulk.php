<?php
ob_start();
error_reporting(0);
require('front-main.php');
require('payment-main.php');
/*EXAMPLE USE: 
[{"operation":"FetchAllFranchisesData"},{"operation":"FetchAllUsersData","filters":[{"name":"level","operator":"=","value":"2"}]}]
*/
// echo "sd";
// die;
session_start();
$x = 0;
//session_write_close();//inthis file we only read session data...
$bulk = json_decode($_POST['data']);
//print_r($bulk);
$lang_resource = GetLangFileStatic1();
//global $lang_resource;
// echo "<pre>"; print_r($bulk);die;
//unset($response);
$link = ConnectDB();
define("IS_PAYPAL_ENABLED", 1);
$response = new stdClass();
//if(is_array($bulk)){
foreach ($bulk as $data)
	{		
	switch ($data->operation)
		{
			
		case 'FetchCreateAccount':
			$response->createaccounts = FetchCreateAccount($link);
		break;
		case 'FetchUserInfo':
		if ($_SESSION['auth'] == 'yes')
			$response->user = FetchUserInfo($_SESSION['user']->id,$link);
		break;
		case 'FetchAllFranchisesData':
			$response->franchises = FetchAllFranchisesData($data->filters,$link);
		break;
		case 'FetchAllneighborhoodData':
			$response->neighborhood = FetchAllneighborhoodData($data->filters,$link);
		break;


		case 'FetchAllCountriesData':
			$response->countries = FetchAllCountriesData($link);
		break;
		//request collection start
		case 'FetchRequestCollectionSettings':
			$response->RequestCollectionSettings = FetchRequestCollectionSettings($link);
		break;
		//request collection end
		
		
		//request map latitude longitude
		case 'FetchMapLatlong':
			$response->MapLatlong = FetchMapLatlong($link);
		break;
		//request map latitude end
		
		case 'FetchAllColonyData':
			$response->franchises = FetchAllColonyData($data->filters,$link);
		break;
			//Reset counter start
		case 'updatedataBaseModify' :
				$response->updatedataBase = updatedataBase($link);
		break;
		case 'FetchBusinessMenucount':
			$response->menu = FetchBusinessMenucount($data->businessid,$data->deliverytype,$link);
		break;	
		case 'iscounterset' :
				$response->iscounterset = iscounterset($link);
		break;	
		case 'autoLogout' :
				$response->autoLogout = autoLogout($link);
		break;
			
		case 'fetchenterprise' :
				$response->fetchenterprise = fetchenterprise($link);
		break;	
		case 'fetchcurrenttime' :
				$response->fetchcurrenttime = fetchcurrenttime();
		break;	
		case 'FetchAllsettingsCustomFacebookNew' :
				$response->facebooklike = FetchAllsettingsCustomFacebookNew();
		break;
		case 'getAutocomplete':
			$response->autocomplete = getAutocomplete($link);
		break;
		case 'getGibberish':
			$response->gibberish = getGibberish($link);
		break;
		case 'getBusinesstemplate':
			$response->businesstemplate = getBusinesstemplate($link);
		break;
		//Reset counter End
		case 'FetchWhereAmIData':
			$response->whereami = GetWhereAmIData();
		break;
		case 'FetchAllBusinessData':
		
			$response->business = FetchAllBusinessData($link,$data->location,$data->deliverytype,$data->category,$data->city,$data->filters,$data->limit,$data->offset,$data->whereall,$lang_resource);
			
		break;
		case 'FetchAllBusinessData1':
			$response->business = FetchAllBusinessData1($link,$data->location,$data->deliverytype,$data->category,$data->city,$data->filters,$data->limit,$data->offset,$data->whereall,$lang_resource);
		break;
		case 'FetchAllBusinessDataCustomSlug':
		$response->business = FetchAllBusinessDataCustomSlug($link,$data->location,$data->deliverytype,$data->category,$data->city,$data->businessid,$data->filters,$data->whereall,$lang_resource);
		break;
		case 'FetchServiceFeeData':
			$response->servicefee = FetchServiceFeeData($data->filters,$link);
		break;
		case 'FetchAllCategoriesCustom':
			$response->categoriesCustom = FetchAllCategoriesCustom($link);
		break;
			case 'FetchAllCategoriesCustom1':
			$response->categoriesCustom = FetchAllCategoriesCustom1($link,$data->bids,$data->offset,$data->deliverytype);
		break;
		case 'FetchAllCategories1':
			$response->categories = FetchAllCategories1($link,$data->bids,$data->offset,$data->deliverytype);
		break;
		case 'FetchAllCategories':
		
			$response->categories = FetchAllCategories($link);
		break;
		case 'FetchAllCategoriesCustom2':
			$response->categoriesCustom = FetchAllCategoriesCustom2($link,$data->businessid);
		break;
		case 'FetchAllCategories2':
			$response->categories = FetchAllCategories2($link,$data->businessid);
		break;
		case 'FetchBusinessMenu':
			$response->menu = FetchBusinessMenu($data->businessid,$data->deliverytype,$data->whereall,$link);
		break;
		case 'checkpreorder':
			$response->menustatus = checkpreorder($data->menuid,$link);
		break;
		case 'FetchAllbusinessSettingData':
			$response->businessSetting = FetchAllbusinessSettingData($link);
		break;
		case 'FetchAllbusinessSettingDataCommon':
			$response->businessSetting = FetchAllbusinessSettingDataCommon($link);
		break;
		case 'FetchBusinessOnlyMenu':
			$response->menuonly = FetchBusinessOnlyMenu($data->businessid,$data->whereall,$link,$lang_resource);
		break;
		case 'FetchMostPopularsCategoryData':
			$response->popularscategory = FetchMostPopularsCategoryData($link);
		break;
		
		case 'FetchMostPopularsResturantData':
			$response->popularsresturant = FetchMostPopularsResturantData($link);
		break;
		
		
		
		
		case 'FetchBusinessOnlyMenuEach':
			$response->menuonlyeach = FetchBusinessOnlyMenuEach($data->itemid,$data->bussid,$link,$lang_resource);
		break;
		case 'FetchBusinessPreOrderMenu':
			$response->menu = FetchBusinessPreOrderMenu($data->businessid,$data->date,$data->hour,$data->minute,$data->deliverytype,$data->whereall,$link);
		break;
		case 'FetchAdData':
			$response->ad = FetchAdData($data->lastad,$data->cityid,$link);
		break;
		case 'FetchRecentActivityData':
			$response->recent = FetchRecentActivityData($link,$lang_resource);
		break;
		case 'FetchMostPopularsData':
			$response->populars = FetchMostPopularsData($link);
		break;
		case 'FetchCountryCity':
			$response->countrycity = FetchCountryCity($link);
		break;
		case 'FetchMyOrders':
			$response->orders = FetchMyOrders($link,$lang_resource);
		break;
		case 'FetchOrderData':
			$response->order = FetchOrderData($data->id,$link,$lang_resource);
		break;
		case 'FetchCurrentDate':
			$response->currentDate = FetchCurrentDate();
		break;
		
		case 'FetchAllpanelFooterCustom':
			$response->footerlink = FetchAllpanelFooterCustom($link);
		break;
		case 'FetchCheckoutInfo':
			$response->checkoutinfo = FetchCheckoutInfo($link);
		break;		
		
		case 'DiscountOffer':
				$response->offer = DiscountOffer($data->businessid,$link);
		break;
		case 'pickupDeliverytime':
				$response->times = FetchTimeOnlyDeliveryndpickup($data->businessid,$link);
		break;
		case 'CheckPaypalPayment':
			if(IS_PAYPAL_ENABLED == 1)
				$response->payment = CheckPaypalPayment($data->id,$link);
		break;
		case 'checkDelivery':
			$response->deliverystatus = checkDelivery($data->businessid,$link);
		break;
		
		
		case 'deliveryTimeCheck':
				$response->deliveryTime = deliveryTimeCheck($data->businessid,$data->sdate,$link);
		break;
		
		case 'FetchReserve':
			$response->reserves = FetchReserve($data->businessid,$link,$data->whereall);
		break;
		case 'FetchReserveBooked':
			$response->reservesbooked = FetchReserveBooked($data->businessid,$data->whereall,$link);
		break;
		
		case 'FetchDecimalPoint':
			$response->decimal_point = FetchDecimalPoint($link);
		break;
		
		
		case 'FetchAllWidgetResturantSettingsData':
			$response->ResturantWidgetSettings = FetchAllWidgetResturantSettingsData($data->rid,$link);
		break;
		
		case 'FetchAllWidgetResturantButtonSettingsData':
			$response->ResturantButtonWidgetSettings = FetchAllWidgetResturantButtonSettingsData($data->rid,$link);
		break;
		
		case 'FetchAllWidgetResturantFloatingSettingsData':
			$response->ResturantFloatingWidgetSettings = FetchAllWidgetResturantFloatingSettingsData($data->rid,$link);
		break;
		
		
		
		
		case 'FetchAllWidgetSettingsData':
			$response->WidgetSettings = FetchAllWidgetSettingsData($data->wid,$link);
		break;
		
		case 'FetchItemPointPermission':
			$response->itempointpermisson = FetchItemPointPermission($link);
		break;

		case 'FetchGlobalPointSettings':
			$response->globalpointsetting = FetchGlobalPointSettings($link);
		break;

		case 'FetchUserPointsData':
			$response->fetchuserpointsdata = FetchUserPointsData($link,$data->id);
		break;

		case 'FetchUsersOrderBusiness':
			$response->fetchusersorderbusiness = FetchUsersOrderBusiness($link,$data->id);
		break;
		
		case 'GetPointValue':
			$response->pointvalue = GetPointValue($link,$data->business_id);
		break;

		case 'FetchBusinessPointsEnabled':
			$response->fetchbusinesspointsenabled = FetchBusinessPointsEnabled($link);
		break;

		case 'FetchLandingPageSettings':
			$response->landingpagesettings =FetchLandingPageSettings($link);
			break;
		
		case 'GetWebsiteReviewData':
			$response->websitereview =GetWebsiteReviewData($link);
			break;
		
		
    case 'GetReviewData':
			if(IS_PAYPAL_ENABLED == 1)
				$response->review = GetReviewData($data->businessid,$link);
		break;
	 case 'GetOptionCount':
            $response->review=GetOptionCount($data->id,$data->position);
            break;
        case 'GetOptions':
            $response->review=GetOptions($data->id);
            break;
        case 'GetPrices':
            $response->review=GetPrices($data->ids);
            break;
        case 'GetTotalPrices':
            $response->review=GetTotalPrices($data->ids);
            break;
        case 'GetSet':
            $response->review=GetSet($data->id);
            break;
        case 'GetAllSets':
             $response->review=GetAllSets($data->id);
            break;
	     case 'GetTotalPricesEdit':
             $response->review=GetTotalPricesEdit($data->ids);
            break;
		
		case 'timescdule':
				$response->timescdule = timescdule($data->businessid,$link);
		break;
		
		case 'FetchSettingFront':
				$response->settingfront = FetchSettingFront($link);
		break;
		case 'FetchSiteSetting':
				$response->siteSetting = FetchSiteSetting($link);
		break;
		case 'GetSiteScheduleSettingsForSchedule':
			$response->siteschedule =GetSiteScheduleSettings($link);
		break;	
		//request collction start
		case 'GetRequestCollectionSettingsForSchedule':
			$response->requestcollectionschedule =GetRequestCollectionSettingsForSchedule($link);
		break;	
		//request collection end
		case 'GetSiteScheduleTextSettingsForSchedule':
			$response->sitescheduletext =GetSiteScheduleTextSettingsForSchedule($link);
		break;	
		
		case 'FetchTimeByZoneForSchedule':
			$response->timezone =FetchTimeByZoneForSchedule($link,$lang_resource);
		break;	
		case 'FetchCountryName':
				$response->countryname = FetchCountryName($data->countryid,$link);
		break;
		case 'FetchCityName':
				$response->cityname = FetchCityName($data->cityid,$link);
		break;
		case 'FetchAllcity':
				$response->cityname = FetchAllcity($link);
		break;
        case 'FetchNeighborhoodforCity':
				$response->neighbor = FetchNeighborhoodforCity($data->cityid,$link);
		break;


		case 'FetchNeighbourhoodSettings';
		 $response->neighsettings = FetchNeighbourhoodSettings($link);
		break;
		

		case 'FetchLatestDeliveryZone';
		 $response->deliveryzonenew = FetchLatestDeliveryZone($link,$data->id);
		break;

		case 'FetchPanelInfo';
		 $response->panelinfo = FetchPanelInfo($link);
		break;

		//zipcode validation start
		case 'FetchZipMAxMin' :
				$response->zipMAxMin = FetchZipMAxMin($link);
		break;	
		case 'FetchzipcodeValidation' :
				$response->zipcodeValidation = FetchzipcodeValidation($data->zipcode,$link);
		break;	
		//zipcode validation end
		
		case 'FetchDefaultLangName':
			$response->defaultlang = FetchDefaultLangName($link);
		break;
		
		case 'FetchPageSettings':
			$response->settingstatus = FetchPageSettings($link);
		break;

		case 'FetchAllReviews':
			$response->reviews = FetchAllReviews($link);
		break;
		case 'FetchSmsactivation':
			$response->smsactivation = FetchSmsactivation($link);
		break;
		
		case 'FetchAllCuisineDataFront':
		  $response->cuisine = FetchAllCuisineData($link);
		  break;
		

		case 'FetchAllReviewsLimit':
			$response->reviews = FetchAllReviewsLimit($data->limit,$link);
		break;
	     
		
		}
	}


	

pg_close($link);
echo json_encode($response);


/********************************************FUNCTIONS*****************************************/
function autoLogout($link){

$_SESSION['LAST_ACTIVITY'] = time(); 
print_r($_SESSION);
}
//request collection start
function FetchRequestCollectionSettings($link)
	{
		$conditionalsvalues = array();
	$query = "SELECT * FROM w_configs WHERE name='requestCollectionSettingenabled'";

	
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sqlrequestCollectionSettingenabled',$query);
	$result = pg_execute($link,'sqlrequestCollectionSettingenabled',array());

	
	while($row = pg_fetch_array($result))
		{
			$requestCollectionSettingenabled=$row["value"];
		}
		return $requestCollectionSettingenabled;
	}
//request collection end

//request map latitude start
function FetchMapLatlong($link)
	{
		//$conditionalsvalues = array();
	$query = "SELECT * FROM w_configs WHERE name='lat'";

	
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sqlrequestCollectionMapLat',$query);
	$result = pg_execute($link,'sqlrequestCollectionMapLat',array());

	
	while($row = pg_fetch_array($result))
		{
			$data = new stdClass();
			$data->lat=$row["value"];
		}
		
	$query = "SELECT * FROM w_configs WHERE name='long'";

	
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sqlrequestCollectionMapLong',$query);
	$result = pg_execute($link,'sqlrequestCollectionMapLong',array());

	
	while($row = pg_fetch_array($result))
		{
			$data->long=$row["value"];
		}	
		return $data;
	}
//request map latitude end

//request map longitude start
function FetchMapLongitude($link)
	{
		//$conditionalsvalues = array();
	$query = "SELECT * FROM w_configs WHERE name='long'";

	
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sqlrequestCollectionMapLong',$query);
	$result = pg_execute($link,'sqlrequestCollectionMapLong',array());

	
	while($row = pg_fetch_array($result))
		{
			$requestCollectionMapLong=$row["value"];
		}
		return $requestCollectionMapLong;
	}
//request map longitude end
function FetchdefaultZoneData($link)
	{
		$conditionalsvalues = array();
	$query = "SELECT * FROM w_configs WHERE name='defaulttimezone'";

	
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sqldefaulttimezone',$query);
	$result = pg_execute($link,'sqldefaulttimezone',array());

	
	while($row = pg_fetch_array($result))
		{
			$defaulttimezone=$row["value"];
		}
		return $defaulttimezone;
	}
function FetchServiceFeeData($filters,$link)
	{
		$conditionalsvalues = array();
	$query = "SELECT * FROM w_configs WHERE name='servicefee'";

	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			if ($count>0)
				$conditionals .= ',' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sqlservice',$query);
	$result = pg_execute($link,'sqlservice',$conditionalsvalues);

	$franchises = array();
	while($row = pg_fetch_array($result))
		{
			$servicefee=$row["value"];
		}
		return $servicefee;
	}
function FetchTimeByZoneForSchedule($link,$lang_resource){
	
	 $now = time();
	//unset($date1);
	$date1 = new stdClass();

  		$zone=FetchdefaultZoneData($link);
	 date_default_timezone_set($zone);
    if ($format == '24'){
        $date1->currenttime= date('h:i A', $now);
		
		
	}else{
         $date1->currenttime=  date('G:i', $now);
	}
	 $date1->week= date('w', $now);
	  $date1->currenthour= date('G', $now);
		 $date1->currentmin= date('i ', $now);
	 return $date1;
		
}
function getAutocomplete($link) {

pg_prepare($link,'sqlat','SELECT autocomplete FROM w_tabsettings where scriptid=$1');
$result = pg_execute($link,'sqlat',array($_SESSION['scriptid']));
$rs = pg_fetch_array($result);
return $rs["autocomplete"];
pg_close($link);

}
function getGibberish($link) {

pg_prepare($link,'sqlat1','SELECT gibberish FROM w_tabsettings where scriptid=$1');
$result = pg_execute($link,'sqlat1',array($_SESSION['scriptid']));
$rs = pg_fetch_array($result);
return $rs["gibberish"];
pg_close($link);

}
function getBusinesstemplate($link) {

pg_prepare($link,'sqbus1','SELECT value FROM w_configs where name=$1');
$result = pg_execute($link,'sqbus1',array('businesstemplate'));
$rs = pg_fetch_array($result);
return $rs["value"];
pg_close($link);

}
function GetSiteScheduleTextSettingsForSchedule($link){
	 pg_query($link, "DEALLOCATE ALL");
	$siteschedule=array();
	pg_prepare($link,'sqlsoundschedule','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsoundschedule',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'sitescheduletext1'){
		
			$siteschedule["sitescheduletext1"] =stripslashes($row['value']);
			
		}
		if($row['name'] == 'sitescheduletext2'){
		
			$siteschedule["sitescheduletext2"] =stripslashes($row['value']);
			
		}
		if($row['name'] == 'sitescheduletext3'){
		
			$siteschedule["sitescheduletext3"] =stripslashes($row['value']);
			
		}
	}
	return $siteschedule;
	pg_close($link);	
}
//request collction start
function GetRequestCollectionSettingsForSchedule($link){
	 pg_query($link, "DEALLOCATE ALL");
	$requestcollectionschedule=array();
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'requestcollectionschedule'){
		
			$requestcollectionschedule = json_decode(stripslashes($row['value']),true);
			
		}
	}
	return $requestcollectionschedule;
	pg_close($link);	
}
//request collction end
function GetSiteScheduleSettings($link){
	 pg_query($link, "DEALLOCATE ALL");
	$siteschedule=array();
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'siteschedule'){
		
			$siteschedule = json_decode(stripslashes($row['value']),true);
			
		}
	}
	return $siteschedule;
	pg_close($link);	
}
/*//Reset counter start
function iscounterset($link){
	
	$query = 'SELECT * FROM w_config_unchanged' ;
	pg_prepare($link,'',$query);
	$result3 = pg_execute($link,'',array());

	while($row = pg_fetch_array($result3)){
		if($row["name"]=="isupdateBackupinsec"){
			return $row["value"];
		}
	}
}

function fetchcurrenttime(){
$time=array();
$time["mints"]=date("i");
$time["sec"]=date("s");
return $time;
}
function counterRange($link){
	$query = 'SELECT * FROM w_config_unchanged' ;
	pg_prepare($link,'',$query);
	$result3 = pg_execute($link,'',array());
	while($row = pg_fetch_array($result3)){
		if($row["name"]=="updateBackupinsec"){
			return $row["value"];
		}
	}
}
function updatedataBase($link){
	
	$iscounterset=1;
	$query1 = 'SELECT * FROM w_config_unchanged' ;
	pg_prepare($link,'',$query1);
	$result4 = pg_execute($link,'',array());

	while($row1 = pg_fetch_array($result4)){
		if($row1["name"]=="isupdateBackupinsec"){
			$iscounterset= $row1["value"];
		}
	}

	if($iscounterset==1){
	ini_set('max_execution_time', 2500);
	 $path = $_SERVER['DOCUMENT_ROOT']."/panel/sql_backup/"; 
	$sql_filename = 'dump.sql';
	$sql_contents = file_get_contents($path.$sql_filename);
	$sql_contents = explode(";;", $sql_contents);
  	require('../config.php');


				pg_prepare($link,'sqlt35','TRUNCATE w_account');
	$result2 = pg_execute($link,'sqlt35',array());
				pg_prepare($link,'sqlt36','TRUNCATE w_ads');
	$result2 = pg_execute($link,'sqlt36',array());
				pg_prepare($link,'sqlt47','TRUNCATE w_ads_lang');
	$result2 = pg_execute($link,'sqlt47',array());	
				pg_prepare($link,'sqlt72','TRUNCATE w_bringg_driver_lang');
	$result2 = pg_execute($link,'sqlt72',array());	
				pg_prepare($link,'sqlt3','TRUNCATE w_business');
	$result2 = pg_execute($link,'sqlt3',array());
				pg_prepare($link,'sqlt48','TRUNCATE w_business_lang');
	$result2 = pg_execute($link,'sqlt48',array());	
				pg_prepare($link,'sqlt49','TRUNCATE w_business_meta_seo_lang');
	$result2 = pg_execute($link,'sqlt49',array());	
				pg_prepare($link,'sqlt4','TRUNCATE w_categories');
	$result2 = pg_execute($link,'sqlt4',array());
				pg_prepare($link,'sqlt50','TRUNCATE w_categories_lang');
	$result2 = pg_execute($link,'sqlt50',array());	
				pg_prepare($link,'sqlt46','TRUNCATE w_checkout');
	$result2 = pg_execute($link,'sqlt46',array());	
				pg_prepare($link,'sqlt5','TRUNCATE w_configs');
	$result2 = pg_execute($link,'sqlt5',array());
				pg_prepare($link,'sqlt6','TRUNCATE w_countries');
	$result2 = pg_execute($link,'sqlt6',array());
				pg_prepare($link,'sqlt51','TRUNCATE w_countries_lang');
	$result2 = pg_execute($link,'sqlt51',array());	
				pg_prepare($link,'sqlt38','TRUNCATE w_delivary_neighborhood');
	$result2 = pg_execute($link,'sqlt38',array());
				pg_prepare($link,'sqlt52','TRUNCATE w_delivary_neighborhood_lang');
	$result2 = pg_execute($link,'sqlt52',array());	
				pg_prepare($link,'sqlt7','TRUNCATE w_deliverykm');
	$result2 = pg_execute($link,'sqlt7',array());
				pg_prepare($link,'sqlt53','TRUNCATE w_deliverykm_lang');
	$result2 = pg_execute($link,'sqlt53',array());	
				pg_prepare($link,'sqlt33','TRUNCATE w_deliveryzone');
	$result2 = pg_execute($link,'sqlt33',array());
				pg_prepare($link,'sqlt54','TRUNCATE w_deliveryzone_lang');
	$result2 = pg_execute($link,'sqlt54',array());		
				pg_prepare($link,'sqlt8','TRUNCATE w_discount');
	$result2 = pg_execute($link,'sqlt8',array());
				pg_prepare($link,'sqlt9','TRUNCATE w_discountoffer');
	$result2 = pg_execute($link,'sqlt9',array());
				pg_prepare($link,'sqlt55','TRUNCATE w_discountoffer_lang');
	$result2 = pg_execute($link,'sqlt55',array());	
				pg_prepare($link,'sqlt10','TRUNCATE w_dishes');
	$result2 = pg_execute($link,'sqlt10',array());
				pg_prepare($link,'sqlt56','TRUNCATE w_dishes_lang');
	$result2 = pg_execute($link,'sqlt56',array());	
				pg_prepare($link,'sqlt11','TRUNCATE w_driver');
	$result2 = pg_execute($link,'sqlt11',array());
				pg_prepare($link,'sqlt57','TRUNCATE w_driver_lang');
	$result2 = pg_execute($link,'sqlt57',array());	
				pg_prepare($link,'sqlt12','TRUNCATE w_drivergroup');
	$result2 = pg_execute($link,'sqlt12',array());
				pg_prepare($link,'sqlt58','TRUNCATE w_drivergroup_lang');
	$result2 = pg_execute($link,'sqlt58',array());	
				pg_prepare($link,'sqlt13','TRUNCATE w_drivermanager');
	$result2 = pg_execute($link,'sqlt13',array());
				pg_prepare($link,'sqlt59','TRUNCATE w_drivermanager_lang');
	$result2 = pg_execute($link,'sqlt59',array());	
				pg_prepare($link,'sqlt14','TRUNCATE w_extras');
	$result2 = pg_execute($link,'sqlt14',array());
				pg_prepare($link,'sqlt60','TRUNCATE w_extras_lang');
	$result2 = pg_execute($link,'sqlt60',array());	
				pg_prepare($link,'sqlt15','TRUNCATE w_extras_options');
	$result2 = pg_execute($link,'sqlt15',array());
				pg_prepare($link,'sqlt61','TRUNCATE w_extras_options_lang');
	$result2 = pg_execute($link,'sqlt61',array());	
				pg_prepare($link,'sqlt16','TRUNCATE w_favbus');
	$result2 = pg_execute($link,'sqlt16',array());
				pg_prepare($link,'sqlt17','TRUNCATE w_footer');
	$result2 = pg_execute($link,'sqlt17',array());
				pg_prepare($link,'sqlt62','TRUNCATE w_footer_lang');
	$result2 = pg_execute($link,'sqlt62',array());	
				pg_prepare($link,'sqlt37','TRUNCATE w_footercms');
	$result2 = pg_execute($link,'sqlt37',array());
				pg_prepare($link,'sqlt63','TRUNCATE w_footercms_lang');
	$result2 = pg_execute($link,'sqlt63',array());	
				pg_prepare($link,'sqlt18','TRUNCATE w_franchises');
	$result2 = pg_execute($link,'sqlt18',array());
				pg_prepare($link,'sqlt64','TRUNCATE w_franchises_lang');
	$result2 = pg_execute($link,'sqlt64',array());	
				pg_prepare($link,'sqlt40','TRUNCATE w_frontsettings');
	$result2 = pg_execute($link,'sqlt40',array());
				pg_prepare($link,'sqlt19','TRUNCATE w_gallery');
	$result2 = pg_execute($link,'sqlt19',array());
				pg_prepare($link,'sqlt65','TRUNCATE w_gallery_lang');
	$result2 = pg_execute($link,'sqlt65',array());	
				pg_prepare($link,'sqlt20','TRUNCATE w_invoice');
	$result2 = pg_execute($link,'sqlt20',array());
				pg_prepare($link,'sqlt21','TRUNCATE w_invoiceconf');
	$result2 = pg_execute($link,'sqlt21',array());
				pg_prepare($link,'sqlt66','TRUNCATE w_lang_admin');
	$result2 = pg_execute($link,'sqlt66',array());	
				pg_prepare($link,'sqlt67','TRUNCATE w_lang_setting');
	$result2 = pg_execute($link,'sqlt67',array());	
				pg_prepare($link,'sqlt68','TRUNCATE w_lang_static');
	$result2 = pg_execute($link,'sqlt68',array());	
				pg_prepare($link,'sqlt22','TRUNCATE w_makepayment');
	$result2 = pg_execute($link,'sqlt22',array());
				pg_prepare($link,'sqlt23','TRUNCATE w_menus');
	$result2 = pg_execute($link,'sqlt23',array());
				pg_prepare($link,'sqlt69','TRUNCATE w_menus_lang');
	$result2 = pg_execute($link,'sqlt69',array());	
				pg_prepare($link,'sqlt41','TRUNCATE w_neighborhood');
	$result2 = pg_execute($link,'sqlt41',array());
				pg_prepare($link,'sqlt70','TRUNCATE w_neighborhood_lang');
	$result2 = pg_execute($link,'sqlt70',array());	
				pg_prepare($link,'sqlt24','TRUNCATE w_orders');
	$result2 = pg_execute($link,'sqlt24',array());
				pg_prepare($link,'sqlt42','TRUNCATE w_paymentgateway');
	$result2 = pg_execute($link,'sqlt42',array());
				pg_prepare($link,'sqlt43','TRUNCATE w_paymentgateway_details');
	$result2 = pg_execute($link,'sqlt43',array());
				pg_prepare($link,'sqlt25','TRUNCATE w_paypal_payments');
	$result2 = pg_execute($link,'sqlt25',array());
				pg_prepare($link,'sqlt44','TRUNCATE w_printer_model');
	$result2 = pg_execute($link,'sqlt44',array());	
				pg_prepare($link,'sqlt73','TRUNCATE w_printer_path');
	$result2 = pg_execute($link,'sqlt73',array());
				pg_prepare($link,'sqlt74','TRUNCATE w_requestcollectiondeliveryfee');
	$result2 = pg_execute($link,'sqlt74',array());	
				pg_prepare($link,'sqlt26','TRUNCATE w_reserve');
	$result2 = pg_execute($link,'sqlt26',array());
				pg_prepare($link,'sqlt27','TRUNCATE w_reserve_book');
	$result2 = pg_execute($link,'sqlt27',array());
				pg_prepare($link,'sqlt28','TRUNCATE w_reserve_chart');
	$result2 = pg_execute($link,'sqlt28',array());
				pg_prepare($link,'sqlt71','TRUNCATE w_reserve_lang');

	$result2 = pg_execute($link,'sqlt71',array());	
				pg_prepare($link,'sqlt29','TRUNCATE w_review');
	$result2 = pg_execute($link,'sqlt29',array());
				pg_prepare($link,'sqlt45','TRUNCATE w_search_statistic');
	$result2 = pg_execute($link,'sqlt45',array());	
				pg_prepare($link,'sqlt30','TRUNCATE w_splitpaymain');
	$result2 = pg_execute($link,'sqlt30',array());
				pg_prepare($link,'sqlt39','TRUNCATE w_tabsettings');
	$result2 = pg_execute($link,'sqlt39',array());	
				pg_prepare($link,'sqlt31','TRUNCATE w_user_extras');
	$result2 = pg_execute($link,'sqlt31',array());
				pg_prepare($link,'sqlt32','TRUNCATE w_users');
	$result2 = pg_execute($link,'sqlt32',array());
				pg_prepare($link,'sqlt75','TRUNCATE w_users_lang');
	$result2 = pg_execute($link,'sqlt75',array());	
				pg_prepare($link,'sqlt34','TRUNCATE w_zipcode');
	$result2 = pg_execute($link,'sqlt34',array());
//				pg_prepare($link,'sqlt76','TRUNCATE w_zipcodevalidation');
//	$result2 = pg_execute($link,'sqlt76',array());	

//last version database reset 4.08, sql76
				pg_prepare($link,'sqlt77','TRUNCATE w_business_photos');
	$result2 = pg_execute($link,'sqlt77',array());	
				pg_prepare($link,'sqlt78','TRUNCATE w_contactus');
	$result2 = pg_execute($link,'sqlt78',array());	
					pg_prepare($link,'sqlt79','TRUNCATE w_gcm');
	$result2 = pg_execute($link,'sqlt79',array());	

//last version database reset 5.00, sql79
				pg_prepare($link,'sqlt80','TRUNCATE w_business_points');
	$result2 = pg_execute($link,'sqlt80',array());	
				pg_prepare($link,'sqlt81','TRUNCATE w_business_widget_button');
	$result2 = pg_execute($link,'sqlt81',array());	
					pg_prepare($link,'sqlt82','TRUNCATE w_business_widget_float');
	$result2 = pg_execute($link,'sqlt82',array());	
					pg_prepare($link,'sqlt83','TRUNCATE w_business_widget_iframe');
	$result2 = pg_execute($link,'sqlt83',array());	
				pg_prepare($link,'sqlt84','TRUNCATE w_configs_email');
	$result2 = pg_execute($link,'sqlt84',array());	
					pg_prepare($link,'sqlt85','TRUNCATE w_deliverycity');
	$result2 = pg_execute($link,'sqlt85',array());	
				pg_prepare($link,'sqlt86','TRUNCATE w_order_request');
	$result2 = pg_execute($link,'sqlt86',array());	
				pg_prepare($link,'sqlt87','TRUNCATE w_reg_users_data');
	$result2 = pg_execute($link,'sqlt87',array());	
					pg_prepare($link,'sqlt88','TRUNCATE w_subcategories');
	$result2 = pg_execute($link,'sqlt88',array());	
					pg_prepare($link,'sqlt89','TRUNCATE w_subcategories_lang');
	$result2 = pg_execute($link,'sqlt89',array());	
				pg_prepare($link,'sqlt90','TRUNCATE w_user_points');
	$result2 = pg_execute($link,'sqlt90',array());	
					pg_prepare($link,'sqlt91','TRUNCATE w_website_review');
	$result2 = pg_execute($link,'sqlt91',array());	
					pg_prepare($link,'sqlt92','TRUNCATE w_widget');
	$result2 = pg_execute($link,'sqlt92',array());	
	


	
	$i=0;
	
		foreach($sql_contents as $query){
			if(trim($query)!=''){
				pg_prepare($link,'sqlii'.$i,$query);
				$result2 = pg_execute($link,'sqlii'.$i,array());
			}
			$i++;
		}



		//logo image update start	
		for($kk=1;$kk<=3;$kk++){
			$path =$CFG->dirimagesbackup."logo/".$kk."/";
			$pathMain = $CFG->dirimages."logo/".$kk."/";
			if(file_exists($pathMain."full.jpg")){
				unlink($pathMain."full.jpg");
			}
			if(file_exists($pathMain."normal.jpg")){
				unlink($pathMain."normal.jpg");
			}
			if(file_exists($pathMain."splited.jpg")){
				unlink($pathMain."splited.jpg");
			}

			$pathMain = $CFG->dirimages."logo/".$kk."/";
			$path = $CFG->dirimagesbackup."logo/".$kk."/";
			$oldname =  $path."original.jpg";
			MoveImages_backup($pathMain,$oldname);
		}
		//logo image update end

		//homepage banner image update start
		for($kk=1;$kk<=4;$kk++){
			$pathMain = $CFG->dirimages."banner/home".$kk."/";
			$path =$CFG->dirimagesbackup. "banner/home".$kk."/";
			$oldname =  $path."normal.jpg";
			MoveBannerImages_backup($pathMain,$oldname);
		}
		//homepage banner image update end


		//lang image update start

		for($kk=1;$kk<=23;$kk++){
			$pathMain = $CFG->dirimages."lang/".$kk."/1/";
			$path =$CFG->dirimagesbackup. "lang/".$kk."/1/";
			$oldname =  $path."panel.jpg";
			MoveLangImages_backup($pathMain,$oldname);
		}
		//lang image update end

		//users image update start
		$query = 'SELECT id FROM w_users WHERE isimg=1 ' ;
		pg_prepare($link,'',$query);
		$result3 = pg_execute($link,'',array());

		while($row = pg_fetch_array($result3)){				
			$pathMain = $CFG->dirimages."users/". $row['id']."/";
			$path =$CFG->dirimagesbackup. "users/".$row['id']."/";
			$oldname =  $path."normal.jpg";
			MoveAllUsersImages_backup($pathMain,$oldname);
		}
		//users image update end

		//banner image update start
		for($kk=1;$kk<=10;$kk++){
			$pathMain = $CFG->dirimages."banner/".$kk."/";
			$path =$CFG->dirimagesbackup. "banner/".$kk."/";
			$oldname =  $path."banner.jpg";
			MoveBusinessBannerImages_backup($pathMain,$oldname);
		}
		//banner image update end

		//ads image update start
		$query = 'SELECT id FROM w_ads WHERE isimg=1 ' ;
		pg_prepare($link,'',$query);
		$result3 = pg_execute($link,'',array());

		while($row = pg_fetch_array($result3)){
			$type=0;	
			$pathMain = $CFG->dirimages."ads/". $row['id']."/";
			$path =$CFG->dirimagesbackup. "ads/".$row['id']."/";
			$oldname =  $path."normal.jpg";
			if(file_exists($path."full.jpg")){
				$type=0;
			}

			if(file_exists($path."splited.jpg")){
				$type=1;
			}
			MoveAddsImages_backup($pathMain,$oldname,$type);
		}
		//ads image update start

		//business image  update start
		$recentUserImgArr=array();
		$query1 = 'SELECT id FROM w_business WHERE isimg=1' ;
		pg_prepare($link,'',$query1);
		$result31 = pg_execute($link,'',array());

		while($row = pg_fetch_array($result31)){		
			$pathMain = $CFG->dirimages."business/". $row['id']."/";
			$path =$CFG->dirimagesbackup. "business/".$row['id']."/";
			$oldname =  $path."original.jpg";
			MoveBusinessImages_backup($pathMain,$oldname);
		}
		//business image  update end	

		//dishes image  update start
		$recentUserImgArr=array();
		$query1 = 'SELECT id FROM w_dishes WHERE isimg=1' ;
		pg_prepare($link,'',$query1);
		$result31 = pg_execute($link,'',array());

		while($row = pg_fetch_array($result31)){
			$pathMain = $CFG->dirimages."dishes/". $row['id']."/";
			$path1 =$CFG->dirimagesbackup. "dishes/".$row['id']."/1/";
			$path2 =$CFG->dirimagesbackup. "dishes/".$row['id']."/2/";
			$path3 =$CFG->dirimagesbackup. "dishes/".$row['id']."/2/";
			if(file_exists($path1."original.jpg")){
				$oldname =  $path1."original.jpg";
				MoveDishesImages_backup($pathMain."1/",$oldname);
			}
			if(file_exists($path2."original.jpg")){
				$oldname =  $path2."original.jpg";
				MoveDishesImages_backup($pathMain."2/",$oldname);
			}
			if(file_exists($path3."original.jpg")){
				$oldname =  $path3."original.jpg";
				MoveDishesImages_backup($pathMain."3/",$oldname);
			}
		}
		//dishes image  update end	

		//category image  update start
		$recentUserImgArr=array();
		$query1 = 'SELECT id FROM w_categories WHERE isimg=1' ;
		pg_prepare($link,'',$query1);
		$result31 = pg_execute($link,'',array());

		while($row = pg_fetch_array($result31)){
			$pathMain = $CFG->dirimages."categories/". $row['id']."/";
			$path1 =$CFG->dirimagesbackup. "categories/".$row['id']."/1/";
			/*$path2 =$CFG->dirimagesbackup. "categories/".$row['id']."/2/";
			$path3 =$CFG->dirimagesbackup. "categories/".$row['id']."/2/";*/
		/*	if(file_exists($path1."original.jpg")){
				$oldname =  $path1."original.jpg";
				MoveCatImages_backup($pathMain."1/",$oldname);
			}
			/*if(file_exists($path2."original.jpg")){
				$oldname =  $path2."original.jpg";
				MoveCatImages_backup($pathMain."2/",$oldname);
			}
			if(file_exists($path3."original.jpg")){
				$oldname =  $path3."original.jpg";
				MoveCatImages_backup($pathMain."3/",$oldname);
			}*/
	/*	}
	}
	return true;
	//category image  update end	
}
	
	
function MoveCategoryImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);
	
	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
		copy($oldname,$finalname);
		
	//create thumbnail and regular size

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');


	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(164,150);
	$image->save($folder.'panel.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(264,264);
	$image->save($folder.'preview.jpg');

}

function MoveCatImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
		copy($oldname,$finalname);

	//create thumbnail and regular size

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');


	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(560,291);
	$image->save($folder.'panel.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(264,264);
	$image->save($folder.'preview.jpg');

}

function MoveDishesImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
		copy($oldname,$finalname);

	//create thumbnail and regular size

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');


	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(226,184);
	$image->save($folder.'panel.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(264,264);
	$image->save($folder.'preview.jpg');

}

function MoveBusinessImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
		copy($oldname,$finalname);

	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image->gray();		
	$image->save($folder.'smallgray.jpg');

	$image->gray();		
	$image->save($folder.'minigray.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(110,110);
	$image->save($folder.'medium.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(290,204);
	$image->save($folder.'panel.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(399,307);
	$image->save($folder.'admin.jpg');
}

function MoveUserImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);

	//create thumbnail and regular size

	if ($type=='0'){
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(205,214);
		$image->save($folder.'full.jpg');
	}else{
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(205,95);
		$image->save($folder.'splited.jpg');
	}
}	

function MoveAddsImages_backup($root,$oldname,$type){
	$folder = $root;
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);

	//create thumbnail and regular size

	if ($type=='0'){
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(205,214);
		$image->save($folder.'full.jpg');
	}else{
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(250,250);
		$image->save($folder.'splited.jpg');
	}
}	

function MoveBusinessBannerImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'normal.jpg';

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);

	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image->gray();		
	$image->save($folder.'smallgray.jpg');

	$image->gray();		
	$image->save($folder.'minigray.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(110,110);
	$image->save($folder.'medium.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(264,264);
	$image->save($folder.'panel.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(475,85);
	$image->save($folder.'admin.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(1349,547);
	$image->save($folder.'banner.jpg');


}

function MoveBannerImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'normal.jpg';

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);

	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(1100,201);
	$image->save($folder.'full.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(1350,1102);
	$image->save($folder.'banner.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(470,230);
	$image->save($folder.'splited.jpg');
}	

function MoveLangImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'panel.jpg';

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);

	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(264,264);
	$image->save($folder.'preview.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(164,150);
	$image->save($folder.'panel.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');
}	

function MoveAllUsersImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'normal.jpg';

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);

	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(224,224);
	$image->save($folder.'small.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(264,264);
	$image->save($folder.'medium.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(22,22);
	$image->save($folder.'mini.jpg');
}	

function MoveImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';
	$finalname1 = $folder.'normal.jpg';

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);
	copy($oldname,$finalname1);

	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(1100,201);
	$image->save($folder.'full.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(470,230);
	$image->save($folder.'splited.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(493,241);
	$image->save($folder.'real.jpg');
}	
//Reset counter End*/

function GetReviewData($id,$link)
{
     $query = 'SELECT AVG(quality) as quality,AVG(delivery) as delivery,AVG(dealer) as dealer,AVG(package) as package, count(*) as rating FROM w_review WHERE id_w_business=$1 and status=$2' ;
      pg_prepare($link,'',$query);
    	$result3 = pg_execute($link,'',array($id,'TRUE'));
      $review = array();
      while($row = pg_fetch_array($result3)){

      	$data = new stdClass();
      
			$data->quality = $row['quality'];
      $data->delivery = $row['delivery'];
      $data->dealer = $row['dealer'];
      $data->package = $row['package'];
      $data->rating = $row['rating'];
      $data->total = ($data->quality + $data->delivery + $data->dealer + $data->package)/4;
      //$data->ids = $row['id'];
      //$data->business = $row['id_w_business'];
      //$data->order = $row['id_order'];
      //array_push($review,$data);
   }
    
   
    return $data;
}



function GetWebsiteReviewData($link)
{
     $query = 'SELECT AVG(reviewsite) as reviewsite, count(*) as rating FROM w_website_review WHERE scriptid=$1' ;
      pg_prepare($link,'reviewdata',$query);
    	$result3 = pg_execute($link,'reviewdata',array($_SESSION['scriptid']));
      $review = array();
      while($row = pg_fetch_array($result3))
		  {
      $data = new stdClass();
	  $data->reviewsite = $row['reviewsite'];
      $data->rating = $row['rating'];
      $data->total = ($data->reviewsite);
      //$data->ids = $row['id'];
      //$data->business = $row['id_w_business'];
      //$data->order = $row['id_order'];
      //array_push($review,$data);
   }
    
   
    return $data;
}

function FetchMostPopularsResturantData($link){
	
	
	
	 pg_query($link, "DEALLOCATE ALL");
	 
	 pg_prepare($link,'sqlpopular',"SELECT * FROM w_configs WHERE name=$1");	
	$respo = pg_execute($link,'sqlpopular',array('popularsettings'));
	$rowpo = pg_fetch_array($respo);
	$popularsettings = $rowpo['value'];
	
	if($popularsettings=="1")
	{
	pg_prepare($link,'sqlres','SELECT id,isimg,customslug,scriptid FROM w_business WHERE enabled=$1 AND is_popular=$2 AND scriptid=$3');
	$result = pg_execute($link,'sqlres',array(TRUE,TRUE,$_SESSION['scriptid']));
	}
	else
	{
	pg_prepare($link,'sqlres','SELECT id,isimg,customslug,scriptid FROM w_business WHERE enabled=$1 AND scriptid=$2');
	$result = pg_execute($link,'sqlres',array(TRUE,$_SESSION['scriptid']));
	}
	 
	pg_prepare($link,'sqlSettingsFront','SELECT * FROM w_frontsettings');
	$result1 = pg_execute($link,'sqlSettingsFront',array());
	$row1 = pg_fetch_array($result1);
	$resturant_name = $row1['restaurant'];
	$resturant_name =json_decode($resturant_name);
	
	$respopulars = array();
	
	while($row = pg_fetch_array($result)){ 
		$populara = new stdClass();
	 if (in_array(-1, $resturant_name) || in_array($row['id'],$resturant_name)){
	
		$folder = "../../panel/images/business/". $row['id']."/";
			 if(file_exists($folder))  {
				$populara->isimg = 1; 
				 
			 }else{
				$populara->isimg = 0; 
			 }
		 
		 $populara->customslug = $row['customslug'];
		 $populara->id = $row['id'];
		array_push($respopulars,$populara); 
	 }
	 
	}
	return $respopulars;

}



function FetchMostPopularsCategoryData($link){
	
	
	
	 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql7','SELECT * FROM w_categories where scriptid=$1 AND business in (select id from w_business where enabled=$2)');
	$result = pg_execute($link,'sql7',array($_SESSION['scriptid'],'TRUE'));

	
	$populars = array();
	$populara = array();
	$catarray = array();
	while($row = pg_fetch_array($result)){
		
		
		if(!in_array(strtolower($row['name']),$catarray)) {
		
		array_push($catarray,strtolower($row['name']));
		
		///unset($populara);
		$populara = new stdClass();
		$populara->id = $row['id'];
		$populara->name = cuisinepopularnamebylang($row['id']);
		$populara->isimg = $row['isimg'];
		
	$folder22 = "../images/categories/". $row['id']."/1/*";
			if($row['isimg']==1)
			{
				if(count(glob($folder22))>0)
				
				{
					$populara->isimg = 1; 
				}
				else
				 {
					$populara->isimg = 0;  
				 }
			} 
			
			 else
			 {
				$populara->isimg = 0;  
			 }
				
		if(sizeof($populars)<=5) {
		if($populara->name !=null)
		array_push($populars,$populara);
		}
		}
	}
	return $populars;
}
function FetchAllCountriesData($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_countries WHERE scriptid=$1 AND enabled=$2 order by name asc');
	
	$result = pg_execute($link,'sql0',array($_SESSION['scriptid'],'TRUE'));

	$countries = array();
	while($row = pg_fetch_array($result))
		{
			$country = new stdClass();
		//unset($country);
		$country->id = $row['id'];
		$country->name = countrynamebylang($row['id'],$link);
		if($country->name !=null)
		array_push($countries,$country);
		}
		
	return $countries;
	}
function fetchenterprise($link){
	$sp = 'specialenterprise';
	pg_prepare($link,'sqcon1','SELECT * FROM w_configs where name=$1');
	$result = pg_execute($link,'sqcon1',array($sp));
	$row = pg_fetch_array($result);
	//unset($country);
	$country = new stdClass();
	return $val = $row['value'];
}
function FetchCreateAccount($link) {
	
	pg_prepare($link,'sqlcreateaccount','SELECT * FROM w_createaccount WHERE scriptid =$1 ORDER BY id asc');
	$result = pg_execute($link,'sqlcreateaccount',array($_SESSION['scriptid']));
	$createaccounts = array();
	while($row = pg_fetch_array($result)){
		$createaccount = new stdClass();
		$createaccount->id = $row['id'];
		$createaccount->field_name = $row['field_name'];
		$createaccount->type = $row['type'];
		$createaccount->required = $row['required'];
		$createaccount->status = $row['status'];
		array_push($createaccounts,$createaccount);
	}
	return $createaccounts;
}

function FetchUserInfo($user,$link)
	{
		//print_r($user);
		//echo "swer";
//		return $user;
	pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlw',array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	
		
	pg_prepare($link,'sql','SELECT * from w_users WHERE id=$1');
	$result = pg_execute($link,'sql',array($user));
	
	pg_prepare($link,'sqlcity','SELECT * from w_franchises WHERE id=$1');
pg_prepare($link,'sqlcountry','SELECT * from w_countries WHERE id=$1');
	//unset($user);
	$user = new stdClass();
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$user->id = $row['id'];
			$user->name = usersnamebylang($row['id']);
			$user->lastname = userslastnamebylang($row['id']);
			$user->lastname2 = userslast2namebylang($row['id']);
			$user->email = $row['email'];
			$user->pwd = $row['pwd'];
			$user->street = usersstreetbylang($row['id']);
			$user->colony = $row['colony'];
			$user->cp = $row['cp'];
			$user->country = $row['country'];
			$user->city = $row['city'];
			$user->tel = $row['tel'];
			$user->cel = $row['cel'];
			
			$user->api = $row['api'];
			
			$resultw = pg_execute($link,'sqlcity',array($row['city']));
			$user_rec = pg_fetch_array($resultw);
			
			$user->cityname = userscitybylang($row['city']);
			
			$resultc1 = pg_execute($link,'sqlcountry',array($row['country']));
			$user_rec1 = pg_fetch_array($resultc1);
			
			$user->countryname = userscountrybylang($row['country']);
			
			
			$user->job = usersjobbylang($row['id']);
			$user->location = $row['location'];
			$user->level = $row['level'];
			$user->userreference = $row['userreference'];
			$user->userday = $row['userday'];
			$user->usermonth = $row['usermonth'];
			$user->useryear = $row['useryear'];
			$user->findfrom = $row['findfrom'];
			$user->levelname = GetLevelText($user->level);
			$user->panelsetting = $row2['value'];
			}
		
	return $user;
	}
function FetchAllneighborhoodData($filters,$link)
	{
		
		$conditionalsvalues = array();
	$query = 'SELECT * FROM w_neighborhood WHERE w_neighborhood.enabled=true';

	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . '.';
			if ($count>0)
				$conditionals .= ' AND ' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals.'ORDER BY name ASC';
		}
		
	//echo $query.'$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);

	$neighborhoods = array();
	while($row = pg_fetch_array($result))
		{
		/*unset($neighborhood);
		unset($admin);*/
		$neighborhood = new stdClass();
		$admin = new stdClass();
		
		$neighborhood->id = $row['id'];
		$neighborhood->city = $row['city'];
		$neighborhood->country = $row['country'];
		//$neighborhood->name = $row['name'];
		$neighborhood->name = areanamebylang($row['id']);
		array_push($neighborhoods,$neighborhood);
		}

	return $neighborhoods;
	}

function FetchAllColonyData($filters,$link)
	{
		//print_r($filters);
		$city_code = $filters[0]->value;
	$conditionalsvalues = array();
	$query = 'SELECT * FROM w_neighborhood WHERE w_neighborhood.enabled=true and city=$1';
/*
	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			if ($count>0)
				$conditionals .= ',' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}*/
	
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',array($city_code));

	$franchises = array();
	while($row = pg_fetch_array($result))
		{
		/*unset($franchise);
		unset($admin);*/
		$franchise = new stdClass();
		$admin = new stdClass();

		$franchise->id = $row['id'];
		$franchise->city = $row['city'];
		$franchise->country = $row['country'];
		$franchise->name = $row['name'];
		
		array_push($franchises,$franchise);
		}

	return $franchises;
	}

function FetchAllFranchisesData($filters,$link)
	{
		//print_r($filters);
	$conditionalsvalues = array();
	$query = "SELECT w_franchises.id,w_franchises.city,w_franchises.email,w_franchises.ga FROM w_franchises WHERE w_franchises.enabled=true";

	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			if ($count>0)
				$conditionals .= ',' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
		$query .=' AND w_franchises.scriptid='.$_SESSION['scriptid'];
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	//	echo $query;
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);

	$franchises = array();
	
	while($row = pg_fetch_array($result))
		{
		//unset($franchise);
		//unset($admin);

		$franchise = new stdClass();
		$admin = new stdClass();

		
		$franchise->id = $row['id'];
		$franchise->city = citynamebylang($row['id'],$link);
		$franchise->email = $row['email'];
		$franchise->ga = $row['ga'];
		$franchise->currency = $row['currency'];
		$franchise->tax = $row['tax'];
		$franchise->taxtype = $row['taxtype'];
		if($franchise->city !=null)
		array_push($franchises,$franchise);
		}

	return $franchises;
	}



function GetWhereAmIData()
	{
		//$_SESSION['whereami'] = $_SESSION['whereami'];
	
	return json_encode($_SESSION['whereami']);
	}


function FetchAllBusinessData($link,$location,$deliveryType,$category,$city,$filters,$limit,$offset,$whereall,$lang_resource)
	{
		//echo "aaaa";
	if(!$limit){$limit =  10;}
	if(!$offset){$offset =  0;}

	if($whereall->city){
		pg_prepare($link,'sqldf33','SELECT * from w_franchises WHERE id=$1');
		$result_time_zone = pg_execute($link,'sqldf33',array($whereall->city));
		$result_rec = pg_fetch_array($result_time_zone);

		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
	}else {
		pg_prepare($link,'sqlfree2','SELECT * from w_franchises');
		$resultfree2 = pg_execute($link,'sqlfree2',array());
		$result_rec = pg_fetch_array($resultfree2);
	
		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
		
		
	}
	
	 $usersearchAddress = $whereall->address;
	 
	 $categorysearchNew = "SELECT * from w_categories WHERE id = $1 AND enabled=true ";
	 pg_prepare($link,'sqlcatnew',$categorysearchNew);
	 
	 pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
	 $resultset = pg_execute($link,'sqlw',array('panelsetting'));
	 $rowset = pg_fetch_array($resultset);
	 $panelsetting = $rowset['value'];
	
		 pg_prepare($link,'sqlw1','SELECT * FROM w_configs where name=$1');
		$resultset1 = pg_execute($link,'sqlw1',array('businesslist_pagination'));
		$rowset1 = pg_fetch_array($resultset1);
		$businesslist_pagination = $rowset1['value'];
		$zipcodeordersetting = "zipcodeordersetting";
	pg_prepare($link,'sqlzset','SELECT * FROM w_configs WHERE name=$1');
	$resultzset = pg_execute($link,'sqlzset',array($zipcodeordersetting));
	$rowzset = pg_fetch_array($resultzset);
	$zsettingval = $rowzset["value"];		
  	if($deliveryType == "categorysearch") {
	if($panelsetting == 2) {
		
		if(empty($category)) {
			return;
			}
			
		$categoryAllArray = explode(",",$category);
		
		
		foreach ($categoryAllArray as $categoryeach ){
			
		
			$catresult = pg_execute($link,'sqlcatnew',array($categoryeach));
			$catfetchresult = pg_fetch_array($catresult);
			
			if(pg_num_rows($catresult)>0 && $catfetchresult['business'] != "null" && $catfetchresult['business'] != "" )
			{
				if(empty($businessrecord)) {
					$businessrecord[] = $catfetchresult['business'];
					}
			   else if(!in_array($catfetchresult['business'],$businessrecord)) {
					
						$businessrecord[] = $catfetchresult['business'];
				}
			}
			
			
			}
			
			//print_r($businessrecord);
		// 
		 $query = "SELECT * from w_business WHERE enabled=true and id in (".implode(",",$businessrecord).") ";
		
		
		
		
		} else {
	 $categorydp ="\"".$category."\"";		
	 $query = "SELECT * from w_business WHERE enabled=true AND categories like '%".$categorydp."%' ";
	 
		}
	 
	  }
 else if($city !=0)
  {
	$conditionalsvalues = array();
	$query = 'SELECT * from w_business WHERE city=$1 AND enabled=true';
	array_push($conditionalsvalues,$city);
  }
  
  else{
	  
	 $conditionalsvalues = array();
	 $query = 'SELECT * from w_business WHERE  enabled=true';
	
   }
  	 $catalog =  'SELECT * from w_menus WHERE business=$1 AND  enabled=true';
	pg_prepare($link,'sqlw2',$catalog);
	
	
	if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = '';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= ' and ' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

		$query .=' and scriptid='.$_SESSION['scriptid'];

		if($whereall->searchby == "newest"){
     $query .=' and scriptid='.$_SESSION['scriptid'].' ORDER BY id DESC';
      
  }

  if($deliveryType == "categorysearch") {
	pg_prepare($link,'sql2123',$query);
	
	$result123 = pg_execute($link,'sql2123',array());
	} else {
		
	pg_prepare($link,'sql2123',$query);
	
	$result123 = pg_execute($link,'sql2123',$conditionalsvalues);
	
		
		}
	//echo $query;	
  
  //print_r($business->numrow)
	///////////// for custom slug when businesslist previous and next function////////////
/*	if($offset!='-1'){
		$query .=' LIMIT 10 OFFSET '.$offset;}	*/
	///////////// for custom slug when businesslist previous and next function////////////	
	


	if($deliveryType == "categorysearch") {
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',array());
	} else {
		
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
		
		}
	
	$zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
	pg_prepare($link,'sqlz2',$zipquery);
	

	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_dishes WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfmc',$menufetchcount);
	/* added on 01-08-2014 */
	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_reserve WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfrv',$menufetchcount);
	/* added on 01-08-2014 */
	
	
	$paypaladaptive = 'SELECT * from w_splitpaymain WHERE  bus_id=$1';
	pg_prepare($link,'sqlpa',$paypaladaptive);
	
	$galleryImage = 'SELECT * from w_gallery WHERE  business=$1 AND type=$2';
	pg_prepare($link,'sqlgallery',$galleryImage);
	 //Settings to select miles or km 
	$sqldformat = "SELECT * from w_configs WHERE  name='distanceformat'";
	pg_prepare($link,'sqldformat',$sqldformat);
	$resultdformat = pg_execute($link,'sqldformat',array());
	$rowdformat = pg_fetch_array($resultdformat);
	$distanceformat=$rowdformat["value"];
	
	
	$allbusiness = array();
	if (!empty($location))
					{
        $locationN = parse($location);
					}

	while($row = pg_fetch_array($result))
		{
		unset($business);
		unset($ziprecord);
		unset($resultc);
		//$business->numrow = pg_num_rows($result123);
		if($businesslist_pagination ==1)
		{
		$business->numrow = pg_num_rows($result123);
		}
		
		$business->businesslist_pagination = $businesslist_pagination;


		$blocation = parse($row['location']);
		
	    $ziprecord = pg_execute($link,'sqlz2',array($row['id'],'TRUE'));
		$business->ziprecord = pg_num_rows($ziprecord);
		
		$reserve = pg_execute($link,'sqlfrv',array($row['id'],'TRUE'));
		$business->reserve = pg_num_rows($reserve);
		
		/* added on 01-08-2014 */	
		$resultfm = pg_execute($link,'sqlfmc',array($row['id'],'TRUE'));
		if(pg_num_rows($resultfm) == 0){
			$business->menulist = 0;	
		}else{
			$business->menulist = 1;
		}
		/* added on 01-08-2014 */
		
		$resultc = pg_execute($link,'sqlw2',array($row['id']));
		$firstCatalog =pg_fetch_array($resultc);
	
		$parecord = pg_execute($link,'sqlpa',array($row['id']));
		
		$rowpa = pg_fetch_array($parecord);
		if($rowpa['splitcase'] == 1 || $rowpa['splitcase'] == 2)
			$business->parecord ="TRUE";
		else
			$business->parecord ="FALSE";		
		
		$business->currency = currency_symbol($row['currency']);
		$business->bcurrency = $row['currency'];
		$business->taxtype = $row['taxtype'];
		$business->tax = $row['tax'];
		$business->id = $row['id'];
		
		$business->name = businessnamebylang($row['id']);
		$business->street = businessusersstreetbylang($row['id']);
		$business->colony = $row['colony'];
		$business->cp = $row['cp'];
		$business->tel = $row['tel'];
		$business->cel = $row['cel'];
		$business->email = $row['email'];
		if(IS_PAYPAL_ENABLED == 1)
		$business->paypal = $row['paypal'];
		$business->schedule = $row['schedule'];
		if($row['categories'] !=null){
		$business->categories = checkcategoriesexistbylang($row['categories'],$row['id']);
		}else{
		$business->categories ='';	
		}
		$business->location = $row['location'];
		$business->locationPoint = $row['location'];
		$business->zonesloc = $row['zones'];
		$business->city = $row['city'];
		$business->zones = $row['zones'];		
		$business->enabled = $row['enabled'];		
		$business->acceptcard = $row['acceptcard'];	
		$business->acceptcash = $row['acceptcash'];	
		$business->businesspagecustomtext = $row['businesspagecustomtext'];	
		
		$business->minimum = $row['minimum'];
		$business->firstCatalog = $firstCatalog['id'];
		//	$business->headerurl = 'panel/images/gallery/22/gallery.jpg';	
		/*$sqlgallery_result = pg_execute($link,'sqlgallery',array($row['id'],"2"));
		$sqlgallery_array = pg_fetch_array($sqlgallery_result);
		if(pg_num_rows($sqlgallery_result) == 0) {
				$business->headerurl = 	'panel/images/dummy/restaurant-banner.png';
			} else {
		$business->headerurl = 	'panel/images/gallery/'.$sqlgallery_array['id'].'/gallery.jpg';
			}*/
		if($row['isimgh'] == 1){
			$business->headerurl ='panel/images/banner/'.$row['id'].'/banner.jpg';
		}else{
			$business->headerurl ='panel/images/dummy/restaurant-banner.png';
		}
		$business->twiliophone = $row['twiliophone'];	
		$business->twilioenabled = strtolower($row['twilioenabled']) == "t";
		$business->acceptsms = strtolower($row['acceptsms']) == "t";
		$business->review = GetReviewData($row['id'], $link);
		$business->clientkey = $row['clientkey'];
		$business->secretkey = $row['secretkey'];
		$business->burl = $row['burl'];
		$business->csvupload = $row['csvupload'];
		
		$business->abusiness = $row['abusiness'];
		 //Settings to select miles or km 
		$business->distanceformat = $distanceformat;
		$distance = distanceCalculator($locationN->latitud,$locationN->longitud,$blocation->latitud,$blocation->longitud, "$distanceformat");
		//$business->distance = number_format($distance,1);
		$business->distance = $distance;
		$business->customslug = $row['customslug'];
		$business->promotion = businesspromotion($row['id']);
		
		$folder = "../images/business/". $row['id']."/*";
		
			if($row['isimg']==1)
			{
				if(count(glob($folder))>0)
				
				{
					$business->isimg = 1; 
				}
				else
				 {
					$business->isimg = 0;  
				 }
			} 
			
			 else
			 {
				$business->isimg = 0;  
			 }
		
		$business->environment = $row['environment'];
		$business->merchant_id = $row['merchant_id'];
		$business->public_key = $row['public_key'];
		$business->private_key = $row['private_key'];
		
		
		$business->tkey = $row['tkey'];
		$business->aplid = $row['aplid'];
		
		
		$business->mercury_id = $row['mercury_id'];
		$business->mercury_pass	 = $row['mercury_pass'];
		
		$business->cardsaveid = $row['cardsaveid'];
		$business->cardsavepass = $row['cardsavepass'];
		$business->feature = $row['feature'];
		
		$business->OfferStatus = checkOfferStatus($row['id'],$link);
        $business->ReviewStatus = checkReviewStatus($row['id'],$link);
        $business->ExpressServiceStatus = $row['express_service'];
		
		$business->expresscheck = $row['expresscheck'];
		$business->expresscheckprice = $row['expresscheckprice'];
		
		
		$business->deliverytime = $row['deliverytime'];
		$business->pickuptime = $row['pickuptime'];
		
		$business->catalog = pg_num_rows($resultc);
		$business->shipping = "0";
	    $business->open = true;
		
		$business->servicefee = $row['servicefee'];
		
		$business->DeliveryStatus = checkDeliveryStatus($row['id'],$link);
		$business->PickupStatus = checkPickupStatus($row['id'],$link);

		$business->paymentdetails = PaymentFetch($row['id'],$link);

		$business->reviewsettings = $row['review_status'];
		$business->photosettings = $row['photo_upload_status'];
		
		$business->deliverycitysearch =  false;
		$business->againmenuopenchk = businessopenChkforMenu($row['id'],$link);

		
		
		
		
		$now = strtotime(GetTimeByZone($_SESSION['timezone']));
		$daysu = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		$todaysu = $daysu->{date("D",strtotime(date('d-m-Y')))};
		
		$schedule1 = parse($business->schedule);
		/*$business->opentime = $schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute ;
		$business->closetime = $schedule1->sdays->{$todaysu}->closes->hour . ':' . $schedule1->sdays->{$todaysu}->closes->minute ;*/
		
		if($schedule1->sdays->{$todaysu}->closes->hour == 25) {
			$fiterClosehr  = 1;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 26) {
			$fiterClosehr  = 2;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 27) {
			$fiterClosehr  = 3;
			
		}

		else if($schedule1->sdays->{$todaysu}->closes->hour == 28) {
			$fiterClosehr  = 4;
		}
		else {
			$fiterClosehr  = $schedule1->sdays->{$todaysu}->closes->hour;
			
			}
	$business->opentime = date('h:i A',strtotime($schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute));
	$business->closetime = date('h:i A',strtotime($fiterClosehr  . ':' . $schedule1->sdays->{$todaysu}->closes->minute));
	
	

		if($business->name !=null && $business->categories !=null )
		array_push($allbusiness,$business);
		}
			  
					if($whereall->reservation != true){		
					  
							  $allbusinessFilter = array();

						       foreach($allbusiness as $business)
										{
						       if($business->catalog!="0" &&  $business->menulist == "1")	 				
								array_push($allbusinessFilter,$business);
										}
				                $allbusiness  = array();					
								foreach($allbusinessFilter as $business)
										{
								array_push($allbusiness,$business);
										}
					}
					
				

		
	/****************************************************************Reservation Filter Section *****************************************************************/
/*Filter By Cateegory*/
$allbusinessFilter = array();
foreach($allbusiness as $business){	 
	if ($business->categories !="null"){
		array_push($allbusinessFilter,$business);
	}
}
$allbusiness  = array();					
foreach($allbusinessFilter as $business){
	array_push($allbusiness,$business);
}
/*Filter By Cateegory*/



/* Filter by Resturant */

	$allbusinessFilter = array();
	$filterresturant = parse($whereall->resturant);
	if(count($filterresturant)!=0){
		
		foreach($allbusiness as $business){
			if(in_array("-1",$filterresturant))				
					array_push($allbusinessFilter,$business);
			else if(in_array($business->id,$filterresturant))				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Cuisine */

	$allbusinessFilter = array();	
	$filtercuisinesnew = parse($whereall->cuisines);
	$filtercuisines = $filtercuisinesnew;

	if(count($filtercuisines)!=0){
		
		foreach($allbusiness as $business){
			$bucateg = parse($business->categories);
			if(in_array("-1",$filtercuisines))				
					array_push($allbusinessFilter,$business);
			else if(count(array_intersect($bucateg,$filtercuisines))>0)				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Distance */

	$allbusinessFilter = array();
	$filterdistance = $whereall->distance;
	
	if($filterdistance !=""){
		foreach($allbusiness as $business){
			if($business->distance <= $filterdistance)				
					array_push($allbusinessFilter,$business);
		}
		
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}

if($whereall->reservation == true){
	
	
	$allbusinessFilter = array();
	$usertime = strtotime($whereall->rdate .' '. $whereall->rhour.':'.$whereall->rmin);
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
    $todayid = $days->{date("D",$usertime)};

    $userDate = date("Y-m-d",$usertime);

	//echo $todayid = date("d/m/Y h:i:m",strtotime($usertime));
	//echo date("D",$usertime);
	
	$fetchreservetime = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
	pg_prepare($link,'sqlfs',$fetchreservetime);

		foreach($allbusiness as $business){
		
			$resrecord = pg_execute($link,'sqlfs',array($business->id,'TRUE'));
			
			
			while($rowres = pg_fetch_array($resrecord)){	
					
				$dayres = parse($rowres['days']);
				$scheduleres = parse($rowres['schedule']);
				
				foreach ($dayres as $day){
				
					if($whereall->rhour == "-1" && $whereall->rmin == "-1" ) {
						
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						}
					else if(!$whereall->rhour)	{
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						
						}
					else if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
					{
						if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour1,$scheduleres->opens->minute1) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour1,$scheduleres->closes->minute1))
						{
							if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
						else if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour,$scheduleres->opens->minute) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour,$scheduleres->closes->minute))
						{
						//business opened now check if it didnt close
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
					}/*End if loop*/
				}/*End schedule for each loop*/
				
			}/*End Schedule while loop*/
			
		}/*End Business for each loop*/
	
			$allbusiness  = array();					
				foreach($allbusinessFilter as $business){
						array_push($allbusiness,$business);
				}
	

$allbusinessFilter = array();
$filterguest = $whereall->guest;


/* Guest Filter in Reservation */

if($filterguest !=""){
	
		foreach($allbusiness as $business){
		
		if($whereall->rdate!= "") {
						
			$guest = 0;
			$guestquery = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
			pg_prepare($link,'sqlguest'.$business->id,$guestquery);
			$guestrecord = pg_execute($link,'sqlguest'.$business->id,array($business->id,'TRUE'));
			while($rowguest = pg_fetch_array($guestrecord)){	
				$guest += $rowguest['guest'];
			}
			
					
						
			$rdateAll = explode("/",$whereall->rdate);
			$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
			$reservefreequery = 'SELECT * from w_reserve_book WHERE business =$1 and date =$2';	
			pg_prepare($link,'sqlfr'.$business->id,$reservefreequery);
			$reservefreerecord = pg_execute($link,'sqlfr'.$business->id,array($business->id,$rdate_merge));
	
			if(pg_num_rows($reservefreerecord) != 0){
			
				$reservefree = array();
				$cntfre = 1;
				$bguest = 0;
				while($rowf= pg_fetch_array($reservefreerecord)){
					
					pg_prepare($link,'sqlchk1'.$rowf['id'],'SELECT * from w_reserve WHERE id=$1');
					$chktime = pg_execute($link,'sqlchk1'.$rowf['id'],array($rowf['rid']));
					
					$cntfre++;
					
					$rowchktime = pg_fetch_array($chktime);
	
					$duration = json_decode($rowchktime['duration'],false);
					
					$sch1=(array)$duration->{'duration'};
		
					$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
					
					$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time
	
					$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
					
					$diftime = round(abs($to_time - $from_time)/60); //difference between two time
					
					if($chktime > $diftime){
						$bguest += $rowf['booked'];
					}
					
				}
				
		}
	    }
		$remguest = $guest - $bguest;
		
		if($remguest >= $filterguest)				
			array_push($allbusinessFilter,$business);	
	
	}
		
	
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
}





}
	

						
/************************************End Reservation***************************************/	
				
				
										
				
				
				
				include('front_search_panel.php');
				
				if($whereall->delivery_neighborhoodStaus == 1 && $deliveryType == "delivery") {
			
		
			    $newbusiness = frontserachneighborhood($location,$allbusiness,$link,$whereall);
			
			    return $newbusiness;
			
						}
				else if($deliveryType == "delivery")
				{
					// 2 means new panel
					
					if( $panelsetting == 2) { 
					
						$newbusiness = frontserachpanelnew($location,$allbusiness,$link,$deliveryType,$whereall);
						
						
					}
					else if(pg_num_rows($result) == 0) {
						
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
					else {
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
						
						
						
						return $newbusiness;
					
				}
				
			else if($deliveryType == "citysearch"  || $deliveryType == "pickup" || $deliveryType == "categorysearch" )
			{
			
			/********************************city restaurant show here**********************************/
			
					$cityquery1 ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc185',$cityquery1);
					if($city == 0){					
					$result11 = pg_execute($link,'sqlc185',array($business->city));
					}else{
					$result11 = pg_execute($link,'sqlc185',array($city));	
					}
					$rec1 = pg_fetch_array($result11);
					$cityname = $rec1['city'];
					
			
		
				   $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc1',$cityquery);
					$result = pg_execute($link,'sqlc1',array($city));
					$rec = pg_fetch_array($result);
					//$cityname = $rec['city'];
					 $_SESSION['timezone'] = $rec['timezone'];
				
				$newbusiness = array();
				foreach($allbusiness as $business)
						{
							if($whereall->activebusiness) {
								
								if($whereall->activebusiness == $business->id ) {
									if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup")
										{
											$business->shipping = 0;
										}
										else { 
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										 if($whereall->searchby == "offer"){                                        
                                        
                                        if ($whereall->searchby == "offer" && $business->OfferStatus == "true" && $deliveryType == "pickup")
                                        array_push($newbusiness,$business);
                                        }else if($whereall->searchby == "rating"){
                                            
                                        if ($whereall->searchby == "rating" && $business->ReviewStatus == "true" && $deliveryType == "pickup")
                                        array_push($newbusiness,$business); 
                                        }else if($whereall->searchby == "express"){
                                            
                                        if ($whereall->searchby == "express" && $business->ExpressServiceStatus == "TRUE" && $deliveryType == "pickup")
                                        array_push($newbusiness,$business); 
                                        }else if($business->burl != "" && $business->csvupload=="true"){                                       
                                        array_push($newbusiness,$business); 
                                        }    
                                        else{
                                        
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										else if ($deliveryType == "citysearch" || $deliveryType == "categorysearch" )
										array_push($newbusiness,$business);
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true)
										array_push($newbusiness,$business);
										}
										//unset($business);
										$business = new stdClass();
								}
							}
							else {
		
										if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup" && $business->PickupStatus == true)
										{
											$business->shipping = 0;
										}
										else { 
										
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										
										
										 if($whereall->searchby == "offer"){                                        
                                        
                                        if ($whereall->searchby == "offer" && $business->OfferStatus == "true" && $deliveryType == "pickup")
                                        array_push($newbusiness,$business);
                                        }else if($whereall->searchby == "rating"){
                                            
                                        if ($whereall->searchby == "rating" && $business->ReviewStatus == "true" && $deliveryType == "pickup")
                                        array_push($newbusiness,$business); 
                                        }else if($whereall->searchby == "express"){
                                            
                                        if ($whereall->searchby == "express" && $business->ExpressServiceStatus == "TRUE" && $deliveryType == "pickup")
                                        array_push($newbusiness,$business); 
                                        } else if($business->burl != "" && $business->csvupload=="true"){                                       
                                        array_push($newbusiness,$business); 
                                        }      
                                        else{
                                        				
										
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										
										
										else if (($deliveryType == "citysearch" || $deliveryType == "categorysearch") && ($business->PickupStatus == "true" || $business->DeliveryStatus == "true") )
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true )
										array_push($newbusiness,$business);
										
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										}
										//unset($business);
										$business = new stdClass();
								
								
								}
						}
				
				
				
					$now = strtotime(GetTimeByZone($_SESSION['timezone']));
					$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
					$todayid = $days->{date("D",$now)};
					 $curHour = date('H',$now);
					foreach($newbusiness as $business)
						{
						//get the time in the current user zone
						//now check if the business is open...
						$schedule = parse($business->schedule);
						$onday = false;
						foreach ($schedule->days as $day)
							{
							if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
								{//business is in the correct day, now check the time...
								  $priviousDay = previousDayCounti();
								  
		if(($schedule->sdays->{$priviousDay}->closes->hour== 24 || $schedule->sdays->{$priviousDay}->closes->hour == 25 || $schedule->sdays->{$priviousDay}->closes->hour == 26 || $schedule->sdays->{$priviousDay}->closes->hour == 27 || $schedule->sdays->{$priviousDay}->closes->hour == 28) && $curHour < 5 ) {
			
				 $preclosetime = preclosetimefun($schedule,$priviousDay);
				 		
				 $newScedule = strtotime($preclosetime.":".$schedule->sdays->{$priviousDay}->closes->minute);
				 
				                 if ($now>=$newScedule) {
					if($schedule->sdays->{$todayid}->closes->hour >23 )	{	
					
					if($schedule->sdays->{$todayid}->opens->hour > $curHour)	{
						
						$newScedule = strtotime($preclosetime.':'.$schedule->sdays->{$todayid}->closes->minute);
						
						}
					else {
						 $newScedule = strtotime('23:59');
						}  
		
					
					
					}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
									$shopopenstatus = true;	
									
									
								 } else 	{
			
									$shopopenstatus = true;	
									
									
									
									}
									
										
									
} else if ($now>=strtotime($schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute))  {
						
						if($schedule->sdays->{$todayid}->closes->hour >23 )	{		  
			  $newScedule = strtotime('23:59');
						}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
				$shopopenstatus = true;	
				
				
}
else {
	$shopopenstatus = false;
	
	}

							if($shopopenstatus == true) {
										  
									//business opened now check if it didnt close
									if ($now>=$newScedule)
										{
										//business closed
										$business->open = false;
										if ($day=='0')
											{
											/*if ($todayid==7)
												$tday = 1;
												else
												$tday = $todayid+1;
											
											if (intval($schedule->sdays->{$tday}->opens->minute)<10)
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
												else
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
			
											if (intval($schedule->sdays->{$tday}->opens->hour)<10)
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;
												else
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;*/
											
											$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
											}
										}
										else
										{
										//business open
										if($business->againmenuopenchk == true) {
											$business->open = true;
										}
										else {
											$business->open = false;
											}
										}
									}
									else
									{
									//business still not opened
									$business->open = false;
									/*if (intval($schedule->sdays->{$todayid}->opens->minute)<10)
										$min = $schedule->sdays->{$todayid}->opens->minute;
										else
										$min = $schedule->sdays->{$todayid}->opens->minute;
			
									if (intval($schedule->sdays->{$todayid}->opens->hour)<10)
										$hour = $schedule->sdays->{$todayid}->opens->hour;
										else
										$hour = $schedule->sdays->{$todayid}->opens->hour;*/
			
									$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
									}
								$onday = true;
								}
							}
			
						if ($onday==false)
							$business->open = false;
						}
			
					foreach($newbusiness as $business)
						{
						if (empty($business->willopen) && $business->open==false)
							{
							//need to find the next day that will open
							$t = intval($todayid)+1;
							$nextday = -1;
							$schedule = parse($business->schedule);
							for ($i=$t;$i<=7;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
			
							if ($nextday==-1)//means that the next day ist before in week days...
							for ($i=1;$i<$t;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
							$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
							//$ndays = array('','monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			
							if (intval($schedule->sdays->{$nextday}->opens->minute)<10)
								$min = $schedule->sdays->{$nextday}->opens->minute;
								else
								$min = $schedule->sdays->{$nextday}->opens->minute;
			
							if (intval($schedule->sdays->{$nextday}->opens->hour)<10)
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								else
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								
								$willopen = FetchMenuTimeOnCloseBusiness($business->id);
								$business->willopen = $willopen;
			
							
							}
			
						$business->schedule = null;
						//unset($business->schedule);
						$business->schedule = new stdClass();
						}
					/*********************************************End city restaurant show here****************************************************/
					/*
					foreach($newbusiness as $business)
						{
							echo $business->name;
							echo "<br>";
							
						}
						print_r($newbusiness);
						exit;*/
						
					return $newbusiness;
			}

				}
				
function FetchAllBusinessData1($link,$location,$deliveryType,$category,$city,$filters,$limit,$offset,$whereall,$lang_resource)
	{
		
	if(!$limit){$limit =  10;}
	if(!$offset){$offset =  0;}

	if($whereall->city){
		pg_prepare($link,'sqldf33','SELECT * from w_franchises WHERE id=$1');
		$result_time_zone = pg_execute($link,'sqldf33',array($whereall->city));
		$result_rec = pg_fetch_array($result_time_zone);

		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
	}else {
		pg_prepare($link,'sqlfree2','SELECT * from w_franchises');
		$resultfree2 = pg_execute($link,'sqlfree2',array());
		$result_rec = pg_fetch_array($resultfree2);
	
		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
		
		
	}
	
	if($businessid){
	$bquery ="SELECT * FROM w_business WHERE id=$1"; 
	pg_prepare($link,'sqlca1',$bquery);
	$results = pg_execute($link,'sqlca1',array($businessid));
	$bcity = pg_fetch_array($results);
	$_SESSION['timezone'] = $bcity['timezone'];
	}
	
	 $usersearchAddress = $whereall->address;
	 
	 $categorysearchNew = "SELECT * from w_categories WHERE id = $1 AND enabled=true ";
	 pg_prepare($link,'sqlcatnew',$categorysearchNew);
	 
	 pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
	$resultset = pg_execute($link,'sqlw',array('panelsetting'));
	$rowset = pg_fetch_array($resultset);
	$panelsetting = $rowset['value'];
	
		 pg_prepare($link,'sqlw1','SELECT * FROM w_configs where name=$1');
		$resultset1 = pg_execute($link,'sqlw1',array('businesslist_pagination'));
		$rowset1 = pg_fetch_array($resultset1);
		
		$businesslist_pagination = $rowset1['value'];
		
		 pg_prepare($link,'sqlw112','SELECT * FROM w_configs where name=$1');
		$resultset112 = pg_execute($link,'sqlw112',array('servicefeesettings'));
		$rowset55 = pg_fetch_array($resultset112);
		
		$servicefeesettings = $rowset55['value'];
		
  if($deliveryType == "categorysearch") {
	if($panelsetting == 2) {
		
		if(empty($category)) {
			return;
			}
			
		$categoryAllArray = explode(",",$category);
		
		
		foreach ($categoryAllArray as $categoryeach ){
			
		
			$catresult = pg_execute($link,'sqlcatnew',array($categoryeach));
			$catfetchresult = pg_fetch_array($catresult);
			
			if(pg_num_rows($catresult)>0 && $catfetchresult['business'] != "null" && $catfetchresult['business'] != "" )
			{
				if(empty($businessrecord)) {
					$businessrecord[] = $catfetchresult['business'];
					}
			   else if(!in_array($catfetchresult['business'],$businessrecord)) {
					
						$businessrecord[] = $catfetchresult['business'];
				}
			}
			
			
			}
			
			//print_r($businessrecord);
		// 
		 $query = "SELECT * from w_business WHERE enabled=true and id in (".implode(",",$businessrecord).") ";
		
		
		
		
		} else {
	 $categorydp ="\"".$category."\"";		
	 $query = "SELECT * from w_business WHERE enabled=true AND categories like '%".$categorydp."%' ";
	 
		}
	 
	  }
	  
 else if($city !=0)
  {
	$conditionalsvalues = array();
	$query = 'SELECT * from w_business WHERE city=$1 AND enabled=true';
	array_push($conditionalsvalues,$city);
  }
  
  else{
	  
	 $conditionalsvalues = array();
	 $query = 'SELECT * from w_business WHERE  enabled=true';
	
   }
  	 $catalog =  'SELECT * from w_menus WHERE business=$1 AND  enabled=true';
	pg_prepare($link,'sqlw2',$catalog);
	
	
	if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = '';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= ' and ' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
		if($whereall->businesstype){
			if($whereall->businesstype == 'b1'){
				$query .=' and tab_food =TRUE ';
			}
			if($whereall->businesstype == 'b2'){
				$query .=' and tab_alcohol =TRUE ';
			}
			if($whereall->businesstype == 'b3'){
				$query .=' and tab_groceries =TRUE ';
			}
			if($whereall->businesstype == 'b4'){
				$query .=' and tab_laundry =TRUE ';
			}
			
		}

		$query .=' and scriptid='.$_SESSION['scriptid'];


		
	if($businesslist_pagination ==1){
	///////////// for custom slug when businesslist previous and next function////////////
  if($deliveryType == "categorysearch") {
	
	pg_prepare($link,'sql2123',$query);
	
	$result123 = pg_execute($link,'sql2123',array());
	} else {
		//  echo $query;
	pg_prepare($link,'sql2123',$query);
	
	$result123 = pg_execute($link,'sql2123',$conditionalsvalues);
	
		
		}
		
  
  //print_r($business->numrow)
	//if($deliveryType != "delivery"){
	if($offset!='-1'){
		$query .='ORDER BY id asc LIMIT 10 OFFSET '.$offset;
	}	
	///////////// for custom slug when businesslist previous and next function////////////		
	}
	//}


	if($deliveryType == "categorysearch") {
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',array());

	} else {
		
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
		
		}
	
	$zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
	pg_prepare($link,'sqlz2',$zipquery);
	

	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_dishes WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfmc',$menufetchcount);
	/* added on 01-08-2014 */
	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_reserve WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfrv',$menufetchcount);
	/* added on 01-08-2014 */
	
	
	$paypaladaptive = 'SELECT * from w_splitpaymain WHERE  bus_id=$1';
	pg_prepare($link,'sqlpa',$paypaladaptive);
	
	$galleryImage = 'SELECT * from w_gallery WHERE  business=$1 AND type=$2';
	pg_prepare($link,'sqlgallery',$galleryImage);
	 //Settings to select miles or km 
	$sqldformat = "SELECT * from w_configs WHERE  name='distanceformat'";
	pg_prepare($link,'sqldformat',$sqldformat);
	$resultdformat = pg_execute($link,'sqldformat',array());
	$rowdformat = pg_fetch_array($resultdformat);
	$distanceformat=$rowdformat["value"];
	
	
	$allbusiness = array();
	


	
	if (!empty($location))
					{
        $locationN = parse($location);
					}
      $numrow = pg_num_rows($result);
	while($row = pg_fetch_array($result))
		{
		$businessid .= $row['id'].',';	
		unset($business);
		unset($ziprecord);
		unset($resultc);
		/*if($businesslist_pagination==1)
		{
		$business->numrow = pg_num_rows($result123);
		$business->numrowtot = pg_num_rows($result123);
		
		}*/
		$business->businesslist_pagination = new stdClass();
		$business->businesslist_pagination = $businesslist_pagination;

		$blocation = parse($row['location']);
		
	    $ziprecord = pg_execute($link,'sqlz2',array($row['id'],'TRUE'));
		$business->ziprecord = pg_num_rows($ziprecord);
		
		$reserve = pg_execute($link,'sqlfrv',array($row['id'],'TRUE'));
		$business->reserve = pg_num_rows($reserve);
		
		/* added on 01-08-2014 */	
		$resultfm = pg_execute($link,'sqlfmc',array($row['id'],'TRUE'));
		if(pg_num_rows($resultfm) == 0){
			$business->menulist = 0;	
		}else{
			$business->menulist = 1;
		}
		/* added on 01-08-2014 */
		
		$resultc = pg_execute($link,'sqlw2',array($row['id']));
		$firstCatalog =pg_fetch_array($resultc);
	
		$parecord = pg_execute($link,'sqlpa',array($row['id']));
		
		$rowpa = pg_fetch_array($parecord);
		if($rowpa['splitcase'] == 1 || $rowpa['splitcase'] == 2)
			$business->parecord ="TRUE";
		else
			$business->parecord ="FALSE";		
		
		$business->currency = currency_symbol($row['currency']);
		$business->taxtype = $row['taxtype'];
		$business->tax = $row['tax'];
		$business->id = $row['id'];
		$business->servicefeesettings = $servicefeesettings;
		$business->name = businessnamebylang($row['id']);
		$business->street = businessusersstreetbylang($row['id']);
		$business->colony = $row['colony'];
		$business->cp = $row['cp'];
		$business->tel = $row['tel'];
		$business->cel = $row['cel'];
		$business->email = $row['email'];
		if(IS_PAYPAL_ENABLED == 1)
		$business->paypal = $row['paypal'];
		$business->schedule = $row['schedule'];
		if($row['categories'] !=null){
		$business->categories = checkcategoriesexistbylang($row['categories'],$row['id']);
		}else{
		$business->categories ='';	
		}
		$business->location = $row['location'];
		$business->locationPoint = $row['location'];
		$business->zonesloc = $row['zones'];
		$business->city = $row['city'];
		$business->zones = $row['zones'];		
		$business->enabled = $row['enabled'];		
		$business->acceptcard = $row['acceptcard'];	
		$business->acceptcash = $row['acceptcash'];	
		$business->businesspagecustomtext = $row['businesspagecustomtext'];	
		
		$business->minimum = $row['minimum'];
		$business->firstCatalog = $firstCatalog['id'];
		//	$business->headerurl = 'panel/images/gallery/22/gallery.jpg';	
		/*$sqlgallery_result = pg_execute($link,'sqlgallery',array($row['id'],"2"));
		$sqlgallery_array = pg_fetch_array($sqlgallery_result);
		if(pg_num_rows($sqlgallery_result) == 0) {
				$business->headerurl = 	'panel/images/dummy/restaurant-banner.png';
			} else {
		$business->headerurl = 	'panel/images/gallery/'.$sqlgallery_array['id'].'/gallery.jpg';
			}*/
		if($row['isimgh'] == 1){
			$business->headerurl ='panel/images/banner/'.$row['id'].'/banner.jpg';
		}else{
			$business->headerurl ='panel/images/dummy/restaurant-banner.png';
		}
		$business->twiliophone = $row['twiliophone'];	
		$business->twilioenabled = strtolower($row['twilioenabled']) == "t";
		$business->acceptsms = strtolower($row['acceptsms']) == "t";
		$business->review = GetReviewData($row['id'], $link);
		$business->clientkey = $row['clientkey'];
		$business->secretkey = $row['secretkey'];
		$business->burl = $row['burl'];
		$business->csvupload = $row['csvupload'];
		$business->abusiness = $row['abusiness'];
		 //Settings to select miles or km 
		$business->distanceformat = $distanceformat;
		$distance = distanceCalculator($locationN->latitud,$locationN->longitud,$blocation->latitud,$blocation->longitud, "$distanceformat");
		//$business->distance = number_format($distance,1);
		$business->distance = $distance;
		$business->customslug = $row['customslug'];
		$business->promotion = businesspromotion($row['id']);
		
		$folder = "../images/business/". $row['id']."/*";
		
			if($row['isimg']==1)
			{
				if(count(glob($folder))>0)
				
				{
					$business->isimg = 1; 
				}
				else
				 {
					$business->isimg = 0;  
				 }
			} 
			
			 else
			 {
				$business->isimg = 0;  
			 }
		
		$business->environment = $row['environment'];
		$business->merchant_id = $row['merchant_id'];
		$business->public_key = $row['public_key'];
		$business->private_key = $row['private_key'];
		
		
		$business->tkey = $row['tkey'];
		$business->aplid = $row['aplid'];
		
		
		$business->mercury_id = $row['mercury_id'];
		$business->mercury_pass	 = $row['mercury_pass'];
		
		$business->cardsaveid = $row['cardsaveid'];
		$business->cardsavepass = $row['cardsavepass'];
		$business->feature = $row['feature'];
		
		
		$business->deliverytime = $row['deliverytime'];
		$business->pickuptime = $row['pickuptime'];
		
		$business->catalog = pg_num_rows($resultc);
		$business->shipping = "0";
	    $business->open = true;
		$business->servicefee = $row['servicefee'];
		
		$business->DeliveryStatus = checkDeliveryStatus($row['id'],$link);
		$business->PickupStatus = checkPickupStatus($row['id'],$link);

		$business->paymentdetails = PaymentFetch($row['id'],$link);

		$business->reviewsettings = $row['review_status'];
		$business->photosettings = $row['photo_upload_status'];
		
		
		$business->deliverycitysearch =  false;
		if($whereall->businesstype){
			$business->againmenuopenchk = businessopenChkforMenuWithBusinessType($row['id'],$link,$whereall);
		}else{
			$business->againmenuopenchk = businessopenChkforMenu($row['id'],$link);
		}

		if($whereall->businesstype){
			$business->menuexistornot = MenuExistOrNotWithBusinessType($row['id'],$link,$whereall);
		}

		
		
		$business->id12 =$businessid;

		
		
		
		
		$now = strtotime(GetTimeByZone($_SESSION['timezone']));
		$daysu = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		$todaysu = $daysu->{date("D",strtotime(date('d-m-Y')))};
		
		$schedule1 = parse($business->schedule);
		/*$business->opentime = $schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute ;
		$business->closetime = $schedule1->sdays->{$todaysu}->closes->hour . ':' . $schedule1->sdays->{$todaysu}->closes->minute ;*/
		
		if($schedule1->sdays->{$todaysu}->closes->hour == 25) {
			$fiterClosehr  = 1;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 26) {
			$fiterClosehr  = 2;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 27) {
			$fiterClosehr  = 3;
			
		}

		else if($schedule1->sdays->{$todaysu}->closes->hour == 28) {
			$fiterClosehr  = 4;
		}
		else {
			$fiterClosehr  = $schedule1->sdays->{$todaysu}->closes->hour;
			
			}
	$business->opentime = date('h:i A',strtotime($schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute));
	$business->closetime = date('h:i A',strtotime($fiterClosehr  . ':' . $schedule1->sdays->{$todaysu}->closes->minute));
	
	

			if($whereall->businesstype){
				
				
				if($business->burl != "" && $business->csvupload=="t"){ 
				if($business->name !=null && $business->categories !=null )                                    
				  array_push($allbusiness,$business); 	
				}else{
				if($business->menuexistornot){
					if($business->name !=null && $business->categories !=null )
						array_push($allbusiness,$business);

				}	
				}
			
			}else{
				
				if($business->name !=null && $business->categories !=null )
					array_push($allbusiness,$business);
			}
		}

					if($whereall->reservation != true){		
					  
							  $allbusinessFilter = array();

						       foreach($allbusiness as $business)
										{
						       
								if($business->burl != "" && $business->csvupload=="t"){
								array_push($allbusinessFilter,$business);
								}else{
								if($business->catalog!="0" &&  $business->menulist == "1")	 				
								array_push($allbusinessFilter,$business);	
								}
										}
				                $allbusiness  = array();					
								foreach($allbusinessFilter as $business)
										{
								array_push($allbusiness,$business);
										}
					}

	/****************************************************************Reservation Filter Section *****************************************************************/
/*Filter By Cateegory*/
$allbusinessFilter = array();
foreach($allbusiness as $business){	 
	if ($business->categories !="null"){
		array_push($allbusinessFilter,$business);
	}
}
$allbusiness  = array();					
foreach($allbusinessFilter as $business){
	array_push($allbusiness,$business);
}
/*Filter By Cateegory*/


/* Filter by Resturant */

	$allbusinessFilter = array();
	$filterresturant = parse($whereall->resturant);
	if(count($filterresturant)!=0){
		
		foreach($allbusiness as $business){
			if(in_array("-1",$filterresturant))				
					array_push($allbusinessFilter,$business);
			else if(in_array($business->id,$filterresturant))				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Cuisine */

	$allbusinessFilter = array();
	$filtercuisinesnew = parse($whereall->cuisines);
	if($filtercuisinesnew) {
		$filtercuisines = array();
	foreach($filtercuisinesnew as $val) {
		if($val) {
		$filtercuisines = explode(",",$val);
		}
		
		}
	}
	
	if(count($filtercuisines)!=0){
		
		foreach($allbusiness as $business){
			$bucateg = parse($business->categories);
			if(in_array("-1",$filtercuisines))				
					array_push($allbusinessFilter,$business);
			else if(count(array_intersect($bucateg,$filtercuisines))>0)				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
	
/* Filter by Distance */

	$allbusinessFilter = array();
	$filterdistance = $whereall->distance;
	
	if($filterdistance !=""){
		foreach($allbusiness as $business){
			if($business->distance <= $filterdistance)				
					array_push($allbusinessFilter,$business);
		}
		
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}

if($whereall->reservation == true){
	
	
	$allbusinessFilter = array();
	$usertime = strtotime($whereall->rdate .' '. $whereall->rhour.':'.$whereall->rmin);
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
    $todayid = $days->{date("D",$usertime)};

    $userDate = date("Y-m-d",$usertime);

	//echo $todayid = date("d/m/Y h:i:m",strtotime($usertime));
	//echo date("D",$usertime);
	
	$fetchreservetime = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
	pg_prepare($link,'sqlfs',$fetchreservetime);

		foreach($allbusiness as $business){
		
			$resrecord = pg_execute($link,'sqlfs',array($business->id,'TRUE'));
			
			
			while($rowres = pg_fetch_array($resrecord)){	
					
				$dayres = parse($rowres['days']);
				$scheduleres = parse($rowres['schedule']);
				
				foreach ($dayres as $day){
				
					if($whereall->rhour == "-1" && $whereall->rmin == "-1" ) {
						
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						}
					else if(!$whereall->rhour)	{
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						
						}
					else if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
					{
						if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour1,$scheduleres->opens->minute1) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour1,$scheduleres->closes->minute1))
						{
							if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
						else if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour,$scheduleres->opens->minute) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour,$scheduleres->closes->minute))
						{
						//business opened now check if it didnt close
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
					}/*End if loop*/
				}/*End schedule for each loop*/
				
			}/*End Schedule while loop*/
			
		}/*End Business for each loop*/
	
			$allbusiness  = array();					
				foreach($allbusinessFilter as $business){
						array_push($allbusiness,$business);
				}
	

	
$allbusinessFilter = array();
$filterguest = $whereall->guest;


/* Guest Filter in Reservation */

if($filterguest !=""){
	
		foreach($allbusiness as $business){
		
		if($whereall->rdate!= "") {
						
			$guest = 0;
			$guestquery = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
			pg_prepare($link,'sqlguest'.$business->id,$guestquery);
			$guestrecord = pg_execute($link,'sqlguest'.$business->id,array($business->id,'TRUE'));
			while($rowguest = pg_fetch_array($guestrecord)){	
				$guest += $rowguest['guest'];
			}
			
					
						
			$rdateAll = explode("/",$whereall->rdate);
			$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
			$reservefreequery = 'SELECT * from w_reserve_book WHERE business =$1 and date =$2';	
			pg_prepare($link,'sqlfr'.$business->id,$reservefreequery);
			$reservefreerecord = pg_execute($link,'sqlfr'.$business->id,array($business->id,$rdate_merge));
	
			if(pg_num_rows($reservefreerecord) != 0){
			
				$reservefree = array();
				$cntfre = 1;
				$bguest = 0;
				while($rowf= pg_fetch_array($reservefreerecord)){
					
					pg_prepare($link,'sqlchk1'.$rowf['id'],'SELECT * from w_reserve WHERE id=$1');
					$chktime = pg_execute($link,'sqlchk1'.$rowf['id'],array($rowf['rid']));
					
					$cntfre++;
					
					$rowchktime = pg_fetch_array($chktime);
	
					$duration = json_decode($rowchktime['duration'],false);
					
					$sch1=(array)$duration->{'duration'};
		
					$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
					
					$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time
	
					$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
					
					$diftime = round(abs($to_time - $from_time)/60); //difference between two time
					
					if($chktime > $diftime){
						$bguest += $rowf['booked'];
					}
					
				}
				
		}
	    }
		$remguest = $guest - $bguest;
		
		if($remguest >= $filterguest)				
			array_push($allbusinessFilter,$business);	
	
	}
		
	
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
}





}


						
/************************************End Reservation***************************************/	
				
				
										
			
				
				include('front_search_panel.php');
				
				if($whereall->delivery_neighborhoodStaus == 1 && $deliveryType == "delivery") {
				
			
			    $newbusiness = frontserachneighborhood1($location,$allbusiness,$link,$whereall,$result123,$numrow);
				/*if($businesslist_pagination==1)
				{
				if($numrow==""){$numrow=0;}
				$business->numrowtot = pg_num_rows($result123);
				$business->numrow = $numrow;
				array_push($newbusiness,$business);
				}*/
			    return $newbusiness;
			
						}
				else if($deliveryType == "delivery")
				{
					// 2 means new panel
					
					if( $panelsetting == 2) { 
					
						$newbusiness = frontserachpanelnew1($location,$allbusiness,$link,$deliveryType,$whereall,$result123,$numrow);
						
					}
					else if(pg_num_rows($result) == 0) {
						
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
					else {
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
					/*	
					if($businesslist_pagination==1)
					{
					if($numrow==""){$numrow=0;}
					$business->numrowtot = pg_num_rows($result123);
					$business->numrow = $numrow;
					array_push($newbusiness,$business);
					}*/
				
						
						return $newbusiness;
					
				}
			else if($deliveryType == "citysearch"  || $deliveryType == "pickup" || $deliveryType == "categorysearch" )
			{
			
			/********************************city restaurant show here**********************************/
			
					$cityquery1 ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc185',$cityquery1);
					if($city == 0){					
					$result11 = pg_execute($link,'sqlc185',array($business->city));
					}else{
					$result11 = pg_execute($link,'sqlc185',array($city));	
					}
					$rec1 = pg_fetch_array($result11);
					$cityname = $rec1['city'];
					
			
		
				   $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc1',$cityquery);
					$result = pg_execute($link,'sqlc1',array($city));
					$rec = pg_fetch_array($result);
					//$cityname = $rec['city'];
					 $_SESSION['timezone'] = $rec['timezone'];
				
				$newbusiness = array();
				
				foreach($allbusiness as $business)
						{
							if($whereall->activebusiness) {
								
								if($whereall->activebusiness == $business->id ) {
									if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup")
										{
											$business->shipping = 0;
										}
										else { 
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										if($business->burl != "" && $business->csvupload=="t") {
                                        array_push($newbusiness,$business); 				
										}else{
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										else if ($deliveryType == "citysearch" || $deliveryType == "categorysearch" )
										array_push($newbusiness,$business);
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true)
										array_push($newbusiness,$business);
										}
										unset($business);
								}
							}
							else {
		
										if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup" && $business->PickupStatus == true)
										{
											$business->shipping = 0;
										}
										else { 
										
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										
										if($business->burl != "" && $business->csvupload=="t") {										
                                        array_push($newbusiness,$business); 				
										}else{
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										
										
										else if (($deliveryType == "citysearch" || $deliveryType == "categorysearch") && ($business->PickupStatus == "true" || $business->DeliveryStatus == "true") )
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true )
										array_push($newbusiness,$business);
										
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										}
										unset($business);
								
								
								}
						}
				
				
				
					$now = strtotime(GetTimeByZone($_SESSION['timezone']));
					$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
					$todayid = $days->{date("D",$now)};
					 $curHour = date('H',$now);
					foreach($newbusiness as $business)
						{
						//get the time in the current user zone
						//now check if the business is open...
						$schedule = parse($business->schedule);
						$onday = false;
						foreach ($schedule->days as $day)
							{
							if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
								{//business is in the correct day, now check the time...
								  $priviousDay = previousDayCounti();
								  
		if(($schedule->sdays->{$priviousDay}->closes->hour== 24 || $schedule->sdays->{$priviousDay}->closes->hour == 25 || $schedule->sdays->{$priviousDay}->closes->hour == 26 || $schedule->sdays->{$priviousDay}->closes->hour == 27 || $schedule->sdays->{$priviousDay}->closes->hour == 28) && $curHour < 5 ) {
			
				 $preclosetime = preclosetimefun($schedule,$priviousDay);
				 		
				 $newScedule = strtotime($preclosetime.":".$schedule->sdays->{$priviousDay}->closes->minute);
				 
				                 if ($now>=$newScedule) {
					if($schedule->sdays->{$todayid}->closes->hour >23 )	{	
					
					if($schedule->sdays->{$todayid}->opens->hour > $curHour)	{
						
						$newScedule = strtotime($preclosetime.':'.$schedule->sdays->{$todayid}->closes->minute);
						
						}
					else {
						 $newScedule = strtotime('23:59');
						}  
		
					
					
					}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
									$shopopenstatus = true;	
									
									
								 } else 	{
			
									$shopopenstatus = true;	
									
									
									
									}
									
										
									
} else if ($now>=strtotime($schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute))  {
						
						if($schedule->sdays->{$todayid}->closes->hour >23 )	{		  
			  $newScedule = strtotime('23:59');
						}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
				$shopopenstatus = true;	
				
				
}
else {
	$shopopenstatus = false;
	
	}

							if($shopopenstatus == true) {
										  
									//business opened now check if it didnt close
									if ($now>=$newScedule)
										{
										//business closed
										$business->open = false;
										if ($day=='0')
											{
											/*if ($todayid==7)
												$tday = 1;
												else
												$tday = $todayid+1;
											
											if (intval($schedule->sdays->{$tday}->opens->minute)<10)
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
												else
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
			
											if (intval($schedule->sdays->{$tday}->opens->hour)<10)
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;
												else
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;*/
											
											$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
											}
										}
										else
										{
										//business open
										if($business->againmenuopenchk == true) {
											$business->open = true;
										}
										else {
											$business->open = false;
											}
										}
									}
									else
									{
									//business still not opened
									$business->open = false;
									/*if (intval($schedule->sdays->{$todayid}->opens->minute)<10)
										$min = $schedule->sdays->{$todayid}->opens->minute;
										else
										$min = $schedule->sdays->{$todayid}->opens->minute;
			
									if (intval($schedule->sdays->{$todayid}->opens->hour)<10)
										$hour = $schedule->sdays->{$todayid}->opens->hour;
										else
										$hour = $schedule->sdays->{$todayid}->opens->hour;*/
			
									$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
									}
								$onday = true;
								}
							}
			
						if ($onday==false)
							$business->open = false;
						}
			
					foreach($newbusiness as $business)
						{
						if (empty($business->willopen) && $business->open==false)
							{
							//need to find the next day that will open
							$t = intval($todayid)+1;
							$nextday = -1;
							$schedule = parse($business->schedule);
							for ($i=$t;$i<=7;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
			
							if ($nextday==-1)//means that the next day ist before in week days...
							for ($i=1;$i<$t;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
							$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
							//$ndays = array('','monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			
							if (intval($schedule->sdays->{$nextday}->opens->minute)<10)
								$min = $schedule->sdays->{$nextday}->opens->minute;
								else
								$min = $schedule->sdays->{$nextday}->opens->minute;
			
							if (intval($schedule->sdays->{$nextday}->opens->hour)<10)
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								else
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								
								$willopen = FetchMenuTimeOnCloseBusiness($business->id);
								$business->willopen = $willopen;
			
							
							}
			
						$business->schedule = null;
						unset($business->schedule);
						}
					/*	if($businesslist_pagination ==1)
						{
							$business->numrowtot = pg_num_rows($result123);
							$business->numrow = pg_num_rows($result);
							array_push($newbusiness,$business);
						}*/
					/*********************************************End city restaurant show here****************************************************/
					/*
					foreach($newbusiness as $business)
						{
							echo $business->name;
							echo "<br>";
							
						}
						print_r($newbusiness);
						exit;*/
				
			$numrowtot = pg_num_rows($result123);
			
			$numrow = count($newbusiness);		
			
			//$new_twist_array = array();
			$new_twist_array->newbusiness =$newbusiness;
			$new_twist_array->paginationdetails =array($numrowtot,$numrow);
		
		//count($newbusiness);
				return $new_twist_array;
			}

				}				
				
				
function FetchAllBusinessDataCustomSlug($link,$location,$deliveryType,$category,$city,$businessid,$filters,$whereall,$lang_resource)
	{
	if($whereall->city){
		pg_prepare($link,'sqldf33','SELECT * from w_franchises WHERE id=$1');
		$result_time_zone = pg_execute($link,'sqldf33',array($whereall->city));
		$result_rec = pg_fetch_array($result_time_zone);

		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
	}else {
		pg_prepare($link,'sqlfree2','SELECT * from w_franchises');
		$resultfree2 = pg_execute($link,'sqlfree2',array());
		$result_rec = pg_fetch_array($resultfree2);
	
		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
		
		
	}
	if($businessid){
	$bquery ="SELECT * FROM w_business WHERE id=$1"; 
	pg_prepare($link,'sqlca1',$bquery);
	$results = pg_execute($link,'sqlca1',array($businessid));
	$bcity = pg_fetch_array($results);
	$_SESSION['timezone'] = $bcity['timezone'];
	}
	
	 $usersearchAddress = $whereall->address;
	 
	 $categorysearchNew = "SELECT * from w_categories WHERE id = $1 AND enabled=true ";
	 pg_prepare($link,'sqlcatnew',$categorysearchNew);
	 
	 pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
	$resultset = pg_execute($link,'sqlw',array('panelsetting'));
	$rowset = pg_fetch_array($resultset);
	$panelsetting = $rowset['value'];
	
		 pg_prepare($link,'sqlw1','SELECT * FROM w_configs where name=$1');
		$resultset1 = pg_execute($link,'sqlw1',array('businesslist_pagination'));
		$rowset1 = pg_fetch_array($resultset1);
		$businesslist_pagination = $rowset1['value'];
		
  if($deliveryType == "categorysearch") {
	if($panelsetting == 2) {
		
		if(empty($category)) {
			return;
			}
			
		$categoryAllArray = explode(",",$category);
		
		
		foreach ($categoryAllArray as $categoryeach ){
			
		
			$catresult = pg_execute($link,'sqlcatnew',array($categoryeach));
			$catfetchresult = pg_fetch_array($catresult);
			
			if(pg_num_rows($catresult)>0 && $catfetchresult['business'] != "null" && $catfetchresult['business'] != "" )
			{
				if(empty($businessrecord)) {
					$businessrecord[] = $catfetchresult['business'];
					}
			   else if(!in_array($catfetchresult['business'],$businessrecord)) {
					
						$businessrecord[] = $catfetchresult['business'];
				}
			}
			
			
			}
			
			//print_r($businessrecord);
		// 
		 $query = "SELECT * from w_business WHERE enabled=true and id in (".implode(",",$businessrecord).") ";
		
		
		
		
		} else {
	 $categorydp ="\"".$category."\"";		
	 $query = "SELECT * from w_business WHERE enabled=true AND categories like '%".$categorydp."%' ";
	 
		}
	 
	  }
	  
 else if($city !=0)
  {
	$conditionalsvalues = array();
	$query = 'SELECT * from w_business WHERE city=$1 AND enabled=true';
	array_push($conditionalsvalues,$city);
  }
  
  else{
	  
	 $conditionalsvalues = array();
	 $query = 'SELECT * from w_business WHERE  enabled=true';
	
   }
  	 $catalog =  'SELECT * from w_menus WHERE business=$1 AND  enabled=true';
	pg_prepare($link,'sqlw2',$catalog);
	
	
	if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = '';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= ' and ' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

		$query .=' and scriptid='.$_SESSION['scriptid'].' and id ='.$businessid;
		

	if($deliveryType == "categorysearch") {
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',array());
	} else {
		
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
		
		}
	
	$zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
	pg_prepare($link,'sqlz2',$zipquery);
	

	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_dishes WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfmc',$menufetchcount);
	/* added on 01-08-2014 */
	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_reserve WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfrv',$menufetchcount);
	/* added on 01-08-2014 */
	
	
	$paypaladaptive = 'SELECT * from w_splitpaymain WHERE  bus_id=$1';
	pg_prepare($link,'sqlpa',$paypaladaptive);
	
	$galleryImage = 'SELECT * from w_gallery WHERE  business=$1 AND type=$2';
	pg_prepare($link,'sqlgallery',$galleryImage);
	 //Settings to select miles or km 
	$sqldformat = "SELECT * from w_configs WHERE  name='distanceformat'";
	pg_prepare($link,'sqldformat',$sqldformat);
	$resultdformat = pg_execute($link,'sqldformat',array());
	$rowdformat = pg_fetch_array($resultdformat);
	$distanceformat=$rowdformat["value"];
	
	
	$allbusiness = array();
	if (!empty($location))
					{
        $locationN = parse($location);
					}

	while($row = pg_fetch_array($result))
		{
		unset($business);
		unset($ziprecord);
		unset($resultc);
		//$business->numrow = pg_num_rows($result123);
		


		$blocation = parse($row['location']);
		
	    $ziprecord = pg_execute($link,'sqlz2',array($row['id'],'TRUE'));
		$business->ziprecord = pg_num_rows($ziprecord);
		
		$reserve = pg_execute($link,'sqlfrv',array($row['id'],'TRUE'));
		$business->reserve = pg_num_rows($reserve);
		
		/* added on 01-08-2014 */	
		$resultfm = pg_execute($link,'sqlfmc',array($row['id'],'TRUE'));
		if(pg_num_rows($resultfm) == 0){
			$business->menulist = 0;	
		}else{
			$business->menulist = 1;
		}
		/* added on 01-08-2014 */
		
		$resultc = pg_execute($link,'sqlw2',array($row['id']));
		$firstCatalog =pg_fetch_array($resultc);
	
		$parecord = pg_execute($link,'sqlpa',array($row['id']));
		
		$rowpa = pg_fetch_array($parecord);
		if($rowpa['splitcase'] == 1 || $rowpa['splitcase'] == 2)
			$business->parecord ="TRUE";
		else
			$business->parecord ="FALSE";		
		
		$business->currency = currency_symbol($row['currency']);
		$business->taxtype = $row['taxtype'];
		$business->tax = $row['tax'];
		$business->id = $row['id'];
		
		$business->name = businessnamebylang($row['id']);
		$business->street = businessusersstreetbylang($row['id']);
		$business->colony = $row['colony'];
		$business->cp = $row['cp'];
		$business->tel = $row['tel'];
		$business->cel = $row['cel'];
		$business->email = $row['email'];
		if(IS_PAYPAL_ENABLED == 1)
		$business->paypal = $row['paypal'];
		$business->schedule = $row['schedule'];
		if($row['categories'] !=null){
		$business->categories = checkcategoriesexistbylang($row['categories'],$row['id']);
		}else{
		$business->categories ='';	
		}
		$business->location = $row['location'];
		$business->locationPoint = $row['location'];
		$business->zonesloc = $row['zones'];
		$business->city = $row['city'];
		$business->zones = $row['zones'];		
		$business->enabled = $row['enabled'];		
		$business->acceptcard = $row['acceptcard'];	
		$business->acceptcash = $row['acceptcash'];	
		$business->businesspagecustomtext = $row['businesspagecustomtext'];	
		
		$business->minimum = $row['minimum'];
		$business->firstCatalog = $firstCatalog['id'];
		//	$business->headerurl = 'panel/images/gallery/22/gallery.jpg';	
		/*$sqlgallery_result = pg_execute($link,'sqlgallery',array($row['id'],"2"));
		$sqlgallery_array = pg_fetch_array($sqlgallery_result);
		if(pg_num_rows($sqlgallery_result) == 0) {
				$business->headerurl = 	'panel/images/dummy/restaurant-banner.png';
			} else {
		$business->headerurl = 	'panel/images/gallery/'.$sqlgallery_array['id'].'/gallery.jpg';
			}*/
		if($row['isimgh'] == 1){
			$business->headerurl ='panel/images/banner/'.$row['id'].'/banner.jpg';
		}else{
			$business->headerurl ='panel/images/dummy/restaurant-banner.png';
		}
		$business->twiliophone = $row['twiliophone'];	
		$business->twilioenabled = strtolower($row['twilioenabled']) == "t";
		$business->acceptsms = strtolower($row['acceptsms']) == "t";
		$business->review = GetReviewData($row['id'], $link);
		$business->clientkey = $row['clientkey'];
		$business->secretkey = $row['secretkey'];
		$business->burl = $row['burl'];
		$business->abusiness = $row['abusiness'];
		 //Settings to select miles or km 
		$business->distanceformat = $distanceformat;
		$distance = distanceCalculator($locationN->latitud,$locationN->longitud,$blocation->latitud,$blocation->longitud, "$distanceformat");
		//$business->distance = number_format($distance,1);
		$business->distance = $distance;
		$business->customslug = $row['customslug'];
		$business->promotion = businesspromotion($row['id']);
		
		$folder = "../images/business/". $row['id']."/*";
		
			if($row['isimg']==1)
			{
				if(count(glob($folder))>0)
				
				{
					$business->isimg = 1; 
				}
				else
				 {
					$business->isimg = 0;  
				 }
			} 
			
			 else
			 {
				$business->isimg = 0;  
			 }
		
		$business->environment = $row['environment'];
		$business->merchant_id = $row['merchant_id'];
		$business->public_key = $row['public_key'];
		$business->private_key = $row['private_key'];
		
		
		$business->tkey = $row['tkey'];
		$business->aplid = $row['aplid'];
		
		
		$business->mercury_id = $row['mercury_id'];
		$business->mercury_pass	 = $row['mercury_pass'];
		
		$business->cardsaveid = $row['cardsaveid'];
		$business->cardsavepass = $row['cardsavepass'];
		$business->feature = $row['feature'];
		
		
		$business->deliverytime = $row['deliverytime'];
		$business->pickuptime = $row['pickuptime'];
		
		$business->catalog = pg_num_rows($resultc);
		$business->shipping = "0";
	    $business->open = true;
		
		$business->DeliveryStatus = checkDeliveryStatus($row['id'],$link);
		$business->PickupStatus = checkPickupStatus($row['id'],$link);

		$business->paymentdetails = PaymentFetch($row['id'],$link);

		$business->reviewsettings = $row['review_status'];
		$business->photosettings = $row['photo_upload_status'];
		
		$business->deliverycitysearch =  false;
		$business->againmenuopenchk = businessopenChkforMenu($row['id'],$link);

		
		
		
		
		$now = strtotime(GetTimeByZone($_SESSION['timezone']));
		$daysu = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		$todaysu = $daysu->{date("D",strtotime(date('d-m-Y')))};
		
		$schedule1 = parse($business->schedule);
		/*$business->opentime = $schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute ;
		$business->closetime = $schedule1->sdays->{$todaysu}->closes->hour . ':' . $schedule1->sdays->{$todaysu}->closes->minute ;*/
		
		if($schedule1->sdays->{$todaysu}->closes->hour == 25) {
			$fiterClosehr  = 1;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 26) {
			$fiterClosehr  = 2;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 27) {
			$fiterClosehr  = 3;
			
		}

		else if($schedule1->sdays->{$todaysu}->closes->hour == 28) {
			$fiterClosehr  = 4;
		}
		else {
			$fiterClosehr  = $schedule1->sdays->{$todaysu}->closes->hour;
			
			}
	$business->opentime = date('h:i A',strtotime($schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute));
	$business->closetime = date('h:i A',strtotime($fiterClosehr  . ':' . $schedule1->sdays->{$todaysu}->closes->minute));
	
	

		if($business->name !=null && $business->categories !=null )
		array_push($allbusiness,$business);
		}
			  
					if($whereall->reservation != true){		
					  
							  $allbusinessFilter = array();

						       foreach($allbusiness as $business)
										{
						       if($business->catalog!="0" &&  $business->menulist == "1")	 				
								array_push($allbusinessFilter,$business);
										}
				                $allbusiness  = array();					
								foreach($allbusinessFilter as $business)
										{
								array_push($allbusiness,$business);
										}
					}
					
				

		
	/****************************************************************Reservation Filter Section *****************************************************************/
/*Filter By Cateegory*/
$allbusinessFilter = array();
foreach($allbusiness as $business){	 
	if ($business->categories !="null"){
		array_push($allbusinessFilter,$business);
	}
}
$allbusiness  = array();					
foreach($allbusinessFilter as $business){
	array_push($allbusiness,$business);
}
/*Filter By Cateegory*/



/* Filter by Resturant */

	$allbusinessFilter = array();
	$filterresturant = parse($whereall->resturant);
	if(count($filterresturant)!=0){
		
		foreach($allbusiness as $business){
			if(in_array("-1",$filterresturant))				
					array_push($allbusinessFilter,$business);
			else if(in_array($business->id,$filterresturant))				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Cuisine */

	$allbusinessFilter = array();
	$filtercuisinesnew = parse($whereall->cuisines);
	if($filtercuisinesnew) {
		$filtercuisines = array();
	foreach($filtercuisinesnew as $val) {
		if($val) {
		$filtercuisines = explode(",",$val);
		}
		
		}
	}

	if(count($filtercuisines)!=0){
		
		foreach($allbusiness as $business){
			$bucateg = parse($business->categories);
			if(in_array("-1",$filtercuisines))				
					array_push($allbusinessFilter,$business);
			else if(count(array_intersect($bucateg,$filtercuisines))>0)				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Distance */

	$allbusinessFilter = array();
	$filterdistance = $whereall->distance;
	
	if($filterdistance !=""){
		foreach($allbusiness as $business){
			if($business->distance <= $filterdistance)				
					array_push($allbusinessFilter,$business);
		}
		
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}

if($whereall->reservation == true){
	
	
	$allbusinessFilter = array();
	$usertime = strtotime($whereall->rdate .' '. $whereall->rhour.':'.$whereall->rmin);
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
    $todayid = $days->{date("D",$usertime)};

    $userDate = date("Y-m-d",$usertime);

	//echo $todayid = date("d/m/Y h:i:m",strtotime($usertime));
	//echo date("D",$usertime);
	
	$fetchreservetime = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
	pg_prepare($link,'sqlfs',$fetchreservetime);

		foreach($allbusiness as $business){
		
			$resrecord = pg_execute($link,'sqlfs',array($business->id,'TRUE'));
			
			
			while($rowres = pg_fetch_array($resrecord)){	
					
				$dayres = parse($rowres['days']);
				$scheduleres = parse($rowres['schedule']);
				
				foreach ($dayres as $day){
				
					if($whereall->rhour == "-1" && $whereall->rmin == "-1" ) {
						
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						}
					else if(!$whereall->rhour)	{
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						
						}
					else if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
					{
						if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour1,$scheduleres->opens->minute1) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour1,$scheduleres->closes->minute1))
						{
							if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
						else if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour,$scheduleres->opens->minute) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour,$scheduleres->closes->minute))
						{
						//business opened now check if it didnt close
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
					}/*End if loop*/
				}/*End schedule for each loop*/
				
			}/*End Schedule while loop*/
			
		}/*End Business for each loop*/
	
			$allbusiness  = array();					
				foreach($allbusinessFilter as $business){
						array_push($allbusiness,$business);
				}
	

$allbusinessFilter = array();
$filterguest = $whereall->guest;


/* Guest Filter in Reservation */

if($filterguest !=""){
	
		foreach($allbusiness as $business){
		
		if($whereall->rdate!= "") {
						
			$guest = 0;
			$guestquery = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
			pg_prepare($link,'sqlguest'.$business->id,$guestquery);
			$guestrecord = pg_execute($link,'sqlguest'.$business->id,array($business->id,'TRUE'));
			while($rowguest = pg_fetch_array($guestrecord)){	
				$guest += $rowguest['guest'];
			}
			
					
						
			$rdateAll = explode("/",$whereall->rdate);
			$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
			$reservefreequery = 'SELECT * from w_reserve_book WHERE business =$1 and date =$2';	
			pg_prepare($link,'sqlfr'.$business->id,$reservefreequery);
			$reservefreerecord = pg_execute($link,'sqlfr'.$business->id,array($business->id,$rdate_merge));
	
			if(pg_num_rows($reservefreerecord) != 0){
			
				$reservefree = array();
				$cntfre = 1;
				$bguest = 0;
				while($rowf= pg_fetch_array($reservefreerecord)){
					
					pg_prepare($link,'sqlchk1'.$rowf['id'],'SELECT * from w_reserve WHERE id=$1');
					$chktime = pg_execute($link,'sqlchk1'.$rowf['id'],array($rowf['rid']));
					
					$cntfre++;
					
					$rowchktime = pg_fetch_array($chktime);
	
					$duration = json_decode($rowchktime['duration'],false);
					
					$sch1=(array)$duration->{'duration'};
		
					$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
					
					$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time
	
					$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
					
					$diftime = round(abs($to_time - $from_time)/60); //difference between two time
					
					if($chktime > $diftime){
						$bguest += $rowf['booked'];
					}
					
				}
				
		}
	    }
		$remguest = $guest - $bguest;
		
		if($remguest >= $filterguest)				
			array_push($allbusinessFilter,$business);	
	
	}
		
	
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
}





}
	

						
/************************************End Reservation***************************************/	
				
				
										
				
				
				
				include('front_search_panel.php');
				
				if($whereall->delivery_neighborhoodStaus == 1 && $deliveryType == "delivery") {
			
			
			    $newbusiness = frontserachneighborhood($location,$allbusiness,$link,$whereall);
			
			    return $newbusiness;
			
						}
				else if($deliveryType == "delivery")
				{
					// 2 means new panel
					
					if( $panelsetting == 2) { 
					
						$newbusiness = frontserachpanelnew($location,$allbusiness,$link,$deliveryType,$whereall );
						
					}
					else if(pg_num_rows($result) == 0) {
						
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
					else {
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
						
						
						
						return $newbusiness;
					
				}
			else if($deliveryType == "citysearch"  || $deliveryType == "pickup" || $deliveryType == "categorysearch" )
			{
			
			/********************************city restaurant show here**********************************/
			
					$cityquery1 ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc185',$cityquery1);
					if($city == 0){					
					$result11 = pg_execute($link,'sqlc185',array($business->city));
					}else{
					$result11 = pg_execute($link,'sqlc185',array($city));	
					}
					$rec1 = pg_fetch_array($result11);
					$cityname = $rec1['city'];
					
			
		
				   $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc1',$cityquery);
					$result = pg_execute($link,'sqlc1',array($city));
					$rec = pg_fetch_array($result);
					//$cityname = $rec['city'];
					 $_SESSION['timezone'] = $rec['timezone'];
				
				$newbusiness = array();
				foreach($allbusiness as $business)
						{
							if($whereall->activebusiness) {
								
								if($whereall->activebusiness == $business->id ) {
									if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup")
										{
											$business->shipping = 0;
										}
										else { 
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										else if ($deliveryType == "citysearch" || $deliveryType == "categorysearch" )
										array_push($newbusiness,$business);
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true)
										array_push($newbusiness,$business);
										unset($business);
								}
							}
							else {
		
										if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup" && $business->PickupStatus == true)
										{
											$business->shipping = 0;
										}
										else { 
										
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										
										
														
										
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										
										
										else if (($deliveryType == "citysearch" || $deliveryType == "categorysearch") && ($business->PickupStatus == "true" || $business->DeliveryStatus == "true") )
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true )
										array_push($newbusiness,$business);
										
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										unset($business);
								
								
								}
						}
				
				
				
					$now = strtotime(GetTimeByZone($_SESSION['timezone']));
					$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
					$todayid = $days->{date("D",$now)};
					 $curHour = date('H',$now);
					foreach($newbusiness as $business)
						{
						//get the time in the current user zone
						//now check if the business is open...
						$schedule = parse($business->schedule);
						$onday = false;
						foreach ($schedule->days as $day)
							{
							if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
								{//business is in the correct day, now check the time...
								  $priviousDay = previousDayCounti();
								  
		if(($schedule->sdays->{$priviousDay}->closes->hour== 24 || $schedule->sdays->{$priviousDay}->closes->hour == 25 || $schedule->sdays->{$priviousDay}->closes->hour == 26 || $schedule->sdays->{$priviousDay}->closes->hour == 27 || $schedule->sdays->{$priviousDay}->closes->hour == 28) && $curHour < 5 ) {
			
				 $preclosetime = preclosetimefun($schedule,$priviousDay);
				 		
				 $newScedule = strtotime($preclosetime.":".$schedule->sdays->{$priviousDay}->closes->minute);
				 
				                 if ($now>=$newScedule) {
					if($schedule->sdays->{$todayid}->closes->hour >23 )	{	
					
					if($schedule->sdays->{$todayid}->opens->hour > $curHour)	{
						
						$newScedule = strtotime($preclosetime.':'.$schedule->sdays->{$todayid}->closes->minute);
						
						}
					else {
						 $newScedule = strtotime('23:59');
						}  
		
					
					
					}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
									$shopopenstatus = true;	
									
									
								 } else 	{
			
									$shopopenstatus = true;	
									
									
									
									}
									
										
									
} else if ($now>=strtotime($schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute))  {
						
						if($schedule->sdays->{$todayid}->closes->hour >23 )	{		  
			  $newScedule = strtotime('23:59');
						}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
				$shopopenstatus = true;	
				
				
}
else {
	$shopopenstatus = false;
	
	}

							if($shopopenstatus == true) {
										  
									//business opened now check if it didnt close
									if ($now>=$newScedule)
										{
										//business closed
										$business->open = false;
										if ($day=='0')
											{
											/*if ($todayid==7)
												$tday = 1;
												else
												$tday = $todayid+1;
											
											if (intval($schedule->sdays->{$tday}->opens->minute)<10)
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
												else
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
			
											if (intval($schedule->sdays->{$tday}->opens->hour)<10)
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;
												else
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;*/
											
											$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
											}
										}
										else
										{
										//business open
										if($business->againmenuopenchk == true) {
											$business->open = true;
										}
										else {
											$business->open = false;
											}
										}
									}
									else
									{
									//business still not opened
									$business->open = false;
									/*if (intval($schedule->sdays->{$todayid}->opens->minute)<10)
										$min = $schedule->sdays->{$todayid}->opens->minute;
										else
										$min = $schedule->sdays->{$todayid}->opens->minute;
			
									if (intval($schedule->sdays->{$todayid}->opens->hour)<10)
										$hour = $schedule->sdays->{$todayid}->opens->hour;
										else
										$hour = $schedule->sdays->{$todayid}->opens->hour;*/
			
									$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
									}
								$onday = true;
								}
							}
			
						if ($onday==false)
							$business->open = false;
						}
			
					foreach($newbusiness as $business)
						{
						if (empty($business->willopen) && $business->open==false)
							{
							//need to find the next day that will open
							$t = intval($todayid)+1;
							$nextday = -1;
							$schedule = parse($business->schedule);
							for ($i=$t;$i<=7;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
			
							if ($nextday==-1)//means that the next day ist before in week days...
							for ($i=1;$i<$t;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
							$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
							//$ndays = array('','monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			
							if (intval($schedule->sdays->{$nextday}->opens->minute)<10)
								$min = $schedule->sdays->{$nextday}->opens->minute;
								else
								$min = $schedule->sdays->{$nextday}->opens->minute;
			
							if (intval($schedule->sdays->{$nextday}->opens->hour)<10)
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								else
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								
								$willopen = FetchMenuTimeOnCloseBusiness($business->id);
								$business->willopen = $willopen;
			
							
							}
			
						$business->schedule = null;
						unset($business->schedule);
						}
					/*********************************************End city restaurant show here****************************************************/
					/*
					foreach($newbusiness as $business)
						{
							echo $business->name;
							echo "<br>";
							
						}
						print_r($newbusiness);
						exit;*/
						
					return $newbusiness;
			}

}
				


function FindOpenDayDpi($schedule,$did,$hour,$min,$lang_resource) {

	$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
	 
	 $c = false;
	
	
		if($did == 1) {
		$warray = array("1", "2", "3", "4", "5", "6", "7");
		} else if($did == 2) {
		$warray = array("2", "3", "4","5", "6", "7", "1");
	    } else if($did == 3) {
		$warray = array("3", "4", "5", "6", "7", "1", "2");
		} else if($did == 4) {
		$warray = array("4", "5", "6", "7", "1", "2", "3");
		} else if($did == 5) {
		$warray = array("5", "6", "7", "1", "2", "3", "4");
		}else if($did == 6) {
		$warray = array( "6", "7", "1", "2", "3", "4", "5");
		}else if($did == 7) {
		$warray = array("7", "1", "2", "3", "4", "5", "6");
		}
		else {
		$warray = array("1", "2", "3", "4", "5", "6", "7");
			}
		
	foreach($warray as $tdate) {
	// 
	 $c = true;
	if($schedule->sdays->{$tdate}->opens->hour != 0 || $schedule->sdays->{$tdate}->closes->hour != 0 ) {
	$strtotime = strtotime($schedule->sdays->{$tdate}->opens->hour. ':' . $schedule->sdays->{$tdate}->opens->minute);
	 //Time selection settings. 
	$link = ConnectDB();
	 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
	$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	$rowtimeformat = pg_fetch_array($resulttimeformat);
	 $time_format=$rowtimeformat['value'];
	if($time_format==12){
			$dt1=date('h:i a',$strtotime);
		}else{
			$dt1=date('H:i ',$strtotime);
		}
	return $lang_resource['FRONT_BULK_UNTIL']." ".$ndays[$tdate]." ".$dt1;
	
	}
	
	}
	
	if($c == false) {
	$strtotime = strtotime($hour. ':' . $min);
	
	return $lang_resource['FRONT_BULK_UNTIL']." ".$ndays[$did]." ".date('h:i a',$strtotime);
	}
	
	}
function FetchAllCategoriesCustom($link)
	{
	
	$qn = 'sqlCut3'.rand();
	pg_prepare($link,$qn,'SELECT * from w_categories where enabled=$1 AND scriptid=$2');
	$result = pg_execute($link,$qn,array('true',$_SESSION['scriptid']));

	$categories = array();
	while($row = pg_fetch_array($result))
		{
		//$cat_each_lang_print = businesscuisinenamebylangdp($row['id']);
			$cat_each_lang_print = businesscuisinenamebylangdp($row['id']);
			
		if(isset($cat_each_lang_print) && $cat_each_lang_print != ""){
		
		
		$catname[strtolower(str_replace(" ","",$cat_each_lang_print))][] = $row['id'];
		$businessname[$cat_each_lang_print][] = $row['business'];
		}
		
		//array_push($categories,$category);
		}
		
		if(count($catname) >0) {
			
			foreach($catname as $key=>$val) {
				$category = new stdClass();
				//unset($category);
				$category->ids = implode(",",$val);
				for($cl=0;$cl<count($val);$cl++) {
					$cat_each_lang = businesscuisinenamebylang($val[$cl]);
					if(isset($cat_each_lang) && $cat_each_lang !=null ) {
						$category->name =  $cat_each_lang;
						$category->subcategory =  FetchAllSubCategoriesData($val[$cl],$link);
						$category->id = $val[$cl];
						$category->business =  $businessname[$key];
					}
				}
				//$category->name = $key;
				if($category->name !=null)
				array_push($categories,$category);
			}
		}

	return $categories;
	}	
	
	
function FetchAllCuisineData($link){
	$qn = 'sqlCut34'.rand();
	pg_prepare($link,$qn,'SELECT * from w_categories where enabled=$1 AND scriptid=$2');
	$result = pg_execute($link,$qn,array('true',$_SESSION['scriptid']));

	$categories = array();
	while($row = pg_fetch_array($result))
		{
		//$cat_each_lang_print = businesscuisinenamebylangdp($row['id']);
			$cat_each_lang_print = businesscuisinenamebylangdp($row['id']);
			
		if(isset($cat_each_lang_print) && $cat_each_lang_print != ""){
		
		
		$catname[strtolower(str_replace(" ","",$cat_each_lang_print))][] = $row['id'];
		$businessname[$cat_each_lang_print][] = $row['business'];
		}
		
		//array_push($categories,$category);
		}
		
		if(count($catname) >0) {
			foreach($catname as $key=>$val) {
				//unset($category);
				$category = new stdClass();
				$category->ids = implode(",",$val);
				for($cl=0;$cl<count($val);$cl++) {
					$cat_each_lang = businesscuisinenamebylang($val[$cl]);
					if(isset($cat_each_lang) && $cat_each_lang !=null ) {
						$category->name =  $cat_each_lang;
						//$category->subcategory =  FetchAllSubCategoriesData($val[$cl],$link);
						$category->id = $val[$cl];
						$category->business =  $businessname[$key];
					}
				}
				//$category->name = $key;
				if($category->name !=null)
				array_push($categories,$category);
			}
		}

	return $categories;
}	
function FetchAllCategoriesCustom1($link,$bids,$offset,$deliverytype){
	foreach($bids as $values)
	{
	$bds .= $values.',' ;
	}
	$bds=substr($bds, 0, -1);	
//echo $bds;
$test ="SELECT * from w_categories where scriptid=$1 AND enabled=$2 AND business in ($bds) order by id asc";
//echo $test;
	$test= pg_prepare($link,'sqlCut3',$test);
	//pg_prepare($link,'sqlCut3','SELECT * from w_categories where scriptid=$1 AND enabled=$2');
	$result = pg_execute($link,'sqlCut3',array($_SESSION['scriptid'],'true'));

	$categories = array();
	if(pg_num_rows($result)>0){
		while($row = pg_fetch_array($result)){		
			if($row['name'] != "")
				$catname[strtolower($row['name'])][] = $row['id'];
				$businessname[strtolower($row['name'])][] = $row['business'];
				
		}
		foreach($catname as $key=>$val) {
			unset($category);
			$category->ids = implode(",",$val);
			$category->business =  $businessname[$key];
			for($cl=0;$cl<count($val);$cl++) {
				$cat_each_lang = businesscuisinenamebylang($val[$cl]);
				if(isset($cat_each_lang) && $cat_each_lang !=null ) {
					$category->name =  $cat_each_lang;
					$category->id = $val[$cl];
					$category->isimg = businesscuisineisimg($val[$cl],$link);
				}
			}
			//$category->name = $key;
			if($category->name !=null)
			array_push($categories,$category);
		}
	}	
	
	return $categories;
}
function FetchAllCategoriesCustom2($link,$businessid){
	
	pg_prepare($link,'sqlCut3','SELECT * from w_categories where scriptid=$1 AND enabled=$2 AND business=$3');
	$result = pg_execute($link,'sqlCut3',array(0,'true',$businessid));

	$categories = array();
	if(pg_num_rows($result)>0){
		while($row = pg_fetch_array($result)){		
			if($row['name'] != "")
				$catname[strtolower($row['name'])][] = $row['id'];
				$businessname[strtolower($row['name'])][] = $row['business'];
				
		}
		foreach($catname as $key=>$val) {
			//unset($category);
			$category = new stdClass();
			$category->ids = implode(",",$val);
			$category->business =  $businessname[$key];
			for($cl=0;$cl<count($val);$cl++) {
				$cat_each_lang = businesscuisinenamebylang($val[$cl]);
				if(isset($cat_each_lang) && $cat_each_lang !=null ) {
					$category->name =  $cat_each_lang;
					$category->id = $val[$cl];
					$category->isimg = businesscuisineisimg($val[$cl],$link);
				}
			}
			//$category->name = $key;
			if($category->name !=null)
			array_push($categories,$category);
		}
	}	
	return $categories;
}
function FetchAllCategories2($link,$businessid){

	pg_prepare($link,'sqlCut3','SELECT * from w_categories where scriptid=$1 AND enabled=$2 AND business = $3');
	$result = pg_execute($link,'sqlCut3',array(0,'true',$businessid));

	$categories = array();
	if(pg_num_rows($result)>0){
		while($row = pg_fetch_array($result)){		
			if($row['name'] != "")
				//$catname[strtolower($row['name'])][] = $row['id'];
				$catname[strtolower(str_replace(" ","",businesscuisinenamebylangdp($row['id'])))][] = $row['id'];
				$businessname[strtolower($row['name'])][] = $row['business'];
				
		}
		foreach($catname as $key=>$val) {
			//unset($category);
			$category = new stdClass();
			$category->ids = implode(",",$val);
			$category->business =  $businessname[$key];
			for($cl=0;$cl<count($val);$cl++) {
				$cat_each_lang = businesscuisinenamebylang($val[$cl]);
				if(isset($cat_each_lang) && $cat_each_lang !=null ) {
					$category->name =  $cat_each_lang;
					$category->id = $val[$cl];
					$category->isimg = businesscuisineisimg($val[$cl],$link);
				}
			}
			//$category->name = $key;
			if($category->name !=null)
			array_push($categories,$category);
		}
	}	
	return $categories;
}	
	
function FetchAllCategories($link){
	
	pg_prepare($link,'sqlCut3','SELECT * from w_categories where scriptid=$1 and enabled=$2');
	$result = pg_execute($link,'sqlCut3',array($_SESSION['scriptid'],'true'));

	$categories = array();
	if(pg_num_rows($result)>0){
		while($row = pg_fetch_array($result)){		
			if($row['name'] != "")
			//$catname[strtolower($row['name'])][] = $row['id'];
			$catname[strtolower(str_replace(" ","",businesscuisinenamebylangdp($row['id'])))][] = $row['id'];
			$businessname[strtolower($row['name'])][] = $row['business'];
				
		}
		
		foreach($catname as $key=>$val) {
			//unset($category);
			$category = new stdClass();
			$category->ids = implode(",",$val);
			$category->business =  $businessname[$key];
			for($cl=0;$cl<count($val);$cl++) {
				$cat_each_lang = businesscuisinenamebylang($val[$cl]);
				if(isset($cat_each_lang) && $cat_each_lang !=null ) {
					$category->name =  $cat_each_lang;
					$category->id = $val[$cl];
					$category->isimg = businesscuisineisimg($val[$cl],$link);
				}
			}
			//$category->name = $key;
			if($category->name !=null)
			array_push($categories,$category);
		}
	}	

	
	return $categories;
}
function FetchAllCategories1($link,$bids,$offset,$deliverytype){
foreach($bids as $values)
{
	$bds .= $values.',' ;
}
$bds=substr($bds, 0, -1);
$test ="SELECT * from w_categories where scriptid=$1 AND enabled=$2 AND business in ($bds) order by id asc";
//echo $test;
	$test= pg_prepare($link,'sqlCut3',$test);
	$result = pg_execute($link,'sqlCut3',array($_SESSION['scriptid'],'true'));

	$categories = array();
	if(pg_num_rows($result)>0){
		while($row = pg_fetch_array($result)){		
			if($row['name'] != "")
				$catname[strtolower($row['name'])][] = $row['id'];
				$businessname[strtolower($row['name'])][] = $row['business'];
				
		}
		foreach($catname as $key=>$val) {
			unset($category);
			$category->ids = implode(",",$val);
			$category->business =  $businessname[$key];
			for($cl=0;$cl<count($val);$cl++) {
				$cat_each_lang = businesscuisinenamebylang($val[$cl]);
				if(isset($cat_each_lang) && $cat_each_lang !=null ) {
					$category->name =  $cat_each_lang;
					$category->id = $val[$cl];
					$category->isimg = businesscuisineisimg($val[$cl],$link);
				}
			}
			//$category->name = $key;
			if($category->name !=null)
			array_push($categories,$category);
		}
	}	
	//print_r($categories);
	return $categories;
}
function businesscuisineisimg($id,$link){
	pg_prepare($link,'sqlCutuu3'.$id,'SELECT * from w_categories where id=$1');
	$result1 = pg_execute($link,'sqlCutuu3'.$id,array($id));
	$row1 = pg_fetch_array($result1);
	return $row1['isimg'];
}

function FetchAllSubCategoriesData($id,$link){

	$rand = rand();
	pg_prepare($link,'sqlfetchsubcategories'.$rand.$id,'SELECT * from w_subcategories where category=$1 and enabled=$2 and scriptid=$3 ORDER BY id ASC');
	$result = pg_execute($link,'sqlfetchsubcategories'.$rand.$id,array($id,'TRUE',$_SESSION['scriptid']));
	
	$subcategories = array();
	$i = 0;
	while($row = pg_fetch_array($result)){
		$subcategories[$i]['id'] = $row['id'];
		$subcategories[$i]['name'] = FetchSubCategoryLangDefault($row['id']);
		$subcategories[$i]['enabled'] = true;
		$i ++;	
	}	
	return $subcategories;
}

function FetchBusinessOnlyMenu($businessid,$whereall,$link,$lang_resource){
	if($whereall->businesstype){
		$btype = 0;
		if($whereall->businesstype == 'b1'){
			$btype = 1;
		}
		if($whereall->businesstype == 'b2'){
			$btype = 2;
		}
		if($whereall->businesstype == 'b3'){
			$btype = 3;
		}
		if($whereall->businesstype == 'b4'){
			$btype = 4;
		}
		pg_prepare($link,'sql','SELECT * FROM w_menus WHERE business=$1 and enabled=true and btype=$2');
		$result = pg_execute($link,'sql',array($businessid,$btype));
	}else{
		pg_prepare($link,'sql','SELECT * FROM w_menus WHERE business=$1 and enabled=true');
		$result = pg_execute($link,'sql',array($businessid));
	}
    
 
		
	$catalogname = array();
	while($row = pg_fetch_array($result)) {
		unset($catlog);
		unset($weekend);
		//$catlog = new stdClass();
		//$weekend = new stdClass();
		$schedule = parse($row['schedule']);
		$days = parse($row['days']);
		for($p=0;$p<count($days);$p++) {
			if($days[$p]==0){
				$weekend[] = '<li><span>'.$lang_resource["Every_Day_V2"].'</span></li>';
			}else if($days[$p]==1){
				$weekend[] = '<li><span>'.$lang_resource["DAY1"].'</span></li>';
			}else if($days[$p]==2){
				$weekend[] = '<li><span>'.$lang_resource["DAY2"].'</span></li>';
			}else if($days[$p]==3){
				$weekend[] = '<li><span>'.$lang_resource["DAY3"].'</span></li>';
			}else if($days[$p]==4){
				$weekend[] = '<li><span>'.$lang_resource["DAY4"].'</span></li>';
			}else if($days[$p]==5){
				$weekend[] = '<li><span>'.$lang_resource["DAY5"].'</span></li>';
			}else if($days[$p]==6){
				$weekend[] = '<li><span>'.$lang_resource["DAY6"].'</span></li>';
			}else if($days[$p]==7){
				$weekend[] = '<li><span>'.$lang_resource["DAY7"].'</span></li>';
			}			
		}
		if(count($weekend)>0)
		$weekends = implode(" , ",$weekend);
		
		$opentime = sprintf('%02d', $schedule->opens->hour).":".sprintf('%02d', $schedule->opens->minute);
		$closetime = sprintf('%02d', $schedule->closes->hour).":".sprintf('%02d', $schedule->closes->minute);
		
		 $catlog->id = $row['id'];
		$catlog->name = businessmenunamebylang($row['id']);
		$catlog->opentime = $opentime;
		$catlog->closetime = $closetime;
		$catlog->weekends = $weekends;
		
		array_push($catalogname,$catlog);
		}
	return $catalogname;	
	}
	
function FetchAllbusinessSettingData($link){
	//unset($businesspagesettings);
	$businesspagesettings = new stdClass();
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'businesspagprograssbarsetting'){
			$businesspagesettings->prograssbarsetting = $row['value'];
		}
		if($row['name'] == 'businesspageheadersetting'){
			$businesspagesettings->businesspageheadersetting = $row['value'];
		}
		if($row['name'] == 'businesspagefootersetting'){
			$businesspagesettings->businesspagefootersetting = $row['value'];
		}
		if($row['name'] == 'businesspagimagesetting'){
			$businesspagesettings->businesspagimagesetting = $row['value'];
		}
		
	}
	
	return $businesspagesettings;	
		

}
function FetchAllbusinessSettingDataCommon($link){
	$businesspagesettings = new stdClass();
	//unset($businesspagesettings);
	pg_prepare($link,'sqlsounds','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsounds',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'businesspagprograssbarsetting'){
			$businesspagesettings->prograssbarsetting = $row['value'];
		}
		if($row['name'] == 'businesspageheadersetting'){
			$businesspagesettings->businesspageheadersetting = $row['value'];
		}
		if($row['name'] == 'businesspagefootersetting'){
			$businesspagesettings->businesspagefootersetting = $row['value'];
		}
		if($row['name'] == 'checkout_popup_settings'){
			$businesspagesettings->checkout_popup_settings = $row['value'];
		}
		if($row['name'] == 'checkout_available_product_settings'){
			$businesspagesettings->available_product = $row['value'];
		}
		
	}
	
	return $businesspagesettings;	
		

}
function FetchBusinessMenu($businessid,$deliveryType,$whereall,$link){
		$conquery ="SELECT * FROM w_configs WHERE name=$1"; 
		pg_prepare($link,'sqlco',$conquery);
		$resultsqu = pg_execute($link,'sqlco',array('panelsetting'));
		$roquery = pg_fetch_array($resultsqu);
		$panelsettings = $roquery['value'];

		$productordersetting = "productordersetting";
		pg_prepare($link,'sqlpset','SELECT * FROM w_configs WHERE name=$1');
		$resultpset = pg_execute($link,'sqlpset',array($productordersetting));
		$rowpaset = pg_fetch_array($resultpset);
		$psettingval = $rowpaset["value"];

        

		       $bquery ="SELECT * FROM w_business WHERE id=$1"; 
                pg_prepare($link,'sqlc1',$bquery);
                $results = pg_execute($link,'sqlc1',array($businessid));
                $bcity = pg_fetch_array($results);
                $city = $bcity['city'];
				$_SESSION['timezone'] = $bcity['timezone'];
                                       
                $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
                pg_prepare($link,'sqlc2',$cityquery);
                $resultp = pg_execute($link,'sqlc2',array($city));
                $rec = pg_fetch_array($resultp);
                //$_SESSION['timezone'] = $rec['timezone'];
				
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	//unset($response);
	$response = new stdClass();
	$dishesids = array();
	$dishes = array();
	$extras = array();

$condition='';	
if($deliveryType == "delivery")
{
	$condition=' and delivery=true ';
}

if($deliveryType == "pickup")
{
	$condition=' and pickup=true ';
}

if($whereall->businesstype){
	$btype = 0;
	if($whereall->businesstype == 'b1'){
		$btype = 1;
	}
	if($whereall->businesstype == 'b2'){
		$btype = 2;
	}
	if($whereall->businesstype == 'b3'){
		$btype = 3;
	}
	if($whereall->businesstype == 'b4'){
		$btype = 4;
	}
	$condition .='and btype='.$btype;
}

	//get the dishes
	pg_prepare($link,'sql','SELECT * FROM w_menus WHERE business=$1 and enabled=true '.$condition );
	$result = pg_execute($link,'sql',array($businessid));
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0'){//day 0 its the "all" days flag
			//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZone($_SESSION['timezone']));
				$schedule = parse($row['schedule']);
				
				if($schedule->closes->hour >23  && (date("H") == 00|| date("H") == 01|| date("H") == 02 || date("H") == 03 || date("H") == 04 )  ) {
					
					$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute)-86400;
				} else {
					$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute);
				}
				

				if ($now>=$shopopentime){
					if($schedule->closes->hour< 24) {
						$newScedule = strtotime($schedule->closes->hour.':'.$schedule->closes->minute);
					}else{
						if($schedule->closes->hour== 24  && (date("H") == 00 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )){
							$newScedule = strtotime("00:".$schedule->closes->minute)+86400;							
						}else if($schedule->closes->hour == 25 && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
						}else if($schedule->closes->hour == 26  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("02:".$schedule->closes->minute)+86400;	
						}else if($schedule->closes->hour == 27  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("03:".$schedule->closes->minute)+86400;	
						}else if($schedule->closes->hour== 28  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("04:".$schedule->closes->minute)+86400;	
						}else {
							if($schedule->closes->hour== 24)
								$newScedule = strtotime("00:".$schedule->closes->minute)+86400;	
							if($schedule->closes->hour== 25)
								$newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
							if($schedule->closes->hour== 26)
								$newScedule = strtotime("02:".$schedule->closes->minute)+86400;
							if($schedule->closes->hour== 27)
								$newScedule = strtotime("03:".$schedule->closes->minute)+86400;
							if($schedule->closes->hour== 28)
								$newScedule = strtotime("04:".$schedule->closes->minute)+86400;
						}
					}

					

					if ($now<$newScedule) {
						foreach (parse($row['dishes']) as $dishid)
							array_push($dishesids,$dishid);
					}
				}
			}
				
	
	$dishesids = ArrayUnique($dishesids);


	//get the dishes info
	$extrasids = array();
	$ui = 0;
	foreach ($dishesids as $dishid)
		{
		//pg_prepare($link,'sqld'.$dishid,'SELECT name,description,ingredients,price,category,extras FROM w_dishes WHERE id=$1 and enabled=true');
		pg_prepare($link,'sqld'.$dishid,'SELECT w_dishes.name,w_dishes.seller_winelibary,w_dishes.origin_winelibary,w_dishes.description,w_dishes.rank_cat,w_dishes.ingredients,w_dishes.price,w_dishes.category,w_dishes.extras,w_dishes.isimg,w_dishes.isimg2,w_dishes.isimg3,w_dishes.feature,w_dishes.points,w_dishes.stock_qty,w_dishes.deliveryprice,w_categories.name AS cname FROM w_dishes INNER JOIN w_categories ON   w_dishes.id=$1 AND w_dishes.category = w_categories.id AND w_dishes.enabled=true AND w_categories.enabled=true');
		
		$result = pg_execute($link,'sqld'.$dishid,array($dishid));
		while($row = pg_fetch_array($result))
			{
			//unset($dish);
			$dish = new stdClass();
			$dish->id = $dishid;
			$dish->name = dishidnamebylang($dishid);
			$dish->ingredients = $row['ingredients'];
			$dish->price = $row['price'];
			if($psettingval=='1'){
			$dish->delivery_price = $row['deliveryprice'];
			}
			$dish->psettingval = $psettingval;
			$dish->extras = $row['extras'];
			$dish->category = $row['category'];
			$dish->catname = businessmenuprecategorynamebylang($row['category'],$ui);
			if($panelsettings == 2){
				$dish->rank_cat = rankcat($row['category'],$ui,$link);
			}else{
				$dish->rank_cat = $row['rank_cat'];
			}

			
			$dish->isimg = $row['isimg'];
			$dish->isimg2 = $row['isimg2'];
			$dish->isimg3 = $row['isimg3'];
			$dish->description = dishiddescriptionbylang($dishid);
			$dish->feature = $row['feature'];
			$dish->points = $row['points'];
			$dish->stock_qty = $row['stock_qty'];
			$dish->seller_winelibary =$row['seller_winelibary'];
			$dish->origin_winelibary =$row['origin_winelibary'];
			$dish->Alldishsets = GetAllSets($dishid);
			$jextras = parse($dish->extras);
			if (count($jextras)>0)
				foreach ($jextras as $extraid)
					array_push($extrasids,$extraid);
			if($dish->name !=null)
			array_push($dishes,$dish);
			$ui ++;
			}
		}

	$extrasids = ArrayUnique($extrasids);

	//get the extras info
	foreach($extrasids as $extraid)
		{
		pg_prepare($link,'sqle'.$extraid,'SELECT name,price FROM w_extras WHERE id=$1 and enabled=true');
		$result2 = pg_execute($link,'sqle'.$extraid,array($extraid));
		while($row2 = pg_fetch_array($result2))
			{
			//unset($extra);
			$extra = new stdClass();
			$extra->id = $extraid;
			$extra->name = $row2['name'];
			$extra->price = $row2['price'];
			array_push($extras,$extra);
			}
		}

	$response->dishes = $dishes;
	$response->extras = $extras;
	return $response;
	}

	function rankcat($cid,$ui,$link){
		pg_prepare($link,'sqlcf'.$ui,'SELECT rank FROM w_categories WHERE id=$1');
		$result2 = pg_execute($link,'sqlcf'.$ui,array($cid));
		$row2 = pg_fetch_array($result2);
		return $row2['rank'];
	}

function FetchBusinessPreOrderMenu($businessid,$date,$mm,$hh,$deliveryType,$whereall,$link){

	$conquery ="SELECT * FROM w_configs WHERE name=$1"; 
	pg_prepare($link,'sqlco',$conquery);
	$resultsqu = pg_execute($link,'sqlco',array('panelsetting'));
	$roquery = pg_fetch_array($resultsqu);
	$panelsettings = $roquery['value'];
	
	$productordersetting = "productordersetting";
	pg_prepare($link,'sqlpset','SELECT * FROM w_configs WHERE name=$1');
	$resultpset = pg_execute($link,'sqlpset',array($productordersetting));
	$rowpaset = pg_fetch_array($resultpset);
	$psettingval = $rowpaset["value"];
	
	            $bquery ="SELECT * FROM w_business WHERE id=$1"; 
                pg_prepare($link,'sqlca1',$bquery);
                $results = pg_execute($link,'sqlca1',array($businessid));
                $bcity = pg_fetch_array($results);
                $city = $bcity['city'];
				$_SESSION['timezone'] = $bcity['timezone'];
                                       
                $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
                pg_prepare($link,'sqlca2',$cityquery);
                $resultp = pg_execute($link,'sqlca2',array($city));
                $rec = pg_fetch_array($resultp);
                //$_SESSION['timezone'] = $rec['timezone'];
				
		        GetTimeByZone($_SESSION['timezone']);
		
		
		$date = stringrpl(4,"/",$date);
		$date = stringrpl(7,"/",$date);
		
		$strtotimeDate = strtotime($date);


	//$strtotimeDate = $date/1000+24*60*60;
	//echo date("Y/m/d",$date);
	  
		//echo date("Y/m/d",$strtotimeDate);
		/*echo "<br>";
		echo $mm;
		echo "<br>";
		echo $hh;
		echo "<br>";*/
		
	
	
	
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",$strtotimeDate)};

	
	//unset($response);
	$response = new stdClass();
	$dishesids = array();
	$dishes = array();
	$extras = array();
$condition='';	
if($deliveryType == "delivery")
{
	$condition=' and delivery=true ';
}

if($deliveryType == "pickup")
{
	$condition=' and pickup=true ';
}
if($whereall->businesstype){
	$btype = 0;
	if($whereall->businesstype == 'b1'){
		$btype = 1;
	}
	if($whereall->businesstype == 'b2'){
		$btype = 2;
	}
	if($whereall->businesstype == 'b3'){
		$btype = 3;
	}
	if($whereall->businesstype == 'b4'){
		$btype = 4;
	}
	$condition .='and btype='.$btype;
}

	//get the dishes
	pg_prepare($link,'sql','SELECT * FROM w_menus WHERE business=$1 and enabled=true'.$condition );
	$result = pg_execute($link,'sql',array($businessid));
	
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime($mm.":".$hh);
				
				 if($mm == "24") {
				  $mm ="0";
				   $now = strtotime($mm.":".$hh." +1 day");	  
				 }
				 else if($mm == "25")  {
				  $mm ="1";
				   $now = strtotime($mm.":".$hh." +1 day");	  
				 }
				 else if($mm == "26")  {
				  $mm ="2";
				   $now = strtotime($mm.":".$hh." +1 day");	  
				 }
				 else if($mm == "27")  {
				  $mm ="3";
				   $now = strtotime($mm.":".$hh." +1 day");	  
				 }
				  else if($mm == "28")  {
				  $mm ="4";
				  $now = strtotime($mm.":".$hh." +1 day");	  
				  }
				  else  {
				$now = strtotime($mm.":".$hh);	  
					  
					  }
				  
				$schedule = parse($row['schedule']);
				
						
				
				if ($now>=strtotime($schedule->opens->hour.':'.$schedule->opens->minute))//menu opened now check if its not closed
				{
					if($schedule->closes->hour< 24) {
							
						$newScedule = strtotime($schedule->closes->hour.':'.$schedule->closes->minute);
						}
						else
						{
							if($schedule->closes->hour== 24)
							{
							$newScedule = strtotime("00:".$schedule->closes->minute." +1 day");
							}
							else if($schedule->closes->hour == 25) {
							$newScedule = strtotime("01:".$schedule->closes->minute." +1 day");	
							}
							else if($schedule->closes->hour == 26) {
								
							$newScedule = strtotime("02:".$schedule->closes->minute." +1 day");	
							}
							else if($schedule->closes->hour == 27) {
							$newScedule = strtotime("03:".$schedule->closes->minute." +1 day");	
							}
							else if($schedule->closes->hour== 28) {
							$newScedule = strtotime("04:".$schedule->closes->minute." +1 day");	
							}
						}
						
					if ($now >= strtotime($schedule->opens->hour.':'.$schedule->opens->minute) && $now <=$newScedule) {

						
						foreach (parse($row['dishes']) as $dishid) {
							array_push($dishesids,$dishid);
						
						}
						}
							
					}
				}
	$dishesids = ArrayUnique($dishesids);


	//get the dishes info
	$extrasids = array();
	$ui = 0;
	foreach ($dishesids as $dishid)
		{
		//pg_prepare($link,'sqld'.$dishid,'SELECT name,description,ingredients,price,category,extras FROM w_dishes WHERE id=$1 and enabled=true');
		pg_prepare($link,'sqld'.$dishid,'SELECT w_dishes.name,w_dishes.description,w_dishes.seller_winelibary,w_dishes.origin_winelibary,w_dishes.rank_cat,w_dishes.ingredients,w_dishes.price,w_dishes.category,w_dishes.extras,w_dishes.isimg,w_dishes.isimg2,w_dishes.isimg3,w_dishes.extras,w_dishes.feature,w_dishes.points,w_dishes.stock_qty,w_dishes.deliveryprice,w_categories.name AS cname FROM w_dishes INNER JOIN w_categories ON   w_dishes.id=$1 AND w_dishes.category = w_categories.id AND w_dishes.enabled=true AND w_categories.enabled=true');
		
		$result = pg_execute($link,'sqld'.$dishid,array($dishid));
		while($row = pg_fetch_array($result))
			{
			//unset($dish);
			$dish = new stdClass();
			$dish->id = $dishid;
			$dish->name = predishidnamebylang($dishid);
			$dish->ingredients = $row['ingredients'];
			$dish->price = $row['price'];
			$dish->extras = $row['extras'];
			$dish->category = $row['category'];
			$dish->catname = businessmenucategorynamebylang($row['category'],$ui);
			if($panelsettings == 2){
				$dish->rank_cat = rankcat($row['category'],$ui,$link);
			}else{
				$dish->rank_cat = $row['rank_cat'];
			}
			if($psettingval=='1'){
			$dish->delivery_price = $row['deliveryprice'];
			}
			$dish->isimg = $row['isimg'];
			$dish->isimg2 = $row['isimg2'];
			$dish->isimg3 = $row['isimg3'];
			$dish->description = dishipredescriptionbylang($dishid);
			//$dish->description = $row['description'];
			$dish->feature = $row['feature'];
			$dish->points =$row['points'];
			$dish->stock_qty = $row['stock_qty'];
			$dish->Alldishsets = GetAllSets($dishid);			
			$dish->seller_winelibary =$row['seller_winelibary'];
			$dish->origin_winelibary =$row['origin_winelibary'];
			$jextras = parse($dish->extras);
			if (count($jextras)>0)
				foreach ($jextras as $extraid)
					array_push($extrasids,$extraid);
			array_push($dishes,$dish);

			$ui ++;
			}
		}

	$extrasids = ArrayUnique($extrasids);

	//get the extras info
	foreach($extrasids as $extraid)
		{
		pg_prepare($link,'sqle'.$extraid,'SELECT name,price FROM w_extras WHERE id=$1 and enabled=true');
		$result2 = pg_execute($link,'sqle'.$extraid,array($extraid));
		while($row2 = pg_fetch_array($result2))
			{
			//unset($extra);
			$extra = new stdClass();
			$extra->id = $extraid;
			$extra->name = $row2['name'];
			$extra->price = $row2['price'];
			array_push($extras,$extra);
			}
		}

	$response->dishes = $dishes;
	$response->extras = $extras;
	return $response;
	
	
	}

function stringrpl($x,$r,$str) 
{ 
$out = ""; 
$temp = substr($str,$x); 
$out = substr_replace($str,"$r",$x); 
$out .= $temp; 
return $out; 
} 

function FetchAdData($lastad,$cityid,$link){

	$query = 'SELECT id,type,time,link FROM w_ads WHERE enabled=true AND city=$1 AND scriptid= $3 OR enabled=true AND city=$2 AND scriptid= $4';
	pg_prepare($link,'sql4',$query);

	if (empty($cityid))//if we dont get city, means the user just arrived to the page and we dont know where he is
		//so we send him ads with the -1(all citys) and -2 (generic location)
		$result = pg_execute($link,'sql4',array(-1,-2,$_SESSION['scriptid'],$_SESSION['scriptid']));
		else//if we do specify a city we sent to the user the -1(all citys) and the ones on his city
		$result = pg_execute($link,'sql4',array(-1,$cityid,$_SESSION['scriptid'],$_SESSION['scriptid']));

	$ads = array();
	$individualcount = 0;
	while($row = pg_fetch_array($result)){

		///unset($ad);
		$ad = new stdClass();
		$ad->id = $row['id'];
		$ad->type = $row['type'];
		$ad->link = $row['link'];
		$ad->time = $row['time'];
		if ($ad->type=='1')
			$individualcount++;
		array_push($ads,$ad);
	}
	//	print_r($ads);
	$totalads = count($ads);

	if ($totalads<2)
		{
		if (empty($cityid))
			{
			if ($lastad!='-1')
				return;//if we have 1 or less to show,just return empty... cause theres no rotation...
			}
			else
			if ($totalads==0)
				{
				//if we are here means or that we have the city but no results for it or 1
				$query = 'SELECT id,type,link,time FROM w_ads WHERE enabled=true AND city=$1';
				pg_prepare($link,'sql5',$query);
				$result = pg_execute($link,'sql5',array(-2));
				$ads = array();
				$individualcount = 0;
				while($row = pg_fetch_array($result))
					{
					//unset($ad);
					$ad = new stdClass();
					$ad->id = $row['id'];
					$ad->type = $row['type'];
					$ad->link = $row['link'];
					$ad->time = $row['time'];
					if ($ad->type=='1')
						$individualcount++;
					array_push($ads,$ad);
					}
				}		
				$totalads = count($ads);
				if ($totalads<2 && $lastad!='-1')
					return;//nothing to do here...
				
		}

	do
		{
    	$pickad = rand(0,$totalads-1);
    	shuffle($ads);
    	$ad = $ads[$pickad];
		}
	while ($ad->id==$lastad);


	if ($ad->type=='1')//small ads have a default timing and need to be send 2 
		{
		$ad->time = '20';//in case of not setted...
		pg_prepare($link,'sql6','SELECT value FROM w_configs WHERE name=$1');
		$result = pg_execute($link,'sql6',array('splitedadtime'));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				$ad->time = $row['value'];

		$firstid = $ad->id;
		$firstlink = $ad->link;

		if ($individualcount>2)
			{
			do
				{
		    	$pickad = rand(0,$totalads-1);
		    	shuffle($ads);
		    	$ad2 = $ads[$pickad];
				}
			while ($ad2->id==$firstid || $ad2->type=='0' || $ad2->id==$lastad);
			}
			else
			if ($individualcount>1)
				{
				do
					{
			    	$pickad = rand(0,$totalads-1);
			    	shuffle($ads);
			    	$ad2 = $ads[$pickad];
					}
				while ($ad2->id==$firstid || $ad2->type=='0');
				}

		//unset($ad->id);
		$ad->id = new stdClass();
		$ad->firstid = $firstid;
		$ad->firstlink = $firstlink;
		$ad->secondid = $ad2->id; 
		$ad->secondlink = $ad2->link; 
		}

	return $ad;
	}


function FetchRecentActivityData($link,$lang_resource)
	{		
	pg_prepare($link,'sql6','SELECT recentdata,usr,requestcollectiondata FROM w_orders WHERE scriptid=$1 ORDER BY id DESC 
LIMIT 8');
	$result = pg_execute($link,'sql6',array($_SESSION['scriptid']));
	
pg_prepare($link,'sql70','SELECT id,isimg FROM w_users where id=$1');

	$activities = array();
	while($row = pg_fetch_array($result)){
		//unset($active);
		$active = new stdClass();
		//for equest collection 
		if(trim($row['requestcollectiondata'])!=""){
				//unset($data11);
				$data11 = new stdClass();
				$dat5= json_decode($row['requestcollectiondata']);
				$data11->user->name=$dat5[0]->customer_name;
				$data11->business->name=$dat5[0]->resturent_name;
				$data11->business->id=0;
				$active->recentdata = $data11;
		//for equest collection  end 			
		}else{ //for equest collection 
				$active->recentdata = json_decode($row['recentdata']);
		} //for equest collection 
	
		$result70 = pg_execute($link,'sql70',array($row['usr']));
		
		$row70 = pg_fetch_array($result70);
		
		$active->id = $row70['id'];
		
		 $folders = '../images/users/'.$row['usr'];
			//echo file_exists($folders);
		        if(file_exists($folders)) {
					
				$active->isimg = 1;
				}
				else  {
				$active->isimg = 0;
				
				}
				
	array_push($activities,$active);
	}
	return $activities;
	}

function FetchMostPopularsData($link)
	{
		
		pg_prepare($link,'sqlpopular',"SELECT * FROM w_configs WHERE name=$1");	
$respo = pg_execute($link,'sqlpopular',array('popularsettings'));
$rowpo = pg_fetch_array($respo);
$popularsettings = $rowpo['value'];

if($popularsettings=="1")
{
 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql7','SELECT id,customslug,isimg,scriptid FROM w_business where enabled=true AND is_popular=true AND scriptid=$1 ORDER BY id DESC');
	$result = pg_execute($link,'sql7',array($_SESSION['scriptid']));
}
else
{
		 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql7','SELECT id,customslug,isimg,scriptid FROM w_business where enabled=true AND scriptid=$1 ORDER BY id DESC');
	$result = pg_execute($link,'sql7',array($_SESSION['scriptid']));
}
	$populars = array();
	while($row = pg_fetch_array($result))
	{
		//unset($popular);
		$popular = new stdClass();
		$popular->id = $row['id'];
		$popular->isimg = $row['isimg'];
		$popular->customslug = $row['customslug'];
		
		
		$folder = "../images/business/". $row['id'];
			 if(file_exists($folder))  {
				$popular->status = 1; 
			 }
			 else
			 {
				$popular->status = 0;  
			 }
		
		array_push($populars,$popular);
		
	}
		
		
	return $populars;
	}
	
	function FetchCountryCity($link)
	{
		
		pg_prepare($link,'sqli8',"select w_countries.* from w_countries join w_franchises on w_franchises.country=w_countries.id where w_franchises.city!='' AND w_franchises.scriptid=$1 AND w_countries.scriptid=$2 AND w_countries.enabled=$3 group by w_countries.id order by w_countries.name ASC");
	$result = pg_execute($link,'sqli8',array($_SESSION['scriptid'],$_SESSION['scriptid'],'TRUE'));
	

	$countrycity = array();
	
	while($row = pg_fetch_array($result))
	{
		$countrycit = new stdClass();
		//unset($countrycit);
		$countrycit->countryid = $row['id'];
		$countrycit->countryname = countrynamebylang($row['id']);
		$countrycit->cityname = cityfetch($row['id'],$link);
		if($countrycit->countryname!=null)
		array_push($countrycity,$countrycit);
		
	}
		
		
	return $countrycity;
	}
	
function cityfetch($id,$link){
		pg_prepare($link,'sql'.$id,'
select * from w_franchises where country=$1 and enabled=$2 order by city ASC');
		$result = pg_execute($link,'sql'.$id,array($id,'TRUE'));
		$cityfe = array();
		while($row = pg_fetch_array($result)){
			//unset($cityy);
			$cityy = new stdClass();
			$cityy->id = $row['id'];
			$cityy->name=citynamebylang($row['id']);
			if($cityy->name!=null)
			array_push($cityfe,$cityy);		
		}
return $cityfe;
}

function FetchMyOrders($link,$lang_resource)
	{

	pg_prepare($link,'sql8','SELECT id,date,data,status FROM w_orders WHERE usr=$1 AND scriptid=$2 ORDER BY id DESC');
	$result = pg_execute($link,'sql8',array($_SESSION['user']->id,$_SESSION['scriptid']));

	pg_prepare($link,'sqlreorder','SELECT reorder FROM w_business WHERE id=$1');

	$orders = array();
	//include_once("../../languages/lang.en.php");
	while($row = pg_fetch_array($result))
		{
		//unset($order);
		$order = new stdClass();
		$order->id = $row['id'];
		$date = explode(':',$row['date']);
		$order->date = $date[0] . ':' . $date[1];
		$order->status = $row['status'];
		$data = json_decode($row['data']);
		$order->cityid = $data->buyer->city;
		$order->data = json_encode($data);
		if($data->buyer->city!=""){
			$order->city = usersOrdercitybylang($data->buyer->city,$row['id']);
		}
		$order->busname = $data->business[0]->name;


		$freorderp = pg_execute($link,'sqlreorder',array($data->business[0]->id));	
		$rreorderp = pg_fetch_array($freorderp);
		$order->bpermission = $rreorderp['reorder'];
		
		switch ($order->status)
			{
			case '0':
				$order->statustext = $lang_resource['ORDER_PENDING'];
			break;
			case '1':
				$order->statustext = $lang_resource['ORDER_COMPLETED'];
			break;
			case '2':
				$order->statustext = $lang_resource['ORDER_CANCELLED'];
			break;
			case '3':
				$order->statustext = $lang_resource['V3_ORDER_Preparation'];
			break;
			case '4':
				$order->statustext = $lang_resource['V3_ORDER_ORDER_ON_ITS_WAY'];
			break;
			case '5':
				$order->statustext = $lang_resource['V3_ORDER_CANCELLED_RESTAURANT'];
			break;
			case '6':
				$order->statustext = $lang_resource['ORDER_STATUS_CANCELLEDBYDRIVER'];
			break;
			case '7':
				$order->statustext = $lang_resource['ORDER_STATUS_ACCEPTEDBYRESTAURANT'];
			break;
			}
			if($data->buyer->city!=""){
		array_push($orders,$order);
			}
		}

	return $orders;
	}



function FetchOrderData($id,$link,$lang_resource){
	pg_prepare($link,'sql1','SELECT usr,data,comment,date,status,driver_id,driver_comment,transactium_tid,transactium_status,requestcollectiondata,stripe_result,payu_result FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql1',array($id));
	
	$order = new stdClass();	
	while($row = pg_fetch_array($result)){
		$order->statusshow = false;
		if($row["requestcollectiondata"]==''){
			$data = json_decode($row['data']);
		}else{
			$requestcollectiondata=json_decode($row["requestcollectiondata"]);
		}
		if($_SESSION['user']->id == $row['usr']){
			$order->statusshow = true;
		}else if($row['usr'] == -1){
			$order->statusshow = true;
		}
		if(!empty($requestcollectiondata)){
			$order->requestcollectiondata=true;

			$data->buyer->customer_name=$requestcollectiondata[0]->customer_name;
			$data->buyer->customer_address1=$requestcollectiondata[0]->customer_address1;
			$data->buyer->customer_address2=$requestcollectiondata[0]->customer_address2;
			$data->buyer->customer_town=$requestcollectiondata[0]->customer_town;
			$data->buyer->customer_postcode=$requestcollectiondata[0]->customer_postcode;
			$data->buyer->customer_contactno=$requestcollectiondata[0]->customer_contactno;
			$data->buyer->customer_note=$requestcollectiondata[0]->customer_note;

			$data->resturent->resturent_name=$requestcollectiondata[0]->resturent_name;
			$data->resturent->resturent_address1=$requestcollectiondata[0]->resturent_address1;
			$data->resturent->resturent_address2=$requestcollectiondata[0]->resturent_address2;
			$data->resturent->resturent_town=$requestcollectiondata[0]->resturent_town;
			$data->resturent->resturent_postcode=$requestcollectiondata[0]->resturent_postcode;
			$data->resturent->resturent_contactno=$requestcollectiondata[0]->resturent_contactno;

			pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
			$resulttimeformat = pg_execute($link,'sqltmfrm',array());
			$rowtimeformat = pg_fetch_array($resulttimeformat);
			$htime = date("H",strtotime($requestcollectiondata[0]->resturent_collection_time));
			$mtime = date("i",strtotime($requestcollectiondata[0]->resturent_collection_time));
			$time_format=$rowtimeformat['value'];
			$str='';
			if($time_format==12){
				$str='PM';
				if($htime<12){
					$str='AM';
				}
				$htime=floor($htime%12);

				if (intval($htime) < 10) {
					$htime = "0".intval($htime);
				}
				if (intval($mtime) < 10) {
					$mtime = "0".intval($mtime);
				}
			}else{

				if($htime>=24){
					$str='AM';
					$htime=floor($htime%12);
				}
				if (intval($htime) < 10) {
					$htime = "0".intval($htime);
				}
				if (intval($mtime) < 10) {
					$mtime= "0".intval($mtime);
				}
			}
			$date = date("d/m/Y",strtotime($requestcollectiondata[0]->resturent_collection_time));

			$data->resturent->resturent_collection_time=$date."&nbsp;".$htime.":".$mtime."&nbsp;".$str;
			$data->resturent->resturent_other_value=$requestcollectiondata[0]->resturent_other_value;
			$data->resturent->resturent_other_reference=$requestcollectiondata[0]->resturent_other_reference;
			$order->deliveryprice=$requestcollectiondata[0]->deliveryprice;
		}else{
			$data->buyer->email = $data->buyer->email;
			$data->buyer->name = $data->buyer->name;
			$data->buyer->tel = $data->buyer->tel;
			$data->buyer->address = $data->buyer->address;
		}
		
		/*for reserve*/	
		$data1=json_decode($row['data']);	

		pg_prepare($link,'sqlroom','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
		$resultroom = pg_execute($link,'sqlroom',array(2,$data1->business[0]->id));
		$rowroom = pg_fetch_array($resultroom);
		$order->roomprice = $rowroom['price'];	

		pg_prepare($link,'sqltable','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
		$resulttable = pg_execute($link,'sqltable',array(1,$data1->business[0]->id));
		$rowtable = pg_fetch_array($resulttable);
		$order->tableprice = $rowtable['price'];		

		pg_prepare($link,'sqlfree','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
		$resultfree = pg_execute($link,'sqlfree',array(3,$data1->business[0]->id));
		$rowfree = pg_fetch_array($resultfree);
		$order->freeprice = $rowfree['price'];		

		/*for reserve*/	
		pg_prepare($link,'sqlbp','SELECT currency,colony,reorder,street,deliverytime,pickuptime FROM w_business WHERE id=$1');
		$freorderp = pg_execute($link,'sqlbp',array($data->business[0]->id));	
		$rreorderp = pg_fetch_array($freorderp);

		$order->businessid = $data->business[0]->id;
		$order->bpermission = $rreorderp['reorder'];
		$order->bstreet = $rreorderp['street'];
		$order->bcolony = $rreorderp['colony'];
		$order->bcar = currency_symbol($rreorderp['currency']);
		$order->bdeliverytime = $rreorderp['deliverytime'];
		$order->bpickuptime = $rreorderp['pickuptime'];

		$order->id = $id;
		$order->data = json_encode($data);
		$order->date = $row['date'];
		$order->usr = $row['usr'];
		$order->comment = $row['comment'];
		$order->strip_enable=$row['stripe_result'];
		$order->payu_result=$row['payu_result'];
		$order->driver_comment = $row['driver_comment'];
		$order->transactium_tid = $row['transactium_tid'];
		$order->transactium_status = $row['transactium_status'];

		//Get Driver GPS url if Driver Accepted Order
		$order->gprs_url = NULL;
		if($row['driver_id'] && ($row['status']==4)){
			pg_prepare($link,'sql33','SELECT gprs_url FROM w_driver WHERE id=$1');
			$result12 = pg_execute($link,'sql33',array($row['driver_id']));
			$row12 = pg_fetch_array($result12);
			$order->gprs_url = $row12['gprs_url'];
		}

		$order->statnum = $row['status'];

		switch ($row['status']){
			case '0':
				$order->status = $lang_resource['ORDER_PENDING'];
				break;
			case '1':
				$order->status = $lang_resource['ORDER_COMPLETED'];
				break;
			case '2':
				$order->status = $lang_resource['ORDER_CANCELLED'];
				break;
			case '3':
				$order->status = $lang_resource['V3_ORDER_Preparation'];
				break;
			case '4':
				$order->status = $lang_resource['ORDER_STATUS_ONITSWAY'];
				break;
			case '5':
				$order->status = $lang_resource['V3_ORDER_CANCELLED_RESTAURANT'];
				break;
			case '6':
				$order->status = $lang_resource['ORDER_STATUS_CANCELLEDBYDRIVER'];
				break;
			case '7':
				$order->status = $lang_resource['ORDER_STATUS_ACCEPTEDBYRESTAURANT'];
				break;

		}
	}
	return $order;
}

function CheckPaypalPayment($id,$link)
	{
	pg_prepare($link,'sql9','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
	$result = pg_execute($link,'sql9',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			return 'ok';
	}
	function DiscountOffer($id,$link)
	{
	$conditionalsvalues = array();
	$date = date('Y-m-d');
	$query = 'SELECT * FROM w_discountoffer WHERE business = $1 AND accept=$2 AND startdate <=$3 AND enddate>=$3 ORDER BY id DESC LIMIT 1';
	pg_prepare($link,'sql5',$query);
	$result = pg_execute($link,'sql5',array($id,'TRUE',$date));

	$offers = array();
	while($row = pg_fetch_array($result))
		{
		
		//unset($offer);
		$offer = new stdClass();
		$offer->type = $row['discountype'];
		$offer->rate = $row['rate'];
		$offer->minshop = $row['minshop'];
		array_push($offers,$offer);
		
		}

	return $offers;
	}
 

function FetchBusinessOnlyMenuEach($item,$bussid,$link,$lang_resource){

	if($item != 0) {
		$week = 0;	
		pg_prepare($link,'sql','SELECT * FROM w_menus WHERE id=$1 and enabled=true');
		$result = pg_execute($link,'sql',array($item));
		$catalogname = array();

		while($row = pg_fetch_array($result)) {
			unset($catlog);
			unset($date);
			unset($datev);
			unset($datastore);
			unset($schedule);
			/*$catlog = new stdClass();
			$date = new stdClass();
			$datev = new stdClass();
			$datastore = new stdClass();
			$schedule = new stdClass();*/
			//unset($weekend);

			$schedule = parse($row['schedule']);
			$days = parse($row['days']);						
			$srtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
			$currentDate = date('Y-m-d',$srtotime);

			for($i=0; $i<count($days); $i++ ) {
				if($days[$i] == 7)
					$datastore[]= 0;
				else 
					$datastore[]= $days[$i];

				if($days[$i] == 0) 
					$week = 1;
			}
			
			if($week == 1 ){								
				/*$date[] = date("l dS F,Y",strtotime($currentDate) );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 1day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 2day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 3day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 4day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 5day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 6day") );*/
								
								
				$date[] = date_lang_change($currentDate,0,$lang_resource);
				$date[] = date_lang_change($currentDate,1,$lang_resource);
				$date[] = date_lang_change($currentDate,2,$lang_resource);
				$date[] = date_lang_change($currentDate,3,$lang_resource);
				$date[] = date_lang_change($currentDate,4,$lang_resource);
				$date[] = date_lang_change($currentDate,5,$lang_resource);
				$date[] = date_lang_change($currentDate,6,$lang_resource);
								
								
				$datev[] = date("Y-m-d",strtotime($currentDate) );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 1day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 2day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 3day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 4day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 5day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 6day") );
								
								
			}else{
				if(in_array(date("w",strtotime($currentDate)),$datastore)){										
					//$date[] = date("l dS F,Y",strtotime($currentDate) );
					$date[] = date_lang_change($currentDate,0,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate) );
				}
				if(in_array(date("w",strtotime($currentDate."+ 1day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 1day") );
					$date[] = date_lang_change($currentDate,1,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 1day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 2day")),$datastore)){					
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 2day") );
					$date[] = date_lang_change($currentDate,2,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 2day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 3day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 3day") );
					$date[] = date_lang_change($currentDate,3,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 3day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 4day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 4day") );
					$date[] = date_lang_change($currentDate,4,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 4day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 5day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 5day") );					
					$date[] = date_lang_change($currentDate,5,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 5day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 6day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 6day") );
					$date[] = date_lang_change($currentDate,6,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 6day") );
				}
			}
							
			$catlog->id = $row['id'];
			$catlog->business = $row['business'];
			$catlog->name = $row['name'];
			$catlog->workdays = json_encode($date);
			$catlog->workvaluedays = json_encode($datev);
			$catlog->openhour = $schedule->opens->hour;
			$catlog->closehour = $schedule->closes->hour;
			$catlog->openmin= $schedule->opens->minute;
			$catlog->closemin = $schedule->closes->minute;		
			
			array_push($catalogname,$catlog);
		}
							
	}else if($bussid != 0) {

		pg_prepare($link,'sqlMenu','SELECT * FROM w_menus WHERE business=$1 and enabled=true');
		$resultMenu = pg_execute($link,'sqlMenu',array($bussid));
		$finalResultMenu = pg_fetch_array($resultMenu);
		$item= $finalResultMenu['id'];
					  
		$week = 0;	
		pg_prepare($link,'sql','SELECT * FROM w_menus WHERE id=$1 and enabled=true');
		$result = pg_execute($link,'sql',array($item));
		$catalogname = array();
						
		while($row = pg_fetch_array($result)) {
			unset($catlog);
			unset($date);
			unset($datev);
			unset($datastore);
			unset($schedule);

			/*$catlog = new stdClass();
			$date = new stdClass();

			$datev = new stdClass();
			$datastore = new stdClass();
			$schedule = new stdClass();*/
			//unset($weekend);

			$schedule = parse($row['schedule']);
			$days = parse($row['days']);

			$srtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
			$currentDate = date('Y-m-d',$srtotime);

			for($i=0; $i<count($days); $i++ ) {
				if($days[$i] == 7)
					$datastore[]= 0;
				else 
					$datastore[]= $days[$i];

				if($days[$i] == 0) 
					$week = 1;
			}
			
			if($week == 1 ){					
								
				/*$date[] = date("l dS F,Y",strtotime($currentDate) );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 1day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 2day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 3day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 4day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 5day") );
				$date[] = date("l dS F,Y",strtotime($currentDate."+ 6day") );*/
								
								
				$date[] = date_lang_change($currentDate,0,$lang_resource);
				$date[] = date_lang_change($currentDate,1,$lang_resource);
				$date[] = date_lang_change($currentDate,2,$lang_resource);
				$date[] = date_lang_change($currentDate,3,$lang_resource);
				$date[] = date_lang_change($currentDate,4,$lang_resource);
				$date[] = date_lang_change($currentDate,5,$lang_resource);
				$date[] = date_lang_change($currentDate,6,$lang_resource);
				
				
				$datev[] = date("Y-m-d",strtotime($currentDate) );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 1day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 2day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 3day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 4day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 5day") );
				$datev[] = date("Y-m-d",strtotime($currentDate."+ 6day") );
								
			} else {
				if(in_array(date("w",strtotime($currentDate)),$datastore)){						
					//$date[] = date("l dS F,Y",strtotime($currentDate) );
					$date[] = date_lang_change($currentDate,0,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate) );
				}
				if(in_array(date("w",strtotime($currentDate."+ 1day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 1day") );
					$date[] = date_lang_change($currentDate,1,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 1day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 2day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 2day") );
					$date[] = date_lang_change($currentDate,2,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 2day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 3day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 3day") );
					$date[] = date_lang_change($currentDate,3,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 3day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 4day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 4day") );
					$date[] = date_lang_change($currentDate,4,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 4day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 5day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 5day") );
					$date[] = date_lang_change($currentDate,5,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 5day") );
				}
				if(in_array(date("w",strtotime($currentDate."+ 6day")),$datastore)){
					//$date[] = date("l dS F,Y",strtotime($currentDate."+ 6day") );
					$date[] = date_lang_change($currentDate,6,$lang_resource);
					$datev[] = date("Y-m-d",strtotime($currentDate."+ 6day") );
				}
				
				
			}
							
			$catlog->id = $row['id'];
			$catlog->business = $row['business'];
			$catlog->name = $row['name'];
			$catlog->workdays = json_encode($date);
			$catlog->workvaluedays = json_encode($datev);
			$catlog->openhour = $schedule->opens->hour;
			$catlog->closehour = $schedule->closes->hour;
			$catlog->openmin= $schedule->opens->minute;
			$catlog->closemin = $schedule->closes->minute;		
			
			array_push($catalogname,$catlog);
		}
	}
	return $catalogname;	
}
	
		
	function date_lang_change($currentDate,$day,$lang_resource)
	{
		$x++;

		$day_lang = date("l",strtotime($currentDate."+ ".$day."day") );
		
		$month_lang = date("m",strtotime($currentDate."+ ".$day."day") );
		$year_lang = date("Y",strtotime($currentDate."+ ".$day."day") );
		$eachDay_lang = date("d",strtotime($currentDate."+ ".$day."day") );
		
        if($day_lang=="Monday")
		$day_lang_print = $lang_resource['DAY1'];
		if($day_lang=="Tuesday")
		$day_lang_print = $lang_resource['DAY2'];
		if($day_lang=="Wednesday")
		$day_lang_print = $lang_resource['DAY3'];
		if($day_lang=="Thursday")
		$day_lang_print = $lang_resource['DAY4'];
		if($day_lang=="Friday")
		$day_lang_print = $lang_resource['DAY5'];
		if($day_lang=="Saturday")
		$day_lang_print = $lang_resource['DAY6'];
		if($day_lang=="Sunday")
		$day_lang_print = $lang_resource['DAY7'];
		if($day_lang=="Every day")
		$day_lang_print = $lang_resource['DAY8'];
		
		
		if($month_lang=="01")
		$month_lang_print = $lang_resource['MONTH1'];
		if($month_lang=="02")
		$month_lang_print = $lang_resource['MONTH2'];
		if($month_lang=="03")
		$month_lang_print = $lang_resource['MONTH3'];
		if($month_lang=="04")
		$month_lang_print = $lang_resource['MONTH4'];
		if($month_lang=="05")
		$month_lang_print = $lang_resource['MONTH5'];
		if($month_lang=="06")
		$month_lang_print = $lang_resource['MONTH6'];
		if($month_lang=="07")
		$month_lang_print = $lang_resource['MONTH7'];
		if($month_lang=="08")
		$month_lang_print = $lang_resource['MONTH8'];
		if($month_lang=="09")
		$month_lang_print = $lang_resource['MONTH9'];
		if($month_lang=="10")
		$month_lang_print = $lang_resource['MONTH10'];
		if($month_lang=="11")
		$month_lang_print = $lang_resource['MONTH11'];
		if($month_lang=="12")
		$month_lang_print = $lang_resource['MONTH12'];
		
		
		$currentdate = $day_lang_print." ".$month_lang_print." ".$eachDay_lang.", ".$year_lang;
		return $currentdate;
		
		//return $day_lang_print." ".$month_lang_print;
	}
	
	
	function FetchBusinessMenuS($businessid,$link)
	{
		echo $businessid;
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	//unset($response);
	$response = new stdClass();
	$dishesids = array();
	$dishes = array();
	$extras = array();


	//get the dishes
	pg_prepare($link,'sql','SELECT * FROM w_menus WHERE business=$1 and enabled=true');
	$result = pg_execute($link,'sql',array($businessid));
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZone($_SESSION['timezone']));
				$schedule = parse($row['schedule']);
				if ($now>=strtotime($schedule->opens->hour.':'.$schedule->opens->minute))//menu opened now check if its not closed
				{
					if($schedule->closes->hour< 24) {
							
						$newScedule = strtotime($schedule->closes->hour.':'.$schedule->closes->minute);
						}
						else
						{
							if($schedule->closes->hour== 24)
							{
							$newScedule = strtotime("00:".$schedule->closes->minute." +1 day");
							}
							else if($schedule->closes->hour == 25) {
							$newScedule = strtotime("01:".$schedule->closes->minute." +1 day");	
							}
							else if($schedule->closes->hour == 26) {
								
							$newScedule = strtotime("02:".$schedule->closes->minute." +1 day");	
							}
							else if($schedule->closes->hour == 27) {
							$newScedule = strtotime("03:".$schedule->closes->minute." +1 day");	
							}
							else if($schedule->closes->hour== 28) {
							$newScedule = strtotime("04:".$schedule->closes->minute." +1 day");	
							}
						}
					if ($now<$newScedule)//ok
						foreach (parse($row['dishes']) as $dishid)
							array_push($dishesids,$dishid);
				}
				}
	
	$dishesids = ArrayUnique($dishesids);
	return $dishesids;
	
	}
	function FetchCurrentDate()	{
	
	$current_date = GetTimeByZone($_SESSION['timezone']);
	$srtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
	$current_date_arr = explode(":",$current_date);
	 $date_curr= new stdClass();
	 $date = date('d',$srtotime);
	$date_curr->date = $date;
    $date_curr->hr = $current_date_arr[0];
	$date_curr->min = $current_date_arr[1];
	return $date_curr;
	}
	/******************************************************Product Option********************************************/
	function GetAllSets($id)
{
    $extras=null;
    $extras_details=array();
    $response=null;
    $set_name=null;
    $link = ConnectDB();
	
	//$id1 = 141;
	//$id2 = 142;
	$query_p = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlp'.$id,$query_p);
    $result_p = pg_execute($link,'sqlp'.$id,array('businesspagpersonsetting'));
    $row_p = pg_fetch_array($result_p);
	$person1 = $row_p["value"];
	
	$query_q = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlq'.$id,$query_q);
    $result_q = pg_execute($link,'sqlq'.$id,array('businesspagqtysetting'));
    $row_q = pg_fetch_array($result_q);
	$qty1 = $row_q["value"];
	
	
    pg_prepare($link,'sql_sets'.$id,'SELECT extras FROM w_dishes WHERE id=$1');
    $result2 = pg_execute($link,'sql_sets'.$id,array($id));
	
	
    while($row2 = pg_fetch_array($result2))
    {
		
		if($row2['extras'] == "") {
				return 0;
			
			}
        //unset($extra_detail);
        $extra_detail = new stdClass();
        $extras=$row2['extras'];
    }
    $extras=parse($extras);
	$q=1;
	
	
	
	
foreach($extras as $extra)
{
    pg_prepare($link,'sql_sets_name'.$extra.$id,'SELECT * FROM w_extras WHERE id=$1');
    $result2 = pg_execute($link,'sql_sets_name'.$extra.$id,array($extra));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($set_name);
        $set_name = new stdClass();
        $set_name->name=$row2['set'];
        $set_name->set_id=$row2['id'];
		$set_name->qty_count=$row2['qty']; 	
		$set_name->person_count=$row2['person'];
		$set_name->position=$q;
		
		$set_name->person = $person1;
		$set_name->qty = $qty1;
		
        array_push($extras_details,$set_name);
    }
	$q++;
}
$response = new stdClass();
    $response->extras_details = $extras_details;
    return $response;
 /*   $response->extras_details = $extras_details;
    return $response;*/


	}
function GetOptions($data)
{

    $id=$data[0]->id;
    $set_id=$data[0]->set_id;
    $setposition = $data[0]->setposition;
	
	
	
    $extra_detail=null;
    $extras_details=array();
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_options'.$id,'SELECT * FROM w_extras_options WHERE option_id=$1 AND set_id=$2');
    $result2 = pg_execute($link,'sql_options'.$id,array($id,$set_id));
	
	 pg_prepare($link,'sql_options_yes','SELECT option_id,with_respect_to FROM w_extras_options WHERE set_id=$1 AND conditional=$2 ');
    $results3 = pg_execute($link,'sql_options_yes',array($set_id,"yes"));
	
	while($fetch2 = pg_fetch_array($results3))
	{
		//echo $fetch2['with_respect_to'];
		if($fetch2['with_respect_to'] != "null" && $fetch2['with_respect_to'] != "" ) {
			//echo $fetch2['with_respect_to'];
			$fetch_op = explode(",",$fetch2['with_respect_to']);
			
			$optionselect = $fetch_op[1];
			$show_option[$optionselect]= $fetch2['option_id'];		
			}
	}
/*	print_r($show_option);
	exit();*/
	$c=0;
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra_detail);
        $extra_detail = new stdClass();
		$showoptions = $row2['choice_id'];
        $extra_detail->id =$row2['id'];
		 $extra_detail->set_id =$row2['set_id'];
        $extra_detail->option_id =$row2['option_id'];
        $extra_detail->option_name = businessoptionnameforcheckout($row2['option_id'],$row2['id'],$c);
        $extra_detail->choice_name = businesschoicenameforcheckout($row2['option_id'],$row2['id'],$c);
        $extra_detail->choice_id = $row2['choice_id'];
        $extra_detail->with_respect_to = $row2['with_respect_to'];
        $extra_detail->conditional = $row2['conditional'];
        $extra_detail->copy = $row2['copy'];
        $extra_detail->price = $row2['price'];
        $extra_detail->rank = $row2['rank'];
		if($row2['rank'] != "null") {
		$extra_detail->setposition = $setposition*100+$row2['rank'];
		} else {
		$extra_detail->setposition = $setposition*100+1;	
			}
		$extra_detail->text_to_end_user = businesstextuserforcheckout($row2['option_id'],$row2['id']);
        $extra_detail->min_sel = $row2['min_sel'];
        $extra_detail->max_sel = $row2['max_sel'];
        $extra_detail->ingredients = $row2['ingredients'];
        $extra_detail->set_id= $row2['set_id'];
	    $extra_detail->showoption= $show_option[$showoptions];	
		$c++;
        array_push($extras_details,$extra_detail);
    }

    $response->extras_details = $extras_details;
    return $response;
}
function GetPrices($ids){

    $choice_id=$ids[0]->choice_id;
    $set_id=$ids[0]->set_id;
    $option_id=$ids[0]->option_id;
    $extra_choice_price=null;
    $extra_choice_prices=array();
    $extra_option_price=null;
    $extra_option_prices=array();

    $with_respect_to=$option_id.','.$choice_id;
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_choice_prices','SELECT choice_id,choice_name,price FROM w_extras_options WHERE set_id=$1 AND with_respect_to=$2');
    $result2 = pg_execute($link,'sql_choice_prices',array($set_id,$with_respect_to));
    while($row2 = pg_fetch_array($result2))
    {  //unset($extra_choice_price);
    	$extra_choice_price = new stdClass();

       $extra_choice_price->price=$row2['price'];
       $extra_choice_price->choice_name=$row2['choice_name'];
        $extra_choice_price->choice_id=$row2['choice_id'];
      array_push($extra_choice_prices,$extra_choice_price);
    }

    pg_prepare($link,'sql_options_price','SELECT price,choice_id FROM w_extras_options WHERE choice_id=$1');
    $result2 = pg_execute($link,'sql_options_price',array($choice_id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra_option_price);
        $extra_option_price = new stdClass();
        $extra_option_price->price=$row2['price'];
        $extra_option_price->choice_id=$row2['choice_id'];
        array_push($extra_option_prices,$extra_option_price);
    }
    $response->choice_prices = $extra_choice_prices;
    $response->option_prices = $extra_option_prices;
    return $response;
}
function GetTotalPrices($data)
{
	
    $link = ConnectDB();
    $price=0;
	$prices=0;
    $set_id=null;
    $choice_array=array();
	$choice_id_array_check=array();
	
    $option_id=0;
    $choice_id_array=array();
    $user_choice_array=array();
    $ingredients=array();
	$user_choice_allid = array();
	if($data->comments)
	$commentCart = $data->comments;


  $data_temp=get_object_vars($data->fields);


	
  $with_respect_to=array();
   $i=0;
    $j=0;
    $ingredient=array();
	if($data_temp !="") {
      foreach($data_temp as $key=>$value)
      {
        if((strpos($value->value,'Left')!==false) || (strpos($value->value,'Right')!==false) || (strpos($value->value,'Whole')!==false) )
          {
            $ingredient[]=$value->value;
          }
          if(strpos($key,'drop')!=false)
          {
			  
              $with_respect_to[$i]=substr($key,strpos($key,'drop-')+5,strlen($key)-1).','.$value->value;
              $choice_id_array[$i]=$value->value; /*substr($key,strpos($key,'drop-')+5,strlen($key)-1);*/
			  $choice_id_array_check[$i]=$value->save; 
			  $choice_id_array_ivalue[$i]=$value->ivalue;
			 
              $i++;
          }
          else{

              if($value->value=="true"){
                   //$user_choice_array[$j]=$key;
				  
				   $skey = explode("-@",$key);
				   $user_choice_array[$j]=$skey[0] ;
                   $choice_array[$j]=$key;
              }
			  $j++;
          }
		  if($value->value == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->value == "false") {
		  //array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->save == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
		 /* else if($value->value == $value->ivalue) {
		  array_push($user_choice_allid,$value->id);  
		  }*/
		  
      }
	}
   /* print_r($with_respect_to);
    print_r($choice_array);
   // print_r($choice_id_array);
	print_r($user_choice_allid);
   
    print_r($user_choice_array);*/
	/*print_r($user_choice_allid);
	exit();*/
	//print_r($chid);
	//print_r($choice_id_array_ivalue);
    $cky =0;
    foreach ($choice_id_array as $chid) {
       if($choice_id_array_check[$cky] == "true")  {
		 
		  
    pg_prepare($link,'sql_extra_options_prices'.$chid,'SELECT choice_name,choice_id,set_id,option_id,price FROM w_extras_options WHERE choice_id=$1');
    $result2 = pg_execute($link,'sql_extra_options_prices'.$chid,array($chid));
    $i=0;
    while($row2 = pg_fetch_array($result2))
    {
        $price +=$row2['price'];
		
		
          array_push($user_choice_array,$row2['choice_name']);
		
		  
		   //$user_choice_allid[$id] =$value->id;
        $set_id=$row2['set_id'];
		
       // $choice_id_array[$i++]=$row2['choice_id'];
	   }
    }
	$cky++;
   }

    foreach ($with_respect_to as $wrt) {
        pg_prepare($link,'sql_extra_choices_prices'.$wrt,'SELECT choice_name,choice_id,price FROM w_extras_options WHERE with_respect_to=$1');
    $result2 = pg_execute($link,'sql_extra_choices_prices'.$wrt,array($wrt));
   if(!empty($result2)){
    $data1=get_object_vars($data->fields);
       $i=0;
   while($row2 = pg_fetch_array($result2))
    {
     $choice_name=$row2['choice_name'];

      if(in_array($choice_name,$choice_array))
        {
      $price+=$row2['price'];
            $key=$key = array_search($choice_name, $choice_array);

           // unset($choice_array[$key]);
            $choice_array[$key] = new stdClass();

        }
    }
   }
  }
    $count=0;
    foreach ($user_choice_allid as $allids) {
	//	echo $user_choice_allid[$allids];
        $count++;
        pg_prepare($link,'sql_extra_choices_prices'.$count,'SELECT choice_name,choice_id,price FROM w_extras_options WHERE choice_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices_prices'.$count,array($allids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {
                    $prices+=$row2['price'];

            }
        }
    }

    $ingredients_choices=array();
    foreach($ingredient as $ing){
        $temp=array();
        $temp=explode('_',$ing);

        $op_ids=$temp[1];

        pg_prepare($link,'sql_extra_choices'.$op_ids,'SELECT choice_name FROM w_extras_options WHERE option_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices'.$op_ids,array($op_ids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {

                $ingredients_choices[$row2['choice_name']]='('.$temp[0].')';
            }
        }
    }

    foreach($ingredients_choices as $key=>$value){
    if(in_array($key,$user_choice_array))
    {
      $pos=array_search($key,$user_choice_array);
       $user_choice_array[$pos]= $user_choice_array[$pos].$value;
     }
    }

    $response->price = $prices;
    $response->choice_array=$user_choice_array;
    $response->choice_allid=implode(",",$user_choice_allid);
    $response->choice_ids=$choice_id_array;
    $response->set_id=$set_id;
	if(isset($commentCart))
	 $response->comments=$commentCart;
    return $response;
}


function GetTotalPricesEdit($data)
{
	
    $link = ConnectDB();
    $price=0;
	$prices=0;
    $set_id=null;
    $choice_array=array();
	$choice_id_array_check=array();
	
    $option_id=0;
    $choice_id_array=array();
    $user_choice_array=array();
    $ingredients=array();
	$user_choice_allid = array();
	if($data->comments)
	$commentCart = $data->comments;


  $data_temp=get_object_vars($data->fields);


	
  $with_respect_to=array();
   $i=0;
    $j=0;
    $ingredient=array();
	if($data_temp!="") {
      foreach($data_temp as $key=>$value)
      {
        if((strpos($value->value,'Left')!==false) || (strpos($value->value,'Right')!==false) || (strpos($value->value,'Whole')!==false) )
          {
            $ingredient[]=$value->value;
          }
          if(strpos($key,'drop')!=false)
          {
			  
              $with_respect_to[$i]=substr($key,strpos($key,'drop-')+5,strlen($key)-1).','.$value->value;
              $choice_id_array[$i]=$value->value; /*substr($key,strpos($key,'drop-')+5,strlen($key)-1);*/
			  $choice_id_array_check[$i]=$value->save; 
			  $choice_id_array_ivalue[$i]=$value->ivalue;
			 
              $i++;
          }
          else{

              if($value->value=="true"){
				  
				  	$skey = explode("-@",$key);
				    $user_choice_array[$j]=$skey[0] ;
                  // $user_choice_array[$j]=$key;
                   $choice_array[$j]=$key;
              }
			  $j++;
          }
		 
		 
		 if($value->value == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->value == "false") {
		  //array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->save == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
      }
	}
   
    $cky =0;
    foreach ($choice_id_array as $chid) {
       if($choice_id_array_check[$cky] == "true")  {
		 
		  
    pg_prepare($link,'sql_extra_options_prices'.$chid,'SELECT choice_name,choice_id,set_id,option_id,price FROM w_extras_options WHERE choice_id=$1');
    $result2 = pg_execute($link,'sql_extra_options_prices'.$chid,array($chid));
    $i=0;
    while($row2 = pg_fetch_array($result2))
    {
        $price +=$row2['price'];
          array_push($user_choice_array,$row2['choice_name']);
		
		  
		   //$user_choice_allid[$id] =$value->id;
        $set_id=$row2['set_id'];
		
       // $choice_id_array[$i++]=$row2['choice_id'];
	   }
    }
	$cky++;
   }

    foreach ($with_respect_to as $wrt) {
        pg_prepare($link,'sql_extra_choices_prices'.$wrt,'SELECT choice_name,choice_id,price FROM w_extras_options WHERE with_respect_to=$1');
    $result2 = pg_execute($link,'sql_extra_choices_prices'.$wrt,array($wrt));
   if(!empty($result2)){
    $data1=get_object_vars($data->fields);
       $i=0;
   while($row2 = pg_fetch_array($result2))
    {
     $choice_name=$row2['choice_name'];

      if(in_array($choice_name,$choice_array))
        {
      $price+=$row2['price'];
            $key=$key = array_search($choice_name, $choice_array);

           // unset($choice_array[$key]);
            $choice_array[$key] = new stdClass();

        }
    }
   }
  }
    $count=0;
    foreach ($user_choice_allid as $allids) {
	//	echo $user_choice_allid[$allids];
        $count++;
        pg_prepare($link,'sql_extra_choices_prices'.$count,'SELECT choice_name,choice_id,price FROM w_extras_options WHERE choice_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices_prices'.$count,array($allids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {
                    $prices+=$row2['price'];

            }
        }
    }

    $ingredients_choices=array();
    foreach($ingredient as $ing){
        $temp=array();
        $temp=explode('_',$ing);

        $op_ids=$temp[1];

        pg_prepare($link,'sql_extra_choices'.$op_ids,'SELECT choice_name FROM w_extras_options WHERE option_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices'.$op_ids,array($op_ids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {

                $ingredients_choices[$row2['choice_name']]='('.$temp[0].')';
            }
        }
    }

    foreach($ingredients_choices as $key=>$value){
    if(in_array($key,$user_choice_array))
    {
      $pos=array_search($key,$user_choice_array);
       $user_choice_array[$pos]= $user_choice_array[$pos].$value;
     }
    }

    $response->price = $prices;
    $response->choice_array=$user_choice_array;
    $response->choice_allid=implode(",",$user_choice_allid);
    $response->choice_ids=$choice_id_array;
    $response->set_id=$set_id;
	if(isset($commentCart))
	 $response->comments=$commentCart;
    return $response;
}

function GetSet($id){

    $link = ConnectDB();
    pg_prepare($link,'sql3','SELECT set_id from w_user_extras WHERE user_id=$1');
    $result = pg_execute($link,'sql3',array($id));
    $i=0;
    $set_id=array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result)){
            $set_id[$i++]=$row['set_id'];
        }

    $set_name=array();
    $i=0;
    foreach ($set_id as $s_id) {

        pg_prepare($link,'sql1'.$s_id,'SELECT set from w_extras WHERE id=$1');
        $result = pg_execute($link,'sql1'.$s_id,array($s_id));
        if (pg_num_rows($result)>0){

            while($row = pg_fetch_array($result)){

                $set_name[$i++]=$row['set'];
            }
        }

    }
    pg_close($link);
    $response=null;
    $response->set_name=$set_name;
    return $response;
}


function GetOptionCount($set_id,$position="")
{
	
    $link = ConnectDB();

    /*option_name,choice_name,with_respect_to,conditional,copy,price,rank,option_text_to_end_user,max_sel,min_sel,ingredients,*//*AND copy <>$2*/
    pg_prepare($link,'sql_extra_options'.$set_id,'SELECT option_id,COUNT(option_id),rank FROM w_extras_options WHERE set_id=$1 AND conditional=$2   GROUP BY option_id,rank ORDER BY rank ASC');
    $result2 = pg_execute($link,'sql_extra_options'.$set_id,array($set_id,"no"));
	 pg_prepare($link,'sql_conditional'.$set_id,'SELECT conditional FROM w_extras_options WHERE option_id=$1  ');
  
    $option_counts=array();
    $response=null;
    $option_count=null;
    $extra=null;
    $extras=array();
    while($row2 = pg_fetch_array($result2))
    {
        //unset($option_count);
        $option_count = new stdClass();
		
		 //$results22 = pg_execute($link,'sql_conditional'.$set_id,array($row2['option_id']));
	     //$catch = pg_fetch_array($results22);
		 
		 
        $option_count->option_id = $row2['option_id'];
        $option_count->rank = $row2['rank'];
		$option_count->setposition = $position;
		
		$option_count->conditional = "no";
        $option_count->count = $row2['count'];
        array_push($option_counts,$option_count);
    }

    pg_prepare($link,'sql_extra'.$set_id,'SELECT id,set,text_to_end_user FROM w_extras WHERE id=$1 and enabled=true');
    $result2 = pg_execute($link,'sql_extra'.$set_id,array($set_id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra);
         $extra = new stdClass();
        $extra->name = $row2['set'];
        $extra->text_to_end_user = $row2['text_to_end_user'];
        $extra->id = $row2['id'];
        array_push($extras,$extra);
    }

    $response->extras = $extras;
    $response->option_counts = $option_counts;
    return $response;
}

function FetchLandingPageSettings($link)
{
	$link = ConnectDB();
	$id=1;
    pg_prepare($link,'sqlLanding','SELECT home_page_of_system FROM w_landing_page_settings WHERE id=$1');
    $result34 = pg_execute($link,'sqlLanding',array($id));
    $row = pg_fetch_array($result34);
	return $row['home_page_of_system'];
}

function GetGroupAndChoices($id)
{
    $extra=null;
    $extras=array();
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_extra'.$id,'SELECT set,text_to_end_user FROM w_extras WHERE id=$1 and enabled=true');
    $result2 = pg_execute($link,'sql_extra'.$id,array($id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra);
         $extra = new stdClass();
        $extra->id = $id;
        $extra->name = $row2['set'];
        $extra->price = $row2['price'];
        array_push($extras,$extra);
    }


    $extra_detail=null;
    $extras_details=array();

    $response=null;
    pg_prepare($link,'sql_extra_details'.$id,'SELECT * FROM w_extras_options WHERE set_id=$1 ORDER BY rank ASC');
    $result2 = pg_execute($link,'sql_extra_details'.$id,array($id));
	$c=0;
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra_detail);
         $extra_detail = new stdClass();
        $extra_detail->id =$row2['id'];
        $extra_detail->option_id =$row2['option_id'];
        $extra_detail->option_name = businessoptionnameforcheckout($row2['option_id'],$row2['id'],$c);
        $extra_detail->choice_name = businesschoicenameforcheckout($row2['option_id'],$row2['id'],$c);
        $extra_detail->choice_id = $row2['choice_id'];
        $extra_detail->with_respect_to = $row2['with_respect_to'];
        $extra_detail->conditional = $row2['conditional'];
        $extra_detail->copy = $row2['copy'];
        $extra_detail->price = $row2['price'];
        $extra_detail->rank = $row2['rank'];
        $extra_detail->text_to_end_user = $row2['rank'];
        $extra_detail->min_sel = $row2['min_sel'];
        $extra_detail->max_sel = $row2['max_sel'];
        $extra_detail->ingredients = $row2['ingredients'];
		$c++;
       array_push( $extras_details,$extra_detail);
    }


/*print_r(parse($extras_details)->review);*/
    $choices=null;
    $extras_choices=array();
    $response=null;
    pg_prepare($link,'sql_extra_choices'.$id,'SELECT w_choices.option_id,w_choices.price,w_choices.name FROM w_choices JOIN w_extras_details ON  w_choices.set_id=$1 and w_choices.option_id IN (w_extras_details.id) ORDER BY w_extras_details.rank ASC');
    $result2 = pg_execute($link,'sql_extra_choices'.$id,array($id));
    while($row2 = pg_fetch_array($result2))
    {
       //unset($choices);
          $choices = new stdClass();
       $choices->option_id = $row2['option_id'];
        $choices->name = $row2['name'];
        $choices->price = $row2['price'];
        /*print_r($choices)*/
       array_push($extras_choices,$choices);
    }



$response->extras = $extras;
$response->extras_details = $extras_details;
$response->extras_choices = $extras_choices;
    return $response;
}
	/******************************************************Product Option********************************************/
	
	



function timescdule($businessid,$link) {
	//unset($timescdule);
	  $timescdule = new stdClass();
	
	pg_prepare($link,'sqlb','SELECT * FROM w_business where id=$1');
	$result = pg_execute($link,'sqlb',array($businessid));
	$row = pg_fetch_array($result);
	
	$timescdule->schedule = $row['schedule'];
	
	//$now = strtotime(GetTimeByZone($_SESSION['timezone']));
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	$schedule = parse($timescdule->schedule);
	$opentime = $schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute;
	$closetime = $schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute;
	
	


	//$begin =  GetTimeByZone($_SESSION['timezone']); 
	$time = strtotime($opentime);
	$startTime = date("H:i", strtotime('+45 minutes', $time));
	
	$hour = date('H', strtotime($startTime));
	
    $minutes = date('i', strtotime($startTime));
	
	if($minutes == 0){$startTime = $startTime;}
	if($minutes < 15 && $minutes >0){$minutes = 15; $startTime = $hour .':'. $minutes;}
	if($minutes < 30 && $minutes >15){$minutes = 30; $startTime = $hour .':'. $minutes;}
	if($minutes < 45 && $minutes >30){$minutes = 45; $startTime = $hour .':'. $minutes;}
	if($minutes > 45){$minutes = 00; $hour = $hour + 1; $startTime = $hour .':'. $minutes;}
	
	//echo $startTime; echo '<br>';
	
	$startTime = strtotime($startTime);
	
  $endtime = strtotime($closetime);
    $now = time();
    $output = "";
	$timeschedules = array();
    for($i=$startTime; $i<$endtime; $i+=900) {
    //  unset($time);
       $time = new stdClass();
	    $output = date("H:i",$i)."-".date("H:i",$i+900);
		$time->id = $output;
		$time->name = $output;
		array_push($timeschedules,$time);

    }   

	return $timeschedules;
	}
	
	
	function FetchTimeOnlyDeliveryndpickup($businessid,$link)
	{
    $week = 0;	
	$srtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
	$currentDate = date('Y-m-d',$srtotime);
	 $currentHour = date('H A',$srtotime);
	 $timeinMM = date('m',($srtotime));
	 $currentHourUnit = date('h',$srtotime);
	 
	 	       if($timeinMM>=0 && $timeinMM<=15) {
				$mmtime = 15;
			   }
				else if($timeinMM>15 && $timeinMM<=30)
				{
				$mmtime = 30;
				}
				else if($timeinMM>30 && $timeinMM<=45) {
				$mmtime = 45;
				}
				else
				{
				$mmtime = 00;
				$currentHour = date('H A',$srtotime*3600);
			    $currentHourUnit = date('h',$srtotime*3600);
				}
	

	
	$catalogname = array();
	
	pg_prepare($link,'sqlb2','SELECT * FROM w_business where id=$1');
	$result = pg_execute($link,'sqlb2',array($businessid));
	$row = pg_fetch_array($result);
	
	$timescdule = $row['schedule'];
	
	//$now = strtotime(GetTimeByZone($_SESSION['timezone']));
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",$srtotime)};
	$schedule = parse($timescdule);
	$opentime = $schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute;
	$closetime = $schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute;
			
			
			/*$date[] = date("l dS F,Y",strtotime($currentDate) );
			$date[] = date("l dS F,Y",strtotime($currentDate."+ 1day") );
			$date[] = date("l dS F,Y",strtotime($currentDate."+ 2day") );
			$date[] = date("l dS F,Y",strtotime($currentDate."+ 3day") );
			$date[] = date("l dS F,Y",strtotime($currentDate."+ 4day") );
			$date[] = date("l dS F,Y",strtotime($currentDate."+ 5day") );
			$date[] = date("l dS F,Y",strtotime($currentDate."+ 6day") );*/
			
			
			$date[] = date_lang_change($currentDate,0,$lang_resource);
			$date[] = date_lang_change($currentDate,1,$lang_resource);
			$date[] = date_lang_change($currentDate,2,$lang_resource);
			$date[] = date_lang_change($currentDate,3,$lang_resource);
			$date[] = date_lang_change($currentDate,4,$lang_resource);
			$date[] = date_lang_change($currentDate,5,$lang_resource);
			$date[] = date_lang_change($currentDate,6,$lang_resource);
			
			
			$datev[] = date("Y-m-d",strtotime($currentDate) );
			$datev[] = date("Y-m-d",strtotime($currentDate."+ 1day") );
			$datev[] = date("Y-m-d",strtotime($currentDate."+ 2day") );
			$datev[] = date("Y-m-d",strtotime($currentDate."+ 3day") );
			$datev[] = date("Y-m-d",strtotime($currentDate."+ 4day") );
			$datev[] = date("Y-m-d",strtotime($currentDate."+ 5day") );
			$datev[] = date("Y-m-d",strtotime($currentDate."+ 6day") );
			
			
			//unset($catlog);
			$catlog = new stdClass();
			$opentime = explode(":",$opentime);
			$closetime = explode(":",$closetime);
			$catlog->workdays = json_encode($date);
		    $catlog->workvaluedays = json_encode($datev);	
			$catlog->currenthour = $currentHour;	
			$catlog->closetimehour = $closetime[0];	
			
			for($i=$currentHourUnit;$i<(29-$currentHourUnit);$i++) {
				if($i<=$closetime[0]) {
						$totaltimehour[] = $i;
						$p = $i-$currentHourUnit;
						$totaltimehourShow[] = date('H A',($srtotime+$p*60*60));
							
				}
				$catlog->timelist = json_encode($totaltimehour);
				$catlog->mmtime = $mmtime;
			
				
			
				
				$catlog->currentHour = $currentHour;
				$catlog->timelistshow = json_encode($totaltimehourShow);
				
			}
			
			
			array_push($catalogname,$catlog);
			
	return $catalogname;	
	}
	function deliveryTimeCheck($businessid,$sdate,$link) {
		
		
		
		$crrstrtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
		$crrstrtoDate = date('Y-m-d',$crrstrtotime);
		$crrstrtoDateonly = date('d',$crrstrtotime);
		$pdate = explode("-",$sdate);
		// $currentHour = date('H A',$srtotime);
		 $timeinMM = date('m',($crrstrtotime));
		 $currentHourUnit = date('H',$crrstrtotime);
		
		$deltimearray = array();
		
	pg_prepare($link,'sqlbs2','SELECT * FROM w_business where id=$1');
	$result = pg_execute($link,'sqlbs2',array($businessid));
	$row = pg_fetch_array($result);
	
	$timescdule = $row['schedule'];
	
	
	$srtotime = strtotime($sdate);
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
    $todayid = $days->{date("D",$srtotime)};

		 $schedule = parse($timescdule);
		 $opentimeHH = $schedule->sdays->{$todayid}->opens->hour;
		 $opentimeMM = $schedule->sdays->{$todayid}->opens->minute;
		 $closetimeHH = $schedule->sdays->{$todayid}->closes->hour;
		 $closetimeMM = $schedule->sdays->{$todayid}->closes->minute;
		/*unset($totaltimehour);
		unset($totaltimehourShow);*/
		$totaltimehour = new stdClass();
		$totaltimehourShow = new stdClass();
		 if($crrstrtoDateonly == $pdate[2]) {
			 for($j=$currentHourUnit;$j<29;$j++) {
				if($j<=$closetimeHH) {
						$totaltimehour[] = $j;
						$p = $j-$currentHourUnit;
						$totaltimehourShow[] = date('H A',($crrstrtotime+$p*60*60));
							
				}
			 }
			 
			 } else { 
			 
		 for($i=$opentimeHH;$i< 29;$i++) {
				if($i<=$closetimeHH) {
						$totaltimehour[] = $i;
						$totaltimehourShow[] = date('H A',($srtotime+$i*60*60));
							
				}
				}
			 }
		      // unset($deltime);
		       $deltime = new stdClass();
				$deltime->timelistvalue =  json_encode($totaltimehour);
				$deltime->timelistHHText = json_encode($totaltimehourShow);
				array_push($deltimearray,$deltime);	
				return $deltimearray;
		}
/****************************************************************************Reservation*******************************************************************************/
function FetchReserve($id,$link,$whereall){
	
	
	
	$reservequery = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
	pg_prepare($link,'sqlr2',$reservequery);
	$reserverecord = pg_execute($link,'sqlr2',array($id,'TRUE'));
	
	if($whereall->rdate!= "") {
		
		$rdateAll = explode("/",$whereall->rdate);
		
		
		 $rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		}

	$usertime = strtotime($rdate_merge .' '. $whereall->rhour.':'.$whereall->rmin);
	$ustime = strtotime($whereall->rhour.':'.$whereall->rmin); 
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",$usertime)};
	
		/* Fetch Price */
	$reservePricequery = 'SELECT * from w_reserve_chart WHERE  rtype=$1 and business=$2';
	pg_prepare($link,'sqlr3',$reservePricequery);
	
	$reserves = array();
	$roomguest = 0;
	$tableguest = 0;
	$freeguest = 0;
	
	  //pg_num_rows($reserverecord);
	
	while($row = pg_fetch_array($reserverecord)){
		$dayres = parse($row['days']);
		$scheduleres = json_decode($row['schedule'],false);
		$sch1=(array)$scheduleres->{'opens'};
		$sch2=(array)$scheduleres->{'closes'};
	
		//echo strtotime($sch1["hour"].':'.$sch1["minute"]);
		if (in_array($todayid, $dayres) || in_array('0', $dayres)){
			
		if ($ustime>=getstrtotime('',$sch1["hour"],$sch1["minute"]) || $ustime>=getstrtotime('',$sch1["hour1"],$sch1["minute1"])){
				
		if ($ustime < getstrtotime('',$sch2["hour"],$sch2["minute"]) || $ustime < getstrtotime('',$sch2["hour1"],$sch2["minute1"])){

			
					//unset($reserve);
					 $reserve = new stdClass();
					$reserve->id = $row['id'];
					$reserve->schedule = $row['schedule'];
					$reserve->rtype = $row['rtype'];
							
					$reservepricerecord = pg_execute($link,'sqlr3',array($row['rtype'],$id));	
					$row1 = pg_fetch_array($reservepricerecord);
							
					$reserve->price = $row1['price'];
					$reserve->guest = $row['guest'];
					$reserve->duration = $row['duration'];
					$reserve->name = businessreservationbylang($row['id']);
					
					
					
					array_push($reserves,$reserve);
				
			 }//end in_array if loop
			
				}// end close time check if loop
				
			}//end open time check if loop
			
		}// end while loop

//return $reserves;


/* Guest Filter in Reservation */
	$filterguest = $whereall->guest;
	
	if($filterguest !=""){	
		foreach($reserves as $business){
			if($business->rtype == 1){
				$tableguest += $business->guest;
			}
			if($business->rtype == 2){
				$roomguest += $business->guest;
			}
			if($business->rtype == 3){
				$freeguest += $business->guest;
			}
		}
		$bguest =0;	
		$guestbtquery = 'select booked from w_reserve_book where business = $1 and rtype =1';
		pg_prepare($link,'sqlbtguest',$guestbtquery);
		$guestbrecord = pg_execute($link,'sqlbtguest',array($id));
		$rowbguest = pg_fetch_array($guestbrecord);
			$bguest = sizeof(parse($rowbguest['booked']));	
		$tableguest = $tableguest - $bguest;
	
		$bguest =0;
		$guestbrquery = 'select booked from w_reserve_book where business = $1 and rtype =2';
		pg_prepare($link,'sqlbrguest',$guestbrquery);
		$guestbrecord = pg_execute($link,'sqlbrguest',array($id));
		$rowbguest = pg_fetch_array($guestbrecord);
			$bguest = sizeof(parse($rowbguest['booked']));	
		$roomguest = $roomguest - $bguest;
	
		$bguest =0;
		$guestbfquery = 'select booked from w_reserve_book where business = $1 and rtype =3';
		pg_prepare($link,'sqlbfguest',$guestbfquery);
		$guestbrecord = pg_execute($link,'sqlbfguest',array($id));
		$rowbguest = pg_fetch_array($guestbrecord);
			$bguest = sizeof(parse($rowbguest['booked']));	
		$freeguest = $freeguest - $bguest;
		
		$tableflag = 0;
		if($filterguest <=  $tableguest){
				$tableflag = 1;	
		}
		$roomflag = 0;
		if($filterguest <=  $roomguest){
				$roomflag = 1;	
		}
		$freeflag = 0;
		if($filterguest <=  $freeguest){
				$freeflag = 1;	
		}
		
		$reservesFilter = array();
		
		foreach($reserves as $business){
			if($business->rtype == 1 && $tableflag == 1){
				
				array_push($reservesFilter,$business);
			}
			
			if($business->rtype == 2 && $roomflag == 1){
				
				array_push($reservesFilter,$business);
			}
			if($business->rtype == 3 && $freeflag == 1){
				
				array_push($reservesFilter,$business);
			}
					
		}
		$reserves  = array();					
		foreach($reservesFilter as $business){
				array_push($reserves,$business);
		}
	}
	
	return $reserves;
}

function FetchReserveBooked($businessid,$whereall,$link){
	
	
	$reservesbooked = array();
	
	//unset($reservebook);
	 $reservebook = new stdClass();
	
	$reservebook->free = FetchFreeBooked($businessid,$whereall,$link);
	$reservebook->table = FetchTableBooked($businessid,$whereall,$link);
	$reservebook->room =FetchRoomBooked($businessid,$whereall,$link);
			
	array_push($reservesbooked,$reservebook);
	
	return $reservesbooked;
}

function FetchFreeBooked($businessid,$whereall,$link){
	
	if($whereall->rdate!= "") {
		$rdateAll = explode("/",$whereall->rdate);
		$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		$reservefreequery = 'SELECT * from w_reserve_book WHERE  rtype=$1 and business =$2 and date =$3';	
		pg_prepare($link,'sqlfr',$reservefreequery);
		$reservefreerecord = pg_execute($link,'sqlfr',array(3,$businessid,$rdate_merge));
	
		if(pg_num_rows($reservefreerecord) != 0){
			
			$reservefree = array();
			$cntfre = 1;
			while($rowf= pg_fetch_array($reservefreerecord)){
				
				pg_prepare($link,'sqlchk'.$cntfre,'SELECT * from w_reserve WHERE id=$1');
				$chktime = pg_execute($link,'sqlchk'.$cntfre,array($rowf['rid']));
				
				$cntfre++;
				
				$rowchktime = pg_fetch_array($chktime);

				$duration = json_decode($rowchktime['duration'],false);
				
				$sch1=(array)$duration->{'durationopen'};
	
				$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
				
				$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time

				$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
				
				$diftime = round(abs($to_time - $from_time)/60); //difference between two time
				
				if($chktime > $diftime){
					array_push($reservefree,$rowf['booked']);	
				}
				
			}
			return $reservefree;
		}	
	
	}
}

function FetchTableBooked($businessid,$whereall,$link){
	
	if($whereall->rdate!= "") {
		$rdateAll = explode("/",$whereall->rdate);
		$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		$reservetablequery = 'SELECT * from w_reserve_book WHERE  rtype=$1 and business =$2 and date =$3';	
		pg_prepare($link,'sqlt',$reservetablequery);
		$reservetablerecord = pg_execute($link,'sqlt',array(1,$businessid,$rdate_merge));
	
		if(pg_num_rows($reservetablerecord) != 0){
			
			$reservetable = array();
			$cntfre = 1;
			while($rowf= pg_fetch_array($reservetablerecord)){
				
				pg_prepare($link,'sqlchkt'.$cntfre,'SELECT * from w_reserve WHERE id=$1');
				$chktime = pg_execute($link,'sqlchkt'.$cntfre,array($rowf['rid']));
				
				$cntfre++;
				
				$rowchktime = pg_fetch_array($chktime);

				$duration = json_decode($rowchktime['duration'],false);
				
				$sch1=(array)$duration->{'durationopen'};
	
				$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
				
				$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time

				$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
				
				$diftime = round(abs($to_time - $from_time)/60); //difference between two time
				
				if($chktime > $diftime){
					array_push($reservetable,$rowf['booked']);	
				}
				
			}
			return $reservetable;
		}	
	
	}
}

function FetchRoomBooked($businessid,$whereall,$link){
	
	if($whereall->rdate!= "") {
		$rdateAll = explode("/",$whereall->rdate);
		$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		$reserveroomquery = 'SELECT * from w_reserve_book WHERE  rtype=$1 and business =$2 and date =$3';	
		pg_prepare($link,'sqlr',$reserveroomquery);
		$reserveroomrecord = pg_execute($link,'sqlr',array(2,$businessid,$rdate_merge));
	
		if(pg_num_rows($reserveroomrecord) != 0){
			
			$reserveroom = array();
			$cntfre = 1;
			while($rowf= pg_fetch_array($reserveroomrecord)){
				
				pg_prepare($link,'sqlchkr'.$cntfre,'SELECT * from w_reserve WHERE id=$1');
				$chktime = pg_execute($link,'sqlchkr'.$cntfre,array($rowf['rid']));
				
				$cntfre++;
				
				$rowchktime = pg_fetch_array($chktime);

				$duration = json_decode($rowchktime['duration'],false);
				
				$sch1=(array)$duration->{'durationopen'};
	
				$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
				
				$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time

				$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
				
				$diftime = round(abs($to_time - $from_time)/60); //difference between two time
				
				if($chktime > $diftime){
					array_push($reserveroom,$rowf['booked']);	
				}
				
			}
			return $reserveroom;
		}	
	
	}
}

function checkpreorder($menuid,$link) {
	          
			  $bquery ="SELECT * FROM w_menus WHERE id=$1"; 
                pg_prepare($link,'sqlu1',$bquery);
                $results = pg_execute($link,'sqlu1',array($menuid));
				$fetchres = pg_fetch_array($results);
				//$status = new stdObject();
				if($fetchres['pickup'] == "f") {
					$pickupupstatus = "false";
					}	
				else if($fetchres['pickup'] == "t") {
					$pickupupstatus = "true";
					}	
				else {
					$pickupupstatus = "false";
					}		
					
				 if($fetchres['delivery'] == "f") {
					$deliveryupstatus = "false";
					}	
				else if($fetchres['delivery'] == "t") {
					$deliveryupstatus = "true";
					}	
				else {
					$deliveryupstatus = "false";
					}	
						
				$status->pickup = $pickupupstatus;
				$status->delivery = $deliveryupstatus;
				
				return $status;
				
	
	
	}
	function checkDelivery($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1"; 
                pg_prepare($link,'sqlb1',$bquery);
                $results = pg_execute($link,'sqlb1',array($bid));
				//$fetchres = pg_fetch_array($results);
				$status = new stdClass();
				$status->delivery = "false";
				$status->pickup = "false";
				while($rs = pg_fetch_array($results)) {
					if($rs['delivery'] == "t") {
					$status->delivery = "true";
					}
					if($rs['pickup'] == "t") {
					$status->pickup = "true";
					}
					
					}
		return $status;
		}
		

	function FetchAllpanelFooterCustom($link) {
		
			pg_prepare($link,"sql2",'SELECT * from w_footercms WHERE  enabled=$1 ');
			$result = pg_execute($link,"sql2",array("TRUE"));
		
			$footer= array();
			$footer['Panel1']= array();
			$footer['Panel2']= array();
			$footer['Panel3']= array();
			
		
			while($row = pg_fetch_array($result))
				{
				//unset($foot);
				$foot = new stdClass();
				$foot->id = $row['id'];
				$val = $row['type'];
				
				$foot->pagename = $row['pagetitle'];
				//$foot->pageurl = $_SERVER['HTTP_HOST']."/".$row['customurl'];
				$foot->pageurl = $row['customurl'];
				$foot->pageurl_footer = base64_encode('CMS')."_".base64_encode($foot->id)."_".$row['customurl'];
				array_push($footer[$val],$foot);
				}
				/////////////
				$panel_array=array("Panel1","Panel2","Panel3");
				foreach($panel_array as $val){
							pg_prepare($link,"ocs".$val,'SELECT * from w_footer WHERE  lower(type)=$1  AND  enabled=$2 ');
					$result = pg_execute($link,"ocs".$val,array(strtolower($val),"TRUE"));
				
					$categories = array();
				
					while($row = pg_fetch_array($result))
						{
						//unset($category);
						$category = new stdClass();
						$category->id = $row['id'];
						$category->pagename = $row['pagename'];
						$category->pageurl = $row['pageurl'];
						array_push($footer[$val],$category);
						}	
				}
				
				/////////////
		return $footer;
		}
	function getstrtotime($userdate='',$hour,$min) {
		
			if($hour < 24) {
												
			$strto = strtotime($userdate." ".$hour.':'.$min);
			}
			else
			{
				if($hour== 24)
				{
				$strto = strtotime($userdate." "."00:".$min." +1 day");
				}
				else if($hour == 25) {
				$strto = strtotime($userdate." "."01:".$min." +1 day");	
				}
				else if($hour == 26) {
					
				$strto = strtotime($userdate." "."02:".$min." +1 day");	
				}
				else if($hour == 27) {
				$strto = strtotime($userdate." "."03:".$min." +1 day");	
				}
				else if($hour== 28) {
				$strto = strtotime($userdate." "."04:".$min." +1 day");	
				}
			}
		
		return $strto;
		}	
function FetchSiteSetting($link){
	
	pg_prepare($link,'sqlcon1','SELECT * FROM w_configs where name = $1');
	$result = pg_execute($link,'sqlcon1',array('siteurl'));
	$row = pg_fetch_array($result);
	
	
	return $row['value'];
	
}
		
		
function FetchSettingFront($link){
	
	pg_prepare($link,'sqlSettingsFront','SELECT * FROM w_frontsettings');
	$result = pg_execute($link,'sqlSettingsFront',array());
	$row = pg_fetch_array($result);
	
	
	
	//unset($settingfront);
	$settingfront = new stdClass();
	
	$settingfront->countrytag = $row['countrytag'];
	$settingfront->citytag = $row['citytag'];
	$settingfront->restaurant = $row['restaurant'];
	$settingfront->browse_per_city = $row['browse_per_city'];
	$settingfront->popular_restaurant = $row['popular_restaurant'];
	$settingfront->popular_cuisine = $row['popular_cuisine'];
	$settingfront->map_posititon = $row['map_posititon'];
	$settingfront->business_owner_register = $row['business_owner_register'];
	$settingfront->product_image = $row['product_image'];
	$settingfront->slider_duration = $row['slider_duration'];
	$settingfront->sildersetiings = $row['sildersetiings'];
	$settingfront->reviewsetting = $row['reviewsetting'];
	$settingfront->how_it_works = $row['how_it_works'];
	$settingfront->foodof_the_week = $row['foodof_the_week'];
	$settingfront->recents_orders = $row['recent_orders'];
	$settingfront->lets_be_friends = $row['lets_be_friends'];
	$settingfront->amazing_apps = $row['amazing_apps'];


	pg_prepare($link,'sqlSettingsFront1','SELECT * FROM w_tabsettings where scriptid=$1');
	$result1 = pg_execute($link,'sqlSettingsFront1',array($_SESSION['scriptid']));
	$row1 = pg_fetch_array($result1);

	pg_prepare($link,'sqlSettingsFront2','SELECT * FROM w_countries where id=$1');
	$result2 = pg_execute($link,'sqlSettingsFront2',array($row1['country']));
	$row2 = pg_fetch_array($result2);
	


	pg_prepare($link,'sqlfranchises','SELECT city FROM w_franchises where id=$1');
	$resultfran = pg_execute($link,'sqlfranchises',array($row1['city']));
	$rowfran = pg_fetch_array($resultfran);
  
  

	$settingfront->default_country = $row1['country'];
	$settingfront->default_country_name = $row2['name'];

	$settingfront->default_city = $row1['city'];
	$settingfront->default_cityname = $rowfran['city'];


	$settingfront->tab_delivery = $row1['tab_delivery'];
	$settingfront->tab_delivery_country = $row1['tab_delivery_country'];
	$settingfront->tab_delivery_city = $row1['tab_delivery_city'];
	$settingfront->tab_delivery_address = $row1['tab_delivery_address'];
	$settingfront->tab_delivery_neighborhood = $row1['tab_delivery_neighborhood'];
	$settingfront->tab_delivery_option = $row1['tab_delivery_option'];
	$settingfront->tab_pickup = $row1['tab_pickup'];
	$settingfront->tab_pickup_country = $row1['tab_pickup_country'];
	$settingfront->tab_pickup_city = $row1['tab_pickup_city'];
	$settingfront->tab_pickup_option = $row1['tab_pickup_option'];
	$settingfront->tab_reservation = $row1['tab_reservation'];
	$settingfront->tab_reservation_country = $row1['tab_reservation_country'];
	$settingfront->tab_reservation_city = $row1['tab_reservation_city'];
	$settingfront->tab_reservation_option = $row1['tab_reservation_option'];
	$settingfront->list_step = $row1['list_step'];
	$settingfront->citysearch = $row1['search_city'];
	$settingfront->city_name_default = FetchCityName($settingfront->default_city,$link);

	$settingfront->tab_food = $row1['tab_food'];
	$settingfront->tab_alcohol = $row1['tab_alcohol'];
	$settingfront->tab_groceries = $row1['tab_groceries'];
	$settingfront->tab_laundry = $row1['tab_laundry'];
			
	
	
	
	
/*	pg_prepare($link,'sqlSettingsFront3','SELECT * FROM w_franchises where id=$1');
	$result3 = pg_execute($link,'sqlSettingsFront3',array($row1['city']));
	$row3 = pg_fetch_array($result3);
	
	$settingfront->default_city_name = $row3['city'];*/
	
	
	pg_prepare($link,'sqlSettingsFront4','SELECT * FROM w_frontsettings');
	$result4 = pg_execute($link,'sqlSettingsFront4',array());
	$row4 = pg_fetch_array($result4);
	
	$settingfront->countrytag = $row4['countrytag'];
	
	
	
	
	return $settingfront;
}	

function FetchCountryName($countryid,$link)	{
	
	pg_prepare($link,'sqlFrontSettings','SELECT * FROM w_countries where id=$1');
	$result = pg_execute($link,'sqlFrontSettings',array($countryid));
	$row = pg_fetch_array($result);
	
	 return $row['name'];
	

	
}

function FetchCityName($cityid,$link)	{
	
	pg_prepare($link,'sqlFrontSettings1','SELECT * FROM w_franchises where id=$1');
	$result1 = pg_execute($link,'sqlFrontSettings1',array($cityid));
	$row1 = pg_fetch_array($result1);
	
	return $row1['city'];
	

}
function FetchAllcity($link)	{
	
	pg_prepare($link,'sql0','SELECT * FROM w_countries where enabled=$1');
	$result = pg_execute($link,'sql0',array('TRUE'));

	$countries = array();
	while($row = pg_fetch_array($result))
		{
		//unset($country);
		$country = new stdClass();
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}

	return $countries;

}

function FetchNeighborhoodforCity($cityid,$link)	{
	
	pg_prepare($link,'sqlnnn','SELECT * FROM w_neighborhood where city=$1 order by name asc');
	$result = pg_execute($link,'sqlnnn',array($cityid));

	$franchises = array();
	while($row = pg_fetch_array($result))
		{
		//unset($franchise);
		$franchise = new stdClass();
		$franchise->id = $row['id'];
		$franchise->name = $row['name'];
		
		array_push($franchises,$franchise);
		}

	return $franchises;
	

}



function previousDayCounti()	{
	
	$now = strtotime(GetTimeByZone($_SESSION['timezone']));
	$now = $now - 3600*24;
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$previd = $days->{date("D",  $now)};
	
	return $previd;

}		
function FetchAllsettingsCustomFacebookNew()
       {
    //   require('panel/config.php');
      $link = ConnectDB();
       pg_prepare($link,'sql3','SELECT * FROM w_configs WHERE name = $1');
       $result = pg_execute($link,'sql3',array('facebookfan'));



        $row = pg_fetch_array($result);
		//unset($facebook);
		$facebook = new stdClass();
		
      	$facebook->id = $row['id'];
        $facebook->name =  $row['name'];
        $facebook->value = $row['value'];

       return $facebook;
       }	

function FetchNeighbourhoodSettings($link){
	pg_prepare($link,'sqlneigh','SELECT * FROM w_tabsettings where scriptid=$1');
	$resultd = pg_execute($link,'sqlneigh',array($_SESSION['scriptid']));
	$row = pg_fetch_array($resultd);	
	
	return $row['tab_delivery_neighborhood'];
}

function FetchDecimalPoint($link)
	{
	$dcm = "decimal_point";
	pg_prepare($link,'sqldcpfetch','SELECT * FROM w_configs WHERE name=$1');
	$resultdcm = pg_execute($link,'sqldcpfetch',array($dcm));
	$rowdcm = pg_fetch_array($resultdcm);
	return $rowdcm["value"];
	}
function FetchSmsactivation($link)
	{
	$dcm = "smsactivation";
	pg_prepare($link,'sqlsmsfetch','SELECT * FROM w_configs WHERE name=$1');
	$resultdcm = pg_execute($link,'sqlsmsfetch',array($dcm));
	$rowdcm = pg_fetch_array($resultdcm);
	return $rowdcm["value"];
	}
function FetchLatestDeliveryZone($link,$id){
	pg_prepare($link,'sqldeliveryzone','SELECT location,deliveryprice FROM w_deliveryzone WHERE businessid=$1 order by id LIMIT 3');
	$result = pg_execute($link,'sqldeliveryzone',array($id));
	$deliveryzone = '';
	if(pg_num_rows($result) > 0){		
		$i=0;		
		while($row = pg_fetch_array($result)){
			$i++;		
			$deli = array();
			$deli['coordinates'] = parse($row['location']);
			$deli['price'] = $row['deliveryprice'];

			if($i == 1){
				$deliveryzone->zone1 = $deli;
				$deliveryzone->zone2 = "";
				$deliveryzone->zone3 = "";
			}
			
			if($i == 2){
				$deliveryzone->zone2 = $deli;
				$deliveryzone->zone3 = "";
			}
			
			if($i == 3){
				$deliveryzone->zone3 = $deli;
			}
						
		}			
		return $deliveryzone;
	}else{
		return $deliveryzone;
	}
}

function FetchPanelInfo($link){
	pg_prepare($link,'sqlpanelsetting','SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpanelsetting',array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	return $row2['value'];
}

function FetchCheckoutInfo($link){
	pg_prepare($link,'sqlcheckout','SELECT * FROM w_checkout where scriptid=$1');
	$result2 = pg_execute($link,'sqlcheckout',array($_SESSION['scriptid']));
	$checkout = array();
	
	while($row2 = pg_fetch_array($result2)){
		$checkout[$row2['field_name']]['id']=$row2['id'];
		$checkout[$row2['field_name']]['field_name']=$row2['field_name'];
		$checkout[$row2['field_name']]['required']=$row2['required'];
		$checkout[$row2['field_name']]['status']=$row2['status'];
		$checkout[$row2['field_name']]['type']=$row2['type'];		
	}
	return $checkout;
	
}
function currency_symbol($sitecurrency){

		if($sitecurrency == 'AED'){
	return 'AED';			
	}
	if($sitecurrency == 'USD'){
	return '$';			
	}
	if($sitecurrency == 'EUR'){
	return '€';			
	}
	if($sitecurrency == 'MXN'){
	return '$';			
	}
	if($sitecurrency == 'AUD'){
	return '$';			
	}
	if($sitecurrency == 'BRL'){
	return 'R$';			
	}
	if($sitecurrency == 'CAD'){
	return '$';			
	}
	if($sitecurrency == 'CZK'){
	return 'Kč';			
	}
	if($sitecurrency == 'DKK'){
	return 'kr';			
	}
	if($sitecurrency == 'HKD'){
	return '$';			
	}
	if($sitecurrency == 'HUF'){
	return 'Ft';			
	}
	if($sitecurrency == 'ILS'){
	return '₪';			
	}
	if($sitecurrency == 'JPY'){
	return '¥';			
	}
	if($sitecurrency == 'MYR'){
	return 'RM';			
	}
	if($sitecurrency == 'NOK'){
	return 'kr';			
	}
	if($sitecurrency == 'NZD'){
	return '$';			
	}
	if($sitecurrency == 'PHP'){
	return '₱';			
	}
	if($sitecurrency == 'PLN'){
	return 'zł';			
	}
	if($sitecurrency == 'GBP'){
	return '£';			
	}
	if($sitecurrency == 'SGD'){
	return '$';			
	}
	if($sitecurrency == 'SEK'){
	return 'kr';			
	}
	if($sitecurrency == 'CHF'){
	return 'CHF';			
	}
	if($sitecurrency == 'TWD'){
	return 'NT$';			
	}
	if($sitecurrency == 'THB'){
	return '฿';			
	}
	if($sitecurrency == 'TRY'){
	return '₤';			
	}
	if($sitecurrency == 'ALL'){
	return 'Lek';			
	}
	
	if($sitecurrency == 'AFN'){
	return '؋';			
	}
	if($sitecurrency == 'ARS'){
	return '$';			
	}
	if($sitecurrency == 'AWG'){
	return 'ƒ';			
	}
	if($sitecurrency == 'AZN'){
	return 'ман';			
	}
	if($sitecurrency == 'BSD'){
	return '$';			
	}
	if($sitecurrency == 'BBD'){
	return '$';			
	}
	if($sitecurrency == 'BYR'){
	return 'p.';			
	}
	
	if($sitecurrency == 'BZD'){
	return 'BZ$';			
	}
	if($sitecurrency == 'BMD'){
	return '$';			
	}
	if($sitecurrency == 'BOB'){
	return '$b';			
	}
	if($sitecurrency == 'BAM'){
	return 'KM';			
	}
	
	if($sitecurrency == 'BWP'){
	return 'P';			
	}
	if($sitecurrency == 'BGN'){
	return 'лв';			
	}
	if($sitecurrency == 'BND'){
	return '$';			
	}
	if($sitecurrency == 'KHR'){
	return '៛';			
	}
	if($sitecurrency == 'KYD'){
	return '$';			
	}
	if($sitecurrency == 'CLP'){
	return '$';			
	}
	if($sitecurrency == 'CNY'){
	return '¥';			
	}
	if($sitecurrency == 'COP'){
	return '$';			
	}
	if($sitecurrency == 'CRC'){
	return '₡';			
	}
	if($sitecurrency == 'HRK'){
	return 'kn';			
	}
	
	if($sitecurrency == 'CUP'){
	return '₱';			
	}
	if($sitecurrency == 'DOP'){
	return 'RD$';			
	}
	if($sitecurrency == 'XCD'){
	return '$';			
	}
	if($sitecurrency == 'EGP'){
	return 'Egp';			
	}
	if($sitecurrency == 'SVC'){
	return '$';			
	}
	if($sitecurrency == 'EEK'){
	return 'kr';			
	}
	if($sitecurrency == 'FKP'){
	return '£';			
	}
	if($sitecurrency == 'FJD'){
	return '$';			
	}
	if($sitecurrency == 'FCFA'){
	return 'CFA';			
	}
	if($sitecurrency == 'GHC'){
	return '¢';			
	}
	if($sitecurrency == 'GIP'){
	return '£';			
	}
	if($sitecurrency == 'GTQ'){
	return 'Q';			
	}
	if($sitecurrency == 'GGP'){
	return '£';			
	}
	if($sitecurrency == 'GYD'){
	return '$';			
	}
	if($sitecurrency == 'HNL'){
	return 'L';			
	}
	if($sitecurrency == 'ISK'){
	return 'kr';			
	}
	if($sitecurrency == 'INR'){
	return 'रु';			
	}
	if($sitecurrency == 'IDR'){
	return 'Rp';			
	}
	if($sitecurrency == 'IRR'){
	return '﷼';			
	}
	
	if($sitecurrency == 'IMP'){
	return '£';			
	}
	if($sitecurrency == 'JMD'){
	return 'J$';			
	}
	if($sitecurrency == 'JEP'){
	return '£';			
	}
	if($sitecurrency == 'KZT'){
	return 'лв';			
	}
	if($sitecurrency == 'KPW'){
	return '₩';			
	}
	if($sitecurrency == 'JOD'){
	return 'JOD';			
	}
	if($sitecurrency == 'KRW'){
	return '₩';			
	}
	if($sitecurrency == 'LAK'){
	return '₭';			
	}
	if($sitecurrency == 'LVL'){
	return 'Ls';			
	}
	if($sitecurrency == 'LBP'){
	return '£';			
	}
	if($sitecurrency == 'LRD'){
	return '$';			
	}
	if($sitecurrency == 'LTL'){
	return 'Lt';			
	}
	if($sitecurrency == 'MKD'){
	return 'ден';			
	}
	if($sitecurrency == 'MDL'){
	return 'MDL';			
	}
	if($sitecurrency == 'MUR'){
	return '₨';			
	}
	if($sitecurrency == 'MNT'){
	return '₮';			
	}
	if($sitecurrency == 'MZN'){
	return 'MT';			
	}
	if($sitecurrency == 'NAD'){
	return '$';			
	}
	
	if($sitecurrency == 'NPR'){
	return 'ƒ';			
	}if($sitecurrency == 'NIO'){
	return 'C$';			
	}if($sitecurrency == 'NGN'){
	return '₦';			
	}if($sitecurrency == 'OMR'){
	return '﷼';			
	}if($sitecurrency == 'PKR'){
	return '₨';			
	}if($sitecurrency == 'PAB'){
	return 'B/.';			
	}if($sitecurrency == 'PYG'){
	return 'Gs';			
	}if($sitecurrency == 'PEN'){
	return 'S/.';			
	}if($sitecurrency == 'QAR'){
	return '﷼';			
	}if($sitecurrency == 'RON'){
	return 'lei';			
	}if($sitecurrency == 'RUB'){
	return 'руб';			
	}if($sitecurrency == 'SHP'){
	return '£';			
	}if($sitecurrency == 'SAR'){
	return '﷼';			
	}if($sitecurrency == 'RSD'){
	return 'Дин.';			
	}if($sitecurrency == 'SCR'){
	return '₨';			
	}if($sitecurrency == 'SBD'){
	return '$';			
	}if($sitecurrency == 'SOS'){
	return 'S';			
	}if($sitecurrency == 'ZAR'){
	return 'R';			
	}if($sitecurrency == 'LKR'){
	return '₨';			
	}if($sitecurrency == 'SRD'){
	return '$';			
	}if($sitecurrency == 'SYP'){
	return '£';			
	}if($sitecurrency == 'TTD'){
	return 'TT$';			
	}if($sitecurrency == 'TVD'){
	return '$';			
	}if($sitecurrency == 'UAH'){
	return '₴';			
	}if($sitecurrency == 'UYU'){
	return '$U';			
	}if($sitecurrency == 'UZS'){
	return 'лв';			
	}if($sitecurrency == 'VEF'){
	return 'Bs';			
	}if($sitecurrency == 'VND'){
	return '₫';			
	}if($sitecurrency == 'YER'){
	return '﷼';			
	}if($sitecurrency == 'ZWD'){
	return 'Z$';			
	}if($sitecurrency == 'IQD'){
	return 'د.ع';			
	}if($sitecurrency == 'LYD'){
	return 'LYD';			
	}
	
	
}

//zipcodevalidation start
function FetchzipcodeValidation($zipcode,$link){
	 pg_query($link, "DEALLOCATE ALL");
	 $length=strlen($zipcode);
	 $chararray=str_split($zipcode);
	   pg_prepare($link,'sqlzipcodevalidation','SELECT * FROM w_zipcodevalidation where length=$1 ORDER BY position');
	$result1 = pg_execute($link,'sqlzipcodevalidation',array($length));
	$zipcodevalidationarray=array();

	while($row1 = pg_fetch_array($result1)){
		$zipcodevalidationarray[$row1["position"]]=$row1["value"];
	}
	$set=array();
	$set["value"]= "0";
	$set["position"]= 0;
	$set1=false;
	 foreach($chararray as $k=>$val){
		 if($set1==false){
			 if($zipcodevalidationarray[$k+1]!=0){
				
			 if(is_numeric($val)){
		 if((is_numeric($val)) && (($zipcodevalidationarray[$k+1]!=2)&& ($zipcodevalidationarray[$k+1]!=3))){
			 
			 $set["value"]= $zipcodevalidationarray[$k+1];
			 $set["position"]= $k+1;
			 $set1=true;
		 }else{
			  
			  $set= array();;
			   $set1=false;
		 }
			 }
		  if(trim($val)==''){
		  if((trim($val)=='')&&($zipcodevalidationarray[$k+1]!=4)){
			 $set["value"]=$zipcodevalidationarray[$k+1];
			 $set["position"]= $k+1;
				 $set1=true;
		 }else{
			  
			  $set= array();
			   $set1=false;
		 }
		  }
		  if(ctype_alpha($val)){
		  if((ctype_alpha($val)) && (($zipcodevalidationarray[$k+1]!=1)&& ($zipcodevalidationarray[$k+1]!=3))){
		  		$set["value"]= $zipcodevalidationarray[$k+1];
			 $set["position"]= $k+1;
				 $set1=true;
		 }else{
			 			  

			  $set= array();
			   $set1=false;
		 }
		  }
		
		  if((!is_numeric($val))&&((!ctype_alpha($val)))&& (trim($val)!='')){
			  $set["value"]= $zipcodevalidationarray[$k+1];
			$set["position"]= $k+1;
			$set1=true;
		  }
			 }else{
				 
				   $set= array();
			   $set1=false;
			 }
		 }
	 }
	  
	 return $set;
	
}
function FetchZipMAxMin($link){
	 pg_query($link, "DEALLOCATE ALL");
	$zipMAxMin=array();
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'zipvalmax'){
		
			$zipMAxMin["zipvalmax"] =stripslashes($row['value']);
			
		}
		if($row['name'] == 'zipvalmin'){
		
			$zipMAxMin["zipvalmin"] =stripslashes($row['value']);
			
		}
		
	}
	return $zipMAxMin;
	pg_close($link);	
}
//zipcodevalidation end
function FetchDefaultLangName($link)
	{
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1');
	$result = pg_execute($link,'sqllangfetch',array('TRUE'));

	$defaultlang = array();
	while($row = pg_fetch_array($result))
		{
		//unset($dlang);
		$dlang = new stdClass();
		$dlang->id = $row['id'];
		$dlang->lang_text = $row['lang_text'];
		if(isset($_SESSION['l'])){
			if($row['id']==$_SESSION['l']){
			$sel = 'selected';
		}else{
			$sel = '';
		}
		}else{
			if($row['opdefault'] == 1){
			$sel = 'selected';	
			}else{
			$sel = '';	
			}
		}
		
		$dlang->langselect = $sel;
		
		array_push($defaultlang,$dlang);
		}
		
	return $defaultlang;
	}
	
function FetchPageSettings($link){
	pg_prepare($link,'sql_page_set','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql_page_set',array('sitepagesettings'));
	$row = pg_fetch_array($result);
	$settingstatus = $row["value"];
	return $settingstatus;
	}
	
	function FetchAllReviews($link)
	{

		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result1 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result1);
		if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['l'];	
		}

			pg_prepare($link,'sql01','SELECT * FROM w_review where status=$1 order by id desc Limit $2');

		$query2="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
		pg_prepare($link,'sql02',$query2);

		$query3="select name from w_users where id=$1";
		pg_prepare($link,'sql03',$query3);
		
		$query4="select customslug from w_business where id=$1";
		pg_prepare($link,'sql04',$query4);

	
		$result = pg_execute($link,'sql01',array('TRUE',5));

		$reviews = array();
		
		if(pg_num_rows($result) == 5){
			$seemorestatus = true;
		}else{
			$seemorestatus = false;
		}
		$counter=1;
		
		while($row = pg_fetch_array($result))
			{
			//unset($review);
			$review = new stdClass();
			$review->status=$seemorestatus;
			$review->id = $row['id'];
			$review->id_w_business = $row['id_w_business'];

			if ($row['id_w_business']!=null)
			{
				
				$result2 = pg_execute($link,'sql02',array($review->id_w_business,$defultlang));
				$row2 = pg_fetch_array($result2);
			
				$review->bname = $row2['name_lang'];

				$result5=pg_execute($link,'sql04',array($review->id_w_business));
				$row5 = pg_fetch_array($result5);
			
				$review->bcustomeslug = $row5['customslug'];

				$exists = is_dir($_SERVER['DOCUMENT_ROOT'].'/panel/images/business/'.$review->id_w_business);
				$review->existspic=$exists;

			}

			$review->quality = $row['quality'];
			$review->delivery = $row['delivery'];
			$review->dealer = $row['dealer'];
			$review->packagec = $row['package'];
			$total=$review->quality+$review->delivery+$review->dealer+$review->packagec;
			$avg=$total/4;
			$review->ratings=$avg;
			$review->user= $row['usr'];
			if($row['usr']!='-1')
			{
				$result3 = pg_execute($link,'sql03',array($review->user));
				$row3 = pg_fetch_array($result3);
			
				$review->uname = $row3['name'];
			}
			else
			{
				$review->uname="Guest";
			}

			$review->name = $row['name'];
			if($row['comment']!=null)
			{
				$review->comment = $row['comment'];
			}
			else
			{
				$review->comment='';
			}

			if($counter != 5){
				array_push($reviews,$review);
			}

			$counter++;
			
			}
		
			
		return $reviews;
	}


	function FetchAllReviewsLimit($limit,$link)
	{

		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result1 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result1);
		if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['l'];	
		}
		
		pg_prepare($link,'sql01','SELECT * FROM w_review order by id desc Limit $1 OFFSET $2');

		$query2="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
		pg_prepare($link,'sql02',$query2);

		$query3="select name from w_users where id=$1";
		pg_prepare($link,'sql03',$query3);


		$query4="select customslug from w_business where id=$1";
		pg_prepare($link,'sql04',$query4);
		
	
		$result = pg_execute($link,'sql01',array(4,$limit));

		$reviews = array();
		while($row = pg_fetch_array($result))
			{
			//unset($review);
			$review = new stdClass();
			$review->id = $row['id'];
			$review->id_w_business = $row['id_w_business'];

			if ($row['id_w_business']!=null)
			{
				
				$result2 = pg_execute($link,'sql02',array($review->id_w_business,$defultlang));
				$row2 = pg_fetch_array($result2);
			
				$review->bname = $row2['name_lang'];

				$result5=pg_execute($link,'sql04',array($review->id_w_business));
				$row5 = pg_fetch_array($result5);
			
				$review->bcustomeslug = $row5['customslug'];

				$exists = is_dir($_SERVER['DOCUMENT_ROOT'].'/panel/images/business/'.$review->id_w_business);
				$review->existspic=$exists;

			}

			$review->quality = $row['quality'];
			$review->delivery = $row['delivery'];
			$review->dealer = $row['dealer'];
			$review->packagec = $row['package'];
			$total=$review->quality+$review->delivery+$review->dealer+$review->packagec;
			$avg=$total/4;
			$review->ratings=$avg;
			$review->user= $row['usr'];
			if($row['usr']!='-1')
			{
				$result3 = pg_execute($link,'sql03',array($review->user));
				$row3 = pg_fetch_array($result3);
			
				$review->uname = $row3['name'];
			}
			else
			{
				$review->uname="Guest";
			}

			$review->name = $row['name'];
			if($row['comment']!=null)
			{
				$review->comment = $row['comment'];
			}
			else
			{
				$review->comment='';
			}
			
			array_push($reviews,$review);
			}
			
		return $reviews;
	}


function FetchItemPointPermission($link)
{
		pg_prepare($link,'sqldefalut30','SELECT value from w_configs WHERE name=$1');
		$result1 = pg_execute($link,'sqldefalut30',array("item_point_permission"));
		$rows = pg_fetch_array($result1);
		return $rows['value'];
}

function FetchGlobalPointSettings($link)
{
		pg_prepare($link,'sqldefalut4','SELECT value from w_configs WHERE name=$1');
		$result1 = pg_execute($link,'sqldefalut4',array("global_point_settings_for_all_business"));
		$rows = pg_fetch_array($result1);
		return $rows['value'];
}

function FetchUserPointsData($link,$id){

		pg_prepare($link,'sqldefalut200','SELECT sum(CAST(points_received as int)) as earned,sum(CAST(points_used as int)) as points_used from w_user_points where customer_id=$1');
		$result100 = pg_execute($link,'sqldefalut200',array($id));
		$rows = pg_fetch_array($result100);
		$points_available=$rows['earned']- $rows['points_used']; 
		return $points_available;
}

function FetchUsersOrderBusiness($link,$id)
{
		pg_prepare($link,'sqldefalut2001','SELECT DISTINCT business_id from w_user_points where customer_id=$1');
		$result1001 = pg_execute($link,'sqldefalut2001',array($id));
		$business_id=array();
		while($rowsbid = pg_fetch_array($result1001))
		{
			//unset($id);
			$id = new stdClass();

			$id->business_id=$rowsbid['business_id'];
			array_push($business_id,$id);
		}
		
		return json_encode($business_id);
}


function GetPointValue($link,$id)
{
		pg_prepare($link,'sqldefalut2000','SELECT number_of_points,point_values from w_business_points where business_id=$1 and enabled=$2');
		$result1000 = pg_execute($link,'sqldefalut2000',array($id,"true"));
		$rows = pg_fetch_array($result1000);
		if($rows['point_values']!=0)
		{
			$point_value=$rows['number_of_points']/ $rows['point_values']; 
		}
		
		return $point_value;
}

function FetchBusinessPointsEnabled($link)
{

		pg_prepare($link,'sqldefalut2222','SELECT business_id from w_business_points where enabled=$1');
		$result1222 = pg_execute($link,'sqldefalut2222',array("true"));
		$business_id=array();
		while($rows22 = pg_fetch_array($result1222))
		{
			//unset($id);
			$id = new stdClass();
			$id->business_id=$rows22['business_id'];
			array_push($business_id,$id);
		}
		

		return json_encode($business_id);
}

	function preclosetimefun($schedule,$priviousDay) {

			if($schedule->sdays->{$priviousDay}->closes->hour == 24) {
						$preclosetime = 0;
				}    else if($schedule->sdays->{$priviousDay}->closes->hour == 25) {
					    $preclosetime = 1;
				}
				else if($schedule->sdays->{$priviousDay}->closes->hour == 26) {
					   $preclosetime = 2;
				}
				else if($schedule->sdays->{$priviousDay}->closes->hour == 27) {
					$preclosetime = 3;
				}
				else if($schedule->sdays->{$priviousDay}->closes->hour == 28) {
					$preclosetime = 4;
				}
				
				
				return $preclosetime;
}	

function MenuExistOrNotWithBusinessType($bid,$link,$whereall){
	$btype = 0;
	if($whereall->businesstype == 'b1'){
		$btype = 1;
	}
	if($whereall->businesstype == 'b2'){
		$btype = 2;
	}
	if($whereall->businesstype == 'b3'){
		$btype = 3;
	}
	if($whereall->businesstype == 'b4'){
		$btype = 4;
	}
	
	pg_prepare($link,'sqlmBusinessType'.$bid,'SELECT * FROM w_menus WHERE business=$1 and enabled=true and btype=$2' );
	$result = pg_execute($link,'sqlmBusinessType'.$bid,array($bid,$btype));
	if(pg_num_rows($result)>0){
		return true;
	}else{
		return false;
	}
}

function businessopenChkforMenuWithBusinessType($bid,$link,$whereall) {
	
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	//unset($response);
	$response = new stdClass();
	$menuopenchk = false;
	$dishesids = array();
	$dishes = array();
	$extras = array();
	$btype = 0;
	if($whereall->businesstype == 'b1'){
		$btype = 1;
	}
	if($whereall->businesstype == 'b2'){
		$btype = 2;
	}
	if($whereall->businesstype == 'b3'){
		$btype = 3;
	}
	if($whereall->businesstype == 'b4'){
		$btype = 4;
	}
	
	pg_prepare($link,'sqlm100'.$bid,'SELECT * FROM w_menus WHERE business=$1 and enabled=true and btype=$2' );
	$result = pg_execute($link,'sqlm100'.$bid,array($bid,$btype));
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZone($_SESSION['timezone']));
				$schedule = parse($row['schedule']);
				
				
				if($schedule->closes->hour >23  && (date("H") == 0|| date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )  ) {						
					
						$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute)-86400;
						
						} else {
						
					$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute);
						}
				if ($now>=$shopopentime)
				{
					
					
					if($schedule->closes->hour< 24) {
						
						$newScedule = strtotime($schedule->closes->hour.':'.$schedule->closes->minute);
						
				}
				else
				{
					
					
							if($schedule->closes->hour== 24  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 ))
							{
							$newScedule = strtotime("00:".$schedule->closes->minute)+86400;
							}
							
							else if($schedule->closes->hour == 25 && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
								 
							$newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
							}
							else if($schedule->closes->hour == 26  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
								
							$newScedule = strtotime("02:".$schedule->closes->minute)+86400;	
							}
							else if($schedule->closes->hour == 27  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("03:".$schedule->closes->minute)+86400;	
							}
							
							else if($schedule->closes->hour== 28  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("04:".$schedule->closes->minute)+86400;	
							}
							else {
								if($schedule->closes->hour== 24)
							    $newScedule = strtotime("00:".$schedule->closes->minute)+86400;	
								if($schedule->closes->hour== 25)
							    $newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
								if($schedule->closes->hour== 26)
							    $newScedule = strtotime("02:".$schedule->closes->minute)+86400;
								if($schedule->closes->hour== 27)
							    $newScedule = strtotime("03:".$schedule->closes->minute)+86400;
								if($schedule->closes->hour== 28)
							    $newScedule = strtotime("04:".$schedule->closes->minute)+86400;
								}
						}
						
						/*echo date("d h:i a",$now);
						echo date("d h:i a",$newScedule);
						echo date("d h:i a",$shopopentime);*/
						
					if ($now<$newScedule) {
						
						$menuopenchk = true;
							
					}
				}
				
				
				}
	return $menuopenchk;
	}


function businessopenChkforMenu($bid,$link) {
	
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	//unset($response);
	$response = new stdClass();
	$menuopenchk = false;
	$dishesids = array();
	$dishes = array();
	$extras = array();
	
	pg_prepare($link,'sqlm100'.$bid,'SELECT * FROM w_menus WHERE business=$1 and enabled=true' );
	$result = pg_execute($link,'sqlm100'.$bid,array($bid));
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZone($_SESSION['timezone']));
				$schedule = parse($row['schedule']);
				
				
				if($schedule->closes->hour >23  && (date("H") == 0|| date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )  ) {						
					
						$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute)-86400;
						
						} else {
						
					$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute);
						}
				if ($now>=$shopopentime)
				{
					
					
					if($schedule->closes->hour< 24) {
						
						$newScedule = strtotime($schedule->closes->hour.':'.$schedule->closes->minute);
						
				}
				else
				{
					
					
							if($schedule->closes->hour== 24  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 ))
							{
							$newScedule = strtotime("00:".$schedule->closes->minute)+86400;
							}
							
							else if($schedule->closes->hour == 25 && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
								 
							$newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
							}
							else if($schedule->closes->hour == 26  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
								
							$newScedule = strtotime("02:".$schedule->closes->minute)+86400;	
							}
							else if($schedule->closes->hour == 27  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("03:".$schedule->closes->minute)+86400;	
							}
							
							else if($schedule->closes->hour== 28  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("04:".$schedule->closes->minute)+86400;	
							}
							else {
								if($schedule->closes->hour== 24)
							    $newScedule = strtotime("00:".$schedule->closes->minute)+86400;	
								if($schedule->closes->hour== 25)
							    $newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
								if($schedule->closes->hour== 26)
							    $newScedule = strtotime("02:".$schedule->closes->minute)+86400;
								if($schedule->closes->hour== 27)
							    $newScedule = strtotime("03:".$schedule->closes->minute)+86400;
								if($schedule->closes->hour== 28)
							    $newScedule = strtotime("04:".$schedule->closes->minute)+86400;
								}
						}
						
						/*echo date("d h:i a",$now);
						echo date("d h:i a",$newScedule);
						echo date("d h:i a",$shopopentime);*/
						
					if ($now<$newScedule) {
						
						$menuopenchk = true;
							
					}
				}
				
				
				}
	return $menuopenchk;
	}
	
	

function FetchAllWidgetResturantButtonSettingsData($rid,$link){
	$reswibuttondata = array();
	if(!empty($rid)){
		pg_prepare($link,'resbuttonwidget',"SELECT * FROM w_business_widget_button WHERE enabled=$1 AND id=$2");
		$resdata = pg_execute($link,'resbuttonwidget',array('TRUE', $rid));
		
		if (pg_num_rows($resdata)>0){ 
			$rowd = pg_fetch_array($resdata);
			$reswidbu = new stdClass();			
			$reswidbu->id = $rowd['id'];		
			$reswidbu->embeddedcode = stripslashes($rowd['embeddedcode']);			
			if($reswidbu->embeddedcode !=null){
				array_push($reswibuttondata,$reswidbu);
			}		
		}			
	}
	return $reswibuttondata;
}
	
function FetchAllWidgetResturantFloatingSettingsData($rid,$link){
	$reswifloatdata = array();
	if(!empty($rid)){
		pg_prepare($link,'resfloatwidget',"SELECT * FROM w_business_widget_float WHERE enabled=$1 AND id=$2");
		$resdata2 = pg_execute($link,'resfloatwidget',array('TRUE', $rid));

		if (pg_num_rows($resdata2)>0){ 
			$rowd2 = pg_fetch_array($resdata2);
			$reswidfloat = new stdClass();
			$reswidfloat->id = $rowd2['id'];		
			$reswidfloat->embeddedcode = stripslashes($rowd2['embeddedcode']);			
			if($reswidfloat->embeddedcode !=null){
				array_push($reswifloatdata,$reswidfloat);
			}		
		}
	}
	return $reswifloatdata;	
}	
	


	
function FetchAllWidgetResturantSettingsData($rid,$link){
	$reswidata = array();
	if(!empty($rid)){
		pg_prepare($link,'reswidget',"SELECT * FROM w_business_widget_iframe WHERE enabled=$1 AND id=$2");
		$resdata = pg_execute($link,'reswidget',array('TRUE', $rid));			
		if (pg_num_rows($resdata)>0){ 
			$rowd = pg_fetch_array($resdata);
			$reswid = new stdClass();					
			$reswid->id = $rowd['id'];		
			$reswid->widget = stripslashes($rowd['embedded_code']);				
			if($reswid->widget !=null){
				array_push($reswidata,$reswid);
			}		
		}			
	}
	return $reswidata;		
}
	
function FetchAllWidgetSettingsData($wid,$link){	
	
	if(!empty($wid)){
		$widget = array();
		pg_prepare($link,'tabsettings',"SELECT * FROM w_widget WHERE scriptid=$1 AND id=$2");
		$tabsettings_res = pg_execute($link,'tabsettings',array($_SESSION['scriptid'], $wid));
		

		if (pg_num_rows($tabsettings_res)>0){ 
			$row = pg_fetch_array($tabsettings_res);
			$wid = new stdClass();
			$wid->id = $row['id'];			
			$wid->widget = stripslashes($row['widget']);				
			if($wid->widget !=null){
				array_push($widget,$wid);
			}		
		}	
		$data=json_decode(stripslashes($widget[0]->widget),true);

		$delivery_tab = $data['delivery_tab'];
		$pickup_tab = $data['pickup_tab'];
		$reservation_tab = $data['reservation_tab'];
		$country_display = $data['country_display'];
		$city_display = $data['city_display'];
		$optional_display = $data['optional_display'];
		$geolocation_display = $data['geolocation_display'];
		$neighborhood = $data['neighborhood'];
		$default_country = $data['default_country'];
		$default_city = $data['default_city'];
		$default_address_zipcode = $data['default_address_zipcode'];
		$default_neighbourhood = $data['default_neighbourhood'];
		$background_color = $data['background_color'];
		$font_size = $data['font_size'];
		$font_color = $data['font_color'];
		$popup_color = $data['popup_color'];
		$width = $data['width'];
		$button_color = $data['button_color'];
		$default_business = $data['default_business'];
		$default_category = $data['default_category'];
		$widget_name = $data['widget_name'];
		$skip_homepage = $data['skip_homepage'];
		$skip_business_listing = $data['skip_business_listing'];
		$footer_text = $data['footer_text'];
		$mobile_responsive = $data['mobile_responsive'];
	
	
	pg_prepare($link,'sqlWedSettingsFront2','SELECT * FROM w_countries where id=$1');
	$result2 = pg_execute($link,'sqlWedSettingsFront2',array($data['default_country']));
	$row2 = pg_fetch_array($result2);
	
	$default_country_name = $row2['name'];
	
	pg_prepare($link,'sqlWedSettingsFront3','SELECT * FROM w_franchises where id=$1');
	$result3 = pg_execute($link,'sqlWedSettingsFront3',array($data['default_city']));
	$row3 = pg_fetch_array($result3);
	
	$default_city_name = $row3['city'];
		
		
		pg_prepare($link,'businessexit',"SELECT * FROM w_business WHERE id=$1");
		$business_res = pg_execute($link,'businessexit',array($default_business));
		if (pg_num_rows($business_res)>0){ 
			$direct_business = true;	
		}else{
			$direct_business = false;
		
		}
		
		$button_Text = $data['button_Text'];
		$tab_settings = array(
						'tab_delivery' => $delivery_tab,
						'tab_pickup' => $pickup_tab,
						'tab_reservation' => $reservation_tab
						);
		//print_r($settings_tab);	

		$location_settings = array(
							'country_display' => $country_display,
							'city_display' => $city_display,
							'optional_display' => $optional_display,
							'geolocation_display' => $geolocation_display,
							'neighborhood' => $neighborhood
							);		

		//print_r($delevery_settings);

		$default_settings = array(
							'default_country' => $default_country,
							'default_city' => $default_city,
							'default_address_zipcode' => $default_address_zipcode,
							'default_neighbourhood' => $default_neighbourhood,
							'default_business' => $default_business,		
							'direct_business' => $direct_business,
							'default_category' => $default_category,
							'default_country_name' => $default_country_name,
							'default_city_name' => $default_city_name,
								
							);
		//print_r($pickup_settings);

		$site_settings = array(
								'background_color' => $background_color,
								'font_size' => $font_size,
								'font_color' => $font_color,
								'popup_color' => $popup_color,
								'width' => $width,
								'widget_name' => $widget_name,
								'skip_homepage' => $skip_homepage,
								'skip_business_listing' => $skip_business_listing,
								'footer_text' => $footer_text,
								'button_color' => $button_color,
								'mobile_responsive' => $mobile_responsive,
								'button_Text' => $button_Text								
								);
								




		$WidgetSettings = array(
			'status' => 'true',
			'tab_settings' => $tab_settings,
			'location_settings' => $location_settings,
			'default_settings' => $default_settings,
			'site_settings' => $site_settings						
		);

		
	}else{
		$WidgetSettings = array(
			'status' => 'true',
			'tab_settings' => "",
			'location_settings' => "",
			'default_settings' => "",
			'site_settings' => ""
		);
	}	
	return $WidgetSettings;			
}
?>
