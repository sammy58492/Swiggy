var Blist = {
	PopulateBusinessList: function (E, A,fivekm,fav,opncls)
    {

		var mm = JSON.stringify(Main.WidgetSettings);
		var ee = JSON.parse(mm);	
		
	
		if(ee.site_settings.skip_business_listing == "t"){
		Shopping.ActiveBusiness = Shopping.Business[0].id;	
			
		}
		
		if( Shopping.ActiveBusiness) {

			  Shopping.OpenBusiness(Shopping.ActiveBusiness,true);
			  return false;
		} 
		
			$("#clock_loading").hide();
			
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
		
		
	
		var el = "";
			
			$(".bsrch").html('');
			$("#headerSearch").append(el);
		
			
			$(function() {
				if(document.getElementById("rdate1"))
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

	 
		//u += Blist.bussinessListSearchHtml();
							 
		  console.log(JSON.stringify(s))
		  
		u +='<div class="wrapper" id="businessresultsinner">';  
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
					if(document.getElementById("businessloading")){
						$("#businessloading").show();
					}
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
	  u +=Blist.OpenBusinessHtml(s,rvw,D,rating)
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
		
		/*u +='<div style="width:60%; float: right; margin-top: 15px;">'
		 u +='<div style="width:94%; float: left;">'
		 if(offset >0){
		 u += '<input  type="button" class="prevnext" value="Previous" onclick="Shopping.Previousresult()">';
		 }
		 u +='</div>'	
		 u +='<div style="width:6%; float: right;">'
		  if(limit < Main.numrow){ 
		 u += '<input  type="button" class="prevnext" value="Next" onclick="Shopping.Nextresult()">';
		  }
		 u +='</div>'	
		 u +='</div>'*/
        u += "<div>";
		
		
        document.getElementById("businessresults").innerHTML = u;
		
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
         });
		
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
	
	
	NoResturant: function(){
			
			
			
			var N='';
			<!-- Modal -->
			N +='<div class="modal" id="modal-one">'
			N +='<div class="modal-dialog">'
			N +='<div class="modal-box">'
			N +='<div class="modal-header"><?=$lang_resource['BUSINESS_ALERT_POPUP_TITLE']?></div>'
			N +='<div class="modal-body">'
			N +='<div class="chain"></div>'
			N +='<div class="hungbox">'
			N +='<button type="button"><?=$lang_resource['BUSINESS_ALERT_POPUP_OPEN']?></button>'
			N +='</div>'
			N +='<p><?=$lang_resource['BUSINESS_ALERT_POPUP_SUGGESTIONS']?></p>'
			N +='<button type="button" class="btnl" onclick="Shopping.suggesturl()"><?=$lang_resource['BUSINESS_ALERT_POPUP_SUGGEST']?></button>'
			N +='<button type="button" class="btnr" onclick="Shopping.contacturl()"><?=$lang_resource['BUSINESS_ALERT_POPUP_CONTACT']?></button>'
			N +='</div>'
			N +='</div>'
			N +='</div>'
			N +='</div>'
			N +='</div>'
			//alert(N)
			
			<!-- /Modal -->
			$("body").append(N)
			
		},
	
	
	CatagoriesFetch: function(){	
	  var e = "";	
	    e +='<div class="pull_left left-sidebar" style="display:none;">'
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
		
		 /*var sch='<div class="map-pannel" >'
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
     sch +='</div>'*/
var sch='';
 sch +='<div class="inner_serach" id="src_bx">'
               sch +='<span class="pull_left"><input type="hidden" class="field_text search_input" id="businesssearch" placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>"></span>'

  sch +='</div>'
	return sch;
		
		
		
	},
	ShoppingHeaderDesignNavigationHtml: function(){
			/*var shs ='<div class="topdivider" id="abcd">'
			shs +='</div>'
		 	shs += '<div class="nav" id="progressbarpart">'
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
           shs += '</div>'*/
		   var shs ='';
		   shs += '<div id="showcanvas" class="inner-map" style="display:none;"></div>'
		
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
			var u  ='<div class="select-rest" style="display:none;">'
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
		 u +='<div style="width:60%; float: right;">'
		 u +='<div style="width:94%; float: left;">'
		 if(offset >0){
		 u += '<input  type="button" class="prevnext" value="Previous" onclick="Shopping.Previousresult()">';
		 }
		 u +='</div>'	
		 u +='<div style="width:6%; float: right;">'
		 //alert(offset)
		 if(limit < Main.numrow){ 
		 u += '<input  type="button" class="prevnext" value="Next" onclick="Shopping.Nextresult()">';
		 }
		 u +='</div>'	
		 u +='</div>'
			return u;
			},		
		OpenBusinessHtml : function(s,rvw,D,rating) {
			
			var u ='<div class="restaurant_dv" id="'+s[x].id+'_show">'
			u +='<div class="row">'                
			u +='<div class="col-md-1">'
			u +='<div class="rest_logo" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">"
			u +='<a href="javascript:void(0)"><img src="'+D+'"></a>'
			u +='</div>'<!--rest_logo-->
			u +='</div>'<!--col-md-1-->             
			u +='<div class="col-md-3">'
			u +='<div class="rest_dsp">'
			u +='<h3 onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">"+ Main.TitleCase(s[x].name) +'</h3>'
			u +='<p>'+s[x].street+'</p>'
			u +='<div class="reating_dv">'
			u +='<ul class="pull-left">'
			u += rvw;
			u +='</ul>'
			u +='<div class="reating_text">'+rating+'</div>'
			u +='</div>'<!--reating_dv-->
			u +='</div>'<!--rest_dsp-->
			u +='</div>'<!--col-md-3-->
			u +='<div class="col-md-5">'
			u +='<div class="rest_other_dsp">'
			u +='<ul class="payment-time">'
			u +='<li>'
			var paylist = JSON.parse(s[x].paymentdetails);
			var count = 0;
			for(var m in paylist){
			
			if(paylist[m] == 't'){
			
			if(m == 'cash' || m == 'card' || m == 'paypal'){
			count++;
			if(count > 0 && count == 1){
			u +='<span class=""><?= $lang_resource['FOOTER_WE_ACCEPT'] ?>: </span>'
			u +='<ul>'
			u +='<li>'
			}
			//	GoogleMap.payment1 ='<img src="images/step2-business-listing/paymethod/'+m+'.png">';
			u +='<a href="javascript:void(0)"><img src="images/step2-business-listing/paymethod/'+m+'.png"></a>'
			}
			}
			}
			if( count > 0){
			u +='</li>'
			u +=' </ul>'
			}
			
			u +='</li>'
			opentime=new Array();
				closetime=new Array();
				opentime1='';
				closetime1='';
				time_format="<?=$lang_resource['TIME_FORMAT']?>";
				if(time_format=="12"){  
				opentime1=Main.zeroPad(s[x].opentime,2);
				closetime1=Main.zeroPad(s[x].closetime,2);
				}else{
				opentime1=Main.convertTo24Hour(s[x].opentime);
				closetime1=Main.convertTo24Hour(s[x].closetime);
				
				
				}
			u +='<li><span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/time-icon.png"></span> <?= $lang_resource['MENULIST_OPENING_TIME'] ?> : '+opentime1+' - '+closetime1+'</li>'			
			 /*if(Main.businessSetting.businesspageheadersetting !="1"){
			if(Main.User) {
			 u +='<li><a href="javascript:void(0)" onclick="Shopping.AddToFav(' + s[x].id + ',' + s[x].name + ')">'
			 u +='<span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/favourite-icon.png"></span><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?>'
			u +='</a></li>'
			}else{
				
			 u +='<li><a href="javascript:void(0)" onclick="Main.Favlogin()"><span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/favourite-icon.png"></span><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></a></li>'	
			}
			 }*/

			
			
			u +='</ul>'
			u +='</div>'<!--rest_other_dsp-->
			u +='</div>'<!--col-md-5-->
			u +='<div class="col-md-3">'
			u +='<div class="listing_btn_dv">'                        
			u +='<button type="button" class="btn btn-red-small order_nowbtn"  onclick="Shopping.OpenBusiness('+ s[x].id + ')"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
			u +='<button type="button" class="btn btn-yellow-small"  onclick="Main.PreOrderMenuCatalogFetch('+ s[x].id + ')"><?= $lang_resource['SHOPPING_PREORDER'] ?></button>'
			u +='</div>'<!--listing_btn_dv-->
			u +='</div>'<!--col-md-3-->
			u +='</div>'<!--row-->
			u +='</div>'
					   
			   return u;
			},		
		CloseBusinessHtml : function(s,rvw,D,rating) {	
					var u ='<div class="restaurant_dv" id="'+s[x].id+'_show">'
					u +='<div class="row">'                
					u +='<div class="col-md-1">'
					u +='<div class="rest_logo" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">"
					u +='<a href="javascript:void(0)"><img src="'+D+'"></a>'
					u +='</div>'<!--rest_logo-->
					u +='</div>'<!--col-md-1-->             
					u +='<div class="col-md-3">'
					u +='<div class="rest_dsp">'
					u +='<h3 onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">"+ Main.TitleCase(s[x].name) +'</h3>'
					u +='<p>'+s[x].street+'</p>'
					u +='<div class="reating_dv">'
					u +='<ul class="pull-left">'
					u += rvw;
					u +='</ul>'
					u +='<div class="reating_text">'+rating+'</div>'
					u +='</div>'<!--reating_dv-->
					u +='</div>'<!--rest_dsp-->
					u +='</div>'<!--col-md-3-->
					u +='<div class="col-md-5">'
					u +='<div class="rest_other_dsp">'
					u +='<ul class="payment-time">'
					u +='<li>'
					var paylist = JSON.parse(s[x].paymentdetails);
					var count = 0;
					for(var m in paylist){
					
					if(paylist[m] == 't'){
					
					if(m == 'cash' || m == 'card' || m == 'paypal'){
					count++;
					if(count > 0 && count == 1){
					u +='<span class=""><?= $lang_resource['FOOTER_WE_ACCEPT'] ?>: </span>'
					u +='<ul>'
					u +='<li>'
					}
					//	GoogleMap.payment1 ='<img src="images/step2-business-listing/paymethod/'+m+'.png">';
					u +='<a href="javascript:void(0)"><img src="images/step2-business-listing/paymethod/'+m+'.png"></a>'
					}
					}
					}
					if( count > 0){
					u +='</li>'
					u +=' </ul>'
					}
					
					u +='</li>'
					opentime=new Array();
					closetime=new Array();
					opentime1='';
					closetime1='';
					time_format="<?=$lang_resource['TIME_FORMAT']?>";
					if(time_format=="12"){  
					opentime1=Main.zeroPad(s[x].opentime,2);
					closetime1=Main.zeroPad(s[x].closetime,2);
					}else{
					opentime1=Main.convertTo24Hour(s[x].opentime);
					closetime1=Main.convertTo24Hour(s[x].closetime);
					
					
					}
					
					u +='<li><span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/time-icon.png"></span> <?= $lang_resource['MENULIST_OPENING_TIME'] ?> : '+opentime1+' - '+closetime1+'</li>'
					/*if(Main.businessSetting.businesspageheadersetting !="1"){
					if(Main.User) {
					 u +='<li><a href="javascript:void(0)" onclick="Shopping.AddToFav(' + s[x].id + ',' + s[x].name + ')">'
			 u +='<span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/favourite-icon.png"></span><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?>'
			u +='</a></li>'
					}else{
						
					 u +='<li><a href="javascript:void(0)" onclick="Main.Favlogin()"><span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/favourite-icon.png"></span><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></a></li>'	
					}
					}*/
					u +='</ul>'
					u +='</div>'<!--rest_other_dsp-->
					u +='</div>'<!--col-md-5-->
					u +='<div class="col-md-3">'
					u +='<div class="listing_btn_dv">'    
					//u +='<button type="button" class="btn btn-red-small order_nowbtn"><?= $lang_resource['PAYMENT_GATEWAY_CLOSED'] ?></button>'                   
					u +='<a href="javascript:void(0)" class="atooltip"><button type="button" class="btn btn-gray-small order_nowbtn"><?= $lang_resource['PAYMENT_GATEWAY_CLOSED'] ?></button><span><div class="pull_left" style="margin-right:10px; margin-top:10px;font-weight:bold"><img src="images/step2-business-listing/closed-icon.png"></div><ul class="timing-li" style="margin-top:5px; float:left;"><li><?= $lang_resource['BUSINESS_LIST_OPTIONS_WE_WILL_OPEN_AT'] ?></li><li>'+s[x].willopen+' </li></ul></span></a>'
					u +='<button type="button" class="btn btn-yellow-small"  onclick="Main.PreOrderMenuCatalogFetch('+ s[x].id + ')"><?= $lang_resource['SHOPPING_PREORDER'] ?></button>'
					u +='</div>'<!--listing_btn_dv-->
					u +='</div>'<!--col-md-3-->
					u +='</div>'<!--row-->
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