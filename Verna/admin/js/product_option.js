var ProductOption = {
	Main: function(){
		ProductOption.setlang = Array();
		ProductOption.textuserlang = Array();
		
		ProductOption.optionnamelang = Array();
		ProductOption.texttoenduserlang = Array();
		
		
		if(Business.id){
			Main.Config.Extras.List.SortBy = "max";
			var N ='<div class="panel panel-danger panel-no-border">'
			N +='<div class="panel-heading panel-heading-2">' 
			N +='<div class="row">'
			N +='<div class="col-md-4">'
			N +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_HEADING']?></h3>'
			N +='</div>'
			<!--col-md-5-->
			N +='<div class="col-md-3">'
			N +='<div class="panel-btn">'
			//N +='<input type="text" id="search" class="form-control rounded panel-red-field white-placeholder" placeholder="Filter" onkeyup="ProductOption.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)">'
			N +='</div>'
			N +='</div>'
			<!--col-md-3-->
			N +='<div class="col-md-5">'
			N +='<div class="panel-btn pull-right">'
			N +='<div class="inline-popups ">'
			N +='<span class=" panel-btn-2">'
			N +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:ProductOption.NewExtra()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_ADD']?></a>'
			N +='</span>'
			
			N +='<span class=" panel-btn-2">'
			N +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:ProductOption.EditExtra()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_EDIT']?></a>'
			N +='</span>'
			N +='<span class=" panel-btn-2">'
			N +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="ProductOption.DeleteExtra()" ><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_DELETE']?></button></span>'
			N +='</div>'
			
			<!--popup-->
			N +='</div>'
			N +='</div>'
			<!--col-md-4-->
			N +='</div>'
			<!--row-->
			N +='</div>'
			
			N +='<div class="panel-body">'
			N +='<div class="table-responsive">'
			N +='<table class="table table-th-block table-striped tbl_enebal">'
			N +='<thead>'
			N +='<tr>'
			N +='<th width="7.5%" onclick="ProductOption.PupulateExtrasTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
			N +='<th width="7.5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
			N +='<th width="20%" onclick="ProductOption.PupulateExtrasTable(\'name\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
			N +='<th width="20%"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_PRODUCTOPTION']?></th>'
			N +='<th width="30%"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ACTION']?></th>'
			N +='<th width="15%"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ENABLE']?></th>'
			N +='</tr>'
			N +='</thead>'
			N +='<tbody id="extras">'

			<!--popup-->
			N +='</tbody>'
			N +='</table>'
			N +='</div>'
			<!--table-responsive-->
			N +='</div>'
			<!-- /.panel-body -->
			
		}else{
			var N=''
			N += '<div class="col-md-12">'
			N += '<div class="the-box">'
			N += '<div class="clearfix" style="padding:5px 0">'
			N +='<p class="text-center">Please Create Business First</p>'
			N += '</div></div></div>'
		}
		
		$("#tab_extras").empty().append(N);
		ProductOption.GetExtras(null, true);
		
		
	},
	
	GetExtras: function (e, f) {
		
		
      /*  if (Forms.Form.business.type == "create") {
			
			
			//return false
			
            if (Business.ExtrasIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchExtrasDataByIds&ids=" + Business.ExtrasIds, function (a) {
               
               //alert(a)
                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        Business.Extras = JSON.parse(a);
						//Business.ConfigQtypermission =  Business.Extras[0].configqty;
                        if (f) {
                            Business.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)
                        } else {
                            Popup.Show(700, 693, e, null, null, Business.PreEditDish)
                        }
                    } else {
                        Business.Extras = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 693, e, null, null, Business.PreEditDish)
                }
            }
        } else {*/
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;


            $.post("lib/business.php", "f=FetchExtrasQtyPersonData", function (s) {
                s = JSON.parse(s);
                Business.ConfigQtypermission = s.configqty;
                Business.Configpersonpermission = s.configperson;


                $.post("lib/business.php", "f=FetchExtrasDataByBusiness&id=" + Business.id, function (a) {
                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        <!--%PRODUCT OPTION%-->
                        data=JSON.parse(a);
                        Business.Extras = JSON.parse(a);
                        //alert('person permission = '+Business.Configpersonpermission);
                        if(data['id']){
                            $.post("lib/business.php", "f=GetExtrasDetails&data=" + data['id'], function (b) {

                            });
                        }
                        <!--%PRODUCT OPTION%-->

                        if (f) {
                            ProductOption.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)
                        } else {
                            Popup.Show(700, 693, e, null, null, Business.PreEditDish)
                        }
                    }
                })
            });
       // }
    },

	PupulateExtrasTable: function (j, h) {

        var k = "";
		
		
        var m = Business.Extras.length;
        if (h) {
            Business.Extras.sort(Main.SortByProperty(j));
            if (Main.Config.Extras.List.SortByStatus == "max") {
                Business.Extras.reverse()
            }
        } else {
            if (Main.Config.Extras.List.SortBy != j) {
                Business.Extras.sort(Main.SortByProperty(j));
                Main.Config.Extras.List.SortByStatus = "min"
            } else {
                Business.Extras.reverse();
                if (Main.Config.Extras.List.SortByStatus == "min") {
                    Main.Config.Extras.List.SortByStatus = "max"
                } else {
                    Main.Config.Extras.List.SortByStatus = "min"
                }
            }
        }


        Main.Config.Extras.List.SortBy = j;
        if (!h) {
            Main.SaveConfig()
        }
		
	

        for (var n in Business.Extras) {
			
			
		k +='<tr>'
		k +='<td>'+ Business.Extras[n].id +'</td>'
		k +='<td><input type="checkbox" class="checkbox" value="' + Business.Extras[n].id + '"></td>'
		k +='<td class="hand" onclick="ProductOption.EditExtra(' + Business.Extras[n].id + ')">' + Business.Extras[n].set +'</td>'
		ProductOption.update_option_dropdown(Business.Extras[n].id);
		k +='<td id="options'+Business.Extras[n].id+'">'
		k +='</td>'
		k +='<td>'
		k +='<div class="inline-popups ">'
		k +='<span class=" panel-btn-2">'
		k +='<a class="btn btn-danger rounded tbl-field" href="javascript:ProductOption.GetOptions(null,'+Business.Extras[n].id+')" data-effect="mfp-zoom-in"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_ADD']?></a>'
		k +='</span>'
		k +='<span id="actions'+Business.Extras[n].id+'">'
		k +='</span>'
		k +='</div>'
		<!--popup-->
		
		k +='</td>'
		k +='<td><div class="enebal" id="switch_' + Business.Extras[n].id + '"></div></td>'
		k +='</tr>'
		}

        document.getElementById("extras").innerHTML = k;
		
		
		
        var i = false;
        Switch.Init();
        for (n in Business.Extras) {
            if (Business.Extras[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switch_" + Business.Extras[n].id, i);
            Switch.OnChange("switch_" + Business.Extras[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "extra")
            })
        }
    },
	
	update_option_dropdown:function(id){
        if(id){
            $.post("lib/business.php","f=GetExtrasOptions&data=" + id, function (a) {
                data=JSON.parse(a);
                // console.log(data[0]['name']);
                var t=" ";
                t +='<select class="form-control rounded tbl-field" onchange="ProductOption.populateActions('+data[0]['set_id']+',this)">'
                t +='<option value=""><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_SELECTOPTION']?></option>'
                $.each(data,function(index,value){
                    t += '<option value="' +value['option_id'] + '">' + value['name'] + "</option>";
                });
                t +='</select>';
                document.getElementById("options"+data[0]['set_id']).innerHTML = t;
            });
        }        
    },
	
	NewExtra: function () {
		 $('div[id*=newpopup]').remove();
        ProductOption.ExtraForm()
    },
	
	EditExtra: function (h, l) {
		 $('div[id*=newpopup]').remove();
        console.log(h);
        console.log(l);
        var i = false;
        if (h) {
            i = true;
            Visuals.ForceMainButtonCancelEvent = l
        } else {
            var j = Main.GetMarkedCheckBoxesValues();
            if (j.length == 1) {
                h = j[0];
                i = true
            }
			else if(j.length > 1){
            	alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CHECBOX_SELECT_EDIT']?>");
                return
            }
			
        } 
		
		if (i) {
            var k = this;
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetExtraData&id=" + h, function (a) {
                if (g != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    ProductOption.ExtraForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
	
	
	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("extra_set_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("extra_text_to_end_user_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("extra_set_"+id).style.display  = "block";
		document.getElementById("extra_text_to_end_user_"+id).style.display  = "block";
    },
	
	ExtraForm: function (d) {
		//alert(JSON.stringify(d));
        Forms.Clean("extra", "popupmainbuttonok");
        if (d) {
            Forms.Form.extra.type = "modify";
            Forms.Form.extra.id = d.id
			//Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
        } else {
            d = new Object();
            Forms.Form.extra.type = "create";
            if (Forms.Form.business.type == "modify") {
                //Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
            }
        }
        Forms.Form.extra.extra = d;
		Forms.CreateValue("extra", "extra_business", Business.id, false, true, true)
        Business.ActiveForm = "extra";
		
		var e ='';
		
		if (Forms.Form.extra.type == "create") {
		e +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_HEADING']?></h3>'
		}else{
		e +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_EDIT_HEADING']?></h3>'
		}
		
		e +='<div class="row">'
        e +='<ul class="pop_lang_img">'
		flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                ProductOption.langdefault = flaginfo[Z].admindefaulelang;                             
                e+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="ProductOption.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                e+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="ProductOption.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        e +='</ul>'
        e +='</div>'
        <!--row-->
		
		e +='<div class="row">'
		e +='<div class="col-md-12">'
		e +='<div class="form-group">'
		e +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_SET_NAME']?></label>'
		Forms.CreateValue("extra", "extra_set", "",true)
		
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.extra.type == "create") {
                if(flaginfo[p].id == ProductOption.langdefault){   
                    e +='<input type="text" id="extra_set_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="" />' 
                }else{
                    e +='<input type="text" id="extra_set_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == ProductOption.langdefault){   
                    e +='<input type="text" id="extra_set_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(d.set[flaginfo[p].id])+'" />' 
                }else{
                    e +='<input type="text" id="extra_set_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(d.set[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//e +=Forms.CreateInputPropertyPopup("extra", "extra_set", Main.NullToEmpty(d.set), true,"ProductOption.PreValidation()")
		e +='<small data-bv-validator="notEmpty" class="help-block" id="extra_set_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_SETNAME']?></small>'

		e +='</div>'
		e +='</div>'
		<!--col-md-12-->
		e +='</div>'
		<!--row-->
		e +='<div class="row">'
		e +='<div class="col-md-12">'
		e +='<div class="form-group">'
		e +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_TEXT_TO_END_USER']?></label>'
		Forms.CreateValue("extra", "extra_text_to_end_user", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.extra.type == "create") {
                if(flaginfo[p].id == ProductOption.langdefault){   
                    e +='<input type="text" id="extra_text_to_end_user_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="" />' 
                }else{
                    e +='<input type="text" id="extra_text_to_end_user_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == ProductOption.langdefault){   
                    e +='<input type="text" id="extra_text_to_end_user_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(d.text_to_end_user[flaginfo[p].id])+'" />' 
                }else{
                    e +='<input type="text" id="extra_text_to_end_user_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(d.text_to_end_user[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//e +=Forms.CreateInputPropertyPopup("extra", "extra_text_to_end_user", Main.NullToEmpty(d.text_to_end_user), true,"ProductOption.PreValidation()")
		e +='<small data-bv-validator="notEmpty" class="help-block" id="extra_text_to_end_user_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_TEXTTOENDUSER']?></small>'
		e +='</div>'
		e +='</div>'
		<!--col-md-12-->
		e +='</div>'
		<!--row-->
		if(Business.ConfigQtypermission == 1){
		<!--row-->
		e +='<div class="row">'
		e +='<div class="col-md-12">'
		e +='<div class="form-group">'
		e +='<label><?=$lang_resource['MINI_QTY_TO_SELECT_FOR_THIS_PROD']?></label>'
		e +=Forms.CreateInputPropertyAdmin("extra", "qty", d.qty, true,"ProductOption.PreValidation()") 
		e +='<small data-bv-validator="notEmpty" class="help-block" id="qty_error" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_QTY']?></small>'
		e +='<small data-bv-validator="notEmpty" class="help-block" id="qty_error1" style="color:#F00;display:none;">Quantity should be Greater Than 0</small>'
		e +='</div>'
		e +='</div>'
		e +='</div>'
		<!--row-->
		}


		if(Business.Configpersonpermission == 1){
		<!--row-->
		e +='<div class="row">'
		e +='<div class="col-md-12">'
		e +='<div class="form-group">'
		e +='<label><?=$lang_resource['MINI_PERSON_TO_SELECT_FOR_THIS_PROD']?></label>'
		e +=Forms.CreateInputPropertyAdmin("extra", "person", d.person, true,"ProductOption.PreValidation()") 
		e +='<small data-bv-validator="notEmpty" class="help-block" id="person_error" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PERSON']?></small>'
		e +='<small data-bv-validator="notEmpty" class="help-block" id="person_error1" style="color:#F00;display:none;">Quantity should be Greater Than 0</small>'
		e +='</div>'
		e +='</div>'
		e +='</div>'
		<!--row-->
		}
		
		
		e +='<div class="row">'
		e +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.extra.type == "create") {
		e +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick=" ProductOption.SaveExtra()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE']?></button></center>'
		}else{
		e +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ProductOption.SaveExtra()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_UPDATE']?></button></center>'
		}
		e +='</div>'
		<!--col-md--->
		e +='</div>'
		<!--row-->
		
		
		Popup.Show(e);
		
        
    },
	
	PreValidation: function(){
   	var count = 0;	
    	 flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == ProductOption.langdefault){
    	if(document.getElementById("extra_set_"+flaginfo[Z].id).value == ""){
            $("#extra_set_text").show();
            $("#extra_set_"+flaginfo[Z].id).addClass("error-text-field");
            $("#extra_set_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_set_text").hide();
            $("#extra_set_"+flaginfo[Z].id).addClass("success-text-field");
            $("#extra_set_"+flaginfo[Z].id).removeClass("error-text-field");
        }
		
		if(document.getElementById("extra_text_to_end_user_"+flaginfo[Z].id).value == ""){
            $("#extra_text_to_end_user_text").show();
            $("#extra_text_to_end_user_"+flaginfo[Z].id).addClass("error-text-field");
            $("#extra_text_to_end_user_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_text_to_end_user_text").hide();
            $("#extra_text_to_end_user_"+flaginfo[Z].id).addClass("success-text-field");
            $("#extra_text_to_end_user_"+flaginfo[Z].id).removeClass("error-text-field");
        }
		}
		
		var namedata = document.getElementById("extra_set_"+flaginfo[Z].id).value;
            ProductOption.setlang[flaginfo[Z].id] = namedata;
			
		var enduserdata = document.getElementById("extra_text_to_end_user_"+flaginfo[Z].id).value;
            ProductOption.textuserlang[flaginfo[Z].id] = enduserdata;
			
		/*var qtydata = document.getElementById("qty").value;
            ProductOption.textuserlang[flaginfo[Z].id] = qtydata;*/
			
		}
		/*if(document.getElementById("qty").value == ""){
			$("#qty_error").show();
			$("#qty").addClass("error-text-field");
			$("#qty").removeClass("success-text-field");
			count ++;
		}
		else if(isNaN(document.getElementById("qty").value)){
			document.getElementById("qty").value = "";
			document.getElementById("qty").focus();
			$("#qty").addClass("error-text-field");
			$("#qty").removeClass("success-text-field");
			count ++;
		}
		else if((Business.ConfigQtypermission == 1) && (document.getElementById("qty").value < 1))
		{
			//alert('Quantity should be Greater Than 0');
			$("#qty_error").hide();
			$("#qty_error1").show();
			count ++;
		}
		else
		{
			$("#qty_error").hide();
			$("#qty_error1").hide();
			$("#qty").addClass("success-text-field");
			$("#qty").removeClass("error-text-field");
		}
		
		if(Business.Configpersonpermission == 1){
		if(document.getElementById("person").value == ""){
			$("#person_error").show();
			$("#person").addClass("error-text-field");
			$("#person").removeClass("success-text-field");
			count ++;
		}
		else if(isNaN(document.getElementById("person").value)){
			document.getElementById("person").value = "";
			document.getElementById("person").focus();
			$("#person").addClass("error-text-field");
			$("#person").removeClass("success-text-field");
			count ++;
		}
		else if((Business.ConfigQtypermission == 1) && (document.getElementById("person").value < 1))
		{
			//alert('No of Person should be Greater Than 0');
			$("#person_error").hide();
			$("#person_error1").show();
			count ++;
		}
		else
		{
			$("#person_error").hide();
			$("#person_error1").hide();
			$("#person").addClass("success-text-field");
			$("#person").removeClass("error-text-field");
		}*/
		//}//end of person permission
        if(count == 0)
        	return true
        else 
        	return false
       
    },
	
    	
	
	SaveExtra: function (f) {	
		 
		var valid = ProductOption.PreValidation();
		if(!valid)
		{
			return false			
		}
        
		Forms.UpdateValue("extra", "extra_set", ProductOption.setlang,true);
		Forms.UpdateValue("extra", "extra_text_to_end_user", ProductOption.textuserlang,true);
		
		   
        Forms.Form.extra.fields = Main.RemoveFromPropertyNames(Forms.Form.extra.fields, "extra_");
		
        if (f != null) {			
            Forms.Form.extra.image = f
        }
        var e = true;

		
		for(var s in Forms.Form.extra.fields){			
			Forms.Form.extra.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.extra.fields[s].value)))
			Forms.Form.extra.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.extra.fields[s].ivalue)))

            Forms.Form.extra.fields[s].value = Forms.Form.extra.fields[s].value.split("+").join("@@");
            Forms.Form.extra.fields[s].ivalue = Forms.Form.extra.fields[s].ivalue.split("+").join("@@");
		} 
		  
		var b = new Date().getTime();
		Main.Aid = b;
		Main.Loading();
        $.post("lib/business.php", "f=SaveExtra&data=" + JSON.stringify(Forms.Form.extra), function (a) {																								 			Main.Ready();
			if (b != Main.Aid){
				return;
			}
            //Main.Ready();
            /*if (e) {
                if (Main.IsNumber(a)) {
                    if (Business.ExtrasIds) {
                        Business.ExtrasIds += "," + a
                    } else {
                        Business.ExtrasIds = a
                    }					
                }
            }*/
			set_id=a; 			
			Popup.Close();	
			ProductOption.Main();		
			//ProductOption.GetExtras(null, true);  
		});
        Forms.Clean("extra")
    },
	
	DeleteExtra: function () {
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
			alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CHECBOX_SELECT']?>")
            return
        }
        var d = new Object();
        d.ids = c;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'<?=$lang_resource['ADMIN_PAGE_YES']?>', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/business.php", "f=DeleteExtra&data=" + JSON.stringify(d), function (a) {
						
						ProductOption.GetExtras(null,true);
						alert('<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'<?=$lang_resource['ADMIN_PAGE_No'] ?>', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
       // Main.Request("business", null, "f=DeleteExtra&data=" + JSON.stringify(d), "ProductOption.GetExtras(null,true)")
    },
	
	
	
	
	<!--Populate Product option product-->
	
	<!--Add-->
	
	populateActions:function(set_id,id){
        op_id=id.options[id.selectedIndex].value;
        var t="";
    
		t +='<span class=" panel-btn-2">'
		t +='<a class="btn btn-danger rounded tbl-field" href="javascript:ProductOption.copyOption('+set_id+','+op_id+')" data-effect="mfp-zoom-in"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_COPY']?></a>'
		t +='</span>'
		t +='<span class=" panel-btn-2">'
		t +='<a class="btn btn-success rounded tbl-field" href="javascript:ProductOption.EditOptionsVia('+set_id+','+op_id+')" data-effect="mfp-zoom-in"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_EDIT']?></a>'
		t +='</span>'
		t +='<span class=" panel-btn-2">'
		t +='<a class="btn btn-danger rounded tbl-field" href="javascript:ProductOption.DeleteOptions('+set_id+','+op_id+')" data-effect="mfp-zoom-in"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_DELETE']?></a>'
		t +='</span>'

        if(op_id == "") {
        document.getElementById("actions"+set_id).innerHTML = "";
        } else { 
        document.getElementById("actions"+set_id).innerHTML = t;
        }
    },
	
	show_id1: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlagE-"+flaginfo[Z].id).className  = '';
            document.getElementById("extra_option_name_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("extra_option_text_to_end_user_"+flaginfo[Z].id).style.display  = "none";
			for(var c in choice_number_array){
			document.getElementById("choice_name_"+choice_number_array[c]+flaginfo[Z].id).style.display  = "none";
			}
        }
        
        document.getElementById("langFlagE-"+id).className  = 'active';
        document.getElementById("extra_option_name_"+id).style.display  = "block";
		document.getElementById("extra_option_text_to_end_user_"+id).style.display  = "block";
		for(var c in choice_number_array){
		document.getElementById("choice_name_"+choice_number_array[c]+id).style.display  = "block";
		}
		
    },
	
	GetOptions: function (d,set_id) {
     $('div[id*=newpopup]').remove();
             var rank=0;
        Forms.Clean("extra_details", "popupmainbuttonok");
        if (d) {
            Forms.Form.extra.type = "modify";
            Forms.Form.extra.id = d.id
        } else {
            d = new Object();
            Forms.Form.extra_details.type = "create";
           
        }
        Forms.Form.extra_details.extra_details = d;
      //  console.log(Forms.Form.extra_details);

        Business.ActiveForm = "extra_details";
		
		        var conditional=new Array();
        conditional.push({
            id: "-1",
            caption: "<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTCONDITIONAL']?>"
        });
        conditional.push({
            id: "0",
            caption: "No"
        });
        conditional.push({
            id: "1",
            caption: "Yes"
        });
        var k=new Array();
        $.post("lib/business.php", "f=get_max_rank&data=" +JSON.stringify(set_id), function (a) {
        
      
                data=JSON.parse(a);

             rank=data;

            rank++;
           k.push({
                id: 0,
                caption: "<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTRANK']?>"
            });
            for(j=1;j<=rank;j++){
                k.push({
                    id: j,
                    caption: j
                })
            }
			if(document.getElementById("extra_rank")){
            var i = document.getElementById("extra_rank");
            i.options.length = 0;
       /*     i.options[i.options.length] = new Option("", "");*/
            for(j=0;j<=rank;j++){
               i.options[i.options.length] = new Option(k[j]['caption'],k[j]['id']);
            }
			}


        });

  var max=new Array();
  var min=new Array();
    max.push({
            id: 0,
            caption: "<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMAX']?>"
        });
        max.push({
            id: 1,
            caption:1
        });
        min.push({
            id: -1,
            caption: "<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN']?>"
        });
        min.push({
            id: 0,
            caption:0
        });
        min.push({
            id: 1,
            caption:1
        });
         
        choice_number_array=new Array();
        choice_delete_array=new Array();
        var H = false;
        choice1=0;
        choice_number=0;
		
		var e1 ='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_HEADING']?></h3>'
		
		e1 +='<div class="row">'
        e1 +='<ul class="pop_lang_img">'
        flaginfoE=Main.languageinfo;
        for(Z in flaginfoE){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfoE[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfoE[Z].id == flaginfoE[Z].admindefaulelang){ 
			   
                ProductOption.langdefaulteop = flaginfoE[Z].admindefaulelang;                             
                e1+='<li class="active" id="langFlagE-'+flaginfoE[Z].id+'"><a href="javascript:void(0)" onClick="ProductOption.show_id1('+flaginfoE[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                e1+='<li  id="langFlagE-'+flaginfoE[Z].id+'"><a href="javascript:void(0)" onClick="ProductOption.show_id1('+flaginfoE[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        e1 +='</ul>'
        e1 +='</div>'
        <!--row-->
		
		e1 +='<div class="row">'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_NAME']?></label>'
		
		
		Forms.CreateValue("extra_details", "extra_option_name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.extra_details.type == "create") {
                if(flaginfo[p].id == ProductOption.langdefaulteop){   
                    e1 +='<input type="text" id="extra_option_name_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="" />' 
                }else{
                    e1 +='<input type="text" id="extra_option_name_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == ProductOption.langdefaulteop){   
                    e1 +='<input type="text" id="extra_option_name_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="'+Main.NullToEmpty(d.extra_option_name[flaginfo[p].id])+'" />' 
                }else{
                    e1 +='<input type="text" id="extra_option_name_'+flaginfo[p].id+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="'+Main.NullToEmpty(d.extra_option_name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//e1 +=Forms.CreateInputPropertyPopup("extra_details", "extra_option_name", Main.NullToEmpty(d.name), true,"ProductOption.PreValidationOption()")
        e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_option_name_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONNAME']?></small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_TEXTENDUSER']?></label>'
		
		
		Forms.CreateValue("extra_details", "extra_option_text_to_end_user", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.extra_details.type == "create") {
                if(flaginfo[p].id == ProductOption.langdefaulteop){   
                    e1 +='<input type="text" id="extra_option_text_to_end_user_'+flaginfo[p].id+'" onkeydown="return ProductOption.PreValidationOption2(event,this.id);" value="" class="form-control" />' 
                }else{
                    e1 +='<input type="text" id="extra_option_text_to_end_user_'+flaginfo[p].id+'"  onkeypress="return ProductOption.PreValidationOption1(event);" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == ProductOption.langdefaulteop){   
                    e1 +='<input type="text" class="form-control" id="extra_option_text_to_end_user_'+flaginfo[p].id+'" onkeypress="return ProductOption.PreValidationOption1(event);" onkeyup="return ProductOption.Checkspecialchar(event,this.id)"  value="'+Main.NullToEmpty(d.option_text_to_end_user[flaginfo[p].id])+'" />' 
                }else{
                    e1 +='<input type="text" class="form-control" id="extra_option_text_to_end_user_'+flaginfo[p].id+'" onkeypress="return ProductOption.PreValidationOption1(event);" onkeyup="return ProductOption.Checkspecialchar(event,this.id)" class="form-control"  value="'+Main.NullToEmpty(d.option_text_to_end_user[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//e1 +=Forms.CreateInputPropertyPopup("extra_details", "extra_option_text_to_end_user", Main.NullToEmpty(d.name), true,"ProductOption.PreValidationOption()")
        e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_option_text_to_end_user_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONTEXTTOENDUSER']?></small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->
		e1 +='<div class="row" id='+choice_number+'>'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CHOICE']?>'+'&nbsp;'+choice_number+'</label>'
		Forms.CreateValue("extra_details", "extra_choice_name"+choice_number, "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
			if(flaginfo[p].id == ProductOption.langdefaulteop){   
                    e1 += Forms.CreateInputPropertyChoiceset("extra_details", "choice_name_"+choice_number+flaginfo[p].id, Main.NullToEmpty(d.name), true,"ProductOption.PreValidationOption()")
                }else{
                    e1 += Forms.CreateInputPropertyChoicesetnone("extra_details", "choice_name_"+choice_number+flaginfo[p].id, Main.NullToEmpty(d.name), true,"ProductOption.PreValidationOption()")
                } 
		}
		
		
		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_choice_name'+choice_number+'_text" style="color:#F00;display:none;">Choice Number Cannot be Empty</small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_PRICE']?></label>'
		e1 += Forms.CreateInputPropertyChoicesetPrice("extra_details", "extra_price"+choice_number, Main.NullToEmpty(d.name), true,"ProductOption.PreValidationOption()",'',false,"return Main.IsNumberKey(event)")
		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_price'+choice_number+'_text" style="color:#F00;display:none;">Price Cannot be Empty</small>'
		e1 +='</div>'
		e1 +='<div class="pull-right">'
		e1 +='<span><button class="btn btn-success rounded tbl-field" onclick="ProductOption.add_input()"><i class="fa icon-plus"></i></button></span>'
		//e1 +='<span><button class="btn btn-danger rounded tbl-field"><i class="fa icon-minus"></i></button></span>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->
		e1 +='<div id="add">'
		e1 +='</div>'
		
		e1 +='<div class="row">'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_MINSELECTION']?></label>'
		e1 += Forms.CreateSelectPropertyPopup("extra_details", "extra_min_sel",min,[], true,"ProductOption.PreValidationOption()") 
        e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_min_sel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONMINSEL']?></small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_MAXSELECTION']?></label>'
		e1 += Forms.CreateSelectPropertyPopup("extra_details", "extra_max_sel",max,[], true,"ProductOption.PreValidationOption()")
        e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_max_sel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONMAXSEL']?></small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->
		e1 +='<div class="row">'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_RANKOPTION']?></label>'
		e1 +=Forms.CreateSelectPropertyPopup("extra_details", "extra_rank",k,[], true,"ProductOption.PreValidationOption()")
        e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_rank_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONRANK']?></small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CONDITIONAL']?></label>'
		e1 +=Forms.CreateSelectPropertyPopup("extra_details", "extra_conditional",conditional,[], true,"ProductOption.ConditionalSelected(this,"+set_id+",''); ProductOption.PreValidationOption()") 
        e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_conditional_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONCONDITIONAL']?></small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->
		
		e1 +='<div id="add_conditions">'
		
		<!--row-->
		e1 +='</div>'
		<!--row-->
		
		// e1 +='<div class="row">'
		// e1 +='<div class="col-md-6">'
		// e1 +='<div class="">'
		// e1 +=Forms.CreateCheckBoxPropertyAdmin("extra_details", "extra_ingredients",H)
		// e1 +='<label for="extra_ingredients">&nbsp;</label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_PIZZAINGREDIENTS']?></div>'
		// e1 +='</div>'
		// <!--col-md-6-->
		// e1 +='</div>'
		<!--row-->
		
		e1 +='<div class="row">'
		e1 +='<div class="col-md-6 col-md-offset-3">'
		e1 +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ProductOption.Options()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CREATE']?></button></center>'
		e1 +='</div>'
		<!--col-md--->
		e1 +='</div>'
		<!--row-->
	
		
	
		
		Popup.Show(e1);

	
		
          
        choice_number_array.push(choice_number);

       
       
          Forms.Form.extra_details.set_id=set_id;
		
        Forms.Form.extra_details.choice_array = choice_number_array;
        Forms.Form.extra_details.choice_delete_array = choice_delete_array;
        
	
		
        var  i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN'] ?>', -1);
        for(j=0;j<=1;j++){
            i.options[i.options.length] = new Option(j,j);
        }


    },
	
	ConditionalSelected: function (b,set_id,opid) {
  
         if(b.options[b.selectedIndex].text=="Yes")
           {
			    var e1 ='<div class="row options" >'
				e1 +='<div class="col-md-6">'
				e1 +='<div class="form-group">'
				e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CONDITION_OPTION']?> </label>'
				e1 +=Forms.CreateSelectPropertyPopup("extra_details", "extra_with_respect_to_option",[],[], false,"ProductOption.PopulateChoices(null,this)")
				e1 +='</div>'
				e1 +='</div>'
				<!--col-md-6-->
				e1 +='<div class="col-md-6">'
				e1 +='<div class="form-group">'
				e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CONDITION_CHOICE']?> </label>'
				e1 +=Forms.CreateSelectPropertyPopup("extra_details", "extra_with_respect_to_choice",[],[], false)
				e1 +='</div>'
				e1 +='</div>'
				<!--col-md-6-->
				e1 +='</div>'
               $("#add_conditions").empty().append(e1);
			   
		
           }
        else
        {
            $(".options").remove();
        }
       ProductOption.PopulateOptions(set_id,opid);


  },
  
    PopulateOptions: function (set_id,opid) {
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/business.php","f=GetOptions&data=" + set_id+"&option="+opid, function (b) {
        /*   console.log(JSON.parse(b));*/
       // alert(b)
            if (e != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                var c = JSON.parse(b);
                var i = document.getElementById("extra_with_respect_to_option");
                if(i){
				i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j in c) {

                    i.options[i.options.length] = new Option(c[j]['option_name'], c[j]['option_id'])
                }
				}

            }
        })
    },
  
    PopulateChoices: function (d,op) {
        var set_id = Forms.Form.extra_details.set_id;

    var option_id=op.options[op.selectedIndex].value;

        Main.Loading();

        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/business.php","f=GetOptionChoices&data="+option_id+"&set_id="+set_id, function (b) {

            if (e != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                var c = JSON.parse(b);
                var i = document.getElementById("extra_with_respect_to_choice");
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j in c) {
                    if (d) {
                        if (c[j].id == d) {
                            a = j
                        }
                    }

                    i.options[i.options.length] = new Option(c[j]['choice_name'], c[j]['choice_id'])
                }
                if (d) {
                    i.selectedIndex = parseInt(a) + 1
                } else {
                    Forms.Form.extra_details.fields.extra_with_respect_to_choice.value = "";

                }
            }
        })
    },
	
	add_input:function(){
        choice1++;
        choice_number++;
        choice_number_array.push(choice_number);
		Forms.CreateValue("extra_details", "extra_choice_name"+choice_number, "",true)
		var e1 ='<div class="row" id='+choice_number+'>'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CHOICE']?>'+'&nbsp;'+choice_number+'</label>'
		
		
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
			if(flaginfo[p].id == ProductOption.langdefaulteop){   
                    e1 += Forms.CreateInputPropertyChoiceset("extra_details", "choice_name_"+choice_number+flaginfo[p].id,[], false)
                }else{
                    e1 += Forms.CreateInputPropertyChoicesetnone("extra_details", "choice_name_"+choice_number+flaginfo[p].id, [], false)
                } 
		}
		
		
		//e1 += Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_name"+choice_number, [], false)
		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_choice_name'+choice_number+'_text" style="color:#F00;display:none;">Choice Name Cannot be Empty</small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_PRICE']?></label>'
		e1 += Forms.CreateInputPropertyChoicesetPrice("extra_details", "extra_price"+choice_number,[], false,"return Main.IsNumberKey(event)")
		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_price'+choice_number+'_text" style="color:#F00;display:none;">Price Cannot be Empty</small>'
		e1 +='</div>'
		e1 +='<div class="pull-right">'
		e1 +='<span><button class="btn btn-success rounded tbl-field" onclick="ProductOption.add_input('+choice_number+')"><i class="fa icon-plus"></i></button></span>'
		e1 +='<span><button class="btn btn-danger rounded tbl-field" onclick="ProductOption.delete_input('+choice_number+','+choice_number+')"><i class="fa icon-minus"></i></button></span>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->

        $("#add").append(e1);
        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMAX'] ?>', 0);
        for(j=1;j<=choice1+1;j++){
                   i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN'] ?>', -1);
        for(j=0;j<=choice1+1;j++){
        i.options[i.options.length] = new Option(j,j);
        }

    },
	
	delete_input:function(id){
        choice1--;

        $("#"+id).remove();
        choice_number_array[id]=-1;
        
        var max = new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMAX'] ?>', 0);
        for(j=1;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN'] ?>', -1);
        for(j=0;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }

    },
  
    <!--Add-->
  	<!--Copy-->
	
	copyOption: function(set_id,id){ 

        ids=[{"id":''+id+'',"set_id":''+set_id+''}]
            console.log(JSON.stringify(ids));
        $.post("lib/business.php", "f=GetExtrasOptionsTOCopy&data=" + JSON.stringify(ids), function (a) {
          //  Business.add_input();
         
            ProductOption.update_option_dropdown(set_id);

        });
        /*Here will be code  to copy option*/
    }, 
	
	<!--Copy-->
	
	<!--Edit-->
	
	EditOptionsVia: function (set_id,id) {
    Main.Loading();
      $.post("lib/business.php", "f=get_max_rank&data=" +JSON.stringify(set_id), function (a) {
      
        Main.Ready();
                dataRank=JSON.parse(a);
              
                //Main.busirankData=dataRank;
               ProductOption.EditOptions(set_id,id,dataRank)  
             
          });
         
    },
	
	
	show_id2: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlagEOP-"+flaginfo[Z].id).className  = '';
            document.getElementById("extra_option_name_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("extra_option_text_to_end_user_"+flaginfo[Z].id).style.display  = "none";
			for(var c in choice_number_array){
				if(choice_number_array[c]>=0){
			document.getElementById("choice_update_name"+flaginfo[Z].id+choice_number_array[c]).style.display  = "none";
				}
			
			}
			
        }
	
        
        document.getElementById("langFlagEOP-"+id).className  = 'active';
        document.getElementById("extra_option_name_"+id).style.display  = "block";
		document.getElementById("extra_option_text_to_end_user_"+id).style.display  = "block";
		for(var c in choice_number_array){
			if(choice_number_array[c]>=0){
		document.getElementById("choice_update_name"+id+choice_number_array[c]).style.display  = "block";
			}
			}
		
		
    },
	
	
	
	EditOptions: function (set_id,id,dataRank) {
		
		$('div[id*=newpopup]').remove();
		
        ids=[{"id":''+id+'',"set_id":''+set_id+''}]
        $.post("lib/business.php", "f=GetAllOptions&data=" +JSON.stringify(ids), function (a) {
       
            data=JSON.parse(a);
            console.log(data[0]['option_name']);
            Forms.Clean("extra_details", "popupmainbuttonok");
            Forms.Form.extra_details.type = "modify";
            Forms.Form.extra_details.set_id=set_id;

            choice1=0;
            d = new Object();

            Forms.Form.extra_details.extra_details = d;
            Forms.Form.extra_details.extra_details = d;
            Business.ActiveForm = "extra_details";
			
            var conditional=new Array();
            conditional.push({
                id: "-1",
                caption: '<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTCONDITIONAL'] ?>'
            });
            conditional.push({
                id: "0",
                caption: "No"
            });
            conditional.push({
                id: "1",
                caption: "Yes"
            });
         
           var k=new Array();
            k.push({
                id: "-1",
                caption: '<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTRANK']?>'
            });
            for(var p=1;p<=dataRank;p++) {
                    k.push({
                        id: p,
                        caption: p
                    });
            }
            
           
            choice_number=0;
            choice_number_array=new Array();
			choice_numberdisplay_array=new Array();
            Forms.Form.extra_details.choice_array = choice_number_array;
            Forms.Form.extra_details.choice_delete_array = choice_delete_array;

            var max=new Array();
            var min=new Array();


            for(var i=0;i< data.length;i++){
               ids[i]=data[i]['id'];
                }
            Forms.Form.extra_details.id = ids;
           if(data[0]['ingredients']=='t')
            H=true;
            else
            H=false;
            Forms.Form.extra_details.option_id=data[0]['option_id'];
			

			var e1 ='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_HEADING_EDIT']?></h3>'
			
			e1 +='<div class="row">'
			e1 +='<ul class="pop_lang_img">'
			flaginfo=Main.languageinfo;
			for(Z in flaginfo){
			var m = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
				ProductOption.langdefaulteope = flaginfo[Z].id;                             
				e1+='<li class="active" id="langFlagEOP-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="ProductOption.show_id2('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'
			}else{
				e1+='<li  id="langFlagEOP-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="ProductOption.show_id2('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'  
			}
			}
			e1 +='</ul>'
			e1 +='</div>'
			<!--row-->
			
			e1 +='<div class="row">'
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_NAME']?></label>'
			Forms.CreateValue("extra_details", "extra_option_name", "",true)
			flaginfo=Main.languageinfo;
        for(po in flaginfo){           
                if(flaginfo[po].id == ProductOption.langdefaulteope){   
                    e1 +='<input type="text" id="extra_option_name_'+flaginfo[po].id+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="'+Main.NullToEmpty(data[0]['option_name'][flaginfo[po].id])+'" />' 
                }else{
                    e1 +='<input type="text" id="extra_option_name_'+flaginfo[po].id+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="'+Main.NullToEmpty(data[0]['option_name'][flaginfo[po].id])+'" style="display:none;" />' 
                }  
            
        }
			
			//e1 +=Forms.CreateInputPropertyPopup("extra_details", "extra_option_name", Main.NullToEmpty(data[0]['option_name']), true,"ProductOption.PreValidationOption()")
       		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_option_name_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONNAME']?></small>'
			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_TEXTENDUSER']?></label>'
			Forms.CreateValue("extra_details", "extra_option_text_to_end_user", "",true)
			flaginfo=Main.languageinfo;
        for(pot in flaginfo){           
                if(flaginfo[pot].id == ProductOption.langdefaulteope){   
                    e1 +='<input type="text" id="extra_option_text_to_end_user_'+flaginfo[pot].id+'" onkeydown="return ProductOption.PreValidationOption2(event,this.id);" class="form-control"  value="'+Main.NullToEmpty(data[0]['option_text_to_end_user'][flaginfo[pot].id])+'" />' 
                }else{
                    e1 +='<input type="text" id="extra_option_text_to_end_user_'+flaginfo[pot].id+'" onkeypress="return ProductOption.PreValidationOption1(event)"  class="form-control"  value="'+Main.NullToEmpty(data[0]['option_text_to_end_user'][flaginfo[pot].id])+'" style="display:none;" />' 
                }  
            
        }
			
			//e1 +=Forms.CreateInputPropertyPopup("extra_details", "extra_option_text_to_end_user", Main.NullToEmpty(data[0]['option_text_to_end_user']), true,"ProductOption.PreValidationOption()")
			e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_option_text_to_end_user_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONTEXTTOENDUSER']?></small>'

			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='</div>'
			<!--row-->

        
            for(var i=0;i< data.length;i++){
				if(data[i]['chname']!=''){ 
              choice_number++;
			 
			e1 +='<div class="row" id='+choice_number+'>'
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CHOICE']?>'+'&nbsp;'+choice_number+'</label>'
			Forms.CreateValue("extra_details", "extra_choice_update_name"+data[i]['id'], "",true)
			
			flaginfo=Main.languageinfo;
        for(pot in flaginfo){           
                if(flaginfo[pot].id == ProductOption.langdefaulteope){   
                    e1 +='<input type="text" id="choice_update_name'+flaginfo[pot].id+''+data[i]['id']+'" onkeyup="ProductOption.PreValidationOption()" class="form-control" onkeypress="return ProductOption.PreValidationOption3(event);" value="'+Main.NullToEmpty(data[i]['chname'][flaginfo[pot].id])+'" />' 
                }else{
                    e1 +='<input type="text" id="choice_update_name'+flaginfo[pot].id+''+data[i]['id']+'" onkeyup="ProductOption.PreValidationOption()" class="form-control" onkeypress="return ProductOption.PreValidationOption3(event);" value="'+Main.NullToEmpty(data[i]['chname'][flaginfo[pot].id])+'" style="display:none;" />' 
                }  
            
        }
			
	
			
			//e1 += Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_update_name"+data[i]['id'], Main.NullToEmpty(data[i]['choice_name']), false,"ProductOption.PreValidationOption()")
			e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_choice_update_name'+choice_number+'_text" style="color:#F00;display:none;">Choic Name Cannot be Empty</small>'
			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_PRICE']?></label>'
			e1 += Forms.CreateInputPropertyChoicesetPrice("extra_details", "extra_price_update"+data[i]['id'], Main.NullToEmpty(data[i]['price']), false,"ProductOption.PreValidationOption()",'',false, "return Main.IsNumberKey(event)")
			e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_price_update'+choice_number+'_text" style="color:#F00;display:none;">Price Cannot be Empty</small>'
			e1 +='</div>'
			e1 +='<div class="pull-right">'
			e1 +='<span><button class="btn btn-success rounded tbl-field"  onclick="ProductOption.add_edit_input('+choice_number+')"><i class="fa icon-plus"></i></button></span>'
			e1 +='<span><button class="btn btn-danger rounded tbl-field" onclick="ProductOption.delete_edit_input('+choice_number+','+data[i]['id']+')"><i class="fa icon-minus"></i></button></span>'
			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='</div>'
			<!--row-->

            choice1++;
            choice_number_array.push(parseInt(data[i]['id']));
            console.log(choice_number_array);
         }
		}

		  var cr = "";
             
          if(data[0]['conditional'] == "no") {
          cr = 0;
          } else {
           cr = 1;
          }

			e1 +='<div id="add">'
			e1 +='</div>'
			
           var tmp = data[0]['min_sel']
		   	e1 +='<div class="row">'
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_MINSELECTION']?></label>'
			e1 += Forms.CreateSelectPropertyPopup("extra_details", "extra_min_sel",min,data[0]['min_sel'],true,"ProductOption.PreValidationOption()")
       		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_min_sel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONMINSEL']?></small>'
			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_MAXSELECTION']?></label>'
			e1 += Forms.CreateSelectPropertyPopup("extra_details", "extra_max_sel",max,data[0]['max_sel'], true,"ProductOption.PreValidationOption()")
      		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_max_sel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONMAXSEL']?></small>'
			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='</div>'
			<!--row-->


			e1 +='<div class="row">'
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_RANKOPTION']?></label>'
			e1 +=Forms.CreateSelectPropertyPopup("extra_details", "extra_rank",k,data[0]['rank'], true,"ProductOption.PreValidationOption()")
       		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_rank_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONRANK']?></small>'
			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			var withrespect = data[0]['with_respect_to'];
			e1 +='<div class="col-md-6">'
			e1 +='<div class="form-group">'
			e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CONDITIONAL']?></label>'
			e1 +=Forms.CreateSelectPropertyPopup("extra_details","extra_conditional",conditional,cr,true,"ProductOption.ConditionalSelected(this,"+set_id+","+data[0].option_id+");ProductOption.PreValidationOption()")
			e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_conditional_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EXTRAOPTIONCONDITIONAL']?></small>'

			e1 +='</div>'
			e1 +='</div>'
			<!--col-md-6-->
			e1 +='</div>'
			<!--row-->
			
			e1 +='<div id="add_conditions">'
			
			e1 +='</div>'

			
			// e1 +='<div class="row">'
			// e1 +='<div class="col-md-6">'
			// e1 +='<div class="">'
			// e1 +=Forms.CreateCheckBoxPropertyAdmin("extra_details", "extra_ingredients",H,true)
			// e1 +='<label for="extra_ingredients">&nbsp;</label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_PIZZAINGREDIENTS']?></div>'
			// e1 +='</div>'
			// <!--col-md-6-->
			// e1 +='</div>'
			// <!--row-->

            e1 +='<div class="row">'
			e1 +='<div class="col-md-6 col-md-offset-3">'
			e1 +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ProductOption.ExtraEditOptions()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_UPDATE']?></button></center>'
			e1 +='</div>'
			<!--col-md--->
			e1 +='</div>'
			<!--row-->
			
			
			Popup.Show(e1);

           
            ids_temp=[{"option_id":''+id+'',"set_id":''+set_id+''}]
            $.post("lib/business.php", "f=get_max_selection&data=" +JSON.stringify(ids_temp), function (a) {

                datac=JSON.parse(a);
               //alert(data[0]['conditional'])
                if(data[0]['conditional'] == "yes") {
					
					
                if(Main.NullToEmpty(data[0]['with_respect_to']) =="") {
                 ProductOption.ConditionalSelectedAttend2('1',set_id,'')
                 }
                 else {
                   ProductOption.ConditionalSelectedAttend2('1',set_id,withrespect)
                 }
                // Business.PopulateChoicesAttend2(null,set_id)
						}
                var i = document.getElementById("extra_max_sel");
                i.options.length = 0;
                i.options[i.options.length] = new Option("<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMAX'] ?>", 0);
             
                for(var j=1;j<=datac;j++){
                 
                    if(j == data[0]['max_sel']) {
                      (i.options[i.options.length] = new Option( j,j)).setAttribute("selected","selected");
                      }
                      else {
                      i.options[i.options.length] = new Option( j,j);
                      }
                }
                i = document.getElementById("extra_min_sel");
                i.options.length = 0;
                i.options[i.options.length] = new Option("<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN'] ?>", -1);
                for(var j=0;j<=datac;j++){
                 if(j==data[0]['min_sel']) {
                    (i.options[i.options.length] = new Option( j,j)).setAttribute("selected","selected");
                    }
                   else {
                   i.options[i.options.length] = new Option( j,j);
                  }
                }
         

            });
            
          
            

        })

    },
	
	add_edit_input:function(id){
        choice1++;
        choice_number++;
        choice_number_array.push(choice_number);
        console.log(choice_number_array);
		var e1 ='<div class="row" id='+choice_number+'>'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CHOICE']?>'+'&nbsp;'+choice_number+'</label>'
		
		
		Forms.CreateValue("extra_details", "extra_choice_update_name"+choice_number, "",true)
			flaginfo=Main.languageinfo;
        for(pot in flaginfo){           
                if(flaginfo[pot].id == ProductOption.langdefaulteope){   
                    e1 +='<input type="text" id="choice_update_name'+flaginfo[pot].id+''+choice_number+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="" />' 
                }else{
                    e1 +='<input type="text" id="choice_update_name'+flaginfo[pot].id+''+choice_number+'" onkeyup="ProductOption.PreValidationOption()" class="form-control"  value="" style="display:none;" />' 
                }  
            
        }
		
		//e1 += Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_save_name"+choice_number, [], false,"ProductOption.PreValidationOption()")
		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_choice_save_name'+choice_number+'_text" style="color:#F00;display:none;">Choic Name Cannot be Empty</small>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_PRICE']?></label>'
		e1 += Forms.CreateInputPropertyChoicesetPrice("extra_details", "extra_price_save"+choice_number,[], false,"ProductOption.PreValidationOption(); return Main.IsNumberKey(event);")
		e1 +='<small data-bv-validator="notEmpty" class="help-block" id="extra_price_save'+choice_number+'_text" style="color:#F00;display:none;">Price Cannot be Empty</small>'
		e1 +='</div>'
		e1 +='<div class="pull-right">'
		e1 +='<span><button class="btn btn-success rounded tbl-field" onclick="ProductOption.add_edit_input('+choice_number+')"><i class="fa icon-plus"></i></button></span>'
		e1 +='<span><button class="btn btn-danger rounded tbl-field" onclick="ProductOption.delete_edit_input('+choice_number+','+choice_number+')"><i class="fa icon-minus"></i></button></span>'
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->

		
		
		
        $("#add").append(e1);
        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMAX'] ?>', 0);
        for(j=1;j<=choice1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN'] ?>', -1);
        for(j=0;j<=choice1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
    },
	
	delete_edit_input:function(id,del_choice){
        choice1--;

        $("#"+id).remove();
        temp=choice_number_array.indexOf(del_choice);
            choice_number_array[temp]=-1;
        choice_delete_array.push(del_choice);
            console.log(choice_number_array);
        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMAX'] ?>', 0);
        for(j=1;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('<?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_SELECTMIN'] ?>', -1);
        for(j=0;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }

    },
	
	
	ConditionalSelectedAttend2: function (b,set_id,withrespect) {
      
     var array = [];
     array[0] = withrespect.split(",");

	  	var e1 ='<div class="row options" >'
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CONDITION_OPTION']?> </label>'
		e1 +=Forms.CreateSelectPropertyPopup("extra_details","extra_with_respect_to_option",[],[],false,"ProductOption.PopulateChoices(null,this)")
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='<div class="col-md-6">'
		e1 +='<div class="form-group">'
		e1 +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE_PRODUCTOPTION_CONDITION_CHOICE']?> </label>'
		e1 +=Forms.CreateSelectPropertyPopup('extra_details', "extra_with_respect_to_choice",[],[], false)
		e1 +='</div>'
		e1 +='</div>'
		<!--col-md-6-->
		e1 +='</div>'
		<!--row-->

    
 $("#add_conditions").empty().append(e1);
        // alert(array[0][0])
        //  alert(array[0][1])
      ProductOption.PopulateOptions2(set_id,array[0][0],array[0][1]);

 
  },
  
    PopulateOptions2: function (set_id,withrespect,withrespectchoice) {
   
    
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/business.php","f=GetOptions&data=" + set_id, function (b) {
        
        
        /*   console.log(JSON.parse(b));*/
            if (e != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                var c = JSON.parse(b);
                var i = document.getElementById("extra_with_respect_to_option");
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
            
                var k = document.getElementById("extra_with_respect_to_choice");
                k.options.length = 0;
                k.options[k.options.length] = new Option("", "");
                
                var a = 0;
                //alert(JSON.stringify(c))
                for (var j in c) {
                
					if(c[j]['option_id']==withrespect) {
                      (i.options[i.options.length] = new Option(c[j]['option_name'], c[j]['option_id'])).setAttribute("selected","selected");

                      
                       ProductOption.PopulateChoicesAttend2(null,withrespect,withrespectchoice)
                      /* for (var p in c) {
                      	if(c[p]['choice_id']==withrespectchoice) {
                      		(k.options[k.options.length] = new Option(c[p]['choice_name'], c[p]['choice_id'])).setAttribute("selected","selected");
                            
                             Forms.Form.extra_details.fields.with_respect_to_option = c[j]['option_id'];
     						 Forms.Form.extra_details.fields.with_respect_to_choice = c[p]['choice_id'];

                      	}else{k.options[k.options.length] = new Option(c[p]['choice_name'], c[p]['choice_id'])}
                      } 	*/
                    
                    }else{i.options[i.options.length] = new Option(c[j]['option_name'], c[j]['option_id'])}
                }
             

            }
        })
    },
	
	PopulateChoicesAttend2: function (d,op,chs) {
        var set_id = Forms.Form.extra_details.set_id;
    var option_id=op;

        Main.Loading();

        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/business.php","f=GetOptionChoices&data="+option_id+"&set_id="+set_id, function (b) {

            if (e != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                var c = JSON.parse(b);
                var i = document.getElementById("extra_with_respect_to_choice");
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j in c) {
                    if (d) {
                        if (c[j].id == d) {
                            a = j
                        }
                    }
				if(c[j]['choice_id']==chs) {
      				(i.options[i.options.length] = new Option(c[j]['choice_name'], c[j]['choice_id'])).setAttribute("selected","selected");
                  
                    }
                    else {
                      i.options[i.options.length] = new Option(c[j]['choice_name'], c[j]['choice_id'])
                  
                    }
                }
                if (d) {
                    i.selectedIndex = parseInt(a) + 1
                } else {
                    Forms.Form.extra_details.fields.extra_with_respect_to_choice.value = "";

                }
            }
        })
    },
	
	<!--Edit-->
	<!--Save -->
	ExtraEditOptions:function(){
    	if(ProductOption.PreValidationOption()==false){
    		return false
    	}
  
        Forms.UpdateValue("extra_details", "extra_option_name", ProductOption.optionnamelang,true); 
		Forms.UpdateValue("extra_details", "extra_option_text_to_end_user", ProductOption.texttoenduserlang,true); 
		
		flaginfo=Main.languageinfo

	
		for(var c in choice_number_array){
			var langarray = new Array();
		
		if(choice_number_array[c]>=0){
			
        for(Z in flaginfo){
			
			var v = document.getElementById("choice_update_name"+flaginfo[Z].id+choice_number_array[c]).value;
			
			choicelang = new Object();
			choicelang.langid = flaginfo[Z].id;
			choicelang.value = v;
			//namelang[flaginfo[Z].id] = v;
			langarray.push(choicelang);

			}
		
		
			Forms.UpdateValue("extra_details", "extra_choice_update_name"+choice_number_array[c], JSON.stringify(langarray),true); 
		}
		}

     
		var esp = Forms.Form.extra_details.set_id;
		
       
        Forms.Form.extra_details.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_details.fields, "extra_");
       
        Forms.Form.extra_details.num_choices = choice1;
       

        Forms.Form.extra_details.num_choices = choice1;
 
    if(Forms.Form.extra_details.fields.conditional.value == 1) {
    
     if(Forms.Form.extra_details.fields.with_respect_to_option.value == "") {
    Forms.Form.extra_details.fields.with_respect_to_option.value ="";
    
    }
      if(Forms.Form.extra_details.fields.with_respect_to_choice.value == "") {
      Forms.Form.extra_details.fields.with_respect_to_choice.value ="";
    
    }
    }
   	
        console.log( Forms.Form.extra_details.fields);
        console.log( Forms.Form.extra_details);
        
      
        var e = true;
        Main.Loading();
		
		for(var g in Forms.Form.extra_details.fields){			
			Forms.Form.extra_details.fields[g].value = window.btoa(unescape(encodeURIComponent(Forms.Form.extra_details.fields[g].value)))
            Forms.Form.extra_details.fields[g].value = Forms.Form.extra_details.fields[g].value.split("+").join("@@");
			Forms.Form.extra_details.fields[g].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.extra_details.fields[g].ivalue)))
            Forms.Form.extra_details.fields[g].ivalue = Forms.Form.extra_details.fields[g].ivalue.split("+").join("@@");
		} 
       
        $.post("lib/business.php","f=EditExtraOptions&data=" + JSON.stringify(Forms.Form.extra_details), function (a) {
      
      		Main.Ready();
			ProductOption.update_option_dropdown(esp);
           Popup.Close();
		});
        Forms.Clean("extra_details")

    },
	PreValidationOption1: function(e){
	
		var k = e.keyCode;
            return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8   ||  k == 32  || (k >= 48 && k <= 57));	
	
	},
	PreValidationOption2: function(e,id){
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
	PreValidationOption4: function(e){
        var a = (e.which) ? e.which : event.keyCode;
        if (a != 46 && a > 31 && (a < 48 || a > 57)) {
            return false
        }

        var k = e.keyCode;
            if(k==38 || k==58)
                return false;
    
    },
    PreValidationOption3: function(e){  

        var k = e.keyCode;
            if(k==38 || k==58)
                return false;
    
    },
	PreValidationOption: function(){
		
   	var count = 0;	

		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == ProductOption.langdefault){
    	if(document.getElementById("extra_option_name_"+flaginfo[Z].id).value == ""){
            $("#extra_option_name_text").show();
            $("#extra_option_name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#extra_option_name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_option_name_text").hide();
            $("#extra_option_name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#extra_option_name_"+flaginfo[Z].id).removeClass("error-text-field");
        }
			
			
		if(document.getElementById("extra_option_text_to_end_user_"+flaginfo[Z].id).value == ""){
            $("#extra_option_text_to_end_user_text").show();
            $("#extra_option_text_to_end_user_"+flaginfo[Z].id).addClass("error-text-field");
            $("#extra_option_text_to_end_user_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_option_text_to_end_user_text").hide();
            $("#extra_option_text_to_end_user_"+flaginfo[Z].id).addClass("success-text-field");
            $("#extra_option_text_to_end_user_"+flaginfo[Z].id).removeClass("error-text-field");
        }
			
		
		
		
		}
		
			var optionnamedata = document.getElementById("extra_option_name_"+flaginfo[Z].id).value;
            ProductOption.optionnamelang[flaginfo[Z].id] = optionnamedata;
			
			var texttoenduserdata = document.getElementById("extra_option_text_to_end_user_"+flaginfo[Z].id).value;
            ProductOption.texttoenduserlang[flaginfo[Z].id] = texttoenduserdata;

	}
 
     
        for(var n in choice_number){
        	
        	if(Forms.Form.extra_details.type != "modify"){
			
        	if(document.getElementById("extra_choice_name"+choice_number[n]).value = ""){
	            $("#extra_choice_name"+choice_number[n]+"_text").show();
	            $("#extra_choice_name"+choice_number[n]).addClass("error-text-field");
	            $("#extra_choice_name"+choice_number[n]).removeClass("success-text-field");
	            count ++;
	        }else{
	        	$("#extra_choice_name"+choice_number[n]+"_text").hide();
	            $("#extra_choice_name"+choice_number[n]).addClass("success-text-field");
	            $("#extra_choice_name"+choice_number[n]).removeClass("error-text-field");
	        }
	        if(document.getElementById("extra_price"+choice_number[n]).value == ""){
	            $("#extra_price"+choice_number[n]+"_text").show();
	            $("#extra_price"+choice_number[n]).addClass("error-text-field");
	            $("#extra_price"+choice_number[n]).removeClass("success-text-field");
	            count ++;
	        }else{
	        	$("#extra_price"+choice_number[n]+"_text").hide();
	            $("#extra_price"+choice_number[n]).addClass("success-text-field");
	            $("#extra_price"+choice_number[n]).removeClass("error-text-field");
	        }
	    	}else{
	    		if(document.getElementById("extra_choice_save_name"+choice_number[n])){
	    			if(document.getElementById("extra_choice_save_name"+choice_number[n]).value == ""){
			            $("#extra_choice_save_name"+choice_number[n]+"_text").show();
			            $("#extra_choice_save_name"+choice_number[n]).addClass("error-text-field");
			            $("#extra_choice_save_name"+choice_number[n]).removeClass("success-text-field");
			            count ++;
		        	}else{
			        	$("#extra_choice_save_name"+choice_number[n]+"_text").hide();
			            $("#extra_choice_save_name"+choice_number[n]).addClass("success-text-field");
			            $("#extra_choice_save_name"+choice_number[n]).removeClass("error-text-field");
		        	}
		        	if(document.getElementById("extra_price_save"+choice_number[n]).value == ""){
			            $("#extra_price_save"+choice_number[n]+"_text").show();
			            $("#extra_price_save"+choice_number[n]).addClass("error-text-field");
			            $("#extra_price_save"+choice_number[n]).removeClass("success-text-field");
			            count ++;
		        	}else{
			        	$("#extra_price_save"+choice_number[n]+"_text").hide();
			            $("#extra_price_save"+choice_number[n]).addClass("success-text-field");
			            $("#extra_price_save"+choice_number[n]).removeClass("error-text-field");
		        	}
	    		}else{
	    			if(document.getElementById("extra_choice_update_name"+choice_number[n]).value == ""){
			            $("#extra_choice_update_name"+choice_number[n]+"_text").show();
			            $("#extra_choice_update_name"+choice_number[n]).addClass("error-text-field");
			            $("#extra_choice_update_name"+choice_number[n]).removeClass("success-text-field");
			            count ++;
			        }else{
			        	$("#extra_choice_update_name"+choice_number[n]+"_text").hide();
			            $("#extra_choice_update_name"+choice_number[n]).addClass("success-text-field");
			            $("#extra_choice_update_name"+choice_number[n]).removeClass("error-text-field");
			        }
			        if(document.getElementById("extra_price_update"+choice_number[n]).value == ""){
			            $("#extra_price_update"+choice_number[n]+"_text").show();
			            $("#extra_price_update"+choice_number[n]).addClass("error-text-field");
			            $("#extra_price_update"+choice_number[n]).removeClass("success-text-field");
			            count ++;
		       		}else{
			        	$("#extra_price_update"+choice_number[n]+"_text").hide();
			            $("#extra_price_update"+choice_number[n]).addClass("success-text-field");
			            $("#extra_price_update"+choice_number[n]).removeClass("error-text-field");
		        	}
	    		}		       
		        
		       
		        
	    	}
        }


		
		if(document.getElementById("extra_min_sel").value == -1){
            $("#extra_min_sel_text").show();
            $("#extra_min_sel").addClass("error-text-field");
            $("#extra_min_sel").removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_min_sel_text").hide();
            $("#extra_min_sel").addClass("success-text-field");
            $("#extra_min_sel").removeClass("error-text-field");
        }
		
		if(document.getElementById("extra_max_sel").value == 0){
            $("#extra_max_sel_text").show();
            $("#extra_max_sel").addClass("error-text-field");
            $("#extra_max_sel").removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_max_sel_text").hide();
            $("#extra_max_sel").addClass("success-text-field");
            $("#extra_max_sel").removeClass("error-text-field");
        }
		if(document.getElementById("extra_rank").value == 0 || document.getElementById("extra_rank").value == -1){
            $("#extra_rank_text").show();
            $("#extra_rank").addClass("error-text-field");
            $("#extra_rank").removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_rank_text").hide();
            $("#extra_rank").addClass("success-text-field");
            $("#extra_rank").removeClass("error-text-field");
        }
		if(document.getElementById("extra_conditional").value == -1){
            $("#extra_conditional_text").show();
            $("#extra_conditional").addClass("error-text-field");
            $("#extra_conditional").removeClass("success-text-field");
            count ++;
        }else{
        	$("#extra_conditional_text").hide();
            $("#extra_conditional").addClass("success-text-field");
            $("#extra_conditional").removeClass("error-text-field");
        }
        
        
        if(count == 0)
        	return true
        else 
        	return false
       
    },
	
	
	Options: function (f) {
    	if(ProductOption.PreValidationOption() == false){
    		return false;
    	}

       	Forms.UpdateValue("extra_details", "extra_option_name", ProductOption.optionnamelang,true); 
		Forms.UpdateValue("extra_details", "extra_option_text_to_end_user", ProductOption.texttoenduserlang,true);
		//alert(choice_number_array);
		var namelang = [];
		
		
        
		flaginfo=Main.languageinfo
        for(var c in choice_number_array){
            if(choice_number_array[c] != -1){
                var langarray = new Array();
                for(Z in flaginfo){
                    if(document.getElementById("choice_name_"+choice_number_array[c]+flaginfo[Z].id)){
                        var v = document.getElementById("choice_name_"+choice_number_array[c]+flaginfo[Z].id).value;
                        choicelang = new Object();
                        choicelang.langid = flaginfo[Z].id;
                        choicelang.value = v;
                        langarray.push(choicelang);
                    }
                }
                Forms.UpdateValue("extra_details", "extra_choice_name"+choice_number_array[c], JSON.stringify(langarray),true); 
            }
            
        }
		
		
     
        var a= '';
        var es = Forms.Form.extra_details.set_id;
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
		for(var s in Forms.Form.extra_details.fields){			
			
			Forms.Form.extra_details.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.extra_details.fields[s].value)))
            Forms.Form.extra_details.fields[s].value = Forms.Form.extra_details.fields[s].value.split("+").join("@@");
			Forms.Form.extra_details.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.extra_details.fields[s].ivalue)))
            Forms.Form.extra_details.fields[s].ivalue = Forms.Form.extra_details.fields[s].ivalue.split("+").join("@@");
		} 
   
        $.post("lib/business.php","f=SaveExtraOptions&data=" + JSON.stringify(Forms.Form.extra_details), function (a) {
        
       
        
            Main.Ready(true);
            if (e) {
                if (Main.IsNumber(a)) {
                    if (Business.ExtrasIds) {
                        Business.ExtrasIds += "," + a
                    } else {
                        Business.ExtrasIds = a
                    }
                }
            }

            // Business.GetExtras(null, true)
            //console.log(JSON.parse(a));
            
            ProductOption.update_option_dropdown(es);
			


        });
		 Popup.Close();
		 
        Forms.Clean("extra_details")
    },
	<!--Save -->
	
	Checkspecialchar: function(e,id)
	{
		
	 
	var slug = document.getElementById(id).value;
	
	if (/^[a-z0-9-A-Z. ]*$/.test(slug) == false ) {
			//cnt ++;
  			//alert("please do not enter any special characters or spaces on customslug field")
			document.getElementById(id).value = slug.substr(0,slug.length-1);
			
			return false
			
 		}
		
	},

	
	<!--Delete-->
	DeleteOptions: function (set_id,id) {
        ids=[{"id":''+id+'',"set_id":''+set_id+''}]
		
		  $.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PRODUCT_OPTION']?>',
			'btn': [
				{'label':'<?=$lang_resource['ADMIN_PAGE_YES']?>', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/business.php", "f=DeleteOptions&data=" +JSON.stringify(ids), function (a) {
						
						ProductOption.update_option_dropdown(set_id);
						alert('<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'<?=$lang_resource['ADMIN_PAGE_No'] ?>', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
		  

    },
	<!--Delete-->
	
};
