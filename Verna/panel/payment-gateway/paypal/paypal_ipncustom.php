<?php 

session_start();
global $lang_resource;
include "../../lib/phpmailer/PHPMailerAutoload.php";
require('../include/paymentfunction.php'); 
/*$lang_file;
			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');*/
				
			// Include the selected language file
			//include_once $lang_file;
			$lang_resource = GetLangFile();


$link = ConnectDB();	
$id = $_REQUEST['item_number'];

if(!$_REQUEST['txn_id']){
			pg_prepare($link,'sqlipnfeytch','SELECT * FROM w_orders WHERE id = $1');
			$search = pg_execute($link,'sqlipnfeytch',array($id));
			$search_row = pg_fetch_array($search);
			$tx = $search_row['paypaltx'];	
}else{
	$tx = $_REQUEST['txn_id'];	
}

pg_prepare($link,'sqlipn1','SELECT * FROM w_orders WHERE id = $1;');
						$search = pg_execute($link,'sqlipn1',array($id));
						$search_row = pg_num_rows($search);
						if($search_row == 1)
						{
 $reQ = pg_fetch_array($search);
 
 //request collection
  if($reQ['requestcollectiondata']!=''){
	 	
	   $requestcollectiondata = json_decode($reQ['requestcollectiondata'],true);
	   foreach($requestcollectiondata as $val){
		    $pid=$val["paypalid"];
			$id = $_REQUEST["item_number"];
	   }
	  
	  
 }else{
							 $order = parse($reQ['data']);
							 $pid = $reQ['paypalinfo'];
							 $id = $reQ['id'];
							 
							
 }
  if($reQ['requestcollectiondata']!=''){
							 if (!empty($pid))
								{
									$requestcollectiondata[0]["paypalid"]=$pid;
								}
							 
						 }else{
							if (!empty($pid))
								{
								$order->paypalid = $pid;
								}
						 }
			 	$requestcollectionset=false;	
		 if($reQ['requestcollectiondata']!=''){
			$requestcollectionset=true;	 
			 pg_prepare($link,'sql33','SELECT email from w_franchises WHERE lower(city)=$1');
		$result = pg_execute($link,'sql33',array(strtolower($requestcollectiondata[0]["customer_town"])));
		
		if (pg_num_rows($result)==1)  {
			while($row = pg_fetch_array($result))
				{
					
					$emails = array(
                    $row['email']
              		  );
					  
				}
		}
				 pg_prepare($link,'sql3322','SELECT email from w_users WHERE level=$1');
		$result1 = pg_execute($link,'sql3322',array(0));
			if (pg_num_rows($result1)==1)  
			while($row1 = pg_fetch_array($result1))
				{
					if(!empty($emails)){
					array_push($emails,$row1["email"]);
					}else{
						$emails = array(
                    $row1['email']
              		  );
					}
					  
				}	
			 
		 }else{					 
		pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$emails = array(
                    $emails,
                    $row['email']
                );
                if ($order->business[0]->dishes) {
                    array_push($emails, $order->buyer->email);
                }
                if ($order->reserve) {
                    array_push($emails, $order->reserve->email);
                }
				
}
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
 
$link = ConnectDB();
pg_prepare($link,'sqlbringpermissionbr','SELECT * from w_business WHERE id=$1');
$resbr = pg_execute($link,'sqlbringpermissionbr',array($order->business[0]->id));
$rowbr = pg_fetch_array($resbr);

$permission = 'BRING_PERMISSION';
pg_prepare($link,'sqlbringpermission','SELECT * from w_configs WHERE name=$1');
$res1 = pg_execute($link,'sqlbringpermission',array($permission));
$rows = pg_fetch_array($res1);

$permission2 = 'BRINGG_PERMISSION_EACH_RESTAURANT';
pg_prepare($link,'sqlbringpermissioneachRestaurant','SELECT * from w_configs WHERE name=$1');
$res2 = pg_execute($link,'sqlbringpermissioneachRestaurant',array($permission2));
$rowsnew = pg_fetch_array($res2);





if($rows['value']==1 && $rowsnew['value']==1 && ($rowbr['bringg_company_id_live']!="" && $rowbr['bringg_company_name_test']!="") )  {

include_once "../../templates/bringg-task-template.php";

}else if($rows['value']==1 && ($rowbr['bringpermission']==0 ||  $rowbr['bringpermission']==1)){

include_once "../../templates/bringg-task-template_default.php";
}

}




#########Mail Header##########
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// Additional headers
$headers .= $lang_resource['PAYMENT_GATEWAY_ALL_FROM_SITE_URL'] . "\r\n";
#####Use Mail#########
$WebAddress= 'http://'.$_SERVER['HTTP_HOST'];	

echo $Showmsg; 

 $fax_emails = array($order->business[0]->email);
 
  if($_REQUEST['txn_id']) {
	  pg_prepare($link, 'sqlpayupdate', 'UPDATE w_orders SET paypaltx=$1 WHERE id=$2');
      pg_execute($link, 'sqlpayupdate', array($_REQUEST['txn_id'],$id));

  if(isset($_REQUEST['ipn_track_id']) && ($_REQUEST['ipn_track_id']!=""))
  {
	  //code for printer
	  $relative_printer_path = "../../../orders/"; 
	  include_once "../../lib/printer-code.php";
	  
  }


  
  //Send full html email
  //SendMail1($msg, 'Order ' . $id, $emails); 
  if(!empty($emails)){
  SendMailOrder($msg,$msg_pdf,'Order ' . $id,$emails,$id);
  }
  
  /*******************************************SMS SECTION******************************************************************/
/*******************************************SMS SECTION******************************************************************/
  $twilio_phone   = $order->business[0]->twiliophone;
   $twilio_enabled = $order->business[0]->acceptsms;
		
		

 if ($twilio_enabled && $order->buyer->tel) {
            
            require_once('../../lib/sms.php');
			
			 $twilioenabledclient=0;
               $twilioenabledclient=(string)$order->twilioenabledclient;
              
            // Send sms to buyer if it was enabled when ordering
             if(($twilioenabledclient==1)) {
				 
                $smsmsg = $lang_resource['SMS_ORDER_SENT_CLIENT'] . $id;
                try {
                    sendSMS($smsmsg, '+' . $twilio_phone, '+' . $order->buyer->tel);
                }
                catch (Exception $e) {
                    if ($e->getMessage() == 'error_sms_panel_config') {
                        echo 'error_sms_panel_config';
                    }
                    echo 'error_sms_to_user';
                }
				//print_r($e->getMessage());
            }
           //echo $twilio_phone. '/' . $order->business[0]->cel;
            // Send to business
            $smsmsg = $lang_resource['SMS_ORDER_SENT_BUSINESS'] . $id;
            try {
               sendSMS($smsmsg, '+' . $twilio_phone, '+' . $order->business[0]->cel);
            }
            catch (Exception $e) {
                if ($e->getMessage() == 'error_sms_panel_config') {
                    echo ',error_sms_panel_config';
                }
                echo ',error_sms_to_business';
            }
			//print_r($e->getMessage());
        }
	
		 /*******************************************SMS SECTION******************************************************************/		
	   
	  }
  
       
		
					
				
?>
