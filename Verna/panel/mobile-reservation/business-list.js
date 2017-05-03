var Blist = {
	PopulateBusinessList: function (E, A,fivekm,fav,opncls)
    {
         if( Shopping.ActiveBusiness) {

		Shopping.OpenBusiness(Shopping.ActiveBusiness);
		return false;
		}



		 var s = new Array();

		 s = Shopping.GetBusinessLogicaly(E,A,fivekm,fav,opncls);



		for (var z in Shopping.Categories)
                {
                    if(document.getElementById("business_category_switch_"+Shopping.Categories[z].id).checked == true) {

                            Shopping.Categories[z].enabled = true;

                    }
					else if(document.getElementById("business_category_all").checked == true) {
					 Shopping.Categories[z].enabled = true;
					}
					else if(fstchk == 0) {
					 Shopping.Categories[z].enabled = true;
					}

					else  {
						Shopping.Categories[z].enabled = false;
						}
                }

		 var u ="";
		 //
	var rvw = "";
            u +='<div class="right-restaurant" id="businessresultsinner">';
        var r = "1";
        var D = "";
        var w = "";

		 if (s.length == "0"){

            u += '<div class="no-restaurants">';

            u += "<?= $lang_resource['SEARCH_NO_RESTAURANTS'] ?>";

            u += "</div>"

			  document.getElementById("businessresults").innerHTML = u;

			  return;

        }



		if(Main.NullToEmpty(Main.searchType) != "Global")
		{
			if(s[0].searchtype=="citysearch" || s[0].searchtype=="pickup" ) {


			}
		}

		u += Blist.bussinessListSearchHtml();


		var counterlistbusiness = 0;
		var restaurant = Main.settingfront.restaurant.split(",");
		restaurant = JSON.parse(restaurant)

		var businesscount = 0;



        for (x in s)
        {
			console.log(restaurant.indexOf(s[x].id))
			if(restaurant.indexOf(s[x].id) != -1 || restaurant.indexOf('-1') != -1){
				businesscount++
			}

            if (s[x].open  && s[x].menulist == 1 && (s[x].catalog != 0 || Main.WhereAmIData.reservation == true))
			{

				if((Main.settingfront.list_step == 'f' && counterlistbusiness == 0) || (restaurant.length == 1 && restaurant.indexOf(s[x].id) != -1 && counterlistbusiness == 0)  ){
					Shopping.OpenBusiness(s[x].id)
					counterlistbusiness ++;
				}

				if (s[x].review != ""){

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
							 starsReview +='<li><a href="#"><img src="images/step2-business-listing/star-yellow.png"></a></li>'
							 roundTotal=roundTotal-1;
						}
						else if(roundTotal<=0)
						{    starsReview +='<li><a href="#"><img src="images/step2-business-listing/star-grey.png"></a></li>'

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

			console.log(restaurant.indexOf('-1'))
			if(restaurant.indexOf('-1') != -1 || restaurant.indexOf(s[x].id) != -1){

				  u +=Blist.OpenBusinessHtml(s,rvw,D,rating)
			}
	 }
			else if(s[x].catalog==0) {

				}
            else
            {

				if((Main.settingfront.list_step == 'f' && counterlistbusiness == 0) || (restaurant.length == 1 && restaurant.indexOf(s[x].id) != -1 && counterlistbusiness == 0)  ){
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
							 starsReview +='<li><a href="#"><img src="images/step2-business-listing/star-yellow.png"></a></li>'
							 roundTotal=roundTotal-1;
						}
						else if(roundTotal<=0)
						{    starsReview +='<li><a href="#"><img src="images/step2-business-listing/star-grey.png"></a></li>'

						}
					}
				}
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					{
						//rvw = starsReview +' ('+Shopping.Review.rating+' <?= $lang_resource['Ratings_V2'] ?>)';
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
				if(restaurant.indexOf('-1') != -1 || restaurant.indexOf(s[x].id) != -1){
					u +=Blist.CloseBusinessHtml(s,rvw,D,rating)
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
			u += '<div style="width:100%; float: right; margin-top: 15px;">';
			u +='<div style="width:78%; float: left;">'
			if(offset >0){
			u += '<input  type="button" class="prevnext" value="Previous" onclick="Shopping.Previousresult()">';
			}
			u +='</div>'	
			u +='<div style="float: right;">'
			if(limit < Main.numrow){ 
			u += '<input  type="button" class="prevnext" value="Next" onclick="Shopping.Nextresult()">';
			}
			u +='</div>'	
			u +='</div>'
         u +='</div>';


        document.getElementById("businessresults").innerHTML = u;
		 fstchk =1;

		if(fivekm) {
			document.getElementById("expressi").checked= true;
		}
		if(Shopping.Business)
		{

		 $(document).ready(function() { initialize(); });
		}

		if(s[0].searchtype=="delivery") {
		document.getElementById("showcanvas").style.display="none";
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
			$("#modal-one").show();
			
		},

	catOpen: function(){

	$("#categoriesbox").slideToggle(500);
	  },
	  BsearchBoxOpen: function(){
		$("#BsearchDisplay").slideToggle(500);
	  },

	CatagoriesFetch: function(){
	  var e = "";

		e += '<div   id="shoplistadscontainer"></div>';

        e += '<div id="businessresults" class="main bg-white login"></div>';
        e += "</div>";
        e += "</div>";
		return e;
	},
	CatagoriesFetchItem: function(){
		e = "";


					e +='<div style="width:98%;background:#fff;padding:10px 20px 10px 10px; "><select class="field-select" id="bopenClose" style="" onchange="Shopping.openCloseShop(this)">'
					e +='<option value="openAll" selected><?=$lang_resource['MOBILE_BUSINESS_LIST_OPENED_CLOSED_RESTAURANT']?></option>'
					e +='<option value="openi" ><?=$lang_resource['OPENEDRESTAURANTS']?></option>'
					e +='<option value="closei"><?=$lang_resource['CLOSEDRESTAURANTS']?></option>'
					e +='</select></div>'
				 //Settings to select miles or km
				 distanceformatKM="<?= $lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS'] ?>";
				if(Shopping.Business[0].distanceformat=='N'){
					distanceformatKM="<?= $lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS1'] ?>";
				}

		e +='<li><a href="javascript:void(0)">'+distanceformatKM+'<span><input  type="checkbox" id="expressi" name="checkbox"  value="2" style=""  class="checkbox_2" onclick="Main.express5Km()" ><label for="expressi" class="pop_field pull_right">&nbsp;</label></span></a></li>';

        if(Main.User)
		 {
                
		e +='<li><a href="javascript:void(0)"><?=$lang_resource['MOBILE_BUSINESS_LIST_OPTIONS_FAVORITES']?><span><input  type="checkbox" id="favorite" name="checkbox"  value="2" style=""  class="checkbox_2" onclick="Shopping.FavList()" ><label for="favorite" class="pop_field pull_right">&nbsp;</label></span></a></li>';
		
		 }

		e +='<li><a href="javascript:void(0)"><?=$lang_resource['MOBILE_BUSSINESS_LIST_ALL']?><span><input  type="checkbox" id="business_category_all" name="checkbox" checked="checked"  value="2" style=""  class="checkbox_2" onclick="Main.checkall()" ><label for="business_category_all" class="pop_field pull_right">&nbsp;</label></span></a></li>';


		 for (var d in Shopping.Categories){


			e +='<li><a href="javascript:void(0)">'+ Shopping.Categories[d].name +' <span><input  type="checkbox" id="business_category_switch_' + Shopping.Categories[d].id + '" name="checkbox"  value="2" style=""  class="checkbox_2"><label for="business_category_switch_' + Shopping.Categories[d].id + '" class="pop_field pull_right">&nbsp;</label></span></a></li>';

		 }
		 return e;
	},
	ShoppingHeaderBusinessSearchHtml: function(){
		var sch='<div class="map-pannel">'
        sch +='<div class="main">'

        sch +='</div>';

	  sch +='<div class="header-grey">';
	 sch +='<div class="header_top">';
            	sch +='<div class="wrapp">';
				if(Main.RedirectToCity) {
					sch +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="Shopping.goBackHomeForCity()">< <?=$lang_resource['MOBILE_BUSINESS_LIST_BACK']?></button></div>';
				} else {
                	sch +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="Main.InitInterface()">< <?=$lang_resource['MOBILE_BUSINESS_LIST_BACK']?></button></div>';
				}
            sch +='<div class="center_heading"><?=$lang_resource['MOBILE_BUSINESS_LIST_SELECT_RESTAURANT']?></div>';
            
			sch +='<div class="left_btn_dv pull_right" ><button type="button" class="red-link-btn" onclick="Shopping.GoogleMapshowhide()" ><?= $lang_resource['BUSINESS_PAGE_TEXT_MAP'] ?></button></div>';

            sch +='</div>';
            sch +='</div>';

			sch +='<div class="wrapp">';

            sch +='<div class="left_btn_dv"><div class="left_btn_dv" style="margin-top:-6px;"><input class="search_field" id="businesssearch" type="text" placeholder="<?=$lang_resource['Restaurants_Cuisines_Search_V2']?>"></div></div>';

            sch +='<div class="left_btn_dv pull_right" ><button type="button" class="black-link-btn" onclick="Blist.catOpen()"><span class="pull_left" style="margin-right:5px; margin-top:0px;"><img src="images/step2-business-listing/icon-refine.png"></span> <?=$lang_resource['MOBILE_BUSINESS_LIST_REFINE']?></button></div>';
			sch +='</div>';
            

            sch +='</div>';
			sch +='<div class="blank-top"></div>'
			
			sch +='</div>';

	 	sch +='<div class="main  bg-white" id="BsearchDisplay" style="display:none">';
    	sch +='<div class="wrapp" >';
    			sch +='<div class="field">';
                sch +='<input type="text" class="field-text" placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>" id="businesssearch">';
        sch +='</div>';
        sch +=' </div>';
        sch +='</div>';
 		sch +='<ul class="tog2" id="categoriesbox" style="display:none" >'

         sch +='</ul>'

		 sch +='<div id="showcanvas" class="inner-map"></div>';
		 sch +='</div>';
		 return sch;
		},
		ShoppingHeaderDesignNavigationHtml: function(){
			var shs = '<div class="nav" style="display:none">'
        	shs += '<div class="main">'
			shs += '<ul>'
            shs += '<li><a href="javascript:Shopping.homeurl()"><span class="step-logo" style="margin-left:10px;"></span><span class="step-text">Select<br><?=$lang_resource['MOBILE_BUSINESS_LIST_LOCATION']?></span></a></li>'
			if(Shopping.RedirectToCity) {
            shs += '<li  class="active-step"><a href="javascript:Shopping.changeDelType(2)"><span class="step-logo" style="margin-left:10px;"></span><span class="step-text"><?=$lang_resource['WHEREAMIBOX_MOBILE_PICKUP']?><br><?=$lang_resource['MOBILE_BUSINESS_LIST_RESTAURANT']?></span></a></li>'
			} else {
			shs += '<li  class="active-step"><a href="javascript:Shopping.changeDelType(3)"><span class="step-logo" style="margin-left:10px;"></span><span class="step-text"><?=$lang_resource['WHEREAMIBOX_MOBILE_PICKUP']?><br><?=$lang_resource['MOBILE_BUSINESS_LIST_RESTAURANT']?></span></a></li>'
			}
			shs += '<li id="plc_ordr"><a href="javascript:Shopping.OpenBusiness('+currentshop+')"><span class="step-logo" style="margin-left:40px;"></span><span class="step-text" style="margin-left:57px;"><?=$lang_resource['MOBILE_BUSINESS_LIST_PLACE_ORDER']?></span></a></li>'

               shs += '<li id="plc_checkout"><a href="javascript:Shopping.OpenCartCheck()"><span class="step-logo" style="margin-left:15px;"></span><span class="step-text"><?=$lang_resource['MOBILE_BUSINESS_LIST_MAKE_PAYMENT']?></span></a></li>'

                shs += '<li id="get_dlvrd"><a href="javascript:void(0)"><span class="step-logo" style="margin-left:10px;"></span><span class="step-text"><?=$lang_resource['MOBILE_BUSINESS_LIST_GET_DELIVERED']?></span></a></li>'
           shs += '</ul>'
         shs += '</div>'
      shs += '</div>'

	   return shs;

			},
	OpenBusinessHtml : function(s,rvw,D,rating) {
		 var  u ='<div class="restauant_dv" id="'+s[x].id+'_show" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">";
              u +='<div class="wrapp" >';
              u +='<div class="res_logo">';
			  if(s[x].feature == "t") {
              u +='<div class="featured"><span><?=$lang_resource['BLIST_FEATURED']?></span></div>'
			   }
              u +='<img src="'+D+'">';
              u +='</div>';
              u +='<div class="res_desp_dv">';
			  u +='<h3>'+ Main.TitleCase(s[x].name) +'</h3>';
              u +='<div class="review">';
              u +='<ul class="review-star">';
		      u +=rvw;

				u +='</ul>';
				u +='<span class="rating">('+rating+')</span>';
				u +='</div>';
				u +='<div class="pay-logo-dv">';
				u +='<ul>';

				var paylist = JSON.parse(s[x].paymentdetails);
				for(var m in paylist){
					if(paylist[m] == 't'){
						if(m == 'cash' || m == 'card' || m == 'paypal'){
							u +='<li><a href="#"><img src="images/step2-business-listing/paymethod/'+m+'.png"></a></li>';
						}
					}
				}
			u +='</ul>';
			u +='</div>';
			 //Settings to select miles or km
			 distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_KM'] ?>";
				if(s[x].distanceformat=='N'){
					distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_MILES'] ?>";

				}
			u +='<p class="dsd_text"><?= $lang_resource['DISTANCE'] ?> : <span>'+s[x].distanceKm+' '+distanceformat+'</span></p>';
			if(s[0].searchtype!="citysearch" && s[0].searchtype!="pickup"  && s[0].searchtype!="categorysearch" ) {
								if (Shopping.FormatPrice(s[x].shipping) == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
									var dollarimge = "<img src='images/step2-business-listing/dollar.png' alt='Free Shipping' border='0' style='width:18px;'/>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>";
								}else{
									var dollarimge = "<span class='shipping-cost-feer'>"+s[x].currency+''+Shopping.FormatPrice(s[x].shipping)+"</span>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>";
								}
			u +='<p class="dsd_text">'+delcos+' : <span>'+dollarimge+'</span></p>';
				}
		   if(s[x].promotion) {
			u +='<p class="dsd_text"><?=$lang_resource['MOBILE_BUSINESS_LIST_PROMOTION']?>: <span>'+s[x].promotion +'</span></p>';
			}

                u +='</div>';
                u +='<div class="res_arrow_dv">';
                u +='<button type="button" class=" arrow_btn" onclick="Shopping.OpenBusiness(\'' + s[x].id + "')\">></button>";
                u +='</div>';
                u +='</div>';
                u +='</div>';
		return u;
		},
		CloseBusinessHtml : function(s,rvw,D,rating) {

		  var u ='<div class="restauant_dv" id="'+s[x].id+'_show" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\">";
              u +='<div class="wrapp" >';
              u +='<div class="res_logo"  style="opacity:0.2">';
			  if(s[x].feature == "t") {
              u +='<div class="featured"><span><?=$lang_resource['BLIST_FEATURED']?></span></div>'
			   }
              u +='<img src="'+D+'">';
              u +='</div>';
              u +='<div class="res_desp_dv">';
			  u +='<h3>'+ Main.TitleCase(s[x].name) +'</h3>';
              u +='<div class="review">';
              u +='<ul class="review-star">';
			  u +=rvw;

			  u +='</ul>';
              u +='<span class="rating">('+rating+')</span>';
              u +='</div>';
              u +='<div class="pay-logo-dv">';
              u +='<ul>';
            var paylist = JSON.parse(s[x].paymentdetails);
			for(var m in paylist){
				if(paylist[m] == 't'){
					if(m == 'cash' || m == 'card' || m == 'paypal'){
						u +='<li><a href="#"><img src="images/step2-business-listing/paymethod/'+m+'.png"></a></li>';
					}
				}
			}
			
               	u +='</ul>';
				u +='</div>';
				 //Settings to select miles or km
				 distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_KM'] ?>";
				if(s[x].distanceformat=='N'){
					distanceformat="<?= $lang_resource['BUSINESS_LIST_OPTIONS_MILES'] ?>";

				}
				u +='<p class="dsd_text"><?= $lang_resource['DISTANCE'] ?> : <span>'+s[x].distanceKm+' '+distanceformat+'</span></p>';
				if(s[0].searchtype!="citysearch" && s[0].searchtype!="pickup"  && s[0].searchtype!="categorysearch" ) {
								if (Shopping.FormatPrice(s[x].shipping) == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
									var dollarimge = "<img src='images/step2-business-listing/dollar.png' alt='Free Shipping' border='0' style='width:18px;'/>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>";
								}else{
									var dollarimge = "<span class='shipping-cost-feer'>"+s[x].currency+''+Shopping.FormatPrice(s[x].shipping)+"</span>";
									var delcos = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>";
								}
			u +='<p class="dsd_text">'+delcos+' : <span>'+dollarimge+'</span></p>';
				}
				if(s[x].promotion) {
				u +='<p class="dsd_text"><?=$lang_resource['MOBILE_BUSINESS_LIST_PROMOTION']?>: <span>'+s[x].promotion +'</span></p>';
				}

                u +='</div>';
                u +='<div class="res_arrow_dv">';
				u +='<a href="javascript:void(0)" class="tooltip red-tooltip">'
                u +='<button type="button" class=" arrow_btn" onclick="Main.PreOrderMenuCatalogFetch(\'' + s[x].id + "')\">></button>";
				u +='<span><div class="pull_left" style="margin-right:10px; margin-top:10px;font-weight:bold"><img src="images/step2-business-listing/closed-icon.png"></div><ul class="timing-li" style="margin-top:5px; float:left;"><li><?= $lang_resource['BUSINESS_LIST_OPTIONS_WE_WILL_OPEN_AT'] ?></li><li>'+s[x].willopen+' </li></ul></span></a>'
                u +='</div>';
                u +='</div>';
                u +='</div>';
			return u;
		},
		bussinessListSearchHtml: function(){
		if(Main.WhereAmIData.reservestatus == 'delivery')
				var std = 'selected="selected"'
			if(Main.WhereAmIData.reservestatus == 'pickup')
				var stp = 'selected="selected"'
			if(Main.WhereAmIData.reservestatus == 'reservation')
				var str = 'selected="selected"'

		  var u = '<div class="wrapp">';
			  u += '<div class="field">';
			  u += '<select class="field-select" id="doption" style="background:#fafafa;" onchange="Main.Changetype()">';
			  u += '<option value=""><?=$lang_resource['MOBILE_BUSINESS_LIST_SELECT_OPTIONS']?></option>'
			   if(Main.settingfront.tab_delivery != 'f'){
			  u += '<option value="1" '+std+' ><?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY']?></option>';
			}
			if(Main.settingfront.tab_pickup != 'f'){
			  u += '<option value="2" '+stp+'><?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP']?></option>';
			}
			if(Main.settingfront.tab_reservation != 'f'){
			  u += '<option value="4" '+str+'><?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_RESERVE']?></option>';
			}
			  u += '</select>';
		      u += '</div>';
			  
			  u += '<div class="field">';
				u +='<div style="width:78%; float: left;">'
				if(offset >0){
				u += '<input  type="button" class="prevnext" value="Previous" onclick="Shopping.Previousresult()">';
				}
				u +='</div>'	
				u +='<div style="float: right;">'
				if(limit < Main.numrow){ 
				u += '<input  type="button" class="prevnext" value="Next" onclick="Shopping.Nextresult()">';
				}
				u +='</div>'	
				u +='</div>'
				u += "<div>";
			  
			  u += '</div>';
		 return u;
		 },
	setCheck: function(id){

		if ($("#business_category_switch_"+id).is(':checked')) {

        	$("#business_category_switch_"+id).prop('checked',false);

 		 }else{
			 $("#business_category_switch_"+id).prop('checked',true);
			 }
	},



}
