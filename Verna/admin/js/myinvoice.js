var MyInvoice = {
	Main: function(){
		Main.Loading();
		var a = new Date().getTime();
        	Main.Aid = a;
			
			/*$.post("lib/orders.php", "f=FetchAllCurrency", function (g) {
			
			MyInvoice.currency = g;
			
        })
		if(MyInvoice.currency=="undefined"){
			return
		}
		*/	
		$.post("lib/myinvoice.php", "f=MyInvoice", function (b) {
			if (a != Main.Aid) {
                return
            }	
            Main.Ready();
            MyInvoice.Invoice =JSON.parse(b);
            MyInvoice.PrintMain();
        })
	},
	PrintMain: function(){

		var n =''
		n +='<div class="row">'
        n +='<div class="top-bar">'
		n +='<div class=" col-md-6 col-md-offset-6">'                       
       	n +='<div class=" pull-right">'                                     
        n +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Orders.Main()"><i class="fa icon-close"></i><?=$lang_resource['BUSINESS_CANCEL']?></button></div>'                    
        n +='</div>'		
		n +='</div>'
		<!--top-bar-->
		n +='</div>'
		<!--row-->


		n +='<div class="panel panel-danger panel-square panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PENDING']?></h3>'
		n +='</div>'
		<!--col-md-12-->
		
		n += '</div>'
		<!--row-->
		n += '</div>'


		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped">'
		n +='<thead>'
		n +='<tr>'
		
		n +='<th><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_INVOICE_NUMBER']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DATE_OF_INVOICES']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_CITY']?></th>'
		n +='<th><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_RESTURANT_NAME']?></th>'		
		n +='<th><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_TOTAL']?></th>'
		n +='<th><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_VIEW_DETAILS']?></th>'
		n +='<th><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT']?></th>'
		n +='<th><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_STATUS']?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="myinvoice">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'

		$("#main").empty().append(n);
		MyInvoice.PopulateTable()
	},
	PopulateTable: function(){
		
	var n ='';
	for (var f in MyInvoice.Invoice) {
		n +='<tr>'			
		n +='<td>'+MyInvoice.Invoice[f].id+'</td>'
		n +='<td onclick="MyInvoice.PaymentDetails('+MyInvoice.Invoice[f].id+')">'+MyInvoice.Invoice[f].date+'</td>'
		n +='<td>'+MyInvoice.Invoice[f].city+'</td>'
		n +='<td>'+MyInvoice.Invoice[f].resturant+'</td>'		
		n +='<td>'+ Main.currency+' '+MyInvoice.Invoice[f].invoicepay+'</td>'
		n +='<td style="padding:0px !important; text-align:center;"><a href="javascript:MyInvoice.InvoiceDetails('+MyInvoice.Invoice[f].id+')" class="eye-icon"><i class="fa icon-eye"></i></a></td>'
		n +='<td style="padding:0px !important; text-align:center;"><a href="javascript:MyInvoice.MakePayment('+MyInvoice.Invoice[f].id+')" class="eye-icon"><i class="fa icon-credit"></i></a></td>'
		n +='<td><button type="button" class=" btn btn-danger btn_pendeng"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_Pending']?></button></td>'
		n +='</tr>'
	}

		$("#myinvoice").empty().append(n);
	},
	MakePayment: function(id){
		Main.Loading();
		$.post("lib/myinvoice.php", "f=MyInvoicePayment&id="+id, function (b) {
            Main.Ready();
            MyInvoice.MakePaymentForm(JSON.parse(b));
        })
	},
	MakePaymentForm: function (b){

		Forms.Clean("payment", "mainbuttonok");		
        if (b == null) {		
            b = new Object();
            Forms.Form.payment.type = "create";			
        } else {
			Forms.Form.payment.type = "modify";
            Forms.Form.payment.id = b.id;
        }
        MyInvoice.duepayment = b.duepayment;
        Forms.CreateValue("payment", "id", b.id);

		var n ='';
		n +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_OPTION']?></h3>'
		
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_AMOUNT_TO_BE_PAID']?></label>'
		n +='<input type="text" class="form-control" value="'+b.invoicepay+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'		
		<!--row--> 

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		//n +='<label><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DUE_AMOUNT_TO_BE_PAID']?></label>'
		if(Main.NullToEmpty(b.duepayment) == "" || b.duepayment == 0 ){ 
			var paymentdue = b.invoicepay;
		}else{
			var paymentdue = b.duepayment;
		}
		n +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_MY_REMAINING_INVOICE_PAYMENT_AMOUNT_TO_BE_PAID']?></label>'
		n +='<input type="text" class="form-control" id="duepayment" value="'+Main.NullToEmpty(paymentdue)+'" readonly>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'		
		<!--row-->
		

		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_AMOUNT']?></label>'
		n +=Forms.CreateInputPropertyPopup("payment", "payment", '', true, "MyInvoice.PreValidation()",'','',"return Main.IsNumberKey(event)")
		n +='<small data-bv-validator="notEmpty" class="help-block" id="payment_text" style="color:#F00;display:none;" ></small>'
		n +='</div>'
		n +='</div>'
		<!--col-md-12-->
		n +='</div>'
		<!--row--> 
		n +='<div class="row">'
		n +='<div class="col-md-6 col-md-offset-3">'
		n +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="MyInvoice.Payment()"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT']?></button></center>'
		n +='</div>'
		<!--col-md--->
		n +='</div>'
		<!--row-->

		Popup.Show(n)
           
	},
	PreValidation: function(){

   	var count = 0;	
    
    	if(document.getElementById("payment").value == ""){
    		html ='<?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_VALIDATION']?>';
    		$("#payment_text").empty().append(html);
            $("#payment_text").show();
            $("#payment").addClass("error-text-field");
            $("#payment").removeClass("success-text-field");
            count ++;
        }else if(document.getElementById("payment").value == 0){
    		html ='<?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_VALIDATION_ZERO']?>';
    		$("#payment_text").empty().append(html);
            $("#payment_text").show();
            $("#payment").addClass("error-text-field");
            $("#payment").removeClass("success-text-field");
            count ++;
       }else if(document.getElementById("payment").value > document.getElementById("duepayment").value){
    		html ='<?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_VALIDATION_LESSER_EQUAL']?>';
    		$("#payment_text").empty().append(html);
            $("#payment_text").show();
            $("#payment").addClass("error-text-field");
            $("#payment").removeClass("success-text-field");
            count ++;
        }else{
        	$("#payment_text").hide();
            $("#payment").addClass("success-text-field");
            $("#payment").removeClass("error-text-field");
        }

        if(count == 0)
        	return true
        else 
        	return false
        
       
    
	},
	Payment: function(){		
		if(MyInvoice.PreValidation() == false){
			return
		}
		if (Forms.CanSave("payment") == false) {
            return
        }
		Main.Loading();
        $.post("lib/myinvoice.php", "f=SaveMakePayment&data=" + JSON.stringify(Forms.Form.payment), function (e) {
			Main.Ready();
			Popup.Close();
			if(Main.User.level == 2){
				MyInvoice.Main();
			}else if(Main.User.level == 0){
				InvoiceConf.Main();
			}
			
        });
        Forms.Clean("payment")
	},
	PaymentDetails: function(id){
		var n =''
		n +='<div class="row">'
		n +='<div class="top-bar">'
		n +='<div class=" col-md-6 col-md-offset-6">'
		n +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn" onclick="MyInvoice.Main()"><i class="fa icon-close"></i><?=$lang_resource['BUSINESS_CANCEL']?></button></div>'
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
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING']?></h3>'
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
		n +='<th width="5%"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_ID']?></th>'
		n +='<th width="15%"><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_DATE']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_BUSINES']?></th>'
		n +='<th width="15%"><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_INVOICE_ID']?></th>'
		n +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_INVOICE_PAY']?></th>'
		n +='<th width="15%"><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_INVOICE_TOTAL_ITEM']?></th>'
		n +='<th width="15%"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_INVOICE_PAYMENT']?></th>'
		n +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_PAYMENT_HEADING_INVOICE_DUE']?></th>'
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
		$.post("lib/myinvoice.php", "f=FetchInvoiceDataForPdf&id=" + id, function (e) {			
			Main.Ready();
			if (e != "") {
				MyInvoice.InvoiceDetailsForm(JSON.parse(e))
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

		p +='<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn" onclick="MyInvoice.Main()"><i class="fa icon-close"></i></button></div>'
		p +='<div class=" pull-right" style="margin-right:5px;"><button class="btn btn-default btn-rounded-lg close-btn" onclick="MyInvoice.InvoiceSave()"><i class="fa icon-save"></i></button></div>'
		p +='<div class=" pull-right" style="margin-right:5px;"><button class="btn btn-default btn-rounded-lg close-btn" onclick="MyInvoice.downpdf('+a.id+')"><i class="fa icon-download"></i></button></div>'
		p +='</div>'
		<!--col-md-5-->
		p +='</div>'
		<!--top-bar-->
		p +='</div>'
		<!--row-->



		p +='<div class="panel panel-danger panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE']?> '+a.id+'</h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="form-group">'
		p +='<label><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_STATUS']?></label>'
		var q = new Array();
		q.push(JSON.parse('{"id":"-1","caption":""}'));
        q.push(JSON.parse('{"id":"0","caption":"<?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_STATUS_PENDING_PAYMENT_TO_OOS']?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_STATUS_PENDING_PAYMENT_TO']?> '+ a.resturant +'"}'));
		q.push(JSON.parse('{"id":"2","caption":"<?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_STATUS_PAID_TO_OOS']?>"}'));
		q.push(JSON.parse('{"id":"3","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_STATUS_PAID_TO']?> '+ a.resturant +'"}'));
        q.push(JSON.parse('{"id":"4","caption":"<?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_STATUS_CANCELLED']?>"}'));

		p +=Forms.CreateSelectPropertyAdmin("invoiceorder", "status", q, a.status,true);
		p +='</div>'
		p +='</div>'
		p +='</div>'
		<!--row-->

		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="form-group">'
		p +='<label><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_ADMIN_COMMENT']?> *</label>'
		p +=Forms.CreateTextAreaPropertyAdminReadonly("invoiceorder", "admin_comment", Main.NullToEmpty(a.admin_comment), false, "", true, "comment")
		p +='</div>'
		p +='</div>'
		p +='<div class="col-md-6">'
		p +='<div class="form-group">'
		p +='<label><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_COMMENT']?></label>'
		p +=Forms.CreateTextAreaPropertyAdmin("invoiceorder", "comment", Main.NullToEmpty(a.comment), false, "", true, "comment")
		p +='</div>'
		p +='</div>'
		p +='</div>'
		<!--row-->

		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="">'
		p +='<h4><strong><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_ORDER']?>'+ a.id +'</strong></h4>'
		p +='<p><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_DATE']?>	'+ a.date +'.<br>'
		p +='<?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PERIOD']?> 	( ' + a.periodp +' )</p>'
		p +='</div>'
		<!--pull-left-->
		p +='</div>'
		p +='<div class="col-md-6">'
		c='';		
		if(a.isimg==1){
            c = 'images/logo/1/normal.jpg?c=' + new Date().getTime() ;
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
		p +='<strong><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PHONE']?></strong> '+Main.NullToEmpty(a.telb)+'</p>'
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
		p +='<td><strong><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_TEL']?></strong></td>'
		p +='<td>'+Main.NullToEmpty(a.phone)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><strong><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_EMAIL']?></strong></td>'
		p +='<td>'+Main.NullToEmpty(a.wbmail)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><strong><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_WEBSITE']?></strong></td>'
		p +='<td>'+Main.NullToEmpty(a.wurl)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><strong><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_VAT_REGISTRATION']?></strong></td>'
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
		p +='<th width="50%"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_BREAKDOWN']?></th>'
		p +='<th width="0%">&nbsp;</th>'
		p +='<th width="5%"><?$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_AMOUNT']?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_TOTAL_VALUE_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.totalorder)+' <?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.total_invoice)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PAID_CASH_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.cashcount)+' <?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.cashtotal)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PAID_PAYPAL_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.paypalcount)+' <?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.paypaltotal)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_PREPAID_ONLINE_FOR']?></td>'
		p +='<td>'+Main.NullToEmpty(a.cardcount)+' <?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_ORDER']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.cardtotal)+'</td>'
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
		p +='<td align="right" width="55%">'+Main.NullToEmpty(a.perordercommission)+' <?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_INVOICE_CUSTOMER_COMMISSION_ON_ORDER']?></td>'
		p +='<td align="right" width="45%">'+ Main.currency+' '+Main.NullToEmpty(a.commisioncal)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_SETUP_RATE']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.setuprate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_FIXED_RATE']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.fixedrate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_PER_ORDER_FIXED_RATE']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.orderrate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_OTHER_RATE']?></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.otherrate)+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['ADMIN_PAGE_PANEL_MY_INVOICE_DETAIL_VAT']?> ('+ Main.NullToEmpty(a.vat)+' %)</td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.vatp)+'</td>'
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
		p +='<td align="right" width="45%">'+ Main.currency+' '+Main.NullToEmpty(a.totalbalance)+'</td>'
		p +='</tr>'
		var paymenttotal='';
		var duepayment = '';
		for (var c in a.mapayment){
			paymenttotal += Main.NullToEmpty(a.mapayment[c].payment);
			duepayment = Main.NullToEmpty(a.mapayment[c].pdue);
		}
		if(paymenttotal==0){
		p +='<tr>'
		p +='<td align="right">Total owned from restrunt ('+ Main.currency+' '+Main.NullToEmpty(a.totalbalance)+' - '+ Main.currency+'0.00)</td>'
		p +='<td align="right">'+ Main.currency+''+Main.NullToEmpty(a.totalbalance)+'</td>'
		p +='</tr>'
		}else{
		p +='<tr>'
		p +='<td align="right">Total owned from restrunt ('+ Main.currency+' '+Main.NullToEmpty(a.totalbalance)+' - '+ Main.currency+' '+paymenttotal+')</td>'
		p +='<td align="right">'+ Main.currency+' '+duepayment+'</td>'
		p +='</tr>'	
		}
		p +='<tr>'
		p +='<td align="right"><?=$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED']?></td>'
		p +='<td align="right">'+ Main.currency+' '+a.totalinvoicedue+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td align="right"><strong><?=$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS']?>:</strong></td>'
		p +='<td align="right">'+ Main.currency+' '+Main.NullToEmpty(a.totalpay)+'</td>'
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">'
		p +='<p style="font-size:12px"><?=$lang_resource['INVOICE_QUESTIONS']?> : support@orderonlinesystem.com</p>'
		p +='<p style="font-size:12px"><?=$lang_resource['INVOICE_INVOICE_INFORMATION']?> : support@orderonlinesystem.com</p>'
		p +='<h4 class="text-center"><strong>Payment Details</strong></h4>'
		p +='<hr / style=" margin:0px 0px 10px 0px; border-top: 1px solid #ABABAB;">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped table-condensed" style="margin-bottom:10px">'
		
		p +='<thead>'
		p +='<tr>'
		p +='<th width="40%"><?=$lang_resource['INVOICE_PAYMENT_TYPE'] ?></th>'
		if(a.payby == 1){
		p +='<th width="40%"><?=$lang_resource['INVOICE_BANK_NAME']?></th>'
		p +='<th width="20%"><?=$lang_resource['INVOICE_BANK_AC_NO']?></th>'
		p +='<th width="20%"><?=$lang_resource['INVOICE_ROUTINE_NO']?></th>'
		p +='<th width="20%"><?=$lang_resource['INVOICE_SWIFT_CODE']?></th>'
		}else{
		p +='<th width="40%"><?=$lang_resource['INVOICE_EMAIL_ADDRESS']?></th>'
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
		p +='<th width="10%"><?=$lang_resource['ORDER_DETAILS_RESERVE_DATE']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_ORDER_NO']?></th>'
		p +='<th width="10%"><?=$lang_resource['INVOICE_PAID']?></th>'
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
		p +='<td><strong>$ '+Main.NullToEmpty(a.mapayment[b].mpinvoicepay)+'</strong></td>'
		p +='<td><strong>$ '+ Main.NullToEmpty(a.mapayment[b].payment)+'</strong></td>'
		p +='<td><strong>$ '+ Main.NullToEmpty(a.mapayment[b].pdue)+'</strong></td>'
		p +='<td><strong>'+ Main.NullToEmpty(a.perordercommission)+'</strong></td>'
		p +='<td><strong>$ '+ Main.NullToEmpty(a.perorderfixedrate)+'</strong></td>'
		p +='</tr>'	
		}	
		}
		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		<!--table-responsive-->
		p +='<p style=" padding:10px; font-size:14px;background:#666666; color:#fff;"><?=$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS']?> '+Main.NullToEmpty(a.perorderfixedrate)+' per Order</strong></p>'
		p +='</div>'
		<!--panel-body -->
		p +='</div>'


        $("#main").empty().append(p);
	},
	InvoiceSave: function () {
        Main.Request("myinvoice", null, "f=SaveInvoiceStatus&data=" + JSON.stringify(Forms.Form.invoiceorder), "MyInvoice.Main()");
	    Forms.Clean("invoiceorder")
    },
    downpdf: function(i) {		
		window.location='lib/invoice_pdf.php?oid='+i;
	},
};
