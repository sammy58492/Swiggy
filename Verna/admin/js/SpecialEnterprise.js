var SpecialEnterprise = {
    sttingForm: function () {
		
		$.post("lib/panel-configs.php", "f=GetTabSettings", function (b) {
			 SpecialEnterprise.Neighbourhood= JSON.parse(b);
			 
	  		// alert(SpecialEnterprise.Neighbourhood[0].tab_delivery_neighborhood);
		});
		
		
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
		var d = new Array();
        d.push(JSON.parse('{"id":"-1","caption":"select"}')); 
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"0","caption":"No"}'));
	
        c +='<label><?=$lang_resource['ADMIN_PAGE_SITESECTION_SIGNUP_FOR_RESTURENT']?> </label>'
        c +=Forms.CreateSelectPropertySettings("settings", "specialenterprise", d, SiteSection.Settings.specialenterprise['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		
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
	
