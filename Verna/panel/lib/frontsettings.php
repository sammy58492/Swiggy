<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	
	case 'SaveFrontSettings':
		SaveFrontSettings($_POST['data']);
	break;
	case 'SaveFrontSettingsAjax':
		SaveFrontSettingsAjax($_POST['data']);
	break;
	
	default:
		die();
	break;
	}
function SaveFrontSettingsAjax($data){
	require('../config.php');
	
	$form = parse($data);
	
	if(trim($form->fields->countrytag->value)==''){
		$form->fields->countrytag->value='["-1"]';
		$form->fields->citytag->value='["-1"]';
		$form->fields->restaurant->value='["-1"]';
	}
	
	 if(trim($form->fields->citytag->value)==''){
		
		$form->fields->citytag->value='["-1"]';
		$form->fields->restaurant->value='["-1"]';
	}
	 if(trim($form->fields->restaurant->value)==''){
		
	
		$form->fields->restaurant->value='["-1"]';
	}
	
	
    UpdateQuery('w_frontsettings',$form->fields,1,$CFG);
}

function SaveFrontSettings($data)
{
	//echo "123"; exit;
	
	//AdminsOnly();
	require('../config.php');
	
	$form = parse($data);
	
	
    UpdateQuery('w_tabsettings',$form->fields,1,$CFG);

}


?>
