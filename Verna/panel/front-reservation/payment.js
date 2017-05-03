var Payment = {
	AllpaymentButton: function (){
		
		var b = '';
		b += '<h3 style="margin-top:0px;"><?= $lang_resource['PAYMENT_METHOD'] ?></h3>';
		var paymentlength = 0;

		
		for(var pay in Shopping.Cart.business[0].paymethoddetails){
			if(Shopping.Cart.business[0].paymethoddetails[pay]){
				paymentlength++;
			}
		}	
		
		for(var pay in Shopping.Cart.business[0].paymethoddetails){			
			if(Shopping.Cart.business[0].paymethoddetails[pay]){
				//alert(paymentlength);
				if(paymentlength == 1){
					var radiochecked = 'CHECKED';
				}else{
					var radiochecked = '';
				}
				//alert(pay);
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
					case 'payeezy':
						var paymentlanguage = '<?= $lang_resource['PAYMENT_PAYEEZY_PAY'] ?>';
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
				b +='<div class="form-group">'
				b +='<div class="radio pyment_radio">' 
				b +='<input type="radio" name="checkbox" '+radiochecked+' id="paymethod-'+pay+'-check" onclick="Payment.BusinessPaymentUpdate(\''+pay+'\',0)">' 
				b +='<label for="paymethod-'+pay+'-check">'+paymentlanguage+'</label>'
				b +='</div>'
				b +='</div>'<!--form-group-->
				
			}
		}
			
		document.getElementById("paymentBox").innerHTML= b;

		if(paymentlength == 1){
			for(var pay in Shopping.Cart.business[0].paymethoddetails){
				if(Shopping.Cart.business[0].paymethoddetails[pay]){
					Payment.BusinessPaymentUpdate(pay,0)
				}
			}				
		}		
	},

BusinessPaymentUpdate: function (e, f){
	for(var pay in Shopping.Cart.business[0].paymethod){		
		if(e == pay){
			Shopping.Cart.business[0].paymethod[pay] = true;
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
			/*if(e == "stripe"){
				$(".stripeclass").show();
			}else{
				$(".stripeclass").hide();
			}*/
			if(e == "cash" || e == "card"){
				Payment.updateOrderBtn(e);
			}else{				
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
	var topBtn = $('#top-order-btn');
	var bottomBtn = $('#bottom-order-btn');

	if(e == "cash" || e == "card"){

				
				
				
				
		
		
		topBtn.replaceWith('<button type="button" id="top-order-btn" class="checkout_btn" onclick="Shopping.PlaceOrder()"><?= $lang_resource['PAYMENT_ORDER_NOW'] ?></button>');
		bottomBtn.replaceWith('<button type="button" id="bottom-order-btn" class="checkout_btn" onclick="Shopping.PlaceOrder()"><?= $lang_resource['PAYMENT_ORDER_NOW'] ?></button>');
	}else{
		if(e == "worldpay"){
			var paymentname = "merchant";
		}else if(e == "authorize"){
			var paymentname = "authorizednet";
		}else{
			var paymentname = e;
		}		
		
		var itemId = eval(paymentname).createId();

		topBtn.replaceWith('<button type="button" id="top-order-btn" class="checkout_btn">'+eval(paymentname).createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</button>');
		bottomBtn.replaceWith('<button type="button" class="checkout_btn" id="bottom-order-btn">'+eval(paymentname).createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</button>')
	}	
},

ReservatioPayment: function (u){
		var n="";
	
		var repaymentlength = 0;
		for(var reservpay in Shopping.Cart.reservepaymethoddetails){
			if(Shopping.Cart.reservepaymethoddetails[reservpay]){
				repaymentlength++;
			}
			
		}
		var counterpayment = 1;
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
				
				if(counterpayment % 3 ==1){
					n +='<div class="row">'
				}

				n +='<div class="col-md-4">'
				n +='<div class="payment_box">'
				n +='<div class="radio_dv">'
				n +='<input id="reserve-'+reservpay+'-check" onclick="Payment.ReservePaymentUpdate(\''+reservpay+'\',' + u + ')"  type="radio" name="checkbox" '+radiochecked+'>' 
				n +='<label for="reserve-'+reservpay+'-check">'+paymentlanguage+'</label>'
				n +='</div>'<!--radio_dv-->
				n +='<div class="pay_logo">'
				n +='<img src="images/step4-checkout/paymethod/'+reservpay+'.png">'
				n +='</div>'<!--pay_logo-->
				n +='</div>'<!--payment_box-->
				n +='</div>'<!--col-md-4-->
				
				if(counterpayment % 3 == 0 || counterpayment == repaymentlength){
					n +='</div>'<!--row-->
				}
				counterpayment++

					
			}
		}
		return n;
		if(repaymentlength == 1){
			for(var reservepay in Shopping.Cart.reservepaymethoddetails){
				if(Shopping.Cart.reservepaymethoddetails[reservepay]){
					Payment.ReservePaymentUpdate(reservepay,u)
				}
			}				
		}
			
		
	},

ReservePaymentUpdate: function (b,u){
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
				if(b == "stripe"){
				$(".stripeclass").show();
				}else{
					$(".stripeclass").hide();
				}
				if(b == "cash" || b == "card"){
				Payment.ReserveupdateOrderBtn(b,u);
				}else{
				
				Payment.ReserveupdateOrderBtn(b,u);
				}

		}else{			
			if(Shopping.Cart.reservepaymethod[reservepay]){
				document.getElementById('reserve-'+reservepay+'-check').checked = false;
			}
			Shopping.Cart.reservepaymethod[reservepay] = false;		
		}
	}
},

ReserveupdateOrderBtn: function(b,u){
	
	var topBtn = $('#top1-order-btn');
	var bottomBtn = $('#bottom1-order-btn');

	if(b == "cash" || b == "card"){
		topBtn.replaceWith('<div class="col-md-3" id="top1-order-btn"><button type="button" class=" red_btn_small" id="reservepayment" onclick="Shopping.ReserveNow()"><?=$lang_resource['PAYMENT_RESERVE_NOW'];?></button></div>');
        bottomBtn.replaceWith('<div class="col-md-3" id="bottom1-order-btn"><button type="button" class=" red_btn_small" id="reservepayment" onclick="Shopping.ReserveNow()"><?=$lang_resource['PAYMENT_RESERVE_NOW'];?></button></div>');

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
		bottomBtn.replaceWith('<div class="col-md-3" id="bottom1-order-btn" >'+eval(paymentname).createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[u].paypal,itemPrice:globalReserveTotalPrice})+'</div>')
	}	
},

};
