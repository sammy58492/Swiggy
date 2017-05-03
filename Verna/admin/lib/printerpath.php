<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'DeletePrinterPath':
		DeletePrinterPath($_POST['data']);
	break;
	case 'SavePrinterPath':
		SavePrinterPath($_POST['data']);
	break;
	default:
		die();
	break;
	}



function DeletePrinterPath($data)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_printerpath WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}


function SavePrinterPath($data)
	{
	SuperAdminsOnly();
	$form = json_decode($data);
	
	if ($form->type=='create')
		$query = InsertQuery('w_printerpath',$form->fields);	
		else
		$query = UpdateQuery('w_printerpath',$form->fields,$form->id);
	}


?>
