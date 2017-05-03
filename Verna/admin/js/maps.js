var maps = {
    sttingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_MAP_LATITUDE'] ?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "lat",SiteSection.Settings.lat['value'], true, "SiteSection.ValueChangedWithType(this);maps.latval();", false, false)
		c +='</div></div>'
		<!--col-md-6-->
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_MAP_LONGITUDE'] ?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "long",SiteSection.Settings.long['value'], true, "SiteSection.ValueChangedWithType(this);maps.longtval();", false, false)
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
	latval: function()
	{
	var slug = document.getElementById("lat").value;
	
	if (/^[0-9.-]*$/.test(slug) == false ) {
			//cnt ++;
			
  			alert("<?=$lang_resource['ADMIN_PAGE_LAT_VALIDATION'] ?>")
			document.getElementById("lat").value = slug.substr(0,slug.length-1);
			
			return false
			
 		}
		
	},
	longtval: function()
	{
	var slug = document.getElementById("long").value;
	
	if (/^[0-9.-]*$/.test(slug) == false ) {
			//cnt ++;
			
  			alert("<?=$lang_resource['ADMIN_PAGE_LONG_VALIDATION'] ?>")
			document.getElementById("long").value = slug.substr(0,slug.length-1);
			
			return false
			
 		}
		
	},
	
};
	
