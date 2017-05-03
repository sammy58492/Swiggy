<?php
session_start();
require_once('../login/common.php');
//require_authentication(5);
?>
var DriverManagerFront = {

    Home: function () {
    
        var a = "";
        var b = "";
        b += Visuals.CreateMenuItem("DriverManagerFront.HomeUrl()", "Home");
        b += Visuals.CreateMenuItem("Orders.Main()", "Orders");
        var c = '<div id="secondarymenu">';
       
          c+=Visuals.CreateBoxButton("DriverGroup.Main()","<?= $lang_resource['CONTROLL_PANEL_DRIVERGROUPTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_DRIVERGROUPTDTL'] ?>","drivergroup");
          
           c+=Visuals.CreateBoxButton("Driver.Main()","<?= $lang_resource['CONTROLL_PANEL_DRIVER1TEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_DRIVER1TDTL'] ?>","driver");
           
           c+=Visuals.CreateBoxButton("Orders.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_ORDERS'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_ORDERS'] ?>","orders");
           
              c+=Visuals.CreateBoxButton("DriverManager.EditDM()","My Profile","","drivermanager");
           
        c+="</div>";

         document.getElementById("totalOrderBox").style.display = "block";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("menu").innerHTML = b;
        document.getElementById("main").innerHTML = c;
          document.getElementById("totalOrderBox").style.display = "none";
          document.getElementById("panel-member").style.display = "none";
         document.getElementById("panel_1").style.width = "48px";
         document.getElementById("opcsicon").onclick = function () {
            Main.EditProfile("DriverManager.Home()")
        }
    },
     HomeUrl: function () {
     window.location="./";
    }
};