var merchant  = {
	
	superadminButton: function ()
    {
		
		var opts = $.extend(
		{
			email: 'merchantaa@gmail.com',
			formName: 'MerchantForm',
			itemName: 'Takeoutfactory.com Orderz Merchant',
			itemPrice: CreateOrder.Cart.total,
			itemId: merchant.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd'
		},opts);
		
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="merchant.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
		
        btn += '<input type="image" src="../panel/payment-gateway/worldpay/card-save_button.png" border="0" name="submit" alt="card-save" class="order_btn" style="width:160px;  height: 20px;">';
		
		btn += '</form>';
        //iBtn.append(btn);
       // paypal.forceCheckTimerStop = null;

        return btn;
    },
	
	
    createButton: function ()
    {
		
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: ' <?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: merchant.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="panel/payment-gateway/worldpay/marchent.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="merchant.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/worldpay/card-save_button.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'];?>" class="order_btn">';
		}else if(viewDevice == "Mobile") {
        btn += '<input type="image" src="panel/payment-gateway/worldpay/card-save_button.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'];?>" class="btn-red" style="width:100% !important;">';
		}
		btn += '</form>';
        //iBtn.append(btn);
       // paypal.forceCheckTimerStop = null;

        return btn;
    },

 createButtonReserve: function ()
    {
		
		var opts = $.extend(
		{
			email: '',
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: merchant.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="panel/payment-gateway/worldpay/marchent.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="merchant.tryToPayReserve(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/worldpay/card-save_button.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'];?>" class="order_btn resv-pay-btn" style="padding:2px; margin-left:305px;">';
		}else if(viewDevice == "Mobile") {
        btn += '<input type="image" src="panel/payment-gateway/worldpay/card-save_button.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'];?>" class="btn-red" style="width:100% !important;">';
		}        btn += '</form>';
      

        return btn;
    },
    createButtonMobile: function ()
    {
		
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: merchant.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="panel/payment-gateway/worldpay/marchent.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="merchant.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
        btn += '<input type="image" src="images/step4-checkout/card-save_button.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'];?>" style="margin-top:-8px;" class="order_btn">';
        btn += '</form>';
        //iBtn.append(btn);
       // paypal.forceCheckTimerStop = null;

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
        if (!Shopping.CanPlaceOrder())
            return false;
			
		Shopping.PlaceOrderMarchant(id)
       // paypal.openPopup(formName, id);
        //return false;
    },
	
	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="merchant";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)
    },

	
	
	tryToPayReserve: function (formName, id)
    {
        var I = new Object();
		 if(document.getElementById("buyeraddress").value==""){
		 	swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_ADDRESS_ALERT'] ?>","error");
			document.getElementById("buyeraddress").focus();
			return false;
		}else{
			I.buyeraddress=document.getElementById("buyeraddress").value;
		}
		if(document.getElementById("buyercolony").value==""){
			swal("Error","<?= $lang_resource['PAYMENT_GATEWAY_ALL_ENTER_NEIGHBOURHOOD'] ?>","error");
			document.getElementById("buyercolony").focus();
			return false;
		}else{
			I.buyercolony=document.getElementById("buyercolony").value;
		}
		if(document.getElementById("cityname1").value==""){
			swal("Error","<?= $lang_resource['PAYMENT_GATEWAY_ENTER_STATE_NAME'] ?>","error");
			document.getElementById("cityname1").focus();
			return false;
		}else{
			I.cityname=document.getElementById("cityname1").value;
		}
		
		if(document.getElementById("zip1").value==""){
			swal("Error","<?= $lang_resource[''] ?>","error");
			document.getElementById("zip1").focus();
			return false;
		}else{
			I.zip=document.getElementById("zip1").value;
		}
		
		if(document.getElementById("cardsavecardno").value==""){
			swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO_ALERT'] ?>","error");
			document.getElementById("cardsavecardno").focus();
			return false;
		}else{
			I.cardsavecardno=document.getElementById("cardsavecardno").value;
		}
		
		if(document.getElementById("cardsaveexpmm").value==""){
			swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM_ALERT'] ?>","error");
			document.getElementById("cardsaveexpmm").focus();
			return false;
		}else{
			I.cardsaveexpmm=document.getElementById("cardsaveexpmm").value;
		}
		if(document.getElementById("cardsaveexpyy").value==""){
			swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY_ALERT'] ?>","error");
			document.getElementById("cardsaveexpyy").focus();
			return false;
		}else{
			I.cardsaveexpyy=document.getElementById("cardsaveexpyy").value;
		}
		if(document.getElementById("cardsavecvv").value==""){
			swal("Error","<?= $lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT'] ?>","error");
			document.getElementById("cardsavecvv").focus();
			return false;
		}else{
			I.cardsavecvv=document.getElementById("cardsavecvv").value;
		}
		
		Shopping.Cart.worldpayPaymentInfo = new Array();
		Shopping.Cart.worldpayPaymentInfo.push(I);
		 
       Shopping.ReserveNowBefore(id,"2")
		
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
		$("#paymethod-marco-check").prop("checked", false);
		$("#paymethod-cardsave-check").prop("checked", true);
				
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
			itemId: merchant.createId(),
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

		  var btn = '<form action="panel/payment-gateway/worldpay/marchent.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercadopago.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
        btn += '<input type="image" src="images/step4-checkout/card-save_button.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'];?>" class="order_btn">';
        btn += '</form>';
		//paypal.forceCheckTimerStop = null;

		paypalButtonHtml.html(btn);
		orderContainer.prepend(paypalButtonHtml);
	}

   
};
