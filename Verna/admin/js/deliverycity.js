var DeliveryCity = {
    Main: function () {
		//Deliveryzone.namelang = Array();
		//Deliveryzone.addresslang = Array();
    	
	        Main.Loading();
	        var a = new Date().getTime();
	        Main.Aid = a;
		
					
						$.post("lib/deliverycity.php", "f=FetchAlldeliverycityDataById&id="+Business.id, function (b) {
					

				        Main.Ready();
				        if (b != "") {
							
				            DeliveryCity.datalist = JSON.parse(b);
							
							
							DeliveryCity.PrintMain()
							
				        } else {
				            alert("Error")
				        }



				});
			
			
			
		
    },
	
	PrintMain: function () {
	
		var c = "";	
		c +='<div class="panel panel-danger panel-no-border">'
		c +='<div class="panel-heading panel-heading-2">'
		c +='<div class="row">'
		c +='<div class="col-md-4">'
		c +='<h3 class="panel-title-2"><?= $lang_resource['BUSINESS_TAB_DELIVERYCITY_ZONE_HEADING'] ?></h3>'
		c +='</div>'
		<!--col-md-4-->
		c +='<div class="col-md-3">'
		c +='<div class="panel-btn filtr_margin">'
		c +='<input type="text" id="searchcity" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
		c +='</div>'
		c +='</div>'
		<!--col-md-4-->
		c +='<div class="col-md-5">'
		c +='<div class="panel-btn pull-right">'
		
		c +='<div class="inline-popups ">'
		c +='<span class=" panel-btn-2">'
		c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:DeliveryCity.New()" data-target="#text-popup-html" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_ADD'] ?></a>'
		c +='</span>'
		c +='<span class=" panel-btn-2">'
		c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:DeliveryCity.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_EDIT'] ?></a>'
		c +='</span>'
		c +='<span class=" panel-btn-2">'
		c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="DeliveryCity.Delete()"><i class="fa icon-remove2"></i> <?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELETE'] ?></button>'
		c +='</span>'
		c +='</div>'
		<!--popup content-->
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
		c +='<th width="10%" onclick="DeliveryCity.PupulateTable(\'id\')"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_SL'] ?></th>'
		c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'deliverycity\')"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_ALL'] ?></th>'
		c +='<th width="10%" onclick="DeliveryCity.PupulateTable(\'city\')"><?= $lang_resource['ADVERTISEMENT_POPULATE_HEADING_CITY'] ?></th>'
		c +='<th width="20%"><?= $lang_resource['ADMIN_PAGE_DELIVERY_FEE'] ?></th>'
		c +='<th width="20%"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_MIN_PURCHASES'] ?></th>'
		
		c +='<th width="20%"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_MIN_PURCHASES_FREE'] ?></th>'
		
		c +='<th width="20%"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_ENABLE'] ?></th>'
		c +='</tr>'
		c +='</thead>'
		c +='<tbody id="delivery_city">'
		
		
		c +='</tbody>'
		c +='</table>'
		c +='</div>'
		<!--table-responsive-->
		c +='</div>'
		<!-- /.panel-body -->
		c +='</div>'
		
		document.getElementById("tab_delivery_4").innerHTML = c;
		
        document.getElementById("searchcity").onkeyup = function () {
          DeliveryCity.PupulateTable("id", true)
        };
        
		
		DeliveryCity.PupulateTable("id", true)
    },
	
	
	PupulateTable: function (b, c) {
    
        var d = "";
        var a = DeliveryCity.datalist.length;

        var h = false;
        var f = "";
        var k = new Array();        
      
        for (var e in DeliveryCity.datalist) {      
       
            h = false;
            f = document.getElementById("searchcity").value.toLowerCase();
            if (String(DeliveryCity.datalist[e].id).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(DeliveryCity.datalist[e])
            }
            if (h) {
    			d += '<tr>'
    			d += '<td>'+ DeliveryCity.datalist[e].id +'</td>'
    			d += '<td><input type="checkbox" class="checkbox deliverycity" value="' + DeliveryCity.datalist[e].id + '"></td>'
    			d += '<td style="cursor:pointer;" onclick="DeliveryCity.Edit(' + DeliveryCity.datalist[e].id + ')">'+DeliveryCity.datalist[e].delcity +'</td>'
    			d += '<td style="cursor:pointer;" onclick="DeliveryCity.Edit(' + DeliveryCity.datalist[e].id + ')">'+ DeliveryCity.datalist[e].citydelivery_fee +'</td>'
				d += '<td style="cursor:pointer;" onclick="DeliveryCity.Edit(' + DeliveryCity.datalist[e].id + ')">'+ DeliveryCity.datalist[e].citydelivery_minper +'</td>'
				d += '<td style="cursor:pointer;" onclick="DeliveryCity.Edit(' + DeliveryCity.datalist[e].id + ')">'+ DeliveryCity.datalist[e].citydelivery_minperfree +'</td>'
    			d += '<td><div class="enebal" id="switchdeliverycity_' + DeliveryCity.datalist[e].id + '"></div></td>'
    			d += '</tr>'   
            }
        }
       
        document.getElementById("delivery_city").innerHTML = d;
        var g = false;
       // Switch.Init();
        for (e in k) {
            if (k[e].id != DeliveryCity.datalist.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
				
                Switch.Create("switchdeliverycity_" + k[e].id, g);
                Switch.OnChange("switchdeliverycity_" + k[e].id, function (m, l) {
                    DeliveryCity.SetEnabled(m.replace("switchdeliverycity_", ""), l)
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
        $.post("lib/deliverycity.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
        
            if (c != "ok") {
                Switch.SwitchTo("switchdeliverycity_" + b, !a)
            }
        })
    },	
	
	
	Edit: function (a, b) {
        var e = false;
        if (a) {
            e = true;
            Visuals.ForceMainButtonCancelEvent = b;
            DeliveryCity.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValuesByClass('deliverycity');           
			if (d.length == 1) {
                a = d[0];
                e = true
            }else if(d.length > 1){
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_EDIT']?>");
                return
            }
            Visuals.ForceMainButtonCancelEvent = null;
            DeliveryCity.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            Main.Loading();
			
			$.post("lib/deliverycity.php", "f=Fetchdeliverycitydatabyid&id="+a, function (g) {
					

				        Main.Ready();
				        if (g != "") {
							
				            g = JSON.parse(g);
							DeliveryCity.Form(g);
							
				        } else {
				            alert("Error")
				        }



				});
			

        }
    },

	
	
	 New: function () {
		DeliveryCity.Form();
    },

	    Form: function (e) {  

       //alert(JSON.stringify(e[0].id))
        Forms.Clean("citydelivery", "mainbuttonok");
        if (e == null) {     		
            e = new Object();
            Forms.Form.citydelivery.type = "create";
            Forms.Form.citydelivery.id="";
        } else {
            g = true;
            Forms.Form.citydelivery.type = "modify";
            Forms.Form.citydelivery.id = e.id;           
        }	 
        var k = "";
		
		if (Forms.Form.citydelivery.type == "create") {
		k +='<h3 class="popup-heading"><?= $lang_resource['DRIVER_TAB_ADD_DELIVERYCITY_DRIVER_GROUP'] ?></h3>'
		}
		else
		{
		k +='<h3 class="popup-heading"><?= $lang_resource['DRIVER_TAB_EDIT_DELIVERYCITY_DRIVER_GROUP'] ?></h3>'	
		}
		
		Forms.CreateValue("citydelivery", "businessid", Business.id,true)
		var d = new Array();
            d.push({
                id: "",
                caption: "select city"
            });
            for (c in Main.Franchises) {
                d.push({
                    id: Main.Franchises[c].id,
                    caption: Main.Franchises[c].city
                })
            }
		
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['CONTROL_ADMIN_PANEL_CITY_SELECT'] ?> *</label>'
		k +=Forms.CreateSelectPropertyPopup("citydelivery", "delcity", d,e.delcity, true, "DeliveryCity.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="delcity_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_CITY'] ?></small>'
        k +='</div>'
        k +='</div>'
		k +='</div>'
		
		
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['ADMIN_PAGE_DELIVERY_FEE'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("citydelivery", "citydelivery_fee", e.citydelivery_fee, true, "DeliveryCity.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="citydelivery_fee_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DELIVERYCITY_DELIVERY_FEE_ERROR'] ?></small>'
        k +='</div>'
        k +='</div>'
		k +='</div>'
		<!--col-md-12-->
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_MIN_PURCHASES'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("citydelivery", "citydelivery_minper",e.citydelivery_minper, true, "DeliveryCity.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="citydelivery_minper_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DELIVERYCITY_MIN_PERCHASE_ERROR'] ?></small>'
        k +='</div>'
        k +='</div>'
		k +='</div>'
		<!--col-md-12-->
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_MIN_PURCHASES_FREE'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("citydelivery", "citydelivery_minperfree",e.citydelivery_minperfree, true, "DeliveryCity.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="citydelivery_minperfree_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DELIVERYCITY_MIN_PERCHASE_FREE_ERROR'] ?></small>'
        k +='</div>'
        k +='</div>'
		k +='</div>'
       
		
		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.citydelivery.type == "create") {
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DeliveryCity.Save()"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE'] ?></button></center>'
		}else{
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DeliveryCity.Save()"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE'] ?></button></center>'	
		}
		k +='</div>'
		<!--col-md--->
		k +='</div>'
		<!--row-->
		k +='</div>'
		Popup.Show(k);
		
		
		
		},
		
		
		
		PreValidation: function(){
    	var count = 0;	

		if(document.getElementById("delcity").value == ""){
            $("#delcity_text").show();
            $("#delcity").addClass("error-text-field");
            $("#delcity").removeClass("success-text-field");
            count ++;
        }else{
        	$("#delcity_text").hide();
            $("#delcity").addClass("success-text-field");
            $("#delcity").removeClass("error-text-field");
        }
		
		if(document.getElementById("citydelivery_fee").value == ""){
            $("#citydelivery_fee_text").show();
            $("#citydelivery_fee").addClass("error-text-field");
            $("#citydelivery_fee").removeClass("success-text-field");
            count ++;
        }else{
        	$("#citydelivery_fee_text").hide();
            $("#citydelivery_fee").addClass("success-text-field");
            $("#citydelivery_fee").removeClass("error-text-field");
        }
		
		if(document.getElementById("citydelivery_minper").value == ""){
            $("#citydelivery_minper_text").show();
            $("#citydelivery_minper").addClass("error-text-field");
            $("#citydelivery_minper").removeClass("success-text-field");
            count ++;
        }else{
        	$("#citydelivery_minper_text").hide();
            $("#citydelivery_minper").addClass("success-text-field");
            $("#citydelivery_minper").removeClass("error-text-field");
        }
		
		if(document.getElementById("citydelivery_minperfree").value == ""){
            $("#citydelivery_minperfree_text").show();
            $("#citydelivery_minperfree").addClass("error-text-field");
            $("#citydelivery_minperfree").removeClass("success-text-field");
            count ++;
        }else{
        	$("#citydelivery_minperfree_text").hide();
            $("#citydelivery_minperfree").addClass("success-text-field");
            $("#citydelivery_minperfree").removeClass("error-text-field");
        }

			
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
	Save: function () {
         if(DeliveryCity.PreValidation() !=true){
            return
        }
		for(var s in Forms.Form.citydelivery.fields){	
		
			Forms.Form.citydelivery.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.citydelivery.fields[s].value)))
			Forms.Form.citydelivery.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.citydelivery.fields[s].ivalue)))


		} 

		
		Main.Request("deliverycity", null, "f=Savedeliverycity&data=" + JSON.stringify(Forms.Form.citydelivery), "DeliveryCity.Main()")
        Popup.Close(); 
        Forms.Clean("citydelivery");
		
	},
	
	Delete: function () {
		var b = Main.GetMarkedCheckBoxesValuesByClass('deliverycity');
        if (b.length == 0) {
			alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/deliverycity.php", "f=DeleteDeliverycity&data=" + JSON.stringify(a), function (e) {
						DeliveryCity.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});		
	
    }
	
};