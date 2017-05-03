document.write("<?php session_start(); require_once('../login/common.php'); require_authentication(1); ?>");
var DriverGroup = {
    Main: function () {
   	DriverGroup.namelang = Array();
        Main.Loading();
		var a = new Date().getTime();
	        Main.Aid = a;
        var b = this;		
		
        $.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {		
			DriverGroup.businessrest = JSON.parse(b);			
		})

        $.post("lib/drivergroup.php", "f=FetchAllDriverManagerData", function (b) {
                Main.Config.DriverGroup= new Object();
                Main.Config.DriverGroup.List= new Object();
                Main.Config.DriverGroup.List.SortBy = "id";
                Main.Config.DriverGroup.List.SortByStatus = "min";

            var totalrec = JSON.parse(b);
            var d = new Array();
            d.push(JSON.parse('{"id":"-1","caption":""}'));        
            for (var c in totalrec) {
                var e1 = new Object();
                e1.id = totalrec[c].id;
                e1.caption = totalrec[c].caption ;
                d.push(e1)
            }
            DriverGroup.restaurants = d;
        }) 
            
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchDriverGroupAllData"}]', function (c) {
			if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                DriverGroup.DriverGroups = JSON.parse(c).drivergroup;
                b.PrintMain()
            } else {              
                alert("Error")
            }
        })		
    },
    PrintMain: function () {        
        var c = "";       
        c += '<div class="panel panel-warning panel-square panel-no-border">'
        c += '<div class="panel-heading panel-heading-2">'
        c += '<div class="row">'
        c += '<div class="col-md-4">'
        c += '<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP'] ?></h3>'
        c += '</div>'
        <!--col-md-5-->
        c += '<div class="col-md-3">'
        c += '<div class="panel-btn filtr_margin">'
        c += '<input type="text" id="drivergroupsearch" class="form-control rounded panel-yellow-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c += '</div>'
        c += '</div>'
        <!--col-md-3-->
        c += '<div class="col-md-5">'
        c += '<div class="panel-btn pull-right">'
        c += '<div class="inline-popups">'
        c += '<span class=" panel-btn-2">'
        c += '<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:DriverGroup.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_ADD'] ?></a>'
		
        c += '</span>'
        c += '<span class=" panel-btn-2">'
        c += '<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:DriverGroup.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_EDIT'] ?></a>'
        c += '</span>'
        c += '<span class=" panel-btn-2">'
        c += '<button class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="DriverGroup.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_DELETE'] ?></button></span>'
        c += '</div>'
        c += '</div>'
        c += '</div>'
        <!--col-md-4-->
        c += '</div>'
        <!--row-->
        c += '</div>'

        c += '<div class="panel-body">'
        c += '<div class="table-responsive">'
        c += '<table class="table table-th-block table-striped tbl_enebal">'
        c += '<thead>'
        c += '<tr>'
        c += '<th width="10%" onclick="DriverGroup.PupulateTable(\'id\')" style="cursor:pointer;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_ID'] ?></th>'
        c += '<th width="20%" onclick="Main.ToogleAllCheckBoxes(\'drivergroup\')"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_ALL'] ?></th>'
        c += '<th width="25%" onclick="DriverGroup.PupulateTable(\'group_name\')" style="cursor:pointer;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUPSS'] ?></th>'
        c += '<th width="25%" onclick="DriverGroup.PupulateTable(\'id\')" style="cursor:pointer;"><?=$lang_resource['ADMIN_PAGE_DRIVER_MANAGER_M'] ?></th>'
        c += '<th width="20%"><?=$lang_resource['ADMIN_PAGE_DRIVER_ENABLE'] ?></th>'
        c += '</tr>'
        c += '</thead>'
        c += '<tbody id="drivergrouplist">'
        
        c += '</tbody>'
        c += '</table>'
        c += '</div>'
        <!--table-responsive-->
        c += '</div>'
        <!-- /.panel-body -->
        c += '</div>'

        $("#drivergroup").empty().append(c);
        Driver.Main();

        document.getElementById("drivergroupsearch").onkeyup = function () {         
            DriverGroup.PupulateTable("id", true)
        };        
        DriverGroup.PupulateTable("id", true)
    },

    PupulateTable: function (b, c) {
    
        var d = "";
        var a = DriverGroup.DriverGroups.length;

        if (c) {
            DriverGroup.DriverGroups.sort(Main.SortByProperty(b));
            if (Main.Config.DriverGroup.List.SortByStatus == "max") {
                DriverGroup.DriverGroups.reverse()
            }
        } else {
            if (Main.Config.DriverGroup.List.SortBy != b) {
                DriverGroup.DriverGroups.sort(Main.SortByProperty(b));
                Main.Config.DriverGroup.List.SortByStatus = "min"
            } else {
                DriverGroup.DriverGroups.reverse();
                if (Main.Config.DriverGroup.List.SortByStatus == "min") {
                    Main.Config.DriverGroup.List.SortByStatus = "max"
                } else {
                    Main.Config.DriverGroup.List.SortByStatus = "min"
                }
            }
        }
        
        Main.Config.DriverGroup.List.SortBy = b;

        var h = false;
        var f = "";
        var k = new Array();        
      
        for (var e in DriverGroup.DriverGroups) {      
       
            h = false;
            f = document.getElementById("drivergroupsearch").value.toLowerCase();
            if (String(DriverGroup.DriverGroups[e].id).toLowerCase().indexOf(f) >= 0 || (DriverGroup.DriverGroups[e].group_name).toLowerCase().indexOf(f) >= 0 || (DriverGroup.DriverGroups[e].drivermanager_name).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(DriverGroup.DriverGroups[e])
            }
            if (h) {
    			d += '<tr>'
    			d += '<td>'+ DriverGroup.DriverGroups[e].id +'</td>'
    			d += '<td><input type="checkbox" class="checkbox drivergroup" value="' + DriverGroup.DriverGroups[e].id + '"></td>'
    			d += '<td style="cursor:pointer;" onclick="DriverGroup.Edit(' + DriverGroup.DriverGroups[e].id + ')">'+ Main.TitleCase(DriverGroup.DriverGroups[e].group_name) +'</td>'
    			d += '<td style="cursor:pointer;" onclick="DriverGroup.Edit(' + DriverGroup.DriverGroups[e].id + ')">'+ (DriverGroup.DriverGroups[e].drivermanager_name) +'</td>'
    			d += '<td><div class="enebal" id="switchdrivergroup_' + DriverGroup.DriverGroups[e].id + '"></div></td>'
    			d += '</tr>'   
            }
        }
       
        document.getElementById("drivergrouplist").innerHTML = d;
        var g = false;
       // Switch.Init();
        for (e in k) {
            if (k[e].id != DriverGroup.DriverGroups.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
				
                Switch.Create("switchdrivergroup_" + k[e].id, g);
                Switch.OnChange("switchdrivergroup_" + k[e].id, function (m, l) {
                    DriverGroup.SetEnabled(m.replace("switchdrivergroup_", ""), l)
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
        $.post("lib/drivergroup.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
        
            if (c != "ok") {
                Switch.SwitchTo("switchdrivergroup_" + b, !a)
            }
        })
    },
    Edit: function (a, b) {
        var e = false;
        if (a) {
            e = true;
            Visuals.ForceMainButtonCancelEvent = b;
            DriverGroup.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValuesByClass('drivergroup');           
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
            DriverGroup.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            Main.Loading();
         
            Main.BulkRequest('data=[{"operation":"FetchDriverGroupData","id":"' + a + '"}]', "DriverGroup.PreEdit")
        }
    },

    PreEdit: function (a) {
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a); 
    
        this.Form(a.drivergroup)
    },

    New: function () {
		DriverGroup.Form();
    },


	show_id: function(id){	
		var b = document.getElementById("drivermanager_id").value;
    	 $.post("lib/drivergroup.php", "f=FetchAllDrivermanagerIDData&data=" + id, function (d) {		
            if (d != "") {
              var f = JSON.parse(d);
            
             var e = document.getElementById("drivermanager_id");
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
                    Forms.Form.driver.fields.drivermanager_id.value = "";                   
                }
                
                
             }
        });	
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("group_name_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("group_name_"+id).style.display  = "block";

    },
	

    Form: function (e) {  

        MultipleInput.AddListener("tagschange", "DriverGroup.MultiInputTagsChange");
        Forms.Clean("driver", "mainbuttonok");
        if (e == null) {     		
            e = new Object();
            Forms.Form.driver.type = "create";
            Forms.Form.driver.id="";
        } else {
            g = true;
            Forms.Form.driver.type = "modify";
            Forms.Form.driver.id = e.id;           
        }	 
        var k = "";
		
		if (Forms.Form.driver.type == "create") {
		k +='<h3 class="popup-heading"><?= $lang_resource['DRIVER_TAB_ADD_DRIVER_GROUP'] ?></h3>'
		}
		else
		{
		k +='<h3 class="popup-heading"><?= $lang_resource['DRIVER_TAB_EDIT_DRIVER_GROUP'] ?></h3>'	
		}

		k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                DriverGroup.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="DriverGroup.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="DriverGroup.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->

		k +='<div class="row">'
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_SELECT_MANAGER'] ?> *</label>'
        
		if(Main.User.level!=5)
            {
		
		k +=Forms.CreateSelectPropertyPopup("driver", "drivermanager_id", DriverGroup.restaurants, e.drivermanager_id, true,"DriverGroup.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="drivermanager_id_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE'] ?></small>'
			}
            else
            {
		k +=Forms.CreateSelectPropertyPopup("driver", "drivermanager_id", DriverGroup.restaurants, e.drivermanager_id, true,"DriverGroup.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="drivermanager_id_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE'] ?></small>'
			}
			
  		k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_GROUP_NAME'] ?> *</label>'
		
		
		Forms.CreateValue("driver", "group_name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.driver.type == "create") {
                if(flaginfo[p].id == DriverGroup.langdefault){   
                    k +='<input type="text" id="group_name_'+flaginfo[p].id+'" class="form-control" onkeyup="DriverGroup.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="group_name_'+flaginfo[p].id+'" onkeyup="DriverGroup.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == DriverGroup.langdefault){   
                    k +='<input type="text" id="group_name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.group_name[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="group_name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.group_name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
		//k +=Forms.CreateInputPropertyPopup("driver", "group_name", Main.NullToEmpty(e.group_name), true, "DriverGroup.PreValidation()", false, false)
		k +='<small data-bv-validator="notEmpty" class="help-block" id="groupname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_GROUP_NAME_REQUIRED'] ?></small>'
		k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='</div>'
		<!--row--> 
		
		
		k +='<h5><strong><?= $lang_resource['DRIVER_TAB_FIXED_RATE_AMOUNT'] ?></strong></h5>'
        k +='<div class="row">'
        k +='<div class="col-md-4">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_PER_DAY'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("driver", "per_day", Main.NullToEmpty(e.per_day), true, "DriverGroup.PreValidation()",false, false,"return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="perday_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PER_DAY_REQUIRED'] ?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='<div class="col-md-4">'
        
		k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_PER_MONTH'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("driver", "per_month", Main.NullToEmpty(e.per_month), true, "DriverGroup.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="permonth_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PER_MONTH_REQUIRED'] ?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='<div class="col-md-4">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_PER_YEAR'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("driver", "per_year", Main.NullToEmpty(e.per_year), true, "DriverGroup.PreValidation()",false, false, "return Main.IsNumberKey(event)")
       k +='<small data-bv-validator="notEmpty" class="help-block" id="peryear_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PER_YEAR_REQUIRED'] ?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='</div>'
		<!--row--> 
		
		
        k +='<div class="row">'
        k +='<div class="col-md-4">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_COMMISION_PER_ORDER'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("driver", "com_rate1", Main.NullToEmpty(e.com_rate1), true, "DriverGroup.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="com_doller_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_COMMISSION_INPER_ORDER'] ?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='<div class="col-md-4">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_COMMISION_PER_PER_CEN_ORDER'] ?> *</label>'
		k +=Forms.CreateInputPropertyPopup("driver", "com_rate", Main.NullToEmpty(e.com_rate), true, "DriverGroup.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="com_percent_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_COMMISSION_INPER_ORDER_PERCENTAGE'] ?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-4-->
		
        k +='<div class="col-md-4">'
        k +='<div class="form-group">'
        k +='<label><?= $lang_resource['DRIVER_TAB_COMMISION_RESTURANT_ASSIGN'] ?></label>'
		Forms.CreateValue("driver", "business",Main.NullToEmpty(e.business), true);
		k +='<input type="text" class="form-control" id="business">'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="business_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_IS_REQUIRED'] ?></small>'
        k +='</div>'
        k +='</div>'
		<!--col-md-4-->
        k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.driver.type == "create") {
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DriverGroup.Save('+Forms.Form.driver.id+')"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE'] ?></button></center>'
		}else{
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DriverGroup.Save('+Forms.Form.driver.id+')"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE'] ?></button></center>'	
		}
		k +='</div>'
		<!--col-md--->
		k +='</div>'
		<!--row-->
		k +='</div>'
		Popup.Show(k);
       
        
        MultipleInput.Init("business",DriverGroup.businessrest, true);
        
       
		if (Forms.Form.driver.type == "modify") {
            if (e.business != "") {
				var d = JSON.parse(e.business);
				for (var e in d) {
					MultipleInput.AddTagById("business", d[e])
				}
				Forms.Form.driver.fields.business.save = false
			}
		}
   },
   
   
	
	PreValidation: function(){
   	var count = 0;	
    	var per_day = document.getElementById("per_day").value;
		var per_month = document.getElementById("per_month").value;
		var per_year = document.getElementById("per_year").value;
		var com_rate1 = document.getElementById("com_rate1").value;
		var com_rate = document.getElementById("com_rate").value;
		
		if(document.getElementById("drivermanager_id").value == "-1"){
			
            $("#drivermanager_id_text").show();
            $("#drivermanager_id").addClass("error-text-field");
            $("#drivermanager_id").removeClass("success-text-field");
            count ++;
        }else{
        	$("#drivermanager_id_text").hide();
            $("#drivermanager_id").addClass("success-text-field");
            $("#drivermanager_id").removeClass("error-text-field");
        }
		
		
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == DriverGroup.langdefault){
    	if(document.getElementById("group_name_"+flaginfo[Z].id).value.replace(/ /g,'') == ""){
            $("#groupname_text").show();
            $("#group_name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#group_name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#groupname_text").hide();
            $("#group_name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#group_name_"+flaginfo[Z].id).removeClass("error-text-field");
        }

		
		}		
			var namedata = document.getElementById("group_name_"+flaginfo[Z].id).value;
            DriverGroup.namelang[flaginfo[Z].id] = namedata;

	}
		

		
		if(document.getElementById("per_day").value.replace(/ /g,'') == ""){
            $("#perday_text").show();
            $("#per_day").addClass("error-text-field");
            $("#per_day").removeClass("success-text-field");
            count ++;
        }
		else if(per_day <= 0){
            $("#perday_text").show();
            $("#per_day").addClass("error-text-field");
            $("#per_day").removeClass("success-text-field");
            count ++;
        }
		else{
        	$("#perday_text").hide();
            $("#per_day").addClass("success-text-field");
            $("#per_day").removeClass("error-text-field");
        }
		
		if(document.getElementById("per_month").value.replace(/ /g,'') == ""){
            $("#permonth_text").show();
            $("#per_month").addClass("error-text-field");
            $("#per_month").removeClass("success-text-field");
            count ++;
        }
		else if(per_month <= 0){
            $("#permonth_text").show();
            $("#per_month").addClass("error-text-field");
            $("#per_month").removeClass("success-text-field");
            count ++;
        }
		else{
        	$("#permonth_text").hide();
            $("#per_month").addClass("success-text-field");
            $("#per_month").removeClass("error-text-field");
        }
		
		if(document.getElementById("per_year").value.replace(/ /g,'') == ""){
            $("#peryear_text").show();
            $("#per_year").addClass("error-text-field");
            $("#per_year").removeClass("success-text-field");
            count ++;
        }
		else if(per_year <= 0){
            $("#peryear_text").show();
            $("#per_year").addClass("error-text-field");
            $("#per_year").removeClass("success-text-field");
            count ++;
        }
		else{
        	$("#peryear_text").hide();
            $("#per_year").addClass("success-text-field");
            $("#per_year").removeClass("error-text-field");
        }
		
		if(document.getElementById("com_rate1").value.replace(/ /g,'') == ""){
            $("#com_doller_text").show();
            $("#com_rate1").addClass("error-text-field");
            $("#com_rate1").removeClass("success-text-field");
            count ++;
        }
		else if(com_rate1 <= 0){
            $("#com_doller_text").show();
            $("#com_rate1").addClass("error-text-field");
            $("#com_rate1").removeClass("success-text-field");
            count ++;
        }
		else{
        	$("#com_doller_text").hide();
            $("#com_rate1").addClass("success-text-field");
            $("#com_rate1").removeClass("error-text-field");
        }
		
		if(document.getElementById("com_rate").value.replace(/ /g,'') == ""){
            $("#com_percent_text").show();
            $("#com_rate").addClass("error-text-field");
            $("#com_rate").removeClass("success-text-field");
            count ++;
        }
		else if(com_rate <= 0){
            $("#com_percent_text").show();
            $("#com_rate").addClass("error-text-field");
            $("#com_rate").removeClass("success-text-field");
            count ++;
        }
		else{
        	$("#com_percent_text").hide();
            $("#com_rate").addClass("success-text-field");
            $("#com_rate").removeClass("error-text-field");
        }
		
        var e = MultipleInput.GetTagsIds('business');
        if (e.length > 0) {
            $("#business_text").hide();
            $("#businesscontainer").addClass("success-text-field");
            $("#businesscontainer").removeClass("error-text-field");
        }else{
            $("#business_text").show();
            $("#businesscontainer").addClass("error-text-field");
            $("#businesscontainer").removeClass("success-text-field");
            count ++;
        }
			
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
    Save: function (a) {
         if(DriverGroup.PreValidation(a) !=true){
            return
        }
  
      Forms.UpdateValue("driver", "group_name", DriverGroup.namelang,true); 

		for(var s in Forms.Form.driver.fields){	
		
			Forms.Form.driver.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.driver.fields[s].value)))
			Forms.Form.driver.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.driver.fields[s].ivalue)))
			Forms.Form.driver.fields[s].value = Forms.Form.driver.fields[s].value.split("+").join("@@");
			Forms.Form.driver.fields[s].ivalue = Forms.Form.driver.fields[s].ivalue.split("+").join("@@");

		} 
     
       Main.Request("drivergroup", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driver), "DriverGroup.Main()")
       Popup.Close();
 
        Forms.Clean("driver");
  
    },
  MultiInputTagsChange: function (d) {
   		this.ActiveForm = "driver";
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
                Forms.UpdateValue("driver", d, JSON.stringify(f))
            } else {
                Forms.UpdateValue("driver", d, "")
            }
            DriverGroup.PreValidation();
            break
        }
        
    },
    Export: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        document.getElementById("exp_data").value = JSON.stringify(a);
        document.getElementById("exp_form").submit()
    },
	
    Delete: function () {
		var b = Main.GetMarkedCheckBoxesValuesByClass('drivergroup');
        if (b.length == 0) {
			alert("Please select at least one item");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/drivergroup.php", "f=DeleteDriverGroup&data=" + JSON.stringify(a), function (e) {
						DriverGroup.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});		
	
    }
};