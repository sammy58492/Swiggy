var a12 = new Array({
            id: "Kwajalein",
            caption: "International Date Line West (GMT-12:00)"
        },{
                id: "America/Anchorage",
                caption: "Alaska (GMT-9)"
        },{
            id: "Pacific/Honolulu",
            caption: "Hawaii (GMT-10:00)"
        }, {
            id: "America/Los_Angeles",
            caption: "Pacific Time (US &amp; Canada) (GMT-08:00)"
        }, {
            id: "America/Tijuana",
            caption: "Tijuana, Baja California (GMT-08:00)"
        }, {
            id: "America/Denver",
            caption: "Mountain Time (US &amp; Canada) (GMT-07:00)"
        }, {
            id: "America/Chihuahua",
            caption: "Chihuahua (GMT-07:00)"
        }, {
        	id:"Europe/Netherlands",
        	caption:"Netherlands (GMT+01:00)"
        }, {
            id: "America/Mazatlan",
            caption: "Mazatlan (GMT-07:00)"
        }, {
            id: "America/Phoenix",
            caption: "Arizona (GMT-07:00)"
        }, {
            id: "Europe/London",
            caption: "London (GMT+00:00)"
        }, {
            id: "America/Tegucigalpa",
            caption: "Central America (GMT-06:00)"
        }, {
            id: "America/Chicago",
            caption: "Central Time (US &amp; Canada) (GMT-06:00)"
        }, {
            id: "America/Mexico_City",
            caption: "Mexico City (GMT-06:00)"
        }, {
            id: "America/Monterrey",
            caption: "Monterrey (GMT-06:00)"
        }, {
            id: "America/New_York",
            caption: "Eastern Time (US &amp; Canada) (GMT-05:00)"
        }, {
            id: "America/Bogota",
            caption: "Bogota (GMT-05:00)"
        }, {
            id: "America/Lima",
            caption: "Lima (GMT-05:00)"
        }, {
            id: "America/Rio_Branco",
            caption: "Rio Branco (GMT-05:00)"
        }, {
            id: "America/Indiana/Indianapolis",
            caption: "Indiana (East) (GMT-05:00)"
        }, {
            id: "America/Caracas",
            caption: "Caracas (GMT-04:30)"
        }, {
            id: "America/Halifax",
            caption: "Atlantic Time (Canada) (GMT-04:00)"
        }, {
            id: "America/Manaus",
            caption: "Manaus (GMT-04:00)"
        }, {
            id: "America/Santiago",
            caption: "Santiago (GMT-04:00)"
        }, {
            id: "America/La_Paz",
            caption: "La Paz (GMT-04:00)"
        }, {
            id: "America/St_Johns",
            caption: "Newfoundland (GMT-03:30)"
        }, {
            id: "America/Argentina/Buenos_Aires",
            caption: "Buenos Aires (GMT-03:00)"
        }, {
            id: "America/Sao_Paulo",
            caption: "Brasilia (GMT-03:00)"
        }, {
            id: "America/Godthab",
            caption: "Greenland (GMT-03:00)"
        }, {
            id: "America/Montevideo",
            caption: "Montevideo (GMT-03:00)"
        }, {
            id: "Europe/Madrid",
            caption: "Madrid (GMT+01:00)"
        }, {
            id: "Europe/Paris",
            caption: "Paris (GMT+01:00)"
        },  {
            id: "Asia/Kolkata",
            caption: "India (GMT+05:30)"
        },  {
            id: "Pacific/Fiji",
            caption: "Fiji (GMT+12:00)"
        }, {
            id: "Etc/GMT-11",
            caption: "GMT -11 (GMT-11:00)"
        }, {
            id: "Etc/GMT-9",
            caption: "GMT -9 (GMT-09:00)"
        }, {
            id: "Etc/GMT-2",
            caption: "GMT -2 (GMT-02:00)"
        }, {
            id: "Etc/GMT-1",
            caption: "GMT -1 (GMT-01:00)"
        }, {
                id: "Africa/Windhoek",
                caption: "GMT +2 (GMT+02:00)"
            }, {
                id: "Asia/Riyadh",
                caption: "GMT +3 (GMT+03:00)"
            }, {
                id: "Asia/Yerevan",
                caption: "GMT +4 (GMT+04:00)"
            }, {
                id: "Asia/Karachi",
                caption: "GMT +5 (GMT+05:00)"
            }, {
                id: "Asia/Dhaka",
                caption: "GMT +6 (GMT+06:00)"
            }, {
                id: "Asia/Jakarta",
                caption: "GMT +7 (GMT+07:00)"
            }, {
                id: "Asia/Singapore",
                caption: "GMT +8 (GMT+08:00)"
            }, {
                id: "Asia/Seoul",
                caption: "GMT +9 (GMT+09:00)"
            }, {
                id: "Australia/Melbourne",
                caption: "GMT +10 (GMT+10:00)"
            }, {
                id: "Asia/Magadan",
                caption: "GMT +11 (GMT+11:00)"
            });
var InvoiceConf = {
	Main: function(){
		Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;
		
		
		$.post("lib/myinvoice.php", "f=MyInvoice", function (b) {
			if (a != Main.Aid) {
                return
            }
            Main.Ready();
            InvoiceConf.Invoice =JSON.parse(b);
            InvoiceConf.PrintMain();
        })
		
	},
	PrintMain: function(){

		var n =''
		n +='<div class="row">'
        n +='<div class="top-bar">'
		n +='<div class=" col-md-6 col-md-offset-6">'                       
       	n +='<div class=" pull-right">'                                     
        n +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_CANCEL']?></button></div>'                    
        n +='</div>'		
		n +='</div>'
		<!--top-bar-->
		n +='</div>'
		<!--row-->

		n +='<div class="row" style="margin-bottom:15px;">'
		n +='<div class="inline-popups">'
		n +='<div class="col-md-2 col-md-offset-10">'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-success btn-rounded-lg tutorial-btn" href="javascript:InvoiceConf.InvoiceConfiguration()" data-effect="mfp-zoom-in"><i class="fa icon-settings2"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_CONFIGURATION']?></a>'
		n +='</span>'
		n +='</div>'
		n +='</div>'
		<!--inline-popups-->
		n +='</div>'
		<!--row-->


		n +='<div class="panel panel-danger panel-square panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-2">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PENDING']?></h3>'
		n +='</div>'
		<!--col-md-5-->
		n +='<div class="col-md-3" id="orderf">'
		
		n +='</div>'
		n +='<div class="col-md-7">'

		n +='<div class="panel-btn pull-right">'
		n +='<div class="inline-popups">'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="InvoiceConf.Export(0,1)"><i class="fa icon-download3"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_EXPORT']?></button>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="InvoiceConf.SendReminder(1)" ><i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_REMINDER']?></button>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:InvoiceConf.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_ADD']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:InvoiceConf.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_EDIT']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="InvoiceConf.Delete(1)"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_DELETE']?></button></span>'
		n +='</div>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row-->
		n +='</div>'

		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped" id="datatable-invoicepending">'
		n +='<thead>'
		n +='<tr>'
		n +='<th style="width: 30px;" onclick="Main.ToogleAllCheckBoxes(\'invoicecheckbox\')" class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_ALL']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE_NO']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_DATEOF_INVOICE']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_CITY']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_RESTAURANT_NAME']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_TOTAL']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_VIEW_DETAILS']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PAYMENT']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_STATUS']?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="myinvoicepending">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'



		n +='<div class="panel panel-success  panel-square panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'  
		n +='<div class="row">'
		n +='<div class="col-md-2">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_COMPLETED_INVOICE']?></h3>'
		n +='</div>'
		<!--col-md-3-->
		n +='<div class="col-md-3" id="ordercf">'
		
		n +='</div>'
		n +='<div class="col-md-7">'
		n +='<div class="panel-btn pull-right">'
		n +='<div class=" ">'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:InvoiceConf.Export(0,2)" data-effect="mfp-zoom-in"><i class="fa icon-download3"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_EXPORT']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:InvoiceConf.SendReminder(2)" data-effect="mfp-zoom-in"><i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_REMINDER']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="InvoiceConf.Delete(2)"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_DELETE']?></button></span>'
		n +='</div>'

		n +='</div>'
		n +='</div>'
		<!--col-md-9-->
		n +='</div>'
		<!--row-->
		n +='</div>'

		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped" id="datatable-invoicecomplete">'
		n +='<thead>'
		n +='<tr>'
		n +='<th style="width: 30px;" onclick="Main.ToogleAllCheckBoxes(\'checkboxcomplete\')"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_ALL']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE_NO']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_DATEOF_INVOICE']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_CITY']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_RESTAURANT_NAME']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_TOTAL']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_VIEW_DETAILS']?></th>'
		n +='<th class="hand"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_STATUS']?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="myinvoicecomplete">'
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'

		n += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        n += '<input type="hidden" name="f" value="ExportInvoice"/>';
        n += '<input id="exp_data" type="hidden" name="data" value=""/>';
        n += '<input type="hidden" name="name" value="Invoice"/>';
        n += "</form>";



		



		$("#main").empty().append(n);
		InvoiceConf.PopulateTable()
	},
	PopulateTable: function(){		
		var n ='';
		var cn='';
		for (var f in InvoiceConf.Invoice) {
			if(InvoiceConf.Invoice[f].status !=1){
				n +='<tr>'
				n +='<td><input type="checkbox" class="checkbox invoicecheckbox" value="'+InvoiceConf.Invoice[f].id+'"></td>'
				n +='<td class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+InvoiceConf.Invoice[f].id+'</td>'
				n +='<td class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+InvoiceConf.Invoice[f].date+'</td>'
				n +='<td class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+InvoiceConf.Invoice[f].city+'</td>'
				n +='<td class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+Main.NullToEmpty(InvoiceConf.Invoice[f].resturant)+'</td>'			
				n +='<td>' +Main.NullToEmpty(InvoiceConf.Invoice[f].currency)+ +InvoiceConf.Invoice[f].invoicepay+'</td>'
				n +='<td style="padding:0px !important; text-align:center;"><a href="javascript:InvoiceConf.InvoiceDetails('+InvoiceConf.Invoice[f].id+')" class="eye-icon"><i class="fa icon-eye"></i></a></td>'
				n +='<td style="padding:0px !important; text-align:center;"><a href="javascript:MyInvoice.MakePayment('+InvoiceConf.Invoice[f].id+')" class="eye-icon"><i class="fa icon-credit"></i></a></td>'
				n +='<td><button type="button" class=" btn btn-danger btn_pendeng"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PENDING_IN']?></button></td>'
				n +='</tr>'	
			}
			if(InvoiceConf.Invoice[f].status == 1){
				cn +='<tr>'
				cn +='<td><input type="checkbox" class="checkbox checkboxcomplete" value="'+InvoiceConf.Invoice[f].id+'"></td>'
				cn +='<td  class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+InvoiceConf.Invoice[f].id+'</td>'
				cn +='<td  class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+InvoiceConf.Invoice[f].date+'</td>'
				cn +='<td  class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+InvoiceConf.Invoice[f].city+'</td>'
				cn +='<td  class="hand" onclick="InvoiceConf.PaymentDetails('+InvoiceConf.Invoice[f].id+')">'+Main.NullToEmpty(InvoiceConf.Invoice[f].resturant)+'</td>'			
				cn +='<td>' +Main.NullToEmpty(InvoiceConf.Invoice[f].currency)+ +InvoiceConf.Invoice[f].invoicepay+'</td>'
				cn +='<td style="padding:0px !important; text-align:center;"><a href="javascript:InvoiceConf.InvoiceDetails('+InvoiceConf.Invoice[f].id+')" class="eye-icon"><i class="fa icon-eye"></i></a></td>'
				cn +='<td><button type="button" class=" btn btn-success btn_pendeng"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_COMPLETED']?></button></td>'
				cn +='</tr>'	
			}		
		}
		

		$("#myinvoicepending").empty().append(n);
		$("#myinvoicecomplete").empty().append(cn);

		$(document).ready(function () {
            $('#datatable-invoicepending').dataTable({           
				"iDisplayLength": 5,
				"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
				"oLanguage": { "sSearch": '',"sInfo": "<?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_TOTAL_ORDERS']?> : <?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_PAGINATION_START_TO_END']?> / <span><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_PAGINATION_TOTAL']?></span>" },
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0 ] }] 
			});
      	});
      	$(document).ready(function () {
            $('#datatable-invoicecomplete').dataTable({           
				"iDisplayLength": 5,
				"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
				"oLanguage": { "sSearch": '',"sInfo": "<?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_TOTAL_ORDERS']?> : <?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_PAGINATION_START_TO_END']?> / <span><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_PAGINATION_TOTAL']?></span>" },
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0 ] }] 
			});
      	});
      	var fr = $( "#filtersearch" ).children();
      	var tr = $( "#datatable-invoicecomplete_wrapper #filtersearch" ).children();
      	
		$("#orderf").empty().append(fr);
		$("#ordercf").empty().append(tr); 		
		$("#datatable-invoicecomplete_wrapper #statusdiv").hide();
		$('#datatable-invoicecomplete_wrapper #paginationdiv').addClass('col-sm-7');
		$('#datatable-invoicecomplete_wrapper #paginationdiv').removeClass('col-sm-4');

	},
	PaymentDetails: function(id){

		var n =''
		n +='<div class="row">'
		n +='<div class="top-bar">'
		n +='<div class=" col-md-6 col-md-offset-6">'
		n +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn" onclick="InvoiceConf.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_CANCEL']?></button></div>'
		n +='</div>'
		<!--col-md-5-->
		n +='</div>'
		<!--top-bar-->
		n +='</div>'
		<!--row-->

		n +='<div class="panel panel-danger panel-square panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE_PAYMENT']?></h3>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row-->
		n +='</div>'

		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped">'
		n +='<thead>'
		n +='<tr>'
		n +='<th width="5%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_ID']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_DATE']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_BUSINESS']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE_ID']?></th>'
		n +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE_PAY']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_TOTAL_ITEM']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PAYMENT']?></th>'
		n +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_BUE']?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="paymentdetails">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'

		$("#main").empty().append(n);

		Main.Loading();
		$.post("lib/myinvoice.php", "f=MyInvoicePaymentDetails&id="+id, function (b) {
            Main.Ready();
            MyInvoice.PaymentDetailsForm(JSON.parse(b));
        })
		
		
	},
	PaymentDetailsForm: function(b){
		var n=''
		for (var f in b) {
			n +='<tr>'
			n +='<td>'+b[f].id+'</td>'
			n +='<td>'+b[f].date+'</td>'
			n +='<td>'+b[f].business_name+'</td>'
			n +='<td>'+b[f].invoice_id+'</td>'
			n +='<td>'+b[f].invoicepay+'</td>'
			n +='<td>'+b[f].total_invoiceitem+'</td>'
			n +='<td>'+b[f].payment+'</td>'
			n +='<td>'+b[f].pdue+'</td>'
			n +='</tr>'
		}
		$("#paymentdetails").empty().append(n)
	},
	InvoiceDetails: function(id){
		Main.Loading();
		$.post("lib/myinvoice.php", "f=FetchInvoiceDataForPdf&id=" + id+"&zone2="+a12, function (e) {
		
			Main.Ready();
			if (e != "") {
				InvoiceConf.InvoiceDetailsForm(JSON.parse(e))
            } else {
                alert("Error")
            }
        });
		
		
	},
	InvoiceDetailsForm: function(a){

		Forms.Clean("invoiceorder", "mainbuttonok");
        Forms.Form.invoiceorder.type = "modify";
        Forms.Form.invoiceorder.id = a.id;
		
		var p = "";
		p +='<div class="row">'
		p +='<div class="top-bar">'
		p +='<div class=" col-md-6 col-md-offset-6">'

		p +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn" onclick="InvoiceConf.Main()"><i class="fa icon-close"></i></button></div>'
		p +='<div class=" pull-right" style="margin-right:5px;"><button class="btn btn-default btn-rounded-lg close-btn" onclick="InvoiceConf.InvoiceSave()"><i class="fa icon-save"></i></button></div>'
		p +='<div class=" pull-right" style="margin-right:5px;"><button class="btn btn-default btn-rounded-lg close-btn" onclick="MyInvoice.downpdf('+a.id+')"><i class="fa icon-download"></i></button></div>'
		p +='</div>'
		<!--col-md-5-->
		p +='</div>'
		<!--top-bar-->
		p +='</div>'
		<!--row-->



		p +='<div class="panel panel-danger panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_INVOICE']?> '+a.id+'</h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		//p +='<div class="row">'
		//p +='<div class="col-md-12">'
		//p +='<div class="form-group">'
		//p +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_STATUS']?></label>'
		//var q = new Array();
		//q.push(JSON.parse('{"id":"-1","caption":""}'));
        //q.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS']?>"}'));
		//q.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['INVOICE_PENDING_PAYMENT_TO']?> '+ a.resturant +'"}'));
		//q.push(JSON.parse('{"id":"2","caption":"<?=$lang_resource['INVOICE_PAID_TO_OOS']?>"}'));
		//q.push(JSON.parse('{"id":"3","caption":"<?=$lang_resource['INVOICE_PAID_TO']?> '+ a.resturant +'"}'));
        //q.push(JSON.parse('{"id":"4","caption":"<?=$lang_resource['INVOICE_CANCELED']?>"}'));

		//p +=Forms.CreateSelectPropertyAdmin("invoiceorder", "status", q, a.status,true);
		//p +='</div>'
		//p +='</div>'
		//p +='</div>'
		<!--row-->

		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="form-group">'
		p +='<label><?=$lang_resource['INVOICE_ADMIN_COMMENTS']?> *</label>'
		p +=Forms.CreateTextAreaPropertyAdmin("invoiceorder", "admin_comment", Main.NullToEmpty(a.admin_comment), false, "", true, "comment")
		p +='</div>'
		p +='</div>'
		p +='<div class="col-md-6">'
		p +='<div class="form-group">'
		p +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_COMMENTS']?></label>'
		p +=Forms.CreateTextAreaPropertyAdminReadonly("invoiceorder", "comment", Main.NullToEmpty(a.comment), false, "", true, "comment")
		p +='</div>'
		p +='</div>'
		p +='</div>'
		<!--row-->

		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="">'
		p +='<h4><strong><?=$lang_resource['INVOICE_ORDER']?>'+ a.id +'</strong></h4>'
		p +='<p><?=$lang_resource['INVOICE_DATE']?> :	'+ a.date +'.<br>'
		p +='<?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PERIOD']?> :		( ' + a.periodp +' )</p>'
		p +='</div>'
		<!--pull-left-->
		p +='</div>'
		p +='<div class="col-md-6">'
		c='';
				
		if(a.isimg==1){
            c = '../panel/images/invoice/1/normal.jpg?c=' + new Date().getTime() ;
		}else{
			c= 'images/dummy/default-logo.png';
		}
		p +='<div class="invoice_logo pull-right"><img src="'+c+'"></div>'
		p +='</div>'
		p +='</div>'
		<!--row-->

		p +='<div style="border:1px solid #ccc; padding:10px;">'
		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="">'
		p +='<h4 style=" font-size:16px;"><strong>'+Main.NullToEmpty(a.resturant)+'</strong></h4>'
		p +='<p>'+ Main.NullToEmpty(a.streetb)+'<br>'
		p +=Main.NullToEmpty(a.colonyb)+'<br>'
		p +='<strong><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_PHONE']?> :</strong> '+Main.NullToEmpty(a.telb)+'</p>'
		p +='</div>'
		<!--pull-left-->
		p +='</div>'

		p +='<div class="col-md-6">'
		p +='<div class="">'
		p +='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
		p +='<tr>'
		p +='<td>'+Main.NullToEmpty(a.address)+'</td>'
		p +='<td>&nbsp;</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><strong><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_TEL']?> :</strong></td>'
		p +='<td>'+Main.NullToEmpty(a.phone)+'</td>'
		p +='</tr>'
		p +='<tr>'
		var email=a.wbmail;
		var no = email.length;
		//alert(screen.width)
		if(screen.width<321)
		{		
		
		
			var email = email.slice(0, 25)+"<br />" +email.slice(25);
		
		}
		p +='<td><strong><?=$lang_resource['INVOICE_EMAIL']?> :</strong></td>'
		p +='<td>'+Main.NullToEmpty(a.wbmail)+'</td>'
		var site= a.wurl;
		if(screen.width<321)
		{
			var site = site.slice(0, 25)+"<br />" +site.slice(25);
		}
		p +='</tr>'
		p +='<tr>'
		p +='<td><strong><?=$lang_resource['INVOICE_WEBSITE']?> :</strong></td>'
		p +='<td>'+Main.NullToEmpty(a.wurl)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><strong><?=$lang_resource['INVOICE_VAT_REGISTRATION']?> :</strong></td>'
		p +='<td>'+Main.NullToEmpty(a.vatregistration)+'</td>'
		p +='</tr>'
		p +='</table>'
		p +='</div>'
		p +='</div>'
		p +='</div>'
		<!--row-->
		p +='</div>'

		p +='<hr / style="margin:10px 0">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped table-condensed" style="margin-bottom:10px">'
		p +='<thead>'
		p +='<tr>'
		p +='<th width="50%"><?=$lang_resource['INVOICE_INVOICE_BREAKDOWN']?></th>'
		p +='<th width="0%">&nbsp;</th>'
		p +='<th width="5%"><?=$lang_resource['INVOICE_AMOUNT']?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?=$lang_resource['INVOICE_TOTAL_VALUE_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.totalorder)+' <?=$lang_resource['INVOICE_ORDERS']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.total_invoice)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?=$lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.cashcount)+' <?=$lang_resource['INVOICE_ORDERS']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.cashtotal)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?=$lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.paypalcount)+' <?=$lang_resource['INVOICE_ORDERS']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.paypaltotal)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?=$lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.cardcount)+' <?=$lang_resource['INVOICE_ORDERS']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.cardtotal)+'</td>'
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<hr / style=" margin:0px 0px 15px 0px; border-top: 1px solid #ABABAB;">'

		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped table-condensed" style="margin-bottom:10px">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td align="right" width="55%">'+Main.NullToEmpty(a.perordercommission)+' % <?=$lang_resource['INVOICE_COMMISSION_ON_ORDERS']?></td>'
		p +='<td align="right" width="45%">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.commisioncal)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_SETUP_RATE']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.setuprate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_FIXED_RATE']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.fixedrate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_PER_ORDER_FIXED_RATE']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.orderrate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_OTHER_RATE']?></td>'
		p +='<td align="right">'+Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.otherrate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_VAT']?> ('+ Main.NullToEmpty(a.vat)+' %)</td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.vatp)+'</td>'
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<hr / style=" margin:0px 0px 15px 0px; border-top: 1px solid #ABABAB;">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped table-condensed" style="margin-bottom:10px">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td align="right" width="55%"><?=$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_TOTAL_AMOUNT_CWED']?></td>'
		p +='<td align="right" width="45%">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.totalbalance)+'</td>'
		p +='</tr>'
		var paymenttotal='';
		var duepayment = '';
		for (var c in a.mapayment){
			paymenttotal += Main.NullToEmpty(a.mapayment[c].payment);
			duepayment = Main.NullToEmpty(a.mapayment[c].pdue);
		}
		if(paymenttotal==0){
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT']?> ('+Main.NullToEmpty(a.currency)+' '+Main.NullToEmpty(a.totalbalance)+' - '+Main.NullToEmpty(a.currency)+' 0.00)</td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.totalbalance)+'</td>'
		p +='</tr>'
		}else{
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT']?> ('+Main.NullToEmpty(a.currency)+' '+Main.NullToEmpty(a.totalbalance)+' - '+Main.NullToEmpty(a.currency)+' '+paymenttotal+')</td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +duepayment+'</td>'
		p +='</tr>'	
		}
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED']?> '+Main.NullToEmpty(a.currency)+'0.00 <?=$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED1']?></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +a.totalinvoicedue+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><strong><?=$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS']?>:</strong></td>'
		p +='<td align="right">' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.totalpay)+'</td>'
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">'
		p +='<p style="font-size:12px"><?=$lang_resource['INVOICE_QUESTIONS']?></p>'
		p +='<p style="font-size:12px"><?=$lang_resource['INVOICE_INVOICE_INFORMATION']?></p>'
		p +='<h4 class="text-center"><strong><?=$lang_resource['INVOICE_PAYMENT_DETAILS']?></strong></h4>'
		p +='<hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped table-condensed" style="margin-bottom:10px">'
		
		p +='<thead>'
		p +='<tr>'
		p +='<th width="40%"><?=$lang_resource['INVOICE_PAYMENT_TYPE']?></th>'
		if(a.payby == 1){
		p +='<th width="40%"><?=$lang_resource['INVOICE_BANK_NAME']?></th>'
		p +='<th width="20%"><?=$lang_resource['INVOICE_BANK_AC_NO']?></th>'
		p +='<th width="20%"><?=$lang_resource['INVOICE_ROUTINE_NO']?></th>'
		p +='<th width="20%"><?=$lang_resource['INVOICE_SWIFT_CODE']?></th>'
		}else{
		p +='<th width="40%"><?=$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL']?></th>'
		p +='<th width="20%"><?=$lang_resource['FRONT_PAYPAL']?></th>'
		}
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
		p +='<tr>'
		p +='<td>'+Main.NullToEmpty(a.pay)+'</td>'
		if(a.payby == 1){
		p +='<td>'+Main.NullToEmpty(a.bankname)+'</td>'
		p +='<td>'+Main.NullToEmpty(a.bankac)+'</td>'
		p +='<td>'+Main.NullToEmpty(a.routineno)+'</td>'
		p +='<td>'+Main.NullToEmpty(a.swiftcode)+'</td>'
		}else{
		p +='<td>'+Main.NullToEmpty(a.vatpaypalemail)+'</td>'
		p +='<td><a href="../admin/lib/paymentoption.php?id='+ a.id +'"><img src="images/paypal-logo.png"></a></td>'
		}
		
		p +='</tr>'
		p +='</tbody>'

		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<br />'
		p +='<h4 class="text-center"><strong><?=$lang_resource['Order_details_V2']?></strong></h4>'
		p +='<hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped table-condensed" style="margin-bottom:10px">'
		p +='<thead>'
		p +='<tr>'
		p +='<th width="10%">#</th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_DATE']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_ORDER_NO']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_PAID_MTD']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_TOTAL_VALUE']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_PAYMENT']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_DUE']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_COMMISSION']?> (%)</th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_FIXED_RATE']?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
		
		if(a.mapayment.length == 0){
		p +='<tr>'
		p +='<td align="center" colspan="9"><span class="text-danger"><strong><?=$lang_resource['INVOICE_NO_RECORD_FOUND']?></strong></span></td>'
		p +='</tr>'
		}else{
			for (var b in a.mapayment){
				p +='<tr>'
				p +='<td><strong>'+Main.NullToEmpty(a.mapayment[b].mpid)+'</strong></td>'
				p +='<td><strong>'+Main.NullToEmpty(a.mapayment[b].mpdate)+'</strong></td>'
				p +='<td><strong>'+Main.NullToEmpty(a.mapayment[b].mpid)+'</strong></td>'
				p +='<td><strong>'+Main.NullToEmpty(a.pay)+'</strong></td>'
				p +='<td><strong>' +Main.NullToEmpty(a.currency)+ +Main.NullToEmpty(a.mapayment[b].mpinvoicepay)+'</strong></td>'
				p +='<td><strong>' +Main.NullToEmpty(a.currency)+ + Main.NullToEmpty(a.mapayment[b].payment)+'</strong></td>'
				p +='<td><strong>' +Main.NullToEmpty(a.currency)+ + Main.NullToEmpty(a.mapayment[b].pdue)+'</strong></td>'
				p +='<td><strong>' +Main.NullToEmpty(a.perordercommission)+'</strong></td>'
				p +='<td><strong>' +Main.NullToEmpty(a.currency)+ + Main.NullToEmpty(a.perorderfixedrate)+'</strong></td>'
				p +='</tr>'	
			}	
		}
		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<p style=" padding:10px; font-size:14px;background:#666666; color:#fff;"><?=$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS']?> '+Main.NullToEmpty(a.perorderfixedrate)+' <?=$lang_resource['INVOICE_PER_ORDER']?></strong></p>'
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div>'


        $("#main").empty().append(p);
	},
	InvoiceSave: function () {
        Main.Request("myinvoice", null, "f=SaveInvoiceStatus&data=" + JSON.stringify(Forms.Form.invoiceorder), "InvoiceConf.Main()");
	    Forms.Clean("invoiceorder")
    },
    New: function(){
    	Main.Loading();   
    	$.post("lib/myinvoice.php", "f=FetchAllResturantData", function (b) {
			Main.Ready();
			b = JSON.parse(b);
			var d = new Array();
			d.push(JSON.parse('{"id":"-1","caption":"Select One"}'));
			for (var c in b) {
				var e = new Object();
				e.id = b[c].id;
				e.caption = b[c].caption ;
				d.push(e)
			}
			InvoiceConf.restaurants = d;
			InvoiceConf.Form()
    	});
    },
    Edit: function (a) {		
        var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValues('invoicecheckbox');
            if (c.length == 1) {
                a = c[0];
                d = true
        	}else if(c.length > 1){
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_EDIT']?>");
                return
            }
			
			
        } if (d) {
            Main.Loading();            
            $.post("lib/myinvoice.php", "f=FetchInvoiceData&id=" + a, function (f) {               			
                if (f != "") {
                	$.post("lib/myinvoice.php", "f=FetchAllResturantData", function (b) {	
                		Main.Ready();			
						b = JSON.parse(b);
						var d = new Array();
						d.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SELECT_ONE']?>"}'));
						for (var c in b) {
							var e = new Object();
							e.id = b[c].id;
							e.caption = b[c].caption ;
							d.push(e)
						}
						InvoiceConf.restaurants = d;
						InvoiceConf.Form(JSON.parse(f))						
			    	});                    
                } else {
                    alert("Error")
                }
            })
        }
    },
    Form: function(e){

    	var k = "";
    	Forms.Clean("invoice", "mainbuttonok");

        if (e == null) {
        	e = new Object();
        	Forms.Form.invoice.type = "create";			
        } else {
            Forms.Form.invoice.type = "modify";
            Forms.Form.invoice.id = e.id
        }
        this.invoicevalue = e;
        this.ActiveForm = "invoice";

        if(Forms.Form.invoice.type == "create"){
        k +='<h3 class="popup-heading"><?=$lang_resource['INVOICE_CREATE']?></h3>'
    	}else{
        k +='<h3 class="popup-heading"><?=$lang_resource['INVOICE_EDIT']?></h3>'
    	}
    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_INVOICE_CONFIGURATION_BUSINESS']?> *</label>'
    	k +=Forms.CreateSelectPropertyPopup("invoice", "businessi", InvoiceConf.restaurants, e.businessi, true,"InvoiceConf.PreValidation()", true)
    	k +='<small data-bv-validator="notEmpty" class="help-block" id="businessi_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_IS_REQUIRED']?></small>'
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->
    	k +='<div class="row input-daterange" >'
    	k +='<div class="col-md-6">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['INVOICE_DATE_RANGE']?>:</label>'
    	k +=Forms.CreateInputPropertyDatePopup("invoice", "dfrm", e.dfrm, true)    	
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-6-->
    	k +='<div class="col-md-6">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['INVOICE_TO']?></label>'
    	k +=Forms.CreateInputPropertyDatePopup("invoice", "tfrm",e.tfrm, true)
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-6-->
    	k +='<small data-bv-validator="notEmpty" class="help-block" id="daterange_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_DATE_VALIDATION']?></small>'
    	k +='</div>'
    	<!--row--> 
    	var g="";
		g ='[{"id":"-1","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_BILLING_OPTION_OPTION_SELECT']?>"},{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_BILLING_OPTION_OPTION_SELECT_1']?>"},{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_BILLING_OPTION_OPTION_SELECT_2']?>"}]';
        g = JSON.parse(g);

    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_BILLING_OPTION_OPTION_HEADING']?> *</label>'    	
    	k +=Forms.CreateSelectPropertyPopup("invoice", "billing", g, e.billing, true, "InvoiceConf.BillingOptionDiv(this.value);InvoiceConf.PreValidation()", false)
    	k +='<small data-bv-validator="notEmpty" class="help-block" id="billing_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_BILLING_OPTION_VALIDATION']?></small>'
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row--> 

    	k +='<div id="billingoptiondiv">'
    	 
    	k +='</div>'

    	k +='<div class="row">'
    	k +='<div class="col-md-6 col-md-offset-3">'
    	if(Forms.Form.invoice.type == "create"){
    		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="InvoiceConf.Save()"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CREATE']?></button></center>'
    	}else{
    		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="InvoiceConf.Save()"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_UPDATE']?></button></center>'
    	}
    	k +='</div>'
    	<!--col-md--->
    	k +='</div>'
    	<!--row-->

    	Popup.Show(k);
    	if (Forms.Form.invoice.type == "modify") {
    		InvoiceConf.BillingOptionDiv(e.billing)
    	}

    	$(document).ready(function () {	  
			var startDate = new Date('01/01/2012');
			var FromEndDate = new Date();
			var ToEndDate = new Date();
			ToEndDate.setDate(ToEndDate.getDate()+365);

			$('#dfrm').datepicker({
				format: "mm/dd/yyyy",
				autoclose: true,
			})
		    .on('changeDate', function(selected){
		        startDate = new Date(selected.date.valueOf());
		        startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
		        $('#tfrm').datepicker('setStartDate', startDate);
		        InvoiceConf.PreValidation()
		    }); 

		    $('#tfrm').datepicker({
		    	format: "mm/dd/yyyy",
		    	autoclose: true
		    })
		    .on('changeDate', function(selected){
		        FromEndDate = new Date(selected.date.valueOf());
		        FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
		        $('#dfrm').datepicker('setEndDate', FromEndDate);
		        InvoiceConf.PreValidation()
		    });
	    });

    	$("#name").focus();
    },
    BillingOptionDiv: function(a){
    	var k='';
    	if(a == 2){    	
    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_SETUP_RATE_HEADING']?></label>'
    	k +=Forms.CreateInputPropertyPopup("invoice", "setuprate", Main.NullToEmpty(this.invoicevalue.setuprate), false) 
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->
    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_FIXED_RATE_HEADING']?></label>'
    	k +=Forms.CreateInputPropertyPopup("invoice", "fixedrate", Main.NullToEmpty(this.invoicevalue.fixedrate), false)
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->
    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_PER_ORDER_COMMISION_HEADING']?></label>'
    	k +=Forms.CreateInputPropertyPopup("invoice", "perordercommission", Main.NullToEmpty(this.invoicevalue.perordercommission), false)
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->
    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_PER_ORDER_FIXED_RATE_HEADING']?></label>'
    	k +=Forms.CreateInputPropertyPopup("invoice", "perorderfixedrate", Main.NullToEmpty(this.invoicevalue.perorderfixedrate), false)
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->


    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_VAT_HEADING']?></label>'
    	k +=Forms.CreateInputPropertyPopup("invoice", "vat", Main.NullToEmpty(this.invoicevalue.vat), false)
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->

    	k +='<div class="row">'
    	k +='<div class="col-md-12">'
    	k +='<div class="form-group">'
    	k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_OTHER_RATE_HEADING']?></label>'
    	k +=Forms.CreateInputPropertyPopup("invoice", "otherrate", Main.NullToEmpty(this.invoicevalue.otherrate), false)
    	k +='</div>'
    	k +='</div>'
    	<!--col-md-12-->
    	k +='</div>'
    	<!--row-->
   
    	}
    	$("#billingoptiondiv").empty().append(k);
    },
    Save: function () {
    	if(InvoiceConf.PreValidation() == false){
    		return
    	}
        
        Main.Loading(); 
		$.post("lib/myinvoice.php", "f=SaveInvoice&data=" + JSON.stringify(Forms.Form.invoice), function (e) {
			Main.Ready();
			if(e == "cancel") {
				alert("<?= $lang_resource['INVOICE_SORRY_YOU_HAVE_NO_INVOICE'] ?>");
			}
            InvoiceConf.Main()
            Popup.Close();
        })
        Forms.Clean("invoice")
    },
    PreValidation: function(){
	    var count = 0;  
	   
	    if(document.getElementById("businessi").value == "-1"){
	        $("#businessi_text").show();
	        $("#businessi").addClass("error-text-field");
	        $("#businessi").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#businessi_text").hide();
	        $("#businessi").addClass("success-text-field");
	        $("#businessi").removeClass("error-text-field");
	    }
	    if(document.getElementById("dfrm").value == ""){
	        $("#daterange_text").show();
	        $("#dfrm").addClass("error-text-field");
	        $("#dfrm").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#daterange_text").hide();
	        $("#dfrm").addClass("success-text-field");
	        $("#dfrm").removeClass("error-text-field");
	    }
	    if(document.getElementById("tfrm").value == ""){
	    	$("#daterange_text").show();
	        $("#tfrm").addClass("error-text-field");
	        $("#tfrm").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#daterange_text").hide();
	        $("#tfrm").addClass("success-text-field");
	        $("#tfrm").removeClass("error-text-field");
	    }
	    if(document.getElementById("billing").value == "-1"){
	    	$("#billing_text").show();
	        $("#billing").addClass("error-text-field");
	        $("#billing").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#billing_text").hide();
	        $("#billing").addClass("success-text-field");
	        $("#billing").removeClass("error-text-field");
	    }
	    
	    
	    if(count == 0)
	        return true
	    else 
	        return false       
	}, 
	SendReminder: function (val) {
		if(val == 1){var classname ='invoicecheckbox'}else if(val == 2){var classname = 'checkboxcomplete'}
        var b = Main.GetMarkedCheckBoxesValuesByClass(classname);
        //var b = Main.GetMarkedCheckBoxesValues();
	    if (b.length == 0) {
			alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }       
        var a = new Object();
	    a.ids = b;
	    Main.Loading(); 
		$.post("lib/myinvoice.php", "f=SendReminder&data=" + JSON.stringify(a), function (e) {
	        Main.Ready();
			InvoiceConf.Main();
	    })
    }, 
     Delete: function (val) {
     	if(val == 1){var classname ='invoicecheckbox'}else if(val == 2){var classname = 'checkboxcomplete'}
        //var b = Main.GetMarkedCheckBoxesValuesByClass('invoicecheckbox');
        var b = Main.GetMarkedCheckBoxesValuesByClass(classname);        
        if (b.length == 0) {
             alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;

        $.fn.jAlert({
            'message': '<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIRM_DELETE']?>',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                	Main.Loading(); 
                    $.post("lib/myinvoice.php", "f=DeleteInvoice&data=" + JSON.stringify(a), function (e) {
                    	Main.Ready();
                        InvoiceConf.Main()
                        alert('<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_DELETE_PERMANENT']?>');
                    
                    });
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false
            
        });     
    },
    downpdf: function(i) {		
		window.location='lib/invoice_pdf.php?oid='+i;
	 },
    Export: function (b,val) {
    	if(val == 1){var classname ='invoicecheckbox'}else if(val == 2){var classname = 'checkboxcomplete'}
        var c = Main.GetMarkedCheckBoxesValuesByClass(classname);

        //var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
             alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = c;
        a.type = b;
        document.getElementById("exp_data").value = JSON.stringify(a);
        $.fn.jAlert({
            'message': '<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIRM_EXPORT']?>',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){                    
        			document.getElementById("exp_form").submit()
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false
            
        });
        
    },
    InvoiceConfiguration: function(){
    	Main.Loading()
		$.post("lib/myinvoice.php", "f=FetchInvoiceConf" , function (e) {
			Main.Ready();
			InvoiceConf.conf = JSON.parse(e);
			InvoiceConf.InvoiceConfigurationForm(JSON.parse(e));
		});

    },
    InvoiceConfigurationForm: function (e) {	   
        var k = "";   

        Forms.Clean("iconf", "mainbuttonok");
        if (e == null) {
            e = new Object();
			InvoiceConf.conf = new Object();
            Forms.Form.iconf.type = "create"
        } else {
            Forms.Form.iconf.type = "modify";
            Forms.Form.iconf.id = e.id
        }

        var c = "";
        if (e.id) {
        	if(e.isimg==1){
              c = '../panel/images/invoice/' + Main.NullToEmpty(e.id) + '/normal.jpg?c=' + new Date().getTime()
			}
			else{
				c = 'images/dummy/default-logo_invoice.png';
			}
		}else{
				c = 'images/dummy/default-logo_invoice.png';
		}

        k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION']?></h3>'
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        

        k +='<div class="form-control invoice-logo">'        
        k += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >';
        k += '<input id="uploadImage" type="file"  class="user_pic"  name="uploadImage" onChange="InvoiceConf.PreviewImage();" >'
        k += '<input id="showImage" name="showImage" type="hidden" value=""  />';
        k += '<input type="submit" name="submit" onclick="InvoiceConf.triggerImageupload()" style="display:none" />';
        k += '</form>'
        k +='<img id="uploadPreview" src="' + c + '" width="530" height="80" >'
        k +='</div>'



  
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        <!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_WEBSITE_BILLING_MAIL']?> *</label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "wbmail", e.wbmail, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="wbmail_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_WEBSITE_BILLING_MAIL_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
       // k +='<label><?$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_WEBSITE_URL']?> *</label>'
	   k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_WEBSITE_URL']?> *</label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "wurl", e.wurl, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="wurl_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_WEBSITE_URL_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='</div>'
        <!--row--> 
        k +='<div class="row">'
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_ADDRESS']?> *</label>'
        k +=Forms.CreateTextAreaPropertyPopup("iconf", "address", e.address, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="address_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_ADDRESS_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PHONE']?> *</label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "phone", e.phone, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="phone_text" style="color:#F00;display:none;"><?$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PHONE_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='</div>'
        <!--row-->
        k +='<h4 class="form-h4" style="margin-top:10px;"><strong><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PAYMENT_METHOD']?></strong></h4>'
        b = '{"id":"-1","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PAYMENT_METHOD_SELECT_TYPE']?>"},'
        g = "[" + b + '{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PAYMENT_METHOD_SELECT_BANK']?>"},{"id":"2","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_PAYMENT_METHOD_SELECT_PAYPAL']?>"}]';
        g = JSON.parse(g);
		
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_BILLING_OPTION']?> *</label>'
       k +=Forms.CreateSelectPropertyPopup("iconf", "payby", g, e.payby, true, "InvoiceConf.InvoiceConfPaymentType(this.value);InvoiceConf.PreValidationConf()", false)
	  
         k +='<small data-bv-validator="notEmpty" class="help-block" id="payby_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_BILLING_OPTION_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        <!--row-->
        k +='<div id="paymenttype">'
        k +='</div>'



        k +='<h4 class="form-h4" style="margin-top:10px;"><strong>Other</strong></h4>'
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        //k +='<label><?$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_CUSTOM_TEXT']?> *</label>'
		k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_CUSTOM_TEXT']?> *</label>'
        k +=Forms.CreateTextAreaPropertyPopup("iconf", "ctext", e.ctext, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="ctext_text" style="color:#F00;display:none;"><?$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_CUSTOM_TEXT_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-12-->
        k +='</div>'
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="InvoiceConf.SaveInvoiceConf()"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_SUBMIT']?></button></center>'
        k +='</div>'
        <!--col-md--->
        k +='</div>'
        <!--row-->

        Popup.Show(k)
        InvoiceConf.InvoiceConfPaymentType(e.payby)

        $("#name").focus()
	},
	InvoiceConfPaymentType: function(a){
		var k =''
		if(a=='1'){

        k +='<div class="row">'
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_BANK_NAME']?></label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "bankname", InvoiceConf.conf.bankname, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="bankname_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_BANK_NAME_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_BANK_AC']?></label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "bankac", InvoiceConf.conf.bankac, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="bankac_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_BANK_AC_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='</div>'
        <!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_ROUTINE']?></label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "routineno", InvoiceConf.conf.routineno, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="routineno_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_ROUTINE_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='<div class="col-md-6">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_SWIFTCODE']?></label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "swiftcode", InvoiceConf.conf.swiftcode, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="swiftcode_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_SWIFTCODE_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='</div>'
        <!--row-->      
		}else if(a=='2'){
		k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_EMAIL_ADDRESS_PAYPAL']?></label>'
        k +=Forms.CreateInputPropertyPopup("iconf", "vatpaypalemail", InvoiceConf.conf.vatpaypalemail, true,"InvoiceConf.PreValidationConf()")
        k +='<small data-bv-validator="notEmpty" class="help-block" id="vatpaypalemail_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_EMAIL_ADDRESS_PAYPAL_VALIDATION']?></small>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->       
        k +='</div>'
        <!--row-->
		}
		$("#paymenttype").empty().append(k);
	},
	triggerImageupload: function() {

		$("#uform_bimg").submit(function (event) {
			event.preventDefault();
			var formData = new FormData($(this)[0]);
			$.ajax({
	            url: 'upload-image.php',
	            type: 'POST',
	            data: formData,
	            async: false,
	            cache: false,
	            contentType: false,
	            processData: false,
	            success: function (html) {
	               
	              document.getElementById("showImage").value = html
	               
	            },
	            error: function(){
	                alert("<?=$lang_resource['ADMIN_PAGE_PANEL_INVOICE_CONFIGUARTION_ERROR_CONFIGURATION']?>");
	            }
        	});
        });
    },
    
    PreviewImage: function() {        
        document.getElementById("uploadPreview").src ="";          
        $('form#uform_bimg').find('input[type="submit"]').trigger('click');
        var oFReader = new FileReader();        
        oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
        oFReader.onload = function (oFREvent) {
       		document.getElementById("uploadPreview").src = oFREvent.target.result;            
    	};        
    },
	PreValidationConf: function(){ 
		var count = 0;  
	   
	    if(document.getElementById("wbmail").value == ""){
	        $("#wbmail_text").show();
	        $("#wbmail").addClass("error-text-field");
	        $("#wbmail").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#wbmail_text").hide();
	        $("#wbmail").addClass("success-text-field");
	        $("#wbmail").removeClass("error-text-field");
	    }
	    if(document.getElementById("wurl").value == ""){
	        $("#wurl_text").show();
	        $("#wbmail").addClass("error-text-field");
	        $("#wurl").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#wurl_text").hide();
	        $("#wurl").addClass("success-text-field");
	        $("#wurl").removeClass("error-text-field");
	    }
	    if(document.getElementById("address").value == ""){
	        $("#address_text").show();
	        $("#address").addClass("error-text-field");
	        $("#address").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#address_text").hide();
	        $("#address").addClass("success-text-field");
	        $("#address").removeClass("error-text-field");
	    }
	    if(document.getElementById("phone").value == ""){
	        $("#phone_text").show();
	        $("#phone").addClass("error-text-field");
	        $("#phone").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#phone_text").hide();
	        $("#phone").addClass("success-text-field");
	        $("#phone").removeClass("error-text-field");
	    }
		
	    if(document.getElementById("payby").value == "-1"){ 
	        $("#payby_text").show();
	        $("#payby").addClass("error-text-field");
	        $("#payby").removeClass("success-text-field");
	        count ++;
	    }else{
	        $("#payby_text").hide();
	        $("#payby").addClass("success-text-field");
	        $("#payby").removeClass("error-text-field");
	    }
	    if(document.getElementById("payby").value == "1"){ 
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    
	    	if(document.getElementById("bankname").value == ""){
		        $("#bankname_text").show();
		        $("#bankname").addClass("error-text-field");
		        $("#bankname").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankname_text").hide();
		        $("#bankname").addClass("success-text-field");
		        $("#bankname").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("bankac").value == ""){
		        $("#bankac_text").show();
		        $("#bankac").addClass("error-text-field");
		        $("#bankac").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#bankac_text").hide();
		        $("#bankac").addClass("success-text-field");
		        $("#bankac").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("routineno").value == ""){
		        $("#routineno_text").show();
		        $("#routineno").addClass("error-text-field");
		        $("#routineno").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#routineno_text").hide();
		        $("#routineno").addClass("success-text-field");
		        $("#routineno").removeClass("error-text-field");
	    	}
	    	if(document.getElementById("swiftcode").value == ""){
		        $("#swiftcode_text").show();
		        $("#swiftcode").addClass("error-text-field");
		        $("#swiftcode").removeClass("success-text-field");
	        	count ++;
	    	}else{
		        $("#swiftcode_text").hide();
		        $("#swiftcode").addClass("success-text-field");
		        $("#swiftcode").removeClass("error-text-field");
	    	}
	    }else if(document.getElementById("payby").value == "2"){
	    	if(document.getElementById("vatpaypalemail").value == ""){
		        $("#vatpaypalemail_text").show();
		        $("#vatpaypalemail").addClass("error-text-field");
		        $("#vatpaypalemail").removeClass("success-text-field");
		        count ++;
		    }else{
		        $("#vatpaypalemail_text").hide();
		        $("#vatpaypalemail").addClass("success-text-field");
		        $("#vatpaypalemail").removeClass("error-text-field");
		    }
	    }
	    if(document.getElementById("ctext").value == ""){
	        $("#ctext_text").show();
	        $("#ctext").addClass("error-text-field");
	        $("#ctext").removeClass("success-text-field");
	        count ++;
		}else{
	        $("#ctext_text").hide();
	        $("#ctext").addClass("success-text-field");
	        $("#ctext").removeClass("error-text-field");
		}
	    if(count == 0)
	        return true
	    else 
	        return false  
	},
	SaveInvoiceConf: function (a) {
		if(InvoiceConf.PreValidationConf() == false){
			return
		}
		if (document.getElementById("showImage")) {
            Forms.Form.iconf.image =  document.getElementById("showImage").value
        }       
		$.post("lib/myinvoice.php", "f=SaveInvoiceConf&data=" + JSON.stringify(Forms.Form.iconf), function (e) { 
			if (e == "ok") {                    
                Main.Ready();
                Popup.Close();
			}
			InvoiceDtl.Main();
        })
   		Forms.Clean("iconf");
    },
};
