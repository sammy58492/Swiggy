var SiteSwitchingSettings = {
	
	
	settingEdit: function (prm) {
		
	$.post("lib/panel-site-switching-settings.php",'data=[{"operation":"FetchSwitchScript"},{"operation":"FetchConfingRecord"},{"operation":"FetchThemeType"}]', function (c) {	
	
				// Main.Ready();
				
				c = JSON.parse(c)
				SiteSwitchingSettings.fetchScript = c.switchscript;
				SiteSwitchingSettings.fetchSwitchConfig = c.confingRecord;
				SiteSwitchingSettings.FetchThemeType = c.fetchthemetype;
				SiteSwitchingSettings.settingEditGo();
				
			});		
	},
	
	
	settingEditGo: function () {
		
	$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"FetchSwitchTheme","scid":'+SiteSwitchingSettings.fetchSwitchConfig.script_id+',"typeid":'+SiteSwitchingSettings.fetchSwitchConfig.theme_type+'}]', function (r) {
			
				//Main.Ready();
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				//alert(SiteSwitchingSettings.FetchSwitchThemeInfo);
				SiteSwitchingSettings.settingForm(SiteSwitchingSettings.fetchSwitchConfig);
				
			});		
	},
	
	settingEditNew: function (prm) {
		Main.Loading();
	$.post("lib/panel-site-switching-settings.php",'data=[{"operation":"FetchSwitchScript"},{"operation":"FetchConfingRecord"},{"operation":"FetchThemeType"}]', function (c) {	
	
				// Main.Ready();
				
				
				c = JSON.parse(c)
				SiteSwitchingSettings.fetchScript = c.switchscript;
				SiteSwitchingSettings.fetchSwitchConfig = c.confingRecord;
				SiteSwitchingSettings.FetchThemeType = c.fetchthemetype;
				
				
				SiteSwitchingSettings.ScriptContentFunc(SiteSwitchingSettings.scriptid,SiteSwitchingSettings.fetchSwitchConfig);
				
			});		
	},
	
    settingForm: function (e,prm) {
		
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		var adm = "";
		var mob = "";
		var dsktp = "";
		
		var c= "";
		c +='<div class="the-box">'
        c +='<h4 class="border_heading_small" style="font-weight: normal;"><?=$lang_resource["PANEL_SCRIPT_SWITCH_SCRIPT_TYPE"]?></h4>'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        c +='<ul class="select_script">'
		 if(!prm) {
			var thm = e.theme_type;
			}
		else if(SiteSwitchingSettings.scripttypes) {
			var thm = SiteSwitchingSettings.scripttypes;
			}
		else {
		   var thm = 1;
			}	
		g =SiteSwitchingSettings.fetchScript;
					  var sct ='1';
					  // alert(g);
					   for (var f in g){
						   //alert(g[f].switch_name);
					  // }
						 var switch_name=g[f].switch_name;  
					     var switch_id=g[f].id;
                            c +='<li>'
							
					
						

						   if(e.script_id == g[f].id && !prm) {
							  
								var sel = "checked";
							} else if(prm == g[f].id && prm ) {
								
								var sel = "checked";
								
								}
								else {
								var sel = "";	
								
									}

								if(switch_name.toUpperCase() == 'WINE-LIBERY'){
									var switch_text = '<?=$lang_resource["TEMPLETE_ WINE_LIBERY"]?>'
								}else if(switch_name.toUpperCase() == 'OOS'){
									var switch_text = '<?=$lang_resource["TEMPLETE_OOS"]?>'
								}

                               c +='<p><input type="radio" id="script-'+switch_id+'" '+sel+' name="script"  class="switch checkbox_2 hand" onclick="SiteSwitchingSettings.switchForm('+switch_id+','+thm+','+switch_id+','+sct+');">'
                                c +='<label for="script-'+switch_id+'" onclick="SiteSwitchingSettings.switchForm('+switch_id+','+thm+','+switch_id+','+sct+');">'+switch_text+'</label></p>'
                            c +='</li>'
							
					   }
		
        c +='</ul>'
		if(!prm) {
		c +='<input type="hidden" id="scripttype" value="'+e.script_id+'" />';
		} else {
		
		c +='<input type="hidden" id="scripttype" value="'+SiteSwitchingSettings.scriptid+'" />';	   
		}
        c +='</div>'
        c +='</div>'<!--col-md-12-->
        c +='</div>'<!--row-->
        c +='<h4 class="border_heading_small" style="font-weight: normal;"><?=$lang_resource["PANEL_SCRIPT_SWITCH_THEME_TYPE"]?></h4>'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        c +='<ul class="select_script">'
		var ths ="2";
	
		if(e.theme_type == "2" && !prm) {
					var selected1 = "checked";
					var selected = "";
							}
		else if(e.theme_type == "1" && !prm) {
					var selected1 = "";
					var selected = "checked";
							}					
		else if(SiteSwitchingSettings.scripttypes ==1 && prm ) {
			     	var selected1 = "";
					var selected = "checked";
								
								}
		else if(SiteSwitchingSettings.scripttypes ==2 && prm ) {
			var selected1 = "checked";
			var selected = "";
								
				}						
			else {
			var selected1 = "";
			var selected = "";			
				}
								
		if(document.getElementById("scripttype")) {
		var scpt_id = document.getElementById("scripttype").value;
		}
		else if(!scpt_id) {
			scpt_id = e.script_id;
			}
        c +='<li>'
        c +='<p><input type="radio" id="theme-1" name="themeType" value="1" '+selected+' onclick="SiteSwitchingSettings.switchForm('+scpt_id+',this.value,this.value,'+ths+');" class="switch checkbox_2 hand">'
        c +='<label for="theme-1"><?=$lang_resource["PANEL_SCRIPT_SWITCH_DESK_MOB"]?></label></p>'
        c +='</li>'
        c +='<li>'
        c +='<p><input type="radio" id="theme-2" name="themeType" value="2" '+selected1+' onclick="SiteSwitchingSettings.switchForm('+scpt_id+',this.value,this.value,'+ths+');" name="theme" class="switch checkbox_2 hand">'
        c +='<label for="theme-2"><?=$lang_resource["PANEL_SCRIPT_SWITCH_RESPONSIVE"]?></label></p>'
        c +='</li>'                           
        c +='</ul>'
		c +='<input type="hidden" id="themetype" value="'+e.theme_type+'" />'
        c +='</div>'
        c +='</div>'<!--col-md-12-->
        c +='</div>'<!--row-->
        c +='</div>'
		c +='<div id="contentscript" ></div>'
		
		
		
		
		
        <!--row-->
		var gc = "";
        gc += '<div  id="templatesCustom"></div>'
        
 		document.getElementById("main").innerHTML = gc;		
		document.getElementById("templatesCustom").innerHTML = c;
		
		SiteSwitchingSettings.ScriptContentFunc(scpt_id,e);
		
		//$("#sitesetting").empty().append(c);		
		$("#ga").focus()
		
		
        
    },
	
	SaveActive: function (themeid,type) {
	var scriptid = document.getElementById("scripttype").value;
	
		$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"UpdateScriptId","scriptid":'+scriptid+',"themeid":'+themeid+',"typeid":'+type+'}]', function (r) {	
			
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				top.location = "?template=true";
				//SiteSwitchingSettings.settingEdit();
				
			});	
      
		
    },
	SaveDeActive: function (themeid,type) {
		
	var scriptid = document.getElementById("scripttype").value;
	
		$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"UpdateDeaciveScriptId","scriptid":'+scriptid+',"themeid":'+themeid+',"typeid":'+type+'}]', function (r) {	
			
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				top.location = "?template=true";
				//SiteSwitchingSettings.settingEdit();
				
			});	
      
		
    },

	
	switchForm: function (a,b,c,d) {
	if(d==1) {
	document.getElementById("scripttype").value = a;
	}
	if(d==2) {
	document.getElementById("themetype").value = b;
	}
	
	SiteSwitchingSettings.scriptid = document.getElementById("scripttype").value;
		
	SiteSwitchingSettings.scripttypes = document.getElementById("themetype").value;
	
	
	
	
		$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"FetchSwitchTheme","scid":'+SiteSwitchingSettings.scriptid+',"typeid":'+SiteSwitchingSettings.scripttypes+'}]', function (r) {
			
				//Main.Ready();
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				//alert(SiteSwitchingSettings.FetchSwitchThemeInfo);
				SiteSwitchingSettings.settingEditNew(a);
				
			});	
       //alert(a);
		
    },
	
	ScriptContentFunc: function(scpt_id,e) {
		
		
		var c= "";
		if(SiteSwitchingSettings.FetchSwitchThemeInfo) {
		t = SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_desktop;
		}
		else {
		  t =Array();	
			}
			
		if(SiteSwitchingSettings.FetchSwitchThemeInfo && SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_desktop.length > 0 ){	 
		c +='<h4 class="latest_heading" style="font-weight: normal;" id="dsktp_theme"><?=$lang_resource["PANEL_SCRIPT_SWITCH_THEME_DESKTOP"]?></h4>'
		}
		c +='<div class="row">'
		var ths ="3";
		for (var s in t){
		
		var theme_id=t[s].id;
		var theme_name=t[s].theme_name;  
		var is_admin=t[s].is_admin;
		var is_device=t[s].is_device;
		
		 var switch_module_name = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(SiteSwitchingSettings.fetchScript, "id", scpt_id, "switch_name"));
	 
	 
	  if(switch_module_name == "OOS") {
		  var ModuleimagepathDesktop = "../../panel/"+theme_name+"/theme.jpg";
		  
		  }
		else {
			// var ModuleimagepathMobile = "images/mobile-theme-2.jpg";
		 var ModuleimagepathDesktop = "../../panel/"+switch_module_name+"/desktop/theme/"+theme_name+"/theme.jpg";
			
			} 
	 /* if(switch_module_name == "OOS") {
		  var ModuleimagepathDesktop = "../../panel/front-reservation/theme.jpg";
		  
		  }
		else {
			 var ModuleimagepathDesktop = "images/desktop-theme-1.jpg";
			
			}  */
		  
		if(is_device=='1'){
		var dkstp = 2;
		if(!isNaN(SiteSwitchingSettings.desktpac)){SiteSwitchingSettings.desktpac=SiteSwitchingSettings.desktpac;}
		else{SiteSwitchingSettings.desktpac = "-1";}		
		c +='<div class="col-md-4">'
		//c +='<h5>'+Main.TitleCase(theme_name)+'</h5>'
		c +='<div class="theme_dv">'
		c +='<img src="'+ModuleimagepathDesktop+'">'
		c +='</div>'
		c +='<div class="thene_active_panel">'
		c +='<h5 class="them_name">'+Main.TitleCase(theme_name)+'</h5>'

		c +='<div class="actv_btn_bg">'
		c +='<div class="enebal" id="switch_desktoptheme_'+theme_id+'"></div>'
		
		/*if(e.script_front_theme_id == theme_id)	{
			
		c +='<button type="button" class="theme_active_btn" onclick="SiteSwitchingSettings.SaveDeActive('+theme_id+',1);">Activate</button>'		
			}	
			else {				
		c +='<button type="button" class="theme_deactive_btn" onclick="SiteSwitchingSettings.SaveActive('+theme_id+',1);">De-Activate</button>'							
				} */
		
		c +='</div>'			
		c +='</div>'
		c +='</div>'
		}
		else
		{
		  var dkstp = 1;
		 SiteSwitchingSettings.desktpac = "-1";
		  
		}
		}
				
		c +='<input type="hidden" id="desktpac" value="'+SiteSwitchingSettings.desktpac+'" /></div>'<!--row-->
		
		
		if(SiteSwitchingSettings.FetchSwitchThemeInfo) {
		tm = SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_mobile;
		}
		else {
		tm =Array();	
		}
		if(SiteSwitchingSettings.FetchSwitchThemeInfo && SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_mobile.length > 0 ){	 
		c +='<h4 class=" latest_heading" style="font-weight: normal;" id="dsktp_theme"><?=$lang_resource["PANEL_SCRIPT_SWITCH_THEME_MOBILE"]?></h4>'
	}
	c +='<div class="row">'
	//t =SiteSwitchingSettings.FetchSwitchThemeInfo;
	//var thm = SiteSwitchingSettings.FetchThemeType;
	 var switch_module_name = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(SiteSwitchingSettings.fetchScript, "id", scpt_id, "switch_name"));
	 
	 
	// alert(t);
	var ths ="4";
	for (var s in tm){
	   //alert(g[f].switch_name);
	// }
	 
	
	var theme_id=tm[s].id;
	 var theme_name=tm[s].theme_name;  
	 var is_admin=tm[s].is_admin;
	 var is_device=tm[s].is_device;
	 
	 if(switch_module_name == "OOS") {
		  var ModuleimagepathMobile = "../../panel/"+theme_name+"/theme.jpg";
		  
		  }
		else {
			// var ModuleimagepathMobile = "images/mobile-theme-2.jpg";
		 var ModuleimagepathMobile = "../../panel/"+switch_module_name+"/mobile/theme/"+tm[s].theme_name+"/theme.jpg";
			
			} 
	 
	  if(is_device=='2'){
		  var mob = 2;
		  if(!isNaN(SiteSwitchingSettings.mobileac)){SiteSwitchingSettings.adminac=SiteSwitchingSettings.mobileac;}
	else{SiteSwitchingSettings.mobileac = "-1";}
	c +='<div class="col-md-4">'	
	c +='<div class="theme_dv">'
	c +='<img src="'+ModuleimagepathMobile+'">'                   
	c +='</div>'<!--theme_dv-->
	c +='<div class="thene_active_panel">'
	c +='<h5 class="them_name">'+Main.TitleCase(theme_name)+'</h5>'

	c +='<div class="actv_btn_bg">'
	c +='<div class="enebal" id="switch_mobiletheme_'+theme_id+'"></div>'
	
	
	c +='</div>'<!--col-md-4-->

	
	c +='</div>'<!--thene_active_panel-->
	c +='</div>'<!--col-md-4-->
	  }
	  else {var mob = 1;}
	  SiteSwitchingSettings.mobileac = "-1";
	  }
	  
	c +='<input type="hidden" id="mobileac" value="'+SiteSwitchingSettings.mobileac+'" /></div>'<!--row-->
	
	if(SiteSwitchingSettings.FetchSwitchThemeInfo) {
	tr = SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_responsive;
	}
	else {
	tr =Array();	
	}
	if(SiteSwitchingSettings.FetchSwitchThemeInfo && SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_responsive.length > 0 ){				
	c +='<h4 class="latest_heading" style="font-weight: normal;" id="adm_theme"><?=$lang_resource["PANEL_SCRIPT_SWITCH_THEME_RESPONSIVE"]?></h4>';
	}
	c +='<div class="row">'
	
	
	var ths ="5";
	
	for (var s in tr){

	
	var theme_id=tr[s].id;
	var theme_name=tr[s].theme_name;  
	var is_admin=tr[s].is_admin;
	var is_device=tr[s].is_device;
	
	
	
	  var switch_module_name = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(SiteSwitchingSettings.fetchScript, "id", scpt_id, "switch_name"));
	 
	  
	  if(switch_module_name) {
		  var Moduleimagepath = "../../panel/"+switch_module_name+"/desktop/theme/"+tr[s].theme_name+"/theme.jpg";
		  
		  }
		  
	  var adm = 2;
	  if(!isNaN(SiteSwitchingSettings.adminac)){SiteSwitchingSettings.adminac=SiteSwitchingSettings.adminac;}
	else{SiteSwitchingSettings.adminac = "-1";}
	
	c +='<div class="col-md-4">'
	c +='<div class="theme_dv">'
	c +='<img src="'+Moduleimagepath+'">'                    
	c +='</div>'<!--theme_dv-->
	c +='<div class="thene_active_panel">'	
	c +='<h5 class="them_name">'+Main.TitleCase(theme_name)+'</h5>'
	c +='<div class="actv_btn_bg">'
	
	c +='<div class="enebal" id="switch_resposivetheme_'+theme_id+'"></div>'
	
	
	c +='</div>'	
	c +='</div>'
	c +='</div>'
	
	}	
	//  c +='<input type="hidden" id="adminac" value="'+SiteSwitchingSettings.adminac+'" /></div>'<!--row-->
	c +='</div>'
	if(SiteSwitchingSettings.FetchSwitchThemeInfo) {
	ta = SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_admn;
	}
	else {
	ta =Array();	
	}
	
	if(SiteSwitchingSettings.FetchSwitchThemeInfo && SiteSwitchingSettings.FetchSwitchThemeInfo.theme_scripts_admn.length > 0 ){				
	c +='<h4 class="latest_heading" style="font-weight: normal;" id="adm_theme"><?=$lang_resource["PANEL_SCRIPT_SWITCH_THEME_ADMIN"]?></h4>';
	}
	c +='<div class="row">'
	
	var ths ="5";
	for (var s in ta){
	
	 var theme_id=ta[s].id;
	 var theme_name=ta[s].theme_name;  
	 var is_admin=ta[s].is_admin;
	 var is_device=ta[s].is_device;
	 
	  if(is_admin==true){
		  var adm = 3;
		  if(!isNaN(SiteSwitchingSettings.adminac)){SiteSwitchingSettings.adminac=SiteSwitchingSettings.adminac;}
		else{SiteSwitchingSettings.adminac = "-1";}
	
	c +='<div class="col-md-4">'	
	c +='<div class="theme_dv">'
	c +='<img src="images/admin-theme-2.jpg">'                    
	c +='</div>'<!--theme_dv-->
	c +='<div class="thene_active_panel">'
	c +='<h5 class="them_name">'+Main.TitleCase(theme_name)+'</h5>'

	c +='<div class="actv_btn_bg">'
	c +='<div class="enebal" id="switch_admintheme_'+theme_id+'"></div>'
	/*if(e.script_admin_theme_id == theme_id)	{
		
	c +='<button type="button" class="theme_active_btn" onclick="SiteSwitchingSettings.SaveDeActive('+theme_id+',4);">Activate</button>'		
		}	
		else {
			
	c +='<button type="button" class="theme_deactive_btn" onclick="SiteSwitchingSettings.SaveActive('+theme_id+',4);">De-Activate</button>'							
			} */	
	c +='</div>'<!--col-md-4-->	
	c +='</div>'<!--thene_active_panel-->
	c +='</div>'<!--col-md-4-->
	  }
		else
		  {
			 var adm = 1;
			 SiteSwitchingSettings.adminac = "-1";
			  
		  }
	  }	
	c +='<input type="hidden" id="adminac" value="'+SiteSwitchingSettings.adminac+'" /></div>'<!--row-->

		
		//$("#contentscript").removeClass("temp-body");	
		document.getElementById("contentscript").innerHTML = c;	
		Switch.Init();
		var h = false;
		for(l in ta){
			//alert(ta[l].id)
			if (ta[l].id == e.script_admin_theme_id) {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_admintheme_" + ta[l].id, h);
            Switch.OnChange("switch_admintheme_" + ta[l].id, function (m, i) {
                SiteSwitchingSettings.SetEnabledAdmin(m.replace("switch_admintheme_", ""), i)
				if(i){
                SiteSwitchingSettings.SetEnabledDesktop(m.replace("switch_admintheme_", ""), "1")
				} else {
				SiteSwitchingSettings.SetEnabledDesktop(m.replace("switch_admintheme_", ""), "0")	
					}
            })
		}
		// Desktop Switch
		for(s in t){			
			if (t[s].id == e.script_front_theme_id) {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_desktoptheme_" + t[s].id, h);
            Switch.OnChange("switch_desktoptheme_" + t[s].id, function (m, i) {
				if(i){
                SiteSwitchingSettings.SetEnabledDesktop(m.replace("switch_desktoptheme_", ""), "1")
				} else {
				SiteSwitchingSettings.SetEnabledDesktop(m.replace("switch_desktoptheme_", ""), "0")	
					}
            })
		}		
		
		
		// Mobile Switch
		for(s in tm){			
			if (tm[s].id == e.mobile_theme_id) {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_mobiletheme_" + tm[s].id, h);
            Switch.OnChange("switch_mobiletheme_" + tm[s].id, function (m, i) {
				if(i){
                SiteSwitchingSettings.SetEnabledMobile(m.replace("switch_mobiletheme_", ""), "1")
				} else {
				SiteSwitchingSettings.SetEnabledMobile(m.replace("switch_mobiletheme_", ""), "0")	
					}
            })
		}
		
		for(s in tr){			
			if (tr[s].id == e.script_front_theme_id) {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_resposivetheme_" + tr[s].id, h);
            Switch.OnChange("switch_resposivetheme_" + tr[s].id, function (m, i) {
				if(i){
                SiteSwitchingSettings.SetEnabledResponsive(m.replace("switch_resposivetheme_", ""), "1")
				} else {
				SiteSwitchingSettings.SetEnabledResponsive(m.replace("switch_resposivetheme_", ""), "0")	
					}
            })
		}	
		Main.Ready();
		
		
		
		},
		
	
	SetEnabledDesktop: function (b, st, h) {	
			var scriptid = document.getElementById("scripttype").value;		
			
			$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"UpdateScriptId","scriptid":'+scriptid+',"themeid":'+b+',"typeid":1,"enable":'+st+'}]', function (r) {	
					
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				top.location = "?template=true";
			});		
    },
	SetEnabledMobile: function (b, st, h) {	
			var scriptid = document.getElementById("scripttype").value;		
			
			$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"UpdateScriptId","scriptid":'+scriptid+',"themeid":'+b+',"typeid":2,"enable":'+st+'}]', function (r) {	
					
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				top.location = "?template=true";
			});		
    },
	SetEnabledResponsive: function (b, st, h) {	
			var scriptid = document.getElementById("scripttype").value;		
			
			$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"UpdateScriptId","scriptid":'+scriptid+',"themeid":'+b+',"typeid":3,"enable":'+st+'}]', function (r) {	
					
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				top.location = "?template=true";
			});		
    },
	SetEnabledAdmin: function (b, st, h) {	
			var scriptid = document.getElementById("scripttype").value;		
			
			$.post("lib/panel-site-switching-settings.php", 'data=[{"operation":"UpdateScriptId","scriptid":'+scriptid+',"themeid":'+b+',"typeid":4,"enable":'+st+'}]', function (r) {	
					
				r = JSON.parse(r)
				SiteSwitchingSettings.FetchSwitchThemeInfo = r.FetchSwitchThemeInfo;
				top.location = "?template=true";
			});		
    },
	
	TypeChanged: function (a) {
		
        if(a == 2)		
			document.getElementById("idpercent").style.display = "";		
		else		
			document.getElementById("idpercent").style.display = "none";
		
    },
	
};
	
