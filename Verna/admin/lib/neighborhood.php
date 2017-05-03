<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllNeighborhoodData':
		FetchAllNeighborhoodData();
	break;
	
	case 'FetchAllNeighborhoodIDData':
		FetchAllNeighborhoodIDData($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'SaveNeighborhoodData':
		SaveNeighborhoodData($_POST['data']);
	break;
	case 'GetNameAvailability':
		GetNameAvailability($_POST['data']);
	break;
	case 'DeleteNeighborhood':
		DeleteNeighborhood($_POST['id']);
	break;
	case 'FetchAllCountriesData':
		 FetchAllCountriesData();
	break;
	case 'FetchareaData':
		 FetchareaData();
	break;
	
	
	case 'FetchAllCountriesIDData':
		FetchAllCountriesIDData($_POST['data']);
	break;
	case 'FetchAllCityIDData':
		FetchAllCityIDData($_POST['data'],$_POST['countryid']);
	break;
	
	
		
	default:
		die();
	break;
	}



function FetchAllNeighborhoodData()
	{
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql0','SELECT * FROM w_neighborhood where scriptid=$1');
	
	$result = pg_execute($link,'sql0',array($_SESSION['scriptid']));

	$countries = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$cid =  $row['id'];
		
		pg_prepare($link,'sqlc'.$cid,'SELECT name FROM w_countries WHERE id=$1');
		pg_prepare($link,'sqlcc'.$cid,'SELECT city FROM w_franchises WHERE id=$1');
		
		
		
		$result1 = pg_execute($link,'sqlc'.$cid,array($row['country']));
		$result2 = pg_execute($link,'sqlcc'.$cid,array($row['city']));
		
		$row1 = pg_fetch_array($result1);
		$row2 = pg_fetch_array($result2);
		
		$country = new stdClass();
		$country->id = $row['id'];
		$country->country = $row['country'];
		$country->city = $row['city'];
		$country->name = FetchNeighborthoodLangDefault($defultlang,$row['id'],$link);
		$country->enabled = $row['enabled'];
		
		$country->countryname = $row1[0];
		$country->cityname = $row2[0];
		if($country->name !=null)
		array_push($countries,$country);
		
		}

	echo json_encode($countries);
	}
	
	
	function FetchNeighborthoodLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_neighborhood_lang WHERE neighborhood_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
	
	function FetchareaData()
{
	echo json_encode(GetAllareaData());
		
}
function GetAllareaData()
{
	
	$link = ConnectDB();
	$returants = array();
  
	pg_prepare($link,'sql31','SELECT * from w_neighborhood');
	$result = pg_execute($link,'sql31',array());
   
	while($row = pg_fetch_array($result))
		{
	//	unset($returant);
		$returant = new stdClass();
		$returant->id = $row['id'];
		$returant->name = $row['name'];
		array_push($returants,$returant);
		}

	return $returants;

	
}
function FetchAllNeighborhoodIDData($data)
	{
	$link = ConnectDB();
	pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql0','SELECT * FROM w_neighborhood WHERE id=$1');
	
	$result = pg_execute($link,'sql0',array($data));

	$neighbors = array();
	
	$row = pg_fetch_array($result);
		
		unset($neighbor);
		$cid =  $row['id'];
		
		pg_prepare($link,'sqlc'.$cid,'SELECT name FROM w_countries WHERE id=$1');
		pg_prepare($link,'sqlcc'.$cid,'SELECT city FROM w_franchises WHERE id=$1');
		
		
		
		$result1 = pg_execute($link,'sqlc'.$cid,array($row['country']));
		$result2 = pg_execute($link,'sqlcc'.$cid,array($row['city']));
		
		$row1 = pg_fetch_array($result1);
		$row2 = pg_fetch_array($result2);
		
		
		pg_prepare($link,'sqlneighbordthlang','SELECT * from w_neighborhood_lang WHERE neighborhood_id=$1');
		$result4 = pg_execute($link,'sqlneighbordthlang',array($data));
		
		$neighbor = new stdClass();
		
		$neighbor->id = $row['id'];
		$neighbor->country = $row['country'];
		$neighbor->city = $row['city'];
		
		$namearray=array();
		$idarray = array();
		while($row4 = pg_fetch_array($result4))
		{
			$namearray[$row4['lang_id']] = $row4['name_lang'];
			$idarray[$row4['lang_id']] = $row4['id'];
		
		}
		$neighbor->name = $namearray;
		$neighbor->langid = $idarray;
		$neighbor->enabled = $row['enabled'];
		
		$neighbor->countryname = $row1[0];
		$neighbor->cityname = $row2[0];
		
	


	echo json_encode($neighbor);
	}	
	
function SetEnabled($id,$enabled)
	{
	$link = ConnectDB();		

	pg_prepare($link,'sqli','UPDATE w_neighborhood SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sqli',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}
	
function GetNameAvailability($data){
		//AdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		


			pg_prepare($link,'sql22','SELECT * from w_neighborhood WHERE name=$1');
			$result = pg_execute($link,'sql22',array($data));
			if (pg_num_rows($result)>0)  
			echo '1';
				
			
		pg_close($link);	
}	
	
function SaveNeighborhoodData($data)
	{
	//AdminsOnly();
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
	
	foreach($form->fields as $name=>$set){
	
	$temp->$name->value=$set->value;
	}
	
	if ($form->type=='create')
	{
		$usrid = InsertQuery('w_neighborhood',$temp,$CFG);
		
		foreach($namelang as $key=>$nlang){

			if(!empty($nlang)){		
				unset($datas->fields);
				$datas->fields->neighborhood_id = new stdClass();
				$datas->fields->neighborhood_id->ivalue = '';
				$datas->fields->neighborhood_id->value = $usrid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->name_lang = new stdClass();
				$datas->fields->name_lang->value = $nlang;
				$datas->fields->name_lang->ivalue = '';

				InsertQuery('w_neighborhood_lang',$datas->fields,$CFG);
			}				
		}
		
	}
		else
		{
		UpdateQuery('w_neighborhood',$temp,$usrid,$CFG);
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){
				$link = ConnectDB();	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_neighborhood_lang where lang_id=$1 AND neighborhood_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$usrid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->neighborhood_id = new stdClass();
					$forms->fields->neighborhood_id->ivalue = '';
					$forms->fields->neighborhood_id->value = $usrid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';

					InsertQuery('w_neighborhood_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_neighborhood_lang SET name_lang=$1 where lang_id=$2 and neighborhood_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$key,$usrid));					
				}
									
			}				
		}
		
		}

	}	
	
function DeleteNeighborhood($id){
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($id);
	foreach ($data->ids as $id)
		{
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql0','DELETE FROM w_neighborhood WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));
			pg_close($link);
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql0','DELETE FROM w_neighborhood_lang WHERE neighborhood_id=$1');
			$result = pg_execute($link,'sql0',array($id));
			pg_close($link);
				}
			

}

function FetchAllCountriesData()
	{
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	pg_prepare($link,'sql30','SELECT * FROM w_countries where enabled=$1');
	$result = pg_execute($link,'sql30',array('TRUE'));

	$countrieslists = array();
	while($row = pg_fetch_array($result))
		{
			$countrylist = new stdClass();
			
		//unset($countrylist);
		$countrylist->id = $row['id'];
		$countrylist->name = FetchCountriesLangDefault($defultlang,$row['id'],$link);
		//$countrylist->name = $row['name'];
		array_push($countrieslists,$countrylist);
		}

	echo json_encode($countrieslists);
	}
	
	
	
/*************************************************/
function FetchAllCountriesIDData($data){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sql','SELECT * from w_countries where enabled=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array('TRUE'));
	$countries = array();
	
	while($row = pg_fetch_array($result)){
		unset($country);
		$country->id = $row['id'];
		$country->name = FetchCountriesLangDefault($defultlang,$row['id'],$link);
		array_push($countries,$country);	
	}
	echo json_encode($countries);
}

function FetchCountriesLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}


function FetchAllCityIDData($data,$countryid){
	$link = ConnectDB();
	$defultlang = $data;

	pg_prepare($link,'sqlcity','SELECT * from w_franchises WHERE country=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sqlcity',array($countryid));
	$cities = array();
	
	while($row = pg_fetch_array($result)){
		unset($city);
		$city->id = $row['id'];
		$city->city = FetchCityLangDefault($defultlang,$row['id'],$link);
		array_push($cities,$city);	
	}
	echo json_encode($cities);
}

function FetchCityLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqlcitydefalutlang'.$cid,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlcitydefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
}	
?>
