<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'DeleteFranchise':
		DeleteFranchise($_POST['data']);
	break;
	case 'SaveFranchise':
		SaveFranchise($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/

function GetAllFranchisesData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	$query = 'SELECT w_franchises.id,w_franchises.city,w_franchises.admin,w_franchises.enabled,w_users.name as name,w_users.lastname,w_users.lastname2,w_users.level FROM w_franchises INNER JOIN w_users ON w_franchises.admin = w_users.id';

	if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			if ($count>0)
				$conditionals .= ',' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);
	pg_close($link);
	
	$franchises = array();
	while($row = pg_fetch_array($result))
		{
		unset($franchise);
		unset($admin);
		$franchise->id = $row['id'];
		$franchise->city = $row['city'];
		$franchise->enabled = $row['enabled'];
		
		if ($row['admin']!=null)
			{
			if ($row['level']<2)//can be admin
				{
				$admin->id = $row['admin'];
				$admin->name = $row['name'];
				$admin->lastname = $row['lastname'];
				$admin->lastname2 = $row['lastname2'];
				}
				else//user is not admin anymore
				{
				$admin->id = '';
				$admin->name = '';
				$admin->lastname = '';
				$admin->lastname2 = '';
				}
			}
			else
			{
			$admin->id = '';
			$admin->name = '';
			$admin->lastname = '';
			$admin->lastname2 = '';
			}

		$franchise->admin = $admin;
		
		array_push($franchises,$franchise);
		}

	return $franchises;
	}

/********************************************DELETE FRANCHISE****************************************************************/

function DeleteFranchise($data)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/

function SaveFranchise($data)
	{
	SuperAdminsOnly();
	$form = parse($data);
	$form->fields->timezone->value = str_replace("@","+",$form->fields->timezone->value);
	$form->fields->timezone->value = str_replace("$","-",$form->fields->timezone->value);
	
	//$form->fields->city->value = str_replace(" ","-",$form->fields->city->value);	
	if ($form->type=='create')
		$query = InsertQuery('w_franchises',$form->fields);	
		else
		$query = UpdateQuery('w_franchises',$form->fields,$form->id);
	}


function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_franchises SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}


?>
