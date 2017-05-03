<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var DriverGroup = {
    Main: function () {
    // alert(Main.User.id)
        Main.Loading();
        var b = this;
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
			
			//alert(b);
			DriverGroup.businessrest = JSON.parse(b);
			//return false
			
			
			})
           $.post("lib/drivergroup.php", "f=FetchAllDriverManagerData", function (b) {
                       
          
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

        //alert(c);
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
        
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var c = "";
        b.push(Visuals.CreateSubMenuItem("DriverGroup.New()","<?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_BUTTON_CREATE'] ?>"));
		b.push(Visuals.CreateSubMenuItem("DriverGroup.Edit()","<?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_BUTTON_EDIT'] ?>"));
		b.push(Visuals.CreateSubMenuItem("DriverGroup.Delete()","<?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_BUTTON_DELETE'] ?>"));
         document.getElementById("totalOrderBox").style.display = "none";
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; List of driver group</span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="DriverGroup.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="username hand" onclick="DriverGroup.PupulateTable(\'name\')" style="width:200px"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_NAME_HEADER1'] ?></span></div>';
  
        
        c += '<div class="username hand" style="width:200px"><span class="caption">Manager</span></div>';
        
         c += '<div class="enabled default" style="width:123px"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVER1_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="users"></div>';
        c += "</div>";
        
       
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
         
            DriverGroup.PupulateTable("id", true)
        };
        
        
        DriverGroup.PupulateTable("id", true)
    },
    PupulateTable: function (b, c) {
    
    //alert(JSON.stringify(DriverGroup.DriverGroups));
    
       var d = "";
        var a = DriverGroup.DriverGroups.length;
  
        
     
   
        var h = false;
        var f = "";
        var k = new Array();
         
      
        for (var e in DriverGroup.DriverGroups) {
        
       
            h = false;
            f = document.getElementById("search").value.toLowerCase();
            if (String(DriverGroup.DriverGroups[e].id).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(DriverGroup.DriverGroups[e])
            }
            if (h) {
             
            // alert('9')
                var j;
                if (e % 2 == 0) {
                    j = " grey"
                } else {
                    j = ""
                }
                
                
                
                d += '<div class="default row' + j + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="DriverGroup.Edit(' + DriverGroup.DriverGroups[e].id + ')">' + DriverGroup.DriverGroups[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + DriverGroup.DriverGroups[e].id + '"/></div>';
                d += '<div class="username" style="width:200px"> <div class="cap"><span class="caption hand" onclick="DriverGroup.Edit(' + DriverGroup.DriverGroups[e].id + ')">' + Main.TitleCase(DriverGroup.DriverGroups[e].group_name) +"</span></div></div>";
                
                 d += '<div class="username" style="width:200px"> <div class="cap"><span class="caption hand" onclick="DriverGroup.Edit(' + DriverGroup.DriverGroups[e].id + ')">' + Main.TitleCase(DriverGroup.DriverGroups[e].drivermanager_name) +"</span></div></div>";
              
                d += '<div class="enabled"><span class="caption"><div id="switch_' + DriverGroup.DriverGroups[e].id + '"></div></span></div>';
                d += "</div>";
                
            }
        }
       
        document.getElementById("users").innerHTML = d;
        var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != DriverGroup.DriverGroups.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switch_" + k[e].id, g);
                Switch.OnChange("switch_" + k[e].id, function (m, l) {
                    DriverGroup.SetEnabled(m.replace("switch_", ""), l)
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
                Switch.SwitchTo("switch_" + b, !a)
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
            var d = Main.GetMarkedCheckBoxesValues();
            if (d.length == 1) {
                a = d[0];
                e = true
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
      //alert(a);
      
   
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
     
    
        this.Form(a.drivergroup)
    },
    New: function () {
      
                         
                       DriverGroup.Form();
    },
   
    Form: function (e) {
    
  
     MultipleInput.AddListener("tagschange", "DriverGroup.MultiInputTagsChange");
     
        
       
        var h = "";
        var j = "";
        var g = false;
        h += Visuals.CreateMainButton("Save", "ok", "");
        h += Visuals.CreateMainButton("Cancel", "cancel", "DriverGroup.PrintMain()");
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
        
        //alert("121");
        //alert(Main.User.level);
        j += '<div class="contentbox">';
        j += '<div class="titlebox nonselectable">';
        if (Forms.Form.driver.type == "create") {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_TITLE'] ?></span>'
        } else {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_EDIT_TITLE'] ?></span>'
        }
        j += "</div>";
         
        j += '<div class="editform">';
        j += '<div class="leftcol">';
        
        if(Main.User.level!=5)
                               { 
            j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_MANAGER'] ?></span><div class="inputbox">'+ Forms.CreateSelectProperty("driver", "drivermanager_id", DriverGroup.restaurants, e.drivermanager_id, true) +"</div></div>";
                                }
                      else
                      {
                      j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_MANAGER'] ?></span><div class="inputbox">'+ Forms.CreateSelectProperty("driver", "drivermanager_id", DriverGroup.restaurants, e.drivermanager_id, true) +"</div></div>";
                      
                      }          
        
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "group_name", e.group_name, true) + "</div></div>";
       
       
         j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_FIXED'] ?></span></div>';
    
    
    j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PERDAY']?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "per_day", Main.NullToEmpty(e.per_day), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
         
   j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PERMONTH']?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "per_month", Main.NullToEmpty(e.per_month), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
     
     
     j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PERYEAR']?></span><div class="inputbox">' + Forms.CreateInputProperty("driver", "per_year", Main.NullToEmpty(e.per_year), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";    
   
  
          
         
       j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVERGROUP_COMMISION_DOLLAR']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("driver", "com_rate1", Main.NullToEmpty(e.com_rate1), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";    
       
       
       j += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DRIVERGROUP_COMMISION_PERCENT']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("driver", "com_rate", Main.NullToEmpty(e.com_rate), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";    
       
   
        
        Forms.CreateValue("driver", "business",Main.NullToEmpty(e.business));
      
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_RESTURANT'] ?></span><div class="multiinputbox" style="margin-left:90px;"><span class="obligatory nonselectable"></span><input type="text" id="business" style="width:245px;height:60px;"/></div></div>';
       
        
        j += "</div>";
        j += "</div>"; 
         
        j += "</div>";
        document.getElementById("leftcol").innerHTML = h;
        document.getElementById("main").innerHTML = j;
        
          document.getElementById("mainbuttonok").onclick = function () {
         DriverGroup.TryToStartSave(Forms.Form.driver.id);
        };
        
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
   
    ProfileStartUpload: function () {
        Forms.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
    TryToStartSave: function (a) {
 
        var c = document.getElementById("group_name");
        var d = c.value;
        Main.Loading();
            if (a) {
                a = "&id=" + a
            } else {
                a = ""
            }
            
          
            
            $.post("lib/drivergroup.php", "f=GetGroupNameAvailability&group_name=" + d + a, function (e) {
              
                Main.Ready();
                if (e == "ok") {
                  
                   DriverGroup.Save();
                } else {
                    alert("Group name already present")
                }
            })
        
    },
    Save: function () {
  
  
        if (Forms.CanSave("driver") == false) {
            return
        }
      
        if( Main.NullToEmpty(Forms.Form.driver.fields.business.value) == "")
        {
         alert("Please Select Business");
         return false;
        }
        Forms.PrepareForSaving("driver");  

     
       Main.Request("drivergroup", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driver), "DriverGroup.Main()")
       
 
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
            break
        }
        if (Forms.CanSave("driver")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
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
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("drivergroup", null, "f=DeleteDriverGroup&data=" + JSON.stringify(a), "DriverGroup.Main()")
    }
};