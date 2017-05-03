<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllAdsData':
		FetchAllAdsData();
	break;
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SaveAd':
		SaveAd($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/

function FetchAllAdsData()
	{
		
		
		
	SuperAdminsOnly();
	$link = ConnectDB();	
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$conditionalsvalues = array();
	$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.scriptid,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id where w_ads.scriptid=$1';

	/*if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			if ($count>0)
				$conditionals .= ',' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
				else
				$conditionals .= $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}*/
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));

	
	$ads = array();
	while($row = pg_fetch_array($result))
		{
	//	unset($ad);
		$ad = new stdClass();
		unset($city);
		$ad->id = $row['id'];
		$ad->name = FetchAdsLangDefault($defultlang,$row['id'],$link);
		//$ad->name = $row['name'];
		$ad->link = $row['link'];
		$ad->enabled = $row['enabled'];
		$ad->type = $row['type'];
		$ad->hits = $row['hits'];
		$ad->typename = GetAdTypeText($ad->type);

		if ($row['cityid']!=null)
			{
			$city = new stdClass();
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}

		$ad->city = $city;
		if($ad->name !=null)
		array_push($ads,$ad);
		}

	echo json_encode($ads);
	}


function FetchAdsLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_ads_lang WHERE ads_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/


/********************************************DELETE FRANCHISE****************************************************************/

function DeleteAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'ads/' . $id . '/');
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_ads WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql0','DELETE FROM w_ads_lang WHERE ads_id=$1');
		$result = pg_execute($link,'sql0',array($id));
		pg_close($link);	
		}
	}

/*******************************************SAVE FRANCHISE*********************************************************************/

function SaveAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$data = parse($data);
	$link = ConnectDB($CFG);

	
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
	$adid = $form->id;
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);
	
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
	$temp = new stdClass();
	foreach($form->fields as $name=>$set){
		$temp->$name= new stdClass();
		$temp->$name->value=$set->value;
		}	
	
	if ($form->type=='create'){
		$temp->scriptid->value=$_SESSION['scriptid'];
		$adid = InsertQuery('w_ads',$temp,$CFG);	
		
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				$datas->fields = new stdClass();
				$datas->fields->ads_id = new stdClass();
				$datas->fields->ads_id->ivalue = '';
				$datas->fields->ads_id->value = $adid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->name_lang = new stdClass();
				$datas->fields->name_lang->value = $nlang;
				$datas->fields->name_lang->ivalue = '';
				

				InsertQuery('w_ads_lang',$datas->fields,$CFG);
			}				
		}
	}
		else{
		UpdateQuery('w_ads',$temp,$form->id,$CFG);
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){
				$link = ConnectDB();	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_ads_lang where lang_id=$1 AND ads_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$adid));				
				if(pg_num_rows($resultsearch) == 0){
					$forms->fields = new stdClass();
					$forms->fields->ads_id = new stdClass();
					$forms->fields->ads_id->ivalue = '';
					$forms->fields->ads_id->value = $adid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';

					InsertQuery('w_ads_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_ads_lang SET name_lang=$1 where lang_id=$2 and ads_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$key,$adid));					
				}
									
			}				
		}
		}








	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image)
		{
		$oldname = $CFG->dir.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'ads/',$oldname,$adid,false,$form->fields->type->value);
		
			$link = ConnectDB();	
			pg_prepare($link,'sql21','UPDATE w_ads SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql21',array(1,$adid));
			pg_close($link);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create'){

			$link = ConnectDB();		
			pg_prepare($link,'sql21','UPDATE w_ads SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql21',array(0,$adid));
			pg_close($link);
	    	}

	}


function MoveImages($root,$oldname,$usrid,$dummy,$type)
	{
	$folder = $root .$usrid.'/';
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	//$ext_arr = split("\.",$form->image);
	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require('resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);

		//create thumbnail and regular size

		if ($type=='0')
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,214);
			$image->save($folder.'full.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(250,250);
			$image->save($folder.'splited.jpg');
			}
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		//create thumbnail and regular size
		if ($type=='0')
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,214);
			$image->save($folder.'full.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(250,250);
			$image->save($folder.'splited.jpg');
			}
		}
	}


function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_ads SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}


?>
