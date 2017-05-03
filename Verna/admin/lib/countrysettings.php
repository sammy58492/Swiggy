<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f']){

	case 'FetchAllCountriesData':
		FetchAllCountry();
	break;
	case 'SaveFranchiseAvailabilityCheck':
		SaveFranchiseAvailabilityCheck($_POST['data']);
	break;
	case 'FetchAllCountriesIDData':
		FetchAllCountriesIDData($_POST['data']);
	break;
	
	case 'SaveCountry':
		SaveCountry($_POST['data']);
	break;
	case 'DeleteCountry':
		DeleteCountry($_POST['data']);
		break;
		
	case 'GetNameAvailability':
		GetNameAvailability($_POST['data']);
	break;
		
	case 'GetNameAvailabilityModified':
		GetNameAvailabilityModified($_POST['data'],$_POST['langid']);
	break;
	
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;	
		
	default:
		die();
	break;
}


function FetchAllCountry(){
	$link = ConnectDB();
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql','SELECT * from w_countries where scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));
	$countries = array();
	
	while($row = pg_fetch_array($result)){
		//unset($country);
		$country = new stdClass();
		$country->id = $row['id'];
		$country->name = FetchCountriesLangDefault($defultlang,$row['id'],$link);
		$country->enabled = $row['enabled'];
		if($country->name !=null)
		array_push($countries,$country);	
	}
	echo json_encode($countries);
	pg_close($link);
}

function FetchCountriesLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}





function FetchAllCountriesIDData($data){
	$link = ConnectDB();

	pg_prepare($link,'sql2','SELECT * from w_countries_lang WHERE country_id=$1');
	$result = pg_execute($link,'sql2',array($data));
	
	
	$langarray=array();	
	$idarray = array();
	while($row = pg_fetch_array($result)){
		$langarray[$row['lang_id']] = $row['name_lang'];
		$idarray[$row['lang_id']] = $row['id'];
	}
	$data1 = new stdClass();
	$data1->id = $data;
	$data1->name = $langarray;
	$data1->langid = $idarray;
	
	echo json_encode($data1);
	pg_close($link);
}






function SaveCountry($data){

	require('../config.php');
	$link = ConnectDB();
	$data = json_decode($data);
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

	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);
	$usrid = $form->id;

	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $rows['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($namelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->name->value = $nlang;
		}
	}

	foreach($form->fields as $name=>$set){
		
		$temp->$name->value=$set->value;
		}
		
		
	if ($form->type=='create'){
		$usrid = InsertQuery('w_countries',$temp,$CFG);
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				unset($forms->fields);
				$forms->fields->country_id = new stdClass();
				$forms->fields->country_id->ivalue = '';
				$forms->fields->country_id->value = $usrid;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->name_lang = new stdClass();
				$forms->fields->name_lang->value = $nlang;
				$forms->fields->name_lang->ivalue = '';

				InsertQuery('w_countries_lang',$forms->fields,$CFG);
			}				
		}		
	}else{
		
		$link = ConnectDB();
		pg_prepare($link,'sqllangupdate','UPDATE w_countries SET name=$1  where id=$2');
		pg_execute($link,'sqllangupdate',array($nlang,$usrid));
		pg_close($link);
		UpdateQuery('w_countries',$temp,$usrid,$CFG);
		foreach($namelang as $key=>$nlang){
			echo $nlang;
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_countries_lang where lang_id=$1 AND country_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$usrid));
				echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					echo "sd";
					unset($forms->fields);
					$forms->fields->country_id = new stdClass();
					$forms->fields->country_id->ivalue = '';
					$forms->fields->country_id->value = $usrid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';

					InsertQuery('w_countries_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_countries_lang SET name_lang=$1  where lang_id=$2 and country_id=$3');
					pg_execute($link,'sqllangupdate',array($nlang,$key,$usrid));					
				}
				pg_close($link);					
			}				
		}
	}

}
	
function DeleteCountry($data){
		//AdminsOnly();
	require('../config.php');
			
	$data = parse($data);
	
	foreach ($data->ids as $id){
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql0','DELETE FROM w_countries WHERE id=$1');
		$result = pg_execute($link,'sql0',array($id));
		pg_close($link);
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql0','DELETE FROM w_countries_lang WHERE country_id=$1');
		$result = pg_execute($link,'sql0',array($id));
		pg_close($link);
	}		
}

function GetNameAvailability($data){
		//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		


			pg_prepare($link,'sql22','SELECT * from w_countries_lang WHERE name_lang=$1');
			$result = pg_execute($link,'sql22',array($data));
			if (pg_num_rows($result)>0)  
			echo '1';
				
			
		pg_close($link);	
}

function GetNameAvailabilityModified($data,$langid){
	require('../config.php');
	$link = ConnectDB($CFG);		
	pg_prepare($link,'sql22','SELECT * from w_countries_lang WHERE name_lang=$1 and id!=$2');
	$result = pg_execute($link,'sql22',array($data,$langid));
	if (pg_num_rows($result)>0)  
		echo '1';
	pg_close($link);
}
function SaveFranchiseAvailabilityCheck($data){	
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);
	
	
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
	//print_r($data);
	
	$form = $data;
	$usrid = $form->id;
	$cityval = $form->fields->name->value;
	$citylang = explode(",",$cityval);
	if ($form->type=='create'){
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_countries where scriptid=$1');




		foreach($citylang as $key=>$nlang){			
			$result1 = pg_execute($link,'sqllangfetch',array($_SESSION['scriptid']));
			while($row1=pg_fetch_array($result1)){
				if($nlang==$row1['name']){
				echo $row1['name'];	
				}				
			}

		}	
	}else{
			pg_prepare($link,'sqllangfetch','SELECT * FROM w_countries where id!=$1 and scriptid=$2');
			foreach($citylang as $key=>$nlang){			
			$result1 = pg_execute($link,'sqllangfetch',array($usrid,$_SESSION['scriptid']));
			while($row1=pg_fetch_array($result1)){
				if($nlang==$row1['name']){
				echo $row1['name'];	
				}				
			}

		}	
	}


}

function SetEnabled($id,$enabled)
	{
	//AdminsOnly();
	//echo $enabled;
	$link = ConnectDB();		

	pg_prepare($link,'sqli','UPDATE w_countries SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
?>
