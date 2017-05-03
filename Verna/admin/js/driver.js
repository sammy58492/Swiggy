document.write("<?php session_start(); require_once('../login/common.php'); require_authentication(1); ?>");
var Driver = {
    Main: function () {
		Driver.namelang = Array();
		Driver.lastnamelang = Array();
		Driver.addresslang = Array();
		Driver.backgroundlang = Array();
        Main.Loading();
        var b = this;
        var a = new Date().getTime();
        Main.Aid = a;

            
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchDriverAllData"}]', function (c) {
                Main.Config.Driver= new Object();
                Main.Config.Driver.List= new Object();
                Main.Config.Driver.List.SortBy = "id";
                Main.Config.Driver.List.SortByStatus = "min";
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
   

        var c = "";

		
		c += '<div class="panel panel-success panel-square panel-no-border">'
		c += '<div class="panel-heading panel-heading-2">'
        c += '<div class="row">'
		c += '<div class="col-md-4">'
        c += '<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_Driver'] ?></h3>'
        c += '</div>'
		<!--col-md-5-->
        c += '<div class="col-md-3">'
        c += '<div class="panel-btn filtr_margin">'
        c += '<input type="text" id="driversearch" class="form-control rounded panel-green-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c += '</div>'
        c += '</div>'
		<!--col-md-3-->
        c += '<div class="col-md-5">'
		c += '<div class="panel-btn pull-right">'
                  
        c += '<div class="inline-popups">'
        c += '<span class=" panel-btn-2">'
        c += '<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Driver.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_ADD'] ?></a>'
        c += '</span>'
        c += '<span class=" panel-btn-2">'
        c += '<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:Driver.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_EDIT'] ?></a>'
        c += '</span>            '
        c += '<span class=" panel-btn-2">'
        c += '<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Driver.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_DELETE'] ?></button></span>'
                        
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
        c += '<th width="10%" onclick="Driver.PupulateTable(\'id\')" style="cursor:pointer;"><?=$lang_resource['ADMIN_PAGE_DRIVER_ID'] ?></th>'
        c += '<th width="30%" onclick="Main.ToogleAllCheckBoxes(\'driver-list\')"><?=$lang_resource['ADMIN_PAGE_DRIVER_ALL'] ?></th>'
        c += '<th width="40%" onclick="Driver.PupulateTable(\'name\')" style="cursor:pointer;"><?=$lang_resource['ADMIN_PAGE_Driver'] ?></th>'
        c += '<th width="20%"><?=$lang_resource['ADMIN_PAGE_DRIVER_ENABLE'] ?></th>'
        c += '</tr>'
		c += '</thead>'
		c += '<tbody id="driverlist">'
		
		c += '</tbody>'
		c += '</table>'
        c += '</div>'
		<!--table-responsive-->
        c += '</div>'
		 <!--/.panel-body -->
		c += '</div>'
		

      $("#driver-list").empty().append(c);
        document.getElementById("driversearch").onkeyup = function () {
         
            Driver.PupulateTable("id", true)

        };
        Driver.PupulateTable("id", true)
		
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

        var h = false;
        var f = "";
        var k = new Array();
       
        //alert(JSON.stringify(Main.Driver))
        for (var e in Main.Driver) {
            h = false;
            f = document.getElementById("driversearch").value.toLowerCase();
			if (String(Main.Driver[e].id).toLowerCase().indexOf(f) >= 0 || String(Main.Driver[e].name).toLowerCase().indexOf(f) >= 0 || String(Main.Driver[e].lastname).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(Main.Driver[e])
            }
            if (h) {
               
				d += '<tr>'
			d += '<td>'+ Main.Driver[e].id +'</td>'
			d += '<td><input type="checkbox" class="checkbox driver-list" value="' + Main.Driver[e].id + '"></td>'
			d += '<td style="cursor:pointer;" onclick="Driver.Edit(' + Main.Driver[e].id + ')">' + Main.Driver[e].name + " &nbsp;" + Main.Driver[e].lastname +'</td>'
			d += '<td><div class="enebal" id="switchdriver_' + Main.Driver[e].id + '"></div></td>'
			d += '</tr>'
				
                
            }
        }
        document.getElementById("driverlist").innerHTML = d;
        var g = false;
		
       //Switch.Init();
        for (e in k) {
            if (k[e].id != Main.Driver.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switchdriver_" + k[e].id, g);
                Switch.OnChange("switchdriver_" + k[e].id, function (m, l) {
                    for(var i in Main.Driver){
                        if(Main.Driver[i].id == k[e].id){
                            alert(k[e].id)
                        }
                    }
                    Driver.SetEnabled(m.replace("switchdriver_", ""), l)
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
                Switch.SwitchTo("switchdriver_" + b, !a)
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
				
				}else if(d.length > 1){
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_EDIT']?>");
                return
            	
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
	
     Jsfuntioncountry:function(value)
{
    //alert(value);
    document.getElementById("countryselectdriver").value= value;
},

  Jsfuntioncity:function(value)
{
    //alert(value);
    document.getElementById("cityselectdriver").value= value;
},

	
	show_id: function(id){
		
		var gd = document.getElementById("group_id").value;
    	 $.post("lib/driver.php", "f=FetchAllDriverGroupIDData&data=" + id, function (r) {		
            if (r != "") {
              var w = JSON.parse(r);
            
             var e = document.getElementById("group_id");
             e.options.length = 0;
             //e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
				
                for (var d in w) {
                    if (gd) {
                        if (w[d].id == gd) {
                            h = d;
                            j = true
                        }
                    }
					
                    e.options[e.options.length] = new Option(w[d].group_name, w[d].id)
                }
                
                if (gd && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    //Forms.Form.driver.fields.group_id.value = "";                   
                }
                
                
             }
        });
		
		
		var b = document.getElementById("country").value;
        var c= document.getElementById("countryselectdriver").value;
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
                }else if(c && j){
                    e.selectedIndex = parseInt(h) + 1
                }
                 else {
                    Forms.Form.driver.fields.country.value = "";                   
                }
                
                
                
             }
        });
		var v = document.getElementById("city").value;
        var o = document.getElementById("cityselectdriver").value;
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
                    
                    e.options[e.options.length] = new Option(m[d].city, m[d].id)
                }
                
                if (v && j) {               
                    e.selectedIndex = parseInt(h) + 1
                }else if(o && j){
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
			document.getElementById("background_"+flaginfo[Z].id).style.display  = "none";
			
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
		document.getElementById("lastname_"+id).style.display  = "block";
		document.getElementById("address_"+id).style.display  = "block";
		document.getElementById("background_"+id).style.display  = "block";
    },
	
	
	
    Form: function (e) {
    MultipleInput.AddListener("tagschange", "Driver.MultiInputTagsChange");
    //alert(JSON.stringify(e));
       $.post("lib/driver.php", "f=FetchAllDriverGroupData", function (b) {
               
        
         
                       var totalrec = JSON.parse(b);
                      
                        var d = new Array();
                               d.push(JSON.parse('{"id":"-1","caption":""}'));
                               for (var c in totalrec) {
                                       var e1 = new Object();
                                       e1.id = totalrec[c].id;
                                       e1.caption = totalrec[c].caption ;
                                       d.push(e1)
                               }
               
              
   
        var h = "";
		var g = false;
		
		Driver.restaurants = d;

      
       
        Forms.Clean("addriver", "mainbuttonok");
      
        if (e == null) {
            e = new Object();
            Forms.Form.addriver.type = "create";
          	Forms.Form.addriver.id = "";
        } else {
            g = true;
            Forms.Form.addriver.type = "modify";
            Forms.Form.addriver.id = e.id;
            Forms.Form.addriver.usr = e.usr;
            Forms.Form.addriver.bringg_driverid = e.bringg_driverid;
            
           
            Driver.PopulateCitySelect(Main.NullToEmpty(e.country),Main.NullToEmpty(e.city))
        }
		

     

		
				var k = "";
					
					//alert(JSON.stringify(Forms.Form.addriver.type));	
					if (Forms.Form.addriver.type == "create") {
						k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_CREATE_DRIVER'] ?></h3>'
					} else {
						k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_EDIT_DRIVER'] ?></h3>'
					}
					
					
					k +='<div class="row">'
					k +='<ul class="pop_lang_img">'
					flaginfo=Main.languageinfo;
					for(Z in flaginfo){
						var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
						if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
							Driver.langdefault = flaginfo[Z].admindefaulelang;                             
							k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Driver.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
						}else{
							k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Driver.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
						}
					}
					k +='</ul>'
					k +='</div>'
					<!--row-->
					
        		    k += '<div class="row">'
                	k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PANEL_DRIVER_GROUP_NAME']?> *</label>'
                    if(Main.User.level==4)
					{
					k +=Forms.CreateSelectPropertyPopup("addriver", "group_id", d, e.group_id, false,"Driver.PreValidation("+Forms.Form.addriver.id+")")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="group_id_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE'] ?></small>'
					}
					else
					{
						k += Forms.CreateSelectPropertyPopup("addriver", "group_id", d, e.group_id, true,"Driver.PreValidation("+Forms.Form.addriver.id+")")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="group_id_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE'] ?></small>'	
					
					}

					 k += '</div>'
              		 k += '</div>'
					 
					
					 
					 <!--col-md-4-->
                     k += '<div class="col-md-4">'
                     k += '<div class="form-group">'
                     k += '<label><?=$lang_resource['ORDER_DETAILS_BUYER_NAME']?> *</label>'
					 
					Forms.CreateValue("addriver", "name", "",true)
					flaginfo=Main.languageinfo;
					for(p in flaginfo){
						if (Forms.Form.addriver.type == "create") {
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Driver.PreValidation('+Forms.Form.addriver.id+')" class="form-control"  value="" />' 
							}else{
								k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
							}   
						}else{
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control" onkeyup="Driver.PreValidation('+Forms.Form.addriver.id+')"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
							}else{
								k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
							}  
						}     
					}
					 
					 
                     //k += Forms.CreateInputPropertyPopup("addriver", "name", e.name, true,"Driver.PreValidation("+Forms.Form.addriver.id+")")
					 k +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_NAME_IS_REQUIRED'] ?></small>'	
                     k += '</div>'
              		 k += '</div>'
					 <!--col-md-4-->
                     k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ORDER_DETAILS_BUYER_LASTNAME']?> *</label>'
					
					Forms.CreateValue("addriver", "lastname", "",true)
					flaginfo=Main.languageinfo;
					for(p in flaginfo){
						if (Forms.Form.addriver.type == "create") {
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="lastname_'+flaginfo[p].id+'" onkeyup="Driver.PreValidation('+Forms.Form.addriver.id+')" class="form-control"  value="" />' 
							}else{
								k +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
							}   
						}else{
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control" onkeyup="Driver.PreValidation('+Forms.Form.addriver.id+')"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" />' 
							}else{
								k +='<input type="text" id="lastname_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" style="display:none;" />' 
							}  
						}     
					}
					
                    //k += Forms.CreateInputPropertyPopup("addriver", "lastname", e.lastname, true,"Driver.PreValidation("+Forms.Form.addriver.id+")")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="lastname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_LAST_NAME_IS_REQUIRED'] ?></small>'
                    k += '</div>'
              		k += '</div>'
						<!--col-md-4-->
                 	k += '</div>'
				 	<!--row--> 
                	k += '<div class="row">'
                	k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_PASSWORD'] ?> *</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "pwd", e.pwd, true,"Driver.PreValidation("+Forms.Form.addriver.id+")","",true)
					k +='<small data-bv-validator="notEmpty" class="help-block" id="pwd_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PASSWORD_REQUIRED'] ?></small>'
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_EMAIL'] ?>  *</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "email", e.email, true,"Driver.PreValidation("+Forms.Form.addriver.id+")")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_EMAIL_EMPTY'] ?></small>'
					k +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_INVALID_EMAIL'] ?></small>'
					k +='<small data-bv-validator="notEmpty" class="help-block" id="email_text2" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ALREADY_REGISTERED'] ?></small>'	
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_ADDRESS'] ?> *</label>'
					
					Forms.CreateValue("addriver", "address", "",true)
					flaginfo=Main.languageinfo;
					for(p in flaginfo){
						if (Forms.Form.addriver.type == "create") {
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="address_'+flaginfo[p].id+'" onkeyup="Driver.PreValidation('+Forms.Form.addriver.id+')" class="form-control"  value="" />' 
							}else{
								k +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
							}   
						}else{
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control" onkeyup="Driver.PreValidation('+Forms.Form.addriver.id+')"  value="'+Main.NullToEmpty(e.address[flaginfo[p].id])+'" />' 
							}else{
								k +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.address[flaginfo[p].id])+'" style="display:none;" />' 
							}  
						}     
					}
					
                    //k += Forms.CreateInputPropertyPopup("addriver", "address", e.address, true,"Driver.PreValidation("+Forms.Form.addriver.id+")")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="address_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_ADDRESS_IS_REQUIRED'] ?></small>'
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                	k += '</div>'
					<!--row--> 
                	k += '<div class="row">'
                	k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label>Zip code</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "zip", e.zip, false)
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['SEARCH_STATISTICS_COUNTRY'] ?> *</label>'
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
		            
                    k +='<input type="hidden" id="countryselectdriver" value="'+e.country+'">'
                    k +='<input type="hidden" id="cityselectdriver" value="'+e.country+'">'
                    k += Forms.CreateSelectPropertyPopup("addriver", "country", c, Main.NullToEmpty(e.country), true, "Driver.CountrySelected(this);Driver.PreValidation("+Forms.Form.addriver.id+");Driver.Jsfuntioncountry(this.value);")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_REQUIRED_COUNTRY'] ?></small>'
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ORDER_TAB_CITY'] ?> *</label>'
                    k += Forms.CreateSelectPropertyPopup("addriver", "city", [], Main.NullToEmpty(e.city), true,"Driver.PreValidation("+Forms.Form.addriver.id+");Driver.Jsfuntioncity(this.value);")
					k +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_CITY_REQUIRED'] ?></small>'
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                	k += '</div>'
					<!--row--> 
                    k += '<div class="row">'
                	k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_MOBILE'] ?> *</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "mobile", Main.NullToEmpty(e.mobile), true,"Driver.PreValidation("+Forms.Form.addriver.id+")", false, false, "return Main.IsNumberKey(event)")
					 k +='<small data-bv-validator="notEmpty" class="help-block" id="mobile_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_MOBILE_IS_REQUIRED'] ?></small>'	
					  k +='<small data-bv-validator="notEmpty" class="help-block" id="mobile_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_MOBILE_LENGTH'] ?></small>'	
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PANEL_DRIVER_BACKGROUND'] ?></label>'
					
					Forms.CreateValue("addriver", "background", "",true)
					flaginfo=Main.languageinfo;
					for(p in flaginfo){
						if (Forms.Form.addriver.type == "create") {
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="background_'+flaginfo[p].id+'" class="form-control"  value="" />' 
							}else{
								k +='<input type="text" id="background_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
							}   
						}else{
							if(flaginfo[p].id == Driver.langdefault){   
								k +='<input type="text" id="background_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.background[flaginfo[p].id])+'" />' 
							}else{
								k +='<input type="text" id="background_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.background[flaginfo[p].id])+'" style="display:none;" />' 
							}  
						}     
					}
					
                    //k += Forms.CreateTextAreaPropertyPopup("addriver", "background", Main.NullToEmpty(e.background), false, "", false, "metarea")
                            	
                    k += '</textarea>'
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_GPS_TRACKING_URL'] ?>:</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "gprs_url", e.gprs_url, false)
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_BRINGG_COMPANY_ID'] ?>:</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "bringg_company_id", e.bringg_company_id, false)
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
					<!--col-md-4-->
                    k += '<div class="col-md-4">'
                    k += '<div class="form-group">'
                    k += '<label><?=$lang_resource['ADMIN_PAGE_DRIVER_BRINGG_ID'] ?>:</label>'
                    k += Forms.CreateInputPropertyPopup("addriver", "bringg_driverid", e.bringg_driverid, false)
                    k += '</div>'
              		k += '</div>'
					<!--col-md-4-->
					
                    k += '</div>'
					
					<!--row-->     
                    k += '<div class="row">'
                	k += '<div class="col-md-6 col-md-offset-3">'
					if (Forms.Form.addriver.type == "create") {
						k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Driver.Save()"><?=$lang_resource['ADMIN_PAGE_DRIVER_CREATE'] ?></button></center>'
					} else {
						k += '<center><button type="submit" onclick="Driver.Save()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_DRIVER_UPDATE'] ?></button></center>'
					}
                    
                    k += '</div>'<!--col-md--->
                k += '</div>'<!--row-->
            k += '</div>'
		
		
		
		
		
		Popup.Show(k);

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

/*    TryToStartSave: function (a) {
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
         
            
            $.post("lib/driver.php", "f=GetDriverEmailAvailability&email=" + d + a, function (e) {
            
             
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e == "ok") {
                  
                   Driver.Save();
                } else {
                    alert("<?php echo 'Email Address already register'; ?>")
                }
            })
        } else {
            alert("<?php echo 'Enter the valid email address'; ?>")
        }
    },*/
	    
	
	PreValidation: function(a){
		var count = 0;
		
		
		if(document.getElementById("group_id").value == "-1"){
			
            $("#group_id_text").show();
            $("#group_id").addClass("error-text-field");
            $("#group_id").removeClass("success-text-field");
            count ++;
        }else{
        	$("#group_id_text").hide();
            $("#group_id").addClass("success-text-field");
            $("#group_id").removeClass("error-text-field");
        }
		
		
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Driver.langdefault){
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
            Driver.namelang[flaginfo[Z].id] = namedata;
			
			var lastnamedata = document.getElementById("lastname_"+flaginfo[Z].id).value;
            Driver.lastnamelang[flaginfo[Z].id] = lastnamedata;
			
			var addressdata = document.getElementById("address_"+flaginfo[Z].id).value;
            Driver.addresslang[flaginfo[Z].id] = addressdata.split(",").join("***");
			
			var backgrounddata = document.getElementById("background_"+flaginfo[Z].id).value;
            Driver.backgroundlang[flaginfo[Z].id] = backgrounddata;
	}

		if(document.getElementById("pwd").value.replace(/ /g,'') == ""){
			
            $("#pwd_text").show();
            $("#pwd").addClass("error-text-field");
            $("#pwd").removeClass("success-text-field");
            count ++;
        }else{
        	$("#pwd_text").hide();
            $("#pwd").addClass("success-text-field");
            $("#pwd").removeClass("error-text-field");
        }
		if(document.getElementById("email").value == ""){
			
            $("#email_text").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;
        }else{
        	$("#email_text").hide();
            $("#email").addClass("success-text-field");
            $("#email").removeClass("error-text-field");
        }
		//var email = document.getElementById("email").value;
		//var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		//if(document.getElementById("email").value == ""){
		var a = document.getElementById("email");
        var b = a.value;	
		if(!Main.IsEmail(b)){
            $("#email_text1").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;
        }else{
			
			$("#email_text1").hide();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
			var c = document.getElementById("email");
        	var d = c.value;
			Main.Loading();
            if (a) {
                a = "&id=" + a.value
            } else {
                a = ""
            }    
            
            $.post("lib/driver.php", "f=GetDriverEmailAvailability&email=" + d + a, function (e) {
				
                Main.Ready();
                if (e.trim() == "ok") {
					$("#email_text2").hide();
					$("#email").addClass("success-text-field");
					$("#email").removeClass("error-text-field");
                } else {
                   $("#email_text2").show();//already register
					$("#email").addClass("error-text-field");
					$("#email").removeClass("success-text-field");
					count ++;
                }
            })
			
        	
			
        }

		if(document.getElementById("country").value == ""){
			
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
		
		if(document.getElementById("mobile").value == ""){
			
            $("#mobile_text").show();
            $("#mobile").addClass("error-text-field");
            $("#mobile").removeClass("success-text-field");
            count ++;
        }else{
        	$("#mobile_text").hide();
            $("#mobile").addClass("success-text-field");
            $("#mobile").removeClass("error-text-field");
        }
		/*if(document.getElementById("mobile").value.length != 10){
			
            $("#mobile_text1").show();
            $("#mobile").addClass("error-text-field");
            $("#mobile").removeClass("success-text-field");
            count ++;
        }else{
        	$("#mobile_text1").hide();
            $("#mobile").addClass("success-text-field");
            $("#mobile").removeClass("error-text-field");
        }*/
	   
		
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
	
    Save: function (a) {
    
			if(Driver.PreValidation(Forms.Form.addriver.id) == false){
				return	
			}
    	
  
       /* if (Forms.CanSave("addriver") == false) {
            return
        }*/
		
		Forms.UpdateValue("addriver", "name", Driver.namelang,true); 
		Forms.UpdateValue("addriver", "lastname", Driver.lastnamelang,true); 
		Forms.UpdateValue("addriver", "address", Driver.addresslang,true); 
		Forms.UpdateValue("addriver", "background", Driver.backgroundlang,true); 

        	Main.Loading();
			for(var s in Forms.Form.addriver.fields){			
			Forms.Form.addriver.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.addriver.fields[s].value)))
			Forms.Form.addriver.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.addriver.fields[s].ivalue)))
			Forms.Form.addriver.fields[s].value = Forms.Form.addriver.fields[s].value.split("+").join("@@");
			Forms.Form.addriver.fields[s].ivalue = Forms.Form.addriver.fields[s].ivalue.split("+").join("@@");
		} 

		  // alert(JSON.stringify(Forms.Form.addriver));
			$.post("lib/driver.php", "f=SaveDriverData&data=" + JSON.stringify(Forms.Form.addriver), function (f)
        {
   
           //  alert(f);
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
        
        
         Driver.Main(); 
         
         }
       			
		  });       
        
       Popup.Close();
 
        Forms.Clean("addriver");
  
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
           alert("Please select at least one item");
            return
        }
        var a = new Object();
        a.ids = b;
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/driver.php", "f=DeleteDriver&data=" + JSON.stringify(a), function (e) {
						Driver.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});	


    }
};