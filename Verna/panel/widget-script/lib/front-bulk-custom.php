<?php
session_start();
require('../../lib/language-main.php');
$x = 0;
//session_write_close();//inthis file we only read session data...

$bulk = parseCus($_POST['data']);
//global $lang_resource;
// echo "<pre>"; print_r($bulk);die;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);


define("IS_PAYPAL_ENABLED", 1);

foreach ($bulk as $data)
	{
	switch ($data->operation)
		{
		
		case 'fetchBusinessMenuForAll':
			$response->businessmenudata = fetchBusinessMenuForAll($data->businessids,$link);
		break;
		case 'fetchBusinesscatnsubcat':
			$response->businesscatnsubcat = fetchBusinesscatnsubcat($data->businessids,$link);
		break;
		
	     
		
		}
	}

pg_close($link);
echo json_encode($response);


/********************************************FUNCTIONS*****************************************/
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}
//request collection start
function fetchBusinessMenuForAll($businessids,$link)
	{
		foreach($businessids as $busid){
		
		$busineMenu[$busid] = eachBusinessMenu($busid,$link);
		}
		return $busineMenu;
	}
function fetchBusinesscatnsubcat($businessids,$link) {
	$rand = rand();
	pg_prepare($link,'sqlCutm'.$rand ,'SELECT * from w_categories where scriptid=$1');
	$resultcat = pg_execute($link,'sqlCutm'.$rand,array($_SESSION['scriptid']));
	$categories = array();
	while($rp = pg_fetch_array($resultcat)) {
		unset($category);
	  	 $cat_each_lang = businesscuisinenamebylang($rp['id']);
		 $category->name =  $cat_each_lang;
		 $category->id = $rp['id'];
		 $category->business = $rp['business'];
		 $category->subcategory = FetchAllSubCategoriesData($rp['id'],$link);
		 $category->enabled = true;
		 
	   if(in_array($rp['business'],$businessids))
		array_push($categories,$category);
		}
		
		
		
	return $categories;
	//print_r($businessids);
	
}
function eachBusinessMenu($businessid,$link)
	{
		
		$conquery ="SELECT * FROM w_configs WHERE name=$1"; 
		pg_prepare($link,'sqlco'.$businessid,$conquery);
		$resultsqu = pg_execute($link,'sqlco'.$businessid,array('panelsetting'));
		$roquery = pg_fetch_array($resultsqu);
		$panelsettings = $roquery['value'];



		       $bquery ="SELECT * FROM w_business WHERE id=$1"; 
                pg_prepare($link,'sqlc1'.$businessid,$bquery);
                $results = pg_execute($link,'sqlc1'.$businessid,array($businessid));
                $bcity = pg_fetch_array($results);
                $city = $bcity['city'];
                                       
                $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
                pg_prepare($link,'sqlc2'.$businessid,$cityquery);
                $resultp = pg_execute($link,'sqlc2'.$businessid,array($city));
                $rec = pg_fetch_array($resultp);
                $_SESSION['timezone'] = $rec['timezone'];
				
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	unset($response);
	$dishesids = array();
	$dishes = array();
	$extras = array();

$condition='';	
if($deliveryType == "delivery")
{
	$condition=' and delivery=true ';
}

if($deliveryType == "pickup")
{
	$condition=' and pickup=true ';
}
	//get the dishes
	pg_prepare($link,'sql'.$businessid,'SELECT * FROM w_menus WHERE business=$1 and enabled=true '.$condition );
	$result = pg_execute($link,'sql'.$businessid,array($businessid));
	while($row = pg_fetch_array($result))
		foreach (parseCus($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZoneCus($_SESSION['timezone']));
				$schedule = parseCus($row['schedule']);
				
				
				if($schedule->closes->hour >23  && (date("H") == 0|| date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )  ) {
						
					
						$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute)-86400;
						
						} else {
						
					$shopopentime =  strtotime($schedule->opens->hour.':'.$schedule->opens->minute);
						}
				if ($now>=$shopopentime)
				{
					
					
					if($schedule->closes->hour< 24) {
						
						$newScedule = strtotime($schedule->closes->hour.':'.$schedule->closes->minute);
						
				}
				else
				{
					
					
							if($schedule->closes->hour== 24  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 ))
							{
							$newScedule = strtotime("00:".$schedule->closes->minute);
							}
							
							else if($schedule->closes->hour == 25 && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
								 
							$newScedule = strtotime("01:".$schedule->closes->minute);	
							}
							else if($schedule->closes->hour == 26  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
								
							$newScedule = strtotime("02:".$schedule->closes->minute);	
							}
							else if($schedule->closes->hour == 27  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("03:".$schedule->closes->minute);	
							}
							
							else if($schedule->closes->hour== 28  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("04:".$schedule->closes->minute);	
							}
							else {
								if($schedule->closes->hour== 24)
							    $newScedule = strtotime("00:".$schedule->closes->minute)+86400;	
								if($schedule->closes->hour== 25)
							    $newScedule = strtotime("01:".$schedule->closes->minute)+86400;	
								if($schedule->closes->hour== 26)
							    $newScedule = strtotime("02:".$schedule->closes->minute)+86400;
								if($schedule->closes->hour== 27)
							    $newScedule = strtotime("03:".$schedule->closes->minute)+86400;
								if($schedule->closes->hour== 28)
							    $newScedule = strtotime("04:".$schedule->closes->minute)+86400;
								}
						}
						
						/*echo date("d h:i a",$now);
						echo date("d h:i a",$newScedule);
						echo date("d h:i a",$shopopentime);*/
						
					if ($now<$newScedule) {
						
						foreach (parseCus($row['dishes']) as $dishid)
							array_push($dishesids,$dishid);
							
					}
				}
				
				
				}
				
	
	$dishesids = ArrayUniqueCus($dishesids);


	//get the dishes info
	$extrasids = array();
	$ui = 0;
	foreach ($dishesids as $dishid)
		{
		//pg_prepare($link,'sqld'.$dishid,'SELECT name,description,ingredients,price,category,extras FROM w_dishes WHERE id=$1 and enabled=true');
		pg_prepare($link,'sqld'.$dishid,'SELECT w_dishes.name,w_dishes.subcategory,w_dishes.seller_winelibary,w_dishes.origin_winelibary,w_dishes.description,w_dishes.rank_cat,w_dishes.ingredients,w_dishes.price,w_dishes.category,w_dishes.extras,w_dishes.isimg,w_dishes.isimg2,w_dishes.isimg3,w_dishes.feature,w_dishes.points,w_categories.name AS cname FROM w_dishes INNER JOIN w_categories ON   w_dishes.id=$1 AND w_dishes.category = w_categories.id AND w_dishes.enabled=true AND w_categories.enabled=true');
		
		$result = pg_execute($link,'sqld'.$dishid,array($dishid));
		while($row = pg_fetch_array($result))
			{
			unset($dish);
			$dish->id = $dishid;
			$dish->name = dishidnamebylang($dishid);
			$dish->ingredients = $row['ingredients'];
			$dish->price = $row['price'];
			$dish->extras = $row['extras'];
			$dish->category = $row['category'];
			
			$dish->catname = businessmenuprecategorynamebylang($row['category'],$ui);
			if($panelsettings == 2){
				$dish->rank_cat = rankcat($row['category'],$ui,$link,$businessid);
			}else{
				$dish->rank_cat = $row['rank_cat'];
			}

			$dish->subcategory = $row['subcategory'];
			$dish->isimg = $row['isimg'];
			$dish->isimg2 = $row['isimg2'];
			$dish->isimg3 = $row['isimg3'];
			$dish->description = dishiddescriptionbylang($dishid);
			$dish->feature = $row['feature'];
			$dish->points = $row['points'];
			$dish->seller_winelibary = dishidsellerwinelibarybylang($dishid);//$row['seller_winelibary'];
			$dish->origin_winelibary =dishidoriginrwinelibarybylang($dishid);// $row['origin_winelibary'];
			$dish->Alldishsets = GetAllSets($dishid);
			$jextras = parseCus($dish->extras);
			if (count($jextras)>0)
				foreach ($jextras as $extraid)
					array_push($extrasids,$extraid);
			if($dish->name !=null)
			array_push($dishes,$dish);
			$ui ++;
			}
		}

	$extrasids = ArrayUniqueCus($extrasids);

	//get the extras info
	foreach($extrasids as $extraid)
		{
		pg_prepare($link,'sqle'.$extraid,'SELECT name,price FROM w_extras WHERE id=$1 and enabled=true');
		$result2 = pg_execute($link,'sqle'.$extraid,array($extraid));
		while($row2 = pg_fetch_array($result2))
			{
			unset($extra);
			$extra->id = $extraid;
			$extra->name = $row2['name'];
			$extra->price = $row2['price'];
			array_push($extras,$extra);
			}
		}

	$response->dishes = $dishes;
	$response->extras = $extras;
	return $response;
	
		
		}
function ArrayUniqueCus($input,$returnkeys = false)
	{
	$array = array();
	$withkeys = array_flip(array_flip(array_reverse($input,true)));
	if ($returnkeys == true)
		return $withkeys;

	foreach($withkeys as $a)
		array_push($array,$a);

	return $array;
	}
function parseCus($str)
	{
	//return json_decode($str);//php 5.1
	return json_decode(stripslashes($str)); 
	}
function GetTimeByZoneCus($zone,$format = 'empty')
	{
	$now = time();
	date_default_timezone_set($zone);
	if ($format=='24')
		return date('h:i A',$now);
		else
		return date('G:i',$now);
	}

function rankcat($cid,$ui,$link,$bs){
		pg_prepare($link,'sqlcf'.$ui.$bs,'SELECT rank FROM w_categories WHERE id=$1');
		$result2 = pg_execute($link,'sqlcf'.$ui.$bs,array($cid));
		$row2 = pg_fetch_array($result2);
		return $row2['rank'];
	}
function GetAllSets($id)
{
    $extras=null;
    $extras_details=array();
    $response=null;
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
    $extras=parseCus($extras);
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
    $response->extras_details = $extras_details;
    return $response;
 /*   $response->extras_details = $extras_details;
    return $response;*/


	}
function GetOptions($data)
{

    $id=$data[0]->id;
    $set_id=$data[0]->set_id;
    $setposition = $data[0]->setposition;
	
	
	
    $extra_detail=null;
    $extras_details=array();
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_options'.$id,'SELECT * FROM w_extras_options WHERE option_id=$1 AND set_id=$2');
    $result2 = pg_execute($link,'sql_options'.$id,array($id,$set_id));
	
	 pg_prepare($link,'sql_options_yes','SELECT option_id,with_respect_to FROM w_extras_options WHERE set_id=$1 AND conditional=$2 ');
    $results3 = pg_execute($link,'sql_options_yes',array($set_id,"yes"));
	
	while($fetch2 = pg_fetch_array($results3))
	{
		//echo $fetch2['with_respect_to'];
		if($fetch2['with_respect_to'] != "null" && $fetch2['with_respect_to'] != "" ) {
			//echo $fetch2['with_respect_to'];
			$fetch_op = explode(",",$fetch2['with_respect_to']);
			
			$optionselect = $fetch_op[1];
			$show_option[$optionselect]= $fetch2['option_id'];		
			}
	}
/*	print_r($show_option);
	exit();*/
    while($row2 = pg_fetch_array($result2))
    {
        unset($extra_detail);
		$showoptions = $row2['choice_id'];
        $extra_detail->id =$row2['id'];
		 $extra_detail->set_id =$row2['set_id'];
        $extra_detail->option_id =$row2['option_id'];
        $extra_detail->option_name = businessoptionnameforcheckout($row2['option_id'],$row2['id']);
        $extra_detail->choice_name = businesschoicenameforcheckout($row2['option_id'],$row2['id']);
        $extra_detail->choice_id = $row2['choice_id'];
        $extra_detail->with_respect_to = $row2['with_respect_to'];
        $extra_detail->conditional = $row2['conditional'];
        $extra_detail->copy = $row2['copy'];
        $extra_detail->price = $row2['price'];
        $extra_detail->rank = $row2['rank'];
		if($row2['rank'] != "null") {
		$extra_detail->setposition = $setposition*100+$row2['rank'];
		} else {
		$extra_detail->setposition = $setposition*100+1;	
			}
		$extra_detail->text_to_end_user = businesstextuserforcheckout($row2['option_id'],$row2['id']);
        $extra_detail->min_sel = $row2['min_sel'];
        $extra_detail->max_sel = $row2['max_sel'];
        $extra_detail->ingredients = $row2['ingredients'];
        $extra_detail->set_id= $row2['set_id'];
	    $extra_detail->showoption= $show_option[$showoptions];	
        array_push($extras_details,$extra_detail);
    }

    $response->extras_details = $extras_details;
    return $response;
}
function FetchAllSubCategoriesData($id,$link){

	$rand = rand();
	pg_prepare($link,'sqlfetchsubcategories'.$rand.$id,'SELECT * from w_subcategories where category=$1 and enabled=$2 and scriptid=$3 ORDER BY id ASC');
	$result = pg_execute($link,'sqlfetchsubcategories'.$rand.$id,array($id,'TRUE',$_SESSION['scriptid']));
	
	$subcategories = array();
	$i = 0;
	while($row = pg_fetch_array($result)){
		$subcategories[$i]['id'] = $row['id'];
		$subcategories[$i]['name'] = FetchSubCategoryLangDefault($row['id']);
		$subcategories[$i]['enabled'] = true;
		$i ++;	
	}	
	return $subcategories;
}
?>
