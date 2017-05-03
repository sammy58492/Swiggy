<?php
session_start();
 pg_query($link, "DEALLOCATE ALL");
		pg_prepare($link,'sqlfb','SELECT value FROM w_configs where name=$1');
		$resultfb = pg_execute($link,'sqlfb',array('facebooklink'));
		$rowfb = pg_fetch_array($resultfb);
		$fblink = $rowfb['value'];
		
		pg_prepare($link,'sqltw','SELECT value FROM w_configs where name=$1');
		$resulttw = pg_execute($link,'sqltw',array('twitterlink'));
		$rowtw = pg_fetch_array($resulttw);
		$twlink = $rowtw['value'];

		pg_prepare($link,'sqlrss','SELECT value FROM w_configs where name=$1');
		$resultrss = pg_execute($link,'sqlrss',array('rsslink'));
		$rowrss = pg_fetch_array($resultrss);
		$rsslink = $rowrss['value'];
		
		pg_prepare($link,'sqlgpluslink','SELECT value FROM w_configs where name=$1');
		$resultrss1 = pg_execute($link,'sqlgpluslink',array('gpluslink'));
		$rowrss1 = pg_fetch_array($resultrss1);
		$gpluslink = $rowrss1['value'];

		
		pg_prepare($link,'linkendinlink','SELECT value FROM w_configs where name=$1');
		$resultrss2 = pg_execute($link,'linkendinlink',array('linkendinlink'));
		$rowrss2 = pg_fetch_array($resultrss2);
		$linkendinlink = $rowrss2['value'];
		
		

		pg_prepare($link,'instagramlink','SELECT value FROM w_configs where name=$1');
		$resultrss3 = pg_execute($link,'instagramlink',array('instagramlink'));
		$rowrss3 = pg_fetch_array($resultrss3);
		$instagramlink = $rowrss3['value'];
		
		
		
		 pg_prepare($link,'sql5b','SELECT currency from w_business WHERE id=$1');
     $result23b = pg_execute($link,'sql5b',array($bus_id));
     $row23b = pg_fetch_array($result23b);
	 $sitecurrency = currency_symbol($row23b['currency']);						 
	 /*function currency_symbol($sitecurrency){
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
	return '﷼';			
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
	
}*/


$msgDriver ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>*|MC:SUBJECT|*</title>
			
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
			<body>
			<table width="570" border="0"  cellpadding="0" cellspacing="0" style="margin:0 auto;">
			   <tr><td height="10"></td></tr>
			   <tr><td width="50%">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msgDriver .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" border="0" width="400" height="50"  />';
					}
					else
					{
						 $msgDriver .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" border="0" width="400" height="50"  />';
					}
                   $msgDriver .=  '</td>';
			   
			   
			   
			   if($fblink){
		  
				 $msgDriver .='<td><a href="https://www.facebook.com/'.$fblink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Facebook.png"  border="0" /></a></td>';
				 
		  }
			 if($twlink){	
				
				$msgDriver .='<td><a href="http://www.twitter.com/'.$twlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Twitter.png"  border="0" /></a></td>';
			 }
				
				if($rsslink){	
				
				$msgDriver .='<td><a href="'.$rsslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Feed.png"  border="0" /></a></td>';
				
				}
				if($gpluslink){	
				
				$msgDriver .='<td><a href="'.$gpluslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Google+.png"  border="0" /></a></td>';
				
				}
				if($linkendinlink){	
				
				$msgDriver .='<td><a href="'.$linkendinlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/LinkedIn.png"  border="0" /></a></td>';
				
				}
				if($instagramlink){	
				
				$msgDriver .='<td><a href="'.$instagramlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/instagram.png"  border="0" /></a></td>';
				
				}
			   
				     
				   $msgDriver .='
				   </tr>
				   </table>
				   <table width="570" border="0"  cellpadding="0" cellspacing="0" style="margin:0 auto;">
				   <tr>
				   <td><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
				   </tr>
				   </table>';
				   
				   $msgDriver .='<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD">
			  <tr><td>
			<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="4" bgcolor="#F7F7F7">
			  <tr><th style="border:0px solid #e2dbdb;" colspan="5"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;"><em>'. $lang_resource['EMAIL_TEMPLATE_DETAILS_CUSTOMER_ORDER'] . '</em></span></th></tr>
			  <tr>
				<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="160">'. $lang_resource['EMAIL_TEMPLATE_DESCRIPTION'] . '</th>
				<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="400">'. $lang_resource['EMAIL_TEMPLATE_USER_DETAILS'] . '</th>
			  </tr>';
			  $checkoutfields = $data->buyer->checkoutfields;

				if(in_array('Name', $checkoutfields)){
			  $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($data->buyer->name) . '</td>
			  </tr>';
				}
				if(in_array('Last Name', $checkoutfields)){
			 $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['LOGIN_CREATE_LAST_NAME'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($data->buyer->lastname2) . '</td>
			  </tr>'; 
				}
			  if(in_array('Email', $checkoutfields)){
			  $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Email_ID_V2'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. strtolower($data->buyer->email) . '</td>
			  </tr>';
			  }
			  if(in_array('Full Address', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERYA_V21'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($data->buyer->address) . '</td>
			  </tr>';
			  }
			   if(in_array('Phone', $checkoutfields)){
			   $msgDriver .='<tr>
			
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERY_MOBILE'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->tel.'</td>
			  </tr>';
			   }
			   if(in_array('City', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERY_CITY'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->cityname.'</td>
			  </tr>';
			   }
			   if(in_array('Area / Neighborhood', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERY_NEIGHBOR'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->colony.'</td>
			  </tr>';
			   }
			   if(in_array('APT/Suit', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERY_APT'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->api.'</td>
			  </tr>';
			   }
			   if(in_array('Zipcode', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_ZIP'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->zipcode.'</td>
			  </tr>';
			   }

			   if($data->buyer->reference && in_array('Where did you find about us', $checkoutfields)) {
				$msgDriver .= ' <tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERY_REFERENCE_V2'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->reference.'</td>
			  </tr>';
			   }
			  $msgDriver .='<tr>
					 <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERY_TYPE'] . ':</td>
					 <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->deliveryType.'</td>
					 </tr>
					</table>
					</td></tr></table>';
			
				   $ordernew = $data; 
				  
				  
							$twilio_phone;
							$twilio_enabled;
							$twilio_order = "";
							
							foreach ($ordernew->business as $business)
								{
								$twilio_phone = $business->twiliophone;
								$twilio_enabled = $business->twilioenabled;
								
								pg_prepare($link,'sql4','SELECT buys from w_business WHERE id=$1');
								$result2 = pg_execute($link,'sql4',array($business->id));
								if (pg_num_rows($result2)==1)  
									while($row2 = pg_fetch_array($result2))
										{
											
										pg_prepare($link,'sqls','UPDATE w_business SET buys=$2 WHERE id=$1');
										pg_execute($link,'sqls',array($business->id,intval($row2['buys'])+1));
										}
			
	
								$total = 0;
			
								$msgDriver .= '
			<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
			  <tr><th style="border:1px solid #e2dbdb;" colspan="5" textcolor="#df2226"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;">' . $business->name . '- Tele: ' . $business->tel . ' </span></th></tr>
								  </table></table>';
								$paymethod = '';
			
								if (empty($pid))//if no paypal payment...
									{
									if ($business->paymethod->cash==true)
										$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
			
									if ($business->paymethod->card==true)
										if ($paymethod=='')
											$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
											else
											$paymethod .= $lang_resource['AND_CARD'];
									}
									else
									{
									
									$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_VALIDATING_PAYMENT_PAYPAL'].' (' . $pid . ')';							
									pg_prepare($link,'sqlpaycheck','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
									$result3 = pg_execute($link,'sqlpaycheck',array($pid));
			
									if (pg_num_rows($result3)==1)  						
										while($row3 = pg_fetch_array($result3))
											{
											$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL'].' (' . $pid . ')';
											
											pg_prepare($link,'sqlpayupdate','UPDATE w_paypal_payments SET taken=true WHERE itemid=$1');
											pg_execute($link,'sqlpayupdate',array($pid));
											}
			
									}
			
			
			$msgDriver .= '<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
			<tr>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="15%">' . $lang_resource['FRONT_MAIN_EMAIL_ITEMS'] . '</th>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="45%">' . $lang_resource['FRONT_MAIN_EMAIL_OPTIONS'] . '</th>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="25%">' . $lang_resource['ORDER_COMMENTS'] . '</th>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="15%">' . $lang_resource['FRONT_MAIN_EMAIL_RATE'] . '</th>
			  </tr>';

					foreach ($business->dishes as $dish)
						{
							
						if($dish->options) {
			 $productOptionHtml =  Margeslash($dish->options);  
			} else {
				$productOptionHtml ='';
				}	
							
						
						$msgDriver .= '<tr>';
						$msgDriver .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' .$dish->quantity  . ' X '. $dish->name.'</td>
						
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $productOptionHtml . '</td>
						
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . ucfirst(strtolower($dish->comments)) . '</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$sitecurrency.' ' . $dish->total . '</td>
						
						</tr>';
						$total = $total + $dish->total;
						}
						if($ordernew->buyer->taxtype == 1)
						{
					$total = $total + $business->shipping + $ordernew->tax;
					$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'];
						} 
						else
						{
					$total = $total + $business->shipping;
					$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'];
						}
						
						
						
					$taxpercentage = GetDecimalPoint($ordernew->buyer->tax);
					$tipsprice = GetDecimalPoint($ordernew->buyer->tips);
					
					if ($ordernew->buyer->tips > 0)
					{
					$total = $total	+ $ordernew->buyer->tips;
					}
					
					$total = GetDecimalPoint($total);
						
						$deltype = $ordernew->buyer->deliveryType;
				
					
					if ($business->shipping=='0.00')
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];
						else
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY_COST'];

					$msgDriver .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $shippingcaption . '</td>
					<td colspan="1" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right">'. ucfirst(strtolower($business->comments)) . '</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $business->shipping . '</td></tr>';
					
				
					if(isset($ordernew->discountcategory))
					{
						if($ordernew->discounttype == 1)
						$discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ." (" .$ordernew->discountrate ."%)";
						else if($ordernew->discounttype == 2)
						$discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ;
						
						$total = $total - $ordernew->discountprice;
					    $total = GetDecimalPoint($total);
						
						
						$msgDriver .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $discountcaption . '<br/> <span style="font-size:11px;font-weight:bold">'. ucfirst(strtolower($ordernew->discountcomments)) . '</span></td>
					<td colspan="1" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$sitecurrency.' ' . $ordernew->discountprice . '</td></tr>';
					
					}
					
					/*discount code section */
					if ($ordernew->tax > 0)
				{
					$msgDriver .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['Tax_V2'].' ('. $taxpercentage .'%)<br/> <span style="font-size:11px;font-weight:bold">'. ucfirst(strtolower($taxstring)) . '</span></td>
					<td colspan="1" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$sitecurrency.' ' . $ordernew->tax . '</td></tr>';
				}
					
				if ($ordernew->buyer->tips > 0)
				{
					$msgDriver .='<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['DELIVERY_TIP_DRIVER'].'</td>
					<td colspan="1" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$sitecurrency.' ' . $tipsprice . '</td></tr>';
				}	
					
					

			$msgDriver .= '<tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			
		  </tr>
		
			 <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right" colspan="2"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px; padding-left: 74px;">'.$lang_resource['DELIVERY_TOTAL'].'</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="2"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px;color:#df2226;">'.$sitecurrency.' ' .$total. '</span></td>
		  </tr>
			<tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>'.$lang_resource['FRONT_MAIN_PAYMENT_METHOD'].' '. $paymethod . '</td>
		  </tr>
		   <tr> <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em> '.$lang_resource['DELIVERY_TYPE'].' : '. $deltype . '</td>
		  </tr>
		  <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>'.$lang_resource['FRONT_MAIN_ANY_CHANGES_WITH'].'<span style="font-family:Arial,Georgia,sans-serif;color:#df2226;">'.$lang_resource['FRONT_MAIN_CONTACT_RESTAURENT'].' '. $business->name . '-(Tele: ' . $business->tel . ').</em></span></td>
		  </tr>
		</table>
		</td></tr></table>';
		
		break;

}
				
				$msgDriver .= '</td></tr></tbody></table></td></tr></tbody></table></center>';

	 

			$msgDriver .='<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
					<tr>
				  <td height="15"></td>
				</tr>
				<tr>
				  <td align="center" style="padding:8px 50px;">
				  <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
				  '.$lang_resource['EMAIL_TEMPLATE_PLEASE_CHOOSE_ONE_BELOW_OPTIONS'].': '.$order->id.'</span>    
				  </td>
				</tr>
				 
				<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url15.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/button15.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
						<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url30.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/button30.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
					<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url45.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/button45.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
				
					<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url60.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/button60.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
					<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/ordered.png" border="0" /></a>
				  </td>
				  
				  <tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$reject_url.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/cancel.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
				
				<tr>
				  <td align="center" style="padding:8px 50px;">
				  <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
				  '.$lang_resource['ORDER_EMAIL_DRIVER_RESTAURANT_COMMENTS'].' :: '.$order->comment.'</span>    
				  </td>
				</tr>
				
				  
			</table>
			<tr>
			</table>	
			</td></tr></table>
		
		<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
		<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
		<tr>
		<td width="110">
			   <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
		<td>
		
		<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
		  <tr>';
		  
		  if($fblink){
		  
				 $msgDriver .='<td><a href="https://www.facebook.com/'.$fblink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Facebook.png"  border="0" /></a></td>';
				 
		  }
			 if($twlink){	
				
				$msgDriver .='<td><a href="http://www.twitter.com/'.$twlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Twitter.png"  border="0" /></a></td>';
			 }
				
				if($rsslink){	
				
				$msgDriver .='<td><a href="'.$rsslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Feed.png"  border="0" /></a></td>';
				
				}
			if($gpluslink){	
				
				$msgDriver .='<td><a href="'.$gpluslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/Google+.png"  border="0" /></a></td>';
				
				}
				if($linkendinlink){	
				
				$msgDriver .='<td><a href="'.$linkendinlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/LinkedIn.png"  border="0" /></a></td>';
				
				}		
				if($instagramlink){	
				
				$msgDriver .='<td><a href="'.$instagramlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/instagram.png"  border="0" /></a></td>';
				
				}		
				
				
		 $msgDriver .='</tr>
		  
		  
		  
		  
		</table>
		
		</td>
		
		<td>
		<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
		  <tr>
			<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/apple_m.png"  border="0" /></a></td>
			<td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/android_m.png"  border="0" /></a></td>
			<td><a href="http://'.$_SERVER["HTTP_HOST"].'/mobile.php" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/mobile_m.png"   border="0" /></a></td>
		  </tr>
		</table>
		
		
		 </td>
		</tr>
		
		</table>
		</td></tr></table>
		
		   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
		   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">
			  <tr>        
				 <td width="381">
					<table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
					   <tr>
						  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$_SERVER["ORDERS_ABOUT_US"].'</strong></span></td>
					   </tr>
					   <tr>
						  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$_SERVER["ORDERS_CONTACT_US"].'</strong></span></td>
					   </tr>
					   <tr>
						  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$_SERVER["ORDERS_BLOG"].'</strong></span></td>
					   </tr>
					</table>        
				 </td>
				 <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/logo.png" width="251" height="42" border="0" /></td>
			 </tr>
		   </table>
		   </td></tr></table>
		
			
			<table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
			 <tr><td height="15"></td></tr>
		
			 <tr>
			 <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
				<span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>
				<span style="color:#6f6d6b;">'.$lang_resource['ORDERS_DONT_WANT_TO'].' </span>
				<a href="#u" style="text-decoration:underline;color:#6f6d6b;" target="_blank">'.$lang_resource['ORDERS_UNSUBSCRIPT'].'</a>     
			 </td>
			 </tr>
			</table>
		
		
		
		</body>
		</html>';
		
		
function Margeslash($text){
	
	$res = explode("_@_",$text);
	
	$options_record = Array();
	foreach($res as $po){
	
	$poption = explode("@u@",$po);
	$a=new stdClass();
	
	$a->optionheader=$poption[0];
	$a->optionchoice=$poption[1];
	
	
	
	if($poption[0]!=""){
		
	array_push($options_record,$a);
	
	}
	
	}

	
	
	$html='<ul class="pdct_op">';
	$lasti =0;
	//
	foreach($options_record as $each_record){
	if($lasti == 0 ) {
	$html .='<h4>'.$each_record->optionheader.'</h4>';
	$html .='<li>'.$each_record->optionchoice.'</li>';
	}
	else if($previousHeader == $each_record->optionheader ) {
		
		$html .='<li>'.$each_record->optionchoice.'</li>';
	}
	else if($previousHeader != $each_record->optionheader) {
		 $html .='<h4>'.$each_record->optionheader.'</h4>';
		 $html .='<li>'.$each_record->optionchoice.'</li>';
		
		}
	$previousHeader = $each_record->optionheader;
	$lasti++;
	}
	$html .='</ul>';
	return $html;
}		
		

?>
