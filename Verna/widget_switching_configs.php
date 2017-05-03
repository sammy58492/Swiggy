<?php
	$switch_setting = Array(
	    'script_admin_theme_id' => '2',
		'script_front_theme_id' => '15',
		'mobile_theme_id' => '1',
		'script_id' => '5',
		'theme_type' => '1'
	);
	
	$moduleName = sciptName($current_script_id=5);
	
	function themedetailsWidget($theme_id)
   { 
    include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
	
     pg_prepare($link,'sqlThemeWidget','SELECT * from w_switch_script_theme WHERE id = $1 ');
    $configResultwidget = pg_execute($link,'sqlThemeWidget',array($theme_id));	   
	$configfetchwidget = pg_fetch_array($configResultwidget);
	  
    return   $configfetchwidget;
  }
 
  $fetch_switching_theme = themedetailsWidget(15);

    $DeviceType = "desktop";
	
	
	//print_r($switch_setting);

?>