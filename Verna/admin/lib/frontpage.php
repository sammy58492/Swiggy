<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f']){

	case 'SaveFrontSettings':
		SaveFrontSettings($_POST['data']);
	break;
	

	default:
		die();
	break;
}

function SaveFrontSettings($data)
{
	//AdminsOnly();
	require('../config.php');
	
	$form = json_decode($data);
	//print_r($form);
	
	
    UpdateQuery('w_frontsettings',$form->fields,1,$CFG);

}
?>
