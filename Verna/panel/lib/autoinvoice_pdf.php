<?php
ob_start();
session_start();
//edit*		-----------

 $id=$_GET['oid'];

require('../../languages/lang.en.php');

function FetchInvoiceDataForPdf($id,$link)
	{
	
	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	
	pg_prepare($link,'sqldo3',"SELECT id,date,data FROM w_orders where id=$1");
	$allorderhistory = array();
	if (pg_num_rows($result)==1)
	
		while($row = pg_fetch_array($result))
			{
			unset($ad);
			$ad->id = $row['id'];
		
			$date1 = $row['date'];
			$ad->date = date("d-m-Y", strtotime($date1));

			$ad->city = $row['city'];
			$orderslist = $row['orderid'];
			$orderslist = parse($row['orderid']);
			
			$cashDeliveryCollection =0;
			$cashpickupCollection=0;
			$paypalCollection=0;
			$cardCollection=0;
			$TotalDishCollection=0;
			
			$cashDeliveryTax =0;
			$cashpickupTax=0;
			$paypalTax=0;
			$cardTax=0;
			$TotalDishTax=0;
			
			$cashDeliveryTips =0;
			$cashpickupTips=0;
			$paypalTips=0;
			$cardTips=0;
			
			$cashDeliveryShipping =0;
			$cashpickupShipping=0;
			$paypalShipping=0;
			$cardShipping=0;
			$ipaypal=0;
			$icard=0;
			$icashdelivery=0;
			$icashpickup=0;
			
			
						foreach($orderslist as $orderid) {
						
								$orderexe = pg_execute($link,'sqldo3',array($orderid));
								$orderfetch = pg_fetch_array($orderexe);
								$orderRec= json_decode($orderfetch['data']);
								unset($orderDetails);
								
								$dishtotal =0;
								foreach($orderRec->business[0]->dishes as $dish) {
									$dishtotal = $dishtotal + $dish->total;
									
									}
								if( $orderRec->buyer->tips)
								$orderDetails->tips = $orderRec->buyer->tips;
								else 
								$orderDetails->tips = 0;
								
								
								if($orderRec->buyer->taxtype == 1) {
								$orderDetails->taxprice = $orderRec->tax;
								}
								else {
								$orderDetails->taxprice = 0;
								}
									
								$orderDetails->orderid = $orderfetch['id'];
								$orderDetails->businessname = $orderRec->business[0]->name;
								$orderDetails->businessid = $orderRec->business[0]->id;
								$orderDetails->customername = $orderRec->buyer->name;
								$orderDetails->orderdate = date('d/m/Y',strtotime($orderfetch['date']));
								if($orderRec->business[0]->paymethod->cash) {
								$orderDetails->paytype = "Cash";
								    if($orderRec->business[0]->paymethod->cash && $orderRec->buyer->deliveryType == "delivery" ) {
									$cashDeliveryCollection = $cashDeliveryCollection + $orderRec->total;	
									$cashDeliveryTips = $cashDeliveryTips + $orderDetails->tips;
									$cashDeliveryShipping = $cashDeliveryShipping + $orderRec->business[0]->shipping;
									$cashDeliveryTax = $cashDeliveryTax + $orderDetails->taxprice;	
									$icashdelivery++;
									
									}
									else if($orderRec->business[0]->paymethod->cash && $orderRec->buyer->deliveryType == "pickup" ) {
									$cashpickupCollection = $cashpickupCollection + $orderRec->total;	
									$cashpickupTips = $cashpickupTips + $orderDetails->tips;	
									$cashpickupShipping = $cashpickupShipping + $orderRec->business[0]->shipping;
									$cashpickupTax = $cashpickupTax + $orderDetails->taxprice;	
									$icashpickup++;
										
									}
	
								}
								else if($orderRec->business[0]->paymethod->card) {
								$orderDetails->paytype = "Card";
								$cardCollection = $cardCollection + $orderRec->total;
								$cardTips = $cardTips + $orderDetails->tips;
								$cardShipping = $cardShipping + $orderRec->business[0]->shipping;
								$cardTax = $cardTax + $orderDetails->taxprice;
								$icard++;
								
								}
								else if($orderRec->business[0]->paymethod->paypal) {
								$orderDetails->paytype = "Paypal";
								$paypalCollection = $paypalCollection + $orderRec->total;
								$paypalTips = $paypalTips + $orderDetails->tips;
								$paypalShipping = $paypalShipping + $orderRec->business[0]->shipping;
								$paypalTax = $paypalTax + $orderDetails->taxprice;
								$ipaypal++;
									
								}
								
								
								$orderDetails->deliverytype = $orderRec->buyer->deliveryType;
								
								$orderDetails->dishtotal = $dishtotal;	
								$orderDetails->grandtotal = $orderRec->total;
								$orderDetails->delcharge = $orderRec->business[0]->shipping;
								
								
								
								
								array_push($allorderhistory,$orderDetails);
						
						}
			
			$TotalDishCollection = $cashDeliveryCollection +$cashpickupCollection +$paypalCollection +$cardCollection;
			/**** FOR FIXED*****/
			$paypaltrandfixed = $row['transactionfeefixed']*$ipaypal;
			if($paypaltrandfixed=="0"){
				$ad->paypaltrandfixed ="-";	
			}else{
				$ad->paypaltrandfixed =GetDecimalPoint($paypaltrandfixed);	
			}
			$cardtrandfixed = $row['transactionfeefixed']*$icard;
			if($cardtrandfixed=="0"){
				$ad->cardtrandfixed ="-";	
			}else{
				$ad->cardtrandfixed =GetDecimalPoint($cardtrandfixed);	
			}
			$cashdtrandfixed = $row['transactionfeefixed']*$icashdelivery;
			if($cashdtrandfixed=="0"){
				$ad->cashdtrandfixed ="-";	
			}else{
				$ad->cashdtrandfixed =GetDecimalPoint($cashdtrandfixed);	
			}
			$cashptrandfixed = $row['transactionfeefixed']*$icashpickup;
			if($cashptrandfixed=="0"){
				$ad->cashptrandfixed ="-";	
			}else{
				$ad->cashptrandfixed =GetDecimalPoint($cashptrandfixed);	
			}
			$transfixedtotal = $paypaltrandfixed + $cardtrandfixed + $cashdtrandfixed + $cashptrandfixed;
			if($transfixedtotal=="0"){
				$ad->transfixedtotal ="-";	
			}else{
				$ad->transfixedtotal =GetDecimalPoint($transfixedtotal);	
			}
			
			$paypalservicefixed = $row['servicefeefixed']*$ipaypal;
			if($paypalservicefixed=="0"){
				$ad->paypalservicefixed ="-";	
			}else{
				$ad->paypalservicefixed =GetDecimalPoint($paypalservicefixed);	
			}
			$cardservicefixed = $row['servicefeefixed']*$icard;
			if($cardservicefixed=="0"){
				$ad->cardservicefixed ="-";	
			}else{
				$ad->cardservicefixed =GetDecimalPoint($cardservicefixed);	
			}
			$cashdservicefixed = $row['servicefeefixed']*$icashdelivery;
			if($cashdservicefixed=="0"){
				$ad->cashdservicefixed ="-";	
			}else{
				$ad->cashdservicefixed =GetDecimalPoint($cashdservicefixed);	
			}
			$cashpservicefixed = $row['servicefeefixed']*$icashpickup;
			if($cashpservicefixed=="0"){
				$ad->cashpservicefixed ="-";	
			}else{
				$ad->cashpservicefixed =GetDecimalPoint($cashpservicefixed);	
			}
			$servicefixedtotal = $paypalservicefixed + $cardservicefixed + $cashdservicefixed + $cashpservicefixed;
			if($servicefixedtotal=="0"){
				$ad->servicefixedtotal ="-";	
			}else{
				$ad->servicefixedtotal =GetDecimalPoint($servicefixedtotal);	
			}
			
			$paypalcardfeefixed = $row['cardfeesfixed']*$ipaypal;
			if($paypalcardfeefixed=="0"){
				$ad->paypalcardfeefixed ="-";	
			}else{
				$ad->paypalcardfeefixed =GetDecimalPoint($paypalcardfeefixed);	
			}
			$cardcardfeefixed = $row['cardfeesfixed']*$icard;
			if($cardcardfeefixed=="0"){
				$ad->cardcardfeefixed ="-";	
			}else{
				$ad->cardcardfeefixed =GetDecimalPoint($cardcardfeefixed);	
			}
			$cashdcardfeefixed = $row['cardfeesfixed']*$icashdelivery;
			if($cashdcardfeefixed=="0"){
				$ad->cashdcardfeefixed ="-";	
			}else{
				$ad->cashdcardfeefixed =GetDecimalPoint($cashdcardfeefixed);	
			}
			$cashpcardfeefixed = $row['cardfeesfixed']*$icashpickup;
			if($cashpcardfeefixed=="0"){
				$ad->cashpcardfeefixed ="-";	
			}else{
				$ad->cashpcardfeefixed =GetDecimalPoint($cashpcardfeefixed);	
			}
			$cardfixedtotal = $paypalcardfeefixed + $cardcardfeefixed + $cashdcardfeefixed + $cashpcardfeefixed;
			if($cardfixedtotal=="0"){
				$ad->cardfixedtotal ="-";	
			}else{
				$ad->cardfixedtotal =GetDecimalPoint($cardfixedtotal);	
			}
			
			
			
			
			/**** FOR FIXED*****/
			if($cashDeliveryCollection=="0") {
				$ad->cashDeliveryCollection ="-";
				}
			else {
				$ad->cashDeliveryCollection ="+". $cashDeliveryCollection;
				}
			
			if($cashDeliveryTips=="0") {
				$ad->cashDeliveryTips ="-";
				}
			else {
				$ad->cashDeliveryTips ="+". $cashDeliveryTips;
				}	
			if($cashDeliveryShipping=="0") {
				$ad->cashDeliveryShipping ="-";
				}
			else {
				$ad->cashDeliveryShipping ="+". $cashDeliveryShipping;
				}		
				
			if($cashpickupTips=="0") {
				$ad->cashpickupTips ="-";
				}
			else {
				$ad->cashpickupTips ="+". $cashpickupTips;
				}	
			if($cashpickupShipping=="0") {
				$ad->cashpickupShipping ="-";
				}
			else {
				$ad->cashpickupShipping ="+". $cashpickupShipping;
				}		
			if($paypalTips=="0") {
				$ad->paypalTips ="-";
				}
			else {
				$ad->paypalTips ="+". $paypalTips;
				}	
			if($paypalShipping=="0") {
				$ad->paypalShipping ="-";
				}
			else {
				$ad->paypalShipping ="+". $paypalShipping;
				}		
			
			if($cardTips=="0") {
				$ad->cardTips ="-";
				}
			else {
				$ad->cardTips ="+". $cardTips;
				}	
			if($cardShipping=="0") {
				$ad->cardShipping ="-";
				}
			else {
				$ad->cardShipping ="+". $cardShipping;
				}			
				
				
			if($cashDeliveryTax=="0") {
				$ad->cashDeliveryTax ="-";
				}
			else {
				$ad->cashDeliveryTax ="+". $cashDeliveryTax;
				}		
			if($cashpickupTax=="0") {
				$ad->cashpickupTax ="-";
				}
			else {
				$ad->cashpickupTax ="+". $cashpickupTax;
				}	
			if($paypalTax=="0") {
				$ad->paypalTax ="-";
				}
			else {
				$ad->paypalTax ="+". $paypalTax;
				}	
			if($cardTax=="0") {
				$ad->cardTax ="-";
				}
			else {
				$ad->cardTax ="+". $cardTax;
				}
				
				$paypalsubtotal = ($paypalCollection - ($paypalTax + $paypalTips + $paypalShipping));
				if($paypalsubtotal=="0"){
				$ad->paypalsubtotal ="-";	
				}else{
				$ad->paypalsubtotal ="+". $paypalsubtotal;	
				}
				$cardsubtotal = ($cardCollection - ($cardTax + $cardTips + $cardShipping));	
				if($cardsubtotal=="0"){
				$ad->cardsubtotal ="-";	
				}else{
				$ad->cardsubtotal ="+". $cardsubtotal;	
				}
				$cashdeliverysubtotal = ($cashDeliveryCollection - ($cashDeliveryTax + $cashDeliveryTips + $cashDeliveryShipping));
				if($cashdeliverysubtotal=="0"){
				$ad->cashdeliverysubtotal ="-";	
				}else{
				$ad->cashdeliverysubtotal ="+". $cashdeliverysubtotal;	
				}
				$cashpickupsubtotal = ($cashpickupCollection - ($cashpickupTax + $cashpickupTips + $cashpickupShipping));
				if($cashpickupsubtotal=="0"){
				$ad->cashpickupsubtotal ="-";	
				}else{
				$ad->cashpickupsubtotal ="+". $cashpickupsubtotal;	
				}			
			
			
			
			if($cashpickupCollection=="0") {
				$ad->cashpickupCollection ="-";
				}
			else {
				$ad->cashpickupCollection ="+". $cashpickupCollection;
				}		
			
			
			if($paypalCollection=="0") {
				$ad->paypalCollection ="-";
				}
			else {
				$ad->paypalCollection ="+". $paypalCollection;
				}		
			if($cardCollection=="0") {
				$ad->cardCollection ="-";
				}
			else {
				$ad->cardCollection ="+". $cardCollection;
				}	
				
		     $totalTips = $cashDeliveryTips +$cashpickupTips +$paypalTips +$cardTips;
			 $totalShipping = $cashDeliveryShipping +$cashpickupShipping +$paypalShipping +$cardShipping;
			  $TotalDishTax = $cashDeliveryTax +$cashpickupTax +$paypalTax +$cardTax;
			  
			  $dishsubtotal = ($TotalDishCollection - ($TotalDishTax + $totalTips + $totalShipping));
			  if($dishsubtotal=="0") {
				$ad->dishsubtotal ="-";
				}
			else {
				$ad->dishsubtotal ="+". $dishsubtotal;
				}
			  
			  /************ Transaction Percent*******************************/
			
			$paytp = round(($paypalCollection*$row['transactionfeepercent']/100),$_SESSION['decimal_value']);
			$cardtp = round(($cardCollection*$row['transactionfeepercent']/100),$_SESSION['decimal_value']);
			$deliverytp = round(($cashDeliveryCollection*$row['transactionfeepercent']/100),$_SESSION['decimal_value']);
			$picuptp = round(($cashpickupCollection*$row['transactionfeepercent']/100),$_SESSION['decimal_value']);
			$dishtp = round(($TotalDishCollection*$row['transactionfeepercent']/100),$_SESSION['decimal_value']);
			if($paytp=="0"){
			$ad->paypaltotaltranspercent = "-";
			}else{
			$ad->paypaltotaltranspercent = $paytp;	
			}
			
			if($cardtp=="0"){
			$ad->cardtotaltranspercent = "-";
			}else{
			$ad->cardtotaltranspercent = $cardtp;	
			}
			
			if($deliverytp=="0"){
			$ad->deliverytotaltranspercent = "-";
			}else{
			$ad->deliverytotaltranspercent = $deliverytp;	
			}
			
			if($picuptp=="0"){
			$ad->pickuptotaltranspercent = "-";
			}else{
			$ad->pickuptotaltranspercent = $picuptp;	
			}
			
			if($dishtp=="0"){
			$ad->dishtotaltranspercent = "-";
			}else{
			$ad->dishtotaltranspercent = $dishtp;	
			}
			/************ Transaction Percent*******************************/
			/************ Service Fee Percent*******************************/
			
			$paysp = round(($paypalCollection*$row['servicefeeparcent']/100),$_SESSION['decimal_value']);
			$cardsp = round(($cardCollection*$row['servicefeeparcent']/100),$_SESSION['decimal_value']);
			$deliverysp = round(($cashDeliveryCollection*$row['servicefeeparcent']/100),$_SESSION['decimal_value']);
			$picupsp = round(($cashpickupCollection*$row['servicefeeparcent']/100),$_SESSION['decimal_value']);
			$dishsp = round(($TotalDishCollection*$row['servicefeeparcent']/100),$_SESSION['decimal_value']);
			if($paysp=="0"){
			$ad->paypaltotalservicepercent = "-";
			}else{
			$ad->paypaltotalservicepercent = $paysp;	
			}
			
			if($cardsp=="0"){
			$ad->cardtotalservicepercent = "-";
			}else{
			$ad->cardtotalservicepercent = $cardsp;	
			}
			
			if($deliverysp=="0"){
			$ad->deliverytotalservicepercent= "-";
			}else{
			$ad->deliverytotalservicepercent = $deliverysp;	
			}
			
			if($picupsp=="0"){
			$ad->pickuptotalservicepercent = "-";
			}else{
			$ad->pickuptotalservicepercent = $picupsp;	
			}
			
			if($dishsp=="0"){
			$ad->dishtotalservicepercent = "-";
			}else{
			$ad->dishtotalservicepercent = $dishsp;	
			}
			/************ Service Fee Percent********************************/
			/************ Card Fee Percent*******************************/
			
			$paycp = round(($paypalCollection*$row['cardfeespercent']/100),$_SESSION['decimal_value']);
			$cardcp = round(($cardCollection*$row['cardfeespercent']/100),$_SESSION['decimal_value']);
			$deliverycp = round(($cashDeliveryCollection*$row['cardfeespercent']/100),$_SESSION['decimal_value']);
			$picupcp = round(($cashpickupCollection*$row['cardfeespercent']/100),$_SESSION['decimal_value']);
			$dishcp = round(($TotalDishCollection*$row['cardfeespercent']/100),$_SESSION['decimal_value']);
			if($paycp=="0"){
			$ad->paypaltotalcardpercent = "-";
			}else{
			$ad->paypaltotalcardpercent = $paycp;	
			}
			
			if($cardcp=="0"){
			$ad->cardtotalcardpercent = "-";
			}else{
			$ad->cardtotalcardpercent = $cardcp;	
			}
			
			if($deliverycp=="0"){
			$ad->deliverytotalcardpercent= "-";
			}else{
			$ad->deliverytotalcardpercent = $deliverycp;	
			}
			
			if($picupcp=="0"){
			$ad->pickuptotalcardpercent = "-";
			}else{
			$ad->pickuptotalcardpercent = $picupcp;	
			}
			
			if($dishcp=="0"){
			$ad->dishtotalcardpercent = "-";
			}else{
			$ad->dishtotalcardpercent = $dishcp;	
			}
			/************ Card Fee Percent********************************/
			/************ Marketing Budget*******************************/
			
			$paymb = round(($paypalCollection*$row['marketingbudgetpercent']/100),$_SESSION['decimal_value']);
			$cardmb = round(($cardCollection*$row['marketingbudgetpercent']/100),$_SESSION['decimal_value']);
			$deliverymb = round(($cashDeliveryCollection*$row['marketingbudgetpercent']/100),$_SESSION['decimal_value']);
			$picupmb = round(($cashpickupCollection*$row['marketingbudgetpercent']/100),$_SESSION['decimal_value']);
			$dishmb = round(($TotalDishCollection*$row['marketingbudgetpercent']/100),$_SESSION['decimal_value']);
			if($paymb=="0"){
			$ad->paypaltotalmarketbudget = "-";
			}else{
			$ad->paypaltotalmarketbudget = $paymb;	
			}
			
			if($cardmb=="0"){
			$ad->cardtotalmarketbudget = "-";
			}else{
			$ad->cardtotalmarketbudget = $cardmb;	
			}
			
			if($deliverymb=="0"){
			$ad->deliverytotalmarketbudget= "-";
			}else{
			$ad->deliverytotalmarketbudget = $deliverymb;	
			}
			
			if($picupmb=="0"){
			$ad->pickuptotalmarketbudget = "-";
			}else{
			$ad->pickuptotalmarketbudget = $picupmb;	
			}
			
			if($dishmb=="0"){
			$ad->dishtotalmarketbudget = "-";
			}else{
			$ad->dishtotalmarketbudget = $dishmb;	
			}
			/************ Marketing Budget********************************/
			
			/************ Sales Commission*******************************/
			
			$paycom = round(($paypalCollection*$row['perordercommission']/100),$_SESSION['decimal_value']);
			$cardcom = round(($cardCollection*$row['perordercommission']/100),$_SESSION['decimal_value']);
			$deliverycom = round(($cashDeliveryCollection*$row['perordercommission']/100),$_SESSION['decimal_value']);
			$picupcom = round(($cashpickupCollection*$row['perordercommission']/100),$_SESSION['decimal_value']);
			$dishcom = round(($TotalDishCollection*$row['perordercommission']/100),$_SESSION['decimal_value']);
			if($paycom=="0"){
			$ad->paypaltotalcommission = "-";
			}else{
			$ad->paypaltotalcommission = $paycom;	
			}
			
			if($cardcom=="0"){
			$ad->cardtotalcommission = "-";
			}else{
			$ad->cardtotalcommission = $cardcom;	
			}
			
			if($deliverycom=="0"){
			$ad->deliverytotalcommission = "-";
			}else{
			$ad->deliverytotalcommission = $deliverycom;	
			}
			
			if($picupcom=="0"){
			$ad->pickuptotalcommission = "-";
			}else{
			$ad->pickuptotalcommission = $picupcom;	
			}
			
			if($dishcom=="0"){
			$ad->dishtotalcommission = "-";
			}else{
			$ad->dishtotalcommission = $dishcom;	
			}
			/************ Sales Commission*******************************/
			 
			$ad->TotalDishTax = $TotalDishTax;	
			$ad->dishcollection = $TotalDishCollection;			
			$ad->orderhistory = $allorderhistory;
			$ad->resturant = $row['resturant'];
			$ad->status = $row['status'];
			$ad->admin_comment = $row['admin_comment'];
			$ad->comment = $row['comment'];
			$ad->total_invoice = $row['total_invoice'];
			$businessi = $row['businessi'];
			$ad->billing = $row['billing'];
			$ad->setuprate = $row['setuprate'];
			$ad->fixedrate = $row['fixedrate'];
			
			
			if($row['transactionfeepercent']=="0"){
			$ad->transactionfeepercent = "-";
			}else{
			$ad->transactionfeepercent = $row['transactionfeepercent']."% -";	
			}
			
			if($row['servicefeeparcent']=="0"){
			$ad->servicefeeparcent = "-";
			}else{
			$ad->servicefeeparcent = $row['servicefeeparcent']."% -";	
			}
			if($row['cardfeespercent']=="0"){
			$ad->cardfeespercent = "-";
			}else{
			$ad->cardfeespercent = $row['cardfeespercent']."% -";	
			} 
			if($row['marketingbudgetpercent']=="0"){
			$ad->marketingbudgetpercent = "-";
			}else{
			$ad->marketingbudgetpercent = $row['marketingbudgetpercent']."% -";	
			}
			
			$ad->monthlyservicefee	=round($row['monthlyservicefee'],$_SESSION['decimal_value']);
			$ad->licensinghostingfee =round($row['licensinghostingfee'],$_SESSION['decimal_value']);
			$ad->perordercommission = $row['perordercommission'];	
			$ad->perorderfixedrate = $row['perorderfixedrate'];
			$ad->vat = $row['vat'];
			$ad->otherrate = $row['otherrate'];
			$ad->dfrm =date("d-m-Y", strtotime($row['dfrm']));
			$ad->dto = date("d-m-Y", strtotime($row['tfrm']));
			$ad->periodp = date("d-m-Y", strtotime($row['dfrm'])). ' To ' . date("d-m-Y", strtotime($row['tfrm']));
			$ad->totalorder = $row['totalorder'];
			$ad->totalTips = $totalTips;
			$ad->totalShipping = $totalShipping;
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
			$ad->totalpay =round($ad->totalpay, $_SESSION['decimal_value']);

	return $ad;
	
		}


function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}
function parse($val) {
	
	return json_decode($val);
	
	}	
/*require('panel-main.php');
require_once('../login/common.php');*/


//edit*		------------



require('../config.php');
	$link = ConnectDB($CFG);
	$invoiceHis = FetchInvoiceDataForPdf($id,$link );
	

	pg_prepare($link,'sqlsp','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sqlsp',array($id));

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


			pg_prepare($link,'sqldin3',"SELECT street,colony,vatregistration,tel FROM w_business where id=$businessi ORDER BY id DESC");
			$fetch_busi = pg_execute($link,'sqldin3',array());
			$rsb = pg_fetch_array($fetch_busi);
			$ad->streetb = $rsb['street'];
			$ad->colonyb = $rsb['colony'];
			$ad->telb = $rsb['tel'];
			$ad->vatregistration = $rsb['vatregistration'];
			}
			unset($result);
			unset($row);

			$incid=1;
			pg_prepare($link,'sqlin1','SELECT * FROM w_invoiceconf WHERE id=$1');
			$result = pg_execute($link,'sqlin1',array($incid));
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

			pg_prepare($link,'sqlinmp','SELECT * FROM w_makepayment WHERE invoice_id=$1');
			$result5= pg_execute($link,'sqlinmp',array($id));

			pg_prepare($link,'sqlermpt','SELECT * FROM w_makepayment WHERE invoice_id=$1');
			$result9= pg_execute($link,'sqlermpt',array($id));



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
			$ad->totalbalance =round($ad->totalbalance, 2);


			$ad->totalinvoicedue = 0;
			pg_prepare($link,'sqlmpb1','SELECT * FROM w_makepayment WHERE business_id=$1 and invoice_id != $2');
			$result2 = pg_execute($link,'sqlmpb1',array($businessi,$id));
			if (pg_num_rows($result2)!= 0){
				while($row2 = pg_fetch_array($result2)){
					$ad->totalinvoicedue = $ad->totalinvoicedue + $row2['pdue'];
				}
			}
			$ad->totalpay = $ad->totalbalance + $ad->totalinvoicedue;
			
			//echo "<pre>";
			//print_r($invoiceHis);		//edit#
			
//edit*		------------			

$html_1 =' <html><body> ';

$html_1 .='<div align="center">

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
$html_1 .='<img src="../images/logo/1/normal.jpg" height="50">';
}else{
$html_1 .='<img src="../images/dummy/dummy_adbig.jpg" >';
}
$html_1 .='</td>
		</tr>
     </table>
	<table width="100%">
	<tr>
	<td width="49%">
		<strong><font size="+1">'.$ad->resturant.'</font></strong><br>
		<strong><font size="+1"></font>'.$ad->streetb.'</strong><br>
		<strong><font size="+1"></font>'.$ad->colonyb.'</strong><br>
       <strong>'.$lang_resource['INVOICE_PHONE'].' :</strong>'.$ad->telb.'<br>
      </td>
	  
	<td width="49%" align="right">
	
        	'.$ad->address.'<br>
            '.$ad->phone.'<br>
          '. $ad->wbmail.'<br>
          '.$ad->wurl.'<br>
            '.$ad->vatregistration.'<br>
			
			
		</td>
		
		</tr>
		</table>';

$html_1 .=' <div style="margin:10px 0 0 0; line-height:17px; float:left; width:100%;"> ';	

$html_1 .=' <table width="100%" cellspacing="0" border="0" class="invoiceClass" style="background-color:;border: 1px solid #000; color:#000 ">	<tbody> ';

$html_1 .=' <tr class="grey_row">
<td width="20%" align="left" style="border-bottom:2px solid #000;font-weight:bold;line-height: 2;font-size: 14px;">Sales</td><td width="12%" align="center" style="border-bottom:2px solid #000; font-weight:bold;line-height: 2;font-size: 14px;">Order#</td><td width="12%" align="center" style="border-bottom:2px solid #000; font-weight:bold;line-height: 2;font-size: 14px;">Paypal</td><td width="15%" align="center" style="border-bottom:2px solid #000; font-weight:bold;line-height: 2;font-size: 14px;">Credit Card</td><td width="15%" align="center" style="border-bottom:2px solid #000; font-weight:bold;line-height: 2;font-size: 14px;">Cash Delivery</td><td width="14%" align="center" style="border-bottom:2px solid #000; font-weight:bold;line-height: 2;font-size: 14px;">Cash T-Out</td><td width="12%" align="center" style="border-bottom:2px solid #000; font-weight:bold;line-height: 2;font-size: 14px;">Totals</td>
</tr> ';

    foreach($invoiceHis->orderhistory as $invoice) {
$html_1 .=' <tr class="grey_row">
<td align="left" style="border-bottom:1px solid #000;font-weight:bold;">'.$invoice->orderdate.'</td><td align="center" style="border-bottom:1px solid #000;font-weight:bold;">'.$invoice->orderid.'</td>';

if($invoice->paytype == "Paypal") {
		$html_1 .=' <td align="center" style="border-bottom:1px solid #000;">'.$invoice->grandtotal.'</td>';
}
else{
	
	$html_1 .=' <td align="center" style="border-bottom:1px solid #000;">-</td>';
}
//============
if($invoice->paytype == "Card" ) {
		$html_1 .='<td align="center" style="border-bottom:1px solid #000;">'.$invoice->grandtotal.'</td>';
}
else{
	
	$html_1 .='<td align="center" style="border-bottom:1px solid #000;">-</td>';
}
//$html_1 .=' <td align="center" style="border-bottom:1px solid #000;">'.$invoice->grandtotal.'</td>';
if($invoice->paytype == "Cash" && $invoice->deliverytype == "delivery"  ) {
		$html_1 .='<td align="center" style="border-bottom:1px solid #000;">'.$invoice->grandtotal.'</td>';
}
else{
	
	$html_1 .='<td align="center" style="border-bottom:1px solid #000;">-</td>';
}

// $html_1 .='<td align="center" style="border-bottom:1px solid #000;">'.$invoice->grandtotal.'</td>';
if($invoice->paytype == "Cash" && $invoice->deliverytype == "pickup"  ) {
		$html_1 .='<td align="center" style="border-bottom:1px solid #000;">'.$invoice->grandtotal.'</td>';
}
else{
	
	$html_1 .='<td align="center" style="border-bottom:1px solid #000;">-</td>';
}

$html_1 .='<td align="center" style="border-bottom:1px solid #000;">&nbsp;</td>	</tr> ';

}
$html_1 .='<tr style="color: #236406;"><td valign="top" align="left" style="border-bottom:2px solid #000; border-top:1px solid #000;font-weight:bold;line-height: 2;font-size: 14px;" colspan="2"><p>Totals</p><p></p><p>Sub Totals</p><p>Sales Tax</p><p>Tips</p><p>Delivery Fees</p></td><td valign="top" align="center" style="border-bottom:2px solid #000; border-top:1px solid #000; line-height: 2;" class="td_height"><p>'.$invoiceHis->paypalCollection.'</p><p>'.$invoiceHis->paypalsubtotal.'</p><p>'.$invoiceHis->paypalTax.'</p><p>'.$invoiceHis->paypalTips.'</p><p>'.$invoiceHis->paypalShipping.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000; border-top:1px solid #000; line-height: 2;" class="td_height"><p>'.$invoiceHis->cardCollection.'</p><p>'.$invoiceHis->cardsubtotal.'</p><p>'.$invoiceHis->cardTax.'</p><p>'.$invoiceHis->cardTips.'</p><p>'.$invoiceHis->cardShipping.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000; border-top:1px solid #000; line-height: 2;" class="td_height"><p>'.$invoiceHis->cashDeliveryCollection.'</p><p>'.$invoiceHis->cashdeliverysubtotal.'</p><p>'.$invoiceHis->cashDeliveryTax.'</p><p>'.$invoiceHis->cashDeliveryTips.'</p><p>'.$invoiceHis->cashDeliveryShipping.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000; border-top:1px solid #000; line-height: 2;" class="td_height"><p>'.$invoiceHis->cashpickupCollection.'</p><p>'.$invoiceHis->cashpickupsubtotal.'</p><p>'.$invoiceHis->cashpickupTax.'</p><p>'.$invoiceHis->cashpickupTips.'</p><p>'.$invoiceHis->cashpickupShipping.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000; border-top:1px solid #000; line-height: 2;" class="td_height"><p><b>'.$invoiceHis->dishcollection.'</b></p><p><b>'.$invoiceHis->dishsubtotal.'</b></p><p><b>'.$invoiceHis->TotalDishTax.'</b></p><p><b>'.$invoiceHis->totalTips.'</b></p><p><b>'.$invoiceHis->totalShipping.'</b></p></td>
</tr> ';

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Transaction Fee 10% -</p><p></p><p>Transaction Fee Fixed -</p><p>(Collected from Restaurant)</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->paypaltotaltranspercent.'</p><p>'.$invoiceHis->paypaltrandfixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->cardtotaltranspercent.'</p><p>'.$invoiceHis->cardtrandfixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->deliverytotaltranspercent.'</p><p>'.$invoiceHis->cashdtrandfixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->pickuptotaltranspercent.'</p><p>'.$invoiceHis->cashptrandfixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->dishtotaltranspercent.'</p><p>'.$invoiceHis->transfixedtotal.'</p></td></tr> ';

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Service Fee 11% -</p><p></p><p>Service Fee Fixed -</p><p>(Collected from Customer)</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->paypaltotalservicepercent.'</p><p>'.$invoiceHis->paypalservicefixed.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->cardtotalservicepercent.'</p><p>'.$invoiceHis->cardservicefixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->deliverytotalservicepercent.'</p><p>'.$invoiceHis->cashdservicefixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->pickuptotalservicepercent.'</p><p>'.$invoiceHis->cashpservicefixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->dishtotalservicepercent.'</p><p>'.$invoiceHis->servicefixedtotal.'</p></td></tr> ';

//---

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Crad Fees 12% -</p><p></p><p>Crad Fees Fixed -</p><p>(Collected from Restaurant off total amount)</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->paypaltotalcardpercent.'</p><p>'.$invoiceHis->paypalcardfeefixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->cardtotalcardpercent.'</p><p>'.$invoiceHis->cardcardfeefixed.'</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>&nbsp</p><p>&nbsp</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>&nbsp</p><p>&nbsp</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"><p>'.$invoiceHis->dishtotalcardpercent.'</p><p>'.$invoiceHis->cardfixedtotal.'</p></td>
</tr>';	




//---

$html_1 .=' <tr>
<td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2">

Marketing Budget '.$invoiceHis->marketingbudgetpercent.' 
</br>Marketing Budget - 
</br>Marketing Budget (Monthly)-
</br>Miscellaneous Expense -</br>

</td>
<td valign="top" align="center" style="border-bottom:2px solid #000;">
'.$invoiceHis->paypaltotalmarketbudget.'
</td>
<td valign="top" align="center" style="border-bottom:2px solid #000;">
'.$invoiceHis->cardtotalmarketbudget.'
</td>
<td valign="top" align="center" style="border-bottom:2px solid #000;">
'.$invoiceHis->deliverytotalmarketbudget.'
</td>
<td valign="top" align="center" style="border-bottom:2px solid #000;">
'.$invoiceHis->pickuptotalmarketbudget.'
</td>
<td valign="top" align="center" style="border-bottom:2px solid #000;">
'.$invoiceHis->dishtotalmarketbudget.'
</td>
</tr>';
//////////
$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Monthly Service Fee - </p><p></p><p>Licensing Hosting Fee - </p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td>
<td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.GetDecimalPoint($invoiceHis->monthlyservicefee).'</p><p>'.GetDecimalPoint($invoiceHis->monthlyservicefee).'</p>
</td>
</tr>';

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Sales commission 5% -</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->paypaltotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->cardtotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;"
<p>'.$invoiceHis->deliverytotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->pickuptotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->dishtotalcommission.'</p>
</td>
</tr>';

//---

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Monthly Service Fee - </p><p></p><p>Licensing Hosting Fee - </p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td>
<td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.GetDecimalPoint($invoiceHis->monthlyservicefee).'</p><p>'.GetDecimalPoint($invoiceHis->monthlyservicefee).'</p>
</td>
</tr>';

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Sales commission 5% -</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->paypaltotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->cardtotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;"
<p>'.$invoiceHis->deliverytotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->pickuptotalcommission.'</p>
</td><td valign="top" align="center" style="border-bottom:2px solid #000;">
<p>'.$invoiceHis->dishtotalcommission.'</p>
</td>
</tr>';

$html_1 .=' <tr><td valign="top" align="left" style="border-bottom:2px solid #000;font-weight:bold;font-size: 14px;" colspan="2"><p>Cancelled Orders -</p><p>Card charge Back -</p><p>Paypal charge Back  -</p><p>Cash charge Back -</p></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td><td valign="top" align="center" style="border-bottom:2px solid #000;"></td></tr> ';



$html_1 .=' </tbody>	</table> ';	// table & tbody   end

$html_1 .=' </div> ';	// div style margin:10px  end

$html_1 .=' </div> ';	// div style width 90%  end
$html_1 .=' </div> ';	

 $html_1 .=' </body></html>';

//	------------  ++++++++  ----------



//edit*		------------  ++++++++  ----------




include("../payment-gateway/pdf/dompdf_config.inc.php");

$dompdf = new DOMPDF();

$dompdf->load_html($html_1);

$dompdf->render();
$dompdf->set_paper("A3","portrait");

$date=date("Y-m-d H:i:s");
$file_name=$fetch->invo;
$pdf = $dompdf->output();
$output = $dompdf->output();

/************************pdf create end**********************************/

/***********************************save the pdf file***************************************/

$path='savepdf/'.$ad->resturant.'-'.$ad->date.'-invoice.pdf';
file_put_contents($path, $output);

/***********************************prepared for sending mail***************************************/

//get 'from' for email
$b='sitename';
pg_prepare($link,'sqlmail','SELECT * FROM w_configs where name=$1');
$resultmail = pg_execute($link,'sqlmail',array($b));
$row1 = pg_fetch_array($resultmail);


//get 'fromname' for email
$c='sitename';
pg_prepare($link,'sqlsite','SELECT * FROM w_configs WHERE name=$1');
$sitetmail = pg_execute($link,'sqlsite',array($c));
$row3 = pg_fetch_array($sitetmail);

//get 'superadmin' mail address
$a=1;
pg_prepare($link,'sqlmail2','SELECT * FROM w_users WHERE id=$1');
$resultmail2 = pg_execute($link,'sqlmail2',array($a));
$row2 = pg_fetch_array($resultmail2);



	require "class.phpmailer.php";
	$addresses = array();
	
	 array_push($addresses,$ad->wbmail);
	 array_push($addresses,$row2['email']);
		
	$mail = new PHPMailer();
	$mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = $row1['value'];
	$mail->FromName = $row3['value'];
   // $mail->Subject =  'hello';
   
/*	 foreach ($addresses as $address)
    	$mail->AddAddress($address);
 
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
	$mail->AddAttachment($path);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();*/
/***********end mail send******************/	
$dompdf->stream($file_name."invoice.pdf");


?>
