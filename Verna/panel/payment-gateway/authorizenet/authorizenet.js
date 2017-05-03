var authorizednet = {
	
	superadminButton: function (opts)
    {
		var opts = $.extend(
		{
			email: 'authorize@gmail.com',
			formName: 'AuthorizeForm',
			itemName: 'Takeoutfactory.com OrderzAuthorize',
			itemPrice: CreateOrder.Cart.total,
			itemId: authorizednet.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var btn = '<form action="panel/payment-gateway/authorizenet/authorizenet.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="authorizednet.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		
        btn += '<input type="image" src="../panel/payment-gateway/authorizenet/Authorize_net_1.png" border="0" name="submit" alt="authorizednet" class="order_btn" style="width:160px;  height: 20px;">';
		
		btn += '</form>';
		
        //iBtn.append(btn);
        authorizednet.forceCheckTimerStop = null;

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
			itemId: authorizednet.createId(),
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

		
        var btn = '<form action="panel/payment-gateway/authorizenet/authorizenet.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="authorizednet.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/authorizenet/Authorize_net_1.png" border="0" name="submit" alt="authorizednet" class="order_btn" style="padding:2px; margin-left:10px;">';
		}else if(viewDevice == "Mobile") {
        btn += '<input type="image" src="panel/payment-gateway/authorizenet/Authorize_net_1.png" border="0" name="submit" alt="authorizednet" class="btn-red" style="width:100% !important;">';
		}
		btn += '</form>';
		
        //iBtn.append(btn);
        authorizednet.forceCheckTimerStop = null;

        return btn;
    },
	 createButtonReserve: function (opts)
    {
		var opts = $.extend(
		{
			email: '',
			formName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'];?>',
			itemName: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'];?>',
			itemPrice: Shopping.Cart.total,
			itemId: authorizednet.createId(),
			//shippingPrice: '0.09',
			iTitle: '<?=$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'];?>'
		},opts);
		
		var currency = "";
		

        //var iBtn = document.createElement('div');
        //iBtn = $(iBtn);
		
        var btn = '<form action="panel/payment-gateway/authorizenet/authorizenet.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="authorizednet.tryToPayReserve(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

		if(viewDevice == "Desktop") {
        btn += '<input type="image" src="panel/payment-gateway/authorizenet/Authorize_net_1.png" border="0" name="submit" alt="authorizednet" class="red_btn_small" >';
		}else if(viewDevice == "Mobile") {
        btn += '<input type="image" src="panel/payment-gateway/authorizenet/Authorize_net_1.png" border="0" name="submit" alt="authorizednet" class="btn-red" >';
		}        btn += '</form>';
        //iBtn.append(btn);
        authorizednet.forceCheckTimerStop = null;

        return btn;
    },

    updatePrice: function (price)
    {
        $("form").each(function ()
        {
            document[this.name].amount.value = price;
        });
    },
	
	
	
	 tryToPayReserve: function (formName, id)
    {
		var I = new Object();
		 if(document.getElementById("cardno").value==""){
		 	swal("Error","<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_ENTER_CCV'] ?>","error");
			document.getElementById("cardno").focus();
			return false;
		}else{
			I.cardno=document.getElementById("cardno").value;
		}
		 if(document.getElementById("expmm").value==""){
		 	swal("Error","<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM_ALERT'] ?>","error");
			document.getElementById("expmm").focus();
			return false;
		}else{
			I.expmm=document.getElementById("expmm").value;
		}
		if(document.getElementById("expyy").value==""){
			swal("Error","<?= $lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY_ALERT'] ?>","error");
			document.getElementById("expyy").focus();
			return false;
		}else{
			I.expyy=document.getElementById("expyy").value;
		}
		
		Shopping.Cart.authorizePaymentInfo = new Array();
		Shopping.Cart.authorizePaymentInfo.push(I);
		 
       Shopping.ReserveNowBefore(id,"1")
    },

    tryToPay: function (formName, id)
    {
        if (!Shopping.CanPlaceOrder())
            return false;
			
		

        Shopping.PlaceOrderAuthorised(id)
    },
	
	
	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="authorizednet";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)
    },
	

    openPopup: function (formName, id)
    {
        var w = 960;
        var h = 540;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        authorizednet.popup = window.open('about:blank', 'paypal-popup', 'width=' + w + ',height=' + h + ',scrollbars=1,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,top=' + top + ',left=' + left);
        document[formName].setAttribute('onsubmit', '');
        document[formName].submit();
		
        document[formName].setAttribute('onsubmit', 'authorizednet.openPopup(\'' + formName + '\',\'' + id + '\'); return false;');
        authorizednet.startChecking(formName, id);
    },

    closePopup: function ()
    {
        authorizednet.popup.close();
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
                authorizednet.closePopup();
                Shopping.PlaceOrder(id);
            }
            else
            {
                authorizednet.checkPaymentTimer = null;
                clearTimeout(authorizednet.checkPaymentTimer);
                if (!authorizednet.forceCheckTimerStop)
                    authorizednet.checkPaymentTimer = setTimeout(function ()
                    {
                        authorizednet.startChecking(formName, id);
                    }, 1000);
            }
        });
    },

    clearCheckPaymentTimer: function ()
    {
        authorizednet.forceCheckTimerStop = true;
    },
	
	
	
	addauthorizednetButton:function()
	{
		
		$("#paymethod-paypal-check").prop("checked", false);
		$("#paymethod-cash-check").prop("checked", false);
		$("#paymethod-card-check").prop("checked", false);
		$("#paymethod-marco-check").prop("checked", false);
		$("#paymethod-paypaladaptive-check").prop("checked", false);
		$("#paymethod-authorizednet-check").prop("checked", true);
				
		var orderContainer = $("td > div.bottom");
		
		var orderNowButton = $("td > div.bottom > div.order");
		orderNowButton.remove();
		
		var paypalButtonHtml = $('<div class="order"  ></div>');
		
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: 'paypalform',
			itemName: "<?=$records['sitename']?> Order",
			itemPrice: Shopping.Cart.total,
			itemId: authorizednet.createId(),
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

		var btn = '<form action="../panel/payment-gateway/authorizenet/authorizenet.php" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="authorizednet.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        btn += '<input type="image" src="images/step4-checkout/Authorize_net_1.png" style="margin-left: -5px !important;" border="0" name="submit" alt="<?=$lang_resource['PAYMENT_AUTHORIZE_ON_DELIVERY'];?>" class="order_btn">';
        btn += '</form>';

		paypalButtonHtml.html(btn);
		orderContainer.prepend(paypalButtonHtml);
	}
};
