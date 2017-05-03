<?php
session_start();
require_once('../login/common.php');
//require_authentication(5);
?>
var DriverManagerFront = {

    Home: function () {
    
        var a = "";
        var b = "";
        
        var unsme = "";
        var laname = "";
        if(Main.User.name[Main.langdefault]){
       
        unsme = Main.User.name[Main.langdefault];
        }else{     
        
         unsme = Main.User.name[1];
        }
      
        if(Main.User.lastname[Main.langdefault]){
        laname = Main.User.lastname[Main.langdefault];
        }else{       
         laname = Main.User.lastname[1];
        }
   
        b +='<li class="rest_name"><i class="fa icon-rest-icon icon-sidebar"></i><span class="username"><span id="username1">'+unsme +' '+laname+'</span></span><i class="fa  icon-pencil chevron-icon-sidebar" style="cursor:pointer;" onclick="drivermanagerMyprofile.EditProfile()"></i></li>'
        
        
        b +='<li class="active resetselect" id="activeoff"><a href="javascript:Orders.Main()"><i class="fa icon-order icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_ORDERS'] ?></a></li>'
        
        
        b +='<li>'
        b +='<a href="javascript:DriverSection.Main()">'
        b +='<i class="fa icon-driver icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_DRIVER'] ?>'
        b +='</a>'
        b +='</li>'
       
        
        b +='<li>'
        b +='<a href="javascript:drivermanagerMyprofile.EditProfile()">'
        b +='<i class="fa icon-user7 icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_MYACCOUNT'] ?>'
        b +='</a>'
        b +='</li>'                   			

        b +='<li>OOS Version <span>5.00</span></li>'
        
        document.getElementById("accordion1").innerHTML = b;

        /*document.getElementById("opcsicon").onclick = function () {
            Main.EditProfile("DriverManager.Home()")
        }*/
         var selector2 = '#accordion1 li';
        $(selector2).on('click', function(){            
            $(selector2).removeClass('active');
            $(this).addClass('active');             
        });
        
        Orders.Main();
    },
     HomeUrl: function () {
     window.location="./";
    }
};
