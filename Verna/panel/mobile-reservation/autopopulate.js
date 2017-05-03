var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

var AutoPop = {
	Main: function(){
		initializeAutoPopulate();	
	},
	Main1: function(){
		
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryCity"}]', function (b)
			{
				  b = JSON.parse(b);
				  if(b.countrycity){
						var default_country = b.countrycity[0].countryname;
					}
					
					initializeAutoPopulateindex(default_country);	
							
		});
				
	},
	Locate: function(){
    	initializeAutoPopulate(); 
		geolocate()
	}	
};
function initializeAutoPopulateindex(default_country) {

	$.ajax({
    //url:'https://maps.googleapis.com/maps/api/geocode/json?address=india',
	 url:'https://maps.googleapis.com/maps/api/geocode/json?address='+default_country,
    type: 'GET',
    dataType: 'data'
  })
  .done(function(data){               
      var results = eval(data.results[0].address_components);
      console.log(JSON.stringify(results));
      for(v in results) {
        type = results[v].types[0];
        if (type == "country") {                            
         	country_shortcode = results[v].short_name;
			var autocomplete;
			// Create the autocomplete object, restricting the search
			// to geographical location types.
			
			var options = {
				types: ['geocode'],				
				componentRestrictions: {country: country_shortcode},
				//regions: {administrative_area_level_2: 'kolkata'}
			};
			
			autocomplete = new google.maps.places.Autocomplete(
			/** @type {HTMLInputElement} */(document.getElementById('address')),options);
			
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				fillInAddress();
			});
			 
		}      
      }
  });	

}
function initializeAutoPopulate() {	
	$.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+Main.settingfront.default_country_name,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){               
      var results = eval(data.results[0].address_components);
      console.log(JSON.stringify(results));
      for(v in results) {
        type = results[v].types[0];
        if (type == "country") {                            
         	country_shortcode = results[v].short_name;
			var autocomplete;
			// Create the autocomplete object, restricting the search
			// to geographical location types.
			var inputdata = 'kolkata';
			var options = {
				types: ['geocode'],
				input: inputdata,
				componentRestrictions: {country: country_shortcode},
				//regions: {administrative_area_level_2: 'kolkata'}
			};
			
			autocomplete = new google.maps.places.Autocomplete(
			/** @type {HTMLInputElement} */(document.getElementById('address')),options);
			
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				fillInAddress();
			});
			 
		}      
      }
  });	
}


// [START region_fillform]
function fillInAddress() {
  var a = new Object();
  a.id = "address";
  a.value = document.getElementById("address").value        
  GoogleMap.UpdateUserPositionAutopop(a);

  Main.PreWhereAmI()  
  
  var postal_code,street_number,locality;

  $.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+document.getElementById("address").value,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){               
      var results = eval(data.results[0].address_components);

      console.log(JSON.stringify(results));

      for(v in results) {
        type = results[v].types[0];
       // alert(type)
        if (type == "postal_code") {                            
          AutoPop.postal_code = results[v].short_name;                   
        }
        if (type == "street_number") {                            
          AutoPop.street_number = results[v].short_name;                   
        }
        if (type == "route") {                            
          AutoPop.route = results[v].short_name;                   
        }
        if (type == "locality") {                            
          AutoPop.locality = results[v].short_name;                   
        }
      }
  });
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });

      autocomplete.setBounds(circle.getBounds());
    });
  }
}
// [END region_geolocation]




