<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

/*EXAMPLE USE: 
[{"operation":"FetchAllFranchisesData"},{"operation":"FetchAllUsersData","filters":[{"name":"level","operator":"=","value":"2"}]}]
*/

$bulk = json_decode($_POST['data']);
//print_r($bulk);

//unset($response);
$link = ConnectDB();

define("IS_PAYPAL_ENABLED", 1);
$response = new stdClass();
if(is_array($bulk)){
foreach ($bulk as $data)
	{
	switch ($data->operation)
		{
		case 'FetchAllFranchisesData':
			$response->franchises = FetchAllFranchisesData($data->filters,$link);
		break;
		case 'FetchAllNeighborhoodData':
			$response->colony = FetchAllNeighborhoodData($data->filters,$link);
		break;
		case 'FetchAllUsersData':
			$response->users = FetchAllUsersData($data->filters,$link);
		break;
		case 'FetchAllCategoriesData':
			$response->categories = FetchAllCategoriesData($data->filters,$link);
		break;
		case 'FetchAllSubCategoriesData':
			$response->subcategories = FetchAllSubCategoriesData($data->filters,$link);
		break;
		case 'FetchAllZipcodeData':
			$response->zipcode = FetchAllZipcodeData($data->filters,$link);
		break;
			case 'FetchAllZipcodeDataB':
			$response->zipcode = FetchAllZipcodeDataB($data->filters,$link);
		break;
		case 'FetchUserData':
			$response->user = FetchUserData($data->id,$link);
		break;
		case 'FetchCountryCity':
			$response->countrycity = FetchCountryCity($link);
		break;
		case 'FetchBusinessData':
			$response->business = FetchBusinessData($data->id,$link);
		break;
		case 'FetchTabSettings':
			$response->tab = FetchTabSettings($link);
		break;
		
		case 'FetchAllBusinessData':
			$response->business = FetchAllBusinessData($link);
		break;
		
		case 'FetchFranchiseData':
			$response->franchise = FetchFranchiseData($data->id,$link);
		break;
		case 'FetchAdData':
			$response->ad = FetchAdData($data->id,$link);
		break;
		case 'FetchEdData':
			$response->ed = FetchEdData($data->id,$link);
		break;
		case 'FetchAllCountriesData':
			$response->countries = FetchAllCountriesData($link);
		break;
		case 'FetchDriverManagerData':
			$response->drivermanager = FetchDriverManagerData($data->id,$link);
		break;
		case 'FetchDriverManagerAllData':
			$response->drivermanager = FetchDriverManagerAllData($link);
		break;
		case 'FetchDriverGroupAllData':
			$response->drivergroup = FetchDriverGroupAllData($link);
		break;
		//For Driver Section
		case 'FetchDriverManagerData':
			$response->drivermanager = FetchDriverManagerData($data->id,$link);
		break;
		case 'FetchDMData':
			$response->drivermanager = FetchDMData($link);
		break;
		case 'FetchDriverManagerAllData':
			$response->drivermanager = FetchDriverManagerAllData($link);
		break;
		/*case 'FetchDriverGroupAllData':
			$response->drivergroup = FetchDriverGroupAllData($link);
		break;*/
		case 'FetchDriverGroupData':
			$response->drivergroup = FetchDriverGroupData($data->id,$link);
		break;
		case 'FetchDriverAllData':
			$response->driver = FetchDriverAllData($link);
		break;
		case 'FetchDriverData':
			$response->driver = FetchDriverData($data->id,$link);
		break;
		case 'FetchDData':
			$response->driver = FetchDData($link);
		break;
		case 'FetchDriverIdByEmail':
			$response->drivermail = FetchDriverIdByEmail($data->email,$link);
		break;
		case 'FetchDrivermanagerIdByEmail':
			$response->drivermanagermail = FetchDrivermanagerIdByEmail($data->email,$link);
		break;
		case 'GetManagelangConfig':
			$response->languageinfo = GetManagelangConfig($link);
		break;

		
		//End Driver section
		
		//country
		case 'FetchAllCountriesDataFrontSet':
			$response->countriesfrontset = FetchAllCountriesDataFrontSet($link);
		break;
		case 'FetchAllCitiesDataFrontSet';
		 $response->citiesfrontset = FetchAllCitiesDataFrontSet($link);
		break;
		case 'FetchAllBusinessDataFrontSet';
		 $response->businessfrontset = FetchAllBusinessDataFrontSet($link);
		break;
		case 'FetchOrderDataApproved';
		 $response->soundapproved = FetchOrderDataApproved($link);
		break;
		case 'GetSoundSettings';
		 $response->soundsettings = GetSoundSettings($link);
		break;


		case 'FetchUserSeePermission';
		 $response->seepermission = FetchUserSeePermission($link);
		break;

		case 'FetchSiteSetting';
		 $response->siteSetting = FetchSiteSetting($link);
		break;
		
		case 'FetchSpecialEnterprise';
		 $response->specialenterprise = FetchSpecialEnterprise($link);
		break;

		case 'FetchTimeFormat';
		 $response->timeformat = FetchTimeFormat($link);
		break;
		
		case 'FetchAllCurrency';
		 $response->currency = FetchAllCurrency($link);
		break;
		case 'FetchNeighbourhoodSettings';
		 $response->neighsettings = FetchNeighbourhoodSettings($link);
		break;
    case 'FetchAllBusinessPrinterPath';
		 $response->businessprinterpath = FetchAllBusinessPrinterPath($data->id,$link);
		break;
		case 'FetchAllBusinessPrinterPathEdit';
		 $response->businessprinterpath = FetchAllBusinessPrinterPathEdit($data->id,$link);
		break;
		case 'FetchAllBusinessPrinterPathOnly';
		 $response->businessprinterpathonly = FetchAllBusinessPrinterPathOnly($link);
		break;
		case 'FetchAllPrinterData':
			$response->printerdata = FetchAllPrinterData($link);
		break;
   		 case 'FetchPrinterData';
		 $response->printerdata = FetchPrinterData($data->id,$link);
		break;
		case 'FetchNName';
		 $response->fetchnname = FetchNName($data->id,$link);
		break;
		case 'FetchRestBringgPermission';
		 $response->RestBringgPermission = FetchRestBringgPermission($link);
		break;
	 case 'FetchBusinessReviewData';
	 	$response->br=FetchBusinessReviewData($data->id,$link);
		break;

		case 'FetchBusinessPointData':
			$response->bps = FetchBusinessPointData($data->id,$link);
		break;
		case 'FetchPointPermission':
			$response->pointpermission = FetchPointPermission($link);
		break;
		case 'Fetchconfigsettings':
			$response->configsettings = Fetchconfigsettings($link);
		break;
		case 'Fetchproductordersetting':
			$response->productordersetting = Fetchproductordersetting($link);
		break;
		case 'Fetchzipcodeordersetting':
			$response->zipcodeordersetting = Fetchzipcodeordersetting($link);
		break;
		
		}
	}
}
 

pg_close($link);
echo json_encode($response);


function FetchAllCountriesData($link){
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql','SELECT * from w_countries where scriptid=$1 AND enabled=$2 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid'],'TRUE'));
	$countries = array();
	
	
	while($row = pg_fetch_array($result)){
		//unset($country);
		$country = new stdClass(); 
		$country->id = $row['id'];
		$country->name = FetchCountriesLangDefault($defultlang,$row['id'],$link);
		if($country->name !=null)
		array_push($countries,$country);	
	}
	return $countries;
}

function FetchCountriesLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

/*function FetchAllCountriesData($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_countries');
	$result = pg_execute($link,'sql0',array());

	$countries = array();
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}

	return $countries;
	}*/






function FetchAllNeighborhoodData($filters,$link)
	{

		return GetAllNeighborhoodData($filters,$link);
		
	}

function FetchAllFranchisesData($filters,$link)
	{
	//ProvidersOnly();
	
	//if ($_SESSION['user']->level==0)
		return GetAllFranchisesData($filters,$link);
		/*else//admin requesting business data, we will only send him the data of his city...
		{
		if (empty($filters))
			{
			$filters = array();
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			}
			else
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .',"conditional":"AND"}'));
		return GetAllFranchisesData($filters,$link);
		}*/
	}

function GetAllNeighborhoodData($filters,$link)
	{
		
		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result1 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result1);
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['admin_lang'];	
		}

		//print_r($filters);
		$city_code = $filters[0]->value;
		$conditionalsvalues = array();
	$query = 'SELECT * FROM w_neighborhood WHERE w_neighborhood.enabled=true and city=$1';

	/*if (!empty($filters))	
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
		$query .= $conditionals;
		}
		*/
	//echo $query.'$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',array($city_code));

	$neighborhoods = array();
	
	while($row = pg_fetch_array($result))
		{
	//	unset($neighborhood);
		$neighborhood = new stdClass();
		unset($admin);
		$neighborhood->id = $row['id'];
		$neighborhood->city = $row['city'];
		$neighborhood->country = $row['country'];
		$neighborhood->name = FetchNeighborhoodDataLangDefault($defultlang,$row['id'],$link);

		
		array_push($neighborhoods,$neighborhood);
		}

	return $neighborhoods;}


function FetchNeighborhoodDataLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_neighborhood_lang WHERE neighborhood_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function GetAllFranchisesData($filters,$link)
	{
		
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
	$query = 'SELECT w_franchises.id,w_franchises.city,w_franchises.admin,w_franchises.enabled,w_franchises.tax,w_franchises.ga,w_franchises.currency,w_franchises.taxtype FROM w_franchises WHERE w_franchises.scriptid=$1';
array_push($conditionalsvalues,$_SESSION['scriptid']);
	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 1;
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
		
	pg_prepare($link,'sql112',$query);
	$result = pg_execute($link,'sql112',$conditionalsvalues);
	
	$franchises = array();
	
	$admin = new stdClass();
	while($row = pg_fetch_array($result))
		{
		$franchise = new stdClass();
		//unset($franchise);
		//unset($admin);
		$franchise->id = $row['id'];
		$franchise->city = FetchCityLangDefault($defultlang,$row['id'],$link);
		$franchise->enabled = $row['enabled'];
		$franchise->tax = $row['tax'];
		$franchise->taxtype = $row['taxtype'];
		$franchise->ga = $row['ga'];
		$franchise->currency = $row['currency'];
		
		if ($row['admin']!=null)
			{
			if ($row['level']<2)//can be admin
				{
				$admin->id = $row['admin'];
				$admin->name = $row['name'];
				$admin->lastname = $row['lastname'];
				$admin->lastname2 = $row['lastname2'];
				}
				else//user is not admin anymore
				{
				$admin->id = '';
				$admin->name = '';
				$admin->lastname = '';
				$admin->lastname2 = '';
				}
			}
			else
			{
			$admin->id = '';
			$admin->name = '';
			$admin->lastname = '';
			$admin->lastname2 = '';
			}

		$franchise->admin = $admin;
		if($franchise->city !=null)
		array_push($franchises,$franchise);
		}
	}else{
		
		$conditionalsvalues = array();
	$query = 'SELECT w_franchises.id,w_franchises.city,w_franchises.admin,w_franchises.enabled,w_franchises.tax,w_franchises.ga,w_franchises.currency,w_franchises.taxtype,w_users.name as name,w_users.lastname,w_users.lastname2,w_users.level FROM w_franchises INNER JOIN w_users ON w_franchises.admin = w_users.id WHERE w_franchises.scriptid=$1';
array_push($conditionalsvalues,$_SESSION['scriptid']);
	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 1;
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
		
	pg_prepare($link,'sql112',$query);
	$result = pg_execute($link,'sql112',$conditionalsvalues);
	
	$franchises = array();
	while($row = pg_fetch_array($result))
		{
		//($franchise);
		//unset($admin);
		$admin = new stdClass();
		$franchise = new stdClass();
		$franchise->id = $row['id'];
		$franchise->city = FetchCityLangDefault($defultlang,$row['id'],$link);
		$franchise->enabled = $row['enabled'];
		$franchise->tax = $row['tax'];
		$franchise->taxtype = $row['taxtype'];
		$franchise->ga = $row['ga'];
		$franchise->currency = $row['currency'];
		
		if ($row['admin']!=null)
			{
			if ($row['level']<2)//can be admin
				{
				$admin->id = $row['admin'];
				$admin->name = $row['name'];
				$admin->lastname = $row['lastname'];
				$admin->lastname2 = $row['lastname2'];
				}
				else//user is not admin anymore
				{
				$admin->id = '';
				$admin->name = '';
				$admin->lastname = '';
				$admin->lastname2 = '';
				}
			}
			else
			{
			$admin->id = '';
			$admin->name = '';
			$admin->lastname = '';
			$admin->lastname2 = '';
			}

		$franchise->admin = $admin;
		if($franchise->city !=null)
		array_push($franchises,$franchise);
		
	}
	}

	return $franchises;
	}
	
	function FetchCityLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlcitydefalutlang'.$cid,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlcitydefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
}

// function FetchAllUsersData($filters,$link)
// 	{
// 	//AdminsOnly();
// 	if ($_SESSION['user']->level==0)
// 		return GetAllUsersData($filters,$link);
// 	else//admin requesting business data, we will only send him the data of his city...
// 		{
// 		if (empty($filters))
// 			{
// 			$filters = array();
// 			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
// 			}
// 			else
// 			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .',"conditional":"AND"}'));
		
// 		array_push($filters,json_decode('{"modifier":"user","operator":"=","name":"id","value":'. $_SESSION['user']->id .',"conditional":"OR"}'));

// 		return GetAllUsersData($filters,$link);
// 		}
// 	}


function FetchAllUsersData($filters,$link)
	{
		//echo $_SESSION['user']->level;
	//AdminsOnly();
	if ($_SESSION['user']->level==0)
		return GetAllUsersData($filters,$link);
	else if($_SESSION['user']->level==1)//admin requesting business data, we will only send him the data of his city...
		{
		if (empty($filters))
			{
			$filters = array();
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			}
			else 
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .',"conditional":"AND"}'));
		
		array_push($filters,json_decode('{"modifier":"user","operator":"=","name":"id","value":'. $_SESSION['user']->id .',"conditional":"OR"}'));
		//print_r($filters);
		return GetAllUsersData($filters,$link);
		}
		else
		{

			if (empty($filters))
			{
			$filters = array();
			array_push($filters,json_decode('{"modifier":"user","operator":"=","name":"city","value":'. $_SESSION['user']->city .'}'));
			}
			else 
			array_push($filters,json_decode('{"modifier":"user","operator":"=","name":"city","value":'. $_SESSION['user']->city .'}'));
		
			//array_push($filters,json_decode('{"modifier":"user","operator":"=","name":"city","value":'. $_SESSION['user']->city .'}'));
			return GetAllUsersData($filters,$link);
		}
		
	}



function GetAllUsersData($filters,$link)
	{
	//AdminsOnly();	

	pg_prepare($link,'sqllangfetchbusiness','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetchbusiness',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}

	$conditionalsvalues = array();
	$query = 'SELECT w_users.id,w_users.name,w_users.lastname,w_users.lastname2,w_users.email,w_users.level,w_users.enabled FROM w_users LEFT JOIN w_franchises ON w_franchises.id=w_users.city where w_users.scriptid=$1';
array_push($conditionalsvalues,$_SESSION['scriptid']);
	if (!empty($filters))	
		{
		$conditionals = ' AND ';
		$count = 1;
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
		/*echo $query;
		print_r($conditionalsvalues);*/
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
	$users = array();

	while($row = pg_fetch_array($result))
		{
			//echo $defaultid;
		$user = new stdClass();
		//unset($user);
		$user->id = $row['id'];
		$user->name = FetchUserNameLangDefault($defaultid,$row['id'],$link);
		$user->lastname = FetchUserLastNameLangDefault($defaultid,$row['id'],$link);
		$user->lastname2 = FetchUserLastNameTwoLangDefault($defaultid,$row['id'],$link);
		$user->email = $row['email'];
		$user->enabled = $row['enabled'];
		$user->level = $row['level'];
		$user->levelname = GetLevelText($user->level);
		
		if ($_SESSION['user']->level==0){
		if($user->name !=null)
		array_push($users,$user);
		
		}else if($user->level>$_SESSION['user']->level){//only send the users with less privileges
		if($user->name !=null)
		array_push($users,$user);
		}
			}


		/*Business Can Show all client*/
		/*if ($_SESSION['user']->level==2){
			pg_prepare($link,"sqlusers","SELECT w_users.id,w_users.name,w_users.lastname,w_users.lastname2,w_users.email,w_users.level,w_users.scriptid,w_users.enabled FROM w_users where level=3 AND w_users.scriptid=$1");
			$result1 = pg_execute($link,'sqlusers',array($_SESSION['scriptid']));
			while($row1 = pg_fetch_array($result1)){
				unset($user);
				$user->id = $row1['id'];
				
				$user->name = FetchUserNameLangDefault($defaultid,$row1['id'],$link);
				$user->lastname = FetchUserLastNameLangDefault($defaultid,$row1['id'],$link);
				$user->lastname2 = FetchUserLastNameTwoLangDefault($defaultid,$row1['id'],$link);
				$user->email = $row1['email'];
				$user->enabled = $row1['enabled'];
				$user->level = $row1['level'];
				$user->levelname = GetLevelText($user->level);
				if($user->name !=null)
				array_push($users,$user);
			}
		}*/
		
		
		
		
		

	return $users;
	}


function FetchUserNameLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang54'.$cid,'SELECT * from w_users_lang WHERE users_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang54'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function FetchUserLastNameLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlanglast54'.$cid,'SELECT * from w_users_lang WHERE users_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlanglast54'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result1);
	return $rows['lastname_lang'];
}

function FetchUserLastNameTwoLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlanglast254'.$cid,'SELECT * from w_users_lang WHERE users_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlanglast254'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result1);
	return $rows['lastname2_lang'];
}

function FetchAllCategoriesData($filters,$link)
	{
	ProvidersOnly();

	$conditionalsvalues = array();
	$query = 'SELECT * from w_categories';

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
	
	pg_prepare($link,'sql3',$query);
	$result = pg_execute($link,'sql3',$conditionalsvalues);
	
	$categories = array();
	$category = new stdClass();
	while($row = pg_fetch_array($result))
		{
		//unset($category);
		$category->id = $row['id'];
		$category->name = $row['name'];
		$category->desc = $row['desc'];
		array_push($categories,$category);
		}

	return $categories;
	}
	
function FetchAllSubCategoriesData($filters,$link)
	{
	ProvidersOnly();

	$conditionalsvalues = array();
	$query = 'SELECT ws.id,ws.catid,ws.subname,wc.name from w_subcategories ws JOIN w_categories wc ON ws.catid = wc.id';

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
	
	pg_prepare($link,'sql3',$query);
	$result = pg_execute($link,'sql3',$conditionalsvalues);
	
	$categories = array();
	while($row = pg_fetch_array($result))
		{
		unset($category);
		$category->id = $row['id'];
		$category->name = $row['name'];
		$category->catid = $row['catid'];
		$category->subname = $row['subname'];
		array_push($categories,$category);
		}

	return $categories;
	}
	
	
/*function FetchAllCategoriesData($filters,$link)
	{
	ProvidersOnly();

	$conditionalsvalues = array();
	$query = 'SELECT * from w_categories';

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
	
	pg_prepare($link,'sql3',$query);
	$result = pg_execute($link,'sql3',$conditionalsvalues);
	
	$categories = array();
	while($row = pg_fetch_array($result))
		{
		unset($category);
		$category->id = $row['id'];
		$category->name = $row['name'];
		$category->desc = $row['desc'];
		array_push($categories,$category);
		}

	return $categories;
	}*/

function FetchUserData($user,$link)
	{
		
	if (empty($user))//when user logs ask for his data and he doesnt have his id so it comes empty
		$user = $_SESSION['user']->id;
		
		//echo $user;
	
		pg_prepare($link,'sqluser','SELECT * from w_users WHERE id=$1');
		$result = pg_execute($link,'sqluser',array($user));
		
		pg_prepare($link,'sqluserlangdata','SELECT * from w_users_lang WHERE users_id=$1');
		$result1 = pg_execute($link,'sqluserlangdata',array($user));
		pg_prepare($link,'sqlcity','SELECT * from w_franchises WHERE id=$1');
		unset($user);
		if (pg_num_rows($result)==1)  
		$user = new stdClass();
			while($row = pg_fetch_array($result))
				{
					
				$user->id = $row['id'];
				$idarray = array();
				$namearray = array();
				$lastnamearray = array();
				$lastnametarray = array();
				$streetuserarray = array();
				$jobarray = array();
				
				while($row1 = pg_fetch_array($result1)){
					$idarray[$row1['lang_id']] = $row1['id'];
					$namearray[$row1['lang_id']] = $row1['name_lang'];
					$lastnamearray[$row1['lang_id']] = $row1['lastname_lang'];
					$lastnametarray[$row1['lang_id']] = $row1['lastname2_lang'];
					$streetuserarray[$row1['lang_id']] = $row1['street_lang'];
					$jobarray[$row1['lang_id']] = $row1['job_lang'];
					
				}
				
				$user->name = $namearray;
				$user->lastname = $lastnamearray;
				$user->lastname2 = $lastnametarray;
				$user->langid = $idarray;
				$user->email = $row['email'];
				$user->street = $streetuserarray;
				$user->colony = $row['colony'];
				$user->pwd = $row['pwd'];
				$user->cp = $row['cp'];
				$user->city = $row['city'];
				
				$resultw = pg_execute($link,'sqlcity',array($row['city']));
				$user_rec = pg_fetch_array($resultw);
				
				$user->cityname = userscitybylang($row['city']);
				
				$user->country = $row['country'];
				$user->tel = $row['tel'];
				$user->cel = $row['cel'];
				$user->job = $jobarray;
				$user->location = $row['location'];
				$user->level = $row['level'];
				$user->isimg = $row['isimg'];
				/*if ($user->id!=$_SESSION['user']->id && $user->level<=$_SESSION['user']->level)//if the user asking for users data has less privileges he wont get the data
					return '';*/
				}
		
		return $user;
		
		
	}
	
	function userscitybylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlusercitylang'.$id,'SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	$result1 = pg_execute($link,'sqlusercitylang'.$id,array($_SESSION['admin_lang'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}
function FetchTabSettings($link){
	pg_prepare($link,'sqltab',"SELECT * FROM w_tabsettings where scriptid=$1");	
	$resn2 = pg_execute($link,'sqltab',array($_SESSION['scriptid']));
	$res = pg_fetch_array($resn2);
	$tab = new stdClass();
	$tab->tab_food_active = $res['tab_food'];
	$tab->tab_alcohol_active = $res['tab_alcohol'];
	$tab->tab_groceries_active = $res['tab_groceries'];
	$tab->tab_laundry_active = $res['tab_laundry'];

	return $tab;

}
function FetchBusinessData($id,$link)
	{
	//ProvidersOnly();

	
	if(IS_PAYPAL_ENABLED == 1)
        pg_prepare($link,'sqlbusiness','SELECT w_business.tab_food,w_business.tab_alcohol,w_business.tab_groceries,w_business.tab_laundry,w_business.deliverytime,w_business.pickuptime,w_business.businesspagecustomtext,w_business.isimg,w_business.tax,w_business.taxtype,w_business.currency,w_business.timezone,w_business.isimgh,w_business.feature,w_business.express_service,w_business.reorder,w_business.expresscheck,w_business.expresscheckprice,w_business.apk,w_business.vatregistration,w_business.invoiceaddress,w_business.vatemail,w_business.payby,w_business.bankname,w_business.bankac,w_business.routineno, w_business.swiftcode,w_business.vatpaypalemail,w_business.fixedrate,w_business.otherrate,w_business.vat,w_business.billingfxprice,w_business.billingperorder,w_business.billingperorderfixrate,w_business.autoinvoiceday,w_business.id,w_business.country,w_business.name,w_business.street,w_business.colony,w_business.cp,w_business.tel,w_business.cel,w_business.email,w_business.paypal,w_business.city,w_business.categories,w_business.mkeywords,w_business.mdescription,w_business.abusiness,w_business.pdesc,w_business.customslug,w_business.schedule,w_business.location,w_business.zones,w_business.minimum,w_business.servicefee,w_business.is_popular,w_business.emer_no,w_business.emer_email,w_franchises.city as cityname,w_business.provider,w_business.twiliophone,w_business.twilioenabled,w_business.secretkey,w_business.clientkey,w_business.searchzip,w_business.burl,w_business.promotion FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id WHERE w_business.id=$1');
    else
        pg_prepare($link,'sqlbusiness','SELECT w_business.tab_food,w_business.tab_alcohol,w_business.tab_groceries,w_business.tab_laundry,w_business.deliverytime,w_business.pickuptime,w_business.businesspagecustomtext,w_business.isimg,w_business.tax,w_business.taxtype,w_business.currency,w_business.timezone,w_business.isimgh,w_business.feature,w_business.express_service,w_business.reorder,w_business.expresscheck,w_business.expresscheckprice,w_business.apk,w_business.vatregistration,w_business.invoiceaddress,w_business.vatemail,w_business.payby,w_business.bankname,w_business.bankac,w_business.routineno, w_business.swiftcode,w_business.vatpaypalemail,w_business.fixedrate,w_business.otherrate,w_business.vat,w_business.billingfxprice,w_business.billingperorder,w_business.billingperorderfixrate,w_business.autoinvoiceday,w_business.id,w_business.country,w_business.name,w_business.street,w_business.colony,w_business.cp,w_business.tel,w_business.cel,w_business.email,w_business.city,w_business.categories,w_business.mkeywords,w_business.mdescription,w_business.abusiness,w_business.pdesc,w_business.customslug,w_business.schedule,w_business.location,w_business.zones,w_business.minimum,w_business.servicefee,w_business.is_popular,w_business.emer_no,w_business.emer_email,w_franchises.city as cityname,w_business.provider,w_business.twiliophone,w_business.twilioenabled,w_business.secretkey,w_business.clientkey,w_business.searchzip,w_business.burl,w_business.promotion FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id WHERE w_business.id=$1');
	$result = pg_execute($link,'sqlbusiness',array($id));

	pg_prepare($link,'sql2namelangdata','SELECT * from w_business_lang WHERE business_id=$1');
	$result1 = pg_execute($link,'sql2namelangdata',array($id));

	pg_prepare($link,'sqlneighborhoodsetting2',"SELECT * FROM w_tabsettings where scriptid=$1");	
	$resn2 = pg_execute($link,'sqlneighborhoodsetting2',array($_SESSION['scriptid']));
	$res = pg_fetch_array($resn2);
	
	pg_prepare($link,'sqlpopular',"SELECT * FROM w_configs WHERE name=$1");	
	$respo = pg_execute($link,'sqlpopular',array('popularsettings'));
	$rowpo = pg_fetch_array($respo);
		
	
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$business = new stdClass();
		//	unset($business);
			$business->tax = $row['tax'];
			$business->timezone = $row['timezone'];
			$business->currency = $row['currency'];
			$business->taxtype = $row['taxtype'];
			$business->id = $row['id'];
			$business->popularsettings = $rowpo['value'];
			
			$idarray=array();
			$namearray=array();
			$streetarray=array();
			$colonyarray=array();
				while($row1 = pg_fetch_array($result1)){
					$namearray[$row1['lang_id']] = $row1['name_lang'];
					$streetarray[$row1['lang_id']] = $row1['street_lang'];
					$colonyarray[$row1['lang_id']] = $row1['colony_lang'];
					$idarray[$row1['lang_id']] = $row1['id'];
					
				}
			$business->name = $namearray;
			$business->street = $streetarray;
			$business->langid = $idarray;
			if($res['tab_delivery_neighborhood']=='f'){	
			$business->colony = $colonyarray;
			}else{
			$business->colony = $row['colony'];	
			}
			$business->cp = $row['cp'];
			$business->tel = $row['tel'];
			$business->cel = $row['cel'];
			$business->email = $row['email'];
			$business->emer_no = $row['emer_no'];
			$business->emer_email = $row['emer_email'];
			if(IS_PAYPAL_ENABLED == 1)
			$business->paypal = $row['paypal'];
			$business->schedule = $row['schedule'];
			$business->categories = $row['categories'];
			$business->location = $row['location'];
			$business->zones = $row['zones'];
			
			$business->country = $row['country'];
			$business->mkeywords = $row['mkeywords'];
			$business->mdescription = $row['mdescription'];
			$business->minimum = $row['minimum'];
			$business->servicefee = $row['servicefee'];
			$business->twiliophone = $row['twiliophone'];
			$business->twilioenabled = $row['twilioenabled'];
			$business->secretkey = $row['secretkey'];
			$business->clientkey = $row['clientkey'];
			$business->searchzip = $row['searchzip'];
			$business->burl = $row['burl'];
			$business->pdesc = $row['pdesc'];
			//$business->abusiness = $row['abusiness'];
			$business->customslug = $row['customslug'];
			$business->isimg = $row['isimg'];
			$business->isimgh = $row['isimgh'];
			$business->apk = $row['apk'];
			
			$business->vatregistration = $row['vatregistration'];
			$business->invoiceaddress = $row['invoiceaddress'];
			$business->vatemail = $row['vatemail'];
			$business->payby = $row['payby'];
			$business->bankname = $row['bankname'];
			$business->bankac = $row['bankac'];
			$business->routineno = $row['routineno'];
			$business->swiftcode = $row['swiftcode'];
			$business->vatpaypalemail = $row['vatpaypalemail'];
			$business->billingfxprice = $row['billingfxprice'];
			$business->billingperorder = $row['billingperorder'];
			$business->billingperorderfixrate = $row['billingperorderfixrate'];
			$business->autoinvoiceday = $row['autoinvoiceday'];
			$business->promotion = $row['promotion'];
			$business->fixedrate = $row['fixedrate'];
			$business->otherrate = $row['otherrate'];
			$business->vat = $row['vat'];
			$business->is_popular = $row['is_popular'];

			$business->feature = $row['feature'];
			$business->reorder = $row['reorder'];
			$business->expresscheck = $row['expresscheck'];
			$business->expresscheckprice = $row['expresscheckprice'];
			
			
			$business->express_service = $row['express_service'];
			$business->deliverytime = $row['deliverytime'];
			$business->pickuptime = $row['pickuptime'];
			$business->businesspagecustomtext = $row['businesspagecustomtext'];

			$business->tab_food = $row['tab_food'];
			$business->tab_alcohol = $row['tab_alcohol'];
			$business->tab_groceries = $row['tab_groceries'];
			$business->tab_laundry = $row['tab_laundry'];			

					
			$city = new stdClass();
			if ($row['city']!=null)
				{
				$city->id = $row['city'];
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
					/*$provider->id = '';
				$provider->name = '';
				$provider->lastname = '';
				$provider->lastname2 = '';*/
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
			}

	return $business;
	}
	


function FetchFranchiseData($id,$link)
	{
	SuperAdminsOnly();
	if(IS_PAYPAL_ENABLED == 1)
		pg_prepare($link,'sqlcity','SELECT city,admin,email,country,ga,timezone FROM w_franchises WHERE id=$1');
	else
		pg_prepare($link,'sqlcity','SELECT city,admin,email,country,ga,timezone FROM w_franchises WHERE id=$1');

		$result = pg_execute($link,'sqlcity',array($id));
	
	pg_prepare($link,'sqllang','SELECT * from w_franchises_lang WHERE city_id=$1');
	$result2 = pg_execute($link,'sqllang',array($id));
	
	
	
	

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			//unset($franchise);
			$franchise = new stdClass();
			$franchise->id = $id;
			$langarray=array();	
			$idarray = array();
			while($row2 = pg_fetch_array($result2)){
				$langarray[$row2['lang_id']] = $row2['city_lang'];
				$idarray[$row2['lang_id']] = $row2['id'];
			}
			
			$franchise->city = $langarray;
			$franchise->langid = $idarray;
			
			$franchise->admin = $row['admin'];
			$franchise->email = $row['email'];
			$franchise->country = $row['country'];
			
			$franchise->ga = $row['ga'];
			$franchise->timezone = $row['timezone'];
			
			}


	return $franchise;
	}

function FetchAdData($id,$link)
	{
	SuperAdminsOnly();
	pg_prepare($link,'sql','SELECT name,link,city,type,time,isimg FROM w_ads WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sql15','SELECT * FROM w_ads_lang WHERE ads_id=$1');
	$result1 = pg_execute($link,'sql15',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			//unset($ad);
			$ad = new stdClass();
			$ad->id = $id;
			
			$namearray=array();				
			$idarray = array();
			while($row1 = pg_fetch_array($result1))
			{
				$namearray[$row1['lang_id']] = $row1['name_lang'];
				$idarray[$row1['lang_id']] = $row1['id'];
			
			}
			$ad->name = $namearray;
			$ad->langid = $idarray;
			$ad->link = $row['link'];
			$ad->city = $row['city'];
			$ad->type = $row['type'];
			$ad->time = $row['time'];
			$ad->isimg = $row['isimg'];
			}
	
	return $ad;
	}
	
function FetchEdData($id,$link)
	{
	//SuperAdminsOnly();
	pg_prepare($link,'sql','SELECT name,link,type,business FROM w_gallery WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqlgallerylangdata','SELECT * FROM w_gallery_lang WHERE gallery_id=$1');
	$result1 = pg_execute($link,'sqlgallerylangdata',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$ed = new stdClass();
		//	unset($ed);
			$ed->id = $id;
			
			$namearray=array();				
			$langidarray = array();
			while($row1 = pg_fetch_array($result1))
			{
				$namearray[$row1['lang_id']] = $row1['name_lang'];
				$langidarray[$row1['lang_id']] = $row1['id'];
			
			}
			
			$ed->name = $namearray;
			$ed->langid = $langidarray;
			$ed->link = $row['link'];
			//$ad->city = $row['city'];
			$ed->type = $row['type'];
			$ed->business = $row['business'];
			//$ad->time = $row['time'];
			}
	
	return $ed;
	}
	
function FetchAllZipcodeData($filters,$link)
	{
	ProvidersOnly();

	$conditionalsvalues = array();
	$query = 'SELECT * from w_zipcode';

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
	
	pg_prepare($link,'sql31',$query);
	$result = pg_execute($link,'sql31',$conditionalsvalues);
	
	$zipcode = array();
	while($row = pg_fetch_array($result))
		{
		unset($zip);
		$zip->id = $row['id'];
		$zip->zipcode = $row['zipcode'];
		$zip->desc = $row['desc'];
		array_push($zipcode,$zip);
		}

	return $zipcode;
	}
function FetchAllZipcodeDataB($filters,$link)
	{
	ProvidersOnly();

	$conditionalsvalues = array();
	$query = 'SELECT * from w_zipcode';

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
	
	pg_prepare($link,'sql31',$query);
	$result = pg_execute($link,'sql31',$conditionalsvalues);
	
	$zipcode = array();
	while($row = pg_fetch_array($result))
		{
		unset($zip);
		$zip->id = $row['id'];
		$zip->name = $row['zipcode'];
		$zip->desc = $row['desc'];
		array_push($zipcode,$zip);
		}

	return $zipcode;
	}
	
	function FetchDriverManagerData($user,$link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sqldmanager','SELECT * from w_drivermanager WHERE id=$1');
		$result = pg_execute($link,'sqldmanager',array($user));
		
		pg_prepare($link,'sqldmanagerlang','SELECT * from w_drivermanager_lang WHERE drivermanager_id=$1');
		$result1 = pg_execute($link,'sqldmanagerlang',array($user));
		
		unset($user);
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user = new stdClass();
				$user->id = $row['id'];
				$namearray=array();	
				$lastnamearray = array();
				$addressarray = array();
				$idarray = array();
				while($row1 = pg_fetch_array($result1))
				{
					$namearray[$row1['lang_id']] = $row1['name_lang'];
					$lastnamearray[$row1['lang_id']] = $row1['lastname_lang'];
					$addressarray[$row1['lang_id']] = $row1['address_lang'];
					$idarray[$row1['lang_id']] = $row1['id'];
				
				}
				$user->name = $namearray;
				$user->lastname = $lastnamearray;							
				$user->address = $addressarray;
				$user->langid = $idarray;
				
				$user->email = $row['email'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->cp = $row['cp'];
			    $user->cel = $row['cel'];
				$user->pwd = $row['pwd'];
				$user->usr = $row['usr'];
				}
		
		return $user;
		
}


//For Driver Manager Panle
function FetchDMData($link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sql','SELECT * from w_drivermanager WHERE usr=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		
		unset($user);
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user->id = $row['id'];
				$user->name = $row['name'];
				$user->lastname = $row['lastname'];
				$user->email = $row['email'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->address = $row['address'];
				$user->cp = $row['cp'];
			    $user->cel = $row['cel'];
				$user->pwd = $row['pwd'];
				$user->usr = $row['usr'];
				}
		
		return $user;
		
}

function FetchDriverIdByEmail($user,$link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sqle','SELECT * from w_driver WHERE email=$1');
		$result = pg_execute($link,'sqle',array($user));
		
		$user = new stdClass();
		if (pg_num_rows($result)==1){
			$row = pg_fetch_array($result);
				$user->id = $row['id'];
		}
		return $user;
		
}

function FetchDrivermanagerIdByEmail($user,$link){
	
	pg_prepare($link,'sqldm','SELECT * from w_drivermanager WHERE email=$1');
	$result = pg_execute($link,'sqldm',array($user));

	$user = new stdClass();
	if (pg_num_rows($result)==1){
		$row = pg_fetch_array($result);
		$user->id = $row['id'];
	}
	return $user;
		
}

function FetchDriverData($user,$link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sqldriver','SELECT * from w_driver WHERE id=$1');
		$result = pg_execute($link,'sqldriver',array($user));
		
		pg_prepare($link,'sqldriverlang','SELECT * from w_driver_lang WHERE driver_id=$1');
		$result1 = pg_execute($link,'sqldriverlang',array($user));
		
		//unset($user);
		$user = new stdClass();
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user->id = $row['id'];
				$user->group_id = $row['group_id'];
				
				$namearray=array();
				$lastnamearray=array();
				$addressarray=array();
				$backgroundarray=array();				
				$idarray = array();
				while($row1 = pg_fetch_array($result1))
				{
					$namearray[$row1['lang_id']] = $row1['name_lang'];
					$lastnamearray[$row1['lang_id']] = $row1['lastname_lang'];
					$addressarray[$row1['lang_id']] = $row1['address_lang'];
					$backgroundarray[$row1['lang_id']] = $row1['background_lang'];
					$idarray[$row1['lang_id']] = $row1['id'];
				
				}
				
				$user->name = $namearray;
				$user->lastname = $lastnamearray;
				$user->email = $row['email'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->address = $addressarray;
				$user->mobile = $row['mobile'];
			    $user->cel = $row['cel'];
				$user->zip = $row['zip'];
				$user->enabled = $row['enabled'];
				$user->background = $backgroundarray;
				$user->gprs_url = $row['gprs_url'];
				$user->pwd = $row['pwd'];
				$user->usr = $row['usr'];
				$user->bringg_driverid = $row['bringg_driverid'];
				$user->bringg_company_id = $row['bringg_company_id'];
				
				}
		
		return $user;
		
}

//For Driver Panel

function FetchDData($link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sql','SELECT * from w_driver WHERE usr=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		
		unset($user);
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user->id = $row['id'];
				$user->group_id = $row['group_id'];
				$user->name = $row['name'];
				$user->lastname = $row['lastname'];
				$user->email = $row['email'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->address = $row['address'];
				$user->mobile = $row['mobile'];
			    $user->cel = $row['cel'];
				$user->zip = $row['zip'];
				$user->enabled = $row['enabled'];
				$user->background = $row['background'];
				$user->gprs_url = $row['gprs_url'];
				$user->pwd = $row['pwd'];
				$user->usr = $row['usr'];
				}
		
		return $user;
		
}



function FetchDriverManagerAllData($link) {
	
		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result4 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result4);
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['admin_lang'];	
		}
	

		pg_prepare($link,'sql','SELECT * from w_drivermanager where scriptid=$1');
		$result = pg_execute($link,'sql',array($_SESSION['scriptid']));
		
	 $users = array();
	
			while($row = pg_fetch_array($result))
				{
				//unset($user);
				$user = new stdClass();
				$user->id = $row['id'];
				$user->name = FetchDriverManagerNameLangDefault($defultlang,$row['id'],$link);
				$user->lastname = FetchDriverManagerLastNameLangDefault($defultlang,$row['id'],$link);
				$user->email = $row['email'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->address = $row['address'];
				$user->cp = $row['cp'];
			    $user->cel = $row['cel'];
				 $user->enabled = $row['enabled'];
			array_push($users,$user);
				}
		
		return $users;
		
	
	}

function FetchDriverManagerNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlangdriver4'.$cid,'SELECT * from w_drivermanager_lang WHERE drivermanager_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdriver4'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function FetchDriverManagerLastNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlangdriver4214'.$cid,'SELECT * from w_drivermanager_lang WHERE drivermanager_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdriver4214'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['lastname_lang'];
}

function FetchDriverAllData($link) {
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result4 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result4);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}	
	
	   if($_SESSION['user']->level=='5')
					{
						$grpid_arr = array();
					    $usr= $_SESSION['user']->id;
						pg_prepare($link,'sql','SELECT dg.id from w_drivergroup dg join w_drivermanager dm ON (dm.id=dg.drivermanager_id) WHERE dm.usr = $1');
		                $result = pg_execute($link,'sql',array($usr));
						while($row = pg_fetch_array($result))
						{
							unset($grpid_val);
							$grpid_val = $row['id'];
							array_push($grpid_arr,$grpid_val);
						}
						
						//print_r($grpid_arr);exit;
						$grpid_arr_str = "(".implode(",",$grpid_arr).")";
						//echo $grpid_arr_str;exit;
						
						//$grpid_arr_str = '(42,46)';
						
						/*pg_prepare($link,'sql1','SELECT * from w_driver WHERE group_id IN $1');
		                $result = pg_execute($link,'sql1',array($grpid_arr_str));*/
						
						//echo 'SELECT * from w_driver WHERE group_id IN '.$grpid_arr_str;
						pg_prepare($link,'sql1',"SELECT * from w_driver WHERE group_id IN ".$grpid_arr_str." AND enabled = $1 AND scriptid=$2");
						$result = pg_execute($link,'sql1',array(TRUE,$_SESSION['scriptid']));
						//print_r($result);
						//exit;
						
					}else
					{
					 	pg_prepare($link,'sql','SELECT * from w_driver where scriptid=$1');
		                $result = pg_execute($link,'sql',array($_SESSION['scriptid']));
						
					}

		
		
	 $users = array();
	
			while($row = pg_fetch_array($result))
				{
			//	unset($user);
				$user = new stdClass();
				$user->id = $row['id'];
				$user->group_id = $row['group_id'];
				$user->name = FetchDriverNameLangDefault($defultlang,$row['id'],$link);
				$user->lastname = FetchDriverLastNameLangDefault($defultlang,$row['id'],$link);
				$user->email = $row['email'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->address = $row['address'];
				$user->zip = $row['zip'];
			    $user->mobile = $row['mobile'];
				$user->enabled = $row['enabled'];
				$user->pwd = $row['pwd'];
				$user->usr = $row['usr'];
				$user->background = $row['background'];
				$user->gprs_url = $row['gprs_url'];
				if($user->name !=null)
			array_push($users,$user);
				}
		
		return $users;
		
	
	}


function FetchDriverNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlangdriver45'.$cid,'SELECT * from w_driver_lang WHERE driver_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdriver45'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function FetchDriverLastNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlangdriver42145'.$cid,'SELECT * from w_driver_lang WHERE driver_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdriver42145'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['lastname_lang'];
}
		
	
function FetchDriverGroupAllData($link) {

	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result4 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result4);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}	
				
				 if($_SESSION['user']->level=='5')
					{
						
					    $usr= $_SESSION['user']->id;
						pg_prepare($link,'sql','SELECT id from w_drivermanager WHERE usr = $1');
		                $result = pg_execute($link,'sql',array($usr));
						$row = pg_fetch_array($result);
						pg_prepare($link,'sql1','SELECT * from w_drivergroup WHERE drivermanager_id = $1 AND scriptid=$2');
		                $result = pg_execute($link,'sql1',array($row['id'],$_SESSION['scriptid']));
						
					}else
					{
					 	pg_prepare($link,'sql','SELECT * from w_drivergroup where scriptid=$1');
		                 $result = pg_execute($link,'sql',array($_SESSION['scriptid']));	
						
					}
					
		
	 $users = array();
	 $link = ConnectDB();
	 pg_prepare($link,'sql66','SELECT name from w_drivermanager WHERE id = $1');
	
	$c=0;
			while($row = pg_fetch_array($result))
				{
				//unset($user);
				$user = new stdClass();
				$user->id = $row['id'];
				$user->drivermanager_id = $row['drivermanager_id'];
				$user->group_name = FetchDriverGroupNameLangDefault($defultlang,$row['id'],$link,$c);
				$user->per_day = $row['per_day'];
				$user->per_month = $row['per_month'];
				$user->per_year = $row['per_year'];
				$user->com_rate = $row['com_rate'];
				$user->com_rate1 = $row['com_rate1'];
				$user->enabled = $row['enabled'];
				$result66 = pg_execute($link,'sql66',array($row['drivermanager_id']));	
				$row66 = pg_fetch_array($result66);
				$user->drivermanager_name = FetchDriverGroupManagerNameLangDefault($defultlang,$row['drivermanager_id'],$link,$c);
			    //$user->business = $row['business'];
				
			array_push($users,$user);
			$c++;
				}
		
		//return $_SESSION['user']->level;
		return $users;
		
	
	}	

function FetchDriverGroupNameLangDefault($defultlang,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlangdrivergroup4'.$cid.$c,'SELECT * from w_drivergroup_lang WHERE drivergroup_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdrivergroup4'.$cid.$c,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['group_name_lang'];
}

function FetchDriverGroupManagerNameLangDefault($defultlang,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlangdriver4754'.$cid.$c,'SELECT * from w_drivermanager_lang WHERE drivermanager_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangdriver4754'.$cid.$c,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
	
	
function FetchDriverGroupData($user,$link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sql','SELECT * from w_drivergroup WHERE id=$1');
		$result = pg_execute($link,'sql',array($user));
		
		pg_prepare($link,'sqldgrouplang','SELECT * from w_drivergroup_lang WHERE drivergroup_id=$1');
		$result1 = pg_execute($link,'sqldgrouplang',array($user));
		
		unset($user);
		if (pg_num_rows($result)==1) 
			while($row = pg_fetch_array($result))
				{
				//unset($user);
				$user = new stdClass();
				$user->id = $row['id'];
				$user->drivermanager_id = $row['drivermanager_id'];
				$namearray=array();				
				$idarray = array();
				while($row1 = pg_fetch_array($result1))
				{
					$namearray[$row1['lang_id']] = $row1['group_name_lang'];
					$idarray[$row1['lang_id']] = $row1['id'];
				
				}
				$user->group_name = $namearray;
				$user->langid = $idarray;
				
				
				$user->per_day = $row['per_day'];
				$user->per_month = $row['per_month'];
				$user->per_year = $row['per_year'];
				$user->com_rate = $row['com_rate'];
				$user->com_rate1 = $row['com_rate1'];
				$user->business = $row['business'];
				$user->enabled = $row['enabled'];
				}
		
		return $user;
		
}	

function FetchAllBusinessData($link){
	$link = ConnectDB();
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	if($_SESSION['user']->level == 0){
		
		pg_prepare($link,'sql1','SELECT w_business.id,w_business.name FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id WHERE w_business.scriptid = $1');
		$result = pg_execute($link,'sql1',array($_SESSION['scriptid']));
	}else if($_SESSION['user']->level == 1){
		pg_prepare($link,'sql2','SELECT w_business.id,w_business.name FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id WHERE w_franchises.admin =$1 AND w_business.scriptid = $2');
		$result = pg_execute($link,'sql2',array($_SESSION['user']->id,$_SESSION['scriptid']));
	}else if($_SESSION['user']->level == 2){
		pg_prepare($link,'sql3','SELECT w_business.id,w_business.name FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id and w_users.id=$1 AND w_business.scriptid = $2');
		$result = pg_execute($link,'sql3',array($_SESSION['user']->id,$_SESSION['scriptid']));
	}
	//ProvidersOnly();
	
	$businesss = array();
	
	 
	while($row = pg_fetch_array($result)){
	$business = new stdClass();
		//echo $row['id'].'=';
		unset($business->id);
		unset($business->name);
		$business->id = $row['id'];
		$business->name = Fetchbusinesslangname($defultlang,$row['id'],$link);
		if($business->name !=null)
		array_push($businesss,$business);
	}
	return $businesss;
}

function Fetchbusinesslangname($defultlang,$cid,$link){

	pg_prepare($link,'sqlbusinessdefalutlang'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlbusinessdefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}
function FetchCountryCity($link)
	{
		
		pg_prepare($link,'sqli8',"select w_countries.* from w_countries join w_franchises on w_franchises.country=w_countries.id where w_franchises.city!='' AND w_franchises.scriptid=$1 AND w_countries.scriptid=$2 AND w_countries.enabled=$3 group by w_countries.id order by w_countries.name ASC");
	$result = pg_execute($link,'sqli8',array($_SESSION['scriptid'],$_SESSION['scriptid'],'TRUE'));
	

	$countrycity = array();
	$countrycit = new stdClass();
	while($row = pg_fetch_array($result))
	{
		//unset($countrycit);
		$countrycit->countryid = $row['id'];
		$countrycit->countryname = countrynamebylang($row['id'],$link);
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
		$cityy = new stdClass();
		while($row = pg_fetch_array($result)){
			//unset($cityy);
			$cityy->id = $row['id'];
			$cityy->name=citynamebylang($row['id'],$link);
			if($cityy->name!=null)
			array_push($cityfe,$cityy);		
		}
return $cityfe;
}
function countrynamebylang($id,$link){
	
	pg_prepare($link,'sqlcountrylang'.$id,'SELECT * FROM w_countries_lang WHERE lang_id=$1 and status=$2 AND country_id=$3');
	$result1 = pg_execute($link,'sqlcountrylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function citynamebylang($id,$link){
	
	pg_prepare($link,'sqlcitylang'.$id,'SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	$result1 = pg_execute($link,'sqlcitylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}
function FetchOrderDataApproved($link){

	if ($_SESSION['user']->level=='1'){//get all franchises from which the admin is admin
		$citys = array();
		pg_prepare($link,'sql','SELECT id FROM w_franchises WHERE admin=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result)){
			array_push($citys,$row['id']);
		}
	}else if ($_SESSION['user']->level=='2'){//get all business that the providers owns
		$businesss = array();
		pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result)){
			array_push($businesss,$row['id']);
		}
	}
	
	pg_prepare($link,'sqlsound','SELECT * FROM w_orders where (data<>$1 AND data<>$2)  AND status = $3 AND scriptid=$4 order by id');
    $result = pg_execute($link,'sqlsound',array('NULL','null',0,$_SESSION['scriptid']));
	
	

	//pg_prepare($link,'sqlsound','SELECT * FROM w_orders where status = $1 order by id');
	//$result = pg_execute($link,'sqlsound',array(0));
	
	$soundapproveds = array();
	while($row = pg_fetch_array($result)){
		
		$data = parse($row['data']);
		$continue = false;
		
		if ($_SESSION['user']->level=='0')
			$continue = true;
		else{
			if ($_SESSION['user']->level=='1'){
				if($citys!="") {
					foreach ($citys as $city)
						if ($city==$data->buyer->city){
							$continue = true;
							break;
						}
				}
			}
			else if ($_SESSION['user']->level=='2'){
				if($businesss!="") {
					foreach ($businesss as $business){
						if($data->business !=""){
							foreach ($data->business as $databusiness)
								if ($databusiness->id==$business)
									$continue = true;
						}
				    }
				}
			}
		}
		
		if ($continue==true){
			//unset($soundapproved);
			$soundapproved = new stdClass();
			$soundapproved->id = $row['id'];
			array_push($soundapproveds,$soundapproved);
		}
	}

	return $soundapproveds;
	pg_close($link);
}


function GetSoundSettings($link){
	
	unset($soundsettings);
	pg_prepare($link,'sqlsound1','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound1',array());
	$soundsettings = new stdClass();
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'superadminsoundstatus'){
			$soundsettings->superadminsoundstatus = $row['value'];
		}
		if($row['name'] == 'superadminsoundduration'){
			$soundsettings->superadminsoundduration = $row['value'];
		}
		if($row['name'] == 'businesssoundstatus'){
			$soundsettings->businesssoundstatus = $row['value'];
		}
		if($row['name'] == 'businesssoundduration'){
			$soundsettings->businesssoundduration = $row['value'];
		}
	}
	return $soundsettings;
	pg_close($link);	
}

	//tabsetting start
function FetchAllCountriesDataFrontSet($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_countries where scriptid=$1 AND enabled=$2');
	$result = pg_execute($link,'sql0',array($_SESSION['scriptid'],'TRUE'));

      $countries = array();
	  $country = new stdClass();
    //  unset($country);
     $country->id = "-1";
	 $country->name = "All";
	 array_push($countries,$country);
	while($row = pg_fetch_array($result))
		{
	//	unset($country);
		$country = new stdClass();
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}

	return $countries;
	}	
function FetchAllCitiesDataFrontSet($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_franchises where scriptid=$1');
	$result = pg_execute($link,'sql0',array($_SESSION['scriptid']));

      $countries = array();
    //  unset($country);
	$country = new stdClass();
     $country->id = "-1";
	 $country->name = "All";
	  $country->country = "-1";
	 array_push($countries,$country);
	while($row = pg_fetch_array($result))
		{
		$country = new stdClass();
	//unset($country);
		$country->id = $row['id'];
		$country->name = $row['city'];
		$country->country = $row['country'];
		array_push($countries,$country);
		}

	return $countries;
	}
function FetchAllBusinessDataFrontSet($link)
	{
		pg_prepare($link,'sql0','SELECT w_business.* , w_franchises.id  as cityname FROM w_business RIGHT JOIN w_franchises ON w_franchises.id=w_business.city where w_business.scriptid=$1');
	$result = pg_execute($link,'sql0',array($_SESSION['scriptid']));

      $countries = array();
    //  unset($country);
	$country = new stdClass();
     $country->id = "-1";
	 $country->name = "All";
	 	$country->city = "-1";
		$country->country = "-1";
	 array_push($countries,$country);
	
	while($row = pg_fetch_array($result))
		{
		$country = new stdClass();
		//unset($country);
		$country->id = $row['id'];
		$country->name = $row['name'];
		$country->city = $row['cityname'];
		$country->country = $row['country'];
		array_push($countries,$country);
		}

	return $countries;
	}	



function FetchUserSeePermission($link){
	if($_SESSION['user']->level == 1 || $_SESSION['user']->level == 2){
		pg_prepare($link,'sqlseepermission','SELECT value FROM w_configs WHERE name=$1');
		if($_SESSION['user']->level == 1)
		$result = pg_execute($link,'sqlseepermission',array('adminpermission'));
		if($_SESSION['user']->level == 2)
		$result = pg_execute($link,'sqlseepermission',array('businesspermission'));

		$row = pg_fetch_array($result);
		return $row['value'];
	}
}

function FetchSiteSetting($link){
	
	pg_prepare($link,'sqlcon1','SELECT * FROM w_configs where name = $1');
	$result = pg_execute($link,'sqlcon1',array('siteurl'));
	$row = pg_fetch_array($result);
	
	
	return $row['value'];
	
}	

function FetchSpecialEnterprise($link){
	
	pg_prepare($link,'sqlenterprise','SELECT * FROM w_configs where name = $1');
	$result = pg_execute($link,'sqlenterprise',array('specialenterprise'));
	$row = pg_fetch_array($result);
	
	
	return $row['value'];
	
}		

function FetchTimeFormat($link){
	pg_prepare($link,'sqltimeformat','SELECT * FROM w_configs where name = $1');
	$result = pg_execute($link,'sqltimeformat',array('timeformat'));
	$row = pg_fetch_array($result);
	
	
	return $row['value'];
}

function FetchAllCurrency($link){
	pg_prepare($link,'sqldd','SELECT * from w_configs WHERE name=$1');
	$resultd = pg_execute($link,'sqldd',array('currency'));
	$row = pg_fetch_array($resultd);
	
	$row['value'] = currency_symbol($row['value']);
	
	return $row['value'];
}

function FetchNeighbourhoodSettings($link){
	pg_prepare($link,'sqlneigh','SELECT * FROM w_tabsettings where scriptid=$1');
	$resultd = pg_execute($link,'sqlneigh',array($_SESSION['scriptid']));
	$row = pg_fetch_array($resultd);	
	
	return $row['tab_delivery_neighborhood'];
}

function FetchAllBusinessPrinterPath($id,$link)
	{
		pg_prepare($link,'sql0','SELECT * FROM w_business WHERE enabled=$1 AND scriptid=$2');
	    $result = pg_execute($link,'sql0',array(TRUE,$_SESSION['scriptid']));
		
		pg_prepare($link,'sql02','SELECT printer_restaurant FROM w_printerpath');
	    $result2 = pg_execute($link,'sql02',array());
		$print = array();
		
		$chkall = 0;
		
		while($row2 = pg_fetch_array($result2))
		{
			$a = json_decode($row2[0]);
			
			
			
			if(in_array(-1,$a)) //check if  all business assigned then do not add new business
			{
				$chkall = 1;
				break;
			}
			
			$print = array_merge($print,$a);
		}
		

      $countries = array();
    $country = new stdClass();
	  
	  if((count($print) == 0) && ($chkall==0))
		{
     $country->id = "-1";
	 $country->name = "All";
	 array_push($countries,$country);
		}
	
	  if($chkall==0) {
	
	while($row = pg_fetch_array($result))
		{
		unset($country);
		
		if($id) //for edit
		 {
			if(in_array($row['id'],$print))
		    {
				$country->id = $row['id'];
				$country->name = $row['name'];
				array_push($countries,$country);
			}
		 }
		
		if(!in_array($row['id'],$print))
		{
			$country = new stdClass();
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}
		
		
		
		}
		
	  }

	return $countries;
	}

function FetchAllBusinessPrinterPathEdit($id,$link)
	{
		pg_prepare($link,'sql0','SELECT * FROM w_business WHERE enabled=$1');
	    $result = pg_execute($link,'sql0',array(TRUE));
		
		pg_prepare($link,'sql02','SELECT printer_restaurant FROM w_printerpath');
	    $result2 = pg_execute($link,'sql02',array());
		
		pg_prepare($link,'sql03','SELECT printer_restaurant FROM w_printerpath WHERE id=$1');
	    $result3 = pg_execute($link,'sql03',array($id));
		
		while($row3 = pg_fetch_array($result3))
		{
			$a3 = json_decode($row3[0]);
			
		}
		
		$print = array();
		
		$chkall = 0;
		
		while($row2 = pg_fetch_array($result2))
		{
			$a = json_decode($row2[0]);
			
			
			
			if(in_array(-1,$a)) //check if  all business assigned then do not add new business
			{
				$chkall = 1;
				//break;
			}
			
			$print = array_merge($print,$a);
		}
		

      $countries = array();
     
	  
	  if($chkall==1)
		{
     $country->id = "-1";
	 $country->name = "All";
	 array_push($countries,$country);
	 
	 
	
	while($row = pg_fetch_array($result))
		{
			unset($country);
			$country->id = $row['id'];
				$country->name = $row['name'];
				array_push($countries,$country);
			
			}
		
	  
		}
	else if($chkall==0) {
		
		
	
	while($row = pg_fetch_array($result))
		{
		unset($country);
		
			if(!in_array($row['id'],$print) || in_array($row['id'],$a3))
		    {
				$country->id = $row['id'];
				$country->name = $row['name'];
				array_push($countries,$country);
			}
		
		
		
		}
		
	  }

	return $countries;
	}


	
	
	function FetchAllBusinessPrinterPathOnly($link)
	{
		pg_prepare($link,'sql01','SELECT id FROM w_business WHERE enabled=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql01',array(TRUE));
 
     $countries = array();
     
   
	while($row = pg_fetch_array($result))
		{
			//unset($country);
			$country = new stdClass();	
		$country->id = $row['id'];
		$country->path = "http://".$_SERVER['HTTP_HOST']."/orders/".$row['id'].".txt";
		array_push($countries,$country);
		}

	return $countries;
	}
	
function FetchAllPrinterData($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_printerpath');
	$result = pg_execute($link,'sql0',array());

      $countries = array();
	  $b = array();
	  
    
	while($row = pg_fetch_array($result))
		{
		$str = "";	
		//unset($country);
		$country = new stdClass();
		$country->id = $row['id'];
		$country->path = $row['path'];
		$country->pathtxt = "http://".$_SERVER['HTTP_HOST']."/orders/".$row['path'].".txt";
		
		$country->printer_restaurant = $row['printer_restaurant'];
		
		$text = $row['printer_restaurant'];
		$b = json_decode($text);
		
		if(in_array(-1,$b)) 
		{
			$str = "All";
			
		}
		else
		{
		$k = 1;
		foreach($b as $x)
        {
			pg_prepare($link,'sql0'.$x,'SELECT name FROM w_business WHERE id = $1 AND scriptid=$2');
            $resultx = pg_execute($link,'sql0'.$x,array($x,$_SESSION['scriptid']));
			$rowx = pg_fetch_array($resultx);
			$str.= $rowx[0];
			
			if($k < count($b))
			$str.= ",";
			
			$k++;
		}
		}
		
		$country->printer_restaurantlist = $str;
		array_push($countries,$country);
		}

	return $countries;
	}

function FetchPrinterData($id,$link) {
	
	pg_prepare($link,'sqlprint10','SELECT * FROM w_printerpath WHERE id = $1');
	$result = pg_execute($link,'sqlprint10',array($id));
	while($rs = pg_fetch_array($result)) {
		unset($printer);
		$printer->id = $rs['id'];
		$printer->path = $rs['path'];
		$printer->printer_restaurant = $rs['printer_restaurant'];
		
		
		}
	return $printer;
	
	
	
	}
	
	
function GetManagelangConfig($link){
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1');
	$result = pg_execute($link,'sqllangfetch',array('TRUE'));
	$language = array();
	$i = 0;
	while($row =pg_fetch_array($result)){
		$language[$i]['id'] = $row['id'];
		$language[$i]['lang_text'] = $row['lang_text'];
		$language[$i]['opdefault'] = $row['opdefault'];
		$language[$i]['enabled'] = $row['enabled'];
		$language[$i]['isimg'] = $row['isimg'];
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		
		}else{
		$language[$i]['admindefaulelang'] = $_SESSION['admin_lang'];	
		}

		$i++;
	}
	return $language;
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
	}if($sitecurrency == 'LYD'){
	return 'LYD';			
	}
	
}

function FetchNName($id,$link)
{
	
	
$query_present = 'SELECT * FROM w_neighborhood WHERE id=$1';
		  pg_prepare($link,'sqlNN2',$query_present);
		  $result4 = pg_execute($link,'sqlNN2',array((int)$id));
		  $arr = array();
	
		if(pg_num_rows($result4) == 1)
		{
			
			while($row=pg_fetch_array($result4))
		  {
			 
			return $row['name'];
			 break;
			  
		  }
		
		return "";	
		}
		  
	
}

function FetchRestBringgPermission($link){
	//SuperAdminsOnly();
	pg_prepare($link,'sqldr','SELECT * from w_configs WHERE name=$1');
	$resultd = pg_execute($link,'sqldr',array('BRINGG_PERMISSION_EACH_RESTAURANT'));
	$row = pg_fetch_array($resultd);
	
	
	
	return $row['value'];
}

function FetchBusinessReviewData($id,$link)
{
	 // SuperAdminsOnly();
	$conditionalsvalues = array();
	  pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result104 = pg_execute($link,'sqldefalut',array());
	$rows5 = pg_fetch_array($result104);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows5['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	$querybr = 'select * from w_review';
	pg_prepare($link,'sqlbr',$querybr);
	$result54 = pg_execute($link,'sqlbr',$conditionalsvalues);

	$querybl="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	pg_prepare($link,'sqlbl',$querybl);

	$querycl="select city_lang from w_franchises_lang where city_id=$1 and lang_id=$2";
	pg_prepare($link,'sqlcl',$querycl);

	$ads = array();
	while($row65 = pg_fetch_array($result54))
		{
		unset($br);
		unset($business);
		$br->id = $row65['id'];
		$br->w_id_business = $row65['id_w_business'];
		$br->city=$row65['city'];
		if ($row65['id_w_business']!=null)
			{
				
				$result24 = pg_execute($link,'sqlbl',array($br->w_id_business,$defultlang));
				$row24 = pg_fetch_array($result24);
			
				$br->bname = $row24['name_lang'];
			}
			else
			{
				$br->bname = '';
			}

		if ($row65['city']!=null)
			{
				
				$result3 = pg_execute($link,'sqlcl',array($br->city,$defultlang));
				$row3 = pg_fetch_array($result3);
			
				$br->cityn = $row3['city_lang'];
			}
			else
			{
				$br->cityn = '';
			}		
		$br->name = $row65['name'];
		$br->email = $row65['email'];
		
		$br->comment=substr($row65['comment'],0,25);
		$br->quality=$row65['quality'];
		$br->delivery=$row65['delivery'];
		$br->service=$row65['dealer'];
		$br->package=$row65['package'];
		$br->status = $row65['status'];
		$br->view_status = $row65['view_status'];

	}
	return $br;

////////////////////////////////////////////
	// pg_prepare($link,'sqlwr','SELECT * FROM w_review WHERE id=$1');
	// $result = pg_execute($link,'sql',array($id));
	
	

	// if (pg_num_rows($result)==1)  
	// 	while($row = pg_fetch_array($result))
	// 		{
	// 		unset($br);
	// 		$br->id = $id;
			
	// 		$namearray=array();				
	// 		$idarray = array();
			
	// 		$br->name = $row['name'];
	// 		$br->comment= $row['comment'];
	// 		$ad->orderid = $row['id_order'];
	// 		$ad->time = $row['time'];
	// 		$ad->isimg = $row['isimg'];
	// 		}
	
	// return $ad;
/////////////////////////////////////////////////	
}


function FetchBusinessPointData($id,$link)
	{
		$conditionalsvalues = array();
		  pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result104 = pg_execute($link,'sqldefalut',array());
		$rows5 = pg_fetch_array($result104);
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows5['id'];
		}else{
		$defultlang = $_SESSION['admin_lang'];	
		}

		$querybr = 'select * from w_business_points where id=$1';
		pg_prepare($link,'sqlbr',$querybr);
		$result54 = pg_execute($link,'sqlbr',array($id));

		$querybl="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
		pg_prepare($link,'sqlbl',$querybl);

		

		
		while($row65 = pg_fetch_array($result54))
			{
			//unset($bps);
			$bps = new stdClass();
			$bps->id = $row65['id'];
			$bps->w_id_business = $row65['business_id'];
			
			if ($row65['business_id']!=null)
				{
					
					$result24 = pg_execute($link,'sqlbl',array($bps->w_id_business,$defultlang));
					$row24 = pg_fetch_array($result24);
					$bps->bname = $row24['name_lang'];
				}
				else
				{
					$bps->bname = '';
				}

				
			$bps->point_type = $row65['point_type'];
			$bps->number_of_points = $row65['number_of_points'];
			
			
			$bps->point_values=$row65['point_values'];
			$bps->fb_point_values=$row65['fb_point_values'];
			$bps->twitter_point_values=$row65['twitter_point_values'];
			$bps->enabled=$row65['enabled'];
			$bps->date_of_creation=$row65['date_of_creation'];
		}
		return $bps;
	}

function FetchPointPermission($link)
{
	pg_prepare($link,'sqlrewardspermission','SELECT value FROM w_configs WHERE name=$1');
    $result2 = pg_execute($link,'sqlrewardspermission',array('item_point_permission'));
    $row2 = pg_fetch_array($result2);
    $pointpermission = $row2['value'];
    return $pointpermission;
}

function Fetchconfigsettings($link)
{
	pg_prepare($link,'sql_con_avail','SELECT value FROM w_configs WHERE name=$1');
    $result2 = pg_execute($link,'sql_con_avail',array('checkout_available_product_settings'));
    $row2 = pg_fetch_array($result2);
    $configsettings = $row2['value'];
    return $configsettings;
}

function Fetchproductordersetting($link)
{
	$productordersetting = "productordersetting";
	pg_prepare($link,'sqlpset','SELECT * FROM w_configs WHERE name=$1');
	$resultpset = pg_execute($link,'sqlpset',array($productordersetting));
	$rowpaset = pg_fetch_array($resultpset);
	$psettingval = $rowpaset["value"];
    return $psettingval;
}
function Fetchzipcodeordersetting($link)
{
	$zipcodeordersetting = "zipcodeordersetting";
	pg_prepare($link,'sqlzset','SELECT * FROM w_configs WHERE name=$1');
	$resultzset = pg_execute($link,'sqlzset',array($zipcodeordersetting));
	$rowzset = pg_fetch_array($resultzset);
	$zsettingval = $rowzset["value"];
    return $zsettingval;
}
?>
