var IS_STATUS_CHANGE ='-1';
var OrderPrint = {
	Main: function(){
		Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;
		
		$.post("lib/orders.php", "f=FetchMapData", function (l) {
			//alert(l)
			if(l !=""){
				OrderPrint.map = l;
				//alert(Orders.map)
			}
			});
		$.post("lib/orders.php", "f=FetchAllOrdersData", function (c) {
			if (a != Main.Aid) {
                return
            }
	        Main.Ready();
	        if (c != ""){
				OrderPrint.Orders = JSON.parse(c);
				
				OrderPrint.PrintMain();	            
	        } else {
	            alert("Error")
	        }
	    })
	},
	PrintMain: function(){
		var n =''
		n +='<div class="row">'
		n +='<div class="top-bar">'
		n +='<div class=" col-md-6 col-md-offset-6">'
		n +='<div class=" pull-right">'
		n +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
		n +='</div>'
		<!--col-md-5-->
		n +='</div>'
		<!--top-bar-->
		n +='</div>'
		<!--row-->



		n +='<div class="panel panel-danger panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-2">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_ORDER_PRINT']?></h3>'
		n +='</div>'
		<!--col-md-5-->	
		n +='<div class="col-md-3">'	
		n +='<div class="" id="orderf">'
		
		n +='</div>'
		n +='</div>'
		<!--col-md-3-->
		n +='<div class="col-md-7">'
		n +='<div class="panel-btn pull-right">'

		n +='<div>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Main.ToogleAllCheckBoxes(\'checkbox\')"><i class="fa icon-checkbox-checked"></i> <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:OrderPrint.ChangeStatusMultiple(1)"><i class="fa icon-checkmark"></i> <?=$lang_resource['ADMIN_PAGE_ORDER_PRINT_CONFIRMED']?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="OrderPrint.ChangeStatusMultiple(0)"><i class="fa  icon-notification"></i> <?=$lang_resource['ORDER_PENDING'] ?></button></span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="OrderPrint.ChangeStatusMultiple(2)"><i class="fa icon-close"></i> <?=$lang_resource['ORDER_CANCELLED']?></button></span>'
		n +='</div>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row-->
		n +='</div>'

		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table id="datatable-example" class="table table-th-block table-striped tbl_enebal table-hover">'
		n +='<thead>'
		n +='<tr>'
		n +='<th width="5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
		n +='<th width="15%" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
		n +='<th width="20%" class="hand"><?=$lang_resource['ORDER_DATE_TIME']?></th>'
		n +='<th width="15%" class="hand"><?=$lang_resource['ORDER_TAB_TOTAL']?></th>'
		n +='<th width="15%" class="hand"><?=$lang_resource['ORDER_DETAILS_RESERVE_TYPE']?></th>'
		n +='<th width="15%"><?=$lang_resource['ORDER_TAB_STATUS']?></th>'
		n +='<th width="15%">&nbsp;</th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="allorders">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->	
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'


		$("#main").empty().append(n);

	    OrderPrint.PupulateTable()
	},
	PupulateTable: function(){

		var n=''     

        var q = new Array();	
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ORDER_DETAILS_PENDING'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ORDER_DETAILS_COMPLETE'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['ORDER_DETAILS_CANCEL'] ?>"}'));		
		q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['ORDER_DETAILS_PREPERATION'] ?>"}'));
		q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['ORDER_DETAILS_ORDER_ON_ITS_WAY'] ?>"}'));
		q.push(JSON.parse('{"id":"5","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_RESTAURANT'] ?>"}'));
		q.push(JSON.parse('{"id":"6","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_DRIVER'] ?>"}'));
		q.push(JSON.parse('{"id":"7","caption":"<?= $lang_resource['ORDER_DETAILS_RESTAURANT_ACCEPTED'] ?>"}'));

        for (var f in this.Orders){
        	if(this.Orders[f].status == IS_STATUS_CHANGE || IS_STATUS_CHANGE == -1){
			//	if(this.Orders[f].deliverytype!=""){
            	n +='<tr>'
				n +='<td><input type="checkbox" class="checkbox" value="'+this.Orders[f].id+'"></td>'
				n +='<td>'+Main.NullToEmpty(this.Orders[f].name)+'</td>'
				n +='<td>'+this.Orders[f].date+'</td>'
				var nte15=this.Orders[f].total;
				
				n +='<td>' +Main.currency+' ' +parseFloat(nte15).toFixed(IS_DECIMAL_POINT)+'</td>'
				if(this.Orders[f].deliverytype=="pickup"){
					n +='<td><span class="delivery"><?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_PICKUP']?></span></td>';
				
				}else if(this.Orders[f].deliverytype=="delivery"){
				n +='<td><span class="delivery"><?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_DELIVERY']?></span></td>';			
				}
				else{
					n +='<td><span class="delivery">&nbsp;</span></td>';
				}
				//n +='<td><span class="delivery">'+$ordertype+'</span></td>'
				
				
				n +='<td>'
				n +='<select class="status_combo" onchange="OrderPrint.ChangStatus(this.value,'+this.Orders[f].id+')">'
				for(var sq in q){
					if(q[sq].id == this.Orders[f].status){
						n +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
					}else{
						n +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
					}
				}				
				n +='</select>'
				n +='</td>'
				n +='<td>'
				n +='<div class="edit_btn_dv">'
				n +='<button type="button" class="edit_btn" onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" ><i class="icon-pencil"></i></button>'
				n +='</div>'
				<!--edit_btn_dv-->
				n +='<div class="delete_btn_dv">'
				n +='<button type="button" class="delete_btn" onclick="OrderPrint.Delete(' + Main.NullToEmpty(this.Orders[f].id) + ')"><i class="icon-close"></i></button>'
				n +='</div>'
				<!--edit_btn_dv-->
				n +='</td>'
				n +='</tr>'
			
			//}
			}
           
        }
        $("#allorders").empty().append(n)

        $(document).ready(function () {
            $('#datatable-example').dataTable({           
				"iDisplayLength": 5,
				"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
				"oLanguage": { "sSearch": '',"sInfo": "<?= $lang_resource['ADMIN_PAGE_TOTAL_ORDERS'] ?> : _START_ - _END_ / <span>_TOTAL_</span>" },
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0 ] }] 
			});
      });
        var q = new Array();
        q.push(JSON.parse('{"id":"-1","caption":"All"}'));	
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ORDER_DETAILS_PENDING'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ORDER_DETAILS_COMPLETE'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['ORDER_DETAILS_CANCEL'] ?>"}'));		
		q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['ORDER_DETAILS_PREPERATION'] ?>"}'));
		q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['ORDER_DETAILS_ORDER_ON_ITS_WAY'] ?>"}'));
		q.push(JSON.parse('{"id":"5","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_RESTAURANT'] ?>"}'));
		q.push(JSON.parse('{"id":"6","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_DRIVER'] ?>"}'));
		q.push(JSON.parse('{"id":"7","caption":"<?= $lang_resource['ORDER_DETAILS_RESTAURANT_ACCEPTED'] ?>"}'));
       var st=''
        st +='<select class="status_combo filter-status" style="margin-top:8px;" onchange="OrderPrint.statusShow(this.value)">'
        for(var sq in q){
        	
        	if(q[sq].id == IS_STATUS_CHANGE){
				st +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
			}else{
				st +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
			}	
		}		
		st +='</select>'
		 $("#statusdiv").empty().append(st)

		var fr = $( "#filtersearch" ).children();
		 $("#orderf").empty().append(fr); 
	},
	statusShow: function(status){
		IS_STATUS_CHANGE = status;
		OrderPrint.PrintMain();
	},
	ChangStatus: function(status,id){
		Main.Loading();
		var b = new Array();
		b.push(id)
		var a = new Object();
        a.ids = b;
        
        $.post("lib/orders.php", "f=ChangeStatusMultiple&status="+status+"&data=" + JSON.stringify(a), function (c) {
        	Main.Ready();
        	OrderPrint.Main()
        });
	},
	ChangeStatusMultiple: function (status) {		
		
        var b = Main.GetMarkedCheckBoxesValuesByClass('checkbox');
        if (b.length == 0) {
			alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Loading();
        $.post("lib/orders.php", "f=ChangeStatusMultiple&status="+status+"&data=" + JSON.stringify(a), function (c) {
        	Main.Ready();
        	OrderPrint.Main()
        });
     
    },
	Delete: function(a){
		Main.Request("orders", null, "f=DeleteOrderById&id=" + a, "OrderPrint.Main()")
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
            }else if(c.length > 1){
				alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_EDIT']?>");
                return
            }
        } if (d) {
            Main.Loading();
            var f = new Date().getTime();
            Main.Aid = f;
            $.post("lib/orders.php", "f=FetchOrderData&id=" + a, function (e) {
				$.post("lib/orders.php", "f=FetchDriverGroup&order_id=" + a, function (b) {
					var totalrec = JSON.parse(b);
					var d = new Array();
					d.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['ORDER_DETAILS_SELECT_DRIVER']?>"}'));
					for (var c in totalrec) {
						var e1 = new Object();
						e1.id = totalrec[c].id;
						e1.caption = totalrec[c].caption ;
						d.push(e1)
					}
					OrderPrint.driver = d;
					if (f != Main.Aid) {
	                    return
	                }
	                Main.Ready();
	                if (e != "") {
	                    OrderPrint.Form(JSON.parse(e))
	                } else {
	                    alert("Error")
	                }
				})                
            })
        }
    },
	
	 	
    Form: function (a) {
        var p = "";

		Forms.Clean("order", "mainbuttonok");
        Forms.Form.order.type = "modify";
        Forms.Form.order.id = a.id;
		
		
		
		if(Main.NullToEmpty(a.driver_id)!="") {
			  Forms.Form.order.driverid = a.driver_id;
		
		}
		
		var q = new Array();
		
		q.push(JSON.parse('{"id":"-1","caption":""}'));
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ORDER_DETAILS_PENDING'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ORDER_DETAILS_COMPLETE'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['ORDER_DETAILS_CANCEL'] ?>"}'));
		q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['ORDER_DETAILS_PREPERATION'] ?>"}'));
		q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['ORDER_DETAILS_ORDER_ON_ITS_WAY'] ?>"}'));
		q.push(JSON.parse('{"id":"5","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_RESTAURANT'] ?>"}'));
		q.push(JSON.parse('{"id":"6","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_DRIVER'] ?>"}'));
		q.push(JSON.parse('{"id":"7","caption":"<?= $lang_resource['ORDER_DETAILS_RESTAURANT_ACCEPTED'] ?>"}'));

		
		p +='<div class="row">'
		p +='<div class="top-bar">'
		p +='<div class=" col-md-4">'
		p +='<div class="row">'
		p +='<div class="col-md-5"><label class="topbar-label"><?= $lang_resource['ORDER_DETAILS_CHECK_ORDER_STATUS'] ?></label></div>'
		p +='<div class="col-md-7">'
		p += Forms.CreateSelectPropertyOrder("order", "status", q, a.status, false, "", true)
		p +='</div>'
		p +='</div>'
		<!--row-->
		p +='</div>'
		<!--col-md-4-->
		
		if(Main.User.level!=4){
		p +='<div class=" col-md-3">'
		p +='<div class="row">'
		p +='<div class="col-md-5"><label class="topbar-label"><?= $lang_resource['ORDER_DETAILS_SELECT_DRIVER'] ?></label></div>'
		p +='<div class="col-md-7">'
		p +=Forms.CreateSelectPropertyOrder("order", "driver_id", Orders.driver, a.driver_id, false)
		p +='</div>'
		p +='</div>'
		<!--row-->
		p +='</div>'
		<!--col-md-3-->
		}
		
		p +='<div class="col-md-5">'
		p +='<div class="save-btn-dv  pull-right">'
		p +='<button class="btn btn-default btn-rounded-lg save-btn" onclick="OrderPrint.Save()"><i class="fa  icon-save"></i> <?= $lang_resource['ORDER_DETAILS_SAVE'] ?></button><button class="btn btn-default btn-rounded-lg close-btn" onclick="OrderPrint.PrintMain()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button>'
		p +='</div>'
		p +='</div>'
		<!--col-md-5-->
		p +='</div>'
		<!--top-bar-->
		p +='</div>'
		<!--row-->
		
		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_COMMENTS_ORDER'] ?></h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +=Forms.CreateTextAreaPropertyOrder("order", "driver_comment", Main.NullToEmpty(a.driver_comment), false, "", true, "form-control rounded")
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div>'
		p +='</div>'
		<!--col-md-6-->
		
		p +='<div class="col-md-6">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_DRIVER_COMMENT'] ?></h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +=Forms.CreateTextAreaPropertyOrder("order", "comment", Main.NullToEmpty(a.comment), false, "", true, "form-control rounded") 
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div> '
		p +='</div>'
		<!--col-md-6-->
		p +='</div>'
		<!--row-->
		if(a.requestcollectiondata=="null"){
		var n = JSON.parse(a.data);
		
		if(n.business[0].dishes != ""){
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_ORDER_NO'] ?> : ' + a.id +'</h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +='<div class="row">'
		p +='<div class="col-md-3">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		if($.inArray( 'Name',n.buyer.checkoutfields ) != -1){
			var strname = n.buyer.name;
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + strname.replace("%20", " ") +'</td>'
		p +='</tr>'
		}
		if($.inArray( 'Email',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_EMAIL'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.email +'</td>'
		p +='</tr>'
		}
		if($.inArray( 'Full Address',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_ADDRESS'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.address +'</td>'
		p +='</tr>'
		}
		if($.inArray( 'Phone',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_PHONE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.tel +'</td>'
		p +='</tr>'
		}
		if($.inArray( 'City',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_CITY'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.cityname +'</td>'
		p +='</tr>'
		p +='<tr>'
		}
		if($.inArray( 'Where did you find about us',n.buyer.checkoutfields ) != -1){
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_REFERENCE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.reference +'</td>'
		p +='</tr>'
		}
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		
		p +='</div>'
		<!--col-md-3-->
		p +='</div>'
		<!--row-->
		
		p +='<div class="doted-line"></div>'
		<!--doted-line-->
		
		var m = "";
        var h;
        for (var g in n.business) {
        if (n.business[g].id && n.business[g].dishes !="") {
        h = 0;
		p +='<h4 style="font-size:18px; color:#343434; font-weight:400; margin:30px 10px 5px 0px;">'
		p +='<span style="color:#ff283d; font-weight:600;">'+ n.business[g].name +'</span> (<?= $lang_resource['ORDER_DETAILS_BUSINESS_PHONE'] ?>: ' + n.business[g].tel + ')</h4>'
		m = "";
		
		if(IS_PAYPAL_ENABLED == 1){
		 if (n.paypalid==undefined){
		  if (n.business[g].paymethod.cash == true){
		     m = "<?= $lang_resource['CASH_DELIVERY'] ?>"
		   }
		   if (n.business[g].paymethod.card == true){
			   if (m == ""){
				   m = "<?= $lang_resource['CARD_DELIVERY'] ?>"
				}else{
				   m += " <?= $lang_resource['AND_CARD'] ?>"
				}
			}
		   }else{
			if (n.business[g].paymethod.paypal == true) {
			  m = "<?= $lang_resource['PAID_WITH_PAYPAL'] ?> ("+n.paypalid+")";
			}
		 }
	  }else{
		  
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
			m = "<?= $lang_resource['ORDER_PAID_WITH_MERCADOPAGO'] ?> ("+n.mercadopagoid+")";
		}
		 if (n.business[g].paymethod.paypaladaptive == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_PAYPAL_ADAPTIVE'] ?> ";
		}
		if (n.business[g].paymethod.transactium == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_TRANSACTIUM'] ?>";
			
		}
		if (n.business[g].paymethod.voguepay == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_VOGUE'] ?>";
			
		}
		if (n.business[g].paymethod.worldpay == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_WORLDPAY'] ?>";
			
		}
		if (n.business[g].paymethod.braintree == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_BRAINTREE'] ?>";
			
		}
		if (n.business[g].paymethod.authorize == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_AUTHORIZE'] ?>";
			
		}
		if (n.business[g].paymethod.mercury == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_MERCURY'] ?>";
			
		}
		if (n.business[g].paymethod.pexpress == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_PEXPRESS'] ?>";
			
		}
		if (n.business[g].paymethod.maksekeskus == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_MAKSEKESKUS'] ?>";
			
		}
		
		if (n.business[g].paymethod.skrill == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_SKRILL'] ?>";
			
		}
		if (n.business[g].paymethod.payeezy == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_PAYEEZY'] ?>";
			
		}
		
		p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD'] ?>: '+m+'</p>'
		
		
		if(IS_SCRIPTID == 6){
			if(n.buyer.deliveryType) {
			if(n.buyer.deliveryType.toLowerCase()=="pickup"){
				p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: <?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_PICKUP']?></p>'
					
				}else if(n.buyer.deliveryType.toLowerCase()=="delivery"){
				p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: <?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_DELIVERY']?></p>'			
				}else if(n.buyer.deliveryType.toLowerCase()=="reservation"){
				p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: <?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_RESERVATION']?></p>'			
				}
				else{
					p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: &nbsp;</p>'	
				}
			}
			
			p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_COLLECT_ON'] ?>: '+n.buyer.collectdate+" "+n.buyer.collecthours+":"+n.buyer.collectminutes+'</p>'
			
			p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_ON'] ?>: '+n.buyer.deliverydate+" "+n.buyer.deliveryhours+":"+n.buyer.deliveryminutes+'</p>'
			
		}else{
		
		
		if(n.buyer.deliveryType) {
		p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: '+n.buyer.deliveryType+'</p>'
		}
		if(n.buyer.deliverydate) {
		p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_DATE'] ?>: '+n.buyer.deliverydate+'</p>'
		}		
		if(n.buyer.deliveryhours) {
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
			time = deliveryhours[0]+':'+n.buyer.deliveryminute;
			openclosetime1= Main.ConvertTimeFormat(time);

		p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TIME'] ?>: '+openclosetime1+'</p>'
		}
		
		}
		
		p +='<div class=" table-responsive">'
		
		p +='<table class="table table-th-block table-striped">'
		p +='<thead>'
		p +='<tr>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_PRODUCT'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_PRODUCT_OPTION'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_COMMENTS'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_PRICE'] ?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
        for (var f in n.business[g].dishes) {
		p +='<tr>'
		p +='<td>'+n.business[g].dishes[f].quantity+' X '+ n.business[g].dishes[f].name +'</td>'
		var c = new Array();
		var l = new Array();
		for (var e in n.business[g].dishes[f].ingredients) {
			if (n.business[g].dishes[f].ingredients[e].enabled) {
				c.push(n.business[g].dishes[f].ingredients[e].caption)
			}
		}
		p +='<td>'
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
       p +='</td>'
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
		
		p += '<td >' + Main.NullToEmpty(n.business[g].dishes[f].comments) + "</td>";
		p += '<td >'+Main.currency+' '+ parseFloat(n.business[g].dishes[f].total).toFixed(IS_DECIMAL_POINT) + "</td>";
		p += "</tr>";
		h = parseFloat(parseFloat(h) + parseFloat(n.business[g].dishes[f].total)).toFixed(IS_DECIMAL_POINT)
		}
        h = parseFloat(parseFloat(h) + parseFloat(n.business[g].shipping)).toFixed(IS_DECIMAL_POINT);
		
		var b = "<?= $lang_resource['ORDER_DETAILS_DELIVERY_V2'] ?>";
		if (n.business[g].shipping == "0.00") {
			b = "<?= $lang_resource['ORDER_DETAILS_FREE_DELIVERY_V2'] ?>"
		}

		p +='<tr>'
		p +='<td>' + b +'</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>'+ Main.NullToEmpty(n.buyer.comments) + '</td>'
		p +='<td>'+Main.currency+' '+ n.business[g].shipping +'</td>'
        p +='</tr>'
		
		if(n.buyer.tips){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_TIPS'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>'+Main.currency+' '+ parseFloat(n.buyer.tips).toFixed(IS_DECIMAL_POINT)  +'</td>'
        p +='</tr>'
		}
		
		/*discount code section */
		
		if(n.discounttype > 0){
			if(n.discounttype == 1 && n.discountprice !=''){
				var discaption = '<?=$lang_resource['ORDER_DETAILS_SHOPPING_DISCOUNT_TEXT'] ?> ('+n.discountrate+'%)';
			}else{
				var discaption = '<?=$lang_resource['ORDER_DETAILS_SHOPPING_DISCOUNT_TEXT'] ?> ';
			}
			if(n.discountprice !=''){
				h = parseFloat(parseFloat(h) - parseFloat(n.discountprice)).toFixed(IS_DECIMAL_POINT);
		p +='<tr>'
		p +='<td>'+ discaption +'</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>' + Main.NullToEmpty(n.discountcomments) + '</td>'
		p +='<td>'+Main.currency+' '+parseFloat(n.discountprice).toFixed(IS_DECIMAL_POINT)+ '</td>'
        p +='</tr>'

			}
		}
		/*discount code section */
				
				
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_TOTAL'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">'+Main.currency+' '+ h +'</span></td>'
		p +='</tr>'

		if(Main.NullToEmpty(n.usedpointvalue) !="" && n.usedpointvalue !=0.00){
		p +='<tr>'
		p +='<td><?=$lang_resource['PAID_POINT_TOTAL'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		if(!(parseFloat(n.usedpointvalue))){
			 n.usedpointvalue=0;
			}
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+ parseFloat(n.usedpointvalue).toFixed(IS_DECIMAL_POINT) +'</span></td>'
		p +='</tr>'
		}
		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div> '
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'
		<!--row-->
	    }<!--if (n.business[g].id)-->
		}<!--for (var g in n.business)-->
		}<!--if(n.business[0].dishes != "")-->

	  
	  
	  
		if(n.reservestatus){
			
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_RESERVE_NO'] ?> : ' + a.id +'</h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +='<div class="row">'
		p +='<div class="col-md-3">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  Main.NullToEmpty(n.reserve.name) +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_EMAIL'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.reserve.email +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_PHONE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.reserve.tel +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_DATE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+Main.NullToEmpty(n.reserve.rdate)  +'</td>'
		p +='</tr>'
		p +='<tr>'
		
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_TIME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+  Main.NullToEmpty(n.reserve.rhour) + ':'+ Main.NullToEmpty(n.reserve.rmin) +'</td>'
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		
		p +='</div>'
		<!--col-md-3-->
		p +='</div>'
		<!--row-->
		
		p +='<div class="doted-line"></div>'
		<!--doted-line-->
			
		p +='<div class=" table-responsive">'
		
		p +='<table class="table table-th-block table-striped">'
		p +='<thead>'
		p +='<tr>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_RESERVE_TYPE'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_RESERVE_QUANTITY'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_RESERVE_PRICE'] ?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
		
		/**********************************************Room part******************************************/
		
		if(n.reserveQty.Room){
		if(n.reserveQty.Room.length != 0) {
        p += '<tr>'
		if(n.reserveQty.Room.length != 0)
		p += '<td style="font-weight: bold"><?= $lang_resource['ORDER_DETAILS_FRONT_RESERVATION_ROOM'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p += '</tr>';
		
		for(var rom = 0;rom <n.reserveQty.Room.length;rom++)  {
		p += '<tr>'
		if(n.reserveQty.Room.length != 0)
		p += '<td >'+n.reserveQty.Room[rom]+'</td>'
		 
		p += '<td >'
		if(n.reserveQty.Room.length != 0)
		p += '1'
		p += '</td>'
		var roomprice = n.reserveQty.Room.length * a.roomprice ;
		p += '<td>'
		if(roomprice != 0)
		p += '<span style="color:#ff283d; font-weight:700; font-size:14px">'+Main.currency+ + parseFloat(a.roomprice).toFixed(IS_DECIMAL_POINT)+'</span>'
		p +='</td>'
		p += "</tr>";
			}
		}
		
		}
		/*********************************Room part****************************************************/	
		
		/************************************************table part*************************************************/
		if(n.reserveQty.Table){
		
		if(n.reserveQty.Table.length != 0) {
        p += '<tr>'
		if(n.reserveQty.Table.length != 0)
		p += '<td style="font-weight: bold"><?= $lang_resource['ORDER_DETAILS_FRONT_RESERVATION_TABLE'] ?></td>'
		tablearry = new Array();
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p += '</tr>';

		for(var tbl = 0;tbl <n.reserveQty.Table.length;tbl++)  {
		p += '<tr>'
		if(n.reserveQty.Table.length != 0)
		p +='<td>'+n.reserveQty.Table[tbl]+'</td>'
	 
		p += '<td>'
		if(n.reserveQty.Table.length != 0)
		p += '1';
		p += '</td>'
		var tableprice = n.reserveQty.Table.length * a.tableprice ;
		p += '<td >'
		if(tableprice != 0)
		p += '<span style="color:#ff283d; font-weight:700; font-size:14px">'+Main.currency+ + parseFloat(a.tableprice).toFixed(IS_DECIMAL_POINT)+'</span>'
		p +='</td>'
		p += "</tr>";
				 }
			}
		}
		/******************************************table part****************************************************/	
		
		/*******************************************Free part******************************************/
		if(n.reserveQty.Free){
		if(n.reserveQty.Free.length != 0) {
				
        p += '<tr>'
			   
		if(n.reserveQty.Free.length != 0)
		p += '<td style="font-weight: bold"><?= $lang_resource['ORDER_DETAILS_FRONT_RESERVATION_FREE'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p += '</tr>';
		
	    for(var fre = 0;fre <n.reserveQty.Free.length;fre++)  {
		p += '<tr>'
		if(n.reserveQty.Free.length != 0)
		 p += '<td>'+n.reserveQty.Free[fre]+'</td>'
		 
		 
		p += '<td>'
			if(n.reserveQty.Free.length != 0)
		p += '1'		
		p += '</td>'
		
		var freeprice = n.reserveQty.Free.length * a.freeprice ;
		p += '<td>'
		if(freeprice != 0)
		p += '<span style="color:#ff283d; font-weight:700; font-size:14px">'+Main.currency+ + parseFloat(a.freeprice).toFixed(IS_DECIMAL_POINT)+'</span>'
		
		p +='</td>'
		p += "</tr>";
				}
			}
			
		}
		/**********************************Free part**********************************************/			
		
		
		p +='<tr>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">'+Main.currency+ +parseFloat(n.reserveFee).toFixed(IS_DECIMAL_POINT)+'</span></td>'
		p +='</tr>'
		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div> '
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'
		<!--row-->
		}
		
		}else{
			var n1 = JSON.parse(a.requestcollectiondata);
			console.log(JSON.stringify(n1));
			
			
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_ORDER_NO'] ?> : ' + a.id +'</h3>'
		p +='</div>'
			p +='<div class="doted-line"></div>'
		p +='<div class="panel-body">'
		
		
		
		 for(n in n1){
			 p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="table-responsive">'
			 	console.log(JSON.stringify(n1[n]));
				p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
	
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_name+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_address1+','+ n1[n].customer_address2+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_postcode+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_contactno+'</td>'
		p +='</tr>'
		
	
			p +='</tbody>'
		p +='</table>'
				p +='</div>'
		
		p +='</div>'
		<!--col-md-6-->
		
					 p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="table-responsive">'
			 	console.log(JSON.stringify(n1[n]));
				p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
	
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_name+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_postcode+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  n1[n].resturent_collection_time+'</td>'
		p +='</tr>'
		
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_other_value+'</td>'
		p +='</tr>'
			p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_other_reference+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_note+'</td>'
		p +='</tr>'
	
	
			p +='</tbody>'
		p +='</table>'
				p +='</div>'
		
		p +='</div>'
		<!--col-md-6-->
				
		 }
		
		
		
		
		
	

		p +='</div>'
		<!--row-->
			p +='<div class="doted-line"></div>'
			m = "<?= $lang_resource['PAID_with_Paypal_V2'] ?> ("+n1[n].paypalid+")";
		 p +='<div class="row">'
					p +='<div class="col-md-12">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?= $lang_resource['PAYMENT_METHOD_V2'] ?> '+ m +'</td>'
		
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'] ?>: <?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'] ?></td>'
		
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		
		p +='</div>'
		
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'<!--row-->
						

		
		
		p +='<div class="doted-line"></div>'
		<!--doted-line-->
		
		 p +='<div class="row">'
					p +='<div class="col-md-12">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped">'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'] ?></td>'
		
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.currency+' '+n1[n].deliveryprice + '</span></td>'
		p +='</tr>'
		p +='</table>'
		
		p +='</div>'
		

		p +='</div>'
		<!--col-md-12-->
		p +='</div>'<!--row-->
			p +='<div class="doted-line"></div>'
		
		
			
		}
		if(OrderPrint.map=='t'){
		p +='<div style="padding-top:10px">';
		
		p +='<div id="mapboxuser" class="ordermapbox" ></div>';     
		p +='</div>';
		//}
		p +='</div>'
		}
        document.getElementById("main").innerHTML = p
		var location = JSON.parse(a.userlocation)
		
		if(OrderPrint.map=='t'){
		    e = new Object();
            e.latitud = location.lat;
            e.longitud = location.long;
			/*e.latitud = 26.2987376;
            e.longitud = 50.19097290000002;*/
       	    e.zoom = 15
			//alert("a")
// GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Business.MapReady, "bottomright")
            GoogleMap.Init("mapboxuser", e.latitud,e.longitud, e.zoom, Orders.UserLocationUpdated);
		/*$.post("lib/orders.php", "f=GetNeighborDataById&id=" + n.buyer.colony, function (x) {
		
		document.getElementById("colony_text").innerHTML = x
		
		});*/
		}
    },
    Save: function () {
        if (Forms.CanSave("order") == false) {
            return
        }
        Forms.PrepareForSaving("order");
		$.post("lib/orders.php", "f=SaveOrder&data=" + JSON.stringify(Forms.Form.order), function (b) {
			$("#chatAudio").remove();
       Main.ApprovedOrder();
			$.fn.jAlert({ //create an alert
					'title': 'Confirmation',
					'message': 'The Order Succesfully Updated',
					'closeBtn': false,
					'onOpen': function(alert){ //when the alert opens
						//alert.closeAlert(false); //the false means don't remove it, just hide it.
						setTimeout(function(){ alert.closeAlert(); }, 1000);
					}
				});
			OrderPrint.Main()
		});
        Forms.Clean("order")
    },
	
	

};
