<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
//FetchAllBusinessReviewPhotoData();

	
switch ($_POST['f'])   
	{
	case 'FetchAllUserPointData':
		FetchAllUserPointData();
	break;
	
	case 'FetchUsersPointsData':
		FetchUsersPointsData($_POST['id']);
	break;

	case 'FetchUsersPointsHistoryData':
		FetchUsersPointsHistoryData($_POST['id']);
	break;
	
	case 'UpdateUsersPoint':
		UpdateUsersPoint($_POST['data']); 
	break;
		

	default:
		die();
	break; 
	}

/*******************************************GET Business Review DATA**********************************************/

function FetchAllUserPointData()
	{

	SuperAdminsOnly();
	$link = ConnectDB();	
	
	
	
	
	$query = 'select * from w_users where id in(select customer_id from w_user_points)';

	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());

	$points = array();
	while($row = pg_fetch_array($result))
		{
			$link = ConnectDB();
		//unset($point);
		$point = new stdClass();
		$point->id = $row['id'];
	   

		$point->w_id_customer = $row['id'];
		$point->extra_point_added_by_super_admin=$row['extra_point_added_by_super_admin'];
		if($row['id']!=null)
		{
				pg_prepare($link,'sql20',"select sum(points_received) as total_points,sum(points_used) as total_points_used from w_user_points where customer_id=$1");
				$result20 = pg_execute($link,'sql20',array($point->w_id_customer));
				
				//$result2 = pg_execute($link,'sql1',array();
				$row20 = pg_fetch_array($result20);
			
				$point->total_points = $row20['total_points'];
				$point->points_used = $row20['total_points_used'];

				if($row['extra_point_added_by_super_admin']!=null)
				{
					$point->points_available=($row20['total_points']-$row20['total_points_used'])+$point->extra_point_added_by_super_admin;
				}
				else
				{
					$point->points_available=$row20['total_points']-$row20['total_points_used'];
				}
		}

		$point->customername = $row['name']." ".$row['lastname']." ".$row['lastname2'];
		
		
		
		
		array_push($points,$point);
		pg_close($link);
		}



	echo json_encode($points);
	}



function FetchBusinessReviewLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_ads_lang WHERE ads_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}




function FetchUsersPointsData($id)
{
	 $link = ConnectDB();	
	 // SuperAdminsOnly();
	

	
	pg_prepare($link,'sqlbr','Select w_user_points.*,w_users.name,w_users.lastname,w_users.lastname2,w_users.extra_point_added_by_super_admin from w_user_points inner join w_users on w_user_points.customer_id=w_users.id where w_user_points.customer_id=$1');
	

	$result54 = pg_execute($link,'sqlbr',array($id));

	
	pg_prepare($link,'sql201',"select sum(points_received) as total_points,sum(points_used) as total_points_used from w_user_points where customer_id=$1");
	
	while($row65 = pg_fetch_array($result54))
		{
		//unset($br);
		$br = new stdClass();
	    $br->id = $row65['id'];
	    $br->customer_id=$row65['customer_id'];
	    $br->extra_point_added_by_super_admin=$row65['extra_point_added_by_super_admin'];
	    if($row65['customer_id']!=null)
		{
				
				$result20 = pg_execute($link,'sql201',array($br->customer_id));
				
				//$result2 = pg_execute($link,'sql1',array();
				$row20 = pg_fetch_array($result20);
			
				$br->total_points = $row20['total_points'];
				$br->points_used = $row20['total_points_used'];
				$br->points_available=$row20['total_points']-$row20['total_points_used'];
				
		}



		$br->customername= $row65['name']." ".$row65['lastname']." ".$row65['lastname2'];
		//$br->total_points=$row65['total_points'];
		$br->points_received = $row65['points_received'];
		$br->points_used=$row65['points_used'];
		
		
		
	}
	echo json_encode($br);
}


function UpdateUsersPoint($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$data = parse($data);
	print_r($data);
	$link = ConnectDB($CFG);

	
	foreach($data->fields as $name=>$set){

		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	
		}

		 $form = $data;	
		 $adid = $form->id;
		 
	
		$nameval = $form->fields->name->value;
		$namelang = explode(",",$nameval);

		foreach($form->fields as $name=>$set){
		
		$temp->$name->value=$set->value;
		
		}	

		echo $id=$data->fields->id->value;
		echo $extra_point_added_by_super_admin=$data->fields->extra_point_added_by_super_admin->value;
		// echo $id=$temp->$name->value->id;
		// echo $points_available=$temp->$name->value->points_available;
		//UpdateQuery('w_users',$temp,$form->id,$CFG);
		pg_prepare($link,'sqldefalut','update w_users set extra_point_added_by_super_admin=$1 where id=$2');
		$result1 = pg_execute($link,'sqldefalut',array($extra_point_added_by_super_admin,$id));
		echo 'ok';
	}	


	function FetchUsersPointsHistoryData($id)
{
	 $link = ConnectDB();	

	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	 // SuperAdminsOnly();
	

	
	pg_prepare($link,'sqlbr','select * from w_user_points where customer_id=$1');
	

	$result54 = pg_execute($link,'sqlbr',array($id));

	pg_prepare($link,'sql56',"select extra_point_added_by_super_admin from w_users where id=$1");
	$pointbr = array();
	
	while($row65 = pg_fetch_array($result54))
		{
		unset($br);
		
	    $br->id = $row65['id'];
	    $br->business_id=$row65['business_id'];
	    $br->customer_id =$row65['customer_id'];
	    if ($row65['business_id']!=null)
			{
				pg_prepare($link,'sql20'.$br->id,"select name_lang from w_business_lang where business_id=$1 and lang_id=$2");
				$result20 = pg_execute($link,'sql20'.$br->id,array($br->business_id,$defultlang));
				
				//$result2 = pg_execute($link,'sql1',array();
				$row20 = pg_fetch_array($result20);
			
				$br->bname = $row20['name_lang'];
			}
			else
			{
				$br->bname = '';
			}
		if ($row65['customer_id']!=null)
			{
				pg_prepare($link,'sql30'.$br->id,"select name, lastname, lastname2 from w_users where id=$1");
				$result30 = pg_execute($link,'sql30'.$br->id,array($row65['customer_id']));
				
				//$result2 = pg_execute($link,'sql1',array();
				$row30 = pg_fetch_array($result30);
			
				$br->customername = $row30['name']." ".$row30['lastname']." ".$row30['lastname2'];
			} 
			else
			{
				$br->customername = '';
			}



		$br->points_date=date('d-m-Y',strtotime($row65['date']));
		$br->points_received=$row65['points_received'];
		
		$br->points_price=$row65['price'];

		pg_prepare($link,'sql40'.$br->id,"select sum(price) as total_price from w_user_points where customer_id=$1");
		$result40 = pg_execute($link,'sql40'.$br->id,array($row65['customer_id']));
		$row40 = pg_fetch_array($result40);
		$br->points_total_price=$row40['total_price'];

		pg_prepare($link,'sql50'.$br->id,"select sum(points_received) as total_points_rec, sum(points_used) as points_used_total  from w_user_points where customer_id=$1");
		$result50 = pg_execute($link,'sql50'.$br->id,array($row65['customer_id']));
		$row50 = pg_fetch_array($result50);
		$br->points_total_points=$row50['total_points_rec'];
		$br->points_total_used=$row50['points_used_total'];

		
		$res=pg_execute($link,'sql56',array($row65['customer_id']));
		$row56=pg_fetch_array($res);
		$br->extra_point_added_by_super_admin=$row56['extra_point_added_by_super_admin'];

		if($row56['extra_point_added_by_super_admin']!=null)
		{
			$br->points_available=($row50['total_points_rec']-$row50['points_used_total'])+$br->extra_point_added_by_super_admin;
		}
		else
		{
			$br->points_available=$row50['total_points_rec']-$row50['points_used_total'];
		}
		array_push($pointbr,$br);
	}
	echo json_encode($pointbr);
}

?>
