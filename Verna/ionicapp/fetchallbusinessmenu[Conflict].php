<?php
require_once('settings.php');
require_once('multilanguage.php');

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$json = file_get_contents('php://input');
$obj = json_decode( $json );

$businessid = $obj->{'businessid'};
$deliveryType = $obj->{'deliverytype'};
$whereall = $obj->{'whereall'};



/*$businessid = '8';
$deliveryType = 'pickup';
$whereall='{"country":"6","city":"6","delivery_neighborhoodStaus":0,"currency":"USD","ga":"","cityname":"Newyork","collecttype":"pickup","reservestatus":"pickup","address":"","resturant":"","cuisines":"","rhour":-1,"rmin":-1,"location":"{\"latitud\":40.7127837,\"longitud\":-74.00594130000002,\"zipcode\":-1,\"zoom\":15}","approved":true,"zipcode":-1}';*/

$link = ConnectDB();

global $lang_resource;
pg_prepare($link,'sqlfetchlangfront'.time(),'SELECT * from w_lang_static');
	$result = pg_execute($link,'sqlfetchlangfront'.time(),array());
	while($row = pg_fetch_array($result)){
		$lang= 1;
		$lang_resource[$row['lang_key']] = $row['langtext_'.$lang];    
	}
	
	
	
	
	
pg_prepare($link,'sql432','SELECT * FROM w_menus WHERE business=$1 and enabled=true');
	$result = pg_execute($link,'sql432',array($businessid));
	$catalogname = array();
	$dishes = array();
	$allcategory = array();
	$categorynameid = array();
	while($row = pg_fetch_array($result)) {
		unset($catlog);
		unset($weekend);
		$schedule = parse($row['schedule']);
		$days = parse($row['days']);
		for($p=0;$p<count($days);$p++) {
			if($days[$p]==0)
			{
				$weekend[] = $lang_resource['Every_Day_V2'];
			}
			else if($days[$p]==1)
			{
				$weekend[] = $lang_resource['DAY1'];
			}
			 else if($days[$p]==2)
			{
				$weekend[] = $lang_resource['DAY2'];
			}
			 else if($days[$p]==3)
			{
				$weekend[] = $lang_resource['DAY3'];
			}
			 else if($days[$p]==4)
			{
				$weekend[] = $lang_resource['DAY4'];
			}
			 else if($days[$p]==5)
			{
				$weekend[] = $lang_resource['DAY5'];
			}
			 else if($days[$p]==6)
			{
				$weekend[] = $lang_resource['DAY6'];
			}
			 else if($days[$p]==7)
			{
				$weekend[] = $lang_resource['DAY7'];
			}
			
		}
		if(count($weekend)>0)
		$weekends = implode(" , ",$weekend);
		
		$opentime = sprintf('%02d', $schedule->opens->hour).":".sprintf('%02d', $schedule->opens->minute);
		$closetime = sprintf('%02d', $schedule->closes->hour).":".sprintf('%02d', $schedule->closes->minute);
		 $catlog = new stdClass();
		 $catlog->id = $row['id'];
		 $business = $row['business'];
		 pg_prepare($link,'sqld'.$catlog->id,'SELECT w_dishes.name,w_dishes.id,w_dishes.seller_winelibary,w_dishes.origin_winelibary,w_dishes.description,w_dishes.rank_cat,w_dishes.ingredients,w_dishes.price,w_dishes.category,w_dishes.extras,w_dishes.isimg,w_dishes.isimg2,w_dishes.isimg3,w_dishes.feature,w_dishes.points,w_categories.name AS cname FROM w_dishes INNER JOIN w_categories ON w_dishes.business=$1 AND w_dishes.category = w_categories.id AND w_dishes.enabled=true AND w_categories.enabled=true');
		
		$result1 = pg_execute($link,'sqld'.$catlog->id,array($business));
		
		while($row1 = pg_fetch_array($result1))
			{
				//print_r($row1);
			//unset($dish);
			$dish = new stdClass();
			$dishid=$row1['id'];
			
			$dish->id = $dishid;
			$dish->name =$row1['name'];
			///$dish->name = dishidnamebylang($dishid);
			$dish->ingredients = $row1['ingredients'];
			$dish->price = $row1['price'];
			if($row1['extras'] == ""){
			$dish->extras="null";	
			}else{
			$dish->extras = $row1['extras'];
			}
			$dish->category = $row1['category'];
			//$dish->catname = businessmenuprecategorynamebylang($row1['category'],$ui);
			/*if($panelsettings == 2){
				$dish->rank_cat = rankcat($row1['category'],$ui,$link);
			}else{
				$dish->rank_cat = $row1['rank_cat'];
			}*/

			
			$dish->isimg = $row1['isimg'];
			$dish->isimg2 = $row1['isimg2'];
			$dish->isimg3 = $row1['isimg3'];
			//$dish->description = dishiddescriptionbylang($dishid);
			$dish->feature = $row1['feature'];
			$dish->points = $row1['points'];
			$dish->seller_winelibary =$row1['seller_winelibary'];
			$dish->origin_winelibary =$row1['origin_winelibary'];
			//$dish->Alldishsets = GetAllSets($dishid);
			array_push($allcategory,$dish->category);
			array_push($dishes,$dish);
		}
	
	pg_prepare($link,'sqlcat'.$catlog->id,'SELECT * FROM w_categories WHERE business=$1 and enabled=true');
	$result12 = pg_execute($link,'sqlcat'.$catlog->id,array($business));
		while($row12 = pg_fetch_array($result12))
			{
				//unset($cat);
				$cat = new stdClass();
				$cat->id = $row12['id'];
				$cat->name = $row12['name'];
				array_push($categorynameid,$cat);
			}
		$catlog->dish =  $dishes;
		//$catlog->name = businessmenunamebylang($row['id']);
		$catlog->opentime = $opentime;
		$catlog->closetime = $closetime;
		$catlog->weekends = $weekends;
		$catlog->weekends = $weekends;
		array_push($catalogname,$catlog);
		}
	//return $catalogname;	
	$currentdatetime = array();
	$current_date = GetTimeByZone($_SESSION['timezone']);
	$srtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
	$current_date_arr = explode(":",$current_date);
	$date_curr= new stdClass();
	$date = date('d',$srtotime);
	$date_curr->currentdate = $date;
    $date_curr->hr = $current_date_arr[0];
	$date_curr->mint = $current_date_arr[1];
	array_push($currentdatetime,$date_curr);
   
   
 
	pg_prepare($link,'sql4321','SELECT * FROM w_menus WHERE business=$1 and enabled=true');
	$result = pg_execute($link,'sql4321',array($businessid));
	$catalogname11 = array();
	
	while($row = pg_fetch_array($result)) {
		unset($catlog11);
		unset($weekend);
		$schedule = parse($row['schedule']);
		$days = parse($row['days']);
		for($p=0;$p<count($days);$p++) {
			if($days[$p]==0)
			{
				$weekend[] = $lang_resource['Every_Day_V2'];
			}
			else if($days[$p]==1)
			{
				$weekend[] = $lang_resource['DAY1'];
			}
			 else if($days[$p]==2)
			{
				$weekend[] = $lang_resource['DAY2'];
			}
			 else if($days[$p]==3)
			{
				$weekend[] = $lang_resource['DAY3'];
			}
			 else if($days[$p]==4)
			{
				$weekend[] = $lang_resource['DAY4'];
			}
			 else if($days[$p]==5)
			{
				$weekend[] = $lang_resource['DAY5'];
			}
			 else if($days[$p]==6)
			{
				$weekend[] = $lang_resource['DAY6'];
			}
			 else if($days[$p]==7)
			{
				$weekend[] = $lang_resource['DAY7'];
			}
			
		}
		if(count($weekend)>0)
		$weekends = implode(" , ",$weekend);
		
		$opentime = sprintf('%02d', $schedule->opens->hour).":".sprintf('%02d', $schedule->opens->minute);
		$closetime = sprintf('%02d', $schedule->closes->hour).":".sprintf('%02d', $schedule->closes->minute);
		$catlog11 = new stdClass();
		 $catlog11->id = $row['id'];
		 $business = $row['id'];
	
		$catlog11->opentime = $opentime;
		$catlog11->closetime = $closetime;
		$catlog11->weekends = $weekends;
		$catlog11->weekends = $weekends;
		array_push($catalogname11,$catlog11);
		}
	
	
	
	
	$menubusiness['menulist'] = $catalogname;
	$menubusiness['allcategory'] = $allcategory;
	$menubusiness['categorynameid'] = $categorynameid;
	$menubusiness['currentdatetime'] = $currentdatetime;
	$menubusiness['fetcheachbusinessmenu'] = $catalogname11;
	
	if($menubusiness['menulist']!=null){
	$response['status'] = true;
	$response['menulist']=$menubusiness['menulist'];
	$response['allcategory']=$menubusiness['allcategory'];
	$response['categorynameid']=$menubusiness['categorynameid'];
	$response['currentdatetime']=$menubusiness['currentdatetime'];
	$response['fetcheachbusinessmenu']=$menubusiness['fetcheachbusinessmenu'];
	}else{
	$response['status'] = false;
	}
	
	pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
  
echo json_encode($response);



function rankcat($cid,$ui,$link){
		pg_prepare($link,'sqlcf'.$ui,'SELECT rank FROM w_categories WHERE id=$1');
		$result2 = pg_execute($link,'sqlcf'.$ui,array($cid));
		$row2 = pg_fetch_array($result2);
		return $row2['rank'];
	}
	
function GetAllSets($id)
{
    $extras=null;
    $extras_details=array();
    $setresponse=null;
    $set_name=null;
    $link = ConnectDB();
	
	//$id1 = 141;
	//$id2 = 142;
	$query_p = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlp'.$id,$query_p);
    $result_p = pg_execute($link,'sqlp'.$id,array('businesspagpersonsetting'));
    $row_p = pg_fetch_array($result_p);
	$person1 = $row_p["value"];
	
	$query_q = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlq'.$id,$query_q);
    $result_q = pg_execute($link,'sqlq'.$id,array('businesspagqtysetting'));
    $row_q = pg_fetch_array($result_q);
	$qty1 = $row_q["value"];
	
	
    pg_prepare($link,'sql_sets'.$id,'SELECT extras FROM w_dishes WHERE id=$1');
    $result2 = pg_execute($link,'sql_sets'.$id,array($id));
	
	
    while($row2 = pg_fetch_array($result2))
    {
		
		if($row2['extras'] == "") {
				return 0;
			
			}
        unset($extra_detail);
        $extras=$row2['extras'];
    }
    $extras=parse($extras);
	$q=1;
	
	
	
	
foreach($extras as $extra)
{
    pg_prepare($link,'sql_sets_name'.$extra.$id,'SELECT * FROM w_extras WHERE id=$1');
    $result2 = pg_execute($link,'sql_sets_name'.$extra.$id,array($extra));
    while($row2 = pg_fetch_array($result2))
    {
        unset($set_name);
        $set_name->name=$row2['set'];
        $set_name->set_id=$row2['id'];
		$set_name->qty_count=$row2['qty']; 	
		$set_name->person_count=$row2['person'];
		$set_name->position=$q;
		
		$set_name->person = $person1;
		$set_name->qty = $qty1;
		
        array_push($extras_details,$set_name);
    }
	$q++;
}
    $setresponse->extras_details = $extras_details;
    return $setresponse;
 /*   $response->extras_details = $extras_details;
    return $response;*/


}	

function GetTimeByZone($zone,$format = 'empty')
	{
	$now = time();
	date_default_timezone_set($zone);
	if ($format=='24')
		return date('h:i A',$now);
		else
		return date('G:i',$now);
	}
	function ArrayUnique($input,$returnkeys = false)
	{
	$array = array();
	$withkeys = array_flip(array_flip(array_reverse($input,true)));
	if ($returnkeys == true)
		return $withkeys;

	foreach($withkeys as $a)
		array_push($array,$a);

	return $array;
	}
function date_lang_change($currentDate,$day,$lang_resource)
	{
		$x++;

		$day_lang = date("l",strtotime($currentDate."+ ".$day."day") );
		
		$month_lang = date("m",strtotime($currentDate."+ ".$day."day") );
		$year_lang = date("Y",strtotime($currentDate."+ ".$day."day") );
		$eachDay_lang = date("d",strtotime($currentDate."+ ".$day."day") );
		
        if($day_lang=="Monday")
		$day_lang_print = $lang_resource['DAY1'];
		if($day_lang=="Tuesday")
		$day_lang_print = $lang_resource['DAY2'];
		if($day_lang=="Wednesday")
		$day_lang_print = $lang_resource['DAY3'];
		if($day_lang=="Thursday")
		$day_lang_print = $lang_resource['DAY4'];
		if($day_lang=="Friday")
		$day_lang_print = $lang_resource['DAY5'];
		if($day_lang=="Saturday")
		$day_lang_print = $lang_resource['DAY6'];
		if($day_lang=="Sunday")
		$day_lang_print = $lang_resource['DAY7'];
		if($day_lang=="Every day")
		$day_lang_print = $lang_resource['DAY8'];
		
		
		if($month_lang=="01")
		$month_lang_print = $lang_resource['MONTH1'];
		if($month_lang=="02")
		$month_lang_print = $lang_resource['MONTH2'];
		if($month_lang=="03")
		$month_lang_print = $lang_resource['MONTH3'];
		if($month_lang=="04")
		$month_lang_print = $lang_resource['MONTH4'];
		if($month_lang=="05")
		$month_lang_print = $lang_resource['MONTH5'];
		if($month_lang=="06")
		$month_lang_print = $lang_resource['MONTH6'];
		if($month_lang=="07")
		$month_lang_print = $lang_resource['MONTH7'];
		if($month_lang=="08")
		$month_lang_print = $lang_resource['MONTH8'];
		if($month_lang=="09")
		$month_lang_print = $lang_resource['MONTH9'];
		if($month_lang=="10")
		$month_lang_print = $lang_resource['MONTH10'];
		if($month_lang=="11")
		$month_lang_print = $lang_resource['MONTH11'];
		if($month_lang=="12")
		$month_lang_print = $lang_resource['MONTH12'];
		
		
		$currentdate = $day_lang_print." ".$month_lang_print." ".$eachDay_lang.", ".$year_lang;
		return $currentdate;
		
		//return $day_lang_print." ".$month_lang_print;
	}
	
	
function FetchFreeBooked($businessid,$whereall,$link){
	
	if($whereall->rdate!= "") {
		$rdateAll = explode("/",$whereall->rdate);
		$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		$reservefreequery = 'SELECT * from w_reserve_book WHERE  rtype=$1 and business =$2 and date =$3';	
		pg_prepare($link,'sqlfr',$reservefreequery);
		$reservefreerecord = pg_execute($link,'sqlfr',array(3,$businessid,$rdate_merge));
	
		if(pg_num_rows($reservefreerecord) != 0){
			
			$reservefree = array();
			$cntfre = 1;
			while($rowf= pg_fetch_array($reservefreerecord)){
				
				pg_prepare($link,'sqlchk'.$cntfre,'SELECT * from w_reserve WHERE id=$1');
				$chktime = pg_execute($link,'sqlchk'.$cntfre,array($rowf['rid']));
				
				$cntfre++;
				
				$rowchktime = pg_fetch_array($chktime);

				$duration = json_decode($rowchktime['duration'],false);
				
				$sch1=(array)$duration->{'duration'};
	
				$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
				
				$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time

				$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
				
				$diftime = round(abs($to_time - $from_time)/60); //difference between two time
				
				if($chktime > $diftime){
					array_push($reservefree,$rowf['booked']);	
				}
				
			}
			return $reservefree;
		}	
	
	}
}

function FetchTableBooked($businessid,$whereall,$link){
	
	if($whereall->rdate!= "") {
		$rdateAll = explode("/",$whereall->rdate);
		$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		$reservetablequery = 'SELECT * from w_reserve_book WHERE  rtype=$1 and business =$2 and date =$3';	
		pg_prepare($link,'sqlt',$reservetablequery);
		$reservetablerecord = pg_execute($link,'sqlt',array(1,$businessid,$rdate_merge));
	
		if(pg_num_rows($reservetablerecord) != 0){
			
			$reservetable = array();
			$cntfre = 1;
			while($rowf= pg_fetch_array($reservetablerecord)){
				
				pg_prepare($link,'sqlchkt'.$cntfre,'SELECT * from w_reserve WHERE id=$1');
				$chktime = pg_execute($link,'sqlchkt'.$cntfre,array($rowf['rid']));
				
				$cntfre++;
				
				$rowchktime = pg_fetch_array($chktime);

				$duration = json_decode($rowchktime['duration'],false);
				
				$sch1=(array)$duration->{'duration'};
	
				$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
				
				$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time

				$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
				
				$diftime = round(abs($to_time - $from_time)/60); //difference between two time
				
				if($chktime > $diftime){
					array_push($reservetable,$rowf['booked']);	
				}
				
			}
			return $reservetable;
		}	
	
	}
}

function FetchRoomBooked($businessid,$whereall,$link){
	
	if($whereall->rdate!= "") {
		$rdateAll = explode("/",$whereall->rdate);
		$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
		$reserveroomquery = 'SELECT * from w_reserve_book WHERE  rtype=$1 and business =$2 and date =$3';	
		pg_prepare($link,'sqlr',$reserveroomquery);
		$reserveroomrecord = pg_execute($link,'sqlr',array(2,$businessid,$rdate_merge));
	
		if(pg_num_rows($reserveroomrecord) != 0){
			
			$reserveroom = array();
			$cntfre = 1;
			while($rowf= pg_fetch_array($reserveroomrecord)){
				
				pg_prepare($link,'sqlchkr'.$cntfre,'SELECT * from w_reserve WHERE id=$1');
				$chktime = pg_execute($link,'sqlchkr'.$cntfre,array($rowf['rid']));
				
				$cntfre++;
				
				$rowchktime = pg_fetch_array($chktime);

				$duration = json_decode($rowchktime['duration'],false);
				
				$sch1=(array)$duration->{'duration'};
	
				$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
				
				$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time

				$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
				
				$diftime = round(abs($to_time - $from_time)/60); //difference between two time
				
				if($chktime > $diftime){
					array_push($reserveroom,$rowf['booked']);	
				}
				
			}
			return $reserveroom;
		}	
	
	}
}		
?>
