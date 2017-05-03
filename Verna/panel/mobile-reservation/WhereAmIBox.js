var WhereAmIBox = {
    WhereAmI: function (c)
    {
    	
		$.post("panel/lib/front-main.php", "f=FetchAllRestDataFront", function (f) {
			Main.restaurants = JSON.parse(f);
			MultipleInput.Init("resturants",Main.restaurants, true); 
		})
		$.post("panel/lib/front-main.php", "f=FetchAllCuisineDataFront", function (f) {
			Main.cuisines = JSON.parse(f);
			MultipleInput.Init("cuisines",Main.cuisines, true); 
		})
		
        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
		Forms.CreateValue("whereami", "businesstype", '', false, false);
		
        var b = false;
        if (c){
            Forms.Form.whereami.type = "modify";
            b = true
        }
        else{
            c = new Object();
            Forms.Form.whereami.type = "create"
        }	

        var d = new Array();
        d.push({        	
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
        for (i in Main.Countries){
            d.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }

		var cit = new Array();
        cit.push({
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });		
		GoogleMap.GetAutoLocation();

		var htms ='';	
		htms +='<div id="mobile-delivery-content" >'	
		
		htms +='</div>'

		htms +='<div id="mobile-pickup-content"></div>'
		htms +='<div id="mobile-reserve-content"></div>'

	
						
		var ABN = '';
	
        ABN += '<div id="mapbox" class="mediummapbox"></div>';
		
		if (b) {
            Popup.EnableSubmitButton(true)
        } else {
            Popup.EnableSubmitButton(false)
        }
		
		document.getElementById("mid_lft").innerHTML = htms;
		document.getElementById("map_canvas").innerHTML = ABN;
		
		
		  

		
		$( "#accordion" ).accordion({collapsible: true,autoHeight: false});
	
	
		
		var popupSize = 685;
		
		$( "#accordion" ).accordion({
		  beforeActivate: function( event, ui ) {
			$(".acco_dv").removeClass("ad_rv_auto");
		
			  }
		});
		Main.PreWhereAmI();
		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 590;


        
      	Main.settingfront.tab_delivery_country = 'f'			
		Main.settingfront.tab_delivery_city = 'f'		
		Main.settingfront.tab_delivery_address = 't'	
		Main.settingfront.tab_delivery_neighborhood = 'f'		
		Main.settingfront.tab_delivery_option = 'f'		


		if(Main.settingfront.tab_delivery == 'f' && Main.settingfront.tab_pickup == 'f'){
			WhereAmIBox.SearchTypeId(3)			
		}else{
			if(Main.settingfront.tab_food == 't'){
				WhereAmIBox.BusinessTypeChange('tab_food')	
			}else if(Main.settingfront.tab_food == 'f' && Main.settingfront.tab_alcohol == 't'){
				WhereAmIBox.BusinessTypeChange('tab_alcohol')	
			}else if(Main.settingfront.tab_food == 'f' && Main.settingfront.tab_alcohol == 'f' && Main.settingfront.tab_groceries == 't'){
				WhereAmIBox.BusinessTypeChange('tab_groceries')	
			}else if(Main.settingfront.tab_food == 'f' && Main.settingfront.tab_alcohol == 'f' && Main.settingfront.tab_groceries == 'f' && Main.settingfront.tab_laundry == 't'){
				WhereAmIBox.BusinessTypeChange('tab_laundry')	
			}
		}
    },
    BusinessTypeChange: function(val){
    	
    	if(val !='tab_reservation'){
    		$(".rgh-dv").show();
    		$(".lft-dv").css("width","49%")
	    	Forms.UpdateValue("whereami", "businesstype", val);
			if(Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 't'){
				WhereAmIBox.SearchTypeId(1)			
			}else if(Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 'f'){
				WhereAmIBox.SearchTypeId(1)			
			}else if(Main.settingfront.tab_delivery == 'f' && Main.settingfront.tab_pickup == 't'){
				WhereAmIBox.SearchTypeId(2)
			}  
		}else{   
			$(".rgh-dv").hide();
			$(".lft-dv").css("width","100%") 		
    		WhereAmIBox.SearchTypeId(3)
    	}  	
    },
		
	ShowHideOptionSearch: function(id){
     $(".filter-mob-dv").slideToggle(800);
	  $(".acco_dv").addClass("ad_rv_auto");
	},
	
	
	SearchTypeId: function(id){
		
		if(id==1){			
			var htms ='<button  type="button" class="search-btn" onclick="Main.SaveWhereAmI(true)"><?= $lang_resource['NEW_MOBILE_HOME_START_FIND_RESTAURANT'] ?></button>'		
			$("#mid_button_search").empty().append(htms);
		}
		if(id==2){			
			var htms ='<button  type="button" class="search-btn" onclick="Main.SaveWhereAmI(true)"><?= $lang_resource['NEW_MOBILE_HOME_START_FIND_RESTAURANT'] ?></button>'		
			$("#mid_button_search").empty().append(htms);
		}
		if(id==3){			
			var htms ='<button  type="button" class="search-btn" onclick="Visuals.SearchLocation2nd(true)"><?= $lang_resource['NEW_MOBILE_HOME_START_FIND_RESTAURANT'] ?></button>'		
			$("#mid_button_search").empty().append(htms);
		}
		
		if(id == 1){
			Main.deliveryAccept =1;
			$("#mobile-pickup-content").html('');
			$("#mobile-delivery-content").html(Visuals.SearchDelivery(Main.User));
			$("#mobile-reserve-content").html('');
			document.getElementById("deliveryType").value = 1
		}
		if(id == 2){
			Main.deliveryAccept =2;
			$("#mobile-pickup-content").html(Visuals.SearchDelivery(Main.User));
			$("#mobile-delivery-content").html('');
			$("#mobile-reserve-content").html('');
			document.getElementById("deliveryType").value = 2		
		}
		if(id == 3){
			Main.deliveryAccept =3;
			$("#mobile-reserve-content").html(Visuals.SearchDelivery(Main.User));
			$("#mobile-delivery-content").html('');
			$("#mobile-pickup-content").html('');
			document.getElementById("deliveryType").value = 3
		}
	},
  
};
