<link type='text/css' rel='stylesheet' href="../../../css/mobile-style.css"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php
session_start();
//WHEN MAIN ORDER PLACE THEN MAIL SEND TO USER,BUSINESS ADMIN
 //DO NOT REMOVE PHP TAG
//start order email
				$msg = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml">
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<title>*|MC:SUBJECT|* Order # '. $id . '</title>
				
				<style type="text/css">
				<!--
				body {
					margin:0;
				}
				.ReadMsgBody { width: 100%;}
				.ExternalClass {width: 100%;}
				-->
				</style>
				
				</head>
				
				<body style="background:#fff;">
				<div class="temp-wrapper">
				<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
			   <tr><td height="10"></td></tr>
			   <tr>
			   <td height="79">
			   <table width="100%" border="0" cellspacing="0" cellpadding="0">
			   <tr>
			   <td width="50%">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" border="0" width="100%" height=""  />';
					}
					else
					{
						 $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" border="0" width="100%" height=""  />';
					}
                   $msg .=  '</td>
			   <td height="50%" valign="middle">
			   <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
			   <tr>
			   <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/fb_m.png"  border="0" /></a></td>
			   <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/twitter_m.png"  border="0" /></a></td>
			   <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/rss_m.png"  border="0" /></a></td> 
			   </tr>
			   </table>   
			   </td>
			   </tr>
			   </table>
			   </td>
			   </tr>
			   <tr>
			   <td><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/top_m.png" width="100%" style="display:block;" align="center" border="0" /></td>
			   </tr>
			   </table>
		
				<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
				<tr>
				<td height="15"></td>
				</tr>
				<tr>
				<td align="left" style="padding:8px 50px;">
				<span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">';
				
				
		  
		 //RESERVE TEMPLATE
	
						if($order->reservestatus && $order->business[0]->dishes){	
						$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_YOUR_ORDER_AND_RESERVATION_PLACED_SUCCES'].'</em>';
						}
						if($order->reservestatus && !$order->business[0]->dishes){	
						$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_RESERVATION_HASE_BEEN_PLASSED_SUCCESS'].'</em>';
						}
						if($order->business[0]->dishes && !$order->reservestatus){  
						$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_SUCCESS'].'</em>';
						}
						 
						
						$msg .= '</span>   
						
							  </td>
							</tr>
							<tr>
							  <td align="center" style="padding:8px 50px;">
							  <span style="font-family:Georgia,Arial,sans-serif;font-size:23px;color:#df2226;"><em>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER'].' # '. $id . '</em></span>
							  </td>
							</tr>
							<tr>
							  <td align="center" style="padding:15px;">';
							  
					if($order->reservestatus && $order->business[0]->dishes){	
					$msg .= '<a href="http://'.$_SERVER["HTTP_HOST"].'"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/track_or_res.png" border="0" /></a> ';
					}
					if($order->reservestatus && !$order->business[0]->dishes){	
					$msg .= '<a href="http://'.$_SERVER["HTTP_HOST"].'"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/track_res.png" border="0" /></a> ';
					}
					if($order->business[0]->dishes && !$order->reservestatus){  
					$msg .= '<a href="http://'.$_SERVER["HTTP_HOST"].'"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/track_btn_m.png" border="0" /></a> ';
					}
							  
							  $msg .= '</td>
							</td></tr>
						</table>
						<tr>
						</table>';
						
							if($order->reservestatus){
						
					$msg .='<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD">
					  <tr><td>
					<table width="100%" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="4" bgcolor="#F7F7F7">
					  <tr><th style="border:0px solid #e2dbdb;" colspan="5"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;"><em>'.$lang_resource['ORDER_MAIL_DETAILS'].'</em></span></th></tr>
					  <tr>
						<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="160">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_DESCRIPTION'].'</th>
						<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="400">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</th>
					  </tr>
					  <tr>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['FRONT_VISUALS_NAME'].'</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->reserve->name) . '</td>
					  </tr>
					  <tr>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['FRONT_VISUALS_EMAIL'].'</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. strtolower($order->reserve->email) . '</td>
					  </tr>
					   <tr>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['FRONT_MAIN_EMAIL_PHONE'].'</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->reserve->tel) . '</td>
					  </tr>
					  </table>
					</td></tr></table>';
					
					
						$reservequery = 'SELECT * from w_reserve WHERE  business=$1';
						pg_prepare($link,'sqlr2',$reservequery);
						$reserverecord = pg_execute($link,'sqlr2',array($order->business[0]->id));
					
						$reserves = array();
						
						while($row = pg_fetch_array($reserverecord)){
						
										unset($reserve);
										$reserve->id = $row['id'];
										$reserve->rtype = $row['rtype'];
												
										$reserve->guest = $row['guest'];
										$reserve->name = $row['name'];
										
										array_push($reserves,$reserve);
									
						}
					
					
					
										$msg .= '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
										<table width="100%" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
										<tr>';
										if(sizeof($order->reserveQty->Table) != 0)
											$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="160">'.$lang_resource['FRONT_RESERVATION_TABLE'].'</th>';
											if(sizeof($order->reserveQty->Room) != 0)
											$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['FRONT_RESERVATION_ROOM'].'</th>';
											if(sizeof($order->reserveQty->Free) != 0)
											$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['FRONT_RESERVATION_FREE'].'</th>';
										  $msg .= '</tr><tr>';
										
										if(sizeof($order->reserveQty->Table) != 0){
										$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" valign="top">';
										foreach ($reserves as $a){
										
										if($a->rtype == 1){
												$msg .= '<h2 style="margin:10px 0 0 0px; color:#da251d; font-size:14px; font-weight:400; clear: both;">'.$a->name.'</h2>';
										
										$msg .= '<div style="width:135px; height:auto; float:left; border:1px solid #da251d; background:#fff; border-radius:5px; margin:7px 0px 0px 0px;">';
											$countg = $a->guest;
											for($countr =1; $countr<=$countg; $countr++){
											if(in_array($a->id.'_'.$countr,$order->reserveQty->Table)){
										$msg .= '<div style="width:27px; float:left; margin:3px 2px 3px 2px;"><button style="border-radius:3px; width:27px; height:18px; float:left; border:none; margin:0px 0px 0px 0px; cursor:pointer; background:#dedede;"></button></div>';
											}else{
										$msg .= '<div style="width:27px; float:left; margin:3px 2px 3px 2px;"><button style="border-radius:3px; width:27px; height:18px; float:left; background:#91d547; border:none; margin:0px 0px 0px 0px; cursor:pointer;"></button></div>';
											}
											
											}
										$msg .= '</div>';
										}
										}
										$msg .= '</td>';
										}
					
					
					if(sizeof($order->reserveQty->Room) != 0){
					$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" valign="top">';
					foreach ($reserves as $a){
					if($a->rtype == 2){
						$msg .= '<h2 style="margin:10px 0 0 0px; color:#da251d; font-size:14px; font-weight:400; clear: both;">'.$a->name.'</h2>';
					$msg .= '<div style="width:135px; height:auto; float:left; border:1px solid #da251d; background:#fff; border-radius:5px; margin:7px 0px 0px 0px;">';
						$countg = $a->guest;
						for($countr =1; $countr<=$countg; $countr++){
							if(in_array($a->id.'_'.$countr,$order->reserveQty->Room)){
						$msg .= '<div style="width:27px; float:left; margin:3px 2px 3px 2px;"><button style="border-radius:3px; width:27px; height:18px; float:left; border:none; margin:0px 0px 0px 0px; cursor:pointer; background:#dedede;"></button></div>';
							}else{
						$msg .= '<div style="width:27px; float:left; margin:3px 2px 3px 2px;"><button style="border-radius:3px; width:27px; height:18px; float:left; background:#91d547; border:none; margin:0px 0px 0px 0px; cursor:pointer;"></button></div>';
							}
						
						}
					
					
					$msg .= '</div>';
					}
					}
					
					$msg .= '</td>';
					}
					
					if(sizeof($order->reserveQty->Free) != 0){
					$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" valign="top">';
					foreach ($reserves as $a){
						if($a->rtype == 3){
						$msg .= '<br><h2 style="margin:10px 0 0 0px; color:#da251d; font-size:14px; font-weight:400; clear: both;">'.$a->name.'</h2>';
					
					$msg .= '<div style="width:135px; height:auto; float:left; border:1px solid #da251d; background:#fff; border-radius:5px; margin:7px 0px 0px 0px;">';
						$countg = $a->guest;
						for($countr =1; $countr<=$countg; $countr++){
						if(in_array($a->id.'_'.$countr,$order->reserveQty->Free)){
					$msg .= '<div style="width:27px; float:left; margin:3px 2px 3px 2px;"><button style="border-radius:3px; width:27px; height:18px; float:left; border:none; margin:0px 0px 0px 0px; cursor:pointer; background:#dedede;"></button></div>';
						}else{
					$msg .= '<div style="width:27px; float:left; margin:3px 2px 3px 2px;"><button style="border-radius:3px; width:27px; height:18px; float:left; background:#91d547; border:none; margin:0px 0px 0px 0px; cursor:pointer;"></button></div>';
						}
						
						}
					
					
					$msg .= '</div>';
					}
					}
					$msg .= '</td>';
					}
									
					$msg .= '</tr></table></td></tr></table>';
					
					
					
					
					$msg .= '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
					<table width="100%" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
					<tr>';
					if(sizeof($order->reserveQty->Table) != 0)
						$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="160">'.$lang_resource['FRONT_RESERVATION_TABLE'].'</th>';
						if(sizeof($order->reserveQty->Room) != 0)
						$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['FRONT_RESERVATION_ROOM'].'</th>';
						if(sizeof($order->reserveQty->Free) != 0)
						$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['FRONT_RESERVATION_FREE'].'</th>';
						$msg .= '<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</th>
						<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</th>
					  </tr>';



					pg_prepare($link,'sqlRTitle','SELECT name FROM w_reserve WHERE id =$1');
					//print_r($order->reserveQty);
					if($order->reserveQty) {
						foreach($order->reserveQty as $name_room=>$key)
						{
								$r=0;
								$t=0;
								$f=0;
							if($name_room == "Room") {
				
							 foreach($key as $room) {
									
									$room_data = explode("_",$room);
									
									$resultTileroom = pg_execute($link,'sqlRTitle',array($room_data[0]));
									
									$titleroom = pg_fetch_array($resultTileroom);
									
									
									
									$order->reserveQty->Room[$r] = $titleroom['name']."_".$room_data[1];
									
									$r++;
									}
							}
							if($name_room == "Table") {
				
								foreach($key as $table) {
									
									$table_data = explode("_",$table);
									
									$resultTiletable = pg_execute($link,'sqlRTitle',array($table_data[0]));
									
									$titletable = pg_fetch_array($resultTiletable);
									
									
									$order->reserveQty->Table[$t] = $titletable['name']."_".$table_data[1];
									
									$t++;
									}
							
							}
							if($name_room == "Free") {
				
									foreach($key as $free) {
									
									$free_data = explode("_",$free);
									
									$resultTilefree = pg_execute($link,'sqlRTitle',array($free_data[0]));
									
									$titlefree = pg_fetch_array($resultTilefree);
									
									$order->reserveQty->Free[$f] = $titlefree['name']."_".$free_data[1];
									
									$f++;
									}
							}
						}
					}
	

				pg_prepare($link,'sqlroom','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resultroom = pg_execute($link,'sqlroom',array(2,$order->business[0]->id));
				$rowroom = pg_fetch_array($resultroom);
				
				$order->roomprice = $rowroom['price'];		
				
				pg_prepare($link,'sqltable','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resulttable = pg_execute($link,'sqltable',array(1,$order->business[0]->id));
				$rowtable = pg_fetch_array($resulttable);
				
				$order->tableprice = $rowtable['price'];		
			
				pg_prepare($link,'sqlfree','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resultfree = pg_execute($link,'sqlfree',array(3,$order->business[0]->id));
				$rowfree = pg_fetch_array($resultfree);
				
				$order->freeprice = $rowfree['price'];		


				$msg .= '<tr>';
				
				if(sizeof($order->reserveQty->Table) != 0)
				$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . implode(", ",$order->reserveQty->Table). '</td>';
				
				if(sizeof($order->reserveQty->Room) != 0)
				$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . implode(", ",$order->reserveQty->Room). '</td>';
				
				if(sizeof($order->reserveQty->Free) != 0)
				$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . implode(", ",$order->reserveQty->Free) . '</td>';
				
				$msg .= '<td align="center" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">';
				if(sizeof($order->reserveQty->Table) != 0)
				$msg .= '<span>Table  </span><span>'.sizeof($order->reserveQty->Table).'</span><span>  X  </span><span>'.$order->tableprice.'</span><br>';
				if(sizeof($order->reserveQty->Room) != 0)
				$msg .= '<span>Room  </span><span>'.sizeof($order->reserveQty->Room).'</span><span>  X  </span><span>'.$order->roomprice.'</span><br>';
				if(sizeof($order->reserveQty->Free) != 0)
				$msg .= '<span>Free  </span><span>'.sizeof($order->reserveQty->Free).'</span><span>  X  </span><span>'.$order->freeprice.'</span><br>';
				$msg .= '</td>';
				
				$tableprice = sizeof($order->reserveQty->Table) * $order->tableprice ;
				$roomprice = sizeof($order->reserveQty->Room) * $order->roomprice ;
				$freeprice = sizeof($order->reserveQty->Free) * $order->freeprice ;
				
				$msg .= '<td align="center" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">';
				if($tableprice != 0)
				$msg .= '<span>'.$tableprice.'</span><br>';
				if($roomprice != 0)
				$msg .= '<span>'.$roomprice.'</span><br>';
				if($freeprice != 0)
				$msg .= '<span>'.$freeprice.'</span><br>';
				$msg .= '</td>';
				
				$msg .= '</tr>';
				
				$msg .= '<tr><td align="center">Total :</td><td colspan="4" align="right"style="font-weight:bold;font-size:16">'.$order->reserveFee.'</td></tr>';
				
				
				$msg .= '</table></td></tr></tbody></table>';

}


//RESERVE TEMPLATE END



	if($order->business[0]->dishes){
				$msg .='<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD">
				  <tr><td>
				<table width="100%" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="4" bgcolor="#F7F7F7">
				  <tr><th style="border:0px solid #e2dbdb;" colspan="5"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;"><em>'.$lang_resource['ORDER_MAIL_DETAILS'].'</em></span></th></tr>
				  <tr>
					<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="160">'.$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'].'</th>
					<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="400">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</th>
				  </tr>
				  <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->buyer->name) . '</td>
				  </tr>
				  <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['LOGIN_CREATE_EMAIL'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. strtolower($order->buyer->email) . '</td>
				  </tr>
				   <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->buyer->address) . '</td>
				  </tr>
				   <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['Referenece_V2'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->buyer->colony) . '</td>
				  </tr>
				   <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['Phone_V2'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $order->buyer->tel . '</td>
				  </tr>
				   <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['EXPORT_CITY'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $order->buyer->cityname . '</td>
				  </tr>
				   <tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['PAYPAL_REFERENCE'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $order->buyer->reference . '</td>
				  </tr>';
					if($order->preorder=='true'){
				  $msg .= '<tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_TYPE'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><strong>'.$lang_resource['FRONT_MAIN_EMAIL_PREORDER'].'</strong></td>
					</tr><tr>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['FRONT_MAIN_EMAIL_PREORDER_DATE_TIME'].'</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><strong>'.date('Y-m-d',$order->preorderDate/1000).'  '.$order->preordertimehh.':'.$order->preordertimemm.'</strong></td>
					</tr>';
					}
					$msg .= '</table>
				</td></tr></table>';
								
									
								$twilio_phone;
								$twilio_enabled;
								$twilio_order = "";
								foreach ($order->business as $business)
									{
									$twilio_phone = $business->twiliophone;
									$twilio_enabled = $business->twilioenabled;
									pg_query($link, "DEALLOCATE ALL");
									pg_prepare($link,'sql4'.$business->id,'SELECT buys from w_business WHERE id=$1');
									$result2 = pg_execute($link,'sql4'.$business->id,array($business->id));
									if (pg_num_rows($result2)==1)  
										while($row2 = pg_fetch_array($result2))
											{
											pg_prepare($link,'sqls'.$business->id,'UPDATE w_business SET buys=$2 WHERE id=$1');
											pg_execute($link,'sqls'.$business->id,array($business->id,intval($row2['buys'])+1));
											}
				
									if (!empty($business->email) && $business->email!='null')
										array_push($emails,$business->email);
				
									$total = 0;
				
									$msg .= '
				<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
				<table width="100%" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
				  <tr><th style="border:1px solid #e2dbdb;" colspan="5" textcolor="#df2226"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;">' . $business->name . '- Tele: ' . $business->tel . ' </span></th></tr>
									  </table></table>';
									$paymethod = '';
									
				
									if (empty($pid))
										{
										if($order->business[0]->paymethod->paypaladaptive == 1)
										{
						               $paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPALADAPTIVE'];
										}
										else if ($business->paymethod->cash==true) {
											
											$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
										}
										else if ($business->paymethod->authorizednet==true) {
											   if ($paymethod=='')
												
												$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_AUTHORISENET'];
												
										}
										else if ($business->paymethod->braintree==true) {
											   if ($paymethod=='')
												
												$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_BRAINTREE'];
												
										}
										else if ($business->paymethod->cardsave==true) {
											   if ($paymethod=='')
												
												$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CARDSAVE'];
												
										}
				
										else if ($business->paymethod->card==true) {
											   if ($paymethod=='')
												
												$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
												else
												$paymethod .= ' '.$lang_resource['FRONT_MAIN_EMAIL_AND_CARD'];;
										}
										}
										
										else
										{
										
										$paymethod = 'Error validating payment by Paypal (' . $pid . ')';							
										pg_prepare($link,'sqlpaycheck','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
										$result3 = pg_execute($link,'sqlpaycheck',array($pid));
				
										if (pg_num_rows($result3)==1)  						
											while($row3 = pg_fetch_array($result3))
												{
												$paymethod = 'Paid Via Paypal (' . $pid . ')';
											
												pg_prepare($link,'sqlpayupdate','UPDATE w_paypal_payments SET taken=true WHERE itemid=$1');
												pg_execute($link,'sqlpayupdate',array($pid));
												}
				
										}
				
				
				
				$msg .= '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
				<table width="100%" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
				<tr>
					<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="160">'.$lang_resource['FRONT_MAIN_EMAIL_ITEMS'].'</th>
					<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100" colspan="2">'.$lang_resource['FRONT_MAIN_EMAIL_OPTIONS'].'</th>
					
					<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['FRONT_MAIN_EMAIL_COMMENT'].'</th>
					<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'.$lang_resource['FRONT_MAIN_EMAIL_RATE'].'</th>
				  </tr>';

					foreach ($business->dishes as $dish)
						{
					
						$msg .= '<tr>';
						$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->name . '</td>';

						
						$con = array();
						
						
						
						$con = array();
						$msg .= '<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->options ;
						$msg .= '</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . ucfirst(strtolower($dish->comments)) . '</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->total . '</td>
						</tr>';
						$total = $total + $dish->total;
						}
						if($order->buyer->taxtype == 1)
						{
					$total = $total + $business->shipping + $order->tax;
					$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'];
						} 
						else
						{
					$total = $total + $business->shipping;
					$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'];
						}
						
						
						
					$taxpercentage = GetDecimalPoint($order->buyer->tax);
					$tipsprice = GetDecimalPoint($order->buyer->tips);
					
					if ($order->buyer->tips > 0)
					{
					$total = $total	+ $order->buyer->tips;
					}
					
					$total = GetDecimalPoint($total);
						
						$deltype = $order->buyer->deliveryType;
				
					//business shipping and comment info
					if ($business->shipping=='0.00')
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];
						else
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];

					$msg .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $shippingcaption . '</td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right">'. ucfirst(strtolower($order->buyer->comments)) . '</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $business->shipping . '</td></tr>';
					
					/*discount code section */
					if(isset($order->discountcategory))
					{
						if($order->discounttype == 1)
						$discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ." (" .$order->discountrate ."%)";
						else if($order->discounttype == 2)
						$discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ;
						
						$total = $total - $order->discountprice;
					    $total = GetDecimalPoint($total);
						
						
						$msg .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $discountcaption . '<br/> <span style="font-size:11px;font-weight:bold">'. ucfirst(strtolower($order->discountcomments)) . '</span></td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $order->discountprice . '</td></tr>';
					
					}
					
					/*discount code section */
					if ($order->tax > 0)
				{
					$msg .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['Tax_V2'].' ('. $taxpercentage .'%)<br/> <span style="font-size:11px;font-weight:bold">'. ucfirst(strtolower($taxstring)) . '</span></td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $order->tax . '</td></tr>';
				}
					
				if ($order->buyer->tips > 0)
				{
					$msg .='<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['SHOPPING_FOURTH_TIP'].'</td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $tipsprice . '</td></tr>';
				}	
					
					

				$msg .= '<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="2">&nbsp;</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			  </tr>
			
				 <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right" colspan="4"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px; padding-left: 74px;">Total</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px;color:#df2226;">' .$total. '</span></td>
			  </tr>
			</table>
			</td></tr></table>';

			$msg .= '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tbody><tr><td>
			<table width="100%" style="border:0px solid #e2dbdb" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
				<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>'.$lang_resource['FRONT_MAIN_PAYMENT_METHOD'].' '. $paymethod . '</td>
			  </tr>
			   <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em> '.$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'].' : '. $deltype . '</td>
			  </tr>
			  <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>'.$lang_resource['FRONT_MAIN_ANY_CHANGES_WITH'].'<span style="font-family:Arial,Georgia,sans-serif;color:#df2226;">'.$lang_resource['FRONT_MAIN_CONTACT_RESTAURENT'].' '. $business->name . '-(Tele: ' . $business->tel . ').</em></span></td>
			  </tr>
				</table>
			  </td>
			  </tr>
			  </tbody>
			  </table>';
			}
			}
			
			$msg .= '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			<table height="50" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
			<tr>
			<td width="110">
				   <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
			<td>
			<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
			  <tr>
				<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/fb_m.png"  border="0" /></a></td>
				<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/twitter_m.png"  border="0" /></a></td>
				<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/rss_m.png"  border="0" /></a></td>
			  </tr>
			</table>
			</td>
			
			<td>
			<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
			  <tr>
				<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/apple_m.png"  border="0" /></a></td>
				<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/android_m.png"  border="0" /></a></td>
				<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/mobile_m.png"   border="0" /></a></td>
			  </tr>
			</table>
			 </td>
			</tr>
			<tr>
				<td colspan="4" height="1" bgcolor="#C0C5C6"></td>
			</tr>
			<tr>
				<td colspan="4" height="1" bgcolor="#fffff"></td>
			</tr>
			</table>
			</td></tr></table>
			
			   <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			   <table width="100%" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="">
				  <tr>        
					 <td width="381">
						<table width="100%" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
						   <tr>
							  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_ABOUT_US'].'</strong></span></td>
						   </tr>
						   <tr>
							  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FRONT_MAIN_CONTACT_US'].'</strong></span></td>
						   </tr>
						   <tr>
							  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FRONT_MAIN_BLOG'].'</strong></span></td>
						   </tr>
						</table>        
					 </td>
					 <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/logo.png" width="100" border="0" /></td>
				 </tr>
			   </table>
			   </td></tr></table>
			
			</div><!--temp-wrapper-->
				
				<table width="100%" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
				 <tr><td height="15"></td></tr>
			
				 <tr>
				 <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
					<span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>  
				 </td>
				 </tr>
				</table>';
					
	

	
	
				$msg .= '</td></tr></tbody></table></td></tr></tbody></table></center>
				
				</body></html>';
//end order email


?>