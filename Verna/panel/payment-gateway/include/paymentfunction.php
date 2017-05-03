<?php
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link1 = pg_connect($string);
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




function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
	require("../../config.php"); 
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}

function FetchAllsettingsCustomMailchmp()
   {
	require('../../config.php');
   $link = ConnectDB($CFG);
   $sqlno = 'sql3'.time();
   pg_prepare($link,$sqlno,'SELECT * from w_configs ');
   $result = pg_execute($link,$sqlno,array());

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
function FetchAllsettingsCustomMailchmp1()
   {
	require('../../config.php');
   $link = ConnectDB($CFG);
   $sqlno = 'sql33'.time();
   pg_prepare($link,$sqlno,'SELECT * from w_configs ');
   $result = pg_execute($link,$sqlno,array());

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

function GetConfigFromPanel($configs)
{
require('../../config.php');
$string = "host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link   = pg_connect($string);

if (!$link) {
	return '[]';
}
$conditional = ' WHERE ';
$count       = 0;
foreach ($configs as $config) {
	if ($count == 0) {
		$conditional .= 'name=$' . ($count + 1);
	} else {
		$conditional .= ' OR name=$' . ($count + 1);
	}
	$count++;
}
pg_prepare($link, 'sql', 'SELECT value,name FROM w_configs' . $conditional);
$result  = pg_execute($link, 'sql', $configs);
$configs = array();
while ($row = pg_fetch_array($result)) {
	unset($config);
	$config->name  = $row['name'];
	$config->value = $row['value'];
	array_push($configs, $config);
}
pg_close($link);
return json_encode($configs);
}

function parse($str,$old=false)
{
if ($old)
	return json_decode($str);//php 5.1
return json_decode(stripslashes($str));//php 5.2 and forward
}	

function SendMail($msg,$subject,$addresses)
{

//Fetch from email here
$row = FetchAllsettingsCustomMailchmp();
//end fetch
$mail = new PHPMailer();
$mail->PluginDir = "";
$mail->Host = "localhost";
$mail->From = $row['email_from'];
$mail->FromName = $row['sitename'];
$mail->Subject =  $subject;
foreach ($addresses as $address)
	$mail->AddAddress($address);
$mail->MsgHTML($msg);
$mail->IsHTML(true);
$mail->AltBody ="Order";
$mail->CharSet = 'UTF-8';
$success = $mail->Send();
$try = 1;

while((!$success)&&($try<1)&&($mail->ErrorInfo!=$lang_resource['PAYMENT_GATEWAY_ALL_SMTP_ERROR']))
	{
	sleep(5);
	$success = $mail->Send();
	$try++;
	}

$mail->ClearAddresses();
if(!$success)
	return false;
	else
	return true;
}
function SendMail1($msg,$subject,$addresses)
{

//Fetch from email here
$row = FetchAllsettingsCustomMailchmp1();
//end fetch
$mail = new PHPMailer();
$mail->PluginDir = "";
$mail->Host = "localhost";
$mail->From = $row['email_from'];
$mail->FromName = $row['sitename'];
$mail->Subject =  $subject;
foreach ($addresses as $address)
	$mail->AddAddress($address);
$mail->MsgHTML($msg);
$mail->IsHTML(true);
$mail->AltBody ="Order";
$mail->CharSet = 'UTF-8';
$success = $mail->Send();
$try = 1;

while((!$success)&&($try<1)&&($mail->ErrorInfo!=$lang_resource['PAYMENT_GATEWAY_ALL_SMTP_ERROR']))
	{
	sleep(5);
	$success = $mail->Send();
	$try++;
	}

$mail->ClearAddresses();
if(!$success)
	return false;
	else
	return true;
}

///new pdf mail///
function SendMailOrder($msg,$msg_pdf,$subject,$addresses,$id)
	{
	 require('../../config.php');
    $string = "host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
    $link   = pg_connect($string);
	//Fetch from email here
	$row = FetchAllsettingsCustomMailchmp();
	//end fetch
	

	//pdf attachment start
	include("../pdf/dompdf_config.inc.php");


			$dompdf = new DOMPDF();

			/*echo "******pdf-html********";
			echo $msg_pdf;
			echo "******pdf-html********";*/

			$dompdf->load_html($msg_pdf);

			//echo "test";

			$dompdf->render();
			$dompdf->set_paper("A4","portrait");

			$date=date("Y-m-d H:i:s");
			$file_name=$fetch->invo;
			$pdf = $dompdf->output();

			//print_r($pdf);

			file_put_contents("order.pdf", $pdf);

	//pdf attachment ends

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

//////////////////END FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	
	if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
	{
		include_once "../../lib/lib/swift_required.php";
				
				foreach ($addresses as $address) {
					if($address!="")
					$mailer[$address]=$address;
				
				}

				$subject = $subject;
				$from = array($row['email_from'] =>$row['sitename']);
				$to = $mailer;
				
				$text = "Order";
				$html = $msg;
				
				$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
				$transport->setUsername($rowsp4['value']);
				$transport->setPassword($rowsp5['value']);
				$swift = Swift_Mailer::newInstance($transport);
				
				$message = new Swift_Message($subject);
				$message->attach(Swift_Attachment::fromPath('order.pdf'));
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
	//$mail->From = "orders@oos.localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = $row['sitename'];
    $mail->Subject =  $subject;
    foreach ($addresses as $address)
    	$mail->AddAddress($address);
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
	$mail->AddAttachment("order.pdf",$id."_order.pdf");
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();

	/*echo "*****success*****";
	echo $success;
	echo "*****end success*****";*/

 	$try = 1;

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
   		{
	   	sleep(5);
     	$success = $mail->Send();
     	$try++;
   		}

   	$mail->ClearAddresses();
	}
   	if(!$success)
		return true;
		else
		return true;
	}

 function get_lat_long($address){

    $address = str_replace(" ", "+", $address);

    $json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=$region");
    $json = json_decode($json);

    $lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
    $long = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
    $record['lat'] = $lat;
	$record['long'] = $long;
	
	
    return $record;
}	
?>