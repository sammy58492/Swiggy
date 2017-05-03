var pexpress = {
	
	superadminButton: function (opts)
    {
		
		var opts = $.extend(
		{
			email: 'a2aa@gmail.com',
			formName: 'form2515',
			itemName: 'Takeoutfactory.com Orderz',			
			itemId: pexpress.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var sbtn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="pexpress.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        sbtn += '<input type="image" src="../panel/payment-gateway/pxpay/payment-express.png" border="0" name="submit" alt="skrill" class="order_btn" style="width:160px;  height: 20px;">';


		
		sbtn += '</form>';
       
        return sbtn;
    },
	
    createButton: function (opts)
    {
		var opts = $.extend(
		{
			email: Shopping.Cart.business[0].paypal,
			formName: 'form2',
			itemName: 'Order',
			itemPrice: Shopping.Cart.total,
			itemId: pexpress.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional comments:'
		},opts);
		
		var currency = "";
		currency = "$";
		/*for(var f in Main.Franchises)
		{
			if(Main.Franchises[f].id == Shopping.Cart.buyer.city)
			{
				currency = "$";
				break;l
			}
		}*/

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="pexpress.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/pxpay/payment-express.png" border="0" name="submit" alt="pexpress" class="btn-red" style="width: 100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/pxpay/payment-express.png" border="0" name="submit" alt="pexpress" class="order_btn" style="width: 200px;margin-left: 20px;  height: 20px;">';
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
			itemName: 'Order',
			itemPrice: opts.itemPrice,
			itemId: pexpress.createId(),
			iTitle: 'Additional comments:'
		},opts);
		
		var currency = "";
		

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="pexpress.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/pxpay/payment-express.png" border="0" name="submit" alt="pexpress" class="btn-red">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/pxpay/payment-express.png" border="0" name="submit" alt="pexpress" class="red_btn_small">';
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
		if(viewDevice == "Desktop") {
        if (Shopping.CanPlaceOrder() == false)
            return false;
		}
		
		if(viewDevice == "Mobile") {
        if (Shopping.CanPlaceOrder() == false)
            return false;
		}
		 

		var paymentgetway="pexpress";
        Shopping.PlaceOrderMacro(id,paymentgetway)
    },
	
	
	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="pexpress";
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
        pexpress.forceCheckTimerStop = true;
    },
	

};
