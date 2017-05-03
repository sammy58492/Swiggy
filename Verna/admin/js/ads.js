var Ads = {
    Main: function () {
		Ads.namelang = Array();
        Main.Loading();
        var a = new Date().getTime();
		Main.Aid = a;
        $.post("lib/ads.php", "f=FetchAllAdsData", function (b) {
          if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                Ads.Ads = JSON.parse(b);
                Ads.PrintMain()
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function () {

	  var c = "";
  
	  c +='<div class="row">'
	  c +='<div class="top-bar">'
	  c +='<div class=" col-md-6 col-md-offset-6">'
	  c +='<div class=" pull-right">'
	  c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource['ADMIN_PAGE_CANCEL'] ?></button>'
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-5-->
	  
	  c +='</div>'
	  <!--top-bar-->
	  c +='</div>'
	  <!--row-->
	  
	  
	  c +='<div class="panel panel-danger panel-square panel-no-border">'
	  c +='<div class="panel-heading panel-heading-2">'
	  c +='<div class="row">'
	  c +='<div class="col-md-4">'
	  c +='<h3 class="panel-title-2"><?=$lang_resource['ADVERTISEMENT_HEADING']?></h3>'
	  c +='</div>'
	  <!--col-md-5--> 
	  c +='<div class="col-md-3">'
	  c +='<div class="panel-btn filtr_margin">'
	  c +='<input type="text" id="asearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-3-->
	  c +='<div class="col-md-5">'
	  c +='<div class="panel-btn pull-right">'
	  c +='<div class="inline-popups ">'
	  c +='<span class=" panel-btn-2">'
	  c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Ads.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADVERTISEMENT_ADD']?></a>'
	  c +='</span>'
	  c +='<span class=" panel-btn-2">'
	  c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="Ads.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADVERTISEMENT_EDIT']?></a>'
	  c +='</span>'
	  c +='<span class=" panel-btn-2">'
	  c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="Ads.Delete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['ADVERTISEMENT_DELETE']?></button>'
	  c +='</span>'
	  
	  c +='</div>'
	  
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-4-->
	  c +='</div>'
	  <!--row-->
	  c +='</div>'
	  
	  c +='<div class="panel-body">'
	  c +='<div class="table-responsive">'
	  c +='<table class="table table-th-block table-striped tbl_enebal">'
	  c +='<thead>'
	  c +='<tr>'
	  c +='<th width="10%" onclick="Ads.PupulateTable(\'id\')"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_ID']?></th>'
	  c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'ads\')"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_ALL']?></th>'
	  c +='<th width="20%" onclick="Ads.PupulateTable(\'name\')"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_NAME']?></th>'
	  c +='<th width="15%"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_CITY']?></th>'
	  c +='<th width="15%" onclick="Ads.PupulateTable(\'hits\')"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_CLICKS']?></th>'
	  c +='<th width="20%"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_ENABLE']?></th>'
	  c +='</tr>'
	  c +='</thead>'
	  c +='<tbody id="ads">'
	  c +='</tbody>'
	  c +='</table>'
	  c +='</div>'
	  <!--table-responsive-->
	  c +='</div>'
	  <!-- /.panel-body -->
	  c +='</div>'
	  
		
      document.getElementById("main").innerHTML = c;

      document.getElementById("asearch").onkeyup = function () {
          Ads.PupulateTable(Main.Config.Ads.List.SortBy, true)
      };
		
      Ads.PupulateTable(Main.Config.Ads.List.SortBy, true)
    },
	
    PupulateTable: function (a, c) {
		
        var d = "";
        var b = this.Ads.length;
        if (c) {
            this.Ads.sort(Main.SortByProperty(a));
            if (Main.Config.Ads.List.SortByStatus == "max") {
                this.Ads.reverse()
            }
        } else {
            if (Main.Config.Ads.List.SortBy != a) {
                this.Ads.sort(Main.SortByProperty(a));
                Main.Config.Ads.List.SortByStatus = "min"
            } else {
                this.Ads.reverse();
                if (Main.Config.Ads.List.SortByStatus == "min") {
                    Main.Config.Ads.List.SortByStatus = "max"
                } else {
                    Main.Config.Ads.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Ads.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
        for (var e in this.Ads) {
            j = false;
            g = document.getElementById("asearch").value.toLowerCase();
            if (String(this.Ads[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.Ads[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.Ads[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.Ads[e])
            }
            if (j) {
				
				d += '<tr>'
				d += '<td>'+ this.Ads[e].id +'</td>'
				d += '<td><input type="checkbox" class="ads checkbox" value="' + this.Ads[e].id + '"></td>'
				d += '<td class="hand" onclick="Ads.Edit(' + this.Ads[e].id + ')">'+ Main.NullToEmpty(this.Ads[e].name) +'</td>'
				var f;
                if (this.Ads[e].city.id == "-1") {
                    f = "<?= $lang_resource['ADMIN_PAGE_ALL'] ?>"
                } else {
                    if (this.Ads[e].city.id == "-2") {
                        f = "<?= $lang_resource['ADMIN_PAGE_DEFAULT'] ?>"
                    } else {
                        f = Main.NullToEmpty(this.Ads[e].city.name)
                    }
                }
				d += '<td>'+ f +'</td>'
				d += '<td>' + this.Ads[e].hits +'</td>'
				d += '<td><div class="enebal" id="switch_' + this.Ads[e].id + '"></div></td>'
				d += '</tr>'
	
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
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                Ads.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/ads.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
        Main.GetFranchisesData("Ads.Form()")
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
            }else if(c.length > 1){
				alert("<?=$lang_resource['ADVERTISEMENT_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['ADVERTISEMENT_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
		
		 if (d) {
			
            var b = this;
            Main.Loading();
            Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchAdData","id":"' + a + '"}]', "Ads.PreEdit")
        }
    },
    PreEdit: function (a) {
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Franchises = a.franchises;
        this.Form(a.ad)
    },
	
	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
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
		
		if (Forms.Form.ad.type == "create") {
		k +='<h3 class="popup-heading"><?=$lang_resource['ADVERTISEMENT_CREATE_HEADING']?></h3>'
		}else{
		k +='<h3 class="popup-heading"><?=$lang_resource['ADVERTISEMENT_EDIT_HEADING']?></h3>'
		}
		
		k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Ads.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Ads.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Ads.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->
		
		k +='<div class="row">'
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_NAME']?></label>'
		
		Forms.CreateValue("ad", "name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.ad.type == "create") {
                if(flaginfo[p].id == Ads.langdefault){   
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control" onkeyup="Ads.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control" onkeyup="Ads.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Ads.langdefault){   
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control" onkeyup="Ads.PreValidation()" value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control" onkeyup="Ads.PreValidation()" value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//k +=Forms.CreateInputPropertyPopup("ad", "name", e.name, true,"Ads.PreValidation()") 
        k +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00; display:none;"><?= $lang_resource['ADMIN_PAGE_NAME_IS_REQUIRED'] ?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->

		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_TYPE']?></label>'
        if(e.type){
            var etype=e.type;
        }else{
            var etype=1;
        }
        k +=Forms.CreateInputPropertyPopupHidden("ad", "type",etype, true)
		k +='<input type="text" readonly class="form-control" placeholder="" value="Unique">'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_TIME']?></label>'
		k +=Forms.CreateInputPropertyPopup("ad", "time", e.time, false,"Ads.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="time_text" style="color:#F00; display:none;"><?= $lang_resource['ADMIN_PAGE_TIMESECOND_IS_REQUIRED'] ?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_LINK']?></label>'
		k +=Forms.CreateInputPropertyPopup("ad", "link", e.link)
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row--> 
		k +='<div class="row">'
		var f = new Array();
        f.push(JSON.parse('{"id":"","caption":""}'));
        f.push(JSON.parse('{"id":"-2","caption":"<?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_CITY_OPTION1']?>"}'));
        f.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_CITY_OPTION2']?>"}'));
        for (var d in Main.Franchises) {
            var h = new Object();
            h.id = Main.Franchises[d].id;
            h.caption = Main.Franchises[d].city;
            f.push(h)
        }
		f.sort(Main.SortByProperty("caption"));
        var a = "";
        if (e.city) {
            a = e.city
        }
		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_FIELD_CITY']?></label>'
		k +=Forms.CreateSelectPropertyPopup("ad", "city", f, a, true,"Ads.PreValidation()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00; display:none;"><?= $lang_resource['ADMIN_PAGE_NAME_IS_REQUIRED_CITY'] ?></small>'
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
        var m = "";
        if (e.id) {
          if(e.isimg == 0) {
            m = "../admin/images/dummy/advertisement.png";
          } else {
            m = "../panel/images/ads/" + Main.NullToEmpty(e.id) + "/splited.jpg?c=" + new Date().getTime();
          }
        }else {
          m = "../admin/images/dummy/advertisement.png";
        }

		k +='<div class="col-md-6">'
		k +='<div class="form-group">'
		k +='<label>&nbsp;</label>'
		k +='<div class="input-group">'
        k +='<input type="text" class="form-control" id="imagefile3" readonly>'
        k +='<span class="input-group-btn">'
        k +='<span class="btn btn-default btn-file btn-light rounded">'
        k +='<form id="uform_bimg3" name="uform_bimg3" enctype="multipart/form-data" method="post" >';
        k +='<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD'] ?><input id="uploadImage3" type="file" name="uploadImage" onChange="Products.PreviewImage(3);" >'
        k += '<input id="showImage3" name="showImage3" type="hidden" value=""  />';
        k += '<input type="submit" name="submit" onclick="Products.triggerImageupload(3)" style="display:none" />';
        k += '</form>';
        k +='</span>'
        k +='</span>'
        k +='</div>'
		<!-- /.input-group -->
		k +='</div>'
		k +='<div class="add-img">'
        k +='<small style="font-weight:400"><?= $lang_resource['ADMIN_PAGE_FILE_SIZE'] ?></small>'
        k +='<img id="uploadPreview3" src="' + m + '" width="269" height="173" >'
        k +='</div>'
		<!--add-img-->
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->  
		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.ad.type == "create") {
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Ads.Save()"><?=$lang_resource['ADVERTISEMENT_CREATE_FROM']?></button></center>'
		}else{
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Ads.Save()"><?=$lang_resource['ADVERTISEMENT_EDIT_FROM']?></button></center>'
		}
		k +='</div>'
		<!--col-md--->
		k +='</div>'
		<!--row-->
		
		Popup.Show(k);
		
       
      
        $("#name").focus()
    },
   
    PreValidation: function(){
        var count = 0;  
        
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
		if(document.getElementById("time").value == ""){            
            $("#time_text").show();
            $("#time").addClass("error-text-field");
            $("#time").removeClass("success-text-field");
            count ++;
        }else{
            $("#time_text").hide();
            $("#time").addClass("success-text-field");
            $("#time").removeClass("error-text-field");
        }
		
		
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Ads.langdefault){
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
        
		}
			var namedata = document.getElementById("name_"+flaginfo[Z].id).value;
            Ads.namelang[flaginfo[Z].id] = namedata;
	}

            
        if(count == 0)
            return true
        else 
            return false
        
       
    },
    Save: function () {
        if(Ads.PreValidation() !=true){
            return
        }
      	Forms.UpdateValue("ad", "name", Ads.namelang,true);

        if(document.getElementById("showImage3").value !="") {
            Forms.Form.ad.image = document.getElementById("showImage3").value;
        }
        
		for(var s in Forms.Form.ad.fields){			
			Forms.Form.ad.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].value)))
			Forms.Form.ad.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].ivalue)))
			
			Forms.Form.ad.fields[s].value = Forms.Form.ad.fields[s].value.split("+").join("@@");
			Forms.Form.ad.fields[s].ivalue = Forms.Form.ad.fields[s].ivalue.split("+").join("@@");
		}
		
        Main.Request("ads", null, "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), "Ads.Main()");
      
		Popup.Close();
        Forms.Clean("ad")
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("<?=$lang_resource['ADVERTISEMENT_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['ADVERTISEMENT_DELETE_MSG']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/ads.php", "f=DeleteAd&data=" + JSON.stringify(a),  function (c) {
						alert('<?=$lang_resource['ADVERTISEMENT_DELETE_SUCCESS']?>');
						Ads.Main()
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
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
                    alert("<?= $lang_resource['ADMIN_PAGE_ERROR_IN_AJAX'] ?>");
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
            document.getElementById("uploadPreview"+no).src = oFREvent.target.result;
            document.getElementById("imagefile"+no).value = document.getElementById("uploadImage"+no).files[0].name;
        };        
    },
};
