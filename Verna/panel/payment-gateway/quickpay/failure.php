<?php
/*$status=$_POST["status"];
$firstname=$_POST["firstname"];
$amount=$_POST["amount"];
$txnid=$_POST["txnid"];

$posted_hash=$_POST["hash"];
$key=$_POST["key"];
$productinfo=$_POST["productinfo"];
$email=$_POST["email"];
$salt="GQs7yium";

If (isset($_POST["additionalCharges"])) {
       $additionalCharges=$_POST["additionalCharges"];
        $retHashSeq = $additionalCharges.'|'.$salt.'|'.$status.'|||||||||||'.$email.'|'.$firstname.'|'.$productinfo.'|'.$amount.'|'.$txnid.'|'.$key;
        
                  }
	else {	  

        $retHashSeq = $salt.'|'.$status.'|||||||||||'.$email.'|'.$firstname.'|'.$productinfo.'|'.$amount.'|'.$txnid.'|'.$key;

         }
		 $hash = hash("sha512", $retHashSeq);
  
       if ($hash != $posted_hash) {
	       echo "Invalid Transaction. Please try again";
		   }
	   else {

         echo "<h3>Your order status is ". $status .".</h3>";
         echo "<h4>Your transaction id for this transaction is ".$txnid.". You may try making the payment by clicking the link below.</h4>";
          
		 } */
?>
<!--Please enter your website homepagge URL -->
<!--<p><a href=http://localhost/testing/success_failure/PayUMoney_form.php> Try Again</a></p>-->



<?php 
//error_reporting(0);
//session_start();
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
$lang_resource = GetLangFile();	


$id = $_REQUEST['id'];
$paymentid = $_REQUEST["AuthorizationCode"];





require('../../config.php');
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);


function FetchAllsettingsCustomMailchmp(){

  require('../../config.php');
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);

  pg_prepare($link,'sql3','SELECT * from w_configs ');
  $result = pg_execute($link,'sql3',array());

  while($row = pg_fetch_array($result)){

      $id = $row['id'];
      $name =  $row['name'];
      $setting[$name] = $row['value'];
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
function parse($str,$old=false){
	if ($old)
		return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
}

function SendMail($msg,$msg_pdf,$subject,$addresses,$id){
	//require "class.phpmailer.php";
	include "../../lib/class.phpmailer.php";
	//Fetch from email here
	$row = FetchAllsettingsCustomMailchmp();
	//end fetch
	$mail = new PHPMailer();

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
			
			file_put_contents("../../order_pdf/order.pdf", $pdf);

	//pdf attachment ends




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
	//$mail->AddAttachment("../../order_pdf/order.pdf",$id."_order.pdf");
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
   	if(!$success)
		return true;
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



$WebAddress= 'http://'.$_SERVER['HTTP_HOST'];

$id=$_REQUEST['id'];
pg_prepare($link,'sqlipn1','SELECT * FROM w_orders WHERE id = $1;');
$search = pg_execute($link,'sqlipn1',array($id));
$search_row = pg_num_rows($search);
//print_r($search_row);
	if($search_row == 1){
		$reQ = pg_fetch_array($search);
		// echo '<pre>';
		//print_r($reQ);
		$order = parse($reQ['data']);
		



		pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result)){
				$emails = array($order->buyer->email,$emails,$row['email']);
			}


}		
	include_once "../../templates/order-failure-template.php";
	
#########Mail Header##########
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// Additional headers
$headers .= $lang_resource['PAYMENT_GATEWAY_ALL_FROM_SITE_URL'] . "\r\n";
#####Use Mail#########
echo $Showmsg; 
SendMail($msg,$msg_pdf,$lang_resource['PAYMENT_GATEWAY_ALL_QUICK_SAVE_FAILED'],$emails,$id);
//SendMail($msg,$lang_resource['PAYMENT_GATEWAY_ALL_VOUGEPAY_SAVE_FAILED'],$emails);
?>