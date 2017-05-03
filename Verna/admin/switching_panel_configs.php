<?
function sciptName($script_id)
   { 
    include $_SERVER['DOCUMENT_ROOT'].'/admin/config.php';
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link = pg_connect($string);
    pg_prepare($link,'sqlSwnm','SELECT * from w_switch_script where id=$1 ');
       $scriptResult = pg_execute($link,'sqlSwnm',array($script_id));	   
	   $scriptname = pg_fetch_array($scriptResult);
	  
    return   $scriptname['name'];
  }
/***********************************************SWITCHING_SCRIPT***********************************************/

	   pg_prepare($link,'sqlSwCon','SELECT * from w_switch_config ');
       $configResult = pg_execute($link,'sqlSwCon',array());
	   
	   
	   
       while($conf = pg_fetch_array($configResult))
               {

                $name = $conf['name'];
                $switch_setting[$name] = $conf['value'];
       
               }		
			   
			  /* print_r($switch_setting);
			   exit;*/
/***********************************************SWITCHING_SCRIPT***********************************************/

/**********************************************Fornt theme details*********************************************/



  pg_prepare($link,'sqlThemeDetails','SELECT * from w_switch_script_theme WHERE id = $1 ');
  $configResulttheme = pg_execute($link,'sqlThemeDetails',array($switch_setting['script_admin_theme_id']));
  $fetch_switching_theme = pg_fetch_array($configResulttheme);
  
 

 
$moduleName = sciptName($switch_setting['script_id']);
$DeviceType = "admin";
  /*echo "<pre>";
print_r($fetch_switching_theme);  */


/**********************************************Fornt theme details*********************************************/



?>