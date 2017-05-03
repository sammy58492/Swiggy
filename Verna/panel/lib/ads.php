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

function GetAllAdsData($filters)
	{
	SuperAdminsOnly();
	$link = ConnectDB();	

	$conditionalsvalues = array();
	$query = 'SELECT w_ads.id,w_ads.city as cityid,w_ads.enabled,w_ads.name,w_ads.type,w_ads.link,w_ads.hits,w_franchises.city as cityname FROM w_ads LEFT JOIN w_franchises ON w_ads.city = w_franchises.id';

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
		unset($city);
		$ad->id = $row['id'];
		$ad->name = $row['name'];
		$ad->link = $row['link'];
		$ad->enabled = $row['enabled'];
		$ad->type = $row['type'];
		$ad->hits = $row['hits'];
		$ad->typename = GetAdTypeText($ad->type);

		if ($row['cityid']!=null)
			{
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}

		$ad->city = $city;
		
		array_push($ads,$ad);
		}

	return $ads;
	}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function FetchAllAdsData($filters)
	{
	SuperAdminsOnly();
	echo json_encode(GetAllAdsData($filters));
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
		RemoveDir($CFG->dirimages . 'ads/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_ads WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}

/*******************************************SAVE FRANCHISE*********************************************************************/

function SaveAd($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$form = parse($data);
	$adid = $form->id;
	$link = ConnectDB();	
	
	
	if ($form->type=='create')
		$adid = InsertQuery('w_ads',$form->fields,$CFG);	
		else
		UpdateQuery('w_ads',$form->fields,$form->id,$CFG);

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'ads/',$oldname,$adid,false,$form->fields->type->value);
		
			$link = ConnectDB();	
			pg_prepare($link,'sql2','UPDATE w_ads SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql2',array(1,$adid));
			pg_close($link);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	//$oldname = $CFG->dirimages.'ads/dummy.jpg';
			//MoveImages($CFG->dirimages . 'ads/',$oldname,$adid,true,$form->fields->type->value);
			$link = ConnectDB();		
			pg_prepare($link,'sql2','UPDATE w_ads SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql2',array(0,$adid));
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
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,95);
			$image->save($folder.'splited.jpg');

			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,214);
			$image->save($folder.'full.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		//create thumbnail and regular size
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,214);
			$image->save($folder.'full.jpg');
			
			$image = new SimpleImage();
			$image->load($finalname);
			$image->resize(205,95);
			$image->save($folder.'splited.jpg');
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
