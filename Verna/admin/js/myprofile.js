var Myprofile = {
	
		EditProfile: function (val) {
			Myprofile.namelang = Array();
			Myprofile.lastnamelang = Array();
			Myprofile.lastnametwolang = Array();
			Myprofile.addresslang = Array();
			Myprofile.joblang = Array();
	 
            var c = this;
            Main.Loading();
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserData","id":"' + Main.User.id + '"}]', "Myprofile.PreEdit")
       
    },
	
	 PreEdit: function (a) {
		
	 var g = false;	
		
		
    //$('div[id*=newpopup]').remove();
	
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Franchises = a.franchises;
        Main.Countries = a.countries;
        this.Form(a.user)
    },
	
	show_id: function(id){
		var b = document.getElementById("country").value;
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
					
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.business.fields.country.value = "";                   
                }
                
                
             }
        });
		var v = document.getElementById("city").value;
    	 $.post("lib/business.php", "f=FetchAllCityIDData&data=" + id+"&countryid="+b, function (g) {		
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
       Forms.Clean("user", "mainbuttonok");
       
        GoogleMap.Clean();
		
		g = true;
		Forms.Form.user.type = "modify";
		Forms.Form.user.id = e.id
			
		
       var j = "";
		
		j +='<div class="row">'
        j +='<div class="top-bar">'
                        
        j +='<div class=" col-md-6 col-md-offset-6">'
                       
        j +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="Myprofile.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_SITESECTION_SAVE']?></button>&nbsp;' 
                                    
                                   
        j +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Orders.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_SITESECTION_CANCEL']?></button></div>'
                    
        j +='</div>'<!--col-md-5-->
                                                            
        j +='</div>'<!--top-bar-->
        j +='</div>'
		
		
		j +='<div class="panel panel-danger panel-no-border">'
        j +='<div class="panel-heading panel-heading-2" style="padding: 10px 15px 10px 15px !important;">'                   
        j +='<div class="row">'
        j +='<div class="col-md-6">'
        j +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_DRIVER_PROFILE_EDIT_PROFILE']?></h3>'
        j +='</div>'<!--col-md-5-->
                            
        j +='<div class="col-md-3">'
            					
        j +='</div>'<!--col-md-3-->
                            
        j +='<div class="col-md-3">'
								
        j +='</div>'<!--col-md-4-->
                            
        j +='</div>'<!--row-->
		
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
		
		

        j +='</div>'
        j +='<div class="panel-body">'
		
		j +='<div class="row">'
        j +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].opdefault == 1){    
                Myprofile.langdefault = flaginfo[Z].id;                             
                j+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Myprofile.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                j+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Myprofile.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        j +='</ul>'
        j +='</div>'
        <!--row-->
		
        j +='<div class="row">'
        j +='<div class="col-md-2">'
		
		j +='<div class="form-control user-img">'        
        j += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >';
        j += '<input id="uploadImage" type="file"  class="user_pic"  name="uploadImage" onChange="Myprofile.PreviewImage();" >'
	    j += '<input id="showImage" name="showImage" type="hidden" value=""  />';
		j += '<input type="submit" name="submit" onclick="Myprofile.triggerImageupload()" style="display:none" />';
		j += '</form>';
        j +='<img id="uploadPreview" src="' + A + '"  >'
        j +='</div>'
		

        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-10">'
        j +='<div class="form-control user-map usermapbox" id="mapbox">'        
        j +='</div>'
        j +='</div>'<!--col-md-8-->
        j +='</div>'<!--row-->
                    
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_NAME']?> *</label>'
		
		Forms.CreateValue("user", "name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){            
                if(flaginfo[p].id == Myprofile.langdefault){   
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Myprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="Myprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            
        }
		
        //j +=Forms.CreateInputPropertyAdmin("user", "name", e.name, true,"Myprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_IS_REQUIRED']?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_ORDER_MIDDLE_NAME']?> </label>'
		
		Forms.CreateValue("user", "lastname2", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){            
                if(flaginfo[p].id == Myprofile.langdefault){   
                    j +='<input type="text" id="lastname2_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname2[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="lastname2_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.lastname2[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            
        }
		
        //j +=Forms.CreateInputPropertyPopup("user", "lastname2", e.lastname2, false)
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_LASTNAME']?> *</label>'
		
		Forms.CreateValue("user", "lastname", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){            
                if(flaginfo[p].id == Myprofile.langdefault){   
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" onkeyup="Myprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" onkeyup="Myprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            
        }
		
        //j +=Forms.CreateInputPropertyAdmin("user", "lastname", e.lastname, true,"Myprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="lastname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_LAST_NAME_REQUIRED']?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row-->  
                    
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_EMAIL_DRIVER_EMAIL']?> *</label>'
        j +=Forms.CreateInputPropertyAdmin("user", "email", e.email, true,"Myprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL']?></small>'
        j +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID']?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_DRIVER_PASSWORD']?> *</label>'
        if (g) {
			
        j +=Forms.CreateInputPropertyAdmin("user", "pwd", e.pwd, false, "Myprofile.PreValidation()", false, true)
		j +='<small data-bv-validator="notEmpty" class="help-block" id="pwd_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PWD_DM']?></small>'
        }else {
        j +=Forms.CreateInputPropertyAdmin("user", "pwd", e.pwd, true)
        }
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_ADDRESS']?> *</label>'
		
		Forms.CreateValue("user", "street", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
           
                if(flaginfo[p].id == Myprofile.langdefault){   
                    j +='<input type="text" id="street_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);Myprofile.PreValidation()" value="'+Main.NullToEmpty(e.street[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="street_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);Myprofile.PreValidation()" value="'+Main.NullToEmpty(e.street[flaginfo[p].id])+'" style="display:none;" />' 
                }  
              
        }
		
        //j +=Forms.CreateInputPropertyAdmin("user", "street", e.street, true, "GoogleMap.UpdateUserPosition(this);Myprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="street_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ADDRESS_DM']?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row--> 
                    
        j +='<div class="row">'
       
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE__DRIVER_GROUP_ZIPCODE']?></label>'
        j +=Forms.CreateInputPropertyAdmin("user", "cp", e.cp, false)
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		
		
		
		
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
        j +='<label><?=$lang_resource['SEARCH_STATISTICS_COUNTRY']?> *</label>'
		j +=Forms.CreateSelectPropertyAdmin("user", "country", c, Main.NullToEmpty(e.country), true, "Myprofile.CountrySelected(this);GoogleMap.UpdateUserPosition(this);Myprofile.PreValidation()")
        j +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_COUNTRY']?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		
		 j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_TAB_CITY']?> *</label>'
		j +=Forms.CreateSelectPropertyAdmin("user", "city", [], Main.NullToEmpty(e.city), true, "Myprofile.CitySelected(this);GoogleMap.UpdateUserPosition(this);Myprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_CITY']?></small>'
        
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		
		
		
		
        j +='</div>'<!--row--> 
                    
        j +='<div class="row">'
       
		
		 j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_NEIGHBORHOOD']?></label>'
      //  j +=Forms.CreateInputPropertyAdmin("user", "colony", e.colony, false, "GoogleMap.UpdateUserPosition(this)")
	     j +=Forms.CreateSelectPropertyPopup("user", "colony", [], Main.NullToEmpty(e.colony), true, "GoogleMap.UpdateUserPosition(this)")
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		
		
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ORDER_DETAILS_BUYER_PHONE']?></label>'
        j +=Forms.CreateInputPropertyAdmin("user", "tel", e.tel, false)
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_DRIVER_MOBILE']?></label>'
        j +=Forms.CreateInputPropertyAdmin("user", "cel", e.cel, false)
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row--> 
                    
        j +='<div class="row">'
        j +='<div class="col-md-12">'
        j +='<div class="form-group">'
        j += '<label><?=$lang_resource['ADMIN_PAGE_USER_OCUPATION']?></label>'
		
		Forms.CreateValue("user", "job", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){           
                if(flaginfo[p].id == Myprofile.langdefault){   
                    j +='<input type="text" id="job_'+flaginfo[p].id+'" class="form-control" value="'+Main.NullToEmpty(e.job[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="job_'+flaginfo[p].id+'" class="form-control" value="'+Main.NullToEmpty(e.job[flaginfo[p].id])+'" style="display:none;" />' 
                }  
                 
        }
		
        //j +=Forms.CreateInputPropertyAdmin("user", "job", e.job, false)
        j +='</div>'
        j +='</div>'<!--col-md-6-->
                        
        j +='</div>'<!--row-->           
        j +='</div>'<!-- /.panel-body -->
        j +='</div>'
                   
		j +='</div>'
		Forms.CreateValue("user", "level", Main.User.level, true, true);
		 if (g) {
           Myprofile.PopulateNeighborhoodSelect(e.city,e.colony)
		    Myprofile.PopulateCitySelect(e.country, e.city)		
        }
		
       
        
		
		
		
		var g = false;
        
        
		$("#main").empty().append(j);
         
        
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
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, Myprofile.LocationUpdated);
        if (g) {
            Myprofile.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
    },
	 CountrySelected: function (a) {
		 
        Myprofile.PopulateCitySelect(a.options[a.selectedIndex].value)
		
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
	
	PreValidation: function(){
		
   	var count = 0;	
    
		flaginfo=Main.languageinfo
        for(Z in flaginfo){ 
			 if(flaginfo[Z].id == Myprofile.langdefault){                  
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
				if(document.getElementById("lastname_"+flaginfo[Z].id).value == ""){
				$("#lastname_text").show();
				$("#lastname_"+flaginfo[Z].id).addClass("error-text-field");
				$("#lastname_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{ 
				$("#lastname_text").hide();
				$("#lastname_"+flaginfo[Z].id).addClass("success-text-field");
				$("#lastname_"+flaginfo[Z].id).removeClass("error-text-field");
			} 
			if(document.getElementById("street_"+flaginfo[Z].id).value == ""){
				//alert(1);
				$("#street_text").show();
				$("#street_"+flaginfo[Z].id).addClass("error-text-field");
				$("#street_"+flaginfo[Z].id).removeClass("success-text-field");
				count ++;
			}else{
				$("#street_text").hide();
				$("#street_"+flaginfo[Z].id).addClass("success-text-field");
				$("#street_"+flaginfo[Z].id).removeClass("error-text-field");
			}       
         }  
			
			        
		
			var namedata = document.getElementById("name_"+flaginfo[Z].id).value;
            Myprofile.namelang[flaginfo[Z].id] = namedata;
			
			var lastnamedata = document.getElementById("lastname_"+flaginfo[Z].id).value;
            Myprofile.lastnamelang[flaginfo[Z].id] = lastnamedata;
			
			var lastname2data = document.getElementById("lastname2_"+flaginfo[Z].id).value;
            Myprofile.lastnametwolang[flaginfo[Z].id] = lastname2data;
			
			var addressdata = document.getElementById("street_"+flaginfo[Z].id).value;
            Myprofile.addresslang[flaginfo[Z].id] = addressdata;
			
			var jobdata = document.getElementById("job_"+flaginfo[Z].id).value;
            Myprofile.joblang[flaginfo[Z].id] = jobdata;
	}
	
    	
        
       
        
		var a = document.getElementById("email");
        var b = a.value;
	//alert(b)
        if(b == ""){ 
        	
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
		
		if(document.getElementById("pwd").value == ""){ 
			//alert(1);
            $("#pwd_text").show();
            $("#pwd").addClass("error-text-field");
            $("#pwd").removeClass("success-text-field");
            count ++;
        }else{
        	$("#pwd_text").hide();
            $("#pwd").addClass("success-text-field");
            $("#pwd").removeClass("error-text-field");
        }
		
		
		if(document.getElementById("city").value == ""){
			//alert(1);
            $("#city_text").show();
            $("#city").addClass("error-text-field");
            $("#city").removeClass("success-text-field");
            count ++;
        }else{
        	$("#city_text").hide();
            $("#city").addClass("success-text-field");
            $("#city").removeClass("error-text-field");
        }
		
		if(document.getElementById("country").value == ""){
			//alert(1);
            $("#country_text").show();
            $("#country").addClass("error-text-field");
            $("#country").removeClass("success-text-field");
            count ++;
        }else{
        	$("#country_text").hide();
            $("#country").addClass("success-text-field");
            $("#country").removeClass("error-text-field");
        }
		
		
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
	HomeUrl: function () {
     window.location="./";
    },
	LocationUpdated: function (a) {
        Forms.UpdateValue("user", "location", JSON.stringify(a), true);
        if (Forms.CanSave("user")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
	
	 Save: function () {
     
         
		 if(Myprofile.PreValidation() == false){
            return
         }
         
		Forms.UpdateValue("user", "name", Myprofile.namelang,true); 
		Forms.UpdateValue("user", "lastname", Myprofile.lastnamelang,true); 
		Forms.UpdateValue("user", "lastname2", Myprofile.lastnametwolang,true);
		Forms.UpdateValue("user", "street", Myprofile.addresslang,true); 
		Forms.UpdateValue("user", "job", Myprofile.joblang,true); 
        /*if (Forms.CanSave("user") == false) {
            return
        }
        */
    if(document.getElementById("showImage").value !="") {
      Forms.Form.user.image = document.getElementById("showImage").value;
    }
		
		for(var s in Forms.Form.user.fields){			
			Forms.Form.user.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.user.fields[s].value)))
			Forms.Form.user.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.user.fields[s].ivalue)))
		}
		
	   Main.Loading();
       Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), "Main.HomeUrl()")
       Main.Ready();
       Forms.Clean("user");
       GoogleMap.Clean()

       //Myprofile.HomeUrl();
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
	
	
};