var Checkout = {
    OpenCart: function (e){

        if (Shopping.Cart.business.length == 0){
        	swal("Error","<?= $lang_resource['CARTEMPTY_V21'] ?>","error");
	        return
        }
        if(Main.customslug !="" && Main.customslugcounter == 0){
        	window.history.pushState( {"id":101} , "Restaurent Menu", Main.customslug );	
        }
		Main.stepBack  = 4;

		$(window).scrollTop(180)
		
		var custom_link =  "Checkout-"+Shopping.ActiveBusinessName.split(" ").join("");
		window.history.pushState( {"id":102} , "Checkout", custom_link );
	
	    $(".main li").removeClass("active-step");
		$(".main #plc_checkout").addClass("active-step");
	    $(".srch_bar").hide();
		
	    var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
	    if(Shopping.Business[u].isimg==1){			
        	v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
		}else{
			v = 'panel/images/dummy/medium_business.jpg';
		}
		var imageUrl = Shopping.Business[u].headerurl;

		var htms =''
		var grey = "panel/images/pattern.png";
		htms +='<div class=" business_banner checkout_banner" style="background: url('+grey+'), url('+imageUrl+'); background-size: 100% 100%;">'
		htms +='<div class="container">'
		htms +='<div class="restaurant_info">'
		htms +='<p><?=$lang_resource['CHECKOUT_BANNER_HEADING']?></p>'
		htms +='<h3 id="restrnme"></h3>'
		htms +='</div>'<!--restaurant_info-->
		htms +='</div>'<!--container-->
		htms +='</div>'<!--business_banner-->

		document.getElementById("showcanvas").innerHTML = htms
        this.SavingOrder = false;
        var b = "";
		
		
		/*e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);
		
		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)*/
		var week =0;

		if(Main.WhereAmIData.reservestatus == "delivery"){
			var textstring = "<?= $lang_resource['Delivery_details_V2'] ?>"
		}else if(Main.WhereAmIData.reservestatus == "pickup"){
			var textstring = "<?= $lang_resource['Pickup_details_V2'] ?>"
		}else if(Main.WhereAmIData.reservestatus == "reservation"){
			var textstring = "<?=$lang_resource['CHECKOUT_RESERVATION_DETAILS']?>"
		}
 

		b +='<div class="container">'
		b +='<div class="row">'
		b +='<div class="col-md-9">'
		b +='<div class="white_box">'
		b +='<div class="checkout_dv">'
		if(Main.WhereAmIData.reservestatus == "delivery"){
			b +='<h4><?=$lang_resource['CHECKOUT_STEP1']?> '+textstring+' <?=$lang_resource['CHECKOUT_STEP1_PART']?></h4>'
			b +='<h3><?=$lang_resource['CHECKOUT_STEP1_DESCRIPTION']?></h3>'
		}else{
			b +='<h4><?=$lang_resource['CHECKOUT_STEP1']?> '+textstring+'</h4>'
			b +='<h3><?=$lang_resource['PLEASE_FILL_ALL_THE_DETAILS']?></h3>'
		}
		
		

		if(Main.checkoutinfo['Name'].status == 't'){
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['Name_V2'] ?></label>'
			b +='<input type="text" class="form-control" id="buyername" value="' + Main.NullToEmpty(Shopping.Cart.buyer.name) + '" onkeyup="Shopping.UserUpdate(this,\'name\')">'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Last Name'].status == 't'){
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['LastName_V2'] ?></label>'
			b +='<input type="text" class="form-control" id="buyerlastname" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname2) + '" onkeyup="Shopping.UserUpdate(this,\'lastname2\')">'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Email'].status == 't'){	
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['CONTROL_PANEL_DRIVER_EMAIL_HEADER'] ?></label>'
			b +='<input type="text" class="form-control" id="buyeremail" value="' + Main.NullToEmpty(Shopping.Cart.buyer.email) + '" onkeyup="Shopping.UserUpdate(this,\'email\')"  onkeydown="return Checkout.Validation1(event,this.id);" >'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Full Address'].status == 't'){	
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['CHECKOUT_FULL_ADDRESS'] ?></label>'
			b +='<input type="text" class="form-control" id="buyeraddress" value="' + Main.NullToEmpty(Shopping.Cart.buyer.address) + '" onkeyup="Shopping.UserUpdate(this,\'address\')" >'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['APT/Suit'].status == 't'){	
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['CHECKOUT_API'] ?></label>'
			b +='<input type="text" class="form-control" id="buyerapi" value="' + Main.NullToEmpty(Shopping.Cart.buyer.api) + '" onkeyup="Shopping.UserUpdate(this,\'api\')" >'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Zipcode'].status == 't'){	
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['CHECKOUT_ZIP'] ?></label>'
			b +='<input type="text" class="form-control" id="buyerzipcode" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zipcode\')" onkeypress="return Checkout.Validation(event,this.value);"  onkeydown="return Checkout.Validation1(event,this.id);" >'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['City'].status == 't'){	
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['CHECKOUT_CITY'] ?></label>'
			b += '<select id="buyercity" class="form-control" onchange="Shopping.UserUpdate(this,\'city\')">'
			b += '<option value=""></option>'
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
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['Neighbourhood_V2'] ?></label>'
			if(Main.neighsettings == 't'){
				b += '<select id="buyercolony" class="form-control" onchange="Shopping.UserUpdate(this,\'colony\')">'
				b += '<option value=""></option>'						
				b += '</select>'
			}else{
				b +='<input type="text" id="buyercolony" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.colony) + '" onkeyup="Shopping.UserUpdate(this,\'colony\')" />'
			}
			
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Where did you find about us'].status == 't'){
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['MOBILE_SIXTH_PAGE_WHERE_DID_YOU_FIND_US'] ?></label>'
			b += '<select id="buyerreference" class="form-control" onchange="Shopping.UserUpdate(this,\'reference\')">'
			b += '<option value=""></option>'
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
			b +='</select>'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Phone'].status == 't'){
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['Phone_V2'] ?></label>'
			b +='<input type="text" id="buyertel" class="form-control" placeholder="<?= $lang_resource['MOBILE_NO_WITH_COUNTRY_CODE'] ?>" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'cel\')" onkeypress="return Checkout.Validation(event,this.value);" />'
			b +='</div>'<!--form-group-->
		}

		if(Main.checkoutinfo['Receive SMS'].status == 't'){
			b +='<div class="form-group">'
			b +='<label><?= $lang_resource['CHECKOUT_RECEIVE_SMS'] ?></label>'
			Shopping.Cart.twilioenabledclient=true;
			b +='<select class="form-control" onchange="Shopping.UpdateTwilio(this)">'
			b +='<option value="true"><?= $lang_resource['CHECKOUT_YES'] ?></option>'
			b +='<option value="false"><?= $lang_resource['CHECKOUT_NO'] ?></option>'
			b +='</select>'
			b +='</div>'<!--form-group-->
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
				b +='<div class="form-group">'
				b +='<label><?= $lang_resource['CHECKOUT_TIP_FOR_THE_DRIVER'] ?></label>'
				b +='<input type="text" id="buyertips" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.tips) + '" onkeyup="Shopping.UserUpdate(this,\'tips\')" onkeypress="return Shopping.IsNumberKey(event);"/>'
				b +='</div>'<!--form-group-->
			}
	    }


	    if(Main.checkoutinfo['Discount Coupon'].status == 't'){
			if(Shopping.Cart.discounttype != 1 && !Shopping.Cart.discountactive) {
				b +='<div class="form-group">'
				b +='<label><?= $lang_resource['SHOPPING_DISCOUNT_CUPON'] ?></label>'
				b +='<span id="fieldid"><input type="text" id="discountcoupon" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.discountcode) + '" onkeyup="Shopping.UserUpdate(this,\'coupon\')"  onkeydown="return Checkout.Validation1(event,this.id);" /></span>'
				b += '<input type="hidden" id="discountattck" value="0">'
				b +='</div>'<!--form-group-->

				b +='<div class="form-group">'
				b +='<label id="discounttext">'
				if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
					b += '<?= $lang_resource['CHECKOUT_COUPON_APPLIED'] ?> &nbsp;';
				}
				b +=' </label>'
				b +='<label id="discountimg">'
				if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
					b += '<img src="images/dis_pics/right.png" >';
				}
				b +='</label>'
				b +='</div>'<!--form-group-->
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


		b +='<div class="form-group" '+txthide+'>'
		b +='<label>'+textstring+' <?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></label>'
		b +='<select class="form-control" id="chkout_hour" onchange="Main.Hourcheck(this)">'
		b +='<option value="ASAP" SELECTED><?= $lang_resource['CHECKOUT_ASAP'] ?></option>'		
		b +='</select>'
		b +='</div>'<!--form-group-->


		b +='<div class="form-group" id="pickup_time" '+txthide+'>'
		b +='<label>'+textstring+' <?= $lang_resource['V3_ORDER_TIME'] ?></label>'
		b +='<select class="form-control" id="preorderhh" onchange="Shopping.UserUpdate(this,\'hh\') ">'
		b +='<option value=""><?= $lang_resource['CHECKOUT_HH'] ?></options>'
		b +='</select>'
	
		b += '<select class="form-control" id="preordermin" onchange="Shopping.UserUpdate(this,\'mm\')">'
		b += '<option value=""><?= $lang_resource['CHECKOUT_MM'] ?></option>'
		if(Shopping.Cart.buyer.deliveryminute == "0" ){
			b += '<option value="0" selected>00 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'
		}else{
			b += '<option value="0" >00 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'
		}

		if(Shopping.Cart.buyer.deliveryminute == "15" ){
			b += '<option value="15" selected>15 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'
		}else{
			b += '<option value="15" >15 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'	
		}

		if(Shopping.Cart.buyer.deliveryminute == "30" ){
			b += '<option value="30" selected>30 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'
		}else{
			b += '<option value="30" >30 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'
		}

		if(Shopping.Cart.buyer.deliveryminute == "45" ){
			b += '<option value="45" selected>45 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'
		}else{
			b += '<option value="45" >45 <?= $lang_resource['CHECKOUT_MIN'] ?></option>'	
		}

		b +='</select>'
		b +='</div>'<!--form-group-->



		if(Main.checkoutinfo['ChackoutMap'].status == 't'){	
			b +='<div class="form-group">'
			b +='<div id="show_map112" style="display:block;">'
			b +='<div id="show_map" style="display:block;">'
			b +='<div id="mapboxuser" class="businessmapbox delivery_map_dv"></div>'
			b +='</div>'
			b +='</div>'
			b +='</div>'<!--form-group-->


			b +='<div class="form-group">'
			b +='<button type="button" class="add_map_btn hand" onclick="Checkout.ShowHideMap();"><?=$lang_resource['CHECKOUT_ADDMAP']?></button>'
			b +='</div>'<!--form-group-->
		}
		if(Main.deliveryType == "delivery") {
			b +='<div class="form-group">'
			b +='<label>Comment on delivery</label>'
			b +='<textarea class="form-control" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessCommentUpdate(this,' + i + ')" >'+Main.NullToEmpty(Shopping.Cart.buyer.comments)+'</textarea>'
			b +='</div>'<!--form-group-->
		}
		

		b +='</div>'<!--checkout_dv-->
		b +='</div>'<!--white_box-->		
		b +='</div>'<!--col-md-9-->

		b +='<div class="col-md-3">'
		b +='<div class="cart_dv">'
		b +='<h2><?=$lang_resource['MENU_LIST_MY_ORDERS']?></h2>'

	
		var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);

		if(Main.WhereAmIData.reservestatus=='delivery'){
			if(Shopping.Business[u].deliverytime== "" || Shopping.Business[u].deliverytime == undefined){
				if(Main.d_time){
					var dt = Main.d_time;
				}else{
					var dt = '00:00';
				}				
			}else{
				var dt = Shopping.Business[u].deliverytime				
			}
			b +='<div class="estimated_delivery_dv" id="deli">'
			b +='<p><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?></p>'
			b +='<h2>'+dt+'</h2>'
			//b +='<p>Minutes</p>'
			b +='</div>'<!--estimated_delivery_dv-->
		}else if(Main.WhereAmIData.reservestatus=='pickup' || Main.WhereAmIData.reservestatus=='reservation'){
			if(Shopping.Business[u].pickuptime== "" || Shopping.Business[u].pickuptime == undefined){
				var pt ="00:00"				
			}else{
				var pt = Shopping.Business[u].pickuptime				
			}
			b +='<div class="estimated_delivery_dv" id="pick">'
			b +='<p><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?></p>'
			b +='<h2>'+pt+'</h2>'
			//b +='<p>Minutes</p>'
			b +='</div>'<!--estimated_delivery_dv-->
		}


		if(Shopping.Cart.preorder){
			var d = new Date(Shopping.Cart.preorderDate);
			//Time selection settings. 
			time_format="<?=$lang_resource['TIME_FORMAT']?>";
			if(time_format=="12"){
				preordertimehh= Main.convertTimeFormat(Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm);
			}else{
				if(Shopping.Cart.preordertimehh >= 24){
					preordertimehh= Main.convertTimeFormat(Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm);
				}else{
					preordertimehh=Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2);
				}
			}

			if(Shopping.Cart.buyer.deliverydate){
				Shopping.Cart.Preordserdateback = Shopping.Cart.buyer.deliverydate;		
			}else{
				Shopping.Cart.buyer.deliverydate = Shopping.Cart.Preordserdateback;
			}

			Shopping.Cart.buyer.deliveryhours = Shopping.Cart.preordertimehh;
			showpreorderdate = Shopping.Cart.buyer.deliverydate + '  '+preordertimehh;

			b +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?=$lang_resource['PREORDER_DELIVERY']?> '+showpreorderdate+'</a></p>'
			b +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?= $lang_resource['MENU_LIST_CHANGE_TIME'] ?></a></p>'
		}else{
			b +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?=$lang_resource['PREORDER_DELIVERY']?></a></p>'
			b +='<p class="change_time"><a href="javascript:Main.PreOrderMenuCatalogFetch('+Shopping.Business[u].id+',true)"><?= $lang_resource['MENU_LIST_SET_TIME'] ?></a></p>'	
		}


		if(Main.settingfront.tab_delivery == 't' && Main.settingfront.tab_pickup == 't'){
			b +='<div class="delivery_pickup">'
			b +='<div class="row">'
			b +='<div class="col-md-12">'
			b +='<ul>'
			b +='<li>'
			b +='<span><?=$lang_resource['FRONT_VISUALS_TAB_DELIVERY']?></span>'
			b +='</li>'<!--col-md-2-->
			b +='<li>'
			b +='<span class="caption">'
			b +='<div class="del_pic">'
			b +='<input type="checkbox" name="1" id="deltypemenu">' 
	        b +='<label for="deltypemenu">&nbsp;</label>'
			b +='</div>'
			b +='</span>'
			b +='</li>'<!--col-md-2-->
			b +='<li>'
			b +='<span><?=$lang_resource['FRONT_VISUALS_TAB_PICKUP']?></span>'
			b +='</li>'
			b +='</ul>'
			b +='</div>'<!--col-md-12-->
			b +='</div>'<!--row-->
			b +='</div>'<!--delivery_pickup-->
		}




		b +='<div class="product_table_dv" id="cartresultsinner">'
		



		b +='</div>'<!--product_table_dv-->


		b +='<div class="product_table_dv">'
		b +='<div class="item_dv no-border">'
		b +='<ul class="item_row">'
		b +='<li>'
		b +='<p class="cart-total"><?= $lang_resource['EXPORT_TOTAL'] ?></p>'
		b +='</li>'
		b +='<li>'

		if(Main.User!=null){
			if(Main.ItemPointPermission==1){
				if(Main.availablepoint!=0){
					if(Shopping.Cart.totalfinla != null){
						b +='<li><p class="cart-total pull-right">'+Main.car+ ' ' +Shopping.Cart.totalfinla+'</p></li>'								
					}else{
						b +='<li><p class="cart-total pull-right">'+Main.car+'<span  id="orderprice">0.00</span></p></li>'								
					}
				}else{
					b +='<li><p class="cart-total pull-right">'+Main.car+'<span  id="orderprice">0.00</span></p></li>'
				}
			}else{
				b +='<li><p class="cart-total pull-right">'+Main.car+'<span  id="orderprice">0.00</span></p></li>'
			}
		}else{
			b +='<li><p class="cart-total pull-right">'+Main.car+'<span  id="orderprice">0.00</span></p></li>'
		}
		b +='</li>'
		b +='</ul>'<!--item_row-->
		b +='</div>'<!--item_dv-->
		b +='</div>'<!--product_table_dv-->




		b +='<div class="ck_btn_dv">'
		b +='<button type="button" class="checkout_btn" onclick="javascript:Shopping.OpenBusiness('+Shopping.Cart.business[0].id+')"><?= $lang_resource['PAYMENT_ORDER_BACK_TO_MENU'] ?></button>'
		b +='</div>'<!--ck_btn_dv-->
		b +='</div>'<!--cart_dv-->
		b +='</div>'<!--col-md-3-->
		b +='</div>'<!--row-->


		b +='<div class="row">'
		b +='<div class="col-md-9">'
		b +='<div class="white_box">'
		b +='<div class="checkout_dv">'
		b +='<h4><?=$lang_resource['CHECKOUT_STEP2']?></h4>'
		b +='<h3><?=$lang_resource['CHECKOUT_STEP2_DESCRIPTION']?></h3>'

		b +='<div id="paymentBox">'

		b +='</div>'

		b +='<p class="security">'
		b +='<span><img src="panel/<?=$moduleName?>/images/security_icon.png"></span><?=$lang_resource['CHECKOUT_STEP2_PAYMENT_DESCRIPTION']?></p>'

		//Mercury Field
		b +='<div class="row mercury_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['MERCURY_PAYMENT_ACNO']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'mercury_acno\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['MERCURY_PAYMENT_EXMM']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'mercury_exmm\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->
		b +='<div class="row mercury_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['MERCURY_PAYMENT_EXYY']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'mercury_exyy\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->
		//Mercury Field

		//Authorize.Net Field
		b +='<div class="row au_ne_pay" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?= $lang_resource['LOGIN_CREATE_FIRST_NAME'] ?></label>'
		b +='<input type="text" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.firstname) + '" onkeyup="Shopping.UserUpdate(this,\'firstname\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?= $lang_resource['LOGIN_CREATE_LAST_NAME1'] ?></label>'
		b +='<input type="text" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname) + '" onkeyup="Shopping.UserUpdate(this,\'lastname\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row au_ne_pay" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['LOGIN_CREATE_STREET'] ?></label>'
		b +='<input type="text" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.street) + '" onkeyup="Shopping.UserUpdate(this,\'street\')" onkeypress="return Checkout.Validation(event,this.value);" >'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['LOGIN_CREATE_CITY']?></label>'
		b +='<input type="text" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cityname) + '" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row au_ne_pay" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['MOBILE_MYACCOUNT_STATE1']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'state\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['MOBILE_MYACCOUNT_STATE']?></label>'
		b +='<input type="text" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.countryname) + '" onkeyup="Shopping.UserUpdate(this,\'countryname\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row au_ne_pay" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['FRONT_VISUALS_POST_CODE1']?></label>'
		b +='<input type="text" class="form-control" value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cardno\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row au_ne_pay" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cvv2\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] ?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'expmm\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row au_ne_pay" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] ?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'expyy\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->
		//Authorize.Net Field

		//Card Save Field
		b +='<div class="row cardsaveclass" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cardsavecardno\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpmm\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row cardsaveclass" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cardsaveexpyy\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_CARDSAVE_CVV']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cardsavecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row cardsaveclass" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_CARDSAVE_CITY']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'cityname\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_CARDSAVE_ZIP']?></label>'
		b +='<input type="text" class="form-control" onkeyup="Shopping.UserUpdate(this,\'zip\')" onkeypress="return Checkout.Validation(event,this.value);">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->
		//Card Save Field

		//Braintree Field
		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-12 col-sm-12">'	
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE']?></label>'

		b +='<div class="form-group">'
		b +='<div class="radio pyment_radio">' 
		b +='<input type="radio" id="brain_visa" name="brain_card_paytype" value="Visa Card">' 
		b +='<label for="brain_visa"><img src="images/step4-checkout/pay-2.png"></label>'
		b +='</div>'
		b +='</div>'<!--form-group-->

		b +='<div class="form-group">'
		b +='<div class="radio pyment_radio">' 
		b +='<input type="radio" id="brain_master" name="brain_card_paytype" value="Master Card">' 
		b +='<label for="brain_master"><img src="images/step4-checkout/pay-3.png"></label>'
		b +='</div>'
		b +='</div>'<!--form-group-->

		b +='<div class="form-group">'
		b +='<div class="radio pyment_radio">' 
		b +='<input type="radio" id="brain_marco" name="brain_card_paytype" value="Mercadopago">' 
		b +='<label for="brain_marco"><img src="images/step4-checkout/pay-4.png"></label>'
		b +='</div>'
		b +='</div>'<!--form-group-->

		b +='<div class="form-group">'
		b +='<div class="radio pyment_radio">' 
		b +='<input type="radio" id="brain_cardsave" name="brain_card_paytype" value="CardSave">' 
		b +='<label for="brain_cardsave"><img src="images/step4-checkout/pay-5.png"></label>'
		b +='</div>'
		b +='</div>'<!--form-group-->


		b +='</div>'<!--col-md-12-->
		b +='</div>'<!--row-->

		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_CCNO']?></label>'
		b +='<input type="text" class="form-control" id="braintreecard" onkeyup="Shopping.UserUpdate(this,\'braintreecard\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_EXDT']?></label>'
		b +='<input type="text" class="form-control" id="braintreeexpiry" onkeyup="Shopping.UserUpdate(this,\'braintreeexpiry\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_CCV']?></label>'
		b +='<input type="text" class="form-control" id="braintreecvv" value="" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->		
		b +='</div>'<!--row-->

		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-12 col-sm-12">'			
		b +='<div class="form-group">'
		b +='<div class="radio pyment_radio">' 
		b +='<input type="checkbox" id="braintreesameasdelivery" onclick="Checkout.UpdateBrainTreeFields()">' 
		b +='<label for="braintreesameasdelivery"><?=$lang_resource['CONTROL_PANEL_BRAINTREE_SAMEASDELIVERY']?></label>'
		b +='</div>'
		b +='</div>'<!--form-group-->

		b +='</div>'<!--col-md-12-->
		b +='</div>'<!--row-->


		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE']?></label>'
		b +='<input type="text" class="form-control" id="braintree_firstname" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME']?></label>'
		b +='<input type="text" class="form-control" id="braintree_lastname" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1']?></label>'
		b +='<input type="text" class="form-control" id="braintree_address1" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?></label>'
		b +='<input type="text" class="form-control" id="braintree_address2" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?></label>'
		b +='<input type="text" class="form-control"  id="braintree_city" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_STATE']?></label>'
		b +='<input type="text" class="form-control" id="braintree_state" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->

		b +='<div class="row braintree_field" style="display:none;">'
		b +='<div class="col-md-6 col-sm-6">'
		b +='<div class="form-group">'
		b +='<label><?=$lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE']?></label>'
		b +='<input type="text" class="form-control" id="braintree_zipcode" onkeyup="Shopping.UserUpdate(this,\'braintreecvv\')">'
		b +='</div>'<!--form-group-->
		b +='</div>'<!--col-md-6-->
		b +='</div>'<!--row-->
		//Braintree Field

		if(Shopping.Cart.preorder){
			var d = new Date(Shopping.Cart.preorderDate);
			//Time selection settings. 
			time_format="<?=$lang_resource['TIME_FORMAT']?>";
			if(time_format=="12"){
				preordertimehh= Main.convertTimeFormat(Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm);
			}else{
				if(Shopping.Cart.preordertimehh >= 24){
					preordertimehh= Main.convertTimeFormat(Shopping.Cart.preordertimehh,Shopping.Cart.preordertimemm);
				}else{
					preordertimehh=Main.zeroPad(Shopping.Cart.preordertimehh,2)  + ':' + Main.zeroPad(Shopping.Cart.preordertimemm,2);
				}
			}

			if(Shopping.Cart.buyer.deliverydate){
				Shopping.Cart.Preordserdateback = Shopping.Cart.buyer.deliverydate;		
			}else{
				Shopping.Cart.buyer.deliverydate = Shopping.Cart.Preordserdateback;
			}

			Shopping.Cart.buyer.deliveryhours = Shopping.Cart.preordertimehh;
			showpreorderdate = Shopping.Cart.buyer.deliverydate + '  '+preordertimehh;
			b +='<p class="deli_time">'+textstring+' <?= $lang_resource['V3_ORDER_TIME'] ?> : '+showpreorderdate+'</p>'
		}else{
			b +='<p class="deli_time">'+textstring+' <?= $lang_resource['V3_ORDER_TIME'] ?> : ASAP</p>'
		}


		b +='<div class="row">'
		b +='<div class="col-md-4 col-md-offset-4">'
		b +='<div class="field_dv">'
		b +='<button type="button" id="bottom-order-btn" class="checkout_btn" onclick="Shopping.PlaceOrder()"><?= $lang_resource['PAYMENT_ORDER_NOW'] ?></button>'
		b +='</div>'<!--field_dv-->
		b +='</div>'<!--col-md-4-->
		b +='</div>'<!--row-->
		b +='</div>'<!--checkout_dv-->
		b +='</div>'<!--white_box-->
		b +='</div>'<!--col-md-9-->

		b +='</div>'<!--row-->
		b +='</div>'<!--container-->


		document.getElementById("shoppingbox").innerHTML = b;


		if(Main.WhereAmIData.collecttype == "delivery"){
        	$("#deltypemenu").prop('checked', false);
        }else if(Main.WhereAmIData.collecttype == "pickup"){
        	$("#deltypemenu").prop('checked', true);
        }

        $(document).ready(function(){        	
			$('#deltypemenu').click(function(){
				var r = swal({
					title: "Are you sure?",
					text: "<?= $lang_resource['MENU_LIST_DELIVERY_STATUS_CHANGE'] ?>",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#088A08",
					cancelButtonColor: "#FF0040",
					confirmButtonText: "Ok",
					cancelButtonText: "Cancel",
					closeOnConfirm: true,
					closeOnCancel: true },
				function(isConfirm){
					if (isConfirm) {
						if($("#deltypemenu").prop("checked") == true){
							var deltype = 'pickup'
							Main.VerifyLocationMenu('pickup')		
						}
						else if($("#deltypemenu").prop("checked") == false){
							Visuals.ChooseDeliverOptionMenu()
						}
					} else {
						if(Main.WhereAmIData.collecttype == "delivery"){
							$("#deltypemenu").prop('checked', false);
						}else if(Main.WhereAmIData.collecttype == "pickup"){
							$("#deltypemenu").prop('checked', true);
						}					
					}
				});
				//var r = confirm("If you chnage the delvery type then all the products in the cart will disappear except the products added under the delivery type will show");
			});
		});
		
	
		if(Main.checkoutinfo['ChackoutMap'].status == 't'){	
		a = new Object();

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

	
	/*if(!Shopping.Cart.preorder) {
		if(document.getElementById("pickup_time")){
			document.getElementById("pickup_time").style.visibility = "hidden";
		}	
	}*/
	
	 if(Shopping.Cart.preorder) {
					 
					 Main.CheckoutEditHourcheck()
				
				 }
   RestMenuList.PopulateCart();
	if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
	    paypal.clearCheckPaymentTimer();
			if(document.getElementById("popupmainbuttonok")){	
            document.getElementById("popupmainbuttonok").style.display = "block";
			}
			if(Main.ActiveView)
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

		if(Shopping.Cart.preorder) {
			Main.CheckoutEditHourcheck()
		}

		if(document.getElementById("chkout_hour").value == "ASAP") {
			$("#pickup_time").hide();//("visibility","hidden");
		}
		else{
			$("#pickup_time").show();//css("visibility","visible");
			// $("#preordermin option:first").attr('selected','selected');
		} 
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
		if(Shopping.Cart.buyer.colony >=0 )
		{
			
		}else{
			
			Shopping.Cart.buyer.colony = Main.User.colony
		}
	
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
		if(document.getElementById("buyeraddress"))
		{
		document.getElementById("braintree_address1").value = document.getElementById("buyeraddress").value;
		}
		if(document.getElementById("buyerapi"))
		{
		document.getElementById("braintree_address2").value = document.getElementById("buyerapi").value;
		}
		if(document.getElementById("buyercolony"))
		{
		document.getElementById("braintree_state").value = document.getElementById("buyercolony").value;
		}
		
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
	   
	   	if (!(charCode == 8 || charCode == 27 || charCode == 46 || charCode == 37 || charCode == 39 )){
		   	if (/^[a-zA-Z0-9- \t\b\d-,]*$/.test(charStr) == false ) {    		
		    	return (false);
	    	}
	   	} 	   
   },

   Validation1: function(e,id){
	  var id1=id;
	   if (document.getElementById(id1).value.length == 0) {	
           if (e.keyCode == 32) {			
			   document.getElementById(id1).value = '';
			  return false;
           }
       }
   },


	ShowConfirm: function(id,c,chk){
		$(window).scrollTop(0)
		c = JSON.parse(c)
		var data = c.data;

	
		var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
	    if(Shopping.Business[u].isimg==1){			
        	v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
		}else{
			v = 'panel/images/dummy/medium_business.jpg';
		}
		var imageUrl = Shopping.Business[u].headerurl;
		
		var n =''
		var grey = "panel/images/pattern.png";
		n +='<div class=" business_banner confirmation_banner" style="background: url('+grey+'), url('+imageUrl+'); background-size: 100% 100%;">'
		n +='<div class="container">'
		n +='<div class="restaurant_info">'
		n +='<h3><?=$lang_resource['CONFIRMATION_BANNER_HEADING']?> </h3>'
		n +='<p><?=$lang_resource['CONFIRMATION_BANNER_DESCRIPTION']?> </p>' 
		n +='</div>'<!--restaurant_info-->
		n +='</div>'<!--container-->
		n +='</div>'<!--business_banner-->
		

		var abn =''

		abn +='<div class="confirmation_white_panel">'
		abn +='<div class=" container">'
		abn +='<div class="row">'
		abn +='<div class="track_your_order_btn_dv">'
		abn +='<button type="button" class="track_your_order_btn" onClick="Main.OpenOrderConfirm('+id+');"><?=$lang_resource['TRACKNOW_V21']?></button>'
		abn +='</div>'<!--track_your_order_btn_dv-->
		abn +='</div>'<!--row-->
		abn +='</div>'<!--container-->
		abn +='</div>'<!--confirmation_white_panel-->


		//var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		abn +='<div class="container">'
		abn +='<div class="row">'
		abn +='<div class="col-md-8 col-md-offset-2">'  
		if(!data.reservestatus){
			if(data.buyer.deliveryType=='delivery'){
				if(c.deliverytime== "" || c.deliverytime == undefined){				
					var dt = '00:00';			
				}else{
					var dt = c.deliverytime				
				}
				abn +='<div class="estimated_delivery_dv confirmatio_estimated_delivery_dv" id="deli">'
				abn +='<p><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?></p>'
				abn +='<h2>'+dt+'</h2>'			
				abn +='</div>'<!--estimated_delivery_dv-->
			}else if(data.buyer.deliveryType == 'pickup'){
				if(c.pickuptime== "" || c.pickuptime == undefined){
					var pt ="00:00"				
				}else{
					var pt = c.pickuptime				
				}
				abn +='<div class="estimated_delivery_dv confirmatio_estimated_delivery_dv" id="pick">'
				abn +='<p><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?></p>'
				abn +='<h2>'+pt+'</h2>'			
				abn +='</div>'<!--estimated_delivery_dv-->
			}
		}

		abn +='<div class="white_box_conformation">'
		abn +='<div class="con_wrapper">'
		
		abn +='<div class="row">'
		abn +='<div class="col-md-6">'
		abn +='<h5><?=$lang_resource['CONFIRMATION_FROM']?></h5>'
		abn +='<p><strong>'+c.name.split("%20").join(" ");+'</strong></p>'
		abn +='<p>'+c.street+'</p>'
		abn +='<p>'+c.colony+'</p>'
		abn +='<p>'+c.tel+'</p>'
		abn +='</div>'<!--col-md-6-->
		abn +='<div class="col-md-6">'
		abn +='<h5><?=$lang_resource['CONFIRMATION_TO']?></h5>'
		abn +='<p><strong>'+Main.NullToEmpty(data.buyer.name).split("%20").join(" ")+' '+Main.NullToEmpty(data.buyer.lastname2).split("%20").join(" ")+'</strong></p>'
		abn +='<p>'+Main.NullToEmpty(data.buyer.address)+'</p>'
		abn +='<p>'+Main.NullToEmpty(data.buyer.colony)+'</p>'
		abn +='<p>'+Main.NullToEmpty(data.buyer.tel)+'</p>'
		abn +='</div>'<!--col-md-6-->
		abn +='</div>'<!--row-->
		abn +='</div>'<!--con_wrapper-->
		abn +='</div>'<!--white_box_conformation-->
		abn +='<div class="white_box_conformation">'
		abn +='<div class="con_wrapper">'
		if(chk.trim() == 'RN'){
			abn +='<h3><?= $lang_resource['ORDER_RESERVE_PROCESSED'] ?> # '+id+'</h3>'
		}else if(chk.trim() == 'N'){
			abn +='<h3><?= $lang_resource['ORDER_PROCESSED'] ?> # '+id+'</h3>'
		}else if(chk.trim() == 'R'){
			abn +='<h3><?= $lang_resource['RESERVE_PROCESSED'] ?> # '+id+'</h3>'
		}
		

		if(data.business[0]){	
		abn +='<div class="row">'
		abn +='<div class="col-md-12">'
		abn +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="confirmation_tbl">'

			if(data.business[0].dishes){			
				if (data.business[0].dishes.length != 0) {					
					for (var i = 0;i < data.business[0].dishes.length;i++){

						abn +='<tr>'
						abn +='<td>'+data.business[0].dishes[i].quantity+'x</td>'
						abn +='<td>'+data.business[0].dishes[i].name
						if(data.business[0].dishes[i].nofperson) {
							abn +='<br><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> : '+data.business[0].dishes[i].nofperson
						}
						if(data.business[0].dishes[i].options){
							abn +='<br>'+ProductOption.Margeslash(data.business[0].dishes[i].options)
						}
						if(data.business[0].dishes[i].comments) {
							abn +='<br>'+data.business[0].dishes[i].comments						
						}
						
						abn +='</td>'
						abn +='<td>'+c.car+' '+Shopping.FormatPriceNotFree(data.business[0].dishes[i].total)+'</td>'
						abn +='</tr>'
					}		
				}
			}
			abn +='</table>'                              
			abn +='</div>'<!--col-md-12-->                         
			abn +='</div>'<!--row-->
	
		}

		if(data.reservestatus){
			abn +='<h4 class="order_no_heading"><?= $lang_resource['TRACK_ORDER_RESERVASTION_HEADING'] ?></h4>'



			abn +='<div class="row">'
			abn +='<div class="col-md-12">'
	
			abn +='<table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%">'
			abn +='<tbody>'
			abn +='<tr>'
			abn +='<td><?= $lang_resource['LOGIN_CREATE_NAME'] ?></td>'
			abn +='<td>:</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserve.name).split("%20").join(" ");+'</td>'
			abn +='<td>&nbsp;</td>'
			abn +='</tr>'
			abn +='<tr>'
			abn +='<td><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></td>'
			abn +='<td>:</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserve.email)+'</td>'
			abn +='<td>&nbsp;</td>'
			abn +='</tr>'
			abn +='<tr>'
			abn +='<td><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></td>'
			abn +='<td>:</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserve.tel)+'</td>'
			abn +='<td>&nbsp;</td>'
			abn +='</tr>'
			abn +='<tr>'
			abn +='<td><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></td>'
			abn +='<td>:</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserve.rdate)+'</td>'
			abn +='<td>&nbsp;</td>'
			abn +='</tr>'
			abn +='<tr>'
			abn +='<td><?= $lang_resource['FRONT_DRIVER_TIME'] ?></td>'
			abn +='<td>:</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserve.rhour) + ':'+ Main.NullToEmpty(data.reserve.rmin) + '</td>'
			abn +='<td>&nbsp;</td>'
			abn +='</tr>'                            
			abn +='</tbody>'
			abn +='</table>'
                              
			abn +='</div>'<!--col-md-12-->                         
			abn +='</div>'<!--row-->


			
			abn +='<div class="row">'
			abn +='<div class="col-md-12">'
		
			abn +='<table class="table table-striped table-condensed rsv_tbl">'
			abn +='<thead>'
			abn +='<tr>'
			abn +='<th><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></td>'
			abn +='<th><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></td>'
			abn +='<th><?= $lang_resource['FRONT_RESERVATION_FREE'] ?></td>'
			abn +='<th><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></td>'
			abn +='<th style="text-align: right !important;"><?= $lang_resource['Price_V2'] ?></td>'
			abn +='</tr>'
			abn +='</thead>'
			abn +='<tbody>'
			abn +='<tr>'
			abn +='<td>'+Main.NullToEmpty(data.reserveQty.Table)+'</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserveQty.Room)+'</td>'
			abn +='<td>'+Main.NullToEmpty(data.reserveQty.Free)+'</td>'
			abn +='<td>'
			if(data.reserveQty.Table){
				if(data.reserveQty.Table.length != 0){
					abn +='<?= $lang_resource['FRONT_RESERVATION_TABLE'] ?>  '+data.reserveQty.Table.length+' X '+(Main.NullToEmpty(c.tableprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : c.tableprice)
					abn +='<br>'
				}
			}
			if(data.reserveQty.Room){
				if(data.reserveQty.Room.length != 0){
					abn +='<?= $lang_resource['FRONT_RESERVATION_ROOM'] ?>  '+data.reserveQty.Room.length+' X '+(Main.NullToEmpty(c.roomprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : c.roomprice)
					abn +='<br>'
				}
			}
			if(data.reserveQty.Free){
				if(data.reserveQty.Free.length != 0){
					abn +='<?= $lang_resource['FRONT_RESERVATION_FREE'] ?>  '+data.reserveQty.Free.length+' X '+(Main.NullToEmpty(c.freeprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : c.freeprice)
				}
			}			
			abn +='</td>'
			if(data.reserveQty.Table){
				var tableprice = data.reserveQty.Table.length * c.tableprice ;
			}
			if(data.reserveQty.Room){
				var roomprice = data.reserveQty.Room.length * c.roomprice ;
			}
			if(data.reserveQty.Free){
				var freeprice = data.reserveQty.Free.length * c.freeprice ;
			}
			abn +='<td align="right">'
			if(data.reserveQty.Table){
				if(tableprice != 0){
					abn += c.car+' '+tableprice.toFixed(Main.IS_DECIMAL_POINT)+'<br>'
				}		
			}
			if(data.reserveQty.Room){
				if(roomprice != 0){
					abn += c.car+' '+roomprice.toFixed(Main.IS_DECIMAL_POINT)+'<br>'
				}		
			}
			if(data.reserveQty.Free){
				if(freeprice != 0){
					abn += c.car+' '+freeprice.toFixed(2)
				}		
			}
			abn +='</td>'
			abn +='</tr>'
			abn +='<tr>'
			abn +='<td colspan="4"><?= $lang_resource['EXPORT_TOTAL'] ?></td>'
			abn +='<td align="right">'+c.car+' '+parseFloat(data.reserveFee).toFixed(Main.IS_DECIMAL_POINT)+'</td>'
			abn +='</tr>'

			abn +='</tbody>'
			abn +='</table>'

			abn +='</div>'<!--col-md-12-->
			abn +='</div>'<!--row-->
		
		}
		abn +='<div class="row">'
		abn +='<div class="col-md-12">'
		abn +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="confirmation_tbl">'

		abn +='<tr>'
		abn +='<td colspan="3">&nbsp;</td>'
		abn +='</tr>'
		abn +='<tr>'
		abn +='<td colspan="3">&nbsp;</td>'
		abn +='</tr>'
		
		//Delivery Shipping		
		if(data.buyer.deliveryType == "delivery"){  
			if (parseFloat(data.business[0].shipping) > 0){
				h = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}else{
				h = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}
			abn +='<tr>'
			abn +='<td colspan="2">' + h +'</td>'
			
			var ship_txt = data.business[0].shipping;
			if(ship_txt==0){
				var ship_free = '<?=$lang_resource['SHOPPING_SECOND_FREE']?>'
				abn +='<td><strong>'+ship_free+'</strong></td>'				
			}else{
				abn +='<td><strong>'+Shopping.FormatPrice(data.business[0].shipping,c.car)+'</strong></td>'
			}			                             
			abn +='</tr>'
		} 
		//Delivery Shipping

		//Discount 
		if((data.discounttype > 0) && (Main.NullToEmpty(data.discountprice)!='')){
			if(parseFloat(data.discountprice)>0){
				if(data.discounttype == 1){
					var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?> ('+data.discountrate+'%)';
				}else{
					var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?>';
				}
				abn +='<tr>'
				abn +='<td colspan="2">'+discaption+'</td>'                                   
				abn +='<td><strong>'+Shopping.FormatPrice(data.discountprice,c.car)+'</strong></td>'
				abn +='</tr>'
			}
			
		}
		//Discount 

		//Service Fee
		if(data.servicefeeTotal1){
			abn +='<tr>'
			abn +='<td colspan="2"><?=$lang_resource['SERVICE_FEE_V2']?> ('+parseInt(data.servicefee)+' %)</td>'                                   
			abn +='<td class="credit_price_text"><strong>'+Shopping.FormatPrice(data.servicefeeTotal1,c.car)+'</strong></td>'
			abn +='</tr>'
		}		
		//Service Fee

		//Tax
		if(data.buyer.tax){
			if(data.buyer.taxtype == 2){
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED']?>"
			}else{
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED']?>"
			}
			abn +='<tr>'
			abn +='<td colspan="2"><?=$lang_resource['REORDER_CONFIRM_TAX']?> ('+data.buyer.tax+' %)</td>'                                   
			abn +='<td class="credit_price_text"><strong>'+Shopping.FormatPrice(data.tax,c.car)+'</strong></td>'
			abn +='</tr>'
		}
		//Tax			

		//Tips
		if(parseInt(data.buyer.tips)>0){
			abn +='<tr>'
			abn +='<td colspan="2"><?=$lang_resource['TRACKORDER_TIPS']?></td>'                                   
			abn +='<td class="credit_price_text"><strong>'+Shopping.FormatPrice(data.buyer.tips,c.car)+'</strong></td>'
			abn +='</tr>'
		}		
		//Tips


		if(data.Total_Point_Used !=null){
			abn +='<tr>'
			abn +='<td colspan="2"><?=$lang_resource['TRACKORDER_TOTAL_VALUE']?></td>'                                   
			abn +='<td class="credit_price_text"><strong>'+Shopping.FormatPrice(parseFloat(data.total).toFixed(Main.IS_DECIMAL_POINT))+'</strong></td>'
			abn +='</tr>'
		}

		if(data.Total_Point_Used !=null){
			abn +='<tr>'
			abn +='<td colspan="2"><?=$lang_resource['TRACKORDER_USED_POINTS']?></td>'                                   
			abn +='<td class="credit_price_text"><strong>'+data.Total_Point_Used+'</strong></td>'
			abn +='</tr>'
		}

		if(data.usedpointvalue !=null){
			abn +='<tr>'
			abn +='<td colspan="2"><?=$lang_resource['TRACKORDER_USED_POINTS_VALUE']?></td>'                                   
			abn +='<td class="credit_price_text"><strong>'+data.usedpointvalue+'</strong></td>'
			abn +='</tr>'
		}

		abn +='<tr>'
		abn +='<td colspan="2" class=" total_text"><?=$lang_resource['CONFIRMATION_TOTAL']?></td>'                                   
		abn +='<td class="total_price_text"><strong>'+c.car+' '+data.total+'</strong></td>'
		abn +='</tr>'
		abn +='</table>'

		abn +='</div>'<!--col-md-12-->

		abn +='</div>'<!--row-->
		abn +='<br><br>'
		var abnc=''
		if(data.business[0].paymethod.cash == true) {
			abnc +='<?=$lang_resource['FRONT_CASH']?>';
		} else if(data.business[0].paymethod.card == true) {
			abnc +='<?=$lang_resource['FRONT_CARD']?>';  
		} else if(data.business[0].paymethod.braintree == true) {
			abnc +='<?=$lang_resource['FRONT_BRAINTREE']?>';  
		} else if(data.business[0].paymethod.authorize == true) {
			abnc +='<?=$lang_resource['FRONT_AUTHORIZE']?>';  
		} else if(data.business[0].paymethod.cardsave == true) {
			abnc +='<?=$lang_resource['FRONT_CARDSAVE']?>';  
		} else if(data.business[0].paymethod.paypal == true) {
			abnc +='<?=$lang_resource['FRONT_PAYPAL']?>';  
		}  else if(data.business[0].paymethod.marco == true) {
			abnc +='<?=$lang_resource['FRONT_MACRO']?>';  
		} else if(data.business[0].paymethod.paypaladaptive == true) {
			abnc +='<?=$lang_resource['FRONT_PAYPALADAPTIVE']?>';  
		} else if(data.business[0].paymethod.authorizednet == true) {
			abnc +='<?=$lang_resource['FRONT_AUTHORIZEDOTNET']?>';  
		}else if(data.business[0].paymethod.transactium == true) {
			abnc +='<?=$lang_resource['FRONT_TRANSACTIUM']?>';  
		}else if(data.business[0].paymethod.skrill == true) {
			abnc +='<?=$lang_resource['PAYMENT_SKRILL_PAY']?>';  
		}else if(data.business[0].paymethod.payeezy == true) {
			abnc +='<?=$lang_resource['PAYMENT_PAYEEZY_PAY']?>';  
		}else if(data.business[0].paymethod.voguepay == true) {
			abnc +='<?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?>';  
		}else if(data.business[0].paymethod.pexpress == true) {
			abnc +='<?=$lang_resource['PAYMENT_PEXPRESS_PAY']?>';  
		}else if(data.business[0].paymethod.maksekeskus == true) {
			abnc +='<?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?>';  
		}else if(data.business[0].paymethod.stripe == true) {
			abnc +='<?=$lang_resource['PAYMENT_STRIPE_PAY']?>';
		}else if(data.business[0].paymethod.payu == true) {
			abnc +='<?=$lang_resource['PAYMENT_PAYUMONEY_PAY']?>';
		}


		abn +='<h4 class="method_text"><?=$lang_resource['CONFIRMATION_PAYMENT_METHOD']?> : '+abnc+'</h4>'
		if(data.business[0].dishes.length>0){
			abn +='<h4 class="method_text"><?=$lang_resource['CONFIRMATION_DELIVERY_METHOD']?> : '+data.buyer.deliveryType+'</h4>'			
		}else{
			abn +='<h4 class="method_text"><?=$lang_resource['CONFIRMATION_DELIVERY_METHOD']?> : <?=$lang_resource['RESERVATION']?></h4>'
		}
		
		abn +='</div>'<!--con_wrapper-->
		abn +='</div>'<!--white_box_conformation-->
		abn +='<p class="question-about"><?=$lang_resource['CONFIRMATION_QUERIES']?> :<span>'+c.tel+'</span></p>'
		abn +='</div>'<!--col-md-8-->

		abn +='</div>'<!--row-->

		abn += '<div class="social-share">'
		abn += '<a class="st_facebook_hcount"></a>'
		abn += '<a class="st_twitter_hcount"></a>'
		abn += '<a class="st_sharethis_hcount"></a>'
		abn += '<script type="text/javascript">var switchTo5x=false;</script>'
		abn +='<script type="text/javascript" src="https://ws.sharethis.com/button/buttons.js"></script>'
		//abn += '<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>'
		abn += '<script type="text/javascript">stLight.options({publisher: "f6d188a2-236d-4201-838a-2fc255b8f0bf", doNotHash: true, doNotCopy: false, hashAddressBar: false});</script>'
		abn += '</div>'

		abn +='</div>'<!--container-->


		if(data.buyer.deliveryType == "pickup")  {
		abn +='<div class="confirmation_white_panel">'
		abn +='<div class=" container">'
		abn +='<div class="row">'
		abn +='<div class="track_your_order_btn_dv">'
		abn +='<button type="button" class="track_your_order_btn"  onClick="TakewayMap.Main('+id+')" ><?=$lang_resource['GET_DIRECTION_FOR_TAKEWAY']?></button>'
		abn +='</div>'<!--track_your_order_btn_dv-->
		abn +='<div style="display:none;" id="paneltakewaymap">'
        abn +='<div id="takewaymap" class="mediummapbox takewaymap"></div>'
        abn +='</div>'
		abn +='</div>'<!--row-->
		abn +='</div>'<!--container-->
		abn +='</div>'<!--confirmation_white_panel-->
		}




		


		document.getElementById("top").innerHTML=n;
		
		$("#left").html(abn);

		$("#left").removeClass("lfet_whle");
		$("#left").addClass("lfet_whle_final");	
		$("#plc_ordr").removeClass("active-step");
		$("#get_dlvrd").addClass("active-step");				



		if(showConfigureSMSPlugInPopUp == true) {
			swal("Error", showConfigureSMSPlugInPopUpText ,"error");
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





