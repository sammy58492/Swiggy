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
		//unset($returant);
		$returant = new stdClass();
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
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result4 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result4);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}	

	$conditionalsvalues = array();
	//$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';
	if ($_SESSION['user']->level=='0')//get all franchises from which the admin is admin
		{
		$query = 'SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id where w_discountoffer.scriptid=$1';
		array_push($conditionalsvalues,$_SESSION['scriptid']);
		}
	else if ($_SESSION['user']->level=='2')//get all franchises from which the admin is admin
		{
		$query = 'SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id WHERE  w_business.provider=$1 AND w_discountoffer.scriptid=$2';	
		
		array_push($conditionalsvalues,$_SESSION['user']->id,$_SESSION['scriptid']);
		//array()
		}
	else if ($_SESSION['user']->level=='1')//get all franchises from which the admin is admin
		{
				//array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			//array_push($filters,json_decode('{"conditional":"OR","modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
			$query = 'SELECT w_discountoffer.*,w_business.name AS bname FROM w_discountoffer LEFT JOIN w_business ON w_discountoffer.business =  w_business.id where w_discountoffer.scriptid=$1';
			array_push($conditionalsvalues,$_SESSION['scriptid']);
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

	$c=0;
	$offers = array();
	while($row = pg_fetch_array($result))
		{
	//		unset($offer);
		$offer = new stdClass();
		$offer->id = $row['id'];
		$offer->business = FetchBusinessdiscountLangDefault($defultlang,$row['business'],$link,$c);
		//$driver->expirydate = date('d F,Y', strtotime($row['expirydate']));
		$offer->discounttext = FetchdiscountofferLangDefault($defultlang,$row['id'],$link,$c);
		$offer->startdate = $row['startdate'];
		$offer->enddate = $row['enddate'];
		$offer->enabled = $row['accept'];
		$c++;
		if($offer->discounttext !=null)
		array_push($offers,$offer);
		}

	return $offers;
	}
	
function FetchBusinessdiscountLangDefault($defultlang,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlang884'.$cid.$c,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang884'.$cid.$c,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}	

function FetchdiscountofferLangDefault($defultlang,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlang889'.$cid.$c,'SELECT * from w_discountoffer_lang WHERE disoffer_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang889'.$cid.$c,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['discounttext_lang'];
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
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_discountoffer WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql0','DELETE FROM w_discountoffer_lang WHERE disoffer_id=$1');
		$result = pg_execute($link,'sql0',array($id));
		pg_close($link);
		}

	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveDiscount($data)
	{
	
	require('../config.php');
	$data = parse($data);
	$link = ConnectDB($CFG);	

		$temp=null;
	
	foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);
		
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);	


	}
	
	foreach($data->ad as $name=>$set){
		$set = str_replace("@@","+",$set);
		$set = base64_decode($set);

		$data->ad->$name = base64_decode($set);	

		$data->ad->$name = str_replace("@@","+",$data->ad->$name);


	}
	
	$form = $data;	
	//print_r($form);
	$adid = $form->id;
	$nameval = $form->fields->discounttext->value;
	$namelang = explode(",",$nameval);
		
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($namelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->discounttext->value = $nlang;
		}
	}	
	$usid = array();	
		
		if ($form->type=='create')
		{
			  pg_prepare($link,'sqld2','INSERT INTO w_discountoffer (id,discountype,rate,minshop,validdays,createdate,discounttext,business,scriptid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');			  
			  $offerbusiness = parse($form->fields->offerbusiness->value);
		
		 if(count($offerbusiness) == 0 || in_array("-1",$offerbusiness) ){
			 
			pg_prepare($link,'sqlb3','SELECT id from w_business WHERE enabled=$1');
			$final = pg_execute($link,'sqlb3',array('TRUE'));
			$c=0;
			while($rs = pg_fetch_array($final)){
				
				$c++;
				pg_prepare($link,'sqld1','SELECT * FROM w_discountoffer ORDER BY id DESC');
				$fetch_record = pg_execute($link,'sqld1',array());
				
				if(pg_num_rows($fetch_record) == 0) { 
					$incheck = 1;
					$usid[] = $incheck;
				} else { 
					$all_rec= pg_fetch_array($fetch_record);
					$incheckpre= $all_rec['id'];
					$incheck = $incheckpre + 1;
					$usid[] = $incheck;
				}				
				
				$discountype = $form->fields->discountype->value;				
				$rate = $form->fields->commonrate->value;				
				$minshop = $form->fields->minshop->value;				
				$validdays = $form->fields->validdays->value;				
				$discounttext = $form->fields->discounttext->value;
								
				$business = $rs['id'];
				$scriptid = $_SESSION['scriptid'];				
				
			
				$currentdate = date('Y-m-d');				
				$expirydate = date("Y-m-d", strtotime($currentDate  . " + ".$validdays." day"));				
				$fetch_insert = pg_execute($link,'sqld2',array($incheck,$discountype,$rate,$minshop,$validdays,'NOW()',$discounttext,$business,$scriptid));		
			
			}//finish while			
		}else{			 
			pg_prepare($link,'sqld1','SELECT * FROM w_discountoffer ORDER BY id DESC');			
			$c=0;
			for($i=0;$i<count($offerbusiness);$i++){
				$c++;
				$fetch_record = pg_execute($link,'sqld1',array());				
				if(pg_num_rows($fetch_record) == 0) { 
					$incheck = 1;
					$usid[] = $incheck;
				} else { 
					$all_rec= pg_fetch_array($fetch_record);
					$incheckpre= $all_rec['id'];
					$incheck = $incheckpre + 1;
					$usid[] = $incheck;
				}	
				
				$discountype = $form->fields->discountype->value;			
				$rate = $form->fields->commonrate->value;				
				$minshop = $form->fields->minshop->value;				
				$validdays = $form->fields->validdays->value;				
				$discounttext = $form->fields->discounttext->value;
				
				$business = $offerbusiness[$i];
				$scriptid = $_SESSION['scriptid'];			
			
				
				$currentdate = date('Y-m-d');				
				$expirydate = date("Y-m-d", strtotime($currentDate  . " + ".$validdays." day"));				
				$fetch_insert = pg_execute($link,'sqld2',array($incheck,$discountype,$rate,$minshop,$validdays,'NOW()',$discounttext,$business,$scriptid));		
				
			}//finish while
		 }
		 
		
		foreach($usid as $key1=>$value1){
			foreach($namelang as $key=>$nlang){			
				if(!empty($nlang)){		
					unset($forms->fields);
					$forms->fields->disoffer_id = new stdClass();
					$forms->fields->disoffer_id->ivalue = '';
					$forms->fields->disoffer_id->value = $value1;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->discounttext_lang = new stdClass();
					$forms->fields->discounttext_lang->value = $nlang;
					$forms->fields->discounttext_lang->ivalue = '';
	
					InsertQuery('w_discountoffer_lang',$forms->fields,$CFG);
				}				
			}
		}
		 
		
				   
		}
			else
			{ 
					/*if($form->fields->discountype->value ==1)
					{*/
					$form->fields->rate = $form->fields->commonrate;
					unset($form->fields->commonrate);
					//unset($form->fields->commonratetype2);
					//}
					/*else if ($form->fields->discountype->value ==2)
					{
					$form->fields->rate = $form->fields->commonratetype2;
					unset($form->fields->commonratetype1);
					unset($form->fields->commonratetype2);
					}*/
			
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
	foreach($form->fields as $name=>$set){
	
	$temp->$name->value=$set->value;
	}
		//if($form->fields->validdays->value!="")		 	
		 UpdateQuery('w_discountoffer',$temp,$form->id,$CFG);
		 
		 foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_discountoffer_lang where lang_id=$1 AND disoffer_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$form->id));
				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->disoffer_id = new stdClass();
					$forms->fields->disoffer_id->ivalue = '';
					$forms->fields->disoffer_id->value = $form->id;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->discounttext_lang = new stdClass();
					$forms->fields->discounttext_lang->value = $nlang;
					$forms->fields->discounttext_lang->ivalue = '';

					InsertQuery('w_discountoffer_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_discountoffer_lang SET discounttext_lang=$1  where lang_id=$2 and disoffer_id=$3');
					pg_execute($link,'sqllangupdate',array($nlang,$key,$form->id));					
				}
								
			}				
		}
		 	 
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
	
	pg_prepare($link,'sqllang','SELECT * from w_discountoffer_lang WHERE disoffer_id=$1');
	

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			//unset($ad);
			$ad = new stdClass();
			$ad->id = $row['id'];
			$ad->discountype = $row['discountype'];
			$ad->rate = $row['rate'];
			$ad->minshop = $row['minshop'];
			
			$langarray=array();	
			$idarray = array();
			$result2 = pg_execute($link,'sqllang',array($row['id']));
			while($row2 = pg_fetch_array($result2)){
				$langarray[$row2['lang_id']] = $row2['discounttext_lang'];
				$idarray[$row2['lang_id']] = $row2['id'];
			}
			
			$ad->discounttext = $langarray;
			$ad->langid = $idarray;
			//$ad->expirydate = date('d F,Y', strtotime($row['expirydate']));
			$ad->validdays = $row['validdays'];
			$ad->business = $row['business']; 	
			$ad->bname = $row['bname']; 	
			}
	
	echo json_encode($ad);
	}	




?>
