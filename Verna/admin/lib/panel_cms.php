<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f']){
	case 'FetchAllFooterData':
		FetchAllFooterData();
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'CheckCustomUrl':
		CheckCustomUrl($_POST['data']);
	break;
	case 'SaveFooter':
		SaveFooter($_POST['data']);
	break;
	case 'FetchFooterData':
		FetchFooterData($_POST['id']);
	break;
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
}

function FetchAllFooterData(){	
	SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sqllangfetchbusiness','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetchbusiness',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	
	if ($_SESSION['user']->level=='0'){//get all franchises from which the admin is admin
		$query = 'SELECT * FROM w_footercms WHERE scriptid= $1 ';
	}
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));	
	$footers = array();
	$c = 0;
	while($row = pg_fetch_array($result)){
		$footer = new stdClass();	
		$footer->id = $row['id'];
		$footer->pagetitle = FetchPanelCmstitleLangDefault($defaultid,$row['id'],$link,$c);
		$footer->pageheading = FetchPanelCmsheadingLangDefault($defaultid,$row['id'],$link,$c);
		$footer->pagecontent = $row['pagecontent'];
		$footer->customurl = $row['customurl'];
		$footer->metakeyword = $row['metakeyword'];
		$footer->metacontent = $row['metacontent'];
		$footer->type = $row['type'];
		$footer->enabled = $row['enabled'];
		if($footer->pagetitle !=null)
		array_push($footers,$footer);
		$c++;
	}

	echo json_encode($footers);
}

function FetchPanelCmstitleLangDefault($defaultid,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlang41'.$cid.$c,'SELECT * from w_footercms_lang WHERE footercms_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang41'.$cid.$c,array($cid,$defaultid));
	$rows = pg_fetch_array($result1);
	return $rows['pagetitle_lang'];
}
function FetchPanelCmsheadingLangDefault($defaultid,$cid,$link,$c){
	pg_prepare($link,'sqldefalutlang5515'.$cid.$c,'SELECT * from w_footercms_lang WHERE footercms_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang5515'.$cid.$c,array($cid,$defaultid));
	$rows = pg_fetch_array($result1);
	return $rows['pageheading_lang'];
}


function SetEnabled($id,$enabled){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_footercms SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}
function CheckCustomUrl($data){	
	require('../config.php');
	$link = ConnectDB();
	$data = json_decode($data);

	
	foreach($data->fields as $name=>$set){

		$set->value = base64_decode($set->value);
		$set->ivalue = base64_decode($set->ivalue);	

		$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');

	}
	
	
	$form = $data;
	$adid = $form->id;
	
	$customurlval = $form->fields->customurl->value;

	echo $customurllang = explode(",",$customurlval);

	if($adid){
		pg_prepare($link,'sqlcheck','SELECT customurl_lang from w_footercms_lang WHERE customurl_lang=$1 and footercms_id!=$2');
		echo $adid;
		
		foreach($customurllang as $key=>$nlang){	
			echo $nlang;		
			$result1 = pg_execute($link,'sqlcheck',array($key,$adid));
			while($row1=pg_fetch_array($result1)){
				echo $row1['customurl_lang'];
				if($nlang==$row1['customurl_lang']){
				echo 'ok';	
				}				
			}

		}
		
	}else{
		pg_prepare($link,'sqlcheck','SELECT customurl_lang from w_footercms_lang WHERE lang_id=$1');
		foreach($customurllang as $key=>$nlang){			
			$result1 = pg_execute($link,'sqlcheck',array($key));
			while($row1=pg_fetch_array($result1)){
				if($nlang==$row1['customurl_lang']){
				echo 'ok';	
				}				
			}

		}
	}
	
	/*if (pg_num_rows($result)==0)
		echo 'ok';*/
}

function SaveFooter($data){
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);
	print_r($data);
	foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);
		
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);	



	}
	$form = $data;
	$adid = $form->id;
	//print_r($form);	
	
	$customurlval = $form->fields->customurl->value;
	$customurllang = explode(",",$customurlval);
	
	$pageheadingval = $form->fields->pageheading->value;
	$pageheadinglang = explode(",",$pageheadingval);
	
	$metakeywordval = $form->fields->metakeyword->value;
	$metakeywordlang = explode(",",$metakeywordval);
	
	$pagetitleval = $form->fields->pagetitle->value;
	$pagetitlelang = explode(",",$pagetitleval);

	
	$metacontentval = $form->fields->metacontent->value;
	$metacontentlang = explode(",",$metacontentval);

	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($pagetitlelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->pagetitle->value = $nlang;
		}
	}
	
	foreach($customurllang as $key=>$cuslang){
		if($key == $defaultid){
			$form->fields->customurl->value = $cuslang;
		}
	}
	foreach($pageheadinglang as $key=>$pagelang){
		if($key == $defaultid){
			$form->fields->pageheading->value = $pagelang;
		}
	}
	foreach($metakeywordlang as $key=>$metakeylang){
		if($key == $defaultid){
			$form->fields->metakeyword->value = $metakeylang;
		}
	}
	foreach($metacontentlang as $key=>$metaconlang){
		if($key == $defaultid){
			$form->fields->metacontent->value = $metaconlang;
		}
	}	
	//print_r($form->pagecontent);
	//$form->fields->pagecontent = new stdClass();
	//$form->fields->pagecontent->value = str_replace("@#@","&", $form->pagecontent);
	
	

	if ($form->type=='create'){
		pg_prepare($link,'sqld1','SELECT * FROM w_footercms ORDER BY id DESC');
		$fetch_record = pg_execute($link,'sqld1',array());
		if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}
		pg_prepare($link,'sqld2','INSERT INTO w_footercms (id,type,pagetitle,pageheading,pagecontent,customurl,metakeyword,metacontent,scriptid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
		
		$pagetitle = $form->fields->pagetitle->value;
		$pageheading = $form->fields->pageheading->value;
		$pagecontent = $form->fields->pagecontent->value;
		$customurl = $form->fields->customurl->value;
		$metakeyword = $form->fields->metakeyword->value;					 
		$metacontent = $form->fields->metacontent->value;
		$type = $form->fields->type->value;	
		$scriptid = $_SESSION['scriptid'];	
		echo $metacontent;	
				
		$fetch_insert = pg_execute($link,'sqld2',array($incheck,$type,$pagetitle,$pageheading,$pagecontent,$customurl,$metakeyword,$metacontent,$scriptid));
		
		foreach($pagetitlelang as $key=>$nlang){
			if(!empty($nlang)){	
			$forms->fields=new stdClass();	
				//unset($forms->fields);
				$forms->fields->footercms_id = new stdClass();
				$forms->fields->footercms_id->ivalue = '';
				$forms->fields->footercms_id->value = $incheck;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';


				$forms->fields->pagetitle_lang = new stdClass();
				$forms->fields->pagetitle_lang->value = $nlang;
				$forms->fields->pagetitle_lang->ivalue = '';
				
				$forms->fields->pageheading_lang = new stdClass();
				$forms->fields->pageheading_lang->value = $pageheadinglang[$key];
				$forms->fields->pageheading_lang->ivalue = '';
				
				$forms->fields->metakeyword_lang = new stdClass();
				$forms->fields->metakeyword_lang->value = $metakeywordlang[$key];
				$forms->fields->metakeyword_lang->ivalue = '';
				
				$forms->fields->metacontent_lang = new stdClass();
				$forms->fields->metacontent_lang->value = $metacontentlang[$key];
				$forms->fields->metacontent_lang->ivalue = '';
				
				$forms->fields->customurl_lang = new stdClass();
				$forms->fields->customurl_lang->value = $customurllang[$key];
				$forms->fields->customurl_lang->ivalue = '';

				InsertQuery('w_footercms_lang',$forms->fields,$CFG);
			}				
		}
		
				
	}//finish while
	else{
		 $type = $form->fields->type->value;
		 pg_prepare($link,'sqlupdate45','UPDATE w_footercms set type=$1 where id=$2');
		pg_execute($link,'sqlupdate45',array($type,$adid));
		 UpdateQuery('w_footercms',$form->fields,$form->id,$CFG);
		
		foreach($pagetitlelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_footercms_lang where lang_id=$1 AND footercms_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$adid));
				//echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->footercms_id = new stdClass();
					$forms->fields->footercms_id->ivalue = '';
					$forms->fields->footercms_id->value = $adid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->pagetitle_lang = new stdClass();
					$forms->fields->pagetitle_lang->value = $nlang;
					$forms->fields->pagetitle_lang->ivalue = '';
					
					$forms->fields->pageheading_lang = new stdClass();
					$forms->fields->pageheading_lang->value = $pageheadinglang[$key];
					$forms->fields->pageheading_lang->ivalue = '';
					
					$forms->fields->metakeyword_lang = new stdClass();
					$forms->fields->metakeyword_lang->value = $metakeywordlang[$key];
					$forms->fields->metakeyword_lang->ivalue = '';
					
					$forms->fields->metacontent_lang = new stdClass();
					$forms->fields->metacontent_lang->value = $metacontentlang[$key];
					$forms->fields->metacontent_lang->ivalue = '';
					
					$forms->fields->customurl_lang = new stdClass();
					$forms->fields->customurl_lang->value = $customurllang[$key];
					$forms->fields->customurl_lang->ivalue = '';

					InsertQuery('w_footercms_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_footercms_lang SET pagetitle_lang=$1,pageheading_lang=$2,metakeyword_lang=$3,metacontent_lang=$4,customurl_lang=$5 where lang_id=$6 and footercms_id=$7');
					pg_execute($link,'sqllangupdate',array($nlang,$pageheadinglang[$key],$metakeywordlang[$key],$metacontentlang[$key],$customurllang[$key],$key,$adid));					
				}
									
			}				
		}
		
	}
}

function FetchFooterData($id){
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql22','SELECT * FROM w_footercms WHERE id=$1');
	$result = pg_execute($link,'sql22',array($id));
	
	pg_prepare($link,'sql55','SELECT * FROM w_footercms_lang WHERE footercms_id=$1');
	$result1 = pg_execute($link,'sql55',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			
			$ad = new stdClass();
			$ad->id = $row['id'];
			
			$pagetitlearray = array();
			$pageheadingarray = array();
			$customurlarray = array();
			$metakeywordarray = array();
			$metacontentarray = array();
			while($row1 = pg_fetch_array($result1)){
				$pagetitlearray[$row1['lang_id']] = $row1['pagetitle_lang'];
				$pageheadingarray[$row1['lang_id']] = $row1['pageheading_lang'];
				$customurlarray[$row1['lang_id']] = $row1['customurl_lang'];
				$metakeywordarray[$row1['lang_id']] = $row1['metakeyword_lang'];
				$metacontentarray[$row1['lang_id']] = $row1['metacontent_lang'];
			}
			$ad->pagetitle = $pagetitlearray;
			$ad->pageheading = $pageheadingarray;
			$ad->pagecontent = $row['pagecontent'];
			$ad->customurl = $customurlarray;
			$ad->metakeyword = $metakeywordarray;
			$ad->metacontent = $metacontentarray;
			
			$ad->type = $row['type'];
			}
	
	echo json_encode($ad);
}

function DeleteAd($data){
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id){		
		pg_prepare($link,'sql','DELETE FROM w_footercms WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		
		pg_prepare($link,'sql47','DELETE FROM w_footercms_lang WHERE footercms_id=$1');
		$result = pg_execute($link,'sql47',array($id));	
	}
	pg_close($link);
}	
		

?>