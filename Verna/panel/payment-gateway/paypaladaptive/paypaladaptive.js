
var paypaladaptive = {
	
	
	superadminButton: function (opts)
    {
		var opts = $.extend(
		{
			email: 'aapalpalada@gmail.com',
			formName: 'PdaForm2',
			itemName: 'Takeoutfactory.com Orderz',
			itemPrice: CreateOrder.Cart.total,
			itemId: paypaladaptive.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
		
        var btn = '<form action="../payment-gateway/paypaladaptive/samples/SimpleSamples/ParallelPay.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypaladaptive.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		btn += '<input type="hidden" name="actionType" id="actionType" value="PAY" readonly/>'
		btn += '<input type="hidden" name="currencyCode" value="<?=$lang_resource['PAYMENT_GATEWAY_ALL_USD'];?>" />'
		btn += '<input type="hidden" name="memo" value="" />'
		
        btn += '<input type="image"  src="../panel/payment-gateway/paypaladaptive/paypaladaptive.png" border="0" name="submit" alt="paypaladaptive" class="btn-red" style="width:100%;">';
		
        
		
		btn += '</form>';
        //iBtn.append(btn);
        paypaladaptive.forceCheckTimerStop = null;

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
			itemId: paypaladaptive.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		var currency = "";
		
		for(var f in Main.Franchises)
		{
			if(Main.Franchises[f].id == Shopping.Cart.buyer.city)
			{
				currency = Main.Franchises[f].currency;
				break;l
			}
		}

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypaladaptive.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		btn += '<input type="hidden" name="actionType" id="actionType" value="PAY" readonly/>'
		btn += '<input type="hidden" name="currencyCode" value="<?=$lang_resource['PAYMENT_GATEWAY_ALL_USD'];?>" />'
		btn += '<input type="hidden" name="memo" value="" />'
		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/paypaladaptive/paypaladaptive.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'];?>" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/paypaladaptive/paypaladaptive.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'];?>" class="order_btn" style="padding:2px; margin-left:10px;">';
			}
		
		btn += '</form>';
        //iBtn.append(btn);
        paypaladaptive.forceCheckTimerStop = null;

        return btn;
    },
	 createButtonReserve: function (opts)
    {
		//alert(JSON.stringify(opts));
		var opts = $.extend(
		{
			email: opts.email,
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: opts.itemPrice,
			itemId: paypaladaptive.createId(),
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		var currency = "";
		
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
		
        var btn = '<form action="../panel/payment-gateway/paypaladaptive/samples/SimpleSamples/ParallelPay.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypaladaptive.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		btn += '<input type="hidden" name="actionType" id="actionType" value="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PAY'];?>" readonly/>'
		btn += '<input type="hidden" name="currencyCode" value="<?=$lang_resource['PAYMENT_GATEWAY_ALL_USD'];?>" />'
		btn += '<input type="hidden" name="memo" value="" />'
		

		if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/paypaladaptive/paypaladaptive.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'];?>" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/paypaladaptive/paypaladaptive.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'];?>" class="red_btn_small" >';
			}        btn += '</form>';
        //iBtn.append(btn);
		
        paypaladaptive.forceCheckTimerStop = null;

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
			
			var paymentgetway="paypaladaptive";

        Shopping.PlaceOrderMacro(id,paymentgetway)
    },
	
	
	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="paypaladaptive";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)
    },

    openPopup: function (formName, id)
    {
        var w = 960;
        var h = 540;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        paypaladaptive.popup = window.open('about:blank', 'paypal-popup', 'width=' + w + ',height=' + h + ',scrollbars=1,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,top=' + top + ',left=' + left);
        document[formName].setAttribute('onsubmit', '');
        document[formName].submit();
		
        document[formName].setAttribute('onsubmit', 'paypaladaptive.openPopup(\'' + formName + '\',\'' + id + '\'); return false;');
        paypaladaptive.startChecking(formName, id);
    },

    closePopup: function ()
    {
        paypaladaptive.popup.close();
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
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"CheckPaypalPayment","id":"' + id + '"}]', function (data)
        {
			
            if (data == '{"payment":"<?=$lang_resource['PAYMENT_GATEWAY_ALL_OK'];?>"}')
            {
                //payment verified...
                paypaladaptive.closePopup();
                Shopping.PlaceOrder(id);
            }
            else
            {
                paypaladaptive.checkPaymentTimer = null;
                clearTimeout(paypaladaptive.checkPaymentTimer);
                if (!paypaladaptive.forceCheckTimerStop)
                    paypaladaptive.checkPaymentTimer = setTimeout(function ()
                    {
                        paypaladaptive.startChecking(formName, id);
                    }, 1000);
            }
        });
    },

    clearCheckPaymentTimer: function ()
    {
        paypaladaptive.forceCheckTimerStop = true;
    },
	
	
	
	addPaypalAdaptiveButton:function()
	{
		
		$("#paymethod-paypal-check").prop("checked", false);
		$("#paymethod-cash-check").prop("checked", false);
		$("#paymethod-card-check").prop("checked", false);
		$("#paymethod-marco-check").prop("checked", false);
		$("#paymethod-paypaladaptive-check").prop("checked", true);
				
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
			itemId: paypaladaptive.createId(),
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

		 var btn = '<form action="..panel/payment-gateway/paypaladaptive/samples/SimpleSamples/ParallelPay.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="paypaladaptive.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		btn += '<input type="hidden" name="actionType" id="actionType" value="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PAY'];?>" readonly/>'
		btn += '<input type="hidden" name="currencyCode" value="<?=$lang_resource['PAYMENT_GATEWAY_ALL_USD'];?>" />'
		btn += '<input type="hidden" name="memo" value="" />'
		

        btn += '<input type="image" src="panel/payment-gateway/paypaladaptive/paypaladaptive.png" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'];?>" class="paypal">';
        btn += '</form>';

		paypalButtonHtml.html(btn);
		orderContainer.prepend(paypalButtonHtml);
	}
};
