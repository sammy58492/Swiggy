<?php
	$link = ConnectDB();
     //check if printer selected for the business
	 
     pg_prepare($link,'psel','SELECT printer_model FROM w_business WHERE id=$1');
	 $psel = pg_execute($link,'psel',array($order->business[0]->id));
	 $psel_arr = pg_fetch_array($psel);
	 
	 $printer_model = $psel_arr[0];
	 
	 if($printer_model == 1)
         {
			  //GOODCOM printer
				//code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		
		#01*1*
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->optionsOnlytext))
		$proNO = $val->name.$val->optionsOnlytext;
		else
		$proNO = $val->name;
		
		$proPrice = $val->quantity*$val->price;
		
		
		$string_val.=$val->quantity.";".$proNO.";".$proPrice.";";
		
		
		
		#01*1*10005*1;Chiken;3.00;

	
	  $count_dish++;
			
			
		}
		
		//#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;
		
		
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$dd = date("h:i d-m-Y",strtotime($order->buyer->deliveryhours));
			$delivery_hrs = $dd.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping."*".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$prev_order.";";
		
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;cod:;";
		
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		
		}
		else if($order->business[0]->paypaladaptive==true){
			$string_val.="7;Paypaladaptive;";
		
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="7;Paypal;";
		
		}
		else if($order->business[0]->paymethod->authorize==true){
			$string_val.="6;Authorize;";
		
		}
	    else if($order->business[0]->paymethod->braintree==true){
			$string_val.="6;Braintree;";
		
		}
		else if($order->business[0]->paymethod->mercury==true){
			$string_val.="6;Mercury;";
		
		}
		else if($order->business[0]->paymethod->transactium==true){
			$string_val.="6;Transactium;";
		
		}
		
	
	#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel.";*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel.";*No Comments#";
		}
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;008612345678;*Comment#
		
		$content = $string_val;
//echo $content;exit;

        //code for printer end

		 }
		 else if($printer_model == 2)
		 {
			 //Code for old-type
			 
			 //code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->options))
		$proNO = $val->name.$val->options;
		else
		$proNO = $val->name;
		
		$proPrice = $val->quantity*$val->price;
		
		
		$append_str = "";
		if(count($order->business[0]->dishes) == $count_dish)
		$append_str = "";
		else
		$append_str = ";";
		
		$string_val.=$val->quantity.",".$proNO.",".$proPrice.$append_str;
		
	//	print_r($val->extras);
	
	$count_dish++;
			
			if(isset($val->extras))
		{
		   foreach($val->extras as $ext1)	
		   { 
		  
		        if($ext1->enabled)
			   $string_val.=$ext1->name.";;;"; 
		   }
			
		}
			
		
		if(isset($val->ingredients))
		{
		   /*foreach($val->ingredients as $ing1)	
		   {
			    if($ing1->enabled) 
			  $string_val.=$ing1->name.";;;"; 
		   }*/
			
		}	
			
			
			
			
		}
		
		
		//TIPS ADDED HERE//
		
		//$string_val=substr($string_val, 0, -1); //$string_val;
		/*$string_val.="*".$order->business[0]->shipping."*".$order->tax.";".$order->total.";4;".$order->buyer->name.";".$order->buyer->address.";".$order->buyer->deliveryhours."0000-00-00;0;";*/
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$delivery_hrs = $order->buyer->deliveryhours.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping.";".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$total_orders.";";
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;cod:;";
		
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		
		}
		else if($order->business[0]->paypaladaptive==true){
			$string_val.="7;Paypaladaptive;";
		
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="7;Paypal;";
		
		}
		else if($order->business[0]->paymethod->authorize==true){
			$string_val.="6;Authorize;";
		
		}
	    else if($order->business[0]->paymethod->braintree==true){
			$string_val.="6;Braintree;";
		
		}
		else if($order->business[0]->paymethod->mercury==true){
			$string_val.="6;Mercury;";
		
		}
		else if($order->business[0]->paymethod->transactium==true){
			$string_val.="6;Transactium;";
		
		}
		
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel."*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel."*No Comments#";
		}
		
		$content = $string_val;

			 
		 }
		 else if($printer_model == 3)
		 {
			 
			  //printer model GT6000S
				//code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		
		#01*1*
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->optionsOnlytext))
		$proNO = $val->name.$val->optionsOnlytext;
		else
		$proNO = $val->name;
		
		$proPrice = $val->quantity*$val->price;
		
		
		$string_val.=$val->quantity.";".$proNO.";".$proPrice.";";
		
		#01*1*10005*1;Chiken;3.00;

	
	  $count_dish++;
			
			
		}
		
		//#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;
		
		
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$dd = date("h:i d-m-Y",strtotime($order->buyer->deliveryhours));
			$delivery_hrs = $dd.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping."*".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$prev_order.";";
		
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;cod:;";
		
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		
		}
		else if($order->business[0]->paypaladaptive==true){
			$string_val.="7;Paypaladaptive;";
		
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="7;Paypal;";
		
		}
		else if($order->business[0]->paymethod->authorize==true){
			$string_val.="6;Authorize;";
		
		}
	    else if($order->business[0]->paymethod->braintree==true){
			$string_val.="6;Braintree;";
		
		}
		else if($order->business[0]->paymethod->mercury==true){
			$string_val.="6;Mercury;";
		
		}
		else if($order->business[0]->paymethod->transactium==true){
			$string_val.="6;Transactium;";
		
		}
		
	
	#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel.";*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel.";*No Comments#";
		}
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;008612345678;*Comment#
		
		$content = $string_val;
//echo $content;exit;

        //code for printer end

		 
			 
			 
		 }
		 else if($printer_model==4)
		 {
			  //GOODCOM printer
				//code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		
		#01*1*
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->optionsOnlytext))
		$proNO = $val->name.$val->optionsOnlytext;
		else
		$proNO = $val->name;
		
		$proPrice = $val->quantity*$val->price;
		
		
		$string_val.=$val->quantity.";".$proNO.";".$proPrice.";";
		
		
		//if comments exist
		 if($val->comments)
		 $string_val.=$val->comments.",;";
		 else
		 $string_val.=";";
		
		#01*1*10005*1;Chiken;3.00;

	
	  $count_dish++;
			
			
		}
		
		//#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;
		
		
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$dd = date("h:i d-m-Y",strtotime($order->buyer->deliveryhours));
			$delivery_hrs = $dd.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping."*".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$prev_order.";";
		
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;cod:;";
		
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		
		}
		else if($order->business[0]->paypaladaptive==true){
			$string_val.="7;Paypaladaptive;";
		
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="7;Paypal;";
		
		}
		else if($order->business[0]->paymethod->authorize==true){
			$string_val.="6;Authorize;";
		
		}
	    else if($order->business[0]->paymethod->braintree==true){
			$string_val.="6;Braintree;";
		
		}
		else if($order->business[0]->paymethod->mercury==true){
			$string_val.="6;Mercury;";
		
		}
		else if($order->business[0]->paymethod->transactium==true){
			$string_val.="6;Transactium;";
		
		}
		
	
	#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel.";*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel.";*No Comments#";
		}
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;008612345678;*Comment#
		
		$content = $string_val;
//echo $content;exit;

        //code for printer end

		 
			 } 
			 
			 
			 else if($printer_model==5)
			 {
				
			  //GT5000W printer
				//code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		
		#01*1*
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->optionsOnlytext))
		$proNO = $val->name.$val->optionsOnlytext;
		else
		$proNO = $val->name;
		
		$proPrice = $val->quantity*$val->price;
		
		
		//$string_val.=$val->quantity.";".$proNO.";".$proPrice.";";
		$string_val.=$val->quantity.";".$proNO.";".$proPrice.";";
		
		
		#01*1*10005*1;Chiken;3.00;

	
	  $count_dish++;
			
			
		}
		
		//#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;
		
		
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$dd = date("h:i d-m-Y",strtotime($order->buyer->deliveryhours));
			$delivery_hrs = $dd.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping."*".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$prev_order.";";
		
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;cod:;";
		
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		
		}
		else if($order->business[0]->paypaladaptive==true){
			$string_val.="7;Paypaladaptive;";
		
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="7;Paypal;";
		
		}
		else if($order->business[0]->paymethod->authorize==true){
			$string_val.="6;Authorize;";
		
		}
	    else if($order->business[0]->paymethod->braintree==true){
			$string_val.="6;Braintree;";
		
		}
		else if($order->business[0]->paymethod->mercury==true){
			$string_val.="6;Mercury;";
		
		}
		else if($order->business[0]->paymethod->transactium==true){
			$string_val.="6;Transactium;";
		
		}
		
	
	#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel.";*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel.";*No Comments#";
		}
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;008612345678;*Comment#
		
		$content = $string_val;
//echo $content;exit;

        //code for printer end

		  
			 }
		 
//File generate here		 
		 
	//Fetch Dynamic printer path for order business
	
		$DynamicPrinterPath =  $relative_printer_path.$folder_file_name.".txt"; //default path
	    $PathQueue = $folder_file_name;
	    //1. check main settings
		 pg_prepare($link,'sql_print',"SELECT * FROM w_printerpath");
	     $result_print = pg_execute($link,'sql_print',array());
		
		 while($array_print = pg_fetch_array($result_print))
		 {
			 $array_print_val = json_decode($array_print['printer_restaurant']);
			 
			 if((in_array(-1,$array_print_val)) || in_array($order->business[0]->id,$array_print_val))
			 { //check if assigned for all or particular business
				 
				 $DynamicPrinterPath = $relative_printer_path.$array_print['path'].".txt";
				 $PathQueue = $array_print['path'];
				 break;
			 }
			
		 }
		 
		
		//content encryption
		$content = "\xEF\xBB\xBF".$content;
		
		 
		 if(!file_exists($DynamicPrinterPath))
		 {
			 
			$fp = fopen($DynamicPrinterPath,"wb"); 
			fwrite($fp,$content);
		    fclose($fp);  
		
			 
		 }
		 else
		 {
			 if(filesize($DynamicPrinterPath)==0)
			 {
				 
				unlink($DynamicPrinterPath);
				$fp = fopen($DynamicPrinterPath, "w"); 
				
				 
			 }
			 else
			 {
				 $DynamicPrinterPath = $relative_printer_path.$PathQueue."_".$id.".txt";
				 $fp = fopen($DynamicPrinterPath, "w");
		
			 }
				 
			
			 
			 fwrite($fp,$content);
		     fclose($fp);
			 
		 } 
		 


?>