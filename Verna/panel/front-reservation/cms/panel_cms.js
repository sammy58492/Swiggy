var FooterPagesCms = {
    Main: function () {
        Main.Loading();
		
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/footerpages_cms.php", "f=FetchAllFooterData", function (b) {
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.footer = new Object();
                 Main.Config.footer.List = new Object();
				 
                FooterPagesCms.footer = JSON.parse(b);
				FooterPagesCms.PrintMain()
				
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
		if(Main.User.level == 0)
		{
        b.push(Visuals.CreateSubMenuItem("FooterPagesCms.New()", "<?= $lang_resource['CONTROL_PANEL_FOOTER_CMS_CREATE'] ?>"));
		}
        b.push(Visuals.CreateSubMenuItem("FooterPagesCms.Edit()", "<?= $lang_resource['CONTROL_PANEL_FOOTER_CMS_EDIT'] ?>"));
		if(Main.User.level == 0)
		{
        b.push(Visuals.CreateSubMenuItem("FooterPagesCms.Delete()", "<?= $lang_resource['CONTROL_PANEL_FOOTER_CMS_DELETE'] ?>"));
		}
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_FOOTER_PAGES_TITLE'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="FooterPagesCms.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 153px;" onclick="FooterPagesCms.PupulateTable(\'zip\')"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING1']?></span></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 173px;" onclick="FooterPagesCms.PupulateTable(\'price\')"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING2']?></span></div>';
		c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 101px;" onclick="FooterPagesCms.PupulateTable(\'price\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FOOTER_HEADER4'] ?></span></div>';
        
		 c += '<div class="enabled default" style="width:97px;"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FOOTER_HEADER3'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
		//alert()
		
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
			
			
          FooterPagesCms.PupulateTable(Main.Config.footer.List.SortBy, true)
        };
        
		
		FooterPagesCms.PupulateTable(Main.Config.footer.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
		
	
        var d = "";
        var b = this.footer.length;
		
        if (c) {
            this.footer.sort(Main.SortByProperty(a));
            if (Main.Config.footer.List.SortByStatus == "max") {
                this.footer.reverse()
            }
        } else {
            if (Main.Config.footer.List.SortBy != a) {
                this.footer.sort(Main.SortByProperty(a));
                Main.Config.footer.List.SortByStatus = "min"
            } else {
                this.footer.reverse();
                if (Main.Config.footer.List.SortByStatus == "min") {
                    Main.Config.footer.List.SortByStatus = "max"
                } else {
                    Main.Config.footer.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.footer.List.SortBy = a;
        /*if (!c) {
            Main.SaveConfig()
        }*/
        var j = false;
        var g = "";
        var l = new Array();
		var sdate = ""; 
		var edate = "";
		
		//alert(this.footer);
		//return 
		
        for (var e in this.footer) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.footer[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.footer[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.footer[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.footer[e])
           }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="FooterPagesCms.Edit(' + this.footer[e].id + ')">' + this.footer[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.footer[e].id + '"/></div>';
                d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 153px;"><div class="cap"><span class="caption hand" onclick="FooterPagesCms.Edit(' + this.footer[e].id + ')">'
				 + Main.NullToEmpty(this.footer[e].pagetitle).toUpperCase() +"</span></div></div>";
              
                d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 173px;"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.footer[e].pageheading).toUpperCase() +'</span></div></div>';
				
               d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 101px;"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.footer[e].type).toUpperCase() +'</span></div></div>';
			  
			  
			   d += '<div class="enabled"><span class="caption"><div id="switch_' + this.footer[e].id + '"></div></span></div>';
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
                FooterPagesCms.SetEnabled(m.replace("switch_", ""), i)
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
		
        $.post("lib/footerpages_cms.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                //Switch.SwitchTo("switch_" + b, !a)
				FooterPagesCms.Main();
				
            }
        })
    },
    New: function () {
        Main.GetFranchisesData("FooterPagesCms.Form()")
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
            Main.Loading();
		
			var gk = new Date().getTime();
			Main.Aid = gk;
		  
		     $.post("lib/footerpages_cms.php", "f=FetchFooterData&id=" + a, function (b) {
				 
				
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				FooterPagesCms.PreEdit(b);
				//alert(b);
			 })
        }
    },
    PreEdit: function (a) {
		//alert(a);
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
		 
		//alert(JSON.stringify(a));
        //Main.Franchises = a.franchises;
        this.Form(a)
		 
    },
    Form: function (e) {
        var j = "";
        var k = "";
		
		 MultipleInput.AddListener("tagschange", "FooterPagesCms.MultiInputTagsChange");
		 
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "FooterPagesCms.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "FooterPagesCms.PrintMain()");
        Forms.Clean("off", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.off.type = "create"
			
        } else {
            Forms.Form.off.type = "modify";
            Forms.Form.off.id = e.id
        }
		 // Forms.Form.off = e;
         this.ActiveForm = "off";
        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.off.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_FOOTER_PAGES_CREATE'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_FOOTER_PAGES_EDIT'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';	
		 
		   var g = "";
        var b;
        if (Forms.Form.off.type == "modify") {
            b = ""
        } else {
            b = '{"id":"-1","caption":""},'
        }
        g = "[" + b + '{"id":"Panel1","caption":"Panel1"},{"id":"Panel2","caption":"Panel2"},{"id":"Panel3","caption":"Panel3"}]';
        g = JSON.parse(g);
        k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_FOOTER_PAGES_PANEL'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("off", "type", g, e.type, true,false, true) + "</div></div>";
		   
		   
		   
		   k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING1']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "pagetitle", Main.NullToEmpty(e.pagetitle), true, "", false, false,"FooterPagesCms.validate('"+ e.pagetitle +"')") + "</div></div>"; 
		  
		   k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING0']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "customurl", Main.NullToEmpty(e.customurl), false,"FooterPagesCms.validate('"+ e.customurl +"')", false, false) + "</div></div>"; 
		  
		  k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING2'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "pageheading", Main.NullToEmpty(e.pageheading), true, "", false, false) + "</div></div>"; 
		  
		   k += '<div class="row" style="width: 690px !important;"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING3'] ?></span><div class="inputbox">' + Forms.CreateTextAreaPropertyCMS("off", "pagecontent", Main.NullToEmpty(e.pagecontent), true, "", false) + "</div></div>";
		   
		   
		   
		   k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING4'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "metakeyword", Main.NullToEmpty(e.metakeyword), true, "", false, false) + "</div></div>"; 
		   
		    k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING5'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "metacontent", Main.NullToEmpty(e.metacontent), true, "", false, false) + "</div></div>"; 
		  
		  
		  
			 
			k += ' </div>'; 
			 
		/*disabled="disabled"*/
        
        k += "</div>";
		 k += "</div>";
        k += "</div>";
		 document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
		
		
		
		CKEDITOR.replace( 'pagecontent',
			{
				filebrowserUploadUrl: "upload/upload.php"
			});
		CKEDITOR.instances['pagecontent'].on('change', function() { 
		
		Forms.CheckTextInputCMS(Main.Quote("off"),document.getElementById("pagecontent")); });
		
		 if (Forms.Form.off.type == "create") {
		$.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
			
			
			//DiscountOffer.restaurants = ;
			 MultipleInput.Init("offerbusiness",JSON.parse(b), true); ///NASIM EDITED
			//return false
			
			
			})
			
			 if (Forms.Form.ad.type == "modify") {
				if (Forms.Form.ad.ad.business != "") {
					var d = JSON.parse(Forms.Form.ad.ad.business);
					for (var e in d) {
						MultipleInput.AddTagById("business", d[e])
					}
					Forms.Form.ad.fields.business.save = false
				}
		   }
			//alert(JSON.stringify(DiscountOffer.restaurants));
		
		 }
      
	   
	   $("#name").focus()
    },
	validate: function(e){
		
		
		var cnt = 0;
		var curl = document.getElementById("customurl").value;
		var ptitle = document.getElementById("pagetitle").value;
		if (/^[a-zA-Z0-9-]*$/.test(curl) == false ) {
			cnt ++;
  			alert("please do not enter any special characters or spaces on customurl field")
			
			if (Forms.Form.off.type == "modify") 
			document.getElementById("customurl").value = Main.NullToEmpty(e)+"";
			else
			document.getElementById("customurl").value ="";
			return false
			
 		}
		if (/^[a-zA-Z0-9- ]*$/.test(ptitle) == false ) {
			cnt ++;
  			alert("please do not enter any special characters or spaces on pagetitle field ")
			
			if (Forms.Form.off.type == "modify")
			document.getElementById("pagetitle").value = Main.NullToEmpty(e)+"";
			else
			document.getElementById("pagetitle").value ="";
			
			return false
 		}
		
		
		
		/*if(event.altKey==1)
		 {
			 cnt ++;
		  alert("The ALT key was pressed!");
		  
		 }*/
		 
		 if(cnt == 0)
		 return true
		 else 
		 return false
	},
	
	
	IsNumberKeyFour: function (b,c) {
      
	    var a = c.keyCode;
		
		//alert(a);
      
	    if (a == 8 || a == 46) {
            return true
        }
		else if(b.length>5)
		{
			  return false
		}
		 return true
		 //alert(b);
		
    },
	IsNumberKeytwo: function (b,c) {
      
	     var a = c.keyCode;
		 
		if (a == 8 || a == 46) {
            return true
        }
		
		 return true
		 //alert(b);
		
    },
    TypeChanged: function (a) {
		//alert(JSON.stringify(a));
        if(a == 1)
		{
			document.getElementById("idpercent").style.display = "";
			document.getElementById("idprice").style.display = "none";
		}
		else if(a == 2)
		{
			document.getElementById("idpercent").style.display = "none";
			document.getElementById("idprice").style.display = "";
		}
		else
		{
			document.getElementById("idpercent").style.display = "none";
			document.getElementById("idprice").style.display = "none";
			
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
            FooterPagesCms.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                FooterPagesCms.Save(Response[0].name)
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
    Save: function () {
   
	
	
	var data = CKEDITOR.instances.pagecontent.getData();
	
	
	Forms.Form.off.fields.pagecontent.value =  data;
	
	delete Forms.Form.off.pagecontent;
	
	if(Forms.Form.off.fields.customurl.value == ''){
	
	Forms.Form.off.fields.customurl.value = Forms.Form.off.fields.pagetitle.value.replace(/\s/g, '-');
	Forms.Form.off.fields.customurl.value = Forms.Form.off.fields.customurl.value.toLowerCase()
	}
	 
	/*if(/^[a-zA-Z0-9-]*$/.test(Forms.Form.off.fields.customurl.value) == false){
		alert("please do not enter any special characters or spaces")	
		return false
	}*/
	//Forms.Form.off.fields.pagecontent.value=Forms.Form.off.fields.pagecontent.value.split("&").join("@@@");
	
	Forms.Form.off.pagecontent = Forms.Form.off.fields.pagecontent.value.split("&").join("@@@");
	delete Forms.Form.off.fields.pagecontent;
	

	 
	$.post("lib/footerpages_cms.php", "f=CheckCustomUrl&data=" + JSON.stringify(Forms.Form.off), function (d) {
		//alert(d)
		 if(d != 'ok')
		return false
	 });
	//alert(JSON.stringify(Forms.Form.off))
	 $.post("lib/footerpages_cms.php", "f=SaveFooter&data=" + JSON.stringify(Forms.Form.off), function (b) {
		
		 FooterPagesCms.Main()
	 });
 
		
			
        Uploader.Clean();
        Forms.Clean("off")
	
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
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
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
		$.post("lib/footerpages_cms.php", "f=DeleteAd&data=" + JSON.stringify(a), function (c) {
		 
		 FooterPagesCms.Main()
	 });
      
    }
};

function randomString (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
		}
