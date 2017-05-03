<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchReservationData':
		FetchReservationData($_POST['id']);
	break;
	case 'FetchAllReservationData':
		FetchAllReservationData($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'SaveReserveData':
		SaveReserveData($_POST['data']);
	break;
	case 'DeleteReservation':
		DeleteReservation($_POST['data']);
	break;
	
	case 'FetchAllPriceData':
		FetchAllPriceData($_POST['id']);
	break;
	case 'SaveReservePrice':
		SaveReservePrice($_POST['data']);
	break;
	
	default:
		die();
	break;
	}
	
	/********************** FETCH RESERVATION DATA ***********************/
	
function FetchReservationData($id){
	$link = ConnectDB();

	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows['id'];
	}else{
		$defultlang = $_SESSION['admin_lang'];	
	}


	$reserve = array();

	$query = 'SELECT * FROM w_reserve where business=$1 AND scriptid=$2';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id,$_SESSION['scriptid']));

	while($row = pg_fetch_array($result)){
		$rese = new stdClass();
		
		$rese->id = $row['id'];
		$rese->name = FetchReserveDataLangDefault($defultlang,$row['id'],$link);
		$rese->days = $row['days'];
		if($row['rtype'] == 1)
			$rese->rtype="Table";
		if($row['rtype'] == 2)
			$rese->rtype="Room";
		if($row['rtype'] == 3)
			$rese->rtype="Free";				
		$rese->guest = $row['guest'];
		$rese->enabled = $row['enabled'];
		array_push($reserve,$rese);
	}
	echo json_encode($reserve);
	pg_close($link);
}
	
function FetchReserveDataLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_reserve_lang WHERE reserve_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function FetchAllReservationData($data){
	$link = ConnectDB();

	$reserve = array();
	pg_prepare($link,'sql2','SELECT * from w_reserve WHERE id=$1');
	$result = pg_execute($link,'sql2',array($data));

	pg_prepare($link,'sql2langdata','SELECT * from w_reserve_lang WHERE reserve_id=$1');
	$result1 = pg_execute($link,'sql2langdata',array($data));

	while($row = pg_fetch_array($result)){
		$rese = new stdClass();	
		$rese->id = $row['id'];
		$idarray=array();
		$namearray=array();
		while($row1 = pg_fetch_array($result1)){
			$namearray[$row1['lang_id']] = $row1['name_lang'];
			$idarray[$row1['lang_id']] = $row1['id'];
		}

		$rese->name = $namearray;
		$rese->langid = $idarray;
		$rese->days = $row['days'];
		$rese->rtype= $row['rtype'];		
		$rese->guest = $row['guest'];
		$rese->schedule = $row['schedule'];
		$rese->duration = $row['duration'];
		$rese->enabled = $row['enabled'];
	}
	echo json_encode($rese);
	pg_close($link);
}	
	
function SetEnabled($id,$enabled){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_reserve SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}	
	
function SaveReserveData($data)
	{
	require('../config.php');
	$link = ConnectDB();
	$data = json_decode($data);
	//$temp=null;
	//if(is_array($data->fields)){
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
	//}
	
	/*foreach($data->reserv as $name=>$set){
		$data->reserv->$name = base64_decode($set);*/

		/*$varr2 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set)); 
		$data->reserv->$name = html_entity_decode($varr2,null,'UTF-8');*/

	/*}*/
	
	$form = $data;	
	$id = $form->id;
	
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);
	$usrid = $form->id;

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

	foreach($form->fields as $name=>$set){
		//$form->$name = new stdClass;
		$temp->$name->value=$set->value;
		}

	
	if ($form->type=='create')
		{
		$id = InsertQuery('w_reserve',$temp,$CFG);	
		echo $id;
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				unset($forms->fields);
				$forms->fields->reserve_id = new stdClass();
				$forms->fields->reserve_id->ivalue = '';
				$forms->fields->reserve_id->value = $id;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->name_lang = new stdClass();
				$forms->fields->name_lang->value = $nlang;
				$forms->fields->name_lang->ivalue = '';

				InsertQuery('w_reserve_lang',$forms->fields,$CFG);
			}				
		}
		
		
		}
		else
		UpdateQuery('w_reserve',$temp,$form->id,$CFG);
		
		foreach($namelang as $key=>$nlang){
			echo $nlang;
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_reserve_lang where lang_id=$1 AND reserve_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$id));
				//echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					//echo "sd";
					unset($forms->fields);
					$forms->fields->reserve_id = new stdClass();
					$forms->fields->reserve_id->ivalue = '';
					$forms->fields->reserve_id->value = $id;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';

					InsertQuery('w_reserve_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_reserve_lang SET name_lang=$1  where lang_id=$2 and reserve_id=$3');
					pg_execute($link,'sqllangupdate',array($nlang,$key,$id));					
				}
				pg_close($link);					
			}				
		}
	}
	

function DeleteReservation($data){
		//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
	
			pg_prepare($link,'sql0','DELETE FROM w_reserve WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			
			pg_prepare($link,'sqllangdata0','DELETE FROM w_reserve_lang WHERE reserve_id=$1');
			$result1 = pg_execute($link,'sqllangdata0',array($id));
			
				}
			
		pg_close($link);	
}

function FetchAllPriceData($id)
{
	$link = ConnectDB();	
	$prices = array();
	$price = new stdClass();
	$query = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',array($id,1));
	$row = pg_fetch_array($result);
	
	$query1 = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql2',$query1);
	$result1 = pg_execute($link,'sql2',array($id,2));
	$row1 = pg_fetch_array($result1);
	
	$query2 = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql3',$query2);
	$result2 = pg_execute($link,'sql3',array($id,3));
	$row2 = pg_fetch_array($result2);
	
	$price->tableprice= $row['price'];
	$price->roomprice= $row1['price'];
	$price->freeprice= $row2['price'];
	if($price->tableprice !="" && $price->roomprice !="" && $price->freeprice !=""){
	array_push($prices,$price);
	}
	echo json_encode($prices);
	pg_close($link);
}

function SaveReservePrice($data){
	require('../config.php');
	$link = ConnectDB();
	$form = parse($data);
	$businessid = $form->id;
	
	$table = $form->fields->table->value;
	$room = $form->fields->room->value;
	$free = $form->fields->free->value;

	
	if ($form->type=='create')
		{
			pg_prepare($link,'sqld4','SELECT * FROM w_reserve_chart ORDER BY id DESC');
			$fetch_record = pg_execute($link,'sqld4',array());
			if(pg_num_rows($fetch_record) == 0) { 
				$incheck = 1;
			} else { 
				$all_rec= pg_fetch_array($fetch_record);
				$incheckpre= $all_rec['id'];
				$incheck = $incheckpre + 1;
			}
			pg_prepare($link,'sql1','INSERT INTO w_reserve_chart (id,rtype,business,price) VALUES ($1,$2,$3,$4)');
	$fetch_insert = pg_execute($link,'sql1',array($incheck,1,$businessid,$table));
			/****************end table*****************/
			pg_prepare($link,'sqlr4','SELECT * FROM w_reserve_chart ORDER BY id DESC');
			$fetch_record = pg_execute($link,'sqlr4',array());
			if(pg_num_rows($fetch_record) == 0) { 
				$incheck = 1;
			} else { 
				$all_rec= pg_fetch_array($fetch_record);
				$incheckpre= $all_rec['id'];
				$incheck = $incheckpre + 1;
			}
			pg_prepare($link,'sql22','INSERT INTO w_reserve_chart (id,rtype,business,price) VALUES ($1,$2,$3,$4)');
	$fetch_insert = pg_execute($link,'sql22',array($incheck,2,$businessid,$room));
			/****************end room*****************/
			pg_prepare($link,'sqlf4','SELECT * FROM w_reserve_chart ORDER BY id DESC');
			$fetch_record = pg_execute($link,'sqlf4',array());
			if(pg_num_rows($fetch_record) == 0) { 
				$incheck = 1;
			} else { 
				$all_rec= pg_fetch_array($fetch_record);
				$incheckpre= $all_rec['id'];
				$incheck = $incheckpre + 1;
			}
			pg_prepare($link,'sql33','INSERT INTO w_reserve_chart (id,rtype,business,price) VALUES ($1,$2,$3,$4)');
	$fetch_insert = pg_execute($link,'sql33',array($incheck,3,$businessid,$free));
			
			
			
		}else{
		
		pg_prepare($link,'sqlp1','UPDATE w_reserve_chart set price=$1 where rtype=$2 and business=$3');
		$fetch_insert = pg_execute($link,'sqlp1',array($table,1,$businessid));
		
		pg_prepare($link,'sqlp2','UPDATE w_reserve_chart set price=$1 where rtype=$2 and business=$3');
		$fetch_insert = pg_execute($link,'sqlp2',array($room,2,$businessid));
		
		pg_prepare($link,'sqlp3','UPDATE w_reserve_chart set price=$1 where rtype=$2 and business=$3');
		$fetch_insert = pg_execute($link,'sqlp3',array($free,3,$businessid));	
			
		}
	
	//pg_close($link);
}

?>
