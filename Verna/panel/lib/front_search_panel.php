<?php session_start();

global $lang_resource;
function GetLangFileStatic2(){	

	require('../config.php');
	$link1 = ConnectDB($CFG);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		pg_prepare($link1,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
		$result1 = pg_execute($link1,'sqllangfetch',array('TRUE'));
		$row1 = pg_fetch_array($result1);
		$_SESSION['l'] = $row1['id'];
	}
	pg_prepare($link1,'sqlfetchlang','SELECT * from w_lang_static');
	$result = pg_execute($link1,'sqlfetchlang',array());
	while($row = pg_fetch_array($result)){
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	}
	return $lang_resource;
	pg_close($link1);
}
//$lang_resource = GetLangFileStatic1();
function frontserachpanelold($location,$allbusiness,$link,$deliveryType) {
               
				if (!empty($location))
					{
					$location = parse($location);
					
					$zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
					pg_prepare($link,'sqlzip2',$zipquery);
					
					 $querys = 'SELECT * from w_deliveryzone WHERE enabled=true';
					  pg_prepare($link,'sqldz2',$querys);
					  $results = pg_execute($link,'sqldz2',array());
					  $count = pg_num_rows($results);
		  
				  $AlllocationArea = array();
				  $now = strtotime(GetTimeByZone($_SESSION['timezone']));
				  $dayss = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
				  $todayidd = $dayss->{date("D",strtotime(date('d-m-Y')))};
				 
				  while($loc = pg_fetch_array($results))
						 {
						 unset($locationArea);
						 $locationArea->id = $loc['id'];
						 $locationArea->position = $loc['location'];
						 $locationArea->business = $loc['business'];
						 $locationArea->deliveryprice = $loc['deliveryprice'];
						 $locationArea->minpurchase = $loc['minpurchase'];
						 $locationArea->schedule = $loc['schedule'];
						 $locationArea->days = $loc['days'];
						 array_push($AlllocationArea,$locationArea);
						 }
					
				   /***********************************zone km wise***********************************/
					 $queryskm = 'SELECT * from w_deliverykm WHERE enabled=true';
					  pg_prepare($link,'sqldz4',$queryskm);
					  $kmwiseSql = pg_execute($link,'sqldz4',array());
					  $count = pg_num_rows($kmwiseSql);
					  
					  $AlllocationAreaInKm = array();
					  
					 
					  while($dis = pg_fetch_array($kmwiseSql))
							 {
							 unset($kmArea);
							 $kmArea->business = $dis['business'];
							 $kmArea->servearea = $dis['servearea'];
							 $kmArea->maxallow = $dis['maxallow'];
							 array_push($AlllocationAreaInKm,$kmArea);
							 }
							 
							// print_r($AlllocationAreaInKm);
					/**************************************zone km wise*******************************/
					$newbusiness = array();
					
									$searchlat = $location->latitud;
									$searchlong = $location->longitud;
					
					$searchzip = getSearchPostcode($searchlat,$searchlong);  // this zipcode get from user input
					
					//return $searchzip;
			
					foreach($allbusiness as $business)
						{
						$zones = parse($business->zones);
						$busid = $business->id;
				        $deliveyPrice[$busid] = -1;
						$deliveyZone[$busid] = "No";
						$searchType = false;
			/*********************************delivery zone wise select search****************************************************/
			  
						 if (PointInArea($location->latitud,$location->longitud,$zones->zone1->coordinates))
							{
							//remove unnecesary fields and add him as visible to the user
							$deliveyZone[$busid] ="Yes";
						    $deliveyPrice[$busid] = $zones->zone1->price;
							$business->shipping = $zones->zone1->price;
							$business->deliveryzone =  false;	
							$business->searchtype = $deliveryType;
							$searchType = true;
							unset($business->zones);
							//unset($business->location);
							unset($business->enabled);
							
							if($business->DeliveryStatus == "true") {
							array_push($newbusiness,$business);
											}
							}
						else if (PointInArea($location->latitud,$location->longitud,$zones->zone2->coordinates))
								{
								
								//remove unnecesary fields and add him as visible to the user
									$deliveyZone[$busid] ="Yes";
								 $deliveyPrice[$busid] = $zones->zone2->price;
								$business->shipping = $zones->zone2->price;
								$business->searchtype = $deliveryType;
								$business->deliveryzone =  false;	
								$searchType = true;
								unset($business->zones);
								//unset($business->location);
								unset($business->enabled);
								if($business->DeliveryStatus == "true") {
								array_push($newbusiness,$business);
								}
								}
						else if (PointInArea($location->latitud,$location->longitud,$zones->zone3->coordinates))
									{
							         $deliveyPrice[$busid] = $zones->zone3->price;
									//remove unnecesary fields and add him as visible to the user
									$deliveyZone[$busid] ="Yes";
									$business->deliveryzone =  false;	
									$business->shipping = $zones->zone3->price;
									$searchType = true;
									$business->searchtype = $deliveryType;
									unset($business->zones);
									//unset($business->location);
									unset($business->enabled);
									if($business->DeliveryStatus == "true") {
									array_push($newbusiness,$business);
									}
									}
						/*********************************delivery zone wise select search****************************************************/
						/*********************************zipcode match with backed zipcode ****************************************************/
						else if($business->ziprecord>0)		
									{
										unset($zipfetch);
									 $zipfetch = pg_execute($link,'sqlzip2',array($business->id,'true'));
							
									 
										 while($record = pg_fetch_array($zipfetch))
										 {
											if($searchzip == $record['zipcode'] )
											{
												
												$deliveyZone[$busid] ="Yes";
												$business->deliveryzone =  false;	
												$deliveyPrice[$busid] =  GetDecimalPoint($record['cost']);
												$business->shipping = GetDecimalPoint($record['cost']);
												$business->searchtype = $deliveryType;
												$searchType = true;
												unset($business->zones);
												
												//unset($business->location);
												unset($business->enabled);
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												break;
											}
										  }
									//return  pg_num_rows($zipfetch);
									//$business->id
									
										
										
								   }
				if($searchType == false) {
									   
								foreach($AlllocationAreaInKm as $kmzone)  {
									
									if($kmzone->business != "") {
									
								if(in_array("-1",parse($kmzone->business)) || in_array($business->id,parse($kmzone->business)) ) {
									
									//remove unnecesary fields and add him as visible to the user
									//echo $business->distance;
									$delDetails = approvdeliveryArea($kmzone->servearea,$business->distance,$kmzone->maxallow);
								
							
									if($delDetails->accept == true) { 
									
									if($deliveyPrice[$busid]<=$delDetails->delprice)
										{
									$business->shipping = GetDecimalPoint($delDetails->delprice);		
									$business->searchtype = $deliveryType;
									$business->minimum = $delDetails->maxallow;	
									 unset($business->zones);
									//unset($business->location);
									unset($business->enabled);
										}
									
									if($deliveyPrice[$busid] ==  -1) {
									$deliveyZone[$busid] ="Yes";	
									$business->deliveryzone =  false;	
									if($business->DeliveryStatus == "true") {
									array_push($newbusiness,$business);
									}
									}
									break;
									   }
									}
								
								
									
									}
									   
									   }
									
							 	if($deliveyZone[$busid]!="Yes") {
									
								
				            foreach($AlllocationArea as $locacus)  {
					
					//$bb[] = $business->id;
					if($locacus->business !="") {
							
					       if(in_array("-1",parse($locacus->business)) || in_array($business->id,parse($locacus->business)) ) {
							   
							   
					             if (PointInArea($location->latitud,$location->longitud,parse($locacus->position)))   {
					
					//$aa[]= $locacus->id;
					//$bb[]=  $business->id;
					
							//if($business->id == "42") { 	
				$schedules = parse($locacus->schedule);
				$deliverydays = parse($locacus->days);
				$recordHis[$business->id] = 0;
				foreach ($deliverydays as $day)
				{
								
				if ($day==$todayidd || $day=='0')//day 0 its the "all" days flag
				{
							
				$recordHis[$business->id] = 1;				
				$schedules = parse($locacus->schedule);
				
				
									
				if ($now>=strtotime($schedules->opens->hour.':'.$schedules->opens->minute)) 
				{ //menu opened now check if its not closed
					
					if ($now<strtotime($schedules->closes->hour.':'.$schedules->closes->minute))//ok
						{
						if($business->againmenuopenchk == true) {
							$business->open = true;
						}
						else {
							$business->open = false;
							}
							break;
						}
						else{
								
							$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
						$business->open = false;
						$willopen = FetchMenuTimeOnCloseBusiness($business->id);
					    $business->willopen =  $willopen;
							break;
							}	
				}
				  else {
					 
						$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
						$business->open = false;
						$willopen = FetchMenuTimeOnCloseBusiness($business->id);
					    $business->willopen =  $willopen;
					  
					   break;
					 
					 }
								}
						
					
					}
						if($recordHis[$business->id] == 0) { // for days check
						
						$business->open = false;
					    $business->willopen = "Today";
						break;
						
						}	
					 
								$business->shipping = $locacus->deliveryprice;
								$business->minimum =  $locacus->minpurchase;	
								$business->deliveryzone =  true;	
								$business->searchtype = $deliveryType;
								
								unset($business->zones);
								unset($business->enabled);
								if($deliveyZone[$busid]!="Yes" && $business->DeliveryStatus == "true") {
								array_push($newbusiness,$business);
								}
								break;
								}
							
					
												}
					
					
					                         }	
					               }
					
					}
							
							
									   
						/*********************************zipcode match with backed zipcode****************************************************/	
						}
				}
						
			
			if($business->deliveryzone==false) {
					//check for the business schedule and configure it...
					//echo 'son las ' . GetTimeByZone($_SESSION['timezone']) . ' ';			
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
								$af= 0;
							if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
								{//business is in the correct day, now check the time...
								 $priviousDay = previousDayCount();
								 $shopopenstatus = false;	  
								 
							if(($schedule->sdays->{$priviousDay}->closes->hour== 24 || $schedule->sdays->{$priviousDay}->closes->hour == 25 || $schedule->sdays->{$priviousDay}->closes->hour == 26 || $schedule->sdays->{$priviousDay}->closes->hour == 27 || $schedule->sdays->{$priviousDay}->closes->hour == 28) && $curHour < 5 ) {
				
				 $newScedule = strtotime($curHour.":".$schedule->sdays->{$priviousDay}->closes->minute);
				 
				                 if ($now>=$newScedule) {
					if($schedule->sdays->{$todayid}->closes->hour >23 )	{		  
			  $newScedule = strtotime('23:59');
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
								
									if($shopopenstatus == true)		{
									//business opened now check if it didnt close
									
						
									//business opened now check if it didnt close
									if ($now>=$newScedule)
										{
										//business closed
										$business->open = false;
										if ($day=='0')
											{
											if ($todayid==7)
												$tday = 1;
												else
												$tday = $todayid+1;
											
											if (intval($schedule->sdays->{$tday}->opens->minute)<10)
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
												else
												$min = $schedule->sdays->{$tday}->opens->minute;
			
											if (intval($schedule->sdays->{$tday}->opens->hour)<10)
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;
												else
												$hour = $schedule->sdays->{$tday}->opens->hour;
											
											$willopen = FetchMenuTimeOnCloseBusiness($business->id);
											$business->willopen = $willopen;
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
									
							 } else
									{
									//business still not opened
									$business->open = false;
									if (intval($schedule->sdays->{$todayid}->opens->minute)<10)
										$min = '0' . $schedule->sdays->{$todayid}->opens->minute;
										else
										$min = $schedule->sdays->{$todayid}->opens->minute;
			
									if (intval($schedule->sdays->{$todayid}->opens->hour)<10)
										$hour = '0' . $schedule->sdays->{$todayid}->opens->hour;
										else
										$hour = $schedule->sdays->{$todayid}->opens->hour;
			                        $willopen = FetchMenuTimeOnCloseBusiness($business->id);
									$business->willopen = $willopen;
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
			
							$ndays = array('','monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			
							if (intval($schedule->sdays->{$nextday}->opens->minute)<10)
								$min = '0' . $schedule->sdays->{$nextday}->opens->minute;
								else
								$min = $schedule->sdays->{$nextday}->opens->minute;
			
							if (intval($schedule->sdays->{$nextday}->opens->hour)<10)
								$hour = '0' . $schedule->sdays->{$nextday}->opens->hour;
								else
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								
							$willopen = FetchMenuTimeOnCloseBusiness($business->id);
							$business->willopen = $willopen;
							
							}
			
						$business->schedule = null;
						unset($business->schedule);
						}
					}
			}
					/*********************************************End search restaurant show here****************************************************/

					return $newbusiness;

}

function frontserachpanelnew($location,$allbusiness,$link,$deliveryType,$whereall) {

	$usersearchAddress = trim($whereall->address);
	 
	$usersearchcity = trim($whereall->city);
	 
	 $deliverycity = 'SELECT * FROM w_configs WHERE name=$1';	
	pg_prepare($link,'sqldelcity',$deliverycity);
	$delivcity = pg_execute($link,'sqldelcity',array('deliverycitysetting'));
	$res = pg_fetch_array($delivcity);
	
	$zipcodeordersetting = "zipcodeordersetting";
	pg_prepare($link,'sqlzset','SELECT * FROM w_configs WHERE name=$1');
	$resultzset = pg_execute($link,'sqlzset',array($zipcodeordersetting));
	$rowzset = pg_fetch_array($resultzset);
	$zsettingval = $rowzset["value"];

			//print_r($allbusiness);
			if (!empty($location))
					{
					$location = parse($location);
					
				  $AlllocationArea = array();
				  $now = strtotime(GetTimeByZone($_SESSION['timezone']));
				  $dayss = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
				  $todayidd = $dayss->{date("D",strtotime(date('d-m-Y')))};
				 
			
					
				   /***********************************zone km wise***********************************/
					 
					  
					  
							// print_r($AlllocationAreaInKm);
					/**************************************zone km wise*******************************/
					$newbusiness = array();
					
									$searchlat = $location->latitud;
									$searchlong = $location->longitud;

					
					if($location->zipcode =="-1") { 
					$searchzip = getSearchPostcode($searchlat,$searchlong);
					}
					else {
					$searchzip = $location->zipcode;	
						
						}
					
					
					
					
					   foreach($allbusiness as $business)
						{
							
						
					   $delcitysearch = 'SELECT * from w_deliverycity WHERE businessid IN ($1,-1) AND enabled=true';
					   pg_prepare($link,'sqlcitydelnew'.$business->id,$delcitysearch);	
						
							
					  $zipquery = 'SELECT * from w_zipcode WHERE  businessid IN ($1,-1) AND businessinsertid IS NOT NULL AND enabled=true';
	                  pg_prepare($link,'sqlzip'.$business->id,$zipquery);
					  pg_prepare($link,'sqlzipdp'.$business->id,$zipquery);
					  
					  $deliznquerys = 'SELECT * from w_deliveryzone WHERE businessid IN ($1,-1) AND businessinsertid IS NOT NULL AND enabled=true';
					  pg_prepare($link,'sqlzonenew'.$business->id,$deliznquerys);
					  
					  $queryskm = 'SELECT * from w_deliverykm WHERE businessid IN ($1,-1) AND businessinsertid IS NOT NULL AND enabled=true';
					  pg_prepare($link,'sqlbykm'.$business->id,$queryskm);
					  
					  
							$deliveyZoneMatch[$business->id] =false;
							$deliveyPrice[$business->id]  = -1;
							
							
		/***********************************search with delivery by city******************************************/
		//echo $res['value'];
								if($res['value']==1){
									
								$delcityfetchdp = pg_execute($link,'sqlcitydelnew'.$business->id,array($business->id));	
									
								while($delcityrecords = pg_fetch_array($delcityfetchdp))
										 {
										
											if($usersearchcity == $delcityrecords['delcity'] )
											{
											
												$deliveyZoneMatch[$business->id] =true;
												$business->deliveryzone =  false;	
												
												$business->searchlocationType =  "city";
												$deliveyPrice[$business->id] =  GetDecimalPoint($delcityrecords['citydelivery_fee']);
												$business->shipping = GetDecimalPoint($delcityrecords['citydelivery_fee']);
												$business->minimum = $delcityrecords['citydelivery_minper'];
												$business->maxforfreedelivery = $delcityrecords['citydelivery_minperfree'];
												$business->deliverycitysearch =  true;
												$business = opencloseTime($business);
												$business->searchtype = $deliveryType;
												
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												break;
											}
										  }
									
														
													
								}
		/***********************************End search with delivery by city******************************************/							
					
		if($business->deliverycitysearch == false){
			
					
			/****************************************First time raw search with zipcode*******************************************/
								if($usersearchAddress && $deliveyZoneMatch[$business->id] == false) {
								
								//echo $usersearchAddress;		
								$zipfetchdp = pg_execute($link,'sqlzipdp'.$business->id,array($business->id));
								
								while($records = pg_fetch_array($zipfetchdp))
										 {
											// echo $records['zipcode'];
											// echo $records['minimumprice'];
											if($usersearchAddress == $records['zipcode'] )
											{
												//echo $records['minimumprice'];
												//$business->deliverycitysearch."aaaaaa";		
											$devtime =  json_decode($records['deliverytime']);	
											$deliverytime = $devtime->deliverytime->hour.':'.$devtime->deliverytime->minute;
												$deliveyZoneMatch[$business->id] =true;
												$business->deliveryzone =  false;	
												$business->deliverycitysearch =  false;
												$business->searchlocationType =  "zips";
												$deliveyPrice[$business->id] =  GetDecimalPoint($records['cost']);
												$business->shipping = GetDecimalPoint($records['cost']);
												if($zsettingval=='1'){
												$business->minimum = $records['minimumprice'];
												$business->deliverytime =$deliverytime;
												}
												$business = opencloseTime($business);
												$business->searchtype = $deliveryType;
												unset($business->zones);
												unset($business->enabled);
												
												
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												break;
											}
										  }
								
								}
							
	/****************************************First time raw search with zipcode*******************************************/
							
	/**************************delivery zone search******************************** */

	if($deliveyZoneMatch[$business->id] == false){	
		$bussinesslocate = pg_execute($link,'sqlzonenew'.$business->id,array($business->id));

		while($bussinessFetchRecord = pg_fetch_array($bussinesslocate)) {
			//print_r($bussinessFetchRecord['location']);
			$zones = parse($bussinessFetchRecord['location']);
			
			if (PointInArea($location->latitud,$location->longitud,$zones) && $deliveyZoneMatch[$business->id] == false) {
				$deliveyPrice[$business->id] = $bussinessFetchRecord['deliveryprice'];
				$deliveyZoneMatch[$business->id] =true;
				$business->deliveryzone =  false;
				$business->deliverycitysearch =  false;
				$business->searchlocationType =  "zones";
				$business->shipping = $bussinessFetchRecord['deliveryprice'];
				$business->minimum = $bussinessFetchRecord['minpurchase'];
				$business = opencloseTime($business);
				$searchType = true;
				$business->searchtype = $deliveryType;
				unset($business->zones);
				//unset($business->location);
				unset($business->enabled);
				if($business->DeliveryStatus == "true") {
					array_push($newbusiness,$business);
				}
				break;
			}
		}
	}
	/**************************delivery zone search******************************** */
/**************************zipcode search******************************** */
							if($deliveyZoneMatch[$business->id] == false) {
							
							$zipfetch = pg_execute($link,'sqlzip'.$business->id,array($business->id));
							
									 
										 while($record = pg_fetch_array($zipfetch))
										 {
											if($searchzip == $record['zipcode'] )
											{
											
												$deliveyZoneMatch[$business->id] =true;
												$business->deliveryzone =  false;	
												$business->deliverycitysearch =  false;
												$business->searchlocationType =  "zips";
												$deliveyPrice[$business->id] =  GetDecimalPoint($record['cost']);
												$business->shipping = GetDecimalPoint($record['cost']);
												if($zsettingval=='1'){
												$business->minimum = $record['minimumprice'];
												$devtime =  json_decode($record['deliverytime']);	
												$deliverytime = $devtime->deliverytime->hour.':'.$devtime->deliverytime->minute;
												$business->deliverytime = $deliverytime;
												}
												$business = opencloseTime($business);
												$business->searchtype = $deliveryType;
												unset($business->zones);
												unset($business->enabled);
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												break;
											}
										  }
									
								
								}
							
							
							
							/**************************zipcode search******************************** */
								/**************************KM WISE search******************************** */
							if($deliveyZoneMatch[$business->id] == false) {
							
				
					  
					  $kmwiseSql = pg_execute($link,'sqlbykm'.$business->id,array($business->id));
					  
					  $count = pg_num_rows($kmwiseSql);
					  
					while($dis = pg_fetch_array($kmwiseSql))
							 {
						
							 //unset($kmzone);
							 $kmzone = new stdClass();
							  $kmzone->business = $dis['businessid'];
							 $kmzone->servearea = $dis['servearea'];
							 $kmzone->maxallow = $dis['maxallow'];
							
							  if($kmzone->business != "") {
									
									$delDetails = approvdeliveryArea($kmzone->servearea,$business->distance,$kmzone->maxallow);
								
							
									if($delDetails->accept == true) { 
									
									if($deliveyPrice[$busid]<=$delDetails->delprice)
										{
									$business->shipping = GetDecimalPoint($delDetails->delprice);		
									$business->searchtype = $deliveryType;
									$business->searchlocationType =  "KM";
									$business->minimum = $delDetails->maxallow;	
									 unset($business->zones);
									 unset($business->enabled);
										}
									
									if($deliveyPrice[$business->id] ==  -1) {
									$deliveyZoneMatch[$business->id] =true;	
									$deliveyZone[$business->id] ="Yes";	
									$business = opencloseTime($business);
									$business->deliveryzone =  false;	
									$business->deliverycitysearch =  false;
									if($business->DeliveryStatus == "true") {
									array_push($newbusiness,$business);
									}
									}
									break;
									   }
									
								
								
									
									}
									   
							 }
							}
							
							
							
							/**************************KM WISE search******************************** */
			
		}
							
						
		
						
						  } //end foreach
						  
						  
						  
						 
						  
					
					} // empty location check  
					
					
					
          	return $newbusiness;
	
	}
function frontserachpanelnew1($location,$allbusiness,$link,$deliveryType,$whereall,$rpg_numrows,$numrow) {

	$usersearchAddress = trim($whereall->address);
	 
	$usersearchcity = trim($whereall->city);
	 
	 $deliverycity = 'SELECT * FROM w_configs WHERE name=$1';	
	pg_prepare($link,'sqldelcity',$deliverycity);
	$delivcity = pg_execute($link,'sqldelcity',array('deliverycitysetting'));
	$res = pg_fetch_array($delivcity);
	
	$zipcodeordersetting = "zipcodeordersetting";
	pg_prepare($link,'sqlzset','SELECT * FROM w_configs WHERE name=$1');
	$resultzset = pg_execute($link,'sqlzset',array($zipcodeordersetting));
	$rowzset = pg_fetch_array($resultzset);
	$zsettingval = $rowzset["value"];

			//print_r($allbusiness);
			if (!empty($location))
					{
					$location = parse($location);

					
				  $AlllocationArea = array();
				  $now = strtotime(GetTimeByZone($_SESSION['timezone']));
				  $dayss = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
				  $todayidd = $dayss->{date("D",strtotime(date('d-m-Y')))};
				 
			
					
				   /***********************************zone km wise***********************************/
					 
					  
					  
							// print_r($AlllocationAreaInKm);
					/**************************************zone km wise*******************************/
					$newbusiness = array();
					
									$searchlat = $location->latitud;
									$searchlong = $location->longitud;

					
					if($location->zipcode =="-1") { 
					$searchzip = getSearchPostcode($searchlat,$searchlong);
					}
					else {
					$searchzip = $location->zipcode;	
						
						}
					
					
					
					   foreach($allbusiness as $business)
						{
							
						
					   $delcitysearch = 'SELECT * from w_deliverycity WHERE businessid IN ($1,-1) AND enabled=true';
					   pg_prepare($link,'sqlcitydelnew'.$business->id,$delcitysearch);	
						
							
					  $zipquery = 'SELECT * from w_zipcode WHERE  businessid IN ($1,-1) AND businessinsertid IS NOT NULL AND enabled=true';
	                  pg_prepare($link,'sqlzip'.$business->id,$zipquery);
					  pg_prepare($link,'sqlzipdp'.$business->id,$zipquery);
					  
					  $deliznquerys = 'SELECT * from w_deliveryzone WHERE businessid IN ($1,-1) AND businessinsertid IS NOT NULL AND enabled=true';
					  pg_prepare($link,'sqlzonenew'.$business->id,$deliznquerys);
					  
					  $queryskm = 'SELECT * from w_deliverykm WHERE businessid IN ($1,-1) AND businessinsertid IS NOT NULL AND enabled=true';
					  pg_prepare($link,'sqlbykm'.$business->id,$queryskm);
					  
					  
							$deliveyZoneMatch[$business->id] =false;
							$deliveyPrice[$business->id]  = -1;
							
							
		/***********************************search with delivery by city******************************************/
		//echo $res['value'];
								if($res['value']==1){
									
								$delcityfetchdp = pg_execute($link,'sqlcitydelnew'.$business->id,array($business->id));	
									
								while($delcityrecords = pg_fetch_array($delcityfetchdp))
										 {
										
											if($usersearchcity == $delcityrecords['delcity'] )
											{
											
												$deliveyZoneMatch[$business->id] =true;
												$business->deliveryzone =  false;	
												
												$business->searchlocationType =  "city";
												$deliveyPrice[$business->id] =  GetDecimalPoint($delcityrecords['citydelivery_fee']);
												$business->shipping = GetDecimalPoint($delcityrecords['citydelivery_fee']);
												$business->minimum = $delcityrecords['citydelivery_minper'];
												$business->maxforfreedelivery = $delcityrecords['citydelivery_minperfree'];
												$business->deliverycitysearch =  true;
												$business = opencloseTime($business);
												$business->searchtype = $deliveryType;
												
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												
												break;
											}
											
										  }
									
														
													
								}
		/***********************************End search with delivery by city******************************************/							
					
		if($business->deliverycitysearch == false){
			
					
			/****************************************First time raw search with zipcode*******************************************/
								if($usersearchAddress && $deliveyZoneMatch[$business->id] == false) {
								
								//echo $usersearchAddress;		
								$zipfetchdp = pg_execute($link,'sqlzipdp'.$business->id,array($business->id));
								
								while($records = pg_fetch_array($zipfetchdp))
										 {
											// echo $records['zipcode'];
											// echo $records['minimumprice'];
											if($usersearchAddress == $records['zipcode'] )
											{
												//echo $records['minimumprice'];
												//$business->deliverycitysearch."aaaaaa";		
											$devtime =  json_decode($records['deliverytime']);	
											$deliverytime = $devtime->deliverytime->hour.':'.$devtime->deliverytime->minute;
												$deliveyZoneMatch[$business->id] =true;
												$business->deliveryzone =  false;	
												$business->deliverycitysearch =  false;
												$business->searchlocationType =  "zips";
												$deliveyPrice[$business->id] =  GetDecimalPoint($records['cost']);
												$business->shipping = GetDecimalPoint($records['cost']);
												if($zsettingval=='1'){
												$business->minimum = $records['minimumprice'];
												$business->deliverytime =$deliverytime;
												}
												$business = opencloseTime($business);
												$business->searchtype = $deliveryType;
												unset($business->zones);
												unset($business->enabled);
												
												
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												break;
											}
											
										  }
								
								}
							
	/****************************************First time raw search with zipcode*******************************************/
							
	/**************************delivery zone search******************************** */

	if($deliveyZoneMatch[$business->id] == false){	
		$bussinesslocate = pg_execute($link,'sqlzonenew'.$business->id,array($business->id));
		
		while($bussinessFetchRecord = pg_fetch_array($bussinesslocate)) {
			//print_r($bussinessFetchRecord['location']);
			$zones = parse($bussinessFetchRecord['location']);
			

			if (PointInArea($location->latitud,$location->longitud,$zones) && $deliveyZoneMatch[$business->id] == false) {
				$deliveyPrice[$business->id] = $bussinessFetchRecord['deliveryprice'];
				$deliveyZoneMatch[$business->id] =true;
				$business->deliveryzone =  false;
				$business->deliverycitysearch =  false;
				$business->searchlocationType =  "zones";
				$business->shipping = $bussinessFetchRecord['deliveryprice'];
				$business->minimum = $bussinessFetchRecord['minpurchase'];
				$business = opencloseTime($business);
				$searchType = true;
				$business->searchtype = $deliveryType;
				unset($business->zones);
				//unset($business->location);
				unset($business->enabled);
				if($business->DeliveryStatus == "true") {
					array_push($newbusiness,$business);
				}
				break;
			}
			
		}
	}
	/**************************delivery zone search******************************** */
/**************************zipcode search******************************** */
							if($deliveyZoneMatch[$business->id] == false) {
							
							$zipfetch = pg_execute($link,'sqlzip'.$business->id,array($business->id));
							
									 
										 while($record = pg_fetch_array($zipfetch))
										 {
											if($searchzip == $record['zipcode'] )
											{
											
												$deliveyZoneMatch[$business->id] =true;
												$business->deliveryzone =  false;	
												$business->deliverycitysearch =  false;
												$business->searchlocationType =  "zips";
												$deliveyPrice[$business->id] =  GetDecimalPoint($record['cost']);
												$business->shipping = GetDecimalPoint($record['cost']);
												if($zsettingval=='1'){
												$business->minimum = $record['minimumprice'];
												$devtime =  json_decode($record['deliverytime']);	
												$deliverytime = $devtime->deliverytime->hour.':'.$devtime->deliverytime->minute;
												$business->deliverytime = $deliverytime;
												}
												$business = opencloseTime($business);
												$business->searchtype = $deliveryType;
												unset($business->zones);
												unset($business->enabled);
												if($business->DeliveryStatus == "true") {
												array_push($newbusiness,$business);
												}
												break;
											}
											
										  }
									
								
								}
							
							
							
							/**************************zipcode search******************************** */
								/**************************KM WISE search******************************** */
							if($deliveyZoneMatch[$business->id] == false) {
							
				
					  
					  $kmwiseSql = pg_execute($link,'sqlbykm'.$business->id,array($business->id));
					  
					  $count = pg_num_rows($kmwiseSql);
					  
					while($dis = pg_fetch_array($kmwiseSql))
							 {
						
							 //unset($kmzone);
							 $kmzone = new stdClass();
							  $kmzone->business = $dis['businessid'];
							 $kmzone->servearea = $dis['servearea'];
							 $kmzone->maxallow = $dis['maxallow'];
							
							  if($kmzone->business != "") {
									
									$delDetails = approvdeliveryArea($kmzone->servearea,$business->distance,$kmzone->maxallow);
								
							
									if($delDetails->accept == true) { 
									
									if($deliveyPrice[$busid]<=$delDetails->delprice)
										{
									$business->shipping = GetDecimalPoint($delDetails->delprice);		
									$business->searchtype = $deliveryType;
									$business->searchlocationType =  "KM";
									$business->minimum = $delDetails->maxallow;	
									 unset($business->zones);
									 unset($business->enabled);
										}
									
									if($deliveyPrice[$business->id] ==  -1) {
									$deliveyZoneMatch[$business->id] =true;	
									$deliveyZone[$business->id] ="Yes";	
									$business = opencloseTime($business);
									$business->deliveryzone =  false;	
									$business->deliverycitysearch =  false;
									if($business->DeliveryStatus == "true") {
									array_push($newbusiness,$business);
									}
									}
									break;
									   }
									
									
									}
									   
							 }
							}
							
							
							
							/**************************KM WISE search******************************** */
			
		}
							
						
		if($business->burl != "" && $business->csvupload=="t") { 
		
		array_push($newbusiness,$business);
		}
						
						  } //end foreach
						  
						  
						  
						 
						  
					
					} // empty location check  
					
					
					
          		$numrowtot = pg_num_rows($rpg_numrows);
				
				$numrow = count($newbusiness);		
				
				//$new_twist_array = array();
				$new_twist_array->newbusiness =$newbusiness;
				$new_twist_array->paginationdetails =array($numrowtot,$numrow);
				
				//count($newbusiness);
				return $new_twist_array;;
	
	}	
function opencloseTime($business) {
		
					$now = strtotime(GetTimeByZone($_SESSION['timezone']));
					$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
					$todayid = $days->{date("D",$now)};
					$curHour = date('H',$now);
					

					
					$schedule = parse($business->schedule);
					$onday = false;
						
					foreach ($schedule->days as $day)
					{
					$af= 0;
					if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
					{//business is in the correct day, now check the time...
							 $priviousDay = previousDayCount();
							 $shopopenstatus = false;	  
								 
				if(($schedule->sdays->{$priviousDay}->closes->hour== 24 || $schedule->sdays->{$priviousDay}->closes->hour == 25 || $schedule->sdays->{$priviousDay}->closes->hour == 26 || $schedule->sdays->{$priviousDay}->closes->hour == 27 || $schedule->sdays->{$priviousDay}->closes->hour == 28) && $curHour < 5 ) {
				 $preclosetime = preclosetimefun1($schedule,$priviousDay);
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
								
									if($shopopenstatus == true)		{
									//business opened now check if it didnt close
									
						
									//business opened now check if it didnt close
									if ($now>=$newScedule)
										{
										//business closed
										$business->open = false;
										if ($day=='0')
											{
											if ($todayid==7)
												$tday = 1;
												else
												$tday = $todayid+1;
											
											if (intval($schedule->sdays->{$tday}->opens->minute)<10)
												$min = '0' . $schedule->sdays->{$tday}->opens->minute;
												else
												$min = $schedule->sdays->{$tday}->opens->minute;
			
											if (intval($schedule->sdays->{$tday}->opens->hour)<10)
												$hour = '0' . $schedule->sdays->{$tday}->opens->hour;
												else
												$hour = $schedule->sdays->{$tday}->opens->hour;
											
											$willopen = FetchMenuTimeOnCloseBusiness($business->id);
											$business->willopen = $willopen;
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
									
							 } else
									{
									//business still not opened
									$business->open = false;
									if (intval($schedule->sdays->{$todayid}->opens->minute)<10)
										$min = '0' . $schedule->sdays->{$todayid}->opens->minute;
										else
										$min = $schedule->sdays->{$todayid}->opens->minute;
			
									if (intval($schedule->sdays->{$todayid}->opens->hour)<10)
										$hour = '0' . $schedule->sdays->{$todayid}->opens->hour;
										else
										$hour = $schedule->sdays->{$todayid}->opens->hour;
			                        $willopen = FetchMenuTimeOnCloseBusiness($business->id);
									$business->willopen = $willopen;
									}
								$onday = true;
								}
							}
			
						if ($onday==false)
							$business->open = false;
						
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
			
							$ndays = array('','monday','tuesday','wednesday','thursday','friday','saturday','sunday');
			
							if (intval($schedule->sdays->{$nextday}->opens->minute)<10)
								$min = '0' . $schedule->sdays->{$nextday}->opens->minute;
								else
								$min = $schedule->sdays->{$nextday}->opens->minute;
			
							if (intval($schedule->sdays->{$nextday}->opens->hour)<10)
								$hour = '0' . $schedule->sdays->{$nextday}->opens->hour;
								else
								$hour = $schedule->sdays->{$nextday}->opens->hour;
								
							$willopen =FetchMenuTimeOnCloseBusiness($business->id);
							$business->willopen = $willopen;
							
							}
			
						$business->schedule = null;
						unset($business->schedule);
						
						
						return $business;
					
					
	}	
	  function getSearchPostcode($lat,$lng) {
		
		/*$loc=parse($location);
		$loc = parse($loc);
		$lat = $loc->latitud;
		$lng = $loc->longitud;
		*/
	
  $returnValue = NULL;
  $ch = curl_init();
  $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $result = curl_exec($ch);
  $json = json_decode($result, TRUE);

  if (isset($json['results'])) {
     foreach    ($json['results'] as $result) {
        foreach ($result['address_components'] as $address_component) {
          $types = $address_component['types'];
          if (in_array('postal_code', $types) && sizeof($types) == 1) {
             $returnValue = $address_component['short_name'];
          }
    }
     }
  }
  return $returnValue;
}
function approvdeliveryArea($servicearea,$distance,$maxallow ) {
	
	//echo $servicearea;
	$i=0;
	$servicearea = json_decode($servicearea);
	//print_r($servicearea);
	foreach($servicearea as $service) {
        unset($area);
		unset($final);
		$area = parse($service->area);
		//print_r($area);
		$f = $area->from; 
		$t = $area->to; 
		//echo $distance = floatval($distance);
		$p = $area->price; 
		if($i == 0) {
		if($distance>=$f && $distance<=$t)
				{
					$final = new stdClass();
					$final->accept = true;
					$final->delprice = $p;
					$final->maxallow = $maxallow;
					return $final;
					
				}
		}
		else {
				if($distance>=$f && $distance<=$t)
				{
					
					$final = new stdClass();
					$final->accept = true;
					$final->delprice = $p;
					$final->maxallow = $maxallow;
					return $final;
					
				}
			
			
			}
		
		$i++;
   }
}
function FindOpenDayDp($schedule,$did,$hour,$min) {
	
	global $lang_resource;
	
	$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
	 
	 $c = false;
	
	
		if($did == 1) {
		$warray = array("1", "2", "3", "4", "5", "6", "7");
		} else if($did == 2) {
		$warray = array("2", "3", "4","5", "6", "7", "1");
	    } else if($did == 3) {
		$warray = array("3", "4", "5", "6", "7", "1", "2");
		} else if($did == 4) {
		$warray = array("4", "5", "6", "7", "1", "2", "3");
		} else if($did == 5) {
		$warray = array("5", "6", "7", "1", "2", "3", "4");
		}else if($did == 6) {
		$warray = array( "6", "7", "1", "2", "3", "4", "5");
		}else if($did == 7) {
		$warray = array("7", "1", "2", "3", "4", "5", "6");
		}
		else {
		$warray = array("1", "2", "3", "4", "5", "6", "7");
			}
		
	foreach($warray as $tdate) {
	// 
	 $c = true;
	if($schedule->sdays->{$tdate}->opens->hour != 0 || $schedule->sdays->{$tdate}->closes->hour != 0 ) {
	$strtotime = strtotime($schedule->sdays->{$tdate}->opens->hour. ':' . $schedule->sdays->{$tdate}->opens->minute);
	 //Time selection settings. 
	$link = ConnectDB();
	 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
	$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	$rowtimeformat = pg_fetch_array($resulttimeformat);
	 $time_format=$rowtimeformat['value'];
	if($time_format==12){
			$dt1=date('h:i a',$strtotime);
		}else{
			$dt1=date('H:i ',$strtotime);
		}
	return $lang_resource['FRONT_BULK_UNTIL']." ".$ndays[$tdate]." ".$dt1;
	
	}
	
	}
	
	if($c == false) {
	$strtotime = strtotime($hour. ':' . $min);
	
	return $lang_resource['FRONT_BULK_UNTIL']." ".$ndays[$did]." ".date('h:i a',$strtotime);
	}
	
	}
function previousDayCount()	{
	
	$now = strtotime(GetTimeByZone($_SESSION['timezone']));
	$now = $now - 3600*24;
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$previd = $days->{date("D",  $now)};
	
	return $previd;

}	
function frontserachneighborhood($location,$allbusiness,$link,$whereall) {

	
	$delivery_neighbour = 'SELECT * from w_delivary_neighborhood WHERE enabled=true';
	 pg_prepare($link,'sqlng2',$delivery_neighbour);
	 $neighbourSql = pg_execute($link,'sqlng2',array());
	 
	  $now = strtotime(GetTimeByZone($_SESSION['timezone']));
	 $days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	 $todayid = $days->{date("D",$now)};;
	
	 $AllneighbourArea = array();
	 $newbusiness = array();
	 while($loc = pg_fetch_array($neighbourSql)) {
		 
		           unset($locationArea);
						 $locationArea->id = $loc['id'];
						 $locationArea->delivery_price = $loc['delivery_price'];
						 $locationArea->business = $loc['business'];
						 $locationArea->area = $loc['area'];
						 $locationArea->schedule = $loc['schedule'];
						 $locationArea->minimum_purchase = $loc['minimum_purchase'];
						 $locationArea->days = $loc['days'];
						 array_push($AllneighbourArea,$locationArea);
	 
	 }
	 
	
	 
	foreach($allbusiness as $business)
						{
					
		foreach($AllneighbourArea as $locacus)  {
		 
		if((in_array("-1",parse($locacus->business)) || in_array($business->id,parse($locacus->business))) && (in_array("-1",parse($locacus->area)) || in_array($whereall->delivery_neighborhoodid,parse($locacus->area))) )
		{   
		
			$schedules = parse($locacus->schedule);
			$deliverydays=  parse($locacus->days);
			$recordHis[$business->id] = 0;
			foreach ($deliverydays as $day){					
				if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{			
							
					$recordHis[$business->id] = 1;				
					$schedules = parse($locacus->schedule);			

					if($schedules->closes->hour < 24) {
						$newScedule = strtotime($schedules->closes->hour.':'.$schedules->closes->minute);
					}else{					
						if($schedules->closes->hour== 24  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )){
							$newScedule = strtotime("00:".$schedules->closes->minute)+86400;
						}else if($schedules->closes->hour == 25 && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("01:".$schedules->closes->minute)+86400;	
						}else if($schedules->closes->hour == 26  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("02:".$schedules->closes->minute)+86400;	
						}else if($schedules->closes->hour == 27  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("03:".$schedules->closes->minute)+86400;	
						}else if($schedules->closes->hour== 28  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("04:".$schedules->closes->minute)+86400;	
						}else{
							if($schedules->closes->hour== 24)
								$newScedule = strtotime("00:".$schedules->closes->minute)+86400;	
							if($schedules->closes->hour== 25)
								$newScedule = strtotime("01:".$schedules->closes->minute)+86400;	
							if($schedules->closes->hour== 26)
								$newScedule = strtotime("02:".$schedule->closes->minute)+86400;
							if($schedules->closes->hour== 27)
								$newScedule = strtotime("03:".$schedules->closes->minute)+86400;
							if($schedules->closes->hour== 28)
								$newScedule = strtotime("04:".$schedules->closes->minute)+86400;
						}
					}
										
					if ($now>=strtotime($schedules->opens->hour.':'.$schedules->opens->minute)) 
					{ //menu opened now check if its not closed
						if ($now<$newScedule){ // time ok with close time						
							if($business->againmenuopenchk == true){
								$business->open = true;
							}else{
								$business->open = false;
							}
							break;
						}else{
							$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
							$business->open = false;
							$willopen = FetchMenuTimeOnCloseBusiness($business->id);
						    $business->willopen =  $willopen;
							break;
						}	
					}else {					
						$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
						$business->open = false;
						$willopen = FetchMenuTimeOnCloseBusiness($business->id);
						$business->willopen =  $willopen;
						break;
					}
				}					
			} 
					
			if($recordHis[$business->id] == 0) { 			
				$business->open = false;
			    $business->willopen = "Today";
				break;			
			}				
					 
			$business->shipping = $locacus->delivery_price;
			$business->minimum =  $locacus->minimum_purchase;	
			$business->deliveryzone =  true;	
			$business->searchtype = "neighbour";
			unset($business->zones);
			unset($business->enabled);
			if (!in_array($business, $newbusiness)){
				array_push($newbusiness,$business);
			}						
		}
							
	}	 
	}
							
	
		return $newbusiness;

}	
function frontserachneighborhood1($location,$allbusiness,$link,$whereall,$rpg_numrows,$numrow) {

	
	$delivery_neighbour = 'SELECT * from w_delivary_neighborhood WHERE enabled=true';
	 pg_prepare($link,'sqlng2',$delivery_neighbour);
	 $neighbourSql = pg_execute($link,'sqlng2',array());
	 
	  $now = strtotime(GetTimeByZone($_SESSION['timezone']));
	 $days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	 $todayid = $days->{date("D",$now)};;
	
	 $AllneighbourArea = array();
	 $newbusiness = array();
	 while($loc = pg_fetch_array($neighbourSql)) {
		 
		           unset($locationArea);
						 $locationArea->id = $loc['id'];
						 $locationArea->delivery_price = $loc['delivery_price'];
						 $locationArea->business = $loc['business'];
						 $locationArea->area = $loc['area'];
						 $locationArea->schedule = $loc['schedule'];
						 $locationArea->minimum_purchase = $loc['minimum_purchase'];
						 $locationArea->days = $loc['days'];
						 array_push($AllneighbourArea,$locationArea);
	 
	 }
	 
	
	 
	foreach($allbusiness as $business)
						{
					
		foreach($AllneighbourArea as $locacus)  {
		 
		if((in_array("-1",parse($locacus->business)) || in_array($business->id,parse($locacus->business))) && (in_array("-1",parse($locacus->area)) || in_array($whereall->delivery_neighborhoodid,parse($locacus->area))) )
		{   
		
			$schedules = parse($locacus->schedule);
			$deliverydays=  parse($locacus->days);
			$recordHis[$business->id] = 0;
			foreach ($deliverydays as $day){					
				if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{			
							
					$recordHis[$business->id] = 1;				
					$schedules = parse($locacus->schedule);			

					if($schedules->closes->hour < 24) {
						$newScedule = strtotime($schedules->closes->hour.':'.$schedules->closes->minute);
					}else{					
						if($schedules->closes->hour== 24  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )){
							$newScedule = strtotime("00:".$schedules->closes->minute)+86400;
						}else if($schedules->closes->hour == 25 && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("01:".$schedules->closes->minute)+86400;	
						}else if($schedules->closes->hour == 26  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("02:".$schedules->closes->minute)+86400;	
						}else if($schedules->closes->hour == 27  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("03:".$schedules->closes->minute)+86400;	
						}else if($schedules->closes->hour== 28  && (date("H") == 0 || date("H") == 1|| date("H") == 2 || date("H") == 3 || date("H") == 4 )) {
							$newScedule = strtotime("04:".$schedules->closes->minute)+86400;	
						}else{
							if($schedules->closes->hour== 24)
								$newScedule = strtotime("00:".$schedules->closes->minute)+86400;	
							if($schedules->closes->hour== 25)
								$newScedule = strtotime("01:".$schedules->closes->minute)+86400;	
							if($schedules->closes->hour== 26)
								$newScedule = strtotime("02:".$schedule->closes->minute)+86400;
							if($schedules->closes->hour== 27)
								$newScedule = strtotime("03:".$schedules->closes->minute)+86400;
							if($schedules->closes->hour== 28)
								$newScedule = strtotime("04:".$schedules->closes->minute)+86400;
						}
					}
										
					if ($now>=strtotime($schedules->opens->hour.':'.$schedules->opens->minute)) 
					{ //menu opened now check if its not closed
						if ($now<$newScedule){ // time ok with close time						
							if($business->againmenuopenchk == true){
								$business->open = true;
							}else{
								$business->open = false;
							}
							break;
						}else{
							$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
							$business->open = false;
							$willopen = FetchMenuTimeOnCloseBusiness($business->id);
						    $business->willopen =  $willopen;
							break;
						}	
					}else {					
						$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
						$business->open = false;
						$willopen = FetchMenuTimeOnCloseBusiness($business->id);
						$business->willopen =  $willopen;
						break;
					}
				}					
			} 
					
			if($recordHis[$business->id] == 0) { 			
				$business->open = false;
			    $business->willopen = "Today";
				break;			
			}				
					 
			$business->shipping = $locacus->delivery_price;
			$business->minimum =  $locacus->minimum_purchase;	
			$business->deliveryzone =  true;	
			$business->searchtype = "neighbour";
			unset($business->zones);
			unset($business->enabled);
			if (!in_array($business, $newbusiness)){
				array_push($newbusiness,$business);
			}						
		}
							
	}	 
	}
							
		$numrowtot = pg_num_rows($rpg_numrows);
		
		$numrow = count($newbusiness);		
		
		//$new_twist_array = array();
		$new_twist_array->newbusiness =$newbusiness;
		$new_twist_array->paginationdetails =array($numrowtot,$numrow);
		
		//count($newbusiness);
		return $new_twist_array;

}	

	function preclosetimefun1($schedule,$priviousDay) {

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
?>