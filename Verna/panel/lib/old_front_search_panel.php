<?php 

				
				//if we got the users location means we need to only return the business that can deliver to him
				if (!empty($location))
					{
					$location = parse($location);
					
					
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
					 $querys = 'SELECT * from w_deliverykm WHERE enabled=true';
					  pg_prepare($link,'sqldz4',$querys);
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
									 $zipfetch = pg_execute($link,'sqlz2',array($business->id,'TRUE'));
							
									 
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
						
							$business->open = true;
							break;
						}
						else{
								
							$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
						$business->open = false;
						$willopen = FindOpenDay($schedule,$todayidd,$schedules->opens->hour,$mm);
					    $business->willopen =  $willopen;
							break;
							}	
				}
				  else {
					 
						$mm = ($schedules->opens->minute == 0)?"00":$schedules->opens->minute;
						$business->open = false;
						$willopen = FindOpenDay($schedule,$todayidd,$schedules->opens->hour,$mm);
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
						/*echo "save";
						print_r($bb);
					   exit();*/
			
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
											
											$willopen = FindOpenDayDp($schedule,$tday,$hour,$min);
											$business->willopen = $willopen;
											}
										}
										else
										{
											
										//business open
										$business->open = true;
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
			                        $willopen = FindOpenDayDp($schedule,$todayid,$hour,$min);
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
								
							$willopen = FindOpenDayDp($schedule,$nextday,$hour,$min);
							$business->willopen = $willopen;
							
							}
			
						$business->schedule = null;
						unset($business->schedule);
						}
					}
			}
					/*********************************************End search restaurant show here****************************************************/
					
					//return $newbusiness;
					return $newbusiness;
			
				
?>