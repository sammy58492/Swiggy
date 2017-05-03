<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
switch ($_POST['f'])
	{
	case 'Savedeliverycity':
		Savedeliverycity($_POST['data']);
	break;
	
	case 'FetchAlldeliverycityDataById':
		FetchAlldeliverycityDataById($_POST['id']);
	break;

	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	
	case 'DeleteDeliverycity':
	DeleteDeliverycity($_POST['data']);
	break;
	
	case 'Fetchdeliverycitydatabyid':
		Fetchdeliverycitydatabyid($_POST['id']);
	break;
	
	
	
	default:
		die();
	break;
	}


function Savedeliverycity($data)
	{
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);
	
	$temp=null;
	foreach($data->fields as $name=>$set){
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);


	}
	$form = $data;
	$usrid = $form->id;
	$temp = new stdClass();
	foreach($form->fields as $name=>$set){
	$temp->$name = new stdClass();
	$temp->$name->value=$set->value;
	}	
	if ($form->type=='create')
	{
		$usrid = InsertQuery('w_deliverycity',$temp,$CFG);
		
	}else{
		
		UpdateQuery('w_deliverycity',$temp,$usrid,$CFG);
		
	}
}
function FetchAlldeliverycityDataById($id)
	{
	require('../config.php');
	$link = ConnectDB();
	$deliverycityy = array();
	pg_prepare($link,'sql','SELECT * from w_deliverycity WHERE businessid=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqlcity','SELECT * from w_franchises WHERE id=$1');
	
	
	while($rows = pg_fetch_array($result)){
		$deliverycity = new stdClass();
		$deliverycity->id  = $rows['id'];
		$deliverycity->businessid  = $rows['businessid'];
		$result22 = pg_execute($link,'sqlcity',array($rows['delcity']));
		$row2 = pg_fetch_array($result22);
		$deliverycity->delcity  = $row2['city'];
		$deliverycity->citydelivery_fee  = $rows['citydelivery_fee'];
		$deliverycity->citydelivery_minper  = $rows['citydelivery_minper'];
		$deliverycity->citydelivery_minperfree  = $rows['citydelivery_minperfree'];
		$deliverycity->enabled  = $rows['enabled'];
		$deliverycity->scriptid  = $rows['scriptid'];
		
		array_push($deliverycityy,$deliverycity);
		
	}
	echo json_encode($deliverycityy);
		
}

function SetEnabled($id,$enabled)
	{
	//AdminsOnly();
	
	$link = ConnectDB();		

	pg_prepare($link,'sqli','UPDATE w_deliverycity SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}


function DeleteDeliverycity($data)
	{
	//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql0','DELETE FROM w_deliverycity WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));			
			pg_close($link);
			
				}
			
			
			
}


function Fetchdeliverycitydatabyid($id)
	{
		require('../config.php');
	$link = ConnectDB();
	//$deliverycityy = array();
	pg_prepare($link,'sql','SELECT * from w_deliverycity WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$rows = pg_fetch_array($result);
		//unset($deliverycity);
		$deliverycity['id']  = $rows['id'];
		$deliverycity['businessid']  = $rows['businessid'];
		$deliverycity['delcity']  = $rows['delcity'];
		$deliverycity['citydelivery_fee']  = $rows['citydelivery_fee'];
		$deliverycity['citydelivery_minper']  = $rows['citydelivery_minper'];
		$deliverycity['citydelivery_minperfree']  = $rows['citydelivery_minperfree'];
		$deliverycity['enabled']  = $rows['enabled'];
		$deliverycity['scriptid']  = $rows['scriptid'];
		
		//array_push($deliverycityy,$deliverycity);
		
	//}
	echo json_encode($deliverycity);
		
}

?>