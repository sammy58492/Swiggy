var gprs = {
    sttingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_PORT'] ?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "apn",SiteSection.Settings.apn['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SERVER_IP'] ?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "sip",SiteSection.Settings.sip['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
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
	
};
	
