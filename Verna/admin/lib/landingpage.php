<?php

require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f']){
	case 'FetchAllLandingData':
		FetchAllLandingData();
	break;
	case 'SetEnabledName':
		SetEnabledName($_POST['id'],$_POST['enabled']);
	break;
	case 'SetEnabledEmail':
		SetEnabledEmail($_POST['id'],$_POST['enabled']);
	break;
	case 'SetEnabledPostCode':
		SetEnabledPostCode($_POST['id'],$_POST['enabled']);
	break;
	case 'SetEnabledTermsCondition':
		SetEnabledTermsCondition($_POST['id'],$_POST['enabled']);
	break;
	case 'SaveLanding':
		SaveLanding($_POST['data']);
	break;

}


function FetchAllLandingData(){	
	SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sqllangfetchbusiness','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetchbusiness',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	
	if ($_SESSION['user']->level=='0'){//get all franchises from which the admin is admin
		$query = 'SELECT * FROM w_landing_page_settings WHERE scriptid= $1 ';
	}
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));	


	pg_prepare($link,'sql55','SELECT * FROM w_landing_page_settings_lang WHERE landing_settings_id	=$1');
	$result1 = pg_execute($link,'sql55',array('1'));

	$landingset = array();
	while($row = pg_fetch_array($result)){
		//unset($landing);	
		$landing = new stdClass();	
		$landing->id = $row['id'];
		//$landing->pagetitle=$row['page_title'];
		//$landing->pageheading =$row['page_heading'];
	    


	    	$pagetitlearray = array();
	    	$pageheadingarray= array();
	    	$pagecontentarray= array();
	    	$pagenamearray= array();
	    	$pageemailarray= array();
	    	$pagepostcodearray=array();
	    	$pagetermsarray=array();
	    	$pagemetakeyword=array();
	    	$pagemetacontent=array();
			while($row1 = pg_fetch_array($result1)){
				$pagetitlearray[$row1['lang_id']] = $row1['pagetittle_lang'];
				$pageheadingarray[$row1['lang_id']]=$row1['page_heading_lang'];
				$pagecontentarray[$row1['lang_id']]=$row1['pagecontent_lang'];
				$pagenamearray[$row1['lang_id']]=$row1['name_lang'];
				$pageemailarray[$row1['lang_id']]=$row1['email_lang'];
				$pagepostcodearray[$row1['lang_id']]=$row1['postcode_lang'];
				$pagetermsarray[$row1['lang_id']]=$row1['terms_conditions_lang'];
				$pagemetakeyword[$row1['lang_id']]=$row1['metakeyword_lang'];
				$pagemetacontent[$row1['lang_id']]=$row1['metacontent_lang'];
			}


	   // $landing->pageheading = FetchLandingHeadingLangDefault($defaultid,$row['id'],$link);
		$landing->pagetitle = $pagetitlearray;
		$landing->pageheading =$pageheadingarray;
	    $landing->backgroundimage=$row['background_image'];
		$landing->pagecontent =$row['page_content'];
		$landing->name=$pagenamearray;
		$landing->email=$pageemailarray;
		$landing->postcode=$pagepostcodearray;
		$landing->terms_conditions=$pagetermsarray;
		$landing->mailchimp_api=$row['mailchimp_api'];
		$landing->mailchimp_listid=$row['mailchimp_listid'];
		$landing->jscode=$row['jscode'];
		$landing->home_page_of_system=$row['home_page_of_system'];
		// $landing->name=FetchLandingNameLangDefault($defaultid,$row['id'],$link);
		// $landing->email = FetchLandingEmailLangDefault($defaultid,$row['id'],$link);
		// $landing->postcode =FetchLandingPostCodeLangDefault($defaultid,$row['id'],$link);
		// $landing->terms_conditions=FetchLandingTermsConditionsDefault($defaultid,$row['id'],$link);

		$landing->uniqueurl = $row['unique_url'];
		$landing->metakeyword = $pagemetakeyword;
		$landing->metacontent = $pagemetacontent;
		
		$landing->name_enabled = $row['name_enabled'];
		$landing->email_enabled = $row['email_enabled'];
		$landing->postcode_enabled = $row['postcode_enabled'];
		$landing->terms_conditions_enabled =$row['terms_conditions_enabled'];
		if($landing->id !=null)
		array_push($landingset,$landing);
	}

	echo json_encode($landingset);
}

function FetchLandingTitleLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang410'.$cid,'SELECT * from w_landing_page_settings_lang WHERE landing_settings_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang410'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result1);
	return $rows['pagetittle_lang'];
}

function FetchLandingHeadingLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang411'.$cid,'SELECT * from w_landing_page_settings_lang WHERE landing_settings_id=$1 and lang_id=$2');
	$result10 = pg_execute($link,'sqldefalutlang411'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result10);
	return $rows['page_heading_lang'];
}

function FetchLandingNameLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang412'.$cid,'SELECT * from w_landing_page_settings_lang WHERE landing_settings_id=$1 and lang_id=$2');
	$result11 = pg_execute($link,'sqldefalutlang412'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result11);
	return $rows['name_lang'];
}

function FetchLandingEmailLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang413'.$cid,'SELECT * from w_landing_page_settings_lang WHERE landing_settings_id=$1 and lang_id=$2');
	$result12 = pg_execute($link,'sqldefalutlang413'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result12);
	return $rows['email_lang'];
}

function FetchLandingPostCodeLangDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang414'.$cid,'SELECT * from w_landing_page_settings_lang WHERE landing_settings_id=$1 and lang_id=$2');
	$result13 = pg_execute($link,'sqldefalutlang414'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result13);
	return $rows['postcode_lang'];
}

function FetchLandingTermsConditionsDefault($defaultid,$cid,$link){
	pg_prepare($link,'sqldefalutlang415'.$cid,'SELECT * from w_landing_page_settings_lang WHERE landing_settings_id=$1 and lang_id=$2');
	$result14 = pg_execute($link,'sqldefalutlang415'.$cid,array($cid,$defaultid));
	$rows = pg_fetch_array($result14);
	return $rows['terms_conditions_lang'];
}
function SetEnabledName($id,$enabled){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_landing_page_settings SET name_enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}
function SetEnabledEmail($id,$enabled){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql2','UPDATE w_landing_page_settings SET email_enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql2',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}
function SetEnabledPostCode($id,$enabled){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql3','UPDATE w_landing_page_settings SET postcode_enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql3',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}
function SetEnabledTermsCondition($id,$enabled){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql4','UPDATE w_landing_page_settings SET terms_conditions_enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql4',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
}

function SaveLanding($data){
	require('../config.php');
	$link = ConnectDB();
	$data = parse($data);
	
	foreach($data->fields as $name=>$set){
		
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);
		
		$data->fields->$name->value = str_replace("@@","+",$data->fields->$name->value);
		$data->fields->$name->ivalue = str_replace("@@","+",$data->fields->$name->ivalue);	

		$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$set->value = html_entity_decode($varr,null,'UTF-8');

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$set->ivalue = html_entity_decode($varr1,null,'UTF-8');
		
		////// + sign  fetch and insert into db //////////////
		$set->value = str_replace("@@","+",$set->value);
		$set->ivalue = str_replace("@@","+",$set->ivalue);
		////// end//////////////



	}
	$form = $data;
	$adid = $form->id;
	//print_r($form);	
	
	//exit();
	// $customurlval = $form->fields->customurl->value;
	// $customurllang = explode(",",$customurlval);

	$pagetitleval = $form->fields->pagetitle->value;
	$pagetitlelang = explode(",",$pagetitleval);

	
	$pageheadingval = $form->fields->pageheading->value;
	$pageheadinglang = explode(",",$pageheadingval);

	$pagecontentval=$form->pagecontent;
	$pagebackgroudimage=$form->image;

	
	$nameval=$form->fields->name->value;
	$namelang=explode(",", $nameval);

	$emailval=$form->fields->email->value;
	$emailang=explode(",", $emailval);

	$postcodeval=$form->fields->postcode->value;
    $postcodelang=explode(",", $postcodeval);
    //print_r($postcodelang);

	$termsconditionval=$form->fields->terms_conditions->value;
	$termsconditionlang=explode(",", $termsconditionval);

	$mailchimpapival=$form->fields->mailchimp_api->value;
	
	$mailchimplistidval=$form->fields->mailchimp_listid->value;
	
	$trafficejsval=$form->fields->traffice_js->value;

	//echo $systemval=$form->fields->system->value;
	// if($systemval=="f")
	// {
	// 	$systemval=$form->fields->
	// }

	$uniqueurlval=$form->fields->uniqueurl->value;
	$form->fields->pagecontent->value = str_replace("@@@","&", $pagecontentval);

	$form->fields->image->value = $pagebackgroudimage;
	
	$metakeywordval = $form->fields->metakeyword->value;
	$metakeywordlang = explode(",",$metakeywordval);
	
	

	
	$metacontentval = $form->fields->metacontent->value;
	$metacontentlang = explode(",",$metacontentval);

	
	pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting where opdefault=1');
	$result1 = pg_execute($link,'sqllangfetch',array());
	$row1=pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defaultid = $row1['id'];
	}else{
	$defaultid = $_SESSION['admin_lang'];	
	}
	foreach($pagetitlelang as $key=>$nlang){
		if($key == $defaultid){
			$form->fields->pagetitle->value = $nlang;
		}
	}
	
	
	foreach($pageheadinglang as $key=>$pagelang){
		if($key == $defaultid){
			$form->fields->pageheading->value = $pagelang;
		}
	}

	foreach ($namelang as $key => $namekeylang) {
		if($key == $defaultid){
			$form->fields->name->value = $namekeylang;
		}
	}

	foreach ($emailang as $key => $emailkeylang) {
		if($key == $defaultid){
			$form->fields->email->value = $emailkeylang;
		}
	}

	foreach ($postcodelang as $key => $postcodekeylang) {
		if($key == $defaultid){
			$form->fields->postcode->value = $postcodekeylang;
		}
	}

	foreach ($termsconditionlang as $key => $termconditionkeylang) {
		if($key == $defaultid){
			$form->fields->terms_conditions->value = $termconditionkeylang;
		}
	}




	foreach($metakeywordlang as $key=>$metakeylang){
		if($key == $defaultid){
			$form->fields->metakeyword->value = $metakeylang;
		}
	}
	foreach($metacontentlang as $key=>$metaconlang){
		if($key == $defaultid){
			$form->fields->metacontent->value = $metaconlang;
		}
	}	
	
	
	
	//print_r($postcodelang);

	
	pg_prepare($link,'Sqlupdate','Update w_landing_page_settings set page_title=$1,page_heading=$2,page_content=$3,name=$4,email=$5,postcode=$6,terms_conditions=$7,mailchimp_api=$8,mailchimp_listid=$9,jscode=$10,home_page_of_system=$11,unique_url=$12,meta_keyword=$13,meta_content=$14 where id=$15');
	pg_execute($link,'Sqlupdate',array($form->fields->pagetitle->value,$form->fields->pageheading->value,$form->fields->pagecontent->value,$form->fields->name->value,$form->fields->email->value,$form->fields->postcode->value,$form->fields->terms_conditions->value,$form->fields->mailchimp_api->value,$form->fields->mailchimp_listid->value,$form->fields->traffice_js->value,$form->fields->home_page_of_system->value,$form->fields->uniqueurl->value,$form->fields->metakeyword->value,$form->fields->metacontent->value,$adid));
	//UpdateQuery('w_landing_page_settings',$form->fields,$form->id,$CFG);


	if ($form->image){
			$oldname = $CFG->dir.'temp/'.$form->image;
			$finalname=$form->image;
			MoveBusinessImages($CFG->dirimages,$oldname,$finalname);
			$link = ConnectDB();		
			pg_prepare($link,'sql','UPDATE w_landing_page_settings SET background_image=$1 WHERE id=$2');
			pg_execute($link,'sql',array($form->fields->image->value,$adid));
			pg_close($link);
	}
	
		foreach($pagetitlelang as $key=>$nlang){
			if(!empty($nlang)){	
				$link = ConnectDB();
				pg_prepare($link,'sqllangsearch','SELECT * FROM w_landing_page_settings_lang where lang_id=$1 AND landing_settings_id=$2');
				$resultsearch = pg_execute($link,'sqllangsearch',array($key,$adid));
				echo pg_num_rows($resultsearch);
				if(pg_num_rows($resultsearch) == 0){
					unset($forms->fields);
					$forms->fields->landing_settings_id = new stdClass();
					$forms->fields->landing_settings_id->ivalue = '';
					$forms->fields->landing_settings_id->value = $adid;		

					$forms->fields->lang_id = new stdClass();
					$forms->fields->lang_id->value = $key;
					$forms->fields->lang_id->ivalue = '';

					$forms->fields->pagetittle_lang = new stdClass();
					$forms->fields->pagetittle_lang->value = $nlang;
					$forms->fields->pagetittle_lang->ivalue = '';
					
					$forms->fields->page_heading_lang = new stdClass();
					$forms->fields->page_heading_lang->value = $pageheadinglang[$key];
					$forms->fields->page_heading_lang->ivalue = '';

					$forms->fields->name_lang = new stdClass();
					$forms->fields->name_lang->value = $namelang[$key];
					$forms->fields->name_lang->ivalue = '';

					$forms->fields->email_lang = new stdClass();
					$forms->fields->email_lang->value = $emailang[$key];
					$forms->fields->email_lang->ivalue = '';

					$forms->fields->postcode_lang = new stdClass();
					$forms->fields->postcode_lang->value = $postcodelang[$key];
					$forms->fields->postcode_lang->ivalue = '';
					

					$forms->fields->terms_conditions_lang = new stdClass();
					$forms->fields->terms_conditions_lang->value = $termsconditionlang[$key];
					$forms->fields->terms_conditions_lang->ivalue = '';

					
					$forms->fields->metakeyword_lang = new stdClass();
					$forms->fields->metakeyword_lang->value = $metakeywordlang[$key];
					$forms->fields->metakeyword_lang->ivalue = '';
					
					$forms->fields->metacontent_lang = new stdClass();
					$forms->fields->metacontent_lang->value = $metacontentlang[$key];
					$forms->fields->metacontent_lang->ivalue = '';
					
					

					InsertQuery('w_landing_page_settings_lang',$forms->fields,$CFG);

				}else{
					pg_prepare($link,'sqllangupdate','UPDATE w_landing_page_settings_lang SET pagetittle_lang=$1,page_heading_lang=$2,name_lang=$3,email_lang=$4,postcode_lang=$5,terms_conditions_lang=$6,metakeyword_lang=$7,metacontent_lang=$8 where lang_id=$9 and landing_settings_id=$10');
					pg_execute($link,'sqllangupdate',array($nlang,$pageheadinglang[$key],$namelang[$key],$emailang[$key],$postcodelang[$key],$termsconditionlang[$key],$metakeywordlang[$key],$metacontentlang[$key],$key,$adid));					
				}
									
			}				
		}
		
	
}


// function MoveBusinessImages($root,$oldname,$dummy=false,$innerfolder='')
// 	{
// 		//echo $root;
// 	 $folder = $root .'landing/';
// 	echo $finalname = $folder.'original.jpg';
	
// 	if(preg_match('/[.]/', $folder)) die();

// 	if(!file_exists($folder)) 
// 		mkdir($folder, 0777,true);

// 	$ext_arr = split("\.",$form->image);
// 	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

// 	require_once('resize.php');
// 	if ($ext=='png')//if png convert it to jpg
// 		{
// 		$input = imagecreatefrompng($oldname);
// 		list($width, $height) = getimagesize($oldname);
// 		$output = imagecreatetruecolor($width, $height);
// 		$white = imagecolorallocate($output,  255, 255, 255);
// 		imagefilledrectangle($output, 0, 0, $width, $height, $white);
// 		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
// 		imagejpeg($output,$finalname);
// 		unlink($oldname);

// 		//create thumbnail and regular size
// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(32,32);
// 		$image->save($folder.'mini.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(64,64);
// 		$image->save($folder.'small.jpg');

// 		$image->gray();		
// 		$image->save($folder.'smallgray.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(32,32);
// 		$image->save($folder.'mini.jpg');

// 		$image->gray();		
// 		$image->save($folder.'minigray.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(110,110);
// 		$image->save($folder.'medium.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(264,264);
// 		$image->save($folder.'panel.jpg');
		
// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(399,307);
// 		$image->save($folder.'admin.jpg');
// 		}
// 		else
// 		{
			
// 		copy($oldname,$finalname);
// 		if ($dummy!=true)
// 			unlink($oldname);
// 		//create thumbnail and regular size
// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(32,32);
// 		$image->save($folder.'mini.jpg');
		
// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(64,64);
// 		$image->save($folder.'small.jpg');

// 		$image->gray();		
// 		$image->save($folder.'smallgray.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(32,32);
// 		$image->save($folder.'mini.jpg');

// 		$image->gray();		
// 		$image->save($folder.'minigray.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(110,110);
// 		$image->save($folder.'medium.jpg');

// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(264,264);
// 		$image->save($folder.'panel.jpg');
		
// 		$image = new SimpleImage();
// 		$image->load($finalname);
// 		$image->resize(399,307);
// 		$image->save($folder.'admin.jpg');
// 		}
// 	}



	function MoveBusinessImages($root,$oldname,$name,$dummy=false,$innerfolder='')
	{
	$folder = $root .'landing/';
	echo $finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
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
		$image->resize(32,32);
		$image->save($folder.$name);

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image->gray();		
		$image->save($folder.'smallgray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image->gray();		
		$image->save($folder.'minigray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(110,110);
		$image->save($folder.'medium.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'panel.jpg');
		
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(475,85);
		$image->save($folder.'admin.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(1349,292);
		$image->save($folder.'banner.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');
		
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image->gray();		
		$image->save($folder.'smallgray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image->gray();		
		$image->save($folder.'minigray.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(110,110);
		$image->save($folder.'medium.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.$name);
		
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(475,85);
		$image->save($folder.'admin.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(1349,292);
		$image->save($folder.'banner.jpg');
		}
	}
?>
