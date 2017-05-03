<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var Driver = {
    Main: function () {
        Main.Loading();
        var b = this;
        var a = new Date().getTime();
        Main.Aid = a;
        
         			 Main.Config.Driver = new Object();
                    Main.Config.Driver.List = new Object();
                    Main.Config.Driver.List.SortBy = "id";
                    Main.Config.Driver.List.SortByStatus = "min";
            
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchDriverAllData"}]', function (c) {
       //alert(c);
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
             
       
            if (c != "") {
                Main.Driver = JSON.parse(c).driver;
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
        b.push(Visuals.CreateSubMenuItem("Driver.New()","<?= $lang_resource['CONTROL_PANEL_DRIVER1_BUTTON_CREATE'] ?>"));
		b.push(Visuals.CreateSubMenuItem("Driver.Edit()","<?= $lang_resource['CONTROL_PANEL_DRIVER1_BUTTON_EDIT'] ?>"));
		b.push(Visuals.CreateSubMenuItem("Driver.Delete()","<?= $lang_resource['CONTROL_PANEL_DRIVER1_BUTTON_DELETE'] ?>"));
         document.getElementById("totalOrderBox").style.display = "none";
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; List of Driver</span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="Driver.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="username hand" onclick="Driver.PupulateTable(\'name\')" style="width:462px"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_NAME_HEADER1'] ?></span></div>';
        
        c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="users"></div>';
        c += "</div>";
        
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
         
            Driver.PupulateTable(Main.Config.Driver.List.SortBy, true)
        };
        Driver.PupulateTable(Main.Config.Driver.List.SortBy, true)
    },
    PupulateTable: function (b, c) {
  
        var d = "";
        var a = Main.Driver.length;
        if (c) {
            Main.Driver.sort(Main.SortByProperty(b));
            if (Main.Config.Driver.List.SortByStatus == "max") {
                Main.Driver.reverse()
            }
        } else {
            if (Main.Config.Driver.List.SortBy != b) {
                Main.Driver.sort(Main.SortByProperty(b));
                Main.Config.Driver.List.SortByStatus = "min"
            } else {
                Main.Driver.reverse();
                if (Main.Config.Driver.List.SortByStatus == "min") {
                    Main.Config.Driver.List.SortByStatus = "max"
                } else {
                    Main.Config.Driver.List.SortByStatus = "min"
                }
            }
        }
        
        Main.Config.Driver.List.SortBy = b;
        if (!c) {
            Main.SaveConfig()
        }
        var h = false;
        var f = "";
        var k = new Array();
       
        //alert(JSON.stringify(Main.Driver))
        for (var e in Main.Driver) {
            h = false;
            f = document.getElementById("search").value.toLowerCase();
            if (String(Main.Driver[e].id).toLowerCase().indexOf(f) >= 0 || Main.Driver[e].levelname.toLowerCase().indexOf(f) >= 0 || Main.Driver[e].email.toLowerCase().indexOf(f) >= 0 || (Main.Driver[e].name + " " + Main.Driver[e].lastname + " " + Main.Driver[e].lastname2).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(Main.Driver[e])
            }
            if (h) {
                var j;
                if (e % 2 == 0) {
                    j = " grey"
                } else {
                    j = ""
                }
                d += '<div class="default row' + j + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="Driver.Edit(' + Main.Driver[e].id + ')">' + Main.Driver[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.Driver[e].id + '"/></div>';
                d += '<div class="username" style="width:462px"> <div class="cap"><span class="caption hand" onclick="Driver.Edit(' + Main.Driver[e].id + ')">' + Main.TitleCase(Main.Driver[e].name) + " &nbsp;" + Main.TitleCase(Main.Driver[e].lastname) +"</span></div></div>";
              
                d += '<div class="enabled"><span class="caption"><div id="switch_' + Main.Driver[e].id + '"></div></span></div>';
                d += "</div>";
                
            }
        }
        document.getElementById("users").innerHTML = d;
        var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != Main.Driver.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switch_" + k[e].id, g);
                Switch.OnChange("switch_" + k[e].id, function (m, l) {
                    Driver.SetEnabled(m.replace("switch_", ""), l)
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
        $.post("lib/driver.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
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
            Driver.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValues();
            if (d.length == 1) {
                a = d[0];
                e = true
            }
            Visuals.ForceMainButtonCancelEvent = null;
            Driver.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            Main.Loading();
            //alert(a);
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDriverData","id":"' + a + '"}]', "Driver.PreEdit")
        }
    },
     EditD: function () {
       
       //alert("hghgh");
            Main.Loading();
            //alert(a);
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDData"}]', "Driver.PreEdit")
       
    },
    PreEdit: function (a) {
     
       //alert(JSON.stringify(a));
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
     
     
        Main.Countries = a.countries;
        
        //alert(JSON.stringify(a.dri));
        this.Form(a.driver)
    },
    New: function () {
 
        Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "Driver.PreNew")
    },
    PreNew: function (a) {
        if (a == "") {
            alert("Error")
        }
       
        Main.Countries = JSON.parse(a).countries;
        this.Form()
    },
    Form: function (e) {
    
    //alert(JSON.stringify(e));
       $.post("lib/driver.php", "f=FetchAllDriverGroupData", function (b) {
                       
          
          //alert(b);
                       var totalrec = JSON.parse(b);
                
                        var d = new Array();
                               d.push(JSON.parse('{"id":"-1","caption":""}'));
                               for (var c in totalrec) {
                                       var e1 = new Object();
                                       e1.id = totalrec[c].id;
                                       e1.caption = totalrec[c].caption ;
                                       d.push(e1)
                               }
               
               Driver.restaurants = d;
   
   
        var h = "";
        var j = "";
        var g = false;
        h += Visuals.CreateMainButton("Save", "ok", "");
       
        if(Main.User.level==5)
        {
        h += Visuals.CreateMainButton("Cancel", "cancel", "Driver.Main()");
        }
        else if(Main.User.level==4)
        {
        h += Visuals.CreateMainButton("Cancel", "cancel", "DriverFront.HomeUrl()");
        }
        else
        {
         h += Visuals.CreateMainButton("Cancel", "cancel", "Driver.PrintMain()");
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
            Forms.Form.driver.bringg_driverid = e.bringg_driverid;
            
           
            Driver.PopulateCitySelect(Main.NullToEmpty(e.country),Main.NullToEmpty(e.city))
        }
        j += '<div class="contentbox">';
        j += '<div class="titlebox nonselectable">';
        if (Forms.Form.driver.type == "create") {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_TITLE'] ?></span>'
        } else {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DRIVER1_EDIT_TITLE'] ?></span>'
        }
        j += "</div>";
        j += '<div class="editform">';
        j += '<div class="leftcol">';
        
        if(Main.User.level==4)
        {
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("driver", "group_id", Driver.restaurants, e.group_id, false) + "</div></div>";
        }
        else
        {
            j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("driver", "group_id", Driver.restaurants, e.group_id, true) + "</div></div>";
        
        }
        
         j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_FIRST_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "name", e.name, true) + "</div></div>";
        
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_LAST_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "lastname", e.lastname, true) + "</div></div>";
       
       
            j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PASS'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "pwd", e.pwd, true) + "</div></div>"
        
       
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "email", e.email, true) + "</div></div>";
       
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_STREET'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "address", e.address, true) + "</div></div>";
       
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_ZIP'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "zip", e.zip, false) + "</div></div>";
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
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("driver", "country", c, Main.NullToEmpty(e.country), true, "Driver.CountrySelected(this)") + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_CITY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("driver", "city", [], Main.NullToEmpty(e.city), true) + "</div></div>";
      
       j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_MOBILE']?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "mobile", Main.NullToEmpty(e.mobile), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
       
       j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_BACK']?></span><div class="inputbox">' + Forms.CreateTextAreaProperty("driver", "background", Main.NullToEmpty(e.background), false, "", false, "metarea") + "</div></div>";
       
       j += '<div class="row"><span class="caption" style="width: 68px;"><?=$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_GPRS']?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "gprs_url", e.gprs_url, false) + "</div></div>";
       
        j += "</div>";
        j += "</div>";
        j += "</div>";
        
        
        document.getElementById("leftcol").innerHTML = h;
        document.getElementById("main").innerHTML = j;
      
        document.getElementById("mainbuttonok").onclick = function () {
       
         Driver.TryToStartSave(e.id);
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
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, Driver.LocationUpdated);
        if (g) {
            Driver.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
   
       })
  
    
    },
    CountrySelected: function (a) {
        Driver.PopulateCitySelect(a.options[a.selectedIndex].value)
    },
    PopulateCitySelect: function (c, b) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
        //alert(g);
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
         var mob = document.getElementById("mobile");
         var mobv = mob.value;
        var d = c.value;
          if(mobv.length < 10 )  {
          
          alert("Please enter valid mobile number");
          }
       else if (Main.IsEmail(d)) {
            var b = new Date().getTime();
            Main.Aid = b;
            Main.Loading();
            if (a) {
                a = "&id=" + a
            } else {
                a = ""
            }
         
            
            $.post("lib/driver.php", "f=GetDriverEmailAvailability&email=" + d +"&mobile=" + mobv + a, function (e) {
            
             
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e == "ok") {
                  
                   Driver.Save();
                } else {
                    alert("<?php echo $lang_resource['DRIVER1_EMAIL_ADDRESS_ALREADY_REGISTERED']; ?>")
                }
            })
        } else {
            alert("<?php echo $lang_resource['DRIVER1_VALID_EMAIL_PLEASE']; ?>")
        }
    },
    Save: function (a) {
    
    		Main.Loading();
  
       /* if (Forms.CanSave("driver") == false) {
            return
        }*/
       // Forms.PrepareForSaving("driver");  
        
       //alert(JSON.stringify(Forms.Form.driver));

			$.post("lib/driver.php", "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driver), function (f)
        {
   
                    Main.Ready();

			if(f.trim() == "OK") {   
          
                         if(Main.User.level==4)
                         {
                            Driver.HomeUrl()
                         }
                         else if(Main.User.level==5)
                         {
                            Driver.Main();    
                              }
                         else
                         {
                            Driver.Main();    
                         }
         } else {
        
       //  alert(f)
         Driver.Main(); 
         
         }
       			
		  });       
        
       
 
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
        Main.Request("driver", null, "f=DeleteDriver&data=" + JSON.stringify(a), "Driver.Main()")
    }
};