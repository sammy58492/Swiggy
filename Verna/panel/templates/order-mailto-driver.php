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
			ul {
					list-style: none;
					margin: 0px 0px 0px 0px;
					padding: 0px 0px 0px 0px;
					width: 100%;
					float:left;
					
					}
				li{
				font-size: 12px;
				color: #333;
				padding-left: 20px;
				line-height: 17px;
				}
				 h4{
				margin: 5px 0px 0px 0px;
				padding: 0px 0px 0px 0px;
				font-size: 12px;
				color: #e74c3c;
				text-transform: uppercase;
				}
				.options{
					width:100%;
					float:left;
					margin: 7px 0px 0px 0px;
				padding: 0px 0px 0px 5px;
				}
			-->
			</style>
			
			</head>
			
			<body>
				<table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
				   <tr><td height="10"></td></tr>
				   <tr>
				   <td height="79">
				   <table width="568" border="0" cellspacing="0" cellpadding="0">
				   <tr>
				   <td width="50%">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msgDriver .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" border="0" width="100" height="40" />';
					}
					else
					{
						 $msgDriver .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" border="0" width="100" height="40" />';
					}
                   $msgDriver .=  '</td>
				   <td height="50%" valign="middle">
				   <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
				   <tr>
				   <td><a href="https://www.facebook.com/'.$fblink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/fb_m.png"  border="0" /></a></td>
				   <td><a href="http://www.twitter.com/'.$twlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/twitter_m.png"  border="0" /></a></td>
				   <td><a href="'.$rsslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/rss_m.png"  border="0" /></a></td> 
				   </tr>
				   </table>   
				   </td>
				   </tr>
				   </table>
				   </td>
				   </tr>
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
			
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_MOBILE'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->tel.'</td>
			  </tr>';
			   }
			   if(in_array('City', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_MYACCOUNT_CITY'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->cityname.'</td>
			  </tr>';
			   }
			   if(in_array('Area / Neighborhood', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_NEIGHBOR'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->colony.'</td>
			  </tr>';
			   }
			   if(in_array('APT/Suit', $checkoutfields)){
			   $msgDriver .='<tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_APT'] . '</td>
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
				$msgDriver .= ' <tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Referenece_V2'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->reference.'</td>
			  </tr>';
			   }
			  $msgDriver .='<tr>
					 <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['EMAIL_TEMPLATE_DELIVERY_TYPE'] . ':</td>
					 <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->deliveryType.'</td>
					 </tr>
					</table>
					</td></tr></table>';
				
				   $ordernew = parse($info->data); 
				  
				  
							$twilio_phone;
							$twilio_enabled;
							$twilio_order = "";
							if(!empty($ordernew->business)){
							foreach ($ordernew->business as $business)
								{
								$twilio_phone = $business->twiliophone;
								
								pg_prepare($link,'sqlpayment'.$business->id,'SELECT * FROM w_configs where name=$1');
								$result2 = pg_execute($link,'sqlpayment'.$business->id,array('panelsetting'));
								$row2 = pg_fetch_array($result2);
								$panelsetting = $row2['value'];
								
								if($panelsetting == 1){	
								$twilio_enabled = $business->twilioenabled;	
								}else{
								$twilio_enabled = $business->acceptsms;		
								}
								
								
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
											$paymethod .= ' '.$lang_resource['FRONT_MAIN_EMAIL_AND_CARD'];
									}
									else
									{
									
									$paymethod = 'Error validating payment by Paypal (' . $pid . ')';							
									pg_prepare($link,'sqlpaycheck','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
									$result3 = pg_execute($link,'sqlpaycheck',array($pid));
			
									if (pg_num_rows($result3)==1)  						
										while($row3 = pg_fetch_array($result3))
											{
											$paymethod = ''.$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL'].' (' . $pid . ')';
											
											pg_prepare($link,'sqlpayupdate','UPDATE w_paypal_payments SET taken=true WHERE itemid=$1');
											pg_execute($link,'sqlpayupdate',array($pid));
											}
			
									}
			
			
			$msgDriver .= '<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
			<tr>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="30%">' . $lang_resource['FRONT_MAIN_EMAIL_ITEMS'] . '</th>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="45%">' . $lang_resource['FRONT_MAIN_EMAIL_OPTIONS'] . '</th>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="25%">' . $lang_resource['ORDER_COMMENTS'] . '</th>
				<th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="15%">' . $lang_resource['FRONT_MAIN_EMAIL_RATE'] . '</th>
			  </tr>';

					foreach ($business->dishes as $dish)
						{
						
						$msgDriver .= '<tr>';
						$msgDriver .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' .$dish->quantity  . ' X '. $dish->name.'</td>
						
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->options . '</td>
						
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . ucfirst(strtolower($dish->comments)) . '</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->total . '</td>
						
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
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];

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
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $ordernew->discountprice . '</td></tr>';
					
					}
					
					/*discount code section */
					if ($ordernew->tax > 0)
				{
					$msgDriver .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$lang_resource['Tax_V2'].' ('. $taxpercentage .'%)<br/> <span style="font-size:11px;font-weight:bold">'. ucfirst(strtolower($taxstring)) . '</span></td>
					<td colspan="1" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $ordernew->tax . '</td></tr>';
				}
					
				if ($ordernew->buyer->tips > 0)
				{
					$msgDriver .='<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">Tip for the driver:</td>
					<td colspan="1" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $tipsprice . '</td></tr>';
				}	
					
					

			$msgDriver .= '<tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
			
		  </tr>
		
			 <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right" colspan="3"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px; padding-left: 74px;">Total</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px;color:#df2226;">' .$total. '</span></td>
		  </tr>
			<tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>'.$lang_resource['FRONT_MAIN_PAYMENT_METHOD'].' '. $paymethod . '</td>
		  </tr>
		   <tr> <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em> '.$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'].' : '. $deltype . '</td>
		  </tr>
		  <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>'.$lang_resource['FRONT_MAIN_ANY_CHANGES_WITH'].'<span style="font-family:Arial,Georgia,sans-serif;color:#df2226;">'.$lang_resource['FRONT_MAIN_CONTACT_RESTAURENT'].' '. $business->name . '-(Tele: ' . $business->tel . ').</em></span></td>
		  </tr>
		</table>
		</td></tr></table>';

}
				
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
				  Restaurant Comments :: '.$order->comment.'</span>    
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
		  <tr>
			<td><a href="https://www.facebook.com/'.$fblink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/fb_m.png"  border="0" /></a></td>
			<td><a href="http://www.twitter.com/'.$twlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/twitter_m.png"  border="0" /></a></td>
			<td><a href="'.$rsslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/rss_m.png"  border="0" /></a></td>
		  </tr>
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
				 <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/images/logo/2/normal.jpg" width="251" height="42" border="0" /></td>
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

?>