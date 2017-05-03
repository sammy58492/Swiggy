<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var DriverManager = {
    Main: function () {
        Main.Loading();
        var b = this;
        var a = new Date().getTime();
        Main.Aid = a;
            
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchDriverManagerAllData"}]', function (c) {

            if (a != Main.Aid) {
                return
            }
            Main.Ready();
             
                    
            if (c != "") {
                Main.DriverManager = JSON.parse(c).drivermanager;
                b.PrintMain()
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function () {
  
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var c = "";
        b.push(Visuals.CreateSubMenuItem("DriverManager.New()","<?= $lang_resource['CONTROL_PANEL_DRIVER_BUTTON_CREATE'] ?>"));
		b.push(Visuals.CreateSubMenuItem("DriverManager.Edit()","<?= $lang_resource['CONTROL_PANEL_DRIVER_BUTTON_EDIT'] ?>"));
		b.push(Visuals.CreateSubMenuItem("DriverManager.Delete()","<?= $lang_resource['CONTROL_PANEL_DRIVER_BUTTON_DELETE'] ?>"));
         document.getElementById("totalOrderBox").style.display = "none";
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; List of driver manager</span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="DriverManager.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="username hand" onclick="DriverManager.PupulateTable(\'name\')" style="width:462px"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_NAME_HEADER1'] ?></span></div>';
        
        c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="users"></div>';
        c += "</div>";
        
       
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
         
            DriverManager.PupulateTable("id", true)
        };
        DriverManager.PupulateTable("id", true)
    },
    PupulateTable: function (b, c) {
    

       var d = "";
        var a = Main.DriverManager.length;
        
        /*if (c) {
            Main.DriverManager.sort(Main.SortByProperty(b));
            if (Main.Config.DriverManager.List.SortByStatus == "max") {
                Main.DriverManager.reverse()
            }
        } else {
            if (Main.Config.DriverManager.List.SortBy != b) {
                Main.DriverManager.sort(Main.SortByProperty(b));
                Main.Config.DriverManager.List.SortByStatus = "min"
            } else {
                Main.DriverManager.reverse();
                if (Main.Config.DriverManager.List.SortByStatus == "min") {
                    Main.Config.DriverManager.List.SortByStatus = "max"
                } else {
                    Main.Config.DriverManager.List.SortByStatus = "min"
                }
            }
        }
        
        Main.Config.DriverManager.List.SortBy = b;*/
   
        var h = false;
        var f = "";
        var k = new Array();
         
       
       
        for (var e in Main.DriverManager) {
        
            h = false;
            f = document.getElementById("search").value.toLowerCase();
            if (String(Main.DriverManager[e].id).toLowerCase().indexOf(f) >= 0 || Main.DriverManager[e].levelname.toLowerCase().indexOf(f) >= 0 || Main.DriverManager[e].email.toLowerCase().indexOf(f) >= 0 || (Main.DriverManager[e].name + " " + Main.DriverManager[e].lastname + " " + Main.DriverManager[e].lastname2).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(Main.DriverManager[e])
            }
            if (h) {
                var j;
                if (e % 2 == 0) {
                    j = " grey"
                } else {
                    j = ""
                }
                d += '<div class="default row' + j + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="DriverManager.Edit(' + Main.DriverManager[e].id + ')">' + Main.DriverManager[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.DriverManager[e].id + '"/></div>';
                d += '<div class="username" style="width:462px"> <div class="cap"><span class="caption hand" onclick="DriverManager.Edit(' + Main.DriverManager[e].id + ')">' + Main.TitleCase(Main.DriverManager[e].name) + " &nbsp;" + Main.TitleCase(Main.DriverManager[e].lastname) +"</span></div></div>";
              
                d += '<div class="enabled"><span class="caption"><div id="switch_' + Main.DriverManager[e].id + '"></div></span></div>';
                d += "</div>";
                
            }
        }
        document.getElementById("users").innerHTML = d;
        var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != Main.DriverManager.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switch_" + k[e].id, g);
                Switch.OnChange("switch_" + k[e].id, function (m, l) {
                    DriverManager.SetEnabled(m.replace("switch_", ""), l)
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
        $.post("lib/drivermanager.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
        //alert(c);
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    Edit: function (a, b) {
        var e = false;
        if (a) {
            e = true;
            Visuals.ForceMainButtonCancelEvent = b;
            DriverManager.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValues();
            if (d.length == 1) {
                a = d[0];
                e = true
            }
            Visuals.ForceMainButtonCancelEvent = null;
            DriverManager.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            Main.Loading();
            //alert(a);
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDriverManagerData","id":"' + a + '"}]', "DriverManager.PreEdit")
        }
    },
    EditDM: function () {
       
            Main.Loading();
            //alert(a);
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDMData"}]', "DriverManager.PreEdit")
       
    },
    PreEdit: function (a) {
     
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
     
     
        Main.Countries = a.countries;
        
        //alert(JSON.stringify(a.dri));
        this.Form(a.drivermanager)
    },
    New: function () {
        Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "DriverManager.PreNew")
    },
    PreNew: function (a) {
        if (a == "") {
            alert("Error")
        }
       //alert(a);
        Main.Countries = JSON.parse(a).countries;
        this.Form()
    },
    Form: function (e) {
    
    
        //alert(Main.User.level);
        var h = "";
        var j = "";
        var g = false;
        h += Visuals.CreateMainButton("Save", "ok", "");
        
      
        if(Main.User.level==5)
        {
        h += Visuals.CreateMainButton("Cancel", "cancel", "DriverManagerFront.HomeUrl()");
        }
        else
        {
         h += Visuals.CreateMainButton("Cancel", "cancel", "DriverManager.PrintMain()");
        }
        
        Forms.Clean("driver", "mainbuttonok");
      
        if (e == null) {
            e = new Object();
            Forms.Form.driver.type = "create";
          
        } else {
            g = true;
            Forms.Form.driver.type = "modify";
            Forms.Form.driver.id = e.id;
            
            Forms.Form.driver.usr = e.usr;
            DriverManager.PopulateCitySelect(Main.NullToEmpty(e.country),Main.NullToEmpty(e.city))
        }
        j += '<div class="contentbox">';
        j += '<div class="titlebox nonselectable">';
        if (Forms.Form.driver.type == "create") {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_TITLE'] ?></span>'
        } else {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DRIVER_EDIT_TITLE'] ?></span>'
        }
        j += "</div>";
        j += '<div class="editform">';
        j += '<div class="leftcol">';
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "name", e.name, true) + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_LAST_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "lastname", e.lastname, true) + "</div></div>";
        
            j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PASS'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "pwd", e.pwd, true) + "</div></div>"
       
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "email", e.email, true) + "</div></div>";
       
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_STREET'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "address", e.address, true) + "</div></div>";
       
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_ZIP'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "cp", e.cp, false) + "</div></div>";
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
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("driver", "country", c, Main.NullToEmpty(e.country), true, "Users.CountrySelected(this);GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_CITY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("driver", "city", [], Main.NullToEmpty(e.city), true,"GoogleMap.UpdateUserPosition(this)") + "</div></div>";
      
        
         j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_MOBILE']?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "cel", Main.NullToEmpty(e.cel), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
        
        
        j += "</div>";
        j += "</div>";
        j += "</div>";
        document.getElementById("leftcol").innerHTML = h;
        document.getElementById("main").innerHTML = j;
      
        document.getElementById("mainbuttonok").onclick = function () {
       
         DriverManager.TryToStartSave(e.id);
        };
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
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, DriverManager.LocationUpdated);
        if (g) {
            DriverManager.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
    },
    CountrySelected: function (a) {
        DriverManager.PopulateCitySelect(a)
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
                    if (Forms.CanSave("user")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },
   
    ProfileStartUpload: function () {
        Forms.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
    TryToStartSave: function (a) {
        var c = document.getElementById("email");
        var d = c.value;
        if (Main.IsEmail(d)) {
            var b = new Date().getTime();
            Main.Aid = b;
            Main.Loading();
            if (a) {
                a = "&id=" + a
            } else {
                a = ""
            }
            
            $.post("lib/driver.php", "f=GetEmailAvailability&email=" + d + a, function (e) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e == "ok") {
                  
                   DriverManager.Save();
                } else {
                    alert("<?php echo $lang_resource['DRIVER_EMAIL_ADDRESS_ALREADY_REGISTERED']; ?>")
                }
            })
        } else {
            alert("<?php echo $lang_resource['DRIVER_VALID_EMAIL_PLEASE']; ?>")
        }
    },
    Save: function (a) {
  
 
        if (Forms.CanSave("driver") == false) {
            return
        }
        Forms.PrepareForSaving("driver");  

     //alert(JSON.stringify(Forms.Form.driver));
       
       if(Main.User.level!=5){
     
       Main.Request("drivermanager", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driver), "DriverManager.Main()")
       }
       else 
       {

        
       Main.Request("drivermanager", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driver), "DriverManager.HomeUrl()")
       }
       
 
        Forms.Clean("driver");
  
    },
     HomeUrl: function () {
     window.location="./";
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
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("drivermanager", null, "f=DeleteDriverManager&data=" + JSON.stringify(a), "DriverManager.Main()")
    }
};