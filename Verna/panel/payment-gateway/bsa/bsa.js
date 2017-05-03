var bsa = {
	
	
	superadminButton: function (opts)
    {
		
		var opts = $.extend(
		{
			email: 'adaa@gmail.com',
			formName: 'form2455',
			itemName: 'Takeoutfactory.com Orderz',			
			itemId: payu.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var sbtn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="bsa.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        sbtn += '<input type="image" src="../panel/payment-gateway/bsa/bsa.png" border="0" name="submit" alt="bsa" class="order_btn" style="width:160px;  height: 20px;">';


		
		sbtn += '</form>';
       
        return sbtn;
    },
	
	
    createButton: function (opts)
    {
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: 'form2',
			itemName: '',
			itemPrice: Shopping.Cart.total,
			itemId: bsa.createId(),
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

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="bsa.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

		
		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/bsa/bsa.png" border="0" name="submit" alt="btrans" class="btn-red" style="width:100%;">';

		}else{
        btn += '<input type="image" src="panel/payment-gateway/bsa/bsa.png" border="0" name="submit" alt="btrans" class="order_btn" style="width: 250px;margin-left: 8px;  height: 22.3px;">';

			}
		
		btn += '</form>';
       
        return btn;
    },
	 createButtonReserve: function (opts)
    {
	
		var opts = $.extend(
		{
			email: opts.email,
			formName: 'form2',
			itemName: '',
			itemPrice: opts.itemPrice,
			itemId: payu.createId(),
			iTitle: 'Additional comments:'
		},opts);
		
		var currency = "";
		

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="bsa.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
	
        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/bsa/bsa.png" border="0" name="submit" alt="btrans" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/bsa/bsa.png" border="0" name="submit" alt="btrans" class="red_btn_small">';
			}
		
		btn += '</form>';        
		
        bsa.forceCheckTimerStop = null;

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

		var paymentgetway="bsa";
        Shopping.PlaceOrderMacro(id,paymentgetway)
    },


    SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="bsa";
        CreateOrder.PlaceOrderMacro(id,paymentgetway)
		
    },

    createId: function ()
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return (yyyy.toString() + mm.toString() + dd.toString() + '-' + Math.floor(Math.random() * 0x10000).toString(17));
    },

    

    clearCheckPaymentTimer: function ()
    {
        bsa.forceCheckTimerStop = true;
    },

};
