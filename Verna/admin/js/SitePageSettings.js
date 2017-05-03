var SitePageSettings = {
    settingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
		var d = new Array();
        d.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['ADMIN_PAGE_SITESECTION_PAGE_TYPE']?>"}')); 
        d.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_SITESECTION_ORDERING_PAGES']?>"}'));
        d.push(JSON.parse('{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_SITESECTION_ORDERING_ONLINE']?>"}'));
	
        c +='<label><?=$lang_resource['SITE_PAGE_SETTINGS']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "sitepagesettings", d,SiteSection.Settings.sitepagesettings['value'], true,"SiteSection.ValueChangedWithType(this)",false, false)
		
		c +='</div></div>'
		
        c +='</div>'
	
        c +='</div>'
		
        c +='</div>'
		
        c +='</div>'
		
		
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
	
