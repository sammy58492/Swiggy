var transactium = {
	
	superadminButton: function (opts)
    {
		
		var opts = $.extend(
		{
			email: 'aa2a@gmail.com',
			formName: 'form25',
			itemName: 'Takeoutfactory.com Orderz',			
			itemId: transactium.createId(),
			//shippingPrice: '0.09',
			iTitle: 'Additional commentsd:'
		},opts);
		
        var sbtn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="transactium.SuperadmintryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        sbtn += '<input type="image" src="../panel/payment-gateway/transactium/transactium_pay.png" border="0" name="submit" alt="skrill" class="order_btn" style="width:160px;  height: 20px;">';


		
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
			itemId: transactium.createId(),
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

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="transactium.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/transactium/transactium_pay.png" border="0" name="submit" alt="transactium" class="btn-red" style="width: 100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/transactium/transactium_pay.png" border="0" name="submit" alt="transactium" class="order_btn" style="width: 200px;margin-left: 20px;  height: 20px;">';
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
			itemId: transactium.createId(),
			iTitle: 'Additional comments:'
		},opts);
		
		var currency = "";
		

		
        var btn = '<form action="" method="post" name="' + opts.formName + '" target="paypal-popup" onsubmit="transactium.tryToPay(\'' + opts.formName + '\',\'' + opts.itemId + '\');return false;">';

		

        if(viewDevice == "Mobile"){
        btn += '<input type="image"  src="panel/payment-gateway/transactium/transactium_pay.png" border="0" name="submit" alt="transactium" class="btn-red" style="width: 100%;">';
		}else{
        btn += '<input type="image" src="panel/payment-gateway/transactium/transactium_pay.png" border="0" name="submit" alt="transactium" class="red_btn_small">';
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
		 
		var paymentgetway="transactium";
	
        Shopping.PlaceOrderMacro(id,paymentgetway)
    },
	
	SuperadmintryToPay: function (formName, id)
    {		
        if (!CreateOrder.Canplaceorder())
            return false;

		var paymentgetway="transactium";
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
        transactium.forceCheckTimerStop = true;
    },
	

};
