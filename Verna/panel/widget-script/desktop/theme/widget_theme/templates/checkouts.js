var Checkout = {
      OpenCart: function (e)
    {
        if (Shopping.Cart.business.length == 0)
        {
	    alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
            return
        }
		 Main.stepBack  = 4;
		
		$(window).scrollTop(180)
		
		  var custom_link =  "Checkout-"+Shopping.ActiveBusinessName.split(" ").join("");
		 window.history.pushState( {"id":102} , "Checkout", custom_link );
	
	    $(".main li").removeClass("active-step");
		$(".main #plc_checkout").addClass("active-step");
	    $(".srch_bar").hide();
		
		
		document.getElementById("showcanvas").innerHTML = "";
        this.SavingOrder = false;
        var b = "";
		
		
		/*e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);
		
		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)*/
		var week =0;
		
				b += '<div class="cart_header">'
				b += '<div class="container">'
				b += '<div class="cart_header_text">'
				b += '<h2>Checkout</h2>'
				b += '</div>'<!--cart_header_text-->            
				b += '</div>'<!--container-->
				b += '</div>'
				b += '<div class="container">'
				b += '<div class="row">'
				
				b += '<div class="col-md-4">'
				b += '<h2 class="heading"><?= $lang_resource['Your_order_summary_V2'] ?></h2>'
				b += '<div id="cartresultsinner"></div>';
				
				b += '<div class="order_summary_total">'
				b += '<ul class="total">'
				b += '<li><?= $lang_resource['EXPORT_TOTAL'] ?></li>'
				b += '<li class="item_price">'+Main.car+'<span  id="orderprice">0.00</span></li>'
				b += '</ul>'
				b += '</div>'<!--order_summary_total-->
				b += '</div>'
				
				
				
		       if(Main.WhereAmIData.reservestatus == "delivery")  {
					
				var textstring = "<?= $lang_resource['Delivery_details_V2'] ?>"
				
				}
				else if(Main.WhereAmIData.reservestatus == "pickup")  {
				
				var textstring = "<?= $lang_resource['Pickup_details_V2'] ?>"
				
				}else if(Main.WhereAmIData.reservestatus == "reservation"){
				var textstring = "<?=$lang_resource['CHECKOUT_RESERVATION_DETAILS']?>"
				}
								
				
				b += '<div class="col-md-8">'
				b += '<h2 class="heading">'+textstring+'</h2>'
				b += '<div class="order_details">'
				if(Main.checkoutinfo['Name'].status == 't'){
	
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Name" id="buyername" value="' + Main.NullToEmpty(Shopping.Cart.buyer.name) + '" onkeyup="Shopping.UserUpdate(this,\'name\')" onkeypress="return Checkout.Validation(event,this.value)" onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'

					}
					if(Main.checkoutinfo['Last Name'].status == 't'){
						
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Last Name" id="buyerlastname" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname2) + '" onkeyup="Shopping.UserUpdate(this,\'lastname2\')"  onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
					}
					if(Main.checkoutinfo['Email'].status == 't'){	
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Email" id="buyeremail"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.email) + '" onkeyup="Shopping.UserUpdate(this,\'email\')"  onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'

					}
					if(Main.checkoutinfo['Full Address'].status == 't'){
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Address" id="buyeraddress"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.address) + '" onkeyup="Shopping.UserUpdate(this,\'address\')" onkeypress="return Checkout.Validation(event,this.value)"  onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
					}
					if(Main.checkoutinfo['APT/Suit'].status == 't'){	
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Api/Suit" id="buyerapi" value="' + Main.NullToEmpty(Shopping.Cart.buyer.api) + '" onkeyup="Shopping.UserUpdate(this,\'api\')" onkeypress="return Checkout.Validation(event,this.value);"  onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
					
						
					}
					if(Main.checkoutinfo['Zipcode'].status == 't'){	
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Zipcode" id="buyerzipcode" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zipcode\')" onkeypress="return Checkout.Validation(event,this.value);"  onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
					
					}
					if(Main.checkoutinfo['City'].status == 't'){
						
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<select class="form-control" id="buyercity" onchange="Shopping.UserUpdate(this,\'city\')">'
                        b += '<option value=""></option>';
						if(Main.Franchises.length!=0){
							var ck = ""
							for(var x in Main.Franchises){
								if(Main.Franchises[x].id == Main.WhereAmIData.city){
									ck = "SELECTED"
								}
								b += '<option value="'+Main.Franchises[x].id+'" '+ck+'>'+Main.Franchises[x].city+'</option>'
								ck = ""
							}
						}
                        b += '</select>'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
					}
					if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
						if(Main.neighsettings == 't'){
							
							b += '<div class="row">'
							b += '<div class="col-md-12 order_details_field">'
							b += '<select class="form-control" id="buyercolony" onchange="Shopping.UserUpdate(this,\'colony\')">'
							b += '<option value=""></option>';
							b += '</select>'
							b += '</div>'<!--col-md-12-->
							b += '</div>'
							
						}else{
							
							b += '<div class="row">'
							b += '<div class="col-md-12 order_details_field">'
							b += '<input type="text" class="form-control" placeholder="Area / Neighborhood" id="buyercolony" value="' + Main.NullToEmpty(Shopping.Cart.buyer.colony) + '" onkeyup="Shopping.UserUpdate(this,\'colony\')" onkeypress="return Checkout.Validation(event,this.value);">'
							b += '</div>'<!--col-md-12-->
							b += '</div>'
						
						}
					}
					if(Main.checkoutinfo['Where did you find about us'].status == 't'){
						
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<select class="form-control" id="buyerreference" onchange="Shopping.UserUpdate(this,\'reference\')">'
						b += '<option value=""></option>';
						if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "Facebook"){
							b += '<option value="<?= $lang_resource['MOBILE_SIXTH_PAGE_RADIO'] ?>" SELECTED><?= $lang_resource['MOBILE_SIXTH_PAGE_RADIO'] ?></option>'
						}else{
							b += '<option value="<?= $lang_resource['MOBILE_SIXTH_PAGE_RADIO'] ?>"><?= $lang_resource['MOBILE_SIXTH_PAGE_RADIO'] ?></option>'
						}
						if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "Flyer"){
							b += '<option value="<?= $lang_resource['MOBILE_SIXTH_PAGE_FLYER'] ?>" SELECTED><?= $lang_resource['MOBILE_SIXTH_PAGE_FLYER'] ?></option>'
						}else{
							b += '<option value="<?= $lang_resource['MOBILE_SIXTH_PAGE_FLYER'] ?>"><?= $lang_resource['MOBILE_SIXTH_PAGE_FLYER'] ?></option>'
						}
						if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "Google"){
							b += '<option value="<?= $lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] ?>" SELECTED><?= $lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] ?></option>'
						}else{
							b += '<option value="<?= $lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] ?>"><?= $lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] ?></option>'
						}
						b += '</select>'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
						
					}
					if(Main.checkoutinfo['Phone'].status == 't'){
						
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Phone" id="buyertel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'cel\')" onkeypress="return Checkout.Validation(event,this.value);">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
					}
					if(Main.checkoutinfo['Receive SMS'].status == 't'){
						
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						Shopping.Cart.twilioenabledclient=true;
						b += '<select class="form-control" onchange="Shopping.UpdateTwilio(this)">'
						b += '<option value="true"><?= $lang_resource['CHECKOUT_YES'] ?></option>';
						b += '<option value="false"><?= $lang_resource['CHECKOUT_NO'] ?></option>';
						b += '</select>'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
					}else{
						Shopping.Cart.twilioenabledclient=false;
					}
		
				
					if(Main.deliveryAccept == 1){
						var textstring = "<?= $lang_resource['DELIVERY'] ?>"
					}else if(Main.deliveryAccept == 2){	
						var textstring = "<?= $lang_resource['PICKUP']?>"
					}else if(Main.deliveryType == "delivery")  {
						var textstring = "<?= $lang_resource['DELIVERY'] ?>"
					}else if(Main.deliveryType == "pickup")  {
						var textstring = "<?= $lang_resource['PICKUP']?>"
					}
					Shopping.Cart.buyer.deliveryType = textstring;			      
					
					var deliveryTimelist = JSON.parse(Shopping.DeliveryDateschedule[0].timelist) ;
					var deliveryTimelistShow = JSON.parse(Shopping.DeliveryDateschedule[0].timelistshow) ;
					var deliveryTimelistInMMShow = Shopping.DeliveryDateschedule[0].mmtime;

					if(Main.checkoutinfo['Tip For The Driver'].status == 't'){
						if(Main.deliveryType!='pickup'){
							
							b += '<div class="row">'
							b += '<div class="col-md-12 order_details_field">'
							b += '<input type="text" class="form-control" placeholder="Tip For The Driver" id="buyertips" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tips) + '" onkeyup="Shopping.UserUpdate(this,\'tips\')" onkeypress="return Shopping.IsNumberKey(event);">'
							b += '</div>'<!--col-md-12-->
							b += '</div>'
				
						}
				    }
				    if(Main.checkoutinfo['Discount Coupon'].status == 't'){
						if(Shopping.Cart.discounttype != 1 && !Shopping.Cart.discountactive) {
							
						b += '<div class="row">'
						b += '<div class="col-md-12 order_details_field">'
						b += '<input type="text" class="form-control" placeholder="Discount Coupon" id="discountcoupon"  value="' + Main.NullToEmpty(Shopping.Cart.discountcode) + '" onkeyup="Shopping.UserUpdate(this,\'coupon\')"  onkeydown="return Checkout.Validation1(event,this.id);">'
						b += '<input type="hidden" id="discountattck" value="0">'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
						b += '<div class="row">'
						b += '<div class="col-md-6 order_details_field" id="discountimg">'
						if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
						b += '<img src="images/dis_pics/right.png" >';
						}
						
						b += '</div>'<!--col-md-12-->
						b += '<div class="col-md-6 order_details_field" id="discounttext">'
						if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
						b += '<?= $lang_resource['CHECKOUT_COUPON_APPLIED'] ?>';
						}
						b += '</div>'<!--col-md-12-->
						b += '</div>'		
							
						
						}
					}
					if(Shopping.Cart.preorder) {
						var pretime = new Date(Shopping.Cart.preorderDate);
						Shopping.Cart.buyer.deliveryhours =  Shopping.Cart.preordertimehh;
						Shopping.Cart.buyer.deliveryminute = Shopping.Cart.preordertimemm;
						//Shopping.Cart.buyer.deliverydate = pretime.getFullYear() + '-' + Main.zeroPad((pretime.getMonth()+1),2) + '-' + Main.zeroPad(pretime.getDate(),2);	
					}else{
						Shopping.Cart.buyer.deliverydate = "ASAP";
					}

					if(Main.checkoutinfo['Takeout Date'].status != 't'){
						var txthide = 'style="display:none;"';
					}
					
						b += '<div class="row" '+txthide+'>'
						b += '<div class="col-md-12 order_details_field">'
						Shopping.Cart.twilioenabledclient=true;
						b += '<select class="form-control" id="chkout_hour" onchange="Main.Hourcheck(this)">'
						b += '<option value="ASAP" SELECTED><?= $lang_resource['CHECKOUT_ASAP'] ?></option>';
						b += '</select>'
						b += '</div>'<!--col-md-12-->
						b += '</div>'
						
						
						b += '<div class="row" '+txthide+' id="pickup_time">'
						b += '<div class="col-md-6 order_details_field">'
						b += '<select class="form-control" id="preorderhh" onchange="Shopping.UserUpdate(this,\'hh\') ">';
						b += '<option value=""><?= $lang_resource['CHECKOUT_HH'] ?></options>';

						b += '</select>'
						b += '</div>'<!--col-md-6-->
						b += '<div class="col-md-6 order_details_field">'
						b += '<select class="form-control" id="preordermin" onchange="Shopping.UserUpdate(this,\'mm\')">';
						b += '<option value=""><?= $lang_resource['CHECKOUT_MM'] ?></options>';
						if(Shopping.Cart.buyer.deliveryminute == "0" ) {

						b += '<option value="0" selected>00 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';
						}
						else {
						b += '<option value="0" >00 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';	
						}
						if(Shopping.Cart.buyer.deliveryminute == "15" ) {
						b += '<option value="15" selected>15 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';
						}
						else {
						b += '<option value="15" >15 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';	
						}
						if(Shopping.Cart.buyer.deliveryminute == "30" ) {
						b += '<option value="30" selected>30 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';
						}
						else {
						b += '<option value="30" >30 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';	
						}
						if(Shopping.Cart.buyer.deliveryminute == "45" ) {
						b += '<option value="45" selected>45 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';
						}
						else {
						b += '<option value="45" >45 <?= $lang_resource['CHECKOUT_MIN'] ?></option>';	
						}
						b += '</select>'
						b += '</div>'<!--col-md-6-->
						b += '</div>'
								
					
					
						
						if(Main.checkoutinfo['ChackoutMap'].status == 't'){
							
							b += '<tr>';						
							b += '<td colspan="3">';
							b +='<div id="show_map112" style="display:block;">';
							b +='<div id="show_map" style="display:block;">';
							b +='<div id="mapboxuser" class="businessmapbox delivery_map_dv"></div>';
							b +='</div>';
							b +='</div>';
							b += '</td>';
							b += '</tr>';							
							b += '<tr>';							
							b += '<td colspan="3">';
							b +='<button type="button" class="order_btn_hand hand" onclick="Checkout.ShowHideMap();"><?=$lang_resource['CHECKOUT_ADDMAP']?></button>';
							b += '</td>';
							b += '</tr>';
							
							
							}
				
				<!--mercury field-->
				
				 b += '<table border="0" cellspacing="0" cellpadding="0" class="ck-table">';
				
				b += '<div class="row mercury_field" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?=$lang_resource['MERCURY_PAYMENT_ACNO']?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'mercury_acno\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				 
				 
				 /*b += '<tr class="mercury_field" style="display:none">';
                 b += '<td><?=$lang_resource['MERCURY_PAYMENT_ACNO']?></td>';
                 b += '<td>:</td>';
                 b += '<td><input type="text" class="field_text_ck" onkeyup="Shopping.UserUpdate(this,\'mercury_acno\')"/></td>';
                 b += '</tr>';*/
				 
				 b += '<div class="row mercury_field" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?=$lang_resource['MERCURY_PAYMENT_EXMM']?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'mercury_exmm\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				 /*b += '<tr class="mercury_field" style="display:none">';
                 b += '<td><?=$lang_resource['MERCURY_PAYMENT_EXMM']?></td>';
                 b += '<td>:</td>';
                 b += '<td><input type="text" class="field_text_ck" onkeyup="Shopping.UserUpdate(this,\'mercury_exmm\')"/></td>';
                 b += '</tr>';*/
				 
				 b += '<div class="row mercury_field" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?=$lang_resource['MERCURY_PAYMENT_EXYY']?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'mercury_exyy\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				/* b += '<tr class="mercury_field" style="display:none">';
                 b += '<td><?=$lang_resource['MERCURY_PAYMENT_EXYY']?></td>';
                 b += '<td>:</td>';
                 b += '<td><input type="text" class="field_text_ck" onkeyup="Shopping.UserUpdate(this,\'mercury_exyy\')"/></td>';
                 b += '</tr>';*/
				
				
				<!--end mercury field-->
				
				
				
				
				<!--Authorize.net field-->
				/*b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td colspan="3"><b><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARD_DETAILS'] ?></b></td>';
				
				b += '</tr>';*/
				
				
				
				
				 b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-12 order_details_field">'
				b += '<b><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARD_DETAILS'] ?></b>'
				b += '</div>'<!--col-md-12-->
				b += '</div>'
				
				
				 b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['LOGIN_CREATE_FIRST_NAME'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.firstname) + '" onkeyup="Shopping.UserUpdate(this,\'firstname\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				 b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['LOGIN_CREATE_LAST_NAME1'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname) + '" onkeyup="Shopping.UserUpdate(this,\'lastname\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				 b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['LOGIN_CREATE_STREET'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.street) + '" onkeyup="Shopping.UserUpdate(this,\'street\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['LOGIN_CREATE_CITY'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cityname) + '" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['MOBILE_MYACCOUNT_STATE1'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'state\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['MOBILE_MYACCOUNT_STATE'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.countryname) + '" onkeyup="Shopping.UserUpdate(this,\'countryname\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['FRONT_VISUALS_POST_CODE1'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cardno\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="password"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cvv2\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'expmm\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row au_ne_pay" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'expyy\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				
				
				/*b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_FIRST_NAME'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="' + Main.NullToEmpty(Shopping.Cart.buyer.firstname) + '" onkeyup="Shopping.UserUpdate(this,\'firstname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_LAST_NAME1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname) + '" onkeyup="Shopping.UserUpdate(this,\'lastname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_STREET'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="' + Main.NullToEmpty(Shopping.Cart.buyer.street) + '" onkeyup="Shopping.UserUpdate(this,\'street\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['LOGIN_CREATE_CITY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cityname) + '" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['MOBILE_MYACCOUNT_STATE1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'state\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['MOBILE_MYACCOUNT_STATE'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="' + Main.NullToEmpty(Shopping.Cart.buyer.countryname) + '" onkeyup="Shopping.UserUpdate(this,\'countryname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['FRONT_VISUALS_POST_CODE1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';
				
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardno\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2']?></td>';
				b += '<td>:</td>';
				b += '<td><input type="password"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cvv2\')"/></td>';
				b += '</tr>';
				
				
				
				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'expmm\')"/></td>';
				b += '</tr>';

				b += '<tr class="au_ne_pay" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'expyy\')"/></td>';
				b += '</tr>';*/
				<!--Authorize.net field-->
				
				<!-- Card Save field-->
				
				b += '<div class="row cardsaveclass" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row cardsaveclass" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row cardsaveclass" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row cardsaveclass" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row cardsaveclass" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row cardsaveclass" style="display:none">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" value="" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);" />'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				
				
				/*b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')"/></td>';
				b += '</tr>';	
				
				
				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')"/></td>';
				b += '</tr>';

				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')"/></td>';
				b += '</tr>';
				
				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';

				b += '<tr class="cardsaveclass" style="display:none;">';
				b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" value="" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
				b += '</tr>';*/
				<!-- Card Save field-->
				
			
				
				
				
                b += '</table>';

				b += '</div>';
				
				<!-- Braintree Field -->
				b += '<div class="braintree_field ck-new" style="display:none;">';
				
				b += '<div class="row">'
				b += '<div class="col-md-12 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO'] ?>'
				b += '</div>'<!--col-md-12-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<div class="brainpayment_cards">';
				
				b +='<input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card" class="css-checkbox">';
				b +='<label for="brain_visa" class="css-label radGroup2"><img src="images/step4-checkout/pay-2.png"></label>';
				
				b +='<input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card" class="css-checkbox">';
				b +='<label for="brain_master" class="css-label radGroup2"><img src="images/step4-checkout/pay-3.png"></label>';
				
				
				
				b +='<input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago" class="css-checkbox">';
				b +='<label for="brain_marco" class="css-label radGroup2"><img src="images/step4-checkout/pay-4.png"></label>';
				
				
				b +='<input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave" class="css-checkbox">';
				b +='<label for="brain_cardsave" class="css-label radGroup2"><img src="images/step4-checkout/pay-5.png"></label>';
				
				
				b += '</div>';
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintreecard" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintreeexpiry" value="" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-12 order_details_field">'
				b += '<div class="brain_checkbox">';
			    b += '<input type="checkbox"  class="css-checkbox" id="braintreesameasdelivery" value="" onclick="Checkout.UpdateBrainTreeFields()" class="checkboxG4"/>';
				b += '<label for="braintreesameasdelivery" class="css-label"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_SAMEASDELIVERY'] ?></label>';
				b += '</div>';
				b += '</div>'<!--col-md-12-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_firstname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_lastname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_address1" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_address2" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_city" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_state" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_zipcode" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				b += '<div class="row">'
				b += '<div class="col-md-6 order_details_field">'
				b += '<?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?>'
				b += '</div>'<!--col-md-6-->
				b += '<div class="col-md-6 order_details_field">'
				b += '<input type="text"  class="form-control" id="braintree_zipcode" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/>'
				b += '</div>'<!--col-md-6-->
				b += '</div>'
				
				
				 /*b += '<table border="0" cellspacing="0" cellpadding="0" class="ck-table">';
				 
				 b += '<tr><td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO']?></td></tr>';
				 
				 b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE'] ?></td>';
				b += '<td>:</td>';
				b += '<td>';
				b += '<div class="brainpayment_cards">';
				
				b +='<input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card" class="css-checkbox">';
				b +='<label for="brain_visa" class="css-label radGroup2"><img src="images/step4-checkout/pay-2.png"></label>';
				
				b +='<input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card" class="css-checkbox">';
				b +='<label for="brain_master" class="css-label radGroup2"><img src="images/step4-checkout/pay-3.png"></label>';
				
				
				
				b +='<input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago" class="css-checkbox">';
				b +='<label for="brain_marco" class="css-label radGroup2"><img src="images/step4-checkout/pay-4.png"></label>';
				
				
				b +='<input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave" class="css-checkbox">';
				b +='<label for="brain_cardsave" class="css-label radGroup2"><img src="images/step4-checkout/pay-5.png"></label>';
				
				
				b += '</div>';
				
				
				
				b +='</td>';
				
				b += '</tr>';
				 
				 
				 
				 
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintreecard" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')"/></td>';
				b += '</tr>';
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintreeexpiry" value="" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')"/></td>';
				b += '</tr>';
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				b += '<tr>';
				b += '<td colspan="3">';
				b += '<div class="brain_checkbox">';
			    b += '<input type="checkbox"  class="css-checkbox" id="braintreesameasdelivery" value="" onclick="Checkout.UpdateBrainTreeFields()" class="checkboxG4"/>';
				b += '<label for="braintreesameasdelivery" class="css-label"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_SAMEASDELIVERY'] ?></label>';
				b += '</div>';
				b += '</td>';
				b += '</tr>';
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_firstname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_lastname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_address1" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_address2" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_city" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_state" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				b += '<tr>';
				b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?></td>';
				b += '<td>:</td>';
				b += '<td><input type="text"  class="field_text_ck" id="braintree_zipcode" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
				b += '</tr>';
				
				
				
				
				
				 b += '</table>';*/
				 
				  b += '</div>';
				
				<!-- Braintree Field -->
				
				b +='<div id="paymentBox"></div>'
				
				b +='</div>'
				
				b += '</div>'<!--row-->
				b += '</div>'
		

		

				document.getElementById("shoppingbox").innerHTML = b;
				
				$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$("button").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
			$("h3").css({"color":Main.adstle});
         });
				 
				if(Main.checkoutinfo['ChackoutMap'].status == 't'){	
				a = new Object();
				//alert(Main.User.location);
				// alert("ok");
				if(Main.User && Main.User.location)
				{
				var latlang1 = JSON.parse(Main.User.location);
				//alert(latlang1.latitud);
				a.latitud = latlang1.latitud;
				a.longitud = latlang1.longitud;
				a.zoom = 18;
				}
				else{
				a.latitud = Main.latt1;
				a.longitud = Main.long1;
				a.zoom = 18;
				}
				GoogleMap.Init("mapboxuser", a.latitud, a.longitud, a.zoom, Main.UserLocationUpdated);
				}


				if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
					if(Main.neighsettings == 't'){
						Checkout.NeighPopulate();
					}
				}
				if(Main.checkoutinfo['Takeout Date'].status == 't'){
					Checkout.PreorderFetchTime();
				}

		
				Payment.AllpaymentButton();

	
	if(!Shopping.Cart.preorder) {
		if(document.getElementById("pickup_time")){
			$("#pickup_time").hide();
			//document.getElementById("pickup_time").style.visibility = "hidden";
		}	
	}
	
	 if(Shopping.Cart.preorder) {
					 
					 Main.CheckoutEditHourcheck()
				
				 }
				 
   RestMenuList.PopulateCart();
	if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
	    paypal.clearCheckPaymentTimer();
			if(document.getElementById("popupmainbuttonok")){	
            document.getElementById("popupmainbuttonok").style.display = "block";
			}
            Main.Ga(Main.ActiveView)
	}else{
		if(document.getElementById("popupmainbuttonok")){	
	    document.getElementById("popupmainbuttonok").style.display = "none";
		}
            Shopping.Cart.business.sort(Main.SortByProperty("name"));
            Main.Ga("/" + Main.WhereAmIData.cityname + "/cart")
	}
	
    }, 
    PreorderFetchTime: function(){
    	if(Shopping.Cart.preorder){	
			var catalogiD = Main.itemid;
		}else{
			var catalogiD = "0" ; 
		}
		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + catalogiD + ',"bussid":' + Shopping.ActiveBusiness + "}]", function (record){
			Checkout.PreorderFetchTimeHtml(record);			
		});
    },
    PreorderFetchTimeHtml: function(e){
    	e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);
		
		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)
		var b =''
		b += '<option value="ASAP" SELECTED><?= $lang_resource['CHECKOUT_ASAP'] ?></option>';
		for(var dl =0;dl<dayschedule.length;dl++) {
			if(Shopping.Cart.buyer.deliverydate == dayschedulev[dl] ) {
				b += '<option value="'+dayschedulev[dl]+'" selected>'+dayschedule[dl]+'</option>';	
			}
			else {
				b += '<option value="'+dayschedulev[dl]+'" >'+dayschedule[dl]+'</option>';			
			}
		}
		document.getElementById("chkout_hour").innerHTML = b;
    },

    NeighPopulate: function(){    	
    	Main.Loading();
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchNeighborhoodforCity","cityid":' + Main.WhereAmIData.city +  "}]", function (data){
	    	Shopping.CheckoutAllNeighbor = new Array();
		  	data = JSON.parse(data);
		  	for(var x in data.neighbor){
		  		Shopping.CheckoutAllNeighbor.push(data.neighbor[x]);
		  	}
		  	Main.Ready();
		  	Checkout.NeighPopulateInnerHtml();					
		});		
    },
    NeighPopulateInnerHtml: function(){
    	var b=''
		var flagneigh = 0;
		Shopping.Cart.buyer.colony = Shopping.Cart.buyer.address	
		b += '<option value=""></option>';
		if(Shopping.CheckoutAllNeighbor.length!=0){
			var ck1 = ""
			for(var x in Shopping.CheckoutAllNeighbor){
				if(Shopping.CheckoutAllNeighbor[x].id == Shopping.Cart.buyer.colony){
					ck1 = "SELECTED"
					flagneigh = 1;
				}  
				b += '<option value="'+Shopping.CheckoutAllNeighbor[x].id+'" '+ck1+'>'+Shopping.CheckoutAllNeighbor[x].name+'</option>'
				ck1 = ""
			}
			if(flagneigh==0){
				Shopping.Cart.buyer.colony = '';	
			}
		}
		document.getElementById("buyercolony").innerHTML=b;
    },
	
	UpdateBrainTreeFields: function()
	{
		if(document.getElementById("braintreesameasdelivery").checked)
		{ 
		
		document.getElementById("braintree_firstname").value = document.getElementById("buyername").value;
		if(document.getElementById("buyerlastname"))
		{
		document.getElementById("braintree_lastname").value = document.getElementById("buyerlastname").value;
		}
		if(document.getElementById("buyerzipcode"))
		{
		document.getElementById("braintree_zipcode").value = document.getElementById("buyerzipcode").value;
		}
		if(document.getElementById("buyercity"))
		{
		document.getElementById("braintree_city").value = $("#buyercity option:selected").text();
		}
		document.getElementById("braintree_address1").value = document.getElementById("buyeraddress").value;
		document.getElementById("braintree_address2").value = document.getElementById("buyerapi").value;
		document.getElementById("braintree_state").value = document.getElementById("buyercolony").value;
		
		}
		else
		{
	     document.getElementById("braintree_firstname").value = "";
		 document.getElementById("braintree_lastname").value = "";
		document.getElementById("braintree_zipcode").value = "";
		document.getElementById("braintree_city").value = "";
		document.getElementById("braintree_address1").value = "";
		document.getElementById("braintree_address2").value = "";
		document.getElementById("braintree_state").value = "";
			
		}
		
	},
	
	

	Validation: function(evt){ // Alphanumeric only 
	//alert(evt) 
	 	evt = evt || window.event;
	   var charCode = evt.which || evt.keyCode;
	   var charStr = String.fromCharCode(charCode);	 
	   //alert(charCode) 
	   	if (!(charCode == 8 || charCode == 27 || charCode == 46 || charCode == 37 || charCode == 39 )){
		   	if (/^[a-zA-Z0-9- \t\b\d-,]*$/.test(charStr) == false ) {    		
		    	return (false);
	    	}
	   	} 
	   
   },
   Validation1: function(e,id){
	   
	   //var name = document.getElementById("buyername").value;
	   //alert(val)
	  /*var name = $.trim(val);
	  alert(val)
    if(name == ""){alert(1)
		return (false);
		}*/
	  //return (false);
	  //alert(id)
	  var id1=id;
	   if (document.getElementById(id1).value.length == 0) {
		   //alert(e.keyCode)
           if (e.keyCode == 32) {
			  // alert("s")
			   document.getElementById(id1).value = '';
			  return false;
           }
       }

   },
   ShowConfirm: function(id,c,chk)
	{

		$(window).scrollTop(0)
		c = JSON.parse(c)
	
		var abn = '';
		abn += '<div class="success_body">';
		abn += '<div class="success_dishicon">';
		abn += '<img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$theme_name?>/assets/images/success-dish.png">';
		abn += '</div>';<!--success_dishicon-->
		abn += '<div class="container">';
		abn += '<div class="success_dv">';
		abn += '<div class="row">';
		abn += '<div class="col-lg-6">';
		abn += '<div class="success_left_dv">';
		
		if(chk.trim() == 'RN'){
		abn += '<h3><?= $lang_resource['ORDER_RESERVE_THANKS_PLCED'] ?></h3>';
		abn += '<div class="id_no"><?= $lang_resource['ORDER_RESERVE_PROCESSED'] ?> <span>#'+ id +'</span></div>';
		}else if(chk.trim() == 'N'){
		
		abn += '<h3><?= $lang_resource['ORDER_THANKS_PLCED'] ?></h3>';
		abn += '<div class="id_no"><?= $lang_resource['ORDER_PROCESSED'] ?> <span>#'+ id +'</span></div>';
		}else if(chk.trim() == 'R'){
		abn += '<h3><?= $lang_resource['RESERVE_THANKS_PLCED'] ?></h3>';
		abn += '<div class="id_no"><?= $lang_resource['RESERVE_PROCESSED'] ?> <span>#'+ id +'</span></div>';
		}
		abn += '</div>';<!--success_left_dv-->
		abn += '</div>';<!--col-lg-6-->
		
		
		abn += '<div class="col-lg-6">'
		abn += '<div class="success_right_dv">'
		if(chk.trim() == 'RN'){
		abn += '<h4><?=$lang_resource['SHOPPING_PROGRESS_ORDER_AND_RESERVE'];?></h4>'
		abn += '<button type="button" style="color:'+Main.adstle+'" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button>'
		abn += '<p><?=$lang_resource['SHOPPING_NEED_CHANGE_ORDER_RESERVE'];?></p>'
		abn += '<span>'+c.name+' : '+c.tel+'</span>'
		}else if(chk.trim() == 'N'){
		
		abn += '<h4><?=$lang_resource['SHOPPING_KNOW_THE_PROGRESS_ORDER'];?></h4>'
		abn += '<button type="button" style="color:'+Main.adstle+'" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button>'
		abn += '<p><?=$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_ORDER'];?></p>'
		abn += '<span>'+c.name+' : '+c.tel+'</span>'
		}else if(chk.trim() == 'R'){
		abn += '<h4><?=$lang_resource['SHOPPING_PROGRESS_OF_YOUR_RESERVE'];?></h4>'
		abn += '<button type="button" style="color:'+Main.adstle+'" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button>'
		abn += '<p><?=$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_ORDER'];?></p>'
		abn += '<span>'+c.name+' : '+c.tel+'</span>'
		}
		abn += '</div>'<!--success_right_dv-->
		abn += '</div>'<!--col-lg-6-->
		abn += '</div>'<!--row-->
		abn += '</div>'<!--success_dv-->
		abn += '<div class="share_icon">'
		abn += '<a class="st_facebook_hcount"></a>'
		abn += '<a class="st_twitter_hcount"></a>'
		abn += '<a class="st_sharethis_hcount"></a>'
		abn += '<script type="text/javascript">var switchTo5x=false;</script>'
		abn += '<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>'
		abn += '<script type="text/javascript">stLight.options({publisher: "f6d188a2-236d-4201-838a-2fc255b8f0bf", doNotHash: true, doNotCopy: false, hashAddressBar: false});</script>'
		abn += '</div>'
		abn += '</div>'<!--container-->
		abn += '</div>'


		$("#showcanvas").hide();
		$("#left").html(abn);
		
		$(document).ready(function() {
            $("select").css({"color":Main.adstle});
			$("input").css({"color":Main.adstle});
			$(".track_now").css({"color":Main.adstle});
			$("a").css({"color":Main.adstle});
			$("h3").css({"color":Main.adstle});
         });

		$("#left").removeClass("lfet_whle");
		$("#left").addClass("lfet_whle_final");	
		$("#plc_ordr").removeClass("active-step");
		$("#get_dlvrd").addClass("active-step");				
			
		

		if(showConfigureSMSPlugInPopUp == true) {
			alert(showConfigureSMSPlugInPopUpText);
		}
	}, 
	
	  ShowHideMap: function() {
	  
	//$("#show_map").toggle();  
	if(document.getElementById("show_map112").style.display=="none")
	{
		document.getElementById("show_map112").style.display = "block";
	}
	else
	{
		document.getElementById("show_map112").style.display = "none";
	}
  }
	
	  
};





