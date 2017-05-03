var WhereAmIBox = {
     WhereAmI: function (c)
    {	
	
       Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
		var m = JSON.stringify(Main.WidgetSettings);
		var e11 = JSON.parse(m);		
		
		
        var b = false;
        if (c)
        {
			Main.customwhereami = c
            Forms.Form.whereami.type = "modify";
            b = true
        }
        else
        {
            c = new Object();
            Forms.Form.whereami.type = "create"
        }
		 var a = '';
     
      
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
        for (i in Main.Countries)
        {
            d.push(
            {
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }

	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		
		
		$(".delivery_dv").hide();
		
		
		if(e11.default_settings.default_country != 0 && e11.default_settings.default_city !=''){
			c.country = e11.default_settings.default_country;
			cc = e11.default_settings.default_country;
			//alert(cc);
			Main.PopulateCitySelect(e11.default_settings.default_country,e11.default_settings.default_city);
				
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = e11.default_settings.default_city;
			cic = e11.default_settings.default_city;
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   //alert(b);
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
              });
		}else{
			
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		} 
		
		 var htms ='';
		 
			
			 /*************************************************** Only WhereAMI Default***********************************************/
			 MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
			
            var delivery_tab = e11.tab_settings.tab_delivery;		
			var pickup_tab = e11.tab_settings.tab_pickup;
			var tab_reservation = e11.tab_settings.tab_reservation;
			
			var htms = '';
			htms += '<div class="row" >';
			htms += '<div class="col-md-12">';
			htms += '<div class="form-group">';
			
			htms += '<select class="form-control" onChange="WhereAmIBox.SearchTypeId(this.value)">';
			if(delivery_tab == 't'){
				htms += '<option value="1">Delivery</option>';
			}
			if(pickup_tab == 't'){
				htms += '<option value="2">Pickup</option>';
			}
			if(tab_reservation == 't'){
				htms += '<option value="3">Reservation</option>';
			}
			htms += '</select>';
			htms += '</div>';
			htms += '</div>';
			htms += '</div>';		
			
			htms += '<div id="SearchSection">';			
			htms += '</div>';
		
		 
		  /*************************************************** Only WhereAMI Default***********************************************/
		

						
		var ABN = '';
		
        ABN += '<div id="mapbox" class="mediummapbox" ></div>';
		
		if (b) {
            Popup.EnableSubmitButton(true)
        } else {
            Popup.EnableSubmitButton(false)
        }
		
		document.getElementById("mid_lft").innerHTML = htms;
			
		
		
		if(e11.tab_settings.tab_delivery == 't'){
			WhereAmIBox.SearchTypeId(1)	
		}else if(e11.tab_settings.tab_delivery == 'f' && e11.tab_settings.tab_pickup == 't'){
			WhereAmIBox.SearchTypeId(2)	
		}else if(e11.tab_settings.tab_delivery == 'f' && e11.tab_settings.tab_pickup == 'f' && e11.tab_settings.tab_reservation== 't'){
			WhereAmIBox.SearchTypeId(3)	
		}
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
         });
		document.getElementById("map_canvas").innerHTML = ABN;
		if(Main.settingfront.map_posititon == 'f'){
			$("#map_canvas").hide();
		}
		var popupSize = 685;
		
		Main.PreWhereAmI();
		
		$('#address').keypress(function (e) {
				
					 var key = e.which;
					 if(key == 13)  // the enter key code
					  {
						Main.SaveWhereAmI();
					  }
				});

		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 590;
      
        
        if (b)
        {
            Forms.Form.whereami.fields.city.save = true;
            if(IS_PAYPAL_ENABLED != 1)
				Forms.Form.whereami.fields.address.save = true;
				Forms.Form.whereami.fields.location.save = true;
            if (Main.WhereAmIData.country && Main.WhereAmIData.city)
            {
                Main.CountrySelected(document.getElementById("country"), Main.WhereAmIData.city)
            }
        }
    },
	
	
	
	
	ShowHideOptionSearch: function(id){
		$(".filter-dv").toggle();
	},
	
	
	SearchTypeId: function(id){
		if(id == 1){
			Main.deliveryAccept =1;
			$( "ul.select_nav li:eq(0) a").addClass('active-1');
			$( "ul.select_nav li:eq(1) a").removeClass('active-2');
			$( "ul.select_nav li:eq(2) a").removeClass('active-3');
			$("#SearchSection").html(Visuals.SearchDelivery());
			$.post("panel/lib/front-main.php", "f=FetchAllRestDataFront", function (f) {
				Main.restaurants = JSON.parse(f);
				MultipleInput.Init("resturants",Main.restaurants, true); 
			})
			$.post("panel/lib/front-main.php", "f=FetchAllCuisineDataFront", function (f) {
				Main.cuisines = JSON.parse(f);
				MultipleInput.Init("cuisines",Main.cuisines, true); 
			})


		}
		if(id == 2){
			Main.deliveryAccept =2;
			$( "ul.select_nav li:eq(0) a").removeClass('active-1');
			$( "ul.select_nav li:eq(1) a").addClass('active-2');
			$( "ul.select_nav li:eq(2) a").removeClass('active-3');
			$("#SearchSection").html(Visuals.SearchPickup());
			$.post("panel/lib/front-main.php", "f=FetchAllRestDataFront", function (f) {
				
				Main.restaurants = JSON.parse(f);
				
				MultipleInput.Init("resturants",Main.restaurants, true); 
			})
			$.post("panel/lib/front-main.php", "f=FetchAllCuisineDataFront", function (f) {
				Main.cuisines = JSON.parse(f);
				
				MultipleInput.Init("cuisines",Main.cuisines, true); 
			})
		}
		if(id == 3){
			Main.deliveryAccept =3;
			$( "ul.select_nav li:eq(0) a").removeClass('active-1');
			$( "ul.select_nav li:eq(1) a").removeClass('active-2');
			$( "ul.select_nav li:eq(2) a").addClass('active-3');
			$("#SearchSection").html(Visuals.SearchReservation());
			
			$.post("panel/lib/front-main.php", "f=FetchAllRestDataFront", function (f) {
				
				Main.restaurants = JSON.parse(f);
				MultipleInput.Init("resturants",Main.restaurants, true); 
			})
			$.post("panel/lib/front-main.php", "f=FetchAllCuisineDataFront", function (f) {
				Main.cuisines = JSON.parse(f);
				MultipleInput.Init("cuisines",Main.cuisines, true); 
			})
		}
		
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
         });
	},
	SearchLocation2ndSave: function(){

        if (Forms.Form.whereamiress.fields.guest.value == ""){
			alert("<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_GUEST_FIELD'] ?>")
            return
        }
		if (document.getElementById("rdate").value == ""){
			alert("<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_DATE'] ?>")
            return
        }
		if (Forms.Form.whereamiress.fields.rhour.value == ""){
			alert("<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_HOUR_FIELD'] ?>")
            return
        }
		if (Forms.Form.whereamiress.fields.rmin.value == ""){
			alert("<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_MINUTE_FIELD'] ?>")
            return
        }

		
		Main.WhereAmIData.reservation = true;
        Main.WhereAmIData.guest = Forms.Form.whereamiress.fields.guest.value;
        Main.WhereAmIData.rdate = document.getElementById("rdate").value;
        Main.WhereAmIData.rhour = Forms.Form.whereamiress.fields.rhour.value;
        Main.WhereAmIData.rmin = Forms.Form.whereamiress.fields.rmin.value;
		
		
		
		Main.SaveWhereAmIReservation();

	},
	SaveWhereReservationSkip: function(){
		Main.WhereAmIData.rhour = -1;
        Main.WhereAmIData.rmin = -1;
		Main.WhereAmIData.reservation = true;
		Main.SaveWhereAmIReservation();
	},
	
	
  
};