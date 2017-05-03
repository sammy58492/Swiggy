var SoundNotification={
	Main: function(){
		Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;		
		$.post("lib/panel-configs.php", "f=FetchConfigAll", function (b) {			
			SoundNotification.Settings = JSON.parse(b).settings;	
			if (a != Main.Aid) {
                return
            }		
			Main.Ready();    		
			SoundNotification.PrintMain();			        
        });	
	},
	PrintMain: function(){
		var d = new Array();
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"0","caption":"No"}'));
        
        var t = new Array();
        for(var i =10 ; i<=60; ){
         t.push(JSON.parse('{"id":"'+i+'","caption":"'+i+' sec"}'));
         i= i+10
        }
        
        var c = "";
       Forms.Clean("soundalert", "mainbuttonok"); 
        <!-- BEGIN PAGE CONTENT -->
       
        c +='<div class="row">'
        c +='<div class="top-bar">'
        c +='<div class=" col-md-6 col-md-offset-6">'
        c +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="SoundNotification.Save()"><i class="fa icon-save"></i> <?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SOUNDALERT_SAVE']?></button>&nbsp;'
        c +='<button class="btn btn-default btn-rounded-lg close-btn panel-btn-2" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
        c +='</div>'
        <!--col-md-5-->
        c +='</div>'
        <!--top-bar-->
        c +='</div>'
        <!--row-->
        
        c +='<div class="the-box rounded">'
        c +='<div class="row">'
        c +='<div class="col-md-3">'
        c +='<div class="form-group">'
        c +='<h4><?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SOUNDALERT_HEADING']?></h4>'
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->
        c +='</div>'
        <!--row-->
        c +='<div class="config-payment-box">'
        if(Main.User.level == 2){
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SOUNDALERT_NOTIFICATION']?></label>'
        c +=Forms.CreateSelectPropertyAdminSettings("soundalert", "businesssoundstatus",d, SoundNotification.Settings.businesssoundstatus['value'], false,"SoundNotification.ValueChangedWithType(this)")
        c +='</div>'        
        c +='</div>'
        <!--col-md-6-->
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SOUNDALERT_DURATION']?></label>'
        c +=Forms.CreateSelectPropertyAdminSettings("soundalert", "businesssoundduration",t, SoundNotification.Settings.businesssoundduration['value'], false,"SoundNotification.ValueChangedWithType(this)")
        c +='</div>'
        c +='</div>'
        <!--col-md-6-->
        c +='</div>'
        <!--row-->
    	}else if(Main.User.level == 0){
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SOUNDALERT_NOTIFICATION']?></label>'
        c +=Forms.CreateSelectPropertyAdminSettings("soundalert", "superadminsoundstatus",d, SoundNotification.Settings.superadminsoundstatus['value'], false,"SoundNotification.ValueChangedWithType(this)")
        c +='</div>'        
        c +='</div>'
        <!--col-md-6-->
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SOUNDALERT_DURATION']?></label>'
        c +=Forms.CreateSelectPropertyAdminSettings("soundalert", "superadminsoundduration",t, SoundNotification.Settings.superadminsoundduration['value'], false,"SoundNotification.ValueChangedWithType(this)")
        c +='</div>'
        c +='</div>'
        <!--col-md-6-->
        c +='</div>'
        <!--row-->
    	}

        c +='</div>'
        <!--config-payment-box-->
        c +='</div>'
        <!--the-box-->
        
         document.getElementById("main").innerHTML = c;
         
	},
	ValueChangedWithType: function(a){	
	
		if(SoundNotification.Settings[a.id]['ivalue'] != a.value){	

			SoundNotification.Settings[a.id]['value'] = a.value;
		}
	
		
	},
	Save: function (a) {
		
		
		for(var s1 in SoundNotification.Settings){
			    if(Main.User.level == 2){
					
								if((s1!='businesssoundstatus') && (s1!='businesssoundduration')){
									delete SoundNotification.Settings[s1];
								}else{
									console.log(JSON.stringify(SoundNotification.Settings[s1]));
								}
				}else if(Main.User.level == 0){
						if((s1!='superadminsoundstatus') && (s1!='superadminsoundduration')){
							delete SoundNotification.Settings[s1];
						}else{
							console.log(JSON.stringify(SoundNotification.Settings[s1]));
						}
				}
		}		
		for(var s in SoundNotification.Settings){			
			/*SoundNotification.Settings[s].value = encodeURIComponent(SoundNotification.Settings[s].value)
			SoundNotification.Settings[s].ivalue = encodeURIComponent(SoundNotification.Settings[s].ivalue)	*/		
			
						SoundNotification.Settings[s].value = SoundNotification.Settings[s].value.replace(/\//g, "@@@@@@@"); 		
						SoundNotification.Settings[s].ivalue = SoundNotification.Settings[s].ivalue.replace(/\//g, "@@@@@@@"); 	
						SoundNotification.Settings[s].value = SoundNotification.Settings[s].value.replace(/&/g, '^^^^^^^'); 	
						SoundNotification.Settings[s].ivalue = SoundNotification.Settings[s].ivalue.replace(/&/g, '^^^^^^^'); 
						SoundNotification.Settings[s].value = SoundNotification.Settings[s].value.replace(/\s/g, '@=@=@=@='); 	
						SoundNotification.Settings[s].ivalue = SoundNotification.Settings[s].ivalue.replace(/\s/g, '@=@=@=@=');	
		
		} 
		
		console.log(JSON.stringify(SoundNotification.Settings));
		Main.Loading();
		Main.Request("panel-configs", null, "f=SaveConfigs_sound&data=" + JSON.stringify(SoundNotification.Settings), "SoundNotification.Main()")
        Main.Ready();
        Main.FetchSoundsTimeSet();
	},
};