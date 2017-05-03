var SearchBox = {	
		Main: function () {
		Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetTabSettings", function (b) {
   
       
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (a) {
          
             a = JSON.parse(a);
            Main.Countries = a.countries;
            SearchBox.PrintMain(b)
            
            });
			
				 $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchSpecialEnterprise"}]', function (c) {
         	SearchBox.SpecialEnterprise=JSON.parse(c);
			//alert(SearchBox.SpecialEnterprise.specialenterprise);
			
            
            });
        })
		
			
	},
	
		PrintMain: function(a){
		 a = JSON.parse(a);
		 var c="";
		 Forms.Clean("tabsettings", "mainbuttonok");
		 e = new Object();
		 Forms.Form.tabsettings.type = "modify";
		 Forms.Form.tabsettings.id = e.id
		 
		  Main.select_country = a[0].country;
		  Main.select_city = a[0].city;
		  
		   var at = new Array();
			at.push(JSON.parse('{"id":"t","caption":"Yes"}'));
			at.push(JSON.parse('{"id":"f","caption":"No"}'))
			
			c+= '<div class="tab-box">'
            c+= '<div class="row">'
            c+= '<div class="col-md-6">'
            c+= '<div class="form-group">'
			var c1 = new Array();
            c1.push({
            id: "-1",
            caption: ""
        	});
        
        	for (i in Main.Countries) {
            c1.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        	}
            c+= '<label><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_COUNTRY']?></label>'
			c+= Forms.CreateSelectPropertySettings("tabsettings", "country", c1, Main.NullToEmpty(a[0].country), false, "SearchBox.CountrySelected(this);GoogleMap.UpdateUserPosition(this)")
			c+= '</div>'
			<!--form-group-->
            c+= '</div>'
			<!--col-md-6-->
            c+= '<div class="col-md-6">'
            c+= '<div class="form-group">'
            c+= '<label><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_CITY']?></label>'
			
			c+= Forms.CreateSelectPropertySettings("tabsettings", "city", [], Main.NullToEmpty(a[0].city), false, "GoogleMap.UpdateUserPosition(this)")
            c+= '</div>'
			<!--form-group-->
            c+= '</div>'
			<!--col-md-6-->
            c+= '</div>'
			<!--row-->
			c+= '<div class="row">'
			<!--col-md-6-->
            c+= '<div class="col-md-6">'
            c+= '<div class="form-group">'
            c+= '<label><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_AUTOCOMPLETE']?></label>'
			
			c+= Forms.CreateSelectPropertySettings("tabsettings", "autocomplete", at, Main.NullToEmpty(a[0].autocomplete), false, "")
            c+= '</div>'
			<!--form-group-->
            c+= '</div>'
			<!--col-md-6-->
			 c+= '</div>'
			
			
			var tab_delivery = false;
			var tab_delivery_country = false;
			var tab_delivery_city = false;
			var tab_delivery_address = false;
			var tab_delivery_neighborhood = false;
			var tab_delivery_option = false;
			
			var tab_pickup = false;
			var tab_pickup_country = false;
			var tab_pickup_city = false;
			var tab_pickup_option = false;
			
			var tab_reservation = false;
			var tab_reservation_country = false;
			var tab_reservation_city = false;
			var tab_reservation_option = false;

			var tab_food = false;
			var tab_alcohol = false;
			var tab_groceries = false;
			var tab_laundry = false;
			
			
			console.log(a[0].tab_delivery)
      
			if(a[0].tab_delivery=='t')
			{
			var tab_delivery = true;
			}
		   if(a[0].tab_delivery_country=='t')
		   { 
			var tab_delivery_country = true;
			}
			if(a[0].tab_delivery_city=='t')
			var tab_delivery_city = true;
			if(a[0].tab_delivery_address=='t')
			var tab_delivery_address = true;
			if(a[0].tab_delivery_neighborhood=='t')
			var tab_delivery_neighborhood = true;
			if(a[0].tab_delivery_option=='t')
			var tab_delivery_option = true;
			
			if(a[0].tab_pickup=='t')
			var tab_pickup = true;
			if(a[0].tab_pickup_country=='t')
			var tab_pickup_country = true;
			if(a[0].tab_pickup_city=='t')
			var tab_pickup_city = true;
			if(a[0].tab_pickup_option=='t')
			var tab_pickup_option = true;
			
		   
			if(a[0].tab_reservation=='t')
			var tab_reservation = true;
			if(a[0].tab_reservation_country=='t')
			var tab_reservation_country = true;
			if(a[0].tab_reservation_city=='t')
			var tab_reservation_city = true;
			if(a[0].tab_reservation_option=='t')
			var tab_reservation_option = true;

			if(a[0].tab_food=='t')
			var tab_food = true;
			if(a[0].tab_alcohol=='t')
			var tab_alcohol = true;
			if(a[0].tab_groceries=='t')
			var tab_groceries = true;
			if(a[0].tab_laundry=='t')
			var tab_laundry = true;
			
            c+= '<h4 class="form-h4"><strong><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB']?></strong></h4>'
            c+= '<div class="tab-checkbox">'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery", tab_delivery)
            c+= '<label for="tab_delivery"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_DELIVERY']?></label>'
            c+= '</div>'
			<!--tab-checkbox-->
            c+= '<div class="row search-box-row">'
            c+= '<div class="col-md-2">'
            c+= '<p>'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_country", tab_delivery_country)
            c+= '<label for="tab_delivery_country"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_COUNTRY']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-3-->
            c+= '<div class="col-md-2">'
			c+= '<p>'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_city", tab_delivery_city)
            c+= '<label for="tab_delivery_city"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_CITY']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-3-->
            c+= '<div class="col-md-2">'
            c+= '<p>'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_address", tab_delivery_address)
            c+= '<label for="tab_delivery_address"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_ADDRESS']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-3-->
			<!--col-md-3-->
            c+= '<div class="col-md-3">'
            c+= '<p>'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_neighborhood", tab_delivery_neighborhood,false,"SearchBox.PreValidation()")
            c+= '<label for="tab_delivery_neighborhood"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_AREA']?></label>'
            c+= '</p>'
            c+= '</div>'
			
			<!--col-md-3-->
            c+= '<div class="col-md-3">'
            c+= '<p>'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_option", tab_delivery_option)            
			c+= '<label for="tab_delivery_option"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_OPTIONAL']?></label>'
            c+= '</p>'
            c+= '</div>'<!--col-md-3-->
            c+= '</div>'
			<!--row-->
            c+= '<div class="tab-checkbox">'
			c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup", tab_pickup)
            c+= '<label for="tab_pickup"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_PICKUP']?></label>'
            c+= '</div>'
			<!--tab-checkbox-->
            c+= '<div class="row search-box-row">'
            c+= '<div class="col-md-4">'
            c+= '<p>'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup_country", tab_pickup_country)
            c+= '<label for="tab_pickup_country"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_COUNTRY']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-4-->
            c+= '<div class="col-md-4">'
            c+= '<p>'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup_city", tab_pickup_city)
            c+= '<label for="tab_pickup_city"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_CITY']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-4-->
            c+= '<div class="col-md-4">'
            c+= '<p>'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup_option", tab_pickup_option)
            c+= '<label for="tab_pickup_option"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_OPTIONAL']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-4-->
            c+= '</div>'
			<!--row-->
            c+= '<div class="tab-checkbox">'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation", tab_reservation)
            c+= '<label for="tab_reservation"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_RESERVATION']?></label>'
            c+= '</div>'
			<!--tab-checkbox-->
            c+= '<div class="row search-box-row">'
            c+= '<div class="col-md-4">'
            c+= '<p>'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation_country", tab_reservation_country)
            c+= '<label for="tab_reservation_country"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_COUNTRY']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-4-->
            c+= '<div class="col-md-4">'
            c+= '<p>'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation_city", tab_reservation_city)
            c+= '<label for="tab_reservation_city"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_CITY']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-4-->
            c+= '<div class="col-md-4">'
            c+= '<p>'
            c+= Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation_option", tab_reservation_option)
            c+= '<label for="tab_reservation_option"><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_OPTIONAL']?></label>'
            c+= '</p>'
            c+= '</div>'
			<!--col-md-4-->
            c+= '</div>'
			<!--row-->
            c+= '<div class="row" style="margin-top:30px;">'
            c+= '<div class="col-md-3">'
			var d = new Array();
			d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
			d.push(JSON.parse('{"id":"f","caption":"No"}'))
            c+= '<div class="form-group">'
            c+= '<label>Listing Step:</label>'
			c+= Forms.CreateSelectPropertySettings("tabsettings", "list_step", d, a[0].list_step, false) 
            c+= '</div>'
			<!--form-group-->
            c+= '</div>'
			
			c+= '<div class="col-md-3">'
			var sc = new Array();
			sc.push(JSON.parse('{"id":"t","caption":"Yes"}'));
			sc.push(JSON.parse('{"id":"f","caption":"No"}'))
            c+= '<div class="form-group">'
            c+= '<label><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_CITY_SPECIAL_SEARCH']?>:</label>'
			c+= Forms.CreateSelectPropertySettings("tabsettings", "search_city", sc, a[0].search_city, false) 
            c+= '</div>'
			<!--form-group-->
            c+= '</div>'
			<!--col-md-3-->
			c+= '<div class="col-md-3">'
			var ac = new Array();
			ac.push(JSON.parse('{"id":"t","caption":"Yes"}'));
			ac.push(JSON.parse('{"id":"f","caption":"No"}'))
            c+= '<div class="form-group">'
            c+= '<label><?=$lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_GIBBERISH_SETTINGS']?>:</label>'
			c+= Forms.CreateSelectPropertySettings("tabsettings", "gibberish", ac, a[0].gibberish, false) 
            c+= '</div>'
			<!--form-group-->
            c+= '</div>'
			
            c+= '</div>'
			<!--col-md-3-->
           




			c +='<h4 class="form-h4"><strong><?=$lang_resource['BUSINESS_TYPE_HEADING']?></strong></h4>'
			c +='<div class="row search-box-row">'
			c +='<div class="col-md-3">'
			c +='<p>'
			c +=Forms.CreateCheckBoxPropertyTabBusinessType("tabsettings", "tab_food", tab_food,false,true,"",'businesstype')
			c +='<label for="tab_food"><?=$lang_resource['BUSINESS_TYPE_FOOD']?></label>'
			c +='</p>'
			c +='</div>'<!--col-md-3-->
			c +='<div class="col-md-3">'
			c +='<p>'
			c +=Forms.CreateCheckBoxPropertyTabBusinessType("tabsettings", "tab_alcohol", tab_alcohol,false,true,"",'businesstype')
			c +='<label for="tab_alcohol"><?=$lang_resource['BUSINESS_TYPE_ALCOHOL']?></label>'
			c +='</p>'
			c +='</div>'<!--col-md-3-->
			c +='<div class="col-md-3">'
			c +='<p>'
			c +=Forms.CreateCheckBoxPropertyTabBusinessType("tabsettings", "tab_groceries", tab_groceries,false,true,"",'businesstype')
			c +='<label for="tab_groceries"><?=$lang_resource['BUSINESS_TYPE_GROCERIES']?></label>'
			c +='</p>'
			c +='</div>'<!--col-md-3-->
			c +='<div class="col-md-3">'
			c +='<p>'
			c +=Forms.CreateCheckBoxPropertyTabBusinessType("tabsettings", "tab_laundry", tab_laundry,false,true,"",'businesstype')
			c +='<label for="tab_laundry"><?=$lang_resource['BUSINESS_TYPE_LAUNDRY']?></label>'
			c +='</p>'
			c +='</div>'<!--col-md-3-->
			c +='</div>'<!--row-->

			c += '</div>'


			
			
			
			<!--row-->
            c+= '</div>'
			<!--tab-box-->

			$("#websitesetting").empty().append(c);
			
		if (Forms.CanSave("tabsettings")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
        
        Forms.UpdateValue("tabsettings", "country" , a[0].country, true);
        Forms.UpdateValue("tabsettings", "city" , a[0].city, true);
        
        Users.PopulateCitySelect(a[0].country, a[0].city)
        
        $("#ga").focus()
		},

	CountrySelected: function (a) {
	
        SearchBox.PopulateCitySelect(a.options[a.selectedIndex].value)
    },
	    PopulateCitySelect: function (c, b) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (g != "") {
                var f = JSON.parse(g).franchises;
                var e = document.getElementById("city");
                e.options.length = 0;
                e.options[e.options.length] = new Option("", "");
                var h = 0;
                var j = false;
                for (var d in f) {
                    if (b) {
                        if (f[d].id == b) {
                            h = d;
                            j = true
                        }
                    }
                    e.options[e.options.length] = new Option(f[d].city, f[d].id)
                }
               
            }
        })
    },
    PreValidationBusinessType: function(){
		if($("#tab_delivery").prop('checked') == true || $("#tab_pickup").prop('checked') == true) {
			var b = Main.GetMarkedCheckBoxesValuesByClass('businesstype');		
			if (b.length == 0) {
				alert('please select any one business type')
				return false
			}else{
				return true
			}
		}else{
			return true
		}
    },

	PreValidation: function(){
		
		//alert(SearchBox.SpecialEnterprise.specialenterprise);
		
		if(SearchBox.SpecialEnterprise.specialenterprise==1)
		{
			$("#tab_delivery_neighborhood").prop('checked') == false;
			 document.getElementById("tab_delivery_neighborhood").checked = false;
			 alert('<?=$lang_resource['ADMIN_PAGE_FORM_PLEASE_SELECT_SPECIALENTERPRISE']?>');
			//alert('Please select Special Enterprise No'); 			
			return ;
			
			}
		
		},
	
	Save: function () {
		if(($("#search_city") == 't')){			
			document.getElementById("country").checked == false;
			alert('<?=$lang_resource['ADMIN_PAGE_FORM_PLEASE_SELECT_DEFAULT_COUNTRY']?>');
			return;			
		}
		if(SearchBox.PreValidationBusinessType() !=true){
            return
        }
		if(($("#tab_delivery_neighborhood").prop('checked') == true)){
		if(SearchBox.SpecialEnterprise.specialenterprise==1){
			if(SearchBox.PreValidation() !=true){
				return
			}		
		}
		}
		if(($("#tab_delivery_country").prop('checked') == false) ) {
			if((document.getElementById("country").value=="-1") ||(document.getElementById("city").value=="-1")){
				alert('<?=$lang_resource['ADMIN_PAGE_FORM_PLEASE_SELECT_DEFAULT_COUNTRY']?>'); 
				return
			}
		}
		if(($("#tab_delivery").prop('checked') == false) && ($("#tab_pickup").prop('checked') == false) && ($("#tab_reservation").prop('checked') == false)) {
			alert('<?=$lang_resource['ADMIN_PAGE_FORM_CHECK_DELIVERY_OR_PICKUP_RESERVATION']?>');
			return
		}
		if(($("#tab_delivery").prop('checked') == true) && ($("#tab_delivery_address").prop('checked') == false) && ($("#tab_delivery_neighborhood").prop('checked') == false)) {
			alert('<?=$lang_resource['ADMIN_PAGE_FORM_ADDRESS_NEIGHBOURHOOD']?>'); 
			return
		}
		if ((Forms.CanSave("tabsettings") == false)) {
			return
		}

		if(($("#tab_pickup").prop('checked') == true)){
			if($("#tab_pickup_city").prop('checked') == false && $("#tab_pickup_option").prop('checked') == false){
				alert("please choose minimum one field in Pickup Section")
				return
			}			
		} 

		if(($("#tab_reservation").prop('checked') == true)){
			if($("#tab_reservation_city").prop('checked') == false && $("#tab_reservation_option").prop('checked') == false){
				alert("please choose minimum one field in Reservarion Section")
				return
			}			
		} 
        
        
        if(Forms.Form.tabsettings.fields.country.value == "")
        Forms.Form.tabsettings.fields.city.value = -1;

		var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();

        $.post("lib/tabsettings.php", "f=SaveTabSettings&data=" +JSON.stringify(Forms.Form.tabsettings), function (e) {
            $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchNeighbourhoodSettings"}]', function (a) {
                Main.neighsettings = JSON.parse(a).neighsettings;
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                SearchBox.Main();
            });            
        });
  
        Forms.Clean("tabsettings");
		
    
    },
};