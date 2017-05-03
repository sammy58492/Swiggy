<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var IS_PAYPAL_ENABLED = 1;

<!--%PRODUCT OPTION%-->
var current_rank=0;
var choice1=0;
var choice_number=0;
var choice_delete_array=new Array();
var choice_number_array=new Array();
var e=0;
var rank=0;
var set_id=0;
var option_choice=0;
var total_options=0;
var choice_data=[];
var choice=[];
var gaint_choice_array=new Array();
var old_gaint_choice_array=new Array();
var choice_count=0;
var ids=Array();
var new_gaint_array=new Array();
<!--%PRODUCT OPTION%-->

var Business = {
    Main: function () {

        Main.GetAllBusinessData("Business.PrintMain()")
    },
    PrintMain: function () {
        for (var f in Main.AllBusiness) {
            Main.AllBusiness[f].cname = Main.AllBusiness[f].city.name;
            Main.AllBusiness[f].pname = Main.AllBusiness[f].provider.name
        }
        var h = new Array();
        var e = Visuals.CreateSearchBox();
        var g = "";
         document.getElementById("totalOrderBox").style.display = "none";
        h.push(Visuals.CreateSubMenuItem("Business.New()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_CREATE'] ?>"));
        h.push(Visuals.CreateSubMenuItem("Business.Edit()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_EDIT'] ?>"));
        h.push(Visuals.CreateSubMenuItem("Business.Delete()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_DELETE'] ?>"));
        e += Visuals.CreateSubMenu(h);

        document.getElementById("leftcol").innerHTML = e;
        g += '<div class="contentbox" style="width:800px; " >';
        g += '<div class="titlebox nonselectable">';
        g += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_TITLE'] ?></span>';
        g += "</div>";
        g += '<div class="table" style="width: 766px;">';
        g += '<div class="title nonselectable">';
        g += '<div class="id hand" onclick="Business.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        g += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        g += '<div class="businessname hand" onclick="Business.PupulateTable(\'name\')"  style="width:130px; !important"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] ?></span></div>';
        g += '<div class="businesscity hand" onclick="Business.PupulateTable(\'cname\')"  style="width:120px; !important"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_CITY_HEADER'] ?></span></div>';
        g += '<div class="businessprovider hand" onclick="Business.PupulateTable(\'pname\')" style="width:120px; !important"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESTAURATEUR_HEADER'] ?></span></div>';
        g += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_ENABLE_HEADER'] ?></span></div>';
        g += '<div class="enabled default" style="width: 102px; !important" ><span class="caption">Payment</span></div>';
        g += '<div class="enabled default" style="width: 51px; !important" ><span class="caption">Printer</span></div>';
        g += '<div class="enabled default" style="width: 55px; !important" ><span class="caption"><?=$lang_resource['PANEL_BUSINESS_ALERT_COPY_TEXT'] ?></span></div>';
        g += "</div>";
        g += '<div class="container" id="business"></div>';
        g += "</div>";
        document.getElementById("main").innerHTML = g;
        document.getElementById("search").onkeyup = function () {
            Business.PupulateTable(Main.Config.Business.List.SortBy, true)
        };
        Business.PupulateTable(Main.Config.Business.List.SortBy, true)
    },
    PupulateTable: function (t, r) {
        var q = "";
        var s = Main.AllBusiness.length;
        if (r) {
            Main.AllBusiness.sort(Main.SortByProperty(t));
            if (Main.Config.Business.List.SortByStatus == "max") {
                Main.AllBusiness.reverse()
            }
        } else {
            if (Main.Config.Business.List.SortBy != t) {
                Main.AllBusiness.sort(Main.SortByProperty(t));
                Main.Config.Business.List.SortByStatus = "min"
            } else {
                Main.AllBusiness.reverse();
                if (Main.Config.Business.List.SortByStatus == "min") {
                    Main.Config.Business.List.SortByStatus = "max"
                } else {
                    Main.Config.Business.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Business.List.SortBy = t;
        if (!r) {
            Main.SaveConfig()
        }
        var m = false;
        var o = "";
        var i = new Array();
        for (var p in Main.AllBusiness) {
            m = false;
            o = document.getElementById("search").value.toLowerCase();
            if (String(Main.AllBusiness[p].id).toLowerCase().indexOf(o) >= 0 || Main.AllBusiness[p].name.toLowerCase().indexOf(o) >= 0 || Main.NullToEmpty(Main.AllBusiness[p].city.name).toLowerCase().indexOf(o) >= 0 || (Main.NullToEmpty(Main.AllBusiness[p].provider.name) + " " + Main.NullToEmpty(Main.AllBusiness[p].provider.lastname) + " " + Main.NullToEmpty(Main.AllBusiness[p].provider.lastname2)).toLowerCase().indexOf(o) >= 0) {
                m = true;
                i.push(Main.AllBusiness[p])
            }
            if (m) {
                var l;
                if (p % 2 == 0) {
                    l = " grey"
                } else {
                    l = ""
                }

                                <!--%PRODUCT OPTION%-->
                var switc=0;
                if(Main.NullToEmpty(Main.AllBusiness[p].is_active)== '3')
                {

                    q += '<div class="default row' + l + '" style="border-bottom:1px solid #e4e4e4; background-color: #adff2f;">';
                }
                else      {
                <!--%PRODUCT OPTION%-->

                q += '<div class="default row' + l + '" style="border-bottom:1px solid #e4e4e4;">';
                }




                q += '<div class="id"><div class="cap"><span class="caption hand" onclick="Business.Edit(' + Main.AllBusiness[p].id + ')">' + Main.AllBusiness[p].id + "</span></div></div>";
                q += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.AllBusiness[p].id + '"/></div>';
                q += '<div class="businessname" style="width:130px !important;"><div class="cap"><span class="caption hand" onclick="Business.Edit(' + Main.AllBusiness[p].id + ')">' + Main.TitleCase(Main.AllBusiness[p].name) + "</span></div></div>";
                if (Main.User.level == 0) {
                    q += '<div class="businesscity" style="width:120px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.AllBusiness[p].city.name) + "</span></div></div>"
                } else {
                    q += '<div class="businesscity" style="width:120px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.AllBusiness[p].city.name) + "</span></div></div>"
                }
                q += '<div class="businessprovider" style="width:120px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.AllBusiness[p].provider.name) + " " + Main.NullToEmpty(Main.AllBusiness[p].provider.lastname) + " " + Main.NullToEmpty(Main.AllBusiness[p].provider.lastname2) + "</span></div></div>";

                if(Main.NullToEmpty(Main.AllBusiness[p].is_active)=='3')
                {
                    q += '<div class="enabled"><span class="caption" ></span><div style="display: none;" id="switch_' + Main.AllBusiness[p].id + '"></div><div style="font-size: 12px; color:red;"><?=$lang_resource['PRODUCT_OPOTIONS_INACTIVE']?></div> </div>'
                }
                else
                {
                <!--%PRODUCT OPTION%-->
                    q += '<div class="enabled"><span class="caption"></span><div id="switch_' + Main.AllBusiness[p].id + '"></div></div>'
       <!--%PRODUCT OPTION%-->
                }
                 q += '<div class="businessprovider" style="width:101px;border-left: 2px solid #e4e4e4; !important"><div class="cap"><span class="caption"><img src="../../images/panel/payment-card.png" width="25" height="17" style="cursor:pointer;" onclick="MakePayment.Main(' + Main.AllBusiness[p].id + ')" /><img src="../../images/panel/p-icon.png" width="25" height="17" style="cursor:pointer;" onclick="SplitPayment.Main(' + Main.AllBusiness[p].id + ')" /></span></div></div>';
                 q += '<div class="bprinter" style="float: left; width:48px; border-left: 2px solid #e4e4e4; border-right: 0px solid #e4e4e4;  border-left: 2px solid #e4e4e4; !important"><div class="cap"><span class="caption"><img src="../../images/panel/print.png" width="25" height="17" style="cursor:pointer;" onclick="PrinterSet.Main(' + Main.AllBusiness[p].id + ')" /></span></div></div>';
                  q += '<div class="bprinter" style="float: left; width:65px; border-right: 0px solid #e4e4e4;  border-left: 2px solid #e4e4e4; !important"><div class="cap"><span class="caption"><img src="../../images/panel/copy-img.png" width="25" height="17" style="cursor:pointer;" onclick="Business.SetCopy(' + Main.AllBusiness[p].id + ')" title="<?=$lang_resource['PANEL_BUSINESS_ALERT_COPY_TEXT'] ?>" /></span></div></div>';
                
                
                 q += "</div>"
            }
        }
        document.getElementById("business").innerHTML = q;
        //$('body').height("1200");
        //$(".mainleft").height("1040");



        var n = false;
        Switch.Init();
        for (p in i) {
            if (i[p].enabled == "t") {
                n = true
            } else {
                n = false
            }
            Switch.Create("switch_" + i[p].id, n);
            Switch.OnChange("switch_" + i[p].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "business")
            })
        }
    },
    SetCopy: function (id) {
  
    var ask = confirm("<?=$lang_resource['PANEL_BUSINESS_ALERT_COPY_CONFIRM']?>");
    if(ask == false ) {
    
    return;
    }
      Main.Loading();
         
      $.post("lib/business.php", "f=businessCopy&id=" +id, function (a) {
          Main.Ready()
        
      Business.Main()
        
        })
      },
    SetEnabled: function (e, f, h) {
        Estr = "";
        if (f) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        var g;
        switch (h) {
        case "menu":
            g = "f=MenuSetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        case "dish":
            g = "f=DishSetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        case "extra":
            g = "f=ExtraSetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        case "business":
            g = "f=SetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        default:
            return;
            break
        }
        $.post("lib/business.php", g, function (a) {
            if (a != "ok") {
                Switch.SwitchTo("switch_" + e, !f)
               <!--%PRODUCT OPTION%-->
                if(h == "business") {
                Business.Main();
                }
                <!--%PRODUCT OPTION%-->

            }
        })
    },
    New: function () {
        if (Main.User.level < 2) {
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchAllCategoriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"2"}]}]', "Business.PreNew")
        } else {
            Main.BulkRequest('data=[{"operation":"FetchAllCategoriesData"}]', "Business.PreNew")
        }
    },
    PreNew: function (b) {
        if (b == "") {
            alert("Error")
        }
        b = JSON.parse(b);
        Main.Franchises = b.franchises;
        this.Categories = b.categories;
        Main.Countries = b.countries;
        this.Providers = b.users;
        this.Form()
    },
    Edit: function (g, f) {
        var h = false;
        if (g) {
            h = true;
            Visuals.ForceMainButtonCancelEvent = f;
            Business.ForceMainButtonEvent = f
        } else {
            var i = Main.GetMarkedCheckBoxesValues();
            if (i.length == 1) {
                g = i[0];
                h = true
            }
        } if (h) {
            var j = this;
            Main.Loading();
            if (Main.User.level < 2) {
                Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchBusinessData","id":"' + g + '"},{"operation":"FetchAllCategoriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"2"}]}]', "Business.PreEdit")
            } else {
                Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchBusinessData","id":"' + g + '"},{"operation":"FetchAllCategoriesData"}]', "Business.PreEdit")
            }
        }
    },
    PreEdit: function (b) {
        if (b == "") {
            alert("Error")
        }
        b = JSON.parse(b);
        if (Main.User.level < 2) {
            Main.Franchises = b.franchises;
            this.Providers = b.users
        }
        this.Categories = b.categories;
        Main.Countries = b.countries;
        this.Form(b.business)
    },
    Form: function (F) {
        var R = "";
        var N = "";
        var P = new Array();
        for (var E in this.Categories) {
            P.push(this.Categories[E].name)
        }
        R += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_BUTTON_SAVE'] ?>", "ok", "");
        R += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_BUTTON_CANCEL'] ?>", "cancel", "Business.PrintMain()");
        R += '<div id="subleftcol"></div>';
        Business.DishesIds = null;
        Business.Dishes = null;
        Business.ExtrasIds = null;
        Business.Extras = null;
        Business.MenusIds = null;
        Business.Menus = null;
        Business.ExtrasDetails=null;
        Forms.Clean("business", "mainbuttonok");
        this.ActiveForm = "business";
        var M = false;
        if (F == null) {
            F = new Object();
            Forms.Form.business.type = "create"
        } else {
            Forms.Form.business.type = "modify";
            Forms.Form.business.id = F.id;
            var C = JSON.parse(F.schedule);
            M = true
        }
        Forms.CreateValue("business", "schedule", JSON.stringify(C));
        this.FormTab = "general";
        N += '<div class="contentbox" style="height:auto; margin-bottom:20px; width: 846px !important;" >';
        N += '<div class="titlebox nonselectable">';
        if (Forms.Form.business.type == "create") {
            N += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_CREATE_TITLE'] ?></span>'
        } else {
            N += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EDIT_TITLE'] ?></span>'
        }
        N += "</div>";
        N += '<div class="tabsbox nonselectable">';
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_GENERAL'] ?>", "active", "Business.SwitchTab(this,'general')", "tab_button_general");
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_SCHEDULES'] ?>", "", "Business.SwitchTab(this,'schedules')", "tab_button_schedules");
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_MENUS'] ?>", "", "Business.SwitchTab(this,'menus')", "tab_button_menus");
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_DISHES'] ?>", "", "Business.SwitchTab(this,'dishes')", "tab_button_dishes");
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_EXTRAS'] ?>", "", "Business.SwitchTab(this,'extras')", "tab_button_extras");
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_METAS'] ?>", "", "Business.SwitchTab(this,'metas')", "tab_button_metas");
        if(Main.User.level==0)
        {
        N += Visuals.CreateTabButton("<?=$lang_resource['CONTROL_PANEL_BUSINESS_TAB_INVOICEING']?>", "", "Business.SwitchTab(this,'invoice')", "tab_button_invoice");
        }
         N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_RESERVE'] ?>", "", "Business.SwitchTab(this,'reserve')", "tab_button_reserve");
         
         
        N += Visuals.CreateTabButton("<?= $lang_resource['CONTROL_PANEL_BUSINESS_TAB_CATAGORIES'] ?>", "", "Business.SwitchTab(this,'catagories')", "tab_button_catagories");

        N += "</div>";
        N += '<div id="tab_general" class="editform">';
        N += '<div class="leftcol">';
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "name", F.name, true) + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_STREET'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "street", F.street, true) + "</div></div>";
        if(IS_PAYPAL_ENABLED == 1)
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_COLONY'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "colony", F.colony, true) + "</div></div>";
        else
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_COLONY'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "colony", F.colony, false) + "</div></div>";

        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CP'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "cp", F.cp, false) + "</div></div>";
        var K = new Array();
        K.push({
            id: "",
            caption: ""
        });
        for (E in Main.Countries) {
            K.push({
                id: Main.Countries[E].id,
                caption: Main.Countries[E].name
            })
        }
        if (Main.User.level < 2) {
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("business", "country", K, Main.NullToEmpty(F.country), true, "Business.CountrySelected(this)") + "</div></div>";
            var G = "";
            if (F.city) {
                G = F.city.id
            }
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CITY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("business", "city", [], G, true) + "</div></div>"
        } else {
            Forms.CreateValue("business", "country", Main.User.country, false, true, true);
            Forms.CreateValue("business", "city", Main.User.city, false, true, true)
        }
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_PHONE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "tel", F.tel, true) + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_MOBILE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "cel", F.cel, false) + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_MIN_SHOP'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "minimum", Main.NullToEmpty(F.minimum), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "email", F.email, false) + "</div></div>";
        if(IS_PAYPAL_ENABLED == 1){
        var pa="";  
        ga ='[{"id":"0","caption":"Sandbox"},{"id":"1","caption":"Live"}]';
        ga = JSON.parse(ga);
        N+= '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_PAYMENT_METHOD'] ?></span><div class="inputbox">'+ Forms.CreateSelectPropertyAp("business", "paypal_type", ga, F.paypal_type, false, "", false) +"</div></div>";
        
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_PAYPAL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "paypal", F.paypal, false) + "</div></div>";
        }   
             N += '<div class="row"><span class="caption"><?= $lang_resource['URL_CATALOG'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "burl", F.burl, false) + "</div></div>";
      N += '<div class="row"><span class="caption"><?= $lang_resource['BUSINESS_PAGE_CUSTOM_TEXT'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "businesspagecustomtext", F.businesspagecustomtext, false) + "</div></div>";
        if (Main.User.level < 2) {
            var i = new Array();
            i.push(JSON.parse('{"id":"' + Main.User.id + '","caption":""}'));
            for (var E in this.Providers) {
                var y = new Object();
                y.id = this.Providers[E].id;
                y.caption = this.Providers[E].name + " " + this.Providers[E].lastname;
                i.push(y)
            }
            var D = Main.User.id;
            if (F.provider) {
                D = F.provider.id
            }
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_RESTAURATEUR'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("business", "provider", i, D, false, "", true) + "</div></div>"
        } else {
            Forms.CreateValue("business", "provider", Main.User.id, false, true, true)
        }
        var H = false;
        if (F.acceptcard == "t") {
            H = true
        }
         var Cashopt = false;
        if (F.acceptcash == "t") {
            Cashopt = true
        }
        var R1 = false;
        if (F.reorder == "t") {
            R1 = true
        }
        var R2 = false;
        if (F.feature == "t") {
            R2 = true
        }
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_ACCEPT_CARD'] ?></span><div class="inputbox">' + Forms.CreateCheckBoxProperty("business", "acceptcard", H) + "</div></div>";
         N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CASH_OPTION'] ?></span><div class="inputbox">' + Forms.CreateCheckBoxProperty("business", "acceptcash", Cashopt) + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_DAYS'] ?></span></div>';
        N += '<div class="multipleinputdays"><input type="text" id="days" style="width:290px;"/><span class="obligatory nonselectable default">*</span></div>';
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CATEGORIES'] ?></span></div>';
        N += '<div class="multipleinputcontainerhax"><input type="text" id="categories" style="width:290px;"/><span class="obligatory nonselectable default">*</span></div>';

       N += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_BUSINESS_REORDER'] ?></span><div class="inputbox">' + Forms.CreateCheckBoxProperty("business", "reorder", R1) + "</div></div>";
        N += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_BUSINESS_FEATURED'] ?></span><div class="inputbox">' + Forms.CreateCheckBoxProperty("business", "feature", R2) + "</div></div>";

        N += "</div>";
        N += '<div class="rightcol">';
        N += '<form id="bform" enctype="multipart/form-data" method="post" action="upload.php">';
        var A = "";
        if (F.id) {
     if(F.isimg == 1) {
            A = "background-image:url('images/business/" + Main.NullToEmpty(F.id) + "/panel.jpg?c=" + new Date().getTime() + "');"
            }
            else  {
               A = "background-image:url('images/dummy/panel.jpg');"
            }
        }
        N += '<div><input type="file" name="file[]" style="' + A + '"/></div>';
        N += '<div class="uploaderbox" style="width:280px;height:280px;" onclick="Business.OpenMap()"><div class="preview map hand"></div></div>';
        N += "</form>";
        N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 100%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_BUSINESS_CUSTOM_SLUG'] ?></span><div style="display: table-cell;vertical-align: middle;">' + Forms.CreateInputPropertyCustomSlug("business", "customslug", F.customslug, true) + "</div></div>";

       N += "</div>";

            <!--Mercury Single Payment Method -->
       
       N += '<div class="mainbrntmn" style="float: left; width:100%">'
       N += '<h2 style="font-size: 14px;"><?= $lang_resource['CONTROL_PANEL_MERCURY_PAYMENT_INFO'] ?></h2>'
       
       N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 60%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_ID'] ?></span><div class="brntcls">' + Forms.CreateInputPropertyMercury("business", "mercury_id", F.mercury_id, false) + "</div></div>";
       N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 60%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS'] ?></span><div class="brntcls">' + Forms.CreateInputPropertyMercury("business", "mercury_pass", F.mercury_pass, false,'','',true) + "</div></div>";
       
       N += "</div>";
       <!--Mercury Payment Method -->


       <!--Braintree Single Payment Method -->

       N += '<div class="mainbrntmn" style="float: left;">'
       N += '<h2 style="font-size: 14px;"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO'] ?></h2>'

       var i1 = new Array();

       var G1 = "";
       if (F.environment) {
          G1 = F.environment
       }

       var y1 = new Object();

       y1.id = '0';
       y1.caption = 'sandbox';
       i1.push(y1);

       var y1 = new Object();
       y1.id = '1';
       y1.caption = 'live';
       i1.push(y1);

       N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 60%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_METHOD'] ?></span><div class="brntcls">' + Forms.CreateSelectPropertyBraintree("business", "environment", i1, G1,false, false, true) + "</div></div>"
       N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 60%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID'] ?></span><div class="brntcls">' + Forms.CreateInputPropertyBraintree("business", "merchant_id", F.merchant_id, false) + "</div></div>";

       N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 60%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY'] ?></span><div class="brntcls">' + Forms.CreateInputPropertyBraintree("business", "public_key", F.public_key, false) + "</div></div>";

       N += '<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 60%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY'] ?></span><div class="brntcls">' + Forms.CreateInputPropertyBraintree("business", "private_key", F.private_key, false) + "</div></div>";

       N += "</div>";
       <!--Braintree Single Payment Method -->

        <!--Authorizer Net Payment GAteway-->
        N += '<div class="authorizer_payment" style="float:left;">'

        N +='<h4><?=$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_INFO']?></h4>'
        var pa="";
        pa ='[{"id":"0","caption":"Test"},{"id":"1","caption":"Secure"}]';
        pa = JSON.parse(pa);
        N+= '<div class="row" style="width: 72%; display: table; height: 35px;float: left;margin-left: 5px;margin-bottom: 9px;"><span class="caption" style="font-size: 12px;display: table-cell;padding-top: 10px;float: left;"><?= $lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_PAYMENT_METHOD'] ?></span><div class="inputbox">'+ Forms.CreateSelectPropertyAp("business", "payment_type", pa, F.payment_type, false, "", false) +"</div></div>";
        N += '<div class="row" style="width: 72%; display: table; height: 35px;float: left;margin-left: 5px;margin-bottom: 9px;"><span class="caption" style="font-size: 12px;display: table-cell;padding-top: 10px;float: left;"><?= $lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL'] ?></span><div class="inputbox">' + Forms.CreateInputPropertyAp("business", "aplid", F.aplid, false) + "</div></div>";
        N += '<div class="row" style="width: 72%; display: table; height: 35px;float: left;margin-left: 5px;margin-bottom: 9px;"><span class="caption" style="font-size: 12px;display: table-cell;padding-top: 10px;float: left;"><?= $lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY'] ?></span><div class="inputbox">' + Forms.CreateInputPropertyAp("business", "tkey", F.tkey, false) + "</div></div>";
        N +='</div>'
        <!--Authorizer Net Payment GAteway-->

        <!--card save Payment GAteway-->
        N += '<div class="worldpay_payment" style="float:left;">'

        N +='<h4><?=$lang_resource['CONTROL_PANEL_CARDSAVE_PAYMENT_INFO']?></h4>'

        N += '<div class="row" style="width: 100%; display: table; height: 35px;float: left;margin-left: 5px;margin-bottom: 9px;"><span class="caption" style="font-size: 12px;display: table-cell;padding-top: 10px;float: left;"><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARD_ID'] ?></span><div class="inputbox">' + Forms.CreateInputPropertyCardSave("business", "cardsaveid", F.cardsaveid, false) + "</div></div>";

        N += '<div class="row" style="width: 100%; display: table; height: 35px;float: left;margin-left: 5px;margin-bottom: 9px;"><span class="caption" style="font-size: 12px;display: table-cell;padding-top: 10px;float: left;"><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARD_PASSWORD'] ?></span><div class="inputbox">' + Forms.CreateInputPropertyCardSave("business", "cardsavepass", F.cardsavepass, false) + "</div></div>";


        N +='</div>'
        <!--card save Payment GAteway-->



        $('body').height("1716");

       $(".mainleft").height("1556");



       N += "</div>";
        N += '<div id="tab_metas" style="display:none;" class="editform">';
        N += '<div class="leftcol fullcol">';
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_METAS_KEYWORDS'] ?></span></div>';
        N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "mkeywords", Main.NullToEmpty(F.mkeywords), false, "", false, "metarea") + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_METAS_DESCRIPTION'] ?></span></div>';
        N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "mdescription", Main.NullToEmpty(F.mdescription), false, "", false, "metarea") + "</div></div>";
         N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_DESCRIPTION'] ?></span></div>';
         N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "pdesc", Main.NullToEmpty(F.pdesc), false, "", false, "metarea") + "</div></div>";
         N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_ABOUT'] ?></span></div>';
         N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "abusiness", Main.NullToEmpty(F.abusiness), false, "", false, "metareasmall") + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_PROMOTIONCODE'] ?></span></div>';
        N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "promotion", Main.NullToEmpty(F.promotion), false, "", false, "metareasmall") + "</div></div>";
        N += "</div>";
        N += "</div>";


var S = false;
        <!------------------------------------------------New section------------------------------------------------------>
          N += '<div id="tab_invoice" style="display:none;" class="editform">';
        N += '<div class="leftcol fullcol">';
        N += '<div class="row"><span class="caption titlebox "><b><?=$lang_resource['BUSINESS_BILLING_BUSINESS_DETAILS']?></b></span></div>';

        N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_VAT_REGISTRATION']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "vatregistration", F.vatregistration) + "</div></div>";
        N += '<div class="row"><span class="caption"><?=$lang_resource['BUSINESS_SAME_AS_BUSINESS_ADDRESS']?></span><div class="inputbox" ><input type="checkbox" id="sameadd" style="margin-right: -82px;" onclick="Business.sameadd();" /></div></div>';

        N += '<div class="row"><span class="caption"><?=$lang_resource['BUSINESS_INVOICE_ADDRESS']?></span><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "invoiceaddress", Main.NullToEmpty(F.invoiceaddress), false, "", false, "metaddress") + "</div></div>";
        N += '<div class="row"><span class="caption"><?=$lang_resource['BUSINESS_EMAIL_ADDRESS_FOR_RESTAURANT']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "vatemail", F.vatemail, false) + "</div></div>";
        N += '<div class="row"><span class="caption titlebox "><b><?=$lang_resource['BUSINESS_PAYMENT_METHOD_BY_BUSINESS']?></b></span></div>';

        if (Forms.Form.business.type == "modify") {
            b = '{"id":"-1","caption":""},'
        }
        else {
            b = '{"id":"-1","caption":""},'
        }
        // b = '{"id":"-1","caption":""},'
         g = "[" + b + '{"id":"1","caption":"<?=$lang_resource['INVOICE_BANK']?>"},{"id":"2","caption":"<?=$lang_resource['INVOICE_PAYPAL']?>"}]';
         g = JSON.parse(g);

         N += '<div class="row" ><span class="caption"><?=$lang_resource['INVOICE_SELECT_PAYMENT_TYPE']?></span><div class="inputbox">' + Forms.CreateSelectProperty("business", "payby", g, F.payby, false, "Business.TypeChanged(this.value)", false) + "</div></div>";

        if (Forms.Form.business.type == "modify") {
         if(F.payby==1)
         {
             N += '<div class="row" id="bankname_s"><span class="caption"><?=$lang_resource['INVOICE_BANK_NAME']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankname", F.bankname, false) + "</div></div>";
             N += '<div class="row" id="bankac_s" ><span class="caption"><?=$lang_resource['INVOICE_BANK_AC_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankac", F.bankac, false) + "</div></div>";
             N += '<div class="row" id="routineno_s"><span class="caption"><?=$lang_resource['INVOICE_ROUTINE_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "routineno", F.routineno, false) + "</div></div>";
             N += '<div class="row" id="swiftcode_s"><span class="caption"><?=$lang_resource['INVOICE_SWIFT_CODE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "swiftcode", F.swiftcode, false) + "</div></div>";

             N += '<div class="row" id="vatpaypalemail_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "vatpaypalemail", F.vatpaypalemail, false) + "</div></div>";

         }
         else if(F.payby==2)
         {
             N += '<div class="row" id="bankname_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_BANK_NAME']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankname", F.bankname, false) + "</div></div>";
             N += '<div class="row" id="bankac_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_BANK_AC_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankac", F.bankac, false) + "</div></div>";
             N += '<div class="row" id="routineno_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_ROUTINE_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "routineno", F.routineno, false) + "</div></div>";
             N += '<div class="row" id="swiftcode_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_SWIFT_CODE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "swiftcode", F.swiftcode, false) + "</div></div>";
             N += '<div class="row" id="vatpaypalemail_s"><span class="caption"><?=$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "vatpaypalemail", F.vatpaypalemail, false) + "</div></div>";
        }else{
             N += '<div class="row" id="bankname_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_BANK_NAME']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankname", F.bankname, false) + "</div></div>";
             N += '<div class="row" id="bankac_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_BANK_AC_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankac", F.bankac, false) + "</div></div>";
             N += '<div class="row" id="routineno_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_ROUTINE_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "routineno", F.routineno, false) + "</div></div>";
             N += '<div class="row" id="swiftcode_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_SWIFT_CODE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "swiftcode", F.swiftcode, false) + "</div></div>";

             N += '<div class="row" id="vatpaypalemail_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "vatpaypalemail", F.vatpaypalemail, false) + "</div></div>";
        }

  }else{
         N += '<div class="row" id="bankname_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_BANK_NAME']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankname", F.bankname, false) + "</div></div>";
         N += '<div class="row" id="bankac_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_BANK_AC_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "bankac", F.bankac, false) + "</div></div>";
         N += '<div class="row" id="routineno_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_ROUTINE_NO']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "routineno", F.routineno, false) + "</div></div>";
         N += '<div class="row" id="swiftcode_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_SWIFT_CODE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "swiftcode", F.swiftcode, false) + "</div></div>";

         N += '<div class="row" id="vatpaypalemail_s" style="display:none;"><span class="caption"><?=$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "vatpaypalemail", F.vatpaypalemail, false) + "</div></div>";

         }


         N += '<div class="row"><span class="caption titlebox "><b><?=$lang_resource['BUSINESS_BILLING_OPTIONS']?></b></span></div>';
         N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_SETUP_RATE_FIXED_PRICE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "billingfxprice", F.billingfxprice, false) + "</div></div>";
         N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_FIXED_RATE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "fixedrate", F.fixedrate, false) + "</div></div>";


         N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_RER_ORDER_COMMISSION_PERCENTAGE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "billingperorder", F.billingperorder, false) + "</div></div>";
         N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_PER_ORDER_FIXED_RATE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "billingperorderfixrate", F.billingperorderfixrate, false) + "</div></div>";
         N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_OTHER_RATE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "otherrate", F.otherrate, false) + "</div></div>";
         N += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_VAT']?> (%)</span><div class="inputbox">' + Forms.CreateInputProperty("business", "vat", F.vat, false) + "</div></div>";


          N += '<div class="row"><span class="caption"> <?=$lang_resource['BUSINESS_GENERATE_AUTO_INVOICE']?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "autoinvoiceday", F.autoinvoiceday, false) + " </div></div>";


        N += "</div>";
        N += "</div>";
         <!------------------------------------------------New section------------------------------------------------------>


        N += '<div id="tab_schedules" style="display:none;" class="editform">';
        N += '<div class="leftcol">';
        var z;
        var J;
        var O;
        var d;
        var L = ["", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_MONDAY'] ?>",
            "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_TUESDAY'] ?>",
            "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_WEDNESDAY'] ?>",
            "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_THURSDAY'] ?>",
            "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_FRIDAY'] ?>",
            "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SATURDAY'] ?>",
            "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SUNDAY'] ?>"];
        for (var B = 1; B <= 7; B++) {
            N += "<span>" + L[B] + "</span><br/>";
            if (M && C.sdays) {
                z = C.sdays[B].opens.hour;
                J = C.sdays[B].opens.minute;
                O = C.sdays[B].closes.hour;
                d = C.sdays[B].closes.minute
            }
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_OPENNING'] ?></span><div class="inputbox">';
            N += '<select id="' + B + '_openminute" class="scheduleminute" onchange="Business.UpdateSchedule()">';
                //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
            for (var E = 0; E < 60; E++) {
                if (J == E) {
                    N += '<option SELECTED value="E">' + Business.zeroPad((E),2) + "</option>"
                } else {
                    N += '<option value="E" >' +  Business.zeroPad((E),2) + "</option>"
                }
            }
            N += "</select>";
            N += '<span class="caption schedulecaption">:</span>';
            N += '<select id="' + B + '_openhour" class="schedulehour" onchange="Business.UpdateSchedule()" style="width:69px">';
            for (var E = 0; E < 24; E++) {
            //Time selection settings. 
                if(time_format=="12"){
                    E2=Business.convertTimeFormatHour(E);
                 }else{
                      E2= Business.zeroPad((E),2);
                 }
                if (z == E) {
                
                    N += "<option SELECTED  value="+E+" >" +  E2+ "</option>"
                } else {
                    N += "<option  value="+E+" >" +  E2 + "</option>"
                }
            }
            N += "</select>";
            N += "</div></div>";
            N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_CLOSING'] ?></span><div class="inputbox">';
            N += '<select id="' + B + '_closeminute" class="scheduleminute" onchange="Business.UpdateSchedule()" >';
            for (var E = 0; E < 60; E++) {
                if (d == E) {
                    N += '<option SELECTED value="E">' +  Business.zeroPad((E),2) + "</option>"
                } else {
                    N += '<option value="E">' + Business.zeroPad((E),2) + "</option>"
                }
            }
            N += "</select>";
            N += '<span class="caption schedulecaption">:</span>';
            N += '<select id="' + B + '_closehour" class="schedulehour" onchange="Business.UpdateSchedule()" style="width:69px">';
            for (var E = 0; E < 29; E++) {
                
                if(E > 24){
               
                    var q = E-24;
                    
                    if (O == E) {
                        N += "<option  SELECTED value="+E+">" + q + "am</option>"
                    }
                    else{
                        N += "<option value="+E+">" + q + "am</option>"
                    }
                }            
                else {
                //Time selection settings. 
                if(time_format=="12"){
                    E2=Business.convertTimeFormatHour(E);
                 }else{
                      E2= Business.zeroPad((E),2) ;
                 }
                    if (O == E) {
                        N += "<option  SELECTED value="+E+">" + E2+ "</option>"
                    }
                    else{
                        N += "<option value="+E+">" + E2+ "</option>"
                    }
                }
            }

            N += "</select>";
            N += "</div></div>"
        }
        N += "</div>";
        N += "</div>";
        N += '<div id="tab_menus" style="display:none;">';
        N += '<div class="table">';
        N += '<div class="title nonselectable">';
        N += '<div class="id hand" onclick="Business.PupulateMenusTable(\'id\')"><span class="caption">#</span></div>';
        N += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        N += '<div class="menuname hand" onclick="Business.PupulateMenusTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_NAME_HEADER'] ?></span></div>';
        N += '<div class="menucomments hand" onclick="Business.PupulateMenusTable(\'comments\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] ?></span></div>';
        N += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_ENABLE_HEADER'] ?></span></div>';
        N += "</div>";
        N += '<div class="container" id="menus"></div>';
        N += "</div>";
        N += "</div>";
        
        <!---------------------------------------------------Catagories tab------------------------------------------------------------------------------->
        
            N += '<div id="tab_catagories" style="display:none;">';
            N += '<div class="table">';
            N += '<div class="title nonselectable">';
            N += '<div class="id hand" ><span class="caption">Id</span></div>';

            N += '<div class="menuname hand" style="width: 150px !important;" ><span class="caption">Name</span></div>';
            N += '<div class="menuname hand" style="width: 150px !important;" ><span class="caption">Rank</span></div>';
            N += '<div class="menuname hand" style="width: 170px !important;" ><span class="caption">Select Rank</span></div>';
            N += "</div>";
            N += '<div class="container" id="cat_sort"></div>';
            N += "</div>";
            N += "</div>";        
            
        <!---------------------------------------------------Catagories tab------------------------------------------------------------------------------->
        
        <!---------------------------------------------------Reserve tab------------------------------------------------------------------------------->

            N += '<div id="tab_reserve" style="display:none;">';
        N += '<div class="table">';
        N += '<div class="title nonselectable">';
        N += '<div class="id hand" onclick="Business.PupulateMenusTable(\'id\')"><span class="caption">#</span></div>';
        N += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        N += '<div class="menuname hand" style="width: 150px !important;" onclick="Business.PupulateMenusTable(\'name\')"><span class="caption">NAME</span></div>';
        N += '<div class="menuname hand" style="width: 150px !important;" onclick="Business.PupulateMenusTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_NAME_HEADER'] ?></span></div>';

        N += '<div class="menucomments hand" style="width: 150px !important;" onclick="Business.PupulateMenusTable(\'comments\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_SEAT_HEADER'] ?></span></div>';
        N += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_ENABLE_HEADER'] ?></span></div>';
        N += "</div>";
        N += '<div class="container" id="reserve"></div>';
        N += "</div>";
        N += "</div>";
        <!---------------------------------------------------Reserve tab------------------------------------------------------------------------------->
        N += '<div id="tab_dishes" style="display:none;">';
        N += '<div class="table">';
        N += '<div class="title nonselectable">';
        N += '<div class="id hand" onclick="Business.PupulateDishesTable(\'id\')"><span class="caption">#</span></div>';
        N += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        N += '<div class="businessname hand" onclick="Business.PupulateDishesTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_NAME_HEADER'] ?></span></div>';
        N += '<div class="extradesc hand" onclick="Business.PupulateDishesTable(\'category\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?></span></div>';
        N += '<div class="extraprice hand" onclick="Business.PupulateDishesTable(\'price\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'] ?></span></div>';
        N += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_ENABLE_HEADER'] ?></span></div>';
        N += "</div>";
        N += '<div class="container" id="dishes"></div>';
        N += "</div>";
        N += "</div>";
        N += '<div id="tab_extras" style="display:none;">';
        N += '<div class="table" style="width:650px;">';
        N += '<div class="title nonselectable">';
        N += '<div class="id hand" onclick="Business.PupulateExtrasTable(\'id\')"><span class="caption">#</span></div>';
        N += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        N += '<div class="businessname hand" onclick="Business.PupulateExtrasTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_NAME_HEADER'] ?></span></div>';
        N += '<div class="extradesc hand" onclick="Business.PupulateExtrasTable(\'description\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'] ?></span></div>';
        N += '<div class="extraprice hand" onclick="Business.PupulateExtrasTable(\'price\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_PRICE_HEADER'] ?></span></div>';
        N += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_ENABLE_HEADER'] ?></span></div>';
        N += "</div>";
        N += '<div class="container" id="extras"></div>';
        N += "</div>";
        N += "</div>";
        N += "</div>";
        document.getElementById("leftcol").innerHTML = R;
        document.getElementById("main").innerHTML = N;
        if (F.location == "" || F.location == null) {
            var Q = new Object();
            Q.latitud = "";
            Q.longitud = "";
            Q.zoom = 15;
            F.location = JSON.stringify(Q)
        }
        Forms.CreateValue("business", "location", F.location);
        Forms.CreateValue("business", "imgupload0", "", true);
        Forms.CreateValue("business", "zones", F.zones, false, true);
        Uploader.Activate();
        Uploader.Init("business", "bform", "mainbuttonok", true, Business.ProfileImageUploadFinished, Business.ProfileImageSelected, Business.ProfileStartUpload);
        MultipleInput.Init("categories", this.Categories, true);
        var I = [{
            id: 0,
            name: "<?= $lang_resource['Every_Day_V2'] ?>"
        }, {
            id: 1,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] ?>"
        }, {
            id: 2,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] ?>"
        }, {
            id: 3,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] ?>"
        }, {
            id: 4,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] ?>"
        }, {
            id: 5,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] ?>"
        }, {
            id: 6,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] ?>"
        }, {
            id: 7,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] ?>"
        }];
        MultipleInput.Init("days", I, true);
        if (C) {
            for (E in C.days) {
                MultipleInput.AddTagById("days", C.days[E], false, true)
            }
        }
        Forms.CreateValue("business", "categories", F.categories, false, true);
        if (F.categories) {
            F.categories = JSON.parse(F.categories);
            for (E in F.categories) {
                MultipleInput.AddTagById("categories", F.categories[E])
            }
        }
        if (M && Main.User.level < 2) {
            Business.PopulateCitySelect(F.country, F.city.id)
        }
        MultipleInput.AddListener("tagschange", "Business.MultiInputTagsChange");
        $("#name").focus()

        sms.EnableSmsBusiness(F);
        mercadopago.EnableMercadopagoBusiness(F);
    },
    
    
        <!-- Catagories Sort -->
    GetCatagories: function(){
    	if (Forms.Form.business.type == "create") {
        	alert("Please Create Business First");
            Business.Main();
            
        }else{
        	Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchCatagoriesById&id=" + Forms.Form.business.id, function (a) {
            
            	Business.Fcatagories = JSON.parse(a);
                Main.Ready();
               
            	Business.CatagoriesForm(Business.Fcatagories);
            });
        }
    },
    CatagoriesForm: function(){
   		var k='';
       
        for (var n in this.Fcatagories) {
            var m;
            if (n % 2 == 0) {
                m = " grey"
            } else {
                m = ""
            }
            k += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
            k += '<div class="id"><div class="cap"><span class="caption hand">' + this.Fcatagories[n].category + "</span></div></div>";
            k += '<div class="menuname" style="width: 150px !important;"><div class="cap"><span class="caption hand">' + this.Fcatagories[n].category_name + "</span></div></div>";
            k += '<div class="menuname" style="width: 150px !important;"><div class="cap"><span class="caption hand">' + this.Fcatagories[n].rank_cat + "</span></div></div>";
            
            k += '<div class="menuname" style="width: 170px !important;"><div class="cap"><span class="caption hand">'
            k +='<select onchange="Business.SortCatagories(this.value,'+this.Fcatagories[n].category+')">'
            for(var i=0; i<=Business.Fcatagories.length; i++){
            if(this.Fcatagories[n].rank_cat == i){
            k +='<option value="'+i+'" selected="selected">'+i+'</option>'
            }else{
            k +='<option value="'+i+'">'+i+'</option>'
            }
            }
            k +='</select>'
            
            k +='</span></div></div>'
        
        
            k += "</div>"
        }
        
        document.getElementById("cat_sort").innerHTML = k;
        
       
    },
    SortCatagories:  function (h,l) {
    if(h == 0){ 
        alert('<?=$lang_resource['CATAGORIES_SELECTRANK_ALERT']?>')
        Business.GetCatagories();
        return
    }
    $.post("lib/business.php", "f=ChangeRankCat&rank="+h+"&cid="+l+"&bid="+ Forms.Form.business.id, function (a) {
    	//alert(a)
       Business.GetCatagories();
    });
    },
   
    <!-- Catagories Sort -->
    CountrySelected: function (b) {
        Business.PopulateCitySelect(b.options[b.selectedIndex].value)
    },
    PopulateCitySelect: function (f, d) {
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + f + '"}]}]', function (b) {
            if (e != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                var c = JSON.parse(b).franchises;
                var i = document.getElementById("city");
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j in c) {
                    if (d) {
                        if (c[j].id == d) {
                            a = j
                        }
                    }
                    i.options[i.options.length] = new Option(c[j].city, c[j].id)
                }
                if (d) {
                    i.selectedIndex = parseInt(a) + 1
                } else {
                    Forms.Form.business.fields.city.value = "";
                    if (Forms.CanSave("business")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },
    SwitchTab: function (d, e) {

        document.getElementById("tab_" + this.FormTab).style.display = "none";
        document.getElementById("tab_" + e).style.display = "block";
        $(".tab").each(function (a, b) {
            $(b).removeClass("active");
            $(b).addClass("inactive")
        });
        $(d).removeClass("inactive");
        $(d).addClass("active");
        this.FormTab = e;
        var f = new Array();

        switch (e) {
        case "menus":
        $('input:checkbox').removeAttr('checked');

            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "menu";
            f.push(Visuals.CreateSubMenuItem("Business.NewMenu()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_BUTTON_CREATE'] ?>"));
                f.push(Visuals.CreateSubMenuItem("Business.EditMenu()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_BUTTON_EDIT'] ?>"));
                f.push(Visuals.CreateSubMenuItem("Business.DeleteMenu()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_BUTTON_DELETE'] ?>"));

            document.getElementById("subleftcol").innerHTML = Visuals.CreateSubMenu(f);
            this.GetMenus();
            break;
        case "dishes":
        $('input:checkbox').removeAttr('checked');

            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "dish";
            f.push(Visuals.CreateSubMenuItem("Business.NewDish()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_CREATE'] ?>"));
                f.push(Visuals.CreateSubMenuItem("Business.EditDish()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_EDIT'] ?>"));
                f.push(Visuals.CreateSubMenuItem("Business.DeleteDish()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_DELETE'] ?>"));
                f.push(Visuals.CreateSubMenuItem("Business.FileCsvDish()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_CSVFILE'] ?>"));
            document.getElementById("subleftcol").innerHTML = Visuals.CreateSubMenu(f);
            this.GetDishes(null, true);
            break;
        case "extras":
        $('input:checkbox').removeAttr('checked');

            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "extra";
            f.push(Visuals.CreateSubMenuItem("Business.NewExtra()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_BUTTON_CREATE'] ?>"));
            f.push(Visuals.CreateSubMenuItem("Business.EditExtra()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_BUTTON_EDIT'] ?>"));
            f.push(Visuals.CreateSubMenuItem("Business.DeleteExtra()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_BUTTON_DELETE'] ?>"));
            document.getElementById("subleftcol").innerHTML = Visuals.CreateSubMenu(f);
            this.GetExtras(null, true);
            break;
        case "schedules":
            Forms.SubmitButton = "mainbuttonok";
            this.ActiveForm = "business";
            document.getElementById("subleftcol").innerHTML = "";
            document.getElementById("menus").innerHTML = "";
            document.getElementById("dishes").innerHTML = "";
            document.getElementById("extras").innerHTML = "";
            break;
        case "metas":
            Forms.SubmitButton = "mainbuttonok";
            this.ActiveForm = "business";
            document.getElementById("subleftcol").innerHTML = "";
            document.getElementById("menus").innerHTML = "";
            document.getElementById("dishes").innerHTML = "";
            document.getElementById("extras").innerHTML = "";
            break;

        case "invoice":

            Forms.SubmitButton = "mainbuttonok";
            this.ActiveForm = "business";
            document.getElementById("subleftcol").innerHTML = "";
            document.getElementById("menus").innerHTML = "";
            document.getElementById("dishes").innerHTML = "";
            document.getElementById("extras").innerHTML = "";
            break;
         case "reserve":
         $('input:checkbox').removeAttr('checked');

            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "reserve";
            f.push(Visuals.CreateSubMenuItem("Business.NewReserve()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_CREATE'] ?>"));
            f.push(Visuals.CreateSubMenuItem("Business.EditReserve()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_EDIT'] ?>"));
            f.push(Visuals.CreateSubMenuItem("Business.DeleteReserve()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_DELETE'] ?>"));
            f.push(Visuals.CreateSubMenuItem("Business.PriceSetting1()", "Price Setting"));

            document.getElementById("subleftcol").innerHTML = Visuals.CreateSubMenu(f);
            this.GetReserve(null, true);
            break;
        case "general":
            Forms.SubmitButton = "mainbuttonok";
            this.ActiveForm = "business";
            document.getElementById("subleftcol").innerHTML = "";
            document.getElementById("menus").innerHTML = "";
            document.getElementById("dishes").innerHTML = "";
            document.getElementById("extras").innerHTML = "";
            break
        case "catagories":
            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "catagories";
            //f.push(Visuals.CreateSubMenuItem("Business.SortCatagories()", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_EDIT'] ?>"));
            document.getElementById("subleftcol").innerHTML = ''
            this.GetCatagories(null, true);
            break;     

        }
    },
     FileCsvDish: function () {

    if(Main.NullToEmpty(Forms.Form.business.id) == "") {
        swal("Error","<?= $lang_resource['PANEL_CSV_ZIP_BUSINESS_ID_TEXT'] ?>","error");
        return false;
    }
     var a = "";
        var c = "";


        a += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Business.Edit(Forms.Form.business.id)");
        Forms.Clean("category", "mainbuttonok");

            Forms.Form.category.type = "create"

        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        if (Forms.Form.category.type == "create") {
            c += '<span class="title">&gt;&gt;   UPLOAD PRODUCT</span>'
        }
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';

            c +='<form name="zipcode" action="csv/product_uplode.php" method="post" enctype="multipart/form-data" onsubmit="return Business.csvFile(this);">';
            c += '<div class="row"><span class="caption"><?=$lang_resource['PANEL_CSV_ZIP_CODE_TEXT']?></span><div class="inputbox"><input name="csvfile"  type="file" ></div></div><input type="hidden" value="'+ Forms.Form.business.id +'" name="businessid" >';
             c += '<div class="row"><div class="inputbox"><input name="submit" type="submit" value="SUBMIT" class="mainbutton" style="background: none repeat scroll 0 0 #D40200;border: 2px solid #D40200;height: 100%;width: 32%; margin:20px 0 0 110px; color:#FFFFFF; float:left" ></div></div>';
             c +='</form>';

        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#name").focus()
    },
     csvFile: function (frm) {

            var csvfile=frm.csvfile.value;
           var ext = csvfile.substring(csvfile.lastIndexOf('.') + 1);
                    if(csvfile=="")
                    {
                        swal("Error","<?= $lang_resource['PANEL_CSV_PERMISSION_BLANK'] ?>","error");
                        return false;
                    }
                    else if(ext!="csv")
                    {
                        swal("Error","<?= $lang_resource['PANEL_CSV_PERMISSION_EXT'] ?>","error");
                        return false;
                    }
                    else
                    {
                    return true;

                    }

    },
    OpenMap: function () {

        var h = Forms.GetValue("business", "zones");
        if (h != "") {
            h = JSON.parse(h)
        } else {
            h = new Object();
            h.zone1 = new Object();
            h.zone1.price = "0.00";
            h.zone2 = new Object();
            h.zone2.price = "0.00";
            h.zone3 = new Object();
            h.zone3.price = "0.00"
        }

        var f = '<div id="mapbuttons" style="position:absolute;z-index:2;">';
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 01", Forms.CreateInputProperty2("business", "zone1price", h.zone1.price, false, "", false, false, "return Main.IsNumberKey(event)"), "Business.DrawingZone(this,'zone1')");
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 02", Forms.CreateInputProperty2("business", "zone2price", h.zone2.price, false, "", false, false, "return Main.IsNumberKey(event)"), "Business.DrawingZone(this,'zone2')");
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 03", Forms.CreateInputProperty2("business", "zone3price", h.zone3.price, false, "", false, false, "return Main.IsNumberKey(event)"), "Business.DrawingZone(this,'zone3')");
        f += Visuals.CreateGreyButton("<?= $lang_resource['delete_V2'] ?>", "Business.DeletingZone(this)");
        f += Visuals.CreateGreyButton("<?= $lang_resource['clear_zones_V2'] ?>", "Business.ClearZones(this)");
        f += "</div>";
        f += '<div id="mapbox" class="businessmapbox"></div>';

        Popup.Show(700, 698, f, Business.GetLocationAndZone, function () {
            GoogleMap.Clean()
        }, null, true);
        GoogleMap.Clean();

        var e = JSON.parse(Forms.GetValue("business", "location"));


            var g = "";
           
            if(Forms.GetValue("business", "street") !=""){
            	g += Forms.GetValue("business", "street") + ", ";
            }
            if(Forms.GetValue("business", "colony") !=""){
            	g += Forms.GetValue("business", "colony") + ", ";
            }
            if(Forms.GetValue("business", "city") !=""){
            	g +=  Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Forms.GetValue("business", "city"), "city") + ", ";
            }
            if(Forms.GetValue("business", "country") !=""){
            	g += Main.GetPropertyValueOnPropertyValueFound(Main.Countries, "id", Forms.GetValue("business", "country"), "name") + ", ";
            }
    
            if (g == "") {
                e.latitud = 51.507351;
                e.longitud = -0.127758;
                e.zoom = 4;
                
                /*e.latitud = 23.634501;
                e.longitud = -102.552784;
                e.zoom = 4;*/
            }



            GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, g, Business.MapReady, "bottomright")


    },
    DrawingZone: function (e, f) {
        var d = $("#mapbuttons");
        d.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        d.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        $(e).addClass("zonebuttonpressed");
        GoogleMap.StartDrawingShape(f)
    },
    DeletingZone: function (d) {
        var c = $("#mapbuttons");
        c.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        c.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        $(d).addClass("zonebuttonpressed");
        GoogleMap.StartDeletingShape()
    },
    ClearZones: function (d) {
        var c = $("#mapbuttons");
        c.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        c.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        GoogleMap.ClearAllShapes()
    },
    MapReady: function () {

        GoogleMap.StartShapeTool();
        GoogleMap.AddShapeDrawingStyle("zone1", "#6fbc5a", 3, "#6fbc5a");
        GoogleMap.AddShapeDrawingStyle("zone2", "#4f9bc4", 5, "#4f9bc4");
        GoogleMap.AddShapeDrawingStyle("zone3", "#fac739", 5, "#fac739");
        var b = Forms.GetValue("business", "zones");
        if (b != "") {
            b = JSON.parse(b);
            if (b.zone1.coordinates == "") {
                b.zone1.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone1", b.zone1.coordinates);
            if (b.zone2.coordinates == "") {
                b.zone2.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone2", b.zone2.coordinates);
            if (b.zone3.coordinates == "") {
                b.zone3.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone3", b.zone3.coordinates)
        }
    },
    GetLocationAndZone: function () {

        Forms.UpdateValue("business", "location", JSON.stringify(GoogleMap.GetUserLocation()));
        var d = GoogleMap.GetZones();
        var c = new Object();
        c.zone1 = new Object();
        c.zone2 = new Object();
        c.zone3 = new Object();
        c.zone1.coordinates = d.zone1;
        c.zone2.coordinates = d.zone2;
        c.zone3.coordinates = d.zone3;
        Forms.Form.business.fields.zone1price.value = Main.FixToDecimal(Forms.Form.business.fields.zone1price.value);
        Forms.Form.business.fields.zone2price.value = Main.FixToDecimal(Forms.Form.business.fields.zone2price.value);
        Forms.Form.business.fields.zone3price.value = Main.FixToDecimal(Forms.Form.business.fields.zone3price.value);
        c.zone1.price = Forms.GetValue("business", "zone1price");
        c.zone2.price = Forms.GetValue("business", "zone2price");
        c.zone3.price = Forms.GetValue("business", "zone3price");
        Forms.Form.business.fields.zones.value = JSON.stringify(c);
        if (c.zone1.coordinates.length == 0 && c.zone2.coordinates.length == 0 && c.zone3.coordinates.length == 0) {
            Forms.Form.business.fields.zones.value = "";
            Forms.Form.business.fields.zones.save = false
        } else {
            if (Forms.Form.business.fields.zones.ivalue != Forms.Form.business.fields.zones.value) {
                Forms.Form.business.fields.zones.save = true
            }
        } if (Forms.CanSave("business")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
        Popup.Close()
    },
    ProfileImageSelected: function (c, d) {
        Forms.UpdateValue("business", "imgupload" + d, c, true);
        if (Forms.CanSave("business")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (d) {
        Main.Busy = false;
        Response = JSON.parse(d);
        if (Response.status == "no files selected") {
            Business.Save()
        } else {
            var f = true;
            for (var e in Response) {
                if (Response[e].status == "failed") {
                    f = false
                }
            }
            if (f) {
                Business.Save(Response[0].name)
            }
        }
    },
    ProfileStartUpload: function () {
        Forms.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
    UpdateSchedule: function () {
        var f = new Object();
        var e;
        f.days = MultipleInput.GetTagsIds("days");
        f.sdays = new Object();
        for (var d = 1; d <= 7; d++) {
            f.sdays[d] = new Object();
            f.sdays[d].opens = new Object();
            f.sdays[d].closes = new Object();
            e = document.getElementById(d + "_openhour");
                //Time selection settings. 
              f.sdays[d].opens.hour = e.value;
          //  f.sdays[d].opens.hour = e.options[e.selectedIndex].text;
            e = document.getElementById(d + "_openminute");
            f.sdays[d].opens.minute = e.options[e.selectedIndex].text;
            e = document.getElementById(d + "_closehour");
            cval=e.value;
             if(e.value>24){
                 cval=e.options[e.selectedIndex].value;
             }
              f.sdays[d].closes.hour = cval;
          //  f.sdays[d].closes.hour = e.options[e.selectedIndex].value;
            e = document.getElementById(d + "_closeminute");
            f.sdays[d].closes.minute = e.options[e.selectedIndex].text
        }
        Forms.UpdateValue("business", "schedule", JSON.stringify(f), true);
        if (Forms.CanSave("business")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
      checkslug : function (g) {


     Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
   $.post("lib/business.php", "f=checkslug&data=" + JSON.stringify(Forms.Form.business), function (a) {

         if (d != Main.Aid) {
                    return
                }
                Main.Ready();
               if( a == "okay") {
        Forms.PrepareForSaving("business");
        Forms.Form.business.dishes = this.DishesIds;
        Forms.Form.business.extras = this.ExtrasIds;
        Forms.Form.business.menus = this.MenusIds;
        delete Forms.Form.business.fields.zone1price;
        delete Forms.Form.business.fields.zone2price;
        delete Forms.Form.business.fields.zone3price;




        if (Business.ForceMainButtonEvent) {
            Main.Request("business", null, "f=SaveBusiness&data=" + JSON.stringify(Forms.Form.business), Business.ForceMainButtonEvent)
        } else {
            Main.Request("business", null, "f=SaveBusiness&data=" + JSON.stringify(Forms.Form.business), "Business.Main()")
        }
        Uploader.Clean();
        Forms.Clean("business");
        GoogleMap.Clean()
               }
               else {
               alert("<?= $lang_resource['CONTROL_PANEL_BUSINESS_DUPBLICATE_SLUG'] ?>");


               if(Forms.Form.business.id) {

                return ;

               }
               else {

              return ;

               }
               }
          })

     },
    Save: function (b) {

                if (Forms.CanSave("business") == false) {
                return
                }

                Main.Loading();
                if (b != null) {
                Forms.Form.business.image = b
                }
                var adrs = "";
                if(Forms.Form.business.fields.street.value)
                adrs += Forms.Form.business.fields.street.value+",";

                if(Forms.Form.business.fields.colony.value)
                adrs += Forms.Form.business.fields.colony.value+",";

                if(Forms.Form.business.fields.cp.value)
                adrs += Forms.Form.business.fields.cp.value+",";


                var conty = $("#country option:selected").text();
                var cty = $("#city option:selected").text();
                if(cty)
                adrs += cty+",";
                if(conty)
                adrs += conty;


                var geocoder = new google.maps.Geocoder();
                var address = adrs;

                geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    var location = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":14}');

                    Forms.UpdateValue("business", "location", location, true);
                    Business.checkslug(Forms.Form.business.fields.customslug.value);

                }
                });







                },

    Delete: function () {
        if(confirm("<?= $lang_resource['CONTROL_PANEL_BUSINESS_DELETE_CONFIRMATION'] ?>")) {
        this.click;
          var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var d = new Object();
        d.ids = c;
        Main.Request("business", null, "f=DeleteBusiness&data=" + JSON.stringify(d), "Business.Main()")
       }
       else
       {
          return false;
       }

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
                            Popup.Show(700, 722, e, Business.SaveMenu, null, Business.PreEditMenu)
                        }
                    } else {
                        Business.Dishes = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 722, e, Business.SaveMenu, null, Business.PreEditMenu)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchDishesDataByBusiness&id=" + Forms.Form.business.id, function (a) {

                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    Business.Dishes = JSON.parse(a);
                    if (f) {
                        Business.PupulateDishesTable(Main.Config.Dishes.List.SortBy, true)
                    } else {
                        Popup.Show(700, 722, e, Business.SaveMenu, null, Business.PreEditMenu)
                    }
                }
            })
        }
    },
    PupulateDishesTable: function (j, h) {
        var k = "";
        var l = this.Dishes.length;
        if (h) {
            this.Dishes.sort(Main.SortByProperty(j));
            if (Main.Config.Dishes.List.SortByStatus == "max") {
                this.Dishes.reverse()
            }
        } else {
            if (Main.Config.Dishes.List.SortBy != j) {
                this.Dishes.sort(Main.SortByProperty(j));
                Main.Config.Dishes.List.SortByStatus = "min"
            } else {
                this.Dishes.reverse();
                if (Main.Config.Dishes.List.SortByStatus == "min") {
                    Main.Config.Dishes.List.SortByStatus = "max"
                } else {
                    Main.Config.Dishes.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Dishes.List.SortBy = j;
        if (!h) {
            Main.SaveConfig()
        }
        for (var n in this.Dishes) {
            var m;
            if (n % 2 == 0) {
                m = " grey"
            } else {
                m = ""
            }
            k += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
            k += '<div class="id"><div class="cap"><span class="caption hand" onclick="Business.EditDish(' + this.Dishes[n].id + ')">' + this.Dishes[n].id + "</span></div></div>";
            k += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Dishes[n].id + '"/></div>';
            k += '<div class="businessname"><div class="cap"><span class="caption hand" onclick="Business.EditDish(' + this.Dishes[n].id + ')">' + this.Dishes[n].name + "</span></div></div>";
            k += '<div class="extradesc"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Dishes[n].category) + "</span></div></div>";
            k += '<div class="extraprice"><div class="cap"><span class="caption">' +Main.NullToEmpty(this.Dishes[n].price) + "</span></div></div>";
            k += '<div class="enabled"><span class="caption"><div id="switch_' + this.Dishes[n].id + '"></div></span></div>';
            k += "</div>"
        }
        document.getElementById("dishes").innerHTML = k;
        var i = false;
        Switch.Init();
        for (n in this.Dishes) {
            if (this.Dishes[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switch_" + this.Dishes[n].id, i);
            Switch.OnChange("switch_" + this.Dishes[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "dish")
            })
        }
    },
    NewDish: function () {
        this.DishForm()
    },
    EditDish: function (h, l) {
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
        } if (i) {
            var k = this;
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetDishData&id=" + h, function (a) {
                if (g != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    k.DishForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
    DishForm: function (p) {
        Forms.Clean("dish", "popupmainbuttonok");
        if (p) {
            Forms.Form.dish.type = "modify";
            Forms.Form.dish.id = p.id
        } else {
            p = new Object();
            Forms.Form.dish.type = "create";
            if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("dish", "dish_business", Forms.Form.business.id, false, true, true)
            }
        }
        Forms.Form.dish.dish = p;
        this.ActiveForm = "dish";
        var i = '<div class="titlebox nonselectable">';
        if (Forms.Form.dish.type == "create") {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_TITLE'] ?></span>'
        } else {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_EDIT_TITLE'] ?></span>'
        }
        i += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        i += "</div>";
        i += '<div class="editform">';
        i += '<div class="leftcol">';
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("dish", "dish_name", Main.NullToEmpty(p.name), true) + "</div></div>";
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_DESCRIPTION'] ?></span><div class="inputbox">' + Forms.CreateTextAreaProperty("dish", "dish_description", Main.NullToEmpty(p.description), false, "", false, "dishdesc") + "</div></div>";
        Forms.CreateValue("dish", "dish_ingredients", Main.NullToEmpty(p.ingredients));
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_INGREDIENTS'] ?></span><div class="multiinputbox"><span class="nonobligatory nonselectable">*</span><input type="text" id="dish_ingredients" style="width:285px;height:115px"/></div></div>';
        Forms.CreateValue("dish", "dish_extras", Main.NullToEmpty(p.extras));
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_EXTRAS'] ?></span><div class="multiinputbox"><span class="nonobligatory nonselectable">*</span><input type="text" id="dish_extras" style="width:285px;height:115px"/></div></div>';
        var j = new Array();
        j.push(JSON.parse('{"id":"","caption":""}'));
        var k = MultipleInput.GetTags("categories");

        k.sort(Main.SortByProperty("name"));
        for (var o in k) {
            var n = new Object();
            n.id = k[o].id;
            n.caption = k[o].name;
            j.push(n)
        }

        var l = "";
        if (p.category) {
            l = p.category
        }

        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_CATEGORY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("dish", "dish_category", j, l, true) + "</div></div>";
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_PRICE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("dish", "dish_price", Main.NullToEmpty(p.price), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
         var D1 = false;
        if (p.feature == "t") {
            D1 = true
        }


        i += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_BUSINESS__DISH_POPULAR'] ?></span><div class="inputbox">' + Forms.CreateCheckBoxProperty("dish", "dish_feature", D1) + "</div></div>";
        i += "</div>";
        i += '<div class="rightcol">';
        i += '<form id="dishform" enctype="multipart/form-data" method="post" action="upload.php">';
        var m = "";
        if (p.id) {

              if(p.isimg == 0) {
          m = "background-image:url('images/dummy/dish-panel.jpg');"
        } else {
            m = "background-image:url('images/dishes/" + Main.NullToEmpty(p.id) + "/1/panel.jpg?c=" + new Date().getTime() + "');"
        }
        }
        i += '<div><input type="file" name="file[]" style="' + m + '"/></div>';
        if (p.id) {
          if(p.isimg2 == 0) {
          m = "background-image:url('images/dummy/dish-panel.jpg');"
        } else {
            m = "background-image:url('images/dishes/" + Main.NullToEmpty(p.id) + "/2/panel.jpg?c=" + new Date().getTime() + "');"
            }

           }
        i += '<div><input type="file" name="file[]" style="' + m + '"/></div>';
        if (p.id) {
         if(p.isimg3 == 0) {
         m = "background-image:url('images/dummy/dish-panel.jpg');"
        } else {
            m = "background-image:url('images/dishes/" + Main.NullToEmpty(p.id) + "/3/panel.jpg?c=" + new Date().getTime() + "');"
            }
             }
        i += '<div><input type="file" name="file[]" style="' + m + '"/></div>';
        Forms.CreateValue("dish", "imgupload0", "", true);
        Forms.CreateValue("dish", "imgupload1", "", true);
        Forms.CreateValue("dish", "imgupload2", "", true);
        i += "</form>";
        i += "</div>";
        i += "</div>";
        this.GetExtras(i)
    },
    PreEditDish: function () {
        MultipleInput.Init("dish_ingredients", []);
        MultipleInput.Init("dish_extras", Business.Extras, true);
        if (Forms.Form.dish.type == "modify") {
            if (Forms.Form.dish.dish.extras != "") {
                var d = JSON.parse(Forms.Form.dish.dish.extras);
                for (var e in d) {
                    MultipleInput.AddTagById("dish_extras", d[e])
                }
                Forms.Form.dish.fields.dish_extras.save = false
            }
            if (Forms.Form.dish.dish.ingredients != "") {
                var f = JSON.parse(Forms.Form.dish.dish.ingredients);
                for (e in f) {
                    MultipleInput.AddTagByElem("dish_ingredients", {
                        name: f[e]
                    })
                }
                Forms.Form.dish.fields.dish_ingredients.save = false
            }
        }
        Uploader.Init("dish", "dishform", "popupmainbuttonok", true, Business.DishImageUploadFinished, Business.DishImageSelected, Business.DishStartUpload, "popup");
        $("#dish_name").focus()
    },
    DishImageSelected: function (c, d) {
        Forms.UpdateValue("dish", "imgupload" + d, c, true);
        if (Forms.CanSave("dish")) {
            Popup.EnableSubmitButton(true)
        } else {
            Popup.EnableSubmitButton(false)
        }
    },
    DishImageUploadFinished: function (e) {
        Main.Busy = false;
        Response = JSON.parse(e);
        if (Response.status == "no files selected") {
            Business.SaveDish()
        } else {
            var g = new Object();
            var h = true;
            for (var f in Response) {
                if (Response[f].status == "failed") {
                    h = false
                } else {
                    g[Response[f].id] = Response[f].name
                }
            }
            if (h) {
                Business.SaveDish(g)
            }
        }
    },
    DishStartUpload: function () {
        Popup.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
   SaveDish: function (f) {
       /* if (Forms.CanSave("dish") == false) {
            return
        }*/
          
        var d1 = new Date().getTime();
        Main.Aid = d1;
        Forms.Form.dish.fields.dish_ingredients.value = Forms.Form.dish.fields.dish_ingredients.value.split("&").join("@@@");
        Forms.Form.dish.fields.dish_ingredients.ivalue = Forms.Form.dish.fields.dish_ingredients.ivalue.split("&").join("@@@");
        Forms.Form.dish.fields.dish_name.value = Forms.Form.dish.fields.dish_name.value.split("&").join("@@@");
        Forms.Form.dish.fields.dish_name.ivalue = Forms.Form.dish.fields.dish_name.ivalue.split("&").join("@@@");
        Forms.Form.dish.fields.dish_description.value = Forms.Form.dish.fields.dish_description.value.split("&").join("@@@");
        Forms.Form.dish.fields.dish_description.ivalue = Forms.Form.dish.fields.dish_description.ivalue.split("&").join("@@@");
        if( Forms.Form.dish.type == "modify") {
        Forms.Form.dish.dish.name = Forms.Form.dish.dish.name.split("&").join("@@@");
        if(Forms.Form.dish.dish.description)
        Forms.Form.dish.dish.description = Forms.Form.dish.dish.description.split("&").join("@@@");
        if(Forms.Form.dish.dish.ingredients)
        Forms.Form.dish.dish.ingredients = Forms.Form.dish.dish.ingredients.split("&").join("@@@");
        
        }
           
        $.post("lib/business.php", "f=getTotalPriceDish&data=" + JSON.stringify(Forms.Form.dish), function (a) {
       
          /*if (d1 != Main.Aid) {
                return
            }*/
            if(parseFloat(a)>0){
                
                ////////////////////////////
        Forms.PrepareForSaving("dish");
        delete Forms.Form.dish.dish;
        Forms.Form.dish.fields = Main.RemoveFromPropertyNames(Forms.Form.dish.fields, "dish_");
        Forms.Form.dish.fields.price.value = Main.FixToDecimal(Forms.Form.dish.fields.price.value);
        if(Forms.Form.dish.fields.price.value == 0.00){
            Forms.Form.dish.fields.price.value ='';
        }
        if (f) {
            if (f[0] != null) {
                Forms.Form.dish.image1 = f[0]
            }
            if (f[1] != null) {
                Forms.Form.dish.image2 = f[1]
            }
            if (f[2] != null) {
                Forms.Form.dish.image3 = f[2]
            }
        }
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
       
        $.post("lib/business.php", "f=SaveDish&data=" + JSON.stringify(Forms.Form.dish), function (a) {
      
            if (d != Main.Aid) {
                return
            }
            Main.Ready(true);
            if (e) {
                if (Main.IsNumber(a)) {
                    if (Business.DishesIds) {
                        Business.DishesIds += "," + a
                    } else {
                        Business.DishesIds = a
                    }
                }
            }
            Popup.Close();
            Business.GetDishes(null, true)
        });
        Forms.Clean("dish")
        
         ////////////////////////
                
                }else{
                	alert("<?= $lang_resource['PANEL_PRODUCT_OPTION_PRICE_ALT1'] ?>");
                    return
                }
          });
    },
    DeleteDish: function () {
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var d = new Object();
        d.ids = c;
        Main.Request("business", null, "f=DeleteDish&data=" + JSON.stringify(d), "Business.GetDishes(null,true)")
    },
    GetExtras: function (e, f) {
        if (Forms.Form.business.type == "create") {
            if (Business.ExtrasIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchExtrasDataByIds&ids=" + Business.ExtrasIds, function (a) {


                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        Business.Extras = JSON.parse(a);
                        if (f) {
                            Business.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)
                        } else {
                            Popup.Show(700, 722, e, null, null, Business.PreEditDish)
                        }
                    } else {
                        Business.Extras = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 722, e, null, null, Business.PreEditDish)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchExtrasDataByBusiness&id=" + Forms.Form.business.id, function (a) {

                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {

                    <!--%PRODUCT OPTION%-->
                    data=JSON.parse(a);
                    Business.Extras = JSON.parse(a);

                     if(data['id']){
                    $.post("lib/business.php", "f=GetExtrasDetails&data=" + data['id'], function (b) {

/*
                        Business.Extras = JSON.parse(a);
                        Business.ExtrasDetails=JSON.parse(b);
*/
                        console.log(b);
//                        console.log(Business.Extras);
                    });
                     }
                    <!--%PRODUCT OPTION%-->

                    if (f) {
                        Business.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)
                    } else {
                        Popup.Show(700, 722, e, null, null, Business.PreEditDish)
                    }
                }
            })
        }
    },
    PupulateExtrasTable: function (j, h) {

        var k = "";
        var m = this.Extras.length;
        if (h) {
            this.Extras.sort(Main.SortByProperty(j));
            if (Main.Config.Extras.List.SortByStatus == "max") {
                this.Extras.reverse()
            }
        } else {
            if (Main.Config.Extras.List.SortBy != j) {
                this.Extras.sort(Main.SortByProperty(j));
                Main.Config.Extras.List.SortByStatus = "min"
            } else {
                this.Extras.reverse();
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

        for (var n in this.Extras) {
            var l;

            if (n % 2 == 0) {
                l = " grey"
            } else {
                l = ""
            }
            k += '<div class="default row' + l + '" style="border-bottom:1px solid #e4e4e4;">';
            k += '<div class="id"><div class="cap"><span class="caption hand" onclick="Business.EditExtra(' + this.Extras[n].id + ')">' + this.Extras[n].id + "</span></div></div>";
            k += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Extras[n].id + '"/></div>';
            k += '<div class="businessname" ><div class="cap"><span class="caption hand" onclick="Business.EditExtra(' + this.Extras[n].id + ')">' + this.Extras[n].set + "</span></div></div>"; <!--%PRODUCT OPTION STYLE WIDTH%-->
            Business.update_option_dropdown(this.Extras[n].id);
            k += '<div class="extradesc"  ><div class="cap"><span class="caption"><div id="options'+this.Extras[n].id+'" style="float:left;"></div><img id="panelimgsu" src="../../images/panel/01add.png" style="float: right; margin-right: 5px; cursor:pointer" width="18" onclick="Business.GetOptionsVia(null,'+this.Extras[n].id+')" alt="Add" title="Add" /></span></div></div>'; <!--%PRODUCT OPTION STYLE WIDTH%-->
            k += '<div class="extradesc" style="width:14%;"  ><div class="cap"><span class="caption"><div id="actions'+this.Extras[n].id+'" style="margin-top:0px;"></div></span></div></div>';<!--%PRODUCT OPTION STYLE WIDTH%-->
            k += '<div class="enabled" ><span class="caption"><div id="switch_' + this.Extras[n].id + '"></div></span></div>';<!--%PRODUCT OPTION STYLE WIDTH%-->
            k += "</div>"
        }
        document.getElementById("extras").innerHTML = k;
        var i = false;
        Switch.Init();
        for (n in this.Extras) {
            if (this.Extras[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switch_" + this.Extras[n].id, i);
            Switch.OnChange("switch_" + this.Extras[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "extra")
            })
        }
    },
    NewExtra: function () {
        this.ExtraForm()
    },
      EditExtra: function (h, l) {
        console.log(h); <!--%PRODUCT OPTION%-->
        console.log(l); <!--%PRODUCT OPTION%-->
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
        } if (i) {
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
                    k.ExtraForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
    ExtraForm: function (d) {
        Forms.Clean("extra", "popupmainbuttonok");
        if (d) {
            Forms.Form.extra.type = "modify";
            Forms.Form.extra.id = d.id
        } else {
            d = new Object();
            Forms.Form.extra.type = "create";
            if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
            }
        }
        Forms.Form.extra.extra = d;
        console.log(Forms.Form.extra); <!--%PRODUCT OPTION%-->
        console.log(Forms.Form.extra.id); <!--%PRODUCT OPTION%-->
        console.log(Forms.Form.extra.name); <!--%PRODUCT OPTION%-->
        this.ActiveForm = "extra";
            e = '<div class="titlebox nonselectable">';
        if (Forms.Form.extra.type == "create") {
            e += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_TITLE'] ?></span>'
        } else {
            e += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'
        }
        e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        e += "</div>";
        e += '<div class="editform">';
        e += '<div class="leftcol">';
        e += '<div class="row"><span class="caption" style="width:128px"><?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_INPUT_SET'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("extra", "extra_set", Main.NullToEmpty(d.set), true) + "</div></div>"; <!--%PRODUCT OPTION PHP TAG%-->
        e += '<div class="row"><span class="caption" style="width:128px"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_END'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("extra", "extra_text_to_end_user", Main.NullToEmpty(d.text_to_end_user), true) + "</div></div>";
   /*     e += '<div class="row"><span class="caption">Max Rank For This Set</span><div class="inputbox">' + Forms.CreateInputPropertyTest("extra", "extra_mrank", Main.NullToEmpty(d.mrank), true) + "</div></div>";*/ <!--%PRODUCT OPTION%-->
        e += "</div>";
        e += '<div class="rightcol">';


        e += '<form id="extraform" enctype="multipart/form-data" method="post" action="upload.php">';
        var f = "";
        if (d.id) {
            f = "background-image:url('images/extras/" + Main.NullToEmpty(d.id) + "/panel.jpg?c=" + new Date().getTime() + "');"
        }

        <!--%PRODUCT OPTION%-->
       /* e += '<div><input type="file" name="file[]" style="' + f + '"/></div>';*/
     //   Forms.CreateValue("extra", "imgupload0", "", true);
        e += "</form>";
        e += "</div>";
        e += "</div>";


    /*    Popup.Show(700, 318, e, null, null, Business.PreEditExtra)*/
        Popup.Show(700, 318, e, Business.SaveExtra, null,null)
    },

    PreEditExtra: function () {
        Uploader.Init("extra", "extraform", "popupmainbuttonok", true, Business.ExtraImageUploadFinished, Business.ExtraImageSelected, Business.ExtraStartUpload, "popup");
        $("#extra_name").focus()
    },
    ExtraImageSelected: function (c, d) {
        Forms.UpdateValue("extra", "imgupload" + d, c, true);
        if (Forms.CanSave("extra")) {
            Popup.EnableSubmitButton(true)
        } else {
            Popup.EnableSubmitButton(false)
        }
    },
    ExtraImageUploadFinished: function (d) {
        Main.Busy = false;
        Response = JSON.parse(d);
        if (Response.status == "no files selected") {
            Business.SaveExtra()
        } else {
            var f = true;
            for (var e in Response) {
                if (Response[e].status == "failed") {
                    f = false
                }
            }
            if (f) {
                Business.SaveExtra(Response[0].name)
            }
        }
    },
    ExtraStartUpload: function () {
        Popup.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
     SaveExtra: function (f) {

        if (Forms.CanSave("extra") == false) {


            return
        }
        Forms.PrepareForSaving("extra");
        delete Forms.Form.extra.extra;
        Forms.Form.extra.fields = Main.RemoveFromPropertyNames(Forms.Form.extra.fields, "extra_");
        console.log( Forms.Form.extra.fields);   <!--%PRODUCT OPTION%-->
        console.log( Forms.Form.extra);   <!--%PRODUCT OPTION%-->

        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        if (f != null) {
            Forms.Form.extra.image = f
        }
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
        $.post("lib/business.php", "f=SaveExtra&data=" + JSON.stringify(Forms.Form.extra), function (a) {


            if (d != Main.Aid) {
                return
            }
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
            Popup.Close();
            Business.GetExtras(null, true)
            set_id=a;   <!--%PRODUCT OPTION%-->
    //           Business.step1();  <!--%PRODUCT OPTION%-->
        });
        Forms.Clean("extra")
    },
    DeleteExtra: function () {
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var d = new Object();
        d.ids = c;
        Main.Request("business", null, "f=DeleteExtra&data=" + JSON.stringify(d), "Business.GetExtras(null,true)")
    },
    GetMenus: function () {
        this.Days = [{
            id: 0,
            name: "<?= $lang_resource['Every_Day_V2'] ?>"
        }, {
            id: 1,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] ?>"
        }, {
            id: 2,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] ?>"
        }, {
            id: 3,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] ?>"
        }, {
            id: 4,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] ?>"
        }, {
            id: 5,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] ?>"
        }, {
            id: 6,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] ?>"
        }, {
            id: 7,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] ?>"
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
                        Business.Menus = JSON.parse(a);
                        Business.PupulateMenusTable(Main.Config.Menus.List.SortBy, true)
                    } else {
                        Business.Menus = null
                    }
                })
            }
        } else {
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
            $.post("lib/business.php", "f=FetchMenusDataByBusiness&id=" + Forms.Form.business.id, function (a) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    Business.Menus = JSON.parse(a);
                    Business.PupulateMenusTable(Main.Config.Menus.List.SortBy, true)
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
        for (var n in this.Menus) {
            var m;
            if (n % 2 == 0) {
                m = " grey"
            } else {
                m = ""
            }
            k += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
            k += '<div class="id"><div class="cap"><span class="caption hand" onclick="Business.EditMenu(' + this.Menus[n].id + ')">' + this.Menus[n].id + "</span></div></div>";
            k += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Menus[n].id + '"/></div>';
            k += '<div class="menuname"><div class="cap"><span class="caption hand" onclick="Business.EditMenu(' + this.Menus[n].id + ')">' + this.Menus[n].name + "</span></div></div>";
            k += '<div class="menucomments"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Menus[n].comments) + "</span></div></div>";
            k += '<div class="enabled"><span class="caption"><div id="switch_' + this.Menus[n].id + '"></div></span></div>';
            k += "</div>"
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
            Switch.Create("switch_" + this.Menus[n].id, i);
            Switch.OnChange("switch_" + this.Menus[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "menu")
            })
        }
    },
    NewMenu: function () {
        this.MenuForm()
    },
    EditMenu: function (h, l) {
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
    MenuForm: function (j) {
        Forms.Clean("menu", "popupmainbuttonok");
        if (j) {
            Forms.Form.menu.type = "modify";
            Forms.Form.menu.id = j.id
        } else {
            j = new Object();
            Forms.Form.menu.type = "create";
            if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("menu", "menu_business", Forms.Form.business.id, false, true, true)
            }
        }
        Forms.Form.menu.menu = j;
        this.ActiveForm = "menu";
        var i = '<div class="titlebox nonselectable">';
        if (Forms.Form.menu.type == "create") {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_TITLE'] ?></span>'
        } else {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_EDIT_TITLE'] ?></span>'
        }
        i += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        i += "</div>";
        i += '<div class="editform">';
        i += '<div class="leftcol lcolmenu">';
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("menu", "menu_name", Main.NullToEmpty(j.name), true) + "</div></div>";
        Forms.CreateValue("menu", "menu_days", Main.NullToEmpty(j.days), false, true);
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DAYS'] ?></span><div class="multiinputbox"><span class="obligatory nonselectable">*</span><input type="text" id="menu_days" style="width:245px;height:60px"/></div></div>';
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


       var H = false;
        if (j.pickup == "t") {
            H = true
        }

        var H1 = false;
        if (j.delivery == "t") {
            H1 = true
        }
         i += '<div class="row"><div class="delvtycls"> <label>Delivery Type: </label>' + Forms.CreateCheckBoxProperty("menu", "pickup", H) + '</div><div  class="delvtycls"> <label>Pick up </label>' + Forms.CreateCheckBoxProperty("menu", "delivery", H1) + '</div><div  class="delvtycls"> <label >Delivery </label></div><div class="star">*</div></div>';

        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_START'] ?></span><div class="inputbox">';
        i += '<select id="menu_openminute" class="scheduleminute" onchange="Business.UpdateMenuSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (m == p) {
                i += '<option SELECTED value="p" >' +  Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p" >' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
         //Time selection settings. 
          time_format="<?=$lang_resource['TIME_FORMAT']?>";
         
        i += '<select id="menu_openhour" class="schedulehour" onchange="Business.UpdateMenuSchedule()" style="width:69px">';
        for (var p = 0; p < 24; p++) {
          //Time selection settings. 
             if(time_format=="12"){
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
        i += "</select>";
        i += "</div></div>";
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_END'] ?></span><div class="inputbox">';
        i += '<select id="menu_closeminute" class="scheduleminute" onchange="Business.UpdateMenuSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (n == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="menu_closehour" class="schedulehour" onchange="Business.UpdateMenuSchedule()" style="width:69px">';
        for (var p = 0; p < 29; p++) {
            if (k == p) {
                if(p > 24){
                    var c = p - 24;
                     i += "<option SELECTED value="+ p +">" + c + "am</option>"
                 }
                 else{
                  //Time selection settings. 
                  if(time_format=="12"){
                    p4=Business.convertTimeFormatHour(p);
                 }else{
                      p4= Business.zeroPad((p),2) ;
                 }
                 i += "<option SELECTED value="+ p +">" + p4 + "</option>"
                  }
            } 
           else if(p>24){
                var c = p - 24;
                i += "<option value="+ p +">" + c + "am</option>"
           }
            else {
             //Time selection settings. 
                 if(time_format=="12"){
                    p3=Business.convertTimeFormatHour(p);
                 }else{
                      p3= Business.zeroPad((p),2) ;
                 }
                i += "<option value="+ p +">" + p3 + "</option>"
            }
        }
        i += "</select>";
        i += "</div></div>";
        Forms.CreateValue("menu", "menu_dishes", Main.NullToEmpty(j.dishes), false, true);
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DISHES'] ?></span><div class="multiinputbox"><span class="obligatory nonselectable">*</span><input type="text" id="menu_dishes" style="width:245px;height:240px"/></div></div>';
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_COMMENTS'] ?></span><div class="inputbox">' + Forms.CreateTextAreaProperty("menu", "menu_comments", Main.NullToEmpty(j.comments), false, "", false, "menudesc") + "</div></div>";
        i += "</div>";
        i += '<div class="rightcol rcolmenu">';
        i += '<div class="row"><span class="caption"></span><div id="draggable"></div></div>';
        i += "</div>";
        i += "</div>";
        this.GetDishes(i)
    }, //Time selection settings. 
     convertTimeFormatHour:function(hour){
        
        str='PM';
        if( hour < 12 ){
            str='AM';
        }
        if( hour > 23 ){
        	 str='AM';
 	    }
        hour=parseInt(hour)%12;
        return time=Business.zeroPad((hour),2)+' '+str;
                
        
        
        
    },
      zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   },
    PreEditMenu: function () {
        MultipleInput.Init("menu_days", Business.Days, true);
        MultipleInput.Init("menu_dishes", Business.Dishes, true, true);
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
        for (var g in Business.Dishes) {
            l = false;
            for (var h in j) {
                if (j[h] == Business.Dishes[g].category) {
                    l = true
                }
            }
            if (!l) {
                j.push(Business.Dishes[g].category)
            }
        }
        DraggableAccordion.Init("draggable", "menudraggable");
        for (g in j) {

            DraggableAccordion.AddCategory("c" + g, j[g]);

            for (h in Business.Dishes) {

                if (Business.Dishes[h].category == j[g]) {
                    DraggableAccordion.AddItem(Business.Dishes[h].id, Business.Dishes[h].name, "c" + g)
                }
            }
        }
        DraggableAccordion.StartAcordion();
        $("#menu_name").focus()
    },
    UpdateMenuSchedule: function () {
        var c = new Object();
        var d;
        c.opens = new Object();
        d = document.getElementById("menu_openhour");
            //Time selection settings. 
         c.opens.hour = d.value;
       // c.opens.hour = d.options[d.selectedIndex].text;
        d = document.getElementById("menu_openminute");
        c.opens.minute = d.options[d.selectedIndex].text;
        c.closes = new Object();
        d = document.getElementById("menu_closehour");
        //Time selection settings. 
          chv= d.value;
        if( d.value>24){
            chv=d.options[d.selectedIndex].value;   
        }
        c.closes.hour = chv;
        //c.closes.hour = d.options[d.selectedIndex].value;
        d = document.getElementById("menu_closeminute");
        c.closes.minute = d.options[d.selectedIndex].text;
        Forms.UpdateValue("menu", "schedule", JSON.stringify(c), true);
        if (Forms.CanSave("menu")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    SaveMenu: function () {
        if (Forms.CanSave("menu") == false) {
            return
        }
        Forms.PrepareForSaving("menu");
        delete Forms.Form.menu.menu;
        Forms.Form.menu.fields = Main.RemoveFromPropertyNames(Forms.Form.menu.fields, "menu_");
        var d = true;
        Main.Loading(true);
        var c = new Date().getTime();
        Main.Aid = c;
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
            Business.GetMenus()
        });
        Forms.Clean("menu")
    },
    DeleteMenu: function () {
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var d = new Object();
        d.ids = c;
        Main.Request("business", null, "f=DeleteMenu&data=" + JSON.stringify(d), "Business.GetMenus()")
    },

    sameadd: function(){


    if(sameadd.checked) {

       if(document.getElementById('street').value == "" || document.getElementById('colony').value == ""){
            alert("Please Filled Address & Neighborhood from General Tab");
             document.getElementById("sameadd").checked = false;
       }else{

       var address = document.getElementById('street').value + "\n" + document.getElementById('colony').value ;
		  document.getElementById('invoiceaddress').value = address;
         Forms.CheckTextInput("business",document.getElementById("invoiceaddress"));
      }

    } else {
      document.getElementById('invoiceaddress').value = "";
    }


    },

TypeChanged: function (a) {
        //alert(JSON.stringify(a));
        if(a == 1)
        {
            document.getElementById("bankname_s").style.display = "";
            document.getElementById("bankac_s").style.display = "";
            document.getElementById("routineno_s").style.display = "";
            document.getElementById("swiftcode_s").style.display = "";

            document.getElementById("vatpaypalemail_s").style.display = "none";


        }
        else if(a == 2)
        {
            document.getElementById("bankname_s").style.display = "none";
            document.getElementById("bankac_s").style.display = "none";
            document.getElementById("routineno_s").style.display = "none";
            document.getElementById("swiftcode_s").style.display = "none";
           document.getElementById("vatpaypalemail_s").style.display = "";




        }
        else
        {
            document.getElementById("bankname_s").style.display = "none";
            document.getElementById("bankac_s").style.display = "none";
            document.getElementById("routineno_s").style.display = "none";
            document.getElementById("swiftcode_s").style.display = "none";

            document.getElementById("vatpaypalemail_s").style.display = "none";

        }
    },
    MultiInputTagsChange: function (d) {

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
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    <!--Reserve----------------------------------------------------------------------------------->
     GetReserve: function (e, f) {
     this.Days = [{
            id: 0,
            name: "<?= $lang_resource['Every_Day_V2'] ?>"
        }, {
            id: 1,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] ?>"
        }, {
            id: 2,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] ?>"
        }, {
            id: 3,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] ?>"
        }, {
            id: 4,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] ?>"
        }, {
            id: 5,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] ?>"
        }, {
            id: 6,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] ?>"
        }, {
            id: 7,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] ?>"
        }];
        if (Forms.Form.business.type == "create") {
            if (Business.ReserveIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchReserveDataByIds&ids=" + Business.ReserveIds, function (a) {


                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        Business.Reserve = JSON.parse(a);
                        if (f) {
                            Business.PupulateReserveTable(Main.Config.Reserve.List.SortBy, true)
                        } else {
                            Popup.Show(700, 693, e, Business.SaveReserve, null, Business.PreEditReserve)
                        }
                    } else {
                        Business.Reserve = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 693, e, Business.SaveReserve, null, Business.PreEditReserve)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchReserveDataByBusiness&id=" + Forms.Form.business.id, function (a) {

                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    Business.Reserve = JSON.parse(a);
                    if (f) {
                        Business.PupulateReserveTable(Main.Config.Reserve.List.SortBy, true)
                    } else {
                        Popup.Show(700, 693, e, Business.SaveReserve, null, Business.PreEditReserve)
                    }
                }
            })
        }
    },
    EditReserve: function (h, l) {
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
        } if (i) {
            var k = this;
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetReserveData&id=" + h, function (a) {
                if (g != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    k.ReserveForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
     NewReserve: function () {
        this.ReserveForm()
    },
    PupulateReserveTable: function (j, h) {
        var k = "";
        var l = this.Reserve.length;
        if (h) {
            this.Reserve.sort(Main.SortByProperty(j));
            if (Main.Config.Reserve.List.SortByStatus == "max") {
                this.Reserve.reverse()
            }
        } else {
            if (Main.Config.Reserve.List.SortBy != j) {
                this.Reserve.sort(Main.SortByProperty(j));
                Main.Config.Reserve.List.SortByStatus = "min"
            } else {
                this.Reserve.reverse();
                if (Main.Config.Reserve.List.SortByStatus == "min") {
                    Main.Config.Reserve.List.SortByStatus = "max"
                } else {
                    Main.Config.Reserve.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Reserve.List.SortBy = j;
        if (!h) {
            Main.SaveConfig()
        }
        for (var n in this.Reserve) {
            var m;
            if (n % 2 == 0) {
                m = " grey"
            } else {
                m = ""
            }
            k += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
            k += '<div class="id"><div class="cap"><span class="caption hand" onclick="Business.EditReserve(' + this.Reserve[n].id + ')">' + this.Reserve[n].id + "</span></div></div>";
            k += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Reserve[n].id + '"/></div>';
            k += '<div class="menuname" style="width: 150px !important;"><div class="cap"><span class="caption hand" onclick="Business.EditReserve(' + this.Reserve[n].id + ')">' + this.Reserve[n].name + "</span></div></div>";
            k += '<div class="menuname" style="width: 150px !important;"><div class="cap"><span class="caption hand" onclick="Business.EditReserve(' + this.Reserve[n].id + ')">' + this.Reserve[n].rtyped + "</span></div></div>";
            k += '<div class="menucomments" style="width: 150px !important;"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Reserve[n].guest) + "</span></div></div>";
            k += '<div class="enabled"><span class="caption"><div id="switch_' + this.Reserve[n].id + '"></div></span></div>';
            k += "</div>"
        }
        document.getElementById("reserve").innerHTML = k;
        var i = false;
        Switch.Init();
        for (n in this.Reserve) {
            if (this.Reserve[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switch_" + this.Reserve[n].id, i);
            Switch.OnChange("switch_" + this.Reserve[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "menu")
            })
        }
    },
    ReserveForm: function (j) {
        Forms.Clean("reserve", "popupmainbuttonok");

     //  alert(JSON.stringify(j))

        if (j) {
            Forms.Form.reserve.type = "modify";
            Forms.Form.reserve.id = j.id
        } else {
            j = new Object();
            Forms.Form.reserve.type = "create";
            if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("reserve", "reserve_business", Forms.Form.business.id, false, true, true)
            }
        }

        Forms.Form.reserve.reserve = j;
        this.ActiveForm = "reserve";
        var i = '<div class="titlebox nonselectable">';
        if (Forms.Form.reserve.type == "create") {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_TITLE'] ?></span>'
        } else {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_EDIT_TITLE'] ?></span>'
        }
        i += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        i += "</div>";
        i += '<div class="editform">';
        i += '<div class="leftcol lcolmenu" style="width:585px;">';
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("reserve", "reserve_name", Main.NullToEmpty(j.name), true) + "</div></div>";
        Forms.CreateValue("reserve", "reserve_days", Main.NullToEmpty(j.days), false, true);
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DAYS'] ?></span><div class="multiinputbox"><span class="obligatory nonselectable">*</span><input type="text" id="reserve_days" style="width:245px;height:60px"/></div></div>';
        var o;
        var m;
        var k;
        var n;
        var o2;
        var m2;
        var k2;
        var n2;
        if (Forms.Form.reserve.type == "modify" && j.schedule) {
            var l = JSON.parse(j.schedule);
            o = l.opens.hour;
            m = l.opens.minute;
            k = l.closes.hour;
            n = l.closes.minute

            o2 = l.opens.hour1;
            m2 = l.opens.minute1;
            k2 = l.closes.hour1;
            n2 = l.closes.minute1
        }
        Forms.CreateValue("reserve", "schedule", JSON.stringify(l));
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_START'] ?> </span><div class="inputbox">';
        i += '<select id="reserve_openminute" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (m == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_openhour" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 24; p++) {
            //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                    p1=Business.convertTimeFormatHour(p);
                 }else{
                      p1=Business.zeroPad((p),2);
                 }
            if (o == p) {
            
                
                i += "<option SELECTED value="+p+">" + p1 + "</option>"
            } else {
                i += "<option value="+p+" >" + p1 + "</option>"
            }
        }
        i += "</select>";

          i += '<span class="caption schedulecaption"></span>';

        i += '<select id="reserve_openminute1" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (m2 == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_openhour1" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 24; p++) {
                //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                    p1=Business.convertTimeFormatHour(p);
                 }else{
                      p1=Business.zeroPad((p),2);
                 }
            if (o2 == p) {
                i += "<option SELECTED  value="+p+" >" + p1 + "</option>"
            } else {
                i += "<option  value="+p+" >" +p1 + "</option>"
            }
        }
        i += "</select>";

        i += "</div></div>";
        i += '<div class="row"><span class="caption">Ends : </span><div class="inputbox">';
        i += '<select id="reserve_closeminute" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (n == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_closehour" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 29; p++) {
            if (k == p) {
                if(p > 24){
                    var c = p - 24;
                     i += "<option SELECTED value="+ p +">" + c + "am</option>"
                 }
                 else{
                 //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                    p1=Business.convertTimeFormatHour(p);
                 }else{
                      p1=Business.zeroPad((p),2);
                 }
                 i += "<option SELECTED value="+ p +">" + p1 + "</option>" 
                 }
            }
           else if(p>24){
                var c = p - 24;
                i += "<option value="+ p +">" + c + "am</option>"
           }
            else {
                //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                    p1=Business.convertTimeFormatHour(p);
                 }else{
                      p1=Business.zeroPad((p),2);
                 }
                i += "<option value="+ p +">" + p1 + "</option>"
            }
        }
        i += "</select>";

        i += '<span class="caption schedulecaption"></span>';

         i += '<select id="reserve_closeminute1" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (n2 == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_closehour1" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 29; p++) {
            if (k2 == p) {
                if(p > 24){
                    var c = p - 24;
                     i += "<option SELECTED value="+ p +">" + c + "am</option>"
                 }
                 else{
                 //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                    p1=Business.convertTimeFormatHour(p);
                 }else{
                      p1=Business.zeroPad((p),2);
                 }
                 i += "<option SELECTED value="+ p +">" + p1 + "</option>" 
                 }
            }
           else if(p>24){
                var c = p - 24;
                i += "<option value="+ p +">" + c + "am</option>"
           }
            else {
                //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                    p1=Business.convertTimeFormatHour(p);
                 }else{
                      p1=Business.zeroPad((p),2);
                 }
                i += "<option value="+ p +">" + p1 + "</option>"
            }
        }
        i += "</select>";
        i += "</div></div>";

        var M = new Array();
        M.push({
            id: "",
            caption: "",
        });

        M.push({
                id: 1,
                caption: "Table",
        });
        M.push({
                id: 2,
                caption: "Room",
        });
        M.push({
                id: 3,
                caption: "Free",
        });

            i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_RESERVESION_TYPE'] ?></span><div>' + Forms.CreateSelectProperty("reserve", "reserve_rtype", M, Main.NullToEmpty(j.rtype), true) + "</div></div>";


        var K = new Array();
        K.push({
            id: "",
            caption: ""
        });
        for (E=1;E<=8;E++) {
            K.push({
                id: E,
                caption: E
            })
        }
            i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_GUEST'] ?></span><div>' + Forms.CreateSelectProperty("reserve", "reserve_guest", K, Main.NullToEmpty(j.guest), true) + "</div></div>";




         Forms.CreateValue("reserve", "duration", '');

              var dy ;
              var dhr;
              var dmm;
          if (Forms.Form.reserve.type == "modify" && j.duration) {
            var l = JSON.parse(j.duration);
            var dy = l.duration.dday;
            var dhr = l.duration.dhour;
            var dmm = l.duration.dminute;

        }
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_DURATION'] ?></span><div class="inputbox">';
        i += '<select id="reserve_dmin" class="scheduleminute" onchange="Business.UpdateReserveDuration()">';
         i += "<option SELECTED>Min</option>"
        for (var p = 0; p < 60; p++) {
            if (dmm == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";

       i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_dhour" class="schedulehour" onchange="Business.UpdateReserveDuration()" >';
         i += "<option SELECTED>Hour</option>"
        for (var p = 0; p < 24; p++) {
            if (dhr == p) {
                i += "<option SELECTED>" + Business.zeroPad((p),2) + "</option>"
            } else {
                i += "<option>" + Business.zeroPad((p),2) + "</option>"
            }
        }
        i += "</select>";

       //  i += '<span class="caption schedulecaption">:</span>';

        i += '<select id="reserve_dday" class="scheduleminute" onchange="Business.UpdateReserveDuration()" style="display:none">';
         i += "<option SELECTED>Days</option>"
        for (var p = 0; p <= 365; p++) {
            if (dy == p) {
                i += '<option SELECTED value="p">' + Business.zeroPad((p),2) + "</option>"
            } else {
                i += '<option value="p">' + Business.zeroPad((p),2)+ "</option>"
            }
        }
        i += "</select>";



        i += "</div></div>";



        this.GetReserve(i)
    },
     PreEditReserve: function () {
        MultipleInput.Init("reserve_days", Business.Days, true);
        if (Forms.Form.reserve.type == "modify") {
            if (Forms.Form.reserve.reserve.days != "") {
                var i = JSON.parse(Forms.Form.reserve.reserve.days);
                for (var g in i) {
                    MultipleInput.AddTagById("reserve_days", i[g])
                }
                Forms.Form.reserve.fields.reserve_days.save = false
            }
        }
        $("#reserve_name").focus()
    },
    UpdateReserveSchedule: function () {
            var c = new Object();
            var d;
            c.opens = new Object();
            d = document.getElementById("reserve_openhour");
            c.opens.hour = d.value;
            d = document.getElementById("reserve_openminute");
            c.opens.minute = d.options[d.selectedIndex].text;

            d = document.getElementById("reserve_openhour1");
            c.opens.hour1 = d.value;
            d = document.getElementById("reserve_openminute1");
            c.opens.minute1 = d.options[d.selectedIndex].text;

            c.closes = new Object();
            d = document.getElementById("reserve_closehour");
            c.closes.hour =  d.value;
            d = document.getElementById("reserve_closeminute");
            c.closes.minute = d.options[d.selectedIndex].text;

            d = document.getElementById("reserve_closehour1");
            c.closes.hour1 = d.value;
            d = document.getElementById("reserve_closeminute1");
            c.closes.minute1 = d.options[d.selectedIndex].text;



            Forms.UpdateValue("reserve", "schedule", JSON.stringify(c), true);
            if (Forms.CanSave("reserve")) {
                Forms.EnableSubmitButton(true)
            } else {
                Forms.EnableSubmitButton(false)
            }
        },

         UpdateReserveDuration: function () {
            var c = new Object();
            var d;
            c.duration = new Object();

            d = document.getElementById("reserve_dday");
            c.duration.dday = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dhour");
            c.duration.dhour = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dmin");
            c.duration.dminute = d.options[d.selectedIndex].text;

            Forms.UpdateValue("reserve", "duration", JSON.stringify(c), true);
            if (Forms.CanSave("reserve")) {
                Forms.EnableSubmitButton(true)
            } else {
                Forms.EnableSubmitButton(false)
            }
        },


         UpdateReserveDuration: function () {
            var c = new Object();
            var d;
            c.duration = new Object();

            d = document.getElementById("reserve_dday");
            c.duration.dday = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dhour");
            c.duration.dhour = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dmin");
            c.duration.dminute = d.options[d.selectedIndex].text;

            Forms.UpdateValue("reserve", "duration", JSON.stringify(c), true);
            if (Forms.CanSave("reserve")) {
                Forms.EnableSubmitButton(true)
            } else {
                Forms.EnableSubmitButton(false)
            }
        },
         PriceSetting1: function () {
     if(!Forms.Form.business.id){
        alert("Please Create a business First")
        return false;
     }
        $.post("lib/business.php", "f=FetchAllPriceData&id=" + Forms.Form.business.id, function (b) {

            if(b!="")
               Business.PriceSetting(b);
             else
              Business.PriceSetting(b);
         })
    },
    PriceSetting: function (b) {

    b = JSON.parse(b);
    var a = "";
    var c = "";


        a += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Business.Edit(Forms.Form.business.id)");


        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
           c += '<span class="title">&gt;&gt;   Price Settings</span>'
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';

            c +='<form name="pricesettings" action="lib/price_settings.php" method="post" enctype="multipart/form-data" onsubmit="return Business.PriceSe(this);">';

            c += '<div class="row"><span class="caption">Room</span><div class="inputbox"><input name="room" value="'+Main.NullToEmpty(b[0].roomprice)+'"  type="text" ></div></div>';

            c += '<div class="row"><span class="caption">Table</span><div class="inputbox"><input name="table" value="'+Main.NullToEmpty(b[0].tableprice)+'" type="text" ></div></div>';

            c += '<div class="row"><span class="caption">Free</span><div class="inputbox"><input name="free" value="'+Main.NullToEmpty(b[0].freeprice)+'"  type="text" ></div></div>';

            c += '<input type="hidden" value="'+ Forms.Form.business.id +'" name="businessid" >';

             c += '<div class="row"><div class="inputbox"><input name="submit" type="submit" value="SUBMIT" class="mainbutton"  style="background: none repeat scroll 0 0 #D40200;border: 2px solid #D40200;height: 100%;width: 32%; margin:20px 0 0 110px; color:#FFFFFF; float:left" ></div></div>';
             c +='</form>';

        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#name").focus()

     },
      PriceSe: function (frm) {

            var roomprice=frm.room.value;
            var tableprice=frm.table.value;
            var freeprice=frm.free.value;

            if(roomprice==""){
                alert("Please fill the Room Price Field");
                return false;
            }
            else if(tableprice==""){
                alert("Please fill the Table Price Field");
                return false;
            }
            else if(freeprice==""){
                alert("Please fill the Free Price Field");
                return false;
            }
            else{
              return true;
            }
    },

    SaveReserve: function () {
        if (Forms.CanSave("reserve") == false) {
            return
        }
        Forms.PrepareForSaving("reserve");
        delete Forms.Form.reserve.reserve;
        Forms.Form.reserve.fields = Main.RemoveFromPropertyNames(Forms.Form.reserve.fields, "reserve_");
        var d = true;
        Main.Loading(true);
        var c = new Date().getTime();
        Main.Aid = c;

        $.post("lib/business.php", "f=SaveReserve&data=" + JSON.stringify(Forms.Form.reserve), function (a) {


            if (c != Main.Aid) {
                return
            }
            Main.Ready(true);
            if (d) {
                if (Main.IsNumber(a)) {
                    if (Business.ReserveIds) {
                        Business.ReserveIds += "," + a
                    } else {
                        Business.ReserveIds = a
                    }
                }
            }
            Popup.Close();
            Business.GetReserve(null,true)
        });
        Forms.Clean("reserve")
    },
    DeleteReserve: function () {


        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var d = new Object();
        d.ids = c;


        Main.Request("business", null, "f=DeleteReserve&data=" + JSON.stringify(d), "Business.GetReserve(null,true)")
    },

    <!--Reserve----------------------------------------------------------------------------------->
        <!--%PRODUCT OPTION FUNCTION%-->
    copyOption : function(set_id,id){

        ids=[{"id":''+id+'',"set_id":''+set_id+''}]
            console.log(JSON.stringify(ids));
        $.post("lib/business.php", "f=GetExtrasOptionsTOCopy&data=" + JSON.stringify(ids), function (a) {
          //  Business.add_input();

            Business.update_option_dropdown(set_id);

        });
        /*Here will be code  to copy option*/
    },
    populateActions:function(set_id,id){
        op_id=id.options[id.selectedIndex].value;
        var t="";

        t += '<img id="panelimgsu" src="../../images/panel/02copy.png" width="17"  style="cursor:pointer" onclick="Business.copyOption('+set_id+','+op_id+')" alt="Copy" title="Copy" />&nbsp;&nbsp;<img id="panelimgsu" src="../../images/panel/03edit.png" width="17"  style="cursor:pointer"  onclick="Business.EditOptionsVia('+set_id+','+op_id+')" alt="Edit" title="Edit" />&nbsp;&nbsp;<img id="panelimgsu" src="../../images/panel/04delete.png" width="17"  style="cursor:pointer"  onclick="Business.DeleteOptions('+set_id+','+op_id+')" alt="Delete" title="Delete" />';
        if(op_id == "") {
        document.getElementById("actions"+set_id).innerHTML = "";
        } else {
        document.getElementById("actions"+set_id).innerHTML = t;
        }
    },
    update_option_dropdown:function(id){

        $.post("lib/business.php","f=GetExtrasOptions&data=" + id, function (a) {

            data=JSON.parse(a);

            console.log(data[0]['name']);
            var t=" ";

            t += '<select style="min-width: 100px; width:108px;" onchange="Business.populateActions('+data[0]['set_id']+',this)"><option value=""><?=$lang_resource['PRODUCT_OPOTIONS_SELECT_OPTION']?></option>';

            $.each(data,function(index,value)
            {
                t += '<option value="' +value['option_id'] + '">' + value['name'] + "</option>";

            });

            t +='</select>';
            document.getElementById("options"+data[0]['set_id']).innerHTML = t;

        });
    },


    set_rank: function(b){
      rank=b.value;
    },
    set_choice: function(b,index){

        choice[index]=b.value;
        console.log("index");
        console.log(index);
        console.log(choice[0]);



    },
    step2: function(d){
        console.log('dname');
          flag=0;

        Forms.Clean("extra_choice", "popupmainbuttonok");
       if(d)
       {
           option_choice = 0;
           total_options=0;
           choice_data=null;
           choice=null;
           gaint_choice_array=new Array();
           old_gaint_choice_array=new Array();
           flag=0;
           choice_data=JSON.parse(d);
           option_choice = 0;
           choice_count=0;
          total_options=choice_data.length;

       }
        else{
           flag=1;

       /*&data=" + JSON.stringify(Forms.Form.extra)*/

       }


           d = new Object();
        Forms.Form.extra_choice.type = "create";
        Forms.Form.extra_choice.extra_choice = d;
   //console.log(choice_data[option_choice]['option_name']);
     var mychoice=choice_data[option_choice]['num_choice'];


/*
        if (d) {
            Forms.Form.extra_choice.type = "modify";
            Forms.Form.extra_choice.id = d.id
        } else {
            d = new Object();
            Forms.Form.extra_choice.type = "create";
            */
/*  if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
            }*//*

        }
*/

        console.log(Forms.Form.extra_choice);

        this.ActiveForm = "extra_choice";
        var e1 = '<div class="titlebox nonselectable">';
        if (Forms.Form.extra_choice.type == "create") {
            e1 += '<span class="title">&gt;&gt;Choice for '+ choice_data[option_choice]['option_name']+'</span>'
        } else {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'

        }
        e1 += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        e1 += "</div>";
        e1 += '<div class="editform">';
        e1 += '<div class="leftcol">';
        ct=0;
        var  min_choice=new Array();
        min_choice.push({
            id: "-1",
            caption: "Min Selection"
        });
        for(j=0;j< mychoice;j++){
            min_choice.push({
                id: j,
                caption: j
            })
        }
        var  max_choice=new Array();
        max_choice.push({
            id: "0-1",
            caption: "Max Selection"
        });
        for(j=0;j< mychoice;j++){
            max_choice.push({
                id: j,
                caption: j
            })
        }



        for(var i=0;i< mychoice;i++){
            e1 += '<div class="row"><span class="caption">Name of choice:</span><div class="inputbox">' + Forms.CreateInputProperty("extra_choice", "extra_name"+i, null, true) + "</div></div>";
            if(flag==1)
            {  for(var ch=0;ch< choice_count;ch++){
                e1 += '<div class="row"><span class="caption">With respect to</span><div class="inputbox">' + Forms.CreateChoiceProperty("extra_choice", "extra_with_respect_to"+ct,gaint_choice_array[ch],[], false) + "</div></div>";
                e1 += '<div class="row"><span class="caption">Price</span><div class="inputbox">' + Forms.CreateInputProperty("extra_choice", "extra_price"+ct,[],[], true) + "</div></div>";
                 ct++;
                    }
            }else if(flag==0)
            {
                e1 += '<div class="row"><span class="caption">Price</span><div class="inputbox">' + Forms.CreateInputProperty("extra_choice", "extra_price"+i,[],[], true) + "</div></div>";
            }

        }
        e1 += '<div class="row"><span class="caption">Minimum Selection</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_choice", "extra_min_choice"+i,min_choice,[], true) + "</div></div>";
        e1 += '<div class="row"><span class="caption">Maximum Selection</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_choice", "extra_max_choice"+i,max_choice,[], true) + "</div></div>";

        e1 += "</div>";
        e1 += '<div class="rightcol">';
        e1 += "</div>";
        e1 += "</div>";
        Forms.Form.extra_choice.option_id = choice_data[option_choice]['option_id'];
        Forms.Form.extra_choice.set_id = choice_data[option_choice]['set_id'];
        Forms.Form.extra_choice.rank = choice_data[option_choice]['rank'];


        /*Popup.Show(700, 318, e1, null, null, null)*/
        option_choice++;

        Popup.Show(700, 518, e1, Business.SaveExtraChoice, null, null)


        /*    $.each(data,function(index,value)
                {
                    console.log(index);
                    console.log(value);
                });
        */

    },
    step_old1: function (d) {

        Forms.Clean("extra_details", "popupmainbuttonok");
        if (d) {
            Forms.Form.extra.type = "modify";
            Forms.Form.extra.id = d.id
        } else {
            d = new Object();
            Forms.Form.extra_details.type = "create";
            /*  if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
            }*/
        }
        Forms.Form.extra_details.extra_details = d;
        console.log(Forms.Form.extra_details);

        this.ActiveForm = "extra_details";
        var e1 = '<div class="titlebox nonselectable">';
        if (Forms.Form.extra_details.type == "create") {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_TITLE'] ?></span>'
        } else {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'
        }
        e1 += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        e1 += "</div>";
        e1 += '<div class="editform">';
        e1 += '<div class="leftcol">';
        var k=new Array();
        k.push({
            id: "0",
            caption: "Select Rank"
        });
        for(j=1;j<=rank;j++){
            k.push({
                id: j,
                caption: j
            })
        }
        for(var i=0;i< rank;i++){
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_NAME_FOR']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_name"+i, Main.NullToEmpty(d.name), true) + "</div></div>";
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_TEXT_TO_END']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_text_to_end_user"+i, Main.NullToEmpty(d.name), true) + "</div></div>";
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_CHOICE']?></span><div class="inputbox">' + Forms.CreateInputPropertyChoice("extra_details", "extra_num_choice"+i, Main.NullToEmpty(d.name), true) + "</div></div><br/></br>";
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_RANK_FOR']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_rank"+i,k,[], true) + "</div></div>";
        }
        e1 += "</div>";
        e1 += '<div class="rightcol">';
        e1 += "</div>";
        e1 += "</div>";
        /*Popup.Show(700, 318, e1, null, null, null)*/
        Popup.Show(700, 518, e1, Business.SaveExtraDetails, null, null)
    },
    EditExtra: function (h, l) {
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
        } if (i) {
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
                    k.ExtraForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
 GetOptionsVia: function (d,set_id) {
 Main.Loading();
  $.post("lib/business.php", "f=get_max_rank&data=" +JSON.stringify(set_id), function (a) {
     current_rank = JSON.parse(a);
     Business.GetOptions(d,set_id,current_rank);
    })
  },
    GetOptions: function (d,set_id,crank) {

        Main.Ready();
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
        console.log(Forms.Form.extra_details);

        this.ActiveForm = "extra_details";
        var e1 = '<div class="titlebox nonselectable">';
        if (Forms.Form.extra_details.type == "create") {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_TITLE'] ?></span>'
        } else {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'
        }
        e1 += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        e1 += "</div>";
        e1 += '<div class="editform">';
        e1 += '<div class="leftcol">';
        var conditional=new Array();
        conditional.push({
            id: "-1",
            caption: "Select Conditional"
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
                caption: "Select Rank"
            });
            for(j=1;j<=rank;j++){
                k.push({
                    id: j,
                    caption: j
                })
            }
            var i = document.getElementById("extra_rank");
            i.options.length = 0;

            for(j=0;j<=rank;j++){
               i.options[i.options.length] = new Option(k[j]['caption'],k[j]['id']);
            }


        });



/*



        ids=[{"id":''+id+'',"set_id":''+set_id+''}]
        $.post("lib/business.php", "f=choice_count&data=" +JSON.stringify(set_id), function (a) {
            data=JSON.parse(a);

            choice=data;

            max.push({
                id: 0,
                caption: "Max Selection"
            });


            for(j=1;j<=choice;j++){
                max.push({
                    id: j,
                    caption: j
               });
            }


            var i = document.getElementById("extra_max");
            i.options.length = 0;
            */
/*     i.options[i.options.length] = new Option("", "");*//*

            for(j=0;j<=choice;j++){
                i.options[i.options.length] = new Option(k[j]['caption'],max[j]['id'])
            }



        });
*/
  var max=new Array();
  var min=new Array();
    max.push({
            id: 0,
            caption: "Max Selection"
        });
        max.push({
            id: 1,
            caption:1
        });
        min.push({
            id: -1,
            caption: "Min Selection"
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

            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_NAME_FOR']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_name", Main.NullToEmpty(d.name), true) + "</div></div>";

            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_TEXT_TO_END']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_text_to_end_user", Main.NullToEmpty(d.name), true) + "</div></div>";
            e1 += '<div class="row" id='+choice_number+'><span class="caption" style="width: 200px !important;">Choice'+choice_number+'</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_name"+choice_number, Main.NullToEmpty(d.name), true)+'</div> <span style="font-size:12px">&nbsp;&nbsp;Price&nbsp;&nbsp;</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_price"+choice_number, Main.NullToEmpty(d.name), true,false,'',false,"return Main.IsNumberKey(event)") + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.add_input()">+</a></div></div><br/></br>';
            e1 +='<div  id="add"></div>'
            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_MIN_SELE']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_min_sel",min,[], true) + "</div></div>";
            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_MAX_SELE']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_max_sel",max,[], true) + "</div></div>";
            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_RANK_FOR']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_rank",k,[], true) + "</div></div>";


            if(crank == 0 || Main.NullToEmpty(crank) == "") {

            Forms.CreateValue("extra_details", "extra_conditional", "");
            Forms.UpdateValue("extra_details", "extra_conditional", "no");
            } else {
            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_CONDITIONAL']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_conditional",conditional,[], true,"Business.ConditionalSelected(this,"+set_id+")") + "</div></div>";
            }


            e1 += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_PIZZA']?></span><div class="inputbox">' +Forms.CreateCheckBoxProperty("extra_details", "extra_ingredients",H)+'</div></div>';
            e1 +='<div  id="add_conditions"></div>'
            e1 += "</div>";
            e1 += "</div>";

        choice_number_array.push(choice_number);



          Forms.Form.extra_details.set_id=set_id;

        Forms.Form.extra_details.choice_array = choice_number_array;
        Forms.Form.extra_details.choice_delete_array = choice_delete_array;


        Popup.ShowNew(700, "auto", e1, Business.Options, null, null);
          $("#popup").css('width','618');
        var  i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Min Selection', -1);
        for(j=0;j<=1;j++){
            i.options[i.options.length] = new Option(j,j);
        }



    },


    DeleteOptions: function (set_id,id) {
        ids=[{"id":''+id+'',"set_id":''+set_id+''}]
        $.post("lib/business.php", "f=DeleteOptions&data=" +JSON.stringify(ids), function (a) {
           Business.update_option_dropdown(set_id);
        });

    },
    EditOptionsVia: function (set_id,id) {
    Main.Loading();
      $.post("lib/business.php", "f=get_max_rank&data=" +JSON.stringify(set_id), function (a) {


                 Main.Ready();
                dataRank=JSON.parse(a);

                //Main.busirankData=dataRank;
               Business.EditOptions(set_id,id,dataRank)

          });

    },
    EditOptions: function (set_id,id,dataRank) {
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
            this.ActiveForm = "extra_details";


            e = '<div class="titlebox nonselectable">';
            e += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'
            e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
            e += "</div>";
            e += '<div class="editform">';
            e += '<div class="leftcol">';
            var conditional=new Array();
            conditional.push({
                id: "-1",
                caption: "Select Conditional"
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
                caption: "Select Rank"
            });
            for(var p=1;p<=dataRank;p++) {
                    k.push({
                        id: p,
                        caption: p
                    });
            }




            choice_number=0;
            choice_number_array=new Array();

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


            e += '<div class="row"><span class="caption" style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_NAME_FOR']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_name", Main.NullToEmpty(data[0]['option_name']), true) + "</div></div>";
            e += '<div class="row"><span class="caption"style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_TEXT_TO_END']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_text_to_end_user", Main.NullToEmpty(data[0]['option_text_to_end_user']), true) + "</div></div>";
            for(var i=0;i< data.length;i++){
                choice_number++;
              e += '<div class="row" id='+choice_number+'><span class="caption" style="width:200px; float:left;">Choice'+choice_number+'</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_update_name"+data[i]['id'], Main.NullToEmpty(data[i]['choice_name']), true)+'</div> <span style="font-size:12px">&nbsp;&nbsp;Price&nbsp;&nbsp;</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_price_update"+data[i]['id'], Main.NullToEmpty(data[i]['price']), true,false,'',false, "return Main.IsNumberKey(event)") + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.add_edit_input('+choice_number+')">+</a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.delete_edit_input('+choice_number+','+data[i]['id']+')">-</a></div></div><br/></br>';
                choice1++;
                choice_number_array.push(parseInt(data[i]['id']));
                console.log(choice_number_array);
              }
             var cr = "";

          if(data[0]['conditional'] == "no") {
          cr = 0;
          } else {
           cr = 1;
          }
        // alert(JSON.stringify(data))
            e +='<div  id="add"></div>'
           var tmp = data[0]['min_sel']
            e += '<div class="row"><span class="caption"style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_MIN_SELE']?>:</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_min_sel",min,data[0]['min_sel'],true) + "</div></div>";
            e += '<div class="row"><span class="caption"style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_MAX_SELE']?>:</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_max_sel",max,data[0]['max_sel'], true) + "</div></div>";

            e += '<div class="row"><span class="caption"style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_RANK_FOR']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_rank",k,data[0]['rank'], true) + "</div></div>";


         var withrespect = data[0]['with_respect_to'];
         //alert(data[0]['with_respect_to'])

         if(dataRank != "1") {
            e += '<div class="row"><span class="caption"style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_CONDITIONAL']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details","extra_conditional",conditional,cr,true,"Business.ConditionalSelected(this,"+set_id+","+id+")") + "</div></div>";
            }
            else {
            Forms.CreateValue("extra_details", "extra_conditional", "");
            Forms.UpdateValue("extra_details", "extra_conditional", "no");
            }


            e += '<div class="row"><span class="caption"style="width: 200px !important;"><?=$lang_resource['PRODUCT_OPOTIONS_PIZZA']?></span><div class="inputbox">' +Forms.CreateCheckBoxProperty("extra_details", "extra_ingredients",H,true)+'</div></div>';
            e += '<div  id="add_conditions"></div>'
            e += "</div>";

            e += "</div>";
            /*Popup.Show(700, 318, e, null, null, Business.PreEditExtra)*/
            Popup.Show(700, "auto", e, Business.ExtraEditOptions, null,null)


            ids_temp=[{"option_id":''+id+'',"set_id":''+set_id+''}]
            $.post("lib/business.php", "f=get_max_selection&data=" +JSON.stringify(ids_temp), function (a) {

                datac=JSON.parse(a);
     // alert(datac)
               // alert(data[0]['conditional'])
                if(data[0]['conditional'] == "yes") {
                if(Main.NullToEmpty(data[0]['with_respect_to']) =="") {
                 Business.ConditionalSelectedAttend2('1',set_id)
                 }
                 else {
                   Business.ConditionalSelectedAttend2('1',set_id,withrespect)
                 }
                // Business.PopulateChoicesAttend2(null,set_id)
                        }
                var i = document.getElementById("extra_max_sel");
                i.options.length = 0;
                i.options[i.options.length] = new Option("Max Selection", 0);

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
                i.options[i.options.length] = new Option("Min Selection", -1);
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
    ExtraEditOptions:function(){


        //alert(Forms.CanSave("extra_details"))
        if (Forms.CanSave("extra_details") == false) {

            return
        }


       // Forms.PrepareForSaving("extra_details");

        /*delete Forms.Form.extra_details.extra_details;*/
        Forms.Form.extra_details.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_details.fields, "extra_");

        Forms.Form.extra_details.num_choices = choice1;


        Forms.Form.extra_details.num_choices = choice1;
 //   alert(Forms.Form.extra_details.fields.conditional.value)
    /*if(Forms.Form.extra_details.fields.conditional.value == 1) {
  //  alert(Forms.Form.extra_details.fields.with_respect_to_option.value)

    if(Forms.Form.extra_details.fields.with_respect_to_choice.value == "") {
    delete Forms.Form.extra_details.fields.with_respect_to_choice;

    }


    }*/
    //alert(Forms.Form.extra_details.fields.with_respect_to_option.value)
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

       // alert(JSON.stringify(Forms.Form.extra_details))

        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        var e = true;
        Main.Loading();

        var d = new Date().getTime();
        Main.Aid = d;
        
         for(var t in Forms.Form.extra_details.fields){
                Forms.Form.extra_details.fields[t].ivalue = encodeURIComponent(Forms.Form.extra_details.fields[t].ivalue )
                Forms.Form.extra_details.fields[t].value = encodeURIComponent(Forms.Form.extra_details.fields[t].value )
                 }


        $.post("lib/business.php","f=EditExtraOptions&data=" + JSON.stringify(Forms.Form.extra_details), function (a) {



        Main.Ready();
            Business.update_option_dropdown(JSON.parse(a));
        });

        Popup.Close();
        Forms.Clean("extra_details")

    },

    ConditionalSelected: function (b,set_id,id) {


         if(b.options[b.selectedIndex].text=="Yes")
           {
               $("#add_conditions").append('<div class="options"> <div class="row"><span class="caption" style="width:200px">Option:</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_with_respect_to_option",[],[], false,"Business.PopulateChoices(null,this)") + "</div></div><div class='row'><span class='caption'  style='width:200px'>Choice:</span><div class='inputbox'>" + Forms.CreateSelectProperty('extra_details', "extra_with_respect_to_choice",[],[], false) + "</div></div></div>");
           }
        else
        {
            $(".options").remove();
        }
        if(id)
       Business.PopulateOptions(set_id,id);
       else
       Business.PopulateOptions(set_id);

 /*   Business.PopulateCitySelect(b.options[b.selectedIndex].value)*/
  },
  ConditionalSelectedAttend2: function (b,set_id,withrespect) {

     var array = [];
     array[0] = withrespect.split(",");



 $("#add_conditions").append('<div class="options"> <div class="row"><span class="caption" style="width:200px">Option:</span><div class="inputbox">'+Forms.CreateSelectProperty("extra_details","extra_with_respect_to_option",[],[],false,"Business.PopulateChoices(null,this)") + "</div></div><div class='row'><span class='caption' style='width:200px'>Choice:</span><div class='inputbox'>" + Forms.CreateSelectProperty('extra_details', "extra_with_respect_to_choice",[],[], false) + "</div></div></div>");
        // alert(array[0][0])
        //  alert(array[0][1])
      Business.PopulateOptions2(set_id,array[0][0],array[0][1]);

 /*   Business.PopulateCitySelect(b.options[b.selectedIndex].value)*/
  },
    PopulateChoices: function (d,op) {

    var option_id=op.options[op.selectedIndex].value;

        Main.Loading();

        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/business.php","f=GetOptionChoices&data="+option_id, function (b) {

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

 PopulateChoicesAttend2: function (d,op,chs) {

    var option_id=op;

        Main.Loading();

        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/business.php","f=GetOptionChoices&data="+option_id, function (b) {

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


    PopulateOptions: function (set_id,id) {
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
        var opid = Main.NullToEmpty(id);
        $.post("lib/business.php","f=GetOptions&data=" + set_id+"&option="+opid, function (b) {
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
                var a = 0;
                for (var j in c) {

                    i.options[i.options.length] = new Option(c[j]['option_name'], c[j]['option_id'])
                }

            }
        })
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


                       Business.PopulateChoicesAttend2(null,withrespect,withrespectchoice)
                      /* for (var p in c) {
                        if(c[p]['choice_id']==withrespectchoice) {
                            (k.options[k.options.length] = new Option(c[p]['choice_name'], c[p]['choice_id'])).setAttribute("selected","selected");

                             Forms.Form.extra_details.fields.with_respect_to_option = c[j]['option_id'];
                             Forms.Form.extra_details.fields.with_respect_to_choice = c[p]['choice_id'];

                        }else{k.options[k.options.length] = new Option(c[p]['choice_name'], c[p]['choice_id'])}
                      }     */

                    }else{i.options[i.options.length] = new Option(c[j]['option_name'], c[j]['option_id'])}
                }


            }
        })
    },
    add_edit_input:function(id){
        choice1++;
        choice_number++;
        choice_number_array.push(choice_number);
        console.log(choice_number_array);
        $("#add").append('<div class="row" id='+choice_number+'><span class="caption" style="width: 200px !important;">Choice'+choice_number+'</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_save_name"+choice_number, [], true)+'</div> <span style="font-size:12px"> &nbsp;&nbsp;Price&nbsp;&nbsp;</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_price_save"+choice_number,[], true,"return Main.IsNumberKey(event)") + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.add_edit_input('+choice_number+')">+</a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.delete_edit_input('+choice_number+','+choice_number+')">-</a></div></div><br/></br>');
       Forms.Form.extra_details.fields.extra_min_sel.value ="";
       Forms.Form.extra_details.fields.extra_max_sel.value ="";



        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Max Selection', 0);
        for(j=1;j<=choice1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Min Selection', -1);
        for(j=0;j<=choice1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        Forms.Form['extra_details'].fields['extra_min_sel'].value = ''
         Forms.Form['extra_details'].fields['extra_max_sel'].value = ''
        Forms.EnableSubmitButton(Forms.CanSave("extra_details"));


    },
    delete_input:function(id){
        choice1--;

        $("#"+id).remove();
        choice_number_array[id]=-1;

        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Max Selection', 0);
        for(j=1;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Min Selection', -1);
        for(j=0;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
         
         Forms.Form['extra_details'].fields['extra_price'+id].obligatory = false
         Forms.Form['extra_details'].fields['extra_choice_name'+id].obligatory = false

         Forms.Form['extra_details'].fields['extra_min_sel'].value = ''
         Forms.Form['extra_details'].fields['extra_max_sel'].value = ''         
        
         Forms.EnableSubmitButton(Forms.CanSave("extra_details"));

    },
    delete_edit_input:function(id,del_choice){
            var ask =  confirm("<?= $lang_resource['CONTROL_PANEL_ITEM_DELETE_CONFIRMATION'] ?>");

            if(ask == false) {
                return false;
            }

        choice1--;

        $("#"+id).remove();
        temp=choice_number_array.indexOf(del_choice);
            choice_number_array[temp]=-1;
        choice_delete_array.push(del_choice);
            console.log(choice_number_array);
        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Max Selection', 0);
        for(j=1;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Min Selection', -1);
        for(j=0;j<=choice1+1;j++){
            i.options[i.options.length] = new Option(j,j);
        }
        Main.Loading();
         $.post("lib/business.php","f=DeleteExtraOptionsDp&id=" +del_choice , function (a) {
      
          Main.Ready();
         
         });
         
         delete Forms.Form['extra_details'].fields['extra_choice_save_name'+del_choice];
         delete Forms.Form['extra_details'].fields['extra_price_save'+del_choice];
          
         

         Forms.Form['extra_details'].fields['extra_min_sel'].value = ''
         Forms.Form['extra_details'].fields['extra_max_sel'].value = ''         
        	
         Forms.EnableSubmitButton(Forms.CanSave("extra_details"));

         

    },

    add_input:function(){
        choice1++;
        choice_number++;
        choice_number_array.push(choice_number);

        $("#add").append('<div class="row" id='+choice_number+'><span class="caption" style="width: 200px !important;">Choice'+choice_number+'</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_choice_name"+choice_number, [], true)+'</div> <span style="font-size:12px">&nbsp;&nbsp;&nbsp;&nbsp;Price&nbsp;&nbsp;&nbsp;&nbsp;</span><div class="inputbox">' + Forms.CreateInputPropertyChoiceset("extra_details", "extra_price"+choice_number,[], true,"return Main.IsNumberKey(event)") + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.add_input()">+</a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="Business.delete_input('+choice_number+')">-</a></div></div><br/></br>');
        var max=new Array();
        var i = document.getElementById("extra_max_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Max Selection', 0);
        for(j=1;j<=choice1+1;j++){
                   i.options[i.options.length] = new Option(j,j);
        }
        i = document.getElementById("extra_min_sel");
        i.options.length = 0;
        i.options[i.options.length] = new Option('Min Selection', -1);
        for(j=0;j<=choice1+1;j++){
        i.options[i.options.length] = new Option(j,j);
        }

       Forms.Form['extra_details'].fields['extra_min_sel'].value = ''
         Forms.Form['extra_details'].fields['extra_max_sel'].value = ''
        Forms.EnableSubmitButton(Forms.CanSave("extra_details"));

    },
    Options: function (f) {


       /* if (Forms.CanSave("extra_details") == false) {


            return
        }
        Forms.PrepareForSaving("extra_details");

        Forms.Form.extra_details.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_details.fields, "extra_");
        Forms.Form.extra_details.num_choices = choice1;
        console.log( Forms.Form.extra_details.fields);
        console.log( Forms.Form.extra_details);*/
          /*delete Forms.Form.extra_details.extra_details;*/
        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        var a= '';
        var es = Forms.Form.extra_details.set_id;
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
        
          for(var t in Forms.Form.extra_details.fields){
              
                Forms.Form.extra_details.fields[t].value = encodeURIComponent(Forms.Form.extra_details.fields[t].value )
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

            Business.update_option_dropdown(es);


        });
        Popup.Close();
        Forms.Clean("extra_details")
    },


    RankSelected: function (b) {
        Business.PopulateRanks(b.options[b.selectedIndex].value)
    },
    PopulateRanks: function (f, d) {
        console.log('populate');
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
                var i = document.getElementById("extra_rank"+i);
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j=0;j< rank;j++) {

                    i.options[i.options.length] = j;

                }

                    if (Forms.CanSave("business")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }


    },
    PreEditExtraDetails:function(){
        Uploader.Init("extra", "extraform", "popupmainbuttonok", true,  Business.SaveExtra, null, null, "popup");
        $("#extra_name").focus()
    },


    SaveExtraChoice:function (f) {

    if (Forms.CanSave("extra_choice") == false) {


            return
        }


        Forms.PrepareForSaving("extra_choice");
        /*delete Forms.Form.extra_details.extra_details;*/
        Forms.Form.extra_choice.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_choice.fields, "extra_");
        console.log("fomrss ok done");
        console.log( Forms.Form.extra_choice.fields);


        p=0;
       $.each(Forms.Form.extra_choice.fields,function(index,value)
        {

            if(index.indexOf('name')>-1){

            if(value['value'] != "null")
              {
                  /*console.log("hi");*/
                  console.log(value['value']);
                  old_gaint_choice_array[p++]=value['value'];
                   gaint_choice_array[choice_count]= value['value'];
                    choice_count++;
              }

            }


            /*gaint_choice_array.push({
                id: choice_count,
                caption: value['value']
            })*/


        });
        p=0;
        $.each(gaint_choice_array,function(index,value)
            {
               if(old_gaint_choice_array.indexOf(value)== -1)
                {
                 new_gaint_array[p++]=value;
                }
            });

        Forms.Form.extra_choice.chooice_array = new_gaint_array;

        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
       $.post("lib/business.php","f=SaveExtraChoice&data=" + JSON.stringify(Forms.Form.extra_choice), function (a) {
            if (d != Main.Aid) {
                return
            }
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
                if(option_choice < total_options)
                {

                        Business.step2();



                }
            else
             {
option_choice = 0;
 total_options=0;
 choice_data=null;
 choice=null;
  gaint_choice_array=new Array();
  old_gaint_choice_array=new Array();
      flag=0;
    choice_count=0;
}
            // Business.GetExtras(null, true)
           /* $.post("lib/business.php","f=GetChoice", function (a) {


                Business.step2(a);
            });*/

        });
        Popup.Close();
        Forms.Clean("extra_choice")
    },
    SaveExtraDetails: function (f) {

        if (Forms.CanSave("extra_details") == false) {

            return
        }
        Forms.PrepareForSaving("extra_details");
        /*delete Forms.Form.extra_details.extra_details;*/
        Forms.Form.extra.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_details.fields, "extra_");
        console.log( Forms.Form.extra_details.fields);
        console.log( Forms.Form.extra_details);
        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
        $.post("lib/business.php","f=SaveExtraDetails&data=" + JSON.stringify(Forms.Form.extra_details), function (a) {
            if (d != Main.Aid) {
                return
            }
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
                $.post("lib/business.php","f=GetChoice", function (a) {


                              Business.step2(a);
                });

        });
        Popup.Close();
        Forms.Clean("extra_details")
    }
     <!--%PRODUCT OPTION FUNCTION%-->

};
