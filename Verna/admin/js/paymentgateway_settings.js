var PaymentGatewaySettings = {
	Main: function(){
		
		Main.Loading();	
		var b = new Date().getTime();
        Main.Aid = b;	
		
		
		
		$.post("lib/paymentgateway_settings.php", "f=FetchPaymentSettings", function (a) {
			if (b != Main.Aid)
                {
                    return
                }
			Main.Ready();
			
			PaymentGatewaySettings.paymentlist =JSON.parse(a);
			PaymentGatewaySettings.PrintMain();
		});
		//PaymentGatewaySettings.PrintMain();		
	},
	PrintMain: function(a){
		var n =''
		n +='<div class="row">'
		n +='<div class="top-bar">'
		n +='<div class=" col-md-6 col-md-offset-6">'
		n +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
		n +='</div>'
		<!--col-md-5-->
		n +='</div>'
		<!--top-bar-->
		n +='</div>'
		<!--row-->



		n +='<div class="panel panel-danger panel-square panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-4">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_LIST']?></h3>'
		n +='</div>'
		<!--col-md-5-->
		n +='<div class="col-md-3">'
		n +='<div class="panel-btn filtr_margin">'
		n +='<input type="text" id="search" class="form-control rounded panel-red-field white-placeholder" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
		n +='</div>'
		n +='</div>'
		<!--col-md-3-->
		n +='<div class="col-md-5">'
		n +='<div class="panel-btn pull-right">'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:PaymentGatewaySettings.New()"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:PaymentGatewaySettings.Edit()"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="PaymentGatewaySettings.Delete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row-->
		n +='</div>'

		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped">'
		n +='<thead>'
		n +='<tr>'
		n +='<th width="5%"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_ID']?></th>'
		n +='<th width="15%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_PANEL_BUSINESS']?></th>'
		n +='<th width="15%"><?=$lang_resource['INVOICE_PAYMENT_TYPE']?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="payment_list">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'

		document.getElementById("main").innerHTML = n;
		document.getElementById("search").onkeyup = function () {
            PaymentGatewaySettings.Populatetable()
        };
		PaymentGatewaySettings.Populatetable()

	},
	Populatetable: function(){
		var n ='';
		var i = 1;           
        for (var f in this.paymentlist) {
        	p = false;
        	g = document.getElementById("search").value.toLowerCase();
        	if (String(this.paymentlist[f].business_name).toLowerCase().indexOf(g) >= 0 ) {
                p = true
            }
        	
        	if(p){
        	n +='<tr>'
			n +='<td>'+i+'</td>'
			n +='<td><input type="checkbox" class="checkbox" value="'+this.paymentlist[f].business_id+'"></td>'
			n +='<td class="hand" onclick="PaymentGatewaySettings.Edit('+this.paymentlist[f].business_id+')">'+this.paymentlist[f].business_name+'</td>'
			var k ='';
			var length = this.paymentlist[f].payment_name.length;
			var l =1;
			for(var j in this.paymentlist[f].payment_name){
				k += this.paymentlist[f].payment_name[j].name;
				if(l < length){
					k += ' , ';
				}
				l = l+1;
			}
			n +='<td>'+k+'</td>'
			n +='</tr>'
			i = i+1;
			}
        }
        $("#payment_list").empty().append(n);
	},
	Edit: function (a) {		
        var d = false;
        if (a) {
            d = true
        } else {			
            var c = Main.GetMarkedCheckBoxesValues();			
            if (c.length == 1) {
                a = c[0];
                d = true
            }else if(c.length > 1){
				alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_ONE']?>");
                return
            }
        }
		
		 if (d) {
            Main.Loading();
            $.post("lib/paymentgateway_settings.php", "f=FetchPaymentListById&id="+a, function (b) {
				PaymentGatewaySettings.PaymentDetails = JSON.parse(b);  
				$.post("lib/paymentgateway_settings.php", "f=FetchAllBusiness", function (b) {			
					PaymentGatewaySettings.business = JSON.parse(b);			
					Main.Ready();
					PaymentGatewaySettings.PaymentForm();			        
		        });					        
        	});           	
        }
    },

	New: function(){
		delete this.PaymentDetails;
		Main.Loading();		
		$.post("lib/paymentgateway_settings.php", "f=FetchAllBusiness", function (b) {			
			PaymentGatewaySettings.business = JSON.parse(b);			
			Main.Ready();
			PaymentGatewaySettings.PaymentForm();			        
        });
	},
	PaymentForm: function(){
		//alert(PaymentGatewaySettings.PaymentDetails)

	


		PaymentGatewaySettings.PaymentsSettingsArray = new Object();

		var htms=''
		Forms.Clean("payment_settings", "mainbuttonok");
        if (!this.PaymentDetails) {
            e = new Object();
            Forms.Form.payment_settings.type = "create"
			e.paymentlist='';
        } else {
            Forms.Form.payment_settings.type = "modify"; 
            e = new Object();
            e = this.PaymentDetails;
        }

		htms +='<div class="row">'
		htms +='<div class="top-bar">'
		htms +='<div class=" col-md-6 col-md-offset-6">'
		htms +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="PaymentGatewaySettings.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ORDER_DETAILS_SAVE']?></button>&nbsp; '
		htms +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="PaymentGatewaySettings.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
		htms +='</div>'
		<!--col-md-5-->
		htms +='</div>'
		<!--top-bar-->
		htms +='</div>'
		<!--row-->

		htms +='<div class="panel panel-danger panel-square panel-no-border">'
		htms +='<div class="panel-heading panel-heading">'
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<h3 class="panel-title"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_SETTING_ADD']?></h3>'
		htms +='</div>'
		<!--col-md-5-->
		htms +='</div>'
		<!--row-->
		htms +='</div>'
		var f = new Array();
		f.push(JSON.parse('{"id":"","caption":"<?= $lang_resource['ADMIN_MULTIDELIVERY_STATICS_SELECT_BUSINESS_REQUIRED'] ?>"}'));
		for (var d in PaymentGatewaySettings.business) {
            var h = new Object();
            h.id = PaymentGatewaySettings.business[d].id;
            h.caption = PaymentGatewaySettings.business[d].name;
            f.push(h)
        }
       // alert(JSON.stringify(this.PaymentDetails))
		htms +='<div class="panel-body">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_BUSINESS']?></label>'
		if(Forms.Form.payment_settings.type == "modify"){
			htms +=Forms.CreateSelectPropertyAdminReadonly("payment_settings", "business_id", f, e.business_id, true)
		}else{
			htms +=Forms.CreateSelectPropertyAdmin("payment_settings", "business_id", f,'', true,"PaymentGatewaySettings.PreValidation()")
		}
		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="business_id_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_BUSINESS_REQUIRED']?></small>'
		
		
		
		htms +='</div>'
		htms +='</div>'
		<!-- /.panel-body -->
		htms +='</div>'

		htms +='<h4 class="on_h4"><strong><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY']?></strong></h4>'

		htms +='<div class="row">'

		var lc =''
		if(e.paymentlist[1]){
			if(e.paymentlist[1].enabled == 1){
				var lc = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-cod.png"></span> <?=$lang_resource['CASH_DELIVERY']?></h4></a>'
		htms +='<span class="pull-right on-right">'
		htms +='<div class=" pull-left"><input type="checkbox" id="cashenabled" name="checkbox" '+lc+' class="switch checkbox_2 hand"><label for="cashenabled">&nbsp;</label></div>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_CASH_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Cash Section -->

		var lca =''
		if(e.paymentlist[2]){
			if(e.paymentlist[2].enabled == 1){
				var lca = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-debit-card.png"></span>  <?=$lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_CARD']?></h4></a>'
		htms +='<span class="pull-right on-right">'
		htms +='<div class=" pull-left"><input type="checkbox" id="cardenabled" name="checkbox" '+lca+' class="switch checkbox_2 hand"><label for="cardenabled">&nbsp;</label></div>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_CARD_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Card Section -->
		
		htms +='</div>'
		<!--row-->
		
		htms +='<div class="row">'

		var lp =''
		if(e.paymentlist[3]){
			if(e.paymentlist[3].enabled == 1){
				var lp = 'checked';
			}
		}

		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-paypal.png"></span> <?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_PAYPAL']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="paypalenabled" '+lp+' name="checkbox" class="switch checkbox_2 hand"><label for="paypalenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.paypalForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'                                
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYPAL_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Paypal Section -->



		var lpa =''
		if(e.paymentlist[4]){
			if(e.paymentlist[4].enabled == 1){
				var lpa = 'checked';
			}
		}

		<!-- PaypalAdaptive Section -->
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-paypal-adaptiv.png"></span> <?=$lang_resource['ADMIN_PAGE_STATISTICS_PAYPAL_ADAPTIVE']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="paypaladaptiveenabled" '+lpa+' name="checkbox" class="switch checkbox_2 hand"><label for="paypaladaptiveenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PaypalAdaptiveForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYPAL_ADAPTIVE_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- PaypalAdaptive Section -->
		
		
		htms +='</div>'
		<!--row-->
		
		htms +='<div class="row">'
		var la =''
		if(e.paymentlist[5]){
			if(e.paymentlist[5].enabled == 1){
				var la = 'checked';
			}
		}
		<!-- Authorize Section -->
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-a-net.png"></span> <?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_AUTHORIZE']?> </h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="authorizeenabled" name="checkbox" '+la+' class="switch checkbox_2 hand"><label for="authorizeenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.AuthorizeForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_AUTHORIZE_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Authorize Section -->
		
		var lb =''
		if(e.paymentlist[6]){
			if(e.paymentlist[6].enabled == 1){
				var lb = 'checked';
			}
		}
		<!-- Braintree Section -->
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-braintree.png"></span> <?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_BRAINTREE']?> </h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="braintreeenabled" name="checkbox" '+lb+' class="switch checkbox_2 hand"><label for="braintreeenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.BraintreeForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_BRAINTREE_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Braintree Section -->
		
		htms +='</div>'		
		<!--row-->
		
		htms +='<div class="row">'

		var lm =''
		if(e.paymentlist[9]){
			if(e.paymentlist[9].enabled == 1){
				var lm = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-mercado-pago.png"></span> <?=$lang_resource['PAYMENT_MERCADO_PAGO']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="mercadopagoenabled" '+lm+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="mercadopagoenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.MercadoForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_MERCADO_PAGO_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		var lmp =''
		if(e.paymentlist[7]){
			if(e.paymentlist[7].enabled == 1){
				var lmp = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-murcury.png"></span> <?=$lang_resource['MERCURY_PAYMENT_HEADER']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="mercuryenabled" '+lmp+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="mercuryenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.MercuryForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_MERCURY_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
				
		htms +='</div>'		
		<!--row-->
		
		htms +='<div class="row">'
		var lwp =''
		if(e.paymentlist[8]){
			if(e.paymentlist[8].enabled == 1){
				var lwp = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/ico-worldpay.png"></span> <?=$lang_resource['WORLDPAY_PAYMENT_HEADER']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="worldpayenabled" '+lwp+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="worldpayenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.WorldPayForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_WORLDPAY_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		
		var ltap =''
		if(e.paymentlist[10]){
			if(e.paymentlist[10].enabled == 1){
				var ltap = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/transactium-icon.png"></span> <?=$lang_resource['PAYMENT_TRANSACTIUM_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="transactiumenabled" '+ltap+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="transactiumenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.TransactiumForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_TRANSACTIUM_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		htms +='</div>'		
		<!--row-->
		htms +='<div class="row">'
		var lpep =''
		if(e.paymentlist[11]){
			if(e.paymentlist[11].enabled == 1){
				var lpep = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/payment-exp-panel.png"></span> <?=$lang_resource['PAYMENT_PEXPRESS_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="pexpressenabled" '+lpep+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="pexpressenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PexpressForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PEXPRESS_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		
		var lmap =''
		if(e.paymentlist[12]){
			if(e.paymentlist[12].enabled == 1){
				var lmap = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/maksekeskus-panel.png"></span> <?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="maksekeskusenabled" '+lmap+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="maksekeskusenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.MakeskeskusForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_MAKESKESKUS_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		
		htms +='</div>'		
		<!--row-->
		
		htms +='<div class="row">'		
		var lvog =''
		if(e.paymentlist[13]){
			if(e.paymentlist[13].enabled == 1){
				var lvog = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/vogue-panel.png"></span> <?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="voguepayenabled" '+lvog+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="voguepayenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.VoguepayenabledForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_VOGUEPAY_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		var lskril =''
		if(e.paymentlist[14]){
			if(e.paymentlist[14].enabled == 1){
				var lskril = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/skrill-panel.png"></span> <?=$lang_resource['PAYMENT_SKRILL_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="skrillenabled" '+lskril+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="skrillenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.SkrillForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_SKRILL_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		htms +='</div>'		
		<!--row-->
		
		htms +='<div class="row">'
		var lpayeezy =''
		if(e.paymentlist[15]){
			if(e.paymentlist[15].enabled == 1){
				var lpayeezy = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/payeezy.png"></span> <?=$lang_resource['PAYMENT_PAYEEZY_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="payeezyenabled" '+lpayeezy+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="payeezyenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PayeezyForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYEEZY_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
			
		<!--row-->

		
		var lpayu =''
		if(e.paymentlist[16]){
			if(e.paymentlist[16].enabled == 1){
				var lpayu = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/payu.png"></span> <?=$lang_resource['PAYMENT_PAYU_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="payuenabled" '+lpayu+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="payuenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PayUForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYU_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		htms +='</div>'		
		<!--row-->
		
		htms +='<div class="row">'
		var lstrp =''
		if(e.paymentlist[17]){
			if(e.paymentlist[17].enabled == 1){
				var lstrp = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/stripe.png"></span> <?=$lang_resource['PAYMENT_STRIPE_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="stripeenabled" '+lstrp+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="stripeenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.StripeForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_STRIPE_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		var lppro =''
		if(e.paymentlist[18]){
			if(e.paymentlist[18].enabled == 1){
				var lppro = 'checked';
			}
		}

		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-paypal-adaptiv.png"></span> <?=$lang_resource['PAYMENT_PAYPALPRO_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="paypalproenabled" '+lppro+' name="checkbox" class="switch checkbox_2 hand"><label for="paypalproenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PaypalproForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'                                
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYPALPRO_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Paypal Section -->
		
		htms +='</div>'		
		<!--row-->
		htms +='<div class="row">'
		var lpaygistix =''
		if(e.paymentlist[19]){
			if(e.paymentlist[19].enabled == 1){
				var lpaygistix = 'checked';
			}
		}

		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/ico-paypal-adaptiv.png"></span> <?=$lang_resource['PAYMENT_PAYGISTIX_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="paygistixenabled" '+lpaygistix+' name="checkbox" class="switch checkbox_2 hand"><label for="paygistixenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PaygistixForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'                                
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYGISTIX_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		<!-- Paypal Section -->
		
		var lglb =''
		if(e.paymentlist[20]){
			if(e.paymentlist[20].enabled == 1){
				var lglb = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/global.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_GLOBAL']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="globalenabled" '+lglb+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="globalenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.GlobalForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_GLOBAL_DESCRIPTION']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		
		htms +='</div>'		
		<!--row-->
		
		htms +='<div class="row">'
		var lbt =''
		if(e.paymentlist[21]){
			if(e.paymentlist[21].enabled == 1){
				var lbt = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/card-net.png"></span> <?=$lang_resource['PAYMENT_BTRANS_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="btransenabled" '+lbt+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="btransenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.BtransForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_BTRANS_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		
		var lbsa =''
		if(e.paymentlist[22]){
			if(e.paymentlist[22].enabled == 1){
				var lbsa = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/bsa.png"></span> <?=$lang_resource['PAYMENT_BSA_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="bsaenabled" '+lbsa+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="bsaenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.BsaForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_BSA_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		htms +='</div>'		
		<!--row-->
		htms +='<div class="row">'
		var laz =''
		if(e.paymentlist[23]){
			if(e.paymentlist[23].enabled == 1){
				var laz = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/azul.png"></span> <?=$lang_resource['PAYMENT_AZUL_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="azulenabled" '+laz+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="azulenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.AzulForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_AZUL_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		var lquickpay =''
		if(e.paymentlist[24]){
			if(e.paymentlist[24].enabled == 1){
				var lquickpay = 'checked';
			}
		}

		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/quickpay.png"></span> <?=$lang_resource['PAYMENT_QUICK_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="quickpayenabled" '+lquickpay+' name="checkbox" class="switch checkbox_2 hand"><label for="quickpayenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.QuickpayForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'                                
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_QUICK_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		htms +='</div>'		
		<!--row-->
		htms +='<div class="row">'
		var lpyl =''
		if(e.paymentlist[25]){
			if(e.paymentlist[25].enabled == 1){
				var lpyl = 'checked';
			}
		}
		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span><img src="images/paynl.png"></span> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYNL']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="paynlenabled" '+lpyl+' name="checkbox" value="2" style="" class="switch checkbox_2 hand"><label for="paynlenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.PaynlForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_PAYNL_DESCRIPTION']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		
		var lzak =''
		if(e.paymentlist[26]){
			if(e.paymentlist[26].enabled == 1){
				var lzak = 'checked';
			}
		}

		htms +='<div class="col-md-6">'
		htms +='<div class="the-box rounded">'
		htms +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><span class="pay-icon"><img src="images/zaakpay.png"></span> <?=$lang_resource['PAYMENT_ZAAKPAY_PAY']?></h4></a>'
		htms +='<span class="pull-right on-right inline-popups">'
		htms +='<div class=" pull-left"><input type="checkbox" id="zaakpayenabled" '+lzak+' name="checkbox" class="switch checkbox_2 hand"><label for="zaakpayenabled">&nbsp;</label></div>'
		htms +='<a  href="javascript:PaymentGatewaySettings.ZaakpayForm(1)" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'                                
		htms +='</span>'
		htms +='<hr style="clear:both; margin-bottom:10px;">'
		htms +="<p><?=$lang_resource['BUSINESS_ZAAKPAY_DELIVERY']?></p>"
		htms +='</div>'
		<!--the-box-->
		htms +='</div>'
		<!--col-md-4-->
		
		htms +='</div>'		
		<!--row-->
		
		htms +='<div id="defaultform" style="display:none;">'
		htms +='</div>'

		PaymentGatewaySettings.paypalForm();
		PaymentGatewaySettings.PaypalAdaptiveForm();
		PaymentGatewaySettings.AuthorizeForm();
		PaymentGatewaySettings.BraintreeForm();
		PaymentGatewaySettings.MercadoForm();
		PaymentGatewaySettings.MercuryForm();
		PaymentGatewaySettings.WorldPayForm();
		PaymentGatewaySettings.TransactiumForm();
		PaymentGatewaySettings.PexpressForm();
		PaymentGatewaySettings.MakeskeskusForm();
		PaymentGatewaySettings.VoguepayenabledForm();
		PaymentGatewaySettings.SkrillForm();
		PaymentGatewaySettings.PayeezyForm();
		PaymentGatewaySettings.StripeForm();
		PaymentGatewaySettings.PayUForm();
		PaymentGatewaySettings.StripeForm();
		PaymentGatewaySettings.PaypalproForm();
		PaymentGatewaySettings.PaygistixForm();
		PaymentGatewaySettings.GlobalForm();
		PaymentGatewaySettings.BtransForm();
		PaymentGatewaySettings.BsaForm();
		PaymentGatewaySettings.AzulForm();
		PaymentGatewaySettings.QuickpayForm();
		PaymentGatewaySettings.PaynlForm();
		PaymentGatewaySettings.ZaakpayForm();

		document.getElementById("main").innerHTML = htms;
	},
	paypalForm: function(val){
		Forms.Clean("paypal_settings", "mainbuttonok");
		if (!this.PaymentDetails) {
			e = new Object();
			Forms.Form.paypal_settings.type = "create";
		}else{
			Forms.Form.payment_settings.type = "modify";	            
	        e = this.PaymentDetails.paymentlist[3].credential;
		}
		
       /* if (!this.PaymentDetails) {
        	e = new Object();
        	if(Forms.Form.paypal_settings){
				for(var f in Forms.Form.paypal_settings.fields){					
					e[f] =Forms.Form.paypal_settings.fields[f].value;
					Forms.Form.paypal_settings.type = "create";
				}
			}else{
				Forms.Clean("paypal_settings", "mainbuttonok");
				Forms.Form.paypal_settings.type = "create";  
			}           
        } else {
        	e = new Object();
        	if(Forms.Form.paypal_settings){
				for(var f in Forms.Form.paypal_settings.fields){					
					e[f] =Forms.Form.paypal_settings.fields[f].value;
					Forms.Form.paypal_settings.type = "modify";
				}
			}else{
	        	Forms.Clean("paypal_settings", "mainbuttonok");
	            Forms.Form.payment_settings.type = "modify";	            
	            e = this.PaymentDetails.paymentlist[3].credential;
	        }
        }*/
        

        var n=''
        n +='<h3 class="popup-heading"> <?=$lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_PAYPAL'] ?> </h3>'
		
		
		var pm="";
        pm ='[{"id":"-1","caption":"select option"},{"id":"0","caption":"sandbox"},{"id":"1","caption":"live"}]';
        pm = JSON.parse(pm);
		
		n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("paypal_settings", "paypal_type",pm, e.paypal_type, false,"PaymentGatewaySettings.PreValidate()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypal_type_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_ONE_OPTION']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_EMAIL']?></label>'

		n +=Forms.CreateInputPropertyPopup("paypal_settings", "paypalemail", e.paypalemail, false,"PaymentGatewaySettings.PreValidate()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypalemail_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL']?></small>'
		n +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_INVALID_EMAIL']?> </small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		// var b = [{id:'',caption:'Please select'},{id:'USD',caption:'U.S. Dollar'},{id:'EUR',caption:'Euro'},{id:'MXN',caption:'Mexican Peso'},{id:'AUD',caption:'Australian Dollar'},{id:'BRL',caption:'Brazilian Real'},{id:'CAD',caption:'Canadian Dollar'},{id:'CZK',caption:'Czech Koruna'},{id:'DKK',caption:'Danish Krone'},{id:'HKD',caption:'Hong Kong Dollar'},{id:'HUF',caption:'Hungarian Forint'},{id:'ILS',caption:'Israeli New Sheqel'},{id:'JPY',caption:'Japanese Yen'},{id:'MYR',caption:'Malaysian Ringgit'},{id:'NOK',caption:'Norwegian Krone'},{id:'NZD',caption:'New Zealand Dollar'},{id:'PHP',caption:'Philippine Peso'},{id:'PLN',caption:'Polish Zloty'},{id:'GBP',caption:'Pound Sterling'},{id:'SGD',caption:'Singapore Dollar'},{id:'SEK',caption:'Swedish Krona'},{id:'CHF',caption:'Swiss Franc'},{id:'TWD',caption:'Taiwan New Dollar'},{id:'THB',caption:'Thai Baht'},{id:'TRY',caption:'Turkish Lira'},{id:'NOTSUPPORTEDBYPAYPAL',caption:'Other: Not supported by paypal'}];
		
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
{id:'IQD',caption:'Iraqi Dinar (د.ع)'},
{id:'IRR',caption:'Iran Rial (﷼)'},
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
{id:'AED',caption:'United Arab Emirates (AED)'},
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
		n +=Forms.CreateSelectPropertyPopup("paypal_settings", "paypalcurrency", b, e.paypalcurrency, false)		
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypalcurrency_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_ONE_OPTION']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" onclick="PaymentGatewaySettings.Close(1)" class="btn btn-primary popup-submit-btn"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		if(val == 1){
			Popup.Show(n)
		}else{
			$("#defaultform").append(n)
		}
		//
		

	},
	/*Paypal Adaptive*/	
	PaypalAdaptiveForm:function(val){
		Forms.Clean("paypaladaptive", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.paypaladaptive.type = "create";
		}else{
			Forms.Form.paypaladaptive.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[4].credential;
		}

        /*if (this.PaymentDetails) {
        	F = new Object();
        	if(Forms.Form.paypaladaptive){
				for(var f in Forms.Form.paypaladaptive.fields){					
					F[f] =Forms.Form.paypaladaptive.fields[f].value;
					Forms.Form.paypaladaptive.type = "modify";
				}
			}else{
	        	Forms.Clean("paypaladaptive", "popupmainbuttonok");
	            Forms.Form.paypaladaptive.type = "modify";	            
	            F = this.PaymentDetails.paymentlist[4].credential;
	        }                 
        } else {
        	F = new Object();
        	if(Forms.Form.paypaladaptive){
				for(var f in Forms.Form.paypaladaptive.fields){					
					F[f] =Forms.Form.paypaladaptive.fields[f].value;
					Forms.Form.paypaladaptive.type = "create";
				}
			}else{
				Forms.Clean("paypaladaptive", "popupmainbuttonok");
				Forms.Form.paypaladaptive.type = "create";  
			}                      
        }*/
		
		var n ='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_STATISTICS_PAYPAL_ADAPTIVE']?></h3>'

		n +='<div class="row">'

		b = '{"id":"-1","caption":""},'
        g = "[" + b + '{"id":"0","caption":"No"},{"id":"1","caption":"Yes (Default)"},{"id":"2","caption":"Yes (Custom)"}]';
        g = JSON.parse(g);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_SPLIT_PAYMENT']?></label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "splitcase", g, F.splitcase, true, "PaymentGatewaySettings.SplitChange(this.value);PaymentGatewaySettings.PreValidate2()", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="splitcase_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		

		n +='<div id="split_change">'
		n +='</div>'
		

		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(2)"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		if(val == 1){
			Popup.Show(n)
		}else{
			$("#defaultform").append(n)
		}

		if(Forms.Form.paypaladaptive.type == "modify"){
        	PaymentGatewaySettings.SplitChange(F.splitcase,F)
    	}
    	if(Forms.Form.paypaladaptive.fields['splitcase']){
    		//alert(Forms.Form.paypaladaptive.fields['splitcase'].value)
    		PaymentGatewaySettings.SplitChange(Forms.Form.paypaladaptive.fields['splitcase'].value,F)
    	}
           
	},
	
	SplitChange: function(value,F){
		if(!F){
    		F = new Object();
    	}

		var n =''

		if(value == 1 || value == 2){
		n +='<div class="row">'

		p = '{"id":"-1","caption":"Select"},'
        m = "[" + p + '{"id":"1","caption":"Yes"},{"id":"0","caption":"No"}]';
        m = JSON.parse(m);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_RECIEVE_PAYMENTS']?></label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "paymail", m, F.paymail, true,"PaymentGatewaySettings.PreValidate2()")
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
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "payadaptivemail", F.payadaptivemail, true,"PaymentGatewaySettings.PreValidate2()")
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
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_PERCENTAGE_COMMISION']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "com_per", F.com_per, true,"PaymentGatewaySettings.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
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
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "com_rate", F.com_rate, true,"PaymentGatewaySettings.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="com_rate_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_FIXEDRATE_COMMISION_REQUIRED']?></small>' 
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		n +='<div class="row">'

		j = '{"id":"-1","caption":"Select"},'
        itax = "[" + p + '{"id":"0","caption":"No"},{"id":"1","caption":"Yes City Tax"},{"id":"2","caption":"Custom %"}]';
        itax = JSON.parse(itax);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INCLUDING_TAX']?></label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "tax", itax, F.tax, false, "PaymentGatewaySettings.TaxChange(this.value);PaymentGatewaySettings.PreValidate2()", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="tax_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INCLUDING_TAX_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		

		n +='<div id="tax_part">'
		n +='</div>'

		}

		$("#split_change").empty().append(n);

		if(Forms.Form.paypaladaptive.type == "modify"){
        	PaymentGatewaySettings.TaxChange(F.tax,F);
    	}
    	if(Forms.Form.paypaladaptive.fields['tax']){
    		PaymentGatewaySettings.TaxChange(Forms.Form.paypaladaptive.fields['tax'].value,F);    		
    	}
	},
	
    TaxChange: function(value,F){
    	if(!F){
    		F = new Object();
    	}
    	var n =''
    	if(value == 2){
    	n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_CUSTOM']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "custom", F.custom, true,"PaymentGatewaySettings.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="custom_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_CUSTOM_REQUIRED']?></small>' 
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		}

    	$("#tax_part").empty().append(n);
    },    
	/*Paypal Adaptive*/
	/*Authorize*/
	AuthorizeForm:function(val){
		Forms.Clean("authorize", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.authorize.type = "create";
		}else{
			Forms.Form.authorize.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[5].credential;
		}
		
        /*if (this.PaymentDetails) {
        	F = new Object();
        	if(Forms.Form.authorize){
				for(var f in Forms.Form.authorize.fields){					
					F[f] =Forms.Form.authorize.fields[f].value;
					Forms.Form.authorize.type = "modify";
				}
			}else{
	        	Forms.Clean("authorize", "popupmainbuttonok");
	            Forms.Form.authorize.type = "modify";	            
	            F = this.PaymentDetails.paymentlist[4].credential;
	        }                 
        } else {
        	F = new Object();
        	if(Forms.Form.authorize){
				for(var f in Forms.Form.authorize.fields){					
					F[f] =Forms.Form.authorize.fields[f].value;
					Forms.Form.authorize.type = "create";
				}
			}else{
				Forms.Clean("authorize", "popupmainbuttonok");
				Forms.Form.authorize.type = "create";  
			}                      
        }*/
        var htms = ''
		htms +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_AUTHORIZE']?></h3>'

		
        m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Secure"}]';
        m = JSON.parse(m);

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_PAYMENT_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("authorize", "payment_type", m, F.payment_type, false,"PaymentGatewaySettings.PreValidate3()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="payment_type_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_ONE_OPTION']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL']?></label>'
		htms +=Forms.CreateInputPropertyPopup("authorize", "apiloginid", F.apiloginid, false,"PaymentGatewaySettings.PreValidate3()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="apiloginid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("authorize", "transactionkey", F.transactionkey, false,"PaymentGatewaySettings.PreValidate3()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="transactionkey_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->         
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(3)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->


        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}

	},
	/*Authorize*/
	/*Braintree*/
	BraintreeForm:function(val){
		Forms.Clean("braintree", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.braintree.type = "create";
		}else{
			Forms.Form.braintree.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[6].credential;
		}

        /*if (this.PaymentDetails) {
        	F = new Object();
        	if(Forms.Form.braintree){
				for(var f in Forms.Form.braintree.fields){					
					F[f] =Forms.Form.braintree.fields[f].value;
					Forms.Form.braintree.type = "modify";
				}
			}else{
	        	Forms.Clean("braintree", "popupmainbuttonok");
	            Forms.Form.braintree.type = "modify";	            
	            F = this.PaymentDetails.paymentlist[4].credential;
	        }                 
        } else {
        	F = new Object();
        	if(Forms.Form.braintree){
				for(var f in Forms.Form.braintree.fields){					
					F[f] =Forms.Form.braintree.fields[f].value;
					Forms.Form.braintree.type = "create";
				}
			}else{
				Forms.Clean("braintree", "popupmainbuttonok");
				Forms.Form.braintree.type = "create";  
			}                      
        }*/

	
        var htms = ''
		htms +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_BRAINTREE']?></h3>'
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Sandbox"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_PAYMENT_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("braintree", "environment", m, F.environment, false,"PaymentGatewaySettings.PreValidate4()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="environment_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID']?></label>'
		htms +=Forms.CreateInputPropertyPopup("braintree", "merchant_id", F.merchant_id, false,"PaymentGatewaySettings.PreValidate4()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="merchant_id_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("braintree", "public_key", F.public_key, false,"PaymentGatewaySettings.PreValidate4()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="public_key_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("braintree", "private_key", F.private_key, false,"PaymentGatewaySettings.PreValidate4()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="private_key_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row-->  

		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(4)" ><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->


        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}

	},
	/*Braintree*/
	/*Mercadopago*/
	MercadoForm: function(val){
		Forms.Clean("mercadopago", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.mercadopago.type = "create";
		}else{
			Forms.Form.mercadopago.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[9].credential;
		}

		/*if (this.PaymentDetails) {
        	F = new Object();
        	if(Forms.Form.mercadopago){
				for(var f in Forms.Form.mercadopago.fields){					
					F[f] =Forms.Form.mercadopago.fields[f].value;
					Forms.Form.mercadopago.type = "modify";
				}
			}else{
	        	Forms.Clean("mercadopago", "popupmainbuttonok");
	            Forms.Form.mercadopago.type = "modify";	            
	            F = this.PaymentDetails.paymentlist[4].credential;
	        }                 
        } else {
        	F = new Object();
        	if(Forms.Form.mercadopago){
				for(var f in Forms.Form.mercadopago.fields){					
					F[f] =Forms.Form.mercadopago.fields[f].value;
					Forms.Form.mercadopago.type = "create";
				}
			}else{
				Forms.Clean("mercadopago", "popupmainbuttonok");
				Forms.Form.mercadopago.type = "create";  
			}                      
        }*/
		
        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_MERCADO_PAGO']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['MERCO_CLIENT_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("mercadopago", "clientkey", F.clientkey, false,"PaymentGatewaySettings.PreValidate5()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="clientkey_text" style="color:#F00;display:none;"><?=$lang_resource['MERCO_CLIENT_KEY_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['MERCO_SECRET_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("mercadopago", "secretkey", F.secretkey, false,"PaymentGatewaySettings.PreValidate5()") 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['MERCO_SECRET_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(5)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*Mercadopago*/
	
	/*MERCURY*/
	MercuryForm: function(val){
		Forms.Clean("mercury", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.mercury.type = "create";
		}else{
			Forms.Form.mercury.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[7].credential;
		}

		/*if (this.PaymentDetails) {
        	F = new Object();
        	if(Forms.Form.mercury){
				for(var f in Forms.Form.mercury.fields){					
					F[f] =Forms.Form.mercury.fields[f].value;
					Forms.Form.mercury.type = "modify";
				}
			}else{
	        	Forms.Clean("mercury", "popupmainbuttonok");
	            Forms.Form.mercury.type = "modify";	            
	            F = this.PaymentDetails.paymentlist[4].credential;
	        }                 
        } else {
        	F = new Object();
        	if(Forms.Form.mercury){
				for(var f in Forms.Form.mercury.fields){					
					F[f] =Forms.Form.mercury.fields[f].value;
					Forms.Form.mercury.type = "create";
				}
			}else{
				Forms.Clean("mercury", "popupmainbuttonok");
				Forms.Form.mercury.type = "create";  
			}                      
        }*/
		
        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['MERCURY_PAYMENT_HEADER']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_ID']?></label>'
		htms +=Forms.CreateInputPropertyPopup("mercury", "mercury_id", F.mercury_id, false,"PaymentGatewaySettings.PreValidate6()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="mercury_id_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_ID_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS']?></label>'
		htms +=Forms.CreateInputPropertyPopup("mercury", "mercury_pass", F.mercury_pass, false,"PaymentGatewaySettings.PreValidate6()",'',true) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="mercury_pass_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(6)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*MERCURY*/
	
	/*WORLDPAY*/
	WorldPayForm: function(val){
		Forms.Clean("worldpay", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.worldpay.type = "create";
		}else{
			Forms.Form.worldpay.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[8].credential;
		}

		/*if (this.PaymentDetails) {
        	F = new Object();
        	if(Forms.Form.worldpay){
				for(var f in Forms.Form.worldpay.fields){					
					F[f] =Forms.Form.worldpay.fields[f].value;
					Forms.Form.worldpay.type = "modify";
				}
			}else{
	        	Forms.Clean("worldpay", "popupmainbuttonok");
	            Forms.Form.worldpay.type = "modify";	            
	            F = this.PaymentDetails.paymentlist[4].credential;
	        }                 
        } else {
        	F = new Object();
        	if(Forms.Form.worldpay){
				for(var f in Forms.Form.worldpay.fields){					
					F[f] =Forms.Form.worldpay.fields[f].value;
					Forms.Form.worldpay.type = "create";
				}
			}else{
				Forms.Clean("worldpay", "popupmainbuttonok");
				Forms.Form.worldpay.type = "create";  
			}                      
        }*/
		
        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['WORLDPAY_PAYMENT_HEADER']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_ID']?></label>'
		htms +=Forms.CreateInputPropertyPopup("worldpay", "cardsaveid", F.cardsaveid, false,"PaymentGatewaySettings.PreValidate7()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="cardsaveid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_ID_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("worldpay", "cardsavepass", F.cardsavepass, false,"PaymentGatewaySettings.PreValidate7()",'',true) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="cardsavepass_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(7)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*WORLDPAY*/
	
	
	
	/*Transactium*/
	TransactiumForm: function(val){
		Forms.Clean("transactium", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.transactium.type = "create";
		}else{
			Forms.Form.transactium.type = "modify";
			if(this.PaymentDetails.paymentlist[10]){	            
	        F = this.PaymentDetails.paymentlist[10].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_USERNAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("transactium", "transactiumusername", F.transactiumusername, false,"PaymentGatewaySettings.PreValidate8()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumusername_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_USERNAME_REQUIRED']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("transactium", "transactiumpass", F.transactiumpass, false,"PaymentGatewaySettings.PreValidate8()",'',true) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumpass_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_TAG']?></label>'
		htms +=Forms.CreateInputPropertyPopup("transactium", "transactiumtag", F.transactiumtag, false,"PaymentGatewaySettings.PreValidate8()") 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumtag_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_TAG_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(8)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*Transactium*/
	
	
	/*Pexpress*/
	PexpressForm: function(val){
		Forms.Clean("pexpress", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.pexpress.type = "create";
		}else{
			Forms.Form.pexpress.type = "modify";
			if(this.PaymentDetails.paymentlist[11]){	            
	        F = this.PaymentDetails.paymentlist[11].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PEXPRESS_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PEXPRESS_PAY_USERNAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("pexpress", "pexpressusername", F.pexpressusername, false,"PaymentGatewaySettings.PreValidate9()")
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
		htms +=Forms.CreateInputPropertyPopup("pexpress", "pexpresspass", F.pexpresspass, false,"PaymentGatewaySettings.PreValidate9()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="pexpresspass_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PEXPRESS_PAY_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(9)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*Pexpress*/
	
	/*MAKESKESKUS*/
	MakeskeskusForm: function(val){
		Forms.Clean("maksekeskus", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.maksekeskus.type = "create";
		}else{
			Forms.Form.maksekeskus.type = "modify";
			if(this.PaymentDetails.paymentlist[12]){	            
	        F = this.PaymentDetails.paymentlist[12].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("maksekeskus", "maksekeskus_pay", m,F.maksekeskus_pay, false,"PaymentGatewaySettings.PreValidate10()")

		
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
		htms +=Forms.CreateInputPropertyPopup("maksekeskus", "maksekeskus_shopid", F.maksekeskus_shopid, false,"PaymentGatewaySettings.PreValidate10()",'',false) 
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
		htms +=Forms.CreateInputPropertyPopup("maksekeskus", "maksekeskus_secretkey", F.maksekeskus_secretkey, false,"PaymentGatewaySettings.PreValidate10()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="maksekeskus_secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_SECRET_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(10)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*MAKESKESKUS*/
	
	/*VOGUEPAY*/
	VoguepayenabledForm: function(val){
		Forms.Clean("voguepay", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.voguepay.type = "create";
		}else{
			Forms.Form.voguepay.type = "modify";
			if(this.PaymentDetails.paymentlist[13]){	            
	        F = this.PaymentDetails.paymentlist[13].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("voguepay", "vogue_pay", m,F.vogue_pay, false,"PaymentGatewaySettings.PreValidate11()")

		
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
		htms +=Forms.CreateInputPropertyPopup("voguepay", "vogue_merchant_id", F.vogue_merchant_id, false,"PaymentGatewaySettings.PreValidate11()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="vogue_merchant_id_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_VOGUEPAY_PAY_MERCHANT_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(11)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*VOGUEPAY*/
	
	/*SKRILL*/
	
	SkrillForm: function(val){
		Forms.Clean("skrill", "mainbuttonok");
		if (!this.PaymentDetails) {
			e = new Object();
			Forms.Form.skrill.type = "create";
		}else{
			Forms.Form.skrill.type = "modify";	
			if(this.PaymentDetails.paymentlist[14]){	            
	        e = this.PaymentDetails.paymentlist[14].credential;
			}
		}
		
        var n=''
        n +='<h3 class="popup-heading"> <?=$lang_resource['PAYMENT_SKRILL_PAY'] ?> </h3>'
		
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_SKRILL_PAY_EMAIL']?></label>'

		n +=Forms.CreateInputPropertyPopup("skrill", "skrillemail", e.skrillemail, false,"PaymentGatewaySettings.PreValidate12()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="skrillemail_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_SKRILL_PAY_EMAIL_REQUIRED']?></small>'
		n +='<small data-bv-validator="notEmpty" class="help-block" id="skrillemail_text1" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_SKRILL_PAY_EMAIL_INVALID']?> </small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" onclick="PaymentGatewaySettings.Close(12)" class="btn btn-primary popup-submit-btn"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		if(val == 1){
			Popup.Show(n)
		}else{
			$("#defaultform").append(n)
		}
		//
		

	},
	/*SKRILL*/
	
	/*PAYEEZY*/
	
	PayeezyForm: function(val){
		Forms.Clean("payeezy", "mainbuttonok");
		if (!this.PaymentDetails) {
			e = new Object();
			Forms.Form.payeezy.type = "create";
		}else{
			Forms.Form.payeezy.type = "modify";	
			if(this.PaymentDetails.paymentlist[15]){	            
	        e = this.PaymentDetails.paymentlist[15].credential;
			}
		}
		
        var n=''
        n +='<h3 class="popup-heading"> <?=$lang_resource['PAYMENT_PAYEEZY_PAY'] ?> </h3>'
		
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APIKEY']?></label>'

		n +=Forms.CreateInputPropertyPopup("payeezy", "payeezyapikey", e.payeezyapikey, false,"PaymentGatewaySettings.PreValidate13()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payeezyapikey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APIKEY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APISECRET']?></label>'

		n +=Forms.CreateInputPropertyPopup("payeezy", "payeezyapisecret", e.payeezyapisecret, false,"PaymentGatewaySettings.PreValidate13()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payeezyapisecret_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_APISECRET_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_SECURITY']?></label>'

		n +=Forms.CreateInputPropertyPopup("payeezy", "payeezyjssecurity", e.payeezyjssecurity, false,"PaymentGatewaySettings.PreValidate13()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payeezyjssecurity_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_SECURITY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_MERCHANT_TOKEN']?></label>'

		n +=Forms.CreateInputPropertyPopup("payeezy", "payeezymerchant", e.payeezymerchant, false,"PaymentGatewaySettings.PreValidate13()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payeezymerchant_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYEEZY_PAY_JS_MERCHANT_TOKEN_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" onclick="PaymentGatewaySettings.Close(13)" class="btn btn-primary popup-submit-btn"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		if(val == 1){
			Popup.Show(n)
		}else{
			$("#defaultform").append(n)
		}
		//
		

	},
	/*PAYEEZY*/
	
	/*PAYU*/
	
	PayUForm: function(val){
		Forms.Clean("payu", "mainbuttonok");
		if (!this.PaymentDetails) {
			e = new Object();
			Forms.Form.payu.type = "create";
		}else{
			Forms.Form.payu.type = "modify";	
			if(this.PaymentDetails.paymentlist[16]){	            
	        e = this.PaymentDetails.paymentlist[16].credential;
			}
		}
		
        var n=''
        n +='<h3 class="popup-heading"> <?=$lang_resource['PAYMENT_PAYU_PAY'] ?> </h3>'
		
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYU_MERCHANT_KEY']?></label>'

		n +=Forms.CreateInputPropertyPopup("payu", "payumerchantkey", e.payumerchantkey, false,"PaymentGatewaySettings.PreValidate16()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payumerchantkey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYU_MERCHANT_KEY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYU_MERCHANT_SALT']?></label>'

		n +=Forms.CreateInputPropertyPopup("payu", "payumerchantsalt", e.payumerchantsalt, false,"PaymentGatewaySettings.PreValidate16()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payumerchantsalt_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYU_MERCHANT_SALT_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
	
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_PAYU_MERCHANT_ID']?></label>'
		

		n +=Forms.CreateInputPropertyPopup("payu", "payumerchantid", e.payumerchantid, false,"PaymentGatewaySettings.PreValidate16()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payumerchantid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYU_MERCHANT_ID_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" onclick="PaymentGatewaySettings.Close(16)" class="btn btn-primary popup-submit-btn"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		if(val == 1){
			Popup.Show(n)
		}else{
			$("#defaultform").append(n)
		}
		//
		

	},
	/*PAYU*/
	
	/*STRIPE*/
	StripeForm: function(val){
		Forms.Clean("stripe", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.stripe.type = "create";
		}else{
			Forms.Form.stripe.type = "modify";
			if(this.PaymentDetails.paymentlist[17]){	            
	        F = this.PaymentDetails.paymentlist[17].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_STRIPE_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_STRIPE_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("stripe", "stripe_pay", m,F.stripe_pay, false,"PaymentGatewaySettings.PreValidate17()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="stripe_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_STRIPE_API_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("stripe", "stripeapikey", F.stripeapikey, false,"PaymentGatewaySettings.PreValidate17()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="stripeapikey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_STRIPE_API_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_STRIPE_PUBLISH_KEY']?></label>'
		htms +=Forms.CreateInputPropertyPopup("stripe", "publishablekey", F.publishablekey, false,"PaymentGatewaySettings.PreValidate17()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="publishablekey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_STRIPE_PUBLISH_KEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(17)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*STRIPE*/
	/*PAYPALPRO*/
	PaypalproForm: function(val){
		Forms.Clean("paypalpro", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.paypalpro.type = "create";
		}else{
			Forms.Form.paypalpro.type = "modify";
			if(this.PaymentDetails.paymentlist[18]){	
			//alert(JSON.stringify(this.PaymentDetails.paymentlist[13].credential))            
	        F = this.PaymentDetails.paymentlist[18].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYPALPRO_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		pp = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        pp = JSON.parse(pp);
		
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("paypalpro", "paypalpro_pay", pp,F.paypalpro_pay, false,"PaymentGatewaySettings.PreValidate18()")

		
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
		htms +=Forms.CreateInputPropertyPopup("paypalpro", "api_username", F.api_username, false,"PaymentGatewaySettings.PreValidate18()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="api_username_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_USERNAME_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paypalpro", "api_password", F.api_password, false,"PaymentGatewaySettings.PreValidate18()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="api_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_SIGNATURE']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paypalpro", "api_signature", F.api_signature, false,"PaymentGatewaySettings.PreValidate18()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="api_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_SIGNATURE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(18)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*PAYPALPRO*/
	
	/*paygistix*/
	PaygistixForm: function(val){
		Forms.Clean("paygistix", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.paygistix.type = "create";
		}else{
			Forms.Form.paygistix.type = "modify";
			if(this.PaymentDetails.paymentlist[19]){	
			//alert(JSON.stringify(this.PaymentDetails.paymentlist[13].credential))            
	        F = this.PaymentDetails.paymentlist[19].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYGISTIX_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		pp = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        pp = JSON.parse(pp);
		
		htms +='<label><?=$lang_resource['PAYMENT_PAYGISTIX_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("paygistix", "paygistix_pay", pp,F.paygistix_pay, false,"PaymentGatewaySettings.PreValidate19()")

		
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paygistix_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>' 
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_USERNAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paygistix", "paygistix_username", F.paygistix_username, false,"PaymentGatewaySettings.PreValidate19()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paygistix_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_USERNAME_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row--> 
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['PAYMENT_PAYPALPRO_PASSWORD']?></label>'
		htms +=Forms.CreateInputPropertyPopup("paygistix", "paygistix_password", F.paygistix_password, false,"PaymentGatewaySettings.PreValidate19()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paygistix_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYPALPRO_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

	
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(19)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	
	/*paygistix*/
	
	/*GLOBAL*/
	GlobalForm: function(val){
		Forms.Clean("global", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.global.type = "create";
		}else{
			Forms.Form.global.type = "modify";
			if(this.PaymentDetails.paymentlist[20]){	            
	        F = this.PaymentDetails.paymentlist[20].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_GLOBAL_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Production"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_GLOBAL_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("global", "global_pay", m,F.global_pay, false,"PaymentGatewaySettings.PreValidate20()")

		
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
		htms +=Forms.CreateInputPropertyPopup("global", "global_sresecureid", F.global_sresecureid, false,"PaymentGatewaySettings.PreValidate20()",'',false) 
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
		htms +=Forms.CreateInputPropertyPopup("global", "global_password", F.global_password, false,"PaymentGatewaySettings.PreValidate20()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="global_password_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_GLOBAL_PAY_PASSWORD_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(20)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*GLOBAL*/
	/*BTRANS*/
	BtransForm:function(val){
		Forms.Clean("btrans", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.btrans.type = "create";
		}else{
			Forms.Form.btrans.type = "modify";	            
	        F = this.PaymentDetails.paymentlist[21].credential;
		}

      

	
        var htms = ''
		htms +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_BTRANS']?></h3>'
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD1']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("btrans", "btrans_pay", m, F.btrans_pay, false,"PaymentGatewaySettings.PreValidate21()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchantname", F.btrans_merchantname, false,"PaymentGatewaySettings.PreValidate21()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchantname_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NAME_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NUMBER']?></label>'
		htms +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchantnumber", F.btrans_merchantnumber, false,"PaymentGatewaySettings.PreValidate21()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchantnumber_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_NUMBER_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TYPE']?></label>'
		htms +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchanttype", F.btrans_merchanttype, false,"PaymentGatewaySettings.PreValidate21()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchanttype_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TYPE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TERMINAL']?></label>'
		htms +=Forms.CreateInputPropertyPopup("btrans", "btrans_merchantterminal", F.btrans_merchantterminal, false,"PaymentGatewaySettings.PreValidate21()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="btrans_merchantterminal_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BTRANS_MARCHANT_TERMINAL_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row--> 
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(21)" ><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->


        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}

	},
	/*BTRANS*/
	/*BSA*/
	
	BsaForm: function(val){
		Forms.Clean("bsa", "mainbuttonok");
		if (!this.PaymentDetails) {
			e = new Object();
			Forms.Form.bsa.type = "create";
		}else{
			Forms.Form.bsa.type = "modify";	
			if(this.PaymentDetails.paymentlist[22]){	            
	        e = this.PaymentDetails.paymentlist[22].credential;
			}
		}
		
        var n=''
        n +='<h3 class="popup-heading"> <?=$lang_resource['PAYMENT_BSA_PAY'] ?> </h3>'
		m = '[{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD']?></label>'

		n +=Forms.CreateSelectPropertyPopup("bsa", "bsapay", m, e.bsapay, false, "", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="bsapay_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_BSA_PAY_CHANNELS']?></label>'

		n +=Forms.CreateInputPropertyPopup("bsa", "bsachannels", e.bsachannels, false,"PaymentGatewaySettings.PreValidate22()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="bsachannels_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_CHANNELS_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_BSA_PAY_MERCHANTCODE']?></label>'

		n +=Forms.CreateInputPropertyPopup("bsa", "bsamerchantcode", e.bsamerchantcode, false,"PaymentGatewaySettings.PreValidate22()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="bsamerchantcode_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_MERCHANTCODE_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_BSA_PAY_TERMINAL']?></label>'

		n +=Forms.CreateInputPropertyPopup("bsa", "bsaterminal", e.bsaterminal, false,"PaymentGatewaySettings.PreValidate22()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="bsaterminal_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_TERMINAL_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_BSA_PAY_TRANSACTIONTYPE']?></label>'

		n +=Forms.CreateInputPropertyPopup("bsa", "bsatransationtype", e.bsatransationtype, false,"PaymentGatewaySettings.PreValidate22()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="bsatransationtype_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_TRANSACTIONTYPE_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_BSA_PAY_CURRENCY']?></label>'

		n +=Forms.CreateInputPropertyPopup("bsa", "bsacurrency", e.bsacurrency, false,"PaymentGatewaySettings.PreValidate22()", false, false, "")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="bsacurrency_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_BSA_PAY_CURRENCY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" onclick="PaymentGatewaySettings.Close(22)" class="btn btn-primary popup-submit-btn"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		if(val == 1){
			Popup.Show(n)
		}else{
			$("#defaultform").append(n)
		}
		//
		

	},
	/*BSA*/
	
	/*AZUL*/
	AzulForm:function(val){
		Forms.Clean("azul", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.azul.type = "create";
		}else{
			Forms.Form.azul.type = "modify";				    
			if(this.PaymentDetails.paymentlist[23]){
				F = this.PaymentDetails.paymentlist[23].credential;
			}else{
				F = new Object();
			}    
	        
		}

      

	
        var htms = ''
		htms +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_PAYMENT_GATEWAY_AZUL']?></h3>'
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD1']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("azul", "azul_pay", m, F.azul_pay, false,"PaymentGatewaySettings.PreValidate23()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="azul_pay_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_NAME']?></label>'
		htms +=Forms.CreateInputPropertyPopup("azul", "azul_merchantname", F.azul_merchantname, false,"PaymentGatewaySettings.PreValidate23()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="azul_merchantname_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_NAME_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row-->
		htms +='<div class="row">'
	
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_ID']?></label>'
		htms +=Forms.CreateInputPropertyPopup("azul", "azul_merchantid", F.azul_merchantid, false,"PaymentGatewaySettings.PreValidate23()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="azul_merchantid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_ID_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TYPE']?></label>'
		htms +=Forms.CreateInputPropertyPopup("azul", "azul_merchanttype", F.azul_merchanttype, false,"PaymentGatewaySettings.PreValidate23()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="azul_merchanttype_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TYPE_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		
		htms +='</div>'
		<!--row-->  
		htms +='<div class="row">'

	
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TERMINAL']?></label>'
		htms +=Forms.CreateInputPropertyPopup("azul", "azul_authkey", F.azul_authkey, false,"PaymentGatewaySettings.PreValidate23()")
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="azul_authkey_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AZUL_MARCHANT_TERMINAL_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-6-->
		htms +='</div>'
		<!--row--> 
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(23)" ><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->


        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}

	},
	/*AZUL*/
	
	/*QUICKPAY*/
	QuickpayForm: function(val){
		Forms.Clean("quickpay", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.quickpay.type = "create";
		}else{
			Forms.Form.quickpay.type = "modify";
			if(this.PaymentDetails.paymentlist[24]){	
			//alert(JSON.stringify(this.PaymentDetails.paymentlist[13].credential))            
	        F = this.PaymentDetails.paymentlist[24].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_QUICK_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		pp = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        pp = JSON.parse(pp);
		
		htms +='<label><?=$lang_resource['PAYMENT_QUICK_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("quickpay", "quick_pay", pp,F.quick_pay, false,"PaymentGatewaySettings.PreValidate24()")

		
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
		htms +=Forms.CreateInputPropertyPopup("quickpay", "quickpay_merchant", F.quickpay_merchant, false,"PaymentGatewaySettings.PreValidate24()",'',false) 
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
		htms +=Forms.CreateInputPropertyPopup("quickpay", "quickpay_md5secret", F.quickpay_md5secret, false,"PaymentGatewaySettings.PreValidate24()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="quickpay_md5secret_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_QUICKPAY_SECRET_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

	
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(24)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	
	/*QUICKPAY*/
	/*PAYNL*/
	PaynlForm: function(val){
		Forms.Clean("paynl", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.paynl.type = "create";
		}else{
			Forms.Form.stripe.type = "modify";
			if(this.PaymentDetails.paymentlist[25]){	            
	        F = this.PaymentDetails.paymentlist[25].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_PAYNL_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		m = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        m = JSON.parse(m);
		
		htms +='<label><?=$lang_resource['PAYMENT_PAYNL_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("paynl", "paynl_pay", m,F.paynl_pay, false,"PaymentGatewaySettings.PreValidate25()")

		
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
		htms +=Forms.CreateInputPropertyPopup("paynl", "paynl_apitoken", F.paynl_apitoken, false,"PaymentGatewaySettings.PreValidate25()",'',false) 
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
		htms +=Forms.CreateInputPropertyPopup("paynl", "paynl_serviceid", F.paynl_serviceid, false,"PaymentGatewaySettings.PreValidate25()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="paynl_serviceid_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_PAYNL_API_SERVICEID_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(25)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	/*PAYNL*/
	/*ZAAKPAY*/
	ZaakpayForm: function(val){
		Forms.Clean("zaakpay", "mainbuttonok");
		if (!this.PaymentDetails) {
			F = new Object();
			Forms.Form.zaakpay.type = "create";
		}else{
			Forms.Form.zaakpay.type = "modify";
			if(this.PaymentDetails.paymentlist[26]){	
			//alert(JSON.stringify(this.PaymentDetails.paymentlist[20].credential))            
	        F = this.PaymentDetails.paymentlist[26].credential;
			}
		}

        var htms = ''
        htms +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_ZAAKPAY_PAY']?></h3>'
		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		
		pp = '[{"id":"-1","caption":"select option"},{"id":"0","caption":"Test"},{"id":"1","caption":"Live"}]';
        pp = JSON.parse(pp);
		
		htms +='<label><?=$lang_resource['PAYMENT_ZAAKPAY_PAY_METHOD']?></label>'
		htms +=Forms.CreateSelectPropertyPopup("zaakpay", "zaakpay_pay", pp,F.zaakpay_pay, false,"PaymentGatewaySettings.PreValidate26()")

		
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
		htms +=Forms.CreateInputPropertyPopup("zaakpay", "zaakpay_merchantid", F.zaakpay_merchantid, false,"PaymentGatewaySettings.PreValidate26()",'',false) 
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
		htms +=Forms.CreateInputPropertyPopup("zaakpay", "zaakpay_secretkey", F.zaakpay_secretkey, false,"PaymentGatewaySettings.PreValidate26()",'',false) 
		htms +='<small data-bv-validator="notEmpty" class="help-block" id="zaakpay_secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_ZAAKPAY_SECRETKEY_REQUIRED']?></small>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-12-->
		htms +='</div>'
		<!--row-->  

	
		
		
		htms +='<div class="row">'
		htms +='<div class="col-md-6 col-md-offset-3">'
		htms +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PaymentGatewaySettings.Close(26)"><?=$lang_resource['SUBMIT']?></button></center>'
		htms +='</div>'
		<!--col-md--->
		htms +='</div>'
		<!--row-->

        if(val == 1){
			Popup.Show(htms)
		}else{
			$("#defaultform").append(htms)
		}
	},
	
	/*ZAAKPAY*/
	/*********validate popup Fields***************/
	PreValidate: function (){
		var count = 0;
		
		if(document.getElementById("paypal_type").value == "-1"){            
            $("#paypal_type_text").show();
            $("#paypal_type").addClass("error-text-field");
            $("#paypal_type").removeClass("success-text-field");
           count++;
        }else{
            $("#paypal_type_text").hide();
            $("#paypal_type").addClass("success-text-field");
            $("#paypal_type").removeClass("error-text-field");
        }
		
		if(document.getElementById("paypalemail").value == ""){            
            $("#paypalemail_text").show();
            $("#paypalemail").addClass("error-text-field");
            $("#paypalemail").removeClass("success-text-field");
           count++;
        }else{
            $("#paypalemail_text").hide();
            $("#paypalemail").addClass("success-text-field");
            $("#paypalemail").removeClass("error-text-field");
        }
		var email = document.getElementById("paypalemail").value;
		var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(email).match(emailReg)){
            $("#email_text1").show();
            $("#paypalemail2").addClass("error-text-field");
            $("#paypalemail2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#email_text1").hide();
            $("#paypalemail2").addClass("error-text-field");
            $("#paypalemail2").removeClass("success-text-field");
		}
		

		
		
		if(count == 0)
        	return true
        else 
        	return false
		
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
		
		//if(b == 1){
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
		
		//}
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	PreValidate3: function (){
		var count = 0;
		if(document.getElementById("payment_type").value == "-1"){            
            $("#payment_type_text").show();
            $("#payment_type").addClass("error-text-field");
            $("#payment_type").removeClass("success-text-field");
           count++;
        }else{
            $("#payment_type_text").hide();
            $("#payment_type").addClass("success-text-field");
            $("#payment_type").removeClass("error-text-field");
        }
		
		if(document.getElementById("apiloginid").value == ""){            
            $("#apiloginid_text").show();
            $("#apiloginid").addClass("error-text-field");
            $("#apiloginid").removeClass("success-text-field");
           count++;
        }else{
            $("#apiloginid_text").hide();
            $("#apiloginid").addClass("success-text-field");
            $("#apiloginid").removeClass("error-text-field");
        }
		if(document.getElementById("transactionkey").value == ""){            
            $("#transactionkey_text").show();
            $("#transactionkey").addClass("error-text-field");
            $("#transactionkey").removeClass("success-text-field");
           count++;
        }else{
            $("#transactionkey_text").hide();
            $("#transactionkey").addClass("success-text-field");
            $("#transactionkey").removeClass("error-text-field");
        }
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	PreValidate4: function (){
		var count = 0;
		if(document.getElementById("environment").value == "-1"){            
            $("#environment_text").show();
            $("#environment").addClass("error-text-field");
            $("#environment").removeClass("success-text-field");
           count++;
        }else{
            $("#environment_text").hide();
            $("#environment").addClass("success-text-field");
            $("#environment").removeClass("error-text-field");
        }
		
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
	
	PreValidate17: function (){
		var count = 0;
		
		if(document.getElementById("stripe_pay").value == "-1"){            
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
		
		if(document.getElementById("api_username").value == ""){            
            $("#api_username_text").show();
            $("#api_username").addClass("error-text-field");
            $("#api_username").removeClass("success-text-field");
           count++;
        }else{
            $("#api_username_text").hide();
            $("#api_username").addClass("success-text-field");
            $("#api_username").removeClass("error-text-field");
        }
		if(document.getElementById("api_password").value == ""){            
            $("#api_password_text").show();
            $("#api_password").addClass("error-text-field");
            $("#api_password").removeClass("success-text-field");
           count++;
        }else{
            $("#api_password_text").hide();
            $("#api_password").addClass("success-text-field");
            $("#api_password").removeClass("error-text-field");
        }
		if(document.getElementById("api_signature").value == ""){            
            $("#api_signature_text").show();
            $("#api_signature").addClass("error-text-field");
            $("#api_signature").removeClass("success-text-field");
           count++;
        }else{
            $("#api_signature_text").hide();
            $("#api_signature").addClass("success-text-field");
            $("#api_signature").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
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
            $("#azul_authkey_text").hide();
            $("#azul_authkey").addClass("success-text-field");
            $("#azul_authkey").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
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
	/*********validate popup Fields***************/
	
	Close: function(a){
		if(a == 1){
			if(PaymentGatewaySettings.PreValidate() == false){
			return
		}
		} else if(a == 2){	
		/*if(document.getElementById("splitcase").value == "0"){
			Popup.Close();
		}else{*/
			if(PaymentGatewaySettings.PreValidate2() == false){
			return
		//}
		}
		}else if(a == 3){		
			if(PaymentGatewaySettings.PreValidate3() == false){
			return
		}
		}else if(a == 4){		
			if(PaymentGatewaySettings.PreValidate4() == false){
			return
		}
		}else if(a == 5){		
			if(PaymentGatewaySettings.PreValidate5() == false){
			return
		}
		}
		else if(a == 6){		
			if(PaymentGatewaySettings.PreValidate6() == false){
			return
		}
		}else if(a == 7){		
			if(PaymentGatewaySettings.PreValidate7() == false){
			return
		}
		}else if(a == 8){		
			if(PaymentGatewaySettings.PreValidate8() == false){
			return
		}
		}else if(a == 9){		
			if(PaymentGatewaySettings.PreValidate9() == false){
			return
		}
		}
		else if(a == 10){		
			if(PaymentGatewaySettings.PreValidate10() == false){
			return
		}
		}
		else if(a == 11){		
			if(PaymentGatewaySettings.PreValidate11() == false){
			return
		}
		}
		else if(a == 12){		
			if(PaymentGatewaySettings.PreValidate12() == false){
			return
		}
		}
		else if(a == 13){		
			if(PaymentGatewaySettings.PreValidate13() == false){
			return
		}
		else if(a == 16){		
			if(PaymentGatewaySettings.PreValidate16() == false){
			return
		}
		}
		else if(a == 17){		
			if(PaymentGatewaySettings.PreValidate17() == false){
			return
		}
		}
		else if(a == 18){		
			if(PaymentGatewaySettings.PreValidate18() == false){
			return
		}
		}
		else if(a == 19){		
			if(PaymentGatewaySettings.PreValidate19() == false){
			return
		}
		}
		else if(a == 20){		
			if(PaymentGatewaySettings.PreValidate20() == false){
			return
		}
		}
		else if(a == 21){		
			if(PaymentGatewaySettings.PreValidate21() == false){
			return
		}
		}
		else if(a == 22){		
			if(PaymentGatewaySettings.PreValidate22() == false){
			return
		}
		}
		else if(a == 23){		
			if(PaymentGatewaySettings.PreValidate23() == false){
			return
		}
		}
		else if(a == 24){		
			if(PaymentGatewaySettings.PreValidate24() == false){
			return
		}
		}
		else if(a == 25){		
			if(PaymentGatewaySettings.PreValidate25() == false){
			return
		}
		}
		else if(a == 26){		
			if(PaymentGatewaySettings.PreValidate25() == false){
			return
		}
		}
		}
		Popup.Close();
		
		

	},
	PreValidation: function(){
		var count = 0;
		 if(document.getElementById("business_id").value == ""){            
            $("#business_id_text").show();
            $("#business_id").addClass("error-text-field");
            $("#business_id").removeClass("success-text-field");
            count ++;
        }else{
            $("#business_id_text").hide();
            $("#business_id").addClass("success-text-field");
            $("#business_id").removeClass("error-text-field");
        }

		if($("#business_id").val()){
			var businessid = $("#business_id").val();
		}
		usertype = 0;

		/*CASH ARRAY DEFINE*/
		var cashArray = new Object();
		cashArray.paymentgateway_id= 1;
		cashArray.business_id= businessid;
		cashArray.user_type= usertype;

		cashArray.credential ='';
		var cash_enabled = document.getElementById("cashenabled").checked;
		cashArray.enabled = cash_enabled;
		/*CASH ARRAY DEFINE*/

		/*CARD ARRAY DEFINE*/
		var cardArray = new Object();
		cardArray.paymentgateway_id = 2;
		cardArray.business_id = businessid;
		cardArray.user_type = usertype;
		cardArray.credential ='';
		var card_enabled = document.getElementById("cardenabled").checked;
		cardArray.enabled = card_enabled;
		/*CARD ARRAY DEFINE*/

		/*PAYPAL ARRAY DEFINE*/
		var paypalArray = new Object();
		paypalArray.paymentgateway_id = 3;
		paypalArray.business_id = businessid;
		paypalArray.user_type = usertype;
		
		var paymentIconArray = new Array();
		for(var f in Forms.Form.paypal_settings.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.paypal_settings.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		paypalArray.credential =paymentIconArray;
		var paypal_enabled = document.getElementById("paypalenabled").checked;
		paypalArray.enabled = paypal_enabled;
		/*PAYPAL ARRAY DEFINE*/		

		/*PAYPALADAPTIVE ARRAY DEFINE*/
		var paypaladaptiveArray = new Object();
		paypaladaptiveArray.paymentgateway_id = 4;
		paypaladaptiveArray.business_id = businessid;
		paypaladaptiveArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.paypaladaptive.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.paypaladaptive.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		paypaladaptiveArray.credential =paymentIconArray;
		var paypaladaptive_enabled = document.getElementById("paypaladaptiveenabled").checked;
		paypaladaptiveArray.enabled = paypaladaptive_enabled;
		/*PAYPALADAPTIVE ARRAY DEFINE*/	

		/*AUTHORIZE ARRAY DEFINE*/
		var authorizeArray = new Object();
		authorizeArray.paymentgateway_id = 5;
		authorizeArray.business_id = businessid;
		authorizeArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.authorize.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.authorize.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		authorizeArray.credential =paymentIconArray;
		var authorize_enabled = document.getElementById("authorizeenabled").checked;
		authorizeArray.enabled = authorize_enabled;
		/*AUTHORIZE ARRAY DEFINE*/	

		/*BRAINTREE ARRAY DEFINE*/
		var braintreeArray = new Object();
		braintreeArray.paymentgateway_id = 6;
		braintreeArray.business_id = businessid;
		braintreeArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.braintree.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.braintree.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		braintreeArray.credential =paymentIconArray;
		var braintree_enabled = document.getElementById("braintreeenabled").checked;
		braintreeArray.enabled = braintree_enabled;
		/*BRAINTREE ARRAY DEFINE*/	

		/*MERCADOPAGO ARRAY DEFINE*/
		var mecadopagoArray = new Object();
		mecadopagoArray.paymentgateway_id = 9;
		mecadopagoArray.business_id = businessid;
		mecadopagoArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.mercadopago.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.mercadopago.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		mecadopagoArray.credential =paymentIconArray;
		var mercadopago_enabled = document.getElementById("mercadopagoenabled").checked;
		mecadopagoArray.enabled = mercadopago_enabled;
		/*MERCADOPAGO ARRAY DEFINE*/
		
		/*MERCURY ARRAY DEFINE*/
		var mercuryArray = new Object();
		mercuryArray.paymentgateway_id = 7;
		mercuryArray.business_id = businessid;
		mercuryArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.mercury.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.mercury.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		mercuryArray.credential =paymentIconArray;
		var mercury_enabled = document.getElementById("mercuryenabled").checked;
		mercuryArray.enabled = mercury_enabled;
		/*MERCURY ARRAY DEFINE*/
		/*WORLDPAY ARRAY DEFINE*/
		var worldpayArray = new Object();
		worldpayArray.paymentgateway_id = 8;
		worldpayArray.business_id = businessid;
		worldpayArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.worldpay.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.worldpay.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		worldpayArray.credential =paymentIconArray;
		var worldpay_enabled = document.getElementById("worldpayenabled").checked;
		worldpayArray.enabled = worldpay_enabled;
		/*WORLDPAY ARRAY DEFINE*/		
		/*Transactium ARRAY DEFINE*/
		var transactiumArray = new Object();
		transactiumArray.paymentgateway_id = 10;
		transactiumArray.business_id = businessid;
		transactiumArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.transactium.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.transactium.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		transactiumArray.credential =paymentIconArray;
		var transactium_enabled = document.getElementById("transactiumenabled").checked;
		transactiumArray.enabled = transactium_enabled;
		/*Transactium ARRAY DEFINE*/
		
		/*PEXPRESS ARRAY DEFINE*/
		var pexpressArray = new Object();
		pexpressArray.paymentgateway_id = 11;
		pexpressArray.business_id = businessid;
		pexpressArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.pexpress.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.pexpress.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		pexpressArray.credential =paymentIconArray;
		var pexpress_enabled = document.getElementById("pexpressenabled").checked;
		pexpressArray.enabled = pexpress_enabled;
		/*PEXPRESS ARRAY DEFINE*/
		
		/*MAKESKESKUS ARRAY DEFINE*/
		var maksekeskusArray = new Object();
		maksekeskusArray.paymentgateway_id = 12;
		maksekeskusArray.business_id = businessid;
		maksekeskusArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.maksekeskus.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.maksekeskus.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		maksekeskusArray.credential =paymentIconArray;
		var maksekeskus_enabled = document.getElementById("maksekeskusenabled").checked;
		maksekeskusArray.enabled = maksekeskus_enabled;
		/*MAKESKESKUS ARRAY DEFINE*/
		
		
		/*VOUGEPAY ARRAY DEFINE*/
		var voguepayArray = new Object();
		voguepayArray.paymentgateway_id = 13;
		voguepayArray.business_id = businessid;
		voguepayArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.voguepay.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.voguepay.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		voguepayArray.credential =paymentIconArray;
		var voguepay_enabled = document.getElementById("voguepayenabled").checked;
		voguepayArray.enabled = voguepay_enabled;
		/*VOUGEPAY ARRAY DEFINE*/
		
		
		/*SKRILL ARRAY DEFINE*/
		var skrillArray = new Object();
		skrillArray.paymentgateway_id = 14;
		skrillArray.business_id = businessid;
		skrillArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.skrill.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.skrill.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		skrillArray.credential =paymentIconArray;
		var skrill_enabled = document.getElementById("skrillenabled").checked;
		skrillArray.enabled = skrill_enabled;
		/*SKRILL ARRAY DEFINE*/
		
		/*PAYEEZY ARRAY DEFINE*/
		var payeezyArray = new Object();
		payeezyArray.paymentgateway_id = 15;
		payeezyArray.business_id = businessid;
		payeezyArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.payeezy.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.payeezy.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		payeezyArray.credential =paymentIconArray;
		var payeezy_enabled = document.getElementById("payeezyenabled").checked;
		payeezyArray.enabled = payeezy_enabled;
		/*PAYEEZY ARRAY DEFINE*/
		
		
		/*PAYU ARRAY DEFINE*/
		var payuArray = new Object();
		payuArray.paymentgateway_id = 16;
		payuArray.business_id = businessid;
		payuArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.payu.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.payu.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		payuArray.credential =paymentIconArray;
		var payu_enabled = document.getElementById("payuenabled").checked;
		payuArray.enabled = payu_enabled;
		/*PAYU ARRAY DEFINE*/
		
		/*STRIPE ARRAY DEFINE*/
		var stripeArray = new Object();
		stripeArray.paymentgateway_id = 17;
		stripeArray.business_id = businessid;
		stripeArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.stripe.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.stripe.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		stripeArray.credential =paymentIconArray;
		var stripe_enabled = document.getElementById("stripeenabled").checked;
		stripeArray.enabled = stripe_enabled;
		/*STRIPE ARRAY DEFINE*/
		/*PAYPALPRO ARRAY DEFINE*/
		var paypalproArray = new Object();
		paypalproArray.paymentgateway_id = 18;
		paypalproArray.business_id = businessid;
		paypalproArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.paypalpro.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.paypalpro.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		paypalproArray.credential =paymentIconArray;
		var paypalpro_enabled = document.getElementById("paypalproenabled").checked;
		paypalproArray.enabled = paypalpro_enabled;
		/*PAYPALPRO ARRAY DEFINE*/
		/*PAYGISTIX ARRAY DEFINE*/
		var paygistixArray = new Object();
		paygistixArray.paymentgateway_id = 19;
		paygistixArray.business_id = businessid;
		paygistixArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.paygistix.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.paygistix.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		paygistixArray.credential =paymentIconArray;
		var paygistix_enabled = document.getElementById("paygistixenabled").checked;
		paygistixArray.enabled = paygistix_enabled;
		/*PAYGISTIX ARRAY DEFINE*/	
		
		/*GLOBAL ARRAY DEFINE*/
		var globalArray = new Object();
		globalArray.paymentgateway_id = 20;
		globalArray.business_id = businessid;
		globalArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.global.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.global.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		globalArray.credential =paymentIconArray;
		var global_enabled = document.getElementById("globalenabled").checked;
		globalArray.enabled = global_enabled;
		/*GLOBAL ARRAY DEFINE*/
		
		/*Btrans ARRAY DEFINE*/
		var btransArray = new Object();
		btransArray.paymentgateway_id = 21;
		btransArray.business_id = businessid;
		btransArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.btrans.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.btrans.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		btransArray.credential =paymentIconArray;
		var btrans_enabled = document.getElementById("btransenabled").checked;
		btransArray.enabled = btrans_enabled;
		/*Btrans ARRAY DEFINE*/
		
		/*BSA ARRAY DEFINE*/
		var bsaArray = new Object();
		bsaArray.paymentgateway_id = 22;
		bsaArray.business_id = businessid;
		bsaArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.bsa.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.bsa.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		bsaArray.credential =paymentIconArray;
		var bsa_enabled = document.getElementById("bsaenabled").checked;
		bsaArray.enabled = bsa_enabled;
		/*BSA ARRAY DEFINE*/
		/*AZUL ARRAY DEFINE*/
		var azulArray = new Object();
		azulArray.paymentgateway_id = 23;
		azulArray.business_id = businessid;
		azulArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.azul.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.azul.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		azulArray.credential =paymentIconArray;
		var azul_enabled = document.getElementById("azulenabled").checked;
		azulArray.enabled = azul_enabled;
		/*AZUL ARRAY DEFINE*/
			/*QUICKPAY ARRAY DEFINE*/
		var quickpayArray = new Object();
		quickpayArray.paymentgateway_id = 24;
		quickpayArray.business_id = businessid;
		quickpayArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.quickpay.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.quickpay.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		quickpayArray.credential =paymentIconArray;
		var quickpay_enabled = document.getElementById("quickpayenabled").checked;
		quickpayArray.enabled = quickpay_enabled;
		/*QUICKPAY ARRAY DEFINE*/
		/*Paynl ARRAY DEFINE*/
		var paynlArray = new Object();
		paynlArray.paymentgateway_id = 25;
		paynlArray.business_id = businessid;
		paynlArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.paynl.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.paynl.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		paynlArray.credential =paymentIconArray;
		var paynl_enabled = document.getElementById("paynlenabled").checked;
		paynlArray.enabled = paynl_enabled;
		/*Paynl ARRAY DEFINE*/
		/*ZAAKPAY ARRAY DEFINE*/
		var zaakpayArray = new Object();
		zaakpayArray.paymentgateway_id = 20;
		zaakpayArray.business_id = businessid;
		zaakpayArray.user_type = usertype;
		var paymentIconArray = new Array();
		for(var f in Forms.Form.zaakpay.fields){
			var paymentIcon = new Object();
			paymentIcon.paymentfield = f;
			paymentIcon.value = Forms.Form.zaakpay.fields[f].value;
			paymentIconArray.push(paymentIcon);
		}		
		zaakpayArray.credential =paymentIconArray;
		var zaakpay_enabled = document.getElementById("zaakpayenabled").checked;
		zaakpayArray.enabled = zaakpay_enabled;
		/*ZAAKPAY ARRAY DEFINE*/
		
		PaymentGatewaySettings.PaymentsSettingsArray.cash=cashArray;
		PaymentGatewaySettings.PaymentsSettingsArray.card=cardArray;
		PaymentGatewaySettings.PaymentsSettingsArray.paypal=paypalArray;
		PaymentGatewaySettings.PaymentsSettingsArray.paypaladaptive=paypaladaptiveArray;
		PaymentGatewaySettings.PaymentsSettingsArray.authorize=authorizeArray;
		PaymentGatewaySettings.PaymentsSettingsArray.braintree=braintreeArray;
		PaymentGatewaySettings.PaymentsSettingsArray.mercadopago=mecadopagoArray;
		PaymentGatewaySettings.PaymentsSettingsArray.mercury=mercuryArray;
		PaymentGatewaySettings.PaymentsSettingsArray.worldpay=worldpayArray;
		PaymentGatewaySettings.PaymentsSettingsArray.transactium=transactiumArray;
		PaymentGatewaySettings.PaymentsSettingsArray.pexpress=pexpressArray;
		PaymentGatewaySettings.PaymentsSettingsArray.maksekeskus=maksekeskusArray;
		PaymentGatewaySettings.PaymentsSettingsArray.voguepay=voguepayArray;
		PaymentGatewaySettings.PaymentsSettingsArray.skrill=skrillArray;
		PaymentGatewaySettings.PaymentsSettingsArray.payeezy=payeezyArray;
		PaymentGatewaySettings.PaymentsSettingsArray.payu=payuArray;
		PaymentGatewaySettings.PaymentsSettingsArray.stripe=stripeArray;
		PaymentGatewaySettings.PaymentsSettingsArray.paypalpro=paypalproArray;
		PaymentGatewaySettings.PaymentsSettingsArray.paygistix=paygistixArray;
		PaymentGatewaySettings.PaymentsSettingsArray.global=globalArray;
		PaymentGatewaySettings.PaymentsSettingsArray.btrans=btransArray;
		PaymentGatewaySettings.PaymentsSettingsArray.bsa=bsaArray;
		PaymentGatewaySettings.PaymentsSettingsArray.azul=azulArray;
		PaymentGatewaySettings.PaymentsSettingsArray.quickpay=quickpayArray;
		PaymentGatewaySettings.PaymentsSettingsArray.paynl=paynlArray;
		PaymentGatewaySettings.PaymentsSettingsArray.zaakpay=zaakpayArray;
		//alert(JSON.stringify(PaymentGatewaySettings.PaymentsSettingsArray))
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	Save: function(){
		
		if(PaymentGatewaySettings.PreValidation() == false){
			return
		}
			
		delete PaymentGatewaySettings.PaymentDetails
		//alert(PaymentGatewaySettings.PaymentDetails)
		Main.Loading();		
		//alert(JSON.stringify(PaymentGatewaySettings.PaymentsSettingsArray))
		$.post("lib/paymentgateway_settings.php", "f=SavePaymentSettings&data=" + JSON.stringify(PaymentGatewaySettings.PaymentsSettingsArray), function (a) {
			
			
			Main.Ready();
			PaymentGatewaySettings.Main();			
		});
	},
	 Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("Please Select at least One Item");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': 'Are you Sure to Delete this Payment Settings ?',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/paymentgateway_settings.php", "f=DeletePaymentSettings&data=" + JSON.stringify(a),  function (c) {
						alert('Deleted Successfully');
						PaymentGatewaySettings.Main()
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
    },
};
