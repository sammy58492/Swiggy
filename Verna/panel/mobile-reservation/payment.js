var Payment = {
	AllpaymentButton: function ()
    {
		$(window).scrollTop(20)
if (!Shopping.CanPlaceOrder())
			{
				return 
			}
	var hd = "";
		hd +='<div class="main">';
    	hd +='<div class="header-grey">';
        hd +='<div class="header_top">';
        hd +='<div class="wrapp">';
        hd +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="javascript:Shopping.OpenCartCheck()">< <?=$lang_resource['MOBILE_PAYMENT_BACK']?></button></div>';
        hd +='<div class="center_heading">&nbsp;</div>';
        hd +='<div class="left_btn_dv pull_right"><button type="button" class="red-link-btn" onclick="Shopping.changeDelType(3)"><?=$lang_resource['MOBILE_PAYMENT_BUSINESS']?></button></div>';
         hd +='</div>';
         hd +='</div>';
         hd +='<div class="wrapp">';
         hd +='<center><span class="ch_heading"><?=$lang_resource['MOBILE_PAYMENT_PAYMENT_METHOD']?></span></center>';
         hd +='</div>';
      	 hd +='</div>';
		 hd +='<div class="blank-top"></div>'
    	 hd +='</div>';
		 	document.getElementById("headerSearch").innerHTML = hd;
			
			
		
		var b = "";		
		b +='<div class="main wrapp">';
			
		b +='</div>';
		b +='<div class=" main bg-white" style="padding: 10px 0px 15px 0px;">';
		b +='<div class="wrapp">';
		b +=Payment.commonFieldPaymentGateway();
		
		b +='<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:10px;">';
		var cnt =1;
		 var paymentlength = 0;
		for(var pay in Shopping.Cart.business[0].paymethoddetails){
			if(Shopping.Cart.business[0].paymethoddetails[pay]){
				paymentlength++;
			}
		}
		
		
		for(var pay in Shopping.Cart.business[0].paymethoddetails){			
			if(Shopping.Cart.business[0].paymethoddetails[pay]){
				if(paymentlength == 1){
					var radiochecked = 'CHECKED';
				}else{
					var radiochecked = '';
				}
				switch (pay){
					case 'cash':
						var paymentlanguage = '<?= $lang_resource['CASH_DELIVERY'] ?>';
					break;
					case 'card':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_CC_WITH_MOBILE_TERMINA'] ?>';
					break;
					case 'paypal':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYPAL_CREDIT_CARD'] ?>';
					break;
					case 'paypaladaptive':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_ADAPTIVE_ON_DELIVERY'] ?>';
					break;
					case 'authorize':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_AUTHORIZE_ON_DELIVERY'] ?>';
					break;
					case 'braintree':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY'] ?>';
					break;
					case 'mercury':
						var paymentlanguage = '<?= $lang_resource['MERCURY_PAYMENT_HEADER'] ?>';
					break;
					case 'worldpay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'] ?>';
					break;
					case 'mercadopago':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_MERCADO_PAGO'] ?>';
					break;
					case 'transactium':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_TRANSACTIUM_PAY'] ?>';
					break;
					case 'pexpress':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PEXPRESS_PAY'] ?>';
					break;
					case 'maksekeskus':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_MAKSEKSEKUS_PAY'] ?>';
					break;
					case 'voguepay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_VOGUEPAY_PAY'] ?>';
					break;
					case 'skrill':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_SKRILL_PAY'] ?>';
					break;
					case 'payu':
					//alert("ok");
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYU_PAY'] ?>';
					break;
					case 'stripe':
					//alert("ok");
						var paymentlanguage = '<?= $lang_resource['PAYMENT_STRIPE_PAY'] ?>';
					break;
					case 'paypalpro':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYPALPRO_PAY'] ?>';
					break;
					case 'paygistix':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYGISTIX_PAY'] ?>';
					break;
					case 'global':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_GLOBAL_PAY'] ?>';
					break;
					case 'btrans':
						var paymentlanguage = '<?= $lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_BTRANS'] ?>';
					break;
					case 'bsa':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_BSA_PAY'] ?>';
					break;
					case 'azul':
						var paymentlanguage = '<?= $lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_AZUL'] ?>';
					break;
					case 'quickpay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_QUICK_PAY'] ?>';
					break;
					case 'paynl':
						var paymentlanguage = '<?= $lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_PAYNL'] ?>';
					break;
					case 'zaakpay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_ZAAKPAY_PAY'] ?>';
					break;

				}
				if(cnt %2 == 1){
			  	b +='<tr>';   
			   	}
				
				b +='<td align="center">';
				b +='<div class="checkout">';
				b +='<div class="checkout_radio"><input type="radio" name="checkbox" '+radiochecked+' id="paymethod-'+pay+'-check" onclick="Payment.BusinessPaymentUpdate(\''+pay+'\',0)" class="css-checkbox" ><label for="paymethod-'+pay+'-check" class="css-label">&nbsp;</label>';
				b +='</div>';
				b +='<span class="checkout_label">'+paymentlanguage+'</span><span class="checkout_logo"><img src="images/step4-checkout/paymethod/'+pay+'.png"></span>';
				b +='</div>'
				b +='</td>';
				if(cnt %2 == 0){
			  	b +='</tr>';
			  	}

				cnt = cnt + 1; 
				
				
				}
			}	
		
		b +=' </table>';
		
		
		
		
		b +='<button type="button" class="btn-red" id="bottom-order-btn" onclick="Shopping.PlaceOrder()"><?=$lang_resource['MOBILE_PAYMENT_ORDER_NOW']?></button>';
		b +='</div>';
		b +='</div>';
		
		document.getElementById("shoppingbox").innerHTML = b;
		
		if(paymentlength == 1){
			for(var pay in Shopping.Cart.business[0].paymethoddetails){
				if(Shopping.Cart.business[0].paymethoddetails[pay]){
					Payment.BusinessPaymentUpdate(pay,0)
				}
			}				
		}
	 },
	 
	 
ReservatioPayment : function(){
		  	var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		  
			var hd ='<div class="main">';
			hd +='<div class="header-grey">';
			hd +='<div class="header_top">';
			hd +='<div class="wrapp">';
			hd +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="RestMenuList.PrintBusinessAndDishes(true)">< <?=$lang_resource['MOBILE_PAYMENT_BACK']?></button></div>';
			
			hd +='<div class="left_btn_dv pull_right"><button type="button" class="red-link-btn cart-btn" onclick="Shopping.OpenCartCheck()"><img src="images/step4-checkout/cart-icon_mob.png"></button></div>';
			
			hd +='</div>';
			hd +='</div>';
			hd +='<div class="wrapp">';
			hd +='<div class="left_btn_dv" style="margin-top:7px;"></div>';   
			
			hd +='<div class="left_btn_dv pull_right"></div>';
			
			hd +='</div>';
			hd +='</div>';
			
			hd +='<div class="blank-top"></div>'
			
			hd +='</div>';
			document.getElementById("headerSearch").innerHTML = hd;
			
			var rcnt =1;	
			var b = "";		
			b +='<div class="main wrapp">';
			
			b +='</div>';
			b +='<div class=" main bg-white" style="padding: 10px 0px 15px 0px;">';
			b +='<div class="wrapp">';
			b +='<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:10px;">';
			var repaymentlength = 0;
			for(var reservpay in Shopping.Cart.reservepaymethoddetails){
			if(Shopping.Cart.reservepaymethoddetails[reservpay]){
				repaymentlength++;
			}
		}
			
			for(var reservpay in Shopping.Cart.reservepaymethoddetails){			
			if(Shopping.Cart.reservepaymethoddetails[reservpay]){
				if(repaymentlength == 1){
					var radiochecked = 'CHECKED';
				}else{
					var radiochecked = '';
				}
				
				switch (reservpay){
					case 'cash':
						var paymentlanguage = '<?= $lang_resource['CASH_DELIVERY'] ?>';
					break;
					case 'card':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_CC_WITH_MOBILE_TERMINA'] ?>';
					break;
					case 'paypal':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYPAL_CREDIT_CARD'] ?>';
					break;
					case 'paypaladaptive':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_ADAPTIVE_ON_DELIVERY'] ?>';
					break;
					case 'authorize':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_AUTHORIZE_ON_DELIVERY'] ?>';
					break;
					case 'braintree':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY'] ?>';
					break;
					case 'mercury':
						var paymentlanguage = '<?= $lang_resource['MERCURY_PAYMENT_HEADER'] ?>';
					break;
					case 'worldpay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'] ?>';
					break;
					case 'mercadopago':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_MERCADO_PAGO'] ?>';
					break;
					case 'transactium':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_TRANSACTIUM_PAY'] ?>';
					break;
					case 'pexpress':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PEXPRESS_PAY'] ?>';
					break;
					case 'maksekeskus':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_MAKSEKSEKUS_PAY'] ?>';
					break;
					case 'voguepay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_VOGUEPAY_PAY'] ?>';
					break;
					case 'skrill':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_SKRILL_PAY'] ?>';
					break;
					case 'payeezy':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYEEZY_PAY'] ?>';
					break;
					case 'payu':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYU_PAY'] ?>';
					break;
					case 'stripe':
					//alert("ok");
						var paymentlanguage = '<?= $lang_resource['PAYMENT_STRIPE_PAY'] ?>';
					break;
					case 'paypalpro':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYPALPRO_PAY'] ?>';
					break;
					case 'paygistix':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYGISTIX_PAY'] ?>';
					break;
					case 'global':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_GLOBAL_PAY'] ?>';
					break;
					case 'btrans':
						var paymentlanguage = '<?= $lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_BTRANS'] ?>';
					break;
					case 'bsa':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_BSA_PAY'] ?>';
					break;
					case 'azul':
						var paymentlanguage = '<?= $lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_AZUL'] ?>';
					break;
					case 'quickpay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_QUICK_PAY'] ?>';
					break;
					case 'paynl':
						var paymentlanguage = '<?= $lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_PAYNL'] ?>';
					break;
					case 'zaakpay':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_ZAAKPAY_PAY'] ?>';
					break;
				}
				
				if(rcnt %2 == 1){
			  	b +='<tr>';   
			   	}
				b +='<td align="center">';
				b +='<div class="checkout">';
				b +='<div class="checkout_radio"><input id="reserve-'+reservpay+'-check" type="radio" name="checkbox" '+radiochecked+' style="" class="css-checkbox" onclick="Payment.BusinessReserveUpdate(\''+reservpay+'\')"><label for="reserve-'+reservpay+'-check" class="css-label">&nbsp;</label>';
				b +=' </div>';
				b +='<span class="checkout_label">'+paymentlanguage+'</span><span class="checkout_logo"><a href="#"><img src="images/step4-checkout/paymethod/'+reservpay+'.png"></a></span>';
				b +='</div>';
				b +='</td>';
				if(rcnt %2 == 0){
			  	b +='</tr>';
			  	}

				rcnt = rcnt + 1; 
				

				
			}
		}
			
			b +=' </table>';
			b +=Payment.commonFieldPaymentGateway();
			b +='<button type="button" class="btn-red" id="bottom1-order-btn" onclick="Shopping.ReserveNowMob()"><?=$lang_resource['MOBILE_PAYMENT_ORDER_NOW']?></button>';
			b +='</div>';
			b +='</div>';
			document.getElementById("shoppingbox").innerHTML = b;
			if(repaymentlength == 1){
			for(var reservepay in Shopping.Cart.reservepaymethoddetails){
				if(Shopping.Cart.reservepaymethoddetails[reservepay]){
					Payment.BusinessReserveUpdate(reservepay)
				}
			}				
		}

},	
BusinessReserveUpdate: function (b){
	
	for(var reservepay in Shopping.Cart.reservepaymethod){		
		if(b == reservepay){
			Shopping.Cart.reservepaymethod[reservepay] = true;
			
				if(b == "mercury"){
					$(".mercury_field").show();
				}else{
					$(".mercury_field").hide();
				}
				if(b == "braintree"){
					$(".braintree_field").show();
				}else{
					$(".braintree_field").hide();
				}
				if(b == "authorize"){
					$(".au_ne_pay").show();
				}else{
					$(".au_ne_pay").hide();
				}
				if(b == "worldpay"){
					$(".cardsaveclass").show();
				}else{
					$(".cardsaveclass").hide();
				}
				if(b == "cash" || b == "card"){
				Payment.ReserveupdateOrderBtn(b);
			}else{
				Payment.ReserveupdateOrderBtn(b);
			}

		}else{			
			if(Shopping.Cart.reservepaymethod[reservepay]){
				document.getElementById('reserve-'+reservepay+'-check').checked = false;
			}
			Shopping.Cart.reservepaymethod[reservepay] = false;		
		}
	}
},

ReserveupdateOrderBtn: function(b){
	
	var topBtn = $('#top1-order-btn');
	var bottomBtn = $('#bottom1-order-btn');

	if(b == "cash" || b == "card"){
		
		bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom1-order-btn" onclick="Shopping.ReserveNowMob()"><?=$lang_resource['MOBILE_RESERVATION_ORDER_NOW'];?></button>');
		
}else{
		
		if(b == "worldpay"){
			var paymentname = "merchant";
		}else if(b == "authorize"){
			var paymentname = "authorizednet";
		}else{
			var paymentname = b;
		}		
		
		var bottomBtn = $('#bottom1-order-btn');
		var itemId = eval(paymentname).createId();	
		
			var f = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
			
		bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom1-order-btn">'+eval(paymentname).createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</button>')

	}	
},
 
 commonFieldPaymentGateway : function(){	
 
            <!--Braintree Detais-->
				var b ='<div class="PHcknew braintree_field" style="display:none;">';

			<!--PH_box-->
			b +='<div class="PH_box">';
			b +='<?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO'] ?>';
			b +='</div>';
			<!--PH_box end-->
			
			<!--PH_box-->
			b +='<div class="PH_box">';
			b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE'] ?></div>';
			b +='<div class="PH_bullet">:</div>';
			b +='<div class="PH_box_text">'
			b += '<div class="brainpayment_cards">';
				
				b +='<input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card" class="css-checkbox">';
				b +='<label for="brain_visa" class="css-label radGroup2"><img src="images/step4-checkout/pay-2.png"></label>';
				
				b +='<input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card" class="css-checkbox">';
				b +='<label for="brain_master" class="css-label radGroup2"><img src="images/step4-checkout/pay-3.png"></label>';
				
				
				
				b +='<input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago" class="css-checkbox">';
				b +='<label for="brain_marco" class="css-label radGroup2"><img src="images/step4-checkout/pay-4.png"></label>';
				
				
				b +='<input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave" class="css-checkbox">';
				b +='<label for="brain_cardsave" class="css-label radGroup2"><img src="images/step4-checkout/pay-5.png"></label>';
				
				
				b += '</div>';
			
			b += '</div>';
			b +='</div>';
				
				
				<!--PH_box-->
b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintreecard" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')"/></div>';
b +='</div>';
<!--PH_box end-->

<!--PH_box-->
b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintreeexpiry" value="" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')"/></div>';
b +='</div>';
<!--PH_box end-->


<!--PH_box-->
b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';
<!--PH_box end-->

<!--PH_box-->
b +='<div class="PH_box">';
b +='<div class="brain_checkbox"><input type="checkbox" class="css-checkbox" id="braintreesameasdelivery" value="" onclick="Payment.UpdateBrainTreeFields()"><label for="braintreesameasdelivery" class="css-label"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_SAMEASDELIVERY'] ?></label></div>';
b +='</div>';
<!--PH_box end-->

console.log("brain-first"+Shopping.braintree_firstname)

<!--PH_box-->
b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_firstname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';
<!--PH_box end-->
				
	
	b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_lastname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';			
				
				
	b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_address1" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';	


b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_address2" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';	



b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_city" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';				
				
					
		
		
b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_state" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';				
			
			
		


b +='<div class="PH_box">';
b +='<div class="PH_box_name"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?></div>';
b +='<div class="PH_bullet">:</div>';
b +='<div class="PH_box_text"><input type="text"  class="field-text" id="braintree_zipcode" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></div>';
b +='</div>';	


b +='</div>';		
					
				
				<!--End Braintree-->	
 
 			 
						 
			 b +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="payextra_tbl">';
				
			
				
				<!--mercury field-->
				b += '<tr class="mercury_field" style="display:none;">';
				b += '<td><?= $lang_resource['MERCURY_PAYMENT_ACNO'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" id="mercury_acc" value="" onkeyup="Shopping.UserUpdate(this,\'mercury_acno\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="mercury_field" style="display:none;">';
				b += '<td><?= $lang_resource['MERCURY_PAYMENT_EXMM'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" id="mercury_exmm" value="" onkeyup="Shopping.UserUpdate(this,\'mercury_exmm\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="mercury_field" style="display:none;">';
				b += '<td><?= $lang_resource['MERCURY_PAYMENT_EXYY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" id="mercury_exyy" value="" onkeyup="Shopping.UserUpdate(this,\'mercury_exyy\')"/></td>';
				b += '</tr>';
				
				<!--mercury field-->
				
				
				
				<!--Authorize.net field-->
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td colspan="3"><b><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARD_DETAILS'] ?></b></td>';
				
				b += '</tr>';
					b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_FIRST_NAME'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.firstname) + '" onkeyup="Shopping.UserUpdate(this,\'firstname\')"/></td>';
				b += '</tr>';
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_LAST_NAME1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname) + '" onkeyup="Shopping.UserUpdate(this,\'lastname\')"/></td>';
				b += '</tr>';
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CHECKOUT_FULL_ADDRESS'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.street) + '" onkeyup="Shopping.UserUpdate(this,\'lastname\')"/></td>';
				b += '</tr>';
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_CITY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cityname) + '" onkeyup="Shopping.UserUpdate(this,\'cityname\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['MOBILE_MYACCOUNT_STATE1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'state\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['MOBILE_MYACCOUNT_STATE'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.countryname) + '" onkeyup="Shopping.UserUpdate(this,\'countryname\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['FRONT_VISUALS_POST_CODE1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zip\')"/></td>';
				b += '</tr>';
				
				
				
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="" id="cardno" onkeyup="Shopping.UserUpdate(this,\'cardno\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="password"  class="field-text" value="" id="cvv2" onkeyup="Shopping.UserUpdate(this,\'cvv2\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="" id="expmm" onkeyup="Shopping.UserUpdate(this,\'expmm\')"/></td>';
				b += '</tr>';

				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field-text" value="" id="expyy" onkeyup="Shopping.UserUpdate(this,\'expyy\')"/></td>';
				b += '</tr>';
				<!--Authorize.net field-->
				
				<!-- Card Save field-->
				b +='<tr class="cardsaveclass" style="display:none;">';
				b +='<td><?= $lang_resource['CHECKOUT_FULL_ADDRESS'] ?></td>'
				b += '<td>:</td>';
				b +='<td><input type="text" id="buyeraddress" class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'address\')"/></td>';
				b += '</tr>';
				b +='<tr class="cardsaveclass" style="display:none;">';
				b +='<td><?= $lang_resource['Neighbourhood_V2'] ?></td>'
				b += '<td>:</td>';
				b +='<td><input type="text" id="buyercolony" class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'colony\')"/></td>';
				b += '</tr>';
				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text" id="cityname1"  class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'cityname\')"/></td>';
				b += '</tr>';

				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  id="zip1"  class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'zip\')"/></td>';
				b += '</tr>';
				


				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  id="cardsavecardno" class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')"/></td>';
				b += '</tr>';
				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text" id="cardsaveexpmm"  class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')"/></td>';
				b += '</tr>';

				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text" id="cardsaveexpyy" class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text" id="cardsavecvv"  class="field-text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')"/></td>';
				b += '</tr>';
				
				b += '</table>';
				return b;
					 },
					 
BusinessPaymentUpdate: function (e, f){
	for(var pay in Shopping.Cart.business[0].paymethod){		
		if(e == pay){
			Shopping.Cart.business[0].paymethod[pay] = true;
			if(e == "cash" || e == "card"){
				Payment.updateOrderBtn(e);
			}else{
				if(e == "mercury"){
					$(".mercury_field").show();
				}else{
					$(".mercury_field").hide();
				}
				if(e == "braintree"){
					$(".braintree_field").show();
				}else{
					$(".braintree_field").hide();
				}
				if(e == "authorize"){
					$(".au_ne_pay").show();
				}else{
					$(".au_ne_pay").hide();
				}
				if(e == "worldpay"){
					$(".cardsaveclass").show();
				}else{
					$(".cardsaveclass").hide();
				}
				
				Payment.updateOrderBtn(e);
			}

		}else{			
			if(Shopping.Cart.business[0].paymethod[pay]){
				document.getElementById('paymethod-'+pay+'-check').checked = false;
			}
			Shopping.Cart.business[0].paymethod[pay] = false;		
		}
	}
},
	updateOrderBtn: function(e){
		//alert(e);
		var topBtn = $('#top-order-btn');
		var bottomBtn = $('#bottom-order-btn');
	
		if(e == "cash" || e == "card"){
			topBtn.replaceWith('<button class="btn-red" id="top-order-btn" onclick="Shopping.PlaceOrder()"><span class="caption nonselectable"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></span></button>');
			bottomBtn.replaceWith('<button class="btn-red pull_left" id="bottom-order-btn" onclick="Shopping.PlaceOrder()"><span class="caption nonselectable"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></span></button>');
		}else{
			if(e == "worldpay"){
				var paymentname = "merchant";
			}else if(e == "authorize"){
				var paymentname = "authorizednet";
			}else{
				var paymentname = e;
			}		
			
			var itemId = eval(paymentname).createId();
	
			topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+eval(paymentname).createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
			bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+eval(paymentname).createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
		}	
	},
	
	UpdateBrainTreeFields: function()
	{
		
		
		if(document.getElementById("braintreesameasdelivery").checked)
		{ 
		
		document.getElementById("braintree_firstname").value = Shopping.braintree_firstname;
	    document.getElementById("braintree_lastname").value = Shopping.braintree_lastname2;
		document.getElementById("braintree_address1").value = Shopping.braintree_address1;
		document.getElementById("braintree_address2").value = Shopping.braintree_address2;
		document.getElementById("braintree_state").value = Shopping.braintree_state;
		document.getElementById("braintree_city").value = Shopping.braintree_city;
		document.getElementById("braintree_zipcode").value = Shopping.braintree_zipcode;
		
		}
		else
		{
	     document.getElementById("braintree_firstname").value = "";
		 document.getElementById("braintree_lastname").value = "";
		document.getElementById("braintree_address1").value = "";
		document.getElementById("braintree_address2").value = "";
		document.getElementById("braintree_state").value = "";
		document.getElementById("braintree_city").value = "";
		document.getElementById("braintree_zipcode").value = "";
		document.getElementById("braintree_lastname").value = "";
			
		}
		
	}
	
				 

};