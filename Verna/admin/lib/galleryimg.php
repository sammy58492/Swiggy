<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f'])
	{
	case 'FetchAllAdsData':
		FetchAllAdsData($_POST['filters']);
	break;
	case 'FetchAllAdsDataByID':
		FetchAllAdsDataByID($_POST['id']);
	break;

	
	case 'DeleteAd':
		DeleteAd($_POST['data']);
	break;
	case 'SaveAd':
		SaveAd($_POST['data'],$_POST['link']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchAllRestData':
			FetchAllRestData();
	break;
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/

function GetAllAdsData($filters)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	$query = 'SELECT * FROM w_gallery';

	if (!empty($filters))	
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
		}
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);
	pg_close($link);
	
	$ads = array();
	while($row = pg_fetch_array($result))
		{
		unset($ad);
		//unset($city);
		$ad->id = $row['id'];
		$ad->name = $row['name'];
		$ad->link = $row['link'];
		$ad->enabled = $row['enabled'];
		$ad->type = $row['type'];
		$ad->hits = $row['hits'];
		$ad->business = $row['business'];
		//$ad->typename = GetAdTypeText($ad->type);

		/*if ($row['cityid']!=null)
			{
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}

		$ad->city = $city;*/
		
		array_push($ads,$ad);
		}
		

	return $ads;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/

function FetchAllAdsDataByID($id){

	$link = ConnectDB();	
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	$query = 'SELECT * FROM w_gallery WHERE business=$1 AND scriptid=$2';	
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id,$_SESSION['scriptid']));

	
	$ads = array();
	while($row = pg_fetch_array($result))
		{
		//unset($ad);
		$ad = new stdClass();
		
		$ad->id = $row['id'];
		$ad->name = FetchGalleryDataLangDefault($defultlang,$row['id'],$link);
		$ad->link = $row['link'];
		$ad->enabled = $row['enabled'];
		$ad->type = $row['type'];
		$ad->hits = $row['hits'];
		$ad->business = $row['business'];		
		
		array_push($ads,$ad);
		}
	echo json_encode($ads);
}

function FetchGalleryDataLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_gallery_lang WHERE gallery_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}





function FetchAllRestData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}	



function FetchAllAdsData($filters)
	{
	//SuperAdminsOnly();
	echo json_encode(GetAllAdsData($filters));
	}


function GetAllRestData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());

	$returants = array();
	    $returant->id = "";
		$returant->caption = "";
		array_push($returants,$returant);
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['name'];
		array_push($returants,$returant);
		}

	return $returants;
}

/********************************************DELETE FRANCHISE****************************************************************/

function DeleteAd($data)
	{
	//SuperAdminsOnly();
	
	
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	print_r($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'gallery/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_gallery WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		
		/* pg_prepare($link,'sqldefalut2','SELECT * from w_gallery WHERE id=1');
	$result1041 = pg_execute($link,'sqldefalut2',array($id));
	$rows5 = pg_fetch_array($result1041);*/
	
	
	$review_id1[] = $id;
	$review_id=json_encode($review_id1);
	$review_id = str_replace('"',"",$review_id);
	
	print_r($review_id);
		
			pg_prepare($link,'sql26del33','DELETE from w_business_photos WHERE photos=$1');
		pg_execute($link,'sql26del33',array($review_id));
		
		pg_prepare($link,'sql12','DELETE FROM w_gallery_lang WHERE gallery_id=$1');
		$result1 = pg_execute($link,'sql12',array($id));	
		
		
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/

function SaveAd($data,$link)
	{
	
	require('../config.php');
	$connn = ConnectDB($CFG);
	$data = parse($data);
	$temp=null;
	
	foreach($data->fields as $name=>$set){

		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	

		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/

	}
	$form = $data;	
	$adid = $form->id;
	$nameval = $form->fields->name->value;
	$namelang = explode(",",$nameval);
	
	pg_prepare($connn,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($connn,'sqllangfetch',array());
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
	
	if($link !=""){
	$link = str_replace(",","&",$link);
	$link = str_replace('\"','"',$link);
	}

	
	
	if ($form->type=='create'){
		$name = $form->fields->name->value;
		$type = $form->fields->type->value;
		$link = $link;
		$business = $form->fields->business->value;
		$scriptid = $_SESSION['scriptid'];


		
		 pg_prepare($connn,'sqld4','SELECT * FROM w_gallery ORDER BY id DESC');
		 $fetch_record = pg_execute($connn,'sqld4',array());
		
		 if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}
				  
		$usid[] = $incheck;
		$ids=json_encode($usid);		  
		pg_prepare($connn,'sqld2','INSERT INTO w_gallery (id,name,link,type,business,scriptid) VALUES ($1,$2,$3,$4,$5,$6)');
		pg_execute($connn,'sqld2',array($incheck,$name,$link,$type,$business,$scriptid));
		//$adid = InsertQuery('w_gallery',$form->fields,$CFG);	
		$adid = $incheck;
		
		
		
		
		pg_prepare($connn,'sqld48pho2','SELECT * FROM w_business_photos ORDER BY id DESC');
$fetch_recordp = pg_execute($connn,'sqld48pho2',array());		
		 if(pg_num_rows($fetch_recordp) == 0) { 
			$inc = 1;
		} else { 
			$all_recp= pg_fetch_array($fetch_recordp);
			$incpre= $all_recp['id'];
			$inc = $incpre + 1;
		}

pg_prepare($connn,'sqld2photo','INSERT INTO w_business_photos (id,name,email,business_id,photos) VALUES ($1,$2,$3,$4,$5)');
pg_execute($connn,'sqld2photo',array($inc,$name,$form->fields->email->value,$business,$ids));

		
		
		
		
		
		
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				unset($forms->fields);
				$forms->fields->gallery_id = new stdClass();
				$forms->fields->gallery_id->ivalue = '';
				$forms->fields->gallery_id->value = $adid;		

				$forms->fields->lang_id = new stdClass();
				$forms->fields->lang_id->value = $key;
				$forms->fields->lang_id->ivalue = '';

				$forms->fields->name_lang = new stdClass();
				$forms->fields->name_lang->value = $nlang;
				$forms->fields->name_lang->ivalue = '';

				InsertQuery('w_gallery_lang',$forms->fields,$CFG);
			}				
		}
		
		
		
		
		
		
	}
	else{
		
		$name = $form->fields->name->value;
		$type = $form->fields->type->value;
		if($type==0)
		{
			$link="";		
		}
		$link = $link;
		$business = $form->fields->business->value;
			
		pg_prepare($connn,'sqld2','UPDATE w_gallery SET name=$2, link=$3, type=$4, business=$5 where id=$1');
		pg_execute($connn,'sqld2',array($adid,$name,$link,$type,$business));
		//UpdateQuery('w_gallery',$form->fields,$form->id,$CFG);
		$adid = $adid;
		
		
		foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($connn,'sqllangsearch','SELECT * FROM w_gallery_lang where lang_id=$1 AND gallery_id=$2');
				$resultsearch = pg_execute($connn,'sqllangsearch',array($key,$adid));
				echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->gallery_id = new stdClass();
					$forms->fields->gallery_id->ivalue = '';
					$forms->fields->gallery_id->value = $adid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';

					InsertQuery('w_gallery_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($connn,'sqllangupdate','UPDATE w_gallery_lang SET name_lang=$1  where lang_id=$2 and gallery_id=$3');
					pg_execute($connn,'sqllangupdate',array($nlang,$key,$adid));					
				}
				pg_close($link);					
			}				
		}
		
	}

			
	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if($form->fields->type->value == 0 || $form->fields->type->value == "2") { 
	if ($form->image)
		{

		$oldname = $CFG->dir.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'gallery/',$oldname,$adid,false,$form->fields->type->value);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'gallery/dummy.jpg';
			MoveImages($CFG->dirimages . 'gallery/',$oldname,$adid,true,$form->fields->type->value);
	    	}
	    }

	}


function MoveImages($root,$oldname,$usrid,$dummy,$type)
	{
		
	$folder = $root .$usrid.'/';
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

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
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(233,171);
			$image->save($folder.'gallery.jpg');
			}
			else if ($type=='2')
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,214);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(1349,292);
			$image->save($folder.'gallery.jpg');
			}
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,95);
			$image->save($folder.'splited.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(233,171);
			$image->save($folder.'gallery.jpg');
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
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(233,171);
			$image->save($folder.'gallery.jpg');
			}
		else if ($type=='2')
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,214);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
				$image->resize(1349,292);
			$image->save($folder.'gallery.jpg');
			}	
			else
			{
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,95);
			$image->save($folder.'splited.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(233,171);
			$image->save($folder.'gallery.jpg');
			}
		}
	}


function SetEnabled($id,$enabled)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_gallery SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}


?>
