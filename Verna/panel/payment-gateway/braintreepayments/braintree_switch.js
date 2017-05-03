var braintree  = {
	
	superadminButton: function (){
	
		var opts = $.extend(
		{
			email: 'braintree@gmail.com',
			formName: 'FormBraintree',
			itemName: 'Takeoutfactory.com OrderzBraintree',
			itemPrice: CreateOrder.Cart.total,
			itemId: braintree.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="braintree.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
		
        btn += '<input type="image" src="../panel/payment-gateway/braintreepayments/braintreebutton.png" border="0" name="submit" alt="braintree" class="order_btn" style="width:160px;  height: 20px;">';
		
		btn += '</form>';

        return btn;
    },
	
    createButton: function (){
	
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: braintree.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
        var btn = '<form action="panel/payment-gateway/braintreepayments/braintree_ipncustom.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="braintree.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		if(IS_SCRIPTID == 6 && viewDevice == "Desktop"){
		
		btn += '<button type="button" name="submit" alt="braintree" class="get_off_btn"><?=$lang_resource['PLACE_YOUR_ORDER'];?></button>';	
			
		}else{
		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/braintreepayments/braintreebutton.png" border="0" name="submit" alt="braintree" class="order_btn" >';
		}else if(viewDevice == "Mobile") {
		btn += '<input type="image" src="panel/payment-gateway/braintreepayments/braintreebutton.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_BRAINTREE'];?>" class="btn-red" style="width:100% !important;">';
		}
		}
		btn += '</form>';

        return btn;
    },

	createButtonReserve: function (opts){
		
		var opts = $.extend(
		{
			email: opts.email,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: opts.itemPrice,
			itemId: braintree.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
         var btn = '<form action="panel/payment-gateway/braintreepayments/braintree_ipncustom.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="braintree.tryToPayreserve(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
		
		if(viewDevice == "Desktop") {
          btn += '<input type="image" src="panel/payment-gateway/braintreepayments/braintreebutton.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_BRAINTREE'];?>" class="order_btn resv-pay-btn" border="0" style="margin-left:305px">';
       
		}
		else if(viewDevice == "Mobile") {
			  btn += '<input type="image" src="panel/payment-gateway/braintreepayments/braintreebutton.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_BRAINTREE'];?>" class="btn-red" style="width:100% !important;">';
		}
	
        btn += '</form>';
      
        return btn;
    },
	
    updatePrice: function (price)
    {
        $("form").each(function ()
        {
            document[this.name].amount.value = price;
        });
    },

    tryToPay: function (formName, id)
    {
		var I = new Object();
        if (!Shopping.CanPlaceOrder()){
            return false;
		}
		
		if(!$("input[name='brain_card_paytype']").is(':checked')){
			alert("Please select card type");
			return false;
		}else{
			I.credit_card_paytype=$("input[name='brain_card_paytype']").val();
			
		}
		
		
		
		 if(document.getElementById("braintreecard").value==""){
		 	swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_CREDIT_CARD'] ?>","error");
			document.getElementById("braintreecard").focus();
			return false;
		}else{
			I.credit_card_number=document.getElementById("braintreecard").value;
			
		}
		
		if(document.getElementById("braintreeexpiry").value==""){
			swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] ?>","error");
			document.getElementById("braintreeexpiry").focus();
			return false;
		}else{
			var set1=true;
			ex_dt=document.getElementById("braintreeexpiry").value;
			
			 var n = ex_dt.indexOf("/");
			
			 if(n>0){
				 var res = ex_dt.split("/");
				
				 if(res.length==2){
					 
					 if((!isNaN(res[0])) && (!isNaN(res[1])) && ((res[0]>0)&& (res[0]<13) )&& ((res[1]>0)&& (res[1]<100000) )){
						 I.ex_dt=document.getElementById("braintreeexpiry").value;
					 }else{
						  set1=false;
					 }
				 }else{
					 set1=false;
				 }
			 }else{
				 set1=false;
			 }
			if(set1==false){
				swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] ?>","error");
				document.getElementById("braintreeexpiry").focus();
				return false;		
			}
			
		}
		 if(document.getElementById("braintreecvv").value==""){
		 	swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?>","error");
			document.getElementById("braintreecvv").focus();
			return false;
		}else{
			I.ccv=document.getElementById("braintreecvv").value;
		}
	
	  //New conditions
		 //check if billing sameas delivery
		if(document.getElementById("braintree_firstname").value==""){
			alert("Please enter first name");
			document.getElementById("braintree_firstname").focus();
			return false;
		}else{
			I.braintree_firstname=document.getElementById("braintree_firstname").value;
		}
		
		
		if(document.getElementById("braintree_lastname").value==""){
			alert("Please enter last name");
			document.getElementById("braintree_lastname").focus();
			return false;
		}else{
			I.braintree_lastname=document.getElementById("braintree_lastname").value;
		}
		
		
		
		
		if(document.getElementById("braintree_address1").value==""){
			alert("Please enter Address1");
			document.getElementById("braintree_address1").focus();
			return false;
		}else{
			I.braintree_address1=document.getElementById("braintree_address1").value;
		}
		
		
		if(document.getElementById("braintree_address2").value==""){
			alert("Please enter Address2");
			document.getElementById("braintree_address2").focus();
			return false;
		}else{
			I.braintree_address2=document.getElementById("braintree_address2").value;
		}
		
		
		if(document.getElementById("braintree_city").value==""){
			alert("Please enter City");
			document.getElementById("braintree_city").focus();
			return false;
		}else{
			I.braintree_city=document.getElementById("braintree_city").value;
		}
		
		
		
		if(document.getElementById("braintree_state").value==""){
			alert("Please enter State");
			document.getElementById("braintree_state").focus();
			return false;
		}else{
			I.braintree_state=document.getElementById("braintree_state").value;
		}
		
		
		if(document.getElementById("braintree_zipcode").value==""){
			alert("Please enter Zipcode");
			document.getElementById("braintree_zipcode").focus();
			return false;
		}else{
			I.braintree_zipcode=document.getElementById("braintree_zipcode").value;
		}
			
	
	
	
	
		   Shopping.Cart.braintreePaymentInfo = new Array();
		 Shopping.Cart.braintreePaymentInfo.push(I);
		Shopping.PlaceOrderBrain(id)
       // paypal.openPopup(formName, id);
        //return false;
    },
	
	SuperadmintryToPay: function (formName, id)
    {
		var I = new Object();
        if (!CreateOrder.Canplaceorder()){
            return false;
		}
		
		if(!$("input[name='brain_card_paytype']").is(':checked')){
			alert("Please select card type");
			return false;
		}else{
			I.credit_card_paytype=$("input[name='brain_card_paytype']").val();
			
		}
		
		
		
		 if(document.getElementById("braintreecard").value==""){
		 	swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_CREDIT_CARD'] ?>","error");
			document.getElementById("braintreecard").focus();
			return false;
		}else{
			I.credit_card_number=document.getElementById("braintreecard").value;
			
		}
		
		if(document.getElementById("braintreeexpiry").value==""){
			swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] ?>","error");
			document.getElementById("braintreeexpiry").focus();
			return false;
		}else{
			var set1=true;
			ex_dt=document.getElementById("braintreeexpiry").value;
			
			 var n = ex_dt.indexOf("/");
			
			 if(n>0){
				 var res = ex_dt.split("/");
				
				 if(res.length==2){
					 
					 if((!isNaN(res[0])) && (!isNaN(res[1])) && ((res[0]>0)&& (res[0]<13) )&& ((res[1]>0)&& (res[1]<100000) )){
						 I.ex_dt=document.getElementById("braintreeexpiry").value;
					 }else{
						  set1=false;
					 }
				 }else{
					 set1=false;
				 }
			 }else{
				 set1=false;
			 }
			if(set1==false){
				swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] ?>","error");
				document.getElementById("braintreeexpiry").focus();
				return false;
			}
			
		}
		 if(document.getElementById("braintreecvv").value==""){
		 	swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] ?>","error");
			document.getElementById("braintreecvv").focus();
			return false;
		}else{
			I.ccv=document.getElementById("braintreecvv").value;
		}
	
	  //New conditions
		 //check if billing sameas delivery
		if(document.getElementById("braintree_firstname").value==""){
			alert("Please enter first name");
			document.getElementById("braintree_firstname").focus();
			return false;
		}else{
			I.braintree_firstname=document.getElementById("braintree_firstname").value;
		}
		
		
		if(document.getElementById("braintree_lastname").value==""){
			alert("Please enter last name");
			document.getElementById("braintree_lastname").focus();
			return false;
		}else{
			I.braintree_lastname=document.getElementById("braintree_lastname").value;
		}
		
		
		
		
		if(document.getElementById("braintree_address1").value==""){
			alert("Please enter Address1");
			document.getElementById("braintree_address1").focus();
			return false;
		}else{
			I.braintree_address1=document.getElementById("braintree_address1").value;
		}
		
		
		if(document.getElementById("braintree_address2").value==""){
			alert("Please enter Address2");
			document.getElementById("braintree_address2").focus();
			return false;
		}else{
			I.braintree_address2=document.getElementById("braintree_address2").value;
		}
		
		
		if(document.getElementById("braintree_city").value==""){
			alert("Please enter City");
			document.getElementById("braintree_city").focus();
			return false;
		}else{
			I.braintree_city=document.getElementById("braintree_city").value;
		}
		
		
		
		if(document.getElementById("braintree_state").value==""){
			alert("Please enter State");
			document.getElementById("braintree_state").focus();
			return false;
		}else{
			I.braintree_state=document.getElementById("braintree_state").value;
		}
		
		
		if(document.getElementById("braintree_zipcode").value==""){
			alert("Please enter Zipcode");
			document.getElementById("braintree_zipcode").focus();
			return false;
		}else{
			I.braintree_zipcode=document.getElementById("braintree_zipcode").value;
		}
			
	
	
	
	
		   CreateOrder.Cart.braintreePaymentInfo = new Array();
		 CreateOrder.Cart.braintreePaymentInfo.push(I);
		var paymentgetway="braintree";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)

    },
	
	tryToPayreserve: function (formName, id)
    {
		var I = new Object();
      
		 if(document.getElementById("braintreecard").value==""){
		 	swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_CREDIT_CARD'] ?>","error");
			document.getElementById("braintreecard").focus();
			return false;
		}else{
			I.credit_card_number=document.getElementById("braintreecard").value;
			
		}
		
		if(document.getElementById("braintreeexpiry").value==""){
			swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] ?>","error");
			document.getElementById("braintreeexpiry").focus();
			return false;
		}else{
			var set1=true;
			ex_dt=document.getElementById("braintreeexpiry").value;
			
			 var n = ex_dt.indexOf("/");
			
			 if(n>0){
				 var res = ex_dt.split("/");
				
				 if(res.length==2){
					 
					 if((!isNaN(res[0])) && (!isNaN(res[1])) && ((res[0]>0)&& (res[0]<13) )&& ((res[1]>0)&& (res[1]<100000) )){
						 I.ex_dt=document.getElementById("braintreeexpiry").value;
					 }else{
						  set1=false;
					 }
				 }else{
					 set1=false;
				 }
			 }else{
				 set1=false;
			 }
			if(set1==false){
				swal("Error","<?= $lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] ?>","error");
			document.getElementById("braintreeexpiry").focus();
			return false;
				
			}
			
		}
		 if(document.getElementById("braintreecvv").value==""){
		 	swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT'] ?>","error");
			document.getElementById("braintreecvv").focus();
			return false;
		}else{
			I.ccv=document.getElementById("braintreecvv").value;
		}
	
		   Shopping.Cart.braintreePaymentInfo = new Array();
		 Shopping.Cart.braintreePaymentInfo.push(I);
		Shopping.ReserveNowBefore(id,"0")
    },  

    createId: function ()
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return (yyyy.toString() + mm.toString() + dd.toString() + '-' + Math.floor(Math.random() * 0x10000).toString(16));
    },
	EnableMercadopagoBusiness:function(F)
	{
		
		// Check box to enable/disable
		// clientkey
		$("#main > .contentbox > #tab_general > .rightcol").append('<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 100%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['MERCO_CLIENT_KEY'] ?></span><div style="display: table-cell;vertical-align: middle;">' + Forms.CreateInputProperty("business", "clientkey", F.clientkey ) + "</div></div>");
		// secretkey
		$("#main > .contentbox > #tab_general > .rightcol").append('<div style="display: table;float: left; height: 35px;margin-bottom: 9px; margin-left: 5px;width: 100%;"><span style="display: table-cell;float: left;font-size: 12px;padding-top: 10px;"><?= $lang_resource['MERCO_SECRET_KEY'] ?></span><div style="display: table-cell;vertical-align: middle;">' + Forms.CreateInputProperty("business", "secretkey", F.secretkey) + "</div></div>");
		
		
	},

    addmarcoButton:function()
	{
		
		$("#paymethod-paypal-check").prop("checked", false);
		$("#paymethod-cash-check").prop("checked", false);
		$("#paymethod-card-check").prop("checked", false);
		$("#paymethod-marco-check").prop("checked", true);
				
		var orderContainer = $("td > div.bottom");
		
		var orderNowButton = $("td > div.bottom > div.order");
		orderNowButton.remove();
		
		var paypalButtonHtml = $('<div class="order"  ></div>');
		
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: braintree.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
			
		var currency = "";
		
		for(var f in Main.Franchises)
		{
			if(Main.Franchises[f].id == Shopping.Cart.buyer.city)
			{
				currency = Main.Franchises[f].currency;
				break;
			}
		}

		  var btn = '<form action="panel/payment-gateway/braintreepayments/braintree_ipncustom.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="braintree.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
        btn += '<input type="image" src="images/step4-checkout/braintreebutton.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY'];?>" class="order_btn">';
        btn += '</form>';

		paypalButtonHtml.html(btn);
		orderContainer.prepend(paypalButtonHtml);
	}

   
};