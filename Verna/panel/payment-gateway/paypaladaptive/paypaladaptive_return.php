<?php session_start();
	 global $lang_resource;
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['l'] = $row1['id'];
	}


	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_static');
    $result = pg_execute($link,'sqlfetchlang',array());
 
	  while($row = pg_fetch_array($result)){
		 
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	  }
	  return $lang_resource;
	  pg_close($link);
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
       pg_prepare($link,'sql3','SELECT * from w_configs ');
       $result = pg_execute($link,'sql3',array());

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

function parse($str,$old=false)
	{
	if ($old)
		return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
	}


	function SendMail($msg,$subject,$addresses,$link)
	{
	
	//Fetch from email here
	$row = FetchAllsettingsCustomMailchmp();
	
	
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
	//end fetch
	include "../../lib/class.phpmailer.php";
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
	}
   	if(!$success)
		return false;
		else
		return true;
	}


/*$lang_file;
			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');*/

			// Include the selected language file
			//include_once $lang_file;
			$lang_resource = GetLangFile();



$id = $_REQUEST['id'];
$link = ConnectDB();
pg_prepare($link,'sqlipn1','SELECT * FROM w_orders WHERE id = $1;');
						$search = pg_execute($link,'sqlipn1',array($id));
						$search_row = pg_num_rows($search);
						if($search_row == 1)
						{
 $reQ = pg_fetch_array($search);
							 $order = parse($reQ['data']);
							 $pid = $reQ['paypalinfo'];
							 $id = $reQ['id'];



							if (!empty($pid))
								{
								$order->paypalid = $pid;
								}


							pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				{
				$emails = array($order->buyer->email,$emails,$row['email']);
				//start order email

//end order email
}
/*push notification*/
pg_prepare($link,'sqlpushnotification','SELECT * from w_configs WHERE name=$1');
$resultpushnotification = pg_execute($link,'sqlpushnotification',array('pushnotification'));
$rowpushnotification = pg_fetch_array($resultpushnotification);

if($rowpushnotification['value'] == 1){
	pg_prepare($link,'sqlpush','SELECT * FROM w_gcm WHERE user_id=(SELECT provider FROM w_business WHERE id=$1)');
	$resultpush = pg_execute($link,'sqlpush',array($order->business[0]->id));
	if(pg_num_rows($resultpush)>0){
		$rowpush = pg_fetch_array($resultpush);				
		require '../../../androidapp/push_notification.php';
		push_notification($id,$rowpush['user_id'],$link);				
	}
}
/*push notification*/
include_once "../../templates/order-email-template.php";

include_once "../../templates/bringg-task-template.php";

}


#########Mail Header##########
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// Additional headers
$headers .= $lang_resource['PAYMENT_GATEWAY_ALL_FROM_SITE_URL'] . "\r\n";
#####Use Mail#########
echo $msg;
SendMail($msg,$lang_resource['PAYMENT_GATEWAY_ALL_ADAPTIVE_SUCCESS'],$emails,$link);



$WebAddress= 'http://'.$_SERVER['HTTP_HOST'];


?>
<style>
.button {
    font-family: Arial;
    background: linear-gradient(to bottom, #FCB97E 0%, #F07605 100%) repeat scroll 0 0 transparent;
    border: 1px solid #F07605;
    border-radius: 0.5em 0.5em 0.5em 0.5em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    outline: medium none;
    padding: 10px 20px !important;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    vertical-align: baseline;
}
</style>
<div style="width:100%; text-align:center;"><a href="<?=$WebAddress?>" class="button"><?=$lang_resource['PAYMENT_GATEWAY_ALL_BACK'];?></a></div>
<br/>
