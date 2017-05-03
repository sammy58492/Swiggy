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
	case 'FetchAlldeliveryDataById':
		FetchAlldeliveryDataById($_POST['id']);
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
	
	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());

	$returants = array();
	$returant = new stdClass();
	    $returant->id = "-1";
		$returant->name = "All";
		array_push($returants,$returant);
	
	while($row = pg_fetch_array($result))
		{
		//unset($returant);
		$returant = new stdClass();
		$returant->id = $row['id'];
		$returant->name = $row['name'];
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
function GetAlldeliveryData($filters)
	{
	//SuperAdminsOnly();
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
		foreach($businessRecord as $businessRec )
		{
			if($businessRec == -1)  {
			 $bval[]="All";
			} else {
				 unset($allb);
				 foreach($allRest as $allb )
				 {
					 if($allb->id == $businessRec )
				 	 $bval[]=$allb->name;
				 }
			}
		}
		$businessRecord = implode(",",$bval);
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


function FetchAlldeliveryDataById($id)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	
	$query = 'SELECT * FROM w_deliverykm where businessid=$1 AND scriptid=$2';	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id,$_SESSION['scriptid']));

	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$dliveryKm = array();
	unset($bval);
	 $allRest=GetAllRestData();
	while($row = pg_fetch_array($result))
		{		
		//unset($dlkm);		
		$dlkm = new stdClass();
		$dlkm->id = $row['id'];
		$dlkm->name = FetchDeliveryKMLangDefault($defultlang,$row['id'],$link);
		$dlkm->business = $row['business'];
		$dlkm->maxallow = $row['maxallow']; // maximum puschase
		$dlkm->enabled = $row['enabled'];
		
		array_push($dliveryKm,$dlkm);
		
	//	}
		}

	echo json_encode($dliveryKm);
	}
	
	function FetchDeliveryKMLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_deliverykm_lang WHERE deliverykm_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAlldeliveryData($filters)
	{
	//SuperAdminsOnly();
	echo json_encode(GetAlldeliveryData($filters));
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
		pg_prepare($link,'sql','DELETE FROM w_deliverykm WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql0','DELETE FROM w_deliverykm_lang WHERE deliverykm_id=$1');
		$result = pg_execute($link,'sql0',array($id));
		pg_close($link);	
		}

	}

/*******************************************SAVE FRANCHISE*********************************************************************/
function SaveDeli($data)
	{
		
	require('../config.php');
	$data = parse($data);
	$link = ConnectDB($CFG);

	
	foreach($data->fields as $name=>$set){

		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);

		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);
			

		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	
	$form = $data;	
	$adid = $form->id;	
	$bd = parse($form->fields->business->value);
	$nameval = $form->fields->name->value;
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
			$form->fields->name->value = $nlang;
		}
	}
		$c=0;
		if ($form->type=='create')
		{
			$c++;
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
				
				   if($c =='1'){
				 $incheck1 =$incheck;
				  $usid[] = $incheck1;
				  }	  
				
				 
				    $name = $form->fields->name->value;
				  
				  
				  // $business =$businessdata = $form->fields->business->value;
				  
				   $business = $form->businessid;
				
				     $maxallow = $form->fields->maxallow->value;
				 
				  /* if($form->fields->business->value!="")
				 	$business = $form->fields->business->value;
					else
					$business='["-1"]';*/
					
					
			        //$servearea='';
				 	$servearea = $form->fields->servearea->value;
					/*if($payby == 1)
					$form->fields->commonrate->value = */
				$scriptid = $_SESSION['scriptid'];
				 	
				
					
		
				   pg_prepare($link,'sqld2','INSERT INTO w_deliverykm (id,businessid,maxallow,servearea,name,businessinsertid,scriptid) VALUES ($1,$2,$3,$4,$5,$6,$7)');
				   $fetch_insert = pg_execute($link,'sqld2',array($incheck,$business,$maxallow,$servearea,$name,$incheck1,$scriptid));
				
				
				foreach($namelang as $key=>$nlang){
			$userid = implode($usid);
			if(!empty($nlang)){		
				unset($datas->fields);
				$datas->fields->deliverykm_id = new stdClass();
				$datas->fields->deliverykm_id->ivalue = '';
				$datas->fields->deliverykm_id->value = $userid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->name_lang = new stdClass();
				$datas->fields->name_lang->value = $nlang;
				$datas->fields->name_lang->ivalue = '';
				

				InsertQuery('w_deliverykm_lang',$datas->fields,$CFG);
			}				
		}
				   
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
				    	
				
				foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){
				$link = ConnectDB();	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_deliverykm_lang where lang_id=$1 AND deliverykm_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$adid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->deliverykm_id = new stdClass();
					$forms->fields->deliverykm_id->ivalue = '';
					$forms->fields->deliverykm_id->value = $adid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';

					InsertQuery('w_deliverykm_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_deliverykm_lang SET name_lang=$1 where lang_id=$2 and deliverykm_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$key,$adid));					
				}
									
			}				
		}
				
			}
	 

	}



function SetEnabled($id,$enabled)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_deliverykm SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
	
	function FetchDeliveryData($id)
	{
	//SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_deliverykm WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqldzonekmlang','SELECT * from w_deliverykm_lang WHERE deliverykm_id=$1');
	$result1 = pg_execute($link,'sqldzonekmlang',array($id));
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			//unset($del);
			$del = new stdClass();
			$del->id = new stdClass();
			$del->id = $row['id'];
			$namearray=array();				
			$idarray = array();
			
			while($row1 = pg_fetch_array($result1))
			{
				$namearray[$row1['lang_id']] = $row1['name_lang'];
				$idarray[$row1['lang_id']] = $row1['id'];
			
			}
			$del->name = $namearray;
			$del->langid = $idarray;
			$del->servearea = $row['servearea'];
			$del->business = $row['businessid'];
			$del->maxallow = $row['maxallow'];
			
			
			
			}
	
	echo json_encode($del);
	}	




?>
