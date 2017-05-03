 var arrValores = new Array(6);
var RestMenuList = {
 PrintBusinessAndDishes: function (resSearch)
    {
		$(window).scrollTop(0)

		var myParam = location.search.split('order=');



        var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
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

     if(Shopping.Business[u].catalog ==0 &&  Main.WhereAmIData.reservation == true) {
		resSearch = true;

		 }

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
			var starsReview = "";
			var i = 1;
			for(i=1;i<=5;i++)
			{

				if(roundTotal>=1)
				{
						starsReview +='<li><a href="#"><img src="images/step3-menu-list/star-yellow.png"></a></li>'

						roundTotal=roundTotal-1;
				}
				else if(roundTotal<=0)
				{
					 starsReview +='<li><a href="#"><img src="images/step3-menu-list/star-grey.png"></a></li>'

				}
			}
		}
    	var shipcos = Shopping.FormatPrice(Shopping.Business[u].shipping);
	if (shipcos == "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"){
		var dollarimge = "<img src='images/step3-menu-list/dollar.png' alt='Free Shipping' style='width:18px;'/>";
	}else{
		var dollarimge = "<span class='shipping-cost-feer'>"+shipcos+"</span>";
	}

	 var ban = "";
	
	 if(Main.businessSetting.businesspageheadersetting == 1) {
		  var imageUrl = Shopping.Business[u].headerurl;
		 var hd = '<div class="main">';
     hd +='<input class="search_field textbox" type="hidden" id="dishsearch" placeholder="<?=$lang_resource['MOBILE_MENU_LIST_SEARCH_DISH']?>">';
    	 hd +='<div class="header-img">'; 
         hd +='<img src="'+Shopping.Business[u].headerurl+'" /> ';  
		    hd +=' <div class="cart_icon" onclick="Checkout.OrderDetailsPage()" ><button type="button" class="cart-btn"><img src="images/step3-menu-list/cart-icon_new_mob.png"></button></div>';    
         hd +='<div class="wrapp">';
      
         hd +='</div>';
         hd +=' </div>';
   		 hd +='</div>'; 
		  
		  
	  } else  {
	 var hd = "";

	 		var imageUrl = Shopping.Business[u].headerurl;



		if(Shopping.Business[u].isimg==1){
        	v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
		}
		else{
			v = 'panel/images/dummy/medium_business.jpg';
		}

			hd +='<div class="main">';
    		hd +='<div class="header-grey">';
        	hd +='<div class="header_top">';
            hd +='<div class="wrapp">';
            hd +='<div class="left_btn_dv">'
			if (Main.RedirectToBusiness || Main.RedirectToCity ||  Main.RedirectToCategory ||  Main.RedirectToCMS ){
			hd +='<button type="button" class="red-link-btn" onclick="Main.HomeUrlCustom()"><?=$lang_resource['MOBILE_MENU_LIST_BACK']?></button>'
			}else{
			hd +='<button type="button" class="red-link-btn" onclick="Shopping.changeDelType(3)"><?=$lang_resource['MOBILE_MENU_LIST_BACK']?></button>'
			}
			hd +='</div>';

            hd +='<div class="left_btn_dv pull_right"><button type="button" class="red-link-btn cart-btn" onclick="Checkout.OrderDetailsPage()"><img src="images/step3-menu-list/cart-icon_mob.png"></button></div>';

            hd +='</div>';
            hd +='</div>';
            hd +='<div class="wrapp">';
            hd +='<div class="left_btn_dv" style="margin-top:7px;"><input class="search_field textbox" type="text" id="dishsearch" placeholder="<?=$lang_resource['MOBILE_MENU_LIST_SEARCH_DISH']?>"></div>';
            hd +='<div class="left_btn_dv pull_right"><button type="button" class="black-link-btn" onclick="RestMenuList.catOpen()"><span class="pull_left" style="margin-right:5px; margin-top:0px;" ><img src="images/step3-menu-list/icon-refine.png"></span> <?=$lang_resource['MOBILE_MENU_LIST_REFINE']?></button></div>';
            hd +='</div>';
        	hd +='</div>';
			
			hd +='<div class="blank-top"></div>'
			
			hd +='<ul id="category_mn" style="display:none;" class="togl">';
			hd +='<li><a href="javascript:void(0)" onclick="Shopping.changecatclass(this,-1)"><?=$lang_resource['MOBILE_MENU_LIST_ALL']?></a></li>';


			for (q in Shopping.MenuCategories)
						{

			hd +='<li><a href="javascript:void(0)" onclick="Shopping.changecatclass(this,' + Shopping.MenuCategories[q].id + ')" value="' + Shopping.MenuCategories[q].id + '" >' + Shopping.MenuCategories[q].name + '</a></li>';

						}

            hd +='</ul>';

    		hd +='</div>';

	  }
			document.getElementById("headerSearch").innerHTML = hd;
		 var n = "";
if( Main.RedirectToBusiness && Main.businessSetting.businesspageheadersetting == 1 ) {
				 n += '<div class=" main bg-white login">';
				 	if(Main.businessSetting.checkout_popup_settings == 0){
					n +='<div class="cart" onclick="Checkout.open_cart_popup();">';
					n +='<div class="cart-icon"><img src="panel/mobile-reservation/images/cart-icon2.png"></div><div class="item-number" id="pop_up_item_num1">'+qn+'</div>';
					n +='<p id="pop_up_item_tot1">'+Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT)+'</p>';
					n +='</div>';
					}
					
				 n += '<div class="new_restauant_menu_dv">';
                 n += '<div class="wrapp" >';
                 n += ' <div class="res_logo">';
                 n += '<img src="'+v+'">';
                 n += '</div>';
                 n += '<div class="res_desp_dv_dp">';
				 n += '<h3>' + Shopping.Business[u].name.toUpperCase() +'</h3>';
				 n += '<div class="review">';
                 n += '<ul class="review-star">';
				 n +=starsReview;
				 n += '</ul>';
				 var roundTotal1 = Math.round(Shopping.Review.rating);
				 n += '<span class="rating" onclick="Shopping.Menuskiptab(3)" >('+roundTotal1+' <?=$lang_resource['MOBILE_MENU_LIST_RATINGS']?>)</span>';
                 n += ' </div>';
                 n +='<label onclick="ProductOption.add_product_options_db(this,8)"></label>' 

                  n +='<div>'
                  n+='<button type="button" class="popup_review_add" onclick="RestMenuList.AddReview()"><?=$lang_resource['MOBILE_MENU_LIST_WRITE_A_REVIEW']?></button>'
                  n+='</div>'
                  n +='<div>'
                  n+='<button type="button" class="popup_review_photo" onclick="RestMenuList.AddPhoto()"><?=$lang_resource['MOBILE_MENU_LIST_ADD_PHOTO']?></button>'
                  n+='</div>' 
                  n += '</div>'; 
        

				 n += '</div>'; 

				 n += '</div>';
		 /*  n += '<div class="restauant_menu_dv">';
             n += '<div class="wrapp" >';
                n += '<div class="res_logo" style="width:105px; height:85px; padding:6px;">';
                    n += '<img src="'+v+'" width="93" height="71" style="width:93px; height:71px;">';
                n += '</div>';
                n += '<div class="res_desp_dv" style="height:auto;">';
					n += '<h3>' + Shopping.Business[u].name.toUpperCase() +'</h3>';
                    n += '<div class="review">';
                        n += '<ul class="review-star">';
						n +=starsReview;
                         
                        n += '</ul>';
                       n += '<span class="rating">(4 <?=$lang_resource['MOBILE_MENU_LIST_RATINGS']?>)</span>';
                    n += '</div>';
					n += '<div class="add-fav" onclick="Shopping.AddToFav(\'' + Shopping.Business[u].id + '\',\'' + Main.TitleCase(Shopping.Business[u].name) + '\')" ><a href="javascript:void(0)"><img src="images/step3-menu-list/Heart.png" alt=""/><?=$lang_resource['MOBILE_MENU_LIST_ADD_TO_FAVORITES']?></a></div>';
                n += '</div>';
                
              n += '</div>';
               n += '</div>';*/
		}
		else {
	  n += '<div class=" main bg-white login" style="margin-bottom:40px">';
if(Main.businessSetting.checkout_popup_settings == 0){	 
//alert('The total item number is :'+qn)
n +='<div class="cart" onclick="Checkout.open_cart_popup();">';
n +='<div class="cart-icon"><img src="panel/mobile-reservation/images/cart-icon2.png"></div><div class="item-number" id="pop_up_item_num2">'+qn+'</div>';
n +='<p id="pop_up_item_tot2">'+Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT)+'</p>';
n +='</div>';
}
        	n += '<div class="restauant_menu_dv">';
             n += '<div class="wrapp" >';
                n += '<div class="res_logo" style="width:105px; height:85px; padding:6px;">';
                    n += '<img src="'+v+'" width="93" height="71" style="width:93px; height:71px;">';
                n += '</div>';
                n += '<div class="res_desp_dv" style="height:auto;">';
					n += '<h3>' + Shopping.Business[u].name.toUpperCase() +'</h3>';
                    n += '<div class="review">';
                        n += '<ul class="review-star">';
						n +=starsReview;

                        n += '</ul>';
						var roundTotal1 = Math.round(Shopping.Review.rating);
                       n += '<span class="rating" onclick="Shopping.Menuskiptab(3)">('+roundTotal1+' <?=$lang_resource['MOBILE_MENU_LIST_RATINGS']?>)</span>';
                    n += '</div>';
                    n +='<div>'
                    n+='<button type="button" class="popup_review_add" onclick="RestMenuList.AddReview()"><?=$lang_resource['MOBILE_MENU_LIST_WRITE_A_REVIEW']?></button>'

                   // n +='<label onclick="ProductOption.add_product_options_db(this,8)">dffdsfd</label>' 
                    n+='</div>'

                    n +='<div>'
                    n+='<button type="button" class="popup_review_photo" onclick="RestMenuList.AddPhoto()"><?=$lang_resource['MOBILE_MENU_LIST_ADD_PHOTO']?></button>'
                    
                   // n +='<label onclick="ProductOption.add_product_options_db(this,8)">dffdsfd</label>' 
                    n+='</div>'
    if(Main.businessSetting.businesspageheadersetting !="1"){   
                n +='<div>'
                    n+='<button type="button" class="popup_review_fav" onclick="Shopping.AddToFav(\'' + Shopping.Business[u].id + '\',\'' + Main.TitleCase(Shopping.Business[u].name) + '\')"><?=$lang_resource['MOBILE_MENU_LIST_ADD_TO_FAVORITES']?></button>'
                    
                   // n +='<label onclick="ProductOption.add_product_options_db(this,8)">dffdsfd</label>' 
                    n+='</div>'
		//n += '<div class="add-fav" onclick="Shopping.AddToFav(\'' + Shopping.Business[u].id + '\',\'' + Main.TitleCase(Shopping.Business[u].name) + '\')" ><a href="javascript:void(0)"><img src="images/step3-menu-list/heartm.png" alt=""/><?=$lang_resource['MOBILE_MENU_LIST_ADD_TO_FAVORITES']?></a></div>';
    }            
                n += '</div>';

              n += '</div>';
               n += '</div>';

		}
		
		

		  if(Shopping.Business[u].reserve>0) {

					  n += '<div class="menu_nav">';
					  n += '<ul>';
					  n += '<li ><a href="javascript:void(0)" id="tabMenu1" class="active-tab" onclick="Shopping.Menuskiptab(1)"><?=$lang_resource["MENU_V21"] ?></a></li>';
					  n += '<li ><a href="javascript:void(0)" id="tabInfo2" class="infotab_class" onclick="Shopping.Menuskiptab(2)"><?=$lang_resource["INFO_V21"] ?></a></li>';
					  n += '<li ><a href="javascript:void(0)" id="reviewCountText" onclick="Shopping.Menuskiptab(3)" id="reviewCountText"><?=$lang_resource['REVIEWS_V21'] ?></a></li>';
					  n += '<li ><a href="javascript:void(0)" id="offerCountText" onclick="Shopping.Menuskiptab(4)" id="offerCountText"><?=$lang_resource['OFFERS_V21'] ?></a></li>';

                    if(Main.settingfront.tab_reservation != 'f'){
				      n += '<li ><a href="javascript:void(0)" id="ReserveidText" onclick="Shopping.Menuskiptab(5)" id="ReserveidText"><?=$lang_resource['MOBILE_MENU_LIST_RESERVATION']?></a></li>';
					}
                      n += '</ul>';
                      n += '</div>';

				}
			else if(Shopping.Business[u].reserve == 0)	 {

					  n += '<div class="menu_nav">';
					  n += '<ul>';
					  n += '<li ><a href="javascript:void(0)" id="tabMenu1" class="active-tab" onclick="Shopping.Menuskiptab(1)"><?=$lang_resource["MENU_V21"] ?></a></li>';
					  n += '<li ><a href="javascript:void(0)" id="tabInfo2" class="infotab_class" onclick="Shopping.Menuskiptab(2)"><?=$lang_resource["INFO_V21"] ?></a></li>';
					  n += '<li ><a href="javascript:void(0)" id="reviewCountText" onclick="Shopping.Menuskiptab(3)" id="reviewCountText"><?=$lang_resource['REVIEWS_V21'] ?></a></li>';
					  n += '<li ><a href="javascript:void(0)" id="offerCountText" onclick="Shopping.Menuskiptab(4)" id="offerCountText"><?=$lang_resource['OFFERS_V21'] ?></a></li>';

                      n += '</ul>';
                      n += '</div>';

				}
				
			n += '<div class="clr"></div>'
			
         n += '<div class="wrapp">';
		
         n += '<div class="menu_btn_dv">';
         	n += '<ul>';
			var  class1="";
			var class2="menu_active";
			if(Shopping.Cart.preorder=='true'){

				  class1="menu_active";
				 class2="";

			}
			
			if(Main.WhereAmIData.reservation) {
				n += '<li><a href="javascript:void(0)" id="orderli" class="order_now '+class2+' " onclick="Shopping.Menuskiptab(5)" onmouseover="RestMenuList.liclasOrderRemove()"><?=$lang_resource['MOBILE_MENU_LIST_RESERVE_NOW']?> </a></li>';
                n += '<li><a href="javascript:void(0)" id="preorderli" class="'+class1+'" onmouseover="RestMenuList.liclassRemove()" onclick="Shopping.Menuskiptab(1)" ><?=$lang_resource['MOBILE_MENU_LIST_RESERVE_ORDER']?></a></li>';
			}
			else {
				n += '<li><a href="javascript:void(0)" id="orderli" class="order_now '+class2+' " onclick="Checkout.OrderDetailsPage()" onmouseover="RestMenuList.liclasOrderRemove()"><?=$lang_resource['MOBILE_RESERVATION_ORDER_NOW']?> <span id="itemCount">(0)</span></a></li>';
                n += '<li><a href="javascript:void(0)" id="preorderli" class="'+class1+'" onmouseover="RestMenuList.liclassRemove()" onclick="Main.PreOrderMenuCatalogFetch(\'' + Shopping.Business[u].id + "')\" ><?=$lang_resource['MOBILE_MENU_LIST_PREORDER']?></a></li>";
			}
		    n += '</ul>';
         n += '</div>';
		 
		 console.log("check1")
		   
		   if( Main.RedirectToBusiness && Main.businessSetting.businesspageheadersetting == 1 ) {
			 $("#SeachBlockW").html('');
			 console.log("check3")
		    n +='<div class="wrapp_direct" style="margin-top: 5px">';
            n +='<div class="left_btn_dv" style="margin-top:7px;"><input class="search_field textbox" type="text" id="dishsearch" placeholder="<?=$lang_resource['MOBILE_MENU_LIST_SEARCH_DISH']?>"></div>';   
            n +='<div class="left_btn_dv pull_right"><button type="button" class="black-link-btn" onclick="RestMenuList.catOpen()"><span class="pull_left" style="margin-right:5px; margin-top:0px;" ><img src="images/step3-menu-list/icon-refine.png"></span> <?=$lang_resource['MOBILE_MENU_LIST_REFINE']?></button></div>';
			
			 ///////////////////////////////
   
			
			n  +='<ul id="category_mn" style="display:none;" class="togl">';
			n  +='<li><a href="javascript:void(0)" onclick="Shopping.changecatclass(this,-1)"><?=$lang_resource["MOBILE_MENU_LIST_ALL"]?></a></li>';


			for (q in Shopping.MenuCategories)
						{

			n  +='<li><a href="javascript:void(0)" onclick="Shopping.changecatclass(this,' + Shopping.MenuCategories[q].id + ')" value="' + Shopping.MenuCategories[q].id + '" >' + Shopping.MenuCategories[q].name + '</a></li>';

						}

            n  +='</ul>';

    	
			 ///////////////////////////////
			
			
			
			
            n +='</div>';
			
			
			
			
			
			}
			
		  
         n += '</div>';
		  n +='<div id="plce_div_menu">';
         n +='<div id="dishesresults"></div>';


		n += '</div>';

     	if(Main.businessSetting.checkout_popup_settings == 1){
		 n += '<div class="proceed_chkout" id="menu_chkout" onclick="Checkout.OrderDetailsPage();"><?=$lang_resource['MOBILE_MENU_LIST_PROCEED_CHECKOUT']?></div>';
		}
		

			/***********************************************tab section******************************************************************************************/
			/*****************************************Menu part***********************************************************************************/
		     Main.WhereAmILocationData = new Object();


			 var locationPoint = JSON.parse(Shopping.Business[u].locationPoint);

			 Main.WhereAmILocationData.latitud = locationPoint.latitud;
			 Main.WhereAmILocationData.longitud = locationPoint.longitud;
			 Main.WhereAmILocationData.zoom = 10;
			 Main.WhereAmILocationData.zonesloc = Shopping.Business[u].zonesloc;


			n +='<div class="plce_div" id="plce_div_info" style="display:none;" >';
			n +=RestMenuList.infoDivHtml(u);

			n +='</div>';


		/*****************************************Menu part***********************************************************************************/
		n +='<div class="plce_div" id="plce_div_review" style="display: none" >';
		n +='<div class="tab_contant" id="tab_content-2">';
        n +='<div  id="review" style="float: left;width: 100%;">';

             n +='</div>';
             n +='<div class="demotest">';
			 
			 
			 	 //check if review exists
		
			
			 
			 
			 
             n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="review_tbl">';
         	 n +='<thead>';
             n +='<tr>';
             n +='<th colspan="3"><div class="category_name"><?=$lang_resource['MOBILE_MENU_LIST_REVIEWS_OF']?> '+ Main.TitleCase(Shopping.Business[u].name)+'<br><span class="rest_add">'+ Main.TitleCase(Shopping.Business[u].street)+'</span></div></th>';

             n +='</tr>';
             n +='</thead>';
			 n +='</table>';
			 
			 
			 
		 if(myParam[1])
		{  
		
		     RestMenuList.order = myParam[1];
			 RestMenuList.busid = Shopping.Business[u].id;
			 RestMenuList.slug = Shopping.Business[u].customslug;
			   
			 n += RestMenuList.RatingHTML();
	
		
	
		}

	       
				n +='<div id="reviewContent"></div>';
        n +='<div id="photoReview"></div>';
			


			n +='</div>';
			n +='</div>';
			n +='</div>';



		<!------------------------------------ offers tab ------------------------------------------------>
		n +='<div class="plce_div" id="plce_div_offer" style="display: none" >';
		n +='<div class="tab_contant" id="tab_content-4">';


               n +='<div id="dicountContent"></div>';

        n +='</div>'<!--demotest-->
        n +='</div>';
		
		
		<!------------------------------------ offers tab ------------------------------------------------>
		
		<!------------------------------------ reservation tab ------------------------------------------------>
		n +='<div class="plce_div" id="plce_div_reserve" style="display: none" >';
		n +=RestMenuList.ReservationContentHtml();

		n += '</div>';


		<!------------------------------------ reservation tab ------------------------------------------------>
		
		
		
		n +='</div>';
		n += '</div>';


		
		


			 document.getElementById("shoppingbox").innerHTML = n;

			  $.post("panel/lib/front-main.php", "f=allMenu&id=" + Shopping.Business[u].id, function (e) {

				   Shopping.catalogMenu(e);
				 });
		    $.post("panel/lib/front-main.php", "f=FetchAllGalleryImg&bid="+Shopping.Business[u].id, function (b) {

			   Shopping.Photogallery(b);
         
         RestMenuList.reviewphoto(b);

           })
		    $.post("panel/lib/front-main.php", "f=FetchAllGalleryVideo&bid="+Shopping.Business[u].id, function (b) {


			   Shopping.videogallery(b);


           })
		    $.post("panel/lib/front-main.php", "f=FetchDiscountOffer&bid="+Shopping.Business[u].id, function (b) {



			 RestMenuList.FuncOffer(b,Shopping.Business[u]);


           })


			/************************************************************************************************************************************/
		var schr = "";


	    $.post("panel/lib/front-main.php", "f=allreviewDate&id=" + Shopping.Business[u].id, function (e) {


				  Shopping.allreview = JSON.parse(e);

				if (e != "") {
                   RestMenuList.reviewprint(JSON.parse(e))
                } else {
                    alert("<?= $lang_resource['ERROR_V21'] ?>")
                }
            })


      // $.post("panel/lib/front-main.php", "f=FetchBusinessReviewDataPhoto&id=" + Shopping.Business[u].id, function (g) {


      //     //Shopping.allreview = JSON.parse(g);

      //   if (g != "") {
      //               alert(JSON.parse(g))
      //              //RestMenuList.reviewprint(JSON.parse(g))
      //           } else {
      //               alert("<?= $lang_resource['ERROR_V21'] ?>")
      //           }
      //       })


		/* **********************************************Resturant Menu page Banner ********************************************************* */

	
		$(".rest-body").removeClass('rest-body');
		/* **********************************************Resturant Menu page Banner ********************************************************* */



        document.getElementById("shoppingbox").innerHTML = n;

		/*$(function() {*/
		$('#rdate').datepick({ minDate: 0,maxDate: 7});
		/*});   */

		if(resSearch) {

				Shopping.Menuskiptab(5);
				}
		if(myParam[1]) {

				Shopping.Menuskiptab(3);
				}


         
        document.getElementById("dishsearch").onkeyup = function ()
        {

            RestMenuList.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
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
              $("#itemCount").html('('+ qn +')');
				}
				else {
					$("#orderprice").html("0.00");
					$("#cart_taxid").html("");
					$("#itemCount").html('(0)');
		}

    $( "#accordion" ).accordion({ heightStyle: "content"  });

        this.ReturnBtnAction = this.PrintBusinessList;

        RestMenuList.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)

    },
		catOpen: function(){

		$("#category_mn").slideToggle(500);
	  },
	 liclassRemove: function(){

		$("#orderli").removeClass("menu_active");
		$("#preorderli").addClass("menu_active");
	  },
	   liclasOrderRemove: function(){

		$("#orderli").addClass("menu_active");
		$("#preorderli").removeClass("menu_active");
	  },
	  
	    RatingHTML: function()
	  {
		  var n = "";
		  
		   n +='<div class="rating_wrapper">';
           		n +='<table class="rating_tbl" width="100%" border="0" cellspacing="0" cellpadding="0">';
                	n +='<tr>';
                    	n +='<td><?=$lang_resource['TEMPLATE_QUALITY_OF_FOOD']?> :</td>';
                        n +='<td>';
                        	n +='<ul class="rating-star">';
                            	n +='<li><span class="star-grey" id="1" onclick="RestMenuList.AddRating(1);"></span></li>';
                               n +='<li><span class="star-grey" id="2" onclick="RestMenuList.AddRating(2);"></span></li>';
                               n +='<li><span class="star-grey" id="3" onclick="RestMenuList.AddRating(3);"></span></li>';
                                 n +='<li><span class="star-grey" id="4" onclick="RestMenuList.AddRating(4);"></span></li>';
                               n +='<li><span class="star-grey" id="5" onclick="RestMenuList.AddRating(5);"></span></li>';
                            n +='</ul>';
                        n +='</td>';
                   n +=' </tr>';
                   n +='<tr>';
                    	n +='<td><?=$lang_resource['TEMPLATE_PUNCTUALITY']?> :</td>';
                        n +='<td>';
                        	n +='<ul class="rating-star">';
                            	n +='<li><span class="star-grey" id="6" onclick="RestMenuList.AddRating(6);"></span></li>';
                               n +='<li><span class="star-grey" id="7" onclick="RestMenuList.AddRating(7);"></span></li>';
                               n +='<li><span class="star-grey" id="8" onclick="RestMenuList.AddRating(8);"></span></li>';
                                 n +='<li><span class="star-grey" id="9" onclick="RestMenuList.AddRating(9);"></span></li>';
                               n +='<li><span class="star-grey" id="10" onclick="RestMenuList.AddRating(10);"></span></li>';
                            n +='</ul>';
                        n +='</td>';
                   n +=' </tr>';
                    n +='<tr>';
                    	n +='<td><?=$lang_resource['TEMPLATE_SERVICE']?>:</td>';
                        n +='<td>';
                        	n +='<ul class="rating-star">';
                            	n +='<li><span class="star-grey" id="11" onclick="RestMenuList.AddRating(11);"></span></li>';
                               n +='<li><span class="star-grey" id="12" onclick="RestMenuList.AddRating(12);"></span></li>';
                               n +='<li><span class="star-grey" id="13" onclick="RestMenuList.AddRating(13);"></span></li>';
                                 n +='<li><span class="star-grey" id="14" onclick="RestMenuList.AddRating(14);"></span></li>';
                               n +='<li><span class="star-grey" id="15" onclick="RestMenuList.AddRating(15);"></span></li>';
                            n +='</ul>';
                        n +='</td>';
                   n +=' </tr>';
                    n +='<tr>';
                    	n +='<td><?=$lang_resource['TEMPLATE_FOOD_PACKAGING']?>:</td>';
                        n +='<td>';
                        	n +='<ul class="rating-star">';
                            	n +='<li><span class="star-grey" id="16" onclick="RestMenuList.AddRating(16);"></span></li>';
                               n +='<li><span class="star-grey" id="17" onclick="RestMenuList.AddRating(17);"></span></li>';
                               n +='<li><span class="star-grey" id="18" onclick="RestMenuList.AddRating(18);"></span></li>';
                                 n +='<li><span class="star-grey" id="19" onclick="RestMenuList.AddRating(19);"></span></li>';
                               n +='<li><span class="star-grey" id="20" onclick="RestMenuList.AddRating(20);"></span></li>';
                            n +='</ul>';
                        n +='</td>';
                   n +=' </tr>';
               n +=' </table>';
                n +='<div class="rate-btn-dv">';
                	n +='<button type="button" class="rating_btn" onclick="RestMenuList.AddRating(50);"><?=$lang_resource['TEMPLATE_RATE_NOW']?></button>';
                n +='</div>';
           n +='</div>';
		
		return n;  
		  
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
	r += '<td width="100%" style="padding-right:10px">';
	r += '<label><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_EMAIL'] ?></label><br />';
	r += '<input type="text" id="email" class="selectboxabc">';
	r += '</td>';
  r +='</tr>';
  r +='<tr>'
	r += '<td width="100%" style="padding-right:10px">';
	r += '<label><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></label><br />';
	r += '<select id="city" class="selectboxabc">';
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
	r += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="color:#353535; margin-bottom:15px;">';
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
	r += '<textarea id="review" cols="" rows="" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" class="cont textarea"></textarea>';
	r += '</div>';
	r += '<center><button type="button" class="addcart" onclick="RestMenuList.SaveReviewData()"><?= $lang_resource['save_V2'] ?></button></center>';
	r += '</div>';
	r += '</div>';
<!--wrapper-->



Popup.ShowNewForProductOp(600, 700, r,'', null,null)
		
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
		alert('<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>');
		$('#email').focus();
		return false;
	}
	else if(!email1.match(emailRegEx)){
		alert('<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>');
		$('#email').focus();
		return false;
	}
	else if(!city){
		alert('<?= $lang_resource['FRONT_SELECT_CITY'] ?>');
		return false;
	}
	else if(!quli){
		alert('<?= $lang_resource['FRONT_QTY_RATING'] ?>');
		return false;
	}
	else if(!punc){
		alert('<?= $lang_resource['FRONT_PUNC_RATING'] ?>');
		return false;
	}
	else if(!serv){
		alert('<?= $lang_resource['FRONT_SERV_RATING'] ?>');
		return false;
	}
	else if(!pack){
		alert('<?= $lang_resource['FRONT_PACK_RATING'] ?>');
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
				alert('<?= $lang_resource['FRONT_PACK_THANK_YOU_RATING'] ?>');
				});//end of ajax
		}
	
},//end of function

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
    k +='<div>'
    k +='&nbsp;&nbsp;&nbsp;&nbsp;'
    k +='</div>'
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
	 } else { alert("Your browser doesn't support to File API") }
	});
},
		

PhotoSave: function() {
	Main.Loading();
	$("#addphoto").submit(function (event) {
    event.preventDefault();         
    var formData = new FormData($(this)[0]);                
    if(formData.length > 0){
      $.ajax({
        url: 'theUpload.php',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (html) {
          Main.Ready();
          document.addphoto.reset();
          Popup.Close();
          alert('<?= $lang_resource['FRONT_PHOTO_THANK_YOU_RATING'] ?>');
        },
        error: function(html){
          Main.Ready();
          alert(html);
        }
      });                  
    }else{
      alert("Please Choose image")
    }

  });
},
	  
	  
	   AddRating: function(uid)
	  {
		 
		   if(uid == 50){
       arrValores[6]= "<?=date("Y-m-d");?>";
	   arrValores[0] = RestMenuList.busid;
       arrValores[1] = RestMenuList.order;
    

        var serialised = JSON.stringify(arrValores);
		
        $.get('/panel/lib/addrating-mobile.php',{rating: serialised}, function(result) {
	
     
  		alert("<?=$lang_resource['REVIEW_SUCCESS_MESSAGE']?>");
			
         

		top.location.href = "../../";
      });

        }
         else if(uid >=1 && uid <=5 )
        {
          arrValores[2]= uid;
         
		  
		  $('#1').removeClass("star-yellow");
		  $('#1').addClass("star-grey");
		  $('#2').removeClass("star-yellow");
		  $('#2').addClass("star-grey");
		  $('#3').removeClass("star-yellow");
		  $('#3').addClass("star-grey");
		  $('#4').removeClass("star-yellow");
		  $('#4').addClass("star-grey");
		  $('#5').removeClass("star-yellow");
		  $('#5').addClass("star-grey");
		  
          for(var x=1;x<=uid;x++)
          {

          $('#'+x).removeClass("star-grey");
		  $('#'+x).addClass("star-yellow");
          }

        }
        else if(uid >=6 && uid <=10 )
        {
			
			 $('#6').removeClass("star-yellow");
		  $('#6').addClass("star-grey");
		  $('#7').removeClass("star-yellow");
		  $('#7').addClass("star-grey");
		  $('#8').removeClass("star-yellow");
		  $('#8').addClass("star-grey");
		  $('#9').removeClass("star-yellow");
		  $('#9').addClass("star-grey");
		  $('#10').removeClass("star-yellow");
		  $('#10').addClass("star-grey");
			
           for(var x=6;x<=uid;x++)
          {

          $('#'+x).removeClass("star-grey");
		  $('#'+x).addClass("star-yellow");
          }
		  
		 
			  if(uid==6)
			   arrValores[3]=1;
			   if(uid==7)
			   arrValores[3]=2;
			   if(uid==8)
			   arrValores[3]=3;
			   if(uid==9)
			   arrValores[3]=4;
			   if(uid==10)
			   arrValores[3]=5;
			  
          

        }
        else if(uid >=11 && uid <=15 )
        {

          	$('#11').removeClass("star-yellow");
		  $('#11').addClass("star-grey");
		  $('#12').removeClass("star-yellow");
		  $('#12').addClass("star-grey");
		  $('#13').removeClass("star-yellow");
		  $('#13').addClass("star-grey");
		  $('#14').removeClass("star-yellow");
		  $('#14').addClass("star-grey");
		  $('#15').removeClass("star-yellow");
		  $('#15').addClass("star-grey");
			
           for(var x=11;x<=uid;x++)
          {

          $('#'+x).removeClass("star-grey");
		  $('#'+x).addClass("star-yellow");
          }
		  
		  
		  
		   if(uid==11)
			   arrValores[4]=1;
			   if(uid==12)
			   arrValores[4]=2;
			   if(uid==13)
			   arrValores[4]=3;
			   if(uid==14)
			   arrValores[4]=4;
			   if(uid==15)
			   arrValores[4]=5;
		  
		 

        }

        else if(uid >=16 && uid <=20 )
        {

          	$('#16').removeClass("star-yellow");
		  $('#16').addClass("star-grey");
		  $('#17').removeClass("star-yellow");
		  $('#17').addClass("star-grey");
		  $('#18').removeClass("star-yellow");
		  $('#18').addClass("star-grey");
		  $('#19').removeClass("star-yellow");
		  $('#19').addClass("star-grey");
		  $('#20').removeClass("star-yellow");
		  $('#20').addClass("star-grey");
			
           for(var x=16;x<=uid;x++)
          {

          $('#'+x).removeClass("star-grey");
		  $('#'+x).addClass("star-yellow");
          }
		  
        

   if(uid==16)
			   arrValores[5]=1;
			   if(uid==17)
			   arrValores[5]=2;
			   if(uid==18)
			   arrValores[5]=3;
			   if(uid==19)
			   arrValores[5]=4;
			   if(uid==20)
			   arrValores[5]=5;



        }
		  
	  },
	  
	   FuncOffer: function (f,blist) {


		 f = JSON.parse(f);


		var n = "";
		var count = 0;



		if(f.length == 0) {
				n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table">';
				n +='<thead>';
            	n +='<tr>';
                n +='<th colspan="3"><div class="category_name"><?= $lang_resource['OFFERSSOF_V21'] ?> '+blist.name+'<br><span class="rest_add"> '+blist.street+'</span></div></th>';

                n +='</tr>';
                n +='</thead>'

				n +='<tr><td colspan="4" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:7px"><?= $lang_resource['NOOFFER_V21'] ?></td>';
				n +='</tr></table>';
				}
			else {
		n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="offer_tbl">';
         	n +='<thead>';
            	n +='<tr>';
                	n +='<th colspan="3"><div class="category_name"><?= $lang_resource['OFFERSSOF_V21'] ?> '+blist.name+'<br><span class="rest_add"> '+blist.street+'</span></div></th>';

                n +='</tr>';
                n +='</thead>'
                n +='<tr>';
                n +='<td colspan="3">';
                n +='<div class="ofr-dv wrapp">';
                n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="offer-main-tbl" >';
                n +='<thead>';
                n +='<tr>';
				
                n +='<th><?=$lang_resource['MOBILE_MENU_LIST_OFFER_NAME'] ?></th>';
                n +='<th><?=$lang_resource['MOBILE_MENU_LIST_OFFER_PRICE'] ?></th>';
                n +='<th><?=$lang_resource['MOBILE_MENU_LIST_START_DATE'] ?></th>';
                n +='<th><?=$lang_resource['MOBILE_MENU_LIST_END_DATE']?></th>';
                n +='</tr>';
                n +='</thead>';
				 for (var x in f) {
					count = count + 1;
                n +='<tr>';
                        n +='<td>'+f[x].discounttext+'</td>';
                        n +='<td>'+f[x].rate+'</td>';
                        n +='<td>'+f[x].startdate+'</td>';
                        n +='<td>'+f[x].enddate+'</td>';
                n +='</tr>';
				 }


               n +='</table>';
               n +='</div>';
			   n +='</td>';
           	   n +='</tr>';
         	   n +='</table>';
			}



		document.getElementById("dicountContent").innerHTML  = n;


		if(count){
		document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['MOBILE_MENU_NAVIGATION_OFFER'] ?> ("+count+")";
		}
		else{
			count = 0;
			document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['MOBILE_MENU_NAVIGATION_OFFER'] ?> ("+count+")";
		}
	},




	  reviewprint: function (f)
	{

		document.getElementById("reviewCountText").innerHTML = "<?= $lang_resource['REVIEWSOF_V21'] ?> ("+f.length+")";


			n ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="review_tbl">';


			if(f.length == 0) {
				n +='<tr><td colspan="3" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:5px"> <?= $lang_resource['NOREVIEW_V21'] ?></td>';
				n +='</tr>';
				} else {
        //alert(JSON.stringify(f))
				for (var x in f) {

              n +='<tr>';
                n +='<td>'+f[x].pdate+'</td>';
                n +='<td valign="top">'+f[x].user+'</td>';
                n +='<td valign="top";>';
                n +='<table width="100%" border="0" cellpadding="0" cellspacing="0" class="review-star-tbl">';
                n +='<tr>';
                n +='<td valign="top"><span style="margin-left:5px" class="star-text"><?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?></span>';
                n +='<ul class="review-star-2">';
							var i=0;
							for(var i=1;i<=f[x].quality;i++)
							{
                            	n +='<li><a href="#"><img src="images/step3-menu-list/star-2.png"></a></li>';

							}
							var i=0;
                            for(var i=f[x].quality;i<5;i++)
							{
                                n +='<li><a href="#"><img src="images/step3-menu-list/star-3.png"></a></li>';
							}

                            n +='</ul>';
				n +='</td>';
				n +='<td>'+f[x].quality+' <?=$lang_resource['OUTOF_V21']?> 5</td>';
                      n +='</tr>';

                      n +='<tr>';
                        n +='<td valign="top"><span style="margin-left:5px"  class="star-text"><?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?></span>';
                        	n +='<ul class="review-star-2">';
                            	var i=0;
							for(var i=1;i<=f[x].delivery;i++)
							{
                            	n +='<li><a href="#"><img src="images/step3-menu-list/star-2.png"></a></li>';

							}
							var i=0;
                            for(var i=f[x].delivery;i<5;i++)
							{
                                n +='<li><a href="#"><img src="images/step3-menu-list/star-3.png"></a></li>';
							}

                            n +='</ul>';
                        n +='</td>';
                        n +='<td>'+f[x].delivery+' <?=$lang_resource['OUTOF_V21']?> 5</td>';
                      n +='</tr>';
                      n +='<tr>';
                        n +='<td valign="top"><span style="margin-left:5px"  class="star-text"><?= $lang_resource['TEMPLATE_SERVICE'] ?></span>';
                        	n +='<ul class="review-star-2">';
                            	var i=0;
							for(var i=1;i<=f[x].dealer;i++)
							{
                            	n +='<li><a href="#"><img src="images/step3-menu-list/star-2.png"></a></li>';

							}
							var i=0;
                            for(var i=f[x].dealer;i<5;i++)
							{
                                n +='<li><a href="#"><img src="images/step3-menu-list/star-3.png"></a></li>';
							}
                            n +='</ul>';
                        n +='</td>';
                        n +='<td>'+f[x].dealer+' <?=$lang_resource['OUTOF_V21']?> 5</td>';
                      n +='</tr>';
                      n +='<tr>';
                        n +='<td valign="top"><span style="margin-left:5px"  class="star-text"><?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?></span>';
                        	n +='<ul class="review-star-2">';
                            	var i=0;
							for(var i=1;i<=f[x].package;i++)
							{
                            	n +='<li><a href="#"><img src="images/step3-menu-list/star-2.png"></a></li>';

							}
							var i=0;
                            for(var i=f[x].package;i<5;i++)
							{
                                n +='<li><a href="#"><img src="images/step3-menu-list/star-3.png"></a></li>';
							}

                            n +='</ul>';
                        n +='</td>';
                        n +='<td>'+f[x].package+' <?=$lang_resource['OUTOF_V21']?> 5</td>';
                      n +='</tr>';
                    n +='</table>';

                n +='</td>';
              n +='</tr>';

				}

				}


           n +='</table>';
           
           

		  document.getElementById("reviewContent").innerHTML = n;
	},

   reviewphoto:function(g)
  {
    //alert(JSON.stringify(g))
    g = JSON.parse(g);
    var k='';
    k +=g;
    
    k ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="review_tbl">';
    if(g.length == 0) {
        k +='<tr><td colspan="3" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:5px"></td>';
        k +='</tr>';
        } else {
          
        for (var x in g) {
          k+='<tr>';
          k +='<td><a href="javascript:void(0)"><img src="panel/images/gallery/'+g[x].id+'/normal.jpg"></a></td>';
          k +='</tr>';
         }
      }
    document.getElementById("photoReview").innerHTML=k;
  },

	 PopulateDishesList: function (E, z)
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

		//console.log(Shopping);
        Shopping.Config.Dishes.List.SortBy = E;
		 Shopping.ActiveBusinesscurrency = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "currency");
		
		Main.car = Shopping.ActiveBusinesscurrency;
		
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
        var r = '<div id="dishesresultsinner" class="plc_dtl">';

					r += '<div id="popDivEmptyChk"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="menu_category_tbl" >';
         			r += '<thead>';
            	    r += '<tr>';
                	r += '<th colspan="3"><span class="category_name"><?=$lang_resource['SHOPPING_MENU_MOST_POPULAR_DISH']?></span></th>';

                	r += '</tr>'
					r += '</thead>';
					r += '</table>';
					r += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="menu_category_tbl" id="popularsdish">';
					r += '</table></div>';




        var C = "";
		var n = "";
        var D;
		var mp="";
		var EmptyChk = false;
        for (v in A)
        {
			
         /*  if (A[v].isimg==1)
            {
                 C = "background-image:url('panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/1/small.jpg?c=" + Main.Random + "');";
            }
            else
            {
                C = "background-image:url('panel/images/dummy/small_business.jpg');";
            }*/
			
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

					r += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="menu_category_tbl">';
         			r += '<thead>';
            	    r += '<tr>';
                	r += '<th colspan="3"><span class="category_name">'+ A[v].catname.toUpperCase() +'</span></th>';

                	r += '</tr>';
            		r += '</thead>';


				}
			}

			if(v == 0)
			{
					r += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="menu_category_tbl">';
         			r += '<thead>';
            	    r += '<tr>';
                	r += '<th colspan="3"><span class="category_name">'+ A[v].catname.toUpperCase() +'</span></th>';

                	r += '</tr>';
            		r += '</thead>';

			}
			
			console.log("name="+A[v].name)
			console.log("img="+A[v].isimg)
			console.log("img2="+A[v].isimg2)
			console.log("isimg3="+A[v].isimg3)
			console.log("Main.businessimagesettings="+Main.businessimagesettings)

			 if(A[v].feature == "t")
            {
			   EmptyChk = true;

			 //  mp +='<tr onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">';
			 
			if((Main.businessimagesettings != 0) && (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0))
			  {
						  mp +='<tr>';
				
			  }
			  else
			  {
				 mp +='<tr onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">';
			  }
			 
			 
			 
			 
				mp +='<td style="cursor:pointer">'
				
				if(Main.businessimagesettings != 0)
			                    {
				
				if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0) {
					
									
				mp +='<div class="viewimage">'				
				if (A[v].isimg==1){	
				mp +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C+'">'+ A[v].name.toUpperCase() +'</a>';
				if(A[v].isimg2==1){
				mp +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C2+'"></a>';
				}
				if(A[v].isimg3==1){
				mp +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C3+'"></a>';	
				}
				}else if (A[v].isimg2==1){	
				mp +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C2+'">'+ A[v].name.toUpperCase() +'</a>';
				if(A[v].isimg3==1){
				mp +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C3+'"></a>';
				}                     			                     	
				}else if (A[v].isimg3==1){	
				mp +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C3+'">'+ A[v].name.toUpperCase() +'</a>';                   	
				}
				mp +='</div>'
				}
				else 
				{
				mp +=A[v].name.toUpperCase();	
					
				}
				
				
			  }
			 else 
			 {
			 mp +=A[v].name.toUpperCase();
			 }
			 //mp +='<p>fffff</p>';
				mp +='</td>';
				//
			//	alert(JSON.stringify(A[v].description));
              // mp +='<td style="cursor:pointer">' + A[v].name.toUpperCase() + '</td>';
 if(Main.NullToEmpty(A[v].price) == ''){
           // A[v].price = 0.00;
            /*mp +='<td style="cursor:pointer"><strong id="dish_' + A[v].id + '_price" style="display:none;">'+A[v].price+ '</strong></td>';*/
			mp +='<td style="cursor:pointer" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')"><strong id="dish_' + A[v].id + '_price" style="display:none;">'+A[v].price+ '</strong></td>';
         }else{
			   var lang1='';
							 if(A[v].price!=''){
								 lang1 = Shopping.ActiveBusinesscurrency;
								 
							 }
           if((Main.businessimagesettings != 0) && (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0))
			                          {
               mp +='<td style="cursor:pointer" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'+lang1+'<strong id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</strong>';
			   //alert(Main.businessSetting.available_product);
			   if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
			   mp +='<span style="font-size: 12px; padding-left: 10px;"><input type="hidden" id="'+A[v].id+'" value="0">Avaliable : '+A[v].stock_qty+' </span>';
			   }
			   mp +='</td>';
									  }
									  else
									  {
										 mp +='<td style="cursor:pointer">'+lang1+'<strong id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</strong>';
										 //alert(Main.businessSetting.available_product);
										 if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
											 mp +='<span style="font-size: 12px; padding-left: 10px;"><input type="hidden" id="'+A[v].id+'" value="0">Avaliable : '+A[v].stock_qty+' </span>';
										 }
											 mp +='</td>';  
									  }
         } 



      
               
               if((Main.businessimagesettings != 0) && (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0))
			                          {
               mp +='<td><button class="menu_btn" type="button" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')"><img src="images/step3-menu-list/menu-arrow.png"></button></a></td>';
			   
									  }
									  else
									  {
										mp  +='<td><button class="menu_btn" type="button"><img src="images/step3-menu-list/menu-arrow.png"></button></a></td>';  
										  
									  }
               mp +='</tr>';
			}
			
			//  r +='<tr onclick="ProductOption.add_product_options_db(this,' + A[v].id + ')">';
			
			if((Main.businessimagesettings != 0) && (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0))
			  {
						  r +='<tr>';
				
			  }
			  else
			  {
				 r +='<tr onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">';
			  }
			  
			r +='<td style="cursor:pointer" >'
			
			if(Main.businessimagesettings != 0)
			                            {
			
			if (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0) {
				
				
			r +='<div class="viewimage">'				
			if (A[v].isimg==1){	
			r +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C+'">'+ A[v].name.toUpperCase() +'</a>';
			if(A[v].isimg2==1){
			r +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C2+'"></a>';
			}
			if(A[v].isimg3==1){
			r +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C3+'"></a>';	
			}
			}else if (A[v].isimg2==1){	
			r +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C2+'">'+ A[v].name.toUpperCase() +'</a>';
			if(A[v].isimg3==1){
			r +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C3+'"></a>';
			}                     			                     	
			}else if (A[v].isimg3==1){	
			r +='<a class="fancybox-buttons'+A[v].id+'" data-fancybox-group="button" href="'+C3+'">'+ A[v].name.toUpperCase() +'</a>';                   	
			}
			r +='</div>'
			}
			else
			{
				r +=A[v].name.toUpperCase();
			}
			
			
			  }
			  else
			  {
			  
			  r +=A[v].name.toUpperCase();
			  
			  }
			 r +='<p  style="font-size:14px">'+ Main.NullToEmpty(A[v].description) +'</p>';
		    	r +='</td>';
			
			
              // r +='<td style="cursor:pointer">' + A[v].name.toUpperCase() + '</td>';
                if(Main.NullToEmpty(A[v].price) == ''){
               // A[v].price = 0.00;
               /* r +='<td style="cursor:pointer"><strong id="dish_' + A[v].id + '_price" style="display:none;">'+A[v].price+ '</strong></td>';*/
			   r +='<td style="cursor:pointer" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')"><strong id="dish_' + A[v].id + '_price" style="display:none;">'+A[v].price+ '</strong></td>';
                }else{
					  var lang1='';
							 if(A[v].price!=''){
								 lang1 = Shopping.ActiveBusinesscurrency;
								 
							 }
							 if((Main.businessimagesettings != 0) && (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0))
			                          {
               r +='<td style="cursor:pointer" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')">'+lang1+'<strong id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</strong>';
			   //alert(Main.businessSetting.available_product);
			   if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
				   r +='<span style="font-size: 12px; padding-left: 10px;"><input type="hidden" id="'+A[v].id+'" value="0">Avaliable : '+A[v].stock_qty+' </span>';
			   }
				   r +='</td>';
									  }
									  else
									  {
										 r +='<td style="cursor:pointer">'+lang1+'<strong id="dish_' + A[v].id + '_price">'+Shopping.FormatPriceNotFree(A[v].price)+ '</strong>';
										 //alert(Main.businessSetting.available_product);
										 if(Main.businessSetting.available_product == 1 && IS_SCRIPTID == 0){
										 r +='<span style="font-size: 12px; padding-left: 10px;"><input type="hidden" id="'+A[v].id+'" value="0">Avaliable : '+A[v].stock_qty+' </span>';
										 }
										 r +='</td>';  
									  }
                }
               
			    if((Main.businessimagesettings != 0) && (A[v].isimg!=0 || A[v].isimg2!=0 || A[v].isimg3!=0))
			                          {
               r +='<td><button class="menu_btn" type="button" onclick="ProductOption.add_product_options_db(this,' + A[v].id + ','+A[v].stock_qty+')"><img src="images/step3-menu-list/menu-arrow.png"></button></a></td>';
			   
									  }
									  else
									  {
										r +='<td><button class="menu_btn" type="button"><img src="images/step3-menu-list/menu-arrow.png"></button></a></td>';  
										  
									  }
               r +='</tr>';


        }
	var n = "";

        r += "</div>";
        document.getElementById("dishesresults").innerHTML = r;
		document.getElementById("popularsdish").innerHTML = mp;

		if(!EmptyChk)
		document.getElementById("popDivEmptyChk").innerHTML = "";

		if(document.getElementById("plc_rgt_in"))
        document.getElementById("plc_rgt_in").innerHTML = n;


           	for (v in A){
        	$(document).ready(function() {

			$('.fancybox-buttons'+A[v].id).fancybox({

				openEffect  : 'none',
				closeEffect : 'none',
				prevEffect : 'none',
				nextEffect : 'none',
				closeBtn  : false,
				helpers : {
					title : {
						type : 'inside'
					},
					buttons	: {}
				},	
				afterLoad : function() {
					this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
				}

			});

		});
        	if(A[v].feature == "t"){
			      $(document).ready(function() {

						$('.fancybox-buttons'+A[v].id+'du').fancybox({

							openEffect  : 'none',
							closeEffect : 'none',
							prevEffect : 'none',
							nextEffect : 'none',
							closeBtn  : false,
							helpers : {
								title : {
									type : 'inside'
								},
								buttons	: {}
							},	
							afterLoad : function() {
								this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
							}

						});

					});
 			}

        }  


		Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();


        var s;
        var y;
        var t;
        var w;

     tip.update();
                    Shopping.UpdateCartTotals();
    },
	PreOrderMenuCatalogFetchMob: function (p,d) {
		p = JSON.parse(p);
		var len = p.menuonly.length;
			p.menuonly.sort(Main.SortByProperty("opentime"));

			if(len == 0) {

				alert("<?=$lang_resource['NO_SERVICE']?>")
				return ;
			}
			var n="";
			var hd = "";
			hd ='<div class="main">';
			hd +='<div class="header-grey">';
			hd +='<div class="header_top">';
			hd +='<div class="wrapp">';
			hd +='<div class="left_btn_dv">';
			if(Shopping.Menu) {
			if(Shopping.Menu.dishes.length == 0 )
                {
			hd +='<button type="button" class="red-link-btn" onclick="Shopping.changeDelType(3)">';
				}
				 else {
			hd +='<button type="button" class="red-link-btn" onclick="Shopping.OpenBusiness('+currentshop+')">';

					}
			}
				 else {
			hd +='<button type="button" class="red-link-btn" onclick="Shopping.changeDelType(3)">';

					}
			hd +='< <?=$lang_resource['MOBILE_RESERVATION_BACK']?>';
			hd +='</button>';
			hd +='</div>';
			hd +='<div class="center_heading">&nbsp;';
			hd +='</div>';
			hd +='<div class="left_btn_dv pull_right">';
			hd +='<button type="button" class="red-link-btn" onclick="Shopping.homeurl()">';
			hd +='<?=$lang_resource['MOBILE_RESERVATION_CANCEL']?>';
			hd +='</button>';
			hd +='</div>';
			hd +='</div>';
			hd +='</div>';
			hd +='<div class="wrapp">';
			hd +='<center>';
			hd +='<span class="ch_heading">';
			hd +='<?=$lang_resource['MOBILE_MENU_LIST_PREORDER']?>';
			hd +='</span>';
			hd +='</center>';
			hd +='</div>';
			hd +='</div>';
			hd +='<div class="blank-top"></div>'
			hd +='</div>';

			document.getElementById("headerSearch").innerHTML = hd;


	n+='<div class=" main bg-white">';
	n+='<h3 class="ch_heading_red">';
	n+='<?=$lang_resource['MOBILE_MENU_LIST_MENU_OPEN TIME']?>';
	n+='</h3>';
	n+='</div>';
	n+='<div class="main wrapp">';
		for(k=0;k<len;k++) {
	n+='<div class="field" style=" margin-top:30px;"  onclick="Main.PreorderMainfun('+d+','+p.menuonly[k].id+')" >';
	n+='<a href="#">';
	n+='<span class="btn-preorder">';
	n+='<strong style="margin-right:10px">';
	n+=''+Main.TitleCase(p.menuonly[k].name)+'';
	n+='</strong>';
	//Time selection settings.
	time_format="<?=$lang_resource['TIME_FORMAT']?>";
	if(time_format=="12"){
		opentime=p.menuonly[k].opentime.split(":");
		p.menuonly[k].opentime= Main.convertTimeFormat(opentime[0],opentime[1]);
		closetime=p.menuonly[k].closetime.split(":");
		p.menuonly[k].closetime= Main.convertTimeFormat(closetime[0],closetime[1]);
	}else{
		closetime=p.menuonly[k].closetime.split(":");
		
		if(closetime[0] >= 24){
			p.menuonly[k].closetime= Main.convertTimeFormat(closetime[0],closetime[1]);
		}
	}
	n+='('+p.menuonly[k].opentime+'-'+p.menuonly[k].closetime+')';
	n+='<br>';
	var weekends = p.menuonly[k].weekends
	weekends = weekends.toString()
	n +=weekends.split(",").join("");

	n+='</span>';
	n+='</a>';
	n+='</div>';

		}


	n+='</div>';
			 document.getElementById("shoppingbox").innerHTML = n;
	  },

	  PreorderMainMob: function (e) {
		  e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);

		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)

		n='';
		var week =0;
		Forms.Clean("recover14");
		Forms.Clean("recover14", "popupmainbuttonok");


		var qs = new Array();
        qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PREORDERDATE']?>"}'));
		for(var cc =0;cc<dayschedule.length;cc++) {

        qs.push(JSON.parse('{"id":"'+dayschedulev[cc]+'","caption":"'+dayschedule[cc]+'"}'));
		}

		//Time selection settings.
		time_format="<?=$lang_resource['TIME_FORMAT']?>";

			var hhp = new Array();
			 hhp.push(JSON.parse('{"id":"","caption":"HH"}'));
		 for (var p = 0; p < 12; p++) {
          if (p >= e.menuonlyeach[0].openhour && p <= e.menuonlyeach[0].closehour) {
			  //Time selection settings.
           		 if(time_format=="12"){
							var sha =   Main.zeroPad((p),2)+" AM";
						}else{
								var sha =   Main.zeroPad((p),2);
						}
            	hhp.push(JSON.parse('{"id":"'+p+'","caption":" '+ sha +' "}'));
		   }

        }
		for (var p =12; p < 24; p++) {
           if(p==12) {
			    if (p >= e.menuonlyeach[0].openhour && p <= e.menuonlyeach[0].closehour) {
					//Time selection settings.
					if(time_format=="12"){
								var sha =   Main.zeroPad((p),2)+" PM";
							}else{
									var sha =   Main.zeroPad((p),2);
							}
					hhp.push(JSON.parse('{"id":"'+p+'","caption":" '+sha +' "}'));
				}
			   } else {
				    if (p >= e.menuonlyeach[0].openhour && p <= e.menuonlyeach[0].closehour) {
						//Time selection settings.
					   if(time_format=="12"){
									var sha =  Main.zeroPad((p-12),2)+" PM";
								}else{
										var sha =   Main.zeroPad((p),2);
								}
					   hhp.push(JSON.parse('{"id":"'+p+'","caption":" '+sha +' "}'));
					}
			   }

        }
		var hhs = new Array();
			 hhs.push(JSON.parse('{"id":"","caption":"HH"}'));


			var mmp = new Array();
			 mmp.push(JSON.parse('{"id":"","caption":"MM"}'));


		n+='<div class="main">';



		n+='<div class=" main bg-white">';
		n+='<h3 class="ch_heading_red">';
		n+='<?=$lang_resource['MOBILE_MENU_LIST_MENU_OPEN_TIME']?>';
		n+='</h3>';
		n+='</div>';


		n+='<div class="main wrapp">';


                 n+='<div class="field" style="margin-top: 20px;">'+ Forms.CreateSelectPropertyPopupMob("recover14", "preorderdate", qs,"", true, "Main.Hourcheck(this)")+' </div>';

           n+=' <div class="field" style="margin-top: 15px;">'+ Forms.CreateSelectPropertyPopupMob("recover14", "preorderhh", hhs,"", true,"Main.MinuteCheck(this)")+' </div>';
            n+='<div class="field" style="margin-top: 15px;">'+ Forms.CreateSelectPropertyPopup("recover14", "preordermin", mmp,"", true)+'</div>';
             n+=' <div class="field" style="margin-top: 15px;">';
              n+='  <button type="button" class="btn-red" onclick="Main.preorderActionMob('+e.menuonlyeach[0].business+')"><?=$lang_resource['MOBILE_MENU_LIST_NEXT']?></button>';
           n+=' </div>';



        n+='</div>';
		 document.getElementById("shoppingbox").innerHTML = n;

	  },
	  ReservationContentHtml: function() {
		  

		var  rsb ='<div class="tab_contant" id="tab_content-4">';

		 Forms.Clean("reserveform", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "reserveform";
			if( Main.RedirectToBusiness &&  Main.businessSetting.businesspageheadersetting != 1 ) {
	   //  rsb += '<div class=" main bg-white login">';
	   
	   rsb += '<div class="main wrapp">';
		}
		else {
			//rsb += '<div class=" main bg-white login" style="margin-bottom:40px">';
			 rsb += '<div class="main wrapp" style="margin-bottom:40px">';
		}
			  var b = false;
            c = new Object();
            Forms.Form.reserveform.type = "create"

        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?=$lang_resource['RESERVATION_NO_GUEST']?>"
        });

        for (i=1;i<=8;i++)
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

        for (k=0;k<60;k++)
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
						//rsb +='<div class="tablewra wrapp">';
						
						rsb +='<div class="main wrapp">';
						
          			    rsb +='<div class="field">'
          			    rsb +='<small style="float: left;  margin-bottom: 5px;color: black;font-size: 12px;margin-top: 5px;"><?=$lang_resource['RESERVATION_SELECT_GUEST']?></small>'
						rsb +=Forms.CreateSelectWhereAmIBoxReservation("reserveform", "guest", d, Main.NullToEmpty(Main.WhereAmIData.guest), false,"", false);
						rsb +='</div>'
                        rsb +='<div class="field">'
                        rsb +='<small style="float: left;  margin-bottom: 5px;color: black;font-size: 12px;margin-top: 5px;"><?=$lang_resource['RESERVATION_SELECT_DATE']?></small>'

                        rsb +=Forms.CreateInputProperty10Reservation("reserveform", "rdate",  Main.NullToEmpty(Main.WhereAmIData.rdate), false,"", false);
						rsb +='</div>'
							rsb +='<div class="field">'

							rsb +='<small style="float: left;  margin-bottom: 5px;color: black;font-size: 12px;margin-top: 5px;"><?=$lang_resource['RESERVATION_SELECT_HOUR']?></small>'
							rsb += Forms.CreateSelectWhereAmIBoxReservation("reserveform", "rhour", h, Main.NullToEmpty(Main.WhereAmIData.rhour), false,"", false);
							rsb +='</div>'

							rsb +='<div class="field">'
							rsb +='<small style="float: left;  margin-bottom: 5px;color: black;font-size: 12px;margin-top: 5px;"><?=$lang_resource['RESERVATION_SELECT_MINUTE']?></small>'
							rsb += Forms.CreateSelectWhereAmIBoxReservation("reserveform", "rmin", mi,  Main.NullToEmpty(Main.WhereAmIData.rmin), false,"", false);
							rsb +='</div>'
                        rsb +='<div class="field" >'
						rsb +='<button type="button" class="btn-red" onclick="Shopping.SearchSaveReserveTime()"><?=$lang_resource['MOBILE_MENU_LIST_SEARCH_SAVE']?></button>'
						rsb +='</div>'




            	rsb +='</div>';

				<!-------------------------------------------------------------------------------------search box-->

		   if(  Main.RedirectToBusiness && Main.businessSetting.businesspageheadersetting != 1) {
				 rsb += '<div class=" main bg-white login">';
					  }
				else {
					  rsb += '<div class=" main bg-white login" style="margin-bottom:40px">';
					
					
					}

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

       			rsb +='<div class="room_bg black_text">';
			    rsb +='<h1></h1>';
				rsb +='<div class="tabledv reserve_empty_message" style="text-align:center"><?=$lang_resource['SHOPPING_RESERVATION_TABLE_EMPTY']?>'
				rsb +='</div>'
				rsb +='</div>'
				} else {
					if(RoomBox == true) {



        	 rsb +=	'<h3 class="room_heading"><?=$lang_resource['MOBILE_RESERVATION_ROOM']?></h3>';
            rsb +=	'<div class="room_bg wrapp">';
			for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 2){
            	rsb +=	'<div class="room">';
                    rsb +=	'<h2>'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>';
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
					   opentime1=Shopping.reservesc.opens.hour1+':'+Shopping.reservesc.opens.minute1;
					   closetime1=Shopping.reservesc.closes.hour1+':'+Shopping.reservesc.closes.minute1;
					   opentime=Shopping.reservesc.opens.hour+':'+Shopping.reservesc.opens.minute;
					   closetime=Shopping.reservesc.closes.hour+':'+Shopping.reservesc.closes.minute;

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
				rsb +='<p><?=$lang_resource['MENU_LIST_BOOKING_IS_AVAILABLE']?>: <br><span>'+first1+first2+first3+'</span></p>'	  
			
			//////////////////////////////////////////////////
					
                    var countg = Shopping.reserves[r].guest;
                    rsb +=	'<table class="r_table">';




						for(var countr =1; countr<=countg; countr++){
						if(Shopping.reservesbooked[0].room)	{
							if(countr ==1 || countr%4==1 ) {
					rsb +=	'<tr>';
					}
						if(Shopping.reservesbooked[0].room.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){

                        	rsb +=	'<td><button class="room_btn " id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookRoom('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>';
						 }else{
							 rsb +=	'<td><button class="room_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></td>';
						 }
						}
						else {
							rsb +=	'<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookRoom('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>';
							}
							if(countr%4==0) {
							rsb +=	'</tr>';
							}
						}






                    rsb +=	'</table>';
                rsb +=	'</div>';
						}

				}
           rsb +=	' </div>';

		}
       <!--End room_bg--------------------------------------------------------------------------------------------->
	   	if(tableBox == true) {
            rsb +=	'<h3 class="room_heading"><?=$lang_resource['MOBILE_RESERVATION_TABLE']?></h3>';
            rsb +=	'<div class="room_bg wrapp">';
			for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 1){
            	rsb +=	'<div class="room">';
                    rsb +=	'<h2>'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>';
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
					   opentime1=Shopping.reservesc.opens.hour1+':'+Shopping.reservesc.opens.minute1;
					   closetime1=Shopping.reservesc.closes.hour1+':'+Shopping.reservesc.closes.minute1;
					   opentime=Shopping.reservesc.opens.hour+':'+Shopping.reservesc.opens.minute;
					   closetime=Shopping.reservesc.closes.hour+':'+Shopping.reservesc.closes.minute;

				   }
				   
				      ///////////////////////////////////
					 if((parseInt(Shopping.reservesc.opens.hour1)==0) && (parseInt(Shopping.reservesc.opens.minute1)==0) && (parseInt(Shopping.reservesc.closes.hour1)==0) && (parseInt(Shopping.reservesc.closes.minute1)==0)){
						 first1='';
					 }else{
						  first1=' '+opentime1+' - '+closetime1+'';
					 }
					  first2='';
					   first3='';
					  if((first1!='') && (first3!='')){
						    first2=' ,';
					  }
					  if((parseInt(Shopping.reservesc.opens.hour)==0) && (parseInt(Shopping.reservesc.opens.minute)==0) && (parseInt(Shopping.reservesc.closes.hour)==0) && (parseInt(Shopping.reservesc.closes.minute)==0)){
						 first3='';
					 }else{
						  first3=' '+opentime+' - '+closetime+'';
					 }
					  if((first1!='') && (first3!='')){
						    first2=' ,';
					  }
				rsb +='<p><?= $lang_resource['RESERVATION_OPENING_TIME'] ?>: <br><span>'+first1+first2+first3+'</span></p>'	  
			
			//////////////////////////////////////////////////
				
				  var countg = Shopping.reserves[r].guest;

                    rsb +=	'<table class="r_table">';
					for(var countr =1; countr<=countg; countr++){
			if(Shopping.reservesbooked[0].table)	{
				if(countr ==1 || countr%4==1 ) {
					rsb +=	'<tr>';
					}
				if(Shopping.reservesbooked[0].table.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){

						rsb +=	'<td><button class="tbl_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookTable('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>';
				}
				else{
				rsb +='<td><button class="tbl_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></td>';
				}


				}
				else{
				rsb +='<td><button class="tbl_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookTable('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>';
				}


				if(countr%4==0 ) {
					rsb +=	'</tr>';
						}
					}
                    rsb +=	'</table>';
                rsb +=	'</div>';
          
		}
			}
 rsb +=	' </div>';
		}

		if(FreeBox == true) {
             rsb +=	'<h3 class="room_heading"><?=$lang_resource['MOBILE_RESERVATION_BOOKING_AVAILITY'] ?></h3>';
           rsb +=	' <div class="room_bg wrapp">';
		   for (r in Shopping.reserves){
				if(Shopping.reserves[r].rtype == 3){
            	rsb +=	'<div class="room">';
                    rsb +=	'<h2>'+Main.TitleCase(Shopping.reserves[r].name)+'</h2>';
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
					   opentime1=Shopping.reservesc.opens.hour1+':'+Shopping.reservesc.opens.minute1;
					   closetime1=Shopping.reservesc.closes.hour1+':'+Shopping.reservesc.closes.minute1;
					   opentime=Shopping.reservesc.opens.hour+':'+Shopping.reservesc.opens.minute;
					   closetime=Shopping.reservesc.closes.hour+':'+Shopping.reservesc.closes.minute;

				   }
				      ///////////////////////////////////
					 if((parseInt(Shopping.reservesc.opens.hour1)==0) && (parseInt(Shopping.reservesc.opens.minute1)==0) && (parseInt(Shopping.reservesc.closes.hour1)==0) && (parseInt(Shopping.reservesc.closes.minute1)==0)){
						 first1='';
					 }else{
						  first1=' '+opentime1+' - '+closetime1+'';
					 }
					  first2='';
					   first3='';
					  if((first1!='') && (first3!='')){
						    first2=' ,';
					  }
					  if((parseInt(Shopping.reservesc.opens.hour)==0) && (parseInt(Shopping.reservesc.opens.minute)==0) && (parseInt(Shopping.reservesc.closes.hour)==0) && (parseInt(Shopping.reservesc.closes.minute)==0)){
						 first3='';
					 }else{
						  first3=' '+opentime+' - '+closetime+'';
					 }
					  if((first1!='') && (first3!='')){
						    first2=' ,';
					  }
				rsb +='<p><?= $lang_resource['RESERVATION_OPENING_TIME'] ?>: <br><span>'+first1+first2+first3+'</span></p>'	  
			
			//////////////////////////////////////////////////
                  
			var countg = Shopping.reserves[r].guest;
                    rsb +=	'<table class="r_table">';

					for(var countr =1; countr<=countg; countr++){
						if(countr ==1 || countr%4==1 ) {
						rsb +=	'<tr>';
						}
			if(Shopping.reservesbooked[0].free)	{

				if(Shopping.reservesbooked[0].free.indexOf(Shopping.reserves[r].id+"_"+countr) == "-1"){

                        	rsb +=	'<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookFree('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>';
				}else{
				rsb +=	'<td><button class="room_btn booked" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.AlreadyBooked()"></button></td>';
				}
					}
					else{
					rsb +=	'<td><button class="room_btn" id="'+Shopping.reserves[r].id+'_'+countr+'" onclick="Shopping.ReserveBookFree('+Shopping.reserves[r].id+','+countr+','+Shopping.reserves[r].price+')"></button></td>';
			}
                       if(countr%4==0 ) {
						rsb +=	'</tr>';
						}
					}

                    rsb +=	'</table>';
                rsb +=	'</div>';
           


						}
		  			 }
		  			 rsb +=	' </div>';
				}
			}


             rsb +=	'<h3 class="room_heading"><?=$lang_resource['MOBILE_MENU_LIST_RESERVATION_DETAILS']?></h3>';
            rsb +=	'<div class="room_bg wrapp">';
            	rsb +=	'<div class="room">';
                	rsb +=	'<div class="label" style="margin-top:10px;"><strong><?=$lang_resource['MOBILE_MENU_LIST_NAME']?> :</strong></div>';
                    rsb +=	'<div class=""><input type="text" id="reservename" placeholder="<?=$lang_resource['MOBILE_MENU_LIST_NAME']?>" value="'+Main.NullToEmpty(Shopping.Cart.reserve.name)+'" onkeyup="Shopping.UserUpdate(this,\'reservename\')" class="field-text"></div>';

                    rsb +=	'<div class="label" style="margin-top:10px;"><strong><?=$lang_resource['MOBILE_MENU_LIST_EMAIL']?> :</strong></div>';
                    rsb +=	'<div class=""><input type="text" id="reserveemail" placeholder="<?=$lang_resource['MOBILE_MENU_LIST_EMAIL']?>"  value="'+Main.NullToEmpty(Shopping.Cart.reserve.email)+'" onkeyup="Shopping.UserUpdate(this,\'reserveemail\')" class="field-text"></div>';

                    rsb +=	'<div class="label" style="margin-top:10px;"><strong><?=$lang_resource['MOBILE_MENU_LIST_PHONE']?> :</strong></div>';
                    rsb +=	'<div class=""><input type="text" id="reservetel" placeholder="<?=$lang_resource['MOBILE_MENU_LIST_TEL']?>"  value="' + Main.NullToEmpty(Shopping.Cart.reserve.tel) + '" onkeyup="Shopping.UserUpdate(this,\'reservetel\')" class="field-text"></div>';


                   rsb +=	'<div class="" style="margin-top:15px; margin-left:-15px !important;">';
						rsb +=	'<input id="sms" name="checkbox"  value="2" id="twillo" onclick="Shopping.UpdateTwilio(this)"  class="switch checkbox_2 hand" type="checkbox"> <label for="sms" checked="checked" class="pop_label"><?=$lang_resource['MOBILE_MENU_LIST_RECEIVE_SMS']?></label>';
                    rsb +=	'</div>';

                   rsb +=	'<div class="label" style="margin-top:10px;"><strong><?=$lang_resource['MOBILE_MENU_LIST_PRICE_DETAILS']?> :</strong></div>';
                    rsb +=	'<div class="field-text clr" style="height:auto; padding:15px; box-sizing:border-box;">';


                    	rsb +=	'<table width="80%" border="0" cellspacing="0" cellpadding="0">';
						if(globalReserve.Room.length ==0) {
							rsb +='<tr id="room_av" style="display:none;">'
							rsb +='<td width="50%"><span id="room_qty" style="width:auto">0</span> X <?=$lang_resource['MOBILE_MENU_LIST_ROOM']?></td>'
							roomdisplay = 'style="display:none"';	
							rsb +='<td id="roomtd1"  '+roomdisplay+'  >:</td>'
							
							rsb +='<td width="40%" id="roomtd"  '+roomdisplay+'    align="right" >'+Main.car+'<span id="room_price">0</span></td>'
							rsb +='</tr>'
						} else {
							rsb +='<tr id="room_av" >'
							rsb +='<td width="50%"><span id="room_qty" style="width:auto">'+globalReserve.Room.length+'</span> X <?=$lang_resource['MOBILE_MENU_LIST_ROOM']?></td>'
							if(parseFloat(room_price)==0){
									roomdisplay = 'style="display:none"';	
								}else{
									roomdisplay = 'style="display:block"';	
								}
							rsb +='<td id="roomtd1"  '+roomdisplay+' >:</td>'
								
		
							rsb +='<td width="40%"  id="roomtd"  '+roomdisplay+' align="right" >'+Main.car+'<span id="room_price">'+parseFloat(room_price).toFixed(Main.IS_DECIMAL_POINT)+'</span></td>'
							rsb +='</tr>'
							}

                     if(globalReserve.Table.length == 0) {
                           rsb +=	'<tr id="table_av" style="display:none;">';
                            rsb +=	'<td width="50%"><span id="table_qty" style="width:auto">0</span> X <?=$lang_resource['MOBILE_MENU_LIST_TABLE']?> </td>';
							tabledisplay = 'style="display:none"';	
                            rsb +=	'<td id="tabletd1" '+tabledisplay+'>:</td>';
							
							
								
                            rsb +=	'<td width="40%"  id="tabletd" '+tabledisplay+'  align="right">'+Main.car+'<span id="table_price">0</span></td>';
                          rsb +=	'</tr>';
					 } else {
						  rsb +=	'<tr id="table_av" >';
                            rsb +=	'<td width="50%"><span id="table_qty" style="width:auto">'+globalReserve.Table.length+'</span> X <?=$lang_resource['MOBILE_MENU_LIST_TABLE']?> </td>';
							if(parseFloat(table_price)==0){
									tabledisplay = 'style="display:none"';	
								}else{
									tabledisplay = 'style="display:block"';	
								}
		
                            rsb +=	'<td id="tabletd1" '+tabledisplay+'>:</td>';
							
                            rsb +=	'<td width="40%"  id="tabletd" '+tabledisplay+'  align="right">'+Main.car+'<span id="table_price">'+parseFloat(table_price).toFixed(Main.IS_DECIMAL_POINT)+'</span></td>';
                            rsb +=	'</tr>';

						 }
						  if(globalReserve.Free.length == 0) {
                            rsb +=	'<tr id="free_av" style="display:none;">';
                            rsb +=	'<td width="50%"><span id="free_qty" style="width:auto">0</span> X <?=$lang_resource['MOBILE_MENU_LIST_FREE']?></td>';
							freedisplay = 'style="display:block"';	
                            rsb +=	'<td  id="freetd1" '+freedisplay+' >:</td>';
							
                            rsb +=	'<td width="40%" id="freetd" '+freedisplay+' align="right">'+Main.car+'<span id="free_price">100</span></td>';
                            rsb +=	'</tr>';
						   }
						  else {
						rsb +=	'<tr id="free_av" >';
                            rsb +=	'<td width="50%"><span id="free_qty" style="width:auto">'+globalReserve.Free.length+'</span> X <?=$lang_resource['MOBILE_MENU_LIST_FREE']?></td>';
							if(parseFloat(free_price)==0){
									freedisplay = 'style="display:none"';	
								}else{
									freedisplay = 'style="display:block"';	
								}
                            rsb +=	'<td id="freetd1" '+freedisplay+' >:</td>';
							
		
                           rsb +=	'<td width="40%" id="freetd" '+freedisplay+'   align="right">'+Main.car+'<span id="free_price">'+parseFloat(free_price).toFixed(Main.IS_DECIMAL_POINT)+'</span></td>';
                          rsb +=	'</tr>';

						 }
						 if(globalReserveTotalPrice==0) {
                           rsb +=	'<tr  id="total_av" style="display:none;">';
                            rsb +=	'<td width="50%" class="total_price" ><?=$lang_resource['MOBILE_MENU_LIST_TOTAL']?></td>';
                            rsb +=	'<td>&nbsp;</td>';
								globaltotaldisplay =  'style="display:none"';
                            rsb +=	'<td class="total" id="totaltd" '+globaltotaldisplay+' >'+Main.car+'<span id="total_price">0</span></td>';
                          rsb +=	'</tr>';
						 }
						 else {
							  rsb +=	'<tr  id="total_av" >';
                            rsb +=	'<td width="50%" class="total_price" ><?=$lang_resource['MOBILE_MENU_LIST_TOTAL']?></td>';
                            rsb +=	'<td>&nbsp;</td>';
								if(parseFloat(globalReserveTotalPrice)==0){
									globaltotaldisplay = 'style="display:none"';	
								}else{
									globaltotaldisplay = 'style="display:block"';	
								}
                            rsb +=	'<td class="total"  id="totaltd"  '+globaltotaldisplay+' >'+Main.car+'<span id="total_price">'+globalReserveTotalPrice+'</span></td>';
                          	rsb +=	'</tr>';

							 }
                        rsb +=	'</table>';
                        rsb +=	'</div>';
						rsb +=	'</div>';
						rsb +=	'</div>';
						
			
			
            rsb +=	'<div class="wrapp" style="margin:10px 0 30px 0;" id="ReservatioPayModule" style="display:none" >';			
     		rsb +=	'<button type="button" onclick="Shopping.ReservePaymentMob()" class="btn-red" ><?=$lang_resource['MOBILE_MENU_LIST_PAYMENT_METHOD']?> &nbsp;&nbsp;&nbsp;&gt;&gt;</button>';
            rsb +=	'</div>';
			rsb += '</div>';
			rsb +='</div>'
			rsb +='</div>';
			rsb +='</div>';
	return rsb;
		  },
	ShowConfirmMob:  function(id,c){

		     c = JSON.parse(c);
			 var abn='';
			 var hd='';
			 hd +=' <div class="main">';
    	  	 hd +='<div class="header-grey">';
        	 hd +='<div class="header_top">';
             hd +='<div class="wrapp">';
             hd +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="Main.InitInterface()" >< <?=$lang_resource['MOBILE_MENU_LIST_HOME']?></button></div>';
             hd +='</div>';
             hd +=' </div>';

             hd +=' </div>';
        	 hd +=' </div>';
			 hd +='<div class="blank-top"></div>'
    		 hd +='</div>';
			 document.getElementById("headerSearch").innerHTML = hd;

	 abn+=' <div class=" main bg-white" style="float:left;"> ';
      abn+='	<h3 class="ch_heading_red"><img src="images/step5-confirm/seccess-icon.png"></h3>';
      if(Main.deliveryType == "pickup")  {
      	abn += '<center><button id="open_new_tab" type="button" class="takewaypickup"  style="margin:10px;"><?=$lang_resource['GET_DIRECTION_FOR_TAKEWAY']?></button>'
      	abn +='<input id="websites" value="" type="hidden" >'
      }else{
      	abn += '<center><button type="button" id="open_new_tab" style="display:none;" class="takewaypickup" ><?=$lang_resource['GET_DIRECTION_FOR_TAKEWAY']?></button>'
      	abn +='<input id="websites" value="" type="hidden" >'
      }
         abn+='<div class="block">';
         abn+='	<h3><?= $lang_resource['ORDER_THANKS_PLCED'] ?></h3>';
           abn+='  <div class="order-no"><?= $lang_resource['ORDER_PROCESSED'] ?>  : <span>#'+ id +'</span></div>';
         abn+='</div>';
         abn+='<div class="block" style="margin-bottom:50px;">';
        	 abn+='<h4><?=$lang_resource['MOBILE_MENU_LIST_DO_YOU_WANT_KNOW_THE_PROGRESS']?></h4>';
            abn+=' <center><button type="button" class="track_now" style="margin-bottom:10px;" onClick="Visuals.OpenOrder('+id+',true)"><?=$lang_resource['MOBILE_MENU_LIST_TRACK_NOW']?></button></center>';
            abn+=' <h4 class="block-text" style="font-weight:normal; style="margin-bottom:10px;""><?=$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER']?><br> <span style="color:#e74c3c;">'+c.name+' : '+c.tel+'</span></h4>';
         abn+='</div>';
   abn+='  </div>';
	  document.getElementById("shoppingbox").innerHTML = abn;

	if(Main.deliveryType == "pickup")  {
		$(document).ready(function() {
	  		$.post("panel/lib/front-main.php", "f=FetchOrderForTakewayMap&id=" + id, function (c) {	
	  			c = JSON.parse(c);
				startLocationbuyer = c.buyeraddress;
				startLocationbuyer = startLocationbuyer.replace("/", "@");
				endLocationbusiness = c.businessaddress;
				endLocationbusiness = endLocationbusiness.replace("/", "@");
				var url = "https://www.google.com/maps/dir/"+startLocationbuyer+"/"+endLocationbusiness;
				$("#websites").val(url);
	  		});
		});
    }

    $("#open_new_tab").click(function(){
      //this will find the selected website from the dropdown
      var go_to_url = $("#websites").val();
      
      //this will redirect us in new tab
      window.open(go_to_url, '_blank');
   });

	   
			  if(showConfigureSMSPlugInPopUp == true) {
                    alert(showConfigureSMSPlugInPopUpText);
                }
	  },
	  
	  ReserveplusOrderContent: function () {
		var n =''

						if(globalReserve.Room.length!="0") {
					    n +='<tr>';
                        n +='<td width="50%" ><?=$lang_resource['MOBILE_RESERVATION_ROOM']?> X <span>'+globalReserve.Room.length+'</span></td>';
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
                         n +='<td width="50%" ><?=$lang_resource['MOBILE_RESERVATION_TABLE']?> X <span>'+globalReserve.Table.length+'</span></td>';
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
                         n +='<td width="50%" ><?=$lang_resource['MOBILE_RESERVATION_FREE']?> X <span >'+globalReserve.Free.length+'</span></td>';
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
                         n +='<td width="50%" ><?=$lang_resource['MOBILE_RESERVATION_DATE']?>:</td>';
                         n +='<td width="30%" ><span >'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'</span></td>';
					     n +='</tr>';
							}
						if(Main.NullToEmpty(Main.WhereAmIData.rhour)!="-1") {
						  n +='<tr>';
                         n +='<td width="50%"><?=$lang_resource['MOBILE_RESERVATION_TIME']?> :</td>';
                         n +='<td width="30%" ><span >'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rhour)),2)+':'+Main.zeroPad((Main.NullToEmpty(Main.WhereAmIData.rmin)),2)+'</span></td>';
					     n +='</tr>';
					   	n +='<tr>';
						}
						n +='<tr style="display:none">';
                         n +='<td width="50%" class="total"><?=$lang_resource['MOBILE_MENU_LIST_TOTAL']?> :</td>';
                         n +='<td width="30%" class="total_price1"> '+Main.car+''+globalReserveTotalPrice+'</td>';
					   n +='</tr>';
					   n +='<tr style="display:none">';
                         n +='<td width="50%" class="total"><?=$lang_resource['MOBILE_MENU_LIST_GRAND_TOTAL']?>  :</td>';
                         n +='<td width="30%" class="total_price1" >'+Main.car+'<span id="grand_total"><b>'+Shopping.Cart.grandtotal+'</b> </span></td>';
					   n +='</tr>';

					   $("#chk_reserve").html(n);
	},
	infoDivHtml: function (u) {
		 var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");
        var p = Shopping.Business[u].street + " - " + Shopping.Business[u].colony +"," + o;

			var n ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="review_tbl">'
			n +='<thead>'
			n +='<tr>'
			n +='<th colspan="3"><div class="category_name">'+ Shopping.Business[u].name.toUpperCase()+'<br><span class="rest_add">'+ p +'</span></div></th>'
			n +="<input type='hidden' id='deladd' value='"+p+"'>"
			n +='</tr>'
			n +='</thead>'
			n +='</table>'
            n +='<div class="info_wrapper">'
			n +='<div id="accordion">'
			n +='<h3><?= $lang_resource['CATALOG_V21'] ?>  : <?=$lang_resource['MOBILE_MENU_LIST_OPENING_TIME']?></h3>'
			n +='<div>'
			n +='<div class="info-dv">'
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="info-tbl" id="catlogview">'
			n +='</table>'
			n +='</div>'
			<!--ofr-dv-->
			n +='</div>'
			n +='<h3><?=$lang_resource['MOBILE_MENU_LIST_DELIVERY_LOCATION']?></h3>'
			n +='<div>'

			n +='<div id="deliveryItemPrice"></div>'
			n +='<div class="delivery_map_dv businessmapbox" id="mapbox12">'
			n +='<img src="images/map-img.png">'
			n +='</div>'
			n +='</div>'
			n +='<h3><?=$lang_resource['MOBILE_MENU_LIST_ABOUT_RESTAURANT']?></h3>'
			n +='<div>'
			n +='<div class="info_text_dv">'+ Main.NullToEmpty(Shopping.Business[u].abusiness)+'</div>'
			n +='</div>'
			n +='<h3 id="photo_div_text"><?=$lang_resource['MOBILE_MENU_LIST_PHOTO_GALLERY']?></h3>'
			n +='<div id="photo_div">'
			n +='<div class="gallery_dv" >'
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="photo_gallery_tbl">'
			n +='<tbody id="infophotpdiv">'
			n +='</tbody></table>'
			n +='</div>'
			n +='</div>'
			n +='<h3 id="video_div_text"><?=$lang_resource['MOBILE_MENU_LIST_VIDEO_GALLERY']?></h3>'
			n +='<div id="video_div">'
			n +='<div class="gallery_dv" style="float:right">'
			n +='<div class="video" id="infovideodiv">'
			n +='<a href="javascript:void(0)" style="margin-bottom:25px; float:left;"><img src="images/video.png"></a>'
			n +='<a href="javascript:void(0)"><img src="images/video.png"></a>'
			n +='</div>'
			<!--video-->
			n +='</div>'
			n +='</div>'
			n +='</div>'
			n +='</div>'
			<!--info_wrapper-->

			n +='<div class="info_dv" style="display:none;">'
			n +='<h4 class="heading4">'+ Shopping.Business[u].name.toUpperCase()+'</h4>'
			n +='<p class="info-address ">'+ p +'</p>'
		    n +="<input type='hidden' id='deladd' value='"+p+"'>"
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
			n +='<tr>'
			n +='<td width="45%">'
			n +='<h2 class="catalog-heading"><?= $lang_resource['CATALOG_V21'] ?> : <span><?=$lang_resource['MOBILE_MENU_LIST_OPENING_TIME']?></span></h2>'
			n +='<div class="opentime_dv">'
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="open-time-tbl" id="catlogview">'
			n +='</table>'
			n +='</div>'
			<!--opentime_dv-->
			n +='</td>'
			n +='<td valign="top" style="padding-left:20px;">'
			n +='<h3 class="heading3" style="float:left;"><?= $lang_resource['DELIVERYL_V21'] ?></h3><input type="hidden" id="delbid" value="'+Shopping.Business[u].id+'">'
			n +='<div class="deli_price_dv" id="deliveryItemPrice">'
			n +='</div>'
			<!--deli_price_dv-->
			n +='<div class="delivery_map_dv businessmapbox">'
			n +='</div>'
			<!--delivery_map_dv-->
			n +='</td>'
			n +='</tr>'
			n +='</table>'

			n +='<h3 class="heading3" style="float:left;"><?= $lang_resource['ABOUTR_V21'] ?></h3>'
			n +='<div class="info_text_dv">'+ Main.NullToEmpty(Shopping.Business[u].abusiness)+'</div>'
			<!--info_text_dv-->
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
			n +='<tr>'
			n +='<td valign="top">'
			n +='<h3 class="heading3"><?= $lang_resource['PHOTOG_V21'] ?></h3>'
			n +='<div class="gallery_dv" >'
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="photo_gallery_tbl" id="infophotpdiv">'
			n +='</table>'
			n +='</div>'
			<!--gallery_dv-->
			n +='</td>'
			n +='<td valign="top">'
			n +='<h3 class="heading3" style="margin-left:15px;"><?= $lang_resource['VIDEOG_V21'] ?></h3>'
			n +='<div class="gallery_dv" style="float:right">'
			n +='<div class="video" id="infovideodiv">'
			n +='</div>'
			<!--video-->
			n +='</div>'
			<!--gallery_dv-->
			n +='</td>'
			n +='</tr>'
			n +='</table>'
			n +='</div>'
			return n;
			},
			
			
		MenuCartlist : function (i){
		var  n ='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			if(Shopping.Cart.business[0].dishes[i].psettingval==1) 
			{ 
				if(Shopping.Cart.business[0].dishes[i].delivery_price)
				{
				 Main.Dlvprice = Main.NullToEmpty(Shopping.Cart.business[0].dishes[i].delivery_price);
				}
				if(Main.Dlvprice!="")
				{
			  n +='<br><ul class="pdct_op">';
			if(Main.deliveryType == 'delivery' && Main.Dlvprice != ''){
				n +='<li><font><font><?=$lang_resource['PRODUCT_DELIVERY_PRICE']?> + '+Shopping.ActiveBusinesscurrency+ ''+ Main.Dlvprice +'</font></font></li>'; 
				}
					n +='</ul>';
				}
			}
			  if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;">'+ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</a></span>';
				}
			  if(Shopping.Cart.business[0].dishes[i].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';	
			  }	
			  
			 n +='</td>';
             n +='<td width="30%" >'+Shopping.ActiveBusinesscurrency+'<span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPriceNotFree(Shopping.Cart.business[0].dishes[i].total)+'</span></td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';
			 
	return n;		 
		
		},

MenuCartlist_new : function (i){
	var p1 = '';
	p1 +='<div class="pop-up-product">';
	p1 +='<div class="pop-up-product-qtnty">';
	p1 +='<input type="button" onclick="Shopping.RemoveFromCart(  0, ' + i + ')" class="pop-up-product-minas-btn" value="-">';
	p1 +='<p>'+Shopping.Cart.business[0].dishes[i].quantity+'</p>';
	p1 +='<input type="button" onClick="ProductOption.AddFromCart(  0, ' + i + ')" class="pop-up-product-plus-btn" value="+">';
	p1 +='</div>';
	p1 +='<div class="pop-up-product-name">';
	p1 +='<p>' + Shopping.Cart.business[0].dishes[i].name+'</p>';
	if(Shopping.Cart.business[0].dishes[i].options) {
	p1 +='<div><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')">'+ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</a></div>';
	}
	if(Shopping.Cart.business[0].dishes[i].comments) {
	p1 +='<div><a href="javascript:void(0)">'+Shopping.Cart.business[0].dishes[i].comments+'</div>';	
	}
	p1 +='</div><div class="pop-up-product-price"><p>'+Shopping.ActiveBusinesscurrency+' '+Shopping.FormatPriceNotFree(Shopping.Cart.business[0].dishes[i].total)+'</p></div>';
	p1 +='<input type="button" onClick="Shopping.RemoveFromCart(  0, ' + i + ')" class="pop-up-product-close">';				
	p1 +='</div>';
	return p1;
}//MenuCartlist_new

			

};
