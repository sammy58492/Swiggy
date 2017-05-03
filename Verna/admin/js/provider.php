<?php
session_start();
require_once('../login/common.php');
require_authentication(2);
?>
var Provider = {
    Home: function () {
     Main.Loading();
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
        
        b +='<li class="rest_name"><i class="fa icon-rest-icon icon-sidebar"></i><span class="username"><span id="username1">'+unsme +' '+laname+'</span></span><i class="fa  icon-pencil chevron-icon-sidebar" style="cursor:pointer;" onclick="Myprofile.EditProfile()"></i></li>'
        
        b +='<li class="active resetselect" id="activeoff"><a href="javascript:Orders.Main()"><i class="fa icon-order icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_ORDERS'] ?></a></li>'
        
        b +='<li class="resetselect">'
        b +='<a href="javascript:CreateOrder.Main()">'
        b +='<i class="fa  icon-print icon-sidebar"></i>'
        b +='<?= $lang_resource['ADMIN_PAGE_CREATE_ORDER'] ?>'
        b +='</a>'
        b +='</li>'

        b +='<li class="resetselect">'
        b +='<a href="javascript:Bookings.Main()">'
        b +='<i class="fa icon-invoice icon-sidebar"></i>'
        b +='<?=$lang_resource['ADMIN_PAGE_MY_BOOKING']?>'
        b +='</a>'
        b +='</li>'

        b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion1" href="#firstLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_BUSINESS'] ?>'
        b +='</a>'
        
        b +='<ul class="submenu collapse"  id="firstLink" >'
        b +='<li class="resetselect"><a href="javascript:Business.Main()"><?= $lang_resource['CONTROL_PANEL_MENU_BUSINESS_SUBMENU1'] ?></a></li>'
        b +='<li>'
       
        b +='<select id="selectbusiness" class="form-control rounded" onchange="Business.Edit(this.value)">'
        b +='<option>or Select Business</option>';
        for(var e in Main.Business) {
        b +='<option value="'+Main.Business[e].id+'">'+Main.Business[e].name+'</option>'
        }
        b +='</select>'
        b +='</li>'
        b +='</ul>'
        b +='</li>'

        b +='<li class="resetselect">'
        b +='<a href="javascript:MyInvoice.Main()">'
        b +='<i class="fa icon-invoice icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_INVOICE'] ?>'
        b +='</a>'
        b +='</li>'

        
      
        b +='<li class="resetselect"><a href="javascript:DiscountCode.Main()"><i class="fa icon-invoice icon-sidebar"></i><?=$lang_resource['ADMIN_PAGE_DISCOUND_CODE']?></a></li>'
      
      
        b +='<li class="resetselect"><a href="javascript:DiscountOffer.Main()"><i class="fa icon-invoice icon-sidebar"></i><?=$lang_resource['ADMIN_PAGE_AUTOMATIC_DISCOUND']?></a></li>'
      
      
		b +='<li class="resetselect"><a href="javascript:MultiDeliveryNeighborhoodSection.Main()"><i class="fa icon-invoice icon-sidebar"></i><?=$lang_resource['ADMIN_PAGE_PANEL_PROVIDER_DELIVERYZONE']?></a></li>'
        
        
        if(Main.seepermission == 'true'){  
        b +='<li class="resetselect">'
        b +='<a href="javascript:Users.Main()">'
        b +='<i class="fa icon-icon-users icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_USER'] ?>'
        b +='</a>'
        b +='</li>' 
        }

        b +='<li class="resetselect">'
        b +='<a href="javascript:Statistics.Main()">'
        b +='<i class="fa icon-pie icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_STATISTIC'] ?>'
        b +='</a>'
        b +='</li>'
         
        //b +='<li class="resetselect">'
        //b +='<a href="javascript:CreateOrder.Main()">'
        //b +='<i class="fa  icon-print icon-sidebar"></i>'
        //b +='<?= $lang_resource['ADMIN_PAGE_CREATE_ORDER'] ?>'
        //b +='</a>'
        //b +='</li>'        
        
        b +='<li class="panel resetselect">'
        b +='<a data-toggle="collapse" data-parent="#accordion2" href="#secondLink">'
        b +='<i class="fa  icon-config icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_CONFIG'] ?>'
        b +='</a>'
        b +='<ul class="submenu collapse"  id="secondLink" >'
        b +='<li><a href="javascript:SoundNotification.Main()"><?= $lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SUBMENU1'] ?></a></li>'
        b +='<li><a href="javascript:Myprofile.EditProfile()"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_PROFILE']?></a></li>'
        b +='</ul>'
        b +='</li>'

        b +='<li class="resetselect">'
        b +='<a href="javascript:OrderPrint.Main()">'
        b +='<i class="fa  icon-print icon-sidebar"></i>'
        b +='<?=$lang_resource['ADMIN_PAGE_ORDER_PRINT']?>'
        b +='</a>'
        b +='</li>'

        b +='<li>OOS Version <span>5.00</span></li>'
        

		
       // b +='<li class="active resetselect" id="activeoff"><a href="javascript:Orders.Main()"><i class="fa icon-order icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_ORDERS'] ?></a></li>'
        
        document.getElementById("accordion1").innerHTML = b;
        
        var selector2 = '#accordion1 li';
        $(selector2).on('click', function(){
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(selector1).removeClass('active');
            $(this).addClass('active');
        });

        var selector = '#firstLink li';

        $(selector).on('click', function(){
            $(selector).removeClass('active');
            $(this).addClass('active');
        });
		
        var selector1 = '#secondLink li';

        $(selector1).on('click', function(){
            $(selector1).removeClass('active');
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(this).addClass('active');
        });

        $(".resetselect").on('click', function(){
            $("#selectbusiness option:first").attr("selected", true);
        });
        
        

        //document.getElementById("opcsicon").style.display = "none"
        Orders.Main();
        
        
    },
     HomeUrl: function () {
     window.location="./";
    },
    };

