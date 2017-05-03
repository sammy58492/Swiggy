<?php


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

function FetchAllsettingsCustomMailchmp1()
       {
		require('panel/config.php');

       $link = ConnectDB($CFG);
	   pg_prepare($link,'sqlppp','SELECT * from w_configs ');
       $result = pg_execute($link,'sqlppp',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
       }



//include_once "languages/lang.en.php";


function GetLangFileStatic(){	

require('panel/config.php');
$link1 = ConnectDB($CFG);
if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
pg_prepare($link1,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
$result1 = pg_execute($link1,'sqllangfetch',array('TRUE'));
$row1 = pg_fetch_array($result1);
$_SESSION['l'] = $row1['id'];
}
pg_prepare($link1,'sqlfetchlang','SELECT * from w_lang_static');
$result = pg_execute($link1,'sqlfetchlang',array());
while($row = pg_fetch_array($result)){
$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
}
return $lang_resource;
pg_close($link1);
}

$lang_resource = GetLangFileStatic();       

if(isset($_REQUEST['o']) && $_REQUEST['o']!="" && isset($_REQUEST['ak']) && $_REQUEST['ak']!=""){
	
	$link = ConnectDB();
	$order=$_REQUEST['o'];
	
	//fetch bus id for order
	$sqlbus = "SELECT data FROM w_orders WHERE id = $1";
	 pg_prepare($link,'sqlbus',$sqlbus);
	$bus_fetch_sql = pg_execute($link,'sqlbus',array($order));
	
	while($bus_array = pg_fetch_array($bus_fetch_sql))
	{
		$bus_data = json_decode($bus_array[0]);
		
	}
	
	
	
	$rest = $bus_data->business[0]->id;
	
	
	$sql="UPDATE w_orders SET status=$1,comment=$2,printer_stime=$3 WHERE id=$4";

	$status=0;
	$desc="";
	$printer_stime="00:00";

	if($_REQUEST['ak']=="Rejected"){
		$status=5;
	}
	else if($_REQUEST['ak']=="Accepted"){
		$status=7;
	}

	if(isset($_REQUEST['dt'])){
	if($status==7)
	{
	$desc = $lang_resource['EMAIL_PRINTER_STATUS_UPDATE_RESTAURANT'].$_REQUEST['dt'];
	}
	else if($status==5)
	{
		$desc=$_REQUEST['m'];;
	}
	$printer_stime=$_REQUEST['dt'];
	}

   //get printer file path
	//Fetch Dynamic printer path for order business
		$DynamicPrinterPath =  "orders/".$rest.".txt"; //default path
		 $PathQueue = $rest;
		//1. check main settings
		 pg_prepare($link,'sql_print',"SELECT * FROM w_printerpath");
	     $result_print = pg_execute($link,'sql_print',array());
		
		 while($array_print = pg_fetch_array($result_print))
		 {
			 $array_print_val = json_decode($array_print['printer_restaurant']);
			 
			 if(($array_print_val[0] == -1) || in_array($rest,$array_print_val))
			 { //check if assigned for all or particular business
				 
				 $DynamicPrinterPath = "orders/".$array_print['path'].".txt";
				 $PathQueue = $array_print['path'];
				 break;
			 }
			 
		 }
	
 

   pg_prepare($link,'sql3',$sql);
    pg_execute($link,'sql3',array($status,$desc,$printer_stime,$order));
	if(file_exists($DynamicPrinterPath)){
	
			
		
			
			$files = glob("orders/*.txt");
		    $printer_array = array();
			
			foreach($files as $file)
			{
				$valx1 = explode(".",$file);
				$valx2 = explode("_",$valx1[0]);
				
				 
				
				if($valx2[0] == "orders/".$PathQueue)
				{
					array_push($printer_array,$file);
				}
				
			}
			
			
			$file_size = count($printer_array);
			
			
			if($file_size > 1)
			{
				unlink($DynamicPrinterPath);
				$fp = fopen($DynamicPrinterPath, "w");
				
				copy($printer_array[1], $DynamicPrinterPath);
				unlink($printer_array[1]);
				fclose($fp);
			}
			else if($file_size == 1)
			{
				
				unlink($DynamicPrinterPath);
				
				$fp = fopen($DynamicPrinterPath, "w");
				fclose($fp);
				
			}
			
		
			
	}

require "panel/lib/class.phpmailer.php";

//ORDER DETAILS
$order_id = $order;
//$order_status = $_REQUEST['ak'];
if($_REQUEST['ak'] == "Rejected")
{
    $order_status = $lang_resource['EMAIL_PRINTER_STATUS_REJECTED'];//"Rejected";
}
else if($_REQUEST['ak'] == "Accepted")
{
    $order_status = $lang_resource['EMAIL_PRINTER_STATUS_ACCEPTED'];//"Accepted";
}
$order_comment = $desc;


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
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/images/logo/1/normal.jpg" border="0" /></td>
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
          '.$lang_resource['EMAIL_CURRENT_ORDER_STATUS_FOR_ORDER_NO'].' '.$order_id.' '.$lang_resource['min2_V2'].' '.$order_status.'</span>
          </td>
        </tr>';



		if($order_comment)
		{
		 $msg .='<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
           '.$lang_resource['EMAIL_PRINTER_STATUS_COMMENTS'].''.$order_comment.'</span>
          </td>
        </tr>';
		}

           $msg .='
    </table>
    <tr>
    </table>
    </td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">Follow Us On: </span></td>
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
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/email/logo.png" width="251" height="42" border="0" /></td>
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

$sql="SELECT data FROM w_orders WHERE id = $1";
pg_prepare($link,'sql7',$sql);
  $res =  pg_execute($link,'sql7',array($order_id));

  $data = pg_fetch_array($res);

  $datas =   json_decode($data['data']);


  $user_mail = $datas->buyer->email;
  
  
  	////////////////// FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	pg_prepare($link,'sqlmand1','SELECT * from w_configs WHERE name=$1');
	$resp1 = pg_execute($link,'sqlmand1',array('mandrillsettings'));
	$rowsp1 = pg_fetch_array($resp1);
	
	pg_prepare($link,'sqlmand2','SELECT * from w_configs WHERE name=$1');
	$resp2 = pg_execute($link,'sqlmand2',array('mandrillhost'));
	$rowsp2 = pg_fetch_array($resp2);
	
	pg_prepare($link,'sqlmand3','SELECT * from w_configs WHERE name=$1');
	$resp3 = pg_execute($link,'sqlmand3',array('mandrill_port'));
	$rowsp3 = pg_fetch_array($resp3);
	
	pg_prepare($link,'sqlmand4','SELECT * from w_configs WHERE name=$1');
	$resp4 = pg_execute($link,'sqlmand4',array('mandrillsmtp'));
	$rowsp4 = pg_fetch_array($resp4);
	
	pg_prepare($link,'sqlmand5','SELECT * from w_configs WHERE name=$1');
	$resp5 = pg_execute($link,'sqlmand5',array('mandrillmtp'));
	$rowsp5 = pg_fetch_array($resp5);
	
	$scriptid = $_SESSION['scriptid'];
	pg_prepare($link,'emailpermi_printer','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
	$emailper_printer_res = pg_execute($link,'emailpermi_printer',array('PRINTER_ACCEPTED_EMAIL',$scriptid));
	$emailper_printer_row = pg_fetch_array($emailper_printer_res);
	$order_printer_em = $emailper_printer_row['status'];


//////////////////END FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////






$rowEmail = FetchAllsettingsCustomMailchmp1();
				if(($rowsp1['value']=="1") && ($order_printer_em == 't'))   // if mandrillsettings is select  "YES" on backend
			{
						include_once "panel/lib/lib/swift_required.php";
						
						
			
					$subject =  $lang_resource['ORDER_STATUS_TEXT'];
					$from = array($rowEmail['email_from'] =>$rowEmail['sitename']);
					$to = array($user_mail  => $user_mail);
					$text = 'Order';
					$html = $msg;
					
					$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
					$transport->setUsername($rowsp4['value']);
					$transport->setPassword($rowsp5['value']);
					$swift = Swift_Mailer::newInstance($transport);
					
					$message = new Swift_Message($subject);
					
					$message->setFrom($from);
					$message->setBody($html, 'text/html');
					$message->setTo($to);
					$message->addPart($text, 'text/plain');
					
					if ($recipients = $swift->send($message, $failures))
					{
					 //echo 'Message successfully sent!';
					 $success = 1;
					} else {
					 //echo "There was an error:\n";
					 //print_r($failures);
					 $success = 0;
					}
			}
			else{	
			$mail = new PHPMailer();
            $mail->PluginDir = "";
			$mail->Host = "localhost";
			$mail->From = $rowEmail['email_from'];
			$mail->FromName = $rowEmail['sitename'];
			$mail->Subject =  $lang_resource['ORDER_STATUS_TEXT'];

			$mail->AddAddress($user_mail);


			$mail->MsgHTML($msg);
			$mail->IsHTML(true);
			$mail->AltBody ="Order";
			$mail->CharSet = 'UTF-8';
			
			$mail->Send();
			}

}

?>
