<?php
session_start();


  include $_SERVER['DOCUMENT_ROOT'].'/admin/config.php';
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);

	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
    pg_prepare($link,'sqllangfetchpanel','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetchpanel',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['admin_lang'] = $row1['id'];
	}

if($script_id ==1){
	$_SESSION['scriptid']=0;
	
	} else {
    $_SESSION['scriptid']=$script_id;
	}


$addlat = "lat";
pg_prepare($link,'sqllatfetch111','SELECT * FROM w_configs WHERE name=$1');
$resultlat111 = pg_execute($link,'sqllatfetch111',array($addlat));
 
if(pg_num_rows($resultlat111)>0){
	$rowlat111 = pg_fetch_array($resultlat111);
	$latl111 = $rowlat111["value"];	
}else{
	$latl111 = 22;
}

$addlong = "long";
pg_prepare($link,'sqllongfetch111','SELECT * FROM w_configs WHERE name=$1');
$resultlong111 = pg_execute($link,'sqllongfetch111',array($addlong));
  
if(pg_num_rows($resultlong111)>0){
	$rowlong111 = pg_fetch_array($resultlong111);
	$longl111 = $rowlong111["value"];	
}else{
	$longl111 = 88;
}

	pg_prepare($link,'sqlfetchlangpanel','SELECT * from w_lang_admin');
  $result = pg_execute($link,'sqlfetchlangpanel',array());
  while($row = pg_fetch_array($result)){
	$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['admin_lang']];    
  }
  
   $dcm = "decimal_point";
	pg_prepare($link,'sqldcpfetch111','SELECT * FROM w_configs WHERE name=$1');
	$resultdcm111 = pg_execute($link,'sqldcpfetch111',array($dcm));
	$rowdcm111 = pg_fetch_array($resultdcm111);
  
  $decimal111 = $rowdcm111["value"];
  
    $emergency_no = "emergency_no";
	pg_prepare($link,'sqlemr','SELECT * FROM w_configs WHERE name=$1');
	$resultemr = pg_execute($link,'sqlemr',array($emergency_no));
	$rowemr = pg_fetch_array($resultemr);
	
	$emergency_email = "emergency_email";
	pg_prepare($link,'sqlemr1','SELECT * FROM w_configs WHERE name=$1');
	$resultemr1 = pg_execute($link,'sqlemr1',array($emergency_email));
	$rowemr1 = pg_fetch_array($resultemr1);
	
	
	
	
	
  
  if(pg_num_rows($resultemr) > 0 ) {
  $emergency_no_setting = $rowemr["value"];
  } else {
  $emergency_no_setting = 0;  
	  }

  if(pg_num_rows($resultemr1) > 0 ) {
  $emergency_email_setting = $rowemr1["value"];
  } else {
  $emergency_email_setting = 0;  
	  }  
  
  //$decimal111 =0;
require_once('../login/common.php');
require_authentication();
?>
var IS_ORDER_LENGTH = 0;
var IS_ORDER_APPROVED = 0;
var IS_ORDER_TIMER = 0;
var IS_DECIMAL_POINT = <?=$decimal111?>;
var IS_EMERGENCY_NO = <?=$emergency_no_setting?>;
var IS_EMERGENCY_EMAIL = <?=$emergency_email_setting?>;
//var zipcodeordersetting = <?=($zsettingval !="")?$zsettingval:0?>;
//var productordersetting = <?=$psettingval?>;
var lat1= <?=$latl111?>;
var long1= <?=$longl111?>;

var IS_SCRIPTID = <?=$_SESSION['scriptid']?>;
$(window).load(function () {
    $("#initbg").hide()
});
$(document).ready(function () {
    Main.Loading();
 
   
    window.history.pushState( {"id":100} , "Admin Script", "<?=$moduleName?><?=$template?>"  );
  
    $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchUserData"},{"operation":"GetManagelangConfig"},{"operation":"FetchSiteSetting"},{"operation":"FetchTimeFormat"},{"operation":"FetchAllCurrency"},{"operation":"FetchNeighbourhoodSettings"},{"operation":"FetchCountryCity"},{"operation":"FetchRestBringgPermission"},{"operation":"FetchAllFranchisesData"},{"operation":"FetchPointPermission"},{"operation":"Fetchconfigsettings"},{"operation":"Fetchproductordersetting"},{"operation":"Fetchzipcodeordersetting"}]', function (a) {
    
  
  
        if (a != "") {
        	Main.countrycity = JSON.parse(a).countrycity;
            Main.User = JSON.parse(a).user;
            Main.siteSettingUrl = JSON.parse(a).siteSetting;
            Main.timeformat = JSON.parse(a).timeformat;
            Main.currency = JSON.parse(a).currency;
            Main.BRINGG_PERMISSION_EACH_RESTAURANT = JSON.parse(a).RestBringgPermission;
            Main.languageinfo = JSON.parse(a).languageinfo;
            Main.neighsettings = JSON.parse(a).neighsettings;
			Main.Franchises = JSON.parse(a).franchises;
            Main.PointPermission=JSON.parse(a).pointpermission;
            Main.configsettings=JSON.parse(a).configsettings;
          	Main.zipcodeordersetting=JSON.parse(a).zipcodeordersetting;
            Main.productordersetting=JSON.parse(a).productordersetting;
            
            for(var p in Main.languageinfo){ 
            if(Main.languageinfo[p].admindefaulelang){
            	Main.langdefault = Main.languageinfo[p].admindefaulelang;
            }else{           
                if(Main.languageinfo[p].opdefault == 1){
                    Main.langdefault = Main.languageinfo[p].id;
                }
                }
            }


            
            if(Main.User.level<=2){
                $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessData"},{"operation":"FetchUserSeePermission"}]', function (c) {
               
                    Main.seepermission = JSON.parse(c).seepermission; 
                    Main.Business = JSON.parse(c).business;
                    


                    $.post("lib/users.php", "f=GetUserConfig", function (b) {
                        Main.PopulateUserConfigObject(b);
                        Main.InitInterface();
                        Main.Ready()
                    })
                });
            }else{
                $.post("lib/users.php", "f=GetUserConfig", function (b) {
                    Main.PopulateUserConfigObject(b);
                    Main.InitInterface();
                    Main.Ready()
                })
            }

            
        } else {
            Main.LogOut()
        }
    });
    document.onkeydown = document.onkeypress = function (a) {
        if ((a || event).keyCode == 27) {
            Main.Ready(true);
            Main.Ready();
            Main.Aid = 0
        }
    }
});
var Main = {
    Random: new Date().getTime(),
    User: null,
    Users: null,
    Franchises: null,
    AllBusiness: null,
    ClientOs: null,
    ClientBrowserVersion: null,
    ClientBrowserName: null,
    Config: new Object(),
    Busy: false,
    PopulateUserConfigObject: function (b) {
        if (b != "{}" && b != "") {
            var a = JSON.parse(b);
            if (this.User.level <= 5) {
                try {
                    Main.Config.Business = new Object();
                    Main.Config.Business.List = new Object();
                    Main.Config.Dishes = new Object();
                    Main.Config.Dishes.List = new Object();
                     Main.Config.Reserve = new Object();
                    Main.Config.Reserve.List = new Object();
                    Main.Config.Extras = new Object();
                    Main.Config.Extras.List = new Object();
                    Main.Config.Menus = new Object();
                    Main.Config.Menus.List = new Object();
                    
                    Main.Config.Business.List.SortBy = a.Business.List.SortBy;
                    Main.Config.Business.List.SortByStatus = a.Business.List.SortByStatus;
                    Main.Config.Dishes.List.SortBy = a.Dishes.List.SortBy;
                    Main.Config.Dishes.List.SortByStatus = a.Dishes.List.SortByStatus;
                    Main.Config.Reserve.List.SortBy = a.Reserve.List.SortBy;
                    Main.Config.Reserve.List.SortByStatus = a.Reserve.List.SortByStatus;
                    Main.Config.Extras.List.SortBy = a.Extras.List.SortBy;
                    Main.Config.Extras.List.SortByStatus = a.Extras.List.SortByStatus;
                    Main.Config.Menus.List.SortBy = a.Menus.List.SortBy;
                    Main.Config.Menus.List.SortByStatus = a.Menus.List.SortByStatus;

                    Main.Config.Orders = new Object();
                    Main.Config.Orders.List = new Object();
                    Main.Config.Orders.List.SortBy = a.Orders.List.SortBy;
                    Main.Config.Orders.List.SortByStatus = a.Orders.List.SortByStatus
                } catch (c) {}
            }
            if (this.User.level <= 2) {
                try {
                    Main.Config.Users = new Object();
                    Main.Config.Users.List = new Object();
                    Main.Config.Users.List.SortBy = a.Users.List.SortBy;
                    Main.Config.Users.List.SortByStatus = a.Users.List.SortByStatus
                } catch (c) {}
            }
            if (this.User.level == 0) {
                try {
                    Main.Config.Franchises = new Object();
                    Main.Config.Franchises.List = new Object();
                    Main.Config.Ads = new Object();
                    Main.Config.Ads.List = new Object();
                    Main.Config.Franchises.List.SortBy = a.Franchises.List.SortBy;
                    Main.Config.Franchises.List.SortByStatus = a.Franchises.List.SortByStatus;
                    Main.Config.Ads.List.SortBy = a.Ads.List.SortBy;
                    Main.Config.Ads.List.SortByStatus = a.Ads.List.SortByStatus; 
                    Main.Config.Categories = new Object();
                    Main.Config.Categories.List = new Object();
                    Main.Config.Categories.List.SortBy = a.Categories.List.SortBy;
                    Main.Config.Categories.List.SortByStatus = a.Categories.List.SortByStatus;
                    Main.Config.Countries = new Object();
                    Main.Config.Countries.List = new Object();
                    Main.Config.Countries.List.SortBy = a.Countries.List.SortBy;
                    Main.Config.Countries.List.SortByStatus = a.Countries.List.SortByStatus
                    Main.Config.discount = new Object();
                    Main.Config.discount.List = new Object();
                    Main.Config.discount.List.SortBy = a.discount.List.SortBy;
                    Main.Config.discount.List.SortByStatus = a.discount.List.SortByStatus;
                    
                    Main.Config.DriverManager = new Object();
                    Main.Config.DriverManager.List = new Object();
                    Main.Config.DriverManager.List.SortBy = a.DriverManager.List.SortBy;
                    Main.Config.DriverManager.List.SortByStatus = a.DriverManager.List.SortByStatus
                    
                    Main.Config.Neighborhoodlist = new Object();
                    Main.Config.Neighborhoodlist.List = new Object();
                    Main.Config.Neighborhoodlist.List.SortBy = "id";
                    Main.Config.Neighborhoodlist.List.SortByStatus = "min"
                } catch (c) {}
            }
        } else {
            if (this.User.level <= 5) {
                Main.Config.Business = new Object();
                Main.Config.Business.List = new Object();
                Main.Config.Dishes = new Object();
                Main.Config.Dishes.List = new Object();
                Main.Config.Reserve = new Object();
                Main.Config.Reserve.List = new Object();
                Main.Config.Extras = new Object();
                Main.Config.Extras.List = new Object();
                Main.Config.Orders = new Object();
                Main.Config.Orders.List = new Object();
                Main.Config.Extras = new Object();
                Main.Config.Extras.List = new Object();
                Main.Config.Menus = new Object();
                Main.Config.Menus.List = new Object();
                Main.Config.Business.List.SortBy = "id";
                Main.Config.Business.List.SortByStatus = "min";
                Main.Config.Dishes.List.SortBy = "id";
                Main.Config.Dishes.List.SortByStatus = "min";
                 Main.Config.Reserve.List.SortBy = "id";
                Main.Config.Reserve.List.SortByStatus = "min";  
                Main.Config.Extras.List.SortBy = "id";
                Main.Config.Extras.List.SortByStatus = "min";
                Main.Config.Menus.List.SortBy = "id";
                Main.Config.Menus.List.SortByStatus = "min";
                Main.Config.Orders.List.SortBy = "id";
                Main.Config.Orders.List.SortByStatus = "max"
            }
            if (this.User.level <= 2) {
                Main.Config.Users = new Object();
                Main.Config.Users.List = new Object();
                Main.Config.Users.List.SortBy = "id";
                Main.Config.Users.List.SortByStatus = "min"
            }
            if (this.User.level == 0) {
                Main.Config.Franchises = new Object();
                Main.Config.Franchises.List = new Object();
                Main.Config.Franchises.List.SortBy = "id";
                Main.Config.Franchises.List.SortByStatus = "min";
                Main.Config.Ads = new Object();
                Main.Config.Ads.List = new Object();
                Main.Config.Ads.List.SortBy = "id";
                Main.Config.Ads.List.SortByStatus = "min";
                Main.Config.discount = new Object();
                Main.Config.discount.List = new Object();
                Main.Config.discount.List.SortBy = "id";
                Main.Config.discount.List.SortByStatus = "min";
                Main.Config.Categories = new Object();
                Main.Config.Categories.List = new Object();
                Main.Config.Categories.List.SortBy = "id";
                Main.Config.Categories.List.SortByStatus = "min";
                Main.Config.Countries = new Object();
                Main.Config.Countries.List = new Object();
                Main.Config.Countries.List.SortBy = "id";
                Main.Config.Countries.List.SortByStatus = "min"
                
                Main.Config.DriverManager = new Object();
                Main.Config.DriverManager.List = new Object();
                Main.Config.DriverManager.List.SortBy = "id";
                Main.Config.DriverManager.List.SortByStatus = "min"
              
                Main.Config.Neighborhoodlist = new Object();
                Main.Config.Neighborhoodlist.List = new Object();
                Main.Config.Neighborhoodlist.List.SortBy = "id";
                Main.Config.Neighborhoodlist.List.SortByStatus = "min"
            }
            
        }
    },
    HomeUrl: function () {
     window.location="./";
    },
    InitInterface: function () {
        BrowserDetect.init();
       // Popup.Init("popupcontainer");
        this.ClientOs = BrowserDetect.OS;
        this.ClientBrowserVersion = BrowserDetect.version;
        this.ClientBrowserName = BrowserDetect.browser;
        $("#logouticon").click(Main.LogOut);
        
      
        switch (this.User.level) {
        case "0":
            SuperAdmin.Home();
            Main.FetchSoundsTimeSet();
            break;
        case "1":
        
            Admin.Home();
            break;
        case "2":
            Provider.Home();
            Main.FetchSoundsTimeSet();
            break;
        case "3":
            top.location = "../";
            break;
         case "4":  
                  
            DriverFront.Home();
            break;
       case "5":
            DriverManagerFront.Home();
            break;    
        }
        //document.getElementById("usertype").innerHTML = this.User.levelname
       // document.getElementById("username").innerHTML = this.User.name
        
    },
    Request: function (To, Container, Vars, OnComplete) {
        this.Loading();
        //Forms.EnableSubmitButton(false);
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/" + To + ".php", Vars, function (Data) {
       
    // alert(Data)
            
            if (MyAid != Main.Aid) {
                return
            }
            This.Ready();
            if (Container != null) {
                document.getElementById(Container).innerHTML = Data
            }
            if (OnComplete) {
                eval(OnComplete)
            }
        })
    },
    Quote: function (a) {
        return "'" + a + "'"
    },
    LogOut: function () {

        $.post("login/logout.php", "", function () {
            Main.User = null;
            top.location.href = "../"
        })
    },
    IsNavigator: function (a, b) {
        if (this.ClientBrowserName == a) {
            if (b == "*") {
                return true
            } else {
                if (this.ClientBrowserVersion <= b) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    },
    SortByProperty: function (a) {
        return function (b, c) {
            if (Main.IsNumber(b[a])) {
                return (parseInt(Main.NullToEmpty(b[a])) < parseInt(Main.NullToEmpty(c[a]))) ? -1 : (parseInt(Main.NullToEmpty(b[a])) > parseInt(Main.NullToEmpty(c[a]))) ? 1 : 0
            } else {
                return (Main.NullToEmpty(b[a]).toLowerCase() < Main.NullToEmpty(c[a]).toLowerCase()) ? -1 : (Main.NullToEmpty(b[a]).toLowerCase() > Main.NullToEmpty(c[a]).toLowerCase()) ? 1 : 0
            }
        }
    },
    SaveConfig: function () {
        this.Request("users", null, "f=SaveConfig&config=" + JSON.stringify(this.Config), null)
    },
    TitleCase: function (a) {
        return a.replace(/\w\S*/g, function (b) {
            return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
        })
    },
    NullToEmpty: function (a) {
        if (a != null) {
            return a
        } else {
            return ""
        }
    },
    GetMarkedCheckBoxesValues: function () {
        var a = new Array();
        $(".checkbox").each(function (c, b) {
            if (b.checked) {
                a.push(b.value)
            }
        });
        return a
    },
    GetMarkedCheckBoxesValuesByClass: function (classname) {
        var a = new Array();
        $("."+classname).each(function (c, b) {
            if (b.checked) {
                a.push(b.value)
            }
        });
        return a
    },
    
    Loading: function (a) {
        $("#loading").show();
        return;
        
        
        
        this.Busy = true;
        $("body").addClass("loading");
        $(".hand").each(function () {
            $(this).addClass("loading")
        });
        $(".default").each(function () {
            $(this).addClass("loading")
        });
        $(":input").each(function () {
            $(this).addClass("loading")
        });
        var c = "";
        if (a) {
            c = "popup"
        }
        document.getElementById(c + "progressbox").style.display = "block";
        b();
        var d = this;

        function b() {
            var e = document.getElementById(c + "progressbar");
            if (e) {
                e.style.width = "2%";
                $(e).animate({
                    width: "100%"
                }, 500, function () {
                    if (d.Busy) {
                        b()
                    }
                })
            }
        }
    },
    
    Ready: function (a) {
    
    $("#loading").hide();
    return
        this.Busy = false;
        $("body").removeClass("loading");
        $(".hand").each(function () {
            $(this).removeClass("loading")
        });
        $(".default").each(function () {
            $(this).removeClass("loading")
        });
        $(":input").each(function () {
            $(this).removeClass("loading")
        });
        var b;
        if (a) {
            b = document.getElementById("popupprogressbox")
        } else {
            b = document.getElementById("progressbox")
        } if (b) {
            b.style.display = "none"
        }
    },
    GetFranchisesData: function (OnComplete) {
        this.Loading();
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData"}]', function (Data) {
            if (MyAid != Main.Aid) {
                return
            }
            This.Ready();
            if (Data != "") {
                This.Franchises = JSON.parse(Data).franchises;
                eval(OnComplete)
            } else {
                alert("Error")
            }
        })
    },
    GetResturantData:function (OnComplete) {
        this.Loading();
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessData"}]', function (Data) {
            if (MyAid != Main.Aid) {
                return
            }
            This.Ready();
            if (Data != "") {
                This.ReviewBusinessAll = JSON.parse(Data).business;
                eval(OnComplete)
            } else {
                alert("Error")
            }
        })
    },

    EditProfile: function (a) {
        Users.Edit(Main.User.id, a)
    },
    GetFranchiseById: function (a) {
        for (var b in this.Franchises) {
            if (this.Franchises[b].id == a) {
                return this.Franchises[b]
            }
        }
        return null
    },
    GetAllBusinessData: function (OnComplete) {
        this.Loading();
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/business.php", "f=FetchAllBusinessData", function (Data) {
         //alert(Data)
            if (MyAid != Main.Aid) {
                return
            }
            This.Ready();
            if (Data != "") {
                This.AllBusiness = JSON.parse(Data);
                eval(OnComplete)
            } else {
                alert("Error")
            }
        })
    },
    GetAllBusinessDataFilter: function (OnComplete) {
        this.Loading();
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/business.php", "f=FetchAllBusinessDataFilter", function (Data) {
        
            if (MyAid != Main.Aid) {
                return
            }
            This.Ready();
            if (Data != "") {
                This.AllBusiness = JSON.parse(Data);
                eval(OnComplete)
            } else {
                alert("Error")
            }
        })
    },
    BulkRequest: function (Vars, OnComplete) {
        this.Loading();
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/panel-bulk.php", Vars, function (Data) {
        
     
        
          
            if (MyAid != Main.Aid) {
                return
            }
            This.Ready();
            if (Data != "") {
                eval(OnComplete + "(Data)")
            } else {
                alert("Error")
            }
        })
    },
    ArrayUnionFromSingle: function (b, f, g, e) {
        var a = new Array();
        for (var d in f) {
            for (var c in b) {
                if (b[c][g] == f[d]) {
                    a.push(b[c][e])
                }
            }
        }
        return a
    },
    GetPropertyArray: function (a, c) {
        var d = new Array();
        for (var b in a) {
            d.push(a[b][c])
        }
        return d
    },
    RemoveFromPropertyNames: function (a, d) {
        for (var e in a) {
            if (a.hasOwnProperty(e)) {
                var c = a[e],
                    b = e.replace(d, "");
                delete a[e];
                a[b] = c
            }
        }
        return a
    },
    GetPropertyValueOnPropertyValueFound: function (b, a, e, d) {
        for (var c in b) {
            if (b[c][a] == e) {
                return b[c][d]
            }
        }
        return ""
    },
    IsNumber: function (a) {
        return !isNaN(a - 0)
    },
    IsNumberKey: function (b) {
        var a = (b.which) ? b.which : event.keyCode;
        if (a != 46 && a > 31 && (a < 48 || a > 57)) {
            return false
        }
        return true
    },
    FixToDecimal: function (a) {
        if (a == "null") {
            return a
        }
        while (a.indexOf("..") != -1) {
            a = a.replace("..", ".")
        }
        var c = a.split(".");
        var b = c.length;
        if (b == 1) {
            if (c[0].length > 0) {
                a = c[0] + ".00"
            } else {
                a = "0.00"
            }
        } else {
            if (b > 1) {
                var d = "00";
                if (c[1]) {
                    if (c[1].length > 1) {
                        d = c[1]
                    } else {
                        d = c[1] + "0"
                    }
                }
                a = c[0] + "." + d
            }
        }
        return a
    },
    IsEmail: function (b) {
        var a = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
        return a.test(b)
    },
    ToogleAllCheckBoxes: function (classname) {
        $("."+classname).each(function (b, a) {
            if (a.checked) {
                a.checked = false
            } else {
                a.checked = true
            }
        })
    },
    StripTags: function (a, c) {
        c = (((c || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
        var b = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            d = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return a.replace(d, "").replace(b, function (f, e) {
            return c.indexOf("<" + e.toLowerCase() + ">") > -1 ? f : ""
        })
    },
    Sanitize: function (b, a) {
        if (a) {
            b = escape(b);
            b = encodeURIComponent(b)
        } else {
            b = this.StripTags(b, null);
            b = b.replace(/&amp;/g, escape("&"));
            b = b.replace(/&/g, escape("&"));
            if (!Main.IsJson(b)) {
                b = b.replace(/"/g, escape("'"))
            }
        }
        return b
    },
    IsJson: function (a) {
        try {
            JSON.parse(a)
        } catch (b) {
            return false
        }
        return true
    },

    ConvertTimeFormat: function(time){
        var res = time.split(":");        
        if(res[0]<12){
            if(Main.timeformat == '12'){
               time = Main.zeroPad(res[0],2)+':'+Main.zeroPad(res[1],2)+' AM'; 
            }else{
               time = Main.zeroPad(res[0],2)+':'+Main.zeroPad(res[1],2);
            }
        }else if(res[0]>=12 && res[0]<24){
            if(Main.timeformat == '12'){
               time = Main.zeroPad((res[0] - 12),2)+':'+Main.zeroPad(res[1],2)+' PM'; 
            }else{
               time = Main.zeroPad(res[0],2)+':'+Main.zeroPad(res[1],2);
            }
        }else if(res[0]==24){
            if(Main.timeformat == '12'){
               time = '00:'+Main.zeroPad(res[1],2)+' AM'; 
            }else{
               time = '00:'+Main.zeroPad(res[1],2);
            }
        }else if(res[0]>24){
            time = Main.zeroPad((res[0] - 24),2)+':'+Main.zeroPad(res[1],2)+' AM';
        }
        
        
        return time;
    },
    zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   },

        FetchSoundsTimeSet: function(){
        $.post("lib/panel-bulk.php", 'data=[{"operation":"GetSoundSettings"}]', function (a) {
       
            Main.soundsettings = JSON.parse(a).soundsettings;
            if((Main.soundsettings.superadminsoundstatus == 1 && Main.User.level==0) || (Main.soundsettings.businesssoundstatus == 1 && Main.User.level==2)){ 
                IS_ORDER_TIMER = 0;
                Main.NewOrderPopup();
            }else{
                IS_ORDER_TIMER = 1;
                $("#modal-one").remove();
                $("#chatAudio").remove();
            }
        });
    },
    
    NewOrderPopup: function(){
       if((Main.soundsettings.superadminsoundstatus == 1 && Main.User.level==0) || (Main.soundsettings.businesssoundstatus == 1 && Main.User.level==2)){ 
       $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchOrderDataApproved"}]', function (a) {
       
            a = JSON.parse(a);
           Main.soundapproved = a.soundapproved;          
           
           if(Main.soundapproved.length != 0){
               if(IS_ORDER_LENGTH == 0){
                   Orders.Main();
               }
               IS_ORDER_LENGTH = Main.soundapproved.length;
               IS_ORDER_APPROVED = 0;
               Main.NewOrderPopupHtml();
               
           }else{
               //$("#chatAudio").remove();
               Main.ApprovedOrder();
               Main.CountTimeToSound();
           } 
           
       });
       }else{
               $("#modal-one").remove();
               $("#chatAudio").remove();
           }
   },
    NewOrderPopupHtml: function(){
        $("#modal-one").remove();
        $("#chatAudio").remove();
    
        var n ='<div class="modal_sound" id="modal-one">'
        n +='<div class="modal-dialog">'
        n +='<div class="neworder-box">'
        n +='<div class="new-order"><?=$lang_resource['CONTROL_PANEL_SOUND_NEW_ORDERS']?><div class="od-count"><div class="arrow-left"></div><span id="ordercount">'+Main.soundapproved.length+'</span></div></div>'
        n +='</div>'
        n +='<div class="modal-box">'
        n +='<div class="modal-header"><?=$lang_resource['CONTROL_PANEL_SOUND_PENDING_ORDERS']?></div>'
        n +='<div class="modal-body">'
        n +='<p><?=$lang_resource['CONTROL_PANEL_SOUND_STOP']?></p>'
        n +='<button type="button" class="ok-btn" onclick="Main.ApprovedOrder()"><?=$lang_resource['CONTROL_PANEL_SOUND_OK']?></button>'
        n +='</div>'
        n +='</div>'
        n +='</div>'
        n +='</div>'
        n +='</div>'
        
        $("body").append(n)
        $('<audio id="chatAudio" controls loop style="display:none"><source src="notify.ogg" type="audio/ogg"><source src="notify.mp3" type="audio/mpeg"><source src="notify.wav" type="audio/wav"></audio>').appendTo('body');
        $('#chatAudio')[0].play();
        if(IS_ORDER_APPROVED == 0)
        Main.CountTimeToSound1();
    },
    ApprovedOrder: function(){
    
        IS_ORDER_APPROVED = 1;
        $("#modal-one").remove();
        $("#chatAudio").remove();
        Main.CountTimeToSound();
        
    },
    NewOrderPopup1: function(){
  
   if((Main.soundsettings.superadminsoundstatus == 1 && Main.User.level==0) || (Main.soundsettings.businesssoundstatus == 1 && Main.User.level==2)){ 
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchOrderDataApproved"}]', function (a) {
             a = JSON.parse(a);
            Main.soundapproved1 = a.soundapproved;
            if(IS_ORDER_LENGTH != Main.soundapproved1.length){
                IS_ORDER_LENGTH = Main.soundapproved1.length;
                $("#ordercount").html(Main.soundapproved1.length)
            }else{
                Main.CountTimeToSound1();
            }
        });
        }else{
        
                $("#modal-one").remove();
                $("#chatAudio").remove();
            }
    },
    Margeslash : function (text){

    
    var res = text.split("_@_");
    var p = Array();
    for(var po in res){
    
    
    var poption = res[po].split("@u@");
    
    
    var a = Object();
    a.optionheader=poption[0];
    a.optionchoice=poption[1];
    
    
    
    if(poption[0]!=""){
    p.push(a)   
    }
    
    }

    
    var c ='';
    var previousHeader = '';
    c+='<ul class="pdct_op">'
    var lasti =0;
    for(var e in p){
        
    if(lasti == 0 ) {
    c+='<h4>'+p[e].optionheader+'</h4>'
    c+='<li>'+p[e].optionchoice+'</li>'
        }
    else if(previousHeader == p[e].optionheader ) {
    
    c+='<li>'+ p[e].optionchoice+'</li>';
    }
    else if(previousHeader != p[e].optionheader ) {
        
    c+='<h4>'+p[e].optionheader+'</h4>'
    c+='<li>'+p[e].optionchoice+'</li>';
    }
    previousHeader = p[e].optionheader;
    lasti++;
    }
    c+='</ul>'




    
    return c;

        },
    CountTimeToSound: function(){
        if(Main.User.level==0){
            var timeLeft =  Main.soundsettings.superadminsoundduration - 2 ;
        }else if(Main.User.level==2){
            var timeLeft =  Main.soundsettings.businesssoundduration - 2 ;
        }
        if(IS_ORDER_TIMER == 0){
        var timerId = setInterval(function(){
        if (timeLeft == 0) {
          clearTimeout(timerId);
          Main.NewOrderPopup();
        } else {
          timeLeft--;
        }
       }, 1000);
       }else{clearInterval(timerId); }
    },
     CountTimeToSound1: function(){
        if(Main.User.level==0){
            var timeLeft =  Main.soundsettings.superadminsoundduration - 2 ;
        }else if(Main.User.level==2){
            var timeLeft =  Main.soundsettings.businesssoundduration - 2 ;
        }
        if(IS_ORDER_TIMER == 0){
        var timerId = setInterval(function(){
        if(IS_ORDER_APPROVED == 0){
        if (timeLeft == 0) {
          clearTimeout(timerId);
          Main.NewOrderPopup1();
        } else {
          timeLeft--;
        }
        }
       }, 1000);
       }else{clearInterval(timerId); }
    }
    
 };
 var Home = {
    Main: function(){
        Orders.Main();
        $('#accordion1 li.active').removeClass('active');
        $("#activeoff").addClass('active');    
    },
    
  };