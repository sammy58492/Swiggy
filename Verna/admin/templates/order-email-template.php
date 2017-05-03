<?php
ob_start();
session_start();
// Turn off error reporting
error_reporting(0);
header('content-type:text/html;charset=utf-8');

function convert2Digit($num){
	if($num<10){
		return "0".GetDecimalPoint($num);
	}else{
		return GetDecimalPoint($num);
	}
}
		pg_prepare($link,'sqlfb','SELECT value FROM w_configs where name=$1');
		$resultfb = pg_execute($link,'sqlfb',array('facebooklink'));
		$rowfb = pg_fetch_array($resultfb);
		$fblink = $rowfb['value'];
		
		pg_prepare($link,'sqltw','SELECT value FROM w_configs where name=$1');
		$resulttw = pg_execute($link,'sqltw',array('twitterlink'));
		$rowtw = pg_fetch_array($resulttw);
		$twlink = $rowtw['value'];

		pg_prepare($link,'sqlrss','SELECT value FROM w_configs where name=$1');
		$resultrss = pg_execute($link,'sqlrss',array('rsslink'));
		$rowrss = pg_fetch_array($resultrss);
		$rsslink = $rowrss['value'];
		
		pg_prepare($link,'sqlgpluslink','SELECT value FROM w_configs where name=$1');
		$resultrss1 = pg_execute($link,'sqlgpluslink',array('gpluslink'));
		$rowrss1 = pg_fetch_array($resultrss1);
		$gpluslink = $rowrss1['value'];

		
		pg_prepare($link,'linkendinlink','SELECT value FROM w_configs where name=$1');
		$resultrss2 = pg_execute($link,'linkendinlink',array('linkendinlink'));
		$rowrss2 = pg_fetch_array($resultrss2);
		$linkendinlink = $rowrss2['value'];
		
		pg_prepare($link,'instagramlink','SELECT value FROM w_configs where name=$1');
		$resultrss3 = pg_execute($link,'instagramlink',array('instagramlink'));
		$rowrss3 = pg_fetch_array($resultrss3);
		$instagramlink = $rowrss3['value'];


$particular_business = $order->business[0];
if ($particular_business->paymethod->paypal==true) {
     $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $tx . ")";
}
if ($particular_business->paymethod->cash==true) {
     $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_CASH'];
}

if ($particular_business->paymethod->authorize==true) {
	 //$paymethod_paypal = "Paid via Authorize.net (Transaction Code " . $a_trnx_code . ")";
	 $paymethod_paypal = $lang_resource['V3_ORDER_PAID_AUTHORIZE']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $a_trnx_code . ")";
}


if ($particular_business->paymethod->braintree==true) {
	 //$paymethod_paypal = "Paid via BrainTree (Transaction Code " . $paymentid . ")";
	 $paymethod_paypal = $lang_resource['V3_ORDER_PAID_BRAIN']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";
}


if ($particular_business->paymethod->transactium==true) {
	if($paymentid=='Failure'){
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_NOT_TRANSACTIUM'];
	}else{
	//$paymethod_paypal = "Paid via Transactium (Transaction: " . $paymentid . ")";
	$paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_TRANSACTIUM']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
	}
	
}
if ($particular_business->paymethod->pexpress==true) {
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYMENTEXPRESS']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
}

if ($particular_business->paymethod->maksekeskus==true) {
	 //$paymethod_paypal = "Paid via Maksekeskus (Transaction Code " . $paymentid . ")";
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_MAKSEKESKUS']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
}
if ($particular_business->paymethod->voguepay==true) {
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_VOGUEPAY']." "."(" . $paymentid . ")";
	 
}

if ($particular_business->paymethod->skrill==true) {
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_SKRILL']." "."(" . $paymentid . ")";
}

if ($particular_business->paymethod->payeezy==true) {
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYEEZY']." "."(" . $paymentid . ")";
}

//request collection start
 if((isset($requestcollectionset))&&($requestcollectionset==true)){
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $tx . ")";
	  $deltype=$lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'];
 }
//request collection end 

//check if paymethod  cash or card
if(($particular_business->paymethod->cash==false) && (($particular_business->paymethod->card==false)) && ($particular_business->paymethod->paypal==false))
  {
	  $relative_printer_path = "../../../orders/"; 
	  include_once "../../lib/printer-code.php";
	  
  }
if($perid!=0){
	
	$id=$perid;
}else{
	$id=$id;
}

$Showmsg = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, text-size=normal">
<title>'.$_SERVER["HTTP_HOST"].' : '.$lang_resource['INVOICE_ORDER_PDF'].' # ' . $id . '</title>
<link rel="stylesheet" type="text/css" href="../../templates/style.css"/>
<style type="text/css">
body, td, input, textarea, select{
	margin:0;
	font-family: arial,sans-serif;
}
.message1{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:30px;color:#404040;	
}
.message2{
	color:#e74c3c;font-size:24px;font-weight:bold;font-family:Open Sans, Arial, Helvetica, sans-serif;	
}
.message3{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:20px;color:#000;text-align:center;		
}
.heading td{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;
}
.even{
	background-color:#f7f7f7;
}
.odd{
	background-color:#ebebeb;
}
.detail-table{
	border:solid 1px #e3e3e3;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:15px;color:#666666;
	margin-top:15px;	
}
.detail-table tr td{
	border-bottom:solid 2px #fff;
	padding:8px;	
}
.total-price{
	width:100%;text-align:right;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#000;font-weight:bold;display:block;float:left;
}
.message4{
	text-align:center;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#666666;
	border-bottom:solid 1px #dedede;
}
.app-table{
	margin-top:10px;	
}
.footer-table{
	background-color:#252a30;
	height:44px;
	margin-top:15px;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:10px;color:#fff;
	text-align:center;
}
.footer-table td a{
	color:#fff;
	text-decoration:none;
}
ul {
	list-style: none;
	margin: 0px 0px 0px 0px;
	padding: 0px 0px 0px 0px;
	width: 100%;
	float:left;
	
	}
li{
font-size: 12px;
color: #333;

line-height: 17px;
}
 h4{
margin: 5px 0px 0px 0px;
padding: 0px 0px 0px 0px;
font-size: 12px;
color: #e74c3c;
text-transform: uppercase;
}
.options{
	width:100%;
	float:left;
	margin: 7px 0px 0px 0px;
padding: 0px 0px 0px 5px;
}

.gray_button{
    border-radius:3px;
    width:27px;
    min-height:18px;
    float:left; 
    border:none; 
    margin:0px 0px 0px 0px; 
    background:#dedede; 
}
.green_button{
    border-radius:3px; 
    width:27px; 
    min-height:18px; 
    float:left; 
    background:#91d547; 
    border:none; 
    margin:0px 0px 0px 0px; 
}
h5 {
 background:#dedede;
 padding:14px;
 margin:0 5px 5px;
 border-radius:5px;
 float:left;
 width:0px !important;
 height:0px !important;
 
}
h6 {
 background:#91d547;
 padding:14px;
 margin:0 5px 5px;
 border-radius:5px;
 width:0px !important;
 height:0px !important;
 float:left;
 
}
</style>

</head>

<body>

    <div class="container">
        
        <div class="tab1">
        <div class="back-sec">
			<a href="http://'.$_SERVER["HTTP_HOST"].'" style="text-decoration: none;"><button type="button" class=" back_btn">'.$lang_resource['SHOPPING_SECOND_WHERE_BACK_BUTTON'].'</button></a>
        </div><!--back-sec-->
            	
            <div class="top-sec">
                
                <div class="logo">
                    <a href="http://' . $_SERVER["HTTP_HOST"] . '">

';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $Showmsg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" alt="logo"  />';
					}
					else
					{
						 $Showmsg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" alt="logo"  />';
					}
                   $Showmsg .=  '</a>
                </div>
                <div class="social">
                    <div class="tab-social">';
                        if($twlink){
                        $Showmsg .= '<a href="http://www.twitter.com/'.$twlink.'">
                            <img src="../../templates/images/twitter-icon.png" alt=""/>
                        </a>';
						}
                  	   if($fblink){
                        $Showmsg .= '<a href="http://www.facebook.com/'.$fblink.'">
                            <img src="../../templates/images/fb-icon.png" alt=""/>
                        </a>';
						}
						 if($rsslink){						
                           $Showmsg .= '<a href="'.$rsslink.'">
                            <img src="../../templates/images/rss-icon.png" alt=""/>
                        </a>';
						
						 }
						 if($gpluslink){						
                           $Showmsg .= '<a href="'.$gpluslink.'">
                            <img src="../../templates/images/Google+.png" alt=""/>
                        </a>';
						
						 }
						 if($linkendinlink){						
                           $Showmsg .= '<a href="'.$linkendinlink.'">
                            <img src="../../templates/images/LinkedIn.png" alt=""/>
                        </a>';
						
						 }
						  if($instagramlink){						
                           $Showmsg .= '<a href="'.$instagramlink.'">
                            <img src="../../templates/images/instagram.png" alt=""/>
                        </a>';
						
						 }
                            
                   $Showmsg .= ' </div>
                </div>
                
            </div>
                    
            <div class="tab2">
                
                <div class="msg">
                    <div>
                    '.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].',<br/>
                   '.$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_SUCCESS'].'
                    </div>	
                </div>';

                 $bu_id=$particular_business->id; // particular Business id
               pg_prepare($link,'sql5b','SELECT * from w_business WHERE id=$1');
               $result23b = pg_execute($link,'sql5b',array($bu_id));
               $row23b = pg_fetch_array($result23b);
			  $row23b['currency'] = currency_symbol($row23b['currency']);
			   
			   
			   function currency_symbol($sitecurrency){

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
	return '£';			
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
	}
	
}
			   
			  // include_once "../lib/front_bulk.php";
			  //$row23b['currency'] = currency_symbol($row23b['currency']);
			  
			
			   
               if ($row23b['isimg']==1){ // Check image is upload for particular Business
                 $bb_img='http://' . $_SERVER["HTTP_HOST"].'/panel/images/business/'.$row23b['id'].'/original.jpg';
               }else{
                 $bb_img='http://' . $_SERVER["HTTP_HOST"].'/panel/images/business/dummy.jpg';  
               }  
			    pg_prepare($link,'sql5cx','SELECT city from w_franchises WHERE id=$1');
               $resultcity = pg_execute($link,'sql5cx',array($row23b['city']));
  			   $cityfetch = pg_fetch_array($resultcity); 

  			   pg_prepare($link,'sql5country','SELECT name from w_countries WHERE id=$1');
               $resultcountry = pg_execute($link,'sql5country',array($row23b['country']));
               $countryfetch = pg_fetch_array($resultcountry); 

			  
               $Showmsg .='<div class="brand-logo">
                    <img src="'.$bb_img.'">
                </div>
                
                <div class="order-misc">
                    <div class="ord-msg">
                        <div class="msg-text1">'.$lang_resource['Order_V2'].' # ' . $id . '</div>
                        <a href="http://' . $_SERVER["HTTP_HOST"] . '">'.$lang_resource['MOBILE_FRONT_VISUALS_TRACK_ORDER'].'</a>
                    </div>';
					if((!isset($requestcollectionset))||($requestcollectionset==false)){
                    $Showmsg .=' <div class="msg-text">
                        <div>'.$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER'].'<br/>
                            <span class="sp1">'.$particular_business->name.' : <strong>'.$particular_business->tel.'</strong></span>
                        </div>
                    </div>';
					}else{
							 $Showmsg .='<div class="msg-text">
                        <div>'.$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER'].'<br/>
                            <span class="sp1">'.ucfirst($requestcollectiondata[0]["resturent_name"]).' : <strong>'.$requestcollectiondata[0]["resturent_contactno"].'</strong></span>
                        </div>
                    </div>';
							
              }
                $Showmsg .='  </div>
                
            </div>';
			
            if($order->buyer->deliveryType == "pickup") {	

            	$resturantaddress = ucfirst($row23b['street']) .','. ucfirst($row23b['colony']) .','. $cityfetch['city'].' , '. $countryfetch['name'];
                $resturantaddress = str_replace("/","@",$resturantaddress);

            	$buyeraddress = ucfirst($order->buyer->address).','. $order->buyer->colony . ','. $order->buyer->cityname ;
                $buyeraddress = str_replace("/","@",$buyeraddress);
					
				$Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">
                <tr bgcolor="e74c3c">
                    <td colspan="2" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['EMAIL_RESTAURENT_INFO'] .'</td>
                  
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_NAME'].' : </td>
                    <td>' . ucfirst($row23b['name']) . '</td>
                </tr>
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_ADDRESS'].' : </td>
                     <td>' . ucfirst($row23b['street']) . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_NEIGHBORHOOD'].' : </td>
                    <td>' . ucfirst($row23b['colony']) . '</td>
                </tr>
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_CITY'].' :  </td>
                    <td>' .  $cityfetch['city'] . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_ZIPCODE'].' : </td>
                    <td>' . ucfirst($row23b['cp']) . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
 					<td colspan="2" align="center"><a href="https://www.google.co.in/maps/dir/'.$resturantaddress.'/'.$buyeraddress.'" class="getdirection">Get Direction of Takeway</a></td>
				</tr>
               
			</table>';
	}



			 
                    
            $Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">';
			
			if($braintree_firstname){ //If paid by Braintree
				$Showmsg .='<tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$order->buyer->deliveryType.' Address</div></td>
				</tr>';
			}
			if($order->business[0]->dishes){  
                $Showmsg .='<tr bgcolor="e74c3c">
                    <td width="30%" class="top-td1">'.$lang_resource['PAYMENT_GATEWAY_ALL_DESCRIPTION'].'</td>
                    <td class="top-td2">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</td>
                </tr>';
                
                $checkoutfields = $order->buyer->checkoutfields;
				
              if((!isset($requestcollectionset))||($requestcollectionset==false)){
				if(in_array('Name', $checkoutfields)){
                $Showmsg .='<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_NAME'].'</td>';
				
						  $Showmsg .='  <td>' . ucfirst($order->buyer->name) . '</td>';
					
                   
                 $Showmsg .='  </tr>';
				}
				}else{
					  $Showmsg .='<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_NAME'].'</td>';
					  $Showmsg .='  <td>' . ucfirst($requestcollectiondata[0]["customer_name"]) . '</td>';
					    $Showmsg .='  </tr>';
				}
			if((!isset($requestcollectionset))||($requestcollectionset==false)){
				if(in_array('Last Name', $checkoutfields)){
				$Showmsg .='<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_LASTNAME'].'</td>
                    <td>' . ucfirst($order->buyer->lastname2) . '</td>
                </tr>';
				}
				if(in_array('Email', $checkoutfields)){
                $Showmsg .='<tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['MOBILE_FRONT_VISUALS_EMAIL'].'</td>
                    <td><a class="mail-id" target="_blank" href="mailto:' . strtolower($order->buyer->email) . '">' . strtolower($order->buyer->email) . '</a></td>
                </tr>';
				}
			 }
			 	  if((!isset($requestcollectionset))||($requestcollectionset==false)){
				if(in_array('Full Address', $checkoutfields)){
                $Showmsg .='<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].' </td>
                    <td>' . ucfirst($order->buyer->address) . '</td>
                </tr>';
				}
				if(in_array('APT/Suit', $checkoutfields)){
				 $Showmsg .='<tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['MOBILE_FRONT_VISUALS_APT'].' </td>
                    <td>' . $order->buyer->api . '</td>
                </tr>';
				}
				
				
				if(in_array('Where did you find about us', $checkoutfields)){
                $Showmsg .='<tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['Referenece_V2'].' </td>
                    <td>' . $order->buyer->reference . '</td>
                </tr>';
            }
			
				if(in_array('Phone', $checkoutfields)){
                $Showmsg .='<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_PHONE'].'</td>
                    <td>' . $order->buyer->tel . '</td>
                </tr>';
				}
				
				if(in_array('City', $checkoutfields)){
                $Showmsg .='<tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['MOBILE_FRONT_VISUALS_CITY'].'</td>
                    <td>' . $order->buyer->cityname . '</td>
                </tr>';
				}
				if(in_array('Area / Neighborhood', $checkoutfields)){
				 $Showmsg .='<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_FRONT_VISUALS_NEIGHBOR'].'</td>
                    <td>' . $order->buyer->colony . '</td>
                </tr>';
				}
				if(in_array('Zipcode', $checkoutfields)){
				$Showmsg .='<tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['MOBILE_FRONT_VISUALS_ZIP'].'</td>
                    <td>' . $order->buyer->zipcode . '</td>
                </tr>';
				}
				  }else{
					    $Showmsg .='  <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].' </td>
                    <td>' . ucfirst($requestcollectiondata[0]["customer_address1"].','.$requestcollectiondata[0]["customer_address2"]) . '</td>
                </tr>';
				   $Showmsg .='   <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['MOBILE_FRONT_VISUALS_CITY'].'</td>
                    <td>' . $requestcollectiondata[0]["customer_town"] . '</td>
                </tr>'; $Showmsg .='   <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'].'</td>
                    <td>' . $requestcollectiondata[0]["customer_postcode"] . '</td>
                </tr>';
				
				  $Showmsg .='   <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_PHONE'].'</td>
                    <td>' .$requestcollectiondata[0]["customer_contactno"] . '</td>
                </tr>';
				 $Showmsg .='   <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'].'</td>
                    <td>' . $requestcollectiondata[0]["customer_note"] . '</td>
                </tr>';
				  }
			
				 if((!isset($requestcollectionset))||($requestcollectionset==false)){
				if ($order->preorder == 'true') {
						  //Time selection settings. 
							   $str='';
							$time_format=$rowtimeformat['value'];
							if($time_format==12){
								
									$str='PM';
									if($order->preordertimehh<12){
										$str='AM';
									}
									$order->preordertimehh=floor($order->preordertimehh%12);
									
									 if (intval($order->preordertimehh) < 10) {
										$order->preordertimehh = "0".$order->preordertimehh;
									}
									if (intval($order->preordertimemm) < 10) {
										$order->preordertimemm = "0".$order->preordertimemm;
									}
							}else{
								
								if($order->preordertimehh>=24){
										 $str='AM';
										$order->preordertimehh=floor($order->preordertimehh%12);
										
									}
									 if (intval($order->preordertimehh) < 10) {
										$order->preordertimehh = "0".$order->preordertimehh;
									}
									if (intval($order->preordertimemm) < 10) {
										$order->preordertimemm = "0".$order->preordertimemm;
									}
							}
							
				if(in_array('Takeout Date', $checkoutfields)){		
                $Showmsg .= '<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_TYPE'].'</td>
                    <td><strong>'.$lang_resource['SHOPPING_PREORDER'].'</strong></td>
                </tr>
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['V3_ORDER_DELIVERY_DATE'].' &amp; '.$lang_resource['RESPONSIVE_ORDER_EMAIL_TIME'].'</td>
				
                    <td>' .$order->buyer->deliverydate . '  ' . $order->preordertimehh . ': '. $order->preordertimemm .' '.$str. '</td>
                </tr>';
				}
				else {
					if($order->buyer->deliverydate) {
						
						if($order->buyer->deliverydate == "ASAP")
						$dtxts = $lang_resource['V3_ORDER_DELIVERY_TIME'];
						else 
						$dtxts = $lang_resource['V3_ORDER_DELIVERY_DATE'];
						
				  $Showmsg .= '<tr bgcolor="#f7f7f7">
                    <td>'.$dtxts.'</td>
                    <td><strong>'.$order->buyer->deliverydate.'</strong></td>
                </tr>';
				}
				if($order->buyer->deliveryhours) {
				$Showmsg .= '<tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['V3_ORDER_DELIVERY_TIME'].'</td>
                    <td>'.$order->buyer->deliverytimeText.'</td>
                </tr>';		
				}
		}
	}
				 }
				 $htime = date("H",strtotime($requestcollectiondata[0]["resturent_collection_time"]));
				  $mtime = date("i",strtotime($requestcollectiondata[0]["resturent_collection_time"]));
				 $time_format=$rowtimeformat['value'];
				 $str='';
							if($time_format==12){
								
									$str='PM';
									if($htime<12){
										$str='AM';
									}
									$htime=floor($htime%12);
									
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime);
									}
									if (intval($mtime) < 10) {
										$mtime = "0".intval($mtime);
									}
							}else{
								
								if($htime>=24){
										 $str='AM';
										$htime=floor($htime%12);
										
									}
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime);
									}
									if (intval($mtime) < 10) {
										$mtime= "0".intval($mtime);
									}
							}
				  $date = date("d/m/Y",strtotime($requestcollectiondata[0]["resturent_collection_time"]));
            $Showmsg .= '</table>';
			  if((isset($requestcollectionset))&&($requestcollectionset==true)){
				 $Showmsg .= '   <table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">
                <tr bgcolor="e74c3c">
                    <td width="30%" class="top-td1">Description</td>
                    <td class="top-td2">'.$lang_resource['FRONT_MAIN_EMAIL_RESTRENT_DETAILS'].'</td>
                </tr> <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_NAME'].'</td>';
					 $Showmsg .='  <td>' . ucfirst($requestcollectiondata[0]["resturent_name"]) . '</td>';
					   $Showmsg .='  </tr>';
					     $Showmsg .='  <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'].' </td>
					
                    <td>' . $date.'&nbsp;'.$htime.":".$mtime ."&nbsp;".$str.'</td>
                </tr>';
				  $Showmsg .='   <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'].'</td>
                    <td>' .$requestcollectiondata[0]["resturent_other_value"] . '</td>
                </tr>';
					 $Showmsg .='   <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'].'</td>
                    <td>' . $requestcollectiondata[0]["resturent_other_reference"] . '</td>
                </tr>';   
					 $Showmsg .='   <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'].'</td>
                    <td>' . $requestcollectiondata[0]["resturent_postcode"] . '</td>
                </tr>';      
					   
				  $Showmsg .= '</table>';
				
			  }
			 if((!isset($requestcollectionset))||($requestcollectionset==false)){
			//Braintree section
			if($braintree_firstname)
					{
						
						if($order->buyer->address!=$braintree_address1)
						{
			
			$Showmsg .= '<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">
               <tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS'].'</div></td>
				</tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'].'</td>
                    <td>' .  $braintree_firstname .  '</td>
                </tr>
				
				<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_LASTNAME'].'</td>
                    <td>' . $braintree_lastname . '</td>
                </tr>
				
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'].'</td>
                    <td>' . $braintree_address1 . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'].' </td>
                    <td>' . $braintree_address2 . '</td>
                </tr>
				
				 <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_CITY'].' </td>
                    <td>' . $braintree_city . '</td>
                </tr>
				
				
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_STATE'].' </td>
                    <td>' . $braintree_state . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'].'</td>
                    <td>' . $braintree_zipcode . '</td>
                </tr>
                
				
				
				';
					
            $Showmsg .= '</table>';
			
						}
						else
						{
							$Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME']." ".$order->buyer->deliveryType." ".$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME_ADDRESS'].'</td>
				</tr>
							
						 </table>';	
						}
			
					}
			//end braintree section
                  
           $Showmsg .= ' <table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">
                <tr bgcolor="e74c3c" class="heading">				
                    <td class="top-td1">'.$lang_resource['FRONT_MAIN_EMAIL_ITEMS'].'</td>
					<td class="top-td1">'.$lang_resource['SHOPPING_NO_OF_PERSON'].'</td>
                    <td class="top-td1">'.$lang_resource['FRONT_MAIN_EMAIL_OPTIONS'].'</td>
                    <td class="top-td1">'.$lang_resource['FRONT_MAIN_EMAIL_COMMENT'].'</td>
                    <td class="top-td1">'.$lang_resource['FRONT_MAIN_EMAIL_RATE'].'</td>
                </tr>';
		
		foreach ($particular_business->dishes as $dish) {
			if($dish->options) {
			 $productOptionHtml =  Margeslash($dish->options);  
			} else {
				$productOptionHtml ='';
				}
			 
                $Showmsg .= '<tr bgcolor="#f7f7f7">
                    <td width="35%">' .$dish->quantity.' x ' . $dish->name . '</td>
					<td width="35%">' .$dish->nofperson. '</td>
                    <td width="25%">'. $productOptionHtml .'</td>
					
                    <td width="20%">' . ucfirst(strtolower($dish->comments)) . '</td>
                    <td width="40%">'.$row23b["currency"].' '. convert2Digit($dish->total) . '</td>
                </tr>';
				 $total = $total + $dish->total;
        }
				
		if ($order->buyer->taxtype == 1) {
			$total     = $total + $particular_business->shipping + $order->tax;
			$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'];
		} else {
			$total     = $total + $particular_business->shipping;
			$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'];
		}
		
		
		
		$taxpercentage = GetDecimalPoint($order->buyer->tax);
		$tipsprice     = GetDecimalPoint($order->buyer->tips);
		
		if ($order->buyer->tips > 0) {
			$total = $total + $order->buyer->tips;
		}
		
		$total = GetDecimalPoint($total);
		
		$deltype = $order->buyer->deliveryType;
		
		//business shipping and comment info
		if ($particular_business->shipping == '0.00')
			$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];
		else
			$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];

				if($deltype != "Pickup") {	

   $Showmsg .= '<tr bgcolor="#ebebeb">
                    <td>' . $shippingcaption . '</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td>' . ucfirst(strtolower($particular_business->comments)) . '</td>
                    <td>'.$row23b["currency"].' '. convert2Digit($particular_business->shipping ). '</td>
                </tr>';
				       }
				
                        /*discount code section */
                         if((isset($order->discountcategory)) && (trim($order->discountprice) !=''))
		  {
                            if ($order->discounttype == 1)
                                $discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] . " (" . $order->discountrate . "%)";
                            else if ($order->discounttype == 2)
                                $discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'];
                            
                            $total = $total - $order->discountprice;
                            $total = GetDecimalPoint($total);
                            
           if(in_array('Discount Coupon', $checkoutfields)){	             
  			 $Showmsg .= '<tr bgcolor="#ebebeb">
                    <td>' . $discountcaption . '</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td>' . ucfirst(strtolower($order->discountcomments)) . '</td>
                    <td>'.$row23b["currency"].' '.convert2Digit($order->discountprice) . '</td>
                </tr>';
            }
			}
			
			
			
			
			
			
                  /*service fee section */
		  if(isset($order->servicefeeTotal1))
		  {
			 if(($order->servicefee==null) ||($order->servicefee=='')){
				 $order->servicefee=0;
			 }
			   $discountcaption = $lang_resource['SERVICE_FEE_V2'] ." (" .$order->servicefee ."%)";
			  
			 if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }		
			$Showmsg .='<tr bgcolor="'.$bg.'">
					  <td style="border-bottom:solid 2px #fff;padding:8px;">' . $discountcaption . '</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($order->servicefeeTotal1) . '</td>
				  </tr>';
				  $cntr ++;
		  }
		  /*service fee section */        
                        /*discount code section */
				
				
			  if ($order->tax > 0) {
  			 $Showmsg .= '<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['REORDER_CONFIRM_TAX'].' (' . $taxpercentage . '%)<br/> <span style="font-size:11px;font-weight:bold">' . ucfirst(strtolower($taxstring)) . '</span></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td>'.$row23b["currency"].' '. convert2Digit($order->tax) . '</td>
                </tr>';
				
			  }
			  if(in_array('Tip For The Driver', $checkoutfields)){	
			  
			  if ($order->buyer->tips > 0) {
				$Showmsg .= '<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CHECKOUT_TIP_FOR_THE_DRIVER'].'</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td>'.$row23b["currency"].' '.convert2Digit($tipsprice) . '</td>
                </tr>';

			  }
			}
						  
				
	$Showmsg .= '</table>';

		 }else{
				   $Showmsg .= ' <table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">';
				    $Showmsg .= '<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'].'</td>
                   
                    <td>' . $requestcollectiondata[0]["deliveryprice"] . '</td>
                </tr>';
				 $total = $total +$requestcollectiondata[0]["deliveryprice"];
				      $Showmsg .= ' </table>';
			 }
			 }
			 
			  if(!$order->business[0]->dishes){						
					 $Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr bgcolor="e74c3c">
                        	<td width="30%" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'].'</td>
                            <td style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</td>
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst($order->buyer->name) . '</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_EMAIL'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;"><a style="color:#666666;text-decoration:none;" target="_blank" href="mailto:'. strtolower($order->buyer->email) . '">'. strtolower($order->buyer->email) . '</a></td>
                        </tr>
                        
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['Phone_V2'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->tel . '</td>
                        </tr>
                		</table>';
						
					}	
       if($order->reservestatus){
						$reservequery = 'SELECT * from w_reserve WHERE  business=$1';
						pg_prepare($link,'sqlshowr2',$reservequery);
						$reserverecord = pg_execute($link,'sqlshowr2',array($order->business[0]->id));
					
						$reserves = array();
						
						while($row = pg_fetch_array($reserverecord)){
						
										unset($reserve);
										$reserve->id = $row['id'];
										$reserve->rtype = $row['rtype'];
												
										$reserve->guest = $row['guest'];
										$reserve->name = $row['name'];
										
										array_push($reserves,$reserve);
									

						}
					
											
					 $Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td class="top-td3">'.$lang_resource['RESERVATION'].'</td>
                        </tr>';
					
			if(sizeof($order->reserveQty->Table) != 0){			
						
                $Showmsg .='<tr bgcolor="#f7f7f7">
                        	<td style="text-align:center;">Table</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td>';
						foreach ($reserves as $a){	
						 if($a->rtype == 1){
							$Showmsg .='<div style="width: 25%;margin-bottom: 5px;">'.$a->name.'</div>
							<div class="tab-table">';
									$countg = $a->guest;
									for($countr =1; $countr<=$countg; $countr++){
									
									if(in_array($a->id.'_'.$countr,$order->reserveQty->Table)){
									 $Showmsg .='<div class="butt1">
                                    	<button></button>
									</div>';
                                    }else{
                                    $Showmsg .='<div class="butt2"><button></button></div>';
									}
									
									}
									
							$Showmsg .='</div>';
						 
						}
						}
                            $Showmsg .='</td>
                        </tr>';
			}
			if(sizeof($order->reserveQty->Room) != 0){			
						
                $Showmsg .='<tr bgcolor="#f7f7f7">
                        	<td style="text-align:center;">Room</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td>';
						foreach ($reserves as $a){	
						 if($a->rtype == 2){
							$Showmsg .='<div style="width: 25%;margin-bottom: 5px;">'.$a->name.'</div>
							<div class="tab-table">';
									$countg = $a->guest;
									for($countr =1; $countr<=$countg; $countr++){
									if(in_array($a->id.'_'.$countr,$order->reserveQty->Room)){
									 $Showmsg .='<div class="butt1">
                                    	<button></button>
									</div>';
                                    }else{
                                    $Showmsg .='<div class="butt2"><button></button></div>';
									}
									
									}
									
							$Showmsg .='</div>';
						 
						}
						}
                            $Showmsg .='</td>
                        </tr>';
			}
						 
			if(sizeof($order->reserveQty->Free) != 0){			
						
                $Showmsg .='<tr bgcolor="#f7f7f7">
                        	<td style="text-align:center;">Free</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td>';
						foreach ($reserves as $a){	
						 if($a->rtype == 3){
							$Showmsg .='<div style="width: 25%;margin-bottom: 5px;">'.$a->name.'</div>
							<div class="tab-table">';
									$countg = $a->guest;
									for($countr =1; $countr<=$countg; $countr++){
									if(in_array($a->id.'_'.$countr,$order->reserveQty->Free)){ 
									 $Showmsg .='<div class="butt1">
                                    	<button></button>
									</div>';
                                    }else{
                                    $Showmsg .='<div class="butt2"><button></button></div>';
									}
									
									}
									
							$Showmsg .='</div>';
						 
						}
						}
                            $Showmsg .='</td>
                        </tr>';
			}
					
					
					
						
                    $Showmsg .='</table>';
	
				pg_prepare($link,'sqlRTitleShow','SELECT name FROM w_reserve WHERE id =$1');
					
					if($order->reserveQty) {
						foreach($order->reserveQty as $value=>$keyval)
						{
								$rr=0;
								$tt=0;
								$ff=0;
								
								if($value == "Room") {
				
							 foreach($keyval as $rrr) {
									
									$room_data1 = explode("_",$rrr);
									
									$resultTileroom1 = pg_execute($link,'sqlRTitleShow',array($room_data1[0]));
									
									$titleroom1 = pg_fetch_array($resultTileroom1);
									
									
									
									$order->reserveQty->Room1[$rr] = $titleroom1['name']."_".$room_data1[1];
									
									$rr++;
									}
							}
								
								
							if($value == "Table") {
							
							 foreach($keyval as $tb) {
									
									$table_data1 = explode("_",$tb);
									
									$resultTileroom1 = pg_execute($link,'sqlRTitleShow',array($table_data1[0]));
									
									$titleroom1= pg_fetch_array($resultTileroom1);
									
									
									
									$order->reserveQty->Table1[$tt] = $titleroom1['name']."_".$table_data1[1];
									
									$tt++;
									}
							}
							
							if($value == "Free") {
				
									foreach($keyval as $fre) {
									
									$free_data1 = explode("_",$fre);
									
									$resultTilefree1 = pg_execute($link,'sqlRTitleShow',array($free_data1[0]));
									
									$titlefree1 = pg_fetch_array($resultTilefree1);
									
									$order->reserveQty->Free1[$ff] = $titlefree1['name']."_".$free_data1[1];
									
									$ff++;
									}
							}
							
							
						}
					}

					
				pg_prepare($link,'sqlroomshow','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resultroom = pg_execute($link,'sqlroomshow',array(2,$order->business[0]->id));
				$rowroom = pg_fetch_array($resultroom);
				
				$order->roomprice = $rowroom['price'];		
				
				pg_prepare($link,'sqltableshow','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resulttable = pg_execute($link,'sqltableshow',array(1,$order->business[0]->id));
				$rowtable = pg_fetch_array($resulttable);
				
				$order->tableprice = $rowtable['price'];		
			
				pg_prepare($link,'sqlfreeshow','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resultfree = pg_execute($link,'sqlfreeshow',array(3,$order->business[0]->id));
				$rowfree = pg_fetch_array($resultfree);
				
				$order->freeprice = $rowfree['price'];	
				
						
			if(sizeof($order->reserveQty->Table) != 0){	
			$tableprice = sizeof($order->reserveQty->Table) * $order->tableprice ;	
			$tableprice = GetDecimalPoint($tableprice);	
				 $Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td class="top-td1">'.$lang_resource['FRONT_RESERVATION_TABLE'].'</td>
                            <td class="top-td1">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</td>
                            <td class="top-td1">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</td>
                            
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . implode(", ",$order->reserveQty->Table1). '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Table).' X '.$order->tableprice.'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.$tableprice.'</td>
                        </tr>
                    </table>';
			 $total	= GetDecimalPoint(($total + $tableprice));
			}
			
			
			if(sizeof($order->reserveQty->Room) != 0){	
			$roomprice = sizeof($order->reserveQty->Room) * $order->roomprice ;
			$roomprice = GetDecimalPoint($roomprice);	
				 $Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td class="top-td1">'.$lang_resource['FRONT_RESERVATION_ROOM'].'</td>
                            <td class="top-td1">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</td>
                            <td class="top-td1">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</td>
                            
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . implode(", ",$order->reserveQty->Room1). '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Room).' X '.$order->roomprice.'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.$roomprice.'</td>
                        </tr>
                    </table>';
			 $total	= GetDecimalPoint(($total + $roomprice));
			}
			
			if(sizeof($order->reserveQty->Free) != 0){	
			$freeprice = sizeof($order->reserveQty->Free) * $order->freeprice ;
			$freeprice = GetDecimalPoint($freeprice);	
				 $Showmsg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td class="top-td1">'.$lang_resource['FRONT_RESERVATION_FREE'].'</td>
                            <td class="top-td1">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</td>
                            <td class="top-td1">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</td>
                            
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . implode(", ",$order->reserveQty->Free1). '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Free).' X '.$order->freeprice.'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.$freeprice.'</td>
                        </tr>
                    </table>';
			 $total	= GetDecimalPoint(($total + $freeprice));
			}
				
					
	}           
	
	if($order->reservestatus){  
                if(!$order->business[0]->dishes){
                    $deltype = $lang_resource['FRONT_MAIN_HOME_RESERVE'];
                }else{
                    $deltype = $lang_resource['FRONT_MAIN_HOME_ORDER_RESERVE'];
                }
            } 
			 
            $Showmsg .= '<table border="0" cellpadding="5" cellspacing="0" class="tab-total">
                <tr>
                    <td class="td1"><span>'.$lang_resource['MOBILE_CHECKOUT_TOTAL'].'</span></td>
                    <td class="td2">
                        <span class="sp2">
                            <img src="../../templates/images/total-border.png"/>
                        </span>
                        <span class="sp3">'.$row23b["currency"].'' .convert2Digit($total) . '</span>
                        <span class="sp4">
                            <img src="../../templates/images/total-border.png"/>
                        </span>
                    </td>
                </tr>
            </table>
                    
            <div class="pay-method">
                
                <div><span><strong>'.$lang_resource['EXPORT_PAYMENT_METHOD'].'</strong></span> :'. $paymethod_paypal.' </div>';
            
			$Showmsg .= '<div style="padding-bottom:15px;"><span><strong>'.$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'].'</strong></span> :  ' . $deltype . '  </div>';	
		
                
                
            $Showmsg .= '</div>
                    
            <div class="app-table">
                
                <div class="apps">
                    <a href="#" style="cursor:pointer;"><img src="../../templates/images/apple-icon.png" alt=""/></a>
                </div>
                <div class="apps">
                    <a href="#" style="cursor:pointer;"><img src="../../templates/images/android-icon.png" alt=""/></a>
                </div>
                <div class="apps">
                    <a href="http://'.$_SERVER['HTTP_HOST'].'/mobile.php" style="cursor:pointer;"><img src="../../templates/images/mobile-icon.png" alt=""/></a>
                </div>
                
                
            </div>
            <div class="back-sec">
            	<a href="http://'.$_SERVER["HTTP_HOST"].'" style="text-decoration: none;"><button type="button" class=" back_btn">'.$lang_resource['PAYMENT_ORDER_BACK'].'</button></a>
            </div><!--back-sec-->
                    
            <div class="footer-table">
                <div class="foot1">    
                    <a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FOOTER_ABOUT_US'].'</a>
                    <a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FOOTER_CONTACT_US'].'</a>
                    <a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FOOTER_BLOG'].'</a>
                </div>
                <div class="foot1">
                    <div class="copyright">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</div>
                </div>
            </div>
                    
                
        </div>
        
    </div>


</body>
</html>';





unset($total);

$msg ='<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>'.$_SERVER["HTTP_HOST"].' : '.$lang_resource['INVOICE_ORDER_PDF'].' # ' . $id . '</title>

<style type="text/css">
body, td, input, textarea, select{
	margin:0;
	font-family: arial,sans-serif;
}
.message1{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:30px;color:#404040;	
}
.message2{
	color:#e74c3c;font-size:24px;font-weight:bold;font-family:Open Sans, Arial, Helvetica, sans-serif;	
}
.message3{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:20px;color:#000;text-align:center;		
}
.heading td{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;
}
.even{
	background-color:#f7f7f7;
}
.odd{
	background-color:#ebebeb;
}
.detail-table{
	border:solid 1px #e3e3e3;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:15px;color:#666666;
	margin-top:15px;	
}
.detail-table tr td{
	border-bottom:solid 2px #fff;
	padding:8px;	
}
.total-price{
	width:100%;text-align:right;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#000;font-weight:bold;display:block;float:left;
}
.message4{
	text-align:center;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#666666;
	border-bottom:solid 1px #dedede;
}
.app-table{
	margin-top:10px;	
}
.footer-table{
	background-color:#252a30;
	height:44px;
	margin-top:15px;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:10px;color:#fff;
	text-align:center;
}
.footer-table td a{
	color:#fff;
	text-decoration:none;
}
ul {
	list-style: none;
	margin: 0px 0px 0px 0px;
	padding: 0px 0px 0px 0px;
	width: 100%;
	float:left;
	
	}
li{
font-size: 12px;
color: #333;

line-height: 17px;
}
 h4{
margin: 5px 0px 0px 0px;
padding: 0px 0px 0px 0px;
font-size: 12px;
color: #e74c3c;
text-transform: uppercase;
}
.options{
	width:100%;
	float:left;
	margin: 7px 0px 0px 0px;
padding: 0px 0px 0px 5px;
}

.gray_button{
    border-radius:3px;
    width:27px;
    min-height:18px;
    float:left; 
    border:none; 
    margin:0px 0px 0px 0px; 
    background:#dedede; 
}
.green_button{
    border-radius:3px; 
    width:27px; 
    min-height:18px; 
    float:left; 
    background:#91d547; 
    border:none; 
    margin:0px 0px 0px 0px; 
}
h5 {
 background:#dedede;
 padding:14px;
 margin:0 5px 5px;
 border-radius:5px;
 float:left;
 width:0px !important;
 height:0px !important;
 
}
h6 {
 background:#91d547;
 padding:14px;
 margin:0 5px 5px;
 border-radius:5px;
 width:0px !important;
 height:0px !important;
 float:left;
 
}

.getdirectionmsg{
  color: #FFF;
  text-decoration: none;
  padding: 7px 30px 7px 10px;
  border-radius: 4px;
  font-size: 13px;
  background: #e74c3c url("http://'.$_SERVER["HTTP_HOST"].'/images/email_template/g-icon.png");
  background-position: right 3px;
  background-repeat: no-repeat;
}

</style>

</head>

<body>

    <div>
        
    	<table border="0" cellpadding="0" cellspacing="0" width="570" align="center" bgcolor="#fff" style="border:solid 1px #e7e7e7;padding:0 10px">
        	<tr>
            	<td>
                	<table border="0" cellpadding="0" cellspacing="0" width="100%">
                    	<tr>
                        	<td width="50%">
                            	<a href="http://'.$_SERVER['HTTP_HOST'].'">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" width="315" height="58" alt="logo"  />';
					}
					else
					{
						 $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" width="315" height="58" alt="logo"  />';
					}
                   $msg .=  '</a>
                            </td>
                            <td width="50%" align="right" valign="middle">
							
							
							<table border="0" cellpadding="1" cellspacing="0">
				
							   <tr><td>';
							   if($fblink){
							   $msg .=' <a href="https://www.facebook.com/'.$fblink.'">
                                                <img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/fb-icon.png" alt="" style="display: block;float: left;margin: 0 5px;"/>
                                            </a>';
								}
								
				
								 if($twlink){
							   $msg .='<a href="http://www.twitter.com/'.$twlink.'">
                                                <img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/twitter-icon.png" alt="" style="display: block;float: left;margin: 0 5px;"/>
                                            </a>';
								}
					
								 if($rsslink){
							   $msg .='<a href="'.$rsslink.'">
                                                <img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/rss-icon.png" alt="" style="display: block;float: left;margin: 0 5px;"/>
                                            </a>';
								}
							
								 if($gpluslink){
							   $msg .='<a href="'.$gpluslink.'">
                                                <img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/Google+.png" alt="" style="display: block;float: left;margin: 0 5px;"/>
                                            </a>';
								}
							
								if($linkendinlink){
							   $msg .='<a href="'.$linkendinlink.'">
                                                <img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/LinkedIn.png" alt="" style="display: block;float: left;margin: 0 5px;"/>
                                            </a>';
								}
								if($instagramlink){
							   $msg .='<a href="'.$instagramlink.'">
                                                <img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/instagram.png" alt="" style="display: block;float: left;margin: 0 5px;"/>
                                            </a>';
								}
								
								$msg .='</td></tr>
							   </table>   
		
							
						
                            </td>
                        </tr>
                    </table>';
					/*************************** E-mail-template Header************************************************/
               
			   $b_id=$order->business[0]->id; // particular Business id
			   pg_prepare($link,'sql5','SELECT * from w_business WHERE id=$1');
			   $result23 = pg_execute($link,'sql5',array($b_id));
			   $row23 = pg_fetch_array($result23);
			   if ($row23['isimg']==1){ // Check image is upload for particular Business
				 $b_img='/panel/images/business/'.$row23['id'].'/original.jpg"/>';
			   }else{
				 $b_img='/panel/images/business/dummy.jpg"/>';	
			   }  
			  
						   
               $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" style="margin:20px 0 0 0;">
                    	<tr>
                        	<td width="60%" style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:30px;color:#404040;white-space:normal;line-height:40px;">
                            	<div class="message1">';
		if((!isset($requestcollectionset))||($requestcollectionset==false)){							             
                if($order->reservestatus && $order->business[0]->dishes){	
				$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_YOUR_ORDER_AND_RESERVATION_PLACED_SUCCES'].'</em>';
				$tr_o = $lang_resource['TRACK_ORDER_AND_RESERVATION'];
				}
				if($order->reservestatus && !$order->business[0]->dishes){	
				$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_RESERVATION_HASE_BEEN_PLASSED_SUCCESS'].'</em>';
				$tr_o = $lang_resource['TRACK_ORDER_RESERVATION'];
				}
				if($order->business[0]->dishes && !$order->reservestatus){  
				$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_SUCCESS'].'</em>';
				$tr_o = $lang_resource['INDEX_TRACK_ORDER'];
				}
				}else{
				$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_SUCCESS'].'</em>';
				$tr_o = 'Track Order';
				
			}
				
                              $msg .=' </div>	
                            </td>
                            <td width="40%" align="right">
                            	<img  width="215" height="195" src="http://'.$_SERVER['HTTP_HOST'].$b_img.'
                            </td>
                        </tr>
                        
                        <tr>
                        	<td valign="top" style="color:#e74c3c;font-size:24px;font-weight:bold;font-family:Open Sans, Arial, Helvetica, sans-serif;	">
                            	<div style="color:#e74c3c;font-size:24px;font-weight:bold;font-family:Open Sans, Arial, Helvetica, sans-serif;margin-bottom:5px;">
                                	'.$lang_resource['FRONT_MAIN_EMAIL_ORDER'].' # '. $id .'
                                </div>
								<a href="http://'.$_SERVER['HTTP_HOST'].'" style="cursor:pointer;background: #e74c3c;width: 180px;padding: 5px 10px;display: block;color: #fff;text-decoration: none;border-radius: 5px;margin-bottom: 20px;text-transform: uppercase;text-align: center;">'.$tr_o.'</a>
                               
                            </td>';
							if((!isset($requestcollectionset))||($requestcollectionset==false)){
                            $msg .='<td valign="bottom" align="right" style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:20px;color:#000;text-align:center;white-space:nowrap;height:105px;">
                            	<div class="message3">'.$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER'].'<br/>
									<span style="text-decoration:underline;">'.$order->business[0]->name.' : <strong>'.$order->business[0]->tel.'</strong></span>
                                </div>
                            </td>';

							}else{
								
								   $msg .=' <td valign="bottom" align="right" style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:20px;color:#000;text-align:center;white-space:nowrap;height:105px;">
                            	<div class="message3">'.$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER'].'<br/>
									<span style="text-decoration:underline;">'. ucfirst($requestcollectiondata[0]["resturent_name"]).' : <strong>'. $requestcollectiondata[0]["resturent_contactno"].'</strong></span>
                                </div>
                            </td>';
							}
							
                      $msg .='  </tr>
                    </table>';
						if((!isset($requestcollectionset))||($requestcollectionset==false)){ 
							if($deltype == "pickup") {	


            	$resturantaddress = ucfirst($row23b['street']) .','. ucfirst($row23b['colony']) .','. $cityfetch['city'].' , '. $countryfetch['name'];
                $resturantaddress = str_replace("/","@",$resturantaddress);

            	$buyeraddress = ucfirst($order->buyer->address).','. $order->buyer->colony . ','. $order->buyer->cityname ;
                $buyeraddress = str_replace("/","@",$buyeraddress);
					
					
				$msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">
                <tr bgcolor="e74c3c">
                    <td colspan="2" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['EMAIL_RESTAURENT_INFO'] .'</td>
                  
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_NAME'].' : </td>
                    <td>' . ucfirst($row23b['name']) . '</td>
                </tr>
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_ADDRESS'].' : </td>
                     <td>' . ucfirst($row23b['street']) . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_NEIGHBORHOOD'].' : </td>
                    <td>' . ucfirst($row23b['colony']) . '</td>
                </tr>
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_CITY'].' :  </td>
                    <td>' .  $cityfetch['city'] . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['EMAIL_RESTAURENT_ZIPCODE'].' : </td>
                    <td>' . ucfirst($row23b['cp']) . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
 					<td colspan="2" align="center"><a class="getdirectionmsg" href="https://www.google.co.in/maps/dir/'.$resturantaddress.'/'.$buyeraddress.'" >Get Direction of Takeway</a></td>
				</tr>
               
			</table>';

				
					}
						}
				if((!isset($requestcollectionset))||($requestcollectionset==false)){ 	
				if($order->business[0]->dishes){	
					/*******************E-mail template Business  Details ***************************************/
                    
                $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">';
				
				
				if($braintree_firstname)
					{ //If paid by Braintree
				$msg .='<tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$order->buyer->deliveryType.' Address</div></td>
				</tr>';
				
					}
				
				$checkoutfields = $order->buyer->checkoutfields;
				
                    $msg .='<tr bgcolor="e74c3c">
                        	<td width="30%" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'].'</td>
                            <td style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</td>
                        </tr>';
                    if(in_array('Name', $checkoutfields)){
                    $msg .='<tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst($order->buyer->name) . '</td>
                        </tr>';
                    }
						
					if(in_array('Last Name', $checkoutfields)){	
					$msg .='<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_LAST_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst($order->buyer->lastname2) . '</td>
                        </tr>';
                    }
					if(in_array('Email', $checkoutfields)){	
					$msg .='<tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_EMAIL'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;"><a style="color:#666666;text-decoration:none;" target="_blank" href="mailto:'. strtolower($order->buyer->email) . '">'. strtolower($order->buyer->email) . '</a></td>
                        </tr>';
                    }
                    if(in_array('Full Address', $checkoutfields)){                      
                    $msg .='<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst($order->buyer->address) . '</td>
                        </tr>';
                    }
                    if(in_array('Where did you find about us', $checkoutfields)){
                    $msg .='<tr bgcolor="#f7f7f7">
                        	<td>'.$lang_resource['Referenece_V2'].' </td>
                            <td>'. $order->buyer->reference . '</td>
                        </tr>';
                    }
                    if(in_array('Phone', $checkoutfields)){
                    $msg .='<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['Phone_V2'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->tel . '</td>
                        </tr>';
                    }
                    if(in_array('City', $checkoutfields)){
                    $msg .='<tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['EXPORT_CITY'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->cityname . '</td>
                        </tr>';
                    }
                    if(in_array('Area / Neighborhood', $checkoutfields)){				
						
					$msg .='<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['MOBILE_FRONT_VISUALS_NEIGHBOR'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->colony . '</td>
                        </tr>';
					}
					if(in_array('APT/Suit', $checkoutfields)){	
					$msg .='<tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['MOBILE_FRONT_VISUALS_APT'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->api . '</td>
                        </tr>';
					}
					if(in_array('Zipcode', $checkoutfields)){	
					$msg .='<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['MOBILE_FRONT_VISUALS_ZIP'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->zipcode . '</td>
                        </tr>';
					}
					if(in_array('Takeout Date', $checkoutfields)){
						if($order->preorder=='true'){
							  //Time selection settings. 
					/*		   $str='';
							$time_format=$rowtimeformat['value'];
							if($time_format==12){
								
									$str='PM';
									if($order->preordertimehh<12){
										$str='AM';
									}
									$order->preordertimehh=floor($order->preordertimehh%12);
									
									 if (intval($order->preordertimehh) < 10) {
										$order->preordertimehh = "0".$order->preordertimehh;
									}
									if (intval($order->preordertimemm) < 10) {
										$order->preordertimemm = "0".$order->preordertimemm;
									}
							}else{
								
								
								if($order->preordertimehh>=24){
										 $str='AM';
										$order->preordertimehh=floor($order->preordertimehh%12);
										
									}
									
							
							}*/
											
                        $msg .='<tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_TYPE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;"><strong>'.$lang_resource['FRONT_MAIN_EMAIL_PREORDER'].'</strong></td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_MAIN_EMAIL_PREORDER_DATE_TIME'].'</td>
							
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$order->buyer->deliverydate.'  '.$order->preordertimehh.':'.$order->preordertimemm.' '.$str.'</td>
                        </tr>';
						}
					}
                    $msg .='</table>';
					/****************** E-mail template Buyer Details *********************************/
					
					
					//Braintree section
			if($braintree_firstname)
					{
						
						if($order->buyer->address!=$braintree_address1)
						{
			
			/*$msg .= '<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table">
               <tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS'].'</div></td>
				</tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'].'</td>
                    <td>' .  $braintree_firstname .  '</td>
                </tr>
				
				<tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['MOBILE_CHECKOUT_LASTNAME'].'</td>
                    <td>' . $braintree_lastname . '</td>
                </tr>
				
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'].'</td>
                    <td>' . $braintree_address1 . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'].' </td>
                    <td>' . $braintree_address2 . '</td>
                </tr>
				
				 <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_CITY'].' </td>
                    <td>' . $braintree_city . '</td>
                </tr>
				
				
                <tr bgcolor="#ebebeb">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_STATE'].' </td>
                    <td>' . $braintree_state . '</td>
                </tr>
                <tr bgcolor="#f7f7f7">
                    <td>'.$lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'].'</td>
                    <td>' . $braintree_zipcode . '</td>
                </tr>
                
				
				
				';
					
            $msg .= '</table>';*/
			
			 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS'].'</div></td>
				</tr>
						
						<tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $braintree_firstname . '</td>
                        </tr>
						
						 <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$braintree_lastname.'</td>
                        </tr>
                       
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $braintree_address1 . '</td>
                        </tr>
						
						 <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$braintree_address2.'</td>
                        </tr>
						
						<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_CITY'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $braintree_city . '</td>
                        </tr>
                       
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_STATE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $braintree_state . '</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $braintree_zipcode . '</td>
                        </tr>';
						
                    $msg .='</table>';
			
						}
						else
						{
							$msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr>
				<td><div class="message3" style="text-align:left;width:300px;">'.$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME']." ".$order->buyer->deliveryType." ".$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME_ADDRESS'].'</td>
				</tr>
							
						 </table>';	
						}
			
					}
			//end braintree section
					
					
					
					$twilio_phone;
					$twilio_enabled;
					$twilio_order = "";
					foreach ($order->business as $business)
						{
							
						$twilio_phone = $business->twiliophone;						
						$twilio_enabled = $business->acceptsms;		
						
						
						pg_query($link, "DEALLOCATE ALL");
						pg_prepare($link,'sql4'.$business->id,'SELECT buys from w_business WHERE id=$1');
						$result2 = pg_execute($link,'sql4'.$business->id,array($business->id));
						if (pg_num_rows($result2)==1)  
							while($row2 = pg_fetch_array($result2))
								{
								pg_prepare($link,'sqls'.$business->id,'UPDATE w_business SET buys=$2 WHERE id=$1');
								pg_execute($link,'sqls'.$business->id,array($business->id,intval($row2['buys'])+1));
								}
	
						if (!empty($business->email) && $business->email!='null')
							array_push($emails,$business->email);
	
					$total = 0;
					
					$paymethod = '';
									

					if (empty($pid))
						{
						if($order->business[0]->paymethod->paypaladaptive == 1)
						{
					   $paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPALADAPTIVE'];
						}
						else if ($business->paymethod->card==true) {
							
							$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CARD'];
						}
						else if ($business->paymethod->cash==true) {
							
							$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
						}
						else if ($business->paymethod->authorize==true) {
							   if ($paymethod=='')
								
								$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_AUTHORISENET'];
								$paymethod .="(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']." " . $a_trnx_code . ")";
								
						}
						else if ($business->paymethod->braintree==true) {
							   if ($paymethod=='')
								
								$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_BRAINTREE'];
								$paymethod .="(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']." " . $paymentid . ")";
								
						}
						else if ($business->paymethod->paypal==true) {
							   if ($paymethod=='')
								
								$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPAL'];
								
						}
						
						else if ($business->paymethod->cardsave==true) {
							   if ($paymethod=='')
								
								$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CARDSAVE'];
								
						}
						else if ($business->paymethod->transactium==true) {
							if ($paymethod=='')
							   if ($paymentid=='Failure'){
								$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_NOT_TRANSACTIUM'];
								}else{
								$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_TRANSACTIUM']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
								}
								
								
						}
						else if ($business->paymethod->pexpress==true) {
							if ($paymethod=='')
							  
							$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYMENTEXPRESS']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
								
						}
						else if ($business->paymethod->maksekeskus==true) {
							if ($paymethod=='')
							  
							$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_MAKSEKESKUS']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
								
						}
						
						else if ($business->paymethod->voguepay==true) {
							if ($paymethod=='')
							  
							$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_VOGUEPAY']." "."(" . $paymentid . ")";	
								
						}
						
						else if ($business->paymethod->skrill==true) {
							if ($paymethod=='')
							  
							$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_SKRILL']." "."(" . $paymentid . ")";	
								
						}
						
						else if ($business->paymethod->payeezy==true) {
							if ($paymethod=='')
							  
							$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYEEZY']." "."(" . $paymentid . ")";	
								
						}
					
						
						else if ($business->paymethod->card==true) {
							   if ($paymethod=='')
								
								$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
								else
								$paymethod .= ' '.$lang_resource['FRONT_MAIN_EMAIL_AND_CARD'];
						}
						
						}
						
						else
						{
						
						$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_VALIDATING_PAYMENT_PAYPAL'].' (' . $pid . ')';							
						pg_prepare($link,'sqlpaycheck','SELECT * FROM w_paypal_payments WHERE itemid=$1 AND taken=false');
						$result3 = pg_execute($link,'sqlpaycheck',array($pid));

						if (pg_num_rows($result3)==1)  						
							while($row3 = pg_fetch_array($result3))
								{
								$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL'].' (' . $pid . ')';
							
								pg_prepare($link,'sqlpayupdate','UPDATE w_paypal_payments SET taken=true WHERE itemid=$1');
								pg_execute($link,'sqlpayupdate',array($pid));
								}

						}
	
           $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_ITEMS'].'</td>
							<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['SHOPPING_NO_OF_PERSON'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_OPTIONS'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_COMMENT'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_RATE'].'</td>
                        </tr>';
			
			$cntr = 0;
			foreach ($business->dishes as $dish){
				if($dish->options) {
			 $productOptionHtml =  Margeslash($dish->options);  
			} else {
				$productOptionHtml ='';
				}
				if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }			
                $msg .='<tr bgcolor="'.$bg.'">
					<td style="border-bottom:solid 2px #fff;padding:8px;"> ' .$dish->quantity.' x '. $dish->name.'</td>
					<td style="border-bottom:solid 2px #fff;padding:8px;"> ' .$dish->nofperson.'</td>
					<td style="border-bottom:solid 2px #fff;padding:8px;">' . $productOptionHtml.'</td>
					<td style="border-bottom:solid 2px #fff;padding:8px;">' . ucfirst(strtolower($dish->comments)) . '</td>
					<td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.convert2Digit($dish->total) . '</td>
                        </tr>';
						$total = $total + $dish->total;
						$cntr ++;
			}
			if($order->buyer->taxtype == 1){
				$total = $total + $business->shipping + $order->tax;
				$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'];
			}else{
				$total = $total + $business->shipping;
				$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'];
		    }
						
			$taxpercentage = GetDecimalPoint($order->buyer->tax);
			$tipsprice = GetDecimalPoint($order->buyer->tips);
			
			if ($order->buyer->tips > 0){
				$total = $total	+ $order->buyer->tips;
			}
					
			$total = GetDecimalPoint($total);
						
			$deltype = $order->buyer->deliveryType;
			      /*service fee section */
		  if(isset($order->servicefeeTotal1))
		  {
			 if(($order->servicefee==null) ||($order->servicefee=='')){
				 $order->servicefee=0;
			 }
			   $discountcaption = $lang_resource['SERVICE_FEE_V2'] ." (" .$order->servicefee ."%)";
			  
			 if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }		
			$msg .='<tr bgcolor="'.$bg.'">
					  <td style="border-bottom:solid 2px #fff;padding:8px;">' . $discountcaption . '</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($order->servicefeeTotal1) . '</td>
				  </tr>';
				  $cntr ++;
		  }
		  
		  
		  /*service fee section */       
			//business shipping and comment info
			if ($business->shipping=='0.00')
			$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];
			else
			$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY_WITH_COST'];
			if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }	
			if($deltype != "pickup") {				
            $msg .='<tr bgcolor="'.$bg.'">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . $shippingcaption . '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
							<td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst(strtolower($order->buyer->comments)) . '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($business->shipping) . '</td>
                        </tr>';
			}
			$cntr ++;			
		  /*discount code section */
		  if(in_array('Discount Coupon', $checkoutfields)){	
		  if((isset($order->discountcategory)) && (trim($order->discountprice) !=''))
		  {
			  if($order->discounttype == 1)
			  $discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ." (" .$order->discountrate ."%)";
			  else if($order->discounttype == 2)
			  $discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ;
			  
			  $total = $total - $order->discountprice;
			  $total = GetDecimalPoint($total);
			if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }		
			$msg .='<tr bgcolor="'.$bg.'">
					  <td style="border-bottom:solid 2px #fff;padding:8px;">' . $discountcaption . '</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst(strtolower($order->discountcomments)) . '</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($order->discountprice) . '</td>
				  </tr>';
				  $cntr ++;
		  }
		}
		  /*discount code section */
		  if ($order->tax > 0){
			if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }	
			$msg .='<tr bgcolor="'.$bg.'">
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['Tax_V2'].' ('. $taxpercentage .'%)<br>'. ucfirst(strtolower($taxstring)) . '</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($order->tax) . '</td>
				  </tr>';
				   $cntr ++;

			}
			if(in_array('Tip For The Driver', $checkoutfields)){			
			if ($order->buyer->tips > 0){
				if($cntr % 2 == 0){ $bg = '#f7f7f7'; }else{ $bg = '#ebebeb'; }
				$msg .='<tr bgcolor="'.$bg.'">
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['SHOPPING_FOURTH_TIP'].'</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
					  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($tipsprice) . '</td>
				  </tr>';
				   $cntr ++;
					
			}
		}
				
			$msg .='</table>';
					/******************* E-mail template Order Details *******************************/
			}
			
			
				}
				
				}else{
						
						 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr bgcolor="e74c3c">
                        	<td width="30%" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'].'</td>
                            <td style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</td>
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  ucfirst($requestcollectiondata[0]["customer_name"]) . '</td>
                        </tr>
                       
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  ucfirst($requestcollectiondata[0]["customer_address1"].','.$requestcollectiondata[0]["customer_address2"])  . '</td>
                        </tr>
                        
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['Phone_V2'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$requestcollectiondata[0]["customer_contactno"]. '</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['EXPORT_CITY'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  $requestcollectiondata[0]["customer_town"] . '</td>
                        </tr>
						 <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  $requestcollectiondata[0]["customer_postcode"] . '</td>
                        </tr>
						 <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  $requestcollectiondata[0]["customer_note"] . '</td>
                        </tr>
						';
							$msg .='</table>';
							
							 $htime = date("H",strtotime($requestcollectiondata[0]["resturent_collection_time"]));
				  $mtime = date("i",strtotime($requestcollectiondata[0]["resturent_collection_time"]));
				 $time_format=$rowtimeformat['value'];
				 $str='';
							if($time_format==12){
								
									$str='PM';
									if($htime<12){
										$str='AM';
									}
									$htime=floor($htime%12);
									
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime);
									}
									if (intval($mtime) < 10) {
										$mtime = "0".intval($mtime);
									}
							}else{
								
								if($htime>=24){
										 $str='AM';
										$htime=floor($htime%12);
										
									}
									 if (intval($htime) < 10) {
										$htime = "0".intval($htime);
									}
									if (intval($mtime) < 10) {
										$mtime= "0".intval($mtime);
									}
							}
				  $date = date("d/m/Y",strtotime($requestcollectiondata[0]["resturent_collection_time"]));
							 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr bgcolor="e74c3c">
                        	<td width="30%" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'].'</td>
                            <td style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_RESTRENT_DETAILS'].'</td>
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  ucfirst($requestcollectiondata[0]["resturent_name"]) . '</td>
                        </tr>
                       
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'].'</td>
							
                            <td style="border-bottom:solid 2px #fff;padding:8px;">' . $date.'&nbsp;'.$htime.":".$mtime ."&nbsp;".$str.'</td>
                        </tr>
                        
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$requestcollectiondata[0]["resturent_other_value"]. '</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  $requestcollectiondata[0]["resturent_other_reference"] . '</td>
                        </tr>
						 <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.  $requestcollectiondata[0]["resturent_postcode"] . '</td>
                        </tr>
						
						';
							$msg .='</table>';
							$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPAL'];
							  $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_ITEMS'].'</td>
                          <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_RATE'].'</td>
                        </tr>';
						
							$cntr = 0;
							$msg .='<tr bgcolor="'.$bg.'">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;"> '.$lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'].'</td>
                           
                            <td style="border-bottom:solid 2px #fff;padding:8px;">' . $requestcollectiondata[0]["deliveryprice"]. '</td>
                        </tr>';
						$msg .='</table>';
						$total = $total +  $requestcollectiondata[0]["deliveryprice"];
						$cntr ++;
					}
					if((!isset($requestcollectionset))||($requestcollectionset==false)){
			if($order->reservestatus){	
			
						$reservequery = 'SELECT * from w_reserve WHERE  business=$1';
						pg_prepare($link,'sqlr2',$reservequery);
						$reserverecord = pg_execute($link,'sqlr2',array($order->business[0]->id));
					
						$reserves = array();
						
						while($row = pg_fetch_array($reserverecord)){
						
										unset($reserve);
										$reserve->id = $row['id'];
										$reserve->rtype = $row['rtype'];
												
										$reserve->guest = $row['guest'];
										$reserve->name = $row['name'];
										
										array_push($reserves,$reserve);
									

						}
					
					if(!$order->business[0]->dishes){						
					 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr bgcolor="e74c3c">
                        	<td width="30%" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'].'</td>
                            <td style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'].'</td>
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. ucfirst($order->buyer->name) . '</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['LOGIN_CREATE_EMAIL'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;"><a style="color:#666666;text-decoration:none;" target="_blank" href="mailto:'. strtolower($order->buyer->email) . '">'. strtolower($order->buyer->email) . '</a></td>
                        </tr>
                        
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['Phone_V2'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'. $order->buyer->tel . '</td>
                        </tr>
                		</table>';
						
					}	
						////////reservation start////////////
					$msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;text-align:center;">'.$lang_resource['RESERVATION'].'</td>
                        </tr>';
			$tablemsg = '';		
			if(sizeof($order->reserveQty->Table) != 0){			
						
                $tablemsg .='<tr bgcolor="#f7f7f7">';
                $tablemsg .='<td style="border-bottom:solid 2px #fff;padding:8px;text-align:center;">'.$lang_resource['FRONT_RESERVATION_TABLE'].'</td>';
                $tablemsg .='</tr>';
                $tablemsg .='<tr bgcolor="#ebebeb">';
                $tablemsg .='<td style="border-bottom:solid 2px #fff;padding:8px;text-align:center;">';
                foreach ($reserves as $a){	
                    if($a->rtype == 1){
                        $tablemsg .='<div style="width: 25%;margin-bottom: 5px;">'.$a->name.'</div>';
                        //$msg .='<div style="border:solid 1px #000;padding:5px;border-radius:5px;width:25%;background:#fff; ">';
                        $tablemsg .='<div style="width:33%; float:left; border:1px solid #000; padding:8px; background:#fff;">';
                        $tablemsg .='<ul style="margin:0; padding:0;">';

                        $countg = $a->guest;
                        for($countr =1; $countr<=$countg; $countr++){
                            if(in_array($a->id.'_'.$countr,$order->reserveQty->Table)){
                                //$msg .='<div style="width:27px; margin:3px 2px 3px 2px; display:inline-block;"><div class="gray_button" style="border-radius:3px; width:27px; min-height:18px; float:left; border:none; margin:0px 0px 0px 0px; background:#dedede; "></div></div>';
                                $tablemsg .='<li><h5>&nbsp;</h5></li>';
                            }else{
                                //$msg .='<div style="width:27px; display:inline-block; margin:3px 2px 3px 2px; "><div class="green_button" style="border-radius:3px; width:27px; min-height:18px; float:left; background:#91d547; border:none; margin:0px 0px 0px 0px; "></div></div>';
                                $tablemsg .='<li><h6>&nbsp;</h6></li>';
                            } 
                        }	
                        $tablemsg .='</ul>';								
                        $tablemsg .='</div>';	 
                    }
                }
                $tablemsg .='</td></tr>';
			}

            $roommsg = '';
			if(sizeof($order->reserveQty->Room) != 0){							
                $roommsg .='<tr bgcolor="#f7f7f7">';
                $roommsg .='<td style="border-bottom:solid 2px #fff;padding:8px;text-align:center;">'.$lang_resource['FRONT_RESERVATION_ROOM'].'</td>';
                $roommsg .='</tr>';
                $roommsg .='<tr bgcolor="#ebebeb">';
                $roommsg .='<td style="border-bottom:solid 2px #fff;padding:8px;text-align:center;">';
                foreach ($reserves as $a){	
                    if($a->rtype == 2){
                        $roommsg .='<div style="width: 30%;margin-bottom: 5px;">'.$a->name.'</div>';
                        //$msg .='<div style="border:solid 1px #000;padding:5px;border-radius:5px;width:25%;background:#fff;">';
                        $roommsg .='<div style="width:33%; float:left; border:1px solid #000; padding:8px; background:#fff;">';
                        $roommsg .='<ul style="margin:0; padding:0;"  >';
                        $countg = $a->guest;
                        for($countr =1; $countr<=$countg; $countr++){
                            if(in_array($a->id.'_'.$countr,$order->reserveQty->Room)){
                                //$msg .='<div style="width:27px; margin:3px 2px 3px 2px; display:inline-block;"><div class="gray_button" style="border-radius:3px; width:27px; min-height:18px; float:left; border:none; margin:0px 0px 0px 0px; background:#dedede; "></div></div>';
                                $roommsg .='<li><h5>&nbsp;</h5></li>';
                            }else{
                             
                                $roommsg .='<li><h6>&nbsp;</h6></li>';
                            } 
                        }
                        $roommsg .='</ul>';
                        $roommsg .='</div>';
                    }
                }
                $roommsg .='</td></tr>';
			}
			
            $freemsg = '';		 
			if(sizeof($order->reserveQty->Free) != 0){						
                $freemsg .='<tr bgcolor="#f7f7f7">';
                $freemsg .='<td style="border-bottom:solid 2px #fff;padding:8px;text-align:center;">'.$lang_resource['FRONT_RESERVATION_FREE'].'</td>';
                $freemsg .='</tr>';
                $freemsg .='<tr bgcolor="#ebebeb">';
                $freemsg .='<td style="border-bottom:solid 2px #fff;padding:8px;text-align:center;">';
                foreach ($reserves as $a){	
                    if($a->rtype == 3){
                        $freemsg .='<div style="width: 25%;margin-bottom: 5px;">'.$a->name.'</div>';
                       //$msg .='<div style="border:solid 1px #000;padding:5px;border-radius:5px;width:25%;background:#fff;">';
                        $freemsg .='<div style="width:33%; float:left; border:1px solid #000; padding:8px; background:#fff;">';
                        $freemsg .='<ul style="margin:0; padding:0;">';
                        $countg = $a->guest;
                        for($countr =1; $countr<=$countg; $countr++){
                            if(in_array($a->id.'_'.$countr,$order->reserveQty->Free)){ 
                                //$msg .='<div style="width:27px; margin:3px 2px 3px 2px; display:inline-block;"><div class="gray_button" style="border-radius:3px; width:27px; min-height:18px; float:left; border:none; margin:0px 0px 0px 0px; background:#dedede; "></div></div>';
                                $freemsg .='<li><h5>&nbsp;</h5></li>';
                            }else{
                                //$msg .='<div style="width:27px; display:inline-block; margin:3px 2px 3px 2px; "><div class="green_button" style="border-radius:3px; width:27px; min-height:18px; float:left; background:#91d547; border:none; margin:0px 0px 0px 0px; "></div></div>';
                                $freemsg .='<li><h6>&nbsp;</h6></li>';
                            } 
                        }   
                        $freemsg .='</ul>';                             
                        $freemsg .='</div>';
                    }
                }
                $freemsg .='</td></tr>';
			}
						
            $freemsg .='</table>';
						$msg .= $tablemsg . $roommsg .$freemsg ;
			//$msg .= $tablemsg . $roommsg . $freemsg;
			////////reservation end////////////
			pg_prepare($link,'sqlRTitle','SELECT name FROM w_reserve WHERE id =$1');
					
					if($order->reserveQty) {
						foreach($order->reserveQty as $name_room=>$key)
						{
								$r=0;
								$t=0;
								$f=0;
							if($name_room == "Room") {
				
							 foreach($key as $room) {
									
									$room_data = explode("_",$room);
									
									$resultTileroom = pg_execute($link,'sqlRTitle',array($room_data[0]));
									
									$titleroom = pg_fetch_array($resultTileroom);
									
									
									
									$order->reserveQty->Room[$r] = $titleroom['name']."_".$room_data[1];
									
									$r++;
									}
							}
							if($name_room == "Table") {
				
								foreach($key as $table) {
									
									$table_data = explode("_",$table);
									
									$resultTiletable = pg_execute($link,'sqlRTitle',array($table_data[0]));
									
									$titletable = pg_fetch_array($resultTiletable);
									
									
									$order->reserveQty->Table[$t] = $titletable['name']."_".$table_data[1];
									
									$t++;
									}
							
							}
							if($name_room == "Free") {
				
									foreach($key as $free) {
									
									$free_data = explode("_",$free);
									
									$resultTilefree = pg_execute($link,'sqlRTitle',array($free_data[0]));
									
									$titlefree = pg_fetch_array($resultTilefree);
									
									$order->reserveQty->Free[$f] = $titlefree['name']."_".$free_data[1];
									
									$f++;
									}
							}
						}
					}
					
					pg_prepare($link,'sqlroom','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resultroom = pg_execute($link,'sqlroom',array(2,$order->business[0]->id));
				$rowroom = pg_fetch_array($resultroom);
				
				$order->roomprice = $rowroom['price'];		
				
				pg_prepare($link,'sqltable','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resulttable = pg_execute($link,'sqltable',array(1,$order->business[0]->id));
				$rowtable = pg_fetch_array($resulttable);
				
				$order->tableprice = $rowtable['price'];		
			
				pg_prepare($link,'sqlfree','SELECT price FROM w_reserve_chart WHERE rtype=$1 and business =$2');
				$resultfree = pg_execute($link,'sqlfree',array(3,$order->business[0]->id));
				$rowfree = pg_fetch_array($resultfree);
				
				$order->freeprice = $rowfree['price'];	
				
						
			if(sizeof($order->reserveQty->Table) != 0){	
			$tableprice = sizeof($order->reserveQty->Table) * $order->tableprice ;	
			$tableprice = GetDecimalPoint($tableprice);	
				 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_RESERVATION_TABLE'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</td>
                            
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . implode(", ",$order->reserveQty->Table). '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Table).' x '.$order->tableprice.'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.convert2Digit($tableprice).'</td>
                        </tr>
                    </table>';
			 $total	= $total + $tableprice;
			}
			
			
			if(sizeof($order->reserveQty->Room) != 0){	
			$roomprice = sizeof($order->reserveQty->Room) * $order->roomprice ;
			$roomprice = GetDecimalPoint($roomprice);	
				 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_RESERVATION_ROOM'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</td>
                            
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . implode(", ",$order->reserveQty->Room). '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Room).' x '.$order->roomprice.'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.convert2Digit($roomprice).'</td>
                        </tr>
                    </table>';
			 $total	= $total + $roomprice;
			}
			
			if(sizeof($order->reserveQty->Free) != 0){	
			$freeprice = sizeof($order->reserveQty->Free) * $order->freeprice ;
			$freeprice = GetDecimalPoint($freeprice);	
				 $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top: 15px;">
                    	<tr bgcolor="e74c3c" class="heading">
                        	<td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['FRONT_RESERVATION_FREE'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</td>
                            <td style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'].'</td>
                            
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">' . implode(", ",$order->reserveQty->Free). '</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Free).' x '.$order->freeprice.'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '.convert2Digit($freeprice).'</td>
                        </tr>
                    </table>';
			 $total	= $total + $freeprice;
			}
					
					
					
					
			}
			
					}
			
			$msg .='<table border="0" cellpadding="5" cellspacing="0" width="50%" align="right" style="margin-top:10px;">
                    	<tr>
                        	<td width="60%" align="center" ><span style="width:100%;text-align:right;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#000;font-weight:bold;display:block;float:left;">'.$lang_resource['MOBILE_CHECKOUT_TOTAL'].'</span></td>
                            <td width="40%" align="right" >
                            	<span style="width:100%;height:3px;display:block;float:left;text-align:right;margin-bottom:5px;">
                                	<img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/total-border.png"/>
                                </span>';
								if((!isset($requestcollectionset))||($requestcollectionset==false)){ 	
                                $msg .='<span style="width:100%;text-align:right;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#000;font-weight:bold;display:block;float:left;">'.$row23b['currency'].'' .$order->total. '</span>';
								}else{
									    $msg .='<span style="width:100%;text-align:right;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#000;font-weight:bold;display:block;float:left;">' .GetDecimalPoint($total). '</span>';
								}
                              $msg .='  <span style="width:100%;height:3px;display:block;float:left;text-align:right;margin-top:5px;">
                                	<img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/total-border.png"/>
                                </span>
                            </td>
                        </tr>
                    </table>';
					/* E-mail Template Order Details Total */
					
         
		  
		  
		  
            if($deltype == "pickup") {
                $deltypelang = $lang_resource['FRONT_MAIN_HOME_PICKUP'];
            }else  if($deltype == "delivery"){
                $deltypelang = $lang_resource['FRONT_MAIN_HOME_DELIVERY_TEXT'] ;  
            }

            if($order->reservestatus){  
                if(!$order->business[0]->dishes){
                    $deltypelang = $lang_resource['FRONT_MAIN_HOME_RESERVE'];
                }else{
                    $deltypelang = $lang_resource['FRONT_MAIN_HOME_ORDER_RESERVE'];
                }
            }  
			
			if ($order->business[0]->paymethod->transactium==true) {
				if ($paymethod=='')
				   if ($paymentid=='Failure'){
					$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_NOT_TRANSACTIUM'];
					}else{
					$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_TRANSACTIUM']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";	
					}
					
					
			}
			
			if ($order->business[0]->paymethod->pexpress==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYMENTEXPRESS']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";		
				
		}
		
		if ($order->business[0]->paymethod->maksekeskus==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_MAKSEKESKUS']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $paymentid . ")";		
				
		}
		if ($order->business[0]->paymethod->voguepay==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_VOGUEPAY']." "."(" . $paymentid . ")";	
				
		}
		
		if ($order->business[0]->paymethod->skrill==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_SKRILL']." "."(" . $paymentid . ")";	
				
		}
		
		if ($order->business[0]->paymethod->payeezy==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYEEZY']." "."(" . $paymentid . ")";	
				
		}
		
		if ($order->business[0]->paymethod->cash==true) {
			if ($paymethod=='')							
					$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
				}
	
		  
		            
              $msg .='<table border="0" cellpadding="5" cellspacing="0" width="100%" style="text-align:center;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#666666;
	border-bottom:solid 1px #dedede;">
                    	<tr>
                        	<td><span style="font-weight:bold;">'.$lang_resource['FRONT_MAIN_PAYMENT_METHOD'].'</span> '. $paymethod . '</td>
                        </tr>
                        <tr>
                        	<td style="padding-bottom:15px;"><span style="font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'].'</span> :  '. $deltypelang . '  </td>
                        </tr>
                    </table>
                    
                    <table border="0" cellpadding="5" cellspacing="0" width="20%" align="center" class="app-table">
                    	<tr>
                        	<td align="center"><a href="http://'.$_SERVER['HTTP_HOST'].'" style="cursor:pointer;"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/apple-icon.png" alt=""/></a></td>
                            <td align="center"><a href="http://'.$_SERVER['HTTP_HOST'].'" style="cursor:pointer;"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/android-icon.png" alt=""/></a></td>
                            <td align="center"><a href="http://'.$_SERVER['HTTP_HOST'].'/mobile.php" style="cursor:pointer;"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/mobile-icon.png" alt=""/></a></td>
                        </tr>
                        
                    </table>
                    
                    <table border="0" cellpadding="5" cellspacing="0" width="100%" class="footer-table" align="center" bgcolor="#252a30" style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:10px;color:#e4e4e5;margin-top:5px;">
                    	<tr>    
                        	<td width="20%" align="right"><a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FOOTER_ABOUT_US'].'</a>&nbsp;&nbsp;|</td>
                            <td width="5%" align="center"><a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FRONT_MAIN_CONTACT_US'].'</a>&nbsp;&nbsp;|</td>
                            <td width="20%" align="left"><a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FRONT_MAIN_BLOG'].'</a></td>
                        </tr>
                        <tr>
                        	<td style="text-align:center;padding-top:0;" colspan="3">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</td>
                        </tr>
                    </table>
                    
                </td>
            </tr>
        
        
        </table>
        
    </div>


</body>
</html>';

						


//end order email



///////////////PDF html


$msg_pdf = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title></title>';
//$msg_pdf.="<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>";
$msg_pdf.='<style type="text/css">
* { font-family: "DejaVu Sans"; }
body{
	font-size:10px;
	
}

*{margin:0; padding:0;}
.clr{
	clear:both;
}
.wrapper{
	width:695px;
	height:auto;
	margin:0 auto;
}

.header{
	width:100%;
	margin:0 0 0px 0;
	display:inline-block;
}

.logo{
	float:left;
	margin:0 0 0 0;
	padding:0 0 0 0;
}

.info{
	float: right;
	margin: 0px 0px 0px 110px;
	width: 469px;
	padding:0 0 0 0;
	text-align:right;
	
}

.info p{
	font-size:12px;
	font-family: "DejaVu Sans";
	
}
	

.bill_add{
	width:100%;
	height:auto;
	display:inline-block;
	margin:10px 0;
}
.bill_add table{
	border:1px solid #000;
}
.main_tbl{
	margin:10px 0px 0px 0px;
}
.main_tbl thead tr th{
	
	font-family: "DejaVu Sans";
	margin:0px 0px 0px 0px;
	color:#000000;
	line-height:15px;
	border-bottom:1px solid #000000;
	border-top:1px solid #000000;
	border-left:1px solid #000000;
	padding:5px 10px;
}



.main_tbl tr td{
	
	font-family: "DejaVu Sans";
	margin:0px 0px 0px 0px;
	color:#000000;
	line-height:15px;
	border-bottom:1px solid #000000;
	border-left:1px solid #000000;
	padding:5px 15px 5px 15px;
}






.con_box{
	width:100%;
	height:auto;
	display:inline-block;
	margin:0px 0;
	font-size:10px;
	font-family: "DejaVu Sans";
}





.addres_box{
	width:100%;
	height:auto;
	display:inline-block;
	margin:10px 0;
}

.addres_left{
	width:300px;
	height:auto;
	float:left;
	display:block;
	margin:0 20px 0 0;
}

.addres_right{
	width:auto;
	height:auto;
	float:right;
	display:block;
}
.imagediv{
	margin:12px;
	padding: 3px 0 23px 4px;
}
ul {
	list-style: none;
	margin: 0px 0px 0px 0px;
	padding: 0px 0px 0px 0px;
	width: 100%;
	float:left;
	
	}
li{
font-size: 12px;
color: #333;
padding-left: 20px;
line-height: 17px;
}
 h4{
margin: 5px 0px 0px 0px;
padding: 0px 0px 0px 0px;
font-size: 12px;
color: #e74c3c;
text-transform: uppercase;
}
.options{
	width:100%;
	float:left;
	margin: 7px 0px 0px 0px;
padding: 0px 0px 0px 5px;
}
</style>



</head>

<body>

<!--wrapper-->
<div class="wrapper">

<div class="header">
<table>
<tr>
<td>
<div class="logo">
<a href="http://'.$_SERVER['HTTP_HOST'].'">
                                	
									<img  width="87" height="78" alt="logo" src="http://'.$_SERVER['HTTP_HOST'].$b_img.'
                                </a>
</div>
</td>
<td style="padding:12px;">
<div class="info">
<p style="height:42px;"><a href="http://'.$_SERVER['HTTP_HOST'].'">
                                	';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msg_pdf .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" alt="logo" width="300px"  />';
					}
					else
					{
						 $msg_pdf .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" alt="logo" width="300px"  />';
					}
                   $msg_pdf .=  '
                                </a></p>
<p style="height:20px;"><span class="imagediv"><a href="#"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email/23931.png" width="15"></a><a href="#"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email/facebook-512.gif" width="20"></a><a href="#"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email/rss-icon.png" width="18"></a></span></p>
<p>'.$lang_resource['ORDER_PDF_TITLE']. $id .'</p>';
 if((!isset($requestcollectionset))||($requestcollectionset==false)){
if ($order->preorder == 'true') {
						  //Time selection settings. 
							   $str='';
							$time_format=$rowtimeformat['value'];
							if($time_format==12){
								
									$str='PM';
									if($order->preordertimehh<12){
										$str='AM';
									}
									$order->preordertimehh=floor($order->preordertimehh%12);
									
									 if (intval($order->preordertimehh) < 10) {
										$order->preordertimehh = "0".$order->preordertimehh;
									}
									if (intval($order->preordertimemm) < 10) {
										$order->preordertimemm = "0".$order->preordertimemm;
									}
							}
	$msg_pdf .='<p >'.$lang_resource['V3_ORDER_DELIVERY_DATE'].' & '.$lang_resource['RESPONSIVE_ORDER_EMAIL_TIME'].' : '.$order->buyer->deliverydate.'  '.$order->preordertimehh.':'.$order->preordertimemm.'</p>';
}
 }
$msg_pdf .='<p>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_TYPE'].' : '. $deltypelang . '</p>

<p><a style="text-decoration:none;color:#000;" href="http://'.$_SERVER['HTTP_HOST'].'">'.$tr_o.'</a></p>

</div>

</td>
</tr>
<tr><td colspan="2" style=" border-bottom: 1px solid #000000;"></td>
</tr>

</table>

<div class="clr"></div>
</div>
<br />
<div class="con_box">
<table width="100%" cellspacing="5" cellpadding="0" style="font-size:12px;font-family: "DejaVu Sans";">';
 if((!isset($requestcollectionset))||($requestcollectionset==false)){
  $msg_pdf .='<tr>';
  $checkoutfields = $order->buyer->checkoutfields;
    if(in_array('Name', $checkoutfields)){
 	$msg_pdf .='<td width="30%">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
		    <td width="1%">:</td>
		    <td width="31%">'. ucfirst($order->buyer->name) . '</td>';
	}
	if(in_array('Email', $checkoutfields)){
	$msg_pdf .='<td width="6%">'.$lang_resource['LOGIN_CREATE_EMAIL'].'</td>
		    <td width="3%">:</td>
		    <td width="29%">'. strtolower($order->buyer->email) . '</td>';
    }
	$msg_pdf .='</tr>
  <tr>';
    if(in_array('Full Address', $checkoutfields)){
    $msg_pdf .='<td>'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].'</td>
		    <td>:</td>
		    <td>'. ucfirst($order->buyer->address) . '</td>';
	}
	if(in_array('Phone', $checkoutfields)){
    $msg_pdf .='<td>'.$lang_resource['Phone_V2'].'</td>
			    <td>:</td>
			    <td>'. $order->buyer->tel . '</td>';
	}

    $msg_pdf .='</tr>
  
</tr>
  ';
 }else{
	  $msg_pdf .='<tr>
    <td width="30%">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>
    <td width="1%">:</td>
    <td width="31%">'. ucfirst($requestcollectiondata[0]["customer_name"]) . '</td>
    <td width="6%">'.$lang_resource['MOBILE_FRONT_VISUALS_CITY'].'</td>
    <td width="3%">:</td>
    <td width="29%">'. $requestcollectiondata[0]["customer_town"]  . '</td>
    
  </tr>
  <tr>
    <td>'.$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'].'</td>
    <td>:</td>
    <td>'.ucfirst($requestcollectiondata[0]["customer_address1"].','.$requestcollectiondata[0]["customer_address2"]) . '</td>
    <td>'.$lang_resource['Phone_V2'].'</td>
    <td>:</td>
    <td>'. $requestcollectiondata[0]["customer_contactno"] . '</td>
    
  </tr>';
 }

$msg_pdf .='<tr><td colspan="6" style=" border-bottom: 1px solid #000000;"></td>
</tr>
</table>
</div>
<br />
<div class="bill_add">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="main_tbl" style="font-size: 12px; font-family: "DejaVu Sans";">
                <thead>
                  <tr>
                    <th>'.$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_ITEM'].'</th>';
					
					   if((!isset($requestcollectionset))||($requestcollectionset==false)){
                    $msg_pdf .='<th>'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</th>
					<th>'.$lang_resource['SHOPPING_NO_OF_PERSON'].'</th>
                    <th >'.$lang_resource['FRONT_MAIN_EMAIL_OPTIONS'].'</th>
                    <th>'.$lang_resource['FRONT_MAIN_EMAIL_COMMENT'].'</th>';
					   }else{
						    $msg_pdf .='<th>&nbsp;</th>
                    <th >&nbsp;</th>
                    <th>&nbsp;</th>';
					   }
                   $msg_pdf .=' <th  style="text-align:right;">'.$lang_resource['FRONT_MAIN_EMAIL_RATE'].'</th>
                  </tr>
              </thead>';
			     if((!isset($requestcollectionset))||($requestcollectionset==false)){
			  if(!empty($business->dishes)){
				  foreach ($business->dishes as $dish){
					  if($dish->options) {
						 $productOptionHtml =  Margeslash($dish->options);  
						} else {
						$productOptionHtml ='';
					}
					
					
					
					  $msg_pdf .='<tr>
						<td>' . $dish->name . '</td>
						<td>'.$dish->quantity.'</td>
						<td>'.$dish->nofperson.'</td>
						<td>' . $productOptionHtml .'</td>
						<td>' . ucfirst(strtolower($dish->comments)) . '</td>
						<td  style="text-align:right;" >'.$row23b["currency"].' '. convert2Digit($dish->total) . '</td>
					  </tr>';
				  }
			  }
                  if($order->tax) {
                  $msg_pdf .='<tr>
                    <td>'.$taxstring.'</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td  style="text-align:right;" >'.$row23b["currency"].' '.convert2Digit($order->tax).'</td>
                  </tr>';
				  }
				}else{
					
					   $msg_pdf .='<tr>
                    <td>'.$lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'].'</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td  style="text-align:right;" >'.$row23b["currency"].' ' .$requestcollectiondata[0]["deliveryprice"]. '</td>
                  </tr>';
				  $total=0;
				   $total = $total +$requestcollectiondata[0]["deliveryprice"];
					 
					 
				}
		  if((!isset($requestcollectionset))||($requestcollectionset==false)){		  
		if ($particular_business->shipping == '0.00')
			$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];
		else
			$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];

				if($deltype != "pickup") {	

   $msg_pdf .= '<tr>
                    <td>' . $shippingcaption . '</td>
                    <td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
                    <td>' . ucfirst(strtolower($particular_business->comments)) . '</td>
                    <td style="text-align:right;">'.$row23b["currency"].' '. convert2Digit($particular_business->shipping ). '</td>
                </tr>';
				       }		
		  }
		  
				  /*service fee section */
		  if(isset($order->servicefeeTotal1))
		  {
			 if(($order->servicefee==null) ||($order->servicefee=='')){
				 $order->servicefee=0;
			 }
			   $discountcaption = $lang_resource['SERVICE_FEE_V2'] ." (" .$order->servicefee ."%)";
			  
		
			$msg_pdf .='<tr>
					  <td >' . $discountcaption . '</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					   <td>&nbsp;</td>
					  <td   style="text-align:right;"> '.$row23b["currency"].' '. convert2Digit($order->servicefeeTotal1) . '</td>
				      </tr>';
				  
		  }
		  /*service fee section */   
		  
		    if((!isset($requestcollectionset))||($requestcollectionset==false)){
		  /*discount rate*/
		  if(in_array('Discount Coupon', $checkoutfields)){
		   if((isset($order->discountcategory)) && (trim($order->discountprice) !=''))
		  {
			  if($order->discounttype == 1)
			  $discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ." (" .$order->discountrate ."%)";
			  else if($order->discounttype == 2)
			  $discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ;
			  
			//  $total = $total - $order->discountprice;
			//  $total = number_format($total, 2);
			
			$msg_pdf .='<tr>
					  <td >' . $discountcaption . '</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					   <td>'. ucfirst(strtolower($order->discountcomments)) . '</td>
					  <td   style="text-align:right;"> '. convert2Digit($order->discountprice) . '</td>
				      </tr>';
				  
		  }
		}
		  
		  /*end discount rate8*/  
		  
		  //delivery comments
		  $msg_pdf .='<tr>
					  <td >' . $shippingcaption . '</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					   <td>'. ucfirst(strtolower($order->buyer->comments)). '</td>';
					   if($deltype != "pickup") {	
					   
					  $msg_pdf .='<td   style="text-align:right;">'.$row23b["currency"].' '. convert2Digit($business->shipping) . '</td>';
					   }
					   else
					   {
						 $msg_pdf .='<td   style="text-align:right;">0.00</td>';   
						   
					   }
					   
				      $msg_pdf .='</tr>';     
				  
			}
              $msg_pdf .='<tr>
                    <td colspan="5" align="right";><strong>'.$lang_resource['MOBILE_CHECKOUT_TOTAL'].'</strong></td>
                    <td style="text-align:right;"><strong> '.$row23b["currency"].''.convert2Digit($order->total).'</strong></td>
                  </tr>
            </table>
</div>
<br />
<!--addres_box-->
<div class="addres_box">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="footer_tbl" style="font-size: 11px; font-family: "DejaVu Sans";">
              <tr>
                <td width="84%"><p><strong>'.$lang_resource['MOBILE_MENU_LIST_PAYMENT_METHOD'] .':</strong>'. $paymethod.'</p></td>
                <td width="6%"><a href="#"><img src="https://cdn0.iconfinder.com/data/icons/glyph_set/128/apple.png" width="35"></a>
                </td>
                 <td width="5%"><a href="#"><img src="https://lh3.ggpht.com/lAjUqEGdt1ZOOcKMRALBOVW3sj1NgDy6OiKo60fK6Sp4BjWPZvwv9jOi4K4NZrJATtE=w300" width="30"></a>
                </td>
                <td width="5%">
                        <a href="#"><img src="http://static.wixstatic.com/media/686a9a_26d87b5b7f454636aa3d2ffe4e8e53ce.png" width="28"></a>
                  
                </td>
              </tr>
            </table>
<div class="clr"></div>
</div>
<!--addres_box end-->

<div class="clr"></div>
</div>
<!--wrapper end-->
</body>
</html>
';

/////////////////PDF html ends


function Margeslash($text){
	
	$res = explode("_@_",$text);
	
	$options_record = Array();
	foreach($res as $po){
	
	$poption = explode("@u@",$po);
	$a=new stdClass();
	
	$a->optionheader=$poption[0];
	$a->optionchoice=$poption[1];
	
	
	
	if($poption[0]!=""){
		
	array_push($options_record,$a);
	
	}
	
	}

	
	
	$html='<ul class="pdct_op">';
	$lasti =0;
	//
	foreach($options_record as $each_record){
	if($lasti == 0 ) {
	$html .='<h4>'.$each_record->optionheader.'</h4>';
	$html .='<li>'.$each_record->optionchoice.'</li>';
	}
	else if($previousHeader == $each_record->optionheader ) {
		
		$html .='<li>'.$each_record->optionchoice.'</li>';
	}
	else if($previousHeader != $each_record->optionheader) {
		 $html .='<h4>'.$each_record->optionheader.'</h4>';
		 $html .='<li>'.$each_record->optionchoice.'</li>';
		
		}
	$previousHeader = $each_record->optionheader;
	$lasti++;
	}
	$html .='</ul>';
	return $html;
}


?>