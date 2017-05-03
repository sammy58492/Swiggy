var Languagesettings = {
    Main: function (){		
		Main.Loading();
		Languagesettings.galleryflag = false;
        var a = new Date().getTime();		
        Main.Aid = a;

        $.post("lib/panel-configs.php", "f=GetLangConfig", function (b) {      
            if (a != Main.Aid) {
                return
            }
            Main.Ready();		
			if (b != "") {				
				Main.Config.language = new Object();
                Main.Config.language.List = new Object();
				Languagesettings.language = JSON.parse(b);
				Languagesettings.PrintMain()
			} else {
                alert("Error")
            }
		})
	},

	PrintMain: function () {
        var c = "";	
		c+='<div class="row">'
        c+='<div class="top-bar">'                        
        c+='<div class=" col-md-6 col-md-offset-6">'                       
        c+='<div class=" pull-right">'                           
        c+='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
        c+='</div>'<!--col-md-5-->
        c+='</div>'<!--top-bar-->
        c+='</div>'<!--row-->

		c+='<div class="panel panel-danger panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'                    
        c+='<div class="row">'
        c+='<div class="col-md-4">'
        c+='<h3 class="panel-title-2"><?=$lang_resource['CONTROL_PANEL_MENU_CONFIG_SUBMENU2']?></h3>'
        c+='</div>'<!--col-md-6-->
        c+='<div class="col-md-3">'
        c+='<div class="panel-btn filtr_margin">'
        c+='<input type="text" class="form-control rounded panel-red-field white-placeholder" id="search" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+='</div>'
        c+='</div>'<!--col-md-3-->
        c+='<div class="col-md-5">'
		c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'
        c+='<span class=" panel-btn-2">'
       c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Languagesettings.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Languagesettings.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c+='</span>' 
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Languagesettings.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'                  
        c+='</div>'<!--inline-popups-->
		       
        c+='</div>'
        c+='</div>'<!--col-md-4-->                            
        c+='</div>'<!--row-->
        c+='</div>'

        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
        c+='<th width="10%" onclick="Languagesettings.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
		c+='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
        c+='<th width="20%"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE']?></th>'
		c+='<th width="20%"><?=$lang_resource['ADMIN_PAGE_LANGUAGE_SHORT_CODE']?></th>'
        c+='<th width="15%"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_FLAG']?></th>'
        c+='<th width="20%"><?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_CITY_OPTION1']?></th>'
        c+='<th width="10%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_ENABLE']?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="language_code">'    
      //  c+='For demo purposes adding and edit language is not possible, our system works on any language including arabic, chinese and any special characters.'    										
        c+='</tbody>'
        c+='</table>'
        c+='</div>'<!--table-responsive-->
        c+='</div>'<!-- /.panel-body -->
        c+='</div>'		
               
        document.getElementById("main").innerHTML = c;
        $("#ga").focus()
	
		document.getElementById("search").onkeyup = function () {
			
          Languagesettings.PupulateTable(Main.Config.language.List.SortBy, true)
        };
		Languagesettings.PupulateTable(Main.Config.language.List.SortBy, true)
	},

    PupulateTable: function (a, c) {      
        var d = "";

        if (c) {
            this.language.sort(Main.SortByProperty(a));
            if (Main.Config.language.List.SortByStatus == "max") {
                this.language.reverse()
            }
        } else {
            if (Main.Config.language.List.SortBy != a) {
                this.language.sort(Main.SortByProperty(a));
                Main.Config.language.List.SortByStatus = "min"
            } else {
                this.language.reverse();
                if (Main.Config.language.List.SortByStatus == "min") {
                    Main.Config.language.List.SortByStatus = "max"
                } else {
                    Main.Config.language.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.language.List.SortBy = a;
	
        if (!c) {
            Main.SaveConfig()
        }
		
        var j = false;
        var g = "";
        var l = new Array();
	
		for (var e in this.language) {
				
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.language[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.language[e].lang_text).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.language[e].lang_short_code).toLowerCase().indexOf(g) >= 0) {
			    j = true;
                l.push(this.language[e])
				
            }
            if (j) {
                d+='<tr>'
                d+='<td>'+ this.language[e].id +'</td>'
                d+='<td><input type="checkbox" class="checkbox" value="' + this.language[e].id + '"></td>'
                d+='<td class="hand" onClick="Languagesettings.Edit(' + this.language[e].id + ')">' + Main.NullToEmpty(this.language[e].lang_text) + '</td>'
                d+='<td class="hand" onClick="Languagesettings.Edit(' + this.language[e].id + ')">' + Main.NullToEmpty(this.language[e].lang_short_code) + '</td>'

                if(this.language[e].isimg == 0){
                    var p = "images/dummy/default-flag.jpg";
                }else{
                    var p = "../panel/images/lang/" + Main.NullToEmpty(this.language[e].id) + "/1/mini.jpg?c=" + new Date().getTime();
                }
                
                d+='<td><img src="'+p+'" style="width:33px;height:21px;"></td>'
                if(this.language[e].opdefault == 1){
                     Languagesettings.langdefault = this.language[e].id;
                    d+='<td><input type="radio" id="langus_'+this.language[e].id+'" name="lang" value="'+this.language[e].id+'" checked>'
					d+='<label for="langus_'+this.language[e].id+'">&nbsp;</label></td>'
					
                }else{
                    d+='<td><input type="radio" id="langus_'+this.language[e].id+'" name="lang" value="'+this.language[e].id+'">'
					d+='<label for="langus_'+this.language[e].id+'">&nbsp;</label></td>'
                }
                d+='<td><div class="enebal"><span class="caption"><div id="switch_' + this.language[e].id + '"></div></span></div></td>'
                d+='</tr>'
            }           
        }
	
        document.getElementById("language_code").innerHTML = d;
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
                Languagesettings.SetEnabled(m.replace("switch_", ""), i)
            })
        }

        $(function() {
            $('input:radio[name="lang"]').change(function() {
					
               		Languagesettings.SetDefault($(this).val()); 
				
            });
        });
    },
	
	SetDefault: function(val){	
			
    	$.post("lib/panel-configs.php", "f=SetDefault&id="+ val, function(h){
			if(h=='f'){
			alert("<?=$lang_resource['ADMIN_SETDEFAULT_PERMISSION']?>");
			Languagesettings.Main()	
			return
			}
            $.post("lib/panel-bulk.php", 'data=[{"operation":"GetManagelangConfig"}]', function (a) {
                Main.languageinfo = JSON.parse(a).languageinfo;
				
            });
			Languagesettings.Main()		
    	})	
		
	},
	
	
	SetEnabled: function (b, a) {		
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/panel-configs.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {  
		
			if(c==1){
			alert("<?=$lang_resource['ADMIN_SETDEFAULT_PERMISSION']?>");
			Languagesettings.Main()
			return
			
			}else if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            } 
			
			Languagesettings.Main()
        });
		
    },
	
	
	New: function () {   
        var a = this;
        $.post("lib/panel-configs.php", "f=GetLangConfig", function (b) {
            Languagesettings.restaurants = JSON.parse(b);
        });
        Main.GetFranchisesData("Languagesettings.Form()")
    },
	Edit: function (a) {
		
		$('div[id*=newpopup]').remove();
		
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
            	alert("<?=$lang_resource['DISCOUNT_CODES_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['DISCOUNT_CODES_SELECT_EDIT']?>");
                return
            }
			
				
        } 
		if (a == Languagesettings.langdefault) {
			alert("<?=$lang_resource['ADMIN_EDIT_PERMISSION']?>");
            return
        }
		
		if (d) {
            Main.Loading();
		    
			var gk = new Date().getTime();
			Main.Aid = gk;
		     $.post("lib/panel-configs.php", "f=FetchLanguagesettingsData&id=" + a, function (b) {
				
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				Languagesettings.PreEdit(b);
				
			 });
        }
    },
	
	PreEdit: function (a) {
	
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
	
		
		
        this.Form(a);
		   
    },
	
	
	Form: function (e) {		
		
        Forms.Clean("lang", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.lang.type = "create"
        } else {
            Forms.Form.lang.type = "modify";
            Forms.Form.lang.id = e.id
			global_lang_short_code = e.lang_short_code;
			global_lang_text = e.lang_text;
			
        }
		 Forms.Form.lang.lang = e;
        this.ActiveForm = "ad";
		
         var k = "";
       if (Forms.Form.lang.type == "create") {
	    
        k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_CREATE_LANGUAGE_SETTING']?></h3>'
	   }
	   else
	   {
		k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_UPDATE_LANGUAGE_SETTING']?></h3>'   
	   }
	   
        k += '<div class="flage_wrapper">'
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_LANGUAGE_SHORT_CODE1']?></label>'
        k +=Forms.CreateInputPropertyPopup("lang", "lang_short_code", e.lang_short_code, true, "Languagesettings.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="lang_short_code_text" style="color:#F00;display:none;"><?=$lang_resource['LANGUAGE_SETTINGS_VALIDATION_LANGUAGE_SHORT_CODE']?></small>'
        k += '</div>'
        k += '</div>'<!--col-md-12-->
        k += '</div>'<!--row-->
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_LANGUAGE1']?></label>'
        k +=Forms.CreateInputPropertyPopup("lang", "lang_text", e.lang_text, true, "Languagesettings.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="lang_text_text1" style="color:#F00;display:none;"><?=$lang_resource['LANGUAGE_SETTINGS_VALIDATION_LANGUAGE']?></small>'
        k += '</div>'
        k += '</div>'<!--col-md-12-->
        k += '</div>'<!--row-->
		
		
        k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?=$lang_resource['ADMIN_PAGE_UPLOAD_LANGUAGE1']?></label>'
        k += '<div class="input-group">'
		k +='<input type="text" class="form-control" id="imagefile10" readonly>'
		//k += '<input type="text" class="form-control" readonly>'
		k += '<span class="input-group-btn">'
		k += '<span class="btn btn-default btn-file btn-light rounded">'
		
		k +='<form id="uform_bimg10" name="uform_bimg10" enctype="multipart/form-data" method="post" >';
		k +='Upload<input id="uploadImage10" type="file" name="uploadImage" onChange="Languagesettings.PreviewImage(10);" >'
		k += '<input id="showImage10" name="showImage10" type="hidden" value=""  />';
		k += '<input type="submit" name="submit" onclick="Languagesettings.triggerImageupload(10)" style="display:none" />';
		k += '</form>';
		
		
		
		/*
		k +='Browse… <input type="file" name="">'*/
		k += '</span>'
		k += '</span>'
		k += '</div>'
		k +='<small style="font-weight:400; "><?=$lang_resource['ADMIN_PAGE_LANGUAGE_UPLOAD_IMAGE_SIZE']?></small>'
		var m = "";
        if (e.id) {
		  if(e.isimg == 0) {
		  	m = "images/dummy/default-flag.jpg";
		  } else {
			Languagesettings.galleryflag = false;  
		  	m = "../panel/images/lang/" + Main.NullToEmpty(e.id) + "/1/panel.jpg?c=" + new Date().getTime();
		  }
		}else {
		  m = "images/dummy/default-flag.jpg";
    	}
		k +='<span class=" clearfix logoupload-2"><img class="user-img" id="uploadPreview10" src="' + m + '"  ></span>'
		
        k += '</div>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="user_img_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_LANGUAGE_UPLOAD_IMAGE_REQUIRED']?></small>'
        k += '</div>'<!--col-md-12-->
        k += '</div>'<!--row-->
        k += '</div>'<!--flage_wrapper-->
        k += '<div class="row">'
        k += '<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.lang.type == "create") {
        k +=  '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Languagesettings.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button></center>'
		}
		else
		{
		k +=  '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Languagesettings.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE']?></button></center>'	
		}
		
        k += '</div>'<!--col-md--->
        k += '</div>'<!--row-->
            
		 
		Popup.Show(k);
	  $("#name").focus()
    },
	PreValidation: function(){
   	var count = 0;	
    
    	if(document.getElementById("lang_short_code").value == ""){
            $("#lang_short_code_text").show();
            $("#lang_short_code").addClass("error-text-field");
            $("#lang_short_code").removeClass("success-text-field");
            count ++;
        }else{
        	$("#lang_short_code_text").hide();
            $("#lang_short_code").addClass("success-text-field");
            $("#lang_short_code").removeClass("error-text-field");
        }
        
        if(document.getElementById("lang_text").value == ""){
            $("#lang_text_text1").show();
            $("#lang_text").addClass("error-text-field");
            $("#lang_text").removeClass("success-text-field");
            count ++;
        }else{
        	$("#lang_text_text1").hide();
            $("#lang_text").addClass("success-text-field");
            $("#lang_text").removeClass("error-text-field");
        }
		
		 if(Languagesettings.galleryflag == false && Forms.Form.lang.type == "create"){
            
            $("#user_img_text").show();
            $(".user-img").addClass("error-text-field");
            $(".user-img").removeClass("success-text-field");
            count ++;
        }else{
            $("#user_img_text").hide();
            $(".user-img").addClass("success-text-field");
            $(".user-img").removeClass("error-text-field");
        }
		
		
		
		
        
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
	
	
	
	Save: function () {	
	     var language_short_code = document.getElementById("lang_short_code").value;
		  var language_text = document.getElementById("lang_text").value;
	      var length=Languagesettings.language.length;
		  //alert(language_text.toLowerCase())
		 var i="";
		  for(i=0;i<length;i++){
			  if((Languagesettings.language[i].lang_short_code.toLowerCase() == language_short_code.toLowerCase()) && (global_lang_short_code.toLowerCase() != language_short_code.toLowerCase())){
                      alert("<?=$lang_resource['LANGUAGE_KEY_EXIST1']?>");
                      return false  
                   } 
                   else if((Languagesettings.language[i].lang_text.toLowerCase() == language_text.toLowerCase()) && (global_lang_text.toLowerCase() != language_text.toLowerCase())){
                    alert("<?=$lang_resource['LANGUAGE_EXIST1']?>");
                    return false  
                  } 
             

			  
			 /* if(Languagesettings.language[i].lang_short_code.toLowerCase() == language_short_code.toLowerCase()){
				      alert("<?=$lang_resource['LANGUAGE_KEY_EXIST1']?>");
					  return false  
				   } 
				   else if(Languagesettings.language[i].lang_text.toLowerCase() == language_text.toLowerCase()){
				    alert("<?=$lang_resource['LANGUAGE_EXIST1']?>");
					return false  
				  } */
			  } 
		if(Languagesettings.PreValidation() != true){
            return false     
        }
        if(document.getElementById("showImage10").value !="") {		
			Forms.Form.lang.image = document.getElementById("showImage10").value;
		}
	    var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();
		
	    $.post("lib/panel-configs.php", "f=SaveLanguage&data=" + JSON.stringify(Forms.Form.lang), function (f){
		    $.post("lib/panel-bulk.php", 'data=[{"operation":"GetManagelangConfig"}]', function (a) {
                Main.languageinfo = JSON.parse(a).languageinfo;
                Main.Ready();
                if (b != Main.Aid){
                    return;
                }
                Popup.Close();
                Languagesettings.Main()
            });            
		});	
        Forms.Clean("lang")
    },
	
	 Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("<?=$lang_resource['DISCOUNT_CODES_CHECBOX_SELECT']?>");
            return
        }
		
		if (b[0] == 1) {
			alert("<?=$lang_resource['ADMIN_DELETE_PERMISSION']?>");
            return
        }

		
        var a = new Object();
        a.ids = b;

		
		$.fn.jAlert({
			'message': '<?=$lang_resource['DISCOUNT_CODES_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/panel-configs.php", "f=DeleteLangsetting&data=" + JSON.stringify(a), function (e) {
						Languagesettings.Main()
						alert('<?=$lang_resource['DISCOUNT_CODES_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
		
		
       // Main.Request("discountcode", null, "f=DeleteAd&data=" + JSON.stringify(a), "DiscountCode.Main()")
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
              
			  document.getElementById("showImage"+no).value = html
			   
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
 		});
		 },
		 
	PreviewImage: function(no) {
		 
		 document.getElementById("uploadPreview"+no).src ="";
		
		$('form#uform_bimg'+no).find('input[type="submit"]').trigger('click');
		 
           var oFReader = new FileReader();
		
           oFReader.readAsDataURL(document.getElementById("uploadImage"+no).files[0]);
           oFReader.onload = function (oFREvent) {
			 //  alert(oFREvent.target.result)
			   
            document.getElementById("uploadPreview"+no).src = oFREvent.target.result;
		    document.getElementById("imagefile"+no).value = document.getElementById("uploadImage"+no).files[0].name;
			Languagesettings.galleryflag = true;
			Languagesettings.PreValidation()
			
        };
		
    },
	
	
	
};