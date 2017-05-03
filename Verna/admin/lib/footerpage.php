<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllFooterData':
		FetchAllFooterData();
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
	case 'FetchFooterData':
		FetchFooterData($_POST['id']);
		break;
	
	default:
		die();
	break;
	}

/*******************************************GET FOOTER DATA**********************************************/

function FetchAllFooterData()
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	

	pg_prepare($link,'sqldefalut22','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut22',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	$query = 'SELECT * FROM w_footer WHERE scriptid=$1';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));

	
	$footers = array();
	while($row = pg_fetch_array($result))
		{
		unset($footer);
		$footer = new stdClass();
		$footer->id = $row['id'];
		$footer->pagename = FetchFooterpageLangDefault($defultlang,$row['id'],$link);
		$footer->pageurl = $row['pageurl'];
		$footer->type = $row['type'];
		$footer->enabled = $row['enabled'];
		if($footer->pagename !=null)
		array_push($footers,$footer);
		}

	echo json_encode($footers);
	}

function FetchFooterpageLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_footer_lang WHERE footer_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['pagename_lang'];
}

/*********************GET ALL FOOTER LIST***********************/

/****************DELETE Footer************************************/

function DeleteAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_footer WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		pg_close($link);
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql0','DELETE FROM w_footer_lang WHERE footer_id=$1');
		$result = pg_execute($link,'sql0',array($id));
		pg_close($link);	
		}

	}

/**************SAVE FOOTER*************************/
function SaveFooter($data)
	{
	
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);
	
	$temp=null;
	foreach($data->fields as $name=>$set){
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);
		
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);
		
		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');
		
		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/		


	}
	
	$form = $data;
	$usrid = $form->id;	
	$nameval = $form->fields->pagename->value;
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
			$form->fields->pagename->value = $nlang;
		}
	}
	
	foreach($form->fields as $name=>$set){
	
	$temp->$name->value=$set->value;
	}
	
		if ($form->type=='create')
		{
			$usrid = InsertQuery('w_footer',$temp,$CFG);
			
			foreach($namelang as $key=>$nlang){

			if(!empty($nlang)){		
				unset($datas->fields);
				$datas->fields->footer_id = new stdClass();
				$datas->fields->footer_id->ivalue = '';
				$datas->fields->footer_id->value = $usrid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->pagename_lang = new stdClass();
				$datas->fields->pagename_lang->value = $nlang;
				$datas->fields->pagename_lang->ivalue = '';

				InsertQuery('w_footer_lang',$datas->fields,$CFG);
			}				
		}

				
			}//finish while
			else
			{
				UpdateQuery('w_footer',$temp,$form->id,$CFG);
				
				foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){
				$link = ConnectDB();	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_footer_lang where lang_id=$1 AND footer_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$usrid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->footer_id = new stdClass();
					$forms->fields->footer_id->ivalue = '';
					$forms->fields->footer_id->value = $usrid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->pagename_lang = new stdClass();
					$forms->fields->pagename_lang->value = $nlang;
					$forms->fields->pagename_lang->ivalue = '';

					InsertQuery('w_footer_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_footer_lang SET pagename_lang=$1 where lang_id=$2 and footer_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$key,$usrid));					
				}
									
			}				
		}
				
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
	
	pg_prepare($link,'sqlfooterpagelang','SELECT * from w_footer_lang WHERE footer_id=$1');
	$result4 = pg_execute($link,'sqlfooterpagelang',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			
			$namearray=array();
			$idarray = array();
			while($row4 = pg_fetch_array($result4))
			{
				$namearray[$row4['lang_id']] = $row4['pagename_lang'];
				$idarray[$row4['lang_id']] = $row4['id'];
			
			}
			
			$ad->pagename = $namearray;
			$ad->langid = $idarray;
			$ad->pageurl = $row['pageurl'];
			$ad->type = $row['type'];
			}
	
	echo json_encode($ad);
	}	

?>
