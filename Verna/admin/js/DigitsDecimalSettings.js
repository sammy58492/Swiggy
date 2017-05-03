var DigitsDecimalSettings = {
    settingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
		var d = new Array();
		
		d.push(JSON.parse('{"id":"0","caption":"0"}')); 
		d.push(JSON.parse('{"id":"1","caption":"1"}')); 
		d.push(JSON.parse('{"id":"2","caption":"2"}')); 
		d.push(JSON.parse('{"id":"3","caption":"3"}'));
		d.push(JSON.parse('{"id":"4","caption":"4"}'));
		d.push(JSON.parse('{"id":"5","caption":"5"}')); 
		d.push(JSON.parse('{"id":"6","caption":"6"}'));
		d.push(JSON.parse('{"id":"7","caption":"7"}'));
		d.push(JSON.parse('{"id":"8","caption":"8"}')); 
     	d.push(JSON.parse('{"id":"9","caption":"9"}'));
		d.push(JSON.parse('{"id":"10","caption":"10"}')); 
        
	
        c +='<label><?=$lang_resource["DIGITS_DECIMAL_SETTINGS"]?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "decimal_point", d,SiteSection.Settings.decimal_point['value'], true,"SiteSection.ValueChangedWithType(this)",false, false)
		
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
	
