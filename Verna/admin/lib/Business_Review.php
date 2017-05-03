<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
//FetchAllBusinessReviewPhotoData();
	
switch ($_POST['f'])   
	{
	case 'FetchAllBusinessReviewData':
		FetchAllBusinessReviewData();
	break;
	case 'FetchBusinessReviewDataPhoto':
		FetchBusinessReviewDataPhoto($_POST['id']);
	break;
	case 'FetchAllBusinessReviewPhotoData':
		FetchAllBusinessReviewPhotoData();
	break;
	case 'DeleteBusinessReview':
		DeleteBusinessReview($_POST['data']);
	break;
	case 'DeleteBusinessReview_photo':
		DeleteBusinessReview_photo($_POST['data']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
		case 'SetEnabled_p':
		SetEnabled_p($_POST['id'],$_POST['enabled']);
	break;
	case 'SetRead':
		SetRead($_POST['id'],$_POST['enabled']);
	break;
	case 'SetReadPhotos':
		SetReadPhotos($_POST['id'],$_POST['enabled']);
	break;
	case 'FetchBusinessReviewData':
		FetchBusinessReviewData($_POST['id'],$_POST['zone1']);
		break;
	case 'SaveBusinessReview':
		SaveBusinessReview($_POST['data']); 
	break;
	case 'DeleteFolder':
		DeleteFolder($_POST['id'],$_POST['photos_data'],$_POST['data_id']); 
	break;
	
	case 'FetchAllBusinessDataP':
			FetchAllBusinessDataP();
		break;
	


	default:
		die();
	break; 
	}

/*******************************************GET Business Review DATA**********************************************/

function FetchAllBusinessDataP(){
	$link = ConnectDB();
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	if($_SESSION['user']->level == 0){
		pg_prepare($link,'sql1','SELECT w_business.id,w_business.name FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id WHERE w_business.scriptid = $1 AND w_business.enabled=$2');
		$result = pg_execute($link,'sql1',array($_SESSION['scriptid'],"TRUE"));
	}else if($_SESSION['user']->level == 1){
		pg_prepare($link,'sql2','SELECT w_business.id,w_business.name FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id WHERE w_franchises.admin =$1 AND w_business.scriptid = $2 AND w_business.enabled=$3');
		$result = pg_execute($link,'sql2',array($_SESSION['user']->id,$_SESSION['scriptid'],"TRUE"));
	}else if($_SESSION['user']->level == 2){
		pg_prepare($link,'sql3','SELECT w_business.id,w_business.name FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id and w_users.id=$1 AND w_business.scriptid = $2 AND w_business.enabled=$3');
		$result = pg_execute($link,'sql3',array($_SESSION['user']->id,$_SESSION['scriptid'],"TRUE"));
	}
	//ProvidersOnly();
	
	$businesss = array();
	 
	while($row = pg_fetch_array($result)){
		
		//unset($business);
		$business = new stdClass();
		$business->id = $row['id'];
		$business->name = Fetchbusinesslangnamepp($defultlang,$row['id'],$link);
		if($business->name !=null)
		array_push($businesss,$business);
	}
	echo json_encode($businesss);
	
}

function Fetchbusinesslangnamepp($defultlang,$cid,$link){

	pg_prepare($link,'sqlbusinessdefalutlang'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlbusinessdefalutlang'.$cid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}


function FetchAllBusinessReviewData()
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
	$query = 'select * from w_review';

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

	$query2="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	pg_prepare($link,'sql1',$query2);

	$query3="select city_lang from w_franchises_lang where city_id=$1 and lang_id=$2";
	pg_prepare($link,'sql2',$query3);

	


	$ads = array();
	while($row = pg_fetch_array($result))
		{
		//unset($ad);
		$ad = new stdClass();
		unset($business);
		$ad->id = $row['id'];
		$ad->w_id_business = $row['id_w_business'];
		$ad->city=$row['city'];
		if ($row['id_w_business']!=null)
			{
				
				$result2 = pg_execute($link,'sql1',array($ad->w_id_business,$defultlang));
				$row2 = pg_fetch_array($result2);
			
				$ad->bname = $row2['name_lang'];
			}
			else
			{
				$ad->bname = '';
			}

		if ($row['city']!=null)
			{
				
				$result3 = pg_execute($link,'sql2',array($ad->city,$defultlang));
				$row3 = pg_fetch_array($result3);
			
				$ad->cityn = $row3['city_lang'];
			}
			else
			{
				$ad->cityn = '';
			}

		

		$ad->name = $row['name'];
		$ad->email = $row['email'];
		
		//$ad->comment=substr($row['comment'],0,25);
		if($row['comment'] != ""){
            $ad->comment=substr($row['comment'],0,25);
        }
        else
        {
            $ad->comment = "";
        }
		$ad->quality=$row['quality'];
		$ad->delivery=$row['delivery'];
		$ad->service=$row['dealer'];
		$ad->package=$row['package'];
		$ad->total=$row['package']+$row['dealer']+$row['delivery']+$row['package'];
		//$ad->floatval(total)=floatval($row['quality'])+floatval($row['delivery'])+floatval($row['dealer'])+floatval($row['package']);
		$ad->avg=$ad->total/4;
		$ad->enabled = $row['status'];
		$ad->view_status = $row['view_status'];

		


		//$ad->bname = $business;
		if($ad->name !=null)
		array_push($ads,$ad);
		}



	echo json_encode($ads);
	}

/*********************************************************************************/

	function FetchAllBusinessReviewPhotoData()
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
	$query = 'select * from w_business_photos';

	
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);

	$query2="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	pg_prepare($link,'sql1',$query2);

	$query3="select city_lang from w_franchises_lang where city_id=$1 and lang_id=$2";
	pg_prepare($link,'sql2',$query3);

	// $query4="select * from w_business_photos";
	// pg_prepare($link,'sql3',$query4);	

	// $query5="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	// pg_prepare($link,'sql4',$query5);


	$bps=array();
	//$ads = array();
	while($row = pg_fetch_array($result))
		{
	//	unset($bp);
		unset($business);
		$bp = new stdClass();
		$bp->id = $row['id'];
		$bp->w_id_business = $row['business_id'];
		
		if ($row['business_id']!=null)
			{
				
				$result2 = pg_execute($link,'sql1',array($bp->w_id_business,$defultlang));
				$row2 = pg_fetch_array($result2);
			
				$bp->bname = $row2['name_lang'];
			}
			else
			{
				$bp->bname = '';
			}

		$bp->name = $row['name'];
		$bp->email = $row['email'];
		$bp->enabled = $row['enabled'];
		$bp->view_status = $row['view_status'];
		$bp->photos = $row['photos'];

		


		//$ad->bname = $business;
		if($bp->name !=null)
		array_push($bps,$bp);
		}

	echo json_encode($bps);
	}



/*********************************************************************************/	


function FetchBusinessReviewLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_ads_lang WHERE ads_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

/********************************************GET ALL FRANCHISES INFO CALL FROM JS***********************************************************************/


/********************************************DELETE REVIEWES****************************************************************/

function DeleteBusinessReview($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		$link = ConnectDB($CFG);
		pg_prepare($link,'sql','DELETE FROM w_review WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		pg_close($link);
		}
	}
function DeleteBusinessReview_photo($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{

			$queryselectph = 'select photos from w_business_photos where id=$1';
			pg_prepare($link,'sqlselectphts'.$id,$queryselectph);
			$resultselectphts = pg_execute($link,'sqlselectphts'.$id,array($id));
			$rowselectphts = pg_fetch_array($resultselectphts);
			$photos = $rowselectphts['photos'];
			$photos=parse($photos);

			foreach ($photos as $key => $value) {				 	
				$querydeletephts = 'Delete from w_gallery WHERE id=$1';
			 	pg_prepare($link,'sqldeletephts'.$key.$value,$querydeletephts);
			 	pg_execute($link,'sqldeletephts'.$key.$value,array($value));
			 	

				 	unlink($_SERVER['DOCUMENT_ROOT'].'/panel/images/gallery/'.$value.'/gallery.jpg');

				 }

			pg_prepare($link,'sql'.$id,'DELETE FROM w_business_photos WHERE id=$1');
			$result = pg_execute($link,'sql'.$id,array($id));	
			
		}
		pg_close($link);
	}
function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_review SET status=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
function SetEnabled_p($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_business_photos SET enabled=$1 WHERE id=$2');

	// pg_prepare($link,'sqlupgvsd','UPDATE w_gallery SET enabled=$3 WHERE id=$4');
	// pg_execute($link,'sqlupgvsd',array($enabled,$id));
	if (pg_execute($link,'sql',array($enabled,$id)))
	{
		$queryselectp = 'select photos from w_business_photos where id=$1';
		pg_prepare($link,'sqlselectph',$queryselectp);
		$resultselectph = pg_execute($link,'sqlselectph',array($id));

		//unset($br);
		$rowselectph = pg_fetch_array($resultselectph);
			
		 $photos = $rowselectph['photos'];
		 $photos=parse($photos);
		 //$total= count($photos);
		// echo $photos[0];
		 
		 foreach ($photos as $key => $value) {
		 	# code...
		 	$queryupdateg = 'UPDATE w_gallery SET enabled=$1 WHERE id=$2';
		 	pg_prepare($link,'sqlselectph'.$key,$queryupdateg);
		 	pg_execute($link,'sqlselectph'.$key,array($enabled,$value));

		 }
		
		

		echo 'ok';
		
	}
	
	pg_close($link);
	}

	function SetRead($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql26','UPDATE w_review SET view_status=$1 WHERE id=$2');
	if (pg_execute($link,'sql26',array($enabled,$id)))
		echo 'ok';
	else
		"failure";
	pg_close($link);
	}

	function SetReadPhotos($id,$enabled)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql2upvs','UPDATE w_business_photos SET view_status=$1 WHERE id=$2');
	if (pg_execute($link,'sql2upvs',array($enabled,$id)))
	{
		echo 'ok';
	}
	else
		"failure";
	pg_close($link);
	}

function FetchBusinessReviewData($id,$zone1)
{
	 $link = ConnectDB();	
	 // SuperAdminsOnly();
	$conditionalsvalues = array();
	  pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result104 = pg_execute($link,'sqldefalut',array());
	$rows5 = pg_fetch_array($result104);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows5['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	$querybr = 'select * from w_review where id=$1';
	pg_prepare($link,'sqlbr',$querybr);
	$result54 = pg_execute($link,'sqlbr',array($id));

	$querybl="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	pg_prepare($link,'sqlbl',$querybl);

	$querycl="select city_lang from w_franchises_lang where city_id=$1 and lang_id=$2";
	pg_prepare($link,'sqlcl',$querycl);

	$queryorder="select data,date from w_orders where id=$1";
	pg_prepare($link,'sqlor',$queryorder);

	$ads = array();
	while($row65 = pg_fetch_array($result54))
		{
	//	unset($br);
		$br = new stdClass();
		unset($business);
		$br->id = $row65['id'];
		$br->orderid= $row65['id_order'];
		if($row65['id_order']!=null)
		{
			$resultorderdetails = pg_execute($link,'sqlor',array($br->orderid));
				$roworder = pg_fetch_array($resultorderdetails);
			
				$br->orderdetails = $roworder['data'];
				date_default_timezone_set($zone1);
				$br->orderdate = date("d-m-Y", strtotime($roworder['date']));
		}
		else
		{
			$br->orderdetails='';
		}

		$br->w_id_business = $row65['id_w_business'];
		$br->city=$row65['city'];
		if ($row65['id_w_business']!=null)
			{
				
				$result24 = pg_execute($link,'sqlbl',array($br->w_id_business,$defultlang));
				$row24 = pg_fetch_array($result24);
			
				$br->bname = $row24['name_lang'];
			}
			else
			{
				$br->bname = '';
			}

		if ($row65['city']!=null)
			{
				
				$result3 = pg_execute($link,'sqlcl',array($br->city,$defultlang));
				$row3 = pg_fetch_array($result3);
			
				$br->cityn = $row3['city_lang'];
			}
			else
			{
				$br->cityn = '';
			}		
		$br->name = $row65['name'];
		$br->email = $row65['email'];
		
		$br->comment=$row65['comment'];
		$br->quality=$row65['quality'];
		$br->delivery=$row65['delivery'];
		$br->service=$row65['dealer'];
		$br->package=$row65['package'];
		$br->status = $row65['status'];
		$br->view_status = $row65['view_status'];

	}
	echo json_encode($br);
}


function SaveBusinessReview($data)
	{
	SuperAdminsOnly();
	require('../config.php');
	$data = parse($data);
	$link = ConnectDB($CFG);

	
	foreach($data->fields as $name=>$set){
		$data->fields->$name->value = base64_decode($set->value);
		$data->fields->$name->ivalue = base64_decode($set->ivalue);	
	}

		$form = $data;	
		$adid = $form->id;
		$nameval = $form->fields->name->value;
		$namelang = explode(",",$nameval);
		
		$temp = new stdClass();
		foreach($form->fields as $name=>$set){		
		
		$temp->$name = new stdClass();
			$temp->$name->value=$set->value;
		}	
		print_r($temp);
		if ($form->type=='create'){

			$catid = InsertQuery('w_review',$temp,$CFG);
		}else{
			UpdateQuery('w_review',$temp,$form->id,$CFG);
		}
		
	}


	function FetchBusinessReviewDataPhoto($id)
{
	//SuperAdminsOnly();
	$link = ConnectDB();	
	 // SuperAdminsOnly();
	$conditionalsvalues = array();
	  pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result104 = pg_execute($link,'sqldefalut',array());
	$rows5 = pg_fetch_array($result104);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows5['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}

	$querybr = 'select * from w_business_photos where id=$1';
	pg_prepare($link,'sqlbr',$querybr);
	$result54 = pg_execute($link,'sqlbr',array($id));

	$querybl="select name_lang from w_business_lang where business_id=$1 and lang_id=$2";
	pg_prepare($link,'sqlbl',$querybl);

	


	$ads = array();
	while($row65 = pg_fetch_array($result54))
		{
			$br = new stdClass();
		//unset($br);
		unset($business);
		$br->id = $row65['id'];
		

		$br->business_id = $row65['business_id'];
		
		if ($row65['business_id']!=null)
			{
				
				$result24 = pg_execute($link,'sqlbl',array($br->business_id,$defultlang));
				$row24 = pg_fetch_array($result24);
			
				$br->bname = $row24['name_lang'];
			}
			else
			{
				$br->bname = '';
			}

			
		$br->name = $row65['name'];
		$br->email = $row65['email'];
		$br->enable = $row65['enabled'];
		$br->view_status = $row65['view_status'];
		$br->photos =$row65['photos'];

	}
	echo json_encode($br); 
}
// function DeleteFolder($id)
// 	{
// 		echo ('../panel/iamges/gallery/'.$id);
// 		//rmdir('../panel/iamges/gallery/'.$id);
// 	}

// 	function DeleteFolder($id) {

//     if(is_dir($id)){
//         $files = glob( $id . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned
        
//         foreach( $files as $file )
//         {
//             delete_files( $file );      
//         }
      
//         rmdir( $id );
//     } elseif(is_file($id)) {
//         unlink( $id );  
//     }

// }

	function DeleteFolder($id,$photos,$review_id) {
		
		$arr = array();
		$arr[0] = $id;
		SuperAdminsOnly();
		require('../config.php');
	    $photos = parse($photos);
		$photos = (array) $photos;
		$photos = array_diff($photos, $arr);
		//print_r($photos);
		if($photos !=null)
		{
			$str = '[';
			foreach($photos as $ph){
				$str .=	$ph.',';
			}
			$str = substr_replace($str, "", -1);
			$str .=']';
		    $photos = $str;
		    //echo $photos;

			
			
			$link = ConnectDB($CFG); 
		
			
		pg_prepare($link,'sql26del','DELETE from w_gallery WHERE id=$1');
		pg_execute($link,'sql26del',array($id));
		
		
		
		pg_prepare($link,'sql121e','UPDATE w_business_photos SET photos=$1 WHERE id=$2');
		if(pg_execute($link,'sql121e',array($photos,$review_id)))
		
			echo 'ok';
		pg_close($link);
	 	unlink($_SERVER['DOCUMENT_ROOT'].'/panel/images/gallery/'.$id.'/gallery.jpg');
 	  }	
 	  else
 	  {
 	  	$link = ConnectDB($CFG); 
		
		pg_prepare($link,'sql26del','DELETE from w_gallery WHERE id=$1');
		pg_execute($link,'sql26del',array($id));
		
 	  	pg_prepare($link,'sql28del','DELETE from w_business_photos WHERE id=$1');
		pg_execute($link,'sql28del',array($review_id));
		
		echo 'ok';
		pg_close($link);
		unlink($_SERVER['DOCUMENT_ROOT'].'/panel/images/gallery/'.$id.'/gallery.jpg');
		

 	  }
 	
}

?>
