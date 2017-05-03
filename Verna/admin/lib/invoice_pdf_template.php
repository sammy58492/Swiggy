<?php
session_start();
//include("../languages/lang.en.php");
$lang_resource = GetLangFile();
pg_prepare($link,'sql'.$id,'SELECT * FROM w_invoice WHERE id=$1');
$result = pg_execute($link,'sql'.$id,array($id));
if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			//unset($ad);
			$ad = new stdClass();
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
			if(empty($ad->setuprate))
			{
				$ad->setuprate=0;
			}
			$ad->fixedrate = $row['fixedrate'];
			if(empty($ad->fixedrate))
			{
				$ad->fixedrate=0;
			}
			$ad->perordercommission = $row['perordercommission'];
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			if(empty($ad->orderrate))
			{
				$ad->otherrate=0;
			}
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


			pg_prepare($link,'sqld3'.$id,"SELECT email,street,colony,vatregistration,vatemail,tel FROM w_business where id=$businessi ORDER BY id DESC");
			$fetch_busi = pg_execute($link,'sqld3'.$id,array());
			$rsb = pg_fetch_array($fetch_busi);
			$ad->streetb = $rsb['street'];
			$ad->colonyb = $rsb['colony'];
			$ad->telb = $rsb['tel'];
			$ad->vatregistration = $rsb['vatregistration'];
      $ad->email = $rsb['email'];
      $ad->email3 = $rsb['vatemail'];
			}
			unset($result);
			unset($row);

			$incid=1;
			pg_prepare($link,'sql1'.$id,'SELECT * FROM w_invoiceconf WHERE id=$1');
			$result = pg_execute($link,'sql1'.$id,array($incid));
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

			pg_prepare($link,'sqlmp'.$id,'SELECT * FROM w_makepayment WHERE invoice_id=$1');
			$result5= pg_execute($link,'sqlmp'.$id,array($id));

			pg_prepare($link,'sqlmpt'.$id,'SELECT * FROM w_makepayment WHERE invoice_id=$1');
			$result9= pg_execute($link,'sqlmpt'.$id,array($id));



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
			pg_prepare($link,'sqlmpb'.$id,'SELECT * FROM w_makepayment WHERE business_id=$1 and invoice_id != $2');
			$result2 = pg_execute($link,'sqlmpb'.$id,array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;

      pg_prepare($link,'sqlP'.$id,"SELECT * FROM w_users where id IN(SELECT provider FROM w_business where id=$1)");
      $fetch_prov = pg_execute($link,'sqlP'.$id,array($businessi));
      $rsP = pg_fetch_array($fetch_prov);
      $ad->email2=$rsP['email'];

      pg_prepare($link,'sqlconfigemail_from'.$id,'SELECT * FROM w_configs WHERE name=$1');
      $resultconfigemail_from = pg_execute($link,'sqlconfigemail_from'.$id,array('email_from'));
      $rowconfigemail_from = pg_fetch_array($resultconfigemail_from);

      pg_prepare($link,'sqlconfigsitename'.$id,'SELECT * FROM w_configs WHERE name=$1');
      $resultconfigsitename = pg_execute($link,'sqlconfigsitename'.$id,array('sitename'));
      $rowconfigsitename = pg_fetch_array($resultconfigsitename);

		/*pg_prepare($link,'sqldd','SELECT * from w_configs WHERE name=$1');
			$resultd = pg_execute($link,'sqldd',array('currency'));
			
			$rowd = pg_fetch_array($resultd);
			$rowd = $rowd['value'];*/
			pg_prepare($link,'sqldd','SELECT * from w_business WHERE id=$1');
			$resultd = pg_execute($link,'sqldd',array($businessi));
			
			$rowd = pg_fetch_array($resultd);
			$rowd = $rowd['currency'];

$html ='<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
    <title>Admin Panel</title>
  </head>
 
  <body style=" background:#ffffff">
     <div class="panel-body" style="width:98%; box-sizing: border-box; background:#fff; box-shadow:0px 0px 7px rgba(0,0,0,0.2); margin:50px auto 0px auto;">

                                <div class="row" style="width:100%">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="50%">
                                      <div style="float:left">
                                            <h4 style="margin-bottom:10px;"><strong>'.$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE'] .''.$ad->id.'</strong></h4>
                                            <p style="margin:0px 0;">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_DATE'] .''.$ad->date.'<br>
'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PERIOD'] .'   ( '.$ad->periodp.' )</p>
                                          </div><!--pull-left-->
                                    </td>
                                    <td width="50%">
                                      <div style="float: right; margin-top:20px;">';
                            if($ad->isimg ==1){
                            $html .='<img src="../../panel/images/invoice/1/normal.jpg" height="50">';
                            }else{
                            $html .='<img src="../images/dummy/dummy_adbig.jpg" >';
                            }    
                                  $html .='</div>
                                    </td>
                                  </tr>
                                </table>

                                </div><!--row-->
                                
                                         
      <div style="border:1px solid #ccc; padding:10px; font-size:14px; color:#555; box-sizing: border-box; clear:both; margin-bottom:20px; float:left; width:100%; box-sizing:0px; margin:10px 0px 30px 0px">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="40%">
                          <div class="">
                                 <h4 style=" font-size:14px; color:#333; text-transform: uppercase; margin:5px 0"><strong>'.$ad->resturant.'</strong></h4>
                                 <p>'.$ad->streetb.', '.$ad->colonyb.'<br>
                <strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PHONE'] .'</strong> '.$ad->telb.'</p>
                                </div><!--pull-left-->
                        </td>
                        <td width="60%">
                          <div class="">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                                  <tr>
                                    <td>'.$ad->address.'</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_TEL'] .'</strong></td>
                                    <td>'.$ad->phone.'</td>
                                  </tr>
                                  <tr>
                                    <td><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_EMAIL'] .'</strong></td>
                                    <td>'. $ad->wbmail.'</td>
                                  </tr>
                                  <tr>
                                    <td><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_WEBSITEINVOICE_DETAIL_INVOICE_DATE'] .'</strong></td>
                                    <td>'.$ad->wurl.'</td>
                                  </tr>
                                  <tr>
                                    <td><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_VAT_REGISTRATION'] .'</strong></td>
                                    <td>'.$ad->vatregistration.'</td>
                                  </tr>
                                </table>
                             </div>
                        </td>
                      </tr>
                    </table>
     </div>
                                        
                                        
                                        
                                        
                                         
                               
                                
         <div style="clear:both; width:100%">
                  <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%;">
                <thead >
                  <tr >
        <th width="50%" align="left" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_BREAKDOWN'] .'</th>
          <th width="0%" style="border-bottom:1px solid #ccc; padding:10px 0;">&nbsp;</th>
          <th width="5%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_AMOUNT'] .'</th>
       </tr>
                </thead>
                <tbody>
                                     <tr>
                                        <td>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_TOTAL_VALUE_FOR'] .'</td>
                                        <td>'.$ad->totalorder.' '.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->total_invoice.'</td>
                                    </tr>
                                    <tr>
                                        <td>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PAID_CASH_FOR'] .'</td>
                                        <td>'.$ad->cashcount.' '.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->cashtotal.'</td>
                                    </tr>
                                    <tr>
                                        <td>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PAID_PAYPAL_FOR'] .'</td>
                                        <td>'.$ad->paypalcount.' '.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->paypaltotal.'</td>
                                    </tr>
                                    <tr>
                                        <td>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PREPAID_ONLINE_FOR'] .'</td>
                                        <td>'.$ad->cardcount.' '.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->cardtotal.'</td>
                                    </tr>
                                                        
                </tbody>
              </table>
                            </div><!--table-responsive-->
                            <hr / style=" margin:0px 0px 15px 0px; border-top: 1px solid #ABABAB;">
                            
                            
                            <div class="table-responsive">
                            <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%">
                
                <tbody>
                                     <tr>
                                        <td align="right" width="55%">'.$ad->perordercommission.' '.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_COMMISSION_ON_ORDER'] .'</td>
                                        <td align="right" width="45%">'.$rowd.' '.$ad->commisioncal.'</td>
                                    </tr>
                                    <tr>
                                         <td align="right">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_SETUP_RATE'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->setuprate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_FIXED_RATE'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->fixedrate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PER_ORDER_FIXED_RATE'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->orderrate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_OTHER_RATE'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->otherrate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_VAT'] .' ('.$ad->vat.' %)</td>
                                        <td align="right">'.$rowd.' '.$ad->vatp.'</td>
                                    </tr>             
                </tbody>
              </table>
                            </div><!--table-responsive-->
                              <hr / style=" margin:0px 0px 15px 0px; border-top: 1px solid #ABABAB;">
                              <div class="table-responsive">
                              <table style="margin-bottom:10px; font-size:14px; color:#555;">
                
                <tbody>
                                     <tr>
                                        <td align="right" width="55%">'.$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_TOTAL_AMOUNT_CWED'] .'</td>
                                        <td align="right" width="45%">'.$rowd.' '.$ad->totalbalance.'</td>
                                    </tr>';
$paymenttotal=0;
    $duepayment = $ad->totalbalance;
  while($row9 = pg_fetch_array($result9)){
    $paymenttotal = $paymenttotal + $row9['payment'];
    $duepayment = $row9['pdue'];
  }

if($paymenttotal == 0){
            $html .='<tr>
                        <td align="right">'.$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'] .' ('.$rowd.' '.$ad->totalbalance.' -'.$rowd.' 0.00)</td>
                        <td align="right">'.$rowd.' '.$ad->totalbalance.'</td>
                    </tr>';
}else{
          $html .='<tr>
                      <td align="right">'.$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'] .' ('.$rowd.' '.$ad->totalbalance.' - '.$rowd.' '.$paymenttotal.')</td>
                      <td align="right">'.$rowd.' '.$duepayment.'</td>
                  </tr>';
}

          $html .='<tr>
                    <td align="right">'.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'] .''.$rowd.'0.00 '.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED1'] .'</td>
                                        <td align="right">'.$rowd.' '.$ad->totalinvoicedue.'</td>
                                    </tr> 
                                    <tr>
                                        <td align="right"><strong>'.$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS'] .'</strong></td>
                                        <td align="right">'.$rowd.' '.$ad->totalpay.'</td>
                                    </tr>         
                </tbody>
              </table>
                            </div><!--table-responsive-->
                              <hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">
                              <p style="font-size:14px; color:#555;">'.$lang_resource['INVOICE_QUESTIONS'].'</p>
                              <p style="font-size:14px; color:#555;">'.$lang_resource['INVOICE_INVOICE_INFORMATION'].'</p>
                              
                              <h4 style="text-align:center;">'.$lang_resource['INVOICE_PAYMENT_DETAILS'] .'</h4>
                              <hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">
                              <div class="table-responsive">
                  <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%">
                <thead>
                  <tr>
                                      <th width="40%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAYMENT_TYPE'] .'</th>';
                                

                               if($ad->payby == 1){
                                    $html .='<th width="40%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_BANK_NAME'] .'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_BANK_AC_NO'] .'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_ROUTINE_NO'] .'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_SWIFT_CODE'] .'</th>';
                              }else{ 
                                $html .='<th width="40%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL'] .'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['FRONT_PAYPAL'] .'</th>';
                                }

                          $html .='</tr>
                </thead>
                <tbody>
                                     <tr>
                                        <td>'.$ad->pay.'</td>';
                            if($ad->payby == 1){
                              $html .='<td>'.$ad->bankname.'</td>
                                        <td>'.$ad->bankac.'</td>
                                        <td>'.$ad->routineno.'</td>
                                        <td>'.$ad->swiftcode.'</td>';

                            }else{

                              $html .='<td>'.$ad->vatpaypalemail.'</td>
                                        <td><a href="'.$_SERVER['SERVER_NAME'].'/admin/lib/paymentoption.php?id='.$ad->id .'">
        <img src="../images/paypal-logo.png"></a></td>';
                            }
                   $html .='</tr>               
                </tbody>
              </table>
                            </div><!--table-responsive-->
                             <br /> 
                            <h4 style="text-align:center;">'.$lang_resource['Order_details_V2'] .'</h4>
                              <hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">
                              <div class="table-responsive">
                  <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%">
                <thead>
                  <tr>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">#</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_DATE'] .'</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_ORDER_NO'] .'</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAID_MTD'] .'</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_TOTAL_VALUE'] .'</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAYMENT'] .'</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_INVOICE_DUE'] .'</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_COMMISSION'] .' (%)</th>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_FIXED_RATE'] .'</th>
                                     </tr>
                </thead>
                <tbody>';
                if(pg_num_rows($result5) == 0) {
                      $html .='<tr>
                                    <td align="center" colspan="9" style="padding:10px;"><span style="color:#f00;">'.$lang_resource['INVOICE_NO_RECORD_FOUND'] .'</span></td>
                                </tr>';
                 }else{
                  while($row5 = pg_fetch_array($result5)){
                     $html .='<tr>
                                    <td align="center" style="padding:10px;">'.$row5['id'].'</td>
                                    <td align="center" style="padding:10px;">'.$row5['date'].'</td>
                                    <td align="center" style="padding:10px;">'.$row5['id'].'</td>
                                    <td align="center" style="padding:10px;">'.$ad->pay.'</td>
                                    <td align="center" style="padding:10px;">'.$rowd.' '.$row5['invoicepay'].'</td>
                                    <td align="center" style="padding:10px;">'.$rowd.' '.$row5['payment'].'</td>
                                    <td align="center" style="padding:10px;">'.$rowd.' '.$row5['pdue'].'</td>
                                    <td align="center" style="padding:10px;">'.$ad->perordercommission.'</td>
                                    <td align="center" style="padding:10px;">'.$rowd.' '.$ad->perorderfixedrate.'</td>
                                </tr>';
                  }

                 }               

                             
                    $html .='<tr>
                                    <td colspan="9" style="background:#666666; color:#fff;"><p style="margin:8px; font-size:14px">'.$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS'] .' '.$ad->perorderfixedrate.' '.$lang_resource['INVOICE_PER_ORDER'] .'</strong></p>
                                   
                                </tr>               
                            </tbody>
                        </table>
                            </div><!--table-responsive-->
                              
                        </div><!-- /.panel-body -->   
  </body>
</html>'; 
?>
