var RestMenuList = {
 PrintBusinessAndDishes: function ()
    {
		$(window).scrollTop(180)

		//alert(Shopping.ActiveBusiness);
	 $(".map-pannel").hide();
		var myParam = location.search.split('order=');

		//alert(myParam)

        var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
        var o = Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[u].city, "city");
		//alert(JSON.stringify(Shopping.Business));
        var p = Shopping.Business[u].street + " - " + Shopping.Business[u].colony +"," + o;
		var v='';
		if(Shopping.Business[u].isimg==1){
        	v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
		}
		else{
			v = 'panel/images/dummy/medium_business.jpg';
		}
        Shopping.MenuCategories = new Array();

        //alert(JSON.stringify(Shopping.Menu.dishes))
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
                if (!r && Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", Shopping.Menu.dishes[q].category) != "")
                {
                    Shopping.MenuCategories.push(
                    {
                        id: Shopping.Menu.dishes[q].category,
                        name: Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", Shopping.Menu.dishes[q].category, "name"),
                        rank: Shopping.Menu.dishes[q].rank_cat,
                        enabled: true
                    })
                }
            }
            else
            {
                if (Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", Shopping.Menu.dishes[q].category) != "")
                {
                    Shopping.MenuCategories.push(
                    {
                        id: Shopping.Menu.dishes[q].category,
                        name: Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", Shopping.Menu.dishes[q].category, "name"),
                        rank: Shopping.Menu.dishes[q].rank_cat,
                        enabled: true
                    })
                }
            }
            Shopping.Menu.dishes[q].selectedExtras = new Object()
        }




        var w = "";
        var t = "";
 
		Shopping.MenuCategories.sort(Main.SortByProperty('name'));

        var ban ="";

        <!--navarea-->      
        ban +='<div class="navarea">'
        ban +='<div class="container">'
        ban +='<div class="row">'

        ban +='<nav class="navbar navbar-default">'
        <!-- Brand and toggle get grouped for better mobile display -->
        ban +='<div class="navbar-header">'
        ban +='<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'
        ban +='<span class="sr-only">Toggle navigation</span>'
        ban +='<span class="icon-bar"></span>'
        ban +='<span class="icon-bar"></span>'
        ban +='<span class="icon-bar"></span>'
        ban +='</button>'
        ban +='</div>'

        <!-- Collect the nav links, forms, and other content for toggling -->
        ban +='<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">'
        Shopping.MenuCategories.sort(Main.SortByProperty('name'));
       
        ban +='<ul>'
        var counter = 1;
   
        for (q in Shopping.MenuCategories){
            if(counter <= 3){                
                ban +='<li><a href="javascript:MainCustom.changecatclass('+Shopping.MenuCategories[q].id+')"><img src="<?=$module_image_link?>/images/icon'+counter+'.png" alt=""><span>' + Shopping.MenuCategories[q].name + '</span></a></li>'
            }
            if(counter > 3){
               
                if(counter == 4){
                    ban +='<li>'
                    ban +='<a href="#"><span class="more">More</span></a>'
                    ban +='<ul class="menu_dropdown">'
                }
                ban +='<li><a href="javascript:MainCustom.changecatclass('+Shopping.MenuCategories[q].id+')">'+ Shopping.MenuCategories[q].name +'</a></li>'

                if(counter == 4){
                    ban +='</ul>'
                    ban +='</li>'
                }
            }
            counter++;
        }
   

        ban +='<li class="position fil">'
        ban +='<a href="#"><img src="<?=$module_image_link?>/images/icon4.png" alt=""><span>Order & Filter</span></a>'

        <!--filter_dropdown-->
        ban +='<div class="filter_dropdown">'
        ban +='<div class="filterpop_top"></div>'

        <!--filter_top-->
        ban +='<div class="filter_top">'
        ban +='<div class="filterbox">'
        ban +='<h5>Order by Price</h5>'
        ban +='<div class="filternav"><ul><li class="act"><a href="#" class="act">high <span>to</span> low</a></li><li><a href="#">low <span>to</span> high</a></li></ul></div>'
        ban +='</div>'

        ban +='<div class="filterbox">'
        ban +='<h5>Order by Name</h5>'
        ban +='<div class="filternav"><ul><li class="act"><a href="#" class="act">a <span>to</span> z</a></li><li><a href="#">z <span>to</span> a</a></li></ul></div>'
        ban +='</div>'

        ban +='<div class="filterbox">'
        ban +='<h5>Delivery time</h5>'
        ban +='<button type="button" class="delord">order by lower delivery time</button>'
        ban +='</div>'

        ban +='<div class="filterbox">'
        ban +='<h5>Price range</h5>'
        ban +='<img src="<?=$module_image_link?>/images/range.png" alt="">'
        ban +='</div>'                     
        ban +='</div>'
        <!--filter_top end-->



        ban +='<div class="filter_bot">'
        ban +='<span><input id="1" class="nc" type="checkbox" name="" value=""><label for="1">red</label></span>'
        ban +='<span><input id="2" class="nc" type="checkbox" name="" value=""><label for="2">whitr</label></span>'
        ban +='<span><input id="3" class="nc" type="checkbox" name="" value=""><label for="3">rose</label></span>'
        ban +='<span><input id="4" class="nc" type="checkbox" name="" value=""><label for="4">sparkling</label></span>'
        ban +='</div>'


        ban +='</div>'
        <!--filter_dropdown end-->
        ban +='</li>'








        ban +='<li><a href="#"><img src="<?=$module_image_link?>/images/icon5.png" alt="" style="margin: -4px 10px 0 0;"><span style="margin:-10px 0 0 0;"><p class="tuo">il tuo ondirizzo:</p> <p class="via">via tiraboschi 8, 20132, Milano</p></span></a></li>'
        ban +='<li><a href="#"><img src="<?=$module_image_link?>/images/pen.png" alt=""></a></li>'
        ban +='</ul>'
        ban +='</div>'<!-- /.navbar-collapse -->
        ban +='</nav>'
        ban +='</div>'
        ban +='</div>'  
        ban +='</div>'
        <!--navarea-->






		 var n = "";


	var bid = Shopping.Business[u].id;
	  var bname = Shopping.Business[u].name;

	  n +='<div id="plce_div_menu">'
	 n +='<div >';
        	 n +='<div class="menu_tab_content">';
            	 n +='<div class=" tab_left_sidebar">';
                	 n +='<h3 class="restaurant-name">' + Shopping.Business[u].name.toUpperCase() +'</h3>';


                     n +='<div class="review" style="margin:7px 0px 0px 0px">';
                                    	 n +='<ul class="review-star">';
                                        	 n +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>';
                                             n +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>';
                                             n +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>';
                                             n +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>';
                                             n +='<li><a href="#"><img src="images/star-grey2.png"></a></li>';
                                         n +='</ul>';
                                         n +='<span class="see-review"><a href="javascript:Shopping.skiptab(3)">See Review</a></span>';
                                    n +=' </div>';
                                     n +='<p class="rest-address">'+Shopping.Business[u].street + " - " + Shopping.Business[u].colony+'</p>';
									  if(Main.NullToEmpty(Shopping.Business[u].paypal) != "" || Main.NullToEmpty(Shopping.Business[u].acceptcard) == "t" ){
                                     n +='<div class="pay_dv">';

                                    	 n +='<span class="pay_text">We Accept :</span>';
                                      if(Main.NullToEmpty(Shopping.Business[u].paypal) != ""){
                                         	 n +='<span class="pull_left" style="margin-right:3px"><a href="#"><img src="images/pay-1.png"></a></span>';
									  }
									   if(Main.NullToEmpty(Shopping.Business[u].acceptcard) == "t"){
                                             n +='<span class="pull_left" style="margin-right:3px"><a href="#"><img src="images/pay-2.png"></a></span>';
                                             n +='<span class="pull_left" style="margin-right:3px"><a href="#"><img src="images/pay-3.png"></a></span>';
                                             n +='<span class="pull_left"><a href="#"><img src="images/pay-4.png"></a></span>';
											 }

                                     n +='</div>';
									  }

                                     n +='<p class="open-time">Opening time : '+Main.zeroPad(Shopping.Business[u].opentime,2)+' - '+Main.zeroPad(Shopping.Business[u].closetime,2)+'</p>';

									 if(Main.User) {
									  n += '<div><button onclick="Shopping.AddToFav(\'' + bid + '\',\'' + bname + '\')" class="fav_button"><span class="fav_img"><img src="images/heart.png"></span></img><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button></div>';
									 }
									 else {
								    
									 n += '<div><button onclick="Main.Favlogin()" class="fav_button"><span class="fav_img"><img src="images/heart.png"></span></img><?=$lang_resource['SHOPPING_ADD_FAVOURITE'] ?></button></div>'; 
										 }


                                     n +='<div class="rest-add-dv" id="shopmenuadscontainer">';
                                    	 n +='<a href="#"><img src="images/restaurant-ad.png"></a>';
                                     n +='</div>';

                 n +='</div>';
				 Shopping.MenuCategories.sort(Main.SortByProperty('name'));
                 n +='<div class="tab_center_dv">';
                	 n +='<div class="center_dv_header">';
						 n +='<table width="100%" border="0" cellspacing="0" cellpadding="0">';
                           n +='<tr>';
                             n +='<td><select class="field_select" onchange="Shopping.changecatclass(this)">';
                            	 n +='<option value="-1">Select Categories</option>';

						for (q in Shopping.MenuCategories)
						{
                                 n +='<option value="'+Shopping.MenuCategories[q].id+'">' + Shopping.MenuCategories[q].name + '</option>';
						}

                             n +='</select></td>';
                             n +='<td><input type="text" class=" field_text food-search" placeholder="Search here" style="margin-left:12px;"></td>';
                           n +='</tr>';
                        n +='</table>';

                    n +='</div>';

					 //n +='<div id="dishesresults">';

                // n +='</div>';
				 n +='</div>';



                 n +='<div class="tab_right_sidebar">';
                	 n +='<div class="tab_right_header">';
                    	 n +='<div class="pull_left" style="margin-top:2px;"><img src="images/cart-icon.png"></div>';
					
                         n +='<div class="cart_text" id="itemCount">You have <span>0 items</span></div>';



                     n +='</div>';
                     n +='<table width="91%" border="0" cellspacing="0" cellpadding="0" class="price-tbl" id="plc_rgt_in">';
      
						n += '</table>';



					  n +='<table width="91%" border="0" cellspacing="0" cellpadding="0" class="price-tbl-2">';
					   n += '<tr>';
					   n +='<td width="50%" class="total"><?= $lang_resource['DELIVERY_V2'] ?></td>';
						n +='<td width="30%" id="' +Shopping.Business[u].id + '_shipping">'+Shopping.Business[0].shipping+'</td>';

					n += '</tr>';
					   n += '<tr id="showDiscount"  style="display: none" >';
					   n +='<td width="50%" class="total"><?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?></td>';
						n +='<td width="30%" id="cart_dis">'+Shopping.FormatPrice(Shopping.Business[u].tax)+'</td>';

					n += '</tr>';

					       var s="";
						    if(Shopping.Cart.buyer.taxtype == 1)
							s += '<br/><span style="font-size : 11px;font-weight:bold"><?= $lang_resource['Tax_not_included_V2'] ?></span>';
							/*else if(Shopping.Cart.buyer.taxtype == 2)
							s += '<br/><span style="font-size : 11px;font-weight:bold"><?= $lang_resource['Tax_included_V2'] ?></span>';*/

					   n += '<tr id="showTax"  style="display: none" >';
						n +='<td width="50%" class="total"><?= $lang_resource['Tax_V2'] ?> (' + Shopping.Cart.buyer.tax + '%) '+s+'</td>';
						n +='<td width="30%" id="cart_taxid">'+Shopping.FormatPrice(Shopping.Business[u].tax)+'</td>';
					n += '</tr>';


                       n +='<tr>';
                         n +='<td width="50%" class="total">Total</td>';
                         n +='<td width="30%" class="total_price" id="orderprice">0.00</td>';
					   n +='</tr>';

					   if(Shopping.Cart.preorder) {
		 					var d = new Date(Shopping.Cart.preorderDate);
							Shopping.Cart.buyer.deliveryhours = d.getFullYear() + '-' + Main.zeroPad((d.getMonth()+1),2) + '-' + Main.zeroPad(d.getDate(),2) +'   '+ Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2) ;

								n += '<tr><td colspan="2" align="center" style="cursor: pointer;font-size: 14px;text-align: left;padding-top: 20px;font-family: open sans;font-weight: 600;" ><?=$lang_resource['PREORDER_DELIVERY']?><span style=" font-weight: bold;color: #e74c3c;margin: 10px 5px 0px 0px;font-size: 12px;"> '+ d.getFullYear() + '-' + Main.zeroPad((d.getMonth()+1),2) + '-' + Main.zeroPad(d.getDate(),2) +'   '+ Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2)
								n += '</span><span style="float: left;position: absolute;"><button type="button" style="padding: 5px 5px 5px 5px; color: #fff;font-size: 10px;  text-transform: uppercase; background: #e74c3c; border: none; border-radius: 4px; cursor: pointer; float: left;" class="" onclick="Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+')">Change Time?</button></span></td></tr>';
	}



                     n +='</table>';
                     n +='<div class="btn_dv">';
						 n +='<span class="pull_left"><button type="button" class="order_now_btn" onclick="Shopping.OpenCartCheck()">ORDER NOW</button></span>';
                         n +='<span class="pull_right"><button type="button" class="back_btn" onclick="Shopping.changeDelType(3)">Back</button></span>';
                     n +='</div>';


                 n +='</div>';
             n +='</div>';
         n +='</div>';

		 n +='</div>';



			/***********************************************tab section******************************************************************************************/
			/*****************************************Menu part***********************************************************************************/
		     Main.WhereAmILocationData = new Object();


			 var locationPoint = JSON.parse(Shopping.Business[u].locationPoint);

			 Main.WhereAmILocationData.latitud = locationPoint.latitud;
			 Main.WhereAmILocationData.longitud = locationPoint.longitud;
			 Main.WhereAmILocationData.zoom = 10;
			 Main.WhereAmILocationData.zonesloc = Shopping.Business[u].zonesloc;

			n +='<div class="plce_div" id="plce_div_info" style="display: none"  >';


			n +='<div class="info_dv">'
			n +='<h4 class="heading4">'+ Shopping.Business[u].name.toUpperCase()+'</h4>'
			n +='<p class="info-address ">'+ p +'</p>'
		    n +="<input type='hidden' id='deladd' value='"+p+"'>"
			n +='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
			n +='<tr>'
			n +='<td width="45%">'
			n +='<h2 class="catalog-heading"><?= $lang_resource['CATALOG_V21'] ?> : <span>Opening time</span></h2>'
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
			n +='<div class="delivery_map_dv businessmapbox" id="mapbox12">'
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









						n +='</div>';


		/*****************************************Menu part***********************************************************************************/
		n +='<div class="plce_div" id="plce_div_review" style="display: none" >';
		n +='<div class="tab_contant" id="tab_content-2">';




        n +='<div  id="review" style="float: left;width: 100%;margin-top: 50px;">';

		      if(Main.NullToEmpty(myParam) !="" && Main.NullToEmpty(myParam) !="?review"   )
		{
		 n +='<iframe src="panel/js/reviewform.php?order='+myParam[1]+'&busid='+Shopping.Business[u].id+'" width="100%" height="350"></iframe><td><br/>';
		//alert(myParam[1]);
		}

         n +='</div>';

     n +='<div class="demotest">';
          	 n +='<h4 style="padding:10px">'+ Main.TitleCase(Shopping.Business[u].name)+'</h4>';



	      n +='<div id="reviewContent"></div>';


        n +='</div>'<!--demotest-->
        n +='</div>';
		n +='</div>';
		n +='</div>';


		<!------------------------------------ offers tab ------------------------------------------------>
		n +='<div class="plce_div" id="plce_div_offer" style="display: none" >';
		n +='<div class="tab_contant" id="tab_content-4">';






     n +='<div class="demotest">';
          	 n +='<h4 style="padding:10px;margin-bottom:0px"><?= $lang_resource['OFFERSSOF_V21'] ?> <span>'+ Main.TitleCase(Shopping.Business[u].name)+'</span></h4>';
			  n +='<p><span>'+ p +'</span></p>';


			// 	n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table"><tr><td colspan="3" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:5px"> <?= $lang_resource['NOOFFER_V21'] ?></td></table>';


               n +='<div id="dicountContent"></div>';

        n +='</div>'<!--demotest-->
        n +='</div>';
		n +='</div>';
		<!------------------------------------ offers tab ------------------------------------------------>




        <!-- New Design -->
        var n =''

        n +='<div id="shopmenuadscontainer" style="display:none !important;"></div>'

        <!--product-area -->       
        n +='<div class="product-area">'
        n +='<div class="container">' 

        n +='<div class="prosearch">'
        n +='<label>203 vini trovati</label>'
        n +='<div class="pro_seadv">'
        n +='<input name="" type="text" id="dishsearch" ><button type="button" class="searbtn"></button>'
        n +='</div>'
        n +='</div>'

        <!--pro_row-->
        n +='<div class="pro_row" id="dishesresults">'
        <!--pro_col-->
        n +='<div class="pro_col">'
        n +='<div class="pro_image"><a href="images/bot11.png" data-imagelightbox="f"><img src="<?=$module_image_link?>/images/bot1.png" alt="Snail"></a></div>'
        n +='<div class="protext_dv"><h5>BORGA CHARDONNAY</h5><p>75CL</p></div>'
        n +='<div class="probottom_dv">'
        n +='<div class="pro_rupe">€ 9.5</div>'
        n +='<div class="pro_plusminus">'
        n +='<button type="button" class="minus">-</button>'
        n +='<input name="" type="text" class="val" value="1">'
        n +='<button type="button" class="plus">+</button>'
        n +='</div>'
        n +='<button type="button" class="pro_cart"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
        n +='</div>'
        n +='</div>'
        <!--pro_col-->

         <!--pro_col-->
        n +='<div class="pro_col">'
        n +='<div class="pro_image"><a href="images/bot11.png" data-imagelightbox="f"><img src="<?=$module_image_link?>/images/bot1.png" alt="Snail"></a></div>'
        n +='<div class="protext_dv"><h5>BORGA CHARDONNAY</h5><p>75CL</p></div>'
        n +='<div class="probottom_dv">'
        n +='<div class="pro_rupe">€ 9.5</div>'
        n +='<div class="pro_plusminus">'
        n +='<button type="button" class="minus">-</button>'
        n +='<input name="" type="text" class="val" value="1">'
        n +='<button type="button" class="plus">+</button>'
        n +='</div>'
        n +='<button type="button" class="pro_cart"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
        n +='</div>'
        n +='</div>'
        <!--pro_col-->

         <!--pro_col-->
        n +='<div class="pro_col">'
        n +='<div class="pro_image"><a href="images/bot11.png" data-imagelightbox="f"><img src="<?=$module_image_link?>/images/bot1.png" alt="Snail"></a></div>'
        n +='<div class="protext_dv"><h5>BORGA CHARDONNAY</h5><p>75CL</p></div>'
        n +='<div class="probottom_dv">'
        n +='<div class="pro_rupe">€ 9.5</div>'
        n +='<div class="pro_plusminus">'
        n +='<button type="button" class="minus">-</button>'
        n +='<input name="" type="text" class="val" value="1">'
        n +='<button type="button" class="plus">+</button>'
        n +='</div>'
        n +='<button type="button" class="pro_cart"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
        n +='</div>'
        n +='</div>'
        <!--pro_col-->

         <!--pro_col-->
        n +='<div class="pro_col">'
        n +='<div class="pro_image"><a href="images/bot11.png" data-imagelightbox="f"><img src="<?=$module_image_link?>/images/bot1.png" alt="Snail"></a></div>'
        n +='<div class="protext_dv"><h5>BORGA CHARDONNAY</h5><p>75CL</p></div>'
        n +='<div class="probottom_dv">'
        n +='<div class="pro_rupe">€ 9.5</div>'
        n +='<div class="pro_plusminus">'
        n +='<button type="button" class="minus">-</button>'
        n +='<input name="" type="text" class="val" value="1">'
        n +='<button type="button" class="plus">+</button>'
        n +='</div>'
        n +='<button type="button" class="pro_cart"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
        n +='</div>'
        n +='</div>'
        <!--pro_col-->

         <!--pro_col-->
        n +='<div class="pro_col">'
        n +='<div class="pro_image"><a href="images/bot11.png" data-imagelightbox="f"><img src="<?=$module_image_link?>/images/bot1.png" alt="Snail"></a></div>'
        n +='<div class="protext_dv"><h5>BORGA CHARDONNAY</h5><p>75CL</p></div>'
        n +='<div class="probottom_dv">'
        n +='<div class="pro_rupe">€ 9.5</div>'
        n +='<div class="pro_plusminus">'
        n +='<button type="button" class="minus">-</button>'
        n +='<input name="" type="text" class="val" value="1">'
        n +='<button type="button" class="plus">+</button>'
        n +='</div>'
        n +='<button type="button" class="pro_cart"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
        n +='</div>'
        n +='</div>'
        <!--pro_col-->

         <!--pro_col-->
        n +='<div class="pro_col">'
        n +='<div class="pro_image"><a href="images/bot11.png" data-imagelightbox="f"><img src="<?=$module_image_link?>/images/bot1.png" alt="Snail"></a></div>'
        n +='<div class="protext_dv"><h5>BORGA CHARDONNAY</h5><p>75CL</p></div>'
        n +='<div class="probottom_dv">'
        n +='<div class="pro_rupe">€ 9.5</div>'
        n +='<div class="pro_plusminus">'
        n +='<button type="button" class="minus">-</button>'
        n +='<input name="" type="text" class="val" value="1">'
        n +='<button type="button" class="plus">+</button>'
        n +='</div>'
        n +='<button type="button" class="pro_cart"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
        n +='</div>'
        n +='</div>'
        <!--pro_col-->

        n +='</div>'
        <!--pro_row end-->



        <!--paginatopnarea-->
        n +='<div class="paginatopnarea">'     
        n +='<nav>'
        n +='<ul class="pagination">'
        n +='<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'
        n +='<li class="active"><a href="#">1</a></li>'
        n +='<li><a href="#">2</a></li>'
        n +='<li><a href="#">3</a></li>'
        n +='<li><a href="#">4</a></li>'
        n +='<li><a href="#">5</a></li>'
        n +='<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>'
        n +='</ul>'
        n +='</nav>'    
        n +='</div>'
        <!--paginatopnarea-->


        n +='</div>'    
        n +='</div>'    
        <!--product-area --> 



        <!-- New Design -->

        document.getElementById("shoppingbox").innerHTML = n;

        $.post("panel/lib/front-main.php", "f=allMenu&id=" + Shopping.Business[u].id, function (e) {
            Shopping.catalogMenu(e);
        });

	    /*$.post("panel/lib/front-main.php", "f=FetchAllGalleryImg&bid="+Shopping.Business[u].id, function (b) {

		   Shopping.Photogallery(b);


       })*/
	    /*$.post("panel/lib/front-main.php", "f=FetchAllGalleryVideo&bid="+Shopping.Business[u].id, function (b) {


		   Shopping.videogallery(b);


       })
	    $.post("panel/lib/front-main.php", "f=FetchDiscountOffer&bid="+Shopping.Business[u].id, function (b) {

		 Shopping.FuncOffer(b);


       })*/


			/************************************************************************************************************************************/
		var schr = "";
		
       document.getElementById("src_bx").innerHTML = schr;
	   /* $.post("panel/lib/front-main.php", "f=allreviewDate&id=" + Shopping.Business[u].id, function (e) {
            Shopping.allreview = JSON.parse(e);
			if (e != "") {
               Shopping.reviewprint(JSON.parse(e))
            } else {
                alert("<?= $lang_resource['ERROR_V21'] ?>")
            }
        })*/




		/* **********************************************Resturant Menu page Banner ********************************************************* */



		$("#showcanvas").removeClass("inner-map");

		$("#showcanvas").removeAttr('style');
		document.getElementById("showcanvas").innerHTML = ban;

        $(document).ready(function() {
            $('.more').click(function() {
                $('.menu_dropdown').slideToggle("fast");
            }); 
            $('.menu_dropdown').click(function(event){
                console.log('click - form');
                event.stopPropagation();
            });

            $('.fil').click(function() {
                $('.filter_dropdown').slideToggle("fast");
            }); 
            $('.filter_dropdown').click(function(event){
                console.log('click - form');
                event.stopPropagation();
            });     
        });

		$(".rest-body").removeClass('rest-body');
		/* **********************************************Resturant Menu page Banner ********************************************************* */


	  //document.getElementById("src_bx").style.display = "none";
		document.getElementById("src_bxNew").style.display = "none";
        document.getElementById("shoppingbox").innerHTML = n;
	   // Ads.Init("shopmenuadscontainer", Main.WhereAmIData.city);
       /* document.getElementById("categoriesbox").innerHTML = t;*/
        document.getElementById("right").style.display = "none";


		


		if(Main.NullToEmpty(myParam) !="")
		{
			Shopping.skiptab(3);
		}

        document.getElementById("dishsearch").onkeyup = function ()
        {

            RestMenuList.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
        };

		 var qn = 0;



        for (var f in Shopping.Cart.business){
            for (var e in Shopping.Cart.business[f].dishes){
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
            }
        }

        if(Shopping.Cart.business) {
            $("#itemCount").html('You have <span> '+qn+' items</span>');
        }
        else {
            $("#orderprice").html("0.00");
            $("#cart_taxid").html("");
            $("#itemCount").html('You have <span> 0 items</span>');
        }
       
        this.ReturnBtnAction = this.PrintBusinessList;
        RestMenuList.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
    },
	 PopulateDishesList: function (E, z)
    {

        if (z)
        {
			E='catname';

			/*Organize menu items by a-z (02-08-2014)*/
           Shopping.Menu.dishes.sort(Main.SortByProperty('name'));
		   Shopping.Menu.dishes.sort(Main.SortByProperty(E));
		   /*Organize menu items by a-z (02-08-2014)*/

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
        var r = '';//<div id="dishesresultsinner" class="plc_dtl">';
        var C = "";
		var n = "";
        var D;
        for (v in A){

            if (A[v].isimg==1){
                C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/1/panel.jpg?c=" + Main.Random ;
            }else if (A[v].isimg==2){
                C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/2/panel.jpg?c=" + Main.Random;
            }else if (A[v].isimg==3){
                C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/3/panel.jpg?c=" + Main.Random;
            }else{
                C = "panel/images/dummy/small_business.jpg');";
            }

            if (A[v].description){
                D = A[v].description.replace('"', "'").replace(/(\r\n|\n|\r)/gm,"");
            }else{
                D = ""
            }

            <!--pro_col-->
            r +='<div class="pro_col">'
            r +='<div class="pro_image"><a href="#" ><img src="'+C+'" alt="Snail"></a></div>'
            r +='<div class="protext_dv"><h5>'+A[v].name.toUpperCase()+'</h5><p>'+D+'</p></div>'
            r +='<div class="probottom_dv">'
            r +='<div class="pro_rupe" id="dish_' + A[v].id + '_price"> '+Shopping.FormatPrice(A[v].price)+'</div>'
            r +='<div class="pro_plusminus">'
            r +='<button type="button" class="minus" onclick="RestMenuList.DecQuantity('+A[v].id+')">-</button>'
            r +='<input name="" type="text" class="val" value="1" id="quantity_value'+A[v].id+'">'
            r +='<button type="button" class="plus" onclick="RestMenuList.IncreQuantity('+A[v].id+')">+</button>'
            r +='</div>'
            r +='<button type="button" class="pro_cart" onclick="RestMenuList.AddtoCart_pre(this,' + A[v].id + ','+A[v].price+')"><img src="<?=$module_image_link?>/images/procart.png" alt=""></button>'
            r +='</div>'
            r +='</div>'
            <!--pro_col-->
        }
        


	var n = "";
	if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){


			 n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			  if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;">'+Shopping.Cart.business[0].dishes[i].options+'</a></span>';
				}
			 n +='</td>';
             n +='<td width="30%" id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/remove-icon.png"></a></td>';
			 n +='</tr>';

    
		}
	}
        //r += "</div>";
        document.getElementById("dishesresults").innerHTML = r;
        document.getElementById("plc_rgt_in").innerHTML = n;

		Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();


        var s;
        var y;
        var t;
        var w;

     tip.update();
     Shopping.UpdateCartTotals();
    },
    DecQuantity: function(val){
        var qtyval = document.getElementById("quantity_value"+val).value;
        if(qtyval - 1 == 0){
            alert("Sorry! Minimum Quantity must be 1");
        }else{
            qtyval--;
        }
        document.getElementById("quantity_value"+val).value = qtyval;
    },
    IncreQuantity: function(val){
        var qtyval = document.getElementById("quantity_value"+val).value;
        qtyval++;
        document.getElementById("quantity_value"+val).value = qtyval;
    },
    AddtoCart_pre: function(cart,id,price){
        var qtyval = document.getElementById("quantity_value"+id).value;
        total_price = parseFloat(price)*parseInt(qtyval);
        Shopping.AddToCart(cart, id,'','','',total_price,qtyval)
    },
    MenuCartlist : function (i){
    var currency = main.car;
        
        var  n ='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
             
             
             
            
             if(Shopping.Cart.business[0].dishes[i].nofperson) {
             n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;text-decoration:none;"><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> : '+Shopping.Cart.business[0].dishes[i].nofperson+'</a></span>';
             }
             
             
              if(Shopping.Cart.business[0].dishes[i].options) {
             n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;">'+ ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</a></span>';
             
             
             
             
                }
              if(Shopping.Cart.business[0].dishes[i].comments) {
             n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';   
              } 
              
             n +='</td>';
             n +='<td width="30%" >'+currency+'<span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPriceNotFree(Shopping.Cart.business[0].dishes[i].total)+'</span></td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
             n +='</tr>';
             
    return n;        
        
        },
};
