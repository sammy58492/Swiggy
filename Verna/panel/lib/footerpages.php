<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllFooterData':
		FetchAllFooterData($_POST['filters']);
	break;
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SaveFooter':
		SaveFooter($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchAllRestData':
			FetchAllRestData();
		break;
	case 'FindDeliveryCharge' : 
	    FindDeliveryCharge($_POST['po']);
	break;
	case 'FetchFooterData':
		FetchFooterData($_POST['id']);
		break;
	default:
	case 'FindDiscountcode':
		FindDiscountcode($_POST['code']);
		break;
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/
function GetAllRestData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sql31','SELECT * from w_business WHERE enabled=$1	');
	$result = pg_execute($link,'sql31',array('TRUE'));

	$returants = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['name'];
		array_push($returants,$returant);
		}
		
		

	return $returants;
}
function FetchAllRestData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}
function FindDeliveryCharge($id)
{
	
	echo $id."Hello";	
}
function GetAllFooterData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
	if ($_SESSION['user']->level=='0')//get all franchises from which the admin is admin
		{
		$query = 'SELECT * FROM w_footer  ';
		}

	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	pg_close($link);
	
	$footers = array();
	while($row = pg_fetch_array($result))
		{
		unset($footer);
		
		$footer->id = $row['id'];
		$footer->pagename = $row['pagename'];
		$footer->pageurl = $row['pageurl'];
		$footer->type = $row['type'];
		$footer->enabled = $row['enabled'];
		
		array_push($footers,$footer);
		}

	return $footers;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAllFooterData($filters)
	{
	//SuperAdminsOnly();
	echo json_encode(GetAllFooterData($filters));
	}

/********************************************DELETE FRANCHISE****************************************************************/

function DeleteAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		//RemoveDir($CFG->dirimages . 'driver/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_footer WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveFooter($data)
	{
	
	require('../config.php');
	$form = parse($data);
	$adid = $form->id;
	$link = ConnectDB($CFG);	

	//print_r($form->fields);
	
		//$form->fields->zip->value = strtoupper($form->fields->zip->value);
		//$adid = InsertQuery('w_driver',$form->fields,$CFG);	
		//UpdateQuery('w_driver',$form->fields,$form->id,$CFG);
		if ($form->type=='create')
		{
			 pg_prepare($link,'sqld1','SELECT * FROM w_footer ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
				  
			  pg_prepare($link,'sqld2','INSERT INTO w_footer (id,type,pagename,pageurl) VALUES ($1,$2,$3,$4)');
			  
			  
			  
				  
				    $pagename = $form->fields->pagename->value;
				
				     $pageurl = $form->fields->pageurl->value;
					 
					 $type = $form->fields->type->value;
					
					
			
				
					$fetch_insert = pg_execute($link,'sqld2',array($incheck,$type,$pagename,$pageurl));
				
			}//finish while
			else
			{
				UpdateQuery('w_footer',$form->fields,$form->id,$CFG);
			}
		
		 }
		
				   


function SetEnabled($id,$enabled)
	{
		SuperAdminsOnly();
		$link = ConnectDB();		
		$data = parse($data);
		pg_prepare($link,'sql','UPDATE w_footer SET enabled=$1 WHERE id=$2');
		if (pg_execute($link,'sql',array($enabled,$id)))
			echo 'ok';
		pg_close($link);
	}
	
	function FetchFooterData($id)
	{
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_footer WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$ad->pagename = $row['pagename'];
			$ad->pageurl = $row['pageurl'];
			$ad->type = $row['type'];
			}
	
	echo json_encode($ad);
	}	




?>
