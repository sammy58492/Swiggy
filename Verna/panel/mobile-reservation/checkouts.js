var Checkout = {
    OpenCart: function (e)
    {
		if(document.getElementById("headerSearch")){
				$("#headerSearch").show();
			}
		
        if (Shopping.Cart.business.length == 0)
        {
	    alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
            return
        }
		
		/*e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);
        var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)*/
		
		
		 var custom_link =  "Checkout-"+Shopping.ActiveBusinessName.split(" ").join("");
		 window.history.pushState( {"id":102} , "Checkout", custom_link );
		
		
		var week =0;
	
        this.SavingOrder = false;
        var b = "";
		var bd = "";
		
		
		bd +='<div class="main">';
    	bd +='<div class="header-grey">';
        bd +='<div class="header_top">';
        bd +='<div class="wrapp">';
        bd +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="Shopping.OpenBusiness('+currentshop+')">< <?=$lang_resource['MOBILE_CHECKOUT_BUSINESS']?></button></div>';
        bd +='<div class="center_heading">&nbsp;</div>';
        bd +='<div class="left_btn_dv pull_right"><button type="button" class="red-link-btn" onclick="Main.InitInterface()"><?=$lang_resource['MOBILE_CHECKOUT_CANCEL']?></button></div>';
              
        bd +='</div>';
		bd +='</div>'
		bd +='<div class="wrapp" style="cursor:pointer" onclick="Checkout.OrderDetails()">';
        bd +='<center><span class="ch_heading" ><?=$lang_resource['MOBILE_CHECKOUT_ORDER_DETAILS']?></span></center>';
        bd +='</div>';
        bd +='</div>';
		bd +='<div class="blank-top"></div>'
        bd +='</div>';
   
   document.getElementById("headerSearch").innerHTML = bd;
     
		
		 b +='<div id="openOrderdetails" style="display:none">';
		 
		
				 if(Main.WhereAmIData.reservestatus == "delivery")  {
					
					var textstring = "<?= $lang_resource['MOBILE_CHECKOUT_DELIVERY_DETAILS'] ?>"
					
					}
				else if(Main.WhereAmIData.reservestatus == "pickup")  {
					
					var textstring = "<?= $lang_resource['MOBILE_CHECKOUT_PICKUP_DETAILS'] ?>"
					
					}else if(Main.WhereAmIData.reservestatus == "reservation"){
						var textstring = "<?=$lang_resource['MOBILE_CHECKOUT_RESERVATION_DETAILS']?>"
					}
					
					
    	 b +='</div>';
		 b += '<div class="main bg-white">';      
     	 b += '<h3 class="ch_heading_red">'+textstring+'</h3>';
   		 b += '</div>';
         b += '<div class="main wrapp">';
 		
 		if(Main.checkoutinfo['Name'].status == 't'){
          b += '<div class="field">';
          b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_NAME']?> :</span>';
          b += '<input type="text"  placeholder="<?=$lang_resource['MOBILE_CHECKOUT_NAME']?>" class="field-text" id="buyername" value="' + Main.NullToEmpty(Shopping.Cart.buyer.name) + '" onkeyup="Shopping.UserUpdate(this,\'name\');Checkout.BrainFieldUpdate(this,\'name\');";" />';
          b += '</div>';
      }
		  
		if(Main.checkoutinfo['Last Name'].status == 't'){  
		   b += '<div class="field">';
          b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_LASTNAME']?> :</span>';
          b += '<input type="text"  placeholder="<?=$lang_resource['MOBILE_CHECKOUT_LASTNAME']?>" class="field-text" id="buyerlastname2" value="' + Main.NullToEmpty(Shopping.Cart.buyer.lastname2) + '"  onkeyup="Shopping.UserUpdate(this,\'lastname2\');Checkout.BrainFieldUpdate(this,\'lastname2\');;"/>';
          b += '</div>';
      }
          if(Main.checkoutinfo['Email'].status == 't'){		  
          b += '<div class="field">';
          b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT__EMAIL']?> :</span>';
          b += '<input type="text" id="buyeremail" placeholder="<?=$lang_resource['MOBILE_CHECKOUT__EMAIL']?>" class="field-text"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.email) + '" onkeyup="Shopping.UserUpdate(this,\'email\')" onkeydown="return Checkout.Validation1(event,this.id);"/>';
		  b += '</div>';
		}
			if(Main.checkoutinfo['Full Address'].status == 't'){	
		b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_FULL_ADDRESS']?> :</span>';
		b += '<input type="text" id="buyeraddress" placeholder="<?=$lang_resource['MOBILE_CHECKOUT_FULL_ADDRESS']?>" class="field-text"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.address) + '"  onkeyup="Shopping.UserUpdate(this,\'address\');Checkout.BrainFieldUpdate(this,\'address\');"/>';
		b += '</div>';
	}
	if(Main.checkoutinfo['APT/Suit'].status == 't'){		
		b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['CHECKOUT_API']?> :</span>';
		b += '<input type="text" id="buyerapi" placeholder="<?=$lang_resource['CHECKOUT_API']?>" class="field-text"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.api) + '" onkeyup="Shopping.UserUpdate(this,\'api\')" />';
		b += '</div>';
		}
		if(Main.checkoutinfo['Zipcode'].status == 't'){	
		b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['CHECKOUT_ZIP']?> :</span>';
		b += '<input type="text" id="buyerzipcode" placeholder="<?=$lang_resource['CHECKOUT_ZIP']?>" class="field-text"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.cp) + '" onkeypress="return Checkout.Validation(event,this.value);" onkeyup="Shopping.UserUpdate(this,\'zipcode\');Checkout.BrainFieldUpdate(this,\'zipcode\');" />';
		b += '</div>';
		}
		/*b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['CHECKOUT_CITY']?> :</span>';
		b += '<input type="text" id="buyercity" placeholder="<?=$lang_resource['CHECKOUT_CITY']?>" class="field-text"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.cityname) + '" onkeyup="Shopping.UserUpdate(this,\'city\');Checkout.BrainFieldUpdate(this,\'city\');"/>';
		b += '</div>';*/
		
		if(Main.checkoutinfo['City'].status == 't'){	
		b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['CHECKOUT_CITY']?> :</span>';
		  b += '<select id="buyercity" class="field-text" onchange="Shopping.UserUpdate(this,\'city\')">';
				   b += '<option value=""></option>';
				   if(Main.Franchises.length!=0)
				   {
					   var ck = ""
				   for(var x in Main.Franchises)
				   {
					   if(Main.Franchises[x].id == Main.WhereAmIData.city)
					   {
						   ck = "SELECTED"
					   }
				   b += '<option value="'+Main.Franchises[x].id+'" '+ck+'>'+Main.Franchises[x].city+'</option>'
				   
				 ck = ""  
				   
				   }
				   
				   }
				
				   b += '</select>';
		b += '</div>';
		}
		/*b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD']?> :</span>';
		b += '<input type="text" id="buyercolony" class="field-text" placeholder="<?=$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD']?>" value="' + Main.NullToEmpty(Shopping.Cart.buyer.colony) + '" onkeyup="Shopping.UserUpdate(this,\'colony\')"/>';
		b += '</div>';*/
		if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
			if(Main.neighsettings == 't'){
			Shopping.Cart.buyer.colony = Shopping.Cart.buyer.address
				b += '<div class="field">';
				b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD']?> :</span>';
				b += '<select id="buyercolony" class="field-text" onchange="Shopping.UserUpdate(this,\'colony\')">';
				b += '<option value=""></option>';
				b += '</select>';
				b += '</div>';
			}else{
				b += '<div class="field">';
				b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD']?> :</span>';
				b += '<input type="text" id="buyercolony" class="field-text" placeholder="<?=$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD']?>" value="' + Main.NullToEmpty(Shopping.Cart.buyer.colony) + '"  onkeyup="Shopping.UserUpdate(this,\'colony\')" />';
				b += '</div>';
			}
		}
if(Main.checkoutinfo['Where did you find about us'].status == 't'){		
		b += '<div class="field">';
		b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_WHERE_DID_YOU_FIND_US']?> :</span>';
		b += '<select id="buyerreference" class="field-text" onchange="Shopping.UserUpdate(this,\'reference\')">';
		b += '<option value=""></option>';
        if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "Facebook")
        {
            b += '<option value="<?=$lang_resource['MOBILE_CHECKOUT_RADIO']?>" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_RADIO']?></option>'
        }
        else
        {
            b += '<option value="<?=$lang_resource['MOBILE_CHECKOUT_RADIO']?>"><?=$lang_resource['MOBILE_CHECKOUT_RADIO']?></option>'
        }
        if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "Flyer")
        {
            b += '<option value="<?=$lang_resource['MOBILE_CHECKOUT_FLYER']?>" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_FLYER']?></option>'
        }
        else
        {
            b += '<option value="<?=$lang_resource['MOBILE_CHECKOUT_FLYER']?>"><?=$lang_resource['MOBILE_CHECKOUT_FLYER']?></option>'
        }
        if (Main.NullToEmpty(Shopping.Cart.buyer.reference) == "Google")
        {
            b += '<option value="<?=$lang_resource['MOBILE_CHECKOUT_GOOGLE']?>" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_GOOGLE']?></option>'
        }
        else
        {
            b += '<option value="<?=$lang_resource['MOBILE_CHECKOUT_GOOGLE']?>"><?=$lang_resource['MOBILE_CHECKOUT_GOOGLE']?></option>'
        }
        b += "</select>";
            b += '</div>';
        }
        if(Main.checkoutinfo['Phone'].status == 't'){
            
          b += '<div class="field">';
            	b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_PHONE']?> :</span>';
				b += '<input type="text" id="buyertel" class="field-text" placeholder="<?=$lang_resource['MOBILE_CHECKOUT_PHONE_NUMBER']?>"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.tel) + '" onkeyup="Shopping.UserUpdate(this,\'cel\')"/>';
                b += '</div>';  
		}
			if(Main.checkoutinfo['Receive SMS'].status == 't'){
			    b += '<div class="field">';
            	b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_RECEIVE_SMS']?> :</span>';
				Shopping.Cart.twilioenabledclient=true;
				b += '<select class="field-text" onchange="Shopping.UpdateTwilio(this)">';
                                	b += '<option value="true"><?=$lang_resource['MOBILE_CHECKOUT_YES']?></option>';
                                    b += '<option value="false"><?=$lang_resource['MOBILE_CHECKOUT_NO']?></option>';
                                    b += '<option></option>';
                b += '</select>';
                b += '</div>';
            }else{
						Shopping.Cart.twilioenabledclient=false;
					}

			if(Main.checkoutinfo['Tip For The Driver'].status == 't'){		
			 if(Main.deliveryType!='pickup'){
			    b += '<div class="field">';
            	b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_TIP_FOR_THE_DRIVER']?> :</span>';
					
				b += '<input type="text" id="buyertips" class="field-text" placeholder="<?=$lang_resource['MOBILE_CHECKOUT_TIP_FOR_THE_DRIVER']?>"  value="' + Main.NullToEmpty(Shopping.Cart.buyer.tips) + '" onkeyup="Shopping.UserUpdate(this,\'tips\')" onkeypress="return Shopping.IsNumberKey(event);"/>';
            b += '</div>';
			 }
			}
			 if(Main.checkoutinfo['Discount Coupon'].status == 't'){
			if(Shopping.Cart.discounttype != 1 && !Shopping.Cart.discountactive) {
			 b += '<div class="field">';
            	b += '<span class="label"><?=$lang_resource['MOBILE_CHECKOUT_DISCOUNT_COUPON']?> :</span>';
				b += '<span id="fieldid"><input type="text" id="discountcoupon" class="field-text" placeholder="<?=$lang_resource['MOBILE_CHECKOUT_APPLY_COUPON']?>"  value="' + Main.NullToEmpty(Shopping.Cart.discountcode) + '" onkeyup="Shopping.UserUpdate(this,\'coupon\')" onkeydown="return Checkout.Validation1(event,this.id);"/></span>';
            b += '</div>';  
			 b += '<input type="hidden" id="discountattck" value="0">'  
       
			 b += '<div class="field">';
            	b += '<span class="" id="discountimg">'
				if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
					b += '<img src="images/dis_pics/right.png" >';
				}
				b +='</span>';
				b += '<span id="discounttext">'
				if(Main.NullToEmpty(Shopping.Cart.discountcode)!=""){
					b += '<?=$lang_resource['MOBILE_CHECKOUT_COUPON_APPLIED']?>';
				}
				b +='</span>';
            b += '</div>';    

			}
		}
				if(Main.deliveryAccept == 1) 
				{
					var textstring = "<?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY']?>"
				}
				else if(Main.deliveryAccept == 2) 
				{	
					var textstring = "<?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP']?>"
				}
				else if(Main.deliveryType == "delivery")  {
					
					var textstring = "<?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY']?>"
					
					}
				else if(Main.deliveryType == "pickup")  {
					
					var textstring = "<?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP']?>"
					
					}		
					 
					  Shopping.Cart.buyer.deliveryType = textstring;
				      
					
					 var deliveryschedule = JSON.parse(Shopping.DeliveryDateschedule[0].workdays)
					 var deliveryscheduleVal = JSON.parse(Shopping.DeliveryDateschedule[0].workvaluedays)
					 
				    var deliveryTimelist = JSON.parse(Shopping.DeliveryDateschedule[0].timelist) ;
					var deliveryTimelistShow = JSON.parse(Shopping.DeliveryDateschedule[0].timelistshow) ;
					var deliveryTimelistInMMShow = Shopping.DeliveryDateschedule[0].mmtime;
					
	 if(Shopping.Cart.preorder) {
		
		              
			var pretime = new Date(Shopping.Cart.preorderDate);
			
			Shopping.Cart.buyer.deliveryhours =  Shopping.Cart.preordertimehh;
			Shopping.Cart.buyer.deliveryminute = Shopping.Cart.preordertimemm;
			//Shopping.Cart.buyer.deliverydate = pretime.getFullYear() + '-' + Main.zeroPad((pretime.getMonth()+1),2) + '-' + Main.zeroPad(pretime.getDate(),2);	
			
		
					 
	}else{
		Shopping.Cart.buyer.deliverydate = "ASAP";
	}
	
	if(Main.checkoutinfo['Takeout Date'].status != 't'){
		var txthide = 'style="display:none;"';
	}
		b += '<div class="field" '+txthide+'>';
		b += '<span class="label">'+textstring+' <?=$lang_resource['MOBILE_CHECKOUT_DATE']?> :</span>';

		b += '<select class="field-text" id="chkout_hour" onchange="Main.Hourcheck(this)">';
		b += '<option value="ASAP" SELECTED><?=$lang_resource['MOBILE_CHECKOUT_ASAP']?></option>';
		/*for(var dl =0;dl<dayschedule.length;dl++) {

		if(Shopping.Cart.buyer.deliverydate == dayschedulev[dl] ) {
		b += '<option value="'+dayschedulev[dl]+'" selected>'+dayschedule[dl]+'</option>';	
		}
		else {
		b += '<option value="'+dayschedulev[dl]+'" >'+dayschedule[dl]+'</option>';			
		}

		}*/
		b += '</select>';


		b += '</div>'; 


		b += '<div id="pickup_time" '+txthide+'>';
		b += '<div class="field" >';
		b += '<span class="label">'+textstring+' <?=$lang_resource['MOBILE_CHECKOUT_TIME_IN_HOUR']?> :</span>';
		b += '<select class="field-text" id="preorderhh" onchange="Shopping.UserUpdate(this,\'hh\')"><option value=""><?=$lang_resource['MOBILE_CHECKOUT_HH']?></options>';
		b += '</select>';
		b += '</div>';    

		b += '<div class="field"  >';
		b += '<span class="label">'+textstring+' <?=$lang_resource['MOBILE_CHECKOUT_TIME_IN_MINUTE']?> :</span>';
		b += '<select class="field-text" id="preordermin" onchange="Shopping.UserUpdate(this,\'mm\')" >';


		b += '</select>';
		b += '</div>';	

		b += '</div>';  			
				
				
			
		b += '<div class=" main bg-white" style="padding: 10px 0px 15px 0px;"> ';
		b += '<div class="wrapp">';

		b += '<button type="button" class="btn-red" onclick="Payment.AllpaymentButton()"><?=$lang_resource['MOBILE_CHECKOUT_PAYMENT_METHOD']?> &nbsp;&nbsp;&nbsp;>></button>';
		b += '</div>';
		b += '</div>';   		

		document.getElementById("shoppingbox").innerHTML = b;


	if(Main.checkoutinfo['Area / Neighborhood'].status == 't'){
		if(Main.neighsettings == 't'){
			Checkout.NeighPopulate();
		}
	}

	if(Main.checkoutinfo['Takeout Date'].status == 't'){
		Checkout.PreorderFetchTime();
	}
	
	
	//For brauntree update info
	Shopping.braintree_firstname = document.getElementById("buyername").value;
	Shopping.braintree_lastname2 = document.getElementById("buyerlastname2").value;
	Shopping.braintree_address1 = document.getElementById("buyeraddress").value;
	Shopping.braintree_address2 = document.getElementById("buyerapi").value;
	if(document.getElementById("buyercity"))
	Shopping.braintree_city = document.getElementById("buyercity").value;
	if(document.getElementById("buyercolony"))
	Shopping.braintree_state = document.getElementById("buyercolony").value;
	if(document.getElementById("buyerzipcode"))
	Shopping.braintree_zipcode = document.getElementById("buyerzipcode").value;
	//end brain

	console.log("Shopping.braintree_firstname"+Shopping.braintree_firstname);
	console.log("Shopping.braintree_lastname2"+Shopping.braintree_lastname2);
	
				 
	
	
   //Shopping.PopulateCart();
	if(IS_REVIEW_ENABLED == 1 || IS_PAYPAL_ENABLED == 1){
	    paypal.clearCheckPaymentTimer();
			if(document.getElementById("popupmainbuttonok")){	
            document.getElementById("popupmainbuttonok").style.display = "block";
			}
            Main.Ga(Main.ActiveView)
	}else{
		if(document.getElementById("popupmainbuttonok")){	
	    document.getElementById("popupmainbuttonok").style.display = "none";
		}
            Shopping.Cart.business.sort(Main.SortByProperty("name"));
            Main.Ga("/" + Main.WhereAmIData.cityname + "/cart")
	}
	
    }, 
    PreorderFetchTime: function(){
    	if(Shopping.Cart.preorder){	
			var catalogiD = Main.itemid;
		}else{
			var catalogiD = "0" ; 
		}
		var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessOnlyMenuEach","itemid":' + catalogiD + ',"bussid":' + Shopping.ActiveBusiness + "}]", function (record){
			Checkout.PreorderFetchTimeHtml(record);			
		});
    },
    PreorderFetchTimeHtml: function(e){
    	e = JSON.parse(e)
		Main.Preordercattime  = JSON.stringify(e);
		
		var dayschedule = JSON.parse(e.menuonlyeach[0].workdays)
		var dayschedulev = JSON.parse(e.menuonlyeach[0].workvaluedays)
		var b =''
		b += '<option value="ASAP" SELECTED><?= $lang_resource['CHECKOUT_ASAP'] ?></option>';
		for(var dl =0;dl<dayschedule.length;dl++) {
			if(Shopping.Cart.buyer.deliverydate == dayschedulev[dl] ) {
				b += '<option value="'+dayschedulev[dl]+'" selected>'+dayschedule[dl]+'</option>';	
			}
			else {
				b += '<option value="'+dayschedulev[dl]+'" >'+dayschedule[dl]+'</option>';			
			}
		}
		document.getElementById("chkout_hour").innerHTML = b;


		if(Shopping.Cart.preorder) {
		Main.CheckoutEditHourcheck()
	}

	
	if(document.getElementById("chkout_hour").value == "ASAP") {
		 $("#pickup_time").hide();//("visibility","hidden");
	}
	else{
		 $("#pickup_time").show();//css("visibility","visible");
		// $("#preordermin option:first").attr('selected','selected');
	} 
	
	<!--For Minute Selected After HH selected-->
	var b = '<option value=""><?=$lang_resource['MOBILE_CHECKOUT_MM']?></option>';
				
	if(Shopping.Cart.buyer.deliveryminute == "0" ) {
		
	b += '<option value="0" selected>00 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';
	}
	else {
	b += '<option value="0" >00 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';	
		}
	if(Shopping.Cart.buyer.deliveryminute == "15" ) {
		
	b += '<option value="15" selected>15 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';
	}
	else {
	b += '<option value="15" >15 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';	
		}
	if(Shopping.Cart.buyer.deliveryminute == "30" ) {
	b += '<option value="30" selected>30 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';
	}
	else {
	b += '<option value="30" >30 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';	
		}
	if(Shopping.Cart.buyer.deliveryminute == "45" ) {
	b += '<option value="45" selected>45 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';
	}
	else {
	b += '<option value="45" >45 <?=$lang_resource['MOBILE_CHECKOUT_MIN']?></option>';	
	}
	
	$("#preordermin").empty().append(b);
    },

    NeighPopulate: function(){    	
    	Main.Loading();
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchNeighborhoodforCity","cityid":' + Main.WhereAmIData.city +  "}]", function (data){
	    	Shopping.CheckoutAllNeighbor = new Array();
		  	data = JSON.parse(data);
		  	for(var x in data.neighbor){
		  		Shopping.CheckoutAllNeighbor.push(data.neighbor[x]);
		  	}
		  	Main.Ready();
		  	Checkout.NeighPopulateInnerHtml();					
		});		
    },
    NeighPopulateInnerHtml: function(){
    	var b=''
		var flagneigh = 0;
		Shopping.Cart.buyer.colony = Shopping.Cart.buyer.address	
		b += '<option value=""></option>';
		if(Shopping.CheckoutAllNeighbor.length!=0){
			var ck1 = ""
			for(var x in Shopping.CheckoutAllNeighbor){
				if(Shopping.CheckoutAllNeighbor[x].id == Shopping.Cart.buyer.colony){
					ck1 = "SELECTED"
					flagneigh = 1;
				}  
				b += '<option value="'+Shopping.CheckoutAllNeighbor[x].id+'" '+ck1+'>'+Shopping.CheckoutAllNeighbor[x].name+'</option>'
				ck1 = ""
			}
			if(flagneigh==0){
				Shopping.Cart.buyer.colony = '';	
			}
		}
		document.getElementById("buyercolony").innerHTML=b;
    },
	
	
	BrainFieldUpdate:function(chk,field)
	{
		
		
		switch(field)
		{
			
		 case "name":	
		 Shopping.braintree_firstname = chk.value;
		  break;
		 case "lastname2":	
		 Shopping.braintree_lastname2 = chk.value;
		 break;
		 case "address":	
		 Shopping.braintree_address1 = chk.value;
		 break;
		  case "colony":	
		 Shopping.braintree_state = chk.value;
		 break;
		  case "city":	
		 Shopping.braintree_lastname = chk.value;
		 break; 
		  case "zipcode":	
		 Shopping.braintree_zipcode = chk.value;
		 break;
			
		}
		
		
		
	},
	
	 OrderDetails: function (chk) {

		 GlobalPagecheck = 2;
		document.getElementById("openOrderdetails").innerHTML = Checkout.OrderDetailsContent();
		 if(!chk)
		 $("#openOrderdetails").slideToggle("slow");
		 
		 if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			 RestMenuList.ReserveplusOrderContent();	
			}
	 },
	 
	OrderDetailsPage: function (chk) {
		 var ai = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		GlobalPagecheck = 3;
		var qn = 0;
		
        for (var f in Shopping.Cart.business)
        {
          
            for (var e in Shopping.Cart.business[f].dishes)
            {
				
              
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
				
            }
        }
		
		if(qn == 0 ) {
			
			alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
            return
			}
		
		var bd = "";
		bd +='<div class="main">';
    	bd +='<div class="header-grey">';
        	bd +='<div class="header_top">';
            	bd +='<div class="wrapp">';
                	bd +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="Shopping.OpenBusiness('+currentshop+')">< <?=$lang_resource['MOBILE_CHECKOUT_BUSINESS']?></button></div>';
                          bd +='<div class="center_heading">&nbsp;</div>';
                	bd +='<div class="left_btn_dv pull_right"><button type="button" class="red-link-btn" onclick="Main.InitInterface()"><?=$lang_resource['MOBILE_CHECKOUT_CANCEL']?></button></div>';
              
                bd +='</div>';
            bd +='</div>'
            bd +='<div class="wrapp" style="cursor:pointer" onclick="Checkout.OrderDetails()">';
                	      bd +='<center><span class="ch_heading" ><?=$lang_resource['MOBILE_CHECKOUT_ORDER_DETAILS']?></span></center>';
                bd +='</div>';
        bd +='</div>';
		bd +='<div class="blank-top"></div>'
   bd +='</div>';
   
  document.getElementById("headerSearch").innerHTML = bd;
  
			var html = "";
		 		html += Checkout.OrderDetailsContent();
				
				
				var h ='<div class=" main bg-white" style="padding: 10px 0px 15px 0px;"> ';
	if(Main.NullToEmpty(Shopping.Business[ai].minimum) == 0 || parseFloat(Shopping.Business[ai].minimum) == 0 || Main.NullToEmpty(Shopping.Business[ai].minimum) == "0.00" || Main.NullToEmpty(Shopping.Business[ai].minimum) == ''){
					h +='<div class="wrapp" id="min_order">';
					h +='<button type="button" class="btn-red order_now_btn_gray" onclick="Shopping.OpenCartCheck()"><?=$lang_resource['MOBILE_CHECKOUT_ORDER_NOW']?></button>';
					h +='</div>';
					
}else{
	h +='<div class="wrapp" id="min_order">';
					h +='<button type="button" class="btn-red order_now_btn_gray" ><?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?> '+Shopping.ActiveBusinesscurrency+' '+Shopping.Business[ai].minimum+'</button>';
					h +='</div>';
					
}
					
			
			 document.getElementById("shoppingbox").innerHTML = html;
			if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
			 RestMenuList.ReserveplusOrderContent();	
			}
			 
			 document.getElementById("checkforward").innerHTML = h;
			 Shopping.GetCartItemsCount();
			  
	},
		  OrderDetailsContent: function () {
			 
	 		 var c = '<div class="main wrapp">';
          c +='<h3 class="ch_heading_red">'+Shopping.Cart.business[0].name.toUpperCase()+'</h3>';
          c +='<div class="field" style="margin-top:10px;">';
          c +='<table width="91%" border="0" cellspacing="0" cellpadding="0" class="price-tbl" id="plc_rgt_in">';
		   total1=0;
		  if (Shopping.Cart.business.length != 0) {
			 for (var i in Shopping.Cart.business[0].dishes) {
				 total1= parseFloat(parseFloat(total1)+parseFloat(Shopping.Cart.business[0].dishes[i].total)	);
		  			
				 c += RestMenuList.MenuCartlist(i)

			}
		  }
		  var d = 0;
		  
		  d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[0].shipping)).toFixed(Main.IS_DECIMAL_POINT);
      
		  for (var e in Shopping.Cart.business[0].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[0].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
            }
			
		
		var distext='';
		var disprice='';

		if(Shopping.Cart.discounttype)
		{
			
			
				if(Shopping.Cart.discounttype == 1)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?> ("+Shopping.Cart.discountrate +"%)";
					disprice = parseFloat((parseFloat(d)*parseFloat(Shopping.Cart.discountrate))/100);
				}
				else if(Shopping.Cart.discounttype == 2)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?>";
					disprice = parseFloat(Shopping.Cart.discountrate);
					
				}
				
				if(parseFloat(d) >= parseFloat(Shopping.Cart.discountminshop)){
						if(parseFloat(d)> parseFloat(disprice)){
							
						d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(Main.IS_DECIMAL_POINT);
						if(document.getElementById("discount_div"))
						document.getElementById("discount_div").style.display="";
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = distext;
						if(document.getElementById("discount_price"))
						document.getElementById("discount_price").innerHTML = Shopping.FormatPrice(disprice.toFixed(Main.IS_DECIMAL_POINT));
						Shopping.Cart.discountprice = Shopping.FormatPriceNotFree(disprice.toFixed(Main.IS_DECIMAL_POINT));
						
						
							if(disprice==''){
								disprice="0.00";
							}
							if(disprice==''){
								disprice="0.00";
							}
							 var lang='';
								   if(disprice!="Pending"){
									   lang = Shopping.ActiveBusinesscurrency;
								   }
						  c +='<tr >';
						  c +='<td width="50%">'+distext+'</td>';
						  c +='<td width="30%" class="price">'+lang+ parseFloat(disprice).toFixed(Main.IS_DECIMAL_POINT);+'</td>';
						  c +='<td width="10%">&nbsp;</td>';
						  c +='<td width="7%">&nbsp;</td>';
						  c +='</tr>';
						}
						else{
							
						Shopping.Cart.discountprice="";
						if(document.getElementById("discount_div"))
						$("#discount_div").hide();
						document.getElementById("discount_text").innerHTML = "";
					}
						
					}else{
						Shopping.Cart.discountprice="";
						if(document.getElementById("discount_div"))
						$("#discount_div").hide();
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = "";
				}
				
				
			/*	if(disprice==''){
					disprice="0.00";
				}
				if(disprice==''){
					disprice="0.00";
				}
				 var lang='';
					   if(disprice!="Pending"){
						   lang="<?= $lang_resource['SITE_CURRENCY'] ?> ";
					   }
			  c +='<tr >';
			  c +='<td width="50%">'+distext+'</td>';
			  c +='<td width="30%" class="price">'+lang+ parseFloat(disprice).toFixed(2);+'</td>';
			  c +='<td width="10%">&nbsp;</td>';
			  c +='<td width="7%">&nbsp;</td>';
			  c +='</tr>';*/
		}
			var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
			
			if(Shopping.Cart.buyer.taxtype == 1)
		{
		var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(Main.IS_DECIMAL_POINT);
		}
		else
		{
			var totalwithTax = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
		}
		
		
		Shopping.Cart.servicefeeTotal1=0;
		Shopping.Cart.servicefeeTotal=0;
		if((Shopping.Cart.servicefee=='') || (typeof Shopping.Cart.servicefee=='undefined')){
			Shopping.Cart.servicefee=0;
			
		}
		
		if(Shopping.Cart.servicefee>0){
			Shopping.Cart.servicefeeTotal=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100)
			Shopping.Cart.servicefeeTotal1=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100).toFixed(Main.IS_DECIMAL_POINT)
		}
		d = totalwithTax;
		d=parseFloat(d)+ parseFloat(Shopping.Cart.servicefeeTotal);
		
		Shopping.Cart.tax = parseFloat(taxprice).toFixed(Main.IS_DECIMAL_POINT);
		
          Shopping.Cart.total = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
   
		 c +='<tr>';
          c +='<td width="50%"><?=$lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE']?>'
		  c +='<input type="text" class=" field_text_comment" id="' + Shopping.Cart.business[0].id + '_comments" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessCommentUpdate(this,' + 0 + ')" value="'+ Main.NullToEmpty(Shopping.Cart.business[0].comments)+'"></td>';
		  if(Shopping.Cart.business[0].shipping==''){
			  Shopping.Cart.business[0].shipping="0.00";
		  }
          c +='<td width="30%" class="price">'+Shopping.ActiveBusinesscurrency+' '+ parseFloat(Shopping.Cart.business[0].shipping).toFixed(Main.IS_DECIMAL_POINT);+'</td>';
          c +='<td width="10%">&nbsp;</td>';
           c +='<td width="7%">&nbsp;</td>';
			 c +='</tr>';
              c +='<tr>';
            c +='<td width="50%">Tax ('+Shopping.Cart.buyer.tax+'%)';
							if(Shopping.Cart.buyer.taxtype == 1) 
							c += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_not_included_V2'] ?></p>';
							else if(Shopping.Cart.buyer.taxtype == 2) 
							c += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_included_V2'] ?></p>';
							c += '</td>';
			c +='</td>';
			if(taxprice==''){
				taxprice="0.00";
			}
             c +='<td width="30%" class="price">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(taxprice).toFixed(Main.IS_DECIMAL_POINT) + "</td>";
                 c +='<td width="10%">&nbsp;</td>';
                    c +='<td width="7%">&nbsp;</td>';
					 c +='</tr>';
					 if(parseFloat(Shopping.Cart.buyer.tips)){
					c += '<tr id="cart_tips_block" >';
					c += '<td width="50%"><?= $lang_resource['TRACKORDER_TIPS'] ?></td>';
					c += '<td width="30%" class="price"> '+Shopping.ActiveBusinesscurrency+' <span  id="cart_tips">' + parseFloat(Shopping.Cart.buyer.tips).toFixed(Main.IS_DECIMAL_POINT)  + "</span></td>";
					c +='<td width="10%">&nbsp;</td>';
                    c +='<td width="7%">&nbsp;</td>';
					c += '</tr>';
				}


					 c +='<tr>';
					  if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
						Shopping.Cart.servicefee =0;
					}
            c +='<td width="50%"><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee+'%)';
							
						c += '</td>';
			c +='</td>';
			if(Shopping.Cart.servicefeeTotal1==''){
				Shopping.Cart.servicefeeTotal1="0.00";
			}
             c +='<td width="30%" class="price">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(Shopping.Cart.servicefeeTotal1).toFixed(Main.IS_DECIMAL_POINT) + "</td>";
                 c +='<td width="10%">&nbsp;</td>';
                    c +='<td width="7%">&nbsp;</td>';
					 c +='</tr>';

                      
                     c +='</table>';
					 
		/*********************************reservation calculation***************************************************************/
                if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0)
		{
				if(Shopping.Cart.reservePrice.Room==''){
					Shopping.Cart.reservePrice.Room="0.00";
				}
				if(Shopping.Cart.reservePrice.Table==''){
					Shopping.Cart.reservePrice.Table="0.00";
				}
				if(Shopping.Cart.reservePrice.Free==''){
					Shopping.Cart.reservePrice.Free="0.00";
				}
				
				Shopping.Cart.reservePrice.Room = isNaN(Shopping.Cart.reservePrice.Room) ? 0 : Shopping.Cart.reservePrice.Room;
				Shopping.Cart.reservePrice.Table = isNaN(Shopping.Cart.reservePrice.Table) ? 0 : Shopping.Cart.reservePrice.Table;
				Shopping.Cart.reservePrice.Free = isNaN(Shopping.Cart.reservePrice.Free) ? 0 : Shopping.Cart.reservePrice.Free;

				Shopping.Cart.total=parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.reservePrice.Room)+parseFloat(Shopping.Cart.reservePrice.Table)+parseFloat(Shopping.Cart.reservePrice.Free)).toFixed(Main.IS_DECIMAL_POINT);
			
		}
		if(parseFloat(Shopping.Cart.buyer.tips)){
			Shopping.Cart.total = parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.buyer.tips))
		}
		
		
						
					c +='<table width="91%" border="0" cellspacing="0" cellpadding="0" class="" >';	
						 c +='<tr>';
						 if(Shopping.Cart.total==''){
							 Shopping.Cart.total="0.00";
						 }
                         c +='<td width="40%" class="total"><?=$lang_resource['MOBILE_CHECKOUT_TOTAL']?></td>';
                         c +='<td width="40%" class="total_price">'+Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT)+'</td>';
                         c +='<td width="10%">&nbsp;</td>';
					   c +='</tr> ';
					
					c +='</table>';
					 if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){     
					   c +='<h3 class="ch_heading_red"><?=$lang_resource['MOBILE_CHECKOUT_RESERVATION_OPTIONS']?></h3>';
					}
					    
					c +='<table width="91%" border="0" cellspacing="0" cellpadding="0" class="price-tbl" id="chk_reserve" >';
					    
					    c +='</table>';
						
		/*********************************reservation calculation***************************************************************/
		 
					 
             c +='</div>';
      	
         c +='</div>';
		  c +='<div id="checkforward"></div>';
		  
		 return c;
		
	
	},
	
	OrderDetailsPage_new: function (chk) {
	var ai = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
	GlobalPagecheck = 3;
	var qn = 0;
	for (var f in Shopping.Cart.business)
	{
		for (var e in Shopping.Cart.business[f].dishes)
		{
			qn +=Shopping.Cart.business[f].dishes[e].quantity;
		}
	}
	if(qn == 0 ) 
	{
		alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
		return
	}
	
	var html = "";
	//html += Checkout.OrderDetailsContent();//change it
	html += Checkout.OrderDetailsContentNew();//change it
	
	//$('#plc_rgt_in_new').html(html);
	//alert('min 2 = '+Shopping.Business[ai].minimum);
	var h ='';
	//h +='<div class="pop-up-delivery"><p><?= $lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE'] ?></p><p class="last">'+Shopping.ActiveBusinesscurrency+' '+ parseFloat(Shopping.Cart.business[0].shipping).toFixed(2);+'</p></div>';
	if(Main.NullToEmpty(Shopping.Business[ai].minimum) == 0 || parseFloat(Shopping.Business[ai].minimum) == 0 || Main.NullToEmpty(Shopping.Business[ai].minimum) == "0.00" || Main.NullToEmpty(Shopping.Business[ai].minimum) == '')
	{
	
	h +='<center><input type="button" class="pop-up-read" onclick="Shopping.OpenCartGuest()" value="<?=$lang_resource['MOBILE_CHECKOUT_ORDER_NOW']?>"></center>';
	h +='</div>';
	}
	else
	{
	h +='<div id="min_order">';	
	h +='<p class="check-out"><?= $lang_resource['REACH_MIN_ORD'] ?> '+Shopping.ActiveBusinesscurrency+' '+Shopping.Business[ai].minimum+' <?= $lang_resource['REACH_MIN_ORD1'] ?> </p>';
	h +='<center><input type="button" class="pop-up-read" value="<?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?> '+Shopping.ActiveBusinesscurrency+' '+Shopping.Business[ai].minimum+'"></center>';
	h +='</div>';				
	}
	
	
	//document.getElementById("shoppingbox").innerHTML = html;
	document.getElementById("plc_rgt_in_new").innerHTML = html;
	if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){
	RestMenuList.ReserveplusOrderContent();	
	}
	//alert(h);
	document.getElementById("checkforward").innerHTML = h;
	Shopping.GetCartItemsCount();
	
	},
	OrderDetailsContentNew: function () {
	 		 var c = '<div class="">';
          c +='<h3 class="ch_heading_red"></h3>';
          c +='<div class="">';
          c +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="price-tbl" id="plc_rgt_in" style="display:block;">';
		  total1=0;
		  if (Shopping.Cart.business.length != 0) {
			 for (var i in Shopping.Cart.business[0].dishes) {
				 total1= parseFloat(parseFloat(total1)+parseFloat(Shopping.Cart.business[0].dishes[i].total)	);
				 c += RestMenuList.MenuCartlist_new(i)

			}
		  }
		  var d = 0;
		  
		  d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[0].shipping)).toFixed(Main.IS_DECIMAL_POINT);
      
		  for (var e in Shopping.Cart.business[0].dishes)
            {
                d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[0].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
            }
			
		
		var distext='';
		var disprice='';

		if(Shopping.Cart.discounttype)
		{
			
			
				if(Shopping.Cart.discounttype == 1)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?> ("+Shopping.Cart.discountrate +"%)";
					disprice = parseFloat((parseFloat(d)*parseFloat(Shopping.Cart.discountrate))/100);
				}
				else if(Shopping.Cart.discounttype == 2)
				{
					 distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?>";
					disprice = parseFloat(Shopping.Cart.discountrate);
					
				}
				
				if(parseFloat(d) >= parseFloat(Shopping.Cart.discountminshop)){
						if(parseFloat(d)> parseFloat(disprice)){
							
						d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(Main.IS_DECIMAL_POINT);
						if(document.getElementById("discount_div"))
						document.getElementById("discount_div").style.display="";
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = distext;
						if(document.getElementById("discount_price"))
						document.getElementById("discount_price").innerHTML = Shopping.FormatPrice(disprice.toFixed(Main.IS_DECIMAL_POINT));
						Shopping.Cart.discountprice = Shopping.FormatPriceNotFree(disprice.toFixed(Main.IS_DECIMAL_POINT));
						
						
							if(disprice==''){
								disprice="0.00";
							}
							if(disprice==''){
								disprice="0.00";
							}
							 var lang='';
								   if(disprice!="Pending"){
									   lang = Shopping.ActiveBusinesscurrency;
								   }
						  c +='<tr >';
						  c +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;">'+distext+'</td>';
						  c +='<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+lang+ parseFloat(disprice).toFixed(Main.IS_DECIMAL_POINT);+'</td>';
						  c +='</tr>';
						}
						else{
							
						Shopping.Cart.discountprice="";
						if(document.getElementById("discount_div"))
						$("#discount_div").hide();
						document.getElementById("discount_text").innerHTML = "";
					}
						
					}else{
						Shopping.Cart.discountprice="";
						if(document.getElementById("discount_div"))
						$("#discount_div").hide();
						if(document.getElementById("discount_text"))
						document.getElementById("discount_text").innerHTML = "";
				}
				
				
			/*	if(disprice==''){
					disprice="0.00";
				}
				if(disprice==''){
					disprice="0.00";
				}
				 var lang='';
					   if(disprice!="Pending"){
						   lang="<?= $lang_resource['SITE_CURRENCY'] ?> ";
					   }
			  c +='<tr >';
			  c +='<td width="50%">'+distext+'</td>';
			  c +='<td width="30%" class="price">'+lang+ parseFloat(disprice).toFixed(2);+'</td>';
			  c +='<td width="10%">&nbsp;</td>';
			  c +='<td width="7%">&nbsp;</td>';
			  c +='</tr>';*/
		}
			var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
			
			if(Shopping.Cart.buyer.taxtype == 1)
		{
		var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(Main.IS_DECIMAL_POINT);
		}
		else
		{
			var totalwithTax = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
		}
		
		
		Shopping.Cart.servicefeeTotal1=0;
		Shopping.Cart.servicefeeTotal=0;
		if((Shopping.Cart.servicefee=='') || (typeof Shopping.Cart.servicefee=='undefined')){
			Shopping.Cart.servicefee=0;
			
		}
		
		if(Shopping.Cart.servicefee>0){
			Shopping.Cart.servicefeeTotal=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100)
			Shopping.Cart.servicefeeTotal1=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100).toFixed(Main.IS_DECIMAL_POINT)
		}
		d = totalwithTax;
		d=parseFloat(d)+ parseFloat(Shopping.Cart.servicefeeTotal);
		
		Shopping.Cart.tax = parseFloat(taxprice).toFixed(Main.IS_DECIMAL_POINT);
		
          Shopping.Cart.total = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
   
		 c +='<tr>';
          c +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;"><?=$lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE']?>';
		  c +='<input type="text" class=" field_text_comment" id="' + Shopping.Cart.business[0].id + '_comments" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessCommentUpdate(this,' + 0 + ')" value="'+ Main.NullToEmpty(Shopping.Cart.business[0].comments)+'"></td>';
		  if(Shopping.Cart.business[0].shipping==''){
			  Shopping.Cart.business[0].shipping="0.00";
		  }
          c +='<td width="30%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+Shopping.ActiveBusinesscurrency+' '+ parseFloat(Shopping.Cart.business[0].shipping).toFixed(Main.IS_DECIMAL_POINT);+'</td>';
          c +='<td width="10%">&nbsp;</td>';
           c +='<td width="7%">&nbsp;</td>';
			 c +='</tr>';
              c +='<tr>';
            c +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;">Tax ('+Shopping.Cart.buyer.tax+'%)';
							if(Shopping.Cart.buyer.taxtype == 1) 
							c += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_not_included_V2'] ?></p>';
							else if(Shopping.Cart.buyer.taxtype == 2) 
							c += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_included_V2'] ?></p>';
							c += '</td>';
			c +='</td>';
			if(taxprice==''){
				taxprice="0.00";
			}
             c +='<td width="30%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(taxprice).toFixed(Main.IS_DECIMAL_POINT) + "</td>";
                 c +='<td width="10%">&nbsp;</td>';
                    c +='<td width="7%">&nbsp;</td>';
					 c +='</tr>';
					 if(parseFloat(Shopping.Cart.buyer.tips)){
					c += '<tr id="cart_tips_block" >';
					c += '<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;"><?= $lang_resource['TRACKORDER_TIPS'] ?></td>';
					c += '<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;"> '+Shopping.ActiveBusinesscurrency+' <span  id="cart_tips">' + parseFloat(Shopping.Cart.buyer.tips).toFixed(Main.IS_DECIMAL_POINT)  + "</span></td>";
					
					c += '</tr>';
				}


					 c +='<tr>';
					  if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
						Shopping.Cart.servicefee =0;
					}
				c +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;"><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee+'%)';
				
				c += '</td>';
				c +='</td>';
				if(Shopping.Cart.servicefeeTotal1==''){
				Shopping.Cart.servicefeeTotal1="0.00";
				}
				c +='<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(Shopping.Cart.servicefeeTotal1).toFixed(Main.IS_DECIMAL_POINT) + "</td>";
				
				c +='</tr>';
				
				
				c +='</table>';
					 
		/*********************************reservation calculation***************************************************************/
                if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0)
		{
				if(Shopping.Cart.reservePrice.Room==''){
					Shopping.Cart.reservePrice.Room="0.00";
				}
				if(Shopping.Cart.reservePrice.Table==''){
					Shopping.Cart.reservePrice.Table="0.00";
				}
				if(Shopping.Cart.reservePrice.Free==''){
					Shopping.Cart.reservePrice.Free="0.00";
				}
				
				Shopping.Cart.reservePrice.Room = isNaN(Shopping.Cart.reservePrice.Room) ? 0 : Shopping.Cart.reservePrice.Room;
				Shopping.Cart.reservePrice.Table = isNaN(Shopping.Cart.reservePrice.Table) ? 0 : Shopping.Cart.reservePrice.Table;
				Shopping.Cart.reservePrice.Free = isNaN(Shopping.Cart.reservePrice.Free) ? 0 : Shopping.Cart.reservePrice.Free;

				Shopping.Cart.total=parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.reservePrice.Room)+parseFloat(Shopping.Cart.reservePrice.Table)+parseFloat(Shopping.Cart.reservePrice.Free)).toFixed(Main.IS_DECIMAL_POINT);
			
		}
		if(parseFloat(Shopping.Cart.buyer.tips)){
			Shopping.Cart.total = parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.buyer.tips))
		}
			$('#pop_up_item_tot1').html(Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT));
			$('#pop_up_item_tot2').html(Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT));
			$('#pop_up_item_tot3').html(Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT));
			
			

		
		if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0){     
					   c +='<h3 class="ch_heading_red"><?=$lang_resource['MOBILE_CHECKOUT_RESERVATION_OPTIONS']?></h3>';
					}
					    
					c +='<table width="91%" border="0" cellspacing="0" cellpadding="0" class="price-tbl" id="chk_reserve" >';
					    
					    c +='</table>';
						
		/*********************************reservation calculation***************************************************************/
		 
					 
             c +='</div>';
      	
         c +='</div>';
		  c +='<div id="checkforward"></div>';
			if(Shopping.Cart.servicefeeTotal1==''){
			Shopping.Cart.servicefeeTotal1="0.00";
			}
		 // c +='<div class="pop-up-delivery"><p><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee+'%)</p><p class="last">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(Shopping.Cart.servicefeeTotal1).toFixed(2) +'</p></div>';
		 return c;
		
	
	},
    Validation1: function(e,id){
	   
	   //var name = document.getElementById("buyername").value;
	   //alert(val)
	  /*var name = $.trim(val);
	  alert(val)
    if(name == ""){alert(1)
		return (false);
		}*/
	  //return (false);
	  //alert(id)
	  var id1=id;
	   if (document.getElementById(id1).value.length == 0) {
		   //alert(e.keyCode)
           if (e.keyCode == 32) {
			  // alert("s")
			   document.getElementById(id1).value = '';
			  return false;
           }
       }

   },
	Validation: function(evt){ // Alphanumeric only  
	 	evt = evt || window.event;
	   var charCode = evt.which || evt.keyCode;
	   var charStr = String.fromCharCode(charCode);	  
	   	if (!(charCode == 8 || charCode == 27 || charCode == 46 || charCode == 37 || charCode == 39)){
		   	if (/^[a-zA-Z0-9- \t\b\d]*$/.test(charStr) == false ) {    		
		    	return (false);
	    	}
	   	}
   	},
	
	open_cart_popup : function(){
		var ai = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
		GlobalPagecheck = 3;
		var qn = 0;
		for (var f in Shopping.Cart.business)
		{
			for (var e in Shopping.Cart.business[f].dishes)
			{
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
			}
		}
		if(qn == 0 ) 
		{
			alert("<?= $lang_resource['CARTEMPTY_V21'] ?>");
			return
		}
		else
		{
			var p ='<div class="pop-up-bg">';
				p +='<div class="pop-up-cart">';
				p +='<div class="pop-up-cart-icon"><img src="panel/mobile-reservation/images/cart-icon2.png"></div>';
				p +='<div class="pop-up-item-number" id="itemCount4">'+qn+'</div>';
				p +='<p id="pop_up_item_tot1">';
				if(Shopping.Cart.total=='')
				{
					Shopping.Cart.total="0.00";
				}
				p +=''+Shopping.ActiveBusinesscurrency+' '+parseFloat(Shopping.Cart.total).toFixed(Main.IS_DECIMAL_POINT)+'</p>';
				p +='</div>';
				p +='<div class="pop-up-top"></div>';
				p +='<div class="pop-up-box">';
				p +='<div class="pop-up-box-header">';
				var u = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
				if(Shopping.Business[u].isimg==1){
				v = "panel/images/business/" + Main.NullToEmpty(Shopping.ActiveBusiness) + "/panel.jpg?c=" + Main.Random ;
				}
				else{
				v = 'panel/images/dummy/medium_business.jpg';
				}
				p +='<div class="pop-up-box-logo"><img src="'+v+'"></div>';
				p +='<div class="pop-up-close-btn" onclick="Popup.Close()"></div>';
				p +='</div>';
				
				total1=0;
				p += '<div id="plc_rgt_in_new">';
				if (Shopping.Cart.business.length != 0) 
				{
					for (var i in Shopping.Cart.business[0].dishes) 
					{
						total1= parseFloat(parseFloat(total1)+parseFloat(Shopping.Cart.business[0].dishes[i].total));
						p += RestMenuList.MenuCartlist_new(i);
						//alert(p);
					}
				}
    
    p +='<div class="">';
    p +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="price-tbl" id="plc_rgt_in">';
    
    var d = 0;
    
    d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[0].shipping)).toFixed(Main.IS_DECIMAL_POINT);
    
    for (var e in Shopping.Cart.business[0].dishes)
    {
    d = parseFloat(parseFloat(d) + parseFloat(Shopping.Cart.business[0].dishes[e].total)).toFixed(Main.IS_DECIMAL_POINT)
    }
    
    
    var distext='';
    var disprice='';
    
    if(Shopping.Cart.discounttype)
    {
    
    
    if(Shopping.Cart.discounttype == 1)
    {
    distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?> ("+Shopping.Cart.discountrate +"%)";
    disprice = parseFloat((parseFloat(d)*parseFloat(Shopping.Cart.discountrate))/100);
    }
    else if(Shopping.Cart.discounttype == 2)
    {
    distext = "<?=$lang_resource['SHOPPING_DISCOUNT_TEXT']?>";
    disprice = parseFloat(Shopping.Cart.discountrate);
    
    }
    
    if(parseFloat(d) >= parseFloat(Shopping.Cart.discountminshop)){
    if(parseFloat(d)> parseFloat(disprice)){
    
    d = parseFloat(parseFloat(d) - parseFloat(disprice)).toFixed(Main.IS_DECIMAL_POINT);
    if(document.getElementById("discount_div"))
    document.getElementById("discount_div").style.display="";
    if(document.getElementById("discount_text"))
    document.getElementById("discount_text").innerHTML = distext;
    if(document.getElementById("discount_price"))
    document.getElementById("discount_price").innerHTML = Shopping.FormatPrice(disprice.toFixed(Main.IS_DECIMAL_POINT));
    Shopping.Cart.discountprice = Shopping.FormatPriceNotFree(disprice.toFixed(Main.IS_DECIMAL_POINT));
    
    
    if(disprice==''){
    disprice="0.00";
    }
    if(disprice==''){
    disprice="0.00";
    }
    var lang='';
    if(disprice!="Pending"){
    lang = Shopping.ActiveBusinesscurrency;
    }
    p +='<tr >';
    p +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;">'+distext+'</td>';
    p +='<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+lang+ parseFloat(disprice).toFixed(Main.IS_DECIMAL_POINT);+'</td>';
   
    p +='</tr>';
    }
    else{
    
    Shopping.Cart.discountprice="";
    if(document.getElementById("discount_div"))
    $("#discount_div").hide();
    document.getElementById("discount_text").innerHTML = "";
    }
    
    }else{
    Shopping.Cart.discountprice="";
    if(document.getElementById("discount_div"))
    $("#discount_div").hide();
    if(document.getElementById("discount_text"))
    document.getElementById("discount_text").innerHTML = "";
    }
	
    }
    var taxprice = parseFloat(Shopping.Cart.buyer.tax*parseFloat(d)/100) ;
    
    if(Shopping.Cart.buyer.taxtype == 1)
    {
    var totalwithTax = parseFloat(parseFloat(d)+ parseFloat(taxprice)).toFixed(Main.IS_DECIMAL_POINT);
    }
    else
    {
    var totalwithTax = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
    }
    
    
    Shopping.Cart.servicefeeTotal1=0;
    Shopping.Cart.servicefeeTotal=0;
    if((Shopping.Cart.servicefee=='') || (typeof Shopping.Cart.servicefee=='undefined')){
    Shopping.Cart.servicefee=0;
    
    }
    
    if(Shopping.Cart.servicefee>0){
    Shopping.Cart.servicefeeTotal=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100)
    Shopping.Cart.servicefeeTotal1=parseFloat((parseFloat(Shopping.Cart.servicefee)*parseFloat(d))/100).toFixed(Main.IS_DECIMAL_POINT)
    }
    d = totalwithTax;
    d=parseFloat(d)+ parseFloat(Shopping.Cart.servicefeeTotal);
    
    Shopping.Cart.tax = parseFloat(taxprice).toFixed(Main.IS_DECIMAL_POINT);
    
    Shopping.Cart.total = parseFloat(d).toFixed(Main.IS_DECIMAL_POINT);
    
    p +='<tr>';
    p +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;"><?=$lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE']?>'
    p +='<input type="text" class=" field_text_comment" id="' + Shopping.Cart.business[0].id + '_comments" placeholder="<?= $lang_resource['ORDER_COMMENTS'] ?>" onkeyup="Shopping.BusinessCommentUpdate(this,' + 0 + ')" value="'+ Main.NullToEmpty(Shopping.Cart.business[0].comments)+'"></td>';
    if(Shopping.Cart.business[0].shipping==''){
    Shopping.Cart.business[0].shipping="0.00";
    }
    p +='<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+Shopping.ActiveBusinesscurrency+' '+ parseFloat(Shopping.Cart.business[0].shipping).toFixed(Main.IS_DECIMAL_POINT);+'</td>';
    
    p +='</tr>';
    p +='<tr>';
    p +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;">Tax ('+Shopping.Cart.buyer.tax+'%)';
    if(Shopping.Cart.buyer.taxtype == 1) 
    p += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold;"><?= $lang_resource['Tax_not_included_V2'] ?></p>';
    else if(Shopping.Cart.buyer.taxtype == 2) 
    p += '<p class="food-dsp" style="height: 16px; font-size: 10px;font-weight:bold; color:#fff;"><?= $lang_resource['Tax_included_V2'] ?></p>';
    p += '</td>';
    p +='</td>';
    if(taxprice==''){
    taxprice="0.00";
    }
    p +='<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(taxprice).toFixed(Main.IS_DECIMAL_POINT) + "</td>";
   
    p +='</tr>';
    if(parseFloat(Shopping.Cart.buyer.tips)){
    p += '<tr id="cart_tips_block" >';
    p += '<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;"><?= $lang_resource['TRACKORDER_TIPS'] ?></td>';
    p += '<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;"> '+Shopping.ActiveBusinesscurrency+' <span  id="cart_tips">' + parseFloat(Shopping.Cart.buyer.tips).toFixed(Main.IS_DECIMAL_POINT)  + "</span></td>";
    
    p += '</tr>';
    }
    
    
    p +='<tr>';
    if(Main.NullToEmpty(Shopping.Cart.servicefee)=='' ){
    Shopping.Cart.servicefee =0;
    }
    p +='<td width="50%" style="color: rgb(255, 255, 255); font-size: 12px;"><?= $lang_resource['SERVICE_FEE_V2'] ?> ('+Shopping.Cart.servicefee+'%)';
    
    p += '</td>';
    p +='</td>';
    if(Shopping.Cart.servicefeeTotal1==''){
    Shopping.Cart.servicefeeTotal1="0.00";
    }
    p +='<td width="50%" class="price" style="color: rgb(255, 255, 255); font-size: 12px;">'+Shopping.ActiveBusinesscurrency+' ' +  parseFloat(Shopping.Cart.servicefeeTotal1).toFixed(Main.IS_DECIMAL_POINT) + "</td>";
    
    p +='</tr>';
    
    
    p +='</table>';
    
    /*********************************reservation calculation***************************************************************/
    if(globalReserve.Free.length != 0 || globalReserve.Table.length != 0 || globalReserve.Room.length != 0)
    {
    if(Shopping.Cart.reservePrice.Room==''){
    Shopping.Cart.reservePrice.Room="0.00";
    }
    if(Shopping.Cart.reservePrice.Table==''){
    Shopping.Cart.reservePrice.Table="0.00";
    }
    if(Shopping.Cart.reservePrice.Free==''){
    Shopping.Cart.reservePrice.Free="0.00";
    }
    
    Shopping.Cart.reservePrice.Room = isNaN(Shopping.Cart.reservePrice.Room) ? 0 : Shopping.Cart.reservePrice.Room;
    Shopping.Cart.reservePrice.Table = isNaN(Shopping.Cart.reservePrice.Table) ? 0 : Shopping.Cart.reservePrice.Table;
    Shopping.Cart.reservePrice.Free = isNaN(Shopping.Cart.reservePrice.Free) ? 0 : Shopping.Cart.reservePrice.Free;
    
    Shopping.Cart.total=parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.reservePrice.Room)+parseFloat(Shopping.Cart.reservePrice.Table)+parseFloat(Shopping.Cart.reservePrice.Free)).toFixed(Main.IS_DECIMAL_POINT);
    
    }
    if(parseFloat(Shopping.Cart.buyer.tips)){
    Shopping.Cart.total = parseFloat(parseFloat(Shopping.Cart.total)+parseFloat(Shopping.Cart.buyer.tips))
    }
	
    p +='</div>';
   
							
				//p +='<div class="pop-up-delivery"><p><?= $lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE'] ?></p><p class="last">'+Shopping.ActiveBusinesscurrency+' '+ parseFloat(Shopping.Cart.business[0].shipping).toFixed(Main.IS_DECIMAL_POINT);+'</p></div>';
				if(Main.NullToEmpty(Shopping.Business[ai].minimum) == 0 || parseFloat(Shopping.Business[ai].minimum) == 0 || Main.NullToEmpty(Shopping.Business[ai].minimum) == "0.00" || Main.NullToEmpty(Shopping.Business[ai].minimum) == '' || Shopping.Cart.total >= Shopping.Business[ai].minimum){
				p +='<div id="min_order">';
				
				p +='<center><input type="button" class="pop-up-read" onclick="Shopping.OpenCartGuest()" value="<?=$lang_resource['MOBILE_CHECKOUT_ORDER_NOW']?>"></center>';
				p +='</div>';				
				}else{
				p +='<div id="min_order">';
				p +='<p class="check-out"><?= $lang_resource['REACH_MIN_ORD'] ?> '+Shopping.ActiveBusinesscurrency+' '+Shopping.Business[ai].minimum+' <?= $lang_resource['REACH_MIN_ORD1'] ?></p>';			
				p +='<center><input type="button" class="pop-up-read" value="<?= $lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] ?> '+Shopping.ActiveBusinesscurrency+' '+Shopping.Business[ai].minimum+'"></center>';
				p +='</div>';
				}
				p +='</div>';
				p +='</div>';//end of plc_rgt_in_new
				p +='</div>';
				Popup.Show(440, 240, p, function ()
				{
				
				
				})
		}//end of qn == 0
			
			}//end of function  
  
};
