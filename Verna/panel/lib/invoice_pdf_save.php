<?php
ob_start();
session_start();
$id=$_GET['oid'];
require('panel-main.php');
require_once('../login/common.php');
require('../config.php');
	$link = ConnectDB($CFG);

	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

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
			$row1 = pg_fetch_array($result1);
			$ad->mpid	 = $row1['id'];
			$ad->mpdate	 = $row1['date'];
			$ad->mpinvoicepay	 = $row1['invoicepay'];
			$ad->payment = $row1['payment'];
			$ad->pdue = $row1['pdue'];

			unset($result);
			unset($row);


			$ad->commisioncal = ($ad->perordercommission/100) * $ad->total_invoice;
			$ad->vatp = ($ad->vat/100) * $ad->commisioncal;
			$ad->totalbalance = $ad->commisioncal + $ad->vatp;

			$ad->totalinvoicedue = 0;
			pg_prepare($link,'sqlmpb','SELECT * FROM w_makepayment WHERE business_id=$1 and invoice_id != $2');
			$result2 = pg_execute($link,'sqlmpb',array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;

$html = '<html><body>';
$html1 ='
<div align="center">

    <div style="width:90%;">

	<table width="100%">
	<tr>
	<td width="49%">
     		<span><strong><font size="4">Invoice_ORDER_'.$ad->id.'</font></strong></span><br>
            <span>Invoice Date : '.$ad->date.'</span><br>
            <span>Period : ( '.$ad->periodp.' )</span><br>

		</td>
        <td width="49%"><div style="width:48%; align="left">';
if($ad->isimg ==1){
$html2 ='<img src="images/invoice/1/small.jpg">';
}else{
$html2 ='<img src="images/dummy/dummy_adbig.jpg" >';
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
       <strong>Phone :</strong>'.$ad->telb.'<br>
      </td>
	<td width="49%" align="right">

        	'.$ad->address.'<br>

            <strong>Tel :</strong>'.$ad->phone.'<br>
            <strong>Email :</strong>'. $ad->wbmail.'<br>
            <strong>Website :</strong>'.$ad->wurl.'<br>
            <strong>VAT Registration :</strong>'.$ad->vatregistration.'

		</td>
		</tr>
		</table>
     </div>

     <div style="margin:10px 0 0 0;">
    	<table width="100%">
			<tr>
            	<td  style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:50%;"><strong><font size="+1.5">Invoice Breakdown</font></strong></td>
                <td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:20%;"><strong></strong></td>
                <td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:30%; text-align:right;"><strong><font size="+1.5">Amount</font></strong></td>
            </tr>
            <tr>
            	<td>Total Value for</td>
                <td>'.$ad->totalorder.' orders</td>
                <td align="right">$'.$ad->total_invoice.'</td>
            </tr>
            <tr>
            	<td>Customer paid cash for</td>
                <td>'.$ad->cashcount.' orders</td>
                <td align="right">$'.$ad->cashtotal.'</td>
            </tr>
			 <tr>
            	<td>Customer paid Paypal for</td>
                <td>'.$ad->paypalcount.' orders</td>
                <td align="right">$'.$ad->paypaltotal.'</td>
            </tr>
            <tr>
            	<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">Customer prepaid online with card for</td>
                <td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ">'.$ad->cardcount.' orders</td>
                <td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;">$'.$ad->cardtotal.'</td>
            </tr>
            <tr>
            	<td colspan="2" align="right">'.$ad->perordercommission.'% Commision on orders</td>
                <td align="right">$'.$ad->commisioncal.'</td>
            </tr>
            <tr>
            	<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">VAT ('.$ad->vat.'%):</td>
                <td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">$'.$ad->vatp.'</td>
            </tr>
            <tr>
            	<td colspan="2" align="right">Total amount owed:</td>
                <td align="right">$'.$ad->totalbalance.'</td>
            </tr>';
if($ad->payment == 0){
$html4='   <tr>
            	<td colspan="2" align="right">Total owned to restrunt ($'.$ad->totalbalance.' - $0.00):</td>
                <td align="right">$'.$ad->totalbalance.'</td>
            </tr>';
}else{
$html4='   <tr>
            	<td colspan="2" align="right">Total owned to restrunt ($'.$ad->totalbalance.' - $'.$ad->payment.'):</td>
                <td align="right">$'.$ad->pdue.'</td>
            </tr>';
}
$html5='<tr>
            	<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">Account balance carried froward from previous invoice ( Note: This should be $0.00 if the previous ammount is possitive, because it had been paid by us )</td>
                <td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">$0.00</td>
            </tr>
             <tr>
            	<td colspan="2" align="right"><strong>Total payable to restrurant (this invoice):</strong></td>
                <td align="right">$'.$ad->totalpay.'</td>
            </tr>
          </table>
     </div>

      <div style="width:92%; float:left;" align="left">
      	<strong><font size="+2">We will pay $0.00 into your account:</font></strong>
      </div>

      <div style="width:100%; margin:10px 0 0 0; float:left;" align="left">
      	If you have any question regarding this invoice or your information, please contact us at Tel: or via e-mail at If you have any question regarding this invoice or your information, please contact us at Tel: or via e-mail at If you have any question regarding this invoice or your information, please contact us at Tel: or via e-mail at : <a href="#">support@orderonlinesystem.com</a>
      </div>

      <div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#666; height:30px;" align="left">
		Amount will paid in your account on ro arround the 14th May, 2014.
      </div>

       <div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#666; height:50px;" align="left">
          Regarding this invoice or your information, please contact us at Tel: or via e-mail at If you have any question regarding this invoice or your information, please contact us at Tel: or via e-mail at : <a href="#">support@orderonlinesystem.com</a>
       </div>

	          <div style="width:30%; margin:5px 0 0 0; float:left;" align="left">
      	<strong><font size="+2">Payment Details</font></strong>
      </div>

       <br clear="all">';
  if($ad->payby == 1){
$html6='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
      <table width="100%">
			<tr align="center">

                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong>payment Type</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>Bank Name</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Bank A/c</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Routine No.</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Swift Code</strong></td>

            </tr>
            <tr bgcolor="#FFD9B3">

                <td align="center"><strong>'.$ad->pay.'</strong></td>
                <td align="center"><strong>'.$ad->bankname.'</strong></td>
                <td align="center"><strong>'.$ad->bankac.'</strong></td>
                <td align="right"><strong>'.$ad->routineno.'</strong></td>
                <td align="right"><strong>'.$ad->swiftcode.'</strong></td>

            </tr>
            <tr>
            	<td align="right" colspan="6"><strong>Subtotal commision on orders</strong></td>
                <td align="right"><strong>$0.00</strong></td>
            </tr>
      </table>
      </div>';
  }else{

$html6='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
      <table width="100%">
			<tr align="center">

                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>payment Type</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>E-mail Address</strong></td>

            </tr>
            <tr bgcolor="#FFD9B3">

                <td align="center"><strong>'.$ad->pay.'</strong></td>
                <td align="center"><strong>'.$ad->vatpaypalemail.'</strong></td>
            </tr>

      </table>
      </div>';

 }



   $html7='<div style="width:30%; margin:5px 0 0 0; float:left;" align="left">
      	<strong><font size="+2">Order Details</font></strong>
      </div>

       <br clear="all">
      <div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">
      <table width="100%">
			<tr align="center">
            	<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:5%"><strong>#</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong>Date</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong>Order No.</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Paid Mtd.</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Total Value</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Payment</strong></td>
                <td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong>Due</strong></td>
            </tr>';
if($ad->mpid){
        $html8='<tr bgcolor="#FFD9B3">
            	<td align="center"><strong>1</strong></td>
                <td align="center"><strong>'.$ad->mpdate.'</strong></td>
                <td align="center"><strong>'.$ad->mpid.'</strong></td>
                <td align="center"><strong>'.$ad->pay.'</strong></td>
                <td align="right"><strong>$'.$ad->mpinvoicepay.'</strong></td>
                <td align="right"><strong>$'.$ad->payment.'</strong></td>
                <td align="right"><strong>$'.$ad->pdue.'</strong></td>
            </tr>';
}else{
    $html8='<tr bgcolor="#FFD9B3">
            	<td align="center" colspan="7"><strong>No Record Found</strong></td>
            </tr>';

	}

      $html9='</table>
      </div>


   </div>

   <br clear="all">
   <div align="left" style="width:100%; height:40px; margin-top:10px; border-top-width:15px; border-top-style:outset; border-top-color:#333333;">
   Your current commision is '.$ad->perordercommission.'% per Order
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
//$name_pdf="temp_invoice.pdf";
file_put_contents("../temp_pdf/temp_invoice.pdf", $pdf);

		require "class.phpmailer.php";
		$mail = new PHPMailer();
		$mail->PluginDir = "";
		$mail->Host = "localhost";
		$mail->From = $row['email_from'];
		$mail->FromName = $row['sitename'];
		$mail->Subject =  "Invoice";
		$mail->AddAddress = $row['email_from'];
		$mail->MsgHTML("INVOICE");
		$mail->IsHTML(true);
		$mail->AddAttachment("../temp_pdf/temp_invoice.pdf");
		$mail->AltBody ="Order";
		$mail->CharSet = 'UTF-8';
		$success = $mail->Send();
		unlink("../temp_pdf/temp_invoice.pdf");
?>
