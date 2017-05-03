var Deliveryzone = {
    Main: function () {
        Main.Loading();
		
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/Deliveryzone.php", "f=FetchAlldeliveryData", function (b) {
			
			//alert(b)
			if(GoogleMap.MapApiLoaded == false) {
			GoogleMap.Init();
			}
			
			$.post("lib/Deliveryzone.php", "f=FetchAllRestData", function (f) {
			
			
			Deliveryzone.restaurants = JSON.parse(f);
			//return false
			
			
			})
			Deliveryzone.daysval = [{
            id: 0,
            name: "<?= $lang_resource['Every_Day_V2'] ?>"
        }, {
            id: 1,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] ?>"
        }, {
            id: 2,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] ?>"
        }, {
            id: 3,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] ?>"
        }, {
            id: 4,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] ?>"
        }, {
            id: 5,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] ?>"
        }, {
            id: 6,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] ?>"
        }, {
            id: 7,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] ?>"
        }];
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.discount = new Object();
                 Main.Config.discount.List = new Object();
				 
                Deliveryzone.discount = JSON.parse(b);
				Deliveryzone.PrintMain()
				
            } else {
                alert("Error")
            }
        })
		 
    },
	 Main2: function () {
        Main.Loading();
		
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/Deliveryzone.php", "f=FetchAlldeliveryData", function (b) {
			
			//GoogleMap.Init();
			
			$.post("lib/Deliveryzone.php", "f=FetchAllRestData", function (f) {
			
			
			Deliveryzone.restaurants = JSON.parse(f);
			//return false
			
			
			})
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.discount = new Object();
                 Main.Config.discount.List = new Object();
				 
                Deliveryzone.discount = JSON.parse(b);
				Deliveryzone.PrintMain()
				
            } else {
                alert("Error")
            }
        })
		 
    },
    PrintMain: function () {
		
	
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var c = "";
        b.push(Visuals.CreateSubMenuItem("Deliveryzone.New()", "<?= $lang_resource['CONTROL_DELIVERY_ADD'] ?>"));
        b.push(Visuals.CreateSubMenuItem("Deliveryzone.Edit()", "<?= $lang_resource['CONTROL_PANEL_DELIVERY_EDIT'] ?>"));
        b.push(Visuals.CreateSubMenuItem("Deliveryzone.Delete()", "<?= $lang_resource['CONTROL_PANEL_DELIVERY_DELETE'] ?>"));
        a += Visuals.CreateSubMenu(b);
		 document.getElementById("totalOrderBox").style.display = "none";
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DELIVERY_TITLE'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="Deliveryzone.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px; width: 230px;" onclick="Deliveryzone.PupulateTable(\'zip\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DELIVERY_COLUMN1'] ?> </span></div>';
        c += '<div class="hand" onclick="Deliveryzone.PupulateTable(\'price\')" style="border-right: 2px solid #E4E4E4;float: left;height: 26px; width: 230px;"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DELIVERY_COLUMN2'] ?></span></div>';
       // c += '<div class="enabled  hand" onclick="Deliveryzone.PupulateTable(\'description\')" sty ><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN3'] ?></span></div>';
        //c += '<div class="enabled default"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN4'] ?></span></div>';
		 c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DELIVERY_COLUMN5'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
		
		
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
          Deliveryzone.PupulateTable(Main.Config.discount.List.SortBy, true)
        };
        
		
		Deliveryzone.PupulateTable(Main.Config.discount.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
		
        var d = "";
        var b = this.discount.length;
		
        if (c) {
            this.discount.sort(Main.SortByProperty(a));
            if (Main.Config.discount.List.SortByStatus == "max") {
                this.discount.reverse()
            }
        } else {
            if (Main.Config.discount.List.SortBy != a) {
                this.discount.sort(Main.SortByProperty(a));
                Main.Config.discount.List.SortByStatus = "min"
            } else {
                this.discount.reverse();
                if (Main.Config.discount.List.SortByStatus == "min") {
                    Main.Config.discount.List.SortByStatus = "max"
                } else {
                    Main.Config.discount.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.discount.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
		//alert(this.Discount);
		//return 
		
        for (var e in this.discount) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.discount[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.discount[e])
           }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="Deliveryzone.Edit(' + this.discount[e].id + ')">' + this.discount[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.discount[e].id + '"/></div>';
                d += '<div style=" border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 230px;"><div class="cap"><span class="caption hand" onclick="Deliveryzone.Edit(' + this.discount[e].id + ')">'
				 + Main.NullToEmpty(this.discount[e].zonename).toUpperCase() +"</span></div></div>";
              
                d += '<div style="border-right: 2px solid #E4E4E4;float: left; height: 26px;width: 230px;"><div class="cap"><span class="caption">' +   Main.NullToEmpty(this.discount[e].deliveryprice) + "</span></div></div>";
              <!--  d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="Discount.Edit(' + this.Discount[e].id + ')">&pound;' + this.Discount[e].description + "</span></div></div>";-->
			 //  d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 64px;"><span class="caption">' +   Main.NullToEmpty(this.discount[e].hits) + "</span></div>";
			 //  d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 64px;"><span class="caption">' +   Main.NullToEmpty(this.discount[e].maxallow) + "</span></div>";
			   d += '<div class="enabled"><span class="caption"><div id="switch_' + this.discount[e].id + '"></div></span></div>';
                d += "</div>"
				
				 }
           
        }
	
        document.getElementById("ads").innerHTML = d;
        var h = false;
        Switch.Init();
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                Deliveryzone.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/Deliveryzone.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
       
		$.post("lib/Deliveryzone.php", "f=FetchAllRestData", function (b) {
			
			
			Deliveryzone.restaurants = JSON.parse(b);
			//return false
			
			
			})
			
			 Main.GetFranchisesData("Deliveryzone.Form()")
    },
    Edit: function (a) {
		
		
        var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValues();
            if (c.length == 1) {
                a = c[0];
                d = true
            }
        } if (d) {
            Main.Loading();
		
			var gk = new Date().getTime();
			Main.Aid = gk;
           // Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDiscountData","id":"' + a + '"}]', "Deliveryzone.PreEdit")
		     $.post("lib/Deliveryzone.php", "f=FetchDiscountData&id=" + a, function (b) {
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				Deliveryzone.PreEdit(b);
				//alert(b);
			 })
        }
    },
    PreEdit: function (a) {
		//alert(a);
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
		//alert(JSON.stringify(a));
        //Main.Franchises = a.franchises;
		
		
        this.Form(a)
		   if(a.payby==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(a.payby==2)
			{
			   document.getElementById("idprice").style.display="";
			}
    },
    Form: function (e) {
		
		//alert(JSON.stringify(e))
		
		 MultipleInput.AddListener("tagschange", "Deliveryzone.MultiInputTagsChange");
		
		
        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "Deliveryzone.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Deliveryzone.PrintMain()");
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
		    //Main.location= e.location;
        }
		 Forms.Form.ad.ad = e;
        this.ActiveForm = "ad";
		
		
        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.ad.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_DELIVERY_ADD'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DELIVERY_EDIT'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol" style="width:314px">';
		
        var g = "";
        var b;
        k += '<div class="row"><span class="caption"><?= $lang_resource['ZONEN_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "zonename", Main.NullToEmpty(e.zonename), true, "", false, false) + "</div></div>";
	  
	 
		 k += '<div class="row"><span class="caption"><?= $lang_resource['DELIVERYA_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "address", Main.NullToEmpty(e.address), true, "", false, false) + "</div></div>";
		
		  k += '<div class="row"><span class="caption"><?= $lang_resource['DELIVERYP_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "deliveryprice", Main.NullToEmpty(e.deliveryprice), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		
		  k += '<div class="row"><span class="caption"><?= $lang_resource['MINP_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "minpurchase", Main.NullToEmpty(e.minpurchase), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		 	// k += '<div class="row"><span class="caption">Business</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "business", Main.NullToEmpty(e.price), false, "", false, false) + "</div></div>";
			var m='';
			var o='';
			var n='';
			var ss='';
			  if (Forms.Form.ad.type == "modify" && e.schedule) {
            var l = JSON.parse(e.schedule);
            o = l.opens.hour;
            m = l.opens.minute;
            ss = l.closes.hour;
            n = l.closes.minute
        }
			 Forms.CreateValue("ad", "schedule",  Main.NullToEmpty(e.schedule),false);
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_START'] ?></span><div class="inputbox">';
        k += '<select id="menu_openminute" class="scheduleminute" onchange="Deliveryzone.UpdateMenuSchedule()">';
		
        for (var p = 0; p < 60; p++) {
            if (m == p) {
                k += "<option SELECTED>" + Business.zeroPad((p),2) + "</option>"
            } else {
               k += "<option>" + Business.zeroPad((p),2) + "</option>"
            }
        }
        k += "</select>";
        k += '<span class="caption schedulecaption">:</span>';
        k += '<select id="menu_openhour" class="schedulehour" onchange="Deliveryzone.UpdateMenuSchedule()">';
        for (var p = 0; p < 24; p++) {
			 time_format="<?=$lang_resource['TIME_FORMAT']?>";
                    if(time_format=="12"){
                     p=Business.convertTimeFormatHour(p);
                 }else{
                      p=Business.zeroPad((p),2);
                 }
            if (o == p) {
               k += "<option SELECTED>" + p + "</option>"
            } else {
                k += "<option>" + p + "</option>"
            }
        }
        k += "</select>";
        k += "</div></div>";
		 k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_END'] ?></span><div class="inputbox">';
        k += '<select id="menu_closeminute" class="scheduleminute" onchange="Deliveryzone.UpdateMenuSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (n == p) {
                k += "<option SELECTED>" +  Business.zeroPad((p),2) + "</option>"
            } else {
                k += "<option>" +  Business.zeroPad((p),2) + "</option>"
            }
        }
        k += "</select>";
        k += '<span class="caption schedulecaption">:</span>';
        k += '<select id="menu_closehour" class="schedulehour" onchange="Deliveryzone.UpdateMenuSchedule()">';
        for (var p = 0; p < 24; p++) {
			 if(time_format=="12"){
                     p=Business.convertTimeFormatHour(p);
                 }else{
                      p=Business.zeroPad((p),2);
                 }
            if (ss == p) {
                k += "<option SELECTED>" + p + "</option>"
            } else {
                k += "<option>" + p + "</option>"
            }
        }
        k += "</select>";
        k += "</div></div>";
		
		 Forms.CreateValue("ad", "days", Main.NullToEmpty(e.days), false);
       k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DAYS'] ?></span><div class="multiinputbox" style="margin-left:90px;"><span class="obligatory nonselectable"></span><input type="text" id="days" style="width:235px;height:60px"/></div></div>';
		
		  Forms.CreateValue("ad", "zones", Main.NullToEmpty(e.location), false);	
		  Forms.CreateValue("ad", "business",Main.NullToEmpty(e.business));
         k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] ?></span><div class="multiinputbox" style="margin-left:90px;"><span class="obligatory nonselectable"></span><input type="text" id="business" style="width:235px;height:60px;"/></div></div>';
		  k += "</div>";
		   k += '<div class="rightcol">';
        k += '<div class="uploaderbox" style="width:280px;height:280px;" onclick="Deliveryzone.OpenMapNew()"><div class="preview map hand"></div></div>';
       
		  
		  
         k += "</div>";      
       
		 k += "</div>";
        k += "</div>";
		
		//
		
		 document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
		
		/*$.post("lib/Deliveryzone.php", "f=FetchAllRestData", function (b) {
			
			
			Deliveryzone.restaurants = JSON.parse(b);
			//return false
			
			
			})*/
		 MultipleInput.Init("business",Deliveryzone.restaurants, true);
		  
        MultipleInput.Init("days", Deliveryzone.daysval, true);
		 
		  if (Forms.Form.ad.type == "modify") {
				if (Forms.Form.ad.ad.business != "") {
					var d = JSON.parse(Forms.Form.ad.ad.business);
					for (var e in d) {
						MultipleInput.AddTagById("business", d[e])
					}
					Forms.Form.ad.fields.business.save = false
				}
		   }
		 if (Forms.Form.ad.type == "modify") {
					 if (Forms.Form.ad.ad.days != "") {
					var i = JSON.parse(Forms.Form.ad.ad.days);
					for (var g in i) {
						MultipleInput.AddTagById("days", i[g])
					}
					Forms.Form.ad.fields.days.save = false
				}
		   }
		  
       
        $("#name").focus()
    },
	OpenMapNew: function () {
       /* var h = Forms.GetValue("business", "zones");
        if (h != "") {
            h = JSON.parse(h)
        } else {*/
		
           var  h = new Object();
            h.zone1 = new Object();
            h.zone1.price = "0.00";
           
        //}
		
        var f = '<div id="mapbuttonsdp"  style="position:absolute;z-index:2;">';
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 01", Forms.CreateInputProperty23("ad", "zone1", h.zone1.price, true, "", false, false, "return Main.IsNumberKey(event)"), "Deliveryzone.DrawingZone(this,'zone1')");
       
        f += Visuals.CreateGreyButton("<?= $lang_resource['clear_zones_V2'] ?>", "Deliveryzone.ClearZones(this)");
        f += "</div>";
		
       f += '<div id="mapbox" class="businessmapbox"></div>';
	 
        Popup.Show(700, 698, f, Deliveryzone.GetLocationAndZoneNew, function () {
           GoogleMap.Clean()
			
        }, null, true);
        GoogleMap.Clean();
     //   var e = JSON.parse(Forms.GetValue("business", "location"));
       /* if (e.latitud != "" && e.longitud != "") {
            GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Business.MapReady, "bottomright")
        } else {*/
		var address = document.getElementById("address").value;
		if(address !="") { 
		Main.WhereAmILocationData = new Object();
		 var geocoder = new google.maps.Geocoder();
				          
							 
				             geocoder.geocode( { 'address': address}, function(results, status) {
				            if (status == google.maps.GeocoderStatus.OK)
				             {
					       Main.WhereAmILocationData.location = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":15}');
						 //  "latitud":40.7740899,"longitud":-73.96585099999999,"zoom":21
					        Main.WhereAmILocationData.latitud = results[0].geometry.location.lat();
                            Main.WhereAmILocationData.longitud = results[0].geometry.location.lng();
							 Main.WhereAmILocationData.zoom = 15;
                          
						          //alert(JSON.stringify(Main.WhereAmIData.location))
				            	Deliveryzone.GetMaplocation();  
				              }
				            });
		}
		else {
			
			  e= new Object();
                e.latitud = 40.7176195;
                e.longitud = -73.99223970000003;
                e.zoom = 10
				
				 GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Deliveryzone.MapReady, "bottomright")
		}
        
    },
	GetMaplocation: function () {
		 var address = document.getElementById("address").value;
		 
		if(address!="")
		{
		        e= new Object();
                e.latitud = Main.WhereAmILocationData.latitud;
                e.longitud = Main.WhereAmILocationData.longitud;
                e.zoom = Main.WhereAmILocationData.zoom
     GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Deliveryzone.MapReady, "bottomright")
		}
		
		
			 },
	GetLocationAndZoneNew: function () {
		Main.Loading();
        var d = GoogleMap.GetZones();
		 var c = new Object();
		
        c.zone1 = new Object();
		
	
		//alert(Forms.Form.ad.fields.zones.ivalue);
     
        c.zone1.coordinates = d.zone1;
       
		
		if (c.zone1.coordinates.length == 0) {
			
            Forms.Form.ads.fields.zones.value = "";
            Forms.Form.ads.fields.zones.save = false
        } else {
			
				//if (Forms.Form.ad.fields.zones.ivalue != Forms.Form.ad.fields.zones.value) {
					   //  alert(JSON.stringify(Forms.Form.ad));
					Forms.Form.ad.fields.zones.value=JSON.stringify(c.zone1.coordinates);
					Forms.Form.ad.fields.zones.save = true
				                        //   }
            }
			
   		 Main.Ready();
        Popup.Close()
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
	IsNumberKeyFour: function (b,c) {
      
	    var a = c.keyCode;
		
		//alert(a);
      
	    if (a == 8 || a == 46) {
            return true
        }
		else if(b.length>5)
		{
			  return false
		}
		 return true
		 //alert(b);
		
    },
	IsNumberKeytwo: function (b,c) {
      
	     var a = c.keyCode;
		 
		if (a == 8 || a == 46) {
            return true
        }
		
		 return true
		 //alert(b);
		
    },
	
    TypeChanged: function (a) {
		//alert(JSON.stringify(a));
        if(a == 1)
		{
			document.getElementById("idpercent").style.display = "";
			document.getElementById("idprice").style.display = "none";
		}
		else if(a == 2)
		{
			document.getElementById("idpercent").style.display = "none";
			document.getElementById("idprice").style.display = "";
		}
		else
		{
			document.getElementById("idpercent").style.display = "none";
			document.getElementById("idprice").style.display = "none";
			
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
    ProfileImageSelected: function (b, a) {
        Forms.UpdateValue("ad", "imgupload" + a, b, true);
        if (Forms.CanSave("ad")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (b) {
        Response = JSON.parse(b);
        if (Response.status == "no files selected") {
            Discount.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                Discount.Save(Response[0].name)
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
	 MapReady: function () {
		 
        GoogleMap.StartShapeTool();
        GoogleMap.AddShapeDrawingStyle("zone1", "#6fbc5a", 3, "#6fbc5a");
		var b = Forms.GetValue("ad", "zones");
		//alert(b)
		   if (b != "") {
            b = JSON.parse(b);
           /* if (b.zone1.coordinates == "") {
                b.zone1.coordinates = new Array()
            }*/
            GoogleMap.PrintShape("zone1", b);
		   }
		   else
		   {
			    b = new Array()
            
            GoogleMap.PrintShape("zone1", b);
			}
        //GoogleMap.AddShapeDrawingStyle("zone2", "#4f9bc4", 5, "#4f9bc4");
       // GoogleMap.AddShapeDrawingStyle("zone3", "#fac739", 5, "#fac739");
       /* var b = Forms.GetValue("business", "zones");
     
            if (b.zone2.coordinates == "") {
                b.zone2.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone2", b.zone2.coordinates);
            if (b.zone3.coordinates == "") {
                b.zone3.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone3", b.zone3.coordinates)
        }*/
    },
    Save: function () {
        if (Forms.CanSave("ad") == false) {
            return
        }
      
   //alert(JSON.stringify(Forms.Form.ad));
	
	//alert("ok");
	    Main.Request("Deliveryzone", null, "f=SaveZone&data=" + JSON.stringify(Forms.Form.ad), "Deliveryzone.Main2()");
	   /* var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);*/
		
	  /* $.post("panel/lib/Deliveryzone.php", "f=SaveZone&data=" + JSON.stringify(Forms.Form.ad), function (f)
        {
			alert(f);
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return;
            }
			Deliveryzone.Main2();
			
		  });	*/
		
			
        Uploader.Clean();
        Forms.Clean("ad")
    },
	
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
		/*alert(JSON.stringify(a));
		return false;*/
        Main.Request("Deliveryzone", null, "f=DeleteAd&data=" + JSON.stringify(a), "Deliveryzone.Main2()")
    },
	 UpdateMenuSchedule: function () {
        var c = new Object();
        var d;
        c.opens = new Object();
        d = document.getElementById("menu_openhour");
        c.opens.hour = d.options[d.selectedIndex].text;
        d = document.getElementById("menu_openminute");
        c.opens.minute = d.options[d.selectedIndex].text;
        c.closes = new Object();
        d = document.getElementById("menu_closehour");
        c.closes.hour = d.options[d.selectedIndex].text;
        d = document.getElementById("menu_closeminute");
        c.closes.minute = d.options[d.selectedIndex].text;
        Forms.UpdateValue("ad", "schedule", JSON.stringify(c), true);
        if (Forms.CanSave("ad")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
	 MultiInputTagsChange: function (d) {
        switch (d) {
			
        case "dish_ingredients":
            var e = MultipleInput.GetTagsNames(d);
            if (e.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(e))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break;
       
        default:
            var f = MultipleInput.GetTagsIds(d);
            if (f.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    }
};

