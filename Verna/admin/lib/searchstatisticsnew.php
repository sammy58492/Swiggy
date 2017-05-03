<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

require "class.phpmailer.php";


define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f'])
	{
	case 'FetchAllData':
		FetchAllData($_POST['filters']);
	break;
	case 'FetchAllSearchStatisticWeeklyData':
		FetchAllSearchStatisticWeeklyData($_POST['filters']);
	break;
	case 'FetchAllSearchStatisticMonthlyData':
		FetchAllSearchStatisticMonthlyData($_POST['filters']);
	break;
	case 'FetchAllSearchStatisticYearlyData':
		FetchAllSearchStatisticYearlyData($_POST['filters']);
	break;
	default:
		die();
	break;
	}



/*******************************************GET ORDERS DATA**********************************************/


function FetchAllData($filters)
	{
	$lang_resource = GetLangFile();
	$link = ConnectDB();
	//SuperAdminsOnly();
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}	

	$conditionalsvalues = array();
	$query = 'SELECT * FROM w_search_statistic  WHERE DATE(date) = DATE(NOW()) ORDER BY date desc';

	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	$ads = array();
	$arr_resturant = array();	
	$arr_categories = array();
	pg_prepare($link,'sqlcn125',"SELECT * FROM w_franchises where id=$1");
	if(pg_num_rows($result)>0){
		//echo"22222";
	$sk = 0;
	//echo pg_num_rows($result);
	pg_prepare($link,'sqlsecity','SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	while($row = pg_fetch_array($result)){

		//unset($ad);
		unset($city);
		
		$adw = new stdClass();
		$adw->cat = array();
		
		
		$ad = new stdClass();
		$ad->id = " ";		
		
		/******************************** fetch city name **********************************/

		$res9 = pg_execute($link,'sqlcn125',array($row['city']));
		$rowcity = pg_fetch_array($res9);
		$ad->city = FetchStacityLangDefault($defultlang,$rowcity['id'],$link,$sk);
		/*******************************end******************/

		/******************************** fetch resturant name **********************************/
		$resturant = json_decode($row['resturant']);
		$resturant[0];
		if($resturant[0]=='-1'){
			$ad->resturant = strtoupper($lang_resource['ADMIN_PANEL_ALL_RESTURANT']);
		}else{
			foreach ($resturant as $key=>$value) {
				pg_prepare($link,'sqlresturant'.$key.$row['id'],"SELECT * FROM w_business where id=$1");
				$res9 = pg_execute($link,'sqlresturant'.$key.$row['id'],array($value));	
				$rows = pg_fetch_array($res9);	
				$bname = FetchStabusinessLangDefault($defultlang,$value,$link,$sk);
				array_push($arr_resturant,$bname);
			}
			$ad->resturant = strtoupper(implode(",",$arr_resturant));
			$arr_resturant = array();
		}
		/*******************************end******************/

		/******************************** fetch category name **********************************/
		$categories = json_decode($row['categories']);
		if($categories[0]=='-1'){
		$ad->categories = strtoupper($lang_resource['ADMIN_PANEL_ALL_CATEGORIES']);

		}else{
		foreach ($categories as $key=>$value) {
		pg_prepare($link,'sqlcategories'.$key.$row['id'],"SELECT * FROM w_categories where id=$1");
		$res9 = pg_execute($link,'sqlcategories'.$key.$row['id'],array($value));	
		$rowcity = pg_fetch_array($res9);	
		$bcate = FetchStacateLangDefault($defultlang,$rowcity['id'],$link,$sk);
		array_push($arr_categories,$bcate);
		}
		$ad->categories = strtoupper(implode(",",$arr_categories));
		$arr_categories = array();
		}
		/*******************************end******************/


		$ad->confirm_order = $row['confirm_order'];
		$ad->country = $row['country'];
		$ad->address = strtoupper($row['address']);


		$ad->date = $row['date'];
		$ad->total = $row['hit'];
		$ad->search_type = 'All';
		$ad->result = $row['result'];
		if($ad->result!='NO'){
		$ad->result = 'YES';
		}
		/******testing******/
		/*if($ad->address == '5TH AVENUE'){
			
			echo "CO:".$ad->confirm_order;
			echo "TOTAL:".$ad->total;
			echo "decimal_value".$_SESSION['decimal_value'];
		}*/
		
		
		
		
		////////////////
		$ad->conversion = (($ad->confirm_order)*100)/$ad->total;
		$ad->conversion = round($ad->conversion, $_SESSION['decimal_value']);

		array_push($ads,$ad);
		//array_push($ads,$adw);
		$sk++;
}
	$ads=json_encode($ads);
	
print_r($ads);
		
	return $ads;
	}else{
		
		
		//unset($ad);
		$ad = new stdClass();
		$ad->id = " ";	
		$ad->city = '';
		$ad->resturant = '';
		$ad->categories = '';
		$ad->confirm_order = '';
		$ad->country = '';
		$ad->address = '';
		

		$ad->date ='';
		$ad->total = '';
		$ad->search_type = '';
		$ad->result = '';
		$ad->conversion ='';
		array_push($ads,$ad);
		$ads=json_encode($ads);
		print_r($ads);
		return $ads;
		
	}

	}
	
function FetchAllSearchStatisticWeeklyData($filters){
	
	$lang_resource = GetLangFile();
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}	

	$conditionalsvalues = array();
	 $query = "SELECT * FROM w_search_statistic WHERE date > CURRENT_DATE-6 AND DATE(date) <= CURRENT_DATE ORDER BY date desc";

	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	$ads = array();
	$arr_resturant = array();	
	$arr_categories = array();
	pg_prepare($link,'sqlcn125',"SELECT * FROM w_franchises where id=$1");
		
$sk = 0;
pg_prepare($link,'sqlsecity','SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	while($row = pg_fetch_array($result))
		{
			
			 
		//unset($ad);
		unset($city);
		 $ad = new stdClass();
		//$adw->cat = array();
		$ad->id = " ";		
	
		/******************************** fetch city name **********************************/
		
		$res9 = pg_execute($link,'sqlcn125',array($row['city']));
		$rowcity = pg_fetch_array($res9);
		$ad->city = FetchStacityLangDefault($defultlang,$rowcity['id'],$link,$sk);
		/*******************************end******************/
		/******************************** fetch resturant name **********************************/
		$resturant = json_decode($row['resturant']);
		$resturant[0];
		if($resturant[0]=='-1'){
		
	 		$ad->resturant = strtoupper($lang_resource['ADMIN_PANEL_ALL_RESTURANT']);
		}else{
		
		foreach ($resturant as $key=>$value) {
			
			pg_prepare($link,'sqlresturant'.$key.$row['id'],"SELECT * FROM w_business where id=$1");
			$res9 = pg_execute($link,'sqlresturant'.$key.$row['id'],array($value));	
			$rows = pg_fetch_array($res9);	
			$bname = FetchStabusinessLangDefault($defultlang,$value,$link,$sk);
			array_push($arr_resturant,$bname);
			
		}
		
			$ad->resturant = strtoupper(implode(",",$arr_resturant));
	 	    $arr_resturant = array();
		}
		
		/*******************************end******************/
		/******************************** fetch category name **********************************/
		$categories = json_decode($row['categories']);
		if($categories[0]=='-1'){
			$ad->categories = strtoupper($lang_resource['ADMIN_PANEL_ALL_CATEGORIES']);
		
		}else{
		foreach ($categories as $key=>$value) {
			pg_prepare($link,'sqlcategories'.$key.$row['id'],"SELECT * FROM w_categories where id=$1");
			$res9 = pg_execute($link,'sqlcategories'.$key.$row['id'],array($value));	
			$rowcity = pg_fetch_array($res9);	
			$bcate = FetchStacateLangDefault($defultlang,$rowcity['id'],$link,$sk);
			array_push($arr_categories,$bcate);
		}
		$ad->categories = strtoupper(implode(",",$arr_categories));
		$arr_categories = array();
		}
		/*******************************end******************/
		
			
		$ad->confirm_order = $row['confirm_order'];
		$ad->country = $row['country'];
		$ad->address = strtoupper($row['address']);
		

		$ad->date = $row['date'];
		 $ad->total = $row['hit'];
		$ad->search_type = 'Weekly';
		$ad->result = $row['result'];
		if($ad->result!='NO'){
			$ad->result = 'YES';
		}
		 $ad->conversion = (($ad->confirm_order)*100)/$ad->total;
		$ad->conversion = round($ad->conversion,$_SESSION['decimal_value']);
	
		array_push($ads,$ad);
	//	array_push($ads,$adw);
	$sk++;
		}
	$ads=json_encode($ads);
	
print_r($ads);
		
	return $ads;
	

	
	}
	
function FetchStacityLangDefault($defultlang,$cid,$link,$sk){
	//pg_prepare($link,'sqlsecity'.$cid.$sk,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqlsecity',array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['city_lang'];
}

function FetchStabusinessLangDefault($defultlang,$cid,$link,$sk){
	pg_prepare($link,'sqlsebusiness'.$cid.$sk,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqlsebusiness'.$cid.$sk,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}	
function FetchStacateLangDefault($defultlang,$cid,$link,$sk){
	pg_prepare($link,'sqlsecate'.$cid.$sk,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqlsecate'.$cid.$sk,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}	
	
	
	
	
function FetchAllSearchStatisticMonthlyData($filters){
	
	
	$lang_resource = GetLangFile();
	//SuperAdminsOnly();
	$link = ConnectDB();
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}		

	$conditionalsvalues = array();
	 $query = "SELECT * FROM w_search_statistic WHERE date > CURRENT_DATE-30 AND DATE(date) <= CURRENT_DATE ORDER BY date desc";

	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	$ads = array();
	$arr_resturant = array();	
	$arr_categories = array();
	pg_prepare($link,'sqlcn125',"SELECT * FROM w_franchises where id=$1");
		
$sk = 0;
pg_prepare($link,'sqlsecity','SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	while($row = pg_fetch_array($result))
		{
	//	unset($ad);
		unset($city);
		
		 $ad = new stdClass();
		//$adw->cat = array();
		$ad->id = " ";		
	
		/******************************** fetch city name **********************************/
		
		$res9 = pg_execute($link,'sqlcn125',array($row['city']));
		$rowcity = pg_fetch_array($res9);
		$ad->city = FetchStacityLangDefault($defultlang,$rowcity['id'],$link,$sk);
		/*******************************end******************/
		/******************************** fetch resturant name **********************************/
		$resturant = json_decode($row['resturant']);
		$resturant[0];
		if($resturant[0]=='-1'){
		
	 		$ad->resturant = strtoupper($lang_resource['ADMIN_PANEL_ALL_RESTURANT']);
		}else{
		
		foreach ($resturant as $key=>$value) {
			
			pg_prepare($link,'sqlresturant'.$key.$row['id'],"SELECT * FROM w_business where id=$1");
			$res9 = pg_execute($link,'sqlresturant'.$key.$row['id'],array($value));	
			$rows = pg_fetch_array($res9);	
			$bname = FetchStabusinessLangDefault($defultlang,$value,$link,$sk);
			array_push($arr_resturant,$bname);
			
		}
		
			$ad->resturant = strtoupper(implode(",",$arr_resturant));
	 	    $arr_resturant = array();
		}
		
		/*******************************end******************/
		/******************************** fetch category name **********************************/
		$categories = json_decode($row['categories']);
		if($categories[0]=='-1'){
			$ad->categories = strtoupper($lang_resource['ADMIN_PANEL_ALL_CATEGORIES']);
		
		}else{
		foreach ($categories as $key=>$value) {
			pg_prepare($link,'sqlcategories'.$key.$row['id'],"SELECT * FROM w_categories where id=$1");
			$res9 = pg_execute($link,'sqlcategories'.$key.$row['id'],array($value));	
			$rowcity = pg_fetch_array($res9);	
			$bcate = FetchStacateLangDefault($defultlang,$rowcity['id'],$link,$sk);
			array_push($arr_categories,$bcate);
		}
		$ad->categories = strtoupper(implode(",",$arr_categories));
		$arr_categories = array();
		}
		/*******************************end******************/
		
			
		$ad->confirm_order = $row['confirm_order'];
		$ad->country = $row['country'];
		$ad->address = strtoupper($row['address']);
		

		$ad->date = $row['date'];
		 $ad->total = $row['hit'];
		$ad->search_type = 'Weekly';
		$ad->result = $row['result'];
		if($ad->result!='NO'){
			$ad->result = 'YES';
		}
		 $ad->conversion = (($ad->confirm_order)*100)/$ad->total;
		$ad->conversion = round($ad->conversion,$_SESSION['decimal_value']);
	
		array_push($ads,$ad);
	//	array_push($ads,$adw);
	$sk++;
		}
	$ads=json_encode($ads);
	
print_r($ads);
		
	return $ads;
	

	
	
	}

/*********************************Get yearly dada*****************/
function FetchAllSearchStatisticYearlyData($filters){
	
	
	$lang_resource = GetLangFile();
	
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}		

	$conditionalsvalues = array();
	 $query = "SELECT * FROM w_search_statistic WHERE date > CURRENT_DATE-365 AND DATE(date) <= CURRENT_DATE ORDER BY date desc";

	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	$ads = array();
	$arr_resturant = array();	
	$arr_categories = array();
	pg_prepare($link,'sqlcn125',"SELECT * FROM w_franchises where id=$1");
		
$sk = 0;
pg_prepare($link,'sqlsecity','SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	while($row = pg_fetch_array($result))
		{
		unset($ad);
		//unset($city);
		$ad = new stdClass();
		//$adw->cat = array();
		$ad->id = " ";		
	
		/******************************** fetch city name **********************************/
		
		$res9 = pg_execute($link,'sqlcn125',array($row['city']));
		$rowcity = pg_fetch_array($res9);
		//$ad->city = $rowcity['city'];
		$ad->city = FetchStacityLangDefault($defultlang,$rowcity['id'],$link,$sk);
		/*******************************end******************/
		/******************************** fetch resturant name **********************************/
		$resturant = json_decode($row['resturant']);
		$resturant[0];
		if($resturant[0]=='-1'){
		
	 		$ad->resturant = strtoupper($lang_resource['ADMIN_PANEL_ALL_RESTURANT']);
		}else{
		
		foreach ($resturant as $key=>$value) {
			
			pg_prepare($link,'sqlresturant'.$key.$row['id'],"SELECT * FROM w_business where id=$1");
			$res9 = pg_execute($link,'sqlresturant'.$key.$row['id'],array($value));	
			$rows = pg_fetch_array($res9);	
			$bname = FetchStabusinessLangDefault($defultlang,$value,$link,$sk);
			array_push($arr_resturant,$bname);
			
		}
		
			$ad->resturant = strtoupper(implode(",",$arr_resturant));
	 	    $arr_resturant = array();
		}
		
		/*******************************end******************/
		/******************************** fetch category name **********************************/
		$categories = json_decode($row['categories']);
		if($categories[0]=='-1'){
			$ad->categories = strtoupper($lang_resource['ADMIN_PANEL_ALL_CATEGORIES']);
		
		}else{
		foreach ($categories as $key=>$value) {
			pg_prepare($link,'sqlcategories'.$key.$row['id'],"SELECT * FROM w_categories where id=$1");
			$res9 = pg_execute($link,'sqlcategories'.$key.$row['id'],array($value));	
			$rowcity = pg_fetch_array($res9);	
			$bcate = FetchStacateLangDefault($defultlang,$rowcity['id'],$link,$sk);
			array_push($arr_categories,$bcate);
		}
		$ad->categories = strtoupper(implode(",",$arr_categories));
		$arr_categories = array();
		}
		/*******************************end******************/
		
			
		$ad->confirm_order = $row['confirm_order'];
		$ad->country = $row['country'];
		$ad->address = strtoupper($row['address']);
		

		$ad->date = $row['date'];
		$ad->total = $row['hit'];
		$ad->search_type = 'Yearly';
		$ad->result = $row['result'];
		if($ad->result!='NO'){
			$ad->result = 'YES';
		}
		 $ad->conversion = (($ad->confirm_order)*100)/$ad->total;
		$ad->conversion = round($ad->conversion,$_SESSION['decimal_value']);
	
		array_push($ads,$ad);
		//array_push($ads,$adw);
	$sk++;
		}
	$ads=json_encode($ads);
	
print_r($ads);
		
	return $ads;
	

	
	
	
	}

