var totalcart = 0;
var CreateOrder={
	Main: function(buid,id){	
		Main.Loading();
		CreateOrder.street ='';
		if(!CreateOrder.Cart){
	CreateOrder.Cart = new Object();
	CreateOrder.Cart.business = new Array();	
	CreateOrder.Cart.buyer = new Object();
	}
		
		var a = new Date().getTime();
        Main.Aid = a;
		CreateOrder.buid=buid;
		CreateOrder.id=id;	
		$.post("lib/createproduct.php", "f=FetchCheckoutInfo", function (d){
			CreateOrder.checkoutinfo = JSON.parse(d);	
		})
		
		$.post("lib/createproduct.php", "f=FetchusersInfo", function (r){
			CreateOrder.Usersinfo = JSON.parse(r);	
			//alert(JSON.stringify(CreateOrder.Usersinfo))
		})
		
		
		$.post("lib/createproduct.php", "f=fetchbusiness", function (c) { 
			
			if (a != Main.Aid) {
                return
            }
	        Main.Ready();
	        if (c != ""){
				
				CreateOrder.Orders = JSON.parse(c);
				
				if(CreateOrder.id){
					$.post("lib/createproduct.php", "f=FetchOrderdata&data=" +id, function (e){					
						if(e !=""){
							CreateOrder.ordersdata = JSON.parse(e);
							CreateOrder.Cart=JSON.parse(CreateOrder.ordersdata.data);	
							CreateOrder.PrintMain();				
						}			
					});
				}else{
					CreateOrder.EmptyCart();
					CreateOrder.PrintMain();
				}
				
				            
	        } else {
	            alert("Error")
	        }
	    })
	},
	PrintMain: function(){
	
		var c = "";
		c+= '<div class="row">'
        c+= '<div class="top-bar">'
        c+= '<div class=" col-md-6 col-md-offset-6">'
        c+= '<div class=" pull-right">'
		c+= '<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource['ADMIN_PAGE_CANCEL'] ?></button></div>'
        c+= '</div>'
		<!--col-md-5-->
        c+= '</div>'
		<!--top-bar-->
        c+= '</div>'
		c+= '<div class="panel panel-danger panel-square panel-no-border">'
		c+= '<div class="panel-heading panel-heading-2">'
        c+= '<div class="row">'
        c+= '<div class="col-md-6">'
        c+= '<h3 class="panel-title-2"><?= $lang_resource['ADMIN_PAGE_CREATE_ORDER'] ?></h3>'
        c+= '</div>'
		
		<!--col-md-5-->
		 
		c +='<div class="col-md-3">';
        c +='<div class="panel-btn">';
		c +='<select class="form-control rounded panel-red-field white-placeholder" id="resturant" onchange="CreateOrder.PupulateTable(this.value)">';
		if(CreateOrder.buid>0){
			var x = CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders, "id", CreateOrder.buid);
			c +='<option value="'+CreateOrder.Orders[x].id+'">'+CreateOrder.Orders[x].name+'</option>'
		}else{
		for(var e in CreateOrder.Orders) {			
        c +='<option value="'+CreateOrder.Orders[e].id+'">'+CreateOrder.Orders[e].name+'</option>'
        }
		}
		c +='</select>'
		c +='</div>';
		c +='</div>';
		
		/////////////////////
		
        c += '<div class="col-md-3">'
        c += '<div class="panel-btn">'
        c += '<input type="text" id="createordersearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_FILTER_SEARCH_PRODUCTS'] ?>">'
        c += '</div>'
        c += '</div>'
		
		<!--col-md-4-->
        c+= '</div>'
        <!--row-->
		c+= '</div>'
		c+= '<div class="panel-body">'
        c+= '<div class="table-responsive">'
		c+= '<table id="datatable-booking" class="table table-th-block table-striped">'
		c+= '<thead>'
		c+= '<tr>'
		/******************* product*******************/
		
		
		/******************* end product **************/
        c+= '</tr>'
		c+= '</thead>'
		c+= '<tbody id="bookinglist">'
		
		c+= '</tbody>'
		
		c+= '</table>'
        c+= '</div>'
		<!--table-responsive-->
		c +='<h4 class="form-h4" style="margin-top:5px"><?= $lang_resource['ADMIN_PAGE_CREATE_ORDER_CHECKOUTINFO'] ?></h4>'
		c +='<div class="row">'
		
		c +=' <div class="col-md-8">'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['BUSINESS_TAB_PRODUCT_NAME'] ?></label>'
		if(CreateOrder.id){
		c +='<input type="text" id="username" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'name\')" value="'+CreateOrder.Cart.buyer.name+'">'
		}else{
		c +='<input type="text" id="username" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'name\')">'	
		}
		
		c +='</div>'
		c +='</div>'
		
		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CITY_SUPER_CREATE_FIELD_EMAIL'] ?></label>'
		if(CreateOrder.id){
		c +='<input type="text" id="email" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'email\')" value="'+CreateOrder.Cart.buyer.email+'">'
		}else{
		c +='<input type="text" class="form-control" id="email" onkeyup="CreateOrder.UserDetails(this,\'email\')">'	
		}
		
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		<!--row-->
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['ADMIN_CHECKOUTPAGE_PHONE'] ?> *</label>'
		if(CreateOrder.id){
		c +='<input type="text" id="phone" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'tel\')" value="'+CreateOrder.Cart.buyer.tel+'">'
		}else{
		c +='<input type="text" class="form-control" id="phone" onkeyup="CreateOrder.UserDetails(this,\'tel\')">'	
		}
		
		c +='</div>'
		c +='</div>'
		
		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['DRIVER_MANAGER_FORM_FIELD_ADDRESS'] ?></label>'
		if(CreateOrder.id){
			
			CreateOrder.Cart.buyer.address = CreateOrder.Cart.buyer.address.split("%20").join(" ")
			CreateOrder.Cart.buyer.address = CreateOrder.Cart.buyer.address.split("%F6").join("ö")
			CreateOrder.Cart.buyer.address = CreateOrder.Cart.buyer.address.split("%2C").join(" ")
		c +='<input type="text" id="address" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'address\')" value="'+CreateOrder.Cart.buyer.address+'">'
		}else{
		c +='<input type="text" class="form-control" id="address" onkeyup="CreateOrder.UserDetails(this,\'address\')">'	
		}

		c +='</div>'
		c +='</div>'		
		c +='</div>'
		<!--row-->
		c +='<div class="row">'      	
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['ORDER_DETAILS_BUYER_REFERENCE'] ?></label>'
		if(CreateOrder.id){
		if(CreateOrder.Cart.buyer.reference =="facebook"){
			var stdf = 'selected="selected"'
		}
		if(CreateOrder.Cart.buyer.reference =="flyer"){
			var stdt = 'selected="selected"'
		}
		if(CreateOrder.Cart.buyer.reference =="google"){
			var stdg = 'selected="selected"'
		}	
		
		}else{
		var stdf = "";
		var stdt = "";
		var stdg = "";
		}
		c += '<select class="form-control" id="reference" onchange="CreateOrder.UserDetails(this,\'reference\')">';
		c += '<option value=""></option>';
		c += '<option value="facebook" '+stdf+'><?= $lang_resource['CONTROL_PANEL_APPS_FACEBOOK'] ?></option>'
		c += '<option value="flyer" '+stdt+'><?= $lang_resource['MOBILE_SIXTH_PAGE_FLYER'] ?></option>'
		c += '<option value="google" '+stdg+'><?= $lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] ?></option>'
		c += "</select>";
		c +='</div>'
		c +='</div>'
		c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['DISCOUNT_CODES_DISCOUNT_CODE'] ?></label>'
		c +='<div id="fieldid"><input type="text" class="form-control" id="discountcoupon" onkeyup="CreateOrder.UserDetails(this,\'coupon\')"></div>'
		c += '<input type="hidden" id="discountattck" value="0">'
		c +='</div>'
		c += '<div id="discountimg">'
		//c += '<img src="../../images/dis_pics/right.png" >';
		/*if(Main.NullToEmpty(CreateOrder.Cart.discountcode)!=""){
		b += '<img src="images/dis_pics/right.png" >';
		}*/
		c +='</div>';
	
		c += '<div> <span id="discounttext" style="margin-left: 20px;">'
		/*if(Main.NullToEmpty(CreateOrder.Cart.discountcode)!=""){
		b += 'applied';
		}*/
		c +='</span></div>';
		c +='</div>'		
		c +='</div>'
		<!--row-->
		c +='<div class="row">'
      	
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +=' <div id="paylist"></div>'
		c +='</div>'
		c +='</div>'
		
		c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CREATE_ORDER_DELIVERY_DATE'] ?></label>'
		c += '<select class="form-control" id="check_date" onchange="CreateOrder.DelDateSave(this);">';
		c += '<option value="ASAP" SELECTED>ASAP</option>';
		c += '</select>';
		c +='</div>'
		c +='</div>'
				
		c +='</div>'
		c +='<div class="row" id="showorderdate" style="display:none;">'      	
		c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CREATE_ORDER_DELIVERY_TIME'] ?></label>'
		c += '<select class="form-control" id="check_time" onchange="CreateOrder.DelTimeSave(this);">';
		c += '<option value="00:00">HH:MM</option>';
		c += '</select>';
		c +='</div>'
		c +='</div>'
				
		c +='</div>'
		<!--row-->		
		<!--mercury field-->
		<!--row-->
		c +='<div id="mercury_field" style="display:none">'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['MERCURY_PAYMENT_ACNO'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'mercury_acno\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['MERCURY_PAYMENT_EXMM'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'mercury_exmm\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['MERCURY_PAYMENT_EXYY'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'mercury_exyy\')"/>'
		c +='</div>'
		c +='</div>'				
		c +='</div>'
		c +='</div>'
		<!--row-->
		<!--end mercury field-->
		
				
		<!-- Card Save field-->
		<!--row-->
		c +='<div id="cardsaveclass" style="display:none">'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cardsavecardno\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cardsaveexpmm\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cardsaveexpyy\')"/>'
		c +='</div>'
		c +='</div>'
		c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cardsavecvv\')"/>'
		c +='</div>'
		c +='</div>'				
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cityname\')" onkeypress="return CreateOrder.Validation(event,this.value);"/>'
		c +='</div>'
		c +='</div>'
		c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'zip\')" onkeypress="return CreateOrder.Validation(event,this.value);"/>'
		c +='</div>'
		c +='</div>'				
		c +='</div>'
		c +='</div>'
		<!--row-->
		<!-- Card Save field-->
		<!--Authorize.net field-->
		c +='<div id="au_ne_pay" style="display:none">'
		c +='<div class="row">'
      	c +=' <div class="col-md-12">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARD_DETAILS'] ?></label>'
		c +='<hr>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'firstname\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['ORDER_DETAILS_BUYER_LASTNAME'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'lastname\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['FRONT_VISUALS_STREET'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'street\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['ADVERTISEMENT_CREATE_FIELD_CITY'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cityname\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['MYACCOUNT_STATE'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'state\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['SEARCH_STATISTICS_COUNTRY'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'countryname\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'zip\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['MYACCOUNT_CARD_NO'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cardno\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'cvv2\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'expmm\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'      			
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?></label>'
		c +='<input type="text" class="form-control" onkeyup="CreateOrder.UserDetails(this,\'expyy\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='</div>'		
		<!--Authorize.net field-->		
		<!-- Braintree Field -->
		c +='<div id="braintree_field" style="display:none">'
		c +='<div class="row">'
      	c +=' <div class="col-md-12">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO'] ?></label>'
		c +='<hr>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE'] ?></label>'
		c += '<div class="brainpayment_cards">';
		c += '<ul class="braintree-style">';
		c += '<li><input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card" class="css-checkbox"><label for="brain_visa" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-2.png"></label></li>';
		
		c += '<li><input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card" class="css-checkbox"><label for="brain_master" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-3.png"></label></li>';
		
		c += '<li><input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago" class="css-checkbox"><label for="brain_marco" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-4.png"></label></li>';
		
		c += '<li><input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave" class="css-checkbox"><label for="brain_cardsave" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-5.png"></label></li>';
		c += '</ul>';	
					
		/*c +='<input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card" class="css-checkbox">';
		c +='<label for="brain_visa" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-2.png"></label>';
		
		c +='<input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card" class="css-checkbox">';
		c +='<label for="brain_master" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-3.png"></label>';
		
		
		
		c +='<input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago" class="css-checkbox">';
		c +='<label for="brain_marco" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-4.png"></label>';
		
		
		c +='<input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave" class="css-checkbox">';
		c +='<label for="brain_cardsave" class="css-label radGroup2"><img src="../../images/step4-checkout/pay-5.png"></label>';*/				
		c += '</div>';
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?></label>'
		c +='<input type="text" class="form-control" id="braintreecard" onkeyup="CreateOrder.UserDetails(this,\'braintreecard\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?></label>'
		c +='<input type="text" class="form-control" id="braintreeexpiry" onkeyup="CreateOrder.UserDetails(this,\'braintreeexpiry\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?></label>'
		c +='<input type="text" class="form-control" id="braintreecvv" onkeyup="CreateOrder.UserDetails(this,\'braintreecvv\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_firstname" onkeyup="CreateOrder.UserDetails(this,\'braintree_firstname\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_lastname" onkeyup="CreateOrder.UserDetails(this,\'braintree_lastname\')"/>'
		c +='</div>'
		c +='</div>'		

		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_address1" onkeyup="CreateOrder.UserDetails(this,\'braintree_address1\')"/>'
		c +='</div>'
		c +='</div>'		
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_address2" onkeyup="CreateOrder.UserDetails(this,\'braintree_address2\')"/>'
		c +='</div>'
		c +='</div>'		
		c +='</div>'
		c +='<div class="row">'
		c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_city" onkeyup="CreateOrder.UserDetails(this,\'braintree_city\')"/>'
		c +='</div>'
		c +='</div>'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_state" onkeyup="CreateOrder.UserDetails(this,\'braintree_state\')"/>'
		c +='</div>'
		c +='</div>'      			
		c +='</div>'
		c +='<div class="row">'
      	c +=' <div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?></label>'
		c +='<input type="text" class="form-control" id="braintree_zipcode" onkeyup="CreateOrder.UserDetails(this,\'braintree_zipcode\')"/>'
		c +='</div>'
		c +='</div>'      		
		c +='</div>'	
		c +='</div>'
		<!-- Braintree Field -->
		
		c += '<div class="row">'        
        c += '<div class="col-md-4" style="margin-bottom:10px; margin-top:10px;">'
		c += '<div id="bottom-order-btn">'
        c += '<button type="button" class=" btn btn-success" id="bottom-order-btn" style="width:100%;" onclick="CreateOrder.PlaceOrder()"><?= $lang_resource['SHOPPING_PLACE_ORDER'] ?></button>'
		c += '</div>'
        c += '</div>'
        <!--col-md-4-->
		c += '<div class="col-md-3" style="margin-bottom:10px; margin-top:10px;">'
		if(CreateOrder.id){
        c += '<button type="button" class=" btn btn-danger" style="width:100%;" onclick="Orders.Main()"><?= $lang_resource['BUSINESS_CANCEL'] ?></button>'
		}else{
		c += '<button type="button" class=" btn btn-danger" style="width:100%;" onclick="CreateOrder.Main()"><?= $lang_resource['BUSINESS_CANCEL'] ?></button>'	
		}
        c += '</div>'
        <!--col-md-4-->
        c += '</div>'
		<!--row-->
		
		c +='</div>'
		c +='<div id="cartlist"></div>'
		
		
		c +='</div>'
	
		c +='</div>'
		
        c+= '</div>'
		
		<!-- /.panel-body -->
		c+= '</div>'
		document.getElementById("main").innerHTML = c;
		
		$(document).ready(function() {
            CreateOrder.BindControls();
        });
		
		document.getElementById("createordersearch").onkeyup = function () {         
            CreateOrder.showresult("id", true)
        }; 
		
		var p = document.getElementById("resturant").value;		
		CreateOrder.PupulateTable(p)
		
		
	},

	
	BindControls: function() {
		var userlist = Array();
		for(var p in CreateOrder.Usersinfo){
			userlist[p]=CreateOrder.Usersinfo[p].cel;
			
		}
         
            $('#phone').autocomplete({
                source: userlist,
                minLength: 0,
                scroll: true,
				select: function (event, ui) {
					var value = ui.item.value;
				var E = CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Usersinfo, "cel", value);	
				document.getElementById("username").value=CreateOrder.Usersinfo[E].name;
				document.getElementById("email").value=CreateOrder.Usersinfo[E].email;
				CreateOrder.street = CreateOrder.Usersinfo[E].street;
				document.getElementById("address").value=CreateOrder.Usersinfo[E].street;
				}

            }).focus(function() {
                $(this).autocomplete("search", "");
				
            });
        },
	
	
	
	Validation: function(evt){ // Alphanumeric only  
	 	evt = evt || window.event;
	   var charCode = evt.which || evt.keyCode;
	   var charStr = String.fromCharCode(charCode);	 
	   	if (!(charCode == 8 || charCode == 27 || charCode == 46 || charCode == 37 || charCode == 39)){
		   	if (/^[a-zA-Z0-9- \t\b\d]*$/.test(charStr) == false ) {    		
		    	return (false);
	    	}
	   	} 
	   
   },
	
	PupulateTable: function (e) { 
	
	var K = CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders, "id", e);
	
	var H =  CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders[K].autodiscount, "business",e);
	CreateOrder.ActiveBusiness = e;
	CreateOrder.currency = CreateOrder.Orders[K].currency;
	
	
	//alert(JSON.stringify(CreateOrder.Orders))
		var c='';
		
			c +='<div class="col-md-4">'
			c +='<div class="order_details_dv">'
			c +='<div id="product_details_dv">'
			
			c +='</div>'
			c +='<table width="100%" class="order_dts_first_tbl" border="0" cellspacing="0" cellpadding="0">'
			c +='<tr><td>'
			c +='<h4><?= $lang_resource['ADMIN_PAGE_DELIVERY_FEE'] ?></h4>'
			c +='</td>'
			
			c +='<td>'+CreateOrder.Orders[K].currency+' '+'<span id="deliveryfee">'+CreateOrder.Orders[K].shipping+'</span></td>'
			c +='</tr>'
			
			c +='<tr><td>'
			
			if(CreateOrder.Orders[K].servicefeesettings == 1){
			c +='<h4><?= $lang_resource['ADMIN_PAGE_SERVICE_FEE'] ?> ('+CreateOrder.Orders[K].servicefee1+'%)</h4>'
			}
			if(CreateOrder.Orders[K].servicefeesettings == 0)
			c +='<h4><?= $lang_resource['ADMIN_PAGE_SERVICE_FEE'] ?> ('+CreateOrder.Orders[K].servicefee+'%)</h4>'
			
			c +='</td>'
			var df1=0;
			c +='<td>'+CreateOrder.Orders[K].currency+' '+'<span id="servicefee">'+parseFloat(df1).toFixed(IS_DECIMAL_POINT)+'</span></td>'
			c +='</tr>'
			c +='<tr><td>'
			c +='<h4><?= $lang_resource['ADMIN_PAGE_TAX'] ?> ('+CreateOrder.Orders[K].tax+'%)</h4>'
			if(CreateOrder.Orders[K].taxtype==1){
			c +='<span><?=$lang_resource['CITY_SUPER_TAX_NOT_INCLUDED']?></span>'
			}else{
			c +='<span><?=$lang_resource['CITY_SUPER_TAX_INCLUDED']?></span>'	
			}
			c +='</td>'
			var df2=0;
			c +='<td>'+CreateOrder.Orders[K].currency+' '+'<span id="tax">'+parseFloat(df2).toFixed(IS_DECIMAL_POINT)+'</span>'
			c +='</td>'
			c +='</tr>'
			c +='</tr>'
			if(H != -1){
			c +='<tr id="ss1" style="display:none"><td>'		
			
			if((CreateOrder.Orders[K].autodiscount[H].discountype==1)){
				
			c +='<h4><?= $lang_resource['SHOPPING_PLACE_ORDER_DISCOUNT_OFFER'] ?>('+CreateOrder.Orders[K].autodiscount[H].rate+'%)</h4>'
				
			}else {
				
			c +='<h4><?= $lang_resource['SHOPPING_PLACE_ORDER_DISCOUNT_OFFER'] ?></h4>'		
				
			}
			c +='</td>'
			
			c +='<td>'+CreateOrder.Orders[K].currency+'<span id="disoffer">'+parseFloat(df1).toFixed(IS_DECIMAL_POINT)+'</span>'
			
			c +='</td>'
			
			c +='</tr>'
			}
			c +='<tr class="border">'
			c +='<td>'
			c +='<h4><?= $lang_resource['ADMIN_PAGE_SUB_TOTAL'] ?></h4>'
			c +='</td>'
			
			c +='<td>'+CreateOrder.Orders[K].currency+'<span id="sub_total">'+parseFloat(df1).toFixed(IS_DECIMAL_POINT)+'</span></td>'
			c +='</tr>'
			c +='<tr class="total">'
			c +='<td>'
			c +='<h4><?= $lang_resource['ADMIN_PAGE_TOTAL'] ?></h4>'
			c +='</td>'
			c +='<td>'+CreateOrder.Orders[K].currency+'<span id="total">'+parseFloat(df1).toFixed(IS_DECIMAL_POINT)+'</span></td>'
			c +='</tr>'
			c +='<tr class="">'
			c +='<td colspan="2">'
			c +='<p class="text-left" style="margin-left:0;"></p>'
			c +='</td>'
			c +='</tr>'
			c +='</table>'
			c +='</div>'
			c +='</div>'
		document.getElementById("cartlist").innerHTML = c;
		
		
		
		var p='';
		
		p +='<label><?= $lang_resource['ADMIN_PLACE_ORDER_PAYMENT_METHOD'] ?></label>'
		p += '<select class="form-control" id="payment" onchange="CreateOrder.checkPaymentOption(this)">';
		if(CreateOrder.id){	
		//alert(JSON.stringify(CreateOrder.Cart))	
		var paydetails = CreateOrder.Cart.business[0].paymethod;	
		var payt = 'selected="selected"'
			//	p += '<option value="'+plist+'" '+payt+'>'+plist+'</option>';
				p += '<option value="cash" '+payt+'><?= $lang_resource['EXPORT_CASH'] ?></option>';
				
			/*for(var plist in paydetails){				
				if(paydetails[plist] == true){	
							
				var payt = 'selected="selected"'
				p += '<option value="'+plist+'" '+payt+'>'+plist+'</option>';
				
				}
			}*/
			
		}else{
		var payt = "";
		p += '<option value=""><?= $lang_resource['SHOPPING_PLACE_ORDER_PAYMENTOPTION'] ?></option>';
		var pdetails = JSON.parse(CreateOrder.Orders[K].paymentdetails);		
		/*for(var pay in pdetails){
		
			if(pdetails[pay] == 't')
		p += '<option value="'+pay+'">'+pay+'</option>';
		}*/
		var payt = 'selected="selected"'
		//	p += '<option value="'+plist+'" '+payt+'>'+plist+'</option>';
		p += '<option value="cash" '+payt+'><?= $lang_resource['EXPORT_CASH'] ?></option>';
		}
		
		
		p += "</select>";
		document.getElementById("paylist").innerHTML = p;
		if(CreateOrder.id){
			var del = CreateOrder.Cart.buyer.deliveryType;
			$.post("lib/createproduct.php", "f=fetchproductdeliveryaction&data=" + e+ "&deliac="+del, function (k) {
			
			if (k != "") {
				
			CreateOrder.dish = JSON.parse(k);
			//alert(JSON.stringify(CreateOrder.dish.menudish))	
			CreateOrder.showresult();
			 CreateOrder.showdate();
			 CreateOrder.showtime();
	
			} else {
                alert("Error")
            }
			
			
			
			
			});	
			
		}else{
		$.post("lib/createproduct.php", "f=fetchproduct&data=" + e, function (c) {
			
			if (c != "") {
			CreateOrder.dish = JSON.parse(c);	
			//alert(JSON.stringify(CreateOrder.dish.menudish))	
			CreateOrder.showresult();
	
			} else {
                alert("Error")
            }
			
			
			
			
			});	
			
		}
		if(CreateOrder.id){
			CreateOrder.ShowProduct();			
		}	
			
		},
		showresult:function(r, c){
			
			var a='';
			var C2 ='';
			var h = false;
			var f = "";
			var k = new Array();  
                a +='<div class="panel-body">';
				a +='<ul class="order_photo" id="itemContainer">';
				
				
                for (var b in CreateOrder.dish.menudish) {
					
					//alert(JSON.stringify(CreateOrder.dish.menudish))
					 h = false;
					f = document.getElementById("createordersearch").value.toLowerCase();
					if (String(CreateOrder.dish.menudish[b].name).toLowerCase().indexOf(f) >= 0) {
						h = true;
						k.push(CreateOrder.dish.menudish[b])
					}
				if (h) {
					CreateOrder.currency = CreateOrder.dish.menudish[b].currency;
					 if(CreateOrder.dish.menudish[b].isimg==1)
					{
					   
						 C2 = "../panel/images/dishes/" + Main.NullToEmpty(CreateOrder.dish.menudish[b].id) + "/1/panel.jpg";
					}
				   
					else if(CreateOrder.dish.menudish[b].isimg2==1)
					{
					   
						 C2 = "../panel/images/dishes/" + Main.NullToEmpty(CreateOrder.dish.menudish[b].id) + "/2/panel.jpg";
					}
				   
					else if(CreateOrder.dish.menudish[b].isimg3==1)
					{
					 
						 C2 = "../panel/images/dishes/" + Main.NullToEmpty(CreateOrder.dish.menudish[b].id) + "/3/panel.jpg";
					}
					else{
						 C2 = '../panel/images/dishes/dummy.jpg';
					}
					
                    CreateOrder.dish.menudish[b].name = CreateOrder.dish.menudish[b].name;
					
					
					a +='<li onclick="AdminProductOption.add_product_options('+ CreateOrder.dish.menudish[b].business+','+ CreateOrder.dish.menudish[b].id+',2)">';
					a +='<div class="order_pic">';
					
					a +='<a href="#"><img src="'+C2+'"></a>';
					a +='</div>';
					a +='<h5>'+CreateOrder.dish.menudish[b].name+'</h5>';
					
					AdminProductOption.currency = CreateOrder.dish.menudish[b].currency;
					var nte11=Main.NullToEmpty(CreateOrder.dish.menudish[b].price);

					a +='<p>'+CreateOrder.dish.menudish[b].currency+'<span id="dish_' + CreateOrder.dish.menudish[b].id + '_price">'+parseFloat(nte11).toFixed(IS_DECIMAL_POINT)+'</span><button id="dish_' + CreateOrder.dish.menudish[b].id + '_product" class="creat-order-btn">+</button><div id="addproductconfirm" class="confirmpro'+CreateOrder.dish.menudish[b].id+'"></div></p>';
					a +='</li>';				
                }
				}
				a +='</ul>';				
              	 a +='</div>'; 
				 a +='<div class="holder">';
        		a +='</div>';
			  	 document.getElementById("bookinglist").innerHTML = a;
				 
				 $(document).ready(function () {
            $("div.holder").jPages({
                containerID: "itemContainer",
                perPage: 10,
                keyBrowse: true,
                scrollBrowse: false,
                callback: function (pages,
        items) {
                    $("#legend1").html("Page " + pages.current + " of " + pages.count);
                    $("#legend2").html("Elements "+items.range.start + " - " + items.range.end + " of " + items.count);
                }
            });
            $("button").click(function () {
                /* get given page */
                var page = parseInt($("input").val());
                /* jump to that page */
                $("div.holder").jPages(page);
            });

           
        });
            
			 
		},

	GetIndexOnPropertyValueFound: function (b, a, d)
    {
        for (var c in b)
        {
            if (b[c][a] == d)
            {
                return c
            }
        }
        return -1
    },
	
	GetIndexOnDishValueFound: function (b, a, d)
    {
        for (var c in b)
        {
            if (b[c][a] == d)
            {
                return c
            }
        }
        return -1
    },
	
	
	DelDateSave: function(d){
	
	CreateOrder.Cart.buyer.deliverydate = d.value;	
	if(d.value=='ASAP'){
		if(CreateOrder.Cart.preorder)
			delete CreateOrder.Cart.preorder

		document.getElementById('showorderdate').style.display='none';
	}else{
		CreateOrder.Cart.preorder = "true";
		document.getElementById('showorderdate').style.display='block';
		}
	
	
},

DelTimeSave: function(d){
	
	var str = d.value;
	var str_sub = str.split(":");

	CreateOrder.Cart.buyer.deliveryhours = str_sub[0];
	CreateOrder.Cart.buyer.deliveryminute = str_sub[1];	
},
	
	UserDetails: function (g, k)
    {

		
	        switch (k)
        {
        case "name":
            CreateOrder.Cart.buyer.name = g.value;
            break;
		case "email":
            CreateOrder.Cart.buyer.email = g.value;
            break;
		case "tel":
            CreateOrder.Cart.buyer.tel = g.value;
            break;
		case "address":
            CreateOrder.Cart.buyer.address = g.value;
            break;
		case "reference":
            CreateOrder.Cart.buyer.reference = g.value;
            break;
		case "coupon":
           if(g.value.length==10)
		 {
			 
			if(document.getElementById("discountattck").value != 1)
			{
		    CreateOrder.discountcodeCheck(g.value);
			}
			
		 }
		 break;
		 
		 case "braintreecard":
            CreateOrder.Cart.buyer.braintreecard = g.value;
            break;
		case "braintreeexpiry":
            CreateOrder.Cart.buyer.braintreeexpiry = g.value;
            break;
		case "braintreecvv":
            CreateOrder.Cart.buyer.braintreecvv = g.value;
            break;	
		 
		 case "mercury_acno":
            CreateOrder.Cart.buyer.mercury_acno = g.value;
            break;
			
		case "mercury_exmm":
            CreateOrder.Cart.buyer.mercury_exmm = g.value;
            break;
			
		case "mercury_exyy":
            CreateOrder.Cart.buyer.mercury_exyy = g.value;
            break;
		 case "cardsavecardno":
            CreateOrder.Cart.buyer.cardsavecardno = g.value;
            break;
		case "cardsaveexpmm":
            CreateOrder.Cart.buyer.cardsaveexpmm = g.value;
        break;
		case "cardsaveexpyy":
            CreateOrder.Cart.buyer.cardsaveexpyy = g.value;
        break;
		case "cardsavecvv":
            CreateOrder.Cart.buyer.cardsavecvv = g.value;
        break;
		
		case "cityname":
            CreateOrder.Cart.buyer.cityname = g.value;
        break;
		case "zip":
            CreateOrder.Cart.buyer.zip = g.value;
        break;
		case "countryname":
            CreateOrder.Cart.buyer.countryname = g.value;
        break;	
		case "state":
            CreateOrder.Cart.buyer.state = g.value;
        break;	
		case "lastname":
            CreateOrder.Cart.buyer.lastname = g.value;
        break;	
		case "firstname":
            CreateOrder.Cart.buyer.firstname = g.value;
        break;	
		case "street":
            CreateOrder.Cart.buyer.street = g.value;
        break;	
		
		case "cardno":
            CreateOrder.Cart.buyer.cardno = g.value;
			 break;				 
		case "cvv2":
		CreateOrder.Cart.buyer.cvv2 = g.value;	 
		 
		case "expmm":
			CreateOrder.Cart.buyer.expmm = g.value;			
		break;
		case "expyy":
			CreateOrder.Cart.buyer.expyy = g.value;
			
		break;
			
		
		}
				
	},
	
	discountcodeCheck: function (code)
	 {
		var bid = CreateOrder.Cart.business[0].id;
		var total = CreateOrder.Cart.total;
		
		var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);
       
		
	 $.post("lib/discountcode_admin.php", "f=FindDiscountcode&code=" + code +"&bid="+ bid+"&total="+ total, function (c) {
		 
		
		  Main.Ready(true);
            if (b != Main.Aid)
            {
                return;
            }
			 c = JSON.parse(c);
			 if(c.text == true)
			 {	 
			document.getElementById("discountattck").value = 1;
			if(!CreateOrder.Cart.discountype){
			CreateOrder.Cart.discountcategory = "discountcode";
			CreateOrder.Cart.discountcode = c.discountcode;
			CreateOrder.Cart.discountype = c.discounttype;
			CreateOrder.Cart.rate = c.discountrate;
			CreateOrder.Cart.minshop = c.discountminshop;
			
			
			
			document.getElementById("fieldid").innerHTML ='<input type="text" class="form-control" id="discountcoupon" value="'+ c.discountcode +'" readonly="readonly" />'
			
			document.getElementById("discountimg").innerHTML ='<img src="../../images/dis_pics/right.png" >';
			document.getElementById("discounttext").innerHTML ='applied';
			CreateOrder.ShowProduct();
			}else{
				document.getElementById("discountimg").innerHTML ='<img src="../../images/dis_pics/cross.png" >'
				document.getElementById("discounttext").innerHTML ='not applied';
			}
			 }
			 else
			 {
				document.getElementById("discountimg").innerHTML ='<img src="../../images/dis_pics/cross.png" >'
				document.getElementById("discounttext").innerHTML ='not applied';
			 }
			
		
	
        })
	 },
	
	
	

	 AddToCart: function (bid,disc_id){	
	 if(!CreateOrder.id){
	 var w = CreateOrder.GetIndexOnDishValueFound(CreateOrder.Orders, "id",bid);
	 if(CreateOrder.Orders[w].shipping == "Pending")
		{
			//alert("aa")
			AdminProductOption.ChooseDeliverOption(bid,disc_id);
			return false;
		}
	 }
	
	$('#resturant').attr('disabled', true);
	
	CreateOrder.Cart.reserve = new Object();
	CreateOrder.Cart.reserveQty = new Object();
	CreateOrder.Cart.reservePrice = new Object();
	CreateOrder.Cart.twilioenabledclient = true;
	
	//var P =  CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders, "id",bid);
	
	var qty = 1;
	var F =  CreateOrder.GetIndexOnDishValueFound(CreateOrder.dish.menudish, "id",disc_id);
	if(F == -1){
		return false;
	}
	if(!CreateOrder.id){
	totalcart++;
	}else{
		totalcart = CreateOrder.Cart.business[0].dishes.length+1;
	}
	$( ".confirmpro"+CreateOrder.dish.menudish[F].id).fadeIn( "slow", function() {
				
	  });				  
	  $( ".confirmpro"+CreateOrder.dish.menudish[F].id).fadeOut( "slow", function() {
		
	  });
	
	var D = new Object();
	D.id = CreateOrder.dish.menudish[F].id;
    D.name = CreateOrder.dish.menudish[F].name;
	var pricetotal = parseFloat(CreateOrder.dish.menudish[F].price);
	if(CreateOrder.dish.menudish[F].extras || CreateOrder.dish.menudish[F].ingredients){
		for(var i=0; i<AdminProductOption.optionprice.length;i++){
			var val2 = parseFloat(AdminProductOption.optionprice[i]);
					if( !isNaN( val2 )){
					   pricetotal += val2;
					}
		}
		D.price = pricetotal.toFixed(IS_DECIMAL_POINT);
	}else{
	D.price = CreateOrder.dish.menudish[F].price;	
	}
	
	if(CreateOrder.dish.menudish[F].extras || CreateOrder.dish.menudish[F].ingredients){
	if(AdminProductOption.ingredients){
		D.ingredients = AdminProductOption.ingredients;
	}
	if(AdminProductOption.options){
		D.options = AdminProductOption.options;
	}
	if(AdminProductOption.optionsOnlytext){
		D.optionsOnlytext = AdminProductOption.optionsOnlytext;
	}
	
	if(AdminProductOption.comments){
		D.comments = AdminProductOption.comments;
	}
	
	if(AdminProductOption.optionChoiceId){
		D.optionChoiceId = AdminProductOption.optionChoiceId;
	}
	}
	if(AdminProductOption.quantitysec){
		D.quantity = AdminProductOption.quantitysec;
	}else{
	D.quantity = qty;
	}
	if(AdminProductOption.personsec){
	D.nofperson=AdminProductOption.personsec;
	}
	D.total = parseFloat(D.price*D.quantity).toFixed(IS_DECIMAL_POINT);
	
	D.extras = new Array();
	
	var g =  CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders, "id",bid);
	if(totalcart == 1){		
	var h =  CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders[g].autodiscount, "business",bid);
	var I = new Object();	
	I.id = CreateOrder.Orders[g].id;
	I.name = CreateOrder.Orders[g].name;
	I.tel = CreateOrder.Orders[g].tel;
	I.email = CreateOrder.Orders[g].email;
	
	I.paymethod = new Object();
	I.paymethoddetails = new Object();
	var paymentdetails = JSON.parse(CreateOrder.Orders[g].paymentdetails);
	CreateOrder.PaymentExist = false
	for(var pay in paymentdetails){
		if(paymentdetails[pay] == 't'){
			CreateOrder.PaymentExist = true;
			I.paymethoddetails[pay] = true
		}else{
			I.paymethoddetails[pay] = false
		}
	}
		
	for(var pay in paymentdetails){					
		I.paymethod[pay] = false					
	}
	
	
	
	
	I.shipping = AdminProductOption.shipping;
	I.minimum = CreateOrder.Orders[g].minimum;
	I.dishes = new Array();	
	I.twiliophone = CreateOrder.Orders[g].twiliophone;	
	I.twilioenabled = CreateOrder.Orders[g].twilioenabled;
	I.acceptsms = CreateOrder.Orders[g].acceptsms;
	CreateOrder.Cart.business.push(I);
	CreateOrder.Cart.customslug=CreateOrder.Orders[g].customslug;
	CreateOrder.Cart.reservepaymethod = new Object();
	CreateOrder.Cart.reservepaymethoddetails = new Object();
	var repaymentdetails = JSON.parse(CreateOrder.Orders[g].paymentdetails);
	for(var reservpay in repaymentdetails){
					if(repaymentdetails[reservpay] == 't'){
						CreateOrder.Cart.reservepaymethoddetails[reservpay] = true
					}else{
						CreateOrder.Cart.reservepaymethoddetails[reservpay] = false
					}
				}
			
				for(var reservpay in repaymentdetails){					
						CreateOrder.Cart.reservepaymethod[reservpay] = false					
				}
	
	
	if(h != -1){
	CreateOrder.Cart.discountype=CreateOrder.Orders[g].autodiscount[h].discountype;
	CreateOrder.Cart.rate=CreateOrder.Orders[g].autodiscount[h].rate;
	CreateOrder.Cart.minshop=CreateOrder.Orders[g].autodiscount[h].minshop;
	}
	
	CreateOrder.Cart.buyer.deliveryType=AdminProductOption.deliveryType;
	if(AdminProductOption.Deliverydate){
		CreateOrder.Cart.buyer.deliverydate=AdminProductOption.Deliverydate;
	}else{
		CreateOrder.Cart.buyer.deliverydate="ASAP";
	}
	
	if(AdminProductOption.deliveryhours){
		CreateOrder.Cart.buyer.deliveryhours=AdminProductOption.deliveryhours;	
	}
	if(AdminProductOption.deliveryminute){
		CreateOrder.Cart.buyer.deliveryminute=AdminProductOption.deliveryminute;	
	}
	if(AdminProductOption.menuid){
		CreateOrder.Cart.buyer.menuid=AdminProductOption.menuid;
	}
	
	CreateOrder.Cart.buyer.city=CreateOrder.Orders[g].city;
	CreateOrder.Cart.buyer.cityname=CreateOrder.Orders[g].cityname;
	CreateOrder.Cart.buyer.tax=CreateOrder.Orders[g].tax;
	CreateOrder.Cart.buyer.taxtype=CreateOrder.Orders[g].taxtype;
	K = CreateOrder.Cart.business.length - 1;
	

	

	CreateOrder.Cart.business[0].dishes.push(D);	
	}else if(totalcart>1 && (bid == CreateOrder.Cart.business[0].id)){
	
	CreateOrder.Cart.business[0].dishes.push(D);	
		
	}
	
	CreateOrder.Cart.servicefee=CreateOrder.Orders[g].servicefee;
	CreateOrder.Cart.servicefee1=CreateOrder.Orders[g].servicefee1;
	
	/*if(CreateOrder.ActiveBusiness != CreateOrder.Cart.business[0].id){			
          alert("You can only order from one restaurant at a time.");
           return false
        }*/
	CreateOrder.ShowProduct();	
					 

	 },
	 
	 ShowProduct:function(){
		
		 var subtotal = 0;
		var businessshipping = CreateOrder.Cart.business[0].shipping
		var m ='';
		 for(var j=0; j<CreateOrder.Cart.business[0].dishes.length;j++){	
						
					if(CreateOrder.Cart.business[0].dishes[j].quantity !=0){	
					
						
					m +='<table width="100%" class="order_dts_first_tbl" border="0" cellspacing="0" cellpadding="0">';					
					m +='<tr>';
					m +='<td>';
					m +='<h5>'+CreateOrder.Cart.business[0].dishes[j].quantity+" X "+CreateOrder.Cart.business[0].dishes[j].name+'</h5>';
					//c +='<p>Italian Herb and Chesse<br>'
					//c +='No extra Chesse</p>'
					m +='</td>';
					m +='<td>'+CreateOrder.currency+'<span>'+CreateOrder.Cart.business[0].dishes[j].total+'</span><a href="javascript:void(0)" onclick="AdminProductOption.AddOptionToCart('+j+')" ><img src="../admin/images/add-icon2.png"></a><a href="javascript:void(0)" onclick="AdminProductOption.RemoveOptionToCart('+j+')" ><img src="../admin/images/remove-icon.png"></a></td>';
					m +='</tr>';
					m +='<tr>';
					m +='<td>';
					
					//alert(JSON.stringify(CreateOrder.Cart.business[0].dishes[j]))
					if(CreateOrder.Cart.business[0].dishes[j].options) {
					
					CreateOrder.disc_id=CreateOrder.Cart.business[0].dishes[j].id;
					CreateOrder.bid=CreateOrder.Cart.business[0].id;
					
					m +='<br><span><a href="javascript:void(0)" onclick="AdminProductOption.add_product_options('+CreateOrder.bid+','+CreateOrder.disc_id+',1,'+j+')">'+ AdminProductOption.ShowProductOption(CreateOrder.Cart.business[0].dishes[j].options)+'</a></span>';
					}
					
					
					m +='</td>';
					m +='</tr>';
					m +='<tr class="border">';
					m +='<td colspan="2"></td>';
					m +='</tr>';
					m +='</table>';
					
					var val = parseFloat(CreateOrder.Cart.business[0].dishes[j].total);
					if( !isNaN( val )){
					   subtotal += val;
					}
					
					}
					}
					

					if(m == ''){
					$('#resturant').attr('disabled', false);
					CreateOrder.EmptyCart();	
					}
					
					document.getElementById("product_details_dv").innerHTML = m;
					

					var nte12=Main.NullToEmpty(businessshipping);

					document.getElementById("deliveryfee").innerHTML = parseFloat(nte12).toFixed(IS_DECIMAL_POINT);
					
					CreateOrder.Cart.servicefeeTotal1=0;
					CreateOrder.Cart.servicefeeTotal=0;
					
					if(CreateOrder.Orders[K].servicefeesettings == 1)
					{
						if(CreateOrder.Cart.servicefee1==''){
							CreateOrder.Cart.servicefee1=0;						
						}
						
						if(CreateOrder.Cart.servicefee1>0){
							CreateOrder.Cart.servicefeeTotal=parseFloat((parseFloat(CreateOrder.Cart.servicefee1)*parseFloat(subtotal))/100);
							CreateOrder.Cart.servicefeeTotal1=(parseFloat((parseFloat(CreateOrder.Cart.servicefee)*parseFloat(subtotal))/100)).toFixed(IS_DECIMAL_POINT)
						}
						
					}
					
					if(CreateOrder.Orders[K].servicefeesettings == 0)
					{
						if(CreateOrder.Cart.servicefee==''){
							CreateOrder.Cart.servicefee=0;						
						}
						
						if(CreateOrder.Cart.servicefee>0){
							CreateOrder.Cart.servicefeeTotal=parseFloat((parseFloat(CreateOrder.Cart.servicefee)*parseFloat(subtotal))/100);
							CreateOrder.Cart.servicefeeTotal1=(parseFloat((parseFloat(CreateOrder.Cart.servicefee)*parseFloat(subtotal))/100)).toFixed(IS_DECIMAL_POINT)
						}
						
					}
					
					document.getElementById("servicefee").innerHTML = CreateOrder.Cart.servicefeeTotal.toFixed(IS_DECIMAL_POINT);
					var servicefeeop = CreateOrder.Cart.servicefeeTotal.toFixed(IS_DECIMAL_POINT);
					CreateOrder.Cart.tax =0;
					if(CreateOrder.Cart.buyer.tax==''){
						CreateOrder.Cart.tax=0;						
					}
					if(CreateOrder.Cart.buyer.tax>0){
					CreateOrder.Cart.tax = parseFloat(CreateOrder.Cart.buyer.tax*parseFloat(subtotal)/100) ;
					}
					var nte14=Main.NullToEmpty(CreateOrder.Cart.tax);
					document.getElementById("tax").innerHTML = parseFloat(nte14).toFixed(IS_DECIMAL_POINT)
;	
					
					CreateOrder.Cart.discountprice=0;
					
					if(CreateOrder.Cart.discountype == 1)
				{	
									
					disprice = parseFloat((parseFloat(subtotal)*parseFloat(CreateOrder.Cart.rate))/100);
				
					if(!CreateOrder.Cart.discountcode){
						if(((parseFloat(subtotal))>CreateOrder.Orders[K].autodiscount[0].minshop)){
							
					document.getElementById("disoffer").innerHTML = disprice.toFixed(IS_DECIMAL_POINT);
						}

					}
					CreateOrder.Cart.discountprice = disprice;
				}
				else if(CreateOrder.Cart.discountype == 2)
				{					 
					disprice = parseFloat(CreateOrder.Cart.rate);
					if(CreateOrder.Orders[K].autodiscount[0]){
						if(!CreateOrder.Cart.discountcode){
							if(((disprice.toFixed(IS_DECIMAL_POINT))>CreateOrder.Orders[K].autodiscount[0].minshop)){
								document.getElementById("disoffer").innerHTML = disprice.toFixed(IS_DECIMAL_POINT);
							}
						}
					}
					
					CreateOrder.Cart.discountprice = disprice;
					
				}
					
					
					
					
					CreateOrder.Cart.total=0;
					CreateOrder.Cart.grandtotal=0;
					CreateOrder.Cart.Total=0;					
					var totalprice=0;
					if(CreateOrder.Cart.buyer.taxtype == 1){
					totalprice=parseFloat(subtotal)+ parseFloat(servicefeeop)+ parseFloat(CreateOrder.Cart.tax)+parseFloat(businessshipping);
					}else{
					totalprice=parseFloat(subtotal)+ parseFloat(servicefeeop)+parseFloat(businessshipping);	
					}
					
					
					if(totalprice>CreateOrder.Cart.minshop){
						totalprice = parseFloat(totalprice)-parseFloat(CreateOrder.Cart.discountprice);
						$('#ss1').show();
						
					}
					
					
					
					

					document.getElementById("sub_total").innerHTML = totalprice.toFixed(IS_DECIMAL_POINT);
					document.getElementById("total").innerHTML = totalprice.toFixed(IS_DECIMAL_POINT);
					CreateOrder.Cart.total=totalprice.toFixed(IS_DECIMAL_POINT);
					CreateOrder.Cart.grandtotal=totalprice.toFixed(IS_DECIMAL_POINT);
					CreateOrder.Cart.Total=totalprice.toFixed(IS_DECIMAL_POINT);

						 CreateOrder.showdate();
						 CreateOrder.showtime();
				

	 },
	 
	 checkPaymentOption: function(g){
		for(var pay in CreateOrder.Cart.business[0].paymethod){
		
			if(g.value == pay){
				CreateOrder.Cart.business[0].paymethod[pay] = true;
				
				if(g.value == "mercury"){
					document.getElementById('mercury_field').style.display = "block";					
				
				}else{
					document.getElementById('mercury_field').style.display = "none";					
					
				}
				if(g.value == "braintree"){
					document.getElementById('braintree_field').style.display = "block";
				}else{
					document.getElementById('braintree_field').style.display = "none";
				}
				if(g.value == "authorize"){
					document.getElementById('au_ne_pay').style.display = "block";					
				}else{
					document.getElementById('au_ne_pay').style.display = "none";
				}
				if(g.value == "worldpay"){
					document.getElementById('cardsaveclass').style.display = "block";
				}else{
					document.getElementById('cardsaveclass').style.display = "none";
				}
				if(g.value == "cash" || g.value == "card"){
					CreateOrder.updateOrderBtn(g.value);
				}else{				
					CreateOrder.updateOrderBtn(g.value);
				}
			}
			else{
				CreateOrder.Cart.business[0].paymethod[pay] = false;
			}
		}
		
	},
	
	updateOrderBtn: function(e){
	var topBtn = $('#top-order-btn');
	var bottomBtn = $('#bottom-order-btn');

	if(e == "cash" || e == "card"){
		topBtn.replaceWith('<button type="button" class=" btn btn-success" id="top-order-btn" style="width:100%;" onclick="CreateOrder.PlaceOrder()">Place Order</button>');
		bottomBtn.replaceWith('<button type="button" class=" btn btn-success" id="bottom-order-btn" style="width:100%;" onclick="CreateOrder.PlaceOrder()">Place Order</button>');
	}else{
		if(e == "worldpay"){
			var paymentname = "merchant";
		}else if(e == "authorize"){
			var paymentname = "authorizednet";
		}else{
			var paymentname = e;
		}		
		
		var itemId = eval(paymentname).createId();

		//topBtn.replaceWith('<div class="order hand" id="top-order-btn"><span class="caption nonselectable">'+eval(paymentname).superadminButton({itemId:itemId,formName:'paypalform-top'})+'</div>');
		bottomBtn.replaceWith('<div class=" btn btn-success" id="bottom-order-btn" style="width:100%;">'+eval(paymentname).superadminButton({itemId:itemId,formName:'paypalform-bottom'})+'</div>')
	}	
},

PlaceOrderMacro: function (paypalid,paymentgetway)
    {
	
	$.post("lib/createproduct.php", "f=PlaceOrderbefore&data=" + JSON.stringify(CreateOrder.Cart), function (f)
        {	
		
		
			if(paymentgetway=="paypal"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypal/paypal_custom.php?id="+f;
			}
			
			if(paymentgetway=="maksekeskus"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/maksekeskus/index.php?id="+f;
			}
			
			if(paymentgetway=="skrill"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/skrill/index.php?id="+f;
			}
			
			
			if(paymentgetway=="voguepay"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/voguepay/voguepay.php?id="+f;
			}
			
			if(paymentgetway=="pexpress"){
				
				
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/pxpay/pxpay.php?id="+f;
			}
			
			
			if(paymentgetway=="transactium"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/transactium/ShowHPS.php?id="+f;
			}
		
			
			if(paymentgetway=="mercury"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/mercury/ProcessTransaction.php?id="+f;
			}
			
		
			if(paymentgetway=="paypaladaptive"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/paypaladaptive/samples/SimpleSamples/ParallelPay.php?id="+f;
			}
			if(paymentgetway == "mercadopago"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/mercadopago/mercadopago_ipncustom.php?id="+f;
			}

			if(paymentgetway=="payeezy"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/payeezy/index.php?id="+f;
			}
			
			if(paymentgetway=="merchant"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/worldpay/marchent.php?id="+f;
			}
			
			if(paymentgetway=="authorizednet"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/authorizenet/authorizenet.php?id="+f;
			}
			
			if(paymentgetway=="braintree"){
				window.location.href = "<?=$configRec['siteurl']?>/panel/payment-gateway/braintreepayments/braintree_ipncustom.php?iid="+f;
			}
			
			

			
			CreateOrder.EmptyCart();
             
			 
            
         
        });
	},

	
	Canplaceorder: function(){
		 if (!CreateOrder.Cart){
			alert("Cart Empty");
			return
		}
		var checkoutfields = Array();
				var c = 0;
				for(var b in CreateOrder.checkoutinfo){
					
					if(CreateOrder.checkoutinfo[b].status=='t'){
						
						checkoutfields[c]= CreateOrder.checkoutinfo[b].field_name;	
						c++;				
					}
					
				}				

			CreateOrder.Cart.buyer.checkoutfields = checkoutfields;
			
			CreateOrder.Cart.buyer.name = document.getElementById("username").value;
			CreateOrder.Cart.buyer.email = document.getElementById("email").value;
			CreateOrder.Cart.buyer.tel = document.getElementById("phone").value;
			CreateOrder.Cart.buyer.address = document.getElementById("address").value;
			
			
			if (CreateOrder.Cart.buyer.name == "" || CreateOrder.Cart.buyer.name == " " || !CreateOrder.Cart.buyer.name){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_NAME'] ?>");
						return false
			}
					
			if (CreateOrder.Cart.buyer.email == "" || CreateOrder.Cart.buyer.email == " " || !Main.IsEmail(CreateOrder.Cart.buyer.email)){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] ?>");
						return false
			}
			
			if (CreateOrder.Cart.buyer.tel == "" || CreateOrder.Cart.buyer.tel == " " || !CreateOrder.Cart.buyer.tel){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_PHONE'] ?>");
						return false
			}
			if (CreateOrder.Cart.buyer.address == "" || CreateOrder.Cart.buyer.address == " " || !CreateOrder.Cart.buyer.address){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>");
						return false
			}
			if (document.getElementById("payment").value == ""){
						alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_PAYMENT_OPTION'] ?>");
						return false
			}
			
			
			if (document.getElementById('payment').value=='mercury'){
								
						if (CreateOrder.Cart.buyer.mercury_acno == "" || !CreateOrder.Cart.buyer.mercury_acno){
							alert("<?=$lang_resource['CONTROL_PANEL_MERCURY_ACNO_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.mercury_exmm == "" || !CreateOrder.Cart.buyer.mercury_exmm){
							alert("<?=$lang_resource['CONTROL_PANEL_MERCURY_EXMM_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.mercury_exyy == "" || !CreateOrder.Cart.buyer.mercury_exyy){
							alert("<?=$lang_resource['CONTROL_PANEL_MERCURY_EXYY_ALERT']?>");
							return false;
						}
					
				}
				
			if (document.getElementById('payment').value=='worldpay'){
				
						if (CreateOrder.Cart.buyer.cardsavecardno == "" || !CreateOrder.Cart.buyer.cardsavecardno)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.cardsaveexpmm == "" || !CreateOrder.Cart.buyer.cardsaveexpmm)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.cardsaveexpyy == "" || !CreateOrder.Cart.buyer.cardsaveexpyy)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.cardsavecvv == "" || !CreateOrder.Cart.buyer.cardsavecvv)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.cityname == "" || !CreateOrder.Cart.buyer.cityname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CITY_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.zip == "" || !CreateOrder.Cart.buyer.zip)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_ZIP_ALERT']?>");
							return false;
						}
					
				}
				
						if (document.getElementById('payment').value=='authorize'){
							
						//	alert(Shopping.Cart.buyer.cvv2)
						if (CreateOrder.Cart.buyer.firstname == "" || !CreateOrder.Cart.buyer.firstname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_FIRSTNAME_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.lastname == "" || !CreateOrder.Cart.buyer.lastname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_LASTNAME_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.street == "" || !CreateOrder.Cart.buyer.street)
						{
							alert("<?= $lang_resource['SHOPPING_FOURTH_ERROR_STREET'] ?>");
							return false
						}
							if (CreateOrder.Cart.buyer.cityname == "" || !CreateOrder.Cart.buyer.cityname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CITYNAME_ALERT']?>");
							return false;
						}
							if (CreateOrder.Cart.buyer.state == "" || !CreateOrder.Cart.buyer.state)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_STATE_ALERT']?>");
							return false;
						}
							if (CreateOrder.Cart.buyer.countryname == "" || !CreateOrder.Cart.buyer.countryname)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_COUNTRYNAME_ALERT']?>");
							return false;
						}
							if (CreateOrder.Cart.buyer.zip == "" || !CreateOrder.Cart.buyer.zip)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_ZIP_ALERT']?>");
							return false;
						}
							
						if (CreateOrder.Cart.buyer.cardno == "" || !CreateOrder.Cart.buyer.cardno)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO_ALERT']?>");
							return false;
						}
						
						if (CreateOrder.Cart.buyer.cvv2 == "" || !CreateOrder.Cart.buyer.cvv2 )
						{
							alert("<?=$lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT']?>");
							return false;
						}
						
						
						if (CreateOrder.Cart.buyer.expmm == "" || !CreateOrder.Cart.buyer.expmm)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM_ALERT']?>");
							return false;
						}
						if (CreateOrder.Cart.buyer.expyy == "" || !CreateOrder.Cart.buyer.expyy)
						{
							alert("<?=$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY_ALERT']?>");
							return false;
						}
						
						
						
						}
			
			
			
			return true;
		
		
	},
	
	PlaceOrder: function(){

		 if (!CreateOrder.Canplaceorder()){			
			return
		}
		if(CreateOrder.Cart.business.length == 0){
			$.fn.jAlert({ //create an alert
					'title': 'Confirmation',
					'message': 'Please select the product.',
					'closeBtn': false,
					'onOpen': function(alert){ //when the alert opens
						//alert.closeAlert(false); //the false means don't remove it, just hide it.
						setTimeout(function(){ alert.closeAlert(); }, 1000);
					}
			
				});
				return;
				CreateOrder.Main()
			
		}
//alert(CreateOrder.Cart.business.length)
	//	alert(JSON.stringify(CreateOrder.Cart.business))
		$.post("lib/createproduct.php", "f=PlaceOrder&data=" + JSON.stringify(CreateOrder.Cart)+"&eid="+ CreateOrder.id, function (f) {
			if (f != "") {
                result = f.split(',');
                id = result[0]; 
				
				CreateOrder.EmptyCart();
			$.fn.jAlert({ //create an alert
					'title': 'Confirmation',
					'message': 'The Order Succesfully Placed, Order No:'+id,
					'closeBtn': false,
					'onOpen': function(alert){ //when the alert opens
						//alert.closeAlert(false); //the false means don't remove it, just hide it.
						setTimeout(function(){ alert.closeAlert(); }, 1000);
					}
			
				});
			}
			if(CreateOrder.id){
				Orders.Main()
			}else{
				CreateOrder.Main()
			}
		});
		
	},
	
	EmptyCart: function ()
    {	
		if(CreateOrder.Cart){	
        CreateOrder.Cart.business = new Array();		 
		totalcart=0;
		}
    },

	
	showdate: function(){

		CreateOrder.tdays=new Array();
		for(var exop in CreateOrder.dish.menudish){	
		var r = JSON.parse(CreateOrder.dish.menudish[exop].days);
		CreateOrder.tdays = r;			
		}
		
		//alert(CreateOrder.tdays)
		var curr = new Date();
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		
		var b='';
		b += '<option value="ASAP" SELECTED>ASAP</option>';
		for(var i = 0; i<7; i++) {
			
			
			if(i==0){
				curr.setDate(curr.getDate());
			}else{
				curr.setDate(curr.getDate() + 1);
			}
		var dayindex=curr.getDay();	
		var day = days[ curr.getDay() ];
		var month = months[ curr.getMonth() ];
		var monthindex=curr.getDate();
		var year=curr.getFullYear();	
			
		if(CreateOrder.tdays==0){				
			var date = day+" "+month+" "+monthindex+","+year;
			var ddate = CreateOrder.formatDate(date);
			if(AdminProductOption.Deliverydate){
				if(AdminProductOption.Deliverydate==ddate){
			b += '<option value="'+ddate+'" selected="selected">'+date+'</option>';	
			}
			}else{
			b += '<option value="'+ddate+'" >'+date+'</option>';
			}
		}else{
			
			var pp = CreateOrder.tdays;			
			for(var a in pp){
				if(pp[a]==7){
					pp[a] = 0;
				}
			if(pp[a]==dayindex){
			var date = day+" "+month+" "+monthindex+","+year;
			var ddate = CreateOrder.formatDate(date);
			if(AdminProductOption.Deliverydate){
				if(AdminProductOption.Deliverydate==ddate){
			b += '<option value="'+ddate+'" selected="selected">'+date+'</option>';	
			}
			}else{
			b += '<option value="'+ddate+'" >'+date+'</option>';	
			}
			}
			
		}
		}
		
		}
		if(document.getElementById("check_datep")){
		$("#check_datep").empty().append(b);
		}
		document.getElementById("check_date").innerHTML = b;
	},
	
	formatDate:function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
},

	showtime: function(){

	for(var exop in CreateOrder.dish.menudish){	

		if(document.getElementById("check_timep")){
			var e = document.getElementById("check_timep");
		}else{
			var e = document.getElementById("check_time");
		}
                e.options.length = 0;
                e.options[e.options.length] = new Option("HH : MM","");
                var g = 0;
                var h = false;
		//alert(JSON.stringify(k))
		
			
		 for (var p = 0; p < 12; p++) {
			 
		
          if (p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
 				
					if (CreateOrder.dish.menudish[exop].openhour == p) {
							 if(CreateOrder.dish.menudish[exop].openmin >=0 && CreateOrder.dish.menudish[exop].openmin < 15 ) { 
							 		var sha =  Main.zeroPad((p),2)+": 15"+" AM";
									var sha1 =  Main.zeroPad((p),2)+": 30"+" AM";
									var sha2 =  Main.zeroPad((p),2)+": 45"+" AM";
									e.options[e.options.length] = new Option(sha, p+':15');
									e.options[e.options.length] = new Option(sha1, p+':30');
									e.options[e.options.length] = new Option(sha2, p+':45');
							 
							
							 }else if(CreateOrder.dish.menudish[exop].openmin >15 && CreateOrder.dish.menudish[exop].openmin < 30 ) {									
									var sha2 =  Main.zeroPad((p),2)+": 30"+" AM";
									var sha3 =  Main.zeroPad((p),2)+": 45"+" AM";
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
							}else  if(CreateOrder.dish.menudish[exop].openhour >30 && CreateOrder.dish.menudish[exop].openmin < 45) {									
									
									var sha3 =  Main.zeroPad((p),2)+": 45"+" AM";
									e.options[e.options.length] = new Option(sha3, p+':45');
							}else  if(CreateOrder.dish.menudish[exop].openhour >45 && CreateOrder.dish.menudish[exop].openmin < 59) {}
							} else if (CreateOrder.dish.menudish[exop].closehour  == p) {
								if(CreateOrder.dish.menudish[exop].closemin >16 && CreateOrder.dish.menudish[exop].closemin < 31 ) {
								
									var sha =  Main.zeroPad((p),2)+": 00"+" AM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" AM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
								
								}
								else  if(CreateOrder.dish.menudish[exop].closemin >31 && CreateOrder.dish.menudish[exop].closemin < 46) {
									var sha =  Main.zeroPad((p),2)+": 00"+" AM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" AM";
									var sha2 =  Main.zeroPad((p),2)+": 30"+" AM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
								
								}
								else  if(CreateOrder.dish.menudish[exop].closemin >46 && CreateOrder.dish.menudish[exop].closemin < 59) {
									var sha =  Main.zeroPad((p),2)+": 00"+" AM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" AM";
									var sha2 =  Main.zeroPad((p),2)+": 30"+" AM";
									var sha3 =  Main.zeroPad((p),2)+": 45"+" AM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
								}
								else {
									var sha =  Main.zeroPad((p),2)+": 00"+" AM";
									e.options[e.options.length] = new Option(sha, p+':00');
								}	
						}else{
									var sha =  Main.zeroPad((p),2)+": 00"+" AM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" AM";
									var sha2 =  Main.zeroPad((p),2)+": 30"+" AM";
									var sha3 =  Main.zeroPad((p),2)+": 45"+" AM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
								
						}
						

					
		   }

        }
		for (var p =12; p < 24; p++) {
			
			
			
           if(p==12) {
			    if (p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
			   
						
						if (CreateOrder.dish.menudish[exop].openhour == p) {
							 if(CreateOrder.dish.menudish[exop].openmin >=0 && CreateOrder.dish.menudish[exop].openmin < 15 ) { 
							 		var sha =  Main.zeroPad((p),2)+": 15"+" PM";
									var sha1 =  Main.zeroPad((p),2)+": 30"+" PM";
									var sha2 =  Main.zeroPad((p),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha, p+':15');
									e.options[e.options.length] = new Option(sha1, p+':30');
									e.options[e.options.length] = new Option(sha2, p+':45');
							 
							
							 }else if(CreateOrder.dish.menudish[exop].openmin >=15 && CreateOrder.dish.menudish[exop].openmin < 30 ) {									
									var sha2 =  Main.zeroPad((p),2)+": 30"+" PM";
									var sha3 =  Main.zeroPad((p),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
							}else  if(CreateOrder.dish.menudish[exop].openhour >=30 && CreateOrder.dish.menudish[exop].openmin < 45) {									
									
									var sha3 =  Main.zeroPad((p),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha3, p+':45');
							}else  if(CreateOrder.dish.menudish[exop].openhour >=45 && CreateOrder.dish.menudish[exop].openmin < 59) {}
							} else if (CreateOrder.dish.menudish[exop].closehour  == p) {
								if(CreateOrder.dish.menudish[exop].closemin >16 && CreateOrder.dish.menudish[exop].closemin < 31 ) {
								
									var sha =  Main.zeroPad((p),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
								
								}
								else  if(CreateOrder.dish.menudish[exop].closemin >31 && CreateOrder.dish.menudish[exop].closemin < 46) {
									var sha =  Main.zeroPad((p),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" PM";
									var sha2 =  Main.zeroPad((p),2)+": 30"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
								
								}
								else  if(CreateOrder.dish.menudish[exop].closemin >46 && CreateOrder.dish.menudish[exop].closemin < 59) {
									var sha =  Main.zeroPad((p),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" PM";
									var sha2 =  Main.zeroPad((p),2)+": 30"+" PM";
									var sha3 =  Main.zeroPad((p),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
								}
								else {
									var sha =  Main.zeroPad((p),2)+": 00"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
								}	
						}else{
									var sha =  Main.zeroPad((p),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((p),2)+": 15"+" PM";
									var sha2 =  Main.zeroPad((p),2)+": 30"+" PM";
									var sha3 =  Main.zeroPad((p),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
								
						}
						
					
					
				}
			   } else {
				    if (p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
                   var pp = p-12;
					 
					if (CreateOrder.dish.menudish[exop].openhour == p) {
							 if(CreateOrder.dish.menudish[exop].openmin >=0 && CreateOrder.dish.menudish[exop].openmin < 15 ) { 
							 		var sha =  Main.zeroPad((pp),2)+": 15"+" PM";
									var sha1 =  Main.zeroPad((pp),2)+": 30"+" PM";
									var sha2 =  Main.zeroPad((pp),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha, p+':15');
									e.options[e.options.length] = new Option(sha1, p+':30');
									e.options[e.options.length] = new Option(sha2, p+':45');
							 
							
							 }else if(CreateOrder.dish.menudish[exop].openmin >=15 && CreateOrder.dish.menudish[exop].openmin < 30 ) {									
									
									var sha2 =  Main.zeroPad((pp),2)+": 30"+" PM";
									var sha3 =  Main.zeroPad((pp),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
							}else  if(CreateOrder.dish.menudish[exop].openhour >=30 && CreateOrder.dish.menudish[exop].openmin < 45) {									
									
									var sha3 =  Main.zeroPad((pp),2)+": 45"+" PM";							
									e.options[e.options.length] = new Option(sha3, p+':45');
							}else  if(CreateOrder.dish.menudish[exop].openhour >=45 && CreateOrder.dish.menudish[exop].openmin < 59) {}
							} else if (CreateOrder.dish.menudish[exop].closehour  == p) {
								if(CreateOrder.dish.menudish[exop].closemin >16 && CreateOrder.dish.menudish[exop].closemin < 31 ) {
								
									var sha =  Main.zeroPad((pp),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((pp),2)+": 15"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									
								
								}
								else  if(CreateOrder.dish.menudish[exop].closemin >31 && CreateOrder.dish.menudish[exop].closemin < 46) {
									var sha =  Main.zeroPad((pp),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((pp),2)+": 15"+" PM";
									var sha2 =  Main.zeroPad((pp),2)+": 30"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									
								
								}
								else  if(CreateOrder.dish.menudish[exop].closemin >46 && CreateOrder.dish.menudish[exop].closemin < 59) {
									var sha =  Main.zeroPad((pp),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((pp),2)+": 15"+" PM";
									var sha2 =  Main.zeroPad((pp),2)+": 30"+" PM";
									var sha3 =  Main.zeroPad((pp),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
								}
								else {
									var sha =  Main.zeroPad((pp),2)+": 00"+" PM";
									
									e.options[e.options.length] = new Option(sha, p+':00');
									
								}	
						}else{
									var sha =  Main.zeroPad((pp),2)+": 00"+" PM";
									var sha1 =  Main.zeroPad((pp),2)+": 15"+" PM";
									var sha2 =  Main.zeroPad((pp),2)+": 30"+" PM";
									var sha3 =  Main.zeroPad((pp),2)+": 45"+" PM";
									e.options[e.options.length] = new Option(sha, p+':00');
									e.options[e.options.length] = new Option(sha1, p+':15');
									e.options[e.options.length] = new Option(sha2, p+':30');
									e.options[e.options.length] = new Option(sha3, p+':45');
								
						}
	
					
					}
			   }
			   
			   

        }
		for (var p =24; p < 29; p++) {
			if(p==24 && p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
			 e.options[e.options.length] = new Option("12AM", p);
			}
			else if(p==25 && p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
		      e.options[e.options.length] = new Option("1AM", p);
			}
			else if(p==26 && p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
		      e.options[e.options.length] = new Option("2AM", p);
			}
			else if(p==27 && p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
		      e.options[e.options.length] = new Option("3AM", p);
			}
			else if(p==28 && p >= CreateOrder.dish.menudish[exop].openhour && p <= CreateOrder.dish.menudish[exop].closehour) {
		      e.options[e.options.length] = new Option("4AM", p);
			}

		}

	}
	if(AdminProductOption.deliveryhoursminute){
			$('#check_time option[value="'+AdminProductOption.deliveryhoursminute+'"]').attr("selected", "selected");	
		}
	},

};
