<?
function sciptName($script_id)
   { 
    include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
    pg_prepare($link,'sqlSwnm','SELECT * from w_switch_script where id=$1 ');
       $scriptResult = pg_execute($link,'sqlSwnm',array($script_id));	   
	   $scriptname = pg_fetch_array($scriptResult);
	  
    return   $scriptname['name'];
  }
/***********************************************SWITCHING_SCRIPT***********************************************/
	  $link = pg_connect($string);
	   pg_prepare($link,'sqlSwCon','SELECT * from w_switch_config ');
       $configResult = pg_execute($link,'sqlSwCon',array());
	   
	   
	   
       while($conf = pg_fetch_array($configResult))
               {

                $name = $conf['name'];
                $switch_setting[$name] = $conf['value'];
       
               }		
			 
		pg_prepare($link,'sqlmSriptcur','SELECT * from w_switch_script_theme WHERE id=$1 ');
        $exe_script_id = pg_execute($link,'sqlmSriptcur',array($switch_setting['mobile_theme_id']));
		$fetch_script_id = pg_fetch_array($exe_script_id);
		$current_script_id = $fetch_script_id['script_type'];	 
		
		$switch_setting['script_id'] = $current_script_id;
			   
/***********************************************SWITCHING_SCRIPT***********************************************/

/**********************************************Fornt theme details*********************************************/
 $moduleName = sciptName($current_script_id);

  $execute = false;
  $DeviceType= "desktop";
  pg_prepare($link,'sqldeskThemeDetails','SELECT * from w_switch_script_theme WHERE id = $1 ');
  $configResultthemeDesk = pg_execute($link,'sqldeskThemeDetails',array($switch_setting['script_front_theme_id']));
  $fetch_switching_theme_desk = pg_fetch_array($configResultthemeDesk);
  
  if($fetch_switching_theme_desk['type'] == 2) {
	  
	  $themeid = $fetch_switching_theme_desk['id'];
	  $configResultthemeDeskNew = pg_execute($link,'sqldeskThemeDetails',array($switch_setting['script_front_theme_id']));
	  $fetch_switching_theme = pg_fetch_array($configResultthemeDeskNew);
	  $execute = true;
	  }
  
   else if($moduleName == "OOS") {
	if($switch_setting['mobile_theme_id'] == "1")
	 $moduleName = "mobile-reservation";
	else if($switch_setting['mobile_theme_id'] == "12")
	 $moduleName = "jean-mobile-theme";
	 
	 else if($switch_setting['mobile_theme_id'] == "17")
	 $moduleName = "weedpecker-mobile-theme";
	else if($switch_setting['mobile_theme_id'] == "19")
	 $moduleName = "itrue-mobile-theme";
	else if($switch_setting['mobile_theme_id'] == "21")
	 $moduleName = "savvii-mobile-theme";
	 
	 else if($switch_setting['mobile_theme_id'] == "22")
	 $moduleName = "dryco-mobile-theme";
	
	}
	
if($execute == false) {
  $DeviceType= "mobile";
  pg_prepare($link,'sqlmobThemeDetails','SELECT * from w_switch_script_theme WHERE id = $1 ');
  $configResulttheme = pg_execute($link,'sqlmobThemeDetails',array($switch_setting['mobile_theme_id']));
  $fetch_switching_theme = pg_fetch_array($configResulttheme);
}

  
  
  

	if( ($fetch_switching_theme['script_type'] != $switch_setting['script_id']) && $fetch_switching_theme_desk['type']!=2) { ?>
		<script>
		top.location.href = '404.html';
		</script>
		
		<? exit(); }
	
	else if($switch_setting['mobile_theme_id'] == "-1" && $fetch_switching_theme_desk['type']!=2) { ?>
		<script>
		top.location.href = '404.html';
		</script>
		
	<? exit();	}

/**********************************************Fornt theme details*********************************************/



?>