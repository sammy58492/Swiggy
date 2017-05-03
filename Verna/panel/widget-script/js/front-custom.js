var countEStep = new Array();
countEStep.push("99");
var MainCustom = {
	SaveWhereAmI: function (){
		

		Main.Loading();
		document.getElementById("citychoose").style.display = "none";
		var deliveryAccept = $("input[name=deliveryType]:checked").val()
		
		                   
		if(Main.settingfront.tab_delivery_country == 'f'){
			Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;	
		}else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray("-1", countrytag ) == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}

			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && $.inArray("-1", citytag )  == -1 ){				
				Forms.Form['whereami'].fields['city'].value = citytag[0];				
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}	

		if(Main.settingfront.tab_delivery_city == 'f'){
			Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;			
		}else{
			Forms.Form['whereami'].fields['city'].value	= document.getElementById("city").value;
		}

		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.cityname;
			GoogleMap.UpdateUserPosition(a);
		}

		if(Main.settingfront.tab_delivery_address == 'f' && deliveryAccept == 1 && Main.settingfront.tab_delivery_neighborhood == 'f' ){
			Forms.Form['whereami'].fields['address'].value = Main.settingfront.city_name_default;
 			var a = new Object();
			a.id = "address";
			a.value = Main.settingfront.city_name_default;
			GoogleMap.UpdateUserPosition(a);
		}else{			

			if(deliveryAccept == 1){
				if(Main.neibourGlobalid){			
					Forms.Form['whereami'].fields['address'].value = Main.neibourGlobalid;
				}else{
					Forms.Form['whereami'].fields['address'].value = document.getElementById("address").value;
				}
			}

		}
		
	 	
			 

		if(Main.customwhereami){
			Forms.Form['whereami'].fields['country'].save = true
			Forms.Form['whereami'].fields['city'].save = true
			Forms.Form['whereami'].fields['address'].save = true
		}

		
        if (Forms.CanSave("whereami") == false){
			Main.Ready();
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
            return
        }

		if(deliveryAccept== undefined){
			 Main.Ready();
			alert("<?=$lang_resource['ALERT_PICKUP_DELIVERY']?> ");
            return
		}
		else if(deliveryAccept== 1 && Forms.Form.whereami.fields.address.value == ""){
			Main.Ready();
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
            return
		}

		Main.WhereAmIData = new Object();
        Main.WhereAmIData.country = Forms.Form.whereami.fields.country.value;
        Main.WhereAmIData.city = Forms.Form.whereami.fields.city.value;

		if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1" ) {			
			Main.WhereAmIData.delivery_neighborhoodStaus =  1; 
			Main.WhereAmIData.delivery_neighborhood =  Main.neibourGlobaltext;
			Main.WhereAmIData.delivery_neighborhoodid =  Main.neibourGlobalid;
		}else{				
			Main.WhereAmIData.delivery_neighborhoodStaus =  0; 		
		}

		if(Main.Franchises){
	        var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
			Main.WhereAmIData.currency = Main.Franchises[a].currency;
	        Main.WhereAmIData.ga = Main.Franchises[a].ga;
	        Main.WhereAmIData.cityname = Main.Franchises[a].city;
		} else {
		 	var a = 0;
		    Main.WhereAmIData.currency = Main.FranchisesOnlyForZip[a].currency;
	        Main.WhereAmIData.ga = Main.FranchisesOnlyForZip[a].ga;
	        Main.WhereAmIData.cityname = Main.FranchisesOnlyForZip[a].city;	
		}
 
		if(deliveryAccept == "1"){
			Main.WhereAmIData.collecttype = "delivery"
			Main.deliveryType="delivery";
			Main.WhereAmIData.reservestatus = "delivery"
			Main.searchType ="Ordinary";

			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			Main.WhereAmIData.rhour = -1;
        	Main.WhereAmIData.rmin = -1;
		}
		if(deliveryAccept == "2"){

			Main.WhereAmIData.collecttype = "pickup"
			Main.deliveryType="pickup";
			Main.WhereAmIData.reservestatus = "pickup"
			Main.searchType ="Ordinary";
			if(document.getElementById("address"))
			Main.WhereAmIData.address = document.getElementById("address").value;// Forms.Form.whereami.fields.address.value;
			else
			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
			
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			Main.WhereAmIData.rhour = -1;
       		Main.WhereAmIData.rmin = -1;
		}

		if(deliveryAccept == "3"){

			Main.WhereAmIData.collecttype = "pickup"
			Main.deliveryType="pickup";
			Main.searchType ="Ordinary";
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1" ) {
				Main.WhereAmIData.address = Main.neibourGlobaltext;
			}else {
				Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;		
			}
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
		}
	 
        Main.WhereAmIData.location = Forms.Form.whereami.fields.location.value;
        Main.WhereAmIData.approved = true;
		var custom_link = "<?=base64_encode('SearchBy')?>_";
		if(Forms.Form.whereami.fields.address) {
		
			if(Main.WidgetSettings.location_settings.neighborhood == 't' && deliveryAccept == "1") {
				custom_link += Main.neibourGlobaltext.split(" ").join("-");
			} else {
				custom_link += Forms.Form.whereami.fields.address.value.split(" ").join("-");		
			}
		}	
		if(Main.WhereAmIData.cityname) {
			custom_link +=   "_"+Main.WhereAmIData.cityname.split(" ").join("-");
		}
		if(Main.WhereAmIData.country) {
			var con = Main.GetIndexOnPropertyValueFound(Main.Countries, "id", Main.WhereAmIData.country);
			custom_link +=   "_"+Main.Countries[con].name.split(" ").join("-");
		}	 
		if(deliveryAccept == "1"){			 
			if(Main.settingfront.tab_delivery_neighborhood == 't') {	
				custom_link +=   "_neighbours";		
			} else {
				custom_link +=   "_delivery";
			}
		}else {
			custom_link +=   "_pickup";
		}

		if(Forms.Form.whereami.fields.location.value) {
			var locatserch = JSON.parse(Forms.Form.whereami.fields.location.value)

			custom_link +=   "_"+locatserch.latitud;
			custom_link +=   "_"+locatserch.longitud;
			custom_link +=   "_"+locatserch.zipcode;
			custom_link +=   "_"+locatserch.zoom;
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1") {
				custom_link +=   "_"+Main.neibourGlobalid;
			}else{
				custom_link +=   "_-1";
			}
		}

        Main.searchlink = custom_link;		
		
		//resturants start
		var resturantsstr ='';
		if(Forms.Form.whereami.fields.resturants.value.trim()!=''){
		var parsedresturants = JSON.parse(Forms.Form.whereami.fields.resturants.value);
		var arrresturants = [];
			for(var x in parsedresturants){
				arrresturants.push(parsedresturants[x]);
			}
				resturantsstr = arrresturants.join(); 
		}
		console.log(JSON.stringify(resturantsstr));

		if(resturantsstr.trim()==''){
			 custom_link +=   "_-1";
		}else{
			 custom_link +=   "_"+resturantsstr.trim();
		}

		//resturants end
		//cuisine start
		var cuisinesstr ='';
		if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
		var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
		var arrcuisines = [];

			for(var x in parsedcuisines){
			  arrcuisines.push(parsedcuisines[x]);
			}
			 cuisinesstr = arrcuisines.join(); 
		}

//console.log(JSON.stringify(cuisinesstr));
if(cuisinesstr.trim()==''){
	 custom_link +=   "_-1";
}else{
	 custom_link +=   "_"+cuisinesstr.trim();
}

     Main.Loading();

		//cuisine end
	if(deliveryAccept == 1){

		
		postcode=document.getElementById("address").value;	
		if(Main.zipMAxMin.zipvalmax>0){		
		if((postcode.length>parseInt(Main.zipMAxMin.zipvalmax))|| (postcode.length<parseInt(Main.zipMAxMin.zipvalmin)) ){
			alert("<?=$lang_resource['MAIN_PAGE_SEARCH_ZIPCODE_VALIDATION_MSG']?>")
			Main.Ready();
			return ;
		}		
		}
		console.log( JSON.stringify(Forms.Form.whereami));
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchzipcodeValidation","zipcode":"' + postcode + '"}]', function (tt){		   
			if (tt != ""){
				Main.zipcodeValidation1 = JSON.parse(tt).zipcodeValidation;	
				var fieldarray=new Array();			
					if(Main.zipcodeValidation1["value"]){
						if(parseInt(Main.zipcodeValidation1["value"])!=0){							
							alert("<?=$lang_resource['MAIN_PAGE_SEARCH_ZIPCODE_VALIDATION_MSG']?>");
							Main.Ready();
							console.log( JSON.stringify(Forms.Form.whereami));
							return
						}					 
					}			
				}
				if(locatserch.zipcode){
					Main.WhereAmIData.zipcode = locatserch.zipcode
				}
				Main.Ready();
				$("#top").html("");
				window.history.pushState( {"id":100} , "Business list", custom_link );
	            Shopping.Start();
	            Popup.Close();
				Forms.Clean("whereami");

			/*$.post("panel/lib/front-main.php", "f=getPostcode&data=" + JSON.stringify(Main.WhereAmIData.location), function (h){		
				Main.WhereAmIData.zipcode = h;				
			});*/
			

	        $.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){			
	            Main.Ready();
	           // $("#top").html("");
				window.history.pushState( {"id":100} , "Business list", custom_link );	           
	        });		
	    });	
	}else{
		/*$.post("panel/lib/front-main.php", "f=getPostcode&data=" + JSON.stringify(Main.WhereAmIData.location), function (h){
			
			Main.WhereAmIData.zipcode = h;

		});*/	
		$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){			
            Main.Ready();
           // $("#top").html("");
			window.history.pushState( {"id":100} , "Business list", custom_link );
         
        });
		if(locatserch.zipcode){
			Main.WhereAmIData.zipcode = locatserch.zipcode
		}
		Main.Ready();
        $("#top").html("");
		window.history.pushState( {"id":100} , "Business list", custom_link );
        Shopping.Start();
        Popup.Close();
		Forms.Clean("whereami");
	}       
    GoogleMap.Clean();
    Main.RedirectToBusiness = null
},

	changecatclass: function(val){
		var a=val;
		
		var captionClass = "";	
		
		if ( a == "-1") {
		
				for (var xs in Shopping.MenuSubLists){
				
				Shopping.MenuSubLists[xs].enabled = true;
				//alert(Shopping.MenuCategories[xs].id)
				
				//var findex = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Shopping.MenuSubLists[xs].id);
				
				/*for(var subs in Shopping.CategoriesCustom[findex].subcategory ) {
					
					Shopping.CategoriesCustom[findex].subcategory[subs].enabled = true;
					}*/
				
			}
			//alert(Shopping.ActiveBusiness)
			//delete Shopping.ActiveBusiness;
			RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true)
		}else{
			for (var xy in Shopping.MenuSubLists){
				
				var f = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", a);
				var Allidsrecord = Shopping.Categories[f].ids .split(",");
				 if (MainCustom.in_array(Shopping.MenuSubLists[xy].id,Allidsrecord)) {
					Shopping.MenuSubLists[xy].enabled = true;
				}else{
					Shopping.MenuSubLists[xy].enabled = false;
				}
			}
			//alert(JSON.stringify(Shopping.MenuSubLists))
			
			RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true)
		}
	},
in_array: function(search, array) {
				 for (i = 0; i < array.length; i++)
				{
				if(array[i] ==search )
				{
				return true;
				}
				}
				return false;
},
FormatPrice: function (b,currency)
    {
		if(typeof currency=='undefined'){
			currency='';
		}
        if (b == "0.00")
        {
            return "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"
        }
      //return "<?= $lang_resource['SITE_CURRENCY'] ?>"+parseFloat(b).toFixed(Main.IS_DECIMAL_POINT);
	   return '<span>'+currency+'<span>'+parseFloat(b).toFixed(Main.IS_DECIMAL_POINT)+'</span></span>';
    },
    add_product_options_db:function(cart,id,options,comments,optionsid,total_price,qtyval){
	
	ProductOption.dis_id=id;
	
		if(!Shopping.Menu) {
		Shopping.Menu = Shopping.BusinessDetails[Shopping.ActiveBusiness]
		}
		
		 if(Main.NullToEmpty(total_price)==''){
			 total_price=0;
		 }
		  
 
	Main.Loading();
	    
	
        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
			//alert(b);	
			Main.Ready();
				
				b = JSON.parse(b)
				
				var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
				
				if(Shopping.Menu.dishes[F].ingredients) {
				var  ingredientsAlls = JSON.parse(Shopping.Menu.dishes[F].ingredients);
				} else {
					var  ingredientsAlls = new Array();
					}
				if(Shopping.Menu.dishes[F].extras) {
				var  extrasAll = JSON.parse(Shopping.Menu.dishes[F].extras);
				} else {
					var  extrasAll = new Array();
					}
				
				
				
				   if(ingredientsAlls.length!= 0 && extrasAll.length == 0) {
					 	 
					//Shopping.AddToCart(cart,id,options,comments,optionsid,total_price)
					ProductOption.add_only_ingredient(cart,id,options,comments,optionsid,total_price)
					}
				   else if(b.review == 0) {
					//hiddenqty = 0; 
					personsec = 0;	 
					/*if(Shopping.Business[0].shipping == "Pending") {
					Main.WhereAmIData.collecttype = "pickup"	
					Shopping.Business[0].shipping = "0"
					}*/
					
					
					Shopping.AddToCart(cart,id,options,comments,optionsid,total_price,qtyval)
					}
					else if(b.review.extras_details.length == 0) {
					//hiddenqty = 0;
					personsec = 0;		
					Shopping.AddToCart(cart,id,options,comments,optionsid,total_price,qtyval)
					}
					 else {
					$('#loader_dv').addClass( "addloader" );
	  			  $("#dish_"+id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + id + '_imglink" ><img src="images/step3-menu-list/add-icon-big.png"></a>');	 
					ProductOption.add_product_options(cart,id);
						}
			 });
	// 
		
	 },
	 
	 Backurlwork :function () {
		
		
		 if(history.pushState && history.replaceState) {
  
	
    window.onpopstate = function(e) {
	
	/*if(countEStep!=e.state.id){
		
		countEStep = e.state.id;
		}
	else {
		countEStep --;
		}	
*/	
var ilength = countEStep.length-1;
countEStep.splice(ilength, 1);
var mlength=  countEStep.length-1;

		if(countEStep[mlength] == "99"){
			window.location.href = '../';
		 }
		else if(countEStep[mlength]  == "111"){
			//window.location.href = '../';
		 }
		  else if(passingBy == "searching") {
			//window.location.href = '../';		
		 }
		
        if(countEStep[mlength]  == "100"){
			//Main.stepBack =100
			Shopping.changeDelType(3);
			
			}
		if(countEStep[mlength]  == "101"){
			$("#cart_details_product").hide();
			RestMenuList.ProductDetailsPage(Main.Activeproduct,Main.Activeproductcount)
			//Shopping.OpenBusiness(currentshop)
			}
		if(countEStep[mlength]  == "102"){
			  RestMenuList.CommonproductBody();
			   RestMenuList.CartDetails();
			   RestMenuList.OpenCartCheck();
			}	
						
			
        //perhaps use an ajax call to update content based on the e.state.id
    };
}
		
		 },
		 subchangecatclass : function(frm,catid) {
			
			if(frm.alt) {
			subcatids = frm.alt.split(",");
			}
			if(frm.min) {
			catids = frm.min.split(",");
			}
	
			
			for(var si=0; si<subcatids.length;si++) {
			
			
			 var findex = Main.GetIndexOnPropertyValueFound(Shopping.MenuSubLists, "id", catids[si]);
			// alert(JSON.stringify(Shopping.MenuSubLists[findex]))
			 var subfindex = Main.GetIndexOnPropertyValueFound(Shopping.MenuSubLists[findex].subcategory, "id", subcatids[si]);
			 //alert(findex+" /"+subfindex)
			 
			 if(frm.checked) {
				
				 Shopping.MenuSubLists[findex].subcategory[subfindex].enabled = false;
				 }
			else{
				
				Shopping.MenuSubLists[findex].subcategory[subfindex].enabled = true;
				
				}	
			}
				RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true,true)
			 },
			 
			 
			PreWhereAmI: function ()
    {
		if(Forms.Form.whereami.whereami) {
          var b = Forms.Form.whereami.whereami;
		}
		else {
			b = new Object()
			
			}
        var a;
        if (b == null)
        {
            b = new Object()
        }
        Forms.CreateValue("whereami", "location", b.location);
        if (b.location == "" || b.location == null)
        {
            a = new Object();
            a.latitud = 30.977609;
            a.longitud = -43.080139;
            a.zoom = 1
        }
        else
        {
            a = JSON.parse(b.location)
        }

        GoogleMap.Init("mapboxs", a.latitud, a.longitud, a.zoom, Main.WhereAmILocationUpdated)
    },
	
	ChooseTypeRegister: function ()
	{
		
		//check type of user selected
		/*if($('#t1').is(':checked'))
		{
			Main.RegisterType = 1; //normal user
			
		}
		else if($('#t2').is(':checked'))
		{
			
			Main.RegisterType = 2; //business owner
		}
		else
		{
			
			alert("<?=$lang_resource['BUSINESS_OWNER_VALIDATION_MSG']?>")
			return false;
		}*/
		Main.RegisterType = 2;
		Main.EditAccount(true);
		
		if(viewDevice=="Mobile")
		{
			Popup.OnCancel();
			
		}
		
	}, 
	 
};