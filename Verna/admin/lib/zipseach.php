<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

switch ($_POST['f'])
	{
	case 'FetchAllOrdersData':
		FetchAllOrdersData($_POST['filters'],$_POST['bid']);
	break;
	case 'Fetchbusinessname':
		Fetchbusinessname($_POST['bid']);
	break;
	
	case 'Fetchdeliverycity':
		Fetchdeliverycity();
	break;
	
	case 'FetchOrderData':
		FetchOrderData($_POST['id']);
	break;
	case 'DeleteOrder':
		DeleteOrder($_POST['data']);
	break;
	case 'FetchEachzipData':
		FetchEachzipData($_POST['id']);
	break;

	case 'SaveOrder':
		SaveOrder($_POST['data']);
	break;
	case 'FetchDriverData':
		FetchDriverData($_POST['id']);
	break;
		case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
		case 'SaveZipcode':
		SaveZipcode($_POST['data']);
	break;
	default:
		die();
	break;
	}

/*******************************************GET ORDERS DATA**********************************************/

function FetchAllOrdersData($filters,$bid)
	{
	$link = ConnectDB();
	$query = 'SELECT w_zipcode.*,w_business.name,w_business.currency FROM w_zipcode JOIN w_business ON w_zipcode.businessid = w_business.id AND w_zipcode.businessid=$1 AND w_zipcode.scriptid=$2';
    pg_prepare($link,'sqlz1',$query);
	$result = pg_execute($link,'sqlz1',array($bid,$_SESSION['scriptid']));
	$zipcode = array();

	
	while($row = pg_fetch_array($result))
		{
			$zip = new StdClass();
			//$data = parse($row['data']);
		//	unset($zip);
			
			$zip->id = $row['id'];
			$zip->zipcode = $row['zipcode'];
			$zip->cost = $row['cost'];
			$zip->bname = $row['name'];
			
			$zip->enabled = $row['enabled'];
			$currency = $row['currency'];
			$zip->currency = currency_symbol($currency);
			//$prein->driver = $row['driver'];
			array_push($zipcode,$zip);
		}

		echo json_encode($zipcode);
	}
function monthname($mno)
{
$falseDate="2014-".$mno."-01";
$monthname=date('F',strtotime($falseDate));
return $monthname;
}
function RandNumber($e){

for($i=0;$i<$e;$i++){
$rand = $rand . rand(0, 9);
}
return $rand;

}
function FetchOrderData($id)
	{
	echo json_encode(GetOrderData($id));

	}

function FetchDriverData($id)
{
	//echo $_SESSION['user']->level;
	//exit();
$link = ConnectDB();

    if($_SESSION['user']->level==0 || $_SESSION['user']->level==1 )
	{
			pg_prepare($link,'sql7','UPDATE w_orders SET read=0 WHERE id=$1');
		   pg_execute($link,'sql7',array($id));

	}

			$driverdata = array();
			pg_prepare($link,'sql','SELECT * FROM w_driver WHERE  enabled=$1');
			$result = pg_execute($link,'sql',array("TRUE"));
			while($row = pg_fetch_array($result))
				{
					unset($driver);
				 	$driver->id=$row['id'];
					$driver->caption=$row['name']." ".$row['lastname'];



				array_push($driverdata,$driver);
				}


			echo json_encode($driverdata);

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



	pg_prepare($link,'sql1','SELECT data,comment,date,status,driver FROM w_orders WHERE id=$1');
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
		$order->comment = $row['comment'];
		$order->status = $row['status'];
		$order->driver = $row['driver'];

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


function SaveOrder($data)
	{
	ProvidersOnly();
	$form = parse($data);
	require('../config.php');

	//save the order to the db
	if ($form->type=='modify')
		UpdateQuery('w_orders',$form->fields,$form->id,$CFG);

	//get the data object from the db so we can take the email and send a notif to the user
	$info = GetOrderData($form->id,$CFG);

	unset($order);
	$order->id = $info->id;
	if(IS_REVIEW_ENABLED == 1)
		$order->business->id = $info->data->business->id;
	$order->comment = $form->fields->comment->value;
	switch ($form->fields->status->value)
		{
		case '0':
			$order->status = 'Your order is pending';
		break;
		case '1':
			$order->status = 'Your order has been completed';
		break;
		case '2':
			$order->status = 'Your order has been cancelled';
		break;
		}

	$data = parse($info->data);
	$order->email = $data->buyer->email;

	$business_data = GetBusinessData($form->id);
	$twilio_phone = $business_data[0]->business[0]->twiliophone;
	$twilio_enabled = $business_data[0]->business[0]->twilioenabled;


	// Get language from get or put default as en
	$lang_file;
	if(isset($_GET['l']) && $_GET['l'] != '')
		$lang_file = GetLangFile($_GET['l']);
	else
		$lang_file = GetLangFile('en');

	// Include the selected language file
	include_once $lang_file;



   if(IS_REVIEW_ENABLED == 1)
   {
		$business_data = GetBusinessData($form->id);
		for ($i=0;$i<count($business_data);$i++)
		{
			$order_id = $business_data[$i];
			foreach ($order_id->business as $business)
						{
			 $business_id->id = $business->id;

			}

		}

		echo "Order: ".$order->id;
	$msg = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
				<title>*|MC:SUBJECT|*</title>

				<!--[if gte mso 6]>
				<style>
					table.mcnFollowContent {width:100% !important;}
					table.mcnShareContent {width:100% !important;}
				</style>
				<![endif]-->
			<style type="text/css">
						#outlook a{
								padding:0;
						}
						.ReadMsgBody{
								width:100%;
						}
						.ExternalClass{
								width:100%;
						}
						span.yshortcuts{
								background-color:none !important;
								border:none !important;
						}
						span.yshortcuts:hover,span.yshortcuts:active,span.yshortcuts:focus{
								background-color:none !important;
								border:none !important;
						}
						body{
								margin:0;
								padding:0;
						}
						a{
								word-wrap:break-word !important;
						}
						img{
								border:0;
								height:auto;
								line-height:100%;
								outline:none;
								text-decoration:none;
						}
						table,td{
								border-collapse:collapse;
								mso-table-lspace:0pt;
								mso-table-rspace:0pt;
						}
						#bodyTable,#bodyCell{
								height:100% !important;
								margin:0;
								padding:0;
								width:100% !important;
						}
						.mcnImage{
								vertical-align:bottom;
						}
						body,#bodyTable{
								background-color:#ffffff;
						}
						#bodyCell{
								border-top:0;
						}
						h1{
								color:#202020 !important;
								display:block;
								font-family:Helvetica;
								font-size:26px;
								font-style:normal;
								font-weight:bold;
								line-height:100%;
								letter-spacing:normal;
								margin:0;
								text-align:left;
						}
						h2{
								color:#404040 !important;
								display:block;
								font-family:Helvetica;
								font-size:20px;
								font-style:normal;
								font-weight:bold;
								line-height:100%;
								letter-spacing:normal;
								margin:0;
								text-align:left;
						}
						h3{
								color:#606060 !important;
								display:block;
								font-family:Helvetica;
								font-size:16px;
								font-style:italic;
								font-weight:normal;
								line-height:100%;
								letter-spacing:normal;
								margin:0;
								text-align:left;
						}
						h4{
								color:#808080 !important;
								display:block;
								font-family:Helvetica;
								font-size:14px;
								font-style:italic;
								font-weight:normal;
								line-height:100%;
								letter-spacing:normal;
								margin:0;
								text-align:left;
						}
						#templatePreheader{
								background-color:#ffae00;
								border-top:0;
								border-bottom:0;
						}
						.preheaderContainer .mcnTextContent{
								color:#808080;
								font-family:Helvetica;
								font-size:10px;
								line-height:150%;
								text-align:left;
						}
						.preheaderContainer .mcnTextContent a,.preheaderContent a .yshortcuts {
								color:#606060;
								font-weight:normal;
								text-decoration:underline;
						}
						#templateHeader{
								background-color:#F4F4F4;
								border-top:0;
								border-bottom:0;
						}
						.headerContainer .mcnTextContent{
								color:#505050;
								font-family:Helvetica;
								font-size:14px;
								line-height:150%;
								text-align:left;
						}
						.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent a:link,.headerContainer .mcnTextContent a:visited,.headerContainer .mcnTextContent a .yshortcuts {
								color:#EB4102;
								font-weight:normal;
								text-decoration:underline;
						}
						#templateBody{
								background-color:#ffffff;
								border-top:0;
								border-bottom:0;
						}
						.bodyContainer .mcnTextContent{
								color:#505050;
								font-family:Helvetica;
								font-size:14px;
								line-height:150%;
								text-align:left;
						}
						.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent a .yshortcuts {
								color:#EB4102;
								font-weight:normal;
								text-decoration:underline;
						}
						#templateFooter{
								background-color:#DEE0E2;
								border-top:0;
								border-bottom:0;
						}
						.footerContainer .mcnTextContent{
								color:#808080;
								font-family:Helvetica;
								font-size:10px;
								line-height:150%;
								text-align:left;
						}
						.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent a .yshortcuts {
								color:#606060;
								font-weight:normal;
								text-decoration:underline;
						}
				@media only screen and (max-width: 480px){
						body,table,td,p,a,li,blockquote{
								-webkit-text-size-adjust:none !important;
						}

		}       @media only screen and (max-width: 480px){
						body{
								width:100% !important;
								min-width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcnTextContentContainer]{
								width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcnBoxedTextContentContainer]{
								width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcpreview-image-uploader]{
								width:100% !important;
								display:none !important;
						}

		}       @media only screen and (max-width: 480px){
						img[class=mcnImage]{
								width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcnImageGroupContentContainer]{
								width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageGroupContent]{
								padding:9px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageGroupBlockInner]{
								padding-bottom:0 !important;
								padding-top:0 !important;
						}

		}       @media only screen and (max-width: 480px){
						tbody[class=mcnImageGroupBlockOuter]{
								padding-bottom:9px !important;
								padding-top:9px !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcnCaptionLeftTextContentContainer],table[class=mcnCaptionRightTextContentContainer],table[class=mcnCaptionLeftImageContentContainer],table[class=mcnCaptionRightImageContentContainer],table[class=mcnImageCardLeftTextContentContainer],table[class=mcnImageCardRightTextContentContainer]{
								width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageCardLeftImageContent],td[class=mcnImageCardRightImageContent]{
								padding-right:18px !important;
								padding-left:18px !important;
								padding-bottom:0 !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageCardBottomImageContent]{
								padding-bottom:9px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageCardTopImageContent]{
								padding-top:18px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageCardLeftImageContent],td[class=mcnImageCardRightImageContent]{
								padding-right:18px !important;
								padding-left:18px !important;
								padding-bottom:0 !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageCardBottomImageContent]{
								padding-bottom:9px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnImageCardTopImageContent]{
								padding-top:18px !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcnCaptionLeftContentOuter] td[class=mcnTextContent],table[class=mcnCaptionRightContentOuter] td[class=mcnTextContent]{
								padding-top:9px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnCaptionBlockInner] table[class=mcnCaptionTopContent]:last-child td[class=mcnTextContent]{
								padding-top:18px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=mcnBoxedTextContentColumn]{
								padding-left:18px !important;
								padding-right:18px !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=templateContainer]{
								max-width:600px !important;
								width:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						h1{
								font-size:24px !important;
								line-height:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						h2{
								font-size:20px !important;
								line-height:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						h3{
								font-size:18px !important;
								line-height:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						h4{
								font-size:16px !important;
								line-height:100% !important;
						}

		}       @media only screen and (max-width: 480px){
						table[class=mcnBoxedTextContentContainer] td[class=mcnTextContent]{
								font-size:18px !important;
								line-height:125% !important;
						}

		}       @media only screen and (max-width: 480px){
						table[id=templatePreheader]{
								display:none !important;
						}

		}       @media only screen and (max-width: 480px){
						table[id=templateHeader]{
								border-top:0 !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=headerContainer] td[class=mcnTextContent]{
								font-size:18px !important;
								line-height:125% !important;
								padding-right:18px !important;
								padding-left:18px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=bodyContainer] td[class=mcnTextContent]{
								font-size:18px !important;
								line-height:125% !important;
								padding-right:18px !important;
								padding-left:18px !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=footerContainer] td[class=mcnTextContent]{
								font-size:14px !important;
								line-height:115% !important;
						}

		}       @media only screen and (max-width: 480px){
						td[class=footerContainer] a[class=utilityLink]{
								display:block !important;
						}

		}</style></head>
			<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0;padding: 0;background-color: #ffffff;">
				<center>
					<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;background-color: #ffffff;height: 100% !important;width: 100% !important;">
						<tr>
							<td align="center" valign="top" id="bodyCell" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;border-top: 0;height: 100% !important;width: 100% !important;">
								<!-- BEGIN TEMPLATE // -->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
									<tr>
										<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
											<!-- BEGIN PREHEADER // -->
											<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffae00;border-top: 0;border-bottom: 0;">
												<tr>
														<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
														<table border="0" cellpadding="0" cellspacing="0" width="600" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
															<tr>
																<td valign="top" class="preheaderContainer" style="padding-top: 9px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
			<tbody class="mcnTextBlockOuter">
				<tr>
					<td valign="top" class="mcnTextBlockInner" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">

						<table align="left" border="0" cellpadding="0" cellspacing="0" width="366" class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
							<tbody><tr>

								<td valign="top" class="mcnTextContent" style="padding-top: 9px;padding-left: 18px;padding-bottom: 9px;padding-right: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #808080;font-family: Helvetica;font-size: 10px;line-height: 150%;text-align: left;">

									Ayuda a otros usuarios con tu opini�n. Por favor califica el restaurante.

								</td>
							</tr>
						</tbody></table>

						<table align="right" border="0" cellpadding="0" cellspacing="0" width="197" class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
							<tbody><tr>

								<td valign="top" class="mcnTextContent" style="padding-top: 9px;padding-right: 18px;padding-bottom: 9px;padding-left: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #808080;font-family: Helvetica;font-size: 10px;line-height: 150%;text-align: left;">

									<br>

								</td>
							</tr>
						</tbody></table>

					</td>
				</tr>
			</tbody>
		</table></td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- // END PREHEADER -->
										</td>
									</tr>
									<tr>
										<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
											<!-- BEGIN HEADER // -->
											<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #F4F4F4;border-top: 0;border-bottom: 0;">
												<tr>
													<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
														<table border="0" cellpadding="0" cellspacing="0" width="600" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
															<tr>
																<td valign="top" class="headerContainer" style="padding-top: 10px;padding-right: 18px;padding-bottom: 10px;padding-left: 18px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
			<tbody class="mcnImageBlockOuter">
					<tr>
						<td valign="top" style="padding: 9px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="mcnImageBlockInner">
							<table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
								<tbody><tr>
									<td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">


												<img align="left" alt="" src="http://gallery.mailchimp.com/5431ffc074692263938d8c0df/images/Bildschirmfoto_2013_03_21_um_12.16.03.png" width="564" style="max-width: 835px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;" class="mcnImage">


									</td>
								</tr>
							</tbody></table>
						</td>
					</tr>
			</tbody>
		</table></td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- // END HEADER -->
										</td>
									</tr>
									<tr>
										<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
											<!-- BEGIN BODY // -->
											<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #ffffff;border-top: 0;border-bottom: 0;">
												<tr>
													<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
														<table border="0" cellpadding="0" cellspacing="0" width="600" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
															<tr>
																<td valign="top" class="bodyContainer" style="padding-top: 10px;padding-right: 18px;padding-bottom: 10px;padding-left: 18px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
			<tbody class="mcnTextBlockOuter">
				<tr>
					<td valign="top" class="mcnTextBlockInner" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">

						<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
							<tbody><tr>

								<td valign="top" class="mcnTextContent" style="padding-top: 9px;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #505050;font-family: Helvetica;font-size: 14px;line-height: 150%;text-align: left;">

									<h1 style="display: block;font-family: Helvetica;font-size: 26px;font-style: normal;font-weight: bold;line-height: 100%;letter-spacing: normal;margin: 0;text-align: left;color: #202020 !important;">
				&nbsp;</h1>
		<h1 class="subject" style="margin: 0px 0px 8px;padding: 0px;font-size: 21px;color: #000000;line-height: 1.2;border: 0px;font-family: arial, helvetica, clean, sans-serif;text-align: center;display: block;font-style: normal;font-weight: bold;letter-spacing: normal;">
				<a href="http://androidapp.orderingonlinesystem.com" target="_self" style="color: #EB4102;font-weight: normal;text-decoration: underline;word-wrap: break-word !important;"><img align="none" height="82" src="http://gallery.mailchimp.com/5431ffc074692263938d8c0df/images/logo_mail.png" style="width: 310px;height: 82px;border: 0;line-height: 100%;outline: none;text-decoration: none;" width="310"></a></h1>
		<table cellpadding="0" cellspacing="0" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tbody>
						<tr>
								<td class="td1" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
										<p class="p1" style="text-align: center;">
												<b>�Te gust� la comida que pediste?</b></p>
										<p class="p2" style="text-align: center;">
												<i>Ayuda a otros usuarios a decidir en d�nde ordenar, califica el restaurante de donde hiciste tu pedido. S�lo toma 2 minutos.</i></p>
								</td>
						</tr>
				</tbody>
		</table>
		<p style="text-align: center;">
				<a href="pages/business/'.$business_id->id.'/index.php?order='.$order->id.'" target="_self" style="color: #EB4102;font-weight: normal;text-decoration: underline;word-wrap: break-word !important;"><img align="none" height="39" src="androidapp.orderingonlinesystem.com/images/button_spanish.png" style="width: 245px;height: 39px;border: 0;line-height: 100%;outline: none;text-decoration: none;" width="245"></a></p>

								</td>
							</tr>
						</tbody></table>

					</td>
				</tr>
			</tbody>
		</table></td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- // END BODY -->
										</td>
									</tr>
									<tr>
										<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
											<!-- BEGIN FOOTER // -->
											<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #DEE0E2;border-top: 0;border-bottom: 0;">
												<tr>
													<td align="center" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
														<table border="0" cellpadding="0" cellspacing="0" width="600" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
															<tr>
																<td valign="top" class="footerContainer" style="padding-top: 10px;padding-right: 18px;padding-bottom: 10px;padding-left: 18px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
			<tbody class="mcnTextBlockOuter">
				<tr>
					<td valign="top" class="mcnTextBlockInner" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">

						<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
							<tbody><tr>

								<td valign="top" class="mcnTextContent" style="padding-top: 9px;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #808080;font-family: Helvetica;font-size: 10px;line-height: 150%;text-align: left;">


		<br>
		<a href="http://androidapp.orderingonlinesystem.com">Ordering Online System </a>
								</td>
							</tr>
						</tbody></table>

					</td>
				</tr>
			</tbody>
		</table></td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- // END FOOTER -->
										</td>
									</tr>
								</table>
								<!-- // END TEMPLATE -->
							</td>
						</tr>
					</table>
				</center>
			</body>
		</html>';
   }
   else
   {
		$msg = '<center><table cellpadding="0" cellspacing="0" border="5" style="border:5px solid black;border-spacing:0;border-collapse:collapse;" align="center" width="800"><tbody><tr><td>';
		$msg .= '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="800"><tbody>';
		$msg .= '<tr height="100"><td align="center" valign="middle" style="background-color:#FFE0CC;"><img src="images/logo-mail.png"/></td></tr>';
		$msg .= '<tr><td style="padding:20px;"><span>'.$order->status.'</span><br/><br/><span>'.$order->comment.'</span>';
		$msg .= '</td></tr></tbody></table></td></tr></tbody></table></center>';
   }

	SendMail($msg,'Order status '.$order->id,array($order->email));
	}

	function SetEnabled($id,$enabled)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_zipcode SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}

	function Fetchbusinessname($id)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();
	$data = parse($data);
	pg_prepare($link,'sqlBN','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sqlBN',array($id));
	$rs = pg_fetch_array($result);
		echo $rs['name'];
	pg_close($link);
	}
	function FetchEachzipData($id)
	{
		//SuperAdminsOnly();
		$link = ConnectDB();
		pg_prepare($link,'sqls','SELECT * FROM w_zipcode WHERE id=$1');
		$result = pg_execute($link,'sqls',array($id));
		$zipcode = array();
		$zip = new stdClass();
		while($row=pg_fetch_array($result))
		{
		//unset($zip);
			$zip->id = $row['id'];
			$zip->zipcode = $row['zipcode'];
			$zip->cost = $row['cost'];
			$zip->enabled = $row['enabled'];
			$zip->minimumprice = $row['minimumprice'];
			$zip->deliverytime = $row['deliverytime'];
			//$prein->driver = $row['driver'];
			array_push($zipcode,$zip);
		}

		echo json_encode($zipcode);
	}
	function SaveZipcode($data)
	{

	$form = json_decode($data);
	
	$link = ConnectDB();
	$c =1;
	if ($form->type=='create') {

		pg_prepare($link,'sqlz1','SELECT * FROM w_zipcode ORDER BY id DESC');
	  $fetch_record = pg_execute($link,'sqlz1',array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
				
				   if($c =='1'){
				 $incheck1 =$incheck;
				  }	 
				  
		
				  
				   $zipcode	 = $form->fields->zipcode->value;
				   $cost	 = $form->fields->cost->value;
				   $businessid	 = $form->fields->businessid->value;
				   $minimumprice = $form->fields->minimumprice->value;
				   $deliverytime = $form->fields->deliverytime->value;
				   $scriptid	 = $_SESSION['scriptid'];
				   $enabled		 = "TRUE";
				  
				  
				     pg_prepare($link,'sqlzip12','INSERT INTO w_zipcode (id,zipcode,cost,businessid,enabled,businessinsertid,scriptid,minimumprice,deliverytime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
				   $fetch_insert = pg_execute($link,'sqlzip12',array($incheck,$zipcode,$cost,$businessid,$enabled,$incheck1,$scriptid,$minimumprice,$deliverytime));
		//$query = InsertQuery('w_zipcode',$form->fields);	
	} else {
		 
				 $zipcode = $form->fields->zipcode->value;
				 
				   if($form->fields->business->value!="") {
				 	$business = $form->fields->business->value;
					
					$arr = explode('"-1"',$form->fields->business->value);
					
						if(count($arr)>1)
						{
						$business='["-1"]';
						}
						else
						{
							$business = $form->fields->business->value;
						}
					}
					else
					{
					$business='-1';
					}
					
					
					
					  if($form->fields->days->value!="") {
				 	$days = $form->fields->days->value;
					$arrd= explode('0',$form->fields->days->value);
					
						if(count($arrd)>1)
						{
						$days='[0]';
						}
						else
						{
							$days = $form->fields->days->value;
						}
					}
					else
					{
					$days='[0]';
					}
					
					
			       $cost	 = $form->fields->cost->value;
				   $minimumprice = $form->fields->minimumprice->value;
				   $deliverytime = $form->fields->deliverytime->value;
				  $id = $form->id;
					
					
					
				pg_prepare($link,'sql','UPDATE w_zipcode SET zipcode=$1,cost=$2,minimumprice=$3,deliverytime=$4 WHERE id=$5');
				pg_execute($link,'sql',array($zipcode,$cost,$minimumprice,$deliverytime,$id));
					
				pg_close($link);

		 
			
		
		
		}
	}
	
function Fetchdeliverycity(){
	
	
		$link = ConnectDB();	
	
	unset($businesspagesettings);
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs WHERE name = $1');
	$result = pg_execute($link,'sqlsound',array('deliverycitysetting'));
	$row = pg_fetch_array($result);
	
	echo $row['value'];
	pg_close($link);
	
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
