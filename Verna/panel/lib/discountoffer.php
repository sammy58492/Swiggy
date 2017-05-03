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
function GetAllDiscountData($filters)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
	if ($_SESSION['user']->level=='0')//get all franchises from which the admin is admin
		{
		$query = 'SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id  ';
		}
	else if ($_SESSION['user']->level=='2')//get all franchises from which the admin is admin
		{
		$query = 'SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id WHERE  w_business.provider=$1  ';	
		
		array_push($conditionalsvalues,$_SESSION['user']->id);
		//array()
		}
	else if ($_SESSION['user']->level=='1')//get all franchises from which the admin is admin
		{
				//array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			//array_push($filters,json_decode('{"conditional":"OR","modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
			$query = 'SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id  ';
		}

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
	
	$offers = array();
	while($row = pg_fetch_array($result))
		{
		unset($offer);
		
		$offer->id = $row['id'];
		$offer->business = $row['bname'];
		//$driver->expirydate = date('d F,Y', strtotime($row['expirydate']));
		$offer->discounttext = $row['discounttext'];
		$offer->startdate = $row['startdate'];
		$offer->enddate = $row['enddate'];
		$offer->enabled = $row['accept'];
		
		array_push($offers,$offer);
		}

	return $offers;
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
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		//RemoveDir($CFG->dirimages . 'driver/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_discountoffer WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveDiscount($data)
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
			  pg_prepare($link,'sqld2','INSERT INTO w_discountoffer (id,discountype,rate,minshop,validdays,createdate,discounttext,business) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
			  
			  
			  $offerbusiness = parse($form->fields->offerbusiness->value);
			  
			  //count($offerbusiness);
			  
		
		 if(count($offerbusiness) == 0 || in_array("-1",$offerbusiness) )
		 {
			pg_prepare($link,'sqlb3','SELECT id from w_business WHERE enabled=$1');
		    $final = pg_execute($link,'sqlb3',array('TRUE'));
			while($rs = pg_fetch_array($final))
			{
				  pg_prepare($link,'sqld1','SELECT * FROM w_discountoffer ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }

				  $discountype = $form->fields->discountype->value;
				  
				  
				  // $business =$businessdata = $form->fields->business->value;
				  
				    $rate = $form->fields->commonrate->value;
				
				     $minshop = $form->fields->minshop->value;
				 
				 	$validdays = $form->fields->validdays->value;
					
					$discounttext = $form->fields->discounttext->value;
				
					$business = $rs['id'];
					
					
			
				 	
					/*if($payby == 1)
					$form->fields->commonrate->value = */
				
				 	$currentdate = date('Y-m-d');
				
				 	$expirydate = date("Y-m-d", strtotime($currentDate  . " + ".$validdays." day"));
				
					$fetch_insert = pg_execute($link,'sqld2',array($incheck,$discountype,$rate,$minshop,$validdays,'NOW()',$discounttext,$business));
				
			}//finish while
		
		 }
		 else
		 {
				
			for($i=0;$i<count($offerbusiness);$i++)
			{
				  pg_prepare($link,'sqld1','SELECT * FROM w_discountoffer ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }

				  $discountype = $form->fields->discountype->value;
				  
				  
				  // $business =$businessdata = $form->fields->business->value;
				  
				    $rate = $form->fields->commonrate->value;
				
				     $minshop = $form->fields->minshop->value;
				 
				 	$validdays = $form->fields->validdays->value;
					
					$discounttext = $form->fields->discounttext->value;
				
					$business = $offerbusiness[$i];
					
					
			
				 	
					/*if($payby == 1)
					$form->fields->commonrate->value = */
				
				 	$currentdate = date('Y-m-d');
				
				 	$expirydate = date("Y-m-d", strtotime($currentDate  . " + ".$validdays." day"));
				
					$fetch_insert = pg_execute($link,'sqld2',array($incheck,$discountype,$rate,$minshop,$validdays,'NOW()',$discounttext,$business));
				
			}//finish while
		 }
				   
		}
			else
			{ 
					if($form->fields->discountype->value ==1)
					{
					$form->fields->rate = $form->fields->commonratetype1;
					unset($form->fields->commonratetype1);
					unset($form->fields->commonratetype2);
					}
					else if ($form->fields->discountype->value ==2)
					{
					$form->fields->rate = $form->fields->commonratetype2;
					unset($form->fields->commonratetype1);
					unset($form->fields->commonratetype2);
					}
			
		           if($form->fields->validdays->ivalue!=$form->fields->validdays->value)
					 {
						  pg_prepare($link,'sqlst1','SELECT * FROM w_discountoffer WHERE id=$1');
							 $rec = pg_execute($link,'sqlst1',array($form->id));
							 $recDate = pg_fetch_array($rec);
						if($recDate['accept']==true)	
						{ 
							 $stData =$recDate['startdate'];	 
							 $enddate = date("Y-m-d", strtotime($stData  . " + ".$form->fields->validdays->value." day"));
							 pg_prepare($link,'sqld5','UPDATE w_discountoffer SET enddate =$1 WHERE id = $2'); 
							 $fetch_insert = pg_execute($link,'sqld5',array($enddate,$form->id));
						}
				  }	
		//if($form->fields->validdays->value!="")		 	
		 UpdateQuery('w_discountoffer',$form->fields,$form->id,$CFG);
		 	 
			}
	
	}


function SetEnabled($id,$enabled)
	{
	$link = ConnectDB();		
	$data = parse($data);
	 pg_prepare($link,'sqlst','SELECT * FROM w_discountoffer WHERE id=$1');
	 $rec = pg_execute($link,'sqlst',array($id));
	 $recDate = pg_fetch_array($rec);
	 if($enabled == "true")
	 {
		 $startdate = date('Y-m-d');
		 $enddate = date("Y-m-d", strtotime($startdate  . " + ".$recDate['validdays']." day"));
		// $enddate ='now()+7days';
     }
	 else
	 {
		 $startdate = NULL;
		 $enddate = NULL;
		
	 }
	 
	
	pg_prepare($link,'sql','UPDATE w_discountoffer SET startdate=$1,enddate=$2,accept=$3 WHERE id=$4'); 
	 
	if (pg_execute($link,'sql',array($startdate,$enddate,$enabled,$id)))
	{
		
		echo $enabled;
	}
	pg_close($link);
	}
	
	function FetchDiscountData($id)
	{
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id  WHERE w_discountoffer.id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$ad->discountype = $row['discountype'];
			$ad->rate = $row['rate'];
			$ad->minshop = $row['minshop'];
			$ad->discounttext = $row['discounttext'];
			//$ad->expirydate = date('d F,Y', strtotime($row['expirydate']));
			$ad->validdays = $row['validdays'];
			$ad->business = $row['business']; 	
			$ad->bname = $row['bname']; 	
			}
	
	echo json_encode($ad);
	}	




?>
