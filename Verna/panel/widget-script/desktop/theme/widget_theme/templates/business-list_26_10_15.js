var Blist = {
	PopulateBusinessList: function (E, A,fivekm,fav,opncls)
    {

		
		if( Shopping.ActiveBusiness) {

			  Shopping.OpenBusiness(Shopping.ActiveBusiness,true);
			  return false;
		} 
		
			
			
	  Main.stepBack  = 2;
       var s = new Array();
		 
	   s = Shopping.GetBusinessLogicaly(E,A,fivekm,fav,opncls);
	
		 
	    $("#businessresults").removeClass("hand")
	
	    for (var z in Shopping.Categories)
                {
					 var fid = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", Shopping.Categories[z].id);
					 var Allidsrecords = Shopping.Categories[fid].ids.split(",");
					 
					   
                    if(document.getElementById("business_category_switch_"+Shopping.Categories[z].id).checked == true) {
						
                     for(var tk in Allidsrecords) {
			
		if(Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]) != -1) {
					  var fn = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]);
					  
					  Shopping.CategoriesCustom[fn].enabled = true;
			}
				
					
					}
                       
                    }
					else  {
						 for(var tk in Allidsrecords) {
				if(Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]) != -1) {
						  var fn = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]);
						  
						  Shopping.CategoriesCustom[fn].enabled = false;
				}
				
					
						
						}
				}
                }
	var rvw = "";
        var u  ='';
        var r = "1";
        var D = "";
        var w = "";
		var htms ='';
		
		
	
		var el = "";
			
			$(".bsrch").html('');
			$("#headerSearch").append(el);
		
			
			$(function() {
			   $('#rdate1').datepick({ minDate: 0});
			});
	
	       if (s.length == "0"){

            u += Blist.bussinessListSearchHtml();
		
						 
			
          u +='<div>&nbsp;</div>'
		  
		  u += '<div class="no-restaurants" style="margin-top: 50px;">';

          u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>";

          u += "</div>"

			  document.getElementById("businessresults").innerHTML = u;

		if(fivekm) {
			document.getElementById("expressi").checked= true;
		}
			  return;

        }

		if(Main.NullToEmpty(Main.searchType) != "Global")
		{
			if(s[0].searchtype=="citysearch" || s[0].searchtype=="pickup" ) {
		
	
			}
		}

	 
		u += Blist.bussinessListSearchHtml();
							 
		  console.log(JSON.stringify(s))
		  
		u +='<div class="right-restaurant" id="businessresultsinner">';  
		var counterlistbusiness = 0;
		var restaurant = Main.settingfront.restaurant.split(",");
		restaurant = JSON.parse(restaurant)
		
		var businesscount = 0;
        for (x in s)
        {
			//console.log(restaurant.indexOf(s[x].id))
			if( $.inArray(s[x].id, restaurant ) != -1 || $.inArray("-1", restaurant ) != -1){
				businesscount++	
			}
			
				
            if ((s[x].open  && s[x].menulist == 1 && (s[x].catalog != 0) || Main.WhereAmIData.reservation == true))
			{
				
				if((Main.settingfront.list_step == 'f' && counterlistbusiness == 0) || (restaurant.length == 1 && $.inArray(s[x].id, restaurant )!= -1 && counterlistbusiness == 0)  ){
					Shopping.OpenBusiness(s[x].id)
					counterlistbusiness ++;
				}
				
		    if (s[x].review != "")
		    {
		        var url = location.href.split('/');
				
			Shopping.Review = s[x].review;
			Shopping.Review.url = url[2];
			     if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				{
					var roundTotal = Math.round(Shopping.Review.total);
					var starsReview = "";
					var i = 1;
					for(i=1;i<=5;i++)
					{
					  
						if(roundTotal>=1)
						{
							 starsReview +='<li><a href="javascript:void(0)"><img src="images/step2-business-listing/star-yellow.png"></a></li>'
							 roundTotal=roundTotal-1;
						}
						else if(roundTotal<=0)
						{    starsReview +='<li><a href="javascript:void(0)"><img src="images/step2-business-listing/star-grey.png"></a></li>'
							
						}
					}
				}
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					{
						
						rvw = starsReview ;
						var rating = Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>';
					}
					else
					{
						rvw = "";
					}
		    }
				var isAcceptingCard = s[x].acceptcard == "t";
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					isAcceptingCard = s[x].acceptcard == "t" || s[x].paypal;
					
				if (isAcceptingCard)
                {
                    w = '<span class="acceptcard"></span>'
                }
                else
                {
                    w = ""
                } 
				if(s[x].isimg==1)
				{

					D ='panel/images/business/' + Main.NullToEmpty(s[x].id) + '/medium.jpg?c=' + Main.Random ;
				}
				else if(s[x].isimg==0)
				{
					D = 'panel/images/dummy/medium_business.jpg';
				}
				
				

		if (rvw == ""){
			rvw = ' <a href="/'+s[x].name+'" class="rvw_txt"><?= $lang_resource['SHOPPING_THIRD_SEE_COMMENTSs'] ?></a>';
		}
	//console.log(restaurant.indexOf('-1'))
	if($.inArray('-1', restaurant ) != -1 || $.inArray(s[x].id, restaurant ) != -1){
		
	/***********************************Business list Box Design part(Open Business)****************************************************/
	  htms +=Blist.OpenBusinessHtml(s,rvw,D,rating)
	/***********************************Business list Box Design part(Open Business)****************************************************/
			
			/*$.post("lib/front-bulk.php", "f=FetchBusinessMenuS&id=" + s[x].id, function (e) {
              
               
			
            
            })*/				
		

		rvw = "";
	}
  }
			else if(s[x].catalog==0) {
			
			}
            else
            {
				
				if((Main.settingfront.list_step == 'f' && counterlistbusiness == 0) || (restaurant.length == 1 && $.inArray(s[x].id, restaurant ) != -1 && counterlistbusiness == 0)  ){
					Main.PreOrderMenuCatalogFetch(s[x].id )
					counterlistbusiness ++;
				}
				
				
				
				 if (s[x].review != "")
		    {
		        var url = location.href.split('/');
				
			Shopping.Review = s[x].review;
			Shopping.Review.url = url[2];
			     if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				{
					var roundTotal = Math.round(Shopping.Review.total);
					var starsReview = "";
					var i = 1;
					for(i=1;i<=5;i++)
					{
					  
						if(roundTotal>=1)
						{
							 starsReview +='<li><a href="javascript:void(0)"><img src="images/step2-business-listing/star-yellow.png"></a></li>'
							 roundTotal=roundTotal-1;
						}
						else if(roundTotal<=0)
						{    starsReview +='<li><a href="javascript:void(0)"><img src="images/step2-business-listing/star-grey.png"></a></li>'
							
						}
					}
				}
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					{
						
						rvw = starsReview ;
						var rating = Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>';
					}
					else
					{
						rvw = "";
					}
		    }
				
				if(s[x].menulist == 1){
				var isAcceptingCard = s[x].acceptcard == "t";
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					isAcceptingCard = s[x].acceptcard == "t" || s[x].paypal;
					
				if (isAcceptingCard)
                {
                    w = '<span class="acceptcardclosed"></span>'
                }
                else
                {
                    w = ""
                }
                if(s[x].isimg==1)
				{

					D ='panel/images/business/' + Main.NullToEmpty(s[x].id) + '/medium.jpg?c=' + Main.Random ;
				}
				else if(s[x].isimg==0)
				{
					D = 'panel/images/dummy/medium_business.jpg';
				}

	if($.inArray('-1', restaurant ) != -1 || $.inArray(s[x].id, restaurant ) != -1){
		
			/***********************************Business list Box Design part(Close Business)****************************************************/	
 						u +=Blist.CloseBusinessHtml(s,rvw,D,rating)
			
	         /***********************************Business list Box Design part(Close Business)****************************************************/	
	}
			  }
			}
           
			
			 
			
            if (r == "1")
            {
                r = "2"
            }
            else
            {
                r = "1"
            }
        }
		
        if (s.length == 0)
        {
            u += '<div class="no-restaurants">';
            u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>";
            u += "</div>"
        }
        u += "<div>";
		
		
        //document.getElementById("businessresults").innerHTML = u;
		
		
		 htms += '<div class="popup_wrapper"  style="width:883px; min-height:160px;">'
				htms += '<div class="pop_header" style="width:883px;margin-bottom:25px;background-color:#fff;">'
					htms += '<div class="pop_heading"><h3></h3>'
					htms += '</div>'
					htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
						htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
					htms += '</div>'
					htms += '<div class="wrapper">cgvsfgfsd cvhdghd'
						
			
					htms += '</div>'
				htms += '</div>'		
			htms +='</div>'
		
		Popup.Show('', '', htms, null, function (){
        }, Main.PreDatepickerCall)
		
		if(businesscount == 0){
			alert("<?= $lang_resource['NORESTAURANTAVAILABLE_V21'] ?>");
					window.location="./";
		}
		
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
		
		if(s[0].searchtype=="delivery" || s[0].searchtype=='categorysearch') {
		document.getElementById("showcanvas").style.display="none";
		document.getElementById("showcheck").innerHTML ="<span><img src='images/step2-business-listing/map-icon.png'></span> <?=$lang_resource['DESKTOP_BUSINESS_SHOW_MAP'];?>"
		}
		console.log(s[0].searchtype)
		if(Shopping.ActiveCategory) {
		Shopping.GoogleMapshowhide()
		}
        
    },
	
	CatagoriesFetch: function(){	
	  var e = "";	
	    e +='<div class="pull_left left-sidebar">'
        e +='<div class="cuisines">'
		e +='<h3 class="cuisi-text"><span style="margin-left:-65px;"><?= $lang_resource['Categories_V2'] ?></span></h3>'
		e +='<div class="pull_left cuisi-li" ><input  type="checkbox" id="business_category_all" name="checkbox" checked="checked"  value="2" style="" onclick="Main.checkall()"  class="checkbox_2" checked="checked"><label for="business_category_all"><?=$lang_resource['SHOPPING_CATEGORIES_SHOW_ALL'] ?></label></div>';
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
	
	CatagoriesFetchItem: function(){
		e = "";
		/* checked="checked"*/
		/*alert(JSON.stringify(Shopping.Categories))*/
		
		 for (var d in Shopping.Categories){	
		 var dyc = 'business_category_switch_' + Shopping.Categories[d].id;
			e +='<li>'
			e +='<div class="" ><input  type="checkbox" id="business_category_switch_' + Shopping.Categories[d].id + '" name="checkbox"  value="2" style=""  class="checkbox_2" onclick="Shopping.checkBoxtick(\'' + dyc + '\')"><label for="business_category_switch_' + Shopping.Categories[d].id + '" >&nbsp;</label></div><div class="checkboxtextdp" onclick="Shopping.checkBoxtick(\'' + dyc + '\')">'+ Shopping.Categories[d].name +'</div></div>';
			e +='</li>'
			
		 }
		 return e;
	},
	
	
	
	ShoppingHeaderBusinessSearchHtml: function(){
		
		 var sch='<div class="map-pannel" >'
        	sch +='<div class="main">'
            sch +='<h3 class="pull_left text_center refine-text"><?= $lang_resource['SHOPPING_REFINE_YOUR'] ?><br><?= $lang_resource['SHOPPING_REFINE_RESULTS'] ?></h3>'
             sch +='<div class="pull_left checkbox_dv" id="src_bxNew">';
			
		  if(Main.WhereAmIData.reservestatus == 'delivery')
				var std = 'selected="selected"'
			if(Main.WhereAmIData.reservestatus == 'pickup')
				var stp = 'selected="selected"'
			if(Main.WhereAmIData.reservestatus == 'reservation')
				var str = 'selected="selected"'

			sch += '<select id="doption" onchange="Main.Changetype()" class="field_select" style="cursor:pointer;">'
			sch += '<option value=""><?= $lang_resource['PRODUCT_OPOTIONS_SELECT_OPTION'] ?></option>'
			 if(Main.settingfront.tab_delivery != 'f'){
				sch += '<option value="1" '+std+'><?= $lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY'] ?></option>'
			}
			if(Main.settingfront.tab_pickup != 'f'){
				sch += '<option value="2" '+stp+'><?= $lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP'] ?></option>'
			}
			if(Main.settingfront.tab_reservation != 'f'){
				sch += '<option value="4" '+str+'><?= $lang_resource['RESERVATION_V21'] ?></option>'
			}
			sch += '</select>'
			 <!------------------------------------------------------- reservation------------------------------------------------------------- -->
        
               sch +='</div>';
             sch +='<div class="inner_serach" id="src_bx">'
               sch +='<span class="pull_left"><input type="text" class="field_text search_input" id="businesssearch" placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>"></span>'
               sch +='<span class="pull_left" style="margin-top:18px; margin-left:10px;"><button type="button" class="search_btn"><?= $lang_resource['SEARCH_V2'] ?></button></span>'
                sch +='<span class="pull_left" style="margin-top:18px; margin-left:0px;"><button type="button"  onclick="Shopping.GoogleMapshowhide()" id="showcheck" class="map_btn"><span><img src="images/step2-business-listing/map-icon.png"></span> <?= $lang_resource['SHOPPING_HIDE_MAP'] ?></button></span>'
               sch +='</div>'
           sch +='</div>'
     sch +='</div>'




	return sch;
		
		
		
	},
	ShoppingHeaderDesignNavigationHtml: function(){
		 var shs = '<div class="nav" id="progressbarpart">'
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
		   shs += '<div id="showcanvas" class="inner-map"></div>'
		
		   return shs;
		
	},	
	bussinessListSearchHtml: function(){
		var ap ='';
		var op = '';
		var cp = '';
			if(Main.OpenCloseValue == 'openi'){
				var op ='selected';	
			}else if(Main.OpenCloseValue == 'closei'){
				var cp ='selected';	
			}else{
				var ap = 'selected';
			}
			var u  ='<div class="select-rest">'
            u +='<h3 class="pull_left"><?= $lang_resource['Select_Restaurant_V2'] ?></h3>'
            u +='<div class="pull_left" style="margin-right:20px">'
            u +='<select class="field_select" id="bopenClose" style="width:231px" onchange="Shopping.openCloseShop(this)">'
			u +='<option value="openAll" '+ap+'><?= $lang_resource['BUSINESS_LIST_OPTIONS_RESTAURANT'] ?></option>'
            u +='<option value="openi" '+op+'><?=$lang_resource['OPENEDRESTAURANTS']?></option>'
            u +='<option value="closei" '+cp+'><?=$lang_resource['CLOSEDRESTAURANTS']?></option>'
                                 
            u +='</select>'
            u +='</div>'
			u +='<div class="pull_left" style="margin-top:10px;">'
			 //Settings to select miles or km 
				distanceformatKM="<?= $lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS'] ?>";
				if(Shopping.Business[0].distanceformat=='N'){
					distanceformatKM="<?= $lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS1'] ?>";
				}
            u +='<div class="boxcheck"><input id="expressi" type="checkbox" name="checkbox" value="2" style="opacity:0;" class="checkbox_2" onclick="Main.express5Km()"><label for="expressi" class="express" style="color:#333" >'+distanceformatKM+'</label></div>';
			
				if(Main.User)
		 {
			
			 
		 u += '<div class="boxcheck"><input name="favorite" id="favorite" type="checkbox"  onclick="Shopping.FavList()" value="" style="opacity:0;" class="checkbox_2" >';
		  u += '<label for="favorite" class="express" style="color:#333"><?= $lang_resource['BUSINESS_LIST_OPTIONS_FAVORITES'] ?></label></div>';
		 }
		 else
		 {
			u += '<input id="favorite" type="hidden" value="">'; 
		 }
         u +='</div>';
         u +='</div>'
			
			return u;
			},	

		OpenBusinessHtml : function(s,rvw,D,rating) {
			alert('dfhdfhfdg');
			 htms += '<div class="restaurant_dv" id="'+s[x].id+'_show" >'
            	htms += '<div class="row">'                
                htms += '<div class="col-md-1">'
                      htms += '<div class="rest_logo">'
                      	htms += '<a href="#"><img src="images/pizza-hut-logo.jpg"></a>'
                      htms += '</div>'
                    htms += '</div>'            
                    htms += '<div class="col-md-3">'
                      	htms += '<div class="rest_dsp">'
                        	htms += '<h3>PizzaHut</h3>'
                            htms += '<p>Grand Street, New York</p>'
                            htms += '<div class="reating_dv">'
                               htms += '<ul class="pull-left">'
                                    htms += '<li><a href="#"><img src="images/star-yellow.png"></a></li>'
                                    htms += '<li><a href="#"><img src="images/star-yellow.png"></a></li>'
                                   htms += ' <li><a href="#"><img src="images/star-yellow.png"></a></li>'
                                   htms += ' <li><a href="#"><img src="images/star-grey.png"></a></li>'
                                   htms += ' <li><a href="#"><img src="images/star-grey.png"></a></li>'
                                htms += '</ul>'
                                htms += '<div class="reating_text">(4 Ratings)</div>'
                            htms += '</div>'
                       htms += '</div>'
                    htms += '</div>'
                    htms += '<div class="col-md-5">'
                       htms += '<div class="rest_other_dsp">'
                       		htms += '<ul class="payment-time">'
                            	htms += '<li>'
                                	htms += '<span class="">We Accept: </span>'
                                    htms += '<ul>'
                                    	htms += '<li><a href="#"><img src="images/visa.png"></a></li>'
                                        htms += '<li><a href="#"><img src="images/mestro.png"></a></li>'
                                        htms += '<li><a href="#"><img src="images/paypal.png"></a></li>'
                                   htms += ' </ul>'
                                htms += '</li>'
                                htms += '<li><span class="icon"><img src="images/time-icon.png"></span> Opening Time : 12:00 AM - 11:00 PM</li>'
                                htms += '<li><a href="#"><span class="icon"><img src="images/favourite-icon.png"></span> Add to Favourite</a></li>'
                            htms += '</ul>'
                      htms += ' </div>'
                    htms += '</div>'
                    htms += '<div class="col-md-3">'
                        htms += '<div class="listing_btn_dv">'                        
                            	htms += '<button type="button" class="btn btn-red-small order_nowbtn">Order Now</button>'
                            	htms += '<button type="button" class="btn btn-yellow-small">Preorder</button>'
                       htms += '</div>'
                    htms += '</div>'
                htms += '</div>'
            htms += '</div>'
					   
			  // return htms;
			},		
		/* OpenBusinessHtml : function(s,rvw,D,rating) {
			
			 var u =' <div class="restaurant_dv" id="'+s[x].id+'_show" >'
                        	u +='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
                            u +='  <tr>'
                               u +=' <td width="26%" valign="top" style="cursor:pointer;" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\"  >"
							   if(s[x].feature == "t") {
                                	u +='<div class="featured"><span><?=$lang_resource['BLIST_FEATURED']?></span></div>'
							          }
                                    u +='<div class="rest-logo"><img src="'+D+'">'
                                    u +='</div>'
                               u +=' </td>'
                            u +='<td valign="top" width="45%">'
                                	u +='<div class="pull_left">'
                                	u +='<h4 class="rest-name pull_left" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">"+ Main.TitleCase(s[x].name) +'</h4>'
                                    u +='<div class="review">'
                                    	u +='<ul class="review-star">'
										u += rvw;
                                       u +=' </ul>'
                                     u +='   <span class="rating">'+rating+'</span>'
                                   u +=' </div>'
                                   u +=' </div>'
								  
                                  u +='  <table width="100%" border="0" cellspacing="0" cellpadding="0" class=" rest-desc">'
								
								  var paylist = JSON.parse(s[x].paymentdetails);
								   var count = 0;
								  for(var m in paylist){
									
									 if(paylist[m] == 't'){
										
										 if(m == 'cash' || m == 'card' || m == 'paypal'){
											count++;
											if(count > 0 && count == 1){
												  u +='<tr valign="top">'
												  u +='<td width="35%"><?= $lang_resource['BUSINESS_LIST_OPTIONS_PAYMENT'] ?></td>'
												  u +='<td width="4%">:</td>'
												  u +='<td>'
											
											}
										
									    u +='<span class="pull_left" style="margin-right:3px"><img src="images/step2-business-listing/paymethod/'+m+'.png"></span>'
										
										 
									 }
										
									}
									
									
									  
								  }
								  if( count > 0){
								   u +='</td>'
                                  u +=' </tr>'
								  }
								  
                                   u +='   <tr valign="top">'
                                   u +='    <td width="25%"><?= $lang_resource['DISTANCE'] ?></td>'
                                    u +='    <td width="4%">:</td>'
									 //Settings to select miles or km 
									 distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_KM'] ?>";
									if(s[x].distanceformat=='N'){
										distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_MILES'] ?>";
										
									}
                                     u +='     <td>'+s[x].distance.toFixed(2)+' '+distanceformat+'</td>'
                                   u +='   </tr>'
                                   u +='   <tr valign="top">'
                                    u +='    <td width="25%"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?></td>'
                                   u +='     <td width="4%">:</td>'
                                    u +='     <td>'+s[x].categoryshow+'</td>'
                                    u +='  </tr>'
							//alert(JSON.stringify(s[x]).currency)
							if(s[0].searchtype!="citysearch" && s[0].searchtype!="pickup" && s[0].searchtype!="categorysearch" ) {	
								if (s[x].shipping == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
									var dollarimge = "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>";
								}else{
									var dollarimge = "<span class='shipping-cost-feer'>"+s[x].shipping+"</span>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>";
								}					
                                  u +='   <tr valign="top">'
                                   u +='    <td width="25%">'+delcos+'</td>'
                                  u +='      <td width="4%">:</td>'
                                  u +='       <td>'+dollarimge+'</td>'
                                 u +='     </tr>'
							}
                                 if(s[x].promotion) {
								   u +='   <tr valign="top">'
                                    u +='    <td width="25%"><?= $lang_resource['BUSINESS_LIST_OPTIONS_PROMOTION'] ?></td>'
                                   u +='     <td width="4%">:</td>'
                                  u +='       <td>'+s[x].promotion +'</td>'
                                    u +='  </tr>'
								 }
                                  u +='  </table>'
                          

                        u +='        </td>'
						
						
						
						if(Main.WhereAmIData.reservestatus == 'delivery') {
                             u +='<td valign="top">'
                             u +='<a href="javascript:void(0)" ><p style="float:left; " onclick="Shopping.OpenBusiness('+ s[x].id + ')"><button type="button" class=" view_menu_btn"><img src="images/step2-business-listing/menu-icon.png" class="pull_left"> <div style="float:left; margin-left:5px" ><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></div></button></p></a>'
							 u +='<a href="javascript:void(0)" ><p class=" pull_left"><button type="button" class="preorder-btn pull_left" style="margin-top:-15px"  onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button></p></a>";
                        	 u +='</td>'
						}
						else if(Main.WhereAmIData.reservestatus == 'pickup') {
                             u +='<td valign="top">'
                             u +='<a href="javascript:void(0)" ><p style="float:left; " onclick="Shopping.OpenBusiness('+ s[x].id + ')"><button type="button" class=" view_menu_btn"><img src="images/step2-business-listing/menu-icon.png" class="pull_left"> <div style="float:left; margin-left:5px" ><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></div></button></p></a>'
							 u +='<a href="javascript:void(0)" ><p class=" pull_left"><button type="button" class="preorder-btn pull_left" style="margin-top:-15px"   onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button></p></a>";
                        	 u +='</td>'
						}
						else if(Main.WhereAmIData.reservestatus == 'reservation') {
                             u +='<td valign="top">'
							 if(s[x].catalog != 0 && (s[x].DeliveryStatus == "true" || s[x].PickupStatus == "true" )) {
                             u +='<a href="javascript:void(0)" ><p  style="margin-top:-10px;" onclick="Shopping.OpenBusiness('+ s[x].id + ')"><button type="button" class=" view_menu_btn" style="width: 175px;padding: 5px 10px;float: left;"><img src="images/step2-business-listing/menu-icon.png" style="margin-top: 10px;" class="pull_left"> <div style=" margin-left:5px" ><?= $lang_resource['BUSINESS_LIST_OPTIONS_ORDERANDRESERVE'] ?></div></button></p></a>'
							 }
							 u +='<a href="javascript:void(0)" ><p class=" pull_left"><button type="button" style="width: 175px; padding: 6px 10px;float: left;" class="preorder-btn pull_left" onclick="Shopping.OpenBusiness('+ s[x].id + ',false,true,true)\"><?= $lang_resource['BUSINESS_LIST_OPTIONS_RESERVE_NOW'] ?></button></p></a>';
                        	 u +='</td>'
						} else {
							 u +='<td valign="top">'
                             u +='<a href="javascript:void(0)" ><p style="float:left; " onclick="Shopping.OpenBusiness('+ s[x].id + ')"><button type="button" class=" view_menu_btn"><img src="images/step2-business-listing/menu-icon.png" class="pull_left"> <div style="float:left; margin-left:5px" ><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></div></button></p></a>'
							 u +='<a href="javascript:void(0)" ><p class=" pull_left"><button type="button" class="preorder-btn pull_left" style="margin-top:-15px" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button></p></a>";
                        	 u +='</td>'
							
							
							}
						
						
						
                        u +='      </tr>'
                        u +=' </table>'
                            

                       u +=' </div>'
					   
			   return u;
			},	*/	
		CloseBusinessHtml : function(s,rvw,D,rating) {	
			var u =' <div class="restaurant_dv" id="'+s[x].id+'_show" >'
                        	u +='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
                            u +='  <tr>'
                               u +=' <td width="26%" valign="top"  >'
							    if(s[x].feature == "t") {
                                	u +='<div class="featured"><span><?=$lang_resource['BLIST_FEATURED']?></span></div>'
							          }
                                	u +='<div class="rest-logo">'
                                    u +='<img src="'+D+'">'
                                    u +='</div>'
                               u +=' </td>'
                            u +='<td valign="top" width="45%">'
                                	u +='<div class="pull_left">'
                                	u +='<h4 class="rest-name pull_left" >'+ Main.TitleCase(s[x].name) +'</h4>'
                                    u +='<div class="review">'
                                    	u +='<ul class="review-star">'
										u += rvw;
                                       u +=' </ul>'
                                     u +='   <span class="rating">'+rating+'</span>'
                                   u +=' </div>'
                                   u +=' </div>'
                                  u +='  <table width="100%" border="0" cellspacing="0" cellpadding="0" class=" rest-desc">'
								  
								  var paylistc = JSON.parse(s[x].paymentdetails);
								   var count2 = 0;
								  for(var n in paylistc){
									
									 if(paylistc[n] == 't'){
										
										 if(n == 'cash' || n == 'card' || n == 'paypal'){
											count2++;
											if(count2 > 0 && count2 == 1){
												  u +='<tr valign="top">'
												  u +='<td width="35%"><?= $lang_resource['BUSINESS_LIST_OPTIONS_PAYMENT'] ?></td>'
												  u +='<td width="4%">:</td>'
												  u +='<td>'
											
											}
										
									    u +='<span class="pull_left" style="margin-right:3px"><img src="images/step2-business-listing/paymethod/'+n+'.png"></span>'
										}
									}
									}
								  if( count2 > 0){
								   u +='</td>'
                                  u +=' </tr>'
								  }
								  
                                   u +='   <tr>'
                                   u +='    <td width="25%"><?= $lang_resource['DISTANCE'] ?></td>'
                                    u +='    <td width="4%">:</td>'
									 //Settings to select miles or km 
									 distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_KM'] ?>";
									if(s[x].distanceformat=='N'){
										distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_MILES'] ?>";
										
									}
                                     u +='     <td>'+s[x].distance.toFixed(2)+' '+distanceformat+'</td>'
                                   u +='   </tr>'
                                   u +='   <tr>'
                                    u +='    <td width="25%"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?></td>'
                                   u +='     <td width="4%">:</td>'
                                    u +='     <td>'+s[x].categoryshow+'</td>'
                                    u +='  </tr>'
												
							if(s[0].searchtype!="citysearch" && s[0].searchtype!="pickup"  && s[0].searchtype!="categorysearch" ) {	
								if (s[x].shipping == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
									var dollarimge = "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>";
								}else{
									var dollarimge = "<span class='shipping-cost-feer'>"+s[x].shipping+"</span>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>";
								}					
                                  u +='   <tr>'
                                  u +='    <td width="25%">'+delcos+'</td>'
                                  u +='      <td width="4%">:</td>'
                                  u +='       <td>'+dollarimge+'</td>'
                                  u +='     </tr>'
							}
                                 if(s[x].promotion) {
								   u +='   <tr>'
                                   u +='    <td width="25%"><?= $lang_resource['BUSINESS_LIST_OPTIONS_PROMOTION'] ?></td>'
                                   u +='     <td width="4%">:</td>'
                                   u +='       <td>'+s[x].promotion +'</td>'
                                   u +='  </tr>'
								 }
                                   u +='  </table>'
							
                               

                        u +='        </td>'
                             u +='   <td valign="top">'
                           
                            u +='<a href="javascript:void(0)" class="tooltip red-tooltip"><p style="float:left; ><button type="button" class=" closed-btn"><?=$lang_resource['PAYMENT_GATEWAY_CLOSED'];?></button></p><span><div class="pull_left" style="margin-right:10px; margin-top:10px;font-weight:bold"><img src="images/step2-business-listing/closed-icon.png"></div><ul class="timing-li" style="margin-top:5px; float:left;"><li><?= $lang_resource['BUSINESS_LIST_OPTIONS_WE_WILL_OPEN_AT'] ?></li><li>'+s[x].willopen+' </li></ul></span></a>'
							  u +='<p style="margin-top:-9px;" class=" pull_left"><button type="button" class="preorder-btn pull_left" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button></p>";
                           u +='</td>'
                        u +='</tr>'
                           u +='</table>'
                            

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
	

	
};