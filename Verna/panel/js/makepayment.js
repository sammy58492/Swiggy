var IS_PAYPAL_ENABLED = 1;

var MakePayment = {

    Main: function (id1) {

        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
		$.post("lib/makepayment.php","f=FetchInvoiceData&id=" + id1, function (b) {

			var totalrecs = JSON.parse(b);


			 var d = new Array();
				d.push(JSON.parse('{"id":"-1","caption":""}'));
				for (var c in totalrecs) {

					var e = new Object();
					e.id = totalrecs[c].id;
					e.caption = totalrecs[c].caption;

					d.push(e);

				}

		    MakePayment.invovice= d;

			//return false

	});

        $.post("lib/makepayment.php", "f=FetchPaymentData&id=" + id1, function (c) {

            Main.Ready();
            if (c != "") {
                MakePayment.Orders =JSON.parse(c);
                MakePayment.PrintMain(id1)
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function (id1) {

        var c = new Array();
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var d = "";
		//alert(id1);
		//alert("oka")
		c.push(Visuals.CreateSubMenuItem("MakePayment.Payment("+id1+")", "<?=$lang_resource['SHOPPING_MAKE_PAYMENT']?>"));
		c.push(Visuals.CreateSubMenuItem("MakePayment.InvoiceList("+id1+")", "<?=$lang_resource['INVOICE_ORDER_INVOICE_DETAILS']?>"));

        a += Visuals.CreateSubMenu(c);
		//alert(a);// THIS IS LEFT MENU
        document.getElementById("leftcol").innerHTML = a;
        d += '<div class="contentbox" style="width:auto; !important">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt; <?=$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT']?></span>';
        d += "</div>";
        d += '<div class="table" style="width:900px; !important">';
        d += '<div class="title nonselectable">';
        d += '<div class="oid hand" onclick="MakePayment.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        //d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="businessprovider hand" onclick="MakePayment.PupulateTable(\'date\')"><span class="caption"><?=$lang_resource['INVOICE_DATE']?></span></div>';
        d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'business\')"><span class="caption"><?=$lang_resource['ORDERS_BOX_BUSINESS_HEADER']?></span></div>';
		d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'inviceid\')"><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_ID']?></span></div>';

		d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'invoicepay\')"><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_PAY']?></span></div>';

        d += '<div class="orderstatus hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'totalitem\')"><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_TOTAL_ITEM']?></span></div>';
		d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'payment\')"><span class="caption"><?=$lang_resource['INVOICE_PAYMENT']?></span></div>';
		d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'due\')"><span class="caption"><?=$lang_resource['INVOICE_DUE']?></span></div>';

        d += "</div>";
        d += '<div class="container" id="orders"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;

        document.getElementById("search").onkeyup = function () {
            MakePayment.PupulateTable("id", true)
        };

        MakePayment.PupulateTable("id", true)
    },
    PupulateTable: function (a, d) {

        var e = "";

      var j = this.Orders.length;

        if (!d) {
            Main.SaveConfig()
        }
        var l = false;
        var g = "";
		//alert(MakePayment.Orders);
	//alert(JSON.stringify(MakePayment.Orders));
        for (var f in this.Orders) {
			//alert(f);
			//alert(this.Orders[f]);


            l = false;
			//alert(f);
            g = document.getElementById("search").value.toLowerCase();
            if (String(MakePayment.Orders[f].id).toLowerCase().indexOf(g) >= 0 || MakePayment.Orders[f].date.toLowerCase().indexOf(g) >= 0 ) {
                l = true
            }
            if (g.indexOf(" a ") >= 0) {
                var b = g.split(" a ");
                var n = $.trim(b[0]).toLowerCase();
                var k = $.trim(b[1].toLowerCase());
                if (n != "" || k != "") {
                    var h = MakePayment.Orders[f].date.toLowerCase();
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
                e += '<div class="oid"><div class="cap"><span class="caption hand" >' + this.Orders[f].id  + "</span></div></div>";
               // e += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Orders[f].id + '"/></div>';
                e += '<div class="businessprovider"><div class="cap"><span class="caption hand" onclick="MakePayment.Edit(' + Main.NullToEmpty( this.Orders[f].id ) + ')">' + Main.NullToEmpty(this.Orders[f].date) + "</span></div></div>";
                e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].business_id) + "</span></div></div>";
				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].invoiceid) + "</span></div></div>";
				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].invoicepay) + "</span></div></div>";
				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].totalorder) + "</span></div></div>";
				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].payment) + "</span></div></div>";
				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].due) + "</span></div></div>";

               e += "</div>"
            }
        }

        document.getElementById("orders").innerHTML = e
    },

    PrintMain1: function (id1) {
        var c = new Array();
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var d = "";



		c.push(Visuals.CreateSubMenuItem("MakePayment.Main("+id1+")", "Cancel"));

        a += Visuals.CreateSubMenu(c);
		//alert(a);// THIS IS LEFT MENU
        document.getElementById("leftcol").innerHTML = a;
        d += '<div class="contentbox" style="width:auto; !important">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt; <?=$lang_resource['INVOICE_ORDER_INVOICE_DETAILS']?></span>';
        d += "</div>";
        d += '<div class="table" style="width:900px; !important">';
        d += '<div class="title nonselectable">';
        d += '<div class="oid hand" onclick="MakePayment.PupulateTable1(\'id\')"><span class="caption">#</span></div>';

        d += '<div class="businessprovider hand" onclick="MakePayment.PupulateTable(\'date\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_DATE_HEADER'] ?></span></div>';
        d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'cname\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_CITY_HEADER'] ?></span></div>';

		d += '<div class="ordercity hand" style="width:100px; !important" onclick="MakePayment.PupulateTable(\'resturant\')"><span class="caption"><?=$lang_resource['FRONT_VISUALS_RESTAURANT']?></span></div>';

        d += '<div class="orderstatus hand" style="width:70px; !important" onclick="MakePayment.PupulateTable(\'statustext\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_STATUS_HEADER'] ?></span></div>';
		d += '<div class="ordercity hand" style="width:130px; !important" onclick="MakePayment.PupulateTable(\'period\')"><span class="caption"><?=$lang_resource['INVOICE_PERIOD']?></span></div>';
		d += '<div class="ordercity hand" style="width:100px; !important" ><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_PAY']?></span></div>';
		d += '<div class="ordercity hand" style="width:100px; !important"><span class="caption"><?=$lang_resource['INVOICE_VIEW_PDF']?></span></div>';





        d += "</div>";
        d += '<div class="container" id="orders"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            MakePayment.PupulateTable1(Main.Config.Orders.List.SortBy, true,id1)
        };
        MakePayment.PupulateTable1(Main.Config.Orders.List.SortBy, true,id1)
    },
    PupulateTable1: function (a, d,bid) {
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
			if(bid == this.Orders[f].businessi)
			{
				l = true;
			}else{
				l = false;
			}

            g = document.getElementById("search").value.toLowerCase();
            if (String(this.Orders[f].id).toLowerCase().indexOf(g) >= 0 || this.Orders[f].date.toLowerCase().indexOf(g) >= 0 || this.Orders[f].city.name.toLowerCase().indexOf(g) >= 0) {
               // l = true
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
                e += '<div class="oid"><div class="cap"><span class="caption hand" >' + this.Orders[f].id + "</span></div></div>";

                e += '<div class="businessprovider"><div class="cap"><span class="caption hand">' + Main.NullToEmpty(this.Orders[f].date) + "</span></div></div>";

             	  e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
				 e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption hand">' + Main.NullToEmpty(this.Orders[f].resturant) + "</span></div></div>";

				e += '<div class="orderstatus" style="width:70px; border-right: 2px solid #e4e4e4; !important"><div class="cap"><span class="caption hand">' + Main.NullToEmpty(this.Orders[f].statustext) + "</span></div></div>";

				e += '<div class="ordercity" style="width:130px; !important"><div class="cap"><span class="caption hand">'+ Main.NullToEmpty(this.Orders[f].period) +  "</span></div></div>";

				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption hand">' + Main.NullToEmpty(this.Orders[f].invoicepay) + "</span></div></div>";

				e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption hand" onclick="MakePayment.Edit1(' + Main.NullToEmpty(this.Orders[f].id) + ','+bid+')"><a href="javascript:void(0)"><img src="../../images/panel/view.png" width="30" height="20"></a></span></div></div>';



                e += "</div>"
            }
        }

        document.getElementById("orders").innerHTML = e
    },
Payment: function (id1) {

	MakePayment.Form(id1);
},
InvoiceList: function (id1) {

		  $.post("lib/makepayment.php", "f=FetchAllOrdersDataE", function (c) {
			//alert(c)


            Main.Ready();
            if (c != "") {
                MakePayment.Orders = JSON.parse(c);

                for (var b in MakePayment.Orders) {

					MakePayment.Orders[b].cname = MakePayment.Orders[b].city.name
                }
                MakePayment.PrintMain1(id1)
            } else {
                alert("Error")
            }
        })

},
	Edit1: function (a,bid) {

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
            $.post("lib/invoicedtl.php", "f=FetchInvoiceDataForPdf&id=" + a, function (e) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
				//alert(e);
				//alert(JSON.parse(e))
                if (e != "") {
                    MakePayment.Form1(JSON.parse(e),bid)
                } else {
                    alert("Error")
                }
            })
        }
    },
	downpdf: function(i) {
		//alert(i);
		window.location='lib/invoice_pdf.php?oid='+i;
	 },
	InvoiceSave: function () {
       // alert(JSON.stringify(Forms.Form.invoiceorder));
        Main.Request("invoicedtl", null, "f=SaveInvoiceStatus&data=" + JSON.stringify(Forms.Form.invoiceorder), "Business.Main()");
	    Forms.Clean("invoiceorder")
    },
	 Form1: function (a,bid) {

		JSON.stringify(a);
		//alert(JSON.stringify(a));
		//alert(a.id)

        var o = "";
        var p = "";


        o += Visuals.CreateMainButton("<?=$lang_resource['INVOICE_SAVE']?>", "ok", "MakePayment.InvoiceSave()");
		o += Visuals.CreateMainButton("<?=$lang_resource['INVOICE_CANCEL']?>", "cancel", "MakePayment.PrintMain1( "+bid+")");
		o += Visuals.CreateMainButton("<?=$lang_resource['INVOICE_DOWNLOAD']?>", "download_inv", "MakePayment.downpdf( "+a.id+")");
        Forms.Clean("invoiceorder", "mainbuttonok");
        Forms.Form.invoiceorder.type = "modify";
        Forms.Form.invoiceorder.id = a.id;

        p += '<div class="contentbox">';
        p += '<div class="titlebox nonselectable">';
        p += '<span class="title">&gt;&gt; <?=$lang_resource['INVOICE_ORDER_INVOICE_INVOICE']?> ' + a.id + "</span>";
        p += "</div>";
        p += '<div class="editform">';
        p += '<div class="leftcol">';
       		 var q = new Array();
		q.push(JSON.parse('{"id":"-1","caption":""}'));
        q.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS']?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['INVOICE_PENDING_PAYMENT_TO']?> '+ a.resturant +'"}'));
		q.push(JSON.parse('{"id":"2","caption":"<?=$lang_resource['INVOICE_PAID_TO_OOS']?>"}'));
		q.push(JSON.parse('{"id":"3","caption":"<?=$lang_resource['INVOICE_PAID_TO']?> '+ a.resturant +'"}'));
        q.push(JSON.parse('{"id":"4","caption":"<?=$lang_resource['INVOICE_CANCELED']?>"}'));

        p += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_ADMIN_COMMENT']?></span><div class="inputbox">' + Forms.CreateSelectProperty("invoiceorder", "status", q, a.status,true) + "</div></div>";

		p += '<span class="caption" style="float:left;margin-left:4px;"><?=$lang_resource['INVOICE_ADMIN_COMMENTS']?>:</span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaPropertyD("invoiceorder", "admin_comment", Main.NullToEmpty(a.admin_comment), false, "", true, "comment") + "</div>"

        p += '<span class="caption" style="float:left;margin-left:4px;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_COMMENT'] ?></span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaProperty("invoiceorder", "comment", Main.NullToEmpty(a.comment), false, "", true, "comment") + "</div>";
        p += "</div>";
        p += "</div>";

        p += '<div style="float:left;width:100%;height:520px;overflow-y:auto;font-size:12px;">';
		p +='<center><div style="width:90%;">';
     	p +='<div style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; height:80px;">';
        p +='<div style="float:left; width:50%; line-height:17px; " align="left">';
        p +='<strong><font size="+2"><?=$lang_resource['INVOICE_ORDER']?>'+ a.id +'</font></strong><br>';
        p +='Invoice Date : '+ a.date +'.<br>';
        p +='Period : ( ' + a.periodp +' )';
        p +='</div>';
        p +='<div style="width:50%; float:left; " align="left">';
		c="";
		//alert(a.iid)
		if(a.isimg==1){
              c = 'images/logo/1/normal.jpg?c=' + new Date().getTime() ;
			}
			else{
				c= 'images/dummy/dummy_adbig.jpg';
		}
        p +='<img src="'+c+'" height="55"  >';
        p +='</div></div>';

		p +='<div style="margin:10px 0 0 0; line-height:17px; width:100%; height:130px;" align="left">';
		p +='<div style="float:left; float:left; width:50%;">';
		p +='<strong><font size="+1">'+ Main.NullToEmpty(a.resturant)+'</font></strong><br>';
		p +='<strong><font size="+1"></font>'+ Main.NullToEmpty(a.streetb)+'</strong><br>';
		p +='<strong><font size="+1"></font>'+ Main.NullToEmpty(a.colonyb)+'</strong><br>';
        p +='<strong>Phone :</strong>'+ Main.NullToEmpty(a.telb)+'<br>';


		p +='</div>';
		p +='<div style="width:50%; float:left;" align="right">';
        p +=''+ Main.NullToEmpty(a.address)+'<br>';

        p +='<strong><?=$lang_resource['INVOICE_TEL']?> :</strong>'+ Main.NullToEmpty(a.phone)+'<br>';
        p +='<strong><?=$lang_resource['INVOICE_EMAIL']?> :</strong>'+ Main.NullToEmpty(a.wbmail)+'<br>';
        p +='<strong><?=$lang_resource['INVOICE_WEBSITE']?> :</strong>'+ Main.NullToEmpty(a.wurl)+'<br>';
        p +='<strong><?=$lang_resource['INVOICE_VAT_REGISTRATION']?> :</strong>'+ Main.NullToEmpty(a.vatregistration);
        p +='</div>';
     	p +='</div>';

		p +='<div style="margin:10px 0 0 0; line-height:17px;">'+
    	'<table width="100%">'+
			'<tr>'+
            	'<td  style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:50%;"><strong><font size="+1.5"><?=$lang_resource['INVOICE_INVOICE_BREAKDOWN']?></font></strong></td>'+
                '<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:20%;"><strong></strong></td>'+
                '<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:30%; text-align:right;"><strong><font size="+1.5"><?=$lang_resource['INVOICE_AMOUNT']?></font></strong></td>'+
            '</tr>'+
            '<tr>'+
            	'<td><?=$lang_resource['INVOICE_TOTAL_VALUE_FOR']?></td>'+
                '<td>'+  Main.NullToEmpty(a.totalorder) +' <?=$lang_resource['INVOICE_ORDERS']?></td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.total_invoice)+'</td>'+
            '</tr>'+
            '<tr>'+
            	'<td><?=$lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR']?></td>'+
                '<td>' +  Main.NullToEmpty(a.cashcount) +' <?=$lang_resource['INVOICE_ORDERS']?></td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>' + Main.NullToEmpty(a.cashtotal) +'</td>'+
            '</tr>'+
			'<tr>'+
            	'<td><?=$lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR']?></td>'+
                '<td>' +   Main.NullToEmpty(a.paypalcount) +' <?=$lang_resource['INVOICE_ORDERS']?></td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>' + Main.NullToEmpty(a.paypaltotal) +'</td>'+
            '</tr>'+
            '<tr>'+
            	'<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;"><?=$lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR']?></td>'+
                '<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ">' +  Main.NullToEmpty(a.cardcount)  + ' <?=$lang_resource['INVOICE_ORDERS']?></td>'+
                '<td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;"><?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.cardtotal)+'</td>'+
            '</tr>'+

            '<tr>'+
            	'<td colspan="2" align="right">'+  Main.NullToEmpty(a.perordercommission)+'% <?=$lang_resource['INVOICE_COMMISSION_ON_ORDERS']?></td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+  Main.NullToEmpty(a.commisioncal) + '</td>'+
            '</tr>';
	if(a.setuprate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?=$lang_resource['INVOICE_SETUP_RATE']?> </td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+  Main.NullToEmpty(a.setuprate) + '</td>'+
            '</tr>';
	}
	if(a.fixedrate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?=$lang_resource['INVOICE_FIXED_RATE']?> </td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+  Main.NullToEmpty(a.fixedrate) + '</td>'+
            '</tr>';
	}
	if(a.fixedrate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?=$lang_resource['INVOICE_PER_ORDER_FIXED_RATE']?> </td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+  Main.NullToEmpty(a.orderrate) + '</td>'+
            '</tr>';
	}
	if(a.fixedrate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?=$lang_resource['INVOICE_OTHER_RATE']?> </td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+  Main.NullToEmpty(a.otherrate) + '</td>'+
            '</tr>';
	}

            p+='<tr>'+
            	'<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;"><?=$lang_resource['INVOICE_VAT']?> ('+ Main.NullToEmpty(a.vat)+'%):</td>'+
                '<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.vatp)+'</td>'+
            '</tr>'+
            '<tr>'+
            	'<td colspan="2" align="right">Total amount owed to:</td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.totalbalance)+'</td>'+
            '</tr>'+
            '<tr>';
			 var paymenttotal='';
			 var duepayment = '';

			for (var c in a.mapayment)
        	 {
				 paymenttotal += Main.NullToEmpty(a.mapayment[c].payment);
				 duepayment = Main.NullToEmpty(a.mapayment[c].pdue);
			 }
			if(paymenttotal==0){
			p +='<td colspan="2" align="right">Total owned from restrunt (<?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.totalbalance)+' - <?=$lang_resource['INVOICE_CURRENCY']?>0.00):</td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.totalbalance)+'</td>';
			}else{
            p +='<td colspan="2" align="right"><?=$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT']?> (<?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.totalbalance)+' - $'+ paymenttotal+'):</td>'+
                '<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+ duepayment+'</td>';
			}
            p += '</tr>'+
            '<tr>'+
            	'<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;"><?=$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED']?></td>'+
                '<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">$'+a.totalinvoicedue+'</td>'+
           '</tr>'+
             '<tr>';
            	p +='<td colspan="2" align="right"><strong><?=$lang_resource['INVOICE_ORDER_TOTAL_PAYABLE_TO_OOS']?>:</strong></td>';
                p +='<td align="right"><?=$lang_resource['INVOICE_CURRENCY']?>'+ Main.NullToEmpty(a.totalpay)+'</td></tr></table>';
     p +='</div>';


	  p +='<div style="width:100%; margin:10px 0 0 0; float:left;" align="left">'+
      	'<?=$lang_resource['INVOICE_QUESTIONS']?> <a href="#"><?=$lang_resource['INVOICE_SUPPORT_EMAIL']?></a>'+
      '</div>';



	  p +='<div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#666; height:50px;" align="left">'+
          '<?=$lang_resource['INVOICE_ORDER_INVOICE_INFORMATION_PAYMENT']?> : <a href="#"><?=$lang_resource['INVOICE_SUPPORT_EMAIL']?></a>'+
       '</div>';

	   	   p +='<div style="width:35%; margin:5px 0 0 0; float:left;" align="left">'+
      	'<strong><font size="+2"><?=$lang_resource['INVOICE_PAYMENT_DETAILS']?></font></strong>'+
      '</div>';

	  p +='<br clear="all">';
	  if(a.payby == 1){
      p +='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">'+
      '<table width="100%">'+
	  			'<tr align="center">'+

                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong><?=$lang_resource['INVOICE_PAYMENT_TYPE']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong><?=$lang_resource['INVOICE_BANK_NAME']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_BANK_AC_NO']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_ROUTINE_NO']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_SWIFT_CODE']?></strong></td>'+
            '</tr>'+
            '<tr bgcolor="#FFD9B3">'+

                '<td align="center"><strong>'+ Main.NullToEmpty(a.pay)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.bankname)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.bankac)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.routineno)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.swiftcode)+'</strong></td>'+
            '</tr>'+
       '</table>'+
      '</div>';
	  }else{
	  	p +='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">'+
      '<table width="100%">'+
	  			'<tr align="center">'+

                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong><?=$lang_resource['INVOICE_PAYMENT_TYPE']?></strong></td>'+

                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_EMAIL_ADDRESS']?></strong></td>'+
				'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['SHOPPING_FOURTH_PAYMENT_PAYPAL']?></strong></td>'+
            '</tr>'+
            '<tr bgcolor="#FFD9B3">'+

                '<td align="center"><strong>'+ Main.NullToEmpty(a.pay)+'</strong></td>'+

                '<td align="center"><strong>'+ Main.NullToEmpty(a.vatpaypalemail)+'</strong></td>'+
				'<td align="center"><strong><span><a href="<?=$configRec['siteurl']?>/panel/js/paymentoption.php?id='+ a.id +'"><img src="../../images/panel/paypal.png" ></a></span></strong></td>'+
            '</tr>'+
       '</table>'+
      '</div>';
	  }



	   p +='<div style="width:30%; margin:5px 0 0 0; float:left;" align="left">'+
      	'<strong><font size="+2"><?=$lang_resource['Order_details_V2']?></font></strong>'+
      '</div>';

	  p +='<br clear="all">';

      p +='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">'+
      '<table width="100%">'+
			'<tr align="center">'+
            	'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:5%"><strong>#</strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong><?=$lang_resource['INVOICE_DATE']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong><?=$lang_resource['INVOICE_ORDER_NO']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_PAID']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_TOTAL_VALUE']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_PAYMENT']?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?=$lang_resource['INVOICE_DUE']?></strong></td>'+
				'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong><?=$lang_resource['INVOICE_COMMISSION']?> (%)</strong></td>'+
				'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong><?=$lang_resource['INVOICE_FIXED_RATE']?></strong></td>'+
            '</tr>';

	 if(a.mapayment.length == 0){
	  		p+='<tr bgcolor="#FFD9B3"><td align="center" colspan="9"><strong><?=$lang_resource['INVOICE_NO_RECORD_FOUND']?></strong></td></tr>';
	  }

		 for (var b in a.mapayment)
         {
			// alert(a.mapayment[b].mpid)


            p+='<tr bgcolor="#FFD9B3">'+
            	'<td align="center"><strong>'+ Main.NullToEmpty(a.mapayment[b].mpid)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.mapayment[b].mpdate)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.mapayment[b].mpid)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.pay)+'</strong></td>'+
                '<td align="right"><strong>$'+ Main.NullToEmpty(a.mapayment[b].mpinvoicepay)+'</strong></td>'+
                '<td align="right"><strong>$'+ Main.NullToEmpty(a.mapayment[b].payment)+'</strong></td>'+
                '<td align="right"><strong>$'+ Main.NullToEmpty(a.mapayment[b].pdue)+'</strong></td>'+
				'<td align="right"><strong>'+ Main.NullToEmpty(a.perordercommission)+'</strong></td>'+
				'<td align="right"><strong>$'+ Main.NullToEmpty(a.perorderfixedrate)+'</strong></td>'+
            '</tr>';


		 }



      p+='</table>'+
      '</div>';


		p +='</div>';

		p +='<br clear="all">';

  p+= '<div align="left" style="width:100%; height:40px; margin-top:10px; border-top-width:15px; border-top-style:outset; border-top-color:#333333;">'+
  '<?=$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS']?> '+Main.NullToEmpty(a.perorderfixedrate)+' <?=$lang_resource['INVOICE_PER_ORDER']?>'+
  '</div>';


	p +='</center>';


        p += "</td></tr></tbody></table></td></tr></tbody></table></center>";
        p += "</div>";
        p += "</div>";
        document.getElementById("leftcol").innerHTML = o;
        document.getElementById("main").innerHTML = p
    },

Form: function (e) {
	//alert(JSON.stringify(e));
	//alert(e.businessi);
	JSON.stringify(e);
	    var j = "";
        var k = "";

        j += Visuals.CreateMainButton("Payment", "ok",  "MakePayment.Save()");
       // j += Visuals.CreateMainButton("Cancel", "cancel", "MakePayment.PrintMain("+e+")");

        Forms.Clean("payment", "mainbuttonok");
		 Uploader.Clean();
        if (e == null) {
		//	alert('1');
            e = new Object();
            Forms.Form.payment.type = "create";
			j += Visuals.CreateMainButton("Cancel", "cancel", "MakePayment.PrintMain("+e+")");
        } else {
			//alert('2');
            Forms.Form.payment.type = "modify";
            Forms.Form.payment.id = e.id;
			j += Visuals.CreateMainButton("Cancel", "cancel", "MakePayment.PrintMain("+e.businessi+")");
        }

        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';

        k += '<span class="title">&gt;&gt; <?=$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_OPTION']?> </span>'

        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft" style="width: 640px; !important">';
		k +='<input type="hidden" value="'+Main.NullToEmpty(e.totalinvoice)+'" id="business_id" name="business_id">';
        k += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_INVOICE']?> :</span><div class="inputbox">' + Forms.CreateSelectProperty2("payment", "invoice_id",MakePayment.invovice, e.invoice_id,true, "MakePayment.InvoiceDetails(this);", true, "hand") + "</div></div>";

		k += '<div class="row"><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_INVOICE_AMOUNT']?> :</span><div class="inputbox" style="float: right; margin-right: 8px; !important">' + Main.NullToEmpty(e.invoicepay) +"</div></div>";

		/*k += '<div class="row"><span class="caption">Due Amount :</span><div class="inputbox" style="float: right; margin-right: 8px; !important">'+e.pdue+"</div></div>";*/

         k += '<div class="row" ><span class="caption"><?=$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_AMOUNT']?> :</span><div class="inputbox" style="margin-right: -7px; float: right;!important">' + Forms.CreateInputProperty("payment", "payment", '', true) + "</div></div>";


        k += "</div>";

        k += "</div>";
        k += "</div>";
        k += "</div>";

        document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;


        $("#name").focus()
	},

 InvoiceDetails: function (a)
    {

		console.log(a.value);
		var cntry = a.value;
			$.post("lib/makepayment.php","f=FetchInvoiceDataAll&id=" + cntry, function (e) {

          //	alert(e);
			  if (e != "") {
                    MakePayment.Form(JSON.parse(e))
                } else {
                    alert("Error")
                }
			})
	},





 Save: function () {

        if (Forms.CanSave("payment") == false) {
            return
        }

		  Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
		//	alert(JSON.stringify(Forms.Form.payment));

	  $.post("lib/makepayment.php", "f=SaveMakePayment&data=" + JSON.stringify(Forms.Form.payment), function (e) {
		      console.log(e);

                Main.Ready();
				//alert(e);
				if(e == "cancel") {
                    swal("Error","<?= $lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_ALERT'] ?>","error");
				}else{
				var str = e;
				MakePayment.Main(str.trim());
				}
            })

        Forms.Clean("payment")
    },

};
