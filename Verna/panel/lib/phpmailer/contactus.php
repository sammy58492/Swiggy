<?php
$Showmsg ="fgdfg";
echo "fdg";
include 'PHPMailerAutoload.php';
	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = "testoosdeveloper2@gmail.com";
	//$mail->FromName = "test";
    $mail->Subject =   'New Contact Email';
   // foreach ($addresses as $address)
    	//$mail->AddAddress($fbemail_from);
		
		$mail->AddAddress("mita.acuity@gmail.com");
		//$mail->AddAddress("avijit.acuity@gmail.com");	
	
	$mail->MsgHTML($Showmsg);
	$mail->IsHTML(true);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
  // echo $Showmsg;
	//echo $lang_resource['CONTACTUS_RECEIVER_EMAIL'];
	$success = $mail->Send();
	echo "mmmm";
	if(!$success) {
	   $msg =  "Mailer Error: " . $mail->ErrorInfo;
	} else {
		$msg = "Thank you for contacting Orderingpages.";
		?>
		
      
       <?php 
	  // header("location:contact");
		}	

	
	echo $msg;
		
		?>