<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'DeleteCountry':
		DeleteCountry($_POST['data']);
	break;
	case 'SaveCountry':
		SaveCountry($_POST['data']);
	break;
	default:
		die();
	break;
	}



function DeleteCountry($data)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_countries WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}


function SaveCountry($data)
	{
	SuperAdminsOnly();
	$form = parse($data);
	
	if ($form->type=='create')
		$query = InsertQuery('w_countries',$form->fields);	
		else
		$query = UpdateQuery('w_countries',$form->fields,$form->id);
	}


?>
