var GoogleMap = {
    MapApiLoaded: false,
    Init: function (b, f, c, a, d, e, g, h) {

        this.ILatitud = f;
        this.ILongitud = c;
        this.Zoom = a;
		
        this.UserDiv = document.getElementById(b);
        this.LocationCallBack = d;
        this.IAddress = e;
        this.ReadyCallBack = g;
        this.ControlsPosition = h;
        if (!this.MapApiLoaded) {
            var i = document.createElement("script");
            i.src = "https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry&callback=GoogleMap.ApiReady&language=en";
            i.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(i)
        } else {
            this.ApiReady()
        }
    },
    ApiReady: function () {
        this.MapApiLoaded = true;
     
        this.Country = "";
        this.City = "";
			
			
        this.Colony = "";
        this.Street = "";
        var c = document.createElement("div");
        c.setAttribute("class", "cornersbox");
        var b = document.createElement("div");
        b.setAttribute("class", "googlemap");
        c.appendChild(b);
		
        this.UserDiv.innerHTML = "";
        this.UserDiv.appendChild(c);
        var e;
        if (this.ControlsPosition) {
            switch (this.ControlsPosition) {
            case "bottomright":
                e = google.maps.ControlPosition.RIGHT_BOTTOM;
                break;
            default:
                e = google.maps.ControlPosition.TOP_LEFT;
                break
            }
        }
        var a = {
            zoom: this.Zoom,
            center: new google.maps.LatLng(this.ILatitud, this.ILongitud),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
			draggable: false,
			scrollwheel: false,
            zoomControlOptions: {
                position: e,
                style: google.maps.ZoomControlStyle.SMALL
            }
        };
        this.GoogleMap = new google.maps.Map(b, a);
        this.UserMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.ILatitud, this.ILongitud),
            map: this.GoogleMap,
            draggable: false,
			scrollwheel: false
        });
        if (this.IAddress && this.ILatitud == "" && this.ILongitud == "") {
            this.UpdateUserMarker(this.IAddress)
        }
        var d = this;
        if (this.LocationCallBack) {
            google.maps.event.addListener(this.UserMarker, "dragend", function (f) {
                d.LocationCallBack(d.GetUserLocation())
            });
            google.maps.event.addListener(this.GoogleMap, "zoom_changed", function (f) {
                d.LocationCallBack(d.GetUserLocation())
            })
        }
        google.maps.event.addListener(this.GoogleMap, "rightclick", function (f) {
            d.ContextReposition = f.latLng;
            d.MoveUserMarker()
        });
        if (this.ReadyCallBack) {
            this.ReadyCallBack()
        }
    },
    MoveUserMarker: function () {
        this.UserMarker.setPosition(this.ContextReposition);
        if (this.LocationCallBack) {
            this.LocationCallBack(this.GetUserLocation())
        }
    },
    UpdateUserPosition: function (a) {
        var b = "";
        switch (a.id) {
        case "country":
            if (a.type == "select-one") {
                this.Country = a.options[a.selectedIndex].text
            } else {
                this.Country = a.value
            }
            break;
        case "city":
            if (a.type == "select-one") {
                this.City = a.options[a.selectedIndex].text
            } else {
                this.City = a.value
            }
            break;
        case "colony":
            this.Colony = a.value;
            break;
        case "street":
            this.Street = a.value;
            break;
        case "address":
            this.Street = a.value;
            break
        }
        if (this.Colony == "" || !this.Colony) {
            b = this.Street + ", " + this.City + ", " + this.Country
        } 
	   else if(Main.settingfront.tab_delivery_country == 'f' && Main.settingfront.tab_delivery_city == 'f' ) {
			
			 b = this.Street + ", " + this.Country;
			}
		else {
            b = this.Street + ", " + this.Colony + ", " + this.City + ", " + this.Country
        }
		
		
		
		
        this.UpdateUserMarker(b)
    },
	
    UpdateUserPositionip: function (a, c, st) {
        var b = "";
	    if (a != "") {
		this.Country = a
	    } else {
		this.Country = a
	    }
	    if (c != "") {
		this.City = c
	    } else {
		this.City = c
	    }
	    if (st != "") {
		this.Street = st;
	    }else{
		this.Street = st;
	    }
        if (a != "" || c != "") {
			
            b = this.Street + "," + this.City + ", " + this.Country
			
        } else if(Main.settingfront.tab_delivery_country == 'f' && Main.settingfront.tab_delivery_city == 'f' ) {
			
			 b = this.Street + ", " + this.Country;
			}
        this.UpdateUserMarker(b)
    },
    UpdateUserMarker: function (c) {
		
        var b = new google.maps.Geocoder();
        var a = this;
        b.geocode({
            address: c
        }, function (f, d) {
            if (d == google.maps.GeocoderStatus.OK) {
                var e = new google.maps.LatLngBounds;
                a.UserMarker.setPosition(f[0].geometry.location);
                if (a.LocationCallBack) {
                    a.LocationCallBack(a.GetUserLocation())
                }
				Searchzipcode = -1;


					/*if(f[0].address_components[g].types.indexOf("postal_code")>0)  {
					
					Searchzipcode = f[0].address_components[g].short_name;
					
					}*/
					
					
					 for (var i=0; i<f[0].address_components.length; i++) {
						for (var b=0;b<f[0].address_components[i].types.length;b++) {
							
						    if (f[0].address_components[i].types[b] == "postal_code") {
								
								Searchzipcode = f[0].address_components[i].short_name
								break;
							}
						 }

					

					}
					
					
                e.extend(f[0].geometry.location);
                a.GoogleMap.fitBounds(e);
                var g = google.maps.event.addListener(a.GoogleMap, "idle", function () {
                    if (a.GoogleMap.getZoom() > 15) {
                        a.GoogleMap.setZoom(15)
                    }
                    google.maps.event.removeListener(g)
                });
                return true
            } else {
                return false
            }
        })
    },
    GetUserLocation: function () {
        var a = this.UserMarker.getPosition();
        return {
            latitud: a.lat(),
            longitud: a.lng(),
			zipcode: Searchzipcode,
            zoom: this.GoogleMap.getZoom()
        }
    },
    GetAutoLocation: function () {

	if (navigator.geolocation) {
		  //alert('Geolocation is supported!');
		}
		else {
		  alert('Geolocation is not supported for this Browser/OS version yet.');
		}

	 try{
        //position request

       navigator.geolocation.getCurrentPosition(GoogleMap.successCallback , GoogleMap.errorCallback,{maximumAge: 600000, timeout: 8000 });
		//  navigator.geolocation.getCurrentPosition(GoogleMap.SuccessPhone,GoogleMap.ErrorPhone,{enableHighAccuracy:true, timeout:60000, maximumAge:600000});
    }
    catch(evt)
    {
        alert(evt.message);
    }

    },
	successCallback : function (position) {

       /* console.log(position.coords.latitude);
        console.log(position.coords.longitude);*/
        },
		errorCallback: function (error) {
		  var errors = {
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
		  };
		 // console.log("Error: " + errors[error.code]);
        },

    StartShapeTool: function () {
        this["DrawPoints"] = new Object();
        this["Path"] = new Object();
        this["Poly"] = new Object();
        this["ShapeDrawing"] = new Object();
        this["ShapeDrawing"].Drawing = false;
        this["ShapeDrawing"].Deleting = false;
        var a = this;
        google.maps.event.addListener(this.GoogleMap, "click", function (c) {
            if (!a.ShapeDrawing.Drawing) {
                return
            }
            a.Path[a.ShapeDrawing.active].insertAt(a.Path[a.ShapeDrawing.active].length, c.latLng);
            var b = new google.maps.Marker({
                position: c.latLng,
                map: a.GoogleMap,
               draggable: false,
			   scrollwheel: false,
                icon: "theme/" + a.ShapeDrawing.active + ".png"
            });
            b.root = a;
            a.DrawPoints[a.ShapeDrawing.active].push(b);
            google.maps.event.addListener(b, "click", a.ClickOnShapeMarker);
            google.maps.event.addListener(b, "drag", a.DragShapeMarker)
        })
    },
    ClickOnShapeMarker: function () {
        if (!this.root.ShapeDrawing.Deleting) {
            return
        }
        this.setMap(null);
        for (var b in this.root.DrawPoints) {
            for (var c = 0, a = this.root.DrawPoints[b].length; c < a && this.root.DrawPoints[b][c] != this; ++c) {}
            this.root.DrawPoints[b].splice(c, 1);
            this.root.Path[b].removeAt(c)
        }
    },
    DragShapeMarker: function () {
        var d;
        var b;
        for (var a in this.root.DrawPoints) {
            for (var c in this.root.DrawPoints[a]) {
                if (this.root.DrawPoints[a][c] == this) {
                    d = a;
                    b = c;
                    break
                }
            }
        }
        this.root.Path[d].setAt(b, this.getPosition())
    },
    PrintShape: function (b, c) {
        var a;
        var e;
        for (var d in c) {
            e = new google.maps.LatLng(c[d].latitud, c[d].longitud);
            this["Path"][b].insertAt(this["Path"][b].length, e);
            a = new google.maps.Marker({
                position: e,
                map: this.GoogleMap,
                draggable: false,
			    scrollwheel: false,
                icon: "theme/" + b + ".png"
            });
            a.root = this;
            google.maps.event.addListener(a, "click", this.ClickOnShapeMarker);
            google.maps.event.addListener(a, "drag", this.DragShapeMarker);
            this["DrawPoints"][b].push(a)
        }
    },
    AddShapeDrawingStyle: function (b, a, c, d) {
        this["DrawPoints"][b] = new Array();
        this["Path"][b] = new google.maps.MVCArray;
        this["Poly"][b] = new google.maps.Polygon({
            strokeColor: a,
            strokeWeight: c,
            fillColor: d
        });
        this["Poly"][b].setMap(this.GoogleMap);
        this["Poly"][b].setPaths(new google.maps.MVCArray([this["Path"][b]]))
    },
    StartDrawingShape: function (a) {
        this["ShapeDrawing"].Drawing = true;
        this["ShapeDrawing"].Deleting = false;
        this["ShapeDrawing"].active = a
    },
    StartDeletingShape: function () {
        this["ShapeDrawing"].Drawing = false;
        this["ShapeDrawing"].Deleting = true
    },
    StopDrawingAndDeletingShape: function () {
        this["ShapeDrawing"].Drawing = false;
        this["ShapeDrawing"].Deleting = false
    },
    CleanShape: function (a) {
        if (this["DrawPoints"][a]) {
            for (var b in this["DrawPoints"][a]) {
                this["DrawPoints"][a][b].setMap(null);
                delete this["DrawPoints"][a][b]
            }
            this["DrawPoints"][a] = []
        }
        if (this["Path"][a]) {
            for (b in this["Path"][a]) {
                this["Path"][a].removeAt(b)
            }
            this["Path"][a].clear()
        }
    },
    ClearAllShapes: function () {
        for (var a in this["DrawPoints"]) {
            this.CleanShape(a)
        }
    },
	
	locateme: function () {

	var geocoder = new google.maps.Geocoder();
	var mapOptions = {
	    zoom: 6
	  };
	  
	  if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = new google.maps.LatLng(position.coords.latitude,
		                               position.coords.longitude);
		
		
		var lat = pos.lat();
		var lon = pos.lng();
		console.log("latitude : "+lat+" longitude : "+lon);
	   geocoder.geocode({'latLng': pos,'language': 'en'}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
				
			var addresscomp = eval(results[0].address_components);
			var geocnty = false;var geostrt = "", geomapstr = "";
			var geoaddress ="";
		
			for (var i = 0; i  < addresscomp.length; i++) {
				
				
				if (addresscomp[i]['types'][0] == 'route') {
					var geostreet = addresscomp[i]['long_name'];
					
				}
				
				
				
				if (addresscomp[i]['types'][0] == 'postal_code') {
					var geopostcode = addresscomp[i]['long_name'];
					
				}
				
				if (addresscomp[i]['types'][0] == 'sublocality_level_2') {
					
					geoaddress += addresscomp[i]['long_name'];
					
				}
				if (addresscomp[i]['types'][0] == 'sublocality_level_1') {
					
					if(geoaddress == " ")
					geoaddress += addresscomp[i]['long_name'];
					else 
					geoaddress += geoaddress +", "+addresscomp[i]['long_name'];
					
				}
				if (addresscomp[i]['types'][0] == 'locality') {
					var geocity = addresscomp[i]['long_name'];
					
				}
				if (addresscomp[i]['types'][0] == 'country') {
					geocnty = addresscomp[i]['long_name'];
					console.log("country :"+addresscomp[i]['long_name']);
				}
			}
			
			
			
			
		      if (results[1]) {
			var reltlen = results.length - 1;
			
			
		
			Main.ipaddr = results[1].formatted_address;
			responce = Main.ipaddr.split(",");
			if (responce[1]){
				geostrt = responce[1];
			}
			console.log(responce+" "+responce.length);
			var reslen = responce.length, ctylen = reslen - 3, ctrylen = reslen - 1;
				responce[ctrylen] = geocnty;
				responce[ctylen] = geocity;
			
			if (results[0]){
				geomapstr = results[0].formatted_address;
				geomapstr = geomapstr.split(",");
			}
			GoogleMap.UpdateUserPositionip(responce[ctylen], responce[ctrylen], geomapstr[0], lat, lon);
			console.log("responce[ctrylen] : "+responce[ctrylen]);
			
			
			var contrycheck = 0, contryid, ctycheck = 0;
			

			contrycheck=1;
			contryid = Main.Countries[0].id;

			if (contrycheck != 1){
				alert("<?= $lang_resource['No_restaurant_country_V2'] ?>");
				Main.Ready(true);
				return;
			}
			
			Main.WhereAmIData = new Object();
			Main.WhereAmIData.country = contryid;
			console.log("Values saved");
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (f)
			{
				
			    if (f != "")
			    {
				Main.Franchises = JSON.parse(f).franchises;
			    }
				
		
			 var ctycheck = 1;
			  Main.WhereAmIData.city = Main.Franchises[0].id;
			if (ctycheck != 1){
				alert("<?= $lang_resource['NORESTAURANTONCOUNTRY_V21'] ?>");
				Main.Ready(true);
				return;
			}
			else {
					var cityid = "";
					var contryid = "";
					 var cnt = document.getElementById("countryregister");
					 var g = 0;
					 var h = false;
					
					for (var i in Main.Countries)
						{
						
							if (Main.Countries[i].name.toUpperCase() == responce[ctrylen].toUpperCase())
							{
								g = i;
								contryid = Main.Countries[i].id;
								h = true
								
							}
						}
					console.log("contryid : "+contryid);
						 if (contryid && h)
							{
								console.log("g : "+g);
								cnt.selectedIndex = parseInt(g) + 1
								
							}
					
					for (i in Main.Franchises)
						{
						
		
						if (Main.Franchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){
							
							  cityid = Main.Franchises[i].id;
						}
					}
					
				    console.log("cityid : "+cityid);
					
					
				
					Main.PopulateCitySelectRegister(contryid, cityid)
					//alert(JSON.stringify(contry.options));
					
					document.getElementById("street").value = Main.NullToEmpty(geostreet);
					document.getElementById("colony").value = Main.NullToEmpty(geoaddress);
					document.getElementById("cp").value = Main.NullToEmpty(geopostcode);
					
					
					
				    //alert(JSON.stringify(responce));
				//Main.ChooseDeliverOptionGlobal();
				
			}

				})
		      } else {
			alert("<?= $lang_resource['FRONT_NO_RESULT_FOUND'] ?>");
		      }
		    } else {
		      alert("<?= $lang_resource['FRONT_GEOCODER_FAILED'] ?>" + status);
		    }
	    	});
	    }, function(e) {
	      alert("<?= $lang_resource['geolocation_failed_V2'] ?> "+e);
		
	    },{
        	enableHighAccuracy:true,
        	timeout:10000,
       		maximumAge:Infinity
   	 });
	  } else {
	    alert("<?= $lang_resource['Browser_no_geolocation_V2'] ?>");
		Main.Ready(true);
		Popup.Close();
	  }



       
},
		setOption: function(selectElement, value) {
			
			 var e = document.getElementById("cityregister");
			for (var i = 0, optionsLength = options.length; i < optionsLength; i++) {
				
				if (options[i].value == value) {
					
					selectElement.selectedIndex = i;
					
					
					return true;
				}
			}
			return false;
		},
		
    GetZone: function (a) {
        var d = new Array();
        for (var b in this["DrawPoints"][a]) {
            var c = this["DrawPoints"][a][b].getPosition();
            d.push({
                latitud: c.lat(),
                longitud: c.lng()
            })
        }
        return d
    },
    GetZones: function () {
        var d = new Object();
        var e;
        for (var a in this["DrawPoints"]) {
            e = new Array();
            for (var b in this["DrawPoints"][a]) {
                var c = this["DrawPoints"][a][b].getPosition();
                e.push({
                    latitud: c.lat(),
                    longitud: c.lng()
                })
            }
            d[a] = e
        }
        return d
    },
    Clean: function () {
        this.GoogleMap = null;
        this.City = null;
        this.Colony = null;
        this.Street = null;
        this.UserMarker = null;
        this.ILatitud = null;
        this.ILongitud = null;
        this.UserDiv = null;
        this.LocationCallBack = null;
        this.ReadyCallBack = null;
        this.IAddress = null;
        this.Zoom = null;
        this.ContextReposition = null;
        this.ControlsPosition = null
    }
};

/**************************************************************************************Map section ********************************************************************************/
function initialize() {

	 var mainLocation = JSON.parse(Main.WhereAmIData.location);



	 var lat = new Array();
	 var long = new Array();
	 var title = new Array();
	 var street = new Array();
	 var colony = new Array();
	 var openshop  = new Array();
	 var businessid = new Array();
	 var reviewshop = new Array();

	 var paypalcard = new Array();
	 var acceptcard = new Array();
	 var deliveryprice = new Array();

	 var l ="";


				for (var x in Shopping.Business){

					 l = JSON.parse(Shopping.Business[x].location);
					 businessid.push(Shopping.Business[x].id);
					 street.push(Main.TitleCase(Shopping.Business[x].street));
					 colony.push(Main.TitleCase(Shopping.Business[x].colony));
					 title.push(Main.TitleCase(Shopping.Business[x].name));
					 openshop.push(Shopping.Business[x].open);
					 reviewshop.push(Shopping.Business[x].review);

					 paypalcard.push(Shopping.Business[x].paypal);
					 acceptcard.push(Shopping.Business[x].acceptcard);
					 deliveryprice.push(Shopping.Business[x].shipping);

					lat.push(l.latitud)
					long.push(l.longitud)

				}




			var map_options = {
            center: new google.maps.LatLng(mainLocation.latitud,mainLocation.longitud),
            zoom: 11,
			scrollwheel: false,
			draggable: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var google_map = new google.maps.Map(document.getElementById("showcanvas"), map_options);


        var info_window = new google.maps.InfoWindow({
            content: 'loading'
        });

        var tt = [];
        var xx = [];
        var yy = [];
        var hh = [];
		var kk = [];
		var dd = [];
		var st = [];
		var col = [];
		var bii = [];

 for(var i in lat) {



	if( openshop[i] == true )
		{


    var serchlocation = new google.maps.LatLng(mainLocation.latitud, mainLocation.longitud);

	var postionBusiness = new google.maps.LatLng(lat[i], long[i]);

	var distance = google.maps.geometry.spherical.computeDistanceBetween(postionBusiness, serchlocation);

	var distanceInKM = (distance/1000).toFixed(1);

	    dd.push(distanceInKM);
		tt.push(title[i]);
        st.push(street[i]);
		col.push(colony[i]);
        xx.push(lat[i]);
        yy.push(long[i]);
		bii.push(businessid[i]);


		if(openshop[i])
		{
		kk.push("Open");
		}
		else if(openshop[i] == "UserL")
		{
			kk.push("UserL");
		}
		else
		{
			kk.push("Close");
		}



		 if (reviewshop[i] != ""){
		var url = location.href.split('/');

		Shopping.Review = reviewshop[i];
		Shopping.Review.url = url[2];

		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
			var roundTotal = Math.round(Shopping.Review.total);
			var starsReview = "";
			var j = 1;
			for(j=1;j<=5;j++){
				if(roundTotal>=1){
					starsReview +='<img src="images/step2-business-listing/star-yellow.png" alt="star rating" style="width:14px;height:14px;" align="absmiddle">'
					roundTotal=roundTotal-1;
				}else if(roundTotal<=0){
					starsReview +='<img src="images/step2-business-listing/star-grey.png" alt="star rating" style="width:14px;height:14px;" align="absmiddle">'
				}
			}
		}
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
			//rvw = starsReview +' ('+Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>)';
		var	rvw = starsReview ;
			var rating = Shopping.Review.rating+' <?= $lang_resource["Ratings_V2"] ?>';
		}else{
			var rvw = "";
		}
	}
	//alert(paypalcard[i])
		var carddetails = "";
		if(paypalcard[i] != " " && paypalcard[i] != "" && paypalcard[i] != null && paypalcard[i] != 'null'){
			carddetails +='<img src="images/step2-business-listing/pay-1.png" style="width: 46px;margin-top: 8px;float:left">';
		}
		if(acceptcard[i] == "t"){
			carddetails +='<img src="images/step2-business-listing/pay-2.png" style="margin-left:5px;float:left; margin-top:5px;" height="20"><img src="images/step2-business-listing/pay-3.png" style="margin-left:5px;float:left; margin-top:5px;" height="20"><img src="images/step2-business-listing/pay-4.png" style="margin-left:5px;float:left;margin-top:5px;" height="20">'
		}
		
		if(deliveryprice[i]){
			var dprice = deliveryprice[i];	
		}
		if(dprice){
			var dpricetext ='<p style="margin: 2px;"><?=$lang_resource["TEMPLATE_DELIVERYCOST"]?> '+dprice+' </p>'
		}else{
			var dpricetext ='';
		}

        hh.push('<div style="float: left;overflow: hidden; font-size: 11px; height: 130px; padding:3px; width: 270px; margin-top: 15px;" onclick="Shopping.OpenBusiness('+businessid[i]+')">'+rvw+'<small>('+rating+')</small><hr style="margin:10px 0px 0px 0px;" /><h3 class="hand" style="float:left;width:100% ;line-height:10px; margin:10px 0px 10px 0px;"  onclick="Shopping.OpenBusiness('+businessid[i]+')" >'+title[i]+'</h3><p style="margin:0px !important">'+street[i]+',&nbsp&nbsp&nbsp'+colony[i]+'</p>'+dpricetext+'<p style="margin: 2px;"><?=$lang_resource["DISTANCE"]?> '+ distanceInKM+' KM</p><div class="payment-method-icon" style="float:left; margin: -5px 5px;"><span class="label" style="float:left;margin-left: -3px;margin-right: 6px;margin-top: 8px;"><?=$lang_resource["TEMPLATE_PAYMENTS"]?> </span>'+carddetails+'</div></div>');

 }
 else if(openshop[i] == false )
		{


    var serchlocation = new google.maps.LatLng(mainLocation.latitud, mainLocation.longitud);

		//alert(lat[i]+'/'+long[i])
	var postionBusiness = new google.maps.LatLng(lat[i], long[i]);

	var distance = google.maps.geometry.spherical.computeDistanceBetween(postionBusiness, serchlocation);

	var distanceInKM = (distance/1000).toFixed(1);

      //document.getElementById(businessid[i]+"_show").style.display ='';
	   ///alert(document.getElementById(businessid[i]+"_show").style.display);
	//alert(shopstaus)
		//Shopping.Business[i].distance = distanceInKM;
	    dd.push(distanceInKM);
		tt.push(title[i]);
        st.push(street[i]);
		col.push(colony[i]);
        xx.push(lat[i]);
        yy.push(long[i]);
		bii.push(businessid[i]);


		if(openshop[i])
		{
		kk.push("Open");
		}
		else if(openshop[i] == "UserL")
		{
			kk.push("UserL");
		}
		else
		{
			kk.push("Close");
		}

		if (reviewshop[i] != ""){
		var url = location.href.split('/');

		Shopping.Review = reviewshop[i];
		Shopping.Review.url = url[2];

		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
			var roundTotal = Math.round(Shopping.Review.total);
			var starsReview = "";
			var j = 1;
			for(j=1;j<=5;j++){
				if(roundTotal>=1){
					starsReview +='<img src="images/step2-business-listing/star-yellow.png" alt="star rating" style="width:14px;height:14px;" align="absmiddle">'
					roundTotal=roundTotal-1;
				}else if(roundTotal<=0){
					starsReview +='<img src="images/step2-business-listing/star-grey.png" alt="star rating" style="width:14px;height:14px;" align="absmiddle">'
				}
			}
		}
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
			//rvw = starsReview +' ('+Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>)';
		var	rvw = starsReview ;
			var rating = Shopping.Review.rating+' <?= $lang_resource["Ratings_V2"] ?>';
		}else{
			var rvw = "";
		}
	}

		var carddetails = "";
		if(paypalcard[i] != " " && paypalcard[i] != "" && paypalcard[i] != null && paypalcard[i] != 'null'){
			carddetails +='<img src="images/step2-business-listing/pay-1.png" style="width: 46px;margin-top: 8px;float:left">';
		}
		if(acceptcard[i] == "t"){
			carddetails +='<img src="images/step2-business-listing/pay-2.png" style="margin-left:5px;float:left; margin-top:5px;" height="20"><img src="images/step2-business-listing/pay-3.png" style="margin-left:5px;float:left; margin-top:5px;" height="20"><img src="images/step2-business-listing/pay-4.png" style="margin-left:5px;float:left;margin-top:5px;" height="20">'
		}

		if(deliveryprice[i]){
			var dprice = deliveryprice[i];	
		}
		if(dprice){
			var dpricetext ='<p style="margin: 2px;"><?=$lang_resource["TEMPLATE_DELIVERYCOST"]?> '+dprice+' </p>'
		}else{
			var dpricetext ='';
		}


        hh.push('<div style="float: left;overflow: hidden; height: 130px; font-size: 11px; padding:3px; width: 270px; margin-top: 15px;" onclick="Shopping.OpenBusiness('+businessid[i]+')">'+rvw+'<small>('+rating+')</small><hr style="margin:10px 0px 0px 0px;" /><h3 class="hand" style="float:left;width:100% ;line-height:10px; margin:10px 0px 10px 0px;"  onclick="Shopping.OpenBusiness('+businessid[i]+')" >'+title[i]+'</h3><p style="margin:0px !important">'+street[i]+',&nbsp&nbsp&nbsp'+colony[i]+'</p>'+dpricetext+'<p style="margin: 2px;"><?=$lang_resource["DISTANCE"]?> '+ distanceInKM+' KM</p><div class="payment-method-icon" style="float:left; margin: -5px 5px;"><span class="label" style="float:left;margin-left: -3px;margin-right: 6px;margin-top: 8px;"><?=$lang_resource["TEMPLATE_PAYMENTS"]?> </span>'+carddetails+'</div></div>');

 }
 }

		//var image = new google.maps.MarkerImage(OPENIMG);
		var open_image = new google.maps.MarkerImage(OPENIMG);
		var close_image = new google.maps.MarkerImage(CLOSEIMG);
		var point_image = new google.maps.MarkerImage(POINTIMG);



        
		//alert(JSON.stringify(tt))
		
        for (var i in tt ) {

			if(kk[i] == "Open")
			{

            var m = new google.maps.Marker({
                map:       google_map,
                animation: google.maps.Animation.DROP,
                title:     tt[i],
				icon: open_image,
                position:  new google.maps.LatLng(xx[i],yy[i]),
                html:      hh[i]
            });

            google.maps.event.addListener(m, 'click', function() {
                info_window.setContent(this.html);
                info_window.open(google_map, this);
            });
            i++;
			}
			else if(kk[i]== "Close")
			{
				   var m = new google.maps.Marker({
                map:       google_map,
                animation: google.maps.Animation.DROP,
                title:     tt[i],
				icon: close_image,
                position:  new google.maps.LatLng(xx[i],yy[i]),
                html:      hh[i]
            });
			 i++;
			     google.maps.event.addListener(m, 'click', function() {
                info_window.setContent(this.html);
                info_window.open(google_map, this);
            });
			}

			/***********************user location **************************************************************/


        }
		if(!Main.RedirectToCategory) {
		 var m = new google.maps.Marker({
                map:       google_map,
                animation: google.maps.Animation.DROP,
                title:     "User",
				icon: point_image,
                position:  new google.maps.LatLng(mainLocation.latitud,mainLocation.longitud),
                html:      '<h3><?= $lang_resource["FRONT_FORM_YOU_ARE_HERE"] ?></h3>'
            });
			google.maps.event.addListener(m, 'click', function() {
                info_window.setContent(this.html);
                info_window.open(google_map, this);
            });
		}



    }
	 function validateText(str)
{
    var tarea = str;
    var tarea_regex = /^(http|https)/;
    if(tarea_regex.test(String(tarea).toLowerCase()) == true)
    {
       return true;
    }
	else
	{
	   return false;
	}
}

function initializeArrange() {
	 var mainLocationm = JSON.parse(Main.WhereAmIData.location);



	 var latm = new Array();
	 var longm = new Array();
	 var titlem = new Array();
	 var streetm = new Array();
	 var colonym = new Array();
	 var openshopm  = new Array();
	 var businessidm  = new Array();

	 var lm ="";
	  for (var x in Shopping.Business)
        {

			 lm = JSON.parse(Shopping.Business[x].location);
			 latm.push(lm.latitud)
			 longm.push(lm.longitud)
		}

	 for(var i in latm) {

	    	var distanceInKMm='';
				//alert(JSON.stringify(Shopping.Business));
    var serchlocationm = new google.maps.LatLng(mainLocationm.latitud, mainLocationm.longitud);

	var postionBusinessm = new google.maps.LatLng(latm[i], longm[i]);

	var distancem = google.maps.geometry.spherical.computeDistanceBetween(postionBusinessm, serchlocationm);

	 distanceInKMm = (distancem/1000).toFixed(1);
	  //Settings to select miles or km 
	  if(Shopping.Business[i].distanceformat=='N'){
		 distanceInKMm=(parseFloat(distanceInKMm) * 0.6214).toFixed(1) ;
	 }
	 Shopping.Business[i].distanceKm = distanceInKMm;
	 }

}
/**************************************************************************************Map section ********************************************************************************/
