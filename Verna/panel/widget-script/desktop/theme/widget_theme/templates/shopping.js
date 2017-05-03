var IS_REVIEW_ENABLED = 1;
var IS_PAYPAL_ENABLED = 1;
var IS_PRODUCT_OPTION_ENABLED = 1;
var IS_MERCADOPAGO_ENABLED = 1;
var IS_PAYPALADAPTIVE_ENABLED = 1;

var IS_BRAINTREE_ENABLED = 1;
var IS_AUTHORIZEDPAYMENT_ENABLED = 0;

var IS_CARDSAVE_ENABLED = 1;
var IS_PAYU_ENABLED = 1;
var IS_STRIPE_ENABLED = 1;
var IS_PAYPALPRO_ENABLED = 1;
var IS_PAYGISTIX_ENABLED = 1;

var choice_count=0;
var div_data=null;
var mychoice_data=new Array();
var WhereAmIDataLoc = new Array();
var cart_object=null;
var cart_id=null;
var quantitysec = 1;
var personsec = 0;
var hiddenqty = 0;
var hiddenqty_status = 0;
 
//////for business list previous next ////////////
var limit = 10;
var offset = 0;
var busy = false; 
//////for business list previous next ////////////

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
    Start: function (limit,offset)
    {
		if(!limit){
			
		var limit = 10;}
		
		if(!offset){
		
		var offset = 0;	
		}
		if(!Shopping.Cart) {
		Shopping.Cart = new Object();
		Shopping.Cart.business = new Array();
		
		}
		
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
		 
		
		//var firstcat = Main.RedirectToCategory.split(",")
		
		//var m = Main.GetPropertyValueOnPropertyValueFoundForIdsindex(Main.cuisine, "ids", firstcat[0]);
		
		//if(m)
		category=Main.RedirectToCategory;	
		//else
		//category=firstcat[0];
		
		
			//category=Main.RedirectToCategory;
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
			   Main.WhereAmIData.address = ""
			 Main.WhereAmIData.collecttype = "citysearch"
			 Shopping.RedirectToCity = null;

		}
		
		
		else
		{
			
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Main.WhereAmIData.collecttype = "delivery"
			
		}
		if(!Main.WhereAmIData.location) {
			
			Main.WhereAmIData.location = WhereAmIDataLoc;
			Shopping.Cart.reserve = new Object();
			Shopping.Cart.reserveQty = new Object();
			Shopping.Cart.reservePrice = new Object();
		}
	
	
	if(!Main.RedirectToBusiness){}else{offset='-1'}///////////// for custom slug when businesslist previous and next function////////////
	
	    passingBy = "searching";
        var e = new Date().getTime();
        Main.Aid = e;
        Main.Loading();
        if(document.getElementById("clock_loading")){
        	$("#clock_loading").show();
        }
		//alert(JSON.stringify(Main.WhereAmIData))
		//alert(JSON.stringify(category))
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCategories"},{"operation":"FetchAllCategoriesCustom"},{"operation":"FetchCurrentDate"},{"operation":"FetchAllBusinessData","location":' + JSON.stringify(Main.WhereAmIData.location) + ',"deliverytype":' +  JSON.stringify(Main.WhereAmIData.collecttype) + ',"category":' + JSON.stringify(category) + ',"city":' + business_id + ', "limit":' + limit +',"offset":' + offset + ',"whereall":' + JSON.stringify(Main.WhereAmIData) +"}]", function (a)
        {
			//alert(a)
	
			 Main.Ready();
		
            if (a != "")
            {
                a = JSON.parse(a);
                var u = a.business;	
				
				
				Main.currentDate = a.currentDate;
			    Shopping.CategoriesCustom =  a.categoriesCustom;
				
				
			
				if(u == '' || u == 'null' || u == null){					
					
					 $.post("panel/lib/front-main.php", "f=UpdateResultData&data=" + JSON.stringify(Main.WhereAmIData), function (f) {
					
					 });
					Shopping.Categories = new Array();
					if(document.getElementById("businessloading")){
						$("#businessloading").hide();
					}
					Shopping.NoResturant();
					return false;
					var q = 0;
					
					
				}
				
				else{
				
					Main.businesslist_pagination = u[0].businesslist_pagination;
					if(Main.businesslist_pagination == 1)
					Main.numrow = u[0].numrow;
				
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
								
								catnew = a.categories[p].ids.split(",")                                                                                                        
                                if (ProductOption.in_array(t[s],catnew))
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
                        Shopping.Business[p].category = Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", r[0], "name")
						
						for(var act=0;act<r.length;act++)
						{
						var ptnew= Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", r[act], "name");
							if(ptnew !='')
							{
						 pt += ", "+ ptnew;
							}
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
               // Shopping.UpdateCartUserInfo()
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
	 BusinessCustomeSearch: function (businessid)
    {	

		if(!Shopping.Cart) {
		Shopping.Cart = new Object();
		Shopping.Cart.business = new Array();
		
		}
		
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
		
        /*var f = Visuals.CreateMiniWhereAmIButton("<?= $lang_resource['SHOPPING_SECOND_WHERE_ARE_YOU_BUTTON'] ?>", "Main.OpenWhereAmIBox()");
        f += Visuals.CreateRegularButton("cart", "grey", "<?= $lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] ?> (0)", "OpenCart.OpenCart()", "cartbutton");
        f += Visuals.CreateRegularButton("back", "orange", "<?= $lang_resource['SHOPPING_SECOND_WHERE_BACK_BUTTON'] ?>", "Shopping.Return()");*/
		var f ="";
        var d = document.getElementById("rbuttons");
        d.innerHTML = f;
        d.style.display = "none";
		
		if(Main.deliveryType == "pickup") {
		 
		  lp ="checked"	
		}
		if(Main.deliveryType == "delivery") {
		 var ld ="checked"	
		}
		
		var shs = Blist.ShoppingHeaderDesignNavigationHtml();		
		var sch = '<div id="src_bxNew" ></div><div id="src_bx"></div><input type="hidden" class="field_text search_input" id="businesssearch" placeholder="<?= $lang_resource['Restaurants_Cuisines_Search_V2'] ?>">';///Blist.ShoppingHeaderBusinessSearchHtml(); 		
			
	
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
			   Main.WhereAmIData.address = ""
			 Main.WhereAmIData.collecttype = "citysearch"
			 Shopping.RedirectToCity = null;

		}
		
		
		else
		{
			
			var business_id = 0;
			Shopping.RedirectToCity = null;
			Main.WhereAmIData.collecttype = "delivery"
			
		}
		if(!Main.WhereAmIData.location) {
			
			Main.WhereAmIData.location = WhereAmIDataLoc;
			Shopping.Cart.reserve = new Object();
			Shopping.Cart.reserveQty = new Object();
			Shopping.Cart.reservePrice = new Object();
		}
	
	//alert(category)
	if(!Main.RedirectToBusiness){}else{offset='-1'}///////////// for custom slug when businesslist previous and next function////////////
	
	    passingBy = "searching";
        var e = new Date().getTime();
        Main.Aid = e;
        Main.Loading();
        if(document.getElementById("clock_loading")){
        	$("#clock_loading").show();
        }
		//alert(limit)
		//alert(offset)
		//alert(JSON.stringify(Main.WhereAmIData))
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchSettingFront"},{"operation":"FetchDecimalPoint"},{"operation":"FetchNeighbourhoodSettings"},{"operation":"FetchUserInfo"},{"operation":"FetchDecimalPoint"},{"operation":"FetchMapLatlong"},{"operation":"FetchCheckoutInfo"},{"operation":"FetchAllCategories2","businessid":' + businessid +'},{"operation":"FetchAllCategoriesCustom2","businessid":' + businessid +'},{"operation":"FetchCurrentDate"},{"operation":"FetchAllBusinessDataCustomSlug","location":' + JSON.stringify(Main.WhereAmIData.location) + ',"deliverytype":' +  JSON.stringify(Main.WhereAmIData.collecttype) + ',"category":' + JSON.stringify(category) + ',"city":' + business_id+ ',"businessid":' + businessid + ',"whereall":' + JSON.stringify(Main.WhereAmIData) +"}]", function (a)
        {
			
			 //alert(a)
			 Main.Ready();
		
            if (a != "")
            {
                a = JSON.parse(a);
				if(a.decimal_point){
					Main.IS_DECIMAL_POINT = a.decimal_point
					
					
				}
                var u = a.business;			
				Main.currentDate = a.currentDate;
			    Shopping.CategoriesCustom =  a.categoriesCustom;
				Main.settingfront = a.settingfront;	
				Main.checkoutinfo = a.checkoutinfo;	
				Main.latt1=a.MapLatlong.lat;			
				Main.long1=a.MapLatlong.long;
				Main.neighsettings = a.neighsettings;	
				if(a.decimal_point){
					Main.IS_DECIMAL_POINT = a.decimal_point					
				}
				
				if (a.user){
				Main.User = a.user;				
				if(Main.User){
					
					Main.settingfront.default_country=Main.User.country;
					if(Main.User.id!=null){
					 $.post("panel/lib/front-bulk.php",'data=[{"operation":"FetchUserPointsData","id":' + Main.User.id + '},{"operation":"FetchUsersOrderBusiness","id":'+Main.User.id+'},{"operation":"FetchBusinessPointsEnabled"}]',function (c){
					
					 if(c!="")
					 {
					 	
            			
					 	c = JSON.parse(c);
					 	Main.availablepoint=c.fetchuserpointsdata
					 	//alert(Main.availablepoint)
					 	Main.fetchusersorderbusiness=JSON.parse(c.fetchusersorderbusiness)
					 	//alert(Main.fetchusersorderbusiness[0].business_id)
					 	Main.fetchbusinesspointsenabled=JSON.parse(c.fetchbusinesspointsenabled)
					 }	

        })
			}			
					Main.settingfront.default_city=Main.User.city;
					Main.settingfront.default_city_name=Main.User.cityname;
					Main.settingfront.city_name_default=Main.User.cityname;
					Main.settingfront.default_country_name=Main.User.countryname;
				}

				$(".join_btn").hide();
				$(".popdiv_pop").addClass("popdiv_pop_right");
				$(".popdiv").addClass("popdiv_right");

                document.getElementById("usermenu").innerHTML = Main.GetUserBoxHtml();

                $('.lognhead').html(Main.User.name);
				Shopping.UpdateCartUserInfo()
			
			}else{

				$(".join_btn").show();
				$(".popdiv_pop").removeClass("popdiv_pop_right");
				$(".popdiv").removeClass("popdiv_right");

				var em ="";
				var ps ="";
				var chk="";
				if((document.cookie.indexOf('emailID')!= -1)&&(document.cookie.indexOf('passVAL')!= -1)){
					 var em = getCookie("emailID");
					 var ps = getCookie("passVAL");
					if (em != "" && ps != ""){
						chk='checked="checked"';
					}
				}
				var em1 = getCookie("emailID");
				var ps1 = getCookie("passVAL");
				//alert(em1)
				//alert(em)
				if(em1==null){   
					chk ='';
				}
				document.getElementById("usermenu").innerHTML = '<span><?= $lang_resource['Email_ID_V2'] ?></span><br clear="all" /><input type="text" placeholder="<?= $lang_resource['LOGIN_INPUT_EMAIL'] ?>" id="loginemail" class="pop_text" value="'+Main.NullToEmpty(em)+'"/><span><?= $lang_resource['Password_V2'] ?></span><br clear="all" /><input type="password" class="pop_text" value="'+Main.NullToEmpty(ps)+'" placeholder="<?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?>" id="loginpassword" onkeyup="Main.LoginPwdType(event)"/><div class="sprt_line"></div><br clear="all" /><input type="checkbox" class="checkbox_2 allcheckbox" style="float: left;"  '+chk+' id="checkremember2" /><label for="checkremember2" class="checkbox_2text"><?=$lang_resource['MOBILE_MYACCOUNT_REMEMBER_ME'];?></span></label><div class="buttonbox"><div class="buttoninner hand" onclick="Main.Login()"><span class="login-btn-cst trcknw hand nonselectable"><?= $lang_resource['LOGIN_BUTTON_LOGIN'] ?></span></div></div><span class="recover hand nonselectable" onclick="Main.RecoverPassword(true)"><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></span><span class="register hand nonselectable" onclick="Main.CommonAccount()"><?= $lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] ?></span>';
				document.getElementById("loginbottom").innerHTML = '<span class="elseclass" id="elseces" ><?= $lang_resource['ELSE_V2'] ?></span><div class="fb hand" onclick="Facebook.Login()" ><span class="fb-btn"><?= $lang_resource['LOGIN_WITH_FACEBOOK'] ?></span></div>';
			}	
		

					
					
					
				Main.businesslist_pagination = u[0].businesslist_pagination;
				if(Main.businesslist_pagination == 1)
				Main.numrow = u[0].numrow;
			
				var q = u.length;
				Shopping.Business = u;
			
				
				
                if (q > 0)
                {
                    var c = false;
                    var r = new Array();
                    var t;
				
				//alert(JSON.stringify(a.categories))
                    for (var p in a.categories)
                    {
                        c = false;
                        for (var b in u)
                        {
                            t = JSON.parse(u[b].categories);
							//alert(t);
                            for (var s in t)
                            {
								
								catnew = a.categories[p].ids.split(",")                                                                                                        
                                if (ProductOption.in_array(t[s],catnew))
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
					
					//alert(JSON.stringify(r));	
                    Shopping.Categories = r.sort(Main.SortByProperty("id"));
				
						
					
                    var r;
					
                    for (p in Shopping.Business)
                    {
					 var pt = '';
                     r = JSON.parse(Shopping.Business[p].categories);
					// alert(JSON.stringify(Shopping.CategoriesCustom));
					 
					  //alert(r);
                     Shopping.Business[p].category = Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", r[0], "name")
						//alert(Shopping.Business[p].category);
						for(var act=0;act<r.length;act++)
						{
						var ptnew= Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", r[act], "name");
							if(ptnew !='')
							{
							 pt += ", "+ ptnew;
							}
						}
						 var pt = pt.replace(",", ""); 
						// alert(pt);
						 Shopping.Business[p].categoryshow = pt;
						
                    }
					
				 
	
				document.getElementById("citychoose").style.display = "none";		
				var f ='';
				if(document.getElementById("showcanvas"))
				{
				document.getElementById("showcanvas").style.display = "none";	
				document.getElementById("showcanvas").innerHTML = f;
				}
				document.getElementById("shoppingbox").innerHTML = '<div id="shoplistadscontainer"></div>';//Blist.CatagoriesFetch();
				//Switch.Init();
				//document.getElementById("categoriesbox").innerHTML = '';//Blist.CatagoriesFetchItem();		
           		Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true);
            	
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
               // Shopping.UpdateCartUserInfo()
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
	
	
	///////////// for businesslist previous and next function////////////		
		Previousresult: function() {
			offset =  offset - limit;
			//alert(offset)
			Main.Scrollload = 1;
			
			
			Shopping.Start(limit, offset);
		
		},
		Nextresult: function() {
			offset = limit + offset;
			
			Main.Scrollload = 1;
			
			
			Shopping.Start(limit, offset);
		
		},
///////////// for businesslist previous and next function////////////	

	FuncOffer : function (f) {
		 f = JSON.parse(f);
		var n = "";

	    if(f.length == 0) {
				n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table"><tr><td colspan="4" align="center" style="border-top: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC;padding:5px"><?= $lang_resource['NOOFFER_V21'] ?></td>';
				n +='</tr></table>';
				} else {
		n ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="demotest_table"><thead>';
                	 n +='<tr >';
                    	 n +='<th align="left" width="35%" style="padding-bottom: 5px" ><?= $lang_resource['OFFERN_V21'] ?></th>';
                         n +='<th align="left" width="25%" style="padding-bottom: 5px" ><?= $lang_resource['OFFERP_V21'] ?></th>';
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
		  suggesturl:function ()
    {
		window.location='<?=$lang_resource['POPUP_SUGGEST_SHOP_LINK']?>';
		  },
  	contacturl:function ()
    {
		window.location='<?=$lang_resource['CONTACT_US_LINK']?>';
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
			if(Main.searchlink)  {
				window.history.pushState( {"id":100} , "Business list", Main.searchlink );
				}
			
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
			if(Main.searchlink)  {
				
				window.history.pushState( {"id":100} , "Business list", Main.searchlink );
				
				}
			
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
    UpdateCartUserInfo: function (d)
    {
        if (!Shopping.Cart)
        {
            return
        }
	
	
			if (Main.User)
			{
				if(!Shopping.Cart.buyer){
					Shopping.Cart.buyer = new Object();
				}
				if(!Shopping.Cart.reserve){
					Shopping.Cart.reserve = new Object();
				}
				
				Shopping.Cart.buyer.id = Main.User.id;
				Shopping.Cart.buyer.name = Main.User.name + " " + Main.User.lastname;
				Shopping.Cart.reserve.name = Main.User.name + " " + Main.User.lastname;
				Shopping.Cart.reserve.email = Main.User.email;
				Shopping.Cart.reserve.tel = Main.User.tel;
				
				if (Shopping.Cart.buyer.name == " ")
				{
					Shopping.Cart.buyer.name = ""
				}
				
				Shopping.Cart.buyer.lastname2 =  Main.NullToEmpty(Main.User.lastname2);
				Shopping.Cart.buyer.api =  Main.NullToEmpty(Main.User.api);
				Shopping.Cart.buyer.email =  Main.NullToEmpty(Main.User.email);
				Shopping.Cart.buyer.tel =  Main.NullToEmpty(Main.User.tel);
				Shopping.Cart.buyer.cel =  Main.NullToEmpty(Main.User.cel);
				Shopping.Cart.buyer.colony =  Main.NullToEmpty(Main.User.colony);
				Shopping.Cart.buyer.cp =  Main.NullToEmpty(Main.User.cp);
				Shopping.Cart.buyer.zip =  Main.NullToEmpty(Main.User.cp);
				Shopping.Cart.buyer.zipcode =  Main.NullToEmpty(Main.User.cp);
				Shopping.Cart.buyer.cityname =  Main.NullToEmpty(Main.User.cityname);
				Shopping.Cart.buyer.countryname =  Main.NullToEmpty(Main.User.countryname);
				Shopping.Cart.buyer.reference = Main.NullToEmpty(Main.User.findfrom);
				Shopping.Cart.buyer.firstname =  Main.NullToEmpty(Main.User.name);
				Shopping.Cart.buyer.lastname = Main.NullToEmpty( Main.User.lastname);
				Shopping.Cart.buyer.street = Main.NullToEmpty( Main.User.street);
			}
			if (Main.WhereAmIData)
			{
					
					if(!Shopping.Cart.buyer){
						Shopping.Cart.buyer = new Object();
					}
					if(!Shopping.Cart.reserve){
						Shopping.Cart.reserve = new Object();
					}

				Shopping.Cart.buyer.address = Main.WhereAmIData.address;
				Shopping.Cart.buyer.city = Main.WhereAmIData.city;
				Shopping.Cart.buyer.cityname = Main.WhereAmIData.cityname
			}
			if(Main.WhereAmIDataCus) { 
			   
				Shopping.Cart.buyer.address = Main.WhereAmIDataCus.address;
				Shopping.Cart.buyer.city = Main.WhereAmIDataCus.city;
				Shopping.Cart.buyer.cityname = Main.WhereAmIDataCus.cityname
			}
			
	 
	Main.WhereAmIData.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "city");
	
	Shopping.Cart.buyer.tax = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "tax");
	
	Shopping.Cart.buyer.taxtype = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "taxtype");
	
	Shopping.Cart.buyer.city=Main.WhereAmIData.city;
	
	
			
		/*$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"id","operator":"=","value":"' + Shopping.Cart.buyer.city + '"}]}]', function (f)
        {
			*/
			var recData = new Array();
			  // recData = JSON.parse(f);
			   
			// Shopping.Cart.buyer.tax = recData.franchises[0].tax;
            // Shopping.Cart.buyer.taxtype = recData.franchises[0].taxtype;
			//})
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
			document.getElementById("showcheck").innerHTML ="<span><img src='images/step2-business-listing/map-icon.png'></span> <?=$lang_resource['DESKTOP_BUSINESS_HIDE_MAP'];?>"
			}

			document.getElementById("showcanvas").style.display ="";
			$(document).ready(function() { initialize(); });
		}
		else
		{
			if(viewDevice == "Desktop") {
			document.getElementById("showcheck").innerHTML ="<span><img src='images/step2-business-listing/map-icon.png'></span> <?=$lang_resource['DESKTOP_BUSINESS_SHOW_MAP'];?>"
			}
			document.getElementById("showcanvas").style.display ="none";			
		}
		 
	 },


  /*  SetBusinessCategoryEnabled: function (d, e)
    {
		
        var f = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", d);
		var Allidsrecord = Shopping.Categories[f].ids .split(",");
		
		for(var ts in Allidsrecord) {
				if(Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecord[ts]) != -1) {
			  var fn = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecord[ts]);
			  
			  Shopping.CategoriesCustom[fn].enabled = e;
				}
		
			
			}
		
     
		
        Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
    },*/
	 SetBusinessCategoryEnabled: function (d, e)
    {
		
        var f = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", d);
		var Allidsrecord = Shopping.Categories[f].ids .split(",");
		
		for(var ts in Allidsrecord) {
			
			  var fn = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecord[ts]);
			  if(fn!=-1)
			  Shopping.CategoriesCustom[fn].enabled = e;
		
			
			}
		
      /* alert(JSON.stringify(Allidsrecord))*/
		 // alert("a")
		
       Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
    },


    SetBusinessCategoryEnabledEach: function (d, e)
    {
		
        var f = Main.GetIndexOnPropertyValueFound(Shopping.Categories, "id", d);
		var Allidsrecord = Shopping.Categories[f].ids .split(",");
		
		for(var ts in Allidsrecord) {
			
			  var fn = Main.GetIndexOnPropertyValueFound(Shopping.CategoriesCustom, "id", Allidsrecord[ts]);
			  if(fn!=-1)
			  Shopping.CategoriesCustom[fn].enabled = e;
		
			
			}
		
      /* alert(JSON.stringify(Allidsrecord))*/
		 // alert("a")
		
        Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
    },
	initializeShort: function () {
	},
    OpenBusiness: function (d,revwtru,resSearch,hidemenu,reservef)
    {
		//alert(d)
		
    if (d == ""){
		
		alert("<?= $lang_resource['Choose_Restaurant_V2'] ?>");
		return
	}
    var distance = Main.NullToEmpty(Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "distance"));
	
	currentshop = d;
	
			
	var shss = "";
  	shss += '<a href="javascript:Shopping.OpenBusiness('+currentshop+')"><span class="step-logo"><img src="images/step2-business-listing/place_order.png"></span><span class="step-text"><?=$lang_resource['MOBILE_BUSINESS_LIST_PLACE_ORDER'];?></span></a>';
	if(document.getElementById("plc_ordr"))
	document.getElementById("plc_ordr").innerHTML = shss;
		 
	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllbusinessSettingData"}]', function (a){
		
		
		b = JSON.parse(a);
		
		businessSetting=b.businessSetting;
		Main.businessimagesettings = b.businessSetting.businesspagimagesetting;

		if(viewDevice == "Desktop") {
			if(businessSetting.businesspageheadersetting=="1"){
				document.getElementById("headerpart").style.display = "none";
				$(".lang_static_dv").css("padding", "30px 0");
			}
			if(businessSetting.prograssbarsetting=="1"){
				document.getElementById("progressbarpart").style.display = "none";
			}
			if(businessSetting.businesspagefootersetting=="1"){
				document.getElementById("footer").style.display = "none";
				if(document.getElementById("footer_logo1"))
				document.getElementById("footer_logo1").style.display = "none";
				document.getElementById("newssletter_cnt").style.display = "none";
			}
			if(Shopping.Business[0].businesspagecustomtext!=""){
				document.getElementById("footcustomtxt").innerHTML =Shopping.Business[0].businesspagecustomtext;
			} 		  
		} 
	});
	
	
		
		
   
	
	
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
			
			
		 
		$.post("panel/lib/front-bulk.php", 'data=[' + operation + '{"operation":"FetchAllFranchisesData"},{"operation":"FetchServiceFeeData"},{"operation":"FetchBusinessMenu","businessid":'+d+',"deliverytype":' + JSON.stringify(delTyle) + '},{"operation":"timescdule","businessid":' + d + '},{"operation":"pickupDeliverytime","businessid":' + d + '},{"operation":"FetchReserve","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+'},{"operation":"checkDelivery","businessid":' + d + '},{"operation":"FetchReserveBooked","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+'},{"operation":"DiscountOffer","businessid":' + d + "}]", function (a)
       {
		  
		   /* alert(JSON.stringify(a)) */
           
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
				Shopping.Cart.servicefee   = a.servicefee;
				
				
							
				
				
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
				var customslug  = 	Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "customslug");
				//alert(customslug)
                Shopping.ActiveBusinessName = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "name");
				var bOpenCloseStatus = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "open");
                Shopping.ActiveBusiness = d;
				
				Shopping.UpdateCartUserInfo(d);
				
				
				
				
				passingBy = "restaurant";
				var myParams = location.search.split('order=');
				
				if(bOpenCloseStatus == false && prep == false  && reservef !=true) {
					
						Main.PreOrderMenuCatalogFetch(d,true);
						return false;
					
					}
			
				var custom_link =  "<?=base64_encode('RESTAURANT_BACK_BUTTON')?>_"+Shopping.ActiveBusiness+"_"+Shopping.ActiveBusinessName.split(" ").join("");
				if( window.location.pathname.replace('/','') != custom_link && window.location.pathname.replace('/','') != customslug &&  viewDevice == "Desktop" && Shopping.Menu.dishes.length != 0 ) {
					window.history.pushState( {"id":101} , "Restaurent Menu", custom_link );
					
				}
				else if( document.getElementById("blistName").value != custom_link && document.getElementById("blistName").value != customslug &&  viewDevice == "Mobile" && Shopping.Menu.dishes.length != 0 ) {
				
					window.history.pushState( {"id":101} , "Restaurent Menu", custom_link );
					
				}
				 else if(Main.NullToEmpty(myParams) !="" && Main.NullToEmpty(myParams) !="?review" && viewDevice == "Desktop"   )
				{ 
				
				    //blank
					 RestMenuList.PrintBusinessAndDishes(resSearch);
				}
				else if(document.getElementById("reviewOrderID").value !="" && document.getElementById("reviewOrderID").value !="?review" && viewDevice == "Mobile"   )
				{ 
				
				    //blank
					 RestMenuList.PrintBusinessAndDishes(resSearch);
				}
				else if(window.location.pathname.replace('/','') == customslug && viewDevice == "Desktop") {
		
				//window.history.pushState( {"id":101} , "Restaurent Menu", customslug );	
					
					}
				else if( document.getElementById("blistName").value == customslug && viewDevice == "Mobile") {
			
				window.history.pushState( {"id":101} , "Restaurent Menu", customslug );	
					
					}	
				
				
				if(Main.WhereAmIData.reservation == true && hidemenu) {
					   RestMenuList.PrintBusinessAndDishes(resSearch);
					}
				else if(Main.WhereAmIData.reservation == true && viewDevice == "Mobile") {
					   RestMenuList.PrintBusinessAndDishes(resSearch);
					}
				
                if (Shopping.Menu.dishes.length == 0  && reservef !=true)
                {
					
				   var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", d);
					if(Shopping.Business[u].catalog == 0) {
                    alert("<?=$lang_resource['MAIN_SHOPPING_MENU_CATALOG_NO_AVAILABLE']?>");
					window.location ='./';
					} else {
						
				if(!Shopping.Cart.business[0] &&  prep == false )	{
					Main.PreOrderMenuCatalogFetch(d);
					return false;
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
				alert("<?=$lang_resource['FRONT_LOGIN_ADD_FAVORITE']?>");
				Visuals.LoginMob()
			}else{
			alert("<?=$lang_resource['FRONT_LOGIN_ADD_FAVORITE']?>");
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
   shss += '<a href="javascript:Shopping.OpenBusiness('+currentshop+')"><span class="step-logo"><img src="images/step2-business-listing/place_order.png"></span><span class="step-text"><?=$lang_resource['SHOPPING_PLACE_ORDER']?></span></a>';  
   
	if(document.getElementById("plc_ordr"))	
    document.getElementById("plc_ordr").innerHTML = shss;


	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllbusinessSettingData"}]', function (a){
		
		b = JSON.parse(a);
		businessSetting=b.businessSetting;
		Main.businessimagesettings = b.businessSetting.businesspagimagesetting;

		if(viewDevice == "Desktop") {
			if(businessSetting.businesspageheadersetting=="1"){
				document.getElementById("headerpart").style.display = "none";
				$(".lang_static_dv").css("padding", "30px 0");
			}
			if(businessSetting.prograssbarsetting=="1"){
				document.getElementById("progressbarpart").style.display = "none";
			}
			if(businessSetting.businesspagefootersetting=="1"){
				document.getElementById("footer").style.display = "none";
				if(document.getElementById("footer_logo1"))
				document.getElementById("footer_logo1").style.display = "none";
				document.getElementById("newssletter_cnt").style.display = "none";
			}
			if(Shopping.Business[0].businesspagecustomtext!=""){
				document.getElementById("footcustomtxt").innerHTML =Shopping.Business[0].businesspagecustomtext;
			} 		  
		} 
	});

	   
	
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

	
		Shopping.datedd = dd;
		$.post("panel/lib/front-bulk.php", 'data=[' + operation + '{"operation":"FetchAllFranchisesData"},{"operation":"FetchServiceFeeData"},{"operation":"FetchReserve","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+'},{"operation":"FetchReserveBooked","businessid":' + d + '},{"operation":"FetchCurrentDate"},{"operation":"FetchBusinessPreOrderMenu","businessid":' + d + ',"date":' + dd + ',"hour":' + hh + ',"minute":' + mm + ',"deliverytype":' + JSON.stringify(delTyle) + '},{"operation":"checkpreorder","menuid":' +  Main.itemid + '},{"operation":"DiscountOffer","businessid":' + d + "}]", function (a)
       {
		//alert(JSON.stringify(a));
      		if(!Shopping.Cart.preorderDate) {
		 	
					var datedd = Shopping.datedd.substr(0,4)+"-"+Shopping.datedd.substr(4,2)+"-"+Shopping.datedd.substr(6,2);
					var datedd = Date.parse(datedd);
			}

			

		   Shopping.Cart.preorder ="true"
		   Shopping.Cart.preorderDate =Shopping.datedd;
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
				Shopping.Cart.servicefee   = a.servicefee;	
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
                
				var customslug  = 	Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "customslug");
                Shopping.ActiveBusinessName = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", d, "name");
                Shopping.ActiveBusiness = d;
				
				Shopping.UpdateCartUserInfo(d);
				
				passingBy = "restaurant";
				
				 if (Shopping.Menu.dishes.length == 0)
                {
					Main.PreOrderMenuCatalogFetch(d);
					return false;
                }
				
				
				var custom_link =  "<?=base64_encode('RESTAURANT_BACK_BUTTON')?>_"+Shopping.ActiveBusiness+"_"+Shopping.ActiveBusinessName.split(" ").join("");
				if( window.location.pathname.replace('/','') != custom_link && window.location.pathname.replace('/','') != customslug &&  viewDevice == "Desktop") {
				
					window.history.pushState( {"id":101} , "Restaurent Menu", custom_link );
					
				}
				else if( document.getElementById("blistName").value != custom_link && document.getElementById("blistName").value != customslug &&  viewDevice == "Mobile") {
					
					window.history.pushState( {"id":101} , "Restaurent Menu", custom_link );
					
				}
				else if(window.location.pathname.replace('/','') == customslug && viewDevice == "Desktop") {
				if(location.search.split('order=')==""){
				window.history.pushState( {"id":101} , "Restaurent Menu", customslug );	
				}
					}
				else if(document.getElementById("reviewOrderID").value != "" && viewDevice == "Mobile") {
					
				
					
					}
				else if(document.getElementById("blistName").value == customslug && viewDevice == "Mobile") {
				
				window.history.pushState( {"id":101} , "Restaurent Menu", customslug );	
					
					}	
					
                if (Shopping.Menu.dishes.length != 0)
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
		  //Time selection settings. 
	time_format="<?=$lang_resource['TIME_FORMAT']?>";
		var catl = JSON.parse(f);
			catl.sort(Main.SortByProperty("openclosetime"));
		var n = '';
		
		
		
		for (x in catl)
            {
			   var p = JSON.parse(catl[x].days); 
			   for(dd in p) {
				  
					n +='<tr>'
					n +='<td>'+ catl[x].name+'</td>'
					n +='<td>'+weekendName(p[dd])+'</td>'
					  //Time selection settings. 
					   if(time_format=="12"){
							closetime1='';
							opentime1='';
							opentime=new Array();
							closetime=new Array();
							openclosetime=new Array();
							openclosetime1='';
							openclosetime=catl[x].openclosetime.split("-");
							opentime=openclosetime[0].split(":");
							closetime=openclosetime[1].split(":");
							opentime1= Main.convertTimeFormat(opentime[0],opentime[1]);
							
							closetime1= Main.convertTimeFormat(closetime[0],closetime[1]);
							
							
							openclosetime1=opentime1+'-'+closetime1;
				   }else{
					   closetime1='';
							opentime1='';
							opentime=new Array();
							closetime=new Array();
							openclosetime=new Array();
							openclosetime1='';
							openclosetime=catl[x].openclosetime.split("-");
							closetime=openclosetime[1].split(":");
					if(closetime[0] >= 24){
							opentime1=openclosetime[0];
							closetime1= Main.convertTimeFormatTOAM(closetime[0],closetime[1]);
							openclosetime1=opentime1+'-'+closetime1;
				
					}else{
					   openclosetime1=catl[x].openclosetime;
					}
				   }
					n +='<td>'+openclosetime1+'</td>'
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
			k +='<td><a href="javascript:void(0)"><img src="panel/images/gallery/'+f[x].id+'/gallery.jpg"></a></td>'
			
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
		 //alert(JSON.stringify(Shopping.Business));
		//alert(JSON.stringify(f));
		document.getElementById("reviewCountText").innerHTML = "<?= $lang_resource['REVIEWSOF_V21'] ?> ("+f.length+")";
		var n = '';
				if(f.length == 0) { 
				 n +='<div class="user_review_dv"><?= $lang_resource['NOREVIEW_V21'] ?></div>';
				//if review == 0
				
				} else { 
				
				  for (var x in f) {
				  n +='<div class="user_review_dv">';
            	n +='<div class="user_pic_dv">';
				if(f[x].isimg == 1){
					n += '<img src="panel/images/users/'+f[x].user_id+'/small.jpg">';
				}
				else
				{
					n += '<img src="panel/images/users/dummy.jpg">';	
				}
				 n +='</div>';
               n +='<div class="dsp-dv">';
			   
			   var Z = new Object();
				var K1 = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				Z.name = Shopping.Business[K1].name;
				
                   		n +='<h4>'+f[x].user+' <span><?=$lang_resource['REVIEWS_HOME']?></span> '+Z.name+'</h4>';
                       n +='<ul class="review-star" style="margin-top:5px;">';
					   if(Main.NullToEmpty(f[x].average) !="" )
						{
							for(v = 1;v <= f[x].average;v++){
							 n +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>';
							}
							var temp_v = (parseInt(f[x].average) + 1);
							for(v1 = temp_v;v1 <= 5;v1++){
							n +='<li><a href="#"><img src="images/star-grey2.png"></a></li>';
							}
						}
                           n +='</ul>';
                            n +='<p>'+Main.NullToEmpty(f[x].comment)+'</p>';
                            n +='<ul class="rvw-time">';
                            	n +='<li>'+f[x].pdate+'</li>';
                                n +='<li>'+Main.NullToEmpty(f[x].city)+'</li>';
                                n +='<li>'+Main.NullToEmpty(f[x].email)+'</li>';
                            n +='</ul>';
                   n +='</div>';<!--dsp-dv-->
                   n +='<div class="review_ratings">';
						n +='<table width="100%" border="0" cellspacing="0" cellpadding="0">';
                          n +='<tr>';
                            n +='<td><?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?></td>';
                            n +='<td>:</td>';
                            n +='<td style="padding-left:10px;">';
                                n +='<ul class="review-star" style="margin-top:5px;">';
								if(Main.NullToEmpty(f[x].quality) !="" )
								{
									for(q = 1;q <= f[x].quality;q++){
										n +='<li><a href="#" class="yellow_star"></li>';
										}
									var temp_q = (parseInt(f[x].quality) + 1);
									for(q1 = temp_q;q1 <= 5;q1++){
										n +='<li><a href="#" class="gray_star"></li>';
										}
								}
                                n +='</ul>';
                            n +='</td>';
                            n +='<td>'+Main.NullToEmpty(f[x].quality)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +='</tr>';
                          n +='<tr>';
                            n +='<td><?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?></td>';
                            n +='<td>:</td>';
                            n +='<td style="padding-left:10px;">';
                                n +='<ul class="review-star" style="margin-top:5px;">';
								if(Main.NullToEmpty(f[x].delivery) !="" )
								{
									for(d = 1;d <= f[x].delivery;d++){
										n +='<li><a href="#" class="yellow_star"></li>';
										}
									var temp_d = (parseInt(f[x].delivery) + 1);
									for(d1 = temp_d;d1 <= 5;d1++){
										n +='<li><a href="#" class="gray_star"></li>';
										}
								}
                                n +='</ul>';
                            n +='</td>';
                            n +='<td>'+Main.NullToEmpty(f[x].delivery)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +='</tr>';
                          n +='<tr>';
                            n +='<td><?= $lang_resource['TEMPLATE_SERVICE'] ?></td>';
                            n +='<td>:</td>';
                            n +='<td style="padding-left:10px;">';
                                n +='<ul class="review-star" style="margin-top:5px;">';
								if(Main.NullToEmpty(f[x].dealer) !="" )
								{
									for(e = 1;e <= f[x].dealer;e++){
										n +='<li><a href="#" class="yellow_star"></li>';
										}
									var temp_e = (parseInt(f[x].dealer) + 1);
									for(e1 = temp_e;e1 <= 5;e1++){
										n +='<li><a href="#" class="gray_star"></li>';
										}
								}
                                n +='</ul>';
                            n +='</td>';
                           n +='<td>'+Main.NullToEmpty(f[x].dealer)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +='</tr>';
                          n +='<tr>';
                            n +='<td><?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?></td>';
                            n +='<td>:</td>';
                            n +='<td style="padding-left:10px;">';
                                n +='<ul class="review-star" style="margin-top:5px;">';
								if(Main.NullToEmpty(f[x].package) !="" )
								{
									for(p = 1;p <= f[x].package;p++){
										n +='<li><a href="#" class="yellow_star"></li>';
										}
									var temp_p = (parseInt(f[x].package) + 1);
									for(p1 = temp_p;p1 <= 5;p1++){
										n +='<li><a href="#" class="gray_star"></li>';
										}
								}
                                n +='</ul>';
                            n +='</td>';
                            n +='<td>'+Main.NullToEmpty(f[x].package)+' <?= $lang_resource['OUTOF_V21'] ?> 5</td>';
                          n +='</tr>';
                        n +='</table>';

                   n +='</div>';<!--review_ratings-->
            n +='</div>';
				  
				  }
                  
				}
               // n +='</table>';
			   
			if(Shopping.allphotouser){
				n +='<div class="photo_video_dv">';				
				n +='<ul class="photos">';				
				for(var ig in Shopping.allphotouser){
					if(Shopping.allphotouser[ig].isimg == 0 || '<img src="../panel/images/users/'+Shopping.allphotouser[ig].id+'/small.jpg">'==''){
						n +='<li><img src="../panel/images/users/dummy.jpg"></li>';
					}else if(Shopping.allphotouser[ig].isimg == 1){
						n +='<img src="../panel/images/users/'+Shopping.allphotouser[ig].id+'/small.jpg?c='+new Date().getTime()+'">'
					}else{
						n +='<li><img src="../panel/images/users/dummy.jpg"></li>';
					}
					
					n +='<img src="../panel/images/gallery/'+Shopping.allphotouser[ig].photos+'/full.jpg?c='+new Date().getTime()+'">'
				}
				n +='</ul>';
				n +='</div>';//div end for review
			}

			   
				
				 document.getElementById("reviewContent").innerHTML = n;
	},
    SetDishCategoryEnabled: function (d, e)
    {
        var f = Main.GetIndexOnPropertyValueFound(Shopping.MenuCategories, "id", d);
        Shopping.MenuCategories[f].enabled = e;
        Shopping.PopulateDishesList(Shopping.Config.Dishes.List.SortBy, true)
    },
   
     AddToCart: function (x, y,options,comments,optionsid,total_price,Qtyi,ingredients)
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
        if(Main.User!=null)
        {
        	if(Main.ItemPointPermission==1)
        	{
        		if(isNaN(J.points))
        		{
        			alert("a");
        		}
        		else
        		{
        			w.points= J.points;
        		}
        	}
        }
       
		if(total_price) {
        w.price = total_price;
		} else {
	     w.price = J.price;
			
			}
			
		if(ingredients)	 {
		 w.ingredients = ingredients;
		} 
		else if(Main.ingredients != "") {
		w.ingredients = Main.ingredients;	
			}
		else {
		w.ingredients = "";
			}
		if(options) {
		    w.options= options;
		    w.optionsOnlytext= Main.temPoOnly;
			
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
		//alert(personsec);	
		if(personsec != 0) {
			//alert(personsec);
        w.nofperson=personsec;
		} 
		if(hiddenqty != 0) {
        w.nofqty=hiddenqty;
		}
		if(hiddenqty_status) {
        w.hiddenqty_status=hiddenqty_status;
		}
		
		//alert(JSON.stringify(w));
		if(total_price) { 	
		
	  w.total = parseFloat(total_price*quantitysec).toFixed(Main.IS_DECIMAL_POINT);		
	  w.points= w.points*quantitysec;
	  //alert(w.total)
		} else {
		
	w.total = parseFloat(document.getElementById("dish_" + y + "_price").innerHTML.replace("", "")*quantitysec).toFixed(Main.IS_DECIMAL_POINT);			
			}
	  
	 
    // ProductOption.CalculatePointValue();
		
		
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
				console.log("shop-details"+JSON.stringify(Shopping.Business[K]))

				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;


				I.paymethod = new Object();
				I.paymethoddetails = new Object();
				var paymentdetails = JSON.parse(Shopping.Business[K].paymentdetails);
				Shopping.PaymentExist = false

				for(var pay in paymentdetails){
					if(paymentdetails[pay] == 't'){
						Shopping.PaymentExist = true;
						I.paymethoddetails[pay] = true
					}else{
						I.paymethoddetails[pay] = false
					}
				}
			
				for(var pay in paymentdetails){					
					I.paymethod[pay] = false					
				}

				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				I.acceptsms = Shopping.Business[K].acceptsms;
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
				I.acceptsms = Shopping.Business[K].acceptsms;
				Shopping.Cart.business.push(I);
				D = Shopping.Cart.business.length - 1
			}
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

	GetCartItemsCount: function (){	
		var f = 0;
		var e = 0;
var n = "";
		for (i in Shopping.Cart.business){
			<!--MINIMUM PURCHASE-->
			e = 0;
			for (var c in Shopping.Cart.business[i].dishes){
				e += parseFloat(Shopping.Cart.business[i].dishes[c].total)
			}
			e += parseFloat(globalReserveTotalPrice);
			if(IS_SCRIPTID == 0){
				if(viewDevice == "Mobile") {				
					if (Shopping.Cart.business[i].minimum != "" && Shopping.Cart.business[i].minimum != 0){
						if (e >= Shopping.Cart.business[i].minimum){
							var mor = '<button type="button" class="btn-red" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['MOBILE_CHECKOUT_ORDER_NOW'] ?></button>'
							$("#min_order").empty().append(mor);
						}else{
							var mor = '<button type="button" class="btn-red order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?> '+Shopping.Business[0].currency+' '+Shopping.Cart.business[i].minimum+'</button>'
							$("#min_order").empty().append(mor);
						}
					}else{
						if(e > 0)
							$(".btn-red").removeClass("order_now_btn_gray");
					}
				}else{
					
					if (Shopping.Cart.business[i].minimum != "" && Shopping.Cart.business[i].minimum != 0){
						if (e >= Shopping.Cart.business[i].minimum){
							if(Main.WhereAmIData.reservestatus == 'reservation') {
								var mor = '<button type="button" class="order_now_btn" onclick="Shopping.OpenCartCheck(true)"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE'] ?></button>'
							}else{
								var mor = '<button type="button" class="order_now_btn" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
							}
							$("#min_order").empty().append(mor);
						}else{
							var mor = '<button type="button" class="order_now_btn order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Business[0].currency+' '+Shopping.Cart.business[i].minimum+'</button>'
							$("#min_order").empty().append(mor);
						}
					}else{
						if(e > 0)
							$(".order_now_btn").removeClass("order_now_btn_gray");
					}				 
				}
			}else{
				//var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness); 
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
			
			
			<!--MINIMUM PURCHASE-->

			for (var d in Shopping.Cart.business[i].dishes){
				f++;
			}
		}

		var qn = 0;
		if(Shopping.Cart.business) {
			for (var ff in Shopping.Cart.business){
				for (var e in Shopping.Cart.business[ff].dishes){
					qn +=Shopping.Cart.business[ff].dishes[e].quantity;
				}
				//alert()
			}

			if(viewDevice == "Desktop") {//alert(qn)
				$("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> '+qn+' <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
			}
			if(viewDevice == "Mobile") {
				$("#itemCount").html("("+qn+")");
			}
		}else{
			$("#orderprice").html("0.00");
			$("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> 0 <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
			if(viewDevice == "Desktop") {
				$("#itemCount").html('<?=$lang_resource['SHOPPING_YOU_HAVE'];?> <span> 0 <?=$lang_resource['SHOPPING_ITEMS'];?></span>');
			}
			if(viewDevice == "Mobile") {
				$("#itemCount").html("("+0+")");
			}
		}

		/*if(viewDevice == "Mobile") {
			return ;
		}*/

		if ((f != 0) && (lastid.toString() == "")) {
			lastid = f - 1;
			n += RestMenuList.MenuCartlist(lastid)
			$("#plc_rgt_in").append(n);
			Shopping.UpdateCartTotals();
		}else if (f != 0 && lastid != (f-1) && del != 1) {
			lastid = lastid + 1;			
			n += RestMenuList.MenuCartlist(lastid)
			$("#plc_rgt_in").append(n);
			Shopping.UpdateCartTotals();
		}

		$('[data-simplebar-direction]').each(function () {
			var totalheight = $("#plc_rgt_in").height()  +  $("#chk_reserve").height() ;
			if(totalheight >180) {
				//$(".dishDvScroll_in").css("height","300px");
				$(".simplebar-scrollbar").addClass('visible');
				$(".simplebar-scroll-content").css('height','200px');
				$(this).simplebar();
			}
		});

		$(document.body).trigger("sticky_kit:recalc")
		del = 0;
		var e = $("#cartbutton");
		if (f == 0){
			e.find(".innerbox").removeClass("blue").addClass("grey").find(".caption").removeClass("captionblue").addClass("captiongrey").html("<?= $lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] ?> (" + f + ")")
		}else{
			e.find(".innerbox").removeClass("grey").addClass("blue").find(".caption").removeClass("captiongrey").addClass("captionblue").html("<?= $lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] ?> (" + f + ")")
		}
		return f;
	},
   
    UpdateTotals: function ()
    {

        var d = 0;
        if(Main.User!=null)
        {
        	if(Main.ItemPointPermission==1)
        	{	
        		var total_point_rec=0;
        		//Shopping.Cart.usedpointvalue;

        		for (var p in Shopping.Cart.business)
		        {
		            
		            for (var h in Shopping.Cart.business[p].dishes)
		            {
		                total_point_rec = parseInt(parseInt(total_point_rec) + parseFloat(Shopping.Cart.business[p].dishes[h].points))
		            }
		            //alert(total_point_rec)
		            Shopping.Cart.Total_Point_Earned=total_point_rec;

		        }

        	}
        }
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(Main.IS_DECIMAL_POINT);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
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
						if(parseFloat(d)>= parseFloat(disprice)){
							
						d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(Main.IS_DECIMAL_POINT);
						Shopping.Cart.discountactive = true;
						
						
						if(document.getElementById("discount_div"))
						document.getElementById("discount_div").style.display="";
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = distext;
						if(document.getElementById("discount_price"))
						document.getElementById("discount_price").innerHTML = Shopping.FormatPrice(disprice.toFixed(Main.IS_DECIMAL_POINT));
						Shopping.Cart.discountprice = Shopping.FormatPriceNotFree(disprice.toFixed(Main.IS_DECIMAL_POINT));
						}
						else{
							
						Shopping.Cart.discountprice="";
						$("#discount_div").hide();
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = "";
					}
						
					}else{
						Shopping.Cart.discountprice="";
						$("#discount_div").hide();
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = "";
				}
				
				
		}
		
		
		Shopping.Cart.servicefeeTotal1=0;
		Shopping.Cart.servicefeeTotal=0;
		if((Shopping.Cart.servicefee=='') || (typeof Shopping.Cart.servicefee=='undefined')){
			Shopping.Cart.servicefee=0;
			
		}
		
		if(Shopping.Cart.servicefee>0){
			Shopping.Cart.servicefeeTotal=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100);
			Shopping.Cart.servicefeeTotal1=(parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100)).toFixed(Main.IS_DECIMAL_POINT)
		}
		
		var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
		
		Shopping.Cart.tax = taxprice.toFixed(Main.IS_DECIMAL_POINT);
		
		$("#cart_taxid").html(Shopping.Cart.tax);
		$("#cart_servicefeeid").html(Shopping.Cart.servicefeeTotal1);
		d=parseFloat(d)+ parseFloat(Shopping.Cart.servicefeeTotal);
		
       if(Shopping.Cart.buyer.taxtype == 1)
		{
		var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(Main.IS_DECIMAL_POINT);
		}
		else
		{
			var totalwithTax = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
		}
		  
		 
		
        Shopping.Cart.total = totalwithTax;
		
		if(document.getElementById("buyertips")){
		if(parseFloat(document.getElementById("buyertips").value))
       		var buyertipsc = document.getElementById("buyertips").value;
       	else
       		var buyertipsc = 0.00;
		}else{
			var buyertipsc = 0.00;
		}
		if(document.getElementById("buyertips")){
		if(parseFloat(document.getElementById("buyertips").value)){
       		$("#cart_tips_block").show();
			$("#cart_tips").html(parseFloat(buyertipsc).toFixed(Main.IS_DECIMAL_POINT));
		}else{
			$("#cart_tips_block").hide();
		}
		}
				
		
		 totalwithTax = Shopping.FormatPriceNotFree(Shopping.FixToDecimal(totalwithTax.toString()));
		
		if(globalReserveTotalPrice != "0")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else if(globalReserveTotalPrice != "0.00")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else {
			Shopping.Cart.grandtotal = totalwithTax;
			}
			
			if (buyertipsc != "")
				{
					
					Shopping.Cart.grandtotal  =  parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(buyertipsc)).toFixed(Main.IS_DECIMAL_POINT);
					$("#cart_tips_block").show();
					
					$("#cart_tips").html(parseFloat(buyertipsc).toFixed(Main.IS_DECIMAL_POINT));
				}
			 
			 
			Shopping.Cart.total =  Shopping.Cart.grandtotal;
		
		if(Main.NullToEmpty(Shopping.Cart.total)!="")	
		{
		$("#orderprice").html(Shopping.Cart.total);
			
		if(Shopping.Cart.totalfinla)
			{
				
				$("#totalorderprice").html(' <span>'+Shopping.Cart.totalfinla+'</span>');
				$("#availablepoints").html(' <span>'+Shopping.Cart.AvailablePointsAftr.toFixed(2)+'</span>');
				$("#pointsapplied").html(' <span>'+Shopping.Cart.Total_Point_Used+'</span>');
			}
			else
			{
			//alert("p")
			//alert(Shopping.Cart.total)
				$("#totalorderprice").html(' <span>'+Shopping.Cart.total+'</span>');

			}

		} else {
		$("#orderprice").html('0.00');	
			}
		
		
	
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{	
			Shopping.Cart.Total = Shopping.Cart.total;
			paypal.updatePrice(Shopping.Cart.total);
		}
    },
    UpdateCartTotals: function ()
    {
		
	
		
		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		
		//alert(JSON.stringify(Shopping.Business[u]))
        var d = 0;
		var cn = 0;
		var qn = 0;
		/*if(Shopping.Cart.total){
			 d =parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.total)).toFixed(Main.IS_DECIMAL_POINT)
		}
		
		*/
		
        for (var f in Shopping.Cart.business)
        {
			
            for (var e in Shopping.Cart.business[f].dishes)
            {
				
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
				cn++;
            }
		     //alert(qn)
			 $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> '+qn+' <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
			if(Shopping.Business[w].deliverycitysearch == true){
			if(parseFloat(d)>=parseFloat(Shopping.Business[w].maxforfreedelivery)){
		
			Shopping.Cart.business[0].shipping = '0';					
			}else{
			
			d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(Main.IS_DECIMAL_POINT);	
			}
			
			
		}else{
		d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(Main.IS_DECIMAL_POINT);	
		}
        }
		 
		
		if((Shopping.Cart.business[0])&&(document.getElementById("productTotal"))) 
		$("#productTotal").html(parseFloat(d).toFixed(Main.IS_DECIMAL_POINT));
		
		 if((Shopping.Cart.business[0])&&(document.getElementById(Shopping.Cart.business[0].id+"_shipping"))) 
		  $("#"+Shopping.Cart.business[0].id+"_shipping").html(parseFloat(Shopping.Cart.business[0].shipping).toFixed(Main.IS_DECIMAL_POINT));
		
		
		
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
							
						d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(Main.IS_DECIMAL_POINT);
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
				
				if(document.getElementById("cart_dis"))
				document.getElementById("cart_dis").innerHTML = "  "+Shopping.FormatPriceNotFree(disprice.toFixed(Main.IS_DECIMAL_POINT));
				
		}
		Shopping.Cart.discountprice = Shopping.FormatPriceNotFree(disprice.toFixed(Main.IS_DECIMAL_POINT));
		
		if(cn > 0 )
		{
			if(document.getElementById("showTax"))
			document.getElementById("showTax").style.display ="";
		}
		
		Shopping.Cart.servicefeeTotal=0;
		Shopping.Cart.servicefeeTotal1=0;
		if((Shopping.Cart.servicefee=='') || (typeof Shopping.Cart.servicefee=='undefined')){
			Shopping.Cart.servicefee=0;
			
		}
		
		
		if(Shopping.Cart.servicefee>0){
			Shopping.Cart.servicefeeTotal=(parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100));
			Shopping.Cart.servicefeeTotal1=(parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100)).toFixed(Main.IS_DECIMAL_POINT)
		}
		
		
		var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
		
        Shopping.Cart.tax = taxprice.toFixed(Main.IS_DECIMAL_POINT);
		
		
		$("#cart_taxid").html(Shopping.Cart.tax);
		$("#cart_servicefeeid").html(Shopping.Cart.servicefeeTotal1);
		d=parseFloat(d)+ parseFloat(Shopping.Cart.servicefeeTotal);
		if(Shopping.Cart.buyer.taxtype == 1)
		{ 
		var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(Main.IS_DECIMAL_POINT);
		}
		else
		{ 
			var totalwithTax = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
		}
        totalwithTax = Shopping.FormatPriceNotFree(Shopping.FixToDecimal(totalwithTax.toString()));
		//alert(totalwithTax)
		
		 
        Shopping.Cart.total = totalwithTax;
  
	  
	  if(globalReserveTotalPrice != "0")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else if(globalReserveTotalPrice != "0.00")
		{
			grand_total =parseFloat(parseFloat(Shopping.Cart.total) + parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT);
			Shopping.Cart.grandtotal = grand_total;
			$("#grand_total").html(Shopping.Cart.grandtotal);
		}
		else {
			Shopping.Cart.grandtotal = totalwithTax;
			}
			 if(Main.NullToEmpty(Shopping.Cart.buyer.tips) > 0 || Main.NullToEmpty(Shopping.Cart.buyer.tips) !="" ) {
				 
				 Shopping.Cart.grandtotal  =  parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.buyer.tips)).toFixed(Main.IS_DECIMAL_POINT);
				 
			 }
			
		Shopping.Cart.total =  Shopping.Cart.grandtotal;
		
		
		
		
		if(Main.NullToEmpty(Shopping.Cart.total)!="")	
		{
			
		$("#orderprice").html(Shopping.Cart.total);
		if(Main.NullToEmpty(Shopping.Cart.totalfinla)=="")
			$("#totalorderprice").html(' <span>'+Shopping.Cart.total+'</span>');

		} else {
		$("#orderprice").html('0.00');	
			}
		
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{	
			Shopping.Cart.Total = totalwithTax;
		}
    },
	OpenCartGuest: function(){

		Popup.Close();		

		Checkout.OpenCart();

		/*if(Shopping.Cart.preorder){	
			var catalogiD = Main.itemid;
		}else{
			var catalogiD = "0" ; 
		}*/

		//var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		/*$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + catalogiD + ',"bussid":' + Shopping.ActiveBusiness + "}]", function (record){
			Checkout.OpenCart(record);	
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchNeighborhoodforCity","cityid":' + Main.WhereAmIData.city +  "}]", function (data){
		    	Shopping.CheckoutAllNeighbor = new Array();
			  	data = JSON.parse(data);
			  	for(var x in data.neighbor){
			  		Shopping.CheckoutAllNeighbor.push(data.neighbor[x]);
			  	}			
					
			});
		});*/
	},
	checkPaymentOption: function(){
		paymentopt=false;
	
		
		for(var pay in Shopping.Cart.business[0].paymethod){
			if(Shopping.Cart.business[0].paymethoddetails[pay]){
				paymentopt = true;
			}
		}
		return paymentopt;
	},
	OpenCartCheck: function(chkOrdrNReserv){

		
        if (Shopping.Cart.business.length == 0){
			alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
			return
		}
		else if(Shopping.ActiveBusiness != Shopping.Cart.business[0].id){			
          alert("<?= $lang_resource['ONE_RESTAURANT'] ?>");
          // Shopping.OpenBusiness(Shopping.Cart.business[0].id)
           return
        }
		else if(Shopping.PaymentExist == false){
			alert("<?=$lang_resource['SHOPPING_PAYMENT_NOT_SELECTED']?>");
			return
		}else if(chkOrdrNReserv){
			if(globalReserve.Free.length == 0 && globalReserve.Table.length == 0 && globalReserve.Room.length == 0){
				alert("<?=$lang_resource['SHOPPING_RESERVE_AND_ORDER_CHECK']?>");
				return
			}else if(Shopping.Cart.business[0].dishes.length == 0 ){
				alert("<?=$lang_resource['CARTEMPTY_V21']?>");
				return
			}
		}
        
		if(!Shopping.Cart && viewDevice == "Mobile") {
			Main.InitInterface();
		}

		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		if(Main.User){
			delete Shopping.Cart.buyer.address;
			Shopping.Cart.buyer.address = Main.User.street;
			Checkout.OpenCart();
			
			/*Main.Loading();
			if(Shopping.Cart.preorder) {
				var catalogiD = Main.itemid;
			}	
			else {
				var catalogiD = 0 ; 
			}


			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + catalogiD +  ',"bussid":' + Shopping.ActiveBusiness + "}]", function (record){
				Main.Ready();
				//fetch all neighborhood for city
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchNeighborhoodforCity","cityid":' + Main.WhereAmIData.city +  "}]", function (data){
					Shopping.CheckoutAllNeighbor = new Array();
					data = JSON.parse(data);
					for(var x in data.neighbor){
						Shopping.CheckoutAllNeighbor.push(data.neighbor[x]);
					}
					Checkout.OpenCart(record);
				});
			});*/
	
		}else{
			if(IS_SCRIPTID == 0){
				if(viewDevice == "Mobile") {
					Visuals.LoginDetails();
				}
				if(viewDevice == "Desktop"){
					Main.LoginDetails();
				}
			}else{
				if(viewDevice == "Mobile") {
					Visuals.LoginDetails();
				}
				if(viewDevice == "Desktop"){
				Visuals.LoginDetailsView();
				}
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
			b += '<span class="label nonselectable default">Phone:</span><input type="text" id="buyertel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cel) + '" onkeyup="Shopping.UserUpdate(this,\'cel\')"/>';
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
			b += '<span class="label nonselectable default"><?= $lang_resource['SHOPPING_FOURTH_PHONE'] ?></span><input type="text" id="buyertel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cel) + '" onkeyup="Shopping.UserUpdate(this,\'cel\')"/>';
		
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
        b += '<?= $lang_resource['SITE_CURRENCY'] ?><span class="price" id="orderprice">0.00</span>';
        b += "</div></div>";
        b += "</div>";
        b += "</div>";
        Popup.Show(700, 700, b, null, function ()
        {//close popup
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				paypal.clearCheckPaymentTimer();
			if(document.getElementById("popupmainbuttonok")){	
            document.getElementById("popupmainbuttonok").style.display = "block";
			}
            Main.Ga(Main.ActiveView)
        }, function ()
        {
			if(document.getElementById("popupmainbuttonok")){	
           	 document.getElementById("popupmainbuttonok").style.display = "none";
			}
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
    BusinessPaymentUpdate: function (d, e, f){
    	

		if(e=='mercury'){
			$(".mercury_field").show();
		}else{
			$(".mercury_field").hide();
		}
		
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
			var transactium = document.getElementById('paymethod-transactium-check');
			
		}
   
        switch (e)
        {
        case "cash":
         
			Shopping.Cart.business[f].paymethod.cash = true;			
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{	
				if (cashCheck){
					cashCheck.checked = true
				}
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

				if(cashCheck){				
					cashCheck.checked = false;
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
				
				
				if(cashCheck){				
					cashCheck.checked = false;
				}
				
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
				
				if(cashCheck){				
					cashCheck.checked = false;
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
				
				if(cashCheck){				
					cashCheck.checked = false;
				}
				
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
					if(cashCheck){				
					cashCheck.checked = false;
				}
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
			
			case "mercury":
		 
		   
		   if(IS_PAYPALADAPTIVE_ENABLED == 1)
			{
				
				if (paypalCheck){
					paypalCheck.checked = false;
				}
				if (cardCheck){
					cardCheck.checked = false;
				}
				
				if(cashCheck){				
					cashCheck.checked = false;
				}
				
				if (marcoCheck) {
					marcoCheck.checked = false;
				}
				
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
									
				if (braintreeCheck)
					braintreeCheck.checked=false;
			
			
				Shopping.Cart.business[f].paymethod.braintree = false;
					
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.marco = false;
			Shopping.Cart.business[f].paymethod.paypaladaptive = false;
			
			Shopping.Cart.business[f].paymethod.mercury = true;
			
			Shopping.updateOrderBtn('mercury');
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
				if(cashCheck){				
					cashCheck.checked = false;
				}
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
				
				if(cashCheck){				
					cashCheck.checked = false;
				}
				
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
			 
			case "transactium":
	
		   if(IS_PAYPALADAPTIVE_ENABLED == 1)
			{
				if (paypalCheck)
					paypalCheck.checked = false;
				
				if (cardCheck)
					cardCheck.checked = false;
				
				if(cashCheck){				
					cashCheck.checked = false;
				}
				
				if (marcoCheck)
					marcoCheck.checked = false;
				
				
				if (paypaladaptiveCheck)
					paypaladaptiveCheck.checked = false;
					
							
				if (braintreeCheck)
					 braintreeCheck.checked=false;
					 
				if (authorizednet)
					authorizednet.checked = false;
					
			Shopping.Cart.business[f].paymethod.transactium = true;		
			Shopping.Cart.business[f].paymethod.cardsave = false;
				
		    Shopping.Cart.business[f].paymethod.authorizednet = false;
			Shopping.Cart.business[f].paymethod.paypaladaptive = false;
			Shopping.Cart.business[f].paymethod.cash = false;
			Shopping.Cart.business[f].paymethod.card = false;	
			Shopping.Cart.business[f].paymethod.paypal = false;	
			Shopping.Cart.business[f].paymethod.marco = false;
			Shopping.Cart.business[f].paymethod.braintree = false;
			
			Shopping.updateOrderBtn('transactium');
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
			
			case 'mercury':	
		
                var itemId = mercury.createId();
                topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+mercury.createButton({itemId:itemId,formName:'paypalform-top',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>');
                bottomBtn.replaceWith('<div class="order hand" id="bottom-order-btn"><span class="caption nonselectable">'+mercury.createButton({itemId:itemId,formName:'paypalform-bottom',email:Shopping.Cart.business[0].paypal,itemPrice:Shopping.Cart.Total})+'</div>')
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
	    case "lastname2":
            Shopping.Cart.buyer.lastname2 = f.value;
            break;
        case "email":
            Shopping.Cart.buyer.email = f.value;
            break;
        case "address":
            Shopping.Cart.buyer.address = f.value;
            break;
		case "city":
            Shopping.Cart.buyer.city = f.value;		
			Shopping.Cart.buyer.cityname = $("select[id='buyercity'").find('option:selected').text();
			
			
			
			if(Main.neighsettings == 't'){
			if (!Shopping.Cart.buyer.city) {
            Shopping.Cart.buyer.city = -1
        	}

			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchNeighborhoodforCity","cityid":' + Shopping.Cart.buyer.city +  "}]", function (data)
		    {
		    	var htm = "";  
		    	if(data !=""){
			  Shopping.CheckoutAllNeighbor = new Array();
			  data = JSON.parse(data);
			  
			  for(var x in data.neighbor)
			  {
				  Shopping.CheckoutAllNeighbor.push(data.neighbor[x]);
				  
			  }
			
			
			 
			 htm += '<option value=""></option>';
				   if(Shopping.CheckoutAllNeighbor.length!=0)
				   {
				   for(var x in Shopping.CheckoutAllNeighbor)
				   {
				   htm += '<option value="'+Shopping.CheckoutAllNeighbor[x].id+'">'+Shopping.CheckoutAllNeighbor[x].name+'</option>'
				   }
				   
				   
				   }
				}
			 
			 document.getElementById("buyercolony").innerHTML = htm;
			});
			}
		case "api":
            Shopping.Cart.buyer.api = f.value;
			 break;
		case "zipcode":
            Shopping.Cart.buyer.zipcode = f.value;
            break;			
        case "colony":
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
				
 				if(Main.neighsettings == 't'){
				Shopping.Cart.buyer.colony = $("select[id='buyercolony'").find('option:selected').text();
				}else{
				Shopping.Cart.buyer.colony = f.value;
				}
			
            break;
        case "tel":
            Shopping.Cart.buyer.tel = f.value;
            break;
		 case "cel":
            Shopping.Cart.buyer.tel = f.value;
            break;	
		case "tips":
			if(parseFloat(f.value)){
				Shopping.Cart.buyer.tips = f.value;
			} else {
				Shopping.Cart.buyer.tips = 0.00;
			}
			$("#cart_tips_block").toggle();
			Shopping.UpdateTotals();
			break;

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
			
	  	case "mercury_acno":
            Shopping.Cart.buyer.mercury_acno = f.value;
            break;
			
		case "mercury_exmm":
            Shopping.Cart.buyer.mercury_exmm = f.value;
            break;
			
		case "mercury_exyy":
            Shopping.Cart.buyer.mercury_exyy = f.value;
            break;		
			
			
		case "cardno":
            Shopping.Cart.buyer.cardno = f.value;
			 break;	
			 
			case "cvv2":
            Shopping.Cart.buyer.cvv2 = f.value;	
			 
			 
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
		/*case "stripecardno":
            Shopping.Cart.buyer.stripecardno = f.value;
            break;
		case "stripeexpmm":
            Shopping.Cart.buyer.stripeexpmm = f.value;
        break;
		case "stripeexpyy":
            Shopping.Cart.buyer.stripeexpyy = f.value;
        break;
		case "stripecvv":
            Shopping.Cart.buyer.stripecvv = f.value;
        break;*/
		case "cityname":
            Shopping.Cart.buyer.cityname = f.value;
        break;
		case "zip":
            Shopping.Cart.buyer.zip = f.value;
        break;
			
		case "countryname":
            Shopping.Cart.buyer.countryname = f.value;
        break;	
		case "state":
            Shopping.Cart.buyer.state = f.value;
        break;	
		case "lastname":
            Shopping.Cart.buyer.lastname = f.value;
        break;	
		case "firstname":
            Shopping.Cart.buyer.firstname = f.value;
        break;	
		case "street":
            Shopping.Cart.buyer.street = f.value;
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
				alert("<?=$lang_resource['SHOPPING_DISCOUNT_CUPON_SORRY_MULTI']?>")
			}
		 }
		 else if(f.value.length > 10)
		 {
			 
			document.getElementById("discountimg").innerHTML ='<img src="images/dis_pics/cross.png" style="padding-top: 26px">'
			document.getElementById("discounttext").innerHTML ='<?= $lang_resource['CHECKOUT_COUPON_NOT_APPLIED'] ?>';
			if(viewDevice == "Mobile") {
			Checkout.OrderDetails()
			}
		 }
		 else if(f.value.length < 10)
		 {
		  document.getElementById("discountimg").innerHTML ='';
		  document.getElementById("discounttext").innerHTML ='';
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
		
		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);	
		
		if(Shopping.Business[w].deliverycitysearch == true){
			Shopping.Cart.business[c].shipping = Shopping.Business[w].shipping;					
			}
		
		
     var  quantity=Shopping.Cart.business[c].dishes[d].quantity;
	 //alert('Qty status y/n = '+Shopping.Cart.business[c].dishes[d].hiddenqty_status);
	 if(Shopping.Cart.business[c].dishes[d].hiddenqty_status == 1){
	 if(Shopping.Cart.business[c].dishes[d].nofqty) {
		 if(quantity <= Shopping.Cart.business[c].dishes[d].nofqty)
		 {
			alert('<?=$lang_resource['CART_LIST_MINIMUM_QTY'];?> '+Shopping.Cart.business[c].dishes[d].nofqty); 
			return false;
		 }
	 }
	 }//if minimum qty is required or mandatory
       if(quantity==1){
        Shopping.Cart.business[c].dishes.splice(d, 1);
        if (Shopping.Cart.business[c].dishes.length == 0)
        {
        
        	$(".simplebar-scroll-content").css('height','auto');
			$("#orderprice").html("0.00");
			
            Shopping.Cart.business.splice(c, 1)
			var n = "";
			$("#plc_rgt_in").html(n);
			$("#orderprice").html("0.00");
			$("#cart_taxid").html("0.00");
			$("#cart_servicefeeid").html("0.00");
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
				Shopping.Cart.total = Shopping.Cart.Total
				
				document.getElementById("total_p").innerHTML = Shopping.Cart.total;
			}
		 
			   return false;
		   }
	lastid -= 1;
	var n = "";
	if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
		
			
			n += RestMenuList.MenuCartlist(i)

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
         var points=Shopping.Cart.business[c].dishes[d].points;
         //alert(points)
         if(points=="NaN")
			{

			}
         else
         {
          	 // alert("SFSADFsad");
        	  points=points/quantity; 
      	}
          var quantity=quantity-1;

		if(mychoice_data[d]) {
           mychoice_data[d]['review']['quantity']=quantity;
		}
		

		
           Shopping.Cart.business[c].dishes[d].quantity=quantity;
           Shopping.Cart.business[c].dishes[d].total=Shopping.Cart.business[c].dishes[d].total-total;
           if(Shopping.Cart.business[c].dishes[d].points !=null)
         {
		   Shopping.Cart.business[c].dishes[d].points =Shopping.Cart.business[c].dishes[d].points - points;
		   
		   }
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
                 
				n += RestMenuList.MenuCartlist(i)

               }
			   del = 1;
           }
           Shopping.UpdateCartTotals();
		   Shopping.GetCartItemsCount();


           if (this.GetCartItemsCount() <= 0)
           {
               Popup.Close();
           }

       //     for(var beido in Main.fetchbusinesspointsenabled)
					  //  	{
					  //  		if(Shopping.ActiveBusiness==Main.fetchbusinesspointsenabled[beido].business_id)
					  //  //	alert(Main.availablepoint)
							// {  
       //     						ProductOption.CalculatePointValue();
       //     						break;
       //     					}
       //     				}
       if(isNaN(Shopping.Cart.business[c].dishes[d].points !=0))
           {
           		ProductOption.CalculatePointValue();
           }
           else if(isNaN(Shopping.Cart.business[c].dishes[d].points !=null))
           {
           		ProductOption.CalculatePointValue();
           }
           else
           {
           	
           }

           //ProductOption.CalculatePointValue();
           $("#plc_rgt_in").html(n);

       }
	   
	   	$('[data-simplebar-direction]').each(function () {
			
			
				if($("#plc_rgt_in").height() < 230) {
					
					$(".simplebar-scrollbar").removeClass('visible');
					//$(".dishDvScroll_in").css("height","300px");
					
					
				 //  $(this).simplebar();
				}
			
			
        });


         for (i in Shopping.Cart.business)
        {
			<!--MINIMUM PURCHASE-->
			e = 0;
			
			for (var c in Shopping.Cart.business[i].dishes){
				e += parseFloat(Shopping.Cart.business[i].dishes[c].total)
			}
			e += parseFloat(globalReserveTotalPrice);
			
			
			 if(viewDevice == "Mobile") {	
			 
				if (Shopping.Cart.business[i].minimum != "" && Shopping.Cart.business[i].minimum != 0){
				  if (e >= Shopping.Cart.business[i].minimum){
					  
					var mor = '<button type="button" class="btn-red" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['MOBILE_CHECKOUT_ORDER_NOW'] ?></button>'
					
					$("#min_order").empty().append(mor);
					
				  }else{
					  var mor = '<button type="button" class="btn-red order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?> '+Shopping.Business[0].currency+' '+Shopping.Cart.business[i].minimum+'</button>'
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
				   if(Main.WhereAmIData.reservestatus == 'reservation') {
					   	var mor = '<button type="button" class="order_now_btn" onclick="Shopping.OpenCartCheck(true)"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE'] ?></button>'
				   }else{
					   	var mor = '<button type="button" class="order_now_btn" onclick="Shopping.OpenCartCheck()"><?= $lang_resource['SHOPPING_FOURTH_ORDER_NOW'] ?></button>'
				   }
			
				$("#min_order").empty().append(mor);
				
			  }else{
				 
				  var mor = '<button type="button" class="order_now_btn order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?>'+Shopping.Business[0].currency+' '+Shopping.Cart.business[i].minimum+'</button>'
				  $("#min_order").empty().append(mor);
			  }
			}else{
				if(e > 0)
				$(".order_now_btn").removeClass("order_now_btn_gray");
			}				 
				}
			<!--MINIMUM PURCHASE-->
		}
	   
	   
	    var qn = 0;
		
		
		
        for (var f in Shopping.Cart.business)
        {
          
            for (var e in Shopping.Cart.business[f].dishes)
            {
				
              
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
				
            }
        }
	//alert(qn)
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
					$("#cart_taxid").html("0.00");
					$("#cart_servicefeeid").html("0.00");
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
		
		if(Main.panelsetting == "2"){
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchLatestDeliveryZone","id":' + Shopping.ActiveBusiness+'}]', function (b){
				if (b != "") {
					b = JSON.parse(b).deliveryzonenew;
					
					if (b.zone1.coordinates == "") {
						b.zone1.coordinates = new Array()
						Main.WhereAmILocationData.price1 =  0;
					}
					else {
						if(b.zone1.price)						
							Main.WhereAmILocationData.price1 =  b.zone1.price;
						else
							Main.WhereAmILocationData.price1 = 0;

						
					}
					GoogleMap.PrintShape("zone1", b.zone1.coordinates);

					if (b.zone2.coordinates == "") {
						b.zone2.coordinates = new Array()
						Main.WhereAmILocationData.price2=  0;
					}
					else {
						if(b.zone2.price)						
							Main.WhereAmILocationData.price2 =  b.zone2.price;
						else
							Main.WhereAmILocationData.price2 = 0;

					}
					GoogleMap.PrintShape("zone2", b.zone2.coordinates);

					if (b.zone3.coordinates == "") {					
						b.zone3.coordinates = new Array()
						Main.WhereAmILocationData.price3=  0;
					}
					else {
						if(b.zone3.price)						
							Main.WhereAmILocationData.price3 =  b.zone3.price;
						else
							Main.WhereAmILocationData.price3 = 0;
					}
					GoogleMap.PrintShape("zone3", b.zone3.coordinates)

				}else{
					b = new Array();
					GoogleMap.PrintShape("zone1", b);
				}
				mobstyle='';
				if(viewDevice == "Mobile"){
					mobstyle='width:100%';
				}				
				var rec = '<div style="float:right;">';
				if((Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price1) != 0.000) || (Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price2) != 0.000) || (Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price3) != 0.000)){				
				rec+='<span class="deliveryprBlock" style="float:left; margin: 2px 10px 0px 0px; font-weight:bold;'+mobstyle+'"><?= $lang_resource['DELIVERYP_V21'] ?></span>';
				}
				if(Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price1) != 0.000){
				rec +='<div style="width:15px; height:15px; float:left; margin:3px 5px 0px 0px; background:#6fbc5a"></div><span style="float:left; margin: 2px 10px 0px 0px">'+Main.car+' '+Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price1)+'</span>';
				}
				
				if(Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price2) != 0.000){
				rec +='<div style="width:15px; height:15px; float:left; margin:3px 5px 10px 0px; background:#4f9bc4"></div><span style="float:left; margin: 2px 10px 10px 0px">'+Main.car+' '+Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price2)+'</span>';
				}
				
				if(Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price3) != 0.000){
				rec+=' <div style="width:15px; height:15px; float:left; margin:3px 5px 0px 0px; background:#fac739"></div><span style="float:left; margin: 2px 10px 10px 0px">'+Main.car+' '+Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price3)+'</span>';
				}
				rec+='</div>';
				
				document.getElementById("deliveryItemPrice").innerHTML = rec;
			});

		}else{
			var b = Main.WhereAmILocationData.zonesloc;		

			if (b != "") {
				b = JSON.parse(b);
				
				if (b.zone1.coordinates == "") {
					b.zone1.coordinates = new Array()
					Main.WhereAmILocationData.price1 =  0;
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
					Main.WhereAmILocationData.price3 =  b.zone3.price;
				}
				GoogleMap.PrintShape("zone3", b.zone3.coordinates)
				

			}else{
				b = new Array();
				GoogleMap.PrintShape("zone1", b);
			}
			mobstyle='';
			if(viewDevice == "Mobile"){
				mobstyle='width:100%';
			}
			var rec = '<div style="float:right;"><span class="deliveryprBlock" style="float:left; margin: 2px 10px 0px 0px; font-weight:bold;'+mobstyle+'"><?= $lang_resource['DELIVERYP_V21'] ?></span><div style="width:15px; height:15px; float:left; margin:3px 5px 0px 0px; background:#6fbc5a"></div> <span style="float:left; margin: 2px 10px 0px 0px"><?= $lang_resource['SITE_CURRENCY'] ?> '+Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price1)+'</span><div style="width:15px; height:15px; float:left; margin:3px 5px 10px 0px; background:#4f9bc4"></div> <span style="float:left; margin: 2px 10px 10px 0px"><?= $lang_resource['SITE_CURRENCY'] ?>  '+Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price2)+'</span><div style="width:15px; height:15px; float:left; margin:3px 5px 0px 0px; background:#fac739"></div> <span style="float:left; margin: 2px 10px 10px 0px"> <?= $lang_resource['SITE_CURRENCY'] ?> '+Shopping.FormatPriceNotFree(Main.WhereAmILocationData.price3)+'</span></div>';
			document.getElementById("deliveryItemPrice").innerHTML = rec;
		}
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
		
		
		var x = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		if(!Shopping.Cart.buyer.cityname){
		
			Shopping.Cart.buyer.cityname = 	Shopping.Business[x].cityname;
			}
			
		
		var WhereAmIDatanew = new Array();
		
		WhereAmIDatanew = Main.WhereAmIData
		WhereAmIDataLoc = Main.WhereAmIData.location;
		delete WhereAmIDatanew.location;
			
		setpayment=false;
			var paypalCheck = document.getElementById('paymethod-paypal-check');    
			var cardCheck = document.getElementById('paymethod-card-check');
			var cashCheck = document.getElementById('paymethod-cash-check');
			var marcoCheck = document.getElementById('paymethod-marco-check');
			var paypaladaptiveCheck = document.getElementById('paymethod-paypaladaptive-check');
			var braintreeCheck = document.getElementById('paymethod-braintree-check');
			var authorizednet = document.getElementById('paymethod-authorizednet-check');
			var cardsave = document.getElementById('paymethod-cardsave-check');
			if((paypalCheck) && (paypalCheck.checked==true)){
				setpayment=true;
				
			}
			if((cardCheck) && (cardCheck.checked==true)){
				setpayment=true;
				
			}
			if((marcoCheck) && (marcoCheck.checked==true)){
				setpayment=true;
				
			}
			if((paypaladaptiveCheck) && (paypaladaptiveCheck.checked==true)){
				setpayment=true;
				
			}
			if((cashCheck) && (cashCheck.checked==true)){
				setpayment=true;
				
			}
			if((braintreeCheck) && (braintreeCheck.checked==true)){
				setpayment=true;
				
			}
			if((authorizednet) && (authorizednet.checked==true)){
				setpayment=true;
				
			}
			if((cardsave) && (cardsave.checked==true)){
				setpayment=true;
				
			}
			
			
		if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
		{
			// if(viewDevice != "Mobile") {
			if (!Shopping.CanPlaceOrder())
				return;
			 //}
		}
        else
		{
			
		
			/*if (this.SavingOrder)
			{
				return
			}*/
			var e;
			 if(viewDevice != "Mobile") {/*
			for (var d in Shopping.Cart.business)
			{
				e = 0;
				for (var c in Shopping.Cart.business[d].dishes)
				{
					e += parseFloat(Shopping.Cart.business[d].dishes[c].total)
				}
				e += parseFloat(globalReserveTotalPrice);
				
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
				alert("<?=$lang_resource['SHOPPING_DELIVERY_TIME_IN_HOUR'];?>")	
				return
					}
					
				else if(document.getElementById("preordermin").value == "") {
				alert("<?=$lang_resource['SHOPPING_DELIVERY_TIME_IN_MINUTE'];?>")	
				return
					}	
			}
			 */}
			 
			
		}
			if(setpayment==false){
				alert("<?=$lang_resource['BUSINESS_PAYMENT_VALIDATION'];?>");
				return
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
		var cus_sl = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		Shopping.Cart.customslug = Shopping.Business[cus_sl].customslug;
		//Shopping.Cart.customslug =Shopping.Business[0].customslug;
   
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
			
		
		
		if(Shopping.Cart.preorder) {
		 var d = new Date(Shopping.Cart.preorderDate);
          //Shopping.Cart.buyer.deliveryhours = d.getFullYear() + '-' + Main.zeroPad((d.getMonth()+1),2) + '-' + Main.zeroPad(d.getDate(),2) +'   '+ Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2) ;		 
		b += '<div class="buyerpaymentheading" style="font-size:15px; color:#000;!important"><?=$lang_resource['PREORDER_DELIVERY']?> '+ d.getFullYear() + '-' + Main.zeroPad((d.getMonth()+1),2) + '-' + Main.zeroPad(d.getDate(),2) +'   '+ Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2) +'</div>';
	}
		
		console.log("shop-det"+JSON.stringify(Shopping.Cart)+paypalInfo)
		console.log("zip"+Shopping.Cart.buyer.zipcode)
		Main.confirmOrder  = false;
		Shopping.Cart.searchinfo = WhereAmIDatanew;
		//cityid = Shopping.Cart.buyer['city'];
		for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(unescape(encodeURIComponent(Shopping.Cart.buyer[n])))
		}
		
		
		if(Shopping.Cart.buyer.city == "" || Main.NullToEmpty(Shopping.Cart.buyer.city) == "" ) {
	   Shopping.Cart.buyer.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "city");
	   }
     
	
			
			
		$("#checkoutloading").show();	
        var b = new Date().getTime();
        Main.Aid = b;
        
       // this.SavingOrder = true;	
	  
		//alert(JSON.stringify(Shopping.Cart))
        $.post("panel/lib/front-main.php", "f=PlaceOrder&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f) {
			//alert(f)
			

			for(var n in Shopping.Cart.buyer){
				if(n !="checkoutfields" && n!="deliverydate" && n!="city")
				Shopping.Cart.buyer[n] = unescape(window.atob(Shopping.Cart.buyer[n]))
			}
			
	
	   
		//	Shopping.Cart.buyer['city'] = cityid;
			
			//alert(f);
			
			var custom_link =  "<?=$lang_resource['BACK_BUTTON_CONFIRMATION']?>_"+Shopping.ActiveBusinessName.split(" ").join("");
			window.history.pushState( {"id":105} , "Confirmation", custom_link );
			if(Shopping.ActiveBusiness){
				Main.stepBack  = 7;				
			}else{				
				Main.stepBack  = 5;
			}
			
			
			Main.confirmOrder  = true;
			
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
              
               
               	lastid = "";
				
				$(".main li").removeClass("active-step");
				$(".main #get_dlvrd").addClass("active-step");	

                Shopping.EmptyCart();
				
                this.SavingOrder = false;
				
			
				 $.post("panel/lib/front-main.php", "f=FetchOrder&id=" + id, function (c) {	
				 	$("#checkoutloading").hide();	
				  if(viewDevice != "Mobile") {
				 	Checkout.ShowConfirm(id,c,chk)
				  }else{
					  RestMenuList.ShowConfirmMob(id,c,chk)
				  }
					
					 });
				
						
                
            }
        });
    },
	
		checkBoxtick: function(frm){
		document.getElementById("business_category_all").checked = false;
		 if(document.getElementById(frm).checked) {
		
		  document.getElementById(frm).checked = false;
		  Shopping.SetBusinessCategoryEnabled(frm.replace("business_category_switch_", ""), false)
		  } else {
			
		 document.getElementById(frm).checked = true;
		 Shopping.SetBusinessCategoryEnabled(frm.replace("business_category_switch_", ""), true)
		  }
		
		  },
	
    CanPlaceOrder: function()
        {
			
			
			var x = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		if(!Shopping.Cart.buyer.cityname){
		
			Shopping.Cart.buyer.cityname = 	Shopping.Business[x].cityname;
			}  
			
				var checkoutfields = Array();
				var c = 0;
				for(var b in Main.checkoutinfo){
					
					if(Main.checkoutinfo[b].status=='t'){
						
						checkoutfields[c]= Main.checkoutinfo[b].field_name;	
						c++;				
					}
					
				}
				

			Shopping.Cart.buyer.checkoutfields = checkoutfields;
			
			if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
			{
				
				if (this.SavingOrder)
				{
					return false;
				}
				var e;
				
				for (var idx in Shopping.Cart.business)
				{
				Shopping.Cart.business[idx].name = Shopping.Cart.business[idx].name.split("&").join("@@@");
				
				for (var es in Shopping.Cart.business[idx].dishes)
				{
				
				
				Shopping.Cart.business[idx].dishes[es].name = Shopping.Cart.business[idx].dishes[es].name.split("&").join("@@@");
				if(Shopping.Cart.business[idx].dishes[es].options)
				Shopping.Cart.business[idx].dishes[es].options = Shopping.Cart.business[idx].dishes[es].options.split("&").join("@@@");
				if(Shopping.Cart.business[idx].dishes[es].comments)
				Shopping.Cart.business[idx].dishes[es].comments = Shopping.Cart.business[idx].dishes[es].comments.split("&").join("@@@");
				if(Shopping.Cart.business[idx].dishes[es].optionsOnlytext)
				Shopping.Cart.business[idx].dishes[es].optionsOnlytext = Shopping.Cart.business[idx].dishes[es].optionsOnlytext.split("&").join("@@@");
				
				
				}
				}
				
				if(Shopping.Cart.buyer.comments)
				Shopping.Cart.buyer.comments = Shopping.Cart.buyer.comments.split("&").join("@@@");

				
				for (var d in Shopping.Cart.business)
				{
					e = 0;
					for (var c in Shopping.Cart.business[d].dishes)
					{
						e += parseFloat(Shopping.Cart.business[d].dishes[c].total)
					}
					e += parseFloat(globalReserveTotalPrice);
					
					if (Shopping.Cart.business[d].minimum != "")
					{
						if (e < Shopping.Cart.business[d].minimum)
						{
							alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_1'] ?> " + Shopping.Cart.business[d].name + " <?= $lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_2'] ?>" + Shopping.Cart.business[d].minimum + " <?= $lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_3'] ?>");
							return
						}
					}
				}
				
				/*for (var p in Shopping.Cart.business)
				{
			if(Shopping.Cart.business[p].dishes!=''){
				return true;
			}
				}*/
				
				if(Main.checkoutinfo['Name'].status == 't' && Main.checkoutinfo['Name'].required == 't'){
					if (Shopping.Cart.buyer.name == "" || Shopping.Cart.buyer.name == " " || !Shopping.Cart.buyer.name){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_NAME'] ?>");
						return false
					}
				}
				
				if(Main.checkoutinfo['Email'].status == 't' && Main.checkoutinfo['Email'].required == 't'){
					if (Shopping.Cart.buyer.email == "" || Shopping.Cart.buyer.email == " " || !Main.IsEmail(Shopping.Cart.buyer.email)){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>");
						return false
					}
				}
				if(Main.checkoutinfo['Phone'].status == 't' && Main.checkoutinfo['Phone'].required == 't'){
					if (Shopping.Cart.buyer.tel == "" || Shopping.Cart.buyer.tel == " " || !Shopping.Cart.buyer.tel){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_PHONE'] ?>");
						return false
					}
				}
				
				
				if(Shopping.Cart.business!=''){
				if(Main.checkoutinfo['Last Name'].status == 't' && Main.checkoutinfo['Last Name'].required == 't'){
					if (Shopping.Cart.buyer.lastname2 == "" || Shopping.Cart.buyer.lastname2 == " " || !Shopping.Cart.buyer.lastname2){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_LASTNAME'] ?>");
						return false
					}
				}
				
				if(Main.checkoutinfo['Receive SMS'].status == 't' && Main.checkoutinfo['Receive SMS'].required == 't'){
					if (Shopping.Cart.twilioenabledclient == "" || Shopping.Cart.twilioenabledclient == " " || !Shopping.Cart.twilioenabledclient){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_TWILO'] ?>");
						return false
					}
				}
				
				//if(Main.deliveryType == "delivery"){
				if(Main.checkoutinfo['Full Address'].status == 't' && Main.checkoutinfo['Full Address'].required == 't'){
					if (Shopping.Cart.buyer.address == "" || Shopping.Cart.buyer.address ==  " "  || !Shopping.Cart.buyer.address){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>");
						return false
					}
					Shopping.Cart.buyer.address= Shopping.Cart.buyer.address.replace("%20", " ");
				}
				if(Main.checkoutinfo['APT/Suit'].status == 't' && Main.checkoutinfo['APT/Suit'].required == 't'){
					if (Shopping.Cart.buyer.api == "" || Shopping.Cart.buyer.api == " " || !Shopping.Cart.buyer.api){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_APT_SUIT'] ?>");
						return false
					}
				}
				if(Main.checkoutinfo['Zipcode'].status == 't' && Main.checkoutinfo['Zipcode'].required == 't'){
					if (Shopping.Cart.buyer.zipcode == "" || Shopping.Cart.buyer.zipcode == " " || !Shopping.Cart.buyer.zipcode){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_ZIP_CODE'] ?>");
						return false
					}
				}
				if(Main.checkoutinfo['City'].status == 't' && Main.checkoutinfo['City'].required == 't'){
					if (Shopping.Cart.buyer.city == "" || Shopping.Cart.buyer.city == " " || !Shopping.Cart.buyer.city){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_CITY'] ?>");
						return false
					}
				}

				if(Main.checkoutinfo['Area / Neighborhood'].status == 't' && Main.checkoutinfo['Area / Neighborhood'].required == 't'){
					if (Shopping.Cart.buyer.colony == ""  || Shopping.Cart.buyer.colony == " "  || !Shopping.Cart.buyer.colony){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_NEIGHBORHOOD'] ?>");
						return false
					}
				}
				//}

				if(Main.checkoutinfo['Where did you find about us'].status == 't' && Main.checkoutinfo['Where did you find about us'].required == 't'){
					if (Shopping.Cart.buyer.reference == "" || Shopping.Cart.buyer.reference == " " || !Shopping.Cart.buyer.reference){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_REFERENCE'] ?>");
						return false
					}
				}
				
				if(Main.checkoutinfo['Tip For The Driver'].status == 't' && Main.checkoutinfo['Tip For The Driver'].required == 't' && Main.deliveryType!='pickup'){
			if (Shopping.Cart.buyer.tips == "" || Shopping.Cart.buyer.tips == " "  || !Shopping.Cart.buyer.tips){
				alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_TIPS'] ?>");
				return false
			}
		}
		if(Main.checkoutinfo['Discount Coupon'].status == 't' && Main.checkoutinfo['Discount Coupon'].required == 't'){
			if (Shopping.Cart.buyer.discountcode == "" || !Shopping.Cart.buyer.discountcode){
				alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_DISCOUNT'] ?>");
				return false
			}
		}

		if(Main.checkoutinfo['Takeout Date'].status == 't' && Main.checkoutinfo['Takeout Date'].required == 't'){
			if(document.getElementById("chkout_hour"))	{
				if (document.getElementById("chkout_hour").value != "ASAP"){					
					if(document.getElementById("preorderhh").value == "") {
						alert("<?=$lang_resource['SHOPPING_DELIVERY_TIME_IN_HOUR'];?>")	
						return false
					}else if(document.getElementById("preordermin").value == "") {
						alert("<?=$lang_resource['SHOPPING_DELIVERY_TIME_IN_MINUTE'];?>")	
						return false
					}	
				}
			}
		}

	}
	
				
				
					
					
						var authorizednet = document.getElementById('paymethod-authorize-check');
						if (document.getElementById('paymethod-authorize-check') && authorizednet.checked){
							
						//	alert(Shopping.Cart.buyer.cvv2)
						if (Shopping.Cart.buyer.firstname == "" || !Shopping.Cart.buyer.firstname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_FIRSTNAME_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.lastname == "" || !Shopping.Cart.buyer.lastname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_LASTNAME_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.street == "" || !Shopping.Cart.buyer.street)
						{
							alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>");
							return false
						}
							if (Shopping.Cart.buyer.cityname == "" || !Shopping.Cart.buyer.cityname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CITYNAME_ALERT']?>");
							return false;
						}
							if (Shopping.Cart.buyer.state == "" || !Shopping.Cart.buyer.state)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_STATE_ALERT']?>");
							return false;
						}
							if (Shopping.Cart.buyer.countryname == "" || !Shopping.Cart.buyer.countryname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_COUNTRYNAME_ALERT']?>");
							return false;
						}
							if (Shopping.Cart.buyer.zip == "" || !Shopping.Cart.buyer.zip)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_ZIP_ALERT']?>");
							return false;
						}
							
						if (Shopping.Cart.buyer.cardno == "" || !Shopping.Cart.buyer.cardno)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO_ALERT']?>");
							return false;
						}
						
						if (Shopping.Cart.buyer.cvv2 == "" || !Shopping.Cart.buyer.cvv2 )
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT']?>");
							return false;
						}
						
						
						if (Shopping.Cart.buyer.expmm == "" || !Shopping.Cart.buyer.expmm)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.expyy == "" || !Shopping.Cart.buyer.expyy)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY_ALERT']?>");
							return false;
						}
						
						
						
						}
				
				
				if(document.getElementById('paymethod-cardsave-check')) {
					var cardsave = document.getElementById('paymethod-cardsave-check');
					if (cardsave.checked){
						if (Shopping.Cart.buyer.address == "" || !Shopping.Cart.buyer.address)
						{
							alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>");
							return false
						}
						else
						{
							Shopping.Cart.buyer.address= Shopping.Cart.buyer.address.replace("%20", " ");
						}
						if (Shopping.Cart.buyer.colony == "" || !Shopping.Cart.buyer.colony)
						{
							alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_NEIGHBORHOOD'] ?>");
							return false
						}
						if (Shopping.Cart.buyer.cardsavecardno == "" || !Shopping.Cart.buyer.cardsavecardno)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.cardsaveexpmm == "" || !Shopping.Cart.buyer.cardsaveexpmm)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.cardsaveexpyy == "" || !Shopping.Cart.buyer.cardsaveexpyy)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.cardsavecvv == "" || !Shopping.Cart.buyer.cardsavecvv)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.cityname == "" || !Shopping.Cart.buyer.cityname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CITY_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.zip == "" || !Shopping.Cart.buyer.zip)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_ZIP_ALERT']?>");
							return false;
						}
					}
				}
				
				if (document.getElementById('paymethod-mercury-check')){
					var mercurypayment = document.getElementById('paymethod-mercury-check');
					if (document.getElementById('paymethod-mercury-check') && mercurypayment.checked){
						if (Shopping.Cart.buyer.mercury_acno == "" || !Shopping.Cart.buyer.mercury_acno){
							alert("<?=$lang_resource['CONTROL_PANEL_MERCURY_ACNO_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.mercury_exmm == "" || !Shopping.Cart.buyer.mercury_exmm){
							alert("<?=$lang_resource['CONTROL_PANEL_MERCURY_EXMM_ALERT']?>");
							return false;
						}
						if (Shopping.Cart.buyer.mercury_exyy == "" || !Shopping.Cart.buyer.mercury_exyy){
							alert("<?=$lang_resource['CONTROL_PANEL_MERCURY_EXYY_ALERT']?>");
							return false;
						}
					}
				}
				
				
				
		
				return true;
			}
		
      },
    FormatPriceNotFree: function (b)
    {
        if (b == "0.00")
        {
        }
        return parseFloat(b).toFixed(Main.IS_DECIMAL_POINT);
    },

    FormatPrice: function (b,currency)
    {
		if(typeof currency=='undefined'){
			currency='';
		}
        if (b == "0.00")
        {
            return "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>"
        }
      //return "<?= $lang_resource['SITE_CURRENCY'] ?>"+parseFloat(b).toFixed(Main.IS_DECIMAL_POINT);
	   return currency+parseFloat(b).toFixed(Main.IS_DECIMAL_POINT);
    },
	Preorder: function (d){
		Main.PreOrderMenuCatalogFetch();
		 },
	PlaceOrderMacro: function (paypalid,paymentgetway)
    {
		if(globalReserve.Free!="")
		Shopping.Cart.reserveQty.Free = globalReserve.Free;
		if(globalReserve.Table!="")
		Shopping.Cart.reserveQty.Table = globalReserve.Table;
		if(globalReserve.Room!="")
		Shopping.Cart.reserveQty.Room = globalReserve.Room;
		if(globalReserve.TotalPrice!="")
		Shopping.Cart.reserveFee = globalReserve.TotalPrice;
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
		Shopping.Cart.reservestatus = true;
		}
		Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		Shopping.Cart.customslug = Shopping.Business[0].customslug;
		
		var I = new Object();
				var K = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				I.id = Shopping.ActiveBusiness;
				I.name = Shopping.Business[K].name;
				I.tel = Shopping.Business[K].tel;
				I.email = Shopping.Business[K].email;
				if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1)
					I.paypal = Shopping.Business[K].paypal;
				I.paymethod = new Object();
				I.paymethod.cash = false;
			
				if (Shopping.Business[K].acceptcard == "t")
				{
					I.paymethod.card = false
				}
				if(paymentgetway=="transactium"){
				I.paymethod.transactium = true;
				}
				
				if(paymentgetway=="mercury"){
				I.paymethod.mercury = true;
				}
				
				if(paymentgetway=="paypaladaptive"){
				I.paymethod.paypaladaptive = true;
				}
				if(paymentgetway=="pexpress"){
				I.paymethod.pexpress = true;
				}
				
				if(paymentgetway=="maksekeskus"){
				I.paymethod.maksekeskus = true;
				}
				
				if(paymentgetway=="voguepay"){
				I.paymethod.voguepay = true;
				}
				
				if(paymentgetway=="skrill"){
				I.paymethod.skrill = true;
				}
				if(paymentgetway=="payeezy"){
				I.paymethod.payeezy = true;
				}
				if(paymentgetway=="payu"){ 
				I.paymethod.payu = true;
				
				}
				if(paymentgetway=="stripe"){
				I.paymethod.stripe = true;
				
				}
				if(paymentgetway=="paypalpro"){
				I.paymethod.paypalpro = true;
				
				}
				if(paymentgetway=="paygistix"){
				I.paymethod.paygistix = true;
				
				}
				if(paymentgetway == "mercadopago"){
					I.paymethod.mercadopago = true;
				}
				
				
				I.shipping = Shopping.Business[K].shipping;
				I.minimum = Main.NullToEmpty(Shopping.Business[K].minimum);
				I.dishes = new Array();
				I.twiliophone = Shopping.Business[K].twiliophone;	
				I.twilioenabled = Shopping.Business[K].twilioenabled;
				I.acceptsms = Shopping.Business[K].acceptsms;
				Shopping.Cart.business.push(I);
		
		
        var paypalInfo = '';
		
		
			if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }
		
     	/*for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
		}*/
	 	for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(unescape(encodeURIComponent(Shopping.Cart.buyer[n])))
		}
	 if(Shopping.Cart.buyer.city == "" || Main.NullToEmpty(Shopping.Cart.buyer.city) == "" ) {
	   Shopping.Cart.buyer.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "city");
	   }
        var b = new Date().getTime();
        Main.Aid = b;
        $("#checkoutloading").show();
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {	
		
		
            
            if (b != Main.Aid)
            {
                return false;
            }
            $("#checkoutloading").hide();
			
			
			if(paymentgetway=="maksekeskus"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/maksekeskus/index.php?id="+f;
			}
			
			if(paymentgetway=="skrill"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/skrill/index.php?id="+f;
			}
			
			
			if(paymentgetway=="voguepay"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/voguepay/voguepay.php?id="+f;
			}
			
			if(paymentgetway=="pexpress"){
				
				
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/pxpay/pxpay.php?id="+f;
			}
			
			
			if(paymentgetway=="transactium"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/transactium/ShowHPS.php?id="+f;
			}
		
			
			if(paymentgetway=="mercury"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/mercury/ProcessTransaction.php?id="+f;
			}
			
		
			if(paymentgetway=="paypaladaptive"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypaladaptive/samples/SimpleSamples/ParallelPay.php?id="+f;
			}
			if(paymentgetway == "mercadopago"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/mercadopago/mercadopago_ipncustom.php?id="+f;
			}

			if(paymentgetway=="payeezy"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/payeezy/index.php?id="+f;
			}
          if(paymentgetway=="payu"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/payu/index.php?id="+f;
			}
			if(paymentgetway=="stripe"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/stripe/index.php?id="+f;
			}

			if(paymentgetway=="paypalpro"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypalpro/index.php?id="+f;
			}
			if(paymentgetway=="paygistix"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paygistix/index.php?id="+f;
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
		
	 	for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
		}
if(Shopping.Cart.buyer.city == "" || Main.NullToEmpty(Shopping.Cart.buyer.city) == "" ) {
	   Shopping.Cart.buyer.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "city");
	   }
        var b = new Date().getTime();
        Main.Aid = b;
        $("#checkoutloading").show();
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
			
			
           
            if (b != Main.Aid)
            {
                return false;
            }
            $("#checkoutloading").hide();
			
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
		
     	for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
		}
	 
	 if(Shopping.Cart.buyer.city == "" || Main.NullToEmpty(Shopping.Cart.buyer.city) == "" ) {
	   Shopping.Cart.buyer.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "city");
	   }
        var b = new Date().getTime();
        Main.Aid = b;
        $("#checkoutloading").show();
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
		
            
            if (b != Main.Aid)
            {
                return false;
            }
            $("#checkoutloading").hide();
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
		
     
	 	for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
		}
if(Shopping.Cart.buyer.city == "" || Main.NullToEmpty(Shopping.Cart.buyer.city) == "" ) {
	   Shopping.Cart.buyer.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "city");
	   }
	 
        var b = new Date().getTime();
        Main.Aid = b;
       $("#checkoutloading").show();
        
        $.post("panel/lib/front-main.php", "f=PlaceOrderbrainTree&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f)
        {
		
           
            if (b != Main.Aid)
            {
                return false;
            }
            $("#checkoutloading").hide();
			
			window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/braintreepayments/braintree_ipncustom.php?iid="+f;
			
			Shopping.EmptyCart();
             
			 
            
         
        });
        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/placeorder");
    },

    PlaceOrderpaypal: function (paypalid){

    	var paypalInfo = '';
    	if (paypalid){
    		paypalInfo = '&paypalid='+paypalid;
        }

        for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
		}
if(Shopping.Cart.buyer.city == "" || Main.NullToEmpty(Shopping.Cart.buyer.city) == "" ) {
	   Shopping.Cart.buyer.city = Main.GetPropertyValueOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness, "city");
	   }
        var b = new Date().getTime();
        Main.Aid = b;
        $("#checkoutloading").show();

        for (var idx in Shopping.Cart.business){

			Shopping.Cart.business[idx].name = Shopping.Cart.business[idx].name.split("&").join("@@@");
			for (var es in Shopping.Cart.business[idx].dishes){
				Shopping.Cart.business[idx].dishes[es].name = Shopping.Cart.business[idx].dishes[es].name.split("&").join("@@@");
			}
		}

		$.post("panel/lib/front-main.php", "f=PlaceOrderbefore&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f){

			
            
            if (b != Main.Aid){
                return false;
            }
            $("#checkoutloading").hide();
			
			window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypal/paypal_custom.php?id="+f;
			
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
			
		RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true)
			
	 
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
	  
	 RestMenuList.PopulateDishesList(Shopping.Business[0].currency,Shopping.Config.Dishes.List.SortBy, true)
	}
	
    },
	CloseBusinessText: function ()
    {
		alert("<?=$lang_resource['SHOPPING_CLOSE_ORDER_ALERTTEXT']?>");
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
			document.getElementById("discounttext").innerHTML ='<?= $lang_resource['CHECKOUT_COUPON_APPLIED'] ?>';
			Shopping.UpdateTotals();
			 }
			 else
			 {
				document.getElementById("discountimg").innerHTML ='<img src="images/dis_pics/cross.png" >'
				document.getElementById("discounttext").innerHTML ='<?= $lang_resource['CHECKOUT_COUPON_NOT_APPLIED'] ?>';
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
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
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
		
		if(parseFloat(room_price)==0){
			document.getElementById("roomtd").style.display = "none";
			document.getElementById("roomtd1").style.display = "none";		
		}else{
			document.getElementById("roomtd").style.display = "block";	
			document.getElementById("roomtd1").style.display = "none";		
		}
		
		document.getElementById("room_price").innerHTML = parseFloat(room_price).toFixed(Main.IS_DECIMAL_POINT);
		
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
		
		document.getElementById("total_price").innerHTML = parseFloat(globalReserveTotalPrice).toFixed(Main.IS_DECIMAL_POINT);
		if(parseFloat(globalReserveTotalPrice)==0){
			document.getElementById("totaltd").style.display = "none";	
		}else{
			document.getElementById("totaltd").style.display = "block";	
		}
		
		Shopping.Cart.reserveQty.Room = globalReserve.Room;
		Shopping.Cart.reservePrice.Room = parseFloat(room_price).toFixed(Main.IS_DECIMAL_POINT);
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		
		Shopping.Cart.total = grand_total;
		
		
		
		
		
				 var d = 0;
	
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(Main.IS_DECIMAL_POINT);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
            }
        }
		
		var grand_total = parseFloat(parseFloat(d)+parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT)
		
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
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
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
		if(parseFloat(table_price)==0){
			document.getElementById("tabletd").style.display = "none";	
			document.getElementById("tabletd1").style.display = "none";	
		}else{
			document.getElementById("tabletd").style.display = "block";	
			document.getElementById("tabletd1").style.display = "none";	
		}
		document.getElementById("table_price").innerHTML = parseFloat(table_price).toFixed(Main.IS_DECIMAL_POINT);
		
		globalReserveTotalPrice = parseFloat(room_price +table_price + free_price).toFixed(Main.IS_DECIMAL_POINT);
		
		
		
		
		
		Shopping.Cart.reserveQty.Table = globalReserve.Table;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		Shopping.Cart.reservePrice.Table = parseFloat(table_price).toFixed(Main.IS_DECIMAL_POINT);
		
		document.getElementById("total_price").innerHTML = globalReserveTotalPrice;
		
		
		if(parseFloat(globalReserveTotalPrice)==0){
			document.getElementById("totaltd").style.display = "none";	
		}else{
			document.getElementById("totaltd").style.display = "block";	
		}
		
		
				 var d = 0;
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(Main.IS_DECIMAL_POINT);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
            }
        }
		var grand_total = parseFloat(parseFloat(d)+parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT)
		
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
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
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
		document.getElementById("free_price").innerHTML = parseFloat(free_price).toFixed(Main.IS_DECIMAL_POINT);
		if(parseFloat(free_price)==0){
			document.getElementById("freetd").style.display = "none";	
			document.getElementById("freetd1").style.display = "none";	
		}else{
			document.getElementById("freetd").style.display = "block";	
			document.getElementById("freetd1").style.display = "none";	
		}
		globalReserveTotalPrice = parseFloat(room_price +table_price + free_price).toFixed(Main.IS_DECIMAL_POINT);
		
		document.getElementById("total_price").innerHTML = globalReserveTotalPrice;
		if(parseFloat(globalReserveTotalPrice)==0){
			document.getElementById("totaltd").style.display = "none";	
		}else{
			document.getElementById("totaltd").style.display = "block";	
		}
		
		
				 var d = 0;
				 
        for (var f in Shopping.Cart.business)
        {
            d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].shipping)).toFixed(Main.IS_DECIMAL_POINT);
            for (var e in Shopping.Cart.business[f].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[f].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
            }
        }
		var grand_total = parseFloat(parseFloat(d)+parseFloat(globalReserveTotalPrice)).toFixed(Main.IS_DECIMAL_POINT)
		
		Shopping.Cart.reserveQty.Free = globalReserve.Free;
		Shopping.Cart.reserveFee = globalReserveTotalPrice;
		Shopping.Cart.grandtotal = grand_total;
		Shopping.Cart.reservePrice.Free = parseFloat(free_price).toFixed(Main.IS_DECIMAL_POINT);
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
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
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
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
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
		var M = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		Shopping.Cart.reservepaymethod = new Object();
		Shopping.Cart.reservepaymethoddetails = new Object();
		
				var repaymentdetails = JSON.parse(Shopping.Business[M].paymentdetails);
				
				
				
	
				for(var reservpay in repaymentdetails){
					if(repaymentdetails[reservpay] == 't'){
						Shopping.Cart.reservepaymethoddetails[reservpay] = true
					}else{
						Shopping.Cart.reservepaymethoddetails[reservpay] = false
					}
				}
			
				for(var reservpay in repaymentdetails){					
						Shopping.Cart.reservepaymethod[reservpay] = false					
				}
		Payment.ReservatioPayment();
				}
			else {
			alert("<?=$lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'];?> ");	
				
				}	
		
		},
	ReserveNowMob: function (paypalid){

		var checkoutfields = Array();
		var c = 0;
		for(var b in Main.checkoutinfo){
			
			if(Main.checkoutinfo[b].status=='t'){
				
				checkoutfields[c]= Main.checkoutinfo[b].field_name;	
				c++;				
			}
			
		}

		Shopping.Cart.buyer.checkoutfields = checkoutfields;
		
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
				I.acceptsms = Shopping.Business[K].acceptsms;
				Shopping.Cart.business.push(I);
				
				Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		
		var paypalInfo = "";
		
		if (paypalid)
            {
            paypalInfo = '&paypalid='+paypalid;
            }

            for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
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
	
	
				if(Shopping.Cart.business!=''){
				
		if((Shopping.Cart.business[0].dishes) !=null){
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_ORDER_ALERT'];?>")
			return	
		}
				}
	
	
	var x = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		if(!Shopping.Cart.buyer.cityname){
		
			Shopping.Cart.buyer.cityname = 	Shopping.Business[x].cityname;
			}  

		var checkoutfields = Array();
		var c = 0;
		for(var b in Main.checkoutinfo){
			
			if(Main.checkoutinfo[b].status=='t'){
				
				checkoutfields[c]= Main.checkoutinfo[b].field_name;	
				c++;				
			}
			
		}

		Shopping.Cart.buyer.checkoutfields = checkoutfields;
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			
			
		
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
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
				I.acceptsms = Shopping.Business[K].acceptsms;
				Shopping.Cart.business.push(I);
				
		Shopping.Cart.buyer.deliveryType = Main.deliveryType;
		Shopping.Cart.total = globalReserveTotalPrice;	

		for(var n in Shopping.Cart.buyer){
			if(n !="checkoutfields" && n!="deliverydate" && n!="city")
			Shopping.Cart.buyer[n] = window.btoa(escape(Shopping.Cart.buyer[n]))
		}
		
			

		$("#checkoutloading").show();	
        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
        this.SavingOrder = true;
        $.post("panel/lib/front-main.php", "f=PlaceOrder&data=" + JSON.stringify(Shopping.Cart)+paypalInfo, function (f) {
			
			
		    var custom_link =  "<?=$lang_resource['BACK_BUTTON_CONFIRMATION']?>_"+Shopping.ActiveBusinessName.split(" ").join("");
			    window.history.pushState( {"id":105} , "Confirmation", custom_link );
				Main.stepBack  = 5;
				
				Main.confirmOrder  = true;
			
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
              
               
               	lastid = "";
				
				$(".main li").removeClass("active-step");
				$(".main #get_dlvrd").addClass("active-step");	

                Shopping.EmptyCart();
				
                this.SavingOrder = false;
				
			
				 $.post("panel/lib/front-main.php", "f=FetchOrder&id=" + id, function (c) {	
				 	$("#checkoutloading").hide();	
				  if(viewDevice != "Mobile") {
				 	Checkout.ShowConfirm(id,c,chk)
				  }else{
					  RestMenuList.ShowConfirmMob(id,c,chk)
				  }
					
					 });
				
						
                
            }
        });
			
		}
		else	{
						alert("<?=$lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'];?>");
				return
		}

	},
	ReserveNowBefore: function (paypalid,val){
		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			
			
		
		if(Forms.Form.reserveform.fields.guest.value == "" && Forms.Form.reserveform.fields.rdate.value == "" && Forms.Form.reserveform.fields.rhour.value == "-1" && Forms.Form.reserveform.fields.rmin.value == "-1"){
			alert("<?=$lang_resource['SHOPPING_SELECT_RESERVE_DATE_TIME'];?>")	
			return
		}
		
       	Shopping.Cart.reserve.guest = Main.WhereAmIData.guest;
        Shopping.Cart.reserve.rdate = Main.WhereAmIData.rdate;
        Shopping.Cart.reserve.rhour = Main.WhereAmIData.rhour;
        Shopping.Cart.reserve.rmin = Main.WhereAmIData.rmin;
		if (Shopping.Cart.buyer.name == ""){
				alert("<?= $lang_resource['type_name_V2'] ?>");
				$("#reservename").focus();
				return
		}
		if (Shopping.Cart.buyer.email == "" || !Main.IsEmail(Shopping.Cart.buyer.email)){
				alert("<?= $lang_resource['valid_email_V2'] ?>");
				$("#reserveemail").focus();
				return
		}
		if (Shopping.Cart.buyer.tel == "" || Shopping.Cart.buyer.tel == null){
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
				I.acceptsms = Shopping.Business[K].acceptsms;
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
	  alert("<?=$lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'];?>");
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
				alert("<?=$lang_resource['SHOPPING_SELECT_GUEST'];?>")
				return	
			}
			if(document.getElementById("rdate1").value == ""){
				alert("<?=$lang_resource['SHOPPING_SELECT_DATE'];?>")
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
				var cname =  Shopping.MenuCategories[x].name.toLowerCase();;
					dishasc[cname] = new Array();
			
				 }
             
				for (var v in Shopping.Menu.dishes) {
						//var ctname = Shopping.Menu.dishes[v].catname;
					var ctname = Shopping.Menu.dishes[v].catname.toLowerCase();
					
				
					/*if(dishasc[ctname])
					dishasc[ctname].push(Shopping.Menu.dishes[v]);*/
					if(ctname) {
							if(dishasc[ctname])
							dishasc[ctname].push(Shopping.Menu.dishes[v]);
							}
							if(ctname) {
					//alert(JSON.stringify(dishasc[ctname]))
					}
					
					
					}
					
				for (var xx in Shopping.MenuCategories) {
					var cnames =  Shopping.MenuCategories[xx].name.toLowerCase();
					//var cnames =  Shopping.MenuCategories[xx].name;
					
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
			
			if(viewDevice == "Mobile")
			{
			$("#menu_chkout").show();	
			}
				
			
			$("#tabMenu1").addClass("active-tab");
			$("#tabInfo2").removeClass("active-tab");
			$("#reviewCountText").removeClass("active-tab");
			$("#offerCountText").removeClass("active-tab");
			$("#ReserveidText").removeClass("active-tab");
			
			$('[data-simplebar-direction]').each(function () {
			
		 var totalheight = $("#plc_rgt_in").height()  +  $("#chk_reserve").height() ;
			
			
		if(totalheight >180) {
			
			//$(".dishDvScroll_in").css("height","300px");
			$(".simplebar-scrollbar").addClass('visible');
			
           $(this).simplebar();
		}
			
			
        });
		
		$(document.body).trigger("sticky_kit:recalc")
		}
		else if(val == 2)
		{
			$("#plce_div_review").hide();
			$("#plce_div_info").show();
			$("#plce_div_menu").hide();
			$("#plce_div_offer").hide();
			$("#plce_div_reserve").hide();
			
			if(viewDevice == "Mobile")
			{
			$("#menu_chkout").show();	
			}
			
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
			
			if(viewDevice == "Mobile")
			{
			$("#menu_chkout").show();	
			}
			
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
			
			if(viewDevice == "Mobile")
			{
			$("#menu_chkout").show();	
			}
			
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
			
			if(viewDevice == "Mobile")
			{
			$("#menu_chkout").hide();	
			}
			
			
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
                for (var z in Shopping.CategoriesCustom)
                {
                    if (t[y] == Shopping.CategoriesCustom[z].id)
                    {
					
							if (Shopping.CategoriesCustom[z].enabled )
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
										if (Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", B[y], "name").toLowerCase().indexOf(v) >= 0)
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
                        if (Main.GetPropertyValueOnPropertyValueFound(Shopping.CategoriesCustom, "id", B[y], "name").toLowerCase().indexOf(v) >= 0)
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
			
		}
		
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
