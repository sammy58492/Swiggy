var IS_PAYPAL_ENABLED = 1;
var GoogleMap = {
    MapApiLoaded: false,
    Init: function (b, f, c, a, d, e, g, h) {
        this.ILatitud = f;
        this.ILongitud = c;
        this.Zoom = a;
        this.MapDiv = document.getElementById(b);
        this.LocationCallBack = d;
        this.IAddress = e;
        this.ReadyCallBack = g;
        this.ControlsPosition = h;
        if (!this.MapApiLoaded) {
            var i = document.createElement("script");
            i.src = "https://maps.googleapis.com/maps/api/js?sensor=true&callback=GoogleMap.ApiReady&language=en";
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
        var d;
        if (this.ControlsPosition) {
            switch (this.ControlsPosition) {
            case "bottomright":
                d = google.maps.ControlPosition.RIGHT_BOTTOM;
                break;
            default:
                d = google.maps.ControlPosition.TOP_LEFT;
                break
            }
        }
        var a = {
            zoom: this.Zoom,
            center: new google.maps.LatLng(this.ILatitud, this.ILongitud),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            styles: [{
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }]
        };
        this.GoogleMap = new google.maps.Map(this.MapDiv, a);
        this.UserMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.ILatitud, this.ILongitud),
            map: this.GoogleMap,
            draggable: false
        });
        if (this.IAddress && this.ILatitud == "" && this.ILongitud == "") {
            this.UpdateUserMarker(this.IAddress)
        }
        var c = this;
        if (this.LocationCallBack) {
            google.maps.event.addListener(this.UserMarker, "dragend", function (f) {
                c.LocationCallBack(c.GetUserLocation())
            });
            google.maps.event.addListener(this.GoogleMap, "zoom_changed", function (f) {
                c.LocationCallBack(c.GetUserLocation())
            })
        }
        this.CenterListener = google.maps.event.addListener(GoogleMap.GoogleMap, "center_changed", function (f) {
            GoogleMap.Reposition = GoogleMap.GoogleMap.getCenter();
            GoogleMap.MoveUserMarker()
        });
        var b = google.maps.event.addListener(GoogleMap.GoogleMap, "idle", function () {
            if (GoogleMap.ReadyCallBack) {
                GoogleMap.ReadyCallBack()
            }
            google.maps.event.removeListener(b)
        })
    },
    ZoomIn: function () {
        GoogleMap.GoogleMap.setZoom(GoogleMap.GoogleMap.getZoom() + 1)
    },
    ZoomOut: function () {
        GoogleMap.GoogleMap.setZoom(GoogleMap.GoogleMap.getZoom() - 1)
    },
    MoveUserMarker: function () {
        GoogleMap.UserMarker.setPosition(GoogleMap.Reposition);
        if (GoogleMap.LocationCallBack) {
            GoogleMap.LocationCallBack(GoogleMap.GetUserLocation())
        }
    },
	 UpdateUserPositionip: function (a, c,st) {

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
        }
        this.UpdateUserMarkerip(b)
    },
    UpdateUserMarker: function (c) {

        if (c == "") {
            return false
        }
        Main.Loading();
        var b = new google.maps.Geocoder();
        var a = this;

        b.geocode({
            address: c
        }, function (f, d) {
            if (d == google.maps.GeocoderStatus.OK) {

                var e = new google.maps.LatLngBounds;

                a.UserMarker.setPosition(f[0].geometry.location);
                if (a.LocationCallBack) {
                    a.LocationCallBack(a.GetGeoLocation())
                }
                e.extend(f[0].geometry.location);
                a.GoogleMap.fitBounds(e);
                var g = google.maps.event.addListener(a.GoogleMap, "idle", function () {

                    Main.Ready();
                    $(a.MapDiv).css("margin-left", "0px");
                    Main.UpdateWhereAmIBtn(true, "<?= $lang_resource['MAP_NEXT'] ?>", Main.SaveWhereAmIData);
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
    UpdateUserMarkerip: function (c) {

        if (c == "") {
            return false
        }
        Main.Loading();
        var b = new google.maps.Geocoder();
        var a = this;

        b.geocode({
            address: c
        }, function (f, d) {
            if (d == google.maps.GeocoderStatus.OK) {

                var e = new google.maps.LatLngBounds;

                a.UserMarker.setPosition(f[0].geometry.location);
                if (a.LocationCallBack) {
                    a.LocationCallBack(a.GetGeoLocation())
                }
                e.extend(f[0].geometry.location);
                a.GoogleMap.fitBounds(e);
                var g = google.maps.event.addListener(a.GoogleMap, "idle", function () {

                    Main.Ready();
                    $(a.MapDiv).css("margin-left", "0px");
                    Main.UpdateWhereAmIBtn(true, "<?= $lang_resource['MAP_NEXT'] ?>", Shopping.Start);
                   Main.UpdateBackBtn(true, "<?= $lang_resource['MOBILE_SECOND_PAGE_BACK'] ?>",Shopping.ReturnBtnAction);
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
            zoom: this.GoogleMap.getZoom()
        }

    },
	  GetGeoLocation: function()
    {
	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (b) {


            Main.Ready();
            if (b != "") {

                b = JSON.parse(b);
                Main.Countries = b.countries;

		var geocoder = new google.maps.Geocoder();
	var mapOptions = {
	    zoom: 6
	  };
	  // Try HTML5 geolocation
	  if(navigator.geolocation) {

	    navigator.geolocation.getCurrentPosition(function(position) {

	      var pos = new google.maps.LatLng(position.coords.latitude,
		                               position.coords.longitude);
		//var lat = pos[0];
		//var long = pos[1];
		//alert(lat+" "+long);
		//alert(pos);
	console.log("latlang : "+pos);
		var lat = pos.lat();
		var lon = pos.lng();
		//console.log("latitude : "+lat+" longitude : "+lon);
	    	geocoder.geocode({'latLng': pos,'language': 'en'}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
			var addresscomp = eval(results[0].address_components);
			var geocnty = false;var geostrt = "", geomapstr = "";
			console.log("Decoded address : "+addresscomp);
			for (var i = 0; i  < addresscomp.length; i++) {
				if (addresscomp[i]['types'][0] == 'locality') {
					var geocity = addresscomp[i]['long_name'];
					console.log("locality :"+addresscomp[i]['long_name']);
				}
				if (addresscomp[i]['types'][0] == 'country') {
					geocnty = addresscomp[i]['long_name'];
					console.log("country :"+addresscomp[i]['long_name']);
				}
			}
		      if (results[1]) {
			var reltlen = results.length - 1;
			/* var geocnty = false;var geostrt = "", geomapstr = ""; */
/* 			if (results[reltlen].formatted_address) {
				geocnty = results[reltlen].formatted_address;
			}
			var relclen = reltlen - 1;
			if (results[relclen].formatted_address) {
				var geocity = results[relclen].formatted_address;
				geocity = geocity.split(",");
				console.log(geocity[0]);
			} */
			console.log(results);

			Main.ipaddr = results[1].formatted_address;
			//alert("Main.ipaddr : "+Main.ipaddr);
			responce = Main.ipaddr.split(",");
			if (responce[1]){
				geostrt = responce[1];
			}
			console.log(responce+" "+responce.length);
			var reslen = responce.length, ctylen = reslen - 3, ctrylen = reslen - 1;
			responce[ctrylen] = geocnty;
				responce[ctylen] = geocity;
			/* if (responce[ctrylen] && responce[ctylen]){
				responce[ctrylen] = responce[ctrylen].trim();
				responce[ctylen] = responce[ctylen].trim();
			}else{
				responce[ctrylen] = geocnty;
				responce[ctylen] = geocity[0];
			} */
			if (results[0]){
				geomapstr = results[0].formatted_address;
				geomapstr = geomapstr.split(",");
			}
			GoogleMap.UpdateUserPositionip(responce[ctylen], responce[ctrylen],geomapstr[0],lat, lon);
			//GoogleMap.Init("mapbox", responce[3], responce[4], a.zoom, Main.WhereAmILocationUpdated)
			//Main.PopulateCitySelect(responce[1], responce[0]);

			var contrycheck = 0, contryid, ctycheck = 0;

			console.log(Main.Countries);
			for (i in Main.Countries)
        		{
				console.log(Main.Countries[i].name.toUpperCase()+" "+responce[ctrylen].toUpperCase());
				if (Main.Countries[i].name.toUpperCase() == responce[ctrylen].toUpperCase()){
					contrycheck = 1;contryid = Main.Countries[i].id;
				}
			}
			contrycheck=1;
			contryid = Main.Countries[0].id;
			if (contrycheck != 1){
				alert("<?= $lang_resource['NORESTAURANTONCOUNTRY_V21'] ?>");
				Main.Ready(true);
				return;
			}
			//Main.PopulateCitySelect(contryid, 7);
			Main.WhereAmIData = new Object();
			Main.WhereAmIData.country = contryid;
			console.log("Values saved");
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + contryid + '"}]}]', function (f)
			{
				console.log(f);
			    if (f != "")
			    {
				Main.Franchises = JSON.parse(f).franchises;
			    }
			console.log(Main.Franchises);
			for (i in Main.Franchises)
        		{
			/*	if (Main.Franchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){
					ctycheck = 1;Main.WhereAmIData.city = Main.Franchises[i].id;
				}*/
			}
			ctycheck=1;
			Main.WhereAmIData.city=  Main.Franchises[0].id;
			if (ctycheck == 1) {
			var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
			console.log("Franchises got"+a);
			if(IS_PAYPAL_ENABLED == 1)
					Main.WhereAmIData.currency = Main.Franchises[a].currency;
			console.log("after paypal value 1");
			Main.WhereAmIData.ga = Main.Franchises[a].ga;
			Main.WhereAmIData.cityname = Main.Franchises[a].city;
			console.log("set francises");
			if(IS_PAYPAL_ENABLED != 1)
					Main.WhereAmIData.address = geostrt;
			console.log("paypal value not 1");
			Main.WhereAmIData.location = '{"latitud":'+lat+',"longitud":'+lon+',"zoom":15}';
			console.log("after location" + Main.WhereAmIData.location);
			Main.WhereAmIData.approved = true;
			//Ads.Init("adscontainer", Main.WhereAmIData.city);
			$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b)
			{
			   Main.Ready(true);
			});

			}else {
				alert("No restaurant found in your location");
				Main.Ready(true);
			}
                	})
		      } else {
			alert('No results found');
		      }
		    } else {
		      alert('Geocoder failed due to: ' + status);
		    }
	    	});
	    }, function() {
	      alert("Geolocation service failed");
		  Main.Ready(true);
	    },{
        	enableHighAccuracy:true,
        	timeout:10000,
       		maximumAge:Infinity
   	 }

		);
	  } else {
	    // Browser doesn't support Geolocation
	    alert("Browser doesn't support Geolocation");
	  }
                //Main.AskAddressData()
            }
           // Main.Ga("/")
        })




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
                draggable: true,
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
                draggable: true,
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
        if (this.CenterListener) {
            google.maps.event.removeListener(this.CenterListener)
        }
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
        this.ControlsPosition = null;
        this.Reposition = null
    }
};
