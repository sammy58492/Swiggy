<?php

function ConnectDB($CFG = 'empty')
{
	if ($CFG=='empty')
		require('panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
}


	require('panel/config.php');
	require "panel/lib/class.phpmailer.php";
	$link = ConnectDB();
	pg_prepare($link,'sql1','SELECT * from w_business');
	pg_prepare($link,'sql2','SELECT * from w_invoice where businessi=$1');
	
	//pg_prepare($link,'sql31','SELECT * from w_business WHERE id=$1');
	$result1 = pg_execute($link,'sql1',array());

	//$categories = array();
	pg_prepare($link,'sqlma4',"SELECT * FROM w_business where id=$1 ORDER BY id DESC");
	//pg_prepare($link,'sqld2','insert w_invoice set id=$1,city=$2,total_invoice=$3,resturant=$4,totalorder=$5,orderid=$6,count=$7,total=$8,invoicepay=$9,businessi=$10,setuprate=$11,fixedrate=$12,perordercommission=$13,perorderfixedrate=$14,otherrate=$15,date=$16,vat=$17,billing=$18');
	// pg_prepare($link,'sqld2','INSERT INTO w_invoice (id,city,businessi,dfrm,tfrm,billing,total_invoice,resturant,date,totalorder,orderid,count,total,vat,invoicepay,transactionfeepercent,transactionfeefixed,servicefeeparcent,servicefeefixed,cardfeespercent,cardfeesfixed,marketingbudgetpercent,marketingbudgetfixed,monthlyservicefee,licensinghostingfee,perordercommission) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)');
	
	//check all business
	while($row = pg_fetch_array($result1))
		{
				
				//check the auto invoice day 	
			if($row['autoinvoiceday']!='NULL'){				
			
					
					 //while($rec = pg_fetch_array($result2))
					 
					 $date1 = $row['last_update_invoice'];  		
					 if($date1!=''){		
				     $date2 = date("Y-m-d H:i:s");
					 $date1Timestamp = strtotime($date1);
					 $date2Timestamp = strtotime($date2);					
					  $difference = $date2Timestamp - $date1Timestamp;	
									
					   $diff = floor($difference / (60*60*24) );	
					 if($diff == $row['autoinvoiceday']){	
					
							$resultinvoice = invoicecreate($row['id']);
							if($resultinvoice !=false){
								SendReminder1($resultinvoice);
							}
							
							//sendinvoice($row['id']);
					 }
					 }else{
						$resultinvoice = invoicecreate($row['id']);
							if($resultinvoice !=false){
								SendReminder1($resultinvoice);
							}
					 }
					 
				 
			}
			
		}
		
	function SendReminder1($id){

	$link = ConnectDB();
//$link = ConnectDB($CFG);
 pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
      	$currencyformat = $row1['value'];
			/*if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');*/

				include_once 'languages/lang.en.php';
	
	//$link = ConnectDB();
	//$data = parse($data);
	pg_prepare($link,'sql_a','SELECT * FROM w_invoice WHERE id=$1');
	pg_prepare($link,'sqlP',"SELECT * FROM w_users where id IN(SELECT provider FROM w_business where id=$1)");
	pg_prepare($link,'sqlfb',"SELECT email,street,colony,vatregistration,tel FROM w_business where id=$1");
	pg_prepare($link,'sql1ic','SELECT * FROM w_invoiceconf WHERE id=$1');
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

			$incid=$businessi;

			$result = pg_execute($link,'sql1ic',array($incid));
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
			$ad->orderrate =round($ad->orderrate, 2);

			$ad->commisioncal = ($ad->perordercommission/100) * $ad->total_invoice;
			$ad->commisioncal =round($ad->commisioncal, 2);
			$ad->tmptotal = $ad->commisioncal + $ad->setuprate + $ad->fixedrate + $ad->orderrate + $ad->otherrate;
			$ad->tmptotal =round($ad->tmptotal, 2);

			$ad->vatp = ($ad->vat/100) * $ad->tmptotal;
			$ad->vatp =round($ad->vatp, 2);
			$ad->totalbalance = $ad->tmptotal + $ad->vatp;
			$ad->totalbalance =round($ad->totalbalance, 2);


			$ad->totalinvoicedue = 0;

			$result2 = pg_execute($link,'sqlmpb',array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;
			$ad->totalpay =round($ad->totalpay, 2);

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
							<td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;">'.$currencyformat.' '.GetDecimalPoint($ad->cardtotal,2).'</td>
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
			include("panel/payment-gateway/pdf/dompdf_config.inc.php");


			$dompdf = new DOMPDF();
			$dompdf->load_html($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);

			$dompdf->render();
			$dompdf->set_paper("A4","portrait");

			$date=date("Y-m-d H:i:s");
			$file_name=$fetch->invo;
			$pdf = $dompdf->output();
			file_put_contents("panel/temp_pdf/invoice.pdf", $pdf);

			$mail->PluginDir = "";
			$mail->Host = "localhost";
			$mail->From = $row['email_from'];
			$mail->FromName = $row['sitename'];
			$mail->Subject =  $lang_resource['INVOICE_PDF_INVOICE'];
			//$mail->AddAddress("avijit.acuity@gmail.com");
			 $ad->email2;
			 $ad->email;
			if($ad->email2!=""){
				$mail->AddAddress($ad->email2);
			}
			if($ad->email!=""){
				$mail->AddAddress($ad->email);
			}
			$mail->MsgHTML($html.$html1.$pic.$html2.$html3.$html4.$html5.$html6.$html7.$html8.$html9.$html10);
			$mail->IsHTML(true);
			$mail->AddAttachment("panel/temp_pdf/invoice.pdf",$id."_invoice.pdf");
			$mail->AltBody = $lang_resource['INVOICE_ORDER_PDF'];
			$mail->CharSet = 'UTF-8';
			$mail->Send();
			unlink("panel/temp_pdf/invoice.pdf");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	pg_close($link);
}

		
		

function invoicecreate($id){
	
				 $adid = $id;
				require('panel/config.php');				
				$link = ConnectDB($CFG);
				
				 $datefromc =  date('Y-m-d');
				 $datetoc = date('Y-m-d', strtotime($datefromc .'-15 day'));
				
				pg_prepare($link,'sqld1'.$adid,"SELECT * FROM w_orders where date between $1 and $2 and  invoicestatus=0 and status=1");
				$fetch_order = pg_execute($link,'sqld1'.$adid,array($datetoc,$datefromc));			
			
				if(pg_num_rows($fetch_order)==0){
					return false;
					
					
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
					//pg_prepare($link,'sqli'.$adid,'update w_orders set invoicestatus=1 WHERE id=$1');
					
					while($rs = pg_fetch_array($fetch_order) ) {
						
						$dataa=$rs['data'];
						
						$dataa=json_decode($dataa);
						$dataa->business[0]->id;
						$business = $adid;
					

						if($dataa->business[0]->id == $business){
							if($dataa->business[0]->paymethod->cash == 1){
								$cashcount = $cashcount+1;
								$cashtotal +=$dataa->total;
								$cashtotal =round($cashtotal, 2);
							}

							if($dataa->business[0]->paymethod->card == 1){
								$cardcount = $cardcount+1;
								$cardtotal +=$dataa->total;
								$cardtotal =round($cardtotal, 2);
							}
							if($dataa->business[0]->paymethod->paypal == 1){
								$paypalcount = $paypalcount+1;
								$paypaltotal +=$dataa->total;
								$paypaltotal =round($paypaltotal, 2);

							}

							$totalorder = $totalorder+1;
							array_push($order_id,$rs['id']);
							//pg_execute($link,'sqli'.$adid,array($rs['id']));

						}

					}
					$count=array("cash"=>$cashcount,"card"=>$cardcount,"paypal"=>$paypalcount);
					$total=array("cash"=>$cashtotal,"card"=>$cardtotal,"paypal"=>$paypaltotal);
					//print_r($count);
					//print_r($total);
					$totalval =$cashtotal + $cardtotal + $paypaltotal;
					$totalval =round($totalval, 2);
				
					//exit;
					if($totalval != 0){
					$business = $adid;
					pg_prepare($link,'sqld3'.$adid,"SELECT * FROM w_business where id=$business ORDER BY id DESC");
					$fetch_busi = pg_execute($link,'sqld3'.$adid,array());
					unset($bcity);
					unset($resturantname);
					unset($setuprate);
					unset($fixedrate);
					unset($perordercommission);
					unset($perorderfixedrate);
					unset($vat);
					unset($otherrate);
					
					
					$rsb = pg_fetch_array($fetch_busi);
					
					/*echo "<pre>";
					print_r($rsb);
					echo "</pre>";*/
					$bcity=$rsb['city'];
					$resturantname=$rsb['name'];
					$setuprate =$rsb['billingfxprice'];
					  $fixedrate = $rsb['fixedrate'];
					  $perordercommission	 = $rsb['billingperorder'];
					  $perorderfixedrate = $rsb['billingperorderfixrate'];
					  $vat = $rsb['vat'];
					  $otherrate = $rsb['otherrate'];

				  pg_prepare($link,'sqld4'.$adid,'SELECT * FROM w_invoice ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqld4'.$adid,array());

				  if(pg_num_rows($fetch_record) == 0) {
				  $incheck = 1;
				  } else {
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }

			
				  
						$orderrate =$perorderfixedrate * $totalorder;
						$orderrate =round($orderrate, 2);

				    	 $commisioncal = ($perordercommission/100) * $totalval;
						$commisioncal =round($commisioncal, 2);
						$tmptotal = $commisioncal + $setuprate + $fixedrate + $orderrate + $otherrate;
						$tmptotal =round($tmptotal, 2);

						$vatp = ($vat/100) * $tmptotal;
						$vatp =round($vatp, 2);
						$totalbalance1 = $tmptotal + $vatp;
						$totalbalance1 =round($totalbalance1, 2);


/*

					$commisioncal1 = ($perordercommission/100) * $totalval;
					$commisioncal1 =round($commisioncal1, 2);
					$vatp1 = ($vat/100) * $commisioncal1;
					$vatp1 =round($vatp1, 2);
					$totalbalance1 = $commisioncal1 + $vatp1;
					$totalbalance1 =round($totalbalance1, 2); */

				 $cureentdate= date('Y-m-d H:i:s');
$billing=1;


						   pg_prepare($link,'sqld2'.$adid,'INSERT INTO w_invoice (id,city,businessi,dfrm,tfrm,billing,setuprate,fixedrate,perordercommission,perorderfixedrate,otherrate,total_invoice,resturant,date,totalorder,orderid,count,total,vat,invoicepay) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)');
						   $fetch_insert = pg_execute($link,'sqld2'.$adid,array($incheck,$bcity,$business,$datefromc,$datetoc,$billing,$setuprate,$fixedrate,$perordercommission,$perorderfixedrate,$otherrate,$totalval,$resturantname,$cureentdate,$totalorder,json_encode($order_id),json_encode($count),json_encode($total),$vat,$totalbalance1));
						   return $incheck;

				}else{return false; }

				}
		
					
					}
				
				
	


?>