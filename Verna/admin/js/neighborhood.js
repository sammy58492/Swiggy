var Neighborhood ={
    Main: function(){
        Neighborhood.namelang = Array();
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("lib/neighborhood.php", "f=FetchAllNeighborhoodData", function (a) { 
            if (b != Main.Aid)
                {
                    return
                }       
            Main.Ready();
            a = JSON.parse(a);    
            Neighborhood.Neighborhoodlist = a;
            Neighborhood.Neighborhoodlist.sort(Main.SortByProperty("name"));
            Neighborhood.PrintMain();              
        });               
       
    },
    
    PrintMain: function(){
        var c = "";
        c+= '<div class="row">'
        c+= '<div class="top-bar">'
        c+= '<div class=" col-md-6 col-md-offset-6">'
        c+= '<div class=" pull-right">'
        c+= '<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
        c+= '</div>'
        <!--col-md-5-->
        c+= '</div>'
        <!--top-bar-->
        c+= '</div>'
        c+= '<div class="panel panel-danger panel-square panel-no-border">'
        c+= '<div class="panel-heading panel-heading-2">'
        c+= '<div class="row">'
        c+= '<div class="col-md-4">'
        c+= '<h3 class="panel-title-2"><?=$lang_resource['ORDER_DETAILS_BUYER_NEIGHBORHOOD']?></h3>'
        c+= '</div>'
        <!--col-md-5-->
        c+= '<div class="col-md-3">'
        c+= '<div class="panel-btn filtr_margin">'
        c+= '<input type="text" id="neighborhoodlistsearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+= '</div>'
        c+= '</div>'
        <!--col-md-3-->
        c+= '<div class="col-md-5">'
        c+= '<div class="panel-btn pull-right">'
        c+= '<div class="inline-popups ">'
        c+= '<span class=" panel-btn-2">'
        c+= '<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Neighborhood.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c+= '</span>'
        c+= '<span class=" panel-btn-2">'
        c+= '<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Neighborhood.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c+= '</span>'
        c+= '<span class=" panel-btn-2">'
        c+= '<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Neighborhood.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
        c+= '</div>'
        
        c+= '</div>'
        c+= '</div>'
        <!--col-md-4-->
        c+= '</div>'
        <!--row-->
        c+= '</div>'
        c+= '<div class="panel-body">'
        c+= '<div class="table-responsive">'
        c+= '<table class="table table-th-block table-striped">'
        c+= '<thead>'
        c+= '<tr>'
        c+= '<th width="10%"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ID']?></th>'
        c+= '<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'neighborhood\')"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ALL']?></th>'
        c+= '<th width="25%"><?=$lang_resource['ORDER_EMAIL_DRIVER_NAME']?></th>'
        c+= '<th width="20%"><?=$lang_resource['ADMIN_PAGE_COUNTRY']?></th>'
        c+= '<th width="25%"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_CITY']?></th>'        
        c+= '<th width="10%"><?=$lang_resource['ADMIN_PAGE_DRIVER_ENABLE']?></th>'
        c+= '</tr>'
        c+= '</thead>'
        c+= '<tbody id="neighborhoodlist">'
        
        c+= '</tbody>'
        c+= '</table>'
        c+= '</div>'
        <!--table-responsive-->
        c+= '</div>'
        <!-- /.panel-body -->
        c+= '</div>'
        document.getElementById("main").innerHTML = c;
        document.getElementById("neighborhoodlistsearch").onkeyup = function () {         
            Neighborhood.NeighborhoodTable("id", true)
        };
        Neighborhood.NeighborhoodTable("id", true)
    },
    
    NeighborhoodTable: function (b, c) {
        var d = "";
        var a = Neighborhood.Neighborhoodlist.length;
        var h = false;
        var f = "";
        var k = new Array(); 
        
        for (var e in Neighborhood.Neighborhoodlist) {      
            
            h = false;
            f = document.getElementById("neighborhoodlistsearch").value.toLowerCase();
            if (String(Neighborhood.Neighborhoodlist[e].id).toLowerCase().indexOf(f) >= 0 || String(Neighborhood.Neighborhoodlist[e].name).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(Neighborhood.Neighborhoodlist[e])
            }
            if (h) {
                d += '<tr>'
                d += '<td>'+ Neighborhood.Neighborhoodlist[e].id +'</td>'
                d += '<td><input type="checkbox" class="checkbox neighborhood" value="' + Neighborhood.Neighborhoodlist[e].id + '"></td>'
                d += '<td class="hand" onclick="Neighborhood.Edit(' + Neighborhood.Neighborhoodlist[e].id + ')">'+ Neighborhood.Neighborhoodlist[e].name +'</td>'
                d += '<td class="hand" onclick="Neighborhood.Edit(' + Neighborhood.Neighborhoodlist[e].id + ')">'+ Neighborhood.Neighborhoodlist[e].countryname +'</td>'
                d += '<td>'+ Neighborhood.Neighborhoodlist[e].cityname +'</td>'
                d += '<td><div class="enebal" id="switchneighborhood_' + Neighborhood.Neighborhoodlist[e].id + '"></div></td>'              
                d += '</tr>'   
            }
        }
       
        document.getElementById("neighborhoodlist").innerHTML = d;
        
        var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != Neighborhood.Neighborhoodlist.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                
                Switch.Create("switchneighborhood_" + k[e].id, g);
                Switch.OnChange("switchneighborhood_" + k[e].id, function (m, l) {
                Neighborhood.SetEnabled(m.replace("switchneighborhood_", ""), l)
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
        $.post("lib/neighborhood.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
        
            if (c != "ok") {
                Switch.SwitchTo("switchneighborhood_" + b, !a)
            }
        })
    },
    
    Edit: function (a, b) {
        
        var e = false;
        if (a) {
            e = true;
            Visuals.ForceMainButtonCancelEvent = b;
            Neighborhood.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValuesByClass('neighborhood');           
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
            Neighborhood.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            $.post("lib/neighborhood.php", "f=FetchAllCountriesData", function (d) {
                Neighborhood.country=JSON.parse(d);
                
            });
            //Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "Neighborhood.PreEdit")
         $.post("lib/neighborhood.php", "f=FetchAllNeighborhoodIDData&data=" + a, function (b) {
             b = JSON.parse(b);    
            Neighborhood.cdata = b;
            Neighborhood.PreEdit()
                });

            
        }
    },
    
    PreEdit: function (b) {
        if (Neighborhood.cdata == "") {
            alert("Error")
        }
       // b = JSON.parse(b); 
        Main.Countries = Neighborhood.country;
        this.Form(Neighborhood.cdata)
    },
    
    New: function () {
        Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "Neighborhood.PreNew")
    },
    PreNew: function (a) {
        if (a == "") {
            alert("Error")
        }
       
        Main.Countries = JSON.parse(a).countries;
        this.Form()
    },
    
    show_id: function(id){
        var b = document.getElementById("country").value;
         $.post("lib/neighborhood.php", "f=FetchAllCountriesIDData&data=" + id, function (d) {      
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
                    Forms.Form.neighborhood.fields.country.value = "";                   
                }
                
                
             }
        });
        var v = document.getElementById("city").value;
         $.post("lib/neighborhood.php", "f=FetchAllCityIDData&data=" + id+"&countryid="+b, function (g) {       
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
                    
                    e.options[e.options.length] = new Option(m[d].city, m[d].id)
                }
                
                if (v && j) {               
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.neighborhood.fields.city.value = "";                   
                }
                
                
             }
        });
        
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
    },
    
    Form: function (e) {  
        Forms.Clean("neighborhood", "mainbuttonok");
        if (e == null) {            
            e = new Object();
            Forms.Form.neighborhood.type = "create";
            Forms.Form.neighborhood.id="";
        } else {
            g = true;
            Forms.Form.neighborhood.type = "modify";
            Forms.Form.neighborhood.id = e.id; 
            Neighborhood.PopulateCitySelect(Main.NullToEmpty(e.country),Main.NullToEmpty(e.city))          
        }
        
        var k = "";
        if (Forms.Form.neighborhood.type == "create") {
        k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_CREATE_NEIGHBORHOOD']?></h3>'
        }else{
        k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_EDIT_NEIGHBORHOOD']?></h3>' 
        }
        
        
        k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Neighborhood.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Neighborhood.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
               k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Neighborhood.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->
        
        
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['SEARCH_STATISTICS_COUNTRY']?> *</label>'
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
        k += Forms.CreateSelectPropertyPopup("neighborhood", "country", c, Main.NullToEmpty(e.country), true, "Neighborhood.CountrySelected(this),Neighborhood.PreValidation();")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_REQUIRED_COUNTRY']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        <!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ORDER_SEARCH_TITLE']?> *</label>'
        k += Forms.CreateSelectPropertyPopup("neighborhood", "city", [], Main.NullToEmpty(e.city), true,"Neighborhood.PreValidation()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_REQUIRED_COUNTRY']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        <!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_NEIGHBORHOOD']?> *</label>'
        
        Forms.CreateValue("neighborhood", "name", "",true)
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.neighborhood.type == "create") {
                if(flaginfo[p].id == Neighborhood.langdefault){   
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Neighborhood.PreValidation()" class="form-control" value="" />' 
                }else{
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Neighborhood.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Neighborhood.langdefault){   
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Neighborhood.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Neighborhood.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
        
        //k += Forms.CreateInputPropertyPopup("neighborhood", "name", e.name, false,"Neighborhood.PreValidation()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_ORDER_NOTIFICATION_Neighborhood_NAME_REQUIRED']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        <!--row-->        
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
        if (Forms.Form.neighborhood.type == "create") {
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Neighborhood.Save()"><?=$lang_resource['CITY_SUPER_CREATE_FIELD_CREATE']?></button></center>'
        }else{
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Neighborhood.Save()"><?=$lang_resource['CITY_SUPER_CREATE_FIELD_EDIT']?></button></center>'    
        }
        k +='</div>'
        <!--col-md--->
        k +='</div>'
        <!--row-->
        k +='</div>'
        Popup.Show(k);
        /*if (g) {
            Neighborhood.PopulateCitySelect(e.country, e.city)
        }*/
    },
    
    CountrySelected: function (a) {
        Neighborhood.PopulateCitySelect(a.options[a.selectedIndex].value)
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
                    
                    Forms.Form.neighborhood.fields.city.value = "";
                    
                }
            }
        })
    },
    
    PreValidation: function(){
    var count = 0;  
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
        
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Neighborhood.langdefault){
        if(document.getElementById("name_"+flaginfo[Z].id).value == ""){            
            $("#name_text").show();
            $("#name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
            $("#name_text").hide();
            $("#name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#name_"+flaginfo[Z].id).removeClass("error-text-field");
        }
        
        }
        
            var namedata = document.getElementById("name_"+flaginfo[Z].id).value;
            Neighborhood.namelang[flaginfo[Z].id] = namedata;
            
    }
        if(count == 0)
            return true
        else 
            return false       
       
    },
    
    Save: function () {
        
        if(Neighborhood.PreValidation() == false){
            return
        }
        Forms.UpdateValue("neighborhood", "name", Neighborhood.namelang,true); 
        
        for(var s in Forms.Form.neighborhood.fields){           
            Forms.Form.neighborhood.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.neighborhood.fields[s].value)))
            Forms.Form.neighborhood.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.neighborhood.fields[s].ivalue)))
            Forms.Form.neighborhood.fields[s].value = Forms.Form.neighborhood.fields[s].value.split("+").join("@@");
            Forms.Form.neighborhood.fields[s].ivalue = Forms.Form.neighborhood.fields[s].ivalue.split("+").join("@@");
        } 
        
       Main.Request("neighborhood", null, "f=SaveNeighborhoodData&data=" + JSON.stringify(Forms.Form.neighborhood), "Neighborhood.Main()")
       Popup.Close(); 
       Forms.Clean("neighborhood");
  
    },
    
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValuesByClass('neighborhood');
        if (b.length == 0) {
            alert("<?=$lang_resource['ADMIN_PAGE_PLEASE_SELECT_AT_LEAST_ONE_ITEM']?>");
            return
        }
        var a = new Object();
        a.ids = b;
        
        $.fn.jAlert({
            'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                    $.post("lib/neighborhood.php", "f=DeleteNeighborhood&id=" + JSON.stringify(a), function (e) {
                        Neighborhood.Main()
                        alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
                    
                    });
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false
            
            });     
    
    },
    
};