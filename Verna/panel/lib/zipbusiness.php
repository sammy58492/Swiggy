<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';

	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}


switch ($_POST['f'])
	{
	case 'FetchAllOrdersData':
		FetchAllOrdersData($_POST['filters'],$_POST['business']);
	break;
	case 'FetchOrderData':
		FetchOrderData($_POST['id']);
	break;
	case 'DeleteOrder':
		DeleteOrder($_POST['data']);
	break;
	case 'SaveOrder':
		SaveOrder($_POST['data']);
	break;
	case 'FetchDriverData':
		FetchDriverData($_POST['id']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET ORDERS DATA**********************************************/

function FetchAllOrdersData($filters,$withbusiness)
	{
	//ProvidersOnly();
	$link = ConnectDB();
	$conditionalsvalues = array();
	
	
	
	switch($_SESSION['user']->level)
		{
			case '0':
	$query = 'SELECT w_business.id,w_business.name,w_franchises.city,w_users.name AS usrname,w_users.lastname,w_users.lastname2 FROM w_business JOIN w_franchises ON w_business.city = w_franchises.id JOIN w_users ON w_business.provider = w_users.id ORDER BY w_business.id DESC ';
	  break;
	       case '1':
	$query = 'SELECT w_business.id,w_business.name,w_franchises.city,w_users.name AS usrname,w_users.lastname,w_users.lastname2 FROM w_business JOIN w_franchises ON w_business.city = w_franchises.id JOIN w_users ON w_business.provider = w_users.id WHERE w_franchises.admin = '.$_SESSION['user']->id.' ORDER BY w_business.id DESC ';
	break;
	
	 case '2':
	$query = 'SELECT w_business.id,w_business.name,w_franchises.city,w_users.name AS usrname,w_users.lastname,w_users.lastname2 FROM w_business JOIN w_franchises ON w_business.city = w_franchises.id JOIN w_users ON w_business.provider = w_users.id WHERE w_business.provider = '.$_SESSION['user']->id.' ORDER BY w_business.id DESC ';
	break;
	
		}
		
		//echo $query;exit;

	if (!empty($filters))
		{
		//$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}


	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	$preins = array();


	while($row = pg_fetch_array($result))
		{
			//$data = parse($row['data']);
			unset($prein);
			$prein->id = $row['id'];
			$prein->name = $row['name'];
			$prein->city = $row['city'];
			$prein->usrname = $row['usrname']." ".$row['lastname']." ".$row['lastname2'];
			//$prein->driver = $row['driver'];
			array_push($preins,$prein);
		}

		echo json_encode($preins);
	}


function FetchOrderData($id)
	{
	echo json_encode(GetOrderData($id));

	}

function FetchDriverData($id)
{
	//echo $_SESSION['user']->level;
	//exit();
$link = ConnectDB();

    if($_SESSION['user']->level==0 || $_SESSION['user']->level==1 )
	{
			pg_prepare($link,'sql7','UPDATE w_orders SET read=0 WHERE id=$1');
		   pg_execute($link,'sql7',array($id));

	}

			$driverdata = array();
			pg_prepare($link,'sql','SELECT * FROM w_driver WHERE  enabled=$1');
			$result = pg_execute($link,'sql',array("TRUE"));
			while($row = pg_fetch_array($result))
				{
					unset($driver);
				 	$driver->id=$row['id'];
					$driver->caption=$row['name']." ".$row['lastname'];



				array_push($driverdata,$driver);
				}


			echo json_encode($driverdata);

}
function GetOrderData($id,$CFG = 'empty')
{
	ProvidersOnly();
	if (!empty($CFG))
		$link = ConnectDB($CFG);
		else
		$link = ConnectDB();

	if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
			}



	pg_prepare($link,'sql1','SELECT data,comment,date,status,driver FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql1',array($id));
	unset($order);
	while($row = pg_fetch_array($result))
		{
		$data = parse($row['data']);

		if ($_SESSION['user']->level=='2')
			{
			foreach ($data->business as $databusiness)
				{
				$founded = false;
				foreach ($businesss as $business)
					{
					if ($business==$databusiness->id)
						$founded = true;
					}
				if ($founded==false)
					unset($databusiness->id);
				}
			}

		$order->id = $id;
		$order->data = json_encode($data);
		if(IS_REVIEW_ENABLED == 1)
			$order->datos = stripslashes($row['data']);
		$order->date = $row['date'];
		$order->comment = $row['comment'];
		$order->status = $row['status'];
		$order->driver = $row['driver'];

		}
	pg_close($link);
	return $order;
	}
function DeleteOrder($data)
	{
	AdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_orders WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}

  function GetBusinessData($id)
{
      $link = ConnectDB();

  $query = 'SELECT id,data,date FROM w_orders WHERE id=$1';
  pg_prepare($link,'sql1',$query);
	$result2 = pg_execute($link,'sql1',array($id));
  $info2 = array();
  while($row = pg_fetch_array($result2))
		{
			$data2 = parse($row['data']);
      $data2->id = $row['id'];
      $data2->date = $row['date'];
      array_push($info2,$data2);
     }
    pg_close($link);
    return $info2;
}



?>
