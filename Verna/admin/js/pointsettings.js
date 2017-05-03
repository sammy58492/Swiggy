var PointSettings = {
    Main: function () {
		PointSettings.namelang = Array();
        Main.Loading();
        var a = new Date().getTime();
		Main.Aid = a;
        $.post("lib/discountcode.php", "f=FetchAllRestData", function (c) {
             Main.Config.PointSettings= new Object();
                Main.Config.PointSettings.List= new Object();
                Main.Config.PointSettings.List.SortBy = "id";
                Main.Config.PointSettings.List.SortByStatus = "min";
            //alert(c)
            PointSettings.businessrest = JSON.parse(c);           
        })

        $.post("lib/pointsettings.php", "f=FetchAllPointSettingData", function (b) {
         
          if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                PointSettings.PointSettings = JSON.parse(b);
                PointSettings.PrintMain()
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
	  c +='<h3 class="panel-title-2"><?=$lang_resource['POINT_SETTINGS_HEADING']?></h3>'
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
	  c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:PointSettings.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADVERTISEMENT_ADD']?></a>'
	  c +='</span>'
	  c +='<span class=" panel-btn-2">'
	  c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="PointSettings.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADVERTISEMENT_EDIT']?></a>'
	  c +='</span>'
	  c +='<span class=" panel-btn-2">'
	  c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="PointSettings.Delete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['ADVERTISEMENT_DELETE']?></button>'
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
	  c +='<th width="5%" onclick="PointSettings.PupulateTable(\'id\')"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_ID']?></th>'
	  c +='<th width="5%" onclick="Main.ToogleAllCheckBoxes(\'ads\')"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_ALL']?></th>'
	  c +='<th width="20%" onclick="PointSettings.PupulateTable(\'name\')"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_BUSINESS_NAME']?></th>'
	  // c +='<th width="10%"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_POINT_TYPE']?></th>'
      c +='<th width="20%"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_NUMBER_OF_POINTS']?></th>'
      c +='<th width="10%"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_POINTS_VALUE']?></th>'
      
	  c +='<th width="25%"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_FACEBOOK_POINTS']?></th>' 
	   c +='<th width="25%"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_TWITTER_POINTS']?></th>'      
	  c +='<th width="20%"><?=$lang_resource['POINT_SETTINGS_POPULATE_HEADING_ENABLED']?></th>'
	  c +='</tr>'
	  c +='</thead>'
	  c +='<tbody id="PointSettings">'
	  c +='</tbody>'
	  c +='</table>'
	  c +='</div>'
	  <!--table-responsive-->
	  c +='</div>'
	  <!-- /.panel-body -->
	  c +='</div>'
	  
		
      document.getElementById("main").innerHTML = c;
      PointSettings.PupulateTable()
      document.getElementById("asearch").onkeyup = function () {
          PointSettings.PupulateTable(Main.Config.Ads.List.SortBy, true)
      };
		
      PointSettings.PupulateTable(Main.Config.PointSettings.List.SortBy, true)
    },
	
    PupulateTable: function (a, c) {
		
        var d = "";
        var b = this.PointSettings.length;
      
        var j = false;
        var g = "";
        var l = new Array();
       
        for (var e in this.PointSettings) {
            
            j = false;
            g = document.getElementById("asearch").value.toLowerCase();
           if (String(this.PointSettings[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.PointSettings[e].bname).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.PointSettings[e])
            }
            if (j) {
				
				d += '<tr>'
				d += '<td>'+ this.PointSettings[e].id +'</td>'
				d += '<td><input type="checkbox" class="ads checkbox" value="' + this.PointSettings[e].id + '"></td>'
				d += '<td class="hand" onclick="PointSettings.Edit(' + this.PointSettings[e].id + ')">'+ Main.NullToEmpty(this.PointSettings[e].bname) +'</td>'
				// if(this.PointSettings[e].point_type==0)
    //             {
    //                 d += '<td> Point in %</td>'    
    //             }
    //             else
    //                 d +='<td> Point Per Order Fix Price</td>'
                
				d += '<td>' + this.PointSettings[e].no_of_points +'</td>'
                d += '<td> $' + this.PointSettings[e].point_values +'</td>'
				d += '<td>' + this.PointSettings[e].fb_point_values +'/'+this.PointSettings[e].twitter_point_values+'</td>'
                d += '<td>' + this.PointSettings[e].twitter_point_values +'/'+this.PointSettings[e].twitter_point_values+'</td>'
				d += '<td><div class="enebal" id="switch_' + this.PointSettings[e].id + '"></div></td>'
				d += '</tr>'
	
            }
        }
        document.getElementById("PointSettings").innerHTML = d;
		
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
                PointSettings.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/pointsettings.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
        Main.GetFranchisesData("PointSettings.Form()")
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
            Main.BulkRequest('data=[{"operation":"FetchAllBusinessData"},{"operation":"FetchBusinessPointData","id":"' + a + '"}]', "PointSettings.PreEdit")
        }
    },
    PreEdit: function (a) {
		//alert(JSON.stringify(a));
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Franchises = a.businesss;
        //alert(a.businesss)
        this.Form(a.bps)
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

        MultipleInput.AddListener("tagschange", "PointSettings.MultiInputTagsChange");
        var k = "";
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
            //alert(Forms.Form.ad.id)
        }
        
        if (Forms.Form.ad.type == "create") {
        k +='<h3 class="popup-heading"><?=$lang_resource['POINT_SETTINGS_CREATE_HEADING']?></h3>'
        }else{
        k +='<h3 class="popup-heading"><?=$lang_resource['POINT_SETTINGS_EDIT_HEADING']?></h3>'
        }
        
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        if (Forms.Form.ad.type == "create") {
            k +='<label><?=$lang_resource['POINT_SETTINGS_CREATE_FIELD_NAME']?></label>'
        }
        else
        {
            k +='<label><?=$lang_resource['POINT_SETTINGS_CREATE_FIELD_NAME_EDIT']?></label>'
        }
        var f = new Array();
        f.push(JSON.parse('{"id":"","caption":""}'));
        
        for (var d in Main.Franchises) {
            var h = new Object();
            h.id = Main.Franchises[d].id;
            h.caption = Main.Franchises[d].name;
            f.push(h)
        }
        f.sort(Main.SortByProperty("caption"));
        var a = "";
        if (e.bname) {
            a = e.bname
        }

       // k +=Forms.CreateSelectPropertyPopup("ad", "business", f, a, true,"")
        if (Forms.Form.ad.type == "create") {
        Forms.CreateValue("ad", "business_id",'', true);
        k +='<input type="text" class="form-control" id="business_id">' 
        }
        else
        {
            k+='</br>'+e.bname
        }
       
        k +='</div>'
        k +='</div>' <!--col-md-6-->
        k+='</div>'<!--row-->
       
        // k +='<div class="row">'
        // k +='<div class="col-md-12">'
        // k +='<div class="form-group">'
        // k +='<label><?=$lang_resource['POINT_SETTINGS_CREATE_FIELD_SELECT_POINT_TYPE']?></label>'


        // var f = new Array();
        // f.push(JSON.parse('{"id":"","caption":"Select Type"}'));
        // f.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['POINT_SETTINGS_POINT_TYPE_PERCENTAGE']?>"}'));
        // f.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['POINT_SETTINGS_POINT_TYPE_ORDER_PRICE']?>"}'));
        
        // var a = "";
        // if (e.point_type) {
        //     a = e.point_type
        // }

        // k +=Forms.CreateSelectPropertyPopup("ad", "point_type", f, a)
        // //k +=Forms.CreateInputPropertyPopupHidden("ad", "type",etype, true)
        // //k +='<input type="text" class="form-control" placeholder="">'
        // k +='</div>'
        // k +='</div>'
        // <!--col-md-6-->
        // k +='</div>'
        <!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['POINT_SETTINGS_NUMBER_OF_POINTS']?></label>'
       // alert(e.)
        k +=Forms.CreateInputPropertyPopup("ad", "number_of_points", e.number_of_points,"","","","","return Main.IsNumberKey(event)")
        
        k +='</div>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['POINT_SETTINGS_POINT_VALUE']?></label>'
        k +=Forms.CreateInputPropertyPopup("ad", "point_values", e.point_values,"","","","","return Main.IsNumberKey(event)")
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='</div>'
        <!--row--> 
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['POINT_SETTINGS_FACEBOOK_POINT_VALUE']?></label>'
        k +=Forms.CreateInputPropertyPopup("ad", "fb_point_values", e.fb_point_values,"","","","","return Main.IsNumberKey(event)")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00; display:none;"><?= $lang_resource['ADMIN_PAGE_NAME_IS_REQUIRED_CITY'] ?></small>'
        k +='</div>'
        k +='</div>'
        k +='</div>'

         k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['POINT_SETTINGS_TWITTER_POINT_VALUE']?></label>'
        k +=Forms.CreateInputPropertyPopup("ad", "twitter_point_values", e.twitter_point_values,"","","","","return Main.IsNumberKey(event)")
       
        k +='</div>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        

      
        <!--row-->  
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
        if (Forms.Form.ad.type == "create") {
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PointSettings.Save()"><?=$lang_resource['ADVERTISEMENT_CREATE_FROM']?></button></center>'
        }else{
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="PointSettings.Save()"><?=$lang_resource['ADVERTISEMENT_EDIT_FROM']?></button></center>'
        }
        k +='</div>'
        <!--col-md--->
        k +='</div>'


        <!--row-->
        
        Popup.Show(k);
        MultipleInput.Init("business_id",PointSettings.businessrest, true);
        
        if (Forms.Form.ad.type == "modify") {
          // alert(e.w_id_business)
            if (e.w_id_business != "") {
                var d = JSON.parse(e.w_id_business)
                for (var e in d) {
                    MultipleInput.AddTagById("business_id", d[e])
                }
                Forms.Form.ad.fields.business_id.save = false
            }
        }
       
      
        $("#name").focus()
		
    },
   
    PreValidation: function(){
        var count = 0;  
        
        
        
       
    },
    Save: function () {
		
        Main.Request("pointsettings", null, "f=SaveBusinessPoint&data=" + JSON.stringify(Forms.Form.ad), "PointSettings.Main()");
      
		Popup.Close();
        Forms.Clean("ad")
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("<?=$lang_resource['POINT_SETTINGS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['POINT_SETTINGS_DELETE_MSG']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/pointsettings.php", "f=DeletePointSettings&data=" + JSON.stringify(a),  function (c) {
						alert('<?=$lang_resource['POINT_SETTINGS_DELETE_SUCCESS']?>');
						PointSettings.Main()
					
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
    MultiInputTagsChange: function (d) {
        this.ActiveForm = "ad";
        switch (d) {
        case "dish_ingredients":
            var e = MultipleInput.GetTagsNames(d);
            if (e.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(e))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break;
        case "days":
            Business.UpdateSchedule();
            break;
        default:
            
            var f = MultipleInput.GetTagsIds(d);
            if (f.length > 0) {
                Forms.UpdateValue("ad", d, JSON.stringify(f))
            } else {
                Forms.UpdateValue("ad", d, "")
            }
            //DriverGroup.PreValidation();
            break
        }
        
    },
};
