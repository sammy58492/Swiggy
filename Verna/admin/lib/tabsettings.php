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

	case 'SaveBusinessPageSettings':
		SaveBusinessPageSettings($_POST['data']);
	break;
	case 'SetEnabled':
			SetEnabled($_POST['id']);
		break;
	default:
		die();
	break;
	}

function SetEnabled($id)
{
	require('../config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($id,'businesstemplate'));
	pg_close($link);
	echo "ok";
}
function SaveTabSettings($data)
{

	//AdminsOnly();
	require('../config.php');
	
	$form = parse($data);
	
	//print_r($form);
	
	
	 if( ($form->fields->country->value == "") || ($form->fields->country->value==NULL))
	      $form->fields->country->value = -1;
	 if( ($form->fields->city->value == "") || ($form->fields->city->value==NULL))
	      $form->fields->city->value = -1;	
		  
		  //echo  $form->fields->country->value;
	      //echo  $form->fields->city->value;  
	
    UpdateQueryTabsettings('w_tabsettings',$form->fields,$_SESSION['scriptid'],$CFG);

}

function UpdateQueryTabsettings($table,$fields,$id,$CFG = 'empty')
	{
	$query = 'UPDATE ' . $table . ' SET ';
	$count = 0;
	$values = array();
	//print_r($fields);
	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			if ($count>0)
				$query .=  ','. key($fields) . '=$' . ($count+1);
				else
				$query .=  key($fields) . '=$' . ($count+1);

			if ($field->value=='realnull')//if this means we need to really save it as null
				array_push($values,null);
				else
				array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}

	array_push($values,$id);

	$link = ConnectDB($CFG);
	
	
	pg_prepare($link,'sql',$query . ' WHERE scriptid=$' . ($count+1));
	$result = pg_execute($link,'sql',$values);
	pg_close($link);
	}

function SaveBusinessPageSettings($data){
	require('../config.php');
	$form = json_decode($data);
	
	$businesspageheadersettingvalue = $form->fields->businesspageheadersetting->value; 	
	$businesspagefootersettingvalue = $form->fields->businesspagefootersetting->value; 	
	$prograssbarsettingvalue = $form->fields->prograssbarsetting->value; 
    $businesspagimagesetting = $form->fields->businesspagimagesetting->value;
	$businesspagpersonsetting = $form->fields->businesspagpersonsetting->value;
	$businesspagqtysetting = $form->fields->businesspagqtysetting->value;
	$businessopeningtime = $form->fields->businessopeningtime->value; 
	$emailsettings = $form->fields->emailsettings->value; 
	$popularsettings = $form->fields->popularsettings->value; 
	
	$deliverycitysetting = $form->fields->deliverycitysetting->value; 
	$zipcodeordersetting = $form->fields->zipcodeordersetting->value; 
	$productordersetting = $form->fields->productordersetting->value;
	$checkout_popup_settings = $form->fields->checkout_popup_settings->value;
	$checkout_available_product_settings = $form->fields->checkout_available_product_settings->value;

	$link = ConnectDB($CFG);
	
	
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($businesspageheadersettingvalue,'businesspageheadersetting'));
	pg_close($link);

	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($businesspagefootersettingvalue,'businesspagefootersetting'));
	pg_close($link);

	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($prograssbarsettingvalue,'businesspagprograssbarsetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($businesspagimagesetting,'businesspagimagesetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($businesspagpersonsetting,'businesspagpersonsetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($businesspagqtysetting,'businesspagqtysetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_config','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_config',array($businessopeningtime,'businessopeningtime'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_email','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_email',array($emailsettings,'emailsettings'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_popular','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_popular',array($popularsettings,'popularsettings'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_deliverycity','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_deliverycity',array($deliverycitysetting,'deliverycitysetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_zipcodeorder','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_zipcodeorder',array($zipcodeordersetting,'zipcodeordersetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_productorder','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_productorder',array($productordersetting,'productordersetting'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_popup_settings','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_popup_settings',array($checkout_popup_settings,'checkout_popup_settings'));
	pg_close($link);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql_avail_settings','UPDATE w_configs SET value=$1 WHERE name=$2');
	pg_execute($link,'sql_avail_settings',array($checkout_available_product_settings,'checkout_available_product_settings'));
	pg_close($link);

}


?>


