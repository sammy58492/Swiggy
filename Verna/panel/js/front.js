var IS_SCRIPTID = <?=isset($_SESSION['scriptid'])?$_SESSION['scriptid']:0?>;
var IS_PAYPAL_ENABLED = 1;
var CHECK = <?=isset($_SESSION['scriptid'])?$_SESSION['scriptid']:0?>;
var ipaddr = "";
var ordpopdt = "";
var viewDevice = "Desktop";
var passingBy = "Home";
var backurlpassBy = 1;
var ISIFRAME = <?=isset($widgetResid)?$widgetResid:0?>;
var isResponsive = <?=isset($_SESSION['is_device'])?$_SESSION['is_device']:1?>;

var d=0;
var c=0;

function getCookie(name){
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}
function unsetCookie(cname,exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=; " + expires;
}
function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

if(isMobile.any() && ISIFRAME == 0){	
	
	viewDevice = 1;
	$(document).ready(function (){
		Main.Loading();
		if (Link.indexOf("oos_desktop_mobile") >= 0){
			passingBy = "mobile-link";
			Main.InitInterface()
			return false;
		}
		if (Link.indexOf("oos_re_direct_to_cms_") >= 0){
			a = new Object();
            a.latitud = 30.977609;
            a.longitud = -43.080139;
            a.zoom = 1
		 	GoogleMap.Init("mapbox",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated)
		 	Main.RedirectToCMS = parseInt(Link.replace("oos_re_direct_to_cms_", ""));
			var blname = document.getElementById("blistName").value;
			Main.Ready();
			top.location = "mobile.php?alias="+blname;
			return false;
        }
		if (Link.indexOf("oos_re_direct_to_business_") >= 0){
			$(".maincontainer").hide();
			Main.RedirectToBusiness = parseInt(Link.replace("oos_re_direct_to_business_", ""));
			var blname = document.getElementById("blistName").value;
			var reviewOrderID = document.getElementById("reviewOrderID").value;
		    if(reviewOrderID != "" ){		
				top.location = "mobile.php?alias="+blname+"&order="+reviewOrderID;
			    return false;
			}else{
				top.location = "mobile.php?alias="+blname;
                return false;
			}		
		}
		if (Link.indexOf("oos_re_direct_to_category_") >= 0){
			$(".maincontainer").hide();
            Main.RedirectToCategory = parseInt(Link.replace("oos_re_direct_to_category_", ""));
			Main.searchType ="Ordinary";
			var blname = document.getElementById("blistName").value;
			Shopping.ActiveCategory = Main.RedirectToCategory
			Main.deliveryType ="categorysearch";
			top.location = "mobile.php?alias="+blname;
			Main.Ready();
			return false;
        }else if (Link.indexOf("oos_re_direct_to_city_") >= 0){
			$(".maincontainer").hide();
			Main.RedirectToCity = parseInt(Link.replace("oos_re_direct_to_city_", ""));
			var blname = document.getElementById("blistName").value;
			Main.Ready();
			top.location = "mobile.php?alias="+blname;
			return false;
		}else if (Link.indexOf("oos_re_direct_to_custompage_") >= 0){
			var blname = document.getElementById("blistName").value;
			top.location = "mobile.php?alias="+blname;
			return false;
		}else if (Link.indexOf("oos_re_direct_to_widget") >= 0){
			viewDevice = "Desktop";
			Main.InitInterface()
        }else{
			$(".maincontainer").hide();
			top.location = "mobile.php"
			return false;
		}
	}) 
}else{
	
    $(document).ready(function (){

		document.onkeydown = document.onkeypress = function (a){
			if ((a || event).keyCode == 27){
				Main.Ready(true);
				Main.Ready();
				Main.Aid = 0
			}
		};
		if (Link.indexOf("oos_re_direct_to_cms_") >= 0){
			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1

			GoogleMap.Init("mapbox",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated)

			Main.RedirectToCMS = parseInt(Link.replace("oos_re_direct_to_cms_", ""));
			Main.searchType ="Ordinary";
			Shopping.ActiveCMS = Main.RedirectToCMS
			var custom_link =window.location.pathname.replace('/','');			
			window.history.pushState( {"id":100} , "Business list", custom_link  );
			passingBy = "direct-link";
		}
		if (Link.indexOf("oos_re_direct_to_searchBy_") >= 0){
			
			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1
			GoogleMap.Init("mapbox",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated);
			var resq = Link.split("_");
			Main.userlocation = new Object();
			Main.searchBy = new Object();
			Main.searchBy.address = resq[5];
			Main.searchBy.city = resq[6];
			Main.searchBy.country = resq[7];
			Main.searchBy.cityname = resq[8];
			Main.searchBy.deliveryType = resq[9];
			Main.searchBy.latitud = resq[10];
			Main.searchBy.longitud = resq[11];
			Main.searchBy.zipcode = resq[12];
			Main.searchBy.zoom = resq[13];
			Main.userlocation.latitud = resq[10];
			Main.userlocation.longitud = resq[11];
			Main.searchBy.neighbourid = resq[14];
			Main.searchBy.resturantsid = resq[15];
			Main.searchBy.cuisinesid = resq[16];
			Main.searchBy.reservation = resq[17];
			Main.searchBy.guest = resq[18];
			Main.searchBy.rdate = resq[19];
			Main.searchBy.rhour = resq[20];
			Main.searchBy.rmint = resq[21];

			if(resq[17] == 'b1' || resq[17] == 'b2' || resq[17] == 'b3' || resq[17] == 'b4'){
				Main.searchBy.businesstype = resq[17];
			}
			
			if(viewDevice == "Desktop"){
				var custom_link =window.location.pathname.replace('/','');
			}
			
			if(viewDevice == "Mobile"){
				var mob_link =location.search.split('alias=')
				var custom_link =mob_link[1];
			}
			
			Main.directsearchlink = true;
			window.history.pushState( {"id":100} , "Business list", custom_link  );
			passingBy = "direct-link";
		}else{
			Main.userlocation = new Object();
			Main.userlocation.latitud = '';
			Main.userlocation.longitud = '';	
		}

		if (Link.indexOf("oos_re_direct_to_category_") >= 0){
			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1
			GoogleMap.Init("mapbox",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated)
			Main.RedirectToCategory = Link.replace("oos_re_direct_to_category_", "");
			Main.searchType ="Ordinary";
			Shopping.ActiveCategory = Main.RedirectToCategory
			Main.deliveryType ="categorysearch"
			var custom_link =window.location.pathname.replace('/','');
			Main.searchlink = custom_link;
			window.history.pushState( {"id":100} , "Business list", custom_link  );
			passingBy = "direct-link";
		}
		if (Link.indexOf("oos_re_direct_to_business_") >= 0){
			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1
			GoogleMap.Init("mapbox1",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated)
			Main.RedirectToBusiness = parseInt(Link.replace("oos_re_direct_to_business_", ""));
			Main.searchType ="Ordinary";
			Shopping.ActiveBusiness = Main.RedirectToBusiness
			var custom_link =window.location.pathname.replace('/','');
			Shopping.ActiveBusinessSlugName = custom_link;
			//window.history.pushState( {"id":100} , "Business list", custom_link  );
			passingBy = "direct-link";
			Main.WhereAmIData = new Object();
			Main.WhereAmIData.business = Main.RedirectToBusiness;
			Main.WhereAmIData.businessname = custom_link;
			$.post("panel/lib/front-main.php", "f=SaveWhereAmIResturant&data=" + JSON.stringify(Main.WhereAmIData), function (b){
				//Main.InitInterface()
			});
		}
		if (Link.indexOf("oos_re_direct_to_city_") >= 0){
			Main.RedirectToCity = parseInt(Link.replace("oos_re_direct_to_city_", ""));
			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1
			GoogleMap.Init("mapbox1",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated)
			Main.deliveryType ="citysearch"
			Main.searchType ="Ordinary";
			Shopping.ActiveBusiness = '';
			Shopping.RedirectToCity = Main.RedirectToCity
			var custom_link =window.location.pathname.replace('/','');			
			window.history.pushState( {"id":100} , "Business list", custom_link  );			
			passingBy = "direct-link";
			Main.WhereAmIData = new Object();
			Main.WhereAmIData.city = Main.RedirectToCity;
			Main.WhereAmIData.cityname = custom_link;
			$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){
				Main.InitInterface()
			});
		}
		if (Link.indexOf("oos_re_direct_to_custompage_") >= 0){
			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1
			GoogleMap.Init("mapbox",  a.latitud,  a.longitud, a.zoom, Main.WhereAmILocationUpdated)
			Main.RedirectToCustomPage = parseInt(Link.replace("oos_re_direct_to_custompage_", ""));
			Main.searchType ="Ordinary";
			Shopping.ActiveCMS = Main.RedirectToCustomPage
			var custom_link =window.location.pathname.replace('/','');
			//alert(Main.RedirectToCustomPage)
			window.history.pushState( {"id":100} , "Business list", custom_link  );
			passingBy = "direct-link";
		}
		if (Link.indexOf("oos_re_direct_to_widget") >= 0){
			Main.InitInterface()
		}
		if (Link.indexOf("oos_desktop_mobile") >= 0){
			Main.InitInterface()
		}
		//request collection end 
		if (Link == "" || Main.RedirectToBusiness || Main.RedirectToCity ||  Main.RedirectToCategory ||  Main.RedirectToCMS || Main.searchBy ||(Main.RedirectToCustomPage==1) ){
			Main.InitInterface()
		}else{
			Main.Loading();
			$.get("pages/" + Link + ".htm", "", function (b){
				Main.Ready();
				if (b == "" || b.indexOf('<meta name="<?=$lang_resource['FRONT_METAKEY'];?>" content="<?=$lang_resource['FRONT_META_CONTENT'];?>"/>') >= 0){
					Main.InitInterface()
				}else{
					if(document.getElementById("main")) {
						var a = document.getElementById("main");
						a.innerHTML = '<div class="pagecontainer"><div class="innerbox">' + b + "</div></div>";
						a.style.height = "645px"
					}
				}
			})
		}
    })
}
$(document).ready(function(){
	$('#back-to-top').hide();
	$('#back-to-down').show();
	$('#back-to-middle-top').hide();
	$('#back-to-middle-down').hide();

	$(window).scroll(function () {
		if($(window).scrollTop() > 850 && $(this).scrollTop() < 1500 /*&& $("body").height() >1150*/ ) {

			$('#back-to-top').hide();
			$('#back-to-down').hide();
			$('#back-to-middle-top').show();
			$('#back-to-middle-down').show();
		}
				else if ($(window).scrollTop() < 1500) {


			$('#back-to-top').hide();
			$('#back-to-down').show();
			$('#back-to-middle-top').hide();
			$('#back-to-middle-down').hide();
		}
		else if($(window).scrollTop() > 900) {


			$('#back-to-top').show();
			$('#back-to-down').hide();
			$('#back-to-middle-top').hide();
			$('#back-to-middle-down').hide();
	   }
	});


	$('#back-to-top').click(function () {

		 $('body,html').animate({
			   scrollTop: 1450
		 }, 800);
		 $('#back-to-top').hide();
		 $('#back-to-down').hide();
		 $('#back-to-middle-top').show();
		 $('#back-to-middle-down').show();
		 return false;
	});

	$('#back-to-down').click(function () {
		$('body,html').animate({
			 scrollTop: 950
		}, 800);
		$('#back-to-top').hide();
		$('#back-to-down').hide();
		$('#back-to-middle-top').show();
		$('#back-to-middle-down').show();
		return false;
	});

	$('#back-to-middle-top').click(function () {
		$('body,html').animate({
			 scrollTop: 0
		}, 800);
		$('#back-to-top').hide();
		$('#back-to-down').show();
		$('#back-to-middle-top').hide();
		$('#back-to-middle-down').hide();
		return false;
	});

	$('#back-to-middle-down').click(function () {
		$('body,html').animate({
			scrollTop: 4000
		}, 800);

		$('#back-to-top').show();
		$('#back-to-down').hide();
		$('#back-to-middle-top').hide();
		$('#back-to-middle-down').hide();
		return false;
	});
});

var Main = {

    Random: new Date().getTime(),
    RedirectedMsg: '<?=$lang_resource['FRONT_TELL_US_WHERE_YOU'];?>"',
    InitInterface: function (){

		if(viewDevice == "Desktop"){
			Main.UpdateCustomSpace();
		}

        Shopping.ConfigObject();
		Main.requestCollction = new Object();
        tip.init();
        Popup.Init("popupcontainer");
        Popup.Inits("popupcontainerrs");
        BrowserDetect.init();
        this.ClientOs = BrowserDetect.OS;
        this.ClientBrowserVersion = BrowserDetect.version;
        this.ClientBrowserName = BrowserDetect.browser;
		if(viewDevice == "Mobile" && !Shopping.RedirectToCity) {
			delete Main.RedirectToCity;
		}
        if (Main.IsNavigator("Explorer", 7)){
            top.location = "mobile.php"
        }
		
		if(!Main.directsearchlink && !Main.RedirectToBusiness) {
			if(! Main.RedirectToCity){				
				if(backurlpassBy==1) {				
			 		window.history.pushState( {"id":99} , "Home", " " );
					backurlpassBy=2;
				}
			}
		}
		Main.chk = 0;
		var logbx = Visuals.CreateLoginBox();
		var rgths = '<div id="rbuttons"></div>'
		rgths += '<div id="adscontainer"></div>'
		rgths += '<div id="rgt_hm_div"></div>'
		document.getElementById("right").innerHTML = rgths;
		document.getElementById("hedlogbox").innerHTML = logbx;		
		
		Facebook.Load(Main.FacebookReady);
		Twitter.Load(Main.TwitterReady);
		
		if(Main.RedirectToCustomPage == 1){
			if(viewDevice != "Mobile") {
				var a = document.getElementById("main");
				a.innerHTML = Visuals.RequestCollectionHtml();
				$('#resturent_collection_time').datetimepicker({
					step:1,
					minDate:'-1970/01/01'
				});
			} 
		} 		
	    this.LoginBox();		
        Tags.Init()
    },
    UpdateCustomSpace: function (){
        if (document.getElementById("custominfo").innerHTML == ""){
            document.getElementById("custom").style.display = "none";           
        }else{
            document.getElementById("custom").style.display = "block";
        }
    },
    LoginPwdType: function (a){
        K = (document.all) ? a.keyCode : a.which;
        if (K == 13){
            this.Login()
        }
    },
    LoginPwdTypeEnter: function (a){
        K = (document.all) ? a.keyCode : a.which;
        if (K == 13){
            this.LoginSection()
        }
    },
    Login: function (d){ 
        if (d){ 
            Main.Loading();
            var a = new Date().getTime();
            Main.Aid = a;		
			
			$.post("panel/login/login.php", "type=social&data=" + JSON.stringify(d), function (e){
        
                if (a != Main.Aid){
                    return
                }
                Main.Ready();

                if (e != ""){
                    if (e == "suspended"){
                    	swal("Error","<?= $lang_resource['Account_suspended_V2'] ?>","error");
                        return
                    }
                    Main.User = JSON.parse(e);
                    document.getElementById("loginbottom").innerHTML = "";
					if(viewDevice == "Desktop") {
						Popup.Close();
					}
										
					$(".join_btn").hide();
					$(".popdiv_pop").addClass("popdiv_pop_right");
					$(".popdiv").addClass("popdiv_right");
					Main.facebookstatus = true;				
			
			    	$('.lognhead').html(Main.User.name);

					if (Main.User){
						if(Shopping.Cart) {
							Shopping.Cart.buyer.id = Main.User.id;
							Shopping.Cart.buyer.name = Main.User.name + " " + Main.NullToEmpty(Main.User.lastname);
							if (Shopping.Cart.buyer.name == " "){
								Shopping.Cart.buyer.name = ""
							}

							Shopping.Cart.buyer.lastname2 = Main.NullToEmpty(Main.User.lastname2);
							Shopping.Cart.buyer.api = Main.NullToEmpty(Main.User.api);
							Shopping.Cart.buyer.cp = Main.NullToEmpty(Main.User.cp);
							Shopping.Cart.buyer.email = Main.User.email;
							Shopping.Cart.buyer.tel = Main.User.tel;
							Shopping.Cart.buyer.colony = Main.User.colony;
							Shopping.Cart.buyer.reference = Main.NullToEmpty(Main.User.findfrom);
						}

					}

					if (Main.WhereAmIData){
						if(Shopping.Cart) {
							Shopping.Cart.buyer.address = Main.WhereAmIData.address;
							Shopping.Cart.buyer.city = Main.WhereAmIData.city;
							Shopping.Cart.buyer.cityname = Main.WhereAmIData.cityname
						}
					}
					if(Main.WhereAmIDataCus) {
						if(Shopping.Cart) {
							Shopping.Cart.buyer.address = Main.WhereAmIDataCus.address;
							Shopping.Cart.buyer.city = Main.WhereAmIDataCus.city;
							Shopping.Cart.buyer.cityname = Main.WhereAmIDataCus.cityname
						}
					}
					if(viewDevice == "Mobile" && !Shopping.Cart){
						Main.InitInterface();
					}else if(viewDevice != "Mobile" && !Shopping.Cart){
						Main.LoginBox()
					}else {
						Shopping.OpenCartCheck();
					}
                }else{
                	swal("Error","Unexpected error","error");
                }
            })
        }else{ 	

        	var c = "";
			var b = "";
			var cd = false;
			if(viewDevice == 'Mobile'){
				if(Main.positionregister){
					c = Main.loginid;
					b = Main.passid;
				}else if(Main.sms){
					c = Main.loginid;
					b = Main.passid;
				}else{
					c = document.getElementById("loginemailMob").value.toLowerCase();
					b = document.getElementById("loginpasswordMob").value;
				}
			}else{
				if(Main.sms){
					c = Main.loginid;
					b = Main.passid;
				}else if(Main.chk==2){ 				
					c = Main.switchemail;
					b = Main.switchpass;
				}else if(Main.chk==1){			
				 	c = document.getElementById("loginemail").value.toLowerCase();
					b = document.getElementById("loginpassword").value;
					//Main.LoginCheck(c,b)
				}else if(Main.locationhref){			
					c = document.getElementById("loginemail").value.toLowerCase();
					b = document.getElementById("loginpassword").value;				
				}else { 
					c = document.getElementById("loginemail").value.toLowerCase();
					b = document.getElementById("loginpassword").value;
					cd = document.getElementById("checkremember2").checked;				
				}
			}
		   	

     

			var logu = c;
			var logp = b;
			var logc = cd;
 
			if (c != "" && b != ""){
				
			

                Main.Loading();
                var a = new Date().getTime();
                Main.Aid = a;
                $.post("panel/login/challenge.php", "", function (e){  
                    if (a != Main.Aid){
                        return
                    }
                    a = new Date().getTime(); 
                    Main.Aid = a;
                    $.post("panel/login/login.php", "type=normal&username=" + c + "&response=" + hex_md5(e + b), function (f)
                    { 
						

                        if (a != Main.Aid)
                        {
                            return
                        }
                        Main.Ready();
            
			if (f.trim() == "LoggedIn" && Main.chk==2){ 
			
    
			if(viewDevice == "Desktop"){
				if(document.getElementById("checkremember")){
					if (document.getElementById("checkremember").checked == true){
						setCookie("emailID", c,365);
						setCookie("passVAL", b,365);
					}else
					{
							unsetCookie("emailID",365);
							unsetCookie("passVAL",365);
					}
				}
				if(document.getElementById("checkremember2")){
					if (document.getElementById("checkremember2").checked == true){
						setCookie("emailID", c,365);
						setCookie("passVAL", b,365);
					}else
					{
							unsetCookie("emailID",365);
							unsetCookie("passVAL",365);
					}
				}
				$(".join_btn").hide();
				$(".popdiv_pop").addClass("popdiv_pop_right");
				$(".popdiv").addClass("popdiv_right");			
			}




		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"}]', function (b)
        { 
        	if (b != ""){				
				document.getElementById("loginbottom").innerHTML = "";
				Popup.Close();
                Main.User = JSON.parse(b).user;
				document.getElementById("usermenu").innerHTML = Main.GetUserBoxHtml();
			    
			    $('.lognhead').html(Main.User.name);

			    if (Main.User){
					Shopping.Cart.buyer.id = Main.User.id;
					Shopping.Cart.buyer.name = Main.User.name + " " + Main.NullToEmpty(Main.User.lastname);
					if (Shopping.Cart.buyer.name == " "){
						Shopping.Cart.buyer.name = ""
					}
					Shopping.Cart.buyer.address = Main.User.address;
					Shopping.Cart.buyer.lastname2 = Main.NullToEmpty(Main.User.lastname2);
					Shopping.Cart.buyer.api = Main.NullToEmpty(Main.User.api);
					Shopping.Cart.buyer.cp = Main.NullToEmpty(Main.User.cp);
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


				  Shopping.OpenCartCheck();

			}

		});

		}else if(f.trim() == "LoggedIn" && Main.chk==1){ 

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"}]', function (b){
				if (b != ""){
					document.getElementById("loginbottom").innerHTML = "";
					Main.User = JSON.parse(b).user;
					document.getElementById("usermenu").innerHTML = Main.GetUserBoxHtml();
					$('.lognhead').html(Main.User.name);
					if (Main.User){
						Shopping.Cart.buyer.id = Main.User.id;
						Shopping.Cart.buyer.name = Main.User.name + " " + Main.NullToEmpty(Main.User.lastname);
						if (Shopping.Cart.buyer.name == " "){
							Shopping.Cart.buyer.name = ""
						}
						Shopping.Cart.buyer.address = Main.User.address;
						Shopping.Cart.buyer.lastname2 = Main.NullToEmpty(Main.User.lastname2);
						Shopping.Cart.buyer.api = Main.NullToEmpty(Main.User.api);
						Shopping.Cart.buyer.cp = Main.NullToEmpty(Main.User.cp);
						Shopping.Cart.buyer.email = Main.User.email;
						Shopping.Cart.buyer.tel = Main.User.tel;
						Shopping.Cart.buyer.colony = Main.User.colony;
						Shopping.Cart.buyer.reference = Main.NullToEmpty(Main.User.findfrom);
					}			
					$(".join_btn").hide();			
					$("#main").show();
					$("#frontvisual").empty();
					Shopping.OpenCartCheck();
				}
			});
			
		}
		else  if (f.trim() == "LoggedIn") { 
			if(viewDevice == "Mobile"){
				Main.InitInterface();
			}
			document.getElementById("usermenu").innerHTML = "";
			document.getElementById("loginbottom").innerHTML = "";

			if (logc){
				setCookie("emailID", logu,365);
				setCookie("passVAL", logp,365);
			}else{
				unsetCookie("emailID",365);
				unsetCookie("passVAL",365);
			}

			$('.elseclass').hide();
			$('.sprt_line').hide();
			$('.lognhead').html();	
			if(Main.userlevelk=='2' || Main.userlevelk==2){ 
				
				window.location.href = 'success-page';
			
			}
			if(Main.locationhref){	
				window.location.replace(Main.locationhref);
			}else{
				Main.LoginBox()
			}
		}
        else
        {
           alert(f.trim())
		  //window.location.href = '/';
        }
		
                    })
                })
            }
			else{ swal("Error","<?= $lang_resource['FRONT_ENTER_LOGIN_EMAIL'] ?>","error"); }
        }
    },
	
	autoLogout:function(){
		
		return;
		  /* var a = new Date().getTime();
        Main.Aid = a;
		       $.post("panel/lib/front-bulk.php", 'data=[{"operation":"autoLogout"}]', function (b)
        {




        })*/

	},
	//Reset counter start
	iscounterset:function (){

		   var a = new Date().getTime();
        Main.Aid = a;

       /* $.post("panel/lib/front-bulk.php", 'data=[{"operation":"iscounterset"},{"operation":"counterRange"},{"operation":"fetchcurrenttime"}]', function (b)
        {



            Main.Ready();
            if (a != Main.Aid)
            {
                return
            }
         counter= JSON.parse(b);
		if((typeof counter.counterRange !='undefined') && (counter.counterRange!='')){
			Main.counterUpdate(counter.counterRange,counter.fetchcurrenttime.mints,counter.fetchcurrenttime.sec);
		}
		if(counter.iscounterset=='1'){

			$("#live_counter").css("display", "block");

		}else{
			$("#live_counter").css("display", "none");
		}


        })*/
	},

counterUpdate : function  (counterRange,mints,secs){


//counter start
/*var nn=0;

var mint=0;
var sec=0;
var tot=0;
jQuery(function($){

	$('#retroclockbox1').flipcountdown({

		size:"xs",
tick:function(){



	if(nn==0){
		mint=mints;
		sec=secs;
		tot=parseInt(mint*60)+parseInt(sec);

	}else{
		tot=parseInt(tot)+1;

	}

timeset=parseInt(tot)%parseInt(counterRange);
tot1=parseInt(counterRange)-parseInt(timeset);


mint=parseInt(parseInt(tot1)/60);
sec=parseInt(tot1)%60;
  i=addZero(mint);

  j=addZero(sec);

if(parseInt(timeset)==0){

		Main.updatedataBase();

	}
	nn++;
	return [i,j];
		}
		});
})
*/

},
  //Time selection settings. 
convertTimeFormatHour:function(hour){
		
		str='PM';
		if(hour<12){
			str='AM';
		}else if((hour>23) && (hour<29)){
			str='AM';
		}
		hour=parseInt(hour)%12;
		if(hour==0){
			  return time=Main.zeroPad((12),2)+' '+str;
			}
			else
			{
		return time=Main.zeroPad((hour),2)+' '+str;
			}
				
		
		
		
	},
	  //Time selection settings. 
convertTo24Hour:function(time) { 

var hrs = Number(time.match(/^(\d+)/)[1]);
var mnts = Number(time.match(/:(\d+)/)[1]);
var format = time.match(/\s(.*)$/)[1];
if (format == "PM" && hrs < 12) hrs = hrs + 12;
if (format == "AM" && hrs == 12) hrs = hrs - 12;
var hours = hrs.toString();
var minutes = mnts.toString();
if (hrs < 10) hours = "0" + hours;
if (mnts < 10) minutes = "0" + minutes;


return hours + ":" + minutes

},
	  //Time selection settings. 
	/*convertTimeFormat:function(hour,mints){
		
		str='PM';
		if(hour<12){
			str='AM';
		}
		else if((hour>23) || (hour<29)){
			str='AM';
		}
		alert(hour);	alert(str);
		hour=parseInt(hour)%12;
		return time=Main.zeroPad((hour),2)+':'+Main.zeroPad((mints),2)+' '+str;
				
		
		
		
	},*/
	updatedataBase:function (){

		   var a = new Date().getTime();
        Main.Aid = a;
        Main.Loading();
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"updatedataBaseModify"}]', function (b)
        {
			Main.Ready();
            if (a != Main.Aid)
            {
                return
            }
			window.loaction='/';

        })
	},

//Reset counter End
	convertTimeFormat:function(hour,mints){
		
		str='PM';
		if(hour<12){
			str='AM';
		}else if((hour>23) ){
			str='AM';
		}
		hour=parseInt(hour)%12;
			mints=parseInt(mints);
		return time=Main.zeroPad((hour),2)+':'+Main.zeroPad((mints),2)+' '+str;
				
		
		
		
	},
	  weekendName :function(i) {
	 if(i==1) 
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
	

	},
	SiteScheduleOnOpen: function(stext,cat2){
		
		htms1='';
				htms1 += '  <tr>';
				htms1 += '   <th colspan="3" >'+stext["sitescheduletext3"]+'</th>';
				htms1 += '  </tr>';	
				//Time selection settings. 
                time_format="<?=$lang_resource['TIME_FORMAT']?>";
								
				for (x in cat2){				
					ns1='';
					if((parseInt(cat2[x]["closes"]["hour"])!=0) ||(parseInt(cat2[x]["closes"]["minute"])!=0)){
						htms1 += ' <tr>';
						if(time_format=="12"){
							ns1 +=''+Main.convertTimeFormat(cat2[x]["opens"]["hour"],cat2[x]["opens"]["minute"])
							ns1 +=' — '+Main.convertTimeFormat(cat2[x]["closes"]["hour"],cat2[x]["closes"]["minute"])+''
						}else{
							ns1 +=''+Main.zeroPad((cat2[x]["opens"]["hour"]),2)+':'+Main.zeroPad((cat2[x]["opens"]["minute"]),2)+'';
							if(parseInt(cat2[x]["closes"]["hour"])>=24){
								cat2[x]["closes"]["hour"]=parseInt(cat2[x]["closes"]["hour"])-24;
								ns1 +=' — '+Main.convertTimeFormat(cat2[x]["closes"]["hour"],cat2[x]["closes"]["minute"])+'';
							}else{
								ns1 +=' — '+Main.zeroPad((cat2[x]["closes"]["hour"]),2)+':'+Main.zeroPad((cat2[x]["closes"]["minute"]),2)+'';
							}
						}
						htms1 +='<td width="48%">'+Main.weekendName(x)+'</td>' ;
						htms1 += ' <td width="4%">:</td>';
						htms1 += '  <td width="48%">'+ns1+'</td>';
						htms1 += ' </tr>';
					}
				}      
               	document.getElementById("siteschedule").innerHTML=htms1;  
	},
	
	LoginBox: function (){
		Main.Loading();
		Main.MenulistEnter = false;
	    Main.MenuPreorder = true;		

		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchRequestCollectionSettings"},{"operation":"GetSiteScheduleSettingsForSchedule"},{"operation":"GetRequestCollectionSettingsForSchedule"},{"operation":"FetchCheckoutInfo"},{"operation":"FetchTimeByZoneForSchedule"},{"operation":"GetSiteScheduleTextSettingsForSchedule"},{"operation":"FetchAllbusinessSettingDataCommon"},{"operation":"FetchAllFranchisesData"},{"operation":"FetchAllCountriesData"},{"operation":"FetchNeighbourhoodSettings"},{"operation":"FetchDecimalPoint"},{"operation":"FetchItemPointPermission"},{"operation":"FetchGlobalPointSettings"},{"operation":"getAutocomplete"} ,{"operation":"getGibberish"} ,{"operation":"FetchMapLatlong"},{"operation":"getBusinesstemplate"} ,{"operation":"FetchSmsactivation"}]', function (bb1){
			
			if(bb1!=''){
				Main.LoginBoxStep2();
				bb4=JSON.parse(bb1);
				
				var catl = bb4.siteschedule;
				var time1 = bb4.timezone;
				var stext = bb4.sitescheduletext;
				Main.latt1 = bb4.MapLatlong.lat;			
				Main.long1 = bb4.MapLatlong.long;
				Main.smsactivation=bb4.smsactivation;			
				Main.Gibberish = bb4.gibberish;
				Main.businesstemplate = bb4.businesstemplate;
				Main.autocomplete = bb4.autocomplete;
				Main.timezone =time1;
				Main.neighsettings = bb4.neighsettings;
				Main.requestcollectionschedule = bb4.requestcollectionschedule;
				Main.checkoutinfo = bb4.checkoutinfo;			
				Main.FranchisesOnlyForZip=bb4.franchises;
				Main.Countries=bb4.countries;
				Main.businessSetting =bb4.businessSetting;
				Main.RequestCollectionSettings = bb4.RequestCollectionSettings;
				if(bb4.decimal_point){
					Main.IS_DECIMAL_POINT = bb4.decimal_point
				}
				if(bb4.itempointpermisson){
					Main.ItemPointPermission=bb4.itempointpermisson				
				}
				if(bb4.globalpointsetting){
					Main.GlobalPointSettings=bb4.globalpointsetting
				}



				var currenttime = "";
				var advbkk=false;
				var temp='';
				available=false;
				if(catl != null){
					var cat2 = catl["sdays"];
					var week1=parseInt(parseInt(time1.week)-1);

					if(week1==0){
						week1=7;
					}
			        currenttime=parseInt(time1.currenthour)*60+parseInt(time1.currentmin);
			        for (x in cat2){				
						if(x==time1.week){					
							opentime=parseInt(cat2[x]["opens"]["hour"])*60+parseInt(cat2[x]["opens"]["minute"]);					
							closetime=parseInt(cat2[x]["closes"]["hour"])*60+parseInt(cat2[x]["closes"]["minute"]);
							currenttime=parseInt(time1.currenthour)*60+parseInt(time1.currentmin);					
							if((parseInt(currenttime)< parseInt(opentime)) || (parseInt(currenttime)>parseInt(closetime))){
								available=true;
							}
						}				
						if(parseInt(cat2[x]["closes"]["hour"])>=24){					
							if(x==week1){
								temp=parseInt(cat2[x]["closes"]["hour"])-24;
								closetime1=parseInt(temp)*60+parseInt(cat2[x]["closes"]["minute"]);
								currenttime1=parseInt(time1.currenthour)*60+parseInt(time1.currentmin);
								
								if((parseInt(currenttime)>= 0) && (parseInt(currenttime)<= parseInt(closetime1))){
									available=false;
								}
							}					
						}		
					}
					if(available==true){
						Main.Ready();			
						var htms = '<div class="pop-dv we_are_sorry" id="pop-dv-one">';
						htms += '<div class="pop-wra">'; 
						htms += '<div class="pop-header siteschtxt">'+stext["sitescheduletext1"]+'</div>';
						htms += '<div class="pop-body">';
						htms += '<p class="hd">'+stext["sitescheduletext2"]+'</p>';
						htms += '<table width="100%" border="0" cellpadding="0" cellspacing="0" id="siteschedule">';
						htms += '</table>'; 
						htms += ' </div>';
						htms += '<div class="pop-footer"><button type="button" class="rakesh" onclick="Popup.Close()"><?= $lang_resource["SOUNDOK_V2"] ?></button>';
						htms += '</div>';       
						htms += '</div>';   
						htms += ' </div>';
						htms += '</div>';
						  
						Popup.Show(htms);
						Main.SiteScheduleOnOpen(stext,cat2)
					}
				}				
			}
		});    
	},
	LoginBoxStep2: function(){

		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchAllWidgetResturantSettingsData","rid" : "<?=$widgetResid?>"},{"operation":"FetchAllWidgetResturantButtonSettingsData","rid" : "<?=$widgetResBuid?>"},{"operation":"FetchAllWidgetResturantFloatingSettingsData","rid" : "<?=$widgetResBuid?>"},{"operation":"FetchAllWidgetSettingsData"},{"operation":"FetchAllCuisineDataFront"},{"operation":"FetchAllWidgetSettingsData","wid" : "<?=$widgetsid?>"},{"operation":"FetchAllReviews"},{"operation":"fetchenterprise"},{"operation":"FetchPanelInfo"},{"operation":"FetchSettingFront"},{"operation":"FetchZipMAxMin"},{"operation":"FetchSiteSetting"},{"operation":"FetchCountryCity"},{"operation":"FetchMostPopularsData"},{"operation":"FetchMostPopularsCategoryData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"},{"operation":"FetchAllpanelFooterCustom"},{"operation":"FetchAllsettingsCustomFacebookNew"},{"operation":"FetchDefaultLangName"},{"operation":"FetchPageSettings"},{"operation":"FetchAllCountriesData"},{"operation":"FetchUserPointsData"},{"operation":"FetchLandingPageSettings"},{"operation":"FetchMostPopularsResturantData"},{"operation":"FetchCreateAccount"}]', function (b){
			if(b != ""){
				b = JSON.parse(b);
				Main.CreateAccount = b.createaccounts;				
				Main.WidgetSettings = 	b.WidgetSettings;
				Main.settingfront = b.settingfront;
				Main.siteSettingUrl = b.siteSetting;
				Main.zipMAxMin = b.zipMAxMin;
				Main.facebooklike= b.facebooklike;
				Main.fetchenterprise= b.fetchenterprise;
				Main.dlang = b.defaultlang;
				Main.set_stat = b.settingstatus;
				Main.set_landing_set= b.landingpagesettings;
				Main.Countries_switch=b.countries;
				Main.reviewsfont =b.reviews;
				Main.cuisine = b.cuisine;
				Main.Countries_switch= b.countries;
				Main.reviewsfont = b.reviews;						
				Main.PopularShop=b.popularsresturant;
				//alert(JSON.stringify(b.ResturantWidgetSettings))
				if(b.ResturantWidgetSettings !=""){
					Main.ResturantWidgetSettings = 	JSON.parse(b.ResturantWidgetSettings[0].widget);
				}						
				if(b.ResturantButtonWidgetSettings !=""){
					Main.ButtonWidgetSettings = JSON.parse(b.ResturantButtonWidgetSettings[0].embeddedcode);
				}						
				if(b.ResturantFloatingWidgetSettings !=""){
					Main.FloatWidgetSettings = JSON.parse(b.ResturantFloatingWidgetSettings[0].embeddedcode);
				}
				if(b.countrycity){
					Main.countrycity = b.countrycity
				}
	            if (b.recent){
	                Main.recentactivity = b.recent
	            }
	            if (b.populars){
	                Main.populars = b.populars
	            }
				if (b.footerlink){
	                Main.footerlink = b.footerlink
	            }
				if (b.popularscategory){
	                Main.popularscategory = b.popularscategory
	            }
	            Main.panelsetting = b.panelinfo;

	            if(typeof $("#facebookfanpage") === "undefined" && viewDevice == "Desktop"){
					document.getElementById("facebookfanpage").innerHTML = '<iframe height="300px" frameborder="0" width="300px" scrolling="no" allowtransparency="true" style="border:none; visibility: visible; width:300px; height:240px;" src="'+Main.facebooklike.value+'"></iframe>';
				}

				if(b.user){					
					Main.User = b.user;
					if(Main.User){
						Main.settingfront.default_country = Main.User.country;
						Main.settingfront.default_city=Main.User.city;
						Main.settingfront.default_city_name=Main.User.cityname;
						Main.settingfront.city_name_default=Main.User.cityname;
						Main.settingfront.default_country_name=Main.User.countryname;
						if(Main.User.id != null){
							$.post("panel/lib/front-bulk.php",'data=[{"operation":"FetchUserPointsData","id":' + Main.User.id + '},{"operation":"FetchUsersOrderBusiness","id":'+Main.User.id+'},{"operation":"FetchBusinessPointsEnabled"}]',function (c){
								if(c != ""){
									c = JSON.parse(c);
									Main.availablepoint=c.fetchuserpointsdata											
									Main.fetchusersorderbusiness=JSON.parse(c.fetchusersorderbusiness)											
									Main.fetchbusinesspointsenabled=JSON.parse(c.fetchbusinesspointsenabled)
								}	
							})
						}
					}
					$(".join_btn").hide();
					$(".popdiv_pop").addClass("popdiv_pop_right");
					$(".popdiv").addClass("popdiv_right");
					
					document.getElementById("usermenu").innerHTML = Main.GetUserBoxHtml();

					$('.lognhead').html(Main.User.name);

					if (b.whereami != ""){							
						Main.WhereAmIData = JSON.parse(b.whereami);
					}else{
						if (!Main.WhereAmIData){
							Main.WhereAmIData = null;
						}
					}
					
					Shopping.UpdateCartUserInfo()
				}else{
					$(".join_btn").show();
	                $(".popdiv_pop").removeClass("popdiv_pop_right");
	                $(".popdiv").removeClass("popdiv_right");
	            	
			    	document.getElementById("usermenu").innerHTML = Visuals.UserMenuSection()
	                document.getElementById("loginbottom").innerHTML = Visuals.LoginBoottomSection()
			  	}

				if(Main.ResturantWidgetSettings || Main.ButtonWidgetSettings || Main.FloatWidgetSettings){
					if(Main.ResturantWidgetSettings){				
						document.getElementsByTagName("body")[0].style.backgroundColor = Main.ResturantWidgetSettings.bgcolor;				
						document.getElementsByTagName("body")[0].style.fontSize = "12px";
						document.getElementsByTagName("body")[0].style.color = "#000";
						Shopping.ActiveBusiness = Main.ResturantWidgetSettings.business_id;
					}
					if( Main.ButtonWidgetSettings){	
						document.getElementsByTagName("body")[0].style.backgroundColor = "";		
						document.getElementsByTagName("body")[0].style.fontSize = "12px";
						document.getElementsByTagName("body")[0].style.color = "#000";
						Shopping.ActiveBusiness =  Main.ButtonWidgetSettings.business_id;
					}
					if( Main.FloatWidgetSettings){	
						document.getElementsByTagName("body")[0].style.backgroundColor = "";		
						document.getElementsByTagName("body")[0].style.fontSize = "12px";
						document.getElementsByTagName("body")[0].style.color = "#000";
						Shopping.ActiveBusiness =  Main.FloatWidgetSettings.business_id;
					}

					Main.WhereAmIData = new Object();
					if(document.getElementById("businessloading")){
						$("#businessloading").show();
					}
					if(Shopping.ActiveBusiness == 21) {
						Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 22.7074767,"longitud": 88.36911780000003 ,"zoom":9}');
					}else{
						Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7229486,"longitud": -74.0050324 ,"zoom":15}');
					}
					Shopping.Start1()
					return false;
				}

                if(Main.WidgetSettings.site_settings.skip_homepage == 't'){
                    document.getElementsByTagName("body")[0].style.backgroundColor = Main.WidgetSettings.site_settings.background_color;
                    document.getElementsByTagName("body")[0].style.fontSize = Main.WidgetSettings.site_settings.font_size;
                    document.getElementsByTagName("body")[0].style.color = Main.WidgetSettings.site_settings.font_color;
                    Main.adstle =Main.WidgetSettings.site_settings.font_color;
                    Shopping.SkipHomePage = 1;
                    Main.WhereAmIData = new Object();                           
                    Main.WhereAmIData.city = Main.WidgetSettings.default_settings.default_city;
                    Main.deliveryType == "citysearch"
                    Main.WhereAmIData.collecttype = "citysearch";
                    Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7127837,"longitud": -74.00594130000002 ,"zoom":15}');
                    Shopping.Start1()
                    return false;
                }   						

                if(Main.WidgetSettings.default_settings.direct_business){
                    document.getElementsByTagName("body")[0].style.backgroundColor = Main.WidgetSettings.site_settings.background_color;
                    document.getElementsByTagName("body")[0].style.fontSize = Main.WidgetSettings.site_settings.font_size;
                    document.getElementsByTagName("body")[0].style.color = Main.WidgetSettings.site_settings.font_color;

                    Main.adstle =Main.WidgetSettings.site_settings.font_color;
                    Shopping.ActiveBusiness = Main.WidgetSettings.default_settings.default_business;

                    Main.WhereAmIData = new Object();
                    if(document.getElementById("businessloading")){
                        $("#businessloading").show();
                    }
                    if(Shopping.ActiveBusiness == 21) {
                        Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 22.7074767,"longitud": 88.36911780000003 ,"zoom":9}');
                    } else {
                        Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7229486,"longitud": -74.0050324 ,"zoom":15}');
                    }

                    Shopping.Start1()
                    return false;
                }

                if (Main.RedirectToBusiness){                	
                    Main.WhereAmIData = new Object();
                    if(document.getElementById("businessloading")){
                        $("#businessloading").show();
                    }
                    if(Shopping.ActiveBusiness == 21) {
                        Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 22.7074767,"longitud": 88.36911780000003 ,"zoom":9}');
                    }else{
                        Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7229486,"longitud": -74.0050324 ,"zoom":15}');
                    }
                    Shopping.Start1()
                    return false;
                }

                if(Main.RedirectToCategory){
                    Main.WhereAmIData = new Object();
                    Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7229586,"longitud": -74.0050334 ,"zoom":1032}');
                    Shopping.Start1();
                    return false;
                }
                if(Main.RedirectToCMS){
                    if(Main.RedirectToCMS == 4) {
                        Main.contact_us();
                        return false;
                    } else {
                        CMS.Strat();
                        return false;
                    }
                }

                if(Main.RedirectToCMS){
					CMS.Strat();
					return false;
				}                                                

                if (Main.RedirectToCity){
                    var custom_link =window.location.pathname.replace('/','');
                    Main.searchlink = custom_link;
                    if(GoogleMap.MapApiLoaded == true){
                        Main.WhereAmIData = new Object();
                        var geocoder = new google.maps.Geocoder();
                        var address = document.getElementById("cityName").value;

                        geocoder.geocode( { 'address': address}, function(results, status){
                            if (status == google.maps.GeocoderStatus.OK){
                                Main.WhereAmIData.location = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":15}');
                                $.post("panel/lib/front-main.php", "f=FetchCountry&city=" + Main.RedirectToCity, function (e) {
                                    e= JSON.parse(e)
                                    Main.WhereAmIData.country = e.country
                                });
                                Main.WhereAmIData.city = Main.NullToEmpty(Main.RedirectToCity);
                                Shopping.Start1();
                            }
                        });
                    }else{
                        if( Main.NullToEmpty(Main.RedirectToCity) == 10 ) {
                            Main.WhereAmIData = new Object();
                            Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 22.7074767,"longitud": 88.36911780000003 ,"zoom":15}');
                            $.post("panel/lib/front-main.php", "f=FetchCountry&city=" + Main.RedirectToCity, function (e) {
                                e= JSON.parse(e)
                                Main.WhereAmIData.country = e.country
                            });
                            Main.WhereAmIData.city = Main.NullToEmpty(Main.RedirectToCity);
                            Shopping.Start1();
                        }else{
                            Main.WhereAmIData = new Object();
                            Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7229586,"longitud": -74.0050334 ,"zoom":15}');
                            $.post("panel/lib/front-main.php", "f=FetchCountry&city=" + Main.RedirectToCity, function (e) {
                                e= JSON.parse(e)
                                Main.WhereAmIData.country = e.country
                            });
                            Main.WhereAmIData.city = Main.NullToEmpty(Main.RedirectToCity);
                            Shopping.Start1();
                        }
                    }                      
                }else{                 	                      
                    Main.PutMainLeftColElems()
                }

			}else{				
				document.getElementById("usermenu").innerHTML = '<input type="text" placeholder="e-mail" id="loginemail"/><input type="password" placeholder="password" id="loginpassword" onkeyup="Main.LoginPwdType(event)"/><div class="sprt_line"></div><div class="buttonbox"><div class="buttoninner hand" onclick="Main.Login()"><span class="caption hand nonselectable"><?=$lang_resource['FRONT_ENTER_LOGIN'];?></span></div></div><span class="register hand nonselectable" onclick="Main.CommonAccount()"><?=$lang_resource['FRONT_CREATE_AN_ACCOUNT'];?></span><span class="recover hand nonselectable" onclick="Main.RecoverPassword(true)"><?=$lang_resource['FRONT_RECOVER_PASSWORD'];?></span>';
				document.getElementById("loginbottom").innerHTML = '<div class="fb hand" onclick="Facebook.Login()"></div>';
                Main.PutMainLeftColElems();
                Main.User = null;
                Main.WhereAmIData = null
			}					
		});
	},

    
    SeeMore :function () {
    	$("#loading").show();
    	 $('#loading').html('<img src="../panel/images/menu/loading.gif">');
    	 $('#loadMore').hide();
    	 //Main.Loading();
    	d +=1;

    	c=c+4;
    	//alert(c)
	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllReviewsLimit","limit":' + c + "}]", function (a){
		//alert(a)
		a = JSON.parse(a);
		Main.SeeMoreAppend = a.reviews;
		Visuals.SeeMoreDivAppend();	
		$('#loading').hide();
		//
	});
	
},


   

	LoginDetails: function (c){
		Visuals.LoginDetailsView(c);        
    },



	LoginCheck: function (c,b)
    {

		if(document.getElementById("loginemail1")) {
         var c = document.getElementById("loginemail1").value.toLowerCase();
		}
		if(document.getElementById("loginpassword1")) {
          var b = document.getElementById("loginpassword1").value;
		}
		if(Main.chk == 1) {

        Shopping.GetCartItemsCount();
		}


			if (c == "" || b == "")
            {
            	swal("Error","<?= $lang_resource['FRONT_CORRECT_LOGIN_CREDENTIAL'] ?>","error");
			}

            if (c != "" && b != "")
            {

                Main.Loading();
                var a = new Date().getTime();
                Main.Aid = a;
                $.post("panel/login/challenge.php", "", function (e)
                {
                    if (a != Main.Aid)
                    {
                        return
                    }
                    a = new Date().getTime();
                    Main.Aid = a;
                    $.post("panel/login/login.php", "type=normal&username=" + c + "&response=" + hex_md5(e + b), function (f)
                    {
                     
					

                        if (a != Main.Aid)
                        {
                            return
                        }
                        Main.Ready();
                        if (f.trim() == "LoggedIn")
                        {
							if(document.getElementById("checkremember")) {
                 if ((document.getElementById("checkremember").checked == true || document.getElementById("checkremember2").checked == true) && viewDevice == "Desktop" ) {

									setCookie("emailID", c,365);
									setCookie("passVAL", b,365);

							       }else
									{
											unsetCookie("emailID",365);
											unsetCookie("passVAL",365);
									}
							}


		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"}]', function (b)
        {



		if (b != "")
            {
				  document.getElementById("loginbottom").innerHTML = "";


				  if(viewDevice == "Desktop") {
			      Popup.Close();
				   }

                Main.User = JSON.parse(b).user;
					$(".join_btn").hide();
					$(".popdiv_pop").addClass("popdiv_pop_right");
					$(".popdiv").addClass("popdiv_right");
				document.getElementById("usermenu").innerHTML = Main.GetUserBoxHtml();
			       $('.lognhead').html(Main.User.name);


			if (Main.User)
			{

				Shopping.Cart.buyer.id = Main.User.id;
				Shopping.Cart.buyer.name = Main.User.name + " " + Main.NullToEmpty(Main.User.lastname);
				if (Shopping.Cart.buyer.name == " ")
				{
					Shopping.Cart.buyer.name = ""
				}
				Shopping.Cart.buyer.email = Main.User.email;
				Shopping.Cart.buyer.tel = Main.User.tel;
				Shopping.Cart.buyer.colony = Main.User.colony;
				Shopping.Cart.buyer.reference = Main.NullToEmpty(Main.User.findfrom);
				Shopping.Cart.buyer.cityname =  Main.NullToEmpty(Main.User.cityname);
				Shopping.Cart.buyer.lastname2 =  Main.NullToEmpty(Main.User.lastname2);
				Shopping.Cart.buyer.api =  Main.NullToEmpty(Main.User.api);
				Shopping.Cart.buyer.cel =  Main.NullToEmpty(Main.User.cel);
				Shopping.Cart.buyer.cp =  Main.NullToEmpty(Main.User.cp);
				Shopping.Cart.buyer.zip =  Main.NullToEmpty(Main.User.cp);
				Shopping.Cart.buyer.zipcode =  Main.NullToEmpty(Main.User.cp);
				Shopping.Cart.buyer.countryname =  Main.NullToEmpty(Main.User.countryname);
				Shopping.Cart.buyer.street = Main.NullToEmpty( Main.User.street);
			}
			if (Main.WhereAmIData)
			{


				Shopping.Cart.buyer.address = Main.WhereAmIData.address;
				Shopping.Cart.buyer.city = Main.WhereAmIData.city;
				//Shopping.Cart.buyer.cityname = Main.WhereAmIData.cityname
				
				console.log("shopcity11="+Shopping.Cart.buyer.cityname)
			}
			if(Main.WhereAmIDataCus) {

				Shopping.Cart.buyer.address = Main.WhereAmIDataCus.address;
				Shopping.Cart.buyer.city = Main.WhereAmIDataCus.city;
				//Shopping.Cart.buyer.cityname = Main.WhereAmIDataCus.cityname
				
				
			}


				 Shopping.OpenCartCheck();
			}

		});

						}
                        else
                        {
                            alert(f)
                        }
                    })
                })
            }

    },




    PutMainLeftColElems: function (){
    	
    	if(Main.searchBy){    		
			resturantsidarr=Main.searchBy.resturantsid.split(",");
			cuisinesidarr=Main.searchBy.cuisinesid.split(",");

			if(Main.searchBy.deliveryType == "delivery"){
				Main.WhereAmIData = new Object();
				Main.WhereAmIData.country = Main.searchBy.country;
				Main.WhereAmIData.city = Main.searchBy.city;
				Main.WhereAmIData.currency = "USD";
				Main.WhereAmIData.ga = "";
				Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": '+Main.searchBy.latitud+',"longitud": '+Main.searchBy.longitud+' ,"zoom":'+Main.searchBy.zoom+'}');
				Main.WhereAmIData.cityname = Main.searchBy.cityname;
				Main.WhereAmIData.collecttype = "delivery"
				Main.deliveryType="delivery";
				Main.WhereAmIData.reservestatus = "delivery"
				Main.searchType ="Ordinary";
				Main.WhereAmIData.address = Main.searchBy.address;
				if(Main.searchBy.resturantsid)
					Main.WhereAmIData.resturant = JSON.stringify(resturantsidarr);

				if(Main.searchBy.businesstype)
					Main.WhereAmIData.businesstype = Main.searchBy.businesstype

				if(Main.searchBy.cuisinesid)
					Main.WhereAmIData.cuisines = JSON.stringify(cuisinesidarr);

				Main.WhereAmIData.rhour = -1;
				Main.WhereAmIData.rmin = -1;
				Main.WhereAmIData.zipcode = Main.searchBy.zipcode;
				Main.WhereAmIData.approved = true;
				Shopping.Start1();
				return false;
			}else if(Main.searchBy.deliveryType == "neighbours"){				
				Main.WhereAmIData = new Object();
				Main.WhereAmIData.country = Main.searchBy.country;
				Main.WhereAmIData.city = Main.searchBy.city;
				Main.WhereAmIData.currency = "USD";
				Main.WhereAmIData.ga = "";
				Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": '+Main.searchBy.latitud+',"longitud": '+Main.searchBy.longitud+' ,"zoom":'+Main.searchBy.zoom+'}');
				Main.WhereAmIData.cityname = Main.searchBy.cityname;
				Main.WhereAmIData.collecttype = "delivery"
				Main.deliveryType="delivery";
				Main.WhereAmIData.reservestatus = "delivery"
				Main.searchType ="Ordinary";
				Main.WhereAmIData.address = Main.searchBy.address;
				Main.WhereAmIData.resturant =JSON.stringify(resturantsidarr);
				if(Main.searchBy.businesstype)
					Main.WhereAmIData.businesstype = Main.searchBy.businesstype
			
				Main.WhereAmIData.delivery_neighborhoodStaus = 1;
				Main.WhereAmIData.delivery_neighborhood = Main.searchBy.address;
				Main.WhereAmIData.delivery_neighborhoodid = Main.searchBy.neighbourid;

				Main.WhereAmIData.cuisines = JSON.stringify(cuisinesidarr);
				Main.WhereAmIData.rhour = -1;
				Main.WhereAmIData.rmin = -1;
				Main.WhereAmIData.zipcode = Main.searchBy.zipcode;
				Main.WhereAmIData.approved = true;

				Shopping.Start1();
				return false;
			}else{				
				Main.WhereAmIData = new Object();
				Main.WhereAmIData.country = Main.searchBy.country;
				Main.WhereAmIData.city = Main.searchBy.city;
				Main.WhereAmIData.currency = "USD";
				Main.WhereAmIData.ga = "";

				if(Main.searchBy.latitud)
					Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": '+Main.searchBy.latitud+',"longitud": '+Main.searchBy.longitud+' ,"zoom":'+Main.searchBy.zoom+'}');
				else
					Main.WhereAmIData.location = Main.NullToEmpty('{"latitud": 40.7229486,"longitud": -74.0050324 ,"zoom":15}');
				
				Main.WhereAmIData.cityname = Main.searchBy.cityname;
				Main.WhereAmIData.collecttype = "pickup"
				Main.deliveryType="pickup";
				Main.WhereAmIData.reservestatus = "pickup"
				Main.searchType ="Ordinary";
				Main.WhereAmIData.address =  Main.searchBy.address;
				Main.WhereAmIData.resturant =JSON.stringify(resturantsidarr);
				Main.WhereAmIData.cuisines =  JSON.stringify(cuisinesidarr);

				if(Main.searchBy.businesstype)
					Main.WhereAmIData.businesstype = Main.searchBy.businesstype

				Main.WhereAmIData.rhour = -1;
				Main.WhereAmIData.rmin = -1;
				Main.WhereAmIData.approved = true;


				if(Main.searchBy.reservation==1){
					Main.WhereAmIData.reservestatus =  "reservation";
					Main.WhereAmIData.reservation =  true;
					if(Main.searchBy.guest!=-1){
						Main.WhereAmIData.guest =   Main.searchBy.guest;
					}
					if(Main.searchBy.rdate!=-1){
						Main.WhereAmIData.rdate =  ( Main.searchBy.rdate.replace("-","/")).replace("-","/");
					}					
					Main.WhereAmIData.rhour =   Main.searchBy.rhour;
					Main.WhereAmIData.rmin =   Main.searchBy.rmint;
				}
				console.log(JSON.stringify(Main.WhereAmIData));
				Shopping.Start1();
				return false;
			}
		}


		if(Main.set_stat == 2){					
			document.getElementById("top").innerHTML = Visuals.CreateWhrYouButton("<?= $lang_resource['BODY_WHERE_ARE_YOU'] ?>", "Main.OpenWhereAmIBox();");    
			Main.OpenWhereAmIBox();
			
			if(Main.settingfront.sildersetiings == "t"){
				var slideduration = Main.settingfront.slider_duration * 1000;
				if(viewDevice == "Desktop"){
					/*if(!Main.RedirectToBusiness) {      
						AutoPop.Main()  
					}*/

					if(document.getElementById("maximage")){
						$(function(){
							// Trigger maximage
							jQuery('#maximage').maximage({
								cycleOptions: {
									timeout: slideduration,                 
								},             
							});
						});
					}

					$(document).ready(function() {
						$("#owl-demo").owlCarousel({
							autoPlay: slideduration,
							navigation : true,
							slideSpeed : 200,
							paginationSpeed : 400,
							singleItem : true
							// "singleItem:true" is a shortcut for:
							// items : 1, 
							// itemsDesktop : false,
							// itemsDesktopSmall : false,
							// itemsTablet: false,
							// itemsMobile : false
						});
					});
				}else{
					if(!Main.RedirectToBusiness) {      
						AutoPop.Main()      
					}
					
					$(function(){
						// Trigger maximage
						jQuery('#maximage').maximage({
							cycleOptions: {
								timeout: slideduration,                 
							},             
						});
					});					      
				}
			}

			$(document).ready(function() {
				var owl = $("#owl-demo1");
					owl.owlCarousel({
					navigation: false,
					items : 4, //10 items above 1000px browser width
					itemsDesktop : [1000,5], //5 items between 1000px and 901px
					itemsDesktopSmall : [900,3], // 3 items betweem 900px and 601px
					itemsTablet: [600,1], //2 items between 600 and 0;
					itemsMobile : true // itemsMobile disabled - inherit from itemsTablet option
				});
				// Custom Navigation Events
				$(".next").click(function(){
					owl.trigger('owl.next');
				})
				$(".prev").click(function(){
					owl.trigger('owl.prev');
				})
				$(".play").click(function(){
					owl.trigger('owl.play',1000);
				})
				$(".stop").click(function(){
					owl.trigger('owl.stop');
				})
			});
			
			document.getElementById("left").innerHTML = Visuals.CreateMainStepsBox();
			document.getElementById("rbuttons").style.display = "none";
			

			if(Main.RedirectToCustomPage==1){       
				if(viewDevice == "Mobile") {        
					var a = document.getElementById("top");
					a.innerHTML = Visuals.RequestCollectionHtml();
					$('#resturent_collection_time').datetimepicker({
						step:1,
						minDate:'-1970/01/01'
					});             
					$(".xdsoft_datetimepicker").css("left", "4px"); 
					$(".xdsoft_datetimepicker").css("width", "312px"); 
				}
			}else{
				Main.OpenWhereAmIBox(); 
			}
			var a = new Array();
			a.push("panel/theme/howbox1.jpg");
			a.push("panel/theme/howbox2.jpg");
			a.push("panel/theme/howbox3.jpg");
			a.push("panel/theme/howbox4.jpg");
			HowBox.Init("howbox", a, 5);			
			Main.ActiveView = "/";  			
		}else if(Main.set_stat == 1){	
			
			$("#custom").show();
			$("#newssletter_cnt").hide();
			$("#top").empty();		
			document.getElementById("top").innerHTML = Main.CreateWhrYouButton_new();		
		}

    },
	
	onYouTubePlayerAPIReady: function() {
			var videoURL = $('#player').prop('src');
			videoURL = videoURL.replace("?autoplay=1", "");
			videoURL += "?autoplay=1";
			$('#player').prop('src',videoURL);
		 },
		 
    onYouTubePlayerAPIStop: function() {
			var videoURL = $('#player').prop('src');
			videoURL = videoURL.replace("?autoplay=1", "");
			$('#player').prop('src','');
			$('#player').prop('src',videoURL);
		 },


    CreateWhrYouButton_new: function(){
		
		
		
		var htms = '';
		htms += '<div class="homepage_banner">';
		htms += '<h1><?=$lang_resource['FIRST_HEADING']?><br><?=$lang_resource['FIRST_HEADING_N']?></h1>';
		htms += '<div class="container">';
		htms += '<div class="row">';
		htms += '<div class="col-md-7">';
		htms += '<div class="banner_device">';
		htms += '<img src="images/banner_desktop.png">';
		htms += '</div>';<!--banner_device-->
		htms += '</div>';<!--col-md-6-->
		htms += '<div class="col-md-5">';
		htms += '<div class="home_signup_dv">';
		htms += '<div class="form-group"><input type="text" id="email" class="form-control email_field" placeholder="<?=$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_EMAIL']?>" required="required"></div>';<!--form-group-->
		htms += '<select id="countryregister" class="form-control" required="required">';
		htms += '<option value=""><?=$lang_resource['FRONT_SELECT_COUNTRY']?></option>';
		for(var c in Main.Countries_switch){	
			htms += '<option value="'+Main.Countries_switch[c].id+'">'+Main.Countries_switch[c].name+'</option>';
		}
		htms += '</select>';
		htms += '<div class="form-group"><button type="button" class="btn_sign_up" onclick="Main.SwitchRegistration()"><?=$lang_resource['SIGNUP']?></button></div>';<!--form-group-->
		htms += '<div class="form-group"><button type="button" class="btn_how_it_works" data-toggle="modal" data-target=".modal_how_it_works" onclick="Main.onYouTubePlayerAPIReady(); ">HOW IT WORKS</button>';<!--form-group-->
		
		 htms += '<div class="modal fade modal_how_it_works my_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: none;">'
    htms += '<div class="modal-dialog modal-lg">'
      htms += '<div class="modal-content">'
      	htms += '<div class="modal_video_dv">'
		htms += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="Main.onYouTubePlayerAPIStop(); ">X</button>'
      htms += '<iframe id="player" width="100%" height="500" src="https://www.youtube.com/embed/MfSFzHq-CZ4" frameborder="0" allowfullscreen></iframe>'
      htms += '</div>'<!--modal_video_dv-->
      htms += '</div>'<!-- /.modal-content -->
    htms += '</div>'<!-- /.modal-dialog -->
  htms += '</div>'
		
		htms += '</div>';<!--home_signup_dv-->
		htms += '</div>';<!--col-md-6-->
		htms += '</div>';<!--row-->
		htms += '</div>';<!--container-->
		htms += '</div>';<!--homepage_banner-->
		htms += '</div>';
		htms += '<div class="container">';
		htms += '<div class="row">';
		htms += '<div class="col-md-4">';
		htms += '<div class="home_step_dv">';
		htms += '<div class="home_step_icon">';
		htms += '<a href="#"><div class="step_icon_1"></div></a>';
		htms += '<h3><?=$lang_resource['FIRST_COLUMN_HEADING']?></h3>';
		htms += '<p><?=$lang_resource['FIRST_COLUMN_DESC']?></p>';
		htms += '</div>';<!--home_step_icon-->
		htms += '</div>';<!--home_step_dv-->
		htms += '</div>';<!--col-md-4-->
		htms += '<div class="col-md-4">';
		htms += '<div class="home_step_dv">';
		htms += '<div class="home_step_icon">';
		htms += '<a href="#"><div class="step_icon_2"></div></a>';
		htms += '<h3><?=$lang_resource['SECOND_COLUMN_HEADING']?></h3>';
		htms += '<p><?=$lang_resource['SECOND_COLUMN_DESC']?></p>';
		htms += '</div>';<!--home_step_icon-->
		htms += '</div>';<!--home_step_dv-->
		htms += '</div>';<!--col-md-4-->
		htms += '<div class="col-md-4">';
		htms += '<div class="home_step_dv">';
		htms += '<div class="home_step_icon">';
		htms += '<a href="#"><div class="step_icon_3"></div></a>';
		htms += '<h3><?=$lang_resource['THIRD_COLUMN_HEADING']?></h3>';
		htms += '<p><?=$lang_resource['THIRD_COLUMN_DESC']?></p>';
		htms += '</div>';<!--home_step_icon-->
		htms += '</div>';<!--home_step_dv-->
		htms += '</div>';<!--col-md-4-->
		htms += '</div>';<!--row-->
		htms += ' <hr>';
		htms += '</div>';<!--container-->
		return htms;
	},	

	RegistrationSuccessful: function(){

		htms = '<div class="common_wrapper">';
		htms += '<div class="container">';
		htms += '<div class="row">';
		htms += '<div class="col-md-12">';
		htms += '<div class="text-center"><img src="images/confirmation-icon.png"></div>';
		htms += '<h3 class="text-center"><?=$lang_resource['REGISTRATION_SUCCESSFUL']?></h3>';
		htms += ' <hr>';
		htms += '<p class="text-center"><?=$lang_resource['REGISTRATION_SUCCESSFUL_TEXT']?></p><br>';
		htms += '<h4 class="text-center"><?=$lang_resource['EMAIL_SENT_TEXT']?></h4><br>';               
		htms += '</div>';<!--col-md-12-->
		htms += '</div>';<!--row-->
		htms += '<div class="row">';
		htms += '<div class="col-md-4 col-md-offset-4"><button class="main-btn-larg" onclick="top.location.href=\'admin\'"><?=$lang_resource['GO_TO_ADMIN']?></button></div>';<!--col-md-6-->
		htms += '</div>';<!--row-->
		htms += '<br><br><br><hr>';
		htms += '</div>';<!--container-->
		htms += '</div>'<!--common_wrapper-->

		return htms;
	},

	 zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   },
    GetUserBoxHtml: function (){
    	if(viewDevice == "Mobile"){
    		var a = '<span class="welcome default"><?= $lang_resource['LOGIN_WELCOME_TEXT'] ?> ' + Main.NullToEmpty(Main.User.name) + "!</span>";
			a += '<ul class="actions acc_ul">';

			a += '<li><span class="hand acc_btn" onclick="Visuals.MyOrders(false)"><?= $lang_resource['LOGIN_LINK_MY_ORDERS'] ?></span></li>';

			if (Main.User.level != 3){
			if(Main.User.panelsetting == 1){
			a += '<li><span class="hand acc_btn" onclick="top.location.href=\'panel\'"><?= $lang_resource['LOGIN_LINK_CONTROL_PANEL'] ?></span></li>'
			}else{
			a += '<li><span class="hand acc_btn" onclick="top.location.href=\'admin\'"><?= $lang_resource['LOGIN_LINK_CONTROL_PANEL'] ?></span></li>'  
			}
			} 

			if ((Main.User.level == 4) || (Main.User.level == 5) || (Main.User.level == 3))
			{
			a += '<li><span class="hand acc_btn" onclick="Main.EditAccount()"><?= $lang_resource['LOGIN_LINK_EDIT_PROFILE'] ?></span></li>'
			}
			a += '<li><span class="hand acc_btn" onclick="MyAccount.Start();"><?= $lang_resource['FRONT_MY_ACCOUNT'] ?></span></li>';
			if(viewDevice !='Mobile'){
			a += '<li><span class="hand acc_btn" onclick="Visuals.ChangeForm()"><?= $lang_resource['CHANGE_PASSWORD'] ?></span></li>';
			}
			a += '<li><span class="hand acc_btn" onclick="Main.LogOut()"><?= $lang_resource['LOGIN_LINK_SESSION_CLOSE'] ?></span></li>';


			a += '</ul>';

			return a
    	}else{
    		var a = Visuals.AfterLoginHtml()
    		return a
    	}
    	
    },
    
    FacebookReady: function ()
    {
        var a = document.getElementById("fbbox");
        if (a)
        {
            a.innerHTML = '<div class="fb hand" onclick="Facebook.Login()"></div>'
        }
        Facebook.OnLogin = Main.FacebookLoggedIn
    },
    FacebookLoggedIn: function ()
    {
		if (Facebook.User.id)
        {
            var a = new Object();
            a.type = "fb";
            a.id = Facebook.User.id;
            a.name = Facebook.User.first_name;
            a.lastname = Facebook.User.last_name;
            a.email = Facebook.User.email;
            Main.Login(a);
            Main.LoggedInWith = "Facebook"
		}
    },
    TwitterReady: function ()
    {
        var a = document.getElementById("twbox");
        if (a)
        {
            a.innerHTML = '<div class="tw hand" onclick="Twitter.Login()"></div>'
        }
        Twitter.OnLogin = Main.TwitterLoggedIn
    },
    TwitterLoggedIn: function ()
    {
        if (Twitter.User.id)
        {
            var b = new Object();
            b.type = "tw";
            b.id = Twitter.User.id;
            var a = Twitter.User.name.split(" ");
            b.name = a[0];
            b.lastname = a[1];
            Main.Login(b);
            Main.LoggedInWith = "Twitter"
        }
    },
	OpenWhereAmIDeliveryBox: function (options,comments,optionsid,total_price)
    {


        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (b)
        {

            if (a != Main.Aid)
            {
                return
            }
            Main.Ready();
            if (b != "")
            {
                b = JSON.parse(b);
                Main.Countries = b.countries;
                if (!Main.WhereAmIData && Main.User)
                {
                    Main.WhereAmIData = new Object();
                    Main.WhereAmIData.location = Main.NullToEmpty(Main.User.location);
                    Main.WhereAmIData.country = Main.NullToEmpty(Main.User.country);
                    Main.WhereAmIData.city = Main.NullToEmpty(Main.User.city);

                    if(IS_PAYPAL_ENABLED != 1)
					{
						 var c = Main.NullToEmpty(Main.User.street);
						if (c == "")
						{
							c = Main.NullToEmpty(Main.User.colony)
						}
						else
						{
							if (Main.NullToEmpty(Main.User.colony) == "")
							{
								c += Main.NullToEmpty(Main.User.colony)
							}
							else
							{
								c += ", " + Main.NullToEmpty(Main.User.colony)
							}
						}

						Main.WhereAmIData.address = c
					}
                }
             if(Main.User)   
                Main.WhereAmIData.address = Main.NullToEmpty(Main.User.street);
			if(viewDevice == "Desktop") {
				
				 Main.WhereAmIDelivery(Main.WhereAmIData,options,comments,optionsid,total_price)
				 
			} else if (viewDevice == "Mobile") {
				
				 Main.WhereAmIDeliveryMob(Main.WhereAmIData,options,comments,optionsid,total_price)
				 
				
				}

            }
            else
            {	
            	swal("Error","Unexpected error","error");
            }
        })
    },
	OpenWhereAmIDeliveryOfCityBox: function (){
		Main.Loading();
		var a = new Date().getTime();
		Main.Aid = a;
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (b){
			if (a != Main.Aid){
				return
			}
			Main.Ready();
			if (b != ""){
				b = JSON.parse(b);
				Main.Countries = b.countries;
				if (!Main.WhereAmIData && Main.User){
					Main.WhereAmIData = new Object();
					Main.WhereAmIData.location = Main.NullToEmpty(Main.User.location);
					Main.WhereAmIData.country = Main.NullToEmpty(Main.User.country);
					Main.WhereAmIData.city = Main.NullToEmpty(Main.User.city);
					if(IS_PAYPAL_ENABLED != 1){
						var c = Main.NullToEmpty(Main.User.street);
						if (c == ""){
							c = Main.NullToEmpty(Main.User.colony)
						}else{
							if (Main.NullToEmpty(Main.User.colony) == ""){
								c += Main.NullToEmpty(Main.User.colony)
							}else{
								c += ", " + Main.NullToEmpty(Main.User.colony)
							}
						}
						Main.WhereAmIData.address = c
					}
				}

				if(viewDevice == "Desktop") {
					Blist.WhereAmIDeliveryOfCity(Main.WhereAmIData)
				} else if (viewDevice == "Mobile") {
					Main.WhereAmIDeliveryOfCityMob(Main.WhereAmIData)
				}
			}else{
				swal("Error","Unexpected error","error");
			}
			Main.Ga("/whereami")
		})
    },
    OpenWhereAmIBox: function ()
    {

		var htms = '<form>';
			htms += '<input type="text" name="country" id="country" class="hm_txtbx" placeholder="<?= $lang_resource['COUNTRY_V2'] ?>" onkeyup="Forms.CheckTextInput(\'whereami\',this);Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)" />';
			htms += '<br clear="all" />';
			htms += '<input type="text" name="city" id="city" class="hm_txtbx" placeholder="<?= $lang_resource['CITY_V2'] ?>" onkeyup="Forms.CheckTextInput(\'whereami\',this);GoogleMap.UpdateUserPosition(this)" />';
			htms += '<br clear="all" />';
			htms += '<input type="text" name="address" id="address" class="hm_txtbx" placeholder="<?=$lang_resource['ADDRESS_V2'];?>" onkeyup="Forms.CheckTextInput(\'whereami\',this);GoogleMap.UpdateUserPosition(this)" />';
			htms += '<br clear="all" />';

			htms += '<input type="submit" value="letsgo" class="letsgo" />';
			htms += '<br clear="all" />';
			htms += '<p><?= $lang_resource['ELSE_HP'] ?></p>';
			htms += '<br clear="all" />';
			htms += '<input type="submit" value="letfind" class="letfind" />';
		htms += '</form>';

        var a = new Date().getTime();
        Main.Aid = a;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (b)
        {
            if (a != Main.Aid)
            {
                return
            }
            Main.Ready();
            if (b != "")
            {
                b = JSON.parse(b);
                Main.Countries = b.countries;

			   if (Main.User)
                {

                    Main.WhereAmIData = new Object();
                    Main.WhereAmIData.location = Main.NullToEmpty(Main.User.location);
                    Main.WhereAmIData.country = Main.NullToEmpty(Main.User.country);
                    Main.WhereAmIData.city = Main.NullToEmpty(Main.User.city);
					if( Main.NullToEmpty(Main.User.street)!="")
					{
					Main.WhereAmIData.address = Main.NullToEmpty(Main.User.street);
					}
					else
					{
					Main.WhereAmIData.address = Main.NullToEmpty(Main.User.street) +","+ Main.NullToEmpty(Main.User.cp);
					}
					Main.WhereAmIData.colony = Main.User.colony;



                    if(IS_PAYPAL_ENABLED != 1)
					{
						 var c = Main.NullToEmpty(Main.User.street);
						if (c == "")
						{
							c = Main.NullToEmpty(Main.User.colony)
						}
						else
						{
							if (Main.NullToEmpty(Main.User.colony) == "")
							{
								c += Main.NullToEmpty(Main.User.colony)
							}
							else
							{
								c += ", " + Main.NullToEmpty(Main.User.colony)
							}
						}
						Main.WhereAmIData.address = c
					}
                }
				
                WhereAmIBox.WhereAmI(Main.WhereAmIData)
                //Visuals.ReviewsShow(Main.reviewsfont);
				       
				


            }
            else
            {
            	swal("Error","Unexpected error","error");
            }
            Main.Ga("/whereami")
        })
    },

	ChooseDeliverOption: function (x,y,options,comments,optionsid,total_price,quantitysec)
    {
		 Main.Ready();
		 Main.currentItem = y;
		 Main.type = "modify";
		 Main.currentX = x;
		 Main.Itemoptions = options;
		 Main.Itemcomments = comments;
		 Main.Itemoptionsid = optionsid;
		 Main.Itemtotal_price = total_price;
		 Main.Itemquantitysec = quantitysec;

		Forms.Clean("recover13", "popupmainbuttonok");

       var   a = '<div class="popup_wrapper">';
		a += '<div class="pop_header">';
        a += '<div class="pop_heading"><h3><?=$lang_resource['Delivery_Option']?></div>';
	     a += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	 a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
         a += '</div>';
        a += "</div>";


		a += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';


//		alert(JSON.stringify(Main.settingfront))
		var qs = new Array();
        qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PICKUP_DELIVERY']?>"}'));
        if(Main.settingfront.tab_delivery != 'f'){
				 qs.push(JSON.parse('{"id":"delivery","caption":"<?=$lang_resource['DELIVERY']?>"}'));
			}
			if(Main.settingfront.tab_pickup != 'f'){
				 qs.push(JSON.parse('{"id":"pickup","caption":"<?=$lang_resource['PICKUP']?>"}'));
			}



	    a += '<tr>';
        a += '<td align="center" colspan="2">' +  Forms.CreateSelectPropertyPopup("recover13", "deliveryoption", qs, "", true) + '</td>';
        a += '</tr>';
		a += '<tr>';
        a += '<td align="center" colspan="2">&nbsp;</td>';
        a += '</tr>';
		  a += '<tr>';
        a += '<td align="center" colspan="2"><button type="button" class="pop_submit_btn" style="width:250px;" onclick="Main.DeliveryAction()"><?=$lang_resource['FRONT_CONTINUE'];?></button></td>';
        a += '</tr>';

        a += "</table>";


       Main.Ga("/profile/recoverpwd");
        Popup.Show(440, 240, a, function ()
        {





        }, function ()
        {
            Forms.Clean("recover13");
            Main.Ga(Main.ActiveView)
        })
},
DeliveryAction: function () {

			if(Forms.Form.recover13.fields.deliveryoption.value == "" ) {
				swal("Error","<?= $lang_resource['FRONT_CHOOSE_OPTIONS'] ?>","error");
				}
			else if(Forms.Form.recover13.fields.deliveryoption.value == "pickup")
			{
				Popup.Close();
								
				var disdel = "pickup";
				

				//alert(JSON.stringify(Shopping.Cart)) 

				if(Shopping.Cart.preorder){
					
					if(Shopping.Cart.buyer.deliverydate){
						Shopping.Cart.Preordserdateback = Shopping.Cart.buyer.deliverydate;		
					}else{
						Shopping.Cart.buyer.deliverydate = Shopping.Cart.Preordserdateback;
					}
					var dd = Shopping.Cart.Preordserdateback;
					
					dd = dd.replace("-","")
					dd = dd.replace("-","")


					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(disdel) + "}]", function (a){		 

			
			var melist = JSON.parse(a);
			
			var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);

			if(M!=-1){
				
			delete Shopping.Menu;

			Main.deliveryAccept = 2;
			Main.WhereAmIData.collecttype = "pickup";

			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservestatus = "pickup"
			var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				//alert(w)
				//alert(JSON.stringify(Shopping.Business))
			   Shopping.Business[w].shipping = 0;
				if(Main.RedirectToCity) {
				var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.RedirectToCity);


				Shopping.Cart.buyer.city = Shopping.RedirectToCity;
				Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
				}
				else {

				var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[w].city);


				Shopping.Cart.buyer.city = Shopping.Business[w].city;
				Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;

					}
					
			Shopping.Menu = melist.menu;
			RestMenuList.PrintBusinessAndDishes("");
				
	Shopping.AddToCart(Main.currentX,Main.currentItem,Main.Itemoptions,Main.Itemcomments, Main.Itemoptionsid,Main.Itemtotal_price,Main.Itemquantitysec)	
			}else{
				swal("Error","<?= $lang_resource['FRONT_CHOOSE_OPTIONS_PICKUP_ALERT'] ?>","error");
				return false;
		}
			

                
			});
				}else{
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(disdel) + "}]", function (a){		 
			
			var melist = JSON.parse(a);
			
			var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);

			if(M!=-1){
				
			delete Shopping.Menu;

			Main.deliveryAccept = 2;
			Main.WhereAmIData.collecttype = "pickup";

			Main.deliveryType = "pickup";
			Main.WhereAmIData.reservestatus = "pickup"
			var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				//alert(w)
				//alert(JSON.stringify(Shopping.Business))
			   Shopping.Business[w].shipping = 0;
				if(Main.RedirectToCity) {
				var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.RedirectToCity);


				Shopping.Cart.buyer.city = Shopping.RedirectToCity;
				Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
				}
				else {

				var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[w].city);


				Shopping.Cart.buyer.city = Shopping.Business[w].city;
				Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;

					}
					
			Shopping.Menu = melist.menu;
			RestMenuList.PrintBusinessAndDishes("");
				
	Shopping.AddToCart(Main.currentX,Main.currentItem,Main.Itemoptions,Main.Itemcomments, Main.Itemoptionsid,Main.Itemtotal_price,Main.Itemquantitysec)	
			}else{
				swal("Error","<?= $lang_resource['FRONT_CHOOSE_OPTIONS_PICKUP_ALERT'] ?>","error");
				return false;
		}
			

                
			});
				}
			
			
			Forms.Clean("recover13");

			}
			else
			{
				Main.WhereAmIData.reservestatus = "delivery"
				Main.deliveryAccept = 1;

				Main.OpenWhereAmIDeliveryBox(Main.Itemoptions,Main.Itemcomments, Main.Itemoptionsid,Main.Itemtotal_price);
			}
		/*	if(Main.WhereAmIData.reservestatus  == 'delivery'){
			aw +='';	
			document.getElementById("pick").innerHTML = w; 		
			}
			if(Main.WhereAmIData.reservestatus  == 'pickup' || Main.WhereAmIData.reservestatus  == 'reservation'){
			aw +='';	
			document.getElementById("deli").innerHTML = w; 	
			}*/
			 

	},
PreorderMainfun :function (d,itemid) {
	var b = new Date().getTime();
	Main.Aid = b;
	Main.Loading();
	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCurrentDate"},{"operation":"FetchBusinessOnlyMenuEach","itemid":' + itemid + "}]", function (a){
       	Main.itemid = itemid;
		Main.Ready();
		a = JSON.parse(a);
		Main.currentDate = a.currentDate;
		a = JSON.stringify(a);
		if(viewDevice == "Mobile") {
			RestMenuList.PreorderMainMob(a)
		}else{
			Main.PreorderMain(a)
		}
	});
},
PreorderMainfunB :function (d,itemid) {
	var b = new Date().getTime();
	Main.Aid = b;
	Main.Loading();
	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + itemid + "}]", function (a){
		Main.itemid = itemid;
		Main.Ready();
		Main.PreorderMainB(a)
	});
},
	deliveryTimeCheck:function (c) {

		if(c.value == "ASAP")  {


		}
		else
		{

		}

		Shopping.Cart.buyer.deliverydate = c.value;

		var  curdte =  c.value.split("-");

			   var b = new Date().getTime();
			   Main.Aid = b;
               Main.Loading();

			   $.post("panel/lib/front-bulk.php", 'data=[{"operation":"deliveryTimeCheck","businessid":' + currentshop +',"sdate":' + JSON.stringify(c.value) + "}]", function (a)
       {

		    Main.deliveryTime = JSON.parse(a).deliveryTime;

			var rec = JSON.parse(Main.deliveryTime[0].timelistHHText);
			var recv = JSON.parse(Main.deliveryTime[0].timelistvalue);



			var e = document.getElementById("chkout_delivery_hour");
			  e.options.length = 0;
			 e.options[e.options.length] = new Option("HH", "");

			for(var i=0;i<rec.length;i++) {



					 e.options[e.options.length] = new Option(rec[i], recv[i]);

				}


		   Main.Ready();

	  });


		},
	CheckoutEditHourcheck: function() {
		  //Time selection settings. 
		time_format="<?=$lang_resource['TIME_FORMAT']?>";
	var  curdte =  Shopping.Cart.buyer.deliverydate.split("-");


		       k = JSON.parse(Main.Preordercattime)
				if(document.getElementById("preorderhh")){
					var e = document.getElementById("preorderhh");
					e.options.length = 0;
					e.options[e.options.length] = new Option("HH","");
				}
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
				if(document.getElementById("preorderhh"))
			  e.options[e.options.length] = new Option(sha, p);

			  if (Shopping.Cart.preordertimehh == p)
                {

                    e.selectedIndex = parseInt(p) + 1
                }
					}
				} else {
					 //Time selection settings. 
					if(time_format=="12"){
						var sha =  Main.zeroPad((p),2)+" AM";
					}else{
							var sha =  Main.zeroPad((p),2);
					}
				if(document.getElementById("preorderhh"))	
				 e.options[e.options.length] = new Option(sha, p);
				 if (Shopping.Cart.preordertimehh == p)
                {
					if(document.getElementById("preorderhh"))
                    e.selectedIndex = parseInt(p) + 1
                }
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
						var shp =  Main.zeroPad((p),2)+" PM";
					}else{
							var shp =  Main.zeroPad((p),2);
					}
				if(document.getElementById("preorderhh"))
			  e.options[e.options.length] = new Option(shp, p);
			  //
			  if (Shopping.Cart.preordertimehh == p)
                {
					if(document.getElementById("preorderhh"))
                    e.selectedIndex = parseInt(p) + 1
                }
					}
				} else {
					 //Time selection settings. 
					if(time_format=="12"){
						var shp =  Main.zeroPad((p),2)+" PM";
					}else{
							var shp =  Main.zeroPad((p),2);
					}
					if(document.getElementById("preorderhh"))
				 e.options[e.options.length] = new Option(shp, p);
				 if (Shopping.Cart.preordertimehh == p)
                {
					if(document.getElementById("preorderhh"))
                    e.selectedIndex = parseInt(p) + 1
                }
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
							var shp =  Main.zeroPad((p),2);
					}
				if(document.getElementById("preorderhh"))
			  e.options[e.options.length] = new Option(shp, p);
			  if (Shopping.Cart.preordertimehh == p)
                {
					if(document.getElementById("preorderhh"))
                    e.selectedIndex = parseInt(p) + 1
                }
					}
				} else {
					 //Time selection settings. 
					 if(time_format=="12"){
						var shp =   Main.zeroPad((pp),2)+" PM";
					}else{
							var shp =  Main.zeroPad((p),2);
					}
				if(document.getElementById("preorderhh"))	
				 e.options[e.options.length] = new Option(shp, p);
				 if (Shopping.Cart.preordertimehh == p)
                {
					if(document.getElementById("preorderhh"))
                    e.selectedIndex = parseInt(p) + 1
                }
					}
					}
			   }



        }
		for (var p =24; p < 29; p++) {
			if(p==24 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
			 e.options[e.options.length] = new Option("12AM", p);
			}
			else if(p==25 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("1AM", p);
			}
			else if(p==26 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("2AM", p);
			}
			else if(p==27 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("3AM", p);
			}
			else if(p==28 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("4AM", p);
			}

			if (Shopping.Cart.preordertimehh == p)
							{
								if(document.getElementById("preorderhh"))
							e.selectedIndex = parseInt(p) + 1
							}
		}
		$('#preorderhh option[value="'+Shopping.Cart.preordertimehh+'"]').attr("selected", "selected");
		//document.getElementById("preorderhh").selectedIndex = parseInt(Shopping.Cart.preordertimehh)+1;

		},

		addMinutes: function (time, minsToAdd) {
			function z(n){ return (n<10? '0':'') + n;};
			var bits = time.split(':');
			var mins = bits[0]*60 + +bits[1] + +minsToAdd;

			return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);  
		},

	MinuteCheck : function (c) {

		  	k = JSON.parse(Main.Preordercattime)
			var e = document.getElementById("preordermin");
			e.options.length = 0;
			e.options[e.options.length] = new Option("MM", "");

			opentime = k.menuonlyeach[0].openhour+':'+k.menuonlyeach[0].openmin
			opentime = Main.addMinutes(opentime,15)			
			var bits = opentime.split(':');
			


		if (bits[0] == c.value) { 
			if(bits[1] >=0 && bits[1] < 15 ) {
				
				//e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
				e.options[e.options.length] = new Option('30 min', '30');
				e.options[e.options.length] = new Option('45 min', '45');
			}
			else if(bits[1] >=15 && bits[1] < 30 ) {
				
				e.options[e.options.length] = new Option('30 min', '30');
				e.options[e.options.length] = new Option('45 min', '45');
			}
			else  if(bits[1] >=30 && bits[1] < 45) {
				
				e.options[e.options.length] = new Option('45 min', '45');
			}
			else  if(bits[1] >=45 && bits[1] <= 59) {
			
				//e.options[e.options.length] = new Option('00 min', '00');
			}
		}
		else if (k.menuonlyeach[0].closehour  == c.value) {
			
			if(k.menuonlyeach[0].closemin >16 && k.menuonlyeach[0].closemin < 31 ) {
				e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
			}
			else if(k.menuonlyeach[0].closemin >31 && k.menuonlyeach[0].closemin < 46) {
				
				e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
				e.options[e.options.length] = new Option('30 min', '30');
			}
			else  if(k.menuonlyeach[0].closemin >46 && k.menuonlyeach[0].closemin < 59) {
				
				e.options[e.options.length] = new Option('00 min', '00');
				e.options[e.options.length] = new Option('15 min', '15');
				e.options[e.options.length] = new Option('30 min', '30');
				e.options[e.options.length] = new Option('45 min', '45');
			}
			else{
				
				e.options[e.options.length] = new Option('00 min', '00');
			}
		  }
		  else {
			  	 e.options[e.options.length] = new Option('00 min', '00');
			     e.options[e.options.length] = new Option('15 min', '15');
				 e.options[e.options.length] = new Option('30 min', '30');
			     e.options[e.options.length] = new Option('45 min', '45');
			  }




		},
	Hourcheck: function (c)
    {
 //Time selection settings. 

 time_format="<?=$lang_resource['TIME_FORMAT']?>";


 Shopping.Cart.buyer.deliverydate = c.value;
 
	if(c.value== "ASAP") {
	  //$("#pickup_time").css("visibility","hidden");
	  $("#pickup_time").hide();

    }
	else
	{
		 //$("#pickup_time").css("visibility","visible");
		 $("#pickup_time").show();
		  $("#preordermin option:first").attr('selected','selected');

	}


	   if(c.value== "") {

		       var e = document.getElementById("preorderhh");
                e.options.length = 0;
                e.options[e.options.length] = new Option("", "HH");
		   return ;
		   }
	var  curdte =  c.value.split("-");
				
		       k = JSON.parse(Main.Preordercattime)


	            var e = document.getElementById("preorderhh");
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
			}
			else if(p==25 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("1AM", p);
			}
			else if(p==26 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("2AM", p);
			}
			else if(p==27 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("3AM", p);
			}
			else if(p==28 && p >= k.menuonlyeach[0].openhour && p <= k.menuonlyeach[0].closehour) {
		      e.options[e.options.length] = new Option("4AM", p);
			}


		}




	},
PreorderMain: function (e)
{

e = JSON.parse(e)
Main.Preordercattime  = JSON.stringify(e);


var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)


var week =0;


Forms.Clean("recover14");
Forms.Clean("recover14", "popupmainbuttonok");
var a= '<div class="wrapper">';

a += '<div class="option_popup_header"><h3><?=$lang_resource['CHOOSEDELTIMEPREORDER']?></h3>';
if(Main.RedirectToBusiness){
if(Main.MenulistEnter){
a += '<div class="option_popup_close"><button class="option_popup_close_btn" type="button" onclick="Popup.Close()">X</button></div>';
}else{
a += '<div class="option_popup_close"><button class="option_popup_close_btn" type="button" onclick="Main.HomeUrlCustom()">X</button></div>';
}
}else{
a += '<div class="option_popup_close"><button class="option_popup_close_btn" type="button" onclick="Popup.Close()">X</button></div>';
}

a += '</div>';



a += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl" style=" margin:0px 0px 0px 0px">';





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






a += '<tr>';
a += '<td align="left" colspan="2" style="padding: 10px 15px;"><span class="pop_label" style="width:100%;"><?=$lang_resource['PREORDERDATE']?>  </span></td>';
a += '</tr>';
a += '<tr>';
a += '<td align="left" colspan="2" style="padding: 10px 15px;">'+ Forms.CreateSelectPropertyPopup("recover14", "preorderdate", qs,"", true, "Main.Hourcheck(this)")+'</td>';
a += '</tr>';
a += '<tr>';
a += '<td align="left" colspan="2" style="padding: 10px 15px;"><span class="pop_label"><?=$lang_resource['PREORDERTIME']?>  </span></td>';
a += '</tr>';
a += '<tr>';
a += '<td align="left" class="waqar-tbl-left" style="padding: 10px 15px;">'+ Forms.CreateSelectPropertyPopup("recover14", "preorderhh", hhs,"", true,"Main.MinuteCheck(this)")+'</td>';
a += '<td align="left" class="waqar-tbl-right" style="padding: 10px 15px;">'+ Forms.CreateSelectPropertyPopup("recover14", "preordermin", mmp,"", true)+'</td>';
a += '</tr>';
a += '<tr>';
a += '<td align="center" colspan="2" style="padding: 10px 15px;"><button type="button" class="pop_submit_btn" onclick="Main.preorderActionWidget('+e.menuonlyeach[0].business+')"><?= $lang_resource['FRONT_MY_SUBMIT'] ?></button></td>';
a += '</tr>';




Forms.CreateValue("recover14", "businessid", e.menuonlyeach[0].business);

a += "</table>";
a += "</div>";


Main.Ga("/profile/recoverpwd");
Popup.Show(550, 300, a, function ()
{


}, function ()
{
Forms.Clean("recover14");
Main.Ga(Main.ActiveView)
})
},

preorderActionMob: function(e) {

	if(Forms.Form.recover14.fields.preorderdate.value == "") {
		alert("<?= $lang_resource['FRONT_SELECT_PREORDER_DATE'] ?>");
		return;

		}
	else if(Forms.Form.recover14.fields.preorderhh.value == "")	 {
		alert("<?= $lang_resource['FRONT_SELECT_PREORDER_TIME'] ?>");
		return;
		}
	else if(Forms.Form.recover14.fields.preordermin.value == "")	 {
		alert("<?= $lang_resource['FRONT_PREORDER_TIME_IN_MINUTE'] ?>");
		return;
		}
	 var b = new Date().getTime();
               Main.Aid = b;
                Main.Loading(true);
				var datep = Forms.Form.recover14.fields.preorderdate.value;
				var hhp = Forms.Form.recover14.fields.preorderhh.value;
				var mmp = Forms.Form.recover14.fields.preordermin.value;

			//var dd = Date.parse(datep);
			var dd = datep;
			dd = dd.replace("-","")
			dd = dd.replace("-","")

			if(viewDevice == "Mobile") {
				  Shopping.OpenPreorderBusiness(e,dd,Forms.Form.recover14.fields.preorderhh.value,Forms.Form.recover14.fields.preordermin.value);
			}else{
		 		 Shopping.OpenPreorderBusiness(e,dd,Forms.Form.recover14.fields.preorderhh.value,Forms.Form.recover14.fields.preordermin.value);
			}

	},


	preorderAction: function(e) {

		if(Forms.Form.recover14.fields.preorderdate.value == "") {
			$("#showpreorderwarning").empty().append("<?= $lang_resource['FRONT_SELECT_PREORDER_DATE'] ?>")
			$("#showpreorderwarning").show();
			//alert("<?= $lang_resource['FRONT_SELECT_PREORDER_DATE'] ?>");
			return
		}else if(Forms.Form.recover14.fields.preorderhh2.value == "")	 {
			$("#showpreorderwarning").empty().append("<?= $lang_resource['FRONT_SELECT_PREORDER_TIME'] ?>")
			$("#showpreorderwarning").show();
			//alert("<?= $lang_resource['FRONT_SELECT_PREORDER_TIME'] ?>");
			return
		}else if(Forms.Form.recover14.fields.preordermin2.value == "")	 {
			$("#showpreorderwarning").empty().append("<?= $lang_resource['FRONT_PREORDER_TIME_IN_MINUTE'] ?>")
			$("#showpreorderwarning").show();
			//alert("<?= $lang_resource['FRONT_PREORDER_TIME_IN_MINUTE'] ?>");
			return
		}else{
			Popup.Close();
			$("#showpreorderwarning").hide();
		}
		var b = new Date().getTime();
		Main.Aid = b;
		Main.Loading(true);
		var datep = Forms.Form.recover14.fields.preorderdate.value;
		var hhp = Forms.Form.recover14.fields.preorderhh2.value;
		var mmp = Forms.Form.recover14.fields.preordermin2.value;

		//var dd = Date.parse(datep);
		var dd = datep;
		dd = dd.replace("-","")
		dd = dd.replace("-","")
		
		Shopping.OpenPreorderBusiness(e,dd,Forms.Form.recover14.fields.preorderhh2.value,Forms.Form.recover14.fields.preordermin2.value);
	},

	preorderActionWidget: function(e) {

	if(Forms.Form.recover14.fields.preorderdate.value == "") {
		alert("<?= $lang_resource['FRONT_SELECT_PREORDER_DATE'] ?>");
		return;

		}
	else if(Forms.Form.recover14.fields.preorderhh.value == "")	 {
		alert("<?= $lang_resource['FRONT_SELECT_PREORDER_TIME'] ?>");
		return;
		}
	else if(Forms.Form.recover14.fields.preordermin.value == "")	 {
		alert("<?= $lang_resource['FRONT_PREORDER_TIME_IN_MINUTE'] ?>");
		return;
		}
	 var b = new Date().getTime();
               Main.Aid = b;
                Main.Loading(true);
				var datep = Forms.Form.recover14.fields.preorderdate.value;
				var hhp = Forms.Form.recover14.fields.preorderhh.value;
				var mmp = Forms.Form.recover14.fields.preordermin.value;

			//var dd = Date.parse(datep);
			var dd = datep;
			dd = dd.replace("-","")
			dd = dd.replace("-","")

			if(viewDevice == "Mobile") {
				  Shopping.OpenPreorderBusiness(e,dd,Forms.Form.recover14.fields.preorderhh.value,Forms.Form.recover14.fields.preordermin.value);
			}else{
		 		 Shopping.OpenPreorderBusiness(e,dd,Forms.Form.recover14.fields.preorderhh.value,Forms.Form.recover14.fields.preordermin.value);
			}

	},
	
PreorderMainB: function (e)
    {
		e = JSON.parse(e)


		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)


		var week =0;

		Forms.Clean("recover14");
		Forms.Clean("recover14", "popupmainbuttonok");
        var a = '<div class="titlebox nonselectable">';
        a += '<span class="title">&gt;&gt;<?=$lang_resource['CHOOSEDELTIMEPREORDER']?></span>';
        a += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        a += "</div>";
		a += '<div class="editform">';
        a += '<div class="leftcol lcolmenu" style="width:440px;">';


		var qs = new Array();
        qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PREORDERDATE']?>"}'));
		for(var cc =0;cc<dayschedule.length;cc++) {

        qs.push(JSON.parse('{"id":"'+dayschedulev[cc]+'","caption":"'+dayschedule[cc]+'"}'));
		}



			var hhp = new Array();
			 hhp.push(JSON.parse('{"id":"","caption":"HH"}'));

			var mmp = new Array();
			 mmp.push(JSON.parse('{"id":"","caption":"MM"}'));

		    a += '<div class="row" style=" padding:5px "><?=$lang_resource['PREORDERDATE']?> : </div>';
		   a +='<div class="row"> <div class="inputbox">'+ Forms.CreateSelectProperty("recover14", "preorderdate", qs,"", true, "Main.Hourcheck(this)")+'</div></div>';
				a += '<div class="row"  style=" padding: 5px "><?=$lang_resource['PREORDERTIME']?> : </div>';
		    a += '<div class="row"> <div class="inputbox" style="width:47%">' +  Forms.CreateSelectProperty7("recover14", "preorderhh", hhp, "", true,"Main.MinuteCheck(this)") + '</div>';

			a += '<div class="inputbox" style="width:47%"> ' +  Forms.CreateSelectProperty7("recover14", "preordermin", mmp, "", true) + "</div>";
			a += '</div>';
		    Forms.CreateValue("recover14", "businessid", e.menuonlyeach[0].business);

        a += "</div>";
        a += "</div>";


       Main.Ga("/profile/recoverpwd");
        Popup.Show(550, 300, a, function ()
        {
			  var b = new Date().getTime();
               Main.Aid = b;
                Main.Loading(true);
				var datep = Forms.Form.recover14.fields.preorderdate.value;
				var hhp = Forms.Form.recover14.fields.preorderhh.value;
				var mmp = Forms.Form.recover14.fields.preordermin.value;

			var dd = datep;


			BShopping.OpenPreorderBusiness(e.menuonlyeach[0].business,dd,Forms.Form.recover14.fields.preorderhh.value,Forms.Form.recover14.fields.preordermin.value);

        }, function ()
        {
            Forms.Clean("recover14");
            Main.Ga(Main.ActiveView)
        })
},

	PreOrderMenuCatalogFetch: function (d,pem) {

		$(window).scrollTop(200);

		var b = new Date().getTime();
		Main.Aid = b;
		Main.Loading();
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"pickupDeliverytime","businessid":' + d + '},{"operation":"timescdule","businessid":' + d + '},{"operation":"FetchBusinessOnlyMenu","businessid":' + d + ',"whereall":'+JSON.stringify(Main.WhereAmIData)+"}]", function (a){
			Main.Ready();			
			a = JSON.parse(a);
			Shopping.DeliveryDateschedule = a.times;
			Main.DeliveryTimezone = a.timescdule;
			
			a = JSON.stringify(a);
			
			if(viewDevice == "Mobile") {
				RestMenuList.PreOrderMenuCatalogFetchMob(a,d)
			}else{
				RestMenuList.PreOrderMenuCatalog(a,d,pem)
			}

		});
	},


convertTimeFormatTOAM: function(hour,mints){
		
		str='PM';
		if(hour<12){
			str='AM';
		}
		else if((hour>23) || (hour<29)){
			str='AM';
		}
		
		hour=parseInt(hour)%12;
		return time=Main.zeroPad((hour),2)+':'+Main.zeroPad((mints),2)+' '+str;

},
convertTimeHourFormatTOAM: function(hour,mints){
		
		str='PM';
		if(hour<12){
			str='AM';
		}
		else if((hour>23) || (hour<29)){
			str='AM';
		}
		
		hour=parseInt(hour)%12;
		return time=Main.zeroPad((hour),2)+' '+str;

},
	HomeUrl: function(){		
		window.location.href = '../';
	},
	AdminUrl: function(){		
		window.location.href = '../admin';
	},

	HomeUrlCustom: function(){
		Popup.Close();
		window.location.href = '../';
	},

PreOrderMenuCatalogFetchB: function (d) {
	 var b = new Date().getTime();
     Main.Aid = b;
     Main.Loading();
	 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenu","businessid":' + d + "}]", function (a)
       {
		   Main.Ready();

		 		  Main.PreOrderMenuCatalogB(a,d)

	  });
},
PreOrderMenuCatalogB: function (p,d) {

    	p = JSON.parse(p);
		var len = p.menuonly.length;
		var k='';
        var a = '<div class="titlebox nonselectable">';
        a += '<span class="title">&gt;&gt;<?=$lang_resource['MAIN_SHOPPING_MENU_CATALOG_POPUP']?></span>';
        a += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        a += "</div>";
		a += '<div class="editform">';
        a += '<div class="leftcol lcolmenu" style="width:440px;" id="showcatalogMenu">';
		a += '<div class="ordercatalogtimec"><?=$lang_resource['MAIN_SHOPPING_MENU_NO_SERVICE_AVAILABLE']?></div>'

		for(k=0;k<len;k++) {
		a += '<div class="ordercatalogtime hand" onclick="Main.PreorderMainfunB('+d+','+p.menuonly[k].id+')"><div style="text-align:center"  ><b>'+Main.TitleCase(p.menuonly[k].name)+'</b> ('+p.menuonly[k].opentime+'-'+p.menuonly[k].closetime+')</div><div style="text-align:center;font-size: 13px;margin: 10px 0;">['+p.menuonly[k].weekends+']</div></div>';

		}

        a += "</div>";
        a += "</div>";



       Main.Ga("/profile/recoverpwd");
        Popup.Show(550,(170*len+80), a, function ()
        {
			  var b = new Date().getTime();
               Main.Aid = b;
               Main.Loading();




        }, function ()
        {
			Main.Ready();
            window.location ="./";
            Main.Ga(Main.ActiveView)
        })
	},
PreOrderMenuCatalogFetchC: function (d) {
	 var b = new Date().getTime();
     Main.Aid = b;
     Main.Loading();
	 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenu","businessid":' + d + "}]", function (a)
       {
		   Main.Ready();
		   Main.PreOrderMenuCatalogC(a,d)
	  });
},
PreOrderMenuCatalogC: function (p,d) {

    	p = JSON.parse(p);
		var len = p.menuonly.length;
		var k='';
        var a = '<div class="titlebox nonselectable">';
        a += '<span class="title">&gt;&gt;<?=$lang_resource['MAIN_SHOPPING_MENU_CATALOG_POPUP']?></span>';
        a += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        a += "</div>";
		a += '<div class="editform">';
        a += '<div class="leftcol lcolmenu" style="width:440px;" id="showcatalogMenu">';

		for(k=0;k<len;k++) {
		a += '<div class="ordercatalogtime hand" onclick="Main.PreorderMainfunB('+d+','+p.menuonly[k].id+')"><div style="text-align:center"  ><b>'+Main.TitleCase(p.menuonly[k].name)+'</b> ('+p.menuonly[k].opentime+'-'+p.menuonly[k].closetime+')</div><div style="text-align:center;font-size: 13px;margin: 10px 0;">['+p.menuonly[k].weekends+']</div></div>';

		}

        a += "</div>";
        a += "</div>";



       Main.Ga("/profile/recoverpwd");
        Popup.Show(550,(170*len+80), a, function ()
        {
			  var b = new Date().getTime();
               Main.Aid = b;
               Main.Loading();




        }, function ()
        {
			Main.Ready();
            window.location ="./";
            Main.Ga(Main.ActiveView)
        })
	},
ChooseDeliverOptionGlobal: function ()
    {

		Forms.Clean("recover13", "popupmainbuttonok");
		if(viewDevice == "Desktop") {
       var   a = '<div class="popup_wrapper">'

			 a += '<div class="pop_header">'
			 a += '<div class="pop_heading"><h3><?=$lang_resource['Delivery_Option']?></div>'
			 a += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
			 a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>'
			 a += '</div>'
			 a += "</div>"

			 a += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">'

			 var qs = new Array();
			 qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PICKUP_DELIVERY']?>"}'));
			 if(Main.settingfront.tab_delivery != 'f'){
				 qs.push(JSON.parse('{"id":"delivery","caption":"<?=$lang_resource['DELIVERY']?>"}'));
			}
			if(Main.settingfront.tab_pickup != 'f'){
				 qs.push(JSON.parse('{"id":"pickup","caption":"<?=$lang_resource['PICKUP']?>"}'));
			}
			if(Main.settingfront.tab_reservation != 'f'){
				 qs.push(JSON.parse('{"id":"reservation","caption":"<?=$lang_resource['RESERVATION']?>"}'));
			}

			 a += '<tr>'
			 a += '<td align="center" colspan="2">' +  Forms.CreateSelectPropertyPopup("recover13", "deliveryoption", qs, "", true) + '</td>'
			 a += '</tr>'

			 a += '<tr>'
			 a += '<td align="center" colspan="2">&nbsp;</td>'
			 a += '</tr>'
			 a += '<tr id="showrestaurant"  >';
			a += '<td align="center" colspan="2"><button type="button" class="pop_submit_btn" style="width:250px;"  onclick="Main.GeolocationID()"><?=$lang_resource['SHOW_RESTAURANTS_V2']?></button></td>';
			a += '</tr>';
			 a += "</table>"

	}    else {

		 var   a = '<div class="popup_wrapper">';
		a += '<div class="pop_header">';
        a += '<div class="pop_heading"><h3><?=$lang_resource['Delivery_Option']?></div>';
	     a += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	 a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
         a += '</div>';
        a += "</div>";


		a += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';



		var qs = new Array();
        qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PICKUP_DELIVERY']?>"}'));
      	  if(Main.settingfront.tab_delivery != 'f'){
				 qs.push(JSON.parse('{"id":"delivery","caption":"<?=$lang_resource['DELIVERY']?>"}'));
			}
			if(Main.settingfront.tab_pickup != 'f'){
				 qs.push(JSON.parse('{"id":"pickup","caption":"<?=$lang_resource['PICKUP']?>"}'));
			}
			if(Main.settingfront.tab_reservation != 'f'){
				 qs.push(JSON.parse('{"id":"reservation","caption":"<?=$lang_resource['RESERVATION']?>"}'));
			}


	    a += '<tr>';
        a += '<td align="center" colspan="2">' +  Forms.CreateSelectPropertyPopup("recover13", "deliveryoption", qs, "", true) + '</td>';
        a += '</tr>';
		a += '<tr>';
        a += '<td align="center" colspan="2">&nbsp;</td>';
        a += '</tr>';
		  a += '<tr id="showrestaurant" >';
        a += '<td align="center" colspan="2"><button type="button" class="pop_submit_btn" style="width:250px;" onclick="Main.GeolocationID()"><?=$lang_resource['SHOW_RESTAURANTS_V2']?></button></td>';
        a += '</tr>';

        a += "</table>";

		}

        Popup.Show(440, 240, a, function ()
        {
			  var b = new Date().getTime();
               Main.Aid = b;
               Main.Loading(true);

			if(Forms.Form.recover13.fields.deliveryoption.value == "pickup")
			{
				  Main.Ready(true);
				Main.deliveryType ="pickup"
				Main.searchType ="Global"

				for (i in Main.Franchises)
        		{
					if (Main.Franchises[i].city.toUpperCase() ==  Main.WhereAmIData.googleCityName){
						Main.WhereAmIData.city = Main.Franchises[i].id;

					}

				}

				Forms.Clean("recover13");
			}
			else
			{
				  Main.Ready(true);
				Main.deliveryType ="delivery"
				Main.searchType ="Global"
				Main.Ready

				Forms.Clean("recover13");
			}


        }, function ()
        {
            Forms.Clean("recover13");
            Main.Ga(Main.ActiveView)
        })
},

GeolocationID: function(){
	
		var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
			
		/*if(Forms.Form.recover13.fields.deliveryoption.value == "pickup"){

		  Main.Ready(true);
		  Main.deliveryType ="pickup"
		  Main.searchType ="Global"
		  Main.WhereAmIData.reservestatus = 'pickup';
		  for (i in Main.Franchises){
			  if (Main.Franchises[i].city.toUpperCase() ==  Main.WhereAmIData.googleCityName){
  				Main.WhereAmIData.city = Main.Franchises[i].id;
			  }
		  }
			
		  Popup.Close();
		  Shopping.Start();
		  Forms.Clean("recover13");
		} */
		
		/*if(Forms.Form.recover13.fields.deliveryoption.value == "delivery"){*/
			Main.Ready(true);
			Main.deliveryType ="delivery"
			Main.searchType ="Global"
			Main.WhereAmIData.reservestatus = 'delivery';
			 for (i in Main.Franchises){
			  if (Main.Franchises[i].city.toUpperCase() ==  Main.WhereAmIData.googleCityName){
  				Main.WhereAmIData.city = Main.Franchises[i].id;
			  }
		  }
		//set direct link start
		var deliveryAccept = $("input[name=deliveryType]:checked").val();
		var custom_link = "<?=base64_encode('SearchBy')?>_";

		if(Forms.Form.whereami.fields.address.value) {
			if(Main.settingfront.tab_delivery_neighborhood == 't') {
			 custom_link += '';
			} else {
			 custom_link += '';		
				}
			
			}
			
			if(Main.WhereAmIData.cityname) {
			custom_link +=   "_"+Main.WhereAmIData.cityname.split(" ").join("-");
			}
		if(Main.WhereAmIData.country) {

			var con = Main.GetIndexOnPropertyValueFound(Main.Countries, "id", Main.WhereAmIData.country);
			custom_link +=   "_"+Main.Countries[con].name.split(" ").join("-");
			}
	
	
			custom_link +=   "_delivery";
		
			
				if(Main.WhereAmIData.location) {
			var locatserch = JSON.parse(Main.WhereAmIData.location)
				console.log(JSON.stringify(locatserch));
			custom_link +=   "_"+locatserch.latitud;
			custom_link +=   "_"+locatserch.longitud;
			if(locatserch.zipcode){
				custom_link +=   "_"+locatserch.zipcode;
			}else{
				 custom_link +=   "_-1";
			}
			
			custom_link +=   "_"+locatserch.zoom;
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1") {
			custom_link +=   "_"+$("select[id='address'").find('option:selected').val();
			  }else{
				  custom_link +=   "_-1";
			  }
			}
		
		 
	 custom_link +=   "_-1";

	 custom_link +=   "_-1";
	  
		  

   //alert(JSON.stringify(Forms.Form['whereami'].fields))
	if(Forms.Form.whereami.fields.businesstype){
		Main.WhereAmIData.businesstype = Forms.Form.whereami.fields.businesstype.value;
	}

	if(Main.WhereAmIData.businesstype){
		if(Main.WhereAmIData.businesstype == 'tab_food'){
			custom_link +=   "_b1"
			Main.WhereAmIData.businesstype = 'b1'
		}
		if(Main.WhereAmIData.businesstype == 'tab_alcohol'){
			custom_link +=   "_b2"
			Main.WhereAmIData.businesstype = 'b2'
		}
		if(Main.WhereAmIData.businesstype == 'tab_groceries'){
			custom_link +=   "_b3"
			Main.WhereAmIData.businesstype = 'b3'
		}
		if(Main.WhereAmIData.businesstype == 'tab_laundry'){
			custom_link +=   "_b4"
			Main.WhereAmIData.businesstype = 'b4'
		}		
	}

	 Main.searchlink = custom_link;

	window.history.pushState( {"id":100} , "Business list", custom_link );
		//cuisine end
		//set direct link end
	
		//  Popup.Close();
		  Shopping.Start1();
		 // Forms.Clean("recover13");
		/*}*/
		
		/*if(Forms.Form.recover13.fields.deliveryoption.value == "reservation"){
		  Main.Ready(true);
		  Main.WhereAmIData.reservation = true;
		  Main.deliveryType ="pickup"
		  Main.searchType ="Global"
		  Main.WhereAmIData.reservestatus = 'reservation';
		   for (i in Main.Franchises){
			if (Main.Franchises[i].city.toUpperCase() ==  Main.WhereAmIData.googleCityName){
			  Main.WhereAmIData.city = Main.Franchises[i].id;
			}
		}
		  Popup.Close();
		  Shopping.Start();
		  
		  Forms.Clean("recover13");
	  }*/
		
		/*else {
			Main.Ready(true);
			alert("<?= $lang_resource['FRONT_SELECT_DELIVERY_OPTION'] ?>");
			return ;
		}*/
	},
	CitySelectRegister: function (a, b)
    {
			//alert(a.value);
		var col = a.value;//document.getElementById("country").value;
        if (b)
        {
            Main.PopulateColonySelectRegister(col, b)
        }
        else
        {
            Main.PopulateColonySelectRegister(col)
        }
    },

	CountrySelectRegisterfromMap: function (a, b)
		{  
	
				var cntry = a;//document.getElementById("country").value;
		  
				Main.PopulateCitySelectRegisterMap(cntry, b);
						
		},
	
	CountrySelectRegisterfromMapid: function (a, b)
		{  
	
				var cntry = a;//document.getElementById("country").value;
		  
				Main.PopulateCitySelectRegister(cntry, b);
						
		},

    CountrySelectRegister: function (a, b)
    {
		
			
		var cntry = a.value;//document.getElementById("country").value;
        if (b)
        {
            Main.PopulateCitySelectRegister(cntry, b)
        }
        else
        {
            Main.PopulateCitySelectRegister(cntry)
        }
    },
    CountrySelected: function (a, b)
    {
		var cntry = a.value;//document.getElementById("country").value;
        if (b)
        {
            Main.PopulateCitySelect(cntry, b)
        }
        else
        {
            Main.PopulateCitySelect(cntry)
        }
    },
	PopulateAddressSelect:function (c, b, chk){
		
		
	    // Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a
		
		
		if((c=="") || (c==null))
		{
			c = document.getElementById("country").value;	
		}
		
		
		if((b=="") || (b==null))
		{
			b = document.getElementById("city").value;	
			
		}

		if(chk == 1){

			$('.address1').children().remove().end().append('<option value="" selected=""><?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?></option>') ;
		}
		
      
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllneighborhoodData","filters":[{"modifier":"neighborhood","name":"country","operator":"=","value":"' + c + '"},{"modifier":"neighborhood","name":"city","operator":"=","value":"' + b + '"}]}]', function (f)
        {

   
           // Main.Ready();
			  if (f != "")
            {
				
			  Main.neighborhood = JSON.parse(f).neighborhood;
				
				
				$('.address1').children().remove().end().append('<option value="" selected=""><?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?></option>') ;
		
				  for (var d in Main.neighborhood)
                {
					
					if(document.getElementById("address")) {
					$('.address1').append('<option value="'+ Main.neighborhood[d].id+'">'+ Main.neighborhood[d].name+'</option>');
					}
				 }
				  
				}
			 })
	},
	
	PopulateAddressSelect2:function (c, b, chk,colony){

		Main.Loading(true);
		var a = new Date().getTime();
		Main.Aid = a;

		if((c=="") || (c==null)){
			c = document.getElementById("countryregister").value;	
		}

		if((b=="") || (b==null)){
			b = document.getElementById("cityregister").value;	
		}

		if(chk == 1){
			$('.address2').html('<option value="" selected=""><?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?></option>');
		}

		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllneighborhoodData","filters":[{"modifier":"neighborhood","name":"country","operator":"=","value":"' + c + '"},{"modifier":"neighborhood","name":"city","operator":"=","value":"' + b + '"}]}]', function (f){

			Main.Ready(true);
			if (f != ""){
				Main.neighborhood = JSON.parse(f).neighborhood;
				var t = "";
				for (var d in Main.neighborhood){
					if((colony) && (colony==Main.neighborhood[d].id)){
						t = "selected";
					}
					$('.address2').append('<option value="'+ Main.neighborhood[d].id+'" '+t+'>'+ Main.neighborhood[d].name+'</option>');
					t = "";
				}
			}else{
				$('.address2').empty();
			}
		})
	},
	
	

    PopulateCitySelect: function (c, b){

	    //Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (f)
        {

            /*if (a != Main.Aid)
            {
                return
            }*/
           // Main.Ready();
            if (f != "")
            {
				
                Main.Franchises = JSON.parse(f).franchises;
				Main.Franchises.sort(Main.SortByProperty("city"));//sort city alphabitacaly
				
                var e = document.getElementById("city");
				
                e.options.length = 0;
                e.options[e.options.length] = new Option("<?= $lang_resource['CITY_V2'] ?>", "");
                var g = 0;
                var h = false;

				<!--For Multiple City Select-->
				var citytag = Main.settingfront.citytag.split(",");
				citytag = JSON.parse(citytag)
				var counter = 0;
				var countermatch = 0;
                for (var d in Main.Franchises)
                {

					if (b)
                    {
                        if (Main.Franchises[d].id == b)
                        {
                            g = d;
                            h = true
                        }
                    }

				 if($.inArray('-1', citytag ) != -1 || $.inArray(Main.Franchises[d].id, citytag ) != -1){
                    e.options[e.options.length] = new Option(Main.Franchises[d].city, Main.Franchises[d].id)
					if (b){
					if (Main.Franchises[d].id == b){
						countermatch = counter;
					}
					}
					counter ++;
				 }
                }

                if (b && h)
                {

					if(countermatch != g){
						g = countermatch;
					}
					
                    e.selectedIndex = parseInt(g) + 1

                }
                else
                {
                    Forms.Form[Main.ActiveForm].fields.city.value = "";
                    if (Forms.CanSave(Main.ActiveForm))
                    {
                        Forms.EnableSubmitButton(true)
                    }
                    else
                    {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
			
			if(Main.settingfront.tab_delivery_neighborhood == 't' || Main.neighborhood == 't'){ 
			if(document.getElementById("address")){
				
				if((c != "") && (document.getElementById("city").value != ""))
				{
			    Main.PopulateAddressSelect(c, document.getElementById("city").value );
				}
			}
			}

			if(document.getElementById("popuploadingbox")){
				$("#popuploadingbox").hide();
			}
        })

    },
 PopulateColonySelectRegister: function (c, b)
    {
//alert(b);
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
         $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllColonyData","filters":[{"modifier":"franchises","name":"colony","operator":"=","value":"' + c + '"}]}]', function (g){
			//alert(g);
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (g != "") {
                f = JSON.parse(g).franchises;
				//alert(JSON.stringify(f));
                var e = document.getElementById("colony");
                e.options.length = 0;
                e.options[e.options.length] = new Option("", "");
                var h = 0;
                var j = false;
                for (var d in f) {
                    if (b) {
                        if (f[d].id == b) {
                            h = d;
                            j = true
                        }
                    }
					//alert(JSON.stringify(f[d]));
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
				//alert(e.options[e.options.length]);
				//alert(b);alert(j);
                if (b && j) {
					
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.user.fields.colony.value = "";
                   
                }
            }
        })
		
	},
	PopulateCitySelectRegister: function (c, b)
    {

        Main.Loading(true);
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (f)
        {
			
            if (a != Main.Aid)
            {
                return
            }
            Main.Ready(true);
            if (f != "")
            {
                Main.Franchises = JSON.parse(f).franchises;
				Main.Franchises.sort(Main.SortByProperty("city")); //sort a to z
                var e = document.getElementById("cityregister");
                e.options.length = 0;
                e.options[e.options.length] = new Option("", "");
                var g = 0;
                var h = false;
				//console.log(b);
                for (var d in Main.Franchises)
                {
                    if (b)
                    {
                        if (Main.Franchises[d].id == b)
                        {
                            g = d;
                            h = true
                        }
                    }
                    e.options[e.options.length] = new Option(Main.Franchises[d].city, Main.Franchises[d].id)
                }
					//console.log(h);console.log(g);
                if (b && h)
                {
                    e.selectedIndex = parseInt(g) + 1
                }
                else
                {
                    Forms.Form[Main.ActiveForm].fields.cityregister.value = "";
                    if (Forms.CanSave(Main.ActiveForm))
                    {
                        Forms.EnableSubmitButton(true)
                    }
                    else
                    {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },
	
	PopulateCitySelectRegisterMap: function (c, b)
    {

        Main.Loading(true);
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (f)
        {

            if (a != Main.Aid)
            {
                return
            }
            Main.Ready(true);
            if (f != "")
            {
                Main.Franchises = JSON.parse(f).franchises;
                var e = document.getElementById("cityregister");
                e.options.length = 0;
                e.options[e.options.length] = new Option("", "");
                var g = 0;
                var h = false;
                for (var d in Main.Franchises)
                {
                    if (b)
                    {
                        if (Main.Franchises[d].id == b)
                        {
                            g = d;
                            h = true
                        }
                    }
                    e.options[e.options.length] = new Option(Main.Franchises[d].city, Main.Franchises[d].id)
                }
                if (b && h)
                {
                    e.selectedIndex = parseInt(g) + 1
                }
                else
                {
                    Forms.Form[Main.ActiveForm].fields.cityregister.value = "";
                    if (Forms.CanSave(Main.ActiveForm))
                    {
                        Forms.EnableSubmitButton(true)
                    }
                    else
                    {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },

	 WhereAmIDeliveryMob: function (c,options,comments,optionsid,total_price)
    {


        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
        var b = false;
        if (c)
        {
            Forms.Form.whereami.type = "modify";
			Forms.Form.whereami.options = options;
			Forms.Form.whereami.comments = comments;
			Forms.Form.whereami.optionsid = optionsid;
			Forms.Form.whereami.total_price = total_price;
            b = true
        }
        else
        {
            c = new Object();
            Forms.Form.whereami.type = "create"


        }
		 var d = new Array();
		var FF = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		 FF.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries)
		{
			//if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
				if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray("-1", countrytag ) != -1){

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

		if(counter == 0){
			
			
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
			  
		}
		if(Main.User){
					
					var a = new Object();
					a.id = "address";
					a.value = Main.User.street;
					GoogleMap.UpdateUserPosition(a);
				}


		if(Main.settingfront.tab_delivery_country == 't'){

			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)

		

			if(countrytag.length == 1 && $.inArray("-1", countrytag ) == -1){



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
			console.log(citytag)
			//console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){

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

			if(restaurant.length == 1 && $.inArray("-1", restaurant )  == -1){
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
		



	var htms = '<div class="popup_wrapper" >'
				htms += '<div class="pop_header">'
				htms += '<div class="pop_heading">'
				htms += '</div>'
				htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
				htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
				htms += '</div>'
				htms += '</div>'
	 			htms += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
			  htms += '<div class="reservpopBox wrapp">'
			  if(counter != 0){
				  htms +='<div class="field" '+co_f+'>';
						
				  htms += Forms.CreateSelectWhereAmIBoxCustomPopup("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
				  htms += '</div>'

				  htms +='<div class="field" '+ci_f+'>';
				  htms += Forms.CreateSelectWhereAmIBoxCustomPopup("whereami", "city",FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);Main.SetNCity(this);", true, "hand");


				  htms += '</div>'

if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
    htms +='<div class="field" '+add_f+'>';

				  htms += Forms.CreateTextWhereAmIBoxAddressCustomPopup("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx");
				  htms +='<button type="button" class="geo_btn2" style="background-color:#dcdcdc"  onclick="Main.GetUserLocation1()"><img src="images/homeimage/add-icon.png"></button>';
				  htms += '</div>'
				  
}


if(Main.settingfront.tab_delivery_address == 'f'){ 
				  var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
				  	 htms += '<div class="field" '+add_f1+'>'+ Forms.CreateSelectWhereAmIBoxNeighborhood("whereami", "address", cit1,c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx") +'</div>';
			
}
			  }else{
				  htms +='<div class="field">';

				  htms += Forms.CreateSelectWhereAmIBoxCustomPopup("whereami", "country", d,Main.NullToEmpty(Main.WhereAmIData.country), true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
				  htms += '</div>'

				  htms +='<div class="field">';
				  htms += Forms.CreateSelectWhereAmIBoxCustomPopup("whereami", "city",FF,Main.NullToEmpty(Main.WhereAmIData.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);Main.SetNCity(this);", true, "hand");


				  htms += '</div>'

				 if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
    htms +='<div class="field" '+add_f+'>';

				  htms += Forms.CreateTextWhereAmIBoxAddressCustomPopup("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx");
				  htms +='<button type="button" class="geo_btn2" style="background-color:#dcdcdc"  onclick="Main.GetUserLocation1()"><img src="images/homeimage/add-icon.png"></button>';
				  htms += '</div>'
				  
}


if(Main.settingfront.tab_delivery_address == 'f'){ 
				  var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
				  	 htms += '<div class="field" '+add_f1+'>'+ Forms.CreateSelectWhereAmIBoxNeighborhood("whereami", "address", cit1,c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx") +'</div>';
			
}
					 
				
			  }
			  htms += '<div id="mapbox" class="mediummapbox" style="width:100%"></div>';



			    htms +='<div class="field">';
			    htms +='<button type="submit" class="btn-red" style=" font-size:24px" onclick="Main.SaveWhereAmICustom()"><?= $lang_resource['CONTINUE'] ?></button>';

			  htms += '</div>'
							
			  htms += '</div>'
			  htms += '</div>'




		var popupSize = 745;
		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 640;
        Popup.Show(600, popupSize, htms, Main.SaveWhereAmICustom, null, Main.PreWhereAmI);
		
			if(Main.settingfront.tab_delivery_country == 'f'){
			
				//Main.PopulateCitySelect(Main.settingfront.default_country);
			
			

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
        if (b)
        {

        }
    },

	WhereAmIDelivery: function (c,options,comments,optionsid,total_price){

        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
        var b = false;
        if (c)
        {
            Forms.Form.whereami.type = "modify";
			Forms.Form.whereami.options = options;
			Forms.Form.whereami.comments = comments;
			Forms.Form.whereami.optionsid = optionsid;
			Forms.Form.whereami.total_price = total_price;
            b = true
        }
        else
        {
            c = new Object();
            Forms.Form.whereami.type = "create"


        }

        var htms = '<div class="wrapper">';
		htms += '<div class="option_popup_header"><h3><?=$lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I']?>';
		htms += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button></div>';
		htms += '</div>';

		 htms +='<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        var d = new Array();
		var FF = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		 FF.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries)
		{
			if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray("-1", countrytag )!= -1){
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

		if(counter == 0){
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
			  
		}


		if(Main.settingfront.tab_delivery_country == 't'){

			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)

			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && $.inArray("-1", countrytag )  == -1){



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
			//console.log(citytag)
			//console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){

				cic = citytag[0];
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' +cic+"}]", function (b){

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

			if(restaurant.length == 1 && $.inArray("-1", restaurant )  == -1){
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
		
		htms +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl" style="10px 0px 10px 0px">';
		if(counter != 0){
			
     	htms +=' <tr '+co_f+'>';
        htms +='<td colspan="2" align="left" style="margin-left:0px">'+ Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand"), "country")+'</td>';
      htms +='</tr>';

	    htms +=' <tr '+ci_f+'>';
        htms +='<td align="left" style="margin-left:0px" colspan="2">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "city", FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand"), "city")+'</td>';
      	htms +='</tr>';
	    htms +=' <tr '+add_f1+'>';
 var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup1("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"));
      htms +='</tr>';
	   htms +=' <tr '+add_f+'>'; 

        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInputTextbox(Forms.CreateinputTextAddressPopup("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"));
		htms +='</td>';
		
        htms +='</tr>';
		
		
		
		}else{
     htms +=' <tr '+co_f+'>';

        htms +='<td colspan="2" align="left" style="margin-left:0px">'+ Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "country", d,Main.NullToEmpty(Main.WhereAmIData.country), true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand"), "country")+'</td>';
      htms +='</tr>';

	    htms +=' <tr '+ci_f+'>';
        htms +='<td align="left" style="margin-left:0px" colspan="2">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "city", FF,Main.NullToEmpty(Main.WhereAmIData.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand"), "city")+'</td>';
      htms +='</tr>';
	   htms +=' <tr '+add_f1+'>';
 var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup1("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this);Main.SetNCity(this);", true, "hm_txtbx"))+'</td>';
      htms +='</tr>';
	   htms +=' <tr '+add_f+'>'; 
htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInputTextbox(Forms.CreateinputTextAddressPopup("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"));
		htms +='</td>';
        htms +='</tr>';
		
		
		
		}

	   htms +=' <tr>';
        htms +='<td colspan="2"><div id="mapbox" class="mediummapbox" style="width:100%"></div></td>';
      htms +='</tr>';




	  htms +=' <tr>';
        htms +='<td colspan="2">&nbsp;</td>';
      htms +='</tr>';
	  htms +=' <tr>';
        htms +='<td colspan="2" align="center"><button type="button" class="pop_submit_btn" onclick="Main.SaveWhereAmICustom()"><?= $lang_resource['CONTINUE'] ?></button></td>';
      htms +='</tr>';

    htms +='</table>';




		var popupSize = 745;
		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 640;
		Popup.Show(600, popupSize, htms, Main.SaveWhereAmICustom, function ()
                {

                }, function ()
                {
				 AutoPop.Main();
				Main.PreWhereAmI();


					  if(Main.WhereAmIData.country){
					  Main.PopulateCitySelect(Main.WhereAmIData.country,Main.WhereAmIData.city)
					 }
                })

			if(Main.settingfront.tab_delivery_country == 'f'){
			
				Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
			
			

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

        if (b)
        {


        }
    },
	
	
	SetNCity: function(c)
	{
		Main.WhereAmIData.city = c.value;
		
	},
	
	
	
	 WhereAmIDeliveryOfCity: function (c)
    {
		
        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";

        Forms.Form.whereami.whereami = c;
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

		var htms = '<div class="popup_wrapper">';
		htms += '<div class="pop_header">';
        htms += '<div class="pop_heading"><h3><?= $lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I'] ?></h3></div>';
        htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        htms += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
        htms += '</div>';
        htms += "</div>";

        var d = new Array();
		var FF = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		 FF.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });


	    var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries)
		{
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

			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
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
			//console.log(citytag)
			//console.log(citytag.indexOf('-1'))
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
		
			
		htms +='<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl" style=" margin:0px 0px 0px 12px">';
		if(counter != 0){
     	htms +=' <tr '+co_f+'>';
        htms +='<td colspan="2" align="left" style="margin-left:0px">'+ Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand"), "country")+'</td>';
      htms +='</tr>';

	    htms +=' <tr '+ci_f+'>';
        htms +='<td align="left" style="margin-left:0px" colspan="2">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "city", FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand"), "city")+'</td>';
      	htms +='</tr>';
	    htms +=' <tr '+add_f+'>';

        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInput(Forms.CreateinputTextAddressPopup("whereami", "address", '', false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"))+'<button type="button" class="geo_btn" style="background-color:#dcdcdc; height:44px !important;  border-radius:0 4px 4px 0;"  onclick="Main.GetUserLocationFromCitySearch()"><img src="images/homeimage/add-icon.png"></button></td>';
        htms +='</tr>';
		 var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
		 htms +=' <tr '+add_f1+'>';

        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup1("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"))+'</td>';
		
        htms +='</tr>';
		}else{
		htms +=' <tr >';
        htms +='<td colspan="2" align="left" style="margin-left:0px">'+ Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "country", d,Main.NullToEmpty(Main.WhereAmIData.country), true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand"), "country")+'</td>';
        htms +='</tr>';

	    htms +=' <tr >';
        htms +='<td align="left" style="margin-left:0px" colspan="2">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup("whereami", "city", FF,Main.NullToEmpty(Main.WhereAmIData.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand"), "city")+'</td>';
      	htms +='</tr>';
		 var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
	    htms +=' <tr '+add_f+' >';

        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInputTextboxCitySearch(Forms.CreateinputTextAddressPopup("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"))+'</td>';
        htms +='</tr>';
		 htms +=' <tr '+add_f1+'>';

        htms +='<td colspan="2" align="left" style="margin-left:0px">'+Visuals.CreateBigTagInput(Forms.CreateSelectProperty2Popup1("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx"))+'</td>';
		
        htms +='</tr>';

		}
	   htms +=' <tr>';
       htms +='<td colspan="2"><div id="mapbox" class="mediummapbox" style="width:100%"></div></td>';
       htms +='</tr>';
	   htms +=' <tr>';
       htms +='<td colspan="2">&nbsp;</td>';
       htms +='</tr>';
	   htms +=' <tr>';
       htms +='<td colspan="2" align="center"><button type="button" class="pop_submit_btn" style="width:300px;" onclick="Main.SaveWhereAmICustomOfCity()"><?= $lang_resource['CONTINUE'] ?></button></td>';
      htms +='</tr>';

    htms +='</table>';
		var popupSize = 745;
		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 640;
        Popup.Show(600, popupSize, htms, Main.SaveWhereAmICustomOfCity, null, Main.PreWhereAmI);

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

        if (b)
        {

            Forms.Form.whereami.fields.city.save = true;
            if(IS_PAYPAL_ENABLED != 1)
				Forms.Form.whereami.fields.address.save = true;
            Forms.Form.whereami.fields.location.save = true;
            if (Main.WhereAmIData.country && Main.WhereAmIData.city)
            {
                Main.CountrySelected(document.getElementById("country"), Main.WhereAmIData.city)
            }
        }
    },
	WhereAmIDeliveryOfCityMob: function (c)
    {
        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";

        Forms.Form.whereami.whereami = c;
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

        var d = new Array();
		var FF = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		 FF.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });

         var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries)
		{
			if( $.inArray(Main.Countries[i].id, countrytag )  != -1 || $.inArray('-1', countrytag )  != -1){
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

			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)

			if(countrytag.length == 1 && $.inArray('-1', countrytag )== -1){



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
			//console.log(citytag)
			//console.log(citytag.indexOf('-1'))
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

			if(restaurant.length == 1 && $.inArray("-1", restaurant ) == -1){
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
		

	var htms = '<div class="popup_wrapper" >'
				htms += '<div class="pop_header">'
				htms += '<div class="pop_heading">'
				htms += '</div>'
				htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
				htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
				htms += '</div>'
				htms += '</div>'
	 			htms += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
			  htms += '<div class="reservpopBox wrapp">'
			  
			if(counter != 0){
			  htms +='<div class="field" '+co_f+'>';

			  htms += Forms.CreateSelectWhereAmIBox("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			  htms += '</div>'

			  htms +='<div class="field" '+ci_f+'>';
			  htms += Forms.CreateSelectWhereAmIBox("whereami", "city",FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");


			  htms += '</div>'

			  htms +='<div class="field" '+add_f+'>';

			  htms += Forms.CreateTextWhereAmIBoxAddress("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx");
			  htms +='<button type="button" class="geo_btn"  onclick="Main.GetUserLocationFromCitySearch()"><img src="images/homeimage/add-icon.png"></button>';
			  htms += '</div>'
			   var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
			    htms +='<div class="field" '+add_f1+'>';

			  htms += Forms.CreateSelectWhereAmIBoxNeighborhood("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this)", true);
			
			  htms += '</div>'
					 
			}else{
			  htms +='<div class="field">';

			  htms += Forms.CreateSelectWhereAmIBox("whereami", "country", d,Main.WhereAmIData.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			  htms += '</div>'

			  htms +='<div class="field">';
			  htms += Forms.CreateSelectWhereAmIBox("whereami", "city",FF,Main.WhereAmIData.city, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");


			  htms += '</div>'

			  htms +='<div class="field"  '+add_f+'>';

			  htms += Forms.CreateTextWhereAmIBoxAddress("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx");
			  htms +='<button type="button" class="geo_btn" style="background-color:#dcdcdc"  onclick="Main.GetUserLocationFromCitySearch()"><img src="images/homeimage/add-icon.png"></button>';
			  htms += '</div>'
			   var cit1 = new Array();
					cit1.push(
					{
					id: "",
					caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
					});
			    htms +='<div class="field" '+add_f1+'>';

			  htms += Forms.CreateSelectWhereAmIBoxNeighborhood("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this)", true);
			
			  htms += '</div>'
			}

			  htms += '<div id="mapbox" class="mediummapbox" style="width:100%"></div>';





			    htms +='<div class="field">';
			    htms +='<button type="submit" class="btn-red" style=" font-size:24px;height: 48px;" onclick="Main.SaveWhereAmICustomOfCity()"><?= $lang_resource['CONTINUE'] ?></button>';

			  htms += '</div>'

			  htms += '</div>'
			  htms += '</div>'


		var popupSize = 745;
		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 640;


  	Popup.Show(600, popupSize, htms, Main.SaveWhereAmICustomOfCity, null, Main.PreWhereAmI);


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
      if (b)
        {

            Forms.Form.whereami.fields.city.save = true;
            if(IS_PAYPAL_ENABLED != 1)
				Forms.Form.whereami.fields.address.save = true;
            Forms.Form.whereami.fields.location.save = true;
            if (Main.WhereAmIData.country && Main.WhereAmIData.city)
            {
                Main.CountrySelected(document.getElementById("country"), Main.WhereAmIData.city)
            }
        }
    },

    PreWhereAmI: function ()
    {
		if(Forms.Form.whereami.whereami) {
          var b = Forms.Form.whereami.whereami;
		}
		else {
			b = new Object()
			
			}
        var a;
        if (b == null)
        {
            b = new Object()
        }
        Forms.CreateValue("whereami", "location", b.location);
        
        if (b.location == "" || b.location == null)
        {
			//alert(Main.latt1);
			//alert(Main.long1);
            a = new Object();
            a.latitud = Main.latt1;
            a.longitud = Main.long1;
            a.zoom = 11
        }
        else
        {
            a = JSON.parse(b.location)
        }

        GoogleMap.Init("mapbox", a.latitud, a.longitud, a.zoom, Main.WhereAmILocationUpdated)

    },
    PreWhereAmIInner: function ()
    {
		if(Forms.Form.whereami.whereami) {
          var b = Forms.Form.whereami.whereami;
		}
		else {
			b = new Object()
			
			}
        var a;
        if (b == null)
        {
            b = new Object()
        }
        Forms.CreateValue("whereami", "location", b.location);
        
        if (b.location == "" || b.location == null)
        {
			//alert(Main.latt1);
			//alert(Main.long1);
            a = new Object();
            a.latitud = Main.latt1;
            a.longitud = Main.long1;
            a.zoom = 11
        }
        else
        {
            a = JSON.parse(b.location)
        }
		$('#mymodal').on('shown.bs.modal', function(){
        GoogleMap.Init("mapbox", a.latitud, a.longitud, a.zoom, Main.WhereAmILocationUpdated)
		});
    },
    WhereAmILocationUpdated: function (a)
    {
        Forms.UpdateValue("whereami", "location", JSON.stringify(a), true);
        if (Forms.CanSave("whereami"))
        {
            Forms.EnableSubmitButton(true)
        }
        else
        {
            Forms.EnableSubmitButton(false)
        }
    },
    SaveWhereAmICity: function (){
		Main.Loading();
		document.getElementById("citychoose").style.display = "none";
		var deliveryAccept = $("input[name=deliveryType]:checked").val()
		if(Main.settingfront.tab_delivery_country == 'f'){
			Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;	
		}else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray("-1", countrytag ) == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}

			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && $.inArray("-1", citytag )  == -1 ){				
				Forms.Form['whereami'].fields['city'].value = citytag[0];				
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}	

		if(Main.settingfront.tab_delivery_city == 'f'){
			Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;			
		}else{
			Forms.Form['whereami'].fields['city'].value	= document.getElementById("city").value;
		}

		if(Main.customwhereami){
			Forms.Form['whereami'].fields['country'].save = true
			Forms.Form['whereami'].fields['city'].save = true
			Forms.Form['whereami'].fields['address'].save = true
		}


		if (Forms.CanSave("whereami") == false){
			Main.Ready();
			swal("Error","<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>","error");
			return
		}

		if(deliveryAccept== undefined){
			Main.Ready();
			swal("Error","<?= $lang_resource['ALERT_PICKUP_DELIVERY'] ?>","error");
			return
		}	

		Main.WhereAmIData = new Object();
		Main.WhereAmIData.country = Forms.Form.whereami.fields.country.value;
		Main.WhereAmIData.city = Forms.Form.whereami.fields.city.value;
		Main.WhereAmIData.delivery_neighborhoodStaus =  0; 		

		if(Main.Franchises){
			var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
			Main.WhereAmIData.currency = Main.Franchises[a].currency;
			Main.WhereAmIData.ga = Main.Franchises[a].ga;
			Main.WhereAmIData.cityname = Main.Franchises[a].city;
		} else {
			var a = 0;
			Main.WhereAmIData.currency = Main.FranchisesOnlyForZip[a].currency;
			Main.WhereAmIData.ga = Main.FranchisesOnlyForZip[a].ga;
			Main.WhereAmIData.cityname = Main.FranchisesOnlyForZip[a].city;	
		}

		if(deliveryAccept == "1"){
			Main.WhereAmIData.collecttype = "delivery"
			Main.deliveryType="delivery";
			Main.WhereAmIData.reservestatus = "delivery"
			Main.searchType ="Ordinary";

			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
			Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
			if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
				var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
				var arrcuisines = Array();
				for(var x in parsedcuisines){
					arrcuisines.push(parsedcuisines[x].split(","));
				}
				arrcuisines = arrcuisines.join();
				arrcuisines = arrcuisines.split(",")
				Main.WhereAmIData.cuisines = JSON.stringify(arrcuisines);
			}else{
				Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			}
			Main.WhereAmIData.rhour = -1;
			Main.WhereAmIData.rmin = -1;
		}
		if(deliveryAccept == "2"){
			Main.WhereAmIData.collecttype = "pickup"
			Main.deliveryType="pickup";
			Main.WhereAmIData.reservestatus = "pickup"
			Main.searchType ="Ordinary";
			if(document.getElementById("address"))
				Main.WhereAmIData.address = document.getElementById("address").value;// Forms.Form.whereami.fields.address.value;
			else
				Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;

			Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
			if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
				var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
				var arrcuisines = Array();
				for(var x in parsedcuisines){
					arrcuisines.push(parsedcuisines[x].split(","));
				}
				arrcuisines = arrcuisines.join();
				arrcuisines = arrcuisines.split(",")
				Main.WhereAmIData.cuisines = JSON.stringify(arrcuisines);
			}else{
				Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			}
			Main.WhereAmIData.rhour = -1;
			Main.WhereAmIData.rmin = -1;
		}

		if(deliveryAccept == "3"){
			Main.WhereAmIData.collecttype = "pickup"
			Main.deliveryType="pickup";
			Main.searchType ="Ordinary";
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1" ) {
				Main.WhereAmIData.address = Main.neibourGlobaltext;
			}else {
				Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;		
			}
			Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
			if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
				var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
				var arrcuisines = Array();
				for(var x in parsedcuisines){
					arrcuisines.push(parsedcuisines[x].split(","));
				}
				arrcuisines = arrcuisines.join();
				arrcuisines = arrcuisines.split(",")
				Main.WhereAmIData.cuisines = JSON.stringify(arrcuisines);
			}else{
				Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			}
		}

		Main.WhereAmIData.location = Forms.Form.whereami.fields.location.value;
		Main.WhereAmIData.approved = true;
		var custom_link = "<?=base64_encode('SearchBy')?>_";
		/*if(Forms.Form.whereami.fields.address) {
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1") {
				custom_link += Main.neibourGlobaltext.split(" ").join("-");
			} else {
				custom_link += Forms.Form.whereami.fields.address.value.split(" ").join("-");		
			}
		}*/	
		if(Main.WhereAmIData.cityname) {
			custom_link +=   "_"+Main.WhereAmIData.cityname.split(" ").join("-");
		}
		if(Main.WhereAmIData.country) {
			var con = Main.GetIndexOnPropertyValueFound(Main.Countries, "id", Main.WhereAmIData.country);
			custom_link +=   "_"+Main.Countries[con].name.split(" ").join("-");
		}	 
		if(deliveryAccept == "1"){			 
			/*if(Main.settingfront.tab_delivery_neighborhood == 't') {	
				custom_link +=   "_neighbours";		
			} else {*/
				custom_link +=   "_delivery";
			/* */
		}else {
			custom_link +=   "_pickup";
		}

		if(Forms.Form.whereami.fields.location.value) {
			var locatserch = JSON.parse(Forms.Form.whereami.fields.location.value)
			custom_link +=   "_"+locatserch.latitud;
			custom_link +=   "_"+locatserch.longitud;
			custom_link +=   "_"+locatserch.zipcode;
			custom_link +=   "_"+locatserch.zoom;
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1") {
				custom_link +=   "_"+Main.neibourGlobalid;
			}else{
				custom_link +=   "_-1";
			}
		}
		Main.searchlink = custom_link;		

		//resturants start
		var resturantsstr ='';
		if(Forms.Form.whereami.fields.resturants.value.trim()!=''){
			var parsedresturants = JSON.parse(Forms.Form.whereami.fields.resturants.value);
			var arrresturants = [];
			for(var x in parsedresturants){
				arrresturants.push(parsedresturants[x]);
			}
			resturantsstr = arrresturants.join(); 
		}
		console.log(JSON.stringify(resturantsstr));

		if(resturantsstr.trim()==''){
			custom_link +=   "_-1";
		}else{
			custom_link +=   "_"+resturantsstr.trim();
		}
		//resturants end

		//cuisine start
		var cuisinesstr ='';
		if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
			var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
			var arrcuisines = [];
			for(var x in parsedcuisines){
				arrcuisines.push(parsedcuisines[x]);
			}
			cuisinesstr = arrcuisines.join(); 
		}
		
		if(cuisinesstr.trim()==''){
			custom_link +=   "_-1";
		}else{
			custom_link +=   "_"+cuisinesstr.trim();
		}

		Main.Loading();

		//cuisine end


		if(deliveryAccept == 1){
			Main.Ready();
			$("#top").html("");
			window.history.pushState( {"id":100} , "Business list", custom_link );
			Shopping.Start1();
			Popup.Close();
			Forms.Clean("whereami");

			$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){			
				Main.Ready();		
				window.history.pushState( {"id":100} , "Business list", custom_link );	           
			});		
		}else{			
			$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){			
				Main.Ready();		
				window.history.pushState( {"id":100} , "Business list", custom_link );
			});
			if(locatserch.zipcode){
				Main.WhereAmIData.zipcode = locatserch.zipcode
			}
			Main.Ready();
			$("#top").html("");
			window.history.pushState( {"id":100} , "Business list", custom_link );
			Shopping.Start1();
			Popup.Close();
			Forms.Clean("whereami");
		}       
		GoogleMap.Clean();
		Main.RedirectToBusiness = null
	},

	SaveWhereAmI: function (val){
		if(val){
			if(Forms.Form.whereami.fields.address.value == ""){
				Main.Ready();
				alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
            	return
			}
		}
		
		if(Main.Gibberish=='t')
		{
		if(Main.ActiveSearch == 1){
			swal("Error","<?= $lang_resource['LOGIN_AUTOLOCATION_ALERT'] ?>","error");
			return
		}
		}
		Main.Loading();
		document.getElementById("citychoose").style.display = "none";
		var deliveryAccept = $("input[name=deliveryType]:checked").val()
		
		                   
		if(Main.settingfront.tab_delivery_country == 'f'){
			Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;	
		}else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray("-1", countrytag ) == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}

			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && $.inArray("-1", citytag )  == -1 ){				
				Forms.Form['whereami'].fields['city'].value = citytag[0];				
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}	

		if(Main.settingfront.tab_delivery_city == 'f'){
			Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;			
		}else{
			Forms.Form['whereami'].fields['city'].value	= document.getElementById("city").value;
		}

		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.cityname;
			GoogleMap.UpdateUserPosition(a);
		}

		if(Main.settingfront.tab_delivery_address == 'f' && deliveryAccept == 1 && Main.settingfront.tab_delivery_neighborhood == 'f' ){
			Forms.Form['whereami'].fields['address'].value = Main.settingfront.city_name_default;
 			var a = new Object();
			a.id = "address";
			a.value = Main.settingfront.city_name_default;
			GoogleMap.UpdateUserPosition(a);
		}else{			

			if(deliveryAccept == 1){
				if(Main.neibourGlobalid){			
					Forms.Form['whereami'].fields['address'].value = Main.neibourGlobalid;
				}else{
					Forms.Form['whereami'].fields['address'].value = document.getElementById("address").value;
				}
			}

		}
		
	 	
			 

		if(Main.customwhereami){
			Forms.Form['whereami'].fields['country'].save = true
			Forms.Form['whereami'].fields['city'].save = true
			Forms.Form['whereami'].fields['address'].save = true
		}

		
        if (Forms.CanSave("whereami") == false){
			Main.Ready();
			swal("Error","<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>","error");
            return
        }

		if(deliveryAccept== undefined){
			Main.Ready();
			swal("Error","<?= $lang_resource['ALERT_PICKUP_DELIVERY'] ?>","error");
            return
		}
		else if(deliveryAccept== 1 && Forms.Form.whereami.fields.address.value == ""){
			Main.Ready();
			swal("Error","<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>","error");
            return
		}

		
		Main.WhereAmIData = new Object();
        Main.WhereAmIData.country = Forms.Form.whereami.fields.country.value;
        Main.WhereAmIData.city = Forms.Form.whereami.fields.city.value;

		if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1" ) {			
			Main.WhereAmIData.delivery_neighborhoodStaus =  1; 
			Main.WhereAmIData.delivery_neighborhood =  Main.neibourGlobaltext;
			Main.WhereAmIData.delivery_neighborhoodid =  Main.neibourGlobalid;
		}else{				
			Main.WhereAmIData.delivery_neighborhoodStaus =  0; 		
		}

		if(Main.Franchises){
	        var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
			Main.WhereAmIData.currency = Main.Franchises[a].currency;
	        Main.WhereAmIData.ga = Main.Franchises[a].ga;
	        Main.WhereAmIData.cityname = Main.Franchises[a].city;
		} else {
		 	var a = 0;
		    Main.WhereAmIData.currency = Main.FranchisesOnlyForZip[a].currency;
	        Main.WhereAmIData.ga = Main.FranchisesOnlyForZip[a].ga;
	        Main.WhereAmIData.cityname = Main.FranchisesOnlyForZip[a].city;	
		}
 
		if(deliveryAccept == "1"){
			Main.WhereAmIData.collecttype = "delivery"
			Main.deliveryType="delivery";
			Main.WhereAmIData.reservestatus = "delivery"
			Main.searchType ="Ordinary";

			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	if(Forms.Form.whereami.fields.businesstype){
	    		Main.WhereAmIData.businesstype = Forms.Form.whereami.fields.businesstype.value;
	    	}

	    	if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
				var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
				var arrcuisines = Array();
				for(var x in parsedcuisines){
				  arrcuisines.push(parsedcuisines[x].split(","));
				}
				arrcuisines = arrcuisines.join();
				arrcuisines = arrcuisines.split(",")
				Main.WhereAmIData.cuisines = JSON.stringify(arrcuisines);
			}else{
				Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			}
			Main.WhereAmIData.rhour = -1;
        	Main.WhereAmIData.rmin = -1;
		}
		if(deliveryAccept == "2"){

			Main.WhereAmIData.collecttype = "pickup"
			Main.deliveryType="pickup";
			Main.WhereAmIData.reservestatus = "pickup"
			Main.searchType ="Ordinary";
			if(document.getElementById("address"))
			Main.WhereAmIData.address = document.getElementById("address").value;// Forms.Form.whereami.fields.address.value;
			else
			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
			
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	if(Forms.Form.whereami.fields.businesstype){
	    		Main.WhereAmIData.businesstype = Forms.Form.whereami.fields.businesstype.value;
	    	}

	    	if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
				var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
				var arrcuisines = Array();
				for(var x in parsedcuisines){
				  arrcuisines.push(parsedcuisines[x].split(","));
				}
				arrcuisines = arrcuisines.join();
				arrcuisines = arrcuisines.split(",")
				Main.WhereAmIData.cuisines = JSON.stringify(arrcuisines);
			}else{
				Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			}
			Main.WhereAmIData.rhour = -1;
       		Main.WhereAmIData.rmin = -1;
		}

		if(deliveryAccept == "3"){

			Main.WhereAmIData.collecttype = "pickup"
			Main.deliveryType="pickup";
			Main.searchType ="Ordinary";
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1" ) {
				Main.WhereAmIData.address = Main.neibourGlobaltext;
			}else {
				Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;		
			}
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
				var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
				var arrcuisines = Array();
				for(var x in parsedcuisines){
				  arrcuisines.push(parsedcuisines[x].split(","));
				}
				arrcuisines = arrcuisines.join();
				arrcuisines = arrcuisines.split(",")
				Main.WhereAmIData.cuisines = JSON.stringify(arrcuisines);
			}else{
				Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;
			}
		}
	 
        Main.WhereAmIData.location = Forms.Form.whereami.fields.location.value;
        Main.WhereAmIData.approved = true;
		var custom_link = "<?=base64_encode('SearchBy')?>_";
		if(Forms.Form.whereami.fields.address) {
			
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1") {
				custom_link += Main.neibourGlobaltext.split(" ").join("-");
			} else {
				custom_link += Forms.Form.whereami.fields.address.value.split(" ").join("-");		
			}
		}	
		if(Main.WhereAmIData.cityname) {
			custom_link +=   "_"+Main.WhereAmIData.cityname.split(" ").join("-");
		}
		if(Main.WhereAmIData.country) {
			var con = Main.GetIndexOnPropertyValueFound(Main.Countries, "id", Main.WhereAmIData.country);
			custom_link +=   "_"+Main.Countries[con].name.split(" ").join("-");
		}	 
		if(deliveryAccept == "1"){			 
			if(Main.settingfront.tab_delivery_neighborhood == 't') {	
				custom_link +=   "_neighbours";		
			} else {
				custom_link +=   "_delivery";
			}
		}else {
			custom_link +=   "_pickup";
		}
		

		if(Forms.Form.whereami.fields.location.value) {
			var locatserch = JSON.parse(Forms.Form.whereami.fields.location.value)

			custom_link +=   "_"+locatserch.latitud;
			custom_link +=   "_"+locatserch.longitud;
			custom_link +=   "_"+locatserch.zipcode;
			custom_link +=   "_"+locatserch.zoom;
			if(Main.settingfront.tab_delivery_neighborhood == 't' && deliveryAccept == "1") {
				custom_link +=   "_"+Main.neibourGlobalid;
			}else{
				custom_link +=   "_-1";
			}
		}

       	
		
		//resturants start
		var resturantsstr ='';
		if(Forms.Form.whereami.fields.resturants.value.trim()!=''){
		var parsedresturants = JSON.parse(Forms.Form.whereami.fields.resturants.value);
		var arrresturants = [];
			for(var x in parsedresturants){
				arrresturants.push(parsedresturants[x]);
			}
				resturantsstr = arrresturants.join(); 
		}
		console.log(JSON.stringify(resturantsstr));

		if(resturantsstr.trim()==''){
			 custom_link +=   "_-1";
		}else{
			 custom_link +=   "_"+resturantsstr.trim();
		}

		//resturants end
		//cuisine start
		var cuisinesstr ='';
		if(Forms.Form.whereami.fields.cuisines.value.trim()!=''){
		var parsedcuisines = JSON.parse(Forms.Form.whereami.fields.cuisines.value);
		var arrcuisines = [];

			for(var x in parsedcuisines){
			  arrcuisines.push(parsedcuisines[x]);
			}
			 cuisinesstr = arrcuisines.join(); 
		}

//console.log(JSON.stringify(cuisinesstr));
if(cuisinesstr.trim()==''){
	 custom_link +=   "_-1";
}else{
	 custom_link +=   "_"+cuisinesstr.trim();
}



	if(Main.WhereAmIData.businesstype){
		if(Main.WhereAmIData.businesstype == 'tab_food'){
			custom_link +=   "_b1"
			Main.WhereAmIData.businesstype = 'b1'
		}
		if(Main.WhereAmIData.businesstype == 'tab_alcohol'){
			custom_link +=   "_b2"
			Main.WhereAmIData.businesstype = 'b2'
		}
		if(Main.WhereAmIData.businesstype == 'tab_groceries'){
			custom_link +=   "_b3"
			Main.WhereAmIData.businesstype = 'b3'
		}
		if(Main.WhereAmIData.businesstype == 'tab_laundry'){
			custom_link +=   "_b4"
			Main.WhereAmIData.businesstype = 'b4'
		}		
	}

	 Main.searchlink = custom_link;	
     Main.Loading();

		//cuisine end
	if(deliveryAccept == 1){

		
		postcode=document.getElementById("address").value;	
		if(Main.zipMAxMin.zipvalmax>0){		
		if((postcode.length>parseInt(Main.zipMAxMin.zipvalmax))|| (postcode.length<parseInt(Main.zipMAxMin.zipvalmin)) ){
			swal("Error","<?= $lang_resource['MAIN_PAGE_SEARCH_ZIPCODE_VALIDATION_MSG'] ?>","error");
			Main.Ready();
			return ;
		}		
		}
		console.log( JSON.stringify(Forms.Form.whereami));
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchzipcodeValidation","zipcode":"' + postcode + '"}]', function (tt){		   
			if (tt != ""){
				Main.zipcodeValidation1 = JSON.parse(tt).zipcodeValidation;	
				var fieldarray=new Array();			
					if(Main.zipcodeValidation1["value"]){
						if(parseInt(Main.zipcodeValidation1["value"])!=0){
							swal("Error","<?= $lang_resource['MAIN_PAGE_SEARCH_ZIPCODE_VALIDATION_MSG'] ?>","error");						
							Main.Ready();
							console.log( JSON.stringify(Forms.Form.whereami));
							return
						}					 
					}			
				}
				if(locatserch.zipcode){
					Main.WhereAmIData.zipcode = locatserch.zipcode
				}
				Main.Ready();
				$("#top").html("");
				window.history.pushState( {"id":100} , "Business list", custom_link );
	            Shopping.Start1();
	            Popup.Close();
				Forms.Clean("whereami");

			/*$.post("panel/lib/front-main.php", "f=getPostcode&data=" + JSON.stringify(Main.WhereAmIData.location), function (h){		
				Main.WhereAmIData.zipcode = h;				
			});*/
			

	        $.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){			
	            Main.Ready();
				
	           // $("#top").html("");
				window.history.pushState( {"id":100} , "Business list", custom_link );	           
	        });		
	    });	
	}else{
		/*$.post("panel/lib/front-main.php", "f=getPostcode&data=" + JSON.stringify(Main.WhereAmIData.location), function (h){
			
			Main.WhereAmIData.zipcode = h;

		});*/	
		$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){			
            Main.Ready();
           // $("#top").html("");
			window.history.pushState( {"id":100} , "Business list", custom_link );
         
        });
		if(locatserch.zipcode){
			Main.WhereAmIData.zipcode = locatserch.zipcode
		}
		Main.Ready();
        $("#top").html("");
		window.history.pushState( {"id":100} , "Business list", custom_link );
        Shopping.Start1();
        Popup.Close();
		Forms.Clean("whereami");
	}       
    GoogleMap.Clean();
    Main.RedirectToBusiness = null
},
 neibhourUpdate: function(frm) {
 
   Main.neibourGlobaltext=frm.options[frm.selectedIndex].innerHTML;
    Main.neibourGlobalid = frm.value;
 },
 SaveWhereAmICustom: function ()
    {
		
		
		
		if(Main.Gibberish=='t')
		{
			if(Main.ActiveSearch == 1){
				swal("Error","<?= $lang_resource['LOGIN_AUTOLOCATION_ALERT'] ?>","error");
				return
			}
		}
		if(Main.settingfront.tab_delivery_country == 'f'){
			Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;
			
		}
		
		
		
		else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray('-1', countrytag )  == -1 ){
				Forms.Form.whereami.fields.country.value = document.getElementById("country").value;
			}else{
				Forms.Form.whereami.fields.country.value = document.getElementById("country").value;
			}

			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)

			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){
				
				Forms.Form['whereami'].fields['city'].value = citytag[0];
				
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;
			
		}
		if(Main.settingfront.tab_delivery_address == 'f' && /*deliveryAccept == 1 &&*/ Main.settingfront.tab_delivery_neighborhood == 'f'){

			Forms.Form['whereami'].fields['address'].value = Main.settingfront.city_name_default;

			var a = new Object();
			a.id = "address";
			a.value = Main.settingfront.city_name_default;
			if(Main.User){
				
				a.value = Main.User.cityname;
				}
			GoogleMap.UpdateUserPosition(a);
			console.log(Forms.Form['whereami'].fields['address'].value)

		}

			if(Main.User){
					var a = new Object();
					a.id = "address";
					a.value = Main.User.cityname;
					GoogleMap.UpdateUserPosition(a);
				}
		if(document.getElementById("city"))
		Forms.Form.whereami.fields.city.value = document.getElementById("city").value;	 
		Forms.Form.whereami.fields.address.value = Forms.Form.whereami.fields.address.value.toLowerCase() 
		if(Forms.Form.whereami.fields.country.value == "") {
			swal("Error","<?= $lang_resource['FRONT_SELECT_COUNTRY'] ?>","error");
			return ;
			}
		else if(Forms.Form.whereami.fields.city.value == "") {
			swal("Error","<?= $lang_resource['FRONT_SELECT_CITY'] ?>","error");
			return ;
			}

		else if((Forms.Form.whereami.fields.address.value == "" ) && (Main.settingfront.tab_delivery_neighborhood == 'f')) {
			swal("Error","<?= $lang_resource['FRONT_SELECT_ADDRESS'] ?>","error");
			return ;
			}
	 	else if((document.getElementById("address").value == "") && (Main.settingfront.tab_delivery_neighborhood == 't')){
	    	swal("Error","<?= $lang_resource['FRONT_SELECT_NEIBORHOOD'] ?>","error");
			return ;
			}  
			
			             

        Main.WhereAmIDataCus = new Object();
        Main.WhereAmIDataCus.country = Forms.Form.whereami.fields.country.value;
        Main.WhereAmIDataCus.city = Forms.Form.whereami.fields.city.value;
        var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Forms.Form.whereami.fields.city.value);


		Main.WhereAmIDataCus.currency = Main.Franchises[a].currency;
        Main.WhereAmIDataCus.ga = Main.Franchises[a].ga;

        Main.WhereAmIDataCus.cityname = Main.Franchises[a].city;
		Main.WhereAmIDataCus.collecttype = "delivery";
		Shopping.Cart.buyer.city = Forms.Form.whereami.fields.city.value;
		Shopping.Cart.buyer.cityname = Main.Franchises[a].city;

	   Main.WhereAmIDataCus.address = Forms.Form.whereami.fields.address.value;
		Shopping.Cart.buyer.address = Forms.Form.whereami.fields.address.value;
        Main.WhereAmIDataCus.location =Forms.Form.whereami.fields.location.value;
		
		
		if(Main.settingfront.tab_delivery_neighborhood == 't') {
			
			Main.WhereAmIDataCus.delivery_neighborhoodStaus =  1; 
			Main.WhereAmIDataCus.delivery_neighborhood =  $("select[id='address'").find('option:selected').text();
			Main.WhereAmIDataCus.delivery_neighborhoodid =  $("select[id='address'").find('option:selected').val();
			
			}
			else {
		Main.WhereAmIDataCus.delivery_neighborhoodStaus =  0; 		
				
				}

		var op ='';
		var cm ='';
		var ops ='';
		var totl ='';

		if(Forms.Form.whereami.options) {
		var op =Forms.Form.whereami.options;
		var cm =Forms.Form.whereami.comments;
		var ops =Forms.Form.whereami.optionsid;
		
		}
		if(Forms.Form.whereami.total_price)
		var totl =Forms.Form.whereami.total_price;

        Main.WhereAmIDataCus.approved = true;


		Main.Loading(true);
        $.post("panel/lib/front-main.php", "f=FetchAllBusinessDeliveryLocation&data=" + Main.WhereAmIDataCus.location+"&alldata=" + JSON.stringify(Main.WhereAmIDataCus)+"&bid="+Shopping.ActiveBusiness, function (b){
			
			b = JSON.parse(b);
			
			Main.d_time = b[0].deliverytime
			//alert(Main.d_time)
		
			if(document.getElementById("pick"))
			document.getElementById("pick").innerHTML = '';
			Main.Ready(true);
			if(b[0].searchtype == "delivery" || b[0].searchtype == "neighbour"){
				var deldis = "delivery";
				
				if(Shopping.Cart.preorder){
					if(Shopping.Cart.Preordserdateback){
					var dd = Shopping.Cart.Preordserdateback;
					}else{
					var dd = Shopping.Cart.buyer.deliverydate;	
					}
						dd = dd.replace("-","")
						dd = dd.replace("-","")

					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
						//alert(a)
						var melist = JSON.parse(a);
						var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);
						if(M!=-1){
							delete Shopping.Menu;
							Main.deliveryType = "delivery";
							var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
							Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);							
							if(b[0].minimum != ""){
								Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
							}
							if(b[0].deliverycitysearch == true){					
								Shopping.Business[w].deliverycitysearch = true;
								Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
							}else{
								Shopping.Business[w].deliverycitysearch = false;
							}
							Shopping.Menu = melist.menu;
							RestMenuList.PrintBusinessAndDishes("");
							if(Main.WhereAmIDataCus.address)
							Main.WhereAmIData.address = Main.WhereAmIDataCus.address
	
							Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)
						}else{
							swal("Error","<?= $lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'] ?>","error");
							return false;
						}
					});
				}else{
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
						//alert(a)
						var melist = JSON.parse(a);
						var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);
						if(M!=-1){
							delete Shopping.Menu;
							Main.deliveryType = "delivery";
							var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
							Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);							
							if(b[0].minimum != ""){
								Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
							}
							if(b[0].deliverycitysearch == true){					
								Shopping.Business[w].deliverycitysearch = true;
								Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
							}else{
								Shopping.Business[w].deliverycitysearch = false;
							}
							Shopping.Menu = melist.menu;
							RestMenuList.PrintBusinessAndDishes("");
							if(Main.WhereAmIDataCus.address)
							Main.WhereAmIData.address = Main.WhereAmIDataCus.address
	
							Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)
						}else{
							swal("Error","<?= $lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'] ?>","error");
							return false;
						}
					});
				}



				Popup.Close()
			}
			else {
				swal("Error","<?= $lang_resource['FRONT_SORRY_DELIVERY_OPTION'] ?>","error");
			}
			Popup.Close()
		});
        Forms.Clean("whereami");
        GoogleMap.Clean();
        Main.RedirectToBusiness = null
    },
	LoginSection: function(val){
		if(val == 1){
			c = document.getElementById("loginemail").value.toLowerCase();
            b = document.getElementById("loginpassword").value
		}else{
			c = Forms.Form['loginform'].fields['logemail'].value
			c = c.toLowerCase();		
			b = Forms.Form['loginform'].fields['logpassword'].value
		}

		if (c != "" && b != ""){
			Main.Loading();
			var a = new Date().getTime();
			Main.Aid = a;
			$.post("panel/login/challenge.php", "", function (e){  
				if (a != Main.Aid){
					return
				}
				a = new Date().getTime(); 
				Main.Aid = a;
				$.post("panel/login/login.php", "type=normal&username=" + c + "&response=" + hex_md5(e + b), function (f){
					if (a != Main.Aid){
                        return
                    }
                    Main.Ready();
                    if (f.trim() == "LoggedIn"){
                    	if(val == 1 && Main.RegisterType == 2){
							$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"}]', function (b){
								if (b != ""){							
									Main.User = JSON.parse(b).user;			
									$('.lognhead').html(Main.User.name);
									$(".join_btn").hide();								
									Visuals.Successpage();																			
								}
							});			
						}else{
							Main.HomeUrl();
						}                    	
                    }	
				}); 
			});
		}else{
			swal("Error","<?= $lang_resource['FRONT_ENTER_LOGIN_EMAIL'] ?>","error");
		}
		
	},

	Favlogin: function () {
		swal("Error","<?= $lang_resource['FRONT_LOGIN_ADD_FAVORITE'] ?>","error");
		if(viewDevice == "Mobile") {
			Visuals.LoginMob()
		}else{
			Main.locationhref = $(location).attr('href');
			$('#hedlogbox').modal({
		        show: 'false'
		    }); 			
			document.getElementById("loginemail").focus()
			event.stopPropagation();
		}
	},
	AddPhotoLogin: function () {
		swal("Error","<?= $lang_resource['SHOPPING_LOGIN_FIRST'] ?>","error");	
		if(viewDevice == "Mobile") {
			Visuals.LoginMob()
		}else{
			Main.locationhref = $(location).attr('href');
			$('#hedlogbox').modal({
		        show: 'false'
		    }); 			
			document.getElementById("loginemail").focus()
			event.stopPropagation();
		}
	},
	 SaveWhereAmICustomOfCity: function ()
    {
		
		

        Main.WhereAmIDataCus = new Object();
        Main.WhereAmIDataCus.country = Forms.Form.whereami.fields.country.value;
        Main.WhereAmIDataCus.city = Forms.Form.whereami.fields.city.value;
        var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIDataCus.city);


		Main.WhereAmIDataCus.currency = Main.Franchises[a].currency;
        Main.WhereAmIDataCus.ga = Main.Franchises[a].ga;
        Main.WhereAmIDataCus.cityname = Main.Franchises[a].city;
		Main.WhereAmIDataCus.collecttype = "delivery"

	    Main.WhereAmIDataCus.address = Forms.Form.whereami.fields.address.value;
        Main.WhereAmIDataCus.location =Forms.Form.whereami.fields.location.value;

        Main.WhereAmIDataCus.approved = true;
       Main.WhereAmIData.location =  Main.WhereAmIDataCus.location;

		    var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Popup.Close()
			Shopping.Start1();



        Forms.Clean("whereami");
        GoogleMap.Clean();
        Main.RedirectToBusiness = null
    },
	 GetUserLocationFromCitySearch: function()
    {



var geocoder = new google.maps.Geocoder();
	var mapOptions = {
	    zoom: 4
	  };
	  // Try HTML5 geolocation
	  if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = new google.maps.LatLng(position.coords.latitude,
		                               position.coords.longitude);

		var lat = pos.lat();
		var lon = pos.lng();

	    	geocoder.geocode({'latLng': pos,'language': 'en'}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
			var addresscomp = eval(results[0].address_components);
			var geocnty = false;var geostrt = "", geomapstr = "";
			for (var i = 0; i  < addresscomp.length; i++) {
				if (addresscomp[i]['types'][0] == 'locality') {
					var geocity = addresscomp[i]['long_name'];

				}
				if (addresscomp[i]['types'][0] == 'country') {
					geocnty = addresscomp[i]['long_name'];

				}
			}
		      if (results[1]) {
			var reltlen = results.length - 1;


			Main.ipaddr = results[1].formatted_address;
			responce = Main.ipaddr.split(",");
			if (responce[1]){
				geostrt = responce[1];
			}

			var reslen = responce.length, ctylen = reslen - 3, ctrylen = reslen - 1;
				responce[ctrylen] = geocnty;
				responce[ctylen] = geocity;

			if (results[0]){
				geomapstr = results[0].formatted_address;
				geomapstr = geomapstr.split(",");
			}
			GoogleMap.UpdateUserPositionip(responce[ctylen], responce[ctrylen], geomapstr[0], lat, lon);

			var contrycheck = 0, contryid, ctycheck = 0;
			for (i in Main.Countries)
        		{

				if (Main.Countries[i].name.toUpperCase() == responce[ctrylen].toUpperCase()){
					contrycheck = 1;
					contryid = Main.Countries[i].id;
				}
			}

			contrycheck=1;
			contryid = Main.Countries[0].id;

			if (contrycheck != 1){
				swal("Error","<?= $lang_resource['No_restaurant_country_V2'] ?>","error");
				Main.Ready(true);
				return;
			}
			Main.WhereAmIData = new Object();
			Main.WhereAmIData.country = contryid;

			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (f)
			{

			    if (f != "")
			    {
				Main.Franchises = JSON.parse(f).franchises;
			    }
			for (i in Main.Franchises)
        		{

			     Main.WhereAmIData.googleCityName = responce[ctylen].toUpperCase()
 					 Main.WhereAmIData.googleCountryName = responce[ctrylen].toUpperCase();
				if (Main.Franchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){

				}
			}
			 var ctycheck = 1;
			  Main.WhereAmIData.city = Main.Franchises[0].id;
			if (ctycheck != 1){
				swal("Error","<?= $lang_resource['NORESTAURANTONCOUNTRY_V21'] ?>","error");
				Main.Ready(true);
				return;
			}



			if (ctycheck == 1) {
			var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);

			if(IS_PAYPAL_ENABLED == 1)
					Main.WhereAmIData.currency = Main.Franchises[a].currency;

			Main.WhereAmIData.ga = Main.Franchises[a].ga;
			Main.WhereAmIData.cityname = responce[ctylen];

			if(IS_PAYPAL_ENABLED != 1)
					Main.WhereAmIData.address = geostrt;

			Main.WhereAmIData.location = '{"latitud":'+lat+',"longitud":'+lon+',"zoom":15}';

			Main.WhereAmIData.approved = true;
			$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b)
			{
			 var business_id = 0;
			Shopping.RedirectToCity = null;
			Shopping.ActiveBusiness = null;
			Main.WhereAmIData.collecttype = "delivery";
			Main.deliveryType = "delivery";
			Popup.Close()
			Shopping.Start1();
			    Popup.Close()
			});
			Main.Ready(true);
			}else {
				swal("Error","<?= $lang_resource['No_restaurant_location_V2'] ?>","error");
				Main.Ready(true);
			}
                	})
		      } else {
		      	swal("Error","<?= $lang_resource['FRONT_NO_RESULT_FOUND'] ?>","error");
		      }
		    } else {
		    	swal("Error","<?= $lang_resource['FRONT_GEOCODER_FAILED'] ?>" + status ,"error");
		    }
	    	});
	    }, function(e) {
	    	swal("Error","<?= $lang_resource['geolocation_failed_V2'] ?> "+e,"error");
		Main.Ready(true);
	    },{
        	enableHighAccuracy:true,
        	timeout:10000,
       		maximumAge:Infinity
   	 });
	  } else {
	  	swal("Error","<?= $lang_resource['Browser_no_geolocation_V2'] ?>","error");
		Main.Ready(true);
	  }




	$.ajax({
		url: 'locate.php',
		type: 'POST',
		beforeSend: function(){
			Main.Loading(true);
		},
		success: function(responce){


		},
		failure: function(){
			Main.Ready(true);
			swal("Error","Operation failed","error");
		}
	});
        Main.RedirectToBusiness = null
    },
    VerifyLocation: function(){
		var deltype = document.getElementById("deliverytypechoose").value
		
		if(deltype == 'delivery'){
			Visuals.SaveWhereAmICustom()
		}else if(deltype == 'pickup'){
			var disdel = "pickup";
			if(Shopping.Cart.preorder){
				if(Shopping.Cart.buyer.deliverydate){
					Shopping.Cart.Preordserdateback = Shopping.Cart.buyer.deliverydate;		
				}else{
					Shopping.Cart.buyer.deliverydate = Shopping.Cart.Preordserdateback;
				}
				var dd = Shopping.Cart.Preordserdateback;				
				dd = dd.replace("-","")
				dd = dd.replace("-","")
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(disdel) + "}]", function (a){		 
					var melist = JSON.parse(a);
					var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);
					if(M!=-1){
						delete Shopping.Menu;
						Main.deliveryAccept = 2;
						Main.WhereAmIData.collecttype = "pickup";
						Main.deliveryType = "pickup";
						Main.WhereAmIData.reservestatus = "pickup"
						var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
						Shopping.Business[w].shipping = 0;
						Main.Franchises = Main.FranchisesBackup
						if(Main.RedirectToCity) {
							var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.RedirectToCity);
							Shopping.Cart.buyer.city = Shopping.RedirectToCity;
							Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
						}else{
							var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[w].city);
							Shopping.Cart.buyer.city = Shopping.Business[w].city;
							Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
						}
						Shopping.Menu = melist.menu;
						RestMenuList.PrintBusinessAndDishes("");
						Shopping.AddToCart(Main.currentX,Main.currentItem,Main.Itemoptions,Main.Itemcomments, Main.Itemoptionsid,Main.Itemtotal_price,Main.Itemquantitysec)	
						Popup.Close()
					}else{
						$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_PICKUP_ALERT'];?>')
						$("#choose_delivery_warning").show()
						return false;
					}
				});
			}else{
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(disdel) + "}]", function (a){		 
					var melist = JSON.parse(a);
					var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);
					if(M!=-1){
						delete Shopping.Menu;
						Main.deliveryAccept = 2;
						Main.WhereAmIData.collecttype = "pickup";
						Main.deliveryType = "pickup";
						Main.WhereAmIData.reservestatus = "pickup"
						var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);						
						Shopping.Business[w].shipping = 0;
						Main.Franchises = Main.FranchisesBackup
						if(Main.RedirectToCity) {
							var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.RedirectToCity);
							Shopping.Cart.buyer.city = Shopping.RedirectToCity;
							Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
						}else{
							var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[w].city);
							Shopping.Cart.buyer.city = Shopping.Business[w].city;
							Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
						}
						Shopping.Menu = melist.menu;
						RestMenuList.PrintBusinessAndDishes("");
						Shopping.AddToCart(Main.currentX,Main.currentItem,Main.Itemoptions,Main.Itemcomments, Main.Itemoptionsid,Main.Itemtotal_price,Main.Itemquantitysec)	
						Popup.Close()
					}else{
						$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_PICKUP_ALERT'];?>')
						$("#choose_delivery_warning").show()
						return false;
					}
				});
			}
			Forms.Clean("recover13");
		}else{
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS'];?>')	
			$("#choose_delivery_warning").show()
		}
	},
	VerifyLocationMenu: function(deltype){

		if(deltype == 'delivery'){
			Visuals.SaveWhereAmICustomMenu()
		}else if(deltype == 'pickup'){
			Shopping.Cart.business[0].shipping = '0'; 
			var disdel = "pickup";
			if(Shopping.Cart.preorder){
				if(Shopping.Cart.buyer.deliverydate){
					Shopping.Cart.Preordserdateback = Shopping.Cart.buyer.deliverydate;		
				}else{
					Shopping.Cart.buyer.deliverydate = Shopping.Cart.Preordserdateback;
				}
				var dd = Shopping.Cart.Preordserdateback;				
				dd = dd.replace("-","")
				dd = dd.replace("-","")
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(disdel) + "}]", function (a){		 
					var melist = JSON.parse(a);
					Main.MenuVerified(melist)
					delete Shopping.Menu;
					Main.deliveryAccept = 2;
					Main.WhereAmIData.collecttype = "pickup";
					Main.deliveryType = "pickup";
					Main.WhereAmIData.reservestatus = "pickup"
					var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
					Shopping.Business[w].shipping = 0;
					if(Main.RedirectToCity) {
						var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.RedirectToCity);
						Shopping.Cart.buyer.city = Shopping.RedirectToCity;
						Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
					}else{
						var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[w].city);
						Shopping.Cart.buyer.city = Shopping.Business[w].city;
						Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
					}
					Shopping.Menu = melist.menu;
					//Shopping.OpenBusiness(Shopping.ActiveBusiness)
					RestMenuList.PrintBusinessAndDishes("");
				});
			}else{
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(disdel) + "}]", function (a){		 
					var melist = JSON.parse(a);
					Main.MenuVerified(melist)						
					delete Shopping.Menu;
					Main.deliveryAccept = 2;
					Main.WhereAmIData.collecttype = "pickup";
					Main.deliveryType = "pickup";
					Main.WhereAmIData.reservestatus = "pickup"
					var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);						
					Shopping.Business[w].shipping = 0;
					if(Main.RedirectToCity) {
						var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.RedirectToCity);
						Shopping.Cart.buyer.city = Shopping.RedirectToCity;
						Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
					}else{
						var ca = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Shopping.Business[w].city);
						Shopping.Cart.buyer.city = Shopping.Business[w].city;
						Shopping.Cart.buyer.cityname = Main.Franchises[ca].city;
					}
					Shopping.Menu = melist.menu;
					Shopping.OpenBusiness(Shopping.ActiveBusiness)
					//RestMenuList.PrintBusinessAndDishes("");					
				});
			}
			Forms.Clean("recover13");
		}
	},
	MenuVerified: function(melist){
		var backupid = new Array();
		var backupcart = new Object();
		if(Shopping.Cart.business[0]){
			if(Shopping.Cart.business[0].dishes){			
				if (Shopping.Cart.business[0].dishes.length != 0) {								
					for (var i = 0;i < Shopping.Cart.business[0].dishes.length;i++){										
						var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",Shopping.Cart.business[0].dishes[i].id);
						if(M == -1){
							backupid.push(i)
						}
					}		
				}
			}
		}
		
		if(backupid.length > 0){
			backupcart = Shopping.Cart.business[0].dishes;
			delete Shopping.Cart.business[0].dishes;
			Shopping.Cart.business[0].dishes = new Array();	
			var counter = 0;
			for (var i = 0;i < backupcart.length;i++){
				if(backupid.indexOf(backupcart[i].id) != -1){
					w = new Object();
					w = backupcart[i];
					Shopping.Cart.business[0].dishes.push(w)
					counter++;
				}
			}
			if(counter == 0){
				lastid = ""
			}else{
				lastid = counter - 1;
			}
			
			Shopping.UpdateCartTotals();
		}
		

	},
    GetUserLocationMenu: function(){
		var geocoder = new google.maps.Geocoder();
		var mapOptions = {
			zoom: 6
		};
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				console.log("latlang : "+pos);
				var lat = pos.lat();
				var lon = pos.lng();

				geocoder.geocode({'latLng': pos,'language': 'en'}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var addresscomp = eval(results[0].address_components);
						var geocnty = false;var geostrt = "", geomapstr = ""; var geozip = -1;
						console.log("Decoded address : "+addresscomp);
						for (var i = 0; i  < addresscomp.length; i++) {
							if (addresscomp[i]['types'][0] == 'locality') {
								var geocity = addresscomp[i]['long_name'];
								console.log("locality :"+addresscomp[i]['long_name']);
							}
							if (addresscomp[i]['types'][0] == 'country') {
								geocnty = addresscomp[i]['long_name'];
								console.log("country :"+addresscomp[i]['long_name']);
							}
							if (addresscomp[i]['types'][0] == 'postal_code') {
								geozip = addresscomp[i]['short_name'];
							}
						}
						if (results[1]) {
							var reltlen = results.length - 1;
							console.log(results);
							Main.ipaddr = results[1].formatted_address;
							responce = Main.ipaddr.split(",");
							if (responce[1]){
								geostrt = responce[1];
							}
							console.log(responce+" "+responce.length);
							var reslen = responce.length, ctylen = reslen - 3, ctrylen = reslen - 1;
							responce[ctrylen] = geocnty;
							responce[ctylen] = geocity;

							if (results[0]){
								geomapstr = results[0].formatted_address;
								geomapstr = geomapstr.split(",");
							}
							GoogleMap.UpdateUserPositionip(responce[ctylen], responce[ctrylen], geomapstr[0], lat, lon);
							console.log("responce[ctrylen] : "+responce[ctrylen]);
							var contrycheck = 0, contryid, ctycheck = 0;
							for (i in Main.Countries){
								console.log(Main.Countries[i].name.toUpperCase()+" "+responce[ctrylen].toUpperCase());
								if (Main.Countries[i].name.toUpperCase() == responce[ctrylen].toUpperCase()){
									contrycheck = 1;
									contryid = Main.Countries[i].id;
								}
							}

							contrycheck=1;
							contryid = Main.Countries[0].id;

							if (contrycheck != 1){
								swal("Error","<?= $lang_resource['No_restaurant_country_V2'] ?>","error");
								Main.Ready(true);
								return;
							}
						Main.WhereAmIData = new Object();
						Main.WhereAmIData.country = contryid;
						console.log("Values saved");
						$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (f){
						if (f != ""){
							Main.Franchises = JSON.parse(f).franchises;
						}

						for (i in Main.Franchises){
							Main.WhereAmIData.googleCityName = responce[ctylen].toUpperCase()
							Main.WhereAmIData.googleCountryName = responce[ctrylen].toUpperCase();
							if (Main.Franchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){}
						}
						var ctycheck = 1;
						Main.WhereAmIData.city = Main.Franchises[0].id;

						if (ctycheck == 1) {
							var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
							if(IS_PAYPAL_ENABLED == 1)
								Main.WhereAmIData.currency = Main.Franchises[a].currency;

							Main.WhereAmIData.ga = Main.Franchises[a].ga;
							Main.WhereAmIData.cityname = responce[ctylen];

							if(IS_PAYPAL_ENABLED != 1)
								Main.WhereAmIData.address = geostrt;

							Main.WhereAmIData.location = '{"latitud":'+lat+',"longitud":'+lon+',"zipcode":'+geozip+',"zoom":15}';

							Main.WhereAmIData.approved = true;
							
							$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){
								$('.letfind').hide();
								$('.letfindshop').show();
								Shopping.RedirectToCity = null;
								Main.WhereAmIData.collecttype = "delivery";
								Main.deliveryType = "delivery";

								var op ='';
								var cm ='';
								var ops ='';
								var totl ='';
								
								var op = Main.Itemoptions
								var cm = Main.Itemcomments
								var ops = Main.Itemoptionsid
								var totl = Main.Itemtotal_price
								

								$.post("panel/lib/front-main.php", "f=FetchAllBusinessDeliveryLocation&data=" + Main.WhereAmIData.location+"&bid="+Shopping.ActiveBusiness, function (b){
									b = JSON.parse(b);
									Main.d_time = b[0].deliverytime
									Main.Ready(true);

									if(b[0].searchtype == "delivery" || b[0].searchtype == "neighbour"){
										var deldis = "delivery";
										if(Shopping.Cart.preorder){
											var dd = Shopping.Cart.Preordserdateback;
											dd = dd.replace("-","")
											dd = dd.replace("-","")

											$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
												var melist = JSON.parse(a);
												Main.MenuVerified(melist)

												delete Shopping.Menu;
												Main.deliveryAccept = 1;
												Main.WhereAmIData.collecttype = "delivery";
												Main.deliveryType = "delivery";
												Main.WhereAmIData.reservestatus = "delivery"
												var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
												Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);							
												if(b[0].minimum != ""){
													Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
												}
												if(b[0].deliverycitysearch == true){					
													Shopping.Business[w].deliverycitysearch = true;
													Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
												}else{
													Shopping.Business[w].deliverycitysearch = false;
												}
												Shopping.Menu = melist.menu;
												RestMenuList.PrintBusinessAndDishes("");
												if(Main.WhereAmIDataCus.address)
													Main.WhereAmIData.address = Main.WhereAmIDataCus.address

												Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)
												
											});
										}else{
											$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
												var melist = JSON.parse(a);
												Main.MenuVerified(melist)

												delete Shopping.Menu;
												Main.deliveryAccept = 1;
												Main.WhereAmIData.collecttype = "delivery";
												Main.deliveryType = "delivery";
												Main.WhereAmIData.reservestatus = "delivery"
												var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
												Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);							
												if(b[0].minimum != ""){
													Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
												}
												if(b[0].deliverycitysearch == true){					
													Shopping.Business[w].deliverycitysearch = true;
													Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
												}else{
													Shopping.Business[w].deliverycitysearch = false;
												}
												Shopping.Menu = melist.menu;
												RestMenuList.PrintBusinessAndDishes("");
												if(Main.WhereAmIDataCus.address)
													Main.WhereAmIData.address = Main.WhereAmIDataCus.address

												Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)
												Popup.Close()
											});
										}
										
									}else {
										$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'];?>')
										$("#choose_delivery_warning").show()
									}
								});
							});
							Main.Ready(true);
						}else {
							$("#choose_delivery_warning").empty().append("<?= $lang_resource['No_restaurant_location_V2'] ?>");
							$("#choose_delivery_warning").show();
							//alert("<?= $lang_resource['No_restaurant_location_V2'] ?>");
							Main.Ready(true);
						}
					})
				}else{
					$("#choose_delivery_warning").empty().append("<?= $lang_resource['FRONT_NO_RESULT_FOUND'] ?>");
					$("#choose_delivery_warning").show();
					//alert("<?= $lang_resource['FRONT_NO_RESULT_FOUND'] ?>");
				}
			}else{
				$("#choose_delivery_warning").empty().append("<?= $lang_resource['FRONT_GEOCODER_FAILED'] ?>");
				$("#choose_delivery_warning").show();
				//alert("<?= $lang_resource['FRONT_GEOCODER_FAILED'] ?>" + status);
			}
			});
			}, function(e) {
				$("#choose_delivery_warning").empty().append("<?= $lang_resource['geolocation_failed_V2'] ?>");
				$("#choose_delivery_warning").show();
				//alert("<?= $lang_resource['geolocation_failed_V2'] ?> "+e);
				Main.Ready(true);
			},{
			enableHighAccuracy:true,
			timeout:10000,
			maximumAge:Infinity
			});
		} else {
			$("#choose_delivery_warning").empty().append("<?= $lang_resource['Browser_no_geolocation_V2'] ?>");
			$("#choose_delivery_warning").show();
			//alert("<?= $lang_resource['Browser_no_geolocation_V2'] ?>");
			Main.Ready(true);
		}
		$.ajax({
			url: 'locate.php',
			type: 'POST',
			beforeSend: function(){
			Main.Loading(true);
			},
			success: function(responce){


			},
			failure: function(){
				Main.Ready(true);
				swal("Error","Operation failed","error");
			}
		});
		Main.RedirectToBusiness = null
	},
    GetUserLocation: function(){

		var geocoder = new google.maps.Geocoder();
		var mapOptions = {
			zoom: 6
		};

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude);

				var lat = pos.lat();
				var lon = pos.lng();
				console.log("latitude : "+lat+" longitude : "+lon);
				geocoder.geocode({'latLng': pos,'language': 'en'}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {

						var addresscomp = eval(results[0].address_components);
						var geocnty = false;var geostrt = "", geomapstr = "";

						for (var i = 0; i  < addresscomp.length; i++) {
							if (addresscomp[i]['types'][0] == 'locality') {
								var geocity = addresscomp[i]['long_name'];
							}
							if (addresscomp[i]['types'][0] == 'country') {
								geocnty = addresscomp[i]['long_name'];
								console.log("country :"+addresscomp[i]['long_name']);
							}
						}
						if (results[1]) {
							var reltlen = results.length - 1;

							Main.ipaddr = results[1].formatted_address;
							responce = Main.ipaddr.split(",");
							if (responce[1]){
								geostrt = responce[1];
							}
							console.log(responce+" "+responce.length);
							var reslen = responce.length, ctylen = reslen - 3, ctrylen = reslen - 1;
							responce[ctrylen] = geocnty;
							responce[ctylen] = geocity;

							if (results[0]){
								geomapstr = results[0].formatted_address;
								geomapstr = geomapstr.split(",");
							}
							GoogleMap.UpdateUserPositionip(responce[ctylen], responce[ctrylen], geomapstr[0], lat, lon);
							console.log("responce[ctrylen] : "+responce[ctrylen]);


							var contrycheck = 0, contryid, ctycheck = 0;
							for (i in Main.Countries){
								console.log(Main.Countries[i].name.toUpperCase()+" "+responce[ctrylen].toUpperCase());
								if (Main.Countries[i].name.toUpperCase() == responce[ctrylen].toUpperCase()){
									contrycheck = 1;
									contryid = Main.Countries[i].id;
								}
							}

							contrycheck=1;
							contryid = Main.Countries[0].id;

							if (contrycheck != 1){
								swal("Error","<?= $lang_resource['No_restaurant_country_V2'] ?>","error");
								Main.Ready(true);
								return;
							}

							Main.WhereAmIData = new Object();
							Main.WhereAmIData.country = contryid;
							console.log("Values saved");
							$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (f){
								if (f != ""){
									Main.Franchises = JSON.parse(f).franchises;
								}

								for (i in Main.Franchises){
									console.log(Main.Franchises[i].city.toUpperCase()+" "+responce[ctylen].toUpperCase());
									Main.WhereAmIData.googleCityName = responce[ctylen].toUpperCase()
									Main.WhereAmIData.googleCountryName = responce[ctrylen].toUpperCase();
									if (Main.Franchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){}
								}
								var ctycheck = 1;
								Main.WhereAmIData.city = Main.Franchises[0].id;
								if (ctycheck != 1){
									swal("Error","<?= $lang_resource['NORESTAURANTONCOUNTRY_V21'] ?>","error");
									Main.Ready(true);
									return;
								}else{
									Main.deliveryType ="delivery"
									Main.searchType ="Global";
									Main.deliveryType ="delivery"
									Main.searchType ="Global"
									Main.WhereAmIData.reservestatus = 'delivery';
									for (i in Main.Franchises){
										if (Main.Franchises[i].city.toUpperCase() ==  Main.WhereAmIData.googleCityName){
											Main.WhereAmIData.city = Main.Franchises[i].id;
										}
									}
								}

								if (ctycheck == 1) {
									var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);

									if(IS_PAYPAL_ENABLED == 1)
										Main.WhereAmIData.currency = Main.Franchises[a].currency;

									Main.WhereAmIData.ga = Main.Franchises[a].ga;
									Main.WhereAmIData.cityname = responce[ctylen];

									if(IS_PAYPAL_ENABLED != 1)
										Main.WhereAmIData.address = geostrt;

									Main.WhereAmIData.location = '{"latitud":'+lat+',"longitud":'+lon+',"zoom":15}';

									Main.WhereAmIData.approved = true;
									Main.GeolocationID();
									$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b){


									});
									Main.Ready(true);
								}else {
									swal("Error","<?= $lang_resource['No_restaurant_location_V2'] ?>","error");
									Main.Ready(true);
								}
							})
						}else{
							swal("Error","<?= $lang_resource['FRONT_NO_RESULT_FOUND'] ?>","error");
							Main.Ready(true);
						}
					} else {
						swal("Error","<?= $lang_resource['FRONT_GEOCODER_FAILED'] ?>" + status ,"error");
						Main.Ready(true);
					}
				});
			}, function(e) {
				swal("Error","<?= $lang_resource['geolocation_failed_V2'] ?> "+e.code +' message '+ e.message ,"error");
				Main.Ready(true);
				// error.code can be:
			    //   0: unknown error
			    //   1: permission denied
			    //   2: position unavailable (error response from location provider)
			    //   3: timed out
			},{
				enableHighAccuracy:true,
				timeout:10000,
				maximumAge:Infinity
			});
		} else {
			swal("Error","<?= $lang_resource['Browser_no_geolocation_V2'] ?>","error");
			Main.Ready(true);
			Popup.Close();
		}


		$.ajax({
			url: 'locate.php',
			type: 'POST',
			beforeSend: function(){
				Main.Loading(true);
			},
			success: function(responce){


			},
			failure: function(){
				Main.Ready(true);
				swal("Error","Operation failed","error");
			}
		});
		Main.RedirectToBusiness = null
	},

	 GetUserLocation1: function()
    {



var geocoder = new google.maps.Geocoder();
	var mapOptions = {
	    zoom: 6
	  };
	  if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = new google.maps.LatLng(position.coords.latitude,
		                               position.coords.longitude);

		console.log("latlang : "+pos);
		var lat = pos.lat();
		var lon = pos.lng();
	
	    	geocoder.geocode({'latLng': pos,'language': 'en'}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
			var addresscomp = eval(results[0].address_components);
			var geocnty = false;var geostrt = "", geomapstr = ""; var geozip = -1;
			console.log("Decoded address : "+addresscomp);
			for (var i = 0; i  < addresscomp.length; i++) {
				if (addresscomp[i]['types'][0] == 'locality') {
					var geocity = addresscomp[i]['long_name'];
					console.log("locality :"+addresscomp[i]['long_name']);
				}
				if (addresscomp[i]['types'][0] == 'country') {
					geocnty = addresscomp[i]['long_name'];
					console.log("country :"+addresscomp[i]['long_name']);
				}
				if (addresscomp[i]['types'][0] == 'postal_code') {
					
					geozip = addresscomp[i]['short_name'];
					
				}
			}
		      if (results[1]) {
			var reltlen = results.length - 1;

			console.log(results);

			Main.ipaddr = results[1].formatted_address;
			responce = Main.ipaddr.split(",");
			if (responce[1]){
				geostrt = responce[1];
			}
			console.log(responce+" "+responce.length);
			var reslen = responce.length, ctylen = reslen - 3, ctrylen = reslen - 1;
				responce[ctrylen] = geocnty;
				responce[ctylen] = geocity;

			if (results[0]){
				geomapstr = results[0].formatted_address;
				geomapstr = geomapstr.split(",");
			}
			GoogleMap.UpdateUserPositionip(responce[ctylen], responce[ctrylen], geomapstr[0], lat, lon);
			console.log("responce[ctrylen] : "+responce[ctrylen]);
			var contrycheck = 0, contryid, ctycheck = 0;
			for (i in Main.Countries)
        		{
				console.log(Main.Countries[i].name.toUpperCase()+" "+responce[ctrylen].toUpperCase());
				if (Main.Countries[i].name.toUpperCase() == responce[ctrylen].toUpperCase()){
					contrycheck = 1;
					contryid = Main.Countries[i].id;
				}
			}

			contrycheck=1;
			contryid = Main.Countries[0].id;

			if (contrycheck != 1){
				swal("Error","<?= $lang_resource['No_restaurant_country_V2'] ?>","error");
				Main.Ready(true);
				return;
			}
			Main.WhereAmIData = new Object();
			Main.WhereAmIData.country = contryid;
			console.log("Values saved");
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (f)
			{


			    if (f != "")
			    {
				Main.Franchises = JSON.parse(f).franchises;

			    }

			for (i in Main.Franchises)
        		{

			     Main.WhereAmIData.googleCityName = responce[ctylen].toUpperCase()
				  Main.WhereAmIData.googleCountryName = responce[ctrylen].toUpperCase();
				if (Main.Franchises[i].city.toUpperCase() == responce[ctylen].toUpperCase()){


				}
			}
			 var ctycheck = 1;
			  Main.WhereAmIData.city = Main.Franchises[0].id;



			if (ctycheck == 1) {
			var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);

			if(IS_PAYPAL_ENABLED == 1)
					Main.WhereAmIData.currency = Main.Franchises[a].currency;

			Main.WhereAmIData.ga = Main.Franchises[a].ga;
			Main.WhereAmIData.cityname = responce[ctylen];

			if(IS_PAYPAL_ENABLED != 1)
					Main.WhereAmIData.address = geostrt;

			Main.WhereAmIData.location = '{"latitud":'+lat+',"longitud":'+lon+',"zipcode":'+geozip+',"zoom":15}';

			Main.WhereAmIData.approved = true;
			$.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b)
			{

			    $('.letfind').hide();
			    $('.letfindshop').show();

				Shopping.RedirectToCity = null;
				//Shopping.ActiveBusiness = null;
				Main.WhereAmIData.collecttype = "delivery";
				Main.deliveryType = "delivery";

		var op ='';
		var cm ='';
		var ops ='';
		var totl ='';

		if(Forms.Form.whereami.options) {
		var op =Forms.Form.whereami.options;
		var cm =Forms.Form.whereami.comments;
		var ops =Forms.Form.whereami.optionsid;
		var totl =Forms.Form.whereami.total_price;
		}



				 $.post("panel/lib/front-main.php", "f=FetchAllBusinessDeliveryLocation&data=" + Main.WhereAmIData.location+"&bid="+Shopping.ActiveBusiness, function (b)
        {
			  b = JSON.parse(b);


            Main.Ready(true);
            //$("#top").html("");
			if(b[0].searchtype == "delivery")
			{

				Main.deliveryType = "delivery";


		   var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
			Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);
			
			Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);



				Popup.Close()

			Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)

			}
			else {
				swal("Error","<?= $lang_resource['FRONT_SORRY_DELIVERY_OPTION'] ?>","error");
			}
		   Popup.Close()
        });


			});
			Main.Ready(true);
			}else {
				swal("Error","<?= $lang_resource['No_restaurant_location_V2'] ?>","error");
				Main.Ready(true);
			}
                	})
		      } else {
		      	swal("Error","<?= $lang_resource['FRONT_NO_RESULT_FOUND'] ?>","error");
		      }
		    } else {
		    	swal("Error","<?= $lang_resource['FRONT_GEOCODER_FAILED'] ?> " + status,"error");
		    }
	    	});
	    }, function(e) {
	    	swal("Error","<?= $lang_resource['geolocation_failed_V2'] ?> "+e,"error");
		Main.Ready(true);
	    },{
        	enableHighAccuracy:true,
        	timeout:10000,
       		maximumAge:Infinity
   	 });
	  } else {
	  	swal("Error","<?= $lang_resource['Browser_no_geolocation_V2'] ?>","error");
		Main.Ready(true);
	  }




	$.ajax({
		url: 'locate.php',
		type: 'POST',
		beforeSend: function(){
			Main.Loading(true);
		},
		success: function(responce){


		},
		failure: function(){
			Main.Ready(true);
			swal("Error","Operation failed","error");
		}
	});
        Main.RedirectToBusiness = null
    },
	EditAccount1: function (a){
		$("#main").hide();
		Main.chk = 1;

		var b = new Date().getTime();
        if (a)
        {
            Main.Loading();
            Main.Aid = b;
            $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (c)
            {
				
                if (b != Main.Aid)
                {
                    return
                }
                Main.Ready();
                if (c != "")
                {
                    c = JSON.parse(c);
                    Main.Countries = c.countries;
                    Main.UserForm()
                }
                else
                {
                	swal("Error","Unexpected error","error");
                }
                Main.Ga("/profile/create")
            })
        }
        else
        {
            Main.Loading();
            Main.Aid = b;
            $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserInfo"}]', function (c)
            {
                if (b != Main.Aid)
                {
                    return
                }
                Main.Ready();
                if (c != "")
                {
                    c = JSON.parse(c);
                    Main.Countries = c.countries;
                    Main.UserForm(c.user)
                }
                else
                {
                	swal("Error","<?= $lang_resource['MOBILE_MYACCOUNT_ERROR'] ?>","error");
                }
                Main.Ga("/profile/edit")
            })
        }

	},
	
	CommonAccount: function (){	
		$("#main").hide();
		$("body").addClass("grey_body");	
		$("header").removeClass("inner_header")
		$('#hedlogbox').modal('hide');
		$('.modal-backdrop').remove();
		if(Main.settingfront.business_owner_register != 'f'){
			Visuals.CommonRegisterForm();
		}else{
			Main.EditAccount(true);
		}
	},
	
	
    EditAccount: function (a){
		Main.chk = 0;		
		var b = new Date().getTime();

		if (a){
			Main.Aid = b;
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (c){
				if (b != Main.Aid){
					return
				}
				Main.Ready();
				if (c != ""){
					c = JSON.parse(c);
					Main.Countries = c.countries;
					Main.UserForm()
				}else{
					swal("Error","<?= $lang_resource['MOBILE_MYACCOUNT_ERROR'] ?>","error");
				}
				Main.Ga("/profile/create")
			})
		}else{
			Main.Loading();
			Main.Aid = b;
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserInfo"}]', function (c){
				if (b != Main.Aid){
					return
				}
				Main.Ready();
				if (c != ""){
					c = JSON.parse(c);
					Main.Countries = c.countries;
					Main.UserForm(c.user)
				}else{
					swal("Error","<?= $lang_resource['MOBILE_MYACCOUNT_ERROR'] ?>","error");
				}
				Main.Ga("/profile/edit")
			})

		}
    },
    UserForm: function (b){
        Forms.Clean("user", "popupmainbuttonok");
        Main.ActiveForm = "user";
        Uploader.Clean();
        GoogleMap.Clean();
        Forms.Form.user.user = b;
		Visuals.EditRegister(b);
    },
    PreUserForm: function (){
		document.getElementById("pop_submit_btn").onclick = function (){
            Main.TryToStartSaveUser(b.id)
        };
        var b = Forms.Form.user.user;
        var a;
        if (b == null){
            b = new Object()
        }else{			
            Main.PopulateCitySelect(b.country, b.city)
            if(Main.settingfront.tab_delivery_neighborhood == 't')
				Main.PopulateAddressSelect2(b.country,b.city,0,b.colony);
        }
        Forms.CreateValue("user", "location", b.location);
        if (b.location == "" || b.location == null){
            a = new Object();
            a.latitud = 30.977609;
            a.longitud = -43.080139;
            a.zoom = 1
        }else{
            a = JSON.parse(b.location)
        }
        GoogleMap.Init("mapboxuser", a.latitud, a.longitud, a.zoom, Main.UserLocationUpdated)
    },

    UserLocationUpdated: function (a)
    {
        Forms.UpdateValue("user", "location", JSON.stringify(a), true);
        if (Forms.CanSave("user"))
        {
            Forms.EnableSubmitButton(true)
        }
        else
        {
            Forms.EnableSubmitButton(false)
        }
    },
    UserImageSelected: function (b, a)
    {
        Forms.UpdateValue("user", "imgupload" + a, b, true);
        if (Forms.CanSave("user"))
        {
            Forms.EnableSubmitButton(true)
        }
        else
        {
            Forms.EnableSubmitButton(false)
        }
    },
    UserImageUploadFinished: function (b)
    {
        Response = JSON.parse(b);
        if (Response.status == "no files selected")
        {
            Main.SaveUser()
        }
        else
        {
            var c = true;
            for (var a in Response)
            {
                if (Response[a].status == "failed")
                {
                    c = false
                }
            }
            if (c)
            {
                Main.SaveUser(Response[0].name)
            }
        }
    },
    UserImageStartUpload: function ()
    {
        Forms.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9))
        {
            Main.Loading()
        }
    },
    IsEmail: function (b)
    {
		b = b.trim();
        var a = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
        return a.test(b)
    },
    TryToStartSaveUser: function (a){ 

		Forms.Form['user'].fields['countryregister'].value = document.getElementById("countryregister").value;	
		Forms.Form['user'].fields['cityregister'].value = document.getElementById("cityregister").value;
		Forms.Form['user'].fields['colony'].value = document.getElementById("colony").value;
		Forms.Form['user'].fields['cp'].value = document.getElementById("cp").value;
		Forms.Form['user'].fields['street'].value = document.getElementById("street").value;

        var b = document.getElementById("email");
        var c = b.value;
		
		if(document.getElementById("name").value == "") {
			swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_NAME'] ?>","error");
			document.getElementById("name").focus();
		}else if(document.getElementById("lastname2").value == "") {
			swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_LAST_NAME'] ?>","error");
			document.getElementById("lastname2").focus();
		}else if(document.getElementById("email").value == ""){
			swal("Error","<?= $lang_resource['valid_email_V2'] ?>","error");
			document.getElementById("email").focus();
		}else if(document.getElementById("pwd").value == ""){
			swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_PASSWORD'] ?>","error");
			document.getElementById("pwd").focus();
        }else if(document.getElementById("street").value == ""){
        	swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_STREET'] ?>","error");
			document.getElementById("street").focus();
        }else if(Forms.Form['user'].fields['colony'].value== ""){
        	swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_COLONY'] ?>","error");
			document.getElementById("colony").focus();
        }else if(document.getElementById("cp").value == ""){
        	swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_CP'] ?>","error");
			document.getElementById("cp").focus();
        }else if(Forms.Form['user'].fields['countryregister'].value == ""){
        	swal("Error","<?= $lang_resource['FRONT_SELECT_YOUR_COUNTRY'] ?>","error");
			document.getElementById("countryregister").focus();
        }else if(Forms.Form['user'].fields['cityregister'].value== ""){
        	swal("Error","<?= $lang_resource['FRONT_SELECT_YOUR_CITY'] ?>","error");
			document.getElementById("cityregister").focus();
        }else if(document.getElementById("cel").value == ""){
        	swal("Error","<?= $lang_resource['FRONT_ENTER_YOUR_MOBILE'] ?>","error");
			document.getElementById("cel").focus();
        }else{
			if (Main.IsEmail(c)){ 
				Main.Loading(true);
				if (a){
					a = "&id=" + a
				}else{
					a = ""
				}

				$.post("panel/lib/front-main.php", "f=GetEmailAvailability&email=" + c + a, function (d){
					Main.Ready();
					Forms.Form.user.fields.email.value =  document.getElementById("email").value;
					Forms.Form.user.fields.name.value =  document.getElementById("name").value;	
					if (d.trim() == "ok"){
						Main.SaveUser();
					}else{
						swal("Error","<?= $lang_resource['email_repeated_V2'] ?>","error");
						document.getElementById("email").focus();
					}
				})
			}else{
				//Create acount
				swal("Error","<?= $lang_resource['valid_email_V2'] ?>","error");
				document.getElementById("email").focus();
			}
		}

    },
    RegisterChoiceType: function(val){
    	Main.RegisterType = val
    	Main.EditAccount(true);
    },	
	ChooseTypeRegister: function ()
    {
        $("#main").show();
        //check type of user selected
        if($('#t1').is(':checked'))
        {
            Main.RegisterType = 1; //normal user
            
        }
        else if($('#t2').is(':checked'))
        {
            
            Main.RegisterType = 2; //business owner
        }
        else
        {
            
            alert("<?=$lang_resource['BUSINESS_OWNER_VALIDATION_MSG']?>")
            return false;
        }
        
        Main.EditAccount(true);
        
        if(viewDevice=="Mobile")
        {
            Popup.OnCancel();
            
        }
        
    },
	
    SaveUser: function (Img){ 
		var counregis = document.getElementById("countryregister").value;
		var cityregis = document.getElementById("cityregister").value;
		var celno = document.getElementById("cel").value;
		Forms.CreateValue("user", "country", "");
		Forms.UpdateValue("user", "country", counregis)
		Forms.CreateValue("user", "city", "");
		Forms.UpdateValue("user", "city", cityregis)
			        

        if (Forms.CanSave("user") == false){
            return
        }

        delete Forms.Form.user.user;
		delete Forms.Form.user.fields.countryregister;
		delete Forms.Form.user.fields.cityregister;
			
		if (Forms.Form.user.type == "create"){
			Forms.CreateValue("user", "level", "");
	     	Forms.UpdateValue("user", "level", 3)
		
			if(Main.RegisterType){
				if(Main.RegisterType==1){
					Forms.Form.user.fields.level.value = 3;
				}else if(Main.RegisterType==2){
					Forms.Form.user.fields.level.value = 2;
				}
				//delete Main.RegisterType;
			}		
		}	
		
		if(document.getElementById("showImage") && document.getElementById("showImage").value !="") {
	    	Forms.Form.user.image = document.getElementById("showImage").value;
	    }

	    if(Main.smsactivation != '1'){
        	var After = "Popup.Close();";
		}
		
        if (Forms.Form.user.type == "create"){			
            document.getElementById("loginemail").value = Forms.Form.user.fields.email.value;
            document.getElementById("loginpassword").value = Forms.Form.user.fields.pwd.value;
			
			if(Main.smsactivation != '1'){
				if(Main.chk == 1){
					After += "Main.Login()"
				}else{
					After += "Main.LoginSection(1)"
				}
				
			}
        }else{
            After += "Main.UpdateUserInfo()"
		}
        Main.Loading(true);

		Forms.Form.user.fetchenterprise = Main.fetchenterprise;
	
        $.post("panel/lib/front-main.php", "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), function (Data){
			
			Data = JSON.parse(Data);			
			var k = JSON.stringify(Data.userlevel);	
            Main.Ready();					
            eval(After);
			return true;
        });
        Uploader.Clean();
        Forms.Clean("user");
        GoogleMap.Clean();
		if(Main.smsactivation == '1'){
			Visuals.smsActivation(celno);
		}
    },
    UpdateUserInfo: function (){
		
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"}]', function (b){
		
            if (a != Main.Aid){
                return
            }
            if (b != ""){				
                Main.User = JSON.parse(b).user;	
                MyAccount.Start();
            }
        })
    },
	smsActive: function (){
		Main.code=document.getElementById("smscode").value;
		$.post("panel/lib/front-main.php", "f=smsValidation&data=" + Main.code, function (s){	
			var smstrue	=JSON.parse(s).value;
			if(smstrue=='1'){
				var email	=JSON.parse(s).username;
				var password	=JSON.parse(s).password;
				Main.loginid=email;
				Main.passid=password;
				Main.sms="1";
				Popup.Close();
				Main.Login();
			}else{
				swal("Error","You have entered wrong activation code! ","error");
				return
			}
		})
	},	
    CheckOrder: function (c){
		var b = document.getElementById("consultorder");
		var a = b.value;
		b.value = "";
		if(a){	
			if(viewDevice == "Desktop") {
				Main.OpenOrder(a,true)
			}
			else if(viewDevice == "Mobile") {
				Visuals.OpenOrder(a,true)
			}		
								   
		}else{
			swal("Error","<?= $lang_resource['FRONT_TRACK_ORDER'] ?>","error");
		}
		document.getElementById("consultorder").value = a;
	},
    CheckOrderEnter: function (c){
        k = (document.all) ? c.keyCode : c.which;
        if (k == 13){
            var b = document.getElementById("consultorder");
            var a = b.value;
            b.value = "";
            Main.OpenOrder(a,true)
        }
    },
    OpenOrder: function(a,fromInput){
		Main.Loading(true);
        var b = new Date().getTime();
        Main.Aid = b;
        var htms =''
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchOrderData","id":' + a + "}]", function (d){

            if (b != Main.Aid){
                return
            }
            Main.Ready(true);
            Main.Ga("/orders/open/" + a);
            if (d != "" && d != '{"order":null}'){
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
				if(!Main.Temp.Order.statusshow){
					swal("Error","<?= $lang_resource['FRONT_NO_PERMISSION_TO_SHOW_ORDER'] ?>","error");
					return
				}			
				document.getElementById("consultorder").value = a
				$(".odrstus").html(Main.Temp.Order.status)
				$(".showOrdhide").show()
				$(".show_order").show()
			}else{
				$(".odrstus").html("")
				$(".showOrdhide").hide()
				swal("Error","<?= $lang_resource['NO_PERMISSION_V2'] ?>","error")
			}
		});
	},
	OpenOrderConfirm: function(a){
		Main.Loading(true);
        var b = new Date().getTime();
        Main.Aid = b;
        var htms =''
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchOrderData","id":' + a + "}]", function (d){

            if (b != Main.Aid){
                return
            }
            Main.Ready(true);
            Main.Ga("/orders/open/" + a);
            if (d != "" && d != '{"order":null}'){
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
                Visuals.OpenEachOrderByID();		
			}
		});
	},
	MyorderCalculation: function(){
		var e;
		var d;
		var a;
		var c;
		for (j in Main.Temp.PseudoCart.business){
			Dishes = Main.Temp.PseudoCart.business[j].dishes;
			for (i in Dishes){
				e = Dishes[i].ingredients;
				d = Dishes[i].extras;
				Tags.CreateContainer(i + "_" + Dishes[i].id + "_pseudoingredients");
				Tags.CreateContainer(i + "_" + Dishes[i].id + "_pseudoextras");
				for (k in e){
					a = e[k].caption.toLowerCase();
					a = a.charAt(0).toUpperCase() + a.slice(1);
					Tags.CreateTag(i + "_" + Dishes[i].id + "_pseudoingredients",{
						id: e[k].id,
						caption: a,
						cclass: "ingredient",
						enabled: e[k].enabled,
						dishindex: i,
						businessindex: j,
						ingredientindex: k
					}, true)
				}
				for (k in d){
					a = d[k].name.toLowerCase();
					a = a.charAt(0).toUpperCase() + a.slice(1);
					Tags.CreateTag(i + "_" + Dishes[i].id + "_pseudoextras",{
						id: d[k].id,
						caption: a,
						cclass: "extra",
						enabled: d[k].enabled,
						dish: Dishes[i].id,
						price: d[k].price,
						enabled: d[k].enabled,
						dishindex: i,
						businessindex: j,
						extraindex: k
					}, true)
				}
			}
		}
	},
    OpenOrder1: function (a,fromInput)
    {

        Main.Loading(true);
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchOrderData","id":' + a + "}]", function (d)
        {

            if (b != Main.Aid)
            {
                return
            }
            Main.Ready(true);
            Main.Ga("/orders/open/" + a);
            if (d != "" && d != '{"order":null}')
            {
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
				if(!Main.Temp.Order.statusshow){
					swal("Error","<?= $lang_resource['FRONT_NO_PERMISSION_TO_SHOW_ORDER'] ?>","error");
					return;
				}

                var c = "";



				c += '<div class="popup_wrapper">'
                c += '<div class="pop_header">';
                c += '<div class="pop_heading"><h3><?= $lang_resource['Order_V2'] ?> ' + Main.Temp.Order.id + " (" + Main.Temp.Order.status + ')</h3></div>';
				if( Main.Temp.Order.bpermission == "t") {
				c += '<div class="reorder_track"><button type="button" class="reorder" onclick="Main.Reorderalert(' + Main.Temp.Order.id + ')"><?= $lang_resource['TRACK_REORDER'] ?></button></div>';
				}


				if((Main.Temp.Order.gprs_url!=null) && (Main.Temp.Order.statnum==4))
				{

				c+= '<div class="btota" ><a style="color:#FFF;font-weight:bold;" href="'+ Main.Temp.Order.gprs_url +'" target="_blank"><?=$lang_resource['FRONT_TRACK_DRIVER_GPS'];?></a></div>';
				}


        c += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	c += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
        c += '</div>';
    c += '</div>';
	
	if(Main.Temp.Order.requestcollectiondata!=true){
	if(Main.Temp.PseudoCart.business[0].dishes != ""){
		c += '<div class="pending_ord">';
	//c += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';
		
		c += '<div class="row">';
    	c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['LOGIN_CREATE_NAME'] ?></label> <input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name) + '" READONLY/></div>';
        c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></label> <input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.email) + '" READONLY/></div>';        
       c += '</div>';
	   
	   c += '<div class="row">';
    	c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['LOGIN_CREATE_STREET'] ?></label> <input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address) + '" READONLY/"></div>';
        c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></label> <input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel) + '" READONLY/></div>';        
       c += '</div>';
	   
	   c += '<div class="row">';
    	c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] ?></label> <textarea class="field_area_pop" readonly>' + Main.NullToEmpty(Main.Temp.Order.comment) + '</textarea></div>';
        c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['FRONT_DRIVER_COMMENTS'] ?></label> <textarea class="field_area_pop" readonly>' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + '</textarea></div>';        
       c += '</div>';
	   
	   c += '<div class="row">';
    	c += '<div class="col-md-6 pending_dv"><label><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_USER_HEADER'] ?></label> <textarea class="field_area_pop" readonly>' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '</textarea></div>';
        c += '<div class="col-md-6 pending_dv"></div>';        
       c += '</div>';
		
      /*c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_NAME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.email) + '" READONLY/></td>';
     c += '</tr>';*/
	 
	 

	 /*c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_STREET'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address) + '" READONLY/"></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel) + '" READONLY/></td>';
      c += '</tr>';*/

      /*c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_COMMENTS'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><textarea class="field_area_pop" readonly>' + Main.NullToEmpty(Main.Temp.Order.comment) + "</textarea></td>";
        c += '<td><textarea class="field_area_pop" readonly>' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + "</textarea></td>";
     c += '</tr>';*/

	 /*c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_USER_HEADER'] ?></span></td>';
       c += '<td align="left"><span class="pop_label"></span></td>';
     c += '</tr>';

	  c += '<tr>';
        c += '<td><textarea class="field_area_pop" readonly>' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + "</textarea></td>";
        c += '<td></td>';
     c += '</tr>';*/

    //c += '</table>';
    c += "</div>";

	c += '<div id="cartresultsinner_track">';
                c += "</div>";

	}

	if(Main.Temp.PseudoCart.reservestatus){

		c += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">'

		c += '<tr>';
		c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_NAME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></span></td>';
		c += '</tr>';

		c += '<tr>';
		c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.name) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.email) + '" READONLY/></td>';
		c += '</tr>';

		c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?> :</span></td>';
		c += '</tr>';

		c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.tel) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rdate) + '" READONLY/"></td>';
		c += '</tr>';

		c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_TIME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"></span></td>';
		c += '</tr>';

		c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="'  + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rhour) + ':'+ Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rmin) + '" READONLY/"></td>';
        c += '<td></td>';
		c += '</tr>';

		c += '</table>';





				c += '<table cellpadding="7"  class="pop_tbl track_tbl1" border="1" style="margin: 0 auto;border-spacing:0;border-collapse:collapse;border-style:solid;" width="95%"><tbody>';
        c += '<tr><th align="center"><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></th><th align="center"><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></th><th align="center"><?= $lang_resource['FRONT_RESERVATION_FREE'] ?></th><th align="center"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></th><th align="center"><?= $lang_resource['Price_V2'] ?></th></tr>';
				    c += '<tr><td align="center">'+Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Table)+'</td></td>'

                    c += '<td align="center">'+Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Room)+'</td>'
					 c += '<td align="center">'+Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Free)+'</td>'

                    c += '<td align="center">'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Table.length+'</span><span>  X  </span><span>'+(Main.NullToEmpty(Main.Temp.Order.tableprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.tableprice)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Room.length+'</span><span>  X  </span><span>'+(Main.NullToEmpty(Main.Temp.Order.roomprice)=="")? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.roomprice+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_FREE'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Free.length+'</span><span>  X  </span><span>'+Main.NullToEmpty(Main.Temp.Order.freeprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.freeprice+'</span><br>'
					}
					c += '</td>'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					var tableprice = Main.Temp.PseudoCart.reserveQty.Table.length * Main.Temp.Order.tableprice;
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					var roomprice = Main.Temp.PseudoCart.reserveQty.Room.length * Main.Temp.Order.roomprice ;
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					var freeprice = Main.Temp.PseudoCart.reserveQty.Free.length * Main.Temp.Order.freeprice ;
					}
					c += '<td align="center">'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					if(tableprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					if(roomprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					if(freeprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					}

					c +='</td>'
                    c += "</tr>";

                c += '<tr><td colspan="4" align="right">&nbsp;<?= $lang_resource['EXPORT_TOTAL'] ?>&nbsp;</td><td align="center" style="font-weight:bold;font-size:16"><?= $lang_resource['Panel_Currency'] ?>  '+parseFloat(Main.Temp.PseudoCart.reserveFee).toFixed(Main.IS_DECIMAL_POINT)+'</td></tr>'

                c += "</tbody></table>"
				c += "</td></tr>"
				c +="</tbody></table>"
				}
	}else{
		
		c += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';
						c += '<tr>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] ?>:</span></td>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?>:</span></td>';
				c += '</tr>';
			  c += '<tr>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_name) + '" READONLY/></td>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_postcode) + '" READONLY/></td>';
				 c += '</tr>';
				 	c += '<tr>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] ?>:</span></td>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] ?>:</span></td>';
				c += '</tr>';
			  c += '<tr>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_address1)+','+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_address2) + '" READONLY/></td>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_contactno) + '" READONLY/></td>';
				 c += '</tr>';
				 	c += '<tr>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] ?>:</span></td>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?>:</span></td>';
				c += '</tr>';
			  c += '<tr>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_name) + '" READONLY/></td>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_postcode) + '" READONLY/></td>';
				 c += '</tr>';
				 	c += '<tr>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] ?>:</span></td>';
				c += '<td align="left"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] ?>:</span></td>';
				c += '</tr>';
			  c += '<tr>';
					c += '<td><input type="text" class="field_text_pop" placeholder=""  value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_collection_time) + '" READONLY/></td>';
					c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_other_value) + '" READONLY/></td>';
				 c += '</tr>';
				 	c += '<tr>';
				c += '<td align="left" colspan="2" style="padding:4px 0 !important"><span class="pop_label"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] ?>:</span></td>';
			
				c += '</tr>';
				   c += '<tr>';
					c += '<td colspan="2" style="padding:4px 0 !important"><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_other_reference) + '" READONLY/></td>';
				
				 c += '</tr>';
				  c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_COMMENTS'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.Order.comment) + "</textarea></td>";
        c += '<td><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + "</textarea></td>";
     c += '</tr>';

	 c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_USER_HEADER'] ?></span></td>';
       c += '<td align="left"><span class="pop_label"></span></td>';
     c += '</tr>';

	  c += '<tr>';
        c += '<td><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_note) + "</textarea></td>";
        c += '<td></td>';
     c += '</tr>';
				 
		    c += '</table>';
			c += '<div id="cartresultsinner_track">';
			
                c += "</div>";
				c += '<div >';
			  c += '<h3 class="text_center restaurant-name" style=" font-size:22px;">' + Main.Temp.PseudoCart.resturent.resturent_name.toUpperCase() + "</h3>";
			  c += '<p class="text_center drv_comment"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?><span> <?=$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPAL']?></span></p>';
                c += "</div>";
				
		
		
	}			

		   c += '<div class="pop_footer">';
		   c += '<button type="button" class="close_btnt" onclick="Popup.Close()"><?= $lang_resource['CLOSE_V21'] ?></button>';
		   c += '<div class="fcustom_text" ><?= $lang_resource['Your_Total_V2'] ?> :</div>';
		   if(Main.Temp.Order.requestcollectiondata!=true){
		   c += '<div class="fcustom_total" >' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(Main.IS_DECIMAL_POINT),'') + "</div>";
		   }else{
			     c += '<div class="fcustom_total" >' + Shopping.FormatPrice(parseFloat(Main.Temp.Order.deliveryprice).toFixed(Main.IS_DECIMAL_POINT)) + "</div>";
		   }
		   c += '</div>';

                c += "</div>";




          Main.ordpopdt = c;


		  document.getElementById("consultorder").value = a;

		$(".odrstus").html(Main.Temp.Order.status);
		$(".showOrdhide").show();
            }
            else
            {
		$(".odrstus").html("");
		$(".showOrdhide").hide();
				swal("Error","<?= $lang_resource['NO_PERMISSION_V2'] ?>","error");
            }
        })
    },



	Reorderalert: function (id) {
		ask = confirm("<?=$lang_resource['REORDER_CONFIRM_ALERT']?>");
		if(ask == true) {
			Main.Reorder(id)
		}else {
			return false;
		}
	},
	Reorder: function (id){
		Main.Loading(true);
		$.post("panel/lib/front-main.php", "f=ReorderSend&id=" + id, function (f){
			var shs = Blist.ShoppingHeaderDesignNavigationHtml();
			var sch = Blist.ShoppingHeaderBusinessSearchHtml();

			document.getElementById("left").innerHTML = '<div class="cntnr_div_whle"><div class="cntnr_div"><div id="headerSearch">'+sch+'</div></div><div class="rest-body">														<div id="shoppingbox"  class="main"></div></div></div>';
			document.getElementById("top").innerHTML = shs;
			document.getElementById("right").style.display = "none";
			document.getElementById("showcanvas").style.display = "none";

			Main.Ready(true);


			document.getElementById("payNumber").value = 1;

			var errorSMSPanelConfig = false;
			var errorSMSToUser = false;
			var errorSMSToBusiness = false;
			var id = null;
			var showConfigureSMSPlugInPopUp = false;
			var showConfigureSMSPlugInPopUpText = "<?=$lang_resource['SHOPPING_CONFIGURE_YOUR_SMS_PLUG'];?>";
			var errorSMSToUserText = "<?= $lang_resource['SMS_ERROR_V2'] ?>";
			var result = null;

			Popup.Close();


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




				$.post("panel/lib/front-main.php", "f=FetchOrder&id=" + id, function (c) {
					if(viewDevice != "Mobile") {
						$("#frontvisual").empty();
						$("#main").show();

						Checkout.ShowConfirm(id,c,chk)
					}else{
						RestMenuList.ShowConfirmMob(id,c,chk)
					}
				});
			}
		})
	},
    

    ShowOrderPop: function()
    {
		$(".popdiv").hide();
	if(Main.ordpopdt != "") {
	 Popup.ShowTrack(700, 700, Main.ordpopdt, null, function ()
        {
		    document.getElementById("hedlogbox").style.display=""
            Main.Ga(Main.ActiveView)
        }, function ()
        {

            Visuals.PopulatePseudoCart()
        });
	}
    },

	RecocerPassSend: function (c, b, i1, i2, i3){
		if (!Main.IsEmail(Forms.Form.recover.fields.email.value)){
			swal("Error","<?= $lang_resource['valid_email_V2'] ?>","error");
		}else{
			var b = new Date().getTime();
			Main.Aid = b;
			Main.Loading(true);
			$.post("panel/lib/front-main.php", "f=RecoverPassword&email=" + Forms.Form.recover.fields.email.value, function (c){ 
				if (b != Main.Aid){ 
					return
				}
				Main.Ready(true);
				var sp = c;

				if(sp.trim()=="ok"){
					Forms.Clean("recover");
					swal("Great!","<?= $lang_resource['PASSWORD_SENT1'] ?>","success");
					Popup.Close();
				}else{
					swal("Error","<?= $lang_resource['EMAIL_INCORRECT'] ?>","error");
				}
			})
		}
	},

	ChangePassSend: function (){
		if(Forms.Form.change.fields.current.value=='' && Forms.Form.change.fields.newpwd.value=='' && Forms.Form.change.fields.retype.value==''){
			swal("Error","<?= $lang_resource['ALL_FIELDS_SEARCH_VALIDATION_MSG'] ?>","error");
			return
		}else if (Forms.Form.change.fields.newpwd.value==''){
			swal("Error","<?= $lang_resource['ENTER_NEW_PASSWORD'] ?>","error");
			return
		}else if (Main.User.pwd!=Forms.Form.change.fields.current.value){
			swal("Error","<?= $lang_resource['VALID_PASSWORD'] ?>","error");
			return
		}else if (Forms.Form.change.fields.newpwd.value!=Forms.Form.change.fields.retype.value){
			swal("Error","<?= $lang_resource['MATCH_PASSWORD'] ?>","error");
			return
		}else{
			var b = new Date().getTime();
			Main.Aid = b;
			Main.Loading(true);

			$.post("panel/lib/front-main.php", "f=ChangePassword&newpwd=" + Forms.Form.change.fields.newpwd.value +"&uid="+Main.User.id+"&email="+Main.User.email, function (c){ 
				if (b != Main.Aid){ 
				return
				}
				Main.Ready(true);
				var sp = c;
				if(sp.trim()=="ok"){
					Main.User.pwd=Forms.Form.change.fields.newpwd.value;
					Forms.Clean("change");
					swal("Error","<?= $lang_resource['PASSWORD_SENT'] ?>","success");
					Main.LogOut()
				}else{
					swal("Error","<?= $lang_resource['PASSWORD_INCORRECT'] ?>","error");
				}

			})
		}
	},




	 BrowseCity: function(){
	 	Main.RedirectToCity = document.getElementById("Browsecity").value;

			a = new Object();
			a.latitud = 30.977609;
			a.longitud = -43.080139;
			a.zoom = 1

			GoogleMap.Init("mapbox1", a.latitud, a.longitud, a.zoom, Main.WhereAmILocationUpdated)
			var countryValue='';
			for(z in Main.countrycity){

			for(l in Main.countrycity[z].cityname){
			if( Main.RedirectToCity==Main.countrycity[z].cityname[l].id){
			countryValue=Main.countrycity[z].countryname;

			}
			}
			}
			Main.deliveryType ="citysearch"
			Main.searchType ="Ordinary";
			Shopping.ActiveBusiness = '';
			Shopping.RedirectToCity = Main.RedirectToCity
			var cityname = document.getElementById("Browsecity").options[document.getElementById("Browsecity").selectedIndex].text;
			if(GoogleMap.MapApiLoaded == true) {


			Main.WhereAmIData = new Object();
			var geocoder = new google.maps.Geocoder();

			// var countryValue = document.getElementById("countryValue").value;
			var address = cityname;
			var address =cityname+','+countryValue;

			geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK)
			{


			Main.WhereAmIData.location = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":15}');

			$.post("panel/lib/front-main.php", "f=FetchCountry&city=" + Main.RedirectToCity, function (e) {

			e= JSON.parse(e)
			Main.WhereAmIData.country = e.country
			});


			Main.WhereAmIData.city = Main.NullToEmpty(Main.RedirectToCity);
			Shopping.Start1();

			}
			});


			}




	 },
    ShowPhotos: function (c, b, i1, i2, i3)
    {
		var d='';
		if(i1==1){
         	d = "background-image:url('panel/images/" + c + "/" + b + "/1/preview.jpg?c=" + Main.Random + "');";
		}
		else{
		  	d = "background-image:url('panel/images/dummy/preview_img.jpg');";
		}
        var a = '<div class="previewbox">';
        a += '<div id="photopreview" class="preview" style="' + d + '"></div>';
        a += "</div>";
        a += '<div class="previewnumbersbox nonselectable"><span class="number hand" id="photopreview_number_1">1</span><span class="number hand" id="photopreview_number_2">2</span><span class="number hand" id="photopreview_number_3">3</span></div>';
        Popup.Show(363, 405, a, null, function ()
        {
			if(document.getElementById("popupmainbuttonok")){	
            document.getElementById("popupmainbuttonok").style.display = "block";
			}
            $("#popupbox").find(".innerbox").removeClass("nobg").find(".content").removeClass("noborder")
        }, function ()
        {
			if(document.getElementById("popupmainbuttonok")){	
            document.getElementById("popupmainbuttonok").style.display = "none";
			}
            $("#popupbox").find(".innerbox").addClass("nobg").find(".content").addClass("noborder");
            $("#photopreview_number_1").click(function ()
            {
                Main.ChangePhotoPreview(c, b, "1", i1)
            });
            $("#photopreview_number_2").click(function ()
            {
                Main.ChangePhotoPreview(c, b, "2", i2)
            });
            $("#photopreview_number_3").click(function ()
            {
                Main.ChangePhotoPreview(c, b, "3", i3)
            })
        })
    },
    ChangePhotoPreview: function (b, a, c, flug)
    {
		if(flug==1){
        document.getElementById("photopreview").setAttribute("style", "background-image:url('panel/images/" + b + "/" + a + "/" + c + "/preview.jpg?c=" + Main.Random + "');")
		}
		else{
		document.getElementById("photopreview").setAttribute("style", "background-image:url('panel/images/dummy/preview_img.jpg');")
		}
    },
    LogOut: function ()
    {
        Main.Loading();
        $.post("panel/login/logout.php", "", function ()
        {
            Main.User = null;
            Main.Ga("/logout");
            top.location = "/"
        })
    },
	 LogOutMob: function ()
    {
        Main.Loading();
        $.post("panel/login/logout.php", "", function ()
        {
            Main.User = null;
            Main.Ga("/logout");
            top.location = "./mobile.php";
        })
    },
    Quote: function (a)
    {
        return "'" + a + "'"
    },
    IsNavigator: function (a, b)
    {
        if (this.ClientBrowserName == a)
        {
            if (b == "*")
            {
                return true
            }
            else
            {
                if (this.ClientBrowserVersion <= b)
                {
                    return true
                }
                else
                {
                    return false
                }
            }
        }
        else
        {
            return false
        }
    },
    IsNumber: function (a)
    {

        return !isNaN(a - 0)
    },
    TitleCase: function (a)
    {
		if((a!=null)&&(a.trim()!='')){
			return a.replace(/\w\S*/g, function (b)
			{
				return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
			})
		}else{
			return a;
		}
    },
    NullToEmpty: function (a)
    {
        if (a != null)
        {
            return a
        }
        else
        {
            return ""
        }
    },
    Loading: function (b)
    {
        this.Busy = true;
        $("body").addClass("loading");
        $(".hand").each(function ()
        {
            $(this).addClass("loading")
        });
        $(".default").each(function ()
        {
            $(this).addClass("loading")
        });
        $(":input").each(function ()
        {
            $(this).addClass("loading")
        });
        $("#loadingbox").show();
        /*var d = "";
        if (b)
        {
            d = "popup"
        }
        var a = document.getElementById(d + "progressbox");
        if (a)
        {
            a.style.display = "block"
        }*/
        //c();
       /* var e = this;*/

       /* function c()
        {
            var f = document.getElementById(d + "progressbar");
            if (f)
            {
                f.style.width = "2%";
                $(f).animate(
                {
                    width: "100%"
                }, 500, function ()
                {
                    if (e.Busy)
                    {
                        c()
                    }
                })
            }
        }*/
    },
    Ready: function (a)
    {
        this.Busy = false;
        $("body").removeClass("loading");
        $(".hand").each(function ()
        {
            $(this).removeClass("loading")
        });
        $(".default").each(function ()
        {
            $(this).removeClass("loading")
        });
        $(":input").each(function ()
        {
            $(this).removeClass("loading")
        });
        $("#loadingbox").hide();
        /*var b;
        if (a)
        {
            b = document.getElementById("popupprogressbox")
        }
        else
        {
            b = document.getElementById("progressbox")
        }
        if (b)
        {
            b.style.display = "none"
        }*/
    },
    Request: function (To, Container, Vars, OnComplete)
    {
        Main.Loading();
        Forms.EnableSubmitButton(false);
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("panel/lib/" + To + ".php", Vars, function (Data)
        {
            if (MyAid != Main.Aid)
            {
                return
            }
            Main.Ready();
            if (Container != null)
            {
                document.getElementById(Container).innerHTML = Data
            }
            if (OnComplete)
            {
                eval(OnComplete)
            }
        })
    },
    GetPropertyValueOnPropertyValueFound: function (b, a, e, d)
    {
        for (var c in b)
        {
            if (b[c][a] == e)
            {
                return b[c][d]
            }
        }
        return ""
    },
	
	
		getDocHeight: function(doc) {
    doc = doc || document;
    // stackoverflow.com/questions/1145850/
    var body = doc.body, html = doc.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
},

setIframeHeight: function() {
	alert("sd")
    var ifrm = document.getElementById("ifrm");
    var doc = ifrm.contentDocument? ifrm.contentDocument: 
        ifrm.contentWindow.document;
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = "10px"; // reset to minimal height ...
    // IE opt. for bing/msn needs a bit added or scrollbar appears
    ifrm.style.height = Main.getDocHeight( doc ) + 4 + "px";
    ifrm.style.visibility = 'visible';
},
	
	
	GetPropertyValueOnPropertyValueFoundForIds: function (b, a, e, d)
    {			
        for (var c in b)
        {
			var arr = b[c][a];
			arr = arr.split(",")			
			if(arr.indexOf(e)!=-1){			
                return b[c][d]
            }
        }
     
    },
	
	
    GetIndexOnPropertyValueFound: function (b, a, d)
    {
        for (var c in b)
        {
            if (b[c][a] == d)
            {
                return c
            }
        }
        return -1
    },
    SortByProperty: function (a)
    {
        return function (b, c)
        {
            if (Main.IsNumber(b[a]))
            {
                return (parseInt(Main.NullToEmpty(b[a])) < parseInt(Main.NullToEmpty(c[a]))) ? -1 : (parseInt(Main.NullToEmpty(b[a])) > parseInt(Main.NullToEmpty(c[a]))) ? 1 : 0
            }
            else
            {
                return (Main.NullToEmpty(b[a]).toLowerCase() < Main.NullToEmpty(c[a]).toLowerCase()) ? -1 : (Main.NullToEmpty(b[a]).toLowerCase() > Main.NullToEmpty(c[a]).toLowerCase()) ? 1 : 0
            }
        }
    },
    Ga: function (c, a)
    {
        c = RemoveAccents(c.replace(/\s/g, "").toLowerCase());
        var b = Main.GetConfigValue("ga");
        if (Main.WhereAmIData)
        {
            if (Main.WhereAmIData.ga && !a)
            {
                _gaq.push(["_setAccount", b], ["_trackPageview", c], ["_setAccount", Main.WhereAmIData.ga], ["_trackPageview", c])
            }
            else
            {
				var _gaq = new Array();
                _gaq.push(["_setAccount", b], ["_trackPageview", c])
            }
        }
        else
        {
			var _gaq = new Array();
            _gaq.push(["_setAccount", b], ["_trackPageview", c])
        }
    },
	SaveWhereAmIReservation: function(){


		 Main.Loading(true);
		 $.post("panel/lib/front-main.php", "f=getPostcode&data=" + JSON.stringify(Main.WhereAmIData.location), function (h)
        {


			Main.WhereAmIData.zipcode = h;

		});
        $.post("panel/lib/front-main.php", "f=SaveWhereAmI&data=" + JSON.stringify(Main.WhereAmIData), function (b)
        {

            Main.Ready(true);
            $("#top").html("");
			//direct link creation start
			var custom_link = "<?=base64_encode('SearchBy')?>_";;
if(Main.WhereAmIData.address) {
			if(Main.settingfront.tab_delivery_neighborhood == 't') {
			 custom_link += $("select[id='address'").find('option:selected').text().split(" ").join("-");
			} else {
			 custom_link += Main.WhereAmIData.address.split(" ").join("-");		
				}
			
			}
		if(Main.WhereAmIData.cityname) {
			custom_link +=   "_"+Main.WhereAmIData.cityname.split(" ").join("-");
			}
		if(Main.WhereAmIData.country) {

			var con = Main.GetIndexOnPropertyValueFound(Main.Countries, "id", Main.WhereAmIData.country);
			custom_link +=   "_"+Main.Countries[con].name.split(" ").join("-");
			}
	
			custom_link +=   "_pickup";
			if(Main.WhereAmIData.location) {
			var locatserch = JSON.parse(Main.WhereAmIData.location)

			custom_link +=   "_"+locatserch.latitud;
			custom_link +=   "_"+locatserch.longitud;
			custom_link +=   "_"+locatserch.zipcode;
			custom_link +=   "_"+locatserch.zoom;
			
				  custom_link +=   "_-1";
			 
			}


       Main.searchlink = custom_link;
 Main.Loading();
		
		 $.post("panel/lib/front-main.php", "f=getPostcode&data=" + JSON.stringify(Main.WhereAmIData.location), function (h)
        {
			//alert(h)
			
			Main.WhereAmIData.zipcode = h;



		});
		
		
		
		console.log(JSON.stringify(Main.WhereAmIData));
			//resturants start
		var resturantsstr ='';
		if(Main.WhereAmIData.resturant.trim()!=''){
		var parsedresturants = JSON.parse(Main.WhereAmIData.resturant);
		var arrresturants = [];

			for(var x in parsedresturants){
			  arrresturants.push(parsedresturants[x]);
			}
			 resturantsstr = arrresturants.join(); 
		}

console.log(JSON.stringify(resturantsstr));
if(resturantsstr.trim()==''){
	 custom_link +=   "_-1";
}else{
	 custom_link +=   "_"+resturantsstr.trim();
}

		//resturants end
		//cuisine start
		var cuisinesstr ='';
		if(Main.WhereAmIData.cuisines.trim()!=''){
		var parsedcuisines = JSON.parse(Main.WhereAmIData.cuisines);
		var arrcuisines = [];

			for(var x in parsedcuisines){
			  arrcuisines.push(parsedcuisines[x]);
			}
			 cuisinesstr = arrcuisines.join(); 
		}

console.log(JSON.stringify(cuisinesstr));
if(cuisinesstr.trim()==''){
	 custom_link +=   "_-1";
}else{
	 custom_link +=   "_"+cuisinesstr.trim();
}

		//cuisine end
		//reservation start
		 custom_link +=   "_1";
	
		 if(Main.WhereAmIData.guest){
		  custom_link +=   "_"+ Main.WhereAmIData.guest;
		 }else{
			  custom_link +=   "_-1";
		 }
		  if( Main.WhereAmIData.rhour!='-1'){
			 
			  rdate= (Main.WhereAmIData.rdate.replace("/","-")).replace("/","-");
			
			   custom_link +=   "_"+ rdate;
		  }else{
			   custom_link +=   "_-1";
		  }
		  
		    custom_link +=   "_"+ Main.WhereAmIData.rhour;
			custom_link +=   "_"+ Main.WhereAmIData.rmin;
     
		//reservation end
		
		
		window.history.pushState( {"id":100} , "Business list", custom_link );
			//direct link creation end
			
            Shopping.Start1();
            Popup.Close()
        });

        Forms.Clean("whereami");
        GoogleMap.Clean();
        Main.RedirectToBusiness = null

	},
	SearchLocation2ndSave: function(){


        if (Forms.Form.whereamiress.fields.guest.value == ""){
        	swal("Error","<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_GUEST_FIELD'] ?>","error");
            return
        }
		if (document.getElementById("rdate").value == ""){
			swal("Error","<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_DATE'] ?>","error");
            return
        }
		if (Forms.Form.whereamiress.fields.rhour.value == ""){
			swal("Error","<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_HOUR_FIELD'] ?>","error");
            return
        }
		if (Forms.Form.whereamiress.fields.rmin.value == ""){
			swal("Error","<?= $lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_MINUTE_FIELD'] ?>","error");
            return
        }


		Main.WhereAmIData.reservation = true;
        Main.WhereAmIData.guest = Forms.Form.whereamiress.fields.guest.value;
        Main.WhereAmIData.rdate = document.getElementById("rdate").value;
        Main.WhereAmIData.rhour = Forms.Form.whereamiress.fields.rhour.value;
        Main.WhereAmIData.rmin = Forms.Form.whereamiress.fields.rmin.value;



		Main.SaveWhereAmIReservation();

	},
	SaveWhereReservationSkip: function(){
		Main.WhereAmIData.rhour = -1;
        Main.WhereAmIData.rmin = -1;
		 Main.WhereAmIData.reservation = true;
		Main.SaveWhereAmIReservation();
	},
	checkall: function() {
			var Checkall = false;
			
			for (var z in Shopping.Categories)
			{
			if(document.getElementById("business_category_all").checked) {
			var a = "business_category_switch_"+ Shopping.Categories[z].id;
			for(var tp in Shopping.CategoriesCustom) {
			Shopping.CategoriesCustom[tp].enabled = true;
			}
			Shopping.Categories[z].enabled = true;
			document.getElementById(a).checked = true;
			
			//Shopping.SetBusinessCategoryEnabled(a.replace("business_category_switch_", ""), true);
			
			Checkall = true;
			
			}
			else {
			
				var a = "business_category_switch_"+ Shopping.Categories[z].id;
				Shopping.Categories[z].enabled = false;
				for(var tp in Shopping.CategoriesCustom) {
				Shopping.CategoriesCustom[tp].enabled = false;
				}
				
				document.getElementById(a).checked = false;
			//	 Shopping.SetBusinessCategoryEnabledEach(a.replace("business_category_switch_", ""), false)
					Checkall = false;
				}
			}
			
			if(Checkall) {
			
			Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
			} else  {
				
				Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, false)
			}
			
			
			
 

},
	express5Km: function()
	{


		if(document.getElementById("expressi").checked==true)
		{

			 Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true,true)
		}
		else
		{
			 Blist.PopulateBusinessList(Shopping.Config.Business.List.SortBy, true)
		}
	},
	SubscribeEmail: function ()
		{
		var email = document.getElementById("sub_email").value;

		var re = /\S+@\S+\.\S+/;

		if(re.test(email)==false)
		{
			swal("Error","Enter a valid email","error");
		}
		else
		{

		$.post("panel/lib/front-main.php", "f=SubscribeEmail&email=" + email, function (Data)
		{
		alert(Data)
		});
		}


		},

		SubscribeEmailLanding: function ()
		{
			//alert("Hello");
		var email = document.getElementById("exampleInputEmail1").value;
		var username=document.getElementById("exampleInputName").value;
		var term= document.getElementById("check").checked;
		var postcode= document.getElementById("exampleInputPostcode").value;
		var regPostcode = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;
		var re = /\S+@\S+\.\S+/;
		if(username=="")
		{
			swal("Error","<?= $lang_resource['ALERT_USER_NAME_NON_EMPTY'] ?>","error");
			return false;
		}
		if(postcode=="")
		{
			swal("Error","<?= $lang_resource['ALERT_VALID_POSTAL_CODE_NON_EMPTY'] ?>","error");
			return false;
		}
		
		if(postcode != ""){
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchZipMAxMin"}]',function(bdb){
			 	if(bdb!=""){
			 		bdb = JSON.parse(bdb);
			 		Main.zipMAxMin = bdb.zipMAxMin;	
			 		if((postcode.length>parseInt(Main.zipMAxMin.zipvalmax))|| (postcode.length<parseInt(Main.zipMAxMin.zipvalmin)) ){
						swal("Error","<?= $lang_resource['ALERT_VALID_POSTAL_CODE_UK'] ?>","error");
						return;
					}else{
						$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchzipcodeValidation","zipcode":"' + postcode + '"}]', function (tt){		   
							if (tt != ""){
								
								Main.zipcodeValidation1 = JSON.parse(tt).zipcodeValidation;	
								var fieldarray=new Array();									
								if(Main.zipcodeValidation1["value"] !=""){									
									if(parseInt(Main.zipcodeValidation1["value"]) > 0 ){
										swal("Error","<?= $lang_resource['ALERT_VALID_POSTAL_CODE_UK'] ?>","error");								
										return false;
									}else{
										if(email==""){
											swal("Error","<?= $lang_resource['ALERT_USER_EMAIL_NON_EMPTY'] ?>","error");
											return false;
										}		

										if(re.test(email)==false){
											swal("Error","<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>","error");
											return false;
										}

										if(term==false){
											swal("Error","<?= $lang_resource['ALERT_TERM_NOT_CHECKED'] ?>","error");
											return false;
										}else{
											$.post("panel/lib/front-main.php", "f=SubscribeEmailLanding&email=" + email+"&name="+username+"&postcode="+postcode, function (Data){
										
												if(Data!="Your mail is already registered"){
													$("#myModal").modal('show');
													$("#name").text(username);
												}else{
													alert(Data);
												}
											});
										}
									}					 
								}else{
									swal("Error","<?= $lang_resource['ALERT_VALID_POSTAL_CODE_UK'] ?>","error");
									return;
								}											
							}
						});
					}		 	
			 	}
			});

		}

		


	},

    GetConfigValue: function (a)
    {
		var Config;
        return Main.GetPropertyValueOnPropertyValueFound(Config, "name", a, "value")
    },
    StripTags: function (a, c)
    {
        c = (((c || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
        var b = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            d = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return a.replace(d, "").replace(b, function (f, e)
        {
            return c.indexOf("<" + e.toLowerCase() + ">") > -1 ? f : ""
        })
    },
	MultiInputTagsChangeBusiness: function (d) {

        switch (d) {

		case "resturants":
            var e = MultipleInput.GetTagsIds(d);
            if (e.length > 0) {
                Forms.UpdateValue("businesslist", d, JSON.stringify(e))
            } else {
                Forms.UpdateValue("businesslist", d, "")
            }

            break;
		case "cuisines":
            var e = MultipleInput.GetTagsIds(d);
            if (e.length > 0) {
                Forms.UpdateValue("businesslist", d, JSON.stringify(e))
            } else {
                Forms.UpdateValue("businesslist", d, "")
            }
            break;
        default:
            var f = MultipleInput.GetTagsIds(d);
            if (f.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
		MultiInputTagsChange: function (d) {

        switch (d) {

		case "resturants":
            var e = MultipleInput.GetTagsIds(d);
            if (e.length > 0) {
                Forms.UpdateValue("whereami", d, JSON.stringify(e))
            } else {
                Forms.UpdateValue("whereami", d, "")
            }

            break;
		case "cuisines":
            var e = MultipleInput.GetTagsIds(d);
            if (e.length > 0) {
                Forms.UpdateValue("whereami", d, JSON.stringify(e))
            } else {
                Forms.UpdateValue("whereami", d, "")
            }
            break;
        default:
            var f = MultipleInput.GetTagsIds(d);
            if (f.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
	PreDatepickerCall2: function ()
    {

		$.post("panel/lib/front-main.php", "f=FetchAllRestDataFront", function (f) {

				Main.restaurants = JSON.parse(f);
				MultipleInput.Init("resturants",Main.restaurants, true);
			})
			$.post("panel/lib/front-main.php", "f=FetchAllCuisineDataFront", function (f) {
				Main.cuisines = JSON.parse(f);
				MultipleInput.Init("cuisines",Main.cuisines, true);
			})
		$('#rdate1').datepick({dateFormat: 'mm/dd/yyyy',minDate: 0,maxDate: 7});
	},
	PreDatepickerCall: function ()
    {
		$('#rdate').datepick({dateFormat: 'mm/dd/yyyy',minDate: 0,maxDate: 7, onSelect: function(date, instance) {
        
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
			//a += '<option value='" + i + "'>' + i + '</option>'
			a+= '<option value="' + i + '">' + capi + '</option>';
			
			}
			a +='</select>';
			document.getElementById("rhour").innerHTML=a;
				}
		//*********Hour function end*******************	
		
		//*********Minute function start*******************		
		
		//alert($("#ck364").val())
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
	},
	/*myFunction46: function(aa){ 
		var fulldate= $('#rdate').val();
		var datechange=fulldate.substr(3,2);

		var hrs =aa;
		var date = new Date();
		var curr_date1 = date.getDate();
		var curr_hour1=date.getHours();
		var curr_minute1=date.getMinutes();

		var b1 = '<select>';
		b1+= '<option value="">Minute</option>';
		if(curr_date1 == datechange){
			if(hrs > curr_hour1){ 
				for (i=0;i<60;i=i+15){
					var j = Main.zeroPad(i,2);
					b1+= '<option value="' + j + '">' + j + '</option>';
				}
			}else{
				if(curr_minute1<15){
					for (i=15;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b1+= '<option value="' + j + '">' + j + '</option>';
					}
				}else if(curr_minute1<30){
					for (i=30;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b1+= '<option value="' + j + '">' + j + '</option>';
					}
				}else if(curr_minute1<45){
					for (i=45;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b1+= '<option value="' + j + '">' + j + '</option>';
					}
				}	
			}
		}else{
			for (i=0;i<60;i=i+15){
				var j = Main.zeroPad(i,2);
				b1+= '<option value="' + j + '">' + j + '</option>';
			}
		}
		b1 +='</select>';
		document.getElementById("rmin").innerHTML=b1;
	},*/
	myFunction46: function(aa){ 
		var fulldate= $('#rdate').val();
		var datechange=fulldate.substr(3,2);

		var hrs =aa;
		var date = new Date();
		var curr_date1 = date.getDate();
		var curr_hour1=date.getHours();
		var curr_minute1=date.getMinutes();

		var b1 = '<select>';
		b1+= '<option value=""><?=$lang_resource['FRONT_VISUALS_MINUTE']?></option>';
		if(curr_date1 == datechange){
			if(hrs > curr_hour1){ 
				for (i=0;i<60;i=i+15){
					var j = Main.zeroPad(i,2);
					b1+= '<option value="' + j + '">' + j + '</option>';
				}
			}else{
				if(curr_minute1<15){
					for (i=15;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b1+= '<option value="' + j + '">' + j + '</option>';
					}
				}else if(curr_minute1<30){
					for (i=30;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b1+= '<option value="' + j + '">' + j + '</option>';
					}
				}else if(curr_minute1<45){
					for (i=45;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b1+= '<option value="' + j + '">' + j + '</option>';
					}
				}	
			}
		}else{
			for (i=0;i<60;i=i+15){
				var j = Main.zeroPad(i,2);
				b1+= '<option value="' + j + '">' + j + '</option>';
			}
		}
		b1 +='</select>';
		document.getElementById("rmin").innerHTML=b1;
	},

	
	Changetype: function(){
		var type = document.getElementById("doption").value;
		if(type == 1){
			Main.WhereAmIData.reservestatus = 'delivery';
			Shopping.changeDelType(1);
		}
		if(type == 2){
			Main.WhereAmIData.reservestatus = 'pickup';
			Main.WhereAmIData.resturant="";
			Shopping.changeDelType(2);
		}
		if(type == 4){
			Main.WhereAmIData.reservestatus = 'reservation';
			Visuals.BusinessReservation();
		}
	},
	
	
	
	SwitchRegistration: function(){
		var email1 = $('#email').val();
		var countryregister1 = $('#countryregister').val();
		var userlevel1 = 2;
		var password1 = '123abc!@#';
		var email = window.btoa(unescape(encodeURIComponent(email1)));
		var password = window.btoa(unescape(encodeURIComponent(password1)));
		var countryregister = window.btoa(unescape(encodeURIComponent(countryregister1)));
		var userlevel = window.btoa(unescape(encodeURIComponent(userlevel1)));
		
		var j = new Array();
		j.push(email);
		j.push(password);
		j.push(userlevel);
		j.push(countryregister);
		//alert(JSON.stringify(j));
		$.post("panel/lib/front-main.php", "f=SwitchRegistration&data="+JSON.stringify(j), function (f) {
			result = f.split(',');
			if(result[0] == 'success'){
				Main.chk = 2;
				Main.switchemail = email1;
				Main.switchpass = result[1];
				Main.Login()
				//show success page				
			}else{
				swal("Error","<?= $lang_resource['USERS_EMAIL_ADDRESS_ALREADY_REGISTERED'] ?>","error");
			}
		})
		},
	
	contact_us: function(){		
		var cc ='<iframe src="panel/<?=$moduleName?>/contact_us.php" width="100%" height="1300" style="border: none"></iframe>';
		$("body").addClass("grey_body");
		document.getElementById("top").innerHTML= cc;
		document.getElementById("left").style.display = 'none';
		document.getElementById("right").style.display ='none';
		Main.Ready();
	 
	},
	//request collection start
	placeRequestCollection:function(){
		
		if ( Main.requestCollction.customer_name  == ""){
			swal("Error","<?= $lang_resource['CUSTOMER_NAME_VV1'] ?>","error");
			return
		}
		if ( Main.requestCollction.customer_address1  == ""){
			swal("Error","<?= $lang_resource['CUSTOMER_ADDRESS1_VV1'] ?>","error");
			return
		}
		if ( Main.requestCollction.customer_town  == ""){
			swal("Error","<?= $lang_resource['CUSTOMER_TOWN_VV1'] ?>","error");
			return
		}
		if ( Main.requestCollction.customer_postcode  == ""){
			swal("Error","<?= $lang_resource['CUSTOMER_POSTCODE_VV1'] ?>","error");
			return
		}
		if ( Main.requestCollction.customer_contactno  == ""){
			swal("Error","<?= $lang_resource['CUSTOMER_CNO_VV1'] ?>","error");
			return
		}	
		if ( Main.requestCollction.resturent_name  == ""){
			swal("Error","<?= $lang_resource['RESTURENT_NAME_VV1'] ?>","error");
			return
		}
	  /*if ( Main.requestCollction.resturent_address1  == ""){
			alert("<?= $lang_resource['RESTURENT_ADDRESS1_VV1'] ?>");
			return
		}
		if ( Main.requestCollction.resturent_address2  == ""){
			alert("<?= $lang_resource['RESTURENT_ADDRESS2_VV1'] ?>");
			return
		}
		if ( Main.requestCollction.resturent_town  == ""){
			alert("<?= $lang_resource['RESTURENT_TOWN_VV1'] ?>");
			return
		}*/
		if ( Main.requestCollction.resturent_postcode  == ""){
			swal("Error","<?= $lang_resource['RESTURENT_POSTCODE_VV1'] ?>","error");
			return
		}
		if ( Main.requestCollction.resturent_collection_time  == ""){
			swal("Error","<?= $lang_resource['RESTURENT_CNO_VV1'] ?>","error");
			return
		}				
		if($("#requestClooectioncheckremember").prop('checked') == false){
				swal("Error","<?= $lang_resource['RESTURENT_CHK_VV1'] ?>","error");
			return
		}
			
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		var paypalid= (yyyy.toString() + mm.toString() + dd.toString() + '-' + Math.floor(Math.random() * 0x10000).toString(16));

		adrs=Main.requestCollction.customer_address1+','+Main.requestCollction.customer_address2+','+Main.requestCollction.customer_town+','+Main.requestCollction.customer_postcode;
		adrs1=Main.requestCollction.resturent_address1+','+Main.requestCollction.resturent_address2+','+Main.requestCollction.resturent_town+','+Main.requestCollction.resturent_postcode;
		var geocoder = new google.maps.Geocoder();
		var address = adrs;


		geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK){
                var address1 = adrs1;

                geocoder.geocode( { 'address': address1}, function(results1, status1) {
                if (status1 == google.maps.GeocoderStatus.OK){

					Main.customerlat=results[0].geometry.location.lat();
					Main.customeradd=adrs;
					Main.customerlng=results[0].geometry.location.lng();
                    Main.requestCollction.cutomerLocation = Main.NullToEmpty('{"latitud":'+results[0].geometry.location.lat()+',"longitud":'+results[0].geometry.location.lng()+',"zoom":14}');
					console.log(JSON.stringify(Main.requestCollction.cutomerLocation));
					Main.resturentlat=results1[0].geometry.location.lat();
					Main.resturentlng=results1[0].geometry.location.lng();
					Main.resturantadd=adrs1;
					
					Main.requestCollction.resturentLocation  = Main.NullToEmpty('{"latitud":'+results1[0].geometry.location.lat()+',"longitud":'+results1[0].geometry.location.lng()+',"zoom":14}');
					console.log(JSON.stringify(Main.requestCollction.resturentLocation));
					if (paypalid){
						paypalInfo = '&paypalid='+paypalid;
					}

					var b = new Date().getTime();
			        Main.Aid = b;
			        Main.Loading(true);
		
					var catl =Main.requestcollectionschedule;
					var currenttime = "";
					var advbkk=false;
					var temp='';
					available=false;
					var cat2 = catl["sdays"];
					console.log( JSON.stringify(Main.requestcollectionschedule));
					var d = new Date(Main.requestCollction.resturent_collection_time);
					var week = d.getDay();

					var currenthour = d.getHours(); 
					var currentmin = d.getMinutes(); 
		
					if(week==0){
						week=7;
					}
					console.log( week);console.log( currenthour);console.log( currentmin);
					var week1=parseInt(parseInt(week)-1);
					if(week1==0){
						week1=7;
					}
	    			currenttime=parseInt(currenthour)*60+parseInt(currentmin);
		  			for (x in cat2){				
						if(x==week){
							opentime=parseInt(cat2[x]["opens"]["hour"])*60+parseInt(cat2[x]["opens"]["minute"]);
							closetime=parseInt(cat2[x]["closes"]["hour"])*60+parseInt(cat2[x]["closes"]["minute"]);
							currenttime=parseInt(currenthour)*60+parseInt(currentmin);
							if((parseInt(currenttime)< parseInt(opentime)) || (parseInt(currenttime)>parseInt(closetime))){
								available=true;
							}
						}

						if(parseInt(cat2[x]["closes"]["hour"])>=24){
							if(x==week1){
								temp=parseInt(cat2[x]["closes"]["hour"])-24;
								closetime1=parseInt(temp)*60+parseInt(cat2[x]["closes"]["minute"]);
								currenttime1=parseInt(time1.currenthour)*60+parseInt(time1.currentmin);

								if((parseInt(currenttime)>= 0) && (parseInt(currenttime)<= parseInt(closetime1))){
									available=false;
								}
							}
						}
					}

					console.log( available);
					Main.requestCollction.available=available;	
					Main.requestCollction.locationerror=false;
				$.post("panel/lib/front-main.php", "f=RequestCollectionPlaceOrder&data=" + JSON.stringify(Main.requestCollction)+paypalInfo, function (f) {
			  		Main.Ready(true);
		            if (b != Main.Aid){
		                return false;
		            }				
					if((f=='') &&(Main.requestCollction.available!=true)){
						Main.requestCollction.locationerror=true;
					}
					if((f=='-1')){
						Main.requestCollction.locationerror=true;
					}
			  
			  
			 
					if((f.trim()=='') ||(Main.requestCollction.available==true)){
						Main.openRequestcollectionPopup();
					}else{
						window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypal/paypal_custom.php?id="+f;
					}
        		}) 
			}else{
				swal("Sorry","we were unable to geocode the resurant address","error");
			}
	        });
		}else{
			swal("Sorry","we were unable to geocode the customer address","error");
		}
	});
},
openRequestcollectionPopup:function(){
	Forms.Clean("recover13", "popupmainbuttonok");

	var   a = '<div class="popup_wrapper">';
	a += '<div class="pop_header">';
	a += '<div class="pop_heading"><h3><?=$lang_resource['REQUEST_COLLECTION_SEARCH_RESULT']?></div>';
	a += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
	a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
	a += '</div>';
	a += "</div>";
	a += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';
	a += '<tr>';
	a += '<td align="center" colspan="2" style="font-size:10px;color:red;">&nbsp;</td>';
	a += '</tr>';

	if(Main.requestCollction.locationerror==true){
		a += '<tr>';
		a += '<td align="center" colspan="2" style="font-size:17px;color:red;"><?=$lang_resource['REQUEST_COLLECTION_Faliour_MSG'];?></td>';
		a += '</tr>';
	}

	if(Main.requestCollction.available==true){
		if(Main.requestCollction.locationerror==true){
			a += '<tr>';
			a += '<td align="center" colspan="2" style="font-size:17px;color:red;">'
			a += ' <?=$lang_resource['REQUEST_COLLECTION_AND']?> ';
			a += '</tr>';
		}

		a += '<tr>';
		a += '<td align="center" colspan="2" style="font-size:17px;color:red;">'
		a += '<?=$lang_resource['REQUEST_COLLECTION_Faliour_MSG1']?></td>';
		a += '</tr>';
	}

	a += '<tr>';
	a += '<td align="center" colspan="2" style="font-size:10px;color:red;">&nbsp;</td>';
	a += '</tr>';
	a += '<tr>';
	a += '<td align="center" colspan="2"><button type="button" class="pop_submit_btn" style="width:250px;" onclick="Popup.Close()"><?=$lang_resource['REQUEST_COLLECTION_SEARCH_AGAIN'];?></button></td>';
	a += '</tr>';
	a += '<tr>';
	a += '<td align="center" colspan="2" style="font-size:10px;color:red;">&nbsp;</td>';
	a += '</tr>';
	a += '<tr>';
	a += '<td align="center" colspan="2" style="font-size:10px;color:red;"><div id="map_canvasrequestanalist" style="width:100%; height:400px"></div> </td>';
	a += '</tr>';
	a += "</table>";
          
    Main.Ga("/profile/recoverpwd");
    Popup.Show(440, 240, a, function (){

    }, function (){
	    Forms.Clean("recover13");
	    Main.Ga(Main.ActiveView)
	})
	var locations = [
    [Main.customeradd, Main.customerlat, Main.customerlng],
 	[Main.resturantadd, Main.resturentlat, Main.resturentlng, 1]
    ];

   var map = new google.maps.Map(document.getElementById('map_canvasrequestanalist'), {
     zoom: 15,
     center: new google.maps.LatLng(Main.customerlat, Main.customerlng),
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   var infowindow = new google.maps.InfoWindow();

   var marker, i;

   for (i = 0; i < locations.length; i++) {  
     marker = new google.maps.Marker({
       position: new google.maps.LatLng(locations[i][1], locations[i][2]),
       map: map
     });

     google.maps.event.addListener(marker, 'click', (function(marker, i) {
       return function() {
         infowindow.setContent(locations[i][0]);
         infowindow.open(map, marker);
       }
     })(marker, i));
   }
	},
	requestCollctionUpdate:function(f, d){
	
		   switch (d)
        {
        case "customer_name":
           Main.requestCollction.customer_name = f.value;
            break;
        case "customer_address1":
		
             Main.requestCollction.customer_address1 = f.value;
			
            break;
        case "customer_address2":
            Main.requestCollction.customer_address2 = f.value;
            break;
        case "customer_town":
            Main.requestCollction.customer_town = f.value;
            break;
		 case "customer_postcode":
            Main.requestCollction.customer_postcode = f.value;
            break;	
		 case "customer_contactno":
            Main.requestCollction.customer_contactno = f.value;
            break;
	 case "customer_note":
            Main.requestCollction.customer_note = f.value;
            break;
	 case "resturent_name":
           Main.requestCollction.resturent_name = f.value;
            break;
        case "resturent_address1":
             Main.requestCollction.resturent_address1 = f.value;
            break;
        case "resturent_address2":
            Main.requestCollction.resturent_address2 = f.value;
            break;
        case "resturent_town":
            Main.requestCollction.resturent_town = f.value;
            break;
		 case "resturent_postcode":
            Main.requestCollction.resturent_postcode = f.value;
            break;	
		case "resturent_contactno":
            Main.requestCollction.resturent_contactno = f.value;
            break;		
			case "resturent_collection_time":
            Main.requestCollction.resturent_collection_time = f.value;
            break;	
			case "resturent_other_value":
            Main.requestCollction.resturent_other_value = f.value;
            break;	
			case "resturent_other_reference":
            Main.requestCollction.resturent_other_reference = f.value;
            break;			
								
		}
	
	
	},
	
	//request collection end
	
    Sanitize: function (a)
    {
        a = this.StripTags(a, null);
        a = a.replace(/&amp;/g, escape("&"));
        a = a.replace(/&/g, escape("&"));
        if (!Main.IsJson(a))
        {
            a = a.replace(/"/g, escape("'"))
        }
        return a
    },
    IsJson: function (a)
    {
        try
        {
            JSON.parse(a)
        }
        catch (b)
        {
            return false
        }
        return true
    }
};
var RemoveAccents = (function ()
{
    var e = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        d = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        b = {};
    for (var c = 0, a = e.length; c < a; c++)
    {
        b[e.charAt(c)] = d.charAt(c)
    }
    return function (l)
    {
        var g = [];
        for (var h = 0, f = l.length; h < f; h++)
        {
            var m = l.charAt(h);
            if (b.hasOwnProperty(l.charAt(h)))
            {
                g.push(b[m])
            }
            else
            {
                g.push(m)
            }
        }
        return g.join("")
    }
})();

