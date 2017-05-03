<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllDiscountData':
		FetchAllDiscountData($_POST['filters']);
	break;
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SaveDiscount':
		SaveDiscount($_POST['data']);
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
	case 'FetchDiscountData':
		FetchDiscountData($_POST['id']);
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
	$returants = array();
   if ($_SESSION['user']->level==0) {
	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());
	    $returant->id = "-1";
		$returant->name = "All";
		array_push($returants,$returant);
       }
	   else if ($_SESSION['user']->level == 1) {
	pg_prepare($link,'sql31','SELECT * from w_business WHERE provider = $1');
	$result = pg_execute($link,'sql31',array($_SESSION['user']->id));
       }
	else if ($_SESSION['user']->level == 2) {
	pg_prepare($link,'sql31','SELECT * from w_business WHERE provider = $1');
	$result = pg_execute($link,'sql31',array($_SESSION['user']->id));
       }else{
		return $returants;
		  }

	
	if(pg_num_rows($result) !=0){  
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->name = $row['name'];
		array_push($returants,$returant);
		}
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
function GetAllDiscountData($filters)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
		$query = 'SELECT * FROM w_discount';

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
		
	
	 if ($_SESSION['user']->level==0) {
	  pg_prepare($link,'sqlb','SELECT * FROM w_business');
	  $resultD = pg_execute($link,'sqlb',array());
	   
	 }else if ($_SESSION['user']->level==1) {
	
	pg_prepare($link,'sqlb','SELECT * from w_business WHERE provider = $1');
	$resultD = pg_execute($link,'sqlb',array($_SESSION['user']->id));
	
	  }
	  else if ($_SESSION['user']->level==2) {
	
	pg_prepare($link,'sqlb','SELECT * from w_business WHERE provider = $1');
	$resultD = pg_execute($link,'sqlb',array($_SESSION['user']->id));
	
	  }
	  while($rows = pg_fetch_array($resultD))
		{
			$business_store[] = $rows['id'];
		}
		
		//print_r($business_store);
		
	$result = pg_execute($link,'sql',$conditionalsvalues);
	
	
	
	$drivers = array();
	while($row = pg_fetch_array($result))
		{
		unset($driver);
		$allbusiness = parse($row['business']);
		
		if(array_intersect($allbusiness,$business_store) || in_array("-1",$allbusiness)) {
	
				$driver->id = $row['id'];
				$driver->code = $row['code'];
				$driver->expirydate = date('d F,Y', strtotime($row['expirydate']));
				$driver->user = $row['user'];
				$driver->hits = $row['hits'];
				$driver->enabled = $row['enabled'];
				$driver->maxallow = $row['maxallow'];
				$driver->minshop = $row['minshop'];
				
				array_push($drivers,$driver);
				}
		}
		pg_close($link);

	return $drivers;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAllDiscountData($filters)
	{
	//SuperAdminsOnly();
	echo json_encode(GetAllDiscountData($filters));
	}

/********************************************DELETE FRANCHISE****************************************************************/

function DeleteAd($data)
	{
	//SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		//RemoveDir($CFG->dirimages . 'driver/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_discount WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveDiscount($data)
	{
		
	//SuperAdminsOnly();
	
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
		 //$adid = InsertQuery('w_shipping',$form->fields,$CFG);
				  pg_prepare($link,'sqld1','SELECT * FROM w_discount ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
				
				  
				
				 
				    $code = $form->fields->code->value;
				  
				  
				  // $business =$businessdata = $form->fields->business->value;
				  
				    $commonrate = $form->fields->commonrate->value;
				
				     $maxallow = $form->fields->maxallow->value;
				 
				   if($form->fields->business->value!="")
				 	$business = $form->fields->business->value;
					else
					$business='["-1"]';
					
					$validdays = $form->fields->validdays->value;
			
				 	$payby = $form->fields->payby->value;
					/*if($payby == 1)
					$form->fields->commonrate->value = */
				
				 	$currentdate = date('Y-m-d');
				
				 	$expirydate = date("Y-m-d", strtotime($currentDate  . " + ".$validdays." day"));
					$minshop =$form->fields->minshop->value;
				
					
		
				   pg_prepare($link,'sqld2','INSERT INTO w_discount (id,code,business,commonrate,maxallow,validdays,payby,expirydate,currentdate,minshop) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)');
				   $fetch_insert = pg_execute($link,'sqld2',array($incheck,$code,$business,$commonrate,$maxallow,$validdays,$payby,$expirydate,$currentdate,$minshop));
				//$adid =InsertQuery('w_discount',$form->fields,$form->id,$CFG);
				   
		}
			else
			{ 
					if($form->fields->payby->value ==1)
					{
					$form->fields->commonrate = $form->fields->commonratetype1;
					unset($form->fields->commonratetype1);
					unset($form->fields->commonratetype2);
					}
					else if ($form->fields->payby->value ==2)
					{
					$form->fields->commonrate = $form->fields->commonratetype2;
					unset($form->fields->commonratetype1);
					unset($form->fields->commonratetype2);
					}
				/*$form->fields->commonrate = $form->fields->commonratetype1
				echo '<pre>';
				$form->fields->commo*/
				/*print_r($form->fields);
				exit();*/
		 if($form->fields->validdays->value!="")
					 {
					 $uexpirydate = date("Y-m-d", strtotime($currentDate  . " + ".$form->fields->validdays->value." day"));
					 pg_prepare($link,'sqld5','UPDATE w_discount SET expirydate =$1 WHERE id = $2'); 
					 $fetch_insert = pg_execute($link,'sqld5',array($uexpirydate,$form->id));
					 }	
		//if($form->fields->validdays->value!="")		 	
		 UpdateQuery('w_discount',$form->fields,$form->id,$CFG);
		 
					
		 
			}
	 
	 

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
/*	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'driver/',$oldname,$adid,false,0);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'driver/dummy.jpg';
			MoveImages($CFG->dirimages . 'driver/',$oldname,$adid,true,0);
	    	}*/

	}



function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_discount SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
	function FetchDiscountData($id)
	{
	//SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_discount WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$ad->code = $row['code'];
			$ad->business = $row['business'];
			//$ad->expirydate = date('d F,Y', strtotime($row['expirydate']));
			$ad->commonrate = $row['commonrate'];
			$ad->validdays = $row['validdays'];
			$ad->hits = $row['hits'];
			$ad->enabled = $row['status']; 	
			$ad->maxallow = $row['maxallow'];
			$ad->payby = $row['payby'];
			$ad->minshop = $row['minshop'];
			
			}
	
	echo json_encode($ad);
	}	




?>
