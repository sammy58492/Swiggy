<?php
ob_start();

// Turn off error reporting
error_reporting(0);
header('content-type:text/html;charset=utf-8');

function convert2Digit($num){
	if($num<10){
		return "0".$num;
	}else{
		return $num;
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
if ($particular_business->paymethod->payu==true) {
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYU']." "."(" . $paymentid . ")";
}
if ($particular_business->paymethod->stripe==true) {
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_STRIPE']." "."(" . $paymentid . ")";
}
//request collection start
 if((isset($requestcollectionset))&&($requestcollectionset==true)){
	 $paymethod_paypal = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL']." "."(".$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE']. $tx . ")";
	  $deltype=$lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'];
 }
//request collection end 

//check if paymethod  cash or card
/*if(($particular_business->paymethod->cash==false) && (($particular_business->paymethod->card==false)) && ($particular_business->paymethod->paypal==false))
  {
	  $relative_printer_path = "../../../orders/"; 
	  include_once "../../lib/printer-code.php";
	  
  }
*/

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
                    <a href="http://' . $_SERVER["HTTP_HOST"] . '">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $Showmsg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" alt="logo"/>';
					}
					else
					{
						 $Showmsg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" alt="logo"/>';
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
                   '.$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_FAILURE'].'
                    </div>	
                </div>';

                 $bu_id=$particular_business->id; // particular Business id
               pg_prepare($link,'sql5b','SELECT * from w_business WHERE id=$1');
               $result23b = pg_execute($link,'sql5b',array($bu_id));
               $row23b = pg_fetch_array($result23b);
			  $row23b['currency'] = currency_symbol($row23b['currency']);
			   
			   
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
                
               
                
            </div>';
			
            if($order->buyer->deliveryType == "pickup") {	

            	$resturantaddress = ucfirst($row23b['street']) .','. ucfirst($row23b['colony']) .','. $cityfetch['city'].' , '. $countryfetch['name'];
                $resturantaddress = str_replace("/","@",$resturantaddress);

            	$buyeraddress = ucfirst($order->buyer->address).','. $order->buyer->colony . ','. $order->buyer->cityname ;
                $buyeraddress = str_replace("/","@",$buyeraddress);
					
				
	}



			 
                    
          
                    
       /*     $Showmsg .= '<div class="pay-method">
                
                <div><span><strong>'.$lang_resource['EXPORT_PAYMENT_METHOD'].'</strong></span> :'. $paymethod_paypal.' </div>';
            
			$Showmsg .= '<div style="padding-bottom:15px;"><span><strong>'.$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'].'</strong></span> :  ' . $deltype . '  </div>';	*/
		
                
                
            $Showmsg .= '
                    
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
                      $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg"  width="315" height="58" alt="logo"/>';
					}
					else
					{
						 $msg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg"  width="315" height="58" alt="logo"/>';
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
									             
               	
				 
				$msg .= '<em>'.$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'].'<br>'.$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_FAILURE'].'</em>';
				$tr_o = $lang_resource['INDEX_TRACK_ORDER'];
				
				
			
				
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
							
                            $msg .='<td valign="bottom" align="right" style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:20px;color:#000;text-align:center;white-space:nowrap;height:105px;">
                            	
                            </td>';

							
							
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
		if ($order->business[0]->paymethod->payu==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYU']." "."(" . $paymentid . ")";	
				
		}
		if ($order->business[0]->paymethod->stripe==true) {
			if ($paymethod=='')
			  
			$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_STRIPE']." "."(" . $paymentid . ")";	
				
		}
		
		if ($order->business[0]->paymethod->cash==true) {
			if ($paymethod=='')							
					$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
				}
	
		  
	/*	            
              <table border="0" cellpadding="5" cellspacing="0" width="100%" style="text-align:center;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#666666;
	border-bottom:solid 1px #dedede;">
                    	<tr>
                        	<td><span style="font-weight:bold;">'.$lang_resource['FRONT_MAIN_PAYMENT_METHOD'].'</span> '. $paymethod . '</td>
                        </tr>
                        <tr>
                        	<td style="padding-bottom:15px;"><span style="font-weight:bold;">'.$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'].'</span> :  '. $deltypelang . '  </td>
                        </tr>
                    </table>*/
                    
                   $msg .=' <table border="0" cellpadding="5" cellspacing="0" width="20%" align="center" class="app-table">
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
//$msg_pdf.="<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>";
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
<p style="height:42px;"><a href="http://'.$_SERVER['HTTP_HOST'].'">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $msg_pdf .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" width="300px" alt="logo"/>';
					}
					else
					{
						 $msg_pdf .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" width="300px" alt="logo"/>';
					}
                   $msg_pdf .=  '</a></p>
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
		  
		   /*tip for the driver section */  
		  if(isset($order->buyer->tips))
		  {
			 if(($order->buyer->tips==null) ||($order->buyer->tips=='')){
				 $order->buyer->tips=0;
			 }
			 
			$msg_pdf .='<tr>
					  <td >' . $lang_resource['SHOPPING_FOURTH_TIP'] . '</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					   <td>&nbsp;</td>
					  <td   style="text-align:right;"> '.$row23b["currency"].' '. convert2Digit($order->buyer->tips) . '</td>
				      </tr>';
				  
		  }
		  /*tip for the driver section */   
		  
		  
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
