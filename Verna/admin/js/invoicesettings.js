var InvoiceSettings ={
	Main: function(id){
		InvoiceSettings.id=id;
		$.post("lib/invoicesettings.php", "f=FetchBusinessInvoiceDataByID&id="+id, function (b) {					
			InvoiceSettings.InvoiceForm(JSON.parse(b));
		});
	},
	InvoiceForm: function(F){
		Forms.Clean("invoice", "popupmainbuttonok");

        if (F) {
            Forms.Form.invoice.type = "modify";  
            Forms.Form.invoice.id = F.id         
        } else {
            F = new Object();
            Forms.Form.invoice.type = "create";  
            Forms.CreateValue("invoice", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var n ='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_INVOICE_SETTING']?></h3>'
        n +='<h4 class="form-h4" style="margin-top:10px;"><strong><?=$lang_resource['ADMIN_PAGE_BILLING_BUSINESS_DETAILS']?></strong></h4>'
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_VAT_REGISTRATION']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "vatregistration", F.vatregistration)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        
        

        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_BUSINESS_ADDRESS']?></label>'
        n +='<div class="">'
        A =''
		if(F.sameadd == 't')	
			A = 'checked'		
        n +='<input type="checkbox" id="sameadd" name="checkbox" '+A+'  style="position: absolute;width: 25px;height: 25px;" class="switch checkbox_2 hand"><label for="sameadd">&nbsp;</label>'
    	n +='</div>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_ADDRESS']?></label>'
        n +=Forms.CreateTextAreaPropertyPopup("invoice", "invoiceaddress", Main.NullToEmpty(F.invoiceaddress), false, "", false, "metaddress")
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_EMAIL_ADDRESS']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "vatemail", F.vatemail, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<h4 class="form-h4" style="margin-top:10px;"><strong><?=$lang_resource['ADMIN_PAGE_INVOICE_PAYMENT_METHOD']?></strong></h4>'
        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'

        b = '{"id":"-1","caption":""},'
        g = "[" + b + '{"id":"1","caption":"Bank"},{"id":"2","caption":"Paypal"}]';
        g = JSON.parse(g);

        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_SELECT_PAYMENT_TYPE']?></label>'
        n +=Forms.CreateSelectPropertyPopup("invoice", "payby", g, F.payby, false, "InvoiceSettings.PayBy(this.value)", false)
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row--> 
        if(Forms.Form.invoice.type == "modify"){
        	InvoiceSettings.PayBy(F.payby);
    	}

        n +='<div id="payby_field">'
        
        n +='</div>'

    	if(Main.User.level == 0){
        n +='<h4 class="form-h4" style="margin-top:10px;"><strong>Billing options</strong></h4>'
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_SETUP_RATE']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "billingfxprice", F.billingfxprice, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_FIXED_RATE']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "fixedrate", F.fixedrate, false) 
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_ORDER_COMMISSION']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "billingperorder", F.billingperorder, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_ORDER_FIXED_RATE']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "billingperorderfixrate", F.billingperorderfixrate, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_OTHER_RATE']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "otherrate", F.otherrate, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_ORDER_VAT']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "vat", F.vat, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_ORDER_GENERATE']?></label>'
        n +=Forms.CreateInputPropertyPopup("invoice", "autoinvoiceday", F.autoinvoiceday, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row--> 
    	}

        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="InvoiceSettings.InvoiceSave()"><?=$lang_resource['ORDER_DETAILS_SAVE']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n);

         $('#sameadd').click(function() {
	        if ($(this).is(':checked')) {
	            Estr = "true"
	        }else{
	        	Estr = "false"
	        }
	        var fg = "f=statusAddress&id=" + F.id + "&status=" + Estr;
	        InvoiceSettings.ChangeAddress(fg);

    	}); 
    },    
    ChangeAddress: function(fg){
	    $.post("lib/invoicesettings.php", fg, function (b) {
			if(b){
				b =JSON.parse(b);				
				document.getElementById('invoiceaddress').value = b.address;
				Forms.UpdateValue("invoice", "invoiceaddress", b.address, true);
			}			
		});
    },

    PayBy: function(payby){

    	$.post("lib/invoicesettings.php", "f=FetchPayByForm&id="+InvoiceSettings.id, function (b) {					
			InvoiceSettings.PayByForm(JSON.parse(b),payby);
		});
    },
    PayByForm: function(F,payby){
    	var n=''
    	if(payby == 1){
	        n +='<div class="row">'
	        n +='<div class="col-md-6">'
	        n +='<div class="form-group">'
	        n +='<label><?=$lang_resource['INVOICE_BANK_NAME']?></label>'
	        n +=Forms.CreateInputPropertyPopup("invoice", "bankname", F.bankname, false)
	        n +='</div>'
	        n +='</div>'
	        <!--col-md-6-->
	        n +='<div class="col-md-6">'
	        n +='<div class="form-group">'
	        n +='<label><?=$lang_resource['INVOICE_BANK_AC_NO']?></label>'
	        n +=Forms.CreateInputPropertyPopup("invoice", "bankac", F.bankac, false)
	        n +='</div>'
	        n +='</div>'
	        <!--col-md-6-->
	        n +='</div>'
	        <!--row-->
	        n +='<div class="row">'
	        n +='<div class="col-md-6">'
	        n +='<div class="form-group">'
	        n +='<label><?=$lang_resource['INVOICE_ROUTINE_NO']?></label>'
	        n +=Forms.CreateInputPropertyPopup("invoice", "routineno", F.routineno, false)
	        n +='</div>'
	        n +='</div>'
	        <!--col-md-6-->
	        n +='<div class="col-md-6">'
	        n +='<div class="form-group">'
	        n +='<label><?=$lang_resource['INVOICE_SWIFT_CODE']?></label>'
	        n +=Forms.CreateInputPropertyPopup("invoice", "swiftcode", F.swiftcode, false)
	        n +='</div>'
	        n +='</div>'
	        <!--col-md-6-->
	        n +='</div>'
	        <!--row-->
    	}else if(payby == 2){
	    	n +='<div class="row">'
	        n +='<div class="col-md-12">'
	        n +='<div class="form-group">'
	        n +='<label><?=$lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_PAYPAL_EMAIL']?></label>'
	        n +=Forms.CreateInputPropertyPopup("invoice", "vatpaypalemail", F.vatpaypalemail, false)
	        n +='</div>'
	        n +='</div>'
	        <!--col-md-6-->
	        n +='</div>'
	        <!--row-->
    	}

    	$("#payby_field").empty().append(n);
    },
    InvoiceSave: function(){	

		$.post("lib/invoicesettings.php", "f=SaveInvoice&data=" + JSON.stringify(Forms.Form.invoice), function (a) {
			Popup.Close();
			InvoiceSettings.Main();
		});
	},

};