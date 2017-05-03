var Landing = {
	Main: function(){
		Landing.pagetitlelang = Array();
		Landing.pageheadinglang = Array();
		Landing.pagelangname= Array();
		Landing.langemail=Array();
		Landing.langpostcode=Array();
		Landing.langtermsandconditions= Array();
		Landing.languniqueurl=Array();
		Landing.langmetakeyword= Array();
		Landing.langmetacontent = Array();
		
		Main.Loading();
		var a = new Date().getTime();
        	Main.Aid = a;
		$.post("lib/landingpage.php", "f=FetchAllLandingData", function (b) {
			//alert(b);
			if (a != Main.Aid) {
                return
            }
			Main.Ready();
			if (b != "") {

				// Landing.Config.footer = new Object();
    //             Landing.Config.footer.List = new Object();				 
                 Landing.Landing = JSON.parse(b);
				 Landing.PrintMain();
			}
		});
	},
	PrintMain: function(){
		Forms.Clean("Landing", "mainbuttonok"); 
		
		 
		 Forms.Form.Landing.type = "modify";
         Forms.Form.Landing.id = Landing.Landing[0].id;
         //alert(Forms.Form.Landing.id)


     
     
	var htms ='<div class="row">'

		htms +='<div class="top-bar">'                        
		htms +='<div class=" col-md-6 col-md-offset-6">'
		htms +='<div class=" pull-right">'
		htms +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
		htms +='</div>'
		<!--col-md-5-->		       
		htms +='</div>'
		<!--top-bar-->
		htms +='</div>'
       	<!--row-->
       	htms +='<div class="panel panel-danger panel-no-border">'
       	htms +='<div class="panel-heading panel-heading">'
       	htms += '<div class="row">'
       	htms +='<div class="col-md-6">'
       	htms +='<h3 class="panel-title"><?=$lang_resource['LANDINGPAGE_CREATE_HEADING']?></h3>'
       	htms +='</div>'<!--col-md-5--> 
       	htms +='</div>'<!--row-->
       	htms +='</div>'
       	htms +='<div class="panel-body">'
       	htms +='<div class="row">'
       	htms +='<div class="col-md-12">'
       	htms +='<div class="row">'
       	htms +='<ul class="pop_lang_img">'

       	flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Landing.langdefault = flaginfo[Z].admindefaulelang;                             
                htms+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Landing.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                htms+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Landing.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        htms +='</ul>'

        var A = "";
        
        if (Landing.Landing[0].id) {
     	if(Landing.Landing[0].backgroundimage) {
     		
            A = "../panel/images/landing/" + Main.NullToEmpty(Landing.Landing[0].backgroundimage) + "?c=" + new Date().getTime();
            }
        }
        else{
        	//alert("hf")
        A = "images/dummy/default-logo.png";
        }
        htms +='</div>'
        htms +='</div>'<!--col-md-12-->
        htms +='</div>'<!--row-->
        htms +='<div class="row">'
        htms +='<div class="col-md-4">'
        htms +='<div class="form-group">'
        Forms.CreateValue("Landing", "pagetitle", "",true)

        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_PAGE_TITLE']?></label>'
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
       			 htms +='<input type="text" class="form-control rounded" id="pagetitle_'+flaginfo[p].id+'" value="'+Main.NullToEmpty(Landing.Landing[0].pagetitle[flaginfo[p].id])+'" placeholder="">'
       			}
       			else
       			{
       				htms +='<input type="text" class="form-control rounded" id="pagetitle_'+flaginfo[p].id+'" value="'+Main.NullToEmpty(Landing.Landing[0].pagetitle[flaginfo[p].id])+'" placeholder="" style="display:none;">'
       			}
       		}
       	htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_pagetitle" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_PAGE_TITLE']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-4-->
        htms +=' <div class="col-md-4">'
        htms +='<div class="form-group">'
        Forms.CreateValue("Landing", "pageheading", "",true)
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_PAGE_HEADER']?></label>'
         flaginfo=Main.languageinfo;
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        		htms +='<input type="text" class="form-control rounded" id="pageheading_'+flaginfo[p].id+'" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].pageheading[flaginfo[p].id])+'">'
    	}
    	else
    	{
    		htms +='<input type="text" class="form-control rounded" id="pageheading_'+flaginfo[p].id+'" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].pageheading[flaginfo[p].id])+'" style="display:none;">'
    	}
    }
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_pageheading" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_PAGE_HEADING']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-4-->
        htms +=' <div class="col-md-4">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_BACKGROUND_IMAGE']?></label>'

        htms +='<div class="input-group">'
        htms +='<input type="text" class="form-control rounded" id="imagefile1" readonly>'
        htms +='<span class="input-group-btn">'
        htms +='<span class="btn btn-default btn-file btn-light rounded">'

        htms += '<form id="uform_bimg1" name="uform_bimg1" enctype="multipart/form-data" method="post" >';
        htms += '<?= $lang_resource['LANDING_PAGE_IMAGE_UPLOAD'] ?>';
        htms +='<input id="uploadImage1" type="file" name="uploadImage1" onChange="Landing.PreviewImage(1);" >'
        htms += '<input id="showImage1" name="showImage1" type="hidden" value=""  />';
        htms += '<input type="submit" name="submit" onclick="Landing.triggerImageupload(1)" style="display:none" />';

        //htms +='Browse… <input type="file" name="">'
        htms+= '</form>';

        htms +='</span>'
        htms +='</span>'
        htms +='</div>'<!-- /.input-group -->
        htms +='<span class="clearfix cms-bg-img">'
        //htms +='<img src="images/bg-img.jpg">'
        htms +='<img id="uploadPreview1" src="' + A + '"  >'
        htms +='</span>'
        htms +='</div>'
        htms +='</div>'<!--col-md-4-->
        htms +='</div>'
        htms +='<div class="row">'
        htms +='<div class="col-md-12">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_PAGE_CONTENT']?></label>'
       // Forms.CreateValue("Landing", "pagecontent", "",true)
        //flaginfo=Main.languageinfo;
        // for(p in flaginfo){
        // 	if(flaginfo[p].id == Landing.langdefault){
        // 		//alert(Landing.Landing[0].pagecontent[flaginfo[p].id])
        htms +=Forms.CreateTextAreaPropertyCMS("Landing", "pagecontent", "pagecontent",Main.NullToEmpty(Landing.Landing[0].pagecontent), true, "", false)
    	// }
    	// else{
    	// 	htms +=Forms.CreateTextAreaPropertyCMS("Landing", "pagecontent_"+flaginfo[p].id,"pagecontent" ,Main.NullToEmpty(Landing.Landing[0].pagecontent[flaginfo[p].id]), true, "", false,"","","display:none")
	    // 	}
	    // }
        //htms +=
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_pagecontent" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_PAGE_CONTENT']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-12-->

        htms +='</div>'<!--row-->
        htms +='<div class="row" style="margin-top:25px;">'
        htms += '<div class="col-md-3">'
        htms +='<div class="form-group">'
        Forms.CreateValue("Landing", "name", "",true)
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_NAME']?></label>'
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        	htms +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].name[flaginfo[p].id])+'">'
	    }
	    else
	   		{
    			htms +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].name[flaginfo[p].id])+'"style="display:none;">'
		    }
		}
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_name" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_NAME']?></small>'
        htms +='</div>'
		htms +='<div class="landing_enable">'
        htms +='<div class="enebal" id="switch_1' + Landing.Landing[0].id + '"></div>'
		htms +='</div>'
        htms +='</div>'
        htms +='<div class="col-md-3">'
        htms +='<div class="form-group">'
        Forms.CreateValue("Landing", "email", "",true)
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_EMAIL']?></label>'
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        		//alert(Landing.Landing[0].email[flaginfo[p].id])
        		htms +='<input type="text" class="form-control" id="email_'+flaginfo[p].id+'" rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].email[flaginfo[p].id])+'">'
        	}else{
        		htms +='<input type="text" class="form-control" id="email_'+flaginfo[p].id+'" rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].email[flaginfo[p].id])+'" style="display:none;">'
        	}	
        }
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_email" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_EMAIL']?></small>'
        htms +='</div>'
		htms +='<div class="landing_enable">'
        htms +='<div class="enebal" id="switch_2' + Landing.Landing[0].id + '"></div>'
		htms +='</div>'
        htms +='</div>'<!--col-md-3-->
        htms +='<div class="col-md-3">'
        htms +='<div class="form-group">'

        Forms.CreateValue("Landing", "postcode", "",true)
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_POSTCODE']?></label>'
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        	htms +='<input type="text" class="form-control rounded" id="postcode_'+flaginfo[p].id+'" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].postcode[flaginfo[p].id])+'">'
    	}
    	else{
    		htms +='<input type="text" class="form-control rounded" id="postcode_'+flaginfo[p].id+'" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].postcode[flaginfo[p].id])+'" style="display:none">'
    	}
    }
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_postcode" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_POSTCODE']?></small>'
        htms +='</div>'
		htms +='<div class="landing_enable">'
        htms +='<div class="enebal" id="switch_3' + Landing.Landing[0].id + '"></div>'
		htms +='</div>'
        htms +='</div>'<!--col-md-3-->
        htms +='<div class="col-md-3">'
        htms +='<div class="form-group">'
        Forms.CreateValue("Landing", "terms_conditions", "",true)
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_TERMS_CONDITIONS']?></label>'
        flaginfo=Main.languageinfo;
        //alert(JSON.stringify(Landing.Landing[0].terms_conditions))
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        htms +='<input type="text" class="form-control rounded" id="terms_'+flaginfo[p].id+'" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].terms_conditions[flaginfo[p].id])+'">'
    	}
    	else{
    		htms +='<input type="text" class="form-control rounded" id="terms_'+flaginfo[p].id+'"placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].terms_conditions[flaginfo[p].id])+'" style="display:none">'
    	}
    }
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_terms" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_TERMS']?></small>'
        htms +='</div>'
		htms +='<div class="landing_enable">'
        htms +='<div class="enebal" id="switch_4' + Landing.Landing[0].id + '"></div>'
		htms +='</div>'
        htms +='</div>'<!--col-md-3-->
        htms +='</div>'<!--row-->  
        htms +='<div class="row">'
        htms +='<div class="col-md-12">'
        htms +='<h4 style="font-weight: normal; border-bottom:1px solid #b0b0b0; padding:15px 0px; margin:30px 0px 20px 0px">Mailchimp Set up</h4>'
        htms +='</div>'
        htms +='</div>'<!--row-->
        htms +='<div class="row">'
        htms +='<div class="col-md-6">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_MAILCHIMP_API']?></label>'
        htms +=Forms.CreateInputPropertyAdmin("Landing", "mailchimp_api",Main.NullToEmpty(Landing.Landing[0].mailchimp_api),"","Landing.PreValidation()",true,"","Landing.PreValidation()")
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_mailchimp_api" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_MAIL_CHIMP_DATA_API']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-6-->
        htms +='<div class="col-md-6">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_MAILCHIMP_LISTID']?></label>'
        htms +=Forms.CreateInputPropertyAdmin("Landing", "mailchimp_listid",Main.NullToEmpty(Landing.Landing[0].mailchimp_listid),"","Landing.PreValidation()",true,"","Landing.PreValidation()")
        
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_mailchimp_listid" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_MAIL_CHIMP_DATA_ID']?></small>'
        htms +='</div>'
        htms +='</div><!--col-md-6-->'
        htms +='</div><!--row-->'
        htms +='<div style="border-bottom:1px solid #b0b0b0; margin:30px 0px 20px 0px"></div>'
        htms +='<div class="row">'
        htms +='<div class="col-md-12">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_FOR_TRAFFIC']?></label>'
        
        htms += Forms.CreateTextAreaPropertyAdmin("Landing", "traffice_js", Main.NullToEmpty(Landing.Landing[0].jscode), false, "Landing.PreValidation()", true, "comment","","fd")
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_traffice_js" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_TRAFFICE_JS_REQUIRED']?></small>'
        
        htms +='</div>'
        htms +='</div>'<!--col-md-12-->
        htms +='</div>'<!--row-->
        htms +='<div style="border-bottom:1px solid #b0b0b0; margin:30px 0px 20px 0px"></div>'
        htms +='<div class="row">'
        htms +='<div class="col-md-6">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_HOME_PAGE_SYSTEM']?></label>'
        var g = "";
        var b;
        b = '{"id":"-1","caption":""},'       
        g = "[" + b + '{"id":"t","caption":"On"},{"id":"f","caption":"Off"}]';
        g = JSON.parse(g);
        htms +=Forms.CreateSelectPropertyAdmin("Landing", "home_page_of_system", g,Landing.Landing[0].home_page_of_system,false,"Landing.PreValidation()")
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_system" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_HOME_PAGE_OF_SYSTEM_REQUIRED']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-6-->
        htms +='<div class="col-md-6">'
        htms +='<div class="form-group">'
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_UNIQUE_URL']?></label>'
        htms +=Forms.CreateInputPropertyAdmin("Landing", "uniqueurl",Main.NullToEmpty(Landing.Landing[0].uniqueurl),"","Landing.PreValidation()",true,"","Landing.PreValidation()")
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_uniqueurl" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_UNIQUE_URL_REQUIRED']?></small>'
        //htms +='<input type="text" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].uniqueurl)+'">'
        htms +='</div>'
        htms +='</div>'<!--col-md-6-->
        htms +='</div>'<!--row-->
        htms +='<div class="row">'
        htms +='<div class="col-md-6">'
        htms +='<div class="form-group">'

         Forms.CreateValue("Landing", "metakeyword", "",true)
        flaginfo=Main.languageinfo;
       

        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_META_KEYWORD']?></label>'
         for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        		htms +='<input type="text" id="metakeyword_'+flaginfo[p].id+'" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].metakeyword[flaginfo[p].id])+'">'
    	}
    	else
    	{
    			htms +='<input type="text" id="metakeyword_'+flaginfo[p].id+'" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].metakeyword[flaginfo[p].id])+'"style="display:none">'
    	}
    }
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_metakeyword" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_META_KEYWORDS_REQUIRED']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-6-->
        htms +='<div class="col-md-6">'
        htms +='<div class="form-group">'
        flaginfo=Main.languageinfo;
        Forms.CreateValue("Landing", "metacontent", "",true)
        htms +='<label><?=$lang_resource['LANDINGPAGE_FIELD_META_CONTENT']?></label>'
        for(p in flaginfo){
        	if(flaginfo[p].id == Landing.langdefault){ 
        	htms +='<input type="text" id="metacontent_'+flaginfo[p].id+'" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].metacontent[flaginfo[p].id])+'">'
    	}
    	else
    	{
    		htms +='<input type="text" id="metacontent_'+flaginfo[p].id+'" class="form-control rounded" placeholder="" value="'+Main.NullToEmpty(Landing.Landing[0].metacontent[flaginfo[p].id])+'"style="display:none" >'
    	}
    }
        htms +='<small data-bv-validator="notEmpty" class="help-block" id="valid_metacontent" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_LANDING_META_DATA_REQUIRED']?></small>'
        htms +='</div>'
        htms +='</div>'<!--col-md-6-->
        htms +='</div>'<!--row-->
        htms +='<div class="row">'
        htms +='<div class="col-md-3">'
        htms +='<button type="submit" class="btn btn-primary popup-submit-btn" onclick="Landing.Save()"><?=$lang_resource['LANDINGPAGE_FIELD_SUBMIT']?></button>'
        htms +='</div>'<!--col-md-6-->
        htms +='</div>'
        htms +='</div>'<!-- /.panel-body -->
        htms +='</div>'
        htms +='</div>'<!-- /.container-fluid -->


       $("#main").empty().append(htms);

       CKEDITOR.replace( 'pagecontent',
			{
				filebrowserUploadUrl: "upload/upload.php"
			});
		CKEDITOR.instances['pagecontent'].on('change', function( event ) { 		
			Landing.PreValidation()
		});


		$(".ui-helper-hidden-accessible").hide();

		var h = false;
        Switch.Init();
            if (Landing.Landing[0].name_enabled == "t") {
            	
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_1" + Landing.Landing[0].id, h);
            Switch.OnChange("switch_1" + Landing.Landing[0].id, function (m, i) {
                Landing.SetEnabledName(m.replace("switch_1", ""), i)
            })

             if (Landing.Landing[0].email_enabled == "t") {
            	
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_2" + Landing.Landing[0].id, h);
            Switch.OnChange("switch_2" + Landing.Landing[0].id, function (m, i) {
                Landing.SetEnabledEmail(m.replace("switch_2", ""), i)
            })

            if (Landing.Landing[0].postcode_enabled == "t") {
            	
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_3" + Landing.Landing[0].id, h);
            Switch.OnChange("switch_3" + Landing.Landing[0].id, function (m, i) {
                Landing.SetEnabledPostCode(m.replace("switch_3", ""), i)
            })

            if (Landing.Landing[0].terms_conditions_enabled == "t") {
            	
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_4" + Landing.Landing[0].id, h);
            Switch.OnChange("switch_4" + Landing.Landing[0].id, function (m, i) {
                Landing.SetEnabledTermsCondition(m.replace("switch_4", ""), i)
            })
       
    

	},

	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("pagetitle_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("pageheading_"+flaginfo[Z].id).style.display  = "none";
			//document.getElementById("pagecontent_"+flaginfo[Z].id).style.display = "none";
			document.getElementById("name_"+flaginfo[Z].id).style.display = "none";
			document.getElementById("email_"+flaginfo[Z].id).style.display = "none";
			document.getElementById("postcode_"+flaginfo[Z].id).style.display = "none";
			document.getElementById("terms_"+flaginfo[Z].id).style.display = "none";
			//document.getElementById("uniqueurl_"+flaginfo[Z].id).style.display  = "none";
			
			document.getElementById("metakeyword_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("metacontent_"+flaginfo[Z].id).style.display  = "none";
			
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';		
		document.getElementById("pagetitle_"+id).style.display  = "block";
		document.getElementById("pageheading_"+id).style.display  = "block";
		//document.getElementById("pagecontent_"+id).style.display = "block";
        document.getElementById("name_"+id).style.display  = "block";
       
        document.getElementById("email_"+id).style.display = "block";
        document.getElementById("postcode_"+id).style.display = "block";
        document.getElementById("terms_"+id).style.display = "block";
		document.getElementById("metakeyword_"+id).style.display  = "block";
		document.getElementById("metacontent_"+id).style.display  = "block";
		
		
    },
    SetEnabledName: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }		
        $.post("lib/landingpage.php", "f=SetEnabledName&id=" + b + "&enabled=" + Estr, function (c) {			
            if (c != "ok") {              
				Landing.Main();				
            }
        })
    },

    SetEnabledEmail: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }		
        $.post("lib/landingpage.php", "f=SetEnabledEmail&id=" + b + "&enabled=" + Estr, function (c) {			
            if (c != "ok") {              
				Landing.Main();				
            }
        })
    },

    SetEnabledPostCode: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }		
        $.post("lib/landingpage.php", "f=SetEnabledPostCode&id=" + b + "&enabled=" + Estr, function (c) {			
            if (c != "ok") {              
				Landing.Main();				
            }
        })
    },

    SetEnabledTermsCondition: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }		
        $.post("lib/landingpage.php", "f=SetEnabledTermsCondition&id=" + b + "&enabled=" + Estr, function (c) {			
            if (c != "ok") {              
				Landing.Main();				
            }
        })
    },

    PreviewImage: function(no) {
		 document.getElementById("uploadPreview"+no).src ="";
		  
		$('form#uform_bimg'+no).find('input[type="submit"]').trigger('click');
           var oFReader = new FileReader();
		
           oFReader.readAsDataURL(document.getElementById("uploadImage"+no).files[0]);
           oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview1").src = oFREvent.target.result;
		    document.getElementById("imagefile1").value = document.getElementById("uploadImage1").files[0].name;
			
        };
   },

   PreValidation: function(){
        var count = 0;  
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
         var data = CKEDITOR.instances.pagecontent.getData();
        
        if(data == ""){
            $("#valid_pagecontent").show();
            $("#cke_pagecontent").addClass("error-text-field");
            $("#cke_pagecontent").removeClass("success-text-field");
            count ++;
        }else{
        	//alert(data);
            $("#valid_pagecontent").hide();
            $("#cke_pagecontent").addClass("success-text-field");
            $("#cke_pagecontent").removeClass("error-text-field");
        }
    }
        if(document.getElementById("mailchimp_api").value=="")
        {
        	 $("#valid_mailchimp_api").show();
            $("#mailchimp_api").addClass("error-text-field");
            $("#mailchimp_api").removeClass("success-text-field");
            count ++;
        }
        else{
	        	$("#valid_mailchimp_api").hide();
	            $("#mailchimp_api").addClass("success-text-field");
	            $("#mailchimp_api").removeClass("error-text-field");
        }

        if(document.getElementById("mailchimp_listid").value=="")
        {
        	 $("#valid_mailchimp_listid").show();
            $("#mailchimp_listid").addClass("error-text-field");
            $("#mailchimp_listid").removeClass("success-text-field");
            count ++;
        }
        else{
	        	$("#valid_mailchimp_listid").hide();
	            $("#mailchimp_listid").addClass("success-text-field");
	            $("#mailchimp_listid").removeClass("error-text-field");
        }
        if(document.getElementById("traffice_js").value=="")
        {
        	 $("#valid_traffice_js").show();
            $("#traffice_js").addClass("error-text-field");
            $("#traffice_js").removeClass("success-text-field");
            count ++;
        }
        else{
	        	$("#valid_traffice_js").hide();
	            $("#traffice_js").addClass("success-text-field");
	            $("#traffice_js").removeClass("error-text-field");
        }



        if(document.getElementById("uniqueurl").value=="")
        {
        	 $("#valid_uniqueurl").show();
            $("#uniqueurl").addClass("error-text-field");
            $("#uniqueurl").removeClass("success-text-field");
            count ++;
        }
        else{
	        	$("#valid_uniqueurl").hide();
	            $("#uniqueurl").addClass("success-text-field");
	            $("#uniqueurl").removeClass("error-text-field");
        }



        if(document.getElementById("home_page_of_system").value == "-1"){
        	
            $("#valid_system").show();
            $("#home_page_of_system").addClass("error-text-field");
            $("#home_page_of_system").removeClass("success-text-field");
            count ++;
        }else{
            $("#valid_system").hide();
            $("#home_page_of_system").addClass("success-text-field");
            $("#home_page_of_system").removeClass("error-text-field");
        }
        
		 flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Landing.langdefault){ 
			
			if(document.getElementById("pagetitle_"+flaginfo[Z].id).value == ""){ 
				$("#valid_pagetitle").show();
				$("#pagetitle_"+flaginfo[Z].id).addClass("error-text-field");
				$("#pagetitle_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#valid_pagetitle").hide();	        	
				$("#pagetitle_"+flaginfo[Z].id).addClass("success-text-field");
				$("#pagetitle_"+flaginfo[Z].id).removeClass("error-text-field");
			}			
			var ptitle = document.getElementById("pagetitle_"+flaginfo[Z].id).value;
			if (/^[a-zA-Z0-9- ]*$/.test(ptitle) == false ) {
				
				$("#pagetitle_text1").show();
				$("#pagetitle_"+flaginfo[Z].id).addClass("error-text-field");
				$("#pagetitle_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				
				$("#pagetitle_text1").hide();
				$("#pagetitle_"+flaginfo[Z].id).addClass("success-text-field");
				$("#pagetitle_"+flaginfo[Z].id).removeClass("error-text-field");
			} 
			
			
			
			if(document.getElementById("pageheading_"+flaginfo[Z].id).value == ""){
				$("#valid_pageheading").show();
				$("#pageheading_"+flaginfo[Z].id).addClass("error-text-field");
				$("#pageheading_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#valid_pageheading").hide();
				$("#pageheading_"+flaginfo[Z].id).addClass("success-text-field");
				$("#pageheading_"+flaginfo[Z].id).removeClass("error-text-field");
			}
			
			if(document.getElementById("metakeyword_"+flaginfo[Z].id).value == ""){
				//alert()
				$("#valid_metakeyword").show();
				$("#metakeyword_"+flaginfo[Z].id).addClass("error-text-field");
				$("#metakeyword_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#valid_metakeyword").hide();
				$("#metakeyword_"+flaginfo[Z].id).addClass("success-text-field");
				$("#metakeyword_"+flaginfo[Z].id).removeClass("error-text-field");
			}
			 if(document.getElementById("metacontent_"+flaginfo[Z].id).value == ""){
			 	$("#valid_metacontent").show();
			 	$("#metacontent_"+flaginfo[Z].id).addClass("error-text-field");
			 	$("#metacontent_"+flaginfo[Z].id).removeClass("success-text-field");
			 	count ++;
			 }else{
			 	$("#valid_metacontent").hide();
			 	$("#metacontent_"+flaginfo[Z].id).addClass("success-text-field");
			 	$("#metacontent_"+flaginfo[Z].id).removeClass("error-text-field");
			 }
			
			
			}
			
			var pagetitledata = document.getElementById("pagetitle_"+flaginfo[Z].id).value;
            Landing.pagetitlelang[flaginfo[Z].id] = pagetitledata;
            var pageheadingdata = document.getElementById("pageheading_"+flaginfo[Z].id).value;
            Landing.pageheadinglang[flaginfo[Z].id]=pageheadingdata;
            var name = document.getElementById("name_"+flaginfo[Z].id).value;
            Landing.pagelangname[flaginfo[Z].id]=name;
            var email = document.getElementById("email_"+flaginfo[Z].id).value;
            Landing.langemail[flaginfo[Z].id]=email;
            var postcode = document.getElementById("postcode_"+flaginfo[Z].id).value;
            Landing.langpostcode[flaginfo[Z].id]=postcode;
            var terms= document.getElementById("terms_"+flaginfo[Z].id).value;
            Landing.langtermsandconditions[flaginfo[Z].id]=terms;
            var metakeyword = document.getElementById("metakeyword_"+flaginfo[Z].id).value;
            Landing.langmetakeyword[flaginfo[Z].id]=metakeyword;
            var metacontent = document.getElementById("metacontent_"+flaginfo[Z].id).value;
            Landing.langmetacontent[flaginfo[Z].id]=metacontent;
			
			// if(document.getElementById("uniqueurl_"+flaginfo[Z].id).value !=""){
				
			// 	var customurldata = document.getElementById("uniqueurl_"+flaginfo[Z].id).value.replace(/\s/g, '-').toLowerCase();
   //          	Landing.customurllang[flaginfo[Z].id] = customurldata;
			// }
			
			
			
			// var pageheadingdata = document.getElementById("pageheading_"+flaginfo[Z].id).value;
   //          Landing.pageheadinglang[flaginfo[Z].id] = pageheadingdata;
			
			// var metakeywordsdata = document.getElementById("metakeyword_"+flaginfo[Z].id).value;
   //          Landing.metakeywordslang[flaginfo[Z].id] = metakeywordsdata;
			
			// var metacontentdata = document.getElementById("metacontent_"+flaginfo[Z].id).value;
   //          Landing.metacontentlang[flaginfo[Z].id] = metacontentdata;
			
		}
		

       
        
            
        if(count == 0)
            return true
        else 
            return false
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
              // alert(html)
			  document.getElementById("showImage1").value = html
			   
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
 		});
		 },


    Save: function () {
    	if(Landing.PreValidation() == false){
    		return false
    	}

    	Forms.UpdateValue("Landing", "pagetitle", Landing.pagetitlelang,true);
    	Forms.UpdateValue("Landing", "pageheading", Landing.pageheadinglang,true);
    	Forms.UpdateValue("Landing","name",Landing.pagelangname,true);
    	Forms.UpdateValue("Landing","email",Landing.langemail,true);
    	Forms.UpdateValue("Landing","postcode",Landing.langpostcode,true);
    	Forms.UpdateValue("Landing","terms_conditions",Landing.langtermsandconditions,true);
    	Forms.UpdateValue("Landing","metakeyword",Landing.langmetakeyword,true);
    	Forms.UpdateValue("Landing","metacontent",Landing.langmetacontent,true);
    	if(document.getElementById("showImage1").value !="") {
			Forms.Form.Landing.image = document.getElementById("showImage1").value;
			}
    	//alert(JSON.stringify(Forms.Form.Landing))

    	var data = CKEDITOR.instances.pagecontent.getData();	
		Forms.Form.Landing.fields.pagecontent.value =  data;	
		//alert(data)	;
		delete Forms.Form.Landing.pagecontent;
		Forms.Form.Landing.pagecontent = Forms.Form.Landing.fields.pagecontent.value.split("&").join("@@@");
		delete Forms.Form.Landing.fields.pagecontent;

		for(var s in Forms.Form.Landing.fields){	
		
			Forms.Form.Landing.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.Landing.fields[s].value)))
			Forms.Form.Landing.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.Landing.fields[s].ivalue)))
			Forms.Form.Landing.fields[s].value = Forms.Form.Landing.fields[s].value.split("+").join("@@");
			Forms.Form.Landing.fields[s].ivalue = Forms.Form.Landing.fields[s].ivalue.split("+").join("@@");

		} 

		Main.Loading();
		$.post("lib/landingpage.php", "f=SaveLanding&data=" + JSON.stringify(Forms.Form.Landing), function (b) {
			Main.Ready();
			Landing.Main();
		});
		
    },
};