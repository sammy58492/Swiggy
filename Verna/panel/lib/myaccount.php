<?php
session_start(); 
define("IS_PAYPAL_ENABLED", 1);
function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}

switch ($_POST['f'])
	{
	case 'SaveAddress':
		SaveAddress($_POST['data']);
	break;
	case 'SaveAddressBilling':
		SaveAddressBilling($_POST['data']);
	break;
	case 'FetchAllData':
		FetchAllData();
	break;
	case 'FetchAllDataById':
		FetchAllDataById($_POST['id']);
	break;
	case 'FetchAllDataByUser':
		FetchAllDataByUser();
	break;
	case 'FetchAllDataByUserBilling':
		FetchAllDataByUserBilling($_POST['uid']);
	break;
	case 'FetchAllDataByUserBillingOnly':
		FetchAllDataByUserBillingOnly($_POST['uid']);
	break;
	case 'FetchAllDataByUserFavres':
		FetchAllDataByUserFavres($_POST['uid']);
	break;	
	case 'FetchBusinessData':
		FetchBusinessData($_POST['id']);
	break;
	case 'DeleteresturantChoice':
		DeleteresturantChoice($_POST['id'],$_POST['uid']);
	break;
	
	case 'DeleteresturantChoiceByCheck':
		DeleteresturantChoiceByCheck($_POST['data'],$_POST['uid']);
	break;
	case 'FetchAllUsersPoint':
			FetchAllUsersPoint($_POST['uid']);
		break;
	case 'FetchAllUsersPointTotal':
			FetchAllUsersPointTotal($_POST['uid']);
		break;		
		
	default:
		die();
	break;
	}
	
 /*******************************************************************Major  Function ************************************************************/	
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
}
function InsertQuery($table,$fields,$CFG)
	{
	//get the id last secuence, with this we will get the next id seq and take it (id_sec will incriment with this query)
	$link = ConnectDB($CFG);
	$id = -1;

	pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	
	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			$query .=  ','. key($fields);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}	

	$query .= ') VALUES ($1';

	for ($i=0;$i<$count;$i++)
		$query .= ',$' . ($i+2);

	$query .= ')';
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$values);
	pg_close($link);
	return $id;
	}


function UpdateQuery($table,$fields,$id,$CFG)
	{
	$query = 'UPDATE ' . $table . ' SET ';
	$count = 0;
	$values = array();
	
	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			if ($count>0)
				$query .=  ','. key($fields) . '=$' . ($count+1);
				else
				$query .=  key($fields) . '=$' . ($count+1);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}	

	array_push($values,$id);
	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql',$query . ' WHERE id=$' . ($count+1));
	$result = pg_execute($link,'sql',$values);
	pg_close($link);
}
function parse($str,$old=false)
	{
	if ($old)
		return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
}


 /*******************************************************************Major  Function ************************************************************/

	
 /******************************************************************* Save My Address ************************************************************/	
 
function SaveAddress($data){

	require('../config.php');
	$form = parse($data);
	$usrid = $form->id;
	
	$form->fields->usr=new stdClass();
	$form->fields->usr->value = $_SESSION['user']->id;
	
	$form->fields->status=new stdClass();
	$form->fields->status->value = 1;
	

	if ($form->type=='create')
		$usrid = InsertQuery('w_account',$form->fields,$CFG);	
	else
		UpdateQuery('w_account',$form->fields,$form->id,$CFG);

} 
 
 
 
function SaveAddressBilling($data){

	require('../config.php');
	$form = parse($data);
	$usrid = $form->id;
	
	$form->fields->usr=new stdClass();
	$form->fields->usr->value = $_SESSION['user']->id;
	
	$form->fields->status=new stdClass();
	$form->fields->status->value = 1;

	if ($form->type=='create')
		$usrid = InsertQuery('w_account',$form->fields,$CFG);	
	else
		UpdateQuery('w_account',$form->fields,$form->id,$CFG);

}
function FetchAllData()
{

	echo json_encode(GetAllData());
}
function GetAllData(){

	require('../config.php');
	$link = ConnectDB();
	
	$myaccount = array();
	
	pg_prepare($link,'sql','SELECT * FROM w_account order by id');
	$result = pg_execute($link,'sql',array());

	
	while($row = pg_fetch_array($result)) {
		
		unset($myac);
		$myac->id = $row['id'];
		$myac->billingtype = $row['billingtype'];
		$myac->name = $row['name'];
		$myac->company = $row['company'];
		$myac->address = $row['address'];
		
		$myac->city = $row['city'];
		$myac->state = $row['state'];
		$myac->pcode = $row['pcode'];
		$myac->country = $row['country'];
		$myac->phone = $row['phone'];
		
		
		
	array_push($myaccount,$myac);
	
//print_r($myaccount);

	}
return $myaccount;
}


function FetchAllDataById($id){

	require('../config.php');
	$link = ConnectDB();
	
	
	$myac = new stdClass();
	pg_prepare($link,'sql','SELECT * FROM w_account where id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);		

	$myac->id = $row['id'];
	$myac->billingtype = $row['billingtype'];
	$myac->name = $row['name'];
	$myac->company = $row['company'];
	$myac->address = $row['address'];
	
	$myac->city = $row['city'];
	$myac->state = $row['state'];
	$myac->pcode = $row['pcode'];
	$myac->country = $row['country'];
	$myac->phone = $row['phone'];
	
	$myac->cardno = $row['cardno'];
	$myac->month = $row['month'];
	$myac->year = $row['year'];
	$myac->cvvno = $row['cvvno'];

	echo json_encode($myac);
}

function FetchAllDataByUser(){
	echo json_encode(GetAllDataByUser());
}

function GetAllDataByUser(){

	require('../config.php');
	$link = ConnectDB();
	$myaccount = array();
	pg_prepare($link,'sql','SELECT * FROM w_account where usr=$1 and billingtype IN(3,4,5) order by id');
	$result = pg_execute($link,'sql',array($_SESSION['user']->id));

	while($row = pg_fetch_array($result)) {
		
		$myac = new stdClass();
		$myac->id = $row['id'];
		$myac->billingtype = $row['billingtype'];
		$myac->name = $row['name'];
		$myac->company = $row['company'];
		$myac->address = $row['address'];
		
		$myac->city = $row['city'];
		$myac->state = $row['state'];
		$myac->pcode = $row['pcode'];
		$myac->country = $row['country'];
		$myac->phone = $row['phone'];
	
		array_push($myaccount,$myac);
	}
	return $myaccount;
}
function FetchAllDataByUserBilling($id)
{

	echo json_encode(GetAllDataByUserBilling($id));
}

function FetchAllDataByUserBillingOnly($id)
{

	echo json_encode(GetAllDataByUserBillingOnly($id));
}

function GetAllDataByUserBilling($id){

	require('../config.php');
	$link = ConnectDB();
	
	$myaccount = array();

	pg_prepare($link,'sql','SELECT * FROM w_account where usr=$1 and status=1 and billingtype=1  order by id');
	$result = pg_execute($link,'sql',array($id));

	while($row = pg_fetch_array($result)) {
		
		unset($myac);
		$myac->id = $row['id'];
		$myac->billingtype = $row['billingtype'];
		$myac->name = $row['name'];
		$myac->company = $row['company'];
		$myac->address = $row['address'];
		
		$myac->city = $row['city'];
		$myac->state = $row['state'];
		$myac->pcode = $row['pcode'];
		$myac->country = $row['country'];
		$myac->phone = $row['phone'];
		
		
	array_push($myaccount,$myac);
	
//print_r($myaccount);

	}
return $myaccount;
}


function GetAllDataByUserBillingOnly($id){

	require('../config.php');
	$link = ConnectDB();
	
	$myaccount = array();

	pg_prepare($link,'sql','SELECT * FROM w_account where usr=$1 and (billingtype=6 OR billingtype=7) order by id');
	$result = pg_execute($link,'sql',array($id));

	while($row = pg_fetch_array($result)) {
		
		unset($myac);
		
		$myac->id = $row['id'];
		$myac->cardno = $row['cardno'];
		$myac->month = $row['month'];
		$myac->year = $row['year'];
		$myac->cvvno = $row['cvvno'];
		
		
	array_push($myaccount,$myac);
	
//print_r($myaccount);

	}
return $myaccount;
}


function FetchAllDataByUserFavres($id)
{

	echo json_encode(GetAllDataByUserFavres($id));
}

function GetAllDataByUserFavres($id){

	require('../config.php');
	$link = ConnectDB();
	
	$cresturant = array();
	
			
	pg_prepare($link,'sql_r','SELECT * FROM w_business where id=$1');
	pg_prepare($link,'sql','SELECT * FROM w_choiceresturant where u_id=$1');
	$result = pg_execute($link,'sql',array($id));

	while($row = pg_fetch_array($result)) {
		
		
		
		$data = $row['r_id'];
		$data=parse($data);	
		
		foreach ($data as $rid){
			unset($cres);
			$result1 = pg_execute($link,'sql_r',array($rid));
			$row1 = pg_fetch_array($result1);
			
			$cres->id = $row1['id'];
			$cres->name = $row1['name'];
			$cres->street = $row1['street'];
			$cres->colony = $row1['colony'];
			
			array_push($cresturant,$cres);
		}
	}

return $cresturant;
}

function FetchBusinessData($id)
{

	echo json_encode(GetBusinessData($id));
}

function GetBusinessData($id){

	require('../config.php');
	$link = ConnectDB();
	
	$cresturant = array();
	
			
	pg_prepare($link,'sql_r','SELECT * FROM w_business where id=$1');
	$result1 = pg_execute($link,'sql_r',array($id));
	$row1 = pg_fetch_array($result1);
	unset($cres);
	$cres->id = $row1['id'];
	$cres->name = $row1['name'];
	$cres->street = $row1['street'];
	$cres->colony = $row1['colony'];
	array_push($cresturant,$cres);

return $cresturant;
}

function DeleteresturantChoice($id,$uid){

	$link = ConnectDB();	
	$re_id = array();
	pg_prepare($link,'sql','SELECT * FROM w_choiceresturant where u_id=$1');
	$result = pg_execute($link,'sql',array($uid));
	$row = pg_fetch_array($result);
	
	$data = $row['r_id'];
	$data=parse($data);
	$countr=count($data);
	foreach ($data as $rid->key){
		//echo $rid->key;
		if($rid->key != $id){
			array_push($re_id,$rid->key);	
		}
	}

	
	pg_prepare($link,'sqli','update w_choiceresturant set r_id=$2 WHERE id=$1');
	pg_execute($link,'sqli',array($row['id'],json_encode($re_id)));
		
	pg_close($link);
	

}


	function DeleteresturantChoiceByCheck($data,$uid)
	{
		$link = ConnectDB();		
		$data = parse($data);
		print_r($data);
		pg_prepare($link,'sql','SELECT * FROM w_choiceresturant where u_id=$1');
		$re_id = array();
		foreach ($data as $id)
		{
			
			$result = pg_execute($link,'sql',array($uid));
			$row = pg_fetch_array($result);
			$data1 = $row['r_id'];
			$data1=parse($data1);
			
			foreach ($data1 as $rid->key){
				//echo $rid->key;
				if($rid->key != $id){
					if (!in_array($rid->key, $re_id)){
						array_push($re_id,$rid->key);
					}
				}
			}
		}
//	print_r($re_id);

	pg_prepare($link,'sqli','update w_choiceresturant set r_id=$2 WHERE id=$1');
	pg_execute($link,'sqli',array($row['id'],json_encode($re_id)));	
		
		

	pg_close($link);
	}

	///////////////////////////////////////////////////////////////////fetch points/////////////////////////
function FetchAllUsersPoint($uid)
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




			$allPointsData = array();
			pg_prepare($link,'sqlR1','Select w_user_points.*,w_users.name,w_users.lastname,w_users.lastname2,w_users.extra_point_added_by_super_admin from w_user_points inner join w_users on w_user_points.customer_id=w_users.id where w_user_points.customer_id=$1');
			$result = pg_execute($link,'sqlR1',array($uid));


			while($rs = pg_fetch_array($result)) {
				unset($PointData);
				$PointData->id = $rs['id'];
				$PointData->customerid = $rs['customer_id'];
				$PointData->businessid = $rs['business_id'];

				if ($rs['business_id']!=null)
				{
					pg_prepare($link,'sql20'.$PointData->id,"select name_lang from w_business_lang where business_id=$1 and lang_id=$2");
					$result20 = pg_execute($link,'sql20'.$PointData->id,array( $rs['business_id'],$defultlang));
					
					//$result2 = pg_execute($link,'sql1',array();
					$row20 = pg_fetch_array($result20);
				
					$PointData->bname = $row20['name_lang'];
				}
				else
				{
					$PointData->bname = '';
				}

				$PointData->orderid = $rs['order_id'];

				$PointData->extra_point_added_by_super_admin = $rs['extra_point_added_by_super_admin'];

				$PointData->points_received = $rs['points_received'];
				if($rs['points_used'] !=null) 
				 {
				 	$PointData->points_used = $rs['points_used'];
				 }
				 else
				 {
				 	$PointData->points_used= 0;
				 }
				$PointData->date = date('d-m-Y',strtotime($rs['date']));
				$PointData->customer=$rs['name']." ".$rs['lastname']." ".$rs['lastname2'];
				
				$PointData->Price=$rs['price'];

				pg_prepare($link,'sql21'.$PointData->id,"select number_of_points,point_values from w_business_points where business_id=$1 and enabled=$2");
				$result21 = pg_execute($link,'sql21'.$PointData->id,array( $rs['business_id'],'true'));
				$row21 = pg_fetch_array($result21);
				$PointData->number_of_points=$row21['number_of_points'];
				$PointData->point_values=$row21['point_values'];
				if($PointData->point_values !=null || $PointData->point_values!=0)
				{
					$valueofonepoint=$PointData->number_of_points/$PointData->point_values;
				}
				$PointData->valueofonepoint=$valueofonepoint;
				$PointData->total_value_of_earned_points=$valueofonepoint*$PointData->points_received;
			

				
				//$PointData->total_sum_earned_points_value+=$PointData->total_value_of_total_earned_points;
				array_push($allPointsData,$PointData);
				 
				}
				
		echo json_encode($allPointsData);

}


function FetchAllUsersPointTotal($uid)
{
			
			$link = ConnectDB();
			
			$allPointsData = array();
			pg_prepare($link,'sql22',"select sum(points_received) as total_points_rec, sum(points_used) as points_used_total  from w_user_points where customer_id=$1");
			$result22 = pg_execute($link,'sql22',array( $rs['customer_id']));

			while($row22 = pg_fetch_array($result22)) {
				unset($PointData);
				$PointData->points_total_points=$row22['total_points_rec'];
				$PointData->total_value_of_total_earned_points=$valueofonepoint*$row22['total_points_rec'];
				$PointData->points_total_used=$row22['points_used_total'];
				array_push($allPointsData,$PointData);
				}
		echo json_encode($allPointsData);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////

?>
