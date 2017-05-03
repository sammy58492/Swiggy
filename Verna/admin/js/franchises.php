<?php
session_start();
require_once('../login/common.php');
require_authentication(0);	
?>
var IS_PAYPAL_ENABLED = 1;
var Franchises = {
    Main: function () {
    Franchises.citylang = Array();
        Main.GetFranchisesData("Franchises.PrintMain()")
    },
    PrintMain: function () {
        for (var a in Main.Franchises) {
            Main.Franchises[a].aname = Main.Franchises[a].admin.name
        }

        var d = "";

        d +='<div class="row">'
        d +='<div class="top-bar">'
        d +='<div class=" col-md-6 col-md-offset-6">'
        d +='<div class=" pull-right">'
        d +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['BUSINESS_CANCEL']?></button>'
        d +='</div>'
        d +='</div>'
        <!--col-md-5-->
        d +='</div>'
        <!--top-bar-->
        d +='</div>'
        <!--row-->
        
        
        d +='<div class="panel panel-danger panel-square panel-no-border">'
        d +='<div class="panel-heading panel-heading-2">'
        d +='<div class="row">'
        d +='<div class="col-md-4">'
        d +='<h3 class="panel-title-2"><?=$lang_resource['CITY_SUPER_HEADING']?></h3>'
        d +='</div>'
        <!--col-md-5-->
        d +='<div class="col-md-3">'
        d +='<div class="panel-btn filtr_margin">'
        d +='<input type="text" id="search" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        d +='</div>'
        d +='</div>'
        <!--col-md-3-->
        d +='<div class="col-md-5">'
        d +='<div class="panel-btn pull-right">'
        d +='<div class="inline-popups ">'
        d +='<span class=" panel-btn-2">'
        d +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="Franchises.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['CITY_SUPER_ADD']?></a>'
        d +='</span>'
        d +='<span class=" panel-btn-2">'
        d +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="Franchises.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['CITY_SUPER_EDIT']?></a>'
        d +='</span>'
        d +='<span class=" panel-btn-2">'
        d +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Franchises.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['CITY_SUPER_DELETE']?></button>'
        d +='</span>'
        d +='</div>'

        d +='</div>'
        d +='</div>'
        <!--col-md-4-->
        d +='</div> '
        <!--row-->
        d +='</div>'
        
        
        d +='<div class="panel-body">'
        d +='<div class="table-responsive">'
        d +='<table class="table table-th-block table-striped tbl_enebal">'
        d +='<thead>'
        d +='<tr>'
        d +='<th width="10%" onclick="Franchises.PupulateTable(\'id\')"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ID']?></th>'
        d +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ALL']?></th>'
        d +='<th width="25%" onclick="Franchises.PupulateTable(\'city\')"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_CITY']?></th>'
        d +='<th width="25%" onclick="Franchises.PupulateTable(\'aname\')"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ADMINISTRATOR']?></th>'
        d +='<th width="20%"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ENABLE']?></th>'
        d +='</tr>'
        d +='</thead>'
        d +='<tbody id="franchises">'
                                    
        d +='</tbody>'
        d +='</table>'
        d +='</div>'
        <!--table-responsive-->
        d +='</div>'
        <!-- /.panel-body -->
        d +='</div>'
        

        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            Franchises.PupulateTable(Main.Config.Franchises.List.SortBy, true)
        };
        Franchises.PupulateTable(Main.Config.Franchises.List.SortBy, true)
    },
    PupulateTable: function (a, b) {

        var c = "";
        var e = Main.Franchises.length;
        if (b) {
            Main.Franchises.sort(Main.SortByProperty(a));
            if (Main.Config.Franchises.List.SortByStatus == "max") {
                Main.Franchises.reverse()
            }
        } else {
            if (Main.Config.Franchises.List.SortBy != a) {
                Main.Franchises.sort(Main.SortByProperty(a));
                Main.Config.Franchises.List.SortByStatus = "min"
            } else {
                Main.Franchises.reverse();
                if (Main.Config.Franchises.List.SortByStatus == "min") {
                    Main.Config.Franchises.List.SortByStatus = "max"
                } else {
                    Main.Config.Franchises.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Franchises.List.SortBy = a;
        if (!b) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var f = new Array();
        for (var d in Main.Franchises) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(Main.Franchises[d].city).toLowerCase().indexOf(g) >= 0 || String(Main.NullToEmpty(Main.Franchises[d].id)).toLowerCase().indexOf(g) >= 0 || (Main.NullToEmpty(Main.Franchises[d].admin.name) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname2)).toLowerCase().indexOf(g) >= 0) {
                j = true;
                f.push(Main.Franchises[d])
            }
  if (j) {
     
      c +='<tr>'
      c +='<td class="hand" onclick="Franchises.Edit(' + Main.Franchises[d].id + ')">'+ Main.Franchises[d].id + '</td>'
      c +='<td><input type="checkbox" class="checkbox" value="' + Main.Franchises[d].id + '"></td>'
      c +='<td class="hand" onclick="Franchises.Edit(' + Main.Franchises[d].id + ')">'+ Main.Franchises[d].city +'</td>'
      c +='<td class="hand" onclick="Franchises.Edit(' + Main.Franchises[d].id + ')">'+ Main.NullToEmpty(Main.Franchises[d].admin.name) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname2) +'</td>'
      c +='<td><div class="enebal" id="switch_' + Main.Franchises[d].id + '"></div></td>'
      c +='</tr>'
              

      }
 }
        document.getElementById("franchises").innerHTML = c;
        var h = false;
        Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + f[d].id, h);
            Switch.OnChange("switch_" + f[d].id, function (l, i) {
                Franchises.SetEnabled(l.replace("switch_", ""), i)
            })
        }
    },
    SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/franchises.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
    $('div[id*=newpopup]').remove();
        var a = new Date().getTime();
        Main.Aid = a;
        Main.Loading();
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"1"}]}]', function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                b = JSON.parse(b);
                Franchises.Admins = b.users;
                Main.Countries = b.countries;
               // alert(JSON.stringify(Main.Countries));
                Franchises.Form()
            } else {
                alert("Error")
            }
        })
    },
    Edit: function (a) {
    $('div[id*=newpopup]').remove();
        var c = false;
        if (a) {
            c = true
        } else {
            var b = Main.GetMarkedCheckBoxesValues();
            if (b.length == 1) {
                a = b[0];
                c = true
            }else if(b.length > 1){
            	alert("<?=$lang_resource['CITY_SUPER_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['CITY_SUPER_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
        if (c) {
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchFranchiseData","id":"' + a + '"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"1"}]}]', "Franchises.PreEdit")
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error");
            return
        }
        a = JSON.parse(a);
        Franchises.Admins = a.users;
        Main.Countries = a.countries;
        Franchises.Form(a.franchise)
    },
    
    show_id: function(id){
    	var b = document.getElementById("country").value;
    	 $.post("lib/franchises.php", "f=FetchAllCountriesIDData&data=" + id, function (d) {		
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
					
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.franchise.fields.country.value = "";                   
                }
                
                
             }
        });
       
       
       
    	
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("city_"+flaginfo[Z].id).style.display  = "none";

        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("city_"+id).style.display  = "block";

        
        
    },
    
    
    Form: function (j) {
     
        var h = "";

        Forms.Clean("franchise", "mainbuttonok");
        if (j == null) {
            j = new Object();
            Forms.Form.franchise.type = "create"
        } else {
            Forms.Form.franchise.type = "modify";
            Forms.Form.franchise.id = j.id
            Franchises.langid = j.langid;
        }
        
        if (Forms.Form.franchise.type == "create") {
            h +='<h3 class="popup-heading"><?=$lang_resource['CITY_SUPER_CREATE_HEADING']?></h3>'
        } else {
            h +='<h3 class="popup-heading"><?=$lang_resource['CITY_SUPER_EDIT_HEADING']?></h3>'
        }
        	
            h +='<div class="row">'
            h +='<ul class="pop_lang_img">'
            flaginfo=Main.languageinfo;
            for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Franchises.langdefault = flaginfo[Z].admindefaulelang;                             
                h+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Franchises.show_id('+flaginfo[Z].id+')"><img src="'+p+'" ></a></li>';
            }else{
                h+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Franchises.show_id('+flaginfo[Z].id+')"><img src="'+p+'" ></a></li>'  
            }
            }
            h +='</ul>'
            h +='</div>'
            <!--row-->
        	Forms.CreateValue("franchise", "city", "",true)
        	h +='<div class="row">'
            h +='<div class="col-md-4">'
            h +='<div class="form-group">'
            h +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_CITY']?></label>'
            
            
            
            
            flaginfo=Main.languageinfo;
            for(p in flaginfo){
                if (Forms.Form.franchise.type == "create") {
                    if(flaginfo[p].id == Franchises.langdefault){   
                        h +='<input type="text" id="city_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                    }else{
                        h +='<input type="text" id="city_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                    }
                    
                  }else{
                  
                  	 if(flaginfo[p].id == Franchises.langdefault){   
                    h +='<input type="text" id="city_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(j.city[flaginfo[p].id])+'" />' 
                }else{
                    h +='<input type="text" id="city_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(j.city[flaginfo[p].id])+'" style="display:none;" />' 
                } 
                  
                  }
               }
            
            
            
            
            
            //h +=Forms.CreateInputPropertyPopup("franchise", "city", j.city, true,"Franchises.PreValidation()")
            h +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_CITY']?></small>'
            h +='</div>'
            h +='</div>'
            <!--col-md-4-->
            
            h +='<div class="col-md-4">'
            h +='<div class="form-group">'
            h +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_EMAIL']?></label>'
            h +=Forms.CreateInputPropertyPopup("franchise", "email", j.email, true,"Franchises.PreValidation()")
            h +='<small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL']?></small>'
            h +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID']?></small>'
            h +='</div>'
            h +='</div>'
            <!--col-md-4-->
             var d = new Array();
              d.push(JSON.parse('{"id":"' + Main.User.id + '","caption":""}'));
              for (var c in this.Admins) {
                  var e = new Object();
                  e.id = this.Admins[c].id;
                  e.caption = this.Admins[c].name + " " + this.Admins[c].lastname;
                  d.push(e)
              }
              var f = Main.User.id;
              if (j.admin) {
                  f = j.admin
              }
            h +='<div class="col-md-4">'
            h +='<div class="form-group">'
            h +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_ADMIN']?></label>'
            h +=Forms.CreateSelectPropertyPopup("franchise", "admin", d, f, false, "", true)
            h +='</div>'
            h +='</div>'
            <!--col-md-4-->
            h +='</div>'
            <!--row-->  
            
            h +='<div class="row">'
          
            var d = new Array();
            d.push({
                id: "",
                caption: ""
            });
            for (c in Main.Countries) {
                d.push({
                    id: Main.Countries[c].id,
                    caption: Main.Countries[c].name
                })
            }
            d.sort(Main.SortByProperty("caption"));
            h +='<div class="col-md-4">'
            h +='<div class="form-group">'
            h +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_COUNTRY']?></label>'
            h +=Forms.CreateSelectPropertyPopup("franchise", "country", d, Main.NullToEmpty(j.country), true,"Franchises.PreValidation()")
            h +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_COUNTRY']?></small>'
            h +='</div>'
            h +='</div>'
            
          
            
            
            h +='<div class="col-md-4">'
            h +='<div class="form-group">'
            h +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_GA_TRACK_ID']?></label>'
            h +=Forms.CreateInputPropertyPopup("franchise", "ga", j.ga)
            h +='</div>'
            h +='</div>'
            <!--col-md-4-->
            
            var a = new Array({
                id: "Kwajalein",
                caption: "International Date Line West (GMT-12:00)"
            },{
                id: "America/Anchorage",
                caption: "Alaska (GMT-9)"
            },{
                id: "Pacific/Honolulu",
                caption: "Hawaii (GMT-10:00)"
            }, {
                id: "America/Los_Angeles",
                caption: "Pacific Time (US &amp; Canada) (GMT-08:00)"
            }, {
                id: "America/Tijuana",
                caption: "Tijuana, Baja California (GMT-08:00)"
            }, {
                id: "America/Denver",
                caption: "Mountain Time (US &amp; Canada) (GMT-07:00)"
            }, {
                id: "America/Chihuahua",
                caption: "Chihuahua (GMT-07:00)"
            }, {
                id:"Europe/Netherlands",
                caption:"Netherlands (GMT+01:00)"
            }, {
                id: "America/Mazatlan",
                caption: "Mazatlan (GMT-07:00)"
            }, {
                id: "America/Phoenix",
                caption: "Arizona (GMT-07:00)"
            }, {
                id: "Europe/London",
                caption: "London"
            }, {
                id: "America/Tegucigalpa",
                caption: "Central America (GMT-06:00)"
            }, {
                id: "America/Chicago",
                caption: "Central Time (US &amp; Canada) (GMT-06:00)"
            }, {
                id: "America/Mexico_City",
                caption: "Mexico City (GMT-06:00)"
            }, {
                id: "America/Monterrey",
                caption: "Monterrey (GMT-06:00)"
            }, {
                id: "America/New_York",
                caption: "Eastern Time (US &amp; Canada) (GMT-05:00)"
            }, {
                id: "America/Bogota",
                caption: "Bogota (GMT-05:00)"
            }, {
                id: "America/Lima",
                caption: "Lima (GMT-05:00)"
            }, {
                id: "America/Rio_Branco",
                caption: "Rio Branco (GMT-05:00)"
            }, {
                id: "America/Indiana/Indianapolis",
                caption: "Indiana (East) (GMT-05:00)"
            }, {
                id: "America/Caracas",
                caption: "Caracas (GMT-04:30)"
            }, {
                id: "America/Halifax",
                caption: "Atlantic Time (Canada) (GMT-04:00)"
            }, {
                id: "America/Manaus",
                caption: "Manaus (GMT-04:00)"
            }, {
                id: "America/Santiago",
                caption: "Santiago (GMT-04:00)"
            }, {
                id: "America/La_Paz",
                caption: "La Paz (GMT-04:00)"
            }, {
                id: "America/St_Johns",
                caption: "Newfoundland (GMT-03:30)"
            }, {
                id: "America/Argentina/Buenos_Aires",
                caption: "Buenos Aires (GMT-03:00)"
            }, {
                id: "America/Sao_Paulo",
                caption: "Brasilia (GMT-03:00)"
            }, {
                id: "America/Godthab",
                caption: "Greenland (GMT-03:00)"
            }, {
                id: "America/Montevideo",
                caption: "Montevideo (GMT-03:00)"
            }, {
                id: "Europe/Madrid",
                caption: "Madrid (GMT+01:00)"
            }, {
                id: "Europe/Paris",
                caption: "Paris (GMT+01:00)"
            }, 
            {
                id: "Africa/Algiers",
                caption: "WAT (GMT +01:00)"
            }, 

             {
                id: "Asia/Kolkata",
                caption: "India (GMT+05:30)"
            },  {
                id: "Pacific/Fiji",
                caption: "Fiji (GMT+12:00)"
            }, {
                id: "Etc/GMT-11",
                caption: "GMT -11 (GMT-11:00)"
            }, {
                id: "Etc/GMT-9",
                caption: "GMT -9 (GMT-09:00)"
            }, {
                id: "Etc/GMT-2",
                caption: "GMT -2 (GMT-02:00)"
            }, {
                id: "Etc/GMT-1",
                caption: "GMT -1 (GMT-01:00)"
            }, {
                id: "Africa/Windhoek",
                caption: "GMT +2 (GMT+02:00)"
            }, {
                id: "Asia/Riyadh",
                caption: "GMT +3 (GMT+03:00)"
            }, {
                id: "Asia/Yerevan",
                caption: "GMT +4 (GMT+04:00)"
            }, {
                id: "Asia/Karachi",
                caption: "GMT +5 (GMT+05:00)"
            }, {
                id: "Asia/Dhaka",
                caption: "GMT +6 (GMT+06:00)"
            }, {
                id: "Asia/Jakarta",
                caption: "GMT +7 (GMT+07:00)"
            }, {
                id: "Asia/Singapore",
                caption: "GMT +8 (GMT+08:00)"
            }, {
                id: "Asia/Seoul",
                caption: "GMT +9 (GMT+09:00)"
            }, {
                id: "Australia/Melbourne",
                caption: "GMT +10 (GMT+10:00)"
            }, {
                id: "Asia/Magadan",
                caption: "GMT +11 (GMT+11:00)"
            });
           
            a.sort(Main.SortByProperty("caption"));
           
            if (Forms.Form.franchise.type == "create") {
                a.unshift({
                    id: "",
                    caption: ""
                })
            }
             
            h +='<div class="col-md-4">'
            h +='<div class="form-group">'
            h +='<label><?=$lang_resource['CITY_SUPER_CREATE_FIELD_ZONE']?></label>'
            h +=Forms.CreateSelectPropertyPopup("franchise", "timezone", a, Main.NullToEmpty(j.timezone), true, "Franchises.TimeZoneSelected(this);Franchises.PreValidation()")
            h +='<small data-bv-validator="notEmpty" class="help-block" id="timezone_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ZONE']?></small>'
            h +='</div>'
            h +='</div>'
            
            h +='</div>'
            <!--row-->  
            
            h +='<div class="row">'
            
            <!--col-md-4-->
            
            
            h +='</div>'
            <!--row-->  
            
            h +='<small id="timespan"></small>'
            
            
            
            h +='<div class="row">'
            h +='<div class="col-md-6 col-md-offset-3">'
            if (Forms.Form.franchise.type == "create") {
            h +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Franchises.PreSave()"><?=$lang_resource['CITY_SUPER_CREATE_FIELD_CREATE']?></button></center>'
        	} else {
            h +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Franchises.PreSave()"><?=$lang_resource['CITY_SUPER_CREATE_FIELD_EDIT']?></button></center>'
        	}

            h +='</div>'
            <!--col-md--->
            h +='</div>'
            <!--row-->
            h +='</div>'
            
        
       		 Popup.Show(h);
        	Lang.Main();

    
        if (Forms.Form.franchise.type == "modify") {
            Franchises.TimeZoneSelected(document.getElementById("timezone"))
        }
        $("#city").focus()
    },
    TimeZoneSelected: function (b) {        
      
        Main.Loading();     
        $.post("lib/front-main.php", "f=FetchTimeByZoneSiteSettings&format=24&zone=" + b.options[b.selectedIndex].value, function (c) {
            Main.Ready();
            document.getElementById("timespan").innerHTML = "<?=$lang_resource['CITY_SUPER_TIMESTAMP_NOW']?> " + Main.ConvertTimeFormat(c) + " <?=$lang_resource['CITY_SUPER_TIMESTAMP_IN']?> " + document.getElementById("city_1").value;
        });        
    },
    PreValidation: function(){
    var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
   	var count = 0;	
    flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Franchises.langdefault){  
    	if(document.getElementById("city_"+flaginfo[Z].id).value.trim() == ""){
            $("#city_text").show();
            $("#city_"+flaginfo[Z].id).addClass("error-text-field");
            $("#city_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }
         /*else if (!document.getElementById("city_"+flaginfo[Z].id).value.match(alpha)) {
         	 $("#city_text").show();
            $("#city_"+flaginfo[Z].id).addClass("error-text-field");
            $("#city_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
         }
        else{
        	$("#city_text").hide();
            $("#city_"+flaginfo[Z].id).addClass("success-text-field");
            $("#city_"+flaginfo[Z].id).removeClass("error-text-field");
        }*/
      }
      
       var citydata = document.getElementById("city_"+flaginfo[Z].id).value;
        
				Franchises.citylang[flaginfo[Z].id] = citydata.split(",").join("@@@");
                
      		/*var citydata = document.getElementById("city_"+flaginfo[Z].id).value;
            Franchises.citylang[flaginfo[Z].id] = citydata;*/
   }
        var a = document.getElementById("email");
        var b = a.value;
        if(document.getElementById("email").value.trim() == ""){
        	
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
            $("#email_text1").hide();
            $("#email").addClass("success-text-field");
            $("#email").removeClass("error-text-field");
        }
        if(document.getElementById("country").value == ""){
            $("#country_text").show();
            $("#country").addClass("error-text-field");
            $("#country").removeClass("success-text-field");
            count ++;
            
        }else{
        	Franchises.countryselect = document.getElementById("country").value;
        	$("#country_text").hide();
            $("#country").addClass("success-text-field");
            $("#country").removeClass("error-text-field");
            
        }
        
       /* if(document.getElementById("currency").value == ""){
            $("#currency_text").show();
            $("#currency").addClass("error-text-field");
            $("#currency").removeClass("success-text-field");
            count ++;
            
        }else{
        	$("#currency_text").hide();
            $("#currency").addClass("success-text-field");
            $("#currency").removeClass("error-text-field");
        }*/
        if(document.getElementById("timezone").value == ""){
            $("#timezone_text").show();
            $("#timezone").addClass("error-text-field");
            $("#timezone").removeClass("success-text-field");
            count ++;
            
        }else{
        	$("#timezone_text").hide();
            $("#timezone").addClass("success-text-field");
            $("#timezone").removeClass("error-text-field");
        }
        /*if(document.getElementById("tax").value == ""){
            $("#tax_text").show();
            $("#tax").addClass("error-text-field");
            $("#tax").removeClass("success-text-field");
            count ++;
        }else{
        	$("#tax_text").hide();
            $("#tax").addClass("success-text-field");
            $("#tax").removeClass("error-text-field");
        }
        if(document.getElementById("taxtype").value == ""){
            $("#taxtype_text").show();
            $("#taxtype").addClass("error-text-field");
            $("#taxtype").removeClass("success-text-field");
            count ++;
        }else{
        	$("#taxtype_text").hide();
            $("#taxtype").addClass("success-text-field");
            $("#taxtype").removeClass("error-text-field");
        }*/
        
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
    

	 PreSave: function () {
    	if(Franchises.PreValidation() == false){
        return
        }
        
        var email = document.getElementById("email").value;
        Forms.UpdateValue("franchise", "email", email,true);
        Forms.UpdateValue("franchise", "city", Franchises.citylang,true); 
        
        for(var s in Forms.Form.franchise.fields){			
		Forms.Form.franchise.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.franchise.fields[s].value)))
		Forms.Form.franchise.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.franchise.fields[s].ivalue)))
        
        Forms.Form.franchise.fields[s].value = Forms.Form.franchise.fields[s].value.split("+").join("@@");
		Forms.Form.franchise.fields[s].ivalue = Forms.Form.franchise.fields[s].ivalue.split("+").join("@@");
		}    

        $.post("lib/franchises.php", "f=SaveFranchiseAvailabilityCheck&data=" + JSON.stringify(Forms.Form.franchise), function (d) {
        if(d){
        alert(d+" "+"-"+"City name already exist");
        for(var s in Forms.Form.franchise.fields){			
			Forms.Form.franchise.fields[s].value = decodeURIComponent(escape(Forms.Form.franchise.fields[s].value))
			Forms.Form.franchise.fields[s].ivalue = decodeURIComponent(escape(Forms.Form.franchise.fields[s].ivalue))
            
            Forms.Form.franchise.fields[s].value = Forms.Form.franchise.fields[s].value.split("@@").join("+");
			Forms.Form.franchise.fields[s].ivalue = Forms.Form.franchise.fields[s].ivalue.split("@@").join("+");
		}
        
        }else{
        
        Franchises.Save();
        
        }

        });
        
},        

    
    Save: function () {
        

  		
        $.post("lib/franchises.php", "f=SaveFranchise&data=" + JSON.stringify(Forms.Form.franchise), function (a) {
       	 Popup.Close();
         Franchises.Main()
        });
        

        Forms.Clean("franchise")
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
        	alert("<?=$lang_resource['CITY_SUPER_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
        $.fn.jAlert({
			'message': '<?=$lang_resource['CITY_SUPER_DELETE_MSG']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/franchises.php", "f=DeleteFranchise&data=" + JSON.stringify(a), function (d) {
						
				
						alert('<?=$lang_resource['CITY_SUPER_DELETE_SUCCESS']?>');
                        Franchises.Main()
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
    }
};
