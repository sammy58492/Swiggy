<?php
session_start();
require_once('../login/common.php');
require_authentication(0);		
?>
SuperAdmin = {
    Home: function () {
        var a = "";
        var b = "";
         //Settings to select miles or km 
         $.post("lib/panel-configs.php", "f=GetConfig&name=distanceformat", function (c1) {
          SuperAdmin.distanceFormat=c1;
        b+=Visuals.CreateMenuItem("SuperAdmin.HomeUrl()","<?= $lang_resource['CONTROL_PANEL_START'] ?>");
		b+=Visuals.CreateMenuItem("Franchises.Main()","<?= $lang_resource['CONTROL_PANEL_FRANCHISES'] ?>");
		b+=Visuals.CreateMenuItem("Business.Main()","<?= $lang_resource['CONTROL_PANEL_BUSINESS'] ?>");
		b+=Visuals.CreateMenuItem("Users.Main()","<?= $lang_resource['CONTROL_PANEL_USERS'] ?>");
		b+=Visuals.CreateMenuItem("Ads.Main()","<?= $lang_resource['CONTROL_PANEL_ADS'] ?>");
		b+=Visuals.CreateMenuItem("Orders.Main()","<?= $lang_resource['CONTROL_PANEL_ORDERS'] ?>");
		b+=Visuals.CreateMenuItem("Statistics.Main()","<?= $lang_resource['CONTROL_PANEL_STATISTICS'] ?>");
		var c='<div id="secondarymenu">';
		c+=Visuals.CreateBoxButton("Franchises.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_FRANCHISES'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_FRANCHISES'] ?>","cities");
		c+=Visuals.CreateBoxButton("Business.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_BUSINES'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_BUSINES'] ?>","business");
		c+=Visuals.CreateBoxButton("Orders.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_ORDERS'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_ORDERS'] ?>","orders");
		c+=Visuals.CreateBoxButton("Users.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_USERS'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_USERS'] ?>","users");
		c+=Visuals.CreateBoxButton("Statistics.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_STATISTICS'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_STATISTICS'] ?>","statistics");
		c+=Visuals.CreateBoxButton("Ads.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_ADS'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_SUB_ADS'] ?>","adds");
         c+=Visuals.CreateBoxButton("DiscountCode.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT'] ?>","","discount");
         c+=Visuals.CreateBoxButton("DiscountOffer.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_OFFER'] ?>","","discountOffer");
          c+=Visuals.CreateBoxButton("Deliveryzone.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DELIVERY_AREA'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_DELIVERY_AREA_SMALL'] ?>","delivery");
         //Settings to select miles or km 
       		 if(SuperAdmin.distanceFormat=="N"){
           
              c+=Visuals.CreateBoxButton("DeliveryByKm.Main()","<?= $lang_resource['CONTROLL_PANEL_IDELIVERYTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_IDELIVERY_SHORTTEXT1'] ?>","invoice");
            }else{
            		  c+=Visuals.CreateBoxButton("DeliveryByKm.Main()","<?= $lang_resource['CONTROLL_PANEL_IDELIVERYTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_IDELIVERY_SHORTTEXT'] ?>","invoice");
            		
            }
          c+=Visuals.CreateBoxButton("InvoiceDtl.Main()","<?= $lang_resource['CONTROLL_PANEL_INVOICETEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_INVOICETDTL'] ?>","invoice");
         c+=Visuals.CreateBoxButton("GalleryImg.Main()","<?= $lang_resource['GALLERY_PANEL'] ?>","<?= $lang_resource['GALLERY_PANEL_AREA_SMAL'] ?>","adds");
          c+=Visuals.CreateBoxButton("ZipBusiness.Main()","<?= $lang_resource['CONTROLL_PANEL_ZIPTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_ZIPBUSINESS'] ?>","ziplogo");
          c+=Visuals.CreateBoxButton("FooterPages.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_FOOTER_PAGES'] ?>","","adds");
          c+=Visuals.CreateBoxButton("FrontImage.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD'] ?>","<?= $lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD_SMALL_TEXT'] ?>","adds");
          
          c+=Visuals.CreateBoxButton("DriverManager.Main()","<?= $lang_resource['CONTROLL_PANEL_DRIVERTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_DRIVERTDTL'] ?>","drivermanager");
          c+=Visuals.CreateBoxButton("DriverGroup.Main()","<?= $lang_resource['CONTROLL_PANEL_DRIVERGROUPTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_DRIVERGROUPTDTL'] ?>","drivergroup");
          
           c+=Visuals.CreateBoxButton("Driver.Main()","<?= $lang_resource['CONTROLL_PANEL_DRIVER1TEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_DRIVER1TDTL'] ?>","driver");
          
          
          c+=Visuals.CreateBoxButton("FooterPagesCms.Main()","<?= $lang_resource['CONTROLL_PANEL_CMSFOOTER'] ?>","<?=$lang_resource['CONTROLL_PANEL_CMSFOOTERDTL']?>","cmsmodule"); 
           
           
          
        c += "</div>";
        Main.Config.Countries = new Object();
        Main.Config.Countries.List = new Object();
        Main.Config.Countries.List.SortBy = "id";
        Main.Config.Countries.List.SortByStatus = "min"
        document.getElementById("totalOrderBox").style.display = "block";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("menu").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        document.getElementById("opcsicon").onclick = SuperAdmin.PrintMain 
        })
    },
    HomeUrl: function () {
     window.location="./";
    },
    autoLogout:function(){
		
		   var a = new Date().getTime();
        Main.Aid = a;
		       $.post("lib/front-bulk.php", 'data=[{"operation":"autoLogout"}]', function (b)
        {




        })

	},
    PrintMain: function () {
    document.getElementById("totalOrderBox").style.display = "none";
        var a = Visuals.CreateSearchBox();
        var c = new Array();
        var b = new Array();
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.EditProfile()", "<?= $lang_resource['my_profile_V2'] ?>"));
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreGaForm()", "Google analytics"));
        b.push({
            caption: "<?= $lang_resource['create_category_V2'] ?>",
            link: "SuperAdmin.CategoryForm()"
        });
        b.push({
            caption: "<?= $lang_resource['edit_category_V2'] ?>",
            link: "SuperAdmin.EditCategory()"
        });
        b.push({
            caption: "<?= $lang_resource['delete_category_V2'] ?>",
            link: "SuperAdmin.DeleteCategory()"
        });
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.CategoriesManager(true)", "<?= $lang_resource['categories_V2'] ?>", b));
      
        b = new Array();
        b.push({
            caption: "<?= $lang_resource['create_country_V2'] ?>",
            link: "SuperAdmin.CountryForm()"
        });
        b.push({
            caption: "<?= $lang_resource['edit_country_V2'] ?>",
            link: "SuperAdmin.EditCountry()"
        });
        b.push({
            caption: "<?= $lang_resource['delete_country_V2'] ?>",
            link: "SuperAdmin.DeleteCountry()"
        });
        
        var b2 = new Array();
         b2.push({
            caption: "<?= $lang_resource['create_neighborhood_V2'] ?>",
            link: "SuperAdmin.PreNeighborForm()"
        });
        b2.push({
            caption: "<?= $lang_resource['edit_neighborhood_V2'] ?>",
            link: "SuperAdmin.EditNeighborhood()"
        });
        b2.push({
            caption: "<?= $lang_resource['delete_neighborhood_V2'] ?>",
            link: "SuperAdmin.DeleteNeighborhood()"
        });
        
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.CountriesManager(true)", "<?= $lang_resource['countries_V2'] ?>", b));
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.NeighborhoodManager(true)", "<?= $lang_resource['neighborhood_V2'] ?>", b2));
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreAdsForm()", "<?= $lang_resource['advertisement_V2'] ?>"));
         c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreComForm()", "<?= $lang_resource['COMMISSION_V21'] ?>"));
         c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreSettingForm()", "<?= $lang_resource['SITESETTINGS_V21'] ?>"));
         c.push(Visuals.CreateSubMenuItem("LogoImage.Main()", "<?= $lang_resource['LOGOSETTINGS_V21'] ?>"));
        /*Split Payment (06-08-2014)*/
         if(Main.User.level==0)
        {
         c.push(Visuals.CreateSubMenuItem("SuperAdmin.SpPayForm()", "<?=$lang_resource['SPLIT_PAYMENTMAIL_ADAPTIVE']?>"));
         }
         /*Split Payment (06-08-2014)*/
           c.push(Visuals.CreateSubMenuItem("SuperAdmin.PrinterSet()", "<?=$lang_resource['PRINTER_SET_MODEL']?>"));
           //tabsetting start
              c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreTabSetForm()", "<?=$lang_resource['SUPERADMIN_TAB_SETTINGS']?>"));
             c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreFrontSet()", "<?=$lang_resource['SUPERADMIN_SET_FRONT_SETTINGS']?>"));
              c.push(Visuals.CreateSubMenuItem("SuperAdmin.PreServiceFeeSet()", "<?=$lang_resource['SERVICE_FEE_V2']?>"));
           //tabsetting end
           
           
     	<!--Sound-Alert-Popup-->      
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.SosundAlertSettings()", "<?=$lang_resource['SOUNDALERT_V2']?>"));   
           
     	<!--Sound-Alert-Popup-->      
             <!--Business Page Setting-->      
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.BusinessPageSettings()", "<?=$lang_resource['BUSINESS_PAGE_SETTING']?>"));   
           
     	<!--Business Page Setting-->      
           	<!--site schedule-->      
        c.push(Visuals.CreateSubMenuItem("SuperAdmin.siteScheduleSettings()", "<?=$lang_resource['SITE_SCHEDULE_SETTING']?>"));   
       c.push(Visuals.CreateSubMenuItem("SuperAdmin.siteScheduleSettingsText()", "<?=$lang_resource['SITE_SCHEDULE_SETTING_TEXT']?>")); 
       c.push(Visuals.CreateSubMenuItem("SuperAdmin.sitePanelSettings()", "<?=$lang_resource['SITE_PANEL_SETTING_TEXT']?>"));      
     	<!--site schedule-->   
           
           
        a += Visuals.CreateSubMenu(c);
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = ""
		
		sms.EnableSmsSettings();
	},
     /*Split Payment (06-08-2014)*/
    SpPayForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        
        $.post("lib/panel-configs.php", "f=GetsettingsConfig", function (b) {
      	
      //alert(b)
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            SuperAdmin.SplitForm(b)
        })
    },
    PrinterSetForm: function (a, d) {
 
        var b = "";
        var c = "";
        b += Visuals.CreateMainButton("<?= $lang_resource['SMS_BUSSINESS_SAVE_BUTTON'] ?>", "ok", "SuperAdmin.SaveSettingsConfig2('printer')");
        b += Visuals.CreateMainButton("<?= $lang_resource['SMS_BUSSINESS_CANCEL_BUTTON'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("printer", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?=$lang_resource['PRINTER_SET']?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?=$lang_resource['PRINTER_PORT']?></span><div class="inputbox">' + Forms.CreateInputProperty("printer", "apn", Main.NullToEmpty(a), true) + "</div></div>";
        c += '<div class="row"><span class="caption"><?=$lang_resource['PRINTER_SERVERIP']?></span><div class="inputbox">' + Forms.CreateInputProperty("printer", "sip", Main.NullToEmpty(d), true) + "</div></div>";
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
       $("#printer").focus()
    },
    PrinterSet: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        
         $.post("lib/panel-configs.php", "f=GetConfig&name=apn", function (b) {
        
            if (a != Main.Aid) {
                return
            }
			$.post("lib/panel-configs.php", "f=GetConfig&name=sip", function (c) {
            
				if (a != Main.Aid) {
					return
				}
				Main.Ready();
				SuperAdmin.PrinterSetForm(b, c)
			})
        })
    },
    
    
    
    SplitForm: function (a) {

    a = JSON.parse(a)
    
   
        var d = new Array();
        d.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['SELECT_V21']?>"}')); 
        d.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['CHECKOUT_YES']?>"}'));
        d.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['SUPERADMIN_NO_CITY_TAX']?>"}'));
        
        
       var itax = new Array();
        itax.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['SUPERADMIN_NO_CITY_TAX']?>"}')); 
        itax.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['SUPERADMIN_YES_CITY_TAX']?>"}'));
        itax.push(JSON.parse('{"id":"2","caption":"<?=$lang_resource['SUPERADMIN_CUSTOM_CITY_TAX']?> %"}'));
      
   
        var b = "";
        var c = "";
        b += Visuals.CreateMainButton("Save", "ok", "SuperAdmin.SaveSettingsConfig1('spiltform')");
        b += Visuals.CreateMainButton("Cancel", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("spiltform", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?=$lang_resource['SUPERADMIN_SET_SPLIT_SETTINGS']?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        
       c += '<div class="row"><span class="caption"><?=$lang_resource['SPLIT_PAYMENTMAIL_ADAPTIVE']?>t:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "splitcase", d, a.splitcase, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?=$lang_resource['DOSCOUND_PERCENTAGE_OF_COMMISSION']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_per", a.com_per, true) + "</div></div>";
       
        c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_FIXED_RATE_COMMISSION']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_rate", a.com_rate, true) + "</div></div>";
       
         c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_INCLUDING_TAX']?>:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "tax", itax, a.tax, false, "SuperAdmin.TypeChanged(this.value)", false) + "</div></div>";
  
      if (a.tax == 2) {
       
          c += '<div class="row" id="idpercent"><span class="caption"><?=$lang_resource['SUPERADMIN_CUSTOM_CITY_TAX']?>(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom", a.custom, false) + "</div></div>";
      }else{
       
      	  c += '<div class="row" id="idpercent" style="display:none"><span class="caption"><?=$lang_resource['SUPERADMIN_CUSTOM_CITY_TAX']?>(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom", a.custom, false) + "</div></div>";
      }

        c += '<br /><h3>Paypal Adaptive</h3>';
     
        c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_SUPER_ADMIN_EMAIL']?>:</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "semail", a.semail, true) + "</div></div>";
        
        c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_SUPER_USERNAME']?> :</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "pusername", a.pusername, true) + "</div></div>";
        
        
        c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_SUPER_SIGNATURE']?> :</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "psign", a.psign, true) + "</div></div>";
        
        c += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PASS']?> :</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "ppassword", a.ppassword, true) + "</div></div>";
        
        c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_SUPER_APPID']?> :</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "pappid", a.pappid, true) + "</div></div>";
        
         var pa = new Array();
      	pa.push(JSON.parse('{"id":"0","caption":"Sandbox"}')); 
        pa.push(JSON.parse('{"id":"1","caption":"live"}')); 
       	
        
        c += '<div class="row"><span class="caption"><?=$lang_resource['SUPERADMIN_MODE_OF_PAYMENTS']?>:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "paymentmode", pa, a.paymentmode, false) + "</div></div>";
        
        
        c += "</div>";
        c += "</div>";
        c += "</div>";
     
     
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        
       /* if(a[8].applytax!=1)
        {
         document.getElementById("idpercent").style.display = "none";
        }*/
        
        $("#ga").focus()
    },
    
     TypeChanged: function (a) {
		
        if(a == 2)		
			document.getElementById("idpercent").style.display = "";		
		else		
			document.getElementById("idpercent").style.display = "none";
		
    },
    
    SaveSettingsConfig2: function (a) {

          Main.Loading(); 
            
        
        
     
        if (Forms.CanSave(a) == false) {
            return
        }
        Forms.PrepareForSaving(a);
      
       
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=apn&value=" + Main.NullToEmpty(Forms.Form[a].fields.apn.value), function (c) {
         Main.Ready();     
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=sip&value=" + Main.NullToEmpty(Forms.Form[a].fields.sip.value), function (c) {
            Main.Ready();         
         
        });
              
           
           SuperAdmin.PrintMain()
        
        
        Forms.Clean(a)
    }, 
    SaveSettingsConfig1: function (a) {

          Main.Loading(); 
            
        
        
     
        if (Forms.CanSave(a) == false) {
            return
        }
        Forms.PrepareForSaving(a);
      
       
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=splitcase&value=" + Main.NullToEmpty(Forms.Form[a].fields.splitcase.value), function (c) {
         Main.Ready();     
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=com_per&value=" + Main.NullToEmpty(Forms.Form[a].fields.com_per.value), function (c) {
            Main.Ready();         
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=com_rate&value=" + Main.NullToEmpty(Forms.Form[a].fields.com_rate.value), function (c) {
            
             Main.Ready();     
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=tax&value=" + Main.NullToEmpty(Forms.Form[a].fields.tax.value), function (c) {
                Main.Ready();     
         
        });
/*         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=applytax&value=" + Main.NullToEmpty(Forms.Form[a].fields.applytax.value), function (c) {
            
             Main.Ready();     
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=citytax&value=" + Main.NullToEmpty(Forms.Form[a].fields.citytax.value), function (c) {
                Main.Ready();     
         
        });*/
        
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=custom&value=" + Main.NullToEmpty(Forms.Form[a].fields.custom.value), function (c) {
                 Main.Ready();     
        });
        
        
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=semail&value=" + Main.NullToEmpty(Forms.Form[a].fields.semail.value), function (c) {
                 Main.Ready();     
        });
        
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=pusername&value=" + Main.NullToEmpty(Forms.Form[a].fields.pusername.value), function (c) {
                 Main.Ready();     
        });
        
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=ppassword&value=" + Main.NullToEmpty(Forms.Form[a].fields.ppassword.value), function (c) {
                 Main.Ready();     
        });
        
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=psign&value=" + Main.NullToEmpty(Forms.Form[a].fields.psign.value), function (c) {
                 Main.Ready();     
        });
        
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=pappid&value=" + Main.NullToEmpty(Forms.Form[a].fields.pappid.value), function (c) {
                 Main.Ready();     
        });
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=paymentmode&value=" + Main.NullToEmpty(Forms.Form[a].fields.paymentmode.value), function (c) {
                 Main.Ready();     
        });
  
        
           
           SuperAdmin.PrintMain()
        
        
        Forms.Clean(a)
    }, 
    /*Split Payment (06-08-2014)*/
    
     PreComForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetConfig&name=commision", function (b) {
        
   
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            SuperAdmin.coForm(b)
        })
    },
     PreSettingForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetsettingsConfig", function (b) {
      
       
      // alert(b)
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            SuperAdmin.sttingForm(b)
        })
    },
    
    
    
    //tabsetting start
    
    
    
     PreTabSetForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetTabSettings", function (b) {
   
       
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (a) {
          
             a = JSON.parse(a);
            Main.Countries = a.countries;
            SuperAdmin.TabSet(b)
            
            });
        })
    },
    
   
   PreNeighborForm: function (k) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
      
         $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (a) {
          
          Main.Ready();
             a = JSON.parse(a);
            Main.Countries = a.countries;
            SuperAdmin.NeighborForm(k);
            
            });
    },
    
   
    
    
    TabSet: function (a) {
 
    
      a = JSON.parse(a);
   
          
        var b = "";
        var c = "";
       b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "SuperAdmin.SaveTabSettings()");
        b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("tabsettings", "mainbuttonok");
        
        
         e = new Object();
         Forms.Form.tabsettings.type = "modify";
         Forms.Form.tabsettings.id = e.id
         
          Main.select_country = a[0].country;
          Main.select_city = a[0].city;
       
         c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?=$lang_resource['SUPERADMIN_TAB_SETTINGS']?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        
        
        var c1 = new Array();
        c1.push({
            id: "-1",
            caption: ""
        });
        
        
        for (i in Main.Countries) {
            c1.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }
        
     
        
        c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty1("tabsettings", "country", c1, Main.NullToEmpty(a[0].country), false, "SuperAdmin.CountrySelected1(this);GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_CITY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty1("tabsettings", "city", [], Main.NullToEmpty(a[0].city), false, "GoogleMap.UpdateUserPosition(this)") + "</div></div>";
       
      
        var tab_delivery = false;
        var tab_delivery_country = false;
        var tab_delivery_city = false;
        var tab_delivery_address = false;
        var tab_delivery_neighborhood = false;
        var tab_delivery_option = false;
        
        var tab_pickup = false;
        var tab_pickup_country = false;
        var tab_pickup_city = false;
        var tab_pickup_option = false;
        
        var tab_reservation = false;
        var tab_reservation_country = false;
        var tab_reservation_city = false;
        var tab_reservation_option = false;
        
        console.log(a[0].tab_delivery)
      
        if(a[0].tab_delivery=='t')
        {
        var tab_delivery = true;
        }
       if(a[0].tab_delivery_country=='t')
       { 
        var tab_delivery_country = true;
        }
        if(a[0].tab_delivery_city=='t')
        var tab_delivery_city = true;
        if(a[0].tab_delivery_address=='t')
        var tab_delivery_address = true;
        if(a[0].tab_delivery_neighborhood=='t')
        var tab_delivery_neighborhood = true;
        
        if(a[0].tab_delivery_option=='t')
        var tab_delivery_option = true;
     
        if(a[0].tab_pickup=='t')
        var tab_pickup = true;
        if(a[0].tab_pickup_country=='t')
        var tab_pickup_country = true;
        if(a[0].tab_pickup_city=='t')
        var tab_pickup_city = true;
        if(a[0].tab_pickup_option=='t')
        var tab_pickup_option = true;
        
       
        if(a[0].tab_reservation=='t')
        var tab_reservation = true;
        if(a[0].tab_reservation_country=='t')
        var tab_reservation_country = true;
        if(a[0].tab_reservation_city=='t')
        var tab_reservation_city = true;
        if(a[0].tab_reservation_option=='t')
        var tab_reservation_option = true;
        
        
         c += '<div class="tabset">';
        c += '<div class="tab1"><?=$lang_resource['SUPERADMIN_TAB']?></div>';
        
        
         c += '<div class="tab2">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery", tab_delivery) +'<span class="sp-text"><?=$lang_resource['SHOPPING_SECOND_SEND_HEADER']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_country", tab_delivery_country) +'<span class="sp-text"><?=$lang_resource['COUNTRY_V2']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_city", tab_delivery_city) +'<span class="sp-text"><?=$lang_resource['CITY_V2']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_address", tab_delivery_address) +'<span class="sp-text"><?=$lang_resource['Home_address_V2']?></span></div>';
         c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_neighborhood", tab_delivery_neighborhood) +'<span class="sp-text"><?=$lang_resource['LOGIN_CREATE_SUBURB1']?></span></div>';
         
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_delivery_option", tab_delivery_option) +'<span class="sp-text"><?=$lang_resource['SUPERADMIN_OPTIONAL_FILTERS']?></span></div>';
        
          c += '<div class="tab4">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup", tab_pickup) +'<span class="sp-text"><?=$lang_resource['PICKUP']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup_country", tab_pickup_country) +'<span class="sp-text"><?=$lang_resource['COUNTRY_V2']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup_city", tab_pickup_city) +'<span class="sp-text"><?=$lang_resource['CITY_V2']?></span></div>';

        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_pickup_option", tab_pickup_option) +'<span class="sp-text"><?=$lang_resource['SUPERADMIN_OPTIONAL_FILTERS']?></span></div>';
        
          c += '<div class="tab4">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation", tab_reservation) +'<span class="sp-text"><?=$lang_resource['RESERVATION']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation_country", tab_reservation_country) +'<span class="sp-text"><?=$lang_resource['COUNTRY_V2']?></span></div>';
        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation_city", tab_reservation_city) +'<span class="sp-text"><?=$lang_resource['CITY_V2']?></span></div>';

        c += '<div class="tab3">'+ Forms.CreateCheckBoxPropertyTab1("tabsettings", "tab_reservation_option", tab_reservation_option) +'<span class="sp-text"><?=$lang_resource['SUPERADMIN_OPTIONAL_FILTERS']?></span></div>';
        
        c += '</div>';
        
         var d = new Array();
        d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"f","caption":"No"}'));
        
        c += '<div class="row"><span class="caption">Listing Step:</span><div class="inputbox">' + Forms.CreateSelectProperty1("tabsettings", "list_step", d, a[0].list_step, false) + "</div></div>";
        
        
        
        c += "</div>";
        c += "</div>";
        c += "</div>";
        
      
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        
        if (Forms.CanSave("tabsettings")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
        
        Forms.UpdateValue("tabsettings", "country" , a[0].country, true);
        Forms.UpdateValue("tabsettings", "city" , a[0].city, true);
        
        
        $("#tab_delivery_neighborhood").change(function() {
    if(this.checked) {
       
        $('#tab_delivery_address').attr('checked', false);
        tab_delivery_address=false;
        Forms.Form.tabsettings.fields.tab_delivery_address.value="false";
         Forms.Form.tabsettings.fields.tab_delivery_neighborhood.value="true";
         console.log(JSON.stringify(Forms.Form.tabsettings.fields));
      
    }
});

$("#tab_delivery_address").change(function() {
    if(this.checked) {
       
        $('#tab_delivery_neighborhood').attr('checked', false);
        tab_delivery_neighborhood=false;
         Forms.Form.tabsettings.fields.tab_delivery_neighborhood.value="false";
          Forms.Form.tabsettings.fields.tab_delivery_address.value="true";
           console.log(JSON.stringify(Forms.Form.tabsettings.fields));
    }
});
        Users.PopulateCitySelect(a[0].country, a[0].city)
        
        $("#ga").focus()
    },
    
     PreServiceFeeSet:function (){
    
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetConfig&name=servicefee", function (b) {
   
       
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            SuperAdmin.ServiceFeeSet(b)
         
        })
    
    },
      ServiceFeeSet:function(a){
    
      var b = "";
        var c = "";
        b += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveConfig('servicefee')");
        b += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("servicefee", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SERVICE_FEE_V2'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?= $lang_resource['SERVICE_FEE_V2'] ?>(%):</span><div class="inputbox">' + Forms.CreateInputProperty("servicefee", "id", Main.NullToEmpty(a)) + "</div></div>";
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
     },         
     PreFrontSet: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetFrontSettings", function (b) {
   
       
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            SuperAdmin.FrontSet(b)
         
        })
    },
    setRestaurantsList:function(y){
         $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessDataFrontSet"}]', function (a) {
          
        a = JSON.parse(a);
     
        
        SuperAdmin.businessfrontset=a.businessfrontset;
        //////////////////////////////////////
            for (e in  SuperAdmin.businessfrontset) {
                
                    if(( SuperAdmin.businessfrontset[e].city==y) ||(y=='-1')){
                   		elemt=document.getElementById("restaurant" + "_" + SuperAdmin.businessfrontset[e].id + "tag");
                    	 
                        if( elemt!=null){
                            MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + SuperAdmin.businessfrontset[e].id + "close")
                        }
                        if((y!='-1')){
                            for (e1 in MultipleInput.Tags["citytag"]) {
                                
                                if(SuperAdmin.businessfrontset[e].city==MultipleInput.Tags["citytag"][e1].id){
                                     delete MultipleInput.Tags["citytag"][e1]; 
                                }
                            }
                        }
                        for (e2 in MultipleInput.Tags["restaurant"]) {
                        
                            if(SuperAdmin.businessfrontset[e].id==MultipleInput.Tags["restaurant"][e2].id){
                             delete MultipleInput.Tags["restaurant"][e2]; 
                            }
                        }
                    }
             
             }
    
        ///////////////////////////////////////////////////////
      citylist='';
      for (e in MultipleInput.Tags["citytag"]) {
      if(MultipleInput.Tags["citytag"][e]!=''){
      	citylist+=MultipleInput.Tags["citytag"][e].id+',';
      
        }
      }
        cityStr = citylist.substr(0, (citylist.length-1));
        cityArr=  cityStr.split(',');  
     
             for (e in  SuperAdmin.businessfrontset) {
         		if(jQuery.inArray("-1", cityArr) < 0){
             
                      if( ((jQuery.inArray( SuperAdmin.businessfrontset[e].city, cityArr ) < 0 ) && ( SuperAdmin.businessfrontset[e].city!='-1') )|| ( SuperAdmin.businessfrontset[e].id==null)){
                        delete SuperAdmin.businessfrontset[e]; 
                       
                      }
                }else{
              		   countrylist='';
                      for (e in MultipleInput.Tags["countrytag"]) {
                      if(MultipleInput.Tags["countrytag"][e]!=''){
                        countrylist+=MultipleInput.Tags["countrytag"][e].id+',';
                      
                        }
                      }
                     
                    countryStr = countrylist.substr(0, (countrylist.length-1));
                    countryArr=  countryStr.split(',');       
                         for (e in  SuperAdmin.businessfrontset) {
                       
                            if(jQuery.inArray("-1", countryArr) < 0){
                          
                          if( ((jQuery.inArray( SuperAdmin.businessfrontset[e].country, countryArr ) < 0 ) && ( SuperAdmin.businessfrontset[e].country!='-1') )|| ( SuperAdmin.businessfrontset[e].id==null)){
                            delete SuperAdmin.businessfrontset[e]; 
                           
                          }
                            }
                         }
                          
              
              }
         }
        
         ////////////////////////////////////////////////////////////////
         
           restaurantList='';
         for (e5 in SuperAdmin.businessfrontset) {
      if(SuperAdmin.businessfrontset[e5]!=''){
      	restaurantList+=SuperAdmin.businessfrontset[e5].id+',';
      
        }
      }
      
   	   restaurantList = restaurantList.substr(0, (restaurantList.length-1));
       if((restaurantList=='') ){
       	delete SuperAdmin.businessfrontset;
       }
       if(y=='-1'){
        	delete SuperAdmin.businessfrontset;
     

        for (e in MultipleInput.Tags["citytag"]) {
        
            if(MultipleInput.Tags["citytag"][e]!=''){
           		elemt=document.getElementById("citytag" + "_" + MultipleInput.Tags["citytag"][e].id + "tag");
                
                if( elemt!=null){
                	MultipleInput.DeleteTag('citytag', "citytag" + "_" + MultipleInput.Tags["citytag"][e].id+ "close")
                }
                  delete MultipleInput.Tags["citytag"][e]; 
                   delete MultipleInput.Tags["restaurant"][e]; 
            
            }
        }
            
            
       }else{
          if((restaurantList=='-1') ){
         
      	 	delete SuperAdmin.businessfrontset;
           for (e in MultipleInput.Tags["restaurant"]) {
        
            if(MultipleInput.Tags["restaurant"][e]!=''){
           		elemt=document.getElementById("restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id + "tag");
               
                if( elemt!=null){
                	MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id+ "close")
                }
                 
                   delete MultipleInput.Tags["restaurant"][e]; 
            
            }
        }
        
      	 }
       }
         /////////////////////////////////////////////////////////////////////
           
        MultipleInput.Init2("restaurant", SuperAdmin.businessfrontset, true);
          MultipleInput.TagsChange("countrytag");
        MultipleInput.TagsChange("citytag");
            MultipleInput.TagsChange("restaurant");  
          });
    
    },
    setCityList:function (y) {

   $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCitiesDataFrontSet"}]', function (a) {
          a = JSON.parse(a);
		
            for (e in  a.citiesfrontset) {
               
                    if(( a.citiesfrontset[e].country==y) ||(y=='-1')){
                   		elemt=document.getElementById("citytag" + "_" + a.citiesfrontset[e].id + "tag");
						
                  
                        if( (elemt!=null)){
							
                           	  
                            	MultipleInput.DeleteTag('citytag', "citytag" + "_" + a.citiesfrontset[e].id + "close")
							
                            	    
                                for (e7 in MultipleInput.Tags["restaurant"]) {
                           
                                if((a.citiesfrontset[e].id==MultipleInput.Tags["restaurant"][e7].city) || (MultipleInput.Tags["restaurant"][e7].city==-1)){
									
									
								
								 if((MultipleInput.Tags["restaurant"][e7].id!='-1') ){
									 
							
									  MultipleInput.DeleteTag('restaurant', "restaurant" + "_" +MultipleInput.Tags["restaurant"][e7].id + "close")
                                     delete MultipleInput.Tags["restaurant"][e7]; 
                                      delete SuperAdmin.businessfrontset[e7];
								 }
                                 
                                     
                                }
                           	 }
                               MultipleInput.Init2("restaurant", SuperAdmin.businessfrontset, true);
                            
                        }
                        if((y!='-1')){
                            for (e1 in MultipleInput.Tags["countrytag"]) {
                                
                                if(a.citiesfrontset[e].country==MultipleInput.Tags["countrytag"][e1].id){
                                     delete MultipleInput.Tags["countrytag"][e1]; 
                                }
                            }
                            
                            
                        }
                        for (e2 in MultipleInput.Tags["citytag"]) {
                        
                            if(a.citiesfrontset[e].id==MultipleInput.Tags["citytag"][e2].id){
                             delete MultipleInput.Tags["citytag"][e2]; 
                             
                            }
                        }
                    }
             
             }
             
      countrylist='';
      for (e in MultipleInput.Tags["countrytag"]) {
      if(MultipleInput.Tags["countrytag"][e]!=''){
      	countrylist+=MultipleInput.Tags["countrytag"][e].id+',';
      
        }
      }
        countryStr = countrylist.substr(0, (countrylist.length-1));
        countryArr=  countryStr.split(',');       
             for (e in  a.citiesfrontset) {
         		if(jQuery.inArray("-1", countryArr) < 0){
        	  if( (jQuery.inArray( a.citiesfrontset[e].country, countryArr ) < 0 ) && ( a.citiesfrontset[e].country!='-1')){
              	delete a.citiesfrontset[e]; 
               
              }
                }
         }
         cityList='';
         for (e5 in a.citiesfrontset) {
      if(a.citiesfrontset[e5]!=''){
      	cityList+=a.citiesfrontset[e5].id+',';
      
        }
      }
      
   	   cityList = cityList.substr(0, (cityList.length-1));
      
       if((cityList=='') ){
       	delete a.citiesfrontset;
       }
       if(y=='-1'){
        	delete a.citiesfrontset;
     
        for (e in MultipleInput.Tags["countrytag"]) {
        
            if(MultipleInput.Tags["countrytag"][e]!=''){
           		elemt=document.getElementById("countrytag" + "_" + MultipleInput.Tags["countrytag"][e].id + "tag");
                
                if( elemt!=null){
                	MultipleInput.DeleteTag('countrytag', "countrytag" + "_" + MultipleInput.Tags["countrytag"][e].id+ "close")
                }
                  delete MultipleInput.Tags["countrytag"][e]; 
                   delete MultipleInput.Tags["citytag"][e]; 
            
            }
        }
        
        
        	delete SuperAdmin.businessfrontset;
     
        for (e in MultipleInput.Tags["restaurant"]) {
        
            if(MultipleInput.Tags["restaurant"][e]!=''){
           		elemt=document.getElementById("restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id + "tag");
                
                if( elemt!=null){
                	MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id+ "close")
                }
                  delete MultipleInput.Tags["restaurant"][e]; 
                   delete MultipleInput.Tags["citytag"][e]; 
            
            }
        }
            
			
			
          MultipleInput.Init2("restaurant", SuperAdmin.businessfrontset, true); 
          
       }else{
          if((cityList=='-1') ){
         
      	 	delete a.citiesfrontset;
           for (e in MultipleInput.Tags["citytag"]) {
        
            if(MultipleInput.Tags["citytag"][e]!=''){
           		elemt=document.getElementById("citytag" + "_" + MultipleInput.Tags["citytag"][e].id + "tag");
               
                if( elemt!=null){
                	MultipleInput.DeleteTag('citytag', "citytag" + "_" + MultipleInput.Tags["citytag"][e].id+ "close")
                }
                 
                   delete MultipleInput.Tags["citytag"][e]; 
            
            }
        }
        
      	 }
       }
       
         restaurantList='';
         for (e5 in SuperAdmin.businessfrontset) {
      if(SuperAdmin.businessfrontset[e5]!=''){
      	restaurantList+=SuperAdmin.businessfrontset[e5].id+',';
      
        }
      }
      
   	   restaurantList = restaurantList.substr(0, (restaurantList.length-1));
     
       if((restaurantList=='-1') ){
       
      	 	delete SuperAdmin.businessfrontset;
           for (e in MultipleInput.Tags["restaurant"]) {
        
            if(MultipleInput.Tags["restaurant"][e]!=''){
           		elemt=document.getElementById("restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id + "tag");
               
                if( elemt!=null){
                	MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id+ "close")
                }
                 
                   delete MultipleInput.Tags["restaurant"][e]; 
            
            }
        }
          MultipleInput.Init2("restaurant", SuperAdmin.businessfrontset, true);
      	 }
		 //////////////////////////////
		 var countryempty=1;
       for (e in MultipleInput.Tags["countrytag"]) {
		   
		   if( MultipleInput.Tags["countrytag"][e]!="undefined"){
			   countryempty=0;
		   }
		  
	   }
	    console.log(countryempty);
	   if(countryempty==1){
		     for (e1 in MultipleInput.Tags["restaurant"]) {
				   delete MultipleInput.Tags["restaurant"][e1]; 
				    
				   
			 }
			  for (e3 in SuperAdmin.businessfrontset) {
				   delete SuperAdmin.businessfrontset[e3];
			  }
			  for (e2 in MultipleInput.Tags["citytag"]) {
				   delete MultipleInput.Tags["citytag"][e2]; 
				  
				     
			 }
			 if(document.getElementById("restaurant_-1close")){
			MultipleInput.DeleteTag('restaurant', "restaurant_-1close")
			 }
			  if(document.getElementById("citytag_-1close")){
			  MultipleInput.DeleteTag('citytag', "citytag_-1close")
			  }
			
			
			  MultipleInput.Init2("restaurant", SuperAdmin.businessfrontset, true); 
	   }
	     
	    
			
			
			
			
			/////////////////////////////
			
			
			
			
			
			
			
      MultipleInput.Init2("citytag", a.citiesfrontset, true);
      
       MultipleInput.TagsChange("countrytag");
        MultipleInput.TagsChange("citytag");
            MultipleInput.TagsChange("restaurant");   
          });
    },
    setRestaurantsvalue:function (y){
    
       for (e in MultipleInput.Tags["restaurant"]) {
  		if(y!='-1'){
            if(MultipleInput.Tags["restaurant"][e].id==y){
            	delete MultipleInput.Tags["restaurant"][e]; 
            }
        }else{
          delete MultipleInput.Tags["restaurant"][e]; 
        }
  }
      MultipleInput.TagsChange("countrytag");
        MultipleInput.TagsChange("citytag");
            MultipleInput.TagsChange("restaurant");  
      
      
    },
      MultiInputTagsChange: function (d) {
               
                switch (d) {
                case "dish_ingredients":
                var e = MultipleInput.GetTagsNames(d);
                if (e.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(e))
                } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
                }
                break;
                case "days":
                Business.UpdateSchedule();
                break;
                default:
                
                var f = MultipleInput.GetTagsIds(d);
                if (f.length > 0) {
                
                
                this.ActiveForm = "frontset";
                   
               
                Forms.UpdateValue("frontset", d, JSON.stringify(f))
                } else {
                Forms.UpdateValue("frontset", d, "")
                }
                break
                }
                if (Forms.CanSave(this.ActiveForm)) {
                Forms.EnableSubmitButton(true)
                } else {
                Forms.EnableSubmitButton(false)
                }
                },
    FrontSet: function (a) {
    
      var a = JSON.parse(a);
     
      
       MultipleInput.AddListener("tagschange", "SuperAdmin.MultiInputTagsChange");
        var h = "";
        var j = "";
        var g = false;
        h += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveFrontSettings()");
        h += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("frontset", "mainbuttonok");
      
        if (e == null) {
            e = new Object();
            Forms.Form.frontset.type = "create";
       
        } else {
            g = true;
            Forms.Form.frontset.type = "modify";
            Forms.Form.frontset.id = e.id
        }
        j += '<div class="contentbox">';
        j += '<div class="titlebox nonselectable">';
      
            j += '<span class="title">&gt;&gt; <?=$lang_resource['SUPERADMIN_SPECIAL_SETTINGS_FOR_HOME_PAGE']?>:</span>'
        
        j += "</div>";
        j += '<div class="editform">';
        j += '<div class="leftcol">';
       
   
    
          Forms.CreateValue("frontset", "countrytag", a[0].countrytag, true,'',true);
       j += '<div class="row"><span class="caption">Country</span></div>';
        j += '<div class="multipleinputcontainerhax"><textarea id="countrytag" style="width:290px;"  /></textarea><span class="obligatory nonselectable default">*</span></div>';
       
        Forms.CreateValue("frontset", "citytag",a[0].citytag, true,'',true);
        j += '<div class="row"><span class="caption">City</span></div>';
         j += '<div class="multipleinputcontainerhax"><textarea id="citytag" style="width:290px;"/></textarea><span class="obligatory nonselectable default">*</span></div>';
         Forms.CreateValue("frontset", "restaurant",  a[0].restaurant, true,'',true);
         j += '<div class="row"><span class="caption">Restaurants</span></div>';
         j += '<div class="multipleinputcontainerhax"><textarea id="restaurant" style="width:290px;"/></textarea><span class="obligatory nonselectable default">*</span></div>';
        
      
        
        var d = new Array();
        d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"f","caption":"No"}'));
        
     
      
        j += '<div class="row"><span class="caption">Browse per City:</span><div class="inputbox">' + Forms.CreateSelectProperty("frontset", "browse_per_city", d,a[0].browse_per_city, false) + "</div></div>";
        
        j += '<div class="row"><span class="caption">Popular Restaurant:</span><div class="inputbox">' + Forms.CreateSelectProperty("frontset", "popular_restaurant", d,a[0].popular_restaurant, false) + "</div></div>";
        
        j += '<div class="row"><span class="caption">Popular Cuisine:</span><div class="inputbox">' + Forms.CreateSelectProperty("frontset", "popular_cuisine", d,a[0].popular_cuisine, false) + "</div></div>";
        
        j += '<div class="row"><span class="caption">Map Posititon:</span><div class="inputbox">' + Forms.CreateSelectProperty("frontset", "map_posititon", d,a[0].map_posititon, false) + "</div></div>";
      
        j += "</div>";
        
        j += "</div>";
        j += "</div>";
        
        
         document.getElementById("leftcol").innerHTML = h;
        document.getElementById("main").innerHTML = j;
       
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesDataFrontSet"}]', function (b) {
          
             b = JSON.parse(b);
             console.log(b)
           
        MultipleInput.InitFrontCountry("countrytag", b.countriesfrontset, true,'','SuperAdmin.setCityList()');
          MultipleInput.Tags['countrytag'] = new Array();
              for(r in a[0].countrytag){
        	
         
       
           MultipleInput.AddTagByElem('countrytag',a[0].countrytag[r],true);
            MultipleInput.Tags["countrytag"][r]=a[0].countrytag[r];
          MultipleInput.ForceFilters["countrytag"]="SuperAdmin.setCityList()";
            
        }
          SuperAdmin.setCityList();
       
         
          });
        
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCitiesDataFrontSet"}]', function (b) {
          
             b = JSON.parse(b);
             console.log(b)
      
     		 MultipleInput.InitFrontCountry("citytag", '', true,'','SuperAdmin.setRestaurantsList()');
             
                MultipleInput.Tags['citytag'] = new Array();
                   for(r in a[0].citytag){
        	
        
    	
         MultipleInput.AddTagByElem('citytag',a[0].citytag[r],true);
          	 MultipleInput.Tags["citytag"][r]=a[0].citytag[r]; 
             MultipleInput.ForceFilters["citytag"]="SuperAdmin.setRestaurantsList()";
            
        }
         SuperAdmin.setRestaurantsList();
          });
          
          
          $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessDataFrontSet"}]', function (b) {
          
             b = JSON.parse(b);
             console.log(b)
   
        
           MultipleInput.InitFrontCountry("restaurant", '', true,'','SuperAdmin.setRestaurantsvalue()');
          MultipleInput.Tags['restaurant'] = new Array();
        
                   for(r in a[0].restaurant){
        	
          MultipleInput.AddTagByElem('restaurant',a[0].restaurant[r],true);
             MultipleInput.Tags["restaurant"][r]=a[0].restaurant[r];
              MultipleInput.ForceFilters["restaurant"]="";
          
            
        }
          });
        
        
    
        if (a[0].frontset) {
            F.categories = JSON.parse(F.categories);
            for (E in F.categories) {
                MultipleInput.AddTagById("categories", F.categories[E])
            }
        }
    
    },
    
    
    SaveFrontSettings: function ()
    {
      
     if (Forms.CanSave("frontset") == false) {
            return
        }
        
        
      
        console.log(JSON.stringify(Forms.Form.frontset));
       
    
      Main.Request("frontsettings", null, "f=SaveFrontSettingsAjax&data=" + JSON.stringify(Forms.Form.frontset), SuperAdmin.PrintMain())
       
      
        Forms.Clean("frontset");
      
    },
    
     CountrySelected: function (a) {
        SuperAdmin.PopulateCitySelect(a.options[a.selectedIndex].value)
    },
    CountrySelected1: function (a) {
      
        SuperAdmin.PopulateCitySelect1(a.options[a.selectedIndex].value)
    },
    
       PopulateCitySelect1: function (c, b) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        
        
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
        
        
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (g != "") {
                var f = JSON.parse(g).franchises;
                var e = document.getElementById("city");
                e.options.length = 0;
                e.options[e.options.length] = new Option("", "-1");
                var h = 0;
                var j = false;
                for (var d in f) {
                    if (b) {
                        if (f[d].id == b) {
                            h = d;
                            j = true
                        }
                    }
                    e.options[e.options.length] = new Option(f[d].city, f[d].id)
                }
               
            }
        })
    },
    
    PopulateCitySelect: function (c, b) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (g != "") {
                var f = JSON.parse(g).franchises;
                var e = document.getElementById("city");
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
                    e.options[e.options.length] = new Option(f[d].city, f[d].id)
                }
               
            }
        })
    },
    
    
    SaveTabSettings: function () {

    
     if ((Forms.CanSave("tabsettings") == false) || (Forms.TabsetValid=='0')) {
         
            return
        }
       
      
        
        if(Forms.Form.tabsettings.fields.country.value == "")
        Forms.Form.tabsettings.fields.city.value = -1;
        
        console.log(JSON.stringify(Forms.Form.tabsettings.fields.country.value));
        console.log(JSON.stringify(Forms.Form.tabsettings.fields.city.value));
        
        Main.Request("tabsettings", null, "f=SaveTabSettings&data=" + JSON.stringify(Forms.Form.tabsettings), SuperAdmin.PrintMain())
       
      
        Forms.Clean("user");
        GoogleMap.Clean()
    
    },
    //tabsetting end 
    sttingForm: function (a) {

		a = JSON.parse(a);
        
        
          
        var b = "";
        var c = "";
        b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "SuperAdmin.SaveSettingsConfig('settings')");
        b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("settings", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SITESETTINGS_V21'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?= $lang_resource['SITENAME_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "sitename", Main.NullToEmpty(a.sitename), true, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['SITEURL_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "siteurl", Main.NullToEmpty(a.siteurl), true, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['FACEBOOKLINK_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "facebooklink", Main.NullToEmpty(a.facebooklink), false, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['TWITTERLINK_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "twitterlink", Main.NullToEmpty(a.twitterlink), false, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['RSSLINK_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "rsslink", Main.NullToEmpty(a.rsslink), false, "", false, false) + "</div></div>";
       
        c += '<div class="row"><span class="caption"><?= $lang_resource['GOOGLEPLUS_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "gpluslink", Main.NullToEmpty(a.gpluslink), false, "", false, false) + "</div></div>";        
        c += '<div class="row"><span class="caption"><?= $lang_resource['LINKENDIN_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "linkendinlink", Main.NullToEmpty(a.linkendinlink), false, "", false, false) + "</div></div>";        
        
        c += '<div class="row"><span class="caption"><?= $lang_resource['FACEBOOKFANPAGELINK_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "facebookfan", Main.NullToEmpty(a.facebookfan), false, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['FACEBOOKAPPID_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "facebookappid", Main.NullToEmpty(a.facebookappid), false, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['HELPPAGELINK_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "helppagelink", Main.NullToEmpty(a.helppagelink), false, "", false, false) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['METAKEYWORDS_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "analyticscode", Main.NullToEmpty(a.analyticscode), false, "", false, false) + "</div></div>";
            c += '<div class="row"><span class="caption"><?= $lang_resource['MAILCHIMPAPI_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "mailchamp_api", Main.NullToEmpty(a.mailchamp_api), false, "", false, false) + "</div></div>";
          c += '<div class="row"><span class="caption"><?= $lang_resource['MAILCHIMPLIST_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "mailchamp_listid", Main.NullToEmpty(a.mailchamp_listid), false, "", false, false) + "</div></div>";
            c += '<div class="row"><span class="caption"><?= $lang_resource['CURRENCY_TEXT'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "currency", Main.NullToEmpty(a.currency), false, "", false, false) + "</div></div>";
            
            
             var a11 = new Array({
            id: "Kwajalein",
            caption: "International Date Line West (GMT-12:00)"
        },{
                id: "America/Anchorage",
                caption: "Alaska (GMT-9)"
        },{
            id: "Pacific/Honolulu",
            caption: "Hawaii (GMT-10:00)"
        }, {
            id: "America/Los_Angeles",
            caption: "Pacific Time (US &amp; Canada) (GMT-08:00)"
        }, {
            id: "America/Tijuana",
            caption: "Tijuana, Baja California (GMT-08:00)"
        }, {
            id: "America/Denver",
            caption: "Mountain Time (US &amp; Canada) (GMT-07:00)"
        }, {
            id: "America/Chihuahua",
            caption: "Chihuahua (GMT-07:00)"
        }, {
        	id:"Europe/Netherlands",
        	caption:"Netherlands (GMT+01:00)"
        }, {
            id: "America/Mazatlan",
            caption: "Mazatlan (GMT-07:00)"
        }, {
            id: "America/Phoenix",
            caption: "Arizona (GMT-07:00)"
        }, {
            id: "Europe/London",
            caption: "London (GMT+00:00)"
        }, {
            id: "America/Tegucigalpa",
            caption: "Central America (GMT-06:00)"
        }, {
            id: "America/Chicago",
            caption: "Central Time (US &amp; Canada) (GMT-06:00)"
        }, {
            id: "America/Mexico_City",
            caption: "Mexico City (GMT-06:00)"
        }, {
            id: "America/Monterrey",
            caption: "Monterrey (GMT-06:00)"
        }, {
            id: "America/New_York",
            caption: "Eastern Time (US &amp; Canada) (GMT-05:00)"
        }, {
            id: "America/Bogota",
            caption: "Bogota (GMT-05:00)"
        }, {
            id: "America/Lima",
            caption: "Lima (GMT-05:00)"
        }, {
            id: "America/Rio_Branco",
            caption: "Rio Branco (GMT-05:00)"
        }, {
            id: "America/Indiana/Indianapolis",
            caption: "Indiana (East) (GMT-05:00)"
        }, {
            id: "America/Caracas",
            caption: "Caracas (GMT-04:30)"
        }, {
            id: "America/Halifax",
            caption: "Atlantic Time (Canada) (GMT-04:00)"
        }, {
            id: "America/Manaus",
            caption: "Manaus (GMT-04:00)"
        }, {
            id: "America/Santiago",
            caption: "Santiago (GMT-04:00)"
        }, {
            id: "America/La_Paz",
            caption: "La Paz (GMT-04:00)"
        }, {
            id: "America/St_Johns",
            caption: "Newfoundland (GMT-03:30)"
        }, {
            id: "America/Argentina/Buenos_Aires",
            caption: "Buenos Aires (GMT-03:00)"
        }, {
            id: "America/Sao_Paulo",
            caption: "Brasilia (GMT-03:00)"
        }, {
            id: "America/Godthab",
            caption: "Greenland (GMT-03:00)"
        }, {
            id: "America/Montevideo",
            caption: "Montevideo (GMT-03:00)"
        }, {
            id: "Europe/Madrid",
            caption: "Madrid (GMT+01:00)"
        }, {
            id: "Europe/Paris",
            caption: "Paris (GMT+01:00)"
        },  {
            id: "Asia/Kolkata",
            caption: "India (GMT+05:30)"
        },  {
            id: "Pacific/Fiji",
            caption: "Fiji (GMT+12:00)"
        }, {
            id: "Etc/GMT-11",
            caption: "GMT -11 (GMT-11:00)"
        }, {
            id: "Etc/GMT-9",
            caption: "GMT -9 (GMT-09:00)"
        }, {
            id: "Etc/GMT-2",
            caption: "GMT -2 (GMT-02:00)"
        }, {
            id: "Etc/GMT-1",
            caption: "GMT -1 (GMT-01:00)"
        }, {
            id: "Etc/GMT+2",
            caption: "GMT +2 (GMT+02:00)"
        }, {
            id: "Asia/Riyadh",
            caption: "Riyadh (GMT+03:00)"
        }, {
            id: "Asia/Tbilisi",
            caption: "GMT +4 (GMT+04:00)"
        }, {
            id: "Asia/Istanbul",
            caption: "Istanbul (GMT+05:00)"
        }, {
            id: "Asia/Dhaka",
            caption: "Bangladesh (GMT+06:00)"
        }, {
            id: "Asia/Bangkok",
            caption: "Bangkok (GMT+07:00)"
        }, {
            id: "Asia/Singapore",
            caption: "Singapore (GMT+08:00)"
        }, {
            id: "Asia/Tokyo",
            caption: "Tokyo (GMT+09:00)"
        }, {
            id: "Australia/Melbourne",
            caption: "Melbourne (GMT+10:00)"
        }, {
            id: "Etc/GMT+11",
            caption: "GMT +11 (GMT+11:00)"
        });
        
         c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_ZONE1'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("settings", "defaulttimezone", a11, Main.NullToEmpty(a.defaulttimezone), true, "SuperAdmin.TimeZoneSelected(this);") + "</div></div>";   
           c += '<div class="row"><span class="caption" id="timespan" style="float:right;margin-right:7px;"></span></div>';   
            
            
         //Settings to select miles or km 
            var d2 = new Array();
            d2.push(JSON.parse('{"id":"K","caption":"KM"}'));
            d2.push(JSON.parse('{"id":"N","caption":" Miles"}'));
            c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISTANNCE_FORMAT'] ?></span><div class="inputbox">' +Forms.CreateSelectProperty("settings", "distanceformat", d2,a.distanceformat, false)  + "</div></div>";
         
         //Time selection settings.
            var d1 = new Array();
            d1.push(JSON.parse('{"id":"12","caption":"12 Hours"}'));
            d1.push(JSON.parse('{"id":"24","caption":" 24 Hours"}'));
            c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_TIME_FORMAT'] ?></span><div class="inputbox">' +Forms.CreateSelectProperty("settings", "timeformat", d1,a.timeformat, false)  + "</div></div>";
           //Reset counter start
                    var d = new Array();
       
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"0","caption":"No"}'));
       
        c += '<div class="row" style="display:none"><span class="caption"><?= $lang_resource['LIVE_COUNTER'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("settings", "isupdateBackupinsec", d,a.isupdateBackupinsec, false) + "</div></div>";
			   var e = new Array();
       
        e.push(JSON.parse('{"id":"300","caption":"5 Mints"}'));
        e.push(JSON.parse('{"id":"600","caption":"10 Mints"}'));
		e.push(JSON.parse('{"id":"900","caption":"15 Mints"}'));
		e.push(JSON.parse('{"id":"1200","caption":"20 Mints"}'));
		e.push(JSON.parse('{"id":"1500","caption":"25 Mints"}'));
		e.push(JSON.parse('{"id":"1800","caption":"30 Mints"}'));
		e.push(JSON.parse('{"id":"2100","caption":"35 Mints"}'));
		e.push(JSON.parse('{"id":"2400","caption":"40 Mints"}'));
		e.push(JSON.parse('{"id":"2700","caption":"45 Mints"}'));
		e.push(JSON.parse('{"id":"3000","caption":"50 Mints"}'));
		e.push(JSON.parse('{"id":"3300","caption":"55 Mints"}'));
		e.push(JSON.parse('{"id":"3600","caption":"60 Mints"}'));
       
        c += '<div class="row" style="display:none"><span class="caption"><?= $lang_resource['LIVE_COUNTER_RENGE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("settings", "updateBackupinsec", e,a.updateBackupinsec, false) + "</div></div>";   
        //Reset counter End
           c += '<div class="row"><span class="caption"><?= $lang_resource['EmailFrom_V21'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "email_from", Main.NullToEmpty(a.email_from), false, "", false, false) + "</div></div>";
          
        c += '<div class="row"><span class="caption"><?= $lang_resource['MetaDescription_V21'] ?></span><div class="inputbox">' + Forms.CreateTextAreaProperty("settings", "googleanalyticscode", Main.NullToEmpty(a.googleanalyticscode), false, "", false, "metarea"); + "</div></div>";
     
     
        c += "</div>";
        c += "</div>";
          c += '<div class="row"><span class="caption"><?= $lang_resource['BRINGG_COMPANY_ID'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "BRINGG_COMPANY_ID", Main.NullToEmpty(a.BRINGG_COMPANY_ID), false, "", false, false) + "</div></div>";
          c += '<div class="row"><span class="caption"><?= $lang_resource['BRINGG_ACCESS_TOKEN'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "BRINGG_ACCESS_TOKEN", Main.NullToEmpty(a.BRINGG_ACCESS_TOKEN), false, "", false, false) + "</div></div>";
          c += '<div class="row"><span class="caption"><?= $lang_resource['BRINGG_SECRET_KEY'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "BRINGG_SECRET_KEY", Main.NullToEmpty(a.BRINGG_SECRET_KEY), false, "", false, false) + "</div></div>";
          c += '<div class="row"><span class="caption"><?= $lang_resource['SET_DRIVER_DELIVERY_TIME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("settings", "SET_DRIVER_DELIVERY_TIME", Main.NullToEmpty(a.SET_DRIVER_DELIVERY_TIME), false, "", false, false) + "</div></div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        $("#ga").focus()
    },
    PreGaForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetConfig&name=ga", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            SuperAdmin.GaForm(b)
        })
    },
     TimeZoneSelected: function (b) {
        var a = new Date().getTime();
        Main.Aid = a;
        Main.Loading();
        $.post("lib/front-main.php", "f=FetchTimeByZone&format=24&zone=" + b.options[b.selectedIndex].value, function (c) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            document.getElementById("timespan").innerHTML = "<?= $lang_resource['Now_V2'] ?> " + c ;
        })
    },
     SaveSettingsConfig: function (a) {
     
     
        if (Forms.CanSave(a) == false) {
            return
        }
        Forms.PrepareForSaving(a);
        Main.Loading();
        var b = new Date().getTime();
        Main.Aid = b;
   
     var str =Forms.Form[a].fields.defaulttimezone.value; 
		Forms.Form[a].fields.defaulttimezone.value = str.replace("+", "@");

		var str = Forms.Form[a].fields.defaulttimezone.value; 
		Forms.Form[a].fields.defaulttimezone.value = str.replace("-", "$");
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=defaulttimezone&value=" + Main.NullToEmpty(Forms.Form[a].fields.defaulttimezone.value), function (c) {
            
         
        });
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=sitename&value=" + Main.NullToEmpty(Forms.Form[a].fields.sitename.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=siteurl&value=" + Main.NullToEmpty(Forms.Form[a].fields.siteurl.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=facebooklink&value=" + Main.NullToEmpty(Forms.Form[a].fields.facebooklink.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=twitterlink&value=" + Main.NullToEmpty(Forms.Form[a].fields.twitterlink.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=rsslink&value=" + Main.NullToEmpty(Forms.Form[a].fields.rsslink.value), function (c) {
            
         
        });
        
        
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=gpluslink&value=" + Main.NullToEmpty(Forms.Form[a].fields.gpluslink.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=linkendinlink&value=" + Main.NullToEmpty(Forms.Form[a].fields.linkendinlink.value), function (c) {
            
         
        });


         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=facebookfan&value=" + Main.NullToEmpty(Forms.Form[a].fields.facebookfan.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=facebookappid&value=" + Main.NullToEmpty(Forms.Form[a].fields.facebookappid.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=helppagelink&value=" + Main.NullToEmpty(Forms.Form[a].fields.helppagelink.value), function (c) {
            
         
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=analyticscode&value=" + Main.NullToEmpty(Forms.Form[a].fields.analyticscode.value), function (c) {
            
         
        });
        //bringg code 
        
          $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=BRINGG_COMPANY_ID&value=" + Main.NullToEmpty(Forms.Form[a].fields.BRINGG_COMPANY_ID.value), function (c) {
        
            
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=BRINGG_ACCESS_TOKEN&value=" + Main.NullToEmpty(Forms.Form[a].fields.BRINGG_ACCESS_TOKEN.value), function (c) {
        
            
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=BRINGG_SECRET_KEY&value=" + Main.NullToEmpty(Forms.Form[a].fields.BRINGG_SECRET_KEY.value), function (c) {
        
            
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=SET_DRIVER_DELIVERY_TIME&value=" + Main.NullToEmpty(Forms.Form[a].fields.SET_DRIVER_DELIVERY_TIME.value), function (c) {
        
            
        });
        ////       
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=googleanalyticscode&value=" + Main.NullToEmpty(Forms.Form[a].fields.googleanalyticscode.value), function (c) {
        
            
        });
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=mailchamp_api&value=" + Main.NullToEmpty(Forms.Form[a].fields.mailchamp_api.value), function (c) {
        
          
        });
   
        $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=email_from&value=" + Main.NullToEmpty(Forms.Form[a].fields.email_from.value), function (c) {
        
          
        });
        
      //Reset counter start
           $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=isupdateBackupinsec&value=" + Main.NullToEmpty(Forms.Form[a].fields.isupdateBackupinsec.value), function (c) {
      });
             $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=updateBackupinsec&value=" + Main.NullToEmpty(Forms.Form[a].fields.updateBackupinsec.value), function (c) {
       });
        //Reset counter End
		
        
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=mailchamp_listid&value=" + Main.NullToEmpty(Forms.Form[a].fields.mailchamp_listid.value), function (c) {
        
            SuperAdmin.PreSettingForm()
        });
        //add currency
           $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=currency&value=" + Main.NullToEmpty(Forms.Form[a].fields.currency.value), function (c) {
        
            SuperAdmin.PreSettingForm()
        });
        
        //Settings to select miles or km 
         $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=distanceformat&value=" + Main.NullToEmpty(Forms.Form[a].fields.distanceformat.value), function (c) {
        
            SuperAdmin.PreSettingForm()
        });
        //Time selection settings. 
       $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=timeformat&value=" + Main.NullToEmpty(Forms.Form[a].fields.timeformat.value), function (c) {
        
            SuperAdmin.PreSettingForm()
        });
        Forms.Clean(a)
    },
    GaForm: function (a) {
        var b = "";
        var c = "";
        b += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveConfig('ga')");
        b += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("ga", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; GOOGLE ANALYTICS</span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption">Tracking id:</span><div class="inputbox">' + Forms.CreateInputProperty("ga", "id", Main.NullToEmpty(a)) + "</div></div>";
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        $("#ga").focus()
    },
     coForm: function (a) {

        var b = "";
        var c = "";
        b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "SuperAdmin.SaveConfig('commision')");
        b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("commision", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['COMMISSIONSET_V21'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?= $lang_resource['COMMISSION_V21'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("commision", "id", Main.NullToEmpty(a), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        $("#ga").focus()
    },
    SaveConfig: function (a) {
        if (Forms.CanSave(a) == false) {
            return
        }
        Forms.PrepareForSaving(a);
        Main.Loading();
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("lib/panel-configs.php", "f=SaveConfig&name=" + a + "&value=" + Forms.Form[a].fields.id.value, function (c) {
            if (b != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "ok") {
                alert("Error")
            }
            SuperAdmin.PrintMain()
        });
        Forms.Clean(a)
    },
    EditProfile: function () {
        Main.EditProfile("SuperAdmin.PrintMain()")
    },
    PreAdsForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetConfig&name=splitedadtime", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            SuperAdmin.AdsForm(b)
        })
    },
    AdsForm: function (b) {
        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveConfig('splitedadtime')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("splitedadtime", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['ADVERTISEMENT_V2'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?= $lang_resource['time_seconds_V2'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("splitedadtime", "id", Main.NullToEmpty(b), true) + "</div></div>";
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#splitedadtime").focus()
    },
    CategoriesManager: function (a) {
        if (!a) {
            SuperAdmin.PrintMain();
            Visuals.SubMenuItemClick($("#submenu").children().eq(3)[0], 2, 3, "")
        }
        Main.BulkRequest('data=[{"operation":"FetchAllCategoriesData"}]', "SuperAdmin.CategoriesList")
    },
    CategoriesList: function (a) {
        if (a == "") {
            return
        }
        Main.Categories = JSON.parse(a).categories;
        var b = "";
        b += '<div class="contentbox">';
        b += '<div class="titlebox nonselectable">';
        b += '<span class="title">&gt;&gt; <?= $lang_resource['categories_V2'] ?></span>';
        b += "</div>";
        b += '<div class="table">';
        b += '<div class="title nonselectable">';
        b += '<div class="oid hand" onclick="SuperAdmin.PupulateCategoriesTable(\'id\')"><span class="caption">#</span></div>';
        b += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        b += '<div class="categoryname hand" onclick="SuperAdmin.PupulateCategoriesTable(\'name\')"><span class="caption"><?= $lang_resource['Name_V2'] ?></span></div>';
        b += "</div>";
        b += '<div class="container" id="categories"></div>';
        b += "</div>";
        document.getElementById("main").innerHTML = b;
        document.getElementById("search").onkeyup = function () {
            SuperAdmin.PupulateCategoriesTable(Main.Config.Categories.List.SortBy, true)
        };
        SuperAdmin.PupulateCategoriesTable(Main.Config.Categories.List.SortBy, true)
    },
    PupulateCategoriesTable: function (g, a) {
        var f = "";
        if (a) {
            Main.Categories.sort(Main.SortByProperty(g));
            if (Main.Config.Categories.List.SortByStatus == "max") {
                Main.Categories.reverse()
            }
        } else {
            if (Main.Config.Categories.List.SortBy != g) {
                Main.Categories.sort(Main.SortByProperty(g));
                Main.Config.Categories.List.SortByStatus = "min"
            } else {
                Main.Categories.reverse();
                if (Main.Config.Categories.List.SortByStatus == "min") {
                    Main.Config.Categories.List.SortByStatus = "max"
                } else {
                    Main.Config.Categories.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Categories.List.SortBy = g;
        if (!a) {
            Main.SaveConfig()
        }
        var e = false;
        var b = "";
        for (var c in Main.Categories) {
            e = false;
            b = document.getElementById("search").value.toLowerCase();
            if (Main.Categories[c].name.toLowerCase().indexOf(b) >= 0 || String(Main.NullToEmpty(Main.Categories[c].id)).toLowerCase().indexOf(b) >= 0) {
                e = true
            }
            if (e) {
                var d;
                if (c % 2 == 0) {
                    d = " grey"
                } else {
                    d = ""
                }
                f += '<div class="default row' + d + '" style="border-bottom:1px solid #e4e4e4;">';
                f += '<div class="oid"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditCategory(' + Main.Categories[c].id + ')">' + Main.Categories[c].id + "</span></div></div>";
                f += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.Categories[c].id + '"/></div>';
                f += '<div class="categoryname"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditCategory(' + Main.Categories[c].id + ')">' + Main.Categories[c].name + "</span></div></div>";
                f += "</div>"
            }
        }
        document.getElementById("categories").innerHTML = f
    },
    EditCategory: function (a) {
        var c = false;
        if (a) {
            c = true
        } else {
            var b = Main.GetMarkedCheckBoxesValues();
            if (b.length == 1) {
                a = b[0];
                c = true
            }
        } if (c) {
            SuperAdmin.CategoryForm({
                id: a,
                name: Main.GetPropertyValueOnPropertyValueFound(Main.Categories, "id", a, "name")
            })
        }
    },
    CategoryForm: function (b) {
    
        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveCategory()");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.CategoriesManager()");
        Forms.Clean("category", "mainbuttonok");
        if (b == null) {
          b = new Object();
            Forms.Form.category.type = "create"
        } else {
       		
            Forms.Form.category.type = "modify";
            Forms.Form.category.id = b.id
        }
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        if (Forms.Form.category.type == "create") {
            c += '<span class="title">&gt;&gt; <?= $lang_resource['create_category_V2'] ?></span>'
        } else {
            c += '<span class="title">&gt;&gt; <?= $lang_resource['edit_category_V2'] ?></span>'
        }
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        if (b) {
            c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("category", "name", b.name, true) + "</div></div>"
        } else {
            c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("category", "name", "", true) + "</div></div>"
        }
          k = "background-image:url('images/dummy/preview_img.jpg');"
          if (b.id) {
        
          if(b.isimg == 0) {
          k = "background-image:url('images/dummy/preview_img.jpg');"
        } else {
           k = "background-image:url('images/category/" + Main.NullToEmpty(b.id) + "/1/preview.jpg?c=" + new Date().getTime() + "');"
        }
        }
       
  ;
 
         
              c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_IMAGE'] ?>:</span><div class="rightcol" style="width:227px;" ><form id="ctform" enctype="multipart/form-data" method="post" action="upload.php"><div class="xyz"><input type="file" name="file[]" style="' + k + '"/></div></form></div></div>';
        c += "</div>";
        c += "</div>";
        c += "</div>";
        	Forms.CreateValue("category", "imgupload0", "", true);
          
        document.getElementById("leftcol").innerHTML = a;
       
        document.getElementById("main").innerHTML = c;
        
      Uploader.Activate();
        Uploader.Init("category", "ctform", "mainbuttonok", true, SuperAdmin.ProfileImageUploadFinished, SuperAdmin.ProfileImageSelected, SuperAdmin.ProfileStartUpload);
        $("#name").focus()
    },
    
    
      ProfileImageSelected: function (b, a) {
      
        Forms.UpdateValue("category", "imgupload" + a, b, true);
        if (Forms.CanSave("category")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (b) {
    
        Response = JSON.parse(b);
        if (Response.status == "no files selected") {
            SuperAdmin.SaveCategory()
        } else {
			var g = new Object();
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
				else{
					g[Response[a].id] = Response[a].name
				}
            }
            if (c) {
                SuperAdmin.SaveCategory(g)
            }
        }
    },
    ProfileStartUpload: function () {
        Forms.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
     SaveCategory: function (a) {
        if (Forms.CanSave("category") == false) {
            return
        }
        
        if (a) {
            if (a[0] != null) {
                Forms.Form.category.image = a[0]
                
            }
           
        }
        
        Forms.PrepareForSaving("category");
        Main.Request("categories", null, "f=SaveCategory&data=" + JSON.stringify(Forms.Form.category), "SuperAdmin.CategoriesManager()");
        Forms.Clean("category")
    },
    DeleteCategory: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("categories", null, "f=DeleteCategory&data=" + JSON.stringify(a), "SuperAdmin.CategoriesManager()")
    },
    CountriesManager: function (a) {
        if (!a) {
            SuperAdmin.PrintMain();
            Visuals.SubMenuItemClick($("#submenu").children().eq(4)[0], 3, 3, "")
        }
        Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "SuperAdmin.CountriesList")
    },
    
     NeighborhoodManager: function (a) {
     
        if (!a) {
            SuperAdmin.PrintMain();
            Visuals.SubMenuItemClick($("#submenu").children().eq(5)[0], 4, 4, "")
        }
        Main.BulkRequest('data=[{"operation":"FetchAllNeighborhoodData"}]', "SuperAdmin.NeighborhoodList")
    },
    
    
    CountriesList: function (a) {
        if (a == "") {
            return
        }
        Main.Countries = JSON.parse(a).countries;
        var b = "";
        b += '<div class="contentbox">';
        b += '<div class="titlebox nonselectable">';
        b += '<span class="title">&gt;&gt; <?= $lang_resource['COUNTRIES_V2'] ?></span>';
        b += "</div>";
        b += '<div class="table">';
        b += '<div class="title nonselectable">';
        b += '<div class="oid hand" onclick="SuperAdmin.PupulateCountriesTable(\'id\')"><span class="caption">#</span></div>';
        b += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        b += '<div class="categoryname hand" onclick="SuperAdmin.PupulateCountriesTable(\'name\')"><span class="caption"><?= $lang_resource['Name_V2'] ?></span></div>';
        b += "</div>";
        b += '<div class="container" id="countries"></div>';
        b += "</div>";
        document.getElementById("main").innerHTML = b;
        document.getElementById("search").onkeyup = function () {
            SuperAdmin.PupulateCountriesTable(Main.Config.Countries.List.SortBy, true)
        };
        SuperAdmin.PupulateCountriesTable(Main.Config.Countries.List.SortBy, true)
    },
    
    
     NeighborhoodList: function (a) {
        if (a == "") {
            return
        }
        Main.Neighborhood = JSON.parse(a).neighborhood;
        var b = "";
        b += '<div class="contentbox">';
        b += '<div class="titlebox nonselectable">';
        b += '<span class="title">&gt;&gt; <?= $lang_resource['neighborhood_V2'] ?></span>';
        b += "</div>";
        b += '<div class="table">';
        b += '<div class="title nonselectable">';
        b += '<div class="oid hand" onclick="SuperAdmin.PupulateNeighborhoodTable(\'id\')"><span class="caption">#</span></div>';
        b += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        b += '<div class="categoryname hand" onclick="SuperAdmin.PupulateNeighborhoodTable(\'name\')" style="width:158px;border-right: 2px solid #e4e4e4;"><span class="caption"><?= $lang_resource['Name_V2'] ?></span></div>';
         b += '<div class="categoryname hand" onclick="SuperAdmin.PupulateCountriesTable(\'name\')" style="width:131px;border-right: 2px solid #e4e4e4;"><span class="caption"><?= $lang_resource['City_V2'] ?></span></div>';
          b += '<div class="categoryname hand" onclick="SuperAdmin.PupulateCountriesTable(\'name\')" style="width:131px;border-right: 2px solid #e4e4e4;"><span class="caption"><?= $lang_resource['Country_V2'] ?></span></div>';
          b += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_ENABLE_HEADER'] ?></span></div>';
        b += "</div>";
        b += '<div class="container" id="neighborhood"></div>';
        b += "</div>";
        document.getElementById("main").innerHTML = b;
        document.getElementById("search").onkeyup = function () {
            SuperAdmin.PupulateNeighborhoodTable(Main.Config.Neighborhood.List.SortBy, true)
        };
        SuperAdmin.PupulateNeighborhoodTable(Main.Config.Neighborhood.List.SortBy, true)
    },
    
    
    
    
    PupulateCountriesTable: function (g, a) {
        var f = "";
        if (a) {
            Main.Countries.sort(Main.SortByProperty(g));
            if (Main.Config.Countries.List.SortByStatus == "max") {
                Main.Countries.reverse()
            }
        } else {
            if (Main.Config.Countries.List.SortBy != g) {
                Main.Countries.sort(Main.SortByProperty(g));
                Main.Config.Countries.List.SortByStatus = "min"
            } else {
                Main.Countries.reverse();
                if (Main.Config.Countries.List.SortByStatus == "min") {
                    Main.Config.Countries.List.SortByStatus = "max"
                } else {
                    Main.Config.Countries.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Countries.List.SortBy = g;
        if (!a) {
            Main.SaveConfig()
        }
        var e = false;
        var b = "";
        for (var c in Main.Countries) {
            e = false;
            b = document.getElementById("search").value.toLowerCase();
            if (Main.Countries[c].name.toLowerCase().indexOf(b) >= 0 || String(Main.NullToEmpty(Main.Countries[c].id)).toLowerCase().indexOf(b) >= 0) {
                e = true
            }
            if (e) {
                var d;
                if (c % 2 == 0) {
                    d = " grey"
                } else {
                    d = ""
                }
                f += '<div class="default row' + d + '" style="border-bottom:1px solid #e4e4e4;">';
                f += '<div class="oid"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditCountry(' + Main.Countries[c].id + ')">' + Main.Countries[c].id + "</span></div></div>";
                f += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.Countries[c].id + '"/></div>';
                f += '<div class="categoryname"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditCountry(' + Main.Countries[c].id + ')">' + Main.Countries[c].name + "</span></div></div>";
                f += '<div class="categoryname"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditCountry(' + Main.Countries[c].id + ')">' + Main.Countries[c].name + "</span></div></div>";
                f += '<div class="categoryname"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditCountry(' + Main.Countries[c].id + ')">' + Main.Countries[c].name + "</span></div></div>";
                f += "</div>"
            }
        }
        document.getElementById("countries").innerHTML = f
    },
    
    
    PupulateNeighborhoodTable: function (g, a) {
        var f = "";
        if (a) {
            Main.Neighborhood.sort(Main.SortByProperty(g));
            if (Main.Config.Neighborhood.List.SortByStatus == "max") {
                Main.Neighborhood.reverse()
            }
        } else {
            if (Main.Config.Neighborhood.List.SortBy != g) {
                Main.Neighborhood.sort(Main.SortByProperty(g));
                Main.Config.Neighborhood.List.SortByStatus = "min"
            } else {
                Main.Neighborhood.reverse();
                if (Main.Config.Neighborhood.List.SortByStatus == "min") {
                    Main.Config.Neighborhood.List.SortByStatus = "max"
                } else {
                    Main.Config.Neighborhood.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Neighborhood.List.SortBy = g;
        if (!a) {
            Main.SaveConfig()
        }
        var e = false;
        var b = "";
        var kk = new Array();
        for (var c in Main.Neighborhood) {
            e = false;
            b = document.getElementById("search").value.toLowerCase();
            if (Main.Neighborhood[c].name.toLowerCase().indexOf(b) >= 0 || String(Main.NullToEmpty(Main.Neighborhood[c].id)).toLowerCase().indexOf(b) >= 0) {
                e = true;
                kk.push(Main.Neighborhood[c]);
            }
            if (e) {
                var d;
                if (c % 2 == 0) {
                    d = " grey"
                } else {
                    d = ""
                }
                f += '<div class="default row' + d + '" style="border-bottom:1px solid #e4e4e4;">';
                f += '<div class="oid"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditNeighborhood(' + Main.Neighborhood[c].id + ')">' + Main.Neighborhood[c].id + "</span></div></div>";
                f += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.Neighborhood[c].id + '"/></div>';
                f += '<div class="categoryname"  style="width:158px;border-right: 2px solid #e4e4e4;"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditNeighborhood(' + Main.Neighborhood[c].id + ')">' + Main.Neighborhood[c].name + "</span></div></div>";
                f += '<div class="categoryname"  style="width:131px;border-right: 2px solid #e4e4e4;"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditNeighborhood(' + Main.Neighborhood[c].id + ')">' + Main.Neighborhood[c].cityname + "</span></div></div>";
                f += '<div class="categoryname"  style="width:131px;border-right: 2px solid #e4e4e4;"><div class="cap"><span class="caption hand" onclick="SuperAdmin.EditNeighborhood(' + Main.Neighborhood[c].id + ')">' + Main.Neighborhood[c].countryname + "</span></div></div>";
                
                f += '<div class="enabled"><span class="caption"><div id="switch_' + Main.Neighborhood[c].id + '"></div></span></div>';
                
                f += "</div>"
            }
        }
        document.getElementById("neighborhood").innerHTML = f;
        
        
         var h = false;
        Switch.Init();
   
        for (kk in Main.Neighborhood) {
            if (Main.Neighborhood[kk].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + Main.Neighborhood[kk].id, h);
            Switch.OnChange("switch_" + Main.Neighborhood[kk].id, function (l, i) {
              SuperAdmin.SetEnabledNeighborhood(l.replace("switch_", ""), i)
            })
        }
        
        
    },
    
    SetEnabledNeighborhood: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/neighborhood.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    
    
    EditCountry: function (a) {
        var c = false;
        if (a) {
            c = true
        } else {
            var b = Main.GetMarkedCheckBoxesValues();
            if (b.length == 1) {
                a = b[0];
                c = true
            }
        } if (c) {
            SuperAdmin.CountryForm({
                id: a,
                name: Main.GetPropertyValueOnPropertyValueFound(Main.Countries, "id", a, "name")
            })
        }
    },
    
     EditNeighborhood: function (a,b) {
     console.log("a="+a);
     
        var e = false;
        if (a) {
            e = true;
            Visuals.ForceMainButtonCancelEvent = b;
            Users.ForceMainButtonEvent = b
        } else {
            var d = Main.GetMarkedCheckBoxesValues();
            if (d.length == 1) {
                a = d[0];
                e = true
            }
            Visuals.ForceMainButtonCancelEvent = null;
            Users.ForceMainButtonEvent = null
        } if (e) {
            var c = this;
            Main.Loading();
            
            console.log("kk3")
           Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchNeighborhoodData","id":"' + a + '"}]', "SuperAdmin.PreEditNeighborhood")
           
        }
    },
    
    
    
   PreEditNeighborhood: function (a) {
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
       
         Main.Countries = a.countries;
        SuperAdmin.NeighborForm(a.neighborhood);
    },
    
    CountryForm: function (b) {
        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?=$lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveCountry()");
        a += Visuals.CreateMainButton("<?=$lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.CountriesManager()");
        Forms.Clean("country", "mainbuttonok");
        if (b == null) {
            Forms.Form.country.type = "create"
        } else {
            Forms.Form.country.type = "modify";
            Forms.Form.country.id = b.id
        }
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        if (Forms.Form.country.type == "create") {
            c += '<span class="title">&gt;&gt; <?= $lang_resource['create_country_V2'] ?></span>'
        } else {
            c += '<span class="title">&gt;&gt; <?= $lang_resource['edit_country_V2'] ?></span>'
        }
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        if (b) {
            c += '<div class="row"><span class="caption"><?= $lang_resource['LOGIN_CREATE_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("country", "name", b.name, true) + "</div></div>"
        } else {
            c += '<div class="row"><span class="caption"><?= $lang_resource['LOGIN_CREATE_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("country", "name", "", true) + "</div></div>"
        }
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#name").focus()
    },
    
    
    NeighborForm: function (b) {
    
    console.log("b="+JSON.stringify(b))
        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?=$lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveNeighbor()");
        a += Visuals.CreateMainButton("<?=$lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.NeighborhoodManager()");
        Forms.Clean("neighborhood", "mainbuttonok");
        
        var cntry = 0;
        var cty = 0;
        
        if (b == null) {
            Forms.Form.neighborhood.type = "create"
        } else {
            Forms.Form.neighborhood.type = "modify";
            Forms.Form.neighborhood.id = b.id;
            cntry = b.country;
            cty = b.city;
            
            
        }
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        if (Forms.Form.neighborhood.type == "create") {
            c += '<span class="title">&gt;&gt; <?= $lang_resource['create_neighborhood_V2'] ?></span>'
        } else {
            c += '<span class="title">&gt;&gt; <?= $lang_resource['edit_neighborhood_V2'] ?></span>'
        }
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        
        
        
        
         var c1 = new Array();
        c1.push({
            id: "-1",
            caption: ""
        });
        
        
        for (i in Main.Countries) {
            c1.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }
        
     
    
        
        c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty2("neighborhood", "country", c1, Main.NullToEmpty(cntry), true, "SuperAdmin.CountrySelected1(this);GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_CITY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty2("neighborhood", "city", [], Main.NullToEmpty(cty), true, "GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        
        
        
        
        if (b) {
            c += '<div class="row"><span class="caption"><?= $lang_resource['neighborhood_V2'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("neighborhood", "name", b.name, true) + "</div></div>"
        } else {
            c += '<div class="row"><span class="caption"><?= $lang_resource['neighborhood_V2'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("neighborhood", "name", "", true) + "</div></div>"
        }
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        
        if(b)
        {
        
          console.log("country55="+cntry);
     console.log("city55="+cty);
         Users.PopulateCitySelect(cntry,cty)
        }
        
        
      //  $("#name").focus()
    },
    
    
    
    SaveCountry: function () {
        if (Forms.CanSave("country") == false) {
            return
        }
        Forms.PrepareForSaving("country");
        Main.Request("countries", null, "f=SaveCountry&data=" + JSON.stringify(Forms.Form.country), "SuperAdmin.CountriesManager()");
        Forms.Clean("country")
    },
    
    SaveNeighbor: function () {
       
        
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        country=document.getElementById("country").value;
      
        city=document.getElementById("city").value;
          name=document.getElementById("name").value;
          data=new Array();
          
           data.push({
            country: country,
            city: city,
              name: name,
              id:Forms.Form.neighborhood.id
        });
        
         
        $.post("lib/neighborhood.php", "f=checkNeighborhood&data=" + JSON.stringify(data), function (b) {
              
            if (a != Main.Aid) {
                return
            }
              console.log(JSON.stringify(Forms.Form.neighborhood));
            Main.Ready();
            if(b=='1'){
            	alert("<?= $lang_resource['neighborhood_V2_CHECK'] ?>");
                return 
            }
             if (Forms.CanSave("neighborhood") == false) {
            return
        }
      
              Forms.PrepareForSaving("neighborhood");
           console.log(JSON.stringify(Forms.Form.neighborhood));
             Main.Request("neighborhood", null, "f=SaveNeighborhood&data=" + JSON.stringify(Forms.Form.neighborhood), "SuperAdmin.NeighborhoodManager()");
              Forms.Clean("neighborhood")
         
        })
     
       
    },
    
    
    
    DeleteCountry: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("countries", null, "f=DeleteCountry&data=" + JSON.stringify(a), "SuperAdmin.CountriesManager()")
    },
    
    DeleteNeighborhood: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("neighborhood", null, "f=DeleteNeighborhood&data=" + JSON.stringify(a), "SuperAdmin.NeighborhoodManager()")
    },
    
    
    SosundAlertSettings: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetSoundSettings", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            SuperAdmin.SosundAlertSettingsForm(JSON.parse(b))
         
        })
    },
    //////////site schedule start////////////////////////////
       siteScheduleSettingsText: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetSiteScheduleSettingsText", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            SuperAdmin.siteScheduleSettingsTextForm(JSON.parse(b))
         
        })
    },
        siteScheduleSettings: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetSiteScheduleSettings", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            SuperAdmin.siteScheduleSettingsForm(JSON.parse(b))
         
        })
    },
    siteScheduleSettingsTextForm:function ( F){
      var a = "";
        var c = "";
      
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SiteScheduleTextSettingsConfig('siteSchedulesettingstext')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("siteSchedulesettingstext", "mainbuttonok");
         if (F == null) {
            F = new Object();
             Forms.Form.siteSchedulesettingstext.type = "create"
            }else{
             Forms.Form.siteSchedulesettingstext.type = "modify";
         
            }
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SITE_SCHEDULE_SETTING_TEXT'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
      /////////////////////////////////
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SITE_SCHEDULE_SETTING_SORRY'] ?></span><div class="inputbox"> ' + Forms.CreateInputProperty("siteSchedulesettingstext", "sitescheduletext1", Main.NullToEmpty(F.sitescheduletext1), true, "", false, false) + "</div></div>";
          c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SITE_SCHEDULE_SETTING_MESSAGE'] ?></span><div class="inputbox"> ' + Forms.CreateInputProperty("siteSchedulesettingstext", "sitescheduletext2", Main.NullToEmpty(F.sitescheduletext2), true, "", false, false) + "</div></div>";
            c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SITE_SCHEDULE_SETTING_OUR_HOURS'] ?></span><div class="inputbox"> ' + Forms.CreateInputProperty("siteSchedulesettingstext", "sitescheduletext3", Main.NullToEmpty(F.sitescheduletext3), true, "", false, false) + "</div></div>";
      ////////////////////////////////  
        
          c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
    },
   zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   },
    siteScheduleSettingsForm:function ( F){
    
    
   
      var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SiteScheduleSettingsConfig('siteSchedulesettings')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("siteSchedulesettings", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SITE_SCHEDULE_SETTING'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        /////////////////////////
          var M = false;
        if (F == null) {
            F = new Object();
            Forms.Form.siteSchedulesettings.type = "create"
              Forms.CreateValue("siteSchedulesettings", "siteSchedule", '');
        } else {
            Forms.Form.siteSchedulesettings.type = "modify";
         
            var C = F.siteschedule;
            M = true
             Forms.CreateValue("siteSchedulesettings", "siteSchedule", JSON.stringify(C));
        }
         
        var z;
        var J;
        var O;
        var d;
        var L = ["", "<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_MONDAY'] ?>", 
			"<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_TUESDAY'] ?>", 
			"<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_WEDNESDAY'] ?>", 
			"<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_THURSDAY'] ?>", 
			"<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_FRIDAY'] ?>", 
			"<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SATURDAY'] ?>", 
			"<?= $lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SUNDAY'] ?>"];
        for (var B = 1; B <= 7; B++) {
            c += "<span>" + L[B] + "</span><br/>";
           if (M && C.sdays) {
                z = C.sdays[B].opens.hour;
                J = C.sdays[B].opens.minute;
                O = C.sdays[B].closes.hour;
                d = C.sdays[B].closes.minute
            }
            //Time selection settings. 
                  time_format="<?=$lang_resource['TIME_FORMAT']?>";
            c += '<div class="row"><span class="caption"><?= $lang_resource['SITE_SCHEDULE_SETTING_OPENNING'] ?></span><div class="inputbox">';
            c += '<select id="' + B + '_openminute" class="scheduleminute" onchange="SuperAdmin.UpdateSchedule()">';
            for (var E = 0; E < 60; E++) {
                if (J == E) {
                    c += "<option SELECTED>" +  SuperAdmin.zeroPad((E),2)+ "</option>"
                } else {
                    c += "<option>" +  SuperAdmin.zeroPad((E),2) + "</option>"
                }
            }
            c += "</select>";
            c += '<span class="caption schedulecaption">:</span>';
            c += '<select id="' + B + '_openhour" class="schedulehour" onchange="SuperAdmin.UpdateSchedule()" style="width:69px">>';
            for (var E = 0; E < 24; E++) {
            //Time selection settings. 
             	if(time_format=="12"){
                 	E2=Business.convertTimeFormatHour(E);
                 }else{
               		  E2= SuperAdmin.zeroPad((E),2);
                 }
                if (z == E) {
                
                     c += "<option SELECTED  value="+E+" >" +  E2+ "</option>";
                } else {
                     c += "<option  value="+E+" >" +  E2 + "</option>";
                }
            }
            c += "</select>";
            c += "</div></div>";
            c += '<div class="row"><span class="caption"><?= $lang_resource['SITE_SCHEDULE_SETTING_CLOSING'] ?></span><div class="inputbox">';
            c += '<select id="' + B + '_closeminute" class="scheduleminute" onchange="SuperAdmin.UpdateSchedule()">';
            for (var E = 0; E < 60; E++) {
                if (d == E) {
                    c += "<option SELECTED>" + SuperAdmin.zeroPad((E),2) + "</option>"
                } else {
                    c += "<option>" + SuperAdmin.zeroPad((E),2) + "</option>"
                }
            }
            c += "</select>";
            c += '<span class="caption schedulecaption">:</span>';
            c += '<select id="' + B + '_closehour" class="schedulehour" onchange="SuperAdmin.UpdateSchedule()" style="width:69px">>';
             for (var E = 0; E < 29; E++) {
                
                if(E > 24){
               
                    var q = E-24;
                    
                    if (O == E) {
                         c += "<option  SELECTED value="+E+">" + q + "am</option>"
                    }
                    else{
                         c += "<option value="+E+">" + q + "am</option>"
                    }
                }            
                else {
                //Time selection settings. 
                if(time_format=="12"){
                    E2=Business.convertTimeFormatHour(E);
                 }else{
                      E2=SuperAdmin.zeroPad((E),2);
                 }
                    if (O == E) {
                        c += "<option  SELECTED value="+E+">" + E2+ "</option>"
                    }
                    else{
                        c += "<option value="+E+">" + E2+ "</option>"
                    }
                }
            }


            c += "</select>";
            c += "</div></div>"
        }
      
        
        /////////////////////
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
    
    },
     UpdateSchedule: function () {
        var f = new Object();
        var e;
     
        f.sdays = new Object();
        for (var d = 1; d <= 7; d++) {
            f.sdays[d] = new Object();
            f.sdays[d].opens = new Object();
            f.sdays[d].closes = new Object();
            e = document.getElementById(d + "_openhour");
            //Time selection settings. 
              f.sdays[d].opens.hour = e.value;
           // f.sdays[d].opens.hour = e.options[e.selectedIndex].text;
            e = document.getElementById(d + "_openminute");
            f.sdays[d].opens.minute = e.options[e.selectedIndex].text;
            e = document.getElementById(d + "_closehour");
            //Time selection settings. 
             f.sdays[d].closes.hour  = e.value;
            f.sdays[d].closes.hour = e.options[e.selectedIndex].value;
            e = document.getElementById(d + "_closeminute");
            f.sdays[d].closes.minute = e.options[e.selectedIndex].text;
         
            
        }
        
        Forms.UpdateValue("siteSchedulesettings", "siteSchedule", JSON.stringify(f), true);
       
        if (Forms.CanSave("siteSchedulesettings")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
        //////////site schedule end////////////////////////////
        
        sitePanelSettings: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetPanelSettings", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
           	b=JSON.parse(b);
           
            SuperAdmin.PanelSettingsForm(b)
         
        })
    },
    
    PanelSettingsForm: function(b){
    	
        var d = new Array();
        d.push(JSON.parse('{"id":"1","caption":"Old Panel"}'));
        d.push(JSON.parse('{"id":"2","caption":" New Panel"}'));
        
        var a = "";
        var c = "";
       a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.PanelSettingsConfig('panelsetting')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("panelsetting", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SITE_PANEL_SETTING_TEXT'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
       
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SITE_PANEL_TYPE_TEXT'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("panelsetting",'panelsetting',d, Main.NullToEmpty(b.panelsetting), false) + "</div></div>";
         
        
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
    //    $("#splitedadtime").focus()
    },
        
        
        
        
          BusinessPageSettings: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetBusinessPageSettings", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if(b==''){
            b=new Object();
            b.businesspagprograssbarsetting=0;
             b.businesspageheadersetting=0;
              b.businesspagefootersetting=0;
             
            }else{
            	b=JSON.parse(b);
            }
            SuperAdmin.BusinessPageSettingsForm(b)
         
        })
    },
     BusinessPageSettingsForm: function(b){
    	
        var d = new Array();
          d.push(JSON.parse('{"id":"0","caption":"No"}'));
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
      
        
     

        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.BusinessPageSettingsConfig('businesspage')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("businesspage", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['BUSINESS_PAGE_SETTING'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
       
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['BUSINESS_PAGE_HEADER_SETTING'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("businesspage", "businesspageheadersetting",d, Main.NullToEmpty(b.businesspageheadersetting), false) + "</div></div>";
          c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['BUSINESS_PAGE_PROGRESSBAR_SETTING'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("businesspage", "businesspagprograssbarsetting",d, Main.NullToEmpty(b.prograssbarsetting), false) + "</div></div>";
             c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['BUSINESS_PAGE_FOOTER_SETTING'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("businesspage", "businesspagefootersetting",d, Main.NullToEmpty(b.businesspagefootersetting), false) + "</div></div>";
        
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
    //    $("#splitedadtime").focus()
    },
    SosundAlertSettingsForm: function(b){
    	
        var d = new Array();
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"0","caption":"No"}'));
        
        var t = new Array();
        for(var i =10 ; i<=60; ){
         t.push(JSON.parse('{"id":"'+i+'","caption":"'+i+' sec"}'));
         i= i+10
        }
        

        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "SuperAdmin.SaveSoundConfig('soundalert')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("soundalert", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SOUNDALERT_V2'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        if(Main.User.level==0){
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SOUNDSTATUS_V2'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("soundalert", "superadminsoundstatus",d, Main.NullToEmpty(b.superadminsoundstatus), true) + "</div></div>";
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SOUNDDURATION_V2'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("soundalert", "superadminsoundduration",t, Main.NullToEmpty(b.superadminsoundduration), true) + "</div></div>";
        }else if(Main.User.level==2){
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SOUNDSTATUS_V2'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("soundalert", "businesssoundstatus", d,Main.NullToEmpty(b.businesssoundstatus), true) + "</div></div>";
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SOUNDDURATION_V2'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("soundalert", "businesssoundduration",t, Main.NullToEmpty(b.businesssoundduration), true) + "</div></div>";
		}
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#splitedadtime").focus()
    },
    
    SiteScheduleTextSettingsConfig:function(a){
    
    Main.Loading(); 
        if (Forms.CanSave(a) == false) {
        $("#loadingbox").hide();
            return
            
        }
        Forms.PrepareForSaving(a);
       
          $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=sitescheduletext1&value=" + Main.NullToEmpty(Forms.Form[a].fields.sitescheduletext1.value), function (c) {
                Main.Ready();  
              
       
            });
             $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=sitescheduletext2&value=" + Main.NullToEmpty(Forms.Form[a].fields.sitescheduletext2.value), function (c) {
                Main.Ready();  
              
       
            });
             $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=sitescheduletext3&value=" + Main.NullToEmpty(Forms.Form[a].fields.sitescheduletext3.value), function (c) {
                Main.Ready();  
              
       
            });
             SuperAdmin.PrintMain();   
    
    },
    SiteScheduleSettingsConfig:function(a){
    Main.Loading(); 
        if (Forms.CanSave(a) == false) {
        $("#loadingbox").hide();
            return
            
        }
        Forms.PrepareForSaving(a);
       
          $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=siteschedule&value=" + Main.NullToEmpty(Forms.Form[a].fields.siteSchedule.value), function (c) {
                Main.Ready();  
              
       
            });
             SuperAdmin.PrintMain();   
    },
    
    
    PanelSettingsConfig: function(a){
		Main.Loading(); 
        if (Forms.CanSave(a) == false) {
            return
        }	
		$.post("lib/panel-configs.php", "f=PanelSaveSettingsConfig&name=panelsetting&value=" + Main.NullToEmpty(Forms.Form[a].fields.panelsetting.value), function (c) {
                Main.Ready(); 
                var c =JSON.parse(c);
                if(c.panelvalue==1){
                window.location.href = './panel/';
                }else{
                window.location.href = './admin/';
                }
                    
            });
            
		
		//SuperAdmin.PrintMain();
		
	},
    
    
      BusinessPageSettingsConfig: function(a){
    	Main.Loading(); 
        if (Forms.CanSave(a) == false) {
            return
        }
        Forms.PrepareForSaving(a);
       
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=businesspagprograssbarsetting&value=" + Main.NullToEmpty(Forms.Form[a].fields.businesspagprograssbarsetting.value), function (c) {
                Main.Ready();     
            });
            Main.Loading();
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=businesspageheadersetting&value=" + Main.NullToEmpty(Forms.Form[a].fields.businesspageheadersetting.value), function (c) {
                Main.Ready();     
            });
             $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=businesspagefootersetting&value=" + Main.NullToEmpty(Forms.Form[a].fields.businesspagefootersetting.value), function (c) {
                Main.Ready();     
            });
          

        
      
        SuperAdmin.PrintMain();
    },
    SaveSoundConfig: function(a){
    	Main.Loading(); 
        if (Forms.CanSave(a) == false) {
            return
        }
        Forms.PrepareForSaving(a);
        if(Main.User.level==0){
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=superadminsoundstatus&value=" + Main.NullToEmpty(Forms.Form[a].fields.superadminsoundstatus.value), function (c) {
                Main.Ready();     
            });
            Main.Loading();
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=superadminsoundduration&value=" + Main.NullToEmpty(Forms.Form[a].fields.superadminsoundduration.value), function (c) {
                Main.Ready();     
            });

        }else if(Main.User.level==2){
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=businesssoundstatus&value=" + Main.NullToEmpty(Forms.Form[a].fields.businesssoundstatus.value), function (c) {
                Main.Ready();     
            });
             Main.Loading();
            $.post("lib/panel-configs.php", "f=SaveSettingsConfig&name=businesssoundduration&value=" + Main.NullToEmpty(Forms.Form[a].fields.businesssoundduration.value), function (c) {
                Main.Ready();     
            });
        }
        Main.FetchSoundsTimeSet();
        SuperAdmin.PrintMain();
    },
};
