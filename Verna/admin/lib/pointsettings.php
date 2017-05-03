<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
//FetchAllBusinessReviewPhotoData();
	
switch ($_POST['f'])   
	{
	case 'FetchAllPointSettingData':
		FetchAllPointSettingData();
	break;
	
	
	case 'DeletePointSettings':
		DeletePointSettings($_POST['data']);
	break;
	
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;

	case 'SaveBusinessPoint':
			  SaveBusinessPoint($_POST['data']); 
		break;
		

	default:
		die();
	break; 
	}

/*******************************************GET Business Review DATA**********************************************/

function FetchAllPointSettingData()
	{

	SuperAdminsOnly();
	$link = ConnectDB();	
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$conditionalsvalues = array();
	$query = 'select * from w_business_points';

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

	$query2="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	pg_prepare($link,'sql1',$query2);

	$query3="select city_lang from w_franchises_lang where city_id=$1 and lang_id=$2";
	pg_prepare($link,'sql2',$query3);

	


	$points = array();
	while($row = pg_fetch_array($result))
		{
		//unset($point);
		$point = new stdClass();
		$point->id = $row['id'];
		$point->w_id_business = $row['business_id'];
		
		if ($row['business_id']!=null)
			{
				
				$result2 = pg_execute($link,'sql1',array($point->w_id_business,$defultlang));
				$row2 = pg_fetch_array($result2);
			
				$point->bname = $row2['name_lang'];
			}
			else
			{
				$point->bname = '';
			}

		$point->point_type = $row['point_type'];
		$point->no_of_points = $row['number_of_points'];
		
		//$ad->comment=substr($row['comment'],0,25);
		
		$point->point_values=$row['point_values'];
		$point->fb_point_values=$row['fb_point_values'];
		$point->twitter_point_values=$row['twitter_point_values'];
		$point->enabled=$row['enabled'];
		
		
		


		//$ad->bname = $business;
		
		array_push($points,$point);
		}



	echo json_encode($points);
	}



function FetchBusinessReviewLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_ads_lang WHERE ads_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}






function DeletePointSettings($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_business_points WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		}
	}

function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_business_points SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}

function SaveBusinessPoint($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$data = json_decode($data);
	$link = ConnectDB($CFG);
	//print_r($data);

	
	$business = json_decode($data->fields->business_id->value);

	 if($data->type=="create")
	 {
		foreach($business as $bu){
			if($bu=="-1")
			{
					$point_type=$data->fields->point_type->value;
					$number_of_points=$data->fields->number_of_points->value;
					$point_values=$data->fields->point_values->value;
					$fb_point_values=$data->fields->fb_point_values->value;
					$twitter_point_values=$data->fields->twitter_point_values->value;

				pg_prepare($link,'sqliselectb',"select id from w_business");
				$resultbuall = pg_execute($link,'sqliselectb',array());
				while($rowall = pg_fetch_array($resultbuall))
				{
					$bid=$rowall['id'];
					
					pg_prepare($link,'sqli'.$bid,"SELECT nextval('w_business_points_id_seq') as key");
					$result = pg_execute($link,'sqli'.$bid,array());
					if (pg_num_rows($result)==1)
					while($row = pg_fetch_array($result))
					$id = $row['key'];
				
					pg_prepare($link,'sql'.$id,'insert into w_business_points(id,business_id,point_type,number_of_points,point_values,fb_point_values,twitter_point_values) values($1,$2,$3,$4,$5,$6,$7)');
					$result = pg_execute($link,'sql'.$id,array($id,$bid,$point_type,$number_of_points,$point_values,$fb_point_values,$twitter_point_values));		
				}

			}
			else
			{
			$point_type=$data->fields->point_type->value;
			$number_of_points=$data->fields->number_of_points->value;
			$point_values=$data->fields->point_values->value;
			$fb_point_values=$data->fields->fb_point_values->value;
			$twitter_point_values=$data->fields->twitter_point_values->value;
			pg_prepare($link,'sqli'.$bu,"SELECT nextval('w_business_points_id_seq') as key");
			$result = pg_execute($link,'sqli'.$bu,array());

		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				$id = $row['key'];
			
			pg_prepare($link,'sql'.$id,'insert into w_business_points(id,business_id,point_type,number_of_points,point_values,fb_point_values,twitter_point_values) values($1,$2,$3,$4,$5,$6,$7)');
			$result = pg_execute($link,'sql'.$id,array($id,$bu,$point_type,$number_of_points,$point_values,$fb_point_values,$twitter_point_values));	
			}
		}
	}
	else
	{	
		$id=$data->id;
		$point_type=$data->fields->point_type->value;
		$number_of_points=$data->fields->number_of_points->value;
		$point_values=$data->fields->point_values->value;
		$fb_point_values=$data->fields->fb_point_values->value;
		$twitter_point_values=$data->fields->twitter_point_values->value;

		pg_prepare($link,'sql2','update w_business_points set point_type=$1,number_of_points=$2,point_values=$3,fb_point_values=$4,twitter_point_values=$5 where id=$6');
		$result = pg_execute($link,'sql2',array($point_type,$number_of_points,$point_values,$fb_point_values,$twitter_point_values,$id));	

		
	}
	pg_close($link);
}
	

?>
