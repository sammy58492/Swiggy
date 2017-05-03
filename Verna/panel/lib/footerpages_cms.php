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
	case 'FetchAllRestData':
			FetchAllRestData();
	break;
	case 'SaveFooter':
		SaveFooter($_POST['data']);
	break;
	
	case 'CheckCustomUrl':
		CheckCustomUrl($_POST['data']);
	break;
	
	
	
	
		
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
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

/*************** FETCH FOOTER CMS DATA *************************/

function GetAllFooterData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	if ($_SESSION['user']->level=='0')//get all franchises from which the admin is admin
		{
		$query = 'SELECT * FROM w_footercms  ';
		}

	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	pg_close($link);
	
	$footers = array();
	while($row = pg_fetch_array($result))
		{
		unset($footer);
		
		$footer->id = $row['id'];
		$footer->pagetitle = $row['pagetitle'];
		$footer->pageheading = $row['pageheading'];
		$footer->pagecontent = $row['pagecontent'];
		$footer->customurl = $row['customurl'];
		$footer->metakeyword = $row['metakeyword'];
		$footer->metacontent = $row['metacontent'];
		$footer->type = $row['type'];
		$footer->enabled = $row['enabled'];
		
		array_push($footers,$footer);
		}

	return $footers;
	}
	
function FetchAllFooterData($filters)
{
	//SuperAdminsOnly();
	echo json_encode(GetAllFooterData($filters));
}


/*************** FETCH FOOTER CMS DATA *************************/

/**/
function FetchAllRestData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}

/*****************************************CHECKCUSTOMURL*********************************************/

function CheckCustomUrl($data){

	
	require('../config.php');
	$form = parse($data);
	$adid = $form->id;
	$link = ConnectDB($CFG);	

	if($adid){
		pg_prepare($link,'sql','SELECT id from w_footercms WHERE customurl=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($form->fields->customurl->value,$adid));
	}else{
		pg_prepare($link,'sql','SELECT id from w_footercms WHERE customurl=$1');
		$result = pg_execute($link,'sql',array($form->fields->customurl->value));
	}
	
	if (pg_num_rows($result)==0)
		echo 'ok';
}


/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveFooter($data)
	{
	//echo $data;
	require('../config.php');
	$form = parse($data);
	$adid = $form->id;
	$link = ConnectDB($CFG);	
	
	
	
	
	$form->fields->pagecontent->value = str_replace("@@@","&", $form->pagecontent);
	
	
	
	
		if ($form->type=='create')
		{
			 pg_prepare($link,'sqld1','SELECT * FROM w_footercms ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
				  
			  pg_prepare($link,'sqld2','INSERT INTO w_footercms (id,type,pagetitle,pageheading,pagecontent,customurl,metakeyword,metacontent) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
			  
			  
			  
				  
				    $pagetitle = $form->fields->pagetitle->value;
				
				     $pageheading = $form->fields->pageheading->value;
					 $pagecontent = $form->fields->pagecontent->value;
					 $customurl = $form->fields->customurl->value;
					 $metakeyword = $form->fields->metakeyword->value;					 
					 $metacontent = $form->fields->metacontent->value;
					 
					 $type = $form->fields->type->value;
					
					
			
				
					$fetch_insert = pg_execute($link,'sqld2',array($incheck,$type,$pagetitle,$pageheading,$pagecontent,$customurl,$metakeyword,$metacontent));
				
			}//finish while
			else
			{
				
				
				UpdateQuery('w_footercms',$form->fields,$form->id,$CFG);
			}
		
		 }
		
/*******************************************SAVE FRANCHISE*********************************************************************/
/*******************************************set enabled*********************************************************************/

function SetEnabled($id,$enabled)
	{
		SuperAdminsOnly();
		$link = ConnectDB();		
		$data = parse($data);
		pg_prepare($link,'sql','UPDATE w_footercms SET enabled=$1 WHERE id=$2');
		if (pg_execute($link,'sql',array($enabled,$id)))
			echo 'ok';
		pg_close($link);
	}

/*******************************************set enabled*********************************************************************/



	
	function FetchFooterData($id)
	{
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_footercms WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$ad->pagetitle = $row['pagetitle'];
			$ad->pageheading = $row['pageheading'];
			$ad->pagecontent = $row['pagecontent'];
			$ad->customurl = $row['customurl'];
			$ad->metakeyword = $row['metakeyword'];
			$ad->metacontent = $row['metacontent'];
			
			$ad->type = $row['type'];
			}
	
	echo json_encode($ad);
	}	



function DeleteAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		//RemoveDir($CFG->dirimages . 'driver/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_footercms WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}


?>
