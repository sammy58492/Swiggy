var IS_PAYPAL_ENABLED = 1;

var Orders = {
    Main: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/orders.php", "f=FetchAllOrdersData", function (c) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                Orders.Orders = JSON.parse(c);
                for (var b in Orders.Orders) {
                    Orders.Orders[b].cname = Orders.Orders[b].city.name
                }
                Orders.PrintMain()
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
        c.push(Visuals.CreateSubMenuItem("Orders.Edit()", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EDIT'] ?>"));
        b.push({
            caption: "<?= $lang_resource['Order_details_V2'] ?>",
            link: "Orders.Export(0)"
        });
        b.push({
            caption: "Client data",
            link: "Orders.Export(1)"
        });
        c.push(Visuals.CreateSubMenuItem("", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EXPORT'] ?>", b));
        if (Main.User.level < 2) {
            c.push(Visuals.CreateSubMenuItem("Orders.Delete()", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_DELETE'] ?>"))
        }
        a += Visuals.CreateSubMenu(c);
        document.getElementById("leftcol").innerHTML = a;
        d += '<div class="contentbox">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt; <?= $lang_resource['ORDERS_BOX_TITLE'] ?></span>';
        d += "</div>";
        d += '<div class="table">';
        d += '<div class="title nonselectable">';
        d += '<div class="oid hand" onclick="Orders.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="businessprovider hand" onclick="Orders.PupulateTable(\'date\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_DATE_HEADER'] ?></span></div>';
        d += '<div class="ordercity hand" onclick="Orders.PupulateTable(\'cname\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_CITY_HEADER'] ?></span></div>';
        d += '<div class="orderstatus hand" onclick="Orders.PupulateTable(\'statustext\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_STATUS_HEADER'] ?></span></div>';
        d += "</div>";
        d += '<div class="container" id="orders"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            Orders.PupulateTable(Main.Config.Orders.List.SortBy, true)
        };
        Orders.PupulateTable(Main.Config.Orders.List.SortBy, true)
    },
    PupulateTable: function (a, d) {
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
            if (String(this.Orders[f].id).toLowerCase().indexOf(g) >= 0 || this.Orders[f].date.toLowerCase().indexOf(g) >= 0 || this.Orders[f].city.name.toLowerCase().indexOf(g) >= 0) {
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
                var m;
                if (f % 2 == 0) {
                    m = " grey"
                } else {
                    m = ""
                }
                e += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
                e += '<div class="oid"><div class="cap"><span class="caption hand" onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + this.Orders[f].id + "</span></div></div>";
                e += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Orders[f].id + '"/></div>';
                e += '<div class="businessprovider"><div class="cap"><span class="caption hand" onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(this.Orders[f].date) + "</span></div></div>";
                if (Main.User.level == 0) {
                    e += '<div class="ordercity"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
                } else {
                    e += '<div class="ordercity"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
                }
                e += '<div class="orderstatus"><div class="cap"><span class="caption hand" onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(this.Orders[f].statustext) + "</span></div></div>";
                e += "</div>"
            }
        }
        e += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        e += '<input type="hidden" name="f" value="ExportOrder"/>';
        e += '<input id="exp_data" type="hidden" name="data" value=""/>';
        e += '<input type="hidden" name="name" value="orders"/>';
        e += "</form>";
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
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
            $.post("lib/orders.php", "f=FetchOrderData&id=" + a, function (e) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e != "") {
                    Orders.Form(JSON.parse(e))
                } else {
                    alert("Error")
                }
            })
        }
    },
    Form: function (a) {
        var o = "";
        var p = "";
        o += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "Orders.Save()");
        o += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "Orders.PrintMain()");
        Forms.Clean("order", "mainbuttonok");
        Forms.Form.order.type = "modify";
        Forms.Form.order.id = a.id;
        p += '<div class="contentbox">';
        p += '<div class="titlebox nonselectable">';
        p += '<span class="title">&gt;&gt; <?= $lang_resource['ORDER_V2'] ?> ' + a.id + "</span>";
        p += "</div>";
        p += '<div class="editform">';
        p += '<div class="leftcol">';
        var q = new Array();
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['pending_V2'] ?>"}'));
        q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['completed_V2'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['cancelled_V2'] ?>"}'));
        p += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_STATUS'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("order", "status", q, a.status, false, "", true) + "</div></div>";
        p += '<span class="caption" style="float:left;margin-left:4px;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_COMMENT'] ?></span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaProperty("order", "comment", Main.NullToEmpty(a.comment), false, "", true, "ordercomments") + "</div>";
        p += "</div>";
        p += "</div>";
        var n = JSON.parse(a.data);
        p += '<div style="float:left;width:100%;height:520px;overflow-y:auto;font-size:12px;">';
        p += '<center><table cellpadding="0" cellspacing="0" border="1" style="border:1px solid grey;border-spacing:0;border-collapse:collapse;" align="center" width="550"><tbody><tr><td>';
        p += '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="550"><tbody>';
        p += '<tr height="100"><td align="center" valign="middle" style="background-color:#FFFFFF;"><img src="../images/logo-mail.png"/></td></tr>';
        p += '<tr><td style="padding:20px;">';
        p += '<span style="float:left;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_NAME'] ?> ' + n.buyer.name + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_EMAIL'] ?> " + n.buyer.email + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_ADDRESS'] ?> " + n.buyer.address + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PHONE'] ?> " + n.buyer.tel + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_CITY'] ?> " + n.buyer.cityname + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_REFERENCE'] ?> " + n.buyer.reference + "</span><br/>";
        var m = "";
        var h;
        for (var g in n.business) {
            if (n.business[g].id) {
                h = 0;
                p += '<br/><br/><span style="font-weight:bold;">' + n.business[g].name + '<span style="font-weight:normal;"> (<?= $lang_resource['MOBILE_SIXTH_PAGE_PHONE'] ?> ' + n.business[g].tel + ")</span></span><br/>";
                m = "";
				
				if(IS_PAYPAL_ENABLED == 1)
				{
					if (n.paypalid==undefined)
                	{
						if (n.business[g].paymethod.cash == true)
							{
							m = "<?= $lang_resource['CASH_DELIVERY'] ?>"
							}
						if (n.business[g].paymethod.card == true)
							{
							if (m == "")
								{
								m = "<?= $lang_resource['CARD_DELIVERY'] ?>"
								}
								else
								{
								m += " <?= $lang_resource['AND_CARD'] ?>"
								}
							}
						}
					else
					{
						m = "<?= $lang_resource['PAID_with_Paypal_V2'] ?> ("+n.paypalid+")";
					}
				}
				else
				{
					if (n.business[g].paymethod.cash == true) {
						m = "<?= $lang_resource['CASH_DELIVERY'] ?>"
					}
					if (n.business[g].paymethod.card == true) {
						if (m == "") {
							m = "<?= $lang_resource['CARD_DELIVERY'] ?>"
						} else {
							m += ", <?= $lang_resource['CARD_DELIVERY'] ?>"
						}
					}
				}
                if (n.business[g].paymethod.marco == true)
				{
					m = "PAID with mercadopago ("+n.mercadopagoid+")";
				}
                p += "<br/><span><?= $lang_resource['PAYMENT_METHOD_V2'] ?> " + m + "</span><br/><br/>";
                p += '<table cellpadding="7" border="1" style="border-spacing:0;border-collapse:collapse;border-style:solid;" width="550"><tbody>';
                p += '<tr><td align="center"><?= $lang_resource['Item_V2'] ?></td><td align="center"><?= $lang_resource['Ingredients_V2'] ?></td><td align="center"><?= $lang_resource['Product_Options_V2'] ?></td><td align="center"><?= $lang_resource['Comments_V2'] ?></td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
                for (var f in n.business[g].dishes) {
                    p += "<tr>";
                    p += '<td align="center">' + n.business[g].dishes[f].name + "</td>";
                    var c = new Array();
                    var l = new Array();
                    for (var e in n.business[g].dishes[f].ingredients) {
                        if (n.business[g].dishes[f].ingredients[e].enabled) {
                            c.push(n.business[g].dishes[f].ingredients[e].caption)
                        }
                    }
                    p += '<td align="center">';
                    var d = 0;
                    for (e in c) {
                        if (d == 0) {
                            p += c[e]
                        } else {
                            p += ", " + c[e]
                        }
                        d++
                    }
                    p += "</td>";
                    c = new Array();
                    for (e in n.business[g].dishes[f].extras) {
                        if (n.business[g].dishes[f].extras[e].enabled) {
                            c.push(n.business[g].dishes[f].extras[e].name)
                        } else {
                            l.push(n.business[g].dishes[f].extras[e].name)
                        }
                    }
                    p += '<td align="center">';
                    d = 0;
                    for (e in c) {
                        if (d == 0) {
                            p += c[e]
                        } else {
                            p += ", " + c[e]
                        }
                        d++
                    }
                    p += "</td>";
                    p += '<td align="center">' + Main.NullToEmpty(n.business[g].dishes[f].comments) + "</td>";
                    p += '<td align="center"><?= $lang_resource['Panel_Currency'] ?>' + n.business[g].dishes[f].total + "</td>";
                    p += "</tr>";
                    h = parseFloat(parseFloat(h) + parseFloat(n.business[g].dishes[f].total)).toFixed(Main.IS_DECIMAL_POINT)
                }
                h = parseFloat(parseFloat(h) + parseFloat(n.business[g].shipping)).toFixed(Main.IS_DECIMAL_POINT);
                var b = "<?= $lang_resource['DELIVERY_V2'] ?>";
                if (n.business[g].shipping == "0.00") {
                    b = "<?= $lang_resource['FREE_DELIVERY_V2'] ?>"
                }
                p += '<tr><td align="center">' + b + '</td><td colspan="2"></td><td align="right">' + Main.NullToEmpty(n.business[g].comments) + '</td><td align="center"><?= $lang_resource['Panel_Currency'] ?>' + n.business[g].shipping + "</td></tr>";
				
				/*discount code section */
					if(n.discounttype > 0)
					{
						if(n.discounttype == 1)
						{
						var discaption = '<?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?> ('+n.discountrate+'%)';
						}
						else
						{
						var discaption = '<?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?> ';
						}
						
						
						 h = parseFloat(parseFloat(h) - parseFloat(n.discountprice)).toFixed(Main.IS_DECIMAL_POINT);
					   
					 p += '<tr><td align="center">' + discaption + '</td><td colspan="2"></td><td align="right">' + Main.NullToEmpty(n.discountcomments) + '</td><td align="center"><?= $lang_resource['Panel_Currency'] ?>' +parseFloat(n.discountprice).toFixed(Main.IS_DECIMAL_POINT)+ "</td></tr>";
					
					}
					
					/*discount code section */
                p += '<tr><td colspan="4" align="right"></td><td align="center" style="font-weight:bold;font-size:16"><?= $lang_resource['Panel_Currency'] ?>' + h + "</td></tr>";
                p += "</tbody></table>"
            }
        }
        p += "</td></tr></tbody></table></td></tr></tbody></table></center>";
        p += "</div>";
        p += "</div>";
        document.getElementById("leftcol").innerHTML = o;
        document.getElementById("main").innerHTML = p
    },
    Save: function () {
        if (Forms.CanSave("order") == false) {
            return
        }
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
        Main.Request("orders", null, "f=DeleteOrder&data=" + JSON.stringify(a), "Orders.Main()")
    }
};