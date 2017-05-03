<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f']){

	case 'GetLanguage':
		GetLanguage();
	break;

	default:
		die();
	break;
}

/************************** FETCH LANGUAGE *****************************/
function GetLanguage(){

   $link = ConnectDB();			
	pg_prepare($link,'sqllang','SELECT * FROM w_lang_setting');
	$result = pg_execute($link,'sqllang',array());

	

	$languages = array();
		while($row = pg_fetch_array($result)) {
			//unset($language);
		
			if($row['opdefault']  == 1) {
			$default_lang_id =  $row['id'];
			}
			$language = new stdClass();
			$language->id = $row['id'];
			$language->lang_text= $row['lang_text'];
			$language->default_lang_id = $default_lang_id;
			array_push($languages,$language);
		}
		
		echo json_encode($languages);

	pg_close($link);
	
}

?>
