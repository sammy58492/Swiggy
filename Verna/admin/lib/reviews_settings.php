<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f']){
	case 'FetchReviewSettingsDataByID':
		FetchReviewSettingsDataByID($_POST['id']);
	break;
	case 'UpdateReviewSettingsDataByID':
		UpdateReviewSettingsDataByID($_POST['data']);
	break;
	default:
		die();
	break;
}//end of switch case


function FetchReviewSettingsDataByID($id){
	$link = ConnectDB();
	
	pg_prepare($link,'reviewsql','SELECT review_status,photo_upload_status FROM w_business WHERE id = $1');
	$review_result = pg_execute($link,'reviewsql',array($id));
	$review_row = pg_fetch_array($review_result);
	
	$businessreview = new stdClass();
	$businessreview->review_status = $review_row["review_status"];
	$businessreview->photo_upload_status = $review_row["photo_upload_status"];
	
	echo json_encode($businessreview);
	
}//end of function FetchReviewSettingsDataByID

function UpdateReviewSettingsDataByID($data){
	$link = ConnectDB();
	$form = parse($data);
	//print_r($form);
	$id = $form->fields->businessid->value;
	$review_status = $form->fields->review_status->value;
	$photo_upload_status = $form->fields->photo_upload_status->value;
	
	pg_prepare($link,'sqlreval','UPDATE w_business SET review_status=$1,photo_upload_status=$2 WHERE id=$3');
	pg_execute($link,'sqlreval',array($review_status,$photo_upload_status,$id));
	echo "Status Updated Successfully";
}
