<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();


define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f'])
	{
	case 'MyInvoice':
		MyInvoice();
	break;
	case 'MyInvoicePayment':
		MyInvoicePayment($_POST['id']);
	break;
	case 'SaveMakePayment':
		SaveMakePayment($_POST['data']);
	break;
	case 'MyInvoicePaymentDetails':
		MyInvoicePaymentDetails($_POST['id']);
	break;
	case 'FetchInvoiceDataForPdf':
		FetchInvoiceDataForPdf($_POST['id'],$_POST['zone2']);
	break;
	case 'SaveInvoiceStatus':
		SaveInvoiceStatus($_POST['data']);
	break;
	case 'FetchAllResturantData':
		FetchAllResturantData();
		break;
	case 'SaveInvoice':
		SaveInvoice($_POST['data']);
	break;
	case 'FetchInvoiceData':
		FetchInvoiceData($_POST['id']);
	break;
	case 'SendReminder':
		Reminder($_POST['data']);
	break;
	case 'DeleteInvoice':
		DeleteInvoice($_POST['data']);
	break;
	case 'FetchInvoiceConf':
		FetchInvoiceConf();
	break;
	case 'SaveInvoiceConf':
		SaveInvoiceConf($_POST['data']);
	break;
	
	
	default:
		die();
	break;
	}

function MyInvoice(){

	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalutfran','SELECT * from w_lang_setting WHERE opdefault=1');
	$result1 = pg_execute($link,'sqldefalutfran',array());
	$rows = pg_fetch_array($result1);
	$defultlang = $rows['id'];
	
	pg_prepare($link,'sql','SELECT * from w_invoice WHERE scriptid=$1');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));

	$allinvoices = array();
	pg_prepare($link,'sql21','SELECT * from w_franchises where id=$1');
	$i =0;
	pg_prepare($link,'sqlinvoice1','SELECT currency from w_business WHERE id=$1');
	while($row = pg_fetch_array($result)){		
		$allinvoices[$i]['id'] = $row['id'];
		$allinvoices[$i]['date'] = $row['date'];
		$result1 = pg_execute($link,'sql21',array($row['city']));
		$row1 = pg_fetch_array($result1);
		$allinvoices[$i]['city'] = FetchOrdersCityLangDefault($defultlang,$row['city'],$link,$i);
		$allinvoices[$i]['resturant'] = FetchOrdersBusinessLangDefault($defultlang,$row['businessi'],$link,$i);
		$allinvoices[$i]['status'] = $row['status'];
		$allinvoices[$i]['total_invoice'] = $row['total_invoice'];
		$allinvoices[$i]['businessi'] = $row['businessi'];
		
		
		
		$result5 = pg_execute($link,'sqlinvoice1',array($row['businessi']));
		$rows5 = pg_fetch_array($result5);
		$currency = $rows5['currency'];
		$allinvoices[$i]['currency']= currency_symbol($currency);
		
		
		
		
		$allinvoices[$i]['dfrm'] = $row['dfrm'];		
		$allinvoices[$i]['tfrm'] = $row['tfrm'];
		$allinvoices[$i]['totalorder'] = $row['totalorder'];
		$allinvoices[$i]['invoicepay'] = $row['invoicepay'];

		$i = $i + 1;
	}

	$MyInvoice = array();
	if($_SESSION['user']->level < 2){
		foreach ($allinvoices as $invoice) {
			array_push($MyInvoice, $invoice);				
		}
	}else if($_SESSION['user']->level == 2){
		pg_prepare($link,'sql1','SELECT * from w_business where provider=$1');
		$result = pg_execute($link,'sql1',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result)){
			foreach ($allinvoices as $invoice) {
				if($invoice['businessi'] == $row['id']){
					array_push($MyInvoice, $invoice);
				}
			}
		}
	}

	echo  json_encode($MyInvoice);
}

function FetchOrdersCityLangDefault($defultlang,$cid,$link,$oid){

	pg_prepare($link,'sqlordercitydefalutlang'.$cid.$oid,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlordercitydefalutlang'.$cid.$oid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['city_lang'];
	
}

function FetchOrdersBusinessLangDefault($defultlang,$cid,$link,$oid){

	pg_prepare($link,'sqlorderbusinessdefalutlang'.$cid.$oid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result4 = pg_execute($link,'sqlorderbusinessdefalutlang'.$cid.$oid,array($cid,$defultlang));
	$rowss = pg_fetch_array($result4);
	return $rowss['name_lang'];
	
}


function cityname($id){
	$link = ConnectDB();
	pg_prepare($link,'sql21'.$id,'SELECT * from w_franchises where id=$1');
	$result = pg_execute($link,'sql21'.$id,array($id));
	$row = pg_fetch_array($result);
	return $row['city'];
}
function MyInvoicePayment($id){
	$link = ConnectDB();	
	pg_prepare($link,'sql','SELECT * FROM w_makepayment WHERE invoice_id=$1 ORDER BY id desc limit 1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  {
		$row = pg_fetch_array($result);
		$ad = new stdClass();
		$ad->id = $id;
		$ad->invoicepay = $row['invoicepay'];
		$ad->duepayment = $row['pdue'];	
		echo json_encode($ad);
	}else{
		
	pg_prepare($link,'sqlinn','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sqlinn',array($id));
		$row = pg_fetch_array($result);
		$ad = new stdClass();
		$ad->id = $id;
		$ad->invoicepay = $row['invoicepay'];
		$ad->duepayment = $row['invoicepay'];	
		echo json_encode($ad);
	}
}	

function FetchAllsettingsCustomMailchmp()
       {
		  // $test = require('../config.php');

       $link = ConnectDB();
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
function SaveMakePayment($data){
	$link = ConnectDB();
	$form = parse($data);
	
	$invid = $form->fields->id->value;
	$payment = $form->fields->payment->value;
	$payment =round($payment, $_SESSION['decimal_value']); 

	
	pg_prepare($link,'sql','SELECT * FROM w_makepayment WHERE invoice_id=$1 ORDER BY id DESC LIMIT 1');
	$result = pg_execute($link,'sql',array($invid));
	$rows=pg_fetch_array($result);
	$businessir=$rows['business_id'];
	if (pg_num_rows($result) > 0)  {
		$due=$rows['pdue'];			
		$pdue=$due - $payment;
		$pdue =round($pdue, $_SESSION['decimal_value']); 
		$cureentdate= date('Y-m-d H:i:s');
		pg_prepare($link,'sqlline','SELECT * FROM w_makepayment ORDER BY id DESC');
		$fetch_line = pg_execute($link,'sqlline',array());
		 if(pg_num_rows($fetch_line) == 0) { 
		  $incheck = 1;
		 } else { 
		  $all_rec= pg_fetch_array($fetch_line);
		  $incheckpre= $all_rec['id'];
		  $incheck = $incheckpre + 1;
		}


		pg_prepare($link,'sql1','SELECT * FROM w_invoice WHERE id=$1');
		$result1 = pg_execute($link,'sql1',array($invid));
		$row=pg_fetch_array($result1);
		$invoicepay=$row['invoicepay'];
		$businessi=$row['businessi'];
		$businessir=$row['businessi'];
		$totalorder=$row['totalorder'];
		$payamount=$row['payamount'] - $payment;
		$scriptid = $_SESSION['scriptid'];

		pg_prepare($link,'sql2','INSERT INTO w_makepayment(id,business_id,invoice_id,invoicepay,total_invoiceitem,payment,pdue,date,scriptid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
		 $fetch_insert = pg_execute($link,'sql2',array($incheck,$businessi,$invid,$invoicepay,$totalorder,$payment,$pdue,$cureentdate,$scriptid));
		
		pg_prepare($link,'sqlf','SELECT invoicepay,payment,pdue from w_makepayment where id=$1');
		$resultf = pg_execute($link,'sqlf',array($incheck));

		/*pg_prepare($link,'sqlpay','update w_invoice set payamount=$1 where id=$2');
		$fetch_insertu = pg_execute($link,'sqlpay',array($payamount,$invid));	*/

		/*$rowf=pg_fetch_array($resultf);
		if($rowf['pdue'] == 0 ){
			pg_prepare($link,'sqlu','update w_invoice set status=1 where id=$1');
			$fetch_insertu = pg_execute($link,'sqlu',array($invid));		
		} */
		
		
	}else{
		pg_prepare($link,'sqlline','SELECT * FROM w_makepayment ORDER BY id DESC');
		$fetch_line = pg_execute($link,'sqlline',array());
		 if(pg_num_rows($fetch_line) == 0) { 
		  $incheck = 1;
		 } else { 
		  $all_rec= pg_fetch_array($fetch_line);
		  $incheckpre= $all_rec['id'];
		  $incheck = $incheckpre + 1;
		}
		
		
		pg_prepare($link,'sql1','SELECT * FROM w_invoice WHERE id=$1');
		$result1 = pg_execute($link,'sql1',array($invid));
		$row=pg_fetch_array($result1);
		$invoicepay=$row['invoicepay'];
		$businessi=$row['businessi'];
		$businessir=$row['businessi'];
		$totalorder=$row['totalorder'];
		$payamount=$row['payamount'] - $payment;
		echo $invoicepay;
		echo 1;
		echo $payment;
		echo 2;
		$pdue = $invoicepay - $payment;
		echo $pdue;
		echo 3;
		$pdue =round($pdue, $_SESSION['decimal_value']); 
		 $cureentdate= date('Y-m-d H:i:s');
		 $scriptid = $_SESSION['scriptid'];
		 pg_prepare($link,'sql2','INSERT INTO w_makepayment(id,business_id,invoice_id,invoicepay,total_invoiceitem,payment,pdue,date,scriptid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
		 $fetch_insert = pg_execute($link,'sql2',array($incheck,$businessi,$invid,$invoicepay,$totalorder,$payment,$pdue,$cureentdate,$scriptid));
						
		pg_prepare($link,'sqlf','select invoicepay,payment from w_makepayment where invoice_id=$1');
		$resultf = pg_execute($link,'sqlf',array($invid));	

	/*	pg_prepare($link,'sqlpay','update w_invoice set payamount=$1 where id=$2');
		$fetch_insertu = pg_execute($link,'sqlpay',array($payamount,$invid));	*/

		$rowf=pg_fetch_array($resultf);
		if($rowf['invoicepay'] == $rowf['payment'] ){
			pg_prepare($link,'sqlu','update w_invoice set status=1 where id=$1');
			$fetch_insertu = pg_execute($link,'sqlu',array($invid));		
		} 
		
	}
	echo $businessir;
	
}


function MyInvoicePaymentDetails($id){
	$link = ConnectDB();	
	pg_prepare($link,'sql','SELECT * FROM w_makepayment WHERE invoice_id=$1');
	$result = pg_execute($link,'sql',array($id));
	$invoicepayment = array();
	if (pg_num_rows($result)>0)  {
		$i =0;
		while($row = pg_fetch_array($result)){
			$invoicepayment[$i]['id'] = $row['id'];

			pg_prepare($link,'sql1'.$i,'SELECT * from w_business where id=$1');
			$result1 = pg_execute($link,'sql1'.$i,array($row['business_id']));
			$row1=pg_fetch_array($result1);

			$invoicepayment[$i]['business_id'] = $row['business_id'];
			$invoicepayment[$i]['business_name'] = $row1['name'];
			$invoicepayment[$i]['invoice_id'] = $row['invoice_id'];	
			$invoicepayment[$i]['invoicepay'] = $row['invoicepay'];
			$invoicepayment[$i]['total_invoiceitem'] = $row['total_invoiceitem'];
			$invoicepayment[$i]['payment'] = $row['payment'];
			$invoicepayment[$i]['pdue'] = $row['pdue'];	
			$invoicepayment[$i]['date'] = $row['date'];	
			$i = $i + 1;
		}
	}
	echo json_encode($invoicepayment);
}

function FetchInvoiceDataForPdf($id,$zone2){

	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	pg_prepare($link,'sqlinvoice2','SELECT currency from w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)
		$row = pg_fetch_array($result);
			//unset($ad);
			$ad = new stdClass();
			$ad->id = $row['id'];
			$date1 = $row['date'];
			date_default_timezone_set($zone2);
			$ad->date = date("d-m-Y", strtotime($date1));
			$ad->city = $row['city'];
			$ad->resturant = $row['resturant'];
			$ad->status = $row['status'];
			$ad->admin_comment = $row['admin_comment'];
			$ad->comment = $row['comment'];
			$ad->total_invoice = $row['total_invoice'];
			$businessi = $row['businessi'];
			
			
			$result5 = pg_execute($link,'sqlinvoice2',array($row['businessi']));
			$rows5 = pg_fetch_array($result5);
			$currency = $rows5['currency'];
			$ad->currency = currency_symbol($currency);
			
		
			$ad->billing = $row['billing'];
			$ad->setuprate = $row['setuprate'];
			$ad->fixedrate = $row['fixedrate'];
			$ad->perordercommission = $row['perordercommission'];
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			$ad->dfrm =date("d-m-Y", strtotime($row['dfrm']));
			$ad->dto = date("d-m-Y", strtotime($row['tfrm']));
			$ad->periodp = date("d-m-Y", strtotime($row['dfrm'])). 'To' . date("d-m-Y", strtotime($row['tfrm']));
			$ad->totalorder = $row['totalorder'];
			$tmpcount = $row['count'];
			$tmptotal = $row['total'];
			$tmptotal =  json_decode($tmptotal);
			$tmpcount =  json_decode($tmpcount);
			$ad->cashcount =$tmpcount->cash;
			$ad->cardcount = $tmpcount->card;
			$ad->paypalcount = $tmpcount->paypal;
			$ad->cashtotal = $tmptotal->cash;
			$ad->cardtotal = $tmptotal->card;
			$ad->paypaltotal = $tmptotal->paypal;

			pg_prepare($link,'sqld3',"SELECT street,colony,vatregistration,tel FROM w_business where id=$businessi ORDER BY id DESC");
			$fetch_busi = pg_execute($link,'sqld3',array());
			$rsb = pg_fetch_array($fetch_busi);
			$ad->streetb = $rsb['street'];
			$ad->colonyb = $rsb['colony'];
			$ad->telb = $rsb['tel'];
			$ad->vatregistration = $rsb['vatregistration'];
			
			unset($result);
			unset($row);

			$incid=1;
			pg_prepare($link,'sql1','SELECT * FROM w_invoiceconf WHERE id=$1');
			$result = pg_execute($link,'sql1',array($incid));
			$row = pg_fetch_array($result);

			$ad->iid = $row['id'];
			$ad->wbmail = $row['wbmail'];
			$ad->wurl = $row['wurl'];
			$ad->address = $row['address'];
			$ad->phone = $row['phone'];
			$ad->payby = $row['payby'];
			switch ($ad->payby){
				case '1':
					$ad->pay = 'Bank';
				break;
				case '2':
					$ad->pay = 'Paypal';
				break;
			}
			$ad->bankname = $row['bankname'];
			$ad->bankac = $row['bankac'];
			$ad->routineno = $row['routineno'];
			$ad->swiftcode = $row['swiftcode'];
			$ad->vatpaypalemail = $row['vatpaypalemail'];
			$ad->ctext = $row['ctext'];
			$ad->isimg = $row['isimg'];

			pg_prepare($link,'sqlmp','SELECT * FROM w_makepayment WHERE invoice_id=$1');
			$result1 = pg_execute($link,'sqlmp',array($id));
			$mpayment = array();
			while($row1 = pg_fetch_array($result1)){
				//unset($makepayment);
				$makepayment = new stdClass();
				$makepayment->mpid	 = $row1['id'];
				$makepayment->mpdate	 = $row1['date'];
				$makepayment->mpinvoicepay	 = $row1['invoicepay'];
				$makepayment->payment = $row1['payment'];
				$makepayment->pdue = $row1['pdue'];
				array_push($mpayment,$makepayment);
			}
			$ad->mapayment = $mpayment;

			unset($result);
			unset($row);

			$ad->orderrate =$ad->perorderfixedrate * $ad->totalorder;
			$ad->orderrate =round($ad->orderrate, $_SESSION['decimal_value']);

			$ad->commisioncal = ($ad->perordercommission/100) * $ad->total_invoice;
			$ad->commisioncal =round($ad->commisioncal, $_SESSION['decimal_value']);
			$ad->tmptotal = $ad->commisioncal + $ad->setuprate + $ad->fixedrate + $ad->orderrate + $ad->otherrate;
			$ad->tmptotal =round($ad->tmptotal, $_SESSION['decimal_value']);

			$ad->vatp = ($ad->vat/100) * $ad->tmptotal;
			$ad->vatp =round($ad->vatp, $_SESSION['decimal_value']);
			$ad->totalbalance = $ad->tmptotal + $ad->vatp;
			$ad->totalbalance =round($ad->totalbalance, $_SESSION['decimal_value']);


			$ad->totalinvoicedue = 0;
			pg_prepare($link,'sqlmpb','SELECT * FROM w_makepayment WHERE business_id=$1 and invoice_id != $2');
			$result2 = pg_execute($link,'sqlmpb',array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;
			$ad->totalpay =round($ad->totalpay, $_SESSION['decimal_value']);

	echo json_encode($ad);
}

function SaveInvoiceStatus($data){

	$form = parse($data);
	$id = $form->id;
	$link = ConnectDB();

	//save the invoice status to the db

	$status = $form->fields->status->value;
	$admin_comment = $form->fields->admin_comment->value;
	$comment = $form->fields->comment->value;
	pg_prepare($link,'sqlinvoicestatus','update w_invoice set status=$2,admin_comment=$3,comment=$4 where id=$1');
	
	if(pg_execute($link,'sqlinvoicestatus',array($id,$status,$admin_comment,$comment))){
	
		pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		$row = pg_fetch_array($result);
		$resturant = $row['resturant'];
				
		switch ($form->fields->status->value){			
			case '0':
				$invoice->status = "Pending Payment to OOS";
				
			break;
			case '1':
				$invoice->status = "Pending Payment to $resturant";
				
			break;
			case '2':
				$invoice->status = "Paid to OOS";
				
			break;
			case '3':
				$invoice->status = "Paid to $resturant";
				
			break;
			case '4':
				$invoice->status = "Cancelled";
				
			break;
		}
	
		include '../templates/invoice_status_email.php';	

		pg_prepare($link,'sqld3',"SELECT email FROM w_business where id=(SELECT businessi FROM w_invoice where id=$1)");
		$fetch_busi = pg_execute($link,'sqld3',array($id));
		$rsb = pg_fetch_array($fetch_busi);
		$ad->email=$rsb['email'];
		
		pg_prepare($link,'sqlP',"SELECT * FROM w_users where id IN(SELECT provider FROM w_business where id=(SELECT businessi FROM w_invoice where id=$1))");			
		$fetch_prov = pg_execute($link,'sqlP',array($id));
		$rsP = pg_fetch_array($fetch_prov);
		$ad->email2=$rsP['email'];

		pg_prepare($link,'sqlconfigemail_from'.$id,'SELECT * FROM w_configs WHERE name=$1');
		$resultconfigemail_from = pg_execute($link,'sqlconfigemail_from'.$id,array('email_from'));
		$rowconfigemail_from = pg_fetch_array($resultconfigemail_from);

		pg_prepare($link,'sqlconfigsitename'.$id,'SELECT * FROM w_configs WHERE name=$1');
		$resultconfigsitename = pg_execute($link,'sqlconfigsitename'.$id,array('sitename'));
		$rowconfigsitename = pg_fetch_array($resultconfigsitename);
		
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
		include_once "lib/swift_required.php";
				
				if($ad->email2!=""){
				 $mailer[$ad->email2]=$ad->email2;
				}
				if($ad->email!=""){
				 $mailer[$ad->email]=$ad->email;
				}
				
				

				$subject = "Invoice";
				$from = array($rowconfigemail_from['value'] =>$rowconfigsitename['value']);
				$to = $mailer;
				
				$text = "Invoice Status";
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

		require "class.phpmailer.php";	
		$row = FetchAllsettingsCustomMailchmp();			
		$mail = new PHPMailer();
		$mail->PluginDir = "";
		$mail->Host = "localhost";
		$mail->From = $rowconfigemail_from['value'];
		$mail->FromName = $rowconfigsitename['value'];		
		$mail->Subject =  "Invoice";	
		if($ad->email2!=""){
		 $mail->AddAddress($ad->email2);
		}
		if($ad->email!=""){
		 $mail->AddAddress($ad->email);
		}
		$mail->MsgHTML($msg);
		$mail->IsHTML(true);
		$mail->AltBody ="Invoice Status";
		$mail->CharSet = 'UTF-8';
		$mail->Send();
	}
}
}
function FetchAllResturantData(){
	SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sqldefalut','SELECT * from w_lang_setting WHERE opdefault=1');
	$result4 = pg_execute($link,'sqldefalut',array());
	$rows = pg_fetch_array($result4);
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
	$defultlang = $rows['id'];
	}else{
	$defultlang = $_SESSION['admin_lang'];	
	}
	
	pg_prepare($link,'sql31','SELECT * from w_business where scriptid=$1');
	$result = pg_execute($link,'sql31',array($_SESSION['scriptid']));
	$returants = array();
	while($row = pg_fetch_array($result)){
		unset($returant);
		$returant = new stdClass();
		$returant->id = $row['id'];
		$returant->caption = FetchBusinessInvoiceLangDefault($defultlang,$row['id'],$link);
		if($returant->caption !=null)
		array_push($returants,$returant);
	}
	echo json_encode($returants);
}

function FetchBusinessInvoiceLangDefault($defultlang,$cid,$link){
	pg_prepare($link,'sqldefalutlang88'.$cid,'SELECT * from w_business_lang WHERE business_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang88'.$cid,array($cid,$defultlang));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}

function SaveInvoice($data){
	SuperAdminsOnly();	
	$link = ConnectDB();
	$form = parse($data);
	$adid = $form->id;	
	/*------- fetch email permission ------------*/
	$scriptid = $_SESSION['scriptid'];
	pg_prepare($link,'create_invoice','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
	$create_invoice_res = pg_execute($link,'create_invoice',array('CREATE_INVOICE_EMAIL',$scriptid));
	$create_invoice_row = pg_fetch_array($create_invoice_res);
	$create_invoice_status = $create_invoice_row['status'];
	/*------- fetch email permission ------------*/
				
	if ($form->type=='create'){
		$datefrom = $form->fields->dfrm->value;
		$dateto = $form->fields->tfrm->value;
		/* ........................ Convert m-d-y -> y-m-d .......................................*/
		$datefromc = date("Y-m-d", strtotime($datefrom));
		$datetoc = date("Y-m-d", strtotime($dateto));
		$datetoc = $datetoc.' 24:00:00';
		/* ........................ Convert m-d-y -> y-m-d .......................................*/

		pg_prepare($link,'sqld1',"SELECT id,date,data FROM w_orders where date between '$datefromc' and '$datetoc' and invoicestatus=0 and status=1 ORDER BY id DESC");
		$fetch_order = pg_execute($link,'sqld1',array());
		if(pg_num_rows($fetch_order)==0){
			echo "cancel";
			exit;
		}else{
			$totalval=0;
			$totalorder=0;
			$cashcount=0;
			$cardcount=0;
			$paypalcount=0;
			$cashtotal=0;
			$cardtotal=0;
			$paypaltotal=0;
			$order_id = array();
			pg_prepare($link,'sqli','update w_orders set invoicestatus=1 WHERE id=$1');
			while($rs = pg_fetch_array($fetch_order) ) {
				$dataa=$rs['data'];
				$dataa=json_decode($dataa);
				$business = $form->fields->businessi->value;

				if($dataa->business[0]->id == $business){
					if($dataa->business[0]->paymethod->cash == true){
						$cashcount = $cashcount+1;
						$cashtotal +=$dataa->total;
						$cashtotal =round($cashtotal, $_SESSION['decimal_value']);
					}

					if($dataa->business[0]->paymethod->card == true){
						$cardcount = $cardcount+1;
						$cardtotal +=$dataa->total;
						$cardtotal =round($cardtotal, $_SESSION['decimal_value']);
					}
					if($dataa->business[0]->paymethod->paypal == true){
						$paypalcount = $paypalcount+1;
						$paypaltotal +=$dataa->total;
						$paypaltotal =round($paypaltotal, $_SESSION['decimal_value']);
					}

					$totalorder = $totalorder+1;
					array_push($order_id,$rs['id']);
					pg_execute($link,'sqli',array($rs['id']));
				}
			}
			$count=array("cash"=>$cashcount,"card"=>$cardcount,"paypal"=>$paypalcount);
			$total=array("cash"=>$cashtotal,"card"=>$cardtotal,"paypal"=>$paypaltotal);					
			$totalval =$cashtotal + $cardtotal + $paypaltotal;
			$totalval =round($totalval, $_SESSION['decimal_value']);

			if($totalval != 0){				
				$business = $form->fields->businessi->value;
				pg_prepare($link,'sqld3',"SELECT city,name FROM w_business where id=$business ORDER BY id DESC");
				$fetch_busi = pg_execute($link,'sqld3',array());
				$rsb = pg_fetch_array($fetch_busi);
				$bcity=$rsb['city'];
				$resturantname=$rsb['name'];

				pg_prepare($link,'sqld4','SELECT * FROM w_invoice ORDER BY id DESC');
				$fetch_record = pg_execute($link,'sqld4',array());
				if(pg_num_rows($fetch_record) == 0) {
					$incheck = 1;
				}else{					
					$all_rec= pg_fetch_array($fetch_record);
					$incheckpre= $all_rec['id'];
					$incheck = $incheckpre + 1;
				}
				$billing = $form->fields->billing->value;
				if($billing == 2){
					$setuprate = $form->fields->setuprate->value;
					$fixedrate = $form->fields->fixedrate->value;
					$perordercommission	 = $form->fields->perordercommission->value;
					$perorderfixedrate = $form->fields->perorderfixedrate->value;
					$vat = $form->fields->vat->value;
					$otherrate = $form->fields->otherrate->value;
				}else{
					$business = $form->fields->businessi->value;
					pg_prepare($link,'sqlfb',"SELECT billingfxprice,fixedrate,billingperorder,billingperorderfixrate,vat,otherrate FROM w_business where id=$business ORDER BY id DESC");
					$fetch_bus = pg_execute($link,'sqlfb',array());
					$rsbu = pg_fetch_array($fetch_bus);
					$setuprate =$rsbu['billingfxprice'];
					$fixedrate = $rsbu['fixedrate'];
					$perordercommission	 = $rsbu['billingperorder'];
					$perorderfixedrate = $rsbu['billingperorderfixrate'];
					$vat = $rsbu['vat'];
					$otherrate = $rsbu['otherrate'];
				}

				$orderrate =$perorderfixedrate * $totalorder;
				$orderrate =round($orderrate, $_SESSION['decimal_value']);
				$commisioncal = ($perordercommission/100) * $totalval;
				$commisioncal =round($commisioncal, $_SESSION['decimal_value']);
				$tmptotal = $commisioncal + $setuprate + $fixedrate + $orderrate + $otherrate;
				$tmptotal =round($tmptotal, $_SESSION['decimal_value']);
				$vatp = ($vat/100) * $tmptotal;
				$vatp =round($vatp, $_SESSION['decimal_value']);
				$totalbalance1 = $tmptotal + $vatp;
				$totalbalance1 =round($totalbalance1, $_SESSION['decimal_value']);
				$scriptid = $_SESSION['scriptid'];
				$cureentdate= date('Y-m-d H:i:s');
				pg_prepare($link,'sqld2','INSERT INTO w_invoice (id,city,businessi,dfrm,tfrm,billing,setuprate,fixedrate,perordercommission,perorderfixedrate,otherrate,total_invoice,resturant,date,totalorder,orderid,count,total,vat,invoicepay,scriptid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)');
				$fetch_insert = pg_execute($link,'sqld2',array($incheck,$bcity,$business,$datefromc,$datetoc,$billing,$setuprate,$fixedrate,$perordercommission,$perorderfixedrate,$otherrate,$totalval,$resturantname,$cureentdate,$totalorder,json_encode($order_id),json_encode($count),json_encode($total),$vat,$totalbalance1,$scriptid));
				$adids =array($incheck);
				if($create_invoice_status == 't')
				{
					SendReminder($adids);				
				}//end of fetch email permission
			}else{
				echo "cancel"; 
				exit;
			}
		}
	}else{
		$datefrom = $form->fields->dfrm->value;
		$dateto = $form->fields->tfrm->value;
		/* ........................ Convert m-d-y -> y-m-d .......................................*/
		$datefromc = date("Y-m-d", strtotime($datefrom));
		$datetoc = date("Y-m-d", strtotime($dateto));
		$datetoc = $datetoc.' 24:00:00';
		/* ........................ Convert m-d-y -> y-m-d .......................................*/

		pg_prepare($link,'sqld1',"SELECT id,date,data FROM w_orders where date between '$datefromc' and '$datetoc' and  status=1 ORDER BY id DESC");
		$fetch_order = pg_execute($link,'sqld1',array());
		if(pg_num_rows($fetch_order)==0){			
			echo "cancel";
			exit;
		}else{
			$totalval=0;
			$totalorder=0;
			$cashcount=0;
			$cardcount=0;
			$paypalcount=0;
			$cashtotal=0;
			$cardtotal=0;
			$paypaltotal=0;
			$order_id = array();
			pg_prepare($link,'sqli','update w_orders set invoicestatus=1 WHERE id=$1');
			while($rs = pg_fetch_array($fetch_order)){
				$dataa=$rs['data'];
				$dataa=json_decode($dataa);
				$business = $form->fields->businessi->value;

				if($dataa->business[0]->id == $business){
					if($dataa->business[0]->paymethod->cash == true){
						$cashcount = $cashcount+1;
						$cashtotal +=$dataa->total;
						$cashtotal =round($cashtotal, $_SESSION['decimal_value']);
					}
					if($dataa->business[0]->paymethod->card == true){
						$cardcount = $cardcount+1;
						$cardtotal +=$dataa->total;
						$cardtotal =round($cardtotal, $_SESSION['decimal_value']);
					}
					if($dataa->business[0]->paymethod->paypal == true){
						$paypalcount = $paypalcount+1;
						$paypaltotal +=$dataa->total;
						$paypaltotal =round($paypaltotal, $_SESSION['decimal_value']);
					}
					$totalorder = $totalorder+1;
					array_push($order_id,$rs['id']);
					pg_execute($link,'sqli',array($rs['id']));
				}
			}
			$count=array("cash"=>$cashcount,"card"=>$cardcount,"paypal"=>$paypalcount);
			$total=array("cash"=>$cashtotal,"card"=>$cardtotal,"paypal"=>$paypaltotal);
			$totalval =$cashtotal + $cardtotal + $paypaltotal;
			$totalval =round($totalval, $_SESSION['decimal_value']);
			if($totalval != 0){				
				$business = $form->fields->businessi->value;
				pg_prepare($link,'sqld3',"SELECT city,name FROM w_business where id=$business ORDER BY id DESC");
				$fetch_busi = pg_execute($link,'sqld3',array());
				$rsb = pg_fetch_array($fetch_busi);
				$bcity=$rsb['city'];
				$resturantname=$rsb['name'];
				$billing = $form->fields->billing->value;
				if($billing == 2){
					$setuprate = $form->fields->setuprate->value;
					$fixedrate = $form->fields->fixedrate->value;
					$perordercommission	 = $form->fields->perordercommission->value;
					$perorderfixedrate = $form->fields->perorderfixedrate->value;
					$vat = $form->fields->vat->value;
					$otherrate = $form->fields->otherrate->value;
				}else{					
					$business = $form->fields->businessi->value;
					pg_prepare($link,'sqlfb',"SELECT billingfxprice,fixedrate,billingperorder,billingperorderfixrate,vat,otherrate FROM w_business where id=$business ORDER BY id DESC");
					$fetch_bus = pg_execute($link,'sqlfb',array());
					$rsbu = pg_fetch_array($fetch_bus);
					$setuprate =$rsbu['billingfxprice'];
					$fixedrate = $rsbu['fixedrate'];
					$perordercommission	 = $rsbu['billingperorder'];
					$perorderfixedrate = $rsbu['billingperorderfixrate'];
					$vat = $rsbu['vat'];
					$otherrate = $rsbu['otherrate'];
				}
				$cureentdate= date('Y-m-d H:i:s');
				$orderrate =$perorderfixedrate * $totalorder;
				$orderrate =round($orderrate, $_SESSION['decimal_value']);

				$commisioncal = ($perordercommission/100) * $totalval;
				$commisioncal =round($commisioncal, $_SESSION['decimal_value']);
				$tmptotal = $commisioncal + $setuprate + $fixedrate + $orderrate + $otherrate;
				$tmptotal =round($tmptotal, $_SESSION['decimal_value']);

				$vatp = ($vat/100) * $tmptotal;
				$vatp =round($vatp, $_SESSION['decimal_value']);
				$totalbalance1 = $tmptotal + $vatp;
				$totalbalance1 =round($totalbalance1, $_SESSION['decimal_value']);

				pg_prepare($link,'sqld2','update w_invoice set city=$2,total_invoice=$3,resturant=$4,totalorder=$5,orderid=$6,count=$7,total=$8,invoicepay=$9,businessi=$10,setuprate=$11,fixedrate=$12,perordercommission=$13,perorderfixedrate=$14,otherrate=$15,date=$16,vat=$17,billing=$18 where id=$1');
				$fetch_insert = pg_execute($link,'sqld2',array($adid,$bcity,$totalval,$resturantname,$totalorder,json_encode($order_id),json_encode($count),json_encode($total),$totalbalance1,$business,$setuprate,$fixedrate,$perordercommission,$perorderfixedrate,$otherrate,$cureentdate,$vat,$billing));
				$adids =array($adid);
				
				
				if($create_invoice_status == 't')
				{
					SendReminder($adids);
				}//fetch email permission
				
			}else{
				echo "cancel"; 
				exit;
			}
		}
	}
}

function FetchInvoiceData($id){
	SuperAdminsOnly();
	$link = ConnectDB();
	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result)){
			$ad = new stdClass();
			$ad->id = $row['id'];
			$ad->date = $row['date'];
			$ad->city = $row['city'];
			$ad->resturant = $row['resturant'];
			$ad->status = $row['status'];
			$ad->total_invoice = $row['total_invoice'];
			$ad->businessi = $row['businessi'];
			$ad->billing = $row['billing'];
			$ad->setuprate = $row['setuprate'];
			$ad->fixedrate = $row['fixedrate'];
			$ad->perordercommission = $row['perordercommission'];
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			$dfrm = $row['dfrm'];
			$parts = explode('-',$dfrm);
			$ad->dfrm =$parts[1] . '/' . $parts[2] . '/' . $parts[0];
			$dto = $row['tfrm'];
			$partst = explode('-',$dto);
			$ad->tfrm = $partst[1] . '/' . $partst[2] . '/' . $partst[0];
			$ad->totalorder = $row['totalorder'];
		}
	echo json_encode($ad);
}
function DeleteInvoice($data){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id){
		pg_prepare($link,'sql2','SELECT orderid FROM w_invoice WHERE id = $1');
		$result2 = pg_execute($link,'sql2',array($id));
		$row2 = pg_fetch_array($result2);
		$orderid = $row2['orderid'];
		//echo $orderid;//["20","19","5"]
		$orderid = json_decode($orderid);
		pg_prepare($link,'sql3','UPDATE w_orders SET invoicestatus = 0 WHERE id = $1');
		foreach($orderid as $id1){
			pg_execute($link,'sql3',array($id1));
			}
		pg_prepare($link,'sql1','DELETE FROM w_invoice WHERE id=$1');
		$result = pg_execute($link,'sql1',array($id));
	}
	pg_close($link);
}
function Reminder($data){
	SuperAdminsOnly();
	$link = ConnectDB();		
	$data = parse($data);
	$ids =array();
	foreach ($data->ids as $id){
		array_push($ids, $id);
	}
	SendReminder($ids);
}

function SendReminder($ids){
	SuperAdminsOnly();
	include("../pdf/dompdf_config.inc.php");
	
	$link = ConnectDB();

	foreach($ids as $id){
		unset($html);
		/*PDF CONTENT*/
		require 'invoice_pdf_template.php';

		/*PDF CREATE*/	
		$pdf = new stdClass;	
		$dompdf = new DOMPDF();
		$dompdf->load_html($html);
		$dompdf->render();
		$dompdf->set_paper("A4","portrait");
		$date=date("Y-m-d H:i:s");
		$file_name=$fetch->invo;
		$pdf = $dompdf->output();
		file_put_contents("../temp_pdf/invoice.pdf", $pdf);
		//$dompdf->stream($file_name."invoice.pdf");

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
	pg_prepare($link,'reminder_invoice','SELECT * FROM w_configs_email WHERE name = $1 AND scriptid = $2');
	$reminder_invoice_res = pg_execute($link,'reminder_invoice',array('REMINDER_INVOICE',$scriptid));
	$reminder_invoice_row = pg_fetch_array($reminder_invoice_res);
	$reminder_invoice_status = $reminder_invoice_row['status'];
	//echo "======================= reminder_invoice_status ================== $reminder_invoice_status";
	/*------- fetch email permission ------------*/
	if($reminder_invoice_status == 't')
	{

	if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
	{
		include_once "lib/swift_required.php";
				
			
				if($ad->email3!=""){
					$mailer[$ad->email3]=$ad->email3;
					
				}
				if($ad->email2!=""){
					$mailer[$ad->email2]=$ad->email2;
				}
				if($ad->email!=""){
					$mailer[$ad->email]=$ad->email;
				}

				$subject = $lang_resource['INVOICE_PDF_INVOICE'];
				$from = array($rowconfigemail_from['value'] =>$rowconfigsitename['value']);
				$to = $mailer;
				$text = "Order";
				$html = $html;
				
				$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
				$transport->setUsername($rowsp4['value']);
				$transport->setPassword($rowsp5['value']);
				$swift = Swift_Mailer::newInstance($transport);
				
				$message = new Swift_Message($subject);
				
				$message->attach(Swift_Attachment::fromPath('../temp_pdf/invoice.pdf'));
				
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
				 $success = 1;
				}
	}
	else{
		
		
		include_once('phpmailer/PHPMailerAutoload.php');
			//include_once('class.phpmailer.php');
	
			
			$mail = new PHPMailer();	
			$mail->PluginDir = "";
			$mail->Host = "localhost";
			
			$mail->From = $rowconfigemail_from['value'];
			$mail->FromName = $rowconfigsitename['value'];
			$mail->Subject = $lang_resource['INVOICE_PDF_INVOICE'];
			print_r($ad);
			if($ad->email3!=""){
			$mail->AddAddress($ad->email3);
			}
			if($ad->email2!=""){
				$mail->AddAddress($ad->email2);
			}
			if($ad->email!=""){
				$mail->AddAddress($ad->email);
			}
				
				
			$mail->MsgHTML($html);
			$mail->IsHTML(true);
			
			
			$mail->AddAttachment("../temp_pdf/invoice.pdf",$id."_invoice.pdf");
			$mail->AltBody ="Order";
			$mail->CharSet = 'UTF-8';
			$try = 1;
			$success = $mail->Send();
			if($success == 1) {
			 echo "ok";
			} 

			while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
			{
			sleep(5);
			$success = $mail->Send();
			$try++;
			}
			
			$mail->ClearAddresses();
		
	
		
		
		
		
		/*

		
		require "class.phpmailer.php";	
		$mail = new PHPMailer();
		//file_put_contents("../temp_pdf/invoice.pdf", $pdf);
		
		$mail->PluginDir = "";
		$mail->Host = "localhost";
		$mail->From = $rowconfigemail_from['value'];
		$mail->FromName = $rowconfigsitename['value'];
		$mail->Subject = $lang_resource['INVOICE_PDF_INVOICE'];
		if($ad->email3!=""){
			$mail->AddAddress($ad->email3);
		}
		if($ad->email2!=""){
			$mail->AddAddress($ad->email2);
		}
		if($ad->email!=""){
			$mail->AddAddress($ad->email);
		}
		$mail->MsgHTML($html);
		$mail->IsHTML(true);
		$mail->AddAttachment("../temp_pdf/invoice.pdf",$id."_invoice.pdf");
		$mail->AltBody ="Order";
		$mail->CharSet = 'UTF-8';
		$mail->Send();
	*/}
		unlink("../temp_pdf/invoice.pdf");	
	}//end of fetch email permission
		pg_close($link);
	}
}

function FetchInvoiceConf(){
	SuperAdminsOnly();	
	$link = ConnectDB();
	$id=1;
	pg_prepare($link,'sql','SELECT * FROM w_invoiceconf WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result)){
			//unset($ad);
			$ad = new stdClass();
			$ad->id = $row['id'];
			$ad->wbmail = $row['wbmail'];
			$ad->wurl = $row['wurl'];
			$ad->address = $row['address'];
			$ad->phone = $row['phone'];
			$ad->payby = $row['payby'];
			$ad->bankname = $row['bankname'];
			$ad->bankac = $row['bankac'];
			$ad->routineno = $row['routineno'];
			$ad->swiftcode = $row['swiftcode'];
			$ad->vatpaypalemail = $row['vatpaypalemail'];
			$ad->ctext = $row['ctext'];
			$ad->isimg = $row['isimg'];
		}
		echo json_encode($ad);
}

function SaveInvoiceConf($data){
	SuperAdminsOnly();
	require('../config.php');
	$form = parse($data);
	$usrid = $form->id;

	if ($form->type=='create')
		$usrid = InsertQuery('w_invoiceconf',$form->fields,$CFG);
	else
		UpdateQuery('w_invoiceconf',$form->fields,$form->id,$CFG);

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image){
		$oldname = $CFG->dir.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'invoice/',$oldname,$usrid);

		$link = ConnectDB();
		pg_prepare($link,'sql','UPDATE w_invoiceconf SET isimg=$1 WHERE id=$2');
		pg_execute($link,'sql',array(1,$usrid));
		pg_close($link);

	}else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	if ($form->type=='create'){
		$link = ConnectDB();
		pg_prepare($link,'sql','UPDATE w_invoiceconf SET isimg=$1 WHERE id=$2');
		pg_execute($link,'sql',array(0,$usrid));
		pg_close($link);
	}
	echo "ok";
}

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder=''){
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'normal.jpg';
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder))
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require('resize.php');
	if ($ext=='png'){//if png convert it to jpg
	
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);


		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);

		$image2 = new SimpleImage();
		$image2->load($finalname);
		$image2->resize(22,22);

		$image3 = new SimpleImage();
		$image3->load($finalname);
		$image3->resize(290,70);

		$image4 = new SimpleImage();
		$image4->load($finalname);
		$image->resize(205,214);


		$image->save($folder.'medium.jpg');
		$image2->save($folder.'mini.jpg');
		$image3->save($folder.'small.jpg');
		$image4->save($folder.'full.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);

		$image2 = new SimpleImage();
		$image2->load($finalname);
		$image2->resize(22,22);

		$image3 = new SimpleImage();
		$image3->load($finalname);
		$image3->resize(290,70);

		$image4 = new SimpleImage();
		$image4->load($finalname);
		$image->resize(205,214);

		$image->save($folder.'medium.jpg');
		$image2->save($folder.'mini.jpg');
		$image3->save($folder.'small.jpg');
		$image4->save($folder.'full.jpg');
	}
}

function currency_symbol($sitecurrency){
	if($sitecurrency == 'AED'){
	return 'AED';			
	}
	if($sitecurrency == 'USD'){
	return '$';			
	}
	if($sitecurrency == 'EUR'){
	return '€';			
	}
	if($sitecurrency == 'MXN'){
	return '$';			
	}
	if($sitecurrency == 'AUD'){
	return '$';			
	}
	if($sitecurrency == 'BRL'){
	return 'R$';			
	}
	if($sitecurrency == 'CAD'){
	return '$';			
	}
	if($sitecurrency == 'CZK'){
	return 'Kč';			
	}
	if($sitecurrency == 'DKK'){
	return 'kr';			
	}
	if($sitecurrency == 'HKD'){
	return '$';			
	}
	if($sitecurrency == 'HUF'){
	return 'Ft';			
	}
	if($sitecurrency == 'ILS'){
	return '₪';			
	}
	if($sitecurrency == 'JPY'){
	return '¥';			
	}
	if($sitecurrency == 'MYR'){
	return 'RM';			
	}
	if($sitecurrency == 'NOK'){
	return 'kr';			
	}
	if($sitecurrency == 'NZD'){
	return '$';			
	}
	if($sitecurrency == 'PHP'){
	return '₱';			
	}
	if($sitecurrency == 'PLN'){
	return 'zł';			
	}
	if($sitecurrency == 'GBP'){
	return '£';			
	}
	if($sitecurrency == 'SGD'){
	return '$';			
	}
	if($sitecurrency == 'SEK'){
	return 'kr';			
	}
	if($sitecurrency == 'CHF'){
	return 'CHF';			
	}
	if($sitecurrency == 'TWD'){
	return 'NT$';			
	}
	if($sitecurrency == 'THB'){
	return '฿';			
	}
	if($sitecurrency == 'TRY'){
	return '₤';			
	}
	if($sitecurrency == 'ALL'){
	return 'Lek';			
	}
	
	if($sitecurrency == 'AFN'){
	return '؋';			
	}
	if($sitecurrency == 'ARS'){
	return '$';			
	}
	if($sitecurrency == 'AWG'){
	return 'ƒ';			
	}
	if($sitecurrency == 'AZN'){
	return 'ман';			
	}
	if($sitecurrency == 'BSD'){
	return '$';			
	}
	if($sitecurrency == 'BBD'){
	return '$';			
	}
	if($sitecurrency == 'BYR'){
	return 'p.';			
	}
	
	if($sitecurrency == 'BZD'){
	return 'BZ$';			
	}
	if($sitecurrency == 'BMD'){
	return '$';			
	}
	if($sitecurrency == 'BOB'){
	return '$b';			
	}
	if($sitecurrency == 'BAM'){
	return 'KM';			
	}
	
	if($sitecurrency == 'BWP'){
	return 'P';			
	}
	if($sitecurrency == 'BGN'){
	return 'лв';			
	}
	if($sitecurrency == 'BND'){
	return '$';			
	}
	if($sitecurrency == 'KHR'){
	return '៛';			
	}
	if($sitecurrency == 'KYD'){
	return '$';			
	}
	if($sitecurrency == 'CLP'){
	return '$';			
	}
	if($sitecurrency == 'CNY'){
	return '¥';			
	}
	if($sitecurrency == 'COP'){
	return '$';			
	}
	if($sitecurrency == 'CRC'){
	return '₡';			
	}
	if($sitecurrency == 'HRK'){
	return 'kn';			
	}
	
	if($sitecurrency == 'CUP'){
	return '₱';			
	}
	if($sitecurrency == 'DOP'){
	return 'RD$';			
	}
	if($sitecurrency == 'XCD'){
	return '$';			
	}
	if($sitecurrency == 'EGP'){
	return 'Egp';			
	}
	if($sitecurrency == 'SVC'){
	return '$';			
	}
	if($sitecurrency == 'EEK'){
	return 'kr';			
	}
	if($sitecurrency == 'FKP'){
	return '£';			
	}
	if($sitecurrency == 'FJD'){
	return '$';			
	}
	if($sitecurrency == 'FCFA'){
	return 'CFA';			
	}
	if($sitecurrency == 'GHC'){
	return '¢';			
	}
	if($sitecurrency == 'GIP'){
	return '£';			
	}
	if($sitecurrency == 'GTQ'){
	return 'Q';			
	}
	if($sitecurrency == 'GGP'){
	return '£';			
	}
	if($sitecurrency == 'GYD'){
	return '$';			
	}
	if($sitecurrency == 'HNL'){
	return 'L';			
	}
	if($sitecurrency == 'ISK'){
	return 'kr';			
	}
	if($sitecurrency == 'INR'){
	return 'रु';			
	}
	if($sitecurrency == 'IDR'){
	return 'Rp';			
	}
	if($sitecurrency == 'IRR'){
	return '﷼';			
	}
	
	if($sitecurrency == 'IMP'){
	return '£';			
	}
	if($sitecurrency == 'JMD'){
	return 'J$';			
	}
	if($sitecurrency == 'JEP'){
	return '£';			
	}
	if($sitecurrency == 'KZT'){
	return 'лв';			
	}
	if($sitecurrency == 'KPW'){
	return '₩';			
	}
	if($sitecurrency == 'JOD'){
	return 'JOD';			
	}
	if($sitecurrency == 'KRW'){
	return '₩';			
	}
	if($sitecurrency == 'LAK'){
	return '₭';			
	}
	if($sitecurrency == 'LVL'){
	return 'Ls';			
	}
	if($sitecurrency == 'LBP'){
	return '£';			
	}
	if($sitecurrency == 'LRD'){
	return '$';			
	}
	if($sitecurrency == 'LTL'){
	return 'Lt';			
	}
	if($sitecurrency == 'MKD'){
	return 'ден';			
	}
	if($sitecurrency == 'MDL'){
	return 'MDL';			
	}
	if($sitecurrency == 'MUR'){
	return '₨';			
	}
	if($sitecurrency == 'MNT'){
	return '₮';			
	}
	if($sitecurrency == 'MZN'){
	return 'MT';			
	}
	if($sitecurrency == 'NAD'){
	return '$';			
	}
	
	if($sitecurrency == 'NPR'){
	return 'ƒ';			
	}if($sitecurrency == 'NIO'){
	return 'C$';			
	}if($sitecurrency == 'NGN'){
	return '₦';			
	}if($sitecurrency == 'OMR'){
	return '﷼';			
	}if($sitecurrency == 'PKR'){
	return '₨';			
	}if($sitecurrency == 'PAB'){
	return 'B/.';			
	}if($sitecurrency == 'PYG'){
	return 'Gs';			
	}if($sitecurrency == 'PEN'){
	return 'S/.';			
	}if($sitecurrency == 'QAR'){
	return '﷼';			
	}if($sitecurrency == 'RON'){
	return 'lei';			
	}if($sitecurrency == 'RUB'){
	return 'руб';			
	}if($sitecurrency == 'SHP'){
	return '£';			
	}if($sitecurrency == 'SAR'){
	return '﷼';			
	}if($sitecurrency == 'RSD'){
	return 'Дин.';			
	}if($sitecurrency == 'SCR'){
	return '₨';			
	}if($sitecurrency == 'SBD'){
	return '$';			
	}if($sitecurrency == 'SOS'){
	return 'S';			
	}if($sitecurrency == 'ZAR'){
	return 'R';			
	}if($sitecurrency == 'LKR'){
	return '₨';			
	}if($sitecurrency == 'SRD'){
	return '$';			
	}if($sitecurrency == 'SYP'){
	return '£';			
	}if($sitecurrency == 'TTD'){
	return 'TT$';			
	}if($sitecurrency == 'TVD'){
	return '$';			
	}if($sitecurrency == 'UAH'){
	return '₴';			
	}if($sitecurrency == 'UYU'){
	return '$U';			
	}if($sitecurrency == 'UZS'){
	return 'лв';			
	}if($sitecurrency == 'VEF'){
	return 'Bs';			
	}if($sitecurrency == 'VND'){
	return '₫';			
	}if($sitecurrency == 'YER'){
	return '﷼';			
	}if($sitecurrency == 'ZWD'){
	return 'Z$';			
	}if($sitecurrency == 'LYD'){
	return 'LYD';			
	}
	
}


?>
