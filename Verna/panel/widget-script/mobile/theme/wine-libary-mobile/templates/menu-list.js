var RestMenuList = {	
	Main: function(){
		$("#shoppingbox").removeClass("main");		
		Main.MenulistEnter = true;
		$(window).scrollTop(180)
		$(".showhidebottom").hide()
		$(".map-pannel").hide();
		var myParam = location.search.split('order=');
		Main.stepBack  = 3;	

		if(Main.confirmOrder && Main.confirmOrder  == true) {
			Main.confirmOrder = false;
			var shs = Blist.ShoppingHeaderDesignNavigationHtml();
			var sch = Blist.ShoppingHeaderBusinessSearchHtml();
			document.getElementById("left").innerHTML = '<div class="cntnr_div_whle"><div class="cntnr_div"><div id="headerSearch">'+sch+'</div></div><div class="rest-body"><div id="shoppingbox" ></div></div></div>';
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


		Shopping.MenuCategories = new Array();
		
	 	for (var x in Shopping.Business){
	 		if(RestMenuList.businessid == Shopping.Business[x].id || RestMenuList.businessid == 0){	 		
		 		Shopping.Menu1 = Shopping.BusinessDetails[Shopping.Business[x].id]
	        	var r1 = false;
				for (var q in Shopping.Menu1.dishes){
					if (Shopping.MenuCategories.length > 0){
						r1 = false;
						for (var s1 in Shopping.MenuCategories){
							if (Shopping.MenuCategories[s1].id == Shopping.Menu1.dishes[q].category){
								r1 = true
							}
						}
						if (!r1 && Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", Shopping.Menu1.dishes[q].category, "id") != ""){
							Shopping.MenuCategories.push({
								id: Shopping.Menu1.dishes[q].category,
								name: Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", Shopping.Menu1.dishes[q].category, "name"),
								rank: Shopping.Menu1.dishes[q].rank_cat,
								enabled: true
							})
						}
					}else{
						if (Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", Shopping.Menu1.dishes[q].category,"id") != ""){
							Shopping.MenuCategories.push({
								id: Shopping.Menu1.dishes[q].category,
								name: Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", Shopping.Menu1.dishes[q].category, "name"),
								rank: Shopping.Menu1.dishes[q].rank_cat,
								enabled: true
							})
						}
					}
					Shopping.Menu1.dishes[q].selectedExtras = new Object()
				}
			}
		}

		

      	$("#showcanvas").removeClass("inner-map");
		$("#showcanvas").removeAttr('style');
	
       	RestMenuList.CommonproductBody();
		
		
		$(document).ready(function() {
     $('.more').click(function() {
                $('.menu_dropdown').slideToggle("fast");
        });	
     $('.menu_dropdown').click(function(event){
       console.log('click - form');
       event.stopPropagation();
     });
	 
	$('.fil').click(function() {
                $('.filter_dv').slideToggle("fast");
        });	
     $('.filter_dv').click(function(event){
       console.log('click - form');
       event.stopPropagation();
     });	 
   });
		

		$(".rest-body").removeClass('rest-body');

		$(function() {
			$( "#slider-range" ).slider({
				range: true,
				min: 0,
				max: 500,
				step: 1,
				values: [ 0, 500 ],
				slide: function( event, ui ) {
					$( "#amount_left" ).val(ui.values[ 0 ]);
					$( "#amount_right" ).val(ui.values[ 1 ] );
					RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
				}

			});
			$( "#amount_left" ).val( $( "#slider-range" ).slider( "values", 0 ));
			$( "#amount_right" ).val($( "#slider-range" ).slider( "values", 1 ) );

			$("input.sliderValue").change(function() {
			    var $this = $(this);
			    $("#slider-range").slider("values", $this.data("index"), $this.val());
			    RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
			});
			
		});

	




		Shopping.counter_dish = 0;
	

		document.getElementById("src_bxNew").style.display = "none";
        document.getElementById("right").style.display = "none";

        
        document.getElementById("dishsearch").onkeyup = function (){
            RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
        };
        RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)



	},
	PopulateDishesList: function(currency,E, z,subchk){
		
		$("#product_details_page").empty();
		$("#product_details_page").hide();		
		$("#product_list_item").show();
		$("#dishesresults").show();
		Main.SubCats = new Array();	
		//var AllBusiMenuArr = new Array();	
		 var A = new Array();	
		var product_count = 0;
		var countll = 0;	
		var pids = 1;
		if(Main.RedirectToBusiness) {
		Shopping.UpdateCartUserInfo();
		}
		var r = '<div id="dishesresultsinner" class="category_products">';
		if(Main.delord == true){			
	       	Shopping.Business.sort(RestMenuList.sortByBusiness('deliverytime',true))
	    }else{
	       	Shopping.Business.sort(RestMenuList.sortByBusiness('deliverytime'))
	    }
		
		for (var x in Shopping.Business){
			Shopping.Menu2 = Shopping.BusinessDetails[Shopping.Business[x].id]			 		
	 		//Filter Dishes With Menu Categories	 	
			
	 		if (z){
				E='catname';         
				
			   Shopping.Menu2.dishes.sort(Main.SortByProperty(E));
			  // Shopping.Menu2.dishes =  ShoppingCustom.AscendingByName();
				
				if (Shopping.Config.Dishes.List.SortByStatus == "max"){
					Shopping.Menu2.dishes.reverse()
				}
	        }else{
	            if (Shopping.Config.Dishes.List.SortBy != E){
	                Shopping.Menu2.dishes.sort(Main.SortByProperty(E));
	                Shopping.Config.Dishes.List.SortByStatus = "min"
	            }else{
	                Shopping.Menu2.dishes.reverse();
	                if (Shopping.Config.Dishes.List.SortByStatus == "min"){
	                    Shopping.Config.Dishes.List.SortByStatus = "max"
	                }else{
	                    Shopping.Config.Dishes.List.SortByStatus = "min"
	                }
	            }
	        }
	    
	        Shopping.Config.Dishes.List.SortBy = E;
	        currency = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.Business[x].id, "currency");
	         
	       
			       
	        for (var v in Shopping.Menu2.dishes){
				Shopping.Menu2.dishes[v].business = Shopping.Business[x].id
	            B = false;
	            for (var xx in Shopping.MenuSubLists){
	                if (Shopping.Menu2.dishes[v].category == Shopping.MenuSubLists[xx].id){
	                    if (Shopping.MenuSubLists[xx].enabled){
	                        B = true
	                    }
	                }
	            }
	            if (B){
	                var u = document.getElementById("dishsearch").value.toLowerCase();
	                if (Shopping.Menu2.dishes[v].name.toLowerCase().indexOf(u) >= 0){
						
						
				var findex = Main.GetIndexOnPropertyValueFound(Shopping.MenuSubLists, "id", Shopping.Menu2.dishes[v].category);
			    var subfindex = Main.GetIndexOnPropertyValueFound(Shopping.MenuSubLists[findex].subcategory, "id", Shopping.Menu2.dishes[v].subcategory);
				//alert(Shopping.Menu2.dishes[v].name+"/"+Shopping.Menu2.dishes[v].category+"/"+Shopping.Menu2.dishes[v].subcategory);
						
			 if(subfindex != -1)  {
			var	subObj = new Object();
				subObj.id=Shopping.MenuSubLists[findex].subcategory[subfindex].id;
				subObj.subcatname=Shopping.MenuSubLists[findex].subcategory[subfindex].name;
				subObj.catid =Shopping.MenuSubLists[findex].id;
				subObj.product =Shopping.Menu2.dishes[v].id;
				
				//alert(Main.GetIndexOnPropertyValueFound(Main.SubCats, "id", Shopping.MenuSubLists[findex].subcategory[subfindex].id))
				if(Main.GetIndexOnPropertyValueFound(Main.SubCats, "id", Shopping.MenuSubLists[findex].subcategory[subfindex].id) == -1) {
					
				
				Main.SubCats.push(subObj)
				}
				
				
				if(Shopping.MenuSubLists[findex].subcategory[subfindex].enabled) {
					
					if(RestMenuList.businessid == Shopping.Business[x].id || RestMenuList.businessid == 0){
	                    A.push(Shopping.Menu2.dishes[v])
					}
				}
			 }
	                }else{
	                    if (Main.GetPropertyValueOnPropertyValueFound(Shopping.MenuSubLists, "id", Shopping.Menu2.dishes[v].category, "name").toLowerCase().indexOf(u) >= 0)
	                    {
					/*var findex = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Shopping.Menu2.dishes[v].category);
			    var subfindex = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom[findex].subcategory, "id", Shopping.Menu2.dishes[v].subcategory);
						
			   alert(JSON.stringify(Shopping.CategoriesCustom[findex].subcategory[subfindex].name))
			      alert("XX")*/
	                        A.push(Shopping.Menu2.dishes[v]);
	                        break
	                    }
	                }
	            }
	        }

	       // alert(JSON.stringify(A))

	        if(Main.PriceLow == true){
	    		A.sort(RestMenuList.sortByMenuDish('price',true))
	    	}else if(Main.PriceHigh == true){
	    		A.sort(RestMenuList.sortByMenuDish('price'))
	    	}
	       	 
	       	if(Main.NameAsc == true){
	       		A.sort(RestMenuList.sortByMenuDish('name'))
	       	}else if(Main.NameDesc == true){
	       		A.sort(RestMenuList.sortByMenuDish('name',true))
	       	}
			
				//AllBusiMenuArr.push(A);
			

		
	        		
	        
	        var C = "";
			var n = "";
	        var D;
			var EmptyChk = false;
			
			
			
			if(Shopping.Business.length == pids){
			/*	alert(JSON.stringify(Main.SubCats))
				alert(Shopping.Business[x].id)
				alert(A.length)*/
			
				A.sort(Main.SortByProperty("catname"));
			
				
				for (v in A){	
				
				
					if(v!=0)
					{
					if(A[v].catname != A[v-1].catname)
					{
					
						r +='<h3 class="category_heading">'+ A[v].catname.toUpperCase() +'</h3>'
					
					
					}
					}
					
					if(v == 0)
					{
						r +='<h3 class="category_heading">'+ A[v].catname.toUpperCase() +'</h3>'
					
					}
				
				

					if(parseInt(A[v].price) >= parseInt(document.getElementById("amount_left").value) && parseInt(A[v].price) <= parseInt(document.getElementById("amount_right").value)){
						Shopping.counter_dish ++;
						product_count++;
						if (A[v].isimg==1){
			                C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/1/panel.jpg?c=" + Main.Random ;
			            }else if (A[v].isimg==2){
			                C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/2/panel.jpg?c=" + Main.Random;
			            }else if (A[v].isimg==3){
			                C = "panel/images/dishes/" + Main.NullToEmpty(A[v].id) + "/3/panel.jpg?c=" + Main.Random;
			            }else{
			                C = "panel/wine-libery/desktop/theme/demo-theme-wine-responsive/assets/images/dummy/demobottle4.png";
			            }

			            if (A[v].description){
			                D = A[v].description.replace('"', "'").replace(/(\r\n|\n|\r)/gm,"");
			            }else{
			                D = ""
			            }

			            <!--pro_col-->
						r +='<li>'						
						r +='<div class="product_photo"><a href="javascript:RestMenuList.ProductDetailsPage('+v+','+countll+','+A[v].business+','+A[v].id+')" ><img src="'+C+'"></a></div>'<!--product_photo-->
						r +='<div class="product_name"><h2>'+A[v].name.toUpperCase()+'</h2></div>'<!--product_name-->
						r +='<input name="" type="hidden" class="val" value="1" id="quantity_value'+A[v].id+'">'	
						r +='<div class="product_price" id="dish_' + A[v].id + '_price"><a href="#" name="'+A[v].business+'" onclick="RestMenuList.AddtoCart_pre(this,' + A[v].id + ','+A[v].price+',\''+currency+'\','+countll+','+A[v].business+')"><span>'+currency+A[v].price+'</span> <i class="icon-plus2"></i></a></div>'<!--product_price-->
						r +='</li>'
					
					}
											           
		        }	        
		        countll++;
			}
			pids++
		}



		r += '</div>'
		
		$("#product_count").empty().append(product_count);
			
		if(product_count == 0 && RestMenuList.firststep == 0){
			
			Shopping.NoResturant();
			return false;
		}else{
			RestMenuList.firststep = 1;
		}

		$("#dishesresults").empty().append(r)
		$(document).ready(function () {
            $("div.paginatopnarea").jPages({
                containerID: "dishesresultsinner",
                perPage: 9,
                keyBrowse: true,
                scrollBrowse: false,
            });
            $("button").click(function () {
                /* get given page */
                var page = parseInt($("input").val());
                /* jump to that page */
                $("div.paginatopnarea").jPages(page);
            });          
        });
		
        
		if(Main.SubCats && !subchk) {
			var store_subcats = new Array();
			var GroupSubCatArray = new Array();
			
			var ban = '';

						
			for(var isub in Main.SubCats)	{
				
				if(!MainCustom.in_array(Main.SubCats[isub].subcatname,store_subcats)) {
					
				Main.SubCats[isub].sids =Main.SubCats[isub].id;
				Main.SubCats[isub].catids =Main.SubCats[isub].catid;
				GroupSubCatArray.push(Main.SubCats[isub])
				store_subcats.push(Main.SubCats[isub].subcatname);
				}
				else {
					//alert("2")
					//alert(JSON.stringify(GroupSubCatArray))
				
					var indx = Main.GetIndexOnPropertyValueFound(GroupSubCatArray, "subcatname", Main.SubCats[isub].subcatname)
					//alert(indx)
					GroupSubCatArray[indx].sids = GroupSubCatArray[indx].sids+","+Main.SubCats[isub].id;
					GroupSubCatArray[indx].catids =GroupSubCatArray[indx].catids+","+Main.SubCats[isub].catid;
					
					}
			}
			
			
			
			for(var isubs in GroupSubCatArray)	{
			
			
				ban +='<span><input id="'+GroupSubCatArray[isubs].id+'" alt="'+GroupSubCatArray[isubs].sids+'" min="'+GroupSubCatArray[isubs].catids+'" class="nc" type="checkbox" name="'+GroupSubCatArray[isubs].subcatname+'" onclick="MainCustom.subchangecatclass(this,'+GroupSubCatArray[isubs].catid+')"><label for="'+GroupSubCatArray[isubs].id+'" >'+GroupSubCatArray[isubs].subcatname+'</label></span>';
				
				
			}
			
			
			
			
			
			document.getElementById("filterSubCats").innerHTML = ban;
		}
	},

	Pagination: function(){
		
		
		$("div.holder").jPages({
                containerID: "dishesresults",
                perPage: 9,
                keyBrowse: true,
                scrollBrowse: true,
                animation: "bounceInUp",
                
            });
            $("button").click(function () {
                /* get given page */
                var page = parseInt($("input").val());
                /* jump to that page */
                $("div.holder").jPages(page);
            });

            $("select#Itemsperpage").change(function () {
                /* get new no of items per page */
                var newPerPage = parseInt($(this).val());
                /* destroy jPages and initiate plugin again */
                $("div.holder").jPages("destroy").jPages({
                    containerID: "dishesresults",
                    perPage: newPerPage,
                    keyBrowse: true,
                    scrollBrowse: true,
                   
                });
            });
            $("select#Animation").change(function () {
                /* get new css animation */
                var newAnimation = $(this).val();
                /* destroy jPages and initiate plugin again */
                $("div.holder").jPages("destroy").jPages({
                    containerID: "dishesresults",
                    animation: newAnimation,
                    keyBrowse: true,
                    scrollBrowse: true,
                    
                });
            });
        },
		
	PopulateCart: function (){
		
       
	   var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness); 
	   var currency = Shopping.Business[u].currency;	
	   Main.car = currency;
        var l = "";
	var p = "";
        for (i in Shopping.Cart.business)
        {
            Shopping.Cart.business[i].dishes.sort(Main.SortByProperty("name"));
            BgStyle = "background-image:url('panel/images/business/" + Main.NullToEmpty(Shopping.Cart.business[i].id) + "/mini.jpg?c=" + Main.Random + "');";
		   p += '<div class="row">';
            //p += '<div class="businesslogo"><div class="img" style="' + BgStyle + '"></div></div>';
            //p += '<div class="titlecell"><span class="caption nonselectable default">' + Shopping.Cart.business[i].name.toUpperCase() + "</span></div>";
	    // document.getElementById("restrnme").innerHTML = '<span class="caption nonselectable default">' + Shopping.Cart.business[i].name.toUpperCase() + "</span>";
		 
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
			for (j in Shopping.Cart.business[i].dishes){
				g +='<tr>'
				g +='<td width="85%" align="left" valign="top">' + Shopping.Cart.business[i].dishes[j].name.toUpperCase()
				if(Shopping.Cart.business[i].dishes[i].nofperson) {
				g +='<p><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> : '+ Shopping.Cart.business[0].dishes[i].nofperson+'</p>' 
				}
				if(Shopping.Cart.business[i].dishes[i].options){
				g +='<p>'+ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</p>' 	
				}
				g +='</td>'
				g +='<td width="15%" align="left" valign="top"><span id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price">' + MainCustom.FormatPrice(Shopping.Cart.business[i].dishes[j].total,Main.car) + '</span> </td>'
				g +='</tr>'			
			}
		
			if (parseFloat(Shopping.Cart.business[i].shipping) > 0){
				h = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}else{
				h = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}

				g +='<tr>'
				g +='<td width="85%" align="left" valign="top">' + h +' </td>'
				var ship_txt = Shopping.Cart.business[i].shipping;
				if(ship_txt==0){
				var ship_free = '<?=$lang_resource['SHOPPING_SECOND_FREE']?>';	
					g +='<td width="15%" align="left" valign="top" id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price"><span >' +ship_free + '</span></td>'
				}else{
					g +='<td width="15%" align="left" valign="top" id="dish_' + j + "_" + Shopping.Cart.business[i].dishes[j].id + '_price"><span >' +MainCustom.FormatPrice(Shopping.Cart.business[i].shipping,Main.car) + '</span> </td>'
				}
				g +='</tr>'


				g +='<tr id="discount_div" style="display:none">'
				g +='<td width="85%" align="left" valign="top" id="discount_text"></td>'
				g +='<td width="15%" align="left" valign="top"><span>'+Main.car+'<span  id="discount_price"></span> </span></td>'
				g +='</tr>'

				g +='<tr>'
				if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
					Shopping.Cart.servicefee =0;
				}
				g +='<td width="85%" align="left" valign="top" ><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee +'%)</td>'
				g +='<td width="15%" align="left" valign="top"><span>'+Main.car+'<span id="cart_servicefeeid">0.00</span></span></td>'
				g +='</tr>'


				g +='<tr>'
				g +='<td width="85%" align="left" valign="top" ><?= $lang_resource['Tax_V2'] ?> ('+Shopping.Cart.buyer.tax +'%)'
				if(Shopping.Cart.buyer.taxtype == 1) 
				g += '<p class="food-dsp food-tax"><?= $lang_resource['Tax_not_included_V2'] ?></p>';
				else if(Shopping.Cart.buyer.taxtype == 2) 
				g += '<p class="food-dsp food-tax"><?= $lang_resource['Tax_included_V2'] ?></p>';
				g += '</td>';
				g +='<td width="15%" align="left" valign="top"><span>'+Main.car+'<span  id="cart_taxid">' + Shopping.Cart.business[0].tax +'</span></span></td>'
				g +='</tr>'


				g +='<tr id="cart_tips_block" style="display:none">'				
				g +='<td width="85%" align="left" valign="top" ><?= $lang_resource['TRACKORDER_TIPS'] ?></td>'
				g +='<td width="15%" align="left" valign="top"><span>'+Main.car+'<span  id="cart_tips">' + parseFloat(Shopping.Cart.buyer.tips).toFixed(2)  +'</span></span></td>'
				g +='</tr>'

			/*		tax section */
		
        }
        document.getElementById("cartresultsinner").innerHTML = g;
		 Shopping.UpdateTotals()

	
       
    },
	
	MenuCartlist : function (i){
		
		var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness); 
		
		$(".cartno").empty().append(Shopping.Cart.business[0].dishes.length)
		var currency = Shopping.Business[u].currency;		
		var  n =''
		id = Shopping.Cart.business[0].dishes[i].id;
		
		var C=""
		var isimgs = Main.GetPropertyValueOnPropertyValueFound(Shopping.Menu.dishes, "id", id, "isimg")
		
		if(isimgs == 1){
			C = "panel/images/dishes/" + Main.NullToEmpty(id) + "/1/panel.jpg?c=" + Main.Random ;
		}else if(isimgs == 2){
			 C = "panel/images/dishes/" + Main.NullToEmpty(id) + "/2/panel.jpg?c=" + Main.Random;
		}else if(isimgs == 3){
			C = "panel/images/dishes/" + Main.NullToEmpty(id) + "/3/panel.jpg?c=" + Main.Random;
		}else{
            C = "panel/wine-libery/desktop/theme/demo-theme-wine-responsive/assets/images/dummy/demobottle4.png";
		}
		n +='<div class="cartpro_images">'
		n +='<img src="'+C+'">'
		n +='</div>'<!--cartpro_images-->
		n +='<div class="cartpro_row_name"><h3>'+Shopping.Cart.business[0].dishes[i].name.toUpperCase()+'</h3>'
		if(Shopping.Cart.business[0].dishes[i].nofperson) {
		n +='<p><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> : '+ Shopping.Cart.business[0].dishes[i].nofperson+'</p></a>'
		}
		
		if(Shopping.Cart.business[0].dishes[i].options) {
		n +='<a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')" ><p>'+ ProductOption.Margeslash(Shopping.Cart.business[0].dishes[i].options)+'</p></a>'
		}
		n +='</div>'<!--cartpro_row_name-->
		n +='<div class="cartpro_row_price"><span>'+currency+'<span>'+Shopping.Cart.business[0].dishes[i].price+'</span></span></div>'<!--cartpro_row_price-->
		
		n +='<div class="cartproselect">'
		n +='<span class="">'
		n +='<select class="selectdropdownselect" onchange="RestMenuList.UpdateCart(this,'+i+')">'
			for(var j=1; j<=(parseInt(Shopping.Cart.business[0].dishes[i].quantity)+10);j++){
				if(j == Shopping.Cart.business[0].dishes[i].quantity){
					n +='<option selected="selected" value="'+j+'">'+j+'</option>'
				}else{
					n +='<option value="'+j+'">'+j+'</option>'
				}
			}
		n +='</select></span>'
n +='</div>'<!--cartproselect-->
		n +='<div class="cartpro_row_pricet" >'+currency+' <span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPriceNotFree(Shopping.Cart.business[0].dishes[i].total)+'</span></div>'
		n +='<div class="cartpro_row_delet"><a href="javascript:RestMenuList.DeleteCart('+i+')"><?= $lang_resource['MENU_LIST_DELETE_ITEM'] ?></a></div>'
		n +='<div class="cartpro_hd2"> </div>'
		n +='</div>'<!--cartpro-->
		n +='</div>'<!--cartpro_box-->
		<!--cartpro_row end-->

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
	k +='<input type="hidden" id="business" name="business" value="'+Shopping.Rid+'">'
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
	 } else { alert("Your browser doesn't support to File API") }
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
						   alert('<?= $lang_resource['FRONT_PHOTO_THANK_YOU_RATING'] ?>');
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
	r += '<button type="button" class="addcart" onclick="RestMenuList.SaveReviewData()"><?= $lang_resource['save_V2'] ?></button>';
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
			var id_w_business = Shopping.Rid;
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
DecQuantity: function(val){
        var qtyval = document.getElementById("quantity_value"+val).value;
        if(qtyval - 1 == 0){
            alert("<?=$lang_resource['MINIMUM_QUANTITY_MUST_BE_ONE']?>");
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
    AddtoCart_pre_select: function(cart,id,price,currency,count,bi){

    	var s = Shopping.Business[count]; 		
		//alert(s.id)
		
    	if(Shopping.ActiveBusiness){
    		if(Shopping.ActiveBusiness == bi){
    			
	    		var qtyval = document.getElementById("quantity_value_select"+id).value;
	    		total_price = parseFloat(price)
	    		MainCustom.add_product_options_db(cart, id,'','','',total_price,qtyval)
	    	}else{
	    		alert("<?=$lang_resource['CHOOSE_DISH_FROM_SAME_BUSINESS']?>");
	    		RestMenuList.businessid = Shopping.ActiveBusiness;
	    		RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
	    	}
    	}else{
    		Shopping.ActiveBusinesscurrency = currency;
    		Main.car = currency;
    		Shopping.Menu = Shopping.BusinessDetails[s.id]
    		Shopping.ActiveBusiness = s.id;
    		var d = Shopping.ActiveBusiness;
    		Shopping.ActiveBusinessName = s.name;
    		Shopping.UpdateCartUserInfo(Shopping.ActiveBusiness);
    		var qtyval = document.getElementById("quantity_value_select"+id).value;
    		total_price = parseFloat(price)
    		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"},{"operation":"timescdule","businessid":' + d + '},{"operation":"pickupDeliverytime","businessid":' + d + '},{"operation":"DiscountOffer","businessid":' + d + "}]", function (a){
			
	       		a = JSON.parse(a);
	       		Shopping.offer = a.offer;
				Shopping.DeliveryDateschedule = a.times;
				if(Shopping.offer.length == 1){
					Shopping.Cart.discountcategory = "discountoffer";
					Shopping.Cart.discounttype = a.offer[0].type;
					Shopping.Cart.discountrate = a.offer[0].rate;
					Shopping.Cart.discountminshop = a.offer[0].minshop;
				}
				Main.DeliveryTimezone = a.timescdule;
				Main.Franchises = a.franchises;

				MainCustom.add_product_options_db(cart, id,'','','',total_price,qtyval)   
						
	        });    		
    	}
    	RestMenuList.CartDetails(); 	
	
    },
    AddtoCart_pre: function(cart,id,price,currency,count,bi){
		var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", cart.name);
		count = u;
    	var s = Shopping.Business[count]; 
    	if(Shopping.ActiveBusiness){
    		//if(Shopping.Cart.business && Shopping.Cart.business[0].id  == s.id){
    			//alert(document.getElementById("quantity_value"+id).value)
				if(Shopping.ActiveBusiness == bi){
	    		var qtyval = document.getElementById("quantity_value"+id).value;
	    		total_price = parseFloat(price)
	    		MainCustom.add_product_options_db(cart, id,'','','',total_price,qtyval)
	    	}else{
	    		alert("<?=$lang_resource['CHOOSE_DISH_FROM_SAME_BUSINESS']?>");
	    		RestMenuList.businessid = Shopping.ActiveBusiness;
	    		RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
	    	}
    	}else{
	
    		Shopping.ActiveBusinesscurrency = currency;
    		Main.car = currency;
    		Shopping.Menu = Shopping.BusinessDetails[s.id]
    		Shopping.ActiveBusiness = s.id;
    		var d = Shopping.ActiveBusiness;
    		Shopping.ActiveBusinessName = s.name;
    		Shopping.UpdateCartUserInfo(Shopping.ActiveBusiness);
    		var qtyval = document.getElementById("quantity_value"+id).value;
    		total_price = parseFloat(price)
    		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"},{"operation":"timescdule","businessid":' + d + '},{"operation":"pickupDeliverytime","businessid":' + d + '},{"operation":"DiscountOffer","businessid":' + d + "}]", function (a){
			
	       		a = JSON.parse(a);
	       		Shopping.offer = a.offer;
				Shopping.DeliveryDateschedule = a.times;
				if(Shopping.offer.length == 1){
					Shopping.Cart.discountcategory = "discountoffer";
					Shopping.Cart.discounttype = a.offer[0].type;
					Shopping.Cart.discountrate = a.offer[0].rate;
					Shopping.Cart.discountminshop = a.offer[0].minshop;
				}
				Main.DeliveryTimezone = a.timescdule;
				Main.Franchises = a.franchises;

				MainCustom.add_product_options_db(cart, id,'','','',total_price,qtyval)    			
	        }); 
			RestMenuList.CartDetails();   		
    	}
    	
	
    },
    OpenCartCheck: function(){
	
		if(Shopping.Cart && Shopping.Cart.business[0]){
			
			if (Shopping.Cart.business[0].dishes.length == 0){
				alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
				return
			}else{
				RestMenuList.CommonproductBody();
				RestMenuList.businessid = Shopping.ActiveBusiness
				if(!document.getElementById("plc_rgt_in"))
				RestMenuList.CartDetails();
				
				var n1='';
				if(Shopping.Cart.business[0]){
					if(Shopping.Cart.business[0].dishes){
						if (Shopping.Cart.business[0].dishes.length != 0) {
							for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){
								n1 += RestMenuList.MenuCartlist(i)
							}
						}else{
							$(".cartno").empty().append(0)
						}
					}
				}
				if(!MainCustom.in_array("102",countEStep)) {
					countEStep.push("102");
				}
				window.history.pushState( {"id":102} , "cartlist", "Cart-summary " );
				
				$("#plc_rgt_in").empty().append(n1);
				$("#product_list_item").hide();
				$("#product_details_page").hide();
				$("#cart_details_product").show();	
				
			}
		}else{
			alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
				return
		}
    	
    },
    OpenCheckout: function(){    	
    	if (Shopping.Cart.business[0].dishes.length == 0){
			alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
			return
		}else{

			Shopping.Cart.buyer.address = Main.WhereAmIData.address;
			Shopping.OpenCartCheck();		
		}
    },
    CartDetails: function(){
    	var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness); 
  	   Shopping.ActiveBusinessName = Shopping.Business[u].name;
	
	$("#headershow").hide();
	var bd = "";
		bd +='<div class="inner_body">'		
		bd +='<div class="inner_header">'
		bd +='<div class="header_left">'
		bd +='<button type="button" class="header_back_btn" onclick="RestMenuList.BackTOList()"><i class="icon-arrow-left10"></i> Back</button>'
		bd +='</div>'<!--header_left-->
		bd +='<div class="header_middle">'
		bd +='<div class="header_logo"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/winemobilebanner/header_logo.png"></a></div>'<!--header_logo-->
		bd +='</div>'<!--header_middle-->
		bd +='<div class="header_right">'
		bd +='<button type="button" class="header_cart_btn"><a href="javascript:RestMenuList.OpenCartCheck()" id="checkout_cart" ><img src="panel/images/winemobilebanner/cart_icon.png"><a href="javascript:RestMenuList.OpenCartCheck()" style="position: absolute;"><div class="cartno">0</div></a></a></button>'
		bd +='</div>'<!--header_right-->
		bd +='</div>'
		document.getElementById("header").innerHTML = bd;
    	var n =''
    	 <!--product-area -->   
		n +='<div class="wrapper">'
		n +='<div class="cartpro_box">'
		n +='<div class="cartpro">'
		n +='<div class="cartpro_hd">'
		
		n +='<div class="cartpro_hdname">'+Shopping.Business[u].name+'</div>'
		if(Main.WhereAmIData.collecttype == "pickup"){
			var dtime = Shopping.Business[u].pickuptime
			var dtext = "pickup time";
		}else if(Main.WhereAmIData.collecttype == "delivery"){
			var dtime = Shopping.Business[u].deliverytime
			var dtext = "delivery time";
		}
		n +='<div class="cartpro_hd_dt">'+dtext+' : <strong>'+Main.NullToEmpty(dtime)+'</strong></div>'<!--cartpro_hd_dt-->
		
		n +='</div>'<!--cartpro_hd-->    
		n +='<div id="plc_rgt_in">'

		

		n +='</div>'

		n +='</div>'
		
		
		
		n +='<div class="wrapper">'
		n +='<div class="cartpro_box">'
		if(Shopping.OrderNowButtonCheckwithMin() >= Main.NullToEmpty(Shopping.Business[u].minimum) ) {
			n +='<span  id="min_order"><div class="cartbuy_hd" onclick="RestMenuList.OpenCheckout()"><?=$lang_resource['SHOPPING_FOURTH_ORDER_NOW']?></div></span>'
		} else if(Main.NullToEmpty(Shopping.Business[u].minimum) != 0 || Main.NullToEmpty(Shopping.Business[u].minimum) != ''){
			n +='<span  id="min_order"><div class="cartbuy_hd order_now_btn_gray"><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Business[u].currency+' '+Shopping.Business[u].minimum+'</div></span>'
			
		} 
		
		n +='<div class="cartbuy" style="border-top: 1px solid #ccc;">'
		n +='<div class="cartbuy_dv"><?= $lang_resource['DELIVERY_V2'] ?> <span>'+Shopping.Business[u].currency+'<span id="' +Shopping.Business[u].id + '_shipping">'+Shopping.Business[u].shipping+'</span></span></div>'   
		n +='</div>'
		
		n +='<div class="cartbuy" id="showDiscount"  style="display: none" >'
		n +='<div class="cartbuy_dv"><?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?> <span>'+Shopping.Business[u].currency+'<span id="cart_dis"></span></span></div>'   
		n +='</div>'
		
		var s="";
		if(Shopping.Cart.buyer.taxtype == 1 && Shopping.Cart.buyer.taxtype) {
			s += '<span style="font-size : 11px;font-weight:bold"><?= $lang_resource['Tax_not_included_V2'] ?></span>';
		}
		if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
			Shopping.Cart.servicefee =0;
		}
		
		n +='<div class="cartbuy">'
		n +='<div class="cartbuy_dv"><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee +'%) <span>'+Shopping.Business[u].currency+'<span  id="cart_servicefeeid" >0.00</span></span></div>'   
		n +='</div>'
		
		n +='<div class="cartbuy" id="showTax"  style="display: none" >'
				
		n +='<div class="cartbuy_dv"><?= $lang_resource['Tax_V2'] ?>';
		if(Shopping.Cart.buyer.tax) {
			n += '(' + Shopping.Cart.buyer.tax + '%) :';
		} else {
			n += ':';	
		}
		if( Shopping.Business[u].tax ==''){
			Shopping.Business[u].tax="0.00"; 
		}
		
		n +='<span>'+Shopping.Business[u].currency+'<span id="cart_taxid">' + Shopping.Business[u].tax + '<span></span></div>'+s  
		n +='</div>'
		
		n +='<div class="cartbuy">'
		n +='<div class="cartbuy_total"><?= $lang_resource['EXPORT_TOTAL'] ?> <span>'+Shopping.Business[u].currency+'<span id="orderprice">0.00</span></span></div>'   
		n +='</div>'<!--cartbuy-->
		n +='<div class="cartbuy_hd" onclick="RestMenuList.BackTOList()"><?=$lang_resource['PAYMENT_ORDER_BACK']?></div>'
		
		n +='</div>'<!--cartpro_box-->
		
		n +='</div>'  
		
		<!--product-area --> 

		//return n;
		$("#cart_details_product").append(n);


		var n1='';
		if(Shopping.Cart.business[0]){
			if(Shopping.Cart.business[0].dishes){
				if (Shopping.Cart.business[0].dishes.length != 0) {
					for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){
						n1 += RestMenuList.MenuCartlist(i)
					}
				}
			}
		}

		$("#plc_rgt_in").empty().append(n1);

		Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();
	
		
    },
    UpdateCart: function(val,i){
    	var qty = val.value;
    	Shopping.Cart.business[0].dishes[i].quantity = qty;
    	Shopping.Cart.business[0].dishes[i].total = Shopping.Cart.business[0].dishes[i].price * qty;
    	var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness); 
    	var e=0;
    	var n1='';
		if(Shopping.Cart.business[0]){
			if(Shopping.Cart.business[0].dishes){
				if (Shopping.Cart.business[0].dishes.length != 0) {
					for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){						
						n1 += RestMenuList.MenuCartlist(i)
					}
				}
			}
		}

		$("#plc_rgt_in").empty().append(n1);
		for (i in Shopping.Cart.business){
			e = 0;
			for (var c in Shopping.Cart.business[i].dishes){
				e += parseFloat(Shopping.Cart.business[i].dishes[c].total)
			}
			if (Shopping.Cart.business[i].minimum != "" && Shopping.Cart.business[i].minimum != 0){
				if (e >= Shopping.Cart.business[i].minimum){
					var mor ='<div class="cartbuy_hd" onclick="RestMenuList.OpenCheckout()"><?=$lang_resource['SHOPPING_FOURTH_ORDER_NOW']?></div>'
				}else{
					var mor ='<div class="cartbuy_hd order_now_btn_gray"><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Business[0].currency+' '+Shopping.Cart.business[i].minimum+'</div>'
				}
				$("#min_order").empty().append(mor);
			}else{
				if(e > 0)
					$(".cartbuy_hd").removeClass("order_now_btn_gray");
			}
		}
		

		Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();
    },
    DeleteCart: function(val){
    	//alert(JSON.stringify(Shopping.Cart.business[0].dishes))
    	Shopping.Cart.business[c].dishes.splice(val, 1);
    	//alert(JSON.stringify(Shopping.Cart.business[0].dishes))
    	var n1='';
		if(Shopping.Cart.business[0]){
			if(Shopping.Cart.business[0].dishes){
				if (Shopping.Cart.business[0].dishes.length != 0) {
					for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){
						n1 += RestMenuList.MenuCartlist(i)
					}
				}else{
					$(".cartno").empty().append(0)
				}
			}
		}

		$("#plc_rgt_in").empty().append(n1);

		if (Shopping.Cart.business[0].dishes.length == 0){
			$("#cart_details_product").hide();
			$("#product_list_item").show();
			RestMenuList.businessid = Shopping.Cart.business[0].id;
			RestMenuList.Main()
		}

		Shopping.UpdateCartTotals();
		Shopping.UpdateTotals();
		

    },

    ProductDetailsPage: function(v,count,bi,pid){		
		
    	//var bi = Shopping.Business[count]
		//alert(JSON.stringify(Shopping.BusinessDetails))
    	Shopping.Menu3 = Shopping.BusinessDetails[bi];
    	RestMenuList.businessid = bi;
    	var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", bi);
    	
    	car = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", bi, "currency");
		var v = Main.GetIndexOnPropertyValueFound(Shopping.Menu3.dishes, "id", pid);
		
		Main.Activeproduct= v;
		Main.Activeproductcount= count;
		var custom_link =  "product-list_"+Shopping.Menu3.dishes[v].id+"_"+Shopping.Menu3.dishes[v].name.split(" ").join("");
		
		
		if(!MainCustom.in_array("101",countEStep)) {
		countEStep.push("101");
		}
		window.history.pushState( {"id":101} , "Restaurent Menu", custom_link );
		
  		var counterimg = 0;
  		var c1=''
  		var c2=''
  		var c3=''
    	if (Shopping.Menu3.dishes[v].isimg==1){
            C = "panel/images/dishes/" + Main.NullToEmpty(Shopping.Menu3.dishes[v].id) + "/1/panel.jpg?c=" + Main.Random ;
        }else if (Shopping.Menu3.dishes[v].isimg2==1){
            C = "panel/images/dishes/" + Main.NullToEmpty(Shopping.Menu3.dishes[v].id) + "/2/panel.jpg?c=" + Main.Random;            
        }else if (Shopping.Menu3.dishes[v].isimg3==1){
            C = "panel/images/dishes/" + Main.NullToEmpty(Shopping.Menu3.dishes[v].id) + "/3/panel.jpg?c=" + Main.Random;            
        }else{
        	counterimg=1;
            C = "panel/wine-libery/desktop/theme/demo-theme-wine-responsive/assets/images/dummy/demobottle3.png";
        }
        if (Shopping.Menu3.dishes[v].isimg==1){
        	c1= "panel/images/dishes/" + Main.NullToEmpty(Shopping.Menu3.dishes[v].id) + "/1/panel.jpg";
        }
        if (Shopping.Menu3.dishes[v].isimg2==1){
        	c2 = "panel/images/dishes/" + Main.NullToEmpty(Shopping.Menu3.dishes[v].id) + "/2/panel.jpg";
        }
        if (Shopping.Menu3.dishes[v].isimg3==1){
        	c3 = "panel/images/dishes/" + Main.NullToEmpty(Shopping.Menu3.dishes[v].id) + "/3/panel.jpg";
        }
        if(Main.WhereAmIData.collecttype == "pickup"){
			var dtime = Shopping.Business[u].pickuptime
			var dtext = "<?=$lang_resource['MENULIST_ESTIMATE_PICKUP_TIME']?>";
		}else if(Main.WhereAmIData.collecttype == "delivery"){
			var dtime = Shopping.Business[u].deliverytime
			var dtext = "<?=$lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME']?>";
		}

		//alert(JSON.stringify(Shopping.Menu.dishes))

    	var n =''
		<!--prodet_area-->  
		n +='<h3 class="category_heading1">'+Shopping.Menu3.dishes[v].name+'</h3>'
		n +='<div class="wrapper">'
		n +='<div class="wrapper-content">'
		if(counterimg == 1){
			n +='<a href="'+C+'" data-imagelightbox="f"><img src="'+C+'" alt="Dummy Image"></a>'
		}else{
			if(Shopping.Menu3.dishes[v].isimg==1){
				n +='<a href="'+c1+'" data-imagelightbox="f"><img src="'+c1+'" alt="Image 1"></a>'
				if(Shopping.Menu3.dishes[v].isimg2==1){
					n +='<a href="'+c2+'" style="display:none;" data-imagelightbox="f"><img src="'+c2+'" alt="Image 2"></a>'
				}
				if(Shopping.Menu3.dishes[v].isimg3==1){
					n +='<a href="'+c3+'" style="display:none;" data-imagelightbox="f"><img src="'+c3+'" alt="Image 3"></a>'
				}
			}else if(Shopping.Menu3.dishes[v].isimg2==1){
				n +='<a href="'+c2+'" data-imagelightbox="f"><img src="'+c2+'" alt="Image 2"></a>'
				if(Shopping.Menu3.dishes[v].isimg3==1){
					n +='<a href="'+c3+'" style="display:none;" data-imagelightbox="f"><img src="'+c3+'" alt="Image 3"></a>'
				}
			}else if(Shopping.Menu3.dishes[v].isimg3==1){
				n +='<a href="'+c3+'" data-imagelightbox="f"><img src="'+c3+'" alt="Image 3"></a>'
			}
		}
		n +='</div>'<!--wrapper-content-->
		n +='</div>'<!--wrapper--> 
		
		n +='<div class="wrapper">'
		n +='<div class="left_pricelist"><p>'+car+' '+Shopping.Menu3.dishes[v].price+'</p></div>'<!--left_pricelist-->
		if(dtext){
		n +='<div class="right_delivery"><p>'+dtext+':<span style="color:#981e15;font-weight:700;"> '+dtime+'</span></p></div>'<!--right_delivery-->
		}
		n +='</div>'
		n +='<div class="wrapper">'
		n +='<div class="details">'
		  
		n +='</div>'<!--details-->
		
		n +='</div>'
		n +='<div class="wrapper">'
		n +='<div class="detsel">'
		n +='<div class="detsel_top">'
		n +='<div class="detsel_top_left">'
		n +='<label><?=$lang_resource['SELECT_QUANTITY_MENULIST']?> :</label>'
		n +='<div class="selectfield">'
		n +='<span class="selectdropdown">'
		n +='<select class="selectdropdownselect" id="quantity_value_select'+Shopping.Menu3.dishes[v].id+'">'
		 for(var i=1;i<=10;i++){
			n +='<option value="'+i+'">'+i+'</option>'
		 }
		n +='</select>'
		n +='</span>'
		n +='</div>'<!--selectfield-->
		n +='</div>'<!--detsel_top_left-->
		n +='<div class="detsel_top_right"><button type="button" class="aggiungi" onclick="RestMenuList.AddtoCart_pre_select(this,' + Shopping.Menu3.dishes[v].id + ','+Shopping.Menu3.dishes[v].price+',\''+car+'\','+count+','+bi+')"><?=$lang_resource['PRODUCT_POTIONS_ADD_CART']?></button></div>'<!--detsel_top_right-->
		n +='</div>'<!--detsel_top-->
		
		
		n +='<div class="detsel_mid">'
		n +='<div class="detsel_mid_content">'
		n +='<table width="100%" cellspacing="0" cellpadding="0">'
		n +='<tr>'
		n +='<th width="50%"><?=$lang_resource['MENULIST_CATNAME_PRODUCT_DETAILS_PAGE']?></th>'
		n +='<td width="50%">'+Shopping.Menu3.dishes[v].catname+'</td>'
		n +='</tr>'
		n +='<tr>'
		n +='<th><?=$lang_resource['MENULIST_ORIGIN_PRODUCT_DETAILS_PAGE']?></th>'
		n +='<td>'+Main.NullToEmpty(Shopping.Menu3.dishes[v].origin_winelibary)+'</td>'
		n +='</tr>'
		n +='<tr>'
		n +='<th><?=$lang_resource['MENULIST_SELLER_PRODUCT_DETAILS_PAGE']?></th>'
		n +='<td>'+Main.NullToEmpty(Shopping.Menu3.dishes[v].seller_winelibary)+'</td>'
		n +='</tr>'
		n +='</table>'
		n +='</div>'
		n +='</div>'<!--detsel_mid-->
		
		n +='<div class="detsel_bott">'
		n +='<div class="detsel_bott_content">'
		n +='<table width="100%" cellspacing="0" cellpadding="0">'
		n +='<tr>'
		n +='<th colspan="4" scope="col"><?=$lang_resource['MENULIST_DESCRIPTION_PRODUCT_DETAILS_PAGE']?></th>'
		n +='</tr>'
		n +='<tr>'
		n +='<td width="45%">Colore</td>'
		n +='<td width="4%">:</td>'
		n +='<td width="39%">giallo con riflessi dorati</td>'
		n +='<td width="10%">&nbsp;</td>'
		n +='</tr>'
		n +='<tr>'
		n +='<td width="45%">Profumo</td>'
		n +='<td width="4%">:</td>'
		n +='<td width="39%">caratteristoo con timidi sentori<br>di pietra focala e di pesca e pera matura.</td>'
		n +='<td width="10%">&nbsp;</td>'
		n +='</tr>'
		n +='<tr>'
		n +='<td width="45%">Gusto </td>'
		n +='<td width="4%">:</td>'
		n +='<td width="39%">pieno, sapido e gustoso.</td>'
		n +='<td width="10%">&nbsp;</td>'
		n +='</tr>'
		n +='<tr>'
		n +='<td width="45%">Gradasione alcilica</td>'
		n +='<td width="4%">:</td>'
		n +='<td width="39%">12.5% vol.</td>'
		n +='<td width="10%">&nbsp;</td>'
		n +='</tr>'
		n +='</table>'
		n +='</div>'
		n +='</div>'<!--detsel_bott-->
		
		n +='</div>'<!--detsel-->
		n +='</div>'
		n +='<div class="wrapper">'
		n +='<div class="vendor">'
		n +='<div class="center"><button type="button" onclick="RestMenuList.PopulateDishesList()" class="vendor_btn"><?= $lang_resource['MENU_LIST_BACK_TO_PRODUCT'] ?></button></div>'<!--center-->
		n +='</div>'<!--vendor-->
		n +='</div>' 
		
		
		
		$("#product_details_page").empty().append(n);
		
		$("#product_details_page").show();

		$( function()
	{
			// ACTIVITY INDICATOR

		var activityIndicatorOn = function()
			{
				$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
			},
			activityIndicatorOff = function()
			{
				$( '#imagelightbox-loading' ).remove();
			},


			// OVERLAY

			overlayOn = function()
			{
				$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
			},
			overlayOff = function()
			{
				$( '#imagelightbox-overlay' ).remove();
			},


			// CLOSE BUTTON

			closeButtonOn = function( instance )
			{
				$( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
			},
			closeButtonOff = function()
			{
				$( '#imagelightbox-close' ).remove();
			},


			// CAPTION

			captionOn = function()
			{
				var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
				if( description.length > 0 )
					$( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
			},
			captionOff = function()
			{
				$( '#imagelightbox-caption' ).remove();
			},


			// NAVIGATION

			navigationOn = function( instance, selector )
			{
				var images = $( selector );
				if( images.length )
				{
					var nav = $( '<div id="imagelightbox-nav"></div>' );
					for( var i = 0; i < images.length; i++ )
						nav.append( '<button type="button"></button>' );

					nav.appendTo( 'body' );
					nav.on( 'click touchend', function(){ return false; });

					var navItems = nav.find( 'button' );
					navItems.on( 'click touchend', function()
					{
						var $this = $( this );
						if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
							instance.switchImageLightbox( $this.index() );

						navItems.removeClass( 'active' );
						navItems.eq( $this.index() ).addClass( 'active' );

						return false;
					})
					.on( 'touchend', function(){ return false; });
				}
			},
			navigationUpdate = function( selector )
			{
				var items = $( '#imagelightbox-nav button' );
				items.removeClass( 'active' );
				items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
			},
			navigationOff = function()
			{
				$( '#imagelightbox-nav' ).remove();
			},


			// ARROWS

			arrowsOn = function( instance, selector )
			{
				var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );

				$arrows.appendTo( 'body' );

				$arrows.on( 'click touchend', function( e )
				{
					e.preventDefault();

					var $this	= $( this ),
						$target	= $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
						index	= $target.index( selector );

					if( $this.hasClass( 'imagelightbox-arrow-left' ) )
					{
						index = index - 1;
						if( !$( selector ).eq( index ).length )
							index = $( selector ).length;
					}
					else
					{
						index = index + 1;
						if( !$( selector ).eq( index ).length )
							index = 0;
					}

					instance.switchImageLightbox( index );
					return false;
				});
			},
			arrowsOff = function()
			{
				$( '.imagelightbox-arrow' ).remove();
			};


		//	WITH ACTIVITY INDICATION

		$( 'a[data-imagelightbox="a"]' ).imageLightbox(
		{
			onLoadStart:	function() { activityIndicatorOn(); },
			onLoadEnd:		function() { activityIndicatorOff(); },
			onEnd:	 		function() { activityIndicatorOff(); }
		});


		//	WITH OVERLAY & ACTIVITY INDICATION

		$( 'a[data-imagelightbox="b"]' ).imageLightbox(
		{
			onStart: 	 function() { overlayOn(); },
			onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
			onLoadStart: function() { activityIndicatorOn(); },
			onLoadEnd:	 function() { activityIndicatorOff(); }
		});


		//	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

		var instanceC = $( 'a[data-imagelightbox="c"]' ).imageLightbox(
		{
			quitOnDocClick:	false,
			onStart:		function() { closeButtonOn( instanceC ); },
			onEnd:			function() { closeButtonOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { activityIndicatorOn(); },
			onLoadEnd:	 	function() { activityIndicatorOff(); }
		});


		//	WITH CAPTION & ACTIVITY INDICATION

		$( 'a[data-imagelightbox="d"]' ).imageLightbox(
		{
			onLoadStart: function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 function() { captionOn(); activityIndicatorOff(); },
			onEnd:		 function() { captionOff(); activityIndicatorOff(); }
		});


		//	WITH ARROWS & ACTIVITY INDICATION

		var selectorG = 'a[data-imagelightbox="g"]';
		var instanceG = $( selectorG ).imageLightbox(
		{
			onStart:		function(){ arrowsOn( instanceG, selectorG ); },
			onEnd:			function(){ arrowsOff(); activityIndicatorOff(); },
			onLoadStart: 	function(){ activityIndicatorOn(); },
			onLoadEnd:	 	function(){ $( '.imagelightbox-arrow' ).css( 'display', 'block' ); activityIndicatorOff(); }
		});


		//	WITH NAVIGATION & ACTIVITY INDICATION

		var selectorE = 'a[data-imagelightbox="e"]';
		var instanceE = $( selectorE ).imageLightbox(
		{
			onStart:	 function() { navigationOn( instanceE, selectorE ); },
			onEnd:		 function() { navigationOff(); activityIndicatorOff(); },
			onLoadStart: function() { activityIndicatorOn(); },
			onLoadEnd:	 function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
		});


		//	ALL COMBINED

		var selectorF = 'a[data-imagelightbox="f"]';
		var instanceF = $( selectorF ).imageLightbox(
		{
			onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
			onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
		});

	});
		

		$("#dishesresults").hide();
		$("#product_list_item").hide();
    },
    PriceSearch: function(val){
    	
    	if(val == 0){
    		Main.PriceLow = true;	
    		Main.PriceHigh = false;
    		Main.NameAsc = false;	
    		Main.NameDesc = false;

    		$("#pricelow").addClass("act");
    		$("#pricelow a").addClass("act");
    		$("#pricehigh").removeClass("act");
    		$("#pricehigh a").removeClass("act");

    		$("#nameasc").removeClass("act");
    		$("#nameasc a").removeClass("act");
    		$("#namedesc").removeClass("act");
    		$("#namedesc a").removeClass("act");
    		
    	}else if(val == 1){
    		Main.PriceHigh = true;
    		Main.PriceLow = false;
    		Main.NameAsc = false;	
    		Main.NameDesc = false;

    		$("#pricehigh").addClass("act");
    		$("#pricehigh a").addClass("act");
    		$("#pricelow").removeClass("act");
    		$("#pricelow a").removeClass("act");

    		$("#nameasc").removeClass("act");
    		$("#nameasc a").removeClass("act");
    		$("#namedesc").removeClass("act");
    		$("#namedesc a").removeClass("act");

    	}

    	RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
    	
    },
    NameSearch: function(val){
    	if(val == 0){
    		Main.NameAsc = true;	
    		Main.NameDesc = false;
    		Main.PriceHigh = false;
    		Main.PriceLow = false;

    		$("#nameasc").addClass("act");
    		$("#nameasc a").addClass("act");
    		$("#namedesc").removeClass("act");
    		$("#namedesc a").removeClass("act");

    		$("#pricehigh").removeClass("act");
    		$("#pricehigh a").removeClass("act");
    		$("#pricelow").removeClass("act");
    		$("#pricelow a").removeClass("act");

    	}else if(val == 1){
    		Main.NameAsc = false;	
    		Main.NameDesc = true;
    		Main.PriceHigh = false;
    		Main.PriceLow = false;

    		$("#namedesc").addClass("act");
    		$("#namedesc a").addClass("act");
    		$("#nameasc").removeClass("act");
    		$("#nameasc a").removeClass("act");

    		$("#pricehigh").removeClass("act");
    		$("#pricehigh a").removeClass("act");
    		$("#pricelow").removeClass("act");
    		$("#pricelow a").removeClass("act");
    	}
    	
    	RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
    },
    sortByMenuDish: function(key, reverse) {
		// Move smaller items towards the front
		// or back of the array depending on if
		// we want to sort the array in reverse
		// order or not.
		var moveSmaller = reverse ? 1 : -1;

		// Move larger items towards the front
		// or back of the array depending on if
		// we want to sort the array in reverse
		// order or not.
		var moveLarger = reverse ? -1 : 1;

		/**
		* @param  {*} a
		* @param  {*} b
		* @return {Number}
		*/
		return function(a, b) {
			if (Main.IsNumber(b[key])){
				if (parseInt(a[key]) < parseInt(b[key])) {
			  		return moveSmaller;
				}
				if (parseInt(a[key]) > parseInt(b[key])) {
			  		return moveLarger;
				}
			}else{
				if (a[key] < b[key]) {
			  		return moveSmaller;
				}
				if (a[key] > b[key]) {
			  		return moveLarger;
				}
			}
			return 0;
		};
	},

	sortByBusiness: function(key, reverse) {
		// Move smaller items towards the front
		// or back of the array depending on if
		// we want to sort the array in reverse
		// order or not.
		var moveSmaller = reverse ? 1 : -1;

		// Move larger items towards the front
		// or back of the array depending on if
		// we want to sort the array in reverse
		// order or not.
		var moveLarger = reverse ? -1 : 1;

		/**
		* @param  {*} a
		* @param  {*} b
		* @return {Number}
		*/
		return function(a, b) {
			if (Main.IsNumber(b[key])){
				if (parseInt(a[key]) < parseInt(b[key])) {
			  		return moveSmaller;
				}
				if (parseInt(a[key]) > parseInt(b[key])) {
			  		return moveLarger;
				}
			}else{
				if (a[key] < b[key]) {
			  		return moveSmaller;
				}
				if (a[key] > b[key]) {
			  		return moveLarger;
				}
			}
			return 0;
		};
	},
	ChangeAddress: function(val){
		if(val == 0){
			Forms.Clean("whereami", "popupmainbuttonok");
			GoogleMap.Clean();
			
			//Forms.Form.whereami.whereami = c;
			
			var b = false;
			if (c)
			{
				Forms.Form.whereami.type = "modify";
				b = true
			}
			else
			{
				c = new Object();
				Forms.Form.whereami.type = "create"
			}
			Forms.CreateValue("whereami", "country", Main.settingfront.default_country);
			Forms.CreateValue("whereami", "city", Main.settingfront.default_city);
			Forms.CreateValue("whereami", "sriptvalue", "<?=$script_id?>");
			Forms.CreateValue("whereami", "address", "<?=$script_id?>");
			 MainCustom.PreWhereAmI();

			$("#addressicon").empty().append('<a href="javascript:MainCustom.SaveWhereAmI()"><img src="<?=$module_image_link?>/images/common/tick.png" alt=""></a>');
			var changeAddressField = Forms.CreateTextAreaPropertyNew3small("whereami", "address", Main.WhereAmIData.address, false, "GoogleMap.UpdateUserPosition(this)", true);
			$("#addresschange").empty().append(changeAddressField)
		}if(val == 1){
			Main.WhereAmIData.address = document.getElementById("addresstext").value
			
			
			/*$("#addressicon").empty().append('<a href="javascript:RestMenuList.ChangeAddress(0)"><img src="<?=$module_image_link?>/images/pen.png" alt=""></a>');
			$("#addresschange").empty().append(Main.WhereAmIData.address)*/
		}
	},
	LowerDeliveryTime: function(val){
		if(val == 0){
			$("#delord").empty().append('<button type="button" onclick="RestMenuList.LowerDeliveryTime(1)" class="delord delordactive"><?=$lang_resource['MENU_LIST_ORDER_BY']?></button>')
			Main.delord = true
		}else if(val == 1){
			$("#delord").empty().append('<button type="button" onclick="RestMenuList.LowerDeliveryTime(0)" class="delord"><?=$lang_resource['MENU_LIST_ORDER_BY']?></button>')
			Main.delord = false
		}
		RestMenuList.PopulateDishesList(false,Shopping.Config.Dishes.List.SortBy, true)
	},
    CommonproductBody : function() {

		var ban ="";
		var bd = "";
		bd +='<div class="inner_body">'		
		bd +='<div class="inner_header">'
		bd +='<div class="header_left">'
		bd +='<button type="button" class="header_back_btn" onclick="Main.InitInterface()"><i class="icon-arrow-left10"></i> Back</button>'
		bd +='</div>'<!--header_left-->
		bd +='<div class="header_middle">'
		bd +='<div class="header_logo"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/winemobilebanner/header_logo.png"></a></div>'<!--header_logo-->
		bd +='</div>'<!--header_middle-->
		bd +='<div class="header_right">'
		bd +='<button type="button" class="header_cart_btn"><a href="javascript:RestMenuList.OpenCartCheck()" id="checkout_cart" ><img src="panel/images/winemobilebanner/cart_icon.png"><a href="javascript:RestMenuList.OpenCartCheck()" style="position: absolute;"><div class="cartno">0</div></a></a></button>'
		bd +='</div>'<!--header_right-->
		bd +='</div>'
		document.getElementById("header").innerHTML = bd;
		bd +='<div id="headershow">'	
		ban +='<div class="inner_header_bottom">'
		ban +='<div class="header_search_dv">'
		ban +='<input type="text" id="dishsearch">'
		ban +='</div>'<!--header_search_dv-->
		ban +='<div class="header_refine_dv">'
		ban +='<button type="button" class="refine_btn fil"><i class="icon-filter2"></i> Refine</button>'
		ban +='</div>'<!--header_refine_dv-->
		ban +='</div>'<!--inner_header_bottom-->
		ban +='</div>'
		ban +='<div class="filter_dv">'
		ban +='<div class="filter_top">'
		ban +='<div class="filterbox">'
		ban +='<h5><?= $lang_resource['MENU_LIST_ORDER_PRICE'] ?></h5>'
		ban +='<div class="filternav"><ul><li id="act"><a href="javascript:RestMenuList.PriceSearch(0)" ><?= $lang_resource['MENU_LIST_HIGH'] ?> <span><?= $lang_resource['MENU_LIST_TO'] ?> </span> <?= $lang_resource['MENU_LIST_LOW'] ?> </a></li><li id="pricehigh"><a href="javascript:RestMenuList.PriceSearch(1)"><?= $lang_resource['MENU_LIST_LOW'] ?> <span><?= $lang_resource['MENU_LIST_TO'] ?></span> <?= $lang_resource['MENU_LIST_HIGH'] ?> </a></li></ul></div>'
		ban +='</div>'
		
		ban +='<div class="filterbox">'
		ban +='<h5><?= $lang_resource['MENU_LIST_ORDER_NAME'] ?> </h5>'
		ban +='<div class="filternav"><ul><li id="act"><a href="javascript:RestMenuList.NameSearch(0)" class="act"><?= $lang_resource['MENU_LIST_A'] ?> <span><?= $lang_resource['MENU_LIST_TO'] ?></span> <?= $lang_resource['MENU_LIST_Z'] ?></a></li><li id="namedesc"><a href="javascript:RestMenuList.NameSearch(1)"> <?= $lang_resource['MENU_LIST_Z'] ?> <span> <?= $lang_resource['MENU_LIST_TO'] ?></span>  <?= $lang_resource['MENU_LIST_A'] ?></a></li></ul></div>'
		ban +='</div>'

		ban +='<div class="filterbox">'
		ban +='<h5> <?= $lang_resource['MENU_LIST_DELIVERY_TIME'] ?></h5>'
		ban +='<span id="delord"><button type="button" onclick="RestMenuList.LowerDeliveryTime(0)" class="delord"><?= $lang_resource['MENU_LIST_ORDER_BY'] ?></button></span>'
		ban +='</div>'
		
		ban +='<div class="filterbox">'
		ban +='<h5><?= $lang_resource['MENU_LIST_PRICE_RANGE'] ?></h5>'

		ban +='<div class="col-md-12 range">'

		ban +='<input type="text" id="amount_left"  class="sliderValue" data-index="0"> '   
		ban +='<input type="text" id="amount_right" class="sliderValue" data-index="1">'
		ban +='<div id="slider-range" class="slider_range_bar"></div>'
		

		ban +='</div>'
		ban +='</div>'                     
		ban +='</div>'
		
		
		ban +='<div class="filter_bot" id="filterSubCats">'
		ban +='<span><input id="1" class="nc" type="checkbox" name="" value=""><label for="1"><?= $lang_resource['MENU_LIST_RED'] ?></label></span>'
		ban +='<span><input id="2" class="nc" type="checkbox" name="" value=""><label for="2"><?= $lang_resource['MENU_LIST_WHITE'] ?></label></span>'
		ban +='<span><input id="3" class="nc" type="checkbox" name="" value=""><label for="3"><?= $lang_resource['MENU_LIST_ROSE'] ?></label></span>'
		ban +='<span><input id="4" class="nc" type="checkbox" name="" value=""><label for="4"><?= $lang_resource['MENU_LIST_SPARKLING'] ?></label></span>'
		ban +='</div>'
		ban +='</div>'
		
		
		var n =''
		n +='<div class="product-area" id="product_list_item">'
		n +='<div class="wrapper">'
		n +='<div class="list_catgr_fild_dv">'
		n +='<select class="select_field" onchange="MainCustom.changecatclass(this.value)">'
		n +='<option value="-1"><?= $lang_resource['MENU_LIST_ALL'] ?></option>';
		for (var q in Shopping.Categories){	
		n +='<option value="'+Shopping.Categories[q].id+'">' + Shopping.Categories[q].name + '</option>'
		}
		n +='</select>'
		n +='</div>'<!--list_catgr_fild_dv-->		
		n +='</div>'<!--wrapper-->		
		

       
        n +='<div id="dishesresults" >'        
        n +='</div>'
		n +='</div>'
		 
		n +='<div id="product_details_page" style="display:none;">'
        n +='</div>' 
		n +='<div id="cart_details_product" style="display:none;">'
        n +='</div>'
		ban +='</div>'<!--main--> 
      
      <!-- New Wine Livary Design -->

      	$("#showcanvas").removeClass("inner-map");
		$("#showcanvas").removeAttr('style');
		document.getElementById("showcanvas").innerHTML = ban;
		document.getElementById("shoppingbox").innerHTML = n;
		
		//Forms.Clean("whereami", "popupmainbuttonok");
		//Main.ActiveForm = "whereami";
		// Main.PreWhereAmI();
	},

	PrintBusinessAndDishes: function () {
	
		
		},

	BackTOList: function(){	
		$("#product_list_item").show();
		$("#product_details_page").hide();
		$("#cart_details_product").hide();
		var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness); 		
		
		RestMenuList.businessid = Shopping.Cart.business[0].id;		
		RestMenuList.Main()
		$(".cartno").empty().append(Shopping.Cart.business[0].dishes.length)
	},
	
	
	ShowConfirmMob:  function(id,c){
		

		     c = JSON.parse(c);
			 var abn='';
			var bd = "";		
			bd +='<div class="inner_header">'
			bd +='<div class="header_left">'
			bd +='<button type="button" class="header_back_btn" onclick="Main.InitInterface()"><i class="icon-arrow-left10"></i> Home</button>'
			bd +='</div>'<!--header_left-->
			bd +='<div class="header_middle">'
			bd +='<div class="header_logo"><a href="#"><img src="panel/images/winemobilebanner/header_logo.png"></a></div>'<!--header_logo-->
			bd +='</div>'<!--header_middle-->
			bd +='<div class="header_right">'
			//bd +='<button type="button" class="header_back_btn" onclick="Main.InitInterface()"><?=$lang_resource['MOBILE_CHECKOUT_CANCEL']?></button>'
			bd +='</div>'<!--header_right-->
			bd +='</div>'
			document.getElementById("header").innerHTML = bd;
			
			
			abn+='<div class="wrapper">'
			abn+='<div class="success-dv">'
			abn+='<div class="seccess_img"><img src="panel/images/winemobilebanner/seccess-icon1.png"></div>'<!--seccess_img-dv-->
			abn+='<div class="succes-tbl">'
			
			abn+='</div>'<!--succes-tbl-->
			
			abn+='<div class="succes-tb2">'
			abn+='<div class="row">'
			
			abn+='<div class="track_col">'
			
			abn+='<div class="sc-left">'
			abn+='<h3><?= $lang_resource['ORDER_THANKS_PLCED'] ?></h3>'
			abn+='<div class="order-no"><?= $lang_resource['ORDER_PROCESSED'] ?>  : <span>#'+ id +'</span></div>'
			abn+='</div>'<!--sc-left-->
			
			abn+='</div>'<!--track_col-->
			
			abn+='<div class="track_col">'
			
			abn+='<div class="sc-right">'
			abn+='<h4><?=$lang_resource['MOBILE_MENU_LIST_DO_YOU_WANT_KNOW_THE_PROGRESS']?></h4><center><button type="button" class="track_now" onClick="Visuals.OpenOrder('+id+',true)"><?=$lang_resource['MOBILE_MENU_LIST_TRACK_NOW']?></button>	</center>'
			abn+='<h5><?=$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER']?></h5><p>'+c.name+' : '+c.tel+'</p>'
			abn+='</div>'<!--sc-right-->
			
			abn+='</div>'<!--track_col-->
			
			abn+='</div>'<!--row-->
			abn+='</div>'<!--succes-tb2-->
			
			abn+='</div>'<!--success-dv-->
			abn+='</div>'

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

}; 
