<?php 
$msg ='';
$msg .='<!DOCTYPE html>';
$msg .='<html style="box-sizing: border-box;">';
$msg .='<head>';
$msg .='<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
$msg .='<meta charset="utf-8">';
$msg .='<title>Untitled Document</title>';
$msg .='</head>';
$msg .='<body style="font-family: \'Open Sans\', sans-serif !important; box-sizing: border-box; background: #eeeeee; margin: 0; padding: 0;" bgcolor="#eeeeee">';
$msg .='<style type="text/css">';
$msg .='@font-face {';
$msg .='font-family: \'Open Sans\'; font-style: normal; font-weight: 300; src: local(\'Open Sans Light\'), local(\'OpenSans-Light\'), url(\'https://fonts.gstatic.com/s/opensans/v13/DXI1ORHCpsQm3Vp6mXoaTYnF5uFdDttMLvmWuJdhhgs.ttf\') format(\'truetype\');';
$msg .='}';
$msg .='@font-face {';
$msg .='font-family: \'Open Sans\'; font-style: normal; font-weight: 400; src: local(\'Open Sans\'), local(\'OpenSans\'), url(\'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf\') format(\'truetype\');';
$msg .='}';
$msg .='@font-face {';
$msg .='font-family: \'Open Sans\'; font-style: normal; font-weight: 600; src: local(\'Open Sans Semibold\'), local(\'OpenSans-Semibold\'), url(\'https://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSonF5uFdDttMLvmWuJdhhgs.ttf\') format(\'truetype\');';
$msg .='}';
$msg .='@font-face {';
$msg .='font-family: \'Open Sans\'; font-style: normal; font-weight: 700; src: local(\'Open Sans Bold\'), local(\'OpenSans-Bold\'), url(\'https://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzInF5uFdDttMLvmWuJdhhgs.ttf\') format(\'truetype\');';
$msg .='}';
$msg .='@font-face {';
$msg .='font-family: \'Open Sans\'; font-style: normal; font-weight: 800; src: local(\'Open Sans Extrabold\'), local(\'OpenSans-Extrabold\'), url(\'https://fonts.gstatic.com/s/opensans/v13/EInbV5DfGHOiMmvb1Xr-honF5uFdDttMLvmWuJdhhgs.ttf\') format(\'truetype\');';
$msg .='}';
$msg .='.track_my_order_now_btn:hover {';
$msg .='background: #c42424; border-bottom: 3px solid #a71616;';
$msg .='}';
$msg .='@media (max-width:767px) {';
$msg .='.table-responsive {';
$msg .='width: 100%; margin-bottom: 15px; overflow-y: hidden; -ms-overflow-style: -ms-autohiding-scrollbar; border: 1px solid #ddd;';
$msg .='}';
$msg .='.row li {';
$msg .='float: left; width: 100%; padding-right: 0px;';
$msg .='}';
$msg .='.template_wrapper {';
$msg .='padding: 20px;';
$msg .='}';
$msg .='.templet-body {';
$msg .='padding: 15px;';
$msg .='}';
$msg .='}';
$msg .='@media (max-width:600px) {';
$msg .=' .track_my_order_now_btn {';
$msg .='  width: 100%;';
$msg .=' }';
$msg .='}';
$msg .='</style>';


$b_id = $order->business[0]->id; // particular Business id
pg_prepare($link,'sql5','SELECT * from w_business WHERE id=$1');
$result23 = pg_execute($link,'sql5',array($b_id));
$row23 = pg_fetch_array($result23);

$deliverytime = $row23['deliverytime'];
$pickuptime = $row23['pickuptime'];
$bstreet = $row23['street'];
$bcolony = $row23['colony'];
$btel = $row23['tel'];
$bcurrency = currency_symbol($row23b['currency']);



$msg .=' <div class="header" style="box-sizing: border-box; height: 256px; width: 100%; float: left; margin-bottom: 66px; background: #121c25; padding: 25px 15px;">';
$msg .=' <p style="box-sizing: border-box; color: #c8c8c8; font-size: 16px; text-align: center;" align="center">Thank for your order at '.$order->business[0]->name.'</p>';
$msg .=' <h1 style="box-sizing: border-box; color: #fff; font-size: 35px; text-align: center; margin: 80px 0px 0px;" align="center">ORDERING</h1>';
$msg .='</div>';

$msg .='<div class="template_wrapper" style="box-sizing: border-box; width: 85%; clear: both; background: #fff; margin: 0px auto; padding: 10%;">';
$msg .='<p style="box-sizing: border-box; color: #484848; font-size: 18px; text-align: center; margin: 10px 0px;" align="center">Hello Alonso,</p>';
$msg .='<p class="status" style="box-sizing: border-box; color: #e64949; font-size: 18px; text-align: center; margin: 10px 0px;" align="center">The status of your order is: pending</p>';
$msg .='<p style="box-sizing: border-box; color: #484848; font-size: 18px; text-align: center; margin: 45px 0px;" align="center"><button type="button" class="track_my_order_now_btn" style="box-sizing: border-box; border-radius: 3px; color: #fff; font-size: 18px; width: 364px; height: 60px; font-weight: 400; font-family: \'Open Sans\', sans-serif; border-bottom-width: 3px; border-bottom-color: #c42828; cursor: pointer; background: #e64949; border-style: none none solid;">Track my order now</button></p>';


$msg .='<div class="templet-header-red" style="box-sizing: border-box; color: #fff; text-align: center; background: #e64949; padding: 15px;" align="center">';

if($order->buyer->deliveryType == "delivery"){
	if($deliverytime == "" || $deliverytime == undefined){
		$dt = '00:00';							
	}else{
		$dt = $deliverytime				
	}

	$msg .='<h4 style="box-sizing: border-box; font-weight: 300; font-size: 18px; margin: 0px;">'.$lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'].'</h4>';
	$msg .=' <h1 style="box-sizing: border-box; font-weight: 400; font-size: 60px; margin: 5px 0px;">'.$dt.'</h1>';
}else{
	if($pickuptime == "" || $pickuptime == undefined){
		$pt = '00:00';							
	}else{
		$pt = $pickuptime				
	}	
	$msg .='<h4 style="box-sizing: border-box; font-weight: 300; font-size: 18px; margin: 0px;">Estimated Pickup Time</h4>';
	$msg .=' <h1 style="box-sizing: border-box; font-weight: 400; font-size: 60px; margin: 5px 0px;">'.$pt.'</h1>';
}
$msg .='</div>';
$msg .='<div class="templet-body" style="box-sizing: border-box; padding: 8%; border: 1px solid #eaeaea;">';
$msg .='<h4 class="order_no_heading" style="box-sizing: border-box; font-weight: 400; font-size: 22px; color: #484848; text-transform: uppercase; margin: 10px 0px; padding: 0px 15px;">'.$lang_resource['FRONT_MAIN_EMAIL_ORDER'].' # '.$id.'</h4>';
$msg .=' <div class="product_details" style="box-sizing: border-box; border-bottom-style: solid; border-bottom-color: #cecece; border-bottom-width: 1px; display: table; width: 100%; margin: 0px 0px 20px; padding: 0px 15px 30px;">';
$msg .='<ul class="row" style="box-sizing: border-box; margin: 0; padding: 0; list-style: none;">';
$msg .='<li style="box-sizing: border-box; float: left; width: 45%;">';
$msg .=' <h4 style="box-sizing: border-box; font-weight: 400; font-size: 18px; color: #484848; margin: 10px 0px;">From</h4>';
$msg .='<p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left"><strong style="box-sizing: border-box;">'.$order->business[0]->name.'</strong></p>';
$msg .='<p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left">'.$bstreet.'</p>';
$msg .='<p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left">'.$bcolony.'</p>';
$msg .='<p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left">'.$btel.'</p>';
$msg .=' </li>';
$msg .='<li style="box-sizing: border-box; float: left; width: 45%;">';
$msg .=' <h4 style="box-sizing: border-box; font-weight: 400; font-size: 18px; color: #484848; margin: 10px 0px;">To</h4>';
$msg .=' <p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left"><strong style="box-sizing: border-box;">'.$order->buyer->name.'</strong></p>';
$msg .=' <p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left">'.$order->buyer->address.'</p>';
$msg .=' <p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left">'.$order->buyer->colony.'</p>';
$msg .=' <p style="box-sizing: border-box; color: #616161; font-size: 16px; text-align: left; font-weight: 400; margin: 2px 0px;" align="left">'.$order->buyer->tel.'</p>';
$msg .='</li>';
$msg .=' </ul>';

$msg .='</div>';



$twilio_phone;
$twilio_enabled;
$twilio_order = "";
$business = $order->business[0];
$twilio_phone = $business->twiliophone;
$twilio_enabled = $business->acceptsms;	

pg_query($link, "DEALLOCATE ALL");
pg_prepare($link,'sql4'.$business->id,'SELECT buys from w_business WHERE id=$1');
$result2 = pg_execute($link,'sql4'.$business->id,array($business->id));
if (pg_num_rows($result2)==1){
	while($row2 = pg_fetch_array($result2)){
		pg_prepare($link,'sqls'.$business->id,'UPDATE w_business SET buys=$2 WHERE id=$1');
		pg_execute($link,'sqls'.$business->id,array($business->id,intval($row2['buys'])+1));
	}
}		

if (!empty($business->email) && $business->email!='null')
	array_push($emails,$business->email);

$total = 0;
$paymethod = '';


if((!isset($requestcollectionset))||($requestcollectionset==false)){ 	
	if($order->business[0]->dishes){
		$msg .='<div class="product_details_tbl" style="box-sizing: border-box; margin: 0px; padding: 0px 0px 30px;">';

		$msg .='<div class="" style="box-sizing: border-box;">';
		$msg .='<div class="table-responsive" style="box-sizing: border-box; min-height: .01%; overflow-x: auto;">';
		$msg .='<table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%" style="box-sizing: border-box; width: 100%;"><tbody style="box-sizing: border-box;">';	


		foreach ($business->dishes as $dish){
			if($dish->options) {
				$productOptionHtml =  Margeslash($dish->options);  
			} else {
				$productOptionHtml ='';
			}

		
			$msg .='<tr style="box-sizing: border-box;">';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top"> '.$dish->quantity.' x </td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top"> '.$dish->name.'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top"> '.$dish->nofperson.'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top"> '.$productOptionHtml.'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top"> '.str_replace("%20", " ", ucfirst($dish->comments)) .'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top">'.$bcurrency.' '.convert2Digit($dish->total).'</td>';
			$msg .='</tr>';

			$total = $total + $dish->total;
		}
		$msg .='</tbody></table>';
		$msg .='</div>';

		$msg .='</div>';
		$msg .='</div>';

	}	
}

if((!isset($requestcollectionset))||($requestcollectionset==false)){
	if($order->reservestatus){	
		$msg .='<h4 class="order_no_heading" style="box-sizing: border-box; font-weight: 400; font-size: 22px; color: #484848; text-transform: uppercase; margin: 10px 0px; padding: 0px 15px;">Reservation</h4>';


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

			$msg .='<div class="product_details_tbl" style="box-sizing: border-box; margin: 0px; padding: 0px 0px 30px;">';

			$msg .='<div class="" style="box-sizing: border-box;">';
			$msg .='<div class="table-responsive" style="box-sizing: border-box; min-height: .01%; overflow-x: auto;">';
			$msg .='<table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%" style="box-sizing: border-box; width: 100%;"><tbody style="box-sizing: border-box;">';
			$msg .='<tr style="box-sizing: border-box;">';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['LOGIN_CREATE_NAME'].'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">:</td>';
			$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.ucfirst(str_replace("%20", " ", $order->buyer->name)).'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"> </td>';
			$msg .='</tr>';
			$msg .='<tr style="box-sizing: border-box;">';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['LOGIN_CREATE_EMAIL'].'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">:</td>';
			$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.strtolower($order->buyer->email).'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"> </td>';
			$msg .='</tr>';
			$msg .='<tr style="box-sizing: border-box;">';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['Phone_V2'].'</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">:</td>';
			$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$order->buyer->tel.'</td>';
			$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"> </td>';
			$msg .='</tr>';
			
			$msg .='</tbody></table>';
			$msg .='</div>';

			$msg .='</div>';

			$msg .='</div>';
		}


		$tablemsg = '';	


		$msg .='<div class="product_details_tbl" style="box-sizing: border-box; margin: 0px; padding: 0px 0px 30px;">';
		$msg .=' <div class="" style="box-sizing: border-box;">';
		$msg .='<div class="col-md-12" style="box-sizing: border-box;">';
		$msg .='<div class="table-responsive" style="box-sizing: border-box; min-height: .01%; overflow-x: auto;">';
		$msg .=' <table class="table table-striped table-condensed rsv_tbl" style="box-sizing: border-box; width: 100%;">';
		$msg .='<thead style="box-sizing: border-box;"><tr style="box-sizing: border-box;">';
		$msg .='<th style="box-sizing: border-box; text-align: left; color: #484848;" align="left">'.$lang_resource['FRONT_RESERVATION_TABLE'].'</th>';
		$msg .='<th style="box-sizing: border-box; text-align: left; color: #484848;" align="left">'.$lang_resource['FRONT_RESERVATION_ROOM'].'</th>';
		$msg .='<th style="box-sizing: border-box; text-align: left; color: #484848;" align="left">'.$lang_resource['FRONT_RESERVATION_FREE'].'</th>';
		$msg .='<th style="box-sizing: border-box; text-align: left; color: #484848;" align="left">'.$lang_resource['PRODUCT_POTIONS_QUANTITY'].'</th>';
		$msg .='<th style="box-sizing: border-box; text-align: left; color: #484848;" align="left">'.$lang_resource['Price_V2'] .'</th>';
		$msg .='</tr></thead>';

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

		$tableprice = sizeof($order->reserveQty->Table) * $order->tableprice ;	
		$tableprice = $tableprice;	


		$msg .='<tbody style="box-sizing: border-box;">';
		$msg .='<tr style="box-sizing: border-box;">';
		$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.implode(", ",$order->reserveQty->Table).'</td>';
		$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.implode(", ",$order->reserveQty->Room).'</td>';
		$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.implode(", ",$order->reserveQty->Free).'</td>';



		$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">';
		if(sizeof($order->reserveQty->Table) != 0){	
			$msg .= $lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Table).' x '.$order->tableprice;
			$msg .='<br>';
			$total	= $total + $tableprice;
		}
		if(sizeof($order->reserveQty->Room) != 0){	
			$msg .= $lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Room).' x '.$order->roomprice;
			$msg .='<br>';
			$total	= $total + $roomprice;
		}
		if(sizeof($order->reserveQty->Free) != 0){	
			$msg .= $lang_resource['FRONT_RESERVATION_TABLE'].' '.sizeof($order->reserveQty->Free).' x '.$order->freeprice;
			$msg .='<br>';
			$total	= $total + $freeprice;
		}
		$msg .='</td>';
		$msg .='<td align="right" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" valign="top">';
		if(sizeof($order->reserveQty->Table) != 0){	
		$msg .=$bcurrency.' '.convert2Digit($tableprice);
		$msg .='<br>';
		}
		if(sizeof($order->reserveQty->Room) != 0){	
			$msg .=$bcurrency.' '.convert2Digit($roomprice);
			$msg .='<br>';
		}
		if(sizeof($order->reserveQty->Free) != 0){	
			$msg .=$bcurrency.' '.convert2Digit($freeprice);
			$msg .='<br>';
		}
		$msg .='</td>';
		$msg .=' </tr>';
		$msg .='</tbody>';
		$msg .='</table>';
		$msg .='</div>  ';
		$msg .='</div>';

		$msg .=' </div>';

		$msg .=' </div>';
	}
}


$msg .='  <div class="product_details_tbl" style="box-sizing: border-box; margin: 0px; padding: 0px 0px 30px;">';
$msg .=' <div class="" style="box-sizing: border-box;">';
$msg .='  <div class="table-responsive" style="box-sizing: border-box; min-height: .01%; overflow-x: auto;">';
$msg .='  <table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%" style="box-sizing: border-box; width: 100%;"><tbody style="box-sizing: border-box;">';

if($order->business[0]->dishes){

	if($order->buyer->taxtype == 1){
		$total = $total + $business->shipping + $order->tax;
		$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'];
	}else{
		$total = $total + $business->shipping;
		$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'];
    }
				
	$taxpercentage = $order->buyer->tax;
	$tipsprice = $order->buyer->tips;
	
	if ($order->buyer->tips > 0){
		$total = $total	+ $order->buyer->tips;
	}
			
	$total = $total;
				
	$deltype = $order->buyer->deliveryType;

	//Shipping
	if ($business->shipping=='0.00')
		$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];
	else
		$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY_WITH_COST'];

	if($deltype != "pickup") {		
		$msg .='<tr style="box-sizing: border-box;">';
		$msg .='<td colspan="2" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$shippingcaption.'<small>'.str_replace("%20", " ", ucfirst($order->buyer->comments)) .'</small></td>';
		$msg .='<td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.' '. convert2Digit($business->shipping) .'</strong></td>';
		$msg .='</tr>';		
	}
	//Shipping

	//Service Fee
	if(isset($order->servicefeeTotal1)){
		if(($order->servicefee==null) ||($order->servicefee=='')){
			$order->servicefee=0;
		}
		$discountcaption = $lang_resource['SERVICE_FEE_V2'] ." (" .$order->servicefee ."%)";

		$msg .='<tr style="box-sizing: border-box;">';
		$msg .='<td colspan="2" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$discountcaption.'</td>   ' ;                               
		$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.' '. convert2Digit($order->servicefeeTotal1) .'</strong></td>';
		$msg .='</tr>';
	}
	//Service Fee

	//Discount Section
	if(in_array('Discount Coupon', $checkoutfields)){	
		if((isset($order->discountcategory)) && (trim($order->discountprice) !='')){
			if($order->discounttype == 1)
				$discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ." (" .$order->discountrate ."%)";
			else if($order->discounttype == 2)
				$discountcaption = $lang_resource['SHOPPING_DISCOUNT_TEXT'] ;

			$total = $total - $order->discountprice;
			$total = $total;

			$msg .='<tr style="box-sizing: border-box;">';
			$msg .='<td colspan="2" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$discountcaption.'<small>'.ucfirst(strtolower($order->discountcomments)) .'</small></td>   ' ;                               
			$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.' '. convert2Digit($order->discountprice) .'</strong></td>';
			$msg .='</tr>';
		}
	}
	//Discount Section

	//Tax
	if ($order->tax > 0){
		$msg .='<tr style="box-sizing: border-box;">';
		$msg .='<td colspan="2" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['Tax_V2'].' ('. $taxpercentage .'%)<br>'. ucfirst(strtolower($taxstring)).'</td>';                               
		$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.' '. convert2Digit($order->tax) .'</strong></td>';
		$msg .='</tr>';
	}
	//Tax

	//Tip For the Driver
	if(in_array('Tip For The Driver', $checkoutfields)){			
		if ($order->buyer->tips > 0){
			$msg .='<tr style="box-sizing: border-box;">';
			$msg .='<td colspan="2" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['SHOPPING_FOURTH_TIP'].'</td>';                               
			$msg .=' <td style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.' '. convert2Digit($tipsprice) .'</strong></td>';
			$msg .='</tr>';


			
			$msg .='<tr bgcolor="'.$bg.'">
				  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['SHOPPING_FOURTH_TIP'].'</td>
				  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
				  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
				  <td style="border-bottom:solid 2px #fff;padding:8px;">&nbsp;</td>
				  <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row23b["currency"].' '. convert2Digit($tipsprice) . '</td>
			  </tr>';
			
		}
	}

	//Tip For the Driver
}
if($order->usedpointvalue !=""){
	$msg .='<tr style="box-sizing: border-box;">';
	$msg .='<td colspan="2" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['PAID_POINT_TOTAL'].'</td>   '  ;
	$msg .='<td class="credit_price_text" style="box-sizing: border-box; color: #616161; font-size: 13px; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.'' .convert2Digit($order->usedpointvalue) . '</strong></td>';
	$msg .='</tr>';
}


$msg .='<tr style="box-sizing: border-box;">';
$msg .='<td colspan="2" class=" total_text" style="box-sizing: border-box; color: #616161 !important; font-size: 22px !important; vertical-align: top; padding: 5px; border: none;" valign="top">'.$lang_resource['MOBILE_CHECKOUT_TOTAL'].'</td>  '  ;                               
$msg .='<td class="total_price_text" style="box-sizing: border-box; color: #e64949 !important; font-size: 22px !important; vertical-align: top; text-align: right; padding: 5px; border: none;" align="right" valign="top"><strong style="box-sizing: border-box;">'.$bcurrency.'' .$order->total. '</strong></td>';
$msg .='</tr>';
$msg .='</tbody></table>';
$msg .='</div>';

$msg .='</div>';

$msg .='</div>';


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

if ($order->business[0]->paymethod->payeezy==true){
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
if ($order->business[0]->paymethod->btrans==true) {
	if ($paymethod=='')
		$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_BTRANS']." "."(" . $paymentid . ")";	
}
if ($order->business[0]->paymethod->bsa==true) {
	if ($paymethod=='')
		$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_BSA']." "."(" . $paymentid . ")";	
}
if ($order->business[0]->paymethod->azul==true) {
	if ($paymethod=='')
		$paymethod = $lang_resource['PAYMENT_GATEWAY_ALL_AZUL_PAYMENT_SUCCESS']." "."(" . $paymentid . ")";	
}
if ($order->business[0]->paymethod->quickpay==true) {
	if ($paymethod=='')
		$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_QUICKPAY']." "."(" . $paymentid . ")";	
}
if ($order->business[0]->paymethod->paynl==true) {
	if ($paymethod=='')
		$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYNL']." "."(" . $paymentid . ")";	
}
if ($order->business[0]->paymethod->zaakpay==true) {
	if ($paymethod=='')
		$paymethod = $lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_ZAAKPAY']." "."(" . $paymentid . ")";	
}
if ($order->business[0]->paymethod->cash==true) {
	if ($paymethod=='')							
		$paymethod = $lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'];
}


$msg .=' <br style="box-sizing: border-box;"><br style="box-sizing: border-box;"><h4 class="method_text" style="box-sizing: border-box; font-size: 18px; color: #484848; text-align: center; font-weight: 400; margin: 10px 0px; padding: 0px;" align="center">'.$lang_resource['FRONT_MAIN_PAYMENT_METHOD'].' : '.$paymethod.'</h4>';
$msg .=' <h4 class="method_text" style="box-sizing: border-box; font-size: 18px; color: #484848; text-align: center; font-weight: 400; margin: 10px 0px; padding: 0px;" align="center">Delivery method : '.$deltypelang.'</h4>';
$msg .=' <br style="box-sizing: border-box;"><br style="box-sizing: border-box;">';
$msg .='</div>';



$msg .='</div>';

$msg .=' <div class="template_footer" style="box-sizing: border-box; height: 135px; width: 100%; float: left; margin-top: 66px; background: #121c25; padding: 25px 15px;">';
$msg .='<div class="footer_social" style="box-sizing: border-box; width: 200px; margin: 0px auto;">';
$msg .=' <ul style="box-sizing: border-box; width: 100%; margin: 0px; padding: 0; list-style: none;">';
$msg .='<li style="box-sizing: border-box; width: 33.3%; float: left; text-align: center; margin: 10px 0px;"><a href="#" style="box-sizing: border-box;">';
$msg .='<img src="images/ft_social_icon-1.png" style="box-sizing: border-box;"></a></li>';
$msg .='<li style="box-sizing: border-box; width: 33.3%; float: left; text-align: center; margin: 10px 0px;"><a href="#" style="box-sizing: border-box;"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/ft_social_icon-2.png" style="box-sizing: border-box;"></a></li>';
$msg .='<li style="box-sizing: border-box; width: 33.3%; float: left; text-align: center; margin: 10px 0px;"><a href="#" style="box-sizing: border-box;"><img src="http://'.$_SERVER['HTTP_HOST'].'/images/email_template/ft_social_icon-3.png" style="box-sizing: border-box;"></a></li>';
$msg .=' </ul>';
$msg .='</div>';

$msg .=' <p style="box-sizing: border-box; color: #c8c8c8; font-size: 16px; text-align: center; clear: both; margin-top: 20px;" align="center">Copyright &amp; ordering.com All right reserved.</p>';
$msg .='</div>';




$msg .='</body>';
$msg .='</html>';

echo $msg;

/*$from = 'subhamay.universe@gmail.com';
$to = 'subhamay.universe@gmail.com';
$subject = 'email template';
$headers = "From: $from\r\nReply-To: $from\r\n"."MIME-Version: 1.0\n"."Content-type:text/html;charset=iso-8859-1";
$emailmsg = mail($to,$subject,$msg,$headers);*/

?>