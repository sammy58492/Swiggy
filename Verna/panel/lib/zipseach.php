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
		FetchAllOrdersData($_POST['filters'],$_POST['bid']);
	break;
	case 'Fetchbusinessname':
		Fetchbusinessname($_POST['bid']);
	break;
	case 'FetchOrderData':
		FetchOrderData($_POST['id']);
	break;
	case 'DeleteOrder':
		DeleteOrder($_POST['data']);
	break;
	case 'FetchEachzipData':
		FetchEachzipData($_POST['id']);
	break;

	case 'SaveOrder':
		SaveOrder($_POST['data']);
	break;
	case 'FetchDriverData':
		FetchDriverData($_POST['id']);
	break;
		case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET ORDERS DATA**********************************************/

function FetchAllOrdersData($filters,$bid)
	{
	$link = ConnectDB();
	$query = 'SELECT w_zipcode.*,w_business.name FROM w_zipcode JOIN w_business ON w_zipcode.businessid = w_business.id AND w_zipcode.businessid=$1';
    pg_prepare($link,'sqlz1',$query);
	$result = pg_execute($link,'sqlz1',array($bid));
	$zipcode = array();


	while($row = pg_fetch_array($result))
		{
			//$data = parse($row['data']);
			unset($zip);
			$zip->id = $row['id'];
			$zip->zipcode = $row['zipcode'];
			$zip->cost = $row['cost'];
			$zip->bname = $row['name'];
			$zip->enabled = $row['enabled'];

			//$prein->driver = $row['driver'];
			array_push($zipcode,$zip);
		}

		echo json_encode($zipcode);
	}
function monthname($mno)
{
$falseDate="2014-".$mno."-01";
$monthname=date('F',strtotime($falseDate));
return $monthname;
}
function RandNumber($e){

for($i=0;$i<$e;$i++){
$rand = $rand . rand(0, 9);
}
return $rand;

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




	function SetEnabled($id,$enabled)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_zipcode SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}

	function Fetchbusinessname($id)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	pg_prepare($link,'sqlBN','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sqlBN',array($id));
	$rs = pg_fetch_array($result);
		echo $rs['name'];
	pg_close($link);
	}
	function FetchEachzipData($id)
	{
		//SuperAdminsOnly();
		$link = ConnectDB();
		pg_prepare($link,'sqls','SELECT * FROM w_zipcode WHERE id=$1');
		$result = pg_execute($link,'sqls',array($id));
		$zipcode = array();
		while($row=pg_fetch_array($result))
		{
		unset($zip);
			$zip->id = $row['id'];
			$zip->zipcode = $row['zipcode'];
			$zip->cost = $row['cost'];
			$zip->enabled = $row['enabled'];

			//$prein->driver = $row['driver'];
			array_push($zipcode,$zip);
		}

		echo json_encode($zipcode);
	}

?>
