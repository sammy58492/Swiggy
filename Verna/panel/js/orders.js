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
        d += '<div class="contentbox"  style="width: 710px;">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt; <?= $lang_resource['ORDERS_BOX_TITLE'] ?></span>';
        d += "</div>";
        d += '<div class="table" style="width:675px">';
        d += '<div class="title nonselectable" style="width:675px">';
        d += '<div class="oid hand" onclick="Orders.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="businessprovider hand" onclick="Orders.PupulateTable(\'date\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_DATE_HEADER'] ?></span></div>';
        d += '<div class="ordercity hand" onclick="Orders.PupulateTable(\'cname\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_CITY_HEADER'] ?></span></div>';
        d += '<div class="orderstatus hand" style="width:166px;" onclick="Orders.PupulateTable(\'statustext\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_STATUS_HEADER'] ?></span></div>';
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
		
		//alert(JSON.stringify(this.Orders))
		
        for (var f in this.Orders) {
            l = false;
			
            g = document.getElementById("search").value.toLowerCase();
		
		  
		
            if (String(Main.NullToEmpty(this.Orders[f].id)).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.Orders[f].date).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.Orders[f].city.name).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.Orders[f].statustext).toLowerCase().indexOf(g) >= 0) {
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
					//Time selection settings. 
					time_format="<?=$lang_resource['TIME_FORMAT']?>";
				  if(time_format=="12"){
							
							closetime1='';
							opentime1='';
							opentime=new Array();
							closetime=new Array();
							openclosetime=new Array();
							openclosetime1='';
							openclosetime=this.Orders[f].date.split(" ");
							closetime=openclosetime[1].split(":");
							closetime1= Orders.convertTimeFormat(closetime[0],closetime[1]);
							openclosetime1=openclosetime[0]+' '+closetime1;
				   }else{
					   openclosetime1=this.Orders[f].date;
				   }
                e += '<div class="businessprovider"><div class="cap"><span class="caption hand" onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(openclosetime1) + "</span></div></div>";
                if (Main.User.level == 0) {
                    e += '<div class="ordercity"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
                } else {
                    e += '<div class="ordercity"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
                }
                e += '<div class="orderstatus" style="width:166px;"><div class="cap"><span class="caption hand" onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')">' + Main.NullToEmpty(this.Orders[f].statustext) + "</span></div></div>";
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
		
		$.post("lib/orders.php", "f=FetchDriverGroup&order_id=" + a, function (b) {
                       
                       var totalrec = JSON.parse(b);
                
                        var d = new Array();
                               d.push(JSON.parse('{"id":"-1","caption":""}'));
                               for (var c in totalrec) {
								 
                                       var e1 = new Object();
                                       e1.id = totalrec[c].id;
                                       e1.caption = totalrec[c].caption ;
                                       d.push(e1)
                               }
               
               Orders.driver = d;
            
			
    	})	
		
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
	
	 NewDropField: function (a) {
			document.getElementById("newdrop_id").style.display = "none";
  	
	        if(a==3)
			{
				document.getElementById("newdrop_id").style.display = "";
			}
       },
	
    Form: function (a) {
		//alert(JSON.stringify(a));
        var o = "";
        var p = "";
        o += Visuals.CreateMainButton("<?= $lang_resource['save_V2'] ?>", "ok", "Orders.Save()");
        o += Visuals.CreateMainButton("<?= $lang_resource['cancel_V2'] ?>", "cancel", "Orders.PrintMain()");
        Forms.Clean("order", "mainbuttonok");
        Forms.Form.order.type = "modify";
        Forms.Form.order.id = a.id;
		
		
		
		if(Main.NullToEmpty(a.driver_id)!="") {
			// delete Forms.Form.order.driverid;
			  Forms.Form.order.driverid = a.driver_id;
			 // alert("ok");
			}
		
        p += '<div class="contentbox">';
        p += '<div class="titlebox nonselectable">';
        p += '<span class="title">&gt;&gt; <?= $lang_resource['ORDER_V2'] ?> ' + a.id + "</span>";
        p += "</div>";
        p += '<div class="editform">';
        p += '<div class="leftcol">';
        var q = new Array();
       /* q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['pending_V2'] ?>"}'));
        q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['completed_V2'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['cancelled_V2'] ?>"}'));*/
		
		q.push(JSON.parse('{"id":"-1","caption":""}'));
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ORDER_PENDING'] ?>"}'));
		q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['V3_ORDER_Preparation'] ?>"}'));
		q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['V3_ORDER_ORDER_ON_ITS_WAY'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['V3_ORDER_DELIVERED'] ?>"}'));
		q.push(JSON.parse('{"id":"5","caption":"<?= $lang_resource['V3_ORDER_CANCELLED_RESTAURANT'] ?>"}'));
		q.push(JSON.parse('{"id":"6","caption":"<?= $lang_resource['V3_ORDER_CANCELLED_DRIVER'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['cancelled_V2'] ?>"}'));
		q.push(JSON.parse('{"id":"7","caption":"<?= $lang_resource['V3_ORDER_RESTAURANT_ACCEPTED'] ?>"}'));
		
        p += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_STATUS'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("order", "status", q, a.status, false, "", true) + "</div></div>";
		
		if(Main.User.level!=4)
		{
		p+= '<div class="row"><span class="caption"><?= $lang_resource['V3_ORDER_SELECT_DRIVER'] ?>:</span><div class="inputbox">'+ Forms.CreateSelectProperty("order", "driver_id", Orders.driver, a.driver_id, false) +"</div></div>";
		}
		
		p += '<span class="caption" style="float:left;margin-left:4px;"><?= $lang_resource['FRONT_DRIVER_COMMENTS'] ?></span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaProperty("order", "driver_comment", Main.NullToEmpty(a.driver_comment), false, "", true, "ordercomments") + "</div>"
		
        p += '<span class="caption" style="float:left;margin-left:4px;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_COMMENT'] ?></span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaProperty("order", "comment", Main.NullToEmpty(a.comment), false, "", true, "ordercomments") + "</div>";
        p += "</div>";
        p += "</div>";
        var n = JSON.parse(a.data);
        p += '<div style="float:left;width:100%;height:520px;overflow-y:auto;font-size:12px;">';
        p += '<center><table cellpadding="0" cellspacing="0" border="1" style="border:1px solid grey;border-spacing:0;border-collapse:collapse;" align="center" width="550"><tbody><tr><td>';
        p += '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="550"><tbody>';
        p += '<tr height="100"><td align="center" valign="middle" style="background-color:#FFFFFF;"><img src="images/logo/1/normal.jpg" height="65" width="440"/></td></tr>';
		if(n.business[0].dishes != ""){
		p += '<tr><td style="padding:20px;">';
        p += '<span style="float:left;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_NAME'] ?> ' + n.buyer.name + "</span><br/>";
         p += '<span style="float:left;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_LASTNAME'] ?> ' + n.buyer.lastname + "</span><br/>";
		p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_EMAIL'] ?> " + n.buyer.email + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_ADDRESS'] ?> " + n.buyer.address + "</span><br/>";
		p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_APT'] ?> :" + n.buyer.api + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PHONE'] ?> " + n.buyer.tel + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_CITY'] ?> " + n.buyer.cityname + "</span><br/>";
		if(n.buyer.zipcode)
		{
		 p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_ZIPCODE'] ?> " + n.buyer.zipcode + "</span><br/>";
		}
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
						if (n.business[g].paymethod.paypal == true) {
						m = "<?= $lang_resource['PAID_with_Paypal_V2'] ?> ("+n.paypalid+")";
						}
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
					m = "<?= $lang_resource['V3_ORDER_PAID_WITH_MERCADOPAGO'] ?> ("+n.mercadopagoid+")";
				}
				 if (n.business[g].paymethod.paypaladaptive == true)
				{
					m = "<?= $lang_resource['V3_ORDER_PAID_PAYPAL_ADAPTIVE'] ?> ";
				}
				
				
				 if (n.business[g].paymethod.authorizednet == true)
				{
					m = "<?= $lang_resource['V3_ORDER_PAID_AUTHORIZE'] ?> (<?=$lang_resource['V3_TRANSACTION']?> :"+a.a_trnx_code+")";
				}
				
				
				 if (n.business[g].paymethod.braintree == true)
				{
					m = "<?= $lang_resource['V3_ORDER_PAID_BRAIN'] ?> (<?=$lang_resource['V3_TRANSACTION']?> :"+a.collection_id+")";
				}
				
				
				 if (n.business[g].paymethod.paypaladaptive == true)
				{
					m = "<?= $lang_resource['V3_ORDER_PAID_PAYPAL_ADAPTIVE'] ?> ";
				}
				
				
                p += "<br/><span><?= $lang_resource['PAYMENT_METHOD_V2'] ?> " + m + "</span><br/><br/>";
				
				if(n.buyer.deliveryType) {
					
					if(n.buyer.deliveryType == "delivery")
					{
						var del_text = '<?= $lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE_DELIVERY'] ?>';
					}
					else if(n.buyer.deliveryType == "pickup")
					{
						
						var del_text = '<?= $lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE_PICKUP'] ?>';
					}
					
			    p += '<br/><span><b><?= $lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'] ?> :</b> '+del_text+' </span><br/>';
				}
				if(n.buyer.deliverydate) {
				p += '<br/><span><b><?= $lang_resource['V3_ORDER_DELIVERY_DATE'] ?> :</b> '+n.buyer.deliverydate+' </span><br/><br/>';
				}
				if(n.buyer.deliveryhours) {
						//Time selection settings. 
					time_format="<?=$lang_resource['TIME_FORMAT']?>";
					openclosetime=n.buyer.deliveryhours.split(" ");
					if(openclosetime.length>=2){
						set=false;
						for(i=0;i<openclosetime.length;i++ ){
								if(openclosetime[i]!=''){
									if(set==true){
										deliveryhours1=openclosetime[i];
									}
									set=true;
								}
							}
						
					}else{
						deliveryhours1=n.buyer.deliveryhours;
					}
				
					deliveryhours=deliveryhours1.split(":");
					  if(time_format=="12"){
							
							closetime1='';
							
							openclosetime1='';
							
							openclosetime1= Orders.convertTimeFormat(deliveryhours[0],n.buyer.deliveryminute);
							
				   }else{
					   openclosetime1=Orders.zeroPad((deliveryhours[0]),2)+' : '+Orders.zeroPad((n.buyer.deliveryminute),2);
				   }
				p += '<span><b><?= $lang_resource['V3_ORDER_DELIVERY_TIME'] ?> :</b> '+openclosetime1+' </span><br/><br/>';
				}
				
                p += '<table cellpadding="7" border="1" style="border-spacing:0;border-collapse:collapse;border-style:solid;" width="550"><tbody>';
                p += '<tr><td align="center"><?= $lang_resource['Item_V2'] ?></td><td align="center" colspan="2"><?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_HEADING'] ?></td><td align="center"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_COMMENTS'] ?></td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
                for (var f in n.business[g].dishes) {
                    p += "<tr>";
					p += '<td align="center"> '+ n.business[g].dishes[f].quantity +' x ' + n.business[g].dishes[f].name + "</td>";
                  
                    var c = new Array();
                    var l = new Array();
                    for (var e in n.business[g].dishes[f].ingredients) {
                        if (n.business[g].dishes[f].ingredients[e].enabled) {
                            c.push(n.business[g].dishes[f].ingredients[e].caption)
                        }
                    }
					
					
                    p += '<td align="center" colspan="2">' 
					if(n.business[g].dishes[f].options)  {
					p += Main.Margeslash(n.business[g].dishes[f].options);
					}
					
					
					
					
                   /* var d = 0;
                    for (e in c) {
                        if (d == 0) {
                            p += c[e]
                        } else {
                            p += ", " + c[e]
                        }
                        d++
                    }*/
                    p += "</td>";
                    c = new Array();
                    for (e in n.business[g].dishes[f].extras) {
                        if (n.business[g].dishes[f].extras[e].enabled) {
                            c.push(n.business[g].dishes[f].extras[e].name)
                        } else {
                            l.push(n.business[g].dishes[f].extras[e].name)
                        }
                    }
					
					
                    /*p += '<td align="center">';
                    d = 0;
                    for (e in c) {
                        if (d == 0) {
                            p += c[e]
                        } else {
                            p += ", " + c[e]
                        }
                        d++
                    }
                    p += "</td>";*/
					//alert(a.currency);
                    p += '<td align="center">' + Main.NullToEmpty(n.business[g].dishes[f].comments) + "</td>";
                    p += '<td align="center">'+a.currency+'' + n.business[g].dishes[f].total + "</td>";
                    p += "</tr>";
                    h = parseFloat(parseFloat(h) + parseFloat(n.business[g].dishes[f].total)).toFixed(Main.IS_DECIMAL_POINT)
                }
                h = parseFloat(parseFloat(h) + parseFloat(n.business[g].shipping)).toFixed(Main.IS_DECIMAL_POINT);
                var b = "<?= $lang_resource['DELIVERY_V2'] ?>";
                if (n.business[g].shipping == "0.00") {
                    b = "<?= $lang_resource['FREE_DELIVERY_V2'] ?>"
                }
                p += '<tr><td align="center">' + b + '</td><td colspan="2"></td><td align="center">' + Main.NullToEmpty(n.buyer.comments) + '</td><td align="center">'+a.currency+'' + parseFloat(n.business[g].shipping).toFixed(Main.IS_DECIMAL_POINT) + "</td></tr>";
                if(n.buyer.tips){
			    h = parseFloat(parseFloat(h) + parseFloat(n.buyer.tips)).toFixed(Main.IS_DECIMAL_POINT)
				p += '<tr><td align="center">Tips</td><td colspan="2"></td><td align="right"></td><td align="center"><?= $lang_resource['Panel_Currency'] ?>' + parseFloat(n.buyer.tips).toFixed(Main.IS_DECIMAL_POINT)  + "</td></tr>";
				}
					 if(n.servicefeeTotal1){
			  
				p += '<tr><td align="center"><?= $lang_resource['SERVICE_FEE_V2'] ?></td><td colspan="2"></td><td align="right"></td><td align="center">'+a.currency+'' + parseFloat(n.servicefeeTotal1).toFixed(Main.IS_DECIMAL_POINT)  + "</td></tr>";
				}
				/*discount code section */
					if(n.discounttype > 0)
					{
						if(n.discounttype == 1 && n.discountprice !='')
						{
							
						var discaption = '<?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?> ('+n.discountrate+'%)';
						}
						else
						{
						var discaption = '<?=$lang_resource['SHOPPING_DISCOUNT_TEXT'] ?> ';
						}
						if(n.discountprice !=''){
							 h = parseFloat(parseFloat(h) - parseFloat(n.discountprice)).toFixed(Main.IS_DECIMAL_POINT);
					   
					 p += '<tr><td align="center">' + discaption + '</td><td colspan="2"></td><td align="right">' + Main.NullToEmpty(n.discountcomments) + '</td><td align="center">'+a.currency+'' +parseFloat(n.discountprice).toFixed(Main.IS_DECIMAL_POINT)+ "</td></tr>";
						}
					}
					
					/*discount code section */
					
					if(n.tax) {		
					
					if(n.buyer.taxtype == 1)
		{
		var h = parseFloat(parseFloat(h)+ parseFloat(n.tax)).toFixed(Main.IS_DECIMAL_POINT);
		}
		if(n.buyer.taxtype == 1)
						{
						var taxcaption = '<?=$lang_resource['Tax_V2'] ?> (<?=$lang_resource['Tax_not_included_V2']?>)';
						}
						else
						{
						var taxcaption = '<?=$lang_resource['Tax_V2'] ?>  (<?=$lang_resource['Tax_included_V2']?>)';
						}
		 p += '<tr><td align="center">' + taxcaption + '</td><td colspan="2"></td><td align="right"></td><td align="center">'+a.currency+'' +parseFloat(n.tax).toFixed(Main.IS_DECIMAL_POINT)+ "</td></tr>";
		 
			}
                p += '<tr><td colspan="4" align="right"></td><td align="center" style="font-weight:bold;font-size:16">'+a.currency+'' + h + "</td></tr>";
                p += "</tbody></table>"
            }
        }
        p += "</td></tr>"
		}
		if(n.reservestatus){
		
		p +='<tr><td style="padding:20px;"><span style="font-weight:bold; font-size: 25px;"><?= $lang_resource['V3_ORDER_RESERVATION_DETAILS'] ?></span></td></tr>'
		
		
		p += '<tr><td style="padding:20px;">';
        p += '<span style="float:left;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_NAME'] ?> ' + Main.NullToEmpty(n.reserve.name) + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_EMAIL'] ?> " + Main.NullToEmpty(n.reserve.email) + "</span><br/>";
        p += "<span><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PHONE'] ?> " + Main.NullToEmpty(n.reserve.tel) + "</span><br/>"
		
			//Time selection settings. 
			time_format="<?=$lang_resource['TIME_FORMAT']?>";
			  if(time_format=="12"){
				   reservehours1= Orders.convertTimeFormat(n.reserve.rhour,n.reserve.rmin);
			  }else{
				  
				  reservehours1=Main.NullToEmpty(Orders.zeroPad((n.reserve.rhour),2)) + ':'+ Main.NullToEmpty(Orders.zeroPad((n.reserve.rmin),2));
			  }
		p += "<span><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?> " +Main.NullToEmpty(n.reserve.rdate) + "</span><br/>"
		p += "<span><?= $lang_resource['V3_ORDER_TIME'] ?> " + reservehours1+"</span><br/><br/><br/>"

        p += '<table cellpadding="7" border="1" style="border-spacing:0;border-collapse:collapse;border-style:solid;" width="550"><tbody>';
		
		/************************************************************Room part********************************************************************************/
		
		  p += '<tr>'
		p += '<td align="center"><?= $lang_resource['CONTROL_PANEL_GALLERY_TYPE_HEADER'] ?></td>'
		/*if(n.reserveQty.Room.length != 0)
		p += '<td align="center">Room</td>'
		if(n.reserveQty.Free.length != 0)
		p += '<td align="center">Free</td>'*/
		
		p += '<td align="center"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
		if(n.reserveQty.Room){
		if(n.reserveQty.Room.length != 0) {
        p += '<tr>'
		if(n.reserveQty.Room.length != 0)
		p += '<td align="center" style="font-weight: bold"><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></td>'
		/*if(n.reserveQty.Room.length != 0)
		p += '<td align="center">Room</td>'
		if(n.reserveQty.Free.length != 0)
		p += '<td align="center">Free</td>'*/
		
		p += '<td align="center" colspan="2"></td></tr>';
          //alert(n.reserveQty.Free)  
		            for(var rom = 0;rom <n.reserveQty.Room.length;rom++)  {
				    p += '<tr>'
					/*if(n.reserveQty.Table.length != 0)
					p +='<td align="center">'+n.reserveQty.Table+'</td>'*/
					if(n.reserveQty.Room.length != 0)
                    p += '<td align="center">'+n.reserveQty.Room[rom]+'</td>'
					/*
					if(n.reserveQty.Free.length != 0)
					 p += '<td align="center">'+n.reserveQty.Free+'</td>'*/
					 
					 
                    p += '<td align="center">'
					/*if(n.reserveQty.Table.length != 0)
					p += '<span>Table  </span><span>'+n.reserveQty.Table.length+'</span><span>  X  </span><span>'+a.tableprice+'</span><br>'*/
					if(n.reserveQty.Room.length != 0)
					p += '1'
					/*if(n.reserveQty.Free.length != 0)
					p += '<span>Free  </span><span>'+n.reserveQty.Free.length+'</span><span>  X  </span><span>'+a.freeprice+'</span><br>'	*/				
					p += '</td>'
					var roomprice = n.reserveQty.Room.length * a.roomprice ;
					/*var tableprice = n.reserveQty.Table.length * a.tableprice ;
				
					var freeprice = n.reserveQty.Free.length * a.freeprice ;*/
					p += '<td align="center">'
					if(roomprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+ parseFloat(a.roomprice).toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					/*if(tableprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice+'</span><br>'*/
					/*
					if(freeprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice+'</span><br>'*/
					
					p +='</td>'
                    p += "</tr>";
			}
		}
		
		}
			/************************************************************Room part********************************************************************************/	
		
		/************************************************************table part********************************************************************************/
		if(n.reserveQty.Table){
		
			if(n.reserveQty.Table.length != 0) {
        p += '<tr>'
		if(n.reserveQty.Table.length != 0)
		p += '<td align="center" style="font-weight: bold"><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></td>'
		/*if(n.reserveQty.Room.length != 0)
		p += '<td align="center">Room</td>'
		if(n.reserveQty.Free.length != 0)
		p += '<td align="center">Free</td>'*/
		 tablearry = new Array();
		
		 
		//p += '<td align="center">Quantity</td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
		p += '<td align="center" colspan="2"></td></tr>';
          //alert(n.reserveQty.Free)  
		         for(var tbl = 0;tbl <n.reserveQty.Table.length;tbl++)  {
				    p += '<tr>'
					if(n.reserveQty.Table.length != 0)
					p +='<td align="center">'+n.reserveQty.Table[tbl]+'</td>'
					/*if(n.reserveQty.Room.length != 0)
                    p += '<td align="center">'+n.reserveQty.Room+'</td>'
					if(n.reserveQty.Free.length != 0)
					 p += '<td align="center">'+n.reserveQty.Free+'</td>'*/
					 
					 
                    p += '<td align="center">'
					if(n.reserveQty.Table.length != 0)
					p += 1;
					/*if(n.reserveQty.Room.length != 0)
					p += '<span>Room  </span><span>'+n.reserveQty.Room.length+'</span><span>  X  </span><span>'+a.roomprice+'</span><br>'
					if(n.reserveQty.Free.length != 0)
					p += '<span>Free  </span><span>'+n.reserveQty.Free.length+'</span><span>  X  </span><span>'+a.freeprice+'</span><br>'	*/				
					p += '</td>'
					var tableprice = n.reserveQty.Table.length * a.tableprice ;
					/*var roomprice = n.reserveQty.Room.length * a.roomprice ;
					var freeprice = n.reserveQty.Free.length * a.freeprice ;*/
					p += '<td align="center">'
					if(tableprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+ parseFloat(a.tableprice).toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					/*if(roomprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice+'</span><br>'
					if(freeprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice+'</span><br>'*/
					
					p +='</td>'
                    p += "</tr>";
				 }
			}
		}
			/************************************************************table part********************************************************************************/	
			
			/************************************************************Free part********************************************************************************/
		if(n.reserveQty.Free){
		
			if(n.reserveQty.Free.length != 0) {
				
				
        p += '<tr>'
		/*if(n.reserveQty.Table.length != 0)
		p += '<td align="center">Table</td>'
		if(n.reserveQty.Room.length != 0)
		p += '<td align="center">Room</td>'
		*/
		   
			   
		if(n.reserveQty.Free.length != 0)
		p += '<td align="center" style="font-weight: bold"><?= $lang_resource['FRONT_RESERVATION_FREE'] ?></td>'
		
		//p += '<td align="center">Quantity</td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
			p += '<td align="center" colspan="2"></td></tr>';
          //alert(n.reserveQty.Free)  
		         for(var fre = 0;fre <n.reserveQty.Free.length;fre++)  {
				    p += '<tr>'
					/*if(n.reserveQty.Table.length != 0)
					p +='<td align="center">'+n.reserveQty.Table+'</td>'
					if(n.reserveQty.Room.length != 0)
                    p += '<td align="center">'+n.reserveQty.Room+'</td>'
					*/
					if(n.reserveQty.Free.length != 0)
					 p += '<td align="center">'+n.reserveQty.Free[fre]+'</td>'
					 
					 
                    p += '<td align="center">'
					/*if(n.reserveQty.Table.length != 0)
					p += '<span>Table  </span><span>'+n.reserveQty.Table.length+'</span><span>  X  </span><span>'+a.tableprice+'</span><br>'
					if(n.reserveQty.Room.length != 0)
					p += '<span>Room  </span><span>'+n.reserveQty.Room.length+'</span><span>  X  </span><span>'+a.roomprice+'</span><br>'
						*/		
						if(n.reserveQty.Free.length != 0)
					p += '1'		
					p += '</td>'
					/*var tableprice = n.reserveQty.Table.length * a.tableprice ;
					var roomprice = n.reserveQty.Room.length * a.roomprice ;
					*/
					
					var freeprice = n.reserveQty.Free.length * a.freeprice ;
					p += '<td align="center">'
					/*if(tableprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice+'</span><br>'
					if(roomprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice+'</span><br>'
					*/
					if(freeprice != 0)
					p += '<span><?= $lang_resource['Panel_Currency'] ?>  '+ parseFloat(a.freeprice).toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					
					p +='</td>'
                    p += "</tr>";
				}
			}
			
		}
			/************************************************************Free part********************************************************************************/			
					
                p += '<tr><td align="center">Total :</td><td></td><td align="center"><span style="font-weight: bold"><?= $lang_resource['Panel_Currency'] ?>  '+parseFloat(n.reserveFee).toFixed(Main.IS_DECIMAL_POINT)+'</span></td></tr>'
					
                p += "</tbody></table>"
        p += "</td></tr>"	
		
		}
		p+="</tbody></table></td></tr></tbody></table></center>";
        p += "</div>";
        p += "</div>";
        document.getElementById("leftcol").innerHTML = o;
        document.getElementById("main").innerHTML = p
    },
		//Time selection settings. 
	 convertTimeFormatHour:function(hour){
		
		str='PM';
		if(hour<12){
			str='AM';
		}
		hour=parseInt(hour)%12;
		return time=Orders.zeroPad((hour),2)+' '+str;
				
		
		
		
	},
	convertTimeFormat:function(hour,mints){
		
		str='PM';
		if(hour<12){
			str='AM';
		}
		hour=parseInt(hour)%12;
		return time=Orders.zeroPad((hour),2)+':'+Orders.zeroPad((mints),2)+' '+str;
				
		
		
		
	},	
	  zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
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
	
};
