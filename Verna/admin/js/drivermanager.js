var DriverManager = {
    Main: function () {
		DriverManager.namelang = Array();
		DriverManager.lastnamelang = Array();
		DriverManager.addresslang = Array();
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
        var n = "";
		n +='<div class="panel panel-danger panel-square panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-4">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['DRIVER_MANAGER_HEADING']?></h3>'
		n +='</div>'
		<!--col-md-5-->
		n +='<div class="col-md-3">'
		n +='<div class="panel-btn filtr_margin">'
		n +='<input type="text" id="drivermanagersearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
		n +='</div>'
		n +='</div>'
		<!--col-md-3-->
		n +='<div class="col-md-5">'
		n +='<div class="panel-btn pull-right">'
		n +='<div class="inline-popups">'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="DriverManager.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['DRIVER_MANAGER_ADD']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="DriverManager.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['DRIVER_MANAGER_EDIT']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="DriverManager.Delete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['DRIVER_MANAGER_DELETE']?></button>'
		n +='</span>'
		n +='</div>'
		
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row-->
		n +='</div>'
		
		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped tbl_enebal">'
		n +='<thead>'
		n +='<tr>'
		n +='<th width="10%" onclick="DriverManager.PupulateTable(\'id\')" style="cursor:pointer;"><?=$lang_resource['DRIVER_MANAGER_POPULATE_ID']?></th>'
		n +='<th width="30%" onclick="Main.ToogleAllCheckBoxes(\'checkboxdrivermanager\')" style="cursor:pointer;"><?=$lang_resource['DRIVER_MANAGER_POPULATE_ALL']?></th>'
		n +='<th width="40%" onclick="DriverManager.PupulateTable(\'name\')" style="cursor:pointer;"><?=$lang_resource['DRIVER_MANAGER_POPULATE_DM']?></th>'
		n +='<th width="20%"><?=$lang_resource['DRIVER_MANAGER_POPULATE_ENABLE']?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="drivermanagerlist">'
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'
		$("#drivermanager").empty().append(n);
       
	   DriverGroup.Main();
        document.getElementById("drivermanagersearch").onkeyup = function () {
            DriverManager.PupulateTable("id", true)
        };
        DriverManager.PupulateTable("id", true)
    },
    PupulateTable: function (b, c) {

       var n = "";
        var a = Main.DriverManager.length;
        
        if (c) {
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
        
        Main.Config.DriverManager.List.SortBy = b;
   
        var h = false;
        var f = "";
        var k = new Array();
       
        for (var e in Main.DriverManager) {
       
            h = false;
            f = document.getElementById("drivermanagersearch").value.toLowerCase();
            if (String(Main.DriverManager[e].id).toLowerCase().indexOf(f) >= 0 || (Main.DriverManager[e].name + " " + Main.DriverManager[e].lastname).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(Main.DriverManager[e])
            }
            if (h) {
               
			   
		n +='<tr>'
		n +='<td onclick="DriverManager.Edit(' + Main.DriverManager[e].id + ')" style="cursor:pointer;">'+ Main.DriverManager[e].id +'</td>'
		n +='<td><input type="checkbox" class="checkboxdrivermanager" value="' + Main.DriverManager[e].id + '"></td>'
		n +='<td onclick="DriverManager.Edit(' + Main.DriverManager[e].id + ')" style="cursor:pointer;">'+ Main.TitleCase(Main.DriverManager[e].name) +' &nbsp;' + Main.TitleCase(Main.DriverManager[e].lastname) +'</td>'
		n +='<td><div class="enebal" id="switchdrivermanager_' + Main.DriverManager[e].id + '" style="cursor:pointer;"></div></td>'
		n +='</tr>'

            }
        }
        document.getElementById("drivermanagerlist").innerHTML = n;
        var g = false;
        //Switch.Init();
        for (e in k) {
            if (k[e].id != Main.DriverManager.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switchdrivermanager_" + k[e].id, g);
                Switch.OnChange("switchdrivermanager_" + k[e].id, function (m, l) {
                    DriverManager.SetEnabled(m.replace("switchdrivermanager_", ""), l)
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
            if (c != "ok") {
                Switch.SwitchTo("switchdrivermanager_" + b, !a)
            }
        })
    },
	
    Edit: function (a, b) {
		$('div[id*=newpopup]').remove();
        var e = false;
        if (a) {
            e = true;
            Visuals.ForceMainButtonCancelEvent = b;
            DriverManager.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValuesByClass('checkboxdrivermanager');
			
            if (d.length == 1) {
                a = d[0];
                e = true
            }else if(d.length > 1){
            	alert("<?=$lang_resource['DRIVER_MANAGER_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['DRIVER_MANAGER_CHECBOX_SELECT_EDIT']?>");
                return
            }
            Visuals.ForceMainButtonCancelEvent = null;
            DriverManager.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            Main.Loading();
            
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDriverManagerData","id":"' + a + '"}]', "DriverManager.PreEdit")
        }
    },
    EditDM: function () {
       
            Main.Loading();
           
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDMData"}]', "DriverManager.PreEdit")
       
    },
    PreEdit: function (a) {
     
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Countries = a.countries;
        this.Form(a.drivermanager)
    },
    New: function () {
		$('div[id*=newpopup]').remove();
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
     Jsfuntioncountry:function(value)
{
    //alert(value);
    document.getElementById("countryselect").value= value;
},

  Jsfuntioncity:function(value)
{
    //alert(value);
    document.getElementById("cityselect").value= value;
},
	show_id: function(id){
		var b = document.getElementById("country").value;
        var c= document.getElementById("countryselect").value;
    	 $.post("lib/drivermanager.php", "f=FetchAllCountriesIDData&data=" + id, function (d) {		
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
                         if (f[d].id == c) {
                            h = d;
                            j = true
                        }
                    }
                    
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {               
                    e.selectedIndex = parseInt(h) + 1
                } else if(c && j){
                    e.selectedIndex = parseInt(h) + 1
                }
                else {
                    Forms.Form.driver.fields.country.value = "";                   
                }
                
                
             }
        });
		var v = document.getElementById("city").value;
        var o = document.getElementById("cityselect").value;
    	 $.post("lib/drivermanager.php", "f=FetchAllCityIDData&data=" + id+"&countryid="+c, function (g) {		
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
                    else{
                        
                        if (m[d].id == o) {
                            h = d;
                            j = true
                        }
                    }
                    //alert(m[d].city);
                    e.options[e.options.length] = new Option(m[d].city, m[d].id)
                }
                
                if (v && j) {               
                    e.selectedIndex = parseInt(h) + 1
                }  else if(o && j){
                    e.selectedIndex = parseInt(h) + 1
                }
                else {
                    Forms.Form.driver.fields.city.value = "";                   
                }
                
                
             }
        });
		
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("lastname_"+flaginfo[Z].id).style.display  = "none";
			document.getElementById("address_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
		document.getElementById("lastname_"+id).style.display  = "block";
		document.getElementById("address_"+id).style.display  = "block";
    },
    Form: function (e) {

        var n = "";
        var g = false;
      
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
		
		if (Forms.Form.driver.type == "create") {
		n +='<h3 class="popup-heading"><?=$lang_resource['DRIVER_MANAGER_FORM_HEADING1']?></h3>'
		}else{
		n +='<h3 class="popup-heading"><?=$lang_resource['DRIVER_MANAGER_FORM_HEADING2']?></h3>'
		}
		
		n +='<div class="row">'
        n +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                DriverManager.langdefault = flaginfo[Z].admindefaulelang;                             
                n+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="DriverManager.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                n+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="DriverManager.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        n +='</ul>'
        n +='</div>'
        <!--row-->
		
		n +='<div class="row">'
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_NAME']?></label>'
		Forms.CreateValue("driver", "name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.driver.type == "create") {
                if(flaginfo[p].id == DriverManager.langdefault){   
                    n +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    n +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == DriverManager.langdefault){   
                    n +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    n +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }

		//n +=Forms.CreateInputPropertyPopup("driver", "name", e.name, true, "DriverManager.PreValidation()")
		
		
        n +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_NAME_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_LNAME']?></label>'
		Forms.CreateValue("driver", "lastname", "",true)
		for(p in flaginfo){
            if (Forms.Form.driver.type == "create") {
                if(flaginfo[p].id == DriverManager.langdefault){   
                    n +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    n +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{				
				
                if(flaginfo[p].id == DriverManager.langdefault){   
                    n +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" />' 
                }else{
                    n +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" style="display:none;" />' 
                }   
            	
			}
		}
        n +='<small data-bv-validator="notEmpty" class="help-block" id="lastname_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_LNAME_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_PWD']?></label>'
		n +=Forms.CreateInputPropertyPopup("driver", "pwd", e.pwd, true, "DriverManager.PreValidation()")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="pwd_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PWD_DM']?></small>'
        n +='<small data-bv-validator="notEmpty" class="help-block" id="pwd_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PWD_LIMIT_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_EMAIL']?></label>'
		n +=Forms.CreateInputPropertyPopup("driver", "email", e.email, true, "DriverManager.PreValidation()")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_DM']?></small>'
        n +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_ADDRESS']?></label>'
		Forms.CreateValue("driver", "address", "",true)
		for(p in flaginfo){
            if (Forms.Form.driver.type == "create") {
                if(flaginfo[p].id == DriverManager.langdefault){   
                    n +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    n +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
				
                if(flaginfo[p].id == DriverManager.langdefault){   
                    n +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.address[flaginfo[p].id])+'" />' 
                }else{
                    n +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.address[flaginfo[p].id])+'" style="display:none;" />' 
                }   
            	
			}
		}
		//n +=Forms.CreateInputPropertyPopup("driver", "address", e.address, true, "DriverManager.PreValidation()")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="address_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ADDRESS_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_ZIP']?></label>'
		n +=Forms.CreateInputPropertyPopup("driver", "cp", e.cp, true, "DriverManager.PreValidation()")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="cp_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ZIP_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		var c = new Array();
        c.push({
            id: "-1",
            caption: "<?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_COUNTRY_OPTION']?>"
        });
        for (i in Main.Countries) {
            c.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }
		//c.sort(Main.SortByProperty("caption"));
        n +='<input type="hidden" id="countryselect" value="'+e.country+'">'
        n +='<input type="hidden" id="cityselect" value="'+e.country+'">'

		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_COUNTRY']?></label>'
		n +=Forms.CreateSelectPropertyPopup("driver", "country", c, Main.NullToEmpty(e.country), true, " DriverManager.PreValidation(); Users.CountrySelected(this); GoogleMap.UpdateUserPosition(this);DriverManager.Jsfuntioncountry(this.value);")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_COUNTRY_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_CITY']?></label>'
		n +=Forms.CreateSelectPropertyPopup("driver", "city", [], Main.NullToEmpty(e.city), true,"DriverManager.PreValidation(); GoogleMap.UpdateUserPosition(this);DriverManager.Jsfuntioncity(this.value);")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_CITY_DM']?></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-4">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['DRIVER_MANAGER_FORM_FIELD_MOBILE']?></label>'
		n +=Forms.CreateInputPropertyPopup("driver", "cel", Main.NullToEmpty(e.cel), true, "DriverManager.PreValidation()", false, false, "return Main.IsNumberKey(event)")
        n +='<small data-bv-validator="notEmpty" class="help-block" id="cel_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_MOBILE_DM']?></small>'
		//n +='<small data-bv-validator="notEmpty" class="help-block" id="cel_text1" style="color:#F00;display:none;">Mobile length 10 digit</small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.driver.type == "create") {
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DriverManager.TryToStartSave()" ><?=$lang_resource['DRIVER_MANAGER_FORM_CREATE']?></button></center>'
		}else{
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DriverManager.TryToStartSave('+e.usr+')" ><?=$lang_resource['DRIVER_MANAGER_FORM_EDIT']?></button></center>'
		}
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->
		
		Popup.Show(n);
		
		
		if (g) {
            DriverManager.PopulateCitySelect(e.country, e.city)
        }
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
                    Forms.Form.driver.fields.city.value = "";
                    if (Forms.CanSave("driver")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },
  
	
	PreValidation: function(){
   	var count = 0;	
    flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == DriverManager.langdefault){
    	if(document.getElementById("name_"+flaginfo[Z].id).value.replace(/ /g,'') == ""){
            $("#name_text").show();
            $("#name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#name_text").hide();
            $("#name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#name_"+flaginfo[Z].id).removeClass("error-text-field");
        }
			
			
		if(document.getElementById("lastname_"+flaginfo[Z].id).value.replace(/ /g,'') == ""){
            $("#lastname_text").show();
            $("#lastname_"+flaginfo[Z].id).addClass("error-text-field");
            $("#lastname_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#lastname_text").hide();
            $("#lastname_"+flaginfo[Z].id).addClass("success-text-field");
            $("#lastname_"+flaginfo[Z].id).removeClass("error-text-field");
        }
			
		
		if(document.getElementById("address_"+flaginfo[Z].id).value.replace(/ /g,'') == ""){
            $("#address_text").show();
            $("#address_"+flaginfo[Z].id).addClass("error-text-field");
            $("#address_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#address_text").hide();
            $("#address_"+flaginfo[Z].id).addClass("success-text-field");
            $("#address_"+flaginfo[Z].id).removeClass("error-text-field");
        }
		
		}
		
			var namedata = document.getElementById("name_"+flaginfo[Z].id).value;
            DriverManager.namelang[flaginfo[Z].id] = namedata;
			
			var lastnamedata = document.getElementById("lastname_"+flaginfo[Z].id).value;
            DriverManager.lastnamelang[flaginfo[Z].id] = lastnamedata;
			
			var addressdata = document.getElementById("address_"+flaginfo[Z].id).value;
            DriverManager.addresslang[flaginfo[Z].id] = addressdata.split(",").join("***");
	}
		
		if(document.getElementById("pwd").value.replace(/ /g,'') == ""){
            $("#pwd_text").show();
            $("#pwd").addClass("error-text-field");
            $("#pwd").removeClass("success-text-field");
            count ++;
        }else if (document.getElementById("pwd").value.length < 5) {
        	$("#pwd_text").hide();
        	$("#pwd_text1").show();
            $("#pwd").addClass("error-text-field");
            $("#pwd").removeClass("success-text-field");
            count ++;
           
        }else{
			$("#pwd_text").hide();
        	$("#pwd_text1").hide();
            $("#pwd").addClass("success-text-field");
            $("#pwd").removeClass("error-text-field");
        }
		
		
		
        
        var a = document.getElementById("email");
        var b = a.value;
        if(document.getElementById("email").value == ""){
        	
            $("#email_text").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;
        }else if (!Main.IsEmail(b)) {
        	$("#email_text").hide();
        	$("#email_text1").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;
        }else{
			$("#email_text").hide();
            $("#email_text1").hide();
            $("#email").addClass("success-text-field");
            $("#email").removeClass("error-text-field");
        }
		
		if(document.getElementById("cp").value == ""){
            $("#cp_text").show();
            $("#cp").addClass("error-text-field");
            $("#cp").removeClass("success-text-field");
            count ++;
        }else{
        	$("#cp_text").hide();
            $("#cp").addClass("success-text-field");
            $("#cp").removeClass("error-text-field");
        }
		
        if(document.getElementById("country").value == -1){
            $("#country_text").show();
            $("#country").addClass("error-text-field");
            $("#country").removeClass("success-text-field");
            count ++;
        }else{
        	$("#country_text").hide();
            $("#country").addClass("success-text-field");
            $("#country").removeClass("error-text-field");
        }
        if(document.getElementById("city").value == ""){
            $("#city_text").show();
            $("#city").addClass("error-text-field");
            $("#city").removeClass("success-text-field");
            count ++;
        }else{
        	$("#city_text").hide();
            $("#city").addClass("success-text-field");
            $("#city").removeClass("error-text-field");
        }
        
		if(document.getElementById("cel").value.replace(/ /g,'') == ""){
			
            $("#cel_text").show();
            $("#cel").addClass("error-text-field");
            $("#cel").removeClass("success-text-field");
            count ++;
        }
		else if (document.getElementById("cel").value.length > 15) {
		return false;	
		}
		else{
        	$("#cel_text").hide();
            $("#cel").addClass("success-text-field");
            $("#cel").removeClass("error-text-field");
        }
		/*if(document.getElementById("cel").value.length != 10){
			
            $("#cel_text1").show();
            $("#cel").addClass("error-text-field");
            $("#cel").removeClass("success-text-field");
            count ++;
        }else{
        	$("#cel_text1").hide();
            $("#cel").addClass("success-text-field");
            $("#cel").removeClass("error-text-field");
        }*/
		
		
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
    TryToStartSave: function (a) {
	
		if(DriverManager.PreValidation() == false){
		return	
		}
        /*if (Forms.CanSave("driver") == false) {
            return
        }*/
	
        //Forms.PrepareForSaving("driver"); 
		
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
            
            $.post("lib/drivermanager.php", "f=GetEmailAvailability&email=" + d + a, function (e) {
				
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
		Forms.UpdateValue("driver", "name", DriverManager.namelang,true); 
		Forms.UpdateValue("driver", "lastname", DriverManager.lastnamelang,true); 
		Forms.UpdateValue("driver", "address", DriverManager.addresslang,true); 
		
	   for(var s in Forms.Form.driver.fields){			
			Forms.Form.driver.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.driver.fields[s].value)))
			
			Forms.Form.driver.fields[s].value = Forms.Form.driver.fields[s].value.split("+").join("@@");
		} 	 
       Main.Request("drivermanager", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driver), "DriverManager.Main()")
       Popup.Close();
	   Forms.Clean("driver");
  
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValuesByClass('checkboxdrivermanager');
        if (b.length == 0) {
			alert("<?=$lang_resource['DRIVER_MANAGER_CHECBOX_SELECT']?>");
            return
        }
		var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['DRIVER_MANAGER_DELETE_MSG']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/drivermanager.php", "f=DeleteDriverManager&data=" + JSON.stringify(a), function (d) {
						
				
						alert('<?=$lang_resource['DRIVER_MANAGER_DELETE_SUCCESS']?>');
                        DriverManager.Main()
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
		});
    }
};
