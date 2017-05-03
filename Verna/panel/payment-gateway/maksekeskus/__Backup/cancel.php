<?php
require('../../config.php');
function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';

	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}

$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);


function FetchAllsettingsCustomMailchmp()
       {
        require('../../config.php');
       
	   $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
		$link = pg_connect($string);
	   
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



function parse($str,$old=false)
	{
	if ($old)
		return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
	}	
	
	
	function SendMail($msg,$subject,$addresses)
	{
	include "../../lib/class.phpmailer.php";
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

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
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


session_start();

if(isset($_SESSION['order_id']))
{
	 $id=$_SESSION["order_id"];

pg_prepare($link,'sqlipn1','SELECT * FROM w_orders WHERE id = $1;');
						$search = pg_execute($link,'sqlipn1',array($id));
						$search_row = pg_num_rows($search);
						if($search_row == 1)
						{
                              $reQ = pg_fetch_array($search);
							 $order = json_decode($reQ['data']);
							
	     pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result)){
				$emails = array($order->buyer->email,$emails,$row['email']);	
			}
		

        $makekeskus_pay_confirm = 0;

}


session_unset($_SESSION['order_id']);

if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');
		
			include_once $lang_file;

include_once "../../templates/order-email-template.php";
//include_once "../../templates/bringg-task-template.php";

#########Mail Header##########
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// Additional headers
$headers .= $lang_resource['PAYMENT_GATEWAY_ALL_FROM_SITE_URL'] . "\r\n";
#####Use Mail#########
echo $Showmsg; 

SendMail($msg,$lang_resource['PAYMENT_GATEWAY_ALL_MAKEKESKUS_PAYMENT_FAILED'],$emails);	


}
?>


