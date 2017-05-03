var Blist = {
	PopulateBusinessList: function (E, A,fivekm,fav){ 

		var bidx = 0;
		var AllPurifiedBusinessid = Array();
		for (var x in Shopping.Business){
			AllPurifiedBusinessid[bidx] = Shopping.Business[x].id;
			bidx ++;
		}		
		$.post("panel/<?=$moduleName?>/lib/front-bulk-custom.php", 'data=[{"operation":"fetchBusinesscatnsubcat","businessids":'+JSON.stringify(AllPurifiedBusinessid)+'},{"operation":"fetchBusinessMenuForAll","businessids":'+JSON.stringify(AllPurifiedBusinessid)+'}]', function (a){
			
			if(a !=""){
				Shopping.BusinessDetails = JSON.parse(a).businessmenudata;	
				Shopping.MenuSubLists = JSON.parse(a).businesscatnsubcat;	
				RestMenuList.businessid = 0;	
				RestMenuList.firststep = 0;							
				RestMenuList.Main();
				$("#clock_loading").hide();
			}else{
				
				Shopping.NoResturant();
				return false;
			}				
		});	
    },
	
	CatagoriesFetch: function(){	
	  var e = "";	
	    e +='<div class="pull_left left-sidebar" style="display:none;">'
        e +='<div class="cuisines">'
		e +='<h3 class="cuisi-text"><span style="margin-left:-65px;"><?= $lang_resource['Categories_V2'] ?></span></h3>'
		e +='<div class="pull_left cuisi-li" ><input  type="checkbox" id="business_category_all" name="checkbox" checked="checked"  value="2" style="" onclick="Blist.checkall()"  class="checkbox_2" checked="checked"><label for="business_category_all">Show all</label></div>';
		e +='<ul class="cuisi-li" id="categoriesbox">'

        e +='</ul>'
        e +='</div>'
        e +='</div>'
	 
		
		e += '<div id="shoplistadscontainer"></div>';

		e += '</div>';	

        e += '<div class="resultsbox nonselectable abt_rgt_inner">';
        e += '<div id="businessresults" class="abt_rgt_inner results hand"></div>';
        e += "</div>";
        e += "</div>";
		return e;
	},
	checkall: function() {
		
		
		
		
		for (var z in Shopping.Categories)
                {
					if(document.getElementById("business_category_all").checked) {
					var a = "business_category_switch_"+ Shopping.Categories[z].id;
                     Shopping.Categories[z].enabled = true;
					 document.getElementById(a).checked = true;
					 Shopping.SetBusinessCategoryEnabled(a.replace("business_category_switch_", ""), true)
					}
					else {
						
					 var a = "business_category_switch_"+ Shopping.Categories[z].id;
                     Shopping.Categories[z].enabled = false;
					 document.getElementById(a).checked = false;
					 Shopping.SetBusinessCategoryEnabled(a.replace("business_category_switch_", ""), false)
						
						}
                }
		
	
		},
	CatagoriesFetchItem: function(){
		e = "";
		
		 for (var d in Shopping.Categories){	
			e +='<li>'
			e +='<div class="" ><input  type="checkbox" id="business_category_switch_' + Shopping.Categories[d].id + '" name="checkbox"  value="2" style=""  class="checkbox_2"><label for="business_category_switch_' + Shopping.Categories[d].id + '" >'+ Shopping.Categories[d].name +'</label></div>'
			e +='</li>'
		 }
		 return e;
	},
	express5Km: function()
	{
		
	//alert((document.getElementById("expressi").checked)
		if(document.getElementById("expressi").checked==true)
		{
			
			 Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true,true)
		}
		else
		{
			 Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
			//Shopping.Start();
		}
	},
	ShoppingHeaderDesignTop: function(){
		
		 var sch='<div class="map-pannel" >'
        	sch +='<div class="main">'
            sch +='<h3 class="pull_left text_center refine-text">Refine your<br>results</h3>'
             sch +='<div class="pull_left checkbox_dv" id="src_bxNew">';
			
		  if(Main.WhereAmIData.reservestatus == 'delivery')
				var std = 'selected="selected"'
			if(Main.WhereAmIData.reservestatus == 'pickup')
				var stp = 'selected="selected"'
			

			sch += '<select id="doption" onchange="Main.Changetype()" class="field_text">'
			sch += '<option value="">Select Option</option>'
			sch += '<option value="1" '+std+'>Delivery</option>'
			sch += '<option value="2" '+stp+'>Pickup</option>'
			sch += '</select>'
			 <!------------------------------------------------------- reservation------------------------------------------------------------- -->
        
               sch +='</div>';
             sch +='<div class="inner_serach" id="src_bx">'
               sch +='<span class="pull_left"><input type="text" class="field_text search_input" id="businesssearch" placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>"></span>'
               sch +='<span class="pull_left" style="margin-top:18px; margin-left:10px;"><button type="button" class="search_btn"><?= $lang_resource['SEARCH_V2'] ?></button></span>'
                sch +='<span class="pull_left" style="margin-top:18px; margin-left:0px;"><button type="button"  onclick="Shopping.GoogleMapshowhide()" id="showcheck" class="map_btn"><span><img src="panel/theme/en/map-icon.png"></span> Hide Map</button></span>'
               sch +='</div>'
           sch +='</div>'
     sch +='</div>'




	return sch;
		
		
		
	},
	ShoppingHeaderDesignNavigationHtml: function(){
		
		var shs = '<div class="nav" id="progressbarpart" style="display:none;">'
		shs += '<div class="main">'
		shs += '<ul>'
		shs += '<li><a href="javascript:Shopping.homeurl()"><span class="step-logo"><img src="images/step2-business-listing/locetion_logo.png"></span><span class="step-text"><?= $lang_resource['SHOPPING_SELECT_LOCATION'] ?></span></a></li>'
		if(Shopping.RedirectToCity) {	
		shs += '<li  class="active-step"><a href="javascript:Shopping.changeDelType(2)"><span class="step-logo"><img src="images/step2-business-listing/pickup_logo.png"></span><span class="step-text"><?= $lang_resource['SHOPPING_PICKUP_RESTAURANT'] ?></span></a></li>'
		} else {
		shs += '<li  class="active-step"><a href="javascript:Shopping.changeDelType(3)"><span class="step-logo"><img src="images/step2-business-listing/pickup_logo.png"></span><span class="step-text"><?= $lang_resource['SHOPPING_PICKUP_RESTAURANT'] ?></span></a></li>'	
		}
		shs += '<li id="plc_ordr"><a href="javascript:Shopping.OpenBusiness('+currentshop+')"><span class="step-logo"><img src="images/step2-business-listing/place_order.png"></span><span class="step-text"><?= $lang_resource['SHOPPING_PLACE_ORDER'] ?></span></a></li>'

		shs += '<li id="plc_checkout"><a href="javascript:Shopping.OpenCartCheck()"><span class="step-logo"><img src="images/step2-business-listing/make_payment.png"></span><span class="step-text"><?= $lang_resource['SHOPPING_MAKE_PAYMENT'] ?></span></a></li>'

		shs += '<li id="get_dlvrd"><a href="javascript:void(0)"><span class="step-logo"><img src="images/step2-business-listing/get_delivered.png"></span><span class="step-text"><?= $lang_resource['SHOPPING_GET_DELIVERED'] ?></span></a></li>'
		shs += '</ul>'
		shs += '</div>'
		shs += '</div>'
		shs += '<div id="showcanvas" class="inner-map" style="display:none;"></div>'
		
		return shs;
		
	},	
		
	ShoppingHeaderBusinessSearchHtml: function(){
		
		var sch='<div class="map-pannel" style="display:none;">'
		sch +='<div class="main">'
		sch +='<h3 class="pull_left text_center refine-text">Refine your<br>results</h3>'
		sch +='<div class="pull_left checkbox_dv" id="src_bxNew">';

		if(Main.WhereAmIData.reservestatus == 'delivery')
		var std = 'selected="selected"'
		if(Main.WhereAmIData.reservestatus == 'pickup')
		var stp = 'selected="selected"'
		if(Main.WhereAmIData.reservestatus == 'reservation')
		var str = 'selected="selected"'

		sch += '<select id="doption" onchange="Main.Changetype()" class="field_text">'
		sch += '<option value="">Select Option</option>'
		sch += '<option value="1" '+std+'>Delivery</option>'
		sch += '<option value="2" '+stp+'>Pickup</option>'
		sch += '</select>'
		<!------------------------------------------------------- reservation------------------------------------------------------------- -->

		sch +='</div>';

		sch +='<div class="inner_serach" id="src_bx">'
		sch +='<span class="pull_left"><input type="text" class="field_text search_input" id="businesssearch" placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>"></span>'
		sch +='<span class="pull_left" style="margin-top:18px; margin-left:10px;"><button type="button" class="search_btn"><?= $lang_resource['SEARCH_V2'] ?></button></span>'
		sch +='<span class="pull_left" style="margin-top:18px; margin-left:0px;"><button type="button"  onclick="Shopping.GoogleMapshowhide()" id="showcheck" class="map_btn"><span><img src="panel/theme/en/map-icon.png"></span> Hide Map</button></span>'
		sch +='</div>'
		sch +='</div>'
		sch +='</div>'




	return sch;
		
		
		
	},
	bussinessListSearchHtml: function(){
			var u  ='<div class="select-rest">'
            u +='<h3 class="pull_left">Select restaurant</h3>'
            u +='<div class="pull_left" style="margin-right:20px">'
            u +='<select class="field_select" id="bopenClose" style="width:231px" onchange="Shopping.openCloseShop()">'
			u +='<option value="openAll" selected>Opened & Closed Restaurants</option>'
            u +='<option value="openi" ><?=$lang_resource['OPENEDRESTAURANTS']?></option>'
            u +='<option value="closei"><?=$lang_resource['CLOSEDRESTAURANTS']?></option>'
                                 
            u +='</select>'
            u +='</div>'
			u +='<div class="pull_left" style="margin-top:10px;">'
            u +='<div class="boxcheck"><input id="expressi" type="checkbox" name="checkbox" value="2" style="opacity:0;" class="checkbox_2" onclick="Main.express5Km()"><label for="expressi" class="express" style="color:#333" >Express 5 KM</label></div>';
			
				if(Main.User)
		 {
			
			 
		 u += '<div class="boxcheck"><input name="favorite" id="favorite" type="checkbox"  onclick="Shopping.FavList()" value="" style="opacity:0;" class="checkbox_2" >';
		  u += '<label for="favorite" class="express" style="color:#333">Favorites</label></div>';
		 }
		 else
		 {
			u += '<input id="favorite" type="hidden" value="">'; 
		 }
         u +='</div>';
         u +='</div>'
			
			return u;
			},		
	setCheck: function(id){
		
		if ($("#business_category_switch_"+id).is(':checked')) {
			
        	$("#business_category_switch_"+id).prop('checked',false);
       
 		 }else{
			 $("#business_category_switch_"+id).prop('checked',true);
			 }
	},
	
   BusinessDishAcumulate: function() {
	   
        if (A)
        {  
		    E="distanceKm";
            Shopping.Business.sort(Main.SortByProperty(E));
            if (Shopping.Config.Business.List.SortByStatus == "max")
            {
                Shopping.Business.reverse()
            }
        }
        else
        {
            if (Shopping.Config.Business.List.SortBy != E)
            {
                Shopping.Business.sort(Main.SortByProperty(E));
                Shopping.Config.Business.List.SortByStatus = "min"
            }
            else
            {
                Shopping.Business.reverse();
                if (Shopping.Config.Business.List.SortByStatus == "min")
                {
                    Shopping.Config.Business.List.SortByStatus = "max"
                }
                else
                {
                    Shopping.Config.Business.List.SortByStatus = "min"
                }
            }
        }
        Shopping.Config.Business.List.SortBy = E;
        var t;
        var C = false;
        var s = new Array();
		
		
		var favArr = Array();
		
		if(fav)
		{
		
	 	favArr = Shopping.Fav;
		
		 
		}
	

        for (var x in Shopping.Business)
        {
			
            t = JSON.parse(Shopping.Business[x].categories);

            C = false;
            for (var y in t)
            {
                for (var z in Shopping.Categories)
                {  
               var splitcat = Shopping.Categories[z].ids.split(",");         
                    if (ProductOption.in_array(t[y],splitcat))
                    {
                        if (Shopping.Categories[z].enabled)
                        {
                            C = true
                           
                        }
                    }
                }
            }
			
			/*if(fav)
				{
					if(favArr.indexOf(Shopping.Business[x].id) !=-1)
					C = true;
					else
					C = false;
				}*/

			
            if (C)
            {
            	

                var v = document.getElementById("businesssearch").value.toLowerCase();
                if (Shopping.Business[x].name.toLowerCase().indexOf(v) >= 0)
                {
                    s.push(Shopping.Business[x])
                }
                else
                {
                    var B = JSON.parse(Shopping.Business[x].categories);
                    for (y in B)
                    {
                        if (Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", B[y], "name").toLowerCase().indexOf(v) >= 0)
                        {
                            s.push(Shopping.Business[x]);
                            break
                        }
                    }
                }
            }
        }

        
	
	$("#businessresults").removeClass("hand")
	
	for (var z in Shopping.Categories)
                {
                    if(document.getElementById("business_category_switch_"+Shopping.Categories[z].id).checked == true) {                    
                        Shopping.Categories[z].enabled = true;
                       
                    }else{
						Shopping.Categories[z].enabled = false;
					}
                }
		
		var rvw = "";
		var u  ='';
		var r = "1";
		var D = "";
		var w = "";

		if (s.length == "0"){



		u +='<div class="select-rest">'
		u +='<h3 class="pull_left">Select restaurant</h3>'
		u +='<div class="pull_left" style="margin-right:20px">'
		u +='<select class="field_select" id="bopenClose" style="width:231px" onchange="Shopping.openCloseShop()">'
		u +='<option value="openAll" selected>Opened & Closed Restaurants</option>'
		u +='<option value="openi" ><?=$lang_resource['OPENEDRESTAURANTS']?></option>'
		u +='<option value="closei"><?=$lang_resource['CLOSEDRESTAURANTS']?></option>'

		u +='</select>'
		u +='</div>'
		u +='<div class="pull_left" style="margin-top:10px;">'

		u +='</div>'
		u +='<div>&nbsp;</div>'
		//alert(JSON.stringify(s))   

		u += '<div class="no-restaurants" style="margin-top: 50px;">';

		u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>";

		u += "</div>"

		document.getElementById("businessresults").innerHTML = u;

		return;

		}


	 
	

		if(Main.WhereAmIData.reservation == true)
			var delTyle = "reservation";
		else 
			var delTyle = Main.WhereAmIData.collecttype; 
		
		
		BusinessDetails = new Array();
		var counter = s.length
		var count = 0;
		for (x in s){						
			if (s[x].open && s[x].catalog != 0 && s[x].menulist == 1){/*	
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+s[x].id+',"deliverytype":' + JSON.stringify(delTyle) + '}]', function (a){
					
					a = JSON.parse(a);
					if(a !=""){
						if (a.menu.dishes.length != 0){	                		
	                		var BDetails = {business:s[count], menu:a.menu};                    		           		
	                		BusinessDetails.push(BDetails);
	                		counter--; 
	                		count++;  
	                		if(counter == 0){
								if(BusinessDetails.length !=0){
									Shopping.BusinessDetails = BusinessDetails;	
									alert('1')							
									RestMenuList.Main();
								}else{
									alert("No Resturant Available")
								}				
							}
	                	}
					}else{
						alert('3')
						counter--; 
						count++;  
					}
				});
			*/}else{
				counter--;
				count++;
				if(counter == 0){
					if(BusinessDetails.length !=0){
						Shopping.BusinessDetails = BusinessDetails;	
										
						RestMenuList.Main();
					}else{
						alert("No Resturant Available")
					}				
				}else{
					
				}
			}			
		}

	
	

		  
       
		
        /*if (s.length == 0)
        {
            u += '<div class="no-restaurants">';
            u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>";
            u += "</div>"
        }
        u += "<div>";*/
		
		
        document.getElementById("businessresults").innerHTML = u;
		
		
		
		if(fivekm) {
			document.getElementById("expressi").checked= true;
		}
		
		if(fav) {
			document.getElementById("favorite").checked= true;
		}
		
		if(Shopping.Business)
		{
			
		 $(document).ready(function() { initialize(); });
		}
		
		if(s[0].searchtype=="delivery") {
		document.getElementById("showcanvas").style.display="none";
		document.getElementById("showcheck").innerHTML ="<span><img src='panel/theme/en/map-icon.png'></span> Show Map"
		}
        
	   
	   
	   },
	
};
