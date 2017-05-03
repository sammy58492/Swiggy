<?php
ob_start();
session_start();
$id=$_GET['oid'];
require('panel-main.php');
require_once('../login/common.php');
require('../config.php');
$lang_resource = GetLangFile();
  $link = ConnectDB($CFG);

  pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
  $result = pg_execute($link,'sql',array($id));

  if (pg_num_rows($result)==1)
    while($row = pg_fetch_array($result)){
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
      $result = new stdClass();
      $row = new stdClass();
   

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
      $result5= pg_execute($link,'sqlmp',array($id));

      pg_prepare($link,'sqlmpt','SELECT * FROM w_makepayment WHERE invoice_id=$1');
      $result9= pg_execute($link,'sqlmpt',array($id));



      $result = new stdClass();
      $row = new stdClass();

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

    /*  pg_prepare($link,'sqldd','SELECT * from w_configs WHERE name=$1');
      $resultd = pg_execute($link,'sqldd',array('currency'));
      
      $rowd = pg_fetch_array($resultd);   
      $currency= preg_quote($rowd['value'], '/');*/
        
      pg_prepare($link,'sqldd','SELECT * from w_business WHERE id=$1');
      $resultd = pg_execute($link,'sqldd',array($businessi));
      
      $rowd = pg_fetch_array($resultd);
      $currency = $rowd['currency'];


$html ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
  <head>
<html><head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <style>
  @font-face {
    font-family: latha;
    font-style: normal;
    font-weight: 400;
    src: url(http://eclecticgeek.com/dompdf/fonts/latha.ttf) format(\'true-type\');
  }
  </style>

  </head>
  
<body style="font-family: latha, DejaVu Sans, sans-serif;">
     <div class="panel-body fnt" style="width:98%; box-sizing: border-box; background:#fff; box-shadow:0px 0px 7px rgba(0,0,0,0.2); margin:50px auto 0px auto;">

                                <div class="row fnt" style="width:100%">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="50%">
                                      <div style="float:left" class="fnt">
                                            <h4 style="margin-bottom:10px;"><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_ORDER'].'<span>'.$ad->id.'</span></strong></h4>
                                            <p style="margin:0px 0;" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_DATE'].'<span>'.$ad->date.'</span><br>
'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PERIOD'].'   ( '.$ad->periodp.' )</p>
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
                                
                                         
      <div class="fnt" style="border:1px solid #ccc; padding:10px; font-size:14px; color:#555; box-sizing: border-box; clear:both; margin-bottom:20px; float:left; width:100%; box-sizing:0px; margin:10px 0px 30px 0px">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fnt">
                      <tr>
                        <td width="40%">
                          <div class="fnt">
                                 <h4 style=" font-size:14px; color:#333; text-transform: uppercase; margin:5px 0"><strong>'.$ad->resturant.'</strong></h4>
                                 <p class="fnt">'.$ad->streetb.', '.$ad->colonyb.'<br>
                <strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PHONE'].'</strong> '.$ad->telb.'</p>
                                </div><!--pull-left-->
                        </td>
                        <td width="60%">
                          <div class="fnt">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fnt">
                                  <tr>
                                    <td class="fnt">'.$ad->address.'</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td class="fnt"><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_TEL'].'</strong></td>
                                    <td class="fnt">'.$ad->phone.'</td>
                                  </tr>
                                  <tr>
                                    <td class="fnt"><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_EMAIL'].'</strong></td>
                                    <td class="fnt">'. $ad->wbmail.'</td>
                                  </tr>
                                  <tr>
                                    <td class="fnt"><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_WEBSITE'].'</strong></td>
                                    <td class="fnt">'.$ad->wurl.'</td>
                                  </tr>
                                  <tr>
                                    <td class="fnt"><strong>'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_VAT_REGISTRATION'].'</strong></td>
                                    <td class="fnt">'.$ad->vatregistration.'</td>
                                  </tr>
                                </table>
                             </div>
                        </td>
                      </tr>
                    </table>
     </div>
                                        
                                        
                                        
                                        
                                         
                               
                                
         <div style="clear:both; width:100%" class="fnt">
                  <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%;" class="fnt">
                <thead >
                  <tr >
        <th width="50%" align="left" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_BREAKDOWN'].'</th>
          <th width="0%" style="border-bottom:1px solid #ccc; padding:10px 0;">&nbsp;</th>
          <th width="5%" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_AMOUNT'].'</th>
       </tr>
                </thead>
                <tbody>
                                     <tr>
                                        <td class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_TOTAL_VALUE_FOR'].'</td>
                                        <td class="fnt">'.$ad->totalorder.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                                        <td align="right" class="fnt"> '.$currency." ".$ad->total_invoice.'</td>
                                    </tr>
                                    <tr>
                                        <td class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PAID_CASH_FOR'].'</td>
                                        <td class="fnt">'.$ad->cashcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->cashtotal.'</td>
                                    </tr>
                                    <tr>
                                        <td class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PAID_PAYPAL_FOR'].'</td>
                                        <td class="fnt">'.$ad->paypalcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->paypaltotal.'</td>
                                    </tr>
                                    <tr>
                                        <td class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PREPAID_ONLINE_FOR'].'</td>
                                        <td class="fnt">'.$ad->cardcount.' '.$lang_resource['INVOICE_ORDERS'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->cardtotal.'</td>
                                    </tr>
                                                        
                </tbody>
              </table>
                            </div><!--table-responsive-->
                            <hr / style=" margin:0px 0px 15px 0px; border-top: 1px solid #ABABAB;">
                            
                            
                            <div class="table-responsive fnt">
                            <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%">
                
                <tbody>
                                     <tr>
                                        <td align="right" width="55%" class="fnt">'.$ad->perordercommission.' '.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_COMMISSION_ON_ORDER'].'</td>
                                        <td align="right" width="45%" class="fnt">'.$currency." ".$ad->commisioncal.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_SETUP_RATE'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->setuprate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_FIXED_RATE'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->fixedrate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PER_ORDER_FIXED_RATE'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->orderrate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_OTHER_RATE'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->otherrate.'</td>
                                    </tr>
                                    <tr>
                                        <td align="right" class="fnt">'.$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_VAT'].' ('.$ad->vat.' %)</td>
                                        <td align="right" class="fnt">'.$currency."".$ad->vatp.'</td>
                                    </tr>             
                </tbody>
              </table>
                            </div><!--table-responsive-->
                              <hr / style=" margin:0px 0px 15px 0px; border-top: 1px solid #ABABAB;">
                              <div class="table-responsive fnt">
                              <table style="margin-bottom:10px; font-size:14px; color:#555;">
                
                <tbody>
                                     <tr>
                                        <td align="right" width="55%" class="fnt">'.$lang_resource['Total amount cwed to Ordering online System'].':</td>
                                        <td align="right" width="45%" class="fnt">'.$currency."".$ad->totalbalance.'</td>
                                    </tr>';
$paymenttotal=0;
    $duepayment = $ad->totalbalance;
  while($row9 = pg_fetch_array($result9)){
    $paymenttotal = $paymenttotal + $row9['payment'];
    $duepayment = $row9['pdue'];
  }

if($paymenttotal == 0){
            $html .='<tr>
                        <td align="right" class="fnt">'.$lang_resource['INVOICE_TOTAL_AMOUNT_CWED_FROM_RESTAURANT'].'('.$currency."".$ad->totalbalance.' - '.$currency."".' 0.00)</td>
                        <td align="right" class="fnt">'.$currency."".$ad->totalbalance.'</td>
                    </tr>';
}else{
          $html .='<tr>
                      <td align="right" class="fnt">'.$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'].' ('.$currency."".$ad->totalbalance.' - '.$currency."".$paymenttotal.')</td>
                      <td align="right" class="fnt">'.$currency."".$duepayment.'</td>
                  </tr>';
}

          $html .='<tr>
                    <td align="right" class="fnt">'.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'].' '.$currency.' '.$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED_1'].'</td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->totalinvoicedue.'</td>
                                    </tr> 
                                    <tr>
                                        <td align="right" class="fnt"><strong>'.$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS'].':</strong></td>
                                        <td align="right" class="fnt">'.$currency." ".$ad->totalpay.'</td>
                                    </tr>         
                </tbody>
              </table>
                            </div><!--table-responsive-->
                              <hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">
                              <p style="font-size:14px; color:#555;" class="fnt">'.$lang_resource['INVOICE_QUESTIONS'].' : '.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</p>
                              <p style="font-size:14px; color:#555;" class="fnt">'.$lang_resource['INVOICE_INVOICE_INFORMATION'].':'.$lang_resource['INVOICE_SUPPORT_EMAIL'].'</p>
                              
                              <h4 style="text-align:center;" class="fnt">'.$lang_resource['INVOICE_PAYMENT_DETAILS'].'</h4>
                              <hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">
                              <div class="table-responsive fnt">
                  <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%">
                <thead>
                  <tr>
                                      <th width="40%" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['INVOICE_PAYMENT_TYPE'].'</th>';
                                

                               if($ad->payby == 1){
                                    $html .='<th width="40%" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['INVOICE_BANK_NAME'].'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['INVOICE_BANK_AC_NO'].'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['INVOICE_ROUTINE_NO'].'</th>
                                         <th width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;" class="fnt">'.$lang_resource['INVOICE_SWIFT_CODE'].'</th>';
                              }else{ 
                                $html .='<th class="fnt" width="40%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_EMAIL_ADDRESS'].'</th>
                                         <th class="fnt" width="20%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAYPAL'].'</th>';
                                }

                          $html .='</tr>
                </thead>
                <tbody>
                                     <tr>
                                        <td class="fnt">'.$ad->pay.'</td>';
                            if($ad->payby == 1){
                              $html .='<td class="fnt">'.$ad->bankname.'</td>
                                        <td class="fnt">'.$ad->bankac.'</td>
                                        <td class="fnt">'.$ad->routineno.'</td>
                                        <td class="fnt">'.$ad->swiftcode.'</td>';

                            }else{

                              $html .='<td class="fnt">'.$ad->vatpaypalemail.'</td>
                                        <td class="fnt"><a href="'.$_SERVER['SERVER_NAME'].'/admin/lib/paymentoption.php?id='.$ad->id .'">
        <img src="../images/paypal-logo.png"></a></td>';
                            }
                   $html .='</tr>               
                </tbody>
              </table>
                            </div><!--table-responsive-->
                             <br /> 
                            <h4 style="text-align:center;" class="fnt">'.$lang_resource['INVOICE_ORDER_DETAILS'].'</h4>
                              <hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">
                              <div class="table-responsive">
                  <table style="margin-bottom:10px; font-size:14px; color:#555; width:100%">
                <thead>
                  <tr>
                                        <th width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">#</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_DATE'].'</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_ORDER_NO'].'</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAID'].'</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_TOTAL_VALUE'].'</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_PAYMENT'].'</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_DUE'].'</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_COMMISSION'].' (%)</th>
                                        <th class="fnt" width="10%" style="border-bottom:1px solid #ccc; padding:10px 0;">'.$lang_resource['INVOICE_FIXED_RATE'].' Rate</th>
                                     </tr>
                </thead>
                <tbody>';
                if(pg_num_rows($result5) == 0) {
                      $html .='<tr>
                                    <td align="center" colspan="9" style="padding:10px;" class="fnt"><span style="color:#f00;">'.$lang_resource['INVOICE_NO_RECORD_FOUND'].'</span></td>
                                </tr>';
                 }else{
                  while($row5 = pg_fetch_array($result5)){
                     $html .='<tr>
                                    <td class="fnt" align="center" style="padding:10px;">'.$row5['id'].'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$row5['date'].'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$row5['id'].'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$ad->pay.'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$currency." ".$row5['invoicepay'].'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$currency." ".$row5['payment'].'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$currency." ".$row5['pdue'].'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$currency." ".$ad->perordercommission.'</td>
                                    <td class="fnt" align="center" style="padding:10px;">'.$currency." ".$ad->perorderfixedrate.'</td>
                                </tr>';
                  }

                 }               

                             
                    $html .='<tr>
                                    <td class="fnt" colspan="9" style="background:#666666; color:#fff;"><p style="margin:8px; font-size:14px">'.$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS'].''.$ad->perorderfixedrate.' '.$lang_resource['INVOICE_PER_ORDER'].'</strong></p>
                                   
                                </tr>               
                            </tbody>
                        </table>
                            </div><!--table-responsive-->
                              
                        </div><!-- /.panel-body -->   
  </body>
 
 
</html>';

include("../pdf/dompdf_config.inc.php");
if ( isset( $html ) ) {
    if ( get_magic_quotes_gpc() )
    $html = stripslashes($html);
    
    $dompdf = new DOMPDF();
    //$dompdf->load_html($html,'UTF-8');
    $dompdf->load_html(html_entity_decode($html));  
    $dompdf->set_paper('a4', 'portrait');// or landscape
    $dompdf->render();
    $date=date("Y-m-d H:i:s");
    $file_name=$fetch->invo;
    $dompdf->stream($file_name."invoice.pdf");
}
?>
