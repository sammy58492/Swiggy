<?php
session_start();
require_once('../login/common.php');
require_authentication(0);      
?>
 


SuperAdmin = {
    Home: function () {
   Main.Loading();
   
        var a = "";
        var b = "";
        var c = "";
        
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
         
             
        b +='<li class="rest_name" ><i class="fa icon-rest-icon icon-sidebar"></i><span class="username"><span id="username1">'+unsme +' '+laname+'</span></span><i class="fa  icon-pencil chevron-icon-sidebar" style="cursor:pointer;" onclick="Myprofile.EditProfile()"></i></li>'
         
      
       b +='<li class="active resetselect" id="activeoff"><a href="javascript:Orders.Main()"><i class="fa icon-order icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_ORDERS'] ?></a></li>'
       

         b +='<li class="resetselect">'
        b +='<a href="javascript:CreateOrder.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa  icon-print icon-sidebar"></i>'
        b +='<?= $lang_resource['ADMIN_PAGE_CREATE_ORDER'] ?>'
        b +='</a>'
        b +='</li>'
        
        b +='<li class="resetselect">'
        b +='<a href="javascript:Bookings.Main()" onclick="SuperAdmin.ScrollTop();">'
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
        b +='<option><?=$lang_resource['ADMIN_PAGE_OR_SELECT_BUSINESS']?></option>'
        for(var e in Main.Business) {
        if(Main.Business[e].name!=''){
        b +='<option value="'+Main.Business[e].id+'">'+Main.Business[e].name+'</option>'
        }
        }
        b +='</select>'
        b +='</li>'    
        b +='<li class="resetselect"><a href="javascript:CSV.Main()"><?=$lang_resource['CONTROL_PANEL_MENU_BUSINESS_SUBMENU1_CSV_UPLOAD']?></a></li>'  
        b +='<li class="resetselect"><a href="javascript:BusinessCSV.Main()"><?=$lang_resource['CONTROL_PANEL_MENU_BUSINESS_SUBMENU1_CSV_BUSINESS_UPLOAD']?></a></li>' 
        b +='</ul>'
        b +='</li>'
        
        
         
        b +='<li class="resetselect">'
        b +='<a href="javascript:InvoiceConf.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa icon-invoice icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_INVOICE'] ?>'
        b +='</a>'
        b +='</li>'

        

        b +='<li class="resetselect"><a href="javascript:DiscountCode.Main()" onclick="SuperAdmin.ScrollTop();"><i class="fa icon-invoice icon-sidebar"></i><?=$lang_resource['ADMIN_PAGE_DISCOUND_CODE']?></a></li>'
      
        b +='<li class="resetselect"><a href="javascript:DiscountOffer.Main()" onclick="SuperAdmin.ScrollTop();"><i class="fa icon-invoice icon-sidebar"></i><?=$lang_resource['ADMIN_PAGE_AUTOMATIC_DISCOUND']?></a></li>'
        

        b +='<li class="resetselect" ><a href="javascript:Business_Review.Main()" onclick="SuperAdmin.ScrollTop();"><i class="fa icon-invoice icon-sidebar"></i><?=$lang_resource['ADMIN_PAGE_BUSINESS_REVIEW']?></a></li>'      

        
            if(Main.PointPermission=='1')
            {
        
        b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion4" href="#PointLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['ADMIN_PAGE_REWARD_SYSTEM'] ?>'
        b +='</a>'        
        b +='<ul class="submenu collapse"  id="PointLink" >'
        b +='<li class="resetselect"><a href="javascript:PointSettings.Main()"><?= $lang_resource['CONTROL_PANEL_MENU_REWARD_POINT_SETTINGS'] ?></a></li>'
        
        b +='<li class="resetselect"><a href="javascript:UserPoints.Main()"><?= $lang_resource['CONTROL_PANEL_MENU_REWARD_USER_POINTS'] ?></a></li>'
        b +='<li class="resetselect"><a href="javascript:GlobalPoint.Main()"><?= $lang_resource['CONTROL_PANEL_MENU_REWARD_GLOBAL_POINT_SETTINGS'] ?></a></li>' 
 
       
        
             
        b +='</ul>'
        b +='</li>'
       } 

 b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion4" href="#CountryLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['ADMIN_PAGE_COUNTRY_CITY_MANAGER'] ?>'
        b +='</a>'        
        b +='<ul class="submenu collapse"  id="CountryLink" >'
         b +='<li class="resetselect"><a href="javascript:CountrySettings.Main()"><?= $lang_resource['ADMIN_PAGE_SUPERADMIN_MANAGE_COUNTRIES'] ?></a></li>'
        b +='<li class="resetselect"><a href="javascript:Franchises.Main()"><?= $lang_resource['CONTROL_PANEL_MENU_CITY'] ?></a></li>'
        
       
       
 
       
        
             
        b +='</ul>'
        b +='</li>'
        
        /*b +='<li class="resetselect">'
        b +='<a href="javascript:Franchises.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa icon-city-super icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_CITY'] ?>'
        b +='</a>'
        b +='</li>'*/
        
        b +='<li class="resetselect">'
        b +='<a href="javascript:Users.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa icon-icon-users icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_USER'] ?>'
        b +='</a>'
        b +='</li>'        
        
        b +='<li class="resetselect">'
        b +='<a href="javascript:DriverSection.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa icon-driver icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_DRIVER'] ?>'
        b +='</a>'
        b +='</li>'
        
        

        b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion4" href="#fourthLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_DELIVERR_HEADING'] ?>'
        b +='</a>'        
        b +='<ul class="submenu collapse"  id="fourthLink" >'
        b +='<li class="resetselect"><a href="javascript:MultiDeliverySection.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_MULTI_DELIVERR'] ?></a></li>'
        b +='<li class="resetselect"><a href="javascript:MultiDeliveryNeighborhoodSection.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_DELIVERR_ZONE_NEIGHBORHOOD'] ?></a></li>'
             
        b +='</ul>'
        b +='</li>'

        

        b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion3" href="#thirdLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_STATISTIC_HEADING'] ?>'
        b +='</a>'        
        b +='<ul class="submenu collapse"  id="thirdLink" >'
        b +='<li class="resetselect"><a href="javascript:searchstatisticsnew.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_SEARCH_STATISTICS_NEW'] ?></a></li>'
        b +='<li class="resetselect"><a href="javascript:Statistics.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_STATISTIC'] ?></a></li>'
             
        b +='</ul>'
        b +='</li>'
        
     /*   b +='<li class="resetselect">'
        b +='<a href="javascript:Ads.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa  icon-icon-ads icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_ADS'] ?>'
        b +='</a>'
        b +='</li>'*/
        
        b +='<li class="resetselect" >'
        b +='<a href="javascript:CMS.Main()" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa icon-invoice icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_CMS_PAGE'] ?>'
        b +='</a>'
        b +='</li>'
   
   //Landing page

   /*     b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion3" href="#FourthLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_LANDING_PAGE'] ?>'
        b +='</a>'        
        b +='<ul class="submenu collapse"  id="FourthLink" >'
        b +='<li class="resetselect"><a href="javascript:Landing.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_LANDING_PAGE'] ?></a></li>'
        b +='<li class="resetselect"><a href="javascript:Landing_Report.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_LANDING_PAGE_REPORT'] ?></a></li>'
              
        b +='</ul>'
        b +='</li>' */
        
        b +='<li class="panel">'
        b +='<a data-toggle="collapse" data-parent="#accordion5" href="#fiveLink">'
        b +='<i class="fa icon-restaurant icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i><?= $lang_resource['CONTROL_PANEL_MENU_CONFIG_SUBMENU3'] ?>'
        b +='</a>'        
        b +='<ul class="submenu collapse"  id="fiveLink" >'
        b +='<li class="resetselect"><a href="javascript:Managelanguage.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE'] ?></a></li>'
        b +='<li class="resetselect"><a href="javascript:AdminLanguage.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE_ADMIN'] ?></a></li>'
         b +='<li><a href="javascript:Languagesettings.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_CONFIG_SUBMENU2'] ?></a></li>'     
        b +='</ul>'
        b +='</li>'
        
        
        b +='<li class="panel resetselect">'
        b +='<a data-toggle="collapse" data-parent="#accordion2" href="#secondLink">'
        b +='<i class="fa  icon-config icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i>'
        b +='<?= $lang_resource['CONTROL_PANEL_MENU_CONFIG'] ?>'
        b +='</a>'
        b +='<ul class="submenu collapse"  id="secondLink" >'

        b +='<li><a href="javascript:SiteSection.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_CONFIG_SUBMENU1'] ?></a></li>'
        b +='<li><a href="javascript:SoundNotification.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_CONFIG_PROVIDER_SUBMENU1'] ?></a></li>'
       
        //b +='<li><a href="javascript:Managelanguage.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['CONTROL_PANEL_MENU_CONFIG_SUBMENU3'] ?></a></li>'
         b +='<li><a href="javascript:Printerpath.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_PRINTER']?></a></li>'
        b +='<li><a href="javascript:configapps.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_APPS']?></a></li>'        
        //b +='<li><a href="javascript:CountrySettings.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_MANAGE_COUNTRIES']?></a></li>'
        b +='<li><a href="javascript:Neighborhood.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS2']?></a></li>'
        b +='<li><a href="javascript:Website.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_TEMPLATE_SETTING']?></a></li>' 
        b +='<li><a href="javascript:PaymentGatewaySettings.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_PAYMENT_SETTING']?></a></li>'
     //   b +='<li><a href="javascript:PanelSetting.Main()" onclick="SuperAdmin.ScrollTop();"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_PANEL_SETTING']?></a></li>'  
    //    b +='<li><a href="javascript:widgetSetting.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['WIDGET'] ?></a></li>'
	//	 b +='<li><a href="javascript:widgetSettingFinal.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['SUPER_WIDGET'] ?></a></li>'	
		  b +='<li><a href="javascript:ZipcodePattern.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['ZIPCODE_PATTERN'] ?></a></li>'

          
        b +='</ul>'
        b +='</li>'
        



   
    /*     //request collection start
        b +='<li class="panel resetselect">'
        b +='<a data-toggle="collapse" data-parent="#accordion2" href="#secondLink1">'
        b +='<i class="fa  icon-config icon-sidebar"></i>'
        b +='<i class="fa  icon-uniE91D chevron-icon-sidebar"></i>'
        b +='<?= $lang_resource['REQUEST_COLLECTION'] ?>'
        b +='</a>'
        b +='<ul class="submenu collapse"  id="secondLink1" >'
        b +='<li><a href="javascript:Requestcollection.Main()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['REQUEST_COLLECTION_SETTING'] ?></a></li>'
        b +='<li><a href="javascript:Requestcollection.requestCollectionDeliveryFee1()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'] ?></a></li>'
        b +='<li><a href="javascript:Requestcollection.schedule()" onclick="SuperAdmin.ScrollTop();"><?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION_SCHEDULE'] ?></a></li>'
        
        b +='</ul>'
        b +='</li>'         */
        
    /*    //Template selection settings
        
       b +='<li ><a href="javascript:SiteSwitchingSettings.settingEdit()" onClick="SiteSection.addBtn(2);"><i class="fa  icon-config icon-sidebar"></i><?= $lang_resource['SITE_SWITCHING_SETTINGS']?></a></li>'*/
         
        
        
    /*    b +='<li class="resetselect">'
        b +='<a href="javascript:OrderPrint.Main(0,0)" onclick="SuperAdmin.ScrollTop();">'
        b +='<i class="fa  icon-print icon-sidebar"></i>'
        b +='<?=$lang_resource['ADMIN_PAGE_ORDER_PRINT']?>'
        b +='</a>'
        b +='</li>' */

     

      
        b +='<li>OOS Version <span>5.00</span></li>'

         
         //request collection end

        Main.Config.Countries = new Object();
        Main.Config.Countries.List = new Object();
        Main.Config.Countries.List.SortBy = "id";
        Main.Config.Countries.List.SortByStatus = "min"
        document.getElementById("accordion1").innerHTML = b;
        

        
         var selector2 = '#accordion1 li';
        $(selector2).on('click', function(){        
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(selector1).removeClass('active');
            $(selector3).removeClass('active');
            $(selector4).removeClass('active');
            $(this).addClass('active');             
        });


        var selector = '#firstLink li';

        $(selector).on('click', function(){
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(selector1).removeClass('active');
            $(selector3).removeClass('active');
            $(selector4).removeClass('active');
            $(this).addClass('active');                        
        });

         var selector3 = '#thirdLink li';

        $(selector3).on('click', function(){           
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(selector1).removeClass('active');
            $(selector3).removeClass('active');
            $(selector4).removeClass('active');
            $(this).addClass('active');                        
        });

        
        var selector4 = '#fourthLink li';

        $(selector3).on('click', function(){           
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(selector1).removeClass('active');
            $(selector3).removeClass('active');
            $(selector4).removeClass('active');            
            $(this).addClass('active');                        
        });
        
        var selector1 = '#secondLink li';

        $(selector1).on('click', function(){
            $(selector).removeClass('active');
            $(selector2).removeClass('active');
            $(selector1).removeClass('active');
            $(selector3).removeClass('active');
            $(selector4).removeClass('active');       
            $(this).addClass('active');
        });
        $(".resetselect").on('click', function(){
            $("#selectbusiness option:first").attr("selected", true);
        });
        
    var myParams = location.search.split('template=');
       
        if(myParams[1]) {
        SiteSwitchingSettings.settingEdit();
        
     } else {
    Orders.Main();
    }
   
     
       Main.Ready();
    },
    
    ScrollTop: function(){
     $(window).scrollTop(0);
    
    },
   
    HomeUrl: function () {
     window.location="./";
    },
         
};
