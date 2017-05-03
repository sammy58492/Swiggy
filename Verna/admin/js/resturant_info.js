var BResturantInfo = {
	Main: function(F){
		BResturantInfo.namelang = Array();
		BResturantInfo.addresslang = Array();
		BResturantInfo.colonylang = Array();
         <!-------------------------------------------------------resturant info ------------------------------------------------> 
    var N = '<div class="row" id="tab_general">'
        N += '<div class="col-md-12">'
        N += '<div class="the-box">'
		
		N +='<div class="row">'
		N +='<ul class="pop_lang_img">'
		flaginfoB=Main.languageinfo;
		for(Z in flaginfoB){
			var x = "../panel/images/lang/" + Main.NullToEmpty(flaginfoB[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfoB[Z].id == flaginfoB[Z].admindefaulelang ){ 
			  
				BResturantInfo.langdefault = flaginfoB[Z].admindefaulelang;                             
				N+='<li class="active" id="langFlagB-'+flaginfoB[Z].id+'"><a href="javascript:void(0)" onClick="BResturantInfo.show_id('+flaginfoB[Z].id+')"><img src="'+x+'"" ></a></li>'
			}else{
				N+='<li  id="langFlagB-'+flaginfoB[Z].id+'"><a href="javascript:void(0)" onClick="BResturantInfo.show_id('+flaginfoB[Z].id+')"><img src="'+x+'"" ></a></li>'  
			}
		}
		N +='</ul>'
		N +='</div>'
		<!--row-->
		N += '<div class="row">'
        N += '<div class="col-md-5">'
        N += '</div>'
        N += '<div class="col-md-2">'
        N +='<span ><img  id="loader1" src="../panel/images/menu/progress.gif" width="36" height="36" style="display:none"  alt="loading.gif"/></span>'
        N += '</div>'
        N += '<div class="col-md-5">'
        N += '</div>'
        N += '</div>'
        N += '<div class="row">'
       
        var A = "";
        
        if (F.id) {
     	if(F.isimg == 1) {
            A = "../panel/images/business/" + Main.NullToEmpty(F.id) + "/panel.jpg?c=" + new Date().getTime();
            }
            else  {
               A = "images/dummy/default-logo.png";
            }
        }else{
        A = "images/dummy/default-logo.png";
        }
		if(F.isimgh == 1) {
            AH = "../panel/images/banner/" + Main.NullToEmpty(F.id) + "/admin.jpg?c=" + new Date().getTime();
        }else{
               AH = "images/dummy/default_banner.png";
        }
       
       
        
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_INPUT_SINGLE_LOGO'] ?> <br><small style="font-weight:400"><?= $lang_resource['BUSINESS_TAB_RESTURANT_LOGO1'] ?></small></label>'
		N +='<br><br>'
        N += '<span class="clearfix logoupload" ><img id="uploadPreview1" src="' + A + '"  ></span>'
        N += '<div class="input-group">'
        N += '<input type="text" class="form-control rounded" id="imagefile1" readonly>'
        N += '<span class="input-group-btn">'
        N += '<span class="btn btn-default btn-file btn-light rounded">'
		N += '<form id="uform_bimg1" name="uform_bimg1" enctype="multipart/form-data" method="post" >';
        N += '<?= $lang_resource['BUSINESS_TAB_RESTURANT_UPLOAD'] ?><input id="uploadImage1" type="file" name="uploadImage1" onChange="BResturantInfo.PreviewImage(1);" >'
	    N += '<input id="showImage1" name="showImage1" type="hidden" value=""  />';
		N += '<input type="submit" name="submit" onclick="BResturantInfo.triggerImageupload(1)" style="display:none" />';
		N += '</form>';
        N += '</span>'
        N += '</span>'
        N += '</div>'
        <!-- input-group -->
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
       
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_INPUT_SINGLE_HEADER'] ?> <br><small style="font-weight:400"><?= $lang_resource['BUSINESS_TAB_RESTURANT_LOGO'] ?></small></label>'
		N +='<br><br>'
        N += '<span class="clearfix headerupload header-image" ><img id="uploadPreview2" src="'+AH+'" ></span>'
        N += '<div class="input-group">'
        N += '<input type="text" class="form-control rounded" id="imagefile2" readonly>'
        N += '<span class="input-group-btn">'
        N += '<span class="btn btn-default btn-file btn-light rounded">'
		N += '<form id="uform_bimg2" name="uform_bimg2" enctype="multipart/form-data" method="post" >';
        N += '<?= $lang_resource['BUSINESS_TAB_RESTURANT_UPLOAD'] ?><input type="file" id="uploadImage2" name="uploadImage2" onChange="BResturantInfo.PreviewImage(2);"  >'
	    N += '<input id="showImage2" name="showImage2" type="hidden" value=""  />';
		N += '<input type="submit" name="submit" onclick="BResturantInfo.triggerImageupload(2)" style="display:none" />';
		N += '</form>';
	    N += '</span>'
        N += '</span>'
        N += '</div>'
        <!-- .input-group -->
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        
        N += '</div>'
        <!--row-->
        N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_INFO'] ?></strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_NAME'] ?></label>'
		
		Forms.CreateValue("business", "name", "",true)
		flaginfoBD=Main.languageinfo;
        for(s in flaginfoBD){
            if (Forms.Form.business.type == "create") {
                if(flaginfoBD[s].id == BResturantInfo.langdefault){   
                    N +='<input type="text" id="name_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation()"  onkeydown="return BResturantInfo.PreValidationOption2(event,this.id)" class="form-control rounded"  value="" />' 
                }else{
                    N +='<input type="text" id="name_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation()"  onkeypress="return BResturantInfo.PreValidationOption1(event)" class="form-control rounded"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfoBD[s].id == BResturantInfo.langdefault){   
                    N +='<input type="text" id="name_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation()"  onkeydown="return BResturantInfo.PreValidationOption2(event,this.id)"  class="form-control rounded"  value="'+Main.NullToEmpty(F.name[flaginfoBD[s].id])+'" />' 
                }else{
                    N +='<input type="text" id="name_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation()"  onkeypress="return BResturantInfo.PreValidationOption1(event)" class="form-control rounded"  value="'+Main.NullToEmpty(F.name[flaginfoBD[s].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
        //N += Forms.CreateInputPropertyAdmin("business", "name", F.name, true,"BResturantInfo.PreValidation()") 
		
		N +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_NAME_OF_RESTAURANT']?></small>'
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_PHONE'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "tel", F.tel, true,"BResturantInfo.PreValidation()", false, false, "return Main.IsNumberKey(event)") 
		N +='<small data-bv-validator="notEmpty" class="help-block" id="tel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PHONENUMBER']?></small>'
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
        
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_MOBILE'] ?></label>'
		N += Forms.CreateInputPropertyAdmin("business", "cel", F.cel, true,"BResturantInfo.PreValidation()", false, false, "return Main.IsNumberKey(event)") 
		N +='<small data-bv-validator="notEmpty" class="help-block" id="cel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_MOBILENUMBER']?></small>'
		N +='<small data-bv-validator="notEmpty" class="help-block" id="cel_text_10digit" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_TEN_DIGIT_MOBILENUMBER']?></small>'
       // N += Forms.CreateInputPropertyAdmin("business", "cel", F.cel,false,"", false, false, "return Main.IsNumberKey(event)") 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_EMAIL'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "email", F.email, true,"BResturantInfo.PreValidation()","","","","setTimeout(function(){BResturantInfo.PreValidation();}, 30);") 
		N +='<small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL'] ?></small>'
		N +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID']?></small>'
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
		
		N += '<div class="row">'
		if(IS_EMERGENCY_NO=='1'){
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_EMERGENCY_NO'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "emer_no", F.emer_no,false,"", false, false, "return Main.IsNumberKey(event)") 
        N += '</div>'
        N += '</div>'
		}
		if(IS_EMERGENCY_EMAIL=='1'){
		
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_EMERGENCY_EMAIL'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "emer_email", F.emer_email,false,"", false, false, "") 
        N += '</div>'
        N += '</div>'
		
		}
		N += '</div>'
		
		
        <!--row-->
  
        var FF = false;
        if (F.tab_food == "t") {
            FF = true
        }
        var FA = false;
        if (F.tab_alcohol == "t") {
            FA = true
        }
        var FG = false;
        if (F.tab_groceries == "t") {
            FG = true
        } 
        var FL = false;
        if (F.tab_laundry == "t") {
            FL = true
        }
        if(Main.tabsettings.tab_food_active == "t" || Main.tabsettings.tab_alcohol_active == "t" || Main.tabsettings.tab_groceries_active == "t" || Main.tabsettings.tab_laundry_active == "t"){

            N +='<h4 class="form-h4"><strong><?=$lang_resource['BUSINESS_TYPE_HEADING']?></strong></h4>'
            N +='<small data-bv-validator="notEmpty" class="help-block" id="businesstype_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_BUSINESSTYPE_REQUIRED']?></small>' 

            N +='<div class="row">'
            if(Main.tabsettings.tab_food_active == "t"){
                N +='<div class="col-md-3">'
                N +='<div class="">'
                N +=Forms.CreateCheckBoxPropertyAdmin("business", "tab_food", FF,"","","BResturantInfo.PreValidation()")
                N +='<label for="tab_food">&nbsp;</label><?=$lang_resource['BUSINESS_TYPE_FOOD']?></div>'
                N +='</div>'<!--col-md-3-->
            }
            
            if(Main.tabsettings.tab_alcohol_active == "t"){
                N +='<div class="col-md-3">'
                N +='<div class="">'
                N +=Forms.CreateCheckBoxPropertyAdmin("business", "tab_alcohol", FA,"","","BResturantInfo.PreValidation()")
                N +='<label for="tab_alcohol">&nbsp;</label><?=$lang_resource['BUSINESS_TYPE_ALCOHOL']?></div>'
                N +='</div>'<!--col-md-3-->
            }
            if(Main.tabsettings.tab_groceries_active == "t"){
                N +='<div class="col-md-3">'
                N +='<div class="">'
                N +=Forms.CreateCheckBoxPropertyAdmin("business", "tab_groceries", FG,"","","BResturantInfo.PreValidation()")
                N +='<label for="tab_groceries">&nbsp;</label><?=$lang_resource['BUSINESS_TYPE_GROCERIES']?></div>'
                N +='</div>'<!--col-md-3-->
            }

            if(Main.tabsettings.tab_laundry_active == "t"){
                N +='<div class="col-md-3">'
                N +='<div class="">'
                N +=Forms.CreateCheckBoxPropertyAdmin("business", "tab_laundry", FL,"","","BResturantInfo.PreValidation()")
                N +='<label for="tab_laundry">&nbsp;</label><?=$lang_resource['BUSINESS_TYPE_LAUNDRY']?></div>'
                N +='</div>'<!--col-md-3-->
            }

            N +='</div>'
        }







        
        N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS_INFO'] ?></strong></h4>'


        
        
        N += '<div class="row">'
        var K = new Array();
        K.push({
            id: "-1",
            caption: ""
        });
		 
        for (E in Main.Countries) {
            K.push({
                id: Main.Countries[E].id,
                caption: Main.Countries[E].name
            })
        }
		K.sort(Main.SortByProperty("caption"));
        if (Main.User.level < 2) {
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_COUNTRY'] ?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "country", K, Main.NullToEmpty(F.country), true, "Business.CountrySelected(this);BResturantInfo.PreValidation();GoogleMap.UpdateUserPosition(this);")
        N +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_COUNTRY_REQUIRED']?></small>' 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        var G = "";
            if (F.city) {
                G = F.city.id
            }
            
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_CITY'] ?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "city", [], G, true,"Business.CitySelected(this);BResturantInfo.PreValidation();GoogleMap.UpdateUserPosition(this);")
        N +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_CITY_REQUIRED']?></small>' 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        } else {
            Forms.CreateValue("business", "country", Main.User.country, false, true, true);
            Forms.CreateValue("business", "city", Main.User.city, false, true, true)
        }
        N += '</div>'
        <!--row-->


                N += '<div class="row">'
				
				var G1 = "";
				if (F.colony) {
                G1 = F.colony
            }
			
				 N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS2'] ?></label>'
       /* N += Forms.CreateInputPropertyAdmin("business", "colony", F.colony, false,"BResturantInfo.PreValidation();BResturantInfo.MapBusiness();") */
        if(Main.neighsettings == 't'){
	    N += Forms.CreateSelectPropertyAdmin("business", "colony", [], G1, true,"BResturantInfo.PreValidation();BResturantInfo.MapBusiness();")
        }else{
			
		Forms.CreateValue("business", "colony", "",true)
		flaginfoBD=Main.languageinfo;
        for(s in flaginfoBD){
            if (Forms.Form.business.type == "create") {
                if(flaginfoBD[s].id == BResturantInfo.langdefault){   
                    N +='<input type="text" id="colony_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness();" class="form-control rounded"  value="" />' 
                }else{
                    N +='<input type="text" id="colony_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness();" class="form-control rounded"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfoBD[s].id == BResturantInfo.langdefault){   
                    N +='<input type="text" id="colony_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness();" class="form-control rounded"  value="'+Main.NullToEmpty(F.colony[flaginfoBD[s].id])+'" />' 
                }else{
                    N +='<input type="text" id="colony_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness();" class="form-control rounded"  value="'+Main.NullToEmpty(F.colony[flaginfoBD[s].id])+'" style="display:none;" />' 
                }  
            }     
        }	
			
       // N += Forms.CreateInputPropertyAdmin("business", "colony", F.colony, false,"BResturantInfo.PreValidation();BResturantInfo.MapBusiness();")   
		
        }
        N += '</div>'
        N += '</div>'
				
		
        <!--col-md-6-->
        		
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS'] ?></label>'
		
		Forms.CreateValue("business", "street", "",true)
		flaginfoBD=Main.languageinfo;
        for(s in flaginfoBD){
            if (Forms.Form.business.type == "create") {
                if(flaginfoBD[s].id == BResturantInfo.langdefault){   
                    N +='<input type="text" id="street_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness()" class="form-control rounded"  value="" />' 
                }else{
                    N +='<input type="text" id="street_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness()" class="form-control rounded"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfoBD[s].id == BResturantInfo.langdefault){   
                    N +='<input type="text" id="street_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness()" class="form-control rounded"  value="'+Main.NullToEmpty(F.street[flaginfoBD[s].id])+'" />' 
                }else{
                    N +='<input type="text" id="street_'+flaginfoBD[s].id+'" onkeyup="BResturantInfo.PreValidation();BResturantInfo.MapBusiness()" class="form-control rounded"  value="'+Main.NullToEmpty(F.street[flaginfoBD[s].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
        //N += Forms.CreateInputPropertyAdmin("business", "street", F.street, true,"BResturantInfo.PreValidation();BResturantInfo.MapBusiness();")
        N +='<small data-bv-validator="notEmpty" class="help-block" id="street_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_BASIC_ADDRESS']?></small>' 
        N += '</div>'
        N += '</div>'
       
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
		
	if (Main.User.level < 2) {
		var i = new Array();
		i.push(JSON.parse('{"id":"' + Main.User.id + '","caption":""}'));
		for (var E in Business.Providers) {
			var y = new Object();
			y.id = Business.Providers[E].id;
			y.caption = Business.Providers[E].name + " " + Business.Providers[E].lastname;
			i.push(y)
		}
		var D = Main.User.id;
		if (F.provider) {
			D = F.provider.id
		}
			
        N += '<div class="row">'
        N += '<div class="col-md-12 businessmapbox" id="mapbusiness">'
         N += '</div>'
        <!--col-md-12-->
        N += '</div>'
        <!--row-->


		N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_OWNER'] ?> </strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-12">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_OWNER_DETAILS'] ?></label>'
		//alert(JSON.stringify(F))
        N += Forms.CreateSelectPropertyAdmin("business", "provider", i, D, false, "", true) 
        N += '</div>'
        N += '</div>'
        <!--col-md-12-->
        
        N += '</div>'
        <!--row-->
    	} else {
    		Forms.CreateValue("business", "provider", Main.User.id, false, true, true)
    	}


        N += '<h4 class="form-h4"><strong><?=$lang_resource['BUSINESS_SPECIAL_SETTINGS']?></strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['BUSINESS_URL_REDIRECT']?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "burl", F.burl,false, true, true)       
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->

        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['BUSINESS_CUSTOM_BUSINESS_FOOTER']?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "businesspagecustomtext", F.businesspagecustomtext,false, true, true)       
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        N += '</div>'
        <!--row-->

        N += '<h4 class="form-h4"><strong><?=$lang_resource['BUSINESS_SETTINGS']?></strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['BUSINESS_MINIMUM_PURCHASE']?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "minimum", F.minimum,false,"", false, false, "return Main.IsNumberKey(event)")
        //N += Forms.CreateInputPropertyAdmin("business", "minimum", F.minimum,false, true, true)       
        N += '</div>'
        N += '</div>'
        <!--col-md-12-->  
		
		N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['BUSINESS_SERVICE_FEE']?>*</label>'
        N += Forms.CreateInputPropertyAdmin("business", "servicefee", F.servicefee,true, "BResturantInfo.PreValidation()",false, false,"return Main.IsNumberKey(event)") 
        N +='<small data-bv-validator="notEmpty" class="help-block" id="servicefee_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_SERVICE_FEE']?></small>'       
        N += '</div>'
        N += '</div>'
		
		     
        N += '</div>'
        <!--row-->
       N += '<div class="row">'
        N += '<div class="col-md-4">'
        N += '<div class="pull-left">'        
        var RO = false;
        if (F.reorder == "t") {
            RO = true
        } 
        N += Forms.CreateCheckBoxPropertyAdmin("business", "reorder", RO)  
        N += '<label for="reorder">&nbsp;</label><?=$lang_resource['BUSINESS_ALLOWS_REORDER']?>'     
        N += '</div>'
        N += '</div>'
        <!--col-md-12-->  
        N += '<div class="col-md-4">'
        N += '<div class="pull-left">'
     
        var FO = false;
        if (F.feature == "t") {
            FO = true
        } 
        N += Forms.CreateCheckBoxPropertyAdmin("business", "feature", FO)   
        N += '<label for="feature">&nbsp;</label><?=$lang_resource['FEATURED_BUSINESS']?>'    
        N += '</div>'
        N += '</div>'

        //alert(F.popularsettings);
        if (F.popularsettings == "1") {        
            if (Main.User.level == 0) {        
                N += '<div class="col-md-4">'
                N += '<div class="pull-left">'        
                var PO = false;
                if (F.is_popular == "t") {
                    PO = true
                } 
                N += Forms.CreateCheckBoxPropertyAdmin("business", "is_popular", PO)  
                N += '<label for="is_popular">&nbsp;</label><?=$lang_resource['BUSINESS_POPULAR']?>'     
                N += '</div>'
                N += '</div>'
            }
        }
        
        
        <!--col-md-12-->
        
               
        N += '</div>'
        <!--row-->

        if(IS_SCRIPTID == 6){
        N += '<div class="row">'
        N += '<div class="col-md-4">'
        N += '<div class="pull-left">'
     
        var ES = false;
        if (F.express_service == "t") {
            ES = true
        } 
        N += Forms.CreateCheckBoxPropertyAdmin("business", "express_service", ES)   
        N += '<label for="express_service">&nbsp;</label><?=$lang_resource['ADMIN_PAGE_EXPRESS_SERVICEAVAIABLE_HIDE_SETTINGS']?>'    
        N += '</div>'
        N += '</div>'
        N += '</div>'
        <!--row-->
        }

		

		///////////////////////////city info /////////////////////////////////////
        var d = new Array({
            id: "",
            caption: "<?=$lang_resource['PLEASE_SELECT_TIMEZONE']?>"
            
        });
		 var a = new Array({
                id: "Kwajalein",
                caption: "International Date Line West (GMT-12:00)"
            },{
                id: "America/Anchorage",
                caption: "Alaska (GMT-9)"
            },{
                id: "Pacific/Honolulu",
                caption: "Hawaii (GMT-10:00)"
            }, {
                id: "America/Los_Angeles",
                caption: "Pacific Time (US &amp; Canada) (GMT-08:00)"
            }, {
                id: "America/Tijuana",
                caption: "Tijuana, Baja California (GMT-08:00)"
            }, {
                id: "America/Denver",
                caption: "Mountain Time (US &amp; Canada) (GMT-07:00)"
            }, {
                id: "America/Chihuahua",
                caption: "Chihuahua (GMT-07:00)"
            }, {
                id:"Europe/Netherlands",
                caption:"Netherlands (GMT+01:00)"
            }, {
                id: "America/Mazatlan",
                caption: "Mazatlan (GMT-07:00)"
            }, {
                id: "America/Phoenix",
                caption: "Arizona (GMT-07:00)"
            }, {
                id: "Europe/London",
                caption: "London"
            }, {
                id: "America/Tegucigalpa",
                caption: "Central America (GMT-06:00)"
            }, {
                id: "America/Chicago",
                caption: "Central Time (US &amp; Canada) (GMT-06:00)"
            }, {
                id: "America/Mexico_City",
                caption: "Mexico City (GMT-06:00)"
            }, {
                id: "America/Monterrey",
                caption: "Monterrey (GMT-06:00)"
            }, {
                id: "America/New_York",
                caption: "Eastern Time (US &amp; Canada) (GMT-05:00)"
            }, {
                id: "America/Bogota",
                caption: "Bogota (GMT-05:00)"
            }, {
                id: "America/Lima",
                caption: "Lima (GMT-05:00)"
            }, {
                id: "America/Rio_Branco",
                caption: "Rio Branco (GMT-05:00)"
            }, {
                id: "America/Indiana/Indianapolis",
                caption: "Indiana (East) (GMT-05:00)"
            }, {
                id: "America/Caracas",
                caption: "Caracas (GMT-04:30)"
            }, {
                id: "America/Halifax",
                caption: "Atlantic Time (Canada) (GMT-04:00)"
            }, {
                id: "America/Manaus",
                caption: "Manaus (GMT-04:00)"
            }, {
                id: "America/Santiago",
                caption: "Santiago (GMT-04:00)"
            }, {
                id: "America/La_Paz",
                caption: "La Paz (GMT-04:00)"
            }, {
                id: "America/St_Johns",
                caption: "Newfoundland (GMT-03:30)"
            }, {
                id: "America/Argentina/Buenos_Aires",
                caption: "Buenos Aires (GMT-03:00)"
            }, {
                id: "America/Sao_Paulo",
                caption: "Brasilia (GMT-03:00)"
            }, {
                id: "America/Godthab",
                caption: "Greenland (GMT-03:00)"
            }, {
                id: "America/Montevideo",
                caption: "Montevideo (GMT-03:00)"
            }, {
                id: "Europe/Madrid",
                caption: "Madrid (GMT+01:00)"
            }, {
                id: "Europe/Paris",
                caption: "Paris (GMT+01:00)"
            }, 
            {
                id: "Africa/Algiers",
                caption: "WAT (GMT +01:00)"
            }, 

             {
                id: "Asia/Kolkata",
                caption: "India (GMT+05:30)"
            },  {
                id: "Pacific/Fiji",
                caption: "Fiji (GMT+12:00)"
            }, {
                id: "Etc/GMT11",
                caption: "GMT -11 (GMT-11:00)"
            }, {
                id: "Etc/GMT-9",
                caption: "GMT -9 (GMT-09:00)"
            }, {
                id: "Etc/GMT-2",
                caption: "GMT -2 (GMT-02:00)"
            }, {
                id: "Etc/GMT-1",
                caption: "GMT -1 (GMT-01:00)"
            }, {
                id: "Africa/Windhoek",
                caption: "GMT +2 (GMT+02:00)"
            }, {
                id: "Asia/Riyadh",
                caption: "GMT +3 (GMT+03:00)"
            }, {
                id: "Asia/Yerevan",
                caption: "GMT +4 (GMT+04:00)"
            }, {
                id: "Asia/Karachi",
                caption: "GMT +5 (GMT+05:00)"
            }, {
                id: "Asia/Dhaka",
                caption: "GMT +6 (GMT+06:00)"
            }, {
                id: "Asia/Jakarta",
                caption: "GMT +7 (GMT+07:00)"
            }, {
                id: "Asia/Singapore",
                caption: "GMT +8 (GMT+08:00)"
            }, {
                id: "Asia/Seoul",
                caption: "GMT +9 (GMT+09:00)"
            }, {
                id: "Australia/Melbourne",
                caption: "GMT +10 (GMT+10:00)"
            }, {
                id: "Asia/Magadan",
                caption: "GMT +11 (GMT+11:00)"
            });
             
            a.sort(Main.SortByProperty("caption"));
            if (Forms.Form.business.type == "create") {
                /*a.unshift({
                    id: "",
                    caption: ""
                })*/
            }
            var newArray = d.concat(a);
            a = newArray;
		N += '<h4 class="form-h4"><strong><?=$lang_resource['CITY_INFO']?></strong></h4>'
       
	   
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['ADMIN_SITESETTING_TIME_ZONE']?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "timezone", a, Main.NullToEmpty(F.timezone), true, "BResturantInfo.PreValidation();BResturantInfo.MapBusiness();BResturantInfo.TimeZoneSelected(this);")    
		N +='<small data-bv-validator="notEmpty" class="help-block" id="timezone_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_TIMEZONE_REQUIRED']?></small>'  
		N +='<small id="timespan"></small>'
        N += '</div>'
        N += '</div>'
      	
 
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_TAX_PERCENTAGE']?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "tax", F.tax,false,"BResturantInfo.PreValidation()")   
		N +='<small data-bv-validator="notEmpty" class="help-block" id="tax_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_COUNTRY_REQUIRED_PERCENTAGE']?></small>'        
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        N += '</div>'
	   
	 //  var b = [{id:'',caption:'Please select'},{id:'USD',caption:'U.S. Dollar ($)'},{id:'EUR',caption:'Euro (€)'},{id:'MXN',caption:'Mexican Peso ($)'},{id:'AUD',caption:'Australian Dollar ($)'},{id:'BRL',caption:'Brazilian Real (R$)'},{id:'CAD',caption:'Canadian Dollar ($)'},{id:'CZK',caption:'Czech Koruna (Kč)'},{id:'DKK',caption:'Danish Krone (kr)'},{id:'HKD',caption:'Hong Kong Dollar ($)'},{id:'HUF',caption:'Hungarian Forint (Ft)'},{id:'ILS',caption:'Israeli New Sheqel (₪)'},{id:'JPY',caption:'Japanese Yen (¥)'},{id:'MYR',caption:'Malaysian Ringgit (RM)'},{id:'NOK',caption:'Norwegian Krone (kr)'},{id:'NZD',caption:'New Zealand Dollar ($)'},{id:'PHP',caption:'Philippine Peso (₱)'},{id:'PLN',caption:'Polish Zloty (zł)'},{id:'GBP',caption:'Pound Sterling (£)'},{id:'SGD',caption:'Singapore Dollar ($)'},{id:'SEK',caption:'Swedish Krona (kr)'},{id:'CHF',caption:'Swiss Franc (CHF)'},{id:'TWD',caption:'Taiwan New Dollar (NT$)'},{id:'THB',caption:'Thai Baht (฿)'},{id:'TRY',caption:'Turkish Lira (₤)'}];
	 
	 var b = [{id:'',caption:'Please select'},

{id:'ALL',caption:'Albania Lek (Lek)'},
{id:'AFN',caption:'Afghanistan Afghani (؋)'},
{id:'ARS',caption:'Argentina Peso ($)'},
{id:'AWG',caption:'Aruba Guilder (ƒ)'},
{id:'AUD',caption:'Australia Dollar ($)'},
{id:'AZN',caption:'Azerbaijan New Manat (ман)'},
{id:'BSD',caption:'Bahamas Dollar ($)'},
{id:'BBD',caption:'Barbados Dollar ($)'},
{id:'BYR',caption:'Belarus Ruble (p.)'},
{id:'BZD',caption:'Belize Dollar (BZ$)'},
{id:'BMD',caption:'Bermuda Dollar ($)'},
{id:'BOB',caption:'Bolivia Boliviano ($b)'},
{id:'BAM',caption:'Bosnia and Herzegovina Convertible Marka (KM)'},
{id:'BWP',caption:'Botswana Pula (P)'},
{id:'BGN',caption:'Bulgaria Lev (лв)'},
{id:'BRL',caption:'Brazil Real (R$)'},
{id:'BND',caption:'Brunei Darussalam Dollar ($)'},
{id:'KHR',caption:'Cambodia Riel (៛)'},
{id:'CAD',caption:'Canada Dollar ($)'},
{id:'KYD',caption:'Cayman Islands Dollar ($)'},
{id:'CLP',caption:'Chile Peso ($)'},
{id:'CNY',caption:'China Yuan Renminbi (¥)'},
{id:'COP',caption:'Colombia Peso ($)'},
{id:'CRC',caption:'Costa Rica Colon (₡)'},
{id:'HRK',caption:'Croatia Kuna (kn)'},
{id:'CUP',caption:'Cuba Peso (₱)'},
{id:'CZK',caption:'Czech Republic Koruna (Kč)'},
{id:'DKK',caption:'Denmark Krone (kr)'},
{id:'DOP',caption:'Dominican Republic Peso (RD$)'},
{id:'XCD',caption:'East Caribbean Dollar ($)'},
{id:'EGP',caption:'Egypt Pound (Egp)'},
{id:'SVC',caption:'El Salvador Colon ($)'},
{id:'EEK',caption:'Estonia Kroon (kr)'},
{id:'EUR',caption:'Euro Member Countries (€)'},
{id:'FKP',caption:'Falkland Islands (Malvinas) Pound (£)'},
{id:'FJD',caption:'Fiji Dollar ($)'},
{id:'FCFA',caption:'Franc (CFA)'},
{id:'GHC',caption:'Ghana Cedi (¢)'},
{id:'GIP',caption:'Gibraltar Pound (£)'},
{id:'GTQ',caption:'Guatemala Quetzal (Q)'},
{id:'GGP',caption:'Guernsey Pound (£)'},
{id:'GYD',caption:'Guyana Dollar ($)'},
{id:'HNL',caption:'Honduras Lempira (L)'},
{id:'HKD',caption:'Hong Kong Dollar ($)'},
{id:'HUF',caption:'Hungary Forint (Ft)'},
{id:'ISK',caption:'Iceland Krona (kr)'},
{id:'INR',caption:'India Rupee (रु)'},
{id:'IDR',caption:'Indonesia Rupiah (Rp)'},
{id:'IQD',caption:'Iraqi Dinar (د.ع)'},
{id:'IRR',caption:'Iran Rial (﷼)'},
{id:'IMP',caption:'Isle of Man Pound (£)'},
{id:'ILS',caption:'Israel Shekel (₪)'},
{id:'JMD',caption:'Jamaica Dollar (J$)'},
{id:'JPY',caption:'Japan Yen (¥)'},
{id:'JEP',caption:'Jersey Pound (£)'},

{id:'JOD',caption:'Jordanian Dinar (JOD)'},

{id:'KZT',caption:'Kazakhstan Tenge (лв)'},
{id:'KPW',caption:'Korea (North) Won (₩)'},
{id:'KRW',caption:'Korea (South) Won (₩)'},
{id:'KGS',caption:'Kyrgyzstan Som (лв)'},
{id:'LAK',caption:'Laos Kip (₭)'},
{id:'LVL',caption:'Latvia Lat (Ls)'},
{id:'LBP',caption:'Lebanon Pound (£)'},
{id:'LRD',caption:'Liberia Dollar ($)'},
{id:'LYD',caption:'Libyan Dinar (LYD)'},
{id:'LTL',caption:'Lithuania Litas (Lt)'},
{id:'MKD',caption:'Macedonia Denar (ден)'},
{id:'MLD',caption:'Moldovan Leu(MLD)'},
{id:'MYR',caption:'Malaysia Ringgit (RM)'},
{id:'MUR',caption:'Mauritius Rupee (₨)'},
{id:'MXN',caption:'Mexico Peso ($)'},
{id:'MNT',caption:'Mongolia Tughrik (₮)'},
{id:'MZN',caption:'Mozambique Metical(MT)'},
{id:'NAD',caption:'Namibia Dollar ($)'},
{id:'NPR',caption:'Nepal Rupee (₨)'},
{id:'ANG',caption:'Netherlands Antilles Guilder (ƒ)'},
{id:'NZD',caption:'New Zealand Dollar ($)'},
{id:'NIO',caption:'Nicaragua Cordoba (C$)'},
{id:'NGN',caption:'Nigeria Naira (₦)'},
{id:'NOK',caption:'Norway Krone (kr)'},
{id:'OMR',caption:'Oman Rial (﷼)'},
{id:'PKR',caption:'Pakistan Rupee (₨)'},
{id:'PAB',caption:'Panama Balboa (B/.)'},
{id:'PYG',caption:'Paraguay Guarani (Gs)'},
{id:'PEN',caption:'Peru Nuevo Sol (S/.)'},
{id:'PHP',caption:'Philippines Peso (₱)'},
{id:'PLN',caption:'Polish Zloty (zł)'},
{id:'QAR',caption:'Qatar Riyal (﷼)'},
{id:'RON',caption:'Romania New Leu (lei)'},
{id:'RUB',caption:'Russia Ruble (руб)'},
{id:'SHP',caption:'Saint Helena Pound (£)'},
{id:'SAR',caption:'Saudi Arabia Riyal (﷼)'},
{id:'RSD',caption:'Serbia Dinar (Дин.)'},
{id:'SCR',caption:'Seychelles Rupee (₨)'},
{id:'SGD',caption:'Singapore Dollar ($)'},
{id:'SBD',caption:'Solomon Islands Dollar ($)'},
{id:'SOS',caption:'Somalia Shilling(S)'},
{id:'ZAR',caption:'South African Currency(R)'},
{id:'LKR',caption:'Sri Lanka Rupee (₨)'},
{id:'SEK',caption:'Sweden Krona (kr)'},
{id:'CHF',caption:'Switzerland Franc (CHF)'},
{id:'SRD',caption:'Suriname Dollar ($)'},
{id:'SYP',caption:'Syria Pound (£)'},
{id:'TWD',caption:'Taiwan New Dollar (NT$)'},
{id:'THB',caption:'Thailand Baht (฿)'},
{id:'TTD',caption:'Trinidad and Tobago Dollar (TT$)'},
{id:'TRY',caption:'Turkey Lira (₤)'},
{id:'TVD',caption:'Tuvalu Dollar ($)'},
{id:'UAH',caption:'Ukraine Hryvnia (₴)'},
{id:'AED',caption:'United Arab Emirates (AED)'},
{id:'GBP',caption:'United Kingdom Pound (£)'},
{id:'USD',caption:'United States Dollar ($)'},
{id:'UYU',caption:'Uruguay Peso ($U)'},
{id:'UZS',caption:'Uzbekistan Som (cym)'},
{id:'VEF',caption:'Venezuela Bolivar (Bs)'},
{id:'VND',caption:'Viet Nam Dong (₫)'},
{id:'YER',caption:'Yemen Rial (﷼)'},
{id:'ZWD',caption:'Zimbabwe Dollar (Z$)'}];

	    N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['CITY_SUPER_CREATE_BUSINESS_CURRENCY']?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "currency", b, Main.NullToEmpty(F.currency), true,"BResturantInfo.PreValidation()")   
		N +='<small data-bv-validator="notEmpty" class="help-block" id="currency_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_COUNTRY_REQUIRED_BUSINESS_CURRENCY']?></small>'      
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
		
		 var tatyp = [{id:'',caption:'<?=$lang_resource['CITY_SUPER_SELECT']?>'},{id:'1',caption:'<?=$lang_resource['CITY_SUPER_TAX_NOT_INCLUDED']?>'},{id:'2',caption:'<?=$lang_resource['CITY_SUPER_TAX_INCLUDED']?>'}];
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_TAX_TYPE']?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "taxtype", tatyp, Main.NullToEmpty(F.taxtype), true,"BResturantInfo.PreValidation()")
		N +='<small data-bv-validator="notEmpty" class="help-block" id="taxtype_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_RESTURANT_INFO_COUNTRY_REQUIRED_TAXTYPE']?></small>'       
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        N += '</div>'
	   
		//////////////////////////////delivery and picup time///////////////
		N += '<h4 class="form-h4"><strong><?=$lang_resource['CITY_SUPER_CREATE_BUSINESS_DELEVERY_PICKUP_TIME']?></strong></h4>'
       
	   	Forms.CreateValue("business", "deliverytime", "",false)
		Forms.CreateValue("business", "pickuptime", "",false)
		
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['CITY_SUPER_CREATE_BUSINESS_DELEVERY']?></label>'
    	N +='<div class="input-group input-append bootstrap-timepicker" id="deliverytime_1">'
		N +='<input type="text" id="delivery_time" class="form-control timepicker" value='+Main.NullToEmpty(F.deliverytime)+'>'
		N +='<span class="input-group-addon add-on" id="delivery-time"><i class="fa icon-clock"></i></span>'
		N +='</div>'
        N += '</div>'
        N += '</div>'
      
 
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?=$lang_resource['CITY_SUPER_CREATE_BUSINESS_PICKUP']?></label>'
    	N +='<div class="input-group input-append bootstrap-timepicker" id="pickuptime_1">'
		N +='<input type="text" id="pickup_time" class="form-control timepicker1" value='+Main.NullToEmpty(F.pickuptime)+'>'
		N +='<span class="input-group-addon add-on" id="pickup-time"><i class="fa icon-clock"></i></span>'
		N +='</div>'
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        N += '</div>'

		
		/*var EC = false;
        if (F.expresscheck == "t") {
            EC = true
        } 
		
		N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_EXPRESS_CHECKOUT'] ?> </strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="pull-left">'		
        N += Forms.CreateCheckBoxPropertyAdmin("business", "expresscheck", EC,false,false,"BResturantInfo.CheckExpress()")  
		N += '<label for="expresscheck">&nbsp;</label><?=$lang_resource['BUSINESS_EXPRESS_CHECKOUT']?>'
        N += '</div>'
		N += '</div>'
		
		if (F.expresscheck == "t") {
		N += '<div class="col-md-6" id="expressprice" style="display:block;">'
        N += '<div class="pull-left">'	
		N += '<label for="expresscheckprice">&nbsp;</label><?=$lang_resource['BUSINESS_EXPRESS_CHECKOUT_PRICE']?>'	
        N += Forms.CreateInputPropertyAdmin("business", "expresscheckprice", F.expresscheckprice, true,"BResturantInfo.PreValidation()", false, false, "return Main.IsNumberKey(event)")  
		N +='<small data-bv-validator="notEmpty" class="help-block" id="expresscheckprice_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_BUSINESS_EXPRESS_CHECKOUT_PRICE']?></small>'
		     
		
        N += '</div>'
        N += '</div>'
		}else{
		N += '<div class="col-md-6" id="expressprice" style="display:none;">'
        N += '<div class="pull-left">'	
		N += '<label for="expresscheckprice">&nbsp;</label><?=$lang_resource['BUSINESS_EXPRESS_CHECKOUT_PRICE']?>'	
        N += Forms.CreateInputPropertyAdmin("business", "expresscheckprice", F.expresscheckprice, true,"BResturantInfo.PreValidation()", false, false, "return Main.IsNumberKey(event)")  
		N +='<small data-bv-validator="notEmpty" class="help-block" id="expresscheckprice_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_BUSINESS_EXPRESS_CHECKOUT_PRICE']?></small>'
		     
		
        N += '</div>'
        N += '</div>'	
		}
        <!--col-md-12-->
        
        N += '</div>'
        <!--row-->*/
	  
	      
     
		///////////////////////// end city info/////////////////////////////////
		
		N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_INDIVIDUAL_URL'] ?> </strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-12">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_CUSTOM_SLUG'] ?></label>'
        N += Forms.CreateInputPropertyAdminCustomSlug("business", "customslug", F.customslug, true,"BResturantInfo.SlugPrevalidation()")
		N +='<small data-bv-validator="notEmpty" class="help-block" id="customslug_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_CUSTOM_SLUG']?></small>' 
		N +='<small data-bv-validator="notEmpty" class="help-block" id="customslug_text1" style="color:#F00;display:none;"><?=$lang_resource['BUSINESS_TAB_RESTURANT_DUPLICATE_CUSTOM_SLUG']?></small>'
        N += '</div>'
        N += '</div>'
        <!--col-md-12-->
        
        N += '</div>'
        <!--row-->
		
		
		
        
        	
        N += '<div class="row">'
        N += '<div class="col-md-3" style="margin-bottom:10px;">'
        N += '<button type="button" class=" btn btn-danger" style="width:100%;" onclick="Business.PrintMain()"><?= $lang_resource['BUSINESS_CANCEL'] ?></button>'
        N += '</div>'
        <!--col-md-4-->
        N += '<div class="col-md-3">'
        N += '<button type="button" class=" btn btn-success" style="width:100%;" onclick="BResturantInfo.save()"><?= $lang_resource['BUSINESS_TAB_RESTURANT_SAVE_CONTINUE'] ?></button>'
        N += '</div>'
        <!--col-md-4-->
        N += '</div>'
        <!--row-->
        N += '</div>'
        <!--the-box-->
        N += '</div>'
        <!--col-md-12-->
        N += '</div>'
        <!--row-->
         <!-------------------------------------------------------resturant info ------------------------------------------------> 
		
		return N;
       
	},
	
	CheckExpress: function(){
		
		
		if(document.getElementById("expresscheck").checked == true){
		document.getElementById("expressprice").style.display='block';
		}else{
		document.getElementById("expressprice").style.display='none';
		}
		
		
	},
	
	
	TimeZoneSelected: function (b) {        
      
        Main.Loading();     
        $.post("lib/front-main.php", "f=FetchTimeByZoneSiteSettings&format=24&zone=" + b.options[b.selectedIndex].value, function (c) {
            Main.Ready();
            document.getElementById("timespan").innerHTML = "<?=$lang_resource['CITY_SUPER_TIMESTAMP_NOW']?> " + Main.ConvertTimeFormat(c);
        });        
    },
	show_id: function(id){

		if(Main.User.level !=2){
		var b = document.getElementById("country").value;
    	 $.post("lib/business.php", "f=FetchAllCountriesIDData&data=" + id, function (d) {		
            if (d != "") {
              var f = JSON.parse(d);
            
             var e = document.getElementById("country");
             e.options.length = 0;
             e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
				
                for (var d in f) {
                    if (b) {
                        if (f[d].id == b) {
                            h = d;
                            j = true
                        }
                    }
					
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.business.fields.country.value = "";                   
                }
                
                
             }
        });
		var v = document.getElementById("city").value;
    	 $.post("lib/business.php", "f=FetchAllCityIDData&data=" + id+"&countryid="+b, function (g) {		
            if (g != "") {
              var m = JSON.parse(g);
            
             var e = document.getElementById("city");
             e.options.length = 0;
             e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
				
                for (var d in m) {
                    if (v) {
                        if (m[d].id == v) {
                            h = d;
                            j = true
                        }
                    }
					
                    e.options[e.options.length] = new Option(m[d].city, m[d].id)
                }
                
                if (v && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    //Forms.Form.business.fields.city.value = "";                   
                }
                
                
             }
        });
		}
		
		if(Main.neighsettings == 't'){
		var r = document.getElementById("colony").value;
    	 $.post("lib/business.php", "f=FetchAllColonyNeighborhoodIDData&data=" + id+"&countryid="+b+"&cityid="+v, function (k) {		
            if (k != "") {
              var t = JSON.parse(k);
            
             var e = document.getElementById("colony");
             e.options.length = 0;
             e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
				
                for (var d in t) {
                    if (r) {
                        if (t[d].id == r) {
                            h = d;
                            j = true
                        }
                    }
					
                    e.options[e.options.length] = new Option(t[d].name, t[d].id)
                }
                
                if (r && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.business.fields.colony.value = "";                   
                }
                
                
             }
        });
		
		}
		
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlagB-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("street_"+flaginfo[Z].id).style.display  = "none";
			if(Main.neighsettings != 't'){
			document.getElementById("colony_"+flaginfo[Z].id).style.display  = "none";
			}
			
        }
        
        document.getElementById("langFlagB-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
		document.getElementById("street_"+id).style.display  = "block";
		if(Main.neighsettings != 't'){
		document.getElementById("colony_"+id).style.display  = "block";
		}
		
		
    },
	PreValidationOption1: function(e){
	
		var k = e.keyCode;
            return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8   || k == 45 || k == 44 ||(k >= 48 && k <= 57));	
	
	},
	PreValidationOption2: function(e,id){
	
		//var k = e.keyCode;
		var id1=id;
            if (document.getElementById(id1).value.length == 0) {
		   //alert(e.keyCode)
           if (e.keyCode == 32) {
			  // alert("s")
			   document.getElementById(id1).value = '';
			  return false;
		   }
			}
	
	},
	PreValidation: function(){
   	var count = 0;	
    
    	flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == BResturantInfo.langdefault){
    	if(document.getElementById("name_"+flaginfo[Z].id).value == ""){
            $("#name_text").show();
            $("#name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#name_text").hide();
            $("#name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#name_"+flaginfo[Z].id).removeClass("error-text-field");
        }	
		
		if(document.getElementById("street_"+flaginfo[Z].id).value == ""){
            $("#street_text").show();
            $("#street_"+flaginfo[Z].id).addClass("error-text-field");
            $("#street_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#street_text").hide();
            $("#street_"+flaginfo[Z].id).addClass("success-text-field");
            $("#street_"+flaginfo[Z].id).removeClass("error-text-field");
           
        }	
		       
		}
		
			var namedata = document.getElementById("name_"+flaginfo[Z].id).value;
            BResturantInfo.namelang[flaginfo[Z].id] = namedata;
			
			var addressdata = document.getElementById("street_"+flaginfo[Z].id).value;
            //BResturantInfo.addresslang[flaginfo[Z].id] = addressdata;
				BResturantInfo.addresslang[flaginfo[Z].id] = addressdata.split(",").join("@@@");
			if(Main.neighsettings != 't'){
			var colonydata = document.getElementById("colony_"+flaginfo[Z].id).value;
            BResturantInfo.colonylang[flaginfo[Z].id] = colonydata;
			}
			
			
			
	}
	
		
		
		if(document.getElementById("tel").value == ""){
            $("#tel_text").show();
            $("#tel").addClass("error-text-field");
            $("#tel").removeClass("success-text-field");
            count ++;
        }else{
        	$("#tel_text").hide();
            $("#tel").addClass("success-text-field");
            $("#tel").removeClass("error-text-field");
        }
		if(document.getElementById("cel").value == ""){
            $("#cel_text").show();
			$("#cel_text_10digit").hide();
			
            $("#cel").addClass("error-text-field");
            $("#cel").removeClass("success-text-field");
            count ++;
        }
		// else if(document.getElementById("cel").value.length < 10 ||  document.getElementById("cel").value.length >10 ){
  //           $("#cel_text").hide();
		// 	$("#cel_text_10digit").show();
  //           $("#cel").addClass("error-text-field");
  //           $("#cel").removeClass("success-text-field");
  //           count ++;
  //       }
		else{
        	$("#cel_text").hide();
			$("#cel_text_10digit").hide();
            $("#cel").addClass("success-text-field");
            $("#cel").removeClass("error-text-field");
        }
		var a = document.getElementById("email");
        var b = a.value;
		if(document.getElementById("email").value == ""){
            $("#email_text").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;
        }
		else if (!Main.IsEmail(b)) {
        	$("#email_text").hide();
        	$("#email_text1").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;
           
        }
		else{
            $("#email_text").hide();
        	$("#email_text1").hide();
            $("#email").addClass("success-text-field");
            $("#email").removeClass("error-text-field");
        }

        if(Main.tabsettings.tab_food_active == "t" || Main.tabsettings.tab_alcohol_active == "t" || Main.tabsettings.tab_groceries_active == "t" || Main.tabsettings.tab_laundry_active == "t"){
            var tabcounter = 0;
            if(Main.tabsettings.tab_food_active == "t"){
                if(Forms.GetValue("business", "tab_food") == 'true'){
                    tabcounter++
                }
            }
            if(Main.tabsettings.tab_alcohol_active == "t"){
                if(Forms.GetValue("business", "tab_alcohol") == 'true'){
                    tabcounter++
                }
            }
            if(Main.tabsettings.tab_groceries_active == "t"){
                if(Forms.GetValue("business", "tab_groceries") == 'true'){
                    tabcounter++
                }
            }
            if(Main.tabsettings.tab_laundry_active == "t"){
                if(Forms.GetValue("business", "tab_laundry") == 'true'){
                    tabcounter++
                }
            }           
            
            if(tabcounter == 0){
                $("#businesstype_text").show();
                count ++;
            }else{
                $("#businesstype_text").hide();
            }
        }
        
		if(document.getElementById("timezone").value == ""){           
            $("#timezone_text").show();
            $("#timezone").addClass("error-text-field");
            $("#timezone").removeClass("success-text-field");
            count ++;
        }else{
        	$("#timezone_text").hide();
            $("#timezone").addClass("success-text-field");
            $("#timezone").removeClass("error-text-field");  
        }
        
        if(document.getElementById("servicefee").value == ""){           
            $("#servicefee_text").show();
            $("#servicefee").addClass("error-text-field");
            $("#servicefee").removeClass("success-text-field");
            count ++;
        }else{
            $("#servicefee_text").hide();
            $("#servicefee").addClass("success-text-field");
            $("#servicefee").removeClass("error-text-field");  
        }

		if(document.getElementById("tax").value == ""){           
            $("#tax_text").show();
            $("#tax").addClass("error-text-field");
            $("#tax").removeClass("success-text-field");
            count ++;
        }else{
        	$("#tax_text").hide();
            $("#tax").addClass("success-text-field");
            $("#tax").removeClass("error-text-field");  
        }
        
		if(document.getElementById("currency").value == ""){           
            $("#currency_text").show();
            $("#currency").addClass("error-text-field");
            $("#currency").removeClass("success-text-field");
            count ++;
        }else{
        	$("#currency_text").hide();
            $("#currency").addClass("success-text-field");
            $("#currency").removeClass("error-text-field");  
        }
		if(document.getElementById("taxtype").value == ""){           
            $("#taxtype_text").show();
            $("#taxtype").addClass("error-text-field");
            $("#taxtype").removeClass("success-text-field");
            count ++;
        }else{
        	$("#taxtype_text").hide();
            $("#taxtype").addClass("success-text-field");
            $("#taxtype").removeClass("error-text-field");  
        }
		
		
		
        if (Main.User.level < 2) {
            if(document.getElementById("country").value == "-1"){
            $("#country_text").show();
            $("#country").addClass("error-text-field");
            $("#country").removeClass("success-text-field");
            count ++;
            }else{
                $("#country_text").hide();
                $("#country").addClass("success-text-field");
                $("#country").removeClass("error-text-field");
                
            }
            if(document.getElementById("city").value == ""){
            $("#city_text").show();
            $("#city").addClass("error-text-field");
            $("#city").removeClass("success-text-field");
            count ++;
            }else{
                $("#city_text").hide();
                $("#city").addClass("success-text-field");
                $("#city").removeClass("error-text-field");
               
            }
            if(document.getElementById("country").value == "-1"){
            $("#city_text").show();
            $("#city").addClass("error-text-field");
            $("#city").removeClass("success-text-field");
            count ++;
            }
        }

        if(BResturantInfo.SlugPrevalidation() != true){
            count ++;
        }
		
        if(count == 0)
        	return true
        else 
        	return false
       
    },
	
	SlugPrevalidation: function(){
		
		Forms.UpdateValue("business", "name", BResturantInfo.namelang,true);
		Forms.UpdateValue("business", "street", BResturantInfo.addresslang,true);
		if(Main.neighsettings != 't'){
		  Forms.UpdateValue("business", "colony", BResturantInfo.colonylang,true);
		}
		//var customval = Forms.Form.business.fields.customslug;
        var slugcounter = 0;
		if(document.getElementById("customslug").value == ""){
            $("#customslug_text").show();
            $("#customslug").addClass("error-text-field");
            $("#customslug").removeClass("success-text-field");  
            slugcounter++;          
        }else{
			$.post("lib/business.php", "f=checkslug&data=" + JSON.stringify(Forms.Form.business.fields.customslug), function (a) {
                if( a == "okay") {
    			    $("#customslug_text1").hide();
                     $("#customslug_text").hide();
    				$("#customslug").addClass("success-text-field");
    				$("#customslug").removeClass("error-text-field");                  
    			}else{
    			    $("#customslug_text1").show();//already register
    				$("#customslug").addClass("error-text-field");
    				$("#customslug").removeClass("success-text-field");
                    slugcounter++;     				
    			}
            })	
        }
        if(slugcounter == 0){
            return true
        }else{
            return false
        }
    },

  
	
	save: function (){
		Main.Loading();
		
		if(BResturantInfo.PreValidation() == false){
		  Main.Ready();	
			return	
		}	
        $.post("lib/business.php", "f=checkslug&data=" + JSON.stringify(Forms.Form.business.fields.customslug), function (a) {
            if( a == "okay") {
                $("#customslug_text1").hide();
                 $("#customslug_text").hide();
                $("#customslug").addClass("success-text-field");
                $("#customslug").removeClass("error-text-field");   

                BResturantInfo.UpdateDeliveryPickupTime();

                if(document.getElementById("showImage1").value !="") {
                    Forms.Form.business.image = document.getElementById("showImage1").value;
                }
                if(document.getElementById("showImage2").value !="") {
                    Forms.Form.business.imageheader = document.getElementById("showImage2").value;
                }


                var adrs = "";

                flaginfo=Main.languageinfo
                for(Z in flaginfo){
                    if(flaginfo[Z].id == BResturantInfo.langdefault){                       
                        if(document.getElementById("street_"+flaginfo[Z].id)){
                            adrs += document.getElementById("street_"+flaginfo[Z].id).value+",";    
                        }
                        break
                    }
                }
                flaginfo=Main.languageinfo
                for(Z in flaginfo){
                    if(flaginfo[Z].id == BResturantInfo.langdefault){                       
                        if(document.getElementById("colony_"+flaginfo[Z].id)){
                            adrs += document.getElementById("colony_"+flaginfo[Z].id).value+",";    
                        }
                        break
                    }
                }

                if(document.getElementById("country")){
                    var conty = $("#country option:selected").text();
                    var cty = $("#city option:selected").text();
                    if(cty)
                        adrs += cty+",";
                    if(conty)
                        adrs += conty;
                }
                BResturantInfo.checkslug(Forms.Form.business.fields.customslug.value);

            }else{
                Main.Ready();
                $("#customslug_text1").show();//already register
                $("#customslug").addClass("error-text-field");
                $("#customslug").removeClass("success-text-field");
                
            }
        })

            
    
		
	},
	
	 checkslug : function (g) {

      	/*Main.Loading();
		$.post("lib/business.php", "f=checkslug&data=" + JSON.stringify(Forms.Form.business), function (a) {
        	Main.Ready(); 
            if( a == "okay") {*/
			 var str = Forms.Form.business.fields.timezone.value; 
			Forms.Form.business.fields.timezone.value = str.replace("+", "@");
	
			var str = Forms.Form.business.fields.timezone.value; 
			Forms.Form.business.fields.timezone.value = str.replace("-", "$");
			//alert(JSON.stringify(Forms.Form.business))	
			
			if(BResturantInfo.SlugPrevalidation() == false){
                Main.Ready();
			   return   
			}

			if(Forms.Form.business.fields.provider.value == ""){
			delete Forms.Form.business.fields.provider;		
				
			}
			
			for(var s in Forms.Form.business.fields){			
			Forms.Form.business.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.business.fields[s].value)))
            Forms.Form.business.fields[s].value = Forms.Form.business.fields[s].value.split("+").join("@@");
			Forms.Form.business.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.business.fields[s].ivalue)))
            Forms.Form.business.fields[s].ivalue = Forms.Form.business.fields[s].ivalue.split("+").join("@@");
		}
		
			//alert(JSON.stringify(Forms.Form.business))
			$.post("lib/business.php", "f=SaveBusiness&data=" + JSON.stringify(Forms.Form.business), function (b) {
				Main.Ready();
				Forms.Form.business.type = "modify"
                Business.id = b;
                a = Object();
                a.alt="delivery";
                Business.SwitchTab(a);
                $(window).scrollTop(0);
			});


        
        	GoogleMap.Clean()
       

     },
	 
	 
	triggerImageupload: function(no) {
		
		 $("#uform_bimg"+no).submit(function (event) {
			 
			 event.preventDefault();
		
		var formData = new FormData($(this)[0]);
 $.ajax({
            url: 'upload-image.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (html) {
               //alert(html)
			  document.getElementById("showImage"+no).value = html
			   
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
 		});
		 },
		 
	PreviewImage: function(no) {
        document.getElementById('loader1').style.display = 'block';
         document.getElementById("uploadPreview"+no).src ="";
		 document.getElementById("uploadPreview"+no).src ="";
		  
		$('form#uform_bimg'+no).find('input[type="submit"]').trigger('click');
           var oFReader = new FileReader();
		
           oFReader.readAsDataURL(document.getElementById("uploadImage"+no).files[0]);
           oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview"+no).src = oFREvent.target.result;
		    document.getElementById("imagefile"+no).value = document.getElementById("uploadImage"+no).files[0].name;
			document.getElementById('loader1').style.display = 'none';
        };
		
    },
    MapBusiness: function(){
        //alert('1');
		
        var e = JSON.parse(Forms.GetValue("business", "location"));
		//alert(JSON.stringify(e));
        var g = "";
		
		flaginfo=Main.languageinfo
				for(Z in flaginfo){
					if(flaginfo[Z].id == BResturantInfo.langdefault){
						if(document.getElementById("street_"+flaginfo[Z].id)){
							g += document.getElementById("street_"+flaginfo[Z].id).value+",";	
						}
						if(document.getElementById("colony_"+flaginfo[Z].id)){
							g += document.getElementById("colony_"+flaginfo[Z].id).value+",";	
						}
						break
					}
				}
				
		
       
        /*if(Forms.GetValue("business", "street") !=""){
            g += Forms.GetValue("business", "street") + ", ";
        }*/
        /*if(Forms.GetValue("business", "colony") !=""){
            g += Forms.GetValue("business", "colony") + ", ";
        }*/
        if(Forms.GetValue("business", "city") !=""){            
            //d = document.getElementById("city");            
            g += Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Forms.GetValue("business", "city"), "city") + ", ";
        }
        if(Forms.GetValue("business", "country") !=""){
            g += Main.GetPropertyValueOnPropertyValueFound(Main.Countries, "id", Forms.GetValue("business", "country"), "name") + ", ";
        }
		

        if (g == "") {
            e.latitud = 51.507351;
            e.longitud = -0.127758;
            e.zoom = 4;
        }
//alert(e.latitud);
        GoogleMap.Init("mapbusiness", e.latitud, e.longitud, e.zoom, BResturantInfo.locationUpdated, '','', "bottomright")
		
    },
	locationUpdated: function (a) {
	//	alert(JSON.stringify(a));
        Forms.UpdateValue("business", "location", JSON.stringify(a), true);
       
	   // var b = Forms.GetValue("business", "location");
		
        
    },
	ShowDeliverypickupTime: function(){
		var input = $('#delivery_time');
		input.clockpicker({
			autoclose: true
		});
		
		$('#delivery-time').click(function(e){
			e.stopPropagation();
			$("#delivery_time").clockpicker('show')
					.clockpicker('toggleView', 'hours');
		});
		
		var input1 = $('#pickup_time');
		input1.clockpicker({
			autoclose: true
		});
		
		$('#pickup-time').click(function(e){
			e.stopPropagation();
			$("#pickup_time").clockpicker('show')
					.clockpicker('toggleView', 'hours');
		});
	},
	 UpdateDeliveryPickupTime: function () {		
        var d;
		d = document.getElementById("delivery_time").value;
		Forms.UpdateValue("business", "deliverytime", d, false);
		
		var d;
		d = document.getElementById("pickup_time").value;
		Forms.UpdateValue("business", "pickuptime", d, false);

	},

};
