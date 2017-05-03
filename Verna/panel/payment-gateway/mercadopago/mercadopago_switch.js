var mercadopago  = {

	
		superadminButton: function (opts)
    	{
		
		var opts = $.extend(
		{
			email: 'aamra@gmail.com',
			formName: 'formr25',
			itemName: 'Takeoutfactory.com Orderz',			
			itemId: mercadopago.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var sbtn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercadopago.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        sbtn += '<input type="image" src="../panel/payment-gateway/mercadopago/mercadopago_group.png" border="0" name="submit" alt="skrill" class="order_btn" style="width:160px;  height: 20px;">';


		
		sbtn += '</form>';
       
        return sbtn;
    },
	
    createButton: function ()
    {

		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: mercadopago.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);



        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="panel/payment-gateway/mercadopago/mercadopago_ipncustom.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercadopago.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';

		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/mercadopago/mercadopago_group.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_MERCADOPAGO'];?>" class="order_btn">';
		}
		else if(viewDevice == "Mobile") {
			  btn += '<input type="image" src="panel/payment-gateway/mercadopago/mercadopago_group.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_MERCADOPAGO'];?>" class="btn-red" style="width:100% !important;">';
		}





       // btn += '<input type="image" src="panel/theme/mercadopago_group.png" border="0" name="submit" alt="PayPal" class="order_btn">';
        btn += '</form>';
        //iBtn.append(btn);
       // paypal.forceCheckTimerStop = null;

        return btn;
    },
	 createButtonReserve: function (opts)
    {

		var opts = $.extend(
		{
			email: opts.email,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: opts.itemPrice,
			itemId: mercadopago.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);



        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="panel/payment-gateway/mercadopago/mercadopago_ipncustom.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercadopago.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';

		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/mercadopago/mercadopago_group.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_MERCADOPAGO'];?>" class="order_btn resv-pay-btn">';
		}
		else if(viewDevice == "Mobile") {
			  btn += '<input type="image" src="panel/payment-gateway/mercadopago/mercadopago_group.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_MERCADOPAGO'];?>" class="btn-red">';
		}





       // btn += '<input type="image" src="panel/theme/mercadopago_group.png" border="0" name="submit" alt="PayPal" class="order_btn">';
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
         var paymentgetway = 'mercadopago'
		Shopping.PlaceOrderMacro(id,paymentgetway)
		Shopping.PlaceOrderMacro(id,paymentgetway)
       // paypal.openPopup(formName, id);
        //return false;
    },

	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="mercadopago";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)
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
			formName: 'paypalform',
			itemName: 'Order',
			itemPrice: Shopping.Cart.total,
			itemId: mercadopago.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Aditional comments:'
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

		  var btn = '<form action="panel/payment-gateway/mercadopago/mercadopago_ipncustom.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercadopago.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
        btn += '<input type="image" src="panel/payment-gateway/mercadopago/mercadopago_group.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_MERCADOPAGO'];?>" class="paypal">';
        btn += '</form>';
		//paypal.forceCheckTimerStop = null;

		paypalButtonHtml.html(btn);
		orderContainer.prepend(paypalButtonHtml);
	}


};
