<?php
session_start();
require_once('../login/common.php');
require_authentication();
?>
$(window).load(function () {
    $("#initbg").hide()
});
$(document).ready(function () {
    Main.Loading();
    $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchUserData"},{"operation":"FetchSiteSetting"}]', function (a) {
    
   
        if (a != "") {
            Main.User = JSON.parse(a).user;
            Main.siteSettingUrl = JSON.parse(a).siteSetting;
            
          
              
            $.post("lib/users.php", "f=GetUserConfig", function (b) {
                Main.PopulateUserConfigObject(b);
                
                Main.InitInterface();
                Main.Ready()
            })
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
            if (this.User.level < 3) {
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
                    Main.Config.Orders = new Object();
                    Main.Config.Orders.List = new Object();
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
                    Main.Config.Orders.List.SortBy = a.Orders.List.SortBy;
                    Main.Config.Orders.List.SortByStatus = a.Orders.List.SortByStatus
                } catch (c) {}
            }
            if (this.User.level < 2) {
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
                    Main.Config.Countries.List.SortByStatus = a.Countries.List.SortByStatus;
                      Main.Config.Neighborhood = new Object();
                    Main.Config.Neighborhood.List = new Object();
                    Main.Config.Neighborhood.List.SortBy = a.Neighborhood.List.SortBy;
                    Main.Config.Neighborhood.List.SortByStatus = a.Neighborhood.List.SortByStatus;
                    Main.Config.discount = new Object();
                    Main.Config.discount.List = new Object();
                    Main.Config.discount.List.SortBy = a.discount.List.SortBy;
                    Main.Config.discount.List.SortByStatus = a.discount.List.SortByStatus;
                } catch (c) {}
            }
        } else {
            if (this.User.level < 3) {
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
            if (this.User.level < 2) {
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
                Main.Config.Countries.List.SortByStatus = "min";
                 Main.Config.Neighborhood = new Object();
                Main.Config.Neighborhood.List = new Object();
                Main.Config.Neighborhood.List.SortBy = "id";
                Main.Config.Neighborhood.List.SortByStatus = "min";
            }
        }
    },
    InitInterface: function () {
   
        BrowserDetect.init();
        Popup.Init("popupcontainer");
       
        this.ClientOs = BrowserDetect.OS;
        this.ClientBrowserVersion = BrowserDetect.version;
        this.ClientBrowserName = BrowserDetect.browser;
        $("#logouticon").click(Main.LogOut);
        switch (this.User.level) {
        case "0":
            SuperAdmin.Home();
            break;
        case "1":
            Admin.Home();
            break;
        case "2":
            Provider.Home();
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
        document.getElementById("usertype").innerHTML = this.User.levelname
    },
    Request: function (To, Container, Vars, OnComplete) {
        this.Loading();
        Forms.EnableSubmitButton(false);
        var This = this;
        var MyAid = new Date().getTime();
        Main.Aid = MyAid;
        $.post("lib/" + To + ".php", Vars, function (Data) {
       
     		
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
    Loading: function (a) {
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
    EditProfile: function (a) {
    document.getElementById("totalOrderBox").style.display = "none";
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
        
        //alert(Data)
        
          
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
    ToogleAllCheckBoxes: function () {
        $(".checkbox").each(function (b, a) {
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
    }
};
