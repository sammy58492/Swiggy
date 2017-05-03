<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'DeleteNeighborhood':
		DeleteNeighborhood($_POST['data']);
	break;
	case 'SaveNeighborhood':
		SaveNeighborhood($_POST['data']);
	break;
	case 'checkNeighborhood':
		checkNeighborhooddata($_POST['data']);
	break;
	
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	default:
		die();
	break;
	}



function DeleteNeighborhood($data)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_neighborhood WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}

function checkNeighborhooddata($data){
	SuperAdminsOnly();

	$form = parse($data);

	 $id=$form->id;
		$link = ConnectDB();		
	foreach($form as $k=>$val){
	
		  $id=$val->id;
		   $country=$val->country;
		  $city=$val->city;
		 $name=$val->name;
		 if($id!=''){
			  $sql="select * from w_neighborhood where country=$1 and city=$2 and name=$3 and id<>$4";
				pg_prepare($link,'sql'.$k,$sql);
				$result=pg_execute($link,'sql'.$k,array($country,$city,$name,$id));
				while($row = pg_fetch_array($result))
				{
					echo 1;
				}
				
				
		 }else{
			  $sql="select * from w_neighborhood where country=$1 and city=$2 and name=$3";
			 	pg_prepare($link,'sql'.$k,$sql);
				$result=pg_execute($link,'sql'.$k,array($country,$city,$name));
				while($row = pg_fetch_array($result))
				{
					echo 1;
				};
				

		 }
		
	}
	pg_close($link);
}
function SaveNeighborhood($data)
	{
	SuperAdminsOnly();
	$form = parse($data);
	
	if ($form->type=='create'){
		$form->fields->enabled=true;
		$query = InsertQuery('w_neighborhood',$form->fields);
	}
		else{
		$query = UpdateQuery('w_neighborhood',$form->fields,$form->id);
		}
	}

function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_neighborhood SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}

?>
