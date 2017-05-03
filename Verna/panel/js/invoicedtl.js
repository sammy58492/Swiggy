var IS_PAYPAL_ENABLED = 1;

var InvoiceDtl = {
    Main: function () {

        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
		$.post("lib/invoicedtl.php", "f=FetchAllRestData", function (b) {


                       InvoiceDtl.restaurants = JSON.parse(b);

                       //return false

                       })
        $.post("lib/invoicedtl.php", "f=FetchAllOrdersData", function (c) {


            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                InvoiceDtl.Orders = JSON.parse(c);
                for (var b in InvoiceDtl.Orders) {
                    InvoiceDtl.Orders[b].cname = InvoiceDtl.Orders[b].city.name
                }
                InvoiceDtl.PrintMain()
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
		c.push(Visuals.CreateSubMenuItem("InvoiceDtl.New()", "<?=$lang_resource['INVOICE_CREATE']?>"));
	    c.push(Visuals.CreateSubMenuItem("InvoiceDtl.Edit()", "Edit Invoice"));
		c.push(Visuals.CreateSubMenuItem("InvoiceDtl.Conf()", "<?=$lang_resource['INVOICE_CONFIGURATION']?>"));

		c.push(Visuals.CreateSubMenuItem("InvoiceDtl.SendReminder()", "<?=$lang_resource['INVOICE_SEND_REMINDER']?>"));


        b.push({
            caption: "<?= $lang_resource['INVOICE_DETAILS'] ?>",
            link: "InvoiceDtl.Export(0)"
        });
   /*     b.push({
            caption: "Client data",
            link: "InvoiceDtl.Export(1)"
        });*/
        c.push(Visuals.CreateSubMenuItem("", "<?= $lang_resource['INVOICE_EXPORT'] ?>", b));
        if (Main.User.level < 2) {
            c.push(Visuals.CreateSubMenuItem("InvoiceDtl.Delete()", "<?= $lang_resource['INVOICE_DELETE'] ?>"))
        }
        a += Visuals.CreateSubMenu(c);
		//alert(a);// THIS IS LEFT MENU
        document.getElementById("leftcol").innerHTML = a;
        d += '<div class="contentbox" style="width:auto; !important">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt; <?= $lang_resource['INVOICE_INVOICES'] ?></span>';
        d += "</div>";
        d += '<div class="table" style="width:900px; !important">';
        d += '<div class="title nonselectable">';
        d += '<div class="oid hand" onclick="InvoiceDtl.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="businessprovider hand" onclick="InvoiceDtl.PupulateTable(\'date\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_DATE_HEADER'] ?></span></div>';
        d += '<div class="ordercity hand" style="width:100px; !important" onclick="InvoiceDtl.PupulateTable(\'cname\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_CITY_HEADER'] ?></span></div>';

		d += '<div class="ordercity hand" style="width:100px; !important" onclick="InvoiceDtl.PupulateTable(\'resturant\')"><span class="caption">Resturant</span></div>';

        d += '<div class="orderstatus hand" style="width:140px; !important" onclick="InvoiceDtl.PupulateTable(\'statustext\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ORDERS_STATUS_HEADER'] ?></span></div>';
		d += '<div class="ordercity hand" style="width:130px; !important" onclick="InvoiceDtl.PupulateTable(\'period\')"><span class="caption"><?= $lang_resource['INVOICE_PERIOD'] ?></span></div>';
		d += '<div class="ordercity hand" style="width:80px; !important" onclick="InvoiceDtl.PupulateTable(\'tinvoice\')"><span class="caption"><?= $lang_resource['INVOICE_TOTAL'] ?></span></div>';
		d += '<div class="ordercity hand" style="width:50px; !important" onclick="InvoiceDtl.PupulateTable(\'resturant\')"><span class="caption"><?= $lang_resource['INVOICE_VIEW_PDF'] ?></span></div>';




        d += "</div>";
        d += '<div class="container" id="orders"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            InvoiceDtl.PupulateTable(Main.Config.Orders.List.SortBy, true)
        };
        InvoiceDtl.PupulateTable(Main.Config.Orders.List.SortBy, true)
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
                e += '<div class="oid"><div class="cap"><span class="caption hand" >' + this.Orders[f].id + "</span></div></div>";
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
							closetime1= InvoiceDtl.convertTimeFormat(closetime[0],closetime[1]);
							openclosetime1=openclosetime[0]+' '+closetime1;
				   }else{
					   openclosetime1=this.Orders[f].date;
				   }
                e += '<div class="businessprovider"><div class="cap"><span class="caption hand" >' + Main.NullToEmpty(openclosetime1) + "</span></div></div>";
        /*        if (Main.User.level == 0) {
                    e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
                } else {
                    e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
                }*/
             	  e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Orders[f].city.name) + "</span></div></div>"
				 e += '<div class="ordercity" style="width:100px; !important"><div class="cap"><span class="caption hand" >' + Main.NullToEmpty(this.Orders[f].resturant) + "</span></div></div>";

				e += '<div class="orderstatus" style="width:140px; border-right: 2px solid #e4e4e4; !important"><div class="cap"><span class="caption hand" >' + Main.NullToEmpty(this.Orders[f].statustext) + "</span></div></div>";

				e += '<div class="ordercity" style="width:130px; !important"><div class="cap"><span class="caption hand" >'+ Main.NullToEmpty(this.Orders[f].period) +  "</span></div></div>";

				e += '<div class="ordercity" style="width:80px; !important"><div class="cap"><span class="caption hand" >' + Main.NullToEmpty(this.Orders[f].tinvoice) + "</span></div></div>";

				e += '<div class="ordercity" style="width:50px; !important"><div class="cap"><span class="caption hand" onclick="InvoiceDtl.Edit1(' + Main.NullToEmpty(this.Orders[f].id) + ')"><a href="javascript:void(0)"><img src="../../images/panel/view.png" width="30" height="20"></a></span></div></div>';


                e += "</div>"
            }
        }
        e += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        e += '<input type="hidden" name="f" value="ExportInvoice"/>';
        e += '<input id="exp_data" type="hidden" name="data" value=""/>';
        e += '<input type="hidden" name="name" value="Invoice"/>';
        e += "</form>";
        document.getElementById("orders").innerHTML = e
    },
 //Time selection settings. 
	convertTimeFormat:function(hour,mints){
		
		str='PM';
		if(hour<12){
			str='AM';
		}
		hour=parseInt(hour)%12;
		return time=InvoiceDtl.zeroPad((hour),2)+':'+InvoiceDtl.zeroPad((mints),2)+' '+str;
				
		
		
		
	},	
	  zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   },

	    New: function () {

        var a = this;

		$.post("lib/invoicedtl.php", "f=FetchAllRestData", function (b) {
                      // alert(b);

                       var totalrec = JSON.parse(b);
                        var d = new Array();
                               d.push(JSON.parse('{"id":"-1","caption":""}'));
                               for (var c in totalrec) {
                                       var e = new Object();
                                       e.id = totalrec[c].id;
                                       e.caption = totalrec[c].caption ;
                                       d.push(e)
                               }

               InvoiceDtl.restaurants = d;
                      // alert(JSON.stringify(d))
                       //return false

                       })

			 Main.GetFranchisesData("InvoiceDtl.Form()")
    },
	Conf: function () {

		$.post("lib/invoicedtl.php", "f=FetchInvoiceConf" , function (e) {
			 Main.Ready();

			 var a = this;



			InvoiceDtl.Form2(JSON.parse(e));
		});

    },

    Edit: function (a) {
		//alert(a);
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
            $.post("lib/invoicedtl.php", "f=FetchInvoiceData&id=" + a, function (e) {
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
				//alert(e);
				InvoiceDtl.PreEdit(e);
                if (e != "") {
                    InvoiceDtl.Form(JSON.parse(e))
                } else {
                    alert("Error")
                }

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
		   if(a.billing==1) {
             document.getElementById("billingfxprice_s").style.display = "none";
            document.getElementById("billingfx_s").style.display = "none";
            document.getElementById("billingperorder_s").style.display = "none";
            document.getElementById("billingperorderfixrate_s").style.display = "none";
			 document.getElementById("vat_s").style.display = "none";
			document.getElementById("otherrate_s").style.display = "none";
			}
			else if(a.billing==2)
			{
			   document.getElementById("billingfxprice_s").style.display = "";
            document.getElementById("billingfx_s").style.display = "";
            document.getElementById("billingperorder_s").style.display = "";
            document.getElementById("billingperorderfixrate_s").style.display = "";
			document.getElementById("vat_s").style.display = "";
			document.getElementById("otherrate_s").style.display = "";
			}
    },
	 BillingOption: function (a) {
		//alert(JSON.stringify(a));
        if(a == 1)
		{
			document.getElementById("billingfxprice_s").style.display = "none";
            document.getElementById("billingfx_s").style.display = "none";
            document.getElementById("billingperorder_s").style.display = "none";
            document.getElementById("billingperorderfixrate_s").style.display = "none";
			document.getElementById("vat_s").style.display = "none";
			document.getElementById("otherrate_s").style.display = "none";


		}
		else if(a == 2)
		{

			document.getElementById("billingfxprice_s").style.display = "";
            document.getElementById("billingfx_s").style.display = "";
            document.getElementById("billingperorder_s").style.display = "";
            document.getElementById("billingperorderfixrate_s").style.display = "";
			document.getElementById("vat_s").style.display = "";
			document.getElementById("otherrate_s").style.display = "";


		}
		else
		{
			document.getElementById("billingfxprice_s").style.display = "none";
            document.getElementById("billingfx_s").style.display = "none";
            document.getElementById("billingperorder_s").style.display = "none";
            document.getElementById("billingperorderfixrate_s").style.display = "none";
			document.getElementById("vat_s").style.display = "none";
			document.getElementById("otherrate_s").style.display = "none";

		}
    },


	Form: function (e) {

		//alert(JSON.stringify(e))

		//alert(JSON.stringify(this.restaurants));

		 MultipleInput.AddListener("tagschange", "InvoiceDtl.MultiInputTagsChange");


        var j = "";
        var k = "";
        j += Visuals.CreateMainButton("Save", "ok", "InvoiceDtl.PreSave()");
        j += Visuals.CreateMainButton("Cancel", "cancel", "InvoiceDtl.PrintMain()");
        Forms.Clean("invoice", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.invoice.type = "create";
			e.billing="";
        } else {
            Forms.Form.invoice.type = "modify";
            Forms.Form.invoice.id = e.id
        }
		 //Forms.Form.ad.ad = e;
        this.ActiveForm = "invoice";

        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.invoice.type == "create") {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['INVOICE_CREATE'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['INVOICE_EDIT'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol" style="width:638px; !important">';


         k += '<div class="row" ><span class="caption"><?= $lang_resource['ORDERS_BOX_BUSINESS_HEADER'] ?> : </span><div class="inputbox">'+ Forms.CreateSelectProperty("invoice", "businessi", InvoiceDtl.restaurants, e.businessi, true, "", true) +"</div></div>";




		 k += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_DATE_RANGE'] ?>: </span><div class="inputbox">'+ Forms.CreateInputPropertyDate("invoice", "dfrm", e.dfrm, false) +'</div><span style="margin-left: 32px; !important">   To   </span><div class="inputbox">' + Forms.CreateInputPropertyDate("invoice", "tfrm", e.tfrm, false) + "</div></div>";

	var g="";
		var b="";


		g ='[{"id":" ","caption":"<?= $lang_resource['MOBILE_MYACCOUNT_SELECT_ONE'] ?>"},{"id":"1","caption":"<?= $lang_resource['INVOICE_ORDER_BILLING_TAB'] ?>"},{"id":"2","caption":"<?= $lang_resource['INVOICE_ORDER_MANUAL'] ?>"}]';
        g = JSON.parse(g);

		k += '<div class="row" ><span class="caption"><?= $lang_resource['INVOICE_SELECT_BILLING_OPTION'] ?> : </span><div class="inputbox">'+ Forms.CreateSelectProperty("invoice", "billing", g, e.billing, true, "InvoiceDtl.BillingOption(this.value)", false) +"</div></div>";

 if (Forms.Form.invoice.type == "modify") {
         if(e.billing==2)
		 {

         k += '<div class="row" id="billingfxprice_s" ><span class="caption"><?= $lang_resource['INVOICE_SETUP_RATE_FIXED_PRICE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "setuprate", Main.NullToEmpty(e.setuprate), false) + "</div></div>";
		 k += '<div class="row" id="billingfx_s"><span class="caption"><?= $lang_resource['INVOICE_FIXED_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "fixedrate", Main.NullToEmpty(e.fixedrate), false) + "</div></div>";
		 k += '<div class="row" id="billingperorder_s"><span class="caption"><?= $lang_resource['INVOICE_RER_ORDER_COMMISSION_PERCENTAGE'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "perordercommission", Main.NullToEmpty(e.perordercommission), false) + "</div></div>";
		 k += '<div class="row" id="billingperorderfixrate_s"><span class="caption"><?= $lang_resource['INVOICE_PER_ORDER_FIXED_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "perorderfixedrate", Main.NullToEmpty(e.perorderfixedrate), false) + "</div></div>";
		 k += '<div class="row" id="vat_s"><span class="caption"><?= $lang_resource['INVOICE_VAT'] ?> (%) :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "vat", Main.NullToEmpty(e.vat), false) + "</div></div>";
		 k += '<div class="row" id="otherrate_s"  ><span class="caption"><?= $lang_resource['INVOICE_OTHER_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "otherrate", Main.NullToEmpty(e.otherrate), false) + "</div></div>";

		 }else{

				     k += '<div class="row" id="billingfxprice_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_SETUP_RATE_FIXED_PRICE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "setuprate", Main.NullToEmpty(e.setuprate), false) + "</div></div>";
		 k += '<div class="row" id="billingfx_s"  style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_FIXED_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "fixedrate", Main.NullToEmpty(e.fixedrate), false) + "</div></div>";
		 k += '<div class="row" id="billingperorder_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_RER_ORDER_COMMISSION_PERCENTAGE'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "perordercommission", Main.NullToEmpty(e.perordercommission), false) + "</div></div>";
		 k += '<div class="row" id="billingperorderfixrate_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_PER_ORDER_FIXED_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "perorderfixedrate", Main.NullToEmpty(e.perorderfixedrate), false) + "</div></div>";
		 k += '<div class="row" id="vat_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_VAT'] ?> (%) :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "vat", Main.NullToEmpty(e.vat), false) + "</div></div>";
		 k += '<div class="row" id="otherrate_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_OTHER_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "otherrate", Main.NullToEmpty(e.otherrate), false) + "</div></div>";
			 }
 }else{

			         k += '<div class="row" id="billingfxprice_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_SETUP_RATE_FIXED_PRICE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "setuprate", Main.NullToEmpty(e.setuprate), false) + "</div></div>";
		 k += '<div class="row" id="billingfx_s"  style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_FIXED_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "fixedrate", Main.NullToEmpty(e.fixedrate), false) + "</div></div>";
		 k += '<div class="row" id="billingperorder_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_RER_ORDER_COMMISSION_PERCENTAGE'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "perordercommission", Main.NullToEmpty(e.perordercommission), false) + "</div></div>";
		 k += '<div class="row" id="billingperorderfixrate_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_PER_ORDER_FIXED_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "perorderfixedrate", Main.NullToEmpty(e.perorderfixedrate), false) + "</div></div>";
		 k += '<div class="row" id="vat_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_VAT'] ?> (%) :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "vat", Main.NullToEmpty(e.vat), false) + "</div></div>";
		 k += '<div class="row" id="otherrate_s" style="display:none;" ><span class="caption"><?= $lang_resource['INVOICE_OTHER_RATE'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("invoice", "otherrate", Main.NullToEmpty(e.otherrate), false) + "</div></div>";
			 }
        k += "</div>";
		 k += "</div>";
        k += "</div>";



		 document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;

	$('#dfrm').datepick();
	 $("#tfrm").datepick();

    /*$("#dfrm").datepicker();
    $("#tfrm").datepicker();
*/
		$.post("lib/invoicedtl.php", "f=FetchAllRestData", function (b) {


			InvoiceDtl.restaurants = JSON.parse(b);

			})
		  MultipleInput.Init("business",InvoiceDtl.restaurants, true);
		  if (Forms.Form.invoice.type == "modify") {
				if (Forms.Form.invoice.invoice.business != "") {
					var d = JSON.parse(Forms.Form.invoice.invoice.business);
					for (var e in d) {
						MultipleInput.AddTagById("business", d[e])
					}
					Forms.Form.invoice.fields.business.save = false
				}
		   }




        $("#name").focus()
    },
	Form2: function (e) {

	    var j = "";
        var k = "";

        j += Visuals.CreateMainButton("Save", "ok",  "InvoiceDtl.SaveInvoiceConf()");
        j += Visuals.CreateMainButton("Cancel", "cancel", "InvoiceDtl.PrintMain()");

        Forms.Clean("iconf", "mainbuttonok");
		 Uploader.Clean();
        if (e == null) {

            e = new Object();
            Forms.Form.iconf.type = "create"
        } else {
            Forms.Form.iconf.type = "modify";
            Forms.Form.iconf.id = e.id
        }

        k += '<div class="contentbox">';
        k += '<div class="titlebox nonselectable">';
        if (Forms.Form.iconf.type == "create") {

            k += '<span class="title">&gt;&gt; <?= $lang_resource['INVOICE_CONFIGURATION'] ?></span>'
        } else {
            k += '<span class="title">&gt;&gt; <?= $lang_resource['INVOICE_CONFIGURATION'] ?></span>'
        }
        k += "</div>";
        k += '<div class="editform">';
        k += '<div class="leftcol adleft">';
        k += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_BILLING_MAIL'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "wbmail", e.wbmail, true) + "</div></div>";
		k += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_WEBSITE_URL'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "wurl", e.wurl, true) + "</div></div>";
		k += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_ADDRESS'] ?> :</span><div class="inputbox">' + Forms.CreateTextAreaPropertyIconf("iconf", "address", e.address, true) + "</div></div>";
		k += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_PHONE'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "phone", e.phone, true) + "</div></div>";

		k += '<div class="row"><span class="caption titlebox "><b><?= $lang_resource['INVOICE_PAYMENT_METHOD'] ?></b></span></div>';


		 if (Forms.Form.iconf.type == "modify") {
			 b = "";
        }
        else {
            b = '{"id":"-1","caption":""},'
        }
        // b = '{"id":"-1","caption":""},'
         g = "[" + b + '{"id":"1","caption":"<?= $lang_resource['INVOICE_BANK'] ?>"},{"id":"2","caption":"<?= $lang_resource['INVOICE_PAYPAL'] ?>"}]';
         g = JSON.parse(g);

        k += '<div class="row" ><span class="caption"><?= $lang_resource['INVOICE_SELECT_PAYMENT_TYPE'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("iconf", "payby", g, e.payby, false, "InvoiceDtl.TypeChanged(this.value)", false) + "</div></div>";


 		if (Forms.Form.iconf.type == "modify") {
         if(e.payby==1)
		 {
         k += '<div class="row" id="bankname_s"><span class="caption"><?= $lang_resource['INVOICE_BANK_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "bankname", e.bankname, false) + "</div></div>";
         k += '<div class="row" id="bankac_s" ><span class="caption"><?= $lang_resource['INVOICE_BANK_AC_NO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "bankac", e.bankac, false) + "</div></div>";
         k += '<div class="row" id="routineno_s"><span class="caption"><?= $lang_resource['INVOICE_ROUTINE_NO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "routineno", e.routineno, false) + "</div></div>";
         k += '<div class="row" id="swiftcode_s"><span class="caption"><?= $lang_resource['INVOICE_SWIFT_CODE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "swiftcode", e.swiftcode, false) + "</div></div>";

          k += '<div class="row" id="vatpaypalemail_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "vatpaypalemail", e.vatpaypalemail, false) + "</div></div>";

         }
 		 if(e.payby==2)
		 {
          k += '<div class="row" id="bankname_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_BANK_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "bankname", e.bankname, false) + "</div></div>";
         k += '<div class="row" id="bankac_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_BANK_AC_NO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "bankac", e.bankac, false) + "</div></div>";
         k += '<div class="row" id="routineno_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_ROUTINE_NO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "routineno", e.routineno, false) + "</div></div>";
         k += '<div class="row" id="swiftcode_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_SWIFT_CODE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "swiftcode", e.swiftcode, false) + "</div></div>";

  k += '<div class="row" id="vatpaypalemail_s"><span class="caption"><?= $lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "vatpaypalemail", e.vatpaypalemail, false) + "</div></div>";
  }
  }else{


         k+= '<div class="row" id="bankname_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_BANK_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "bankname", e.bankname, false) + "</div></div>";
         k += '<div class="row" id="bankac_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_BANK_AC_NO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "bankac", e.bankac, false) + "</div></div>";
        k  += '<div class="row" id="routineno_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_ROUTINE_NO'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "routineno", e.routineno, false) + "</div></div>";
         k += '<div class="row" id="swiftcode_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_SWIFT_CODE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "swiftcode", e.swiftcode, false) + "</div></div>";

         k += '<div class="row" id="vatpaypalemail_s" style="display:none;"><span class="caption"><?= $lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("iconf", "vatpaypalemail", e.vatpaypalemail, false) + "</div></div>";

         }


		 k += '<div class="row"><span class="caption titlebox "><b><?= $lang_resource['INVOICE_OTHER'] ?></b></span></div>';
		 k += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_CUSTOM_TEXT'] ?> :</span><div class="inputbox">' + Forms.CreateTextAreaPropertyIconf("iconf", "ctext", e.ctext, true) + "</div></div>";




        k += "</div>";
        k += '<div class="rightcol" style="width:227px;">';
        k += '<form id="uform" enctype="multipart/form-data" method="post" action="upload.php">';

	    var c = "";
        if (e.id) {


			if(e.isimg==1){
              c = "background-image:url('images/invoice/" + Main.NullToEmpty(e.id) + "/medium.jpg?c=" + new Date().getTime() + "');"
			}
			else{
				c = "background-image:url('images/dummy/dummy_adbig.jpg');"
				}

        }
        k += '<div><input type="file" name="file[]" style="' + c + '"/></div>';
        k += "</form>";
        k += "</div>";
        k += "</div>";
        k += "</div>";
        document.getElementById("leftcol").innerHTML = j;
        document.getElementById("main").innerHTML = k;
        Forms.CreateValue("iconf", "imgupload0", "", true);
        Uploader.Activate();
	    Uploader.Init("iconf", "uform","mainbuttonok", true, InvoiceDtl.ProfileImageUploadFinished, InvoiceDtl.ProfileImageSelected, InvoiceDtl.ProfileStartUpload);
	    $("#uform").find(".uploaderbox").removeClass("uploaderboxadsplited").addClass("uploaderboxadfull").find(".preview").removeClass("adsplited").addClass("adfull");


        $("#name").focus()
	},

	      TypeChanged: function (a) {
		//alert(JSON.stringify(a));
        if(a == 1)
		{
			document.getElementById("bankname_s").style.display = "";
            document.getElementById("bankac_s").style.display = "";
            document.getElementById("routineno_s").style.display = "";
            document.getElementById("swiftcode_s").style.display = "";

			document.getElementById("vatpaypalemail_s").style.display = "none";


		}
		else if(a == 2)
		{
			document.getElementById("bankname_s").style.display = "none";
            document.getElementById("bankac_s").style.display = "none";
            document.getElementById("routineno_s").style.display = "none";
            document.getElementById("swiftcode_s").style.display = "none";
           document.getElementById("vatpaypalemail_s").style.display = "";




		}
		else
		{
			document.getElementById("bankname_s").style.display = "none";
			document.getElementById("bankac_s").style.display = "none";
            document.getElementById("routineno_s").style.display = "none";
			document.getElementById("swiftcode_s").style.display = "none";

            document.getElementById("vatpaypalemail_s").style.display = "none";

		}
    },
	Edit1: function (a) {

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

                    InvoiceDtl.Form1(JSON.parse(e))
                } else {
                    alert("Error")
                }
            })
        }
    },
	 InvoiceSave: function () {
        //alert(JSON.stringify(Forms.Form.invoiceorder));
        Main.Request("invoicedtl", null, "f=SaveInvoiceStatus&data=" + JSON.stringify(Forms.Form.invoiceorder), "InvoiceDtl.Main()");
	    Forms.Clean("invoiceorder")
    },

    Form1: function (a) {

		JSON.stringify(a);

		//alert(a.id)

        var o = "";
        var p = "";
        o += Visuals.CreateMainButton("<?= $lang_resource['INVOICE_SAVE'] ?>", "ok", "InvoiceDtl.InvoiceSave()");
        o += Visuals.CreateMainButton("<?= $lang_resource['INVOICE_CANCEL'] ?>", "cancel", "InvoiceDtl.PrintMain()");
		o += Visuals.CreateMainButton("<?= $lang_resource['INVOICE_DOWNLOAD'] ?>", "download_inv", "InvoiceDtl.downpdf( "+a.id+")");

        Forms.Clean("invoiceorder", "mainbuttonok");

        Forms.Form.invoiceorder.type = "modify";

        Forms.Form.invoiceorder.id = a.id;

        p += '<div class="contentbox">';
        p += '<div class="titlebox nonselectable">';
        p += '<span class="title">&gt;&gt; <?= $lang_resource['INVOICE_INVO'] ?> ' + a.id + "</span>";
        p += "</div>";
        p += '<div class="editform">';
        p += '<div class="leftcol">';

		 var q = new Array();
		q.push(JSON.parse('{"id":"-1","caption":""}'));
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['INVOICE_PENDING_PAYMENT_TO'] ?> '+ a.resturant +'"}'));
		q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['INVOICE_PAID_TO_OOS'] ?>"}'));
		q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['INVOICE_PAID_TO'] ?> '+ a.resturant +'"}'));
        q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['INVOICE_CANCELED'] ?>"}'));

        p += '<div class="row"><span class="caption"><?= $lang_resource['INVOICE_ADMIN_COMMENT'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("invoiceorder", "status", q, a.status,true) + "</div></div>";

		p += '<span class="caption" style="float:left;margin-left:4px;"><?= $lang_resource['INVOICE_ADMIN_COMMENTS'] ?>:</span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaProperty("invoiceorder", "admin_comment", Main.NullToEmpty(a.admin_comment), false, "", true, "comment") + "</div>"

        p += '<span class="caption" style="float:left;margin-left:4px;"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_COMMENT'] ?></span>';
        p += '<div class="inputbox">' + Forms.CreateTextAreaPropertyD("invoiceorder", "comment", Main.NullToEmpty(a.comment), false, "", true, "comment") + "</div>";

        p += "</div>";
        p += "</div>";

        p += '<div style="float:left;width:100%;height:520px;overflow-y:auto;font-size:12px;">';
		p +='<center><div style="width:90%;">';
     	p +='<div style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; height:80px;">';
        p +='<div style="float:left; width:50%; line-height:17px; " align="left">';
        p +='<strong><font size="+2"><?= $lang_resource['INVOICE_ORDER'] ?>'+ a.id +'</font></strong><br>';
        p +='<?= $lang_resource['INVOICE_DATE'] ?> : '+ a.date +'.<br>';
        p +='<?= $lang_resource['INVOICE_PERIOD'] ?> : ( ' + a.periodp +' )';
        p +='</div>';
        p +='<div style="width:50%; float:left; " align="left">';
		c="";
		//alert(a.iid)
		if(a.isimg==1){
              c = 'images/invoice/1/small.jpg?c=' + new Date().getTime() ;
			}
			else{
				c= 'images/dummy/dummy_adbig.jpg';
		}
        p +='<img src="'+c+'"  >';
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

        p +='<strong><?= $lang_resource['INVOICE_TEL'] ?> :</strong>'+ Main.NullToEmpty(a.phone)+'<br>';
        p +='<strong><?= $lang_resource['INVOICE_EMAIL'] ?> :</strong>'+ Main.NullToEmpty(a.wbmail)+'<br>';
        p +='<strong><?= $lang_resource['INVOICE_WEBSITE'] ?> :</strong>'+ Main.NullToEmpty(a.wurl)+'<br>';
        p +='<strong><?= $lang_resource['INVOICE_VAT_REGISTRATION'] ?> :</strong>'+ Main.NullToEmpty(a.vatregistration);
        p +='</div>';
     	p +='</div>';

		p +='<div style="margin:10px 0 0 0; line-height:17px;">'+
    	'<table width="100%">'+
			'<tr>'+
            	'<td  style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:50%;"><strong><font size="+1.5"><?= $lang_resource['INVOICE_INVOICE_BREAKDOWN'] ?></font></strong></td>'+
                '<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:20%;"><strong></strong></td>'+
                '<td style="border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#000; width:30%; text-align:right;"><strong><font size="+1.5"><?= $lang_resource['INVOICE_AMOUNT'] ?></font></strong></td>'+
            '</tr>'+
            '<tr>'+
            	'<td><?= $lang_resource['INVOICE_TOTAL_VALUE_FOR'] ?></td>'+
                '<td>'+  Main.NullToEmpty(a.totalorder) +' <?= $lang_resource['INVOICE_ORDERS'] ?></td>'+
                '<td align="right">'+a.currency+' '+ InvoiceDtl.FormatPrice(Main.NullToEmpty(a.total_invoice))+'</td>'+
            '</tr>'+
            '<tr>'+
            	'<td><?= $lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR'] ?></td>'+
                '<td>' +  Main.NullToEmpty(a.cashcount) +' <?= $lang_resource['INVOICE_ORDERS'] ?></td>'+
                '<td align="right">'+a.currency+'  ' + InvoiceDtl.FormatPrice(Main.NullToEmpty(a.cashtotal)) +'</td>'+
            '</tr>'+
			'<tr>'+
            	'<td><?= $lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR'] ?></td>'+
                '<td>' +   Main.NullToEmpty(a.paypalcount) +' <?= $lang_resource['INVOICE_ORDERS'] ?></td>'+
                '<td align="right">'+a.currency+' ' +InvoiceDtl.FormatPrice( Main.NullToEmpty(a.paypaltotal)) +'</td>'+
            '</tr>'+
            '<tr>'+
            	'<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;"><?= $lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR'] ?></td>'+
                '<td  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ">' +  Main.NullToEmpty(a.cardcount)  + ' <?= $lang_resource['INVOICE_ORDERS'] ?></td>'+
                '<td align="right"  style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000; ;">'+a.currency+'  '+ InvoiceDtl.FormatPrice(Main.NullToEmpty(a.cardtotal))+'</td>'+
            '</tr>'+

            '<tr>'+
            	'<td colspan="2" align="right">'+  Main.NullToEmpty(a.perordercommission)+'% <?= $lang_resource['INVOICE_COMMISSION_ON_ORDERS'] ?></td>'+
                '<td align="right">'+a.currency+'  '+ InvoiceDtl.FormatPrice( Main.NullToEmpty(a.commisioncal)) + '</td>'+
            '</tr>';
	if(a.setuprate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?= $lang_resource['INVOICE_SETUP_RATE'] ?> </td>'+
                '<td align="right">'+a.currency+'  '+  InvoiceDtl.FormatPrice(Main.NullToEmpty(a.setuprate)) + '</td>'+
            '</tr>';
	}
	if(a.fixedrate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?= $lang_resource['INVOICE_FIXED_RATE'] ?> </td>'+
                '<td align="right">'+a.currency+'  '+  InvoiceDtl.FormatPrice(Main.NullToEmpty(a.fixedrate)) + '</td>'+
            '</tr>';
	}
	if(a.fixedrate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?= $lang_resource['INVOICE_PER_ORDER_FIXED_RATE'] ?> </td>'+
                '<td align="right">'+a.currency+'  '+  InvoiceDtl.FormatPrice(Main.NullToEmpty(a.orderrate)) + '</td>'+
            '</tr>';
	}
	if(a.fixedrate){
			p+='<tr>'+
            	'<td colspan="2" align="right"><?= $lang_resource['INVOICE_OTHER_RATE'] ?> </td>'+
                '<td align="right">'+a.currency+'  '+  InvoiceDtl.FormatPrice(Main.NullToEmpty(a.otherrate)) + '</td>'+
            '</tr>';
	}

            p+='<tr>'+
            	'<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;"><?= $lang_resource['INVOICE_VAT'] ?> ('+ Main.NullToEmpty(a.vat)+'%):</td>'+
                '<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">'+a.currency+'  '+ InvoiceDtl.FormatPrice(Main.NullToEmpty(a.vatp))+'</td>'+
            '</tr>'+
            '<tr>'+
            	'<td colspan="2" align="right"><?= $lang_resource['INVOICE_ORDER_TOTAL_AMOUNT_OWED'] ?>:</td>'+
                '<td align="right">'+a.currency+'  '+ InvoiceDtl.FormatPrice(Main.NullToEmpty(a.totalbalance))+'</td>'+
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
			p +='<td colspan="2" align="right"><?= $lang_resource['INVOICE_TOTAL_AMOUNT_CWED_FROM_RESTAURANT'] ?> ('+a.currency+'  '+InvoiceDtl.FormatPrice( Main.NullToEmpty(a.totalbalance))+' - '+a.currency+'  0.00):</td>'+
                '<td align="right">'+a.currency+''+ Main.NullToEmpty(a.totalbalance)+'</td>';
			}else{
            p +='<td colspan="2" align="right"><?= $lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'] ?> ('+a.currency+'  '+ InvoiceDtl.FormatPrice(Main.NullToEmpty(a.totalbalance))+' - '+a.currency+'  '+ InvoiceDtl.FormatPrice(paymenttotal)+'):</td>'+
                '<td align="right">'+a.currency+'  '+ InvoiceDtl.FormatPrice(duepayment)+'</td>';
			}
            p += '</tr>'+
            '<tr>'+
            	'<td colspan="2" align="right" style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;"><?= $lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'] ?></td>'+
                '<td style="border-bottom-width:1px;  border-bottom-style:outset; border-bottom-color:#000;" align="right">'+a.currency+'  '+InvoiceDtl.FormatPrice(a.totalinvoicedue)+'</td>'+
           '</tr>'+
             '<tr>';
            	p +='<td colspan="2" align="right"><strong><?= $lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS'] ?>:</strong></td>';
                p +='<td align="right">'+a.currency+'  '+ InvoiceDtl.FormatPrice(Main.NullToEmpty(a.totalpay))+'</td></tr></table>';
     p +='</div>';


	  p +='<div style="width:100%; margin:10px 0 0 0; float:left;" align="left">'+
      	'<?= $lang_resource['INVOICE_QUESTIONS'] ?> : <a href="#"><?= $lang_resource['INVOICE_SUPPORT_EMAIL'] ?></a>'+
      '</div>';



	  p +='<div style="width:100%; margin:15px 0 0 0; float:left; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#666; height:50px;" align="left">'+
          '<?= $lang_resource['INVOICE_INVOICE_INFORMATION'] ?> : <a href="#"><?= $lang_resource['INVOICE_SUPPORT_EMAIL'] ?></a>'+
       '</div>';

	   	   p +='<div style="width:35%; margin:5px 0 0 0; float:left;" align="left">'+
      	'<strong><font size="+2"><?= $lang_resource['INVOICE_PAYMENT_DETAILS'] ?></font></strong>'+
      '</div>';

	  p +='<br clear="all">';
      
	  if(a.payby == 1){
      p +='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">'+
      '<table width="100%">'+
	  			'<tr align="center">'+

                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong><?= $lang_resource['INVOICE_PAYMENT_TYPE'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:30%"><strong><?= $lang_resource['INVOICE_BANK_NAME'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_BANK_AC_NO'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_ROUTINE_NO'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_SWIFT_CODE'] ?></strong></td>'+
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

                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong><?= $lang_resource['INVOICE_PAYMENT_TYPE'] ?></strong></td>'+

                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_EMAIL_ADDRESS'] ?></strong></td>'+
				'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_PAYPAL'] ?></strong></td>'+
            '</tr>'+
            '<tr bgcolor="#FFD9B3">'+

                '<td align="center"><strong>'+ Main.NullToEmpty(a.pay)+'</strong></td>'+

                '<td align="center"><strong>'+ Main.NullToEmpty(a.vatpaypalemail) +'</strong></td>'+
				'<td align="center"><strong><span><a href="js/paymentoption.php?id='+ a.id +'"><img src="../../images/panel/paypal.png" ></a></span></strong></td>'+
            '</tr>'+
       '</table>'+
      '</div>';
	  }



	   p +='<div style="width:30%; margin:5px 0 0 0; float:left;" align="left">'+
      	'<strong><font size="+2"><?= $lang_resource['INVOICE_ORDER_DETAILS'] ?></font></strong>'+
      '</div>';

	  p +='<br clear="all">';

      p +='<div style=" margin:15px 0 0 0; border-bottom-width:3px;  border-bottom-style:outset; border-bottom-color:#FBC055;">'+
      '<table width="100%">'+
			'<tr align="center">'+
            	'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:5%"><strong>#</strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:15%"><strong><?= $lang_resource['INVOICE_DATE'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong><?= $lang_resource['INVOICE_ORDER_NO'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_PAID'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_TOTAL_VALUE'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_PAYMENT'] ?></strong></td>'+
                '<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:12.5%"><strong><?= $lang_resource['INVOICE_DUE'] ?></strong></td>'+
				'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong><?= $lang_resource['INVOICE_COMMISSION'] ?> (%)</strong></td>'+
				'<td  style="border-bottom-width:2px;  border-bottom-style:outset; border-bottom-color:#F60; width:10%"><strong><?= $lang_resource['INVOICE_FIXED_RATE'] ?></strong></td>'+
            '</tr>';

	 if(a.mapayment.length == 0){
	  		p+='<tr bgcolor="#FFD9B3"><td align="center" colspan="9"><strong><?= $lang_resource['INVOICE_NO_RECORD_FOUND'] ?></strong></td></tr>';
	  }

		 for (var b in a.mapayment)
         {
			// alert(a.mapayment[b].mpid)


            p+='<tr bgcolor="#FFD9B3">'+
            	'<td align="center"><strong>'+ Main.NullToEmpty(a.mapayment[b].mpid)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.mapayment[b].mpdate)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.mapayment[b].mpid)+'</strong></td>'+
                '<td align="center"><strong>'+ Main.NullToEmpty(a.pay)+'</strong></td>'+
                '<td align="right"><strong>'+a.currency+''+ Main.NullToEmpty(a.mapayment[b].mpinvoicepay)+'</strong></td>'+
                '<td align="right"><strong>'+a.currency+''+ Main.NullToEmpty(a.mapayment[b].payment)+'</strong></td>'+
                '<td align="right"><strong>'+a.currency+''+ Main.NullToEmpty(a.mapayment[b].pdue)+'</strong></td>'+
				'<td align="right"><strong>'+ Main.NullToEmpty(a.perordercommission)+'</strong></td>'+
				'<td align="right"><strong>'+a.currency+''+ Main.NullToEmpty(a.perorderfixedrate)+'</strong></td>'+
            '</tr>';


		 }



      p+='</table>'+
      '</div>';


		p +='</div>';

		p +='<br clear="all">';

  p+= '<div align="left" style="width:100%; height:40px; margin-top:10px; border-top-width:15px; border-top-style:outset; border-top-color:#333333;">'+
  '<?= $lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS'] ?> '+Main.NullToEmpty(a.perorderfixedrate)+' <?= $lang_resource['INVOICE_PER_ORDER'] ?>'+
  '</div>';


	p +='</center>';


        p += "</td></tr></tbody></table></td></tr></tbody></table></center>";
        p += "</div>";
        p += "</div>";
        document.getElementById("leftcol").innerHTML = o;
        document.getElementById("main").innerHTML = p
    },


	PreSave: function () {
		 Forms.Form['invoice'].fields['dfrm'].save = true
		 Forms.Form['invoice'].fields['tfrm'].save = true
		  Forms.Form['invoice'].fields['billing'].save = true
		  Forms.Form['invoice'].fields['setuprate'].save = true
		  Forms.Form['invoice'].fields['fixedrate'].save = true
		  Forms.Form['invoice'].fields['perordercommission'].save = true
		  Forms.Form['invoice'].fields['perorderfixedrate'].save = true
		  Forms.Form['invoice'].fields['otherrate'].save = true
		  Forms.Form['invoice'].fields['vat'].save = true
		//Forms.CheckTextInput('invoice',this);
		var EnteredDate = $("#dfrm").val();
		var startDate = new Date($('#dfrm').val());
		var endDate = new Date($('#tfrm').val());
        Forms.Form['invoice'].fields['dfrm'].value = $("#dfrm").val();
        Forms.Form['invoice'].fields['tfrm'].value = $('#tfrm').val();

		if (startDate < endDate){
			InvoiceDtl.Save()
		}else{alert('<?= $lang_resource['INVOICE_ORDER_PLEASE_ENTER_FROM_DATE_TO_DATE'] ?> ');
		return;
    }


     //  alert(JSON.stringify(Forms.Form.invoice));
	},
    Save: function () {
        if (Forms.CanSave("invoice") == false) {
            return
        }
        Forms.PrepareForSaving("invoice");
		  Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
			 
	//	Main.Request("invoicedtl", null, "f=SaveInvoice&data=" + JSON.stringify(Forms.Form.invoice), "InvoiceDtl.Main2(e)");
	  $.post("lib/invoicedtl.php", "f=SaveInvoice&data=" + JSON.stringify(Forms.Form.invoice), function (e) {
		      console.log(e);
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
				//alert(e);
				if(e == "cancel") {

					alert("<?= $lang_resource['INVOICE_SORRY_YOU_HAVE_NO_INVOICE'] ?>");

					}
                InvoiceDtl.Main()
            })
      //  Main.Request("order", null, "f=SaveOrder&data=" + JSON.stringify(Forms.Form.order), "InvoiceDtl.Main()");
        Forms.Clean("invoice")
    },

ProfileImageSelected: function (b, a) {
        Forms.UpdateValue("iconf", "imgupload" + a, b, true);
        if (Forms.CanSave("iconf")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
	  ProfileImageUploadFinished: function (b) {
        Response = JSON.parse(b);
        if (Response.status == "no files selected") {
            InvoiceDtl.SaveInvoiceConf()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                InvoiceDtl.SaveInvoiceConf(Response[0].name)
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

	 SaveInvoiceConf: function (a) {

		//Uploader.UploadFiles("uform");
		if (Forms.CanSave("iconf") == false) {
            return
        }
		//alert("1")
        Forms.PrepareForSaving("iconf");
        if (a != null) {
            Forms.Form.iconf.image = a
        }
		//alert(Forms.Form.iconf.image);
		//alert(JSON.stringify(Forms.Form.iconf));
		// Main.Request("invoicedtl", null, "f=SaveInvoiceConf&data=" + JSON.stringify(Forms.Form.iconf), "InvoiceDtl.Main()");
		$.post("lib/invoicedtl.php", "f=SaveInvoiceConf&data=" + JSON.stringify(Forms.Form.iconf), function (e) {
			if (e == "ok") {
                    Uploader.UploadFiles("uform")

                Main.Ready();


			}
			InvoiceDtl.Main();

         })

        Uploader.Clean();
        Forms.Clean("iconf");


    },
	downpdf: function(i) {
		//alert(i);
		window.location='lib/invoice_pdf.php?oid='+i;
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
	SendReminder: function () {
        var b = Main.GetMarkedCheckBoxesValues();
	    if (b.length == 0) {
			alert("<?= $lang_resource['INVOICE_PLEASE_CHECK_ANY_ONE'] ?>");
            return
        }
        var a = new Object();
	    a.ids = b;
		$.post("lib/invoicedtl.php", "f=SendReminder&data=" + JSON.stringify(a), function (e) {
	        Main.Ready();

			InvoiceDtl.Main();
	    })
    },
	FormatPrice: function (b)
    {
		if(b==''){
			b=0;
		}
        
        return parseFloat(b).toFixed(Main.IS_DECIMAL_POINT);
    },

    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
		//alert(b);
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("invoicedtl", null, "f=DeleteInvoice&data=" + JSON.stringify(a), "InvoiceDtl.Main()")
    }
};
