<?php
require_once("../panel/lib/front-main.php");
require("../languages/lang.en.php");

$ste_url=$_SERVER['HTTP_HOST'];
$data=json_decode(stripslashes($_REQUEST["data"]),true);
//$data=json_decode(($_REQUEST["data"]),true);
//print_r($data);
$background_color='#f2f2f2';
if($data["background_color"]!=''){
	$background_color=$data["background_color"];
}
?>

<?php
require('../panel/config.php');
  $link = ConnectDB($CFG);
    pg_prepare($link,'sql44','SELECT * from w_countries ');
       $result = pg_execute($link,'sql44',array());

       //$settings = array();
		$country=array();
       while($row = pg_fetch_array($result))
               {
				  
				   $country[$row["id"]]=$row["name"];
			   }
	 pg_prepare($link,'sql441','SELECT * from w_franchises ');
       $result = pg_execute($link,'sql441',array());

       //$settings = array();
		$city=array();
       while($row1 = pg_fetch_array($result))
               {
				 // unset($city1);
				  $city1 = new stdClass();
				  $city1->name=$row1["city"];
				  $city1->country=$row1["country"];
				   $city1->id=$row1["id"];
				  $city[$city1->id]= $city1;
			   }		   
	pg_prepare($link,'sql4412','SELECT * from w_categories ');
       $result = pg_execute($link,'sql4412',array());

       //$settings = array();
		$categories=array();
		$catname=array();
       while($row2 = pg_fetch_array($result))
               {
				  if($row2['name'] != "")
					$catname[strtolower($row2['name'])][] = $row2['id'];
				  
			   }
			 	
			   foreach($catname as $key=>$val) {
				   $id=implode(",",$val);
				    $categories[$id]=$key;
			   }
			    
		/*	   echo '<pre>';	   
  print_r($data["delivery_tab"]);
echo '</pre>';*/
$allrestdata=json_encode(GetAllRestDataFront1($CFG));
$allCuisinedata=json_encode(GetAllCuisineDataFront1($CFG));
function GetAllRestDataFront1($CFG)
{
$link = ConnectDB($CFG);

	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());

	$returants = array();
	$returant = new stdClass();
	    $returant->id = "-1";
		$returant->name = "All";
		array_push($returants,$returant);

	pg_prepare($link,'sqlSettingsFront','SELECT * FROM w_frontsettings');
	$result1 = pg_execute($link,'sqlSettingsFront',array());
	$row1 = pg_fetch_array($result1);
	$resturant_name = $row1['restaurant'];
	$resturant_name =json_decode($resturant_name);

	while($row = pg_fetch_array($result))
		{
		if (in_array(-1, $resturant_name) || in_array($row['id'],$resturant_name)){
		//unset($returant);
		$returant = new stdClass();
		$returant->id = $row['id'];
		$returant->name = $row['name'];
		array_push($returants,$returant);
		}
		}

	return $returants;
}
function GetAllCuisineDataFront1($CFG)
{
	$link = ConnectDB($CFG);

	pg_prepare($link,'sql31111','SELECT * from w_categories');
	$result = pg_execute($link,'sql31111',array());

	$cuisines = array();
	$cuisine = new stdClass();
	    $cuisine->id = "-1";
		$cuisine->name = "All";
		array_push($cuisines,$cuisine);


	$catname=array();
       while($row = pg_fetch_array($result))
               {
				  if($row['name'] != "")
					$catname[strtolower($row['name'])][] = $row['id'];
				  
			   }
			 	
			  
		
	   foreach($catname as $key=>$val) {
			//unset($cuisine);
			$cuisine = new stdClass();
			$cuisine->id = implode(",",$val);
			$cuisine->name =  $key;
			
			array_push($cuisines,$cuisine);
		}

		
	return $cuisines;
}
pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
	$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	$rowtimeformat = pg_fetch_array($resulttimeformat);
	$time_format=$rowtimeformat['value'];

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="<?='http://'.$ste_url?>/widget/css/mobile-style.css">
<link rel="stylesheet" type="text/css" href="<?='http://'.$ste_url?>/widget/css/reservation.css">
<link rel="stylesheet" type="text/css" href="<?='http://'.$ste_url?>/widget/fonts/font-awesome.min.css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="<?='http://'.$ste_url?>/panel/js/jCarouselLite.js"></script>
<script type="text/javascript" src="<?='http://'.$ste_url?>/widget/js/multipleinput.js"></script>
<script type="text/javascript" src="<?='http://'.$ste_url?>/widget/js/popup.js"></script>
<script type="text/javascript" src="<?='http://'.$ste_url?>/widget/js/googlemap.js"></script>

<link href="<?='http://'.$ste_url?>/resources/datepicker/jquery.datepick.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?='http://'.$ste_url?>/resources/datepicker/jquery.datepick.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry"></script>

  


<style type="text/css">
#link                {
        height: 92px;
        width: 350px;
        display: block;
}

</style>

<script>

function searchfn(){
	var custom_link = "U2VhcmNoQnk=_";
	var geocoder = new google.maps.Geocoder();
	var address='';
	if(document.getElementById("country")){
		if((document.getElementById("country").value).trim()==''){
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>");
			return
			
		}
	}
	if(document.getElementById("city")){
		if((document.getElementById("city").value).trim()==''){
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
			return
			
		}
	}
	if(document.getElementById("delivery_tab")){
		if((document.getElementById("delivery_tab").value).trim()=='1'){
						if(document.getElementById("address")){
					if((document.getElementById("address").value).trim()==''){
						alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
						return
						
					}
				}
			
		}
	}
	
	
	neighborhood1=(document.getElementById("neighborhood1").value).trim();
	
	if(document.getElementById("delivery_tab")){
		if((document.getElementById("delivery_tab").value).trim()!='2'){
	if(document.getElementById("address")){
		
		if(neighborhood1=='t'){
			
			
			var address5 = document.getElementById("address");

		add= address5.options[address5.selectedIndex].text;
	}else{
		add=document.getElementById("address").value;
	}
		
		if(add.trim()!=''){
			
			if(address!=''){
			address+=' , ';
		
			
		}
		custom_link +=""+add;
		//alert(custom_link);
	//	custom_link +=add.split(" ").join("-");
		address=address+(add);
		}
	}
	
		}
	}
	
	
	
	if(document.getElementById("delivery_tab")){
		if((document.getElementById("delivery_tab").value).trim()=='2'){
			
			
			if(document.getElementById("address1")){
		
		add1=document.getElementById("address1").value;
		add1="5th-avenue"
		if(add1.trim()!=''){
				
			if(address.trim()!=''){
			address+=' , ';
		
			
		}

		custom_link +=""+add1;
		//alert(custom_link)
		address=address+(add1);
		
		}
	}
			
		}
	}
	console.log(custom_link);
	if(document.getElementById("city")){
		
		if(document.getElementById("city").value!=''){
			citytxt=document.getElementById("city").options[document.getElementById("city").selectedIndex].text;
		citytxt=  citytxt.substring(0, 1).toUpperCase() + citytxt.substring(1);
		
			if(address!=''){
			address+=' , ';
		}else{
			//custom_link +=citytxt.split(" ").join("-");
		}
		address=address+document.getElementById("city").options[document.getElementById("city").selectedIndex].text;
		
		custom_link +="_"+citytxt.split(" ").join("-");
		}
	}
	if(document.getElementById("country")){
		if(document.getElementById("country").value!=''){
			if(address!=''){
			address+=' , ';
		}
			
		address=address+document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
			countrytxt=document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
		countrytxt=  countrytxt.substring(0, 1).toUpperCase() + countrytxt.substring(1);
		custom_link +="_"+countrytxt.split(" ").join("-");
		
		}
			
	}
	deliveryAccept=document.getElementById("delivery_tab").value;
	if(deliveryAccept == "1")
		{

			custom_link +=   "_delivery";

		}
		
		
		if(deliveryAccept == "2"){

			custom_link +=   "_pickup";

			}

	geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK)
{
	console.log(JSON.stringify(results));
	// custom_link +=   "_"+locatserch.latitud;
	
	
	
			custom_link +=   "_"+results[0].geometry.location.lat();
			custom_link +=   "_"+results[0].geometry.location.lng();
			
			Searchzipcode='';
			 for (var i=0; i<results[0].address_components.length; i++) {
						for (var b=0;b<results[0].address_components[i].types.length;b++) {
							
						    if (results[0].address_components[i].types[b] == "postal_code") {
								
								Searchzipcode =results[0].address_components[i].short_name
								break;
							}
						 }

					

					}
					
					if(deliveryAccept == "2"){
						custom_link +=   "_"+'-1';
					}else{
						if(Searchzipcode.trim() == ""){
							custom_link +=   "_"+'-1';
						}else{
							custom_link +=   "_"+Searchzipcode;
						}
					}
					
					
					
			custom_link +=   "_"+'21';
		  main_site_url=$("#main_site_url").val();
		  
		  resturantstag=$("#resturantstag").val();
		   cuisinestag=$("#cuisines").val();
		 if(neighborhood1=='t'){
			 	custom_link +=   "_"+document.getElementById("address").value;;
		 }else{
			 
		   custom_link +=   "_-1";
		 }
		  
		   resturentarr=MultipleInput.Tags.resturants;
		   resturentarr1=new Array();
		  
		   for(Z in resturentarr){
			   resturentarr1[Z]=resturentarr[Z].id;
			   
		   }
		 K=0;
		 resturentarr2=new Array();
		     for(Z1 in  resturentarr1){
				  
				   resturentarr2[K]=resturentarr1[Z1];
				   K++;
				
			 }
			
		    resturantsstr = resturentarr2.join(); 
			
			if(resturantsstr.trim()==''){
				 custom_link +=   "_-1";
				}else{
					 custom_link +=   "_"+resturantsstr.trim();
				}   
				
		  
		    cuisinesarr=MultipleInput.Tags.cuisines;
		    cuisinesarr1=new Array();
			
		   for(Z in  cuisinesarr){
			    cuisinesarr1[Z]= cuisinesarr[Z].id;
			   
		   }
		   K=0;
		 cuisinesarr2=new Array();
		     for(Z1 in  cuisinesarr1){
				 
				   cuisinesarr2[K]=cuisinesarr1[Z1];
				   K++;
				
			 }
		     cuisinesstr =  cuisinesarr2.join(); 
		     console.log(resturantsstr);
			    console.log(cuisinesstr);
				if(cuisinesstr.trim()==''){
					custom_link +=   "_-1";
				}else{
					 custom_link +=   "_"+cuisinesstr.trim();
				}
//alert(main_site_url+'/'+custom_link)
		window.open(main_site_url+'/'+custom_link, '_blank');
			
}



	});
	
}
$(document).ready(function(){
	wrapwidth=$("#wrap").height();
	
	if(wrapwidth>=470){
		 $("#wrap").css("height", "470px"); 
		 $("#wrap").css("overflow-y", "scroll"); 
		 
	}
	   Popup.Init("popupcontainer");
		googleCityName='';
		Searchzipcode='';
		WhereAmIDatacity='';
		MainWhereAmIDatacurrency='';
		MainWhereAmIDataga='';
		MainWhereAmIDatacityname='';
		 a = new Object();
            a.latitud = 30.977609;
            a.longitud = -43.080139;
            a.zoom = 1

		 GoogleMap.Init("mapbox",  a.latitud,  a.longitud, a.zoom,'')

		var ipaddr=''; 
		restaurants11=  new Array();
		
		restaurants1=$("#allresthidd").val();
		
		if(restaurants1!=''){
			restaurants11 = JSON.parse(restaurants1);
				MultipleInput.Init("resturants",restaurants11, true); 
		}
		
		Cuisine11=  new Array();
		
		Cuisine1=$("#allCuisinedata").val();
		
		if(Cuisine1!=''){
			Cuisine11 = JSON.parse(Cuisine1);
				MultipleInput.Init("cuisines",Cuisine11, true); 
		}		
	
		
		
  $("#hide").click(function(){
    $("#category_dv").slideToggle(500);
  });
});
function getcity(country){
	
	html='<option value="" selected="selected">City</option>';
	<?php
	foreach($city as $val){
		?>
		if(country==<?=$val->country?>){
			
			html+='<option  value="<?=$val->id?>">'+"<?=$val->name?>"+'</option>';
		}
		<?php
	}
	?>
	
	$("#city").html(html);
	
}
function GetUserLocation(){
	var geocoder = new google.maps.Geocoder();
	var mapOptions = {
	    zoom: 4
	  };
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
		console.log("latitude : "+lat+" longitude : "+lon);
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
				 console.log(results);

			ipaddr = results[1].formatted_address;
			//alert("Main.ipaddr : "+Main.ipaddr);
			responce = ipaddr.split(",");
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
			
				
       
       
        $.post("../panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (b)
        {
			  b = JSON.parse(b);
                MainCountries = b.countries;
				var contrycheck = 0, contryid, ctycheck = 0;
			for (i in MainCountries)
        		{
				console.log(MainCountries[i].name.toUpperCase()+" "+responce[ctrylen].toUpperCase());
				if (MainCountries[i].name.toUpperCase() == responce[ctrylen].toUpperCase()){
					contrycheck = 1;
					contryid = MainCountries[i].id;
				}
			}

			contrycheck=1;
			contryid = MainCountries[0].id;
			
			
			if (contrycheck != 1){
				alert("<?= $lang_resource['No_restaurant_country_V2'] ?>");
				Main.Ready(true);
				return;
			}
			//Main.PopulateCitySelect(contryid, 7);
			
			MainWhereAmIDatacountry = contryid;
			console.log("Values saved");
			
			 $.post("../panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (f)
			{
				//alert(f)
				console.log(f);
			    if (f != "")
			    {
				MainFranchises = JSON.parse(f).franchises;
				//alert(MainFranchises[i].id);
			    }
				//alert(responce[ctylen])
				//console.log(MainFranchises);
			for (i in MainFranchises)
        		{
					//alert(MainFranchises[i].city.toUpperCase()+" "+responce[ctylen].toUpperCase())
				console.log(MainFranchises[i].city.toUpperCase()+" "+responce[ctylen].toUpperCase());
			     googleCityName = responce[ctylen].toUpperCase()

				if (MainFranchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){
					//alert("1")
					//var ctycheck = 1;
					MainWhereAmIDatacity =responce[ctylen];
					

				}
			}
			 var ctycheck = 1;
			 MainWhereAmIDatacity =MainFranchises[0].id;
			if (ctycheck != 1){
				alert("<?= $lang_resource['NORESTAURANTONCOUNTRY_V21'] ?>");
				Main.Ready(true);
				return;
			}
			/*else {

				alert(Main.WhereAmIData.city);
				if(Main.NullToEmpty(Main.searchType) != "Global")
				{
					//alert(Main.WhereAmIData.city);
				Main.ChooseDeliverOptionGlobal();
				}
			}*/



			if (ctycheck == 1) {
			var a =GetIndexOnPropertyValueFound(MainFranchises, "id", MainWhereAmIDatacity);
			console.log("Franchises got"+a);
			
			console.log("after paypal value 1");
			MainWhereAmIDataga =MainFranchises[a].ga;
			MainWhereAmIDatacityname = responce[ctylen];
			console.log("set francises");
			
					MainWhereAmIDataaddress = geostrt;
			console.log("paypal value not 1");
			MainWhereAmIDatalocation = '{"latitud":'+lat+',"longitud":'+lon+',"zoom":15}';
			console.log("after location" + MainWhereAmIDatalocation);
			MainWhereAmIDataapproved = true;
		//	alert(Main.WhereAmIData.location)
			
			 
			MainWhereAmIDatacollecttype = "delivery";
			MaindeliveryType = "delivery";
			
			//directlink start
			var address='';
			var custom_link = "<?=$lang_resource['BACK_BUTTON_SEARCHBY']?>_";
			
				custom_link +="";
		
		
			custom_link +="_"+googleCityName;
	custom_link +=   "_"+responce[ctrylen];
		custom_link +=   "_delivery";
		
		custom_link +=   "_"+lat;
			custom_link +=   "_"+lon;
			custom_link +=   "_-1";
			custom_link +=   "_"+15;
			  main_site_url=$("#main_site_url").val();
		  
		
		 		   custom_link +=   "_-1";
		  
		
				 custom_link +=   "_-1";
				
					custom_link +=   "_-1";
				

		window.open(main_site_url+'/'+custom_link, '_blank');
		console.log(custom_link);
		
			//direct link end
			
			}else {
				alert("<?= $lang_resource['No_restaurant_location_V2'] ?>");
				Main.Ready(true);
			}
                	})
				
				
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
		Main.Ready(true);
	    },{
        	enableHighAccuracy:true,
        	timeout:10000,
       		maximumAge:Infinity
   	 });
		} else {
	    // Browser doesn't support Geolocation
	    alert("<?= $lang_resource['Browser_no_geolocation_V2'] ?>");
		Main.Ready(true);
	  }
	
}
function SearchLocation2nd(){
	if(document.getElementById("country")){
		if((document.getElementById("country").value).trim()==''){
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>");
			return
			
		}
	}
	if(document.getElementById("city")){
		if((document.getElementById("city").value).trim()==''){
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
			return
			
		}
	}
	
	  var htms ='';
		  
          htms += '<div class="teb-content">'
		 
		  htms +=SearchReservation2nd();
	
		Popup.Show(911, '', htms, null, function (){
        }, PreDatepickerCall)
}
function SearchReservation2nd(){
	   var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['RESERVATION_NO_GUEST'] ?>"
        });
		
        for (i=1;i<=8;i++)
        {
            d.push(
            {
                id: i,
                caption: i
            })
        }
		
        var h = new Array();
        h.push(
        {
            id: "",
            caption: "<?= $lang_resource['RESERVATION_NO_HOUR'] ?>"
        });
		  //Time selection settings. 
		  time_format="<?=$time_format?>";

				 
				  for (i=0;i<24;i++)
						{
							if(time_format=="12"){
								capi= convertTimeFormatHour(i);
							}else{
								capi=zeroPad(i,2);
							}	
								h.push(
								{
									id: i,
									caption: capi
								})	
							
						}

			 
       
        var mi = new Array();
        mi.push(
        {
            id: "",
            caption: "<?= $lang_resource['RESERVATION_NO_MUNITE'] ?>"
        });
		
        for (i=0;i<60;i++)
        {
            mi.push(
            {
                id: i,
                caption: zeroPad(i,2)
            })
        }
		backgroundcolor=$("#backgroundcolor").val();
bbuttoncolor=$("#bbuttoncolor").val();
ffize=$("#ffize").val();
ffont_color=$("#ffont_color").val();
popup_color=$("#popup_color").val();
		var htms = '<div class="popup_wrapper" id="wrap11" >'
				htms += '<div class="pop_header" style="background:'+popup_color+'">'
				htms += '<div class="">'
				htms += '<h3 style="font-size:'+ffize+'px;color:'+ffont_color+'; word-break:break-all; "><?=$lang_resource['RESERVATION_SEARCH']?></h3>'
				htms += '</div>'
				htms += '<div class="pull_right" style="margin:8px 8px 0px 0px; position: absolute;right: 10px;top: 0px;">'
				htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
				htms += '</div>'
				htms += '</div>'
	 
	 				htms += '<div class="white_wra">'
			  htms += '<div class="reservpopBox " style="background:'+backgroundcolor+';font-size:'+ffize+'px;color:'+ffont_color+'; padding: 15px;">'
			  htms +='<div class="field">';
			  
			   htms +='<span class="selectdropdown">';
			  htms += '<select class="selectdropdownselect " id="guest" style="font-size:'+ffize+'px;color:'+ffont_color+'; " >';
			   htms += '<option value=""><?=$lang_resource['RESERVATION_NO_GUEST']?></option>'
			  for (i=1;i<=8;i++)
        {
			   htms += '<option value="' + i + '">' + i + "</option>"
		}
			  htms += '<select>';
			 htms += '</span>'
			  htms += '</div>'
			  
			   htms +='<div class="field">';
			  
			   htms +='<span class="">';
			  htms += '<input id="rdate" class="field-text " type="text" value="" readonly="readonly" placeholder="mm-dd-yyyy" autocomplete="off" style="font-size:'+ffize+'px;color:'+ffont_color+'; ">';
			 htms += '</span>'
			  htms += '</div>'
			  
			       htms +='<div class="field">';
			  
			   htms +='<span class="selectdropdown">';
			  htms += '<select class="selectdropdownselect " id="rhour"  style="font-size:'+ffize+'px;color:'+ffont_color+'; ">';
			
			  for (k in h)
        {
			   htms += '<option value="' + h[k].id + '">' + h[k].caption  + "</option>"
		}
			  htms += '<select>';
			 htms += '</span>'
			  htms += '</div>'
			  
			  
			    htms +='<div class="field">';
			  
			   htms +='<span class="selectdropdown">';
			  htms += '<select class="selectdropdownselect " id="rmin" style="font-size:'+ffize+'px;color:'+ffont_color+'; " >';
			
			  for (k in mi)
        {
			   htms += '<option value="' + mi[k].id + '">' + mi[k].caption  + "</option>"
		}
			  htms += '<select>';
			 htms += '</span>'
			  htms += '</div>'
			  
			
			  
			
			  
			   htms +='<div class="field">';
			    htms +='<button type="submit" class="btn-red" style="background:'+bbuttoncolor+'; color:<'+ffont_color+'!important; font-size:'+ffize+'px!important;" onclick="SaveWhereReservationSkip()"><?=$lang_resource['MOBILE_FRONT_VISUALS_SKIP']?></button>';
				
			  htms += '</div>'
			  
			    htms +='<div class="field">';
			    htms +='<button type="submit" class="btn-red"  style="background:'+bbuttoncolor+'; color:<'+ffont_color+'!important; font-size:'+ffize+'px!important;" onclick="SearchLocation2ndSave()"><?=$lang_resource['MOBILE_FRONT_VISUALS_SAVE_CONTINUE']?></button>';
				
			  htms += '</div>'
			  
			  htms += '</div>'
			    htms += '</div>'
			  htms += '</div>'
			
		  return htms;
		
}
function SearchLocation2ndSave(){
	guest=$("#guest").val();
	rdate=$("#rdate").val();
	rhour=$("#rhour").val();
	rmin=$("#rmin").val();
	 if (guest.trim()  == ""){
			alert("<?=$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_GUEST_FIELD']?>")
            return
        }
		if (rdate.trim()  == ""){
			alert("<?=$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_DATE']?>")
            return
        }
		if (rhour.trim() == ""){
			alert("<?=$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_HOUR_FIELD']?>")
            return
        }
		if (rmin.trim() == ""){
			alert("<?=$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_MINUTE_FIELD']?>")
            return
        }
		
		
	
	var custom_link = "<?=$lang_resource['BACK_BUTTON_SEARCHBY']?>_";
	var geocoder = new google.maps.Geocoder();
	var address='';
	
			if(document.getElementById("address1")){
		
		add1=document.getElementById("address1").value;
	
		if(add1.trim()!=''){
				
			if(address.trim()!=''){
			address+=' , ';
		
			
		}
		custom_link +=""+add1;
		address=address+(add1);
		
		}
	}
		
	if(document.getElementById("city")){
		
		if(document.getElementById("city").value!=''){
			citytxt=document.getElementById("city").options[document.getElementById("city").selectedIndex].text;
		citytxt=  citytxt.substring(0, 1).toUpperCase() + citytxt.substring(1);
		
			if(address!=''){
			address+=' , ';
		}
		address=address+document.getElementById("city").options[document.getElementById("city").selectedIndex].text;
		
		custom_link +="_"+citytxt.split(" ").join("-");
		}
	}
	if(document.getElementById("country")){
		if(document.getElementById("country").value!=''){
			if(address!=''){
			address+=' , ';
		}
			
		address=address+document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
			countrytxt=document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
		countrytxt=  countrytxt.substring(0, 1).toUpperCase() + countrytxt.substring(1);
		custom_link +="_"+countrytxt.split(" ").join("-");
		
		}
			
	}
		custom_link +=   "_pickup";
			geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK)
{
	console.log(JSON.stringify(results));
	// custom_link +=   "_"+locatserch.latitud;
	
	
	
			custom_link +=   "_"+results[0].geometry.location.lat();
			custom_link +=   "_"+results[0].geometry.location.lng();
			
			Searchzipcode='';
			 for (var i=0; i<results[0].address_components.length; i++) {
						for (var b=0;b<results[0].address_components[i].types.length;b++) {
							
						    if (results[0].address_components[i].types[b] == "postal_code") {
								
								Searchzipcode =results[0].address_components[i].short_name
								break;
							}
						 }

					

					}
					
				
						custom_link +=   "_"+'-1';
					
					
					
					
			custom_link +=   "_"+'21';
		  main_site_url=$("#main_site_url").val();
		  
		  resturantstag=$("#resturantstag").val();
		   cuisinestag=$("#cuisines").val();
		
			 
		   custom_link +=   "_-1";
		
		  
		   resturentarr=MultipleInput.Tags.resturants;
		   resturentarr1=new Array();
		  
		   for(Z in resturentarr){
			   resturentarr1[Z]=resturentarr[Z].id;
			   
		   }
		 K=0;
		 resturentarr2=new Array();
		     for(Z1 in  resturentarr1){
				  
				   resturentarr2[K]=resturentarr1[Z1];
				   K++;
				
			 }
			
		    resturantsstr = resturentarr2.join(); 
			
			if(resturantsstr.trim()==''){
				 custom_link +=   "_-1";
				}else{
					 custom_link +=   "_"+resturantsstr.trim();
				}   
				
		  
		    cuisinesarr=MultipleInput.Tags.cuisines;
		    cuisinesarr1=new Array();
			
		   for(Z in  cuisinesarr){
			    cuisinesarr1[Z]= cuisinesarr[Z].id;
			   
		   }
		   K=0;
		 cuisinesarr2=new Array();
		     for(Z1 in  cuisinesarr1){
				 
				   cuisinesarr2[K]=cuisinesarr1[Z1];
				   K++;
				
			 }
		     cuisinesstr =  cuisinesarr2.join(); 
		     console.log(resturantsstr);
			    console.log(cuisinesstr);
				if(cuisinesstr.trim()==''){
					custom_link +=   "_-1";
				}else{
					 custom_link +=   "_"+cuisinesstr.trim();
				}
//reservation start
		//reservation start
		 custom_link +=   "_1";
	
		
		  custom_link +=   "_"+guest;
		
		 
			 
			  rdate1= (rdate.replace("/","-")).replace("/","-");
			
			   custom_link +=   "_"+ rdate1;
		 
		  
		    custom_link +=   "_"+ rhour;
			custom_link +=   "_"+ rmin;
     
		//reservation end
     
		//reservation end
console.log(custom_link);
		window.open(main_site_url+'/'+custom_link, '_blank');
			
}



	});
		
	

		
}
function SaveWhereReservationSkip(){
	
	var custom_link = "<?=$lang_resource['BACK_BUTTON_SEARCHBY']?>_";
	var geocoder = new google.maps.Geocoder();
	var address='';
	
			if(document.getElementById("address1")){
		
		add1=document.getElementById("address1").value;
	
		if(add1.trim()!=''){
				
			if(address.trim()!=''){
			address+=' , ';
		
			
		}
		custom_link +=""+add1;
		address=address+(add1);
		
		}
	}
		
	if(document.getElementById("city")){
		
		if(document.getElementById("city").value!=''){
			citytxt=document.getElementById("city").options[document.getElementById("city").selectedIndex].text;
		citytxt=  citytxt.substring(0, 1).toUpperCase() + citytxt.substring(1);
		
			if(address!=''){
			address+=' , ';
		}
		address=address+document.getElementById("city").options[document.getElementById("city").selectedIndex].text;
		
		custom_link +="_"+citytxt.split(" ").join("-");
		}
	}
	if(document.getElementById("country")){
		if(document.getElementById("country").value!=''){
			if(address!=''){
			address+=' , ';
		}
			
		address=address+document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
			countrytxt=document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
		countrytxt=  countrytxt.substring(0, 1).toUpperCase() + countrytxt.substring(1);
		custom_link +="_"+countrytxt.split(" ").join("-");
		
		}
			
	}
		custom_link +=   "_pickup";
			geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK)
{
	console.log(JSON.stringify(results));
	// custom_link +=   "_"+locatserch.latitud;
	
	
	
			custom_link +=   "_"+results[0].geometry.location.lat();
			custom_link +=   "_"+results[0].geometry.location.lng();
			
			Searchzipcode='';
			 for (var i=0; i<results[0].address_components.length; i++) {
						for (var b=0;b<results[0].address_components[i].types.length;b++) {
							
						    if (results[0].address_components[i].types[b] == "postal_code") {
								
								Searchzipcode =results[0].address_components[i].short_name
								break;
							}
						 }

					

					}
					
				
						custom_link +=   "_"+'-1';
					
					
					
					
			custom_link +=   "_"+'21';
		  main_site_url=$("#main_site_url").val();
		  
		  resturantstag=$("#resturantstag").val();
		   cuisinestag=$("#cuisines").val();
		
			 
		   custom_link +=   "_-1";
		
		  
		   resturentarr=MultipleInput.Tags.resturants;
		   resturentarr1=new Array();
		  
		   for(Z in resturentarr){
			   resturentarr1[Z]=resturentarr[Z].id;
			   
		   }
		 K=0;
		 resturentarr2=new Array();
		     for(Z1 in  resturentarr1){
				  
				   resturentarr2[K]=resturentarr1[Z1];
				   K++;
				
			 }
			
		    resturantsstr = resturentarr2.join(); 
			
			if(resturantsstr.trim()==''){
				 custom_link +=   "_-1";
				}else{
					 custom_link +=   "_"+resturantsstr.trim();
				}   
				
		  
		    cuisinesarr=MultipleInput.Tags.cuisines;
		    cuisinesarr1=new Array();
			
		   for(Z in  cuisinesarr){
			    cuisinesarr1[Z]= cuisinesarr[Z].id;
			   
		   }
		   K=0;
		 cuisinesarr2=new Array();
		     for(Z1 in  cuisinesarr1){
				 
				   cuisinesarr2[K]=cuisinesarr1[Z1];
				   K++;
				
			 }
		     cuisinesstr =  cuisinesarr2.join(); 
		     console.log(resturantsstr);
			    console.log(cuisinesstr);
				if(cuisinesstr.trim()==''){
					custom_link +=   "_-1";
				}else{
					 custom_link +=   "_"+cuisinesstr.trim();
				}
//reservation start
		 custom_link +=   "_1";
	
		 
			  custom_link +=   "_-1";
		 
		
			   custom_link +=   "_-1";
		 
		  
		    custom_link +=   "_-1";
			custom_link +=   "_-1";
     
		//reservation end
console.log(custom_link);
		window.open(main_site_url+'/'+custom_link, '_blank');
			
}



	});
		
	
}
 function  zeroPad  (num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   }
function convertTimeFormatHour(hour){
		
		str='PM';
		if(hour<12){
			str='AM';
		}else if((hour>23) && (hour<29)){
			str='AM';
		}
		hour=parseInt(hour)%12;
		return time=zeroPad((hour),2)+' '+str;
				
		
		
		
	}
function PreDatepickerCall()
    {
		$('#rdate').datepick({dateFormat: 'mm/dd/yyyy',minDate: 0,maxDate: 7});
			wrapwidth=$("#wrap11").height();
	
	if(wrapwidth>=470){
		 $("#wrap11").css("height", "470px"); 
		 $("#wrap11").css("overflow-y", "scroll"); 
		 
	}
	}
function  GetIndexOnPropertyValueFound(b, a, d)
    {
        for (var c in b)
        {
            if (b[c][a] == d)
            {
                return c
            }
        }
        return -1
    }
function changetab(tab){
	if(tab==1){
		$("#addressdiv").show();
		$("#addressdiv1").hide();
		$("#reservsp").hide();
		$("#normalsp").show();
		
	}
	if(tab==2){
		$("#addressdiv").hide();
		$("#addressdiv1").show();
		$("#reservsp").hide();
		$("#normalsp").show();
		
	}
	if(tab==3){
		$("#addressdiv").hide();
		
		$("#addressdiv1").show();
		$("#reservsp").show();
		$("#normalsp").hide();
	}
}
function ShowHideOptionSearch(){
$("#optdiv").toggle("slow");

if(($("#delivery_tab").val()==2) || ($("#delivery_tab").val()==3)){
	$("#addressdiv1").show();
	
}else{
		$("#addressdiv1").hide();
}
}

function	PopulateAddressSelect(c, b, chk){
		
		
	   
		
		
		if((c=="") || (c==null))
		{
			c = document.getElementById("country").value;	
		}
		
		
		if((b=="") || (b==null))
		{
			b = document.getElementById("city").value;	
			
		}
		
		
		if(chk == 1)
		{
			
			$('.address1').html('<option value="" selected=""><?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?></option>');
		}
		
      
			 $.post("../panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllneighborhoodData","filters":[{"modifier":"neighborhood","name":"country","operator":"=","value":"' + c + '"},{"modifier":"neighborhood","name":"city","operator":"=","value":"' + b + '"}]}]', function (f)
        {

   
           
			  if (f != "")
            {
				
			 neighborhood = JSON.parse(f).neighborhood;
				 
				
				
				  for (var d in neighborhood)
                {
					
					if(document.getElementById("address")) {
					$('.address1').append('<option value="'+ neighborhood[d].id+'">'+neighborhood[d].name+'</option>');
					}
				 }
				  
				}
			 })
	}

</script>


<!-- AddThis Smart Layers END -->



</head>

<body   style="background:<?= $background_color?>!important; " >


<input type="hidden" id="allresthidd" value='<?=$allrestdata?>'/>
<input type="hidden" id="allCuisinedata" value='<?=$allCuisinedata?>'/>

<input type="hidden" id="resturentpholder" value='<?=$lang_resource['MULTITAG_LANGUAGE_RESTAURANTS']?>'/>
<input type="hidden" id="cuisinespholder" value='<?=$lang_resource['MULTITAG_LANGUAGE_CUISINES']?>'/>
<input type="hidden" id="ffont_color" value='<?=$data["font_color"]?>'/>
<input type="hidden" id="ffize" value='<?=$data["font_size"]?>'/>
<input type="hidden" id="popup_color" value="<?=$data["popup_color"]?>"/>
<?php
$btn_color='#e74c3c';
			 if($data["button_color"]!=''){
				  $btn_color=$data["button_color"];
			 }
?>
<input type="hidden" id="bbuttoncolor" value='<?=$btn_color?>'/>
<input type="hidden" id="backgroundcolor" value='<?=$background_color?>'/>
<div class="main">
<div class="wrapp"  id="wrap" style=" position:absolute; left:0%; right:0%; " >

        
        <!--TakeOut-->
        <div class="TakeOut"> 
           <div  style="padding:15px;">
                    <span class="selectdropdown">
                        <select id="delivery_tab" class="selectdropdownselect" style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;" onchange="changetab(this.value)">
                        <?php 
							if($data["delivery_tab"]=='t'){
								echo ' <option value="1" >Delivery</option>';
							}
							if($data["pickup_tab"]=='t'){
								echo ' <option  value="2" >Pickup</option>';
							}
							if($data["reservation_tab"]=='t'){
								echo ' <option  value="3"  >Reservation</option>';
							}
						?>
                       
                        
                        </select>
                    </span>
                </div><!--selectfield-->
        </div>
        <!--TakeOut end-->
        
        
        <!--white_wra-->
        <div class="white_wra">
        		<?php
				$countrystyle='none';
					if($data["country_display"]=='t'){
								$countrystyle='block';
							}
				?>
            	<div class="field" id="countrydiv" style=" display:<?=$countrystyle?>;" >
                	<div class="selectfield">
                    <span class="selectdropdown">
                        <select class="selectdropdownselect" style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;"  onchange="getcity(this.value);" id="country">
                        <option  value="" selected="selected">Country</option>
                       <?php
				
				foreach($country as $k=>$value){
					
					echo '<option value="'.$k.'" >'.$value.'</option>';
				}
				?>
                        </select>
                    </span>
                </div>
                </div><!--field-->
                <?php
				$citystyle='none';
					if($data["city_display"]=='t'){
								$citystyle='block';
							}
				?>
                <div class="field" style=" display:<?=$citystyle?>;"        >
                	<div class="selectfield">
                    <span class="selectdropdown">
                        <select class="selectdropdownselect" style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;" id="city" <?php  if($data["neighborhood"]=='t'){	?> onchange="PopulateAddressSelect(null,null,1);" <?php	}?>>
                        <option  value=""  selected="selected">City</option>
                       <?php
					   if($data["country_display"]!='t'){
						   foreach($city as $val){
							  echo  '<option  value="'.$val->id.'">'.$val->name.'</option>';
						   }
					   }
					   ?>
                        </select>
                    </span>
                </div>                    
                </div><!--field-->
                  <?php
				$geolocationstyle='none';
					if($data["geolocation_display"]=='t'){
								$geolocationstyle='block';
							}
							$addressstyle='none';
							if($data["delivery_tab"]=='t'){
								$addressstyle='block';
							}
							
					if($data["neighborhood"]!='t'){		
				?>
                <div class="field"  id="addressdiv"   style=" display:<?=$addressstyle?>;" >
                	<input type="text"  id="address" class="field-text geo_field" placeholder="Address or Zip Code"  style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;"><button type="button" class="geo_btn"  style=" display:<?=$geolocationstyle?>;" onclick="GetUserLocation();"><img src="images/add-icon.png"></button>
                </div><!--field-->
                
                
                 <?php
					}else{
						?>
                         <div class="field"   id="addressdiv"     style=" display:<?=$addressstyle?>;" >
                	  <select id="address" style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;" class="selectdropdownselect address1">
                       <option value="">Area / Neighborhood</option>
                      
                        </select>
                </div><!--field-->
                         <?php
					}
				 
				$optionalstyle='none';
					if($data["optional_display"]=='t'){
								$optionalstyle='block';
							}
				?>
                <div class="field"  style=" display:<?=$optionalstyle?>;">
                
                    <button type="button" style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;" class="field-select"  id="whrDelivery" onclick="ShowHideOptionSearch()">Optional filters</button>
                   
                        
                        
                        
                        
                </div><!--field-->   
                <div id="optdiv" style="display:none;">
                 <input type="text" id="cuisines"  placeholder="" />
                        <input type="text" id="resturants" placeholder="" />
                        
                        <?php
							if($data["pickup_tab"]=='t'){
								?>
                                <span id="addressdiv1">
                                <input type="text"  id="address1" class="field-text geo_field" placeholder="Address or Zip Code"  style="color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;"  style="display:none;">
                                </span>
                                <?php
							}
						?>
                </div> 
                
                            
            </div>
        <!--white_wra--> 
        
             <div class="field tab-lets-go">
             <?php
			 
			 $btn_color='#e74c3c';
			 if($data["button_color"]!=''){
				  $btn_color=$data["button_color"];
			 }
			 
			 $normalsp="none";
			  $reservsp="none";
			 if(($data["delivery_tab"]=='t') ||($data["pickup_tab"]=='t')){
						$normalsp="block";
				}
				 if(($data["delivery_tab"]!='t') &&($data["pickup_tab"]!='t') && ($data["reservation_tab"]=='t')){
						 $reservsp="block";
				}			
						
			 ?>
             
             
                 <span id="normalsp" style="display:<?=$normalsp?>"> <button type="submit" class="btn-red" style="background:<?=$btn_color?>; color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;" onclick="searchfn();"><?=$data["button_Text"]?></button></span>
                 
                 <span id="reservsp" style="display:<?=$reservsp?>" > <button type="submit" class="btn-red" style="background:<?=$btn_color?>; color:<?=$data["font_color"]?>!important; font-size:<?=$data["font_size"]?>px!important;" onclick="SearchLocation2nd();"><?=$data["button_Text"]?></button></span>
              </div><!--field-->
</div>
</div>
<!--widget start-->
<?php
$ste_url=$_SERVER['HTTP_HOST'];
?>
<input type="hidden" id="main_site_url" value="<?='http://'.$ste_url?>"/>
<input type="hidden" id="neighborhood1" value="<?php if($data["neighborhood"])echo $data["neighborhood"];?>"/>
<!--widget end-->
<div  id="mapbox" style="display:none">
</div>
<div id="popupcontainer"></div>
</body>
</html>
