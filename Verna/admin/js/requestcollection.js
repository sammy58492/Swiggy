var Requestcollection={
	
		Main: function () {
        Main.Loading();
		var b = new Date().getTime();
        Main.Aid = b;
		
		if (b != Main.Aid)
                {
                    return
                }
        Main.Ready(); 
      
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetrequestCollectionSetting", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            Requestcollection.requestCollectionSettingForm(JSON.parse(b))
         
        })
    },
	
		
	 requestCollectionSettingForm:function ( F){
		
		  var c="";
		   Forms.Clean("requestCollectionSetting", "mainbuttonok");
		    if (F == null) {
            F = new Object();
             Forms.Form.requestCollectionSetting.type = "create"
            }else{
            Forms.Form.requestCollectionSetting.type = "modify";
         
            }
		  
		  	c += '<div class="row">'
            c += '<div class="top-bar">'
            c += '<div class=" col-md-6 col-md-offset-6">'
            c += '<div class=" pull-right">'
			c += '<span id="websitesave"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Requestcollection.requestCollectionSettingConfig()"><i class="fa icon-save"></i> <?= $lang_resource["ADMIN_PAGE_WEBSITE_SAVE"] ?></button></span>'		
			c += '&nbsp;<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource["ADMIN_PAGE_CANCEL"] ?></button></div>'
            c += '</div>'
			<!--col-md-5-->
            c += '</div>'
			<!--top-bar-->
            c += '</div>'
		  c+= '<div class="panel panel-danger panel-square panel-no-border">';
							 c+= ' <div class="panel-heading panel-heading">';
                             c+= ' <div class="row">';
                               c+= ' <div class="col-md-6">';
                                   c+= ' <h3 class="panel-title"><?= $lang_resource["REQUEST_COLLECTION_SETTING"] ?></h3>';
                                   c+= ' </div>';
        					 c+= '  </div>';

            c+= '  </div>';
			  /////////////////////////////////
          var b = new Array();
        b.push({
            id: "",
            caption: ""
        });
        for (c1 in F.cityarray) {
            b.push({
                id: F.cityarray[c1].city,
                caption: F.cityarray[c1].city
            })
        }
		   Forms.CreateValue("requestCollectionSetting", "requestCollectionSettinglocation", Main.NullToEmpty(F.requestCollectionSettinglocation), false);	
      /////////////////////////////////
						c+= '<div class="panel-body"> ';
                       c+= ' <div class="row">';
                        	c+= '<div class="col-md-4">';
                            	c+= '<div class="form-group">';
                                 c+= '  <label><?= $lang_resource["DRIVER_MANAGER_FORM_FIELD_CITY"] ?> *</label>';
								  c+= Forms.CreateSelectPropertySettingsRequestCollection("requestCollectionSetting", "requestCollectionSettingcity", b, Main.NullToEmpty(F.requestCollectionSettingcity), true)
								  c+= ' <small data-bv-validator="notEmpty" class="help-block" id="req_city_er" style="color:#F00;display:none;"><?=$lang_resource['CONTROL_PANEL_CARDSAVE_CITY_ALERT']?></small>'
                                c+= ' </div>';
                           c+= '</div>';
						   
						      var ga = new Array();
							ga.push({
								id: 0,
								caption: "Sandbox"
							});
							 ga.push({
								id: 1,
								caption: "Live"
							});
											   c+= ' <div class="col-md-4">';
                            	c+= '<div class="form-group">';
                                  c+= '  <label><?= $lang_resource["ORDER_DETAILS_BUSINESS_PAYMENT_METHOD"] ?>*</label>';
                                   c+=  Forms.CreateSelectPropertySettings("requestCollectionSetting", "requestCollectionSettingPaypalType",ga, Main.NullToEmpty(F.requestCollectionSettingPaypalType), false) ;
								    
                               c+= '  </div>';
                            c+= '</div>';
                          c+= '  <div class="col-md-4">';
                            	c+= '<div class="form-group">';
                                   c+= ' <label><?= $lang_resource["FRONT_PAYPAL"] ?> *</label>';
                                   c+=   Forms.CreateInputPropertySettings("requestCollectionSetting", "requestCollectionSettingPaypal", Main.NullToEmpty(F.requestCollectionSettingPaypal),true);
                               c+= ' <small data-bv-validator="notEmpty" class="help-block" id="req_paypal_er" style="color:#F00;display:none;"><?=$lang_resource['EMAILVALIDATION']?></small>'
                              c+= '   </div>';
                           c+= ' </div>';
                       c+= ' </div>';
					    var ga1 = new Array();
							ga1.push({
								id: 0,
								caption: "<?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION_ENABLED1'] ?>"
							});
							 ga1.push({
								id: 1,
								caption: "<?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION_ENABLED2'] ?>"
							});
					     c+= ' <div class="row">';
                        	c+= '<div class="col-md-12">';
                            	c+= '<div class="form-group">';
                                 c+= '  <label><?= $lang_resource["FRONT_VISUAL_REQUEST_COLLECTION_ENABLED"] ?> *</label>';
								  c+= Forms.CreateSelectPropertySettingsRequestCollection("requestCollectionSetting", "requestCollectionSettingenabled", ga1, Main.NullToEmpty(F.requestCollectionSettingenabled), true)
                                c+= ' </div>';
                           c+= '</div>';
						     c+= ' </div>';
							 
                       c+= ' <div class="row">';
                        	c+= '<div class="col-md-12">';
                            	c+= '<div class="form-group">';
                                    c+= '<label><?= $lang_resource["REQUEST_COLLECTION_DELIVERY_FEE"] ?> *</label>';
                                   c+= ' <div class="rq-collection-map">'
								   
								   	c +='<small data-bv-validator="notEmpty" class="help-block" id="mapbox_text" style="color:#F00;display:none;"><?=$lang_resource["DELIVERYZONE_VALIDATION_MAP"]?></small>'
		c +='<div class="delivei-map">'
	
		var h="";
		
           var  h = new Object();
            h.zone1 = new Object();
            h.zone1.price = "0.00";
		
		c +='<div id="mapbuttonsdp"  style="position:absolute;z-index:2;">';
        c +=Visuals.CreateZoneButton1("<?= $lang_resource['ADMIN_MULTIDELIVERY_STATICS_ZONE_REQUIRED'] ?>", Forms.CreateInputPropertyMap("requestCollectionSetting", "zone1", h.zone1.price, true, "", false, false, "return Main.IsNumberKey(event)"), "Requestcollection.DrawingZone(this,'zone1')");
		c += Visuals.CreateGreyButton("<?=$lang_resource['ADMIN_PAGE_CLEAR_ZONE'] ?>", "Requestcollection.ClearZones(this)");
		c +='</div>'
		c +='<div id="mapbox" class="businessmapbox"></div>'
		

		c +='</div>'
								   c+='</div>';
                                c+= ' </div>';
                           c+= ' </div>';
                           
                      c+= '  </div>';
               
                        
                       c+= ' </div>';
                        				c+= '</div>';
				document.getElementById("main").innerHTML = c;
				
					var address = document.getElementById("requestCollectionSettingcity").value;
				e= new Object();
                e.latitud = 40.7176195;
                e.longitud = -73.99223970000003;
                e.zoom = 10
				
				 GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Requestcollection.MapReady, "bottomright")	
		if(address !="") { 
		Main.WhereAmIRequestCollectionLocationData = new Object();
		 var geocoder = new google.maps.Geocoder();
				          
							 
				             geocoder.geocode( { 'address': address}, function(results, status) {
				            if (status == google.maps.GeocoderStatus.OK)
				             {
					       Main.WhereAmIRequestCollectionLocationData.location = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":15}');
						
					        Main.WhereAmIRequestCollectionLocationData.latitud = results[0].geometry.location.lat();
                            Main.WhereAmIRequestCollectionLocationData.longitud = results[0].geometry.location.lng();
							 Main.WhereAmIRequestCollectionLocationData.zoom = 15;
                          
						         
				            	Requestcollection.GetMaplocation();  
				              }
				            });
		}
		
				
				
		 },
		 changecity:function (c,a){
		 	Forms.CheckTextInput(c,a);
					var address = document.getElementById("requestCollectionSettingcity").value;
		if(address !="") { 
		Main.WhereAmIRequestCollectionLocationData = new Object();
		 var geocoder = new google.maps.Geocoder();
				          
							 
				             geocoder.geocode( { 'address': address}, function(results, status) {
				            if (status == google.maps.GeocoderStatus.OK)
				             {
					       Main.WhereAmIRequestCollectionLocationData.location = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":15}');
						
					        Main.WhereAmIRequestCollectionLocationData.latitud = results[0].geometry.location.lat();
                            Main.WhereAmIRequestCollectionLocationData.longitud = results[0].geometry.location.lng();
							 Main.WhereAmIRequestCollectionLocationData.zoom = 15;
                          
						         
				            	Requestcollection.GetMaplocation();  
				              }
				            });
		}
		else {
			
			  e= new Object();
                e.latitud = 40.7176195;
                e.longitud = -73.99223970000003;
                e.zoom = 10
				
				 GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Requestcollection.MapReady, "bottomright")
		}
				
		 },
		 
		     DrawingZone: function (e, f) {
        var d = $("#mapbuttonsdp");
        d.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        d.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        $(e).addClass("zonebuttonpressed");
        GoogleMap.StartDrawingShape(f)
    },
    	 MapReady: function () {
		 
   
		 
        GoogleMap.StartShapeTool();
        GoogleMap.AddShapeDrawingStyle("zone1", "#6fbc5a", 3, "#6fbc5a");
		var b = Forms.GetValue("requestCollectionSetting", "requestCollectionSettinglocation");
		
		   if (b != "") {
         //   b = JSON.parse(b);
          
            GoogleMap.PrintShape("zone1", b);
		   }
		   else
		   {
			    b = new Array()
            
            GoogleMap.PrintShape("zone1", b);
			}
    
    
    },
	GetMaplocation: function () {
		 var address = document.getElementById("requestCollectionSettingcity").value;
		 
		if(address!="")
		{
		        e= new Object();
                e.latitud = Main.WhereAmIRequestCollectionLocationData.latitud;
                e.longitud = Main.WhereAmIRequestCollectionLocationData.longitud;
                e.zoom = Main.WhereAmIRequestCollectionLocationData.zoom
     GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Requestcollection.MapReady, "bottomright")
		}
		
		
			 },
	GetLocationAndZoneNew: function () {
		
        var d = GoogleMap.GetZones();
		 var c = new Object();
		
        c.zone1 = new Object();
		
	
		//alert(Forms.Form.requestCollectionSetting.fields.requestCollectionSettinglocation.ivalue);
     
        c.zone1.coordinates = d.zone1;
       
		
		if (c.zone1.coordinates.length == 0) {
			
            Forms.Form.requestCollectionSetting.fields.requestCollectionSettinglocation.value = "";
            Forms.Form.requestCollectionSetting.fields.requestCollectionSettinglocation.save = false
        } else {
			
				
					Forms.Form.requestCollectionSetting.fields.requestCollectionSettinglocation.value=JSON.stringify(c.zone1.coordinates);
					Forms.Form.requestCollectionSetting.fields.requestCollectionSettinglocation.save = true
				                    
            }
			    a="requestCollectionSetting";
			if (Forms.CanSave(a) == false) 
			{
				return false;
			}
			else
			{
				return true;
			}
      
      
    },
	 ClearZones: function (d) {
        var c = $("#mapbuttonsdp");
        c.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        c.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        GoogleMap.ClearAllShapes()
    },
	
	Prevalidation:function(){
		var count = 0;
		var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		if(document.getElementById("requestCollectionSettingPaypal").value == ""){ 
            $("#req_paypal_er").show();
            $("#requestCollectionSettingPaypal").addClass("error-text-field");
            $("#requestCollectionSettingPaypal").removeClass("success-text-field");
			count++;
        }else{
			if(!reg.test(document.getElementById("requestCollectionSettingPaypal").value)){ 
			$("#req_paypal_er").show();
			$("#requestCollectionSettingPaypal").addClass("error-text-field");
			$("#requestCollectionSettingPaypal").removeClass("success-text-field");
		   count++;
			}else{				
			$("#req_paypal_er").hide();
			$("#requestCollectionSettingPaypal").addClass("success-text-field");
			$("#requestCollectionSettingPaypal").removeClass("error-text-field");
			}
        }
		if(document.getElementById("requestCollectionSettingcity").value == ""){ 
		$("#req_city_er").show();
		$("#requestCollectionSettingcity").addClass("error-text-field");
		$("#requestCollectionSettingcity").removeClass("success-text-field");
	   count++;
		}else{				
		$("#req_city_er").hide();
		$("#requestCollectionSettingcity").addClass("success-text-field");
		$("#requestCollectionSettingcity").removeClass("error-text-field");
		}
			
		if(count == 0) 
		{
			return true
		}
		else 
		{
			return false;
		}		
		
		},//end of prevalidation
		
	requestCollectionSettingConfig:function(){
    
	if(Requestcollection.GetLocationAndZoneNew()==false){
		return
	}
    a="requestCollectionSetting";
   console.log(JSON.stringify(Forms.Form.requestCollectionSetting));
        if (Forms.CanSave(a) == false) {
		
       
            return
            
        }
		
		
      //  Forms.PrepareForSaving(a);
    Main.Loading();
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=requestCollectionSettingcity&value=" + Main.NullToEmpty(Forms.Form[a].fields.requestCollectionSettingcity.value), function (c) {
                Main.Ready();  
              
       
            });
			 $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=requestCollectionSettingenabled&value=" + Main.NullToEmpty(Forms.Form[a].fields.requestCollectionSettingenabled.value), function (c) {
                Main.Ready();  
              
       
            });
			
			
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=requestCollectionSettingPaypal&value=" + Main.NullToEmpty(Forms.Form[a].fields.requestCollectionSettingPaypal.value), function (c) {
                Main.Ready();  
              
       
            });
             $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=requestCollectionSettingPaypalType&value=" + Main.NullToEmpty(Forms.Form[a].fields.requestCollectionSettingPaypalType.value), function (c) {
                Main.Ready();  
              
       
            });
             $.post("lib/panel-configs.php", "f=SaveSettingsConfig1&name=requestCollectionSettinglocation&value=" + JSON.stringify(Forms.Form[a].fields.requestCollectionSettinglocation.value), function (c) {
                Main.Ready();  
              
       
            });
           
            Home.Main();
    
    
    },	 	
	
	 requestCollectionDeliveryFee1:function(){
      
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetrequestCollectionDeliveryFee", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            Requestcollection.GetrequestCollectionDeliveryFee(JSON.parse(b))
         
        })
		$.post("lib/multideliveryZoneByKm.php", "f=FetchAlldistance", function (g) {
		Requestcollection.distance = JSON.parse(g);
		if(Requestcollection.distance.id=='K'){
		Requestcollection.d="KM";
		}else{
		Requestcollection.d="Miles";
		}
		
		})
      
      },
	    GetrequestCollectionDeliveryFee:function(F){
			  var a = "";
        var c = "";
      
	  
	   Forms.Clean("requestCollectionDeliveryFee", "mainbuttonok");
         if (F == null) {
            F = new Object();
             Forms.Form.requestCollectionDeliveryFee.type = "create"
            }else{
             Forms.Form.requestCollectionDeliveryFee.type = "modify";
         
            }
			
				c += '<div class="row">'
            c += '<div class="top-bar">'
            c += '<div class=" col-md-6 col-md-offset-6">'
            c += '<div class=" pull-right">'
			c += '<span id="websitesave"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Requestcollection.requestCollectionDeliveryFeeConfig()"><i class="fa icon-save"></i> <?= $lang_resource["ADMIN_PAGE_WEBSITE_SAVE"] ?></button></span>'		
			c += '&nbsp;<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource["ADMIN_PAGE_CANCEL"] ?></button></div>'
            c += '</div>'
			<!--col-md-5-->
            c += '</div>'
			<!--top-bar-->
            c += '</div>'
			////////////
			c += '<div class="panel panel-danger panel-square panel-no-border">';
							c += '  <div class="panel-heading panel-heading">';
                           c += '   <div class="row">';
                             c += '   <div class="col-md-6">';
                               c += '     <h3 class="panel-title"><?= $lang_resource["REQUEST_COLLECTION_DELIVERY_FEE"] ?></h3>';
                              c += '      </div>';<!--col-md-5-->
        					 c += '  </div>';<!--row-->

          c += '    </div>';
		  
		    choice_number1=1;
       distanceFormattxt='<?= $lang_resource["CONTROL_PANEL_DISTANCE_TEXT1"] ?>';
			
		  	 if(Requestcollection.d=="Miles"){
					distanceFormattxt='<?= $lang_resource["CONTROL_PANEL_DISTANCE_TEXT2"] ?>';
				 }
			 var counter=0;
			 
						c += '<div class="panel-body" id="add"> ';
						
						     deliveryarr=F.deliveryfeearray;
							   for (var p in deliveryarr) {
                 
               		 p1=parseInt(p)+1;
                  choice_number1= p1;
				  
				  				     c += ' 	<div class="row"  id="addbolck'+p1+'"  >';
                	c += '<div class="col-md-4">';
                       c += ' <div class="form-group">';
                        c += '    <label>'+distanceFormattxt+' *</label>';
                         c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "distancefrom"+p1,   Main.NullToEmpty(deliveryarr[p].distancefrom), true, "", true, false, "return Main.IsNumberKey(event)");
                      c += '   </div>';
                  c += '  </div>';<!--col-md-4-->
                  c += '  <div class="col-md-4">';
                      c += '  <div class="form-group">';
                        c += '    <label><?= $lang_resource["CONTROL_PANEL_To"] ?> *</label>';
                        c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "distanceto"+p1,  Main.NullToEmpty(deliveryarr[p].distanceto), true, "", true, false, "return Main.IsNumberKey(event)");
                      c += '   </div>';
                   c += ' </div>';<!--col-md-4-->
                  c += '  <div class="col-md-4">';
                       c += ' <div class="form-group">';
                           c += ' <label><?= $lang_resource["CONTROL_PANEL_PRICE"] ?></label>';
                           c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "price"+p1,  Main.NullToEmpty(deliveryarr[p].price), true, "", true, false, "return Main.IsNumberKey(event)");
                        c += ' </div>';
                       c += '  <div class="pull-right">';
                         c += '	<span><button class="btn btn-success rounded tbl-field" onclick="Requestcollection.add_input1()"><i class="fa icon-plus"></i></button></span>';
						 
						    if(p1!=1){
                         	c += '<span style="margin-left:8px;"><button class="btn btn-danger rounded tbl-field" onclick="Requestcollection.delete_input1('+p1+')"><i class="fa icon-minus"></i></button></span>';
								counter++;
							}
							
							
                       c += '  </div>';
                  c += '  </div>';<!--col-md-4-->
               c += ' </div> '; 
				  					
							   }
							   
							   
                   if(counter==0){
								  
							     c += ' 	<div class="row"  id="addbolck1"  >';
                	c += '<div class="col-md-4">';
                       c += ' <div class="form-group">';
                        c += '    <label>'+distanceFormattxt+' *</label>';
                         c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "distancefrom1",   '', true, "", true, false, "return Main.IsNumberKey(event)");
                      c += '   </div>';
                  c += '  </div>';<!--col-md-4-->
                  c += '  <div class="col-md-4">';
                      c += '  <div class="form-group">';
                        c += '    <label><?= $lang_resource["CONTROL_PANEL_To"] ?> *</label>';
                        c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "distanceto1", '', true, "", true, false, "return Main.IsNumberKey(event)");
                      c += '   </div>';
                   c += ' </div>';<!--col-md-4-->
                  c += '  <div class="col-md-4">';
                       c += ' <div class="form-group">';
                           c += ' <label><?= $lang_resource["CONTROL_PANEL_PRICE"] ?></label>';
                           c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "price1",  '', true, "", true, false, "return Main.IsNumberKey(event)");
                        c += ' </div>';
                       c += '  <div class="pull-right">';
                         c += '	<span><button class="btn btn-success rounded tbl-field" onclick="Requestcollection.add_input1()"><i class="fa icon-plus"></i></button></span>';	  
								   c += '  </div>';
                  c += '  </div>';<!--col-md-4-->
               c += ' </div> ';  
							  }else{
								choice_number1=parseInt(choice_number1)+1;
							   }
							
                        
                       c += ' </div>';<!-- /.panel-body -->
                        				c += '</div>';
			
			////////////
			  c += '</div>'
			  
			  document.getElementById("main").innerHTML = c;
			},
	
	
	
	  add_input1:function(){
  
        if(choice_number1==1){
       		 choice_number1=choice_number1+1;
        }
       p1=choice_number1;
    
       distanceFormattxt='<?= $lang_resource["CONTROL_PANEL_DISTANCE_TEXT1"] ?>';
			
		  	 if(SuperAdmin.distanceFormat=="N"){
				  distanceFormattxt='<?= $lang_resource["CONTROL_PANEL_DISTANCE_TEXT2"] ?>';
			 }
			 
			 
				  	/////////////////////////
					
					
								     c = ' 	<div class="row"  id="addbolck'+p1+'"  >';
                	c += '<div class="col-md-4">';
                       c += ' <div class="form-group">';
                        c += '    <label>'+distanceFormattxt+' *</label>';
                         c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "distancefrom"+p1,   '', true, "", true, false, "return Main.IsNumberKey(event)");
                      c += '   </div>';
                  c += '  </div>';<!--col-md-4-->
                  c += '  <div class="col-md-4">';
                      c += '  <div class="form-group">';
                        c += '    <label><?= $lang_resource["CONTROL_PANEL_To"] ?> *</label>';
                        c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "distanceto"+p1, '', true, "", true, false, "return Main.IsNumberKey(event)");
                      c += '   </div>';
                   c += ' </div>';<!--col-md-4-->
                  c += '  <div class="col-md-4">';
                       c += ' <div class="form-group">';
                           c += ' <label><?= $lang_resource["CONTROL_PANEL_PRICE"] ?></label>';
                           c += Forms.CreateInputPropertySettings("requestCollectionDeliveryFee", "price"+p1, '', true, "", true, false, "return Main.IsNumberKey(event)");
                        c += ' </div>';
                       c += '  <div class="pull-right">';
                         c += '	<span><button class="btn btn-success rounded tbl-field" onclick="Requestcollection.add_input1()"><i class="fa icon-plus"></i></button></span>';
						 
						    if(p1!=1){
                         	c += '<span style="margin-left:8px;"><button class="btn btn-danger rounded tbl-field" onclick="Requestcollection.delete_input1('+p1+')"><i class="fa icon-minus"></i></button></span>';
							}
					
					///////////////
			 
			 
              
          
        $("#add").append(c);
      choice_number1++;
       Forms.EnableSubmitButton(false)
    },    
     delete_input1:function(id){
       

        $("#addbolck"+id).remove();
      
       
        delete Forms.Form["requestCollectionDeliveryFee"].fields["distancefrom"+id];
        delete Forms.Form["requestCollectionDeliveryFee"].fields["distanceto"+id];
        delete Forms.Form["requestCollectionDeliveryFee"].fields["price"+id];
       
      
       
        if (Forms.CanSave("requestCollectionDeliveryFee")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }

    },   
	
	schedule:function(){
		  Main.Loading();
			var a = new Date().getTime();
        	Main.Aid = a;	
		$.post("lib/panel-configs.php", "f=FetchRequestcollectionSchedule", function (b) {			
			
			if (a != Main.Aid) {
                return
            }		
			Main.Ready();    		
			Requestcollection.scheduleMain(JSON.parse(b));			        
        });	
	},
	scheduleMain:function(e){ 
	   
        var c = "";
        Forms.Clean("siteschedule", "mainbuttonok");
		 var f = e.siteschedule;
		  	c += '<div class="row">'
            c += '<div class="top-bar">'
            c += '<div class=" col-md-6 col-md-offset-6">'
            c += '<div class=" pull-right">'
			c += '<span id="websitesave"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Requestcollection.requestCollectionSettingScheduleConfig()"><i class="fa icon-save"></i> <?= $lang_resource["ADMIN_PAGE_WEBSITE_SAVE"] ?></button></span>'		
			c += '&nbsp;<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource["ADMIN_PAGE_CANCEL"] ?></button></div>'
            c += '</div>'
			<!--col-md-5-->
            c += '</div>'
			<!--top-bar-->
            c += '</div>'
		c +='<div class="col-md-12">'
        c +='<div class="config-box ">'
       
		var L = ["", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		
		
		for (var B = 1; B <= 7; B++) {
			
			switch(B){
				
				case 1:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_MONDAY']?>";
					break;
				case 2:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_TUESDAY']?>";
					break;
				case 3:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_WEDNESDAY']?>";
					break;
				case 4:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_THURSDAY']?>";
					break;
				case 5:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_FRIDAY']?>";
					break;
				case 6:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SATURDAY']?>";
					break;
				case 7:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SUNDAY']?>";
					break;
			}
       	var z;
        var O;
        var J;
        var d;        
		if((f!=null)&&(f.sdays)){       
            z = f.sdays[B].opens.hour;
            J = f.sdays[B].opens.minute;
            O = f.sdays[B].closes.hour;
            d = f.sdays[B].closes.minute         
		}
		
		
		Forms.CreateValue("siteschedule", "siteschedule", '',false);
		c +='<h5 style="font-weight:600">'+text+'</h5>'
		c +='<div class="row">'

		c +='<div class="col-md-3">'
		c +='<div class="timing-dv form-group">'
		c +='<label><?=$lang_resource["ADMIN_PAGE_RESTURANT_SCHEDULE_OPEN_TIME"]?></label>'
        c +='<select class="form-control" id="schedule_open_'+text+'">'
        for (var E = 0; E < 24; E++) {
            if(Main.timeformat=="12"){
                E2=Business.convertTimeFormatHour(E);
            }else{
                E2= Business.zeroPad((E),2);
            }
            if (z == E) {
                c += "<option SELECTED  value="+E+" >" +  E2+ "</option>";
            } else {
                c += "<option  value="+E+" >" +  E2 + "</option>";
            }
        }
        c +='</select>' 
		

		c +='</div>'
		c +='</div>'
		<!--col-md-3-->

        c +='<div class="col-md-3">'
        c +='<div class="timing-dv form-group">'
        c +='<label>&nbsp;</label>'
        c +='<select class="form-control" id="schedule_open_min_'+text+'">'
        for (var E = 0; E < 60; E++) {
            if (J == E) {
                c += '<option SELECTED value="'+E+'">' +  Business.zeroPad((E),2)+ "</option>"
            } else {
                c += '<option value="'+E+'">' +  Business.zeroPad((E),2) + "</option>"
            }
        }
        c +='</select>' 
       
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->



		c +='<div class="col-md-3">'
		c +='<div class="timing-dv form-group">'
		c +='<label><?=$lang_resource["ADMIN_PAGE_RESTURANT_SCHEDULE_CLOSE_TIME"]?></label>'
        c +='<select class="form-control" id="schedule_close_'+text+'">'
        for (var E = 0; E < 29; E++) {
            if(E > 24){
                var q = E-24;
                if (O == E) {
                    c += "<option  SELECTED value="+E+">" + q + "am</option>"
                }else{
                    c += "<option value="+E+">" + q + "am</option>"
                }
            }else {
                if(Main.timeformat=="12"){
                    E2=Business.convertTimeFormatHour(E);
                }else{
                    E2=Business.zeroPad((E),2);
                }
                if (O == E) {
                    c += "<option  SELECTED value="+E+">" + E2+ "</option>"
                }else{
                    c += "<option value="+E+">" + E2+ "</option>"
                }
            }
        }
        c +='</select>' 
		
		c +='</div>'
		c +='</div>'
		<!--col-md-3-->
        
        c +='<div class="col-md-3">'
        c +='<div class="timing-dv form-group">'
        c +='<label>&nbsp;</label>'
        c +='<select class="form-control" id="schedule_close_min_'+text+'">'
        for (var E = 0; E < 60; E++) {
            if (d == E) {
                c += "<option SELECTED value="+E+">" + Business.zeroPad((E),2) + "</option>"
            } else {
                c += "<option value="+E+">" + Business.zeroPad((E),2) + "</option>"
            }
        }
        c +='</select>' 
       
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->

		c +='</div>'
		<!--row-->
		}
		
		
		c +='</div>'<!--config-box-->
        c +='</div>'<!--col-md-9-->
        c +='</div>'<!--row-->
		c +='</div>'

		$("#main").empty().append(c);		

     
		
   },
    UpdateSchedule: function () {
       
        var f = new Object();
        var e;
       // f = {days:[0]};
        f.sdays = new Object();
        
        for (var d = 1; d <= 7; d++) {
            switch(d) {
				
				case 1:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_MONDAY']?>";
					break;
				case 2:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_TUESDAY']?>";
					break;
				case 3:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_WEDNESDAY']?>";
					break;
				case 4:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_THURSDAY']?>";
					break;
				case 5:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_FRIDAY']?>";
					break;
				case 6:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SATURDAY']?>";
					break;
				case 7:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SUNDAY']?>";
					break;
			}
            
            f.sdays[d] = new Object();
            f.sdays[d].opens = new Object();
            f.sdays[d].closes = new Object();
            e = document.getElementById("schedule_open_"+text).value+':'+document.getElementById("schedule_open_min_"+text).value;
            var res = e.split(":");
            if(res[0] =='00'){
                var ohour = '0';
            }else{
                var ohour = res[0]; 
            }
            if(res[1] =='00'){
                var chour = '0';
            }else{
                var chour = res[1]; 
            }
            f.sdays[d].opens.hour = ohour;
            f.sdays[d].opens.minute = chour;
            
            e = document.getElementById("schedule_close_"+text).value+':'+document.getElementById("schedule_close_min_"+text).value;
            var res = e.split(":");
            if(res[0] =='00'){
                var ohour = '0';
            }else{
                var ohour = res[0]; 
            }
            if(res[1] =='00'){
                var chour = '0';
            }else{
                var chour = res[1]; 
            }
            f.sdays[d].closes.hour = ohour;            
            f.sdays[d].closes.minute = chour;
        }
        
        Forms.UpdateValue("siteschedule", "siteschedule", JSON.stringify(f), true);
		

    },
   requestCollectionSettingScheduleConfig:function(){
		
		Requestcollection.UpdateSchedule();

		$.post("lib/panel-configs.php", "f=SaveRequestCollectionSchedule&data=" + JSON.stringify(Forms.Form.siteschedule), function (a) {

			   Home.Main();
        });
		
        
        Forms.Clean("siteschedule")
    
   },
	   requestCollectionDeliveryFeeConfig:function(){
    a="requestCollectionDeliveryFee";
	
	for(b1 in Forms.Form[a].fields){
	//	alert(Forms.Form[a].fields[b1].value)
		if(!Forms.Form[a].fields[b1].value){
			
		alert('<?= $lang_resource["REQUESTCOLLECTION_WARNING"] ?>')
		return;
		}
		
	}
       /* if (Forms.CanSave(a) == false) {
			
        $("#loadingbox").hide();
            return
            
        }*/
       Main.Loading(); 
	   	
          Forms.Form.requestCollectionDeliveryFee.fields.tot_time=choice_number1;
    
       $.post("lib/panel-configs.php", "f=SavesaverequestdeliveryfeeConfig&value=" + JSON.stringify(Forms.Form[a].fields), function (c) {
                Main.Ready();  
              Requestcollection.requestCollectionDeliveryFee1();
       		
            });
           
           
             
    },  
};