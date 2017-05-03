var Blist = {
	PopulateBusinessList: function (E, A,fivekm,fav,opncls){
		$("body").addClass("grey_body")
		$("header").addClass("inner_header")
		if( Shopping.ActiveBusiness){
			Shopping.OpenBusiness(Shopping.ActiveBusiness,true);
			return false;
		} 
		Main.stepBack  = 2;
		var s = new Array();
		s = Shopping.GetBusinessLogicaly(E,A,fivekm,fav,opncls);
		
		$("#businessresults").removeClass("hand")
		for (var z in Shopping.Categories){
			var fid = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", Shopping.Categories[z].id);
			var Allidsrecords = Shopping.Categories[fid].ids.split(",");
			if(document.getElementById("business_category_switch_"+Shopping.Categories[z].id).checked == true){
				for(var tk in Allidsrecords){
					if(Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]) != -1){
						var fn = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]);
						Shopping.CategoriesCustom[fn].enabled = true;
					}
				}
			}else{
				for(var tk in Allidsrecords){
					if(Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecords[tk]) != -1){
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
		if(document.getElementById("rdate1")){
		$(function() {
			
			$('#rdate1').datepick({ minDate: 0});
		});
		}

		if (s.length == "0"){
			u += Blist.bussinessListSearchHtml();
			u +='<div>&nbsp;</div>'
			u += '<div class="no-restaurants" style="margin-top: 50px;">'
			u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>"
			u += "</div>"
			document.getElementById("businessresults").innerHTML = u
			if(fivekm){
				document.getElementById("expressi").checked= true;
			}
			return
		}

		if(Main.NullToEmpty(Main.searchType) != "Global"){
			if(s[0].searchtype=="citysearch" || s[0].searchtype=="pickup" ){}
		}


		u += Blist.bussinessListSearchHtml();

		u +='<div class="right-restaurant" id="businessresultsinner">';  
		var counterlistbusiness = 0;
		var restaurant = Main.settingfront.restaurant.split(",");
		restaurant = JSON.parse(restaurant)

		var businesscount = 0;
		for (x in s){
				
			if( $.inArray(s[x].id, restaurant ) != -1 || $.inArray("-1", restaurant ) != -1){
				businesscount++	
			}
			
			if ((s[x].open  && s[x].menulist == 1 && (s[x].catalog != 0) || s[x].csvupload != true || Main.WhereAmIData.reservation == true)){
				if((Main.settingfront.list_step == 'f' && counterlistbusiness == 0) || (restaurant.length == 1 && $.inArray(s[x].id, restaurant )!= -1 && counterlistbusiness == 0)  ){
					if(document.getElementById("businessloading")){
						$("#businessloading").show();
					}
					Shopping.OpenBusiness(s[x].id)
					counterlistbusiness ++;
				}

				if (s[x].review != ""){
					var url = location.href.split('/');
					Shopping.Review = s[x].review;
					Shopping.Review.url = url[2];
					if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
						var roundTotal = Math.round(Shopping.Review.total);
						var starsReview = "";
						var i = 1;
						for(i=1;i<=5;i++){
							if(roundTotal>=1){
								starsReview +='<li><img src="images/step2-business-listing/star-yellow.png"></li>'
								roundTotal=roundTotal-1;
							}else if(roundTotal<=0){ 
								starsReview +='<li><img src="images/step2-business-listing/star-grey.png"></li>'
							}
						}
					}
					if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
						rvw = starsReview ;
						var rating = Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>';
					}else{
						rvw = "";
					}
				}
				var isAcceptingCard = s[x].acceptcard == "t";
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					isAcceptingCard = s[x].acceptcard == "t" || s[x].paypal;

				if (isAcceptingCard){
					w = '<span class="acceptcard"></span>'
				}else{
					w = ""
				} 
				if(s[x].isimg==1){
					D ='panel/images/business/' + Main.NullToEmpty(s[x].id) + '/medium.jpg?c=' + Main.Random ;
				}else if(s[x].isimg==0){
					D = 'panel/images/dummy/medium_business.jpg';
				}

				if (rvw == ""){
					rvw = ' <a href="/'+s[x].name+'" class="rvw_txt"><?= $lang_resource['SHOPPING_THIRD_SEE_COMMENTSs'] ?></a>';
				}
		
			
				if($.inArray('-1', restaurant ) != -1 || $.inArray(s[x].id, restaurant ) != -1){

					/**Business list Box Design part(Open Business)**/
					u +=Blist.OpenBusinessHtml(s,rvw,D,rating)
					/**Business list Box Design part(Open Business)**/
					rvw = "";
				}
			}else if(s[x].catalog==0) {	

			}else{
				if((Main.settingfront.list_step == 'f' && counterlistbusiness == 0) || (restaurant.length == 1 && $.inArray(s[x].id, restaurant ) != -1 && counterlistbusiness == 0)  ){
					Main.PreOrderMenuCatalogFetch(s[x].id )
					counterlistbusiness ++;
				}

				if (s[x].review != ""){
					var url = location.href.split('/');
					Shopping.Review = s[x].review;
					Shopping.Review.url = url[2];
					if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
						var roundTotal = Math.round(Shopping.Review.total);
						var starsReview = "";
						var i = 1;
						for(i=1;i<=5;i++){
							if(roundTotal>=1){
								starsReview +='<li><a href="javascript:void(0)"><img src="images/step2-business-listing/star-yellow.png"></a></li>'
								roundTotal=roundTotal-1;
							}else if(roundTotal<=0){    
								starsReview +='<li><a href="javascript:void(0)"><img src="images/step2-business-listing/star-grey.png"></a></li>'
							}
						}
					}
					if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
						rvw = starsReview ;
						var rating = Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>';
					}else{
						rvw = "";
					}
				}

				if(s[x].menulist == 1){
					var isAcceptingCard = s[x].acceptcard == "t";
					if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
						isAcceptingCard = s[x].acceptcard == "t" || s[x].paypal;

					if (isAcceptingCard){
						w = '<span class="acceptcardclosed"></span>'
					}else{
						w = ""
					}
					if(s[x].isimg==1){
						D ='panel/images/business/' + Main.NullToEmpty(s[x].id) + '/medium.jpg?c=' + Main.Random ;
					}else if(s[x].isimg==0){
						D = 'panel/images/dummy/medium_business.jpg';
					}

					if($.inArray('-1', restaurant ) != -1 || $.inArray(s[x].id, restaurant ) != -1){
							
						/**Business list Box Design part(Close Business)**/	
						u +=Blist.CloseBusinessHtml(s,rvw,D,rating)
						/**Business list Box Design part(Close Business)**/	
					}
				}
			}

			if (r == "1"){
				r = "2"
			}else{
				r = "1"
			}
		}

		if (s.length == 0){
			u += '<div class="no-restaurants">';
			u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>";
			u += "</div>"
		}
		if(Main.businesslist_pagination==1){
			u +='<div style="width:100%; float: right; margin-top: 15px;">'
			u +='<div style="float: left;">'
			if(offset >0){
				u += '<input  type="button" class="prevnext" value="Previous" onclick="Shopping.Previousresult()">';
			}
			u +='</div>'	
			u +='<div style="float: right;">'

			var p0= offset + 10 
			if(p0 < Main.numrow){ 
				u += '<input  type="button" class="prevnext" value="Next" onclick="Shopping.Nextresult()">';
			}
			u +='</div>'	
			u +='</div>'
		}
		u += "<div>";


		document.getElementById("businessresults").innerHTML = u;

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

		if(Shopping.Business){
		$(document).ready(function() { initialize(); });
		}

		if(s[0].searchtype=="delivery" || s[0].searchtype=='categorysearch') {
			document.getElementById("showcanvas").style.display="none";
			document.getElementById("showcheck").innerHTML ="<?=$lang_resource['DESKTOP_BUSINESS_SHOW_MAP'];?>"
		}
		if(Shopping.ActiveCategory) {
			Blist.GoogleMapshowhide()
		}
	},
	
	
	NoResturant: function(){
		var N='';

		N +='<div class="modal-header">'
		N +='<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="Shopping.homeurl();"><span aria-hidden="true">&times;</span></button>'
		N +='<h4 class="modal-title" id="myModalLabel"><?=$lang_resource['BUSINESS_ALERT_POPUP_TITLE']?></h4>'
		N +='</div>'

		N +='<div class="modal-body">'


		N +='<div class="row">'

		N +='<div class="col-md-4 col-md-offset-4">'
		N +='<div class="open_dv"><?=$lang_resource['BUSINESS_ALERT_POPUP_OPEN']?></div>'<!--open_dv-->
		N +='</div>'<!--col-md-3-->
		N +='</div>'<!--row-->



		N +='</div>'<!--modal-body-->

		N +='<div class="pop-message-dv"><?=$lang_resource['BUSINESS_ALERT_POPUP_SUGGESTIONS']?></div>'<!--pop-message-dv-->

		N +='<div class="modal-footer">'
		N +='<button type="button" class="popup_btn" onclick="Shopping.suggesturl()"><?=$lang_resource['BUSINESS_ALERT_POPUP_SUGGEST']?></button>'
		N +='<button type="button" class="popup_btn" onclick="Shopping.contacturl()"><?=$lang_resource['BUSINESS_ALERT_POPUP_CONTACT']?></button>'

		N +='</div>'

		Popup.Show(N)
				
	},
	GoogleMapshowhide: function(){
    	if(document.getElementById("showcanvas").style.display == "none"){
			if(viewDevice == "Desktop"){
				document.getElementById("showcheck").innerHTML ="<?=$lang_resource['DESKTOP_BUSINESS_HIDE_MAP'];?>"
			}
			document.getElementById("showcanvas").style.display ="";
			$(document).ready(function() { initialize(); });
		}else{
			if(viewDevice == "Desktop"){
				document.getElementById("showcheck").innerHTML ="<?=$lang_resource['DESKTOP_BUSINESS_SHOW_MAP'];?>"
			}
			document.getElementById("showcanvas").style.display ="none";			
		}
    },
	
	
	CatagoriesFetch: function(){	
		var e = "";	
		e +='<div class="container">'
		e +='<div class="listing_top">'
		e +='<div class="row">'
		e +='<div class="col-md-2">'
		e +='<div class="field_dv">'
		e +='<label><?=$lang_resource['BUSINESS_LIST_CATEGORY_HEADING']?></label>'
		e +='<input  type="hidden" id="business_category_all" name="checkbox" checked="checked"  value="2" style=""  class="checkbox_2" checked="checked"><label for="business_category_all"></label>';
		e +='<div id="categoriesbox" style="display:none"></div>'
		e +='<select class="form-control rounded_corner_4" onchange="Blist.changecatclass(this)">'
		e +='<option id="business_category_all" selected="selected" value="-1"><?=$lang_resource['BUSINESS_LIST_CATEGORY_SELECT_ALL']?></option>'		
		
		for (var d in Shopping.Categories){	
			var dyc = 'business_category_switch_' + Shopping.Categories[d].id;
		 
			e +='<option value="'+Shopping.Categories[d].id+'" id="business_category_switch_' + Shopping.Categories[d].id + '">'+ Shopping.Categories[d].name +'</option>'

		 }
		e +='</select>'

		e +='</div>'<!--field_dv-->
		e +='</div>'<!--col-md-2-->

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
		distanceformatKM="<?= $lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS'] ?>";
		if(Shopping.Business[0].distanceformat=='N'){
			distanceformatKM="<?= $lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS1'] ?>";
		}
		
		if(Main.User){
			e +='<div class="col-md-2 col-md-offset-2">'
			e +='<div class="field_dv">'
			e +='<div class="checkbox exp_5">'
			e +='<input type="checkbox" name="favorite" id="favorite" onclick="Shopping.FavList()">' 
			e +='<label for="favorite"><?= $lang_resource['BUSINESS_LIST_OPTIONS_FAVORITES'] ?></label>'
			e +='</div>'
			e +='</div>'<!--field_dv-->
			e +='</div>'<!--col-md-2-->
			e +='<div class="col-md-2 col-md-offset-1">'
		}else{
			e += '<input id="favorite" type="hidden" value="">'; 
			e +='<div class="col-md-2 col-md-offset-5">'
		}
		

		
		e +='<div class="field_dv">'
		e +='<div class="checkbox exp_5">'
		e +='<input type="checkbox" name="1" id="expressi" onclick="Main.express5Km()">' 
		e +='<label for="expressi">'+distanceformatKM+'</label>'
		e +='</div>'
		e +='</div>'<!--field_dv-->
		e +='</div>'<!--col-md-2-->

		e +='<div class="col-md-3">'
		e +='<div class="opened-closed">'
		e +='<select class="form-control rounded_corner_4" id="bopenClose" onchange="Shopping.openCloseShop(this)">'
		e +='<option value="openAll" '+ap+'><?= $lang_resource['BUSINESS_LIST_OPTIONS_RESTAURANT'] ?></option>'
		e +='<option value="openi" '+op+'><?=$lang_resource['OPENEDRESTAURANTS']?></option>'
		e +='<option value="closei" '+cp+'><?=$lang_resource['CLOSEDRESTAURANTS']?></option>'
		e +='</select>'
		e +='</div>'<!--opened-closed-->
		e +='</div>'<!--col-md-3-->

		e +='</div>'<!--row-->
		e +='</div>'<!--listing_top-->	

		e +='<div class="border_box" id="businessresults">'
	

		e +='</div>'<!--border_box-->
		e +='</div>'
		e += '<div id="shoplistadscontainer"></div>'

		
		return e;
	},
	changecatclass: function(frm) {
		var b=frm.value;
		var Checkall = false;
		for (var z in Shopping.Categories){
			if ( b == "-1") {
				document.getElementById("business_category_all").checked = true;
				var a = "business_category_switch_"+ Shopping.Categories[z].id;
				for(var tp in Shopping.CategoriesCustom) {
					Shopping.CategoriesCustom[tp].enabled = true;
				}
				Shopping.Categories[z].enabled = true;
				document.getElementById(a).checked = true;
				Checkall = true;
			}else{
				document.getElementById("business_category_all").checked = false;
				for (var xy in Shopping.CategoriesCustom){
					var arr = Shopping.CategoriesCustom[xy].id;			
					if(arr.indexOf(b)!=-1){	
						Shopping.CategoriesCustom[xy].enabled = true;
					}else{
						Shopping.CategoriesCustom[xy].enabled = false;
					}
				}
				Checkall = false;
			}
		}

		if(Checkall){
			Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
		}else{
			Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, false)
		}
	},
	CatagoriesFetchItem: function(){
		e = "";		
		e +='<option id="business_category_all" onselect="Main.checkall()"><?=$lang_resource['SHOPPING_CATEGORIES_SHOW_ALL'] ?></option>'

		for (var d in Shopping.Categories){	
		var dyc = 'business_category_switch_' + Shopping.Categories[d].id;
		e +='<option id="business_category_switch_' + Shopping.Categories[d].id + '"  onselect="Shopping.checkBoxtick(\'' + dyc + '\')"><?=$lang_resource['SHOPPING_CATEGORIES_SHOW_ALL'] ?></option>'

		/*e +='<li>'
		e +='<div class="" ><input  type="checkbox" id="business_category_switch_' + Shopping.Categories[d].id + '" name="checkbox"  value="2" style=""  class="checkbox_2" onclick="Shopping.checkBoxtick(\'' + dyc + '\')"><label for="business_category_switch_' + Shopping.Categories[d].id + '" >&nbsp;</label></div><div class="checkboxtextdp" onclick="Shopping.checkBoxtick(\'' + dyc + '\')">'+ Shopping.Categories[d].name +'</div></div>';
		e +='</li>'*/

		}
		return e;
	},
	
	
	
	ShoppingHeaderBusinessSearchHtml: function(){
		
		var sch=''
		sch +='<div class="listing_searchbar">'
		sch +='<div class="container">'
		sch +='<div class="row">'
		sch +='<div class="col-md-2">'
		sch +='<div class="field_dv" id="src_bxNew">'

		if(Main.WhereAmIData.reservestatus == 'delivery')
		var std = 'selected="selected"'
		if(Main.WhereAmIData.reservestatus == 'pickup')
		var stp = 'selected="selected"'
		if(Main.WhereAmIData.reservestatus == 'reservation')
		var str = 'selected="selected"'

		sch +='<select class="form-control rounded_corner_4"  id="doption" onchange="Main.Changetype()">'
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

		sch +='</select>'
		sch +='</div>'<!--field_dv-->
		sch +='</div>'<!--col-md-3-->
		sch +='<div class="col-md-6">'
		sch +='<div class="field_dv" id="src_bx">'
		sch +='<input type="text" class="form-control listing_searcfield" id="businesssearch"  placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>">'
		sch +='</div>'<!--field_dv-->
		sch +='</div>'<!--col-md-3-->
		sch +='<div class="col-md-2 col-md-offset-2">'
		sch +='<button type="button" class="map_show_btn"  onclick="Blist.GoogleMapshowhide()" id="showcheck"><?= $lang_resource['SHOPPING_HIDE_MAP'] ?></button>'

		sch +='</div>'<!--col-md-3-->
		sch +='</div>'<!--row-->
		sch +='</div>'<!--container-->
		sch +='</div>'<!--listing_searchbar-->
		//sch +='<div class="map_dv toggle_map_dv" id="showcanvas"></div>'<!--map_dv-->
		sch += '<div id="showcanvas" class="inner-map map_dv toggle_map_dv" ></div>'






		return sch;
		
		
		
	},
	ShoppingHeaderDesignNavigationHtml: function(){
		var shs ='<div class="topdivider" id="abcd" style="display:none;">'
		shs +='</div>'
		shs += '<div class="nav" id="progressbarpart" style="display:none;">'
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
		//shs += '<div id="showcanvas" class="inner-map" ></div>'

		return shs;
		
	},	
	bussinessListSearchHtml: function(){
		var u =''
		u +='<h3><?= $lang_resource['Select_Restaurant_V2'] ?></h3>'
		return u;
	},		


	OpenBusinessHtml: function(s,rvw,D,rating) {
		var u=''
		u +='<div class="restaurant_dv clearfix" id="'+s[x].id+'_show">'
		u +='<div class="row">'
		u +='<div class="col-md-1">'
		if(s[x].feature == "t") {
		u +='<div class="featured"><span><?=$lang_resource['BLIST_FEATURED']?></span></div>'
		}
		u +='<div class="rest-logo"><a href="javascript:Shopping.OpenBusiness(\'' + s[x].id + "')\">"
		u +='<img src="'+D+'"></a></div>'
		u +='</div>'<!--col-md-1-->
		u +='<div class="col-md-2">'
		u +='<h3 class="rest-name" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">"+ Main.TitleCase(s[x].name) +'</h3>'
		u +='</div>'<!--col-md-2-->
		u +='<div class="col-md-2">'
		u +='<p><?=$lang_resource['BUSINESS_LIST_PAYMENT']?>: <span>'
		var paylist = JSON.parse(s[x].paymentdetails);
		var count = 0;
		for(var m in paylist){
			if(paylist[m] == 't'){
				if(m == 'cash'){
					u +='&nbsp;<img src="panel/<?=$moduleName?>/images/pay-1.png">'
				}
				if(m == 'card'){
					u +='&nbsp; <img src="panel/<?=$moduleName?>/images/pay-2.png">'
				}
			}
		}		
		u +='</span></p>'
		distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_KM'] ?>"
		if(s[x].distanceformat=='N'){
			distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_MILES'] ?>"
		}	
		u +='<p><?= $lang_resource['DISTANCE'] ?>: <span>'+s[x].distance.toFixed(2)+' '+distanceformat+'</span></p>'
		u +='</div>'<!--col-md-2-->
		u +='<div class="col-md-2">'
		u +='<p><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?>: <span>'+s[x].categoryshow+'</span></p>'
		if(s[0].searchtype!="citysearch" && s[0].searchtype!="pickup" && s[0].searchtype!="categorysearch" ) {	
			if (s[x].shipping == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
				var dollarimge = "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"
				var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}else{
				var dollarimge = "<span class='shipping-cost-feer'>"+s[x].shipping+"</span>"
				var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}	
			u +='<p>'+delcos+': <span>'+dollarimge+'</span></p>'		
		}
		u +='</div>'<!--col-md-3-->
		u +='<div class="col-md-5">'
		u +='<div class="row">'
		u +='<div class="col-md-6">'
		if(s[x].promotion) {
			u +='<p><?= $lang_resource['BUSINESS_LIST_OPTIONS_PROMOTION'] ?>: <span>'+s[x].promotion +'</span></p>'
		}
		
		u +='<div class="rating">'
		u +='<ul>'
		u +='<li><?=$lang_resource['BUSINESS_LIST_RATING']?>:</li>'
		u +=rvw
		u +='</ul>'
		u +='</div>'
		u +='<div class="clearfix"></div>'
		u +='</div>'<!--col-md-6-->
		u +='<div class="col-md-6">'
		u +='<div class="rst_btns">'
		u +='<ul>'
		if(Main.WhereAmIData.reservestatus == 'delivery') {
			u +='<li>'
			u +='<div class="order_now_dv">'
			u +='<button type="button" class="order-now-btn" onclick="Shopping.OpenBusiness('+ s[x].id + ')"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
			u +='</div>'<!--field_dv-->
			u +='</li>'

			u +='<li>'
			u +='<div class="field_dv">'
			u +='<button type="button" class=" preorder-btn" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button>"
			u +='</div>'<!--field_dv-->
			u +='</li>'
		}else if(Main.WhereAmIData.reservestatus == 'pickup') {
			u +='<li>'
			u +='<div class="order_now_dv">'
			u +='<button type="button" class="order-now-btn" onclick="Shopping.OpenBusiness('+ s[x].id + ')"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
			u +='</div>'<!--field_dv-->
			u +='</li>'

			u +='<li>'
			u +='<div class="field_dv">'
			u +='<button type="button" class=" preorder-btn" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button>"
			u +='</div>'<!--field_dv-->
			u +='</li>'
		}else if(Main.WhereAmIData.reservestatus == 'reservation') {
			if(s[x].catalog != 0 && (s[x].DeliveryStatus == "true" || s[x].PickupStatus == "true" )) {
				u +='<li>'
				u +='<div class="order_now_dv">'
				u +='<button type="button" class="order-now-btn" onclick="Shopping.OpenBusiness('+ s[x].id + ')"><?= $lang_resource['BUSINESS_LIST_OPTIONS_ORDERANDRESERVE'] ?></button>'
				u +='</div>'<!--field_dv-->
				u +='</li>'
			}
			

			u +='<li>'
			u +='<div class="field_dv">'
			u +='<button type="button" class=" preorder-btn" onclick="Shopping.OpenBusiness('+ s[x].id + ',false,true,true,true)\"><?= $lang_resource['BUSINESS_LIST_OPTIONS_RESERVE_NOW'] ?></button>'
			u +='</div>'<!--field_dv-->
			u +='</li>'
		}else{
			u +='<li>'
			u +='<div class="order_now_dv" >'
			u +='<button type="button" class="order-now-btn" onclick="Shopping.OpenBusiness('+ s[x].id + ')"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
			u +='</div>'<!--field_dv-->
			u +='</li>'

			u +='<li>'
			u +='<div class="field_dv">'
			u +='<button type="button" class=" preorder-btn" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?=$lang_resource['SHOPPING_PREORDER']?></button>"
			u +='</div>'<!--field_dv-->
			u +='</li>'
		}		

		u +='</ul>'
		u +='</div>'<!--rst_btns-->
		u +='</div>'<!--col-md-6-->
		u +='</div>'<!--row-->
		u +='</div>'<!--col-md-5-->
		u +='</div>'<!--row-->
		u +='</div>'<!--restaurant_dv-->

		return u;
	},		
	CloseBusinessHtml : function(s,rvw,D,rating) {	
		var u=''
		u +='<div class="restaurant_dv clearfix" id="'+s[x].id+'_show" >'
		u +='<div class="row">'
		u +='<div class="col-md-1">'
		if(s[x].feature == "t") {
		u +='<div class="featured"><span><?=$lang_resource['BLIST_FEATURED']?></span></div>'
		}
		u +='<div class="rest-logo"><a href="javascript:void(0)">'
		u +='<img src="'+D+'"></a></div>'
		u +='</div>'<!--col-md-1-->
		u +='<div class="col-md-2">'
		u +='<h3 class="rest-name">'+ Main.TitleCase(s[x].name) +'</h3>'
		u +='</div>'<!--col-md-2-->
		u +='<div class="col-md-2">'
		u +='<p><?=$lang_resource['BUSINESS_LIST_PAYMENT']?>: <span>'
		var paylist = JSON.parse(s[x].paymentdetails);
		var count = 0;
		for(var m in paylist){
			if(paylist[m] == 't'){
				if(m == 'cash'){
					u +='&nbsp;<img src="panel/<?=$moduleName?>/images/pay-1.png">'
				}
				if(m == 'card'){
					u +='&nbsp; <img src="panel/<?=$moduleName?>/images/pay-2.png">'
				}
			}
		}		
		u +='</span></p>'
		distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_KM'] ?>"
		if(s[x].distanceformat=='N'){
			distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_MILES'] ?>"
		}	
		u +='<p><?= $lang_resource['DISTANCE'] ?>: <span>'+s[x].distance.toFixed(2)+' '+distanceformat+'</span></p>'
		u +='</div>'<!--col-md-2-->
		u +='<div class="col-md-2">'
		u +='<p><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?>: <span>'+s[x].categoryshow+'</span></p>'
		if(s[0].searchtype!="citysearch" && s[0].searchtype!="pickup" && s[0].searchtype!="categorysearch" ) {	
			if (s[x].shipping == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
				var dollarimge = "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"
				var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}else{
				var dollarimge = "<span class='shipping-cost-feer'>"+s[x].shipping+"</span>"
				var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}	
			u +='<p>'+delcos+': <span>'+dollarimge+'</span></p>'		
		}
		u +='</div>'<!--col-md-3-->
		u +='<div class="col-md-5">'
		u +='<div class="row">'
		u +='<div class="col-md-6">'
		if(s[x].promotion) {
			u +='<p><?= $lang_resource['BUSINESS_LIST_OPTIONS_PROMOTION'] ?>: <span>'+s[x].promotion +'</span></p>'
		}
		
		u +='<div class="rating">'
		u +='<ul>'
		u +='<li><?=$lang_resource['BUSINESS_LIST_RATING']?>:</li>'
		u +=rvw
		u +='</ul>'
		u +='</div>'
		u +='<div class="clearfix"></div>'
		u +='</div>'<!--col-md-6-->
		u +='<div class="col-md-6">'
		u +='<div class="rst_btns">'
		u +='<ul>'

	
		u +='<li>'
		u +='<div class="order_now_dv" >'
	/*	u +='<a href="javascript:void(0)" class="tooltip red-tooltip">'
		u +='<p style="float:left; >'*/
		u +='<button type="button" class="order-now-btn" ><?= $lang_resource['PAYMENT_GATEWAY_CLOSED'] ?></button>'
		/*u +='</p>'
		u +='<span><div class="pull_left" style="margin-right:10px; margin-top:10px;font-weight:bold"><img src="images/step2-business-listing/closed-icon.png"></div>'
		u +='<ul class="timing-li" style="margin-top:5px; float:left;">'
		u +='<li><?= $lang_resource['BUSINESS_LIST_OPTIONS_WE_WILL_OPEN_AT'] ?></li>'
		u +='<li>'+s[x].willopen+' </li>'
		u +='</ul></span>'
		u +='</a>'*/
		u +='</div>'<!--field_dv-->
		u +='</li>'

		u +='<li>'
		u +='<div class="order_now_dv" >'		
		u +='<p><button type="button" class="preorder-btn" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\"><?= $lang_resource['SHOPPING_PREORDER'] ?></button></p>"
		u +='</div>'<!--field_dv-->
		u +='</li>'


		u +='</ul>'
		u +='</div>'<!--rst_btns-->
		u +='</div>'<!--col-md-6-->
		u +='</div>'<!--row-->
		u +='</div>'<!--col-md-5-->
		u +='</div>'<!--row-->
		u +='</div>'<!--restaurant_dv-->

		return u;
	},		
			
		
	setCheck: function(id){
		
		if ($("#business_category_switch_"+id).is(':checked')) {
			
        	$("#business_category_switch_"+id).prop('checked',false);
       
 		 }else{
			 $("#business_category_switch_"+id).prop('checked',true);
			 }
	},

	WhereAmIDeliveryOfCity: function (c){

		Forms.Clean("whereami", "popupmainbuttonok");
		GoogleMap.Clean();
		Main.ActiveForm = "whereami";

		Forms.Form.whereami.whereami = c;
		var b = false;
		if (c){
			Forms.Form.whereami.type = "modify";
			b = true
		}else{
			c = new Object();
			Forms.Form.whereami.type = "create"
		}

		var d = new Array();		
		d.push({
			id: "",
			caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
		});

		var FF = new Array();
		FF.push({
			id: "",
			caption: "<?= $lang_resource['CITY_V2'] ?>"
		});


		var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries){
			if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray('-1', countrytag ) != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}

		var co_f ='';
		var ci_f ='';
		var add_f ='';
		var add_f1 ='';
		var counter =0;

		var cc ='';
		var cic ='';
		var re_f='';

		if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){
				b = JSON.parse(b);
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
			});

			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){
				b = JSON.parse(b);
				var a = new Object();
				a.id = "city";
				a.value = b.cityname;
				GoogleMap.UpdateUserPosition(a);
			});
			if(Main.User){
				var a = new Object();
				a.id = "address";
				a.value = Main.User.street;
				GoogleMap.UpdateUserPosition(a);
			}
		}else{
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(cc,cic);
		}


		if(Main.settingfront.tab_delivery_country == 't'){
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1){
				cc = countrytag[0];
				Main.PopulateCitySelect(cc);
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){
					b = JSON.parse(b);
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
				});
				co_f +='style="display:none;"'
				counter ++;
			}
			<!--Single Country-->

			<!--Single City-->
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && $.inArray('-1', citytag ) == -1 ){
				cic = citytag[0];
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){
					b = JSON.parse(b);
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
				});
				ci_f +='style="display:none;"'
				counter ++;
			}
			if(Main.User){
				var a = new Object();
				a.id = "address";
				a.value = Main.User.street;
				GoogleMap.UpdateUserPosition(a);
			}
			<!--Single City-->

			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			if(restaurant.length == 1 &&  $.inArray('-1', restaurant )  == -1){
				re_f +='display:none;'
			}
			<!--Single Resturant-->
		}

		if(Main.settingfront.tab_delivery_country == 'f'){
			cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			cic = Main.settingfront.default_city;
			ci_f +='style="display:none;"'
			counter ++;
		}

		if(Main.settingfront.tab_delivery_address == 'f'){ 
			add_f +='style="display:none;"'
		}
		if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
			add_f1 +='style="display:none;"'
		}
		if((Main.settingfront.tab_delivery_address == 'f') && (Main.settingfront.tab_delivery_neighborhood == 'f')){ 
			counter ++;
		}

		if(counter == 0){
			cc = Main.NullToEmpty(Main.WhereAmIData.country)
			cic = Main.NullToEmpty(Main.WhereAmIData.city)

		}

		var htms = ''
		htms +='<style>'
		htms +='.pac-container {' 
               htms +='z-index: 10000 !important;'
               htms +=' display: block !important;'
            htms +='}'
			htms +='</style>'
		htms +='<div class="modal-header">'
		htms +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		htms +='<h4 class="modal-title" id="myModalLabel"><?= $lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I'] ?></h4>'
		htms +='</div>'
		htms +='<div class="modal-body">'


		htms +='<div class="row" '+co_f+'>'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +=Forms.CreateSelectProperty2Popup("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true)
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-12-->
		htms +='</div>'<!--row-->
		htms +='<div class="row" '+ci_f+'>'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +=Forms.CreateSelectProperty2Popup("whereami", "city", FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true)
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-12-->
		htms +='</div>'<!--row-->
		htms +='<div class="row" '+add_f+'>'
		htms +='<div class="col-md-12">'
		htms +='<div class="geo_bnt_field">'
		htms +=Forms.CreateinputTextAddressPopup("whereami", "address_del", '', false, "GoogleMap.UpdateUserPosition(this)", true)
		htms +='<button type="button" class="geo_btn" onclick="Main.GetUserLocationFromCitySearch()">&nbsp;</button>'
		htms +='</div>'<!--geo_bnt_field-->
		htms +='</div>'<!--col-md-12-->
		htms +='</div>'<!--row-->
		var cit1 = new Array();
		cit1.push({
			id: "",
			caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
		});
		htms +='<div class="row" '+add_f1+'>'
		htms +='<div class="col-md-12">'
		htms +='<div class="form-group">'
		htms +=Forms.CreateSelectProperty2Popup1("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-12-->
		htms +='</div>'<!--row-->

		htms +='<div class="row">'
		htms +='<div class="col-md-12">'
		htms +='<div class="where_are_you_map_dv" id="mapbox" >'
	
		htms +='</div>'<!--where_are_you_map_dv-->
		htms +='</div>'<!--col-md-12-->
		htms +='</div>'<!--row-->


		htms +='</div>'<!--modal-body-->
		htms +='<div class="modal-footer">'
		htms +='<button type="button" class="popup_btn" onclick="Main.SaveWhereAmICustomOfCity()" ><?= $lang_resource['CONTINUE'] ?></button>'

		htms +='</div>'


		Popup.Show(htms,Main.PreWhereAmIInner);
		
		$( document ).ready(function() {
			AutoPop.Main3();
			});

		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.street;
			GoogleMap.UpdateUserPosition(a);
		}

		if (b){
			Forms.Form.whereami.fields.city.save = true;
			if(IS_PAYPAL_ENABLED != 1)
				Forms.Form.whereami.fields.address.save = true;
			Forms.Form.whereami.fields.location.save = true;
			if (Main.WhereAmIData.country && Main.WhereAmIData.city){
				Main.CountrySelected(document.getElementById("country"), Main.WhereAmIData.city)
			}
		}
	},
	

	
};
