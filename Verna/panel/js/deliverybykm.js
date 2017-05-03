var DeliveryByKm = {
    Main: function () {
        Main.Loading();
		
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/deliveryByKm.php", "f=FetchAlldeliveryData", function (b) {
			
		
			//GoogleMap.Init();
			
			$.post("lib/deliveryByKm.php", "f=FetchAllRestData", function (f) {
			
			
			DeliveryByKm.restaurants = JSON.parse(f);
			//return false
			
			
			})
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.delivery = new Object();
                 Main.Config.delivery.List = new Object();
				 
                DeliveryByKm.delivery = JSON.parse(b);
				DeliveryByKm.PrintMain()
				
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
        b.push(Visuals.CreateSubMenuItem("DeliveryByKm.New()", "<?= $lang_resource['CONTROL_DELIVERY_ADD'] ?>"));
        b.push(Visuals.CreateSubMenuItem("DeliveryByKm.Edit()", "<?= $lang_resource['CONTROL_PANEL_DELIVERY_EDIT'] ?>"));
        b.push(Visuals.CreateSubMenuItem("DeliveryByKm.Delete()", "<?= $lang_resource['CONTROL_PANEL_DELIVERY_DELETE'] ?>"));
        a += Visuals.CreateSubMenu(b);
        document.getElementById("leftcol").innerHTML = a;
        c += '<div class="contentbox" style="width:840px">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DELIVERY_TITLE'] ?></span>';
        c += "</div>";
        c += '<div class="table">';
        c += '<div class="title nonselectable">';
        c += '<div class="id hand" onclick="Deliveryzone.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        c += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        c += '<div class="hand" style="border-right: 2px solid #E4E4E4;float: left;height: 26px; width: 230px;" onclick="Deliveryzone.PupulateTable(\'zip\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DELIVERYKM_COLUMN1'] ?> </span></div>';
        c += '<div class="hand" onclick="Deliveryzone.PupulateTable(\'price\')" style="border-right: 2px solid #E4E4E4;float: left;height: 26px; width: 230px;"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DELIVERYKM_COLUMN2'] ?></span></div>';
       // c += '<div class="enabled  hand" onclick="Deliveryzone.PupulateTable(\'description\')" sty ><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN3'] ?></span></div>';
        //c += '<div class="enabled default"><span class="caption"><?=$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN4'] ?></span></div>';
		 c += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DELIVERYKM_COLUMN3'] ?></span></div>';
        c += "</div>";
        c += '<div class="container" id="ads"></div>';
        c += "</div>";
		
		
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
          DeliveryByKm.PupulateTable(Main.Config.delivery.List.SortBy, true)
        };
        
		
		DeliveryByKm.PupulateTable(Main.Config.delivery.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
		//alert("ok");
        var d = "";
        var b = this.delivery.length;
		
        if (c) {
            this.delivery.sort(Main.SortByProperty(a));
            if (Main.Config.delivery.List.SortByStatus == "max") {
                this.delivery.reverse()
            }
        } else {
            if (Main.Config.delivery.List.SortBy != a) {
                this.delivery.sort(Main.SortByProperty(a));
                Main.Config.delivery.List.SortByStatus = "min"
            } else {
                this.delivery.reverse();
                if (Main.Config.delivery.List.SortByStatus == "min") {
                    Main.Config.delivery.List.SortByStatus = "max"
                } else {
                    Main.Config.delivery.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.delivery.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
		//alert(this.Discount);
		//return 
	/*	alert("ok");*/
	
        for (var e in this.delivery) {
            j = true;
            g = document.getElementById("search").value.toLowerCase();
            /*if (String(this.delivery[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.delivery[e].name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.delivery[e].city.name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.discount[e])
           }*/
		    l.push(this.delivery[e])
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
			//	alert(this.delivery[e].id)
                d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
                d += '<div class="id"><div class="cap"><span class="caption hand" onclick="Deliveryzone.Edit(' + this.delivery[e].id + ')">' + this.delivery[e].id + "</span></div></div>";
                d += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.delivery[e].id + '"/></div>';
                d += '<div style=" border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 230px;"><div class="cap"><span class="caption hand" onclick="DeliveryByKm.Edit(' + this.delivery[e].id + ')">'
				 + Main.NullToEmpty(this.delivery[e].name).toUpperCase() +"</span></div></div>";
              
                d += '<div style="border-right: 2px solid #E4E4E4;float: left; height: 26px;width: 230px;"><div class="cap"><span class="caption" >' + Main.NullToEmpty(this.delivery[e].business) +"</span></div></div>";
				
				
				
				 //d += '<div style="border-right: 2px solid #E4E4E4;float: left; height: 26px;width: 230px;"><div class="cap"><span class="caption">' +   Main.NullToEmpty(this.delivery[e].maxallow) + "</span></div></div>";
              <!--  d += '<div class="adhits"><div class="cap"><span class="caption hand" onclick="Discount.Edit(' + this.Discount[e].id + ')">&pound;' + this.Discount[e].description + "</span></div></div>";-->
			 //  d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 64px;"><span class="caption">' +   Main.NullToEmpty(this.discount[e].hits) + "</span></div>";
			 //  d += '<div style="border-right: 2px solid #E4E4E4;float: left;height: 26px;width: 64px;"><span class="caption">' +   Main.NullToEmpty(this.discount[e].maxallow) + "</span></div>";
			   d += '<div class="enabled"><span class="caption"><div id="switch_' + this.delivery[e].id + '"></div></span></div>';
                d += "</div>"
				
				 }
           
        }
	// alert(d)
        document.getElementById("ads").innerHTML = d;
        var h = false;
        Switch.Init();
        for (e in l) {
			//alert("3")
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                DeliveryByKm.SetEnabled(m.replace("switch_", ""), i)
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
        $.post("lib/deliveryByKm.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
        var a = this;
       
		$.post("lib/deliveryByKm.php", "f=FetchAllRestData", function (b) {
			
			
			DeliveryByKm.restaurants = JSON.parse(b);
			//return false
			
			
			})
			
			 Main.GetFranchisesData("DeliveryByKm.Form()")
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
           // Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDiscountData","id":"' + a + '"}]', "Deliveryzone.PreEdit")
		     $.post("lib/deliveryByKm.php", "f=FetchDeliveryData&id=" + a, function (b) {
																					 
						//alert(b)															 
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				DeliveryByKm.PreEdit(b);
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
		
		//alert(JSON.stringify(e))
		
		 MultipleInput.AddListener("tagschange", "DeliveryByKm.MultiInputTagsChange");
		
		
        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "DeliveryByKm.Save()");
        j += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "DeliveryByKm.PrintMain()");
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
			ard1 = new Object();
			ard2 = new Object();
			ard3 = new Object();
			ard4 = new Object();
			ard5 = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
		    //Main.location= e.location;
			var ar =  JSON.parse(e.servearea);
		//	alert(ar.delivery2.area)
			
			var ard1 =  JSON.parse(ar.delivery1.area);
			var ard2 =  JSON.parse(ar.delivery2.area);
			var ard3 =  JSON.parse(ar.delivery3.area);
			var ard4 =  JSON.parse(ar.delivery4.area);
			var ard5 =  JSON.parse(ar.delivery5.area);
			
        }
		//alert(ard1.from);
		 Forms.Form.ad.ad = e;
        this.ActiveForm = "ad";
		
		
        k += '<div class="contentbox" style="width:870px">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.ad.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_DELIVERY_ADD'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt;<?= $lang_resource['CONTROL_PANEL_DELIVERY_EDIT'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol" style="width:314px">';
		
        var g = "";
        var b;
        k += '<div class="row"><span class="caption">Delivery Title</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "name", Main.NullToEmpty(e.name), true, "", false, false) + "</div></div>";
	
		
		  k += '<div class="row"><span class="caption">Min Purchase</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "maxallow", Main.NullToEmpty(e.maxallow), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		  
		   //Settings to select miles or km 
		    distanceFormattxt='<?= $lang_resource['CONTROL_PANEL_DISTANCE_TEXT1'] ?>';
			
		  	 if(SuperAdmin.distanceFormat=="N"){
				  distanceFormattxt='<?= $lang_resource['CONTROL_PANEL_DISTANCE_TEXT2'] ?>';
			 }
			 
		  	  k += '<div class="row" style="width: 150%;padding-bottom: 5px;" style="padding:5px;"><span class="caption" style="width:118px;line-height: 25px;">'+distanceFormattxt+'</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneFrom1", Main.NullToEmpty(ard1.from), true, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 30px;margin-right: 10px;margin-left: 10px;width: 10px;"> to</span> <div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneTo1", Main.NullToEmpty(ard1.to), true, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 0; margin-left: 5px; margin-top: 13px; width: 40px;">&nbsp;Price</span>&nbsp;<div class="inputbox">' + Forms.CreateInputProperty("ad", "distanceprice1", Main.NullToEmpty(ard1.price), true, "", true, false, "return Main.IsNumberKey(event)") + "</div></div>";
			  
			   k += '<div class="row" style="width: 150%;padding-bottom: 5px;" style="padding:5px;"><span class="caption" style="width:118px;line-height: 25px;">'+distanceFormattxt+'</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneFrom2", Main.NullToEmpty(ard2.from), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 30px;margin-right: 10px;margin-left: 10px;width: 10px;"> to</span> <div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneTo2", Main.NullToEmpty(ard2.to), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 0; margin-left: 5px; margin-top: 13px; width: 40px;">&nbsp;Price</span>&nbsp;<div class="inputbox">' + Forms.CreateInputProperty("ad", "distanceprice2", Main.NullToEmpty(ard2.price), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
			   
			   
			    k += '<div class="row" style="width: 150%;padding-bottom: 5px;" style="padding:5px;"><span class="caption" style="width:118px;line-height: 25px;">'+distanceFormattxt+'</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneFrom3", Main.NullToEmpty(ard3.from), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 30px;margin-right: 10px;margin-left: 10px;width: 10px;"> to</span> <div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneTo3", Main.NullToEmpty(ard3.to), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 0; margin-left: 5px; margin-top: 13px; width: 40px;">&nbsp;Price</span>&nbsp;<div class="inputbox">' + Forms.CreateInputProperty("ad", "distanceprice3", Main.NullToEmpty(ard3.price), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
				
				 k += '<div class="row" style="width: 150%;padding-bottom: 5px;" style="padding:5px;"><span class="caption" style="width:118px;line-height: 25px;">'+distanceFormattxt+'</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneFrom4", Main.NullToEmpty(ard4.from), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 30px;margin-right: 10px;margin-left: 10px;width: 10px;"> to</span> <div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneTo4", Main.NullToEmpty(ard4.to), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 0; margin-left: 5px; margin-top: 13px; width: 40px;">&nbsp;Price</span>&nbsp;<div class="inputbox">' + Forms.CreateInputProperty("ad", "distanceprice4", Main.NullToEmpty(ard4.price), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
				 
				  k += '<div class="row" style="width: 150%;padding-bottom: 5px;" style="padding:5px;"><span class="caption" style="width:118px;line-height: 25px;">'+distanceFormattxt+'</span><div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneFrom5", Main.NullToEmpty(ard5.from), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 30px;margin-right: 10px;margin-left: 10px;width: 10px;"> to</span> <div class="inputbox">' + Forms.CreateInputProperty("ad", "distancezoneTo5", Main.NullToEmpty(ard5.to), false, "", false, false, "return Main.IsNumberKey(event)") + '</div><span class="caption" style="line-height: 0; margin-left: 5px; margin-top: 13px; width: 40px;">&nbsp;Price</span>&nbsp;<div class="inputbox">' + Forms.CreateInputProperty("ad", "distanceprice5", Main.NullToEmpty(ard5.price), false, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>";
		 	
		
		  Forms.CreateValue("ad", "business",Main.NullToEmpty(e.business),true);
         k += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] ?></span><div class="multiinputbox" style="margin-left:90px;"><span class="obligatory nonselectable"></span><input type="text" id="business" style="width:235px;height:60px;"/></div></div>';
		  k += "</div>";
		       
        Forms.CreateInputProperty("ad", "servearea",e.servearea, false);
		 k += "</div>";
        k += "</div>";
		
		//
		
		 document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
		
		/*$.post("lib/Deliveryzone.php", "f=FetchAllRestData", function (b) {
			
			
			Deliveryzone.restaurants = JSON.parse(b);
			//return false
			
			
			})*/
		 MultipleInput.Init("business",DeliveryByKm.restaurants, true);
		 
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
   
    Save: function () {
       if (Forms.CanSave("ad") == false) {
            return
        }
		//alert(Forms.GetValue("ad", "distancezoneFrom1"))
		
		 var c = new Object();
		 c.delivery1 = new Object();
         c.delivery2 = new Object();
         c.delivery3 = new Object();
		 c.delivery4 = new Object();
		 c.delivery5 = new Object();
		 
		 
		  c.delivery1.area = '{"from":'+Forms.GetValue("ad", "distancezoneFrom1")+',"to":'+Forms.GetValue("ad", "distancezoneTo1")+',"price":'+Forms.GetValue("ad", "distanceprice1")+'}';
		  if(Main.NullToEmpty(Forms.GetValue("ad", "distancezoneFrom2"))!="") {
		 c.delivery2.area = '{"from":'+Forms.GetValue("ad", "distancezoneFrom2")+',"to":'+Forms.GetValue("ad", "distancezoneTo2")+',"price":'+Forms.GetValue("ad", "distanceprice2")+'}';
		  }
		  else { 
		   c.delivery2.area = '{"from":'+0+',"to":'+0+',"price":'+0+'}';
		  }
		  if(Main.NullToEmpty(Forms.GetValue("ad", "distancezoneFrom3"))!="") {
		   c.delivery3.area = '{"from":'+Forms.GetValue("ad", "distancezoneFrom3")+',"to":'+Forms.GetValue("ad", "distancezoneTo3")+',"price":'+Forms.GetValue("ad", "distanceprice3")+'}';
		    }
		  else { 
		   c.delivery3.area = '{"from":'+0+',"to":'+0+',"price":'+0+'}';
		  }
		    if(Main.NullToEmpty(Forms.GetValue("ad", "distancezoneFrom4"))!="") {
		    c.delivery4.area = '{"from":'+Forms.GetValue("ad", "distancezoneFrom4")+',"to":'+Forms.GetValue("ad", "distancezoneTo4")+',"price":'+Forms.GetValue("ad", "distanceprice4")+'}';
			} else { 
		   c.delivery4.area = '{"from":'+0+',"to":'+0+',"price":'+0+'}';
		  }
			 if(Main.NullToEmpty(Forms.GetValue("ad", "distancezoneFrom5"))!="") {
			 c.delivery5.area = '{"from":'+Forms.GetValue("ad", "distancezoneFrom5")+',"to":'+Forms.GetValue("ad", "distancezoneTo5")+',"price":'+Forms.GetValue("ad", "distanceprice5")+'}';
			 } else { 
		   c.delivery5.area = '{"from":'+0+',"to":'+0+',"price":'+0+'}';
		  }
        /*  c.delivery2.area = {"from":+Forms.GetValue("ad", "distancezoneFrom2")+,"to":+Forms.GetValue("ad", "distancezoneTo2")+,"price":+Forms.GetValue("ad", "distanceprice2")+};
		  c.delivery3.area = {"from":+Forms.GetValue("ad", "distancezoneFrom3")+,"to":+Forms.GetValue("ad", "distancezoneTo3")+,"price":+Forms.GetValue("ad", "distanceprice3")+};
		  c.delivery4.area = {"from":+Forms.GetValue("ad", "distancezoneFrom4")+,"to":+Forms.GetValue("ad", "distancezoneTo4")+,"price":+Forms.GetValue("ad", "distanceprice4")+};
		  c.delivery5.area = {"from":+Forms.GetValue("ad", "distancezoneFrom5")+,"to":+Forms.GetValue("ad", "distancezoneTo5")+,"price":+Forms.GetValue("ad", "distanceprice5")+};*/
		  
		  
		  
		  Forms.UpdateValue("ad", "servearea", JSON.stringify(c), true);
		  
		 // alert(JSON.stringify(c));
          //alert(JSON.stringify(Forms.Form.ad));
	
	//alert("ok");
	    Main.Request("deliveryByKm", null, "f=SaveDeli&data=" + JSON.stringify(Forms.Form.ad), "DeliveryByKm.Main()");
	   /* var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);*/
		
	  /* $.post("panel/lib/Deliveryzone.php", "f=SaveZone&data=" + JSON.stringify(Forms.Form.ad), function (f)
        {
			alert(f);
            Main.Ready(true);
            if (b != Main.Aid)
            {
                return;
            }
			Deliveryzone.Main2();
			
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
		
        Main.Request("deliveryByKm", null, "f=DeleteAd&data=" + JSON.stringify(a), "DeliveryByKm.Main()")
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

