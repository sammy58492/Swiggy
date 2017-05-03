<?php
session_start();
require_once('../login/common.php');
require_authentication(0);	
?>
var IS_PAYPAL_ENABLED = 1;
var Franchises = {
    Main: function () {
        Main.GetFranchisesData("Franchises.PrintMain()")
    },
    PrintMain: function () {
        for (var a in Main.Franchises) {
            Main.Franchises[a].aname = Main.Franchises[a].admin.name
        }
        var c = new Array();
        var b = Visuals.CreateSearchBox();
        var d = "";
         document.getElementById("totalOrderBox").style.display = "none";
        c.push(Visuals.CreateSubMenuItem("Franchises.New()", "<?= $lang_resource['CONTROL_PANEL_FRANCHISES_CREATE'] ?>"));
        c.push(Visuals.CreateSubMenuItem("Franchises.Edit()", "<?= $lang_resource['CONTROL_PANEL_FRANCHISES_EDIT'] ?>"));
        c.push(Visuals.CreateSubMenuItem("Franchises.Delete()", "<?= $lang_resource['CONTROL_PANEL_FRANCHISES_DELETE'] ?>"));
        b += Visuals.CreateSubMenu(c);
        document.getElementById("leftcol").innerHTML = b;
        d += '<div class="contentbox">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_FRANCHISES_TITLE'] ?></span>';
        d += "</div>";
        d += '<div class="table">';
        d += '<div class="title nonselectable">';
        d += '<div class="id hand" onclick="Franchises.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="franchisecity hand" onclick="Franchises.PupulateTable(\'city\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_CITY_HEADER'] ?></span></div>';
        d += '<div class="franchiseadmin hand" onclick="Franchises.PupulateTable(\'aname\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_ADMIN_HEADER'] ?></span></div>';
        d += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_ENABLE_HEADER'] ?></span></div>';
        d += "</div>";
        d += '<div class="container" id="franchises"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            Franchises.PupulateTable(Main.Config.Franchises.List.SortBy, true)
        };
        Franchises.PupulateTable(Main.Config.Franchises.List.SortBy, true)
    },
    PupulateTable: function (a, b) {
        var c = "";
        var e = Main.Franchises.length;
        if (b) {
            Main.Franchises.sort(Main.SortByProperty(a));
            if (Main.Config.Franchises.List.SortByStatus == "max") {
                Main.Franchises.reverse()
            }
        } else {
            if (Main.Config.Franchises.List.SortBy != a) {
                Main.Franchises.sort(Main.SortByProperty(a));
                Main.Config.Franchises.List.SortByStatus = "min"
            } else {
                Main.Franchises.reverse();
                if (Main.Config.Franchises.List.SortByStatus == "min") {
                    Main.Config.Franchises.List.SortByStatus = "max"
                } else {
                    Main.Config.Franchises.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Franchises.List.SortBy = a;
        if (!b) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var f = new Array();
        for (var d in Main.Franchises) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (Main.Franchises[d].city.toLowerCase().indexOf(g) >= 0 || String(Main.NullToEmpty(Main.Franchises[d].id)).toLowerCase().indexOf(g) >= 0 || (Main.NullToEmpty(Main.Franchises[d].admin.name) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname2)).toLowerCase().indexOf(g) >= 0) {
                j = true;
                f.push(Main.Franchises[d])
            }
            if (j) {
                var k;
                if (d % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
                c += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                c += '<div class="id"><div class="cap"><span class="caption hand" onclick="Franchises.Edit(' + Main.Franchises[d].i + ')">' + Main.Franchises[d].id + "</span></div></div>";
                c += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.Franchises[d].id + '"/></div>';
                c += '<div class="franchisecity"><div class="cap"><span class="caption hand" onclick="Franchises.Edit(' + Main.Franchises[d].id + ')">' + Main.Franchises[d].city + "</span></div></div>";
                c += '<div class="franchiseadmin"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Franchises[d].admin.name) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname) + " " + Main.NullToEmpty(Main.Franchises[d].admin.lastname2) + "</span></div></div>";
                c += '<div class="enabled"><span class="caption"><div id="switch_' + Main.Franchises[d].id + '"></div></span></div>';
                c += "</div>"
            }
        }
        document.getElementById("franchises").innerHTML = c;
        var h = false;
        Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + f[d].id, h);
            Switch.OnChange("switch_" + f[d].id, function (l, i) {
                Franchises.SetEnabled(l.replace("switch_", ""), i)
            })
        }
    },
    SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/franchises.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = new Date().getTime();
        Main.Aid = a;
        Main.Loading();
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"1"}]}]', function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                b = JSON.parse(b);
                Franchises.Admins = b.users;
                Main.Countries = b.countries;
                Franchises.Form()
            } else {
                alert("Error")
            }
        })
    },
    Edit: function (a) {
        var c = false;
        if (a) {
            c = true
        } else {
            var b = Main.GetMarkedCheckBoxesValues();
            if (b.length == 1) {
                a = b[0];
                c = true
            }
        }
        if (c) {
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchFranchiseData","id":"' + a + '"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"1"}]}]', "Franchises.PreEdit")
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error");
            return
        }
        a = JSON.parse(a);
        Franchises.Admins = a.users;
        Main.Countries = a.countries;
        Franchises.Form(a.franchise)
    },
    Form: function (j) {
        var g = "";
        var h = "";
        g += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "Franchises.Save()");
        g += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Franchises.PrintMain()");
        Forms.Clean("franchise", "mainbuttonok");
        if (j == null) {
            j = new Object();
            Forms.Form.franchise.type = "create"
        } else {
            Forms.Form.franchise.type = "modify";
            Forms.Form.franchise.id = j.id
        }
        h += '<div class="contentbox">';
        h += '<div class="titlebox nonselectable">';
        if (Forms.Form.franchise.type == "create") {
            h += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_FRANCHISES_FORM_TITLE_CREATE'] ?></span>'
        } else {
            h += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_FRANCHISES_FORM_TITLE_EDIT'] ?></span>'
        }
        h += "</div>";
        h += '<div class="editform">';
        h += '<div class="leftcol">';
        h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_CITY'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("franchise", "city", j.city, true) + "</div></div>";
        h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("franchise", "email", j.email, true) + "</div></div>";
        var d = new Array();
        d.push(JSON.parse('{"id":"' + Main.User.id + '","caption":""}'));
        for (var c in this.Admins) {
            var e = new Object();
            e.id = this.Admins[c].id;
            e.caption = this.Admins[c].name + " " + this.Admins[c].lastname;
            d.push(e)
        }
        var f = Main.User.id;
        if (j.admin) {
            f = j.admin
        }
        h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_ADMIN'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("franchise", "admin", d, f, false, "", true) + "</div></div>";
        var b = new Array();
        b.push({
            id: "",
            caption: ""
        });
        for (c in Main.Countries) {
            b.push({
                id: Main.Countries[c].id,
                caption: Main.Countries[c].name
            })
        }
		if(IS_PAYPAL_ENABLED == 1)
		{
			h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("franchise", "country", b, Main.NullToEmpty(j.country), true) + "</div></div>";

			var b = [{id:'Select',caption:'Please select'},{id:'USD',caption:'U.S. Dollar'},{id:'EUR',caption:'Euro'},{id:'MXN',caption:'Mexican Peso'},{id:'AUD',caption:'Australian Dollar'},{id:'BRL',caption:'Brazilian Real'},{id:'CAD',caption:'Canadian Dollar'},{id:'CZK',caption:'Czech Koruna'},{id:'DKK',caption:'Danish Krone'},{id:'HKD',caption:'Hong Kong Dollar'},{id:'HUF',caption:'Hungarian Forint'},{id:'ILS',caption:'Israeli New Sheqel'},{id:'JPY',caption:'Japanese Yen'},{id:'MYR',caption:'Malaysian Ringgit'},{id:'NOK',caption:'Norwegian Krone'},{id:'NZD',caption:'New Zealand Dollar'},{id:'PHP',caption:'Philippine Peso'},{id:'PLN',caption:'Polish Zloty'},{id:'GBP',caption:'Pound Sterling'},{id:'SGD',caption:'Singapore Dollar'},{id:'SEK',caption:'Swedish Krona'},{id:'CHF',caption:'Swiss Franc'},{id:'TWD',caption:'Taiwan New Dollar'},{id:'THB',caption:'Thai Baht'},{id:'TRY',caption:'Turkish Lira'}];

			h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_CURRENCY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("franchise", "currency", b, Main.NullToEmpty(j.currency), true) + "</div></div>";
		}
		else
		{
			h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("franchise", "country", b, Main.NullToEmpty(j.country), true) + "</div></div>";
		}
        h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TRACKING'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("franchise", "ga", j.ga) + "</div></div>";
       var a = new Array({
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
        
        a.sort(Main.SortByProperty("caption"));
        if (Forms.Form.franchise.type == "create") {
            a.unshift({
                id: "",
                caption: ""
            })
        }
      
        
        h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_ZONE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("franchise", "timezone", a, Main.NullToEmpty(j.timezone), true, "Franchises.TimeZoneSelected(this);") + "</div></div>";
       
          h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TAX'] ?></span><div class="inputbox">' +  Forms.CreateInputProperty("franchise", "tax", Main.NullToEmpty(j.tax), true, "", false, false, "return Main.IsNumberKey(event)")+ "</div></div>"; 
        
          var tatyp = [{id:'',caption:'<?= $lang_resource['SELECT_V21'] ?>'},{id:'1',caption:'<?= $lang_resource['Tax_not_included_V2'] ?>'},{id:'2',caption:'<?= $lang_resource['Tax_included_V2'] ?>'}];
        
        h += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TAX_TYPE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("franchise", "taxtype", tatyp, Main.NullToEmpty(j.taxtype), true) + "</div></div>";
        
        h += '<div class="row"><span class="caption" id="timespan" style="float:right;margin-right:7px;"></span></div>';
        h += "</div>";
        h += "</div>";
        h += "</div>";
        document.getElementById("leftcol").innerHTML = g;
        document.getElementById("main").innerHTML = h;
        if (Forms.Form.franchise.type == "modify") {
            Franchises.TimeZoneSelected(document.getElementById("timezone"))
        }
        $("#city").focus()
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
            document.getElementById("timespan").innerHTML = "<?= $lang_resource['Now_V2'] ?> " + c + " <?= $lang_resource['in_V2'] ?> " + document.getElementById("city").value
        })
    },
    Save: function () {
        if (Forms.CanSave("franchise") == false) {
            return
        }
        var a = document.getElementById("email");
        var b = a.value;
        if (!Main.IsEmail(b)) {
            alert("Please add a valid email");
            return
        }
        
        Forms.PrepareForSaving("franchise");
        var str = Forms.Form.franchise.fields.timezone.value; 
		Forms.Form.franchise.fields.timezone.value = str.replace("+", "@");

		var str = Forms.Form.franchise.fields.timezone.value; 
		Forms.Form.franchise.fields.timezone.value = str.replace("-", "$");
        
        Main.Request("franchises", null, "f=SaveFranchise&data=" + JSON.stringify(Forms.Form.franchise), "Franchises.Main()");
        Forms.Clean("franchise")
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("franchises", null, "f=DeleteFranchise&data=" + JSON.stringify(a), "Franchises.Main()")
    }
};
