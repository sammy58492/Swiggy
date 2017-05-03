var DiscountOffer = {
    Main: function () {
        Main.Loading();
		
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/discountoffer.php", "f=FetchAllDiscountData", function (b) {
			
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.discount = new Object();
                 Main.Config.discount.List = new Object();
				 
                DiscountOffer.discount = JSON.parse(b);
				DiscountOffer.PrintMain()
				
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
        b.push(Visuals.CreateSubMenuItem("DiscountOffer.New()", "<?= $lang_resource['CONTROL_PANEL_DISCOUNT_ADD_OFFER'] ?>"));
		}
        b.push(Visuals.CreateSubMenuItem("DiscountOffer.Edit()", "<?= $lang_resource['CONTROL_PANEL_DISCOUNT_EDIT_OFFER'] ?>"));
		if(Main.User.level == 0)
		{
        b.push(Visuals.CreateSubMenuItem("DiscountOffer.Delete()", "<?= $lang_resource['CONTROL_PANEL_DISCOUNT_DELETE_OFFER'] ?>"));
		}
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_TITLE'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="DiscountOffer.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 130px;" onclick="DiscountOffer.PupulateTable(\'zip\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN1'] ?> </span></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 125px;" onclick="DiscountOffer.PupulateTable(\'price\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN2'] ?></span></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 100px;" onclick="DiscountOffer.PupulateTable(\'description\')" sty ><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN3'] ?></span></div>';
        c += '<div class="default" style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 100px;"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN4'] ?></span></div>';
		 c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN5'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
		//alert()
		
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
			
			
          DiscountOffer.PupulateTable(Main.Config.discount.List.SortBy, true)
        };
        
		
		DiscountOffer.PupulateTable(Main.Config.discount.List.SortBy, true)
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
        /*if (!c) {
            Main.SaveConfig()
        }*/
        var j = false;
        var g = "";
        var l = new Array();
		var sdate = ""; 
		var edate = "";
		
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
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="DiscountOffer.Edit(' + this.discount[e].id + ')">' + this.discount[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.discount[e].id + '"/></div>';
                d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 130px;"><div class="cap"><span class="caption hand" onclick="DiscountOffer.Edit(' + this.discount[e].id + ')">'
				 + Main.NullToEmpty(this.discount[e].discounttext).toUpperCase() +"</span></div></div>";
              
                d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 125px;"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.discount[e].business).toUpperCase() +'</span></div></div>';
				
              <!--  d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="Discount.Edit(' + this.Discount[e].id + ')">&pound;' + this.Discount[e].description + "</span></div></div>";-->
			  if(Main.NullToEmpty(this.discount[e].startdate) == "")
			  {
				  sdate = "--";
			  }
			  else
			  {
				   sdate = this.discount[e].startdate;
			  }
			   if(Main.NullToEmpty(this.discount[e].enddate) == "")
			  {
				  edate = "--";
			  }
			  else
			  {
				   edate = this.discount[e].enddate;
			  }
			   d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 100px;"><span class="caption">'+ sdate +'</span></div>';
			   d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 100px;"><span class="caption">'+ edate +'</span></div>';
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
                DiscountOffer.SetEnabled(m.replace("switch_", ""), i)
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
		
        $.post("lib/discountoffer.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                //Switch.SwitchTo("switch_" + b, !a)
				DiscountOffer.Main();
				
            }
        })
    },
    New: function () {
       var a = this;
	   var i=0;
		$.post("lib/discountoffer.php", "f=FetchAllRestData", function (b) {
			
			
			var totalrec = JSON.parse(b);
			 var d = new Array();
				d.push(JSON.parse('{"id":"-1","caption":""}'));
				for (var c in totalrec) {
					var e = new Object();
					e.id = totalrec[c].id;
					e.caption = totalrec[c].caption ;
					d.push(e)
				}
		
		DiscountOffer.restaurants = d;
			//alert(JSON.stringify(d))
			//return false
			
			})
        Main.GetFranchisesData("DiscountOffer.Form()")
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
           // Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDiscountData","id":"' + a + '"}]', "DiscountOffer.PreEdit")
		  
		     $.post("lib/discountoffer.php", "f=FetchDiscountData&id=" + a, function (b) {
				 
				
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				DiscountOffer.PreEdit(b);
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
		   if(a.discountype==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(a.discountype==2)
			{
			   document.getElementById("idprice").style.display="";
			}
    },
    Form: function (e) {
        var j = "";
        var k = "";
		
		 MultipleInput.AddListener("tagschange", "DiscountOffer.MultiInputTagsChange");
		 
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "DiscountOffer.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "DiscountOffer.PrintMain()");
        Forms.Clean("off", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.off.type = "create"
			
        } else {
            Forms.Form.off.type = "modify";
            Forms.Form.off.id = e.id
        }
		 Forms.Form.off.ad = e;
         this.ActiveForm = "off";
        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.off.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_DISCOUNT_ADD_OFFER'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DISCOUNT_EDIT_OFFER'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';	
		 
		   k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_DISCOUNT_TEXT']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "discounttext", Main.NullToEmpty(e.discounttext), true, "", false, false) + "</div></div>"; 
        var g = "";
        var b;
		
        if (Forms.Form.off.type == "modify") {
			
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
     
        k += '<div class="row" ><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_TYPE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("off", "discountype", g, e.discountype, true, "DiscountOffer.TypeChanged(this.value)", true) + "</div></div>";
		
		
		 if (Forms.Form.off.type == "modify") {	   
         if(e.discountype==1)
		 {
			 var per_percent = e.rate;
	     }
		 k += '<div class="row" style="display: none" id="idpercent"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "commonratetype1", Main.NullToEmpty(per_percent), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span style="color: #B10606;font-size: 10px;">*</span></div>';
		if(e.discountype==2)
		 {
			 var per_price = e.rate;
	     }
		 
		 	 k += '<div class="row" style="display: none" id="idprice"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "commonratetype2", Main.NullToEmpty(per_price), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span style="color: #B10606;font-size: 10px;">*</span></div>';
		 }
		 else
		 {
			  k += '<div class="row" style="display: none" id="idpercent"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "commonrate","", true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
			  
			  k += '<div class="row" style="display: none" id="idprice"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE']?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "commonrate", "", true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
			 
			 
		  }
		  
		  k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_VALID_UPTO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "validdays", Main.NullToEmpty(e.validdays), true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>"; 
		  
		    k += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_MIN_PURCHASE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("off", "minshop", Main.NullToEmpty(e.minshop), false, "", false, false, "return Main.IsNumberKey(event)")  + '</div><span style="color: #B10606;font-size: 10px;">*</span></div>'; 
			
		
			 
			  if (Forms.Form.off.type == "create") {
		Forms.CreateValue("off", "offerbusiness", '');
         k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] ?></span><div class="multiinputbox" style="margin-left:90px;"><span class="obligatory nonselectable"></span><input type="text" id="offerbusiness" style="width:245px;height:60px;"/></div></div>';
			
			
			 
			
			
			  }
			  else
			  {
			k += '<div class="row" ><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] ?>:</span>';
		k += '<span class="caption" style="font-size:13px; font-weight:bold;padding-left:20px;">'+e.bname+'</span>';		  
				  
			  }
			 
			k += ' </div>'; 
			 
		/*disabled="disabled"*/
        
        k += "</div>";
		 k += "</div>";
        k += "</div>";
		 document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
		
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
      /*
		if(Forms.Form.off.type == "create") 
		{
			if((Forms.Form.off.fields.business.value=="" || Forms.Form.off.fields.business.value==-1)  &&  Forms.Form.off.fields.acceptall.value == "false")
			{
				alert('<?=$lang_resource['CONTROL_PANEL_DISCOUNT_ALERT_MSG_OFFER']?>');
				 return false;
			}
			else if(Forms.Form.off.fields.acceptall.value == "true")
			{
			var ask = confirm('<?=$lang_resource['CONTROL_PANEL_DISCOUNT_CONFIRM_MSG_OFFER']?>')
				if(ask == false)
				{
				return false;
				}
			}
		}*/
		
     //   Main.Request("ads", null, "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), "Discount.Main()");
	/* alert(JSON.stringify(Forms.Form.off));
	 return false;*/
	
	    Main.Request("discountoffer", null, "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.off), "DiscountOffer.Main()");
	   
		
			
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
        Main.Request("discountoffer", null, "f=DeleteAd&data=" + JSON.stringify(a), "DiscountOffer.Main()")
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
