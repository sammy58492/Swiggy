<?php
 $link = ConnectDB();
 	//DO NOT REMOVE PHP TAG
	include_once "../templates/current-order-status-email.php";
	
	//Email From
	$rowEmail = FetchAllsettingsCustomMailchmp1();
	

	pg_prepare($link,'sqlemailsettings','SELECT * from w_configs WHERE name=$1');
	$resultemailsettings = pg_execute($link,'sqlemailsettings',array('emailsettings'));
	$rowemailsettings = pg_fetch_array($resultemailsettings);

    
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
/*------- fetch email permission ------------*/
$scriptid = $_SESSION['scriptid'];
pg_prepare($link,'emailpermidr','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
$emailper_res = pg_execute($link,'emailpermidr',array('ASSIGN_DRIVER_EMAIL',$scriptid));
$emailper_row = pg_fetch_array($emailper_res);
$order_email_driver = $emailper_row['status'];

pg_prepare($link,'emailpermi_rev','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
$emailper_rev_res = pg_execute($link,'emailpermi_rev',array('REVIEW_EMAIL',$scriptid));
$emailper_rev_row = pg_fetch_array($emailper_rev_res);
$order_rev_em = $emailper_rev_row['status'];

pg_prepare($link,'eccept_email','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
$eccept_email_res = pg_execute($link,'eccept_email',array('RESTAURANT_ACCEPT_MAIL_TO_CUSTOMER',$scriptid));
$eccept_email_row = pg_fetch_array($eccept_email_res);
$eccept_email_status = $eccept_email_row['status'];

pg_prepare($link,'driver_ass_to_cus','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
$driver_ass_to_cus_res = pg_execute($link,'driver_ass_to_cus',array('DRIVER_ASSIGN_MAIL_TO_CUSTOMER',$scriptid));
$driver_ass_to_cus_row = pg_fetch_array($driver_ass_to_cus_res);
$driver_ass_to_cus_status = $driver_ass_to_cus_row['status'];

pg_prepare($link,'complete_em_to_cust','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
$complete_em_to_cust_res = pg_execute($link,'complete_em_to_cust',array('ORDER_COMPLETATION_MAIL_TO_CUSTOMER',$scriptid));
$complete_em_to_cust_row = pg_fetch_array($complete_em_to_cust_res);
$complete_em_to_cust_status = $complete_em_to_cust_row['status'];


/*------- fetch email permission ------------*/	
	
	if(($ost==1) && ($order_rev_em == 't')){//REVIEW MAIL TO USER
		include_once "../templates/order-review-mailto-user.php";
			if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
			{
			include_once "lib/swift_required.php";
			
			if($rowemailsettings['value']=='1'){	
			$useremail = $data->business[0]->name;
			}else{
			$useremail = $rowEmail['sitename'];
			}
			
			$subject =  $lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'];
			$from = array($rowEmail['email_from'] =>$useremail);
			
			//if($complete_em_to_cust_status == 't'){}
				$to = array($data->buyer->email  => $data->buyer->email);
			
			$text = $lang_resource['CONTROL_PANEL_MENU_ORDERS'];
			$html = $msg_rev;
			
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
			$mail9 = new PHPMailer();
			$mail9->PluginDir = "";
			$mail9->Host = "localhost";
			$mail9->From = $rowEmail['email_from'];
			if($rowemailsettings['value']=='1'){	
				$mail9->FromName = $data->business[0]->name;
			}else{
				$mail9->FromName = $rowEmail['sitename'];
			}
			$mail9->Subject =  $lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'];
			//if($complete_em_to_cust_status == 't'){}
			$mail9->AddAddress($data->buyer->email);
			
			$mail9->MsgHTML($msg_rev);
			$mail9->IsHTML(true);
			$mail9->AltBody =$lang_resource['CONTROL_PANEL_MENU_ORDERS'];
			$mail9->CharSet = 'UTF-8';
			$mail9->Send();
			}
	}
	
	

	pg_prepare($link,'sql77','SELECT DISTINCT(u.email) FROM w_users u JOIN w_business b ON(u.id=b.provider) WHERE b.id=$1');
	$result77s = pg_execute($link,'sql77',array($bus_id));
	$result77 = pg_fetch_array($result77s);
	$bus_own_mail = $result77['email'];


	if($ost!=0){//Send Mail if change in order status from pending	
		if(($driver_id) && ($order_email_driver == 't')){
			$link = ConnectDB();

			pg_prepare($link,'sql23','SELECT * from w_driver WHERE id=$1');
			$result23 = pg_execute($link,'sql23',array($driver_id));
			$row = pg_fetch_array($result23);

			$driver_email =  $row['email'];
			$driver_name = $row['name'];
			$driver_grpid = $row['group_id'];

			pg_prepare($link,'sql232','SELECT dm.email from w_drivermanager dm WHERE dm.id = (SELECT drivermanager_id FROM w_drivergroup WHERE id = $1)');
			$result232 = pg_execute($link,'sql232',array($driver_grpid));
			$row = pg_fetch_array($result232);

			$drivermanager_email = $row['email'];

		}


		if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
		{
			include_once "lib/swift_required.php";
			
			if($rowemailsettings['value']=='1'){	
			$sitename = $data->business[0]->name;
			}else{
			$sitename = $rowEmail['sitename'];
			}
			
			
			
			
			
			$subject =  $lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'];
			$from = array($rowEmail['email_from'] =>$sitename);
			
			
			if(($driver_id) && ($order_email_driver == 't')){
			$to = array(
						$bus_mail  => $bus_mail,
						$bus_own_mail  => $bus_own_mail,
						$driver_email  => $driver_email,
						$drivermanager_email  => $drivermanager_email,
						$super_mail  => $super_mail,
					);
			}
			else{
				$to = array(
						$bus_mail  => $bus_mail,
						$bus_own_mail  => $bus_own_mail,
						$super_mail  => $super_mail,
					);
			}
			
			
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
			if($rowemailsettings['value']=='1'){	
				$mail->FromName = $data->business[0]->name;
			}else{
				$mail->FromName = $rowEmail['sitename'];
			}
			$mail->Subject =  $lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'];
			
			if($driver_id){
			if($driver_ass_to_cus_status == 't'){
				if(($ost == 1) || ($ost == 7)){
					if(($eccept_email_status == 't') && ($ost == 7)){
						$mail->AddAddress($user_mail);	//this mail sent to user
					}
					if(($complete_em_to_cust_status == 't') && ($ost == 1)){
						$mail->AddAddress($user_mail);	//this mail sent to user
					}
				}
				else
				{
					$mail->AddAddress($user_mail);	//this mail sent to user
				}
			}
		}
		else
		{
			if(($ost == 1) || ($ost == 7)){
				if(($eccept_email_status == 't') && ($ost == 7)){
					$mail->AddAddress($user_mail);	//this mail sent to user
				}
					if(($complete_em_to_cust_status == 't') && ($ost == 1)){
				$mail->AddAddress($user_mail);	//this mail sent to user
				}
			}
			else
			{
				$mail->AddAddress($user_mail);	//this mail sent to user
			}
	
		}
		
		
			$mail->AddAddress($bus_mail);
			$mail->AddAddress($bus_own_mail);
	
			if(($driver_id) && ($order_email_driver == 't')){
				$mail->AddAddress($driver_email);
				$mail->AddAddress($drivermanager_email);
			}
			$mail->AddAddress($super_mail);	
			
			$mail->MsgHTML($msg);
			$mail->IsHTML(true);
			$mail->AltBody ="Order";
			$mail->CharSet = 'UTF-8';
			$mail->Send();
		}
	}

	if(($driver_id) && ($ost==0) && ($order_email_driver == 't')){
	//	echo "Drvr";

 	###############Mail to Driver###############

		$link = ConnectDB();

		pg_prepare($link,'sql23','SELECT * from w_driver WHERE id=$1');
		$result23 = pg_execute($link,'sql23',array($driver_id));
		$row = pg_fetch_array($result23);
		$driver_email =  $row['email'];
		$driver_name = $row['name'];
		$user_mail = $data->buyer->email;

		$driver_grpid = $row['group_id'];


		###########Data to send to order confirm fetch here###########

		//Driver manager Detaisl fetch
		pg_prepare($link,'sql232','SELECT dm.email from w_drivermanager dm WHERE dm.id = (SELECT drivermanager_id FROM w_drivergroup WHERE id = $1)');
		$result232 = pg_execute($link,'sql232',array($driver_grpid));
		$row = pg_fetch_array($result232);
		$drivermanager_email = $row['email'];

		//$bus_mail =  $business_data[0]->business[0]->email;
		


		###########Data to send to order confirm fetch here###########
		//Dynamic URL
		$send_url_str = "driver_id=".$driver_id."&user_mail=".$user_mail."&drivermanager_email=".$drivermanager_email."&bus_mail=".$bus_mail."";

		$confirm_url15 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=15&".$send_url_str;
		$confirm_url30 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=30&".$send_url_str;
		$confirm_url45 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=45&".$send_url_str;
		$confirm_url60 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=60&".$send_url_str;
		$confirm_url = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=1&".$send_url_str;
		$reject_url = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=f";



		include_once "../templates/order-mailto-driver.php";


		//echo $msgDriver;exit;
		if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
			{
					include_once "lib/swift_required.php";
					
					if($rowemailsettings['value']=='1'){	
					$sitename1 = $data->business[0]->name;
					}else{
					$sitename1 = $rowEmail['sitename'];
					}
			
					$subject =  $lang_resource['EMAIL_DRIVER_MESSAGE'];
					$from = array($rowEmail['email_from'] =>$sitename1);
					$to = array($driver_email  => $driver_email);
					$text = 'Order';
					$html = $msgDriver;
					
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

		$mail1 = new PHPMailer();

		$mail1->PluginDir = "";
		$mail1->Host = "localhost";
		$mail1->From = $rowEmail['email_from'];
		if($rowemailsettings['value']=='1'){	
			$mail1->FromName = $data->business[0]->name;
		}else{
			$mail1->FromName = $rowEmail['sitename'];
		}
		$mail1->Subject =  $lang_resource['EMAIL_DRIVER_MESSAGE'];


		$mail1->AddAddress($driver_email);

		$mail1->MsgHTML($msgDriver);
		$mail1->IsHTML(true);
		$mail1->AltBody ="Order";
		$mail1->CharSet = 'UTF-8';
		
		$mail1->Send();

			}

		###############Mail to Driver Ends###############

		############Mail to Driver Manager###########




		include_once "../templates/order-mailto-drivermanager.php";

if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
			{
						include_once "lib/swift_required.php";
						
						if($rowemailsettings['value']=='1'){	
						$useremail = $data->business[0]->name;
						}else{
						$useremail = $rowEmail['sitename'];
						}
			
					$subject =  $lang_resource['EMAIL_DRIVER_MANAGER_MESSAGE'];
					$from = array($rowEmail['email_from'] =>$useremail);
					$to = array($drivermanager_email  => $drivermanager_email);
					$text = 'Order';
					$html = $msgDriverManger;
					
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

		$mail5 = new PHPMailer();

		$mail5->PluginDir = "";
		$mail5->Host = "localhost";
		$mail5->From = $rowEmail['email_from'];
		if($rowemailsettings['value']=='1'){	
			$mail5->FromName = $data->business[0]->name;
		}else{
			$mail5->FromName = $rowEmail['sitename'];
		}
		$mail5->Subject =  $lang_resource['EMAIL_DRIVER_MANAGER_MESSAGE'];


		$mail5->AddAddress($drivermanager_email);

		//$mail5->AddAddress("debabrata.universe@gmail.com");
		$mail5->MsgHTML($msgDriverManger);
		$mail5->IsHTML(true);
		$mail5->AltBody ="Order";
		$mail5->CharSet = 'UTF-8';
		$mail5->Send();
	}

		#######Mail to Driver Manager End###############

		###############Mail to Restaurant###############

		//Business email	

		$confirm_url15 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=15&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";
		$confirm_url30 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=30&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";
		$confirm_url45 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=45&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";;
		$confirm_url60 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=60&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";;
		$reject_url = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=f&rest=1&driver_email=".$driver_email."";;



		include_once "../templates/order-mailto-resturant-owner.php";
			if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
			{
						include_once "lib/swift_required.php";
						
						if($rowemailsettings['value']=='1'){	
						$useremail = $data->business[0]->name;
						}else{
						$useremail = $rowEmail['sitename'];
						}
			
					$subject =  $lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'];
					$from = array($rowEmail['email_from'] =>$useremail);
					$to = array($bus_mail  => $bus_mail);
					$text = 'Order';
					$html = $msgRest;
					
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
		

		$mail2 = new PHPMailer();

		$mail2->PluginDir = "";
		$mail2->Host = "localhost";
		$mail2->From = $rowEmail['email_from'];
		if($rowemailsettings['value']=='1'){	
			$mail2->FromName = $data->business[0]->name;
		}else{
			$mail2->FromName = $rowEmail['sitename'];
		}
		$mail2->Subject =  $lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'];

		$mail2->AddAddress($bus_mail);		

		$mail2->MsgHTML($msgRest);
		$mail2->IsHTML(true);
		$mail2->AltBody ="Order";
		$mail2->CharSet = 'UTF-8';
		$mail2->Send();
	}

		//SendMail($msgRest,'Order status '.$order->id,array($bus_mail));

		###############Mail to Restaurant Ends###############


		###############Mail to Business Owner###############

		//Business email
		
		pg_prepare($link,'sql77','SELECT DISTINCT(u.email) FROM w_users u JOIN w_business b ON(u.id=b.provider) WHERE b.id=$1');
		$result77 = pg_execute($link,'sql77',array($bus_id));
		$result77 = pg_fetch_array($result77);
		$bus_own_mail = $result77['email'];

		//echo $bus_own_mail; exit;

		//Fetch Business Owner Mail

		$confirm_url15 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=15&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";
		$confirm_url30 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=30&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";
		$confirm_url45 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=45&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";;
		$confirm_url60 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=60&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";;
		$reject_url = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=f&rest=1&driver_email=".$driver_email."";;



		include_once "../templates/order-mailto-business-owner.php";

			if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
			{
						include_once "lib/swift_required.php";
						
						if($rowemailsettings['value']=='1'){	
						$useremail = $data->business[0]->name;
						}else{
						$useremail = $rowEmail['sitename'];
						}
			
					$subject =  $lang_resource['DRIVER_BUSINESS_MESSAGE'];
					$from = array($rowEmail['email_from'] =>$useremail);
					$to = array($bus_own_mail  => $bus_own_mail);
					$text = 'Order';
					$html = $msgBus;
					
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

		$mail6 = new PHPMailer();

		$mail6->PluginDir = "";
		$mail6->Host = "localhost";
		$mail6->From = $rowEmail['email_from'];
		if($rowemailsettings['value']=='1'){	
			$mail6->FromName = $data->business[0]->name;
		}else{
			$mail6->FromName = $rowEmail['sitename'];
		}
		$mail6->Subject =  $lang_resource['DRIVER_BUSINESS_MESSAGE'];

		$mail6->AddAddress($bus_own_mail);
		//$mail6->AddAddress("debabrata.universe@gmail.com");

		$mail6->MsgHTML($msgBus);
		$mail6->IsHTML(true);
		$mail6->AltBody ="Order";
		$mail6->CharSet = 'UTF-8';
		$mail6->Send();

	}
		//SendMail($msgRest,'Order status '.$order->id,array($bus_mail));

		###############Mail to Business Owner###############



   }//end driver,drvmanger,rest mail


?>
