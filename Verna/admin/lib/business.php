<?php 
error_reporting(0);
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);

	
switch ($_POST['f'])
	{
	/*Business*/
	case 'FetchAllBusinessDataFilter':
		FetchAllBusinessDataFilter($_POST['filters']);
	break;
	case 'CopyBusiness':
		CopyBusiness($_POST['id']);
	break;
	case 'FetchExtrasQtyPersonData':
		FetchExtrasQtyPersonData();
		break;
		
	case 'DeleteBusinessById':
		DeleteBusinessById($_POST['id']);
	break;
	
	/*Enabled*/
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'business');
	break;
	case 'MenuSetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'menus');
	break;
	case 'DishSetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'dishes');
	break;
	case 'ExtraSetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'extras');
	break;
	

	/*Resturant info*/
	case 'SaveBusiness':
		SaveBusiness($_POST['data']);
	break;
	case 'GetBusinesType':
		GetBusinesType($_POST['id']);
		break;
	/*product Option*/
	case 'FetchExtrasDataByIds':
		GetExtrasDataByIds($_POST['ids']);
	break;
	case 'FetchExtrasDataByBusiness':
		GetExtrasDataByBusiness($_POST['id']);
	break;
    case 'GetExtrasDetails':
        GetExtrasDetails($_POST['data']);
    break;
    case 'GetExtrasOptions':
        GetExtrasOptions($_POST['data']);
    break;
	case 'GetExtraData':
		GetExtraData($_POST['id']);
	break;
	case 'SaveExtra':
		SaveExtra($_POST['data']);
	break;
	case 'DeleteExtra':
		DeleteExtra($_POST['data']);
	break;
    case 'get_max_rank':
        get_max_rank($_POST['data']);
    break;
    case 'GetOptions':
        GetOptions($_POST['data'],$_POST['option']);
    break;
    case 'GetOptionChoices':
        GetOptionChoices($_POST['data'],$_POST['set_id']);
    break;
    case 'GetExtrasOptionsTOCopy':
        GetExtrasOptionsTOCopy($_POST['data']);
    break;
    case 'GetAllOptions':
        GetAllOptions($_POST['data']);
    break;
    case 'get_max_selection':
        get_max_selection($_POST['data']);
    break;
    case 'EditExtraOptions':
           EditExtraOptions($_POST['data']);
    break;
    case 'SaveExtraOptions':
        SaveExtraOptions($_POST['data']);
    break;
    case 'DeleteOptions':
        DeleteOptions($_POST['data']);
	break;	

	case 'SaveSchedule':
        SaveSchedule($_POST['data']);
	break;

	case 'FetchAllCategory':
		FetchAllCategory($_POST['id']);
	break;
	
	case 'FetchAllBusinessCategoryIDData':
		FetchAllBusinessCategoryIDData($_POST['data'],$_POST['id']);
	break;
	
	case 'FetchAllSubCateIDData':
		FetchAllSubCateIDData($_POST['data'],$_POST['id']);
	break;


	/*Products*/
	case 'FetchOptionTotalPrice':
		FetchOptionTotalPrice($_POST['ids']);
	break;
	
	
	
	
	
	
	
	
	
	
	/*others*/
	
	
	

	
	
	
	case 'FetchAllBusinessData':
		FetchAllBusinessData($_POST['filters']);
	break;
	
	case 'DeleteBusiness':
		DeleteBusiness($_POST['data']);
	break;
	
	case 'SaveDish':
		SaveDish($_POST['data']);
	break;
	case 'DeleteDish':
		DeleteDish($_POST['data']);
	break;
	case 'checkslug':
		checkslug($_POST['data']);
	break;
	case 'FetchDishesDataByIds':
		GetDishesDataByIds($_POST['ids']);
	break;
	case 'FetchDishesDataByBusiness':
		GetDishesDataByBusiness($_POST['id']);
	break;
	case 'GetDishData':
		GetDishData($_POST['id']);
	break;

	case 'SaveMenu':
		SaveMenu($_POST['data']);
	break;
	case 'DeleteMenu':
		DeleteMenu($_POST['data']);
	break;
	case 'FetchMenusDataByBusiness':
		GetMenusDataByBusiness($_POST['id']);
	break;
	case 'FetchMenusDataByIds':
		GetMenusDataByIds($_POST['ids']);
	break;
		case 'GetMenuData':
		GetMenuData($_POST['id']);
	break;
	
	case 'SaveExtraChoice':
        SaveExtraChoice($_POST['data']);
        break;
    case 'GetChoice':
        GetChoice();
        break;
		
		
		case 'SaveReserve':
		SaveReserve($_POST['data']);
	break;
	case 'FetchReserveDataByIds':
		GetReserveDataByIds($_POST['ids']);
	break;
	case 'FetchReserveDataByBusiness':
		GetReserveDataByBusiness($_POST['id']);
	break;
	case 'GetReserveData':
		GetReserveData($_POST['id']);
	break;	
	case 'DeleteReserve':
		DeleteReserve($_POST['data']);
	break;
	case 'FetchAllPriceData':
		FetchAllPriceData($_POST['id']);
	break;


	case 'DeleteImage':
		DeleteImage($_POST['id'],$_POST['imageid']);
	break;
	/****SEO ****/
	case 'FetchMetasData':
		FetchMetasData($_POST['id']);
	break;
	case 'SaveMetaSeoData':
		SaveMetaSeoData($_POST['data']);
	break;
	
	case 'FetchAllCountriesIDData':
		FetchAllCountriesIDData($_POST['data']);
	break;
	case 'FetchAllCityIDData':
		FetchAllCityIDData($_POST['data'],$_POST['countryid']);
	break;
	
	case 'FetchAllColonyNeighborhoodIDData':
		FetchAllColonyNeighborhoodIDData($_POST['data'],$_POST['countryid'],$_POST['cityid']);
	break;
	
	case 'ChangePopular':
        ChangePopular($_POST['bid'], $_POST['chk']);
    break;

    case 'FetchWidgetIFrame':
    	FetchWidgetIFrame($_POST['id']);
    break;

    case 'FetchWidgetButton':
    	FetchWidgetButton($_POST['id']);
    break;

    case 'FetchWidgetFloat':
    	FetchWidgetFloat($_POST['id']);
    break;


    case 'IframeSave':
    	IframeSave($_POST['id'],$_POST['data']);
    break;

    case 'ButtonSave':
    	ButtonSave($_POST['id'],$_POST['data']);
    break;

   

    case 'FloatSave':
    	FloatSave($_POST['id'],$_POST['data']);
    break;

   case 'GetTimeZoneData':
		GetTimeZoneData($_POST['id']);
	break;


    case 'SetEnablediframe':
		SetEnablediframe($_POST['id'],$_POST['enabled']);
	break;

	 case 'SetEnabledbutton':
		SetEnabledbutton($_POST['id'],$_POST['enabled']);
	break;

	 case 'SetEnabledfloat':
		SetEnabledfloat($_POST['id'],$_POST['enabled']);
	break;

	case 'FetchBusinesswidgetData':
		FetchBusinesswidgetData($_POST['id']);
	break; 

	case 'FetchButtonWidgetData':
		FetchButtonWidgetData($_POST['id']);
	break;


	case 'FetchFloatWidgetData':
		FetchFloatWidgetData($_POST['id']);
	break;

	case 'Deleteiframewidget':
		Deleteiframewidget($_POST['data']);
	break;

	case 'DeleteButtonwidget':
		DeleteButtonwidget($_POST['data']);
	break;

	case 'DeleteFloatwidget':
		DeleteFloatwidget($_POST['data']);
	break;

	case 'Fetchallembdatafloat':
			Fetchallembdatafloat($_POST['Business'],$_POST['data']);
	break;

	case 'Fetchallembdatabutton':
		Fetchallembdatabutton($_POST['Business'],$_POST['data']);
	break;

	case 'Fetchallembdataiframe':
		Fetchallembdataiframe($_POST['Business'],$_POST['data']);
	break;

	case 'UpdateIframeData':
		UpdateIframeData($_POST['id'],$_POST['data']);
		break;
	case 'UpdateButtonData':
		UpdateButtonData($_POST['id'],$_POST['data']);
		break;
	case 'UpdateFloatData':
		UpdateFloatData($_POST['id'],$_POST['data']);
		break;

    default:
        die();
        break;
	
	}




/********************************************GET ALL Business DATA***********************************************************************/
	
	
	
	
	
function FetchAllBusinessData($filters)
	{
	ProvidersOnly();
	switch($_SESSION['user']->level)
		{
		case '1':
			if (empty($filters))
				$filters = array();
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			array_push($filters,json_decode('{"conditional":"OR","modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
		break;
		case '2':
			if (empty($filters))
				$filters = array();
			array_push($filters,json_decode('{"modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
		break;
		}
	echo json_encode(GetAllBusinessData($filters));
	}

function GetAllBusinessData($filters)
	{
	$link = ConnectDB();	
	$conditionalsvalues = array();
	$query = 'SELECT w_business.id,w_business.isimg,w_business.name,w_business.enabled,w_business.twiliophone,w_business.twilioenabled,w_business.city as cityid, w_franchises.city as cityname,w_business.provider,w_users.name as providername,w_users.lastname as providerlastname,w_users.lastname2 as providerlastname2 FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id';

	if (!empty($filters))	
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);
	
	$allbusiness = array();
	while($row = pg_fetch_array($result))
		{
		unset($business);
		unset($provider);
		unset($city);
		$business->id = $row['id'];
		$business->name = $row['name'];
		$business->enabled = $row['enabled'];
		$business->isimg = $row['isimg'];
		
		$business->twiliophone = $row['twiliophone'];
		$business->twilioenabled = $row['twilioenabled'];

		if ($row['cityid']!=null)
			{
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}
	
		$business->city = $city;

		if ($row['provider']!=null)
			{
			$provider->id = $row['provider'];
			$provider->name = $row['providername'];
			$provider->lastname = $row['providerlastname'];
			$provider->lastname2 = $row['providerlastname2'];
			}
			else
			{
			$provider->id = '';
			$provider->name = '';
			$provider->lastname = '';
			$provider->lastname2 = '';
			}

		$business->provider = $provider;
		
		array_push($allbusiness,$business);
		}

	pg_close($link);
	return $allbusiness;
	}
	
	
function FetchAllBusinessDataFilter($filters)
	{
	ProvidersOnly();
	switch($_SESSION['user']->level)
		{
		case '1':
			if (empty($filters))
				$filters = array();
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			array_push($filters,json_decode('{"conditional":"OR","modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
		break;
		case '2':
			if (empty($filters))
				$filters = array();
			array_push($filters,json_decode('{"modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
		break;
		}
	echo json_encode(GetAllBusinessDataFilter($filters));
	}

function GetAllBusinessDataFilter($filters)
	{
	$link = ConnectDB();	
	
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	
	if ($_SESSION['user']->level==0){
	$conditionalsvalues = array();
	//array_push($conditionalsvalues,$_SESSION['scriptid']);
	$query = "SELECT w_business.id,w_business.isimg,w_business.name,w_business.enabled,w_business.twiliophone,w_business.twilioenabled,w_business.is_popular,w_business.city as cityid, w_franchises.city as cityname,w_business.provider FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id WHERE w_business.scriptid='".$_SESSION['scriptid']."'";
	

	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
		$querycount = $query;
	//$limit = ' ORDER BY  w_business.id  limit '.$IS_BUSINESS_LIMIT.' offset '.$IS_BUSINESS_START;
	//$query .= $limit;
	/*echo $query;
	print_r($conditionalsvalues);*/
	
	pg_prepare($link,'sql11',$query);
	$result = pg_execute($link,'sql11',$conditionalsvalues);
	
	$allbusiness = array();
	while($row = pg_fetch_array($result))
		{
		$business = new stdClass();
		//unset($business);
		//unset($provider);
		//unset($city);
		$business->id = $row['id'];
		$business->name = FetchListbusinesslangname($defultlang,$row['id'],$link);
		$business->enabled = $row['enabled'];
		$business->isimg = $row['isimg'];
		
			pg_prepare($link,'sqlcounnt'.$row['id'],$querycount);
			$resultcount = pg_execute($link,'sqlcounnt'.$row['id'],$conditionalsvalues);

			
		$business->length = pg_num_rows($resultcount);
		
		$business->twiliophone = $row['twiliophone'];
		$business->twilioenabled = $row['twilioenabled'];
		$business->ispopular = $row['is_popular'];
			$city = new stdClass();
		if ($row['cityid']!=null)
			{
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}
	
		$business->city = $city;
		$provider = new stdClass();
		if ($row['provider']!=null)
			{
			$provider->id = $row['provider'];
			$provider->name = $row['providername'];
			$provider->lastname = $row['providerlastname'];
			$provider->lastname2 = $row['providerlastname2'];
			}
			else
			{
			$provider->id = '';
			$provider->name = '';
			$provider->lastname = '';
			$provider->lastname2 = '';
			}

		$business->provider = $provider;
		if($business->name !=null)
		array_push($allbusiness,$business);
		}
	}else{
		$conditionalsvalues = array();
	//array_push($conditionalsvalues,$_SESSION['scriptid']);
	//$query = "SELECT w_business.id,w_business.isimg,w_business.name,w_business.enabled,W_business.w_business.is_popular,w_business.twiliophone,w_business.twilioenabled,w_business.city as cityid, w_franchises.city as cityname,w_business.provider,w_users.name as providername,w_users.lastname as providerlastname,w_users.lastname2 as providerlastname2 FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id AND w_business.scriptid='".$_SESSION['scriptid']."'";

	$query = "SELECT w_business.id,w_business.isimg,w_business.name,w_business.enabled,w_business.is_popular
,w_business.twiliophone,w_business.twilioenabled,w_business.city as cityid, w_franchises.city as cityname
,w_business.provider,w_users.name as providername,w_users.lastname as providerlastname,w_users.lastname2
 as providerlastname2 FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_franchises.admin = w_users.id";
 // WHERE w_business.scriptid='0' AND w_franchises.admin = $1 OR w_business.provider = $2";

	if (!empty($filters))	
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
		$querycount = $query;
		
		$query = $query." AND w_business.scriptid = '".$_SESSION['scriptid']."'";
	//$limit = ' ORDER BY  w_business.id  limit '.$IS_BUSINESS_LIMIT.' offset '.$IS_BUSINESS_START;
	//$query .= $limit;
	/*echo $query;
	print_r($conditionalsvalues);*/
	pg_prepare($link,'sql11',$query);
	$result = pg_execute($link,'sql11',$conditionalsvalues);
	
	$allbusiness = array();
	while($row = pg_fetch_array($result))
		{
			
			
		$business = new stdClass();
		$provider = new stdClass();
		$city = new stdClass();
		$business->id = $row['id'];
		$business->name = FetchListbusinesslangname($defultlang,$row['id'],$link);
		$business->enabled = $row['enabled'];
		$business->isimg = $row['isimg'];
		
			pg_prepare($link,'sqlcounnt'.$row['id'],$querycount);
			$resultcount = pg_execute($link,'sqlcounnt'.$row['id'],$conditionalsvalues);

			
		$business->length = pg_num_rows($resultcount);
		
		$business->twiliophone = $row['twiliophone'];
		$business->twilioenabled = $row['twilioenabled'];
		$business->ispopular = $row['is_popular'];
		if ($row['cityid']!=null)
			{
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}
	
		$business->city = $city;

		if ($row['provider']!=null)
			{
			$provider->id = $row['provider'];
			$provider->name = $row['providername'];
			$provider->lastname = $row['providerlastname'];
			$provider->lastname2 = $row['providerlastname2'];
			}
			else
			{
			$provider->id = '';
			$provider->name = '';
			$provider->lastname = '';
			$provider->lastname2 = '';
			}

		$business->provider = $provider;
		if($business->name !=null)
		array_push($allbusiness,$business);
		}	
		
	}
	pg_close($link);
	return $allbusiness;
	}

function FetchListbusinesslangname($defultlang,$cid,$link){

	pg_prepare($link,'sqlbusinessdefalutlang'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlbusinessdefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}


function countBusiness($id){
	
$link = ConnectDB();
pg_prepare($link,'sql121'.$id,'select  count(id) from w_business');
$result = pg_execute($link,'sql121'.$id,array());
$row = pg_fetch_array($result);
return $row['count'];
}

/********************************************DELETE Business****************************************************************/
function DeleteBusinessById($id){
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	
	
	

		RemoveDir($CFG->dirimages . 'business/' . $id . '/');
		if(IS_REVIEW_ENABLED == 1)
			RemoveDir($_SERVER['DOCUMENT_ROOT']."/pages/business/". $id . '/');

		pg_prepare($link,'sql','DELETE FROM w_business WHERE id=$1');
		pg_execute($link,'sql',array($id));

		pg_prepare($link,'sqllangdele','DELETE FROM w_business_lang WHERE business_id=$1');
		pg_execute($link,'sqllangdele',array($id));

		pg_prepare($link,'sqlcatlang','DELETE FROM w_categories_lang WHERE business_id=$1');
		pg_execute($link,'sqlcatlang',array($id));

		pg_prepare($link,'sqlcat','DELETE FROM w_categories WHERE business=$1');
		pg_execute($link,'sqlcat',array($id));


		//we also have to remove all the dishes extras and menus that belong to the business
		pg_prepare($link,'sqlmenuslang','DELETE FROM w_menus_lang WHERE menus_id in(SELECT id FROM w_menus WHERE business=$1)');
		pg_execute($link,'sqlmenuslang',array($id));

		pg_prepare($link,'sql3','DELETE FROM w_menus WHERE business=$1');
		pg_execute($link,'sql3',array($id));
		
		
		
		pg_prepare($link,'sqldisheslang','DELETE FROM w_dishes_lang WHERE dishes_id in(SELECT id FROM w_dishes WHERE business=$1)');
		pg_execute($link,'sqldisheslang',array($id));

		pg_prepare($link,'sql4','SELECT id FROM w_dishes WHERE business=$1');
		$result = pg_execute($link,'sql4',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'dishes/' . $row['id'] . '/');
				pg_prepare($link,'sql5','DELETE FROM w_dishes WHERE id=$1');
				pg_execute($link,'sql5',array($row['id']));
				}

		pg_prepare($link,'sql6','SELECT id FROM w_extras WHERE business=$1');
		$result = pg_execute($link,'sql6',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'extras/' . $row['id'] . '/');
				pg_prepare($link,'sql7','DELETE FROM w_extras WHERE id=$1');
				pg_execute($link,'sql7',array($row['id']));
				}

				pg_prepare($link,'sqldeliveryzonelang','DELETE FROM w_deliveryzone_lang WHERE deliveryzone_id in(SELECT id FROM w_deliveryzone WHERE businessid=$1)');
				pg_execute($link,'sqldeliveryzonelang',array($id));

				pg_prepare($link,'sqld8','DELETE FROM w_deliveryzone WHERE businessid=$1');
				pg_execute($link,'sqld8',array($id));

				pg_prepare($link,'sqldeliverykmlang','DELETE FROM w_deliverykm_lang WHERE deliverykm_id in(SELECT id FROM w_deliverykm WHERE businessid=$1)');
				pg_execute($link,'sqldeliverykmlang',array($id));
				
				pg_prepare($link,'sqld9','DELETE FROM w_deliverykm WHERE businessid=$1');
				pg_execute($link,'sqld9',array($id));
				
				pg_prepare($link,'sqld10','DELETE FROM w_zipcode WHERE businessid=$1');
				pg_execute($link,'sqld10',array($id));


				pg_prepare($link,'sqldeliverykmlang','DELETE FROM w_gallery_lang WHERE gallery_id in(SELECT id FROM w_gallery WHERE business=$1)');
				pg_execute($link,'sqldeliverykmlang',array($id));
				
				pg_prepare($link,'sqld11','DELETE FROM w_gallery WHERE business=$1');
				pg_execute($link,'sqld11',array($id));
				
				
				
				
				
				
				
				
				
				
		
	pg_close($link);

}
function DeleteBusiness($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	/////////bring delete//////////////
	
				pg_prepare($link,'sqlsss','select bringgcompanyid FROM w_business WHERE id=$1');
				$result8 = pg_execute($link,'sqlsss',array($data->ids));
				$row8 = pg_fetch_array($result8);
				
				/*$url = 'http://api.bringg.com/partner_api/companies/'.$row8['bringgcompanyid'];

			$data_string = array(
			'access_token' => "pyZgq26MSTrjBJys5zxe",
			'timestamp' => date('Y-m-d H:i:s')
			);
			$secret_key = "fATzKYy-phnMUBKdjx8H";
			
			
			$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
			
		
			
			$data_string["signature"] = $signature;
		
			$content = json_encode($data_string);
			
			
			$ch=curl_init($url);
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER,
			array('Content-Type:application/json',
			'Content-Length: ' . strlen($content))
			);
			
		
			
			$json_response = curl_exec($ch);
			
			$status = curl_getinfo($ch);
			
			curl_close($ch);
			$return_data = json_decode($json_response);
			
			echo "<pre>";
			print_r($return_data);
			echo "</pre>";*/
				
				///////////bring delete end////////////	
	
	
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'business/' . $id . '/');
		if(IS_REVIEW_ENABLED == 1)
			RemoveDir($_SERVER['DOCUMENT_ROOT']."/pages/business/". $id . '/');

		pg_prepare($link,'sql','DELETE FROM w_business WHERE id=$1');
		pg_execute($link,'sql',array($id));

		//we also have to remove all the dishes extras and menus that belong to the business
		pg_prepare($link,'sql3','DELETE FROM w_menus WHERE business=$1');
		pg_execute($link,'sql3',array($id));


		pg_prepare($link,'sql4','SELECT id FROM w_dishes WHERE business=$1');
		$result = pg_execute($link,'sql4',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'dishes/' . $row['id'] . '/');
				pg_prepare($link,'sql5','DELETE FROM w_dishes WHERE id=$1');
				pg_execute($link,'sql5',array($row['id']));
				}

		pg_prepare($link,'sql6','SELECT id FROM w_extras WHERE business=$1');
		$result = pg_execute($link,'sql6',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'extras/' . $row['id'] . '/');
				pg_prepare($link,'sql7','DELETE FROM w_extras WHERE id=$1');
				pg_execute($link,'sql7',array($row['id']));
				}

		}
	pg_close($link);
	}
/*************************************Save Schedule **************************************/

function SaveSchedule($data){
//	print_r($data);
	require('../config.php');
	$form = json_decode($data);
	$link = ConnectDB($CFG);
	
	$id = $form->fields->business->value;
	$schedule = $form->fields->schedule->value;

	pg_prepare($link,'sql','UPDATE w_business SET schedule=$1 WHERE id=$2');
	$result = pg_execute($link,'sql',array($schedule,$id));

}



/*******************************************SAVE Business*********************************************************************/

function SaveBusiness($data)
	{
	//ProvidersOnly();
	require('../config.php');
	$link1 = ConnectDB($CFG);
	//$data = parse($data);
	$data = json_decode($data);
	//$businessid = $form->id;
	
	$temp=null;
	$temp = new stdClass();
	$lat_lan=null;
	
	
	
	foreach($data->fields as $name=>$set){
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	
		
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);

		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	
	$form = $data;

	$businessid = $form->id;
	$form->fields->timezone->value = str_replace("@","+",$form->fields->timezone->value);
	$form->fields->timezone->value = str_replace("$","-",$form->fields->timezone->value);
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);
	
	$streetval = $form->fields->street->value;
	$streetlang = explode(",",$streetval);
	
	pg_prepare($link1,'sqlneighborhoodsetting',"SELECT * FROM w_tabsettings");	
	$resn2 = pg_execute($link1,'sqlneighborhoodsetting',array());
	$res = pg_fetch_array($resn2);
	if($res['tab_delivery_neighborhood']=='f'){	
	$colonyval = $form->fields->colony->value;
	$colonylang = explode(",",$colonyval);
	}


	pg_prepare($link1,'sqllangfetchbusiness','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link1,'sqllangfetchbusiness',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}

	foreach($namelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->name->value = $nlang;
		}
	}
	
	foreach($streetlang as $key=>$stlang){
		if($key == $defaultid){
			//$form->fields->street->value = $stlang;
			$form->fields->street->value = str_replace("@@@",",",$stlang);
		}
	}
	if(!empty($colonylang)){
	foreach($colonylang as $key=>$colang){
		if($key == $defaultid){
			$form->fields->colony->value = $colang;
		}
	}
	}
	$temp = new stdClass();
	foreach($form->fields as $name=>$set){
	$temp->$name = new stdClass();
	$temp->$name->value=$set->value;
	}

	
	$lat_lan = parse($temp->location->value);
	
	pg_prepare($link1,'sqlbr','SELECT value FROM w_configs WHERE name=$1');
	$resultbr = pg_execute($link1,'sqlbr',array("BRINGG_ACCESS_TOKEN"));
	$configbr  = pg_fetch_array($resultbr);
	
	pg_prepare($link1,'sqlbr2','SELECT value FROM w_configs WHERE name=$1');
	$resultbr2 = pg_execute($link1,'sqlbr2',array("BRINGG_SECRET_KEY"));
	$configbr2  = pg_fetch_array($resultbr2);

	
	if ($form->type=='create')
		{
		$businessid = InsertQuery('w_business',$temp,$CFG);	
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				//unset($forms->fields);
				$forms = new stdClass();
				$forms->fields = new stdClass();
				$forms->fields->business_id = new stdClass();
				$forms->fields->business_id->ivalue = '';
				$forms->fields->business_id->value = $businessid;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->name_lang = new stdClass();
				$forms->fields->name_lang->value = $nlang;
				$forms->fields->name_lang->ivalue = '';
				
				$forms->fields->street_lang = new stdClass();
				///$forms->fields->street_lang->value = $streetlang[$key];
				$forms->fields->street_lang->value = str_replace("@@@",",",$streetlang[$key]);
				$forms->fields->street_lang->ivalue = '';
				if(!empty($colonylang)){
				$forms->fields->colony_lang = new stdClass();
				$forms->fields->colony_lang->value = $colonylang[$key];
				$forms->fields->colony_lang->ivalue = '';
				}else{
				$forms->fields->colony_lang = new stdClass();
				$forms->fields->colony_lang->value = $form->fields->colony->value;
				$forms->fields->colony_lang->ivalue = '';	
				}
				

				InsertQuery('w_business_lang',$forms->fields,$CFG);
			}				
		}
		
		//////////////bring////////////////////
			/*$url = 'http://api.bringg.com/partner_api/companies';
			
			$data_string = array(
			'name' => $temp->name->value,
			'address' => $temp->street->value,
			'lat' => $lat_lan->latitud,
			'lng' => $lat_lan->longitud,
			'phone' => $temp->tel->value,
			'access_token' => $configbr['value'],
			'timestamp' => date('Y-m-d H:i:s')
			);
			$secret_key = $configbr2['value'];
			
			
			$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
			
			
			
			$data_string["signature"] = $signature;
		
			$content = json_encode($data_string);
			
			
			$ch=curl_init($url);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json',
			'Content-Length: ' . strlen($content))
			);
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			
			$json_response = curl_exec($ch);
			
			$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			
			if ( $status != 201 ) {
			
			}
			
			curl_close($ch);
			
			$response = json_decode($json_response, true);
					
			$bring_company_id = $response['company']['id'];
			$link1 = ConnectDB($CFG);
			pg_prepare($link1,'sqlbr1','UPDATE w_business SET bringgcompanyid=$1 WHERE id=$2');
			pg_execute($link1,'sqlbr1',array($bring_company_id,$businessid));*/
			
		
		//////////////bring end////////////////
		
		
		if (!is_dir("../../orders/".$businessid)) {
			mkdir("../../orders/".$businessid); 
			
		$link1 = ConnectDB($CFG);	
		pg_prepare($link1,'sql6','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link1,'sql6',array("siteurl"));
		$configRec  = pg_fetch_array($result3);
		$url=$configRec['value']."/orders/".$businessid.".txt";
		$url2=$configRec['value']."/confirm.php";	
		
			pg_prepare($link1,'sql1','UPDATE w_business SET pfp=$1,cfp=$2 WHERE id=$3');
			pg_execute($link1,'sql1',array($url,$url2,$businessid));
		}
    if ($form->dishes)
			{
			$link = ConnectDB($CFG);
			$ids = explode(',',$form->dishes);
			foreach($ids as $id)
				{
				pg_prepare($link,'sql','UPDATE w_dishes SET business=$1 WHERE id=$2');
				$result = pg_execute($link,'sql',array($businessid,$id));
				}
			pg_close($link);
			}	
		if ($form->extras)
			{
			$link = ConnectDB($CFG);
			$ids = explode(',',$form->extras);
			foreach($ids as $id)
				{
				pg_prepare($link,'sql','UPDATE w_extras SET business=$1 WHERE id=$2');
				$result = pg_execute($link,'sql',array($businessid,$id));
				}
			pg_close($link);
			}
		if ($form->menus)
			{
			$link = ConnectDB($CFG);
			$ids = explode(',',$form->menus);
			foreach($ids as $id)
				{
				pg_prepare($link,'sql','UPDATE w_menus SET business=$1 WHERE id=$2');
				$result = pg_execute($link,'sql',array($businessid,$id));
				}
			pg_close($link);
			}
			
		}
		else{
			
			pg_prepare($link1,'sqlbus','SELECT bringgcompanyid FROM w_business WHERE id=$1');
			$resultsqlbus = pg_execute($link1,'sqlbus',array($businessid));
			$configresultsqlbus  = pg_fetch_array($resultsqlbus);
			
			if(is_null($configresultsqlbus['bringgcompanyid']) == true || ($configresultsqlbus['bringgcompanyid']) == ''){
				
				
			
			//////////////bring////////////////////
			$url = 'http://api.bringg.com/partner_api/companies';
			date_default_timezone_set($zone);
			$data_string = array(
			'name' => $temp->name->value,
			'address' => $temp->street->value,
			'lat' => $lat_lan->latitud,
			'lng' => $lat_lan->longitud,
			'phone' => $temp->tel->value,
			'access_token' => $configbr['value'],
			'timestamp' => date('Y-m-d H:i:s')
			);
			$secret_key = $configbr2['value'];
			
			
			$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
			
			
			
			$data_string["signature"] = $signature;
		
			$content = json_encode($data_string);
			
			
			$ch=curl_init($url);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json',
			'Content-Length: ' . strlen($content))
			);
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			
			$json_response = curl_exec($ch);
			
			$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			
			if ( $status != 201 ) {
			
			}
			
			curl_close($ch);
			
			$response = json_decode($json_response, true);
					
			$bring_company_id = $response['company']['id'];
			$link1 = ConnectDB($CFG);
			pg_prepare($link1,'sqlbr1','UPDATE w_business SET bringgcompanyid=$1 WHERE id=$2');
			pg_execute($link1,'sqlbr1',array($bring_company_id,$businessid));
			
		
		//////////////bring end////////////////
							
			}else{
				
					$url = 'http://api.bringg.com/partner_api/companies/'.$configresultsqlbus['bringgcompanyid'];

						$data_string = array(
						'name' => $temp->name->value,
						'address' => $temp->street->value,
						'phone' => $temp->tel->value,
						'country_code' => "US",
						'access_token' => $configbr['value'],
						'timestamp' => date('Y-m-d H:i:s')
						);
						$secret_key = $configbr2['value'];
					
						$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
						
					
						
						$data_string["signature"] = $signature;
						
				
						
						$content = json_encode($data_string);
				
						$ch=curl_init($url);
						curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
						curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
						curl_setopt($ch, CURLOPT_HEADER, false);
						curl_setopt($ch, CURLOPT_HTTPHEADER,
						array('Content-Type:application/json',
						'Content-Length: ' . strlen($content))
						);
					
						
						$json_response = curl_exec($ch);
						
						$status = curl_getinfo($ch);
						
						curl_close($ch);
						$response = json_decode($json_response, true);
								
						$bring_company_id = $response['company']['id'];
						$link1 = ConnectDB($CFG);
						pg_prepare($link1,'sqlbr1','UPDATE w_business SET bringgcompanyid=$1 WHERE id=$2');
						pg_execute($link1,'sqlbr1',array($bring_company_id,$businessid));
				
			}
			
			UpdateQuery('w_business',$temp,$form->id,$CFG);
			
			foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearchbusinessdata'.$key,'SELECT * FROM w_business_lang where lang_id=$1 AND business_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearchbusinessdata'.$key,array($key,$businessid));
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->business_id = new stdClass();
					$forms->fields->business_id->ivalue = '';
					$forms->fields->business_id->value = $businessid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->street_lang = new stdClass();
				//	$forms->fields->street_lang->value = $streetlang[$key];
					$forms->fields->street_lang->value = str_replace("@@@",",",$streetlang[$key]);
					$forms->fields->street_lang->ivalue = '';
					
					if(!empty($colonylang)){
					$forms->fields->colony_lang = new stdClass();
					$forms->fields->colony_lang->value = $colonylang[$key];
					$forms->fields->colony_lang->ivalue = '';
					}else{
					$forms->fields->colony_lang = new stdClass();
					$forms->fields->colony_lang->value = $form->fields->colony->value;
					$forms->fields->colony_lang->ivalue = '';	
					}

					InsertQuery('w_business_lang',$forms->fields,$CFG);

				}else{
					
					if(!empty($colonylang)){
						$colonyval = $colonylang[$key];
					}else{
						$colonyval = $form->fields->colony->value;
					}
					$e = str_replace("@@@",",",$streetlang[$key]);
					pg_prepare($link,'sqllangupdatebdata'.$key,'UPDATE w_business_lang SET name_lang=$1,street_lang=$2,colony_lang=$3 where lang_id=$4 and business_id=$5');
					pg_execute($link,'sqllangupdatebdata'.$key,array($nlang,$e,$colonyval,$key,$businessid));					
				}
									
			}				
		}
		
		if (!is_dir("../../orders/".$businessid)) {
			mkdir("../../orders/".$businessid); 
			$link1 = ConnectDB($CFG);
			
		pg_prepare($link1,'sql6','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link1,'sql6',array("siteurl"));
		$configRec  = pg_fetch_array($result3);
		$url=$configRec['value']."/orders/".$businessid.".txt";
		$url2=$configRec['value']."/confirm.php";	
		
			pg_prepare($link1,'sql1','UPDATE w_business SET pfp=$1,cfp=$2 WHERE id=$3');
			pg_execute($link1,'sql1',array($url,$url2,$businessid));
		}
			}

	echo $businessid;
	
   	 
	//check if image is sended, create destiny dir if doesnt exist
	if ($form->image){
			$oldname = $CFG->dir.'temp/'.$form->image;
			MoveBusinessImages($CFG->dirimages . 'business/',$oldname,$businessid);
			$link = ConnectDB();		
			pg_prepare($link,'sql','UPDATE w_business SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql',array(1,$businessid));
			pg_close($link);
	}
	else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	 if ($form->type=='create')
	   {
	    	
		
			$link = ConnectDB();		
			pg_prepare($link,'sql','UPDATE w_business SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql',array(0,$businessid));
			pg_close($link);
		
        }
		
	//check if image is sended, create destiny dir if doesnt exist
	if ($form->imageheader){
			$oldname = $CFG->dir.'temp/'.$form->imageheader;
			MoveBusinessImagesBanner($CFG->dirimages . 'banner/',$oldname,$businessid);
			$link = ConnectDB();		
			pg_prepare($link,'sqlbanner','UPDATE w_business SET isimgh=$1 WHERE id=$2');
			pg_execute($link,'sqlbanner',array(1,$businessid));
			pg_close($link);
	    }
	else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	 if ($form->type=='create'){
			$link = ConnectDB();		
			pg_prepare($link,'sqlbanner','UPDATE w_business SET isimgh=$1 WHERE id=$2');
			pg_execute($link,'sqlbanner',array(0,$businessid));
			pg_close($link);
        }
	
	
	}


/************************************************************DISH**********************************************************/

function GetDishesDataByIds($ids)
	{
	$link = ConnectDB();	

	$ids = explode(',',$ids);
	$dishes = array();

	foreach($ids as $id)
		{
		$query = 'SELECT w_dishes.*,w_categories.name as category FROM w_dishes LEFT JOIN w_categories ON w_dishes.category = w_categories.id  WHERE w_dishes.id=$1';
		pg_prepare($link,'sql' . $id,$query);
		$result = pg_execute($link,'sql' . $id,array($id));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
			//	unset($dish);
				$dish = new stdClass();
				$dish->id = $id;
				$dish->name= $row['name'];
				$dish->category = $row['category'];
				$dish->price = $row['price'];
				$dish->enabled = $row['enabled'];
				$dish->thirdparty = $row;
				array_push($dishes,$dish);
				}
		}

	echo json_encode($dishes);
	pg_close($link);
	}


function GetDishesDataByBusiness($id)
	{
	$link = ConnectDB();	
	
	pg_prepare($link,'sqldishesdefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldishesdefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	$query = 'SELECT currency from w_business where id=$1';
	pg_prepare($link,'sqlcurrency',$query);
	$result1 = pg_execute($link,'sqlcurrency',array($id));
	$row1 = pg_fetch_array($result1);
	$row1['currency'] = currency_symbol($row1['currency']);
	
	$query = 'SELECT w_dishes.id,w_dishes.name,w_dishes.enabled,w_dishes.price,w_dishes.points,w_dishes.category,w_dishes.stock_qty FROM w_dishes LEFT JOIN w_categories ON w_dishes.category = w_categories.id  WHERE w_dishes.business=$1 AND w_dishes.scriptid=$2';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id,$_SESSION['scriptid']));
	$dishes = array();
	while($row = pg_fetch_array($result))
		{
		$dish = new stdClass();
	//	unset($dish);
		$dish->id = $row['id'];
		$dish->name = FetchDishesLangDefault($defultlang,$row['id'],$link);
		$dish->category = FetchDishesCateLangDefault($defultlang,$row['category'],$link,$row['id']);
		$dish->price = $row['price'];
		$dish->enabled = $row['enabled'];
		$dish->currency = $row1['currency'];
		$dish->points = $row['points'];
		$dish->stock_qty = $row['stock_qty'];
		array_push($dishes,$dish);
		}
	echo json_encode($dishes);
	pg_close($link);
	}
	

function FetchDishesLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_dishes_lang WHERE dishes_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
function FetchDishesCateLangDefault($defultlang,$cid,$link,$cx){
	pg_prepare($link,'sqldefalutlang555'.$cid.$cx,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang555'.$cid.$cx,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}



function GetDishData($id)
	{
	ProvidersOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_dishes WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqldisheslang','SELECT * FROM w_dishes_lang WHERE dishes_id=$1');
	$result1 = pg_execute($link,'sqldisheslang',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$dish = new stdClass();
		//	unset($dish);
			$dish->id = $id;
			
			$namearray=array();				
			$langidarray = array();
			$descriptionarray = array();
			$originarray = array();
			$sellerarray = array();
			while($row1 = pg_fetch_array($result1))
			{
				$namearray[$row1['lang_id']] = $row1['name_lang'];
				$descriptionarray[$row1['lang_id']] = $row1['description_lang'];
				$originarray[$row1['lang_id']] = $row1['origin_winelibary_lang'];
				$sellerarray[$row1['lang_id']] = $row1['seller_winelibary_lang'];
				$langidarray[$row1['lang_id']] = $row1['id'];
			
			}
			
			$dish->name = $namearray;
			$dish->description = $descriptionarray;
			$dish->langid = $langidarray;
			$dish->ingredients = $row['ingredients'];
			$dish->extras = $row['extras'];
			$dish->price = $row['price'];
			$dish->feature = $row['feature'];
			$dish->category = $row['category'];
			$dish->subcategory = $row['subcategory'];
			$dish->origin_winelibary = $originarray;
			$dish->seller_winelibary = $sellerarray;
			$dish->thirdparty = $row;
			$dish->isimg = $row['isimg'];
			$dish->isimg2 = $row['isimg2'];
			$dish->isimg3 = $row['isimg3'];
			$dish->points =$row['points'];
			$dish->deliveryprice =$row['deliveryprice'];
			$dish->stock_qty =$row['stock_qty'];
		
			}

	echo json_encode($dish);
	pg_close($link);
	}


function SaveDish($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB();
	$data = json_decode($data);
	$temp=null;
//	$temp = new stdClass();
	
	foreach($data->fields as $name=>$set){

		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);

		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);

	}
	
	$form = $data;
	
	$dishid = $form->id;
	
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);

	
	$descriptionval = $form->fields->description->value;
	$descriptionlang = explode(",",$descriptionval);
	
	$originval = $form->fields->origin_winelibary->value;
	$originlang = explode(",",$originval);
	
	$sellerval = $form->fields->seller_winelibary->value;
	$sellerlang = explode(",",$sellerval);
	
	
	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	
	foreach($namelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->name->value = str_replace("@@@",",",$nlang);
		}
	}
	
	foreach($descriptionlang as $key=>$deslang){		
		
		if($key == $defaultid){
			$form->fields->description->value = str_replace("@@@",",",$deslang);
		}
	}
	
	foreach($originlang as $key=>$origlang){		
		
		if($key == $defaultid){
			$form->fields->origin_winelibary->value = str_replace("@@@",",",$origlang);
		}
	}
	foreach($sellerlang as $key=>$sellrlang){		
		
		if($key == $defaultid){
			$form->fields->seller_winelibary->value = str_replace("@@@",",",$sellrlang);
		}
	}
	
	
	$temp = new stdClass();
	foreach($form->fields as $name=>$set){
		
		$temp->$name = new stdClass();
		//$form->$name = new stdClass();
		$temp->$name->value=$set->value;
		}
		//print_r($temp);
		/*if($temp->points->value == "") {
			
			 $temp->points->value = 0;
			 
			}*/
	//print_r($temp->points->value);
	

	if ($form->type=='create')
		{
		$dishid = InsertQuery('w_dishes',$temp,$CFG);	
		echo $dishid;
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
			$forms = new stdClass();	
				//unset($forms->fields);
				$forms->fields = new stdClass();
				$forms->fields->dishes_id = new stdClass();
				$forms->fields->dishes_id->ivalue = '';
				$forms->fields->dishes_id->value = $dishid;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->name_lang = new stdClass();
				$forms->fields->name_lang->value = str_replace("@@@",",",$nlang);
				$forms->fields->name_lang->ivalue = '';
				
				$forms->fields->description_lang = new stdClass();
				$forms->fields->description_lang->value = str_replace("@@@",",",$descriptionlang[$key]);
				$forms->fields->description_lang->ivalue = '';
				
				$forms->fields->origin_winelibary_lang = new stdClass();
				$forms->fields->origin_winelibary_lang->value = str_replace("@@@",",",$originlang[$key]);
				$forms->fields->origin_winelibary_lang->ivalue = '';
				
				$forms->fields->seller_winelibary_lang = new stdClass();
				$forms->fields->seller_winelibary_lang->value = str_replace("@@@",",",$sellerlang[$key]);
				$forms->fields->seller_winelibary_lang->ivalue = '';
				
				

				InsertQuery('w_dishes_lang',$forms->fields,$CFG);
			}				
		}
		
		}
		else
		UpdateQuery('w_dishes',$temp,$form->id,$CFG);
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_dishes_lang where lang_id=$1 AND dishes_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$dishid));
				//echo pg_num_rows($resultsearch);
				$nalang = str_replace("@@@",",",$nlang);
				$deslang = str_replace("@@@",",",$descriptionlang[$key]);
				$origlang = str_replace("@@@",",",$originlang[$key]);
				$selllang = str_replace("@@@",",",$sellerlang[$key]);
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->dishes_id = new stdClass();
					$forms->fields->dishes_id->ivalue = '';
					$forms->fields->dishes_id->value = $dishid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = str_replace("@@@",",",$nlang);
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->description_lang = new stdClass();
					$forms->fields->description_lang->value = str_replace("@@@",",",$descriptionlang[$key]);
					$forms->fields->description_lang->ivalue = '';
					
					
					$forms->fields->origin_winelibary_lang = new stdClass();
					$forms->fields->origin_winelibary_lang->value = str_replace("@@@",",",$originlang[$key]);
					$forms->fields->origin_winelibary_lang->ivalue = '';
					
					$forms->fields->seller_winelibary_lang = new stdClass();
					$forms->fields->seller_winelibary_lang->value = str_replace("@@@",",",$sellerlang[$key]);
					$forms->fields->seller_winelibary_lang->ivalue = '';

					InsertQuery('w_dishes_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_dishes_lang SET name_lang=$1,description_lang=$2,origin_winelibary_lang=$3,seller_winelibary_lang=$4 where lang_id=$5 and dishes_id=$6');
					pg_execute($link,'sqllangupdate',array($nalang,$deslang,$origlang,$selllang,$key,$dishid));					
				}
				pg_close($link);					
			}				
		}
        
	
		//check if image is sended, create destiny dir if doesnt exist
		if ($form->image1){
			
			  $oldname = $CFG->dir.'temp/'.$form->image1;
			  MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,false,'/1');
			  $link = ConnectDB();		
			  pg_prepare($link,'sql1','UPDATE w_dishes SET isimg=$1 WHERE id=$2');
			  pg_execute($link,'sql1',array(1,$dishid));
			  pg_close($link);
		}
		else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
		if ($form->type=='create'){
			
			  $link = ConnectDB();		
			  pg_prepare($link,'sql1','UPDATE w_dishes SET isimg=$1 WHERE id=$2');
			  pg_execute($link,'sql1',array(0,$dishid));
			  pg_close($link);
		}

		//check if image is sended, create destiny dir if doesnt exist
		if ($form->image2){
			
			  $oldname = $CFG->dir.'temp/'.$form->image2;
			  MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,false,'/2');
			  $link = ConnectDB();		
			  pg_prepare($link,'sql2','UPDATE w_dishes SET isimg2=$1 WHERE id=$2');
			  pg_execute($link,'sql2',array(1,$dishid));
			  pg_close($link);
		}
		else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
		if ($form->type=='create'){
			
			  $link = ConnectDB();		
			  pg_prepare($link,'sql2','UPDATE w_dishes SET isimg2=$1 WHERE id=$2');
			  pg_execute($link,'sql2',array(0,$dishid));
			  pg_close($link);
		}

		//check if image is sended, create destiny dir if doesnt exist
		if ($form->image3){
			
			  $oldname = $CFG->dir.'temp/'.$form->image3;
			  MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,false,'/3');
			  $link = ConnectDB();		
			  pg_prepare($link,'sql3','UPDATE w_dishes SET isimg3=$1 WHERE id=$2');
			  pg_execute($link,'sql3',array(1,$dishid));
			  pg_close($link);
		}
		else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
		if ($form->type=='create'){
			
			  $link = ConnectDB();		
			  pg_prepare($link,'sql3','UPDATE w_dishes SET isimg3=$1 WHERE id=$2');
			  pg_execute($link,'sql3',array(0,$dishid));
			  pg_close($link);
		}
	}

function DeleteDish($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'dishes/' . $id . '/');
		pg_prepare($link,'sql' . $id,'DELETE FROM w_dishes WHERE id=$1');
		$result = pg_execute($link,'sql' . $id,array($id));
		
		pg_prepare($link,'sql0','DELETE FROM w_dishes_lang WHERE dishes_id=$1');
		$result = pg_execute($link,'sql0',array($id));
		}
	pg_close($link);
	}

/******************************************************************/


function DeleteExtra($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	pg_prepare($link,'sql1','SELECT * FROM w_extras_options WHERE set_id=$1');
	pg_prepare($link,'sql2','DELETE FROM w_extras_options WHERE set_id=$1');
	pg_prepare($link,'sql3','DELETE FROM w_extras_options_lang WHERE extras_id=$1');
	foreach ($data->ids as $id){
		RemoveDir($CFG->dirimages . 'extras/' . $id . '/');
		pg_prepare($link,'sql'.$id,'DELETE FROM w_extras WHERE id=$1');
		$result = pg_execute($link,'sql'.$id,array($id));	
		
		pg_prepare($link,'sql0'.$id,'DELETE FROM w_extras_lang WHERE extras_id=$1');
		$result = pg_execute($link,'sql0'.$id,array($id));
		
		$result1 = pg_execute($link,'sql1',array($id));		
		pg_execute($link,'sql2',array($id));
		while($row1 = pg_fetch_array($result1)){
			pg_execute($link,'sql3',array($row1['id']));			
		}


	}
	pg_close($link);
	}




/************************************************************/

function GetMenusDataByIds($ids)
	{
	$link = ConnectDB();	

	$ids = explode(',',$ids);
	$menus = array();

	foreach($ids as $id)
		{
		$query = 'SELECT name,days,dishes,schedule,comments,enabled FROM w_menus WHERE id=$1';
		pg_prepare($link,'sql',$query);
		$result = pg_execute($link,'sql',array($id));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				unset($menu);
				$menu->id = $id;
				$menu->name = $row['name'];
				$menu->days = $row['days'];
				$menu->dishes= $row['dishes'];
				$menu->schedule= $row['schedule'];
				$menu->comments = $row['comments'];
				$menu->enabled = $row['enabled'];
				array_push($menus,$menu);
				}
		}

	echo json_encode($menus);
	pg_close($link);
	}


function GetMenusDataByBusiness($id)
	{
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlangmenu = $rows['id'];
	}else{
	$defultlangmenu = $_SESSION['admin_lang'];	
	}
		
	$query = 'SELECT id,name,days,dishes,schedule,comments,enabled,pickup,delivery,scriptid FROM w_menus WHERE business=$1 AND scriptid=$2';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id,$_SESSION['scriptid']));
	$menus = array();
	while($row = pg_fetch_array($result))
		{
		$menu = new stdClass();
	//	unset($menu);
		$menu->id = $row['id'];
		$menu->name = FetchMenusDataDefault($defultlangmenu,$row['id'],$link);
		$menu->days = $row['days'];
		$menu->dishes= $row['dishes'];
		$menu->schedule= $row['schedule'];
		$menu->comments = FetchMenusDataCommentsDefault($defultlangmenu,$row['id'],$link);
		$menu->enabled = $row['enabled'];
		$menu->pickup = $row['pickup'];
		$menu->delivery = $row['delivery'];
		array_push($menus,$menu);
		}
	echo json_encode($menus);
	pg_close($link);
	}

function FetchMenusDataDefault($defultlangmenu,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_menus_lang WHERE menus_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlangmenu));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
function FetchMenusDataCommentsDefault($defultlangmenu,$cid,$link){
	pg_prepare($link,'sqldefalutcommentslang'.$cid,'SELECT * from w_menus_lang WHERE menus_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutcommentslang'.$cid,array($cid,$defultlangmenu));
	$rows = pg_fetch_array($result1);
	return $rows['comments_lang'];
}


function GetMenuData($id)
	{
	if(IS_REVIEW_ENABLED == 1)
		ProvidersOnly();
	else
		ProvidersOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT name,days,dishes,comments,schedule,pickup,delivery,btype FROM w_menus WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqlmenuslang','SELECT * FROM w_menus_lang WHERE menus_id=$1');
	$result1 = pg_execute($link,'sqlmenuslang',array($id));
	

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$menu = new stdClass();
		//	unset($menu);
			$menu->id = $id;
			
			$menunamearray=array();				
			$menulangid = array();
			$commentsarray = array();
			while($row1 = pg_fetch_array($result1))
			{
				$menunamearray[$row1['lang_id']] = $row1['name_lang'];
				$commentsarray[$row1['lang_id']] = $row1['comments_lang'];
				$menulangid[$row1['lang_id']] = $row1['id'];
			
			}	
			
			$menu->comments = $commentsarray;			
			$menu->langid = $menulangid;
			$menu->name = $menunamearray;
			$menu->days = $row['days'];
			$menu->dishes= $row['dishes'];
			$menu->schedule = $row['schedule'];
			$menu->pickup = $row['pickup'];
			$menu->delivery = $row['delivery'];
			$menu->btype =$row['btype'];
			}

	echo json_encode($menu);
	pg_close($link);
	}


function SaveMenu($data)
	{
	ProvidersOnly();

	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);
	$temp=null;
	
	foreach($data->fields as $name=>$set){

		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);

		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	


		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	$form = $data;
	$menuid = $form->id;
	
	$menunameval = $form->fields->name->value;
	$menunamelang = explode(",",$menunameval);
	
	$commentsval = $form->fields->comments->value;
	$commentslang = explode(",",$commentsval);
	
	pg_prepare($link,'sqllangfetchmenu','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetchmenu',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($menunamelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->name->value = $nlang;
		}
	}
	
	foreach($commentslang as $key=>$comlang){
		if($key == $defaultid){
			$form->fields->comments->value = $comlang;
		}
	}

	foreach($form->fields as $name=>$set){
		$form->$name = new stdClass();
		$temp->$name->value=$set->value;
		}
	
	if ($form->type=='create')
		{
		$menuid = InsertQuery('w_menus',$temp);	
		echo $menuid;
		
		foreach($menunamelang as $key=>$nlang){
			if(!empty($nlang)){		
				unset($forms->fields);
				$forms->fields->menus_id = new stdClass();
				$forms->fields->menus_id->ivalue = '';
				$forms->fields->menus_id->value = $menuid;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->name_lang = new stdClass();
				$forms->fields->name_lang->value = $nlang;
				$forms->fields->name_lang->ivalue = '';
				
				$forms->fields->comments_lang = new stdClass();
				$forms->fields->comments_lang->value = $commentslang[$key];
				$forms->fields->comments_lang->ivalue = '';

				InsertQuery('w_menus_lang',$forms->fields,$CFG);
			}				
		}
		
		}
		else
		UpdateQuery('w_menus',$temp,$form->id);
		
		foreach($menunamelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_menus_lang where lang_id=$1 AND menus_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$menuid));
				echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->menus_id = new stdClass();
					$forms->fields->menus_id->ivalue = '';
					$forms->fields->menus_id->value = $menuid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->comments_lang = new stdClass();
					$forms->fields->comments_lang->value = $commentslang[$key];
					$forms->fields->comments_lang->ivalue = '';

					InsertQuery('w_menus_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_menus_lang SET name_lang=$1,comments_lang=$2 where lang_id=$3 and menus_id=$4');
					pg_execute($link,'sqllangupdate',array($nlang,$commentslang[$key],$key,$menuid));					
				}
				pg_close($link);					
			}				
		}
	}


function DeleteMenu($data)
	{
	ProvidersOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_menus WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		
		pg_prepare($link,'sqlmenulang0','DELETE FROM w_menus_lang WHERE menus_id=$1');
		$result = pg_execute($link,'sqlmenulang0',array($id));
		}
	pg_close($link);
	}


/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveBusinessImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	//$ext_arr = split("\.",$form->image);
	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require_once('resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);

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

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

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
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
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

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image->gray();		
		$image->save($folder.'minigray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(110,110);
		$image->save($folder.'medium.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(299,204);
		$image->save($folder.'panel.jpg');
		
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(399,307);
		$image->save($folder.'admin.jpg');
		}
	}

function MoveBusinessImagesBanner($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require_once('resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);

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

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

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
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
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

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

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
	}
/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	echo $finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require_once('resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);

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
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
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
	}


function CreatePage($usrid,$form)
{

 
	$folder = $_SERVER['DOCUMENT_ROOT']."/pages/business/".$usrid;
	$finalname = $folder.'/index.php';
  
  
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);   
  
  
 
  $addfile = $_SERVER['DOCUMENT_ROOT']."/panel/lib/panel-review.php";
  $template = $_SERVER['DOCUMENT_ROOT']."pages/business/Template.php"; 
	$file = fopen($finalname, "w+");
	$phpfile = file_get_contents("../../pages/business/Template.php");
  $archivo  = "<?php \n";
  $archivo .= 'require ("'.$addfile.'");'."\n";
  $archivo .= '$orden = $_GET["order"];'."\n".'$orden_array = GetReviewData($orden);';
  $archivo .= "\n".'if($orden_array->count==1) {
				?>
					<script>
					alert("The order does not exist !");
					var url_part=document.location.href.split("/");
					var url_complete = "http://"+url_part[2];
					location.href = url_complete;
					</script>
				<?php
				}
	';
  $archivo .= '$business ='.$usrid.';'."\n";
  $archivo .= '$city = GetBusinessCity('.$form->city->value.');'."\n";
  $archivo .= '$average_array = GetReviewDataAvg('.$usrid.');'."\n";
  $archivo .= '$paymentDetails = GetPaymentDetails('.$usrid.');'."\n";
  $archivo .= '$average = round($average_array->total);'."\n";
  $archivo .= 'for($i=0;$i<5;$i++){'."\n";
  $archivo .= 'if ($average>=1){'."\n";
  $archivo .= '$stars[$i] = "star2";'."\n";
  $archivo .= '$average = $average - 1;';
  $archivo .= ' }'."\n".'else';
  $archivo .= '$stars[$i] = "star1";'."\n".'}'."\n";
  $archivo .= '$business_addres ="'.$form->street->value.' '.$form->colony->value.'";'."\n";
  $archivo .= '$business_name = "'.$form->name->value.'";';
  $archivo .= 'if($orden_array->count > 0)'."\n".'{'."\n".'error();}';
  $archivo .= 'function error(){'."\n";
  $archivo .= 'echo "<script languaje=\"javascript\">'."\n";
  $archivo .= ' alert(\"Expired link!\");'."\n";
  $archivo .= 'var url_part=document.location.href.split(\"/\");'."\n";
  $archivo .= 'var url_complete = \"http://\"+url_part[2];'."\n";
  $archivo .= 'location.href = url_complete;'."\n";
  $archivo .= '</script>";'."\n";
  $archivo .= '}?>';
  $archivo .= '<html><head>'."\n";
  $archivo .= '<title><?echo $business_name;?></title>';
	$archivo .= '<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,800"/>'."\n";
	$archivo .= '<link href="http://'.$_SERVER["HTTP_HOST"]."/panel/js/rating.css".'" rel="stylesheet" type="text/css"/>'."\n";
	$archivo .= '<link type="text/css" rel="stylesheet" href="http://'.$_SERVER["HTTP_HOST"]."/panel/theme/front.php?v=1.3.2".'"/>'."\n";
	$archivo .= '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>'."\n";
	$archivo .= '<script type="text/javascript" src="http://'.$_SERVER["HTTP_HOST"]."/panel/js/review.js".'"></script>'."\n";
	$archivo .= '<script type="text/javascript" src="http://'.$_SERVER["HTTP_HOST"]."/panel/js/jquery.js".'"></script>'."\n";
  $archivo .= '<Meta Name="Keywords" Content="'.$form->mkeywords->value.'">';
  $archivo .= '<META NAME="description" CONTENT="'.$form->mdescription->value.'"> ';
  $archivo .= '<meta name="title" content="'.$form->name->value.'">';
	
	fwrite($file,$archivo);  
  fwrite($file,$phpfile);
  fclose($file);  
  
}
        
    
function SetEnabled($id,$enabled,$type)
	{
	ProvidersOnly();
	
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_'.$type.' SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
function checkslug($data)
	{
		$form = parse($data);
		
		
		
	
	
	
	
	$link = ConnectDB();	
	$lang = $form->value;
	pg_prepare($link,'sql','SELECT * FROM w_business WHERE customslug=$1 AND scriptid=$2');
	$final = pg_execute($link,'sql',array($lang,$_SESSION['scriptid']));
	
	$rec = pg_num_rows($final);
	if($form->value == $form->ivalue)
	{
		$rec = $rec-1;
	}
	
	
     if($rec > 0)
		{
			echo "cancel";
		}
	 else {
		 
		   echo "okay";
		}	
		
	
	}	

/********************************************product option***********************************************************************/

function SaveExtraChoice($data){
    ProvidersOnly();
    require('../config.php');
    session_start();
    $link = ConnectDB($CFG);
    /*pg_prepare($link,'sql1',"SELECT nextval('w_extras_id_seq') as key");
  $result = pg_execute($link,'sql1',array());*/
    $form = parse($data);
    $i=0;
    $temp=null;

    $set_id=$_SESSION['set_id'];
    $ch=0;
    if($form->rank==1)
    {

    foreach ($form->fields as $t) {
        if($t->value != "null"){

                if($i==0)
                    $temp->name->value=$t->value;
                if($i==1)
                {
                    $temp->price->value=$t->value;
                    $temp->option_id->value=$form->option_id;
                    $temp->set_id->value=$form->set_id;
                    $extradetailsid = InsertQuery('w_choices',$temp,$CFG);
                    $temp=null;
                    $i=-1;
                    }
                $i++;
            }
        }
    }

   else if($form->rank>=2)
            {
                $temp_array=null;
                  $i=0;
              foreach ($form->fields as $t) {
              if($t->value!="null")
                 $temp_array[]=$t->value;

              }

    for($j=0;$j<count($temp_array);$j++){
        $name=$temp_array[$j];
    for($ch=0;$ch<count($form->chooice_array);$ch++)
    {
        $temp->name->value=$name;
        $temp->option_id->value=$form->option_id;
        $temp->set_id->value=$form->set_id;
        $temp->with_respect_to->value=$form->chooice_array[$ch];
        $temp->price->value=$temp_array[++$j];
        $extradetailsid = InsertQuery('w_choices',$temp,$CFG);
        /*if($j==0)*/

        /* if($j==1)*/
        //   $temp->price->value=$t->value;
      //  $temp->option_id->value=$form->option_id;
        $temp=null;


    }

    }
 }


    /*   if($i==1)
        $temp->option_text_to_end_user->value=$t->value;
    if($i==2)
        $temp->num_choice->value=$t->value;
    if($i==3){
        $temp->rank->value=$t->value;

        $i=-1;
        $temp->set_id->value=$set_id;
        $extradetailsid = InsertQuery('w_extras_details',$temp,$CFG);
        $temp=null;
    }
    $i++;*/



}
function GetChoice(){
    ProvidersOnly();
    require('../config.php');
    session_start();
    $id=$_SESSION['set_id'];

    $link = ConnectDB();
    $query = 'SELECT option_name,num_choice,set_id,rank,id FROM w_extras_details WHERE set_id=$1 ORDER BY rank ASC';
    pg_prepare($link,'sql5',$query);
    $result = pg_execute($link,'sql5',array($id));
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
            unset($menu);
            $menu->option_name = $row['option_name'];
            $menu->num_choice = $row['num_choice'];
            $menu->set_id = $row['set_id'];
            $menu->rank = $row['rank'];
            $menu->option_id=$row['id'];
            array_push($menus,$menu);
        }

    echo json_encode($menus);
    pg_close($link);

}
function GetExtrasDetails($set_id)
{

    require('../config.php');
    session_start();

    $link = ConnectDB();
    $query = 'SELECT set_id,id,option_name,option_text_to_end_user FROM w_extras_details WHERE set_id=$1';
    pg_prepare($link,'sql',$query);
    $result = pg_execute($link,'sql',array($set_id));
    $extras = array();
    while($row = pg_fetch_array($result))
    {
        unset($extra);
        $extra->id = $row['id'];
        $extra->option_name= $row['option_name'];
        $extra->set_id = $row['set_id'];
        array_push($extras,$extra);
    }
        echo json_encode($extras);
        pg_close($link);

}
function SaveExtraOptions($data)
{
    ProvidersOnly();
    require('../config.php');
    session_start();
	$link = ConnectDB();
	$data = json_decode($data);
	
    //$temp_array=null;
	foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$data->fields->$name->value = base64_decode($set->value);	
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	

		/*$set->value = base64_decode($set->value);
		$set->ivalue = base64_decode($set->ivalue);	

		$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');
*/
	}

	$form = $data;	
	
	
	
	$optionnameval = $form->fields->extra_option_name->value;
	$optionnamelang = explode(",",$optionnameval);
	
	$texttouserval = $form->fields->extra_option_text_to_end_user->value;
	$texttouserlang = explode(",",$texttouserval);
	
	pg_prepare($link,'sqllangfetch44','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch44',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($optionnamelang as $key=>$opnlang){
		if($key == $defaultid){
			$form->fields->extra_option_name->value = $opnlang;
		}
	}
	
	foreach($texttouserlang as $key=>$textuserlang){
		if($key == $defaultid){
			$form->fields->extra_option_text_to_end_user->value = $textuserlang;
		}
	}
		
    $seting_id = $form->set_id;
	
	//print_r($form->fields);
	
    $num_choices=$form->num_choices;
    $temp_array=null;
    $option_id=get_max_option_id($form->set_id);
    $choice_id=get_max_choice_id();

    if($option_id == null)
        $option_id=1;
    else
        $option_id++;
    if($choice_id == null)
        $choice_id=1;
    else
        $choice_id++;

    for($j=0;$j<count($form->choice_array);$j++){
     //   $temp=null;
       // $with_respect=null;
        if($form->choice_array[$j] != -1)
        {
			$temp = new stdClass();
            foreach ($form->fields as $t=>$val) {

             if($t=="extra_option_name")
             {
             	$temp->option_name = new stdClass();
             	$temp->option_name->value = new stdClass();
               $temp->option_name->value = $val->value;

             }
            else if($t=="extra_choice_name".$j){
				$coname = parse($val->value);
				
				
				foreach($coname as $conlang) {
					
					if($conlang->langid == $defaultid ) {
						$temp->choice_name = new stdClass();
						$temp->choice_name->value= new stdClass();
						$temp->choice_name->value=$conlang->value;
						
						}
					
					}

				
               }
			 
			
			 
			 
            else if($t=="extra_price".$j){
                $temp->price->value=$val->value;
            }
            else if($t=="extra_rank"){
                $temp->rank->value=$val->value;
            }
            else if($t=="extra_option_text_to_end_user"){
            	$temp->option_text_to_end_user->value=new stdClass(); 
                $temp->option_text_to_end_user->value=$val->value;
            }
            else if($t=="extra_conditional")
            {
                if($val->value==0)
                $temp->conditional->value="no";
                else
                $temp->conditional->value="yes";
            }
            else if($t=="extra_with_respect_to_option")
            {
                $with_respect .=$val->value.',';

            }
          else if($t=="extra_with_respect_to_choice")
           {
               $with_respect .=$val->value;
               $temp->with_respect_to->value=$with_respect;
           }
             else if($t=="extra_max_sel"){
                 $temp->max_sel->value=$val->value;
             }
             else if($t=="extra_min_sel"){
                 $temp->min_sel->value=$val->value;
             }
             else if($t=="extra_ingredients"){
                 $temp->ingredients->value=$val->value;
             }

        }
        $temp->set_id->value=$form->set_id;
        $temp->option_id->value=$option_id;
        $temp->choice_id->value=$choice_id;
        $choice_id++;

        $extradetailsid = InsertQueryProductOption('w_extras_options',$temp,$CFG);
		
		
		foreach($optionnamelang as $key=>$nlang){
			if(!empty($nlang)){	
				unset($forms->fields);
				$forms->fields->extras_options_id = new stdClass();
				$forms->fields->extras_options_id->ivalue = '';
				$forms->fields->extras_options_id->value = $option_id;	
				
				$forms->fields->extras_id = new stdClass();
				$forms->fields->extras_id->ivalue = '';
				$forms->fields->extras_id->value = $extradetailsid;	
				
				
				$forms->fields->extras_choice_id = new stdClass();
				$forms->fields->extras_choice_id->ivalue = '';
				$forms->fields->extras_choice_id->value = $temp->choice_id->value;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->option_name_lang = new stdClass();
				$forms->fields->option_name_lang->value = $nlang;
				$forms->fields->option_name_lang->ivalue = '';
				
				$forms->fields->option_text_to_end_user_lang = new stdClass();
				$forms->fields->option_text_to_end_user_lang->value = $texttouserlang[$key];
				$forms->fields->option_text_to_end_user_lang->ivalue = '';
				
					
				foreach($coname as $conlang) {	
				if($conlang->langid == $key) {
					
					$forms->fields->choice_name_lang = new stdClass();
					$forms->fields->choice_name_lang->ivalue = '';
					$forms->fields->choice_name_lang->value=$conlang->value;
					
					}
				
				}								
					
					InsertQuery('w_extras_options_lang',$forms->fields,$CFG);						
	
	
	
			}				
		}
		
			
      }
    }
	

	
	
		
    echo $seting_id;
	exit();
}
function GetOptions($set_id,$opid)
{
    //ProvidersOnly();
    require('../config.php');
    session_start();
    $id=$set_id;

    $link = ConnectDB();
   if($opid!=''){
    $query = 'SELECT DISTINCT option_id FROM w_extras_options where set_id=$1 AND option_id!=$2 ORDER BY option_id ASC';
	pg_prepare($link,'sql7',$query);
    $result = pg_execute($link,'sql7',array($set_id,$opid));
	}else{
	$query = 'SELECT DISTINCT option_id FROM w_extras_options where set_id=$1 ORDER BY option_id ASC';	
	pg_prepare($link,'sql7',$query);	
    $result = pg_execute($link,'sql7',array($set_id));
	}
	$queryeach = 'SELECT * FROM w_extras_options where option_id=$1';
	
	//,option_name,choice_name,choice_id,set_id,rank
   
	pg_prepare($link,'sql77',$queryeach);
   
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
            unset($menu);
			$results = pg_execute($link,'sql77',array($row['option_id']));
			$final = pg_fetch_array($results);
			$menu = new stdClass();
            $menu->option_name = $final['option_name'];
            $menu->option_id = $final['option_id'];
			$menu->choice_name = $final['choice_name'];
            $menu->choice_id = $final['choice_id'];
            $menu->set_id = $final['set_id'];
            $menu->rank = $final['rank'];
            $menu->id=$final['id'];
			/*$with_respect  = $row['with_respect_to'];
			$with_respect1 = explode(" ", $with_respect);
			$menu->with_respect_to =$with_respect1[0];
			$menu->with_respect_to1= $with_respect1[1];*/
            array_push($menus,$menu);
        }

    echo json_encode($menus);
    pg_close($link);
}

function GetOptionChoices($option_id,$set_id)
{
    ProvidersOnly();

    require('../config.php');
    session_start();
    $link = ConnectDB();
    $query = 'SELECT  choice_name,choice_id FROM w_extras_options  WHERE option_id=$1 and set_id=$2 ORDER BY choice_id ASC';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array($option_id,$set_id));
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
         
			$menu = new stdClass();
            $menu->choice_name = $row['choice_name'];
            $menu->choice_id = $row['choice_id'];
			if($menu->choice_name !=null)
            array_push($menus,$menu);
        }

    echo json_encode($menus);
    pg_close($link);
}


function GetExtrasOptions($set_id){
    $link = ConnectDB();
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlangeop = $rows['id'];
	}else{
	$defultlangeop = $_SESSION['admin_lang'];	
	}

    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT option_id,set_id,id,option_name FROM w_extras_options WHERE set_id=$1';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($set_id));

	
    $options = array();
    $option=null;
	$c=0;
    while($row = pg_fetch_array($result))
    {
        $option = new stdClass();
		$option->name = FetchExtraoptionDataLangDefault($defultlangeop,$row['option_id'],$row['id'],$link,$c);
        //$option->name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->set_id=$set_id;

        array_push($options,$option);
		$c++;
    }
    $new_arr=array();
    $new_arr = array_unique($options, SORT_REGULAR);


   echo json_encode($new_arr);

    pg_close($link);
}

function FetchExtraoptionDataLangDefault($defultlangeop,$id,$exid,$link,$c){
	pg_prepare($link,'sqldefalutlangextra'.$c,'SELECT * from w_extras_options_lang WHERE extras_options_id=$1 and lang_id=$2 and extras_id=$3');
	$result1 = pg_execute($link,'sqldefalutlangextra'.$c,array($id,$defultlangeop,$exid));
	$rows = pg_fetch_array($result1);
	return $rows['option_name_lang'];
}

function GetExtrasOptionsTOCopy($data){
    ProvidersOnly();
    require('../config.php');
    $copy=null;
    $copy=json_decode($data);
    $copy=$copy[0];

    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($copy->set_id,$copy->id));
	
	
	
	$templang=null;
    $option=null;
    $temp=null;
    $copy_option_id=get_max_option_id($copy->set_id);
    $copy_choice_id=get_max_choice_id();
    $copy_option_id++;

    while($row = pg_fetch_array($result))
    {
        $copy_choice_id++;
        $option = new stdClass();
		$temp->set_id = new stdClass();
        $temp->set_id->value=$row['set_id'];
        $temp->option_id->value=$copy_option_id;
        $temp->option_name->value=$row['option_name'].'_'.$copy_option_id;
        $temp->choice_id->value=$copy_choice_id;
        $temp->choice_name->value=$row['choice_name'];
        $temp->with_respect_to->value=$row['with_respect_to'];
        $temp->conditional->value=$row['conditional'];
        $temp->copy->value=1;
        $temp->price->value=$row['price'];
        $temp->rank->value=$row['rank'];
        $temp->max_sel->value=$row['max_sel'];
        $temp->min_sel->value=$row['min_sel'];
        $temp->option_text_to_end_user->value=$row['option_text_to_end_user'];
        $extradetailsid = InsertQuery('w_extras_options',$temp,$CFG);
		
		$link = ConnectDB();
		$query1 = 'SELECT * FROM w_extras_options_lang WHERE extras_options_id=$1 AND extras_id=$2';
		pg_prepare($link,'sql112'.$row['id'],$query1);
		$result1 = pg_execute($link,'sql112'.$row['id'],array($copy->id,$row['id']));
			while($row1 = pg_fetch_array($result1))
		{
			
			$templang->extras_options_id->value=$copy_option_id;
			$templang->option_name_lang->value=$row1['option_name_lang'].'_'.$copy_option_id;
			$templang->extras_choice_id->value=$copy_choice_id;
			$templang->choice_name_lang->value=$row1['choice_name_lang'];
			$templang->lang_id->value=$row1['lang_id'];
			
			$templang->extras_id->value=$extradetailsid;
			$templang->option_text_to_end_user_lang->value=$row1['option_text_to_end_user_lang'];
			
			$extrascopy = InsertQuery('w_extras_options_lang',$templang,$CFG);
			$templang=null;
	
		}
		
        $temp=null;
		
		
		

    }
	
/*	$link = ConnectDB();
		pg_prepare($link,'sqllangupdate228','SELECT * FROM w_extras_options ORDER BY id DESC LIMIT 1');
		$res = pg_execute($link,'sqllangupdate228',array());
		$resq = pg_fetch_array($res);
	$resq['id']*/
	

}


function GetAllOptions($data){
    ProvidersOnly();
    require('../config.php');
    $copy=null;
    $copy=json_decode($data);
    $copy=$copy[0];

    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2 ORDER BY choice_id';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($copy->set_id,$copy->id));
	
	$query1 = 'SELECT * FROM w_extras_options_lang WHERE extras_options_id=$1 and extras_id=$2';
    pg_prepare($link,'sql10langdata',$query1);
	
	$query2 = 'SELECT * FROM w_extras_options_lang WHERE extras_options_id=$1 and extras_choice_id=$2';
    pg_prepare($link,'sql1025angdata',$query2);
	
    $options=Array();
    while($row = pg_fetch_array($result))
    {
        unset($option);
		
		$result1 = pg_execute($link,'sql10langdata',array($row['option_id'],$row['id']));
		$idarray = array();
		$opnamearray = array();
		$textenduserarray = array();
		
		while($row1 = pg_fetch_array($result1))
		{
			$opnamearray[$row1['lang_id']] = $row1['option_name_lang'];
			$textenduserarray[$row1['lang_id']] = $row1['option_text_to_end_user_lang'];
			
		}
		$option = new stdClass();
        $option->option_name=$opnamearray;
		
        $option->option_id=$row['option_id'];
        $option->id=$row['id'];
        $option->set_id=$copy->set_id;
		
		$result2 = pg_execute($link,'sql1025angdata',array($row['option_id'],$row['choice_id']));
		$choicenamearray = array();
		while($row2 = pg_fetch_array($result2))
		{
			
			$choicenamearray[$row2['lang_id']] = $row2['choice_name_lang'];
		}
		$option->chname=$choicenamearray;
		
        $option->choice_name=$row['choice_name'];
        $option->choice_id=$row['choice_id'];
        $option->with_respect_to=$row['with_respect_to'];
        $option->conditional=$row['conditional'];
        $option->copy=$row['copy'];
        $option->price=$row['price'];
        $option->rank=$row['rank'];
        $option->option_text_to_end_user=$textenduserarray;
        $option->ingredients=$row['ingredients'];
        $option->min_sel=$row['min_sel'];
        $option->max_sel=$row['max_sel'];
        array_push($options,$option);
    }
    echo json_encode($options);

    pg_close($link);

}

function EditExtraOptions($data){
    ProvidersOnly();
    require('../config.php');
	$link = ConnectDB();
    session_start();
    $temp_array=null;
    
	$link = ConnectDB();
	$data = json_decode($data);


	
    $temp_array=null;
	foreach($data->fields as $name=>$set){
		$set->value = str_replace("@@","+",$set->value);

		$data->fields->$name->value = base64_decode($set->value);
		//$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	
		//$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);

		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	
	
	$form = $data;	
	$optionnameval = $form->fields->option_name->value;
	$optionnamelang = explode(",",$optionnameval);
	
	$texttouserval = $form->fields->option_text_to_end_user->value;
	$texttouserlang = explode(",",$texttouserval);
	
	pg_prepare($link,'sqllangfetch64','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch64',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($optionnamelang as $key=>$opnlang){
		if($key == $defaultid){
			$form->fields->option_name->value = $opnlang;
		}
	}
	
	foreach($texttouserlang as $key=>$textuserlang){
		if($key == $defaultid){
			$form->fields->option_text_to_end_user->value = $textuserlang;
		}
	}
	
	
	
    $num_choices=$form->num_choices;
    $temp_array=null;
    $flag=0;
	$query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
	pg_prepare($link,'sqlp11',$query);
	$result_fetchs = pg_execute($link,'sqlp11',array($form->set_id,$form->option_id));
	$r_fetchs = pg_fetch_array($result_fetchs);
	$old_respect_options = explode(",",$r_fetchs['with_respect_to']);
	//print_r($old_respect_options);
	$charray = $form->choice_array;
	$idarray = $form->id;
	
	
	
	$editarray = array_intersect($charray,$idarray);
	$insertarray = array_diff($charray,$idarray);


    for($j=0;$j<$num_choices;$j++){
        $temp=null;
        $temp_save=null;
        $ids=$form->choice_array[$j];
		
        $flag=0;
        $with_respect=null;
        if($form->choice_array[$j] != -1)
        {

        foreach ($form->fields as $t=>$val) {
            if($t=="option_name")
            {
				$temp->option_name = new stdClass();
                $temp->option_name->value=$val->value;
            }
			else if($t=="conditional")
            {
                if($val->value==0)
                    $temp->conditional->value="no";
                else
                    $temp->conditional->value="yes";
            }
            else if($t=="with_respect_to_option")
            {
				if($val->value ==""){
					
						$with_respect .= $old_respect_options[0].',';
					}
				else {
					$with_respect .=$val->value.',';
					}	
                
				

            }
            else if($t=="with_respect_to_choice")
            {
				if($val->value ==""){
					
						$with_respect .=$old_respect_options[1];
						$temp->with_respect_to->value=$with_respect;
					}
				
				else {
					$with_respect .=$val->value;
					$temp->with_respect_to->value=$with_respect;
					}	
               
            }
			 else if($t=="ingredients")
            {
                $temp->ingredients->value=$val->value;
            }
			
			else if($t=="rank")
                $temp->rank->value=$val->value;
            else if($t=="option_text_to_end_user")
                $temp->option_text_to_end_user->value=$val->value;
            
            else if($t=="min_sel")
            {
                $temp->min_sel->value=$val->value;

            }
            else if($t=="max_sel")
            {
                $temp->max_sel->value=$val->value;
            }
			
			 else if($t=="price_update".$ids)
                $temp->price->value=$val->value;
			else if($t=="price_save".$ids){
                  $flag=1;
                $temp_save->price->value=$val->value;
            }
			
			else if (in_array($form->choice_array[$j], $editarray))
			   {
				   
			   		if($t=="choice_update_name".$form->choice_array[$j]){
					$coname = parse($val->value);
					$coinsertname = parse($val->value);
					$temp->choice_name = new stdClass();
					foreach($coname as $conlang) {
					
					if($conlang->langid == $defaultid ) {
						
						$temp->choice_name->value=$conlang->value;
						
						}
					
					}
					}
                	
			   }
			else if (in_array($form->choice_array[$j], $insertarray))
			   {
				   
			   		if($t=="choice_update_name".$form->choice_array[$j]){
					$flag=1;
					
					$coname = parse($val->value);
					$coinsertname = parse($val->value);
					
					foreach($coinsertname as $conlang) {
					
					if($conlang->langid == $defaultid ) {
						
						$temp_save->choice_name->value=$conlang->value;
						
						}
					
					}
					
					}
			   }
			   
			   
			
            /*else if($t=="choice_update_name".$ids)
                $temp->choice_name->value=$val->value;
            else if($t=="choice_save_name".$ids){
                $flag=1;
                $temp_save->choice_name->value=$val->value;
            }*/
           

            
           
        }
        $temp->set_id->value=$form->set_id;
        $temp->option_id->value=$form->option_id;
        $temp_save->set_id->value=$form->set_id;
        $temp_save->option_id->value=$form->option_id;
			
        $extradetailsid = UpdateQuery('w_extras_options',$temp,$ids,$CFG);
		
		
		
		
		/*foreach($optionnamelang as $key=>$nlang){	*/		
			if($flag!=1){
			foreach($coname as $conlangv) {	
				/*if($conlang->langid == $key) {					
					$cval=$conlang->value;
					
					}*/
				
			if(!empty($conlangv->value)){
				$link = ConnectDB();
			
				pg_prepare($link,'sqllangsearchinsertfetch'.$ids.$conlangv->langid,'SELECT * FROM w_extras_options_lang where lang_id=$1 AND extras_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearchinsertfetch'.$ids.$conlangv->langid,array($conlangv->langid,$ids));
				
				pg_prepare($link,'sqllangsearchfetch'.$ids.$conlangv->langid,'SELECT * FROM w_extras_options_lang where extras_id=$1');
				$resultsearch5 = pg_execute($link,'sqllangsearchfetch'.$ids.$conlangv->langid,array($ids));
				
				if(pg_num_rows($resultsearch) == 0){
					$rg = pg_fetch_array($resultsearch5);
					unset($datas->fields);
					$datas->fields->extras_options_id = new stdClass();
					$datas->fields->extras_options_id->ivalue = '';
					$datas->fields->extras_options_id->value = $temp->option_id->value;
					
					$datas->fields->extras_id = new stdClass();
					$datas->fields->extras_id->ivalue = '';
					$datas->fields->extras_id->value = $ids;	

					
					$datas->fields->extras_choice_id = new stdClass();
					$datas->fields->extras_choice_id->ivalue = '';
					$datas->fields->extras_choice_id->value = $rg['extras_choice_id'];			

					$datas->fields->lang_id = new stdClass();
					$datas->fields->lang_id->value = $conlangv->langid;
					$datas->fields->lang_id->ivalue = '';

					$datas->fields->option_name_lang = new stdClass();
					$datas->fields->option_name_lang->value = $optionnamelang[$conlangv->langid];
					$datas->fields->option_name_lang->ivalue = '';
					
					$datas->fields->option_text_to_end_user_lang = new stdClass();
					$datas->fields->option_text_to_end_user_lang->value = $texttouserlang[$conlangv->langid];
					$datas->fields->option_text_to_end_user_lang->ivalue = '';					
					
						
					$datas->fields->choice_name_lang = new stdClass();
					$datas->fields->choice_name_lang->ivalue = '';
					$datas->fields->choice_name_lang->value=$conlangv->value;
					
					InsertQuery('w_extras_options_lang',$datas->fields,$CFG);
				}
			
			
				$link = ConnectDB();
					pg_prepare($link,'sqllangupdate22'.$ids.$conlangv->langid,'UPDATE w_extras_options_lang SET option_name_lang=$1,option_text_to_end_user_lang=$2,choice_name_lang=$3,lang_id=$4 where lang_id=$5 and extras_id=$6');
					pg_execute($link,'sqllangupdate22'.$ids.$conlangv->langid,array($optionnamelang[$conlangv->langid],$texttouserlang[$conlangv->langid],$conlangv->value,$conlangv->langid,$conlangv->langid,$ids));					
				
			}
					
		}
			}
		
       if($flag==1){
        SaveEditExtraOptions($temp_save,$ids);
		$link = ConnectDB();
		pg_prepare($link,'sqllangupdate228','SELECT * FROM w_extras_options ORDER BY id DESC LIMIT 1');
		$res = pg_execute($link,'sqllangupdate228',array());
		$ror = pg_fetch_array($res);
		
		foreach($coinsertname as $conlang){

		
			if(!empty($conlang->value)){
				
			        unset($forms->fields);
					$forms->fields->extras_options_id = new stdClass();
					$forms->fields->extras_options_id->ivalue = '';
					$forms->fields->extras_options_id->value = $temp->option_id->value;
					
					$forms->fields->extras_id = new stdClass();
					$forms->fields->extras_id->ivalue = '';
					$forms->fields->extras_id->value = $ror['id'];	
					
					 $choice_id=get_max_choice_id();
					
					$forms->fields->extras_choice_id = new stdClass();
					$forms->fields->extras_choice_id->ivalue = '';
					$forms->fields->extras_choice_id->value = $choice_id;			

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $conlang->langid;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->option_name_lang = new stdClass();
					$forms->fields->option_name_lang->value = $optionnamelang[$conlang->langid];
					$forms->fields->option_name_lang->ivalue = '';
					
					$forms->fields->option_text_to_end_user_lang = new stdClass();
					$forms->fields->option_text_to_end_user_lang->value = $texttouserlang[$conlang->langid];
					$forms->fields->option_text_to_end_user_lang->ivalue = '';
					
					
						
						$forms->fields->choice_name_lang = new stdClass();
						$forms->fields->choice_name_lang->ivalue = '';
						$forms->fields->choice_name_lang->value=$conlang->value;
						
						
					

					InsertQuery('w_extras_options_lang',$forms->fields,$CFG);
					
		
			}
		}
		
	   }
			
		
        }
		$sid=$form->set_id;
        foreach ($form->choice_delete_array as $id) {
            DeleteExtraOptions($id,$sid);
        }

   }

    //echo json_encode($form->set_id);
}
function get_max_rank($set_id)
{
    require('../config.php');
   unset($unique_option);
    $option_id=null;
    $link = ConnectDB();
    $query = 'SELECT * FROM w_extras_options where set_id=$1';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array($set_id));
    $menus = array();
    if (pg_num_rows($result)>0) 
        while($row = pg_fetch_array($result))
        {
			$unique_option[] = $row["option_id"];
			$arr_option = array_unique($unique_option, SORT_REGULAR);
            $option_id=count($arr_option);
        }


    pg_close($link);
    echo json_encode($option_id);
}

function get_max_selection($data)
{
    require('../config.php');

    $ids=parse($data);

    $ids=$ids[0];
    $count=0;
    $link = ConnectDB();
    $query = 'SELECT count(choice_name)  FROM w_extras_options where set_id=$1 AND option_id=$2';

    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array($ids->set_id,$ids->option_id));

    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {

            $count=$row['count'];
        }


    pg_close($link);
    echo json_encode($count);
}

function get_max_option_id($set_id)
{
    require('../config.php');

    $option_id=null;
     $link = ConnectDB();
    $query = 'SELECT MAX(option_id)  FROM w_extras_options';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array());
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
          $option_id=$row['max'];
        }


    pg_close($link);
    return $option_id;
}
function DeleteOptions($ids){
    ProvidersOnly();
    require('../config.php');
    session_start();
    $temp_array=null;
    $form = parse($ids);
    $link = ConnectDB($CFG);

    if(!empty($form[0]->id))
    {

        pg_prepare($link,'sql1','DELETE FROM w_extras_options WHERE option_id=$1 AND set_id=$2');
        $result = pg_execute($link,'sql1',array($form[0]->id,$form[0]->set_id));
		
		 pg_prepare($link,'sqllang1','DELETE FROM w_extras_options_lang WHERE extras_options_id=$1');
        $result = pg_execute($link,'sqllang1',array($form[0]->id));

    }
    pg_close($link);

}

function MakeCopy($result)
{
    $temp=null;

    $set_id=$_SESSION['set_id'];
    while($row = pg_fetch_array($result))
    {


      /*  unset($option);

        $option->name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->set_id=$set_id;

        array_push($options,$option);*/
        /*
        unset($extra);
        $extra->id = $row['id'];
        $extra->set= $row['set'];
        $extra->name = $row['set'];
        $extra->mrank = $row['mrank'];
        $extra->enabled = $row['enabled'];
        array_push($extras,$extra);*/
    }

    /*foreach ($form->fields as $t) {
        if($i==0)
            $temp->option_name->value=$t->value;
        if($i==1)
            $temp->option_text_to_end_user->value=$t->value;
        if($i==2)
            $temp->num_choice->value=$t->value;
        if($i==3){
            $temp->rank->value=$t->value;

            $i=-1;
            $temp->set_id->value=$set_id;
            $extradetailsid = InsertQuery('w_extras_details',$temp,$CFG);
            $temp=null;
        }
        $i++;
    }*/
}
function GetAllOptionsEdits($set_id,$option_id){
    ProvidersOnly();
    require('../config.php');

    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($set_id,$option_id));
    $options=Array();
    while($row = pg_fetch_array($result))
    {
        unset($option);
        $option->option_name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->id=$row['id'];
        $option->set_id=$row['set_id'];
        $option->choice_name=$row['choice_name'];
        $option->choice_id=$row['choice_id'];
        $option->with_respect_to=$row['with_respect_to'];
        $option->conditional=$row['conditional'];
        $option->copy=$row['copy'];
        $option->price=$row['price'];
        $option->rank=$row['rank'];
        $option->option_text_to_end_user=$row['option_text_to_end_user'];
        $option->min_sel=$row['min_sel'];
        $option->max_sel=$row['max_sel'];
        $option->ingredients=$row['ingredients'];
         array_push($options,$option);
    }

      return($options);
    pg_close($link);

}

function get_max_choice_id()
{
    require('../config.php');

    $link = ConnectDB();
    $choice_id=null;
    $query = 'SELECT MAX(choice_id)  FROM w_extras_options';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array());

    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
           $choice_id=$row['max'];
        }
    pg_close($link);
   return $choice_id;

}
function SaveEditExtraOptions($temp,$ids)
{
    ProvidersOnly();
    require('../config.php');
    session_start();
    $temp1=null;
    $result=GetAllOptionsEdits($temp->set_id->value,$temp->option_id->value);

    // print_r($result[0]->option_name);

    $temp1->option_name->value=$result[0]->option_name;
    $temp1->option_text_to_end_user->value=$result[0]->option_text_to_end_user;
    $temp1->choice_name->value=$temp->choice_name->value;
    $temp1->price->value=$temp->price->value;
    $temp1->conditional->value=$result[0]->conditional;
    $temp1->copy->value=$result[0]->copy;
    $temp1->with_respect_to->value=$result[0]->with_respect_to;
    $temp1->set_id->value=$temp->set_id->value;
    $temp1->rank->value=$result[0]->rank;
    $temp1->min_sel->value=$result[0]->min_sel;
    $temp1->max_sel->value=$result[0]->max_sel;
    $temp1->ingredients->value=$result[0]->ingredients;
    $choice_id=get_max_choice_id();
    if($choice_id == null)
        $choice_id=1;
    else
        $choice_id++;
    $temp1->option_id->value=$temp->option_id->value;
    $temp1->choice_id->value=$choice_id;
    $extradetailsid = InsertQuery('w_extras_options',$temp1,$CFG);
}
function DeleteExtraOptions($id,$sid)
{
    //ProvidersOnly();
    require('../config.php');
    $link = ConnectDB($CFG);
    //$data = parse($data);
	echo $id;
	echo $sid;
    if(!empty($id))
    {
      /*  foreach ($data->ids as $id)
        {
      */   //   RemoveDir($CFG->dirimages . 'extras/' . $id . '/');
            pg_prepare($link,'sql1','DELETE FROM w_extras_options WHERE id=$1 and set_id=$2');
            $result = pg_execute($link,'sql1',array($id,$sid));
			
			pg_prepare($link,'sql12','DELETE FROM w_extras_options_lang WHERE extras_id=$1');
            $result = pg_execute($link,'sql12',array($id));
//        }
    }
    pg_close($link);
}

/********************************************product option***********************************************************************/
function GetExtraData($id)
{
    //ProvidersOnly();
    $link = ConnectDB();
    pg_prepare($link,'sql','SELECT set,text_to_end_user,description,mrank,qty,person FROM w_extras WHERE id=$1');
    $result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqlextraslangdata','SELECT * FROM w_extras_lang WHERE extras_id=$1');
    $result1 = pg_execute($link,'sqlextraslangdata',array($id));

    if (pg_num_rows($result)==1)
        while($row = pg_fetch_array($result))
        {
			
           // unset($extra);
		   $extra = new stdClass();
            $extra->id = $id;
			$setarray=array();				
			$idarray = array();
			$enduserarray = array();
			while($row1 = pg_fetch_array($result1))
			{
				$setarray[$row1['lang_id']] = $row1['set_lang'];
				$enduserarray[$row1['lang_id']] = $row1['text_to_end_user_lang'];
				$idarray[$row1['lang_id']] = $row1['id'];
			
			}			
			$extra->set = $setarray;
			$extra->text_to_end_user = $enduserarray;
			$extra->langid = $idarray;			
            $extra->name = $row['name'];
            $extra->mrank = $row['mrank'];
			$extra->qty = $row['qty'];
			$extra->person = $row['person'];
        }

    echo json_encode($extra);
    pg_close($link);
}

function SaveExtra($data)
{
    ProvidersOnly();
    require('../config.php');
    session_start();
	$link = ConnectDB();
	$data = json_decode($data);
	//$temp=null;
	$temp = new stdClass();
	
	foreach($data->fields as $name=>$set){

		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);

		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	
		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	$form = $data;	
    $extraid = $form->id;
	
	$nameval = $form->fields->set->value;
	$namelang = explode(",",$nameval);
	
	$enduserval = $form->fields->text_to_end_user->value;
	$enduserlang = explode(",",$enduserval);


	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($namelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->set->value = $nlang;
		}
	}
	
	foreach($enduserlang as $key=>$eulang){
		if($key == $defaultid){
			$form->fields->text_to_end_user->value = $eulang;
		}
	}
	
	foreach($form->fields as $name=>$set){
		$temp->$name = new stdClass();
		$temp->$name->value=$set->value;
		}
	//print_r($temp);
    if ($form->type=='create')
    {
        $extraid = InsertQuery('w_extras',$temp,$CFG);
        //echo $extraid;
        $_SESSION['set_id']=$extraid;
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				//$forms->fields = new stdClass();
				$forms->fields->extras_id = new stdClass();
				$forms->fields->extras_id->ivalue = '';
				$forms->fields->extras_id->value = $extraid;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->set_lang = new stdClass();
				$forms->fields->set_lang->value = $nlang;
				$forms->fields->set_lang->ivalue = '';
				
				$forms->fields->text_to_end_user_lang = new stdClass();
				$forms->fields->text_to_end_user_lang->value = $enduserlang[$key];
				$forms->fields->text_to_end_user_lang->ivalue = '';

				InsertQuery('w_extras_lang',$forms->fields,$CFG);
			}				
		}
    }
    else{
        UpdateQuery('w_extras',$temp,$form->id,$CFG);
		echo $form->id;
        $_SESSION['set_id']=$form->id;
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_extras_lang where lang_id=$1 AND extras_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$extraid));
				echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					$forms->fields = new stdClass();
					$forms->fields->extras_id = new stdClass();
					$forms->fields->extras_id->ivalue = '';
					$forms->fields->extras_id->value = $extraid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->set_lang = new stdClass();
					$forms->fields->set_lang->value = $nlang;
					$forms->fields->set_lang->ivalue = '';
					
					$forms->fields->text_to_end_user_lang = new stdClass();
					$forms->fields->text_to_end_user_lang->value = $enduserlang[$key];
					$forms->fields->text_to_end_user_lang->ivalue = '';

					InsertQuery('w_extras_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_extras_lang SET set_lang=$1, text_to_end_user_lang=$2 where lang_id=$3 and extras_id=$4');
					pg_execute($link,'sqllangupdate',array($nlang,$enduserlang[$key],$key,$extraid));					
				}
				pg_close($link);					
			}				
		}
	}
	
	
    //check if image is sended, create destiny dir if doesnt exist
    if ($form->image)
    {
        $oldname = $CFG->dirimages.'temp/'.$form->image;
        MoveImages($CFG->dirimages . 'extras/',$oldname,$extraid);
    }
    else//if we didnt received image, check if its new dish, if so, copy the dummy image to his profile
        if ($form->type=='create')
        {
            $oldname = $CFG->dirimages.'extras/dummy.jpg';
            MoveImages($CFG->dirimages . 'extras/',$oldname,$extraid,true);
        }
}
function GetExtrasDataByIds($ids)
{
    $link = ConnectDB();
	
		
    $ids = explode(',',$ids);
    $extras = array();

    foreach($ids as $id)
    {
        $query = 'SELECT name,description,price,enabled FROM w_extras WHERE id=$1';
        pg_prepare($link,'sql' . $id,$query);
        $result = pg_execute($link,'sql' . $id,array($id));
        if (pg_num_rows($result)==1)
            while($row = pg_fetch_array($result))
            {
                $extra = new stdClass();
                $extra->id = $id;
                $extra->name= $row['name'];
                $extra->description = $row['description'];
                $extra->price = $row['price'];
                $extra->enabled = $row['enabled'];
				
                array_push($extras,$extra);
            }
    }

    echo json_encode($extras);
    pg_close($link);
}

function GetExtrasDataByBusiness($id)
{
    $link = ConnectDB();
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
	
	
	/*$id1 = 141;
	$id2 = 142;
	$query_p = 'SELECT name,value FROM w_configs WHERE id=$1';
    pg_prepare($link,'sqlp',$query_p);
    $result_p = pg_execute($link,'sqlp',array($id1));
    $row_p = pg_fetch_array($result_p);
	$person1 = $row_p["value"];
	
	$query_q = 'SELECT name,value FROM w_configs WHERE id=$1';
    pg_prepare($link,'sqlq',$query_q);
    $result_q = pg_execute($link,'sqlq',array($id2));
    $row_q = pg_fetch_array($result_q);
	$qty1 = $row_q["value"];*/
	
	
    $query = 'SELECT set,id,name,mrank,price,enabled FROM w_extras WHERE business=$1';
    pg_prepare($link,'sql',$query);
    $result = pg_execute($link,'sql',array($id));
    $extras = array();
	if(pg_num_rows($result) > 0){
    while($row = pg_fetch_array($result))
    {
       // unset($extra);
	   $extra = new stdClass();
        $extra->id = $row['id'];
		$extra->set = FetchSetLangDefault($defultlang,$row['id'],$link);
        $extra->name = $row['set'];
        $extra->mrank = $row['mrank'];
        $extra->enabled = $row['enabled'];				
       array_push($extras,$extra);
    }
	}//end of if greater than num of row
	
   echo json_encode($extras);
    pg_close($link);
}

function FetchSetLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_extras_lang WHERE extras_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['set_lang'];
}

/********************************************************************RESERVE************************************************************************/	
function SaveReserve($data){
	ProvidersOnly();
	$form = parse($data);
	$menuid = $form->id;

	if ($form->type=='create')
		{
		$menuid = InsertQuery('w_reserve',$form->fields);	
		echo $menuid;
		}
		else
		UpdateQuery('w_reserve',$form->fields,$form->id);
}

function GetReserveDataByIds($ids)
	{
	$link = ConnectDB();	

	$ids = explode(',',$ids);
	$reserve = array();

	foreach($ids as $id)
		{
		$query = 'SELECT name,days,rtype,guest,enabled FROM w_reserve WHERE id=$1';
		pg_prepare($link,'sql',$query);
		$result = pg_execute($link,'sql',array($id));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$rese = new stdClass();
				$rese->id = $id;
				$rese->name = $row['name'];
				$rese->days = $row['days'];
				$rese->rtype= $row['rtype'];
				if($row['rtype'] == 1)
				$rese->rtyped="Table";
				if($row['rtype'] == 2)
				$rese->rtyped="Room";
				if($row['rtype'] == 3)
				$rese->rtyped="Free";				
				$rese->guest = $row['guest'];
				$rese->enabled = $row['enabled'];
				array_push($reserve,$rese);
				}
		}

	echo json_encode($reserve);
	pg_close($link);
	}
	
function GetReserveDataByBusiness($id)
	{
	$link = ConnectDB();	
	$query = 'SELECT id,name,days,rtype,guest,enabled FROM w_reserve WHERE business=$1';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id));
	$reserve = array();
	while($row = pg_fetch_array($result))
		{
		$rese = new stdClass();
		$rese->id = $row['id'];
		$rese->name = $row['name'];
		$rese->days = $row['days'];
		$rese->rtype= $row['rtype'];
		$rese->rtyped="Table";
				if($row['rtype'] == 2)
				$rese->rtyped="Room";
				if($row['rtype'] == 3)
				$rese->rtyped="Free";
		$rese->guest = $row['guest'];
		$rese->enabled = $row['enabled'];
		array_push($reserve,$rese);
		}
	echo json_encode($reserve);
	pg_close($link);
	}

function GetReserveData($id)
	{
	if(IS_REVIEW_ENABLED == 1)
		ProvidersOnly();
	else
		ProvidersOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT name,days,schedule,rtype,guest,duration FROM w_reserve WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$rese = new stdClass();
			$rese->id = $id;
			$rese->name = $row['name'];
			$rese->days = $row['days'];
			$rese->schedule = $row['schedule'];
			$rese->duration = $row['duration'];
			$rese->rtype= $row['rtype'];
			$rese->guest = $row['guest'];
			
			}

	echo json_encode($rese);
	pg_close($link);
	}

	function DeleteReserve($data)
	{
	ProvidersOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
			if(is_numeric($id)) {
		pg_prepare($link,'sql','DELETE FROM w_reserve WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
			}
		
		}
	pg_close($link);
	}
function FetchAllPriceData($id)
{
	$link = ConnectDB();	
	$prices = array();
	$price = new stdClass();
	$query = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',array($id,1));
	$row = pg_fetch_array($result);
	
	$query1 = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql2',$query1);
	$result1 = pg_execute($link,'sql2',array($id,2));
	$row1 = pg_fetch_array($result1);
	
	$query2 = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql3',$query2);
	$result2 = pg_execute($link,'sql3',array($id,3));
	$row2 = pg_fetch_array($result2);
	
	$price->tableprice= $row['price'];
	$price->roomprice= $row1['price'];
	$price->freeprice= $row2['price'];

	array_push($prices,$price);
	
	echo json_encode($prices);
	pg_close($link);
}



function CopyBusiness($oid){
	include '../config.php';
	$link = ConnectDB();	
	$query = 'SELECT * FROM w_business WHERE id = $1';
	pg_prepare($link,'sql1',$query);
	$resultBus = pg_execute($link,'sql1',array($oid));
	$record = pg_fetch_object($resultBus);

	
	/***********************************************BUSINESS*********************************************************/
    $newbid = businessInsertBody($record,'w_business');
			  $pathMain = $CFG->dirimages."business/". $newbid."/"; //new
			  $path =    $CFG->dirimages."business/".$oid."/"; //old
			  $oldname =  $path."original.jpg";
			  MoveBusinessImages_backup($pathMain,$oldname);
			  
			  $pathMainBanner = $CFG->dirimages."banner/". $newbid."/"; //new
			  $pathBanner =    $CFG->dirimages."banner/".$oid."/"; //old
			  $oldnameBanner =  $pathBanner."original.jpg";
			  MoveBusinessImages_backup_admin($pathMainBanner,$oldnameBanner);

	$link1 = ConnectDB();			  
	$query1 = 'SELECT * FROM w_business_lang WHERE business_id = $1';
	pg_prepare($link1,'sqlblang',$query1);
	$resultBuslang = pg_execute($link1,'sqlblang',array($oid));
	
	$rbuisness=0;
	while($recordlang = pg_fetch_object($resultBuslang)){		
		$dishnwid = BElementInsertBody($recordlang,'w_business_lang',$newbid,'business_id',$rbuisness,$link1);
		$rbuisness++;
	}	
	$link1 = ConnectDB();	
	$query2 = 'SELECT * FROM w_business_meta_seo_lang WHERE business_id = $1';
	pg_prepare($link1,'sqlbmlang',$query2);
	$resultmBuslang = pg_execute($link1,'sqlbmlang',array($oid));
	
	$rmbuisness=0;
	while($recordmlang = pg_fetch_object($resultmBuslang)){		
		$dishnwid = BElementInsertBody($recordmlang,'w_business_meta_seo_lang',$newbid,'business_id',$rmbuisness,$link1);
		$rmbuisness++;
	}
	
	/***********************************************BUSINESS*********************************************************/
	
	/***********************************************DISH*********************************************************/
	$link = ConnectDB();	
	
	$queryD = 'SELECT * FROM w_dishes WHERE business = $1';
	pg_prepare($link,'sqldi1',$queryD);
	$resultD = pg_execute($link,'sqldi1',array($oid));
	
	// $queryBB = 'update w_dishes set category=$1 WHERE id = $2';
	//echo pg_num_rows($resultD);
	$rdish = 0;
	while($record_dish = pg_fetch_object($resultD)) {
		//print_r($record_dish);
		 	  $dishnwid = BElementInsertBody($record_dish,'w_dishes',$newbid,'business',$rdish,$link);
			 $dishnarrayback[$record_dish->id] = $dishnwid; 
			// print_r($arr6);
			// echo "avijit";
				//pg_prepare($link,'sqldi1update',$queryBB);
				//$resultBB = pg_execute($link,'sqldi1update',array(,$dishnwid));
				
		 	  $arrd[]  = $dishnwid;
			   $path =    $CFG->dirimages."dishes/".$record_dish->id."/1/"; //old
			   $oldname =  $path."original.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = $CFG->dirimages."dishes/". $dishnwid."/1/"; //new
			  MoveBusinessImages_backup($pathMain,$oldname);
			  }
			  $path =    $CFG->dirimages."dishes/".$record_dish->id."/2/"; //old
			   $oldname =  $path."original.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = $CFG->dirimages."dishes/". $dishnwid."/2/"; //new
			 MoveBusinessImages_backup($pathMain,$oldname);
			  }
			  $path =    $CFG->dirimages."dishes/".$record_dish->id."/3/"; //old
			   $oldname =  $path."original.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = $CFG->dirimages."dishes/". $dishnwid."/3/"; //new
			 MoveBusinessImages_backup($pathMain,$oldname);
			  }

			$link1 = ConnectDB();	
			$querydishlang = 'SELECT * FROM w_dishes_lang WHERE dishes_id= $1';
			pg_prepare($link1,'sqldishlang'.$record_dish->id,$querydishlang);
			$resultdishlang = pg_execute($link1,'sqldishlang'.$record_dish->id,array($record_dish->id));
			pg_close($link1);
			$disheslang=0;
			while($recorddishlang = pg_fetch_object($resultdishlang)){	
				$link1 = ConnectDB();	
				$dilang = new stdClass();
				$dilang = $disheslang.$rdish;	
				$dishnwid = BElementInsertBody($recorddishlang,'w_dishes_lang',$dishnwid,'dishes_id',$dilang,$link1);
				$disheslang++;
			}	
			  
		$rdish++;
		}
	/***********************************************DISH*********************************************************/	
	/***********************************************MENU*********************************************************/		
		$link = ConnectDB();	
	
	$queryM = 'SELECT * FROM w_menus WHERE business = $1';
	pg_prepare($link,'sqlMi1',$queryM);
	$resultM = pg_execute($link,'sqlMi1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Mdish = 0;
	while($record_menus = pg_fetch_object($resultM)) {
		//print_r($dishnarrayback);
		$disheslist = new stdClass();	
		$disheslist = json_decode($record_menus->dishes);
		
		//print_r($disheslist);
		$disheslistnew = array();
		foreach($disheslist as $valued){
			echo $dishnarrayback[$valued];
			array_push($disheslistnew,$dishnarrayback[$valued]);
		}
		$disheslistnew = json_encode($disheslistnew);
		//print_r($disheslistnew);
		$record_menus->dishes = $disheslistnew;
		 $newmenuid = BElementInsertBody($record_menus,'w_menus',$newbid,'business',$Mdish,$link);
		 $arrM[] = $newmenuid;
		
		
		
		
		$link1 = ConnectDB();	
		$querymenulang = 'SELECT * FROM w_menus_lang WHERE menus_id= $1';
		pg_prepare($link1,'sqlmenulang'.$record_menus->id,$querymenulang);
		$resultmenulang = pg_execute($link1,'sqlmenulang'.$record_menus->id,array($record_menus->id));
		pg_close($link1);

		$menuslang=0;
		while($recordmenulang = pg_fetch_object($resultmenulang)){	
			$link1 = ConnectDB();	
			$melang = new stdClass();
			$melang = $menuslang.$Mdish;	
			$menunwid = BElementInsertBody($recordmenulang,'w_menus_lang',$newmenuid,'menus_id',$melang,$link1);
			$menuslang++;
		}

		$Mdish++;
		}
		
		
	
	/***********************************************MENU*********************************************************/	
	/***********************************************RESERVE*********************************************************/		
		$link = ConnectDB();	
	
	$queryR = 'SELECT * FROM w_reserve WHERE business = $1';
	pg_prepare($link,'sqlRi1',$queryR);
	$resultR = pg_execute($link,'sqlRi1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Rdish = 0;
	while($record_reserve = pg_fetch_object($resultR)) {
		
		  $reservenewid = BElementInsertBody($record_reserve,'w_reserve',$newbid,'business',$Rdish,$link);
		  $arrRsv[] = $reservenewid;

		$link1 = ConnectDB();	
		$queryreservelang = 'SELECT * FROM w_reserve_lang WHERE reserve_id= $1';
		pg_prepare($link1,'sqlreservelang'.$record_reserve->id,$queryreservelang);
		$resultreservelang = pg_execute($link1,'sqlreservelang'.$record_reserve->id,array($record_reserve->id));
		pg_close($link1);

		$reservelang=0;
		while($recordreservelang = pg_fetch_object($resultreservelang)){	
			$link1 = ConnectDB();	
			$relang = new stdClass();
			$relang = $reservelang.$Rdish;	
			$reservenwid = BElementInsertBody($recordreservelang,'w_reserve_lang',$newmenuid,'reserve_id',$relang,$link1);
			$reservelang++;
		}


		$Rdish++;
		}
		
		
	
	/***********************************************RESERVE*********************************************************/	
	
		
	/***********************************************DELIVERY ZONE*********************************************************/		
		$link = ConnectDB();	
	
	$querydeliveryzone = 'SELECT * FROM w_deliveryzone WHERE businessid = $1';
	pg_prepare($link,'sqlInDe1',$querydeliveryzone);
	$deliveryIn = pg_execute($link,'sqlInDe1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	while($record_delivery = pg_fetch_object($deliveryIn)) {
		 if($Indish ==0){
		 	$firstid = BElementInsertBodySearch($record_delivery,'w_deliveryzone',$newbid,'businessid',$Indish,$link,'');	
		 	$newdeliveryid = $firstid;
		 }		 
		 else{
		 	$newdeliveryid = BElementInsertBodySearch($record_delivery,'w_deliveryzone',$newbid,'businessid',$Indish,$link,$firstid);	
		 } 
		  



		$link1 = ConnectDB();	
		$querydeliveryzonelang = 'SELECT * FROM w_deliveryzone_lang WHERE deliveryzone_id= $1';
		pg_prepare($link1,'sqldeliveryzlang'.$record_delivery->id,$querydeliveryzonelang);
		$resultdeliveryzlang = pg_execute($link1,'sqldeliveryzlang'.$record_delivery->id,array($record_delivery->id));
		pg_close($link1);

		$deliverylang=0;
		while($recorddeliveryzlang = pg_fetch_object($resultdeliveryzlang)){	
			$link1 = ConnectDB();	
			$dzlang = new stdClass();
			$dzlang = $deliverylang.$Indish;	
			$deliveryznwid = BElementInsertBody($recorddeliveryzlang,'w_deliveryzone_lang',$newdeliveryid,'deliveryzone_id',$dzlang,$link1);
			$deliverylang++;
		}


		 $Indish++;
		}
		
		
	
	/***********************************************DELIVERY ZONE*********************************************************/
	
			
	/***********************************************DELIVERY KM*********************************************************/		
		$link = ConnectDB();	
	
	$querydeliverykm= 'SELECT * FROM w_deliverykm WHERE businessid = $1';
	pg_prepare($link,'sqlInKm1',$querydeliverykm);
	$deliveryKmIn = pg_execute($link,'sqlInKm1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	while($record_delivery_km = pg_fetch_object($deliveryKmIn)) {
		 if($Indish ==0){
		 	 $myfirstrec = BElementInsertBodyCustom($record_delivery_km,'w_deliverykm',$newbid,'businessid',$Indish,$link,'');
		 	 $newdeliverykmid = $myfirstrec;
		 }
		 
		  else {
		  $newdeliverykmid = BElementInsertBodyCustom($record_delivery_km,'w_deliverykm',$newbid,'businessid',$Indish,$link,$myfirstrec);
		  }
		 



		$link1 = ConnectDB();	
		$querydeliverykmlang = 'SELECT * FROM w_deliverykm_lang WHERE deliverykm_id= $1';
		pg_prepare($link1,'sqldeliverykmlang'.$record_delivery_km->id,$querydeliverykmlang);
		$resultdeliverykmlang = pg_execute($link1,'sqldeliverykmlang'.$record_delivery_km->id,array($record_delivery_km->id));
		pg_close($link1);

		$deliverkmlang=0;
		while($recorddeliverykmlang = pg_fetch_object($resultdeliverykmlang)){	
			$link1 = ConnectDB();	
			$dkmlang = new stdClass();
			$dkmlang = $deliverkmlang.$Indish;	
			$deliverykmnwid = BElementInsertBody($recorddeliverykmlang,'w_deliverykm_lang',$newdeliverykmid,'deliverykm_id',$dkmlang,$link1);
			$deliverkmlang++;
		}


		 $Indish++;
		}
		
		
	
	/***********************************************DELIVERY KM*********************************************************/
	
	/***********************************************zipcode *********************************************************/		
		$link = ConnectDB();	
	
	$queryzipcode= 'SELECT * FROM w_zipcode WHERE businessid = $1';
	pg_prepare($link,'sqlInZip1',$queryzipcode);
	$deliveryZipIn = pg_execute($link,'sqlInZip1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	
	while($record_delivery_Zip = pg_fetch_object($deliveryZipIn)) {
		
		if($Indish == 0)
		  $myfirstrec = BElementInsertBodyCustom($record_delivery_Zip,'w_zipcode',$newbid,'businessid',$Indish,$link,'');
		   else 
		   BElementInsertBodyCustom($record_delivery_Zip,'w_zipcode',$newbid,'businessid',$Indish,$link, $myfirstrec);
		  
		 $Indish++;
		}
		
		
	
	/**********************************************zipcode********************************************************/
	
	/***********************************************Categories*********************************************************/		
	
	$link = ConnectDB();	

	$queryCatNew = 'SELECT * FROM w_categories WHERE business = $1';
	pg_prepare($link,'sqlCatN1',$queryCatNew);
	$resultCatNew = pg_execute($link,'sqlCatN1',array($oid));

	$Indish = 0;
	$arr6 = array();
	while($record_catnew = pg_fetch_object($resultCatNew)) {
		$catnewid = BElementInsertBody($record_catnew,'w_categories',$newbid,'business',$Indish,$link);
		$arr6[$record_catnew->id] = $catnewid;
		$arrCatNew[]  = $catnewid;
		$path =    $CFG->dirimages."categories/".$record_catnew->id."/1/"; //old
		$oldname =  $path."original.jpg";
		if(file_exists($oldname)) {
			$pathMain = $CFG->dirimages."categories/". $catnewid."/1/"; //new
			MoveBusinessImages_backup($pathMain,$oldname);
		}

		$link1 = ConnectDB();	
		$querycategorieslang = 'SELECT * FROM w_categories_lang WHERE categories_id= $1';
		pg_prepare($link1,'sqlcategorylang'.$record_catnew->id,$querycategorieslang);
		$resultcategorylang = pg_execute($link1,'sqlcategorylang'.$record_catnew->id,array($record_catnew->id));
		pg_close($link1);

		$categorylang=0;
		while($recordcategorylang = pg_fetch_object($resultcategorylang)){	
			$link1 = ConnectDB();	
			unset($catlang);
			$catlang = $categorylang.$Indish;	
			$deliverykmnwid = BElementInsertBodyCustomCat($recordcategorylang,'w_categories_lang',$catnewid,'categories_id',$newbid,'business_id',$catlang,$link1);
			$categorylang++;
		}
		$Indish++;
	}

		$link1 = ConnectDB();
		$querycategoriesupdate = 'UPDATE w_business SET categories = $1 WHERE id=$2 ';
		pg_prepare($link1,'sqlcategorylang_catupdate'.$record_catnew->id,$querycategoriesupdate);
		pg_execute($link1,'sqlcategorylang_catupdate'.$record_catnew->id,array(json_encode($arrCatNew),$newbid));
		
		$querycategoriesupdate1 = 'UPDATE w_dishes SET category = $1 WHERE id=$2';
		pg_prepare($link1,'sqldish_update1'.$record_catnew->id,$querycategoriesupdate1);
		
		pg_prepare($link1,'sqldish_category','SELECT category FROM w_dishes WHERE id=$1');
		foreach($arrd as $k=>$values){	
			$resultcat = pg_execute($link1,'sqldish_category',array($values));
			$rowcat = pg_fetch_array($resultcat);
			unset($catkey);
			$catkey = $rowcat['category'];
				
			pg_execute($link1,'sqldish_update1'.$record_catnew->id,array($arr6[$catkey],$values));
		}
		
		
		pg_close($link1);

		
	
	/***********************************************Categories*********************************************************/
	/***********************************************SubCategories*********************************************************/	
	if($_SESSION['scriptid'] == '4'){	
		$link = ConnectDB();	
		
		$querySubCatNew = 'SELECT * FROM w_subcategories WHERE business = $1';
		pg_prepare($link,'sqlSubCatN1',$querySubCatNew);
		$resultSubCatNew = pg_execute($link,'sqlSubCatN1',array($oid));
		
		
		$Indish = 0;
		$arrsubcat = array();
		while($record_subcatnew = pg_fetch_object($resultSubCatNew)) {
			$subcatnewid = BElementInsertBodyCustomCat($record_subcatnew,'w_subcategories',$newbid,'business',$arr6[$record_subcatnew->category],'category',$Indish,$link1);
			
			$arrsubcat[$record_subcatnew->id] = $subcatnewid;
			$arrSubCatNew[]  = $subcatnewid;

			$link1 = ConnectDB();	
			$querysubcategorieslang = 'SELECT * FROM w_subcategories_lang WHERE subcategories_id= $1';
			pg_prepare($link1,'sqlsubcategorylang'.$record_subcatnew->id,$querysubcategorieslang);
			$resultsubcategorylang = pg_execute($link1,'sqlsubcategorylang'.$record_subcatnew->id,array($record_subcatnew->id));
			pg_close($link1);

			$subcategorylang=0;
			while($recordsubcategorylang = pg_fetch_object($resultsubcategorylang)){	
				$link1 = ConnectDB();	
				unset($catlang);
				$subcatlang = $subcategorylang.$Indish;	
				$deliverykmnwid = BElementInsertBodyCustomCat($recordsubcategorylang,'w_subcategories_lang',$subcatnewid,'subcategories_id',$newbid,'business_id',$subcatlang,$link1);
				$subcategorylang++;
			}
				 
			 $Indish++;
		}

		$link1 = ConnectDB();	
		$querysubcategoriesupdate1 = 'UPDATE w_dishes SET subcategory = $1 WHERE id=$2';
		pg_prepare($link1,'sqldish_update1sub'.$record_subcatnew->id,$querysubcategoriesupdate1);	
		pg_prepare($link1,'sqldish_subcategory','SELECT subcategory FROM w_dishes WHERE id=$1');
		foreach($arrd as $k=>$values){	
			$resultcat = pg_execute($link1,'sqldish_subcategory',array($values));
			$rowcat = pg_fetch_array($resultcat);
			unset($catkey);
			$catkey = $rowcat['subcategory'];			
			pg_execute($link1,'sqldish_update1sub'.$record_subcatnew->id,array($arrsubcat[$catkey],$values));
		}
		pg_close($link1);
	}
		
	
	/***********************************************SubCategories*********************************************************/
	/***********************************************Gallery*********************************************************/		
		$link = ConnectDB();	
	
	$querygal = 'SELECT * FROM w_gallery WHERE business = $1';
	pg_prepare($link,'sqlIng',$querygal);
	$resultgallery = pg_execute($link,'sqlIng',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	while($record_gallery = pg_fetch_object($resultgallery)) {
		
		 $gallerid = BElementInsertBodyCustom($record_gallery,'w_gallery',$newbid,'business',$Indish,$link,'');
		 
		  $gallerids[]  = $gallerid;
			   $path =    $CFG->dirimages."gallery/".$record_gallery->id."/"; //old
			   $oldname =  $path."normal.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = $CFG->dirimages."gallery/". $gallerid."/"; //new
			  MoveBusinessImages_gallery_backup($pathMain,$oldname);
			  }


			  $link1 = ConnectDB();	
		$querygallerylang = 'SELECT * FROM w_gallery_lang WHERE gallery_id= $1';
		pg_prepare($link1,'sqlgallerylang'.$record_gallery->id,$querygallerylang);
		$resultgallerylang = pg_execute($link1,'sqlgallerylang'.$record_gallery->id,array($record_gallery->id));
		pg_close($link1);

		$gallerylang=0;
		while($recordgallerylang = pg_fetch_object($resultgallerylang)){	
			$link1 = ConnectDB();	
			unset($gallang);
			$gallang = $gallerylang.$Indish;	
			$deliverykmnwid = BElementInsertBody($recordgallerylang,'w_gallery_lang',$gallerid,'gallery_id',$gallang,$link1);
			$gallerylang++;
		}


		 $Indish++;
		}
		
		
	
	/***********************************************Gallery*********************************************************/

	/***********************************************OFFER*********************************************************/		
		$link = ConnectDB();	
	
	$queryOffer= 'SELECT * FROM w_discountoffer WHERE business = $1';
	pg_prepare($link,'sqlOffer',$queryOffer);
	$resultOffer = pg_execute($link,'sqlOffer',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	while($record_offer = pg_fetch_object($resultOffer)) {
		
		 $offer = BElementInsertBodyCustom($record_offer,'w_discountoffer',$newbid,'business',$Indish,$link,'');



		/*$link1 = ConnectDB();	
		$querydooferlang = 'SELECT * FROM w_discountoffer_lang WHERE disoffer_id= $1';
		pg_prepare($link1,'sqldooferlang'.$record_offer->id,$querydooferlang);
		$resultdofferlang = pg_execute($link1,'sqldooferlang'.$record_offer->id,array($record_offer->id));
		pg_close($link1);

		$dooferlang=0;
		while($recorddofferlang = pg_fetch_object($resultdofferlang)){	
			$link1 = ConnectDB();	
			unset($doflang);
			$doflang = $dooferlang.$Indish;	
			$doffernwid = BElementInsertBodyCustom($recordgallerylang,'w_discountoffer_lang',$offer,'disoffer_id',$doflang,$link1,'');
			$dooferlang++;
		}*/


		 $Indish++;
		}
		
		
	
	/***********************************************OFFER*********************************************************/
	
	/***********************************************INVOICE*********************************************************/		
		$link = ConnectDB();	
	
	$queryIn = 'SELECT * FROM w_invoice WHERE businessi = $1';
	pg_prepare($link,'sqlIn1',$queryIn);
	$resultIn = pg_execute($link,'sqlIn1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	while($record_invoice = pg_fetch_object($resultIn)) {
		
		 $arrInv[] = BElementInsertBody($record_invoice,'w_invoice',$newbid,'businessi',$Indish,$link);
		 $Indish++;
		}
		
		
	
	/***********************************************INVOICE*********************************************************/	
	/***********************************************EXTRA*********************************************************/		
	$link = ConnectDB();	
	
	$queryEx = 'SELECT * FROM w_extras WHERE business = $1';
	pg_prepare($link,'sqlEx1',$queryEx);
	$resultEx = pg_execute($link,'sqlEx1',array($oid));
	
	//echo pg_num_rows($resultD);
	$exs = 0;
	while($record_extras = pg_fetch_object($resultEx)) {
		$old_extra_id = $record_extras->id;
		 $newExtraId = BElementInsertBody($record_extras,'w_extras',$newbid,'business',$exs,$link);
		 $oldextra[$old_extra_id] = $newExtraId;

		 $link1 = ConnectDB();	
		$queryextraslang = 'SELECT * FROM w_extras_lang WHERE extras_id= $1';
		pg_prepare($link1,'sqlextraslang'.$record_extras->id,$queryextraslang);
		$resultextraslang = pg_execute($link1,'sqlextraslang'.$record_extras->id,array($record_extras->id));
		pg_close($link1);

		$extraslang=0;
		while($recordextraslang = pg_fetch_object($resultextraslang)){	
			$link1 = ConnectDB();	
			unset($exlang);
			$exlang = $extraslang.$exs;	
			$extrasnwid = BElementInsertBody($recordextraslang,'w_extras_lang',$newExtraId,'extras_id',$exlang,$link1);
			$extraslang++;
		}


		$exs++;
		}
		
	
		foreach($arrd as $dishextrachk) {
			
			$link = ConnectDB();
			
			$queryDishChk = 'SELECT * FROM w_dishes WHERE id = $1';
			 pg_prepare($link,'DishChk'.$dishextrachk,$queryDishChk);	
			 $extra_dish_chk = pg_execute($link,'DishChk'.$dishextrachk,array($dishextrachk));
			 $extra_dish_fetch = pg_fetch_array($extra_dish_chk);
			   if($extra_dish_fetch['extras']!="" && $extra_dish_fetch['extras']!="null") {
				  
				   $extras_array = json_decode($extra_dish_fetch['extras']);
				   
				   foreach($extras_array as $exs) {
					   if( $oldextra[$exs] !="") 
					   $extras_stores[$dishextrachk][] = $oldextra[$exs];
				   
				   }
				   if(count($extras_stores[$dishextrachk])>0) {
				
				 $queryDishExtraupdate = 'UPDATE w_dishes SET extras = $1 WHERE id=$2';
				 pg_prepare($link,'sqldish_exupdate2'.$dishextrachk.$exs,$queryDishExtraupdate); 
				 pg_execute($link,'sqldish_exupdate2'.$dishextrachk.$exs,array(json_encode($extras_stores[$dishextrachk]),$dishextrachk));
				   }
				 //  $extra
				   }
			
			}
		 
		
		if($oldextra !=""){
			foreach($oldextra as $key =>  $val )	
			{
				$link = ConnectDB();	
				
				$queryExo = 'SELECT * FROM w_extras_options WHERE set_id = $1';
				pg_prepare($link,'sqlExo'.$key,$queryExo);	
				$extra_option_val = pg_execute($link,'sqlExo'.$key,array($key));
				$exs =0;
				
				while($record_extras_options = pg_fetch_object($extra_option_val)) {
				
				
				/* $old_extra_id = $record_extras->id;*/
				 
				 $newExtraId = BElementInsertBody($record_extras_options,'w_extras_options',$val,'set_id',$exs,$link);
				// $oldextras[$old_extra_id] = $newExtraIds;

				 $link1 = ConnectDB();	
				$queryextrasoplang = 'SELECT * FROM w_extras_options_lang WHERE extras_options_id= $1 AND extras_id=$2';
				pg_prepare($link1,'sqlextrasoplang'.$record_extras_options->id,$queryextrasoplang);
				$resultextrasoplang = pg_execute($link1,'sqlextrasoplang'.$record_extras_options->id,array($record_extras_options->option_id,$record_extras_options->id));
				pg_close($link1);

				$extrasoplang=0;
				while($recordextrasoplang = pg_fetch_object($resultextrasoplang)){	
					$link1 = ConnectDB();	
					unset($exoplang);
					$exoplang = $extrasoplang.$exs;	
					$extrasnwid = BElementInsertBody($recordextrasoplang,'w_extras_options_lang',$newExtraId,'extras_options_id',$exoplang,$link1);
					$extrasoplang++;
				}


				 
				 $exs++;
				}
				
				
				
			}	
		}
	
	
	/***********************************************EXTRA*********************************************************/	
	

	}	

function BElementInsertBodyCustomCat($record,$table,$newbid,$mcolm,$newbid1,$mcolm1,$ck,$link) {
	
	$link = ConnectDB();	
	$id = -1;

		pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

		
	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				}else if($key == $mcolm1) {
				array_push($values,$newbid1);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
	
	}

function businessInsertBody($record,$table) {
	
	$link = ConnectDB();	
	$id = -1;

	pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		
		if($k!=0) {
			$query .=  ','.  $key;
			
			array_push($values,$val);
		}
			$k++;
			
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqli'.$id,$query);
	$result = pg_execute($link,'sqli'.$id,$values);
	pg_close($link);
	return $id;
	
	}
function BElementInsertBodySearch($record,$table,$newbid,$mcolm,$ck,$link,$groupfunctionid) {
	
	$link = ConnectDB();	
	$id = -1;


		pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];
	
	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	$i=0;
	$k=0;
	if($ck == 0) {
		$groupid = $id;	
		 
		} else {
		$groupid = $groupfunctionid;	
			
			}

	foreach($record as $key=>$val) {
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				}
			else if($key == "businessinsertid") {
				array_push($values,$groupid);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
	
	}
function BElementInsertBody($record,$table,$newbid,$mcolm,$ck,$link) {
	
	$link = ConnectDB();	
	$id = -1;

		pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

		
	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
	
	}

function MoveBusinessImages_backup($root,$oldname)
	{
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

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image->gray();		
		$image->save($folder.'minigray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(110,110);
		$image->save($folder.'medium.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(399,307);
		$image->save($folder.'panel.jpg');
	
	}
	
	function MoveBusinessImages_backup_admin($root,$oldname)
	{
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

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image->gray();		
		$image->save($folder.'minigray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(110,110);
		$image->save($folder.'medium.jpg');
		
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(475,85);
		$image->save($folder.'admin.jpg');
		
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(1349,292);
		$image->save($folder.'banner.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(399,307);
		$image->save($folder.'panel.jpg');
	
	}


	function MoveBusinessImages_gallery_backup($root,$oldname)
	{
	$folder = $root;
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);


	
	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
		copy($oldname,$finalname);
		
		
	//create thumbnail and regular size
		

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(205,214);
		$image->save($folder.'full.jpg');
				
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(1349,292);
		$image->save($folder.'gallery.jpg');



		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(399,307);
		$image->save($folder.'panel.jpg');
	
	}

	function FetchAllCategory($id){
		
		$link = ConnectDB();
		
		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result4 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result4);
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['admin_lang'];	
		}
		
		pg_prepare($link,'sql',"SELECT * FROM w_categories where business=$1");
		$result = pg_execute($link,'sql',array($id));
		$category =array();	
		
		while($row = pg_fetch_array($result)){
		//	unset($cat);
		$cat = new stdClass();
			$cat->id = $row['id'];
			$cat->name = FetchBusinessCategoryLangDefault($defultlang,$row['id'],$link);
			array_push($category, $cat);
		}
		echo json_encode($category);
	}	
	
	
function FetchBusinessCategoryLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}


function FetchAllSubCateIDData($data,$id){
	$link = ConnectDB();
		
		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result4 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result4);
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['admin_lang'];	
		}
	//$defultlang = $data;
	pg_prepare($link,'sqlsubcat','SELECT * from w_subcategories WHERE business=$1 AND category=$2 ORDER BY id ASC');
	$result = pg_execute($link,'sqlsubcat',array($data,$id));
	$categorieslang = array();
	
	while($row = pg_fetch_array($result)){
		unset($categorylang);
		$categorylang->id = $row['id'];
		$categorylang->name = FetchSubCatenameLangDefault($defultlang,$row['id'],$link);
		if($categorylang->name !=null)
		array_push($categorieslang,$categorylang);	
	}
	echo json_encode($categorieslang);
}

function FetchSubCatenameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang22'.$cid,'SELECT * from w_subcategories_lang WHERE subcategories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang22'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function FetchAllBusinessCategoryIDData($data,$id){
	$link = ConnectDB();
	$defultlang = $data;
	pg_prepare($link,'sql','SELECT * from w_categories WHERE business=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($id));
	$categorieslang = array();
	
	while($row = pg_fetch_array($result)){
		unset($categorylang);
		$categorylang->id = $row['id'];
		$categorylang->name = FetchCatenameLangDefault($defultlang,$row['id'],$link);
		if($categorylang->name !=null)
		array_push($categorieslang,$categorylang);	
	}
	echo json_encode($categorieslang);
}
function FetchCatenameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang22'.$cid,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang22'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function DeleteImage($id,$imgid){
	require('../config.php');
	$link = ConnectDB($CFG);

	if($imgid == 1)
		$query = "UPDATE w_dishes SET isimg=0 WHERE id=$id";		
	if($imgid == 2)
		$query = "UPDATE w_dishes SET isimg2=0 WHERE id=$id";
	if($imgid == 3)
		$query = "UPDATE w_dishes SET isimg3=0 WHERE id=$id";		
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
		
	pg_close($link);
}




function FetchOptionTotalPrice($ids){

    $link = ConnectDB();
    $price = array();      
    $ids = json_decode($ids);
    
    foreach($ids as $id){
		pg_prepare($link,'sqlfetchprice',"SELECT * FROM w_extras_options where set_id=$1");
		$result = pg_execute($link,'sqlfetchprice',array($id));
		if(pg_num_rows($result)>0){
			while($row = pg_fetch_array($result)){
				array_push($price, $row['price']);
			}
		}
    }
    $totalprice = 0;
	if (!empty($price)) {
		foreach ($price as $key => $value) {
			$totalprice = $totalprice + $value;
		}
	}
	echo $totalprice;   
    pg_close($link);
}

function FetchMetasData($id){
	$link = ConnectDB();
		pg_prepare($link,'sqlb',"SELECT * FROM w_business where id=$1");
		$result = pg_execute($link,'sqlb',array($id));
		
		pg_prepare($link,'sqlbbb',"SELECT * FROM w_business_meta_seo_lang where business_id=$1");
		$result1 = pg_execute($link,'sqlbbb',array($id));
		
		$metas =array();	
		
		while($row = pg_fetch_array($result)){
			//unset($meta);
			$meta = new stdClass();
			$meta->id = $row['id'];
			$meta->mkeywords = $row['mkeywords'];
			$meta->mdescription = $row['mdescription'];
			$meta->pdesc = $row['pdesc'];
			
			$promotionarray = array();
			$abusinessarray = array();
			while($row1 = pg_fetch_array($result1)){
				$promotionarray[$row1['lang_id']] = $row1['promotion_lang'];
				
			}
			$meta->abusiness = $row['abusiness'];
			$meta->promotion = $promotionarray;
			
			array_push($metas, $meta);
		}
		echo json_encode($metas);
	
	
}

function SaveMetaSeoData($data){
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);

	
	foreach($data->fields as $name=>$set){
		
		if($name == "abusiness"){
			$set->value = base64_decode($set->value);
			$set->ivalue = base64_decode($set->ivalue);	

			$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
			$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

			$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
			$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');
		}else{
			$set->value = str_replace("@@","+",$set->value);
			$set->ivalue = str_replace("@@","+",$set->ivalue);

			$data->fields->$name->value = base64_decode($set->value);
			$data->fields->$name->ivalue = base64_decode($set->ivalue);	
		}
	}

	$form = $data;


	$id = $form->id;
	print_r($form);
	$nameval = $form->fields->promotion->value;
	$namelang = explode(",",$nameval);
	

	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($namelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->promotion->value = str_replace("@@@",",",$nlang);
		}
	}

	
	$mkeywords = $form->fields->mkeywords->value;
	$mdescription = $form->fields->mdescription->value;
	$pdesc = $form->fields->pdesc->value;
	$abusiness = $form->fields->abusiness->value;
	$promotion = $form->fields->promotion->value;
	
	pg_prepare($link,'sqlbu','UPDATE w_business SET mkeywords=$1,mdescription=$2,pdesc=$3,abusiness=$4,promotion=$5 WHERE id=$6');
	pg_execute($link,'sqlbu',array($mkeywords,$mdescription,$pdesc,$abusiness,$promotion,$id));
	
	
	
		
	
	
	foreach($namelang as $key=>$nlang){
			
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch52'.$key,'SELECT * FROM w_business_meta_seo_lang where lang_id=$1 AND business_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch52'.$key,array($key,$id));
				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->business_id = new stdClass();
					$forms->fields->business_id->ivalue = '';
					$forms->fields->business_id->value = $id;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->promotion_lang = new stdClass();
					$forms->fields->promotion_lang->value = str_replace("@@@",",",$namelang[$key]);
					$forms->fields->promotion_lang->ivalue = '';
					

					InsertQuery('w_business_meta_seo_lang',$forms->fields,$CFG);

				}else{
					$prolang = str_replace("@@@",",",$namelang[$key]);
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_business_meta_seo_lang SET promotion_lang=$1 where lang_id=$2 and business_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($prolang,$key,$id));					
				}
				
					
		}
	

	

		
	
	
}

function BElementInsertBodyCustom($record,$table,$newbid,$mcolm,$ck,$link,$groupfunctionid) {
	
	$link = ConnectDB();	
	$id = -1;

	pg_prepare($link,'sql',"SELECT id from ".$table." order by id desc");
	$result = pg_execute($link,'sql',array());

	
		$row = pg_fetch_array($result);
			$id = $row['id']+1;

	if ($id==-1)
		die();
		
		if($ck == 0) {
		$groupid = $id;	
		 
		} else {
		$groupid = $groupfunctionid;	
			
			}

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				}
			else if($key == "businessinsertid") {
				array_push($values,$groupid);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
	
	}



/*************************************************/
function FetchAllCountriesIDData($data){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sql','SELECT * from w_countries where enabled=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array('TRUE'));
	$countries = array();
	
	while($row = pg_fetch_array($result)){
		unset($country);
		$country->id = $row['id'];
		$country->name = FetchCountriesLangDefault($defultlang,$row['id'],$link);
		if($country->name !=null)
		array_push($countries,$country);	
	}
	echo json_encode($countries);
}

function FetchCountriesLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
/****************************************************************/
function FetchAllColonyNeighborhoodIDData($data,$countryid,$cityid){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sql','SELECT * from w_neighborhood WHERE country=$1 AND city=$2 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($countryid,$cityid));
	$neighborhoods = array();
	
	while($row = pg_fetch_array($result)){
		unset($neighborhood);
		$neighborhood->id = $row['id'];
		$neighborhood->name = FetchColonyNeighborthoodLangDefault($defultlang,$row['id'],$link);
		array_push($neighborhoods,$neighborhood);	
	}
	echo json_encode($neighborhoods);
}

function FetchColonyNeighborthoodLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang55'.$cid,'SELECT * from w_neighborhood_lang WHERE neighborhood_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang55'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

/**********************************************************************/

function FetchAllCityIDData($data,$countryid){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sqlcity','SELECT * from w_franchises WHERE country=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sqlcity',array($countryid));
	$cities = array();
	
	while($row = pg_fetch_array($result)){
		unset($city);
		$city->id = $row['id'];
		$city->city = FetchCityLangDefault($defultlang,$row['id'],$link);
		if($city->city !=null)
		array_push($cities,$city);	
	}
	echo json_encode($cities);
}

function FetchCityLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlcitydefalutlang'.$cid,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlcitydefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
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


function FetchExtrasQtyPersonData(){
	$link = ConnectDB();

	$query_p = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlp',$query_p);
    $result_p = pg_execute($link,'sqlp',array('businesspagpersonsetting'));
    $row_p = pg_fetch_array($result_p);
	$person1 = $row_p["value"];
	
	$query_q = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlq',$query_q);
    $result_q = pg_execute($link,'sqlq',array('businesspagqtysetting'));
    $row_q = pg_fetch_array($result_q);
	$qty1 = $row_q["value"];

	$extra = new stdClass();
	//unset($extra);
	$extra->configqty = $qty1;
	$extra->configperson = $person1;
	echo json_encode($extra);
	
}

function ChangePopular($bid,$chk){
    $link = ConnectDB();
    //echo $data;
    $form = parse($data);
    
  
    pg_prepare($link,'sqlpo','UPDATE w_business SET is_popular=$1 WHERE id=$2');
    pg_execute($link,'sqlpo',array($chk,$bid));
    
    pg_close($link);
    

        
    
    
}

function FetchWidgetIFrame($id){
	$link=ConnectDB();
	pg_prepare($link,'sqlfetchwidget','SELECT * from w_business_widget_iframe where business_id=$1');
	$resultiframe= pg_execute($link,'sqlfetchwidget',array($id));
	$iframes = array();
	

	while($rowiframe = pg_fetch_array($resultiframe)){
		$iframe = new stdClass();
		$iframe->id =$rowiframe['id'];
		$iframe->name =$rowiframe['name'];
		$iframe->businessid=$rowiframe['business_id'];
		$iframe->background_color=$rowiframe['background_color'];
		$iframe->width=$rowiframe['width'];
		$iframe->height=$rowiframe['height'];
		$iframe->display_device=$rowiframe['display_device'];
		$iframe->footer_hide=$rowiframe['footer_hide'];
		$iframe->header_hide=$rowiframe['header_hide'];
		$iframe->progressbar_hide=$rowiframe['progressbar_hide'];
		$iframe->embedded_code=$rowiframe['embedded_code'];
		$iframe->date=$rowiframe['date'];
		$iframe->enabled=$rowiframe['enabled'];
		array_push($iframes,$iframe);
	}
	echo json_encode($iframes);
}

function FetchWidgetButton($id){
	$link=ConnectDB();
	pg_prepare($link,'sqlfetchbuttonwidget','SELECT * from w_business_widget_button where business_id=$1');
	$resultbutton2= pg_execute($link,'sqlfetchbuttonwidget',array($id));
	$buttons = array();
	

	while($rowbutton = pg_fetch_array($resultbutton2)){
		$button = new stdClass();
		$button->id =$rowbutton['id'];
		$button->name =$rowbutton['name'];
		$button->businessid=$rowbutton['business_id'];
		$button->look_option=$rowbutton['look_option'];
		$button->button_color=$rowbutton['button_color'];
		$button->text_color=$rowbutton['text_color'];
		$button->text_font=$rowbutton['text_font'];
		$button->button_size=$rowbutton['button_size'];
		$button->footer_hide=$rowbutton['footer_hide'];
		$button->header_hide=$rowbutton['header_hide'];
		$button->progressbar_hide=$rowbutton['progressbar_hide'];
		$button->embedded_code=$rowbutton['embeddedcode'];
		$button->date=$rowbutton['date'];
		$button->enabled=$rowbutton['enabled'];
		array_push($buttons,$button);
	}
	echo json_encode($buttons);
}

function FetchWidgetFloat($id){
	$link=ConnectDB();
	pg_prepare($link,'sqlfetchfloatwidget','SELECT * from w_business_widget_float where business_id=$1');
	$resultfloat= pg_execute($link,'sqlfetchfloatwidget',array($id));
	$floats = array();
	

	while($rowfloat = pg_fetch_array($resultfloat)){
		$float = new stdClass();
		//unset($float);
		$float->id =$rowfloat['id'];
		$float->name =$rowfloat['name'];
		$float->businessid=$rowfloat['business_id'];
		$float->button_color=$rowfloat['button_color'];
		$float->text_color=$rowfloat['text_color'];
		$float->text_font=$rowfloat['text_font'];
		$float->button_size=$rowfloat['button_size'];
		$float->text_size=$rowfloat['text_size'];
		$float->location=$rowfloat['location'];
		$float->footer_hide=$rowfloat['footer_hide'];
		$float->header_hide=$rowfloat['header_hide'];
		$float->progressbar_hide=$rowfloat['progressbar_hide'];
		$float->embedded_code=$rowfloat['embeddedcode'];
		$float->date=$rowfloat['date'];
		$float->enabled=$rowfloat['enabled'];
		array_push($floats,$float);
	}
	echo json_encode($floats);
}


function IframeSave($id,$data)
{
	require('../config.php');

     //$form = parse($data);
    //print_r($form);
	$widget = $data;
	$link = ConnectDB($CFG);
	$businessid=$id;
	


	pg_prepare($link,'sql1',"SELECT nextval('w_business_widget_iframe_id_seq') as key");
  	$resultkey = pg_execute($link,'sql1',array());
  	if (pg_num_rows($resultkey)==1)  
	while($row = pg_fetch_array($resultkey))
		$id = $row['key'];
	$name="iFrameWidget_".$id;
	//$embeddedcode=$form->embeddedcode->value;
	pg_prepare($link,'sqlinsertiframe','Insert into w_business_widget_iframe (id,business_id,embedded_code,name)values ($1,$2,$3,$4)');
	$resultiframe= pg_execute($link,'sqlinsertiframe',array($id,$businessid,$widget,$name));
	echo $id;
}



function ButtonSave($id,$data)
{
	require('../config.php');

     $widget = $data;
    //print_r($form);
   
	$link = ConnectDB($CFG);
	$businessid=$id;

	pg_prepare($link,'sql1',"SELECT nextval('w_business_widget_button_id_seq') as key");
  	$resultkey = pg_execute($link,'sql1',array());
  	if (pg_num_rows($resultkey)==1)  
	while($row = pg_fetch_array($resultkey))
		$id = $row['key'];
	$name="ButtonWidget_".$id;
	//$embeddedcode=$form->embeddedcode->value;
	pg_prepare($link,'sqlinsertiframe','Insert into w_business_widget_button (id,business_id,embeddedcode,name)values ($1,$2,$3,$4)');
	$resultiframe= pg_execute($link,'sqlinsertiframe',array($id,$businessid,$widget,$name));
	echo 'ok';
}




function FloatSave($id,$data)
{
	require('../config.php');

     $widget = $data;
    //print_r($form);

	$link = ConnectDB($CFG);
	$businessid=$id;
	

	pg_prepare($link,'sql1',"SELECT nextval('w_business_widget_float_id_seq') as key");
  	$resultkey = pg_execute($link,'sql1',array());
  	if (pg_num_rows($resultkey)==1)  
	while($row = pg_fetch_array($resultkey))
		$id = $row['key'];
	$name="FloatWidget_".$id;
	//$embeddedcode=$form->embeddedcode->value;
	pg_prepare($link,'sqlinsertfloat','Insert into w_business_widget_float (id,business_id,embeddedcode,name)values ($1,$2,$3,$4)');
	$resultiframe= pg_execute($link,'sqlinsertfloat',array($id,$businessid,$widget,$name));
	echo 'ok';
}


function GetTimeZoneData($id){
	require('../config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,'sqlR','SELECT * from w_franchises where id=$1');
	$result= pg_execute($link,'sqlR',array($id));
	$rowiframes = pg_fetch_array($result);
	echo $rowiframes['timezone'];
}

function SetEnablediframe($id,$enabled)
{
	require('../config.php');
	$link = ConnectDB();
	pg_prepare($link,'sqlenableiframe','Update w_business_widget_iframe set enabled=$1 where id=$2');
	if(pg_execute($link,'sqlenableiframe',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}


function SetEnabledbutton($id,$enabled)
{
	require('../config.php');
	$link = ConnectDB();
	pg_prepare($link,'sqlenablebutton','Update w_business_widget_button set enabled=$1 where id=$2');
	if(pg_execute($link,'sqlenablebutton',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}

function SetEnabledfloat($id,$enabled)
{
	require('../config.php');
	$link = ConnectDB();
	pg_prepare($link,'sqlenablefloat','Update w_business_widget_float set enabled=$1 where id=$2');
	if(pg_execute($link,'sqlenablefloat',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}

function FetchBusinesswidgetData($id)
{
	require('../config.php');
	$link = ConnectDB();
	pg_prepare($link,'sqlfetchiframewidget','SELECT * from w_business_widget_iframe where id=$1');
	$resultiframedata= pg_execute($link,'sqlfetchiframewidget',array($id));
	$iframes = array();
	

	while($rowiframes = pg_fetch_array($resultiframedata)){
		$iframe = new stdClass();
		$iframe->id =$rowiframes['id'];
		$iframe->businessid=$rowiframes['business_id'];

		$iframe->embedded_code= stripcslashes(stripcslashes(html_entity_decode($rowiframes['embedded_code'])));
		$iframe->date=$rowiframes['date'];
		$iframe->enabled=$rowiframes['enabled'];
		array_push($iframes,$iframe);
	}
	echo json_encode($iframes);

}

function FetchButtonWidgetData($id)
{
	require('../config.php');
	$link = ConnectDB();
	pg_prepare($link,'sqlfetchiframewidget','SELECT * from w_business_widget_button where id=$1');
	$resultiframedata= pg_execute($link,'sqlfetchiframewidget',array($id));
	$buttons = array();
	

	while($rowiframes = pg_fetch_array($resultiframedata)){
		$button = new stdClass();
		$button->id =$rowiframes['id'];
		$button->businessid=$rowiframes['business_id'];
		$button->embedded_code=stripcslashes(stripcslashes(html_entity_decode($rowiframes['embeddedcode'])));
		$button->date=$rowiframes['date'];
		$button->enabled=$rowiframes['enabled'];
		array_push($buttons,$button);
	}
	echo json_encode($buttons);
}


function FetchFloatWidgetData($id)
{
	require('../config.php');
	$link = ConnectDB();
	pg_prepare($link,'sqlfetchiframewidget','SELECT * from w_business_widget_float where id=$1');
	$resultiframedata= pg_execute($link,'sqlfetchiframewidget',array($id));
	$floats = array();
	

	while($rowiframes = pg_fetch_array($resultiframedata)){
		$float = new stdClass();
		$float->id =$rowiframes['id'];
		$float->businessid=$rowiframes['business_id'];
		$float->embedded_code=stripcslashes(stripcslashes(html_entity_decode($rowiframes['embeddedcode'])));
		$float->date=$rowiframes['date'];
		$float->enabled=$rowiframes['enabled'];
		array_push($floats,$float);
	}
	echo json_encode($floats);
}

function Deleteiframewidget($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_business_widget_iframe WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		}
	}

	function DeleteButtonwidget($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_business_widget_button WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		}
	}

	function DeleteFloatwidget($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_business_widget_float WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		}
	}

	function UpdateIframeData($id,$data)
	{
		
	
		require('../config.php');
		$link = ConnectDB();
		
		$widget=$data;
		

	    pg_prepare($link,'sql','Update w_business_widget_iframe set embedded_code=$1 WHERE id=$2');
		$result = pg_execute($link,'sql',array($widget,$id));	
		pg_close($link);
	}


	function UpdateButtonData($id,$data)
	{
		
	
		require('../config.php');
		$link = ConnectDB();

			
		
		$widget=$data;

	    pg_prepare($link,'sql','Update w_business_widget_button set embeddedcode=$1 WHERE id=$2');
		$result = pg_execute($link,'sql',array($widget,$id));	
		pg_close($link);
		echo 'ok';
	}


	function UpdateFloatData($id,$data)
	{
		
	
		require('../config.php');
		$link = ConnectDB();
		
		$widget=$data;


	    pg_prepare($link,'sql','Update w_business_widget_float set embeddedcode=$1 WHERE id=$2');
		$result = pg_execute($link,'sql',array($widget,$id));	
		pg_close($link);
	}

	function Fetchallembdatafloat($business,$data)
	{
		
	require('../config.php');
	$link = ConnectDB();		
	

	$data = parse($data);
	$widget = array();
	$total = count($data->ids);
	if(!empty($data->ids) && $total > 0){	
		foreach ($data->ids as $id)	{
			$query = "SELECT * from w_business_widget_float where id=$1 and business_id=$2";
			pg_prepare($link,'sqlview'.$id,$query);
			$result = pg_execute($link,'sqlview'.$id,array($id,$business));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					$wid = new stdClass();
					$wid->id = $row['id'];
					$wid->name = $row['name'];
					$wid->widget = stripcslashes(str_replace('&quot;','',$row['embeddedcode']));
					
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					if($wid->widget !=null){
						array_push($widget,$wid);
					}
				}		
			}
		}
	}else{
			$query = "SELECT * from w_business_widget_float where business_id=$1";
			pg_prepare($link,'sqlview',$query);
			$result = pg_execute($link,'sqlview',array($business));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					$wid = new stdClass();
					$wid->id = $row['id'];
					$wid->name = $row['name'];
					$wid->widget = stripcslashes(str_replace('&quot;','',$row['embeddedcode']));
					
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					 if($wid->widget !=null){
						array_push($widget,$wid);
					 }
				}		
			}
	}
		echo json_encode($widget);
	}



	function Fetchallembdatabutton($business,$data)
	{
		
	require('../config.php');
	$link = ConnectDB();		
	

	$data = parse($data);
	$widget = array();
	$total = count($data->ids);
	if(!empty($data->ids) && $total > 0){	
		foreach ($data->ids as $id)	{
			$query = "SELECT * from w_business_widget_button where id=$1 and business_id=$2";
			pg_prepare($link,'sqlview'.$id,$query);
			$result = pg_execute($link,'sqlview'.$id,array($id,$business));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					$wid = new stdClass();
					//unset($wid);
					
					$wid->id = $row['id'];
					$wid->name = $row['name'];
					$wid->widget = stripcslashes(str_replace('&quot;','',$row['embeddedcode']));
					
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					if($wid->name !=null){
						array_push($widget,$wid);
					}
				}		
			}
		}
	}else{
			$query = "SELECT * from w_business_widget_button where business_id=$1";
			pg_prepare($link,'sqlview',$query);
			$result = pg_execute($link,'sqlview',array($business));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					$wid = new stdClass();
					$wid->id = $row['id'];
					$wid->name = $row['name'];
					$wid->widget = stripcslashes(str_replace('&quot;','',$row['embeddedcode']));
					
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					// if($wid->widget_name !=null){
						array_push($widget,$wid);
					// }
				}		
			}
	}
		echo json_encode($widget);
	}


	function Fetchallembdataiframe($business,$data)
	{
		
	require('../config.php');
	$link = ConnectDB();		
	

	$data = parse($data);
	$widget = array();
	$total = count($data->ids);
	if(!empty($data->ids) && $total > 0){	
		foreach ($data->ids as $id)	{
			$query = "SELECT * from w_business_widget_iframe where id=$1 and business_id=$2";
			pg_prepare($link,'sqlview'.$id,$query);
			$result = pg_execute($link,'sqlview'.$id,array($id,$business));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					$wid = new stdClass();
					//unset($wid);
					$wid->id = $row['id'];
					$wid->name = $row['name'];
					$wid->widget = stripcslashes(stripcslashes(str_replace('&quot;','',$row['embedded_code'])));
					
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					if($wid->name !=null){
						array_push($widget,$wid);
					}
				}		
			}
		}
	}else{
			$query = "SELECT * from w_business_widget_iframe where business_id=$1";
			pg_prepare($link,'sqlview',$query);
			$result = pg_execute($link,'sqlview',array($business));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					$wid = new stdClass();
					$wid->id = $row['id'];
					$wid->name = $row['name'];
					$wid->widget = stripcslashes(stripcslashes(str_replace('&quot;','',$row['embedded_code'])));
					
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					// if($wid->widget_name !=null){
						array_push($widget,$wid);
					// }
				}		
			}
	}
		echo json_encode($widget);
	}



	function GetBusinesType($id){

		require('../config.php');
		$link = ConnectDB();		
		$query = "SELECT tab_food,tab_alcohol,tab_groceries,tab_laundry from w_business where id=$1";
		pg_prepare($link,'sqlview',$query);
		$result = pg_execute($link,'sqlview',array($id));	
		$row = pg_fetch_array($result);

		pg_prepare($link,'sqlneighborhoodsetting2',"SELECT * FROM w_tabsettings where scriptid=$1");	
		$resn2 = pg_execute($link,'sqlneighborhoodsetting2',array($_SESSION['scriptid']));
		$res = pg_fetch_array($resn2);

		$business = new stdClass();
		$business->tab_food = $row['tab_food'];
		$business->tab_alcohol = $row['tab_alcohol'];
		$business->tab_groceries = $row['tab_groceries'];
		$business->tab_laundry = $row['tab_laundry'];

		$business->tab_food_active = $res['tab_food'];
		$business->tab_alcohol_active = $res['tab_alcohol'];
		$business->tab_groceries_active = $res['tab_groceries'];
		$business->tab_laundry_active = $res['tab_laundry'];


		echo json_encode($business);
	}
?>
