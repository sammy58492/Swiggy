var SiteSection={
	Main: function(){	
		Main.Loading();
			var a = new Date().getTime();
        	Main.Aid = a;	
		$.post("lib/panel-configs.php", "f=FetchConfigAll", function (b) {	
		
		//alert(b)
				
			SiteSection.Settings = JSON.parse(b).settings;	
			$.post("lib/panel-bulk.php", 'data=[{"operation":"FetchTimeFormat"}]', function (c) {
    			Main.timeformat = JSON.parse(c).timeformat;
    			if (a != Main.Aid) {
                return
            	}		
				Main.Ready();    		
				SiteSection.PrintMain();	    		
    		});				        
        });		
	},
	PrintMain: function(){ 
		var htms='';
		htms +='<div class="row">'
		htms +='<div class="top-bar">'
		htms +='<div class=" col-md-6 col-md-offset-6">'
		htms +='<div class=" pull-right">'
		htms +='<span id="settingsave">'
		htms +='<button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="SiteSection.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_SITESECTION_SAVE']?></button>'
		htms +='</span>'
		
		htms +='&nbsp;<button class="btn btn-default btn-rounded-lg close-btn panel-btn-2" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_SITESECTION_CANCEL']?></button></div>'
		htms +='</div>'
		<!--col-md-5-->
		htms +='</div>'
		<!--top-bar-->
		htms +='</div>'
		
		htms +='<div class="the-box rounded">'
		htms +='<div class="row">'
		htms +='<div class="col-md-3">'
		htms +='<ul class="site-setting-nav clearfix" id="sitesettingsmenu">'
		htms +='<li><a href="javascript:Superadminsettings.sttingForm()" class="active" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SITE_SETTINGS_SCREEN']?></a></li>'
        htms +='<li><a href="javascript:gprs.sttingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_GPRS_PRINTER']?></a></li>'
        htms +='<li><a href="javascript:Permissionuser.sttingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_PERMISSION_TO_SEE_USERS']?></a></li>'
		htms +='<li><a href="javascript:SplitPayment.sttingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SPLIT_PAYMENT']?></a></li>'
		htms +='<li><a href="javascript:SiteScheduleText.sttingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SITE_SCHEDULE']?></a></li>'
		htms +='<li><a href="javascript:SiteSchedule.Main()" onClick="SiteSection.addBtn(1);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SITE_SCHEDULE_SETTING']?></a></li>'
				
        htms +='<li><a href="javascript:SpecialEnterprise.sttingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SPECIAL_ENTERPRISE']?></a></li>'	
				
		htms +='<li><a href="javascript:Commision.Main()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SITE_COMMISSION']?></a></li>'	
		htms +='<li><a href="javascript:Superadminsettings.SiteSpeedSettings()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['SITE_SPEED_SETTINGS']?></a></li>'
		
	//	htms +='<li><a href="javascript:SitePageSettings.settingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['SITE_PAGE_SETTINGS']?></a></li>'
		htms +='<li><a href="javascript:ItemPointSetting.ItemPointSettingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ITEM_POINT_SETTINGS']?></a></li>'
		
		htms +='<li><a href="javascript:DigitsDecimalSettings.settingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['DIGITS_DECIMAL_SETTINGS']?></a></li>'
		
		htms +='<li><a href="javascript:EmergencyNoSettings.settingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['SMS_SETTING']?></a></li>'
		htms +='<li><a href="javascript:maps.sttingForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['DEFAULT_MAP_SETTINGS']?></a></li>'
		htms +='<li><a href="javascript:PaginationSettings.PaginationForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['BUSINESS_PAGINATION']?></a></li>'
		
		 htms +='<li><a href="javascript:Servicefee.PaginationForm()" onClick="SiteSection.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_SITESECTION_SERVICEFEE']?></a></li>'	
		
        htms +='</ul>'
		<!--col-md-5-->
		htms +='</div>'
		<!--top-bar-->
		htms +='<div id="sitesetting"></div>'

		document.getElementById("main").innerHTML = htms;
		SiteSection.SiteSettingByDefault(Superadminsettings.sttingForm)

		 var selector = '#sitesettingsmenu li a';

        $(selector).on('click', function(){
            $(selector).removeClass('active');
            $(this).addClass('active');
        });
	},	
	ValueChangedWithType: function(a){		
		if(SiteSection.Settings[a.id]['ivalue'] != a.value){			
			SiteSection.Settings[a.id]['value'] = a.value;
		}
	},
	
	UserPermission: function(b){
		if(document.getElementById(b.id).checked==true){
			SiteSection.Settings[b.id]['value'] = true;
			
		}else{
		SiteSection.Settings[b.id]['value'] = false;	
		}
		
	},
	
	

	
	
	 Save: function (a) {		
	 
	 if(SiteSection.Settings.lat.value == '' || SiteSection.Settings.long.value == '')
	 {
		 
		alert("<?=$lang_resource['ENTER_LAT_LONG_VALIDATION']?>"); 
		return;
	 }
	  if(SiteSection.Settings.specialenterprise.value == '1'){
		   if(SpecialEnterprise.Neighbourhood){
		 if(SpecialEnterprise.Neighbourhood[0].tab_delivery_neighborhood=='t'){
			  alert('<?=$lang_resource['ADMIN_PAGE_FORM_PLEASE_SELECT_AREA']?>');
			 SiteSection.Main();
			 
			//alert('Please select Area Neighbouhood No'); 
			return ;
			
		}
		   }
	}
	
		for(var s in SiteSection.Settings){			
			SiteSection.Settings[s].value =window.btoa(unescape(encodeURIComponent(SiteSection.Settings[s].value)))
			SiteSection.Settings[s].value =SiteSection.Settings[s].value.split("+").join("###");
			SiteSection.Settings[s].ivalue = window.btoa(unescape(encodeURIComponent(SiteSection.Settings[s].ivalue)))	
			SiteSection.Settings[s].ivalue =SiteSection.Settings[s].ivalue.split("+").join("###");
		/*if((SiteSection.Settings[s].name!="businesspermission") && (SiteSection.Settings[s].name!="adminpermission")){
			SiteSection.Settings[s].value = SiteSection.Settings[s].value.replace(/\//g, "@@@@@@@"); 		
			SiteSection.Settings[s].ivalue = SiteSection.Settings[s].ivalue.replace(/\//g, "@@@@@@@"); 	
			SiteSection.Settings[s].value = SiteSection.Settings[s].value.replace(/&/g, '^^^^^^^'); 	
			SiteSection.Settings[s].ivalue = SiteSection.Settings[s].ivalue.replace(/&/g, '^^^^^^^'); 
			SiteSection.Settings[s].value = SiteSection.Settings[s].value.replace(/\s/g, '@=@=@=@='); 	
			SiteSection.Settings[s].ivalue = SiteSection.Settings[s].ivalue.replace(/\s/g, '@=@=@=@=');		
				}*/
			
		} 
				
		Main.Loading();


          //Settings to zipcode validation 
		  var zipvalmax='';
		    var zipvalmin='';
		  if(document.getElementById("zipvalmax")){
			
			 zipvalmax=document.getElementById("zipvalmax").value;
			 zipvalmin=document.getElementById("zipvalmin").value;
			 Main.Request("panel-configs", null, "f=SaveSettingsConfigzipcodevalidation&name=zipvalmax&value=" + Main.NullToEmpty(zipvalmax)+"&name1=zipvalmin&value1=" + Main.NullToEmpty(zipvalmin), "SiteSection.Main()")
			 
			 // $.post("lib/panel-configs.php", "f=SaveSettingsConfigzipcodevalidation&name=zipvalmax&value=" + Main.NullToEmpty(zipvalmax)+"&name1=zipvalmin&value1=" + Main.NullToEmpty(zipvalmin), function (c) {
			 // }
		  }
		//  alert(JSON.stringify(SiteSection.Settings))
		  
          //$.post("lib/panel-configs.php", "f=SaveSettingsConfigzipcodevalidation&name=zipvalmax&value=" + Main.NullToEmpty(zipvalmax)+"&name1=zipvalmin&value1=" + Main.NullToEmpty(zipvalmin), function (c) {//alert(c);

		Main.Request("panel-configs", null, "f=SaveConfigs&data=" + JSON.stringify(SiteSection.Settings), "SiteSection.Main()")
			
		 // });
        Main.Ready();
	},
	TimeZoneSelected: function (b) {        
		SiteSection.ValueChangedWithType(b)
        Main.Loading();		
        $.post("lib/front-main.php", "f=FetchTimeByZoneSiteSettings&format=24&zone=" + b.options[b.selectedIndex].value, function (c) {
            Main.Ready();
            document.getElementById("timespan").innerHTML = "<?=$lang_resource['CITY_SUPER_TIMESTAMP_NOW']?> " + Main.ConvertTimeFormat(c) ;
        });        
    },

    
	TimeZoneSelectedByDefault: function (b) {
		Main.Loading();		
        $.post("lib/front-main.php", "f=FetchTimeByZoneSiteSettings&format=24&zone=" + b, function (c) {
            Main.Ready();
            document.getElementById("timespan").innerHTML = "<?=$lang_resource['CITY_SUPER_TIMESTAMP_NOW']?> " + Main.ConvertTimeFormat(c) ;
        })
    },
	
	SiteSettingByDefault: function (b) {
		Main.Loading();		
        Superadminsettings.sttingForm();
        Main.Ready();
       },
	   
	   
	   
	   
addBtn: function (val){
		   var htms = ''
		   if(val == 1){
			 htms +='<button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="SiteSchedule.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_SITESECTION_SAVE']?></button>'   
		   }else{
			   htms +='<button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="SiteSection.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_SITESECTION_SAVE']?></button>'  
		   }
		   
		   $("#settingsave").empty().append(htms);
		
   
	   },	   
	   
};


