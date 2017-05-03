var SplitPayment = {
    sttingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		var d = new Array();
        d.push(JSON.parse('{"id":"-1","caption":"select"}')); 
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"0","caption":"No"}'));
		
        c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_SPLIT_PAYMENT']?> </label>'
        c +=Forms.CreateSelectPropertySettings("settings", "splitcase", d, SiteSection.Settings.splitcase['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_PERCENT_COMMISION']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "com_per",SiteSection.Settings.com_per['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_FIXED_COMMISION']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "com_rate",SiteSection.Settings.com_rate['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		var itax = new Array();
        itax.push(JSON.parse('{"id":"0","caption":"No"}')); 
        itax.push(JSON.parse('{"id":"1","caption":"Yes City Tax"}'));
        itax.push(JSON.parse('{"id":"2","caption":"Custom %"}'));
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_INCLUDING_TAX']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "tax",itax,SiteSection.Settings.tax['value'], true, "SplitPayment.TypeChanged(this.value);SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		
		c +='<div class="row">'
        c +='<div class="col-md-6">'
		if(SiteSection.Settings.tax['value'] == 2){
        c +='<div class="form-group" id="idpercent">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_CUSTOM_TAX']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "custom",SiteSection.Settings.custom['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		
		c +='</div>'
		}else{
		c +='<div class="form-group" id="idpercent" style="display:none">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_CUSTOM_TAX']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "custom",SiteSection.Settings.custom['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		
		c +='</div>'	
		}
		c+='</div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		c +='<div class="row">'
        c +='<div class="col-md-6">'
		c +='<div class="form-group">'
		c+='<h2><?=$lang_resource['ADMIN_PAGE_STATISTICS_PAYPAL_ADAPTIVE']?></h2>'
		c +='</div>'	
		c+='</div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		
		c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_SUPER_ADMIN_EMAIL']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "semail", SiteSection.Settings.semail['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_SPLITPAYMENT_USERNAME']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "pusername",SiteSection.Settings.pusername['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_SPLITPAYMENT_SIGNATURE']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "psign", SiteSection.Settings.psign['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_SPLITPAYMENT_PASSWORD']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "ppassword",SiteSection.Settings.ppassword['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_SPLITPAYMENT_APPID']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "pappid", SiteSection.Settings.pappid['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		var pa = new Array();
      	pa.push(JSON.parse('{"id":"0","caption":"Sandbox"}')); 
        pa.push(JSON.parse('{"id":"1","caption":"live"}'));
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_SPLITPAYMENT_MODE_PAYMENT']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "paymentmode",pa,SiteSection.Settings.paymentmode['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		
		c +='</div>'<!--config-box-->
        c +='</div>'<!--col-md-9-->
        c +='</div>'<!--row-->
		c +='</div>'

		$("#sitesetting").empty().append(c);		

        $("#ga").focus()
    },
	
	TypeChanged: function (a) {
		
        if(a == 2)		
			document.getElementById("idpercent").style.display = "";		
		else		
			document.getElementById("idpercent").style.display = "none";
		
    },
	
};
	
