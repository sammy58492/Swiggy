var CountrySettings={
	Main: function(){
        CountrySettings.namelang = Array();
		var b = new Date().getTime();
        Main.Aid = b;
		$.post("lib/countrysettings.php", "f=FetchAllCountriesData", function (a) {
			if (b != Main.Aid)
                {
                    return
                }		
			Main.Ready();
			
            a = JSON.parse(a);    
            CountrySettings.Countries = a;
            CountrySettings.PopulateTable();               
        });	
	},
	PopulateTable: function(){
		var c = "";
		c+= '<div class="row">'
        c+= '<div class="top-bar">'
        c+= '<div class=" col-md-6 col-md-offset-6">'
        c+= '<div class=" pull-right">'
		c+= '<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['BUSINESS_CANCEL'] ?></button></div>'
        c+= '</div>'
		<!--col-md-5-->
        c+= '</div>'
		<!--top-bar-->
        c+= '</div>'
		c+= '<div class="panel panel-danger panel-square panel-no-border">'
		c+= '<div class="panel-heading panel-heading-2">'
        c+= '<div class="row">'
        c+= '<div class="col-md-4">'
        c+= '<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_COUNTRIES'] ?></h3>'
        c+= '</div>'
		<!--col-md-5-->
        c+= '<div class="col-md-3">'
        c+= '<div class="panel-btn filtr_margin">'
        c+= '<input type="text" id="countrylistsearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+= '</div>'
        c+= '</div>'
		<!--col-md-3-->
        c+= '<div class="col-md-5">'
		c+= '<div class="panel-btn pull-right">'
        c+= '<div class="inline-popups ">'
        c+= '<span class=" panel-btn-2">'
        c+= '<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:CountrySettings.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD'] ?></a>'
        c+= '</span>'
        c+= '<span class=" panel-btn-2">'
        c+= '<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:CountrySettings.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT'] ?></a>'
        c+= '</span>'
        c+= '<span class=" panel-btn-2">'
        c+= '<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="CountrySettings.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE'] ?></button></span>'
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
        c+= '<th width="25%"><?=$lang_resource['ADMIN_PAGE_COUNTRY_ID'] ?></th>'
		c += '<th width="30%" onclick="Main.ToogleAllCheckBoxes(\'countrysetting\')"><?=$lang_resource['ADMIN_PAGE_ALL'] ?></th>'
        c+= '<th width="30%"><?=$lang_resource['ADMIN_PAGE_COUNTRY_NAME'] ?></th>'
		c+= '<th width="30%"><?=$lang_resource['ADMIN_PAGE_COUNTRY_ENABLED'] ?></th>'
        c+= '</tr>'
		c+= '</thead>'
		c+= '<tbody id="countrylist">'
		
		c+= '</tbody>'
		c+= '</table>'
        c+= '</div>'
		<!--table-responsive-->
        c+= '</div>'
		<!-- /.panel-body -->
		c+= '</div>'
		document.getElementById("main").innerHTML = c;
		document.getElementById("countrylistsearch").onkeyup = function () {         
            CountrySettings.CountryTable("id", true)
        };
		CountrySettings.CountryTable("id", true)
	},
	
	    CountryTable: function (b, c) {
    
        var d = "";
        var a = CountrySettings.Countries.length;

        var h = false;
        var f = "";
        var k = new Array();        
      
        for (var e in CountrySettings.Countries) {      
       		
            h = false;
            f = document.getElementById("countrylistsearch").value.toLowerCase();
            if (String(CountrySettings.Countries[e].id).toLowerCase().indexOf(f) >= 0 || String(CountrySettings.Countries[e].name).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(CountrySettings.Countries[e])
            }
            if (h) {
    			d += '<tr>'
    			d += '<td>'+ CountrySettings.Countries[e].id +'</td>'
    			d += '<td><input type="checkbox" class="checkbox countrysetting" value="' + CountrySettings.Countries[e].id + '"></td>'
    			d += '<td style="cursor:pointer;" onclick="CountrySettings.Edit(' + CountrySettings.Countries[e].id + ')">'+ CountrySettings.Countries[e].name +'</td>'    	
				d +='<td><div class="enebal" id="switch_' + CountrySettings.Countries[e].id + '"></div></td>' 		
    			d += '</tr>'   
            }
        }
       
        document.getElementById("countrylist").innerHTML = d;
			 var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != CountrySettings.Countries.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
				
                Switch.Create("switch_" + k[e].id, g);
                Switch.OnChange("switch_" + k[e].id, function (m, l) {
                    CountrySettings.SetEnabled(m.replace("switch_", ""), l)
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
        $.post("lib/countrysettings.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
        
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
            CountrySettings.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValuesByClass('countrysetting');           
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
            CountrySettings.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
         $.post("lib/countrysettings.php", "f=FetchAllCountriesIDData&data=" + a, function (b) {
			 b = JSON.parse(b);    
            CountrySettings.cdata = b;
						CountrySettings.PreEdit()
				});

            
        }
    },

    PreEdit: function (b) {
	
        if (CountrySettings.cdata == "") {
            alert("Error")
        }
       // b = JSON.parse(b); 
    	
        this.Form(CountrySettings.cdata)
    },

    New: function () {
		CountrySettings.Form();
    },
	
	    Form: function (e) {  
		
        Forms.Clean("country", "mainbuttonok");
        if (e == null) {     		
            e = new Object();
            Forms.Form.country.type = "create";
            Forms.Form.country.id="";
        } else {
            g = true;
            Forms.Form.country.type = "modify";
            Forms.Form.country.id = e.id;  
            CountrySettings.langid = e.langid;

        }	
       
        Forms.CreateValue("country", "name", "",true)
        var k = "";
		if (Forms.Form.country.type == "create") {
		k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_CREATE_COUNTRY'] ?></h3>'
		}
		else
		{
		k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_EDIT_COUNTRY'] ?></h3>'	
		}

        //alert(JSON.stringify(Main.languageinfo))

        k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                CountrySettings.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="CountrySettings.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="CountrySettings.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->


        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_COUNTRY'] ?> *</label>'
        flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.country.type == "create") {
                if(flaginfo[p].id == CountrySettings.langdefault){   
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" />' 
                }else{
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == CountrySettings.langdefault){   
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="name_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		/*k +=Forms.CreateInputPropertyPopup("country", "name",Main.NullToEmpty(e.name), true, "CountrySettings.PreValidation()",false, false)*/
		k +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_COUNTRY_IS_REQUIRED'] ?></small>'
        k +='<small data-bv-validator="notEmpty" class="help-block" id="name_text_d" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_COUNTRY_NAME_ALREADY_REGISTRE'] ?></small>'
        k +='</div>'
        k +='</div>'
        k +='</div>'
		<!--row--> 

		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.country.type == "create") {
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="CountrySettings.PreSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE'] ?></button></center>'
		}else{
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="CountrySettings.PreSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE'] ?></button></center>'	
		}
		k +='</div>'
		<!--col-md--->
		k +='</div>'
		<!--row-->
		k +='</div>'
		Popup.Show(k);

   },
    show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
    },
   PreValidation: function(){
   	var count = 0;  
    
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == CountrySettings.langdefault){                  
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
            /*var c = document.getElementById("name_"+flaginfo[Z].id).value;
            if (Forms.Form.country.type == "create") {
                $.post("lib/countrysettings.php", "f=GetNameAvailability&data=" + c , function (e) {
                    if(e==1){
                        $("#name_text_d").show();
                        $("#name_"+flaginfo[Z].id).addClass("error-text-field");
                        $("#name_"+flaginfo[Z].id).removeClass("success-text-field");
                        count ++;                
                    }else{
                        $("#name_text_d").hide();
                        $("#name_"+flaginfo[Z].id).addClass("success-text-field");
                        $("#name_"+flaginfo[Z].id).removeClass("error-text-field");
                    }        
                });
            }else{
                var langid = CountrySettings.langid[flaginfo[Z].id];
                if(langid){
                    $.post("lib/countrysettings.php", "f=GetNameAvailabilityModified&data=" + c +"&langid="+langid, function (e) {
                        if(e==1){
                            $("#name_text_d").show();
                            $("#name_"+flaginfo[Z].id).addClass("error-text-field");
                            $("#name_"+flaginfo[Z].id).removeClass("success-text-field");
                            count ++;                
                        }else{
                            $("#name_text_d").hide();
                            $("#name_"+flaginfo[Z].id).addClass("success-text-field");
                            $("#name_"+flaginfo[Z].id).removeClass("error-text-field");
                        }        
                    });
                }                
            }*/
            var encodedata = document.getElementById("name_"+flaginfo[Z].id).value;
            CountrySettings.namelang[flaginfo[Z].id] = encodedata;
        }	
			
        if(count == 0)
        	return true
        else 
        	return false       
       
    },
	PreSave: function () {
        if(CountrySettings.PreValidation() !=true){

            return
        }
		Forms.UpdateValue("country", "name", CountrySettings.namelang,true); 
		for(var s in Forms.Form.country.fields){			
			Forms.Form.country.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.country.fields[s].value)))
			Forms.Form.country.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.country.fields[s].ivalue)))
			
			Forms.Form.country.fields[s].value = Forms.Form.country.fields[s].value.split("+").join("@@");
			Forms.Form.country.fields[s].ivalue = Forms.Form.country.fields[s].ivalue.split("+").join("@@");
		}  
     
		 $.post("lib/countrysettings.php", "f=SaveFranchiseAvailabilityCheck&data=" + JSON.stringify(Forms.Form.country), function (d) {//alert(d);
		
        if(d){
        alert("<?=$lang_resource['ADMIN_PANEL_MANAGELANGUAGE_COUNTRYNAME_EXIT'] ?>");
		
		for(var s in Forms.Form.country.fields){			
			Forms.Form.country.fields[s].value = decodeURIComponent(escape(window.atob(Forms.Form.country.fields[s].value)))
			Forms.Form.country.fields[s].ivalue = decodeURIComponent(escape(window.atob(Forms.Form.country.fields[s].ivalue)))
			
			Forms.Form.country.fields[s].value = Forms.Form.country.fields[s].value.split("@@").join("+");
			Forms.Form.country.fields[s].ivalue = Forms.Form.country.fields[s].ivalue.split("@@").join("+");
		}
        }else{
        
        CountrySettings.Save();
        
        }
   });
    },
	Save: function (a) {
       
	//alert(JSON.stringify(Forms.Form.country));
       Main.Request("countrysettings", null, "f=SaveCountry&data=" + JSON.stringify(Forms.Form.country), "CountrySettings.Main()")
       Popup.Close(); 
       Forms.Clean("country");
  
    },
	    Delete: function () {
		var b = Main.GetMarkedCheckBoxesValuesByClass('countrysetting');
        if (b.length == 0) {
			alert("<?=$lang_resource['ADMIN_PAGE_PLEASE_SELECT_AT_LEAST_ONE_ITEM'] ?>");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/countrysettings.php", "f=DeleteCountry&data=" + JSON.stringify(a), function (e) {
						CountrySettings.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});		
	
    },
	
};