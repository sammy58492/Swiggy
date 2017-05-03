<?php
require('front-main.php');
/*EXAMPLE USE: 
[{"operation":"FetchAllFranchisesData"},{"operation":"FetchAllUsersData","filters":[{"name":"level","operator":"=","value":"2"}]}]
*/
// echo "sd";
// die;
session_start();
session_write_close();//inthis file we only read session data...

$bulk = parse($_POST['data']);
// echo "<pre>"; print_r($bulk);die;
unset($response);
$link = ConnectDB();

define("IS_PAYPAL_ENABLED", 1);

foreach ($bulk as $data)
	{
	switch ($data->operation)
		{
		case 'FetchUserInfo':
		if ($_SESSION['auth'] == 'yes')
			$response->user = FetchUserInfo($_SESSION['user']->id,$link);
		break;
		case 'FetchAllFranchisesData':
			$response->franchises = FetchAllFranchisesData($data->filters,$link);
		break;
		case 'FetchAllCountriesData':
			$response->countries = FetchAllCountriesData($link);
		break;
		case 'FetchWhereAmIData':
			$response->whereami = GetWhereAmIData();
		break;
		case 'FetchAllBusinessData':
			$response->business = FetchAllBusinessData($link,$data->location,$data->filters);
		break;
		case 'FetchAllCategories':
			$response->categories = FetchAllCategories($link);
		break;
		case 'FetchBusinessMenu':
			$response->menu = FetchBusinessMenu($data->businessid,$link);
		break;
		case 'FetchAdData':
			$response->ad = FetchAdData($data->lastad,$data->cityid,$link);
		break;
		case 'FetchRecentActivityData':
			$response->recent = FetchRecentActivityData($link);
		break;
		case 'FetchMostPopularsData':
			$response->populars = FetchMostPopularsData($link);
		break;
		case 'FetchMyOrders':
			$response->orders = FetchMyOrders($link);
		break;
		case 'FetchOrderData':
			$response->order = FetchOrderData($data->id,$link);
		break;
		case 'DiscountOffer':
				$response->offer = DiscountOffer($data->businessid,$link);
		break;
		case 'CheckPaypalPayment':
			if(IS_PAYPAL_ENABLED == 1)
				$response->payment = CheckPaypalPayment($data->id,$link);
		break;
    case 'GetReviewData':
			if(IS_PAYPAL_ENABLED == 1)
				$response->review = GetReviewData($data->businessid,$link);
		break;
		}
	}

pg_close($link);
echo json_encode($response);

/********************************************FUNCTIONS*****************************************/
function GetReviewData($id,$link)
{
     $query = 'SELECT AVG(quality) as quality,AVG(delivery) as delivery,AVG(dealer) as dealer,AVG(package) as package, count(*) as rating FROM w_review WHERE id_w_business=$1 ' ;
      pg_prepare($link,'',$query);
    	$result3 = pg_execute($link,'',array($id));
      $review = array();
      while($row = pg_fetch_array($result3))
		  {
      
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


function FetchAllCountriesData($link)
	{
	pg_prepare($link,'sql0','SELECT * FROM w_countries');
	$result = pg_execute($link,'sql0',array());

	$countries = array();
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}

	return $countries;
	}


function FetchUserInfo($user,$link)
	{
	pg_prepare($link,'sql','SELECT * from w_users WHERE id=$1');
	$result = pg_execute($link,'sql',array($user));

	unset($user);
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			$user->id = $row['id'];
			$user->name = $row['name'];
			$user->lastname = $row['lastname'];
			$user->lastname2 = $row['lastname2'];
			$user->email = $row['email'];
			$user->street = $row['street'];
			$user->colony = $row['colony'];
			$user->cp = $row['cp'];
			$user->country = $row['country'];
			$user->city = $row['city'];
			$user->tel = $row['tel'];
			$user->cel = $row['cel'];
			$user->job = $row['job'];
			$user->location = $row['location'];
			$user->level = $row['level'];
			$user->findfrom = $row['findfrom'];
			$user->levelname = GetLevelText($user->level);
			}
		
	return $user;
	}



function FetchAllFranchisesData($filters,$link)
	{
	$conditionalsvalues = array();
	$query = 'SELECT w_franchises.id,w_franchises.city,w_franchises.email,w_franchises.ga,w_franchises.currency,w_franchises.tax,w_franchises.taxtype FROM w_franchises WHERE w_franchises.enabled=true';

	if (!empty($filters))	
		{
		$conditionals = ' AND ';
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
	//echo '$conditionalsvalues: ';print_r($conditionalsvalues);
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);

	$franchises = array();
	while($row = pg_fetch_array($result))
		{
		unset($franchise);
		unset($admin);
		$franchise->id = $row['id'];
		$franchise->city = $row['city'];
		$franchise->email = $row['email'];
		$franchise->ga = $row['ga'];
		$franchise->currency = $row['currency'];
		$franchise->tax = $row['tax'];
		$franchise->taxtype = $row['taxtype'];
		array_push($franchises,$franchise);
		}

	return $franchises;
	}


function GetWhereAmIData()
	{
	return $_SESSION['whereami'];
	}


function FetchAllBusinessData($link,$location,$filters)
	{
	$conditionalsvalues = array();
	$query = 'SELECT * from w_business WHERE enabled=true';

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
	
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$conditionalsvalues);
	
	$allbusiness = array();
	while($row = pg_fetch_array($result))
		{
		unset($business);

		$business->id = $row['id'];
		$business->name = $row['name'];
		$business->street = $row['street'];
		$business->colony = $row['colony'];
		$business->cp = $row['cp'];
		$business->tel = $row['tel'];
		$business->cel = $row['cel'];
		$business->email = $row['email'];
		if(IS_PAYPAL_ENABLED == 1)
			$business->paypal = $row['paypal'];
		$business->schedule = $row['schedule'];
		$business->categories = $row['categories'];
		$business->location = $row['location'];
		$business->city = $row['city'];
		$business->zones = $row['zones'];		
		$business->enabled = $row['enabled'];		
		$business->acceptcard = $row['acceptcard'];	
		$business->acceptcash = $row['acceptcash'];	
		$business->minimum = $row['minimum'];	
		$business->twiliophone = $row['twiliophone'];	
		$business->twilioenabled = strtolower($row['twilioenabled']) == "t";
		$business->review = GetReviewData($row['id'], $link);
		$business->clientkey = $row['clientkey'];
		$business->isimg = $row['isimg'];
		$business->secretkey = $row['secretkey'];
		array_push($allbusiness,$business);
		}


	//if we got the users location means we need to only return the business that can deliver to him
	if (!empty($location))
		{
		$location = parse($location);
		$newbusiness = array();
	      $like = '"-1"';
         /* $querys = 'SELECT * from w_deliveryzone WHERE enabled=true';
		  pg_prepare($link,'sqldz2',$querys);
	      $result = pg_execute($link,'sqldz2',array());
		  $count = pg_num_rows($result);
		  
		  $AlllocationArea = array();
		  
		  while($loc = pg_fetch_array($result))
				 {
				 unset($locationArea);
				 $locationArea->position = $loc['location'];
				 $locationArea->business = $loc['business'];
				 $locationArea->deliveryprice = $loc['deliveryprice'];
				 array_push($AlllocationArea,$locationArea);
				 }*/
		  
		foreach($allbusiness as $business)
			{
			$zones = parse($business->zones);
              if ($location->zoom == 1001) {
						$business->shipping = 0;
						unset($business->zones);
						unset($business->location);
						unset($business->enabled);
						array_push($newbusiness,$business);
						
					}
					
					
				
						
			else if (PointInArea($location->latitud,$location->longitud,$zones->zone1->coordinates))
				{
				$business->shipping = $zones->zone1->price;
				unset($business->zones);
				unset($business->location);
				unset($business->enabled);
				array_push($newbusiness,$business);
				}
				else
				if (PointInArea($location->latitud,$location->longitud,$zones->zone2->coordinates))
					{
					
					$business->shipping = $zones->zone2->price;
					unset($business->zones);
					unset($business->location);
					unset($business->enabled);
					array_push($newbusiness,$business);
					}
					else
					if (PointInArea($location->latitud,$location->longitud,$zones->zone3->coordinates))
						{
						
						$business->shipping = $zones->zone3->price;
						unset($business->zones);
						unset($business->location);
						unset($business->enabled);
						array_push($newbusiness,$business);
						}
				
			}


		//check for the business schedule and configure it...
		//echo 'son las ' . GetTimeByZone($_SESSION['timezone']) . ' ';			
		$now = strtotime(GetTimeByZone($_SESSION['timezone']));
		$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
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
					if ($now>=strtotime($schedule->sdays->{$todayid}->opens->hour.':'.$schedule->sdays->{$todayid}->opens->minute))
						{
							if($schedule->sdays->{$todayid}->closes->hour< 24) {
												
											$newScedule = strtotime($schedule->sdays->{$todayid}->closes->hour.':'.$schedule->sdays->{$todayid}->closes->minute);
											}
											else
											{
												if($schedule->sdays->{$todayid}->closes->hour== 24)
												{
												$newScedule = strtotime("00:".$schedule->sdays->{$todayid}->closes->minute." +1 day");
												}
												else if($schedule->sdays->{$todayid}->closes->hour == 25) {
												$newScedule = strtotime("01:".$schedule->sdays->{$todayid}->closes->minute." +1 day");	
												}
												else if($schedule->sdays->{$todayid}->closes->hour == 26) {
													
												$newScedule = strtotime("02:".$schedule->sdays->{$todayid}->closes->minute." +1 day");	
												}
												else if($schedule->sdays->{$todayid}->closes->hour == 27) {
												$newScedule = strtotime("03:".$schedule->sdays->{$todayid}->closes->minute." +1 day");	
												}
												else if($schedule->sdays->{$todayid}->closes->hour== 28) {
												$newScedule = strtotime("04:".$schedule->sdays->{$todayid}->closes->minute." +1 day");	
												}
											}
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
								
								$business->willopen = 'until ' . $hour . ':' . $min;
								}
							}
							else
							{
							//business open
							$business->open = true;
							}
						}
						else
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

						$business->willopen = 'until ' . $hour. ':' . $min;
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

				$business->willopen = 'until ' . $ndays[$nextday] . '  ' . $hour . ':' . $min;
				}

			$business->schedule = null;
			unset($business->schedule);
			}
		}

	return $newbusiness;
	}


function FetchAllCategories($link)
	{
	pg_prepare($link,'sql3','SELECT * from w_categories');
	$result = pg_execute($link,'sql3',array());

	$categories = array();
	while($row = pg_fetch_array($result))
		{
		unset($category);
		$category->id = $row['id'];
		$category->name = $row['name'];
		array_push($categories,$category);
		}

	return $categories;
	}



function FetchBusinessMenu($businessid,$link)
	{
	$days = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
	$todayid = $days->{date("D",strtotime(date('d-m-Y')))};
	unset($response);
	$dishesids = array();
	$dishes = array();
	$extras = array();


	//get the dishes
	pg_prepare($link,'sql','SELECT * FROM w_menus WHERE business=$1 and enabled=true');
	$result = pg_execute($link,'sql',array($businessid));
	while($row = pg_fetch_array($result))
		foreach (parse($row['days']) as $day)
			if ($day==$todayid || $day=='0')//day 0 its the "all" days flag
				{
				//now check the menu schedule to see if it matches our time of the day...
				$now = strtotime(GetTimeByZone($_SESSION['timezone']));
				$schedule = parse($row['schedule']);
				if ($now>=strtotime($schedule->opens->hour.':'.$schedule->opens->minute))//menu opened now check if its not closed
					if ($now<strtotime($schedule->closes->hour.':'.$schedule->closes->minute))//ok
						foreach (parse($row['dishes']) as $dishid)
							array_push($dishesids,$dishid);
				}
	
	$dishesids = ArrayUnique($dishesids);


	//get the dishes info
	$extrasids = array();
	foreach ($dishesids as $dishid)
		{
		//pg_prepare($link,'sqld'.$dishid,'SELECT name,description,ingredients,price,category,extras FROM w_dishes WHERE id=$1 and enabled=true');
		pg_prepare($link,'sqld'.$dishid,'SELECT w_dishes.name,w_dishes.description,w_dishes.ingredients,w_dishes.price,w_dishes.category,w_dishes.extras,w_dishes.isimg,w_dishes.isimg2,w_dishes.isimg3,w_categories.name AS cname FROM w_dishes INNER JOIN w_categories ON   w_dishes.id=$1 AND w_dishes.category = w_categories.id AND w_dishes.enabled=true');
		
		$result = pg_execute($link,'sqld'.$dishid,array($dishid));
		while($row = pg_fetch_array($result))
			{
			unset($dish);
			$dish->id = $dishid;
			$dish->name = $row['name'];
			$dish->ingredients = $row['ingredients'];
			$dish->price = $row['price'];
			$dish->extras = $row['extras'];
			$dish->category = $row['category'];
			$dish->catname = $row['cname'];
			$dish->isimg = $row['isimg'];
			$dish->isimg2 = $row['isimg2'];
			$dish->isimg3 = $row['isimg3'];
			$dish->description = $row['description'];
			$jextras = parse($dish->extras);
			if (count($jextras)>0)
				foreach ($jextras as $extraid)
					array_push($extrasids,$extraid);
			array_push($dishes,$dish);
			}
		}

	$extrasids = ArrayUnique($extrasids);

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


function FetchAdData($lastad,$cityid,$link)
	{
	$query = 'SELECT id,type,time,link FROM w_ads WHERE enabled=true AND city=$1 OR enabled=true AND city=$2';
	pg_prepare($link,'sql4',$query);

	if (empty($cityid))//if we dont get city, means the user just arrived to the page and we dont know where he is
		//so we send him ads with the -1(all citys) and -2 (generic location)
		$result = pg_execute($link,'sql4',array(-1,-2));
		else//if we do specify a city we sent to the user the -1(all citys) and the ones on his city
		$result = pg_execute($link,'sql4',array(-1,$cityid));

	$ads = array();
	$individualcount = 0;
	while($row = pg_fetch_array($result))
		{
		unset($ad);
		$ad->id = $row['id'];
		$ad->type = $row['type'];
		$ad->link = $row['link'];
		$ad->time = $row['time'];
		if ($ad->type=='1')
			$individualcount++;
		array_push($ads,$ad);
		}
	
	$totalads = count($ads);

	if ($totalads<2)
		{
		if (empty($cityid))
			{
			if ($lastad!='-1')
				return;//if we have 1 or less to show,just return empty... cause theres no rotation...
			}
			else
			if ($totalads==0)
				{
				//if we are here means or that we have the city but no results for it or 1
				$query = 'SELECT id,type,link,time FROM w_ads WHERE enabled=true AND city=$1';
				pg_prepare($link,'sql5',$query);
				$result = pg_execute($link,'sql5',array(-2));
				$ads = array();
				$individualcount = 0;
				while($row = pg_fetch_array($result))
					{
					unset($ad);
					$ad->id = $row['id'];
					$ad->type = $row['type'];
					$ad->link = $row['link'];
					$ad->time = $row['time'];
					if ($ad->type=='1')
						$individualcount++;
					array_push($ads,$ad);
					}
						
				$totalads = count($ads);
				if ($totalads<2 && $lastad!='-1')
					return;//nothing to do here...
				}
		}

	do
		{
    	$pickad = rand(0,$totalads-1);
    	shuffle($ads);
    	$ad = $ads[$pickad];
		}
	while ($ad->id==$lastad);


	if ($ad->type=='1')//small ads have a default timing and need to be send 2 
		{
		$ad->time = '20';//in case of not setted...
		pg_prepare($link,'sql6','SELECT value FROM w_configs WHERE name=$1');
		$result = pg_execute($link,'sql6',array('splitedadtime'));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				$ad->time = $row['value'];

		$firstid = $ad->id;
		$firstlink = $ad->link;

		if ($individualcount>2)
			{
			do
				{
		    	$pickad = rand(0,$totalads-1);
		    	shuffle($ads);
		    	$ad2 = $ads[$pickad];
				}
			while ($ad2->id==$firstid || $ad2->type=='0' || $ad2->id==$lastad);
			}
			else
			if ($individualcount>1)
				{
				do
					{
			    	$pickad = rand(0,$totalads-1);
			    	shuffle($ads);
			    	$ad2 = $ads[$pickad];
					}
				while ($ad2->id==$firstid || $ad2->type=='0');
				}

		unset($ad->id);
		$ad->firstid = $firstid;
		$ad->firstlink = $firstlink;
		$ad->secondid = $ad2->id; 
		$ad->secondlink = $ad2->link; 
		}

	return $ad;
	}


function FetchRecentActivityData($link)
	{
	pg_prepare($link,'sql6','SELECT recentdata FROM w_orders ORDER BY id DESC 
LIMIT 10');
	$result = pg_execute($link,'sql6',array());

	$activities = array();
	while($row = pg_fetch_array($result))
		array_push($activities,parse($row['recentdata']));
		
	return $activities;
	}

function FetchMostPopularsData($link)
	{
	pg_prepare($link,'sql7','SELECT id FROM w_business ORDER BY buys DESC 
LIMIT 6');
	$result = pg_execute($link,'sql7',array());

	$populars = array();
	while($row = pg_fetch_array($result))
		array_push($populars,$row['id']);
		
	return $populars;
	}



function FetchMyOrders($link)
	{
	pg_prepare($link,'sql8','SELECT id,date,data,status FROM w_orders WHERE usr=$1 ORDER BY id DESC');
	$result = pg_execute($link,'sql8',array($_SESSION['user']->id));

	$orders = array();
	while($row = pg_fetch_array($result))
		{
		unset($order);
		$order->id = $row['id'];
		$date = explode(':',$row['date']);
		$order->date = $date[0] . ':' . $date[1];
		$order->status = $row['status'];
		$data = parse($row['data']);
		$order->cityid = $data->buyer->city;
		$order->city = $data->buyer->cityname;
		
		switch ($order->status)
			{
			case '0':
				$order->statustext = $lang_resource['ORDER_PENDING'];
			break;
			case '1':
				$order->statustext = $lang_resource['ORDER_COMPLETED'];
			break;
			case '2':
				$order->statustext = $lang_resource['ORDER_CANCELLED'];
			break;
			}
		array_push($orders,$order);
		}

	return $orders;
	}



function FetchOrderData($id,$link)
	{
	pg_prepare($link,'sql1','SELECT usr,data,comment,date,status FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql1',array($id));
	unset($order);

	while($row = pg_fetch_array($result))
		{
		//check if he owns this order
		if ($row['usr']==$_SESSION['user']->id || $row['usr']==-1)
			{
			$data = parse($row['data']);
			if ($row['usr']==-1)
				{
				$data->buyer->email = ProtectEmail($data->buyer->email);
				$data->buyer->name = '';
				$data->buyer->tel = '';
				$data->buyer->address = '';
				}
			$order->id = $id;
			$order->data = json_encode($data);
			$order->date = $row['date'];
			$order->usr = $row['usr'];
			$order->comment = $row['comment'];
			switch ($row['status'])
				{
				case '0':
					$order->status = $lang_resource['ORDER_PENDING'];
				break;
				case '1':
					$order->status = $lang_resource['ORDER_COMPLETED'];
				break;
				case '2':
					$order->status = $lang_resource['ORDER_CANCELLED'];
				break;
				}
			}
		}
	return $order;
	}

function CheckPaypalPayment($id,$link)
	{
	pg_prepare($link,'sql9','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
	$result = pg_execute($link,'sql9',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			return 'ok';
	}
	function DiscountOffer($id,$link)
	{
	$conditionalsvalues = array();
	$date = date('Y-m-d');
	$query = 'SELECT * FROM w_discountoffer WHERE business = $1 AND accept=$2 AND startdate <=$3 AND enddate>=$3 ORDER BY id DESC LIMIT 1';
	pg_prepare($link,'sql5',$query);
	$result = pg_execute($link,'sql5',array($id,'TRUE',$date));

	$offers = array();
	while($row = pg_fetch_array($result))
		{
		
		unset($offer);
		
		$offer->type = $row['discountype'];
		$offer->rate = $row['rate'];
		$offer->minshop = $row['minshop'];
		array_push($offers,$offer);
		
		}

	return $offers;
	}
?>
