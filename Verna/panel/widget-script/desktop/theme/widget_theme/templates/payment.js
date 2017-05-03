var Payment = {
	AllpaymentButton: function (){
		
		var b = '';
		b += '<h2 class="heading"><?= $lang_resource['PAYMENT_METHOD'] ?></h2>';
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

				}
				//if(pay == 'cash'){
				b += '<div class="payment_method">'
				b += '<div class="row">'
				b += '<div class="col-lg-8 pay_readio">'
				b += '<input type="radio" name="checkbox" '+radiochecked+' id="paymethod-'+pay+'-check" onclick="Payment.BusinessPaymentUpdate(\''+pay+'\',0)" name="payment[cash]">'
				b += '<label style="width:90%;position: relative;" for="paymethod-'+pay+'-check">'+paymentlanguage+' <img style="width: 6%;float: right;position: absolute;right: 0;" src="images/step4-checkout/paymethod/'+pay+'.png"></label>'
				b += '</div>'<!--col-lg-7-->
				b += '<div class="col-lg-4">'
				b += '<div class="payment_logo">'
				//b += '<a href="jvascript:void(0);"><img src="images/step4-checkout/paymethod/'+pay+'.png"></a>'
				b += '</div>'<!--payment_logo-->
				b += '</div>'<!--col-lg-5-->
				b += '</div>'<!--row-->
				b += '</div>'
				//}
				
			}
		}

		b += '<div class="row">'
		b += '<div class="col-lg-12">'
		b += '<button type="button" id="top-order-btn" class="cart_order_now_btn" onclick="Shopping.PlaceOrder()"> <?= $lang_resource['PAYMENT_ORDER_NOW'] ?></button>'
		b += '<button type="button" class="cart_back_btn" onclick="javascript:Shopping.OpenBusiness('+Shopping.Cart.business[0].id+')"> <?= $lang_resource['PAYMENT_ORDER_BACK'] ?></button>'
		b += '</div>'<!--col-lg-12-->
		b += '</div>'
			
		document.getElementById("paymentBox").innerHTML= b;

		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
			$("h3").css({"color":Main.adstle});
         });

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

				
				
				
				
		
		
		topBtn.replaceWith('<button type="button" class="cart_order_now_btn" id="top-order-btn" onclick="Shopping.PlaceOrder()">PLACE YOUR ORDER</button>');
		bottomBtn.replaceWith('<button type="button" class="cart_order_now_btn"" id="bottom-order-btn" onclick="Shopping.PlaceOrder()">PLACE YOUR ORDER</button>');
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

ReservatioPayment: function (u){
		var n="";
	
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
				}
				
				
				n += '<div class="checkout">'
				n += '<div class="checkout_radio">'
				n += '<input id="reserve-'+reservpay+'-check" onclick="Payment.ReservePaymentUpdate(\''+reservpay+'\',' + u + ')"  type="radio" name="checkbox" '+radiochecked+' class="css-checkbox">'
				n += '<label for="reserve-'+reservpay+'-check" class="css-label">&nbsp;</label>'
				n += '</div>'
				n += '<span class="checkout_label">'+paymentlanguage+'</span>'
				n += '<span class="checkout_logo"><img src="images/step4-checkout/paymethod/'+reservpay+'.png"></span>'
				n += '</div>'
				

				
			}
		}
		<!--pull_left-->
			n +='<div style="width:100%; float:left;"></div>'
			
			
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
				if(e == "stripe"){
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
		topBtn.replaceWith('<div class="pull_left" id="top1-order-btn"  style="margin-left:395px;"><button class="reserv-btn" onclick="Shopping.ReserveNow()"><?=$lang_resource['PAYMENT_RESERVE_NOW'];?></button></div>');
        bottomBtn.replaceWith('<div class="pull_left" id="bottom1-order-btn"  style="margin-left:395px;"><button class="reserv-btn" onclick="Shopping.ReserveNow()"><?=$lang_resource['PAYMENT_RESERVE_NOW'];?></button></div>');

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
		bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn" style="text-align: center;"><span class="caption nonselectable">'+eval(paymentname).createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[u].paypal,itemPrice:globalReserveTotalPrice})+'</div>')
	}	
},

};