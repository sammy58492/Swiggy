<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAlldeliveryData':
		FetchAlldeliveryData($_POST['filters']);
	break;
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SaveDeli':
		SaveDeli($_POST['data']);
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
	case 'FetchDeliveryData':
		FetchDeliveryData($_POST['id']);
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
	SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());

	$returants = array();
	    $returant->id = "-1";
		$returant->name = "All";
		array_push($returants,$returant);
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->name = $row['name'];
		array_push($returants,$returant);
		}

	return $returants;
}
function FetchAllRestData()
{
	SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}
function FindDeliveryCharge($id)
{
	
	echo $id."Hello";	
}
function GetAlldeliveryData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
		$query = 'SELECT * FROM w_deliverykm ';

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
	
	$dliveryKm = array();
	unset($bval);
	 $allRest=GetAllRestData();
	while($row = pg_fetch_array($result))
		{
		unset($dlkm);
		unset($bval);
		$businessRecord = parse($row['business']);
		if(!empty($businessRecord)){
			foreach($businessRecord as $businessRec )
			{
				if($businessRec == -1)  {
				 $bval[]="All";
				} else {
					 unset($allb);
					 if(!empty($allRest)){
						 foreach($allRest as $allb )
						 {
							 if($allb->id == $businessRec )
							 $bval[]=$allb->name;
						 }
					 }
				}
			}
		}
		if(!empty($bval)){
			$businessRecord = implode(",",$bval);
		}
		$dlkm->id = $row['id'];
		$dlkm->name = $row['name'];
		$dlkm->business = $businessRecord;
		//$dlkm->servearea	 = $row['servearea'];
		$dlkm->maxallow = $row['maxallow']; // maximum puschase
		$dlkm->enabled = $row['enabled'];
		
		array_push($dliveryKm,$dlkm);
		}

	return $dliveryKm;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAlldeliveryData($filters)
	{
	SuperAdminsOnly();
	echo json_encode(GetAlldeliveryData($filters));
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
		pg_prepare($link,'sql','DELETE FROM w_deliverykm WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveDeli($data)
	{
		
	SuperAdminsOnly();
	
	require('../config.php');
	$form = json_decode($data);
	$adid = $form->id;
	$link = ConnectDB($CFG);	

	//print_r($form->fields);
	
		//$form->fields->zip->value = strtoupper($form->fields->zip->value);
		//$adid = InsertQuery('w_driver',$form->fields,$CFG);	
		//UpdateQuery('w_driver',$form->fields,$form->id,$CFG);
		if ($form->type=='create')
		{
		 //$adid = InsertQuery('w_shipping',$form->fields,$CFG);
				  pg_prepare($link,'sqld1','SELECT * FROM w_deliverykm ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
				
				  
				
				 
				    $name = $form->fields->name->value;
				  
				  
				  // $business =$businessdata = $form->fields->business->value;
				  
				    
				
				     $maxallow = $form->fields->maxallow->value;
				 
				   if($form->fields->business->value!="")
				 	$business = $form->fields->business->value;
					else
					$business='["-1"]';
					
					
			        //$servearea='';
				 	$servearea = $form->fields->servearea->value;
					/*if($payby == 1)
					$form->fields->commonrate->value = */
				
				 	
				
					
		
				   pg_prepare($link,'sqld2','INSERT INTO w_deliverykm (id,business,maxallow,servearea,name) VALUES ($1,$2,$3,$4,$5)');
				   $fetch_insert = pg_execute($link,'sqld2',array($incheck,$business,$maxallow,$servearea,$name));
				//$adid =InsertQuery('w_discount',$form->fields,$form->id,$CFG);
				   
		}
			else
			{ 
			$id=$form->id;
			 $name = $form->fields->name->value;
			 $maxallow = $form->fields->maxallow->value;
				 
				   if($form->fields->business->value!="")
				 	$business = $form->fields->business->value;
					else
					$business='["-1"]';
					
					
			        //$servearea='';
				 	$servearea = $form->fields->servearea->value;
		pg_prepare($link,'sqld3','UPDATE w_deliverykm SET  business=$1,maxallow=$2,servearea=$3,name=$4  WHERE id=$5 ');
				   $fetch_insert = pg_execute($link,'sqld3',array($business,$maxallow,$servearea,$name,$id));
				    	
		
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
	pg_prepare($link,'sql','UPDATE w_deliverykm SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
	function FetchDeliveryData($id)
	{
	SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_deliverykm WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($del);
			$del->id = $row['id'];
			$del->name = $row['name'];
			$del->servearea = $row['servearea'];
			$del->business = $row['business'];
			//$ad->expirydate = date('d F,Y', strtotime($row['expirydate']));
			$del->maxallow = $row['maxallow'];
			
			
			
			}
	
	echo json_encode($del);
	}	




?>
