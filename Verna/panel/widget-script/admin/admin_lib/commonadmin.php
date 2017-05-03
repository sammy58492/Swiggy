<?php 
session_start();
require('panel-main.php');

/*function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}
*/
switch ($_POST['f'])
	{
	case 'fetchdishExtra':
		fetchdishExtra();
	break;
	
	case 'FetchAllSubCategoriesData':
	
		FetchAllSubCategoriesData($_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	
	case 'FetchAllCategory':
		FetchAllCategory($_POST['id']);
	break;
	
	case 'SaveSubCategories':
		SaveSubCategories($_POST['data']);
	break;
	case 'GetSubCategoryData':
		GetSubCategoryData($_POST['id']);
	break;
	
	case 'DeleteSubCate':
		DeleteSubCate($_POST['data']);
	break;
	case 'FetchAllBusinessCategoryIDData':
		FetchAllBusinessCategoryIDData($_POST['data'],$_POST['id']);
	break;
	
	
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/
	
function fetchdishExtra()
	{
	echo "a";
	}

/********************************************DELETE FRANCHISE****************************************************************/

/*****************************FETCH SUBCATE******************************/
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
	
	pg_prepare($link,'sql','SELECT * from w_subcategories where business=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($id));
	
	$categories = array();
	$i = 0;
	while($row = pg_fetch_array($result)){
		$categories[$i]['id'] = $row['id'];
		$categories[$i]['name'] = FetchSubCategoryLangDefault($defultlang,$row['id'],$link);
		$categories[$i]['business'] = $row['business'];
		$categories[$i]['category'] = $row['category'];
		$categories[$i]['enabled'] = $row['enabled'];	
		$i ++;	
	}

	
	echo json_encode($categories);
}

function FetchSubCategoryLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_subcategories_lang WHERE subcategories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function SetEnabled($id,$enabled){
	
	$link = ConnectDB();		
	//$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_subcategories SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}


function FetchAllCategory($id){
		
		$link = ConnectDB();
		
		pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
		$result4 = pg_execute($link,'sqldefalut',array());
		$rows = pg_fetch_array($result4);
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		$defultlang = $rows['id'];
		}else{
		$defultlang = $_SESSION['admin_lang'];	
		}
		
		pg_prepare($link,'sql',"SELECT * FROM w_categories where business=$1");
		$result = pg_execute($link,'sql',array($id));
		$category =array();	
		
		while($row = pg_fetch_array($result)){
			unset($cat);
			$cat->id = $row['id'];
			$cat->name = FetchBusinessCategoryLangDefault($defultlang,$row['id'],$link);
			array_push($category, $cat);
		}
		echo json_encode($category);
	}	
	
	
function FetchBusinessCategoryLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
function SaveSubCategories($data){
		require('../../../config.php');
		$data = parse($data);
		$link = ConnectDB($CFG);
		$temp=null;
		
		foreach($data->fields as $name=>$set){
			$set->value = str_replace("@@","+",$set->value);
			$set->ivalue = str_replace("@@","+",$set->ivalue);
	
			$set->value = base64_decode($set->value);
			$set->ivalue = base64_decode($set->ivalue);	

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
	
		foreach($form->fields as $name=>$set){
		
		$temp->$name->value=$set->value;
		}
		$temp->scriptid->value=$_SESSION['scriptid'];
		//print_r($temp);
			
			
			
			

		
		if ($form->type=='create')
		{
			$catid = InsertQuery('w_subcategories',$temp,$CFG);
			//$link = ConnectDB($CFG);

			foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){		
				unset($datas->fields);
				$datas->fields->subcategories_id = new stdClass();
				$datas->fields->subcategories_id->ivalue = '';
				$datas->fields->subcategories_id->value = $catid;		

				$datas->fields->lang_id = new stdClass();
				$datas->fields->lang_id->value = $key;
				$datas->fields->lang_id->ivalue = '';

				$datas->fields->name_lang = new stdClass();
				$datas->fields->name_lang->value = $nlang;
				$datas->fields->name_lang->ivalue = '';
				
				$datas->fields->business_id = new stdClass();
				$datas->fields->business_id->ivalue = '';
				$datas->fields->business_id->value = $business_id;
				

				InsertQuery('w_subcategories_lang',$datas->fields,$CFG);
			}				
		}
			
			}
		
		else
		{
		   UpdateQuery('w_subcategories',$temp,$catid,$CFG);
		   //$link = ConnectDB($CFG);
		  
		   $link = ConnectDB($CFG);
		   foreach($namelang as $key=>$nlang){
			if(!empty($nlang)){	
				pg_prepare($link,'sqllangsearch'.$key,'SELECT * FROM w_subcategories_lang where lang_id=$1 AND subcategories_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch'.$key,array($key,$catid));				
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->subcategories_id = new stdClass();
					$forms->fields->subcategories_id->ivalue = '';
					$forms->fields->subcategories_id->value = $catid;		
	
					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';
	
					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $nlang;
					$forms->fields->name_lang->ivalue = '';
					
					$forms->fields->business_id = new stdClass();
					$forms->fields->business_id->ivalue = '';
					$forms->fields->business_id->value = $business_id;

					InsertQuery('w_subcategories_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate'.$key,'UPDATE w_subcategories_lang SET name_lang=$1 where lang_id=$2 and subcategories_id=$3');
					pg_execute($link,'sqllangupdate'.$key,array($nlang,$key,$catid));					
				}
									
			}				
		}
		   
		   pg_close($link); 		
			
		}
	
	
}

function GetSubCategoryData($id)
	{
	//SuperAdminsOnly();
	
	require('../../../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sqlcat','SELECT * FROM w_subcategories WHERE id=$1');
	$result = pg_execute($link,'sqlcat',array($id));
	
	pg_prepare($link,'sqlcategorieslang','SELECT * from w_subcategories_lang WHERE subcategories_id=$1');
	$result1 = pg_execute($link,'sqlcategorieslang',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$ad->category = $row['category'];
			
			$namearray=array();				
			$idarray = array();
			
			while($row1 = pg_fetch_array($result1))
			{
				$namearray[$row1['lang_id']] = $row1['name_lang'];
				$idarray[$row1['lang_id']] = $row1['id'];
			
			}
			$ad->name = $namearray;
			$ad->langid = $idarray;

			
			}
	
	echo json_encode($ad);
	pg_close($link);
	}
function DeleteSubCate($data)
	{
	//AdminsOnly();
	require('../../../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	
	foreach ($data->ids as $id)
		{
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql0','DELETE FROM w_subcategories WHERE id=$1');
			$result = pg_execute($link,'sql0',array($id));			
			pg_close($link);
			$link = ConnectDB($CFG);
			pg_prepare($link,'sql0','DELETE FROM w_subcategories_lang WHERE subcategories_id=$1');
			$result = pg_execute($link,'sql0',array($id));
			pg_close($link);
				}
			
			
			
    }
	
function FetchAllBusinessCategoryIDData($data,$id){
	$link = ConnectDB();
	$defultlang = $data;
	pg_prepare($link,'sql','SELECT * from w_categories WHERE business=$1 ORDER BY id ASC');
	$result = pg_execute($link,'sql',array($id));
	$categorieslang = array();
	
	while($row = pg_fetch_array($result)){
		unset($categorylang);
		$categorylang->id = $row['id'];
		$categorylang->name = FetchCatenameLangDefault($defultlang,$row['id'],$link);
		if($categorylang->name !=null)
		array_push($categorieslang,$categorylang);	
	}
	echo json_encode($categorieslang);
}
function FetchCatenameLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang22'.$cid,'SELECT * from w_categories_lang WHERE categories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang22'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}	
	

/*****************************END SUBCATE******************************/
?>
