var LogoImage = {
    Main: function () {
        Main.Loading();
		
		
        var a = new Date().getTime();
        Main.Aid = a;
       LogoImage.New();
    },
    PrintMain: function () {
		
	
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var c = "";
        b.push(Visuals.CreateSubMenuItem("LogoImage.New()", "Create Driver"));
        b.push(Visuals.CreateSubMenuItem("LogoImage.Edit()", "Edit Driver"));
        b.push(Visuals.CreateSubMenuItem("LogoImage.Delete()", "Delete Driver"));
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; DRIVER LIST</span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="LogoImage.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="adname hand" onclick="LogoImage.PupulateTable(\'name\')"><span class="caption">Name</span></div>';
        c += '<div class="adcity hand" onclick="LogoImage.PupulateTable(\'phonenumber\')"><span class="caption">Phone Number</span></div>';
        c += '<div class="adhits hand" onclick="LogoImage.PupulateTable(\'description\')" ><span class="caption">Address</span></div>';
        c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ADS_ENABLE_HEADER'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
		
		
        document.getElementById("main").innerHTML = c;
	
		//alert(a);
        document.getElementById("search").onkeyup = function () {
          LogoImage.PupulateTable(Main.Config.LogoImage.List.SortBy, true)
        };
        
		LogoImage.PupulateTable(Main.Config.LogoImage.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
		
		//alert("ok");
        var d = "";
        var b = this.LogoImage.length;
        if (c) {
            this.LogoImage.sort(Main.SortByProperty(a));
            if (Main.Config.LogoImage.List.SortByStatus == "max") {
                this.LogoImage.reverse()
            }
        } else {
            if (Main.Config.LogoImage.List.SortBy != a) {
                this.LogoImage.sort(Main.SortByProperty(a));
                Main.Config.LogoImage.List.SortByStatus = "min"
            } else {
                this.LogoImage.reverse();
                if (Main.Config.LogoImage.List.SortByStatus == "min") {
                    Main.Config.LogoImage.List.SortByStatus = "max"
                } else {
                    Main.Config.LogoImage.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.LogoImage.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
		//alert(this.FrontImage);
		//return 
		
        for (var e in this.LogoImage) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.LogoImage[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.LogoImage[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.LogoImage[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.LogoImage[e])
            }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="LogoImage.Edit(' + this.LogoImage[e].id + ')">' + this.LogoImage[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.LogoImage[e].id + '"/></div>';
                d += '<div class="adname"><div class="cap"><span class="caption hand" onclick="LogoImage.Edit(' + this.LogoImage[e].id + ')">'
				 + Main.NullToEmpty(this.LogoImage[e].name) + " " + this.LogoImage[e].lastname +"</span></div></div>";
               
                d += '<div class="adcity"><div class="cap"><span class="caption">' + this.LogoImage[e].phonenumber + "</span></div></div>";
                d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="LogoImage.Edit(' + this.LogoImage[e].id + ')">' + this.LogoImage[e].description + "</span></div></div>";
                d += '<div class="enabled"><span class="caption"><div id="switch_' + this.LogoImage[e].id + '"></div></span></div>';
                d += "</div>"
            }
        }
	
        document.getElementById("logoImage").innerHTML = d;
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
                LogoImage.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/logoImage.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
        Main.GetFranchisesData("LogoImage.Form()")
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
            Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDriverData","id":"' + a + '"}]', "LogoImage.PreEdit")
        }
    },
    PreEdit: function (a) {
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
		//alert(JSON.stringify(a));
        Main.Franchises = a.franchises;
        this.Form(a.ad)
    },
    Form: function (e) {
        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "LogoImage.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "SuperAdmin.Home()");
		document.getElementById("totalOrderBox").style.display ="none";
        Forms.Clean("ad", "mainbuttonok");
		 //Forms.Clean("as", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
        }
        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        //if (Forms.Form.ad.type == "create") {
        k += '<span class="title">&gt;&gt; <?= $lang_resource['UPLOADLOGO_V21'] ?> </span>'
       
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';
        //k += '<div class="row"><span class="caption">First Name</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "name", e.name, true) + "</div></div>";
        var g = "";
        var b;
        if (Forms.Form.ad.type == "modify") {
            b = ""
        } else {
            b = '{"id":"-1","caption":""},'
        }
        g = "[" + b + '{"id":"1","caption":"Unique"},{"id":"0","caption":"Double"}]';
        g = JSON.parse(g);
      
        k += '<div class="rightcol" style="width:227px;">';
        k += '<form id="uform" enctype="multipart/form-data" method="post" action="upload.php">';
        var c = "";
		k += '<div style=" width:600px; height:800px; overflow-x:none; overflow-y:scroll;">';
		
		c = "background-image:url('images/logo/1/splited.jpg?c=" + new Date().getTime() + "');"
        k += '<div><div style="width:100px; float:left;"><h4><?= $lang_resource['TOPLOGO_V21'] ?></h4></div><div class="xyz"><input type="file" name="file[]" style="' + c + '"/></div></div>';
		
		c = "background-image:url('images/logo/2/splited.jpg?c=" + new Date().getTime() + "');"
        k += '<div><div style="width:100px; float:left;"><h4><?= $lang_resource['PANELTOPLOGO_V21'] ?></h4></div><div class="xyz"><input type="file" name="file[]" style="' + c + '"/></div></div>';
		
		c = "background-image:url('images/logo/3/splited.jpg?c=" + new Date().getTime() + "');"
        k += '<div><div style="width:100px; float:left;"><h4><?= $lang_resource['BOTTOMLOGO_V21'] ?></h4></div><div class="xyz"><input type="file" name="file[]" style="' + c + '"/></div></div>';
		
		/*c = "background-image:url('images/logo/3/splited.jpg?c=" + new Date().getTime() + "');"
        k += '<div><div style="width:100px; float:left;"><h4>PANEL LOGO</h4></div><div class="xyz"><input type="file" name="file[]" style="' + c + '"/></div></div>';*/
		
		
		//c = "background-image:url('images/banner/5/normal.jpg?c=" + new Date().getTime() + "');"
      //  k += '<div><div style="width:100px; float:left;"><h4>Step 5</h4></div><input type="file" name="file[]" style="' + c + '"/></div>';
		Forms.CreateValue("ad", "imgupload0", "", true);
        Forms.CreateValue("ad", "imgupload1", "", true);
        Forms.CreateValue("ad", "imgupload2", "", true);
		Forms.CreateValue("ad", "imgupload3", "", true);
        //Forms.CreateValue("ad", "imgupload4", "", true);		
		k += '</div>';
        k += "</form>";
        k += "</div>";
        k += "</div>";
        k += "</div>";
        document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
        Forms.CreateValue("ad", "imgupload0", "", true);
        Uploader.Activate();
        Uploader.Init("ad", "uform", "mainbuttonok", true, LogoImage.ProfileImageUploadFinished, LogoImage.ProfileImageSelected, LogoImage.ProfileStartUpload);
        if (e.type == 1) {
            $("#uform").find(".uploaderbox").removeClass("uploaderboxadfull").addClass("uploaderboxadsplited").find(".preview").removeClass("adfull").addClass("adsplited")
        }
        if (e.type != 0) {
            document.getElementById("time").setAttribute("readonly", "readonly");
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
            LogoImage.Save()
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
                LogoImage.Save(g)
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
        Forms.PrepareForSaving("ad");
		/*
        if (a != null) {
            Forms.Form.ad.image = a
        }*/
		if (a) {
            if (a[0] != null) {
                Forms.Form.ad.image1 = a[0]
            }
            if (a[1] != null) {
                Forms.Form.ad.image2 = a[1]
            }
            if (a[2] != null) {
                Forms.Form.ad.image3 = a[2]
            }
			if (a[3] != null) {
                Forms.Form.ad.image4 = a[3]
            }
            if (a[4] != null) {
                Forms.Form.ad.image5 = a[4]
            }
        }

		  $.post("lib/logoImage.php", "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), function (f)
        {
			
            Main.Ready(true);
          /*  if (b != Main.Aid)
            {
                return;
            }*/
			LogoImage.Main();
			  Uploader.Clean();
        Forms.Clean("ad")
			
		  });	
		//Main.Request("ads", null, "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), "Ads.Main()");
		
			
      
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
		/*alert(JSON.stringify(a));
		return false;*/
        Main.Request("LogoImage", null, "f=DeleteAd&data=" + JSON.stringify(a), "FrontImage.Main()")
    }
};

