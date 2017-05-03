<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
//FetchAllBusinessReviewPhotoData();
	
switch ($_POST['f'])   
	{
	case 'FetchAllReportData':
		FetchAllReportData();
	break;
	

	default:
		die();
	break; 
	}

/*******************************************GET Business Review DATA**********************************************/

function FetchAllReportData()
	{

	SuperAdminsOnly();
	$link = ConnectDB();	
	
	pg_prepare($link,'sqldefalut','SELECT * from w_reg_users_data');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$conditionalsvalues = array();
	$query = 'select * from w_reg_users_data';

	
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);

	$ads = array();
	while($row = pg_fetch_array($result))
		{
	//	unset($ad);
		unset($business);
		$ad = new stdClass();
		$ad->id = $row['id'];
		$ad->name = $row['name'];
		$ad->postcode=$row['postcode'];
		$ad->email=$row['email'];
		
		if($ad->name !=null)
		array_push($ads,$ad);
		}



	echo json_encode($ads);
	}

/*********************************************************************************/

	

?>
