var SiteScheduleText = {
	sttingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_SITE_SCHEDULE_TEXT1']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "sitescheduletext1",SiteSection.Settings.sitescheduletext1['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		c +='</div>'
		<!--row-->
		c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_SITE_SCHEDULE_TEXT2']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "sitescheduletext2",SiteSection.Settings.sitescheduletext2['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		c +='</div>'
		<!--row-->
		c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_SITE_SCHEDULE_TEXT3']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "sitescheduletext3",SiteSection.Settings.sitescheduletext3['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
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