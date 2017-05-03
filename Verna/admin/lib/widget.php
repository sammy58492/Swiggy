<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f']){	
	case 'Savewidget':
		Savewidget($_POST['data']);
		break;
	case 'FetchAllWidgetData':
		FetchAllWidgetData($link);
		break;
	case 'FetchwidgetByID':
		Fetchwidget($_POST['id']);
		break;
	case 'FetchAllBusinessData':
		FetchAllBusinessData($link);
		break;
	case 'FetchAllCountryData':
		FetchAllCountryData($link);
		break;
		
	case 'FetchAllCategoryData':
		FetchAllCategoryData($_POST['data']);
		break;
	case 'FetchAllCityData':
		FetchAllCityData($_POST['data']);
		break;	
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchWidgetDataById':
		FetchWidgetDataById($_POST['id']);
		break;
	case 'DeleteWidget':
		DeleteWidget($_POST['data']);
	break;
	case 'SaveEditwidget':
		SaveEditwidget($_POST['data'],$_POST['id']);
	break;
	case 'FetchAllNeighborhoodData':
		FetchAllNeighborhoodData($_POST['city'],$_POST['contry']);
	break;	
	case 'ViewWidgetData':
		ViewWidgetData($_POST['data']);
	break;
	
}
function Savewidget($data){	
	$link = ConnectDB();		
	$widget = $data;
	$dd = parse($data);

	$widgetname = $dd->widget_name;	
	$date = date('Y-m-d');
	$query = "SELECT * from w_widget where scriptid='".$_SESSION['scriptid']."' order by id desc limit 1";	
	pg_prepare($link,'sql1',$query);
  	$resultkey = pg_execute($link,'sql1',array());
  	if (pg_num_rows($resultkey)==1){  
		$row = pg_fetch_array($resultkey);
		$id = $row['id']+1;
	}else{
		$id = 1;
	}	
	$widget_name = $widgetname;	
	pg_prepare($link,'sqlwidget','INSERT into w_widget (id,widget_name,widget,date,scriptid)values ($1,$2,$3,$4,$5)');
	$resultiframe= pg_execute($link,'sqlwidget',array($id,$widget_name,$widget,$date,$_SESSION['scriptid']));	
}
function FetchAllBusinessData($link){
	$link = ConnectDB();	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql','SELECT * from w_business where scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));
	$business = array();
	
	while($row = pg_fetch_array($result)){
		//unset($buss);
		$buss = new stdClass();
		$buss->id = $row['id'];
		$buss->name = $row['name']; 
		if($buss->name !=null){
		array_push($business,$buss);
		}		
	}
	echo json_encode($business);
}

function FetchAllCategoryData($data){
	require('../config.php');
	$data = parse($data);
	//echo $data; die();
	$link = ConnectDB($CFG);
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql','SELECT * from w_business where id = '.$data.' AND scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));
	
	
	while($row = pg_fetch_array($result)){			
		$catid = json_decode($row['categories']);
		$categories = array();	
		foreach($catid as $val) {
			$cat_id = $val;			
			pg_prepare($link,'sqldefalut'.$cat_id,'SELECT * from w_lang_setting WHERE opdefault=1');
			$result12 = pg_execute($link,'sqldefalut'.$cat_id,array());
			$rows1 = pg_fetch_array($result12);
			if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
				$defultlang = $rows1['id'];
			}else{
				$defultlang = $_SESSION['admin_lang'];	
			}

			pg_prepare($link,'sql'.$cat_id,'SELECT * from w_categories where id = '.$cat_id.' AND scriptid=$1 ORDER BY id ASC');
			$result13 = pg_execute($link,'sql'.$cat_id,array($_SESSION['scriptid']));	
			
			$fetchcat = pg_fetch_array($result13);
				unset($cat);
				$cat->id = $fetchcat['id'];
				$cat->name = $fetchcat['name'];
				if($cat->name !=null){
					array_push($categories,$cat);
				}			
		}			
	}	
	echo json_encode($categories);
}

function FetchAllWidgetData($link){
	$link = ConnectDB();	
	pg_prepare($link,'sqldefalut1','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut1',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql3','SELECT * from w_widget where scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql3',array($_SESSION['scriptid']));
	$widget = array();
	if (pg_num_rows($result)>0){ 
		while($row = pg_fetch_array($result)){
		//	unset($wid);
			$wid = new stdClass();
			$wid->id = $row['id'];
			$wid->widget_name = $row['widget_name'];
			$wid->enabled = $row['status'];
			date_default_timezone_set('Europe/London');
			$wid->date = date('D j M Y',strtotime($row['date'])); 	
			if($wid->widget_name !=null){
				array_push($widget,$wid);
			}		
		}
	}
	/*else{
		unset($wid);
		$wid->status = 'No record found';
		array_push($widget,$wid);
		
	}*/
	echo json_encode($widget);
}

function SetEnabled($id,$enabled){	
	$link = ConnectDB();
	$query = "UPDATE w_widget SET status='".$enabled."' WHERE id=".$id."";
	pg_prepare($link,'sql5',$query);
	if (pg_execute($link,'sql5',array()))
	pg_prepare($link,'sql31','SELECT * from w_widget where scriptid=$1 AND id='.$id.'');
	$result = pg_execute($link,'sql31',array($_SESSION['scriptid']));
	$widget = array();	
	$row = pg_fetch_array($result);						
	echo $row['status'];					
	 
}

function FetchWidgetDataById($id){
	$link = ConnectDB();	
	pg_prepare($link,'sqldefalut1','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut1',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql36','SELECT * from w_widget where scriptid=$1 AND id='.$id.'');
	$result = pg_execute($link,'sql36',array($_SESSION['scriptid']));
	$widget = array();
	if (pg_num_rows($result)>0){ 
		$row = pg_fetch_array($result);
			//unset($wid);
			$wid = new stdClass();
			$wid->id = $row['id'];
			//$wid->widget_name = $row['widget_name'];
			$wid->widget = stripslashes($row['widget']);
			//$wid->enabled = $row['status'];
			//$wid->date = date('D j M Y',strtotime($row['date'])); 	
			if($wid->widget !=null){
				array_push($widget,$wid);
			}		
	}	
	echo json_encode($widget);
}

function DeleteWidget($data){
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)	{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sqld','DELETE FROM w_widget WHERE id=$1');
		$result = pg_execute($link,'sqld',array($id));	
		pg_close($link);
	}
}

function SaveEditwidget($data,$id){
	$link = ConnectDB();
	$widget = $data;
	$dd = parse($data);

	$widgetname = $dd->widget_name;		
	$query = "UPDATE w_widget SET widget='".$widget."',widget_name='".$widgetname."' WHERE id=".$id."";
	pg_prepare($link,'sqledit',$query);
	pg_execute($link,'sqledit',array());	
}

function ViewWidgetData($data){	
	$link = ConnectDB();	
	pg_prepare($link,'sqldefalut1','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut1',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$data = parse($data);
	$widget = array();
	$total = count($data->ids);
	if(!empty($data->ids) && $total > 0){	
		foreach ($data->ids as $id)	{
			$query = "SELECT * from w_widget where scriptid=$1 AND id=".$id."";
			pg_prepare($link,'sqlview'.$id,$query);
			$result = pg_execute($link,'sqlview'.$id,array($_SESSION['scriptid']));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
				//	unset($wid);
					$wid = new stdClass();
					$wid->id = $row['id'];
					$wid->widget_name = $row['widget_name'];
					$wid->widget = parse($row['widget']);
					$wid->enabled = $row['status'];
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					if($wid->widget_name !=null){
						array_push($widget,$wid);
					}
				}		
			}
		}
	}else{
			$query = "SELECT * from w_widget where scriptid=$1 ORDER BY id ASC";
			pg_prepare($link,'sqlview',$query);
			$result = pg_execute($link,'sqlview',array($_SESSION['scriptid']));		
			if (pg_num_rows($result)>0){ 
				while($row = pg_fetch_array($result)){
					unset($wid);
					$wid->id = $row['id'];
					$wid->widget_name = $row['widget_name'];
					$wid->widget = parse($row['widget']);
					$wid->enabled = $row['status'];
					$wid->date = date('D j M Y',strtotime($row['date'])); 	
					if($wid->widget_name !=null){
						array_push($widget,$wid);
					}
				}		
			}
	}
	
	echo json_encode($widget);
}

function FetchAllCountryData($link){
	$link = ConnectDB();	
	pg_prepare($link,'sqldefalut1','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut1',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sqlcou','SELECT * from w_countries where scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sqlcou',array($_SESSION['scriptid']));
	$country = array();
	
	while($row = pg_fetch_array($result)){
		//unset($cou);
		$cou = new stdClass();
		$cou->id = $row['id'];
		$cou->name = FetchCountriesLangForWidgetDefault($defultlang,$row['id'],$link);
		$cou->name = $row['name']; 
		if($cou->name !=null){
		array_push($country,$cou);
		}		
	}
	echo json_encode($country);
}

function FetchCountriesLangForWidgetDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function FetchAllCityData($data){
	require('../config.php');
	//$data = parse($data);
	//echo $data; die();
	$link = ConnectDB($CFG);
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sql','SELECT * from w_franchises where country = '.$data.' AND scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));
	$cities = array();
	while($fetchcat = pg_fetch_array($result)){		
		$city = new stdClass();
		$city->id = $fetchcat['id'];
		$city->name = $fetchcat['city'];
		if($city->name !=null){
			array_push($cities,$city);
		}			
					
	}	
	echo json_encode($cities);
}

function FetchAllNeighborhoodData($city,$country){
	require('../config.php');	
	$link = ConnectDB($CFG);
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	pg_prepare($link,'sqlnbr','SELECT * from w_neighborhood where country = '.$country.' AND city = '.$city.' AND scriptid=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sqlnbr',array($_SESSION['scriptid']));
	$neighborhood = array();
	while($fetchcat = pg_fetch_array($result)){		
		$nhood = new stdClass();
		$nhood->id = $fetchcat['id'];
		$nhood->name = $fetchcat['name'];
		if($nhood->name !=null){
			array_push($neighborhood,$nhood);
		}			
					
	}	
	echo json_encode($neighborhood);
}

?>
