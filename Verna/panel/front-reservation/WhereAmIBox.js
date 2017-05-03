var WhereAmIBox = {
    WhereAmI: function (c){		
        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
		
	    var b = false;
        if (c){
			Main.customwhereami = c
            Forms.Form.whereami.type = "modify";
            b = true
        }else{
            c = new Object();
            Forms.Form.whereami.type = "create"
        }

        var ABN = '';		
        ABN += '<div id="mapbox" class="mediummapbox" ></div>'
        document.getElementById("map_canvas").innerHTML = ABN
		if(Main.settingfront.map_posititon == 'f'){
			$("#map_canvas").hide();
		}

		Forms.CreateValue("whereami", "businesstype", '', false, false);
        var htms =''

        htms += '<ul class="services_tab">'
        if(Main.settingfront.tab_food == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
        	htms += '<li>'
			htms += '<a href="javascript:WhereAmIBox.BusinessTypeChange(\'tab_food\')">'
			htms += '<span class="icon"><img src="panel/<?=$moduleName?>/images/service-icon-1.png"></span>'
			htms += '<span class="text"><?=$lang_resource['FRONT_VISUALS_TAB_FOOD']?></span>'
			htms += '</a>'
			htms += '</li>'
        }
		if(Main.settingfront.tab_alcohol == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms += '<li>'
			htms += '<a href="javascript:WhereAmIBox.BusinessTypeChange(\'tab_alcohol\')">'
			htms += '<span class="icon"><img src="panel/<?=$moduleName?>/images/service-icon-2.png"></span>'
			htms += '<span class="text"><?=$lang_resource['FRONT_VISUALS_TAB_ALCOHOL']?></span>'
			htms += '</a>'
			htms += '</li>'
		}
		if(Main.settingfront.tab_groceries == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms += '<li>'
			htms += '<a href="javascript:WhereAmIBox.BusinessTypeChange(\'tab_groceries\')">'
			htms += '<span class="icon"><img src="panel/<?=$moduleName?>/images/service-icon-3.png"></span>'
			htms += '<span class="text"><?=$lang_resource['FRONT_VISUALS_TAB_GROCERIES']?></span>'
			htms += '</a>'
			htms += '</li>'
		}
		if(Main.settingfront.tab_laundry == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms += '<li>'
			htms += '<a href="javascript:WhereAmIBox.BusinessTypeChange(\'tab_laundry\')">'
			htms += '<span class="icon"><img src="panel/<?=$moduleName?>/images/service-icon-4.png"></span>'
			htms += '<span class="text"><?=$lang_resource['FRONT_VISUALS_TAB_LAUNDRY']?></span>'
			htms += '</a>'
			htms += '</li>'
		}
		if(Main.settingfront.tab_reservation == "t"){
			htms += '<li>'
			htms += '<a href="javascript:WhereAmIBox.BusinessTypeChange(\'tab_reservation\')">'
			htms += '<span class="icon"><img src="panel/<?=$moduleName?>/images/service-icon-5.png"></span>'
			htms += '<span class="text"><?=$lang_resource['FRONT_VISUALS_TAB_RESERVATION']?></span>'
			htms += '</a>'
			htms += '</li>'
		}
		htms += '</ul>'<!-- services_tab -->

		htms += '<div class="services_tab_content">'
		htms += '<div class="search_box">'

		if(Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 't'){
		htms += '<div class="delivery_pickup">'
		htms += '<div class="row">'
		htms += '<div class="col-md-12">'
		htms += '<ul>'
		
		htms += '<li class="deltypeclass">'
		htms += '<span><?=$lang_resource['FRONT_VISUALS_TAB_DELIVERY']?></span>'
		htms += '</li>'<!--col-md-2-->
		htms += '<li class="deltypeclass">'
		htms += '<span class="caption">'
		htms += '<div class="del_pic">'
		htms += '<input type="checkbox" name="1" id="deltype">' 
        htms += '<label for="deltype">&nbsp;</label>'
		//htms +='<a id="switch_8" class="selector" onclick="Visuals.changelabe(this.id)" style="margin-left: 0px;"></a>'
		htms += '</div>'
		htms += '</span>'
		htms += '</li>'
		htms += '<li class="deltypeclass">'
		htms += '<span><?=$lang_resource['FRONT_VISUALS_TAB_PICKUP']?></span>'
		htms += '</li>'
	
		htms += '</ul>'
		htms += '</div>'<!-- col-md-12 -->
		htms += '</div>'<!-- row -->
		htms += '</div>'<!-- delivery_pickup -->
		}

		htms += '<div class="row" id="SearchSection">'
		
		htms += '</div>'<!-- row -->

		htms += '</div>'<!--search_box-->
		htms += '</div>'<!--services_tab_content-->

		document.getElementById("mid_lft").innerHTML = htms


		$('.services_tab li a').click(function(e) {

			$('.services_tab li a').removeClass('active');

			var $this = $(this);
			if (!$this.hasClass('active')) {
				$this.addClass('active');
			}
		});

		$(document).ready(function(){
			$('input[type="checkbox"]').click(function(){
				if($("#deltype").prop("checked") == true){
					WhereAmIBox.SearchType(2)
				}
				else if($("#deltype").prop("checked") == false){
					WhereAmIBox.SearchType(1)
				}
			});
		});
		if(Main.settingfront.tab_delivery == 'f' && Main.settingfront.tab_pickup == 'f'){
			$(".services_tab").hide();
			WhereAmIBox.SearchType(3)
		}else{
			if(Main.settingfront.tab_food == 't'){
				$("ul.services_tab li:eq(0) a").addClass('active');
				WhereAmIBox.BusinessTypeChange('tab_food')	
			}else if(Main.settingfront.tab_food == 'f' && Main.settingfront.tab_alcohol == 't'){
				$("ul.services_tab li:eq(1) a").addClass('active');
				WhereAmIBox.BusinessTypeChange('tab_alcohol')	
			}else if(Main.settingfront.tab_food == 'f' && Main.settingfront.tab_alcohol == 'f' && Main.settingfront.tab_groceries == 't'){
				$("ul.services_tab li:eq(2) a").addClass('active');
				WhereAmIBox.BusinessTypeChange('tab_groceries')	
			}else if(Main.settingfront.tab_food == 'f' && Main.settingfront.tab_alcohol == 'f' && Main.settingfront.tab_groceries == 'f' && Main.settingfront.tab_laundry == 't'){
				$("ul.services_tab li:eq(3) a").addClass('active');
				WhereAmIBox.BusinessTypeChange('tab_laundry')	
			}
		}

		var btypecounter = 0;
		if(Main.settingfront.tab_food == 't'){
			btypecounter++;
		}
		if(Main.settingfront.tab_alcohol == 't'){
			btypecounter++;
		}
		if(Main.settingfront.tab_groceries == 't'){
			btypecounter++;
		}
		if(Main.settingfront.tab_laundry == 't'){
			btypecounter++;
		}
		
		if(Main.settingfront.tab_reservation == 'f' && btypecounter == 1){
			$(".services_tab").hide();
			$(".search_box").addClass("search_box_one_services");
		}


		Main.PreWhereAmI();

		$(document).ready(function() {
			$('#address').keydown(function(event) {
				if (event.keyCode == 13) {
					Main.SaveWhereAmI();
					return false;
				}
			});
		});

		if (b){
			Forms.Form.whereami.fields.city.save = true;
			Forms.Form.whereami.fields.address.save = true;
			Forms.Form.whereami.fields.location.save = true;

			if (Main.WhereAmIData.country && Main.WhereAmIData.city){
				Main.CountrySelected(document.getElementById("country"), Main.WhereAmIData.city)
			}
		}


    },
    BusinessTypeChange: function(val){
    	if(val !='tab_reservation'){

    		Forms.UpdateValue("whereami", "businesstype", val);
    		if(Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 't'){
    			WhereAmIBox.SearchType(1);
    			$(".deltypeclass").show();
    		}else if(Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 'f'){
    			WhereAmIBox.SearchType(1)
    		}else if(Main.settingfront.tab_delivery == 'f' && Main.settingfront.tab_pickup == 't'){
    			WhereAmIBox.SearchType(2)
    		}
    	}else{
    		$(".deltypeclass").hide();
    		WhereAmIBox.SearchType(3)
    	}
    },
    SearchType: function(val){    	
    	WhereAmIBox.SearchTypeId(val)
    },
	
	ShowHideOptionSearch: function(id){
		$(".filter-dv").toggle();
	},
	SearchTypeId: function(id){
		if(id == 1){
			Main.deliveryAccept =1;			
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
