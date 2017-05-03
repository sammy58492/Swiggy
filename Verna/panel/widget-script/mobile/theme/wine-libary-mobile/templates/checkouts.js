var Checkout = {
      OpenCart: function (e)
    {
		
		
		var bd = "";
		
		bd +='<div class="inner_header">'
		bd +='<div class="header_left">'
		bd +='<button type="button" class="header_back_btn" onclick="javascript:RestMenuList.Main()"><i class="icon-arrow-left10"></i> Back</button>'
		bd +='</div>'<!--header_left-->
		bd +='<div class="header_middle">'
		bd +='<div class="header_logo"><a href="#"><img src="panel/images/winemobilebanner/header_logo.png"></a></div>'<!--header_logo-->
		bd +='</div>'<!--header_middle-->
		bd +='<div class="header_right">'
		bd +='<button type="button" class="header_back_btn" onclick="Main.InitInterface()"><?=$lang_resource['MOBILE_CHECKOUT_CANCEL']?></button>'
		bd +='</div>'<!--header_right-->
		bd +='</div>'
		document.getElementById("header").innerHTML = bd;
		
		
		
        if (Shopping.Cart.business.length == 0)
        {
	    alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
            return
        }
		 Main.stepBack  = 4;
		
		$(window).scrollTop(180)
		if(!MainCustom.in_array("103",countEStep)) {
		countEStep.push("103");
		}
		  var custom_link =  "Checkout-"+Shopping.ActiveBusinessName.split(" ").join("");
		 window.history.pushState( {"id":102} , "Checkout", custom_link );
	
	    $(".main li").removeClass("active-step");
		$(".main #plc_checkout").addClass("active-step");
	    $(".srch_bar").hide();
		
		if(document.getElementById("showcanvas"))
		document.getElementById("showcanvas").innerHTML = "";
        this.SavingOrder = false;
        var b = "";
		
		var week =0;


		
		if(Main.WhereAmIData.reservestatus == "delivery")  {
			var textstring = "<?= $lang_resource['Delivery_details_V2'] ?>"
		}else if(Main.WhereAmIData.reservestatus == "pickup")  {
			var textstring = "<?= $lang_resource['Pickup_details_V2'] ?>"
		}else if(Main.WhereAmIData.reservestatus == "reservation"){
			var textstring = "<?=$lang_resource['CHECKOUT_RESERVATION_DETAILS']?>"
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
		if(Shopping.DeliveryDateschedule) {
		var deliveryTimelist = JSON.parse(Shopping.DeliveryDateschedule[0].timelist) ;
		var deliveryTimelistShow = JSON.parse(Shopping.DeliveryDateschedule[0].timelistshow) ;
		var deliveryTimelistInMMShow = Shopping.DeliveryDateschedule[0].mmtime;
		}
		else {
		var deliveryTimelist = "" ;
		var deliveryTimelistShow = "" ;
		var deliveryTimelistInMMShow = "";
			}

		if(Shopping.Cart.preorder) {
			var pretime = new Date(Shopping.Cart.preorderDate);
			Shopping.Cart.buyer.deliveryhours =  Shopping.Cart.preordertimehh;
			Shopping.Cart.buyer.deliveryminute = Shopping.Cart.preordertimemm;
			//Shopping.Cart.buyer.deliverydate = pretime.getFullYear() + '-' + Main.zeroPad((pretime.getMonth()+1),2) + '-' + Main.zeroPad(pretime.getDate(),2);	
		}else{
			Shopping.Cart.buyer.deliverydate = "ASAP";
		}


			<!--prodet_area-->       
			//b +='<div class="checkout_area">'
			//b +='<div class="container">' 
			//b +='<div class="row">'


			b +='<div class="wrapper">'
			b +='<div class="checkout_dv">'
			b +='<div class="checkout_hd"><?=$lang_resource['CHECKOUT_HEADING']?></div>'

			b +='<div class="checkout_row">'

			if(Main.checkoutinfo['Takeout Date'].status != 't'){
				var txthide = 'style="display:none;"';
			}
			b +='<div class="checkout_sec" '+txthide+'>'
			b +='<label>'+textstring+' <?=$lang_resource['SCHEDULE_TEXT']?></label>'
			
			b +='<div class="checkoutselect">'
			b +='<span class="selectdropdown">'
			b += '<select class="selectdropdownselect" id="chkout_hour" onchange="Main.Hourcheck(this)">';
			b += '<option value="ASAP" SELECTED><?= $lang_resource['CHECKOUT_ASAP'] ?></option>';			
			b += '</select>';
			b +='</span>'
			b +='</div>'

			b +='<div id="pickup_time" '+txthide+'>'
			b +='<div class="hmcheckoutselect" >'
			b +='<span class="selectdropdown">'
			b +='<select class="selectdropdownselect" id="preorderhh" onchange="Shopping.UserUpdate(this,\'hh\') ">';
			b += '<option value=""><?= $lang_resource['CHECKOUT_HH'] ?></options>';

			b += '</select>'
			b +='</span>'
			b +='</div>'
			b +='<div class="hmcheckoutselect">'
			b +='<span class="selectdropdown">'
			b +='<select class="selectdropdownselect" id="preordermin" onchange="Shopping.UserUpdate(this,\'mm\')" >';
						b += '<option value=""><?= $lang_resource['CHECKOUT_MM'] ?></option>';
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
			b +='</span>'
			b +='</div>'

			b +='</div>'

			b +='</div>'



			b +='<table width="100%" cellspacing="0" cellpadding="0" class="checktable">'
			b +='<tr>'
			b +='<th colspan="2" align="left" valign="top"><?= $lang_resource['Your_order_summary_V2'] ?></th>'
			b +='</tr>'
			b +='<tbody id="cartresultsinner">'
		
			b +='</tbody>'
			b +='<tr>'
			b +='<td align="left" valign="top"><strong><?= $lang_resource['EXPORT_TOTAL'] ?></strong></td>'
			b +='<td width="15%" align="left" valign="top">'+Main.car+'<span  id="orderprice">0.00</span> </td>'
			b +='</tr>'

			b +='</table>'
			b +='</div>'



			b +='<div class="checkout_row">'                		
			b +='<table width="100%" cellspacing="0" cellpadding="0" class="customtable">'
			b +='<tr>'
			b +='<th colspan="2" align="left" valign="top" scope="col"><?= $lang_resource['CHECKOUT_CUSTOMER_DETAILS'] ?></th>'
			b +='</tr>'
			if(Main.checkoutinfo['Name'].status == 't'){
			b +='<tr>'
			b +='<td width="20%"><?= $lang_resource['Name_V2'] ?></td>'
			b +='<td width="80%"><input type="text" id="buyername" value="' + Main.NullToEmpty(Shopping.Cart.buyer.name) + '" onkeyup="Shopping.UserUpdate(this,\'name\')" onkeypress="return Checkout.Validation(event,this.value);"></td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['Last Name'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['LastName_V2'] ?></td>'
			b +='<td><input type="text" id="buyerlastname" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname2) + '" onkeyup="Shopping.UserUpdate(this,\'lastname2\')" onkeypress="return Checkout.Validation(event,this.value);"></td>'
			b +='</tr>'
			}

			if(Main.checkoutinfo['Email'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['CONTROL_PANEL_DRIVER_EMAIL_HEADER'] ?></td>'
			b +='<td><input type="text" id="buyeremail" value="' + Main.NullToEmpty(Shopping.Cart.buyer.email) + '" onkeyup="Shopping.UserUpdate(this,\'email\')" ></td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['Full Address'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['CHECKOUT_FULL_ADDRESS'] ?></td>'
			b +='<td><input type="text" id="buyeraddress" value="' + Main.NullToEmpty(Shopping.Cart.buyer.address) + '" onkeyup="Shopping.UserUpdate(this,\'address\')" onkeypress="return Checkout.Validation(event,this.value);"></td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['APT/Suit'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['CHECKOUT_API'] ?></td>'
			b +='<td><input type="text" id="buyerapi" value="' + Main.NullToEmpty(Shopping.Cart.buyer.api) + '" onkeyup="Shopping.UserUpdate(this,\'api\')" onkeypress="return Checkout.Validation(event,this.value);" ></td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['Zipcode'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['CHECKOUT_ZIP'] ?></td>'
			b +='<td><input type="text" id="buyerzipcode" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zipcode\')" onkeypress="return Checkout.Validation(event,this.value);" ></td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['City'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['CHECKOUT_CITY'] ?></td>'
			b +='<td>'
			b +='<div class="checkoutselectdropdown" >'
			b +='<span class="selectdropdown">'
			b += '<select class="selectdropdownselect" id="buyercity" onchange="Shopping.UserUpdate(this,\'city\')">';
			b += '<option value=""></option>';
			if(Main.Franchises && Main.Franchises.length!=0){
				var ck = ""
				for(var x in Main.Franchises){
					if(Main.Franchises[x].id == Main.WhereAmIData.city){
						ck = "SELECTED"
					}
					b += '<option value="'+Main.Franchises[x].id+'" '+ck+'>'+Main.Franchises[x].city+'</option>'
					ck = ""
				}
			}
			b += '</select>';			
			b +='</span>'
			b +='</div>'

			
			b +='</td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
				if(Main.neighsettings == 't'){
					b +='<tr>'
					b +='<td><?= $lang_resource['Neighbourhood_V2'] ?></td>'
					b +='<td>'

					b +='<div class="checkoutselectdropdown" >'
					b +='<span class="selectdropdown">'
					b += '<select id="buyercolony" onchange="Shopping.UserUpdate(this,\'colony\')">';
					b += '<option value=""></option>';							
					b += '</select>';			
					b +='</span>'
					b +='</div>'

					
					b +='</td>'
					b +='</tr>'
				}else{
					b +='<tr>'
					b +='<td><?= $lang_resource['Neighbourhood_V2'] ?></td>'
					b +='<td><input type="text" id="buyercolony" value="' + Main.NullToEmpty(Shopping.Cart.buyer.colony) + '" onkeyup="Shopping.UserUpdate(this,\'colony\')" onkeypress="return Checkout.Validation(event,this.value);" ></td>'
					b +='</tr>'
				}
			}

			if(Main.checkoutinfo['Where did you find about us'].status == 't'){				
				b +='<tr>'
				//b +='<td width="72%"><?= $lang_resource['Neighbourhood_V2'] ?></td>'
				b +='<td><?= $lang_resource['WHERE_DID_YOU_FIND_ABOUT_US'] ?></td>'
				b +='<td>'
				
				
				
				
				b +='<div class="checkoutselectdropdown">'
				b +='<span class="selectdropdown">'
				b += '<select class="selectdropdownselect" id="buyerreference"  onchange="Shopping.UserUpdate(this,\'reference\')">';					
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
				b += "</select>"
				b +='</span>'
				b +='</div>'				
				b +='</td>'
				b +='</tr>'	
				
				
				
				
				
				
				
				
				
				
				
				
						
			}
			if(Main.checkoutinfo['Phone'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['Phone_V2'] ?></td>'
			b +='<td><input type="text" id="buyertel" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'cel\')" onkeypress="return Checkout.Validation(event,this.value);" ></td>'
			b +='</tr>'
			}
			if(Main.checkoutinfo['Receive SMS'].status == 't'){
			b +='<tr>'
			b +='<td><?= $lang_resource['CHECKOUT_RECEIVE_SMS'] ?></td>'
			b +='<td>'
			Shopping.Cart.twilioenabledclient=true;
			b +='<div class="checkoutselectdropdown">'
			b +='<span class="selectdropdown">'			
			b += '<select class="selectdropdownselect" onchange="Shopping.UpdateTwilio(this)">';
			b += '<option value="true"><?= $lang_resource['CHECKOUT_YES'] ?></option>';
			b += '<option value="false"><?= $lang_resource['CHECKOUT_NO'] ?></option>';
			b += '<option></option>';
			b += '</select>';
			b +='</span>'
			b +='</div>'				
			b +='</td>'
			b +='</tr>'
			}else{
				Shopping.Cart.twilioenabledclient=false;
			}

			if(Main.checkoutinfo['Tip For The Driver'].status == 't'){
				if(Main.deliveryType!='pickup'){
					b +='<tr>'
					b +='<td><?= $lang_resource['CHECKOUT_TIP_FOR_THE_DRIVER'] ?></td>'
					b +='<td><input type="text" id="buyertips"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.tips) + '" onkeyup="Shopping.UserUpdate(this,\'tips\')" onkeypress="return Shopping.IsNumberKey(event);" ></td>'
					b +='</tr>'
				}			
			}



			<!--mercury field-->
			b += '<tr class="mercury_field" style="display:none">';
			b += '<td><?=$lang_resource['MERCURY_PAYMENT_ACNO']?></td>'			
			b += '<td><input type="text" onkeyup="Shopping.UserUpdate(this,\'mercury_acno\')"/></td>'
			b += '</tr>'

			b += '<tr class="mercury_field" style="display:none">';
			b += '<td><?=$lang_resource['MERCURY_PAYMENT_EXMM']?></td>'			
			b += '<td><input type="text" onkeyup="Shopping.UserUpdate(this,\'mercury_exmm\')"/></td>'
			b += '</tr>'

			b += '<tr class="mercury_field" style="display:none">';
			b += '<td><?=$lang_resource['MERCURY_PAYMENT_EXYY']?></td>';
			b += '<td><input type="text" onkeyup="Shopping.UserUpdate(this,\'mercury_exyy\')"/></td>';
			b += '</tr>'
			<!--end mercury field-->


			<!-- Braintree Field -->
			b += '<tr class="braintree_field" style="display:none;">';
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?></td>'		
			b += '<td><input type="text"  id="braintreecard" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')"/></td>';
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">';
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?></td>'			
			b += '<td><input type="text" id="braintreeexpiry" value="" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')"/></td>';
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">';
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?></td>'			
			b += '<td><input type="text"  id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
			b += '</tr>'

			<!-- Braintree Field -->


			<!--Authorize.net field-->
			b += '<tr class="au_ne_pay" style="display:none;">';
			b += '<td colspan="2"><b><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARD_DETAILS'] ?></b></td>';
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['LOGIN_CREATE_FIRST_NAME'] ?></td>'			
			b += '<td><input type="text"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.firstname) + '" onkeyup="Shopping.UserUpdate(this,\'firstname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['LOGIN_CREATE_LAST_NAME1'] ?></td>'			
			b += '<td><input type="text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname) + '" onkeyup="Shopping.UserUpdate(this,\'lastname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>'
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['LOGIN_CREATE_STREET'] ?></td>'			
			b += '<td><input type="text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.street) + '" onkeyup="Shopping.UserUpdate(this,\'street\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>'
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['LOGIN_CREATE_CITY'] ?></td>'			
			b += '<td><input type="text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cityname) + '" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>'
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['MOBILE_MYACCOUNT_STATE1'] ?></td>'
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'state\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['MOBILE_MYACCOUNT_STATE'] ?></td>'
			b += '<td><input type="text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.countryname) + '" onkeyup="Shopping.UserUpdate(this,\'countryname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['FRONT_VISUALS_POST_CODE1'] ?></td>'
			b += '<td><input type="text" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>'
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] ?></td>'
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'cardno\')"/></td>'
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2']?></td>';
			b += '<td><input type="password" value="" onkeyup="Shopping.UserUpdate(this,\'cvv2\')"/></td>';
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?></td>'
			b += '<td><input type="text"  value="" onkeyup="Shopping.UserUpdate(this,\'expmm\')"/></td>'
			b += '</tr>'

			b += '<tr class="au_ne_pay" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?></td>'
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'expyy\')"/></td>'
			b += '</tr>'
			<!--Authorize.net field-->

			<!-- Card Save field-->
			b += '<tr class="cardsaveclass" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] ?></td>'	
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')"/></td>'
			b += '</tr>'

			b += '<tr class="cardsaveclass" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] ?></td>'			
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')"/></td>'
			b += '</tr>'

			b += '<tr class="cardsaveclass" style="display:none;">';
			b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] ?></td>'			
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')"/></td>'
			b += '</tr>'

			b += '<tr class="cardsaveclass" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?></td>'
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')"/></td>';
			b += '</tr>'

			b += '<tr class="cardsaveclass" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] ?></td>'
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
			b += '</tr>'

			b += '<tr class="cardsaveclass" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] ?></td>'
			b += '<td><input type="text" value="" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);" /></td>';
			b += '</tr>'
			<!-- Card Save field-->


			<!-- Braintree Field -->
			b += '<tr class="braintree_field" style="display:none;">'
			b +='<td colspan="2"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO']?></td>'
			b +='</tr>'

			b += '<tr class="braintree_field" style="display:none;">';
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE'] ?></td>'		
			b += '<td>';
						
			b +='<li><input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card" class="pay_radio">'
			b +='<label for="brain_visa" class="css-label radGroup2"><img src="images/step4-checkout/pay-2.png"></label></li>'
			b +='<li><input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card" class="pay_radio">'
			b +='<label for="brain_master" class="css-label radGroup2"><img src="images/step4-checkout/pay-3.png"></label></li>'
			b +='<li><input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago" class="pay_radio">'
			b +='<label for="brain_marco" class="css-label radGroup2"><img src="images/step4-checkout/pay-4.png"></label></li>'
			b +='<li><input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave" class="pay_radio">'
			b +='<label for="brain_cardsave" class="css-label radGroup2"><img src="images/step4-checkout/pay-5.png"></label></li>'
	
			b +='</td>'
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] ?></td>'		
			b += '<td><input type="text" id="braintreecard" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')"/></td>';
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] ?></td>'
			b += '<td><input type="text"  id="braintreeexpiry" value="" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')"/></td>';
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] ?></td>'		
			b += '<td><input type="text"  id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>';
			b += '</tr>'


			b += '<tr class="braintree_field" style="display:none;">';
			b += '<td colspan="2">';
			b += '<div class="brain_checkbox">';
			b += '<input type="checkbox"  class="css-checkbox" id="braintreesameasdelivery" value="" onclick="Checkout.UpdateBrainTreeFields()" class="checkboxG4"/>';
			b += '<label for="braintreesameasdelivery" class="css-label"><?= $lang_resource['CONTROL_PANEL_BRAINTREE_SAMEASDELIVERY'] ?></label>';
			b += '</div>';
			b += '</td>';
			b += '</tr>';


			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?></td>'			 
			b += '<td><input type="text" id="braintree_firstname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] ?></td>'		
			b += '<td><input type="text" id="braintree_lastname" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] ?></td>'	
			b += '<td><input type="text"  id="braintree_address1" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?></td>'			
			b += '<td><input type="text" id="braintree_address2" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?></td>'			
			b += '<td><input type="text" id="braintree_city" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'

			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] ?></td>'			
			b += '<td><input type="text" id="braintree_state" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'


			b += '<tr class="braintree_field" style="display:none;">'
			b += '<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?></td>'			
			b += '<td><input type="text" id="braintree_zipcode" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')"/></td>'
			b += '</tr>'

			<!-- Braintree Field -->



		


			b +='</table>'
			b +='</div>'






			b +='<div class="checkout_row">'                		
			b +='<table width="100%" cellspacing="0" cellpadding="0" class="paytable">'
			b +='<tr>'
			b +='<th><?=$lang_resource['EXPORT_PAYMENT_METHOD']?></th>'
			b +='</tr>'   
			b +='<tbody id="paymentBox">'                       
			
			
			b +='</tbody>'
			b +='</table>'
			b +='</div>'

			b +='<div class="checkout_row" >'              		
			b +='<table width="100%" cellspacing="0" cellpadding="0" class="payadd">'
			b +='<tr style="display:none;">'
			b +='<th colspan="2" align="left" valign="top" scope="col">Street address</th>'
			b +='</tr>'
			b +='<tr style="display:none;">'
			b +='<td width="70%" align="left" valign="top">visit 8,20132 million</td>'
			b +='<td width="30%" align="left" valign="top"><button type="button" class="change_btn">changes</button></td>'
			b +='</tr>'
			b +='<tr>'
			b +='<td colspan="2" align="left" valign="top"><textarea name="" cols="" rows="" class="change_text" id="' + Shopping.Cart.business[0].id + '_comments" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessCommentUpdate(this,' + 0 + ')">'+ Main.NullToEmpty(Shopping.Cart.business[0].comments)+'</textarea></td>'
			b +='</tr>'
			b +='</table>'
			b +='</div>'

			if(Main.checkoutinfo['Discount Coupon'].status == 't'){
				if(Shopping.Cart.discounttype != 1 && !Shopping.Cart.discountactive) {
					b +='<div class="checkout_row">'              		
					b +='<table width="100%" cellspacing="0" cellpadding="0" class="dictable">'
					b +='<tr>'
					b +='<th scope="col"><?= $lang_resource['SHOPPING_DISCOUNT_CUPON'] ?></th>'
					b +='<th scope="col" id="fieldid"><input type="text" id="discountcoupon"  value="' + Main.NullToEmpty(Shopping.Cart.discountcode) + '" onkeyup="Shopping.UserUpdate(this,\'coupon\')" ></th>'
					b += '<input type="hidden" id="discountattck" value="0">'
					b +='</tr>'
					b +='<tr>'
					
					b +='<th scope="col" id="discountimg">'
					if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
					b += '<img src="images/dis_pics/right.png" >';
					}
					b +='</th>'
					b +='<th scope="col">'
					b +='<span id="discounttext" style="margin-left: 20px;">'
					if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
					b += '<?= $lang_resource['CHECKOUT_COUPON_APPLIED'] ?>';
					}
						b +='</span>'
						b +='</th>'

					b +='</tr>'
					b +='</table>'
					b +='</div>'
				}
			}

			b +='<div class="checkout_row" id="place_order_button">'         		
			b +='<button type="button" class="check_btnb"><?= $lang_resource['CHECKOUT_ORDER_NOW'] ?></button>'
			b +='</div>'

			b +='</div>'
			b +='</div>'

			//b +='<div class="col-md-4"></div>'<!--col-md-4-->

			//b +='</div>'     
			//b +='</div>'      
			//b +='</div>'  
			<!--checkout_area--> 



	
					

				
				
				
				
				
				
				
				
				
				
				

	
		
		       

				document.getElementById("shoppingbox").innerHTML = b;
		if(!Main.user){
			if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
					if(Main.neighsettings == 't'){
						Checkout.NeighPopulate();
					}
				}
		}
				
				if(Main.checkoutinfo['Takeout Date'].status == 't'){
					Checkout.PreorderFetchTime();
				}

				
				Payment.AllpaymentButton();

	
	if(!Shopping.Cart.preorder) {
		if(document.getElementById("pickup_time")){
			document.getElementById("pickup_time").style.visibility = "hidden";
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
	 	evt = evt || window.event;
	   var charCode = evt.which || evt.keyCode;
	   var charStr = String.fromCharCode(charCode);	 
	   	if (!(charCode == 8 || charCode == 27 || charCode == 46 || charCode == 37 || charCode == 39)){
		   	if (/^[a-zA-Z0-9- \t\b\d-,]*$/.test(charStr) == false ) {    		
		    	return (false);
	    	}
	   	} 
	   
   } ,

   ShowConfirm: function(id,c,chk)
	{
		
		$(window).scrollTop(0)
		c = JSON.parse(c)


		<!--prodet_area-->       
		var abn = '<div class="success_area">'
		abn +='<div class="container">'
		abn +='<div class="row">'
		abn +='<div class="col-md-12">'
		abn +='<div class="success-dv">'
		abn +='<div class="seccess_img"><img src="<?=$module_image_link?>/images/seccess-icon1.png"></div>'
		if(Main.deliveryType == "pickup")  {
		abn +='<center><button type="button" class="takewaypickup" onclick="TakewayMap.Main('+id+')"><?=$lang_resource['GET_DIRECTION_FOR_TAKEWAY']?></button></center>'
		abn += '<div style="display:none;" id="paneltakewaymap">'
		abn += '<div id="takewaymap" class="mediummapbox takewaymap"></div>'
		abn += '</div>'
		abn +='</div>'
		}

		abn +='<div class="succes-tbl">'
		abn +='<div class="row">'
		abn +='<div class="col-md-6">'
		abn +='<div class="sc-left">'
		if(chk == 'RN'){
		abn += '<h3><?= $lang_resource['ORDER_RESERVE_THANKS_PLCED'] ?></h3>'
		abn += '<div class="order-no"><?= $lang_resource['ORDER_RESERVE_PROCESSED'] ?> <span>#'+ id +'</span></div>'
		}else if(chk == 'N'){
		abn += '<h3><?= $lang_resource['ORDER_THANKS_PLCED'] ?></h3>'
		abn += '<div class="order-no"><?= $lang_resource['ORDER_PROCESSED'] ?> <span>#'+ id +'</span></div>'
		}else if(chk == 'R'){
		abn += '<h3><?= $lang_resource['RESERVE_THANKS_PLCED'] ?></h3>'
		abn += '<div class="order-no"><?= $lang_resource['RESERVE_PROCESSED'] ?> <span>#'+ id +'</span></div>'
		}
		abn +='</div>'
		abn +='</div>'
		abn +='<div class="col-md-6">'
		abn +='<div class="sc-right">'

		if(chk == 'RN'){
		abn +='<h4><?=$lang_resource['SHOPPING_PROGRESS_ORDER_AND_RESERVE'];?></h4>'
		abn +='<center><button type="button" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button></center>'
		abn +='<h5><?=$lang_resource['SHOPPING_NEED_CHANGE_ORDER_RESERVE'];?></h5>'
		abn +='<p>'+c.name+' : '+c.tel+'</p>'
		}else if(chk == 'N'){
		abn +='<h4><?=$lang_resource['SHOPPING_KNOW_THE_PROGRESS_ORDER'];?></h4>'
		abn +='<center><button type="button" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button></center>'
		abn +='<h5><?=$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_ORDER'];?></h5>'
		abn +='<p>'+c.name+' : '+c.tel+'</p>'
		}else if(chk == 'R'){
		abn +='<h4><?=$lang_resource['SHOPPING_PROGRESS_OF_YOUR_RESERVE'];?></h4>'
		abn +='<center><button type="button" class="track_now" onClick="Visuals.OpenEachOrder('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button></center>'
		abn +='<h5><?=$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_RESERVE'];?></h5>'
		abn +='<p>'+c.name+' : '+c.tel+'</p>'
		}

		abn +='</div>'
		abn +='</div>'
		abn +='</div>'
		abn +='</div>'<!--succes-tbl-->
		abn +='</div>'
		abn +='</div>'     
		abn +='</div>'       
		abn +='</div>'   
		<!--prodet_area-->  



		$("#showcanvas").hide();
		var cartitem =0;
		$(".cartno").empty().append(cartitem)
		$("#left").html(abn);

		$("#left").removeClass("lfet_whle");
		$("#left").addClass("lfet_whle_final");	
		$("#plc_ordr").removeClass("active-step");
		$("#get_dlvrd").addClass("active-step");				
			


		if(showConfigureSMSPlugInPopUp == true) {
			alert(showConfigureSMSPlugInPopUpText);
		}
	},
	
	  
};


