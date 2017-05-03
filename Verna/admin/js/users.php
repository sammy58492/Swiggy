<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var Users = {
    Main: function () {
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
                
        var c = "";
        c +='<div class="row">'
        c +='<div class="top-bar">'
        c +='<div class=" col-md-6 col-md-offset-6">'
        c +='<div class=" pull-right">'
        c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Orders.Main()"><i class="fa icon-close"></i></button></div>'
        c +='</div>'
        <!--col-md-5-->
        c +='</div>'
        <!--top-bar-->
        c +='</div>'
        <!--row-->
        
        c +='<div class="panel panel-danger panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-5">'
        c +='<h3 class="panel-title-2">Users</h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn">'
        c +='<input type="text" id="search" class="form-control rounded panel-red-field white-placeholder" placeholder="Filter">'
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->
        c +='<div class="col-md-4">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="inline-popups ">'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Users.Export(1)"><i class="fa icon-export"></i> Export</button>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.New(3)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> Add</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Users.Edit(3)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> Edit</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Users.Delete(1)"><i class="fa icon-remove2"></i> Delete</button></span>'
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')">ID</th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'client\')">All</th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')">Name</th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')">Email</th>'
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
        
        
        
        c +='<div class="panel panel-warning panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-5">'
        c +='<h3 class="panel-title-2">Business owners</h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn">'
        c +='<input type="text" id="b_search" class="form-control rounded panel-yellow-field white-placeholder" placeholder="Filter">'
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->
        
        c +='<div class="col-md-4">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="">'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Users.Export(2)" data-effect="mfp-zoom-in"><i class="fa icon-export"></i> Export</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Users.New(2)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> Add</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Users.Edit(2)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> Edit</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Users.Delete(2)"><i class="fa icon-remove2"></i> Delete</button></span>'
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')">ID</th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'businessowner\')">All</th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')">Name</th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')">Email</th>'
        c +='<th width="20%">Enable</th>'
        c +='</tr>'
        c +='</thead>'
        c +='<tbody id="business_users">'
        c +='</tbody>'
        c +='</table>'
        c +='</div>'
        <!--table-responsive-->
        c +='</div>'
        <!-- /.panel-body -->
        c +='</div>'
        
        c +='<div class="panel panel-success panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-5">'
        c +='<h3 class="panel-title-2">City administrators</h3>'
        c +='</div>'
        <!--col-md-5-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn">'
        c +='<input type="text" id="c_search" class="form-control rounded panel-green-field white-placeholder" placeholder="Filter">'
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->
        c +='<div class="col-md-4">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="">'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Users.Export(3)" data-effect="mfp-zoom-in" ><i class="fa icon-export"></i> Export</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Users.New(1)" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> Add</a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Users.Edit(1)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> Edit</a>'
        c +='</span> '
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Users.Delete(3)"><i class="fa icon-remove2"></i> Delete</button></span>'
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
        c +='<th width="10%" onclick="Users.PupulateTable(\'id\')">ID</th>'
        c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'cityadmin\')">All</th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'name\')">Name</th>'
        c +='<th width="25%" onclick="Users.PupulateTable(\'email\')">Email</th>'
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
        
        c += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        c += '<input type="hidden" name="f" value="ExportUser"/>';
        c += '<input id="exp_data" type="hidden" name="data" value=""/>';
        c += '<input type="hidden" name="name" value="users"/>';
        c += "</form>"
        
       
        document.getElementById("main").innerHTML = c;
        
        document.getElementById("b_search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        document.getElementById("c_search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        document.getElementById("search").onkeyup = function () {
       
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        Users.PupulateTable(Main.Config.Users.List.SortBy, true)
    },
    PupulateTable: function (b, c) {
    
        var d = "";
        var bo = "";
        var ca = "";
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
        var h = false;
        var f = "";
        var k = new Array();
        for (var e in Main.Users) {
            h = false;
            f = document.getElementById("search").value.toLowerCase();
            
           
            
            
            /*if (String(Main.Users[e].id).toLowerCase().indexOf(f) >= 0 || Main.Users[e].name.toLowerCase().indexOf(f) >= 0 || Main.Users[e].email.toLowerCase().indexOf(f) >= 0) {
                if((Main.Users[e].level!=4) && (Main.Users[e].level!=5))
                {
                 h = true;
                 k.push(Main.Users[e])
                }
            }*/
            
            
            
            if (h) {
            	
                if(document.getElementById("search").value !=""){
           			f = document.getElementById("search").value.toLowerCase();
           		}
                if (String(Main.Users[e].id).toLowerCase().indexOf(f) >= 0 || Main.Users[e].name.toLowerCase().indexOf(f) >= 0 || Main.Users[e].email.toLowerCase().indexOf(f) >= 0) {
                    if((Main.Users[e].level!=4) && (Main.Users[e].level!=5))
                    {
                     h = true;
                     k.push(Main.Users[e])
                    }
           		 }
            
            	if(Main.Users[e].level ==3){            
                <!--Client-->            
                d +='<tr>'
                d +='<td>' + Main.Users[e].id + '</td>'
                d +='<td><input type="checkbox" class="checkbox client" value="' + Main.Users[e].id + '"></td>'
                d +='<td>' + Main.Users[e].name + " " + Main.Users[e].lastname + " " + Main.Users[e].lastname2 +'</td>'
                d +='<td>' + Main.Users[e].email +'</td>'
                d +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                d +='</tr>'
                <!--Client--> 
                }
                
                if(Main.Users[e].level ==2){   
                 
                 if(document.getElementById("b_search").value !=""){
                      f = document.getElementById("b_search").value.toLowerCase();
                 }
                if (String(Main.Users[e].id).toLowerCase().indexOf(f) >= 0 || Main.Users[e].name.toLowerCase().indexOf(f) >= 0 || Main.Users[e].email.toLowerCase().indexOf(f) >= 0) {
                    if((Main.Users[e].level!=4) && (Main.Users[e].level!=5))
                    {
                     h = true;
                     k.push(Main.Users[e])
                    }
           		 }
                <!--Business Owner-->            
                bo +='<tr>'
                bo +='<td>' + Main.Users[e].id + '</td>'
                bo +='<td><input type="checkbox" class="checkbox businessowner" value="' + Main.Users[e].id + '"></td>'
                bo +='<td>' + Main.Users[e].name + " " + Main.Users[e].lastname + " " + Main.Users[e].lastname2 +'</td>'
                bo +='<td>' + Main.Users[e].email +'</td>'
                bo +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                bo +='</tr>'
                <!--Business Owner-->   
                }
                
                if(Main.Users[e].level ==1){    
               if(document.getElementById("c_search").value !=""){
                    f = document.getElementById("c_search").value.toLowerCase();
               }
                if (String(Main.Users[e].id).toLowerCase().indexOf(f) >= 0 || Main.Users[e].name.toLowerCase().indexOf(f) >= 0 || Main.Users[e].email.toLowerCase().indexOf(f) >= 0) {
                    if((Main.Users[e].level!=4) && (Main.Users[e].level!=5))
                    {
                     h = true;
                     k.push(Main.Users[e])
                    }
           		 }
                <!--City Admin-->            
                ca +='<tr>'
                ca +='<td>' + Main.Users[e].id + '</td>'
                ca +='<td><input type="checkbox" class="checkbox cityadmin" value="' + Main.Users[e].id + '"></td>'
                ca +='<td>' + Main.Users[e].name + " " + Main.Users[e].lastname + " " + Main.Users[e].lastname2 +'</td>'
                ca +='<td>' + Main.Users[e].email +'</td>'
                ca +='<td><div class="enebal" id="switch_' + Main.Users[e].id + '"></div></td>'
                ca +='</tr>'
                <!--City Admin-->  
                }          
                
            }
        }
        document.getElementById("client_users").innerHTML = d;
        document.getElementById("business_users").innerHTML = bo;
        document.getElementById("city_users").innerHTML = ca;
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
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    Edit: function (val) {
    Main.userlevel= val;
    if(val == 3){var classname ='client'}else if(val == 2){var classname = 'businessowner'}else if(val == 1){var classname ='cityadmin'}
        var e = false;

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
        
        if (e) {
            var c = this;
            Main.Loading();
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserData","id":"' + a + '"}]', "Users.PreEdit")
        }
    },
    PreEdit: function (a) {
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
             j +='<h3 class="popup-heading">Create User</h3>'
        } else {
             j +='<h3 class="popup-heading">Edit User</h3>'
        }
        var A ='';
        if (e.id) {
        if(e.isimg == 1) {
            A = "images/users/" + Main.NullToEmpty(e.id) + "/medium.jpg?c=" + new Date().getTime()
            }
            else  {
               A = "images/dummy/dummy_user.jpg";
            }
        }else  {
               A = "images/dummy/dummy_user.jpg";
        }
        
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-control user-img">'        
        j += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >';
        j += '<input id="uploadImage" type="file"  class="user_pic"  name="uploadImage" onChange="Users.PreviewImage();" >'
	    j += '<input id="showImage" name="showImage" type="hidden" value=""  />';
		j += '<input type="submit" name="submit" onclick="Users.triggerImageupload()" style="display:none" />';
		j += '</form>';
        j +='<img id="uploadPreview" src="' + A + '"  >'
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
        
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Name *</label>'
        j +=Forms.CreateInputPropertyPopup("user", "name", e.name, true)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Last Name *</label>'
        j +=Forms.CreateInputPropertyPopup("user", "lastname", e.lastname, true)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Last Name 2</label>'
        j +=Forms.CreateInputPropertyPopup("user", "lastname2", e.lastname2, false)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row-->  
        
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Email *</label>'
        j +=Forms.CreateInputPropertyPopup("user", "email", e.email, true)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Password *</label>'
        if (g) {
        j +=Forms.CreateInputPropertyPopup("user", "pwd", e.passwd, false, "", false, true)
        }else {
        j +=Forms.CreateInputPropertyPopup("user", "pwd", e.passwd, true)
        }
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Address *</label>'
        j +=Forms.CreateInputPropertyPopup("user", "street", e.street, true, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row--> 
        
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Neighborhood</label>'
        j +=Forms.CreateInputPropertyPopup("user", "colony", e.colony, false, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Zip code</label>'
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
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Country *</label>'
        j +=Forms.CreateSelectPropertyPopup("user", "country", c, Main.NullToEmpty(e.country), true, "Users.CountrySelected(this);GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row--> 
        
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>City *</label>'
        j +=Forms.CreateSelectPropertyPopup("user", "city", [], Main.NullToEmpty(e.city), true, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Phone</label>'
        j +=Forms.CreateInputPropertyPopup("user", "tel", e.tel, false)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Mobile</label>'
        j +=Forms.CreateInputPropertyPopup("user", "cel", e.cel, false)
        j +='</div>'
        j +='</div>'
        <!--col-md-4-->
        j +='</div>'
        <!--row--> 
        j +='<div class="row">'
        j +='<div class="col-md-12">'
        j +='<div class="form-group">'
        j +='<label>Ocupation</label>'
        j +=Forms.CreateInputPropertyPopup("user", "job", e.job, false)
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
            }
            d = JSON.parse(d);
            //j +=Forms.CreateSelectPropertyPopup("user", "level", d, e.level, false, "", true)
        }
        
        j +='</div>'
        <!--row--> 
        
        j +='<div class="row">'
        j +='<div class="col-md-6 col-md-offset-3">'
         if (Forms.Form.user.type == "create") {
             j +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Users.TryToStartSave()">Create</button></center>'
        } else {
             j +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Users.TryToStartSave('+e.id+')">Update</button></center>'
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
            f.latitud = 23.634501;
            f.longitud = -102.552784;
            f.zoom = 4
        } else {
            f = JSON.parse(e.location)
        }
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, Users.LocationUpdated);
        if (g) {
            Users.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
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


    CountrySelected: function (a) {
        Users.PopulateCitySelect(a.options[a.selectedIndex].value)
    },
    PopulateCitySelect: function (c, b) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (g != "") {
                var f = JSON.parse(g).franchises;
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
    
     
    
        if (Forms.CanSave("user") == false) {
            return
        }
        
        if(document.getElementById("showImage").value !="") {			
		Forms.Form.user.image = document.getElementById("showImage").value;
	}
        
        if (Users.ForceMainButtonEvent) {
            
            Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), Users.ForceMainButtonEvent)
            Popup.Close();
        } else {
            Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), "Users.Main()")
             Popup.Close();
        }
       
        Forms.Clean("user");
        GoogleMap.Clean()
    },
    Export: function (val) {
   
    if(val == 1){var classname ='client'}else if(val == 2){var classname = 'businessowner'}else if(val == 3){var classname ='cityadmin'}

        var b = Main.GetMarkedCheckBoxesValuesByClass(classname);
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
       
        document.getElementById("exp_data").value = JSON.stringify(a);
        
        document.getElementById("exp_form").submit()
    },
    Delete: function (val) {
    if(val == 1){var classname ='client'}else if(val == 2){var classname = 'businessowner'}else if(val == 3){var classname ='cityadmin'}

        var b = Main.GetMarkedCheckBoxesValuesByClass(classname);
        if (b.length == 0) {
			alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("users", null, "f=DeleteUser&data=" + JSON.stringify(a), "Users.Main()")
    }
};
