var OrderNotification ={
	
	Main: function(){		
	
		if(Business.id){
			Main.Loading();
     		var a = new Date().getTime();
        	Main.Aid = a;				
			$.post("lib/order_notification.php", "f=FetchPaymentDataByID&id="+Business.id, function (c) {		
				OrderNotification.payment=JSON.parse(c);
				$.post("lib/order_notification.php", "f=FetchBusinessDataByID&id="+Business.id, function (b) {	
					if (a != Main.Aid) {
		                return
		            }
					Main.Ready();
					OrderNotification.PrintMain(JSON.parse(b));
				});
			});		
		}else{
            var N=''
            N += '<div class="col-md-12">'
            N += '<div class="the-box">'
            N += '<div class="clearfix" style="padding:5px 0">'
            N +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_PRODUCTS_PLEASE_CREATE_BUSINESS']?></p>'
            N += '</div></div></div>'
            document.getElementById("tab_notification").innerHTML = N;
        }
		/////////////////////////
		//PrinterSet.BusID = Business.id;   
		/*$.post("lib/order_notification.php", "f=FetchAllPrinterModel", function (mm) {
		mm = JSON.parse(mm);
		  //  PrinterSet.AllModel = new Array();
		  
		  
		  var i = new Array();
		  i.push(JSON.parse('{"id":"-1","caption":"select one"}'));
			
			 for (var E in mm) {
                var y = new Object();
                y.id = mm[E].id;
                y.caption = mm[E].model_name;
               // PrinterSet.AllModel.push(y);
			 
			   i.push(y);
			  
            }
			
			PrinterSet.AllModel = i;
			
			
		});
		$.post("lib/order_notification.php", "f=FetchPrinterData&id="+Business.id, function (c) {
        //alert(JSON.stringify(c))
		///return false;     
         	OrderNotification.GprsForm(c);
        });
		////////////////////////*/
		
		
	},
	PrintMain: function(F){		
		
		var n ='<h4 class="on_h4"><strong><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_ORDER_NOTIFICATIONS']?></strong></h4>'
		n +='<div class="row">'
		n +='<div class="col-md-6">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-email.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_EMAIL_NOTIFICATION']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H = ''
		if(F.acceptemail == 't')
			H = 'checked'
		//n +='<input type="checkbox" id="acceptemail" name="checkbox" '+H+'  disabled style="" class="switch checkbox_2 hand">'
		n +='<label for="acceptemail" >&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.EmailMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'

		n +='</span>'

		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_EMAIL_NOTIFICATION']?></p>"
		
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-6-->
		n +='<div class="col-md-6">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-gprs.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_GPRS_SMS_PRINTERS']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H1 = ''
		if(F.acceptgprs == 't')
			H1 = 'checked'
		//n +='<input type="checkbox" id="acceptgprs" name="checkbox" '+H1+' style="" class="switch checkbox_2 hand">'
		n +='<label for="acceptgprs" >&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.GprsMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_SMS_PRINTER']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-6-->		
		n +='</div>'
		<!--row-->

		n +='<div class="row">'
		n +='<div class="col-md-6">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-sms.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SMS_NOTIFICATION']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H2 = ''
		if(F.acceptsms == 't')
			H2 = 'checked'
		n +='<input type="checkbox" id="acceptsms" name="checkbox" '+H2+' style="" class="switch checkbox_2 hand">'
		n +='<label for="acceptsms">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.SmsMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_SMS_NOTIFICATION']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-6-->

		n +='</div>'
		<!--row-->

		n +='<h4 class="on_h4"><strong><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYMENT_GATEWAYS']?></strong></h4>'
		
		
		n +='<div class="row">'
		var cnt = 1;
		
		for(var m in OrderNotification.payment){
					
		if(OrderNotification.payment[m].paymentgateway_id==1){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-cod.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_CASH_ON_DELIVERY']?></h4></a>'
		n +='<span class="pull-right on-right">'
		n +='<div class=" pull-left">'
		var H4 = ''
		if(F.acceptcash == 't')
			
			H4 = 'checked'
		n +='<input type="checkbox"  id="acceptcash" name="checkbox" '+H4+' style="" class="switch checkbox_2 hand">'
		n +='<label for="acceptcash">&nbsp;</label></div>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_CASH_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==2){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-cod.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_DEBIT_OR_CREDIT_CARD']?></h4></a>'
		n +='<span class="pull-right on-right">'
		n +='<div class=" pull-left">'
		var H5 = ''
		if(F.acceptcard == 't')
			H5 = 'checked'
		n +='<input type="checkbox"  id="acceptcard" name="checkbox" '+H5+' style="" class="switch checkbox_2 hand">'
		n +='<label for="acceptcard">&nbsp;</label></div>'
		n +='</span>'

		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_CARD_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==3){
		
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-paypal.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_ONLINE_PAYMENT_WITH_PAYPAL']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H6 = ''
		if(F.acceptpaypal == 't')
			H6 = 'checked'
		
		n +='<input type="checkbox" id="acceptpaypal" name="checkbox" '+H6+' style="" class="switch checkbox_2 hand"><label for="acceptpaypal">&nbsp;</label></div>'
		n +='<a href="javascript:OrderNotification.PaypalMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYPAL_DELIVERY']?></p>"
        n +='</div>'
        <!--the-box-->
        n +='</div>'
        <!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==4){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-paypal-adaptiv.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYPAL_ADAPTIVE']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H7 = ''
		if(F.acceptpaypaladaptive == 't')
			H7 = 'checked'
		
		n +='<input type="checkbox" id="acceptpaypaladaptive" name="checkbox" '+H7+' style="" class="switch checkbox_2 hand"><label for="acceptpaypaladaptive">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PaypalAdaptiveMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYPAL_ADAPTIVE_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==5){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-a-net.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Authorize']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H8 = ''
		if(F.acceptauthorize == 't')
			H8 = 'checked'

		n +='<input type="checkbox" id="acceptauthorize" name="checkbox" '+H8+' style="" class="switch checkbox_2 hand"><label for="acceptauthorize">&nbsp;</label></div>'
		n +='<a href="javascript:OrderNotification.AuthorizeMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_AUTHORIZE_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==6){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-braintree.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Braintree']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'

		var H9 = ''
		if(F.acceptbraintree == 't')
			H9 = 'checked'

		n +='<input type="checkbox" id="acceptbraintree" name="checkbox" '+H9+' style="" class="switch checkbox_2 hand"><label for="acceptbraintree">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.BraintreeMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_BRAINTREE_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==9){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-mercado-pago.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Mercado']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H10 = ''
		if(F.acceptmarco == 't')
			H10 = 'checked'
		
		n +='<input type="checkbox" id="acceptmarco" name="checkbox" '+H10+' style="" class="switch checkbox_2 hand"><label for="acceptmarco">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.MarcoMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_MERCADO_PAGO_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		}
		if(OrderNotification.payment[m].paymentgateway_id==7){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-murcury.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Mercury']?>t</h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H11 = ''
		if(F.acceptmercury == 't')
			H11 = 'checked'
		
		n +='<input type="checkbox" id="acceptmercury" name="checkbox" '+H11+' style="" class="switch checkbox_2 hand"><label for="acceptmercury">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.MercuryMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_MERCURY_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
		<!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==8){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-worldpay.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_WORLDPAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H12 = ''
		if(F.acceptworldpay == 't')
			H12 = 'checked'
		
		n +='<input type="checkbox" id="acceptworldpay" name="checkbox" '+H12+' style="" class="switch checkbox_2 hand"><label for="acceptworldpay">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.WorldpayMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_WORLDPAY_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==10){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/transactium-icon.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Transactium']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H13 = ''
		if(F.accepttransactium == 't')
			H13 = 'checked'
		
		n +='<input type="checkbox" id="accepttransactium" name="checkbox" '+H13+' style="" class="switch checkbox_2 hand"><label for="accepttransactium">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.TransactiumMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_TRANSACTIUM_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==11){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/payment-exp-panel.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PEXPRESS']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H14 = ''
		if(F.acceptpexpress == 't')
			H14 = 'checked'
		
		n +='<input type="checkbox" id="acceptpexpress" name="checkbox" '+H14+' style="" class="switch checkbox_2 hand"><label for="acceptpexpress">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PexpressMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PEXPRESS_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		
		}
		if(OrderNotification.payment[m].paymentgateway_id==12){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/maksekeskus-panel.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_MAKESKESKUS']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H15 = ''
		if(F.acceptmaksekeskus == 't')
			H15 = 'checked'
		
		n +='<input type="checkbox" id="acceptmaksekeskus" name="checkbox" '+H15+' style="" class="switch checkbox_2 hand"><label for="acceptmaksekeskus">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.MakeskeskusMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_MAKESKESKUS_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==13){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/vogue-panel.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_VOGUEPAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H16 = ''
		if(F.acceptvoguepay == 't')
			H16 = 'checked'
		
		n +='<input type="checkbox" id="acceptvoguepay" name="checkbox" '+H16+' style="" class="switch checkbox_2 hand"><label for="acceptvoguepay">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.VoguepayMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_VOGUEPAY_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==14){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/skrill-panel.png"></span> <?=$lang_resource['PAYMENT_SKRILL_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H17 = ''
		if(F.acceptskrill == 't')
			H17 = 'checked'
		
		n +='<input type="checkbox" id="acceptskrill" name="checkbox" '+H17+' style="" class="switch checkbox_2 hand"><label for="acceptskrill">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.SkrillMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_SKRILL_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}

		if(OrderNotification.payment[m].paymentgateway_id==15){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/payeezy.png"></span> <?=$lang_resource['PAYMENT_PAYEEZY_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H18 = ''
		if(F.acceptpayeezy == 't')
			H18 = 'checked'
		
		n +='<input type="checkbox" id="acceptpayeezy" name="checkbox" '+H18+' style="" class="switch checkbox_2 hand"><label for="acceptpayeezy">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PayeezyMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYEEZY_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}

if(OrderNotification.payment[m].paymentgateway_id==16){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/payu.png"></span> <?=$lang_resource['PAYMENT_PAYU_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H19 = ''
		if(F.acceptpayu == 't')
			H19 = 'checked'
		
		n +='<input type="checkbox" id="acceptpayu" name="checkbox" '+H19+' style="" class="switch checkbox_2 hand"><label for="acceptpayu">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PayuMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYU_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
if(OrderNotification.payment[m].paymentgateway_id==17){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/stripe.png"></span> <?=$lang_resource['PAYMENT_STRIPE_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H20 = ''
		if(F.acceptstripe == 't')
			H20 = 'checked'
		
		n +='<input type="checkbox" id="acceptstripe" name="checkbox" '+H20+' style="" class="switch checkbox_2 hand"><label for="acceptstripe">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.StripeMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_STRIPE_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
	}	
	if(OrderNotification.payment[m].paymentgateway_id==18){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-paypal-adaptiv.png"></span> <?=$lang_resource['PAYMENT_PAYPALPRO_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H21 = ''
		if(F.acceptpaypalpro == 't')
			H21 = 'checked'
		
		n +='<input type="checkbox" id="acceptpaypalpro" name="checkbox" '+H21+' style="" class="switch checkbox_2 hand"><label for="acceptpaypalpro">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PaypalproMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYPALPRO_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
	if(OrderNotification.payment[m].paymentgateway_id==19){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-paypal-adaptiv.png"></span> <?=$lang_resource['PAYMENT_PAYGISTIX_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H22 = ''
		if(F.acceptpaygistix == 't')
			H22 = 'checked'
		
		n +='<input type="checkbox" id="acceptpaygistix" name="checkbox" '+H22+' style="" class="switch checkbox_2 hand"><label for="acceptpaygistix">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PaygistixMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYGISTIX_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==20){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/global.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_GLOBAL']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H23 = ''
		if(F.acceptglobal == 't')
			H23 = 'checked'
		
		n +='<input type="checkbox" id="acceptglobal" name="checkbox" '+H23+' style="" class="switch checkbox_2 hand"><label for="acceptglobal">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.GlobalMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_GLOBAL_DESCRIPTION']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==21){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/card-net.png"></span> <?=$lang_resource['PAYMENT_BTRANS_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H24 = ''
		if(F.acceptbtrans == 't')
			H24 = 'checked'
		
		n +='<input type="checkbox" id="acceptbtrans" name="checkbox" '+H24+' style="" class="switch checkbox_2 hand"><label for="acceptbtrans">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.BtransMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_BTRANS_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==22){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/bsa.png"></span> <?=$lang_resource['PAYMENT_BSA_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H25 = ''
		if(F.acceptbsa == 't')
			H25 = 'checked'
		
		n +='<input type="checkbox" id="acceptbsa" name="checkbox" '+H25+' style="" class="switch checkbox_2 hand"><label for="acceptbsa">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.BsaMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_BSA_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==23){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/azul.png"></span> <?=$lang_resource['PAYMENT_AZUL_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H26 = ''
		if(F.acceptazul == 't')
			H26= 'checked'
		
		n +='<input type="checkbox" id="acceptazul" name="checkbox" '+H26+' style="" class="switch checkbox_2 hand"><label for="acceptazul">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.AzulMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_AZUL_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
		if(OrderNotification.payment[m].paymentgateway_id==24){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/quickpay.png"></span> <?=$lang_resource['PAYMENT_QUICK_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H27 = ''
		if(F.acceptquickpay == 't')
			H27 = 'checked'
		
		n +='<input type="checkbox" id="acceptquickpay" name="checkbox" '+H27+' style="" class="switch checkbox_2 hand"><label for="acceptquickpay">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.QuickpayMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_QUICK_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==25){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/paynl.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYNL']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H28 = ''
		if(F.acceptpaynl == 't')
			H28 = 'checked'
		
		n +='<input type="checkbox" id="acceptpaynl" name="checkbox" '+H28+' style="" class="switch checkbox_2 hand"><label for="acceptpaynl">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.PaynlMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_PAYNL_DESCRIPTION']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		if(OrderNotification.payment[m].paymentgateway_id==26){
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/zaakpay.png"></span> <?=$lang_resource['PAYMENT_ZAAKPAY_PAY']?> </h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H29 = ''
		if(F.acceptzaakpay == 't')
			H29 = 'checked'
		
		n +='<input type="checkbox" id="acceptzaakpay" name="checkbox" '+H29+' style="" class="switch checkbox_2 hand"><label for="acceptzaakpay">&nbsp;</label></div>'
		n +='<a  href="javascript:OrderNotification.ZaakpayMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_ZAAKPAY_DELIVERY']?></p>"
		n +='</div>'
		<!--the-box-->
		n +='</div>'
        <!--col-md-4-->
		}
		
        if(cnt%3==0){
		n +='</div><div class="row">'
		}
		cnt = cnt+1;
		
	}
		n +='</div>'		
		if(OrderNotification.payment.length == cnt-1){
			$("#tab_notification").empty().append(n);
		}else{
			OrderNotification.Main();
		}


        $('#acceptemail').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptemail&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.EmailMain();
			}
    	});
    	$('#acceptgprs').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptgprs&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.GprsMain();
			}
    	});
    	$('#acceptsms').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptsms&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.SmsMain()
			}
    	});
    	
    	
    	$('#acceptcash').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptcash&status=" + Estr;
	        OrderNotification.ChangeStatus(g);

    	});
    	$('#acceptcard').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptcard&status=" + Estr;
	        OrderNotification.ChangeStatus(g);

    	});
    	$('#acceptpaypal').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpaypal&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PaypalMain();
			}
			
    	});
    	$('#acceptpaypaladaptive').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpaypaladaptive&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PaypalAdaptiveMain();
			}
    	});
    	$('#acceptauthorize').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptauthorize&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.AuthorizeMain();
			}
    	});
    	$('#acceptbraintree').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptbraintree&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.BraintreeMain();
			}
    	});
    	$('#acceptmarco').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptmarco&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.MarcoMain();
			}
    	});
		$('#acceptmercury').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptmercury&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.MercuryMain();
			}
    	});
		$('#acceptworldpay').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptworldpay&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.WorldpayMain();
			}
    	});
		
		
		$('#accepttransactium').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=accepttransactium&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.TransactiumMain();
			}
    	});
		
		$('#acceptpexpress').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpexpress&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PexpressMain();
			}
    	});
		$('#acceptmaksekeskus').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptmaksekeskus&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.MakeskeskusMain();
			}
    	});
		
		$('#acceptvoguepay').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptvoguepay&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.VoguepayMain();
			}
    	});
		
		$('#acceptskrill').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptskrill&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.SkrillMain();
			}
    	});
    	$('#acceptpayeezy').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpayeezy&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PayeezyMain();
			}
    	});
		$('#acceptpayu').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpayu&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PayuMain();
			}
    	});
		$('#acceptstripe').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptstripe&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.StripeMain();
			}
    	});
		
		$('#acceptpaypalpro').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpaypalpro&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PaypalproMain();
			}
    	});
		$('#acceptpaygistix').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpaygistix&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PaygistixMain();
			}
    	});
		$('#acceptglobal').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptglobal&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.GlobalMain();
			}
    	});
		$('#acceptbtrans').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptbtrans&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.BtransMain();
			}
    	});
		$('#acceptbsa').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptbsa&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.BsaMain();
			}
    	});
		$('#acceptazul').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptazul&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.AzulMain();
			}
    	});
		$('#acceptquickpay').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptquickpay&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.QuickpayMain();
			}
    	});
		$('#acceptpaynl').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptpaynl&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.PaynlMain();
			}
    	});
		$('#acceptzaakpay').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var g = "f=statuschanged&id=" + F.id + "&name=acceptzaakpay&status=" + Estr;
	        OrderNotification.ChangeStatus(g);
			if(Estr=="true"){
			OrderNotification.ZaakpayMain();
			}
    	});
	},
	ChangeStatus: function(g){
	
		$.post("lib/order_notification.php", g, function (b) {
			if(b){
				
				$.fn.jAlert({ //create an alert
					'title': 'Confirmation',
					'message': 'Succesfully Updated',
					'closeBtn': false,
					'onOpen': function(alert){ //when the alert opens
						//alert.closeAlert(false); //the false means don't remove it, just hide it.
						setTimeout(function(){ alert.closeAlert(); }, 1000);
					}
				});
				
				OrderNotification.Main();
			}			
		});
	},
	/*EMAIL Settings*/
	EmailMain: function(){
		$.post("lib/order_notification.php", "f=FetchDataEmailNotification&id="+Business.id, function (b) {			
			OrderNotification.EmailForm(JSON.parse(b));
		});
	},
	EmailForm: function(b){
		Forms.Clean("email", "popupmainbuttonok");

        if (b) {
            Forms.Form.email.type = "modify";  
            Forms.Form.email.id = b.id         
        } else {
            b = new Object();
            Forms.Form.email.type = "create";  
            Forms.CreateValue("email", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var n =''		
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_EMAIL_NOTIFICATION']?></h3>'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Email Id *</label>'
		n +=Forms.CreateInputPropertyPopup("email", "email", Main.NullToEmpty(b.email), true,"")
		//n +='<input type="text" class="form-control" placeholder="">'
		
		
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.EmailSave()"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		

		Popup.Show(n)
	},
	EmailSave: function(){		
		$.post("lib/order_notification.php", "f=SaveEmail&data=" + JSON.stringify(Forms.Form.email), function (a) {
			 Popup.Close();
			OrderNotification.Main();
		});
	},
	/*EMAIL Settings*/
	/*GPRS Settings*/
	GprsMain: function(){
		/*$.post("lib/order_notification.php", "f=FetchBusinessGprsDataByID&id="+Business.id, function (b) {			
			OrderNotification.GprsForm(JSON.parse(b));
			//alert(b);
		});*/
		$.post("lib/order_notification.php", "f=FetchAllPrinterModel", function (mm) {
		mm = JSON.parse(mm);
		  //  PrinterSet.AllModel = new Array();
		  
		  
		  var i = new Array();
		i.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_CHOOSE_MODEL']?>"}'));
			
			 for (var E in mm) {
                var y = new Object();
                y.id = mm[E].id;
                y.caption = mm[E].model_name;
               // PrinterSet.AllModel.push(y);
			   i.push(y);
            }
			OrderNotification.AllModel = i;
		});
		$.post("lib/order_notification.php", "f=FetchPrinterData&id="+Business.id, function (b) {

         	OrderNotification.GprsForm(b);
    
		});
		
	},
	GprsForm: function(b){
		//alert(b);
		 Forms.Clean("printer", "mainbuttonok");
		if (b) {
            Forms.Form.printer.type = "modify";  
            Forms.Form.printer.id = Business.id        
        } 
	
		v = JSON.parse(b);
		//alert(v[0].printer_model);
		
		var n =''
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_GPRS_SMS_PRINTERS']?></h3>'
		n +='<div class="row">'
		n +='<div class="col-md-6">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_PORT']?></label>'
		n +='<input type="text" class="form-control" value="'+v[0].apn+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-6-->
		n +='<div class="col-md-6">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SERVER_IP']?></label>'
		n +='<input type="text" class="form-control" value="'+v[0].sip+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-6-->
		n +='</div>'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_PRINTER_FILE_PATH']?></label>'
		n +='<input type="text" class="form-control" value="'+Main.NullToEmpty(v[0].pfp)+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_CONFIRMATION_FILE_PATH']?></label>'
		n +='<input type="text" class="form-control" value="'+Main.NullToEmpty(v[0].cfp)+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SET_PRINTER_MODEL']?> </label>'
		n +=Forms.SelectInputProperty_p("printer", "printer_model",OrderNotification.AllModel, v[0].printer_model,false, "", true)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="splitcase_text6" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SELECT_AT_LIST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		
		
		
			
		
		<!--row--> 
			n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.printersave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row--> 
		n +='</div>'

		Popup.Show(n)
	},
	/*GPRS Settings*/
	/*Sms Settings*/
	SmsMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessSmsDataByID&id="+Business.id, function (b) {			
			OrderNotification.SmsForm(JSON.parse(b));
		});
	},
	
	PreValid: function (){
		
	
		if(document.getElementById("printer_model").value == "-1"){            
            $("#splitcase_text6").show();
         
        }else{
            $("#splitcase_text6").hide();
           
        }
	},
	
	
	SmsForm: function(b){
		Forms.Clean("sms", "popupmainbuttonok");

        if (b) {
            Forms.Form.sms.type = "modify";  
            Forms.Form.sms.id = b.id         
        } else {
            b = new Object();
            Forms.Form.sms.type = "create";  
            Forms.CreateValue("sms", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n =''
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SMS_NOTIFICATION']?></h3>'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_TWILIO_NO']?></label>'
		n +=Forms.CreateInputPropertyPopup("sms", "twiliophone", Main.NullToEmpty(b.twiliophone), true,"")
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_MOBILE']?></label>'
		n +=Forms.CreateInputPropertyPopup("sms", "cel", Main.NullToEmpty(b.cel), true,"")		
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.SmsSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	},
	SmsSave: function(){		
		$.post("lib/order_notification.php", "f=SaveSms&data=" + JSON.stringify(Forms.Form.sms), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
	},
	/*Sms Settings*/
	printersave: function(){		
			var printer_model = document.getElementById("printer_model").value;	
			$.post("lib/order_notification.php", "f=Saveprinter&data=" + printer_model+"&id="+Business.id, function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
	},

	/*Paypal*/
	PaypalMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaypalDataByID&id="+Business.id, function (b) {					
			OrderNotification.PaypalForm(JSON.parse(b));
		});
	},
	PaypalForm: function(F){
		Forms.Clean("paypal", "popupmainbuttonok");

        if (F) {
            Forms.Form.paypal.type = "modify";  
            Forms.Form.paypal.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paypal.type = "create";  
            Forms.CreateValue("paypal", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n =''
        n +='<h3 class="popup-heading"> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_CARD_ONLINR']?> </h3>'
		
		var pm="";
        pm ='[{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_sandbox']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_LIVE']?>"}]';
        pm = JSON.parse(pm);
		
		n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("paypal", "paypal_type",pm, F.paypal_type, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYPAL_EMAIL_ID']?></label>'
        n +=Forms.CreateInputPropertyPopup("paypal", "paypal", F.paypal, false,"OrderNotification.PreValidate()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypal_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_EMAIL_IS_REQUIRED']?></small>'
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypal_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_INVALID_EMAIL']?> </small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  
		
		 //var b = [{id:'',caption:'Please select'},{id:'USD',caption:'U.S. Dollar'},{id:'EUR',caption:'Euro'},{id:'MXN',caption:'Mexican Peso'},{id:'AUD',caption:'Australian Dollar'},{id:'BRL',caption:'Brazilian Real'},{id:'CAD',caption:'Canadian Dollar'},{id:'CZK',caption:'Czech Koruna'},{id:'DKK',caption:'Danish Krone'},{id:'HKD',caption:'Hong Kong Dollar'},{id:'HUF',caption:'Hungarian Forint'},{id:'ILS',caption:'Israeli New Sheqel'},{id:'JPY',caption:'Japanese Yen'},{id:'MYR',caption:'Malaysian Ringgit'},{id:'NOK',caption:'Norwegian Krone'},{id:'NZD',caption:'New Zealand Dollar'},{id:'PHP',caption:'Philippine Peso'},{id:'PLN',caption:'Polish Zloty'},{id:'GBP',caption:'Pound Sterling'},{id:'SGD',caption:'Singapore Dollar'},{id:'SEK',caption:'Swedish Krona'},{id:'CHF',caption:'Swiss Franc'},{id:'TWD',caption:'Taiwan New Dollar'},{id:'THB',caption:'Thai Baht'},{id:'TRY',caption:'Turkish Lira'},{id:'NOTSUPPORTEDBYPAYPAL',caption:'Other: Not supported by paypal'}];
		 var b = [{id:'',caption:'Please select'},
{id:'ALL',caption:'Albania Lek (Lek)'},
{id:'AFN',caption:'Afghanistan Afghani (؋)'},
{id:'ARS',caption:'Argentina Peso ($)'},
{id:'AWG',caption:'Aruba Guilder (ƒ)'},
{id:'AUD',caption:'Australia Dollar ($)'},
{id:'AZN',caption:'Azerbaijan New Manat (ман)'},
{id:'BSD',caption:'Bahamas Dollar ($)'},
{id:'BBD',caption:'Barbados Dollar ($)'},
{id:'BYR',caption:'Belarus Ruble (p.)'},
{id:'BZD',caption:'Belize Dollar (BZ$)'},
{id:'BMD',caption:'Bermuda Dollar ($)'},
{id:'BOB',caption:'Bolivia Boliviano ($b)'},
{id:'BAM',caption:'Bosnia and Herzegovina Convertible Marka (KM)'},
{id:'BWP',caption:'Botswana Pula (P)'},
{id:'BGN',caption:'Bulgaria Lev (лв)'},
{id:'BRL',caption:'Brazil Real (R$)'},
{id:'BND',caption:'Brunei Darussalam Dollar ($)'},
{id:'KHR',caption:'Cambodia Riel (៛)'},
{id:'CAD',caption:'Canada Dollar ($)'},
{id:'KYD',caption:'Cayman Islands Dollar ($)'},
{id:'CLP',caption:'Chile Peso ($)'},
{id:'CNY',caption:'China Yuan Renminbi (¥)'},
{id:'COP',caption:'Colombia Peso ($)'},
{id:'CRC',caption:'Costa Rica Colon (₡)'},
{id:'HRK',caption:'Croatia Kuna (kn)'},
{id:'CUP',caption:'Cuba Peso (₱)'},
{id:'CZK',caption:'Czech Republic Koruna (Kč)'},
{id:'DKK',caption:'Denmark Krone (kr)'},
{id:'DOP',caption:'Dominican Republic Peso (RD$)'},
{id:'XCD',caption:'East Caribbean Dollar ($)'},
{id:'EGP',caption:'Egypt Pound (Egp)'},
{id:'SVC',caption:'El Salvador Colon ($)'},
{id:'EEK',caption:'Estonia Kroon (kr)'},
{id:'EUR',caption:'Euro Member Countries (€)'},
{id:'FKP',caption:'Falkland Islands (Malvinas) Pound (£)'},
{id:'FJD',caption:'Fiji Dollar ($)'},
{id:'FCFA',caption:'Franc (CFA)'},
{id:'GHC',caption:'Ghana Cedi (¢)'},
{id:'GIP',caption:'Gibraltar Pound (£)'},
{id:'GTQ',caption:'Guatemala Quetzal (Q)'},
{id:'GGP',caption:'Guernsey Pound (£)'},
{id:'GYD',caption:'Guyana Dollar ($)'},
{id:'HNL',caption:'Honduras Lempira (L)'},
{id:'HKD',caption:'Hong Kong Dollar ($)'},
{id:'HUF',caption:'Hungary Forint (Ft)'},
{id:'ISK',caption:'Iceland Krona (kr)'},
{id:'INR',caption:'India Rupee (रु)'},
{id:'IDR',caption:'Indonesia Rupiah (Rp)'},
{id:'IRR',caption:'Iran Rial (﷼)'},
{id:'IQD',caption:'Iraqi Dinar (د.ع)'},
{id:'IMP',caption:'Isle of Man Pound (£)'},
{id:'ILS',caption:'Israel Shekel (₪)'},
{id:'JMD',caption:'Jamaica Dollar (J$)'},
{id:'JPY',caption:'Japan Yen (¥)'},
{id:'JEP',caption:'Jersey Pound (£)'},
{id:'JOD',caption:'Jordanian Dinar (JOD)'},
{id:'KZT',caption:'Kazakhstan Tenge (лв)'},
{id:'KPW',caption:'Korea (North) Won (₩)'},
{id:'KRW',caption:'Korea (South) Won (₩)'},
{id:'KGS',caption:'Kyrgyzstan Som (лв)'},
{id:'LAK',caption:'Laos Kip (₭)'},
{id:'LVL',caption:'Latvia Lat (Ls)'},
{id:'LBP',caption:'Lebanon Pound (£)'},
{id:'LRD',caption:'Liberia Dollar ($)'},
{id:'LYD',caption:'Libyan Dinar (LYD)'},
{id:'LTL',caption:'Lithuania Litas (Lt)'},
{id:'MKD',caption:'Macedonia Denar (ден)'},
{id:'MLD',caption:'Moldovan Leu(MLD)'},
{id:'MYR',caption:'Malaysia Ringgit (RM)'},
{id:'MUR',caption:'Mauritius Rupee (₨)'},
{id:'MXN',caption:'Mexico Peso ($)'},
{id:'MNT',caption:'Mongolia Tughrik (₮)'},
{id:'MZN',caption:'Mozambique Metical(MT)'},
{id:'NAD',caption:'Namibia Dollar ($)'},
{id:'NPR',caption:'Nepal Rupee (₨)'},
{id:'ANG',caption:'Netherlands Antilles Guilder (ƒ)'},
{id:'NZD',caption:'New Zealand Dollar ($)'},
{id:'NIO',caption:'Nicaragua Cordoba (C$)'},
{id:'NGN',caption:'Nigeria Naira (₦)'},
{id:'NOK',caption:'Norway Krone (kr)'},
{id:'OMR',caption:'Oman Rial (﷼)'},
{id:'PKR',caption:'Pakistan Rupee (₨)'},
{id:'PAB',caption:'Panama Balboa (B/.)'},
{id:'PYG',caption:'Paraguay Guarani (Gs)'},
{id:'PEN',caption:'Peru Nuevo Sol (S/.)'},
{id:'PHP',caption:'Philippines Peso (₱)'},
{id:'PLN',caption:'Polish Zloty (zł)'},
{id:'QAR',caption:'Qatar Riyal (﷼)'},
{id:'RON',caption:'Romania New Leu (lei)'},
{id:'RUB',caption:'Russia Ruble (руб)'},
{id:'SHP',caption:'Saint Helena Pound (£)'},
{id:'SAR',caption:'Saudi Arabia Riyal (﷼)'},
{id:'RSD',caption:'Serbia Dinar (Дин.)'},
{id:'SCR',caption:'Seychelles Rupee (₨)'},
{id:'SGD',caption:'Singapore Dollar ($)'},
{id:'SBD',caption:'Solomon Islands Dollar ($)'},
{id:'SOS',caption:'Somalia Shilling(S)'},
{id:'ZAR',caption:'South African Currency(R)'},
{id:'LKR',caption:'Sri Lanka Rupee (₨)'},
{id:'SEK',caption:'Sweden Krona (kr)'},
{id:'CHF',caption:'Switzerland Franc (CHF)'},
{id:'SRD',caption:'Suriname Dollar ($)'},
{id:'SYP',caption:'Syria Pound (£)'},
{id:'TWD',caption:'Taiwan New Dollar (NT$)'},
{id:'THB',caption:'Thailand Baht (฿)'},
{id:'TTD',caption:'Trinidad and Tobago Dollar (TT$)'},
{id:'TRY',caption:'Turkey Lira (₤)'},
{id:'TVD',caption:'Tuvalu Dollar ($)'},
{id:'UAH',caption:'Ukraine Hryvnia (₴)'},
{id:'GBP',caption:'United Kingdom Pound (£)'},
{id:'USD',caption:'United States Dollar ($)'},
{id:'UYU',caption:'Uruguay Peso ($U)'},
{id:'UZS',caption:'Uzbekistan Som (cym)'},
{id:'VEF',caption:'Venezuela Bolivar (Bs)'},
{id:'VND',caption:'Viet Nam Dong (₫)'},
{id:'YER',caption:'Yemen Rial (﷼)'},
{id:'ZWD',caption:'Zimbabwe Dollar (Z$)'}];
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_CURRENCY']?></label>'	
		n +=Forms.CreateSelectPropertyPopup("paypal", "paypalcurrency", b, F.paypalcurrency, false)		
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypalcurrency_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_ONE_OPTION']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PaypalSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n)
       
	},

	/*********validate popup Fields***************/
	PreValidate: function (){
		var count = 0;
		if(document.getElementById("paypal").value == ""){            
            $("#paypal_text").show();
            $("#paypal").addClass("error-text-field");
            $("#paypal").removeClass("success-text-field");
           count++;
        }else{
            $("#paypal_text").hide();
            $("#paypal").addClass("success-text-field");
            $("#paypal").removeClass("error-text-field");
        }
		var email = document.getElementById("paypal").value;
		var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(email).match(emailReg)){
            $("#paypal_text1").show();
            $("#paypal2").addClass("error-text-field");
            $("#paypal2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#paypal_text1").hide();
            $("#paypal2").addClass("error-text-field");
            $("#paypal2").removeClass("success-text-field");
		}
		

		
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	
	PaypalSave: function(){
		if(OrderNotification.PreValidate() == false){
			return
		}
		$.post("lib/order_notification.php", "f=SavePaypal&data=" + JSON.stringify(Forms.Form.paypal), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
	},
	/*Paypal*/

	/*Paypal Adaptive*/
	PaypalAdaptiveMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaypalAdaptiveDataByID&id="+Business.id, function (b) {					
			OrderNotification.PaypalAdaptiveForm(JSON.parse(b));
		});
	},
	PaypalAdaptiveForm:function(F){

		Forms.Clean("paypaladaptive", "popupmainbuttonok");
		
        if (F.id) {
            Forms.Form.paypaladaptive.type = "modify";  
            Forms.Form.paypaladaptive.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paypaladaptive.type = "create";                      
        }
        Forms.CreateValue("paypaladaptive", "bus_id", Business.id, false, true, true)
		
		var n ='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYPAL_ADAPTIVE']?></h3>'

		n +='<div class="row">'

		b = '{"id":"-1","caption":""},'
        g = "[" + b + '{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_No']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_YES_DEFAULT']?>"},{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_YES_CUSTOM']?>"}]';
        g = JSON.parse(g);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SPLIT_PAYMENT']?> *</label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "splitcase", g, F.splitcase, true, "OrderNotification.SplitType(this.value);OrderNotification.PreValidate2()", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="splitcase_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		if(Forms.Form.paypaladaptive.type == "modify"){
        	OrderNotification.SplitType(F.splitcase);
    	}

		n +='<div id="split_change">'
		n +='</div>'
		

		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PaypalAdaptiveSave()"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
           
	},
	SplitType: function(value){		
    	$.post("lib/order_notification.php", "f=FetchBusinessPaypalAdaptiveDataByID&id="+Business.id, function (b) {					
			OrderNotification.SplitChange(JSON.parse(b),value);
		});
    },
	SplitChange: function(F,value){
		
		var n =''
		if(value == 1 || value == 2){
		n +='<div class="row">'

		p = '{"id":"-1","caption":"<?=$lang_resource['CITY_SUPER_SELECT']?>"},'
        m = "[" + p + '{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_YES']?>"},{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_No']?>"}]';
        m = JSON.parse(m);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_MAIL_TO_RECIEVE_PAYMENTS']?> *</label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "paymail", m, F.paymail, true,"OrderNotification.PreValidate2()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paymail_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_EMAIL']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "payadaptivemail", F.payadaptivemail, true,"OrderNotification.PreValidate2()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payadaptivemail_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_EMAIL_REQUIRED']?></small>'
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payadaptivemail_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INVALID_EMAIL']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		}
		if(value == 2){

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_PERCENT_COMMISION']?> *</label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "com_per", F.com_per, true,"OrderNotification.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="com_per_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_PERCENTAGE_COMMISION_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_FIXEDRATE_COMMISION']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "com_rate", F.com_rate, true,"OrderNotification.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="com_rate_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_FIXEDRATE_COMMISION_REQUIRED']?></small>'  
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		n +='<div class="row">'

		j = '{"id":"-1","caption":"<?=$lang_resource['CITY_SUPER_SELECT']?>"},'
        itax = "[" + p + '{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_No']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_YES_CITY_TAX']?>"},{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_CUSTOM']?>"}]';
        itax = JSON.parse(itax);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_INCLUDING_TAX']?></label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "tax", itax, F.tax, false, "OrderNotification.TaxType(this.value);OrderNotification.PreValidate2()", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="tax_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INCLUDING_TAX_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		if(Forms.Form.paypaladaptive.type == "modify"){
        	OrderNotification.TaxType(F.tax);
    	}

		n +='<div id="tax_part">'
		n +='</div>'

		}

		$("#split_change").empty().append(n);
	},
	TaxType: function(value){		
    	$.post("lib/order_notification.php", "f=FetchBusinessPaypalAdaptiveDataByID&id="+Business.id, function (b) {					
			OrderNotification.TaxChange(JSON.parse(b),value);
		});
    },
    TaxChange: function(F,value){

    	var n =''
    	if(value == 2){
    	n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_CUSTOM']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "custom", F.custom, true,"OrderNotification.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="custom_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INCLUDING_TAX_REQUIRED']?></small>'  
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		}

    	$("#tax_part").empty().append(n);
    },
	
	PreValidate2: function (){

		var count = 0;
		if(document.getElementById("splitcase").value == "-1"){            
            $("#splitcase_text").show();
            $("#splitcase").addClass("error-text-field");
            $("#splitcase").removeClass("success-text-field");
           count++;
        }else{
            $("#splitcase_text").hide();
            $("#splitcase").addClass("success-text-field");
            $("#splitcase").removeClass("error-text-field");
        }
		
			if(document.getElementById("splitcase").value==1){
			if(document.getElementById("paymail").value == "-1"){            
            $("#paymail_text").show();
            $("#paymail").addClass("error-text-field");
            $("#paymail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#paymail_text").hide();
            $("#paymail").addClass("success-text-field");
            $("#paymail").removeClass("error-text-field");
        }
		if(document.getElementById("payadaptivemail").value == ""){            
            $("#payadaptivemail_text").show();
            $("#payadaptivemail").addClass("error-text-field");
            $("#payadaptivemail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#payadaptivemail_text").hide();
            $("#payadaptivemail").addClass("success-text-field");
            $("#payadaptivemail").removeClass("error-text-field");
        }
		var emailada = document.getElementById("payadaptivemail").value;
		var emailRegada = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(emailada).match(emailRegada)){
            $("#payadaptivemail_text1").show();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#payadaptivemail_text1").hide();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
		}
		
		
	}
		if(document.getElementById("splitcase").value==2){
			if(document.getElementById("paymail").value == "-1"){            
            $("#paymail_text").show();
            $("#paymail").addClass("error-text-field");
            $("#paymail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#paymail_text").hide();
            $("#paymail").addClass("success-text-field");
            $("#paymail").removeClass("error-text-field");
        }
		if(document.getElementById("payadaptivemail").value == ""){            
            $("#payadaptivemail_text").show();
            $("#payadaptivemail").addClass("error-text-field");
            $("#payadaptivemail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#payadaptivemail_text").hide();
            $("#payadaptivemail").addClass("success-text-field");
            $("#payadaptivemail").removeClass("error-text-field");
        }
		var emailada = document.getElementById("payadaptivemail").value;
		var emailRegada = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(emailada).match(emailRegada)){
            $("#payadaptivemail_text1").show();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#payadaptivemail_text1").hide();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
		}
		if(document.getElementById("com_per").value == ""){            
            $("#com_per_text").show();
            $("#com_per").addClass("error-text-field");
            $("#com_per").removeClass("success-text-field");
           count++;
        }else{
			
            $("#com_per_text").hide();
            $("#com_per").addClass("success-text-field");
            $("#com_per").removeClass("error-text-field");
        }
		if(document.getElementById("com_rate").value == ""){            
            $("#com_rate_text").show();
            $("#com_rate").addClass("error-text-field");
            $("#com_rate").removeClass("success-text-field");
           count++;
        }else{
			
            $("#com_rate_text").hide();
            $("#com_rate").addClass("success-text-field");
            $("#com_rate").removeClass("error-text-field");
        }
		if(document.getElementById("tax").value == "-1"){            
            $("#tax_text").show();
            $("#tax").addClass("error-text-field");
            $("#tax").removeClass("success-text-field");
           count++;
        }else{
			
            $("#tax_text").hide();
            $("#tax").addClass("success-text-field");
            $("#tax").removeClass("error-text-field");
        }
		if(document.getElementById("tax").value == "2"){ 
		if(document.getElementById("custom").value == ""){            
            $("#custom_text").show();
            $("#custom").addClass("error-text-field");
            $("#custom").removeClass("success-text-field");
           count++;
        }else{
			
            $("#custom_text").hide();
            $("#custom").addClass("success-text-field");
            $("#custom").removeClass("error-text-field");
        }
		}
		}
		
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
    PaypalAdaptiveSave: function(){
		if(OrderNotification.PreValidate2() == false){
			return
		}
    	
		$.post("lib/order_notification.php", "f=SavePaypalAdaptive&data=" + JSON.stringify(Forms.Form.paypaladaptive), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
	},
	/*Paypal Adaptive*/

	/*Authorize*/
	AuthorizeMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessAuthorizeDataByID&id="+Business.id, function (b) {					
			OrderNotification.AuthorizeForm(JSON.parse(b));
		});
	},
	AuthorizeForm: function(F){
		Forms.Clean("authorize", "popupmainbuttonok");

        if (F) {
            Forms.Form.authorize.type = "modify";  
            Forms.Form.authorize.id = F.id         
        } else {
            F = new Object();
            Forms.Form.authorize.type = "create";  
            Forms.CreateValue("authorize", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var n =''
        n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Authorize']?></h3>'

        var pa="";
        pa ='[{"id":"0","caption":"Test"},{"id":"1","caption":"Secure"}]';
        pa = JSON.parse(pa);

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("authorize", "payment_type", pa, F.payment_type, false, "", false)
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL']?></label>'
        n +=Forms.CreateInputPropertyPopup("authorize", "aplid", F.aplid, false,"OrderNotification.PreValidate3()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="aplid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL_REQUIRED']?></small>' 
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY']?></label>'
        n +=Forms.CreateInputPropertyPopup("authorize", "tkey", F.tkey, false,"OrderNotification.PreValidate3()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="tkey_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.AuthorizeSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n)
  
	},
	
	PreValidate3: function (){
		var count = 0;
		if(document.getElementById("aplid").value == ""){            
            $("#aplid_text").show();
            $("#aplid").addClass("error-text-field");
            $("#aplid").removeClass("success-text-field");
           count++;
        }else{
            $("#aplid_text").hide();
            $("#aplid").addClass("success-text-field");
            $("#aplid").removeClass("error-text-field");
        }
		if(document.getElementById("tkey").value == ""){            
            $("#tkey_text").show();
            $("#tkey").addClass("error-text-field");
            $("#tkey").removeClass("success-text-field");
           count++;
        }else{
            $("#tkey_text").hide();
            $("#tkey").addClass("success-text-field");
            $("#tkey").removeClass("error-text-field");
        }
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	
	AuthorizeSave: function(){
    	if(OrderNotification.PreValidate3() == false){
			return
		}
		$.post("lib/order_notification.php", "f=SaveAuthorize&data=" + JSON.stringify(Forms.Form.authorize), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
	},
	/*Authorize*/
	/*Braintree*/
	BraintreeMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessBraintreeDataByID&id="+Business.id, function (b) {					
			OrderNotification.BraintreeForm(JSON.parse(b));
		});
	},
	BraintreeForm: function(F){
		Forms.Clean("braintree", "popupmainbuttonok");

        if (F) {
            Forms.Form.braintree.type = "modify";  
            Forms.Form.braintree.id = F.id         
        } else {
            F = new Object();
            Forms.Form.braintree.type = "create";  
            Forms.CreateValue("braintree", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var ba="";
        ba ='[{"id":"0","caption":"sandbox"},{"id":"1","caption":"live"}]';
        ba = JSON.parse(ba);

        var n =''
        n +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY']?></h3>'
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("braintree", "environment", ba, F.environment, false, "", false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID']?></label>'
        n +=Forms.CreateInputPropertyPopup("braintree", "merchant_id", F.merchant_id, false,"OrderNotification.PreValidate4()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="merchant_id_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY']?></label>'
        n +=Forms.CreateInputPropertyPopup("braintree", "public_key", F.public_key, false,"OrderNotification.PreValidate4()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="public_key_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY']?></label>'
        n +=Forms.CreateInputPropertyPopup("braintree", "private_key", F.private_key, false,"OrderNotification.PreValidate4()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="private_key_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PRIVATE_KEY_IS_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->  
        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.BraintreeSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n)

    },
	PreValidate4: function (){
		var count = 0;
		if(document.getElementById("merchant_id").value == ""){            
            $("#merchant_id_text").show();
            $("#merchant_id").addClass("error-text-field");
            $("#merchant_id").removeClass("success-text-field");
           count++;
        }else{
            $("#merchant_id_text").hide();
            $("#merchant_id").addClass("success-text-field");
            $("#merchant_id").removeClass("error-text-field");
        }
		if(document.getElementById("public_key").value == ""){            
            $("#public_key_text").show();
            $("#public_key").addClass("error-text-field");
            $("#public_key").removeClass("success-text-field");
           count++;
        }else{
            $("#public_key_text").hide();
            $("#public_key").addClass("success-text-field");
            $("#public_key").removeClass("error-text-field");
        }
		if(document.getElementById("private_key").value == ""){            
            $("#private_key_text").show();
            $("#private_key").addClass("error-text-field");
            $("#private_key").removeClass("success-text-field");
           count++;
        }else{
            $("#private_key_text").hide();
            $("#private_key").addClass("success-text-field");
            $("#private_key").removeClass("error-text-field");
        }
		if(count == 0)
        	return true
        else 
        	return false
		
	},
    BraintreeSave: function(){
		if(OrderNotification.PreValidate4() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveBraintree&data=" + JSON.stringify(Forms.Form.braintree), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	/*Braintree*/

	/*Mercado Pago*/
	MarcoMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessMarcoDataByID&id="+Business.id, function (b) {					
			OrderNotification.MarcoForm(JSON.parse(b));
		});
	},
	MarcoForm: function(F){
		Forms.Clean("marco", "popupmainbuttonok");

        if (F) {
            Forms.Form.marco.type = "modify";  
            Forms.Form.marco.id = F.id         
        } else {
            F = new Object();
            Forms.Form.marco.type = "create";  
            Forms.CreateValue("marco", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_MERCADO_PAGO']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['MERCO_CLIENT_KEY']?></label>'
		n +=Forms.CreateInputPropertyPopup("marco", "clientkey", F.clientkey, false,"OrderNotification.PreValidate5()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="clientkey_text" style="color:#F00;display:none;"><?=$lang_resource['MERCO_CLIENT_KEY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['MERCO_SECRET_KEY']?></label>'
		n +=Forms.CreateInputPropertyPopup("marco", "secretkey", F.secretkey, false,"OrderNotification.PreValidate5()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['MERCO_SECRET_KEY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->  
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.MarcoSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate5: function (){
		var count = 0;
		if(document.getElementById("clientkey").value == ""){            
            $("#clientkey_text").show();
            $("#clientkey").addClass("error-text-field");
            $("#clientkey").removeClass("success-text-field");
           count++;
        }else{
            $("#clientkey_text").hide();
            $("#clientkey").addClass("success-text-field");
            $("#clientkey").removeClass("error-text-field");
        }
		if(document.getElementById("secretkey").value == ""){            
            $("#secretkey_text").show();
            $("#secretkey").addClass("error-text-field");
            $("#secretkey").removeClass("success-text-field");
           count++;
        }else{
            $("#secretkey_text").hide();
            $("#secretkey").addClass("success-text-field");
            $("#secretkey").removeClass("error-text-field");
        }
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	MarcoSave: function(){
		if(OrderNotification.PreValidate5() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveMarco&data=" + JSON.stringify(Forms.Form.marco), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	/*Mercado Pago*/
	
	
	/** Mercury Payment**/
	MercuryMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessMercuryDataByID&id="+Business.id, function (b) {					
			OrderNotification.MercuryForm(JSON.parse(b));
		});
	},
	
	MercuryForm: function(F){
		Forms.Clean("mercury", "popupmainbuttonok");

        if (F) {
            Forms.Form.mercury.type = "modify";  
            Forms.Form.mercury.id = F.id         
        } else {
            F = new Object();
            Forms.Form.mercury.type = "create";  
            Forms.CreateValue("mercury", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['MERCURY_PAYMENT_HEADER']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Merchant Id</label>'
		n +=Forms.CreateInputPropertyPopup("mercury", "mercury_id", F.mercury_id, false,"OrderNotification.PreValidate6()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="mercury_id_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Merchant Password </label>'
		n +=Forms.CreateInputPropertyPopup("mercury", "mercury_pass", F.mercury_pass, false,"OrderNotification.PreValidate6()",'',true)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="mercury_pass_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->  
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.MercurySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate6: function (){
		var count = 0;
		if(document.getElementById("mercury_id").value == ""){            
            $("#mercury_id_text").show();
            $("#mercury_id").addClass("error-text-field");
            $("#mercury_id").removeClass("success-text-field");
           count++;
        }else{
            $("#mercury_id_text").hide();
            $("#mercury_id").addClass("success-text-field");
            $("#mercury_id").removeClass("error-text-field");
        }
		if(document.getElementById("mercury_pass").value == ""){            
            $("#mercury_pass_text").show();
            $("#mercury_pass").addClass("error-text-field");
            $("#mercury_pass").removeClass("success-text-field");
           count++;
        }else{
            $("#mercury_pass_text").hide();
            $("#mercury_pass").addClass("success-text-field");
            $("#mercury_pass").removeClass("error-text-field");
        }
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	MercurySave: function(){
		if(OrderNotification.PreValidate6() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveMercury&data=" + JSON.stringify(Forms.Form.mercury), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	/** Mercury Payment**/
	
	/** World  Pay**/
	WorldpayMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessWolrdPayDataByID&id="+Business.id, function (b) {					
			OrderNotification.WorldPayForm(JSON.parse(b));
		});
	},
	
	WorldPayForm: function(F){
		Forms.Clean("worldpay", "popupmainbuttonok");

        if (F) {
            Forms.Form.worldpay.type = "modify";  
            Forms.Form.worldpay.id = F.id         
        } else {
            F = new Object();
            Forms.Form.worldpay.type = "create";  
            Forms.CreateValue("worldpay", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['WORLDPAY_PAYMENT_HEADER']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_ID']?></label>'
		n +=Forms.CreateInputPropertyPopup("worldpay", "cardsaveid", F.cardsaveid, false,"OrderNotification.PreValidate7()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="cardsaveid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_ID_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_PASSWORD']?> </label>'
		n +=Forms.CreateInputPropertyPopup("worldpay", "cardsavepass", F.cardsavepass, false,"OrderNotification.PreValidate7()",'',true)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="cardsavepass_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_PASSWORD_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->  
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.WorldpaySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate7: function (){
		var count = 0;
		if(document.getElementById("cardsaveid").value == ""){            
            $("#cardsaveid_text").show();
            $("#cardsaveid").addClass("error-text-field");
            $("#cardsaveid").removeClass("success-text-field");
           count++;
        }else{
            $("#cardsaveid_text").hide();
            $("#cardsaveid").addClass("success-text-field");
            $("#cardsaveid").removeClass("error-text-field");
        }
		if(document.getElementById("cardsavepass").value == ""){            
            $("#cardsavepass_text").show();
            $("#cardsavepass").addClass("error-text-field");
            $("#cardsavepass").removeClass("success-text-field");
           count++;
        }else{
            $("#cardsavepass_text").hide();
            $("#cardsavepass").addClass("success-text-field");
            $("#cardsavepass").removeClass("error-text-field");
        }
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	WorldpaySave: function(){
		if(OrderNotification.PreValidate7() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveWorld&data=" + JSON.stringify(Forms.Form.worldpay), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	/** CardSave Payment**/
	
	/** Transactium  Pay**/
	TransactiumMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessTransactiumDataByID&id="+Business.id, function (d) {					
			OrderNotification.TransactiumForm(JSON.parse(d));
		});
	},
	TransactiumForm: function(F){
		Forms.Clean("transactium", "popupmainbuttonok");

        if (F) {
            Forms.Form.transactium.type = "modify";  
            Forms.Form.transactium.id = F.id         
        } else {
            F = new Object();
            Forms.Form.transactium.type = "create";  
            Forms.CreateValue("transactium", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Username</label>'
		n +=Forms.CreateInputPropertyPopup("transactium", "transactiumusername", F.transactiumusername, false,"OrderNotification.PreValidate8()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumusername_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_USERNAME_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_PASSWORD']?></label>'
		n +=Forms.CreateInputPropertyPopup("transactium", "transactiumpass", F.transactiumpass, false,"OrderNotification.PreValidate8()",'',true) 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumpass_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_PASSWORD_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_TAG']?></label>'
		n +=Forms.CreateInputPropertyPopup("transactium", "transactiumtag", F.transactiumtag, false,"PaymentGatewaySettings.PreValidate8()") 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumtag_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_TAG_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>' 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.TransactiumSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate8: function (){
		var count = 0;
		if(document.getElementById("transactiumusername").value == ""){            
            $("#transactiumusername_text").show();
            $("#transactiumusername").addClass("error-text-field");
            $("#transactiumusername").removeClass("success-text-field");
           count++;
        }else{
            $("#transactiumusername_text").hide();
            $("#transactiumusername").addClass("success-text-field");
            $("#transactiumusername").removeClass("error-text-field");
        }
		if(document.getElementById("transactiumpass").value == ""){            
            $("#transactiumpass_text").show();
            $("#transactiumpass").addClass("error-text-field");
            $("#transactiumpass").removeClass("success-text-field");
           count++;
        }else{
            $("#transactiumpass_text").hide();
            $("#transactiumpass").addClass("success-text-field");
            $("#transactiumpass").removeClass("error-text-field");
        }
		
		if(document.getElementById("transactiumtag").value == ""){            
            $("#transactiumtag_text").show();
            $("#transactiumtag").addClass("error-text-field");
            $("#transactiumtag").removeClass("success-text-field");
           count++;
        }else{
            $("#transactiumtag_text").hide();
            $("#transactiumtag").addClass("success-text-field");
            $("#transactiumtag").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	TransactiumSave: function(){
		if(OrderNotification.PreValidate8() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveTransactium&data=" + JSON.stringify(Forms.Form.transactium), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	
	
	/** PEXPRESS  Pay**/
	PexpressMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPexpressDataByID&id="+Business.id, function (d) {					
			OrderNotification.PexpressForm(JSON.parse(d));
		});
	},
	PexpressForm: function(F){
		
		Forms.Clean("pexpress", "popupmainbuttonok");

        if (F) {
            Forms.Form.pexpress.type = "modify";  
            Forms.Form.pexpress.id = F.id         
        } else {
            F = new Object();
            Forms.Form.pexpress.type = "create";  
            Forms.CreateValue("pexpress", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PEXPRESS_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PEXPRESS_PAY_USERNAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("pexpress", "pexpressusername", F.pexpressusername, false,"OrderNotification.PreValidate9()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="pexpressusername_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PEXPRESS_PAY_USERNAME_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PEXPRESS_PAY_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("pexpress", "pexpresspass", F.pexpresspass, false,"OrderNotification.PreValidate9()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="pexpresspass_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PEXPRESS_PAY_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PexpressSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PreValidate9: function (){
		var count = 0;
		if(document.getElementById("pexpressusername").value == ""){            
            $("#pexpressusername_text").show();
            $("#pexpressusername").addClass("error-text-field");
            $("#pexpressusername").removeClass("success-text-field");
           count++;
        }else{
            $("#pexpressusername_text").hide();
            $("#pexpressusername").addClass("success-text-field");
            $("#pexpressusername").removeClass("error-text-field");
        }
		if(document.getElementById("pexpresspass").value == ""){            
            $("#pexpresspass_text").show();
            $("#pexpresspass").addClass("error-text-field");
            $("#pexpresspass").removeClass("success-text-field");
           count++;
        }else{
            $("#pexpresspass_text").hide();
            $("#pexpresspass").addClass("success-text-field");
            $("#pexpresspass").removeClass("error-text-field");
        }
	
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	PexpressSave: function(){
		if(OrderNotification.PreValidate9() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SavePexpress&data=" + JSON.stringify(Forms.Form.pexpress), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	/** MAKESKESKUS  Pay**/
	MakeskeskusMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessMakeskeskusDataByID&id="+Business.id, function (d) {					
			OrderNotification.MakeskeskusForm(JSON.parse(d));
		});
	},
	MakeskeskusForm: function(F){
		
		Forms.Clean("maksekeskus", "popupmainbuttonok");

        if (F) {
            Forms.Form.maksekeskus.type = "modify";  
            Forms.Form.maksekeskus.id = F.id         
        } else {
            F = new Object();
            Forms.Form.maksekeskus.type = "create";  
            Forms.CreateValue("maksekeskus", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("maksekeskus", "maksekeskus_pay", m,F.maksekeskus_pay, false,"OrderNotification.PreValidate10()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="maksekeskus_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_SHOP']?></label>'
		htms +=Forms.CreateInputPropertyPopup("maksekeskus", "maksekeskus_shopid", F.maksekeskus_shopid, false,"OrderNotification.PreValidate10()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="maksekeskus_shopid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_SHOP_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_SECRET']?></label>'
		htms +=Forms.CreateInputPropertyPopup("maksekeskus", "maksekeskus_secretkey", F.maksekeskus_secretkey, false,"OrderNotification.PreValidate10()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="maksekeskus_secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_SECRET_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.MakeskeskusSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PreValidate10: function (){
		var count = 0;
		
		if(document.getElementById("maksekeskus_pay").value == "-1"){            
            $("#maksekeskus_pay_text").show();
            $("#maksekeskus_pay").addClass("error-text-field");
            $("#maksekeskus_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#maksekeskus_pay_text").hide();
            $("#maksekeskus_pay").addClass("success-text-field");
            $("#maksekeskus_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("maksekeskus_shopid").value == ""){            
            $("#maksekeskus_shopid_text").show();
            $("#maksekeskus_shopid").addClass("error-text-field");
            $("#maksekeskus_shopid").removeClass("success-text-field");
           count++;
        }else{
            $("#maksekeskus_shopid_text").hide();
            $("#maksekeskus_shopid").addClass("success-text-field");
            $("#maksekeskus_shopid").removeClass("error-text-field");
        }
		if(document.getElementById("maksekeskus_secretkey").value == ""){            
            $("#maksekeskus_secretkey_text").show();
            $("#maksekeskus_secretkey").addClass("error-text-field");
            $("#maksekeskus_secretkey").removeClass("success-text-field");
           count++;
        }else{
            $("#maksekeskus_secretkey_text").hide();
            $("#maksekeskus_secretkey").addClass("success-text-field");
            $("#maksekeskus_secretkey").removeClass("error-text-field");
        }
	
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	MakeskeskusSave: function(){
		if(OrderNotification.PreValidate10() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveMakeskeskus&data=" + JSON.stringify(Forms.Form.maksekeskus), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	
	
	
	
	/** VOGUE  Pay**/
	VoguepayMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessVoguepayDataByID&id="+Business.id, function (d) {					
			OrderNotification.VogueForm(JSON.parse(d));
		});
	},
	VogueForm: function(F){
		
		Forms.Clean("voguepay", "popupmainbuttonok");

        if (F) {
            Forms.Form.voguepay.type = "modify";  
            Forms.Form.voguepay.id = F.id         
        } else {
            F = new Object();
            Forms.Form.voguepay.type = "create";  
            Forms.CreateValue("voguepay", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("voguepay", "vogue_pay", m,F.vogue_pay, false,"OrderNotification.PreValidate11()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="vogue_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_VOGUEPAY_PAY_MERCHANT']?></label>'
		htms +=Forms.CreateInputPropertyPopup("voguepay", "vogue_merchant_id", F.vogue_merchant_id, false,"OrderNotification.PreValidate11()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="vogue_merchant_id_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_VOGUEPAY_PAY_MERCHANT_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.VogueSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	PreValidate11: function (){
		var count = 0;
		
		if(document.getElementById("vogue_pay").value == "-1"){            
            $("#vogue_pay_text").show();
            $("#vogue_pay").addClass("error-text-field");
            $("#vogue_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#vogue_pay_text").hide();
            $("#vogue_pay").addClass("success-text-field");
            $("#vogue_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("vogue_merchant_id").value == ""){            
            $("#vogue_merchant_id_text").show();
            $("#vogue_merchant_id").addClass("error-text-field");
            $("#vogue_merchant_id").removeClass("success-text-field");
           count++;
        }else{
            $("#vogue_merchant_id_text").hide();
            $("#vogue_merchant_id").addClass("success-text-field");
            $("#vogue_merchant_id").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	VogueSave: function(){
		if(OrderNotification.PreValidate11() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveVoguepay&data=" + JSON.stringify(Forms.Form.voguepay), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	
	/********Skrill PAY ***************************/
	
	SkrillMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessSkrillDataByID&id="+Business.id, function (d) {					
			OrderNotification.SkrillForm(JSON.parse(d));
		});
	},
	SkrillForm: function(F){
		
		Forms.Clean("skrill", "popupmainbuttonok");

        if (F) {
            Forms.Form.skrill.type = "modify";  
            Forms.Form.skrill.id = F.id         
        } else {
            F = new Object();
            Forms.Form.skrill.type = "create";  
            Forms.CreateValue("skrill", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_SKRILL_PAY']?></h3>'
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_SKRILL_PAY_EMAIL']?></label>'

		htms +=Forms.CreateInputPropertyPopup("skrill", "skrillemail", F.skrillemail, false,"PaymentGatewaySettings.PreValidate12()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="skrillemail_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_SKRILL_PAY_EMAIL_REQUIRED']?></small>'
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="skrillemail_text1" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_SKRILL_PAY_EMAIL_INVALID']?> </small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.SkrillSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	PreValidate12: function (){
		var count = 0;		
		if(document.getElementById("skrillemail").value == ""){            
            $("#skrillemail_text").show();
            $("#skrillemail").addClass("error-text-field");
            $("#skrillemail").removeClass("success-text-field");
           count++;
        }else{
            $("#skrillemail_text").hide();
            $("#skrillemail").addClass("success-text-field");
            $("#skrillemail").removeClass("error-text-field");
        }
		var email = document.getElementById("skrillemail").value;
		var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(email).match(emailReg)){
            $("#skrillemail_text1").show();
            $("#skrillemail2").addClass("error-text-field");
            $("#skrillemail2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#skrillemail_text1").hide();
            $("#skrillemail2").addClass("error-text-field");
            $("#skrillemail2").removeClass("success-text-field");
		}
		
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	SkrillSave: function(){
		if(OrderNotification.PreValidate12() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveSkrill&data=" + JSON.stringify(Forms.Form.skrill), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },

	PayeezyMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPayeezyDataByID&id="+Business.id, function (d) {	
			OrderNotification.PayeezyForm(JSON.parse(d));
		});
	},
	PayeezyForm: function(F){
		
		Forms.Clean("payeezy", "popupmainbuttonok");

        if (F) {
            Forms.Form.payeezy.type = "modify";  
            Forms.Form.payeezy.id = F.id         
        } else {
            F = new Object();
            Forms.Form.payeezy.type = "create";  
            Forms.CreateValue("payeezy", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYEEZY_PAY']?></h3>'
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APIKEY']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payeezy", "payeezyapikey", F.payeezyapikey, false,"OrderNotification.PreValidate13()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payeezyapikey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APIKEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APISECRET']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payeezy", "payeezyapisecret", F.payeezyapisecret, false,"OrderNotification.PreValidate13()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payeezyapisecret_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APISECRET_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_SECURITY']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payeezy", "payeezyjssecurity", F.payeezyjssecurity, false,"OrderNotification.PreValidate13()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payeezyjssecurity_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_SECURITY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_MERCHANT_TOKEN']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payeezy", "payeezymerchant", F.payeezymerchant, false,"OrderNotification.PreValidate13()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payeezymerchant_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_MERCHANT_TOKEN_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PayeezySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PayuMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPayUDataByID&id="+Business.id, function (d) {	
			OrderNotification.PayuForm(JSON.parse(d));
		});
	},
	PayuForm: function(F){
		
		Forms.Clean("payu", "popupmainbuttonok");

        if (F) {
            Forms.Form.payu.type = "modify";  
            Forms.Form.payu.id = F.id         
        } else {
            F = new Object();
            Forms.Form.payu.type = "create";  
            Forms.CreateValue("payu", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYU_PAY']?></h3>'
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYU_MERCHANT_KEY']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payu", "payumerchantkey", F.payumerchantkey, false,"OrderNotification.PreValidate16()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payumerchantkey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APIKEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYU_MERCHANT_SALT']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payu", "payumerchantsalt", F.payumerchantsalt, false,"OrderNotification.PreValidate16()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payumerchantsalt_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYU_MERCHANT_SALT_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYU_MERCHANT_ID']?></label>'

		htms +=Forms.CreateInputPropertyPopup("payu", "payumerchantid", F.payumerchantid, false,"OrderNotification.PreValidate16()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payumerchantid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYU_MERCHANT_ID_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.payuSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
StripeMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessStripeDataByID&id="+Business.id, function (d) {	
			OrderNotification.StripeForm(JSON.parse(d));
		});
	},
	StripeForm: function(F){
		
		Forms.Clean("stripe", "popupmainbuttonok");

        if (F) {
            Forms.Form.stripe.type = "modify";  
            Forms.Form.stripe.id = F.id         
        } else {
            F = new Object();
            Forms.Form.stripe.type = "create";  
            Forms.CreateValue("stripe", "businessid", Forms.Form.business.id, false, true, true)          
        }

		
		var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_STRIPE_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_STRIPE_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("stripe", "stripe_pay", m,F.stripe_pay, false,"OrderNotification.PreValidate17()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="vogue_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_STRIPE_API_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("stripe", "stripeapikey", F.stripeapikey, false,"OrderNotification.PreValidate17()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="stripeapikey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_STRIPE_API_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_STRIPE_PUBLISH_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("stripe", "publishablekey", F.publishablekey, false,"OrderNotification.PreValidate17()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="publishablekey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_STRIPE_PUBLISH_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.StripeSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},	
	
	
	PreValidate13: function (){
		var count = 0;
		
		if(document.getElementById("payeezyapikey").value == ""){            
            $("#payeezyapikey_text").show();
            $("#payeezyapikey").addClass("error-text-field");
            $("#payeezyapikey").removeClass("success-text-field");
           count++;
		   
        }else{
            $("#payeezyapikey_text").hide();
            $("#payeezyapikey").addClass("success-text-field");
            $("#payeezyapikey").removeClass("error-text-field");
        }
		
		if(document.getElementById("payeezyapisecret").value == ""){            
            $("#payeezyapisecret_text").show();
            $("#payeezyapisecret").addClass("error-text-field");
            $("#payeezyapisecret").removeClass("success-text-field");
           count++;
        }else{
            $("#payeezyapisecret_text").hide();
            $("#payeezyapisecret").addClass("success-text-field");
            $("#payeezyapisecret").removeClass("error-text-field");
        }
		
		if(document.getElementById("payeezyjssecurity").value == ""){            
            $("#payeezyjssecurity_text").show();
            $("#payeezyjssecurity").addClass("error-text-field");
            $("#payeezyjssecurity").removeClass("success-text-field");
           count++;
        }else{
            $("#payeezyjssecurity_text").hide();
            $("#payeezyjssecurity").addClass("success-text-field");
            $("#payeezyjssecurity").removeClass("error-text-field");
        }
		
		if(document.getElementById("payeezymerchant").value == ""){            
            $("#payeezymerchant_text").show();
            $("#payeezymerchant").addClass("error-text-field");
            $("#payeezymerchant").removeClass("success-text-field");
           count++;
        }else{
            $("#payeezymerchant_text").hide();
            $("#payeezymerchant").addClass("success-text-field");
            $("#payeezymerchant").removeClass("error-text-field");
        }
		
		
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	PreValidate16: function (){
		var count = 0;
		
		if(document.getElementById("payumerchantkey").value == ""){            
            $("#payumerchantkey_text").show();
            $("#payumerchantkey").addClass("error-text-field");
            $("#payumerchantkey").removeClass("success-text-field");
           count++;
        }else{
            $("#payumerchantkey_text").hide();
            $("#payumerchantkey").addClass("success-text-field");
            $("#payumerchantkey").removeClass("error-text-field");
        }
		
		if(document.getElementById("payumerchantsalt").value == ""){            
            $("#payumerchantsalt_text").show();
            $("#payumerchantsalt").addClass("error-text-field");
            $("#payumerchantsalt").removeClass("success-text-field");
           count++;
        }else{
            $("#payumerchantsalt_text").hide();
            $("#payumerchantsalt").addClass("success-text-field");
            $("#payumerchantsalt").removeClass("error-text-field");
        }
		
		if(document.getElementById("payumerchantid").value == ""){            
            $("#payumerchantid_text").show();
            $("#payumerchantid").addClass("error-text-field");
            $("#payumerchantid").removeClass("success-text-field");
           count++;
        }else{
            $("#payumerchantid_text").hide();
            $("#payumerchantid").addClass("success-text-field");
            $("#payumerchantid").removeClass("error-text-field");
        }
		
		
		
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	PayeezySave: function(){
		if(OrderNotification.PreValidate13() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SavePayeezy&data=" + JSON.stringify(Forms.Form.payeezy), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	payuSave: function(){
		if(OrderNotification.PreValidate16() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SavePayU&data=" + JSON.stringify(Forms.Form.payu), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	PreValidate17: function (){
		var count = 0;
		
		if(document.getElementById("stripe_pay").value == ""){            
            $("#stripe_pay_text").show();
            $("#stripe_pay").addClass("error-text-field");
            $("#stripe_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#stripe_pay_text").hide();
            $("#stripe_pay").addClass("success-text-field");
            $("#stripe_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("stripeapikey").value == ""){            
            $("#stripeapikey_text").show();
            $("#stripeapikey").addClass("error-text-field");
            $("#stripeapikey").removeClass("success-text-field");
           count++;
        }else{
            $("#stripeapikey_text").hide();
            $("#stripeapikey").addClass("success-text-field");
            $("#stripeapikey").removeClass("error-text-field");
        }
		
		if(document.getElementById("publishablekey").value == ""){            
            $("#publishablekey_text").show();
            $("#publishablekey").addClass("error-text-field");
            $("#publishablekey").removeClass("success-text-field");
           count++;
        }else{
            $("#publishablekey_text").hide();
            $("#publishablekey").addClass("success-text-field");
            $("#publishablekey").removeClass("error-text-field");
        }
		
		
		
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	StripeSave: function(){
		if(OrderNotification.PreValidate17() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveStripe&data=" + JSON.stringify(Forms.Form.stripe), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	PaypalproMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaypalproByID&id="+Business.id, function (d) {					
			OrderNotification.PaypalproForm(JSON.parse(d));
		});
	},
	PaypalproForm: function(F){
		
		Forms.Clean("paypalpro", "popupmainbuttonok");

        if (F) {
            Forms.Form.paypalpro.type = "modify";  
            Forms.Form.paypalpro.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paypalpro.type = "create";  
            Forms.CreateValue("paypalpro", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYPALPRO_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("paypalpro", "paypalpro_pay", m,F.paypalpro_pay, false,"OrderNotification.PreValidate18()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paypalpro_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_USERNAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paypalpro", "p_api_username", F.p_api_username, false,"OrderNotification.PreValidate18()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="p_api_username_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_USERNAME_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paypalpro", "p_api_password", F.p_api_password, false,"OrderNotification.PreValidate18()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="p_api_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_SIGNATURE']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paypalpro", "p_api_signature", F.p_api_signature, false,"OrderNotification.PreValidate18()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="p_api_signature_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_SIGNATURE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PaypalproSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PreValidate18: function (){
		var count = 0;
		
		if(document.getElementById("paypalpro_pay").value == "-1"){            
            $("#paypalpro_pay_text").show();
            $("#paypalpro_pay").addClass("error-text-field");
            $("#paypalpro_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#paypalpro_pay_text").hide();
            $("#paypalpro_pay").addClass("success-text-field");
            $("#paypalpro_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("p_api_username").value == ""){            
            $("#p_api_username_text").show();
            $("#p_api_username").addClass("error-text-field");
            $("#p_api_username").removeClass("success-text-field");
           count++;
        }else{
            $("#p_api_username_text").hide();
            $("#p_api_username").addClass("success-text-field");
            $("#p_api_username").removeClass("error-text-field");
        }
		if(document.getElementById("p_api_password").value == ""){            
            $("#p_api_password_text").show();
            $("#p_api_password").addClass("error-text-field");
            $("#p_api_password").removeClass("success-text-field");
           count++;
        }else{
            $("#p_api_password_text").hide();
            $("#p_api_password").addClass("success-text-field");
            $("#p_api_password").removeClass("error-text-field");
        }
		if(document.getElementById("p_api_signature").value == ""){            
            $("#p_api_signature_text").show();
            $("#p_api_signature").addClass("error-text-field");
            $("#p_api_signature").removeClass("success-text-field");
           count++;
        }else{
            $("#p_api_signature_text").hide();
            $("#p_api_signature").addClass("success-text-field");
            $("#p_api_signature").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	PaypalproSave: function(){
		if(OrderNotification.PreValidate18() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=Savepaypalpro&data=" + JSON.stringify(Forms.Form.paypalpro), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	
	PaygistixMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaygistixByID&id="+Business.id, function (d) {					
			OrderNotification.PaygistixForm(JSON.parse(d));
		});
	},
	PaygistixForm: function(F){
		
		Forms.Clean("paygistix", "popupmainbuttonok");

        if (F) {
            Forms.Form.paygistix.type = "modify";  
            Forms.Form.paygistix.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paygistix.type = "create";  
            Forms.CreateValue("paygistix", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYGISTIX_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_PAYGISTIX_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("paygistix", "paygistix_pay", m,F.paygistix_pay, false,"OrderNotification.PreValidate19()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paygistix_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYGISTIX_USERNAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paygistix", "paygistix_username", F.paygistix_username, false,"OrderNotification.PreValidate19()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paygistix_username_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYGISTIX_USERNAME_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYGISTIX_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paygistix", "paygistix_password", F.paygistix_password, false,"OrderNotification.PreValidate19()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paygistix_password" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYGISTIX_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'

	
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PaygistixSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PreValidate19: function (){
		var count = 0;
		
		if(document.getElementById("paygistix_pay").value == "-1"){            
            $("#paygistix_pay_text").show();
            $("#paygistix_pay").addClass("error-text-field");
            $("#paygistix_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#paygistix_pay_text").hide();
            $("#paygistix_pay").addClass("success-text-field");
            $("#paygistix_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("paygistix_username").value == ""){            
            $("#paygistix_username_text").show();
            $("#paygistix_username").addClass("error-text-field");
            $("#paygistix_username").removeClass("success-text-field");
           count++;
        }else{
            $("#paygistix_username_text").hide();
            $("#paygistix_username").addClass("success-text-field");
            $("#paygistix_username").removeClass("error-text-field");
        }
		if(document.getElementById("paygistix_password").value == ""){            
            $("#paygistix_password_text").show();
            $("#paygistix_password").addClass("error-text-field");
            $("#paygistix_password").removeClass("success-text-field");
           count++;
        }else{
            $("#paygistix_password_text").hide();
            $("#paygistix_password").addClass("success-text-field");
            $("#paygistix_password").removeClass("error-text-field");
        }
	
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	PaygistixSave: function(){
		if(OrderNotification.PreValidate19() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=Savepaygistix&data=" + JSON.stringify(Forms.Form.paygistix), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	/** GLOBAL  Pay**/
	GlobalMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessGlobalDataByID&id="+Business.id, function (d) {					
			OrderNotification.GlobalForm(JSON.parse(d));
		});
	},
	GlobalForm: function(F){
		
		Forms.Clean("global", "popupmainbuttonok");

        if (F) {
            Forms.Form.global.type = "modify";  
            Forms.Form.global.id = F.id         
        } else {
            F = new Object();
            Forms.Form.global.type = "create";  
            Forms.CreateValue("global", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_GLOBAL_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Production"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_GLOBAL_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("global", "global_pay", m,F.global_pay, false,"OrderNotification.PreValidate20()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="global_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_GLOBAL_PAY_SECURE']?></label>'
		htms +=Forms.CreateInputPropertyPopup("global", "global_sresecureid", F.global_sresecureid, false,"OrderNotification.PreValidate20()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="global_sresecureid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_GLOBAL_PAY_SECURE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_GLOBAL_PAY_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("global", "global_password", F.global_password, false,"OrderNotification.PreValidate20()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="global_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_GLOBAL_PAY_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.GlobalSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PreValidate20: function (){
		var count = 0;
		
		if(document.getElementById("global_pay").value == "-1"){            
            $("#global_pay_text").show();
            $("#global_pay").addClass("error-text-field");
            $("#global_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#global_pay_text").hide();
            $("#global_pay").addClass("success-text-field");
            $("#global_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("global_sresecureid").value == ""){            
            $("#global_sresecureid_text").show();
            $("#global_sresecureid").addClass("error-text-field");
            $("#global_sresecureid").removeClass("success-text-field");
           count++;
        }else{
            $("#global_sresecureid_text").hide();
            $("#global_sresecureid").addClass("success-text-field");
            $("#global_sresecureid").removeClass("error-text-field");
        }
		if(document.getElementById("global_password").value == ""){            
            $("#global_password_text").show();
            $("#global_password").addClass("error-text-field");
            $("#global_password").removeClass("success-text-field");
           count++;
        }else{
            $("#global_password_text").hide();
            $("#global_password").addClass("success-text-field");
            $("#global_password").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	GlobalSave: function(){
		if(OrderNotification.PreValidate20() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveGlobal&data=" + JSON.stringify(Forms.Form.global), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	/** Btrans  Pay**/
	BtransMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessBtransDataByID&id="+Business.id, function (d) {					
			OrderNotification.BtransForm(JSON.parse(d));
		});
	},
	BtransForm: function(F){
		Forms.Clean("btrans", "popupmainbuttonok");

        if (F) {
            Forms.Form.btrans.type = "modify";  
            Forms.Form.btrans.id = F.id         
        } else {
            F = new Object();
            Forms.Form.btrans.type = "create";  
            Forms.CreateValue("btrans", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_BTRANS']?></h3>'
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD']?></label>'
		n +=Forms.CreateSelectPropertyPopup("btrans", "btrans_pay", m, F.btrans_pay, false, "", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NAME']?></label>'
		n +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchantname", F.btrans_merchantname, false,"OrderNotification.PreValidate21()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchantname_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NAME_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NUMBER']?></label>'
		n +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchantnumber", F.btrans_merchantnumber, false,"OrderNotification.PreValidate21()",'',false) 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchantnumber_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NUMBER_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TYPE']?></label>'
		n +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchanttype", F.btrans_merchanttype, false,"PaymentGatewaySettings.PreValidate21()") 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchanttype_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TYPE_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>' 
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TERMINAL']?></label>'
		n +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchantterminal", F.btrans_merchantterminal, false,"PaymentGatewaySettings.PreValidate21()") 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchantterminal_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TERMINAL_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>' 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.BtransSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate21: function (){
		var count = 0;
		if(document.getElementById("btrans_pay").value == ""){            
            $("#btrans_pay_text").show();
            $("#btrans_pay").addClass("error-text-field");
            $("#btrans_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#btrans_pay_text").hide();
            $("#btrans_pay").addClass("success-text-field");
            $("#btrans_pay").removeClass("error-text-field");
        }
		if(document.getElementById("btrans_merchantname").value == ""){            
            $("#btrans_merchantname_text").show();
            $("#btrans_merchantname").addClass("error-text-field");
            $("#btrans_merchantname").removeClass("success-text-field");
           count++;
        }else{
            $("#btrans_merchantname_text").hide();
            $("#btrans_merchantname").addClass("success-text-field");
            $("#btrans_merchantname").removeClass("error-text-field");
        }
		
		if(document.getElementById("btrans_merchantnumber").value == ""){            
            $("#btrans_merchantnumber_text").show();
            $("#btrans_merchantnumber").addClass("error-text-field");
            $("#btrans_merchantnumber").removeClass("success-text-field");
           count++;
        }else{
            $("#btrans_merchantnumber_text").hide();
            $("#btrans_merchantnumber").addClass("success-text-field");
            $("#btrans_merchantnumber").removeClass("error-text-field");
        }
		if(document.getElementById("btrans_merchanttype").value == ""){            
            $("#btrans_merchanttype_text").show();
            $("#btrans_merchanttype").addClass("error-text-field");
            $("#btrans_merchanttype").removeClass("success-text-field");
           count++;
        }else{
            $("#btrans_merchanttype_text").hide();
            $("#btrans_merchanttype").addClass("success-text-field");
            $("#btrans_merchanttype").removeClass("error-text-field");
        }
		if(document.getElementById("btrans_merchantterminal").value == ""){            
            $("#btrans_merchantterminal_text").show();
            $("#btrans_merchantterminal").addClass("error-text-field");
            $("#btrans_merchantterminal").removeClass("success-text-field");
           count++;
        }else{
            $("#btrans_merchantterminal_text").hide();
            $("#btrans_merchantterminal").addClass("success-text-field");
            $("#btrans_merchantterminal").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	BtransSave: function(){
		if(OrderNotification.PreValidate21() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveBtrans&data=" + JSON.stringify(Forms.Form.btrans), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	/********BSA PAY ***************************/	
	BsaMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessBsaDataByID&id="+Business.id, function (d) {	
			OrderNotification.BsaForm(JSON.parse(d));
		});
	},
	BsaForm: function(F){
		
		Forms.Clean("bsa", "popupmainbuttonok");

        if (F) {
            Forms.Form.bsa.type = "modify";  
            Forms.Form.bsa.id = F.id         
        } else {
            F = new Object();
            Forms.Form.bsa.type = "create";  
            Forms.CreateValue("bsa", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_BSA_PAY']?></h3>'
		m = '[{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD']?></label>'

		htms +=Forms.CreateSelectPropertyPopup("bsa", "bsapay", m, F.bsapay, false, "", false)
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="bsapay_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_BSA_PAY_CHANNELS']?></label>'

		htms +=Forms.CreateInputPropertyPopup("bsa", "bsachannels", F.bsachannels, false,"OrderNotification.PreValidate22()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="bsachannels_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_CHANNELS_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_BSA_PAY_MERCHANTCODE']?></label>'

		htms +=Forms.CreateInputPropertyPopup("bsa", "bsamerchantcode", F.bsamerchantcode, false,"OrderNotification.PreValidate22()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="bsamerchantcode_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_MERCHANTCODE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_BSA_PAY_TERMINAL']?></label>'

		htms +=Forms.CreateInputPropertyPopup("bsa", "bsaterminal", F.bsaterminal, false,"OrderNotification.PreValidate22()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="bsaterminal_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_TERMINAL_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_BSA_PAY_TRANSACTIONTYPE']?></label>'

		htms +=Forms.CreateInputPropertyPopup("bsa", "bsatransationtype", F.bsatransationtype, false,"OrderNotification.PreValidate22()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="bsatransationtype_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_TRANSACTIONTYPE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_BSA_PAY_CURRENCY']?></label>'

		htms +=Forms.CreateInputPropertyPopup("bsa", "bsacurrency", F.bsacurrency, false,"OrderNotification.PreValidate22()", false, false, "")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="bsacurrency_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_CURRENCY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.BsaSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	PreValidate22: function (){
		var count = 0;
		
		if(document.getElementById("bsachannels").value == ""){            
            $("#bsachannels_text").show();
            $("#bsachannels").addClass("error-text-field");
            $("#bsachannels").removeClass("success-text-field");
           count++;
		   
        }else{
            $("#bsachannels_text").hide();
            $("#bsachannels").addClass("success-text-field");
            $("#bsachannels").removeClass("error-text-field");
        }
		
		if(document.getElementById("bsamerchantcode").value == ""){            
            $("#bsamerchantcode_text").show();
            $("#bsamerchantcode").addClass("error-text-field");
            $("#bsamerchantcode").removeClass("success-text-field");
           count++;
        }else{
            $("#bsamerchantcode_text").hide();
            $("#bsamerchantcode").addClass("success-text-field");
            $("#bsamerchantcode").removeClass("error-text-field");
        }
		
		if(document.getElementById("bsaterminal").value == ""){            
            $("#bsaterminal_text").show();
            $("#bsaterminal").addClass("error-text-field");
            $("#bsaterminal").removeClass("success-text-field");
           count++;
        }else{
            $("#bsaterminal_text").hide();
            $("#bsaterminal").addClass("success-text-field");
            $("#bsaterminal").removeClass("error-text-field");
        }
		
		if(document.getElementById("bsatransationtype").value == ""){            
            $("#bsatransationtype_text").show();
            $("#bsatransationtype").addClass("error-text-field");
            $("#bsatransationtype").removeClass("success-text-field");
           count++;
        }else{
            $("#bsatransationtype_text").hide();
            $("#bsatransationtype").addClass("success-text-field");
            $("#bsatransationtype").removeClass("error-text-field");
        }
		if(document.getElementById("bsacurrency").value == ""){            
            $("#bsacurrency_text").show();
            $("#bsacurrency").addClass("error-text-field");
            $("#bsacurrency").removeClass("success-text-field");
           count++;
        }else{
            $("#bsacurrency_text").hide();
            $("#bsacurrency").addClass("success-text-field");
            $("#bsacurrency").removeClass("error-text-field");
        }
		
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	BsaSave: function(){
		if(OrderNotification.PreValidate22() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveBsa&data=" + JSON.stringify(Forms.Form.bsa), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },	
	/** AZUL  Pay**/
	AzulMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessAzulDataByID&id="+Business.id, function (d) {					
			OrderNotification.AzulForm(JSON.parse(d));
		});
	},
	AzulForm: function(F){
		Forms.Clean("azul", "popupmainbuttonok");

        if (F) {
            Forms.Form.azul.type = "modify";  
            Forms.Form.azul.id = F.id         
        } else {
            F = new Object();
            Forms.Form.azul.type = "create";  
            Forms.CreateValue("azul", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_AZUL']?></h3>'
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD1']?></label>'
		n +=Forms.CreateSelectPropertyPopup("azul", "azul_pay", m, F.azul_pay, false, "", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="azul_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_NAME']?></label>'
		n +=Forms.CreateInputPropertyPopup("azul", "azul_merchantname", F.azul_merchantname, false,"OrderNotification.PreValidate23()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="azul_merchantname_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_NAME_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_ID']?></label>'
		n +=Forms.CreateInputPropertyPopup("azul", "azul_merchantid", F.azul_merchantid, false,"OrderNotification.PreValidate23()",'',false) 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="azul_merchantid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_ID_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TYPE']?></label>'
		n +=Forms.CreateInputPropertyPopup("azul", "azul_merchanttype", F.azul_merchanttype, false,"OrderNotification.PreValidate23()") 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="azul_merchanttype_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TYPE_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>' 
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TERMINAL']?></label>'
		n +=Forms.CreateInputPropertyPopup("azul", "azul_authkey", F.azul_authkey, false,"OrderNotification.PreValidate23()") 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="aazul_authkey_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TERMINAL_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>' 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.AzulSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate23: function (){
		var count = 0;
		if(document.getElementById("azul_pay").value == ""){            
            $("#azul_pay_text").show();
            $("#azul_pay").addClass("error-text-field");
            $("#azul_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#azul_pay_text").hide();
            $("#azul_pay").addClass("success-text-field");
            $("#azul_pay").removeClass("error-text-field");
        }
		if(document.getElementById("azul_merchantname").value == ""){            
            $("#azul_merchantname_text").show();
            $("#azul_merchantname").addClass("error-text-field");
            $("#azul_merchantname").removeClass("success-text-field");
           count++;
        }else{
            $("#azul_merchantname_text").hide();
            $("#azul_merchantname").addClass("success-text-field");
            $("#azul_merchantname").removeClass("error-text-field");
        }
		
		if(document.getElementById("azul_merchantid").value == ""){            
            $("#azul_merchantid_text").show();
            $("#azul_merchantid").addClass("error-text-field");
            $("#azul_merchantid").removeClass("success-text-field");
           count++;
        }else{
            $("#azul_merchantid_text").hide();
            $("#azul_merchantid").addClass("success-text-field");
            $("#azul_merchantid").removeClass("error-text-field");
        }
		if(document.getElementById("azul_merchanttype").value == ""){            
            $("#azul_merchanttype_text").show();
            $("#azul_merchanttype").addClass("error-text-field");
            $("#azul_merchanttype").removeClass("success-text-field");
           count++;
        }else{
            $("#azul_merchanttype_text").hide();
            $("#azul_merchanttype").addClass("success-text-field");
            $("#azul_merchanttype").removeClass("error-text-field");
        }
		if(document.getElementById("azul_authkey").value == ""){            
            $("#azul_authkey_text").show();
            $("#azul_authkey").addClass("error-text-field");
            $("#azul_authkey").removeClass("success-text-field");
           count++;
        }else{
            $("#aazul_authkey_text").hide();
            $("#azul_authkey").addClass("success-text-field");
            $("#azul_authkey").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	AzulSave: function(){
		if(OrderNotification.PreValidate23() == false){
			return
		}
		// JSON.stringify(Forms.Form.azul);
    	$.post("lib/order_notification.php", "f=SaveAzul&data=" + JSON.stringify(Forms.Form.azul), function (a) {
			//alert(a)
			Popup.Close();
			OrderNotification.Main();
		});
    },
	/*--------------------------Quick Pay Start------------------------------*/
	QuickpayMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessQuickpayByID&id="+Business.id, function (d) {					
			OrderNotification.QuickpayForm(JSON.parse(d));
		});
	},
	QuickpayForm: function(F){
		
		Forms.Clean("quickpay", "popupmainbuttonok");

        if (F) {
            Forms.Form.quickpay.type = "modify";  
            Forms.Form.quickpay.id = F.id         
        } else {
            F = new Object();
            Forms.Form.quickpay.type = "create";  
            Forms.CreateValue("quickpay", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_QUICK_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_QUICK_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("quickpay", "quick_pay", m,F.quick_pay, false,"OrderNotification.PreValidate24()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="quick_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_QUICKPAY_MERCHANT']?></label>'
		htms +=Forms.CreateInputPropertyPopup("quickpay", "quickpay_merchant", F.quickpay_merchant, false,"OrderNotification.PreValidate24()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="quickpay_merchant_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_QUICKPAY_MERCHANT_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_QUICKPAY_SECRET']?></label>'
		htms +=Forms.CreateInputPropertyPopup("quickpay", "quickpay_md5secret", F.quickpay_md5secret, false,"OrderNotification.PreValidate24()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="quickpay_md5secret_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_QUICKPAY_SECRET_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'

	
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.QuickpaySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	PreValidate24: function (){
		var count = 0;
		
		if(document.getElementById("quick_pay").value == "-1"){            
            $("#quick_pay_text").show();
            $("#quick_pay").addClass("error-text-field");
            $("#quick_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#quick_pay_text").hide();
            $("#quick_pay").addClass("success-text-field");
            $("#quick_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("quickpay_merchant").value == ""){            
            $("#quickpay_merchant_text").show();
            $("#quickpay_merchant").addClass("error-text-field");
            $("#quickpay_merchant").removeClass("success-text-field");
           count++;
        }else{
            $("#quickpay_merchant_text").hide();
            $("#quickpay_merchant").addClass("success-text-field");
            $("#quickpay_merchant").removeClass("error-text-field");
        }
		if(document.getElementById("quickpay_md5secret").value == ""){            
            $("#quickpay_md5secret_text").show();
            $("#quickpay_md5secret").addClass("error-text-field");
            $("#quickpay_md5secret").removeClass("success-text-field");
           count++;
        }else{
            $("#quickpay_md5secret_text").hide();
            $("#quickpay_md5secret").addClass("success-text-field");
            $("#quickpay_md5secret").removeClass("error-text-field");
        }
	
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	QuickpaySave: function(){
		if(OrderNotification.PreValidate24() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveQuickpay&data=" + JSON.stringify(Forms.Form.quickpay), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
	
	/*--------------------------Quick Pay End------------------------------*/
	
	/*----------------------Paynl------------------------------*/
	PaynlMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaynlByID&id="+Business.id, function (d) {					
			OrderNotification.PaynlForm(JSON.parse(d));
		});
	},
	PaynlForm: function(F){
		
		Forms.Clean("paynl", "popupmainbuttonok");

        if (F) {
            Forms.Form.paynl.type = "modify";  
            Forms.Form.paynl.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paynl.type = "create";  
            Forms.CreateValue("paynl", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYNL_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_PAYNL_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("paynl", "paynl_pay", m,F.paynl_pay, false,"OrderNotification.PreValidate25()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paynl_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYNL_API_TOKEN']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paynl", "paynl_apitoken", F.paynl_apitoken, false,"OrderNotification.PreValidate25()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paynl_apitoken_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYNL_API_TOKEN_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYNL_API_SERVICEID']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paynl", "paynl_serviceid", F.paynl_serviceid, false,"OrderNotification.PreValidate25()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paynl_serviceid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYNL_API_SERVICEID_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'

	
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.PaynlSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
PreValidate25: function (){
		var count = 0;
		
		if(document.getElementById("paynl_pay").value == "-1"){            
            $("#paynl_pay_text").show();
            $("#paynl_pay").addClass("error-text-field");
            $("#paynl_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#paynl_pay_text").hide();
            $("#paynl_pay").addClass("success-text-field");
            $("#paynl_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("paynl_apitoken").value == ""){            
            $("#paynl_apitoken_text").show();
            $("#paynl_apitoken").addClass("error-text-field");
            $("#paynl_apitoken").removeClass("success-text-field");
           count++;
        }else{
            $("#paynl_apitoken_text").hide();
            $("#paynl_apitoken").addClass("success-text-field");
            $("#paynl_apitoken").removeClass("error-text-field");
        }
		if(document.getElementById("paynl_serviceid").value == ""){            
            $("#paynl_serviceid_text").show();
            $("#paynl_serviceid").addClass("error-text-field");
            $("#paynl_serviceid").removeClass("success-text-field");
           count++;
        }else{
            $("#paynl_serviceid_text").hide();
            $("#paynl_serviceid").addClass("success-text-field");
            $("#paynl_serviceid").removeClass("error-text-field");
        }
	
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	PaynlSave: function(){
		if(OrderNotification.PreValidate25() == false){
			return
		}
		
    	$.post("lib/order_notification.php", "f=Savepaynl&data=" + JSON.stringify(Forms.Form.paynl), function (a) {
			
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
/*----------------------Zaakpay------------------------------*/	
	
	ZaakpayMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessZaakpayByID&id="+Business.id, function (d) {					
			OrderNotification.ZaakpayForm(JSON.parse(d));
		});
	},
	ZaakpayForm: function(F){
		
		Forms.Clean("zaakpay", "popupmainbuttonok");

        if (F) {
            Forms.Form.zaakpay.type = "modify";  
            Forms.Form.zaakpay.id = F.id         
        } else {
            F = new Object();
            Forms.Form.zaakpay.type = "create";  
            Forms.CreateValue("zaakpay", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_ZAAKPAY_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_ZAAKPAY_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("zaakpay", "zaakpay_pay", m,F.zaakpay_pay, false,"OrderNotification.PreValidate26()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="zaakpay_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_ZAAKPAY_MERCHANTID']?></label>'
		htms +=Forms.CreateInputPropertyPopup("zaakpay", "zaakpay_merchantid", F.zaakpay_merchantid, false,"OrderNotification.PreValidate26()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="zaakpay_merchantid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_ZAAKPAY_MERCHANTID_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_ZAAKPAY_SECRETKEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("zaakpay", "zaakpay_secretkey", F.zaakpay_secretkey, false,"OrderNotification.PreValidate26()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="zaakpay_secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_ZAAKPAY_SECRETKEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'

	
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="OrderNotification.ZaakpaySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->
		Popup.Show(htms)

	},
	
	
	
	PreValidate26: function (){
		var count = 0;
		
		if(document.getElementById("zaakpay_pay").value == "-1"){            
            $("#zaakpay_pay_text").show();
            $("#zaakpay_pay").addClass("error-text-field");
            $("#zaakpay_pay").removeClass("success-text-field");
           count++;
        }else{
            $("#zaakpay_pay_text").hide();
            $("#zaakpay_pay").addClass("success-text-field");
            $("#zaakpay_pay").removeClass("error-text-field");
        }
		
		if(document.getElementById("zaakpay_merchantid").value == ""){            
            $("#zaakpay_merchantid_text").show();
            $("#zaakpay_merchantid").addClass("error-text-field");
            $("#zaakpay_merchantid").removeClass("success-text-field");
           count++;
        }else{
            $("#zaakpay_merchantid_text").hide();
            $("#zaakpay_merchantid").addClass("success-text-field");
            $("#zaakpay_merchantid").removeClass("error-text-field");
        }
		if(document.getElementById("zaakpay_secretkey").value == ""){            
            $("#zaakpay_secretkey_text").show();
            $("#zaakpay_secretkey").addClass("error-text-field");
            $("#zaakpay_secretkey").removeClass("success-text-field");
           count++;
        }else{
            $("#zaakpay_secretkey_text").hide();
            $("#zaakpay_secretkey").addClass("success-text-field");
            $("#zaakpay_secretkey").removeClass("error-text-field");
        }
	
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	
	ZaakpaySave: function(){
		if(OrderNotification.PreValidate26() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=Savezaakpay&data=" + JSON.stringify(Forms.Form.zaakpay), function (a) {
			Popup.Close();
			OrderNotification.Main();
		});
    },
	
};