var IS_PAYPAL_ENABLED = 1;

var ZipBusiness = {
    Main: function () {
		
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/zipbusiness.php", "f=FetchAllOrdersData", function (c) {
	
		// alert(c)
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                ZipBusiness.Orders = JSON.parse(c);
                for (var b in ZipBusiness.Orders) {
                    ZipBusiness.Orders[b].cname = ZipBusiness.Orders[b].city.name
                }
                ZipBusiness.PrintMain()
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function () {
        var c = new Array();
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var d = "";
		 document.getElementById("totalOrderBox").style.display = "none";
		/* b.push({
            caption: "ZipBusiness download",
            link: "ZipBusiness.Export(0)"
        });*/
		c.push(Visuals.CreateSubMenuItem("ZipBusiness.Edit()", "<?= $lang_resource['CONTROL_PANEL_ZIPCODE_ADD'] ?>"));
		/*c.push(Visuals.CreateSubMenuItem("", "<?= $lang_resource['CONTROL_PANEL_INVOICE_VIEW'] ?>", b));*/
        /*c.push(Visuals.CreateSubMenuItem("Orders.Edit()", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EDIT'] ?>"));
    
		 b.push({
            caption: "ZipBusiness download",
            link: "ZipBusiness.Export(0)"
        });
        c.push(Visuals.CreateSubMenuItem("", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EXPORT'] ?>", b));*/
      
        a += Visuals.CreateSubMenu(c);
        document.getElementById("leftcol").innerHTML = a;
        d += '<div class="contentbox">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt;<?=$lang_resource['CONTROL_PANEL_ZIPCODE_TITLE']?> </span>';
        d += "</div>";
        d += '<div class="table">';
        d += '<div class="title nonselectable">';
        d += '<div class="oid hand" onclick="ZipBusiness.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="businessprovider hand" onclick="ZipBusiness.PupulateTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] ?></span></div>';
        d += '<div class="ordercity hand" onclick="ZipBusiness.PupulateTable(\'usrname\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESTAURATEUR_HEADER'] ?></span></div>';
        d += '<div class="orderstatus hand" onclick="ZipBusiness.PupulateTable(\'city\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_CITY_HEADER'] ?></span></div>';
        d += "</div>";
        d += '<div class="container" id="orders"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            ZipBusiness.PupulateTable(Main.Config.Orders.List.SortBy, true)
        };
        ZipBusiness.PupulateTable(Main.Config.Orders.List.SortBy, true)
    },
    PupulateTable: function (a, d) {
		
		//alert("ok");
        var e = "";
        var j = this.Orders.length;
		
        if (d) {
            this.Orders.sort(Main.SortByProperty(a));
            if (Main.Config.Orders.List.SortByStatus == "max") {
                this.Orders.reverse()
            }
        } else {
            if (Main.Config.Orders.List.SortBy != a) {
                this.Orders.sort(Main.SortByProperty(a));
                Main.Config.Orders.List.SortByStatus = "min"
            } else {
                this.Orders.reverse();
                if (Main.Config.Orders.List.SortByStatus == "min") {
                    Main.Config.Orders.List.SortByStatus = "max"
                } else {
                    Main.Config.Orders.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Orders.List.SortBy = a;
        if (!d) {
            Main.SaveConfig()
        }
        var l = false;
        var g = "";
		
        for (var f in this.Orders) {
            l = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.Orders[f].id).toLowerCase().indexOf(g) >= 0 || this.Orders[f].name.toLowerCase().indexOf(g) >= 0 || this.Orders[f].city.toLowerCase().indexOf(g) >= 0) {
                l = true
            }
            if (g.indexOf(" a ") >= 0) {
                var b = g.split(" a ");
                var n = $.trim(b[0]).toLowerCase();
                var k = $.trim(b[1].toLowerCase());
                if (n != "" || k != "") {
                    var h = this.Orders[f].date.toLowerCase();
                    var c = h;
                    if (k.length == 10) {
                        c = h.split(" ")[0]
                    }
                    if (h >= n && c <= k) {
                        l = true
                    }
                }
            }
            if (l) {
				
			//	var ed=document.getElementById("userlevelcus").value;
                var m;
                if (f % 2 == 0) {
                  	
					
					    m = " grey";
					
                  
                } else {
					
					
					  
					    m = " ";
					
					// m = " greens";
                   // m = ""
                }
				
                e += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
                e += '<div class="oid"><div class="cap"><span class="caption hand" onclick="Invoice.Main(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + this.Orders[f].id + "</span></div></div>";
                e += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Orders[f].id + '"/></div>';
                e += '<div class="businessprovider"><div class="cap"><span class="caption hand" onclick="Invoice.Main(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(this.Orders[f].name) + "</span></div></div>";
               
                    e += '<div class="ordercity"><div class="cap"><span class="caption"  onclick="Invoice.Main(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(this.Orders[f].usrname) + "</span></div></div>"
              
                e += '<div class="orderstatus"><div class="cap"><span class="caption hand" onclick="Invoice.Main(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(this.Orders[f].city) + "</span></div></div>";
                e += "</div>"
            }
        }
       /* e += '<form name="exp_form" method="post" action="lib/invoice_pdf.php">';
      <!--  e += '<input type="hidden" name="f" value="ExportOrder"/>';-->
        e += '<input id="exp_data" type="hidden" name="data" value=""/>';
        e += '<input type="hidden" name="name" value="ZipBusiness"/>';
        e += "</form>";*/
	
        document.getElementById("orders").innerHTML = e
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
			
			Invoice.Main(a);
           
				
				//alert(Main.WhereAmIData.driverHistory);
           
        }
    },
    
    Save: function () {
        if (Forms.CanSave("order") == false) {
            return
        }
		//alert(JSON.stringify(Forms.Form.order));
        Forms.PrepareForSaving("order");
        Main.Request("orders", null, "f=SaveOrder&data=" + JSON.stringify(Forms.Form.order), "Orders.Main()");
        Forms.Clean("order")
    },
    Export: function (b) {
		
		
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var a = new Object();
        a.ids = c;
        a.type = b;
		
       // document.getElementById("exp_data").value = JSON.stringify(a);
        document.exp_form.submit()
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("orders", null, "f=DeleteOrder&data=" + JSON.stringify(a), "Orders.Main()")
    }
};
