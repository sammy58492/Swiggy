var GlobalPoint={
	Main: function(){
		Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;		
		$.post("lib/panel-configs.php", "f=FetchGlobalItemPointSetting", function (b) {	
			//alert(b);
			GlobalPoint.GlobalPoint =JSON.parse(b);
			if (a != Main.Aid) {
                return
            }		
            
			Main.Ready();    		
			GlobalPoint.PrintMain();			        
        });	
	},
	PrintMain: function(){    
        var c = "";
       Forms.Clean("GlobalPoint", "mainbuttonok"); 
        <!-- BEGIN PAGE CONTENT -->
       
        c +='<div class="row">'
        c +='<div class="top-bar">'
        c +='<div class=" col-md-6 col-md-offset-6">'
        c +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="GlobalPoint.Save()"><i class="fa icon-save"></i> <?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_ITEM_POINT_SETTINGS_SAVE']?></button>&nbsp;'
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
        c +='<h4><?=$lang_resource['GLOBAL_POINT_SETTINGS_HEADER']?></h4>'
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->
        c +='</div>'
        <!--row-->
        c +='<div class="config-payment-box">'
        
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        if(GlobalPoint.GlobalPoint[0].value==0){
        	c+='<input type="radio" id="radio_0" name="globalpoint" value="0" checked>' 
        }
        else
        {
        	c+='<input type="radio" id="radio_0" name="globalpoint" value="0" >' 
        }
        
        c +='<label for="radio_0"><b><?=$lang_resource['GLOBAL_POINT_SETTINGS_FOR_ALL_CAPTION']?></b></label>'
        c +='</div>'      
       
        c +='<label><?=$lang_resource['GLOBAL_POINT_SETTINGS_FOR_ALL_DESC']?></label>' 
        c +='</div>'

        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        if(GlobalPoint.GlobalPoint[0].value==1)
        {
        	c+='<input type="radio" id="radio_1" name="globalpoint"  value="1" checked>'	
        }
        else
        {
        	c+='<input type="radio" name="globalpoint" id="radio_1" value="1">'
    	}
        c +='<label for="radio_1"><b><?=$lang_resource['GLOBAL_POINT_SETTINGS_FOR_SELECTED_BUSINESS_CAPTION']?></b></label>'
        c +='</div>'   
        c +='<label><?=$lang_resource['GLOBAL_POINT_SETTINGS_FOR_SELECTED_BUSINESS']?></label>'     
        c +='</div>'
        
        c +='</div>'
        <!--row-->
    	

        c +='</div>'
        <!--config-payment-box-->
        c +='</div>'
        <!--the-box-->
        
         document.getElementById("main").innerHTML = c;
         
	},
	ValueChangedWithType: function(a){	
	
		if(ItemPointSetting.value[a.id]['ivalue'] != a.value){	

			ItemPointSetting.value[a.id]['value'] = a.value;
		}
	
		
	},
	Save: function (a) {
		
		
		// for(var s1 in ItemPointSetting.ItemPointSetting){
		// 	    if(Main.User.level == 2){
					
		// 						if((s1!='businesssoundstatus') && (s1!='businesssoundduration')){
		// 							delete SoundNotification.Settings[s1];
		// 						}else{
		// 							console.log(JSON.stringify(SoundNotification.Settings[s1]));
		// 						}
		// 		}else if(Main.User.level == 0){
		// 				if((s1!='superadminsoundstatus') && (s1!='superadminsoundduration')){
		// 					delete SoundNotification.Settings[s1];
		// 				}else{
		// 					console.log(JSON.stringify(SoundNotification.Settings[s1]));
		// 				}
		// 		}
		// }		
		// for(var s in SoundNotification.Settings){			
		// 	/*SoundNotification.Settings[s].value = encodeURIComponent(SoundNotification.Settings[s].value)
		// 	SoundNotification.Settings[s].ivalue = encodeURIComponent(SoundNotification.Settings[s].ivalue)	*/		
			
		// 				SoundNotification.Settings[s].value = SoundNotification.Settings[s].value.replace(/\//g, "@@@@@@@"); 		
		// 				SoundNotification.Settings[s].ivalue = SoundNotification.Settings[s].ivalue.replace(/\//g, "@@@@@@@"); 	
		// 				SoundNotification.Settings[s].value = SoundNotification.Settings[s].value.replace(/&/g, '^^^^^^^'); 	
		// 				SoundNotification.Settings[s].ivalue = SoundNotification.Settings[s].ivalue.replace(/&/g, '^^^^^^^'); 
		// 				SoundNotification.Settings[s].value = SoundNotification.Settings[s].value.replace(/\s/g, '@=@=@=@='); 	
		// 				SoundNotification.Settings[s].ivalue = SoundNotification.Settings[s].ivalue.replace(/\s/g, '@=@=@=@=');	
		
		// } 
		
		// console.log(JSON.stringify(SoundNotification.Settings));
		// Main.Loading();
		// Main.Request("panel-configs", null, "f=SaveConfigs_sound&data=" + JSON.stringify(SoundNotification.Settings), "SoundNotification.Main()")
  //       Main.Ready();
  //       Main.FetchSoundsTimeSet();
  var globalpoint=document.getElementsByName("globalpoint");
  
   if(globalpoint[0].checked==true)
   {
   
   	$.post("lib/panel-configs.php", "f=UpdateGlobalItemPointSetting&data="+globalpoint[0].value, function (c) {	
	
		GlobalPoint.Main();
						        
        });

   }
   else{
   	$.post("lib/panel-configs.php", "f=UpdateGlobalItemPointSetting&data="+globalpoint[1].value, function (c) {	
		
			GlobalPoint.Main();			        
        });
   }


	},

};