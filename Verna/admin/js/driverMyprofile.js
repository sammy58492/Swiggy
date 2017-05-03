var DriverProfile = {
	
		EditProfile: function (val) {
	 
            var c = this;
            Main.Loading();
			$.post("lib/panel-bulk.php", 'data=[{"operation":"FetchDriverIdByEmail","email":"' + Main.User.email + '"}]', function (c) {				
				if (c != "") {
					 e = JSON.parse(c);
					 
                	Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchDriverData","id":"' + e.drivermail.id + '"}]', "DriverProfile.PreEdit")
           		}
        	})	
      
    },
	
	
	
	 PreEdit: function (a) {
		 Main.Ready();
	 var g = false;	
		
		
    //$('div[id*=newpopup]').remove();
	
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
		
        Main.Franchises = a.franchises;
        Main.Countries = a.countries;
        this.Form(a.driver)
		
    },
	
	Form: function (e) {
		
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
      
               
               DriverProfile.restaurants = d;
		
		//alert(JSON.stringify(e))
       Forms.Clean("driveruser", "mainbuttonok");
	   g = true;
		
		Forms.Form.driveruser.type = "modify";
		Forms.Form.driveruser.id = e.id
			
		
       var j = "";
		
		j +='<div class="row">'
        j +='<div class="top-bar">'
                        
        j +='<div class=" col-md-6 col-md-offset-6">'
                       
        j +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="DriverProfile.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_DRIVER_PROFILE_SAVE'] ?></button>&nbsp;' 
                                    
                                   
        j +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Orders.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL'] ?></button></div>'
                    
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
		j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Select Group *</label>'
     
		if(Main.User.level==4)
		{
					j +=Forms.CreateSelectPropertyAdminReadonly("driveruser", "group_id", DriverProfile.restaurants, e.group_id, false)

					}
					else
					{
					j += Forms.CreateSelectPropertyAdminReadonly("driveruser", "group_id", DriverProfile.restaurants, e.group_id, true)

					
					}
		
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Name *</label>'
		
		//alert(JSON.stringify(e))
		//alert(JSON.stringify(e.driver[0].name))
		flaginfo=Main.languageinfo;
		
		//alert(JSON.stringify(flaginfo))
		 
		
	//	alert(DriverProfile.langdefault)					
		for(Z in flaginfo){
			if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){		
			//alert(flaginfo[Z].admindefaulelang)						
				j +=Forms.CreateInputPropertyAdmin("driveruser", "name", e.name[flaginfo[Z].admindefaulelang], true,"DriverProfile.PreValidation()")
				j +='<small data-bv-validator="notEmpty" class="help-block" id="name_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_IS_REQUIRED'] ?></small>'
				j +='</div>'
				j +='</div>'<!--col-md-4-->
				
				//DriverProfile.langdefault = flaginfo[Z].admindefaulelang; 
			}
		}

        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Last Name *</label>'
        j +=Forms.CreateInputPropertyAdmin("driveruser", "lastname", e.lastname[1], true,"DriverProfile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="lastname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_LAST_NAME_REQUIRED'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->

        j +='</div>'<!--row-->  
                    
        j +='<div class="row">'
		j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Password *</label>'
        if (g) {
			
        j +=Forms.CreateInputPropertyAdmin("driveruser", "pwd", e.pwd, false, "DriverProfile.PreValidation()", false, true)
		j +='<small data-bv-validator="notEmpty" class="help-block" id="pwd_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PWD_DM'] ?></small>'
        }else {
        j +=Forms.CreateInputPropertyAdmin("driveruser", "pwd", e.pwd, true)
        }
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Email *</label>'
        j +=Forms.CreateInputPropertyAdminReadonly("driveruser", "email", e.email, true)

        j +='</div>'
        j +='</div>'<!--col-md-4-->

        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Address *</label>'
        j +=Forms.CreateInputPropertyAdmin("driveruser", "address", e.address[1], true, "DriverProfile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="address_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ADDRESS_DM'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row--> 
                    
        j +='<div class="row">'
		j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Zip code</label>'
        j +=Forms.CreateInputPropertyAdmin("driveruser", "zip", e.zip, false)
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
        j +='<label>Country *</label>'
		j +=Forms.CreateSelectPropertyAdmin("driveruser", "country", c, Main.NullToEmpty(e.country), true, "DriverProfile.CountrySelected(this);DriverProfile.PreValidation()")
        j +='<small data-bv-validator="notEmpty" class="help-block" id="country_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_COUNTRY_DM'] ?></small>'
        j +='</div>'
        j +='</div>'<!--col-md-4-->
		j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>City *</label>'
		j +=Forms.CreateSelectPropertyAdmin("driveruser", "city", [], Main.NullToEmpty(e.city), true, "DriverProfile.PreValidation()")
		j +='<small data-bv-validator="notEmpty" class="help-block" id="city_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_COUNTRY_REQUIRED_CANT'] ?></small>'
        
        j +='</div>'
        j +='</div>'<!--col-md-4-->

        j +='</div>'<!--row--> 
        j +='<div class="row">'
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Mobile</label>'
        j +=Forms.CreateInputPropertyAdmin("driveruser", "mobile", e.mobile, false)
        j +='</div>'
        j +='</div>'<!--col-md-4-->

        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Background </label>'
      	j += Forms.CreateTextAreaPropertyPopup("driveruser", "background", Main.NullToEmpty(e.background[1]), false, "", false, "metarea")
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='<div class="col-md-4">'
        j +='<div class="form-group">'
        j +='<label>Drivers GPS tracking url </label>'
    	j += Forms.CreateInputPropertyAdmin("driveruser", "gprs_url", e.gprs_url, false)
        j +='</div>'
        j +='</div>'<!--col-md-4-->
        j +='</div>'<!--row--> 
        j +='</div>'<!-- /.panel-body -->
        j +='</div>'
                   
		j +='</div>'
		$("#main").empty().append(j);
		
		
		Forms.CreateValue("driveruser", "level", Main.User.level, true, true);
		 if (g) {
           DriverProfile.PopulateCitySelect(e.country, e.city)			
        }
		
       
        
		
		
		
		var g = false;
        
        
		//$("#main").empty().append(j);
         
        
        Forms.CreateValue("driveruser", "location", e.location);
        var f;
        if (e.location == "" || e.location == null) {
            f = new Object();
            f.latitud = 23.634501;
            f.longitud = -102.552784;
            f.zoom = 4
        } else {
            f = JSON.parse(e.location)
        }
        //GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, DriverProfile.LocationUpdated);
        if (g) {
            DriverProfile.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
		
	})
    },
	 CountrySelected: function (a) {
		 
        DriverProfile.PopulateCitySelect(a.options[a.selectedIndex].value)
		
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
                    Forms.Form.driveruser.fields.city.value = "";
                   
                }
            }
        })
    },
	
	PreValidation: function(){
		
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
		if(document.getElementById("name").value == ""){
			
            $("#name_text").show();
            $("#name").addClass("error-text-field");
            $("#name").removeClass("success-text-field");
            count ++;
        }else{
        	$("#name_text").hide();
            $("#name").addClass("success-text-field");
            $("#name").removeClass("error-text-field");
        }
		if(document.getElementById("lastname").value == ""){
			
            $("#lastname_text").show();
            $("#lastname").addClass("error-text-field");
            $("#lastname").removeClass("success-text-field");
            count ++;
        }else{
        	$("#lastname_text").hide();
            $("#lastname").addClass("success-text-field");
            $("#lastname").removeClass("error-text-field");
        }
		if(document.getElementById("pwd").value == ""){
			
            $("#pwd_text").show();
            $("#pwd").addClass("error-text-field");
            $("#pwd").removeClass("success-text-field");
            count ++;
        }else{
        	$("#pwd_text").hide();
            $("#pwd").addClass("success-text-field");
            $("#pwd").removeClass("error-text-field");
        }


		if(document.getElementById("address").value == ""){
			
            $("#address_text").show();
            $("#address").addClass("error-text-field");
            $("#address").removeClass("success-text-field");
            count ++;
        }else{
        	$("#address_text").hide();
            $("#address").addClass("success-text-field");
            $("#address").removeClass("error-text-field");
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
     
         
		 if(DriverProfile.PreValidation() == false){
            return
         }

	   Main.Loading();
       Main.Request("driver", null, "f=SaveDriver&data=" + JSON.stringify(Forms.Form.driveruser), "DriverProfile.EditProfile()")
       Main.Ready();
       Forms.Clean("driveruser");

    },

};