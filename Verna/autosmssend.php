<?php
//error_reporting(0);
function ConnectDB($CFG = 'empty')
{
	if ($CFG=='empty')
	require('panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
	die('');
	else
	return $link;
}

include_once 'languages/lang.en.php';
require_once('sms.php');



function GetConfigFromPanel($configs,$link) {
	$conditional = ' WHERE ';
	$count = 0;
	foreach($configs as $config) {
		if ($count==0) {
			$conditional .= 'name=$' . ($count+1);
		}	else {
			$conditional .= ' OR name=$' . ($count+1);
		}
		$count++;
	}
	pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	$result = pg_execute($link,'sql',$configs);
	$configs = array();
	while($row = pg_fetch_array($result)) {
		//unset($config);
		$config = new stdClass();
		$config->name = $row['name'];
		$config->value = $row['value'];
		array_push($configs,$config);
	}
	return json_encode($configs);
}
 
$link = ConnectDB();
$data = array();


    $emergency_no = "emergency_no";
	pg_prepare($link,'sqlemr','SELECT * FROM w_configs WHERE name=$1');
	$resultemr = pg_execute($link,'sqlemr',array($emergency_no));
	$rowemr = pg_fetch_array($resultemr);
  
  $emergency_no_setting = $rowemr["value"];

pg_prepare($link,'sql1',"SELECT * from  w_orders where status='0' or status='4'");
$result_orders = pg_execute($link,'sql1',array());


while($row = pg_fetch_array($result_orders)){
	$data = json_decode($row['data']);
	$en = "TRUE";
	pg_prepare($link,'sql2'.$row['id'],'SELECT * from  w_business where id=$1 AND enabled = '.$en.'');
	$result_emr_no = pg_execute($link,'sql2'.$row['id'],array($data->business[0]->id));
	$row_emr_no = pg_fetch_array($result_emr_no);
	$emer_no = $row_emr_no['emer_no'];
	//echo $emergency_no_setting."/".$emer_no."/".$twiliophone;
	$twiliophone = $row_emr_no['twiliophone'];
	if($emergency_no_setting=='1' && $emer_no)
	{
		$msg = $lang_resource['ORDER_NO_EMER'].' '.$data->business[0]->id.' '.$lang_resource['ORDER_NO_ACCEPTED'];
		sendSMS($msg,'+'.$twiliophone,'+'.$emer_no,$link);
		echo $msg;	
		
	}
	
}
////////////////////////////////////////////////SMS END\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////EMAIL START\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function FetchAllsettingsCustomMailchmp(){
	$rand = rand(10000,100000);
	$link = ConnectDB();
	pg_prepare($link,'sqle1'.$rand,'SELECT * from w_configs ');
    $result = pg_execute($link,'sqle1'.$rand,array());
    while($row = pg_fetch_array($result)){
		$id = $row['id'];
		$name =  $row['name'];
		$setting[$name] = $row['value'];		
	}
    return $setting;
}


	$data1 = array();

	$emergency_email = "emergency_email";
	pg_prepare($link,'sqlemr1','SELECT * FROM w_configs WHERE name=$1');
	$resultemr1 = pg_execute($link,'sqlemr1',array($emergency_email));
	$rowemr1 = pg_fetch_array($resultemr1);
  
  $emergency_email_setting = $rowemr1["value"];

pg_prepare($link,'sql12',"SELECT * from  w_orders WHERE status='0'");
$result_orders = pg_execute($link,'sql12',array());
/*echo pg_num_rows($result_orders);
$i=0;*/
while($row = pg_fetch_array($result_orders)){
	//$i++;	
	$data1 = json_decode($row['data']);
	$en = "TRUE";
	$rand1 = rand(100,1000);
	pg_prepare($link,'sql22'.$row['id'].$rand1,'SELECT * from  w_business where id=$1 AND enabled = '.$en.'');
	$result_emr_no = pg_execute($link,'sql22'.$row['id'].$rand1,array($data1->business[0]->id));
	$row_emr_no = pg_fetch_array($result_emr_no);
	$emer_email = $row_emr_no['emer_email'];
	//$emer_email = 'debojyoti.acuity@gmail.com';
	if($emergency_email_setting=='1' && $emer_email !=""){
		//start password email
		
		pg_prepare($link,'sqlfb1'.$row['id'],'SELECT value FROM w_configs where name=$1');
		$resultfb = pg_execute($link,'sqlfb1'.$row['id'],array('facebooklink'));
		$rowfb = pg_fetch_array($resultfb);
		$fblink = $rowfb['value'];
		
		pg_prepare($link,'sqltw1'.$row['id'],'SELECT value FROM w_configs where name=$1');
		$resulttw = pg_execute($link,'sqltw1'.$row['id'],array('twitterlink'));
		$rowtw = pg_fetch_array($resulttw);
		$twlink = $rowtw['value'];

		pg_prepare($link,'sqlrss1'.$row['id'],'SELECT value FROM w_configs where name=$1');
		$resultrss = pg_execute($link,'sqlrss1'.$row['id'],array('rsslink'));
		$rowrss = pg_fetch_array($resultrss);
		$rsslink = $rowrss['value'];

			//DO NOT REMOVE PHP TAG
			//FORGOT PASSWORD TEMPLATE
			$msg ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>*|MC:SUBJECT|*</title>
			
			<!--<style type="text/css">
			
			body {
				margin:0;
			}
			.ReadMsgBody { width: 100%;}
			.ExternalClass {width: 100%;}
			
			</style>-->
			
			</head>
			
			<body>
				<table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
				   <tr><td height="10"></td></tr>
				   <tr>
				   <td height="79">
				   <table width="568" border="0" cellspacing="0" cellpadding="0">
				   <tr>
				   <td width="50%">';
					
                      $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" border="0"  width="300" height="40"  />';
					
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
					  <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">'.$lang_resource['AUTO_EMAIL_PAGE_HI'].$row['id'].' '.$lang_resource['AUTO_EMAIL_PAGE_ORDER_STATUS'].'</span>
					  </td>
					</tr>
					  <tr>
					  <td align="center" style="padding:8px 50px;">
					  <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;"></span>
					  </td>
					</tr>
					<tr>
					  <td height="15"></td>
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
							  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_ABOUT_ABOUT'].'</strong></span></td>
						   </tr>
						   <tr>
							  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_ABOUT_CONTACT'].'</strong></span></td>
						   </tr>
						   <tr>
							  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_ABOUT_BLOG'].'</strong></span></td>
						   </tr>
						</table>
					 </td>
					 <td style="padding-right:16px;"><img src="panel/images/logo/1/normal.jpg" width="251" height="42" border="0" /></td>
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
		//end password email
		//echo $msg;
		//echo $emer_email = 'debojyoti.acuity@gmail.com';
		//echo $msg;
		$row = FetchAllsettingsCustomMailchmp();

		require "panel/lib/class.phpmailer.php";

		$mail = new PHPMailer();
		$mail->PluginDir = "";
		$mail->Host = "localhost";
		$mail->From = $row['email_from'];
		$mail->FromName = $row['sitename'];
		$mail->Subject =  "Pending Order";	
		$mail->AddAddress($emer_email);
		$mail->MsgHTML($msg);
		$mail->IsHTML(true);
		$mail->AltBody ="Order";
		$mail->CharSet = 'UTF-8';

		$success = $mail->Send();
		$try = 1;

		while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
		{
		sleep(5);
		$success = $mail->Send();
		$try++;
		}

		$mail->ClearAddresses();
		if(!$success){
			echo "cancel";
			return false;
		}
		
		else{
			//echo "ok";
			return true;
		}
		

		
		
	}
}


?>