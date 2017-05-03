var EmergencyNoSettings = {
    settingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		var d = new Array();
		d.push(JSON.parse('{"id":"1","caption":"Yes"}')); 
		d.push(JSON.parse('{"id":"0","caption":"No"}'));
        c +='<label><?=$lang_resource["EMERGENCY_NO_SETTING"]?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "emergency_no", d,SiteSection.Settings.emergency_no['value'], true,"SiteSection.ValueChangedWithType(this)",false, false)
		
		c +='</div></div>'
		
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		var f = new Array();
		f.push(JSON.parse('{"id":"1","caption":"Yes"}')); 
		f.push(JSON.parse('{"id":"0","caption":"No"}'));
        
        c +='<label><?=$lang_resource["SMS_ACTIVATION_SETTING"]?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "smsactivation", d,SiteSection.Settings.smsactivation['value'], true,"SiteSection.ValueChangedWithType(this)",false, false)
		
		c +='</div></div>'
		
        c +='</div>'
		 c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		var g = new Array();
		g.push(JSON.parse('{"id":"1","caption":"Yes"}')); 
		g.push(JSON.parse('{"id":"0","caption":"No"}'));
        c +='<label><?=$lang_resource["EMERGENCY_EMAIL_SETTING"]?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "emergency_email", g,SiteSection.Settings.emergency_email['value'], true,"SiteSection.ValueChangedWithType(this)",false, false)
		
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
	
