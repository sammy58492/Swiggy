<?php
require_once('settings.php');
require_once('multilanguage.php');
require_once('payment-main.php');
session_start();

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

$location = $obj->{'location'};
$deliveryType = $obj->{'deliveryType'};
$category = $obj->{'category'};
$city = $obj->{'city'};
$filters = $obj->{'filters'};
$whereall = $obj->{'whereall'};

/*$location = "{\"latitud\":40.7275043,\"longitud\":-73.98006450000003,\"zipcode\":\"10009\",\"zoom\":15}";
$deliveryType = "delivery";
$category = null;
$city = 0;
$filters = false;

$whereall ='{"country":"6","city":"6","delivery_neighborhoodStaus":0,"currency":"USD","ga":"","cityname":"Newyork","collecttype":"delivery","reservestatus":"delivery","address":"NY 10009, United States","resturant":"","cuisines":"","rhour":-1,"rmin":-1,"location":"{\"latitud\":40.7275043,\"longitud\":-73.98006450000003,\"zipcode\":\"10009\",\"zoom\":15}","approved":true,"zipcode":"10009"}'; */





$link = ConnectDB();

global $lang_resource;
pg_prepare($link,'sqlfetchlangfront'.time(),'SELECT * from w_lang_static');
	$result = pg_execute($link,'sqlfetchlangfront'.time(),array());
	while($row = pg_fetch_array($result)){
		$lang= 1;
		$lang_resource[$row['lang_key']] = $row['langtext_'.$lang];    
	}
/*****FOR CATEGORY*****/


	pg_prepare($link,'sqlCut3','SELECT * from w_categories WHERE scriptid=$1');
	$result = pg_execute($link,'sqlCut3',array(0));

	$categories = array();
	if(pg_num_rows($result)>0){
		while($row = pg_fetch_array($result)){		
			if($row['name'] != "")
				$catname[strtolower($row['name'])][] = $row['id'];
		}
		
		foreach($catname as $key=>$val) {
			//unset($category);
			$category = new stdClass();
			$category->ids = implode(",",$val);
			for($cl=0;$cl<count($val);$cl++) {
				$cat_each_lang = businesscuisinenamebylang($val[$cl]);
				if(isset($cat_each_lang) && $cat_each_lang !=null ) {
					$category->name =  $cat_each_lang;
					$category->id = $val[$cl];
				}
			}
			//$category->name = $key;
			if($category->name !=null)
			array_push($categories,$category);
		}
	}	
	$allcatelists['cate']=$categories;
	//return $categories;


/*****END CATEGORY********/

/****Category custom****/

	pg_prepare($link,'sql3','SELECT * from w_categories WHERE scriptid=$1');
	$result = pg_execute($link,'sql3',array(0));

	$categories = array();
	while($row = pg_fetch_array($result))
		{
		  $category = new stdClass();

		//unset($category);
		$category->id = $row['id'];
		//$category->name = $row['name'];
		$category->name = businesscustomcatenamebylang($row['id']);
		$category->enabled = true;
		$category->subcategory =  FetchAllSubCategoriesData($row['id'],$link);
		if($category->name !=null)
		array_push($categories,$category);
		}
		
		$allcatelists['cuscate']=$categories;

	//return $categories;

function FetchAllSubCategoriesData($id,$link){

	
	pg_prepare($link,'sqlfetchsubcategories'.$id,'SELECT * from w_subcategories where category=$1 and enabled=$2 and scriptid=$3 ORDER BY id ASC');
	$result = pg_execute($link,'sqlfetchsubcategories'.$id,array($id,'TRUE',0));
	
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
/****Category custom****/	
/********* FETCH CURRENTDATE*************/

$current_date = GetTimeByZone($_SESSION['timezone']);
	$srtotime = strtotime(GetTimeByZone($_SESSION['timezone']));
	$current_date_arr = explode(":",$current_date);
	 $date_curr= new stdClass();
	 $date = date('d',$srtotime);
	$date_curr->date = $date;
    $date_curr->hr = $current_date_arr[0];
	$date_curr->min = $current_date_arr[1];
	$allcatelists['date_curr']=$date_curr;
	//return $date_curr;
/*********FETCH CURRENT DATE*************/


/********FETCH ALL BUSINESS*********/
	
	if($whereall->city){
		pg_prepare($link,'sqldf33','SELECT * from w_franchises WHERE id=$1');
		$result_time_zone = pg_execute($link,'sqldf33',array($whereall->city));
		$result_rec = pg_fetch_array($result_time_zone);

		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
	}else {
		pg_prepare($link,'sqlfree2','SELECT * from w_franchises');
		$resultfree2 = pg_execute($link,'sqlfree2',array());
		$result_rec = pg_fetch_array($resultfree2);
	
		session_start();
		$_SESSION['timezone'] = $result_rec['timezone'];
		
		
	}
	
	 $usersearchAddress = $whereall->address;
	 
	 $categorysearchNew = "SELECT * from w_categories WHERE id = $1 AND enabled=true ";
	 pg_prepare($link,'sqlcatnew',$categorysearchNew);
	 
	 pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
	$resultset = pg_execute($link,'sqlw',array('panelsetting'));
	$rowset = pg_fetch_array($resultset);
	$panelsetting = $rowset['value'];
	
  
		
  if($deliveryType == "categorysearch") {
	if($panelsetting == 2) {
		
		if(empty($category)) {
			return;
			}
			
		$categoryAllArray = explode(",",$category);
		
		
		foreach ($categoryAllArray as $categoryeach ){
			
		
			$catresult = pg_execute($link,'sqlcatnew',array($categoryeach));
			$catfetchresult = pg_fetch_array($catresult);
			
			if(pg_num_rows($catresult)>0 && $catfetchresult['business'] != "null" && $catfetchresult['business'] != "" )
			{
				if(empty($businessrecord)) {
					$businessrecord[] = $catfetchresult['business'];
					}
			   else if(!in_array($catfetchresult['business'],$businessrecord)) {
					
						$businessrecord[] = $catfetchresult['business'];
				}
			}
			
			
			}
			
			//print_r($businessrecord);
		// 
		 $query = "SELECT * from w_business WHERE enabled=true and id in (".implode(",",$businessrecord).") ";
		
		
		
		
		} else {
	 $categorydp ="\"".$category."\"";		
	 $query = "SELECT * from w_business WHERE enabled=true AND categories like '%".$categorydp."%' ";
	 
		}
	 
	  }
 else if($city !=0)
  {
	$conditionalsvalues = array();
	$query = 'SELECT * from w_business WHERE city=$1 AND enabled=true';
	array_push($conditionalsvalues,$city);
  }
  
  else{
	  
	 $conditionalsvalues = array();
	 $query = 'SELECT * from w_business WHERE  enabled=true';
	
   }
  	 $catalog =  'SELECT * from w_menus WHERE business=$1 AND  enabled=true';
	pg_prepare($link,'sqlw2',$catalog);
	
	
	if (!empty($filters))	
		{
		$filters = parse($filters);
		$conditionals = '';
		$count = 0;
		foreach($filters as $filter)
			{
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= ' and ' . $modifier . $filter->name . ' ' . $filter->operator .' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}
		$scriptid=0;
		$query .=' and scriptid='.$scriptid;
	if($deliveryType == "categorysearch") {
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',array());
	} else {
		
	pg_prepare($link,'sql2',$query);
	
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
		
		}
	
	$zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
	pg_prepare($link,'sqlz2',$zipquery);
	

	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_dishes WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfmc',$menufetchcount);
	/* added on 01-08-2014 */
	
	/* added on 01-08-2014 */
	$menufetchcount = 'SELECT * FROM w_reserve WHERE business=$1 AND enabled=$2';			
	pg_prepare($link,'sqlfrv',$menufetchcount);
	/* added on 01-08-2014 */
	
	
	$paypaladaptive = 'SELECT * from w_splitpaymain WHERE  bus_id=$1';
	pg_prepare($link,'sqlpa',$paypaladaptive);
	
	$galleryImage = 'SELECT * from w_gallery WHERE  business=$1 AND type=$2';
	pg_prepare($link,'sqlgallery',$galleryImage);
	 //Settings to select miles or km 
	$sqldformat = "SELECT * from w_configs WHERE  name='distanceformat'";
	pg_prepare($link,'sqldformat',$sqldformat);
	$resultdformat = pg_execute($link,'sqldformat',array());
	$rowdformat = pg_fetch_array($resultdformat);
	$distanceformat=$rowdformat["value"];

	$allbusiness = array();
	if (!empty($location))
					{
        $locationN = parse($location);
					}

	while($row = pg_fetch_array($result))
		{
	//	unset($business);
		unset($ziprecord);
		unset($resultc);
		
		$blocation = parse($row['location']);
		//print_r($blocation);
	    $ziprecord = pg_execute($link,'sqlz2',array($row['id'],'TRUE'));
		$business = new stdClass();
		$business->ziprecord = pg_num_rows($ziprecord);
		
		$reserve = pg_execute($link,'sqlfrv',array($row['id'],'TRUE'));
		$business->reserve = pg_num_rows($reserve);
		
		/* added on 01-08-2014 */	
		$resultfm = pg_execute($link,'sqlfmc',array($row['id'],'TRUE'));
		if(pg_num_rows($resultfm) == 0){
			$business->menulist = 0;	
		}else{
			$business->menulist = 1;
		}
		/* added on 01-08-2014 */
		
		$resultc = pg_execute($link,'sqlw2',array($row['id']));
		$firstCatalog =pg_fetch_array($resultc);
	
		$parecord = pg_execute($link,'sqlpa',array($row['id']));
		
		$rowpa = pg_fetch_array($parecord);
		if($rowpa['splitcase'] == 1 || $rowpa['splitcase'] == 2)
			$business->parecord ="TRUE";
		else
			$business->parecord ="FALSE";		
		
		$business->currency = currency_symbol($row['currency']);
		$business->taxtype = $row['taxtype'];
		$business->tax = $row['tax'];
		$business->id = $row['id'];
		
		$business->name = businessnamebylang($row['id']);
		$business->street = businessusersstreetbylang($row['id']);
		$business->colony = $row['colony'];
		$business->cp = $row['cp'];
		$business->tel = $row['tel'];
		$business->cel = $row['cel'];
		$business->email = $row['email'];
		if(IS_PAYPAL_ENABLED == 1)
		$business->paypal = $row['paypal'];
		$business->schedule = $row['schedule'];
		if($row['categories'] !=null){
		$business->categories = checkcategoriesexistbylang($row['categories'],$row['id']);
		}else{
		$business->categories ='';	
		}
		$business->location = $row['location'];
		$business->locationPoint = $row['location'];
		$business->zonesloc = $row['zones'];
		$business->city = $row['city'];
		$business->zones = $row['zones'];		
		$business->enabled = $row['enabled'];		
		$business->acceptcard = $row['acceptcard'];	
		$business->acceptcash = $row['acceptcash'];	
		$business->businesspagecustomtext = $row['businesspagecustomtext'];	
		$business->servicefee = checkServiceFee($row['id'],$link);
		$business->minimum = $row['minimum'];
		$business->firstCatalog = $firstCatalog['id'];
		//	$business->headerurl = 'panel/images/gallery/22/gallery.jpg';	
		/*$sqlgallery_result = pg_execute($link,'sqlgallery',array($row['id'],"2"));
		$sqlgallery_array = pg_fetch_array($sqlgallery_result);
		if(pg_num_rows($sqlgallery_result) == 0) {
				$business->headerurl = 	'panel/images/dummy/restaurant-banner.png';
			} else {
		$business->headerurl = 	'panel/images/gallery/'.$sqlgallery_array['id'].'/gallery.jpg';
			}*/
		if($row['isimgh'] == 1){
			$business->headerurl ='panel/images/banner/'.$row['id'].'/banner.jpg';
			$business->logourl = 'panel/images/business/'.$row['id'].'/panel.jpg';
		}else{
			$business->headerurl ='panel/images/dummy/restaurant-banner.png';
			$business->logourl = 'panel/images/dummy/restaurant-banner.png';
		}
		$business->twiliophone = $row['twiliophone'];	
		$business->twilioenabled = strtolower($row['twilioenabled']) == "t";
		$business->acceptsms = strtolower($row['acceptsms']) == "t";
		$business->review = GetReviewData($row['id'], $link);
		$business->clientkey = $row['clientkey'];
		$business->secretkey = $row['secretkey'];
		$business->burl = $row['burl'];
		$business->abusiness = $row['abusiness'];
		 //Settings to select miles or km 
		$business->distanceformat = $distanceformat;
		$distance = distanceCalculator($locationN->latitud,$locationN->longitud,$blocation->latitud,$blocation->longitud, "$distanceformat");
		//$business->distance = number_format($distance,1);
		$business->distance = $distance;
		$business->customslug = $row['customslug'];
		$business->promotion = businesspromotion($row['id']);
		$business->isimg = $row['isimg'];
		
		$business->environment = $row['environment'];
		$business->merchant_id = $row['merchant_id'];
		$business->public_key = $row['public_key'];
		$business->private_key = $row['private_key'];
		
		
		$business->tkey = $row['tkey'];
		$business->aplid = $row['aplid'];
		
		
		$business->mercury_id = $row['mercury_id'];
		$business->mercury_pass	 = $row['mercury_pass'];
		
		$business->cardsaveid = $row['cardsaveid'];
		$business->cardsavepass = $row['cardsavepass'];
		$business->feature = $row['feature'];
		
		
		$business->deliverytime = $row['deliverytime'];
		$business->pickuptime = $row['pickuptime'];
		
		$business->catalog = pg_num_rows($resultc);
		$business->shipping = "0";
	    $business->open = true;
		
		$business->DeliveryStatus = checkDeliveryStatus($row['id'],$link);
		$business->PickupStatus = checkPickupStatus($row['id'],$link);

		$business->paymentdetails = PaymentFetch($row['id'],$link);

		$business->reviewsettings = $row['review_status'];
		$business->photosettings = $row['photo_upload_status'];
		
		$business->deliverycitysearch =  false;
		$business->againmenuopenchk = businessopenChkforMenu($row['id'],$link);

		
		
		
		
		$now = strtotime(GetTimeByZone($_SESSION['timezone']));
		$daysu = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		$todaysu = $daysu->{date("D",strtotime(date('d-m-Y')))};
		
		$schedule1 = parse($business->schedule);
		/*$business->opentime = $schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute ;
		$business->closetime = $schedule1->sdays->{$todaysu}->closes->hour . ':' . $schedule1->sdays->{$todaysu}->closes->minute ;*/
		
		if($schedule1->sdays->{$todaysu}->closes->hour == 25) {
			$fiterClosehr  = 1;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 26) {
			$fiterClosehr  = 2;
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 27) {
			$fiterClosehr  = 3;
			
		}
		else if($schedule1->sdays->{$todaysu}->closes->hour == 28) {
			$fiterClosehr  = 4;
		}
		else {
			$fiterClosehr  = $schedule1->sdays->{$todaysu}->closes->hour;
			
			}
	$business->opentime = date('h:i A',strtotime($schedule1->sdays->{$todaysu}->opens->hour . ':' . $schedule1->sdays->{$todaysu}->opens->minute));
	$business->closetime = date('h:i A',strtotime($fiterClosehr  . ':' . $schedule1->sdays->{$todaysu}->closes->minute));
	

		if($business->name !=null && $business->categories !=null )
		array_push($allbusiness,$business);
		}
		
		
		
			

							  
					if($whereall->reservation != true){		
					  
							  $allbusinessFilter = array();

						       foreach($allbusiness as $business)
										{
						       if($business->catalog!="0" &&  $business->menulist == "1")	 				
								array_push($allbusinessFilter,$business);
										}
				                $allbusiness  = array();					
								foreach($allbusinessFilter as $business)
										{
								array_push($allbusiness,$business);
										}
					}
					
				

		
	/****************************************************************Reservation Filter Section *****************************************************************/
/*Filter By Cateegory*/
$allbusinessFilter = array();
foreach($allbusiness as $business){	 
	if ($business->categories !="null"){
		array_push($allbusinessFilter,$business);
	}
}
$allbusiness  = array();					
foreach($allbusinessFilter as $business){
	array_push($allbusiness,$business);
}
/*Filter By Cateegory*/



/* Filter by Resturant */

	$allbusinessFilter = array();
	$filterresturant = parse($whereall->resturant);
	if(count($filterresturant)!=0){
		
		foreach($allbusiness as $business){
			if(in_array("-1",$filterresturant))				
					array_push($allbusinessFilter,$business);
			else if(in_array($business->id,$filterresturant))				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Cuisine */

	$allbusinessFilter = array();
	$filtercuisines = parse($whereall->cuisines);


	if(count($filtercuisines)!=0){
		
		foreach($allbusiness as $business){
			$bucateg = parse($business->categories);
			if(in_array("-1",$filtercuisines))				
					array_push($allbusinessFilter,$business);
			else if(count(array_intersect($bucateg,$filtercuisines))>0)				
					array_push($allbusinessFilter,$business);
		}
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}
		
/* Filter by Distance */

	$allbusinessFilter = array();
	$filterdistance = $whereall->distance;
	
	if($filterdistance !=""){
		foreach($allbusiness as $business){
			if($business->distance <= $filterdistance)				
					array_push($allbusinessFilter,$business);
		}
		
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
		}

if($whereall->reservation == true){
	
	
	$allbusinessFilter = array();
	$usertime = strtotime($whereall->rdate .' '. $whereall->rhour.':'.$whereall->rmin);
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
    $todayid = $days->{date("D",$usertime)};

    $userDate = date("Y-m-d",$usertime);

	//echo $todayid = date("d/m/Y h:i:m",strtotime($usertime));
	//echo date("D",$usertime);
	
	$fetchreservetime = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
	pg_prepare($link,'sqlfs',$fetchreservetime);

		foreach($allbusiness as $business){
		
			$resrecord = pg_execute($link,'sqlfs',array($business->id,'TRUE'));
			
			
			while($rowres = pg_fetch_array($resrecord)){	
					
				$dayres = parse($rowres['days']);
				$scheduleres = parse($rowres['schedule']);
				
				foreach ($dayres as $day){
				
					if($whereall->rhour == "-1" && $whereall->rmin == "-1" ) {
						
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						}
					else if(!$whereall->rhour)	{
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
								}
						
						}
					else if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
					{
						if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour1,$scheduleres->opens->minute1) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour1,$scheduleres->closes->minute1))
						{
							if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
						else if ($usertime>=getstrtotime($userDate,$scheduleres->opens->hour,$scheduleres->opens->minute) && $usertime<=getstrtotime($userDate,$scheduleres->closes->hour,$scheduleres->closes->minute))
						{
						//business opened now check if it didnt close
						if(!in_array($business,$allbusinessFilter)){	
						
							array_push($allbusinessFilter,$business);
							break;
						}
						}
					}/*End if loop*/
				}/*End schedule for each loop*/
				
			}/*End Schedule while loop*/
			
		}/*End Business for each loop*/
	
			$allbusiness  = array();					
				foreach($allbusinessFilter as $business){
						array_push($allbusiness,$business);
				}
	

$allbusinessFilter = array();
$filterguest = $whereall->guest;


/* Guest Filter in Reservation */

if($filterguest !=""){
	
		foreach($allbusiness as $business){
		
		if($whereall->rdate!= "") {
						
			$guest = 0;
			$guestquery = 'SELECT * from w_reserve WHERE  business=$1 AND enabled=$2';
			pg_prepare($link,'sqlguest'.$business->id,$guestquery);
			$guestrecord = pg_execute($link,'sqlguest'.$business->id,array($business->id,'TRUE'));
			while($rowguest = pg_fetch_array($guestrecord)){	
				$guest += $rowguest['guest'];
			}
			
					
						
			$rdateAll = explode("/",$whereall->rdate);
			$rdate_merge = $rdateAll[2]."-".$rdateAll[0]."-".$rdateAll[1];
		
			$reservefreequery = 'SELECT * from w_reserve_book WHERE business =$1 and date =$2';	
			pg_prepare($link,'sqlfr'.$business->id,$reservefreequery);
			$reservefreerecord = pg_execute($link,'sqlfr'.$business->id,array($business->id,$rdate_merge));
	
			if(pg_num_rows($reservefreerecord) != 0){
			
				$reservefree = array();
				$cntfre = 1;
				$bguest = 0;
				while($rowf= pg_fetch_array($reservefreerecord)){
					
					pg_prepare($link,'sqlchk1'.$rowf['id'],'SELECT * from w_reserve WHERE id=$1');
					$chktime = pg_execute($link,'sqlchk1'.$rowf['id'],array($rowf['rid']));
					
					$cntfre++;
					
					$rowchktime = pg_fetch_array($chktime);
	
					$duration = json_decode($rowchktime['duration'],false);
					
					$sch1=(array)$duration->{'duration'};
		
					$chktime = ($sch1["dhour"] * 60) + $sch1["dminute"]; // fetch duration time from w_reserve table
					
					$to_time = strtotime(substr($rowf['time'],0,5)); // fetch booked time
	
					$from_time = strtotime($whereall->rhour.':'.$whereall->rmin); // search time 
					
					$diftime = round(abs($to_time - $from_time)/60); //difference between two time
					
					if($chktime > $diftime){
						$bguest += $rowf['booked'];
					}
					
				}
				
		}
	    }
		$remguest = $guest - $bguest;
		
		if($remguest >= $filterguest)				
			array_push($allbusinessFilter,$business);	
	
	}
		
	
		$allbusiness  = array();					
			foreach($allbusinessFilter as $business){
					array_push($allbusiness,$business);
			}
}





}
	

						
/************************************End Reservation***************************************/	
				
				
										
				
				
				
				include('front_search_panel.php');
				
				if($whereall->delivery_neighborhoodStaus == 1 && $deliveryType == "delivery") {
			
			
			    $newbusiness = frontserachneighborhood($location,$allbusiness,$link,$whereall);
				$allresbusi['business'] = $newbusiness;
			    //return $newbusiness;
			
						}
				else if($deliveryType == "delivery")
				{
					// 2 means new panel
					
					if( $panelsetting == 2) { 
					
						$newbusiness = frontserachpanelnew($location,$allbusiness,$link,$deliveryType,$whereall );
						
					}
					else if(pg_num_rows($result) == 0) {
						
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
					else {
						$newbusiness = frontserachpanelold($location,$allbusiness,$link,$deliveryType);
						
						}
						
						
						$allresbusi['business'] = $newbusiness;
						//return $newbusiness;
					
				}
			else if($deliveryType == "citysearch"  || $deliveryType == "pickup" || $deliveryType == "categorysearch" )
			{
			
			/********************************city restaurant show here**********************************/
			
					$cityquery1 ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc185',$cityquery1);
					if($city == 0){					
					$result11 = pg_execute($link,'sqlc185',array($business->city));
					}else{
					$result11 = pg_execute($link,'sqlc185',array($city));	
					}
					$rec1 = pg_fetch_array($result11);
					$cityname = $rec1['city'];
					
			
		
				   $cityquery ="SELECT * FROM w_franchises WHERE id=$1"; 
					pg_prepare($link,'sqlc1',$cityquery);
					$result = pg_execute($link,'sqlc1',array($city));
					$rec = pg_fetch_array($result);
					//$cityname = $rec['city'];
					 $_SESSION['timezone'] = $rec['timezone'];
				
				$newbusiness = array();
				foreach($allbusiness as $business)
						{
							if($whereall->activebusiness) {
								
								if($whereall->activebusiness == $business->id ) {
									if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup")
										{
											$business->shipping = 0;
										}
										else { 
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										else if ($deliveryType == "citysearch" || $deliveryType == "categorysearch" )
										array_push($newbusiness,$business);
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true)
										array_push($newbusiness,$business);
										unset($business);
								}
							}
							else {
		
										if($deliveryType == "pickup" && $whereall->reservation == true)
										{
											$business->shipping = "0";
										}
										else if($deliveryType == "pickup" && $business->PickupStatus == true)
										{
											$business->shipping = 0;
										}
										else { 
										
										$business->shipping = "Pending";
										}
										$business->searchtype = $deliveryType;
										$business->cityname = $cityname;
										
										
														
										
										if($business->PickupStatus == "true" && $deliveryType == "pickup")
										array_push($newbusiness,$business);
										
										
										else if (($deliveryType == "citysearch" || $deliveryType == "categorysearch") && ($business->PickupStatus == "true" || $business->DeliveryStatus == "true") )
										array_push($newbusiness,$business);
										else if ($whereall->reservation == true )
										array_push($newbusiness,$business);
										
										else if ($business->catalog == "0")
										array_push($newbusiness,$business);
										unset($business);
								
								
								}
						}
				
				
				
					$now = strtotime(GetTimeByZone($_SESSION['timezone']));
					$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
					$todayid = $days->{date("D",$now)};
					 $curHour = date('H',$now);
					foreach($newbusiness as $business)
						{
						//get the time in the current user zone
						//now check if the business is open...
						$schedule = parse($business->schedule);
						$onday = false;
						foreach ($schedule->days as $day)
							{
							if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
								{//business is in the correct day, now check the time...
								  $priviousDay = previousDayCounti();
								  
		if(($schedule->sdays->{$priviousDay}->closes->hour== 24 || $schedule->sdays->{$priviousDay}->closes->hour == 25 || $schedule->sdays->{$priviousDay}->closes->hour == 26 || $schedule->sdays->{$priviousDay}->closes->hour == 27 || $schedule->sdays->{$priviousDay}->closes->hour == 28) && $curHour < 5 ) {
			
				 $preclosetime = preclosetimefun($schedule,$priviousDay);
				 		
				 $newScedule = strtotime($preclosetime.":".$schedule->sdays->{$priviousDay}->closes->minute);
				 
				                 if ($now>=$newScedule) {
					if($schedule->sdays->{$todayid}->closes->hour >23 )	{	
					
					if($schedule->sdays->{$todayid}->opens->hour > $curHour)	{
						
						$newScedule = strtotime($preclosetime.':'.$schedule->sdays->{$todayid}->closes->minute);
						
						}
					else {
						 $newScedule = strtotime('23:59');
						}  
		
					
					
					}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
									$shopopenstatus = true;	
									
									
								 } else 	{
			
									$shopopenstatus = true;	
									
									
									
									}
									
										
									
} else if ($now>=strtotime($schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute))  {
						
						if($schedule->sdays->{$todayid}->closes->hour >23 )	{		  
			  $newScedule = strtotime('23:59');
						}
						else {
				 $newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);			
							}
				$shopopenstatus = true;	
				
				
}
else {
	$shopopenstatus = false;
	
	}

							if($shopopenstatus == true) {
										  
									//business opened now check if it didnt close
									if ($now>=$newScedule)
										{
										//business closed
										$business->open = false;
										if ($day=='0')
											{
											/*if ($todayid==7)
												$tday = 1;
												else
												$tday = $todayid+1;
											
											if (intval($schedule->sdays->{$tday}->opens->minute)<10)
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
												else
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
			
											if (intval($schedule->sdays->{$tday}->opens->hour)<10)
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;
												else
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;*/
											
											$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
											}
										}
										else
										{
										//business open
										if($business->againmenuopenchk == true) {
											$business->open = true;
										}
										else {
											$business->open = false;
											}
										}
									}
									else
									{
									//business still not opened
									$business->open = false;
									/*if (intval($schedule->sdays->{$todayid}->opens->minute)<10)
										$min = $schedule->sdays->{$todayid}->opens->minute;
										else
										$min = $schedule->sdays->{$todayid}->opens->minute;
			
									if (intval($schedule->sdays->{$todayid}->opens->hour)<10)
										$hour = $schedule->sdays->{$todayid}->opens->hour;
										else
										$hour = $schedule->sdays->{$todayid}->opens->hour;*/
			
									$business->willopen = FetchMenuTimeOnCloseBusiness($business->id);
									}
								$onday = true;
								}
							}
			
						if ($onday==false)
							$business->open = false;
						}
			
					foreach($newbusiness as $business)
						{
						if (empty($business->willopen) && $business->open==false)
							{
							//need to find the next day that will open
							$t = intval($todayid)+1;
							$nextday = -1;
							$schedule = parse($business->schedule);
							for ($i=$t;$i<=7;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
			
							if ($nextday==-1)//means that the next day ist before in week days...
							for ($i=1;$i<$t;$i++)
								foreach ($schedule->days as $day)
									{
									if ($day==$i)
										{
										$nextday = $day;
										break 2;
										}
									}
							$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
							//$ndays = array('','monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			
							if (intval($schedule->sdays->{$nextday}->opens->minute)<10)
								$min = $schedule->sdays->{$nextday}->opens->minute;
								else
								$min = $schedule->sdays->{$nextday}->opens->minute;
			
							if (intval($schedule->sdays->{$nextday}->opens->hour)<10)
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								else
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								
								$willopen = FetchMenuTimeOnCloseBusiness($business->id);
								$business->willopen = $willopen;
							
							}
			
						$business->schedule = null;
						unset($business->schedule);
						}
					/*********************************************End city restaurant show here****************************************************/
					/*
					foreach($newbusiness as $business)
						{
							echo $business->name;
							echo "<br>";
							
						}
						print_r($newbusiness);
						exit;*/
					$allresbusi['business'] = $newbusiness;
					//return $newbusiness;
			}

				
/*************************FETCH ALL BUSINESS*******************/


if($allresbusi['business']!=null){
	$response['status'] = true;
	$response['categories']=$allcatelists['cate'];
	$response['categoriesCustom']=$allcatelists['cuscate'];
	$response['currentDate']=$allcatelists['date_curr'];
	$response['business'] = $allresbusi['business'];
}else{
	$response['status'] = false;
	$response['categories']=$allcatelists['cate'];
	$response['categoriesCustom']=$allcatelists['cuscate'];
	$response['currentDate']=$allcatelists['date_curr'];
	$response['business'] = $allresbusi['business'];
}







pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
 
echo json_encode($response);

function currency_symbol($sitecurrency){

		if($sitecurrency == 'AED'){
	return 'AED';			
	}
	if($sitecurrency == 'USD'){
	return '$';			
	}
	if($sitecurrency == 'EUR'){
	return '€';			
	}
	if($sitecurrency == 'MXN'){
	return '$';			
	}
	if($sitecurrency == 'AUD'){
	return '$';			
	}
	if($sitecurrency == 'BRL'){
	return 'R$';			
	}
	if($sitecurrency == 'CAD'){
	return '$';			
	}
	if($sitecurrency == 'CZK'){
	return 'Kč';			
	}
	if($sitecurrency == 'DKK'){
	return 'kr';			
	}
	if($sitecurrency == 'HKD'){
	return '$';			
	}
	if($sitecurrency == 'HUF'){
	return 'Ft';			
	}
	if($sitecurrency == 'ILS'){
	return '₪';			
	}
	if($sitecurrency == 'JPY'){
	return '¥';			
	}
	if($sitecurrency == 'MYR'){
	return 'RM';			
	}
	if($sitecurrency == 'NOK'){
	return 'kr';			
	}
	if($sitecurrency == 'NZD'){
	return '$';			
	}
	if($sitecurrency == 'PHP'){
	return '₱';			
	}
	if($sitecurrency == 'PLN'){
	return 'zł';			
	}
	if($sitecurrency == 'GBP'){
	return '£';			
	}
	if($sitecurrency == 'SGD'){
	return '$';			
	}
	if($sitecurrency == 'SEK'){
	return 'kr';			
	}
	if($sitecurrency == 'CHF'){
	return 'CHF';			
	}
	if($sitecurrency == 'TWD'){
	return 'NT$';			
	}
	if($sitecurrency == 'THB'){
	return '฿';			
	}
	if($sitecurrency == 'TRY'){
	return '₤';			
	}
	if($sitecurrency == 'ALL'){
	return 'Lek';			
	}
	
	if($sitecurrency == 'AFN'){
	return '؋';			
	}
	if($sitecurrency == 'ARS'){
	return '$';			
	}
	if($sitecurrency == 'AWG'){
	return 'ƒ';			
	}
	if($sitecurrency == 'AZN'){
	return 'ман';			
	}
	if($sitecurrency == 'BSD'){
	return '$';			
	}
	if($sitecurrency == 'BBD'){
	return '$';			
	}
	if($sitecurrency == 'BYR'){
	return 'p.';			
	}
	
	if($sitecurrency == 'BZD'){
	return 'BZ$';			
	}
	if($sitecurrency == 'BMD'){
	return '$';			
	}
	if($sitecurrency == 'BOB'){
	return '$b';			
	}
	if($sitecurrency == 'BAM'){
	return 'KM';			
	}
	
	if($sitecurrency == 'BWP'){
	return 'P';			
	}
	if($sitecurrency == 'BGN'){
	return 'лв';			
	}
	if($sitecurrency == 'BND'){
	return '$';			
	}
	if($sitecurrency == 'KHR'){
	return '៛';			
	}
	if($sitecurrency == 'KYD'){
	return '$';			
	}
	if($sitecurrency == 'CLP'){
	return '$';			
	}
	if($sitecurrency == 'CNY'){
	return '¥';			
	}
	if($sitecurrency == 'COP'){
	return '$';			
	}
	if($sitecurrency == 'CRC'){
	return '₡';			
	}
	if($sitecurrency == 'HRK'){
	return 'kn';			
	}
	
	if($sitecurrency == 'CUP'){
	return '₱';			
	}
	if($sitecurrency == 'DOP'){
	return 'RD$';			
	}
	if($sitecurrency == 'XCD'){
	return '$';			
	}
	if($sitecurrency == 'EGP'){
	return '£';			
	}
	if($sitecurrency == 'SVC'){
	return '$';			
	}
	if($sitecurrency == 'EEK'){
	return 'kr';			
	}
	if($sitecurrency == 'FKP'){
	return '£';			
	}
	if($sitecurrency == 'FJD'){
	return '$';			
	}
	if($sitecurrency == 'GHC'){
	return '¢';			
	}
	if($sitecurrency == 'GIP'){
	return '£';			
	}
	if($sitecurrency == 'GTQ'){
	return 'Q';			
	}
	if($sitecurrency == 'GGP'){
	return '£';			
	}
	if($sitecurrency == 'GYD'){
	return '$';			
	}
	if($sitecurrency == 'HNL'){
	return 'L';			
	}
	if($sitecurrency == 'ISK'){
	return 'kr';			
	}
	if($sitecurrency == 'INR'){
	return 'रु';			
	}
	if($sitecurrency == 'IDR'){
	return 'Rp';			
	}
	if($sitecurrency == 'IRR'){
	return '﷼';			
	}
	
	if($sitecurrency == 'IMP'){
	return '£';			
	}
	if($sitecurrency == 'JMD'){
	return 'J$';			
	}
	if($sitecurrency == 'JEP'){
	return '£';			
	}
	if($sitecurrency == 'KZT'){
	return 'лв';			
	}
	if($sitecurrency == 'KPW'){
	return '₩';			
	}
	if($sitecurrency == 'KRW'){
	return '₩';			
	}
	if($sitecurrency == 'LAK'){
	return '₭';			
	}
	if($sitecurrency == 'LVL'){
	return 'Ls';			
	}
	if($sitecurrency == 'LBP'){
	return '£';			
	}
	if($sitecurrency == 'LRD'){
	return '$';			
	}
	if($sitecurrency == 'LTL'){
	return 'Lt';			
	}
	if($sitecurrency == 'MKD'){
	return 'ден';			
	}
	if($sitecurrency == 'MUR'){
	return '₨';			
	}
	if($sitecurrency == 'MNT'){
	return '₮';			
	}
	if($sitecurrency == 'MZN'){
	return 'MT';			
	}
	if($sitecurrency == 'NAD'){
	return '$';			
	}
	
	if($sitecurrency == 'NPR'){
	return 'ƒ';			
	}if($sitecurrency == 'NIO'){
	return 'C$';			
	}if($sitecurrency == 'NGN'){
	return '₦';			
	}if($sitecurrency == 'OMR'){
	return '﷼';			
	}if($sitecurrency == 'PKR'){
	return '₨';			
	}if($sitecurrency == 'PAB'){
	return 'B/.';			
	}if($sitecurrency == 'PYG'){
	return 'Gs';			
	}if($sitecurrency == 'PEN'){
	return 'S/.';			
	}if($sitecurrency == 'QAR'){
	return '﷼';			
	}if($sitecurrency == 'RON'){
	return 'lei';			
	}if($sitecurrency == 'RUB'){
	return 'руб';			
	}if($sitecurrency == 'SHP'){
	return '£';			
	}if($sitecurrency == 'SAR'){
	return '﷼';			
	}if($sitecurrency == 'RSD'){
	return 'Дин.';			
	}if($sitecurrency == 'SCR'){
	return '₨';			
	}if($sitecurrency == 'SBD'){
	return '$';			
	}if($sitecurrency == 'SOS'){
	return 'S';			
	}if($sitecurrency == 'ZAR'){
	return 'R';			
	}if($sitecurrency == 'LKR'){
	return '₨';			
	}if($sitecurrency == 'SRD'){
	return '$';			
	}if($sitecurrency == 'SYP'){
	return '£';			
	}if($sitecurrency == 'TTD'){
	return 'TT$';			
	}if($sitecurrency == 'TVD'){
	return '$';			
	}if($sitecurrency == 'UAH'){
	return '₴';			
	}if($sitecurrency == 'UYU'){
	return '$U';			
	}if($sitecurrency == 'UZS'){
	return 'лв';			
	}if($sitecurrency == 'VEF'){
	return 'Bs';			
	}if($sitecurrency == 'VND'){
	return '₫';			
	}if($sitecurrency == 'YER'){
	return '﷼';			
	}if($sitecurrency == 'ZWD'){
	return 'Z$';			
	}
	
}
function GetReviewData($id,$link)
{
     $query = 'SELECT AVG(quality) as quality,AVG(delivery) as delivery,AVG(dealer) as dealer,AVG(package) as package, count(*) as rating FROM w_review WHERE id_w_business=$1 and status=$2' ;
      pg_prepare($link,'',$query);
    	$result3 = pg_execute($link,'',array($id,'TRUE'));
      $review = array();
      while($row = pg_fetch_array($result3))
		  {
      
	  $data = new stdClass();
			$data->quality = $row['quality'];
      $data->delivery = $row['delivery'];
      $data->dealer = $row['dealer'];
      $data->package = $row['package'];
      $data->rating = $row['rating'];
      $data->total = ($data->quality + $data->delivery + $data->dealer + $data->package)/4;
      //$data->ids = $row['id'];
      //$data->business = $row['id_w_business'];
      //$data->order = $row['id_order'];
      //array_push($review,$data);
   }
    
   
    return $data;
}

function checkDeliveryStatus($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1 and enabled=$2"; 
                pg_prepare($link,'sqlb111'.$bid,$bquery);
                $results = pg_execute($link,'sqlb111'.$bid,array($bid,'TRUE'));
				$status = new stdClass();
				$status->delivery = "false";
				while($rs = pg_fetch_array($results)) {
					if($rs['delivery'] == "t") {
					return $status->delivery = "true";
					exit;
					}
					
					
				}
				return $status->delivery;
				
	}
	function checkPickupStatus($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1 and enabled=$2"; 
                pg_prepare($link,'sqlb2'.$bid,$bquery);
                $results = pg_execute($link,'sqlb2'.$bid,array($bid,'TRUE'));
				$status = new stdClass();
				$status->pickup = "false";
				while($rs = pg_fetch_array($results)) {
					if($rs['pickup'] == "t") {
					return $status->pickup = "true";
					exit;
					}
					
					
				}
				return $status->pickup;
		
	}
	
function distanceCalculator($lat1, $lon1, $lat2, $lon2, $unit) {

  $theta = $lon1 - $lon2;
  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
  $dist = acos($dist);
  $dist = rad2deg($dist);
  $miles = $dist * 60 * 1.1515;
  $unit = strtoupper($unit);

  if ($unit == "K") {
    return ($miles * 1.609344);
  } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
        return $miles;
      }
}

function businessopenChkforMenu($bid,$link) {
	
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	unset($response);
	$menuopenchk = false;
	$dishesids = array();
	$dishes = array();
	$extras = array();
	
	pg_prepare($link,'sqlm100'.$bid,'SELECT * FROM w_menus WHERE business=$1 and enabled=true' );
	$result = pg_execute($link,'sqlm100'.$bid,array($bid));
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZone($_SESSION['timezone']));
				$schedule = parse($row['schedule']);
				
				
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
						
						$menuopenchk = true;
							
					}
				}
				
				
				}
	return $menuopenchk;
	}	

function previousDayCounti()	{
	
	$now = strtotime(GetTimeByZone($_SESSION['timezone']));
	$now = $now - 3600*24;
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$previd = $days->{date("D",  $now)};
	
	return $previd;

}
function preclosetimefun($schedule,$priviousDay) {

			if($schedule->sdays->{$priviousDay}->closes->hour == 24) {
						$preclosetime = 0;
				}    else if($schedule->sdays->{$priviousDay}->closes->hour == 25) {
					    $preclosetime = 1;
				}
				else if($schedule->sdays->{$priviousDay}->closes->hour == 26) {
					   $preclosetime = 2;
				}
				else if($schedule->sdays->{$priviousDay}->closes->hour == 27) {
					$preclosetime = 3;
				}
				else if($schedule->sdays->{$priviousDay}->closes->hour == 28) {
					$preclosetime = 4;
				}
				
				
				return $preclosetime;
}

function FetchMenuTimeOnCloseBusiness($businessid) {
	$link = ConnectDB();
	$sqltitle = 'sqlBusiness'.rand().$businessid;
	pg_prepare($link,$sqltitle,"SELECT * from w_menus WHERE business=$1 ");
	$resulttimeformat = pg_execute($link,$sqltitle,array($businessid));
	$numrows = pg_num_rows($resulttimeformat);
	$willopen = "";
	if($numrows >0){
		while($rsp = pg_fetch_array($resulttimeformat))
		{
			$schedule = json_decode($rsp['schedule']);
			if($schedule) {
				
		$opentime = sprintf('%02d', $schedule->opens->hour).":".sprintf('%02d', $schedule->opens->minute);
		$closetime = sprintf('%02d', $schedule->closes->hour).":".sprintf('%02d', $schedule->closes->minute);
		
		$opentime1 = strtotime($opentime);
		$closetime1 = strtotime($closetime1);
	
	
			$willopen .= $rsp['name']." (".date("h:i A", $opentime1)."-".date("h:i A", $closetime1).")";
			$willopen .= '<br>';
			}
		}
		
		
		
		}
	return $willopen;
}
function GetDecimalPoint($a){	
	
	$nuber_decimal_point = number_format($a,$_SESSION['decimal_value']);
	return $nuber_decimal_point;
	
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
	
	
function checkServiceFee($id,$link){
	
	
	$query = "SELECT * FROM w_configs WHERE name='servicefee'";	
	pg_prepare($link,'sqlservicech'.$id,$query);
	$result = pg_execute($link,'sqlservicech'.$id,array());
	while($row = pg_fetch_array($result))
		{
			$servicefee=$row["value"];
		}
		return $servicefee;
	
}
?>
