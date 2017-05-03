<?php
session_start();
require_once('../login/common.php');
require_authentication(2);
?>
var Provider = {
    Home: function () {
        var a = "";
        var b = "";
        b += Visuals.CreateMenuItem("Provider.HomeUrl()", "<?=$lang_resource['CONTROL_PANEL_START']?>");
        b += Visuals.CreateMenuItem("Business.Main()", "<?=$lang_resource['CONTROL_PANEL_BUSINESS']?>");
        b += Visuals.CreateMenuItem("Orders.Main()", "<?=$lang_resource['CONTROL_PANEL_ORDERS']?>");
        var c = '<div id="secondarymenu">';
        c += Visuals.CreateBoxButton("Business.Main()", "<?=$lang_resource['CONTROL_PANEL_BUSINESS']?>", "<?=$lang_resource['CONTROL_PANEL_BUTTON_SUB_BUSINES']?>", "business");
        c += Visuals.CreateBoxButton("Orders.Main()", "<?=$lang_resource['CONTROL_PANEL_ORDERS']?>", "<?=$lang_resource['CONTROL_PANEL_BUTTON_SUB_ORDERS']?>", "orders");
        c +=Visuals.CreateBoxButton("DiscountCode.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT'] ?>","","discount");
        c +=Visuals.CreateBoxButton("DiscountOffer.Main()","<?= $lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_OFFER'] ?>","","discountOffer");
         c+=Visuals.CreateBoxButton("ZipBusiness.Main()","<?= $lang_resource['CONTROLL_PANEL_ZIPTEXT'] ?>","<?= $lang_resource['CONTROLL_PANEL_ZIPBUSINESS'] ?>","ziplogo");
        c += "</div>";
        document.getElementById("totalOrderBox").style.display = "block";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("menu").innerHTML = b;
        document.getElementById("main").innerHTML = c;
       // document.getElementById("opcsicon").style.display = "none"
        
       document.getElementById("opcsicon").onclick = Provider.SosundAlertSettings
    },
     HomeUrl: function () {
     window.location="./";
    },
    
   SosundAlertSettings: function () {
   document.getElementById("totalOrderBox").style.display = "none";
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetSoundSettings", function (b) {
        
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            Provider.SosundAlertSettingsForm(JSON.parse(b))
         
        })
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
        a += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "Provider.SaveSoundConfig('soundalert')");
        a += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "Provider.HomeUrl()");
        Forms.Clean("soundalert", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['SOUNDALERT_V2'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        if(Main.User.level==0){
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SOUNDSTATUS_V2'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("soundalert", "superadminsoundstatus",d, Main.NullToEmpty(b.superadminsoundstatus), true) + "</div></div>";
        c += '<div class="row"><span class="caption" style="width: 120px !important;"><?= $lang_resource['SOUNDDURATION_V2'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("soundalert", "superadminsoundduration",t, Main.NullToEmpty(b.superadminsoundduration), true) + "</div></div>";
        }
        if(Main.User.level==2){
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
    
        Provider.HomeUrl();
    },

};
