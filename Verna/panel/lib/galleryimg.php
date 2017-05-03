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
	SuperAdminsOnly();
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
function FetchAllRestData()
{
	SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}	
function FetchAllAdsData($filters)
	{
	SuperAdminsOnly();
	echo json_encode(GetAllAdsData($filters));
	}


function GetAllRestData()
{
	SuperAdminsOnly();
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
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'gallery/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_gallery WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/

function SaveAd($data,$link)
	{
	
	SuperAdminsOnly();

	require('../config.php');
	$connn = ConnectDB($CFG);
		
	$form = parse($data);
	$adid = $form->id;
	if($link !=""){
	$link = str_replace(",","&",$link);
	$link = str_replace('\"','"',$link);
	}
	//$form->fields->link->value = $link;
	print_r($form);
	/*exit;*/

	
	
	
	
	
	if ($form->type=='create'){
		$name = $form->fields->name->value;
		$type = $form->fields->type->value;
		$link = $link;
		$business = $form->fields->business->value;
		
		 pg_prepare($connn,'sqld4','SELECT * FROM w_gallery ORDER BY id DESC');
		 $fetch_record = pg_execute($connn,'sqld4',array());
		
		 if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}
				  
				  
		pg_prepare($connn,'sqld2','INSERT INTO w_gallery (id,name,link,type,business) VALUES ($1,$2,$3,$4,$5)');
		pg_execute($connn,'sqld2',array($incheck,$name,$link,$type,$business));
		//$adid = InsertQuery('w_gallery',$form->fields,$CFG);	
		$adid = $incheck;
	}
	else{
		
		$name = $form->fields->name->value;
		$type = $form->fields->type->value;
		$link = $link;
		$business = $form->fields->business->value;
			
		pg_prepare($connn,'sqld2','UPDATE w_gallery SET name=$2, link=$3, type=$4, business=$5 where id=$1');
		pg_execute($connn,'sqld2',array($adid,$name,$link,$type,$business));
		//UpdateQuery('w_gallery',$form->fields,$form->id,$CFG);
		$adid = $adid;
		
	}

			/*print_r($form->fields->type);
			exit();*/
	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if($form->fields->type->value == 0 || $form->fields->type->value == "2") { 
	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
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

	$ext_arr = split("\.",$form->image);
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
			$image->resize(125,92);
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
			$image->resize(125,92);
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
			$image->resize(125,92);
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
			$image->resize(125,92);
			$image->save($folder.'gallery.jpg');
			}
		}
	}


function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_gallery SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}


?>
