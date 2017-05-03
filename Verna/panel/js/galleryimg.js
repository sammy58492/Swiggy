var GalleryImg = {
    Main: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/galleryimg.php", "f=FetchAllAdsData", function (b) {
			//alert(b);
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                GalleryImg.GalleryImg = JSON.parse(b);
				
				Main.Config.GalleryImg = new Object();
                Main.Config.GalleryImg.List = new Object();
                Main.Config.GalleryImg.List.SortBy = "id";
                Main.Config.GalleryImg.List.SortByStatus = "min";
				
					$.post("lib/galleryimg.php", "f=FetchAllRestData", function (b) {
			
			
			GalleryImg.restaurants = JSON.parse(b);
			 GalleryImg.PrintMain()
			
			
			})
				//alert(GalleryImg.GalleryImg)
               
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
        b.push(Visuals.CreateSubMenuItem("GalleryImg.New()", "<?= $lang_resource['CONTROL_PANEL_GALLERY_BUTTON_CREATE'] ?>"));
        b.push(Visuals.CreateSubMenuItem("GalleryImg.Edit()", "<?= $lang_resource['CONTROL_PANEL_GALLERY_BUTTON_EDIT'] ?>"));
        b.push(Visuals.CreateSubMenuItem("GalleryImg.Delete()", "<?= $lang_resource['CONTROL_PANEL_GALLERY_BUTTON_DELETE'] ?>"));
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; GALLERY</span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="GalleryImg.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="adname hand" onclick="GalleryImg.PupulateTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_NAME_HEADER'] ?></span></div>';
       // c += '<div class="adcity default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CITY_HEADER'] ?></span></div>';
       c += '<div class="adhits hand" style=" width:180px;" onclick="GalleryImg.PupulateTable(\'type\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_GALLERY_TYPE_HEADER'] ?></span></div>';
        c += '<div class="enabled default" style=" width:135px;" ><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
            GalleryImg.PupulateTable(Main.Config.GalleryImg.List.SortBy, true)
        };
       GalleryImg.PupulateTable(Main.Config.GalleryImg.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
		//alert(a);
		//alert(c);
        var d = "";
        var b = this.GalleryImg.length;
        if (c) {
            this.GalleryImg.sort(Main.SortByProperty(a));
            if (Main.Config.GalleryImg.List.SortByStatus == "max") {
                this.GalleryImg.reverse()
            }
        } else {
            if (Main.Config.GalleryImg.List.SortBy != a) {
                this.GalleryImg.sort(Main.SortByProperty(a));
                Main.Config.GalleryImg.List.SortByStatus = "min"
            } else {
                this.GalleryImg.reverse();
                if (Main.Config.GalleryImg.List.SortByStatus == "min") {
                    Main.Config.GalleryImg.List.SortByStatus = "max"
                } else {
                    Main.Config.GalleryImg.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.GalleryImg.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
		
        for (var e in this.GalleryImg) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.GalleryImg[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.GalleryImg[e].name).toLowerCase().indexOf(g) >= 0 ) {
                j = true;
                l.push(this.GalleryImg[e])
            }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
				//alert(this.GalleryImg[e].type)
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="GalleryImg.Edit(' + this.GalleryImg[e].id + ')">' + this.GalleryImg[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.GalleryImg[e].id + '"/></div>';
                d += '<div class="adname"><div class="cap"><span class="caption hand" onclick="GalleryImg.Edit(' + this.GalleryImg[e].id + ')">' + Main.NullToEmpty(this.GalleryImg[e].name) + "</span></div></div>";
               /* var f;
                if (this.GalleryImg[e].city.id == "-1") {
                    f = "All"
                } else {
                    if (this.Ads[e].city.id == "-2") {
                        f = "Default"
                    } else {
                        f = Main.NullToEmpty(this.Ads[e].city.name)
                    }
                }*/
				d += '<div class="adcity"><div class="cap"><span class="caption">';
				if(Main.NullToEmpty(this.GalleryImg[e].type)=="0"){
					d +='Image';
				}
				else if(Main.NullToEmpty(this.GalleryImg[e].type)=="1"){
					d +='Video';
				}
				else if(Main.NullToEmpty(this.GalleryImg[e].type)=="2"){
					d +='Header';
				}
				d += '</span></div></div>';
               // d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="GalleryImg.Edit(' + this.GalleryImg[e].id + ')">' + this.GalleryImg[e].hits + "</span></div></div>";
                d += '<div class="enabled"><span class="caption"><div id="switch_' + this.GalleryImg[e].id + '"></div></span></div>';
                d += "</div>"
            }
        }
		//alert(d);
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
                GalleryImg.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/galleryimg.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
        Main.GetFranchisesData("GalleryImg.Form()")
    },
    Edit: function (a) {
		//alert(a)
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
            Main.BulkRequest('data=[{"operation":"FetchEdData","id":"' + a + '"}]', "GalleryImg.PreEdit")
		    
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error")
        }
		
        a = JSON.parse(a);
      //  Main.Franchises = a.franchises;
        this.Form(a.ed)
    },
    Form: function (e) {
        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "GalleryImg.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "GalleryImg.PrintMain()");
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
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_GALLERY_BUTTON_CREATE'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_GALLERY_BUTTON_EDIT'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "name", e.name, true) + "</div></div>";
        var g = "";
        var b;
        if (Forms.Form.ad.type == "modify") {
            b = ""
        } else {
            b = '{"id":"","caption":""},'
        }
        g = "[" + b + '{"id":"1","caption":"Video"},{"id":"0","caption":"Image"},{"id":"2","caption":"Header"}]';
        g = JSON.parse(g);
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_TYPE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("ad", "type", g, e.type, true, "", true) + "</div></div>";
       // k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_TIME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "time", e.time, true) + "</div></div>";
        k += '<div class="row"><span class="caption" style="width: 112px !important;"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_EMBED'] ?></span><div class="inputbox">' + Forms.CreateTextAreaPropertyGallery("ad", "link", e.link) + "</div></div>";
		////////////////////////////////////////
		
        
		////////////////////////////////////////
		k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_GALLERY_BUSINESS'] ?></span><div class="inputbox">' +Forms.CreateSelectProperty("ad", "business", GalleryImg.restaurants, e.business, true, "", true)+ "</div></div>";
		/* var f = new Array();
        f.push(JSON.parse('{"id":"","caption":""}'));
        f.push(JSON.parse('{"id":"-2","caption":"Default"}'));
        f.push(JSON.parse('{"id":"-1","caption":"All"}'));*/
        /*for (var d in Main.Franchises) {
            var h = new Object();
            h.id = Main.Franchises[d].id;
            h.caption = Main.Franchises[d].city;
            f.push(h)
        }*/
        /*var a = "";
        if (e.city) {
            a = e.city
        }*/
       // k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_LINK'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("ad", "city", f, a, true) + "</div></div>";
        k += "</div>";
		//alert(JSON.stringify(GalleryImg.restaurants))
        k += '<div class="rightcol" style="width:227px;">';
        k += '<form id="uform" enctype="multipart/form-data" method="post" action="upload.php">';
        var c = "";
        if (e.id) {
            if (e.type == 1) {
                c = "background-image:url('images/gallery/" + Main.NullToEmpty(e.id) + "/splited.jpg?c=" + new Date().getTime() + "');"
            } else {
                c = "background-image:url('images/gallery/" + Main.NullToEmpty(e.id) + "/full.jpg?c=" + new Date().getTime() + "');"
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
        Uploader.Init("ad", "uform", "mainbuttonok", true, GalleryImg.ProfileImageUploadFinished, GalleryImg.ProfileImageSelected, GalleryImg.ProfileStartUpload);
	
       /* if (e.type == 1) {
            $("#uform").find(".uploaderbox").removeClass("uploaderboxadfull").addClass("uploaderboxadsplited").find(".preview").removeClass("adfull").addClass("adsplited")
        }
        if (e.type != 0) {
            document.getElementById("time").setAttribute("readonly", "readonly");
            Forms.Form.ad.fields.time.obligatory = false
        }*/
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
            GalleryImg.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                GalleryImg.Save(Response[0].name)
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
		//alert(JSON.stringify(Forms.Form.ad));
        if (Forms.CanSave("ad") == false) {
            return
        }
		var link1 = Forms.Form.ad.fields.link.value;
		//alert(JSON.stringify(Forms.Form.ad));
		if(link1 != ""){
		
		Forms.Form.ad.fields.link.value = "";
		link1 = link1.split("&");
		}
		delete Forms.Form.ad.fields.link;
		Forms.Form.ad.fields.name.save =true;
        Forms.PrepareForSaving("ad");
        if (a != null) {
            Forms.Form.ad.image = a
        }
		
        Main.Request("galleryimg", null, "f=SaveAd&data="+JSON.stringify(Forms.Form.ad)+"&link="+link1, "GalleryImg.Main()");
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
        Main.Request("galleryimg", null, "f=DeleteAd&data=" + JSON.stringify(a), "GalleryImg.Main()")
    }
};
