var CMS = {
	Main: function(){
		CMS.pagetitlelang = Array();
		CMS.customurllang = Array();
		CMS.pageheadinglang = Array();
		CMS.metakeywordslang = Array();
		CMS.metacontentlang = Array();
		Main.Loading();
		var a = new Date().getTime();
        	Main.Aid = a;
		$.post("lib/panel_cms.php", "f=FetchAllFooterData", function (b) {
			if (a != Main.Aid) {
                return
            }
			Main.Ready();
			if (b != "") {
				Main.Config.footer = new Object();
                Main.Config.footer.List = new Object();				 
                CMS.footer = JSON.parse(b);
				CMS.PrintMain();
			}
		});
	},
	PrintMain: function(){
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

		htms +='<div class="panel panel-danger panel-square panel-no-border">'
		htms +='<div class="panel-heading panel-heading-2">'
		htms +='<div class="row">'
		htms +='<div class="col-md-4">'
		htms +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_FOOTER_LIST']?></h3>'
		htms +='</div>'
		<!--col-md-5-->
		htms +='<div class="col-md-3">'
		htms +='<div class="panel-btn filtr_margin">'
		htms +='<input type="text" id="search" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-3-->
		htms +='<div class="col-md-5">'
		htms +='<div class="panel-btn pull-right">'
		htms +='<div class="">'
		htms +='<span class=" panel-btn-2">'
		htms +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:CMS.Form()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
		htms +='</span>'
		htms +='<span class=" panel-btn-2">'
		htms +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:CMS.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
		htms +='</span>'   
		htms +='<span class=" panel-btn-2">'
		htms +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="CMS.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
		htms +='</div>'
		htms +='</div>'
		htms +='</div>'
		<!--col-md-4-->
		htms +='</div>'                
		<!--row-->
		htms +='</div>'

		htms +='<div class="panel-body">'
		htms +='<div class="table-responsive">'
		htms +='<table class="table table-th-block table-striped tbl_enebal">'
		htms +='<thead>'
		htms +='<tr>'					
		htms +='<th width="5%" onclick="CMS.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
		htms +='<th width="5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
		htms +='<th width="25%" onclick="CMS.PupulateTable(\'pagetitle\')"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_TITLE']?></th>'
		htms +='<th width="25%" onclick="CMS.PupulateTable(\'pageheading\')"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_HEADING']?></th>'
		htms +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_FOOTER_COLUMN']?></th>'
		htms +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_ACTIVATED']?></th>'
		htms +='</tr>'
		htms +='</thead>'
		htms +='<tbody id="footertable">'
		

		htms +='</tbody>'
		htms +='</table>'
		htms +='</div>'
		<!--table-responsive-->
		htms +='</div>'
		<!-- panel-body -->
		htms +='</div>'

		$("#main").empty().append(htms);

		document.getElementById("search").onkeyup = function () {			
			CMS.PupulateTable(Main.Config.footer.List.SortBy, true)
        };		
		CMS.PupulateTable(Main.Config.footer.List.SortBy, true)
	},
	PupulateTable: function(a, c){
		var htms = "";
        var b = this.footer.length;
		
        if (c) {
            this.footer.sort(Main.SortByProperty(a));
            if (Main.Config.footer.List.SortByStatus == "max") {
                this.footer.reverse()
            }
        } else {
            if (Main.Config.footer.List.SortBy != a) {
                this.footer.sort(Main.SortByProperty(a));
                Main.Config.footer.List.SortByStatus = "min"
            } else {
                this.footer.reverse();
                if (Main.Config.footer.List.SortByStatus == "min") {
                    Main.Config.footer.List.SortByStatus = "max"
                } else {
                    Main.Config.footer.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.footer.List.SortBy = a;
        var j = false;
        var g = "";
        var l = new Array();

        for (var e in this.footer) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.footer[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.footer[e].pagetitle).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.footer[e].pageheading).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.footer[e])
            }
            if (j) { 
				htms +='<tr>'
				htms +='<td>' + this.footer[e].id + '</td>'
				htms +='<td><input type="checkbox" class="checkbox" value="' + this.footer[e].id + '"></td>'
				htms +='<td class="hand" onclick="CMS.Edit(' + this.footer[e].id + ')">' + Main.NullToEmpty(this.footer[e].pagetitle).toUpperCase() +'</td>'
				htms +='<td class="hand" onclick="CMS.Edit(' + this.footer[e].id + ')">' + Main.NullToEmpty(this.footer[e].pageheading).toUpperCase() +'</td>'
				htms +='<td>'+ Main.NullToEmpty(this.footer[e].type) +'</td>'
				htms +='<td><div class="enebal" id="switch_' + this.footer[e].id + '"></div></td>'
				htms +='</tr>'
			}           
        }
        $("#footertable").empty().append(htms);
		var h = false;
        Switch.Init();
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                CMS.SetEnabled(m.replace("switch_", ""), i)
            })
        }
	},
	SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }		
        $.post("lib/panel_cms.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {			
            if (c != "ok") {              
				CMS.Main();				
            }
        })
    },
    Edit: function (a) {		
        var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValues();
            if (c.length == 1) {
                a = c[0];
                d = true
            }
            else if(c.length > 1){
            	alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_EDIT']?>");
                return
            }else{
            	alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_ONE']?>");
                return
            }
			
        } if (d) {
            Main.Loading();		  
			$.post("lib/panel_cms.php", "f=FetchFooterData&id=" + a, function (b) {				
				Main.Ready();
				CMS.Form(JSON.parse(b));			
			});
        }
    },
	
	
	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("pagetitle_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("customurl_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("pageheading_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("metakeyword_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("metacontent_"+flaginfo[Z].id).style.display  = "none";
			
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';		
		document.getElementById("pagetitle_"+id).style.display  = "block";
        document.getElementById("customurl_"+id).style.display  = "block";
		document.getElementById("pageheading_"+id).style.display  = "block";
		document.getElementById("metakeyword_"+id).style.display  = "block";
		document.getElementById("metacontent_"+id).style.display  = "block";
		
		
    },
	
	
    Form: function(e){
		var k = "";	 
        Forms.Clean("off", "mainbuttonok");

        if (e == null) {
            e = new Object();
            Forms.Form.off.type = "create";			
        } else {
            Forms.Form.off.type = "modify";
            Forms.Form.off.id = e.id;
        }
        this.ActiveForm = "off";

		k +='<div class="row">'
		k +='<div class="top-bar">'
		k +='<div class=" col-md-6 col-md-offset-6">'
		k +='<div class=" pull-right">'
		k +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="CMS.Main()"><i class="icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
		k +='</div>'
		<!--col-md-5-->
		k +='</div>'
		<!--top-bar-->
		k +='</div>'
		<!--row-->



		k +='<div class="panel panel-danger panel-no-border">'
		k +='<div class="panel-heading panel-heading">  '                  
		k +='<div class="row">'
		k +='<div class="col-md-6">'
		if (Forms.Form.off.type == "create") {
		k +='<h3 class="panel-title"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_CREATE_PAGE']?></h3>'
		}else{
		k +='<h3 class="panel-title"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_EDIT_PAGE']?></h3>'	
		}
		k +='</div>'
		<!--col-md-5-->                         
		k +='</div>'
		<!--row-->
		k +='</div>'
		k +='<div class="panel-body">'
		
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                CMS.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="CMS.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="CMS.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
		k +='</div>'
		k +='</div>'
        <!--row-->
		
		
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="row">'
		var g = "";
        var b;
        b = '{"id":"-1","caption":""},'       
        g = "[" + b + '{"id":"Panel1","caption":"Panel1"},{"id":"Panel2","caption":"Panel2"},{"id":"Panel3","caption":"Panel3"},{"id":"cmsshop","caption":"ShopforFresh"}]';
        g = JSON.parse(g);
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_FOOTER_COLUMN1']?></label>'
		k +=Forms.CreateSelectPropertyAdmin("off", "type", g, e.type, true,false, true,"CMS.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="type_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_GALLERY_TYPE_IS_REQUIRED']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_TITLE1']?></label>'
		
		Forms.CreateValue("off", "pagetitle", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.off.type == "create") {
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="pagetitle_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="pagetitle_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="pagetitle_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.pagetitle[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="pagetitle_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.pagetitle[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		k +='<small data-bv-validator="notEmpty" class="help-block" id="pagetitle_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_TITLE1_REQUIRED']?></small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="pagetitle_text1" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_TITLE1_REQUIRED_SPECIAL_CHARACTERS']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_CUSTOM_URL']?></label>'
		
		Forms.CreateValue("off", "customurl", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.off.type == "create") {
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="customurl_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="customurl_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="customurl_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.customurl[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="customurl_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.customurl[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//k +=Forms.CreateInputPropertyAdmin("off", "customurl", Main.NullToEmpty(e.customurl), false,"CMS.PreValidation()", false, false) 
		k +='<small data-bv-validator="notEmpty" class="help-block" id="customurl_text" style="color:#F00; display:none;"><?$lang_resource['ADMIN_PAGE_PANEL_CUSTOM_URL_SPECIAL_CHARACTERS']?></small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="customurl_text1" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_CUSTOM_URL_EXIST']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_HEADING1']?></label>'
		
		Forms.CreateValue("off", "pageheading", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.off.type == "create") {
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="pageheading_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="pageheading_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="pageheading_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.pageheading[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="pageheading_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.pageheading[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }

		k +='<small data-bv-validator="notEmpty" class="help-block" id="pageheading_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_PAGE_HEADING1_REQUIRED']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_PAGE_CONTENT']?></label>'
		
		/*Forms.CreateValue("off", "pagecontent", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
                if(flaginfo[p].id == CMS.langdefault){   
                    k+='<textarea id="pagecontent_'+flaginfo[p].id+'" name="pagecontent" class="undefined ckeditor" onkeyup="CMS.PreValidation()" cols="80" rows="10" style="visibility: hidden;"></textarea>'
                }else{
                    k+='<textarea id="pagecontent_'+flaginfo[p].id+'" name="pagecontent" class="undefined ckeditor" onkeyup="CMS.PreValidation()" cols="80" rows="10" style="visibility: hidden;display: none;"></textarea>'
                }   
               
        }*/
		
		//k+='<textarea id="pagecontent" name="pagecontent" class="undefined ckeditor" onkeyup="CMS.PreValidation()" cols="80" rows="10" style="visibility: hidden; display: none;"></textarea>'
		
		k +=Forms.CreateTextAreaPropertyCMS("off", "pagecontent",'', Main.NullToEmpty(e.pagecontent), true, "CMS.PreValidation()", false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="pagecontent_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_PAGE_CONTENT_REQUIRED']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-12-->
		k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_META_KEYWORDS']?></label>'
		
		Forms.CreateValue("off", "metakeyword", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.off.type == "create") {
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="metakeyword_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="metakeyword_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="metakeyword_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.metakeyword[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="metakeyword_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.metakeyword[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
	
		k +='<small data-bv-validator="notEmpty" class="help-block" id="metakeyword_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_META_KEYWORDS_REQUIRED']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_META_CONTENT']?></label>'
		
		Forms.CreateValue("off", "metacontent", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.off.type == "create") {
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="metacontent_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="metacontent_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == CMS.langdefault){   
                    k +='<input type="text" id="metacontent_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.metacontent[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="metacontent_'+flaginfo[p].id+'" class="form-control rounded" onkeyup="CMS.PreValidation()" value="'+Main.NullToEmpty(e.metacontent[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }

		k +='<small data-bv-validator="notEmpty" class="help-block" id="metacontent_text" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_CMS_META_CONTENT_REQUIRED']?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->
		k +='</div>'
		<!--col-md-12-->
		k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-3">'
		if (Forms.Form.off.type == "create") {
		k +='<button type="submit" class="btn btn-primary popup-submit-btn" onclick="CMS.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button>'
		}else{
		k +='<button type="submit" class="btn btn-primary popup-submit-btn" onclick="CMS.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE']?></button>'	
		}
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->                 
		k +='</div>'
		<!-- /.panel-body -->
		k +='</div>'

		$("#main").empty().append(k);


		CKEDITOR.replace( 'pagecontent',
			{
				filebrowserUploadUrl: "upload/upload.php"
			});
		CKEDITOR.instances['pagecontent'].on('change', function( event ) { 		
			CMS.PreValidation()
		});


		$(".ui-helper-hidden-accessible").hide();

		
    },
    PreValidation: function(){
        var count = 0;  
        if(document.getElementById("type").value == "-1"){
            $("#type_text").show();
            $("#type").addClass("error-text-field");
            $("#type").removeClass("success-text-field");
            count ++;
        }else{
            $("#type_text").hide();
            $("#type").addClass("success-text-field");
            $("#type").removeClass("error-text-field");
        }
        
		 flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == CMS.langdefault){ 
			
			if(document.getElementById("pagetitle_"+flaginfo[Z].id).value == ""){ 
				$("#pagetitle_text").show();
				$("#pagetitle_"+flaginfo[Z].id).addClass("error-text-field");
				$("#pagetitle_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#pagetitle_text").hide();	        	
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
			
			var curl = document.getElementById("customurl_"+flaginfo[Z].id).value;		
			if (/^[a-zA-Z0-9-]*$/.test(curl) == false ) {
				$("#customurl_text"+flaginfo[Z].id).show();
				$("#customurl_"+flaginfo[Z].id).addClass("error-text-field");
				$("#customurl_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#customurl_text"+flaginfo[Z].id).hide();        	
				$("#customurl_"+flaginfo[Z].id).addClass("success-text-field");
				$("#customurl_"+flaginfo[Z].id).removeClass("error-text-field");	       
			}
			
			if(document.getElementById("pageheading_"+flaginfo[Z].id).value == ""){
				$("#pageheading_text").show();
				$("#pageheading_"+flaginfo[Z].id).addClass("error-text-field");
				$("#pageheading_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#pageheading_text").hide();
				$("#pageheading_"+flaginfo[Z].id).addClass("success-text-field");
				$("#pageheading_"+flaginfo[Z].id).removeClass("error-text-field");
			}
			
			if(document.getElementById("metakeyword_"+flaginfo[Z].id).value == ""){
				$("#metakeyword_text").show();
				$("#metakeyword_"+flaginfo[Z].id).addClass("error-text-field");
				$("#metakeyword_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#metakeyword_text").hide();
				$("#metakeyword_"+flaginfo[Z].id).addClass("success-text-field");
				$("#metakeyword_"+flaginfo[Z].id).removeClass("error-text-field");
			}
			if(document.getElementById("metacontent_"+flaginfo[Z].id).value == ""){
				$("#metacontent_text").show();
				$("#metacontent_"+flaginfo[Z].id).addClass("error-text-field");
				$("#metacontent_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#metacontent_text").hide();
				$("#metacontent_"+flaginfo[Z].id).addClass("success-text-field");
				$("#metacontent_"+flaginfo[Z].id).removeClass("error-text-field");
			}
			
			
			}
			
			var pagetitledata = document.getElementById("pagetitle_"+flaginfo[Z].id).value;
            CMS.pagetitlelang[flaginfo[Z].id] = pagetitledata;
			
			if(document.getElementById("customurl_"+flaginfo[Z].id).value !=""){
				
				var customurldata = document.getElementById("customurl_"+flaginfo[Z].id).value.replace(/\s/g, '-').toLowerCase();
            	CMS.customurllang[flaginfo[Z].id] = customurldata;
			}
			
			
			
			var pageheadingdata = document.getElementById("pageheading_"+flaginfo[Z].id).value;
            CMS.pageheadinglang[flaginfo[Z].id] = pageheadingdata;
			
			var metakeywordsdata = document.getElementById("metakeyword_"+flaginfo[Z].id).value;
            CMS.metakeywordslang[flaginfo[Z].id] = metakeywordsdata;
			
			var metacontentdata = document.getElementById("metacontent_"+flaginfo[Z].id).value;
            CMS.metacontentlang[flaginfo[Z].id] = metacontentdata;
			
		}
		

        var data = CKEDITOR.instances.pagecontent.getData();
        if(data == ""){
            $("#pagecontent_text").show();
            $("#cke_pagecontent").addClass("error-text-field");
            $("#cke_pagecontent").removeClass("success-text-field");
            count ++;
        }else{
            $("#pagecontent_text").hide();
            $("#cke_pagecontent").addClass("success-text-field");
            $("#cke_pagecontent").removeClass("error-text-field");
        }
        
            
        if(count == 0)
            return true
        else 
            return false
    },
    Save: function () {
    	if(CMS.PreValidation() == false){
    		return false
    	}
		
		Forms.UpdateValue("off", "pagetitle", CMS.pagetitlelang,true);
		Forms.UpdateValue("off", "customurl", CMS.customurllang,true);
		Forms.UpdateValue("off", "pageheading", CMS.pageheadinglang,true);		
		Forms.UpdateValue("off", "metakeyword", CMS.metakeywordslang,true);
		Forms.UpdateValue("off", "metacontent", CMS.metacontentlang,true);
		

		
    	var data = CKEDITOR.instances.pagecontent.getData();	
		Forms.Form.off.fields.pagecontent.value =  data;		
		//delete Forms.Form.off.pagecontent;
		//Forms.Form.off.pagecontent = Forms.Form.off.fields.pagecontent.value.split("&").join("@@@");
		//delete Forms.Form.off.fields.pagecontent;
		for(var n in Main.languageinfo){			
			if(document.getElementById("customurl_"+Main.languageinfo[n].id).value == ''){
				CMS.customurllang[Main.languageinfo[n].id] = document.getElementById("pagetitle_"+Main.languageinfo[n].id).value.replace(/\s/g, '-').toLowerCase()
				Forms.Form.off.fields.customurl.value = CMS.customurllang
				//Forms.Form.off.fields.customurl.value = Forms.Form.off.fields.customurl.value.toLowerCase()
			}
		}
		
		/*if(Forms.Form.off.fields.customurl.value == ''){		
			Forms.Form.off.fields.customurl.value = Forms.Form.off.fields.pagetitle.value.replace(/\s/g, '-')
			Forms.Form.off.fields.customurl.value = Forms.Form.off.fields.customurl.value.toLowerCase()
		}*/		

		for(var s in Forms.Form.off.fields){	
		
			Forms.Form.off.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.off.fields[s].value)))
			Forms.Form.off.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.off.fields[s].ivalue)))
			Forms.Form.off.fields[s].value = Forms.Form.off.fields[s].value.split("+").join("@@");
			Forms.Form.off.fields[s].ivalue = Forms.Form.off.fields[s].ivalue.split("+").join("@@");

		} 
		
		Main.Loading();
		$.post("lib/panel_cms.php", "f=CheckCustomUrl&data=" + JSON.stringify(Forms.Form.off), function (d) {		
			Main.Ready();
			if(d != 'ok'){					
				$("#customurl_text1").show();
				$("#customurl").addClass("error-text-field");
				$("#customurl").removeClass("success-text-field");
				return false
				
				for(var s in Forms.Form.off.fields){	
					Forms.Form.off.fields[s].value  = decodeURIComponent(escape(window.atob(Forms.Form.off.fields[s].value)))
					Forms.Form.off.fields[s].ivalue  = decodeURIComponent(escape(window.atob(Forms.Form.off.fields[s].ivalue)))
					Forms.Form.off.fields[s].value = Forms.Form.off.fields[s].value.split("@@").join("+");
					Forms.Form.off.fields[s].ivalue = Forms.Form.off.fields[s].ivalue.split("@@").join("+");
				}
	        }else{
	        	$("#customurl_text1").hide();        	
	            $("#customurl").addClass("success-text-field");
	            $("#customurl").removeClass("error-text-field");	       
	        }		
		});
		Main.Loading();
		$.post("lib/panel_cms.php", "f=SaveFooter&data=" + JSON.stringify(Forms.Form.off), function (b) {
			Main.Ready();
			CMS.Main();
		});
    },
    Delete: function () {
		var b = Main.GetMarkedCheckBoxesValues();
		if (b.length == 0) {
			alert("Please Select atleast One item");
			return
		}
		var a = new Object();
		a.ids = b;	
		$.fn.jAlert({
			'message': 'Are you sure want to delete this Item?',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/panel_cms.php", "f=DeleteAd&data=" + JSON.stringify(a), function (e) {
						CMS.Main()
						alert('Deleted Permanently');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false			
		});			     
    }
};