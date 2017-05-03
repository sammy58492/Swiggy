var RestMenuList = {
 PrintBusinessAndDishes: function (resSearch)
    {
		
    	if(document.getElementById("businessloading")){
			$("#businessloading").hide();
		}
		if(Main.ResturantWidgetSettings || Main.ButtonWidgetSettings || Main.FloatWidgetSettings){
				
		document.getElementById("popupbg").style.display='none';
		document.getElementById("popupbox").style.display='none';
		$("body").removeClass("popopen");
		 
		}
		Main.MenulistEnter = true;
			
		$(window).scrollTop(180)
		$(".showhidebottom").hide()
		$("#clock_loading").hide();
		
	 $(".map-pannel").hide();
		var myParam = location.search.split('order=');
		
		 Main.stepBack  = 3;
		 
	 
		 if(Main.confirmOrder && Main.confirmOrder  == true) {
			 
			 Main.confirmOrder = false;
			 var shs = Blist.ShoppingHeaderDesignNavigationHtml();
			 var sch = Blist.ShoppingHeaderBusinessSearchHtml();
			 
		document.getElementById("left").innerHTML = '<div class="cntnr_div_whle"><div class="cntnr_div"><div id="headerSearch">'+sch+'</div></div><div class="rest-body"><div id="shoppingbox"  class="main"></div></div></div>';
		
		
			
			  
			  document.getElementById("top").innerHTML = shs;
			  
			  
			  $(".map-pannel").hide();
			  if(viewDevice == "Desktop") {	
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
		
		
        var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		
		
		Main.car = Shopping.Business[u].currency;
        var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");
		
        var p = Shopping.Business[u].street + " - " + Shopping.Business[u].colony +"," + o;
		var v='';
		if(Shopping.Business[u].isimg==1){
			
        	v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
		}
		else{
			v = 'panel/images/dummy/medium_business.jpg';
		}
		
        Shopping.MenuCategories = new Array();


        var r = false;
        for (var q in Shopping.Menu.dishes)
        {
            if (Shopping.MenuCategories.length > 0)
            {
                r = false;
                for (var s in Shopping.MenuCategories)
                {
                    if (Shopping.MenuCategories[s].id == Shopping.Menu.dishes[q].category)
                    {
                        r = true
                    }
                }
                if (!r && Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category) != "")
                {
                    Shopping.MenuCategories.push(
                    {
                        id: Shopping.Menu.dishes[q].category,
                        name: Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category, "name"),
                        rank: Shopping.Menu.dishes[q].rank_cat,
                        enabled: true
                    })
                }
            }
            else
            {
                if (Main.GetPropertyValueOnPropertyValueFoundForIds(Shopping.CategoriesCustom, "ids", Shopping.Menu.dishes[q].category) != "")
                {
                    Shopping.MenuCategories.push(
                    {
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
		//Shopping.MenuCategories.sort(Main.SortByProperty('name'));
		Shopping.MenuCategories.sort(Main.SortByProperty('rank'));
		
        for (q in Shopping.MenuCategories)
        {
            if (q == 0)
            {
                w += "(" + Shopping.MenuCategories[q].name.toLowerCase()
            }
            else
            {
                w += ", " + Shopping.MenuCategories[q].name.toLowerCase()
            }
            t += '<div class="row">';
            t += '<div class="captionbox hand"><span class="caption default menu_category_name_'+Shopping.MenuCategories[q].id+'">' + Shopping.MenuCategories[q].name + "</span></div>";
            t += '<div class="switchbox hand"><div id="menu_category_switch_' + Shopping.MenuCategories[q].id + '" class="switch" onclick="Shopping.changecatclass(' + Shopping.MenuCategories[q].id + ')"></div></div>';
            t += "</div>"
        }
        w += ")";

		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			var roundTotal = Math.round(Shopping.Review.total);
			var rev_tot = roundTotal;
			var starsReview = "";
			var i = 1;
			for(i=1;i<=5;i++)
			{

				if(roundTotal>=1)
				{
						starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/star-yellow.png"></a></li>'
						
						roundTotal=roundTotal-1;
				}
				else if(roundTotal<=0)
				{
					 starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/star-grey.png"></a></li>'
				
				}
			}
		}
    	var shipcos = Shopping.FormatPrice(Shopping.Business[u].shipping,Main.car);
	if (shipcos == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
		var dollarimge = "<img src='http://"+Shopping.Review.url+"/images/dollar.png' alt='<?= $lang_resource['MENU_LIST_FREE_SHIPPING'] ?>' style='width:18px;'/>";
	}else{
		var dollarimge = "<span class='shipping-cost-feer'>"+shipcos+"</span>";
	}

	 var ban = "";
			var bid = Shopping.Business[u].id;
	  		var bname = Shopping.Business[u].name;
	 		var imageUrl = Shopping.Business[u].headerurl;
			
			
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
			
			var imageUrl = Shopping.Business[u].headerurl;
			
	        ban +='<div class="rest_menu_banner_dv" style="background: url('+imageUrl+') no-repeat;">'
			ban +='<div class="top-panel">'
			ban +='<div class="item_dv" onclick="RestMenuList.ShowCardlist();" style="cursor:pointer;">'
			//ban +='<h3>You have 5 items</h3>'
			ban +='<h3 id="itemCount"><?= $lang_resource['MENU_LIST_YOU_HAVE'] ?> <span>0 <?= $lang_resource['SHOPPING_ITEMS'] ?></span></h3>'
			ban +='<span><button type="button" onclick="RestMenuList.ShowCardlist();"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/cart-icon.png"></button></span>'
			ban +='</div>'<!--item_dv-->
			ban +='</div>'<!--top-panel-->
			ban +='</div>'
			ban +='<div class="rest-bottom-panel">'
			ban +='<div class="container">'
			ban +='<div class="row">'
			ban +='<div class="col-md-1">'
			ban +='<div class="menu_rest_logo">'
			ban +='<a href="#"><img src="'+v+'"></a>'
			ban +='</div>'<!--menu_rest_logo-->
			ban +='</div>'<!--col-md-1-->
			ban +='<div class="col-md-3">'
			ban +='<div class="menu_rest_dsp">'
			ban +='<h3>' + Shopping.Business[u].name.toUpperCase() +'</h3>'
			ban +='<p>'+Shopping.Business[u].street +'</p>'
			ban +='</div>'
			ban +='</div>'<!--col-md-2-->
			ban +='<div class="col-md-3">'
			ban +='<div class="reating_dv_menu">'
			ban +='<ul class="pull-left">'
			ban +=starsReview
			ban +='</ul>'
			ban +='<div class="reating_text_menu">'+"("+Shopping.Review.rating+" "+"Ratings"+")"+'</div>'
			ban +='<div class="menu_payment_logos">'
			var pay = JSON.parse(Shopping.Business[u].paymentdetails);
			var count = 0;
			for(var m in pay){
			if(pay[m]=='t'){ 
			count++;
			if(count > 0 && count == 1){
			ban +='<span class=""><?= $lang_resource['FOOTER_WE_ACCEPT'] ?>: </span>'
			ban +='<ul>'
			ban +='<li>'
			}
			//	GoogleMap.payment1 ='<img src="images/step2-business-listing/paymethod/'+m+'.png">';
			
			if(m == 'cash' || m == 'card' || m=='paypal'){
			ban +='<a href="javascript:void(0)"><img src="images/step2-business-listing/paymethod/'+m+'.png"></a>'
			}
			
			}
			}
			if( count > 0){
			ban +='</li>'
			ban +=' </ul>'
			}		
			ban +='</div>'<!--menu_payment_logos-->
			ban +='</div>'<!--reating_dv_menu-->
			ban +='</div>'<!--col-md-4-->
			ban +='<div class="col-md-4">'
			ban +='<div class="menu_other_dsp">'
			ban +='<ul class="payment-time">'
			ban +='<li>'
			
			ban +='<span class="icon">'
			ban +='<img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/time-icon-white.png">'
			ban +='</span><?= $lang_resource['MENULIST_OPENING_TIME'] ?> : '+opentime1+' - '+closetime1+'</li>'
			
			/*if(Main.businessSetting.businesspageheadersetting !="1"){
			if(Main.User) {
			ban +='<li><a href="javascript:void(0)" onclick="Shopping.AddToFav(' + bid + ',' + bname + ')"><span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/favourite-icon-white.png"></span><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></a></li>'
			}else{
			
			ban +='<li><a href="javascript:void(0)" onclick="Main.Favlogin()"><span class="icon"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/favourite-icon-white.png"></span><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></a></li>'	
			}
			}*/
			
			ban +='</ul>'
			ban +='</div>'<!--menu_other_dsp-->
			ban +='</div>'<!--col-md-4-->
			ban +='</div>'<!--row-->
			ban +='</div>'<!--container-->
			ban +='</div>'
				
			 if(Shopping.Business[u].reserve>0) {
			   
			ban += '<div class="container">';
			ban += '<div class="row">'
			ban += '<div class="col-md-12">'
			ban += '<ul class="manu_tabs">'
			ban += '<li ><a href="javascript:void(0)" id="tabMenu1" class="active" onclick="Shopping.Menuskiptab(1)"><?= $lang_resource['MENU_V21'] ?></a></li>'
			ban += '<li ><a href="javascript:void(0)" id="tabInfo2" onclick="Shopping.Menuskiptab(2)"><?= $lang_resource['INFO_V21'] ?></a></li>'
			ban += '<li ><a href="javascript:void(0)" id="reviewCountText" onclick="Shopping.Menuskiptab(3)" id="reviewCountText"><?= $lang_resource['REVIEWS_V21'] ?></a></li>'
			ban += '<li ><a href="javascript:void(0)" id="offerCountText" onclick="Shopping.Menuskiptab(4)" id="offerCountText"><?= $lang_resource['OFFERS_V21'] ?></a></li>'
			if(Main.settingfront.tab_reservation != 'f'){
			//ban += '<li ><a href="javascript:void(0)" id="ReserveidText" onclick="Shopping.Menuskiptab(5)"><?= $lang_resource['RESERVATION_V21'] ?></a></li>'
			}
			ban += '</ul>'
			ban += '</div>'
			ban += '</div>'
			ban += '</div>'
			}
			else if(Shopping.Business[u].reserve == 0)	 {
			
			ban += '<div class="container">';
			ban += '<div class="row">'
			ban += '<div class="col-md-12">'
			ban += '<ul class="manu_tabs">'
			ban += '<li ><a href="javascript:void(0)" id="tabMenu1" class="active" onclick="Shopping.Menuskiptab(1)" style="width:175px !important"><?= $lang_resource['MENU_V21'] ?></a></li>'
			ban += '<li ><a href="javascript:void(0)" id="tabInfo2" onclick="Shopping.Menuskiptab(2)" style="width:175px !important"><?= $lang_resource['INFO_V21'] ?></a></li>'
			ban += '<li ><a href="javascript:void(0)" id="reviewCountText" onclick="Shopping.Menuskiptab(3)" style="width:175px !important" id="reviewCountText"><?= $lang_resource['REVIEWS_V21'] ?></a></li>'
			ban += '<li ><a href="javascript:void(0)" id="offerCountText" onclick="Shopping.Menuskiptab(4)" style="width:175px !important" id="offerCountText"><?= $lang_resource['OFFERS_V21'] ?></a></li>'
			ban += '</ul>'
			ban += '</div>'
			ban += '</div>'
			ban += '</div>'
			}

		 var n = "";
		

	
	  
			n +='<div class="container" id="plce_div_menu">';
			n +='<div class="menu_search_section">';
			n +='<div class="row">';
			
			n +='<div class="col-md-6">';
			n +='<select class="form-control select_category" onchange="Shopping.changecatclass(this)">';
			n +='<option value="-1"><?= $lang_resource['MENU_LIST_SELECT_CATEGORIES'] ?></option>';
			for (q in Shopping.MenuCategories)
			{
			n +='<option value="'+Shopping.MenuCategories[q].id+'">' + Shopping.MenuCategories[q].name + '</option>';
			}
			n +='</select>';
			n +='</div>';<!--col-md-6-->
			n +='<div class="col-md-6">';
			n +='<input type="text" class="form-control search_icon" id="dishsearch" placeholder="<?=$lang_resource['MENU_LIST_SEARCH_HERE']?>">';
			n +='</div>';<!--col-md-6-->
			
			n +='</div>';<!--row-->
			n +='</div>';
			n +='<div id="dishesresults">';
			n +='</div>';
			n +='<div id="loader_dv"></div>';
			n +='</div>';
				 <!-- MIN HEight Div -->
 


			/***********************************************tab section******************************************************************************************/
			/*****************************************Menu part***********************************************************************************/
		     Main.WhereAmILocationData = new Object();


			 var locationPoint = JSON.parse(Shopping.Business[u].locationPoint);

			 Main.WhereAmILocationData.latitud = locationPoint.latitud;
			 Main.WhereAmILocationData.longitud = locationPoint.longitud;
			 Main.WhereAmILocationData.zoom = 10;
			 Main.WhereAmILocationData.zonesloc = Shopping.Business[u].zonesloc;

			n +='<div class="plce_div" id="plce_div_info" style="display: none"  >';
			n +=RestMenuList.infoDivHtml(u);

			n +='</div>';


		/******************************Menu part**********************************************************************/
		n +='<div class="plce_div" id="plce_div_review" style="display: none" >';
		n +='<div class="tab_contant" id="tab_content-2">';




        n +='<div  id="review" style="float: left;width: 100%;margin-top: 50px;">';

		      if(Main.NullToEmpty(myParam) !="" && Main.NullToEmpty(myParam) !="?review"   )
		{  
		// n +='<iframe src="panel/js/reviewform.php?order='+myParam[1]+'&busid='+Shopping.Business[u].id+'&customslug='+Shopping.Business[u].customslug+'" width="100%" height="350"></iframe><td><br/>';
		//alert(myParam[1]);
		RestMenuList.AddReview()
		}

         n +='</div>';

    n +='<div class="container">'
	n +='<div class="tab_wrapper">'
	n +='<div class="review_header">'
	n +='<div class="rvw_header_left">'
	n +='<h3>'+ Main.TitleCase(Shopping.Business[u].name)+'</h3>'
	n +='<ul class="review-star">'
	n +=starsReview
	n +='</ul>'
	n +='<span class="rating" style=" font-size:16px; color:#151515; font-weight: 300;">'+rev_tot+'  <?=$lang_resource['Ratings_V2'] ?></span>'
	n +='<div style="width:100%; margin-top:10px; float:left;">'
	if(parseInt(Shopping.Business[u].photosettings) == 1){
	n +='<button type="button" class="addphoto_btn" onclick="RestMenuList.AddPhoto()"><span><img src="images/step3-menu-list/cam-icon.png"></span><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></button>'
	}
	if(parseInt(Shopping.Business[u].reviewsettings) == 1){
	n +='<button type="button" class="write_review_btn" onclick="RestMenuList.AddReview()"><span><img src="images/step3-menu-list/write-review-icon.png" style="margin-top:-3px;"></span><?=$lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></button>'
	}
	n +='</div>'
	n +='</div>'
	n +='</div>'
	n +='<div id="reviewContent"></div>';
	n +='</div>'
	n +='</div>'
		n +='</div>'
        n +='</div>';
		


		<!------------------------------------ offers tab ------------------------------------------------>
		n +='<div class="plce_div" id="plce_div_offer" style="display: none" >';
		n +='<div class="tab_contant" id="tab_content-4">';





		 n +='<div class="container">'
		 n +='<div class="tab_wrapper">';
		 n +='<div class="business_information">'
         n +='<h3><?= $lang_resource['OFFERSSOF_V21'] ?> <span>'+ Main.TitleCase(Shopping.Business[u].name)+'</span></h3>'
         n +='<p>'+ p +'</p>'
         n +='</div>'		
		n +='<div id="dicountContent"></div>';

        n +='</div>'<!--demotest-->
		n +='</div>'
        n +='</div>';
		n +='</div>';
		<!------------------------------------ offers tab ------------------------------------------------>
		
		<!------------------------------------ Reserve tab ------------------------------------------------>
		n +='<div class="plce_div" id="plce_div_reserve" style="display: none" >';
		n +=RestMenuList.ReservationContentHtml(u);
		
		
	   n +='</div>';
	<!------------------------------------ Reserve tab ------------------------------------------------>
			
			if(document.getElementById("shoppingbox"))
			 document.getElementById("shoppingbox").innerHTML = n;
			

			  $.post("panel/lib/front-main.php", "f=allMenu&id=" + Shopping.Business[u].id, function (e) {

				   ShoppingCustom.catalogMenu(e);
				 });
		    $.post("panel/lib/front-main.php", "f=FetchAllGalleryImg&bid="+Shopping.Business[u].id, function (b) {
					Shopping.photogal = JSON.parse(b)
			       ShoppingCustom.Photogallery(b);


           })
		    $.post("panel/lib/front-main.php", "f=FetchAllGalleryVideo&bid="+Shopping.Business[u].id, function (b) {

				Shopping.videogal = JSON.parse(b)
			      ShoppingCustom.videogallery(b);


           })
		    $.post("panel/lib/front-main.php", "f=FetchDiscountOffer&bid="+Shopping.Business[u].id, function (b) {

			 ShoppingCustom.FuncOffer(b);


           })

		    if(Main.WidgetSettings.location_settings.neighborhood != 'f')
									{
		   
		   $.post("panel/lib/front-main.php", "f=FetchNeighborName&cid="+Shopping.Business[u].colony, function (b) {
             if( document.getElementById("colony_name"))
           document.getElementById("colony_name").innerHTML = b;    
           
           })
		   
									}
		   

			/***************************************************************************************************************************/
		var schr = "";
		
       document.getElementById("src_bx").innerHTML = schr;//FetchAllGalleryImg
		$.post("panel/lib/front-main.php", "f=allreviewDate&id=" + Shopping.Business[u].id, function (e) {
			Shopping.allreview = JSON.parse(e);
			$.post("panel/lib/front-main.php", "f=businessphotoUser&id="+Shopping.Business[u].id, function (b) {
				Shopping.allphotouser = JSON.parse(b);
				Shopping.reviewprint(JSON.parse(e))	;			
			});
		});
			
			
			



		/* **********************************************Resturant Menu page Banner ********************************************************* */



		$("#showcanvas").removeClass("inner-map");

		$("#showcanvas").removeAttr('style');
		document.getElementById("showcanvas").innerHTML = ban;
		
		

		$(".rest-body").removeClass('rest-body');
		/* **********************************************Resturant Menu page Banner ********************************************************* */

		
		//document.getElementById("src_bxNew").style.display = "none";
        document.getElementById("shoppingbox").innerHTML = n;
	    //Ads.Init("shopmenuadscontainer", Main.WhereAmIData.city);
        document.getElementById("right").style.display = "none";
			if(resSearch) {
				Shopping.Menuskiptab(5);
				}

		if( Main.clicktabName == "onlyReserve") {
			$("#tabMenu1").hide();
			Shopping.Menuskiptab(5);
			}
		
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
         });
		 
		 
		 
		 $(document).ready(function() {
			
            $(".menu_rest_dsp h3").css({"color":"#fff"});
			$(".menu_rest_dsp p").css({"color":"#fff"});
			$(".menu_payment_logos").css({"color":"#fff"});
			$(".reating_text_menu").css({"color":"#fff"});
			$(".payment-time").css({"color":"#fff"});
			$(".item_dv").css({"color":"#fff"});
			
			
			
			
         });
		 
		 
		  if(Main.ResturantWidgetSettings || Main.ButtonWidgetSettings || Main.FloatWidgetSettings){				
		 $(document).ready(function() {
		$("h3").css({"color":"#000"});
		$("p").css({"color":"#000"});
		$("a").css({"color":"#000"});
		$(".product_dsp a").css({"color":"#000"});
		$(".product_dsp h3").css({"color":"#000"});
		$(".product_dsp p").css({"color":"#000"});
		$(".manu_tabs li a").css({"color":"#000"});
		
		$(".menu_rest_dsp h3").css({"color":"#000"});
			$(".menu_rest_dsp p").css({"color":"#000"});
			$(".menu_payment_logos").css({"color":"#000"});
			$(".reating_text_menu").css({"color":"#000"});
			$(".payment-time").css({"color":"#000"});
			$(".item_dv").css({"color":"#000"});
		
		 });
		}
		 
		
		
		/*$(function() {
			
		$( "#rdate" ).datepick({ minDate: 0,maxDate: 7 , onSelect: function(date, instance) {
       
		 var dd= $('#rdate').val();
		  
		  var dd1=dd.substr(3,2)
		
		  var curr_date= Main.curr_date;
		  var curr_hour = Main.curr_hour;
		  var curr_minute=Main.curr_minute;
		 
		 ////*********Hour function start*******************		
			var a = '<select >';
			a+= '<option value="">Hour</option>';
			if(dd1 == curr_date){
				if(curr_minute>45){
		for(var i=curr_hour+1; i<24; i++){		
			
							if(time_format=="12"){
								capi= Main.convertTimeFormatHour(i);
							}else{
								capi=Main.zeroPad(i,2);
							}	
								
			a+= '<option value="' + i + '">' +capi + '</option>';
			
			}
			}
			else
			{
				
		for(var i=curr_hour; i<24; i++){		
			
							if(time_format=="12"){
								capi= Main.convertTimeFormatHour(i);
							}else{
								capi=Main.zeroPad(i,2);
							}	
								
			a+= '<option value="' + i + '">' +capi + '</option>';
			
			}
			
				}
			a +='</select>';
			
			document.getElementById("rhour").innerHTML=a;
			
			}
			else
			{
				for(var i=0; i<24; i++){
					
					if(time_format=="12"){
								capi= Main.convertTimeFormatHour(i);
							}else{
								capi=Main.zeroPad(i,2);
							}	
			
			a+= '<option value="' + i + '">' + capi + '</option>';
			
			}
			a +='</select>';
			document.getElementById("rhour").innerHTML=a;
				}
		//*********Hour function end*******************	
		
		//*********Minute function start*******************		
		
		
				var b = '<select>';
				b+= '<option value="">Minute</option>';
				if(dd1 == curr_date){
					if(curr_minute<15){
					 for (i=15;i<60;i=i+15){
						 var j = Main.zeroPad(i,2);
					 b+= '<option value="' + j + '">' + j + '</option>';
					 }
					}
					else if(curr_minute<30){
					 for (i=30;i<60;i=i+15){
						 var j = Main.zeroPad(i,2);
					 b+= '<option value="' + j + '">' + j + '</option>';
					 }
					}
					else if(curr_minute<45){
					 for (i=45;i<60;i=i+15){
						 var j = Main.zeroPad(i,2);
					 b+= '<option value="' + j + '">' + j + '</option>';
					 }
					}
					else
					{
						 for (i=0;i<60;i=i+15){
						 var j = Main.zeroPad(i,2);
					     b+= '<option value="' + j + '">' + j + '</option>';
					 }
						
						}
				}
				else
				{
					 for (i=0;i<60;i=i+15){
				     var j = Main.zeroPad(i,2);
					 b+= '<option value="' + j + '">' + j + '</option>';
					 }
					}
					b +='</select>';
				document.getElementById("rmin").innerHTML=b;
		//*********Minute function end*******************			
		
    }}); 
		});*/

		if(Main.NullToEmpty(myParam) !="")
		{
			Shopping.Menuskiptab(3);
		}

        document.getElementById("dishsearch").onkeyup = function ()
        {

            RestMenuList.PopulateDishesList(Shopping.Business[u].currency,Shopping.Config.Dishes.List.SortBy, true)
        };

		 var qn = 0;



        for (var f in Shopping.Cart.business)
        {

            for (var e in Shopping.Cart.business[f].dishes)
            {


				qn +=Shopping.Cart.business[f].dishes[e].quantity;

            }
        }

	 if(Shopping.Cart.business) {
              $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> '+qn+' <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
				}
				else {
					$("#orderprice").html("0.00");
					$("#cart_taxid").html("");
					$("#cart_servicefeeid").html("0.00");
					$("#itemCount").html('<?= $lang_resource['MENU_LIST_YOU_HAVE'] ?> <span> 0 <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
		}
     
        this.ReturnBtnAction = this.PrintBusinessList;
		//alert(JSON.stringify(Shopping.Business[u].currency))
        RestMenuList.PopulateDishesList(Shopping.Business[u].currency,Shopping.Config.Dishes.List.SortBy, true)
    },
	

	 PopulateDishesList: function (currency,E, z)
    {
		

        if (z)
        {
			E='catname';

         
		   Shopping.Menu.dishes.sort(Main.SortByProperty(E));
		   Shopping.Menu.dishes =  Shopping.AscendingByName();
		 
		 

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
        var r = '<div id="dishesresultsinner">';
		
        var C = "";
		var n = "";
        var D;
		var EmptyChk = false;
		
		/*********************************Popular dish************************************************************/
		r += '<div id="popDivEmptyChk"><div id="popularsdish"></div></div>';
		
		var mp = "";
		
		/*********************************Popular dish************************************************************/

		
        for (v in A)
        {
			
           if (A[v].isimg==1)
            {
               
				 C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/1/panel.jpg?c=" + Main.Random ;
            }
           
			if (A[v].isimg2==1)
            {
               
				 C2 = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/2/panel.jpg?c=" + Main.Random ;
            }
           
			if (A[v].isimg3==1)
            {
             
				 C3 = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/3/panel.jpg?c=" + Main.Random ;
            }
           
		
            if (A[v].description)
            {
                 D = A[v].description.replace('"', "'").replace(/(\r\n|\n|\r)/gm,"");
            }
            else
            {
                D = ""
            }

			if(v!=0)
			{
			if(A[v].catname != A[v-1].catname)
				{
				r +='</div>'	
				r += '<h3 class="category_heading">'+ A[v].catname.toUpperCase() +'</h3>';
				r +='<div class="row">'

				}
			}

			if(v == 0)
			{
				r += '<h3 class="category_heading">'+ A[v].catname.toUpperCase() +'</h3>';
				r +='<div class="row">'
			}
			
			
			
			 /*if(A[v].feature == "t")
            {
			
				
				EmptyChk = true;
			mp +='<div class="row">'
			mp +='<div class="col-md-6">'
			mp +='<div class="product_dv">'
			mp +='<div class="row">'
			mp +='<div class="col-md-8">'
			if(Main.businessimagesettings != 0)
			{
			
			if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0   ) {
			// r +='<div style="width: 100px;float: left;" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">'
			mp +='<div class="prodict_img" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">'
			if (A[v].isimg==1){	
			mp +='<img src="'+C+'" style="width: 90px; height: 90px; border-radius: 4px;">'
			}else if (A[v].isimg2==1){	
			mp +='<img src="'+C2+'" style="width: 90px; height: 90px; border-radius: 4px;">'
			}else if (A[v].isimg3==1){	
			mp +='<img src="'+C3+'" style="width: 90px; height: 90px; border-radius: 4px;">'
			}
			mp +='</div>'
			}
			
			}
			
			
			mp +='<div class="product_dsp"><a href="javascript:void(0)" class="tooltip blue-tooltip"><h3  onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">'+ A[v].name.toUpperCase();
			
			if(Main.businessimagesettings != 1)
			{
			if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0   ) {	
			mp +='<span>';
			
			mp +='<table width="100%" border="0" cellspacing="4" cellpadding="4">';
			mp +='<tr>';
			if (A[v].isimg==1)
			{
			mp +='<td><img src="'+C+'" width="200" height="175"></td>';
			}
			if (A[v].isimg2==1)
			{
			mp +='<td><img src="'+C2+'" width="200" height="175"></td>';
			}
			if (A[v].isimg3==1)
			{
			mp +='<td><img src="'+C3+'" width="200" height="175"></td>';
			}
			mp +='</tr>';
			mp +='</table>';
			mp +='</span>';
			}
			
			}
			mp +='';
			mp +='</h3>';                    	  
			mp +='<p class="item_dsp">'+D+'</p>';
			mp +='</a></div></div>';
			
			
			mp +='<div class="col-md-4">'
			mp +='<div class="product_price_dv">'			
			if(Main.NullToEmpty(A[v].price) == ''){
			//A[v].price = 0.00;
			mp +=' <h3>'+currency+' <span  id="dish_' + A[v].id + '_price" >'+A[v].price+ '</span></h3>';
			}else{
			var lang1='';
			if(A[v].price!=''){
			// lang1="'+Main.car+'";
			lang1=currency;
			
			}
			mp +=' <h3>'+lang1+'<span id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</span></h3>';
			}
			
			
			mp +='<button type="button" class="adtocart" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">+</button>'
			mp +='</div>'<!--product_price_dv-->
			mp +='</div>'<!--col-md-4-->
			mp +='</div>'<!--row-->
			mp +='</div>'<!--product_dv-->
			mp +='</div>'
					 
			}*/
			
			
			console.log("bimg="+Main.businessimagesettings)
			
			 
			 
			 r +='<div class="col-md-6">'
			 r +='<div class="product_dv" style="cursor: pointer;" onclick="ProductOption.add_product_options_db(this,' + A[v].id + '); return false;">'
			 r +='<div class="row">'
			 r +='<div class="col-md-8">'
			 /*if(Main.businessimagesettings != 0)
			  {
			 
			  if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0   ) {
			
r +='<div class="prodict_img" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">'
			 if (A[v].isimg==1){	
			 r +='<img src="'+C+'">'
			}else if (A[v].isimg2==1){	
			 r +='<img src="'+C2+'">'
			}else if (A[v].isimg3==1){	
			 r +='<img src="'+C3+'">'
			}
			 r +='</div>'
			}
			
			  }*/
			 
			
			  r +='<div class="product_dsp"><a href="javascript:void(0)" class="atooltip"><h3>'+ A[v].name.toUpperCase()+'</h3>';
			  
			  if(Main.businessimagesettings != 1)
			  {
							  if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0   ) {	
							  r +='<div class="spandiv2">';
	 					 
							   if (A[v].isimg==1)
							   {
								 r +='<img src="'+C+'">';
							   }
							   if (A[v].isimg2==1)
							   {
									 r +='<img src="'+C2+'">';
							   }
								if (A[v].isimg3==1)
							   {
									 r +='<img src="'+C3+'">';
							   }
							 
							 r +='</div>';
							  }
							  
			  }
							  r +='';
							   //r +='</h3>';                    	  
                            r+='<p class="item_dsp">'+D+'</p>';
                         r +='</a></div></div>';
						 
						 
			r +='<div class="col-md-4">'
			r +='<div class="product_price_dv">'			
			if(Main.NullToEmpty(A[v].price) == ''){
			//A[v].price = 0.00;
			r +=' <h3>'+currency+' <span  id="dish_' + A[v].id + '_price" >'+A[v].price+ '</span></h3>';
			}else{
			var lang1='';
			if(A[v].price!=''){
			// lang1="'+Main.car+'";
			lang1=currency;
			
			}
			r +=' <h3>'+lang1+'<span id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</span></h3>';
			}
			
				
			r +='<span id="dish_' + A[v].id + '_imghide"><button type="button" class="adtocart" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')" id="dish_' + A[v].id + '_imglink" >+</button></span>'
			r +='</div>'<!--product_price_dv-->
			r +='</div>'<!--col-md-4-->
			r +='</div>'<!--row-->
			r +='</div>'<!--product_dv-->
			r +='</div>'
			
        }
		

        r += "</div>";
        document.getElementById("dishesresults").innerHTML = r;
		
		 document.getElementById("popularsdish").innerHTML = mp;
        
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
			//$("h3").css({"color":Main.adstle});
         });
		 
		 if(Main.ResturantWidgetSettings || Main.ButtonWidgetSettings || Main.FloatWidgetSettings){				
		 $(document).ready(function() {
		$("h3").css({"color":"#000"});
		$("p").css({"color":"#000"});
		$("a").css({"color":"#000"});
		$(".product_dsp a").css({"color":"#000"});
		$(".product_dsp h3").css({"color":"#000"});
		$(".product_dsp p").css({"color":"#000"});
		$(".manu_tabs li a").css({"color":"#000"});
		
		$(".menu_rest_dsp h3").css({"color":"#000"});
			$(".menu_rest_dsp p").css({"color":"#000"});
			$(".menu_payment_logos").css({"color":"#000"});
			$(".reating_text_menu").css({"color":"#000"});
			$(".payment-time").css({"color":"#000"});
			$(".item_dv").css({"color":"#000"});
		
		 });
		}
		
		
		$('[data-simplebar-direction]').each(function () {
			
			var totalheight = $("#plc_rgt_in").height()  +  $("#chk_reserve").height() ;
			
			
		if(totalheight >180) {
			
			//$(".dishDvScroll_in").css("height","300px");
			$(".simplebar-scrollbar").addClass('visible');
			
           $(this).simplebar();
		}
			
			
        });
	
		 (function() {
    var win = $(window);
    var sizes = {
      half: 0.5,
      full: 1,
      threequarter: 3/4,
      onefive: 1.5,
      triple: 3
    }
   

    
    //RestMenuList.attach();
  })();
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
	
	//alert("ok")
		$(".stillpages .item:not(.use_manual)").stick_in_parent();
      	$(".stillpages .item.use_manual").stick_in_parent({
        parent: ".stillpages",
        spacer: ".manual_spacer"
      });
	 },
	
	infoDivHtml: function (u) {
		 var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");
		
        var p = Shopping.Business[u].street + " - " + Shopping.Business[u].colony +"," + o;
		
			var n ='';
			n += '<div class="container">';
			n +='<div class="tab_wrapper">'
			n +='<div class="business_information">'
			n +='<h3>'+ Shopping.Business[u].name.toUpperCase()+'</h3>'
			n +='<p>'+ p +'</p>'
			n +="<input type='hidden' id='deladd' value='"+p+"'>"
			n +='</div>'
			n +='<h4><?= $lang_resource['CATALOG_V21'] ?> : <?= $lang_resource['MENU_LIST_OPENING_TIME'] ?></h4>'
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="catalog_tbl" id="catlogview">'
			n +='</table>'
			
			
			n +='<h4><?= $lang_resource['DELIVERYL_V21'] ?><input type="hidden" id="delbid" value="'+Shopping.Business[u].id+'"></h4>'
			n +='<div class="row">'
			n +='<div class="col-md-3" id="deliveryItemPrice">'
			n +='</div>'
			n +='</div>'
			n +='<div class="row">'
			n +='<div class="col-md-12">'
			n +='<div class="info_map businessmapbox" id="mapbox12"></div>'
			n +='</div>'
			n +='</div>'
			if(Main.NullToEmpty(Shopping.Business[u].abusiness)!=""){
			n +='<h4><?= $lang_resource['ABOUTR_V21'] ?></h4>'
			n +='<p>'+ Main.NullToEmpty(Shopping.Business[u].abusiness)+'</p>'
			}
			n +='<div id="photo_div">'
			n +='<h4><?= $lang_resource['PHOTOG_V21'] ?></h4>'
			n +='<div id="infophotpdiv">'                    
			n +='</div>'
			n +='</div>'
			
			n +='<div id="video_div">'
			n +='<h4><?= $lang_resource['VIDEOG_V21'] ?></h4>'
			n +='<ul class="info_video_gallery" id="infovideodiv">'
			n +='</ul>'
			n +='</div>'
			
			n +='</div>'
			n +='</div>'
			return n;
 		},
		ReservationContentHtml: function (u) {
			
				var n ='<div class="tab_contant" id="tab_content-5">';

				n +='<div class="demotest">';
				n +='<div class="main">';
				n +='<div class="menu_tab_content">';
          		<!------------------------------------ Search Box ------------------------------------------------>
		Forms.Clean("reserveform", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "reserveform";
		
	
	
		
        var b = false;
            c = new Object();
            Forms.Form.reserveform.type = "create"
 
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?=$lang_resource['RESERVATION_NO_GUEST']?>"
        });
		
        for (var i=1;i<=8;i++)
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
            id: "-1",
            caption: "<?=$lang_resource['RESERVATION_NO_HOUR']?>",
        });
		
		 //Time selection settings. 
					  	time_format="<?=$lang_resource['TIME_FORMAT']?>";
        for (j=0;j<24;j++)
        {
			
				if(time_format=="12"){
					capj= Main.convertTimeFormatHour(j);
				}else{
					capj=Main.zeroPad(j,2);
				}	
					
            h.push(
            {
                id: j,
                caption: capj
            })
        }

        var mi = new Array();
        mi.push(
        {
            id: "-1",
            caption: "<?=$lang_resource['RESERVATION_NO_MUNITE']?>",
        });
		
        for (k=0;k<60;k=k+15)
        {
            mi.push(
            {
                id: k,
                caption: Main.zeroPad(k,2)
            })
        }
	
		if(!Main.WhereAmIData.rhour){
			Main.WhereAmIData.rhour = -1;
		}
		if(!Main.WhereAmIData.rmin){
			Main.WhereAmIData.rmin = -1;
		}
		
					n +='<div class="tablewra">';
          			
                    n +='<div class="sky-panel">';
					n +='<div class=" pull_left field-dv">'
					n +='<small style="float: left;  margin-bottom: 5px;"><?=$lang_resource['RESERVATION_SELECT_GUEST']?></small>'
					n +=Forms.CreateSelectPropertyNew3("reserveform", "guest", d, Main.NullToEmpty(Main.WhereAmIData.guest), false,"", false);
					n +='</div>'
                        
					n +='<div class=" pull_left field-dv">'
					n +='<small style="float: left;  margin-bottom: 5px;"><?=$lang_resource['RESERVATION_SELECT_DATE']?></small>'
					n +=Forms.CreateInputProperty10("reserveform", "rdate",  Main.NullToEmpty(Main.WhereAmIData.rdate), false,"", false)+'</div>'
					 
					
					n +='<div class=" pull_left field-dv">'
					n +='<small style="float: left;  margin-bottom: 5px;"><?=$lang_resource['RESERVATION_SELECT_HOUR']?></small>'
					n += Forms.CreateSelectPropertyNew32("reserveform", "rhour", h, Main.NullToEmpty(Main.WhereAmIData.rhour), false,"", false);
					n +='</div>'
					
					n +='<div class=" pull_left field-dv">'
					n +='<small style="float: left;  margin-bottom: 5px;"><?=$lang_resource['RESERVATION_SELECT_MINUTE']?></small>'
					n += Forms.CreateSelectPropertyNew32("reserveform", "rmin", mi,  Main.NullToEmpty(Main.WhereAmIData.rmin), false,"", false);
					n +='</div>'
					n +='<div class=" pull_left field-dv" style="margin-left:395px;">'
					n +='<button type="button" class="search-btn" onclick="Shopping.SearchSaveReserveTime()"><?= $lang_resource['MENU_LIST_SEARCH_SAVE'] ?></button>'
					n +='</div>'
                    n +='</div>';
				
					var tableBox = false;
					var RoomBox = false;
					var FreeBox = false;
			
			
			if(Main.WhereAmIData.rhour != -1 && Main.WhereAmIData.rmin != -1){
			
					for (r in Shopping.reserves){
						if(Shopping.reserves[r].rtype == 2){
							RoomBox = true;
						}
						else if(Shopping.reserves[r].rtype == 1){
							tableBox = true;
						} 
						else if(Shopping.reserves[r].rtype == 3){
							FreeBox = true;
							
						}
					}
					
			}
			
			if(tableBox == false && RoomBox == false && FreeBox == false  ) {
				n +='<div class="tablewra">';
			    n +='<h1></h1>';
				n +='<div class="tabledv reserve_empty_message"><?=$lang_resource['SHOPPING_RESERVATION_TABLE_EMPTY']?>'
				n +='</div>'
				n +='</div>'
				} else {
             <!------------------------------------ Search Box ------------------------------------------------>
			 if(RoomBox == true) {
				 n +='<div class="tablewra">';
			n +='<h1 ><?=$lang_resource['FRONT_RESERVATION_ROOM']?></h1>'
			
			n +='<div class="tabledv">'
			for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 2){
			
			
			n +='<div class="tablebox">'
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
							
				   }
				  ///////////////////////////////////
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
			//////////////////////////////////////////////////
			var countg = Shopping.reserves[r].guest;
			n +='<div class="Rtable">'
			for(var countr =1; countr<=countg; countr++){
			if(Shopping.reservesbooked[0].room)	{
				if(Shopping.reservesbooked[0].room.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){
				n +='<div class="Rtable_btn_dv"><button class="Rtable_btn " id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookRoom('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></div>'
				}else{
				n +='<div class="Rtable_btn_dv"><button class="Rtable_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></div>'
				}
			}else{
				n +='<div class="Rtable_btn_dv"><button class="Rtable_btn " id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookRoom('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></div>'
			}
			
			}
			
			n +='</div>'
			n +='</div>'
	
				}
			}
			n +='</div>'
			n +='</div>'
			
			}
			
				<!------------------------------------------------------------For Room---------------------------------------------->
				<!------------------------------------------------------------For Table---------------------------------------------->
				if(tableBox == true) {	
				  n +='<div class="tablewra">';
                	n +='<h1><?=$lang_resource['FRONT_RESERVATION_TABLE']?></h1>';
                   
                	n +='<div class="tabledv">';
			
			for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 1){
			n +='<div class="tablebox">'
			n +='<h2 >'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>'
			Shopping.reservesc = JSON.parse(Shopping.reserves[r].schedule)
			
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
							
				   }
				   
				     ///////////////////////////////////
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
			//////////////////////////////////////////////////
		
			var countg = Shopping.reserves[r].guest;			
			n +='<div class="Rtable">'
			for(var countr =1; countr<=countg; countr++){
			if(Shopping.reservesbooked[0].table)	{
				if(Shopping.reservesbooked[0].table.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){
					
				n +='<div class="Rtable_btn_dv"><button class="Rtable2 " id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookTable('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></div>'
				
				}else{
				n +='<div class="Rtable_btn_dv"><button class="Rtable2 booked2" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></div>'
				}
			}
			else{
				n +='<div class="Rtable_btn_dv"><button class="Rtable2 " id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookTable('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></div>'
			}
			}
			
			n +='</div>'
		
			n +='</div>'
			
				}
			}
			n +='</div>'
			n +='</div>'
			<!--tbl_dv-->
				}
			<!------------------------------------------------------------For Table---------------------------------------------->
			<!------------------------------------------------------------For Free---------------------------------------------->
			if(FreeBox == true) {
			  n +='<div class="tablewra">';	
			n +='<h1><?=$lang_resource['FRONT_RESERVATION_BOOKING_AVAILABILTY']?></h1>'
			n +='<div class="tabledv">'
			for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 3){
			
			n +='<div class="Bookingbox">'
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
							
				   }
				     ///////////////////////////////////
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
			//////////////////////////////////////////////////
			
			var countg = Shopping.reserves[r].guest;
			n +='<div class="Rtable" >'			
			for(var countr =1; countr<=countg; countr++){
			if(Shopping.reservesbooked[0].free)	{
				if(Shopping.reservesbooked[0].free.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){
				n +='<div class="Rtable_btn_dv"><button class="Rtable_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookFree('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></div>'
				}else{
				n +='<div class="Rtable_btn_dv"><button class="Rtable_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></div>'
				}
			}
			else{
				n +='<div class="Rtable_btn_dv"><button class="Rtable_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookFree('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></div>'
			}
			}
			
			n +='</div>'
		
			n +='</div>'
		
			
				}
			}
			n +='</div>'
			n +='</div>'
			
					}
              }
            
			        n +='<div class="tablewra" id="ReservatioPayModule" style="display:none" >';
                	n +='<h1><?= $lang_resource['V3_ORDER_RESERVATION_DETAILS'] ?></h1>';
                  
                	     n +='<div class="tabledv">';
                    	n +='<div class="tabledv_left">';
						n +='<div class="tabledvin"><span><?= $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] ?>:</span><input type="text" id="reservename" value="'+Main.NullToEmpty(Shopping.Cart.buyer.name)+'" onkeyup="Shopping.UserUpdate(this,\'reservename\')"></div>';
						n +='<div class="tabledvin"><span><?= $lang_resource['CONTROL_PANEL_USERS_EMAIL_HEADER'] ?>:</span><input type="text" id="reserveemail" value="'+Main.NullToEmpty(Shopping.Cart.buyer.email)+'" onkeyup="Shopping.UserUpdate(this,\'reserveemail\')"></div>';
					    n +=' <div class="tabledvin">';
						n +='<div class="tabledv_ph"><span><?= $lang_resource['Phone_V2'] ?>:</span><input type="text" id="reservetel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'reservetel\')"></div>';
						n +='<div class="tabledv_sms">';
						n +='<span style="width:75%"><?= $lang_resource['CHECKOUT_RECEIVE_SMS'] ?>:</span>';
						n +='<div style="float:left;margin-top: -5px;"><input type="checkbox" name="checkboxG4"  id="twillo" onclick="Shopping.UpdateTwilio(this)" class="css-checkbox" />';
						n +='<label for="twillo" class="css-label"></label>';
						 n +='</div>';
						 n +='</div>';
						 
						 	
				<!-- Braintree Field -->
			
				n +='<div class="tabledvin braintree_field" style="display:none;padding-top:25px">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?>:</span><input type="text"  class="field_text_ck" id="braintreecard" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')"/>';
				n += '</div>';
				
				n +=' <div class="tabledvin braintree_field" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?>:</span><input type="text"  class="field_text_ck" id="braintreeexpiry" value="" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')"/>';
				
				n += '</div>';
				
				n +=' <div class="tabledvin braintree_field" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?>:</span><input type="text"  class="field_text_ck" id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>';
				
				n += '</div>';				
				<!-- Braintree Field -->
				
				<!--Authorize.net field-->
				n +=' <div class="tabledvin au_ne_pay" style="display:none;padding-top:25px">';
				
				n +='<span><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] ?>:</span><input type="text" id="cardno"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardno\')"/>';
				
				n += '</div>';	
				
				n +=' <div class="tabledvin au_ne_pay" style="display:none;">';
				
				n +='<span><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?>:</span><input type="text"  id="expmm"   class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'expmm\')"/>';
				
				n += '</div>';	
				
				n +=' <div class="tabledvin au_ne_pay" style="display:none;">';
				
				n +='<span><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?>:</span><input type="text" id="expyy"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'expyy\')"/>';
				
				n += '</div>';	
				
			
				<!--Authorize.net field-->
				
				<!-- Card Save field-->
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['CHECKOUT_FULL_ADDRESS'] ?>:</span><input type="text" id="buyeraddress" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'address\')"/>';
				
				n += '</div>';
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['Neighbourhood_V2'] ?>:</span><input type="text" id="buyercolony" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'colony\')"/>';
				
				n += '</div>';
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?>:</span><input type="text" id="cityname1" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cityname\')"/>';
				
				n += '</div>';
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?>:</span><input type="text" id="zip1"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'zip\')"/>';
				
				n += '</div>';
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;padding-top:25px">';
				
				n +='<span><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?>:</span><input type="text" id="cardsavecardno" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')"/>';
				
				n += '</div>';	
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?>:</span><input type="text" id="cardsaveexpmm" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')"/>';
				
				n += '</div>';	
			
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?>:</span><input type="text" id="cardsaveexpyy" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')"/>';
				
				n += '</div>';
				
				n +=' <div class="tabledvin cardsaveclass" style="display:none;">';
				n +='<span><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?>:</span><input type="text" id="cardsavecvv" class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')"/>';
				
				n += '</div>';
				
				
				
				
				<!-- Card Save field-->
						 n +='</div>';                    
					     n +='</div>';
							
							
                     
           n +='<div class="tabledv_right">';
		   n +='<span class="tbl_price_heading"><?= $lang_resource['MENU_LIST_PRICE_DETAILS'] ?></span>'
           n +='<div class="tabledvin">';
                            
                              // n +='<textarea name="" cols="" rows=""></textarea>';
							  
		
			n +='<div class="price_dv">'
			
			n +='<div class="inr">'
			n +='<table width="100%" border="0" cellspacing="0" class="price_tbl">'
			
			n +='<tr id="room_av" style="display:none;">'
			n +='<td><span id="room_qty" style="width:auto; font-size: 16px;">0</span> X <?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></td>'
				roomdisplay = 'style="display:none"';	
			n +='<td  id="roomtd1" '+roomdisplay+'>:</td>'
			
			n +='<td  id="roomtd" '+roomdisplay+'>'+Main.car+'<span id="room_price" style="font-size: 18px;color: #666;margin: 0px 5px 3px;width:auto;float:none;" >0</span></td>'
			n +='</tr>'
			
			n +='<tr id="table_av" style="display:none;">'
			n +='<td><span id="table_qty" style="width:auto; font-size: 16px;">0</span> X <?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></td>'
			tabledisplay = 'style="display:none"';	
			n +='<td  id="tabletd1" '+tabledisplay+'>:</td>'
			
			n +='<td  id="tabletd" '+tabledisplay+'>'+Main.car+'<span id="table_price" style="font-size: 18px;color: #666;margin: 0px 5px 3px;width:auto;float:none;">0</span></td>'
			n +='</tr>'
			
			n +='<tr id="free_av" style="display:none;">'
			n +='<td><span id="free_qty" style="width:auto; font-size: 16px;">0</span> X <?= $lang_resource['FRONT_RESERVATION_FREE'] ?></td>'
			freedisplay = 'style="display:none"';	
			n +='<td id="freetd1" '+freedisplay+'>:</td>'
			
			n +='<td id="freetd" '+freedisplay+' >'+Main.car+'<span id="free_price" style="font-size: 18px;color: #666;margin: 0px 5px 3px;width:auto;float:none;">0</span></td>'
			n +='</tr>'
			n +='</table>'
			
			n +='</div>'
			<!--inr-->
	  
			n +='<div class="inr" style="min-height: 0px;">'
			n +='<table width="100%" border="0" cellspacing="0" class="price_tbl">'
			n +='<tr id="total_av" style="display:none;">'
			n +='<td style="text-align:right"><strong><?= $lang_resource['EXPORT_TOTAL'] ?></strong></td>'
			n +='<td></td>'
			globaltotaldisplay = ' display:none;';
			n +='<td style="color:#da251d; font-weight:700; '+freedisplay+'"  id="totaltd" >'+Main.car+'<span id="total_price" style="font-size: 18px;color: #666;margin: 0px 5px 3px;color:#da251d; font-weight:700;width:auto;float:none;" >0</span></td>'
			n +='</tr>'
			n +='</table>'
			
			n +='</div>'
			<!--inr-->
			n +='</div>'
                          
                        n +='</div>';
                     
                        n +='</div>';
                                           
               n +='</div>';
             
                n +='<div class="tablewra">';
                	n +='<h1><?= $lang_resource['EXPORT_PAYMENT_METHOD'] ?></h1>';
                   
                	
				
				n +='<div class="tabledv">'
				n +='<div class="pull_left" id="reserve_paymethod" style="margin-left:69px; display:none;">'
				
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
			
				
				n +=Payment.ReservatioPayment(u);
      
				n +='</div>';
				n +='<div style="width: 100%; display: table;"></div>'
				n +='<div class="pull_left" id="bottom1-order-btn"  style="margin-left:388px;"><button id="reservepayment" class="reserv-btn" onclick="Shopping.ReserveNow()"><?= $lang_resource['PAYMENT_RESERVE_NOW'] ?></button></div>'
				n +='</div>';
		
				n +='</div>';
				n +='</div>';
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
			if(document.getElementById("restrnme"))
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
			 
			
              for (j in Shopping.Cart.business[i].dishes)
            {
				
			g += '<div class="order_summary">'
			g += '<ul>'
			g += '<li>'+Shopping.Cart.business[i].dishes[j].quantity+'</li>'
			g += '<li class="item_name">'+ Shopping.Cart.business[i].dishes[j].name.toUpperCase()
			if(Shopping.Cart.business[0].dishes[j].options) {
			g += '<br><span class="options">'+ProductOption.Margeslash(Shopping.Cart.business[i].dishes[j].options)+'</span>';
			}
			g +='</li>'
			
			
			g += '<li class="item_price" id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">' + Shopping.FormatPrice(Shopping.Cart.business[i].dishes[j].total,Main.car)+'</li>'
			g += '</ul>'
			g += '<div class="row">'
			g += '<div class="col-md-9 comment_field">'
			g += '<input type="text" class="form-control" id="' + Shopping.Cart.business[i].id + '_comments" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessdishCommentUpdate(this,' + i + ',' + j + ')" value="'+ Main.NullToEmpty(Shopping.Cart.business[i].dishes[j].comments)+'">'
			g += '</div>'<!--col-md-1-->
			g += '</div>'<!--row-->
			g += '</div>'
			
			}
            // total_points_earned=total_points_earned+parseInt(Shopping.Cart.business[i].dishes[j].points);
            // alert(total_points_earned);
             
			 /******************************************Reservation******************************************************/
			 if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
					      g += '<table style="padding:15px">';
						 g +='<tr>';
                         g +='<td  style="padding: 10px 0;" align="left" colspan="2" class="total reserve_cart_head"><?= $lang_resource['SHOPPING_RESERVATION_OPTIONS'] ?></td>';
                         
					   	g +='</tr>';
						if(globalReserve.Room.length!="0") {
					    g +='<tr>';
						 g += '<td style="padding: 10px 0;" align="left" ><div class=" food-name"><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?> X'+globalReserve.Room.length+"</div></td >";
                       
						 if(Shopping.Cart.reservePrice.Room) {
							  g +='<td align="left" valign="top" class="ch_rate" >'+Main.car+''+Shopping.Cart.reservePrice.Room+'</td>';
						 }
                         g +='</tr>';
						}
						if(globalReserve.Table.length!="0") {
							
						 g +='<tr>';
						 g += '<td  style="padding: 10px 0;" align="left" ><div class=" food-name"><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?> X'+globalReserve.Table.length+"</div></td >";
                       
						 if(Shopping.Cart.reservePrice.Table) {
					      g +='<td align="left" valign="top" class="ch_rate" >'+Main.car+''+Shopping.Cart.reservePrice.Table+'</td>';
						 }
                         g +='</tr>';
						
						
						}
						if(globalReserve.Free.length!="0") {
							 g +='<tr>';
						 g += '<td  style="padding: 10px 0;" align="left" ><div class=" food-name"><?= $lang_resource['FRONT_RESERVATION_FREE'] ?> X'+globalReserve.Free.length+"</div></td >";
                       
						 if(Shopping.Cart.reservePrice.Free) {
							  g +='<td align="left" valign="top" class="ch_rate" >'+Main.car+''+Shopping.Cart.reservePrice.Free+'</td>';
						 }
                         g +='</tr>';
						 
						}
						if(Main.NullToEmpty(Main.WhereAmIData.rdate)!="") {
						 g +='<tr>';
						  g +='<td align="left"  style="padding: 10px 0;" ><div class=" food-name"><?= $lang_resource['MOBILE_FRONT_VISUALS_DATE'] ?> :<div></td>';
                        
                         g +='<td align="left" valign="top" class="ch_rate"  ><span >'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'</span></td>';
					     g +='</tr>';
							}
						if(Main.NullToEmpty(Main.WhereAmIData.rhour)!="-1") {	
						  g +='<tr>';
                         g +='<td align="left"  style="padding: 10px 0;" ><div class=" food-name"><?= $lang_resource['FRONT_DRIVER_TIME'] ?> <div></td>';
                         g +='<td align="left" valign="top" class="ch_rate" ><span >'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rhour)),2)+':'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rmin)),2)+'</span></td>';
					     g +='</tr>';
					   	g +='<tr>';
						}
			 
			 }
			  /******************************************Reservation******************************************************/
			 
			if (parseFloat(Shopping.Cart.business[i].shipping) > 0)
			{
			h = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}
			else
			{
			h = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}
			
			g += '<div class="order_summary">'
			g += '<ul class="tax_text">'
			g += '<li>' + h + '</li>'
			var ship_txt = Shopping.Cart.business[i].shipping;		 
			if(ship_txt==0)
			{
			var ship_free = '<?=$lang_resource['SHOPPING_SECOND_FREE']?>';	
			
			g += '<li class="item_price" id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">' + ship_free + '</li>';
			
			}
			else
			{
			
			
			g += '<li class="item_price" id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">' + Shopping.FormatPrice(Shopping.Cart.business[i].shipping,Main.car) + '</li>';	
			
			}
			g += '</ul>'            	
			g += '<div class="row">'
			g += '<div class="col-md-9 comment_field">'
			g += '<input type="text" class="form-control" id="' + Shopping.Cart.business[i].id + '_comments" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessCommentUpdate(this,' + i + ')" value="'+ Main.NullToEmpty(Shopping.Cart.business[i].comments)+'">'
			g += '</div>'<!--col-md-1-->
			g += '</div>'<!--row-->
			g += '</div>'
			
			g += '<div class="order_summary" id="discount_div" style="display:none">'
			g += '<ul class="tax_text">'
			g += '<li id="discount_text"></li>'
			g += '<li class="item_price" id="discount_price"></li>'
			g += '</ul>'
			g += '<div class="row">'
			g += '<div class="col-md-9 comment_field">'
			<!--g += '<input type="text" class="form-control" placeholder="Comments ex. for whom?">'-->
			g += '</div>'<!--col-md-1-->
			g += '</div>'<!--row-->
			g += '</div>'
			
			g += '<div class="order_summary">'
			if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
			Shopping.Cart.servicefee =0;
			}
			g += '<ul class="tax_text">'
			g += '<li><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee +'%)</li>'
			g += '<li class="item_price">'+Main.car+'<span id="cart_servicefeeid">0.00</span></li>'
			g += '</ul>'
			g += '<div class="row">'
			g += '<div class="col-md-9 comment_field">'
			<!--g += '<input type="text" class="form-control" placeholder="Comments ex. for whom?">'-->
			g += '</div>'<!--col-md-1-->
			g += '</div>'<!--row-->
			g += '</div>'
			
			g += '<div class="order_summary">'
			g += '<ul class="tax_text">'
			g += '<li><?= $lang_resource['Tax_V2'] ?> ('+Shopping.Cart.buyer.tax +'%)</li>'
			if(Shopping.Cart.buyer.taxtype == 1) 
			g += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_not_included_V2'] ?></p>';
			else if(Shopping.Cart.buyer.taxtype == 2) 
			g += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_included_V2'] ?></p>';
			g += '<li class="item_price">'+Main.car+'<span  id="cart_taxid">' + Shopping.FormatPriceNotFree(Shopping.Cart.business[i].tax) +'</span></li>'
			g += '</ul>'
			g += '<div class="row">'
			g += '<div class="col-md-9 comment_field">'
			<!--g += '<input type="text" class="form-control" placeholder="Comments ex. for whom?">'-->
			g += '</div>'<!--col-md-1-->
			g += '</div>'<!--row-->
			g += '</div>'
			
			g += '<div class="order_summary" id="cart_tips_block" style="display:none">'
			g += '<ul class="tax_text">'
			g += '<li><?= $lang_resource['TRACKORDER_TIPS'] ?></li>'
			g += '<li class="item_price">'+Main.car+'<span  id="cart_tips">' + parseFloat(Shopping.Cart.buyer.tips).toFixed(2)  + '</span></li>'
			g += '</ul>'
			g += '<div class="row">'
			g += '<div class="col-md-9 comment_field">'
			<!--g += '<input type="text" class="form-control" placeholder="Comments ex. for whom?">'-->
			g += '</div>'<!--col-md-1-->
			g += '</div>'<!--row-->
			g += '</div>'


		  //g += "</table>";
			
		
        }
        document.getElementById("cartresultsinner").innerHTML = g;
		
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
			$("h3").css({"color":Main.adstle});
         });
		 Shopping.UpdateTotals()

	
       
    },
	
	MenuCartlist : function (i){
	var currency = Main.car;
		
		var  n ='';
            n +='<tr>'
			n +='<td>'+Shopping.Cart.business[0].dishes[i].quantity+'</td>'
			n +='<td class="product_name">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase()
			if(Shopping.Cart.business[0].dishes[i].options) {
			n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;">'+ ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</a></span>'; 
						 
			}
			n +='</td>'
			if(Shopping.Cart.business[0].dishes[i].comments) {
			n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';	
			}	
			n +='<td>'
			n +='<button type="button" class="item-add-btn" onclick="ProductOption.AddFromCart(  0, ' + i + ')"><i class="glyphicon glyphicon glyphicon-plus-sign"></i></button>'
			n +='<button type="button" class="item-delete-btn" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><i class="glyphicon glyphicon-minus-sign"></i></button>'
			n +='</td>'
			n +='<td>'+currency+' <span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPriceNotFree(Shopping.Cart.business[0].dishes[i].total)+'</span></td>'
			n +='</tr>'
			 
	return n;		 
		
		},
AddPhoto: function () {

	
	if(Main.User){
	var k = "";
	k +='<div class="wrapper">'
	k +='<div class="option_popup_header"><h3><span><?=$lang_resource['CNTROL_PANEL_REVIEW_ADD_PHOTO'] ?></span></h3>'
    k +='<div class="option_popup_close">'
    k +='<button class="option_popup_close_btn" onclick="Popup.Close();">X</button>'
    k +='</div>'
    k +='</div>'
    
    
    k +='<div class="inwrap">'
	k += '<form id="addphoto" name="addphoto" enctype="multipart/form-data" method="post" >';
	k +='<input type="hidden" id="business" name="business" value="'+Shopping.ActiveBusiness+'">'
	k +='<input type="hidden" id="photoname" name="photoname" value="'+Main.User.name+'">'
	k +='<input type="hidden" id="photoemail" name="photoemail" value="'+Main.User.email+'">'
    k +='<div class="cont">'
    k +='<div class="allheader"><?=$lang_resource['CNTROL_PANEL_REVIEW_UPLOAD_PHOTO'] ?></div>'	
    k +='<div class="add_photo_field">'
    k +='<input type="file" id="files" name="files[]" multiple>'
    k +='</div>'<!--add_photo_field-->
    k +='<ul class="added_photo">'

    k +='</ul>'
    k +='</div>'
   		
        
    k +='<center><button type="submit" name="submit" class="addcart" onclick="RestMenuList.PhotoSave()" ><?=$lang_resource['CNTROL_PANEL_REVIEW_UPLOAD'] ?></button></center>'
	k += '</form>'
    k +='</div>'    
	k +='</div>'
	Popup.ShowNewForProductOp(600, 700, k,'', null,null)
	}else{
		Main.AddPhotoLogin();
		
	}
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
	 $("<img></img>",{
	 class : "imageThumb",
	 src : e.target.result,
	 title : file.name
	 }).insertAfter(".added_photo");
	 });
	 fileReader.readAsDataURL(f);
	 }
	});
	 } else {swal("Error","Your browser doesn't support to File API","error"); }
	});
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
                           swal("Error","<?= $lang_resource['FRONT_PHOTO_THANK_YOU_RATING'] ?>","error");
                        },
                        error: function(html)
                        {
                        	Main.Ready();
                            alert(html);
                        }
                    });
                });
},


AddReview: function(){
				
	<!--wrapper-->
	var r = '';
	r += '<div class="wrapper">';
	r += '<div class="option_popup_header"><h3><span><?= $lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></span></h3>';
	r += '<div class="option_popup_close">';
	r += '<button class="option_popup_close_btn" onclick="Popup.Close();">X</button>';
	r += '</div>';
	r += '</div>';
	
	
	r += '<div class="inwrap">';
	
	r += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">';
	r += '<tr>';
	r += '<td width="50%" style="padding-right:10px">';
	r += '<label><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_EMAIL'] ?></label><br />';
	r += '<input type="text" id="email" class="texttbox_full">';
	r += '</td>';
	r += '<td width="50%" style="padding-left:10px">';
	r += '<label><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></label><br />';
	r += '<select id="city" class="selectbox_full">';
	r += '<option value=""><?= $lang_resource['FRONT_SELECT_CITY'] ?></option>';
	for(c in Main.Franchises)
	{
		r += '<option value="'+Main.Franchises[c].id+'">'+Main.Franchises[c].city+'</option>';
	}
	r += '</select>';
	r += '</td>';
	r += '</tr>';
	r += '</table>';
	r += '<div class="cont">';
	r += '<div class="allheader"><?= $lang_resource['TEMPLATE_RATE_NOW'] ?></div>';
	r += '<div class="review_ratings" style="width:100% !important;">';
	r += '<table width="50%" border="0" cellspacing="0" cellpadding="0" style="color:#353535; margin-bottom:15px;">';
	r += '<tbody><tr>';
	r += '<td><?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?></td>';
	r += '<td>:</td>';
	r += '<td style="padding-left:10px;">';
	r += '<ul class="review-star" style="margin-top:5px;">';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="1" id="quli_1" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="2" id="quli_2" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="3" id="quli_3" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="4" id="quli_4" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="5" id="quli_5" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><input type="hidden" id="quli" /></li>';
	r += '</ul>';
	r += '</td>';
	r += '</tr>';
	r += '<tr>';
	r += '<td><?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?></td>';
	r += '<td>:</td>';
	r += '<td style="padding-left:10px;">';
	r += '<ul class="review-star" style="margin-top:5px;">';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="1" id="punc_1" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="2" id="punc_2" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="3" id="punc_3" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="4" id="punc_4" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="5" id="punc_5" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><input type="hidden" id="punc" /></li>';
	r += '</ul>';
	r += '</td>';
	r += '</tr>';
	r += '<tr>';
	r += '<td><?= $lang_resource['TEMPLATE_SERVICE'] ?></td>';
	r += '<td>:</td>';
	r += '<td style="padding-left:10px;">';
	r += '<ul class="review-star" style="margin-top:5px;">';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="1" id="serv_1" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="2" id="serv_2" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="3" id="serv_3" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="4" id="serv_4" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="5" id="serv_5" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><input type="hidden" id="serv" /></li>';
	r += '</ul>';
	r += '</td>';
	r += '</tr>';
	r += '<tr>';
	r += '<td><?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?></td>';
	r += '<td>:</td>';
	r += '<td style="padding-left:10px;">';
	r += '<ul class="review-star" style="margin-top:5px;">';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="1" id="pack_1" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="2" id="pack_2" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="3" id="pack_3" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="4" id="pack_4" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><a class="gray_star" href="javascript:void(0);" title="5" id="pack_5" onclick="RestMenuList.CalculateReviewRatings(this.id)"></a></li>';
	r += '<li><input type="hidden" id="pack" /></li>';
	r += '</ul>';
	r += '</td>';
	r += '</tr>';
	r += '</tbody></table>';
	r += '</div>';
	r += '</div>';
	r += '<div class="cont">';
	r += '<div class=""><?= $lang_resource['CNTROL_PANEL_REVIEW_WRITE'] ?></div>';
	r += '<textarea id="review" cols="" rows="" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" style="width:100%; margin-top:5px;"></textarea>';
	r += '</div>';
	r += '<center><button type="button" class="addcart" onclick="RestMenuList.SaveReviewData()"><?= $lang_resource['save_V2'] ?></button></center>';
	r += '</div>';
	r += '</div>';
<!--wrapper-->



Popup.ShowNewForProductOp(600, 700, r,'', null,null)
		
},		

SaveReviewData: function(){
	//alert('ok');
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
	}
	else if(!email1.match(emailRegEx)){
		swal("Error","<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>","error");
		$('#email').focus();
		return false;
	}
	else if(!city){
		swal("Error","<?= $lang_resource['FRONT_SELECT_CITY'] ?>","error");
		return false;
	}
	else if(!quli){
		swal("Error","<?= $lang_resource['FRONT_QTY_RATING'] ?>","error");
		return false;
	}
	else if(!punc){
		swal("Error","<?= $lang_resource['FRONT_PUNC_RATING'] ?>","error");
		return false;
	}
	else if(!serv){
		swal("Error","<?= $lang_resource['FRONT_SERV_RATING'] ?>","error");
		return false;
	}
	else if(!pack){
		swal("Error","<?= $lang_resource['FRONT_PACK_RATING'] ?>","error");
		return false;
	}
	else{
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

ShowCardlist: function(){
	var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
var n ="";
n +='<div class="cart_header">'
n +='<div class="container">' 
n +='<div class="cart_header_text">'   	
n +='<span><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/cart-icon-black.png"></span>'
n +='<h2 id="itemCount"><?= $lang_resource['MENU_LIST_YOU_HAVE'] ?> <span>0 <?= $lang_resource['SHOPPING_ITEMS'] ?></span></h2>'
n +='</div>'<!--cart_header_text-->            
n +='</div>'<!--container-->
n +='</div>'

n +='<div class="container">'
n +='<table class="table table-striped cart-table" id="plc_rgt_in">'
n +='</table>'

n +='<table class="table table-striped cart-table">'
n += '<tr>'
n +='<td colspan="2"><?= $lang_resource['DELIVERY_V2'] ?></td>'
var lang='';
if(Shopping.Business[u].shipping!="Pending"){
lang=Shopping.Business[u].currency;
}

if(Shopping.Business[u].shipping=="Pending"){
var pend_txt = "<?= $lang_resource['NOVALID_V21'] ?>";

n +='<td colspan="2"><span id="' +Shopping.Business[u].id + '_shipping">'+pend_txt+'</span>'+lang+'</td>'

}
else
{

n +='<td colspan="2">'+lang+'<span id="' +Shopping.Business[u].id + '_shipping">'+Shopping.Business[u].shipping+'</span></td>'

}

n += '</tr>'
n += '<tr id="showDiscount"  style="display: none">'
n +='<td colspan="2"><?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?></td>'
n +='<td colspan="2">'+Shopping.Business[u].currency+'<span id="cart_dis"></span></td>'
n += '</tr>'  
var s="";

if(Shopping.Cart.buyer.taxtype == 1 && Shopping.Cart.buyer.taxtype) {
s += '<br/><span style="font-size : 11px;font-weight:bold"><?= $lang_resource['Tax_not_included_V2'] ?></span>'
}
if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
Shopping.Cart.servicefee =0;
}

n  += '<tr class="srv-tax">';
n  += '<td  colspan="2"><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee +'%)'
n  += '<td colspan="2">'+Shopping.Business[u].currency+'<span  id="cart_servicefeeid" >0.00</span></td>'
n += '</tr>';  
n += '<tr id="showTax" class="srv-tax" style="display: none" >'
n +='<td colspan="2"><?= $lang_resource['Tax_V2'] ?>';
if(Shopping.Cart.buyer.tax) {
n += '(' + Shopping.Cart.buyer.tax + '%) :'+s+'</td>'
} else {
n += ':';	
}
if( Shopping.Business[u].tax ==''){
	 Shopping.Business[u].tax="0.00"; 
}
n +='<td colspan="2"> '+Shopping.Business[u].currency+'<span id="cart_taxid">' + Shopping.Business[u].tax + '<span></td>'
n += '</tr>'
if(Main.NullToEmpty(Shopping.Cart.buyer.tips) > 0 || Main.NullToEmpty(Shopping.Cart.buyer.tips) !="" ) {
n += '<tr class="srv-tax">';
n +='<td colspan="2"><?= $lang_resource['TRACKORDER_TIPS'] ?>'
if(Shopping.Cart.buyer.tips=='' || Main.NullToEmpty(Shopping.Cart.buyer.tips) ==''){
Shopping.Cart.buyer.tips="0.00";
}
n +='<td colspan="2"><?= $lang_resource['SITE_CURRENCY'] ?>' + parseFloat(Shopping.Cart.buyer.tips).toFixed(2)  + '</td>'
n += '</tr>'
}
n += '<tr class="total_row">'
n += '<td colspan="2"><?= $lang_resource['EXPORT_TOTAL'] ?></td>'
n += '<td colspan="2">'+Shopping.Business[u].currency+' <span id="orderprice">0.00</span></td>'
n += '</tr>'
n += '</table>'
n += '<div class="row">'
n += '<div class="col-md-8">'
if(Shopping.Cart.preorder) {
		 			
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

//n += '<div class="set_time_btn_dv"><?=$lang_resource['PREORDER_DELIVERY']?><p> '+ showpreorderdate;
//n += '</p><span><button type="button" class="set_time_btn" onclick="Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><span><img src="images/step3-menu-list/set_time.png"></span><?= $lang_resource['MENU_LIST_CHANGE_TIME'] ?></button></span></div>';

n += '<p class="delivery-time"><?=$lang_resource['PREORDER_DELIVERY']?>  <span>'+ showpreorderdate+'</span></p>'
n += '<button type="button" class="change-time-btn" onclick="Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?=$lang_resource['MENU_LIST_CHANGE_TIME'] ?></button>'

}
else
{

n += '<p class="delivery-time"><?=$lang_resource['PREORDER_DELIVERY']?>  <span></span></p>'
n += '<button type="button" class="change-time-btn" onclick="Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?=$lang_resource['MENU_LIST_SET_TIME'] ?></button>'
}
n += '</div>'<!--col-md-8-->
n += '<div class="col-md-4">'
if(Shopping.OrderNowButtonCheckwithMin() >= Main.NullToEmpty(Shopping.Business[u].minimum) ) {
if(Main.WhereAmIData.reservestatus == 'reservation') {

n +='<button type="button" class=" cart_order_now_btn" onclick="Shopping.OpenCartCheck(true)"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE'] ?></button>';

} else  {

n +='<div id="min_order"><button type="button" class="cart_order_now_btn" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button></div>';

}
} else {
if(Main.NullToEmpty(Shopping.Business[u].minimum) != 0 || Main.NullToEmpty(Shopping.Business[u].minimum) != ''){

n +='<span id="min_order"><button type="button" class="order_now_btn order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Business[u].currency+' '+Shopping.Business[u].minimum+'</button></span>';

}else{
if(Main.WhereAmIData.reservestatus == 'reservation') {
n +='<button type="button" class=" cart_order_now_btn" onclick="Shopping.OpenCartCheck(true)"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE'] ?></button></span>';
}
else {

n +='<span id="min_order"><button type="button" class=" cart_order_now_btn" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button></span>';
}
}
}
n += '<button type="button" class="cart_back_btn" onclick="Shopping.OpenBusiness('+Shopping.Business[u].id+')">Back</button>'
n += '</div>'<!--col-md-4-->
n += '</div>'<!--row-->
n += '</div>'


var p = "";
	//main.car = currency;
	
	if(Shopping.Cart.business[0]){
		
		if(Shopping.Cart.business[0].dishes){			
			if (Shopping.Cart.business[0].dishes.length != 0) {
				
				for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){		
			
						p += RestMenuList.MenuCartlist(i)		
				}		
			}
		}
	}
	document.getElementById("showcanvas").innerHTML = '';
	if(document.getElementById("shoppingbox"))
	document.getElementById("shoppingbox").innerHTML = n;	
	document.getElementById("plc_rgt_in").innerHTML = p;
	$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
         });
	Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();
},




CalculateReviewRatings:function(id)
{
	var st_split = id.split("_");
	var hiddenfieldid = st_split[0];
	var hiddenfieldval = st_split[1];	
	
	$("#"+hiddenfieldid).val(hiddenfieldval);
	for(var i = 1;i <= hiddenfieldval;i++){
	var iid = hiddenfieldid+"_";
	$("#"+iid+i).removeClass("gray_star");
	$("#"+iid+i).addClass("yellow_star");
	}
	
	var idnext = (parseInt(hiddenfieldval) + 1);
	for(var j = idnext;j <= 5;j++){
	var jid = hiddenfieldid+"_";
	$("#"+jid+j).removeClass("gray_star");
	$("#"+jid+j).removeClass("yellow_star");
	$("#"+jid+j).addClass("gray_star");
	}

},	

PreOrderMenuCatalog: function (p,d,pem) {

	p = JSON.parse(p);
	var len = p.menuonly.length;
	p.menuonly.sort(Main.SortByProperty("opentime"));

	if(len == 0) {
		alert("<?=$lang_resource['NO_SERVICE']?>")
		return ;
	}
	var k='';
	var a = '<div class="popup_wrapper">';
	a += '<div class="pop_header">';
	a += '<div class="pop_heading"><h3><?=$lang_resource['MAIN_SHOPPING_MENU_CATALOG_POPUP']?></h3></div>';
	a += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
	if(Main.RedirectToBusiness){	   	
		if(Main.MenulistEnter){		   		
			a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
		}else{
			a += '<button class="pop_close_btn" type="button" onclick="Main.HomeUrlCustom()">X</button>';
		}
	}else{
		a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
	}

	a += '</div>';
	a += "</div>";

	if(Main.RedirectToBusiness && !pem) {
		Main.MenuPreorder = false;
		a += '<div class="restpreordernocat" id="showcatalogMenu">';
		a += '<div class="ordercatalogtimec"><?=$lang_resource['MAIN_SHOPPING_MENU_NO_SERVICE_AVAILABLE']?></div>'
		a += "</div>";
	}else if(Main.MenuPreorder == false){
		a += '<div class="restpreordernocat" id="showcatalogMenu">';
		a += '<div class="ordercatalogtimec"><?=$lang_resource['MAIN_SHOPPING_MENU_NO_SERVICE_AVAILABLE']?></div>'
		a += "</div>";
	}

	a += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';
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
		
		
		
		
		a += '<tr>';
		var weekends = p.menuonly[k].weekends
			weekends = weekends.toString()
 		
		a += '<td colspan="2"><div class="ordercatalogtime hand" onclick="Main.PreorderMainfun('+d+','+p.menuonly[k].id+')"><div style="text-align:center"><span class="micon"><img src="images/step2-business-listing/m-icon.png"></span><b>'+Main.TitleCase(p.menuonly[k].name)+'</b> ('+p.menuonly[k].opentime+'-'+p.menuonly[k].closetime+')</div><div class="menu-day">'+weekends.split(",").join("")+'</div></div></div>';
		a += '</tr>';
	}

	a += '</table>';
	a += "</div>";



       Main.Ga("/profile/recoverpwd");
        Popup.Show(550,(165*len+35), a, function ()
        {
			  var b = new Date().getTime();
               Main.Aid = b;
               Main.Loading();




        }, function ()
        {
		$(window).center();
		Main.Ready();

          Blist.PopulateBusinessList()
           popup.close();
            Main.Ga(Main.ActiveView)
        })
	},
	
};
