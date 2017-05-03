var sms =
{
	EnableSmsSettings:function()
	{
		$("#leftcol > #submenu").prepend('<div class="box" onclick="Visuals.SubMenuItemClick(this,1,0,\'sms.SmsForm()\')"><div class="img"></div><span class="caption">SMS</span><div id="subs1" class="subs"></div></div>');
	},
	EnableSmsBusiness:function(F)
	{
		// Phone number
		$("#main > .contentbox > #tab_general > .leftcol").append('<div class="row"><span class="caption"><?= $lang_resource['SMS_BUSSINESS_TWILIO_PHONE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("business", "twiliophone", F.twiliophone) + "</div></div>");
		// Check box to enable/disable
		var H = false;
        if (F.twilioenabled == "t") {
            H = true
        }
		$("#main > .contentbox > #tab_general > .leftcol").append('<div class="row"><span class="caption"><?= $lang_resource['SMS_BUSSINESS_ENABLE_SMS'] ?></span><div class="inputbox">' + Forms.CreateCheckBoxProperty("business", "twilioenabled", H) + "</div></div>");
	},
	// Render form
	RenderForm: function (a, d) {
        var b = "";
        var c = "";
        b += Visuals.CreateMainButton("<?= $lang_resource['SMS_BUSSINESS_SAVE_BUTTON'] ?>", "ok", "sms.SaveConfig('sms')");
        b += Visuals.CreateMainButton("<?= $lang_resource['SMS_BUSSINESS_CANCEL_BUTTON'] ?>", "cancel", "SuperAdmin.PrintMain()");
        Forms.Clean("sms", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; SMS (Twilio)</span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?= $lang_resource['SMS_BUSSINESS_SID_LABEL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("sms", "sid", Main.NullToEmpty(a), true) + "</div></div>";
        c += '<div class="row"><span class="caption"><?= $lang_resource['SMS_BUSSINESS_TOKEN_LABEL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("sms", "token", Main.NullToEmpty(d), true) + "</div></div>";
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        $("#sms").focus()
    },
	// Save info
	SaveConfig: function (a) {
        if (Forms.CanSave(a) == false) {
            return
        }
       // Forms.PrepareForSaving(a);
        Main.Loading();
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("lib/panel-configs.php", "f=SaveConfig&name=sid&value=" + Forms.Form[a].fields.sid.value, function (c) {
            if (b != Main.Aid) {
                return
            }
			
            if (c != "ok") {
                alert("Error")
            }
			
			$.post("lib/panel-configs.php", "f=SaveConfig&name=token&value=" + Forms.Form[a].fields.token.value, function (d) {
				if (b != Main.Aid) {
					return
				}
				Main.Ready();
				if (d != "ok") {
					alert("Error")
				}
				SuperAdmin.PrintMain();
				
				Forms.Clean(a)
			});
        });
    },
	// Get info stored
	SmsForm: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetConfig&name=sid", function (b) {
            if (a != Main.Aid) {
                return
            }
			$.post("lib/panel-configs.php", "f=GetConfig&name=token", function (c) {
				if (a != Main.Aid) {
					return
				}
				Main.Ready();
				sms.RenderForm(b, c)
			})
        })
    }
}
