var DiscountCode = {
    Main: function () {
        Main.Loading();
		
        var a = new Date().getTime();
        Main.Aid = a;
		
		$.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
			
		
			DiscountCode.restaurants = JSON.parse(b);
			//return false
			//alert(DiscountCode.restaurants.length)
			if(DiscountCode.restaurants.length == 0){
				alert("Sorry! No Business Available")
				Admin.HomeUrl()
				return;
			}
			
			})
			
        $.post("lib/discountcode.php", "f=FetchAllDiscountData", function (b) {
			
			
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.discount = new Object();
                 Main.Config.discount.List = new Object();
				 
                DiscountCode.discount = JSON.parse(b);
				DiscountCode.PrintMain()
				
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
		 
        b.push(Visuals.CreateSubMenuItem("DiscountCode.New()", "<?= $lang_resource['CONTROL_PANEL_DISCOUNT_ADD'] ?>"));
        b.push(Visuals.CreateSubMenuItem("DiscountCode.Edit()", "<?= $lang_resource['CONTROL_PANEL_DISCOUNT_EDIT'] ?>"));
        b.push(Visuals.CreateSubMenuItem("DiscountCode.Delete()", "<?= $lang_resource['CONTROL_PANEL_DISCOUNT_DELETE'] ?>"));
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DISCOUNT_TITLE'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="DiscountCode.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px; width: 180px;" onclick="DiscountCode.PupulateTable(\'zip\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN1'] ?> </span></div>';
        c += '<div class="hand" onclick="DiscountCode.PupulateTable(\'price\')" style="border-right: 2px solid #E4E4E4;float: left;height: 26px; width: 147px;"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN2'] ?></span></div>';
        c += '<div class="enabled  hand" onclick="DiscountCode.PupulateTable(\'description\')" sty ><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN3'] ?></span></div>';
        c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN4'] ?></span></div>';
		 c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN5'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
		
		
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
          DiscountCode.PupulateTable(Main.Config.discount.List.SortBy, true)
        };
        
		
		DiscountCode.PupulateTable(Main.Config.discount.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
		
        var d = "";
        var b = this.discount.length;
		
        if (c) {
            this.discount.sort(Main.SortByProperty(a));
            if (Main.Config.discount.List.SortByStatus == "max") {
                this.discount.reverse()
            }
        } else {
            if (Main.Config.discount.List.SortBy != a) {
                this.discount.sort(Main.SortByProperty(a));
                Main.Config.discount.List.SortByStatus = "min"
            } else {
                this.discount.reverse();
                if (Main.Config.discount.List.SortByStatus == "min") {
                    Main.Config.discount.List.SortByStatus = "max"
                } else {
                    Main.Config.discount.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.discount.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
		//alert(this.Discount);
		//return 
		
        for (var e in this.discount) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.discount[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.discount[e])
           }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="DiscountCode.Edit(' + this.discount[e].id + ')">' + this.discount[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.discount[e].id + '"/></div>';
                d += '<div style=" border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 180px;"><div class="cap"><span class="caption hand" onclick="DiscountCode.Edit(' + this.discount[e].id + ')">'
				 + Main.NullToEmpty(this.discount[e].code).toUpperCase() +"</span></div></div>";
              
                d += '<div style="border-right: 2px solid #E4E4E4;float: left; height: 26px;width: 147px;"><div class="cap"><span class="caption">' +   Main.NullToEmpty(this.discount[e].expirydate) + "</span></div></div>";
              <!--  d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="Discount.Edit(' + this.Discount[e].id + ')">&pound;' + this.Discount[e].description + "</span></div></div>";-->
			   d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 64px;"><span class="caption">' +   Main.NullToEmpty(this.discount[e].hits) + "</span></div>";
			   d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 64px;"><span class="caption">' +   Main.NullToEmpty(this.discount[e].maxallow) + "</span></div>";
			   d += '<div class="enabled"><span class="caption"><div id="switch_' + this.discount[e].id + '"></div></span></div>';
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
                DiscountCode.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/discountcode.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
       
		$.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
			
			
			DiscountCode.restaurants = JSON.parse(b);
			//return false
			
			
			})
			
			 Main.GetFranchisesData("DiscountCode.Form()")
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
           // Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDiscountData","id":"' + a + '"}]', "DiscountCode.PreEdit")
		     $.post("lib/discountcode.php", "f=FetchDiscountData&id=" + a, function (b) {
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				DiscountCode.PreEdit(b);
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
		   if(a.payby==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(a.payby==2)
			{
			   document.getElementById("idprice").style.display="";
			}
    },
    Form: function (e) {
		
		//alert(JSON.stringify(e))
		
		 MultipleInput.AddListener("tagschange", "DiscountCode.MultiInputTagsChange");
		
		
        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "DiscountCode.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "DiscountCode.PrintMain()");
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
        }
		 Forms.Form.ad.ad = e;
        this.ActiveForm = "ad";
		
        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.ad.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DISCOUNT_ADD'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DISCOUNT_EDIT'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';
		if(Forms.Form.ad.type =="create" )
		{
        k += '<div class="row"><span class="caption">Discount Code </span><div class="inputbox">' + Forms.CreateInputPropertydisreadonly("ad", "code",randomString(10), true, "", false, false, "return DiscountCode.IsNumberKeyFour(this.value,event)") + "</div></div>";
		}
		if(Forms.Form.ad.type =="modify" )
		{
			 k += '<div class="row"><span class="caption">Discount Code </span><div class="inputbox">' + Forms.CreateInputPropertydisreadonly("ad", "code",e.code, true, "", false, false, "return DiscountCode.IsNumberKeyFour(this.value,event)") + "</div></div>";
		}
		 
        var g = "";
        var b;
        if (Forms.Form.ad.type == "modify") {
			
			/*if(e.payby==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(e.payby==2)
			{
			   document.getElementById("idprice").style.display="";
			}*/
			 b = "";
        } else {
            b = '{"id":"-1","caption":""},'
        }
        g = "[" + b + '{"id":"1","caption":"Percentage"},{"id":"2","caption":"Price"}]';
        g = JSON.parse(g);
    
	  
	    //k += '<div class="row"><span class="caption" style="width:70px">Expiry Date</span><div class="inputbox">'+ Forms.CreateInputPropertydis("ad", "dd","", true, "", false, false, "return Main.IsNumberKey(event)",false,60,2) +'&nbsp;&nbsp;'+ Forms.CreateInputPropertydis("ad", "mm","", true, "", false, false, "return Main.IsNumberKey(event)",false,60,2) +'&nbsp;&nbsp;'+ Forms.CreateInputPropertydis("ad", "yyyy","", true, "", false, false, "return Main.IsNumberKey(event)",true,100,4) + "</div></div>";$lang_resource['CONTROL_PANEL_DISCOUNT_VALID UPTO']
		 k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_VALID_UPTO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "validdays", Main.NullToEmpty(e.validdays), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		
		 k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_MAXLIMIT']?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "maxallow", Main.NullToEmpty(e.maxallow), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		 
		  k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_MIN_PURCHASE']?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "minshop", Main.NullToEmpty(e.minshop), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		 
		 	// k += '<div class="row"><span class="caption">Business</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "business", Main.NullToEmpty(e.price), false, "", false, false) + "</div></div>";
			
			   k += '<div class="row" ><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_TYPE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("ad", "payby", g, e.payby, true, "DiscountCode.TypeChanged(this.value)", true) + "</div></div>";
		
		
		 if (Forms.Form.ad.type == "modify") {	   
         if(e.payby==1)
		 {
			 var per_percent = e.commonrate;
	     }
		 k += '<div class="row" style="display: none" id="idpercent"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE']?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "commonratetype1", Main.NullToEmpty(per_percent), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span style="color: #B10606;font-size: 10px;">*</span></div>';
		if(e.payby==2)
		 {
			 var per_price = e.commonrate;
	     }
		 
		 	 k += '<div class="row" style="display: none" id="idprice"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE']?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "commonratetype2", Main.NullToEmpty(per_price), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span style="color: #B10606;font-size: 10px;">*</span></div>';
		 }
		 else
		 {
			  k += '<div class="row" style="display: none" id="idpercent"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE']?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "commonrate","", true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
			  
			  k += '<div class="row" style="display: none" id="idprice"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE']?></span><div class="inputbox">' + Forms.CreateInputProperty("ad", "commonrate", "", true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
			 
			 
		  }
		  Forms.CreateValue("ad", "business",Main.NullToEmpty(e.business));
         k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] ?></span><div class="multiinputbox" style="margin-left:90px;"><span class="obligatory nonselectable"></span><input type="text" id="business" style="width:245px;height:60px;"/></div></div>';
        
        k += "</div>";
		 k += "</div>";
        k += "</div>";
		
		//
		
		 document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
		
		 MultipleInput.Init("business",DiscountCode.restaurants, true);
		 
		  if (Forms.Form.ad.type == "modify") {
				if (Forms.Form.ad.ad.business != "") {
					var d = JSON.parse(Forms.Form.ad.ad.business);
					for (var e in d) {
						MultipleInput.AddTagById("business", d[e])
					}
					Forms.Form.ad.fields.business.save = false
				}
		   }
		 
		  
       
        $("#name").focus()
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
            Discount.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                Discount.Save(Response[0].name)
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
        /*if (Forms.CanSave("ad") == false) {
            return
        }
        Forms.PrepareForSaving("ad");
		
        if (a != null) {
            Forms.Form.ad.image = a
        }*/
		
     //   Main.Request("ads", null, "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), "Discount.Main()");
	 /*alert(JSON.stringify(Forms.Form.ad));
	 return false;*/
	
	    Main.Request("discountcode", null, "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.ad), "DiscountCode.Main()");
	    /*var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
		
	   $.post("panel/lib/discountcode.php", "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.ad), function (f)
        {
			alert(f);
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return;
            }
			
		  });	*/
		
			
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
		/*alert(JSON.stringify(a));
		return false;*/
        Main.Request("discountcode", null, "f=DeleteAd&data=" + JSON.stringify(a), "DiscountCode.Main()")
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
