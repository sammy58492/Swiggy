var skrill = {
	
	superadminButton: function (opts)
    {
		
		var opts = $.extend(
		{
			email: 'aaa@gmail.com',
			formName: 'form255',
			itemName: 'Takeoutfactory.com Orderz',			
			itemId: skrill.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var sbtn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="skrill.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        sbtn += '<input type="image" src="../panel/payment-gateway/skrill/skrill-button-icon.png" border="0" name="submit" alt="skrill" class="order_btn" style="width:160px;  height: 20px;">';


		
		sbtn += '</form>';
       
        return sbtn;
    },
	
	
    createButton: function (opts)
    {
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: 'form2',
			itemName: 'Takeoutfactory.com Order',
			itemPrice: Shopping.Cart.total,
			itemId: skrill.createId(),
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

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="skrill.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

		
		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/skrill/skrill-button-icon.png" border="0" name="submit" alt="skrill" class="btn-red" style="width:100%;">';

		}else{
        btn += '<input type="image" src="panel/payment-gateway/skrill/skrill-button-icon.png" border="0" name="submit" alt="skrill" class="order_btn">';

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
			itemName: 'Takeoutfactory.com Order',
			itemPrice: opts.itemPrice,
			itemId: skrill.createId(),
			iTitle: 'Additional comments:'
		},opts);
		
		var currency = "";
		

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="skrill.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';
	
        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/skrill/skrill-button-icon.png" border="0" name="submit" alt="skrill" class="btn-red" style="width:100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/skrill/skrill-button-icon.png" border="0" name="submit" alt="skrill" class="order_btn" style="width: 200px;margin-left: 10px;  height: 20px;">';
			}
		
		btn += '</form>';        
		
        skrill.forceCheckTimerStop = null;

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

		var paymentgetway="skrill";
        Shopping.PlaceOrderMacro(id,paymentgetway)
    },

	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="skrill";
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

    

    clearCheckPaymentTimer: function ()
    {
        skrill.forceCheckTimerStop = true;
    },

};
