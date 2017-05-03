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
	case 'SaveZone':
		SaveZone($_POST['data']);
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
function GetAllDeliveryData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
		$query = 'SELECT * FROM w_deliveryzone';

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
	
	$drivers = array();
	while($row = pg_fetch_array($result))
		{
		unset($driver);
				
		$driver->id = $row['id'];
		$driver->zonename = $row['zonename'];
		$driver->location = $row['location'];
		$driver->deliveryprice = GetDecimalPoint($row['deliveryprice']);
		$driver->enabled = $row['enabled'];
		$driver->business = $row['business'];
		array_push($drivers,$driver);
		}

	return $drivers;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAlldeliveryData($filters)
	{
	SuperAdminsOnly();
	echo json_encode(GetAllDeliveryData($filters));
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
		pg_prepare($link,'sql','DELETE FROM w_deliveryzone WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveZone($data)
	{
		
	SuperAdminsOnly();
	
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
				  pg_prepare($link,'sqldz1','SELECT * FROM w_deliveryzone ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqldz1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
				
				  
				
				 
				  
				     $zonename = $form->fields->zonename->value;
				 
				   if($form->fields->business->value!="")
				 	$business = $form->fields->business->value;
					else
					$business='["-1"]';
					
					if($form->fields->days->value!="")
				 	$days = $form->fields->days->value;
					else
					$days='[0]';
					
					
			       $address	 = $form->fields->address->value;
				   $zones	 = $form->fields->zones->value;
				   $deliveryprice	 = GetDecimalPoint($form->fields->deliveryprice->value);
				   $minpurchase	 = GetDecimalPoint($form->fields->minpurchase->value);
				   $schedule	 = $form->fields->schedule->value;
				   $days	 = $form->fields->days->value;
					
				
					
		
				   pg_prepare($link,'sqldz12','INSERT INTO w_deliveryzone (id,zonename,location,deliveryprice,business,address,minpurchase,schedule,days) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
				   $fetch_insert = pg_execute($link,'sqldz12',array($incheck,$zonename,$zones,$deliveryprice,$business,$address,$minpurchase,$schedule,$days));
				//$adid =InsertQuery('w_discount',$form->fields,$form->id,$CFG);
				   
		}
			else
			{ 
				 $zonename = $form->fields->zonename->value;
				 
				   if($form->fields->business->value!="") {
				 	$business = $form->fields->business->value;
					//print($form->fields->business->value);
					$arr = explode('"-1"',$form->fields->business->value);
					
						if(count($arr)>1)
						{
						$business='["-1"]';
						}
						else
						{
							$business = $form->fields->business->value;
						}
					}
					else
					{
					$business='["-1"]';
					}
					
					  if($form->fields->days->value!="") {
				 	$days = $form->fields->days->value;
					//print($form->fields->business->value);
					$arrd= explode('0',$form->fields->days->value);
					
						if(count($arrd)>1)
						{
						$days='[0]';
						}
						else
						{
							$days = $form->fields->days->value;
						}
					}
					else
					{
					$days='[0]';
					}
					
					
			       $address	 = $form->fields->address->value;
				   $zones	 = $form->fields->zones->value;
				   $minpurchase	 = GetDecimalPoint($form->fields->minpurchase->value);
				   
				 	$deliveryprice	 = GetDecimalPoint($form->fields->deliveryprice->value);
					 $schedule	 = $form->fields->schedule->value;
					$id = $form->id;
				pg_prepare($link,'sql','UPDATE w_deliveryzone SET zonename=$1,location=$2,deliveryprice=$3,business=$4,address=$5,minpurchase=$6,schedule=$7,days=$8 WHERE id=$9');
				pg_execute($link,'sql',array($zonename,$zones,$deliveryprice,$business,$address,$minpurchase,$schedule,$days,$id));
					
				pg_close($link);
		 /*UpdateQuery('w_deliveryzone',$form->fields,$form->id,$CFG);
		 
					*/
		 
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
	pg_prepare($link,'sql','UPDATE w_deliveryzone SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
	function FetchDiscountData($id)
	{
	SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_deliveryzone WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$ad->zonename = $row['zonename'];
			$ad->business = $row['business'];
			$ad->address = $row['address'];
			$ad->location = $row['location'];
			//$ad->expirydate = date('d F,Y', strtotime($row['expirydate']));
			$ad->deliveryprice = $row['deliveryprice'];
			$ad->schedule = $row['schedule'];
			$ad->days = $row['days'];
			
			$ad->minpurchase = $row['minpurchase'];
			$ad->enabled = $row['enabled']; 	
			
			}
	
	echo json_encode($ad);
	}	




?>
