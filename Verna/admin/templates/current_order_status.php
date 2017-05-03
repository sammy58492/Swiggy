<?php
session_start();
$msg ='
<html>
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
                      $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" border="0" width="300" height="40" />';
					}
					else
					{
						 $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" border="0" width="300" height="40" />';
					}
                   $msg .=  '</td>
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
</table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
<tr>
<td height="15"></td>
</tr>
<tr>
<td align="center" style="padding:8px 50px;">
<span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
'.$lang_resource['EMAIL_CURRENT_ORDER_STATUS_FOR_ORDER_NO'].' '.$order->id.' '.$lang_resource['EMAIL_TEMPLATE_IS'].' '.$order->status.'</span>    
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
<td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_ABOUT_US'].'</strong></span></td>
</tr>
<tr>
<td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_CONTACT_US'].'</strong></span></td>
</tr>
<tr>
<td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_BLOG'].'</strong></span></td>
</tr>
</table>        
</td>
<td style="padding-right:16px;"><img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg?c='.time().'" width="251" height="42" border="0" /></td>
</tr>
</table>
</td></tr></table>


<table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
<tr><td height="15"></td></tr>

<tr>
<td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
<span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>

</td>
</tr>
</table>
</body>
</html>';
?>