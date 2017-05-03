var PaginationSettings = {
    PaginationForm: function () {
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
	//alert(SiteSection.Settings.businesslist_pagination['value'])
        c +='<label><?=$lang_resource['BUSINESS_PAGINATION']?> </label>'
        c +=Forms.CreateSelectPropertySettings("settings", "businesslist_pagination", d, SiteSection.Settings.businesslist_pagination['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
		
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
	
