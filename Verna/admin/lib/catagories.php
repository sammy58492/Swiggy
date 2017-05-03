<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

/*function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}*/

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f']){	

	case 'FetchAllCategoriesData':
		FetchAllSubCategoriesData($_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	case 'SaveCategories':
	    SaveCategories($_POST['data']);
	break;
	case 'FetchCategoriesData':
		FetchCategoriesData($_POST['id']);
	break;
	case 'DeleteCategory':
		DeleteCategory($_POST['data'],$_POST['bid']);
	break;
	case 'ChangeRank':
		ChangeRank($_POST['destrank'],$_POST['sourcerank'],$_POST['bid']);
	break;

	case 'GetNameAvailabilty':
	    GetNameAvailabilty($_POST['data']);
	break;


	
	
	default:
		die();
	break;
}
function FetchAllSubCategoriesData($id){

	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result4 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result4);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	pg_prepare($link,'sql','SELECT * from w_categories where business=$1 AND scriptid=$2 ORDER BY rank');
	$result = pg_execute($link,'sql',array($id,$_SESSION['scriptid']));

	pg_prepare($link,'sql1','SELECT max(rank) as maxrank from w_categories where business=$1');
	$categories = array();
	$i = 0;
	while($row = pg_fetch_array($result)){
		$categories[$i]['id'] = $row['id'];
		$categories[$i]['name'] = FetchCategoryLangDefault($defultlang,$row['id'],$link);
		$categories[$i]['business'] = $row['business'];
		$categories[$i]['rank'] = $row['rank'];
		
		$result1 = pg_execute($link,'sql1',array($id));
		$row1 = pg_fetch_array($result1);
		
		$categories[$i]['maxrank'] = $row1['maxrank'];
		$categories[$i]['enabled'] = $row['enabled'];	
		$i ++;	
	}
	echo json_encode($categories);
}

function FetchCategoryLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
	
	
function SetEnabled($id,$enabled){
	
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_categories SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}

/***************************************************************** INSERT CATEGORIES DATA ************************************************/

function GetNameAvailabilty($data){	
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);

	
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
	foreach($data->catg as $name=>$set){
		$set = str_replace("@@","+",$set);		
		$set = base64_decode($set);
		/*$varr2 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set)); 
		$data->catg->$name = html_entity_decode($varr2,null,'UTF-8');	*/	


	}
	
	$form = $data;
	$usrid = $form->id;
	$business_id= $form->fields->business->value;
	$cityval = $form->fields->name->value;
	$citylang = explode(",",$cityval);
	if ($form->type=='create'){
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_categories_lang where lang_id=$1 and business_id=$2');




		foreach($citylang as $key=>$nlang){			
			$result1 = pg_execute($link,'sqllangfetch',array($key,$business_id));
			while($row1=pg_fetch_array($result1)){
				if($nlang==$row1['name_lang']){
				echo "cancel";	
				}				
			}

		}	
	}else{
			pg_prepare($link,'sqllangfetch','SELECT * FROM w_categories_lang where categories_id!=$1 and lang_id=$2 and business_id=$3');
			foreach($citylang as $key=>$nlang){			
			$result1 = pg_execute($link,'sqllangfetch',array($usrid,$key,$business_id));
			while($row1=pg_fetch_array($result1)){
				if($nlang==$row1['name_lang']){
				echo "cancel";	
				}				
			}

		}	
	}


}



/*function GetNameAvailabilty($data){
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);

	
	foreach($data->fields as $name=>$set){

		$set->value = base64_decode($set->value);
		$set->ivalue = base64_decode($set->ivalue);	

		$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');

	}
	foreach($data->catg as $name=>$set){
		$set = base64_decode($set);
		$varr2 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set)); 
		$data->catg->$name = html_entity_decode($varr2,null,'UTF-8');		


	}
	$form = $data;
	$catid = $form->id; 
	$business_id= $form->fields->business->value;
	$name= $form->fields->name->value;
	
	if ($form->type=='create'){
		pg_prepare($link,'sqlcheck','SELECT * FROM w_categories WHERE lower(name) like lower($1) and business=$2');
		$result = pg_execute($link,'sqlcheck',array($name,$business_id));
		if(pg_num_rows($result) > 0){
			echo "cancel";
		}else{
			echo "ok";
		}
	}else{
		pg_prepare($link,'sqlcheck','SELECT * FROM w_categories WHERE lower(name) like lower($1) and business=$2 and id!=$3');
		$result = pg_execute($link,'sqlcheck',array($name,$business_id,$catid));
		if(pg_num_rows($result) > 0){
			echo "cancel";
		}else{
			echo "ok";
		}
	}

}*/
function SaveCategories($data)
	{
		
		require('../config.php');
		$data = json_decode($data);
		$link = ConnectDB($CFG);
		$temp=null;
		
		foreach($data->fields as $name=>$set){
			$set->value = str_replace("@@","+",$set->value);
			$set->ivalue = str_replace("@@","+",$set->ivalue);
	
			$set->value = base64_decode($set->value);
			$set->ivalue = base64_decode($set->ivalue);	
	
			/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
			$data->fields->$name->value = html_entity_decode($varr,null,'UTF-8');		
	
			$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
			$data->fields->$name->ivalue = html_entity_decode($varr1,null,'UTF-8');*/
	
		}
		
		foreach($data->catg as $name=>$set){
			$set = str_replace("@@","+",$set);	
			$set = base64_decode($set);
		/*$varr2 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set)); 
		$data->catg->$name = html_entity_decode($varr2,null,'UTF-8');		*/


	}
		
		$form = $data;	
		$catid = $form->id;	
		$business_id= $form->fields->business->value;
		$nameval = $form->fields->name->value;
		$namelang = explode(",",$nameval);
		
		pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
		$result1 = pg_execute($link,'sqllangfetch',array());
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
		//$temp = new stdClass();
		foreach($form->fields as $name=>$set){
		//	$form = new stdClass();
		$form->$name= new stdClass();
		//$temp->$name = new stdClass();
		$temp->$name->value=$set->value;
		}
		//print_r($temp);
			
		if ($form->type=='create')
		{
			$catid = InsertQuery('w_categories',$temp,$CFG);
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql5','SELECT * FROM w_categories WHERE business=$1');
			$fetch_record = pg_execute($link,'sql5',array($business_id));
			while($rr = pg_fetch_array($fetch_record))
						{
							$business_cateid[] = $rr['id'];
							
						}
						$catedata = json_encode($business_cateid);
						pg_prepare($link,'sql6','UPDATE w_business SET categories=$1 WHERE id=$2');
						pg_execute($link,'sql6',array($catedata,$business_id));
			
			foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
			//	unset($datas->fields);
				$datas = new stdClass();
				$datas->fields = new stdClass();
				$datas->fields->categories_id = new stdClass();
				$datas->fields->categories_id->ivalue = '';
				$datas->fields->categories_id->value = $catid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->name_lang = new stdClass();
				$datas->fields->name_lang->value = $nlang;
				$datas->fields->name_lang->ivalue = '';
				
				$datas->fields->business_id = new stdClass();
				$datas->fields->business_id->ivalue = '';
				$datas->fields->business_id->value = $business_id;
				

				InsertQuery('w_categories_lang',$datas->fields,$CFG);
			}				
		}

		}
		
		else
		{
		   UpdateQuery('w_categories',$temp,$catid,$CFG);
		   $link = ConnectDB($CFG);
		   pg_prepare($link,'sql5','SELECT * FROM w_categories WHERE business=$1');
			$fetch_record = pg_execute($link,'sql5',array($business_id));
			while($rr = pg_fetch_array($fetch_record))
						{
							$business_cateid[] = $rr['id'];
							
						}
						$catedata = json_encode($business_cateid);
						pg_prepare($link,'sql6','UPDATE w_business SET categories=$1 WHERE id=$2');
		   pg_execute($link,'sql6',array($catedata,$business_id));
		   
		   foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_categories_lang where lang_id=$1 AND categories_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$catid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->categories_id = new stdClass();
					$forms->fields->categories_id->ivalue = '';
					$forms->fields->categories_id->value = $catid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->business_id = new stdClass();
					$forms->fields->business_id->ivalue = '';
					$forms->fields->business_id->value = $business_id;

					InsertQuery('w_categories_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_categories_lang SET name_lang=$1 where lang_id=$2 and categories_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$key,$catid));					
				}
									
			}				
		}
		   
		   pg_close($link); 		
			
		}
		
	     if ($form->image){
			 
			  $oldname = $CFG->dir.'temp/'.$form->image;
			  MoveImages($CFG->dirimages . 'categories/',$oldname,$catid,false,'/1');
			  $link = ConnectDB();		
			  pg_prepare($link,'sql1','UPDATE w_categories SET isimg=$1 WHERE id=$2');
			  pg_execute($link,'sql1',array(1,$catid));
			  
			  
			  pg_close($link);
		}
		else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
		if ($form->type=='create'){
			
			  $link = ConnectDB();		
			  pg_prepare($link,'sql1','UPDATE w_categories SET isimg=$1 WHERE id=$2');
			  pg_execute($link,'sql1',array(0,$catid));
			  pg_close($link);
		}
		
	   
	}

/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	echo $finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	//$ext_arr = split("\.",$form->image);
	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require_once('resize.php');
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
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(560,291);
		$image->save($folder.'panel.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'preview.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');


		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(560,291);
		$image->save($folder.'panel.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'preview.jpg');
		}
	}

/****************************************************FETCH PARTICULAR CATEGORY  DATA *********************************************************** */

	function FetchCategoriesData($id)
	{
	//SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sqlcat','SELECT * FROM w_categories WHERE id=$1');
	$result = pg_execute($link,'sqlcat',array($id));
	
	pg_prepare($link,'sqlcategorieslang','SELECT * from w_categories_lang WHERE categories_id=$1');
	$result1 = pg_execute($link,'sqlcategorieslang',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$ad = new stdClass();
		//	unset($ad);
			$ad->id = $row['id'];
			
			$namearray=array();				
			$idarray = array();
			
			while($row1 = pg_fetch_array($result1))
			{
				$namearray[$row1['lang_id']] = $row1['name_lang'];
				$idarray[$row1['lang_id']] = $row1['id'];
			
			}
			$ad->name = $namearray;
			$ad->langid = $idarray;
			$ad->rank = $row['rank'];
			$ad->isimg = $row['isimg'];
			
			}
	
	echo json_encode($ad);
	pg_close($link);
	}
/********************************************************* DELETE CATEGORY *******************************************************/

function DeleteCategory($data,$bid){
	//ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	$data = parse($data);
	
	
	
	pg_prepare($link,'sqlr','SELECT * FROM w_categories WHERE business=$1 ORDER BY rank');
	$result = pg_execute($link,'sqlr',array($bid));
	$rankarray = array();
	$idarray = array();
	while($row = pg_fetch_array($result)){
		array_push($rankarray, $row['rank']);
		array_push($idarray, $row['id']);	
	}
	foreach ($data->ids as $id){
		$delete_index = array_search($id, $idarray);
		array_splice($idarray, $delete_index, 1);
		array_splice($rankarray, $delete_index, 1);

		$a_size = sizeof($rankarray);

		for($i = 0; $i<$a_size; $i++){
			$rankarray[$i] = $i+1;
		}
	}

	foreach ($data->ids as $id){

		if(is_dir($CFG->dirimages . 'categories/' . $id . '/'))	
		RemoveDir($CFG->dirimages . 'categories/' . $id . '/');
		pg_prepare($link,'sql' . $id,'DELETE FROM w_categories WHERE id=$1');
		$result = pg_execute($link,'sql' . $id,array($id));
		
		
		pg_prepare($link,'sql0','DELETE FROM w_categories_lang WHERE categories_id=$1');
		$result = pg_execute($link,'sql0',array($id));
			
	}
	
	pg_prepare($link,'sqldd','SELECT * FROM w_categories WHERE business=$1');
	$fetch_record = pg_execute($link,'sqldd',array($bid));
	if(pg_num_rows($fetch_record)==0){
		$business_cateid =array();
	}else{
	while($rr = pg_fetch_array($fetch_record))
	{
		$business_cateid[] = $rr['id'];
		
	}
	}
	$catedata = json_encode($business_cateid);
	print_r($catedata);
	pg_prepare($link,'sqld6','UPDATE w_business SET categories=$1 WHERE id=$2');
	pg_execute($link,'sqld6',array($catedata,$bid));
	
	$query = 'UPDATE w_categories SET rank=$1 WHERE id=$2 and business=$3';
	pg_prepare($link,'sql_c',$query);
	foreach ($idarray as $key => $value) {
		pg_execute($link,'sql_c',array($rankarray[$key],$value,$bid));
	}
	pg_close($link);
}


function ChangeRank($destrank,$sourcerank,$bid){
		require('../config.php');	
		$link = ConnectDB();
		pg_prepare($link,'sql','SELECT * FROM w_categories WHERE business=$1 ORDER BY rank');
		$result = pg_execute($link,'sql',array($bid));
		$rankarray = array();
		$idarray = array();
		while($row = pg_fetch_array($result)){
			array_push($rankarray, $row['rank']);
			array_push($idarray, $row['id']);	
		}

		//print_r($rankarray);
		$dest_index = array_search($destrank, $rankarray);
		$source_index = array_search($sourcerank, $rankarray);

		if($dest_index > $source_index){
	
			for($i = $source_index + 1; $i<=$dest_index; $i++){
				$rankarray[$i] = $rankarray[$i]-1;
			}
		
			$rankarray[$source_index] = $destrank;
			$temp = $destrank - 1;
			$rankarray[$dest_index] = $temp;

		}
		if($dest_index < $source_index){	
			for($i =$source_index -1; $i>=$dest_index; $i--){
			
				$rankarray[$i] = $rankarray[$i]+1;
			}
	
			$rankarray[$source_index] = $destrank;
	
		}
		$query = 'UPDATE w_categories SET rank=$1 WHERE id=$2 and business=$3';
		pg_prepare($link,'sql_c',$query);
		foreach ($idarray as $key => $value) {
			pg_execute($link,'sql_c',array($rankarray[$key],$value,$bid));
		}

		//print_r($rankarray);
}
