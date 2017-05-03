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
        p += '<div style="float:left;width:100%;height:auto;overflow-y:auto;>';


p += '    <table width="568" border="0" align="center" cellpadding="0" cellspacing="0">';
p += '	   <tr><td height="10"></td></tr>';
p += '       <tr>';
p += '       <td height="79">';
p += '       <table width="568" border="0" cellspacing="0" cellpadding="0">';
p += '       <tr>';
p += '       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/logo_top_m.png" border="0" /></td>';
p += '       <td height="50%" valign="middle">';
p += '       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">';
p += '       <tr>';
p += '       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>';
p += '       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>';
p += '       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td> ';
p += '       </tr>';
p += '       </table>   ';
p += '       </td>';
p += '       </tr>';
p += '       </table>';
p += '       </td>';
p += '       </tr>';
p += '       <tr>';
p += '       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>';
p += '       </tr>';
p += '       </table>';



p += '	<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>';
p += '	<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">';
p += '		<tr>';
p += '          <td height="15"></td>';
p += '        </tr>';
p += '        <tr>';
p += '          <td align="left" style="padding:8px 50px;">';
p += '          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">';
p += '          <em>Hi there,<br><?= $lang_resource['ORDER_PLACED1_V2'] ?></em></span>    ';
p += '          </td>';
p += '        </tr>';
p += '        <tr>';
p += '          <td align="center" style="padding:8px 50px;">';
p += '          <span style="font-family:Georgia,Arial,sans-serif;font-size:23px;color:#df2226;"><em>Order #' + a.id +'</em></span>';
p += '          </td>';
p += '        </tr>';
p += '        <tr>';
p += '          <td align="center" style="padding:15px;">';
p += '          <a href="#"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/track_btn_m.png" border="0" /></a>    </td>';
p += '        </td></tr>';
p += '    </table>';
p += '    <tr>';
p += '    </table>	';
p += '    </td></tr></table>';


p += '<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>';
p += '<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="4" bgcolor="#F7F7F7">';
p += '  <tr><th style="border:0px solid #e2dbdb;" colspan="5"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;"><em><?= $lang_resource['ORDER_DETAILS_V2'] ?></em></span></th></tr>';
p += '  <tr>';
p += '    <th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="160"><?= $lang_resource['Description_V2'] ?></th>';
p += '    <th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="400"><?= $lang_resource['User_details_V2'] ?></th>';
p += '  </tr>';
p += '  <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><?= $lang_resource['Name_V2'] ?></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'+ n.buyer.name + '</td>';
p += '  </tr>';
p += '  <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">Email</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'+ n.buyer.email +'</td>';
p += '  </tr>';
p += '   <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><?= $lang_resource['Home_address_V2'] ?></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' + n.buyer.address + '</td>';
p += '  </tr>';
p += '   <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><?= $lang_resource['Neighbourhood_V2'] ?></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp</td>';
p += '  </tr>';
p += '   <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><?= $lang_resource['Phone_V2'] ?></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' + n.buyer.tel + '</td>';
p += '  </tr>';
p += '   <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><?= $lang_resource['City_V2'] ?></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' +n.buyer.cityname + '</td>';
p += '  </tr>';
p += '   <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><?= $lang_resource['Referenece_V2'] ?></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' + n.buyer.reference + '</td>';
p += '  </tr>';
p += '</table>';
p += '</td></tr></table>';


   var m = "";
        var h;
        for (var g in n.business) {
            if (n.business[g].id) {
                h = 0;
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

p += '<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>';
p += '<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">';
p += '  <tr><th style="border:1px solid #e2dbdb;" colspan="5" textcolor="#df2226"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;">'+ n.business[g].name +'</span>';
p += '</th></tr>';
p += '  <tr>';
p += '    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="160"><?= $lang_resource['Items_V2'] ?></th>';
p += '    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100"><?= $lang_resource['Ingredients_V2'] ?></th>';
p += '    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100"><?= $lang_resource['Comments_V2'] ?></th>';
p += '    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100"><?= $lang_resource['Extra_V2'] ?></th>';
p += '    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100"><?= $lang_resource['Rate1_V2'] ?></th>';
p += '  </tr>';
  for (var f in n.business[g].dishes) {
p += '  <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'+ n.business[g].dishes[f].name +'</td>';
        var c = new Array();
                    var l = new Array();
                    for (var e in n.business[g].dishes[f].ingredients) {
                        if (n.business[g].dishes[f].ingredients[e].enabled) {
                            c.push(n.business[g].dishes[f].ingredients[e].caption)
                        }
                    }
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">';
    var d = 0;
                    for (e in c) {
                        if (d == 0) {
                            p += c[e]
                        } else {
                            p += ", " + c[e]
                        }
                        d++
p += '    </td>';
    c = new Array();
                    for (e in n.business[g].dishes[f].extras) {
                        if (n.business[g].dishes[f].extras[e].enabled) {
                            c.push(n.business[g].dishes[f].extras[e].name)
                        } else {
                            l.push(n.business[g].dishes[f].extras[e].name)
                        }
                    }
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">';
    d = 0;
                    for (e in c) {
                        if (d == 0) {
                            p += c[e]
                        } else {
                            p += ", " + c[e]
                        }
                        d++
                    }
p += '    </td>;'
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'+ Main.NullToEmpty(n.business[g].dishes[f].comments) +'</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'+ n.business[g].dishes[f].total +'</td>';
p += '  </tr>';
p += '    <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp</td>';
p += '  </tr>';
  h = parseFloat(parseFloat(h) + parseFloat(n.business[g].dishes[f].total)).toFixed(Main.IS_DECIMAL_POINT)
                }
                h = parseFloat(parseFloat(h) + parseFloat(n.business[g].shipping)).toFixed(Main.IS_DECIMAL_POINT);
                var b = "<?= $lang_resource['DELIVERY_V2'] ?>";
                if (n.business[g].shipping == "0.00") {
                    b = "<?= $lang_resource['FREE_DELIVERY_V2'] ?>"
                }

p += '  <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="2"><em>'+ Main.NullToEmpty(n.business[g].comments) +'</em></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="2">'+ n.business[g].shipping +'</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>';
p += '  </tr>';
p += '  <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="2"><em><?= $lang_resource['PAYMENT_METHOD_V2'] ?> ' + m + '</em></td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb; align=right;" colspan="2"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px; padding-left: 74px;">Total</td>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px;color:#df2226;">'+ h +'</span></td>';
p += '  </tr>';
p += '  <tr>';
p += '    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>Any changes with the Order?<span style="font-family:Arial,Georgia,sans-serif;color:#df2226;">' + n.business[g].name + + n.business[g].tel +'</em></span></td>';
p += '  </tr>';
p += '</table>';
p += '</td></tr></table>';



p += '<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>';
p += '<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">';
p += '<tr>';
p += '<td width="110">';
p += '       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">Follow Us On: </span></td>';
p += '<td>';
p += '<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">';
p += '  <tr>';
p += '    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>';
p += '    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>';
p += '    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>';
p += '  </tr>';
p += '</table>';
p += '</td>';

p += '<td>';
p += '<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">';
p += '  <tr>';
p += '    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>';
p += '    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>';
p += '    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>';
p += '  </tr>';
p += '</table>';
p += ' </td>';
p += '</tr>';
p += '<tr>';
p += '    <td colspan="4" height="1" bgcolor="#C0C5C6"></td>';
p += '</tr>';
p += '<tr>';
p += '    <td colspan="4" height="1" bgcolor="#fffff"></td>';
p += '</tr>';
p += '</table>';
p += '</td></tr></table>';


p += '   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>';
p += '   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">';
p += '      <tr> ';
p += '         <td width="381">';
p += '            <table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">';
p += '               <tr>';
p += '                  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>About Us</strong></span></td>';
p += '               </tr>';
p += '               <tr>';
p += '                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>Contact Us</strong></span></td>';
p += '               </tr>';
p += '               <tr>';
p += '                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>Blog</strong></span></td>';
p += '               </tr>';
p += '            </table>  ';
p += '         </td>';
p += '         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/logo_foot_m.png" width="251" height="42" border="0" /></td>';
p += '     </tr>';
p += '   </table>';
p += '   </td></tr></table>';




p += '    <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">';
p += '     <tr><td height="15"></td></tr>';


p += '     <tr>';
p += '     <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">';
p += '        <span style="color:#6f6d6b;">Copyright &copy; All Rights Reserved.</span><br/>';
p += '        <span style="color:#6f6d6b;">Dont want to receive this anymore? - </span>';
p += "    <a href="#" style="text-decoration:underline;color:#6f6d6b;" target="_blank">Unsubscribe</a> ";
p += '     </td>';
p += '     </tr>';
p += '    </table>';





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
