<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var Admin = {
    Home: function () {
        var a = "";
        var b = "";
        b += Visuals.CreateMenuItem("Admin.HomeUrl()", "<?=$lang_resource['CONTROL_PANEL_START']?>");
        b += Visuals.CreateMenuItem("Business.Main()", "<?=$lang_resource['CONTROL_PANEL_BUSINESS']?>");
        b += Visuals.CreateMenuItem("Users.Main()", "<?=$lang_resource['CONTROL_PANEL_USERS']?>");
        b += Visuals.CreateMenuItem("Orders.Main()", "<?=$lang_resource['CONTROL_PANEL_ORDERS']?>");
        b += Visuals.CreateMenuItem("Statistics.Main()", "<?=$lang_resource['CONTROL_PANEL_STATISTICS']?>");
        var c = '<div id="secondarymenu">';
        c += Visuals.CreateBoxButton("Business.Main()", "<?=$lang_resource['CONTROL_PANEL_BUSINESS']?>", "business list", "business");
        c += Visuals.CreateBoxButton("Orders.Main()", "<?=$lang_resource['CONTROL_PANEL_ORDERS']?>", "orders list", "orders");
        c += Visuals.CreateBoxButton("Users.Main()", "<?=$lang_resource['CONTROL_PANEL_USERS']?>", "active users", "users");
        c += Visuals.CreateBoxButton("Statistics.Main()", "<?=$lang_resource['CONTROL_PANEL_STATISTICS']?>", "data analysis", "statistics");
         c+=Visuals.CreateBoxButton("DiscountCode.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT'] ?>","","discount");
         c+=Visuals.CreateBoxButton("DiscountOffer.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_OFFER'] ?>","","discountOffer");
         c+=Visuals.CreateBoxButton("ZipBusiness.Main()","<?= $lang_resource['CONTROLL_PANEL_ZIPTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_ZIPBUSINESS'] ?>","ziplogo");
        c += "</div>";
        document.getElementById("totalOrderBox").style.display = "block";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("menu").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        document.getElementById("opcsicon").onclick = function () {
         document.getElementById("totalOrderBox").style.display = "none";
            Main.EditProfile("Admin.Home()")
        }
    },
     HomeUrl: function () {
     window.location="./";
    }
};
