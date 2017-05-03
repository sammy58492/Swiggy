<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
switch ($_POST['f'])
	{
	case 'SaveConfig':
		SaveConfig($_POST['name'],$_POST['value']);
	break;
	case 'GetConfig':
		GetConfig($_POST['name']);
	break;
	case 'GetsettingsConfig':
		GetsettingsConfig();
	break;
	case 'SaveSettingsConfig':
		SaveSettingsConfig($_POST['name'],$_POST['value']);
	break;
	
	case 'GetBusinessPageSettings':
		GetBusinessPageSettings();
	break;
	//tabsetting start
	
	case 'GetTabSettings':
		GetTabSettings();
	break;
	case 'GetFrontSettings':
		GetFrontSettings();
	break;
	//tabsetting end 
	
	case 'GetSoundSettings':
		GetSoundSettings();
	break;
	
	case 'GetSiteScheduleSettingsText':
		GetSiteScheduleSettingsText();
	break;
	
	case 'GetSiteScheduleSettings':
		GetSiteScheduleSettings();
	break;
	case 'GetPanelSettings':
		GetPanelSettings();
	break;
	case 'PanelSaveSettingsConfig':
		PanelSaveSettingsConfig($_POST['name'],$_POST['value']);
	break;
	
	default:
		die();
	break;
	}

/*******************************************GET ORDERS DATA**********************************************/
	//tabsetting start
function GetTabSettings()
{
	
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_tabsettings');
	$result = pg_execute($link,'sql',array());

	$settings = array();
		while($row = pg_fetch_array($result)) {
			unset($setting);
			$setting->id = $row['id'];
			$setting->country= $row['country'];
			$setting->city = $row['city'];
			$setting->tab_delivery = $row['tab_delivery'];
			$setting->tab_delivery_country = $row['tab_delivery_country'];
			$setting->tab_delivery_city = $row['tab_delivery_city'];
			$setting->tab_delivery_address = $row['tab_delivery_address'];
			$setting->tab_delivery_option = $row['tab_delivery_option'];
			$setting->tab_pickup = $row['tab_pickup'];
			$setting->tab_pickup_country = $row['tab_pickup_country'];
			$setting->tab_pickup_city = $row['tab_pickup_city'];
			$setting->tab_pickup_option = $row['tab_pickup_option'];
			$setting->tab_reservation = $row['tab_reservation'];
			$setting->tab_reservation_country = $row['tab_reservation_country'];
			$setting->tab_reservation_city = $row['tab_reservation_city'];
			$setting->tab_reservation_option = $row['tab_reservation_option'];
			$setting->list_step = $row['list_step'];
			$setting->tab_delivery_neighborhood = $row['tab_delivery_neighborhood'];
			
			array_push($settings,$setting);
		}
		echo json_encode($settings);

	pg_close($link);
	
	
}


function GetFrontSettings()
{
	
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_frontsettings');
	$result = pg_execute($link,'sql',array());
	
	$settings = array();
		while($row = pg_fetch_array($result)) {
			unset($setting);
			$setting->id = $row['id'];
			
			
			$countrytags=array();
				$row['countrytag']= parse($row['countrytag']);
				foreach($row['countrytag'] as $val){
			if( $val!='-1'){
			
				//print_r($row['countrytag']);
				 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sql3','SELECT * FROM w_countries WHERE id=$1');
				$result1 = pg_execute($link,'sql3',array($val));
				while($row1 = pg_fetch_array($result1)) {
						unset($countrytag);
						$countrytag->id=$val;
						$countrytag->name=$row1['name'];
					
						array_push($countrytags,$countrytag);
				}
				
			}else{
				$countrytag->id=$val;
				$countrytag->name="All";
					array_push($countrytags,$countrytag);
			}
			
				}
			$setting->countrytag= $countrytags;
			
			$citytags=array();
				$row['citytag']= parse($row['citytag']);
				foreach($row['citytag'] as $val){
			if( $val!='-1'){
			
				//print_r($row['countrytag']);
				 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sql44','SELECT * FROM w_franchises WHERE id=$1');
				$result1 = pg_execute($link,'sql44',array($val));
				while($row1 = pg_fetch_array($result1)) {
						unset($citytag);
						$citytag->id=$val;
						$citytag->name=$row1['city'];
						$citytag->country=$row1['country'];
					
						array_push($citytags,$citytag);
				}
				
			}else{
				$citytag->id=$val;
				$citytag->name="All";
				$citytag->country=$val;
					array_push($citytags,$citytag);
			}
			
				}
			
			
			$setting->citytag = $citytags;
			
			
			$restaurants=array();
				$row['restaurant']= parse($row['restaurant']);
				foreach($row['restaurant'] as $val){
			if( $val!='-1'){
			
				//print_r($row['countrytag']);
				 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sql45','SELECT * FROM w_business WHERE id=$1');
				$result1 = pg_execute($link,'sql45',array($val));
				while($row1 = pg_fetch_array($result1)) {
						unset($restaurant);
						$restaurant->id=$val;
						$restaurant->name=$row1['name'];
						$restaurant->city=$row1['city'];
						$restaurant->country=$row1['country'];
					
						array_push($restaurants,$restaurant);
				}
				
			}else{
				$restaurant->id=$val;
				$restaurant->name="All";
					array_push($restaurants,$restaurant);
			}
			
				}
			
			
			$setting->citytag = $citytags;
			$setting->restaurant = $restaurants;
			$setting->browse_per_city = $row['browse_per_city'];
			$setting->popular_restaurant = $row['popular_restaurant'];
			$setting->popular_cuisine = $row['popular_cuisine'];
			$setting->map_posititon = $row['map_posititon'];
			
			array_push($settings,$setting);
		}
		
		echo json_encode($settings);

	pg_close($link);
	
}

//tabsetting end 


function SaveConfig($name,$value)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));
	$id = -1;

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
		pg_prepare($link,'sql2','INSERT INTO w_configs (name,value) VALUES ($1,$2)');
		if (pg_execute($link,'sql2',array($name,$value)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			if($oldvalue != $value)
					{
		pg_prepare($link,'sql2','UPDATE w_configs SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
				else
			{
				echo 'ok';
			}
			}
	pg_close($link);
	}
	function SaveSettingsConfig($name,$value)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	
	//Reset counter start
	if($name=="defaulttimezone"){
		$value= str_replace("@","+",$value);
		$value = str_replace("$","-",$value);
	}
	$w_config_unchangedArr=array("updateBackupinsec","isupdateBackupinsec");
	if(!in_array($name,$w_config_unchangedArr)){		
	//Reset counter end
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));
	$id = -1;

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
		pg_prepare($link,'sql2','INSERT INTO w_configs (name,value) VALUES ($1,$2)');
		if (pg_execute($link,'sql2',array($name,$value)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			//echo $oldvalue."-".$value;
			if($oldvalue != $value)
					{
						if($value != "null") {
		pg_prepare($link,'sql2','UPDATE w_configs SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
		}
				else
			{
				echo 'ok';
			}
			}
			//Reset counter start
	}else{
		
		
		pg_prepare($link,'sql','SELECT * FROM w_config_unchanged WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));
	$id = -1;

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
			$id_unchanged = 1;
	pg_prepare($link,'sqli1',"SELECT nextval('w_config_unchanged_id_seq') as key");
	$result = pg_execute($link,'sqli1',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id_unchanged = $row['key'];	
			
		pg_prepare($link,'sql2','INSERT INTO w_config_unchanged (name,value,id) VALUES ($1,$2,$3)');
		if (pg_execute($link,'sql2',array($name,$value,$id_unchanged)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			//echo $oldvalue."-".$value;
			if($oldvalue != $value)
					{
						if($value != "null") {
		pg_prepare($link,'sql2','UPDATE w_config_unchanged SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
		}
				else
			{
				echo 'ok';
			}
			}
			
	}		
	//Reset counter end
	pg_close($link);
	}
	


function GetConfig($name)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT value FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));

	if (pg_num_rows($result)==1)  {
		while($row = pg_fetch_array($result))
			echo $row['value'];
			//Reset counter start
	}else{
		
		pg_prepare($link,'sql22','SELECT value FROM w_config_unchanged WHERE name=$1');
		$result = pg_execute($link,'sql22',array($name));
	
		if (pg_num_rows($result)==1) { 
			while($row = pg_fetch_array($result))
				echo $row['value'];
		}
	}
	//Reset counter end
	pg_close($link);
	}
	
function GetsettingsConfig()
{
SuperAdminsOnly();
$link = ConnectDB();
pg_prepare($link,'sql','SELECT * FROM w_configs ORDER BY id ASC');
$result = pg_execute($link,'sql',array());
$settings = array();
;
while($row = pg_fetch_array($result)) {

$keyName=$row['name'];
$setting[$keyName]=$row['value'];
}
//Reset counter start
pg_prepare($link,'sql1','SELECT * FROM w_config_unchanged ORDER BY id ASC');
	$result = pg_execute($link,'sql1',array());

		while($row = pg_fetch_array($result)) {
			
			
			$keyName=$row['name'];
			$setting[$keyName]=$row['value'];
		}
//Reset counter end
echo json_encode($setting);
pg_close($link);
}
function GetSiteScheduleSettingsText(){
	$link = ConnectDB();	
	unset($sitescheduletext);
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'sitescheduletext1'){
		
			$sitescheduletext->sitescheduletext1 = stripslashes($row['value']);
			
			
		}
		
		if($row['name'] == 'sitescheduletext2'){
		
			$sitescheduletext->sitescheduletext2 = stripslashes($row['value']);
			
		}
		
		if($row['name'] == 'sitescheduletext3'){
		
			$sitescheduletext->sitescheduletext3 = stripslashes($row['value']);
			
		}
	}
	echo json_encode($sitescheduletext);
	pg_close($link);	
}
function GetSiteScheduleSettings(){
	$link = ConnectDB();	
	unset($soundsettings);
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'siteschedule'){
		
			$siteschedule->siteschedule = json_decode(stripslashes($row['value']),true);
			
		}
	}
	echo json_encode($siteschedule);
	pg_close($link);	
}
function GetBusinessPageSettings(){
	$link = ConnectDB();	
	
	unset($businesspagesettings);
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'businesspagprograssbarsetting'){
			$businesspagesettings->prograssbarsetting = $row['value'];
		}
		if($row['name'] == 'businesspageheadersetting'){
			$businesspagesettings->businesspageheadersetting = $row['value'];
		}
		if($row['name'] == 'businesspagefootersetting'){
			$businesspagesettings->businesspagefootersetting = $row['value'];
		}
		
	}
	
	echo json_encode($businesspagesettings);
	pg_close($link);	
}
function GetSoundSettings(){
	$link = ConnectDB();	
	
	unset($soundsettings);
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'superadminsoundstatus'){
			$soundsettings->superadminsoundstatus = $row['value'];
		}
		if($row['name'] == 'superadminsoundduration'){
			$soundsettings->superadminsoundduration = $row['value'];
		}
		if($row['name'] == 'businesssoundstatus'){
			$soundsettings->businesssoundstatus = $row['value'];
		}
		if($row['name'] == 'businesssoundduration'){
			$soundsettings->businesssoundduration = $row['value'];
		}
	}
	echo json_encode($soundsettings);
	pg_close($link);	
}

function GetPanelSettings(){
	$link = ConnectDB();	
	
	unset($panelsettings);
	pg_prepare($link,'sqlpanel','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlpanel',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'panelsetting'){
			$panelsettings->panelsetting = $row['value'];
		}
		
	}
	echo json_encode($panelsettings);
	pg_close($link);	
}
function PanelSaveSettingsConfig($name,$value)
	{
	$link = ConnectDB();
	pg_prepare($link,'sqlp','UPDATE w_configs SET value=$2 WHERE name=$1');
	pg_execute($link,'sqlp',array($name,$value));
	unset($panelvalue);
	$panelvalue->panelvalue = $value;
	
	echo json_encode($panelvalue);

	pg_close($link);
}

?>
