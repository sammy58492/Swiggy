var RestMenuList = {
 	PrintBusinessAndDishes: function (resSearch){
 		 
		$('header').removeClass("inner_header");
		if(document.getElementById("businessloading")){
			$("#businessloading").hide();
		}
		Main.MenulistEnter = true;
		$(window).scrollTop(0)
		$(".showhidebottom").hide();
		$(".map-pannel").hide();
		var myParam = location.search.split('order=');
		Main.stepBack  = 3;


		if(Main.confirmOrder && Main.confirmOrder  == true){
			Main.confirmOrder = false;
			var shs = Blist.ShoppingHeaderDesignNavigationHtml();
			var sch = Blist.ShoppingHeaderBusinessSearchHtml();

			document.getElementById("left").innerHTML = '<div class="cntnr_div_whle"><div class="cntnr_div"><div id="headerSearch"><div id="showcanvas"></div>'+sch+'</div></div><div class="rest-body"><div id="shoppingbox"  class="main"></div></div></div>';

			document.getElementById("top").innerHTML = shs;

			$(".map-pannel").hide();
			if(viewDevice == "Desktop"){	
				$(".main li").removeClass("active-step");
				$(".main #plc_ordr").addClass("active-step");
			}

			lastid = "";
			choice_count=0;
			div_data=null;
			mychoice_data=new Array();
			cart_object=null;
			cart_id=null;
			quantitysec = 1;
			reservetab = 0;
			GlobalPagecheck = 0;

			var globalReserve = new Object();
			globalReserve.Room = new Array();
			globalReserve.Table = new Array();
			globalReserve.Free = new Array();

			var globalReserveTotalPrice = 0;
			var free_price = 0;
			var room_price = 0;
			var table_price = 0;

			Shopping.Cart.business = new Array();
			Shopping.Cart.reserve = new Object();
			Shopping.Cart.reserveQty = new Object();
			Shopping.Cart.reservePrice = new Object();
			Shopping.Cart.twilioenabledclient = false;	
			Shopping.UpdateCartUserInfo()
		}
		document.getElementById("left").innerHTML = '<div id="headerSearch"><div id="src_bx"></div><div id="src_bxNew"></div><div id="showcanvas"></div></div><div id="shoppingbox"></div>'
		
        var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		Main.car = Shopping.Business[u].currency;
        var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");
		
        var p = Shopping.Business[u].street + " - " + Shopping.Business[u].colony +"," + o;
		var v='';

		if(Shopping.Business[u].isimg==1){			
        	v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
		}else{
			v = 'panel/images/dummy/medium_business.jpg';
		}
		
        Shopping.MenuCategories = new Array();

        var r = false;
        for (var q in Shopping.Menu.dishes){
            if (Shopping.MenuCategories.length > 0){
                r = false;
                for (var s in Shopping.MenuCategories){
                    if (Shopping.MenuCategories[s].id == Shopping.Menu.dishes[q].category){
                        r = true
                    }
                }
                if (!r && Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category) != ""){
                    Shopping.MenuCategories.push({
                        id: Shopping.Menu.dishes[q].category,
                        name: Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category, "name"),
                        rank: Shopping.Menu.dishes[q].rank_cat,
                        enabled: true
                    })
                }
            }else{
                if (Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category) != ""){
                    Shopping.MenuCategories.push({
                        id: Shopping.Menu.dishes[q].category,
                        name: Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category, "name"),
                        rank: Shopping.Menu.dishes[q].rank_cat,
                        enabled: true
                    })
                }
            }
            Shopping.Menu.dishes[q].selectedExtras = new Object()
        }

        var w = "";
        var t = "";
		Shopping.MenuCategories.sort(Main.SortByProperty('rank'));
		
        for (q in Shopping.MenuCategories){
			if (q == 0){
				w += "(" + Shopping.MenuCategories[q].name.toLowerCase()
			}else{
				w += ", " + Shopping.MenuCategories[q].name.toLowerCase()
			}

			t += '<div class="row">';
			t += '<div class="captionbox hand"><span class="caption default menu_category_name_'+Shopping.MenuCategories[q].id+'">' + Shopping.MenuCategories[q].name + "</span></div>";
			t += '<div class="switchbox hand"><div id="menu_category_switch_' + Shopping.MenuCategories[q].id + '" class="switch" onclick="Shopping.changecatclass(' + Shopping.MenuCategories[q].id + ')"></div></div>';
			t += "</div>"
        }
        w += ")";

		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
			var roundTotal = Math.round(Shopping.Review.total);
			var rev_tot = roundTotal;
			var starsReview = "";
			var i = 1;
			for(i=1;i<=5;i++){
				if(roundTotal>=1){
					starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="panel/<?=$moduleName?>/images/star-yellow.png"></a></li>'
					roundTotal=roundTotal-1;
				}else if(roundTotal<=0){
					starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="panel/<?=$moduleName?>/images/star-grey.png"></a></li>'
				}
			}
		}

    	var shipcos = Shopping.FormatPrice(Shopping.Business[u].shipping,Main.car);
		if (shipcos == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
			var dollarimge = "<img src='http://"+Shopping.Review.url+"/images/dollar.png' alt='<?= $lang_resource['MENU_LIST_FREE_SHIPPING'] ?>' style='width:18px;'/>";
		}else{
			var dollarimge = "<span class='shipping-cost-feer'>"+shipcos+"</span>";
		}

	 	var ban = ''

		var imageUrl = Shopping.Business[u].headerurl;
		var bid = Shopping.Business[u].id;
	 	var bname = Shopping.Business[u].name;
	 	var grey = "panel/images/pattern.png";
		ban +='<div class=" business_banner" style="background: url('+grey+'), url('+imageUrl+'); background-size: 100% 100%;">'
		ban +='<div class="container">'
		ban +='<div class="restaurant_info">'
		ban +='<div class="business_small_img">'
		ban +='<img src="'+v+'">'
		ban +='</div>'<!--business_small_img-->
		ban +='<h3>'+ Shopping.Business[u].name.toUpperCase() +'</h3>'

		if(Main.businessSetting.businesspageheadersetting !="1" && parseInt(Shopping.Business[u].reviewsettings) == 1 && parseInt(Shopping.Business[u].photosettings) == 1){

			ban +='<div class="row">'
			ban +='<div class="col-md-8 col-md-offset-2">'
			ban +='<div class="row">'
			ban +='<div class="col-md-4 col-sm-4">'
			ban +='<button type="button" class="write_review_btn" onclick="RestMenuList.AddReview()"><?=$lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></button>'
			ban +='</div>'<!--col-md-6-->
			if(Main.User) {
			bname = bname.replace("'","`")
			ban +='<div class="col-md-4 col-sm-4">'
			ban +='<button type="button" class="add_favourite_btn" onclick="Shopping.AddToFav(\'' + bid + '\',\'' + bname + '\')"><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button>'
			ban +='</div>'<!--col-md-6-->
			}else{
			ban +='<div class="col-md-4 col-sm-4">'
			ban +='<button type="button" class="add_favourite_btn" onclick="Main.Favlogin()"><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button>'
			ban +='</div>'<!--col-md-6-->	
			}
			ban +='<div class="col-md-4 col-sm-4">'
			ban +='<button type="button" class="add_photo_btn" onclick="RestMenuList.AddPhoto()"><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></button>'
			ban +='</div>'<!--col-md-6-->
			ban +='</div>'<!--row-->
			ban +='</div>'<!--col-md-4-->
			ban +='</div>'<!--row-->

		}else if((Main.businessSetting.businesspageheadersetting !="1" && parseInt(Shopping.Business[u].reviewsettings) == 1 && parseInt(Shopping.Business[u].photosettings) != 1) || (Main.businessSetting.businesspageheadersetting !="1" && parseInt(Shopping.Business[u].reviewsettings) != 1 && parseInt(Shopping.Business[u].photosettings) == 1) || (Main.businessSetting.businesspageheadersetting =="1" && parseInt(Shopping.Business[u].reviewsettings) != 1 && parseInt(Shopping.Business[u].photosettings) != 1)){

			ban +='<div class="row">'
			ban +='<div class="col-md-6 col-md-offset-3">'
			ban +='<div class="row">'

			if(parseInt(Shopping.Business[u].reviewsettings) == 1){
			ban +='<div class="col-md-6 col-sm-6">'
			ban +='<button type="button" class="write_review_btn" onclick="RestMenuList.AddReview()"><?=$lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></button>'
			ban +='</div>'<!--col-md-6-->	
			}

			if(Main.businessSetting.businesspageheadersetting !="1"){
			ban +='<div class="col-md-6 col-sm-6">'
			if(Main.User) {
			ban +='<button type="button" class="add_favourite_btn" onclick="Shopping.AddToFav(\'' + bid + '\',\'' + bname + '\')"><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button>'
			}else{
			ban +='<button type="button" class="add_favourite_btn" onclick="Main.Favlogin()"><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button>'	
			}
			ban +='</div>'<!--col-md-6-->
			}

			if(parseInt(Shopping.Business[u].photosettings) == 1){
			ban +='<div class="col-md-6 col-sm-6">'
			ban +='<button type="button" class="add_photo_btn" onclick="RestMenuList.AddPhoto()"><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></button>'
			ban +='</div>'<!--col-md-6-->
			}

			ban +='</div>'<!--row-->
			ban +='</div>'<!--col-md-4-->
			ban +='</div>'<!--row-->
		}else if((Main.businessSetting.businesspageheadersetting !="1" && parseInt(Shopping.Business[u].reviewsettings) != 1 && parseInt(Shopping.Business[u].photosettings) != 1) || (Main.businessSetting.businesspageheadersetting =="1" && parseInt(Shopping.Business[u].reviewsettings) == 1 && parseInt(Shopping.Business[u].photosettings) != 1) || (Main.businessSetting.businesspageheadersetting =="1" && parseInt(Shopping.Business[u].reviewsettings) != 1 && parseInt(Shopping.Business[u].photosettings) == 1)){

			ban +='<div class="row">'
			ban +='<div class="col-md-4 col-md-offset-4">'
			ban +='<div class="row">'
			if(parseInt(Shopping.Business[u].reviewsettings) == 1){
			ban +='<div class="col-md-12">'
			ban +='<button type="button" class="write_review_btn">Write a review</button>'
			ban +='</div>'<!--col-md-12-->
			}

			if(Main.businessSetting.businesspageheadersetting !="1"){
			ban +='<div class="col-md-12">'
			if(Main.User) {
			ban +='<button type="button" class="add_favourite_btn" onclick="Shopping.AddToFav(\'' + bid + '\',\'' + bname + '\')"><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button>'
			}else{
			ban +='<button type="button" class="add_favourite_btn" onclick="Main.Favlogin()"><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button>'	
			}
			ban +='</div>'<!--col-md-12-->
			}

			if(parseInt(Shopping.Business[u].reviewsettings) == 1){
			ban +='<div class="col-md-12">'
			ban +='<button type="button" class="add_photo_btn" onclick="RestMenuList.AddPhoto()"><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></button>'
			ban +='</div>'<!--col-md-12-->
			}

			ban +='</div>'<!--row-->
			ban +='</div>'<!--col-md-4-->
			ban +='</div>'<!--row-->
		}

		ban +='</div>'<!--restaurant_info-->
		ban +='</div>'<!--container-->
		ban +='</div>'<!--business_banner-->
		ban +='<div class=" business_info_panel">'
		ban +='<div class="container">'
		ban +='<div class="row">'
		ban +='<div class="col-md-3 col-sm-3 col-md-offset-1">'
		ban +='<h5><?=$lang_resource['MENU_LIST_ADDRESS_HEADING']?>:</h5>'
		ban +='<p>'+Shopping.Business[u].street +' - <span id="colony_name" ></span></p>'
		ban +='</div>'<!--col-md-3-->	
		ban +='<div class="col-md-3 col-sm-3">'
		//Time selection settings. 
		opentime=new Array();
		closetime=new Array();
		opentime1='';
		closetime1='';
		time_format="<?=$lang_resource['TIME_FORMAT']?>";
		if(time_format=="12"){  
			opentime1=Main.zeroPad(Shopping.Business[u].opentime,2);
			closetime1=Main.zeroPad(Shopping.Business[u].closetime,2);
		}else{
			opentime1=Main.convertTo24Hour(Shopping.Business[u].opentime);
			closetime1=Main.convertTo24Hour(Shopping.Business[u].closetime);
		}

		ban +='<h5><?= $lang_resource['MENULIST_OPENING_TIME'] ?></h5>'
		ban +='<p>'+opentime1+' - '+closetime1+'</p>'
		ban +='</div>'<!--col-md-3-->
		ban +='<div class="col-md-2 col-sm-3">'
		ban +='<h5><?=$lang_resource['BUSINESS_LIST_RATING']?>:</h5>'
		ban +='<div class="business_rating">'
		ban +='<ul>'
		ban +=starsReview 
		ban +='</ul>'
		ban +='</div>'
		ban +='</div>'<!--col-md-3-->
		
		
		var pay = JSON.parse(Shopping.Business[u].paymentdetails);
		var count = 0;
		ban +='<div class="col-md-2 col-sm-3">'
		for(var m in pay){
			if(pay[m]=='t'){ 
				count++;
				if(count > 0 && count == 1){
					ban +='<h5><?= $lang_resource['FOOTER_WE_ACCEPT'] ?>:</h5>'
					ban +='<div class="we_accpet">'
					ban +='<ul>'					
				}
				ban +='<li><a href="#"><img src="images/step3-menu-list/paymethod/'+m+'.png"></a></li>'			
			}
		}
		if(count > 0){
			ban +='</ul>'
			ban +='</div>'
		}
		ban +='</div>'<!--col-md-3-->

		ban +='</div>'<!--row-->
		ban +='</div>'<!--container-->
		ban +='</div>'<!--business_info_panel-->
		ban +='<div class="menu_tab_panel">'
		ban +='<div class="container">'
		ban +='<ul class="menu_tabs">'
		if(Shopping.Business[u].reserve>0) {
			ban +='<li><a href="javascript:Shopping.Menuskiptab(1)" class="active-tab" id="tabMenu1"><?=$lang_resource['MENU_V21']?></a></li>'
			ban +='<li><a href="javascript:Shopping.Menuskiptab(2)" id="tabInfo2"><?=$lang_resource['INFO_V21']?></a></li>'
			if(parseInt(Shopping.Business[u].reviewsettings) >= 1)
			ban +='<li><a href="javascript:Shopping.Menuskiptab(3)" id="reviewCountText"><?=$lang_resource['REVIEWS_V21']?></a></li>'
			ban +='<li><a href="javascript:Shopping.Menuskiptab(4)" id="offerCountText"><?=$lang_resource['OFFERS_V21']?></a></li>'
			if(Main.settingfront.tab_reservation != 'f')
			ban +='<li><a href="javascript:Shopping.Menuskiptab(5)" id="ReserveidText"><?=$lang_resource['RESERVATION_V21']?></a></li>'
		}else if(Shopping.Business[u].reserve == 0){
			ban +='<li><a href="javascript:Shopping.Menuskiptab(1)" class="active-tab" id="tabMenu1"><?=$lang_resource['MENU_V21']?></a></li>'
			ban +='<li><a href="javascript:Shopping.Menuskiptab(2)" id="tabInfo2"><?=$lang_resource['INFO_V21']?></a></li>'
			if(parseInt(Shopping.Business[u].reviewsettings) >= 1)
			ban +='<li><a href="javascript:Shopping.Menuskiptab(3)" id="reviewCountText"><?=$lang_resource['REVIEWS_V21']?></a></li>'
			ban +='<li><a href="javascript:Shopping.Menuskiptab(4)" id="offerCountText"><?=$lang_resource['OFFERS_V21']?></a></li>'			
		}
		
		ban +='</ul>'
		ban +='</div>'<!--container-->
		ban +='</div>'<!--menu_tab_panel-->




		var n = ''


		n +='<div class="container" id="plce_div_menu">'
		n +='<div class="stillpages">'
		n +='<div class="row">'
		if(viewDevice == "Mobile") {
			n +='<div class="col-md-9">'
		}else{
			n +='<div class="col-md-9" style="width:74% !important">'
		}
		n +='<div class="white_box">'
		
		n +='<div class="menu_search item">'//Center Part
		n +='<div class="row">'
		n +='<div class="col-md-3 col-sm-3">'
		n +='<div class="field_dv item_stick_float">'
		n +='<select class="form-control rounded_corner_4" onchange="Shopping.changecatclass(this)">'
		n +='<option value="-1"><?= $lang_resource['MENU_LIST_SELECT_CATEGORIES'] ?></option>'
		for (q in Shopping.MenuCategories){
		n +='<option value="'+Shopping.MenuCategories[q].id+'">' + Shopping.MenuCategories[q].name + '</option>'
		}
		n +='</select>'
		n +='</div>'<!--field_dv-->

		if(Main.businesstemplate==1){
			
			n +='<div class="categories">'
			n +='<ul>'
			for (q in Shopping.MenuCategories){
				n +='<li><a href="javascript:RestMenuList.changecatclass('+Shopping.MenuCategories[q].id+')">'+Shopping.MenuCategories[q].name+'</a></li>'	
			}
			n +='</ul>'
			n +='</div>'<!--field_dv-->
		}


		n +='</div>'<!--col-md-3-->
		n +='<div class="col-md-9 col-sm-9" >'
		n +='<div class="field_dv item_stick_float">'
		n +='<input class="form-control listing_searcfield" placeholder="<?=$lang_resource['MENU_LIST_SEARCH_HERE']?>" type="text"  id="dishsearch">'
		n +='</div>'
		n +='</div>'<!--col-md-9-->
		n +='</div>'<!--row-->
		n +='</div>'<!--menu_search-->//Center Part

		n +='<div class="row">'
		//alert(Main.businesstemplate)
		if(Main.businesstemplate==1)
		{
			n +='<div class="col-md-3 col-sm-3" >'//left Part
		
		
		n +='<div id="shopmenuadscontainer" style="display:none"></div>'
		n +='</div>'<!--col-md-3-->//left Part
		
		n +='<div class="col-md-9 col-sm-9">'//Middle Part
		n +='<div id="loader_dv"></div>'
		n +='<div id="dishesresults"></div>'

		

		n +='</div>'<!--col-md-9-->//Middle Part
		}
		else
		{
			n +='<div id="shopmenuadscontainer" style="display:none"></div>'
			n +='<div id="loader_dv"></div>'
			n +='<div id="dishesresults"></div>'	
		}
		n +='</div>'<!--row-->

		n +='</div>'<!--white_box-->
		n +='</div>'<!--col-md-9-->


		n +='<div class="col-md-3 item " >'
		n +='<div class="cart_dv">'
	//	n +='<h2><?=$lang_resource['MENU_LIST_MY_ORDERS']?></h2>'


		if(Main.WhereAmIData.reservestatus=='delivery'){
			if(Shopping.Business[u].deliverytime== "" || Shopping.Business[u].deliverytime == undefined){
				if(Main.d_time){
					var dt = Main.d_time;
				}else{
					var dt = '00:00';
				}				
			}else{
				var dt = Shopping.Business[u].deliverytime				
			}
			n +='<div class="estimated_delivery_dv" id="deli">'
			n +='<p><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?></p>'
			n +='<h2>'+dt+'</h2>'			
			n +='</div>'<!--estimated_delivery_dv-->
		}else if(Main.WhereAmIData.reservestatus=='pickup' || Main.WhereAmIData.reservestatus=='reservation'){
			if(Shopping.Business[u].pickuptime== "" || Shopping.Business[u].pickuptime == undefined){
				var pt ="00:00"				
			}else{
				var pt = Shopping.Business[u].pickuptime				
			}
			n +='<div class="estimated_delivery_dv" id="pick">'
			n +='<p><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?></p>'
			n +='<h2>'+pt+'</h2>'
			n +='</div>'<!--estimated_delivery_dv-->
		}else{
			if(Shopping.Business[u].deliverytime== "" || Shopping.Business[u].deliverytime == undefined){
				if(Main.d_time){
					var dt = Main.d_time;
				}else{
					var dt = '00:00';
				}				
			}else{
				var dt = Shopping.Business[u].deliverytime				
			}

			if(Shopping.Business[u].pickuptime== "" || Shopping.Business[u].pickuptime == undefined){
				var pt ="00:00"				
			}else{
				var pt = Shopping.Business[u].pickuptime				
			}
			n +='<div class="estimated_delivery_dv">'
			n +='<div id="deli">'
			n +='<p><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?></p>'
			n +='<h2>'+dt+'</h2>'
			n +='</div>'

			n +='<div id="pick">'	
			n +='<p><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?></p>'
			n +='<h2>'+pt+'</h2>'
			n +='</div>'		
			n +='</div>'<!--estimated_delivery_dv-->
		}


		if(Shopping.Cart.preorder){
			var d = new Date(Shopping.Cart.preorderDate);
			//Time selection settings. 
			time_format="<?=$lang_resource['TIME_FORMAT']?>";
			if(time_format=="12"){
				preordertimehh= Main.convertTimeFormat(Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm);
			}else{
				if(Shopping.Cart.preordertimehh >= 24){
					preordertimehh= Main.convertTimeFormat(Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm);
				}else{
					preordertimehh=Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2);
				}
			}

			if(Shopping.Cart.buyer.deliverydate){
				Shopping.Cart.Preordserdateback = Shopping.Cart.buyer.deliverydate;		
			}else{
				Shopping.Cart.buyer.deliverydate = Shopping.Cart.Preordserdateback;
			}

			Shopping.Cart.buyer.deliveryhours = Shopping.Cart.preordertimehh;
			showpreorderdate = Shopping.Cart.buyer.deliverydate + '  '+preordertimehh;

			n +='<p class="change_time"><?=$lang_resource['PREORDER_DELIVERY']?> '+showpreorderdate+'</p>'
			n +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?= $lang_resource['MENU_LIST_CHANGE_TIME'] ?></a></p>'
		}else{
		//	n +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?=$lang_resource['PREORDER_DELIVERY']?></a></p>'
			n +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?= $lang_resource['MENU_LIST_SET_TIME'] ?></a></p>'	
		}

		if((Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 't') && (Main.WhereAmIData.collecttype =="delivery" || Main.WhereAmIData.collecttype =="pickup")){
			n +='<div class="delivery_pickup">'
			n +='<div class="row">'
			n +='<div class="col-md-12">'
			n +='<ul>'
			n +='<li>'
			n +='<span><?=$lang_resource['FRONT_VISUALS_TAB_DELIVERY']?></span>'
			n +='</li>'<!--col-md-2-->
			n +='<li>'
			n +='<span class="caption">'
			n +='<div class="del_pic">'
			n +='<input type="checkbox" name="1" id="deltypemenu">' 
	        n +='<label for="deltypemenu">&nbsp;</label>'
			n +='</div>'
			n +='</span>'
			n +='</li>'<!--col-md-2-->
			n +='<li>'
			n +='<span><?=$lang_resource['FRONT_VISUALS_TAB_PICKUP']?></span>'
			n +='</li>'
			n +='</ul>'
			n +='</div>'<!--col-md-12-->
			n +='</div>'<!--row-->
			n +='</div>'<!--delivery_pickup-->
		}

		

		n +='<div class="product_table_dv">'
		//n +='<div class="dishDvScroll">'	
		//n +='<div class="dishDvScroll_in" data-simplebar-direction="vertical" >'
		n +='<div id="plc_rgt_in" class="cart_scroll"></div>'
		n +='<table id="chk_reserve" class="reserve_cart_table"></table>'
		//n +='</div>'
		//n +='</div>'
		//Delivery Charge
		if(Main.deliveryType == "delivery") {	
			var lang='';
			if(Shopping.Business[u].shipping!="Pending"){
				lang=Shopping.Business[u].currency;
			}

			n +='<div class="item_dv no-border">'
			n +='<ul class="item_row">'
			n +='<li>'
			n +='<p><?= $lang_resource['DELIVERY_V2'] ?></p>'
			n +='</li>'
			n +='<li>'
			n +='<ul class="btns_and_price">'
			n +='<li>&nbsp;</li>'
			if(Shopping.Business[u].shipping=="Pending"){
				var pend_txt = "<?= $lang_resource['NOVALID_V21'] ?>";
				n +='<li><p><span id="' +Shopping.Business[u].id + '_shipping">'+pend_txt+'</span>'+lang+'</p></li>'       
			}else{
				n +='<li><p>'+lang+'<span id="' +Shopping.Business[u].id + '_shipping">'+Shopping.Business[u].shipping+'</p></li>'       
			}			                        
			n +='</ul>'                                    	
			n +='</li>'
			n +='</ul>'<!--item_row-->
			n +='</div>'<!--item_dv-->
		}
		//Delivery Charge

		//Discount 
		n +='<div class="item_dv no-border" id="showDiscount"  style="display: none">'
		n +='<ul class="item_row">'
		n +='<li>'
		n +='<p><?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?></p>'
		n +='</li>'
		n +='<li>'
		n +='<ul class="btns_and_price">'
		n +='<li>&nbsp;</li>'
		n +='<li><p>'+Shopping.Business[u].currency+'<span id="cart_dis"></span></p></li>'				                        
		n +='</ul>'                                    	
		n +='</li>'
		n +='</ul>'<!--item_row-->
		n +='</div>'<!--item_dv-->
		//Discount 


		var s="";

		if(Shopping.Cart.buyer.taxtype == 1 && Shopping.Cart.buyer.taxtype) {
		s += '<br/><span style="font-size : 11px;font-weight:bold"><?= $lang_resource['Tax_not_included_V2'] ?></span>';
		}
		if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
			Shopping.Cart.servicefee =0;
		}
		//Service Fee
		/*if(Shopping.Cart.servicefee!=''){
			n +='<div class="item_dv no-border">'
			n +='<ul class="item_row">'
			n +='<li>'
			n +='<p><?= $lang_resource['SERVICE_FEE_V2'] ?></p>'
			n +='</li>'
			n +='<li>'
			n +='<ul class="btns_and_price">'
			n +='<li>&nbsp;</li>'
			n +='<li><p>'+Shopping.Business[u].currency+'<span  id="cart_servicefeeid" >0.00</span></p></li>'                               
			n +='</ul>'                                    	
			n +='</li>'
			n +='</ul>'<!--item_row-->
			n +='</div>'<!--item_dv-->
		}*/
		
		if(Main.servicefeesettings == 0){
		if(Shopping.Cart.servicefee!=''){
			n +='<div class="item_dv no-border">'
			n +='<ul class="item_row">'
			n +='<li>'
			
			n +='<p><?= $lang_resource['SERVICE_FEE_V2'] ?>('+Shopping.Cart.servicefee +'%)</p>'
		
			n +='</li>'
			n +='<li>'
			n +='<ul class="btns_and_price">'
			n +='<li>&nbsp;</li>'
			n +='<li><p>'+Shopping.Business[u].currency+'<span  id="cart_servicefeeid" >0.00</span></p></li>'                               
			n +='</ul>'                                    	
			n +='</li>'
			n +='</ul>'<!--item_row-->
			n +='</div>'<!--item_dv-->
		}
		}
		if(Main.servicefeesettings == 1){
		if(Shopping.Cart.servicefee!=''){
			n +='<div class="item_dv no-border">'
			n +='<ul class="item_row">'
			n +='<li>'
			
			n +='<p><?= $lang_resource['SERVICE_FEE_V2'] ?>('+Shopping.Business[u].servicefee +'%)</p>'
		
			n +='</li>'
			n +='<li>'
			n +='<ul class="btns_and_price">'
			n +='<li>&nbsp;</li>'
			n +='<li><p>'+Shopping.Business[u].currency+'<span  id="cart_servicefeeid" >0.00</span></p></li>'                               
			n +='</ul>'                                    	
			n +='</li>'
			n +='</ul>'<!--item_row-->
			n +='</div>'<!--item_dv-->
		}
		}
		//Service Fee

		//Tax
		n +='<div class="item_dv no-border">'
		n +='<ul class="item_row">'
		n +='<li>'
		n +='<p><?= $lang_resource['Tax_V2'] ?>'
		if(Shopping.Cart.buyer.tax) {
			n += '(' + Shopping.Cart.buyer.tax + '%) :'+s
		}else{
			n += ':'	
		}
		n +='</p>'
		n +='</li>'
		n +='<li>'
		n +='<ul class="btns_and_price">'
		n +='<li>&nbsp;</li>'
		if( Shopping.Business[u].tax ==''){
			Shopping.Business[u].tax="0.00"; 
		}
		n +='<li><p>'+Shopping.Business[u].currency+'<span id="cart_taxid">' + Shopping.Business[u].tax + '</span></p></li>'                               
		n +='</ul>'                                    	
		n +='</li>'
		n +='</ul>'<!--item_row-->
		n +='</div>'<!--item_dv-->
		//Tax

		//Driver Tips
		if(Main.NullToEmpty(Shopping.Cart.buyer.tips) > 0 || Main.NullToEmpty(Shopping.Cart.buyer.tips) !="" ) {
			n +='<div class="item_dv no-border">'
			n +='<ul class="item_row">'
			n +='<li>'
			n +='<p><?= $lang_resource['TRACKORDER_TIPS'] ?></p>'
			n +='</li>'
			n +='<li>'
			n +='<ul class="btns_and_price">'
			n +='<li>&nbsp;</li>'
			if(Shopping.Cart.buyer.tips=='' || Main.NullToEmpty(Shopping.Cart.buyer.tips) ==''){
				Shopping.Cart.buyer.tips="0.00";
			}
			n +='<li><p>'+Main.car+' ' + parseFloat(Shopping.Cart.buyer.tips).toFixed(Main.IS_DECIMAL_POINT)  + '</p></li>'                               
			n +='</ul>'                                    	
			n +='</li>'
			n +='</ul>'<!--item_row-->
			n +='</div>'<!--item_dv-->
		}
		//Driver Tips


		//Total 
		n +='<div class="item_dv no-border">'
		n +='<ul class="item_row">'
		n +='<li>'
		n +='<p class="cart-total"><?= $lang_resource['EXPORT_TOTAL'] ?></p>'
		n +='</li>'
		n +='<li>'

		n +='<li><p class="cart-total pull-right">'+Shopping.Business[u].currency+'<span id="orderprice">0.00</span></p></li>'                                                               	
		n +='</li>'
		n +='</ul>'<!--item_row-->
		n +='</div>'<!--item_dv-->
		//Total 



		//Point Section
		if(Main.User!=null){
			if(Main.ItemPointPermission==1){
				if(Main.availablepoint!=0){
					if(Main.GlobalPointSettings==1){
						for(var ooid in Main.fetchusersorderbusiness){
							if(Shopping.ActiveBusiness==Main.fetchusersorderbusiness[ooid].business_id){
								n +='<div class="item_dv no-border">'
								n +='<ul class="item_row">'
								n +='<li>'
								n +='<p><?= $lang_resource['EXPORT_TOTAL_AVAILABLE_POINTS'] ?></p>'
								n +='</li>'
								n +='<li>'
								n +='<ul class="btns_and_price">'
								n +='<li>&nbsp;</li>'
								n +='<li><p id="availablepoints" >'+Main.availablepoint+'</p></li>'                               
								n +='</ul>'                                    	
								n +='</li>'
								n +='</ul>'<!--item_row-->
								n +='</div>'<!--item_dv-->

								n +='<div class="item_dv no-border">'
								n +='<ul class="item_row">'
								n +='<li>'
								n +='<p><?= $lang_resource['EXPORT_TOTAL_APPLIED_POINTS'] ?></p>'
								n +='</li>'
								n +='<li>'
								n +='<ul class="btns_and_price">'
								n +='<li>&nbsp;</li>'
								n +='<li><p id="pointsapplied">0</p></li>'                               
								n +='</ul>'                                    	
								n +='</li>'
								n +='</ul>'<!--item_row-->
								n +='</div>'<!--item_dv-->

								n +='<div class="item_dv no-border">'
								n +='<ul class="item_row">'
								n +='<li>'
								n +='<p class="cart-total"><?= $lang_resource['EXPORT_TOTAL_FINAL_TOTAL'] ?></p>'
								n +='</li>'
								n +='<li>'

								n +='<li><p class="cart-total pull-right" id="totalorderprice">0</p></li>'                                                               	
								n +='</li>'
								n +='</ul>'<!--item_row-->
								n +='</div>'<!--item_dv-->	

								break;
							}
						}//end of for
					}else{
						for(var ooid in Main.fetchbusinesspointsenabled){
							if(Shopping.ActiveBusiness==Main.fetchbusinesspointsenabled[ooid].business_id){
								n +='<div class="item_dv no-border">'
								n +='<ul class="item_row">'
								n +='<li>'
								n +='<p><?= $lang_resource['EXPORT_TOTAL_AVAILABLE_POINTS'] ?></p>'
								n +='</li>'
								n +='<li>'
								n +='<ul class="btns_and_price">'
								n +='<li>&nbsp;</li>'
								n +='<li><p id="availablepoints">'+Main.availablepoint+'</p></li>'                               
								n +='</ul>'                                    	
								n +='</li>'
								n +='</ul>'<!--item_row-->
								n +='</div>'<!--item_dv-->

								n +='<div class="item_dv no-border">'
								n +='<ul class="item_row">'
								n +='<li>'
								n +='<p><?= $lang_resource['EXPORT_TOTAL_APPLIED_POINTS'] ?></p>'
								n +='</li>'
								n +='<li>'
								n +='<ul class="btns_and_price">'
								n +='<li>&nbsp;</li>'
								n +='<li><p id="pointsapplied">0</p></li>'                               
								n +='</ul>'                                    	
								n +='</li>'
								n +='</ul>'<!--item_row-->
								n +='</div>'<!--item_dv-->

								n +='<div class="item_dv no-border">'
								n +='<ul class="item_row">'
								n +='<li>'
								n +='<p class="cart-total"><?= $lang_resource['EXPORT_TOTAL_FINAL_TOTAL'] ?></p>'
								n +='</li>'
								n +='<li>'

								n +='<li><p class="cart-total pull-right" id="totalorderprice">0</p></li>'                                                               	
								n +='</li>'
								n +='</ul>'<!--item_row-->
								n +='</div>'<!--item_dv-->								
							}
						}		
					}
				}
			}
		}




		if(Main.User!=null){
			if(Main.ItemPointPermission==1){
				if(Main.availablepoint!=0){
					if(Main.GlobalPointSettings==0){
						for(var beid in Main.fetchbusinesspointsenabled){
							if(Shopping.ActiveBusiness==Main.fetchbusinesspointsenabled[beid].business_id){
								for(var ooid in Main.fetchusersorderbusiness){
									if(Shopping.ActiveBusiness==Main.fetchbusinesspointsenabled[beid].business_id){
										n +='<div class="item_dv no-border">'
										
										n +='<p class="cart-total" ><span id="orderprice7"><input type="text" id="pointssubmit" class="point_submit_field"></span>'
										n +='<button type="button" onclick="ProductOption.CalculatePointValue()" class="point_submit_button"> <?= $lang_resource['POINTS_SUBMIT'] ?> </button>'
										n +='</p>'
						
										n +='</div>'<!--item_dv-->
										break;
									}else{
										n +='';
									}
								}
							}
						}
					}else{
						for(var beid in Main.fetchbusinesspointsenabled){
							if(Shopping.ActiveBusiness==Main.fetchbusinesspointsenabled[beid].business_id){
								for(var ooid in Main.fetchusersorderbusiness){
									if(Shopping.ActiveBusiness==Main.fetchusersorderbusiness[ooid].business_id){
										n +='<div class="item_dv no-border">'
										n +='<ul class="item_row">'
										n +='<li>'
										n +='<p class="cart-total" id="orderprice7"><input type="text" id="pointssubmit"></p>'
										n +='</li>'
										n +='<li>'
										n +='<li><p class="cart-total pull-right"><button type="button" onclick="ProductOption.CalculatePointValue()"> <?= $lang_resource['POINTS_SUBMIT'] ?> </button></p></li>'
										n +='</li>'
										n +='</ul>'<!--item_row-->
										n +='</div>'<!--item_dv-->
										break;
									}
								}
							}
						}
					}
				}
			}
		}
		//Point Section

		n +='</div>'<!--product_table_dv-->


		if(Shopping.OrderNowButtonCheckwithMin() >= Main.NullToEmpty(Shopping.Business[u].minimum)){
			if(Main.WhereAmIData.reservestatus == 'reservation'){
				n +='<div class="ck_btn_dv">'
				n +='<button type="button" class="checkout_btn" onclick="Shopping.OpenCartCheck(true)"><?=$lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE']?></button>'
				n +='</div>'<!--ck_btn_dv-->
			}else{
				n +='<div class="ck_btn_dv" id="min_order">'
				n +='<button type="button" class="checkout_btn" onclick="Shopping.OpenCartCheck()"><?=$lang_resource['SHOPPING_FOURTH_CHECK_OUT']?></button>'
				n +='</div>'<!--ck_btn_dv-->
			}
		}else{
			if(Main.NullToEmpty(Shopping.Business[u].minimum) != 0 || Main.NullToEmpty(Shopping.Business[u].minimum) != ''){
				n +='<div class="ck_btn_dv" id="min_order">'
				n +='<button type="button" class="checkout_btn order_now_btn_gray"><?=$lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE']?>'+Shopping.Business[u].currency+' '+Shopping.Business[u].minimum+'</button>'
				n +='</div>'<!--ck_btn_dv-->
			}else{
				if(Main.WhereAmIData.reservestatus == 'reservation') {
					n +='<div class="ck_btn_dv">'
					n +='<button type="button" class="checkout_btn" onclick="Shopping.OpenCartCheck()"><?=$lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE']?></button>'
					n +='</div>'<!--ck_btn_dv-->
				}else{
					n +='<div class="ck_btn_dv" id="min_order">'
					n +='<button type="button" class="checkout_btn" onclick="Shopping.OpenCartCheck()"><?=$lang_resource['SHOPPING_FOURTH_CHECK_OUT']?></button>'
					n +='</div>'<!--ck_btn_dv-->
				}
			}
		}

		n +='</div>'<!--cart_dv-->
		n +='</div>'<!--col-md-3-->
		n +='</div>'<!--row-->
		n +='</div>'
		n +='</div>'<!--container-->

		Main.WhereAmILocationData = new Object();
		var locationPoint = JSON.parse(Shopping.Business[u].locationPoint);
		Main.WhereAmILocationData.latitud = locationPoint.latitud;
		Main.WhereAmILocationData.longitud = locationPoint.longitud;
		Main.WhereAmILocationData.zoom = 10;
		Main.WhereAmILocationData.zonesloc = Shopping.Business[u].zonesloc;


		//Info Page
		n +='<div class="container" id="plce_div_info" style="display: none"  >'
		n +=RestMenuList.infoDivHtml(u);
		n +='</div>'
		//Info Page

		//Review Page
		n +='<div class="container" id="plce_div_review" style="display: none">'
		n +='<div class="row tittle" id="tab_content-2">'

        n +='<div  id="review">'
		if(Main.NullToEmpty(myParam) !="" && Main.NullToEmpty(myParam) !="?review" ){
			RestMenuList.AddReview()
		}		
		n +='</div>'


		n +='<div class="row">'
		n +='<div class="col-md-6">'
		n +='<ul>'
		n +='<li><?=$lang_resource['MENU_LIST_RATING_AVERAGE']?> :</li>'
		n +=starsReview
		n +='</ul>'
		n +='</div>'
		if(parseInt(Shopping.Business[u].photosettings) == 1){
			n +='<div class="col-md-3" >'
			n +='<button class="btn btn-photo" onclick="RestMenuList.AddPhoto()" type="button"><img src="panel/<?=$moduleName?>/images/add_photo_icon_hover.png" alt=""><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></button>'
			n +='</div>'

			n +='<div class="col-md-3">'
		}else{
			n +='<div class="col-md-3 col-md-offset-3">'
		}			
			n +='<button class="btn btn-review" type="button" onclick="RestMenuList.AddReview()"><img src="panel/<?=$moduleName?>/images/star-review.png" alt=""><?=$lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></button>'
			n +='</div>'

		n +='</div>'
		n +='</div>'<!--row-->
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="white_box" id="reviewContent">'



		n +='</div>'<!--white_box-->
		n +='</div>'<!--col-md-12-->

		n +='</div>'<!--row-->
		n +='</div>'<!--container-->

		//Review Page

		//Offer Page
		n +='<div class="container" id="plce_div_offer" style="display: none">'
		n +='<div class="row" id="tab_content-4">'
		n +='<div class="col-md-12">'
		n +='<div class="white_box">'
		n +='<h2 class="tab_heading">'+Main.TitleCase(Shopping.Business[u].name)+'’s <?= $lang_resource['OFFERSSOF_V21'] ?></h2>'
		n +='<h5 class="tab_heading_5">'+ p +'</h5>'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="offers_tbl_dv">'
		n +='<div class="table-responsive" id="dicountContent">'
		
		n +='</div>'
		n +='</div>'<!--offers_tbl_dv-->
		n +='</div>'<!--col-md-12-->

		n +='</div>'<!--row-->

		n +='</div>'<!--white_box-->
		n +='</div>'<!--col-md-12-->

		n +='</div>'<!--row-->
		n +='</div>'<!--container-->
		//Offer Page

		
		//Reservation Page
		n +='<div class="container" id="plce_div_reserve" style="display: none" >'
		n +=RestMenuList.ReservationContentHtml(u)
		n +='</div>'
		//Reservation Page

		
		document.getElementById("shoppingbox").innerHTML = n;

		
		$.post("panel/lib/front-main.php", "f=allMenu&id=" + Shopping.Business[u].id+"&businesstype="+Main.WhereAmIData.businesstype, function (e) {
			Shopping.catalogMenu(e);
		});
		$.post("panel/lib/front-main.php", "f=FetchAllGalleryImg&bid="+Shopping.Business[u].id, function (b) {
			Shopping.photogal = JSON.parse(b)
			RestMenuList.Photogallery(b);
		});
		$.post("panel/lib/front-main.php", "f=FetchAllGalleryVideo&bid="+Shopping.Business[u].id, function (b) {
			Shopping.videogal = JSON.parse(b)
			RestMenuList.videogallery(b);
		});
		$.post("panel/lib/front-main.php", "f=FetchDiscountOffer&bid="+Shopping.Business[u].id, function (b) {
			RestMenuList.FuncOffer(b);
		});		   
		$.post("panel/lib/front-main.php", "f=FetchNeighborName&cid="+Shopping.Business[u].colony, function (b) {
			document.getElementById("colony_name").innerHTML = b;    
        });
		   		
		var schr = "";
		document.getElementById("src_bx").innerHTML = schr;//FetchAllGalleryImg

		if(parseInt(Shopping.Business[u].reviewsettings) == 1){
			$.post("panel/lib/front-main.php", "f=allreviewDate&id=" + Shopping.Business[u].id, function (e) {
				Shopping.allreview = JSON.parse(e);
				$.post("panel/lib/front-main.php", "f=businessphotoUser&id="+Shopping.Business[u].id, function (b) {
					Shopping.allphotouser = JSON.parse(b);
					RestMenuList.reviewprint(JSON.parse(e))	;			
				});
			});
		}
		
		//Resturant Menu page Banner
		$("#showcanvas").removeClass("inner-map");
		$("#showcanvas").removeAttr('style');
		document.getElementById("showcanvas").innerHTML = ban;
		$(".rest-body").removeClass('rest-body');
		//Resturant Menu page Banner


		document.getElementById("src_bxNew").style.display = "none";
        document.getElementById("shoppingbox").innerHTML = n;
	    //Ads.Init("shopmenuadscontainer", Main.WhereAmIData.city);
        document.getElementById("right").style.display = "none";
        if(Main.WhereAmIData.collecttype == "delivery"){
        	$("#deltypemenu").prop('checked', false);
        }else if(Main.WhereAmIData.collecttype == "pickup"){
        	$("#deltypemenu").prop('checked', true);
        }

        $(document).ready(function(){        	
			$('#deltypemenu').click(function(){
				var r = swal({
					title: "Are you sure?",
					text: "<?= $lang_resource['MENU_LIST_DELIVERY_STATUS_CHANGE'] ?>",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#088A08",
					cancelButtonColor: "#FF0040",
					confirmButtonText: "Ok",
					cancelButtonText: "Cancel",
					closeOnConfirm: true,
					closeOnCancel: true },
				function(isConfirm){
					if (isConfirm) {
						if($("#deltypemenu").prop("checked") == true){
							var deltype = 'pickup'
							Main.VerifyLocationMenu('pickup')		
						}
						else if($("#deltypemenu").prop("checked") == false){
							Visuals.ChooseDeliverOptionMenu()
						}
					} else {
						if(Main.WhereAmIData.collecttype == "delivery"){
							$("#deltypemenu").prop('checked', false);
						}else if(Main.WhereAmIData.collecttype == "pickup"){
							$("#deltypemenu").prop('checked', true);
						}						
					}
				});
//confirm("<?=$lang_resource[''] ?>");
			});
		});

        document.getElementById("dishsearch").onkeyup = function (){
            RestMenuList.PopulateDishesList(Shopping.Business[u].currency,Shopping.Config.Dishes.List.SortBy, true)
        };

		var qn = 0;
        for (var f in Shopping.Cart.business){
        	for (var e in Shopping.Cart.business[f].dishes){
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
            }
        }

        if(Shopping.Cart.business) {
            $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> '+qn+' <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
		}else{
			$("#orderprice").html("0.00");
			$("#cart_taxid").html("");
			$("#cart_servicefeeid").html("0.00");
			$("#itemCount").html('<?= $lang_resource['MENU_LIST_YOU_HAVE'] ?> <span> 0 <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
		}
     
        this.ReturnBtnAction = this.PrintBusinessList;
        RestMenuList.PopulateDishesList(Shopping.Business[u].currency,Shopping.Config.Dishes.List.SortBy, true)

		if(resSearch) {
			Shopping.Menuskiptab(5);
		}

		if( Main.clicktabName == "onlyReserve") {
			$("#tabMenu1").hide();
			Shopping.Menuskiptab(5);
		}
		

		$(function(){
			$( "#rdate" ).datepick({ minDate: 0,maxDate: 7	
			}); 
		});

		if(Main.NullToEmpty(myParam) !=""){
			Shopping.Menuskiptab(3);
		}        
    },
	

	 PopulateDishesList: function (currency,E, z)
    {
		

        if (z)
        {
			E='catname';

         
		   Shopping.Menu.dishes.sort(Main.SortByProperty(E));
		   Shopping.Menu.dishes =  Shopping.AscendingByName();
		   // Shopping.Menu.dishes.sort(Main.SortByProperty('name'));
		 
		 

            if (Shopping.Config.Dishes.List.SortByStatus == "max")
            {

                Shopping.Menu.dishes.reverse()
            }
        }
        else
        {
            if (Shopping.Config.Dishes.List.SortBy != E)
            {
                Shopping.Menu.dishes.sort(Main.SortByProperty(E));
                Shopping.Config.Dishes.List.SortByStatus = "min"
            }
            else
            {
                Shopping.Menu.dishes.reverse();
                if (Shopping.Config.Dishes.List.SortByStatus == "min")
                {
                    Shopping.Config.Dishes.List.SortByStatus = "max"
                }
                else
                {
                    Shopping.Config.Dishes.List.SortByStatus = "min"
                }
            }
        }

        Shopping.Config.Dishes.List.SortBy = E;
 Shopping.ActiveBusinesscurrency = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "currency");
        var A = new Array();
        for (var v in Shopping.Menu.dishes)
        {
            B = false;
            for (var x in Shopping.MenuCategories)
            {
                if (Shopping.Menu.dishes[v].category == Shopping.MenuCategories[x].id)
                {
                    if (Shopping.MenuCategories[x].enabled)
                    {
                        B = true
                    }
                }
            }
            if (B)
            {
                var u = document.getElementById("dishsearch").value.toLowerCase();
                if (Shopping.Menu.dishes[v].name.toLowerCase().indexOf(u) >= 0)
                {
                    A.push(Shopping.Menu.dishes[v])
                }
                else
                {
                    if (Main.GetPropertyValueOnPropertyValueFound(Shopping.MenuCategories, "id", Shopping.Menu.dishes[v].category, "name").toLowerCase().indexOf(u) >= 0)
                    {
                        A.push(Shopping.Menu.dishes[v]);
                        break
                    }
                }
            }
        }
        var r = '<div id="dishesresultsinner" class="menu_list_dv">'

      


        var C = "";
		var n = "";
        var D;
		var EmptyChk = false;
		
		/***Popular dish***/
		r += '<div id="popDivEmptyChk"><h2><?=$lang_resource['SHOPPING_MENU_MOST_POPULAR_DISH']?></h2><div id="popularsdish"></div></div>'
		var mp = "";
		
		/***Popular dish***/
       
        
		console.log(JSON.stringify(A))
		for (v in A){			
			if (A[v].isimg==1){
				C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/1/panel.jpg?c=" + Main.Random ;
			}
			if (A[v].isimg2==1){
				C2 = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/2/panel.jpg?c=" + Main.Random ;
			}
			if (A[v].isimg3==1){
				C3 = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/3/panel.jpg?c=" + Main.Random ;
			}     

			if (A[v].description){
				D = A[v].description.replace('"', "'").replace(/(\r\n|\n|\r)/gm,"");
			}else{
				D = ""
			}

			if(v!=0){
				if(A[v].catname != A[v-1].catname){
					if(Main.businesstemplate==1){
						r += '<h2>'+ A[v].catname +'</h2>'
					}else{
						r += '<div class="clearfix"></div>'
						r += '<h2>'+ A[v].catname +'</h2>'
					}
				}
			}
			if(v == 0){
				if(Main.businesstemplate==1){
					r += '<h2>'+ A[v].catname +'</h2>'
				}else{
					r += '<div class="clearfix"></div>'
					r += '<h2>'+ A[v].catname +'</h2>'
				}
			}

			if(Main.businesstemplate==1){
				if(A[v].feature == "t"){
					EmptyChk = true;
					mp +='<div class="menu_dv">'
					mp +='<div class="row">'
					mp +='<div class="col-md-8 col-sm-8">'
					if(Main.businessimagesettings != 0){
						if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0){
							mp +='<div style="width: 90px;height: 82px;float: left;overflow: hidden;margin: 0 10px 0 0;" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'
							if (A[v].isimg==1){	
								mp +='<img src="'+C+'" style="width: 90px;height: 90px;border-radius: 4px;">'
							}else if (A[v].isimg2==1){	
								mp +='<img src="'+C2+'" style="width: 90px;height: 90px;border-radius: 4px;">'
							}else if (A[v].isimg3==1){	
								mp +='<img src="'+C3+'" style="width: 90px;height: 90px;border-radius: 4px;">'
							}else{
								mp +='<img src="panel/images/dishes/default-dish.jpg" style="width: 90px;height: 90px;border-radius: 4px;">'
							}
							mp +='</div>'
						}else{
							mp +='<div style="width: 90px;height: 82px;float: left;overflow: hidden;margin: 0 10px 0 0;" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'
							mp +='<img src="panel/images/dishes/default-dish.jpg" style="width: 90px;height: 90px;border-radius: 4px;">'
							mp +='</div>'
						}
					}
					mp +='<h4 onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'+A[v].name+'</h4>'
					mp +='<p>'+D+'</p>'
					mp +='</div>'<!--col-md-8-->
					mp +='<div class="col-md-2 col-sm-2 col-xs-3">'
					if(Main.NullToEmpty(A[v].price) == ''){
						mp +='<p class="price_cur">'+currency+' <span  id="dish_' + A[v].id + '_price" >'+A[v].price+ '</p>'		
					}else{
						var lang1='';
						if(A[v].price!=''){		
							lang1=currency;
						}
						mp +='<p class="price_cur">'+lang1+'<span id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</span></p>'		
					}		
					if(Main.User!=null){
						if(Main.ItemPointPermission==1){
							if(A[v].points==0 || A[v].points== null){
							}else{	 
								mp +='<h4 class="point_text">'+A[v].points+' Point</h4>'
							}
						}
					}
					mp +='</div>'<!--col-md-2-->
					mp +='<div class="col-md-2 col-sm-2 col-xs-3">'
					mp +='<div class="cart_plus1" id="dish_' + A[v].id + '_imghide">'
					mp +='<button type="button" class="add_plus" id="dish_' + A[v].id + '_imglink"   onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">+</button>'
					mp +='</div>'<!--cart_plus-->
					mp +='</div>'<!--col-md-2-->
					mp +='</div>'<!--row-->

					mp +='<div class="row">'
					mp +='<div class="col-md-6 col-sm-6">'
					if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
						mp +='<input type="hidden" id="'+A[v].id+'" value="0">'
						mp +='<h4>Avaliable : '+Main.NullToEmpty(A[v].stock_qty)+'</h4>'
					}
					mp +='</div>'<!--col-md-6-->
					mp +='</div>'<!--row-->
					mp +='</div>'<!--menu_dv-->
				}

				r +='<div class="menu_dv">'
				r +='<div class="row">'
				r +='<div class="col-md-8 col-sm-8">'
				if(Main.businessimagesettings != 0){
					if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0){
						r +='<div style="width: 90px;height: 82px;float: left;overflow: hidden;margin: 0 10px 0 0;" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'
						if (A[v].isimg==1){	
							r +='<img src="'+C+'" style="width: 90px;height: 90px;border-radius: 4px;">'
						}else if (A[v].isimg2==1){	
							r +='<img src="'+C2+'" style="width: 90px;height: 90px;border-radius: 4px;">'
						}else if (A[v].isimg3==1){	
							r +='<img src="'+C3+'" style="width: 90px;height: 90px;border-radius: 4px;">'
						}else{
							r +='<img src="panel/images/dishes/default-dish.jpg" style="width: 90px;height: 90px;border-radius: 4px;">'
						}
						r +='</div>'
					}else{
						r +='<div style="width: 90px;height: 82px;float: left;overflow: hidden;margin: 0 10px 0 0;" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'
						r +='<img src="panel/images/dishes/default-dish.jpg" style="width: 90px;height: 90px;border-radius: 4px;">'
						r +='</div>'
					}
				}
				r +='<h4 onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'+A[v].name+'</h4>'
				r +='<p>'+D+'</p>'
				r +='</div>'<!--col-md-8-->
				r +='<div class="col-md-2 col-sm-2 col-xs-3">'
				if(Main.NullToEmpty(A[v].price) == ''){
					r +='<p class="price_cur">'+currency+' <span  id="dish_' + A[v].id + '_price" >'+A[v].price+ '</p>'		
				}else{
					var lang1='';
					if(A[v].price!=''){		
						lang1=currency;
					}
					r +='<p class="price_cur">'+lang1+'<span id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</span></p>'		
				}	
				if(Main.User!=null){
					if(Main.ItemPointPermission==1){
						if(A[v].points==0 || A[v].points== null){

						}else{	
							r +='<h4 class="point_text">'+A[v].points+' Point</h4>'
						}
					}
				}

				r +='</div>'<!--col-md-2-->
				r +='<div class="col-md-2 col-sm-2 col-xs-3">'
				r +='<div class="cart_plus1" id="dish_' + A[v].id + '_imghide">'
				r +='<button type="button" class="add_plus" id="dish_' + A[v].id + '_imglink" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">+</button>'
				r +='</div>'<!--cart_plus-->
				r +='</div>'<!--col-md-2-->
				r +='</div>'<!--row-->

				r +='<div class="row">'
				r +='<div class="col-md-6 col-sm-6">'
				if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
					r +='<input type="hidden" id="'+A[v].id+'" value="0">'
					r +='<h4>Avaliable : '+Main.NullToEmpty(A[v].stock_qty)+'</h4>'
				}
				r +='</div>'<!--col-md-6-->
				r +='</div>'<!--row-->
				r +='</div>'<!--menu_dv-->
			}else{
				if(A[v].feature == "t"){
					EmptyChk = true;
					mp += '<div class="col-md-4 col-sm-4">'
					mp += '<div class="restaurant_col">'
					mp += '<div class="rest_image" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'
					if(Main.businessimagesettings != 0){
						if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0){
							if (A[v].isimg==1){	
								mp +='<img src="'+C+'" >'
							}else if (A[v].isimg2==1){	
								mp +='<img src="'+C2+'" >'
							}else if (A[v].isimg3==1){	
								mp +='<img src="'+C3+'" >'
							}else{
								mp +='<img src="panel/images/dishes/default-dish.jpg" >'
							}
						}else{
							mp +='<img src="panel/images/dishes/default-dish.jpg" >'
						}
					}
					mp += '</div>'<!--rest_image-->
					mp += '<h4 onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'+A[v].name+'</h4>'
					mp += '<p>'+D+'</p>'
					mp += '<div class="adto-cart">'
					mp += '<div class="row">'
   					 mp += '<div class="col-md-6 col-sm-6">'
					if(Main.NullToEmpty(A[v].price) == ''){

						mp +='<div class="price_text"><span class="price_text_currency">'+currency+'</span><span class="price_text_bal" id="dish_' + A[v].id + '_price" >'+A[v].price+ '</span></div>'		
					}else{
						var lang1='';
						if(A[v].price!=''){		
							lang1=currency;
						}
						mp +='<div class="price_text"><span class="price_text_currency">'+lang1+'</span><span class="price_text_bal" id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</span></div>'		
					}					
				
				
					mp += '<div class="cart_plus2" id="dish_' + A[v].id + '_imghide">'
					mp += '<button type="button" class="add_plus" id="dish_' + A[v].id + '_imglink" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">+</button>'
					mp += '</div>'<!--cart_plus-->
					
					mp += '</div>'
   					mp += '<div class="col-md-6 col-sm-6">'
					
					if(Main.User!=null){
						if(Main.ItemPointPermission==1){
							if(A[v].points==0 || A[v].points== null){

							}else{	
								mp +='<h5 class="point_text_2">'+A[v].points+' Point</h5>'
							}
						}
					}
				mp += '</div>'
				mp += '</div>'
					
					mp += '</div>'<!--adto-cart-->
					mp += '<div class="clearfix"></div>'<!--clearfix-->
					mp += '</div>'<!--restaurant_col-->
					mp += '</div>'
					if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
						mp +='<input type="hidden" id="'+A[v].id+'" value="0">'
						mp +='<h4>Avaliable : '+Main.NullToEmpty(A[v].stock_qty)+'</h4>'
					}
				}

				r += '<div class="col-md-4 col-sm-4">'
				r += '<div class="restaurant_col">'
				r += '<div class="rest_image" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'
				if(Main.businessimagesettings != 0){
					if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0){
						if (A[v].isimg==1){	
							r +='<img src="'+C+'" >'
						}else if (A[v].isimg2==1){	
							r +='<img src="'+C2+'" >'
						}else if (A[v].isimg3==1){	
							r +='<img src="'+C3+'" >'
						}else{
							r +='<img src="panel/images/dishes/default-dish.jpg" >'
						}
					}else{
						r +='<img src="panel/images/dishes/default-dish.jpg" >'
					}
				}
				r += '</div>'<!--rest_image-->
				r += '<h4 onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'+A[v].name+'</h4>'
				r += '<p>'+D+'</p>'
				r += '<div class="adto-cart">'
				r += '<div class="row">'
   					 r += '<div class="col-md-6 col-sm-6">'
				
				if(Main.NullToEmpty(A[v].price) == ''){
					r +='<div class="price_text"><span class="price_text_currency">'+currency+'</span><span class="price_text_bal" id="dish_' + A[v].id + '_price" >'+A[v].price+ '</span></div>'		
				}else{
					var lang1='';
					if(A[v].price!=''){		
						lang1=currency;
					}
					r +='<div class="price_text"><span class="price_text_currency">'+lang1+'</span><span class="price_text_bal" id="dish_' + A[v].id + '_price" >'+Shopping.FormatPriceNotFree(A[v].price)+ '</span></div>'	
				}
				
							
				
				r += '<div class="cart_plus2" id="dish_' + A[v].id + '_imghide">'
				r += '<button type="button" class="add_plus" id="dish_' + A[v].id + '_imglink" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">+</button>'
				r += '</div>'<!--cart_plus-->
				
				r += '</div>'
   					r += '<div class="col-md-6 col-sm-6">'
				
				if(Main.User!=null){
					if(Main.ItemPointPermission==1){
						if(A[v].points==0 || A[v].points== null){

						}else{	
							r +='<h5 class="point_text_2">'+A[v].points+' Point</h5>'
						}
					}
				}
				r += '</div>'
				r += '</div>'
				
				r += '</div>'<!--adto-cart-->
				r += '<div class="clearfix"></div>'<!--clearfix-->
				r += '</div>'<!--restaurant_col-->
				r += '</div>'
				if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
					r +='<input type="hidden" id="'+A[v].id+'" value="0">'
					r +='<h4>Avaliable : '+Main.NullToEmpty(A[v].stock_qty)+'</h4>'
				}
			}
		}
		
	
		var n =''
			
		if(Shopping.Cart.business[0]){
			
			if(Shopping.Cart.business[0].dishes){			
				if (Shopping.Cart.business[0].dishes.length != 0) {
					
					for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){		
				
							n += RestMenuList.MenuCartlist(i)		
					}		
				}
			}
		}

		r +='</div>'
		document.getElementById("dishesresults").innerHTML = r;
		document.getElementById("popularsdish").innerHTML = mp;
		document.getElementById("plc_rgt_in").innerHTML = n;
		
		if(viewDevice != "Mobile") {
			
			(function() {
				var win = $(window);

				var sizes = {
					half: 0.5,
					full: 1,
					threequarter: 3/4,
					onefive: 1.5,
					triple: 3
				}

				RestMenuList.attach();
			})();
		}
		
		$('[data-simplebar-direction]').each(function () {
			var totalheight = $("#plc_rgt_in").height()  +  $("#chk_reserve").height();
			if(totalheight >180) {
				$(".simplebar-scrollbar").addClass('visible');
				$(this).simplebar();
			}
		});

		if(!EmptyChk)
			document.getElementById("popDivEmptyChk").innerHTML = "";

		Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();

        var s;
        var y;
        var t;
        var w;
        
     	tip.update();
        Shopping.UpdateCartTotals();
    },	
	attach: function () {	
		/**/
		if(Main.businesspageheadersetting == "1"){
			$(".stillpages .item:not(.use_manual)").stick_in_parent();
			$(".stillpages .item.use_manual").stick_in_parent({
				parent: ".stillpages",
				spacer: ".manual_spacer"
			});
		}else{
			 $(".stillpages .item:not(.use_manual)").stick_in_parent({
				offset_top: 100  
			 });
		}
       
	},
	
	infoDivHtml: function (u) {
		var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");
		var p = Shopping.Business[u].street + " - " + Shopping.Business[u].colony +"," + o;

		var n =''

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="white_box">'
		n +='<h2 class="tab_heading">'+Shopping.Business[u].name+'</h2>'
		n +="<input type='hidden' id='deladd' value='"+p+"'>"
		n +='<h5 class="tab_heading_5">'+ p +'</h5>'
		n +='<div class="row">'
		n +='<div class="col-md-6">'
		n +='<h3 class="tab_heading_3"><?= $lang_resource['CATALOG_V21'] ?> : <?= $lang_resource['MENU_LIST_OPENING_TIME'] ?></h3>'
		n +='<div class="catalog_line_box">'
		n +='<table class="table table-hover" id="catlogview">'
		
		n +='</table>'
		n +='</div>'<!--catalog_line_box-->
		n +='</div>'<!--col-md-6-->


		n +='<div class="col-md-6 map">'
		n =='<input type="hidden" id="delbid" value="'+Shopping.Business[u].id+'">'
		n +='<h3 class="tab_heading_3"><?= $lang_resource['DELIVERYL_V21'] ?> <span id="deliveryItemPrice"></span></h3>'
		n +='<div class=" info_map businessmapbox" id="mapbox12">'
		//n +='<img src="images/info_map.png">'
		n +='</div>'<!--info_map-->
		n +='</div>'<!--col-md-6-->
		n +='</div>'<!--row-->
		if(Main.NullToEmpty(Shopping.Business[u].abusiness)!=""){
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<h3 class="tab_heading_3"><?= $lang_resource['ABOUTR_V21'] ?></h3>'
		n +='<div class="line_box">'
		n +='<p>'+Main.NullToEmpty(Shopping.Business[u].abusiness)+'</p>'
		n +='</div>'<!--line_box-->
		n +='</div>'<!--col-md-12-->
		n +='</div>'<!--row-->
		}

		n +='<div class="row">'
		n +='<div class="col-md-6" id="photo_div">'
		n +='<h3 class="tab_heading_3"><?= $lang_resource['PHOTOG_V21'] ?></h3>'
		n +='<div class="line_box">'
		n +='<ul class="photo_gallery" id="infophotpdiv">'
		
		n +='</ul>'
		n +='<div class="clearfix"></div>'
		n +='</div>'<!--line_box-->
		n +='</div>'<!--col-md-6-->
		n +='<div class="col-md-6" id="video_div">'
		n +='<h3 class="tab_heading_3"><?= $lang_resource['VIDEOG_V21'] ?></h3>'
		n +='<div class="line_box" id="infovideodiv">'
		
		n +='</div>'<!--line_box-->
		n +='</div>'<!--col-md-6-->
		n +='</div>'<!--row-->
		n +='</div>'<!--white_box-->
		n +='</div>'<!--col-md-12-->

		<!--Modal Preview Galery-->
		n += '<div id="modal-galery"></div>'
		n +='</div>'<!--row-->

		return n;
	},
	ReservationContentHtml: function (u) {
		Forms.Clean("reserveform", "popupmainbuttonok");
		GoogleMap.Clean();
		Main.ActiveForm = "reserveform";

		var b = false;
		c = new Object();
		Forms.Form.reserveform.type = "create"

		var d = new Array();
		d.push({
			id: "",
			caption: "<?=$lang_resource['RESERVATION_NO_GUEST']?>"
		});

		for (var i=1;i<=8;i++){
			d.push({
				id: i,
				caption: i
			})
		}

		var h = new Array();
		h.push({
			id: "-1",
			caption: "<?=$lang_resource['RESERVATION_NO_HOUR']?>",
		});
		var mi = new Array();
		mi.push({
			id: "-1",
			caption: "<?=$lang_resource['RESERVATION_NO_MUNITE']?>",
		});

		for (k=0;k<60;k=k+15){
			mi.push({
				id: k,
				caption: Main.zeroPad(k,2)
			})
		}

		//Time selection settings. 
		time_format="<?=$lang_resource['TIME_FORMAT']?>";
		for (j=0;j<24;j++){
			if(time_format=="12"){
				capj= Main.convertTimeFormatHour(j);
			}else{
				capj=Main.zeroPad(j,2);
			}	

			h.push({
				id: j,
				caption: capj
			})
		}
		if(!Main.WhereAmIData.rhour){
			Main.WhereAmIData.rhour = -1;
		}
		if(!Main.WhereAmIData.rmin){
			Main.WhereAmIData.rmin = -1;
		}


		/*var dd= Main.WhereAmIData.rdate

		var dd1=dd.substr(3,2)

		var curr_date= Main.curr_date;
		var curr_hour = Main.curr_hour;
		var curr_minute=Main.curr_minute;

		////Hour function start	
		
		if(dd1 == curr_date){
			if(curr_minute>45){
				for(var i=curr_hour+1; i<24; i++){	
					if(time_format=="12"){
						capi= Main.convertTimeFormatHour(i);
					}else{
						capi=Main.zeroPad(i,2);
					}	
					h.push({
						id: i,
						caption: capi
					})
				}
			}else{
				for(var i=curr_hour; i<24; i++){
					if(time_format=="12"){
						capi= Main.convertTimeFormatHour(i);
					}else{
						capi=Main.zeroPad(i,2);
					}
					h.push({
						id: i,
						caption: capi
					})
				}
			}
		}else{
			for(var i=0; i<24; i++){
				if(time_format=="12"){
					capi= Main.convertTimeFormatHour(i);
				}else{
					capi=Main.zeroPad(i,2);
				}					
				h.push({
					id: i,
					caption: capi
				})
			}
		}

		var fulldate= Main.WhereAmIData.rdate
		var datechange=fulldate.substr(3,2);

		var hrs =Main.WhereAmIData.rhour;
		var date = new Date();
		var curr_date1 = date.getDate();
		var curr_hour1=date.getHours();
		var curr_minute1=date.getMinutes();

		if(curr_date1 == datechange){
			if(hrs > curr_hour1){ 
				for (i=0;i<60;i=i+15){
					var j = Main.zeroPad(i,2);
					mi.push({
						id: j,
						caption: j
					})
				}
			}else{
				if(curr_minute1<15){
					for (i=15;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						mi.push({
							id: j,
							caption: j
						})
					}
				}else if(curr_minute1<30){
					for (i=30;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						mi.push({
							id: j,
							caption: j
						})
					}
				}else if(curr_minute1<45){
					for (i=45;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						mi.push({
							id: j,
							caption: j
						})
					}
				}	
			}
		}else{
			for (i=0;i<60;i=i+15){
				var j = Main.zeroPad(i,2);
				mi.push({
					id: j,
					caption: j
				})
			}
		}*/
			

		

		var n =''
		n +='<div id="tab_content-5">'
		n +='<div class="white_box" style="margin-bottom:30px;">'
		n +='<div class="row">'
		n +='<div class="col-md-3">'
		n +='<div class=" field_dv">'
		n +=Forms.CreateSelectPropertyNew3("reserveform", "guest", d, Main.NullToEmpty(Main.WhereAmIData.guest), false,"", false)
		n +='</div>'<!--field_dv-->
		n +='</div>'<!--col-md-3-->

		n +='<div class="col-md-3">'
		n +='<div class=" field_dv">'
		n +=Forms.CreateInputProperty10("reserveform", "rdate",  Main.NullToEmpty(Main.WhereAmIData.rdate), false,"", false)
		n +='</div>'<!--field_dv-->
		n +='</div>'<!--col-md-3-->

		n +='<div class="col-md-3">'
		n +='<div class=" field_dv">'
		n +=Forms.CreateSelectPropertyNew32("reserveform", "rhour", h, Main.NullToEmpty(Main.WhereAmIData.rhour), false,"", false)
		n +='</div>'<!--field_dv-->
		n +='</div>'<!--col-md-3-->

		n +='<div class="col-md-3">'
		n +='<div class=" field_dv">'
		n +=Forms.CreateSelectPropertyNew("reserveform", "rmin", mi,  Main.NullToEmpty(Main.WhereAmIData.rmin), false,"", false)
		n +='</div>'<!--field_dv-->
		n +='</div>'<!--col-md-3-->

		n +='</div>'<!--row-->
		n +='</div>'<!--white_box-->


		n +='<div class="row">'
		n +='<div class="col-md-4 col-md-offset-4"><button class=" red_btn_small" type="button" onclick="Shopping.SearchSaveReserveTime()"><?= $lang_resource['MENU_LIST_SEARCH_SAVE'] ?></button></div>'<!--col-md-4-->

		n +='</div><br>'

		var tableBox = false
		var RoomBox = false
		var FreeBox = false

		if(Main.WhereAmIData.rhour != -1 && Main.WhereAmIData.rmin != -1){
			for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 2){
					RoomBox = true
				}else if(Shopping.reserves[r].rtype == 1){
					tableBox = true
				}else if(Shopping.reserves[r].rtype == 3){
					FreeBox = true
				}
			}
		}

		if(tableBox == false && RoomBox == false && FreeBox == false  ) {
			n +='<p class="text-center"><?=$lang_resource['SHOPPING_RESERVATION_TABLE_EMPTY']?></p>'
		}else{
			//Room
			if(RoomBox == true) {
				n +='<h3 class="room_heading"><?=$lang_resource['FRONT_RESERVATION_ROOM']?></h3>'
				n +='<div class="room_bg wrapp">'

				for (r in Shopping.reserves){
					if(Shopping.reserves[r].rtype == 2){
						n +='<div class="room">'
						n +='<h2>'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>'						

						Shopping.reservesc = JSON.parse(Shopping.reserves[r].schedule);
						//Time selection settings. 
						time_format="<?=$lang_resource['TIME_FORMAT']?>";
						if(time_format=="12"){
							closetime1='';
							opentime1='';
							closetime='';
							opentime='';
							opentime1= Main.convertTimeFormat(Shopping.reservesc.opens.hour1,Shopping.reservesc.opens.minute1);
							closetime1= Main.convertTimeFormat(Shopping.reservesc.closes.hour1,Shopping.reservesc.closes.minute1);
							opentime= Main.convertTimeFormat(Shopping.reservesc.opens.hour,Shopping.reservesc.opens.minute);
							closetime= Main.convertTimeFormat(Shopping.reservesc.closes.hour,Shopping.reservesc.closes.minute);
						}else{
							if(Shopping.reservesc.closes.hour1 > 24){					
                				closetime1 = Shopping.reservesc.closes.hour1 - 24;
                			}else{
                				closetime1 = Shopping.reservesc.closes.hour1;
                			}
                			if(Shopping.reservesc.closes.hour > 24){
                				closetime = Shopping.reservesc.closes.hour - 24;                		
                			}else{
                				closetime = Shopping.reservesc.closes.hour
                			}

							opentime1=Main.zeroPad((Shopping.reservesc.opens.hour1),2)+':'+Main.zeroPad((Shopping.reservesc.opens.minute1),2);
							closetime1=Main.zeroPad((closetime1),2)+':'+Main.zeroPad((Shopping.reservesc.closes.minute1),2);
							opentime=Main.zeroPad((Shopping.reservesc.opens.hour),2)+':'+Main.zeroPad((Shopping.reservesc.opens.minute),2);
							closetime=Main.zeroPad((closetime),2)+':'+Main.zeroPad((Shopping.reservesc.closes.minute),2);

							if(Shopping.reservesc.closes.hour1 > 24){
                				closetime1 = closetime1 +" am";
                			}
                			if(Shopping.reservesc.closes.hour > 24){
                				closetime = closetime +" am";
                			}
							
               
						}
						
						if((parseInt(Shopping.reservesc.opens.hour1)==0) && (parseInt(Shopping.reservesc.opens.minute1)==0) && (parseInt(Shopping.reservesc.closes.hour1)==0) && (parseInt(Shopping.reservesc.closes.minute1)==0)){
							first1='';
						}else{
							first1='<?=$lang_resource['PANEL_RESERVATION_FROM']?>: '+opentime1+' <?=$lang_resource['PANEL_RESERVATION_TO']?> '+closetime1+'';
						}
						first2='';
						first3='';
						if((first1!='') && (first3!='')){
							first2=' &';
						}
						if((parseInt(Shopping.reservesc.opens.hour)==0) && (parseInt(Shopping.reservesc.opens.minute)==0) && (parseInt(Shopping.reservesc.closes.hour)==0) && (parseInt(Shopping.reservesc.closes.minute)==0)){
							first3='';
						}else{
							first3='<?=$lang_resource['PANEL_RESERVATION_FROM']?>: '+opentime+' <?=$lang_resource['PANEL_RESERVATION_TO']?> '+closetime+'';
						}
						if((first1!='') && (first3!='')){
							first2=' &';
						}

						n +='<p><?= $lang_resource['RESERVATION_OPENING_TIME'] ?>: <br><span>'+first1+first2+first3+'</span></p>'
						var countg = Shopping.reserves[r].guest;
						n +='<div class="reserve_teb_wrapper">'
						n +='<table class="r_table">'
						for(var countr =1; countr<=countg; countr++){
							if(countr % 4 == 1){
								n +='<tr>'
							}   
							if(Shopping.reservesbooked[0].room)	{
								if(Shopping.reservesbooked[0].room.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){
									n +='<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookRoom('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>'
								}else{
									n +='<td><button class="room_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></td>'
								}
							}else{
								n +='<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookRoom('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>'
							}
							if(countr % 4 == 0 || countr == countg){
								n +='</tr>'
							}  

						}
						n +='</table>'
						n +='</div>'<!--reserve_teb_wrapper-->
						n +='</div>'<!--room-->
					}
				}
				n +='</div>'<!--room_bg-->
			}
			//Room

			//Table
			if(tableBox == true) {
				n +='<h3 class="room_heading"><?=$lang_resource['FRONT_RESERVATION_TABLE']?></h3>'
				n +='<div class="room_bg wrapp">'

				for (r in Shopping.reserves){
					if(Shopping.reserves[r].rtype == 1){
						n +='<div class="room">'
						n +='<h2>'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>'						

						Shopping.reservesc = JSON.parse(Shopping.reserves[r].schedule);
						//Time selection settings. 
						time_format="<?=$lang_resource['TIME_FORMAT']?>";
						if(time_format=="12"){
							closetime1='';
							opentime1='';
							closetime='';
							opentime='';
							opentime1= Main.convertTimeFormat(Shopping.reservesc.opens.hour1,Shopping.reservesc.opens.minute1);
							closetime1= Main.convertTimeFormat(Shopping.reservesc.closes.hour1,Shopping.reservesc.closes.minute1);
							opentime= Main.convertTimeFormat(Shopping.reservesc.opens.hour,Shopping.reservesc.opens.minute);
							closetime= Main.convertTimeFormat(Shopping.reservesc.closes.hour,Shopping.reservesc.closes.minute);
						}else{
							opentime1=Main.zeroPad((Shopping.reservesc.opens.hour1),2)+':'+Main.zeroPad((Shopping.reservesc.opens.minute1),2);
							closetime1=Main.zeroPad((Shopping.reservesc.closes.hour1),2)+':'+Main.zeroPad((Shopping.reservesc.closes.minute1),2);
							opentime=Main.zeroPad((Shopping.reservesc.opens.hour),2)+':'+Main.zeroPad((Shopping.reservesc.opens.minute),2);
							closetime=Main.zeroPad((Shopping.reservesc.closes.hour),2)+':'+Main.zeroPad((Shopping.reservesc.closes.minute),2);

							if(opentime1 > 24){
                				opentime1 = opentime1 - 24;
                				opentime1 = opentime1 +"am";
                			}
                			if(opentime > 24){
                				opentime = opentime - 24;
                				opentime = opentime +"am";
                			}
						}
						
						if((parseInt(Shopping.reservesc.opens.hour1)==0) && (parseInt(Shopping.reservesc.opens.minute1)==0) && (parseInt(Shopping.reservesc.closes.hour1)==0) && (parseInt(Shopping.reservesc.closes.minute1)==0)){
							first1='';
						}else{
							first1='<?=$lang_resource['PANEL_RESERVATION_FROM']?>: '+opentime1+' <?=$lang_resource['PANEL_RESERVATION_TO']?> '+closetime1+'';
						}
						first2='';
						first3='';
						if((first1!='') && (first3!='')){
							first2=' &';
						}
						if((parseInt(Shopping.reservesc.opens.hour)==0) && (parseInt(Shopping.reservesc.opens.minute)==0) && (parseInt(Shopping.reservesc.closes.hour)==0) && (parseInt(Shopping.reservesc.closes.minute)==0)){
							first3='';
						}else{
							first3='<?=$lang_resource['PANEL_RESERVATION_FROM']?>: '+opentime+' <?=$lang_resource['PANEL_RESERVATION_TO']?> '+closetime+'';
						}
						if((first1!='') && (first3!='')){
							first2=' &';
						}

						n +='<p><?= $lang_resource['RESERVATION_OPENING_TIME'] ?>: <br><span>'+first1+first2+first3+'</span></p>'
						var countg = Shopping.reserves[r].guest;
						n +='<div class="reserve_teb_wrapper">'
						n +='<table class="r_table">'
						for(var countr =1; countr<=countg; countr++){
							if(countr % 4 == 1){
								n +='<tr>'
							}   
							if(Shopping.reservesbooked[0].table)	{
								if(Shopping.reservesbooked[0].table.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){
									n +='<td><button class="tbl_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookTable('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>'
								}else{
									n +='<td><button class="tbl_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></td>'
								}
							}else{
								n +='<td><button class="tbl_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookTable('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>'
							}
							if(countr % 4 == 0 || countr == countg){
								n +='</tr>'
							}  

						}
						n +='</table>'
						n +='</div>'<!--reserve_teb_wrapper-->
						n +='</div>'<!--room-->
					}
				}
				n +='</div>'<!--room_bg-->
			}
			//Table

			//Free
			if(FreeBox == true) {
				n +='<h3 class="room_heading"><?=$lang_resource['FRONT_RESERVATION_BOOKING_AVAILABILTY']?></h3>'
				n +='<div class="room_bg wrapp">'

				for (r in Shopping.reserves){
					if(Shopping.reserves[r].rtype == 3){
						n +='<div class="room">'
						n +='<h2>'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>'						

						Shopping.reservesc = JSON.parse(Shopping.reserves[r].schedule);
						//Time selection settings. 
						time_format="<?=$lang_resource['TIME_FORMAT']?>";
						if(time_format=="12"){
							closetime1='';
							opentime1='';
							closetime='';
							opentime='';
							opentime1= Main.convertTimeFormat(Shopping.reservesc.opens.hour1,Shopping.reservesc.opens.minute1);
							closetime1= Main.convertTimeFormat(Shopping.reservesc.closes.hour1,Shopping.reservesc.closes.minute1);
							opentime= Main.convertTimeFormat(Shopping.reservesc.opens.hour,Shopping.reservesc.opens.minute);
							closetime= Main.convertTimeFormat(Shopping.reservesc.closes.hour,Shopping.reservesc.closes.minute);
						}else{
							opentime1=Main.zeroPad((Shopping.reservesc.opens.hour1),2)+':'+Main.zeroPad((Shopping.reservesc.opens.minute1),2);
							closetime1=Main.zeroPad((Shopping.reservesc.closes.hour1),2)+':'+Main.zeroPad((Shopping.reservesc.closes.minute1),2);
							opentime=Main.zeroPad((Shopping.reservesc.opens.hour),2)+':'+Main.zeroPad((Shopping.reservesc.opens.minute),2);
							closetime=Main.zeroPad((Shopping.reservesc.closes.hour),2)+':'+Main.zeroPad((Shopping.reservesc.closes.minute),2);

							if(opentime1 > 24){
                				opentime1 = opentime1 - 24;
                				opentime1 = opentime1 +"am";
                			}
                			if(opentime > 24){
                				opentime = opentime - 24;
                				opentime = opentime +"am";
                			}
						}
						
						if((parseInt(Shopping.reservesc.opens.hour1)==0) && (parseInt(Shopping.reservesc.opens.minute1)==0) && (parseInt(Shopping.reservesc.closes.hour1)==0) && (parseInt(Shopping.reservesc.closes.minute1)==0)){
							first1='';
						}else{
							first1='<?=$lang_resource['PANEL_RESERVATION_FROM']?>: '+opentime1+' <?=$lang_resource['PANEL_RESERVATION_TO']?> '+closetime1+'';
						}
						first2='';
						first3='';
						if((first1!='') && (first3!='')){
							first2=' &';
						}
						if((parseInt(Shopping.reservesc.opens.hour)==0) && (parseInt(Shopping.reservesc.opens.minute)==0) && (parseInt(Shopping.reservesc.closes.hour)==0) && (parseInt(Shopping.reservesc.closes.minute)==0)){
							first3='';
						}else{
							first3='<?=$lang_resource['PANEL_RESERVATION_FROM']?>: '+opentime+' <?=$lang_resource['PANEL_RESERVATION_TO']?> '+closetime+'';
						}
						if((first1!='') && (first3!='')){
							first2=' &';
						}

						n +='<p><?= $lang_resource['RESERVATION_OPENING_TIME'] ?>: <br><span>'+first1+first2+first3+'</span></p>'
						var countg = Shopping.reserves[r].guest;
						n +='<div class="reserve_teb_wrapper">'
						n +='<table class="r_table">'
						for(var countr =1; countr<=countg; countr++){
							if(countr % 4 == 1){
								n +='<tr>'
							}   
							if(Shopping.reservesbooked[0].free)	{
								if(Shopping.reservesbooked[0].free.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){
									n +='<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookFree('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>'
								}else{
									n +='<td><button class="room_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></td>'
								}
							}else{
								n +='<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookFree('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>'
							}
							if(countr % 4 == 0 || countr == countg){
								n +='</tr>'
							}  

						}
						n +='</table>'
						n +='</div>'<!--reserve_teb_wrapper-->
						n +='</div>'<!--room-->
					}
				}
				n +='</div>'<!--room_bg-->
			}
			//Free	

			n +='<div id="ReservatioPayModule" style="display:none">'	
			n +='<h3 class="room_heading"><?= $lang_resource['V3_ORDER_RESERVATION_DETAILS'] ?></h3>'
			n +='<div class="room_bg wrapp">'
			n +='<div class="room">'

			n +='<div class="row">'
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] ?>:</label>'
			n +='<input type="text" class="form-control" id="reservename" value="'+Main.NullToEmpty(Shopping.Cart.buyer.name)+'" onkeyup="Shopping.UserUpdate(this,\'reservename\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_USERS_EMAIL_HEADER'] ?>:</label>'
			n +='<input type="text" class="form-control" id="reserveemail" value="'+Main.NullToEmpty(Shopping.Cart.buyer.email)+'" onkeyup="Shopping.UserUpdate(this,\'reserveemail\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['Phone_V2'] ?>:</label>'
			n +='<input type="text" class="form-control" id="reservetel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'reservetel\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->
			n +='<div class="col-md-3">'
			n +='<div class="book_sms">'
			n +='<input type="checkbox" id="twillo" onclick="Shopping.UpdateTwilio(this)">'
			n +='<label for="twillo"><?= $lang_resource['CHECKOUT_RECEIVE_SMS'] ?></label>'
			n +='</div>'
			n +='</div>'<!--col-md-3-->
			n +='</div>'<!--row-->

			//  Braintree Field
			n +='<div class="row braintree_field" style="display:none;">'
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] ?>:</label>'
			n +='<input type="text" class="form-control" id="braintreecard" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?>:</label>'
			n +='<input type="text" class="form-control" id="braintreeexpiry" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?>:</label>'
			n +='<input type="text" class="form-control" id="braintreecvv" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->			
			n +='</div>'<!--row-->
			// Braintree Field

			// Authorize.net Field
			n +='<div class="row au_ne_pay" style="display:none;">'
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?>:</label>'
			n +='<input type="text" class="form-control" id="cardno" onkeyup="Shopping.UserUpdate(this,\'cardno\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?>:</label>'
			n +='<input type="text" class="form-control" id="expmm" onkeyup="Shopping.UserUpdate(this,\'expmm\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?>:</label>'
			n +='<input type="text" class="form-control" id="expyy" onkeyup="Shopping.UserUpdate(this,\'expyy\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->			
			n +='</div>'<!--row-->
			// Authorize.net Field

			//CardSave Field
			n +='<div class="row cardsaveclass" style="display:none;">'
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CHECKOUT_FULL_ADDRESS'] ?>:</label>'
			n +='<input type="text" class="form-control" id="buyeraddress" onkeyup="Shopping.UserUpdate(this,\'address\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['Neighbourhood_V2'] ?>:</label>'
			n +='<input type="text" class="form-control" id="buyercolony" onkeyup="Shopping.UserUpdate(this,\'colony\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?>:</label>'
			n +='<input type="text" class="form-control" id="cityname1" onkeyup="Shopping.UserUpdate(this,\'cityname\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->	

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?>:</label>'
			n +='<input type="text" class="form-control" id="zip1" onkeyup="Shopping.UserUpdate(this,\'zip\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->			
			n +='</div>'<!--row-->
			n +='<div class="row cardsaveclass" style="display:none;">'
			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?>:</label>'
			n +='<input type="text" class="form-control" id="cardsavecardno" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?>:</label>'
			n +='<input type="text" class="form-control" id="cardsaveexpmm" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?>:</label>'
			n +='<input type="text" class="form-control" id="cardsaveexpyy" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->	

			n +='<div class="col-md-3">'
			n +='<div class=" field_dv">'
			n +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?>:</label>'
			n +='<input type="text" class="form-control" id="cardsavecvv" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')">'
			n +='</div>'<!--field_dv-->
			n +='</div>'<!--col-md-3-->			
			n +='</div>'<!--row-->
			//CardSave Field

			
			n +='<div class="table-responsive book_tbl_wrapper">'
			n +='<table class="table table-striped">'                              
			n +='<tr id="room_av" style="display:none;">'
			n +='<td><span id="room_qty" class="room_qty">0</span> X <?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></td>'
			roomdisplay = 'style="display:none"';	
			n +='<td>:</td>'
			n +='<td id="roomtd" '+roomdisplay+'>'+Main.car+'<span id="room_price" class="room_price">0</span></td>'
			n +='</tr>'
			n +='<tr id="table_av" style="display:none;">'
			n +='<td><span id="table_qty" class="table_qty">0</span> X <?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></td>'
			tabledisplay = 'style="display:none"';	
			n +='<td>:</td>'
			n +='<td id="tabletd" '+tabledisplay+'>'+Main.car+'<span id="table_price" class="table_price">0</span></td>'
			n +='</tr>'
			n +='<tr id="free_av" style="display:none;">'
			n +='<td><span id="free_qty" class="free_qty">0</span> X <?= $lang_resource['FRONT_RESERVATION_FREE'] ?></td>'
			freedisplay = 'style="display:none"';	
			n +='<td>:</td>'
			n +='<td id="freetd" '+freedisplay+' >'+Main.car+'<span id="free_price" class="free_price">0</span></td>'
			n +='</tr>'
			n +='<tr id="total_av" style="display:none;">'
			n +='<td><strong><?= $lang_resource['EXPORT_TOTAL'] ?></strong></td>'
			globaltotaldisplay = 'style="display:none;"';
			n +='<td>:</td>'
			n +='<td '+freedisplay+' id="totaltd" >'+Main.car+'<span id="total_price" class="total_price">0</span></td>'
			n +='</tr>'                              
			n +='</table>'
			n +='</div>' 

			n +='</div>'<!--room-->
			n +='</div>'<!--room_bg--> 

			n +='<h3 class="room_heading"><?= $lang_resource['EXPORT_PAYMENT_METHOD'] ?></h3>'
			n +='<div class="">'
			n +='<div class="room" id="reserve_paymethod" style="display:none;">'
			
			Shopping.Cart.reservepaymethod = new Object();
			Shopping.Cart.reservepaymethoddetails = new Object();

			var paymentdetails = JSON.parse(Shopping.Business[u].paymentdetails);


			for(var reservpay in paymentdetails){
				if(paymentdetails[reservpay] == 't'){
					Shopping.Cart.reservepaymethoddetails[reservpay] = true
				}else{
					Shopping.Cart.reservepaymethoddetails[reservpay] = false
				}
			}

			for(var reservpay in paymentdetails){					
				Shopping.Cart.reservepaymethod[reservpay] = false					
			}
			n +=Payment.ReservatioPayment(u)

			n +='</div>'<!--room-->
			n +='</div>'
			n +='</div>'



			n +='<div class="">'
			n +='<div class="room">'
			n +='<div class="row ck_btns">'
			n +='<div class="col-md-3" id="bottom1-order-btn" >'
			n +='<button type="button" class=" red_btn_small" id="reservepayment" onclick="Shopping.ReserveNow()"><?= $lang_resource['PAYMENT_RESERVE_NOW'] ?></button>'
			n +='</div>'<!--col-md-4-->
			n +='</div>'<!--row-->

			n +='</div>'<!--room-->
			n +='</div>'
		}

		
		n +='</div>'<!--tab_content-5-->

		
		return n;
	},
	ReserveplusOrderContent: function () {
		
	 					var n ='<tr>';
                         n +='<td colspan="2" class="total"><?= $lang_resource['SHOPPING_RESERVATION_OPTIONS'] ?></td>';
                         
					   	n +='</tr>';
						if(globalReserve.Room.length!="0") {
					    
						n +='<tr>';
                        n +='<td width="50%" ><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?> X <span>'+globalReserve.Room.length+'</span></td>';
						 if(Shopping.Cart.reservePrice.Room) {
							 if(Shopping.Cart.reservePrice.Room==''){
								 Shopping.Cart.reservePrice.Room="0.00";
							 }
							  n +='<td width="40%" >'+Main.car+''+Shopping.Cart.reservePrice.Room+'</td>';
						 }
                         n +='</tr>';
						}
						if(globalReserve.Table.length!="0") {
						
							 n +='<tr>';
                         n +='<td width="50%" ><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?> X <span>'+globalReserve.Table.length+'</span></td>';
						 if(Shopping.Cart.reservePrice.Table) {
							  if(Shopping.Cart.reservePrice.Table==''){
								 Shopping.Cart.reservePrice.Table="0.00";
							 }
						 n +='<td width="40%" >'+Main.car+''+Shopping.Cart.reservePrice.Table+'</td>';
						 }
                        
					     n +='</tr>';
						}
						if(globalReserve.Free.length!="0") {
						 n +='<tr>';
                         n +='<td width="50%" ><?= $lang_resource['FRONT_RESERVATION_FREE'] ?> X <span >'+globalReserve.Free.length+'</span></td>';
                         if(Shopping.Cart.reservePrice.Free) {
							   if(Shopping.Cart.reservePrice.Free==''){
								 Shopping.Cart.reservePrice.Free="0.00";
							 }
							  n +='<td width="40%" >'+Main.car+''+Shopping.Cart.reservePrice.Free+'</td>';
						 }
					     n +='</tr>';
						}
						if(Main.NullToEmpty(Main.WhereAmIData.rdate)!="") {
						  n +='<tr>';
                         n +='<td width="50%" ><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?>:</td>';
                         n +='<td width="30%" ><span >'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'</span></td>';
					     n +='</tr>';
							}
						if(Main.NullToEmpty(Main.WhereAmIData.rhour)!="-1") {	
						  n +='<tr>';
                         n +='<td width="50%"><?= $lang_resource['V3_ORDER_TIME'] ?> :</td>';
                         n +='<td width="30%" ><span >'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rhour)),2)+':'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rmin)),2)+'</span></td>';
					     n +='</tr>';
					   	n +='<tr>';
						}
						n +='<tr style="display:none">';
                         n +='<td width="50%" class="total"><?= $lang_resource['EXPORT_TOTAL'] ?> :</td>';
						  if(globalReserveTotalPrice==''){
								globalReserveTotalPrice="0.00";
							 }
                         n +='<td width="30%" class="total_price1">'+Main.car+''+globalReserveTotalPrice+'</td>';
					   n +='</tr>';
					   n +='<tr style="display:none">';
                         n +='<td width="50%" class="total"><?= $lang_resource['MENU_LIST_GRAND_TOTAL'] ?>  :</td>';
						  if(Shopping.Cart.grandtotal==''){
								Shopping.Cart.grandtotal="0.00";
							 }
                         n +='<td width="30%" class="total_price1" ><span id="grand_total">'+Main.car+'<b>'+Shopping.Cart.grandtotal+'</b> </span></td>';
					   n +='</tr>';
					   
					   $("#chk_reserve").html(n);
					   
					  
	},
	 PopulateCart: function ()
    {
		
       
	   
        var l = "";
	var p = "";
        for (i in Shopping.Cart.business)
        {
            Shopping.Cart.business[i].dishes.sort(Main.SortByProperty("name"));
            BgStyle = "background-image:url('panel/images/business/" + Main.NullToEmpty(Shopping.Cart.business[i].id) + "/mini.jpg?c=" + Main.Random + "');";
		   p += '<div class="row">';
            //p += '<div class="businesslogo"><div class="img" style="' + BgStyle + '"></div></div>';
            //p += '<div class="titlecell"><span class="caption nonselectable default">' + Shopping.Cart.business[i].name.toUpperCase() + "</span></div>";
	     document.getElementById("restrnme").innerHTML = '<span class="caption nonselectable default">' + Shopping.Cart.business[i].name.toUpperCase() + "</span>";
		 
		   if(Shopping.Cart.business[i].mercadopago == true)
			{
           		 p += '<div class="paymentcell" style="width: 570px !important">';
			}
			else {
				  p += '<div class="paymentcell">';
				}
            if ((IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1) && Shopping.Cart.business[i].paypal && Shopping.Cart.business.length==1)//only allow to pay with paypay when user orders on 1 restaurant
                {
                l = "";
                if (Shopping.Cart.business[i].paymethod.paypal == true)
                    {
                    l = " CHECKED"
                    Shopping.updateOrderBtn('paypal');
                    }
                p += '<span class="caption2 nonselectable default"><img src="images/paypal.png" style="margin-right:4px;"><img src="images/master_icon.png" width="28px" style="margin-right:4px;"><img src="images/visa.png" width="28px" style="margin-right:4px;"><img src="images/amer.png"></span>';
                p += '<input type="radio" id="paymethod-paypal-check"  onclick="Shopping.BusinessPaymentUpdate(this,\'paypal\',' + i + ')" class="nonselectable default checkbox"' + l + " name='payment[cash]'/>";                
                }
				
            if (Shopping.Cart.business[i].paymethod.card == null)
            {
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				{
				    l = '';
					if (Shopping.Cart.business[i].paymethod.paypal==false || Shopping.Cart.business[i].paymethod.paypal==undefined)
						l = " CHECKED";
					
					p += '<span class="caption2 nonselectable default"><img src="images/dollar.1.png" alt="Free Shipping" style="width:18px;"></span>'
					p += '<input type="radio" id="paymethod-cash-check" onclick="Shopping.BusinessPaymentUpdate(this,\'cash\',' + i + ')" class="nonselectable default checkbox" '+l+' name="payment[cash]"/>';
				}
				else
				{
					p += '<span class="caption2 nonselectable default"><img src="images/dollar.1.png" alt="Free Shipping" style="width:18px;"></span>';
				}
            }
            else
            {
                l = "";
                p += '<span class="caption2 nonselectable default"><img src="images/dollar.1.png" alt="Free Shipping" style="width:18px;"></span>';
                if (Shopping.Cart.business[i].paymethod.cash == true)
                {
                    l = " CHECKED"
                }
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				{
					p += '<input type="radio" id="paymethod-cash-check" onclick="Shopping.BusinessPaymentUpdate(this,\'cash\',' + i + ')" class="nonselectable default checkbox"' + l + " name='payment[cash]'/>";
				}
                else {
					p += '<input type="radio" onclick="Shopping.BusinessPaymentUpdate(this,\'cash\',' + i + ')" class="nonselectable default checkbox"' + l + " name='payment[cash]'/>";
		}
		 
				p += '<span class="caption2 nonselectable default"><img src="images/master_icon.png" width="28px" style="margin-right:4px;"><img src="images/visa.png" width="28px" style="margin-right:4px;"><img src="images/amer.png"></span>';
                l = "";
                if (Shopping.Cart.business[i].paymethod.card == true)
                {
                    l = " CHECKED"
                }
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)	{
					p += '<input type="radio" id="paymethod-card-check" onclick="Shopping.BusinessPaymentUpdate(this,\'card\',' + i + ')" class="checkbox"' + l + " name='payment[cash]'/>";
				}
				else {
					p += '<input type="radio" onclick="Shopping.BusinessPaymentUpdate(this,\'card\',' + i + ')" class="checkbox"' + l + " name='payment[cash]'/>";
				}
            }
			//IS_MERCADOPAGO_ENABLED
			
			if(Shopping.Cart.business[i].mercadopago == true)
			{
			/*if (Shopping.Cart.business[i].paymethod.card == true)
                {
                    l = " CHECKED"
                }
				*/
				p += '<span class="caption2 nonselectable default"><img src="images/mercadopago.png" style="margin-right:4px;"><img src="images/master_icon.png" width="28px" style="margin-right:4px;"><img src="images/visa.png" width="28px" style="margin-right:4px;"><img src="images/amer.png"></span>';
				
				
				
				p += '<input type="radio" id="paymethod-marco-check" onclick="Shopping.BusinessPaymentUpdate(this,\'marco\',' + i + ')" class="checkbox" name="payment[cash]"/>';
			}
		
		/*Paypal Adaptive(06-08-2014)*/
		if(Shopping.Cart.business[i].paypaladaptive == true){	
			
			p += '<span class="caption2 nonselectable default"><img src="../panel/paypaladaptive/paypal_adaptive.png" width="27" height="19" style="margin-right:4px;"><img src="images/master_icon.png" width="28px" style="margin-right:4px;"><img src="images/visa.png" width="28px" style="margin-right:4px;"><img src="images/amer.png"></span>';
			p += '<input type="radio" id="paymethod-paypaladaptive-check" onclick="Shopping.BusinessPaymentUpdate(this,\'paypaladaptive\',' + i + ')" class="checkbox" name="payment[cash]"/>';
		}
			
            //p += '<span class="caption1 nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_PAYMENT'] ?></span>';
            p += "</div>";
            p += "</div>";
			 
			



		var g = "";

		var total_points_earned=0; 

		for (j in Shopping.Cart.business[i].dishes){

			g +='<div class="item_dv">'
			g +='<ul class="item_row">'
			g +='<li>'
			g +='<p><span>'+Shopping.Cart.business[i].dishes[j].quantity+' x </span> '+Shopping.Cart.business[i].dishes[j].name+' </p>'
			//g +='<p class="option_name">Please choose size</p>'
			if(Shopping.Cart.business[i].dishes[j].nofperson) {
			g +='<p class="option_name" onclick="ProductOption.EditCartOptions('+choice_count+','+j+')"><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> : '+Shopping.Cart.business[i].dishes[j].nofperson+'</p>'		
			}
			if(Shopping.Cart.business[i].dishes[j].options){
			g +='<div class="option_dv" onclick="ProductOption.EditCartOptions('+choice_count+','+j+')">'+ProductOption.Margeslash(Shopping.Cart.business[i].dishes[j].options)+'</div>'
			}
			if(Shopping.Cart.business[i].dishes[j].comments) {
			g +='<p class="option_name">'+Shopping.Cart.business[i].dishes[j].comments+'</p>'		
			}

			if(Shopping.Cart.business[i].dishes[j].points==null){
				g +=''
			}else if (isNaN(Shopping.Cart.business[i].dishes[j].points)){
				g +=''
			}else if(Shopping.Cart.business[i].dishes[j].points==0){
				g +=''
			}else{
				g +='<div class="option_dv">' + Shopping.Cart.business[i].dishes[j].points +' <?= $lang_resource['ORDER_DISH_POINT'] ?>' ;
			}


			g +='</li>'
			g +='<li>'
			g +='<ul class="btns_and_price">'
			g +='<li>'
			g +='<div class="cart_plus">&nbsp;'
			//g +='<button type="button" class="add_plus" onclick="ProductOption.AddFromCart(  0, ' + j + ','+Shopping.Cart.business[i].dishes[j].id+')">+</button>'
			g +='</div>'<!--cart_plus-->
			g +='<div class=" cart_minus">&nbsp;'
			//g +='<button type="button" class="add_plus" onclick="Shopping.RemoveFromCart(  0, ' + j + ','+Shopping.Cart.business[i].dishes[j].id+')">-</button>'
			g +='</div>'<!--cart_plus-->	
			g +='</li>'
			g +='<li><p>'+Main.car+'<span id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">'+Shopping.FormatPriceNotFree(Shopping.Cart.business[i].dishes[j].total)+'</p></li>'                                
			g +='</ul>'                                   	
			g +='</li>'
			g +='</ul>'<!--item_row-->

			g +='</li>'
			g +='</ul>'<!--item_row-->
			g +='</div>'<!--item_dv-->

		}

		/**Reservation**/
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			g +='<p class="change_time"><?= $lang_resource['SHOPPING_RESERVATION_OPTIONS'] ?></p>'

			if(globalReserve.Room.length!="0"){
				g +='<div class="item_dv">'
				g +='<ul class="item_row" >'
				g +='<li>'
				g +='<p><span>'+globalReserve.Room.length+'x</span> <?= $lang_resource['FRONT_RESERVATION_ROOM'] ?> </p>'
				g +='</li>'
				g +='<li>'
				g +='<ul class="btns_and_price">'	
				if(Shopping.Cart.reservePrice.Room){
					g +='<li><p>'+Main.car+''+Shopping.Cart.reservePrice.Room+'</p></li>'  				
				}			
				                       
				g +='</ul>'                                    	
				g +='</li>'
				g +='</ul>'<!--item_row-->
				g +='</div>'<!--item_dv-->			
			}


			if(globalReserve.Table.length!="0"){
				g +='<div class="item_dv">'
				g +='<ul class="item_row" >'
				g +='<li>'
				g +='<p><span>'+globalReserve.Table.length+'x</span> <?= $lang_resource['FRONT_RESERVATION_TABLE'] ?> </p>'
				g +='</li>'
				g +='<li>'
				g +='<ul class="btns_and_price">'	
				if(Shopping.Cart.reservePrice.Table){
					g +='<li><p>'+Main.car+''+Shopping.Cart.reservePrice.Table+'</p></li>'  				
				}			
				                       
				g +='</ul>'                                    	
				g +='</li>'
				g +='</ul>'<!--item_row-->
				g +='</div>'<!--item_dv-->			
			}

			if(globalReserve.Free.length!="0"){
				g +='<div class="item_dv">'
				g +='<ul class="item_row" >'
				g +='<li>'
				g +='<p><span>'+globalReserve.Free.length+'x</span> <?= $lang_resource['FRONT_RESERVATION_FREE'] ?> </p>'
				g +='</li>'
				g +='<li>'
				g +='<ul class="btns_and_price">'	
				if(Shopping.Cart.reservePrice.Free){
					g +='<li><p>'+Main.car+''+Shopping.Cart.reservePrice.Free+'</p></li>'  				
				}			
				                       
				g +='</ul>'                                    	
				g +='</li>'
				g +='</ul>'<!--item_row-->
				g +='</div>'<!--item_dv-->			
			}

			if(Main.NullToEmpty(Main.WhereAmIData.rdate)!="") {
				g +='<div class="item_dv">'
				g +='<ul class="item_row" >'
				g +='<li>'
				g +='<p><span><?= $lang_resource['MOBILE_FRONT_VISUALS_DATE'] ?></span></p>'
				g +='</li>'
				g +='<li>'
				g +='<ul class="btns_and_price">'	
				g +='<li><p>'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'</p></li>'  				
			    g +='</ul>'                                    	
				g +='</li>'
				g +='</ul>'<!--item_row-->
				g +='</div>'<!--item_dv-->			
			}
		
			if(Main.NullToEmpty(Main.WhereAmIData.rhour)!="") {
				g +='<div class="item_dv">'
				g +='<ul class="item_row" >'
				g +='<li>'
				g +='<p><span><?= $lang_resource['FRONT_DRIVER_TIME'] ?></span></p>'
				g +='</li>'
				g +='<li>'
				g +='<ul class="btns_and_price">'	
				g +='<li><p>'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rhour)),2)+':'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rmin)),2)+'</p></li>'  				
			    g +='</ul>'                                    	
				g +='</li>'
				g +='</ul>'<!--item_row-->
				g +='</div>'<!--item_dv-->			
			}
		}
		/**Reservation**/


		//Delivery Shipping

		if(Main.deliveryType == "delivery"){  
			if (parseFloat(Shopping.Cart.business[i].shipping) > 0){
				h = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}else{
				h = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}

			g +='<div class="item_dv no-border">'
			g +='<ul class="item_row">'
			g +='<li>'
			g +='<p>' + h +'</p>'
			g +='</li>'
			g +='<li>'
			g +='<ul class="btns_and_price">'
			g +='<li>&nbsp;</li>'
			var ship_txt = Shopping.Cart.business[i].shipping;
			if(ship_txt==0){
				var ship_free = '<?=$lang_resource['SHOPPING_SECOND_FREE']?>'
				g +='<li><p id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">'+ship_free+'</p></li>'   
			}else{
				g +='<li><p id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">'+ Shopping.FormatPrice(Shopping.Cart.business[i].shipping,Main.car) +'</p></li>'   
			}			                             
			g +='</ul>'                                   	
			g +='</li>'
			g +='</ul>'<!--item_row-->
			g +='</div>'<!--item_dv-->
		} 
		//Delivery Shipping

		//Discount

		g +='<div class="item_dv no-border" id="discount_div" style="display:none">'
		g +='<ul class="item_row">'
		g +='<li>'
		g +='<p id="discount_text"></p>'
		g +='</li>'
		g +='<li>'
		g +='<ul class="btns_and_price">'
		g +='<li>&nbsp;</li>'
		g +='<li><p id="discount_price"></p></li>'                                
		g +='</ul>'                                   	
		g +='</li>'
		g +='</ul>'<!--item_row-->
		g +='</div>'<!--item_dv-->
		//Discount

		//Service Fee
			
	if(Main.servicefeesettings == 1){	
	var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
	Shopping.Cart.servicefee = Shopping.Business[w].servicefee
		if(Shopping.Cart.servicefee!=''){	
			if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
				Shopping.Cart.servicefee =0;
			}
			g +='<div class="item_dv no-border">'
			g +='<ul class="item_row">'
			g +='<li>'
			g +='<p><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+parseInt(Shopping.Cart.servicefee) +' %)</p>'
			g +='</li>'
			g +='<li>'
			g +='<ul class="btns_and_price">'
			g +='<li>&nbsp;</li>'
			g +='<li><p>'+Main.car+'<span id="cart_servicefeeid">0.00</span></p></li>'                                
			g +='</ul>'                                   	
			g +='</li>'
			g +='</ul>'<!--item_row-->
			g +='</div>'<!--item_dv-->
		}
	}
	if(Main.servicefeesettings == 0){	
		if(Shopping.Cart.servicefee!=''){	
			if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
				Shopping.Cart.servicefee =0;
			}
			g +='<div class="item_dv no-border">'
			g +='<ul class="item_row">'
			g +='<li>'
			g +='<p><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+parseInt(Shopping.Cart.servicefee) +'%)</p>'
			g +='</li>'
			g +='<li>'
			g +='<ul class="btns_and_price">'
			g +='<li>&nbsp;</li>'
			g +='<li><p>'+Main.car+'<span id="cart_servicefeeid">0.00</span></p></li>'                                
			g +='</ul>'                                   	
			g +='</li>'
			g +='</ul>'<!--item_row-->
			g +='</div>'<!--item_dv-->
		}
	}
		//Service Fee

		//Tax
		g +='<div class="item_dv no-border">'
		g +='<ul class="item_row">'
		g +='<li>'
		g +='<p><?= $lang_resource['Tax_V2'] ?> ('+Shopping.Cart.buyer.tax +'%)'
		if(Shopping.Cart.buyer.taxtype == 1) 
			g +='<small><?= $lang_resource['Tax_not_included_V2'] ?></small>'
		else if(Shopping.Cart.buyer.taxtype == 2) 
			g +='<small><?= $lang_resource['Tax_included_V2'] ?></small>'
		g +='</p>'
		g +='</li>'
		g +='<li>'
		g +='<ul class="btns_and_price">'
		g +='<li>&nbsp;</li>'
		g +='<li><p>'+Main.car+'<span  id="cart_taxid">' + Shopping.FormatPriceNotFree(Shopping.Cart.business[i].tax) +'</p></li>'                                
		g +='</ul>'                                   	
		g +='</li>'
		g +='</ul>'<!--item_row-->
		g +='</div>'<!--item_dv-->
		//Tax

		//Tips
		g +='<div class="item_dv no-border" id="cart_tips_block" style="display:none">'
		g +='<ul class="item_row">'
		g +='<li>'
		g +='<p><?= $lang_resource['TRACKORDER_TIPS'] ?></p>'
		g +='</li>'
		g +='<li>'
		g +='<ul class="btns_and_price">'
		g +='<li>&nbsp;</li>'
		g +='<li><p>'+Main.car+'<span  id="cart_tips">' + parseFloat(Shopping.Cart.buyer.tips).toFixed(Main.IS_DECIMAL_POINT)  +'</p></li>'                                
		g +='</ul>'                                   	
		g +='</li>'
		g +='</ul>'<!--item_row-->
		g +='</div>'<!--item_dv-->
		//Tips


		/*if(Main.User!=null){
			if(Main.ItemPointPermission==1){
				if(Main.availablepoint!=0){
					if(Shopping.Cart.usedpointvalue != 0){
						g +='<div class="item_dv no-border">'
						g +='<ul class="item_row">'
						g +='<li>'
						g +='<p><?= $lang_resource['TOTAL_VALUE_EXCLU_POINT'] ?></p>'
						g +='</li>'
						g +='<li>'
						g +='<ul class="btns_and_price">'
						g +='<li>&nbsp;</li>'
						g +='<li><p>'+Main.car+'<span  id="cart_taxid">' + Shopping.Cart.total +'</p></li>'                                
						g +='</ul>'                                   	
						g +='</li>'
						g +='</ul>'<!--item_row-->
						g +='</div>'<!--item_dv-->
					}
					if(Shopping.Cart.usedpointvalue != null){
						g +='<div class="item_dv no-border">'
						g +='<ul class="item_row">'
						g +='<li>'
						g +='<p><?= $lang_resource['TOTAL_POINT_VALUE'] ?></p>'
						g +='</li>'
						g +='<li>'
						g +='<ul class="btns_and_price">'
						g +='<li>&nbsp;</li>'
						g +='<li><p>'+Main.car+'<span  id="cart_taxid">' + Shopping.Cart.usedpointvalue +'</p></li>'                                
						g +='</ul>'                                   	
						g +='</li>'
						g +='</ul>'<!--item_row-->
						g +='</div>'<!--item_dv-->						
					}	
				}
			}
		}*/



		

        }
        document.getElementById("cartresultsinner").innerHTML = g;
		 Shopping.UpdateTotals()

	
       
    },
	
	MenuCartlist : function (i){

		var currency = Main.car;
		var n = ''
		n +='<div class="item_dv">'
		n +='<ul class="item_row">'
		n +='<li>'
		n +='<p><span>'+Shopping.Cart.business[0].dishes[i].quantity+' x </span> '+Shopping.Cart.business[0].dishes[i].name+' </p>'
		//n +='<p class="option_name">Please choose size</p>'
		n +='</li>'
		n +='<li>'
		n +='<ul class="btns_and_price">'
		n +='<li>'
		n +='<div class="cart_plus">'
		n +='<button type="button" class="add_plus" onclick="ProductOption.AddFromCart(  0, ' + i + ','+Shopping.Cart.business[0].dishes[i].id+')">+</button>'
		n +='</div>'<!--cart_plus-->
		n +='<div class=" cart_minus">'
		n +='<button type="button" class="add_plus" onclick="Shopping.RemoveFromCart(  0, ' + i + ','+Shopping.Cart.business[0].dishes[i].id+')">-</button>'
		n +='</div>'<!--cart_plus-->	
		n +='</li>'
		n +='<li><p>'+currency+'<span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPriceNotFree(Shopping.Cart.business[0].dishes[i].total)+'</p></li>'                                
		n +='</ul>'                                   	
		n +='</li>'
		n +='</ul>'<!--item_row-->

		if(Shopping.Cart.business[0].dishes[i].nofperson) {
			n +='<p class="option_name" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> : '+Shopping.Cart.business[0].dishes[i].nofperson+'</p>'		
		}
		if(Shopping.Cart.business[0].dishes[i].options){
			n +='<div class="option_dv" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')">'+ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</div>'
		}
		if(Shopping.Cart.business[0].dishes[i].comments) {
			n +='<p class="option_name">'+Shopping.Cart.business[0].dishes[i].comments+'</p>'		
		}

		if(Shopping.Cart.business[0].dishes[i].points==null){
			n+=''
		}else if (isNaN(Shopping.Cart.business[0].dishes[i].points)){
			n+=''
		}else if(Shopping.Cart.business[0].dishes[i].points==0){
			n+=''
		}else{
			n +='<div class="option_dv">' + Shopping.Cart.business[0].dishes[i].points +' <?= $lang_resource['ORDER_DISH_POINT'] ?>' ;
		}

		n +='</li>'
		n +='</ul>'<!--item_row-->
		n +='</div>'<!--item_dv-->

 
		return n;		 

	},
	AddPhoto: function () {

		
		if(Main.User){
			var k = "";

			k +='<div class="modal-header">'
			k +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			k +='<h4 class="modal-title"><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></h4>'
			k +='</div>'
			k +='<form id="addphoto" name="addphoto" enctype="multipart/form-data" method="post" >'
			k +='<div class="modal-body">'
			k +='<h5 class="border_heading_popup"><?=$lang_resource['CNTROL_PANEL_REVIEW_UPLOAD_PHOTO'] ?></h5>'			
			k +='<input type="hidden" id="business" name="business" value="'+Shopping.ActiveBusiness+'">'
			k +='<input type="hidden" id="photoname" name="photoname" value="'+Main.User.name+'">'
			k +='<input type="hidden" id="photoemail" name="photoemail" value="'+Main.User.email+'">'
			k +='<div class="row">'
			k +='<div class="col-md-12">'
			k +='<div class="form-group">'
			k +='<input type="file" id="files" name="files[]" multiple>'
			k +='</div>'<!--form-group-->
			k +='</div>'
			k +='</div>'<!--row-->

			k +='<div class="row added_photo">'
			
			k +='</div>'<!--row-->



			k +='</div>'<!--modal-body-->
			k +='<div class="modal-footer">'
			k +='<button type="submit" name="submit" class="popup_btn"  onclick="RestMenuList.PhotoSave()" ><?=$lang_resource['CNTROL_PANEL_REVIEW_UPLOAD'] ?></button>'

			k +='</div>'
			k += '</form>'


      ////////////
			
			Popup.Show(k)

			$(document).ready(function() {
				if(window.File && window.FileList && window.FileReader) {
					$("#files").on("change",function(e) {
						var files = e.target.files ,
						filesLength = files.length ;
						for (var i = 0; i < filesLength ; i++) {
							var f = files[i]
							var fileReader = new FileReader();
							fileReader.onload = (function(e) {
								var file = e.target;
								var container = $('.added_photo'),
								child = 'col-md-4 col-sm-4 photo_dv';
								$('<div/>', { 'class': child }).appendTo(container).append(
									$('<img/>', {
										class : "photo_add",
										src : e.target.result,
										title : file.name
								}));
							});				
							fileReader.readAsDataURL(f);
						}
					});
				} else { swal("Error","Your browser doesn't support to File API","error"); }
			});
		}else{
			Main.AddPhotoLogin();			
		}
		
	},
		

PhotoSave: function() {
	Main.Loading();
	$("#addphoto").submit(function (event) 
            {
                 event.preventDefault();
         
                var formData = new FormData($(this)[0]);
             $.ajax({
                        url: 'theUpload.php',
                        type: 'POST',
                        data: formData,
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (html) 
                        {
                        	Main.Ready();
                           document.addphoto.reset();
                           Popup.Close();
                           swal("Great!","<?= $lang_resource['FRONT_PHOTO_THANK_YOU_RATING'] ?>","success");
                        },
                        error: function(html)
                        {
                        	Main.Ready();
                        	swal("Error", html,"error");
                        }
                    });
                });
},


	AddReview: function(){
				
		var r = ''
		r +='<div class="modal-header">'
		r +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		r +='<h4 class="modal-title"><?= $lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></h4>'
		r +='</div>'
		r +='<div class="modal-body">'


		r +='<div class="row">'
		r +='<div class="col-md-12">'
		r +='<div class="form-group">'
		r +='<label><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_EMAIL'] ?></label>'
		r +='<input type="text" class="form-control" id="email" >'
		r +='</div>'<!--form-group-->
		r +='</div>'<!--col-md-12-->
		r +='</div>'<!--row-->
		r +='<div class="row">'
		r +='<div class="col-md-12">'
		r +='<div class="form-group">'
		r +='<label><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></label>'
		r +='<select class="form-control" id="city">'
		r += '<option value=""><?= $lang_resource['FRONT_SELECT_CITY'] ?></option>'
		for(c in Main.Franchises){
			r += '<option value="'+Main.Franchises[c].id+'">'+Main.Franchises[c].city+'</option>'
		}
		r +='</select>'
		r +='</div>'<!--form-group-->
		r +='</div>'<!--col-md-12-->
		r +='</div>'<!--row-->


		r +='<h5 class="border_heading_popup"><?= $lang_resource['TEMPLATE_RATE_NOW'] ?></h5>'

		r +='<div class="row">'
		r +='<div class="col-md-12">'
		r +='<ul class="rate_now">'
		for(i = 1;i<=4;i++){
			if(i == 1){
				var heading = '<?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?>'
				var type = 'quli'
			}else if(i == 2){
				var heading = '<?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?>'
				var type = 'punc'
			}else if(i == 3){
				var heading = '<?= $lang_resource['TEMPLATE_SERVICE'] ?>'
				var type = 'serv'
			}else if(i == 4){
				var heading = '<?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?>'
				var type = 'pack'
			}
			r +='<li>'
			r +='<ul class="give_review">'
			r +='<li>'+heading+' <span>:</span></li>'
			for(j= 1;j<=5;j++){
				r += '<li><a class="grey_star" href="javascript:void(0);" title="'+j+'" id="'+type+'_'+j+'" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>'
			}
			r +='<li><span id="'+type+'_rev_qty">0</span> out of 5</li>'
			r += '<li><input type="hidden" id="'+type+'" /></li>'
			r +='</ul>'
			r +='</li>'
		}	
		r +='</ul>'
		r +='<div class="clearfix"></div><br>'

		r +='</div>'
		r +='</div>'<!--row-->

		r +='<div class="row">'
		r +='<div class="col-md-12">'
		r +='<div class="form-group">'
		r +='<label><?= $lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></label>'
		r +='<textarea class="form-control" id="review"></textarea>'
		r +='</div>'<!--form-group-->
		r +='</div>'<!--col-md-12-->
		r +='</div>'<!--row-->

		r +='</div>'<!--modal-body-->
		r +='<div class="modal-footer">'
		r +='<button type="button" class="popup_btn" onclick="RestMenuList.SaveReviewData()"><?= $lang_resource['save_V2'] ?></button>'

		r +='</div>'

		Popup.Show(r)
			
	},	
	CalculateReviewRatings:function(id){
		var st_split = id.split("_");
		var hiddenfieldid = st_split[0];
		var hiddenfieldval = st_split[1];	
		$("#"+hiddenfieldid+"_rev_qty").empty().append(hiddenfieldval)
		$("#"+hiddenfieldid).val(hiddenfieldval);
		for(var i = 1;i <= hiddenfieldval;i++){
			var iid = hiddenfieldid+"_";
			$("#"+iid+i).removeClass("grey_star");
			$("#"+iid+i).addClass("yellow_star");
		}

		var idnext = (parseInt(hiddenfieldval) + 1);
		for(var j = idnext;j <= 5;j++){
			var jid = hiddenfieldid+"_";
			$("#"+jid+j).removeClass("grey_star");
			$("#"+jid+j).removeClass("yellow_star");
			$("#"+jid+j).addClass("grey_star");
		}
	},	

	SaveReviewData: function(){
		
		var email1 = $('#email').val();
		var emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		var city = $('#city').val();
		var review1 = $('textarea#review').val();

		var quli = $('#quli').val();
		var punc = $('#punc').val();
		var serv = $('#serv').val();
		var pack = $('#pack').val();

		if(!email1){
			swal("Error","<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>","error");
			$('#email').focus();
			return false;
		}else if(!email1.match(emailRegEx)){
			swal("Error","<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>","error");
			$('#email').focus();
			return false;
		}else if(!city){
			swal("Error","<?= $lang_resource['FRONT_SELECT_CITY'] ?>","error");
			return false;
		}else if(!quli){
			swal("Error","<?= $lang_resource['FRONT_QTY_RATING'] ?>","error");
			return false;
		}else if(!punc){
			swal("Error","<?= $lang_resource['FRONT_PUNC_RATING'] ?>","error");
			return false;
		}else if(!serv){
			swal("Error","<?= $lang_resource['FRONT_SERV_RATING'] ?>","error");
			return false;
		}else if(!pack){
			swal("Error","<?= $lang_resource['FRONT_PACK_RATING'] ?>","error");
			return false;
		}else{
			var email = window.btoa(unescape(encodeURIComponent(email1)));
			var review = window.btoa(unescape(encodeURIComponent(review1)));
			var id_w_business = Shopping.ActiveBusiness;
			var r = new Array();
			r.push(email);
			r.push(city);
			r.push(review);
			r.push(id_w_business);
			r.push(quli);
			r.push(punc);
			r.push(serv);
			r.push(pack);

			Main.Loading();
			$.post("panel/lib/front-main.php", "f=SaveUserReviewData&review="+JSON.stringify(r), function (r) {
				Main.Ready();
				Popup.Close();
				swal("Error","<?= $lang_resource['FRONT_PACK_THANK_YOU_RATING'] ?>","error");
			});//end of ajax
		}		
	},//end of function

	
	/*Photogallery : function(f) {
		f = JSON.parse(f);
		var k = "";
		for (x in f){
			k +='<li><a href="javascript:void(0)" style="cursor:default;"><img src="panel/images/gallery/'+f[x].id+'/gallery.jpg"></a></li>'
		}		
		if(k=="")	
			$("#photo_div").css("display","none");
		else
			document.getElementById("infophotpdiv").innerHTML  = k;
	},*/
	Photogallery: function(f) {
			f = JSON.parse(f);
			var k = "";
			var modalG = "";		
			for (x in f){			
				k +='<li><div class="portfolio-item"><a href="#portfolioModal'+f[x].id+'" class="portfolio-link" data-toggle="modal"><div class="caption"><div class="caption-content"><i class="fa fa-search-plus fa-3x"></i></div></div><img src="panel/images/gallery/'+f[x].id+'/gallery.jpg" alt=""></li></a></div>'
				modalG +='<div class="portfolio-modal modal fade" id="portfolioModal'+f[x].id+'" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-content" style="z-index: 50 !important"><div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2"><div class="modal-body"><br><br><br><br><br><img style="width: 100% !important" src="panel/images/gallery/'+f[x].id+'/normal.jpg" class="img-responsive img-centered" alt=""><br><br><br><br></div></div></div></div></div></div>'
			}
		
			if(k=="")	
				$("#photo_div").css("display","none");
			else
				document.getElementById("infophotpdiv").innerHTML  = k;
				document.getElementById("modal-galery").innerHTML  = modalG;			
		},
	videogallery : function (f) {
		f = JSON.parse(f);
		var k = "";
		for (x in f){
			k +=f[x].link
			k +='<div class="clearfix"></div>'
		}
	
		if(k=="")	
			$("#video_div").css("display","none");
		else	
			document.getElementById("infovideodiv").innerHTML  = k	
	},
	reviewprint: function (f){
		
		document.getElementById("reviewCountText").innerHTML = "<?= $lang_resource['REVIEWSOF_V21'] ?> ("+f.length+")";
		var n = '';

		if(f.length == 0) { 
			n +='<div class="comments_dv">'
			n +='<div class="row">'
			n +='<div class="col-md-12 ">'
			n +='<p><?= $lang_resource['NOREVIEW_V21'] ?></p>'
			n +='</div>'
			n +='</div>'
			n +='</div>'<!--comments_dv-->		
		}else{ 
			for (var x in f){
				n +='<div class="comments_dv">'
				n +='<div class="row">'
				n +='<div class="col-md-4 ">'
				n +='<div class="image">'
				if(f[x].isimg == 1){
					n += '<img src="panel/images/users/'+f[x].user_id+'/small.jpg">'
				}else{
					n +='<img src="panel/<?=$moduleName?>/images/guest.jpg" alt="">'
				}				
				n +='</div>'

				n +='<div class="about">'
				n +='<h5>'+f[x].user+' <?=$lang_resource['REVIEWS_HOME']?><br> '+Shopping.Business[0].name+'</h5>'
				n +='<ul>'
				if(Main.NullToEmpty(f[x].average) !="" ){
					for(v = 1;v <= f[x].average;v++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-yellow.png" alt=""></li>'
					}
					var temp_v = (parseInt(f[x].average) + 1);
					for(v1 = temp_v;v1 <= 5;v1++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-grey.png" alt=""></li>'
					}
				}				
				n +='</ul>'
				//n +='<p>'+Main.NullToEmpty(f[x].comment)+'</p>'
				n +='<p>'+f[x].pdate+'</p>'
				n +='<p>'+Main.NullToEmpty(f[x].city)+'</p>'
				n +='<p>'+Main.NullToEmpty(f[x].email)+'</p>'
				n +='</div>'
				n +='</div>'

				n +='<div class="col-md-4">'
				n +='<p class="coment-text">'+Main.NullToEmpty(f[x].comment)+'</p>'
				n +='</div>'
				n +='<div class="col-md-4">'
				n +='<ul class="bottomspace">'
				n +='<li>'
				n +='<ul class="review_rating">'
				n +='<li><?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?> <span>:</span></li>'
				if(Main.NullToEmpty(f[x].quality) !="" ){
					for(q = 1;q <= f[x].quality;q++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-yellow.png" alt=""></li>'
					}
					var temp_q = (parseInt(f[x].quality) + 1);
					for(q1 = temp_q;q1 <= 5;q1++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-grey.png" alt=""></li>'
					}
				}
			
				n +='<li>'+Main.NullToEmpty(f[x].quality)+' <?= $lang_resource['OUTOF_V21'] ?> 5</li>'
				n +='</ul>'
				n +='</li>'
				n +='<li>'
				n +='<ul class="review_rating">'
				n +='<li><?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?> <span>:</span></li>'
				if(Main.NullToEmpty(f[x].delivery) !="" ){
					for(d = 1;d <= f[x].delivery;d++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-yellow.png" alt=""></li>'
					}
					var temp_d = (parseInt(f[x].delivery) + 1);
					for(d1 = temp_d;d1 <= 5;d1++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-grey.png" alt=""></li>'
					}
				}				
				n +='<li>'+Main.NullToEmpty(f[x].delivery)+' <?= $lang_resource['OUTOF_V21'] ?> 5</li>'
				n +='</ul>'
				n +='</li>'
				n +='<li>'
				n +='<ul class="review_rating">'
				n +='<li><?= $lang_resource['TEMPLATE_SERVICE'] ?> <span>:</span></li>'
				if(Main.NullToEmpty(f[x].dealer) !="" ){
					for(e = 1;e <= f[x].dealer;e++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-yellow.png" alt=""></li>'
					}
					var temp_e = (parseInt(f[x].dealer) + 1);
					for(e1 = temp_e;e1 <= 5;e1++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-grey.png" alt=""></li>'
					}
				}
				n +='<li>'+Main.NullToEmpty(f[x].dealer)+' <?= $lang_resource['OUTOF_V21'] ?> 5</li>'
				n +='</ul>'
				n +='</li>'
				n +='<li>'
				n +='<ul class="review_rating">'
				n +='<li><?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?> <span>:</span></li>'
				if(Main.NullToEmpty(f[x].package) !="" ){
					for(p = 1;p <= f[x].package;p++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-yellow.png" alt=""></li>'
					}
					var temp_p = (parseInt(f[x].package) + 1);
					for(p1 = temp_p;p1 <= 5;p1++){
						n +='<li><img src="panel/<?=$moduleName?>/images/star-grey.png" alt=""></li>'
					}
				}
				n +='<li>'+Main.NullToEmpty(f[x].package)+' <?= $lang_resource['OUTOF_V21'] ?> 5</li>'
				n +='</ul>'
				n +='</li>'
				n +='</ul>'
				n +='</div>'
				n +='</div>'
				n +='</div>'<!--comments_dv-->
			}

		}
		
		if(Shopping.allphotouser.length>0){
			n +='<div class="row">'
			n +='<div class="col-md-12">'
			n +='<div class="line_box">'
			n +='<ul class="photo_gallery">'
			for(var ig in Shopping.allphotouser){
				if(Shopping.allphotouser[ig].isimg == 0 || '<img src="../panel/images/users/'+Shopping.allphotouser[ig].id+'/small.jpg">'==''){
					n +='<li><a href="javascript:void(0)"><img src="../panel/images/users/dummy.jpg"></a></li>'
				}else if(Shopping.allphotouser[ig].isimg == 1){
					n +='<li><a href="javascript:void(0)"><img src="../panel/images/users/'+Shopping.allphotouser[ig].id+'/small.jpg?c='+new Date().getTime()+'"></a></li>'
				}else{
					n +='<li><a href="javascript:void(0)"><img src="../panel/images/users/dummy.jpg"></a></li>'
				}
				n +='<li><a href="javascript:void(0)"><img src="../panel/images/gallery/'+Shopping.allphotouser[ig].photos+'/full.jpg?c='+new Date().getTime()+'"></a></li>'
			}
			n +='</ul>'
			n +='<div class="clearfix"></div>'
			n +='</div>'<!--line_box-->
			n +='</div>'<!--col-md-6-->
			n +='</div>'<!--row-->
		}

		document.getElementById("reviewContent").innerHTML = n;
	},
	FuncOffer : function (f) {
		f = JSON.parse(f);
		var n =''

		if(f.length == 0) {
			n +='<table class="table table-striped">'
			n +='<tr>'
			n +='<td><?= $lang_resource['NOOFFER_V21'] ?></td>'
			n +='</tr>'
			n +='</table>'		
		} else {
			n +='<table class="table table-striped">'
			n +='<thead>'
			n +='<tr>'
			n +='<th width="25%"><?= $lang_resource['OFFERN_V21'] ?></th>'
			n +='<th width="25%"><?= $lang_resource['OFFERP_V21'] ?></th>'
			n +='<th width="25%"><?= $lang_resource['STARTD_V21'] ?></th>'
			n +='<th width="25%"><?= $lang_resource['ENDD_V21'] ?></th>'
			n +='</tr>'
			n +='</thead>'
			var count = 0; 
			for (var x in f) {
				count = count + 1;
				n +='<tr>'
				n +='<td>'+f[x].discounttext+'</td>'
				n +='<td>'+f[x].rate+'</td>'
				n +='<td>'+f[x].startdate+'</td>'
				n +='<td>'+f[x].enddate+'</td>'
				n +='</tr>'
			}			
			n +='</table>'
		}
		
		document.getElementById("dicountContent").innerHTML  = n;
		if(count){
			document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['OFFERS_V21']?> ("+count+")";
		}else{
			count = 0;
			$("#offerCountText").hide()
			document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['OFFERS_V21']?> ("+count+")";
		}
	},
	changecatclass: function(val){
		a = val
		var captionClass = "";	
		if ( a == "-1") {
			for (var xs in Shopping.MenuCategories){
				Shopping.MenuCategories[xs].enabled = true
			}
			RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true)
		}else{
			for (var xy in Shopping.MenuCategories){
				if(Shopping.MenuCategories[xy].id == a){
					Shopping.MenuCategories[xy].enabled = true
				}else{
					Shopping.MenuCategories[xy].enabled = false;
				}
			}
			RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true)
		}
	},
	PreOrderMenuCatalog: function (p,d,pem) {

		p = JSON.parse(p);
		RestMenuList.PreorderMenu = p
		var len = p.menuonly.length;
		p.menuonly.sort(Main.SortByProperty("opentime"));

		if(len == 0) {
			swal("Error","<?= $lang_resource['NO_SERVICE'] ?>","error");
			return ;
		}
		var k='';
		var htms =''
		htms +='<div class="modal-header">'
		if(Main.RedirectToBusiness){	   	
			if(Main.MenulistEnter){		   		
				htms +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			}else{
				htms +='<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="Main.HomeUrlCustom()"><span aria-hidden="true">&times;</span></button>'
			}
		}else{
			htms +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		}

		htms +='<h4 class="modal-title">&nbsp;</h4>'
		htms +='</div>'
		htms +='<div class="modal-body pre_order_popup">'
		
		var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", d);
		Main.car = Shopping.Business[u].currency;
        var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");

        var v='';
		if(Shopping.Business[u].isimg==1){
			
        	v = "panel/images/business/" + d + "/medium.jpg?c=" + Main.Random ;
		}
		else{
			v = 'panel/images/dummy/medium_business.jpg';
		}


		var roundTotal = Math.round(Shopping.Review.total);
		var rev_tot = roundTotal;
		var starsReview = "";
		var i = 1;
		for(i=1;i<=5;i++){
			if(roundTotal>=1){
				starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="panel/<?=$moduleName?>/images/star-yellow.png"></a></li>'
				roundTotal=roundTotal-1;
			}else if(roundTotal<=0){
				starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="panel/<?=$moduleName?>/images/star-grey.png"></a></li>'
			}
		}

		htms +='<div class="preorder_header">'
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="panel_logo">'
		htms +='<img src="'+v+'">'
		htms +='</div>'<!--panel_logo-->
		htms +='<div class="rest_name">'
		htms +='<h3>'+Shopping.Business[u].name.toUpperCase()+'</h3>'
		htms +='</div>'<!--rest_name-->
		htms +='<div class="rest_addrs">'
		htms +='<p>'+Shopping.Business[u].street +'</p>'
		htms +='</div>'<!--rest_addrs-->   
		htms +='<div class="rating_dv">'
		htms +='<ul>'
		htms +=starsReview
		htms +='<li>'+rev_tot+' <?=$lang_resource['Ratings_V2'] ?></li>'
		htms +='</ul>'
		htms +='</div>'<!--rating_dv-->                     
		htms +='</div>'<!--col-md-6-->
		htms +='<div class="col-md-6">'
		htms +='<div class="rest-desp">'
		//Time selection settings. 
		opentime=new Array();
		closetime=new Array();
		opentime1='';
		closetime1='';
		time_format="<?=$lang_resource['TIME_FORMAT']?>";
		if(time_format=="12"){  
			opentime1=Main.zeroPad(Shopping.Business[u].opentime,2);
			closetime1=Main.zeroPad(Shopping.Business[u].closetime,2);
		}else{
			opentime1=Main.convertTo24Hour(Shopping.Business[u].opentime);
			closetime1=Main.convertTo24Hour(Shopping.Business[u].closetime);
		}

		htms +='<p><?= $lang_resource['MENULIST_OPENING_TIME'] ?> : '+opentime1+' - '+closetime1+'</p>'
		if(Main.WhereAmIData.reservestatus=='delivery'){
			if(Shopping.Business[u].deliverytime== "" || Shopping.Business[u].deliverytime == undefined){
				htms +='<p id="deli"><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?> : 00:00</p>'
			}else{
				htms +='<p id="deli"><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?> : '+Shopping.Business[u].deliverytime+'</p>'
			}
		}else if(Main.WhereAmIData.reservestatus=='pickup' || Main.WhereAmIData.reservestatus=='reservation'){
			if(Shopping.Business[u].pickuptime== "" || Shopping.Business[u].pickuptime == undefined){
				htms +='<p id="pick"><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?> : 00:00</p>'
			}else{
				htms +='<p id="pick"><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?> : '+Shopping.Business[u].pickuptime+'</p>'
			}
		}else{
			if(Shopping.Business[u].deliverytime== "" || Shopping.Business[u].deliverytime == undefined){
				htms +='<p id="deli"><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?> : 00:00</p>'
			}else{
				htms +='<p id="deli"><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?> : '+Shopping.Business[u].deliverytime+'</p>'
			}
			if(Shopping.Business[u].pickuptime== "" || Shopping.Business[u].pickuptime == undefined){
				htms +='<p id="pick"><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?> : 00:00</p>'
			}else{
				htms +='<p id="pick"><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?> : '+Shopping.Business[u].pickuptime+'</p>'
			}
		}
		var pay = JSON.parse(Shopping.Business[u].paymentdetails);
		var count = 0;
		for(var m in pay){
			if(pay[m]=='t'){
				if(m=='cash' || m=='card'){
					if(count == 0){
						htms +='<p><?= $lang_resource['FOOTER_WE_ACCEPT'] ?>: '	
					}							  
					htms +='<span><img class="paymenu" src="images/step3-menu-list/paymethod/'+m+'.png"></span>'
					
					count++;
				}			
			}
		}
		if(count != 0){
		htms +='</p>'
		}
		htms +='</div>'<!--rest-desp-->
		htms +='</div>'<!--col-md-3-->
		htms +='</div>'<!--row-->
		htms +='</div>'<!--preorder_header-->

		htms +='<h4 class="pre_heading"><?=$lang_resource['PREORDER_STEP_1']?></h4>'

		//Time selection settings. 
		time_format="<?=$lang_resource['TIME_FORMAT']?>";

		
		for(k=0;k<len;k++) {
			//Time selection settings. 
			if(time_format=="12"){
				opentime=p.menuonly[k].opentime.split(":");
				p.menuonly[k].opentime= Main.convertTimeFormat(opentime[0],opentime[1]);
				closetime=p.menuonly[k].closetime.split(":");
				p.menuonly[k].closetime= Main.convertTimeFormat(closetime[0],closetime[1]);
			}else{
				closetime=p.menuonly[k].closetime.split(":");
				if(closetime[0] >= 24){
					p.menuonly[k].closetime= Main.convertTimeFormatTOAM(closetime[0],closetime[1]);
				}
			}

			htms +='<div class="pre-menu" id="preorderbox_'+p.menuonly[k].id+'" onclick="RestMenuList.PreorderMainfun('+d+','+p.menuonly[k].id+');">'
			htms +='<p class=" pre_menu_icon">'
			htms +='<span><img src="panel/<?=$moduleName?>/images/pre-menu-icon.png"></span> '+Main.TitleCase(p.menuonly[k].name)+'</p>'
			htms +='<p class="pre_menu_icon">'
			htms +='<span><img src="panel/<?=$moduleName?>/images/menu-clock.png"></span>'+p.menuonly[k].opentime+'-'+p.menuonly[k].closetime+'</p>'
			htms +='<ul class="pre-menu-day">'
			var weekends = p.menuonly[k].weekends
			weekends = weekends.toString()
			htms +=weekends.split(",").join("");
			htms +='</ul>'
			htms +='</div>'<!--pre-menu-->

		}		

		Forms.Clean("recover14")
		Forms.Clean("recover14", "popupmainbuttonok")
		htms +='<div class="clearfix" style=" margin-bottom:50px;"></div>'

		htms +='<h4 class="pre_heading"><?=$lang_resource['PREORDER_STEP_2']?></h4>'
		htms +='<div class="row">'
		htms +='<div class="col-md-6">'
		htms +='<div class="form-group" id="preorderboxdate">'
		htms +='<label><?=$lang_resource['PREORDERDATE']?></label>'
		htms +='<select class="form-control whiteselect">'
		htms +='<option><?=$lang_resource['PREORDER_STEP_2_DATE_OPTION']?></option>'
		htms +='</select>'
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-12-->
		htms +='<div class="col-md-3">'
		htms +='<div class="form-group" id="preorderboxhour">'
		htms +='<label><?=$lang_resource['PREORDERTIME']?></label>'
		htms +='<select class="form-control whiteselect" >'
		htms +='<option><?=$lang_resource['PREORDER_STEP_2_TIME_OPTION_HOUR']?></option>'
		htms +='</select>'
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->
		htms +='<div class="col-md-3">'
		htms +='<div class="form-group" id="preorderboxmin">'
		htms +='<label>&nbsp;</label>'
		htms +='<select class="form-control whiteselect">'
		htms +='<option><?=$lang_resource['PREORDER_STEP_2_TIME_OPTION_MIN']?></option>'
		htms +='</select>'
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->
		htms +='</div>'<!--row-->




		htms +='</div>'<!--modal-body-->
		htms +='<div class="pop-message-dv" id="showpreorderwarning" style="display:none"></div>'
		
		if(Main.RedirectToBusiness && !pem) {
			Main.MenuPreorder = false;
			htms +='<div class="pop-message-dv" id="showcatalogMenu">“Sorry, we are closed at moment but you can pre-order something for later”</div>'<!--pop-message-dv-->
		}else if(Main.MenuPreorder == false){
			htms +='<div class="pop-message-dv" id="showcatalogMenu">“Sorry, we are closed at moment but you can pre-order something for later”</div>'<!--pop-message-dv-->
		}

		htms +='<div class="modal-footer" id="preorderfooter">'
		htms +='<button type="button" class="popup_btn" onclick="RestMenuList.ValidateDate()"><?=$lang_resource['PREORDER_GO_TO_MENU']?></button>'
		htms +='</div>'

		Popup.Show(htms)		
	},
	ValidateDate: function(){		
		$("#showpreorderwarning").empty().append("<?=$lang_resource['FRONT_SELECT_PREORDER_MENU']?>")
		$("#showpreorderwarning").show();
		
	},
	PreorderMainfun:function (d,itemid) {
		
		var p = RestMenuList.PreorderMenu
		var len = p.menuonly.length;
		for(var k =0;k<len;k++){
			if(p.menuonly[k].id == itemid){
				$("#preorderbox_"+itemid).addClass("pre-menu-velied")
			}else{
				$("#preorderbox_"+p.menuonly[k].id).removeClass("pre-menu-velied")
			}
		}
		Main.Loading();
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCurrentDate"},{"operation":"FetchBusinessOnlyMenuEach","itemid":' + itemid + "}]", function (a){
	       	Main.itemid = itemid;
			Main.Ready();
			a = JSON.parse(a);
			Main.currentDate = a.currentDate;
			a = JSON.stringify(a);
			RestMenuList.PreorderMain(a)				
		});
	},
	PreorderMain: function(e){
		e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);
		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)
		var week = 0;

		var qs = new Array();
		qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PREORDERDATE']?>"}'));
		for(var cc =0;cc<dayschedule.length;cc++) {
			qs.push(JSON.parse('{"id":"'+dayschedulev[cc]+'","caption":"'+dayschedule[cc]+'"}'));
		}

		var hhp = new Array();
		hhp.push(JSON.parse('{"id":"","caption":"HH"}'));
		for (var p = 0; p < 12; p++) {
			if (p >= e.menuonlyeach[0].openhour && p <= e.menuonlyeach[0].closehour) {
				hhp.push(JSON.parse('{"id":"'+p+'","caption":" '+  Main.zeroPad((p),2) +' AM"}'));
			}
		}
		for (var p =12; p < 24; p++) {
			if(p==12) {
				if (p >= e.menuonlyeach[0].openhour && p <= e.menuonlyeach[0].closehour) {
					hhp.push(JSON.parse('{"id":"'+p+'","caption":" '+ Main.zeroPad((p),2) +' PM"}'));
				}
			} else {
				if (p >= e.menuonlyeach[0].openhour && p <= e.menuonlyeach[0].closehour) {
					hhp.push(JSON.parse('{"id":"'+p+'","caption":" '+ Main.zeroPad((p-12),2) +' PM"}'));
				}
			}
		}
		var hhs = new Array();
		hhs.push(JSON.parse('{"id":"","caption":"HH"}'));

		var mmp = new Array();
		mmp.push(JSON.parse('{"id":"","caption":"MM"}'));



		var a =''
		a +='<label><?=$lang_resource['PREORDERDATE']?> </label>'
		a +=Forms.CreateSelectPropertyPopup("recover14", "preorderdate", qs,"", true, "RestMenuList.Hourcheck(this)")

		$("#preorderboxdate").empty().append(a)

		var a1 = ''
		a1 +='<label><?=$lang_resource['PREORDERTIME']?></label>'
		a1 +=Forms.CreateSelectPropertyPopup("recover14", "preorderhh2", hhs,"", true, "RestMenuList.MinuteCheck(this)")
		$("#preorderboxhour").empty().append(a1)

		var a2 = ''
		a2 +='<label>&nbsp;</label>'
		a2 +=Forms.CreateSelectPropertyPopup("recover14", "preordermin2", mmp,"", true,"RestMenuList.MinuteValidateCheck(this)")
		$("#preorderboxmin").empty().append(a2)

		var a3=''
		a3 +='<button type="button" class="popup_btn" onclick="Main.preorderAction('+e.menuonlyeach[0].business+');"><?=$lang_resource['PREORDER_GO_TO_MENU']?></button>'
		$("#preorderfooter").empty().append(a3)

		Forms.CreateValue("recover14", "businessid", e.menuonlyeach[0].business);		
	},
	Hourcheck: function (c){

		//Time selection settings. 
		time_format="<?=$lang_resource['TIME_FORMAT']?>";

		Shopping.Cart.buyer.deliverydate = c.value;
		if(c.value== "ASAP") {
			$("#pickup_time").css("visibility","hidden");
		}else{
			$("#pickup_time").css("visibility","visible");
			$("#preordermin option:first").attr('selected','selected');
		}
		if(c.value !=""){
			$("#preorderdate").addClass("valied_selectbox")
			$("#preorderhh2").removeClass("valied_selectbox")
			$("#preordermin2").removeClass("valied_selectbox")
		}else{
			$("#preorderdate").removeClass("valied_selectbox")
			$("#preorderhh2").removeClass("valied_selectbox")
			$("#preordermin2").removeClass("valied_selectbox")
		}
		if(c.value == ""){
			var e = document.getElementById("preorderhh2");
			e.options.length = 0;
			e.options[e.options.length] = new Option("", "HH");
			return ;
		}
		var  curdte =  c.value.split("-");

		k = JSON.parse(Main.Preordercattime)


		var e = document.getElementById("preorderhh2");
		e.options.length = 0;
		e.options[e.options.length] = new Option("HH","");
		var g = 0;
		var h = false;


		for (var p = 0; p < 12; p++) {
			if (p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
				if(parseFloat(Main.currentDate.date) == parseFloat(curdte[2])) {
					if(p>parseFloat(Main.currentDate.hr)) {
						//Time selection settings. 
						if(time_format=="12"){
							var sha =  Main.zeroPad((p),2)+" AM";
						}else{
							var sha =  Main.zeroPad((p),2);
						}
						e.options[e.options.length] = new Option(sha, p);
					}
				} else {
					
					//Time selection settings. 
					if(time_format=="12"){
						var sha =  Main.zeroPad((p),2)+" AM";
					}else{
						var sha =  Main.zeroPad((p),2);
					}
					
					e.options[e.options.length] = new Option(sha, p);
					
				}
			}
		}
		for (var p =12; p < 24; p++) {
			if(p==12) {
				if (p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
					if(parseFloat(Main.currentDate.date) == parseFloat(curdte[2])) {
						if(p>parseFloat(Main.currentDate.hr)) {
							//Time selection settings. 
							if(time_format=="12"){
								var shp =   Main.zeroPad((p),2)+" PM";
							}else{
								var shp =   Main.zeroPad((p),2);
							}
							e.options[e.options.length] = new Option(shp, p);
						}
					} else {
						//Time selection settings. 
						if(time_format=="12"){
							var shp =   Main.zeroPad((p),2)+" PM";
						}else{
							var shp =   Main.zeroPad((p),2);
						}
						e.options[e.options.length] = new Option(shp, p);
					}
				}
			} else {
				if (p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
					var pp = p-12;
					if(parseFloat(Main.currentDate.date) == parseFloat(curdte[2])) {
						if(p>parseFloat(Main.currentDate.hr)) {
							//Time selection settings. 
							if(time_format=="12"){
								var shp =   Main.zeroPad((pp),2)+" PM";
							}else{
								var shp =   Main.zeroPad((p),2);
							}
							e.options[e.options.length] = new Option(shp, p);
						}
					} else {
						//Time selection settings. 
						if(time_format=="12"){
							var shp =   Main.zeroPad((pp),2)+" PM";
						}else{
							var shp =   Main.zeroPad((p),2);
						}
						e.options[e.options.length] = new Option(shp, p);
					}
				}
			}
		}

		for (var p =24; p < 29; p++) {
			if(p==24 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
				e.options[e.options.length] = new Option("12AM", p);
			}else if(p==25 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
				e.options[e.options.length] = new Option("1AM", p);
			}else if(p==26 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
				e.options[e.options.length] = new Option("2AM", p);
			}else if(p==27 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
				e.options[e.options.length] = new Option("3AM", p);
			}else if(p==28 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
				e.options[e.options.length] = new Option("4AM", p);
			}
		}
		
	},

	MinuteCheck: function (c) {

		k = JSON.parse(Main.Preordercattime)
		var e = document.getElementById("preordermin2");
		e.options.length = 0;
		e.options[e.options.length] = new Option("MM", "");

		opentime = k.menuonlyeach[0].openhour+':'+k.menuonlyeach[0].openmin
		opentime = Main.addMinutes(opentime,15)			
		var bits = opentime.split(':');

		if(c.value !=""){
			$("#preorderhh2").addClass("valied_selectbox")		
			$("#preordermin2").removeClass("valied_selectbox")
		}else{
			$("#preorderhh2").removeClass("valied_selectbox")
			$("#preordermin2").removeClass("valied_selectbox")
		}

		if (bits[0] == c.value) { 
			if(bits[1] >=0 && bits[1] < 15 ) {
				e.options[e.options.length] = new Option('15 min', '15');
				e.options[e.options.length] = new Option('30 min', '30');
				e.options[e.options.length] = new Option('45 min', '45');
			}else if(bits[1] >=15 && bits[1] < 30 ) {
				e.options[e.options.length] = new Option('30 min', '30');
				e.options[e.options.length] = new Option('45 min', '45');
			}else  if(bits[1] >=30 && bits[1] < 45) {
				e.options[e.options.length] = new Option('45 min', '45');
			}
		}else if (k.menuonlyeach[0].closehour  == c.value) {
			if(k.menuonlyeach[0].closemin >16 && k.menuonlyeach[0].closemin < 31 ){
				e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
			}else if(k.menuonlyeach[0].closemin >31 && k.menuonlyeach[0].closemin < 46){
				e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
				e.options[e.options.length] = new Option('30 min', '30');
			}else  if(k.menuonlyeach[0].closemin >46 && k.menuonlyeach[0].closemin < 59){
				e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
				e.options[e.options.length] = new Option('30 min', '30');
				e.options[e.options.length] = new Option('45 min', '45');
			}else{
				e.options[e.options.length] = new Option('00 min', '00');
			}
		}else{
			e.options[e.options.length] = new Option('00 min', '00');
			e.options[e.options.length] = new Option('15 min', '15');
			e.options[e.options.length] = new Option('30 min', '30');
			e.options[e.options.length] = new Option('45 min', '45');
		}
	},
	MinuteValidateCheck: function (c) {
		if(c.value !=""){
			$("#preordermin2").addClass("valied_selectbox")
		}else{
			$("#preordermin2").removeClass("valied_selectbox")
		}
	},
	
};
