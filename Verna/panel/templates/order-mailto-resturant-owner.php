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
		
		pg_prepare($link,'instagramlink','SELECT value FROM w_configs where name=$1');
		$resultrss3 = pg_execute($link,'instagramlink',array('instagramlink'));
		$rowrss3 = pg_fetch_array($resultrss3);
		$instagramlink = $rowrss3['value'];

$msgRest ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
			<table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
			   <tr><td height="10"></td></tr>
			   <tr>
			   <td height="79">
			   <table width="568" border="0" cellspacing="0" cellpadding="0">
			   <tr>
			   <td width="50%">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msgRest .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" border="0"  width="300" height="40"  />';
					}
					else
					{
						 $msgRest .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" border="0"  width="300" height="40"  />';
					}
                   $msgRest .=  '</td>
			   <td height="50%" valign="middle">
			   <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
			   <tr>
			   <td><a href="https://www.facebook.com/'.$fblink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/fb_m.png"  border="0" /></a></td>
			   <td><a href="http://www.twitter.com/'.$twlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/twitter_m.png"  border="0" /></a></td>
			   <td><a href="'.$rsslink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/rss_m.png"  border="0" /></a></td> 
			    <td><a href="'.$instagramlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/instagram.png"  border="0" /></a></td> 
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
			   
				$msgRest .='<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD">
		  <tr><td>
		<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="4" bgcolor="#F7F7F7">
		  <tr><th style="border:0px solid #e2dbdb;" colspan="5">
		  <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">'. $lang_resource['EMAIL_TEMPLATE_DETAILS_CUSTOMER_ORDER'] . '</span> 
		  </th></tr>
		  <tr>
			<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="160">'. $lang_resource['EMAIL_TEMPLATE_DESCRIPTION'] . '</th>
			<th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="400">'. $lang_resource['EMAIL_TEMPLATE_USER_DETAILS'] . '</th>
		  </tr>
		  <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] . '</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($data->buyer->name) . '</td>
		  </tr>
		  
		  <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['LOGIN_CREATE_LAST_NAME'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($data->buyer->lastname2) . '</td>
			  </tr> 
		  
		  
		  <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Email_ID_V2'] . '</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. strtolower($data->buyer->email) . '</td>
		  </tr>
		   <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['DELIVERYA_V21'] . '</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($data->buyer->address) . '</td>
		  </tr>
		  
		   
		   <tr>
		
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_MOBILE'] . '</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->tel.'</td>
		  </tr>
		   <tr>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_MYACCOUNT_CITY'] . '</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->cityname.'</td>
		  </tr>
		  
		   <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_NEIGHBOR'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->colony.'</td>
			  </tr>
			  
			   <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_APT'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->api.'</td>
			  </tr>
			  
			   <tr>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_ZIP'] . '</td>
				<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->zipcode.'</td>
			  </tr>
		  
		  
		  
		  
		  
		  ';
		   if($data->buyer->reference) {
			$msgRest .= ' <tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Referenece_V2'] . '</td>
			<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->reference.'</td>
		  </tr>';
		   }
		  $msgRest .='<tr>
				 <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['EMAIL_TEMPLATE_DELIVERY_TYPE'] . ':</td>
				 <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'.$data->buyer->deliveryType.'</td>
				 </tr>
				</table>
				</td></tr></table>
			<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
			<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
					<tr>
				  <td height="15"></td>
				</tr>
				<tr>
				  <td align="center" style="padding:8px 50px;">
				  <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
				  Please choose one below option for Order No:'.$order->id.'</span>    
				  </td>
				</tr>
				 
				<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url15.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/ebutton15.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
						<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url30.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/ebutton30.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
					<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url45.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/ebutton45.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
				
					<tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$confirm_url60.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/ebutton60.png" border="0" /></a>
				  </td>
				  
				</tr> 
				
			
				  <tr>
				  <td align="center" style="padding:8px 50px;">
				   <a href="'.$reject_url.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/cancel.png" border="0" /></a>
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
				<td><a href="'.$instagramlink.'" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/instagram.png"  border="0" /></a></td>
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
		<tr>
			<td colspan="4" height="1" bgcolor="#C0C5C6"></td>
		</tr>
		<tr>
			<td colspan="4" height="1" bgcolor="#fffff"></td>
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