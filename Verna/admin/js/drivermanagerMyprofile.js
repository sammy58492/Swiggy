var drivermanagerMyprofile = {
	
		EditProfile: function (val) {
			
			drivermanagerMyprofile.namelang = Array();
			drivermanagerMyprofile.lastnamelang = Array();
			drivermanagerMyprofile.lastnametwolang = Array();
			drivermanagerMyprofile.addresslang = Array();
			
	 
	 
        var c = this;
        Main.Loading();
		$.post("lib/panel-bulk.php", 'data=[{"operation":"FetchDrivermanagerIdByEmail","email":"' + Main.User.email + '"}]', function (c) {				
		if (c != "") {
		e = JSON.parse(c);
			
			
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDriverManagerData","id":"'  + e.drivermanagermail.id + '"}]', "drivermanagerMyprofile.PreEdit")
				}
        	})	
			
			
       
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
        this.Form(a.drivermanager)
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
	//	alert(JSON.stringify(e.name[1]))
       Forms.Clean("user", "mainbuttonok");
       
       // GoogleMap.Clean();
		
		g = true;
		Forms.Form.user.type = "modify";
		Forms.Form.user.id = e.id
			
		
       var j = "";
		
		j +='<div class="row">'
        j +='<div class="top-bar">'
                        
        j +='<div class=" col-md-6 col-md-offset-6">'
                       
        j +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="drivermanagerMyprofile.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_SAVE'] ?></button>&nbsp;' 
                                    
                                   
        j +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Orders.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_CANCEL'] ?></button></div>'
                    
        j +='</div>'<!--col-md-5-->
                                                            
        j +='</div>'<!--top-bar-->
        j +='</div>'
		
		
		j +='<div class="panel panel-danger panel-no-border">'
        j +='<div class="panel-heading panel-heading-2" style="padding: 10px 15px 10px 15px !important;">'                   
        j +='<div class="row">'
        j +='<div class="col-md-6">'
        j +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_DRIVER_PROFILE_EDIT_PROFILE'] ?></h3>'
        j +='</div>'<!--col-md-5-->
                            
        j +='<div class="col-md-3">'
            					
        j +='</div>'<!--col-md-3-->
                            
        j +='<div class="col-md-3">'
								
        j +='</div>'<!--col-md-4-->
                            
        j +='</div>'<!--row-->
		j +='</div>'
        j +='<div class="panel-body">'
		j +='<div class="row">'
        j +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].opdefault == 1){    
                drivermanagerMyprofile.langdefault = flaginfo[Z].id;                             
                j+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="drivermanagerMyprofile.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                j+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="drivermanagerMyprofile.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        j +='</ul>'
        j +='</div>'
                    
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Name *</label>'
		Forms.CreateValue("user", "name", "",true)
		flaginfo=Main.languageinfo;
		 for(p in flaginfo){            
                if(flaginfo[p].id == drivermanagerMyprofile.langdefault){   
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="drivermanagerMyprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="name_'+flaginfo[p].id+'" onkeyup="drivermanagerMyprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
		 }
            
        	j +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_IS_REQUIRED']?></small>'
      //  j +=Forms.CreateInputPropertyAdmin("user", "name", e.name[1], true,"drivermanagerMyprofile.PreValidation()")
		//j +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_IS_REQUIRED'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->

        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_LAST_NAME'] ?> *</label>'
		
		Forms.CreateValue("user", "lastname", "",true)
		flaginfo=Main.languageinfo;
		 for(p in flaginfo){            
                if(flaginfo[p].id == drivermanagerMyprofile.langdefault){   
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" onkeyup="drivermanagerMyprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="lastname_'+flaginfo[p].id+'" onkeyup="drivermanagerMyprofile.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.lastname[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            
        }
		j +='<small data-bv-validator="notEmpty" class="help-block" id="lastname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_LAST_NAME_REQUIRED']?></small>'
      /*  j +=Forms.CreateInputPropertyAdmin("user", "lastname", e.lastname[1], true,"drivermanagerMyprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="lastname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_LAST_NAME_REQUIRED'] ?></small>'*/
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Password *</label>'
        if (g) {
			
        j +=Forms.CreateInputPropertyAdmin("user", "pwd", e.pwd, false, "drivermanagerMyprofile.PreValidation()", false, true)
		j +='<small data-bv-validator="notEmpty" class="help-block" id="pwd_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_PASSWORD'] ?></small>'
        }else {
        j +=Forms.CreateInputPropertyAdmin("user", "pwd", e.pwd, true)
        }
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row-->  
                    
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Email *</label>'
		  j +=Forms.CreateInputPropertyAdmin("user", "email", e.email, true,"drivermanagerMyprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL']?></small>'
        j +='<small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID']?></small>'
       // j +=Forms.CreateInputPropertyAdminReadonly("user", "email", e.email, true)
        j +='</div>'
        j +='</div>'<!--col-md-4-->

        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Address *</label>'
		Forms.CreateValue("user", "address", "",true)
		flaginfo=Main.languageinfo;
		  for(p in flaginfo){
           
                if(flaginfo[p].id == drivermanagerMyprofile.langdefault){   
                    j +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);drivermanagerMyprofile.PreValidation()" value="'+Main.NullToEmpty(e.address[flaginfo[p].id])+'" />' 
                }else{
                    j +='<input type="text" id="address_'+flaginfo[p].id+'" class="form-control" onkeyup="GoogleMap.UpdateUserPosition(this);drivermanagerMyprofile.PreValidation()" value="'+Main.NullToEmpty(e.address[flaginfo[p].id])+'" style="display:none;" />' 
                }  
              
        }
      //  j +=Forms.CreateInputPropertyAdmin("user", "address", e.address[1], true, "drivermanagerMyprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="address_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_REQUIRED'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label><?=$lang_resource['ADMIN_PAGE__DRIVER_GROUP_ZIPCODE'] ?> *</label>'
		j +=Forms.CreateInputPropertyAdmin("user", "cp", e.cp, true, "drivermanagerMyprofile.PreValidation()")
        j +='<small data-bv-validator="notEmpty" class="help-block" id="cp_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_ZIP_CODE'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row--> 
                    
        j +='<div class="row">'
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
        j +='<label><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_COUNTRY'] ?> *</label>'
		j +=Forms.CreateSelectPropertyAdmin("user", "country", c, Main.NullToEmpty(e.country), true, "drivermanagerMyprofile.CountrySelected(this);drivermanagerMyprofile.PreValidation()")
        j +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_COUNTRY_REQUIRED_CANT'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>City *</label>'
		j +=Forms.CreateSelectPropertyAdmin("user", "city", [], Main.NullToEmpty(e.city), true, "drivermanagerMyprofile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_COUNTRY_REQUIRED'] ?></small>'
        
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Mobile *</label>'
		j +=Forms.CreateInputPropertyAdmin("user", "cel", Main.NullToEmpty(e.cel), true, "drivermanagerMyprofile.PreValidation()", false, false, "return Main.IsNumberKey(event)")
        j +='<small data-bv-validator="notEmpty" class="help-block" id="cel_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_REQUIRED_MOBILE'] ?></small>'
		j +='<small data-bv-validator="notEmpty" class="help-block" id="cel_text1" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_MOBILE_LENGTH'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row--> 
         
        j +='</div>'<!-- /.panel-body -->
        j +='</div>'
                   
		j +='</div>'
		$("#main").empty().append(j);
		
		//Forms.CreateValue("user", "level", Main.User.level, true, true);
		 if (g) {
           drivermanagerMyprofile.PopulateCitySelect(e.country, e.city)			
        }
		
       
        
		
		
		
		var g = false;
        
        
		
         
        
       /* Forms.CreateValue("user", "location", e.location);
        var f;
        if (e.location == "" || e.location == null) {
            f = new Object();
            f.latitud = 23.634501;
            f.longitud = -102.552784;
            f.zoom = 4
        } else {
            f = JSON.parse(e.location)
        }*/
        //GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, drivermanagerMyprofile.LocationUpdated);
        if (g) {
            drivermanagerMyprofile.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
    },
	 CountrySelected: function (a) {
		 
        drivermanagerMyprofile.PopulateCitySelect(a.options[a.selectedIndex].value)
		
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
	
	PreValidation: function(){
		
  	var count = 0;	
    
		flaginfo=Main.languageinfo
        for(Z in flaginfo){ 
			 if(flaginfo[Z].id == drivermanagerMyprofile.langdefault){                  
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
			if(document.getElementById("address_"+flaginfo[Z].id).value == ""){
				//alert(1);
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
            drivermanagerMyprofile.namelang[flaginfo[Z].id] = namedata;
			
			var lastnamedata = document.getElementById("lastname_"+flaginfo[Z].id).value;
            drivermanagerMyprofile.lastnamelang[flaginfo[Z].id] = lastnamedata;
			
			
			var addressdata = document.getElementById("address_"+flaginfo[Z].id).value;
            drivermanagerMyprofile.addresslang[flaginfo[Z].id] = addressdata;
			
			
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
		if(document.getElementById("cel").value == ""){
			
            $("#cel_text").show();
            $("#cel").addClass("error-text-field");
            $("#cel").removeClass("success-text-field");
            count ++;
        }else{
        	$("#cel_text").hide();
            $("#cel").addClass("success-text-field");
            $("#cel").removeClass("error-text-field");
        }
		if(document.getElementById("cel").value.length != 10){
			
            $("#cel_text1").show();
            $("#cel").addClass("error-text-field");
            $("#cel").removeClass("success-text-field");
            count ++;
        }else{
        	$("#cel_text1").hide();
            $("#cel").addClass("success-text-field");
            $("#cel").removeClass("error-text-field");
        }
		
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },

	
	
	 Save: function () {
     
         
		 if(drivermanagerMyprofile.PreValidation() == false){
            return
         }

		Forms.UpdateValue("user", "name", drivermanagerMyprofile.namelang,true); 
		Forms.UpdateValue("user", "lastname", drivermanagerMyprofile.lastnamelang,true); 
		Forms.UpdateValue("user", "address", drivermanagerMyprofile.addresslang,true); 
		
        /*if (Forms.CanSave("user") == false) {
            return
        }
        */
   
		
		for(var s in Forms.Form.user.fields){			
			Forms.Form.user.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.user.fields[s].value)))
			Forms.Form.user.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.user.fields[s].ivalue)))
		}
	   Main.Loading();
       Main.Request("drivermanager", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.user), "drivermanagerMyprofile.EditProfile()")
       Main.Ready();
       Forms.Clean("user");

    },

};