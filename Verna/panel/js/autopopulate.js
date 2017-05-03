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
		//alert(1)
		Main.ActiveSearch = 0;
		initializeAutoPopulate();	
		
	},
	Main2: function(){
		Main.ActiveSearch = 0;
		initializeAutoPopulatea();	
		
	},
	Main3: function(){
		Main.ActiveSearch = 0;
		initializeAutoPopulateb();	
		
	},
	Main1: function(){
		//alert(3)
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryCity"}]', function (b)
			{
				  b = JSON.parse(b);
				  if(b.countrycity){
						var default_country = b.countrycity[0].countryname;
					}
					Main.ActiveSearch = 0;
					initializeAutoPopulateindex(default_country);	
							
		});
				
	},
	Locate1: function(){
    	Main.ActiveSearch = 1;
	},
	Locatea: function(){
		//alert(2)
		Main.ActiveSearch = 0;
    	initializeAutoPopulatea(); 
		geolocate()
	},
	Locateb: function(){
		//alert(2)
		Main.ActiveSearch = 0;
    	initializeAutoPopulateb(); 
		geolocate()
	},	
	Locate: function(){
		Main.ActiveSearch = 0;
    	initializeAutoPopulate(); 
		geolocate()
	}	
	
};
function initializeAutoPopulateindex(default_country) {

//document.getElementsByTagName("head")[0].appendChild(i);
	$.ajax({
    //url:'https://maps.googleapis.com/maps/api/geocode/json?address=india',
	 url:'https://maps.googleapis.com/maps/api/geocode/json?address='+default_country,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){  
       if(data.results[0])  
	  {       
      var results = eval(data.results[0].address_components);
      console.log(JSON.stringify(results));
      for(v in results) {
        type = results[v].types[0];
        if (type == "country") {                            
         	country_shortcode = results[v].short_name;
			//alert(country_shortcode)
			var autocomplete;
			// Create the autocomplete object, restricting the search
			// to geographical location types.
			
			var options = {
				types: ['geocode'],				
				componentRestrictions: {country: country_shortcode},
				//regions: {administrative_area_level_2: 'kolkata'}
			};
			
			autocomplete = new google.maps.places.Autocomplete(
			/** @type {HTMLInputElement} */(document.getElementById('address_delpop')),options);
			
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				
				fillInAddress(2);
			});
			 
		}      
      }
	  }
  });	

}
function initializeAutoPopulatea() {	
//alert(12)
Main.ActiveSearch = 0;
var countr = $('#country option:selected').text();

//alert("ok")
	$.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+countr,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){ 
  
  
   if(data.results[0])  
	  {             
      var results = eval(data.results[0].address_components);
    //alert(results)
      for(v in results) {
        type = results[v].types[0];
        if (type == "country") {                            
         	country_shortcode = results[v].short_name;
			//alert(country_shortcode)
			var autocomplete;
			// Create the autocomplete object, restricting the search
			// to geographical location types.
			var inputdata = 'United States';
			var options = {
				types: ['geocode'],
				input: inputdata,
				componentRestrictions: {country: country_shortcode},
				//regions: {administrative_area_level_2: 'kolkata'}
			};
			//alert(document.getElementById('address_delpop').value);
			autocomplete = new google.maps.places.Autocomplete(
			/** @type {HTMLInputElement} */(document.getElementById('address_delpop')),options);
			
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				//alert(6)
				fillInAddress(2);
			});
			 
		}      
      }
	  }
  });	
}
function initializeAutoPopulateb() {	
//alert(12)
Main.ActiveSearch = 0;
var countr = $('#country option:selected').text();

//alert("ok")
	$.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+countr,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){ 
  
  
   if(data.results[0])  
	  {             
      var results = eval(data.results[0].address_components);
    //alert(results)
      for(v in results) {
        type = results[v].types[0];
        if (type == "country") {                            
         	country_shortcode = results[v].short_name;
			//alert(country_shortcode)
			var autocomplete;
			// Create the autocomplete object, restricting the search
			// to geographical location types.
			var inputdata = 'United States';
			var options = {
				types: ['geocode'],
				input: inputdata,
				componentRestrictions: {country: country_shortcode},
				//regions: {administrative_area_level_2: 'kolkata'}
			};
			//alert(document.getElementById('address_delpop').value);
			autocomplete = new google.maps.places.Autocomplete(
			/** @type {HTMLInputElement} */(document.getElementById('address_del')),options);
			
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				//alert(6)
				fillInAddress(3);
			});
			 
		}      
      }
	  }
  });	
}
function initializeAutoPopulate() {	
Main.ActiveSearch = 0;
var countr = $('#country option:selected').text();
var input = (document.getElementById('address'));
//alert("ok")
	$.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+countr,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){ 
  
  
   if(data.results[0])  
	  {             
      var results = eval(data.results[0].address_components);
      for(v in results) {
        type = results[v].types[0];
        if (type == "country") {                            
         	country_shortcode = results[v].short_name;
			var autocomplete;
			// Create the autocomplete object, restricting the search
			// to geographical location types.
			var inputdata = 'greece';
			var options = {
				types: ['geocode'],
				componentRestrictions: {country: country_shortcode},
				//regions: {administrative_area_level_2: 'kolkata'}
			};
			autocomplete = new google.maps.places.Autocomplete(input,options);
			
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				fillInAddress(1);
			});
			 
		}      
      }
	  }
  });	
}


// [START region_fillform]
function fillInAddress(indx) {
	//alert(indx)
	Main.ActiveSearch = 0;
	var streetadd = "";
	if(indx == 1) {
  var a = new Object();
  a.id = "address";
  a.value = document.getElementById("address").value    
   streetadd = document.getElementById("address").value
	}
	else if(indx == 2) {
		
		$("div.pac-container").remove();
	  var a = new Object();
	  a.id = "address";
	  a.value = document.getElementById("address_delpop").value    
	  streetadd = document.getElementById("address_delpop").value
	  
	  if(Forms.Form['whereami'].fields){
		  //alert(streetadd)
		  Forms.Form['whereami'].fields['address'].value = streetadd;
		  //alert(Forms.Form['whereami'].fields['address'].value)
		  }
	   Main.WhereAmIData.address = streetadd;
	   Main.WhereAmIData.addresspopulate = streetadd;
		}
	else if(indx == 3) {
		
		$("div.pac-container").remove();
	  var a = new Object();
	  a.id = "address";
	  a.value = document.getElementById("address_del").value    
	  streetadd = document.getElementById("address_del").value
	  
	  if(Forms.Form['whereami'].fields){
		  //alert(streetadd)
		  Forms.Form['whereami'].fields['address'].value = streetadd;
		  //alert(Forms.Form['whereami'].fields['address'].value)
		  }
	   Main.WhereAmIData.address = streetadd;
	   Main.WhereAmIData.addresspopulate = streetadd;
		}
 // alert(document.getElementById("address").value)  
  GoogleMap.UpdateUserPositionAutopop(a);
  

  Main.PreWhereAmI()  
  
  var postal_code,street_number,locality;

  $.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+streetadd,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data){     
  
  if(data.results[0])  
	  {           
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
	  }
  });
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	Main.ActiveSearch = 0;
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




