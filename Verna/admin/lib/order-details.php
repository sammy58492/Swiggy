<?  require("../config.php");
	$total_price =0;
	$comission =0;
	$total_trunover =0;
	
	

	function parseCus($str,$old=false)
		{
		if ($old)
			return json_decode($str);//php 5.1
		return json_decode(stripslashes($str));//php 5.2 and forward
		}
	/*****************************************************	comission part****************************************************************/
    $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	
	if ($_SESSION['user']->level=='1')//get all franchises from which the admin is admin
		{
		$citys = array();
		pg_prepare($link,'sqlu1','SELECT id FROM w_franchises WHERE admin=$1');
		$result = pg_execute($link,'sqlu1',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result))
			{
			array_push($citys,$row['id']);
			}
		}
	else if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sqlu1','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sqlu1',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
			}
	
	        pg_prepare($link,'sqlc3','SELECT * FROM w_configs WHERE name=$1 ');
			$comResult = pg_execute($link,'sqlc3',array("commision"));
			 $comResultFetch = pg_fetch_array($comResult);
			if($comResultFetch['value']=="")
				$comResultFetch['value']=0;
				
				/*pg_prepare($link,'sqldd','SELECT * from w_configs WHERE name=$1');
				$resultd = pg_execute($link,'sqldd',array('currency'));
				
				$rowd = pg_fetch_array($resultd);		
				$currency= $rowd['value'];	*/
				
				
			
	        pg_prepare($link,'sql2','SELECT * FROM w_orders ');
			
			$orderResult = pg_execute($link,'sql2',array());
			
			/*while($totalcal = pg_fetch_array($orderResult)) { 
		    $total_orders = pg_num_rows($orderResult);
			}*/
			$total_orders = 0;
			
			while($order = pg_fetch_array($orderResult))
			{
				$conti = false;
			unset($data);	
			$data = parseCus($order['data']);
			 if($_SESSION['user']->level==1) {
				  
				  
			   foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$conti = true;
						break;
						}
			  }
			  if($_SESSION['user']->level==2) {
				  if($businesss!="") {
			   	foreach ($businesss as $business){
					if($data->business !=""){
						foreach ($data->business as $databusiness)
							if ($databusiness->id==$business)
								$conti = true;
						}
						}
								
				  }
			  }
			  if($_SESSION['user']->level==0) {
				  $conti = true;
			  }
			
				if($conti == true) { 
					$total_orders = $total_orders+1;
					if($order['status']==1){
						$total_price = $total_price + $data->total;
					}
						$total_trunover = $total_trunover + $data->total;
				}
			}
	
	   $comission = ($total_price*$comResultFetch['value'])/100;
	   /*****************************************************	comission part****************************************************************/
		date_default_timezone_set('Europe/London');
	    $currentDate = date('d');
	    $currentMonth= date('m');   
	    $currentYear= date('Y');   

        // $currentdate = date('l F d,Y'); 
        $day_lang = date('l');
		$month_lang = date('m');
		
        if($day_lang=="Monday")
		$day_lang_print = 'Monday';
		if($day_lang=="Tuesday")
		$day_lang_print = 'Tuesday';
		if($day_lang=="Wednesday")
		$day_lang_print = 'Wednesday';
		if($day_lang=="Thursday")
		$day_lang_print = 'Thursday';
		if($day_lang=="Friday")
		$day_lang_print = 'Friday';
		if($day_lang=="Saturday")
		$day_lang_print = 'Saturday';
		if($day_lang=="Sunday")
		$day_lang_print = 'Sunday';
		
		
		if($month_lang=="01")
		$month_lang_print = 'January';
		if($month_lang=="02")
		$month_lang_print = 'February';
		if($month_lang=="03")
		$month_lang_print = 'March';
		if($month_lang=="04")
		$month_lang_print = 'April';
		if($month_lang=="05")
		$month_lang_print = 'May';
		if($month_lang=="06")
		$month_lang_print = 'June';
		if($month_lang=="07")
		$month_lang_print = 'July';
		if($month_lang=="08")
		$month_lang_print = 'August';
		if($month_lang=="09")
		$month_lang_print = 'September';
		if($month_lang=="10")
		$month_lang_print = 'October';
		if($month_lang=="11")
		$month_lang_print = 'November';
		if($month_lang=="12")
		$month_lang_print = 'December';
		
		
		$currentdate = $day_lang_print." ".$month_lang_print." ".date('d').",".date('Y');
		
		//$currentdate = $month_lang;
	 
	if($_SESSION['user']->level==0) {
	  /**********************************for today calculation**************************************************************/	   
	      
		   
		    pg_prepare($link,'sqlo1','SELECT * FROM w_orders WHERE DATE(date) = DATE(NOW()) ');
		    $orderInDayResult = pg_execute($link,'sqlo1',array());
		     $total_orders_inday = pg_num_rows($orderInDayResult); //total
			 $today_completed_order =0;
			 $today_pending_order =0;
			 $today_cancelled_order =0;
			 $today_price =0;
			
			 
			
		   while($today = pg_fetch_array($orderInDayResult))
		   {
			   $data = parseCus($today['data']);
			   if($data->total!="NaN")
			   {
			   $today_price = $today_price + $data->total;
			   }
			   if($today['status'] == 0) //pending
			   {
				   $today_pending_order =  $today_pending_order+1;
				}
			  else if($today['status'] == 1) //completed
			   {
				   $today_completed_order =  $today_completed_order+1;
				}
			else if($today['status'] == 2) //canceled
			   {
				   $today_cancelled_order =  $today_cancelled_order+1;
				}
				
		    }
	/*for today calculation*/	   
	
	  /**********************************for month calculation**************************************************************/	   
	     
		   
          

		    pg_prepare($link,'sqlo2','SELECT * FROM w_orders WHERE date > CURRENT_DATE-30 AND DATE(date) <= CURRENT_DATE');
		    $orderInMonthResult = pg_execute($link,'sqlo2',array());
		     $month_orders_inday = pg_num_rows($orderInMonthResult); //month
			 $month_completed_order =0;
			 $month_pending_order =0;
			 $month_cancelled_order =0;
			 $month_price =0;
			$monthText = date('F,Y');
			 
			// $currentdate = date('l F d,Y');
		   while($month = pg_fetch_array($orderInMonthResult))
		   {
			   $data = parseCus($month['data']);
			   
			    if($data->total!="NaN")
			   {
			   $month_price = $month_price + $data->total;
			   }
			 
			   
			   if($month['status'] == 0) //pending
			   {
				   $month_pending_order =  $month_pending_order+1;
				}
			  else if($month['status'] == 1) //completed
			   {
				   $month_completed_order =  $month_completed_order+1;
				}
			else if($month['status'] == 2) //canceled
			   {
				   $month_cancelled_order =  $month_cancelled_order+1;
				}
				
		    }
	  /**********************************for month calculation**************************************************************/	 
	  
	  
	  /**********************************for Year calculation**************************************************************/	   
	     
		   


		        pg_prepare($link,'sqlo3','SELECT * FROM w_orders WHERE date > CURRENT_DATE-365 AND DATE(date) <= CURRENT_DATE');
		    $orderInYearResult = pg_execute($link,'sqlo3',array());
		    $year_orders_inday = pg_num_rows($orderInYearResult); //month
			 $year_completed_order =0;
			 $year_pending_order =0;
			 $year_cancelled_order =0;
			 $year_price =0;
			$yearText = "Year ".date('Y');
			 
			// $currentdate = date('l F d,Y');
		   while($year = pg_fetch_array($orderInYearResult))
		   {
			   $data = parseCus($year['data']);
			   
			    if($data->total!="NaN")
			   {
			   $year_price = $year_price + $data->total;
			   }
			 
			   
			   if($year['status'] == 0) //pending
			   {
				   $year_pending_order =  $year_pending_order +1;
				}
			  else if($year['status'] == 1) //completed
			   {
				   $year_completed_order =  $year_completed_order+1;
				}
			else if($year['status'] == 2) //canceled
			   {
				   $year_cancelled_order =  $year_cancelled_order+1;
				}
				
		    }
	  /**********************************for Year calculation**************************************************************/	   
	  
	  
	   /**********************************for week calculation**************************************************************/	   
	     
		   


		        pg_prepare($link,'sqlo4','SELECT * FROM w_orders WHERE date > CURRENT_DATE-6 AND DATE(date) <= CURRENT_DATE');
		    $orderInWeekResult = pg_execute($link,'sqlo4',array());
		     $week_orders_inday = pg_num_rows($orderInWeekResult); //month
			 $week_completed_order =0;
			 $week_pending_order =0;
			 $week_cancelled_order =0;
			 $week_price =0;
			
			 
			// $currentdate = date('l F d,Y');
		   while($week = pg_fetch_array($orderInWeekResult))
		   {
			   $data = parseCus($week['data']);
			   
			    if($data->total!="NaN")
			   {
			   $week_price = $week_price + $data->total;
			   }
			 
			   
			   if($week['status'] == 0) //pending
			   {
				   $week_pending_order =  $week_pending_order+1;
				}
			  else if($week['status'] == 1) //completed
			   {
				   $week_completed_order =  $week_completed_order+1;
				}
			else if($week['status'] == 2) //canceled
			   {
				   $week_cancelled_order =  $week_cancelled_order+1;
				}
				
		    }
	  /**********************************for week calculation**************************************************************/	   
	}  //super admin part 
	
	if($_SESSION['user']->level==1 ||  $_SESSION['user']->level==2) {
		
	
	  /**********************************for today calculation**************************************************************/	   
	      
		   
		    pg_prepare($link,'sqlo1','SELECT * FROM w_orders WHERE DATE(date) = DATE(NOW()) ');
		    $orderInDayResult1 = pg_execute($link,'sqlo1',array());
		    //$total_orders_inday = pg_num_rows($orderInDayResult1); //total
			$total_orders_inday =0;
			 $today_completed_order =0;
			 $today_pending_order =0;
			 $today_cancelled_order =0;
			 $today_price =0;
			
			 
			 //$currentdate = date('l F d,Y');
		   while($today = pg_fetch_array($orderInDayResult1))
		   {
			  
			   $continue = false;
			   $data = parseCus($today['data']);
			  if($_SESSION['user']->level==1) {
				  
				  
			   foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$continue = true;
						break;
						}
			  }

			if($_SESSION['user']->level==2) {
				if($businesss!="") {
			   		foreach ($businesss as $business){
						if($data->business !=""){
							foreach ($data->business as $databusiness)
								if ($databusiness->id==$business)
									$continue = true;
						}
					}
				}
			}  
			    
			  if ($continue==true) {
			   
			   $total_orders_inday = $total_orders_inday +1;
			   if($data->total!="NaN")
			   {
			   $today_price = $today_price + $data->total;
			   }
			   if($today['status'] == 0) //pending
			   {
				   $today_pending_order =  $today_pending_order+1;
				}
			  else if($today['status'] == 1) //completed
			   {
				   $today_completed_order =  $today_completed_order+1;
				}
			else if($today['status'] == 2) //canceled
			   {
				   $today_cancelled_order =  $today_cancelled_order+1;
				}
			  }
				
		    }
	/*for today calculation*/	   
	
	  /**********************************for month calculation**************************************************************/	   
	     
		   
          

		    pg_prepare($link,'sqlo2','SELECT * FROM w_orders WHERE date > CURRENT_DATE-30 AND DATE(date) <= CURRENT_DATE');
		    $orderInMonthResult = pg_execute($link,'sqlo2',array());
		   // echo  $month_orders_inday = pg_num_rows($orderInMonthResult); //month
			$month_orders_inday=0;
			 $month_completed_order =0;
			 $month_pending_order =0;
			 $month_cancelled_order =0;
			 $month_price =0;
			$monthText = date('F,Y');
			 
			// $currentdate = date('l F d,Y');
		   while($month = pg_fetch_array($orderInMonthResult))
		   {
			   
			  $continue = false;
			   
			 
			   
			   $data = parseCus($month['data']);
			  if($_SESSION['user']->level==1) {
			   foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$continue = true;
						break;
						}
			  }
			   
			if($_SESSION['user']->level==2) {
				if($businesss!="") {
			   		foreach ($businesss as $business){
						if($data->business !=""){
							foreach ($data->business as $databusiness)
								if ($databusiness->id==$business)
									$continue = true;
						}
					}
				}
			}
			  
			    if ($continue == true) {
					
			    if($data->total!="NaN")
			   {
			   $month_price = $month_price + $data->total;
			   }
			 
			   $month_orders_inday = $month_orders_inday+1;
			   if($month['status'] == 0) //pending
			   {
				   $month_pending_order =  $month_pending_order+1;
				}
			  else if($month['status'] == 1) //completed
			   {
				   $month_completed_order =  $month_completed_order+1;
				}
			else if($month['status'] == 2) //canceled
			   {
				   $month_cancelled_order =  $month_cancelled_order+1;
				}
				
				}
				
		    }
	  /**********************************for month calculation**************************************************************/	 
	  
	  
	  /**********************************for Year calculation**************************************************************/	   
	     
		   


		    pg_prepare($link,'sqlo3','SELECT * FROM w_orders WHERE date > CURRENT_DATE-365 AND DATE(date) <= CURRENT_DATE');
		    $orderInYearResult = pg_execute($link,'sqlo3',array());
		   // $year_orders_inday = pg_num_rows($orderInYearResult); //Year
		     $year_orders_inday = 0;
			 $year_completed_order =0;
			 $year_pending_order =0;
			 $year_cancelled_order =0;
			 $year_price =0;
			$yearText = "Year ".date('Y');
			 
			// $currentdate = date('l F d,Y');

		while($year = pg_fetch_array($orderInYearResult)){

			    $continue = false;
			   
			     
			$data = parseCus($year['data']);
			
			if($_SESSION['user']->level==1) {
			   foreach ($citys as $city)
					if ($city==$data->buyer->city){
						$continue = true;
						break;
					}
			}
			
			

			if($_SESSION['user']->level==2) {
				if($businesss!="") {
			   		foreach ($businesss as $business){
						if($data->business !=""){
							foreach ($data->business as $databusiness)
								if ($databusiness->id==$business)
									$continue = true;
						}
					}
				}
			}
			
			
			if ($continue == true) {
				$year_orders_inday = $year_orders_inday +1;

			    if($data->total!="NaN"){
			    	$year_price = $year_price + $data->total;
			    }
			    if($year['status'] == 0) {//pending
			    	$year_pending_order =  $year_pending_order +1;
			    }
			  	else if($year['status'] == 1) {//completed
			  		$year_completed_order =  $year_completed_order+1;
				}
				else if($year['status'] == 2) {//canceled
			   		$year_cancelled_order =  $year_cancelled_order+1;
				}
			}
				
		}

	  /**********************************for Year calculation**************************************************************/	   
	  
	  
	   /**********************************for week calculation**************************************************************/	   
	     
		   


		        pg_prepare($link,'sqlo4','SELECT * FROM w_orders WHERE date > CURRENT_DATE-6 AND DATE(date) <= CURRENT_DATE');
		    $orderInWeekResult = pg_execute($link,'sqlo4',array());
		    // $week_orders_inday = pg_num_rows($orderInWeekResult); //month
			$week_orders_inday=0;
			 $week_completed_order =0;
			 $week_pending_order =0;
			 $week_cancelled_order =0;
			 $week_price =0;
			
			 
			// $currentdate = date('l F d,Y');
		   while($week = pg_fetch_array($orderInWeekResult))
		   {
			   $continue = false;
			   $data = parseCus($week['data']);
			     
			  
			  if($_SESSION['user']->level==1) {
				    if($citys!="") {
			   foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$continue = true;
						break;
						}
				  }
			  }

			if($_SESSION['user']->level==2) {
				if($businesss!="") {
			   		foreach ($businesss as $business){
						if($data->business !=""){
							foreach ($data->business as $databusiness)
								if ($databusiness->id==$business)
									$continue = true;
						}
					}
				}
			}
			    if ($continue==true) {
			   
			    if($data->total!="NaN")
			   {
			   $week_price = $week_price + $data->total;
			   }
			 
			   $week_orders_inday=$week_orders_inday+1;
			   
			   if($week['status'] == 0) //pending
			   {
				   $week_pending_order =  $week_pending_order+1;
				}
			  else if($week['status'] == 1) //completed
			   {
				   $week_completed_order =  $week_completed_order+1;
				}
			else if($week['status'] == 2) //canceled
			   {
				   $week_cancelled_order =  $week_cancelled_order+1;
				}
				}
				
		    }
	  /**********************************for week calculation**************************************************************/	   
	}//admin part
	   
	 
?>
