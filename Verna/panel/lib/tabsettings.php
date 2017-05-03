<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	
	case 'SaveTabSettings':
		SaveTabSettings($_POST['data']);
	break;
	default:
		die();
	break;
	}


function SaveTabSettings($data)
{
	//echo "123"; exit;
	
	//AdminsOnly();
	require('../config.php');
	
	$form = parse($data);
	
	print_r($form);
	
	
	 if( ($form->fields->country->value == "") || ($form->fields->country->value==NULL))
	      $form->fields->country->value = -1;
	 if( ($form->fields->city->value == "") || ($form->fields->city->value==NULL))
	      $form->fields->city->value = -1;	
		  
		  echo  $form->fields->country->value;
	      echo  $form->fields->city->value;  
	
    UpdateQuery('w_tabsettings',$form->fields,1,$CFG);

}


?>
