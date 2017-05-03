
var maksekeskus = {
    createButton: function (opts)
    {
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: 'form2',
			itemName: 'Takeoutfactory.com Order',
			itemPrice: Shopping.Cart.total,
			itemId: mercury.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional comments:'
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

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="maksekeskus.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

		
		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/maksekeskus/maksekeskus-pay.png" border="0" name="submit" alt="maksekeskus" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/maksekeskus/maksekeskus-pay.png" border="0" name="submit" alt="maksekeskus" class="order_btn_checkout" style="margin-left: 5px !important; padding: 6px 58px !important;">';
			}
		
		btn += '</form>';
       
        return btn;
    },
	 createButtonreserve: function (opts)
    {
	
		var opts = $.extend(
		{
			email: opts.email,
			formName: 'form2',
			itemName: 'Takeoutfactory.com Order',
			itemPrice: opts.itemPrice,
			itemId: mercury.createId(),
			iTitle: 'Additional comments:'
		},opts);
		
		var currency = "";
		

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercury.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
	
        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/mercury/mercury.png" border="0" name="submit" alt="mercury" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/mercury/mercury.png" border="0" name="submit" alt="mercury" class="order_btn" style="width: 200px;margin-left: 10px;  height: 20px;">';
			}
		
		btn += '</form>';        
		
        mercury.forceCheckTimerStop = null;

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

		var paymentgetway="maksekeskus";
        Shopping.PlaceOrderMacro(id,paymentgetway)
    },

    openPopup: function (formName, id)
    {
        var w = 960;
        var h = 540;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        mercury.popup = window.open('about:blank', 'paypal-popup', 'width=' + w + ',height=' + h + ',scrollbars=1,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,top=' + top + ',left=' + left);
        document[formName].setAttribute('onsubmit', '');
        document[formName].submit();
		
        document[formName].setAttribute('onsubmit', 'mercury.openPopup(\'' + formName + '\',\'' + id + '\'); return false;');
        mercury.startChecking(formName, id);
    },

    closePopup: function ()
    {
        mercury.popup.close();
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
			
            if (data == '{"payment":"ok"}')
            {
                //payment verified...
                mercury.closePopup();
                Shopping.PlaceOrder(id);
            }
            else
            {
                mercury.checkPaymentTimer = null;
                clearTimeout(mercury.checkPaymentTimer);
                if (!mercury.forceCheckTimerStop)
                    mercury.checkPaymentTimer = setTimeout(function ()
                    {
                        mercury.startChecking(formName, id);
                    }, 1000);
            }
        });
    },

    clearCheckPaymentTimer: function ()
    {
        mercury.forceCheckTimerStop = true;
    },
	
	
	
	addmercuryButton:function()
	{
		
		$("#paymethod-paypal-check").prop("checked", false);
		$("#paymethod-cash-check").prop("checked", false);
		$("#paymethod-card-check").prop("checked", false);
		$("#paymethod-marco-check").prop("checked", false);
		$("#paymethod-mercury-check").prop("checked", true);
				
		var orderContainer = $("td > div.bottom");
		
		var orderNowButton = $("td > div.bottom > div.order");
		orderNowButton.remove();
		
		var paypalButtonHtml = $('<div class="order"  ></div>');
		
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: 'form2',
			itemName: 'Takeoutfactory.com Order',
			itemPrice: Shopping.Cart.total,
			itemId: mercury.createId(),
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

        var btn = '<form action="../panel/mercury/payment-gateway/ProcessTransaction.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="mercury.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		btn += '<input name="TranType" type="hidden" id="TranType" size="50" value="Credit">'
		btn += '<select name="TranCode" style="display:none" id="TranCode"><option>Sale</option><option>Return</option></select>'
		btn += '<input name="RefNo" type="hidden" id="RefNo" size="50" value="12345">'
		btn += '<input name="Memo" type="hidden" id="Memo" size="50" value="Testing WebServices PHP">'
		
		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/mercury/mercury.png" border="0" name="submit" alt="mercury" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/mercury/mercury.png" border="0" name="submit" alt="mercury" class="order_btn" style="width: 200px;margin-left: 10px;  height: 20px;">';
			}
		
		btn += '</form>';
		
		
		paypalButtonHtml.html(btn);
		orderContainer.prepend(paypalButtonHtml);
	}
};
