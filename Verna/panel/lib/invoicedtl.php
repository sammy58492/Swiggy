<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
$link = ConnectDB();


define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f'])
	{
	case 'FetchAllOrdersData':
		FetchAllOrdersData($_POST['filters'],$_POST['business']);
	break;

	case 'FetchOrderData':
		FetchOrderData($_POST['id']);
	break;
	case 'FetchAllRestData':
			FetchAllRestData();
		break;
	case 'DeleteOrder':
		DeleteOrder($_POST['data']);
	break;
	case 'FetchInvoiceData':
		FetchInvoiceData($_POST['id']);
	break;
	case 'FetchInvoiceConf':
		FetchInvoiceConf();
	break;

	case 'FetchInvoiceDataForPdf':
		FetchInvoiceDataForPdf($_POST['id']);
	break;

	case 'DeleteInvoice':
		DeleteInvoice($_POST['data']);
	break;
	case 'SendReminder':
		SendReminder($_POST['data']);
	break;

	case 'SaveOrder':
		SaveOrder($_POST['data']);
	break;
	case 'SaveInvoice':
		SaveInvoice($_POST['data']);
	break;
	case 'SaveInvoiceConf':
		SaveInvoiceConf($_POST['data']);
	break;
	case 'SaveInvoiceStatus':
		SaveInvoiceStatus($_POST['data']);
	break;



	default:
		die();
	break;
	}

/*******************************************GET ORDERS DATA**********************************************/
function GetAllRestData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();

	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());

	$returants = array();

	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['name'];
		array_push($returants,$returant);
		}



	return $returants;
}
function FetchAllRestData()
{
	//SuperAdminsOnly();
	echo json_encode(GetAllRestData());
}


function FetchAllOrdersData($filters,$withbusiness)
	{
	//ProvidersOnly();
	$link = ConnectDB();
	$lang_file = GetLangFile('en');
	require $lang_file;
	
	$conditionalsvalues = array(500);
	$query = 'SELECT w_invoice.id,w_invoice.date,w_invoice.city,w_invoice.invoicepay,w_invoice.businessi,w_invoice.resturant,w_invoice.status,w_invoice.total_invoice,w_invoice.dfrm,w_invoice.tfrm FROM w_invoice ORDER BY id DESC limit $1';

	if (!empty($filters))
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

	if ($_SESSION['user']->level=='1')//get all franchises from which the admin is admin
		{
		$citys = array();
		pg_prepare($link,'sql','SELECT id FROM w_franchises WHERE admin=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result))
			{
			array_push($citys,$row['id']);
			}
		}
		else
		if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
			}


	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	$orders = array();
     pg_prepare($link,'sql45','SELECT * from w_franchises WHERE id=$1');
	while($row = pg_fetch_array($result))
		{

		$data = parse($row['data']);

		$continue = false;
		if ($_SESSION['user']->level=='0')
			$continue = true;
			else
			{
			if ($_SESSION['user']->level=='1')
				{
				foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$continue = true;
						break;
						}
				}
				else
				if ($_SESSION['user']->level=='2')
					{
					foreach ($businesss as $business)
						foreach ($data->business as $databusiness)
							if ($databusiness->id==$business)
								$continue = true;
					}


			}

		if ($continue==true)
			{
			unset($order);
	        $resultcity = pg_execute($link,'sql45',array($row['city']));
			$cityData = pg_fetch_array($resultcity);

			$order->id = $row['id'];
			//$date = explode(':',$row['date']);
			//$order->date = $date[0] . ':' . $date[1];
			$order->date = $row['date'];
			unset($city);
			$city->id =$row['city'];
			$city->name = $cityData['city'];
			$order->city = $city;

			$order->resturant = $row['resturant'];
			$order->tinvoice = $row['total_invoice'];
			$order->invoicepay = $row['invoicepay'];
			$order->businessi = $row['businessi'];
			$order->datefrom = $row['dfrm'];
			$order->dateto = $row['tfrm'];
			$order->period = $order->datefrom . ':' . $order->dateto;

			if (!empty($withbusiness))
				{
				$businesss = array();
				foreach ($data->business as $business)
					{
					unset($bdata);
					$bdata->id = $business->id;
					$bdata->name = $business->name;
					array_push($businesss,$bdata);
					}
				$order->business = $businesss;
				}
			$order->status = $row['status'];


			switch ($order->status)
			{
				case '0':
					$order->statustext  = $lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS'];

				break;
				case '1':
					$order->statustext = $lang_resource['INVOICE_PENDING_PAYMENT_TO'];

				break;
				case '2':
					$order->statustext = $lang_resource['INVOICE_PAID_TO_OOS'];

				break;
				case '3':
					$order->statustext = $lang_resource['INVOICE_PAID_TO'];

				break;
				case '4':
					$order->statustext = $lang_resource['INVOICE_CANCELED'];

				break;

			}

			array_push($orders,$order);
			}
		}

	echo json_encode($orders);
	pg_close($link);
	}



function FetchOrderData($id)
	{
	echo json_encode(GetOrderData($id));
	}


function GetOrderData($id,$CFG = 'empty')
{
	ProvidersOnly();
	if (!empty($CFG))
		$link = ConnectDB($CFG);

		else
		$link = ConnectDB();

	if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
			}



	pg_prepare($link,'sql1','SELECT data,comment,date,status FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sql1',array($id));
	unset($order);
	while($row = pg_fetch_array($result))
		{
		$data = parse($row['data']);

		if ($_SESSION['user']->level=='2')
			{
			foreach ($data->business as $databusiness)
				{
				$founded = false;
				foreach ($businesss as $business)
					{
					if ($business==$databusiness->id)
						$founded = true;
					}
				if ($founded==false)
					unset($databusiness->id);
				}
			}

		$order->id = $id;
		$order->data = json_encode($data);
		if(IS_REVIEW_ENABLED == 1)
			$order->datos = stripslashes($row['data']);
		$order->date = $row['date'];
		$order->dateform = date("jS F Y",strtotime($row['date']));
		$order->comment = $row['comment'];
		$order->status = $row['status'];
		}
	pg_close($link);
	return $order;
	}
function DeleteOrder($data)
	{
	AdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_orders WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}



	function FetchInvoiceData($id)
	{

	SuperAdminsOnly();

	require('../config.php');
	$link = ConnectDB($CFG);

	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			unset($ad);
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
function SaveInvoiceStatus($data)
	{

	require('../config.php');
	$lang_file = GetLangFile('en');
	require $lang_file;

	$form = parse($data);
	$id = $form->id;
	$link = ConnectDB($CFG);
	 pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
		 	$currencyformat = $row1['value'];
	//print_r($form);


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

		switch ($form->fields->status->value)
		{
		case '0':
			$invoice->status = $lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS'];

		break;
		case '1':
			$invoice->status = $lang_resource['INVOICE_PENDING_PAYMENT_TO'];

		break;
		case '2':
			$invoice->status = $lang_resource['INVOICE_PAID_TO_OOS'];

		break;
		case '3':
			$invoice->status = $lang_resource['INVOICE_PAID_TO'];

		break;
		case '4':
			$invoice->status = $lang_resource['INVOICE_CANCELED'];

		break;

		}

			//Fetch super admin mail
			 pg_prepare($link,'sql213','SELECT email from w_users WHERE level=$1');
		     $result213 = pg_execute($link,'sql213',array('0'));
			 $row213 = pg_fetch_array($result213);
			 $super_mail = $row['email_from'];
	$mail->FromName = $row['sitename'];


            #########Mail Header##########
			$headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
           // Additional headers
            $headers .= 'From: Online Ordering <you@example.com>' . "\r\n";

            #####Use Mail#########

		//echo "Order: ".$order->id;
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
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_top_m.png" border="0" /></td>
       <td height="50%" valign="middle">
       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
       <tr>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
       </tr>
       </table>
       </td>
       </tr>
       </table>
       </td>
       </tr>
       <tr>
       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
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
          '.$lang_resource['INVOICE_CURRENT_INVOICE_STATUS_FOR_INVOICE_NO'].' '.$id.' is '.$invoice->status.'</span>
          </td>
        </tr>';

		if($admin_comment)
		{
		 $msg .='<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['INVOICE_ADMIN_COMMENTS'].' :'.$admin_comment.'</span>
          </td>
        </tr>';
		}
		if($comment)
		{
		 $msg .='<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['INVOICE_COMMENTS'].' :'.$comment.'</span>
          </td>
        </tr>';
		}


           $msg .='  <!--<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">'.$lang_resource['ORDERS_DID_YOU_ENJOY'].'</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#776f6f;">'.$lang_resource['ORDERS_PLEASE_HELP'].'</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:15px;">
          <a href="http://'.$_SERVER["HTTP_HOST"].'/'.$buname.'?order='.$order->id.'"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rev_btn_m.png" border="0" /></a>    </td>
        </td></tr>
        <tr>
          <td height="15"></td>
        </tr>-->
    </table>
    <tr>
    </table>
    </td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
<td>
<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
  </tr>
</table>
</td>

<td>
<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>
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
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_foot_m.png" width="251" height="42" border="0" /></td>
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

	pg_prepare($link,'sqld3',"SELECT email FROM w_business where id=(SELECT businessi FROM w_invoice where id=$1)");
	$fetch_busi = pg_execute($link,'sqld3',array($id));
	$rsb = pg_fetch_array($fetch_busi);
	$ad->email=$rsb['email'];

	pg_prepare($link,'sqlP',"SELECT * FROM w_users where id IN(SELECT provider FROM w_business where id=(SELECT businessi FROM w_invoice where id=$1))");
	$fetch_prov = pg_execute($link,'sqlP',array($id));
	$rsP = pg_fetch_array($fetch_prov);
	$ad->email2=$rsP['email'];

	require "class.phpmailer.php";
	$mail = new PHPMailer();
	$mail->PluginDir = "";
	$mail->Host = "localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = $row['sitename'];
	$mail->Subject =  $lang_resource['INVOICE_PDF_INVOICE'];
	//$mail->AddAddress("subhamay.universe@gmail.com");
	if($ad->email2!=""){
	 $mail->AddAddress($ad->email2);
	}
	if($ad->email!=""){
	 $mail->AddAddress($ad->email);
	}
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
	$mail->AltBody = $lang_resource['INVOICE_STATUS'];
	$mail->CharSet = 'UTF-8';
	$mail->Send();
	}

}


function FetchInvoiceDataForPdf($id)
	{

//	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);
	$lang_file = GetLangFile('en');
	require $lang_file;
	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$date1 = $row['date'];
			$ad->date = date("d-m-Y", strtotime($date1));
			
			pg_prepare($link,'sqlcurrency','SELECT * FROM w_business WHERE id=$1');
			$results = pg_execute($link,'sqlcurrency',array($row['businessi']));
			$rows = pg_fetch_array($results);
			
			
			
			$ad->currency = currency_symbol($rows['currency']);
			$ad->city = $row['city'];
			$ad->resturant = $row['resturant'];
			$ad->status = $row['status'];
			$ad->admin_comment = $row['admin_comment'];
			$ad->comment = $row['comment'];
			$ad->total_invoice = $row['total_invoice'];
			$businessi = $row['businessi'];
			$ad->billing = $row['billing'];
			$ad->setuprate = $row['setuprate'];
			$ad->fixedrate = $row['fixedrate'];
			$ad->perordercommission = $row['perordercommission'];
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			$ad->dfrm =date("d-m-Y", strtotime($row['dfrm']));
			$ad->dto = date("d-m-Y", strtotime($row['tfrm']));
			$ad->periodp = date("d-m-Y", strtotime($row['dfrm'])). ' To ' . date("d-m-Y", strtotime($row['tfrm']));
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
			}
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
			switch ($ad->payby)
				{

				case '1':
					$ad->pay = $lang_resource['INVOICE_BANK'];
				break;
				case '2':
					$ad->pay = $lang_resource['INVOICE_PAYPAL'];
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
				unset($makepayment);
				$makepayment->mpid	 = $row1['id'];
				$makepayment->mpdate	 = $row1['date'];
				$makepayment->mpinvoicepay	 = $row1['invoicepay'];
				$makepayment->payment = $row1['payment'];
				$makepayment->pdue = $row1['pdue'];
				array_push($mpayment,$makepayment);
			}
			//echo json_encode($mpayment);
			$ad->mapayment = $mpayment;

			unset($result);
			unset($row);

			$ad->orderrate =$ad->perorderfixedrate * $ad->totalorder;
			$ad->orderrate =round($ad->orderrate, $_SESSION['decimal_value']);

			$ad->commisioncal = ($ad->perordercommission/100) * $ad->total_invoice;
			$ad->commisioncal =round($ad->commisioncal, 2);
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


	function DeleteInvoice($data)
	{
		//print_r($data);
	AdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_invoice WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}

  function GetBusinessData($id)
{
      $link = ConnectDB();

  $query = 'SELECT id,data,date FROM w_orders WHERE id=$1';
  pg_prepare($link,'sql1',$query);
	$result2 = pg_execute($link,'sql1',array($id));
  $info2 = array();
  while($row = pg_fetch_array($result2))
		{
			$data2 = parse($row['data']);
      $data2->id = $row['id'];
      $data2->date = $row['date'];
      array_push($info2,$data2);
     }
    pg_close($link);
    return $info2;
}
/*******************************************SAVE INVOICES*********************************************************************/
function SaveInvoice($data)
	{

	require('../config.php');
	$form = parse($data);
	$adid = $form->id;
	$link = ConnectDB($CFG);
	if ($form->type=='create')
		{
			//print_r($form);
			//exit;

			    $datefrom = $form->fields->dfrm->value;
				$dateto = $form->fields->tfrm->value;

				/* ........................ Convert m-d-y -> y-m-d .......................................*/
				$datefromc = date("Y-m-d", strtotime($datefrom));
				$datetoc = date("Y-m-d", strtotime($dateto));
				$datetoc = $datetoc.' 24:00:00';

		pg_prepare($link,'sqld1',"SELECT id,date,data FROM w_orders where date between '$datefromc' and '$datetoc' and invoicestatus=0 and status=1 ORDER BY id DESC");
				$fetch_order = pg_execute($link,'sqld1',array());
				pg_num_rows($fetch_order);
				if(pg_num_rows($fetch_order)==0){
					echo "cancel";
					exit;
				}
				else{
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
					//pg_prepare($link,'sqliorder','Select orderid from w_invoice WHERE businessi=$1');
					while($rs = pg_fetch_array($fetch_order) ) {
						// print_r($rs);
						$dataa=$rs['data'];
						// print_r($dataa);
						$dataa=json_decode($dataa);
						/*echo ' id ='.*/  $dataa->business[0]->id;
						/*echo 'from id=' .*/$business = $form->fields->businessi->value;
						//echo $rs['id'];
						//echo '<pre>';
						//print_r($dataa);
					/*	$fetch_order = pg_execute($link,'sqliorder',array($business));
							if(pg_num_rows($fetch_order) == 0) {*/

						if($dataa->business[0]->id == $business){
							if($dataa->business[0]->paymethod->cash == 1){
								$cashcount = $cashcount+1;
								$cashtotal +=$dataa->total;
								$cashtotal =round($cashtotal, $_SESSION['decimal_value']);
							}

							if($dataa->business[0]->paymethod->card == 1){
								$cardcount = $cardcount+1;
								$cardtotal +=$dataa->total;
								$cardtotal =round($cardtotal, $_SESSION['decimal_value']);
							}
							if($dataa->business[0]->paymethod->paypal == 1){
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
					//print_r($count);
					//print_r($total);
					$totalval =$cashtotal + $cardtotal + $paypaltotal;
					$totalval =round($totalval, $_SESSION['decimal_value']);

					//echo $totalval;
					//exit;
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
				  } else {
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


/*

					$commisioncal1 = ($perordercommission/100) * $totalval;
					$commisioncal1 =round($commisioncal1, 2);
					$vatp1 = ($vat/100) * $commisioncal1;
					$vatp1 =round($vatp1, 2);
					$totalbalance1 = $commisioncal1 + $vatp1;
					$totalbalance1 =round($totalbalance1, 2); */

				 $cureentdate= date('Y-m-d H:i:s');


						   pg_prepare($link,'sqld2','INSERT INTO w_invoice (id,city,businessi,dfrm,tfrm,billing,setuprate,fixedrate,perordercommission,perorderfixedrate,otherrate,total_invoice,resturant,date,totalorder,orderid,count,total,vat,invoicepay) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)');
						   $fetch_insert = pg_execute($link,'sqld2',array($incheck,$bcity,$business,$datefromc,$datetoc,$billing,$setuprate,$fixedrate,$perordercommission,$perorderfixedrate,$otherrate,$totalval,$resturantname,$cureentdate,$totalorder,json_encode($order_id),json_encode($count),json_encode($total),$vat,$totalbalance1));
					SendReminder1($incheck);

				}else{echo "cancel"; exit;}

				}
		}else{
				$datefrom = $form->fields->dfrm->value;
				$dateto = $form->fields->tfrm->value;

				/* ........................ Convert m-d-y -> y-m-d .......................................*/
				$datefromc = date("Y-m-d", strtotime($datefrom));
				$datetoc = date("Y-m-d", strtotime($dateto));
				$datetoc = $datetoc.' 24:00:00';

				pg_prepare($link,'sqld1',"SELECT id,date,data FROM w_orders where date between '$datefromc' and '$datetoc' and  status=1 ORDER BY id DESC");
				$fetch_order = pg_execute($link,'sqld1',array());
				 pg_num_rows($fetch_order);
				if(pg_num_rows($fetch_order)==0){
					echo "cancel";
					exit;
				}
				else{
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
						// print_r($rs);
						$dataa=$rs['data'];
						// print_r($dataa);
						$dataa=json_decode($dataa);
						/*echo ' id ='.*/  $dataa->business[0]->id;
						/*echo 'from id=' .*/$business = $form->fields->businessi->value;

						if($dataa->business[0]->id == $business){
							if($dataa->business[0]->paymethod->cash == 1){
								$cashcount = $cashcount+1;
								$cashtotal +=$dataa->total;
								$cashtotal =round($cashtotal, $_SESSION['decimal_value']);
							}

							if($dataa->business[0]->paymethod->card == 1){
								$cardcount = $cardcount+1;
								$cardtotal +=$dataa->total;
								$cardtotal =round($cardtotal, $_SESSION['decimal_value']);
							}
							if($dataa->business[0]->paymethod->paypal == 1){
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
					//print_r($count);
					//print_r($total);
					$totalval =$cashtotal + $cardtotal + $paypaltotal;
					$totalval =round($totalval, $_SESSION['decimal_value']);
					//echo $totalval;
					if($totalval != 0){
						$business = $form->fields->businessi->value;
						pg_prepare($link,'sqld3',"SELECT city,name FROM w_business where id=$business ORDER BY id DESC");
						$fetch_busi = pg_execute($link,'sqld3',array());
						$rsb = pg_fetch_array($fetch_busi);
						$bcity=$rsb['city'];
						$resturantname=$rsb['name'];

						echo $billing = $form->fields->billing->value;
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

					SendReminder1($adid);

				    }else{echo "cancel"; exit;}

				}


		}

	}

	function SendReminder1($id){
		//echo $id;
		require('../config.php');
require "class.phpmailer.php";
$link = ConnectDB($CFG);
 pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
      	$currencyformat = $row1['value'];
			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');

				include_once $lang_file;
	
	//$link = ConnectDB();
	//$data = parse($data);
	pg_prepare($link,'sql_a','SELECT * FROM w_invoice WHERE id=$1');
	pg_prepare($link,'sqlP',"SELECT * FROM w_users where id IN(SELECT provider FROM w_business where id=$1)");
	pg_prepare($link,'sqlfb',"SELECT email,street,colony,vatregistration,tel FROM w_business where id=$1");
	pg_prepare($link,'sql1','SELECT * FROM w_invoiceconf WHERE id=$1');
	pg_prepare($link,'sqlmp','SELECT * FROM w_makepayment WHERE invoice_id=$1');
	pg_prepare($link,'sqlmpb','SELECT * FROM w_makepayment WHERE business_id=$1 and invoice_id != $2');
	//print_r($data->ids);


		$mail = new PHPMailer();
		//MY AREA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$result = pg_execute($link,'sql_a',array($id));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$date1 = $row['date'];
			$ad->date = date("d-m-Y", strtotime($date1));

			$ad->city = $row['city'];
			$ad->resturant = $row['resturant'];
			$ad->status = $row['status'];
			$ad->total_invoice = $row['total_invoice'];
			$businessi = $row['businessi'];
			$ad->billing = $row['billing'];
			$ad->setuprate = $row['setuprate'];
			$ad->fixedrate = $row['fixedrate'];
			$ad->perordercommission = $row['perordercommission'];
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			$ad->dfrm =date("d-m-Y", strtotime($row['dfrm']));
			$ad->dto = date("d-m-Y", strtotime($row['tfrm']));
			$ad->periodp = date("d-m-Y", strtotime($row['dfrm'])). ' To ' . date("d-m-Y", strtotime($row['tfrm']));
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



			$fetch_busi = pg_execute($link,'sqlfb',array($businessi));
			$rsb = pg_fetch_array($fetch_busi);
			$ad->streetb = $rsb['street'];
			$ad->colonyb = $rsb['colony'];
			$ad->telb = $rsb['tel'];
			$ad->vatregistration = $rsb['vatregistration'];
			$ad->email=$rsb['email'];

			$fetch_prov = pg_execute($link,'sqlP',array($businessi));
			$rsP = pg_fetch_array($fetch_prov);
			$ad->email2=$rsP['email'];
			}
			unset($result);
			unset($row);

			$incid=1;

			$result = pg_execute($link,'sql1',array($incid));
			$row = pg_fetch_array($result);

			$ad->iid = $row['id'];
			$ad->wbmail = $row['wbmail'];
			$ad->wurl = $row['wurl'];
			$ad->address = $row['address'];
			$ad->phone = $row['phone'];
			$ad->payby = $row['payby'];
			switch ($ad->payby)
				{

				case '1':
					$ad->pay = $lang_resource['INVOICE_BANK'];
				break;
				case '2':
					$ad->pay = $lang_resource['INVOICE_PAYPAL'];
				break;
			}
			$ad->bankname = $row['bankname'];
			$ad->bankac = $row['bankac'];
			$ad->routineno = $row['routineno'];
			$ad->swiftcode = $row['swiftcode'];
			$ad->vatpaypalemail = $row['vatpaypalemail'];
			$ad->ctext = $row['ctext'];
			$ad->isimg = $row['isimg'];


			$result5 = pg_execute($link,'sqlmp',array($id));
			$result9 = pg_execute($link,'sqlmp',array($id));
/*			$row1 = pg_fetch_array($result1);
			$ad->mpid	 = $row1['id'];
			$ad->mpdate	 = $row1['date'];
			$ad->mpinvoicepay	 = $row1['invoicepay'];
			$ad->payment = $row1['payment'];
			$ad->pdue = $row1['pdue'];*/

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

			$result2 = pg_execute($link,'sqlmpb',array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;
			$ad->totalpay =round($ad->totalpay, $_SESSION['decimal_value']);

			$html = '<html><body>';
			$html1 ='
			<div align="center">

				<div style="width:90%;">

				<table width="100%">
				<tr>
				<td width="49%">
						<span><strong><font size="4">'.$lang_resource['INVOICE_ORDER'].''.$ad->id.'</font></strong></span><br>
						<span>'.$lang_resource['INVOICE_DATE'].' : '.$ad->date.'</span><br>
						<span>'.$lang_resource['INVOICE_PERIOD'].' : ( '.$ad->periodp.' )</span><br>

					</td>
					<td width="49%"><div style="width:48%; align="left">';
			if($ad->isimg ==1){
			$html2 ='<img src="../images/invoice/1/small.jpg">';
			}else{
			$html2 ='<img src="../images/dummy/dummy_adbig.jpg" >';
			}
			$html3 ='</div>
					</td>
					</tr>
				 </table>
				<table width="105%">
				<tr>
				<td width="49%">
					<strong><font size="+1">'.$ad->resturant.'</font></strong><br>
					<strong><font size="+1"></font>'.$ad->streetb.'</strong><br>
					<strong><font size="+1"></font>'.$ad->colonyb.'</strong><br>
				   <strong>'.$lang_resource['INVOICE_PHONE'].' :</strong>'.$ad->telb.'<br>
				  </td>
				<td width="49%" align="right">

						'.$ad->address.'<br>

						<strong>'.$lang_resource['INVOICE_TEL'].' :</strong>'.$ad->phone.'<br>
						<strong>'.$lang_resource['INVOICE_EMAIL'].' :</strong>'. $ad->wbmail.'<br>
						<strong>'.$lang_resource['INVOICE_WEBSITE'].' :</strong>'.$ad->wurl.'<br>
						<strong>'.$lang_resource['INVOICE_VAT_REGISTRATION'].' :</strong>'.$ad->vatregistration.'

					</td>
					</tr>
					</table>
				 </div>

				 <div style="margin:10px 0 0 0;">
					<table width="100%">
						<tr>
							<td  style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:50%;"><strong><font size="+1.5">'.$lang_resource['INVOICE_INVOICE_BREAKDOWN'].'</font></strong></td>
							<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:20%;"><strong></strong></td>
							<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:30%; text-align:right;"><strong><font size="+1.5">'.$lang_resource['INVOICE_AMOUNT'].'</font></strong></td>
						</tr>
						<tr>
							<td>'.$lang_resource['INVOICE_TOTAL_VALUE_FOR'].'</td>
							<td>'.$ad->totalorder.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->total_invoice).'</td>
						</tr>
						<tr>
							<td>'.$lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR'].'</td>
							<td>'.$ad->cashcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->cashtotal).'</td>
						</tr>
						 <tr>
							<td>'.$lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR'].'</td>
							<td>'.$ad->paypalcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->paypaltotal).'</td>
						</tr>
						<tr>
							<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR'].'</td>
							<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ">'.$ad->cardcount.' orders</td>
							<td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;">'.$currencyformat.' '.GetDecimalPoint($ad->cardtotal).'</td>
						</tr>
						<tr>
							<td colspan="2" align="right">'.$ad->perordercommission.'% '.$lang_resource['INVOICE_COMMISSION_ON_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->commisioncal).'</td>
						</tr>';
if($ad->setuprate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_SETUP_RATE'].' </td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->setuprate).'</td>
			 </tr>';
	}
if($ad->fixedrate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_FIXED_RATE'].'</td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->fixedrate).'</td>
			 </tr>';
	}
if($ad->orderrate != 0){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_PER_ORDER_FIXED_RATE'].' </td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->orderrate).'</td>
			 </tr>';
	}
if($ad->otherrate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_OTHER_RATE'].' </td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->otherrate).'</td>
			 </tr>';
	}

				$html3 .='<tr>
							<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_VAT'].' ('.$ad->vat.'%):</td>
							<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">'.$currencyformat.' '.GetDecimalPoint($ad->vatp).'</td>
						</tr>
						<tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_ORDER_TOTAL_AMOUNT_OWED'].':</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).'</td>
						</tr>';
		$paymenttotal=0;
		$duepayment = $ad->totalbalance;
	while($row9 = pg_fetch_array($result9)){
		$paymenttotal = $paymenttotal + $row9['payment'];
		$duepayment = $row9['pdue'];
	}

			if($paymenttotal == 0){
			$html4='   <tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_TOTAL_AMOUNT_CWED_FROM_RESTAURANT'].' ('.$currencyformat.' '.$ad->totalbalance.' - '.$currencyformat.' 0.00):</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).'</td>
						</tr>';
			}else{
			$html4='   <tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'].' ('.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).' - '.$currencyformat.' '.GetDecimalPoint($paymenttotal).'):</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($duepayment).'</td>
						</tr>';
			}
			$html5='<tr>
							<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'].'</td>
		<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalinvoicedue).'</td>
						</tr>
						 <tr>
							<td colspan="2" align="right"><strong>'.$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS'].':</strong></td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalpay).'</td>
						</tr>
					  </table>
				 </div>



				  <div style="width:100%; margin:10px 0 0 0; float:left;" align="left">
					'.$lang_resource['INVOICE_QUESTIONS'].' : <a href="#">'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</a>
				  </div>



				   <div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#666; height:70px;" align="left">
					 '.$lang_resource['INVOICE_INVOICE_INFORMATION'].' : <a href="#">'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</a>
				   </div>

						  <div style="width:30%; margin:5px 0 0 0; float:left;" align="left">
					<strong><font size="+2">'.$lang_resource['INVOICE_PAYMENT_DETAILS'].'</font></strong>
				  </div>

				   <br clear="all">';
			  if($ad->payby == 1){
			$html6='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
				  <table width="100%">
						<tr align="center">

							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong>'.$lang_resource['INVOICE_PAYMENT_TYPE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_BANK_NAME'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_BANK_AC_NO'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_ROUTINE_NO'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_SWIFT_CODE'].'</strong></td>

						</tr>
						<tr bgcolor="#FFD9B3">

							<td align="center"><strong>'.$ad->pay.'</strong></td>
							<td align="center"><strong>'.$ad->bankname.'</strong></td>
							<td align="center"><strong>'.$ad->bankac.'</strong></td>
							<td align="right"><strong>'.$ad->routineno.'</strong></td>
							<td align="right"><strong>'.$ad->swiftcode.'</strong></td>

						</tr>

				  </table>
				  </div>';
			  }else{

			$html6='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
				  <table width="100%">
						<tr align="center">

							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_PAYMENT_TYPE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:40%"><strong>'.$lang_resource['INVOICE_EMAIL_ADDRESS'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_PAYPAL'].'</strong></td>

						</tr>
						<tr bgcolor="#FFD9B3">

							<td align="center"><strong>'.$ad->pay.'</strong></td>
							<td align="center"><strong>'.$ad->vatpaypalemail.'</strong></td>
							<td align="center"><strong><a href="http://'.$_SERVER["HTTP_HOST"].'/panel/js/paymentoption.php?id='.$ad->id .'">
				<img src="../../images/panel/paypal.png" width="60" height="20"></a></strong></td>
						</tr>

				  </table>
				  </div>';

			 }



			   $html7='<div style="width:30%; margin:5px 0 0 0; float:left;" align="left">
					<strong><font size="+2">'.$lang_resource['INVOICE_ORDER_DETAILS'].'</font></strong>
				  </div>

				   <br clear="all">
				  <div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
				  <table width="100%">
						<tr align="center">
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:5%"><strong>#</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong>'.$lang_resource['INVOICE_DATE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_ORDER_NO'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_PAID'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_TOTAL_VALUE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_PAYMENT'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_DUE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong>'.$lang_resource['INVOICE_COMMISSION'].' (%)</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong>'.$lang_resource['INVOICE_FIXED_RATE'].'</strong></td>
						</tr>';
	if(pg_num_rows($result5) == 0) {
			$html8='<tr bgcolor="#FFD9B3">
            	<td align="center" colspan="9"><strong>'.$lang_resource['INVOICE_NO_RECORD_FOUND'].'</strong></td>
           		 </tr>';
		} else {
			 $html8 = '';


while($row5 = pg_fetch_array($result5)){

        $html8 .='<tr bgcolor="#FFD9B3">
            	<td align="center"><strong>'.$row5['id'].'</strong></td>
                <td align="center"><strong>'.$row5['date'].'</strong></td>
                <td align="center"><strong>'.$row5['id'].'</strong></td>
                <td align="center"><strong>'.$ad->pay.'</strong></td>
                <td align="right"><strong>$'.$row5['invoicepay'].'</strong></td>
                <td align="right"><strong>$'.$row5['payment'].'</strong></td>
                <td align="right"><strong>$'.$row5['pdue'].'</strong></td>
				<td align="right"><strong>$'.$ad->perordercommission.'</strong></td>
				<td align="right"><strong>$'.$ad->perorderfixedrate.'</strong></td>
            </tr>';

}
		}
				  $html9='</table>
				  </div>


			   </div>

			   <br clear="all">
			   <div align="left" style="width:100%; height:40px; margin-top:10px; border-top-width:15px; border-top-style:outset; border-top-color:#333333;">
			   '.$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS'].' '.$ad->perorderfixedrate.' '.$lang_resource['INVOICE_PER_ORDER'].'
			   </div>

			</div>';
			$html10= '</body></html>';

			//print $html.$html1.$html2;exit;
			include("../pdf/dompdf_config.inc.php");


			$dompdf = new DOMPDF();
			$dompdf->load_html($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);

			$dompdf->render();
			$dompdf->set_paper("A4","portrait");

			$date=date("Y-m-d H:i:s");
			$file_name=$fetch->invo;
			$pdf = $dompdf->output();
			file_put_contents("../temp_pdf/invoice.pdf", $pdf);

			$mail->PluginDir = "";
			$mail->Host = "localhost";
			$mail->From = $row['email_from'];
			$mail->FromName = $row['sitename'];
			$mail->Subject =  $lang_resource['INVOICE_PDF_INVOICE'];
			//$mail->AddAddress("subhamay.universe@gmail.com");
			if($ad->email2!=""){
				$mail->AddAddress($ad->email2);
			}
			if($ad->email!=""){
				$mail->AddAddress($ad->email);
			}
			$mail->MsgHTML($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);
			$mail->IsHTML(true);
			$mail->AddAttachment("../temp_pdf/invoice.pdf",$id."_invoice.pdf");
			$mail->AltBody = $lang_resource['INVOICE_ORDER_PDF'];
			$mail->CharSet = 'UTF-8';
			$mail->Send();
			unlink("../temp_pdf/invoice.pdf");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	pg_close($link);
}
/*..............................................................INVOICE CONFIGURATION.........................................................*/

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
	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'invoice/',$oldname,$usrid);

		$link = ConnectDB();
		pg_prepare($link,'sql','UPDATE w_invoiceconf SET isimg=$1 WHERE id=$2');
		pg_execute($link,'sql',array(1,$usrid));
		pg_close($link);

	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{

				$link = ConnectDB();
				pg_prepare($link,'sql','UPDATE w_invoiceconf SET isimg=$1 WHERE id=$2');
				pg_execute($link,'sql',array(0,$usrid));
				pg_close($link);

	    	}
		echo "ok";
	}

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'normal.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder))
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require('resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
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

function FetchInvoiceConf(){

	SuperAdminsOnly();

	require('../config.php');
	$link = ConnectDB($CFG);
	$id=1;
	pg_prepare($link,'sql','SELECT * FROM w_invoiceconf WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			unset($ad);
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


function SendReminder($data)
{
require('../config.php');
require "class.phpmailer.php";
	$link = ConnectDB($CFG);
	 pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
		 	$currencyformat = $row1['value'];
			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');

				include_once $lang_file;
	//$link = ConnectDB();
	$data = parse($data);
	pg_prepare($link,'sql_a','SELECT * FROM w_invoice WHERE id=$1');
	pg_prepare($link,'sqlP',"SELECT * FROM w_users where id IN(SELECT provider FROM w_business where id=$1)");
	pg_prepare($link,'sqld3',"SELECT email,street,colony,vatregistration,tel FROM w_business where id=$1");
	pg_prepare($link,'sql1','SELECT * FROM w_invoiceconf WHERE id=$1');
	pg_prepare($link,'sqlmp','SELECT * FROM w_makepayment WHERE invoice_id=$1');
	pg_prepare($link,'sqlmpb','SELECT * FROM w_makepayment WHERE business_id=$1 and invoice_id != $2');
	//print_r($data->ids);

	foreach ($data->ids as $id)
		{
		$mail = new PHPMailer();
		//MY AREA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$result = pg_execute($link,'sql_a',array($id));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
			$date1 = $row['date'];
			$ad->date = date("d-m-Y", strtotime($date1));

			$ad->city = $row['city'];
			$ad->resturant = $row['resturant'];
			$ad->status = $row['status'];
			$ad->total_invoice = $row['total_invoice'];
			$businessi = $row['businessi'];
			$ad->billing = $row['billing'];
			$ad->setuprate = $row['setuprate'];
			$ad->fixedrate = $row['fixedrate'];
			$ad->perordercommission = $row['perordercommission'];
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			$ad->dfrm =date("d-m-Y", strtotime($row['dfrm']));
			$ad->dto = date("d-m-Y", strtotime($row['tfrm']));
			$ad->periodp = date("d-m-Y", strtotime($row['dfrm'])). ' To ' . date("d-m-Y", strtotime($row['tfrm']));
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



			$fetch_busi = pg_execute($link,'sqld3',array($businessi));
			$rsb = pg_fetch_array($fetch_busi);
			$ad->streetb = $rsb['street'];
			$ad->colonyb = $rsb['colony'];
			$ad->telb = $rsb['tel'];
			$ad->vatregistration = $rsb['vatregistration'];
			$ad->email=$rsb['email'];

			$fetch_prov = pg_execute($link,'sqlP',array($businessi));
			$rsP = pg_fetch_array($fetch_prov);
			$ad->email2=$rsP['email'];
			}
			unset($result);
			unset($row);

			$incid=1;

			$result = pg_execute($link,'sql1',array($incid));
			$row = pg_fetch_array($result);

			$ad->iid = $row['id'];
			$ad->wbmail = $row['wbmail'];
			$ad->wurl = $row['wurl'];
			$ad->address = $row['address'];
			$ad->phone = $row['phone'];
			$ad->payby = $row['payby'];
			switch ($ad->payby)
				{

				case '1':
					$ad->pay = $lang_resource['INVOICE_BANK'];
				break;
				case '2':
					$ad->pay = $lang_resource['INVOICE_PAYPAL'];
				break;
			}
			$ad->bankname = $row['bankname'];
			$ad->bankac = $row['bankac'];
			$ad->routineno = $row['routineno'];
			$ad->swiftcode = $row['swiftcode'];
			$ad->vatpaypalemail = $row['vatpaypalemail'];
			$ad->ctext = $row['ctext'];
			$ad->isimg = $row['isimg'];


			$result5= pg_execute($link,'sqlmp',array($id));
			$result9= pg_execute($link,'sqlmp',array($id));
	/*		$row1 = pg_fetch_array($result1);
			$ad->mpid	 = $row1['id'];
			$ad->mpdate	 = $row1['date'];
			$ad->mpinvoicepay	 = $row1['invoicepay'];
			$ad->payment = $row1['payment'];
			$ad->pdue = $row1['pdue'];*/

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

			$result2 = pg_execute($link,'sqlmpb',array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;
			$ad->totalpay =round($ad->totalpay, $_SESSION['decimal_value']);

			$html = '<html><body>';
			$html1 ='
			<div align="center">

				<div style="width:90%;">

				<table width="100%">
				<tr>
				<td width="49%">
						<span><strong><font size="4">'.$lang_resource['INVOICE_ORDER'].''.$ad->id.'</font></strong></span><br>
						<span>'.$lang_resource['INVOICE_DATE'].' : '.$ad->date.'</span><br>
						<span>'.$lang_resource['INVOICE_PERIOD'].' : ( '.$ad->periodp.' )</span><br>

					</td>
					<td width="49%"><div style="width:48%; align="left">';
			if($ad->isimg ==1){
			$html2 ='<img src="../images/invoice/1/small.jpg">';
			}else{
			$html2 ='<img src="../images/dummy/dummy_adbig.jpg" >';
			}
			$html3 ='</div>
					</td>
					</tr>
				 </table>
				<table width="105%">
				<tr>
				<td width="49%">
					<strong><font size="+1">'.$ad->resturant.'</font></strong><br>
					<strong><font size="+1"></font>'.$ad->streetb.'</strong><br>
					<strong><font size="+1"></font>'.$ad->colonyb.'</strong><br>
				   <strong>'.$lang_resource['INVOICE_PHONE'].' :</strong>'.$ad->telb.'<br>
				  </td>
				<td width="49%" align="right">

						'.$ad->address.'<br>

						<strong>'.$lang_resource['INVOICE_TEL'].' :</strong>'.$ad->phone.'<br>
						<strong>'.$lang_resource['INVOICE_EMAIL'].' :</strong>'. $ad->wbmail.'<br>
						<strong>'.$lang_resource['INVOICE_WEBSITE'].' :</strong>'.$ad->wurl.'<br>
						<strong>'.$lang_resource['INVOICE_VAT_REGISTRATION'].' :</strong>'.$ad->vatregistration.'

					</td>
					</tr>
					</table>
				 </div>

				 <div style="margin:10px 0 0 0;">
					<table width="100%">
						<tr>
							<td  style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:50%;"><strong><font size="+1.5">'.$lang_resource['INVOICE_INVOICE_BREAKDOWN'].'</font></strong></td>
							<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:20%;"><strong></strong></td>
							<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:30%; text-align:right;"><strong><font size="+1.5">'.$lang_resource['INVOICE_AMOUNT'].'</font></strong></td>
						</tr>
						<tr>
							<td>'.$lang_resource['INVOICE_TOTAL_VALUE_FOR'].'</td>
							<td>'.$ad->totalorder.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->total_invoice).'</td>
						</tr>
						<tr>
							<td>'.$lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR'].'</td>
							<td>'.$ad->cashcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->cashtotal).'</td>
						</tr>
						 <tr>
							<td>'.$lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR'].'</td>
							<td>'.$ad->paypalcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->paypaltotal).'</td>
						</tr>
						<tr>
							<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR'].'</td>
							<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ">'.$ad->cardcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
							<td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;">'.$currencyformat.' '.GetDecimalPoint($ad->cardtotal).'</td>
						</tr>
						<tr>
							<td colspan="2" align="right">'.$ad->perordercommission.'% '.$lang_resource['INVOICE_COMMISSION_ON_ORDERS'].'</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->commisioncal).'</td>
						</tr>';
if($ad->setuprate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_SETUP_RATE'].' </td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->setuprate).'</td>
			 </tr>';
	}
if($ad->fixedrate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_FIXED_RATE'].'</td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->fixedrate).'</td>
			 </tr>';
	}
if($ad->orderrate != 0){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_PER_ORDER_FIXED_RATE'].' </td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->orderrate).'</td>
			 </tr>';
	}
if($ad->otherrate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_OTHER_RATE'].' </td>
				<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->otherrate).'</td>
			 </tr>';
	}

				$html3 .='<tr>
							<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_VAT'].' ('.$ad->vat.'%):</td>
							<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">'.$currencyformat.' '.GetDecimalPoint($ad->vatp).'</td>
						</tr>
						<tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_ORDER_TOTAL_AMOUNT_OWED'].':</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).'</td>
						</tr>';
				$paymenttotal=0;
		$duepayment = $ad->totalbalance;
	while($row9 = pg_fetch_array($result9)){
		$paymenttotal = $paymenttotal + $row9['payment'];
		$duepayment = $row9['pdue'];
	}

			if($paymenttotal == 0){
			$html4='   <tr>
							<td colspan="2" align="right">Total owned from restrunt ('.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).' - '.$currencyformat.' 0.00):</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).'</td>
						</tr>';
			}else{
			$html4='   <tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_TOTAL_AMOUNT_CWED_FROM_RESTAURANT'].' ('.$currencyformat.' '.GetDecimalPoint($ad->totalbalance).' - '.$currencyformat.' '.GetDecimalPoint($paymenttotal).'):</td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($duepayment).'</td>
						</tr>';
			}
			$html5='<tr>
							<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'].'</td>
		<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalinvoicedue).'</td>
						</tr>
						 <tr>
							<td colspan="2" align="right"><strong>'.$lang_resource['INVOICE_ORDER_TOTAL_PAYABLE_TO_OOS'].':</strong></td>
							<td align="right">'.$currencyformat.' '.GetDecimalPoint($ad->totalpay).'</td>
						</tr>
					  </table>
				 </div>



				  <div style="width:100%; margin:10px 0 0 0; float:left;" align="left">
					'.$lang_resource['INVOICE_QUESTIONS'].' : <a href="#">'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</a>
				  </div>



				   <div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#666; height:70px;" align="left">
					  '.$lang_resource['INVOICE_INVOICE_INFORMATION'].' : <a href="#">'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</a>
				   </div>

						  <div style="width:30%; margin:5px 0 0 0; float:left;" align="left">
					<strong><font size="+2">'.$lang_resource['INVOICE_PAYMENT_DETAILS'].'</font></strong>
				  </div>

				   <br clear="all">';
			  if($ad->payby == 1){
			$html6='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
				  <table width="100%">
						<tr align="center">

							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong>'.$lang_resource['INVOICE_PAYMENT_TYPE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_BANK_NAME'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_BANK_AC_NO'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_ROUTINE_NO'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_SWIFT_CODE'].'</strong></td>

						</tr>
						<tr bgcolor="#FFD9B3">

							<td align="center"><strong>'.$ad->pay.'</strong></td>
							<td align="center"><strong>'.$ad->bankname.'</strong></td>
							<td align="center"><strong>'.$ad->bankac.'</strong></td>
							<td align="right"><strong>'.$ad->routineno.'</strong></td>
							<td align="right"><strong>'.$ad->swiftcode.'</strong></td>

						</tr>

				  </table>
				  </div>';
			  }else{

			$html6='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
				  <table width="100%">
						<tr align="center">

							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_PAYMENT_TYPE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_EMAIL_ADDRESS'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>'.$lang_resource['INVOICE_PAYPAL'].'</strong></td>

						</tr>
						<tr bgcolor="#FFD9B3">

							<td align="center"><strong>'.$ad->pay.'</strong></td>
							<td align="center"><strong>'.$ad->vatpaypalemail.'</strong></td>
							<td align="center"><strong><span><a href="http://'.$_SERVER["HTTP_HOST"].'/panel/js/paymentoption.php?id='.$ad->id .'"><img src="../../images/panel/paypal.png" width="60" height="20"></a></span></strong></td>
						</tr>

				  </table>
				  </div>';

			 }



			   $html7='<div style="width:30%; margin:5px 0 0 0; float:left;" align="left">
					<strong><font size="+2">'.$lang_resource['INVOICE_ORDER_DETAILS'].'</font></strong>
				  </div>

				   <br clear="all">
				  <div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
				  <table width="100%">
						<tr align="center">
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:5%"><strong>#</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong>'.$lang_resource['INVOICE_DATE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong>'.$lang_resource['INVOICE_ORDER_NO'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_PAID'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_TOTAL_VALUE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_PAYMENT'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>'.$lang_resource['INVOICE_DUE'].'</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong>'.$lang_resource['INVOICE_COMMISSION'].' (%)</strong></td>
							<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong>'.$lang_resource['INVOICE_FIXED_RATE'].'</strong></td>
						</tr>';
	if(pg_num_rows($result5) == 0) {
			$html8='<tr bgcolor="#FFD9B3">
            	<td align="center" colspan="9"><strong>'.$lang_resource['INVOICE_NO_RECORD_FOUND'].'</strong></td>
           		 </tr>';
		} else {
			 $html8 = '';


while($row5 = pg_fetch_array($result5)){

        $html8 .='<tr bgcolor="#FFD9B3">
            	<td align="center"><strong>'.$row5['id'].'</strong></td>
                <td align="center"><strong>'.$row5['date'].'</strong></td>
                <td align="center"><strong>'.$row5['id'].'</strong></td>
                <td align="center"><strong>'.$ad->pay.'</strong></td>
                <td align="right"><strong>$'.$row5['invoicepay'].'</strong></td>
                <td align="right"><strong>$'.$row5['payment'].'</strong></td>
                <td align="right"><strong>$'.$row5['pdue'].'</strong></td>
				<td align="right"><strong>$'.$ad->perordercommission.'</strong></td>
				<td align="right"><strong>$'.$ad->perorderfixedrate.'</strong></td>
            </tr>';

}
		}

				  $html9='</table>
				  </div>


			   </div>

			   <br clear="all">
			   <div align="left" style="width:100%; height:40px; margin-top:10px; border-top-width:15px; border-top-style:outset; border-top-color:#333333;">
			   '.$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS'].' '.$ad->perorderfixedrate.' '.$lang_resource['INVOICE_PER_ORDER'].'
			   </div>

			</div>';
			$html10= '</body></html>';

			//print $html.$html1.$html2;exit;
			include("../payment-gateway/pdf/dompdf_config.inc.php");


			$dompdf = new DOMPDF();
			$dompdf->load_html($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);

			$dompdf->render();
			$dompdf->set_paper("A4","portrait");

			$date=date("Y-m-d H:i:s");
			$file_name=$fetch->invo;
			$pdf = $dompdf->output();
			file_put_contents("../temp_pdf/invoice.pdf", $pdf);

			$mail->PluginDir = "";
			$mail->Host = "localhost";
			$mail->From = $row['email_from'];
			$mail->FromName = $row['sitename'];
			$mail->Subject =  $lang_resource['INVOICE_PDF_INVOICE'];
			//$mail->AddAddress("subhamay.universe@gmail.com");
			if($ad->email2!=""){
				$mail->AddAddress($ad->email2);
			}
			if($ad->email!=""){
				$mail->AddAddress($ad->email);
			}
			$mail->MsgHTML($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);
			$mail->IsHTML(true);
			$mail->AddAttachment("../temp_pdf/invoice.pdf",$id."_invoice.pdf");
			$mail->AltBody = $lang_resource['INVOICE_ORDER_PDF'];
			$mail->CharSet = 'UTF-8';
			$mail->Send();
			unlink("../temp_pdf/invoice.pdf");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}
	pg_close($link);
}


function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';

	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}


/*function currency_symbol($sitecurrency){

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
	return '﷼';			
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
	
}*/
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
	return '﷼';			
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
