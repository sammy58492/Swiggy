document.write("<?php session_start(); require_once('../login/common.php'); require_authentication(1); ?>");
var Users = {
    Main: function () {
        Users.namelang = Array();
        Users.lastnamelang = Array();
        Users.lastnametwolang = Array();
        Users.addresslang = Array();
        Users.joblang = Array();
        
        Main.Loading();
        var b = this;
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllUsersData"}]', function (c) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                Main.Users = JSON.parse(c).users;
                b.PrintMain()
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function () {
        //alert(Main.User.level)       
        var c = "";
        c +='<div class="row">'
        c +='<div class="top-bar">'
        c +='<div class=" col-md-6 col-md-offset-6">'
        c +='<div class=" pull-right">'
        c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
        c +='</div>'
        <!--col-md-5-->
        c +='</div>'
        <!--top-bar-->
        c +='</div>'
        <!--row-->
        
        c +='<div class="panel panel-danger panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-3">'
        c +='<h3 class="panel-title-2"><?= $lang_resource['CONTROL_PANEL_MENU_USER'] ?></h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn filtr_margin">'
        c +='<input type="text" id="search" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->
        c +='<div class="col-md-6">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="inline-popups ">'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Users.Export(1)"><i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?></button>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.New(3)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.Edit(3)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Users.Delete(1)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'client\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')"><?=$lang_resource['ORDER_DETAILS_BUYER_EMAIL']?></th>'
        c +='<th width="20%">Enable</th>'
        c +='</tr>'
        c +='</thead>'
        c +='<tbody id="client_users">'
        c +='</tbody>'
        c +='</table>'
        c +='</div>'
        <!--table-responsive-->
        c +='</div>'
        <!-- /.panel-body -->
        c +='</div>'
        
        
        //alert(Main.User.level)
        if(Main.User.level<2)
        {    
        c +='<div class="panel panel-warning panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        
        c +='<div class="col-md-3">'
        c +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_USER_BUSINESS']?></h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        }
        if(Main.User.level <2)
         { 
        c +='<div class="panel-btn filtr_margin">'
         
            c +='<input type="text" id="b_search" class="form-control rounded panel-yellow-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
         }
         else
         {
            c +='<input type="text" id="b_search" style="display:none" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
         }
     if(Main.User.level <2)
     { 
        c +='</div>'

        c +='</div>'
        <!--col-md-3-->
        
        c +='<div class="col-md-6">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="">'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Users.Export(2)" data-effect="mfp-zoom-in"><i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Users.New(2)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Users.Edit(2)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Users.Delete(2)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'businessowner\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')"><?=$lang_resource['ORDER_DETAILS_BUYER_EMAIL']?></th>'
        c +='<th width="20%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_ENABLE']?></th>'
        c +='</tr>'
        c +='</thead>'
    }
        c +='<tbody id="business_users">'
      if(Main.User.level<2)  
      {
        c +='</tbody>'
        c +='</table>'
        c +='</div>'
        <!--table-responsive-->
        c +='</div>'
        <!-- /.panel-body -->
        c +='</div>'
    }
    



        if(Main.User.level < 2){
         if(Main.User.level<1)
        {   
        c +='<div class="panel panel-success panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-3">'
        c +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_USER_CITY_ADMINISTRATORS']?></h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn filtr_margin">'

        
            c +='<input type="text" id="c_search" class="form-control rounded panel-green-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        }
        else
           {
            c +='<input type="text" id="c_search" style="display:none" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
           } 
        //alert(Main.User.level)
        if(Main.User.level<1)
        {   
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->
        
        c +='<div class="col-md-6">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="">'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Users.Export(3)" data-effect="mfp-zoom-in" ><i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Users.New(1)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Users.Edit(1)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c +='</span> '
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Users.Delete(3)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'cityadmin\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')"><?=$lang_resource['ORDER_DETAILS_BUYER_EMAIL']?></th>'
        c +='<th width="20%">Enable</th>'
        c +='</tr>'
        c +='</thead>'
        c +='<tbody id="city_users">'
        c +='</tbody>'
        c +='</table>'
        c +='</div>'
        <!--table-responsive-->
        c +='</div>'
        <!-- /.panel-body -->
        c +='</div>'
            }
        }
        
        if(Main.User.level == 0){
        c +='<div class="panel panel-danger panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-3">'
        c +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_USER_SUPER_ADMINISTRATORS']?></h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn filtr_margin">'
        c +='<input type="text" id="s_search" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->
        c +='<div class="col-md-6">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="">'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.Export(0)" data-effect="mfp-zoom-in" ><i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.New(5)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.Edit(0)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c +='</span> '
        /*c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Users.Delete(0)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'*/
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'superadmin\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')"><?=$lang_resource['ORDER_DETAILS_BUYER_EMAIL']?></th>'
        c +='<th width="20%">Enable</th>'
        c +='</tr>'
        c +='</thead>'
        c +='<tbody id="super_users">'
        c +='</tbody>'
        c +='</table>'
        c +='</div>'
        <!--table-responsive-->
        c +='</div>'
        <!-- /.panel-body -->
        c +='</div>'
        }
        
        c += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        c += '<input type="hidden" name="f" value="ExportUser"/>';
        c += '<input id="exp_data" type="hidden" name="data" value=""/>';
        c += '<input type="hidden" name="name" value="users"/>';
        c += "</form>"
        
       
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        
        document.getElementById("b_search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        if(Main.User.level < 2){
        document.getElementById("c_search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        }
        if(Main.User.level ==0){
        document.getElementById("s_search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        }
        Users.PupulateTable(Main.Config.Users.List.SortBy, true)
    },
    PupulateTable: function (b, c) {
    //alert(Main.User.level)
        var d = "";
        var bo = "";
        var ca = "";
        var su = "";
        var a = Main.Users.length;
        if (c) {
            Main.Users.sort(Main.SortByProperty(b));
            if (Main.Config.Users.List.SortByStatus == "max") {
                Main.Users.reverse()
            }
        } else {
            if (Main.Config.Users.List.SortBy != b) {
                Main.Users.sort(Main.SortByProperty(b));
                Main.Config.Users.List.SortByStatus = "min"
            } else {
                Main.Users.reverse();
                if (Main.Config.Users.List.SortByStatus == "min") {
                    Main.Config.Users.List.SortByStatus = "max"
                } else {
                    Main.Config.Users.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Users.List.SortBy = b;
        if (!c) {
            Main.SaveConfig()
        }
        var uh = false;
        var bh = false;
        var ch = false;
        var f = "";
        var us = "";
        var bs = "";
        var cs = "";
        var k = new Array();
        for (var e in Main.Users) { 

            uh = false;
            bh = false;
            ch = false;
            sh = false;

            us = document.getElementById("search").value.toLowerCase();  
                  
            if (String(Main.Users[e].id).toLowerCase().indexOf(us) >= 0 || String(Main.Users[e].name).toLowerCase().indexOf(us) >= 0 || String(Main.Users[e].email).toLowerCase().indexOf(us) >= 0) {
                if(Main.Users[e].level==3){
                    uh = true;                    
                    k.push(Main.Users[e])
                }
            } 
            bs = document.getElementById("b_search").value.toLowerCase();
            if (String(Main.Users[e].id).toLowerCase().indexOf(bs) >= 0 || String(Main.Users[e].name).toLowerCase().indexOf(bs) >= 0 || String(Main.Users[e].email).toLowerCase().indexOf(bs) >= 0) {
                if(Main.Users[e].level==2){
                    bh = true;                    
                    k.push(Main.Users[e])
                }
            } 
            
            if(Main.User.level<1)
            {
            ss = document.getElementById("s_search").value.toLowerCase();
            if (String(Main.Users[e].id).toLowerCase().indexOf(ss) >= 0 || String(Main.Users[e].name).toLowerCase().indexOf(ss) >= 0 || String(Main.Users[e].email).toLowerCase().indexOf(ss) >= 0) {
                if(Main.Users[e].level==0){
                    sh = true;                    
                    k.push(Main.Users[e])
                }
            } 
        }
            
            if(Main.User.level < 2){
            cs = document.getElementById("c_search").value.toLowerCase();
            if (String(Main.Users[e].id).toLowerCase().indexOf(cs) >= 0 || String(Main.Users[e].name).toLowerCase().indexOf(cs) >= 0 || String(Main.Users[e].email).toLowerCase().indexOf(cs) >= 0) {
                if(Main.Users[e].level==1){
                    ch = true;                    
                    k.push(Main.Users[e])
                }
                
            } 
            }
            if (uh) {
                if(Main.Users[e].level ==3){            
                    <!--Client-->            
                    d +='<tr>'
                    d +='<td class="hand" onclick="Users.Edit(3,' + Main.Users[e].id + ')">' + Main.Users[e].id + '</td>'
                    d +='<td><input type="checkbox" class="checkbox client" value="' + Main.Users[e].id + '"></td>'
                    d +='<td class="hand" onclick="Users.Edit(3,' + Main.Users[e].id + ')">' + Main.Users[e].name + " " + Main.NullToEmpty(Main.Users[e].lastname) + " " + Main.NullToEmpty(Main.Users[e].lastname2) +'</td>'
                    d +='<td class="hand" onclick="Users.Edit(3,' + Main.Users[e].id + ')">' + Main.Users[e].email +'</td>'
                    d +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                    d +='</tr>'
                    <!--Client--> 
                }
            }
            if (bh) {    
                if(Main.Users[e].level ==2){   
               
                <!--Business Owner-->            
                bo +='<tr>'
                bo +='<td class="hand" onclick="Users.Edit(2,' + Main.Users[e].id + ')">' + Main.Users[e].id + '</td>'
                bo +='<td><input type="checkbox" class="checkbox businessowner" value="' + Main.Users[e].id + '"></td>'
                bo +='<td class="hand" onclick="Users.Edit(2,' + Main.Users[e].id + ')">' + Main.Users[e].name + " " + Main.NullToEmpty(Main.Users[e].lastname) + " " + Main.NullToEmpty(Main.Users[e].lastname2) +'</td>'
                bo +='<td class="hand" onclick="Users.Edit(2,' + Main.Users[e].id + ')">' + Main.Users[e].email +'</td>'
                bo +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                bo +='</tr>'
                <!--Business Owner-->   
                }
            }
            if(Main.User.level<2)
            {
            if (sh) {
                if(Main.Users[e].level ==0){
                    <!--Super Admin-->            
                    su +='<tr>'
                    su +='<td class="hand" onclick="Users.Edit(0,' + Main.Users[e].id + ')">' + Main.Users[e].id + '</td>'
                    su +='<td><input type="checkbox" class="checkbox superadmin" value="' + Main.Users[e].id + '"></td>'
                    su +='<td class="hand" onclick="Users.Edit(0,' + Main.Users[e].id + ')">' + Main.Users[e].name + " " + Main.NullToEmpty(Main.Users[e].lastname) + " " + Main.NullToEmpty(Main.Users[e].lastname2) +'</td>'
                    su +='<td class="hand" onclick="Users.Edit(0,' + Main.Users[e].id + ')">' + Main.Users[e].email +'</td>'
                    su +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                    su +='</tr>'
                    <!--Super Admin-->  
                }          
                
            }
        }

            if(Main.User.level < 1){
                
            if (ch) {
                if(Main.Users[e].level ==1){
                    <!--City Admin-->            
                    ca +='<tr>'
                    ca +='<td class="hand" onclick="Users.Edit(1,' + Main.Users[e].id + ')">' + Main.Users[e].id + '</td>'
                    ca +='<td><input type="checkbox" class="checkbox cityadmin" value="' + Main.Users[e].id + '"></td>'
                    ca +='<td class="hand" onclick="Users.Edit(1,' + Main.Users[e].id + ')">' + Main.Users[e].name + " " + Main.NullToEmpty(Main.Users[e].lastname) + " " + Main.NullToEmpty(Main.Users[e].lastname2) +'</td>'
                    ca +='<td class="hand" onclick="Users.Edit(1,' + Main.Users[e].id + ')">' + Main.Users[e].email +'</td>'
                    ca +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                    ca +='</tr>'
                    <!--City Admin-->  
                }          
                
            }
        
            }
        }
        document.getElementById("client_users").innerHTML = d;
        if(Main.User.level<2)
        document.getElementById("business_users").innerHTML = bo;
        if(Main.User.level < 1){
        document.getElementById("city_users").innerHTML = ca;
         document.getElementById("super_users").innerHTML = su;
        }
        var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != Main.User.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switch_" + k[e].id, g);
                Switch.OnChange("switch_" + k[e].id, function (m, l) {
                    Users.SetEnabled(m.replace("switch_", ""), l)
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
        $.post("lib/users.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, a)
            }
        })
    },
    Edit: function (val,a) {
    Main.userlevel= val;
    if(val == 3){var classname ='client'}else if(val == 2){var classname = 'businessowner'}else if(val == 1){var classname ='cityadmin'}else if(val == 0){var classname ='superadmin'}
        var e = false;
         if (a) {
            e = true;
            
        }else{
            var d = Main.GetMarkedCheckBoxesValuesByClass(classname);
            if (d.length == 1) {
                a = d[0];
                e = true
            }else if(d.length > 1){
                alert("<?=$lang_resource['CITY_SUPER_CHECBOX_SELECT_ONE']?>");
                return
            }else{
                alert("<?=$lang_resource['CITY_SUPER_CHECBOX_SELECT_EDIT']?>");
                return
            }
            Visuals.ForceMainButtonCancelEvent = null;
            Users.ForceMainButtonEvent = null
        }
        if (e) {
            var c = this;
            Main.Loading();
            //alert(a);
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserData","id":"' + a + '"}]', "Users.PreEdit")
        }
    },
    PreEdit: function (a) {
        //alert(a);
    $('div[id*=newpopup]').remove();
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Franchises = a.franchises;
        Main.Countries = a.countries;
        this.Form(a.user)
    },
    New: function (val) {
    if(val==5){val = '0'};
        Main.userlevel= val;
    
        Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "Users.PreNew")
    },
    PreNew: function (a) {
        $('div[id*=newpopup]').remove();
        
        if (a == "") {
            alert("Error")
        }
        Main.Countries = JSON.parse(a).countries;
        this.Form()
    },
    
    jsFunctioncountry:function(value)
{
    //alert(value);
    document.getElementById("countryselect").value= value;
},

 jsFunctioncity:function(value)
{
    //alert(value);
    document.getElementById("cityselect").value= value;
},
    
    show_id: function(id){
        var b = document.getElementById("country").value;
        var c=document.getElementById("countryselect").value;
         $.post("lib/business.php", "f=FetchAllCountriesIDData&data=" + id, function (d) {      
            if (d != "") {
              var f = JSON.parse(d);
            
             var e = document.getElementById("country");
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
                    else
                    {
                        //alert(c)
                        if (f[d].id == c) {
                            h = d;
                            j = true
                        }
                    }
                    
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {               
                    e.selectedIndex = parseInt(h) + 1
                }else if(c && j){
                    e.selectedIndex = parseInt(h) + 1
                } 
                else {
                    Forms.Form.business.fields.country.value = "";                   
                }
                
                
             }
        });
        var v = document.getElementById("city").value;
        var o = document.getElementById("cityselect").value;
         $.post("lib/business.php", "f=FetchAllCityIDData&data=" + id+"&countryid="+c, function (g) {       
            if (g != "") {
              var m = JSON.parse(g);
            
             var e = document.getElementById("city");
             e.options.length = 0;
             e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
                
                for (var d in m) {
                    if (v) {
                        if (m[d].id == v) {
                            h = d;
                            j = true
                        }
                    }
                     else
                    {
                        if (m[d].id == o) {
                            h = d;
                            j = true
                        }
                    }
                    
                    e.options[e.options.length] = new Option(m[d].city, m[d].id)
                }
                
                if (v && j) {               
                    e.selectedIndex = parseInt(h) + 1
                } 
                else if(o && j){
                    e.selectedIndex = parseInt(h) + 1
                } 
                else {
                    Forms.Form.business.fields.city.value = "";                   
                }
                
                
             }
        });
        
        
        var r = document.getElementById("colony").value;
         $.post("lib/business.php", "f=FetchAllCountriesIDData&data=" + id, function (k) {      
            if (k != "") {
              var t = JSON.parse(k);
            
             var e = document.getElementById("colony");
             e.options.length = 0;
             e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
                
                for (var d in t) {
                    if (r) {
                        if (t[d].id == r) {
                            h = d;
                            j = true
                        }
                    }
                    
                    e.options[e.options.length] = new Option(t[d].name, t[d].id)
                }
                
                if (r && j) {               
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.business.fields.colony.value = "";                   
                }
                
                
             }
        });
        
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
            document.getElementById("lastname_"+flaginfo[Z].id).style.display  = "none";
            document.getElementById("lastname2_"+flaginfo[Z].id).style.display  = "none";
            document.getElementById("street_"+flaginfo[Z].id).style.display  = "none";
            document.getElementById("job_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
        document.getElementById("lastname_"+id).style.display  = "block";
        document.getElementById("lastname2_"+id).style.display  = "block";
        document.getElementById("street_"+id).style.display  = "block";
        document.getElementById("job_"+id).style.display  = "block";
        
    },
    
    
    Form: function (e) {
       
        var j = "";
        var g = false;
        
        Forms.Clean("user", "mainbuttonok");
       
        GoogleMap.Clean();
        if (e == null) {
            e = new Object();
            Forms.Form.user.type = "create";
            Forms.CreateValue("user", "config", "{}", false, false, true)
        } else {
            g = true;
            Forms.Form.user.type = "modify";
            Forms.Form.user.id = e.id
        }
        
        if (Forms.Form.user.type == "create") {
             j +='<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_CREATE_USER']?></h3>'
        } else {
             j +='<h3 class="popup-heading"><?=$lang_resource['CONTROL_PANEL_EDIT_USER']?></h3>'
        }
        var A ='';
        if (e.id) {
        if(e.isimg == 1) {
            A = "../panel/images/users/" + Main.NullToEmpty(e.id) + "/medium.jpg?c=" + new Date().getTime()
            }
            else  {
               A = "images/dummy/dummy_user.jpg";
            }
        }else  {
               A = "images/dummy/dummy_user.jpg";
        }
        //alert(JSON.stringify(e));
        
        j +='<div class="row">'
        j +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Users.langdefault = flaginfo[Z].admindefaulelang;                             
                j+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Users.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                j+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Users.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        j +='</ul>'
        j +='</div>'
        <!--row-->
        
        j +='<div class="row">' 
        j +='<div class="col-md-4">'
        j +='<div class="form-control user-img">'        
        j += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >';
        j += '<input id="uploadImage" type="file"  class="user_pic"  name="uploadImage" onChange="Users.PreviewImage();" >'
        j += '<input id="showImage" name="showImage" type="hidden" value=""  />';
        j += '<input type="submit" name="submit" onclick="Users.triggerImageupload()" style="display:none" />';
        j += '</form>';
        j +='<img id="uploadPreview" src="' + A + '" width="151" height="144" >'
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-8">'
        j +='<div class="form-control user-map smallmapbox" id="mapbox">'        
        j +='</div>'
        j +='</div>'
        <!--col-md-8-->
        j +='</div>'
        <!--row--> 
        j +='<input type="hidden" id="countryselect" value="'+e.country+'">'
        j +='<input type="hidden" id="cityselect" value="'+e.city+'">'
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_NAME']?> *</label>'
        Forms.CreateValue("user", "name", "",true)
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.user.type == "create") {
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
        //j +=Forms.CreateInputPropertyPopup("user", "name", e.name, true)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_LASTNAME']?> *</label>'
        
        Forms.CreateValue("user", "lastname", "",true)
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.user.type == "create") {
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }       
        
        //j +=Forms.CreateInputPropertyPopup("user", "lastname", e.lastname, true)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_LASTNAME_TWO']?></label>'
        Forms.CreateValue("user", "lastname2", "",true)
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.user.type == "create") {
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="lastname2_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    j +='<input type="text" id="lastname2_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="lastname2_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname2[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="lastname2_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname2[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
        //j +=Forms.CreateInputPropertyPopup("user", "lastname2", e.lastname2, false)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row-->  
        
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_EMAIL']?> *</label>'
        j +=Forms.CreateInputPropertyPopup("user", "email", e.email, true)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_DRIVER_PASSWORD']?> *</label>'
        if (g) {
        j +=Forms.CreateInputPropertyPopup("user", "pwd", e.pwd, false, "", false, true)
        }else {
        j +=Forms.CreateInputPropertyPopup("user", "pwd", e.pwd, true,"", false, true)
        }
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_ADDRESS']?> *</label>'
        Forms.CreateValue("user", "street", "",true)
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.user.type == "create") {
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="street_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);"  value="" />' 
                }else{
                    j +='<input type="text" id="street_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);" value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="street_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);" value="'+Main.NullToEmpty(e.street[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="street_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);" value="'+Main.NullToEmpty(e.street[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
        //j +=Forms.CreateInputPropertyPopup("user", "street", e.street, true, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row--> 
        
   /*     j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Neighborhood</label>'
        j +=Forms.CreateInputPropertyPopup("user", "colony", e.colony, false, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'*/
         j +='<div class="row">'
         
           <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_ZIPCODE']?></label>'
        j +=Forms.CreateInputPropertyPopup("user", "cp", e.cp, false)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        
         var c = new Array();
        c.push({
            id: "",
            caption: ""
        });
        for (i in Main.Countries) {
            c.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }
        c.sort(Main.SortByProperty("caption"));
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_COUNTRY']?></label>'
        j +=Forms.CreateSelectPropertyPopup("user", "country", c, Main.NullToEmpty(e.country), true, "Users.CountrySelected(this);GoogleMap.UpdateUserPosition(this);Users.jsFunctioncountry(this.value);")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
         
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_CITY']?></label>'
        if(Main.neighsettings == 't'){
        j +=Forms.CreateSelectPropertyPopup("user", "city", [], Main.NullToEmpty(e.city), true, "Users.CitySelected(this);GoogleMap.UpdateUserPosition(this);Users.jsFunctioncity(this.value);")
        }else{
        j +=Forms.CreateSelectPropertyPopup("user", "city", [], Main.NullToEmpty(e.city), true, "GoogleMap.UpdateUserPosition(this);Users.jsFunctioncity(this.value);")    
        }
        j +='</div>'
        j +='</div>'
      
       
        j +='</div>'
        <!--row--> 
        
        j +='<div class="row">'
        if(Main.neighsettings == 't'){
        <!--col-md-4-->        
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_NEIGHBORHOOD']?> </label>'
        j +=Forms.CreateSelectPropertyPopup("user", "colony", [], Main.NullToEmpty(e.colony), false, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'
        }else{
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_NEIGHBORHOOD']?></label>'
        j +=Forms.CreateInputPropertyPopup("user", "colony", e.colony, false, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'  
        j +='</div>' 
        }
        
        
        
        
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUSINESS_PHONE']?></label>'
        j +=Forms.CreateInputPropertyPopup("user", "tel", e.tel, false, "", "", "", "return Users.IsNumberKey_new(event)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_DRIVER_MOBILE']?></label>'
        j +=Forms.CreateInputPropertyPopup("user", "cel", e.cel, false, "", "", "", "return Users.IsNumberKey_new(event)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row--> 
        j +='<div class="row">'
        j +='<div class="col-md-12">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_USER_OCUPATION']?></label>'
        
        Forms.CreateValue("user", "job", "",true)
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.user.type == "create") {
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="job_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    j +='<input type="text" id="job_'+flaginfo[p].id+'" class="form-control" value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Users.langdefault){   
                    j +='<input type="text" id="job_'+flaginfo[p].id+'" class="form-control" value="'+Main.NullToEmpty(e.job[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="job_'+flaginfo[p].id+'" class="form-control" value="'+Main.NullToEmpty(e.job[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
        
        //j +=Forms.CreateInputPropertyPopup("user", "job", e.job, false)
        j +='</div>'
        j +='</div>'
       
        if (e.id == Main.User.id) {
            Forms.CreateValue("user", "level", "null")
        } else {
            var d = "";
            var a;
            if (g) {
                a = ""
            } else {
                a = '{"id":"","caption":""},'
            }
            switch (Main.User.level) {
            case "0":
                d = "[" + a + '{"id":"1","caption":"Administrator"},{"id":"2","caption":"Business owner"},{"id":"3","caption":"Client"}]';
                break;
            case "1":
                d = "[" + a + '{"id":"2","caption":"Business owner"},{"id":"3","caption":"Client"}]';
                break
            case "2":
                d = "[" + a + '{"id":"3","caption":"Client"}]';
                break
            }
            
            d = JSON.parse(d);
            //j +=Forms.CreateSelectPropertyPopup("user", "level", d, e.level, false, "", true)
        }
        
        j +='</div>'
        <!--row--> 
        
        j +='<div class="row">'
        j +='<div class="col-md-6 col-md-offset-3">'
         if (Forms.Form.user.type == "create") {
             j +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Users.TryToStartSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button></center>'
        } else {
             j +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Users.TryToStartSave('+e.id+')"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE']?></button></center>'
        }
        
        j +='</div>'
        <!--col-md--->
        j +='</div>'
        <!--row-->
        
         Popup.Show(j);
        
        Forms.CreateValue("user", "location", e.location);
        var f;
        if (e.location == "" || e.location == null) {
            f = new Object();
            f.latitud = lat1;
            f.longitud = long1;
            f.zoom = 4
        } else {
            f = JSON.parse(e.location)
        }
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, Users.LocationUpdated);
        //alert(JSON.stringify(e));
        if (g) {
            Users.PopulateCitySelect(e.country, e.city)
            Users.PopulateNeighborhoodSelect(e.city,e.colony)
        }
        $("#name").focus()
    },
    
    IsNumberKey_new: function (b) {
        
    var a = (b.which) ? b.which : event.keyCode;
    if (a != 46 && a > 31 && (a < 48 || a > 57)) {
    return false;
    }
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
               //alert(html)
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
            
        };
        
    },
/*******************start Neighborhood select**************/    
 CitySelected: function (a) {

        
        Users.PopulateNeighborhoodSelect(a.options[a.selectedIndex].value)
    },
PopulateNeighborhoodSelect: function (c, b) {
//alert(b);
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllNeighborhoodData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
            //alert(g);
            if (a != Main.Aid) {
                //return
            }
            Main.Ready();
            if (g != "") {
                var f = JSON.parse(g).colony;
                //alert(JSON.stringify(f));
                var e = document.getElementById("colony");
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
                    //alert(JSON.stringify(f[d]));
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                //alert(e.options[e.options.length]);
                //alert(b);alert(j);
                if (b && j) {
                    
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.user.fields.colony.value = "";
                   
                }
            }
        })
    
    
},

/**********end Neighborhood select**************/
    CountrySelected: function (a) {
        
        Users.PopulateCitySelect(a.options[a.selectedIndex].value)
        
    },
    PopulateCitySelect: function (c, b) {
    //alert(b);
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
            
            if (a != Main.Aid) {
                
               // return
            }
            Main.Ready();
            if (g != "") {
              var f = JSON.parse(g).franchises;
            // var f = g;
               f.sort(Main.SortByProperty("city"));
                
                var e = document.getElementById("city");
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
                    
                    e.options[e.options.length] = new Option(f[d].city, f[d].id)
                }
            //alert(b);alert(j);
                if (b && j) {
                
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.user.fields.city.value = "";
                   
                }
            }
        })
    },
    LocationUpdated: function (a) {
        Forms.UpdateValue("user", "location", JSON.stringify(a), true);
    },
    
    Prevalidation: function(){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){            
        
            var namedata = document.getElementById("name_"+flaginfo[Z].id).value;
            Users.namelang[flaginfo[Z].id] = namedata;
            
            var lastnamedata = document.getElementById("lastname_"+flaginfo[Z].id).value;
            Users.lastnamelang[flaginfo[Z].id] = lastnamedata;
            
            var lastname2data = document.getElementById("lastname2_"+flaginfo[Z].id).value;
            Users.lastnametwolang[flaginfo[Z].id] = lastname2data;
            
            var addressdata = document.getElementById("street_"+flaginfo[Z].id).value;
            Users.addresslang[flaginfo[Z].id] = addressdata.split(",").join("***");
            
            var jobdata = document.getElementById("job_"+flaginfo[Z].id).value;
            Users.joblang[flaginfo[Z].id] = jobdata;
    }
        
    },
    
    TryToStartSave: function (a) {  
        
        
        var c = document.getElementById("email");
        var d = c.value;
         Forms.CreateValue("user", "level", Main.userlevel, false, true, true);
         
        if (Main.IsEmail(d)) {
            var b = new Date().getTime();
            Main.Aid = b;
            Main.Loading();
            if (a) {
                a = "&id=" + a
            } else {
                a = ""
            }
            $.post("lib/users.php", "f=GetEmailAvailability&email=" + d + a, function (e) {
                
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e == "ok") {
                    Users.Save()
                } else {
                    alert("Email address already registered")
                }
            })
        } else {
            alert("Valid email please")
        }
    },
    Save: function () {
        
        Users.Prevalidation();
        
        Forms.UpdateValue("user", "name", Users.namelang,true); 
        Forms.UpdateValue("user", "lastname", Users.lastnamelang,true); 
        Forms.UpdateValue("user", "lastname2", Users.lastnametwolang,true);
        Forms.UpdateValue("user", "street", Users.addresslang,true); 
        Forms.UpdateValue("user", "job", Users.joblang,true); 
        
        
        if(document.getElementById("showImage").value !="") {           
        Forms.Form.user.image = document.getElementById("showImage").value;
    }
    
        for(var s in Forms.Form.user.fields){           
            Forms.Form.user.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.user.fields[s].value)))
            Forms.Form.user.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.user.fields[s].ivalue)))
            
            Forms.Form.user.fields[s].value = Forms.Form.user.fields[s].value.split("+").join("@@");
            Forms.Form.user.fields[s].ivalue = Forms.Form.user.fields[s].ivalue.split("+").join("@@");
        }    

    
       
        if (Users.ForceMainButtonEvent) {
         
            Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), Users.ForceMainButtonEvent)
            Popup.Close();
        } else {
               //alert(JSON.stringify(Forms.Form.user))
            Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), "Users.Main()")
             Popup.Close();
        }
       
        Forms.Clean("user");
        GoogleMap.Clean()
    },
    Export: function (val) {
   
    if(val == 1){var classname ='client'}else if(val == 2){var classname = 'businessowner'}else if(val == 3){var classname ='cityadmin'}else if(val == 0){var classname ='superadmin'}

        var b = Main.GetMarkedCheckBoxesValuesByClass(classname);
        if (b.length == 0) {
			alert("<?=$lang_resource['SELECT_EXPORT1']?>");
            return
        }
        var a = new Object();
        a.ids = b;
       
        document.getElementById("exp_data").value = JSON.stringify(a);
        
        document.getElementById("exp_form").submit()
    },
    Delete: function (val) {
    
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
      alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
    
    $.fn.jAlert({
      'message': '<?=$lang_resource['USERS_DELETE_MSG']?>',
      'btn': [
        {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
          $.post("lib/users.php", "f=DeleteUser&data=" + JSON.stringify(a),  function (c) {
            alert('<?=$lang_resource['BUSINESSREVIEW_DELETE_SUCCESS']?>');
            Users.Main()
          
          });
        } },
        {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
      ],
      'closeBtn': false
      
      });
    }
};
