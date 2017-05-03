<?php
session_start();
require_once('../login/common.php');
require_authentication(1);
?>
var Users = {
    Main: function () {
        Main.Loading();
        var b = this;
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllUsersData"}]', function (c) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                Main.Users = JSON.parse(c).users;
                b.PrintMain()
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function () {
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var c = "";
        b.push(Visuals.CreateSubMenuItem("Users.New()","<?= $lang_resource['CONTROL_PANEL_USERS_BUTTON_CREATE'] ?>"));
		b.push(Visuals.CreateSubMenuItem("Users.Edit()","<?= $lang_resource['CONTROL_PANEL_USERS_BUTTON_EDIT'] ?>"));
		b.push(Visuals.CreateSubMenuItem("Users.Export()","<?= $lang_resource['CONTROL_PANEL_USERS_BUTTON_EXPORT'] ?>"));
		b.push(Visuals.CreateSubMenuItem("Users.Delete()","<?= $lang_resource['CONTROL_PANEL_USERS_BUTTON_DELETE'] ?>"));
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['USERS_V2'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="Users.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="username hand" onclick="Users.PupulateTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_NAME_HEADER'] ?></span></div>';
        c += '<div class="type"><span class="caption default"><?= $lang_resource['CONTROL_PANEL_USERS_GROUP_HEADER'] ?></span></div>';
        c += '<div class="email hand" onclick="Users.PupulateTable(\'email\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_EMAIL_HEADER'] ?></span></div>';
        c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="users"></div>';
        c += "</div>";
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
            Users.PupulateTable(Main.Config.Users.List.SortBy, true)
        };
        Users.PupulateTable(Main.Config.Users.List.SortBy, true)
    },
    PupulateTable: function (b, c) {
        var d = "";
        var a = Main.Users.length;
        if (c) {
            Main.Users.sort(Main.SortByProperty(b));
            if (Main.Config.Users.List.SortByStatus == "max") {
                Main.Users.reverse()
            }
        } else {
            if (Main.Config.Users.List.SortBy != b) {
                Main.Users.sort(Main.SortByProperty(b));
                Main.Config.Users.List.SortByStatus = "min"
            } else {
                Main.Users.reverse();
                if (Main.Config.Users.List.SortByStatus == "min") {
                    Main.Config.Users.List.SortByStatus = "max"
                } else {
                    Main.Config.Users.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Users.List.SortBy = b;
        if (!c) {
            Main.SaveConfig()
        }
        var h = false;
        var f = "";
        var k = new Array();
        for (var e in Main.Users) {
            h = false;
            f = document.getElementById("search").value.toLowerCase();
            if (String(Main.Users[e].id).toLowerCase().indexOf(f) >= 0 || Main.Users[e].levelname.toLowerCase().indexOf(f) >= 0 || Main.Users[e].email.toLowerCase().indexOf(f) >= 0 || (Main.Users[e].name + " " + Main.Users[e].lastname + " " + Main.Users[e].lastname2).toLowerCase().indexOf(f) >= 0) {
                h = true;
                k.push(Main.Users[e])
            }
            if (h) {
                var j;
                if (e % 2 == 0) {
                    j = " grey"
                } else {
                    j = ""
                }
                d += '<div class="default row' + j + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="Users.Edit(' + Main.Users[e].id + ')">' + Main.Users[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + Main.Users[e].id + '"/></div>';
                d += '<div class="username"><div class="cap"><span class="caption hand" onclick="Users.Edit(' + Main.Users[e].id + ')">' + Main.Users[e].name + " " + Main.Users[e].lastname + " " + Main.Users[e].lastname2 + "</span></div></div>";
                d += '<div class="type"><div class="cap"><span class="caption">' + Main.Users[e].levelname + "</span></div></div>";
                d += '<div class="email"><div class="cap"><span class="caption">' + Main.Users[e].email + "</span></div></div>";
                d += '<div class="enabled"><span class="caption"><div id="switch_' + Main.Users[e].id + '"></div></span></div>';
                d += "</div>";
                d += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
                d += '<input type="hidden" name="f" value="ExportUser"/>';
                d += '<input id="exp_data" type="hidden" name="data" value=""/>';
                d += '<input type="hidden" name="name" value="users"/>';
                d += "</form>"
            }
        }
        document.getElementById("users").innerHTML = d;
        var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != Main.User.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
                Switch.Create("switch_" + k[e].id, g);
                Switch.OnChange("switch_" + k[e].id, function (m, l) {
                    Users.SetEnabled(m.replace("switch_", ""), l)
                })
            }
        }
    },
    SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/users.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    Edit: function (a, b) {
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
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserData","id":"' + a + '"}]', "Users.PreEdit")
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Franchises = a.franchises;
        Main.Countries = a.countries;
        this.Form(a.user)
    },
    New: function () {
        Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"}]', "Users.PreNew")
    },
    PreNew: function (a) {
        if (a == "") {
            alert("Error")
        }
        Main.Countries = JSON.parse(a).countries;
        this.Form()
    },
    Form: function (e) {
        var h = "";
        var j = "";
        var g = false;
        h += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "");
        h += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "Users.PrintMain()");
        Forms.Clean("user", "mainbuttonok");
        Uploader.Clean();
        GoogleMap.Clean();
        if (e == null) {
            e = new Object();
            Forms.Form.user.type = "create";
            Forms.CreateValue("user", "config", "{}", false, false, true)
        } else {
            g = true;
            Forms.Form.user.type = "modify";
            Forms.Form.user.id = e.id
        }
        j += '<div class="contentbox">';
        j += '<div class="titlebox nonselectable">';
        if (Forms.Form.user.type == "create") {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_USERS_CREATE_TITLE'] ?></span>'
        } else {
            j += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_USERS_EDIT_TITLE'] ?></span>'
        }
        j += "</div>";
        j += '<div class="editform">';
        j += '<div class="leftcol">';
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "name", e.name, true) + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_LAST_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "lastname", e.lastname, true) + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_SECOND_LAST_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "lastname2", e.lastname2, false) + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "email", e.email, true) + "</div></div>";
        if (g) {
            j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PASS'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "pwd", e.passwd, false, "", false, true) + "</div></div>"
        } else {
            j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PASS'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "pwd", e.passwd, true) + "</div></div>"
        }
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_STREET'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "street", e.street, true, "GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_SUBURB'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "colony", e.colony, false, "GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_ZIP'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "cp", e.cp, false) + "</div></div>";
        var c = new Array();
        c.push({
            id: "",
            caption: ""
        });
        for (i in Main.Countries) {
            c.push({
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_COUNTRY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("user", "country", c, Main.NullToEmpty(e.country), true, "Users.CountrySelected(this);GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_CITY'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("user", "city", [], Main.NullToEmpty(e.city), true, "GoogleMap.UpdateUserPosition(this)") + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PHONE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "tel", e.tel, false) + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_MOBILE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "cel", e.cel, false) + "</div></div>";
        j += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_JOB'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("user", "job", e.job, false) + "</div></div>";
        if (e.id == Main.User.id) {
            Forms.CreateValue("user", "level", "null")
        } else {
            var d = "";
            var a;
            if (g) {
                a = ""
            } else {
                a = '{"id":"","caption":""},'
            }
            switch (Main.User.level) {
            case "0":
                d = "[" + a + '{"id":"1","caption":"Administrator"},{"id":"2","caption":"Business owner"},{"id":"3","caption":"Client"}]';
                break;
            case "1":
                d = "[" + a + '{"id":"2","caption":"Business owner"},{"id":"3","caption":"Client"}]';
                break
            }
            d = JSON.parse(d);
            j += '<div class="row"><span class="caption"><span class="caption"><?= $lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_GROUP'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("user", "level", d, e.level, true, "", true) + "</div></div>"
        }
        j += "</div>";
        j += '<div class="rightcol">';
        j += '<form id="uform" enctype="multipart/form-data" method="post" action="upload.php">';
        var b = "";
        if (e.id) {
            b = "background-image:url('images/users/" + Main.NullToEmpty(e.id) + "/medium.jpg?c=" + new Date().getTime() + "');"
        }
        j += '<div><input type="file" name="file[]" style="' + b + '"/></div>';
        j += '<div id="mapbox" class="smallmapbox"></div>';
        j += "</form>";
        j += "</div>";
        j += "</div>";
        j += "</div>";
        document.getElementById("leftcol").innerHTML = h;
        document.getElementById("main").innerHTML = j;
        Forms.CreateValue("user", "imgupload0", "", true);
        Uploader.Activate();
        Uploader.Init("user", "uform", null, true, Users.ProfileImageUploadFinished, Users.ProfileImageSelected, Users.ProfileStartUpload);
        document.getElementById("mainbuttonok").onclick = function () {
            Users.TryToStartSave(e.id)
        };
        Forms.CreateValue("user", "location", e.location);
        var f;
        if (e.location == "" || e.location == null) {
            f = new Object();
            f.latitud = 23.634501;
            f.longitud = -102.552784;
            f.zoom = 4
        } else {
            f = JSON.parse(e.location)
        }
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, Users.LocationUpdated);
        if (g) {
            Users.PopulateCitySelect(e.country, e.city)
        }
        $("#name").focus()
    },
    CountrySelected: function (a) {
        Users.PopulateCitySelect(a.options[a.selectedIndex].value)
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
                if (b && j) {
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.user.fields.city.value = "";
                    if (Forms.CanSave("user")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },
    LocationUpdated: function (a) {
        Forms.UpdateValue("user", "location", JSON.stringify(a), true);
        if (Forms.CanSave("user")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageSelected: function (b, a) {
        Forms.UpdateValue("user", "imgupload" + a, b, true);
        if (Forms.CanSave("user")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (b) {
        Response = JSON.parse(b);
        if (Response.status == "no files selected") {
            Users.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                Users.Save(Response[0].name)
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
    TryToStartSave: function (a) {
        var c = document.getElementById("email");
        var d = c.value;
        if (Main.IsEmail(d)) {
            var b = new Date().getTime();
            Main.Aid = b;
            Main.Loading();
            if (a) {
                a = "&id=" + a
            } else {
                a = ""
            }
            $.post("lib/users.php", "f=GetEmailAvailability&email=" + d + a, function (e) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e == "ok") {
                    Uploader.UploadFiles("uform")
                } else {
                    alert("Email ya registrado")
                }
            })
        } else {
            alert("ingresa Email correcto por favor")
        }
    },
    Save: function (a) {
        if (Forms.CanSave("user") == false) {
            return
        }
        Forms.PrepareForSaving("user");
        if (a != null) {
            Forms.Form.user.image = a
        }
        if (Users.ForceMainButtonEvent) {
            Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), Users.ForceMainButtonEvent)
        } else {
            Main.Request("users", null, "f=SaveUser&data=" + JSON.stringify(Forms.Form.user), "Users.Main()")
        }
        Uploader.Clean();
        Forms.Clean("user");
        GoogleMap.Clean()
    },
    Export: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        document.getElementById("exp_data").value = JSON.stringify(a);
        document.getElementById("exp_form").submit()
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("users", null, "f=DeleteUser&data=" + JSON.stringify(a), "Users.Main()")
    }
};
