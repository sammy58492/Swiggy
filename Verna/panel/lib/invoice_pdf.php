<?php
ob_start();
session_start();
$id=$_GET['oid'];
require('../../languages/lang.en.php');
require('panel-main.php');
require_once('../login/common.php');
require('../config.php');
	$link = ConnectDB($CFG);
 pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
      	$currencyformat = $row1['value'];
		
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
			$result5= pg_execute($link,'sqlmp',array($id));

			pg_prepare($link,'sqlmpt','SELECT * FROM w_makepayment WHERE invoice_id=$1');
			$result9= pg_execute($link,'sqlmpt',array($id));



			unset($result);
			unset($row);

			$ad->orderrate =$ad->perorderfixedrate * $ad->totalorder;
			$ad->orderrate =round($ad->orderrate, $_SESSION['decimal_value']);

			$ad->commisioncal = ($ad->perordercommission/100) * $ad->total_invoice;
			$ad->commisioncal =round($ad->commisioncal, $_SESSION['decimal_value']);
			$ad->tmptotal = $ad->commisioncal + $ad->setuprate + $ad->fixedrate + $ad->orderrate + $ad->otherrate;
			$ad->tmptotal =round($ad->tmptotal, $_SESSION['decimal_value']);

			$ad->vatp = ($ad->vat/100) * $ad->tmptotal;
			$ad->vatp =round($ad->vatp, 2);
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
$html2 ='<img src="../images/logo/1/normal.jpg" height="50">';
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
                <td align="right"> '.GetDecimalPoint($ad->total_invoice).'</td>
            </tr>
            <tr>
            	<td>'.$lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR'].'</td>
                <td>'.$ad->cashcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                <td align="right"> '.GetDecimalPoint($ad->cashtotal).'</td>
            </tr>
			 <tr>
            	<td>'.$lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR'].'</td>
                <td>'.$ad->paypalcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                <td align="right"> '.GetDecimalPoint($ad->paypaltotal).'</td>
            </tr>
            <tr>
            	<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR'].'</td>
                <td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ">'.$ad->cardcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                <td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;"> '.GetDecimalPoint($ad->cardtotal).'</td>
            </tr>
            <tr>
            	<td colspan="2" align="right">'.$ad->perordercommission.'% '.$lang_resource['INVOICE_COMMISSION_ON_ORDERS'].'</td>
                <td align="right"> '.GetDecimalPoint($ad->commisioncal).'</td>
            </tr>';
if($ad->setuprate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_SETUP_RATE'].' </td>
				<td align="right"> '.GetDecimalPoint($ad->setuprate).'</td>
			 </tr>';
	}
if($ad->fixedrate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_FIXED_RATE'].'</td>
				<td align="right"> '.GetDecimalPoint($ad->fixedrate).'</td>
			 </tr>';
	}
if($ad->orderrate != 0){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_PER_ORDER_FIXED_RATE'].' </td>
				<td align="right"> '.GetDecimalPoint($ad->orderrate).'</td>
			 </tr>';
	}
if($ad->otherrate != null){
	$html3 .='<tr>
				<td colspan="2" align="right">'.$lang_resource['INVOICE_OTHER_RATE'].' </td>
				<td align="right"> '.GetDecimalPoint($ad->otherrate).'</td>
			 </tr>';
	}

				$html3 .='<tr>
            	<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_VAT'].' ('.$ad->vat.'%):</td>
                <td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right"> '.GetDecimalPoint($ad->vatp).'</td>
            </tr>
            <tr>
            	<td colspan="2" align="right">'.$lang_resource['INVOICE_ORDER_TOTAL_AMOUNT_OWED_TO_US'].':</td>
                <td align="right"> '.GetDecimalPoint($ad->totalbalance).'</td>
            </tr>';
		$paymenttotal=0;
		$duepayment = $ad->totalbalance;
	while($row9 = pg_fetch_array($result9)){
		$paymenttotal = $paymenttotal + $row9['payment'];
		$duepayment = $row9['pdue'];
	}

			if($paymenttotal == 0){
			$html4='   <tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_TOTAL_AMOUNT_CWED_FROM_RESTAURANT'].' ( '.GetDecimalPoint($ad->totalbalance).' -  0.00):</td>
							<td align="right"> '.GetDecimalPoint($ad->totalbalance).'</td>
						</tr>';
			}else{
			$html4='   <tr>
							<td colspan="2" align="right">'.$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'].' ( '.GetDecimalPoint($ad->totalbalance).' -  '.GetDecimalPoint($paymenttotal).'):</td>
							<td align="right"> '.GetDecimalPoint($duepayment).'</td>
						</tr>';
			}
$html5='<tr>
            	<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;">'.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'].'</td>
     <td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right"> '.GetDecimalPoint($ad->totalinvoicedue).'</td>
            </tr>
             <tr>
            	<td colspan="2" align="right"><strong>'.$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS'].':</strong></td>
                <td align="right"> '.GetDecimalPoint($ad->totalpay).'</td>
            </tr>
          </table>
     </div>



      <div style="width:100%; margin:10px 0 0 0; float:left;" align="left">
      	'.$lang_resource['INVOICE_QUESTIONS'].' : <a href="#">'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</a>
      </div>


       <div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#666; height:70px;" align="left">
         '.$lang_resource['INVOICE_INVOICE_INFORMATION'].' : <a href="#">'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</a><br><br>
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
				<td align="center"><strong><a href="../js/paymentoption.php?id='.$ad->id .'">
				<img src="../../images/panel/paypal.png"></a></strong></td>
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
                <td align="right"><strong>'.$row5['invoicepay'].'</strong></td>
                <td align="right"><strong>'.$row5['payment'].'</strong></td>
                <td align="right"><strong>'.$row5['pdue'].'</strong></td>
				<td align="right"><strong>'.$ad->perordercommission.'</strong></td>
				<td align="right"><strong>'.$ad->perorderfixedrate.'</strong></td>
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


//echo $html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10;
//exit;
//print $html.$html1.$html2;exit;
include("../payment-gateway/pdf/dompdf_config.inc.php");


$dompdf = new DOMPDF();
$dompdf->load_html($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);

$dompdf->render();
$dompdf->set_paper("A4","portrait");

$date=date("Y-m-d H:i:s");
$file_name=$fetch->invo;
$pdf = $dompdf->output();

$dompdf->stream($file_name."invoice.pdf");

?>
