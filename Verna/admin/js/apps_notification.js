var Appnotification ={
	
	Main: function(){		
	
		if(Business.id){
			Main.Loading();
     		var a = new Date().getTime();
        	Main.Aid = a;			
			$.post("lib/reviews_settings.php", "f=FetchReviewSettingsDataByID&id="+Business.id, function (c) {	
				
				Appnotification.Reviews=JSON.parse(c);
			});		
			
			$.post("lib/order_notification.php", "f=FetchBusinessDataByID&id="+Business.id, function (b) {				
				if (a != Main.Aid) {
	                return
	            }
				Main.Ready();
				Appnotification.PrintMain(JSON.parse(b));
				Appnotification.Business = JSON.parse(b);

			});			
		}else{
            var N=''
            N += '<div class="col-md-12">'
            N += '<div class="the-box">'
            N += '<div class="clearfix" style="padding:5px 0">'
            N +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_PRODUCTS_PLEASE_CREATE_BUSINESS']?></p>'
            N += '</div></div></div>'
            document.getElementById("tab_app").innerHTML = N;
        }
		
		
		
	},
	PrintMain: function(F){		
	
		
		var n ='';

		
	if(F.ALL_BRINGG_PERMISSION_EACH_RESTAURANT  == 1) {
		n +='<h4 class="on_h4"><strong><?=$lang_resource['BUSINESS_TAB_GPS_APP_BRING']?></strong></h4>'
		n +='<div class="row">'
			
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
	
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><?=$lang_resource['BUSINESS_TAB_APP_BRING']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		var H = ''	
	//	n +='<input type="checkbox" id="acceptemail" name="checkbox" '+H+'  disabled style="" class="switch checkbox_2 hand">'
		n +='<label for="acceptemail">&nbsp;</label></div>'
		n +='<a  href="javascript:Appnotification.BringgMain()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'

		n +='</span>'

		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +="<p><?=$lang_resource['BUSINESS_TAB_APP_NOTIFICATION']?></p>"		
		n +='</div>'		
		<!--the-box-->
		n +='</div>'

		
		/*n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
		n +='<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><?=$lang_resource['BUSINESS_TAB_BRINGG_KEY']?></h4></a>'
		n +='<span class="pull-right on-right inline-popups">'
		n +='<div class=" pull-left">'
		//	n +='<input type="checkbox" id="acceptemail" name="checkbox" '+H+'  disabled style="" class="switch checkbox_2 hand">'
		n +='<label>&nbsp;</label></div>'
		n +='<a  href="javascript:Appnotification.BringKeyNew()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
		n +='</span>'
		n +='<hr style="clear:both; margin-bottom:10px;">'
		n +='<p><?=$lang_resource['CONTROL_PANEL_APPS_BRINGG_KEY_DESCRIPTION']?></p>'
		n +='</div>'
		<!--the-box-->*/
		n +='</div>'
		
		
	}



		
		n +='<h4 class="on_h4"><strong><?=$lang_resource['BUSINESS_TAB_GPS_APP_ANALYTICS']?></strong></h4>'	
		n +='<div class="row">'	
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
        n += '<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><?=$lang_resource['CONTROL_PANEL_APPS_GOOGLE_ANALYTICS']?></h4></a>'
        n += '<span class="pull-right on-right inline-popups">'
		//alert(F.googleanalytic);
        n += '<a  href="javascript:Appnotification.analyticForm(\'' +  Main.NullToEmpty(F.googleanalytic) + '\',\'' +  Main.NullToEmpty(F.id) + '\')" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        n += '</span>'
        n += '<hr style="clear:both; margin-bottom:10px;">'
        n += '<p><?=$lang_resource['CONTROL_PANEL_APPS_GOOGLE_ANALYTICS_DESCCRIPTION']?></p>'
        n += '</div>'
		<!--the-box-->
        n += '</div>'
		
		
		


        n +='</div>'
		
		n +='<h4 class="on_h4"><strong><?= $lang_resource['BUSINESS_TAB_FEATURES'] ?></strong></h4>'	
		n +='<div class="row">'	
		n +='<div class="col-md-4">'
		n +='<div class="the-box rounded">'
        n += '<a href="javascript:void(0)"><h4 class="on-heaeing clearfix"><?=$lang_resource['BUSINESS_TAB_REVIEWS_SETTING']?></h4></a>'
        n += '<span class="pull-right on-right inline-popups">'
		//alert(F.googleanalytic);
        n += '<a  href="javascript:Appnotification.reviewsetting()" data-effect="mfp-zoom-in"><i class="fa icon-cog2 on-setting"></i></a>'
        n += '</span>'
        n += '<hr style="clear:both; margin-bottom:10px;">'
        n += '<p><?=$lang_resource['BUSINESS_TAB_REVIEW_SETTING_DESCCRIPTION']?></p>'
        n += '</div>'
		<!--the-box-->
        n += '</div>'
		 n += '</div>'
    	
		document.getElementById("tab_app").innerHTML = n;
		
	},
	

	 GPSNew: function () {
		
	
		// alert(b[0].bringg_userid);
	  
		Forms.Clean("createBringg", "mainbuttonok");	 
        var k = "";
		Forms.Form.createBringg.id = Business.id   
	<!--	<?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?>-->
	         k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_BUSINESS_UPDATE_BRINGG_ACCOUNT']?></h3>';
/*	if(Appnotification.bringg_userid && Appnotification.bringg_userid != 0) {
		         k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_BUSINESS_UPDATE_BRINGG_ACCOUNT']?></h3>';
		} else {
				if(Appnotification.GPSEdit) { 
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CONFIRMATION']?></h3>';
					} else  {
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CREATE_BUSINESS_BRINGG_ACCOUNT']?></h3>';
				}
		}
*/		/*k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_USER_NAME",Main.NullToEmpty(Appnotification.bringg_username), false, "Appnotification.PreValidateBringgForm(this)", false, false)*/
		
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="bring_top_block">'
		k +='<p><?=$lang_resource['CONTROL_PANEL_BRING_HELP_BLOG'] ?></p>'
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'

        
		 var m = '[{"id":"true","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_PRODUCTION'] ?>"},{"id":"false","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_TEST'] ?>"}]';
        m = JSON.parse(m);
		if(Appnotification.bringg_key=="t"){
			var bringgkey = 'true';
			
			}
			else
			{
				var bringgkey = 'false';
				
			}
			
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BRING_KEY_TYPE'] ?></label>'        
        //k +=Forms.CreateSelectPropertyPopup("bringnewkey", "BRING_PERMISSION_TYPE", m, configapps.Settings.BRING_PERMISSION_TYPE['value'], false,"configapps.ValueChangedWithType(this); configapps.BringCre(this.value)")
        k +=Forms.CreateSelectPropertyPopup("createBringg", "BRING_PERMISSION_TYPE", m, bringgkey, false,"Appnotification.PreValidateBringgForm(this);")
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
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_COMPANY_ID_LIVE",Main.NullToEmpty(Appnotification.bringg_company_id_live), false, "Appnotification.PreValidateBringgForm(this)", false, false)
		
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
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_COMPANY_NAME_LIVE",Main.NullToEmpty(Appnotification.bringg_company_name_live), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		
		k += Forms.CreateInputPropertySettings("createBringg", "BRIMG_ACCESS_TOKEN_LIVE",Main.NullToEmpty(Appnotification.bring_access_token_live), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		
		k += Forms.CreateInputPropertySettings("createBringg", "BRIMG_SECRET_KEY_LIVE",Main.NullToEmpty(Appnotification.bring_secret_key_live), false, "Appnotification.PreValidateBringgForm(this)", false, false)

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
		
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_COMPANY_ID_TEST",Main.NullToEmpty(Appnotification.bringg_company_id_test), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_COMPANY_NAME_TEST",Main.NullToEmpty(Appnotification.bringg_company_name_test), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		
		k += Forms.CreateInputPropertySettings("createBringg", "BRIMG_ACCESS_TOKEN_TEST",Main.NullToEmpty(Appnotification.bring_access_token_test), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		
		k += Forms.CreateInputPropertySettings("createBringg", "BRIMG_SECRET_KEY_TEST",Main.NullToEmpty(Appnotification.bring_secret_key_test), false, "Appnotification.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRIMG_SECRET_KEY_TEST_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_SECRET_KEY_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'		<!--row-->    
		
		
		k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
	
		k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick="Appnotification.PreValidateBringgForm(this)"><?=$lang_resource['UPDATE_BRINGG_INFO_BUTTON'] ?></button>';
		
		k +='</center>'
		k += '</div>'
		<!--col-md--->
		k += '</div>'


		
		/*k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_NAME'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_USER_NAME",Main.NullToEmpty(Appnotification.bringg_username), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_ADDRESS",Main.NullToEmpty(Appnotification.bringg_address), false, "Appnotification.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_ADDRESS_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_ADDRESS_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	 
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_USERNAME'] ?> *</label>'
        k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_EMAIL",Main.NullToEmpty(Appnotification.bringg_email), false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_PASSWORD",Main.NullToEmpty(Appnotification.bringg_password), false, "Appnotification.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_REQIRED']?></small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_4_digit_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_4DIGIT_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
       
		<!--row-->    
		
		if(Appnotification.bringg_userid && Appnotification.bringg_userid != 0) {
			
			k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
				
				     k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick=" Appnotification.GPSNewReagain()"><?=$lang_resource['BRINGG_CONFIGS_CREATE_NEW_BUTTON'] ?></button>';
					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
					
					
			
		} else {
				if(!Appnotification.GPSEdit) {   
					k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
					k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick="Appnotification.PreValidateBringgForm(this)"><?=$lang_resource['SUBMIT'] ?></button>';
					
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
        k += '</div>'*/
		Popup.Show(k);

   },
   
   
   
   
	 GPSNewReagain: function () {
		 Popup.Close();
		 Appnotification.GPSEditReagin = true;
		 
	
		Forms.Clean("createBringg", "mainbuttonok");	
		 
        var k = "";
		Forms.Form.createBringg.id = Business.id  
	<!--	<?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?>-->
	
	
				if(Appnotification.GPSEdit) { 
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CONFIRMATION']?></h3>';
					} else  {
						Appnotification.bringg_username = "";
						Appnotification.bringg_address = "";
						Appnotification.bringg_email = "";
						Appnotification.bringg_password = "";
					k += '<h3 class="popup-heading"><?=$lang_resource['BRINGG_CONFIGS_CREATE_BRINGG_ACCOUNT']?></h3>';
				}
		
	
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_NAME']?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_USER_NAME", Appnotification.bringg_username, false, "Appnotification.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_USER_NAME_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_USERNAME_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
	
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_ADDRESS']?> *</label>'
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_ADDRESS",Appnotification.bringg_address, false, "Appnotification.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_ADDRESS_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_ADDRESS_REQIRED']?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
	 
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRINGG_CONFIGS_USERNAME']?> *</label>'
        k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_EMAIL",Appnotification.bringg_email, false, "Appnotification.PreValidateBringgForm(this)", false, false)
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
		k += Forms.CreateInputPropertySettings("createBringg", "BRINGG_PASSWORD",Appnotification.bringg_password, false, "Appnotification.PreValidateBringgForm(this)", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_REQIRED']?> </small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="BRINGG_PASSWORD_4_digit_text" style="color:#F00;display:none;"><?=$lang_resource['BRINGG_CONFIGS_PASSWORD_4DIGIT_REQIRED'] ?></small>'
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
       
		<!--row-->    
		
		
				if(!Appnotification.GPSEdit) {   
					k += '<div class="row">'
					k += '<div class="col-md-6 col-md-offset-3">'
					k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn" onclick="Appnotification.PreValidateBringgForm(this)"><?=$lang_resource['SUBMIT'] ?></button>';
					
					k +='</center>'
					k += '</div>'
					<!--col-md--->
					k += '</div>'
				}
					else {
				   k += '<div class="row">'
					
				   k += '<h3 class="popup-heading" style="font-size:14px"><?=$lang_resource['BRINGG_CONFIGS_THANK_YOU_BRINGG']?></h3>'
					
				   k += '<center><button type="submit"  class="btn btn-primary popup-submit-btn"  onclick="Appnotification.GoBringg()"><?=$lang_resource['BRINGG_CONFIGS_OPEN_DASHBOARD']?></button>';
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
	BringgMain: function(){
		
		$.post("lib/order_notification.php", "f=FetchBringgid&id="+Business.id, function (b) {	
			 b = JSON.parse(b);
						
				Appnotification.bringg_key = b.bringg_key;
				Appnotification.bringg_company_id_live = b.bringg_company_id_live;
				Appnotification.bringg_company_name_live = b.bringg_company_name_live;
				Appnotification.bring_access_token_live = b.bring_access_token_live;
				Appnotification.bring_secret_key_live = b.bring_secret_key_live;
				Appnotification.bringg_company_id_test = b.bringg_company_id_test;
				Appnotification.bringg_company_name_test = b.bringg_company_name_test;
				Appnotification.bring_access_token_test = b.bring_access_token_test;
				Appnotification.bring_secret_key_test = b.bring_secret_key_test;
			    Appnotification.bringg_username = b.bringg_username;
				Appnotification.bringg_address = b.bringg_address;
				Appnotification.bringg_password = b.bringg_password;
				Appnotification.bringg_email   = b.bringg_email;
				Appnotification.bringg_userid =  b.bringg_userid;
				Appnotification.bringgcompanyid =  b.bringgcompanyid;
			    Appnotification.GPSNew();
		});
	},

	BringKeyNew: function(F){
        Forms.Clean("bringnewkey", "mainbuttonok");   
        Forms.Form.bringnewkey.id = Business.id   
        var k = "";
        
        k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_BRING_KEY_HEADING'] ?></h3>'
		
	  
        m = '[{"id":"t","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_PRODUCTION'] ?>"},{"id":"f","caption":"<?=$lang_resource['CONTROL_PANEL_BRING_KEY_TEST'] ?>"}]';
        m = JSON.parse(m);
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BRING_KEY_TYPE'] ?></label>'        
        //k +=Forms.CreateSelectPropertyPopup("bringnewkey", "bring_permission_type", m, Appnotification.Business.bring_permission_type, false,"Appnotification.BringCre(this.value,"+F+")")
        k +=Forms.CreateSelectPropertyPopup("bringnewkey", "bring_permission_type", m, Appnotification.Business.bring_permission_type, false,"")
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
       // k +='<div id="bringcredential"></div>'
              
          
        k += '<div class="row">'
        k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.SaveBring()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
        <!--col-md--->
        k += '</div>'
        <!--row-->
        k += '</div>'
        Popup.Show(k);

        //Appnotification.BringCre(Appnotification.Business.bring_permission_type);

   },

   BringCre:function(type){   
    var k =''
    if(type == 't'){        
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_COMPANY_NAME'] ?> </label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "bring_access_token_live",Appnotification.Business.bring_access_token_live, false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->

        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_SECRET_KEY'] ?> </label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "bring_secret_key_live",Appnotification.Business.bring_secret_key_live, false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->
      
        }else{

        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_COMPANY_NAME'] ?> </label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "bring_access_token_test",Appnotification.Business.bring_access_token_test, false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->

        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BRING_ADMIN_SECRET_KEY'] ?> </label>'
        k +=Forms.CreateInputPropertySettings("bringnewkey", "bring_secret_key_test",Appnotification.Business.bring_secret_key_test, false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
        <!--col-md-12-->
        k += '</div>'
        <!--row-->

        }

        $("#bringcredential").empty().append(k);
   },
   SaveBring: function(){		
		//alert(JSON.stringify(Forms.Form.analytic));
		$.post("lib/order_notification.php", "f=BringSave&data=" + JSON.stringify(Forms.Form.bringnewkey), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},
	  /*SaveBringg :function (b) {
		 
		   
		   if (Forms.CanSave("createBringg")) {
                Main.Loading();
				
				configapps.Settings.BRINGG_USER_NAME['value'] = Forms.Form.createBringg.fields.BRINGG_USER_NAME.value;
				configapps.Settings.BRINGG_ADDRESS['value'] = Forms.Form.createBringg.fields.BRINGG_ADDRESS.value;
				configapps.Settings.BRINGG_PASSWORD['value'] = Forms.Form.createBringg.fields.BRINGG_PASSWORD.value;
				configapps.Settings.BRINGG_EMAIL['value'] = Forms.Form.createBringg.fields.BRINGG_EMAIL.value;
			
				
			$.post("lib/panel-configs.php", "f=SaveBringgCompanyAndUser&data=" + JSON.stringify(Forms.Form.createBringg) , function (c) {
					
				 Main.Ready(); 
				 Popup.Close();
					  if(c.trim() !="success") {
							 alert(c)
							 
					   } else {
						     Appnotification.GPSEdit = true;
						   if(Appnotification.GPSEditReagin == true) {
							   
			configapps.BRINGG_USER_NAME= Forms.Form.createBringg.fields.BRINGG_USER_NAME.value;
			configapps.BRINGG_ADDRESS = Forms.Form.createBringg.fields.BRINGG_ADDRESS.value;
			configapps.BRINGG_PASSWORD = Forms.Form.createBringg.fields.BRINGG_PASSWORD.value;
			configapps.BRINGG_EMAIL = Forms.Form.createBringg.fields.BRINGG_EMAIL.value;
								 
								   configapps.GPSNewReagain();
								   }
						    else {
								configapps.GPSNew();
								}
						   }
					    
					  })
				
					 
                    } 
		  
		 
		     },*/
	
	PreValidateBringgForm:function (frm) {
	   
	  
	   var count = 0;
		
		/*if(document.getElementById("BRINGG_ADDRESS").value == ""){            
            $("#BRINGG_ADDRESS_text").show();
            $("#BRINGG_ADDRESS").addClass("error-text-field");
            $("#BRINGG_ADDRESS").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_ADDRESS_text").hide();
            $("#BRINGG_ADDRESS").addClass("success-text-field");
            $("#BRINGG_ADDRESS").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRINGG_USER_NAME").value == ""){            
            $("#BRINGG_USER_NAME_text").show();
			
            $("#BRINGG_USER_NAME").addClass("error-text-field");
            $("#BRINGG_USER_NAME").removeClass("success-text-field");
           count++;
        }else{
            $("#BRINGG_USER_NAME_text").hide();
            $("#BRINGG_USER_NAME").addClass("success-text-field");
            $("#BRINGG_USER_NAME").removeClass("error-text-field");
        }
		
		if(document.getElementById("BRINGG_EMAIL").value == ""){            
            $("#BRINGG_EMAIL_text").show();
			$("#BRINGG_EMAIL_VALID_text").hide();
            $("#BRINGG_EMAIL").addClass("error-text-field");
            $("#BRINGG_EMAIL").removeClass("success-text-field");
            count++;
        } else if(!Main.IsEmail(document.getElementById("BRINGG_EMAIL").value)) {
			
			$("#BRINGG_EMAIL_text").hide();
			$("#BRINGG_EMAIL_VALID_text").show();
            $("#BRINGG_EMAIL").addClass("error-text-field");
            $("#BRINGG_EMAIL").removeClass("success-text-field");
            count++;
		}
		
		else{
            $("#BRINGG_EMAIL_text").hide();
			$("#BRINGG_EMAIL_VALID_text").hide();
            $("#BRINGG_EMAIL").addClass("success-text-field");
            $("#BRINGG_EMAIL").removeClass("error-text-field");
        }
		
		var pwd = document.getElementById("BRINGG_PASSWORD").value;
		
		if(pwd == ""){            
            $("#BRINGG_PASSWORD_text").show();
			 $("#BRINGG_PASSWORD_4_digit_text").hide();
			
            $("#BRINGG_PASSWORD").addClass("error-text-field");
            $("#BRINGG_PASSWORD").removeClass("success-text-field");
			
           count++;
        }
		else if(pwd.length < 4){            
            $("#BRINGG_PASSWORD_text").hide();
			 $("#BRINGG_PASSWORD_4_digit_text").show();
            $("#BRINGG_PASSWORD").addClass("error-text-field");
            $("#BRINGG_PASSWORD").removeClass("success-text-field");
           count++;
        }
		else{
            $("#BRINGG_PASSWORD_text").hide();
			$("#BRINGG_PASSWORD_4_digit_text").hide();
            $("#BRINGG_PASSWORD").addClass("success-text-field");
            $("#BRINGG_PASSWORD").removeClass("error-text-field");
        }*/
		
		
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
                   Appnotification.Save();
				   return true;
			}
		else {
			return false;
			}	
		
	  
	   
	   },
	BringgForm: function(b){
		
		
		/*alert(JSON.stringify(b))*/
		Forms.Clean("Bring", "popupmainbuttonok");	 
		 if (b.id) {
            Forms.Form.Bring.type = "modify";  
            Forms.Form.Bring.id = b.id         
        } else {
           b = new Object();
            Forms.Form.Bring.type = "create";                      
        }
		
        var k = "";
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_BRINGG'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_BRINGG_COMPANY_ID'] ?> *</label>'
		k += Forms.CreateInputPropertySettings("Bring", "BRINGG_COMPANY_ID",b.bringgcompanyid, false, "configapps.ValueChangedWithType(this)", false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		
		
        m = '[{"id":"0","caption":"No"}, {"id":"1","caption":"Yes"}]';
        m = JSON.parse(m);
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_BRING_PERMISSION']?> </label>'
		
		
    	k +=Forms.CreateSelectPropertyPopup("Bring", "BRING_PERMISSION", m, b.bringpermission, false,"configapps.ValueChangedWithType(this)")
		
		 // k += Forms.CreateInputPropertySettings("configapps", "BRING_PERMISSION",configapps.Settings.BRING_PERMISSION['value'], false, "configapps.ValueChangedWithType(this)", false, false)
		  
		//k +='<small data-bv-validator="notEmpty" class="help-block" id="payment_type_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_ONE_OPTION']?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-12-->
        k +='</div>'
		
		
		
		
		
		<!--row-->       
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.SaveBringgEachBusiness()"><?=$lang_resource['SUBMIT'] ?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);
		

   	
		
		
		},
	

	
	EmailSave: function(){		
		$.post("lib/order_notification.php", "f=SaveEmail&data=" + JSON.stringify(Forms.Form.email), function (a) {
			 Popup.Close();
			Appnotification.Main();
		});
	},
	/*EMAIL Settings*/
	/*GPRS Settings*/
	GprsMain: function(){
		/*$.post("lib/order_notification.php", "f=FetchBusinessGprsDataByID&id="+Business.id, function (b) {			
			Appnotification.GprsForm(JSON.parse(b));
			//alert(b);
		});*/
		$.post("lib/order_notification.php", "f=FetchAllPrinterModel", function (mm) {
		mm = JSON.parse(mm);
		  //  PrinterSet.AllModel = new Array();
		  
		  
		  var i = new Array();
		i.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_CHOOSE_MODEL']?>"}'));
			
			 for (var E in mm) {
                var y = new Object();
                y.id = mm[E].id;
                y.caption = mm[E].model_name;
               // PrinterSet.AllModel.push(y);
			 
			   i.push(y);
			  
            }
			
			Appnotification.AllModel = i;
			
			
		});
		$.post("lib/order_notification.php", "f=FetchPrinterData&id="+Business.id, function (b) {
        //alert(JSON.stringify(c))
		///return false;     
         	Appnotification.GprsForm(b);
        });
	},
	ValueChangedWithType: function(a){	
	
		/*if(Appnotification.Settings[a.id]['ivalue'] != a.value){			
			Appnotification.Settings[a.id]['value'] = a.value;
		}*/
	},
	GprsForm: function(b){
		//alert(b);
		 Forms.Clean("printer", "mainbuttonok");
		if (b) {
            Forms.Form.printer.type = "modify";  
            Forms.Form.printer.id = Business.id        
        } 
	
		v = JSON.parse(b);
		//alert(v[0].printer_model);
		
		var n =''
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_GPRS_SMS_PRINTERS']?></h3>'
		n +='<div class="row">'
		n +='<div class="col-md-6">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_PORT']?></label>'
		n +='<input type="text" class="form-control" value="'+v[0].apn+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-6-->
		n +='<div class="col-md-6">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SERVER_IP']?></label>'
		n +='<input type="text" class="form-control" value="'+v[0].sip+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-6-->
		n +='</div>'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_PRINTER_FILE_PATH']?></label>'
		n +='<input type="text" class="form-control" value="'+v[0].pfp+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_CONFIRMATION_FILE_PATH']?></label>'
		n +='<input type="text" class="form-control" value="'+v[0].cfp+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SET_PRINTER_MODEL']?> </label>'
		n +=Forms.SelectInputProperty_p("printer", "printer_model",Appnotification.AllModel, v[0].printer_model,false, "", true)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="splitcase_text6" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SUBMIT_SELECT_AT_LIST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		
		
		
			
		
		<!--row--> 
			n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.printersave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row--> 
		n +='</div>'

		Popup.Show(n)
	},
	/*GPRS Settings*/
	/*Sms Settings*/
	SmsMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessSmsDataByID&id="+Business.id, function (b) {			
			Appnotification.SmsForm(JSON.parse(b));
		});
	},
	
	PreValid: function (){
		
	
		if(document.getElementById("printer_model").value == "-1"){            
            $("#splitcase_text6").show();
         
        }else{
            $("#splitcase_text6").hide();
           
        }
	},
	
	
	SmsForm: function(b){
		Forms.Clean("sms", "popupmainbuttonok");

        if (b) {
            Forms.Form.sms.type = "modify";  
            Forms.Form.sms.id = b.id         
        } else {
            b = new Object();
            Forms.Form.sms.type = "create";  
            Forms.CreateValue("sms", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n =''
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SMS_NOTIFICATION']?></h3>'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_TWILIO_NO']?></label>'
		n +=Forms.CreateInputPropertyPopup("sms", "twiliophone", Main.NullToEmpty(b.twiliophone), true,"")
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_MOBILE']?></label>'
		n +=Forms.CreateInputPropertyPopup("sms", "cel", Main.NullToEmpty(b.cel), true,"")		
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.SmsSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	},
	SmsSave: function(){	
	
		$.post("lib/order_notification.php", "f=SaveSms&data=" + JSON.stringify(Forms.Form.sms), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},
	GoogleSave: function(){		
		//alert(JSON.stringify(Forms.Form.analytic));
		$.post("lib/order_notification.php", "f=GoogleSave&data=" + JSON.stringify(Forms.Form.analytic), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},
	/*Sms Settings*/
	printersave: function(){		
			$.post("lib/order_notification.php", "f=Saveprinter&data=" + JSON.stringify(Forms.Form.printer), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},

	UpdateReviewStatus: function(){
	$.post("lib/reviews_settings.php", "f=UpdateReviewSettingsDataByID&data="+JSON.stringify(Forms.Form.review), function(c){	
	    Popup.Close();
		Appnotification.Main();
	//Reviews.PrintMain(JSON.parse(c));
	});
	},//end of function UpdateReviewStatus
	
	PaypalMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaypalDataByID&id="+Business.id, function (b) {					
			Appnotification.PaypalForm(JSON.parse(b));
		});
	},
	PaypalForm: function(F){
		Forms.Clean("paypal", "popupmainbuttonok");

        if (F) {
            Forms.Form.paypal.type = "modify";  
            Forms.Form.paypal.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paypal.type = "create";  
            Forms.CreateValue("paypal", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n =''
        n +='<h3 class="popup-heading"> <?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_CARD_ONLINR']?> </h3>'
		
		var pm="";
        pm ='[{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_sandbox']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_LIVE']?>"}]';
        pm = JSON.parse(pm);
		
		n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("paypal", "paypal_type",pm, F.paypal_type, false)
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYPAL_EMAIL_ID']?></label>'
        n +=Forms.CreateInputPropertyPopup("paypal", "paypal", F.paypal, false,"Appnotification.PreValidate()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypal_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_EMAIL_IS_REQUIRED']?></small>'
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paypal_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_INVALID_EMAIL']?> </small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.PaypalSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n)
       
	},

	  analyticForm: function (b,id) {
		
		
		Forms.Clean("analytic", "popupmainbuttonok");	 
        var k = "";
		 if (id) {
          //  Forms.Form.analytic.type = "modify";  
            Forms.Form.analytic.id = id         
        } else {
			
            b = new Object();
            Forms.Form.analytic.type = "create";  
            Forms.CreateValue("analytic", "businessid", Forms.Form.business.id, false, true, true)          
        }
		
		k += '<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_APPS_GOOGLE_ANALYTICS'] ?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_TRACKING_ID'] ?>  *</label>'

		k +=Forms.CreateInputPropertySettings("analytic", "trackingid", Main.NullToEmpty(b),false, false, false)
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.GoogleSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
   
   reviewsetting: function () {
		 var k = "";
		var c = Appnotification.Reviews;
		Forms.Clean("review", "popupmainbuttonok");	 
        
		if(c){
            Forms.Form.review.type = "modify";  
			Forms.CreateValue("review", "businessid", Business.id, false, true, true)
        }else{
            c = new Object();
            Forms.Form.review.type = "create";  
            Forms.CreateValue("review", "businessid", Forms.Form.business.id, false, true, true)          
        }
                 
       
		
		k += '<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_REVIEWS_SETTING']?></h3>'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_REVIEWS'] ?></label>'
		var yn="";
        yn ='[{"id":"0","caption":"No"},{"id":"1","caption":"Yes"}]';
        yn = JSON.parse(yn);
		k +=Forms.CreateSelectPropertyPopup("review", "review_status",yn, c.review_status, false)	
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['BUSINESS_TAB_REVIEWS_PHOTO_UPLOAD'] ?></label>'
		
		k +=Forms.CreateSelectPropertyPopup("review", "photo_upload_status",yn, c.photo_upload_status, false)		
        k += '</div>'
        k += '</div>'
		<!--col-md-12-->
        k += '</div>'
		<!--row-->  
        k += '<div class="row">'
		k += '<div class="col-md-6 col-md-offset-3">'
        k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.UpdateReviewStatus()"><?=$lang_resource['SUBMIT']?></button></center>'
        k += '</div>'
		<!--col-md--->
        k += '</div>'
		<!--row-->
        k += '</div>'
		Popup.Show(k);

   },
  /* ValueChangedWithType: function(a){	
	
		if(Appnotification.Settings[a.id]['ivalue'] != a.value){			
			Appnotification.Settings[a.id]['value'] = a.value;
		}
	},*/
	/*********validate popup Fields***************/
	PreValidate: function (){
		var count = 0;
		if(document.getElementById("paypal").value == ""){            
            $("#paypal_text").show();
            $("#paypal").addClass("error-text-field");
            $("#paypal").removeClass("success-text-field");
           count++;
        }else{
            $("#paypal_text").hide();
            $("#paypal").addClass("success-text-field");
            $("#paypal").removeClass("error-text-field");
        }
		var email = document.getElementById("paypal").value;
		var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(email).match(emailReg)){
            $("#paypal_text1").show();
            $("#paypal2").addClass("error-text-field");
            $("#paypal2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#paypal_text1").hide();
            $("#paypal2").addClass("error-text-field");
            $("#paypal2").removeClass("success-text-field");
		}
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	
	Save: function(){
		
		        Appnotification.bringg_key = Forms.Form.createBringg.fields.BRING_PERMISSION_TYPE.value;
				Appnotification.bringg_company_id_live = Forms.Form.createBringg.fields.BRINGG_COMPANY_ID_LIVE.value;
				Appnotification.bringg_company_name_live = Forms.Form.createBringg.fields.BRINGG_COMPANY_NAME_LIVE.value;
				Appnotification.bring_access_token_live = Forms.Form.createBringg.fields.BRIMG_ACCESS_TOKEN_LIVE.value;	
				Appnotification.bring_secret_key_live = Forms.Form.createBringg.fields.BRIMG_SECRET_KEY_LIVE.value;
				Appnotification.bringg_company_id_test = Forms.Form.createBringg.fields.BRINGG_COMPANY_ID_TEST.value;
				Appnotification.bringg_company_name_test = Forms.Form.createBringg.fields.BRINGG_COMPANY_NAME_TEST.value;
				Appnotification.bring_access_token_test = Forms.Form.createBringg.fields.BRIMG_ACCESS_TOKEN_TEST.value;	
				Appnotification.bring_secret_key_test = Forms.Form.createBringg.fields.BRIMG_SECRET_KEY_TEST.value;
              //  alert(JSON.stringify(Forms.Form.createBringg));	
				$.post("lib/order_notification.php", "f=SaveBringg&data=" + JSON.stringify(Forms.Form.createBringg), function (a) {
				//alert(a)
			 	Popup.Close();
			Appnotification.Main();
		});
	},
	SaveBringg :function () {
		
		   if (Forms.CanSave("createBringg")) {
                Main.Loading();
				
			
				Appnotification.bringg_username = Forms.Form.createBringg.fields.BRINGG_USER_NAME.value;
				Appnotification.bringg_address = Forms.Form.createBringg.fields.BRINGG_ADDRESS.value;
				Appnotification.bringg_password = Forms.Form.createBringg.fields.BRINGG_PASSWORD.value;
				Appnotification.bringg_email = Forms.Form.createBringg.fields.BRINGG_EMAIL.value;
			
				
			$.post("lib/order_notification.php", "f=SaveBringgCompanyAndUser&data=" + JSON.stringify(Forms.Form.createBringg) , function (c) {
			
				 Main.Ready(); 
				 Popup.Close();
					  if(c.trim() !="success") {
							 alert(c)
							 
					   } else {
						     Appnotification.GPSEdit = true;
						   if(Appnotification.GPSEditReagin == true) {
							
			Appnotification.bringg_username= Forms.Form.createBringg.fields.BRINGG_USER_NAME.value;
			Appnotification.bringg_address = Forms.Form.createBringg.fields.BRINGG_ADDRESS.value;
			Appnotification.bringg_password = Forms.Form.createBringg.fields.BRINGG_PASSWORD.value;
			Appnotification.bringg_email = Forms.Form.createBringg.fields.BRINGG_EMAIL.value;
								 
								   Appnotification.GPSNewReagain();
								   }
						    else {
								Appnotification.GPSNew();
								}
						   }
					    
					  })
				
					 
                    } 
		  
		 
		     },
	 SaveBringgEachBusiness: function (a) {
		//alert("aaa");
		//alert(JSON.stringify(Forms.Form.Bring));
		Main.Loading();
/*		Main.Request("panel-configs", null, "f=SaveConfigs&data=" + JSON.stringify(configapps.Settings), "configapps.Main()")
*/       $.post("lib/panel-configs.php", "f=SaveBusiness&data=" + JSON.stringify(Forms.Form.Bring), function (a) {
	       
			 Popup.Close();
			 Main.Ready();
			Appnotification.Main();
		});
		
	},
	PaypalSave: function(){
		if(Appnotification.PreValidate() == false){
			return
		}
		$.post("lib/order_notification.php", "f=SavePaypal&data=" + JSON.stringify(Forms.Form.paypal), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},
	/*Paypal*/

	/*Paypal Adaptive*/
	PaypalAdaptiveMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessPaypalAdaptiveDataByID&id="+Business.id, function (b) {					
			Appnotification.PaypalAdaptiveForm(JSON.parse(b));
		});
	},
	PaypalAdaptiveForm:function(F){

		Forms.Clean("paypaladaptive", "popupmainbuttonok");
		
        if (F.id) {
            Forms.Form.paypaladaptive.type = "modify";  
            Forms.Form.paypaladaptive.id = F.id         
        } else {
            F = new Object();
            Forms.Form.paypaladaptive.type = "create";                      
        }
        Forms.CreateValue("paypaladaptive", "bus_id", Business.id, false, true, true)
		
		var n ='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYPAL_ADAPTIVE']?></h3>'

		n +='<div class="row">'

		b = '{"id":"-1","caption":""},'
        g = "[" + b + '{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_No']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_YES_DEFAULT']?>"},{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_YES_CUSTOM']?>"}]';
        g = JSON.parse(g);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_SPLIT_PAYMENT']?> *</label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "splitcase", g, F.splitcase, true, "Appnotification.SplitType(this.value);Appnotification.PreValidate2()", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="splitcase_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		if(Forms.Form.paypaladaptive.type == "modify"){
        	Appnotification.SplitType(F.splitcase);
    	}

		n +='<div id="split_change">'
		n +='</div>'
		

		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.PaypalAdaptiveSave()"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
           
	},
	SplitType: function(value){		
    	$.post("lib/order_notification.php", "f=FetchBusinessPaypalAdaptiveDataByID&id="+Business.id, function (b) {					
			Appnotification.SplitChange(JSON.parse(b),value);
		});
    },
	SplitChange: function(F,value){
		
		var n =''
		if(value == 1 || value == 2){
		n +='<div class="row">'

		p = '{"id":"-1","caption":"<?=$lang_resource['CITY_SUPER_SELECT']?>"},'
        m = "[" + p + '{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_YES']?>"},{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_No']?>"}]';
        m = JSON.parse(m);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_MAIL_TO_RECIEVE_PAYMENTS']?> *</label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "paymail", m, F.paymail, true,"Appnotification.PreValidate2()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="paymail_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_EMAIL']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "payadaptivemail", F.payadaptivemail, true,"Appnotification.PreValidate2()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payadaptivemail_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_EMAIL_REQUIRED']?></small>'
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payadaptivemail_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INVALID_EMAIL']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		}
		if(value == 2){

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_PERCENT_COMMISION']?> *</label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "com_per", F.com_per, true,"Appnotification.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="com_per_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_PERCENTAGE_COMMISION_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_FIXEDRATE_COMMISION']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "com_rate", F.com_rate, true,"Appnotification.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="com_rate_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_FIXEDRATE_COMMISION_REQUIRED']?></small>'  
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 

		n +='<div class="row">'

		j = '{"id":"-1","caption":"<?=$lang_resource['CITY_SUPER_SELECT']?>"},'
        itax = "[" + p + '{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_No']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_YES_CITY_TAX']?>"},{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_CUSTOM']?>"}]';
        itax = JSON.parse(itax);

		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_STATISTICS_INCLUDING_TAX']?></label>'
		n +=Forms.CreateSelectPropertyPopup("paypaladaptive", "tax", itax, F.tax, false, "Appnotification.TaxType(this.value);Appnotification.PreValidate2()", false)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="tax_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INCLUDING_TAX_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		if(Forms.Form.paypaladaptive.type == "modify"){
        	Appnotification.TaxType(F.tax);
    	}

		n +='<div id="tax_part">'
		n +='</div>'

		}

		$("#split_change").empty().append(n);
	},
	TaxType: function(value){		
    	$.post("lib/order_notification.php", "f=FetchBusinessPaypalAdaptiveDataByID&id="+Business.id, function (b) {					
			Appnotification.TaxChange(JSON.parse(b),value);
		});
    },
    TaxChange: function(F,value){

    	var n =''
    	if(value == 2){
    	n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_CUSTOM']?></label>'
		n +=Forms.CreateInputPropertyPopup("paypaladaptive", "custom", F.custom, true,"Appnotification.PreValidate2()",false, false, "return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="custom_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAYPAL_ADAPTIVE_INCLUDING_TAX_REQUIRED']?></small>'  
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		}

    	$("#tax_part").empty().append(n);
    },
	
	PreValidate2: function (){

		var count = 0;
		if(document.getElementById("splitcase").value == "-1"){            
            $("#splitcase_text").show();
            $("#splitcase").addClass("error-text-field");
            $("#splitcase").removeClass("success-text-field");
           count++;
        }else{
            $("#splitcase_text").hide();
            $("#splitcase").addClass("success-text-field");
            $("#splitcase").removeClass("error-text-field");
        }
		
			if(document.getElementById("splitcase").value==1){
			if(document.getElementById("paymail").value == "-1"){            
            $("#paymail_text").show();
            $("#paymail").addClass("error-text-field");
            $("#paymail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#paymail_text").hide();
            $("#paymail").addClass("success-text-field");
            $("#paymail").removeClass("error-text-field");
        }
		if(document.getElementById("payadaptivemail").value == ""){            
            $("#payadaptivemail_text").show();
            $("#payadaptivemail").addClass("error-text-field");
            $("#payadaptivemail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#payadaptivemail_text").hide();
            $("#payadaptivemail").addClass("success-text-field");
            $("#payadaptivemail").removeClass("error-text-field");
        }
		var emailada = document.getElementById("payadaptivemail").value;
		var emailRegada = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(emailada).match(emailRegada)){
            $("#payadaptivemail_text1").show();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#payadaptivemail_text1").hide();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
		}
		
		
	}
		if(document.getElementById("splitcase").value==2){
			if(document.getElementById("paymail").value == "-1"){            
            $("#paymail_text").show();
            $("#paymail").addClass("error-text-field");
            $("#paymail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#paymail_text").hide();
            $("#paymail").addClass("success-text-field");
            $("#paymail").removeClass("error-text-field");
        }
		if(document.getElementById("payadaptivemail").value == ""){            
            $("#payadaptivemail_text").show();
            $("#payadaptivemail").addClass("error-text-field");
            $("#payadaptivemail").removeClass("success-text-field");
           count++;
        }else{
			
            $("#payadaptivemail_text").hide();
            $("#payadaptivemail").addClass("success-text-field");
            $("#payadaptivemail").removeClass("error-text-field");
        }
		var emailada = document.getElementById("payadaptivemail").value;
		var emailRegada = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
			
		if(!(emailada).match(emailRegada)){
            $("#payadaptivemail_text1").show();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#payadaptivemail_text1").hide();
            $("#payadaptivemail2").addClass("error-text-field");
            $("#payadaptivemail2").removeClass("success-text-field");
		}
		if(document.getElementById("com_per").value == ""){            
            $("#com_per_text").show();
            $("#com_per").addClass("error-text-field");
            $("#com_per").removeClass("success-text-field");
           count++;
        }else{
			
            $("#com_per_text").hide();
            $("#com_per").addClass("success-text-field");
            $("#com_per").removeClass("error-text-field");
        }
		if(document.getElementById("com_rate").value == ""){            
            $("#com_rate_text").show();
            $("#com_rate").addClass("error-text-field");
            $("#com_rate").removeClass("success-text-field");
           count++;
        }else{
			
            $("#com_rate_text").hide();
            $("#com_rate").addClass("success-text-field");
            $("#com_rate").removeClass("error-text-field");
        }
		if(document.getElementById("tax").value == "-1"){            
            $("#tax_text").show();
            $("#tax").addClass("error-text-field");
            $("#tax").removeClass("success-text-field");
           count++;
        }else{
			
            $("#tax_text").hide();
            $("#tax").addClass("success-text-field");
            $("#tax").removeClass("error-text-field");
        }
		if(document.getElementById("tax").value == "2"){ 
		if(document.getElementById("custom").value == ""){            
            $("#custom_text").show();
            $("#custom").addClass("error-text-field");
            $("#custom").removeClass("success-text-field");
           count++;
        }else{
			
            $("#custom_text").hide();
            $("#custom").addClass("success-text-field");
            $("#custom").removeClass("error-text-field");
        }
		}
		}
		
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
    PaypalAdaptiveSave: function(){
		if(Appnotification.PreValidate2() == false){
			return
		}
    	
		$.post("lib/order_notification.php", "f=SavePaypalAdaptive&data=" + JSON.stringify(Forms.Form.paypaladaptive), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},
	/*Paypal Adaptive*/

	/*Authorize*/
	AuthorizeMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessAuthorizeDataByID&id="+Business.id, function (b) {					
			Appnotification.AuthorizeForm(JSON.parse(b));
		});
	},
	AuthorizeForm: function(F){
		Forms.Clean("authorize", "popupmainbuttonok");

        if (F) {
            Forms.Form.authorize.type = "modify";  
            Forms.Form.authorize.id = F.id         
        } else {
            F = new Object();
            Forms.Form.authorize.type = "create";  
            Forms.CreateValue("authorize", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var n =''
        n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Authorize']?></h3>'

        var pa="";
        pa ='[{"id":"0","caption":"Test"},{"id":"1","caption":"Secure"}]';
        pa = JSON.parse(pa);

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("authorize", "payment_type", pa, F.payment_type, false, "", false)
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL']?></label>'
        n +=Forms.CreateInputPropertyPopup("authorize", "aplid", F.aplid, false,"Appnotification.PreValidate3()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="aplid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL_REQUIRED']?></small>' 
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-12">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY']?></label>'
        n +=Forms.CreateInputPropertyPopup("authorize", "tkey", F.tkey, false,"Appnotification.PreValidate3()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="tkey_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-12-->
        n +='</div>'
        <!--row-->  

        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.AuthorizeSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n)
  
	},
	
	PreValidate3: function (){
		var count = 0;
		if(document.getElementById("aplid").value == ""){            
            $("#aplid_text").show();
            $("#aplid").addClass("error-text-field");
            $("#aplid").removeClass("success-text-field");
           count++;
        }else{
            $("#aplid_text").hide();
            $("#aplid").addClass("success-text-field");
            $("#aplid").removeClass("error-text-field");
        }
		if(document.getElementById("tkey").value == ""){            
            $("#tkey_text").show();
            $("#tkey").addClass("error-text-field");
            $("#tkey").removeClass("success-text-field");
           count++;
        }else{
            $("#tkey_text").hide();
            $("#tkey").addClass("success-text-field");
            $("#tkey").removeClass("error-text-field");
        }
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	
	AuthorizeSave: function(){
    	if(Appnotification.PreValidate3() == false){
			return
		}
		$.post("lib/order_notification.php", "f=SaveAuthorize&data=" + JSON.stringify(Forms.Form.authorize), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
	},
	/*Authorize*/
	/*Braintree*/
	BraintreeMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessBraintreeDataByID&id="+Business.id, function (b) {					
			Appnotification.BraintreeForm(JSON.parse(b));
		});
	},
	BraintreeForm: function(F){
		Forms.Clean("braintree", "popupmainbuttonok");

        if (F) {
            Forms.Form.braintree.type = "modify";  
            Forms.Form.braintree.id = F.id         
        } else {
            F = new Object();
            Forms.Form.braintree.type = "create";  
            Forms.CreateValue("braintree", "businessid", Forms.Form.business.id, false, true, true)          
        }

        var ba="";
        ba ='[{"id":"0","caption":"sandbox"},{"id":"1","caption":"live"}]';
        ba = JSON.parse(ba);

        var n =''
        n +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY']?></h3>'
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PAYMENT_METHOD']?></label>'
        n +=Forms.CreateSelectPropertyPopup("braintree", "environment", ba, F.environment, false, "", false)
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID']?></label>'
        n +=Forms.CreateInputPropertyPopup("braintree", "merchant_id", F.merchant_id, false,"Appnotification.PreValidate4()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="merchant_id_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->
        n +='<div class="row">'
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY']?></label>'
        n +=Forms.CreateInputPropertyPopup("braintree", "public_key", F.public_key, false,"Appnotification.PreValidate4()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="public_key_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='<div class="col-md-6">'
        n +='<div class="form-group">'
        n +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY']?></label>'
        n +=Forms.CreateInputPropertyPopup("braintree", "private_key", F.private_key, false,"Appnotification.PreValidate4()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="private_key_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_PRIVATE_KEY_IS_REQUIRED']?></small>'
        n +='</div>'
        n +='</div>'
        <!--col-md-6-->
        n +='</div>'
        <!--row-->  
        n +='<div class="row">'
        n +='<div class="col-md-6 col-md-offset-3">'
        n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.BraintreeSave()"><?=$lang_resource['SUBMIT']?></button></center>'
        n +='</div>'
        <!--col-md--->
        n +='</div>'
        <!--row-->

        Popup.Show(n)

    },
	PreValidate4: function (){
		var count = 0;
		if(document.getElementById("merchant_id").value == ""){            
            $("#merchant_id_text").show();
            $("#merchant_id").addClass("error-text-field");
            $("#merchant_id").removeClass("success-text-field");
           count++;
        }else{
            $("#merchant_id_text").hide();
            $("#merchant_id").addClass("success-text-field");
            $("#merchant_id").removeClass("error-text-field");
        }
		if(document.getElementById("public_key").value == ""){            
            $("#public_key_text").show();
            $("#public_key").addClass("error-text-field");
            $("#public_key").removeClass("success-text-field");
           count++;
        }else{
            $("#public_key_text").hide();
            $("#public_key").addClass("success-text-field");
            $("#public_key").removeClass("error-text-field");
        }
		if(document.getElementById("private_key").value == ""){            
            $("#private_key_text").show();
            $("#private_key").addClass("error-text-field");
            $("#private_key").removeClass("success-text-field");
           count++;
        }else{
            $("#private_key_text").hide();
            $("#private_key").addClass("success-text-field");
            $("#private_key").removeClass("error-text-field");
        }
		if(count == 0)
        	return true
        else 
        	return false
		
	},
    BraintreeSave: function(){
		if(Appnotification.PreValidate4() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveBraintree&data=" + JSON.stringify(Forms.Form.braintree), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
    },
	/*Braintree*/

	/*Mercado Pago*/
	MarcoMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessMarcoDataByID&id="+Business.id, function (b) {					
			Appnotification.MarcoForm(JSON.parse(b));
		});
	},
	MarcoForm: function(F){
		Forms.Clean("marco", "popupmainbuttonok");

        if (F) {
            Forms.Form.marco.type = "modify";  
            Forms.Form.marco.id = F.id         
        } else {
            F = new Object();
            Forms.Form.marco.type = "create";  
            Forms.CreateValue("marco", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_MERCADO_PAGO']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['MERCO_CLIENT_KEY']?></label>'
		n +=Forms.CreateInputPropertyPopup("marco", "clientkey", F.clientkey, false,"Appnotification.PreValidate5()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="clientkey_text" style="color:#F00;display:none;"><?=$lang_resource['MERCO_CLIENT_KEY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['MERCO_SECRET_KEY']?></label>'
		n +=Forms.CreateInputPropertyPopup("marco", "secretkey", F.secretkey, false,"Appnotification.PreValidate5()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="secretkey_text" style="color:#F00;display:none;"><?=$lang_resource['MERCO_SECRET_KEY_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->  
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.MarcoSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate5: function (){
		var count = 0;
		if(document.getElementById("clientkey").value == ""){            
            $("#clientkey_text").show();
            $("#clientkey").addClass("error-text-field");
            $("#clientkey").removeClass("success-text-field");
           count++;
        }else{
            $("#clientkey_text").hide();
            $("#clientkey").addClass("success-text-field");
            $("#clientkey").removeClass("error-text-field");
        }
		if(document.getElementById("secretkey").value == ""){            
            $("#secretkey_text").show();
            $("#secretkey").addClass("error-text-field");
            $("#secretkey").removeClass("success-text-field");
           count++;
        }else{
            $("#secretkey_text").hide();
            $("#secretkey").addClass("success-text-field");
            $("#secretkey").removeClass("error-text-field");
        }
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	MarcoSave: function(){
		if(Appnotification.PreValidate5() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveMarco&data=" + JSON.stringify(Forms.Form.marco), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
    },
	/*Mercado Pago*/
	
	
	/** Mercury Payment**/
	MercuryMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessMercuryDataByID&id="+Business.id, function (b) {					
			Appnotification.MercuryForm(JSON.parse(b));
		});
	},
	
	MercuryForm: function(F){
		Forms.Clean("mercury", "popupmainbuttonok");

        if (F) {
            Forms.Form.mercury.type = "modify";  
            Forms.Form.mercury.id = F.id         
        } else {
            F = new Object();
            Forms.Form.mercury.type = "create";  
            Forms.CreateValue("mercury", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['MERCURY_PAYMENT_HEADER']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Merchant Id</label>'
		n +=Forms.CreateInputPropertyPopup("mercury", "mercury_id", F.mercury_id, false,"Appnotification.PreValidate6()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="mercury_id_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Merchant Password </label>'
		n +=Forms.CreateInputPropertyPopup("mercury", "mercury_pass", F.mercury_pass, false,"Appnotification.PreValidate6()",'',true)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="mercury_pass_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->  
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.MercurySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate6: function (){
		var count = 0;
		if(document.getElementById("mercury_id").value == ""){            
            $("#mercury_id_text").show();
            $("#mercury_id").addClass("error-text-field");
            $("#mercury_id").removeClass("success-text-field");
           count++;
        }else{
            $("#mercury_id_text").hide();
            $("#mercury_id").addClass("success-text-field");
            $("#mercury_id").removeClass("error-text-field");
        }
		if(document.getElementById("mercury_pass").value == ""){            
            $("#mercury_pass_text").show();
            $("#mercury_pass").addClass("error-text-field");
            $("#mercury_pass").removeClass("success-text-field");
           count++;
        }else{
            $("#mercury_pass_text").hide();
            $("#mercury_pass").addClass("success-text-field");
            $("#mercury_pass").removeClass("error-text-field");
        }
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	MercurySave: function(){
		if(Appnotification.PreValidate6() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveMercury&data=" + JSON.stringify(Forms.Form.mercury), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
    },
	/** Mercury Payment**/
	
	/** World  Pay**/
	WorldpayMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessWolrdPayDataByID&id="+Business.id, function (b) {					
			Appnotification.WorldPayForm(JSON.parse(b));
		});
	},
	
	WorldPayForm: function(F){
		Forms.Clean("worldpay", "popupmainbuttonok");

        if (F) {
            Forms.Form.worldpay.type = "modify";  
            Forms.Form.worldpay.id = F.id         
        } else {
            F = new Object();
            Forms.Form.worldpay.type = "create";  
            Forms.CreateValue("worldpay", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['WORLDPAY_PAYMENT_HEADER']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_ID']?></label>'
		n +=Forms.CreateInputPropertyPopup("worldpay", "cardsaveid", F.cardsaveid, false,"Appnotification.PreValidate7()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="cardsaveid_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_ID_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_PASSWORD']?> </label>'
		n +=Forms.CreateInputPropertyPopup("worldpay", "cardsavepass", F.cardsavepass, false,"Appnotification.PreValidate7()",'',true)
		n +='<small data-bv-validator="notEmpty" class="help-block" id="cardsavepass_text" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_WORLDPAY_CARD_PASSWORD_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->  
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.WorldpaySave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate7: function (){
		var count = 0;
		if(document.getElementById("cardsaveid").value == ""){            
            $("#cardsaveid_text").show();
            $("#cardsaveid").addClass("error-text-field");
            $("#cardsaveid").removeClass("success-text-field");
           count++;
        }else{
            $("#cardsaveid_text").hide();
            $("#cardsaveid").addClass("success-text-field");
            $("#cardsaveid").removeClass("error-text-field");
        }
		if(document.getElementById("cardsavepass").value == ""){            
            $("#cardsavepass_text").show();
            $("#cardsavepass").addClass("error-text-field");
            $("#cardsavepass").removeClass("success-text-field");
           count++;
        }else{
            $("#cardsavepass_text").hide();
            $("#cardsavepass").addClass("success-text-field");
            $("#cardsavepass").removeClass("error-text-field");
        }
		
		if(count == 0)
        	return true
        else 
        	return false
		
	},
	WorldpaySave: function(){
		if(Appnotification.PreValidate7() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveWorld&data=" + JSON.stringify(Forms.Form.worldpay), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
    },
	/** CardSave Payment**/
	
	/** Transactium  Pay**/
	TransactiumMain: function(){
		$.post("lib/order_notification.php", "f=FetchBusinessTransactiumDataByID&id="+Business.id, function (d) {					
			Appnotification.TransactiumForm(JSON.parse(d));
		});
	},
	TransactiumForm: function(F){
		Forms.Clean("transactium", "popupmainbuttonok");

        if (F) {
            Forms.Form.transactium.type = "modify";  
            Forms.Form.transactium.id = F.id         
        } else {
            F = new Object();
            Forms.Form.transactium.type = "create";  
            Forms.CreateValue("transactium", "businessid", Forms.Form.business.id, false, true, true)          
        }

		var n = ''
		n +='<h3 class="popup-heading"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY']?></h3>'

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label>Username</label>'
		n +=Forms.CreateInputPropertyPopup("transactium", "transactiumusername", F.transactiumusername, false,"Appnotification.PreValidate8()")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumusername_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_USERNAME_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_PASSWORD']?></label>'
		n +=Forms.CreateInputPropertyPopup("transactium", "transactiumpass", F.transactiumpass, false,"Appnotification.PreValidate8()",'',true) 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumpass_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_PASSWORD_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_TAG']?></label>'
		n +=Forms.CreateInputPropertyPopup("transactium", "transactiumtag", F.transactiumtag, false,"PaymentGatewaySettings.PreValidate8()") 
		n +='<small data-bv-validator="notEmpty" class="help-block" id="transactiumtag_text" style="color:#F00;display:none;"><?=$lang_resource['PAYMENT_TRANSACTIUM_PAY_TAG_REQUIRED']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>' 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Appnotification.TransactiumSave()"><?=$lang_resource['SUBMIT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
	
	},
	PreValidate8: function (){
		var count = 0;
		if(document.getElementById("transactiumusername").value == ""){            
            $("#transactiumusername_text").show();
            $("#transactiumusername").addClass("error-text-field");
            $("#transactiumusername").removeClass("success-text-field");
           count++;
        }else{
            $("#transactiumusername_text").hide();
            $("#transactiumusername").addClass("success-text-field");
            $("#transactiumusername").removeClass("error-text-field");
        }
		if(document.getElementById("transactiumpass").value == ""){            
            $("#transactiumpass_text").show();
            $("#transactiumpass").addClass("error-text-field");
            $("#transactiumpass").removeClass("success-text-field");
           count++;
        }else{
            $("#transactiumpass_text").hide();
            $("#transactiumpass").addClass("success-text-field");
            $("#transactiumpass").removeClass("error-text-field");
        }
		
		if(document.getElementById("transactiumtag").value == ""){            
            $("#transactiumtag_text").show();
            $("#transactiumtag").addClass("error-text-field");
            $("#transactiumtag").removeClass("success-text-field");
           count++;
        }else{
            $("#transactiumtag_text").hide();
            $("#transactiumtag").addClass("success-text-field");
            $("#transactiumtag").removeClass("error-text-field");
        }
		
		if(count == 0)
		
        	return true
        else 
        	return false
		
	},
	TransactiumSave: function(){
		if(Appnotification.PreValidate8() == false){
			return
		}
    	$.post("lib/order_notification.php", "f=SaveTransactium&data=" + JSON.stringify(Forms.Form.transactium), function (a) {
			Popup.Close();
			Appnotification.Main();
		});
    },
	
	
};