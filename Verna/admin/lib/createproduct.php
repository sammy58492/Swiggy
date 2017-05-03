<?php 
session_start();
require('panel-main.php');
require('paymentlist.php');
require_once('../login/common.php');
require_authentication();

global $lang_resource;
function GetLangFileStaticProduct(){	

	require('../config.php');
	$link1 = ConnectDB($CFG);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		pg_prepare($link1,'sqllangfetchp','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
		$result1 = pg_execute($link1,'sqllangfetchp',array('TRUE'));
		$row1 = pg_fetch_array($result1);
		$_SESSION['l'] = $row1['id'];
	}
	pg_prepare($link1,'sqlfetchlangp','SELECT * from w_lang_static');
	$result = pg_execute($link1,'sqlfetchlangp',array());
	while($row = pg_fetch_array($result)){
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	}
	return $lang_resource;
	pg_close($link1);
}


switch ($_POST['f'])
	{
	case 'FetchCheckoutInfo':
			FetchCheckoutInfo();
	break;
	
	case 'FetchusersInfo':
			FetchusersInfo();
	break;
		
	case 'fetchproduct':
		fetchproduct($_POST['data']);
	break;
	
	case 'FetchOrderdata':
		FetchOrderdata($_POST['data']);
	break;
	
	
	case 'fetchproductdeliveryaction':
		fetchproductdeliveryaction($_POST['data'],$_POST['deliac']);
	break;
	
	case 'fetchproductdeliveryactionformenu':
		fetchproductdeliveryactionformenu($_POST['data'],$_POST['menuid']);
	break;
	
	
	
	case 'FetchAllBusinessDeliveryLocation':
			FetchAllBusinessDeliveryLocation($_POST['data'],$_POST['alldata'],$_POST['bid']);
	break;
	
	case 'fetchbusiness':
		fetchbusiness();
	break;
	
	case 'PlaceOrder':
		echo $ret = PlaceOrder($_POST['data'],$_POST['eid']);
			$ret = explode(",", $ret);			
			PlaceOrderConfirm($ret[0]);
	break;
	case 'FetchOrder':
			FetchOrder($_POST['id']);
	break;
	case 'PlaceOrderbefore':
			PlaceOrderbefore($_POST['data']);
	break;
	default:
		die();
	break;
	}

/*******************************************************UPDATE GLOBAL USER PREFS************************************************/


function FetchusersInfo(){
	$link = ConnectDB();
	pg_prepare($link,'sqlcheckout','SELECT * FROM w_users WHERE scriptid =$1');
	$result2 = pg_execute($link,'sqlcheckout',array('0'));
	$users = array();
	
	while($row2 = pg_fetch_array($result2)){
		$user = new stdClass();
		//unset($user);
		$user->id=$row2['id'];
		$user->name=$row2['name']." ".$row2['lastname2'];
		$user->email=$row2['email'];
		$user->street=$row2['street'];
		$user->cel=$row2['cel'];
		if($user->cel != null)	
		array_push($users,$user);	
	}
	echo json_encode($users);

	
}

function get_lat_long($address){

    $address = str_replace(" ", "+", $address);

    $json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=$region");
    $json = json_decode($json);

    $lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
    $long = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
    $record['lat'] = $lat;
	$record['long'] = $long;
	
	
    return $record;
}


function FetchCheckoutInfo(){
	$link = ConnectDB();
	pg_prepare($link,'sqlcheckout','SELECT * FROM w_checkout');
	$result2 = pg_execute($link,'sqlcheckout',array());
	$checkout = array();
	
	while($row2 = pg_fetch_array($result2)){
		$checkout[$row2['field_name']]['id']=$row2['id'];
		$checkout[$row2['field_name']]['field_name']=$row2['field_name'];
		$checkout[$row2['field_name']]['required']=$row2['required'];
		$checkout[$row2['field_name']]['status']=$row2['status'];
		$checkout[$row2['field_name']]['type']=$row2['type'];		
	}
	echo json_encode($checkout);

	
}
function FetchOrder($id){
	$link = ConnectDB();
	$orderData = array();

	pg_prepare($link,'sqlo','SELECT * FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sqlo',array($id));

	$row = pg_fetch_array($result);

	unset($orderc);

	$data=$row['data'];
	$data=json_decode($data);

	$orderc->id = $data->business[0]->id;
	$orderc->name = $data->business[0]->name;
	$orderc->tel = $data->business[0]->tel;

	//array_push($orderData,$orderc);

	echo json_encode($orderc);
}

function defaultlanguage(){
	$link = ConnectDB();
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	pg_close($link);	
	return $defaultid;
	
}
function fetchbusiness()
{
	//echo $_SESSION['user']->level;
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	
	$all_business = array();
	
	if($_SESSION['user']->level == 0){
		pg_prepare($link,'sql1','SELECT  w_business.id,w_business.name,w_business.tel,w_business.email,w_business.servicefee,w_business.enabled,w_business.twiliophone,w_business.location,w_business.currency,w_business.twilioenabled,w_business.acceptsms,w_business.minimum,w_business.tax,w_business.taxtype,w_business.city,w_business.customslug FROM w_business WHERE scriptid=$1 AND enabled=$2 ORDER BY w_business.name ASC');
		$result = pg_execute($link,'sql1',array($_SESSION['scriptid'],'TRUE'));
	}else if($_SESSION['user']->level == 1){
		pg_prepare($link,'sql2','SELECT  w_business.id,w_business.name,w_business.tel,w_business.email,w_business.servicefee,w_business.currency,w_business.location,w_business.customslug,w_business.twiliophone,w_business.twilioenabled,w_business.acceptsms,w_business.minimum,w_business.tax,w_business.taxtype,w_business.city FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id WHERE w_franchises.admin =$1  AND w_business.scriptid=$2 ORDER BY w_business.name ASC');
		$result = pg_execute($link,'sql2',array($_SESSION['user']->id,$_SESSION['scriptid']));
	}else if($_SESSION['user']->level == 2){
		pg_prepare($link,'sql3','SELECT w_business.id,w_business.name,w_business.tel,w_business.servicefee,w_business.customslug,w_business.currency,w_business.email,w_business.twiliophone,w_business.twilioenabled,w_business.acceptsms,w_business.minimum,w_business.tax,w_business.taxtype,w_business.city FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id and w_users.id=$1 AND w_business.scriptid=$2 ORDER BY w_business.name ASC');
		$result = pg_execute($link,'sql3',array($_SESSION['user']->id,$_SESSION['scriptid']));
	}
	
		pg_prepare($link,'sqlfetchbusinesscity','SELECT * FROM w_franchises WHERE id=$1');
	
		
		pg_prepare($link,'sqlfetchservicefee','SELECT * FROM w_configs WHERE name=$1');
		$result2 = pg_execute($link,'sqlfetchservicefee',array("servicefee"));
		$row2=pg_fetch_array($result2);
		
		
		pg_prepare($link,'sqlfetchservicefee12','SELECT * FROM w_configs WHERE name=$1');
		$result13 = pg_execute($link,'sqlfetchservicefee12',array("servicefeesettings"));
		$row13=pg_fetch_array($result13);
		
		
		$c=0;
		
	while($row1=pg_fetch_array($result)){
		$business = new stdClass();
		//unset($business);
		$business->id = $row1['id'];
		$business->name = FetchBusinessNameLangDefault($defultlang,$row1['id'],$link);
		$business->customslug = $row1['customslug'];
		$business->tel = $row1['tel'];
		$business->email = $row1['email'];
		$business->enabled = $row1['enabled'];
		$business->location = $row1['location'];
		$business->twiliophone = $row1['twiliophone'];
		$business->twilioenabled = $row1['twilioenabled'];
		$business->acceptsms = $row1['acceptsms'];
		$business->minimum = $row1['minimum'];
		$business->city = $row1['city'];
		$result3 = pg_execute($link,'sqlfetchbusinesscity',array($row1['city']));
		$row3=pg_fetch_array($result3);
		$business->cityname = FetchBusinessCityNameLangDefault($defultlang,$row3['id'],$link,$c);
		if($row1['tax']!=""){
		$business->tax = $row1['tax'];
		}else{
		$business->tax = $row3['tax'];	
		}
		if($row1['taxtype']!=""){
		$business->taxtype = $row1['taxtype'];
		}else{
		$business->taxtype = $row3['taxtype'];	
		}
		
		$currency = $row1['currency'];
		$business->currency = currency_symbolAd($currency);
		$business->servicefeesettings = $row13['value'];
					
		$business->servicefee = $row2['value'];
		$business->shipping = "Pending";
		
		$business->servicefee1 = $row1['servicefee'];
		
		$getautodiscount = GetAutoDiscount($row1['id'],$c);
		$business->autodiscount = $getautodiscount;
		$business->paymentdetails = PaymentFetch($row1['id'],$link);
		if($business->name !=null)
		array_push($all_business,$business);
		$c++;
	}
	echo json_encode($all_business);
}

function FetchBusinessNameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
function FetchBusinessCityNameLangDefault($defultlang,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlangcity'.$cid.$c,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangcity'.$cid.$c,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['city_lang'];
}




function GetAutoDiscount($id,$c){
	$link = ConnectDB();
	$all_autodiscount = array();
	
	 date_default_timezone_set('Europe/London');
	 $now = date('Y-m-d'); 
	
	pg_prepare($link,'sqlfetchautodiscount'.$id.$c,'SELECT * FROM w_discountoffer WHERE business=$1');
	$result1 = pg_execute($link,'sqlfetchautodiscount'.$id.$c,array($id));
	while($row=pg_fetch_array($result1)){
		$autodiscount = new stdClass();
		//unset($autodiscount);
		$autodiscount->id = $row['id'];
		$autodiscount->discountype = $row['discountype'];
		$autodiscount->rate = $row['rate'];
		$autodiscount->minshop = $row['minshop'];
		$autodiscount->startdate = $row['startdate'];
		$autodiscount->enddate = $row['enddate'];
		$autodiscount->validdays = $row['validdays'];
		$autodiscount->business = $id;
		if($row['enddate']>=$now){	
		array_push($all_autodiscount,$autodiscount);
		}

	}
	return $all_autodiscount;
}

function FetchOrderdata($data){
	$defaultlang = defaultlanguage();
		$link = ConnectDB();
		$orders = array();		
		
		pg_prepare($link,'sqlorder',"SELECT * FROM w_orders where id=$1");
		$resultorder = pg_execute($link,'sqlorder',array($data));
		$roworder = pg_fetch_array($resultorder);
		$order = new stdClass();
		
		$order->id = $roworder['id'];
		$order->data = $roworder['data'];
		//array_push($orders,$order);
		
	echo json_encode($order);
}
function fetchproduct($data)
	{
		$defaultlang = defaultlanguage();
		$link = ConnectDB();
		$menudish = array();
		$menudishid = array();
		$extra_option= array();
		
		
		pg_prepare($link,'sqldish',"SELECT * FROM w_dishes where business=$1 and enabled='TRUE'");
		$resultdish = pg_execute($link,'sqldish',array($data));
				$dd=0;
				while($rowdish = pg_fetch_array($resultdish)){
					$dish = new stdClass();
					//unset($dish);
					
					  $dish->id = $rowdish['id'];
					  $defaultlang;
					$link = ConnectDB();
					pg_prepare($link,'sqllang0'.$dish->id,"SELECT * FROM w_dishes_lang where dishes_id=$1 and lang_id=$2");
					$resultlang = pg_execute($link,'sqllang0'.$dish->id,array($dish->id,$defaultlang));
					while($rowlang = pg_fetch_array($resultlang)){
						$dish->name = $rowlang['name_lang'];					
					}
					
					$dish->business = $data;
					$dish->description = $rowdish['description'];
					$dish->price = $rowdish['price'];
					
					$business_id = $rowdish['business'];
					pg_prepare($link,'sqlcurrency'.$business_id.$rowdish['id'],"SELECT * FROM w_business where id=$1");
					$resultdish1 = pg_execute($link,'sqlcurrency'.$business_id.$rowdish['id'],array($business_id));
					$rowdish1 = pg_fetch_array($resultdish1);
					
					$currency = $rowdish1['currency'];
					$dish->currency = currency_symbolAd($currency);
					
					$dish->enabled = $rowdish['enabled'];					
					$dish->ingredients = $rowdish['ingredients'];
					$dish->extras = $rowdish['extras'];
					$dish->isimg = $rowdish['isimg'];
					$dish->isimg2 = $rowdish['isimg2'];
					$dish->isimg3 = $rowdish['isimg3'];
					$exdish = parse($rowdish['extras']);
					
					if(!empty($rowdish['extras'])){						
						$getallsets = GetAllSets1($dish->extras,$dish->id,$dd);
						$dish->extra_option = $getallsets;

					}
					
					$dd++;
					$link = ConnectDB();
					pg_prepare($link,'sqldishmenu'.$rowdish['id'].$dd,"SELECT * FROM w_menus where business=$1 and enabled=$2");
					$resultmenu = pg_execute($link,'sqldishmenu'.$rowdish['id'].$dd,array($data,'TRUE'));
				

					while($rowmenu = pg_fetch_array($resultmenu)){
						$rdish = parse($rowmenu['dishes']);	
						
						if (in_array($rowdish['id'], $rdish)){												
							if(in_array($rowdish['id'], $menudishid) !=1){								
								if(!empty($rowdish['extras'])){
									array_push($menudish,$dish);
									array_push($menudishid,$rowdish['id']);
								}else if(empty($rowdish['extras'])){
									array_push($menudish,$dish);
									array_push($menudishid,$rowdish['id']);	
								}
							}
								
						}	
											
					}
					//print_r($menudish);
					
	
					
				
				
	
			}
			$finalmenu =array();
			$finalmenu['menudish'] = $menudish;
			//print_r($menudish);
		echo json_encode($finalmenu);
	
	}
	function GetAllSets1($extra_id1,$dish_id,$dd){

	
	$defaultlang = defaultlanguage();
	$set_name ='';
	$choice_name ='';
	$link = ConnectDB();
	$extras_details =array();
	$choice_details =array();
	
		$query_p = 'SELECT value FROM w_configs WHERE name=$1';
		pg_prepare($link,'sqlp'.$dish_id,$query_p);
		$result_p = pg_execute($link,'sqlp'.$dish_id,array('businesspagpersonsetting'));
		$row_p = pg_fetch_array($result_p);
		$person1 = $row_p["value"];
		
		$query_q = 'SELECT value FROM w_configs WHERE name=$1';
		pg_prepare($link,'sqlq'.$dish_id,$query_q);
		$result_q = pg_execute($link,'sqlq'.$dish_id,array('businesspagqtysetting'));
		$row_q = pg_fetch_array($result_q);
		$qty1 = $row_q["value"];
	
	$extras_id = parse($extra_id1);
	
	pg_prepare($link,'sql'.$dish_id,'SELECT * FROM w_extras WHERE id=$1 and enabled=$2');
	pg_prepare($link,'sql1'.$dish_id,'SELECT distinct option_id,option_name,rank,max_sel,min_sel,conditional,with_respect_to,option_text_to_end_user,ingredients FROM w_extras_options WHERE set_id=$1 order by rank');
	
	pg_prepare($link,'sql3'.$dish_id,'SELECT * FROM w_dishes WHERE id=$1 and enabled=$2');	
	$mainarray = array();
	$i = 0;
	
	foreach($extras_id as $extra_id){
	$results = pg_execute($link,'sql'.$dish_id,array($extra_id,'TRUE'));
		while($row = pg_fetch_array($results)){
		$mainarray[$i]['id'] = $row['id'];
		$mainarray[$i]['name'] = $row['set'];
		$mainarray[$i]['qty_count']=$row['qty']; 	
		$mainarray[$i]['person_count']=$row['person'];
		
		$mainarray[$i]['person'] = $person1;
		$mainarray[$i]['qty'] = $qty1;
		
		$results1 = pg_execute($link,'sql1'.$dish_id,array($row['id']));
		$options = array();
		$j = 0;
			while($row1 = pg_fetch_array($results1)){
				 $options[$j]['id'] = $row1['option_id'];
				
				pg_prepare($link,'sqllang1852'.$j.$row1['option_id'].$dish_id,"SELECT * FROM w_extras_options_lang where extras_options_id=$1 and lang_id=$2");
				$resultlang = pg_execute($link,'sqllang1852'.$j.$row1['option_id'].$dish_id,array($options[$j]['id'],$defaultlang));
				while($rowlang = pg_fetch_array($resultlang)){
						$options[$j]['name'] = $rowlang['option_name_lang'];
						$options[$j]['option_text_to_end_user'] = $rowlang['option_text_to_end_user_lang'];	
									
				}
				
					
				
				
				$options[$j]['maxsel'] = $row1['max_sel'];
				$options[$j]['minsel'] = $row1['min_sel'];
				$options[$j]['rank'] = $row1['rank'];
				$options[$j]['conditional'] = $row1['conditional'];
				if($row1['conditional']=='yes'){
					$options[$j]['with_respect_to'] = $row1['with_respect_to'];
				}
				$options[$j]['ingredients'] = $row1['ingredients'];
			
				pg_prepare($link,'sql2'.$dish_id.$row1['option_id'].$j.$dd,'SELECT * FROM w_extras_options WHERE option_id=$1 and set_id=$2');
				$results2 = pg_execute($link,'sql2'.$dish_id.$row1['option_id'].$j.$dd,array($row1['option_id'],$extra_id));
				$choices = array();
				$k = 0;
					while($row2 = pg_fetch_array($results2)){
						$choices[$k]['id']= $row2['choice_id'];
						$choices[$k]['name']= FetchBusinessChoiceNameLangDefault1($defaultlang,$row2['choice_id'],$link,$k,$dish_id,$j,$dd);
						$choices[$k]['price']= $row2['price'];
						
						$k++;
					}
				$options[$j]['choices'] = $choices;
				$j++;
			}
		$mainarray[$i]['options'] = $options;
		$i++;
		}
}
$choicerecord = array();
$c=0;
	foreach($mainarray as $minarr){
		foreach($minarr['options'] as $minar){
			if($minar['conditional'] == 'yes'){
			$chr = explode(",",$minar['with_respect_to']);
			$choicerecord[$chr[1]][$c] = $minar['id'];
			$c++;
			}
		}
}

$newarray = array();
	foreach($mainarray as $key1=>$minarr){
		foreach($minarr['options'] as $key2=>$minar){	
			foreach($minar['choices'] as $key3=>$miar){
				if (array_key_exists($miar['id'], $choicerecord)) {
					$mainarray[$key1]['options'][$key2]['choices'][$key3]['conditionoptionid'] = $choicerecord[$miar['id']];
				}
			}
		}
}


$results3 = pg_execute($link,'sql3'.$dish_id,array($dish_id,'TRUE'));
$row3=pg_fetch_array($results3);


if($row3['ingredients']!=null){
	$response['ingredientsstatus'] = true;
	$response['ingredients']= $row3['ingredients'];
}else{
	$response['ingredientsstatus'] = false;
}
$response['setids']= $mainarray;
//pg_close($link);
return $mainarray;


	}
/****************************************************extra Option********************************************/
function GetAllSets($extra_id1,$dish_id)
{
	
	$defaultlang = defaultlanguage();
	$set_name ='';
	$choice_name ='';
	$link = ConnectDB();
	$extras_details =array();
	$choice_details =array();
	
		$query_p = 'SELECT value FROM w_configs WHERE name=$1';
		pg_prepare($link,'sqlp'.$dish_id,$query_p);
		$result_p = pg_execute($link,'sqlp'.$dish_id,array('businesspagpersonsetting'));
		$row_p = pg_fetch_array($result_p);
		$person1 = $row_p["value"];
		
		$query_q = 'SELECT value FROM w_configs WHERE name=$1';
		pg_prepare($link,'sqlq'.$dish_id,$query_q);
		$result_q = pg_execute($link,'sqlq'.$dish_id,array('businesspagqtysetting'));
		$row_q = pg_fetch_array($result_q);
		$qty1 = $row_q["value"];
	
	$extras_id = parse($extra_id1);
	
	pg_prepare($link,'sql'.$dish_id,'SELECT * FROM w_extras WHERE id=$1 and enabled=$2');
	pg_prepare($link,'sql1'.$dish_id,'SELECT distinct option_id,option_name,rank,max_sel,min_sel,conditional,with_respect_to,option_text_to_end_user,ingredients FROM w_extras_options WHERE set_id=$1 order by rank');
	
	pg_prepare($link,'sql3'.$dish_id,'SELECT * FROM w_dishes WHERE id=$1 and enabled=$2');	
	$mainarray = array();
	$i = 0;
	
	foreach($extras_id as $extra_id){
	$results = pg_execute($link,'sql'.$dish_id,array($extra_id,'TRUE'));
		while($row = pg_fetch_array($results)){
		$mainarray[$i]['id'] = $row['id'];
		$mainarray[$i]['name'] = $row['set'];
		$mainarray[$i]['qty_count']=$row['qty']; 	
		$mainarray[$i]['person_count']=$row['person'];
		
		$mainarray[$i]['person'] = $person1;
		$mainarray[$i]['qty'] = $qty1;
		
		$results1 = pg_execute($link,'sql1'.$dish_id,array($row['id']));
		$options = array();
		$j = 0;
		
			while($row1 = pg_fetch_array($results1)){
				 $options[$j]['id'] = $row1['option_id'];
				
				pg_prepare($link,'sqllang1852'.$j.$row1['option_id'].$dish_id,"SELECT * FROM w_extras_options_lang where extras_options_id=$1 and lang_id=$2");
				$resultlang = pg_execute($link,'sqllang1852'.$j.$row1['option_id'].$dish_id,array($options[$j]['id'],$defaultlang));
				while($rowlang = pg_fetch_array($resultlang)){
						$options[$j]['name'] = $rowlang['option_name_lang'];
						$options[$j]['option_text_to_end_user'] = $rowlang['option_text_to_end_user_lang'];	
									
				}
				
					
				
				
				$options[$j]['maxsel'] = $row1['max_sel'];
				$options[$j]['minsel'] = $row1['min_sel'];
				$options[$j]['rank'] = $row1['rank'];
				$options[$j]['conditional'] = $row1['conditional'];
				if($row1['conditional']=='yes'){
					$options[$j]['with_respect_to'] = $row1['with_respect_to'];
				}
				$options[$j]['ingredients'] = $row1['ingredients'];
			
				pg_prepare($link,'sql2'.$dish_id.$row1['option_id'].$j,'SELECT * FROM w_extras_options WHERE option_id=$1 and set_id=$2');
				$results2 = pg_execute($link,'sql2'.$dish_id.$row1['option_id'].$j,array($row1['option_id'],$extra_id));
				$choices = array();
				$k = 0;
				
					while($row2 = pg_fetch_array($results2)){
						$choices[$k]['id']= $row2['choice_id'];
						$choices[$k]['name']= FetchBusinessChoiceNameLangDefault($defaultlang,$row2['choice_id'],$link,$k,$dish_id);
						$choices[$k]['price']= $row2['price'];
						
						$k++;
					}
				$options[$j]['choices'] = $choices;
				$j++;
			}
		$mainarray[$i]['options'] = $options;
		$i++;
		}
}
$choicerecord = array();
$c=0;
	foreach($mainarray as $minarr){
		foreach($minarr['options'] as $minar){
			if($minar['conditional'] == 'yes'){
			$chr = explode(",",$minar['with_respect_to']);
			$choicerecord[$chr[1]][$c] = $minar['id'];
			$c++;
			}
		}
}

$newarray = array();
	foreach($mainarray as $key1=>$minarr){
		foreach($minarr['options'] as $key2=>$minar){	
			foreach($minar['choices'] as $key3=>$miar){
				if (array_key_exists($miar['id'], $choicerecord)) {
					$mainarray[$key1]['options'][$key2]['choices'][$key3]['conditionoptionid'] = $choicerecord[$miar['id']];
				}
			}
		}
}


$results3 = pg_execute($link,'sql3'.$dish_id,array($dish_id,'TRUE'));
$row3=pg_fetch_array($results3);


if($row3['ingredients']!=null){
	$response['ingredientsstatus'] = true;
	$response['ingredients']= $row3['ingredients'];
}else{
	$response['ingredientsstatus'] = false;
}
$response['setids']= $mainarray;
//pg_close($link);
return $mainarray;

}

function FetchBusinessChoiceNameLangDefault1($defultlang,$cid,$link,$k,$dish_id,$j,$dd){
	pg_prepare($link,'sqldefalutlangchoicename'.$cid.$k.$j.$dd,'SELECT * from w_extras_options_lang WHERE extras_choice_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangchoicename'.$cid.$k.$j.$dd,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['choice_name_lang'];
}

function FetchBusinessChoiceNameLangDefault($defultlang,$cid,$link,$k,$dish_id){
	//pg_prepare($link,'sqldefalutlangchoicename8','SELECT * from w_extras_options_lang WHERE extras_choice_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlangchoicename8',array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['choice_name_lang'];
}

function extra_details($set_id){
		$extra_detail=null;
 	    $extras_details=array();
	    $link = ConnectDB();
	    pg_prepare($link,'sql_options'.$set_id,'SELECT * FROM w_extras_options WHERE set_id=$1');
  		$result2 = pg_execute($link,'sql_options'.$set_id,array($set_id));
		while($row2 = pg_fetch_array($result2))
  		{
		unset($extra_detail);
		
        $extra_detail->option_id =$row2['option_id'];
        $extra_detail->option_name = $row2['option_name'];
		array_push($extras_details,$extra_detail);
		}
	return  $extras_details;
	
}
/**************************************************************/
function PlaceOrder($data,$eid){
	error_reporting(0);
	$link = ConnectDB();
	$id = -1;
	$order = json_decode($data);
	//echo $eid;

	
	if($eid!='undefined'){
	pg_prepare($link,'sqliforder',"SELECT * FROM w_orders WHERE id=$1");
	$resultfe = pg_execute($link,'sqliforder',array($eid));
	$rowor = pg_fetch_array($resultfe);
	$peid=explode("_",$rowor['parent_id']);	
	}
	pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;
	
	pg_prepare($link,'sqlbusinesstime',"SELECT * FROM w_business where id=$1");
	$res22 = pg_execute($link,'sqlbusinesstime',array($order->business[0]->id));
	$ro22 = pg_fetch_array($res22);
	
	date_default_timezone_set($ro22['timezone']);
	$date = date("Y-m-d H:i:s");
	
	$values = array($id,stringify($order),$date);	
	$recent = new stdClass();
	$recent->user = new stdClass();
	$name = explode(' ',$order->buyer->name);	
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
	else
		$recent->user->name = $name[0];

	$recent->business= new stdClass();
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));

	if (!empty($_SESSION['user']->id)){
		
		if($eid!='undefined'){
			//echo $peid[1];
			$aa = $peid[1]+1;
		$parentid=$eid."_".$aa;
		pg_prepare($link,'sqlupdateorder','UPDATE w_orders SET data=$1,date=$2,recentdata=$3,usr=$4,parent_id=$5 WHERE id=$6');
		$resultupdate = pg_execute($link,'sqlupdateorder',array(stringify($order),$date,json_encode($recent),$_SESSION['user']->id,$parentid,$eid));
		
		$session_record = new stdClass();
		$session_record = json_decode($_SESSION['whereami']);
		$session_record->address = $order->buyer->address;
		$_SESSION['whereami'] = json_encode($session_record);
		pg_prepare($link,'sqlur1','UPDATE w_users SET street=$1,tel=$2,findfrom=$3 WHERE id=$4');
		pg_execute($link,'sqlur1',array($order->buyer->address,$order->buyer->tel,$order->buyer->reference,$_SESSION['user']->id));
		
		/***********************reserve*************************/
		if($order->reservestatus){
			ReserveSection($order);
		}
		/***********************reserve*************************/	
			
		$returnvar = $eid;
		
		if($order->reservestatus == "true" && !empty($order->business[0]->dishes)){
			$returnvar .= ",RN";
		}else if(!empty($order->business[0]->dishes)){
			$returnvar .= ",N";
		}else if($order->reservestatus){
			$returnvar .= ",R";
		}
		return $returnvar;
	//}//Order placed success		
			
		}else{

		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr,scriptid) VALUES ($1,$2,$3,$4,$5,$6)';
		
		array_push($values,$_SESSION['user']->id);		
		array_push($values,$_SESSION['scriptid']);
		$session_record= new stdClass();
				$session_record->address = $order->buyer->address;
				$session_record = json_decode($_SESSION['whereami']);

		$_SESSION['whereami'] = json_encode($session_record);
		pg_prepare($link,'sqlur1','UPDATE w_users SET street=$1,tel=$2,findfrom=$3 WHERE id=$4');
		pg_execute($link,'sqlur1',array($order->buyer->address,$order->buyer->tel,$order->buyer->reference,$_SESSION['user']->id));
		
		pg_prepare($link,'sql2',$query);
		
		
	if (pg_execute($link,'sql2',$values)){
		/***********************reserve*************************/
		if($order->reservestatus){
			ReserveSection($order);
		}
		/***********************reserve*************************/	
		
		$returnvar = $id;
		
		if($order->reservestatus == "true" && !empty($order->business[0]->dishes)){
			$returnvar .= ",RN";
		}else if(!empty($order->business[0]->dishes)){
			$returnvar .= ",N";
		}else if($order->reservestatus){
			$returnvar .= ",R";
		}
		return $returnvar;
	}//Order placed success	
		
	}
	}
	
}
function PlaceOrderConfirm($id){
	//echo $id;
	$link = ConnectDB();
	$lang_resource = GetLangFileStaticProduct();	
	pg_prepare($link,'sqlorder','SELECT * from w_orders WHERE id=$1');
	$resultorder = pg_execute($link,'sqlorder',array($id));
	
	$roworder = pg_fetch_array($resultorder);
	$perid = $roworder['parent_id'];
	$order = json_decode($roworder['data']);


	pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
	$result = pg_execute($link,'sql33',array($order->buyer->city));
	if (pg_num_rows($result)==1){
		$row = pg_fetch_array($result);
		$emails = array($emails,$row['email']);
		if($order->business[0]->dishes){
			array_push($emails,$order->buyer->email);
		}
		
		if($order->reserve){
			array_push($emails,$order->reserve->email);
		}

		//fetch neighborhood from id
		if($order->buyer->colony){
			pg_prepare($link,'sqlNNN','SELECT * from w_neighborhood WHERE id=$1');
			$result_NN = pg_execute($link,'sqlNNN',array((int)$order->buyer->colony));
			if(pg_num_rows($result_NN) > 0){
				$result_rec_NN = pg_fetch_array($result_NN);
				$order->buyer->colony = $result_rec_NN['name'];
			}
		}

		//ORDER MAIL TEMPLATE INCLUDE START
		include_once "../templates/order-email-template.php";
		//ORDER MAIL TEMPLATE INCLUDE END			

		SendMailOrder($msg,$msg_pdf,$lang_resource['ORDER_MAIL_SUBJECT'] . $id,$emails,$id);
	}

	$checkfields = $order->buyer->checkoutfields;
	//if(in_array('Receive SMS', $checkfields)){
		include_once "../templates/place-order-sms.php";
			
		if ($twilio_enabled && $order->buyer->tel) {
			
			require_once('sms.php');
			// Send sms to buyer if it was enabled when ordering
			$twilioenabledclient=0;
			$twilioenabledclient=(string)$order->twilioenabledclient;
			
			
			if(($twilioenabledclient==1)) {
				$msg = $sms_resource['SMS_ORDER_SENT_CLIENT']. $id;
				try {
					sendSMS($msg,'+'.$twilio_phone,'+'.$order->buyer->tel);
				} catch (Exception $e) {
					if ($e->getMessage() == 'error_sms_panel_config') {
						//echo ',error_sms_panel_config';
					}
					//print_r($e->getMessage());
					//echo ',error_sms_to_user';
				}
			}
			// Send to business
			$msg = $sms_resource['SMS_ORDER_SENT_BUSINESS']. $id;
			try {
				sendSMS($msg,'+'.$twilio_phone,'+'.$order->business[0]->tel);
			} catch (Exception $e) {
				if ($e->getMessage() == 'error_sms_panel_config') {
					//echo ',error_sms_panel_config';
				}
				//print_r($e->getMessage());
				//echo ',error_sms_to_business';
			}
		}
	//}//Receive SMS
	//code for printer			
	$relative_printer_path = "../../orders/"; 
	include_once "printer-code.php";
	//end code for printer
	//Bringg Start
	$link = ConnectDB();
	pg_prepare($link,'sqlbringpermissionbr','SELECT * from w_business WHERE id=$1');
	$resbr = pg_execute($link,'sqlbringpermissionbr',array($order->business[0]->id));
	$rowbr = pg_fetch_array($resbr);

	$permission = 'BRING_PERMISSION';
	pg_prepare($link,'sqlbringpermission','SELECT * from w_configs WHERE name=$1');
	$res1 = pg_execute($link,'sqlbringpermission',array($permission));
	$rows = pg_fetch_array($res1);

	$permission2 = 'BRINGG_PERMISSION_EACH_RESTAURANT';
	pg_prepare($link,'sqlbringpermissioneachRestaurant','SELECT * from w_configs WHERE name=$1');
	$res2 = pg_execute($link,'sqlbringpermissioneachRestaurant',array($permission2));
	$rowsnew = pg_fetch_array($res2);

	if($rows['value']==1 && $rowsnew['value']==1 && is_null($rowbr['bringgcompanyid'])!=true && $rowbr['bringpermission']==1){
		include_once "../templates/bringg-task-template.php";
	}else if($rows['value']==1 && ($rowbr['bringpermission']==0 ||  $rowbr['bringpermission']==1)){
		include_once "../templates/bringg-task-template_default.php";
	}
	//Bringg End	


	

}
function SendMailOrder($msg,$msg_pdf,$subject,$addresses,$id){
	
	//Fetch from email here
	$row = FetchAllsettingsCustomMailchmp();
	//end fetch
	
	$link = ConnectDB();
	$permission = 'PDF_ATTACHMENT_PERMISSION';
	pg_prepare($link,'sqlpdfpermission','SELECT * from w_configs WHERE name=$1');
	$resp = pg_execute($link,'sqlpdfpermission',array($permission));
	$rowsp = pg_fetch_array($resp);
	if($rowsp['value']==1){
		//pdf attachment start
		
		include("../../panel/payment-gateway/pdf/dompdf_config.inc.php");
		$dompdf = new DOMPDF();

		$dompdf->load_html($msg_pdf);
		$dompdf->render();
		$dompdf->set_paper("A4","portrait");
		$date=date("Y-m-d H:i:s");
		$file_name=$fetch->invo;
		$pdf = $dompdf->output();
		file_put_contents("../../panel/order_pdf/order.pdf", $pdf);
		//pdf attachment ends
	}
	


////////////////// FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	pg_prepare($link,'sqlmand1','SELECT * from w_configs WHERE name=$1');
	$resp1 = pg_execute($link,'sqlmand1',array('mandrillsettings'));
	$rowsp1 = pg_fetch_array($resp1);
	
	pg_prepare($link,'sqlmand2','SELECT * from w_configs WHERE name=$1');
	$resp2 = pg_execute($link,'sqlmand2',array('mandrillhost'));
	$rowsp2 = pg_fetch_array($resp2);
	
	pg_prepare($link,'sqlmand3','SELECT * from w_configs WHERE name=$1');
	$resp3 = pg_execute($link,'sqlmand3',array('mandrill_port'));
	$rowsp3 = pg_fetch_array($resp3);
	
	pg_prepare($link,'sqlmand4','SELECT * from w_configs WHERE name=$1');
	$resp4 = pg_execute($link,'sqlmand4',array('mandrillsmtp'));
	$rowsp4 = pg_fetch_array($resp4);
	
	pg_prepare($link,'sqlmand5','SELECT * from w_configs WHERE name=$1');
	$resp5 = pg_execute($link,'sqlmand5',array('mandrillmtp'));
	$rowsp5 = pg_fetch_array($resp5);

//////////////////END FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	
	if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
	{
		include_once "lib/swift_required.php";
				
				foreach ($addresses as $address) {
				$mailer[$address]=$address;
				}

				$subject = $subject;
				$from = array($row['email_from'] =>$row['sitename']);
				$to = $mailer;
				
				$text = "Order";
				$html = $msg;
				
				$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
				$transport->setUsername($rowsp4['value']);
				$transport->setPassword($rowsp5['value']);
				$swift = Swift_Mailer::newInstance($transport);
				
				$message = new Swift_Message($subject);
				if($rowsp['value']==1){
				$message->attach(Swift_Attachment::fromPath('../order_pdf/order.pdf'));
				}
				$message->setFrom($from);
				$message->setBody($html, 'text/html');
				$message->setTo($to);
				$message->addPart($text, 'text/plain');
				
				if ($recipients = $swift->send($message, $failures))
				{
				 //echo 'Message successfully sent!';
				 $success = 1;
				} else {
				 //echo "There was an error:\n";
				 //print_r($failures);
				 $success = 1;
				}
	}
	else{
	require "phpmailer/PHPMailerAutoload.php";
	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = $row['sitename'];
    $mail->Subject =  $subject;
    foreach ($addresses as $address)
    	$mail->AddAddress($address);
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
	if($rowsp['value']==1){
	$mail->AddAttachment("../../panel/order_pdf/order.pdf",$id."_order.pdf");
	}
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();

	/*echo "*****success*****";
	echo $success;
	echo "*****end success*****";*/

 	$try = 1;

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
   		{
	   	sleep(5);
     	$success = $mail->Send();
     	$try++;
   		}

   	$mail->ClearAddresses();
}
   	if(!$success)
		return true;
		else
		return true;
	}
	
	function FetchAllsettingsCustomMailchmp()
       {
		   $test = require('../config.php');

       $link = ConnectDB($CFG);
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
function GetConfigFromPanel($configs) {
	  require('./../config.php');
	  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  	$link = pg_connect($string);

	  if(!$link){
		  return '[]';
    }
	  $conditional = ' WHERE ';
	  $count = 0;
	  foreach($configs as $config) {
		  if ($count==0) {
			  $conditional .= 'name=$' . ($count+1);
      }
			else {
			  $conditional .= ' OR name=$' . ($count+1);
      }
		  $count++;
		}
		 pg_query($link, "DEALLOCATE ALL");
	  pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	  $result = pg_execute($link,'sql',$configs);
	  $configs = array();
	  while($row = pg_fetch_array($result)) {
		  unset($config);
		  $config->name = $row['name'];
		  $config->value = $row['value'];
		  array_push($configs,$config);
		}
	  pg_close($link);
	  return json_encode($configs);
  }
  
  
  
  function PlaceOrderbefore($data) {

	$link = ConnectDB();
	$id = -1;
	$order = parse($data);

	
	pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	$values = array($id,stringify($order),'now()');
	unset($recent);
	unset($recent->user);
	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];

	unset($recent->business);
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));

	session_start();
	session_write_close();

	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr,scriptid) VALUES ($1,$2,$3,$4,$5,$6)';
		array_push($values,$_SESSION['user']->id);
		array_push($values,$_SESSION['scriptid']);
		pg_prepare($link,'sqlur3','UPDATE w_users SET street=$1,colony=$2,tel=$3 WHERE id=$4');
		pg_execute($link,'sqlur3',array($order->buyer->address,$order->buyer->colony,$order->buyer->tel,$_SESSION['user']->id));
		}
		else
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,scriptid) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$_SESSION['scriptid']);

		}
		 pg_prepare($link,'sql2',$query);
	   	 pg_execute($link,'sql2',$values);
		 
		 echo $id;

	}
	
function fetchproductdeliveryactionformenu($data,$menuid){
		$defaultlang = defaultlanguage();
		$link = ConnectDB();
		$menudish = array();
		$extra_option= array();
		$menudishid = array();
		
		
		pg_prepare($link,'sqldish258',"SELECT * FROM w_dishes where business=$1");
		$resultdish = pg_execute($link,'sqldish258',array($data));
				$dd=0;
				while($rowdish = pg_fetch_array($resultdish)){
					
					unset($dish);
					  $dish->id = $rowdish['id'];
					  $defaultlang;
					$link = ConnectDB();
					pg_prepare($link,'sqllang085'.$dish->id,"SELECT * FROM w_dishes_lang where dishes_id=$1 and lang_id=$2");
					$resultlang = pg_execute($link,'sqllang085'.$dish->id,array($dish->id,$defaultlang));
					while($rowlang = pg_fetch_array($resultlang)){
						$dish->name = $rowlang['name_lang'];					
					}
					
					$dish->business = $data;
					$dish->description = $rowdish['description'];
					$dish->price = $rowdish['price'];
					
					$business_id = $rowdish['business'];
					pg_prepare($link,'sqlcurrency74'.$business_id.$rowdish['id'],"SELECT * FROM w_business where id=$1");
					$resultdish1 = pg_execute($link,'sqlcurrency74'.$business_id.$rowdish['id'],array($business_id));
					$rowdish1 = pg_fetch_array($resultdish1);
					
					$currency = $rowdish1['currency'];
					$dish->currency = currency_symbolAd($currency);
					
					$dish->enabled = $rowdish['enabled'];
					//$dish->extras = $rowdish['extras'];
					$dish->ingredients = $rowdish['ingredients'];
					$dish->isimg = $rowdish['isimg'];
					$dish->isimg2 = $rowdish['isimg2'];
					$dish->isimg3 = $rowdish['isimg3'];
					$exdish = parse($rowdish['extras']);
					if(empty($rowdish['extras'])){
						$dish->extras = $rowdish['extras'];						
					}else{
						pg_prepare($link,'sqlextrasss'.$rowdish['id'],'SELECT * FROM w_extras WHERE id=$1 and enabled=$2');	
																
						foreach($exdish as $ext_id){
							$resultsext = pg_execute($link,'sqlextrasss'.$rowdish['id'],array($ext_id,'TRUE'));
							$rowext = pg_num_rows($resultsext);
							if($rowext>0){
								$dish->extras = $rowdish['extras'];
								$getallsets = GetAllSets1($dish->extras,$dish->id,$dd);//GetAllSets($dish->extras,$dish->id);

								$dish->extra_option = $getallsets;						
							}
						}
					}
					$dd++;
					$link = ConnectDB();
					
					if($deliac == 'pickup'){
					
					pg_prepare($link,'sqldishmenu78'.$rowdish['id'].$dd,"SELECT * FROM w_menus where business=$1 AND id=$2 AND enabled=$3");
					$resultmenu = pg_execute($link,'sqldishmenu78'.$rowdish['id'].$dd,array($data,$menuid,'TRUE'));
					}else{
					
					pg_prepare($link,'sqldishmenu78'.$rowdish['id'].$dd,"SELECT * FROM w_menus where business=$1 AND id=$2 AND enabled=$3");
					$resultmenu = pg_execute($link,'sqldishmenu78'.$rowdish['id'].$dd,array($data,$menuid,'TRUE'));	
					}
					while($rowmenu = pg_fetch_array($resultmenu)){
						
						$rdish = parse($rowmenu['dishes']);
						if (in_array($rowdish['id'], $rdish)){
							$dish->menuid = $rowmenu['id'];
							$dish->menuname = $rowmenu['name'];
							$dish->days = $rowmenu['days'];
							$schedule = parse($rowmenu['schedule']);
							$dish->openhour = $schedule->opens->hour;
							$dish->closehour = $schedule->closes->hour;
							$dish->openmin= $schedule->opens->minute;
							$dish->closemin = $schedule->closes->minute;							
							if(in_array($rowdish['id'], $menudishid) !=1){
								array_push($menudish,$dish);
								array_push($menudishid,$rowdish['id']);
							}
								
						}
					}
	
					
				
				
	
			}
			
			//print_r($menudish);
		echo json_encode($menudish);
	
	}
	
function fetchproductdeliveryaction($data,$deliac)
	{
		$defaultlang = defaultlanguage();
		$link = ConnectDB();
		$menudish = array();
		$extra_option= array();
		$menudishid = array();
		$menucatelog = array();
		$dishmenu = array();
		
		$menucata = array();
		$menucatid = array();
		
		pg_prepare($link,'sqldish258',"SELECT * FROM w_dishes where business=$1 and enabled=$2");
		$resultdish = pg_execute($link,'sqldish258',array($data,'TRUE'));
				$dd=0;
				pg_prepare($link,'sqldefalutlangchoicename8','SELECT * from w_extras_options_lang WHERE extras_choice_id=$1 and lang_id=$2');
				while($rowdish = pg_fetch_array($resultdish)){
					
					//unset($dish);
					$dish = new stdClass();
					  $dish->id = $rowdish['id'];
					  $defaultlang;
					$link = ConnectDB();
					pg_prepare($link,'sqllang085'.$dish->id,"SELECT * FROM w_dishes_lang where dishes_id=$1 and lang_id=$2");
					$resultlang = pg_execute($link,'sqllang085'.$dish->id,array($dish->id,$defaultlang));
					while($rowlang = pg_fetch_array($resultlang)){
						$dish->name = $rowlang['name_lang'];					
					}
					
					$dish->business = $data;
					$dish->description = $rowdish['description'];
					$dish->price = $rowdish['price'];
					
					$business_id = $rowdish['business'];
					pg_prepare($link,'sqlcurrency74'.$business_id.$rowdish['id'],"SELECT * FROM w_business where id=$1");
					$resultdish1 = pg_execute($link,'sqlcurrency74'.$business_id.$rowdish['id'],array($business_id));
					$rowdish1 = pg_fetch_array($resultdish1);
					
					$currency = $rowdish1['currency'];
					$dish->currency = currency_symbolAd($currency);
					
					$dish->enabled = $rowdish['enabled'];
					$dish->extras = $rowdish['extras'];
					$dish->ingredients = $rowdish['ingredients'];
					$dish->isimg = $rowdish['isimg'];
					$dish->isimg2 = $rowdish['isimg2'];
					$dish->isimg3 = $rowdish['isimg3'];
					$exdish = parse($rowdish['extras']);
					if(!empty($rowdish['extras'])){					
						
						$getallsets =  GetAllSets1($dish->extras,$dish->id,$dd);//GetAllSets($dish->extras,$dish->id);
						$dish->extra_option = $getallsets;				
					
					}
					$dd++;
					$link = ConnectDB();
					
					if($deliac == 'pickup'){
					
					pg_prepare($link,'sqldishmenu78'.$rowdish['id'].$dd,"SELECT * FROM w_menus where business=$1 AND pickup=$2 AND enabled=$3");
					$resultmenu = pg_execute($link,'sqldishmenu78'.$rowdish['id'].$dd,array($data,'TRUE','TRUE'));
					}else{
					
					pg_prepare($link,'sqldishmenu78'.$rowdish['id'].$dd,"SELECT * FROM w_menus where business=$1 AND delivery=$2 AND enabled=$3");
					$resultmenu = pg_execute($link,'sqldishmenu78'.$rowdish['id'].$dd,array($data,'TRUE','TRUE'));	
					}
					while($rowmenu = pg_fetch_array($resultmenu)){
						
						$rdish = parse($rowmenu['dishes']);
						
							
							
							//$dish->dishmenucat = $menucata;
						if (in_array($rowdish['id'], $rdish)){
							$schedule = parse($rowmenu['schedule']);
							$dish->menuid = $rowmenu['id'];
							$dish->menuname = $rowmenu['name'];							
							$dish->days = $rowmenu['days'];
							
							$dish->openhour = $schedule->opens->hour;
							$dish->closehour = $schedule->closes->hour;
							$dish->openmin= $schedule->opens->minute;
							$dish->closemin = $schedule->closes->minute;														
							if(in_array($rowdish['id'], $menudishid) !=1){							
								if(!empty($rowdish['extras']) && $dish->extra_option !=null){
								array_push($menudish,$dish);
								array_push($menudishid,$rowdish['id']);
								}else if(empty($rowdish['extras'])){
								array_push($menudish,$dish);
								array_push($menudishid,$rowdish['id']);	
								}
							}
								
						}
						
						
						
					}	
					
	
			}
			//print_r($menudish);
			
			foreach($menudish as $key=>$value){
				//unset($dishm);
				$dishm = new stdClass();
				$dishm->menuid=$value->menuid;
				$dishm->menuname=$value->menuname;
				$dishm->days = $value->days;
				$dishm->openhour = $value->openhour;
				$dishm->closehour = $value->closehour;
				$dishm->openmin = $value->openmin;
				$dishm->closemin = $value->closemin;		

						
				if(!in_array($dishm->menuid,$menucatid)){					
					array_push($menucatid, $dishm->menuid);	
					array_push($menucata, $dishm);				
				}
				
					
			}
			//print_r($menucatid);
			//print_r($menucata);
			
			$finalmenu =array();
			$finalmenu['menudish'] = $menudish;
			$finalmenu['menucatalog'] = $menucata;
			
		echo json_encode($finalmenu);
	
	}	
	
	
	
	
function currency_symbolAd($sitecurrency){
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
	if($sitecurrency == 'JOD'){
	return 'JOD';			
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
	}if($sitecurrency == 'MDL'){
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
function FetchAllBusinessDeliveryLocation($locations,$alldata,$bid) {
		
		
		
	         $link = ConnectDB();
			 //print_r($alldata);
			 $location=parse($locations);
			 $alldata=parse($alldata);
			//print_r($location);
			//print_r($alldata);
			
			
			// $location= json_decode($loc_array);

			 $conditionalsvalues = array();
	         $query = 'SELECT * from w_business WHERE id=$1';

			 pg_prepare($link,'sqlf2',$query);
	         $result = pg_execute($link,'sqlf2',array($bid));
			
			 $zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
	         pg_prepare($link,'sqlz3',$zipquery);
			 //Settings to select miles or km 	
			$sqldformat = "SELECT * from w_configs WHERE  name='distanceformat'";
			pg_prepare($link,'sqldformat',$sqldformat);
			$resultdformat = pg_execute($link,'sqldformat',array());
			$rowdformat = pg_fetch_array($resultdformat);
			$distanceformat=$rowdformat["value"];
			
			 $allbusiness = array();

			    /*****************************************zone km wise************************************************************/
					 $querys = 'SELECT * from w_deliverykm WHERE enabled=true';
					  pg_prepare($link,'sqldz4',$querys);
					  $kmwiseSql = pg_execute($link,'sqldz4',array());
					  $count = pg_num_rows($kmwiseSql);

					  $AlllocationAreaInKm = array();


					  while($dis = pg_fetch_array($kmwiseSql))
							 {
							 $kmArea = new stdClass();
							 //unset($kmArea);
							 $kmArea->business = $dis['business'];
							 $kmArea->servearea = $dis['servearea'];
							 $kmArea->maxallow = $dis['maxallow'];
							 array_push($AlllocationAreaInKm,$kmArea);
							 }

							// print_r($AlllocationAreaInKm);
					/*****************************************zone km wise************************************************************/
	while($row = pg_fetch_array($result))
		{
		//unset($business);
		$business = new stdClass();
	     $ziprecord = pg_execute($link,'sqlz3',array($row['id'],'TRUE'));
		 $business->ziprecord = pg_num_rows($ziprecord);
		 $blocation = parse($row['location']);
		$business->id = $row['id'];
		$business->zones = $row['zones'];
		$business->minimum =$row['minimum'];
	    $business->location = $row['location'];
		 $business->schedule = $row['schedule'];
		 //Settings to select miles or km 
		$business->distanceformat = $distanceformat;
		
		
		$distance = distanceCalculator($location->latitud,$location->longitud,$blocation->latitud,$blocation->longitud, $distanceformat);
		$business->distance = $distance;
		
		

		
		$business->DeliveryStatus = checkDeliveryStatus($row['id'],$link);
		$business->PickupStatus = checkPickupStatus($row['id'],$link);




		array_push($allbusiness,$business);
		}
		
		        pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
				$result = pg_execute($link,'sqlw',array('panelsetting'));
				$row = pg_fetch_array($result);
			    $panelsetting = $row['value'];
				
				
				include('front_search_panel.php');
				
			  if( isset($alldata->delivery_neighborhoodStaus) && $alldata->delivery_neighborhoodStaus == 1) {
			
			
			    $newbusiness = frontserachneighborhood($locations,$allbusiness,$link,$alldata);
				
		     	
				
				
					      				if(count($newbusiness) == 0){
												
												unset($business);
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
										} else {
											
											unset($newbusiness->location);
											}
				
			    echo  json_encode($newbusiness);
				
				exit;
			
						}
				
				
				if( $panelsetting == 2) {
		
					
					$newbusiness = frontserachpanelnew($locations,$allbusiness,$link,$deliveryType="delivery",$alldata);
					
					      				if(count($newbusiness) == 0){
												
												//unset($business);
												$business = new stdClass();
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
										}
					
					
					echo json_encode($newbusiness);
					
					
				} else { 
				
					  $newbusiness = array();
		              foreach($allbusiness as $business)
						{
							
						$searchzip = getSearchPostcodemain($location->latitud,$location->longitud);
						$zones = parse($business->zones);
						 $deliveyPrice[$busid] = -1;
						 $businessopen[$busid] = false;
		/*********************************delivery zone wise select search****************************************************/
						if (PointInArea($location->latitud,$location->longitud,$zones->zone1->coordinates))
							{
							//remove unnecesary fields and add him as visible to the user
							 $deliveyPrice[$busid] = $zones->zone1->price;
							$business->shipping = $zones->zone1->price;
							$business->searchtype = "delivery";
							$businessopen[$busid] = true;
							unset($business->zones);
							//unset($business->location);
							unset($business->enabled);
							array_push($newbusiness,$business);
							}
						else if (PointInArea($location->latitud,$location->longitud,$zones->zone2->coordinates))
								{
								//remove unnecesary fields and add him as visible to the user
								 $deliveyPrice[$busid] = $zones->zone2->price;
								$business->shipping = $zones->zone2->price;
								$businessopen[$busid] = true;
								$business->searchtype = "delivery";
								unset($business->zones);
								//unset($business->location);
								unset($business->enabled);
								array_push($newbusiness,$business);
								}
						else if (PointInArea($location->latitud,$location->longitud,$zones->zone3->coordinates))
									{
									//remove unnecesary fields and add him as visible to the user
									 $deliveyPrice[$busid] = $zones->zone3->price;
									$business->shipping = $zones->zone3->price;
									$businessopen[$busid] = true;
									$business->searchtype = "delivery";
									unset($business->zones);
									//unset($business->location);
									unset($business->enabled);
									array_push($newbusiness,$business);
									}
							else if($business->ziprecord>0)
									{
									 $zipfetch = pg_execute($link,'sqlz3',array($business->id,'TRUE'));

										 while($record = pg_fetch_array($zipfetch))
										 {
											if($searchzip == $record['zipcode'] )
											{
												 $deliveyPrice[$busid] = GetDecimalPoint($record['cost']);
												$business->shipping = GetDecimalPoint($record['cost']);
												$business->searchtype = "delivery";
												$businessopen[$busid] = true;
												unset($business->zones);
												//unset($business->location);

												array_push($newbusiness,$business);
												break;
											}
										  }

								   }

								/* **************************new section ************************************  */
							foreach($AlllocationAreaInKm as $kmzone)  {

										if(in_array("-1",parse($kmzone->business)) || in_array($business->id,parse($kmzone->business)) ) {

											//remove unnecesary fields and add him as visible to the user
											$delDetails = approvdeliveryArea_main($kmzone->servearea,$business->distance,$kmzone->maxallow);

										//print_r($delDetails);
											if($delDetails->accept == true) {

											if($deliveyPrice[$busid]<=$delDetails->delprice)
												{
											$deliveyPrice[$busid] = GetDecimalPoint($delDetails->delprice);
											$business->shipping = GetDecimalPoint($delDetails->delprice);
											$business->searchtype = "delivery";
											$businessopen[$busid] = true;
											$business->minimum = $delDetails->maxallow;
											 unset($business->zones);
											//unset($business->location);
											unset($business->enabled);
												}

											if($deliveyPrice[$busid] ==  -1) {
											array_push($newbusiness,$business);
											}
											break;
											   }
											}

							 }
				 /* **************************new section ************************************  */

	if($deliveyPrice[$busid] ==  -1) {
		
		$AlllocationArea = array();
		$querys = 'SELECT * from w_deliveryzone WHERE enabled=true';
		  pg_prepare($link,'sqldzp2',$querys);
		  $results = pg_execute($link,'sqldzp2',array());
		  $count = pg_num_rows($results);
		   $now = strtotime(GetTimeByZone($_SESSION['timezone']));
		   $dayss = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		   $todayidd = $dayss->{date("D",strtotime(date('d-m-Y')))};
		  while($loc = pg_fetch_array($results))
						 {
						 unset($locationArea);
						 $locationArea->id = $loc['id'];
						 $locationArea->position = $loc['location'];
						 $locationArea->business = $loc['business'];
						 $locationArea->deliveryprice = $loc['deliveryprice'];
						 $locationArea->minpurchase = $loc['minpurchase'];
						 $locationArea->schedule = $loc['schedule'];
						 $locationArea->days = $loc['days'];
						 array_push($AlllocationArea,$locationArea);
			 }
		
					 /* **************************Extra Delivery area************************************  */				 
            foreach($AlllocationArea as $locacus)  {
					
					
		if($locacus->business !="") {
							
		  if(in_array("-1",parse($locacus->business)) || in_array($business->id,parse($locacus->business)) ) {
							   
			  if (PointInArea($location->latitud,$location->longitud,parse($locacus->position)))   {
					
				 	
				$schedules = parse($locacus->schedule);
				$deliverydays = parse($locacus->days);
				$recordHis[$business->id] = 0;
				foreach ($deliverydays as $day)
				{
								
				if ($day==$todayidd || $day=='0')//day 0 its the "all" days flag
				{
							
				$recordHis[$business->id] = 1;				
				$schedules = parse($locacus->schedule);
				
				
									
				if ($now>=strtotime($schedules->opens->hour.':'.$schedules->opens->minute)) 
				{ //menu opened now check if its not closed
					
					if ($now<strtotime($schedules->closes->hour.':'.$schedules->closes->minute))//ok
						{
						    $businessopen[$busid]  =true;
							
							break;
						}
						else{
							$businessopen[$busid]  =false;
							break;
							//false
							}	
				}
				  else {
					$businessopen[$busid]  =false;
					 break;
						//false
					 
					 }
								}
						
					
					}
			if($recordHis[$business->id] == 0) {
				//false
				 $businessopen[$busid]  =false;
					 break;
			
			}	
					 
								
								if($businessopen[$busid] = true ) {
								$deliveyPrice[$busid] =$locacus->deliveryprice;
								$business->shipping = $locacus->deliveryprice;
								$business->minimum = $locacus->minpurchase;
								$business->searchtype = "delivery";
								unset($business->zones);
								//unset($business->location);
								unset($business->enabled);
								array_push($newbusiness,$business);
								break;
								}
							}
						}
				 }	
			}
			/* **************************Extra Delivery area************************************  */		
				if($businessopen[$busid] == false ) {
						                       unset($business->zones);
							                    $business->shipping = "pending";

												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
				}
						        }
					 }
						if(!$newbusiness){
							 unset($business->zones);
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
						}

                     echo json_encode($newbusiness);

				}
		
		}
 function approvdeliveryArea_main($servicearea,$distance,$maxallow ) {

	//echo $servicearea;
	$i=0;
	$servicearea = json_decode($servicearea);
	//print_r($servicearea);
	foreach($servicearea as $service) {
        unset($area);
		//unset($final);
		$final = new stdClass();
		$area = parse($service->area);
		//print_r($area);
		$f = $area->from;
		$t = $area->to;
		//echo $distance = floatval($distance);
		$p = $area->price;
		if($i == 0) {
		if($distance>=$f && $distance<=$t)
				{
					
					$final->accept = true;
					$final->delprice = $p;
					$final->maxallow = $maxallow;
					return $final;

				}
		}
		else {
				if($distance>=$f && $distance<=$t)
				{


					$final->accept = true;
					$final->delprice = $p;
					$final->maxallow = $maxallow;
					return $final;

				}


			}

		$i++;
   }
}
function distanceCalculator($lat1, $lon1, $lat2, $lon2, $unit) {

  $theta = $lon1 - $lon2;
  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
  $dist = acos($dist);
  $dist = rad2deg($dist);
  $miles = $dist * 60 * 1.1515;
  $unit = strtoupper($unit);

  if ($unit == "K") {
    return ($miles * 1.609344);
  } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
        return $miles;
      }
}
 function getSearchPostcodemain($lat,$lng) {

		/*$loc=parse($location);
		$loc = parse($loc);
		$lat = $loc->latitud;
		$lng = $loc->longitud;
		*/

  $returnValue = NULL;
  $ch = curl_init();
  $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $result = curl_exec($ch);
  $json = json_decode($result, TRUE);

  if (isset($json['results'])) {
     foreach    ($json['results'] as $result) {
        foreach ($result['address_components'] as $address_component) {
          $types = $address_component['types'];
          if (in_array('postal_code', $types) && sizeof($types) == 1) {
             $returnValue = $address_component['short_name'];
          }
    }
     }
  }
  return $returnValue;
}
function PointInArea($PointLatitud,$PointLongitud,$AreaPoints)
		{
		$j = 0;
      	$InArea = false;
	  	$x = floatval($PointLongitud);
	  	$y = floatval($PointLatitud);
	  	$pcount = count($AreaPoints);
	  	for ($i=0;$i<$pcount;$i++)
			{
	       	$j++;
	        if ($j==$pcount)
				$j = 0;

	  		if (((floatval($AreaPoints[$i]->latitud) < $y) && (floatval($AreaPoints[$j]->latitud) >= $y)) || ((floatval($AreaPoints[$j]->latitud) < $y) && (floatval($AreaPoints[$i]->latitud) >= $y)))
				{
	        	if (floatval($AreaPoints[$i]->longitud) + ($y - floatval($AreaPoints[$i]->latitud))/(floatval($AreaPoints[$j]->latitud)-floatval($AreaPoints[$i]->latitud))*(floatval($AreaPoints[$j]->longitud) - floatval($AreaPoints[$i]->longitud))<$x)
					{
	              	$InArea = !$InArea;
	            	}
	          	}
	        }
		return $InArea;
	    }
		function checkDeliveryStatus($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1 and enabled=$2"; 
                pg_prepare($link,'sqlb111'.$bid,$bquery);
                $results = pg_execute($link,'sqlb111'.$bid,array($bid,'TRUE'));
				$status = new stdClass();
				$status->delivery = "false";
				
				while($rs = pg_fetch_array($results)) {
					if($rs['delivery'] == "t") {
					return $status->delivery = "true";
					exit;
					}
					
					
				}
				return $status->delivery;
				
	}
	function checkPickupStatus($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1 and enabled=$2"; 
                pg_prepare($link,'sqlb2'.$bid,$bquery);
                $results = pg_execute($link,'sqlb2'.$bid,array($bid,'TRUE'));
				$status = new stdClass();
				$status->pickup = "false";
				while($rs = pg_fetch_array($results)) {
					if($rs['pickup'] == "t") {
					return $status->pickup = "true";
					exit;
					}
					
					
				}
				return $status->pickup;
		
	}
	function GetTimeByZone($zone,$format = 'empty')
	{
	$now = time();
	date_default_timezone_set($zone);
	if ($format=='24')
		return date('h:i A',$now);
		else
		return date('G:i',$now);
	}
