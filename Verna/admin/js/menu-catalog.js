var MenuCatalog = {
	Main: function(M){ 
		MenuCatalog.namelang = Array();
		MenuCatalog.descriptionlang = Array();
        if(Business.id){
    		var n='';
    		n +='<div class="panel panel-danger panel-no-border">'
    		n +='<div class="panel-heading panel-heading-2">'
    		n +='<div class="row">'
    		n +='<div class="col-md-4">'
    		n +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_TAB_MENU_SCHEDULE']?></h3>'
    		n +='</div>'
    		<!--col-md-5-->
    		n +='<div class="col-md-3">'
    		n +='<div class="panel-btn filtr_margin">'
    		n +='<input type="text" class="form-control rounded panel-red-field white-placeholder" id="catalogsearch" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
    		n +='</div>'
    		n +='</div>'
    		<!--col-md-3-->
    		n +='<div class="col-md-5">'
    		n +='<div class="panel-btn pull-right">'

    		n +='<div class="inline-popups ">'
    		n +='<span class=" panel-btn-2">'
    		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:MenuCatalog.NewMenu()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
    		n +='</span>'
    		n +='<span class=" panel-btn-2">'
    		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:MenuCatalog.EditMenu()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
    		n +='</span>'
    		n +='<span class=" panel-btn-2">'
    		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="MenuCatalog.DeleteMenu()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
    		n +='</div>'

    		n +='</div>'
    		n +='</div>'
    		<!--col-md-3-->
    		n +='</div>'
    		<!--row-->
    		n +='</div>'

    		n +='<div class="panel-body">'
    		n +='<div class="table-responsive">'
    		n +='<table class="table table-th-block table-striped tbl_enebal">'
    		n +='<thead>'
    		n +='<tr>'
    		n +='<th width="7.5%" onclick="MenuCatalog.PupulateMenusTable(\'id\')" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
    		n +='<th width="7.5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
    		n +='<th width="20%" class="hand" onclick="MenuCatalog.PupulateMenusTable(\'name\')"><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_CATALOG']?></th>'
    		n +='<th width="20%" class="hand" onclick="MenuCatalog.PupulateMenusTable(\'comments\')"><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_COMMENT']?></th>'
    		n +='<th width="15%"><?=$lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE']?></th>'
    		n +='<th width="15%"><?=$lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TIME']?></th>'
    		n +='<th width="15%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_ENABLE']?></th>'
    		n +='</tr>'
    		n +='</thead>'
    		n +='<tbody id="menus">'
    		
    		n +='</tbody>'
    		n +='</table>'
    		n +='</div>'
    		<!--table-responsive-->
    		n +='</div>'
    		<!-- /.panel-body -->
    		n +='</div>'

    		n +='<div class="panel panel-danger panel-no-border" >'
            n +=Schedule.Main(M);
    		n +='</div>'
        }else{
            var n =''
            n += '<div class="col-md-12">'
            n += '<div class="the-box">'
            n += '<div class="clearfix" style="padding:5px 0">'
            n +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_PLEASE_CREATE_BUSINESS_FIRST']?></p>'
            n += '</div></div></div>'
        }

		$("#tab_menus").empty().append(n);
        MenuCatalog.GetMenus(); 
        //Schedule.UpdateScheduleClock();
        document.getElementById("catalogsearch").onkeyup = function () {
            MenuCatalog.PupulateMenusTable(Main.Config.Business.List.SortBy, true)
        };

	},

	GetMenus: function () {
        MenuCatalog.daysval = [{
                id: 0,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_EVERYDAY'] ?>"
            }, {
                id: 1,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_MONDAY'] ?>"
            }, {
                id: 2,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_TUESDAY'] ?>"
            }, {
                id: 3,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_WEDNESDAY'] ?>"
            }, {
                id: 4,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_THURSDAY'] ?>"
            }, {
                id: 5,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_FRIDAY'] ?>"
            }, {
                id: 6,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_SATURDAY'] ?>"
            }, {
                id: 7,
                name: "<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_SUNDAY'] ?>"
            }];


       
        if (Forms.Form.business.type == "create") {
            if (Business.MenusIds) {
                Main.Loading();
                var b = new Date().getTime();
                Main.Aid = b;
                $.post("lib/business.php", "f=FetchMenusDataByIds&ids=" + Business.MenusIds, function (a) {
                    if (b != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        MenuCatalog.Menus = JSON.parse(a);
                        MenuCatalog.PupulateMenusTable(Main.Config.Menus.List.SortBy, true)
                    } else {
                        MenuCatalog.Menus = null
                    }
                })
            }
        } else {
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
            $.post("lib/business.php", "f=FetchMenusDataByBusiness&id=" + Business.id, function (a) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    MenuCatalog.Menus = JSON.parse(a);
                    MenuCatalog.PupulateMenusTable(Main.Config.Menus.List.SortBy, true)
                }
            })
        }
    },


    PupulateMenusTable: function (j, h) {
        var k = "";
        var l = this.Menus.length;
        
        if (h) {
            this.Menus.sort(Main.SortByProperty(j));
            if (Main.Config.Menus.List.SortByStatus == "max") {
                this.Menus.reverse()
            }
        } else {
            if (Main.Config.Menus.List.SortBy != j) {
                this.Menus.sort(Main.SortByProperty(j));
                Main.Config.Menus.List.SortByStatus = "min"
            } else {
                this.Menus.reverse();
                if (Main.Config.Menus.List.SortByStatus == "min") {
                    Main.Config.Menus.List.SortByStatus = "max"
                } else {
                    Main.Config.Menus.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Menus.List.SortBy = j;
        if (!h) {
            Main.SaveConfig()
        }
        var pl = false;
        var pg ='';

        //alert(JSON.stringify(this.Menus))
        for (var n in this.Menus) {
            pl = false;
            pg = document.getElementById("catalogsearch").value.toLowerCase();
            if (String(this.Menus[n].id).toLowerCase().indexOf(pg) >= 0 || this.Menus[n].name.toLowerCase().indexOf(pg) >= 0 || this.Menus[n].comments.toLowerCase().indexOf(pg) >= 0) {
                pl = true
            }
            
            if(pl){

            var ot='';

            if (this.Menus[n].schedule) {
            var l = JSON.parse(this.Menus[n].schedule);            
            ot = Main.ConvertTimeFormat(l.opens.hour +':'+l.opens.minute) +' - '+ Main.ConvertTimeFormat(l.closes.hour +':'+l.closes.minute);
            }
        	var deliverytype = '';
        	k +='<tr>'
			k +='<td class="hand" onclick="MenuCatalog.EditMenu(' + this.Menus[n].id + ')">'+ this.Menus[n].id +'</td>'
			k +='<td><input type="checkbox" class="checkbox" value="' + this.Menus[n].id + '"></td>'
			k +='<td class="hand" onclick="MenuCatalog.EditMenu(' + this.Menus[n].id + ')">'+ this.Menus[n].name +'</td>'
			k +='<td class="hand" onclick="MenuCatalog.EditMenu(' + this.Menus[n].id + ')">'+ Main.NullToEmpty(this.Menus[n].comments) +'</td>'
			
            if(this.Menus[n].delivery =='t'){
				deliverytype +='<?= $lang_resource['CITY_SUPER_CREATE_BUSINESS_DELEVERY'] ?>'
				if(this.Menus[n].pickup =='t'){
					deliverytype +=' | <?= $lang_resource['CITY_SUPER_CREATE_BUSINESS_PICKUP'] ?>'
				}
			}else if(this.Menus[n].pickup =='t'){
					deliverytype +='<?= $lang_resource['CITY_SUPER_CREATE_BUSINESS_PICKUP'] ?>'
			}

			k +='<td>'+deliverytype+'</td>'

			k +='<td>'+ot+'</td>'
			k +='<td><div class="enebal" id="switchmenu_' + this.Menus[n].id + '"></div></td>'
			k +='</tr>'            
            }
        }

        document.getElementById("menus").innerHTML = k; 

        var i = false;
        Switch.Init();
        for (n in this.Menus) {
            if (this.Menus[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switchmenu_" + this.Menus[n].id, i);
            Switch.OnChange("switchmenu_" + this.Menus[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switchmenu_", ""), b, "menu")
            })
        }
    },
    NewMenu: function () {
        $('div[id*=newpopup]').remove();
        this.MenuForm()
    },

    PreEditMenu: function () {

        MultipleInput.Init("menu_days", MenuCatalog.daysval, true);
        MultipleInput.Init("menu_dishes", Products.Dishes, true, true);
        if (Forms.Form.menu.type == "modify") {
            if (Forms.Form.menu.menu.dishes != "") {
                var k = JSON.parse(Forms.Form.menu.menu.dishes);                
                for (var g in k) {

                    MultipleInput.AddTagById("menu_dishes", k[g])
                }
                Forms.Form.menu.fields.menu_dishes.save = false
            }
            if (Forms.Form.menu.menu.days != "") {
                var i = JSON.parse(Forms.Form.menu.menu.days);
                for (var g in i) {
                    MultipleInput.AddTagById("menu_days", i[g])
                }
                Forms.Form.menu.fields.menu_days.save = false
            }
        }
        var j = new Array();
        var l;
        for (var g in Products.Dishes) {
            l = false;
            for (var h in j) {
                if (j[h] == Products.Dishes[g].category) {
                    l = true
                }
            }
            if (!l) {
                j.push(Products.Dishes[g].category)
            }
        }
       
        DraggableAccordion.Init("draggable", "menudraggable");
        for (g in j) {
            DraggableAccordion.AddCategory("c" + g, j[g]);
            for (h in Products.Dishes) {
                if (Products.Dishes[h].category == j[g]) {
                    DraggableAccordion.AddItem(Products.Dishes[h].id, Products.Dishes[h].name, "c" + g)
                }
            }
        }
        DraggableAccordion.StartAcordion();
        $("#menu_name").focus()
    },

    EditMenu: function (h, l) {
     
        $('div[id*=newpopup]').remove();
        var i = false;
        if (h) {
            i = true;
            Visuals.ForceMainButtonCancelEvent = l
        } else {
            var j = Main.GetMarkedCheckBoxesValuesByClass('checkbox');
            if (j.length == 1) {
                h = j[0];
                i = true
            }else if(j.length > 1){
                alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_DELIVERY_CHECBOX_SELECT_ONE']?>");
                return
            }else{
                alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_DELIVERY_CHECBOX_SELECT_EDIT']?>");
                return
            }
        } if (i) {
            var k = this;
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetMenuData&id=" + h, function (a) {

                if (g != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    k.MenuForm(JSON.parse(a))
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
            document.getElementById("menu_name_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("menu_comments_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("menu_name_"+id).style.display  = "block";
		document.getElementById("menu_comments_"+id).style.display  = "block";
    },
		
	
    MenuForm: function (j) {
       
        
        Forms.Clean("menu", "popupmainbuttonok");
        if (j) {
            Forms.Form.menu.type = "modify";
            Forms.Form.menu.id = j.id
            MenuCatalog.dayflag = true   
            MenuCatalog.dishflag = true
        } else {
            j = new Object();
            Forms.Form.menu.type = "create";
            MenuCatalog.dayflag = false   
            MenuCatalog.dishflag = false
            if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("menu", "menu_business", Forms.Form.business.id, false, true, true)
            }
        }

        Forms.Form.menu.menu = j;
        this.ActiveForm = "menu";
        MultipleInput.AddListener("tagschange", "MenuCatalog.MultiInputTagsChange");

        if (Forms.Form.menu.type == "create") {
        var i = '<h3 class="popup-heading">Create Catalog</h3>'
        }else{
        var i = '<h3 class="popup-heading">Edit Catalog</h3>'    
        }
		
		i +='<div class="row">'
		i +='<ul class="pop_lang_img">'
		flaginfo=Main.languageinfo;
		for(Z in flaginfo){
			var m = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
				MenuCatalog.langdefault = flaginfo[Z].admindefaulelang;                             
				i+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="MenuCatalog.show_id('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'
			}else{
				i+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="MenuCatalog.show_id('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'  
			}
		}
		i +='</ul>'
		i +='</div>'
		<!--row-->
		
        i +='<div class="row">'
        i +='<div class="col-md-6">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_NAME']?></label>'
		
		Forms.CreateValue("menu", "menu_name", "",true)
		flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if (Forms.Form.menu.type == "create") {
                if(flaginfo[v].id == MenuCatalog.langdefault){   
                    i +='<input type="text" id="menu_name_'+flaginfo[v].id+'" onkeyup="MenuCatalog.PreValidation()" class="form-control"  value="" />' 
                }else{
                    i +='<input type="text" id="menu_name_'+flaginfo[v].id+'" onkeyup="MenuCatalog.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[v].id == MenuCatalog.langdefault){   
                    i +='<input type="text" id="menu_name_'+flaginfo[v].id+'" onkeyup="MenuCatalog.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(j.name[flaginfo[v].id])+'" />' 
                }else{
                    i +='<input type="text" id="menu_name_'+flaginfo[v].id+'" onkeyup="MenuCatalog.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(j.name[flaginfo[v].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
        //i +=Forms.CreateInputPropertyPopup("menu", "menu_name", Main.NullToEmpty(j.name), true,"MenuCatalog.PreValidation()")
        i +='<small data-bv-validator="notEmpty" class="help-block" id="menu_name_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_NAME_DM']?></small>'
        i +='</div>'
        i +='</div>'
        <!--col-md-6-->
        Forms.CreateValue("menu", "menu_days", Main.NullToEmpty(j.days), false, true);
        i +='<div class="col-md-6">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_DELIVERY_DAYS']?></label>'
        i +='<input type="text" id="menu_days" class="form-control">'
        i +='<small data-bv-validator="notEmpty" class="help-block" id="menu_days_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_THE_DAYS_IS_REQUIRED']?></small>'
        i +='</div>'
        i +='</div>'
        <!--col-md-6-->
        i +='</div>'
        <!--row--> 
        var H = false;
        if (j.pickup == "t") {
            H = true
        }
       
        var H1 = false;
        if (j.delivery == "t") {
            H1 = true
        }
        
        i +='<div class="row">'
        i +='<div class="col-md-6">'
        i +='<label><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_DELIVERY_TYPE']?></label>'
        i +='</div>'
        <!--col-md-6-->
        i +='</div>'
        <!--row-->  

        i +='<div class="row">'
        i +='<div class="col-md-12">'
        i +='<div class=" pull-left">'
        i +=Forms.CreateCheckBoxPropertyAdmin("menu", "delivery", H1,'','',"MenuCatalog.PreValidation()")

        i +='<label for="delivery" class="hand">&nbsp;</label>Delivery</div>'

        i +='<div class="pull-left">'
        i +=Forms.CreateCheckBoxPropertyAdmin("menu", "pickup", H,'','',"MenuCatalog.PreValidation()")

        
        i +='<label for="pickup" class="hand">&nbsp;</label>Pickup</div>'
        
        i +='</div>'
        <!--col-md-6-->
        i +='</div>'
        <!--row-->  
        i +='<small data-bv-validator="notEmpty" class="help-block" id="delivery_type_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_DELIVERY_TYPE_REQUIRED']?></small>'


        var o;
        var m;
        var k;
        var n;
       
        if (Forms.Form.menu.type == "modify" && j.schedule) {
            var l = JSON.parse(j.schedule);
            o = l.opens.hour;
            m = l.opens.minute;
            k = l.closes.hour;
            n = l.closes.minute
        }
        Forms.CreateValue("menu", "schedule", JSON.stringify(l));
        i +='<div class="row">'
        i +='<div class="col-md-3">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_START']?></label>'
        i +='<select class="form-control" id="menu_catalog_open">'
        for (var p = 0; p < 24; p++) {
            if(Main.timeformat=="12"){
                p2=Business.convertTimeFormatHour(p);
            }else{
                p2= Business.zeroPad((p),2) ;
            }
            if (o == p) {
                i += "<option SELECTED  value="+ p +">" + p2 + "</option>"
            } else {
                i += "<option  value="+ p +" >" + p2 + "</option>"
            }
        }
        i +='</select>'

        i +='</div>'
        i +='</div>'
        <!--col-md-3-->
        i +='<div class="col-md-3">'
        i +='<div class="form-group">'
        i +='<label>&nbsp;</label>'
        i +='<select class="form-control" id="menu_catalog_open_min">'
        for (var p = 0; p < 60; p++) {
            if (m == p) {
                i += '<option SELECTED value="'+p+'" >' +  Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="'+p+'" >' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i +='</select>'       
        i +='</div>'
        i +='</div>'
        <!--col-md-3-->

        i +='<div class="col-md-3">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_END']?></label>'
        i +='<select class="form-control" id="menu_catalog_close">'
        for (var p = 0; p < 29; p++) {
            if (k == p) {
                if(p > 24){
                    var c = p - 24;
                    i += "<option SELECTED value="+ p +">" + c + "am</option>"
                } else {
                    if(Main.timeformat=="12"){
                        p4=Business.convertTimeFormatHour(p);
                    }else{
                        p4= Business.zeroPad((p),2) ;
                    }
                    i += "<option SELECTED value="+ p +">" + p4 + "</option>"
                }
            } else if(p>24){
                var c = p - 24;
                i += "<option value="+ p +">" + c + "am</option>"
            } else {             
                if(Main.timeformat=="12"){
                    p3=Business.convertTimeFormatHour(p);
                }else{
                    p3= Business.zeroPad((p),2) ;
                }
                i += "<option value="+ p +">" + p3 + "</option>"
            }
        }
        i +='</select>'

        i +='</div>'
        i +='</div>'
        <!--col-md-3-->
        i +='<div class="col-md-3">'
        i +='<div class="form-group">'
        i +='<label>&nbsp;</label>'
        i +='<select class="form-control" id="menu_catalog_close_min">'
        for (var p = 0; p < 60; p++) {
            if (n == p) {
                i += '<option SELECTED value="'+p+'">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="'+p+'">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i +='</select>'       
        i +='</div>'
        i +='</div>'
        <!--col-md-3-->

        i +='</div>'
        <!--row-->  

        i +='<div class="row">'
        Forms.CreateValue("menu", "menu_dishes", Main.NullToEmpty(j.dishes), false, true);
        i +='<div class="col-md-6">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_PRODUCT_CATALOG']?></label>'        
        i +='<input type="text" id="menu_dishes" style="width:245px;min-height:100px;"/>'
        i +='<small data-bv-validator="notEmpty" class="help-block" id="menu_dishes_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_CATALOG_OPEN_TIME']?></small>'
        i +='</div>'

        i +='<div class="row">'
        i +='<div class="col-md-12">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['ORDER_DETAILS_DISHES_COMMENTS']?> </label>'
		
		Forms.CreateValue("menu", "menu_comments", "",true)
		flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if (Forms.Form.menu.type == "create") {
                if(flaginfo[v].id == MenuCatalog.langdefault){   
                    i +='<input type="text" id="menu_comments_'+flaginfo[v].id+'" class="form-control"  value="" />' 
                }else{
                    i +='<input type="text" id="menu_comments_'+flaginfo[v].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[v].id == MenuCatalog.langdefault){   
                    i +='<input type="text" id="menu_comments_'+flaginfo[v].id+'" class="form-control"  value="'+Main.NullToEmpty(j.comments[flaginfo[v].id])+'" />' 
                }else{
                    i +='<input type="text" id="menu_comments_'+flaginfo[v].id+'" class="form-control"  value="'+Main.NullToEmpty(j.comments[flaginfo[v].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
        //i +=Forms.CreateTextAreaPropertyPopup("menu", "menu_comments", Main.NullToEmpty(j.comments), false, "", false, "form-control")
        i +='</div>'
        i +='</div>'
        <!--col-md-12-->
        i +='</div>'
        <!--row--> 
        i +='</div>'
        <!--col-md-6-->
        
        i +='<div class="col-md-6">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_PRODUCT_ALL']?></label>'
        i +='<div class="form-control" style="min-height:214px; height:242px !important; overflow: auto;" id="draggable">'
        
        i +='</div>'
        i +='</div>'

         var btype = new Array();
        btype.push({
            id: "",
            caption: "Select Business Type"
        });
        if(Business.tab_food =="t" && Main.tabsettings.tab_food_active =="t"){
            btype.push({
                id: "1",
                caption: "<?=$lang_resource['BUSINESS_TYPE_FOOD']?>"
            });
        }
        
        if(Business.tab_alcohol =="t" && Main.tabsettings.tab_alcohol_active =="t"){
            btype.push({
                id: "2",
                caption: "<?=$lang_resource['BUSINESS_TYPE_ALCOHOL']?>"
            });
        }

        if(Business.tab_groceries =="t" && Main.tabsettings.tab_groceries_active =="t"){
            btype.push({
                id: "3",
                caption: "<?=$lang_resource['BUSINESS_TYPE_GROCERIES']?>"
            });
        }

        if(Business.tab_laundry =="t" && Main.tabsettings.tab_laundry_active =="t"){
            btype.push({
                id: "4",
                caption: "<?=$lang_resource['BUSINESS_TYPE_LAUNDRY']?>"
            });
        }
        /*if((!Business.tab_laundry && !Business.tab_groceries && !Business.tab_alcohol && !Business.tab_food)||(!Main.tabsettings.tab_food_active && !Main.tabsettings.tab_alcohol_active && !Main.tabsettings.tab_groceries_active && !Main.tabsettings.tab_laundry_active)){
            var btypehide='style="display:none;"'
        }*/
        i +='<div class="row" >'     
        i +='<div class="col-md-12">'
        i +='<div class="form-group">'
        i +='<label><?=$lang_resource['BUSINESS_TYPE_HEADING']?></label>'
        i += Forms.CreateSelectPropertyPopup("menu", "btype", btype, j.btype, true,"MenuCatalog.PreValidation()")
        i +='<small data-bv-validator="notEmpty" class="help-block" id="btype_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_MENU_CATALOG_BUSINESS_TYPE']?></small>'
        i +='</div>'
        i +='</div>'
        i +='</div>'<!--row-->


        i +='</div>'
        <!--col-md-6-->


        
       


        i +='</div>'
        <!--row-->

        i +='<div class="row">'
        i +='<div class="col-md-6 col-md-offset-3">'
        if (Forms.Form.menu.type == "create") {
        i +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="MenuCatalog.SaveMenu()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button></center>'
        }else{
        i +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="MenuCatalog.SaveMenu()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE']?></button></center>'
        }
       
        i +='</div>'
        <!--col-md--->
        i +='</div>'
        <!--row-->

        MenuCatalog.GetDishes(i);
    
    },

    GetDishes: function (e, f) {
        if (Forms.Form.business.type == "create") {
            if (Business.DishesIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchDishesDataByIds&ids=" + Business.DishesIds, function (a) {
                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        Business.Dishes = JSON.parse(a);
                        if (f) {
                            Business.PupulateDishesTable(Main.Config.Dishes.List.SortBy, true)
                        } else {
                            Popup.Show(700, 693, e, Business.SaveMenu, null, MenuCatalog.PreEditMenu)
                        }
                    } else {
                        Business.Dishes = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 693, e, Business.SaveMenu, null, MenuCatalog.PreEditMenu)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchDishesDataByBusiness&id=" + Business.id, function (a) {
                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    Products.Dishes = JSON.parse(a);
                    if (f) {
                        Products.PupulateDishesTable(Main.Config.Dishes.List.SortBy, true)
                    } else {
                        Popup.Show(e,MenuCatalog.PreEditMenu)
                        /*var input2 = $('#menu_catalog_open');
                        input2.clockpicker({
                            autoclose: true,
                             afterDone: function() {
                                MenuCatalog.PreValidation()
                            },
                        });

                        
                        $('#check-menu-open').click(function(e){
                            e.stopPropagation();
                            $("#menu_catalog_open").clockpicker('show')
                                    .clockpicker('toggleView', 'hours');
                            
                        });
                        
                        var input3 = $('#menu_catalog_close');
                        input3.clockpicker({
                            autoclose: true,
                            afterDone: function() {
                                MenuCatalog.PreValidation()
                            },
                        });
                       
                        
                        $('#check-menu-close').click(function(e){
                            e.stopPropagation();
                            $("#menu_catalog_close").clockpicker('show')
                                    .clockpicker('toggleView', 'hours');
                        });*/
                      

                        

                    }
                }
            })
        }
    },

    
    UpdateMenuSchedule: function () {

        var c = new Object();
        var d;
       
        c.opens = new Object();
        d = document.getElementById("menu_catalog_open").value+':'+document.getElementById("menu_catalog_open_min").value;
        var res = d.split(":");
        if(res[0] =='00'){
            var ohour = '0';
        }else{
            var ohour = res[0]; 
        }
        if(res[1] =='00'){
            var chour = '0';
        }else{
            var chour = res[1]; 
        }
        c.opens.hour = ohour;
        c.opens.minute = chour;
        
        c.closes = new Object();
        d = document.getElementById("menu_catalog_close").value+':'+document.getElementById("menu_catalog_close_min").value;;
        var res = d.split(":");
        if(res[0] =='00'){
            var ohour = '0';
        }else{
            var ohour = res[0]; 
        }
        if(res[1] =='00'){
            var chour = '0';
        }else{
            var chour = res[1]; 
        }
        c.closes.hour = ohour;
        c.closes.minute = chour;   
        Forms.UpdateValue("menu", "schedule", JSON.stringify(c), true);

    },

    SaveMenu: function () {
        MenuCatalog.UpdateMenuSchedule()

        if(MenuCatalog.PreValidation() != true){
            return false
        }

        
       
		Forms.UpdateValue("menu", "menu_name", MenuCatalog.namelang,true);
		Forms.UpdateValue("menu", "menu_comments", MenuCatalog.descriptionlang,true);
		//Forms.PrepareForSaving("menu");
        delete Forms.Form.menu.menu;
        Forms.Form.menu.fields = Main.RemoveFromPropertyNames(Forms.Form.menu.fields, "menu_");
        var d = true;
        Main.Loading(true);
        var c = new Date().getTime();
        Main.Aid = c;
		
		for(var s in Forms.Form.menu.fields){			
			Forms.Form.menu.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.menu.fields[s].value)))
			Forms.Form.menu.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.menu.fields[s].ivalue)))

            Forms.Form.menu.fields[s].value = Forms.Form.menu.fields[s].value.split("+").join("@@");
            Forms.Form.menu.fields[s].ivalue = Forms.Form.menu.fields[s].ivalue.split("+").join("@@");
		}
		
		
        $.post("lib/business.php", "f=SaveMenu&data=" + JSON.stringify(Forms.Form.menu), function (a) {
            if (c != Main.Aid) {
                return
            }
            Main.Ready(true);
            if (d) {
                if (Main.IsNumber(a)) {
                    if (Business.MenusIds) {
                        Business.MenusIds += "," + a
                    } else {
                        Business.MenusIds = a
                    }
                }
            }
            Popup.Close();
            MenuCatalog.GetMenus()
        });
        Forms.Clean("menu")
    },

    DeleteMenu: function () {
        var c = Main.GetMarkedCheckBoxesValuesByClass('checkbox');
       
        if (c.length == 0) {
             alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_DELIVERY_CHECBOX_SELECT']?>");
            return
        }
        var d = new Object();
        d.ids = c;
        $.fn.jAlert({
            'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_WARNING_DELETE_PRODUCT']?>',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                    $.post("lib/business.php", "f=DeleteMenu&data=" + JSON.stringify(d), function (e) {
                        MenuCatalog.GetMenus()
                        alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_WARNING_DELETE_PERMANENTLY']?>');
                    
                    });
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false
            
            });
        //Main.Request("business", null, "f=DeleteMenu&data=" + JSON.stringify(d), "Business.GetMenus()")
    },
    MultiInputTagsChange: function (d) {
        switch (d) {
            
        case "menu_dishes":
            var e = MultipleInput.GetTagsIds(d);
            if (e.length > 0) {                
                Forms.UpdateValue("menu", d, JSON.stringify(e))                
            } else {                
                Forms.UpdateValue("menu", d, "")                
            }
            MenuCatalog.MultiTagValidation("menu_dishes")
           
            break;
        case "menu_days":
            var e = MultipleInput.GetTagsIds(d);
            if (e.length > 0) {               
                Forms.UpdateValue("menu", d, JSON.stringify(e))               
            } else {               
                Forms.UpdateValue("menu", d, "")
            }
            MenuCatalog.MultiTagValidation("menu_days")
           
            break;

        default:
            var f = MultipleInput.GetTagsIds(d);
            if (f.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break
        }
       
    },
    MultiTagValidation: function(a){
       // alert(a)
        var e = MultipleInput.GetTagsIds(a);
        if (e.length > 0) {
            if(a == 'menu_days'){
                MenuCatalog.dayflag = true 
            }
            if(a == 'menu_dishes'){
                MenuCatalog.dishflag = true 
            }           
            MenuCatalog.PreValidation()
        } else {
            if(a == 'menu_days'){
                MenuCatalog.dayflag = false 
            }
            if(a == 'menu_dishes'){
                MenuCatalog.dishflag = false 
            }          
            MenuCatalog.PreValidation()
        }

    },

    PreValidation: function(){
    var count = 0;  
   	
	flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == MenuCatalog.langdefault){
    	if(document.getElementById("menu_name_"+flaginfo[Z].id).value == ""){
            $("#menu_name_text").show();
            $("#menu_name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#menu_name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#menu_name_text").hide();
            $("#menu_name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#menu_name_"+flaginfo[Z].id).removeClass("error-text-field");
        }		
		       
		}
		
		var namedata = document.getElementById("menu_name_"+flaginfo[Z].id).value;
            MenuCatalog.namelang[flaginfo[Z].id] = namedata;
			
		var descriptiondata = document.getElementById("menu_comments_"+flaginfo[Z].id).value;
            MenuCatalog.descriptionlang[flaginfo[Z].id] = descriptiondata;
			
	}

    if(document.getElementById("menu_days").value == "" && MenuCatalog.dayflag == false){
        $("#menu_days_text").show();
        $("#menu_dayscontainer").addClass("error-text-field");
        $("#menu_dayscontainer").removeClass("success-text-field");
        count ++;
    }else{
        $("#menu_days_text").hide();
        $("#menu_dayscontainer").addClass("success-text-field");
        $("#menu_dayscontainer").removeClass("error-text-field");
    }
    
    if(document.getElementById('delivery').checked == false && document.getElementById('pickup').checked == false){
        $("#delivery_type_text").show();
        
        count ++;
    }else{
        $("#delivery_type_text").hide();
        
    }
     if(document.getElementById("menu_catalog_open").value == ""){
        $("#menu_catalog_open_text").show();
        $("#menu_catalog_open_dv").addClass("error-text-field");
        $("#menu_catalog_open_dv").removeClass("success-text-field");
        count ++;
    }else{
        $("#menu_catalog_open_text").hide();
        $("#menu_catalog_open_dv").addClass("success-text-field");
        $("#menu_catalog_open_dv").removeClass("error-text-field");
    }
     if(document.getElementById("menu_catalog_close").value == ""){
        $("#menu_catalog_close_text").show();
        $("#menu_catalog_close_dv").addClass("error-text-field");
        $("#menu_catalog_close_dv").removeClass("success-text-field");
        count ++;
    }else{
        $("#menu_catalog_close_text").hide();
        $("#menu_catalog_close_dv").addClass("success-text-field");
        $("#menu_catalog_close_dv").removeClass("error-text-field");
    }
     if(document.getElementById("menu_dishes").value == "" && MenuCatalog.dishflag == false){
        $("#menu_dishes_text").show();
        $("#menu_dishescontainer").addClass("error-text-field");
        $("#menu_dishescontainer").removeClass("success-text-field");
        count ++;
    }else{
        $("#menu_dishes_text").hide();
        $("#menu_dishescontainer").addClass("success-text-field");
        $("#menu_dishescontainer").removeClass("error-text-field");
    }

    if(document.getElementById("btype").value == ""){
        $("#btype_text").show();
        $("#btype").addClass("error-text-field");
        $("#btype").removeClass("success-text-field");
        count ++;
    }else{
        $("#btype_text").hide();
        $("#btype").addClass("success-text-field");
        $("#btype").removeClass("error-text-field");
    }

    
    
    if(count == 0)
        return true
    else 
        return false
       
},  

    

};
