var paypal = {
	
	
	superadminButton: function (opts)
    {
		
		var opts = $.extend(
		{
			email: 'apaypal@gmail.com',
			formName: 'PForm5',
			itemName: 'Takeoutfactory.com',
			itemPrice: CreateOrder.Cart.total,
			itemId: paypal.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd'
		},opts);
		
		var currency = "";
		
		for(var f in Main.Franchises)
		{
			if(Main.Franchises[f].id == CreateOrder.Cart.buyer.city)
			{
				currency = Main.Franchises[f].currency;
				break;
			}
		}
	
        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypal.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
       	btn += '<input type="hidden" name="return" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>';
		btn += '<input type="hidden" name="notify_url" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>';
        btn += '<input type="hidden" name="cmd" value="_xclick">';
        btn += '<input type="hidden" name="business" value="' + opts.email + '">';
        btn += '<input type="hidden" name="lc" value="' + currency + '">';
        btn += '<input type="hidden" name="item_name" value="' + opts.itemName + '">';
        btn += '<input type="hidden" name="item_number" value="' + opts.itemId + '">';
        btn += '<input type="hidden" name="amount" value="' + opts.itemPrice + '">';
        btn += '<input type="hidden" name="currency_code" value="' + currency + '">';
        btn += '<input type="hidden" name="button_subtype" value="services">';
        btn += '<input type="hidden" name="no_note" value="0">';
        btn += '<input type="hidden" name="cn" value="' + opts.iTitle + '">';
        btn += '<input type="hidden" name="no_shipping" value="1">';
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
		
		
        btn += '<input type="image" src="../panel/payment-gateway/paypal/paypal.png" border="0" name="submit" alt="paypal" class="order_btn" style="width:160px;  height: 20px;">';
		
		
        btn += '</form>';
        //iBtn.append(btn);
        paypal.forceCheckTimerStop = null;

        return btn;
    },
	
	
	
	
    createButton: function (opts)
    {
		
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: paypal.createId(),
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
	
        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
        var btn = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypal.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
       	btn += '<input type="hidden" name="return" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>';
		btn += '<input type="hidden" name="notify_url" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>';
        btn += '<input type="hidden" name="cmd" value="_xclick">';
        btn += '<input type="hidden" name="business" value="' + opts.email + '">';
        btn += '<input type="hidden" name="lc" value="' + currency + '">';
        btn += '<input type="hidden" name="item_name" value="' + opts.itemName + '">';
        btn += '<input type="hidden" name="item_number" value="' + opts.itemId + '">';
        btn += '<input type="hidden" name="amount" value="' + opts.itemPrice + '">';
        btn += '<input type="hidden" name="currency_code" value="' + currency + '">';
        btn += '<input type="hidden" name="button_subtype" value="services">';
        btn += '<input type="hidden" name="no_note" value="0">';
        btn += '<input type="hidden" name="cn" value="' + opts.iTitle + '">';
        btn += '<input type="hidden" name="no_shipping" value="1">';
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
		
		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/paypal/paypal.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PAYPAL'];?>" class="order_btn" style="padding:2px; margin-left:10px;">';
		}
		else if(viewDevice == "Mobile") {
			  btn += '<input type="image" src="panel/payment-gateway/paypal/paypal.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PAYPAL'];?>" class="btn-red" style="width:100% !important;">';
		}
        btn += '</form>';
        //iBtn.append(btn);
        paypal.forceCheckTimerStop = null;

        return btn;
    },
	  createButtonReserve: function (opts)
    {
		//alert(JSON.stringify(opts))
		//opts = JSON.parse(opts);
		
		var opts = $.extend(
		{
			email: opts.email,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: opts.itemPrice,
			itemId: paypal.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		var currency = "";
		currency = Main.Franchises[0].currency;
		if(!currency)
		{
			currency= 'USD';
		}
		
        var btn = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypal.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
       	btn += '<input type="hidden" name="return" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>';
		btn += '<input type="hidden" name="notify_url" value="http://<?=$_SERVER["HTTP_HOST"]?>/panel/payment-gateway/paypal/paypal_ipncustom.php"/>';
        btn += '<input type="hidden" name="cmd" value="_xclick">';
        btn += '<input type="hidden" name="business" value="' + opts.email + '">';
        btn += '<input type="hidden" name="lc" value="' + currency + '">';
        btn += '<input type="hidden" name="item_name" value="' + opts.itemName + '">';
        btn += '<input type="hidden" name="item_number" value="' + opts.itemId + '">';
        btn += '<input type="hidden" name="amount" value="' + opts.itemPrice + '">';
        btn += '<input type="hidden" name="currency_code" value="' + currency + '">';
        btn += '<input type="hidden" name="button_subtype" value="services">';
        btn += '<input type="hidden" name="no_note" value="0">';
        btn += '<input type="hidden" name="cn" value="' + opts.iTitle + '">';
        btn += '<input type="hidden" name="no_shipping" value="1">';
        //btn += '<input type="hidden" name="shipping" value="'+opts.shippingPrice+'">';
        btn += '<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">';
		
		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/paypal/paypal.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PAYPAL'];?>" class="red_btn_small">';
		}
		else if(viewDevice == "Mobile") {
			  btn += '<input type="image" src="panel/payment-gateway/paypal/paypal.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PAYPAL'];?>" class="btn-red">';
		}
        btn += '</form>';
        //iBtn.append(btn);
        paypal.forceCheckTimerStop = null;

        return btn;
    },
    updatePrice: function (price)
    {
		
		
        $("form").each(function ()
        {
            //document[this.name].amount.value = price;
        });
    },

    tryToPay: function (formName, id)
    {
		
      if (!Shopping.CanPlaceOrder())
            return false;
      
      Shopping.PlaceOrderpaypal(id)

       
    },
	
	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="paypal";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)
    },

    openPopup: function (formName, id)
    {
		
        var w = 960;
        var h = 540;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        paypal.popup = window.open('about:blank', 'paypal-popup', 'width=' + w + ',height=' + h + ',scrollbars=1,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,top=' + top + ',left=' + left);
        document[formName].setAttribute('onsubmit', '');
        document[formName].submit();
	
        document[formName].setAttribute('onsubmit', 'paypal.openPopup(\'' + formName + '\',\'' + id + '\'); return false;');
        paypal.startChecking(formName, id);
    },

    closePopup: function ()
    {
        paypal.popup.close();
    },

    createId: function ()
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return (yyyy.toString() + mm.toString() + dd.toString() + '-' + Math.floor(Math.random() * 0x10000).toString(16));
    },

    startChecking: function (formName, id)
    {
      
		$.post("../../panel/lib/front-bulk.php", 'data=[{"operation":"CheckPaypalPayment","id":"' + id + '"}]', function (data)
        {
		
            if (data == '{"payment":"<?=$lang_resource['PAYMENT_GATEWAY_ALL_OK'];?>"}')
            {
                //payment verified...
                paypal.closePopup();
                Shopping.PlaceOrder(id);
            }
            else
            {
                paypal.checkPaymentTimer = null;
                clearTimeout(paypal.checkPaymentTimer);
                if (!paypal.forceCheckTimerStop)
                    paypal.checkPaymentTimer = setTimeout(function ()
                    {
                        paypal.startChecking(formName, id);
                    }, 1000);
            }
        });
    },

    clearCheckPaymentTimer: function ()
    {
        paypal.forceCheckTimerStop = true;
    }
};
