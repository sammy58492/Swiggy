<?php
 //DO NOT REMOVE PHP TAG

		include_once "../templates/current-order-status-email.php";
		//Email From
			$rowEmail = FetchAllsettingsCustomMailchmp1();
	
	if($ost==1)
	{//REVIEW MAIL TO USER
					
	include_once "../templates/order-review-mailto-user.php";

			$mail9 = new PHPMailer();
			
			$mail9->PluginDir = "";
			$mail9->Host = "localhost";

			$mail9->From = $rowEmail['email_from'];
			$mail9->FromName = $rowEmail['sitename'];
			$mail9->Subject =  $lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'];
			//$mail9->AddAddress("orders@oos.localhost");

			$mail9->AddAddress($order->email);


			$mail9->MsgHTML($msg_rev);
			$mail9->IsHTML(true);
			$mail9->AltBody ="Order";
			$mail9->CharSet = 'UTF-8';
			$mail9->Send();


	}



			if($ost!=0)
			{//Send Mail if change in order status from pending
		$link = ConnectDB();
		$user_mail = $data->buyer->email;//User Mail
		 $bus_mail =  $business_data[0]->business[0]->email; //Restaurant Mail
		$bus_id =  $data->business[0]->id; //Bus owner mail
		pg_prepare($link,'sqlcity','SELECT email from w_franchises WHERE id=$1');
		$resultcity = pg_execute($link,'sqlcity',array($data->buyer->city));
		$rowcity = pg_fetch_array($resultcity);

		  pg_prepare($link,'sql77','SELECT DISTINCT(u.email) FROM w_users u JOIN w_business b ON(u.id=b.provider) WHERE b.id=$1');
			   $result77 = pg_execute($link,'sql77',array($bus_id));
			   $result77 = pg_fetch_array($result77);
			   $bus_own_mail = $result77['email'];

		if($driver_id)
		{
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

 

		$mail = new PHPMailer();

		$mail->PluginDir = "";
					$mail->Host = "localhost";
					$mail->From = $rowEmail['email_from'];
					$mail->FromName = $rowEmail['sitename'];
					$mail->Subject =  $lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'];
					$address=array();
					if($emailscity!=''){
						if(!in_array($emailscity,$address)){
							$mail->AddAddress($emailscity);
						array_push($address,$emailscity);
						}
					}

					if(!in_array($user_mail,$address)){
						$mail->AddAddress($user_mail);
						array_push($address,$user_mail);
					}
					if(!in_array($user_mail,$address)){
						$mail->AddAddress($bus_mail);
						array_push($address,$bus_mail);
					}
					if(!in_array($bus_own_mail,$address)){
						$mail->AddAddress($bus_own_mail);
						array_push($address,$bus_own_mail);
					}

					if($driver_id)
					{
						if(!in_array($driver_email,$address)){
							$mail->AddAddress($driver_email);
							array_push($address,$driver_email);
						}
						if(!in_array($drivermanager_email,$address)){
							$mail->AddAddress($drivermanager_email);
							array_push($address,$drivermanager_email);
						}
					}
					if(!in_array($super_mail,$address)){
						$mail->AddAddress($super_mail);
						array_push($address,$super_mail);
					}
					$mail->MsgHTML($msg);
					$mail->IsHTML(true);
					$mail->AltBody ="Order";
					$mail->CharSet = 'UTF-8';
					$mail->Send();

			}




 if($driver_id && ($ost==0))
 {
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

		 $bus_mail =  $business_data[0]->business[0]->email;

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

$mail1 = new PHPMailer();

$mail1->PluginDir = "";
			$mail1->Host = "localhost";
			$mail1->From = $rowEmail['email_from'];
			$mail1->FromName = $rowEmail['sitename'];
			$mail1->Subject =  $lang_resource['FRONT_MAIN_EMAIL_DRIVER_MESSAGE'];


				$mail1->AddAddress($driver_email);

			$mail1->MsgHTML($msgDriver);
			$mail1->IsHTML(true);
			$mail1->AltBody ="Order";
			$mail1->CharSet = 'UTF-8';
			$mail1->Send();



		 ###############Mail to Driver Ends###############

		 ############Mail to Driver Manager###########




				include_once "../templates/order-mailto-drivermanager.php";



				$mail5 = new PHPMailer();

		$mail5->PluginDir = "";
					$mail5->Host = "localhost";
					$mail5->From = $rowEmail['email_from'];
					$mail5->FromName =$rowEmail['sitename'];
					$mail5->Subject =  $lang_resource['DRIVER_MANAGER_MESSAGE'];


					$mail5->AddAddress($drivermanager_email);

					//$mail5->AddAddress("debabrata.universe@gmail.com");
					$mail5->MsgHTML($msgDriverManger);
					$mail5->IsHTML(true);
					$mail5->AltBody =$lang_resource['Order_V2'];
					$mail5->CharSet = 'UTF-8';
					$mail5->Send();


				#######Mail to Driver Manager End###############

			###############Mail to Restaurant###############

			  //Business email
			   //$bus_mail = 'debabrata.universe@gmail.com';
			   $bus_mail =  $business_data[0]->business[0]->email;

		 $confirm_url15 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=15&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";
		 $confirm_url30 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=30&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";
		 $confirm_url45 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=45&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";;
		$confirm_url60 = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=t&time=60&driver_id=".$driver_id."&rest=1&driver_email=".$driver_email."";;
		 $reject_url = $rowEmail['siteurl']."/order-confirm.php?order_id=".$order->id."&confirm=f&rest=1&driver_email=".$driver_email."";;



			   include_once "../templates/order-mailto-resturant-owner.php";

		$mail2 = new PHPMailer();

$mail2->PluginDir = "";
			$mail2->Host = "localhost";
			$mail2->From = $rowEmail['email_from'];
			$mail2->FromName = $rowEmail['sitename'];
			$mail2->Subject =  $lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'];

				$mail2->AddAddress($bus_mail);
				//$mail2->AddAddress("debabrata.universe@gmail.com");

			$mail2->MsgHTML($msgRest);
			$mail2->IsHTML(true);
			$mail2->AltBody =$lang_resource['Order_V2'];
			$mail2->CharSet = 'UTF-8';
			$mail2->Send();


		//SendMail($msgRest,'Order status '.$order->id,array($bus_mail));

		 ###############Mail to Restaurant Ends###############


             ###############Mail to Business Owner###############

	  //Business email
	   //$bus_mail = 'debabrata.universe@gmail.com';

	   $bus_id =  $data->business[0]->id;

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



		$mail6 = new PHPMailer();

$mail6->PluginDir = "";
			$mail6->Host = "localhost";
			$mail6->From = $rowEmail['email_from'];
			$mail6->FromName = $rowEmail['sitename'];
			$mail6->Subject =  $lang_resource['DRIVER_BUSINESS_MESSAGE'];

				$mail6->AddAddress($bus_own_mail);
				//$mail6->AddAddress("debabrata.universe@gmail.com");

			$mail6->MsgHTML($msgBus);
			$mail6->IsHTML(true);
			$mail6->AltBody =$lang_resource['Order_V2'];
			$mail6->CharSet = 'UTF-8';
			$mail6->Send();


		//SendMail($msgRest,'Order status '.$order->id,array($bus_mail));

		 ###############Mail to Business Owner###############



   }//end driver,drvmanger,rest mail


?>
