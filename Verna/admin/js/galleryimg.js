var GalleryImg = {
    Main: function () {
		GalleryImg.namelang = Array();
        if(Business.id){
            Main.Loading();
            var a = new Date().getTime();
            Main.Aid = a;
            GalleryImg.galleryflag = false;
            $.post("lib/galleryimg.php", "f=FetchAllAdsDataByID&id="+Business.id, function (b) {
                
                if (a != Main.Aid) {
                    return
                }
                Main.Ready();
                if (b != "") {
                    GalleryImg.GalleryImg = JSON.parse(b);
                    
                    Main.Config.GalleryImg = new Object();
                    Main.Config.GalleryImg.List = new Object();
                    Main.Config.GalleryImg.List.SortBy = "id";
                    Main.Config.GalleryImg.List.SortByStatus = "min";
                    GalleryImg.PrintMain()
                } else {
                    alert("Error")
                }
            })
        }else{
            var N=''
            N += '<div class="col-md-12">'
            N += '<div class="the-box">'
            N += '<div class="clearfix" style="padding:5px 0">'
            N +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_GALLERY_BUSINESS_CREATE']?>t</p>'
            N += '</div></div></div>'
            document.getElementById("tab_image_video").innerHTML = N;
        }
    },
    PrintMain: function () {
        var c = "";
        
        
        c +='<div class="panel panel-danger panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'                    
        c +='<div class="row">'
        c +='<div class="col-md-4">'
        c +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_GALLERY_IMAGE_VIDEO']?></h3>'
        c +='</div>'<!--col-md-5-->
                            
        c += '<div class="col-md-3">'
        c +='<div class="panel-btn filtr_margin">'
        c +='<input type="text" class="form-control rounded panel-red-field white-placeholder" id="search" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter']?>">'
        c +='</div>'
        c +='</div>'<!--col-md-3-->
                            
        c +='<div class="col-md-5">'
        c +='<div class="panel-btn pull-right">'
                  
        c +='<div class="inline-popups ">'
                                                    
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:GalleryImg.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_ADD']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:GalleryImg.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_EDIT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="GalleryImg.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_DELETE']?></button></span>'
                        
        c +='</div>'
                            
          
       c +='</div>'
       c +='</div>'<!--col-md-4-->
                            
       c +='</div>'<!--row-->

       c +='</div>'
       c +='<div class="panel-body">'
       c +='<div class="table-responsive">'
       c +='<table class="table table-th-block table-striped tbl_enebal">'
       c +='<thead>'
       c +='<tr>'
       c +='<th width="7.5%" onclick="GalleryImg.PupulateTable(\'id\')" ><?=$lang_resource['ADMIN_PAGE_COUNTRY_ID']?></th>'
       c +='<th width="7.5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['ADMIN_PAGE_DRIVER_ALL']?></th>'
       c += '<th width="20%"><?=$lang_resource['ORDER_DETAILS_BUYER_NAME']?></th>'
       c +='<th width="20%"><?=$lang_resource['ORDER_DETAILS_RESERVE_TYPE']?></th>'
       c +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_DRIVER_ENABLE']?></th>'
       c +='</tr>'
       c +='</thead>'
       c +='<tbody id="ads">'
                                            
       c +='</tbody>'
       c +='</table>'
       c +='</div>'<!--table-responsive-->

       c +='</div>'<!-- /.panel-body -->
       c +='</div>'
        
    
        
        document.getElementById("tab_image_video").innerHTML = c;

        document.getElementById("search").onkeyup = function () {
            GalleryImg.PupulateTable(Main.Config.GalleryImg.List.SortBy, true)
        };
       GalleryImg.PupulateTable(Main.Config.GalleryImg.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
        
        var d = "";
        var b = this.GalleryImg.length;
        if (c) {
            this.GalleryImg.sort(Main.SortByProperty(a));
            if (Main.Config.GalleryImg.List.SortByStatus == "max") {
                this.GalleryImg.reverse()
            }
        } else {
            if (Main.Config.GalleryImg.List.SortBy != a) {
                this.GalleryImg.sort(Main.SortByProperty(a));
                Main.Config.GalleryImg.List.SortByStatus = "min"
            } else {
                this.GalleryImg.reverse();
                if (Main.Config.GalleryImg.List.SortByStatus == "min") {
                    Main.Config.GalleryImg.List.SortByStatus = "max"
                } else {
                    Main.Config.GalleryImg.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.GalleryImg.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
        
        for (var e in this.GalleryImg) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.GalleryImg[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.GalleryImg[e].name).toLowerCase().indexOf(g) >= 0 ) {
                j = true;
                l.push(this.GalleryImg[e])
            }
            if (j) {

                d +='<tr>'
                d += '<td  onclick="GalleryImg.Edit(' + this.GalleryImg[e].id + ')"  class="caption hand">'+ this.GalleryImg[e].id +'</td>'
                d += '<td><input type="checkbox" class="checkbox" value="' + this.GalleryImg[e].id + '"/></td>'
                d += '<td onclick="GalleryImg.Edit(' + this.GalleryImg[e].id + ')" class="caption hand">'+ Main.NullToEmpty(this.GalleryImg[e].name) +'</td>'
                d +='<td class="caption">'
                if(Main.NullToEmpty(this.GalleryImg[e].type)=="0"){
                d +='Image';
                }
                else if(Main.NullToEmpty(this.GalleryImg[e].type)=="1"){
                d +='Video';
                }
                else if(Main.NullToEmpty(this.GalleryImg[e].type)=="2"){
                d +='Header';
                }
                d +='</td>'
                d +='<td><div class="enabled"><span class="caption"><div id="galleryswitch_' + this.GalleryImg[e].id + '"></div></span></div></td>'
                d +='</tr>'     
            }
        }
        
        document.getElementById("ads").innerHTML = d;
        var h = false;
        Switch.Init();
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("galleryswitch_" + l[e].id, h);
            Switch.OnChange("galleryswitch_" + l[e].id, function (m, i) {
                GalleryImg.SetEnabled(m.replace("galleryswitch_", ""), i)
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
        $.post("lib/galleryimg.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("galleryswitch_" + b, !a)
            }
        })
    },
    New: function () {
        $('div[id*=newpopup]').remove();
        var a = this;
        Main.GetFranchisesData("GalleryImg.Form()")
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
                alert("<?=$lang_resource['AUTOMATIC_DISCOUNT_SELECT_ONE']?>");
                return
            }else{
                alert("<?=$lang_resource['AUTOMATIC_DISCOUNT_SELECT_EDIT']?>");
                return
            }
            
            
        } if (d) {
            var b = this;
            Main.Loading();
            Main.BulkRequest('data=[{"operation":"FetchEdData","id":"' + a + '"}]', "GalleryImg.PreEdit")
            
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error")
        }
        
        a = JSON.parse(a);
      
        this.Form(a.ed)
    },
	
	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("gname_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("gname_"+id).style.display  = "block";
    },
	
    Form: function (e) {
       
        var k = "";
       
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
        }

        Forms.CreateValue("ad", "business", Business.id, false);
        
       
        if(Forms.Form.ad.type == "create"){    
       
        k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_GALLERY_CREATE_GALLERY']?></h3>'
        }
        else
        {
        k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_GALLERY_EDIT_GALLERY']?></h3>'   
        }
		
		k +='<div class="row">'
		k +='<ul class="pop_lang_img">'
		flaginfo=Main.languageinfo;
		for(Z in flaginfo){
			var m = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
				GalleryImg.langdefault = flaginfo[Z].admindefaulelang;                             
				k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="GalleryImg.show_id('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'
			}else{
				k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="GalleryImg.show_id('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'  
			}
		}
		k +='</ul>'
		k +='</div>'
		<!--row-->
		
        k +='<div class="row">'
        k +='<div class="col-md-6">'
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_CATEGORY_NAME']?> *</label>'
		
		Forms.CreateValue("ad", "name", "",true)
		flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if (Forms.Form.ad.type == "create") {
                if(flaginfo[v].id == GalleryImg.langdefault){   
                    k +='<input type="text" id="gname_'+flaginfo[v].id+'" onkeyup="GalleryImg.PreValidation()" class="form-control"  value="" />' 
                }else{
                    k +='<input type="text" id="gname_'+flaginfo[v].id+'" onkeyup="GalleryImg.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[v].id == GalleryImg.langdefault){   
                    k +='<input type="text" id="gname_'+flaginfo[v].id+'" onkeyup="GalleryImg.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[v].id])+'" />' 
                }else{
                    k +='<input type="text" id="gname_'+flaginfo[v].id+'" onkeyup="GalleryImg.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[v].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
        //k += Forms.CreateInputPropertyPopup("ad", "gname", e.name, true,"GalleryImg.PreValidation()", "", "", "")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="galleryname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_GALLERY_NAME_IS_REQUIRED']?></small>'
        k +='</div>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
         var g = "";
        var b;
        if (Forms.Form.ad.type == "modify") {
            b = ""
        } else {
            b = '{"id":"","caption":""},'
        }
        g = "[" + b + '{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_GALLERY_VIDEO']?>"},{"id":"0","caption":"<?=$lang_resource['ADMIN_PAGE_GALLERY_IMAGE']?>"}]';
        g = JSON.parse(g);
        
        
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_GALLERY_TYPE']?> *</label>'
        k +=Forms.CreateSelectPropertyPopup("ad", "type", g, e.type, true, "GalleryImg.PreValidation();GalleryImg.TypeChanged(this)", true)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="type_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_GALLERY_TYPE_IS_REQUIRED']?></small>'
        k +='</div>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
		if (Forms.Form.ad.type == "modify" && e.type==1) {
        k +='<div class="row" id="displaylink" style="display:block;">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['GALLERY_LINK']?></label>'
        k += Forms.CreateTextAreaPropertyGalleryPopup("ad", "link", e.link)       
        k +='</div>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
		}else{
		k +='<div class="row" id="displaylink" style="display:none;">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['GALLERY_LINK']?></label>'
        k += Forms.CreateTextAreaPropertyGalleryPopup("ad", "link", e.link)       
        k +='</div>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->	
		}
       
        k +='</div>'<!--col-md-6-->
         
         
         var c = "";
        if (e.id) {
            if (e.type != 1) {
                GalleryImg.galleryflag = true;              
                c = "../panel/images/gallery/" + Main.NullToEmpty(e.id) + "/gallery.jpg?c=" + new Date().getTime();
            } else {
                c = "../admin/images/dummy/gallery-img.png";
            }
        }else {
                c = "../admin/images/dummy/gallery-img.png";
        }
        
        k +='<div class="col-md-6">'
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<small style="font-weight:400">Size 250 px * 250 px max. PNG or JPG files.</small>'
        k +='<div class="form-control user-img">'        
        k += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >';
        k += '<input id="uploadImage" type="file"  class="user_pic"  name="uploadImage" onChange="GalleryImg.PreviewImage();" >'
        k += '<input id="showImage" name="showImage" type="hidden" value=""  />';
        k += '<input type="submit" name="submit" onclick="GalleryImg.triggerImageupload()" style="display:none" />';
        k += '</form>'
        k +='<img id="uploadPreview" src="' + c + '"  >'
        k +='</div>'
        k +='<small data-bv-validator="notEmpty" class="help-block" id="user_img_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_GALLERY_IMAGE_UPLOAD_REQUIRED']?></small>'
        
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
        
        k +='</div>'<!--col-md-6-->
        k +='</div>'<!--row-->            
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
        
         if(Forms.Form.ad.type == "create"){
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="GalleryImg.Save()"><?=$lang_resource['ADMIN_PAGE_GALLERY_CREATE']?></button></center>'
         }
         else
            {
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="GalleryImg.Save()"><?=$lang_resource['ADMIN_PAGE_GALLERY_UPDATE']?></button></center>'
            }
            
        k +='</div>'
        <!--col-md--->
        k +='</div>'
        <!--row-->
            
       
       Popup.Show(k);

       Forms.CreateValue("ad", "name", "", false);
       
        $("#name").focus()
    },
    TypeChanged: function (a) {
		
		
		var g=a.value;
		//alert(g);
		if(g==1)
		{
			document.getElementById("displaylink").style.display="block";	
		}
		else
		{
			document.getElementById("displaylink").style.display="none";	
		}
       
        switch (a.options[a.selectedIndex].value) {
        case "0":
            document.getElementById("uploadImage").disabled = false;
            break;
        case "1":
            document.getElementById("uploadImage").disabled = true;
            break
         case "2":
            document.getElementById("uploadImage").disabled = false;
            break
        }
        
    },
   
    
    PreValidation: function(){
        
    var count = 0;  
    	
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == GalleryImg.langdefault){
    	if(document.getElementById("gname_"+flaginfo[Z].id).value == ""){
            $("#galleryname_text").show();
            $("#gname_"+flaginfo[Z].id).addClass("error-text-field");
            $("#gname_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#galleryname_text").hide();
            $("#gname_"+flaginfo[Z].id).addClass("success-text-field");
            $("#gname_"+flaginfo[Z].id).removeClass("error-text-field");
        }		
		       
		}
		
			var namedata = document.getElementById("gname_"+flaginfo[Z].id).value;
            GalleryImg.namelang[flaginfo[Z].id] = namedata;
			
	}
	
	if(document.getElementById("type").value == ""){
            
            $("#type_text").show();
            $("#type").addClass("error-text-field");
            $("#type").removeClass("success-text-field");
            count ++;
        }else{
            $("#type_text").hide();
            $("#type").addClass("success-text-field");
            $("#type").removeClass("error-text-field");
        }
        
        if((document.getElementById("type").value == 0 || document.getElementById("type").value == 2) &&  GalleryImg.galleryflag == false){
            
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
        
        
        if(GalleryImg.PreValidation() != true){
            return false     
         }
        
        /*if (Forms.CanSave("ad") == false) {
            return
        }*/
        
        Forms.UpdateValue("ad", "name", GalleryImg.namelang,true);

        var link1 = Forms.Form.ad.fields.link.value;
        
        if(link1 != ""){
        
        Forms.Form.ad.fields.link.value = "";
        link1 = link1.split("&");
        }
        delete Forms.Form.ad.fields.link;
        Forms.Form.ad.fields.name.save =true;
        
        if ( document.getElementById("showImage")) {
            Forms.Form.ad.image =  document.getElementById("showImage").value
        }
        
		for(var s in Forms.Form.ad.fields){			
			Forms.Form.ad.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].value)))
			Forms.Form.ad.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].ivalue)))

            Forms.Form.ad.fields[s].value = Forms.Form.ad.fields[s].value.split("+").join("@@");
            Forms.Form.ad.fields[s].ivalue = Forms.Form.ad.fields[s].ivalue.split("+").join("@@");
		}
        Main.Request("galleryimg", null, "f=SaveAd&data="+JSON.stringify(Forms.Form.ad)+"&link="+link1, "GalleryImg.Main()");
        
        Popup.Close();
        
        Forms.Clean("ad")
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            alert("<?=$lang_resource['AUTOMATIC_DISCOUNT_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
        
        $.fn.jAlert({
            'message': '<?=$lang_resource['AUTOMATIC_DISCOUNT_DELETE_PRODUCT']?>',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                    $.post("lib/galleryimg.php", "f=DeleteAd&data=" + JSON.stringify(a), function (e) {
                        GalleryImg.Main()
                        alert('<?=$lang_resource['AUTOMATIC_DISCOUNT_WARNING_DELETE_PERMANENTLY']?>');
                    
                    });
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false
            
            });
        
        
    },
    
    
    triggerImageupload: function() {
        
         $("#uform_bimg").submit(function (event) {
             
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
               
              document.getElementById("showImage").value = html
               
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
        });
    },
    
    PreviewImage: function() {
        
         document.getElementById("uploadPreview").src ="";
          
        $('form#uform_bimg').find('input[type="submit"]').trigger('click');
           var oFReader = new FileReader();
        
           oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
           oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
            //document.getElementById("imagefile").value = document.getElementById("uploadImage").files[0].name;
             GalleryImg.galleryflag = true;
            GalleryImg.PreValidation()
        };
        
    },
    
};
