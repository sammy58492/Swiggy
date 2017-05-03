var IS_REVIEW_ENABLED = 1;
var IS_PAYPAL_ENABLED = 1;
var IS_PRODUCT_OPTION_ENABLED = 1;
var IS_MERCADOPAGO_ENABLED = 1;
var IS_PAYPALADAPTIVE_ENABLED = 1;

var IS_BRAINTREE_ENABLED = 1;
var IS_AUTHORIZEDPAYMENT_ENABLED = 0;

var IS_CARDSAVE_ENABLED = 1;




var choice_count=0;
var div_data=null;
var mychoice_data=new Array();
var cart_object=null;
var cart_id=null;
var quantitysec = 1;
var reservetab = 0;
var GlobalPagecheck = 0;

var globalReserve = new Object();
    globalReserve.Room = new Array();
	globalReserve.Table = new Array();
	globalReserve.Free = new Array();
	
var globalReserveTotalPrice = 0;
var free_price = 0;
var room_price = 0;
var table_price = 0;

var fstchk = 0;

var OPENIMG = "images/google_icon/open.png";
var CLOSEIMG = "images/google_icon/close.png";
var POINTIMG = "images/google_icon/userlocation.png";

var currentshop = 0;
var nwcrtitm = new Array();
var lastid = "", del = 0;

var Shopping = {
    Start: function ()
    {
		Shopping.Cart = new Object();
		Shopping.Cart.business = new Array();
		
		var lp='';
		var ld='';
		if(Main.deliveryType == "pickup") {
		 
		  lp ="checked"	
		}
		if(Main.deliveryType == "delivery") {
		 var ld ="checked"	
		}
		if(Main.deliveryType == "delivery") {
		 var ld ="checked"	
		}
		
		
	lastid = "";
        document.getElementById("custom").style.display = "none";
		if(viewDevice == "Desktop") {
        $("body").height("994px");
		}
		
        var f = Visuals.CreateMiniWhereAmIButton("<?= $lang_resource['SHOPPING_SECOND_WHERE_ARE_YOU_BUTTON'] ?>", "Main.OpenWhereAmIBox()");
        f += Visuals.CreateRegularButton("cart", "grey", "<?= $lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] ?> (0)", "OpenCart.OpenCart()", "cartbutton");
        f += Visuals.CreateRegularButton("back", "orange", "<?= $lang_resource['SHOPPING_SECOND_WHERE_BACK_BUTTON'] ?>", "Shopping.Return()");
        var d = document.getElementById("rbuttons");
        d.innerHTML = f;
        d.style.display = "block";
		
		if(Main.deliveryType == "pickup") {
		 
		  lp ="checked"	
		}
		if(Main.deliveryType == "delivery") {
		 var ld ="checked"	
		}
		
		var shs = Blist.ShoppingHeaderDesignNavigationHtml();
		
		
		var sch = Blist.ShoppingHeaderBusinessSearchHtml();
			
   		
			
	
        document.getElementById("left").innerHTML = '<div class="cntnr_div_whle"><div class="cntnr_div"><div id="headerSearch">'+sch+'</div></div><div class="rest-body"><div id="shoppingbox"  class="main"></div></div></div>';
		var dleft = document.getElementById("left");
		dleft.className = "lfet_whle";
		var elem = document.getElementById("rgt_hm_div");
		
		document.getElementById("top").innerHTML = shs;
		document.getElementById("right").style.display = "none";
		// alert(elem.length);
		if(elem == null){
		}else{
			elem.parentNode.removeChild(elem);
		}
		
			var category=null;
		if(Shopping.RedirectToCity && ( Main.NullToEmpty(Main.WhereAmIData.collecttype)== "" || Main.NullToEmpty(Main.WhereAmIData.collecttype)== "citysearch")  )
		{
		
		   var business_id = Shopping.RedirectToCity;
		   Main.WhereAmIData.collecttype = "citysearch"
		   
		}else if(Shopping.ActiveCategory)
		{   
		
			category=Main.RedirectToCategory;
		    var business_id = 0;
			Main.WhereAmIData.city= 0;
			Main.WhereAmIData.collecttype = "categorysearch"
			 Shopping.RedirectToCity = null;
		}
		else if(Main.searchType == "Global")
		{
		
			 Main.WhereAmIData.collecttype = Main.deliveryType;
			 
			if(Main.WhereAmIData.collecttype == "pickup") {
				
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			}
			else {
			 var business_id = 0;
			 Shopping.RedirectToCity = null;
				}
		}
		else if(Main.WhereAmIData.collecttype == "pickup")
		{
		
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			
		}
		else if(Shopping.ActiveBusiness)
		{   
		
	
		    var business_id = 0;
			 Main.WhereAmIData.city=22;
			 Main.WhereAmIData.activebusiness=Shopping.ActiveBusiness;
			 Main.WhereAmIData.collecttype = "citysearch"
			 Shopping.RedirectToCity = null;
		}
		
		
		else
		{
			
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Main.WhereAmIData.collecttype = "delivery"
			
		}
		
	
	   
        var e = new Date().getTime();
        Main.Aid = e;
        Main.Loading();
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCategories"},{"operation":"FetchCurrentDate"},{"operation":"FetchAllBusinessData","location":' + JSON.stringify(Main.WhereAmIData.location) + ',"deliverytype":' +  JSON.stringify(Main.WhereAmIData.collecttype) + ',"category":' + category + ',"city":' + business_id + ',"whereall":' + JSON.stringify(Main.WhereAmIData) +"}]", function (a)
        {

	
			 Main.Ready();
		
            if (a != "")
            {
                a = JSON.parse(a);
                var u = a.business;
				Main.currentDate = a.currentDate;
				
				
				
				
				if(u == '' || u == 'null' || u == null){
					Shopping.Categories = new Array();
					alert("<?= $lang_resource['NORESTAURANTAVAILABLE_V21'] ?>");
					window.location="./";
					var q = 0;
					
				}
				
				else{
				
				
					var q = u.length;
					Shopping.Business = u;
				}
				
				
                if (q > 0)
                {
                    var c = false;
                    var r = new Array();
                    var t;
                    for (var p in a.categories)
                    {
                        c = false;
                        for (var b in u)
                        {
                            t = JSON.parse(u[b].categories);
                            for (var s in t)
                            {
                                if (t[s] == a.categories[p].id)
                                {
                                    c = true
                                }
                            }
                        }
                        if (c)
                        {
                            a.categories[p].enabled = true;
                            r.push(a.categories[p])
                        }
                    }
					
                    Shopping.Categories = r.sort(Main.SortByProperty("name"));
					
                    var r;
					
                    for (p in Shopping.Business)
                    {
						var pt = '';
                        r = JSON.parse(Shopping.Business[p].categories);
                        Shopping.Business[p].category = Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", r[0], "name")
						
						for(var act=0;act<r.length;act++)
						{
						 pt += ", "+Main.GetPropertyValueOnPropertyValueFound(Shopping.Categories, "id", r[act], "name");	
						}
						 var pt = pt.replace(",", ""); 
						 Shopping.Business[p].categoryshow = pt;
                    }
					
				  
                    Shopping.PrintBusinessList()
					
                }
                else
                {
					
					
                    Shopping.Categories = new Array();
                    Shopping.PrintBusinessList()
                }
				
				if(document.getElementById("payNumber").value == 0)
				{	
				
               
               
				Shopping.Cart.buyer = new Object();
				Shopping.Cart.reserve = new Object();
				Shopping.Cart.reserveQty = new Object();
				Shopping.Cart.reservePrice = new Object();
				Shopping.Cart.twilioenabledclient = false;	
                Shopping.UpdateCartUserInfo()
				}
				
				
				
				
            }
            else
            {
                Shopping.Business = null;
                Shopping.Categories = null;
                Shopping.Cart = null
            }
        })
    },
	goBackHomeForCity:function () {
		 delete Main.RedirectToCity;
		 Main.InitInterface();
		 
	},
	FuncOffer : function (f) {
		 f = JSON.parse(f);
		var n = "";

	    if(f.length == 0) {
				n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table"><tr><td colspan="4" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:5px"><?= $lang_resource['NOOFFER_V21'] ?></td>';
				n +='</tr></table>';
				} else {
		n ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table"><thead>';
                	 n +='<tr >';
                    	 n +='<th align="left" width="25%" style="padding-bottom: 5px" ><?= $lang_resource['OFFERN_V21'] ?></th>';
                         n +='<th align="left" width="35%" style="padding-bottom: 5px" ><?= $lang_resource['OFFERP_V21'] ?></th>';
                         n +='<th align="left" width="20%" style="padding-bottom: 5px" ><?= $lang_resource['STARTD_V21'] ?></th>';
						 n +='<th align="left" width="20%" style="padding-bottom: 5px" ><?= $lang_resource['ENDD_V21'] ?></th>';
                    n +='</tr>';
                n +='</thead>';
		var count = 0; 
		 for (var x in f) {
					count = count + 1;
                     n +='<tr style="height: 63px">';
                     n +='<td>'+f[x].discounttext+'</td>';
                     n +='<td>'+f[x].rate+'</td>';
					 n +='<td>'+f[x].startdate+'</td>';
					  n +='<td>'+f[x].enddate+'</td>';
					 n +='</tr>';

		 }

	    n +='</table>';

	}

		document.getElementById("dicountContent").innerHTML  = n;
		
		
		if(count){
		document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['OFFERS_V21']?> ("+count+")";
		}
		else{
			count = 0;
			document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['OFFERS_V21']?> ("+count+")";
		}
		},
	homeurl:function ()
    {
		window.location='./';
		  },
	changeDelType:function (type)
    {
		
		         globalReserve = new Object();
				globalReserve.Room = new Array();
				globalReserve.Table = new Array();
				globalReserve.Free = new Array();
			    globalReserveTotalPrice = 0;
			    free_price = 0;
			    room_price = 0;
			    table_price = 0;
				if(Shopping.Cart.reserveQty)
				delete Shopping.Cart.reserveQty;
				if(Shopping.Cart.reservePrice)
				delete Shopping.Cart.reservePrice;
				if(Shopping.Cart.reserveFee)
				delete Shopping.Cart.reserveFee;
				if(Shopping.Cart.reserve)
				delete Shopping.Cart.reserve;
				if(Shopping.Cart.reserve)
				delete	Shopping.Cart.total;
				
				
		if(type == 1)
		{
			Main.WhereAmIData.reservation = false;
			Main.OpenWhereAmIDeliveryOfCityBox()
			
		}
		else if(type == 2)
		{
			
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservation = false;
			Shopping.Start();
		}
		if(type == 3)
		{
			
			if(Main.deliveryType == "pickup") { 
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Shopping.Start();
			}
			else if(Main.deliveryType == "delivery") { 
			
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Shopping.Start();
			
			}
			else if(Main.deliveryType == "citysearch") { 
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "citysearch";
			Main.deliveryType = "citysearch";
			Shopping.Start();
			}
		}
		
		
		  },	  
    UpdateCartUserInfo: function ()
    {
        if (!Shopping.Cart)
        {
            return
        }
	
	  if(document.getElementById("payNumber").value == 0)
				{	
			if (Main.User)
			{
				
				Shopping.Cart.buyer.id = Main.User.id;
				Shopping.Cart.buyer.name = Main.User.name + " " + Main.User.lastname;
				Shopping.Cart.reserve.name = Main.User.name + " " + Main.User.lastname;
				Shopping.Cart.reserve.email = Main.User.email;
				Shopping.Cart.reserve.tel = Main.User.tel;
				
				if (Shopping.Cart.buyer.name == " ")
				{
					Shopping.Cart.buyer.name = ""
				}
				Shopping.Cart.buyer.email = Main.User.email;
				Shopping.Cart.buyer.tel = Main.User.tel;
				Shopping.Cart.buyer.colony = Main.User.colony;
				Shopping.Cart.buyer.reference = Main.NullToEmpty(Main.User.findfrom);
			}
			if (Main.WhereAmIData)
			{
					
					
				Shopping.Cart.buyer.address = Main.WhereAmIData.address;
				Shopping.Cart.buyer.city = Main.WhereAmIData.city;
				Shopping.Cart.buyer.cityname = Main.WhereAmIData.cityname
			}
			if(Main.WhereAmIDataCus) { 
			   
				Shopping.Cart.buyer.address = Main.WhereAmIDataCus.address;
				Shopping.Cart.buyer.city = Main.WhereAmIDataCus.city;
				Shopping.Cart.buyer.cityname = Main.WhereAmIDataCus.cityname
			}
			
	  }
	  if(Main.RedirectToBusiness) {
	     	Main.WhereAmIData.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Main.RedirectToBusiness, "city");
			Shopping.Cart.buyer.city=Main.WhereAmIData.city;
	  }
	   if(Shopping.ActiveCategory) {
		  
		  Shopping.Cart.buyer.city=Main.franchises[0].id;
		  }
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"id","operator":"=","value":"' + Shopping.Cart.buyer.city + '"}]}]', function (f)
        {
			
			var recData = new Array();
			   recData = JSON.parse(f);
			   
			 Shopping.Cart.buyer.tax = recData.franchises[0].tax;
             Shopping.Cart.buyer.taxtype = recData.franchises[0].taxtype;
			})
    },
    PrintBusinessList: function ()
    {
		
	
	document.getElementById("citychoose").style.display = "none";
	
	 if(Shopping.Business){
		var f ='<div style="float: left; width: 100%; min-height: 390px; margin: 7px 0px 10px 15px; background:#ff00"></div>';
		 document.getElementById("showcanvas").innerHTML = f;
	 }
		
	 document.getElementById("shoppingbox").innerHTML = Blist.CatagoriesFetch();
	
	
	 Switch.Init();
   
      document.getElementById("categoriesbox").innerHTML = Blist.CatagoriesFetchItem();

        var f = document.getElementById("businesssearch");
        f.onkeyup = function ()
        {
			
            Shopping.BusinessSearchFilter = this.value;
			
            Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true,false)
			Shopping.initializeShort();
			
			
        };
        for (d in Shopping.Categories)
        {
			
            Switch.Create("business_category_switch_" + Shopping.Categories[d].id, false);
            Switch.OnChange("business_category_switch_" + Shopping.Categories[d].id, function (a, b)
            {
				document.getElementById("business_category_all").checked = false;
				
				if(b) {
					document.getElementById(a).checked = true;
					}
				else {
					document.getElementById(a).checked = false;
					}	
					
                Shopping.SetBusinessCategoryEnabled(a.replace("business_category_switch_", ""), b)
            })
        }
		
        if (this.BusinessSearchFilter)
        {
            f.value = this.BusinessSearchFilter
        }
        this.ReturnBtnAction = Main.PutMainLeftColElems;
		
            Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true);
            Main.ActiveView = "/" + Main.WhereAmIData.cityname + "/restaurants";
            Main.Ga(Main.ActiveView)
       
    },
	 GoogleMapshowhide: function ()
	 {
		if(document.getElementById("showcanvas").style.display == "none")
		{
			if(viewDevice == "Desktop") {
			document.getElementById("showcheck").innerHTML ="<span><img src='images/step2-business-listing/map-icon.png'></span> Hide Map"
			}
			document.getElementById("showcanvas").style.display ="";
			 $(document).ready(function() { initialize(); });
		}
		else
		{
			if(viewDevice == "Desktop") {
			document.getElementById("showcheck").innerHTML ="<span><img src='images/step2-business-listing/map-icon.png'></span> Show Map"
			}
			document.getElementById("showcanvas").style.display ="none";
			
			
		}
		 
	 },


    SetBusinessCategoryEnabled: function (d, e)
    {
        var f = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", d);
		
        Shopping.Categories[f].enabled = e;
		
        Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
    },
	initializeShort: function () {
	},
    OpenBusiness: function (d,revwtru,resSearch,hidemenu)
    {
		

	if (d == ""){
		
		alert("<?= $lang_resource['Choose_Restaurant_V2'] ?>");
		return
	}
    var distance = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "distance"));
	
	currentshop = d;

		if(viewDevice == "Desktop") {	
	var shss = "";
  
		shss += '<a href="javascript:Shopping.OpenBusiness('+currentshop+')"><span class="step-logo" style="margin-left:40px;"><img src="images/step2-business-listing/place_order.png"></span><span class="step-text" style="margin-left:57px;"><?=$lang_resource['MOBILE_BUSINESS_LIST_PLACE_ORDER'];?></span></a>';
		 document.getElementById("plc_ordr").innerHTML = shss;
		}
   
	
	
	
        var c = new Date().getTime();
        Main.Aid = c;
        Main.Loading();  
		
		var operation = "";
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			operation = '{"operation":"GetReviewData","businessid":'+d+'},';
		
		 var burl = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "burl"));
		
		var burlchk = validateText(burl)
		 
		 if(burl !="")
		 {
			 if(burlchk) { 
			
			    window.location = burl;
			 }
			 else
			 {
				
				  window.location = "https://"+burl;
			  }
			 return false
		 }
		  
		  if(Main.WhereAmIData.reservation == true)
			var delTyle = "reservation";
			else 
			var delTyle = Main.WhereAmIData.collecttype;
		  
		$.post("panel/lib/front-bulk.php", 'data=[' + operation + '{"operation":"FetchAllFranchisesData"},{"operation":"FetchBusinessMenu","businessid":'+d+',"deliverytype":' + JSON.stringify(delTyle) + '},{"operation":"timescdule","businessid":' + d + '},{"operation":"pickupDeliverytime","businessid":' + d + '},{"operation":"FetchReserve","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+'},{"operation":"checkDelivery","businessid":' + d + '},{"operation":"FetchReserveBooked","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+'},{"operation":"DiscountOffer","businessid":' + d + "}]", function (a)
       {
            //alert(a)
			Main.Ready();
            if (c != Main.Aid)
            {
                return
            }
			
            if (a != "")
            {
					
                var url = location.href.split('/');
                a = JSON.parse(a);
                Shopping.Menu = a.menu;
				Shopping.offer = a.offer;
				
				Shopping.DeliveryDateschedule = a.times;
				
				Shopping.reserves = a.reserves;
				Shopping.reservesbooked = a.reservesbooked;
				
				Shopping.deliverystatus   = a.deliverystatus;
				
				
				
							
				
				
				if(Shopping.offer.length == 1)
				{
				Shopping.Cart.discountcategory = "discountoffer";
				Shopping.Cart.discounttype = a.offer[0].type;
				Shopping.Cart.discountrate = a.offer[0].rate;
				Shopping.Cart.discountminshop = a.offer[0].minshop;
			
				}
					
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				{
					Shopping.Review = a.review;
					Shopping.Review.url = url[2];
				}
					
                Main.Franchises = a.franchises;
				Main.DeliveryTimezone = a.timescdule;
				
				
				if(hidemenu) {
                Main.clicktabName = "onlyReserve"
				} else {
				Main.clicktabName = "others"	
					}
					if(Shopping.Cart.preorder)
					var prep = true;
					else 
					var prep = false;
					
                Shopping.ActiveBusinessName = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "name");
				var bOpenCloseStatus = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "open");
                Shopping.ActiveBusiness = d;
				
				if(bOpenCloseStatus == false && prep == false ) {
					
						Main.PreOrderMenuCatalogFetch(d,true);
						return false;
					
					}
				if(Main.WhereAmIData.reservation == true && hidemenu) {
					   RestMenuList.PrintBusinessAndDishes(resSearch);
					}
				else if(Main.WhereAmIData.reservation == true && viewDevice == "Mobile") {
					   RestMenuList.PrintBusinessAndDishes(resSearch);
					}
				
                if (Shopping.Menu.dishes.length == 0)
                {
					
				   var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", d);
					if(Shopping.Business[u].catalog == 0) {
						swal("Error","<?= $lang_resource['MAIN_SHOPPING_MENU_CATALOG_NO_AVAILABLE'] ?>","error");
						window.location ='./';
					} else {
						
				if(!Shopping.Cart.business[0] &&  prep == false )	{
					Main.PreOrderMenuCatalogFetch(d);
				}else{
					
					 Shopping.OpenPreorderBusiness(d,Shopping.Cart.preorderDate,Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm,resSearch);
					 
					}
						}
					
                }
                else
                { 
					RestMenuList.PrintBusinessAndDishes(resSearch);
                   
                }
            }
            else
            {
                Shopping.Menu = null;
                Shopping.ActiveBusiness = null;
                Shopping.ActiveBusinessName = null;
                alert("<?= $lang_resource['ERROR_V21'] ?>")
            }
        });
		
        if(viewDevice == "Desktop") {	
        $(".main li").removeClass("active-step");
		$(".main #plc_ordr").addClass("active-step");
		}
    },

   AddToFav: function (bid,bname) {
		
		
		
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"}]', function (b)
        {
		b =JSON.parse(b);	
		
		if(Main.NullToEmpty(b)){
						
        Main.User = b.user;
				
		if(Main.User.id)
		{
			
		$.post("panel/lib/front-main.php", "f=AddToFav&bid=" + bid+"&bname=" + bname, function (c)
        {
			alert(c)
		});
		
		}
		
		}
		else
		{
			if(viewDevice == "Mobile") {
				swal("Error","<?= $lang_resource['FRONT_LOGIN_ADD_FAVORITE'] ?>","error");
				Visuals.LoginMob()
			}else{
				swal("Error","<?= $lang_resource['FRONT_LOGIN_ADD_FAVORITE'] ?>","error");
			}
		}
				
		});
		
	},
	
	
	Getfavorite: function(bid)
   {
	   $.post("panel/lib/front-main.php", "f=Getfavorite&bid=" + bid, function (c)
        {
            alert(c)
		});
	   
   },


   FavList: function()
	{
		var c1;
		
		if(document.getElementById("favorite").checked==true)
		{
			
			$.post("panel/lib/front-main.php", "f=Getfavorite", function (c)
           {
			 
			   Shopping.Fav = c;
			   
			   Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true,false,true)
		   });
			
		}
		else
		{
			
		
			
			if(Main.deliveryType=="delivery")
			Shopping.Start();
			
			if(Main.deliveryType=="pickup"){
				if(Main.WhereAmIData.reservation == true){
					Shopping.Start();
				}else{
					Shopping.changeDelType(2);
				}
			}
		}
	},



	 OpenPreorderBusiness: function (d,dd,hh,mm,resSearch)
    {
		
	 mm = parseFloat(mm);		
	 
	 
	 
    Popup.Close();
	Forms.Clean("recover13");
	  
	if (d == ""){
		alert("<?= $lang_resource['CHOOSERESTAURANT_V21'] ?>");
		return
	}
	 var distance = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "distance"));
	currentshop = d;
	var shss = "";
   shss += '<a href="javascript:Shopping.OpenBusiness('+currentshop+')"><span class="step-logo" style="margin-left:40px;"><img src="images/step2-business-listing/place_order.png"></span><span class="step-text" style="margin-left:57px;"><?=$lang_resource['SHOPPING_PLACE_ORDER']?></span></a>';
		
    document.getElementById("plc_ordr").innerHTML = shss;
	
	   
	
        var c = new Date().getTime();
        Main.Aid = c;
        Main.Loading();  
		
		var operation = "";
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			operation = '{"operation":"GetReviewData","businessid":'+d+'},';
		
		 var burl = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "burl"));
		
		var burlchk = validateText(burl)
		 
		 if(burl !="")
		 {
			 if(burlchk) { 
			    window.location = burl;
			 }
			 else
			 {
				  window.location = "https://"+burl;
			  }
			 return false
		 }
		 
		 if(Main.WhereAmIData.reservation == true)
		var delTyle = "reservation";
		else 
		var delTyle = Main.WhereAmIData.collecttype;
		
		$.post("panel/lib/front-bulk.php", 'data=[' + operation + '{"operation":"FetchAllFranchisesData"},{"operation":"FetchReserve","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+'},{"operation":"FetchReserveBooked","businessid":' + d + '},{"operation":"FetchCurrentDate"},{"operation":"FetchBusinessPreOrderMenu","businessid":' + d + ',"date":' + dd + ',"hour":' + hh + ',"minute":' + mm + ',"deliverytype":' + JSON.stringify(delTyle) + '},{"operation":"checkpreorder","menuid":' +  Main.itemid + '},{"operation":"DiscountOffer","businessid":' + d + "}]", function (a)
       {

       
		 
		   Shopping.Cart.preorder ="true"
		   Shopping.Cart.preorderDate =dd;
		   Shopping.Cart.preordertimehh =hh;
		   Shopping.Cart.preordertimemm =mm;
		   
		   
		     $(".main li").removeClass("active-step");
			 $(".main #plc_ordr").addClass("active-step");
		   
            Main.Ready();
            if (c != Main.Aid)
            {
                return
            }
			
			
			
            if (a != "")
            {
				
					
                var url = location.href.split('/');
                a = JSON.parse(a);
				
				Shopping.deliverystatus   = a.menustatus;
		
				
				
                Shopping.Menu = a.menu;
				Shopping.offer = a.offer;
				Main.currentDate = a.currentDate;
				
				Shopping.reserves = a.reserves;
				Shopping.reservesbooked = a.reservesbooked;
					
				Shopping.deliverystatus   = a.menustatus;
				
				if(Shopping.offer.length == 1)
				{
				Shopping.Cart.discountcategory = "discountoffer";
				Shopping.Cart.discounttype = a.offer[0].type;
				Shopping.Cart.discountrate = a.offer[0].rate;
				Shopping.Cart.discountminshop = a.offer[0].minshop;
			
				}
					
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				{
					Shopping.Review = a.review;
					Shopping.Review.url = url[2];
				}
					
                Main.Franchises = a.franchises;
                

                Shopping.ActiveBusinessName = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "name");
                Shopping.ActiveBusiness = d;
					
                if (Shopping.Menu.dishes.length == 0)
                {
					Main.PreOrderMenuCatalogFetch(d);
                }
                else
                {
					
                    RestMenuList.PrintBusinessAndDishes(resSearch);
                    Main.ActiveView = "/" + Main.WhereAmIData.cityname + "/restaurants/" + Shopping.ActiveBusinessName;
                    Main.Ga(Main.ActiveView)
                }
            }
            else
            {
                Shopping.Menu = null;
                Shopping.ActiveBusiness = null;
                Shopping.ActiveBusinessName = null;
                alert("<?= $lang_resource['ERROR_V21'] ?>")
            }
        });
		
		
    },
   
	videogallery : function (f) {
		 f = JSON.parse(f);
		var k = "";
		for (x in f)
            {
		k +='<a href="#" style="float:left;">'+f[x].link+'</a>'
				}
		if(viewDevice == "Desktop") {
		if(k=="")	
		$("#video_div").css("display","none");
		else	
		document.getElementById("infovideodiv").innerHTML  = k;
		}else{
			if(k==""){	
			$("#video_div").css("display","none");
			$("#video_div_text").css("display","none");
			}
			else	
			document.getElementById("infovideodiv").innerHTML  = k;
		}
		},
	catalogMenu: function (f)
	{
		
		var catl = JSON.parse(f);
		var n = '';
		
		for (x in catl)
            {
			   var p = JSON.parse(catl[x].days); 
			   for(dd in p) {
				  
					n +='<tr>'
					n +='<td>'+ catl[x].name+'</td>'
					n +='<td>'+weekendName(p[dd])+'</td>'
					n +='<td>'+catl[x].openclosetime+'</td>'
					n +='</tr>'
		   }
				 
				
			}
		
		document.getElementById("catlogview").innerHTML = n;
	},
	Photogallery : function(f) {
		 f = JSON.parse(f);
		var k = "";
		var cnt =1;
		for (x in f)
            {
			if(cnt %3 == 1)	{
			k +='<tr>'
			}
			k +='<td><a href="#"><img src="panel/images/gallery/'+f[x].id+'/gallery.jpg"></a></td>'
			
			if(cnt %3 == 0)	{
			k +='</tr>'
			}
			cnt ++;
			}
		if(viewDevice == "Desktop") {
		if(k=="")	
		$("#photo_div").css("display","none");
		else
		document.getElementById("infophotpdiv").innerHTML  = k;
		}else{
		if(k==""){
		$("#photo_div").css("display","none");
		$("#photo_div_text").css("display","none");
		}
		else
		document.getElementById("infophotpdiv").innerHTML  = k;
		}
		
	},
	reviewprint: function (f)
	{
		
	
		document.getElementById("reviewCountText").innerHTML = "<?= $lang_resource['REVIEWSOF_V21'] ?> ("+f.length+")";
		  n ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table"><thead>';
                	 n +='<tr >';
                    	 n +='<th align="left" width="25%" style="padding-bottom: 5px" ><?= $lang_resource['DATE_V21'] ?></th>';
                         n +='<th align="left" width="35%" style="padding-bottom: 5px" ><?= $lang_resource['NAMECITY_V21'] ?></th>';
                         n +='<th align="left" width="40%" style="padding-bottom: 5px" ><?= $lang_resource['RATING_V21'] ?></th>';
                    n +='</tr>';
                n +='</thead>';
				if(f.length == 0) { 
				n +='<tr><td colspan="3" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:5px"> <?= $lang_resource['NOREVIEW_V21'] ?></td>';
				n +='</tr>';
				} else { 
				
				  for (var x in f) {
					  //alert()
                  n +='<tr>';
                     n +='<td><strong>'+f[x].pdate+'</strong></td>';
                     n +='<td><strong>'+f[x].user+'</strong></td>';
                    n +=' <td>';
                    	 n +='<table width="250px" border="0" cellspacing="0" cellpadding="0" class="demo_inner_table">';
                          n +=' <tr>';
                            n +=' <td><?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?></td>';
                            n +=' <td>';
							if(Main.NullToEmpty(f[x].quality) !="" )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
							if(Main.NullToEmpty(f[x].quality) >1)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}  	
							 
							if( Main.NullToEmpty(f[x].quality) >2)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].quality) >3)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].quality) >4 )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   				  
								
								
                             n +='</td>';
                            n +=' <td>'+ Main.NullToEmpty(f[x].quality)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +=' </tr>';
                           n +='<tr>';
                            n +=' <td><?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?></td>';
                           n +='  <td>';
                            if(Main.NullToEmpty(f[x].delivery) !="" )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
							if(Main.NullToEmpty(f[x].delivery) >1)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}  	
							 
							if( Main.NullToEmpty(f[x].delivery) >2)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].delivery) >3)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].delivery) >4 )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
                          n +='   </td>';
                             n +=' <td>'+ Main.NullToEmpty(f[x].delivery)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +=' </tr>';
                           n +='<tr>';
                            n +=' <td><?= $lang_resource['TEMPLATE_SERVICE'] ?></td>';
                             n +='<td>';
                            	 if(Main.NullToEmpty(f[x].dealer) !="" )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
							if(Main.NullToEmpty(f[x].dealer) >1)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}  	
							 
							if( Main.NullToEmpty(f[x].dealer) >2)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].dealer) >3)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].dealer) >4 )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
                             n +='</td>';
                           n +=' <td>'+ Main.NullToEmpty(f[x].dealer)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +=' </tr>';
                          n +=' <tr>';
                            n +='<td><?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?></td>';
                             n +='<td>';
                            	 if(Main.NullToEmpty(f[x].package) !="" )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
							if(Main.NullToEmpty(f[x].package) >1)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}  	
							 
							if( Main.NullToEmpty(f[x].package) >2)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].package) >3)
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								}   
								if(Main.NullToEmpty(f[x].package) >4 )
							{
                            	 n +='<div class="point"><a id="">1</a></div>';
							} else {
								 n +='<div class="non_point"><a id="">1</a></div>';
								} 
                             n +='</td>';
                             n +=' <td>'+ Main.NullToEmpty(f[x].package)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                         n +='  </tr>';
                        n +=' </table>';

                     n +='</td>';
                  n +=' </tr>';
				     
				  }
                  
				}
                n +='</table>';
				
				 document.getElementById("reviewContent").innerHTML = n;
	},
    SetDishCategoryEnabled: function (d, e)
    {
        var f = Main.GetIndexOnPropertyValueFound(Shopping.MenuCategories, "id", d);
        Shopping.MenuCategories[f].enabled = e;
        Shopping.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
    },
   
     AddToCart: function (x, y,options,comments,optionsid,total_price,Qtyi)
    {
		
		
		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		
		
		Main.Loading();
		if(Shopping.Business[w].shipping == "Pending")
		{
			
			Visuals.ChooseDeliverOption(x,y,options,comments,optionsid,total_price,quantitysec);
			return
		}
	
			
		if(x) {
			
        Shopping.ShowDishAddedGlobe($(x).offset());
		}
		
        var u = new Array();
        var G;
        var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", y);
		Main.Ready();
		
			if(Qtyi) {
				
			quantitysec =Qtyi;
          } else if(quantitysec == "0") { 
			quantitysec =1;
		}
		
		
		Main.Ready();
   
		
        var J = Shopping.Menu.dishes[F];
        var w = new Object();
        var B = new Array();
        var H;
        w.id = J.id;
        w.name = J.name;
		if(total_price) {
        w.price = total_price;
		} else {
	     w.price = J.price;
			
			}
		
		if(options) {
		  w.options=options;
		}
		
		if(comments) {
		w.comments=comments;
		}
		if(optionsid) {
		w.optionChoiceId=optionsid;
		}
		if(quantitysec) {
        w.quantity=quantitysec;
		
		} else {
		w.quantity =1;
			}
		
		if(total_price) { 	
		
	  w.total = parseFloat(total_price*quantitysec).toFixed(2);		
		} else {
		
	w.total = parseFloat(document.getElementById("dish_" + y + "_price").innerHTML.replace("", "")*quantitysec).toFixed(2);			
			}
	  
	  
        w.ingredients = u;
		
		
		if(!J.extras) {
			 var v = new Array();
			}
		else {
			var v = JSON.parse(J.extras);
			}	
        var C = J.selectedExtras;
        
		 
        for (var z in v)
        {
            for (var A in Shopping.Menu.extras)
            {
                if (v[z] == Shopping.Menu.extras[A].id)
                {
                    H = new Object();
                    H.id = Shopping.Menu.extras[A].id;
                    H.name = Shopping.Menu.extras[A].name;
                    H.price = Shopping.Menu.extras[A].price;
                    H.enabled = false;
                    B.push(H)
                }
            }
        }
		
        for (z in B)
        {
            for (A in C)
            {
                if (B[z].id == A)
                {
                    B[z].enabled = true
                }
            }
        }

        w.extras = B;
		var g = 0;
		if(IS_PAYPAL_ENABLED == 1)
		{
			for (i in Shopping.Cart.business)
			{
			   g++;
			}
		}
        var D = Main.GetIndexOnPropertyValueFound(Shopping.Cart.business, "id", Shopping.ActiveBusiness);
		
		
         if(g == 0)
        {
			if (D == -1)
			{
				var I = new Object();
				var K = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				I.id = Shopping.ActiveBusiness;
				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					I.paypal = Shopping.Business[K].paypal;
					
				if(Main.NullToEmpty(Shopping.Business[K].clientkey)!="" && Main.NullToEmpty(Shopping.Business[K].secretkey)!="" && IS_MERCADOPAGO_ENABLED == 1 )	
				{
					I.mercadopago = true;
				}
				else
				{
					I.mercadopago = false;
				}
				
				if(Main.NullToEmpty(Shopping.Business[K].environment)!="" && Main.NullToEmpty(Shopping.Business[K].merchant_id)!="" && Main.NullToEmpty(Shopping.Business[K].public_key)!="" && Main.NullToEmpty(Shopping.Business[K].private_key)!="" && IS_BRAINTREE_ENABLED == 1 )	
				{
					I.braintree = true;
				}
				else
				{
					I.braintree = false;
				}
				
				if(Shopping.Business[K].tkey != "" && Shopping.Business[K].aplid != "" && Shopping.Business[K].tkey != null && Shopping.Business[K].aplid != null ){
					I.authorize = true;
					IS_AUTHORIZEDPAYMENT_ENABLED = 1;
				}
				else
				{
					I.authorize = false;
				}
				
				if(Shopping.Business[K].parecord == "TRUE" && IS_PAYPALADAPTIVE_ENABLED == 1 )	
				{
					I.paypaladaptive = true;
				}
				else
				{
					I.paypaladaptive = false;
				}
				if(Shopping.Business[K].cardsaveid != "" && Shopping.Business[K].cardsaveid != null && Shopping.Business[K].cardsavepass != "" && Shopping.Business[K].cardsavepass != null && IS_CARDSAVE_ENABLED == 1 )	
				{
					I.cardsave = true;
				}
				else
				{
					I.cardsave = false;
				}
				
				
				I.paymethod = new Object();
				I.paymethod.cash = true;
				if (Shopping.Business[K].acceptcard == 't')
				{
					I.paymethod.card = true
				}
				if (Shopping.Business[K].acceptcard == 'f'){
					I.paymethod.card = false
				}
				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				Shopping.Cart.business.push(I);
				D = Shopping.Cart.business.length - 1
			}
			quantitysec = 0;
			Shopping.Cart.business[D].dishes.push(w);
			
			this.GetCartItemsCount();
			
		}
		
		else if((g == 1) && (Shopping.ActiveBusiness == Shopping.Cart.business[0].id))
        {

          Shopping.Cart.business[D].dishes.push(w);
          this.GetCartItemsCount();
        }
        else
		{
           alert("<?= $lang_resource['ONE_RESTAURANT'] ?>");
           Shopping.OpenBusiness(Shopping.Cart.business[0].id)
        }
		
    },

	MyAddToCart: function (x, y)
    {
        if (Main.RedirectToBusiness)
        {
            alert(Main.RedirectedMsg);
            return
        }
        Shopping.ShowDishAddedGlobe($(x).offset());
        var E = Tags.GetTags(y + "_ingredients");
        var u = new Array();
        var G;
        var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", y);
        for (var z in E)
        {
            G = new Object();
            G.id = E[z].id;
            G.caption = E[z].caption;
            G.enabled = E[z].enabled;
            u.push(G)
        }
        var J = Shopping.Menu.dishes[F];
        var w = new Object();
        var B = new Array();
        var H;
        w.id = J.id;
        w.name = J.name;
        w.price = J.price;
        w.total = document.getElementById("dish_" + y + "_price").innerHTML.replace("", "");
        w.ingredients = u;
        var C = J.selectedExtras;
        var v = JSON.parse(J.extras);
        for (var z in v)
        {
            for (var A in Shopping.Menu.extras)
            {
                if (v[z] == Shopping.Menu.extras[A].id)
                {
                    H = new Object();
                    H.id = Shopping.Menu.extras[A].id;
                    H.name = Shopping.Menu.extras[A].name;
                    H.price = Shopping.Menu.extras[A].price;
                    H.enabled = false;
                    B.push(H)
                }
            }
        }
        for (z in B)
        {
            for (A in C)
            {
                if (B[z].id == A)
                {
                    B[z].enabled = true
                }
            }
        }
        w.extras = B;
		var g = 0;
		if(IS_PAYPAL_ENABLED == 1)
		{
			for (i in Shopping.Cart.business)
			{
			   g++;
			}
		}
        var D = Main.GetIndexOnPropertyValueFound(Shopping.Cart.business, "id", Shopping.ActiveBusiness);
         if(g == 0)
        {
			if (D == -1)
			{
				var I = new Object();
				var K = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				I.id = Shopping.ActiveBusiness;
				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					I.paypal = Shopping.Business[K].paypal;
				I.paymethod = new Object();
				I.paymethod.cash = true;
				if (Shopping.Business[K].acceptcard == "t")
				{
					I.paymethod.card = false
				}
				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				Shopping.Cart.business.push(I);
				D = Shopping.Cart.business.length - 1
			}
			Shopping.Cart.business[D].dishes.push(w);
			this.GetCartItemsCount();
			Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/add/" + Shopping.ActiveBusinessName + "-" + w.name);
			Main.Ga(Main.ActiveView)
		}
		else if((g == 1) && (Shopping.ActiveBusiness == Shopping.Cart.business[0].id))
        {
          Shopping.Cart.business[D].dishes.push(w);
          this.GetCartItemsCount();
          Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/add/" + Shopping.ActiveBusinessName + "-" + w.name);
          Main.Ga(Main.ActiveView)
        }
        else
		{
           alert("<?= $lang_resource['ONE_RESTAURANT'] ?>");
           Shopping.OpenBusiness(Shopping.Cart.business[0].id)
        }
		
    },
    ShowDishAddedGlobe: function (b)
    {
		
		if(viewDevice == "Desktop") {
        b.left += 23;
		} 
		else if(viewDevice == "Mobile") {
		b.right += 23;
		}
		b.top -= 57;
        clearTimeout(Shopping.DishAddedGlobeTimeOut);
        Shopping.DishAddedGlobeTimeOut = null;
		
        $("#dishadded").stop(true, true).hide().fadeIn(250).offset(b);
        Shopping.DishAddedGlobeTimeOut = setTimeout(function ()
        {
            $("#dishadded").fadeOut(300)
        }, 950)
    },
	OrderNowButtonCheckwithMin: function ()
    {
			var e = 0;
		 for (i in Shopping.Cart.business)
        {
			<!--MINIMUM PURCHASE-->
			e = 0;
			
			for (var c in Shopping.Cart.business[i].dishes){
				e += parseInt(Shopping.Cart.business[i].dishes[c].total)
			}
			e += parseInt(globalReserveTotalPrice);
			
			
        }
		return e;
	},
    GetCartItemsCount: function ()
    {
		
		
  var f = 0;
 	var  e = 0;
	
        for (i in Shopping.Cart.business)
        {
			<!--MINIMUM PURCHASE-->
			e = 0;
			
			for (var c in Shopping.Cart.business[i].dishes){
				e += parseInt(Shopping.Cart.business[i].dishes[c].total)
			}
			e += parseInt(globalReserveTotalPrice);
			
			
			 if(viewDevice == "Mobile") {	
			 
				if (Shopping.Cart.business[i].minimum != "" && Shopping.Cart.business[i].minimum != 0){
				  if (e >= Shopping.Cart.business[i].minimum){
					  
					var mor = '<button type="button" class="btn-red" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['MOBILE_CHECKOUT_ORDER_NOW'] ?></button>'
					
					$("#min_order").empty().append(mor);
					
				  }else{
					  var mor = '<button type="button" class="btn-red order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Cart.business[i].minimum+'</button>'
					  $("#min_order").empty().append(mor);
				  }
				}
				else{
					if(e > 0)
					$(".btn-red").removeClass("order_now_btn_gray");
				}
			
			}
			else{
			if (Shopping.Cart.business[i].minimum != "" && Shopping.Cart.business[i].minimum != 0){
			  if (e >= Shopping.Cart.business[i].minimum){
				var mor = '<button type="button" class="order_now_btn" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
				$("#min_order").empty().append(mor);
				
			  }else{
				  var mor = '<button type="button" class="order_now_btn order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Cart.business[i].minimum+'</button>'
				  $("#min_order").empty().append(mor);
			  }
			}else{
				if(e > 0)
				$(".order_now_btn").removeClass("order_now_btn_gray");
			}				 
				}
			<!--MINIMUM PURCHASE-->
	 
			
            for (var d in Shopping.Cart.business[i].dishes)
            {
		
		
                f++;
	        

            }
        }

 var qn = 0;
		
		
		 if(Shopping.Cart.business) {
        for (var ff in Shopping.Cart.business)
        {
          
            for (var e in Shopping.Cart.business[ff].dishes)
            {
				
              
				qn +=Shopping.Cart.business[ff].dishes[e].quantity;
				
            }
        }
		
		
	
	if(viewDevice == "Desktop") {
              $("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> '+qn+' <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
			}
	if(viewDevice == "Mobile") {
			   $("#itemCount").html("("+qn+")");
			}	
				}

				else {
					$("#orderprice").html("0.00");
					 $("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> 0 <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
					 
				if(viewDevice == "Desktop") {
						  $("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> 0 <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
						}
				if(viewDevice == "Mobile") {
						  $("#itemCount").html("("+0+")");
						}	
						
					
		}
			if(viewDevice == "Mobile") {
				
			return ;	
			}
	if (f != 0 && lastid == "") {
		
		lastid = f - 1;
		
       
		var n = "";
		
		 n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[lastid].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[lastid].quantity;
			 if(Shopping.Cart.business[0].dishes[lastid].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+lastid+')"  style="color: #e74c3c;font-weight: bold;">'+Shopping.Cart.business[0].dishes[lastid].options+'</a></span>';
				}
			if(Shopping.Cart.business[0].dishes[lastid].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"  style="color: #333;text-decoration:none">'+Main.TitleCase(Shopping.Cart.business[0].dishes[lastid].comments)+'</a></span>';	
			  }
				 n +='</td>';
             n +='<td width="30%" align="right" style="padding-right:5px;" id="dish_' + lastid + "_" + Shopping.Cart.business[0].dishes[lastid].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[lastid].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + lastid + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + lastid + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';
			 
			 
			 

		$("#plc_rgt_in").append(n);
           Shopping.UpdateCartTotals();
	}else if (f != 0 && lastid != (f-1) && del != 1) {
		lastid = lastid + 1;


		var n = "";
	
		 n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[lastid].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[lastid].quantity;
			 if(Shopping.Cart.business[0].dishes[lastid].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+lastid+')"  style="color: #e74c3c;font-weight: bold;">'+Shopping.Cart.business[0].dishes[lastid].options+'</a></span>';
				}
			if(Shopping.Cart.business[0].dishes[lastid].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)" style="color: #333;text-decoration:none">'+Main.TitleCase(Shopping.Cart.business[0].dishes[lastid].comments)+'</a></span>';	
			  }	
				 n +='</td>';
             n +='<td width="30%" align="right" style="padding-right:5px;" style="padding-right:5px;" id="dish_' + lastid + "_" + Shopping.Cart.business[0].dishes[lastid].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[lastid].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + lastid + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + lastid + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';

	$("#plc_rgt_in").append(n);
             Shopping.UpdateCartTotals();
	}
	del = 0;
        var e = $("#cartbutton");
        if (f == 0)
        {
            e.find(".innerbox").removeClass("blue").addClass("grey").find(".caption").removeClass("captionblue").addClass("captiongrey").html("<?= $lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] ?> (" + f + ")")
        }
        else
        {
            e.find(".innerbox").removeClass("grey").addClass("blue").find(".caption").removeClass("captiongrey").addClass("captionblue").html("<?= $lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] ?> (" + f + ")")
        }
        return f
    },
   
    UpdateTotals: function ()
    {
        var d = 0;
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(2);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(2)
            }
        }
		
		
		var disprice=0;
		var distext = '';
		
		if(Shopping.Cart.discounttype)
		{
			
			
				if(Shopping.Cart.discounttype == 1)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?> ("+Shopping.Cart.discountrate +"%)";
					disprice = parseFloat((parseFloat(d)*parseFloat(Shopping.Cart.discountrate))/100);
					Shopping.Cart.discountprice = disprice;
				}
				else if(Shopping.Cart.discounttype == 2)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?>";
					disprice = parseFloat(Shopping.Cart.discountrate);
					
				}
				
				if(parseFloat(d) >= parseFloat(Shopping.Cart.discountminshop)){
						if(parseFloat(d)> parseFloat(disprice)){
							
						d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(2);
						Shopping.Cart.discountactive = true;
						
						document.getElementById("discount_div").style.display="";
						document.getElementById("discount_text").innerHTML = distext;
				
						document.getElementById("discount_price").innerHTML = Shopping.FormatPrice(disprice.toFixed(2));
						Shopping.Cart.discountprice = Shopping.FormatPrice(disprice.toFixed(2));
						}
						else{
							
						Shopping.Cart.discountprice="";
						$("#discount_div").hide();
						document.getElementById("discount_text").innerHTML = "";
					}
						
					}else{
						Shopping.Cart.discountprice="";
						$("#discount_div").hide();
						document.getElementById("discount_text").innerHTML = "";
				}
				
				
		}
		
		
		
		
		var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
		
		Shopping.Cart.tax = taxprice.toFixed(2);
		
		$("#cart_taxid").html(Shopping.Cart.tax);
		
       if(Shopping.Cart.buyer.taxtype == 1)
		{
		var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(2);
		}
		else
		{
			var totalwithTax = parseFloat(d).toFixed(2);
		}
		  
		 
		
        Shopping.Cart.total = totalwithTax;
		
		
		 if(viewDevice == "Desktop") 
      	 var buyertipsc = document.getElementById("buyertips").value;
		
		
		
		
				
		
		 totalwithTax = Shopping.FormatPrice(Shopping.FixToDecimal(totalwithTax.toString()));
		
		if(globalReserveTotalPrice != "0")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(2);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else if(globalReserveTotalPrice != "0.00")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(2);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else {
			Shopping.Cart.grandtotal = totalwithTax;
			}
			
			if (buyertipsc != "" &&  viewDevice == "Desktop")
				{
					
					Shopping.Cart.grandtotal  =  parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(buyertipsc)).toFixed(2);
					$("#cart_tips_block").show();
					
					$("#cart_tips").html(parseFloat(buyertipsc).toFixed(2));
				}
			 /*if(Shopping.Cart.buyer.tips)
			 Shopping.Cart.grandtotal = parseFloat(parseFloat(Shopping.Cart.total)+ parseFloat(Shopping.Cart.buyer.tips)).toFixed(2);*/
			 
			 
			Shopping.Cart.total =  Shopping.Cart.grandtotal;
		
		$("#orderprice").html(Shopping.Cart.total);
		
		
	
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{	
			Shopping.Cart.Total = Shopping.Cart.total;
			paypal.updatePrice(Shopping.Cart.total);
		}
    },
    UpdateCartTotals: function ()
    {
        var d = 0;
		var cn = 0;
		var qn = 0;
		
		
		
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(2);
            for (var e in Shopping.Cart.business[f].dishes)
            {
				
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(2)
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
				cn++;
            }
        }
		
		
		 if(document.getElementById(Shopping.Cart.business[0].id+"_shipping")) 
		  $("#"+Shopping.Cart.business[0].id+"_shipping").html(parseFloat(Shopping.Cart.business[0].shipping).toFixed(2));
		
		
		var disprice=0;
		var distext = '';
		
		if(Shopping.Cart.discounttype)
		{
			
			
				if(Shopping.Cart.discounttype == 1)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?> ("+Shopping.Cart.discountrate +"%)";
					disprice = parseFloat((parseFloat(d)*parseFloat(Shopping.Cart.discountrate))/100);
				}
				else if(Shopping.Cart.discounttype == 2)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?>";
					disprice = parseFloat(Shopping.Cart.discountrate);
					
				}
				
				
			
					if(parseFloat(d) >= parseFloat(Shopping.Cart.discountminshop)){
						if(parseFloat(d)> parseFloat(disprice)){
							
						d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(2);
						Shopping.Cart.discountactive = true;
						$("#showDiscount").show();
						}
						else{
						Shopping.Cart.discountprice="";
						$("#showDiscount").hide();
					}
						
					}else{
						Shopping.Cart.discountprice="";
						$("#showDiscount").hide();
					}
				
				document.getElementById("cart_dis").innerHTML = Shopping.FormatPrice(disprice.toFixed(2));
				
		}
		Shopping.Cart.discountprice = Shopping.FormatPrice(disprice.toFixed(2));
		
		if(cn > 0 )
		{
			document.getElementById("showTax").style.display ="";
		}
		
		
		
		var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
		
        Shopping.Cart.tax = taxprice.toFixed(2);
		
		
		$("#cart_taxid").html(Shopping.Cart.tax);
		
		if(Shopping.Cart.buyer.taxtype == 1)
		{
		var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(2);
		}
		else
		{
			var totalwithTax = parseFloat(d).toFixed(2);
		}
        totalwithTax = Shopping.FormatPrice(Shopping.FixToDecimal(totalwithTax.toString()));
		
		
		 
        Shopping.Cart.total = totalwithTax;
  
	  
	  if(globalReserveTotalPrice != "0")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(2);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else if(globalReserveTotalPrice != "0.00")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(2);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else {
			Shopping.Cart.grandtotal = totalwithTax;
			}
			 if(Main.NullToEmpty(Shopping.Cart.buyer.tips) > 0 || Main.NullToEmpty(Shopping.Cart.buyer.tips) !="" ) {
				 
				 Shopping.Cart.grandtotal  =  parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.buyer.tips)).toFixed(2);
				 
			 }
			
		Shopping.Cart.total =  Shopping.Cart.grandtotal;
		
		$("#orderprice").html(Shopping.Cart.total);
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{	
			Shopping.Cart.Total = totalwithTax;
		}
    },
	OpenCartGuest: function(){
		Popup.Close();
		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + Shopping.Business[w].firstCatalog + "}]", function (record){
		Checkout.OpenCart(record);
		});
	},
	OpenCartCheck: function(){
		alert(JSON.stringify(Shopping.Cart.business));
		return false;
		if (Shopping.Cart.business.length == 0)
        {
	    alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
            return
        }
		/*alert("2")*/
		 var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		
		if(Main.User){	
		Main.Loading();
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + Shopping.Business[w].firstCatalog + "}]", function (record)
				   {
					  
			Main.Ready();	    
			Checkout.OpenCart(record);
				 });
		}
		else{
			if(viewDevice == "Mobile") {
				Visuals.LoginDetails();
				}
			
			if(viewDevice == "Desktop") {
				Main.LoginDetails();
			}
		}
	},
   OpenCart: function(){
		
	},
	newOpenCart: function ()
    {
        if (this.GetCartItemsCount() == 0)
        {
            return
        }
        this.SavingOrder = false;
        var b = "";
        b += '<div class="cart">';
       
        b += '<div class="items">';
        b += '<div class="buyerinfo">';
        b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_NAME'] ?></span><input type="text" id="buyername" value="' + Main.NullToEmpty(Shopping.Cart.buyer.name) + '" onkeyup="Shopping.UserUpdate(this,\'name\')"/>';
        b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_EMAIL'] ?></span><input type="text" id="buyeremail" value="' + Main.NullToEmpty(Shopping.Cart.buyer.email) + '" onkeyup="Shopping.UserUpdate(this,\'email\')"/>';
        b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_ADDRESS'] ?></span><input type="text" id="buyeraddress" value="' + Main.NullToEmpty(Shopping.Cart.buyer.address) + '" onkeyup="Shopping.UserUpdate(this,\'address\')"/>';

        b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_NEIGHBORHOOD'] ?></span><input type="text" id="buyercolony" value="' + Main.NullToEmpty(Shopping.Cart.buyer.colony) + '" onkeyup="Shopping.UserUpdate(this,\'colony\')"/>';
        if(IS_REVIEW_ENABLED != 1 && IS_PAYPAL_ENABLED != 1)
			b += '<span class="label nonselectable default">Phone:</span><input type="text" id="buyertel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'tel\')"/>';
        b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_WHERE_DID_YOU_FIND_US']  ?></span>';
        b += '<select id="buyerreference" onchange="Shopping.UserUpdate(this,\'reference\')">';
        b += '<option value=""></option>';
        if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "radio")
        {
            b += '<option value="radio" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_RADIO'];?></option>'
        }
        else
        {
            b += '<option value="radio"><?=$lang_resource['MOBILE_CHECKOUT_RADIO'];?></option>'
        }
        if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "flyer")
        {
            b += '<option value="flyer" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_FLYER'];?></option>'
        }
        else
        {
            b += '<option value="flyer"><?=$lang_resource['MOBILE_CHECKOUT_FLYER'];?></option>'
        }
        if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "google")
        {
            b += '<option value="google" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_GOOGLE'];?></option>'
        }
        else
        {
            b += '<option value="google"><?=$lang_resource['MOBILE_CHECKOUT_GOOGLE'];?></option>'
        }
        b += "</select>";
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_PHONE'] ?></span><input type="text" id="buyertel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'tel\')"/>';
		
		b += '<span class="label nonselectable default"><?= $lang_resource['SMS_ENABLE_CHECKBOX'] ?></span>';
		b += '<input type="checkbox" id="receive-sms-check" onclick="Shopping.UpdateTwilio(this)" class="nonselectable default checkbox"/>';
		b += "</div>";
        b += '<div id="cartresultsinner">';
        b += "</div>";
        b += "</div>";
        b += '<div class="bottom">';
        b += '<div class="orderbtns">';
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			b += '<div class="order hand" id="bottom-order-btn" onclick="Shopping.PlaceOrder()"><span class="caption nonselectable"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></span></div>';
        else
			b += '<div class="order hand" onclick="Shopping.PlaceOrder()"><span class="caption nonselectable"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></span></div>';
		b += '<div class="total">';
        b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_TOTAL_PAY'] ?></span>';
        b += '<span class="price" id="orderprice"></span>';
        b += "</div></div>";
        b += "</div>";
        b += "</div>";
        Popup.Show(700, 700, b, null, function ()
        {//close popup
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				paypal.clearCheckPaymentTimer();
            document.getElementById("popupmainbuttonok").style.display = "block";
            Main.Ga(Main.ActiveView)
        }, function ()
        {
            document.getElementById("popupmainbuttonok").style.display = "none";
            Shopping.Cart.business.sort(Main.SortByProperty("name"));
			
            RestMenuList.PopulateCart();
        })
    },
   
	alrt_pop:function(){
		alert("<?= $lang_resource['order_remove_V2'] ?>");
	},

	UpdateTwilio: function(d)
	{
		
		Shopping.Cart.twilioenabledclient = d.value;
	},
    BusinessPaymentUpdate: function (d, e, f)
    {
		if(e=='braintree'){
			$(".braintree_field").show();
		}else{
			$(".braintree_field").hide();
		}
		
		if(e=='authorizednet'){
			$(".au_ne_pay").show();
		}else{
			$(".au_ne_pay").hide();
		}
		
		if(e=='cardsave'){
			$(".cardsaveclass").show();
		}else{
			$(".cardsaveclass").hide();
		}
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			var paypalCheck = document.getElementById('paymethod-paypal-check');    
			var cardCheck = document.getElementById('paymethod-card-check');
			var cashCheck = document.getElementById('paymethod-cash-check');
			var marcoCheck = document.getElementById('paymethod-marco-check');
			var paypaladaptiveCheck = document.getElementById('paymethod-paypaladaptive-check');
			var braintreeCheck = document.getElementById('paymethod-braintree-check');
			var authorizednet = document.getElementById('paymethod-authorizednet-check');
			var cardsave = document.getElementById('paymethod-cardsave-check');
			
		}
   
        switch (e)
        {
        case "cash":
         
			Shopping.Cart.business[f].paymethod.cash = true;			
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				cashCheck.checked = true
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
				if (authorizednet)
					authorizednet.checked = false;
									
				
					
				
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
				if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;
				Shopping.Cart.business[f].paymethod.paypal = false;
				Shopping.Cart.business[f].paymethod.card = false;
				Shopping.Cart.business[f].paymethod.marco = false;	
				Shopping.Cart.business[f].paymethod.paypaladaptive = false;
				Shopping.Cart.business[f].paymethod.braintree = false;
				Shopping.Cart.business[f].paymethod.authorizednet = false;
				
				
									
				Shopping.updateOrderBtn('regular');
			}
            break;
			
        case "card":
          
            Shopping.Cart.business[f].paymethod.card = true;

			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				
					cashCheck.checked = false;
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
				if (authorizednet)
					authorizednet.checked = false;

				if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;			
				Shopping.Cart.business[f].paymethod.paypal = false;
				Shopping.Cart.business[f].paymethod.cash = false;
				Shopping.Cart.business[f].paymethod.marco = false;	
				Shopping.Cart.business[f].paymethod.paypaladaptive = false;
				Shopping.Cart.business[f].paymethod.braintree = false;
				Shopping.Cart.business[f].paymethod.authorizednet = false;
			
				Shopping.updateOrderBtn('regular');
			}
            break;
			
        case "paypal":
            
			Shopping.Cart.business[f].paymethod.paypal = true;
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				
				
					cashCheck.checked = false;
				
				if (cardCheck){
					cardCheck.checked = false;
				}
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
				if (braintreeCheck)
					 braintreeCheck.checked=false;
									 
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;

				Shopping.Cart.business[f].paymethod.cash = false;

				Shopping.Cart.business[f].paymethod.card = false;
				Shopping.Cart.business[f].paymethod.marco = false;	
				Shopping.Cart.business[f].paymethod.paypaladaptive = false;
				Shopping.Cart.business[f].paymethod.braintree = false;
				Shopping.Cart.business[f].paymethod.authorizednet = false;

				
				Shopping.updateOrderBtn('paypal');
				
			}
			
            break;
			
		 case "marco":
		 
		   Shopping.Cart.business[f].paymethod.marco = true;
		   if(IS_MERCADOPAGO_ENABLED == 1 )
			{
				
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
				
					cashCheck.checked = false;
					
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
				if (authorizednet)
					authorizednet.checked = false;
					
			if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;
				
			
					
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.paypaladaptive = false;
			Shopping.Cart.business[f].paymethod.braintree = false;
			Shopping.Cart.business[f].paymethod.authorizednet = false;
			
			Shopping.updateOrderBtn('macro');
			}
		 break;
		 
		case "paypaladaptive":
		 
		   Shopping.Cart.business[f].paymethod.paypaladaptive = true;
		   if(IS_PAYPALADAPTIVE_ENABLED == 1)
			{
				
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				
					cashCheck.checked = false;
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
				if (authorizednet)
					authorizednet.checked = false;
					
			if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.marco = false;
			Shopping.Cart.business[f].paymethod.braintree = false;
			Shopping.Cart.business[f].paymethod.authorizednet = false;
			
			Shopping.updateOrderBtn('paypaladaptive');
			}
			 break;
			 
			case "braintree":
		   if(IS_BRAINTREE_ENABLED == 1 )
			{
				
			Shopping.Cart.business[f].paymethod.braintree = true;	
			
					if (cardCheck)	
					cardCheck.checked = false;
					cashCheck.checked = false;
					if (paypalCheck)	
					paypalCheck.checked = false;
					if (marcoCheck)	
					marcoCheck.checked = false;
					
					
					if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
				
					
					
					if (authorizednet)
						authorizednet.checked = false;
						
			if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;
			
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.marco = false;
			Shopping.Cart.business[f].paymethod.paypaladaptive = false;
			Shopping.Cart.business[f].paymethod.authorizednet = false;
			
			Shopping.updateOrderBtn('braintree');
			}
			break;
			
			
			case "authorizednet":
	
		   if(IS_PAYPALADAPTIVE_ENABLED == 1)
			{
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				cashCheck.checked = false;
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
				
				
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
			if (cardsave)
					cardsave.checked = false;
				
				Shopping.Cart.business[f].paymethod.cardsave = false;
				
		    Shopping.Cart.business[f].paymethod.authorizednet = true;
			Shopping.Cart.business[f].paymethod.paypaladaptive = false;
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.marco = false;
			Shopping.Cart.business[f].paymethod.braintree = false;
			
			Shopping.updateOrderBtn('authorizednet');
			}
			 break;
			 
		
		case "cardsave":
	
		   if(IS_PAYPALADAPTIVE_ENABLED == 1)
			{
				if (paypalCheck)
					paypalCheck.checked = false;
				
				if (cardCheck)
					cardCheck.checked = false;
				
					cashCheck.checked = false;
				
				if (marcoCheck)
					marcoCheck.checked = false;
				
				
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
							
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
				if (authorizednet)
					authorizednet.checked = false;
						
			Shopping.Cart.business[f].paymethod.cardsave = true;
				
		    Shopping.Cart.business[f].paymethod.authorizednet = false;
			Shopping.Cart.business[f].paymethod.paypaladaptive = false;
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.marco = false;
			Shopping.Cart.business[f].paymethod.braintree = false;
			
			Shopping.updateOrderBtn('merchant');
			}
			 break;

		 	
        }
    },
	
	
    updateOrderBtn: function(type)
        {
        var topBtn = $('#top-order-btn');
        var bottomBtn = $('#bottom-order-btn');
        switch (type)
            {
				
				
            case 'regular':
			if(viewDevice == "Desktop") {
                topBtn.replaceWith('<button class="order_btn hand" id="top-order-btn" onclick="Shopping.PlaceOrder()"><span class="caption nonselectable"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></span></button>');
                bottomBtn.replaceWith('<button class="order_btn hand pull_left" id="bottom-order-btn" onclick="Shopping.PlaceOrder()" style="margin-left:10px;"><span class="caption nonselectable"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></span></button>');
			} else if(viewDevice == "Mobile") { 
				topBtn.replaceWith('<button type="button" class="btn-red" id="top-order-btn" onclick="Shopping.PlaceOrder()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>');
                bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom-order-btn" onclick="Shopping.PlaceOrder()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>');
				
				}
				
				
				  
            break;
            case 'paypal':
                var itemId = paypal.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+paypal.createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+paypal.createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			case 'paypaladaptive':
			
                var itemId = paypaladaptive.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+paypaladaptive.createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+paypaladaptive.createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			
			 case 'macro':
			
                var itemId = mercadopago.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+mercadopago.createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+mercadopago.createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			
			case 'braintree':
			
                var itemId = braintree.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+braintree.createButton({itemId:itemId,formName:'braintreeform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+braintree.createButton({itemId:itemId,formName:'createButtonform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			
			case 'authorizednet':
                var itemId = authorizednet.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+authorizednet.createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+authorizednet.createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			
			case 'merchant':
			
				var itemId = merchant.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+merchant.createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+merchant.createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
		            break;

            }
        },

    DishCommentUpdate: function (d, f, e)
    {
        Shopping.Cart.business[f].dishes[e].comments = d.value
    },
    UserUpdate: function (f, d)
    {
	        switch (d)
        {
        case "name":
            Shopping.Cart.buyer.name = f.value;
            break;
        case "email":
            Shopping.Cart.buyer.email = f.value;
            break;
        case "address":
            Shopping.Cart.buyer.address = f.value;
            break;
        case "colony":
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				Shopping.Cart.buyer.colony = f.value;
            break;
        case "tel":
            Shopping.Cart.buyer.tel = f.value;
            break;
		case "tips":
			Shopping.Cart.buyer.tips = f.value;
			Shopping.UpdateTotals();
			break;
		case "date":
            Shopping.Cart.buyer.deliverydate = f.value;
            break;		
		case "hh":

            Shopping.Cart.buyer.deliveryhours = f.value;
			Main.MinuteCheck(f);
			
            break;	
	    case "mm":
            Shopping.Cart.buyer.deliveryminute = f.value;
			
            break;		
		case "reservename":
            Shopping.Cart.reserve.name = f.value;
			Shopping.Cart.buyer.name = f.value;
            break;
			
        case "reserveemail":
            Shopping.Cart.reserve.email = f.value;
			Shopping.Cart.buyer.email = f.value;
            break;

        case "reservetel":
            Shopping.Cart.reserve.tel = f.value;
			 Shopping.Cart.buyer.tel = f.value;
            break;
			
		case "cardno":
            Shopping.Cart.buyer.cardno = f.value;
			
            break;	
		case "expmm":
            Shopping.Cart.buyer.expmm = f.value;
			
        break;
		case "expyy":
            Shopping.Cart.buyer.expyy = f.value;
			
        break;
		
		case "braintreecard":
            Shopping.Cart.buyer.braintreecard = f.value;
            break;
		case "braintreeexpiry":
            Shopping.Cart.buyer.braintreeexpiry = f.value;
            break;
		case "braintreecvv":
            Shopping.Cart.buyer.braintreecvv = f.value;
            break;	
			
			
		case "cardsavecardno":
            Shopping.Cart.buyer.cardsavecardno = f.value;
            break;
		case "cardsaveexpmm":
            Shopping.Cart.buyer.cardsaveexpmm = f.value;
        break;
		case "cardsaveexpyy":
            Shopping.Cart.buyer.cardsaveexpyy = f.value;
        break;
		case "cardsavecvv":
            Shopping.Cart.buyer.cardsavecvv = f.value;
        break;
		
		case "cityname":
            Shopping.Cart.buyer.cityname = f.value;
        break;
		case "zip":
            Shopping.Cart.buyer.zip = f.value;
        break;
			
			
	    case "coupon":
		 if(f.value.length==10)
		 {
			if(document.getElementById("discountattck").value != 1)
			{
		    Shopping.discountcodeCheck(f.value);
			}
			else
			{
				swal("Error","<?= $lang_resource['SHOPPING_DISCOUNT_CUPON_SORRY_MULTI'] ?>","error");
			}
		 }
		 else if(f.value.length > 10)
		 {
			 
			document.getElementById("discountimg").innerHTML ='<img src="images/dis_pics/cross.png" style="padding-top: 26px">'
			if(viewDevice == "Mobile") {
			Checkout.OrderDetails()
			}
		 }
		 else if(f.value.length < 10)
		 {
		  document.getElementById("discountimg").innerHTML ='';
		  }
		 
            break;	
        case "reference":
            var e = document.getElementById("buyerreference");
            Shopping.Cart.buyer.reference = e.options[e.selectedIndex].value;
            break
        }
    },
    BusinessdishCommentUpdate: function (d, c,listid)
    {
        Shopping.Cart.business[c].dishes[listid].comments = d.value;
		
    },
	 BusinessCommentUpdate: function (d, c)
    {
       Shopping.Cart.buyer.comments = d.value;
		
    },
	
      RemoveFromCart: function (c, d)
    {
		
		
     var  quantity=Shopping.Cart.business[c].dishes[d].quantity;
       if(quantity==1){
        Shopping.Cart.business[c].dishes.splice(d, 1);
        if (Shopping.Cart.business[c].dishes.length == 0)
        {
			
			
            Shopping.Cart.business.splice(c, 1)
			var n = "";
			$("#plc_rgt_in").html(n);
			$("#orderprice").html("0.00");
			$("#cart_taxid").html("");
			
			if(viewDevice == "Desktop") {
						  $("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> 0 <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
						}
				if(viewDevice == "Mobile") {
						   
						   $("#itemCount").html("("+0+")");
						}	
        }
		
	$(".rowid_"+d).remove();
	 if(viewDevice == "Mobile") {
		 
		
			 if(GlobalPagecheck == "2")
			{
			    Checkout.OrderDetails(true);
			}
			else if(GlobalPagecheck == "3")
			{
			    Checkout.OrderDetailsPage(true);
			}
		 
			   return false;
		   }
	lastid -= 1;
	var n = "";
	if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
		
			
			 n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			 if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].options)+'</a></span>';
				}
			if(Shopping.Cart.business[0].dishes[i].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';	
			  }	
			 n +='</td>';	
             n +='<td width="30%" align="right" style="padding-right:5px;" id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';

		}del = 1;
	}
			  

	
	
                    Shopping.UpdateCartTotals();
        if (this.GetCartItemsCount() <= 0)
        {
            Popup.Close();
        }
	$("#plc_rgt_in").html(n);
        }
        else{
  		 n ='';
         var total=Shopping.Cart.business[c].dishes[d].total;
           total=total/quantity;
          var quantity=quantity-1;

		if(mychoice_data[d]) {
           mychoice_data[d]['review']['quantity']=quantity;
		}
           Shopping.Cart.business[c].dishes[d].quantity=quantity;
           Shopping.Cart.business[c].dishes[d].total=Shopping.Cart.business[c].dishes[d].total-total;
		   
		   
		   
		    if(viewDevice == "Mobile") {
					if(GlobalPagecheck == "2")
						{
							Checkout.OrderDetails(true);
							return false;
						}
						else if(GlobalPagecheck == "3")
						{
							Checkout.OrderDetailsPage(true);
							return false;
						}
						
			
					   }
           if (Shopping.Cart.business.length != 0) {
               for (var i = 0;i <= lastid;i++){
                 
				    n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			 if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #e74c3c;font-weight: bold;">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].options)+'</a></span>';
				}
			if(Shopping.Cart.business[0].dishes[i].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"  style="color:#333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';	
			  }	
			 n +='</td>';
             n +='<td width="30%" align="right" style="padding-right:5px;" id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[lastid].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';

               }
			   del = 1;
           }
           Shopping.UpdateCartTotals();
		   Shopping.GetCartItemsCount();
           if (this.GetCartItemsCount() <= 0)
           {
               Popup.Close();
           }
           $("#plc_rgt_in").html(n);

       }
	   
	    var qn = 0;
		
		
		
        for (var f in Shopping.Cart.business)
        {
          
            for (var e in Shopping.Cart.business[f].dishes)
            {
				
              
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
				
            }
        }
	
	 if(Shopping.Cart.business) {
			  if(viewDevice == "Desktop") {
						  $("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span>  '+qn+'  <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
						}
				if(viewDevice == "Mobile") {
						   $("#itemCount").html("("+qn+")");
						}	
				}
				else {
					$("#orderprice").html("0.00");
					$("#cart_taxid").html("");
					if(viewDevice == "Desktop") {
						  $("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> 0 <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
						}
				if(viewDevice == "Mobile") {
						   $("#itemCount").html("("+0+")");
						}	
		}
    },
	
	 MapReady: function () {
		
        GoogleMap.StartShapeTool();
         GoogleMap.AddShapeDrawingStyle("zone1", "#6fbc5a", 3, "#6fbc5a");
        GoogleMap.AddShapeDrawingStyle("zone2", "#4f9bc4", 5, "#4f9bc4");
        GoogleMap.AddShapeDrawingStyle("zone3", "#fac739", 5, "#fac739");
		var b = Main.WhereAmILocationData.zonesloc;
		//alert(b)
		   if (b != "") {
            b = JSON.parse(b);
			
            if (b.zone1.coordinates == "") {
                b.zone1.coordinates = new Array()
				Main.WhereAmILocationData.price1=  0;
            }
			else {
				Main.WhereAmILocationData.price1=  b.zone1.price;
				}
            GoogleMap.PrintShape("zone1", b.zone1.coordinates);
            if (b.zone2.coordinates == "") {
                b.zone2.coordinates = new Array()
				Main.WhereAmILocationData.price2=  0;
            }
			else {
				Main.WhereAmILocationData.price2=  b.zone2.price;
				}
            GoogleMap.PrintShape("zone2", b.zone2.coordinates);
            if (b.zone3.coordinates == "") {
                b.zone3.coordinates = new Array()
				Main.WhereAmILocationData.price3=  0;
            }
			else {
				Main.WhereAmILocationData.price3=  b.zone3.price;
				}
            GoogleMap.PrintShape("zone3", b.zone3.coordinates)
			
        }
		   else
		   {
			    b = new Array()
            
            GoogleMap.PrintShape("zone1", b);
			}
			
        var rec = '<div style="float:right;"><span class="deliveryprBlock" style="float:left; margin: 2px 10px 0px 0px; font-weight:bold"><?= $lang_resource['DELIVERYP_V21'] ?></span><div style="width:15px; height:15px; float:left; margin:3px 5px 0px 0px; background:#6fbc5a"></div> <span style="float:left; margin: 2px 10px 0px 0px">'+Main.WhereAmILocationData.price1+'</span><div style="width:15px; height:15px; float:left; margin:3px 5px 10px 0px; background:#4f9bc4"></div> <span style="float:left; margin: 2px 10px 10px 0px"> '+Main.WhereAmILocationData.price2+'</span><div style="width:15px; height:15px; float:left; margin:3px 5px 0px 0px; background:#fac739"></div> <span style="float:left; margin: 2px 10px 10px 0px">'+Main.WhereAmILocationData.price3+'</span></div>';
		document.getElementById("deliveryItemPrice").innerHTML = rec;
		
    },
	
	GetMaplocation: function () {
		
		
		        e= new Object();
                e.latitud = Main.WhereAmILocationData.latitud;
                e.longitud = Main.WhereAmILocationData.longitud;
                e.zoom = Main.WhereAmILocationData.zoom
     GoogleMap.Init("mapbox12", e.latitud, e.longitud, e.zoom, null, null, Shopping.MapReady, "bottomright")
		
		
		
			 },
    EmptyCart: function ()
    {
        Shopping.Cart.business = new Array();
    },
    PlaceOrder: function (paypalid)
    {
			
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			 if(viewDevice != "Mobile") {
			if (!Shopping.CanPlaceOrder())
				return;
			 }
		}
        else
		{
			
		
			if (this.SavingOrder)
			{
				return
			}
			var e;
			 if(viewDevice != "Mobile") {
			for (var d in Shopping.Cart.business)
			{
				e = 0;
				for (var c in Shopping.Cart.business[d].dishes)
				{
					e += parseFloat(Shopping.Cart.business[d].dishes[c].total)
				}
				if (Shopping.Cart.business[d].minimum != "")
				{
					if (e < Shopping.Cart.business[d].minimum)
					{
						alert("<?= $lang_resource['min_V2'] ?> " + Shopping.Cart.business[d].name + " <?= $lang_resource['min2_V2'] ?>" + Shopping.Cart.business[d].minimum + " <?= $lang_resource['min3_V2'] ?>");
						return
					}
				}
			}
			if (Shopping.Cart.buyer.name == "")
			{
				alert("<?= $lang_resource['type_name_V2'] ?>");
				return
			}
			if (Shopping.Cart.buyer.email == "" || !Main.IsEmail(Shopping.Cart.buyer.email))
			{
				alert("<?= $lang_resource['valid_email_V2'] ?>");
				return
			}
			if(Main.deliveryType == "delivery"){
			if (Shopping.Cart.buyer.address == "")
			{
				alert("<?= $lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_ADDRESS'] ?>");
				return
			}
			}
			
			if (Shopping.Cart.buyer.tel == "" || Shopping.Cart.buyer.tel == null)
			{
				alert("<?= $lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_YOUR_PHONE'] ?>");
				return
			}
			if (document.getElementById("chkout_hour").value != "ASAP")
			{
			
			
				if(document.getElementById("preorderhh").value == "") {
					swal("Error","<?= $lang_resource['SHOPPING_DELIVERY_TIME_IN_HOUR'] ?>","error");
					return
				}else if(document.getElementById("preordermin").value == "") {
					swal("Error","<?= $lang_resource['SHOPPING_DELIVERY_TIME_IN_MINUTE'] ?>","error");
					return
				}	
			}
			 }
			 
			
		}

        if (Main.LoggedInWith == "Facebook")
        {
            Facebook.Share()
        }
        else
        {
            if (Main.LoggedInWith == "Twitter")
            {
                Twitter.Share()
            }
        }
		

		Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		Shopping.Cart.customslug =Shopping.Business[0].customslug;
   
        var paypalInfo = '';
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		}
    
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
					 
					 
					    Shopping.Cart.reservestatus = true;
						
						 Shopping.Cart.reserve.name = Shopping.Cart.buyer.name;
						 Shopping.Cart.reserve.email = Shopping.Cart.buyer.email;
						 Shopping.Cart.reserve.tel = Shopping.Cart.buyer.tel;

					    Shopping.Cart.reserve.guest = Main.WhereAmIData.guest;
						Shopping.Cart.reserve.rdate = Main.WhereAmIData.rdate;
						Shopping.Cart.reserve.rhour = Main.WhereAmIData.rhour;
						Shopping.Cart.reserve.rmin = Main.WhereAmIData.rmin;
		}
			
			
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();
        this.SavingOrder = true;
		
        $.post("panel/lib/front-main.php", "f=PlaceOrder&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f) {
			
		
			
            Main.Ready();
            if (b != Main.Aid) {
                return;
            }
			
			document.getElementById("payNumber").value = 1;
		
            var errorSMSPanelConfig = false;
            var errorSMSToUser = false;
            var errorSMSToBusiness = false;
            var id = null;
            var showConfigureSMSPlugInPopUp = false;
            var showConfigureSMSPlugInPopUpText = "<?=$lang_resource['SHOPPING_CONFIGURE_YOUR_SMS_PLUG'];?>";
            var errorSMSToUserText = "<?= $lang_resource['SMS_ERROR_V2'] ?>";
            var result = null;
               
           
            if (f != "") {
                result = f.split(',');
                id = result[0]; 
				var chk = result[1]
                if(!Main.IsNumber(id)) {
                  return;
                }

                if(f.indexOf('error_sms_panel_config') > -1) {
                  
                  errorSMSPanelConfig = true;
                  showConfigureSMSPlugInPopUp = true;
                }
                if(f.indexOf('error_sms_to_user') > -1) {
                  errorSMSToUser = true;
                }
                if(f.indexOf('error_sms_to_business') > -1) {
                  errorSMSToBusiness = true;
                }
              
               
               	
				
				$(".main li").removeClass("active-step");
				$(".main #get_dlvrd").addClass("active-step");	

                Shopping.EmptyCart();
				
                this.SavingOrder = false;
				
			
				 $.post("panel/lib/front-main.php", "f=FetchOrder&id=" + id, function (c) {	
				  if(viewDevice != "Mobile") {
                                       
				 	Shopping.ShowConfirm(id,c,chk)
				  }else{
					  RestMenuList.ShowConfirmMob(id,c,chk)
				  }
					
					 });
				
						
                
            }
        });
    },
	ShowConfirm: function(id,c,chk)
	{
		
		   $(window).scrollTop(0)
				c = JSON.parse(c)
					
		  	 var abn = '<div class="main">'
			 abn += '<div class="success-dv">'
			 abn += '<center><img src="images/step5-confirm/seccess-icon.png"></center>'
			 abn += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="succes-tbl">'
			 abn += '<tr>'
			 abn += '<td>'
			 abn += '<div class="sc-left">'
			 if(chk == 'RN'){
			 abn += '<h3><?= $lang_resource['ORDER_RESERVE_THANKS_PLCED'] ?></h3>'
			 abn += '<div class="order-no"><?= $lang_resource['ORDER_RESERVE_PROCESSED'] ?> <span>#'+ id +'</span></div>'
			 }else if(chk == 'N'){
			 abn += '<h3><?= $lang_resource['ORDER_THANKS_PLCED'] ?></h3>'
			 abn += '<div class="order-no"><?= $lang_resource['ORDER_PROCESSED'] ?> <span>#'+ id +'</span></div>'
			 }else if(chk == 'R'){
			 abn += '<h3><?= $lang_resource['RESERVE_THANKS_PLCED'] ?></h3>'
			 abn += '<div class="order-no"><?= $lang_resource['RESERVE_PROCESSED'] ?> <span>#'+ id +'</span></div>'
			 }
			
			 abn += '</div>'
		
			 abn += '</td>'
			 abn += '<td>'
			 abn += '<div class="sc-right">'
			 if(chk == 'RN'){
			 abn += '<h4><?=$lang_resource['SHOPPING_PROGRESS_ORDER_AND_RESERVE'];?></h4>'
			 abn += '<center><button type="button" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button></center>'
			 abn += '<h4 style="font-weight:normal;"><?=$lang_resource['SHOPPING_NEED_CHANGE_ORDER_RESERVE'];?><br /><span style="color:#e74c3c;">'+c.name+' : '+c.tel+'</span></div> '
			 }else if(chk == 'N'){
			 abn += '<h4><?=$lang_resource['SHOPPING_KNOW_THE_PROGRESS_ORDER'];?></h4>'
			 abn += '<center><button type="button" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button></center>'
			 abn += '<h4 style="font-weight:normal;"><?=$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_ORDER'];?><br /><span style="color:#e74c3c;">'+c.name+' : '+c.tel+'</span></div> '
			 }else if(chk == 'R'){
			 abn += '<h4><?=$lang_resource['SHOPPING_PROGRESS_OF_YOUR_RESERVE'];?></h4>'
			 abn += '<center><button type="button" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button></center>'
			 abn += '<h4 style="font-weight:normal;"><?=$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_RESERVE'];?><br /><span style="color:#e74c3c;">'+c.name+' : '+c.tel+'</span></div> '
			 }
			 
			 abn += '</h4>'
			 abn += '</div>'
			
			 abn += '</td>'
			 abn += '</tr>'
			 abn += '</table>'
			 
			 abn += '<div class="social-share">'
			 abn += '<a class="st_facebook_hcount"></a>'
			 abn += '<a class="st_twitter_hcount"></a>'
			 abn += '<a class="st_sharethis_hcount"></a>'
			 abn += '<script type="text/javascript">var switchTo5x=false;</script>'
			 abn += '<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>'
			 abn += '<script type="text/javascript">stLight.options({publisher: "f6d188a2-236d-4201-838a-2fc255b8f0bf", doNotHash: true, doNotCopy: false, hashAddressBar: false});</script>'
			 abn += '</div>'
			
			 
			 abn += '</div>'
			 
			 abn += '</div>'
			 
				$("#showcanvas").html('');
			    $("#left").html(abn);
				
				$("#left").removeClass("lfet_whle");
				$("#left").addClass("lfet_whle_final");
				
				
				
				
                
                if(showConfigureSMSPlugInPopUp == true) {
                    alert(showConfigureSMSPlugInPopUpText);
                }
	  },
    CanPlaceOrder: function()
        {
			
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				if (this.SavingOrder)
				{
					return false;
				}
				var e;
				for (var d in Shopping.Cart.business)
				{
					e = 0;
					for (var c in Shopping.Cart.business[d].dishes)
					{
						e += parseFloat(Shopping.Cart.business[d].dishes[c].total)
					}
					if (Shopping.Cart.business[d].minimum != "")
					{
						if (e < Shopping.Cart.business[d].minimum)
						{
							alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_1'] ?> " + Shopping.Cart.business[d].name + " <?= $lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_2'] ?>" + Shopping.Cart.business[d].minimum + " <?= $lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_3'] ?>");
							return
						}
					}
				}
				
				if (Shopping.Cart.buyer.name == "" || !Shopping.Cart.buyer.name)
				{
					alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_NAME'] ?>");
					return false
				}
				if (Shopping.Cart.buyer.email == "" || !Main.IsEmail(Shopping.Cart.buyer.email))
				{
					alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>");
					return false
				}
				if(Main.deliveryType == "delivery"){
				if (Shopping.Cart.buyer.address == "" || !Shopping.Cart.buyer.address)
				{
					alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>");
					return false
				}
				if (Shopping.Cart.buyer.colony == "" || !Shopping.Cart.buyer.colony)
				{
					alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_NEIGHBORHOOD'] ?>");
					return false
				}
				}
				
				if (Shopping.Cart.buyer.tel == "" || !Shopping.Cart.buyer.tel)
				{
					alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_PHONE'] ?>");
					return false
				}
				if(IS_AUTHORIZEDPAYMENT_ENABLED ==1) {
					
						var authorizednet = document.getElementById('paymethod-authorizednet-check');
						if (document.getElementById('paymethod-authorizednet-check') && authorizednet.checked){
						if (Shopping.Cart.buyer.cardno == "" || !Shopping.Cart.buyer.cardno)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.expmm == "" || !Shopping.Cart.buyer.expmm)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.expyy == "" || !Shopping.Cart.buyer.expyy)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY_ALERT'] ?>","error");
							return false;
						}
						}
				}
				
				if(document.getElementById('paymethod-cardsave-check')) {
					var cardsave = document.getElementById('paymethod-cardsave-check');
					if (cardsave.checked){
						if (Shopping.Cart.buyer.address == "" || !Shopping.Cart.buyer.address)
						{
							swal("Error","<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>","error");
							return false
						}
						if (Shopping.Cart.buyer.colony == "" || !Shopping.Cart.buyer.colony)
						{
							swal("Error","<?= $lang_resource['SHOPPING_FOURTH_ERROR_NEIGHBORHOOD'] ?>","error");
							return false
						}
						if (Shopping.Cart.buyer.cardsavecardno == "" || !Shopping.Cart.buyer.cardsavecardno)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.cardsaveexpmm == "" || !Shopping.Cart.buyer.cardsaveexpmm)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.cardsaveexpyy == "" || !Shopping.Cart.buyer.cardsaveexpyy)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.cardsavecvv == "" || !Shopping.Cart.buyer.cardsavecvv)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.cityname == "" || !Shopping.Cart.buyer.cityname)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY_ALERT'] ?>","error");
							return false;
						}
						if (Shopping.Cart.buyer.zip == "" || !Shopping.Cart.buyer.zip)
						{
							swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP_ALERT'] ?>","error");
							return false;
						}
					}
				}
				
			if(document.getElementById("chkout_hour"))	{
			if (document.getElementById("chkout_hour").value != "ASAP")
			{
			
			
				if(document.getElementById("preorderhh").value == "") {
					swal("Error","<?= $lang_resource['SHOPPING_DELIVERY_TIME_IN_HOUR'] ?>","error");
					return false
				}
				else if(document.getElementById("preordermin").value == "") {
					swal("Error","<?= $lang_resource['SHOPPING_DELIVERY_TIME_IN_MINUTE'] ?>","error");
					return false
				}	
			}
			}
				
				return true;
			}
        },


    FormatPrice: function (b)
    {
        if (b == "0.00")
        {
            return "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"
        }
        return parseFloat(b).toFixed(2);
    },
	Preorder: function (d){
		Main.PreOrderMenuCatalogFetch();
		 },
	PlaceOrderMacro: function (paypalid,paymentgetway)
    {
		

        var paypalInfo = '';
		
		
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		
     
	 
	 
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
			
		
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return false;
            }
			if(paymentgetway=="paypaladaptive"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypaladaptive/samples/SimpleSamples/ParallelPay.php?id="+f;
			}else{
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/mercadopago/mercadopago_ipncustom.php?id="+f;
			}
			Shopping.EmptyCart();
             
			 
            
         
        });
        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/placeorder");
    },
	PlaceOrderAuthorised: function (paypalid)
    {
        var paypalInfo = '';
		
		
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		
	 
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
			
			
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return false;
            }
			
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/authorizenet/authorizenet.php?id="+f;
			
			Shopping.EmptyCart();
         
        });
        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/placeorder");
    },
	PlaceOrderMarchant: function (paypalid)
    {
		

        var paypalInfo = '';
		
		
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		
     
	 
	 
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
		
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return false;
            }
			window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/worldpay/marchent.php?id="+f;
			
			Shopping.EmptyCart();
             
			 
            
         
        });
        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/placeorder");
    },
	
	PlaceOrderBrain: function (paypalid)
    {
		

        var paypalInfo = '';
		
		
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		
     
	 
	 
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbrainTree&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
		
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return false;
            }
			
			window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/braintreepayments/braintree_ipncustom.php?iid="+f;
			
			Shopping.EmptyCart();
             
			 
            
         
        });
        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/placeorder");
    },
	
	
    FixToDecimal: function (f)
    {
        if (f == "null")
        {
            return f
        }
        while (f.indexOf("..") != -1)
        {
            f = f.replace("..", ".")
        }
        var h = f.split(".");
        var e = h.length;
        if (e == 1)
        {
            if (h[0].length > 0)
            {
                f = h[0] + ".00"
            }
            else
            {
                f = "0.00"
            }
        }
        else
        {
            if (e > 1)
            {
                var g = "00";
                if (h[1])
                {
                    if (h[1].length > 1)
                    {
                        g = h[1]
                    }
                    else
                    {
                        g = h[1] + "0"
                    }
                }
                f = h[0] + "." + g
            }
        }
        return f
    },
    ConfigObject: function ()
    {
        this.Config = new Object();
        this.Config.Business = new Object();
        this.Config.Business.List = new Object();
        this.Config.Business.List.SortBy = "name";
        this.Config.Business.List.SortByStatus = "min";
        this.Config.Dishes = new Object();
        this.Config.Dishes.List = new Object();
        this.Config.Dishes.List.SortBy = "name";
        this.Config.Dishes.List.SortByStatus = "min"
    },
    Return: function ()
    {
        if (Main.RedirectToBusiness)
        {
            alert(Main.RedirectedMsg);
            return
        }
        if (this.ReturnBtnAction)
        {
            this.ReturnBtnAction()
        }
    },
     changecatclass: function(frm,val)
    {
		if(viewDevice == "Mobile") {
			var a=val;
		} else {
	var a=frm.value;
		}
	
	
	
	var captionClass = "";	
	
	if ( a == "-1") {
		for (var xs in Shopping.MenuCategories)
            {
				
					Shopping.MenuCategories[xs].enabled = true;
				
			}
			
		RestMenuList.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
			
	 
	}else{
		for (var xy in Shopping.MenuCategories)
            {
				if(Shopping.MenuCategories[xy].id == a)
				{
					Shopping.MenuCategories[xy].enabled = true;
				}
				else
				{
					Shopping.MenuCategories[xy].enabled = false;
				}
				
			}
	  
	 RestMenuList.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
	}
	
    },
	CloseBusinessText: function ()
    {
    	swal("Error","<?= $lang_resource['SHOPPING_CLOSE_ORDER_ALERTTEXT'] ?>","error");
		return false;
    },
	discountcodeCheck: function (code)
	 {
		var bid = Shopping.Cart.business[0].id;
		var total = Shopping.Cart.total;
		
		var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
       
		
	 $.post("panel/lib/discountcode_front.php", "f=FindDiscountcode&code=" + code +"&bid="+ bid+"&total="+ total, function (c) {
		 
		
		  Main.Ready(true);
            if (b != Main.Aid)
            {
                return;
            }
			 c = JSON.parse(c);
			 if(c.text == true)
			 {	 
			document.getElementById("discountattck").value = 1;
			Shopping.Cart.discountcategory = "discountcode";
			Shopping.Cart.discountcode = c.discountcode;
			Shopping.Cart.discounttype = c.discounttype;
			Shopping.Cart.discountrate = c.discountrate;
			Shopping.Cart.discountminshop = c.discountminshop;
			Shopping.Cart.minshop = 0; 
			
			if(viewDevice == "Desktop") {
			document.getElementById("fieldid").innerHTML ='<input type="text" class="field_text_ck" id="discountcoupon" value="'+ c.discountcode +'" readonly="readonly" />'
			}else{
			document.getElementById("fieldid").innerHTML ='<input type="text" class="field-text" id="discountcoupon" value="'+ c.discountcode +'" readonly="readonly" />'
			}
			document.getElementById("discountimg").innerHTML ='<img src="images/dis_pics/right.png" >';
			document.getElementById("discounttext").innerHTML ='Coupon applied';
			Shopping.UpdateTotals();
			 }
			 else
			 {
				document.getElementById("discountimg").innerHTML ='<img src="images/dis_pics/cross.png" >'
			 }
			
		
	
        })
	 },
	
	  openCloseShop: function (vl)
    {
		Main.OpenCloseValue = vl.value;
		Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true,false,false,true)
		
		
		
       
    },
	IsNumberKey: function (b) {
	var a = (b.which) ? b.which : event.keyCode;
	if (a != 46 && a > 31 && (a < 48 || a > 57)) {
	return false
	}
	return true
	},
	 DiscountCommentUpdate: function (d, c)
    {
        Shopping.Cart.discountcomments = d.value
    },
	<!--Reserve------------------------------------------->
	ReserveBookRoom: function(id,count,price){
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		$("#ReservatioPayModule").show();	
		$("#"+id+"_"+count+"").toggleClass("booked");
		if(globalReserve.Room.indexOf(id+"_"+count) == "-1"){
			
			globalReserve.Room[globalReserve.Room.length] = id+"_"+count;
			room_price = globalReserve.Room.length * price;
		}else{
			
			var pos = globalReserve.Room.indexOf(id+"_"+count);	
			if (pos > -1) {
				globalReserve.Room.splice(pos, 1);
				room_price = globalReserve.Room.length * price;
			}
		}
		
	
		document.getElementById("room_qty").innerHTML = globalReserve.Room.length;
		
		
		
		document.getElementById("room_price").innerHTML = parseFloat(room_price).toFixed(2);
		
		globalReserveTotalPrice = room_price +table_price + free_price;
		if(globalReserve.Room.length == 0){
			$("#room_av").hide();
		}else{
			$("#room_av").show();	
		}
		if(globalReserveTotalPrice == 0){
			$("#total_av").hide();
		}else{
			$("#total_av").show();	
		}
		
		document.getElementById("total_price").innerHTML = parseFloat(globalReserveTotalPrice).toFixed(2);
	
		
		Shopping.Cart.reserveQty.Room = globalReserve.Room;
		Shopping.Cart.reservePrice.Room = parseFloat(room_price).toFixed(2);
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		
		Shopping.Cart.total = grand_total;
		
		
		
		
		
				 var d = 0;
	
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(2);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(2)
            }
        }
		
		var grand_total = parseFloat(parseFloat(d)+parseFloat(globalReserveTotalPrice)).toFixed(2)
		
	Shopping.Cart.grandtotal = grand_total;
		

		if(globalReserveTotalPrice > 0){
			$("#reserve_paymethod").show();	
		}else{
			$("#reserve_paymethod").hide();	
		}
		
		Shopping.GetCartItemsCount()
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			
			RestMenuList.ReserveplusOrderContent();	
			Shopping.UpdateCartTotals();
			
			
		}else{
			$("#chk_reserve").hide();
		}
		
	
	},	
	ReserveBookTable: function(id,count,price){
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		$("#ReservatioPayModule").show();	
		$("#"+id+"_"+count+"").toggleClass("booked2");
		if(globalReserve.Table.indexOf(id+"_"+count) == "-1"){
			globalReserve.Table[globalReserve.Table.length] = id+"_"+count;
			table_price = globalReserve.Table.length * price;
		}else{
			var pos = globalReserve.Table.indexOf(id+"_"+count);	
			if (pos > -1) {
				globalReserve.Table.splice(pos, 1);
				table_price = globalReserve.Table.length * price;
			}
		}
		
		
		globalReserveTotalPrice = room_price +table_price + free_price;
		
		if(globalReserve.Table.length == 0){
			$("#table_av").hide();
		}else{
			$("#table_av").show();	
		}
		if(globalReserveTotalPrice == 0){
			$("#total_av").hide();
		}else{
			$("#total_av").show();	
		}
		document.getElementById("table_qty").innerHTML = globalReserve.Table.length;
		
		document.getElementById("table_price").innerHTML = parseFloat(table_price).toFixed(2);
		
		globalReserveTotalPrice = parseFloat(room_price +table_price + free_price).toFixed(2);
		
		
		
		
		
		Shopping.Cart.reserveQty.Table = globalReserve.Table;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		Shopping.Cart.reservePrice.Table = parseFloat(table_price).toFixed(2);
		
		document.getElementById("total_price").innerHTML = globalReserveTotalPrice;
		
		
		
		
		
				 var d = 0;
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(2);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(2)
            }
        }
		var grand_total = parseFloat(parseFloat(d)+parseFloat(globalReserveTotalPrice)).toFixed(2)
		
		Shopping.Cart.grandtotal = grand_total;
		Shopping.Cart.total = grand_total;
		
		if(globalReserveTotalPrice > 0){
			$("#reserve_paymethod").show();	
		}else{
			$("#reserve_paymethod").hide();	
		}
		
		Shopping.GetCartItemsCount()
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			RestMenuList.ReserveplusOrderContent();	
			
			Shopping.UpdateCartTotals();
			
		} else {
			$("#chk_reserve").hide();
		
		}
		
	
	},	
	ReserveBookFree: function(id,count,price){
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		$("#ReservatioPayModule").show();	
		$("#"+id+"_"+count+"").toggleClass("booked");
		if(globalReserve.Free.indexOf(id+"_"+count) == "-1"){
			globalReserve.Free[globalReserve.Free.length] = id+"_"+count;
			free_price = globalReserve.Free.length * price;
		}else{
			var pos = globalReserve.Free.indexOf(id+"_"+count);	
			if (pos > -1) {
				globalReserve.Free.splice(pos, 1);
				free_price = globalReserve.Free.length * price;
			}
		}
		globalReserveTotalPrice = room_price +table_price + free_price;
		if(globalReserve.Free.length == 0){
			$("#free_av").hide();
		}else{
			$("#free_av").show();	
		}
		if(globalReserveTotalPrice == 0){
			$("#total_av").hide();
		}else{
			$("#total_av").show();	
		}
		
		document.getElementById("free_qty").innerHTML = globalReserve.Free.length;
		document.getElementById("free_price").innerHTML = parseFloat(free_price).toFixed(2);
		
		globalReserveTotalPrice = parseFloat(room_price +table_price + free_price).toFixed(2);
		
		document.getElementById("total_price").innerHTML = globalReserveTotalPrice;
		
		
		
				 var d = 0;
				 
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(2);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(2)
            }
        }
		var grand_total = parseFloat(parseFloat(d)+parseFloat(globalReserveTotalPrice)).toFixed(2)
		
		Shopping.Cart.reserveQty.Free = globalReserve.Free;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		Shopping.Cart.grandtotal = grand_total;
		Shopping.Cart.reservePrice.Free = parseFloat(free_price).toFixed(2);
		Shopping.Cart.total = grand_total;
		
		

		if(globalReserveTotalPrice > 0){
			$("#reserve_paymethod").show();	
		}else{
			$("#reserve_paymethod").hide();	
		}
		
		
		Shopping.GetCartItemsCount()
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			RestMenuList.ReserveplusOrderContent();	
			Shopping.UpdateCartTotals();
			
		}else{
			$("#chk_reserve").hide();
		}
		
		
		
	
	},
	SearchSaveReserveTime: function(){
		
		
		
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "" && Forms.Form.reserveform.fields.rmin.value == ""){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		
		Main.WhereAmIData.guest = Forms.Form.reserveform.fields.guest.value;
		Main.WhereAmIData.rdate = document.getElementById("rdate").value;
		Main.WhereAmIData.rhour = Forms.Form.reserveform.fields.rhour.value;
		Main.WhereAmIData.rmin = Forms.Form.reserveform.fields.rmin.value;
		reservetab = 1;
		var globalReserve = new Object();
		globalReserve.Room = new Array();
		globalReserve.Table = new Array();
		globalReserve.Free = new Array();
		var globalReserveTotalPrice = 0;
		var free_price = 0;
		var room_price = 0;
		var table_price = 0;

		 if(Shopping.Cart.preorder == "true"){
		   Shopping.OpenPreorderBusiness(currentshop,Shopping.Cart.preorderDate,Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm,true)
		 }else{
		   Shopping.OpenBusiness(currentshop,"",true);
		 }
	},
	ReservePaymentMob: function (){
				if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
		
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		
       	Shopping.Cart.reserve.guest = Main.WhereAmIData.guest;
        Shopping.Cart.reserve.rdate = Main.WhereAmIData.rdate;
        Shopping.Cart.reserve.rhour = Main.WhereAmIData.rhour;
        Shopping.Cart.reserve.rmin = Main.WhereAmIData.rmin;
		if (document.getElementById("reservename").value == ""){
				alert("<?= $lang_resource['type_name_V2'] ?>");
				$("#reservename").focus();
				return
		}
		if (document.getElementById("reserveemail").value == "" || !Main.IsEmail(document.getElementById("reserveemail").value)){
				alert("<?= $lang_resource['valid_email_V2'] ?>");
				$("#reserveemail").focus();
				return
		}
		if (document.getElementById("reservetel").value== "" || document.getElementById("reservetel").value == null){
				alert("<?= $lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_YOUR_PHONE'] ?>");
				$("#reservetel").focus();
				return
		}
		Shopping.Cart.reserveQty.Free = globalReserve.Free;
		Shopping.Cart.reserveQty.Table = globalReserve.Table;
		Shopping.Cart.reserveQty.Room = globalReserve.Room;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		
		Shopping.Cart.reservestatus = true;
		Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		Shopping.Cart.customslug = Shopping.Business[0].customslug;
		Payment.ReservatioPayment();
				}
			else {
				swal("Error","<?= $lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'] ?>","error");				
			}	
		
		},
	ReserveNowMob: function (paypalid){
		
		var I = new Object();
				var K = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				I.id = Shopping.ActiveBusiness;
				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					I.paypal = Shopping.Business[K].paypal;
				I.paymethod = new Object();
				I.paymethod.cash = true;
				if (Shopping.Business[K].acceptcard == "t")
				{
					I.paymethod.card = false
				}
				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				Shopping.Cart.business.push(I);
				
				
		
		var paypalInfo = "";
		
		if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		  var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        this.SavingOrder = true;
        $.post("panel/lib/front-main.php", "f=PlaceOrder&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f) {
			
			
			
		 
            Main.Ready(true);
            if (b != Main.Aid) {
                return;
            }
			document.getElementById("payNumber").value = 1;
            var errorSMSPanelConfig = false;
            var errorSMSToUser = false;
            var errorSMSToBusiness = false;
            var id = null;
            var showConfigureSMSPlugInPopUp = false;
            var showConfigureSMSPlugInPopUpText = "<?=$lang_resource['SHOPPING_CONFIGURE_YOUR_SMS_PLUG'];?>";
            var errorSMSToUserText = "<?= $lang_resource['SMS_ERROR_V2'] ?>";
            var result = null;
               
        
            if (f != "") {
                result = f.split(',');
                id = result[0]; // always at zero
                if(!Main.IsNumber(id)) {
                  return;
                }

                if(f.indexOf('error_sms_panel_config') > -1) {
                  errorSMSPanelConfig = true;
                  showConfigureSMSPlugInPopUp = true;
                }
                if(f.indexOf('error_sms_to_user') > -1) {
                  errorSMSToUser = true;
                }
                if(f.indexOf('error_sms_to_business') > -1) {
                  errorSMSToBusiness = true;
                }
              
                Popup.Close();
                $(".menu_bars li").removeClass("selectd");
                $(".menu_bars .get_dlvrd").addClass("selectd");		

                Shopping.EmptyCart();
                this.SavingOrder = false;
				
				 $.post("panel/lib/front-main.php", "f=FetchOrder&id=" + id, function (c) {	
				 
				 
					  RestMenuList.ShowConfirmMob(id,c)
				 
					
					 });
			
			<!--ordersuccess end-->
			
                $("#left").html(abn);
            
                
                if(showConfigureSMSPlugInPopUp == true) {
                    alert(showConfigureSMSPlugInPopUpText);
                }
            }
        });
		
		
			},
	ReserveNow: function (paypalid){
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			
			
		
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		
       	Shopping.Cart.reserve.guest = Main.WhereAmIData.guest;
        Shopping.Cart.reserve.rdate = Main.WhereAmIData.rdate;
        Shopping.Cart.reserve.rhour = Main.WhereAmIData.rhour;
        Shopping.Cart.reserve.rmin = Main.WhereAmIData.rmin;
		if (document.getElementById("reservename").value == ""){
				alert("<?= $lang_resource['type_name_V2'] ?>");
				$("#reservename").focus();
				return
		}
		if (document.getElementById("reserveemail").value == "" || !Main.IsEmail(document.getElementById("reserveemail").value)){
				alert("<?= $lang_resource['valid_email_V2'] ?>");
				$("#reserveemail").focus();
				return
		}
		if (document.getElementById("reservetel").value== "" || document.getElementById("reservetel").value == null){
				alert("<?= $lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_YOUR_PHONE'] ?>");
				$("#reservetel").focus();
				return
		}
		
		
		Shopping.Cart.reserveQty.Free = globalReserve.Free;
		Shopping.Cart.reserveQty.Table = globalReserve.Table;
		Shopping.Cart.reserveQty.Room = globalReserve.Room;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		
		Shopping.Cart.reservestatus = true;
		Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		Shopping.Cart.customslug = Shopping.Business[0].customslug;
   
        var paypalInfo = '';
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		}
		
		var I = new Object();
				var K = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				I.id = Shopping.ActiveBusiness;
				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					I.paypal = Shopping.Business[K].paypal;
				I.paymethod = new Object();
				I.paymethod.cash = true;
				if (Shopping.Business[K].acceptcard == "t")
				{
					I.paymethod.card = false
				}
				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				Shopping.Cart.business.push(I);
				
		
		Shopping.Cart.total = globalReserveTotalPrice;	
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        this.SavingOrder = true;
        $.post("panel/lib/front-main.php", "f=PlaceOrder&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f) {
			
			
		
		 
            Main.Ready(true);
            if (b != Main.Aid) {
                return;
            }
			document.getElementById("payNumber").value = 1;
            var errorSMSPanelConfig = false;
            var errorSMSToUser = false;
            var errorSMSToBusiness = false;
            var id = null;
            var showConfigureSMSPlugInPopUp = false;
            var showConfigureSMSPlugInPopUpText = "Please configure your SMS plug in.";
            var errorSMSToUserText = "<?= $lang_resource['SMS_ERROR_V2'] ?>";
            var result = null;
			
			
            if (f != "") {
                result = f.split(',');
                id = result[0]; 
				var chk = result[1]
                if(!Main.IsNumber(id)) {
                  return;
                }

                if(f.indexOf('error_sms_panel_config') > -1) {
                  errorSMSPanelConfig = true;
                  showConfigureSMSPlugInPopUp = true;
                }
                if(f.indexOf('error_sms_to_user') > -1) {
                  errorSMSToUser = true;
                }
                if(f.indexOf('error_sms_to_business') > -1) {
                  errorSMSToBusiness = true;
                }
              
                Popup.Close();
                $(".menu_bars li").removeClass("selectd");
                $(".menu_bars .get_dlvrd").addClass("selectd");		

                Shopping.EmptyCart();
                this.SavingOrder = false;
				
				 $.post("panel/lib/front-main.php", "f=FetchOrder&id=" + id, function (c) {	
				  if(viewDevice != "Mobile") {
				 	Shopping.ShowConfirm(id,c,chk)
				  }else{
					  RestMenuList.ShowConfirmMob(id,c,chk)
				  }
					
					 });
			
				
			
			
                $("#left").html(abn);
              
                if(showConfigureSMSPlugInPopUp == true) {
                    alert(showConfigureSMSPlugInPopUpText);
                }
            }
        });
			
		}
		else{
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'] ?>","error");
			return
		}

	},
	ReserveNowBefore: function (paypalid,val){
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			
			
		
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			swal("Error","<?= $lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'] ?>","error");
			return
		}
		
       	Shopping.Cart.reserve.guest = Main.WhereAmIData.guest;
        Shopping.Cart.reserve.rdate = Main.WhereAmIData.rdate;
        Shopping.Cart.reserve.rhour = Main.WhereAmIData.rhour;
        Shopping.Cart.reserve.rmin = Main.WhereAmIData.rmin;
		if (Shopping.Cart.buyer.name == ""){
			swal("Error","<?= $lang_resource['type_name_V2'] ?>","error");
			$("#reservename").focus();
			return
		}
		if (Shopping.Cart.buyer.email == "" || !Main.IsEmail(Shopping.Cart.buyer.email)){
			swal("Error","<?= $lang_resource['valid_email_V2'] ?>","error");
			$("#reserveemail").focus();
			return
		}
		if (Shopping.Cart.buyer.tel == "" || Shopping.Cart.buyer.tel == null){
			swal("Error","<?= $lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_YOUR_PHONE'] ?>","error");
			$("#reservetel").focus();
			return
		}
		
		
		
		Shopping.Cart.reserveQty.Free = globalReserve.Free;
		Shopping.Cart.reserveQty.Table = globalReserve.Table;
		Shopping.Cart.reserveQty.Room = globalReserve.Room;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		
		Shopping.Cart.reservestatus = true;
		Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		Shopping.Cart.customslug = Shopping.Business[0].customslug;
   
        var paypalInfo = '';
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		}
		
		var I = new Object();
				var K = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				I.id = Shopping.ActiveBusiness;
				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					I.paypal = Shopping.Business[K].paypal;
				I.paymethod = new Object();
				I.paymethod.cash = true;
				if (Shopping.Business[K].acceptcard == "t")
				{
					I.paymethod.card = false
				}
				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				Shopping.Cart.business.push(I);
				
		
		Shopping.Cart.total = globalReserveTotalPrice;	
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        this.SavingOrder = true;
        $.post("panel/lib/front-main.php", "f=PlaceorderreserveBefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f) {
			
		
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return false;
            }
		if(val == 0)	{
	window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/braintreepayments/braintree_ipncustom.php?iid="+f;
		}
		else if(val == 1) {
		window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/authorizenet/authorizenet.php?id="+f;
			
			}
		else if(val == 2) {
		window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/worldpay/marchent.php?id="+f;
			
			}	
	Shopping.EmptyCart();
		});
   }
   	else{
   		swal("Error","<?= $lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'] ?>","error");
	  	return
	}

	},
	
	BusinessReserveUpdate: function (d, e, f)
    {
		if(e=='braintree'){
			$(".braintree_field").show();
		}else{
			$(".braintree_field").hide();
		}
		
		if(e=='authorizednet'){
			$(".au_ne_pay").show();
		}else{
			$(".au_ne_pay").hide();
		}
		
		if(e=='cardsave'){
			$(".cardsaveclass").show();
		}else{
			$(".cardsaveclass").hide();
		}
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			var paypalCheck = document.getElementById('reserve-paypal-check');    
			var cardCheck = document.getElementById('reserve-card-check');
			var cashCheck = document.getElementById('reserve-cash-check');
			var marcoCheck = document.getElementById('reserve-marco-check');
			var paypaladaptiveCheck = document.getElementById('reserve-paypaladaptive-check');
			var braintreeCheck = document.getElementById('reserve-braintree-check');
			var authorizednet = document.getElementById('reserve-authorizednet-check');
			var cardsave = document.getElementById('reserve-cardsave-check');
			
		}
  
        switch (e)
        {
        case "cash":
			
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				if (paypalCheck)
					paypalCheck.checked = false;
				if (cardCheck)
					cardCheck.checked = false;
				if (marcoCheck)
					marcoCheck.checked = false;
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;	
					
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;			
					
				Shopping.Cart.reserve.cash = true;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.paypaladaptive = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
				
				
				

				Shopping.updateReserveBtn('regular');
			}
            break;
        case "card":

			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				if (paypalCheck)
					paypalCheck.checked = false;
					cashCheck.checked = false;
				if (marcoCheck)
					marcoCheck.checked = false;
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;				
					
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = true;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.paypaladaptive = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
				
				Shopping.updateReserveBtn('regular');
			}
            break;
        case "paypal":
            if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				if (cardCheck)
					cardCheck.checked = false;
					
					cashCheck.checked = false;
				if (marcoCheck)
					marcoCheck.checked = false;
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;							
					
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = true;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.paypaladaptive = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
				
				Shopping.updateReserveBtn('paypal1',f);

			}
			
            break;
		
			
		 case "marco":
		   if(IS_MERCADOPAGO_ENABLED == 1 )
			{
			
				if (paypalCheck)
					paypalCheck.checked = false;
				if (cardCheck)
					cardCheck.checked = false;
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;	
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;						

					cashCheck.checked = false;
			
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = true;	
				Shopping.Cart.reserve.paypaladaptive = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
			
			Shopping.updateReserveBtn('macro',f);
			}
		 
		 	break;
			
			case "paypaladaptive":
		 
		   
		   if(IS_PAYPALADAPTIVE_ENABLED == 1)
			{
				
				
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				
					cashCheck.checked = false;
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;	
					
				Shopping.Cart.reserve.paypaladaptive = true;		
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
			
			Shopping.updateReserveBtn('paypaladaptive',f);
			}
			 break;
			 
			 
			 case "braintree":
		 
				
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				
					cashCheck.checked = false;
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (cardsave)
					cardsave.checked = false;	
					
				Shopping.Cart.reserve.paypaladaptive = false;		
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
			
			Shopping.updateReserveBtn('braintree',f);
		
			 break;
			 case "authorizednet":
		        
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				
					cashCheck.checked = false;
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
				if (cardsave)
					cardsave.checked = false;	
					
				Shopping.Cart.reserve.paypaladaptive = false;		
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = false;
			
			Shopping.updateReserveBtn('authorizednet',f);
			
			 break;
			 case "cardsave":
		 
				
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				
					cashCheck.checked = false;
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				if (braintreeCheck)
					braintreeCheck.checked = false;
				if (authorizednet)
					authorizednet.checked = false;
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;	
					
				Shopping.Cart.reserve.paypaladaptive = false;		
				Shopping.Cart.reserve.cash = false;
				Shopping.Cart.reserve.paypal = false;
				Shopping.Cart.reserve.card = false;
				Shopping.Cart.reserve.marco = false;	
				Shopping.Cart.reserve.braintree = false;
				Shopping.Cart.reserve.authorizednet = false;
				Shopping.Cart.reserve.cardsave = true;
			
			    Shopping.updateReserveBtn('cardsave',f);
			
			 break;
        }
    },
	changeDelTypeNew:function (type)
	{
		Main.Notappend  = 1;
		if(type == 4){
	
		if(type == 4)
		{
			if(Forms.Form.businesslist.fields.guest1.value == ""){
				swal("Error","<?= $lang_resource['SHOPPING_SELECT_GUEST'] ?>","error");
				return	
			}
			if(document.getElementById("rdate1").value == ""){
				swal("Error","<?= $lang_resource['SHOPPING_SELECT_DATE'] ?>","error");
				return	
			}
		}
		
		
		if(type == 1)
		{
			if(Main.RedirectToCity) {
				Main.OpenWhereAmIDeliveryOfCityBox()
				
				
				} else { 
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Main.WhereAmIData.reservestatus = "delivery";
			Main.WhereAmIData.reservation = false;
			
	    	Main.WhereAmIData.resturant = Forms.Form.businesslist.fields.resturants.value;
	    	Main.WhereAmIData.cuisines =  Forms.Form.businesslist.fields.cuisines.value;	

			
			
		
			Shopping.Start();
				}
		}
		else if(type == 2)
		{
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservestatus = "pickup";
			Main.WhereAmIData.reservation = false;
			
	    	Main.WhereAmIData.resturant =Forms.Form.businesslist.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.businesslist.fields.cuisines.value;	
			
			Shopping.Start();
		}
		if(type == 4)
		{
			
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservestatus = "reservation";
			
			
			Main.WhereAmIData.reservation = true;
			
	    	Main.WhereAmIData.resturant = Forms.Form.businesslist.fields.resturants.value;
	    	Main.WhereAmIData.cuisines =  Forms.Form.businesslist.fields.cuisines.value;	
			Main.WhereAmIData.guest = Forms.Form.businesslist.fields.guest1.value;
			Main.WhereAmIData.rdate = document.getElementById("rdate1").value;
			Popup.Close();
			
			Shopping.Start();
		}
		if(type == 3)
		{
			var globalSortBySubCat = new Array();
			var globalSortByCat = new Array();
			
			if(Main.deliveryType == "pickup") { 
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Shopping.Start();
			}
			else if(Main.deliveryType == "delivery") { 
			
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Shopping.Start();
			
			}
		}
	
		}
		
		if(type == 1)
		{
			if(Main.RedirectToCity) {
				Main.OpenWhereAmIDeliveryOfCityBox()
				
				
				} else { 
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Main.WhereAmIData.reservestatus = "delivery";
			
	    	Main.WhereAmIData.resturant =Forms.Form.businesslist.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.businesslist.fields.cuisines.value;	
			
			Shopping.PrintBusinessList();
				}
		}
		else if(type == 2)
		{
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservestatus = "pickup";
			
	    	Main.WhereAmIData.resturant =Forms.Form.businesslist.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.businesslist.fields.cuisines.value;	
			
			Shopping.PrintBusinessList();
		}
		else if(type == 4)
		{
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservestatus = "reservation";
			
	    	Main.WhereAmIData.resturant = Forms.Form.businesslist.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.businesslist.fields.cuisines.value;	
			Main.WhereAmIData.guest = Forms.Form.businesslist.fields.guest1.value;
			Main.WhereAmIData.rdate = document.getElementById("rdate1").value;
			
			Shopping.PrintBusinessList();
		}
		if(type == 3)
		{
			var globalSortBySubCat = new Array();
			var globalSortByCat = new Array();
			
			if(Main.deliveryType == "pickup") { 
			var business_id = Main.WhereAmIData.city;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "pickup";
			Main.deliveryType = "pickup";
			Shopping.PrintBusinessList();
			}
			else if(Main.deliveryType == "delivery") { 
			
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Shopping.PrintBusinessList();
			
			}
		}
		
		
		  },
	AscendingByName : function () {
		 	var dishasc= new Object();
			
			var dishasc_new= new Array();
			var E = "name";
			
			
			 for (var x in Shopping.MenuCategories) {
				var cname =  Shopping.MenuCategories[x].name;
					dishasc[cname] = new Array();
			
				 }
             
				for (var v in Shopping.Menu.dishes) {
					
					var ctname = Shopping.Menu.dishes[v].catname;
					if(dishasc[ctname])
					dishasc[ctname].push(Shopping.Menu.dishes[v]);
					
					}
					
				for (var xx in Shopping.MenuCategories) {
					var cnames =  Shopping.MenuCategories[xx].name;
					
					dishasc[cnames].sort(Main.SortByProperty(E));
					
					dishasc_new = dishasc_new.concat(dishasc[cnames]);
					
			
				 }	
				
		return dishasc_new;
		},
		Menuskiptab: function (val)
	 {
		 if(val==1)
		{
			$("#plce_div_review").hide();
			$("#plce_div_info").hide();
			$("#plce_div_menu").show();
			$("#plce_div_offer").hide();
			$("#plce_div_reserve").hide();
			
			$("#tabMenu1").addClass("active-tab");
			$("#tabInfo2").removeClass("active-tab");
			$("#reviewCountText").removeClass("active-tab");
			$("#offerCountText").removeClass("active-tab");
			$("#ReserveidText").removeClass("active-tab");
		}
		else if(val == 2)
		{
			$("#plce_div_review").hide();
			$("#plce_div_info").show();
			$("#plce_div_menu").hide();
			$("#plce_div_offer").hide();
			$("#plce_div_reserve").hide();
			
			$("#tabInfo2").addClass("active-tab");
			$("#tabMenu1").removeClass("active-tab");
			$("#reviewCountText").removeClass("active-tab");
			$("#offerCountText").removeClass("active-tab");
			$("#ReserveidText").removeClass("active-tab");
			
				Shopping.GetMaplocation();  
							
		}
		else if(val == 3)
		{
		
			$("#plce_div_review").show();
			$("#plce_div_menu").hide();
			$("#plce_div_info").hide();
			$("#plce_div_offer").hide();
			$("#plce_div_reserve").hide();
			
			$("#tabInfo2").removeClass("active-tab");
			$("#tabMenu1").removeClass("active-tab");
			$("#reviewCountText").addClass("active-tab");
			$("#offerCountText").removeClass("active-tab");
			$("#ReserveidText").removeClass("active-tab");
			
			
		}
		else if(val == 4)
		{
			$("#plce_div_review").hide();
			$("#plce_div_menu").hide();
			$("#plce_div_info").hide();
			$("#plce_div_offer").show();
			$("#plce_div_reserve").hide();
			
			$("#tabInfo2").removeClass("active-tab");
			$("#tabMenu1").removeClass("active-tab");
			$("#reviewCountText").removeClass("active-tab");
			$("#offerCountText").addClass("active-tab");
			$("#ReserveidText").removeClass("active-tab");
			
			
		}
		else if(val == 5)
		{
			$("#plce_div_review").hide();
			$("#plce_div_menu").hide();
			$("#plce_div_info").hide();
			$("#plce_div_offer").hide();
			$("#plce_div_reserve").show();
			
			
			$("#tabInfo2").removeClass("active-tab");
			$("#tabMenu1").removeClass("active-tab");
			$("#reviewCountText").removeClass("active-tab");
			$("#offerCountText").removeClass("active-tab");
			$("#ReserveidText").addClass("active-tab");
			
			
			
			
		}
	 },	
	GetBusinessLogicaly: function(E,A,fivekm,fav,opncls){
		if(Shopping.Business)
				{
				 $(document).ready(function() { initializeArrange(); });
				}
		 if (A)
        {  
		    E="open";
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
                    if (t[y] == Shopping.Categories[z].id)
                    {
					
							if (Shopping.Categories[z].enabled )
							{
								C = true
							}
						
					
                    }
					
					else if(fstchk == 0 && viewDevice == "Mobile") {
							
							C = true
							
							}
                }
            }
			if(fav)
				{
					if(favArr.indexOf(Shopping.Business[x].id) !=-1)
					C = true;
					else
					C = false;
					
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
				} else {
					if (C == true || document.getElementById("business_category_all").checked == true )
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
			
          
        }
		if(opncls) {
			 var sk = new Array();
			 
			 
			if(Main.OpenCloseValue == "openi") {
				for (y in s)
			 {
				 if(s[y].open == true)
				 {
				  sk.push(s[y]); 
				 }
			}
				 var s = new Array();
				 for (y in sk)
				 {
					 
					  s.push(sk[y]); 
					 
				}
				}
			if(Main.OpenCloseValue == "closei") {
				
				for (y in s)
			 {
				 if(s[y].open == false)
				 {
				  sk.push(s[y]); 
				 }
			}
				 var s = new Array();
				 for (y in sk)
				 {
					 
					  s.push(sk[y]); 
					 
				}
				
				}	
				
			/*
			 
			*/
			
			
			
			}
		if(fivekm) {
			
			 var sk = new Array();
			 for (y in s)
			 {
				 if(s[y].distanceKm <= 5)
				 {
				  sk.push(s[y]); 
				 }
			}
				 var s = new Array();
				 for (y in sk)
				 {
					 
					  s.push(sk[y]); 
					 
				}
			}
			
		
			var sk1obj= new Object();
			var sk2obj= new Object();
			
			E = "distanceKm";
			 var sk1 = new Object();
			 var sk2 = new Object();
			  sk1['open'] = new Array();
			  sk2['close'] = new Array();
			 for (y1 in s)
			 {
				 if(s[y1].open)
				 {
				  
				
				  sk1['open'].push(s[y1]); 
				 }
			}
			
			sk1['open'].sort(Main.SortByProperty(E));
			
			
			
			for (y1 in s)
			 {
				 if(!s[y1].open)
				 {
			
				  sk2['close'].push(s[y1]); 
				 }
			}
			
			
			 sk2['close'].sort(Main.SortByProperty(E));
			
			 
			
			
			s =  sk1['open'].concat(sk2['close']);
			
			return s;
		
		   },
	ShowHideOptionSearch: function(id){
		$(".filter-dv").toggle();
	},
	
    updateReserveBtn: function(type,f)
        {
        var topBtn = $('#top1-order-btn');
        var bottomBtn = $('#bottom1-order-btn');
	 if(viewDevice == "Desktop") {    
	   
	    switch (type)
            {

		 
		    case 'regular':
                topBtn.replaceWith('<div class="pull_left" id="top1-order-btn"  style="margin-left:395px;"><button class="reserv-btn" onclick="Shopping.ReserveNow()"><?=$lang_resource['PAYMENT_RESERVE_NOW'];?></button></div>');
                bottomBtn.replaceWith('<div class="pull_left" id="bottom1-order-btn"  style="margin-left:395px;"><button class="reserv-btn" onclick="Shopping.ReserveNow()"><?=$lang_resource['PAYMENT_RESERVE_NOW'];?></button></div>');
            break;
			case 'paypaladaptive':
				 var bottomBtn = $('#bottom1-order-btn');
                var itemId = paypaladaptive.createId();
				
               
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+paypaladaptive.createButtonreserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</div>')
            break;
			
            case 'paypal1':
			  var bottomBtn = $('#bottom1-order-btn');
			
			
                var itemId = paypal.createId();
				
              
                bottomBtn.replaceWith('<div class="pull_left" id="bottom1-order-btn"  style="margin-left:305px;"><button class="reserv-btn"  style="width:auto" >'+paypal.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</button></div>')
            break;
			
			 case 'macro':
			
			 var bottomBtn = $('#bottom1-order-btn');
             var itemId = mercadopago.createId();
            bottomBtn.replaceWith('<div class="pull_left" id="bottom1-order-btn"  style="margin-left:305px;width:auto"><button class="reserv-btn"  style="width:auto">'+mercadopago.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</button></div>')
			
            break;
			
			case 'braintree':
			
                var itemId = braintree.createId();
               
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+braintree.createButtonReserve({itemId:itemId,formName:'createButtonform-bottom',email:'',itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			
			case 'authorizednet':
                var itemId = authorizednet.createId();
               
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+authorizednet.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:'',itemPrice:Shopping.Cart.Total})+'</div>')
            break;
			
			case 'cardsave':
			
				var itemId = merchant.createId();
                
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+merchant.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:'',itemPrice:Shopping.Cart.Total})+'</div>')
		            break;

            }
		 }else{
		switch (type) {
 
		  case 'regular':
                bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom1-order-btn" onclick="Shopping.ReserveNowMob()"><?=$lang_resource['MOBILE_RESERVATION_ORDER_NOW'];?></button>');
            break;
			case 'paypaladaptive':
				 var bottomBtn = $('#bottom1-order-btn');
                var itemId = paypaladaptive.createId();
				
                bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom1-order-btn">'+paypaladaptive.createButtonreserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</button>')
            break;
			
            case 'paypal1':
			  var bottomBtn = $('#bottom1-order-btn');
			
			
                var itemId = paypal.createId();
				
                bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom1-order-btn" >'+paypal.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</button>')
            break;
			
			 case 'macro':
			    var bottomBtn = $('#bottom1-order-btn');
                var itemId = mercadopago.createId();
			
                bottomBtn.replaceWith('<button type="button" class="btn-red" id="bottom1-order-btn" >'+mercadopago.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Business[f].paypal,itemPrice:globalReserveTotalPrice})+'</button>')
            break;
			
			case 'braintree':
			   var bottomBtn = $('#bottom1-order-btn');
                var itemId = braintree.createId();
               
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+braintree.createButtonReserve({itemId:itemId,formName:'createButtonform-bottom',email:'',itemPrice:globalReserveTotalPrice})+'</div>')
            break;
			
			case 'authorizednet':
			    var bottomBtn = $('#bottom1-order-btn');
                var itemId = authorizednet.createId();
               
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+authorizednet.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:'',itemPrice:globalReserveTotalPrice})+'</div>')
            break;
			
			case 'cardsave':
			    var bottomBtn = $('#bottom1-order-btn');
				var itemId = merchant.createId();
                
                bottomBtn.replaceWith('<div class="order hand" id="bottom1-order-btn"><span class="caption nonselectable">'+merchant.createButtonReserve({itemId:itemId,formName:'paypalform-bottom',email:'',itemPrice:globalReserveTotalPrice})+'</div>')
		            break;

		}
		 } 
		   
        },	
};

function weekendName(i) {
	if(i==0) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_EVERYDAY']?>"
	else if(i==1) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_MONDAY']?>";
	else if(i==2) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_TUESDAY']?>";
	else if(i==3) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_WEDNESDAY']?>";
	else if(i==4) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_THURSDAY']?>";
	else if(i==5) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_FRIDAY']?>";
	else if(i==6) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_SATURDAY']?>";
	else if(i==7) 
	return "<?=$lang_resource['SHOPPING_INFO_CATALOG_SUNDAY']?>";
	

	}
