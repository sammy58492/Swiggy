configapps={
	    Main: function () {
		Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;

        $.post("lib/panel-configs.php", "f=FetchConfigAll", function (b) {		
		
			configapps.Settings = JSON.parse(b).settings;
			if (a != Main.Aid)
                {
                    return
                }		
			Main.Ready(); 
            configapps.PrintMain();
        })
	},
	
	
	PrintMain: function(a){
		var c = "";		
		c += '<div class="row">'
        c += '<div class="top-bar">'                        
        c += '<div class=" col-md-3 col-md-offset-9">'                       
        c += '<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn panel-btn-2" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL'] ?></button></div>'
		c += '</div>'
		<!--col-md-5-->                                                            
        c += '</div>'
		<!--top-bar-->
        c += '</div>'
		<!--row-->
		c += '<h4 class="on_h4"><strong><?=$lang_resource['CONTROL_PANEL_APPS_SOCIAL_MEDIA']?></strong></h4>'                     
        c += '<div class="row">'
        c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_FACEBOOK']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
		c += '<a  href="javascript:configapps.FNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_FACEBOOK_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		<!--col-md-4-->
		c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_TWITTER']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.TNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_TWITTER_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
			c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_RSS']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.RNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_RSS_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		<!--col-md-4-->

		c += '</div>'

		 c += '<div class="row">'
		 c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_GPLUS']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.GPNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_GPLUS_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_LINKED']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.LNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_LINKED_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		
		c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_INSTAGRAM']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.INew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_INSTAGRAM_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		
		 c +='</div>';
		
		
		<!--the-box-->
        c += '</div>'
		
		
		
		<!--row-->
		c += '<h4 class="on_h4"><strong><?=$lang_resource['CONTROL_PANEL_MENU_STATISTIC_HEADING']?></strong></h4>'                     
        c += '<div class="row">'
        c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_GOOGLE_ANALYTICS']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.GNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_GOOGLE_ANALYTICS_DESCCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		<!--col-md-4-->
        c += '</div>'
		<!--row-->
		c += '<h4 class="on_h4"><strong><?=$lang_resource['CONTROL_PANEL_APPS_MARKETING']?></strong></h4>'
		c += '<div class="row">'
        c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_MAILCHIMP']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.MNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_MAILCHIMP_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		<!--col-md-4-->
		 c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_LIVECHATINC']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.LiveChatInc()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_LIVE_CHAT']?></p>'
		c += '<center><a href="http://www.livechatinc.com/?a=VeKnCJSKnfX" target="_blank"><button type="submit" class="btn btn-primary popup-submit-btn" ><?=$lang_resource['CONTROL_PANEL_APPS_CREATE_ACCOUNT']?></button></a></center>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		
		
		c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_OLARKLIVECHAT']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.OlarkLiveChat()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_OLARKLIVECHAT_DESCRIPTION']?></p>'
		c += '<center><a href=" http://www.olark.com/special/19024102" target="_blank"><button type="submit" class="btn btn-primary popup-submit-btn"><?=$lang_resource['CONTROL_PANEL_APPS_CREATE_ACCOUNT']?></button></a></center>'
		
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		c += '</div>'
		
		
		c += '<div class="row">'
        c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_CRAZY_EGG']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.crazy_egg()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_CRAZY_EGG_DESCRIPTION']?></p>'
		c += '<center><a href="http://www.crazyegg.com/ordering-online-system-60-days" target="_blank"><button type="submit" class="btn btn-primary popup-submit-btn"><?=$lang_resource['CONTROL_PANEL_APPS_CREATE_ACCOUNT']?></button></a></center>'
		
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		
		c += '<div class="col-md-4" style="display:block;">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_MANDRILL']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.mandrill()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_MANDRILL_DESCRIPTION']?></p>'
		/*c += '<center><a href="http://www.crazyegg.com/ordering-online-system-60-days" target="_blank"><button type="submit" class="btn btn-primary popup-submit-btn"><?=$lang_resource['CONTROL_PANEL_APPS_CREATE_ACCOUNT']?></button></a></center>'*/
		
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		
        c += '</div>'
		<!--row-->
		
		
		
		c += '<h4 class="on_h4"><strong><?=$lang_resource['CONTROL_PANEL_APPS_GPS_APPS']?></strong></h4>'
      
	  
	  	c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['BUSINESS_TAB_GPS_APP_BRING_WHOLESITE']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.GPSNewBring()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_BRINGG_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
	  
	  
		
		c += '<div class="row">'
     
		<!--col-md-4-->
		
		c += '<div class="col-md-4">'
       /* c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['BRINGG_EACH_RESTAURANT_PERMISSION'] ?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
		var H = '';
		if(configapps.Settings.BRINGG_PERMISSION_EACH_RESTAURANT['value'] == 1) {
			 H = 'checked'
		} 
		c +='<input type="checkbox" id="acceptEachrest"   name="checkbox" '+H+'  disabled style="" class="switch checkbox_2 hand">'
		c +='<label for="acceptEachrest"  onclick="configapps.CheckEachBringg()">&nbsp;</label>'
        c += '<a  href="javascript:configapps.BringgPermissionForEach()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'*/
       /* c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_BRING_PERMISSION_DESCRIPTION']?></p>'
        c += '</div>'*/
        c += '</div>'
		<!--col-md-4-->
		
		
		

        c += '<div class="col-md-4">'
        <!--the-box-->
        c += '</div>'
		
		<!--row-->
         c += '</div>'
	
		
	
		c += '<h4 class="on_h4"><strong><?=$lang_resource['CONTROL_PANEL_APPS_COMMUNICATION']?></strong></h4>'
        c += '<div class="row">'
        c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_TWILIO']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.TWNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_TWILIO_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		<!--col-md-4-->
		c += '<div class="col-md-4">'
        c += '<div class="the-box rounded">'
        c += '<a href="#"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_EMAIL_NOTIFICATION']?></h4></a>'
        c += '<span class="pull-right on-right inline-popups">'
        c += '<a  href="javascript:configapps.EmailNotify()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		c += '</span>'
        c += '<hr style="clear:both; margin-bottom:10px;">'
        c += '<p><?=$lang_resource['CONTROL_PANEL_APPS_EMAILNOTIFICATION_DESCRIPTION']?></p>'
        c += '</div>'
		<!--the-box-->
        c += '</div>'
		<!--col-md-4-->
		
        c += '</div>'
		<!--row-->
		document.getElementById("main").innerHTML = c;
	},
	CheckEachBringg: function () {	
	Main.Loading();
	$.post("lib/panel-configs.php", "f=SaveBringgPermissionForEach&id=" + configapps.Settings.BRINGG_PERMISSION_EACH_RESTAURANT['value'] , function (c) {
		Main.Ready();
		configapps.Main();
	})
	
	},
	    FNew: function () {	
		Forms.Clean("configapps", "mainbuttonok"); 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_FACEBOOK'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_FACEBOOK1']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "facebooklink",configapps.Settings.facebooklink['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
		  k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_FACEBOOK2']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "facebookfan",configapps.Settings.facebookfan['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		  k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_FACEBOOK3']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "facebookappid",configapps.Settings.facebookappid['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   	    TNew: function () {	
		Forms.Clean("configapps", "mainbuttonok"); 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_TWITTER_LINK'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_TWITTER']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "twitterlink",configapps.Settings.twitterlink['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },

RNew: function () {	
		Forms.Clean("configapps", "mainbuttonok"); 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_RSS_LINK'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_RSS_LINK']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "rsslink",configapps.Settings.rsslink['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },

GPNew: function () {	
		Forms.Clean("configapps", "mainbuttonok"); 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_GPLUS_LINK'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_GPLUS_LINK']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "gpluslink",configapps.Settings.gpluslink['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },

LNew: function () {	
		Forms.Clean("configapps", "mainbuttonok"); 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_LINKED_LINK'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_LINKED_LINK']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "linkendinlink",configapps.Settings.linkendinlink['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   INew: function () {	
		Forms.Clean("configapps", "mainbuttonok"); 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_INSTAGRAM_LINK'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_INSTAGRAM_LINK']?>  *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "instagramlink",configapps.Settings.instagramlink['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },


   	    WholesiteNew: function () {
		
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "address",'', false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_APP_USERNAME'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "username",'', false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_CREATE_PASSWORD'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "password",'', false, "configapps.ValueChangedWithType(this)", false, true)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->   
		
		
		
		
		
		<!--row-->       
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.NextSave()"><?=$lang_resource['SUBMIT'] ?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   	
			},
			
	 NextSave: function () {
		
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_APP_CONFIRMATION'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "address",'', false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_APP_USERNAME'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "username",'', false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_CREATE_PASSWORD'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "password",'', false, "configapps.ValueChangedWithType(this)", false, true)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->   
		  k += '<div class="row">'
          k +='<div class="col-md-5 col-md-offset-1">'
          k +='<center><button type="submit" class="btn btn-pop-grey popup-submit-btn">Edit</button></center>'
          k += '</div>'<!--col-md--->
          k +='<div class="col-md-5">'
          k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.NextFinishSave()"><?=$lang_resource['SUBMIT'] ?></button></center>'
          k += '</div>'
		  k += '</div>'
		  k += '</div>'                        
		
		/*<!--row-->       
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.NextSave()"><?=$lang_resource['SUBMIT'] ?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'*/
		Popup.Show(k);

   	
			},		
			
	 NextFinishSave: function () {
		
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_APP_CONFIRMATION'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "address",'', false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_APP_USERNAME'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "username",'', false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_CREATE_PASSWORD'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "password",'', false, "configapps.ValueChangedWithType(this)", false, true)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->   
		 k +=' <p style="color:#656d78; font-size:18px" class="text-center">Thank you for integrating with Bringg</p>'
		
                   
		
		<!--row-->       
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick=""><?=$lang_resource['BUSINESS_TAB_APP_OPEN_BRING_DASHBOARD'] ?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   	
			},		
	
    GNew: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_GOOGLE_ANALYTICS'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_TRACKING_ID'] ?>  *</label>'
		k +=Forms.CreateInputPropertySettings("configapps", "trackingid",configapps.Settings.trackingid['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   LiveChatInc: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_LIVECHATINC'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_PASTE_WIDGET_CODE'] ?> </label>'
		k +=Forms.CreateTextAreaPropertyPopupchat("configapps", "chatinc",configapps.Settings.chatinc['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		<!--row-->    
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_SAVE']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
    crazy_egg: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_CRAZY_EGG'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_PASTE_WIDGET_CODE'] ?>  </label>'
		k +=Forms.CreateTextAreaPropertyPopupchat("configapps", "crazyegg",configapps.Settings.crazyegg['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		<!--row-->    
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_SAVE']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   
   
   
   mandrill: function () {
	  Forms.Clean("configapps", "mainbuttonok");	 
		 
        var k = "";
	<!--	<?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?>-->
	
	
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_MANDRILL']?></h3>';
		
		
		
        
      var m = '[{"id":"true","caption":"YES"},{"id":"false","caption":"NO"}]';
	  
	   var mp = '[{"id":"1","caption":"YES"},{"id":"0","caption":"NO"}]';
        m = JSON.parse(m);
		mp = JSON.parse(mp);
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['CONTROL_PANEL_MANDRILL_SETTINGS']?> *</label>'        
     
        k +=Forms.CreateSelectPropertyPopup("configapps", "mandrillsettings", mp, configapps.Settings.mandrillsettings['value'], false,"configapps.ValueChangedWithType2(this);");
		
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['MANDRILL_HOST'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "mandrillhost",configapps.Settings.mandrillhost['value'], false, "configapps.ValueChangedWithType2(this)", false, false)
		
		k +='<small data-bv-validator="notEmpty" class="help-block" id="mandrillhost_text" style="color:#F00;display:none;"><?=
$lang_resource['MANDRILL_HOST_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['MANDRILL_PORT'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "mandrill_port",configapps.Settings.mandrill_port['value'], false, "configapps.ValueChangedWithType2(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="mandrill_port_text" style="color:#F00;display:none;"><?=
$lang_resource['MANDRILL_PORT_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['MANDRILL_SMTP_USERNAME'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "mandrillsmtp",configapps.Settings.mandrillsmtp['value'], false, "configapps.ValueChangedWithType2(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="mandrillsmtp_text" style="color:#F00;display:none;"><?=
$lang_resource['MANDRILL_SMTP_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['MANDRILL_MTP_PASSWORD'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "mandrillmtp",configapps.Settings.mandrillmtp['value'], false, "configapps.ValueChangedWithType2(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="mandrillmtp_text" style="color:#F00;display:none;"><?=$lang_resource['MANDRILL_MTP_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		<!--row-->    
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['ADMIN_PAGE_MANDRILL_SAVE']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		
        k += '</div>'
		Popup.Show(k);

   },
   
   
   
   OlarkLiveChat: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_OLARKLIVECHAT'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['CONTROL_PANEL_APPS_PASTE_WIDGET_CODE'] ?>  </label>'
		k +=Forms.CreateTextAreaPropertyPopupchat("configapps", "olarklive",configapps.Settings.olarklive['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		<!--row-->    
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_SAVE']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   
   
   
   MNew: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_MAILCHIMP'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_MAILCHIMP_ID'] ?>  *</label>'
		k +=Forms.CreateInputPropertySettings("configapps", "mailchamp_api",configapps.Settings.mailchamp_api['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_MAILCHIMP_LIST_ID'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "mailchamp_listid",configapps.Settings.mailchamp_listid['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->    
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   BringgPermissionForEach: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading">Bringg Permission For Each restaurant</h3>'
       
		
		
        m = '[{"id":"1","caption":"Yes"},{"id":"0","caption":"No"}]';
        m = JSON.parse(m);
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label>Bringg permission for each restaurant</label>'
		
    	k +=Forms.CreateSelectPropertyPopup("configapps", "BRING_PERMISSION", m, configapps.Settings.BRING_PERMISSION['value'], false,"configapps.ValueChangedWithType(this)")
		k +='</div>'
        k +='</div>'
		<!--col-md-12-->
        k +='</div>'
		
		
		
		
		
		<!--row-->       
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" ><?=$lang_resource['SUBMIT'] ?></button>';
		
		k +='</center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
    GPSNewSp: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?></h3>'
       
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_BRINGG_ACCESS_TOKEN'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "BRINGG_ACCESS_TOKEN",configapps.Settings.BRINGG_ACCESS_TOKEN['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_BRINGG_SECRET_KEY'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "BRINGG_SECRET_KEY",configapps.Settings.BRINGG_SECRET_KEY['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->   
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_BRINGG_DRIVER_DELIVERY_TIME'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("configapps", "SET_DRIVER_DELIVERY_TIME",configapps.Settings.SET_DRIVER_DELIVERY_TIME['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		//alert(configapps.Settings.BRING_PERMISSION['value']);
		
		
		<!--row-->       
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT'] ?></button>';
		
		k +='</center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   
   
   
   

   BringKeyNew: function(){
        Forms.Clean("bringnewkey", "mainbuttonok");   
        var k = "";
        
        k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_BRING_KEY_HEADING'] ?></h3>'
        
        m = '[{"id":"true","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_PRODUCTION'] ?>"},{"id":"false","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_TEST'] ?>"}]';
        m = JSON.parse(m);
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BRING_KEY_TYPE'] ?></label>'        
        //k +=Forms.CreateSelectPropertyPopup("bringnewkey", "BRING_PERMISSION_TYPE", m, configapps.Settings.BRING_PERMISSION_TYPE['value'], false,"configapps.ValueChangedWithType(this); configapps.BringCre(this.value)")
        k +=Forms.CreateSelectPropertyPopup("bringnewkey", "BRING_PERMISSION_TYPE", m, configapps.Settings.BRING_PERMISSION_TYPE['value'], false,"configapps.ValueChangedWithType(this);")
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        
       // k +='<div id="bringcredential"></div>'
              
          
        k += '<div class="row">'
        k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
        <!--col-md--->
        k += '</div>'
        <!--row-->
        k += '</div>'
        Popup.Show(k);

        //configapps.BringCre(configapps.Settings.BRING_PERMISSION_TYPE['value']);

   },

   BringCre:function(type){   
    var k =''
    if(type == 'true'){        
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_COMPANY_NAME'] ?> *</label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "BRIMG_ACCESS_TOKEN_LIVE",configapps.Settings.BRIMG_ACCESS_TOKEN_LIVE['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->

        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_SECRET_KEY'] ?> *</label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "BRIMG_SECRET_KEY_LIVE",configapps.Settings.BRIMG_SECRET_KEY_LIVE['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->
      
        }else{

        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_COMPANY_NAME'] ?> *</label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "BRIMG_ACCESS_TOKEN_TEST",configapps.Settings.BRIMG_ACCESS_TOKEN_TEST['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->

        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_SECRET_KEY'] ?> *</label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "BRIMG_SECRET_KEY_TEST",configapps.Settings.BRIMG_SECRET_KEY_TEST['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->

        }

        $("#bringcredential").empty().append(k);
   },
  
   GPSNew: function () {
	  
		Forms.Clean("createBringg", "mainbuttonok");	 
        var k = "";
	<!--	<?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?>-->
	
	if(configapps.Settings.BRINGG_USER_ID['value'] != "") {
		         k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_UPDATE_BRINGG_ACCOUNT']?></h3>';
		} else {
				if(configapps.GPSEdit) { 
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CONFIRMATION']?></h3>';
					} else  {
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CREATE_BRINGG_ACCOUNT']?></h3>';
				}
		}
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_NAME'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_USER_NAME",configapps.Settings.BRINGG_USER_NAME['value'], false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_USER_NAME_text" style="color:#F00;display:none;"><?=
$lang_resource['BRINGG_CONFIGS_USERNAME_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
	
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_ADDRESS'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_ADDRESS",configapps.Settings.BRINGG_ADDRESS['value'], false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_ADDRESS_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_ADDRESS_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_PHONE'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_PHONE",configapps.Settings.BRINGG_PHONE['value'], false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PHONE_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PHONE_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	 
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_USERNAME'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_EMAIL",configapps.Settings.BRINGG_EMAIL['value'], false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_EMAIL_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_EMAIL_REQIRED']?></small>'
			k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_EMAIL_VALID_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_EMAIL_VALID_REQUIRED']?></small>'
		
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		//alert(configapps.Settings.BRING_PERMISSION['value']);
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_PASSWORD'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_PASSWORD",configapps.Settings.BRINGG_PASSWORD['value'], false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_REQIRED']?></small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_4_digit_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_4DIGIT_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
       
		<!--row-->    
		
		if(configapps.Settings.BRINGG_USER_ID['value'] != "") {
			
			k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
				
				     k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick=" configapps.GPSNewReagain()"><?=$lang_resource['BRINGG_CONFIGS_CREATE_NEW_BUTTON'] ?></button>';
					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
					
					
			
		} else {
				if(!configapps.GPSEdit) {   
					k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
					k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick="configapps.PreValidateBringgForm(this)"><?=$lang_resource['SUBMIT'] ?></button>';
					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
				}
					else {
				   k += '<div class="row">'
					
				   k += '<h3 class="popup-heading" style="font-size:14px"><?=$lang_resource['BRINGG_CONFIGS_THANK_YOU_BRINGG']?></h3>'
					
				   k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn"  onclick="configapps.GoBringg()"><?=$lang_resource['BRINGG_CONFIGS_OPEN_DASHBOARD'] ?></button>';
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
					<!--row-->
					}
		}
        k += '</div>'
		Popup.Show(k);

   },
   
   
    GPSNewBring: function () {
	  Forms.Clean("configapps", "mainbuttonok");	 
		 
        var k = "";
	<!--	<?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?>-->
	
	if(configapps.Settings.BRINGG_USER_ID['value'] != "") {
		         k += '<h3 class="popup-heading"><?=$lang_resource['UPDATE_BRINGG_ACCOUNT_INFO']?></h3>';
		} else {
				if(configapps.GPSEdit) { 
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CONFIRMATION']?></h3>';
					} else  {
					k += '<h3 class="popup-heading"><?=$lang_resource['UPDATE_BRINGG_ACCOUNT_INFO']?></h3>';
				}
		}
		
		
        
      var m = '[{"id":"true","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_PRODUCTION'] ?>"},{"id":"false","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_TEST'] ?>"}]';
	  
	   var mp = '[{"id":"1","caption":"YES"},{"id":"0","caption":"NO"}]';
        m = JSON.parse(m);
		mp = JSON.parse(mp);
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BUSINESS_PERMISSION']?></label>'        
     
        k +=Forms.CreateSelectPropertyPopup("configapps", "BRINGG_PERMISSION_EACH_RESTAURANT", mp, configapps.Settings.BRINGG_PERMISSION_EACH_RESTAURANT['value'], false,"configapps.ValueChangedWithType1(this);");
		
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
		
		
		 k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BRING_KEY_TYPE'] ?></label>'        
        k +=Forms.CreateSelectPropertyPopup("configapps", "BRING_PERMISSION_TYPE", m, configapps.Settings.BRING_PERMISSION_TYPE['value'], false,"configapps.ValueChangedWithType1(this);")
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
		/*configapps.Settings.BRINGG_COMPANY_ID['value']*/
		/*configapps.Settings.BRINGG_COMPANY_NAME['value']*/
		k += '<h4 class="popup-heading1"><?=$lang_resource['BRINGG_PRODUCTION_KEYS']?> : </h4>';
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_COMPANY_ID'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRINGG_COMPANY_ID_LIVE",configapps.Settings.BRINGG_COMPANY_ID_LIVE['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_COMPANY_ID_LIVE_text" style="color:#F00;display:none;"><?=
$lang_resource['BRINGG_COMPANY_ID_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_COMPANY_NAME'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRINGG_COMPANY_NAME_LIVE",configapps.Settings.BRINGG_COMPANY_NAME_LIVE['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_COMPANY_NAME_LIVE_text" style="color:#F00;display:none;"><?=
$lang_resource['BRINGG_COMPANY_NAME_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_ACC_TOKEN'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRIMG_ACCESS_TOKEN_LIVE",configapps.Settings.BRIMG_ACCESS_TOKEN_LIVE['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRIMG_ACCESS_TOKEN_LIVE_text" style="color:#F00;display:none;"><?=
$lang_resource['BRINGG_ACC_TOKEN_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_SECRET_KEY'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRIMG_SECRET_KEY_LIVE",configapps.Settings.BRIMG_SECRET_KEY_LIVE['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRIMG_SECRET_KEY_LIVE_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_SECRET_KEY_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		k += '<h4 class="popup-heading1"><?=$lang_resource['BRINGG_TEST_KEYS']?> :</h4>';
       k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_COMPANY_ID'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRINGG_COMPANY_ID_TEST",configapps.Settings.BRINGG_COMPANY_ID_TEST['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_COMPANY_ID_TEST_text" style="color:#F00;display:none;"><?=
$lang_resource['BRINGG_COMPANY_ID_TEST_ID_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_COMPANY_NAME'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRINGG_COMPANY_NAME_TEST",configapps.Settings.BRINGG_COMPANY_NAME_TEST['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_COMPANY_NAME_TEST_text" style="color:#F00;display:none;"><?=
$lang_resource['BRINGG_COMPANY_NAME_TEST_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_ACC_TOKEN'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRIMG_ACCESS_TOKEN_TEST",configapps.Settings.BRIMG_ACCESS_TOKEN_TEST['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRIMG_ACCESS_TOKEN_TEST_text" style="color:#F00;display:none;"><?=
$lang_resource['BRIMG_ACCESS_TOKEN_TEST_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_SECRET_KEY'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("configapps", "BRIMG_SECRET_KEY_TEST",configapps.Settings.BRIMG_SECRET_KEY_TEST['value'], false, "configapps.ValueChangedWithType1(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRIMG_SECRET_KEY_TEST_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_SECRET_KEY_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->    
		
		if(configapps.Settings.BRINGG_USER_ID['value'] != "") {
			
			k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
				
				     k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick="configapps.PreValidateBringgForm(this)"><?=$lang_resource['UPDATE_BRINGG_INFO_BUTTON'] ?></button>';
					 					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
					
					
			
		} else {
				if(!configapps.GPSEdit) {   
					k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
					k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick=" configapps.GPSNewReagain()"><?=$lang_resource['BRINGG_CONFIGS_CREATE_NEW_BUTTON'] ?></button>';
					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
				}
					else {
				   k += '<div class="row">'
					
				   k += '<h3 class="popup-heading" style="font-size:14px"><?=$lang_resource['BRINGG_CONFIGS_THANK_YOU_BRINGG']?></h3>'
					
				   k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn"  onclick="configapps.GoBringg()"><?=$lang_resource['BRINGG_CONFIGS_OPEN_DASHBOARD'] ?></button>';
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
					<!--row-->
					}
		}
        k += '</div>'
		Popup.Show(k);

   },
   
     GPSNewReagain: function () {
		 Popup.Close();
		 configapps.GPSEditReagin = true;
	  
		Forms.Clean("createBringg", "mainbuttonok");	 
        var k = "";
	<!--	<?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?>-->
	
	
				if(configapps.GPSEdit) { 
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CONFIRMATION']?></h3>';
					} else  {
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CREATE_BRINGG_ACCOUNT']?></h3>';
				}
		
	
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_NAME']?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_USER_NAME",configapps.BRINGG_USER_NAME, false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_USER_NAME_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_USERNAME_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
	
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_ADDRESS']?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_ADDRESS",configapps.BRINGG_ADDRESS, false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_ADDRESS_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_ADDRESS_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_PHONE'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_PHONE",configapps.BRINGG_PHONE, false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PHONE_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PHONE_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	 
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_USERNAME']?> *</label>'
        k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_EMAIL",configapps.BRINGG_EMAIL, false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_EMAIL_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_EMAIL_REQIRED']?></small>'
			k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_EMAIL_VALID_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_EMAIL_VALID_REQUIRED']?></small>'
		
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		//alert(configapps.Settings.BRING_PERMISSION['value']);
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_PASSWORD']?>*</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_PASSWORD",configapps.BRINGG_PASSWORD, false, "configapps.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_REQIRED']?> </small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_4_digit_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_4DIGIT_REQIRED'] ?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
       
		<!--row-->    
		
		
				if(!configapps.GPSEdit) {   
					k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
					k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick="configapps.PreValidateBringgForm(this)"><?=$lang_resource['SUBMIT'] ?></button>';
					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
				}
					else {
				   k += '<div class="row">'
					
				   k += '<h3 class="popup-heading" style="font-size:14px"><?=$lang_resource['BRINGG_CONFIGS_THANK_YOU_BRINGG']?></h3>'
					
				   k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn"  onclick="configapps.GoBringg()"><?=$lang_resource['BRINGG_CONFIGS_OPEN_DASHBOARD']?></button>';
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
					<!--row-->
					}
		
        k += '</div>'
		Popup.Show(k);

   },
  GoBringg:function () {
	   window.open( "http://app.bringg.com/",'_blank')
	   },
	  
   PreValidateBringgForm:function (frm) {
	   
	  
	   var count = 0;
		
		if(document.getElementById("BRINGG_COMPANY_ID_LIVE").value == ""){            
            $("#BRINGG_COMPANY_ID_LIVE_text").show();
            $("#BRINGG_COMPANY_ID_LIVE").addClass("error-text-field");
            $("#BRINGG_COMPANY_ID_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_ADDRESS_text").hide();
            $("#BRINGG_COMPANY_ID_LIVE").addClass("success-text-field");
            $("#BRINGG_COMPANY_ID_LIVE").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRINGG_COMPANY_NAME_LIVE").value == ""){            
            $("#BRINGG_COMPANY_NAME_LIVE_text").show();
			
            $("#BRINGG_COMPANY_NAME_LIVE").addClass("error-text-field");
            $("#BRINGG_COMPANY_NAME_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_COMPANY_NAME_LIVE_text").hide();
            $("#BRINGG_COMPANY_NAME_LIVE").addClass("success-text-field");
            $("#BRINGG_COMPANY_NAME_LIVE").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_ACCESS_TOKEN_LIVE").value == ""){            
            $("#BRIMG_ACCESS_TOKEN_LIVE_text").show();
			
            $("#BRIMG_ACCESS_TOKEN_LIVE").addClass("error-text-field");
            $("#BRIMG_ACCESS_TOKEN_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_ACCESS_TOKEN_LIVE_text").hide();
            $("#BRIMG_ACCESS_TOKEN_LIVE").addClass("success-text-field");
            $("#BRIMG_ACCESS_TOKEN_LIVE").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_SECRET_KEY_LIVE").value == ""){            
            $("#BRIMG_SECRET_KEY_LIVE_text").show();
			
            $("#BRIMG_SECRET_KEY_LIVE").addClass("error-text-field");
            $("#BRIMG_SECRET_KEY_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_SECRET_KEY_LIVE_text").hide();
            $("#BRIMG_SECRET_KEY_LIVE").addClass("success-text-field");
            $("#BRIMG_SECRET_KEY_LIVE").removeClass("error-text-field");
        }
		
			if(document.getElementById("BRINGG_COMPANY_ID_TEST").value == ""){            
            $("#BRINGG_COMPANY_ID_TEST_text").show();
            $("#BRINGG_COMPANY_ID_TEST").addClass("error-text-field");
            $("#BRINGG_COMPANY_ID_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_ADDRESS_text").hide();
            $("#BRINGG_COMPANY_ID_TEST").addClass("success-text-field");
            $("#BRINGG_COMPANY_ID_TEST").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRINGG_COMPANY_NAME_TEST").value == ""){            
            $("#BRINGG_COMPANY_NAME_TEST_text").show();
			
            $("#BRINGG_COMPANY_NAME_TEST").addClass("error-text-field");
            $("#BRINGG_COMPANY_NAME_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_COMPANY_NAME_TEST_text").hide();
            $("#BRINGG_COMPANY_NAME_TEST").addClass("success-text-field");
            $("#BRINGG_COMPANY_NAME_TEST").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_ACCESS_TOKEN_TEST").value == ""){            
            $("#BRIMG_ACCESS_TOKEN_TEST_text").show();
			
            $("#BRIMG_ACCESS_TOKEN_TEST").addClass("error-text-field");
            $("#BRIMG_ACCESS_TOKEN_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_ACCESS_TOKEN_TEST_text").hide();
            $("#BRIMG_ACCESS_TOKEN_TEST").addClass("success-text-field");
            $("#BRIMG_ACCESS_TOKEN_TEST").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_SECRET_KEY_TEST").value == ""){            
            $("#BRIMG_SECRET_KEY_TEST_text").show();
			
            $("#BRIMG_SECRET_KEY_TEST").addClass("error-text-field");
            $("#BRIMG_SECRET_KEY_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_SECRET_KEY_TEST_text").hide();
            $("#BRIMG_SECRET_KEY_TEST").addClass("success-text-field");
            $("#BRIMG_SECRET_KEY_TEST").removeClass("error-text-field");
        }
		
		
		
		
		if(frm.type == "submit" && count == 0) {
			configapps.Save();
			return true
			}
		else {
			return false;
			}	
		
	  
	   
	   },
	   SaveBringg :function () {
		   
		   if (Forms.CanSave("createBringg")) {
                Main.Loading();
				
				
			
				
			$.post("lib/panel-configs.php", "f=SaveBringgCompanyAndUser&data=" + JSON.stringify(Forms.Form.createBringg) , function (c) {
					
				 Main.Ready(); 
				 Popup.Close();
					  if(c.trim() !="success") {
							 alert(c)
							 
					   } else {
						     configapps.GPSEdit = true;
						   if(configapps.GPSEditReagin == true) {
							   
			    configapps.Settings.BRINGG_USER_NAME['value'] = Forms.Form.createBringg.fields.BRINGG_USER_NAME.value;
				configapps.Settings.BRINGG_ADDRESS['value'] = Forms.Form.createBringg.fields.BRINGG_ADDRESS.value;
				configapps.Settings.BRINGG_PASSWORD['value'] = Forms.Form.createBringg.fields.BRINGG_PASSWORD.value;
				configapps.Settings.BRINGG_EMAIL['value'] = Forms.Form.createBringg.fields.BRINGG_EMAIL.value;
				configapps.Settings.BRINGG_PHONE['value'] = Forms.Form.createBringg.fields.BRINGG_PHONE.value;				   
							   
			configapps.BRINGG_USER_NAME= Forms.Form.createBringg.fields.BRINGG_USER_NAME.value;
			configapps.BRINGG_ADDRESS = Forms.Form.createBringg.fields.BRINGG_ADDRESS.value;
			configapps.BRINGG_PASSWORD = Forms.Form.createBringg.fields.BRINGG_PASSWORD.value;
			configapps.BRINGG_EMAIL = Forms.Form.createBringg.fields.BRINGG_EMAIL.value;
			configapps.BRINGG_PHONE= Forms.Form.createBringg.fields.BRINGG_PHONE.value;
								 
								   configapps.GPSNewReagain();
								   }
						    else {
								configapps.GPSNew();
								}
						   }
					    
					  })
				
					 
                    } 
		  
		 
		     },
      TWNew: function () {
		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_TWILIO'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_TWILIO_SID'] ?> </label>'
		k += Forms.CreateInputPropertySettings("configapps", "sid",configapps.Settings.sid['value'], false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_TWILLIO_TOKEN'] ?> </label>'
		k += Forms.CreateInputPropertySettings("configapps", "token",configapps.Settings.token['value'], false, "configapps.ValueChangedWithType(this)", false, false)
		k += '<small><?=$lang_resource['ADMIN_PAGE_TWILLIO_TOKEN_WARNING']?></small>';
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->		  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="configapps.Save()"><?=$lang_resource['SUBMIT'] ?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   
   EmailNotify: function () {
	   
	   $.post("lib/panel-configs.php", "f=GetEmailNotificationField", function (b) {
		 b = JSON.parse(b) 
		 //alert(b);
		 configapps.EmailNotifyForm(b);
	   });
	   
   },

   
   EmailNotifyForm: function (b) {

		Forms.Clean("configapps", "mainbuttonok");	 
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_EMAIL_NOTIFICATION'] ?></h3>'
		
		k += '<div class="table-responsive">'
		k += '<table class="table table-th-block table-striped tbl_enebal">'
		k += '<thead>'
		k += '<tr>'
		k += '<th width="40%"><?=$lang_resource['CONTROL_PANEL_APPS_EMAIL_NOTIFICATION_NAME'] ?></th>'
		k += '<th width="20%"><?=$lang_resource['ADMIN_PAGE_STATUS'] ?></th>'
		k += '</tr>'
		k += '</thead>'
		k += '<tbody id="client_users">'
		var p = new Array(); 
		for(var c in b){
			p.push(b[c])
		k += '<tr>'
	if(b[c].name == "ORDER_SUCCESS_EMAIL"){
		k += '<td><?=$lang_resource['ORDER_SUCCESS_EMAIL'] ?></td>'
		}
		if(b[c].name == "ORDER_STATUS_EMAIL"){
		k += '<td><?=$lang_resource['ORDER_STATUS_EMAIL'] ?></td>'
		}
		if(b[c].name == "ASSIGN_DRIVER_EMAIL"){
		k += '<td><?=$lang_resource['ASSIGN_DRIVER_EMAIL'] ?></td>'
		}
		if(b[c].name == "ASSIGN_RESTURANT"){
		k += '<td><?=$lang_resource['ASSIGN_RESTURANT'] ?></td>'
		}
		if(b[c].name == "PRINTER_ACCEPTED_EMAIL"){
		k += '<td><?=$lang_resource['PRINTER_ACCEPTED_EMAIL'] ?></td>'
		}
		if(b[c].name == "REVIEW_EMAIL"){
		k += '<td><?=$lang_resource['REVIEW_EMAIL'] ?></td>'
		}
		if(b[c].name == "FORGOT_PASSWORD"){
		k += '<td><?=$lang_resource['FORGOT_PASSWORD'] ?></td>'
		}
		if(b[c].name == "REMINDER_INVOICE"){
		k += '<td><?=$lang_resource['REMINDER_INVOICE'] ?></td>'
		}
		if(b[c].name == "CREATE_INVOICE_EMAIL"){
		k += '<td><?=$lang_resource['CREATE_INVOICE_EMAIL'] ?></td>'
		}
		if(b[c].name == "SUBSCRIPTION_EMAIL"){
		k += '<td><?=$lang_resource['SUBSCRIPTION_EMAIL'] ?></td>'
		}
		if(b[c].name == "LANDING_PAGE_ORDERING_PAGES_REGISTER_EMAIL"){
		k += '<td><?=$lang_resource['LANDING_PAGE_ORDERING_PAGES_REGISTER_EMAIL'] ?></td>'
		}
		if(b[c].name == "LANDING_PAGE_HAPPY_CLOTH_REGISTER_EMAIL"){
		k += '<td><?=$lang_resource['LANDING_PAGE_HAPPY_CLOTH_REGISTER_EMAIL'] ?></td>'
		}
		if(b[c].name == "LANDING_PAGE_HAPPY_CLOTH_SUBSCRIPTION_EMAIL"){
		k += '<td><?=$lang_resource['LANDING_PAGE_HAPPY_CLOTH_SUBSCRIPTION_EMAIL'] ?></td>'
		}
		if(b[c].name == "RESTAURANT_ACCEPT_MAIL_TO_CUSTOMER"){//15
		k += '<td><?=$lang_resource['RESTAURANT_ACCEPT_MAIL_TO_CUSTOMER'] ?></td>'
		}
		if(b[c].name == "DRIVER_ASSIGN_MAIL_TO_CUSTOMER"){
		k += '<td><?=$lang_resource['DRIVER_ASSIGN_MAIL_TO_CUSTOMER'] ?></td>'
		}
		if(b[c].name == "ORDER_COMPLETATION_MAIL_TO_CUSTOMER"){
		k += '<td><?=$lang_resource['ORDER_COMPLETATION_MAIL_TO_CUSTOMER'] ?></td>'
		}
		k += '<td><div class="enebal" id="switchemail_' + b[c].id + '"></div></td>'
		k += '</tr>'
		}
		k += '<tbody>'
		k += '</table>'
		k += '</div>'

        k += '</div>'
		Popup.Show(k);
		var g = false;
		 Switch.Init();
		for (c in p) {
            if (p[c].id != b.id) {
                if (p[c].status == "t") {
                    g = true
                } else {
                    g = false
                }
				
                Switch.Create("switchemail_" + p[c].id, g);
                Switch.OnChange("switchemail_" + p[c].id, function (m, l) {
                configapps.SetEnabled(m.replace("switchemail_", ""), l)
                })
            }
        }

   },
   SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/panel-configs.php", "f=SetEnabledEmail&id=" + b + "&enabled=" + Estr, function (c) {
        
            if (c != "ok") {
                Switch.SwitchTo("switchemail_" + b, a)
            }
        })
    },

	ValueChangedWithType: function(a){	
	
		if(configapps.Settings[a.id]['ivalue'] != a.value){			
			configapps.Settings[a.id]['value'] = a.value;
		}
	},
	
	ValueChangedWithType1: function(a){	
	 var count = 0;
		
		if(document.getElementById("BRINGG_COMPANY_ID_LIVE").value == ""){            
            $("#BRINGG_COMPANY_ID_LIVE_text").show();
            $("#BRINGG_COMPANY_ID_LIVE").addClass("error-text-field");
            $("#BRINGG_COMPANY_ID_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_ADDRESS_text").hide();
            $("#BRINGG_COMPANY_ID_LIVE").addClass("success-text-field");
            $("#BRINGG_COMPANY_ID_LIVE").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRINGG_COMPANY_NAME_LIVE").value == ""){            
            $("#BRINGG_COMPANY_NAME_LIVE_text").show();
			
            $("#BRINGG_COMPANY_NAME_LIVE").addClass("error-text-field");
            $("#BRINGG_COMPANY_NAME_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_COMPANY_NAME_LIVE_text").hide();
            $("#BRINGG_COMPANY_NAME_LIVE").addClass("success-text-field");
            $("#BRINGG_COMPANY_NAME_LIVE").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_ACCESS_TOKEN_LIVE").value == ""){            
            $("#BRIMG_ACCESS_TOKEN_LIVE_text").show();
			
            $("#BRIMG_ACCESS_TOKEN_LIVE").addClass("error-text-field");
            $("#BRIMG_ACCESS_TOKEN_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_ACCESS_TOKEN_LIVE_text").hide();
            $("#BRIMG_ACCESS_TOKEN_LIVE").addClass("success-text-field");
            $("#BRIMG_ACCESS_TOKEN_LIVE").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_SECRET_KEY_LIVE").value == ""){            
            $("#BRIMG_SECRET_KEY_LIVE_text").show();
			
            $("#BRIMG_SECRET_KEY_LIVE").addClass("error-text-field");
            $("#BRIMG_SECRET_KEY_LIVE").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_SECRET_KEY_LIVE_text").hide();
            $("#BRIMG_SECRET_KEY_LIVE").addClass("success-text-field");
            $("#BRIMG_SECRET_KEY_LIVE").removeClass("error-text-field");
        }
		
			if(document.getElementById("BRINGG_COMPANY_ID_TEST").value == ""){            
            $("#BRINGG_COMPANY_ID_TEST_text").show();
            $("#BRINGG_COMPANY_ID_TEST").addClass("error-text-field");
            $("#BRINGG_COMPANY_ID_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_ADDRESS_text").hide();
            $("#BRINGG_COMPANY_ID_TEST").addClass("success-text-field");
            $("#BRINGG_COMPANY_ID_TEST").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRINGG_COMPANY_NAME_TEST").value == ""){            
            $("#BRINGG_COMPANY_NAME_TEST_text").show();
			
            $("#BRINGG_COMPANY_NAME_TEST").addClass("error-text-field");
            $("#BRINGG_COMPANY_NAME_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_COMPANY_NAME_TEST_text").hide();
            $("#BRINGG_COMPANY_NAME_TEST").addClass("success-text-field");
            $("#BRINGG_COMPANY_NAME_TEST").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_ACCESS_TOKEN_TEST").value == ""){            
            $("#BRIMG_ACCESS_TOKEN_TEST_text").show();
			
            $("#BRIMG_ACCESS_TOKEN_TEST").addClass("error-text-field");
            $("#BRIMG_ACCESS_TOKEN_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_ACCESS_TOKEN_TEST_text").hide();
            $("#BRIMG_ACCESS_TOKEN_TEST").addClass("success-text-field");
            $("#BRIMG_ACCESS_TOKEN_TEST").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRIMG_SECRET_KEY_TEST").value == ""){            
            $("#BRIMG_SECRET_KEY_TEST_text").show();
			
            $("#BRIMG_SECRET_KEY_TEST").addClass("error-text-field");
            $("#BRIMG_SECRET_KEY_TEST").removeClass("success-text-field");
           count++;
        }else{
            $("#BRIMG_SECRET_KEY_TEST_text").hide();
            $("#BRIMG_SECRET_KEY_TEST").addClass("success-text-field");
            $("#BRIMG_SECRET_KEY_TEST").removeClass("error-text-field");
        }
		
		
		if(configapps.Settings[a.id]['ivalue'] != a.value){           
            configapps.Settings[a.id]['value'] = a.value;
             return true;
            }

		
		if(count == 0) {
			 return true;

			}
		else {
			return false;
			}	
	},
	
	ValueChangedWithType2: function(a){	
	 var count = 0;
		
		if(document.getElementById("mandrillhost").value == ""){            
            $("#mandrillhost_text").show();
            $("#mandrillhost").addClass("error-text-field");
            $("#mandrillhost").removeClass("success-text-field");
           count++;
        }else{
            $("#mandrillhost_text").hide();
            $("#mandrillhost").addClass("success-text-field");
            $("#mandrillhost").removeClass("error-text-field");
        }
		
		if(document.getElementById("mandrill_port").value == ""){            
            $("#mandrill_port_text").show();
			
            $("#mandrill_port").addClass("error-text-field");
            $("#mandrill_port").removeClass("success-text-field");
           count++;
        }else{
            $("#mandrill_port_text").hide();
            $("#mandrill_port").addClass("success-text-field");
            $("#mandrill_port").removeClass("error-text-field");
        }
		
		if(document.getElementById("mandrillsmtp").value == ""){            
            $("#mandrillsmtp_text").show();
			
            $("#mandrillsmtp").addClass("error-text-field");
            $("#mandrillsmtp").removeClass("success-text-field");
           count++;
        }else{
            $("#mandrillsmtp_text").hide();
            $("#mandrillsmtp").addClass("success-text-field");
            $("#mandrillsmtp").removeClass("error-text-field");
        }
		
		if(document.getElementById("mandrillmtp").value == ""){            
            $("#mandrillmtp_text").show();
			
            $("#mandrillmtp").addClass("error-text-field");
            $("#mandrillmtp").removeClass("success-text-field");
           count++;
        }else{
            $("#mandrillmtp_text").hide();
            $("#mandrillmtp").addClass("success-text-field");
            $("#mandrillmtp").removeClass("error-text-field");
        }
		
		
		
		
		
		if(count == 0) {
			if(configapps.Settings[a.id]['ivalue'] != a.value){			
			configapps.Settings[a.id]['value'] = a.value;
			 return true;
			}	
		 
			}
		else {
			return false;
			}	
	},
	



	
	Save: function (a) {
        
        Main.Loading();
        for(var s in configapps.Settings){  
            var re = '/+/g';
            if(configapps.Settings[s].value ){
            configapps.Settings[s].value = configapps.Settings[s].value.split("+").join("@@@");
            configapps.Settings[s].ivalue = configapps.Settings[s].ivalue.split("+").join("@@@");
            }
                        
            configapps.Settings[s].value = window.btoa(unescape(encodeURIComponent(configapps.Settings[s].value)))
            configapps.Settings[s].ivalue = window.btoa(unescape(encodeURIComponent(configapps.Settings[s].ivalue)))
            
            configapps.Settings[s].value = configapps.Settings[s].value.split("+").join("###");
            configapps.Settings[s].ivalue = configapps.Settings[s].ivalue.split("+").join("###");
            
        }   
        
        
        Main.Request("panel-configs", null, "f=SaveConfigsApps&data=" + JSON.stringify(configapps.Settings), "configapps.Main()")
        Main.Ready();
        Popup.Close();
        
    },
	
};
