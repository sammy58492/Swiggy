<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
/*EXAMPLE USE: 
[{"operation":"FetchAllFranchisesData"},{"operation":"FetchAllUsersData","filters":[{"name":"level","operator":"=","value":"2"}]}]
*/

$bulk = parse($_POST['data']);

unset($response);
$link = ConnectDB();

define("IS_PAYPAL_ENABLED", 1);
foreach ($bulk as $data)
	{
	switch ($data->operation)
		{
		case 'FetchAllFranchisesData':
			$response->franchises = FetchAllFranchisesData($data->filters,$link);
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
		
		case 'FetchNeighborhoodData':
			$response->neighborhood = FetchNeighborhoodData($data->id,$link);
		break;
		
		case 'FetchBusinessData':
			$response->business = FetchBusinessData($data->id,$link);
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
		case 'FetchAllNeighborhoodData':
			$response->neighborhood = FetchAllNeighborhoodData($link);
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
		case 'FetchDriverGroupAllData':
			$response->drivergroup = FetchDriverGroupAllData($link);
		break;
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
		//End Driver section
		//tabsetting start
		case 'FetchAllCountriesDataFrontSet':
			$response->countriesfrontset = FetchAllCountriesDataFrontSet($link);
		break;
		case 'FetchAllCitiesDataFrontSet';
		 $response->citiesfrontset = FetchAllCitiesDataFrontSet($link);
		break;
		case 'FetchAllBusinessDataFrontSet';
		 $response->businessfrontset = FetchAllBusinessDataFrontSet($link);
		break;
		case 'FetchSiteSetting';
		 $response->siteSetting = FetchSiteSetting($link);
		break;
		
		case 'FetchOrderDataApproved';
		 $response->soundapproved = FetchOrderDataApproved($link);
		break;
		
		
		
		
		//tabsetting end 
		case 'GetSoundSettings';
		 $response->soundsettings = GetSoundSettings($link);
		break;
		
		}
	}

pg_close($link);
echo json_encode($response);




	//tabsetting start
function FetchAllCountriesDataFrontSet($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_countries and enabled=$1');
	$result = pg_execute($link,'sql0',array('TRUE'));

      $countries = array();
      unset($country);
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

	return $countries;
	}	
	
function FetchAllCitiesDataFrontSet($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_franchises');
	$result = pg_execute($link,'sql0',array());

      $countries = array();
      unset($country);
     $country->id = "-1";
	 $country->name = "All";
	  $country->country = "-1";
	 array_push($countries,$country);
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$country->id = $row['id'];
		$country->name = $row['city'];
		$country->country = $row['country'];
		array_push($countries,$country);
		}

	return $countries;
	}	


function FetchAllBusinessDataFrontSet($link)
	{
		pg_prepare($link,'sql0','SELECT w_business.* , w_franchises.id  as cityname FROM w_business RIGHT JOIN w_franchises ON w_franchises.id=w_business.city');
	$result = pg_execute($link,'sql0',array());

      $countries = array();
      unset($country);
     $country->id = "-1";
	 $country->name = "All";
	 	$country->city = "-1";
		$country->country = "-1";
	 array_push($countries,$country);
	
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$country->id = $row['id'];
		$country->name = $row['name'];
		$country->city = $row['cityname'];
		$country->country = $row['country'];
		array_push($countries,$country);
		}

	return $countries;
	}	
	
	//tabsetting end 
function FetchAllCountriesData($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_countries WHERE scriptid=$1 and enabled=$2');
	$result = pg_execute($link,'sql0',array($_SESSION['scriptid'],'TRUE'));

	$countries = array();
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}

	return $countries;
	}


function FetchAllNeighborhoodData($link)
	{
		 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql0','SELECT * FROM w_neighborhood');
	
	$result = pg_execute($link,'sql0',array());

	$countries = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$cid =  $row['id'];
		
		pg_prepare($link,'sqlc'.$cid,'SELECT name FROM w_countries WHERE id=$1');
		pg_prepare($link,'sqlcc'.$cid,'SELECT city FROM w_franchises WHERE id=$1');
		
		
		
		$result1 = pg_execute($link,'sqlc'.$cid,array($row['country']));
		$result2 = pg_execute($link,'sqlcc'.$cid,array($row['city']));
		
		$row1 = pg_fetch_array($result1);
		$row2 = pg_fetch_array($result2);
		
		$country->id = $row['id'];
		$country->country = $row['country'];
		$country->city = $row['city'];
		$country->name = $row['name'];
		$country->enabled = $row['enabled'];
		
		$country->countryname = $row1[0];
		$country->cityname = $row2[0];
		
		array_push($countries,$country);
		
		}

	return $countries;
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


function GetAllFranchisesData($filters,$link)
	{
	$conditionalsvalues = array();
	$query = 'SELECT w_franchises.id,w_franchises.city,w_franchises.admin,w_franchises.enabled,w_franchises.tax,w_franchises.taxtype,w_users.name as name,w_users.lastname,w_users.lastname2,w_users.level FROM w_franchises INNER JOIN w_users ON w_franchises.admin = w_users.id';

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

	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	
	$franchises = array();
	while($row = pg_fetch_array($result))
		{
		unset($franchise);
		unset($admin);
		$franchise->id = $row['id'];
		$franchise->city = $row['city'];
		$franchise->enabled = $row['enabled'];
		$franchise->tax = $row['tax'];
		$franchise->taxtype = $row['taxtype'];
		
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
		
		array_push($franchises,$franchise);
		}

	return $franchises;
	}

function FetchAllUsersData($filters,$link)
	{
	AdminsOnly();
	if ($_SESSION['user']->level==0)
		return GetAllUsersData($filters,$link);
		else//admin requesting business data, we will only send him the data of his city...
		{
		if (empty($filters))
			{
			$filters = array();
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			}
			else
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .',"conditional":"AND"}'));
		
		array_push($filters,json_decode('{"modifier":"user","operator":"=","name":"id","value":'. $_SESSION['user']->id .',"conditional":"OR"}'));

		return GetAllUsersData($filters,$link);
		}
	}


function GetAllUsersData($filters,$link)
	{
	AdminsOnly();	

	$conditionalsvalues = array();
	$query = 'SELECT w_users.id,w_users.name,w_users.lastname,w_users.lastname2,w_users.email,w_users.level,w_users.enabled FROM w_users LEFT JOIN w_franchises ON w_franchises.id=w_users.city';

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

	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
	$users = array();

	while($row = pg_fetch_array($result))
		{
		unset($user);
		$user->id = $row['id'];
		$user->name = $row['name'];
		$user->lastname = $row['lastname'];
		$user->lastname2 = $row['lastname2'];
		$user->email = $row['email'];
		$user->enabled = $row['enabled'];
		$user->level = $row['level'];
		include_once "../../languages/lang.en.php";	
		switch($row['level'])
			{
			case 0:
				$user->levelname =  $lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'];
			break;
			case 1:
				$user->levelname =  $lang_resource['CONTROL_PANEL_USER_ADMIN'];
			break;
			case 2:
				$user->levelname =  $lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'];
			break;
			case 3:
				$user->levelname =  $lang_resource['CONTROL_PANEL_USER_CUSTOMER'];
			break;
			case 4:
				$user->levelname =  $lang_resource['CONTROL_PANEL_USER_DRIVER'];
			break;
			case 5:
				$user->levelname =  $lang_resource['CONTROL_PANEL_USER_DRIVERMANAGER'];
			break;
			}
		
		if ($user->id!=$_SESSION['user']->id && $user->level<=$_SESSION['user']->level)//only send the users with less privileges
			{}
			else
			array_push($users,$user);
		}

	return $users;
	}

function GetLevelText1($level)
	{
	include_once "../../languages/lang.en.php";	
	switch($level)
			{
			case 0:
				return $lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'];
			break;
			case 1:
				return $lang_resource['CONTROL_PANEL_USER_ADMIN'];
			break;
			case 2:
				return $lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'];
			break;
			case 3:
				return $lang_resource['CONTROL_PANEL_USER_CUSTOMER'];
			break;
			case 4:
				return $lang_resource['CONTROL_PANEL_USER_DRIVER'];
			break;
			case 5:
				return $lang_resource['CONTROL_PANEL_USER_DRIVERMANAGER'];
			break;
			}

	return '';
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
	while($row = pg_fetch_array($result))
		{
		unset($category);
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
		return($_SESSION['user']);
		else
		{
		AdminsOnly();

		pg_prepare($link,'sql','SELECT * from w_users WHERE id=$1');
		$result = pg_execute($link,'sql',array($user));
		
		unset($user);
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user->id = $row['id'];
				$user->name = $row['name'];
				$user->lastname = $row['lastname'];
				$user->lastname2 = $row['lastname2'];
				$user->email = $row['email'];
				$user->street = $row['street'];
				$user->colony = $row['colony'];
				$user->cp = $row['cp'];
				$user->city = $row['city'];
				$user->country = $row['country'];
				$user->tel = $row['tel'];
				$user->cel = $row['cel'];
				$user->job = $row['job'];
				$user->location = $row['location'];
				$user->level = $row['level'];
				$user->isimg = $row['isimg'];
				if ($user->id!=$_SESSION['user']->id && $user->level<=$_SESSION['user']->level)//if the user asking for users data has less privileges he wont get the data
					return '';
				}
		
		return $user;
		}
		
	}
	
function FetchNeighborhoodData($id,$link)
{
	
	pg_prepare($link,'sql','SELECT * from w_neighborhood WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		
		unset($user);
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$user->id = $row['id'];
				$user->country = $row['country'];
				$user->city = $row['city'];
				$user->name = $row['name'];
				$user->enabled = $row['enabled'];
				
				}
		
		return $user;
	
	
}
	

function FetchBusinessData($id,$link)
	{
	ProvidersOnly();
	if(IS_PAYPAL_ENABLED == 1)
		pg_prepare($link,'sql','SELECT w_business.paypal_type,w_business.mercury_id,w_business.businesspagecustomtext,w_business.mercury_pass,w_business.acceptcard,w_business.acceptcash,w_business.cardsaveid,w_business.cardsavepass,w_business.payment_type,w_business.aplid,w_business.tkey,w_business.environment,w_business.merchant_id,w_business.public_key,w_business.private_key,w_business.isimg,w_business.apk,w_business.vatregistration,w_business.invoiceaddress,w_business.vatemail,w_business.payby,w_business.bankname,w_business.bankac,w_business.routineno, w_business.swiftcode,w_business.vatpaypalemail,w_business.fixedrate,w_business.otherrate,w_business.vat,w_business.billingfxprice,w_business.billingperorder,w_business.billingperorderfixrate,w_business.autoinvoiceday,w_business.id,w_business.country,w_business.name,w_business.street,w_business.colony,w_business.cp,w_business.tel,w_business.cel,w_business.email,w_business.paypal,w_business.city,w_business.categories,w_business.mkeywords,w_business.mdescription,w_business.abusiness,w_business.pdesc,w_business.customslug,w_business.schedule,w_business.location,w_business.zones,w_business.minimum,w_business.reorder,w_business.feature,w_franchises.city as cityname,w_business.provider,w_business.twiliophone,w_business.twilioenabled,w_business.secretkey,w_business.clientkey,w_business.searchzip,w_business.burl,w_business.promotion,w_users.name as providername,w_users.lastname as providerlastname,w_users.lastname2 as providerlastname2 FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id AND w_business.id=$1');
	else
		pg_prepare($link,'sql','SELECT w_business.paypal_type,w_business.mercury_id,w_business.businesspagecustomtext,w_business.mercury_pass,w_business.acceptcard,w_business.cardsaveid,w_business.cardsavepass,w_business.payment_type,w_business.aplid,w_business.tkey,w_business.environment,w_business.merchant_id,w_business.public_key,w_business.private_key,w_business.isimg,w_business.apk,w_business.vatregistration,w_business.invoiceaddress,w_business.vatemail,w_business.payby,w_business.bankname,w_business.bankac,w_business.routineno, w_business.swiftcode,w_business.vatpaypalemail,w_business.fixedrate,w_business.otherrate,w_business.vat,w_business.billingfxprice,w_business.billingperorder,w_business.billingperorderfixrate,w_business.autoinvoiceday,w_business.id,w_business.country,w_business.name,w_business.street,w_business.colony,w_business.cp,w_business.tel,w_business.cel,w_business.email,w_business.city,w_business.categories,w_business.mkeywords,w_business.mdescription,w_business.abusiness,w_business.pdesc,w_business.customslug,w_business.schedule,w_business.location,w_business.zones,w_business.minimum,w_business.reorder,w_business.feature,w_franchises.city as cityname,w_business.provider,w_business.acceptcash,w_business.twiliophone,w_business.twilioenabled,w_business.secretkey,w_business.clientkey,w_business.searchzip,w_business.burl,w_business.promotion,w_users.name as providername,w_users.lastname as providerlastname,w_users.lastname2 as providerlastname2 FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id AND w_business.id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($business);
			$business->id = $row['id'];
			$business->name = $row['name'];
			$business->street = $row['street'];
			$business->colony = $row['colony'];
			$business->cp = $row['cp'];
			$business->tel = $row['tel'];
			$business->cel = $row['cel'];
			$business->email = $row['email'];
			if(IS_PAYPAL_ENABLED == 1)
			$business->paypal = $row['paypal'];
			$business->schedule = $row['schedule'];
			$business->categories = $row['categories'];
			$business->location = $row['location'];
			$business->zones = $row['zones'];
			$business->acceptcard = $row['acceptcard'];
			$business->acceptcash = $row['acceptcash'];
			$business->businesspagecustomtext = $row['businesspagecustomtext'];
			
			$business->country = $row['country'];
			$business->mkeywords = $row['mkeywords'];
			$business->mdescription = $row['mdescription'];
			$business->minimum = $row['minimum'];
			$business->twiliophone = $row['twiliophone'];
			$business->twilioenabled = $row['twilioenabled'];
			$business->secretkey = $row['secretkey'];
			$business->clientkey = $row['clientkey'];
			$business->searchzip = $row['searchzip'];
			$business->burl = $row['burl'];
			$business->pdesc = $row['pdesc'];
			$business->abusiness = $row['abusiness'];
			$business->customslug = $row['customslug'];
			$business->isimg = $row['isimg'];
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
			
			$business->mercury_pass = $row['mercury_pass'];
			$business->mercury_id = $row['mercury_id'];
			
			
			$business->environment = $row['environment'];
			$business->merchant_id = $row['merchant_id'];
			$business->public_key = $row['public_key'];
			$business->private_key = $row['private_key'];
			
			
			$business->payment_type = $row['payment_type'];
			$business->tkey = $row['tkey'];
			$business->aplid = $row['aplid'];
			
			$business->paypal_type = $row['paypal_type'];
			$business->cardsaveid = $row['cardsaveid'];
			$business->cardsavepass = $row['cardsavepass'];
			
			$business->reorder = $row['reorder'];
			$business->feature = $row['feature'];
			
			
			
			
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
			}

	return $business;
	}

function FetchFranchiseData($id,$link)
	{
	SuperAdminsOnly();
	if(IS_PAYPAL_ENABLED == 1)
		pg_prepare($link,'sql','SELECT city,admin,email,country,currency,ga,timezone,tax,taxtype FROM w_franchises WHERE id=$1');
	else
		pg_prepare($link,'sql','SELECT city,admin,email,country,ga,timezone,tax,taxtype FROM w_franchises WHERE id=$1');

	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($franchise);
			$franchise->id = $id;
			$franchise->city = $row['city'];
			$franchise->admin = $row['admin'];
			$franchise->email = $row['email'];
			$franchise->country = $row['country'];
			if(IS_PAYPAL_ENABLED == 1)
				$franchise->currency = $row['currency'];
			$franchise->ga = $row['ga'];
			$franchise->timezone = $row['timezone'];
			$franchise->tax = $row['tax'];
			$franchise->taxtype = $row['taxtype'];
			}


	return $franchise;
	}

function FetchAdData($id,$link)
	{
	SuperAdminsOnly();
	pg_prepare($link,'sql','SELECT name,link,city,type,time,isimg FROM w_ads WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $id;
			$ad->name = $row['name'];
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
	SuperAdminsOnly();
	pg_prepare($link,'sql','SELECT name,link,type,business FROM w_gallery WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ed);
			$ed->id = $id;
			$ed->name = $row['name'];
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

		pg_prepare($link,'sql','SELECT * from w_drivermanager WHERE id=$1');
		$result = pg_execute($link,'sql',array($user));
		
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


function FetchDriverData($user,$link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sql','SELECT * from w_driver WHERE id=$1');
		$result = pg_execute($link,'sql',array($user));
		
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
	

		pg_prepare($link,'sql','SELECT * from w_drivermanager');
		$result = pg_execute($link,'sql',array());
		
	 $users = array();
	
			while($row = pg_fetch_array($result))
				{
				unset($user);
				$user->id = $row['id'];
				$user->name = $row['name'];
				$user->lastname = $row['lastname'];
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



function FetchDriverAllData($link) {
	
	
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
						pg_prepare($link,'sql1',"SELECT * from w_driver WHERE group_id IN ".$grpid_arr_str." AND enabled = $1");
						$result = pg_execute($link,'sql1',array(TRUE));
						//print_r($result);
						//exit;
						
					}else
					{
					 	pg_prepare($link,'sql','SELECT * from w_driver');
		                $result = pg_execute($link,'sql',array());
						
					}

		
		
	 $users = array();
	
			while($row = pg_fetch_array($result))
				{
				unset($user);
				$user->id = $row['id'];
				$user->group_id = $row['group_id'];
				$user->name = $row['name'];
				$user->lastname = $row['lastname'];
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
			array_push($users,$user);
				}
		
		return $users;
		
	
	}
		
	
function FetchDriverGroupAllData($link) {

	
				
				 if($_SESSION['user']->level=='5')
					{
						
					    $usr= $_SESSION['user']->id;
						pg_prepare($link,'sql','SELECT id from w_drivermanager WHERE usr = $1');
		                $result = pg_execute($link,'sql',array($usr));
						$row = pg_fetch_array($result);
						pg_prepare($link,'sql1','SELECT * from w_drivergroup WHERE drivermanager_id = $1');
		                $result = pg_execute($link,'sql1',array($row['id']));
						
					}else
					{
					 	pg_prepare($link,'sql','SELECT * from w_drivergroup');
		                 $result = pg_execute($link,'sql',array());	
						
					}
					
		
	 $users = array();
	 $link = ConnectDB();
	 pg_prepare($link,'sql66','SELECT name from w_drivermanager WHERE id = $1');
	
	
			while($row = pg_fetch_array($result))
				{
				unset($user);
				$user->id = $row['id'];
				$user->drivermanager_id = $row['drivermanager_id'];
				$user->group_name = $row['group_name'];
				$user->per_day = $row['per_day'];
				$user->per_month = $row['per_month'];
				$user->per_year = $row['per_year'];
				$user->com_rate = $row['com_rate'];
				$user->com_rate1 = $row['com_rate1'];
				$user->enabled = $row['enabled'];
				$result66 = pg_execute($link,'sql66',array($row['drivermanager_id']));	
				$row66 = pg_fetch_array($result66);
				$user->drivermanager_name = $row66[0];
			    //$user->business = $row['business'];
				
			array_push($users,$user);
				}
		
		//return $_SESSION['user']->level;
		return $users;
		
	
	}	


	
	
function FetchDriverGroupData($user,$link)
	{
	
	//	AdminsOnly();

		pg_prepare($link,'sql','SELECT * from w_drivergroup WHERE id=$1');
		$result = pg_execute($link,'sql',array($user));
		
		unset($user);
		if (pg_num_rows($result)==1) 
			while($row = pg_fetch_array($result))
				{
				unset($user);
				$user->id = $row['id'];
				$user->drivermanager_id = $row['drivermanager_id'];
				$user->group_name = $row['group_name'];
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
function FetchSiteSetting($link){
	
	pg_prepare($link,'sqlcon1','SELECT * FROM w_configs where name = $1');
	$result = pg_execute($link,'sqlcon1',array('siteurl'));
	$row = pg_fetch_array($result);
	
	
	return $row['value'];
	
}

function FetchOrderDataApproved_backup($link){
	
	pg_prepare($link,'sqlsound','SELECT * FROM w_orders where status = $1 order by id');
	$result = pg_execute($link,'sqlsound',array(0));
	$soundapproveds = array(); 
	
	while($row = pg_fetch_array($result)){
		unset($soundapproved);
		$soundapproved->id = $row['id'];
		array_push($soundapproveds,$soundapproved);
	}
	
	return $soundapproveds;
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

	pg_prepare($link,'sqlsound','SELECT * FROM w_orders where status = $1 order by id');
	$result = pg_execute($link,'sqlsound',array(0));
	
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
							foreach ($data->business as $databusiness){
								if ($databusiness->id==$business)
									$continue = true;
							}
						}
					}
				}
			}
		}
		
		if ($continue==true){
			unset($soundapproved);
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


?>
