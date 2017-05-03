<?
    
       pg_prepare($link,'sqlcf3','SELECT * from w_configs ');
       $configResult = pg_execute($link,'sqlcf3',array());
       while($conf = pg_fetch_array($configResult))
               {

                $name = $conf['name'];
                $setting[$name] = $conf['value'];
       
               }
			   
			   if($setting['BRING_PERMISSION_TYPE'] == 'true'){
					$test = "true";
					$bringg_token  = $setting['BRIMG_ACCESS_TOKEN_LIVE'];
					$bringg_secret  = $setting['BRIMG_SECRET_KEY_LIVE'];
					$bringg_company_id  = $setting['BRINGG_COMPANY_ID_LIVE'];
					$bringg_company_name  = $setting['BRINGG_COMPANY_NAME_LIVE'];
					
					} else {
					$test = "false";
					$bringg_token  = $setting['BRIMG_ACCESS_TOKEN_TEST'];
					$bringg_secret  = $setting['BRIMG_SECRET_KEY_TEST'];
					$bringg_company_id  = $setting['BRINGG_COMPANY_ID_TEST'];
					$bringg_company_name  = $setting['BRINGG_COMPANY_NAME_TEST'];
					
					
					
				
				   }
				   
				   
				   	
				 
			   if($order->buyer->country !="") {
			    pg_prepare($link,'sqlcn12','SELECT * from w_countries WHERE id=$1');
		        $cn_result = pg_execute($link,'sqlcn12',array($order->buyer->country));
				$cn_result_rec = pg_fetch_array($cn_result);
				}
				
				 $user_address = "";
				 $user_address .= $order->buyer->address;
				 $user_address .= ",".$order->buyer->colony.",".$order->buyer->cityname;
				 if($cn_result_rec['name']) {
				 $user_address .= ",".$cn_result_rec['name'];
				 }
				 $user_possion = get_lat_long($user_address);
				//echo $setting['BRINGG_COMPANY_ID'];
				
				
				/*********************************************Customer********************************************************/	
				pg_prepare($link,'sqlbi33','SELECT * from w_business WHERE id=$1');
		        $b_result = pg_execute($link,'sqlbi33',array($order->business[0]->id));
				$cur_record = pg_fetch_array($b_result);
				
				pg_prepare($link,'sqlCity3','SELECT city from w_franchises WHERE id=$1');
				$resultcity = pg_execute($link,'sqlCity3',array($cur_record['city']));
				$getcity = pg_fetch_array($resultcity);
				
				pg_prepare($link,'sqlCon3','SELECT name from w_countries WHERE id=$1');
				$resultcountry = pg_execute($link,'sqlCon3',array($cur_record['country']));
				$getcountry = pg_fetch_array($resultcountry);
					
				
				
				$cur_record_location = parse($cur_record['location']);
				
				
				
				 $restaurant_address = $cur_record['street'].",".$cur_record['colony'].",".$cur_record['cp'].",".$getcity['city'].",".$getcountry['name'];
				 
				/*********************************************customers********************************************************/
			
			   $url = 'http://api.bringg.com/partner_api/customers';
               
				$data_string_bus = array(
						 'name' => $cur_record['name'],
						 'company_id' => $bringg_company_id,
						 'address' => $restaurant_address,
						 'phone' =>  $cur_record['cel'],
						 'lat' => $cur_record_location->latitud,
				         'lng' => $cur_record_location->longitud,
						'access_token' =>  $bringg_token,
						'timestamp' => date('Y-m-d H:i:s')
						);
						
				$secret_key = $bringg_secret;
				
				$signatures = hash_hmac("sha1", http_build_query($data_string_bus), $secret_key);
                $data_string_bus["signature"] = $signatures;
					
					
					$content = json_encode($data_string_bus);
				    $ch=curl_init($url);
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
					curl_setopt($ch, CURLOPT_HEADER, false);
					curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json','Content-Length: ' . strlen($content)));
					
					curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
					
					$json_response_business = curl_exec($ch);
					
					//$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
					
					curl_close($ch);
					
					$return_datas_business = json_decode($json_response_business);
					//echo "1";
					
					
					//print_r($return_datas_business);
				 $customer_business_id  = $return_datas_business->customer->id;
					
					 
					 
					/*********************************************customers********************************************************/
					
					 
				/*********************************************customers********************************************************/
			
			   $url2 = 'http://api.bringg.com/partner_api/customers';
               
				$data_string_customer = array(
						'name' => $order->buyer->name,
						'company_id' => $bringg_company_id,
						'address' => $user_address,
						'phone' => $order->buyer->tel,
						'email' => $order->buyer->email,
						'lat' => $user_possion['lat'],
						'lng' => $user_possion['long'],
						'access_token' =>  $bringg_token,
						'timestamp' => date('Y-m-d H:i:s')
						);
						
				$secret_key = $bringg_secret;
				
				$signatures = hash_hmac("sha1", http_build_query($data_string_customer), $secret_key);
                $data_string_customer["signature"] = $signatures;
					
					//print("this is the data string: ");
					
					
					$content = json_encode($data_string_customer);
					
					//print("The content: " + $content);
					// $data_string = json_encode($data);
					$ch=curl_init($url2);
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
					curl_setopt($ch, CURLOPT_HEADER, false);
					curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json','Content-Length: ' . strlen($content)));
					
					curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
					
					$json_response = curl_exec($ch);
					
					//$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
					
					curl_close($ch);
					
					$return_datas = json_decode($json_response);
					
					//echo "2";
					//print_r($return_datas);
					
				  $customer_id  = $return_datas->customer->id;
					
					 
					/*********************************************customers********************************************************/
					
					if(isset($customer_id) && trim($return_datas->customer->address) != trim($user_address)  ) {
						
		/*********************************************customers********************************************************/					
						$urls = 'http://developer-api.bringg.com/partner_api/customers/'.$customer_id;

						$data_string = array(
						'company_id' => $bringg_company_id,
						'name' => $order->buyer->name,
						'address' => $user_address,
						'phone' => $order->buyer->tel,
						'email' => $order->buyer->email,
						'lat' => $user_possion['lat'],
						'lng' => $user_possion['long'],
						'access_token' =>  $bringg_token,
						'timestamp' => date('Y-m-d H:i:s')
						);
						$secret_key = $bringg_secret;
						
						$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
						
						$data_string["signature"] = $signature;
	
						$content = json_encode($data_string);
			
						$ch=curl_init($urls);
						curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
						curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
						curl_setopt($ch, CURLOPT_HEADER, false);
						curl_setopt($ch, CURLOPT_HTTPHEADER,
						array('Content-Type:application/json',
						'Content-Length: ' . strlen($content))
						);
						
						//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
						
						$json_response = curl_exec($ch);
						
						$status = curl_getinfo($ch);
						
						curl_close($ch);
						$return_datas = json_decode($json_response);			
						
					//print_r($return_datas);
						
				/*********************************************TASK CURL********************************************************/			
						
						}
				
				
				
				
				
				if($customer_business_id) {
			
			/*********************************************TASK CURL********************************************************/	
						$order_text = " << :: ORDER DETAILS :: >>";
					$order_text .= "Restaurent Name =".$order->business[0]->name." >> ";                                  
					
					$particular_business = $order->business[0];
					
							foreach ($particular_business->dishes as $dish) {
								$order_text .= $dish->quantity." X ".$dish->name;
								if($dish->options) {
								$order_text .="[Options ->".$dish->optionsOnlytext."]";	
									}
								if($dish->comments)
								 $order_text .= " [comments -> ".$dish->comments."] ";
								 
								 $order_text .= "=".$dish->total.",";
				
								
							}
					$order_text .= "Tax =".$order->tax.",";  		
					$order_text .= " << Total Amount =".$order->total.">> "; 
					$order_text .= "Delivary Date =".$order->buyer->deliverydate.""; 
					if($order->buyer->deliveryhours)
					$order_text .= ",Delivary time =".$order->buyer->deliveryhours.":".$order->buyer->deliveryminute; 
					if($order->buyer->comments)
					$order_text .= ", Buyer Comments =". $order->buyer->comments;
					
					
					$noteHistory[] = array($lang_resource['bringg_Item'],$lang_resource['bringg_Comment'],$lang_resource['bringg_Options'],$lang_resource['bringg_Price']);
	
	
							foreach ($particular_business->dishes as $dish) {
							
							$noteHistory[] = array($dish->name,$dish->quantity,$dish->optionsOnlytext,$dish->total);
							
							}
							
							$noteHistory[] = array($lang_resource['bringg_Delivery_charge'],'-',$order->buyer->comments,$order->business[0]->shipping);
							if($order->buyer->taxtype == 1){
							$noteHistory[] = array($lang_resource['bringg_Delivery_taxtype'],'-','-',$order->business[0]->tax);
							}
							if($order->buyer->tips){
							$noteHistory[] = array($lang_resource['bringg_Delivery_Tips'],'-','-',$order->buyer->tips);
							}
							$noteHistory[] = array($lang_resource['bringg_Delivery_Total'],'-','-',$order->total);
							
					if($order->business[0]->paymethod->cash == true || $order->business[0]->paymethod->cash == "true" ) {
				            $cash_amount = $order->total;
					}
					else {
						      $cash_amount = 0;
						}				
					
			
			$url = 'http://api.bringg.com/partner_api/tasks';
			   if($order->buyer->deliverydate == "ASAP"){
			
			
		date_default_timezone_set("America/Tegucigalpa");
		$driver_time =  date("h:i:s");
		//$driver_delivery_time = strtotime("15 min", strtotime($driver_time));
		$driver_delivery_time = strtotime($setting['SET_DRIVER_DELIVERY_TIME']." min", strtotime($driver_time));
		$datetime = date("Y-m-d H:i:s",$driver_delivery_time);
		//echo 'Current Time : '.$datetime;
		$given = new DateTime($datetime);
	//	echo "Get time format with Timezone : ".$given->format("Y-m-d H:i:s e"); 
		
		$given->setTimezone(new DateTimeZone("UTC"));
	//	echo "Time in UTC : ".$given->format("Y-m-d H:i:s e");
		$p = $given->format("Y-m-d H:i:s e"); 
		$deliverDate = $given->format("Y-m-d");
		$deliverhour = $given->format("H:i:s.u");
		$totalDeliveryhour = $deliverDate."T".$deliverhour."Z";
		//echo " Delivery time for Current order : ".$totalDeliveryhour;
		}
		else {
			//echo "Enter in Preorder Time";
				$order->buyer->deliverydate;
				$order->preordertimehh;
				$order->preordertimemm ;
				If($deliveryminute==0)
				{
					$deliveryminute='00';
				}
				else
				{
					$deliveryminute = $order->buyer->deliveryminute;
				}
			$driver_time = $order->buyer->deliverydate.' '.$order->preordertimehh.':'.$order->preordertimemm;
			//echo "Preorder Current time: ".$driver_time.'   ';
			//$driver_delivery_time = strtotime("15 min", strtotime($driver_time));
		$driver_delivery_time = strtotime($setting['SET_DRIVER_DELIVERY_TIME']." min", strtotime($driver_time));
		$datetime = date("Y-m-d H:i:s",$driver_delivery_time);
		//echo"Add after 15 min the time is: ".$datetime. ' ';
		$given = new DateTime($datetime);
		//echo "Get time format with Timezone : ".$given->format("Y-m-d H:i:s e"); 
		$given->setTimezone(new DateTimeZone("UTC"));
		//echo "Time in UTC : ".$given->format("Y-m-d H:i:s e");
		$p = $given->format("Y-m-d H:i:s e"); 
		$deliverDate = $given->format("Y-m-d");
		$deliverhour = $given->format("H:i:s.u");
		$totalDeliveryhour = $deliverDate."T".$deliverhour."Z";
		///echo " Delivery time for pre order : ".$totalDeliveryhour;
		
			}
				
				$data_string = array(
				'customer_id' => $customer_business_id,
				'company_id' => $bringg_company_id,
				'title' => "ORDER-".$id,
				'note' => $order_text,
				'scheduled_at' => $totalDeliveryhour,
				'lat' => $cur_record_location->latitud,
				'lng' => $cur_record_location->longitud,
				'address' => $restaurant_address,
				'total_price' =>  $order->total,
				'left_to_be_paid' =>  $cash_amount,
				'shipping' => $order->business[0]->shipping,
				 'User-Agent' => "OOS",
				'Client' => "OOS",
				'Client-Version' => "4.10",
				'access_token' =>  $bringg_token,
				'timestamp' => date('Y-m-d H:i:s')
				);
				$secret_key = $bringg_secret;
				
				$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
				


					$data_string["signature"] = $signature;
					
					$content = json_encode($data_string);
					
					$ch=curl_init($url);
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
					curl_setopt($ch, CURLOPT_HEADER, false);
					curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json','Content-Length: ' . strlen($content)));
					
					curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
					
					$json_response = curl_exec($ch);
					
					curl_close($ch);
					
					$return_data = json_decode($json_response);
					
					/*echo "4";
					print_r($return_data);*/
				  /**************************************Update customer task******************************************************/		
				if($return_data->task->id) {	
			      //  echo $return_data->task->id;	
					$urltw ='http://developer-api.bringg.com/partner_api/tasks/'.$return_data->task->id.'/way_points';
					if($order->buyer->deliverydate == "ASAP"){
		date_default_timezone_set("America/Tegucigalpa");
		$cus_del_time= date("h:i:s");
		$driver_delivery_time_cus = strtotime($setting['SET_DRIVER_DELIVERY_TIME']." min", strtotime($cus_del_time));
		
		$datetime_cus = date("Y-m-d H:i:s",$driver_delivery_time_cus);
		//echo "After Add 15 min : ".$datetime;
		
		$given_cus = new DateTime($datetime_cus);
		//echo "Get time format with Timezone : ".$given->format("Y-m-d H:i:s e"); 
		
		$given_cus->setTimezone(new DateTimeZone("UTC"));
		//echo "Time in UTC : ".$given->format("Y-m-d H:i:s e");
		$p = $given_cus->format("Y-m-d H:i:s e"); 
		

		$deliverDateOfUser = $given_cus->format("Y-m-d");
		$deliverhourOfUser = $given_cus->format("H:i:s.u");
		
		$Customer_del_time = $deliverDateOfUser."T".$deliverhourOfUser."Z";
		}
		else {
			
			
			//echo "Enter in Preorder Time";
				$order->buyer->deliverydate;
				$order->preordertimehh;
				$order->preordertimemm ;
				If($deliveryminute==0)
				{
					$deliveryminute='00';
				}
				else
				{
					$deliveryminute = $order->buyer->deliveryminute;
				}
			$cus_del_time = $order->buyer->deliverydate.' '.$order->preordertimehh.':'.$order->preordertimemm;
			//echo "Preorder Current time: ".$driver_time.'   ';
			//$driver_delivery_time = strtotime("15 min", strtotime($driver_time));
		$driver_delivery_time_cus = strtotime($setting['SET_DRIVER_DELIVERY_TIME']." min", strtotime($cus_del_time));
		$datetime_cus = date("Y-m-d H:i:s",$driver_delivery_time_cus);
		//echo"Add after 15 min the time is: ".$datetime. ' ';
		$given_cus = new DateTime($datetime_cus);
		//echo "Get time format with Timezone : ".$given->format("Y-m-d H:i:s e"); 
		
		$given_cus->setTimezone(new DateTimeZone("UTC"));
		//echo "Time in UTC : ".$given->format("Y-m-d H:i:s e");
		$p = $given_cus->format("Y-m-d H:i:s e"); 
		$deliverDateOfUser = $given_cus->format("Y-m-d");
		$deliverhourOfUser = $given_cus->format("H:i:s.u");
		$Customer_del_time = $deliverDateOfUser."T".$deliverhourOfUser."Z";
		//echo " Delivery time for pre order : ".$totalDeliveryhour;
				
			}
 				 
							$data_string = array(
							'company_id' => $bringg_company_id,
							'customer_id' => $customer_id,
							'scheduled_at' => $Customer_del_time,
							'address' => $user_address,
							'lat' => $user_possion['lat'],
							'lng' => $user_possion['long'],
							'access_token' => $bringg_token,
							'timestamp' => date('Y-m-d H:i:s')
							);
							$secret_key = $bringg_secret;
							
							$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
							$data_string["signature"] = $signature;
							$content = json_encode($data_string);
						
							$ch=curl_init($urltw);
							curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
							curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
							curl_setopt($ch, CURLOPT_POST, true);
							curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
							curl_setopt($ch, CURLOPT_HEADER, false);
					curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json','Content-Length: ' . strlen($content)));
							
							$json_responses = curl_exec($ch);
							curl_close($ch);
												
							$way_point_data = json_decode($json_responses);
							
							
/*****************************************	for Notes *****************************************************************/						
    $urlnote = 'http://developer-api.bringg.com/partner_api/tasks/'.$return_data->task->id.'/way_points/'.$way_point_data->way_point->id.'/notes';		
	
	
	$noteHistory = json_encode($noteHistory);		
				
	$data_stringnotes = array(
	'company_id' => $bringg_company_id,
	'note' => $noteHistory,
	'type' =>  1,
	'access_token' => $bringg_token,
	'timestamp' => date('Y-m-d H:i:s')
	);
	$secret_key = $bringg_secret;
	
	// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
	$signature = hash_hmac("sha1", http_build_query($data_stringnotes), $secret_key);
	
	//print("The signature: " + $signature);
	
	$data_stringnotes["signature"] = $signature;
	
	 $contentnotes = json_encode($data_stringnotes);
	
	//print("The content: " + $content);
	// $data_string = json_encode($data);
	$ch=curl_init($urlnote);
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $contentnotes);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json','Content-Length: ' . strlen($contentnotes)));
	
	
	
	
	$json_response_notes = curl_exec($ch);
	
						//$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	
	curl_close($ch);
	
	$return_data_notes = json_decode($json_response_notes);			
	/*echo "5";
	print_r($return_data_notes);		*/				
	/*****************************************	for Notes *****************************************************************/					
				}
					  /************************************************************************************************************************/	
					  /*echo "<pre>";
					  print_r($return_data->task) ;
					  
				      echo $return_data->task->customer->id;*/
				pg_prepare($link,'sqlos1','UPDATE w_orders SET bringg_order_id=$1, bringg_customer_id=$2, bringg_company_id=$4 ,bringg_access_token=$5,bringg_secret_token=$6 WHERE id=$3');
				pg_execute($link,'sqlos1',array($return_data->task->id,$return_data->task->customer->id,$id,$bringg_company_id,$bringg_token,$bringg_secret));
			
		 
				}

?>