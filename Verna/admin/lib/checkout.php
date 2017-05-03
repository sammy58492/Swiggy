<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{

	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'saverequired':
		saverequired($_POST['data']);
	break;

	default:
		die();
	break;
	}


function SetEnabled($id,$enabled)
	{
		SuperAdminsOnly();
		$link = ConnectDB();		
		$data = parse($data);
		pg_prepare($link,'sql','UPDATE w_checkout SET status=$1 WHERE id=$2');
		if (pg_execute($link,'sql',array($enabled,$id)))
			echo 'ok';
		pg_close($link);
	}

function saverequired($data){
	$link = ConnectDB();	
	$data = parse($data);	
	
	pg_prepare($link,'sql','UPDATE w_checkout SET required=$1 WHERE id=$2');
	foreach($data as $key=>$value){
		if($key!=0){			
			pg_execute($link,'sql',array($value,$key));
		}		
	}
}

?>