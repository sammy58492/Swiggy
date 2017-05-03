var Ads = {
    Main: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/ads.php", "f=FetchAllAdsData", function (b) {
			
			
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                Ads.Ads = JSON.parse(b);
                Ads.PrintMain()
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function () {
		
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var c = "";
		 document.getElementById("totalOrderBox").style.display = "none";
        b.push(Visuals.CreateSubMenuItem("Ads.New()", "<?= $lang_resource['CONTROL_PANEL_ADS_BUTTON_CREATE'] ?>"));
        b.push(Visuals.CreateSubMenuItem("Ads.Edit()", "<?= $lang_resource['CONTROL_PANEL_ADS_BUTTON_EDIT'] ?>"));
        b.push(Visuals.CreateSubMenuItem("Ads.Delete()", "<?= $lang_resource['CONTROL_PANEL_ADS_BUTTON_DELETE'] ?>"));
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['ADVERTISEMENT_V2'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="Ads.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="adname hand" onclick="Ads.PupulateTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_NAME_HEADER'] ?></span></div>';
        c += '<div class="adcity default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CITY_HEADER'] ?></span></div>';
        c += '<div class="adhits hand" onclick="Ads.PupulateTable(\'hits\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CLICKS_HEADER'] ?></span></div>';
        c += '<div class="enabled default"><span class="caption">><?= $lang_resource['CONTROL_PANEL_ADS_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
            Ads.PupulateTable(Main.Config.Ads.List.SortBy, true)
        };
        Ads.PupulateTable(Main.Config.Ads.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
        var d = "";
        var b = this.Ads.length;
        if (c) {
            this.Ads.sort(Main.SortByProperty(a));
            if (Main.Config.Ads.List.SortByStatus == "max") {
                this.Ads.reverse()
            }
        } else {
            if (Main.Config.Ads.List.SortBy != a) {
                this.Ads.sort(Main.SortByProperty(a));
                Main.Config.Ads.List.SortByStatus = "min"
            } else {
                this.Ads.reverse();
                if (Main.Config.Ads.List.SortByStatus == "min") {
                    Main.Config.Ads.List.SortByStatus = "max"
                } else {
                    Main.Config.Ads.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Ads.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
        for (var e in this.Ads) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.Ads[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.Ads[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.Ads[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.Ads[e])
            }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="Ads.Edit(' + this.Ads[e].id + ')">' + this.Ads[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Ads[e].id + '"/></div>';
                d += '<div class="adname"><div class="cap"><span class="caption hand" onclick="Ads.Edit(' + this.Ads[e].id + ')">' + Main.NullToEmpty(this.Ads[e].name) + "</span></div></div>";
                var f;
                if (this.Ads[e].city.id == "-1") {
                    f = "All"
                } else {
                    if (this.Ads[e].city.id == "-2") {
                        f = "Default"
                    } else {
                        f = Main.NullToEmpty(this.Ads[e].city.name)
                    }
                }
                d += '<div class="adcity"><div class="cap"><span class="caption">' + f + "</span></div></div>";
                d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="Ads.Edit(' + this.Ads[e].id + ')">' + this.Ads[e].hits + "</span></div></div>";
                d += '<div class="enabled"><span class="caption"><div id="switch_' + this.Ads[e].id + '"></div></span></div>';
                d += "</div>"
            }
        }
        document.getElementById("ads").innerHTML = d;
        var h = false;
        Switch.Init();
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                Ads.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/ads.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
        Main.GetFranchisesData("Ads.Form()")
    },
    Edit: function (a) {
        var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValues();
            if (c.length == 1) {
                a = c[0];
                d = true
            }
        } if (d) {
            var b = this;
            Main.Loading();
            Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchAdData","id":"' + a + '"}]', "Ads.PreEdit")
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        Main.Franchises = a.franchises;
        this.Form(a.ad)
    },
    Form: function (e) {
        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "Ads.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "Ads.PrintMain()");
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
        }
        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.ad.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_ADS_CREATE_TITLE'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_ADS_EDIT_TITLE'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "name", e.name, true) + "</div></div>";
        var g = "";
        var b;
       
		//
        //g = "[" + b + '{"id":"1","caption":"Unique"},{"id":"0","caption":"Double"}]';
		g = '[{"id":"1","caption":"Unique"}]';
        g = JSON.parse(g);
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_TYPE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("ad", "type", g, e.type, false, "Ads.TypeChanged(this)", true) + "</div></div>";
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_TIME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "time", e.time, false,"", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_LINK'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "link", e.link,false) + "</div></div>";
        var f = new Array();
        f.push(JSON.parse('{"id":"","caption":""}'));
        f.push(JSON.parse('{"id":"-2","caption":"<?=$lang_resource['ALL_DROPDOUN_SELECT_DEFAULT']?>"}'));
        f.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['MOBILE_MENU_LIST_ALL'] ?>"}'));
        for (var d in Main.Franchises) {
            var h = new Object();
            h.id = Main.Franchises[d].id;
            h.caption = Main.Franchises[d].city;
            f.push(h)
        }
        var a = "";
        if (e.city) {
            a = e.city
        }
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_LINK'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("ad", "city", f, a, true) + "</div></div>";
        k += "</div>";
        k += '<div class="rightcol" style="width:227px;">';
        k += '<form id="uform" enctype="multipart/form-data" method="post" action="upload.php">';
        var c = "";
        if (e.id) {
			if(e.isimg == 1) {
				if (e.type == 1) {
					c = "background-image:url('admin/images/ads/" + Main.NullToEmpty(e.id) + "/full.jpg?c=" + new Date().getTime() + "');"
				} else {
					c = "background-image:url('admin/images/ads/" + Main.NullToEmpty(e.id) + "/full.jpg?c=" + new Date().getTime() + "');"
				}
			} else {
				if (e.type == 1) {
					c = "admin/images/dummy/splited.jpg";
				} else {
					c = "admin/images/dummy/dummy_adbig.jpg";
				}
				
				}
        }
        k += '<div><input type="file" name="file[]" style="' + c + '"/></div>';
        k += "</form>";
        k += "</div>";
        k += "</div>";
        k += "</div>";
        document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
        Forms.CreateValue("ad", "imgupload0", "", true);
        Uploader.Activate();
        Uploader.Init("ad", "uform", "mainbuttonok", true, Ads.ProfileImageUploadFinished, Ads.ProfileImageSelected, Ads.ProfileStartUpload);
        if (e.type == 1) {
           // $("#uform").find(".uploaderbox").removeClass("uploaderboxadfull").addClass("uploaderboxadsplited").find(".preview").removeClass("adfull").addClass("adsplited")
        }
        if (e.type != 0) {
           // document.getElementById("time").setAttribute("readonly", "readonly");
            Forms.Form.ad.fields.time.obligatory = false
        }
        $("#name").focus()
    },
    TypeChanged: function (a) {
        var b = document.getElementById("time");
        switch (a.options[a.selectedIndex].value) {
        case "0":
            $("#uform").find(".uploaderbox").removeClass("uploaderboxadsplited").addClass("uploaderboxadfull").find(".preview").removeClass("adsplited").addClass("adfull");
            b.removeAttribute("readonly");
            b.value = "";
            Forms.Form.ad.fields.time.value = "";
            Forms.Form.ad.fields.time.save = false;
            Forms.Form.ad.fields.time.obligatory = true;
            break;
        case "1":
            $("#uform").find(".uploaderbox").removeClass("uploaderboxadfull").addClass("uploaderboxadsplited").find(".preview").removeClass("adfull").addClass("adsplited");
            b.value = "";
            Forms.Form.ad.fields.time.value = "realnull";
            if (Forms.Form.ad.type == "modify") {
                Forms.Form.ad.fields.time.save = true
            } else {
                Forms.Form.ad.fields.time.save = false
            }
            Forms.Form.ad.fields.time.obligatory = false;
            b.setAttribute("readonly", "readonly");
            break
        }
        if (Forms.CanSave("ad")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageSelected: function (b, a) {
        Forms.UpdateValue("ad", "imgupload" + a, b, true);
        if (Forms.CanSave("ad")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (b) {
        Response = JSON.parse(b);
        if (Response.status == "no files selected") {
            Ads.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                Ads.Save(Response[0].name)
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
    Save: function (a) {
        if (Forms.CanSave("ad") == false) {
            return
        }
		Forms.UpdateValue("ad", "type", "1", false);
        Forms.PrepareForSaving("ad");
		
		
        if (a != null) {
            Forms.Form.ad.image = a
        }
        Main.Request("ads", null, "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), "Ads.Main()");
        Uploader.Clean();
        Forms.Clean("ad")
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("ads", null, "f=DeleteAd&data=" + JSON.stringify(a), "Ads.Main()")
    }
};
