<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

$bulk = parse($_POST['data']);
//print_r($bulk);
$link = ConnectDB();
//unset($response);
$response = new stdClass();

foreach ($bulk as $data)
	{	
switch ($data->operation){
	
	case 'FetchSwitchScript':
		$response->switchscript = FetchSwitchScript($link);
	break;
	case 'FetchConfingRecord':
		$response->confingRecord = FetchConfingRecord($link);
	break;
	
	case 'FetchThemeType':
		$response->fetchthemetype = FetchThemeType($link);
	break;
	
	case 'UpdateScriptId':
		$response->UpdateRecord =  UpdateScriptId($data->scriptid,$data->themeid,$data->typeid,$data->enable,$link);
	break;
	case 'UpdateDeaciveScriptId':
		$response->UpdateRecord =  UpdateDeaciveScriptId($data->scriptid,$data->themeid,$data->typeid,$link);
	break;
	
	case 'FetchSwitchTheme':
		$response->FetchSwitchThemeInfo = FetchSwitchTheme($data->scid,$data->typeid,$link);
	break;
	
	default:
		die();
	break;
}//end of switch case
	}
pg_close($link);
echo json_encode($response);


function FetchSwitchScript($link){
	
	$enb = 'TRUE';
	
	pg_prepare($link,'switchsql','SELECT * FROM w_switch_script WHERE enabled=$1 AND id NOT IN (7) ');
	$switch_result = pg_execute($link,'switchsql',array($enb));
	$switch_scripts = array();
	while($switch_row = pg_fetch_array($switch_result))
	{
		$switch_script = new stdClass();		
	//	unset($switch_script);
		$switch_script->id = $switch_row['id'];
		$switch_script->switch_name = $switch_row["name"];
		//if($switch_script->switch_name !=null)
		array_push($switch_scripts,$switch_script);
	}
	//print_r($switch_scripts);
	return $switch_scripts;
	
}//end of function FetchSwitchScript
function UpdateDeaciveScriptId($scid,$themid,$typeid,$link) {
	
	
	$scrp = 'script_id';
	$theme_type = 'theme_type';
	$themid = "-1";
	
	
	if($typeid == 1) {
	$thmfld = "script_front_theme_id";
	pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
	$switch_row1 = pg_fetch_array($switch_result1);
	
	$scrp = "script_id";
	pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
	
	$theme_type = "theme_type";
	pg_prepare($link,'switchsqtyp','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqtyp',array("1",$theme_type));
	
	} else if($typeid == 2) {
		$thmfld = "mobile_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
	$switch_row1 = pg_fetch_array($switch_result1);
	
	$scrp = "script_id";
	pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
	
	   $theme_type = "theme_type";
		pg_prepare($link,'switchsqtyp','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result2 = pg_execute($link,'switchsqtyp',array("1",$theme_type));
	
		
		
		}
	else if($typeid == 3)	 {
		$thmfld = "script_front_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
		$switch_row1 = pg_fetch_array($switch_result1);
		
		$scrp = "script_id";
	pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
	
	$theme_type = "theme_type";
		pg_prepare($link,'switchsqtyp','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result2 = pg_execute($link,'switchsqtyp',array("2",$theme_type));
	
		
		}
	else if($typeid == 4)	 {
		$thmfld = "script_admin_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
		$switch_row1 = pg_fetch_array($switch_result1);
		
		$scrp = "script_id";
		pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
		
		
		//$Query = "select * from w_switch_script_theme where "
		
		 
		
		
	
	}
		
	
	

	
	
	}
function UpdateScriptId($scid,$themid,$typeid,$enable,$link){
	
	$scrp = 'script_id';
	$theme_type = 'theme_type';
	
	
	if($typeid == 1) {
		if($enable == "0") {
	$thmfld = "script_front_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result1 = pg_execute($link,'switchsql1',array("-1",$thmfld));
	$switch_row1 = pg_fetch_array($switch_result1);
		} else {
	$thmfld = "script_front_theme_id";
	pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
	$switch_row1 = pg_fetch_array($switch_result1);
		}
		
	$scrp = "script_id";
	pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
	
	$theme_type = "theme_type";
	pg_prepare($link,'switchsqtyp','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqtyp',array("1",$theme_type));
	
	} else if($typeid == 2) {
		if($enable == "0") {
		$thmfld = "mobile_theme_id";
		pg_prepare($link,'switchsqlm2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result1 = pg_execute($link,'switchsqlm2',array("-1",$thmfld));
	$switch_row1 = pg_fetch_array($switch_result1);
	} else {
		$thmfld = "mobile_theme_id";
	pg_prepare($link,'switchsqlm22','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result1 = pg_execute($link,'switchsqlm22',array($themid,$thmfld));
	$switch_row1 = pg_fetch_array($switch_result1);
		}
	
	$scrp = "script_id";
	pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
	
	   $theme_type = "theme_type";
		pg_prepare($link,'switchsqtyp','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result2 = pg_execute($link,'switchsqtyp',array("1",$theme_type));
	
		
		
		}
	else if($typeid == 3)	 {
		if($enable == "0")  {
		$thmfld = "script_front_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result1 = pg_execute($link,'switchsql1',array("-1",$thmfld));
		$switch_row1 = pg_fetch_array($switch_result1);
		} else {
			
			$thmfld = "script_front_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
		$switch_row1 = pg_fetch_array($switch_result1);
			
		}
		
		$scrp = "script_id";
	pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
	$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
	
	$theme_type = "theme_type";
		pg_prepare($link,'switchsqtyp','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result2 = pg_execute($link,'switchsqtyp',array("2",$theme_type));
	
		
		}
	else if($typeid == 4)	 {
		if($enable == "0")  {
		$thmfld = "script_admin_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result1 = pg_execute($link,'switchsql1',array("-1",$thmfld));
		$switch_row1 = pg_fetch_array($switch_result1);
			} else {
				$thmfld = "script_admin_theme_id";
		pg_prepare($link,'switchsql1','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result1 = pg_execute($link,'switchsql1',array($themid,$thmfld));
		$switch_row1 = pg_fetch_array($switch_result1);
		}
				
		
		$scrp = "script_id";
		pg_prepare($link,'switchsqln2','UPDATE w_switch_config SET value =$1 WHERE name=$2');
		$switch_result2 = pg_execute($link,'switchsqln2',array($scid,$scrp));
		
		
		//$Query = "select * from w_switch_script_theme where "
		
	}
		
	
	
}

function FetchConfingRecord($link) {
	//$scrp = 'script_id';
	pg_prepare($link,'switchsql2','SELECT * FROM w_switch_config');
	$switch_result2 = pg_execute($link,'switchsql2',array());
//	$switch_row2 = pg_fetch_array($switch_result2);
	while($switch_row2 = pg_fetch_array($switch_result2)) {
		$key_value = $switch_row2['name'];
		$values = $switch_row2['value'];
		
		$newrecords[$key_value] = $values;
		}
	return $newrecords;
	}
	
	
function FetchThemeType($link) {
	$scrp = 'theme_type';
	pg_prepare($link,'switchsql21','SELECT * FROM w_switch_config WHERE name=$1');
	$switch_result21 = pg_execute($link,'switchsql21',array($scrp));
	$switch_row21 = pg_fetch_array($switch_result21);
	return $switch_row21['value'];
	}
	
function FetchSwitchTheme($scid,$typeid,$link) {
	
	
	/***************************************DESKTOP***************************************************************/
	$theme_scripts_desktop = array();
	if($typeid == 1) {
	$enb = 'TRUE';
	$adminfalse = 'FALSE';
	$desktop = '1';
	pg_prepare($link,'switchthemesql','SELECT * FROM w_switch_script_theme WHERE script_type=$1 AND type=$2 AND is_admin=$3 AND enabled=$4 AND is_device = $5');
	$theme_result2 = pg_execute($link,'switchthemesql',array($scid,$typeid,$adminfalse,$enb,$desktop));
	
	
	
	while($theme_row2 = pg_fetch_array($theme_result2))
	{
		//unset($theme_script);
		$theme_script = new stdClass();
		$theme_script->id = $theme_row2['id'];
		$theme_script->theme_name = $theme_row2["name"];
		$theme_script->type = $theme_row2["type"];
		$theme_script->script_type = $theme_row2["script_type"];
		$theme_script->is_device = $theme_row2["is_device"];
		//if($switch_script->switch_name !=null)
		array_push($theme_scripts_desktop,$theme_script);
	}
	}
	
	/***************************************DESKTOP***************************************************************/
	/***************************************FOR MOBILE***************************************************************/
	$theme_scripts_mobile = array();
	if($typeid == 1) {
	$enb = 'TRUE';
	$adminfalse = 'FALSE';
	$mobile = '2';
	pg_prepare($link,'switchthemesql_mobile','SELECT * FROM w_switch_script_theme WHERE script_type=$1 AND type=$2 AND is_admin=$3 AND enabled=$4 AND is_device = $5');
	$theme_result2 = pg_execute($link,'switchthemesql_mobile',array($scid,$typeid,$adminfalse,$enb,$mobile));
	
	
	
	while($theme_row2 = pg_fetch_array($theme_result2))
	{
		$theme_script = new stdClass();
		//unset($theme_script);
		$theme_script->id = $theme_row2['id'];
		$theme_script->theme_name = $theme_row2["name"];
		$theme_script->type = $theme_row2["type"];
		$theme_script->script_type = $theme_row2["script_type"];
		$theme_script->is_device = $theme_row2["is_device"];
		//if($switch_script->switch_name !=null)
		array_push($theme_scripts_mobile,$theme_script);
	}
	}
	
	/***************************************FOR MOBILE***************************************************************/
	/***************************************FOR RESPONSIVE***************************************************************/
	$theme_scripts_responsive = array();
	if($typeid == 2) {
			$enb = 'TRUE';
			$adminfalse = 'FALSE';
			$mobile = '2';
			pg_prepare($link,'switchthemesql_responsive','SELECT * FROM w_switch_script_theme WHERE script_type=$1 AND type=$2 AND is_admin=$3 AND enabled=$4');
			$theme_result2 = pg_execute($link,'switchthemesql_responsive',array($scid,$typeid,$adminfalse,$enb));
			
			$theme_scripts_responsive = array();
			
			while($theme_row2 = pg_fetch_array($theme_result2))
			{
				unset($theme_script);
				$theme_script->id = $theme_row2['id'];
				$theme_script->theme_name = $theme_row2["name"];
				$theme_script->type = $theme_row2["type"];
				$theme_script->script_type = $theme_row2["script_type"];
				$theme_script->is_device = 0;
				//if($switch_script->switch_name !=null)
				array_push($theme_scripts_responsive,$theme_script);
			}
	}
	/***************************************FOR RESPONSIVE***************************************************************/
	//admin true
	$enb = 'TRUE';
	$admintrue = 'TRUE';
	pg_prepare($link,'switchthemesqladmin','SELECT * FROM w_switch_script_theme WHERE script_type=$1  AND is_admin=$2 AND enabled=$3');
	$theme_result3 = pg_execute($link,'switchthemesqladmin',array($scid,$admintrue,$enb));
	$theme_scripts_admn = array();
	while($theme_row3 = pg_fetch_array($theme_result3))
	{
		unset($theme_script_admin);
		$theme_script_admin->id = $theme_row3['id'];
		$theme_script_admin->theme_name = $theme_row3["name"];
		$theme_script->script_type = $theme_row3["script_type"];
		$theme_script_admin->is_admin = true;
		
		//if($switch_script->switch_name !=null)
		array_push($theme_scripts_admn,$theme_script_admin);
	}
	/***************************************FOR admin***************************************************************/
	//unset($theme_scripts_merge);
	$theme_scripts_merge = new stdClass();
	$theme_scripts_merge->theme_scripts_desktop = $theme_scripts_desktop;
	$theme_scripts_merge->theme_scripts_admn = $theme_scripts_admn;
	$theme_scripts_merge->theme_scripts_mobile = $theme_scripts_mobile;
	$theme_scripts_merge->theme_scripts_responsive = $theme_scripts_responsive;
	
	return $theme_scripts_merge;
	}
