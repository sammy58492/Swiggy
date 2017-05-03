//     AddToCart,GetCartItemsCount,RemoveFromCart,PopulateCart and PopulateDishesList function need to overwrite from v3 // frontend functionality (from shopping.js)
//     pop up css and right side bar of shopping page  css need to add // frontend design
//     images 07plus.png,06plus.png,05minus.png,04delete.png,03edit.png,02copy.png,01add.png  frontend image
//     left.png,whole.png,right.png  Panel/theme
//     panel/theme/en bgp.jpg;
//     popup.js and froms.js need to overwirte (Please back up of that side)
//     For delivery popup front.js


 $(function() {
            
            var topPadding = 100;
            $(window).scroll(function() {
				 var offset = $("#order_cart").offset();
				 //alert($(window).scrollTop())
				 if($(window).scrollTop() > 500){
					 $("#order_cart").addClass("ordercartfixed");
					 $(".plc_rgt_in ").addClass("plcgrtinfixed");
				}else{$("#order_cart").removeClass("ordercartfixed");
				$(".plc_rgt_in ").removeClass("plcgrtinfixed");}
				 var my_div= document.getElementById('dishesresultsinner').getBoundingClientRect();
				// var bottom=my_div.bottom;
				// cart_bottom=document.getElementById('order_cart').getBoundingClientRect().bottom;
       			// bottom=document.getElementById('order_cart').getBoundingClientRect().bottom - topPadding;
          /*      if ($(window).scrollTop() > offset.top) {
                    $("#order_cart").stop().animate({
                        marginTop: $(window).scrollTop() - offset.top + topPadding
                    });
                } else {
                    $("#order_cart").stop().animate({
                        marginTop: 0
                    });
                }*/
            });
});




var ProductOption = {
	 add_product_options_db:function(cart,id,options,comments,optionsid,total_price){
   /* 
     $(cart).hide();*/
	
	    Main.Loading();
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
				//alert(b)
				Main.Ready();
				b = JSON.parse(b)
				if(b.review == 0) {
					Shopping.AddToCart(cart,id,options,comments,optionsid,total_price)
					}
					else if(b.review.extras_details.length == 0) {
					Shopping.AddToCart(cart,id,options,comments,optionsid,total_price)
					}
					 else {
					ProductOption.add_product_options(cart,id);
						}
			 });
	// 
		
	 },
	  edit_product_options:function(id,edit_id){
		//alert(edit_id)
		
		 if (Main.Busy) {
		   return false;
		   }
		quantitysec = Shopping.Cart.business[0].dishes[edit_id].quantity;
	var	productOption = Shopping.Cart.business[0].dishes[edit_id].options;
	var	optionChoiceId = Shopping.Cart.business[0].dishes[edit_id].optionChoiceId;
	alert(optionChoiceId)
	var arr_opption = productOption.split(", "); 
	//alert(optionChoiceId)
    var optionChoiceId_arr = optionChoiceId.split(","); 
	alert(JSON.stringify(optionChoiceId_arr))

		Main.Loading();
		//alert(JSON.stringify(Shopping.Cart))
          $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
				
                data=JSON.parse(b);
			
				//alert(data.length)
          /*       r = '<div  id="' +id + '_extras"><h4>You can choose following Sets</h4><br/>';*/
                flag=0;
               count=0;
               var e='';
			   
				set_count= data['review']['extras_details'].length;
				/*if(set_count == 0) {
					Main.Ready();
					Shopping.AddToCartOld(cart,id);
					return false;
					}
				*/
                Forms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
                Forms.Form.extras_details.type = "create";
		
                Forms.Form.extras_details.edit_id = edit_id;
                //*  if (Forms.Form.business.type == "modify") {
                ///Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
                var e=null;
                //}*//*
                Forms.Form.extras_details.extras_details = d;
                Shopping.ActiveForm = "extras_details";
                
                set_temp_count=1;
				var	e = '';
				    e += '<div style="background-color:#c71100;color:white;height:50px;line-height:50px;font-weight:bold;font-size:18px; border-radius:10px 10px 0 0;">';
                    e += '<span class="title" style="margin-left:10px;">Please Edit your options</span>'
					e += '<span class="title" style="margin-left:175px;" id="amountsec">Quantity  ('+Shopping.Cart.business[0].dishes[edit_id].quantity+')</span>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="ProductOption.additem(1)" id="amountsecadd" ><img id="panelimgsu" src="../../images/06plus.png" alt="Add" title="Add" style="width: 24px; position: absolute; margin-top: 12px; margin-left: -5px;" /></a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="ProductOption.additem(2)" id="amountsecminus" style="display:none; "><img id="panelimgsu" src="../../images/05minus.png" style="position: absolute; width: 22px; margin-top: 13px; margin-left: 15px;" alt="minus" title="Minus" /></a>'
                    e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
                    e += "</div>";
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
					
					
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
					///  alert(Shopping.Menu.dishes[F].ingredients);
					  
					var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
					  e += '<div  class="row" style="background-color:#f0eae6; padding:10px; margin-top:20px;width:568px;color:#686B6B;border-radius:10px;float: left;"><span class="caption" style="margin-top:10px; border-radius:10px 10px 0 0;color:black"><h3 style="margin:0px 0 15px 0;">Ingredient</h3></span><span style="float: left; margin: 10px 0 0 10px;font-size: 11px;color: rgb(201, 95, 95);">'
					  for(var ing in ingredientsAll ) {
						  if(ProductOption.in_array(ingredientsAll[ing],arr_opption)) {
							  
					       e += '<div  class="select" style="float:left;"><div class="product_op"><div style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><span class="caption"><div class="inputbox" ><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" checked="checked" value="'+ingredientsAll[ing]+'"   class="checkbox" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;"><span style="font-size: 12px;font-weight: 600;float:left !important;margin-right:5px">'+ingredientsAll[ing]+'</span></div></span></div></div></div>';
						  }
						  else {
							 e += '<div  class="select" style="float:left;"><div class="product_op"><div style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><span class="caption"><div class="inputbox" ><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '"   value="'+ingredientsAll[ing]+'"  class="checkbox" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;"><span style="font-size: 12px;font-weight: 600;float:left !important;margin-right:5px">'+ingredientsAll[ing]+'</span></div></span></div></div></div>';
							  }
						  
						  
					  }
					   
				
					   
					  e += '</span></div>';
					}
					
					
					
                $.each(data['review']['extras_details'],function(index,value)
                {
				//alert("1")
				
                    $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptionCount","id":'+ value['set_id'] +"}]", function (b)
                    {
						//	alert("2")
                        data=JSON.parse(b);
                        console.log(data);
                        ///Shopping.ExtraChoiceForm(data);

                        set_name=data['review']['extras'][0]['text_to_end_user'];
                       /* data=p;*/


                    
                        var i=0;
                        var j=0;
                        var option_count=data['review']['option_counts'].length;
                        var  ingredients=0;
                        count_temp=0;
                        $.each(data['review']['option_counts'],function(index,value)
                        {

                            /*for(var i=0;i<value['count'];i++)
                             {*/
                            ids=[{"id":''+value['option_id']+'',"set_id":''+data['review']['extras'][0]['id']+''}];
                            temp=JSON.stringify(ids);
                            var choices=new Array();
                            var choices_ing=new Array();
                            var flag=0;
                            choices. push({
                                id: "-1",
                                caption: "Select"
                            });
                            choices_ing.push({
                                id:0,
                                caption:'<?=$lang_resource['SELECT_V21']?>'
                            });

                            choices_ing.push({
                                id:"Left_"+value['option_id'],
                                caption:'<?=$lang_resource['PRODUCT_OPTIONS_LEFT']?>'
                            });
                            choices_ing.push({
                                id:"Whole_"+value['option_id'],
                                caption:'<?=$lang_resource['PRODUCT_OPTIONS_WHOLE']?>'
                            });
                            choices_ing.push({
                                id:"Right_"+value['option_id'],
                                caption:'<?=$lang_resource['PRODUCT_OPTIONS_RIGHT']?>'
                            });

							
                            $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptions","id":'+ temp +"}]", function (b)
                            {
								
								Main.Ready();
                                option_data=JSON.parse(b);
								Main.data=JSON.parse(b);
								 var showvalue = "dynamicname-"+value['option_id'];
                                e += '<div  class="row" style="background-color:#f0eae6; padding:10px; margin-top:20px;width:568px;color:#686B6B;border-radius:10px;"><span class="caption" style="float:left;margin-top:10px; border-radius:10px 10px 0 0;color:black"><h3 style="margin:0px 0 15px 0;">' + option_data['review']['extras_details'][0]['text_to_end_user'] + '</h3></span><span style="float: left; margin: 10px 0 0 10px;font-size: 11px;color: rgb(201, 95, 95);">'
								if(option_data['review']['extras_details'][0]['min_sel']>0) {
								e +='(Required)';
								}
								e +='</span><div style="clear:both"></div>';
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(JSON.stringify(option_data['review']['extras_details']))
									//alert(option_value["choice_name"])
									var cname = "dynamicname-"+option_value['option_id'];
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0)
									{
										
										var optionShowvalue = option_value['showoption'];
										//if(Shopping.in_array(opid,arr_opption)) {
											
								/*	if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
											
			  // alert(optionShowvalue)
			  var set_id = option_value['set_id'];
			  var optionShowvalue = option_value['showoption'];
			  var fieldName = showvalue;
			  
			
										  var idss=[{"id":''+optionShowvalue+'',"set_id":set_id}];
										  
										  
										  
										   temps=JSON.stringify(idss);
										 	
										 //  alert(temps)
										   Main.Loading(true)
											 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
															{
											//alert("5")  					  
																
							  ProductOption.showcondition(b,fieldName,optionChoiceId)
																//alert(b)
																// document.getElementById(fieldName).innerHTML = b;
															
															 });	
										  
										   
											}
										   else {
													   if(set_id != "X") {
													  // document.getElementById(fieldName).innerHTML = "";
													   }	
											   }
										   */
			
									//alert("5");  		
									
											     e += '<div  class="select" ><div class="product_op"><div style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><span class="caption"><div class="inputbox">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],true,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],optionChoiceId,option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<span style="font-size: 12px;font-weight: 600;">'+  option_value['choice_name']  +'</span><br><br><span id='+option_value["choice_name"].replace(" ","1")+' style="margin:0 0 0 16px;">+$'+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div></div></div>';
												 
												
										
									
                            
									}
										
										
								
										
                                    /*    e += '<div class="select" style="margin-left:30px;"><div style="float:left;"><span class="caption"><input style="width:10%;border:1px solid red;" type="checkbox" id="choice"'+j+' class="checkbox" value="' + option_value['choice_name'] + '"/>&nbsp;&nbsp;'+  option_value['choice_name']  +'&nbsp;&nbsp;</span><div style="margin-left:10px;">'+option_value['price']+'</div></div></div>';*/
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
                                        /*  e += '<div class="row"><span class="caption">Conditional:</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_conditional",conditional,[], false,"Business.ConditionalSelected(this)") + "</div></div>";*/

                                        choices. push({
                                            id: option_value['choice_id'],
                                            caption: option_value['choice_name']+" - "+"Price: "+option_value['price']
                                        });

                                        flag=1;
                                    }
                                    if(option_value['ingredients']=="t"){
                                        ingredients=1;
                                    }
                                  });
								  
								//alert("6");  	
                              if(flag==1) {
                               // e += '<div class="select" ><div style="float:left;"><span class="caption" ><div class="inputbox">' + Forms.CreateSelectPropertyChoice("extras_details", "choice_name_drop-"+value["option_id"],choices,[], false,"Shopping.ChangePrice(this,"+option_data['review']['extras_details'][0]['option_id']+","+option_data['review']['extras_details'][0]['set_id']+")") + '</div>&nbsp;&nbsp;</span><div id="choice_price'+value["option_id"]+'"style="padding:10px;display:none;"></div></div></div>';
								 e += '<div class="select" ><div class="product_op">';
								
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									var ticksradio =''
									var cname = "dynamicname-"+option_value['option_id'];
									
										
									
										if(ProductOption.in_array(option_value["choice_id"],optionChoiceId_arr)) {
											
						
						var optionShowvalue = option_value['showoption'];
											
				if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
			  // alert(optionShowvalue)
			  var set_id = option_value['set_id'];
			  var optionShowvalue = option_value['showoption'];
			  var fieldName = showvalue;
			  
			
		  var idss=[{"id":''+optionShowvalue+'',"set_id":set_id}];
		  
		  
		  
           temps=JSON.stringify(idss);
		 
		 //  alert(temps)
		   Main.Loading(true)
		     $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
                            {
								  
								
								   ProductOption.showcondition(b,fieldName,optionChoiceId)
								//alert(b)
								// document.getElementById(fieldName).innerHTML = b;
							
							 });	
		  
		   
		    }
		   else {
			   
					   if(set_id != "X") {
						     
					  // document.getElementById(fieldName).innerHTML = "";
					   }
					 
			   }
		   
										e += '<div style="float:left; margin: 0 30px 15px 0;"><span class="caption" ><div class="inputbox">' + Forms.CreateRadioPropertyChoice("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], true,option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<span style="font-size: 12px;font-weight: 600;">'+option_value['choice_name']+"</span><br><br><span style='margin:0 0 0 16px;'>"+"+$"+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div>';	
										} else {
										e += '<div style="float:left; margin: 0 30px 15px 0;"><span class="caption" ><div class="inputbox">' + Forms.CreateRadioPropertyChoice("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], false,option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<span style="font-size: 12px;font-weight: 600;">'+option_value['choice_name']+"</span><br><br><span style='margin:0 0 0 16px;'>"+"+$"+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div>';	
											}
											
												
								 });			
								 e +='</div></div>';
							 }
							  e +='</div>';
                                i++;
							  
                                if(ingredients==1){
					
						var stores = "[]";
					
				//	alert(JSON.stringify(value));
						if(productOption.search("Left") !=-1) {	
						
						   stores = "Left_"+value['option_id'];
						
						   
						  
						}
						else if(productOption.search("Right") !=-1) {	
							
							   stores = "Right_"+value['option_id'];
							   
						} 
							else if(productOption.search("Whole") !=-1) {	
							
							    stores = "Whole_"+value['option_id'];
							
							
							}
						    
                                    e += '<span class="caption" style="margin-top:-52px;float:right;color:gray;"><h3 style="margin-left:10px;"></h3></span><div style="clear:both"></div><div class="select" style="padding:10px; float:left;background-color:#f0eae6;margin-left:5px;width:568px; border-radius:0 0 10px 10px;"><div style="float:left;"><span class="caption" ><div class="inputbox"style="margin:0 16px 10px 16px !important;">' + Forms.CreateSelectPropertyChoiceext("extras_details", "choice_ingredients-"+value["option_id"],choices_ing,stores, '',"ProductOption.ChangeIngredient(this)",true,'','',optionChoiceId) + '<span id="ing_1" style="display:none;position: relative; left: 100px; top: -19px;" ><img src="panel/theme/left.png" /></span><span id="ing_2"  style="display:none;position: relative; left: 100px; top: -19px;"><img src="panel/theme/whole.png" /></span><span id="ing_3"  style="display:none;position: relative; left: 100px; top: -19px;" ><img src="panel/theme/right.png" /></span></div>&nbsp;&nbsp;</span></div></div>';
                                    ingredients=0;
							//	}
                              }
							  
							  e +='<div id="'+showvalue+'" style="clear:both;"></div>';  

                                if(i>=option_data['review']['extras_details'].length)
                                {
                                 e +="<div style='clear:both;'></div>";

                                }
                                count_temp++;
                                if(data['review']['option_counts'].length<=count_temp){

                                    set_temp_count++;
                                    count_temp=0;

                                }

                                if(set_temp_count>set_count)
                                {
                                  //  alert("hii");
								  var is=0;
                                    e += "</div>";
									e += '<div style="clear:both; width:100%; margin: 20px 0 0 5px;float: left;"><h3 style="color:#000;margin: 0 0 10px 0;font-size: 15px; !important">Special Instruction</h3><textarea  style="border-radius:10px; box-shadow:inset 0 0 20px 1px rgba(0,0,0,0.1); width:587px; min-width:587px; max-width:587px; height:87px; max-height:87px; min-height:87px;" placeholder="Add Special Instruction" onkeyup="ProductOption.optionCommentUpdate(this)">'+Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments)+'</textarea></div>';
                                    e += "</div>";
									 e += "</div>";

                                  Popup.ShowNew(700, "", e,ProductOption.EditEndUserChoices, null,null)
								  
								  if(productOption.indexOf("Left")>-1)
							   {
								   
								   $("#ing_1").css('display','block');
								   $("#ing_2").css('display','none');
								   $("#ing_3").css('display','none');
							   }
							else if(productOption.indexOf("Whole")>-1)
							   {
								   $("#ing_1").css('display','none');
								   $("#ing_2").css('display','block');
								   $("#ing_3").css('display','none');
							   }
							   else if(productOption.indexOf("Right")>-1)
							   {
								   $("#ing_1").css('display','none');
								   $("#ing_2").css('display','none');
								   $("#ing_3").css('display','block');
							   }	
					
                                }
							

                            });

                        });

                    });

                    div_data=null;
                    div_data=edit_id;


                    /*r += '&nbsp;&nbsp;<a style="color:gray;margin-top:10px;" href="javascript:void(0);" onclick="Shopping.add_sets('+id+','+value['set_id']+')">'+value['name']+'</a><br/>';
                    count++;
                    if(count>=data['review']['extras_details'].length){
                        {
                           r +='<br/>&nbsp;&nbsp;<a style="color:Red;margin-top:50px;" href="javascript:void(0);" onclick="Shopping.add_to_cart()">DO not add sets</a> </div>';
                          //Popup.ShowUp(300, 300, r,null, null,null);

                        }

                    }*/

                });

            });
        cart_object=cart;
        cart_id=edit_id;

    },
	 showcondition:function(b,fieldName,productOptions){
		if(productOptions) {
           var	productOptionss = productOptions; 
		  // var arr_opptions = productOptions.split(", "); 
		}
		else {
			var productOptionss = '';
		//	var arr_opptions = new Array();
			}
							/*	alert(b)
								alert(fieldName)*/
								 Main.Ready(true);
								option_data=JSON.parse(b);
								//alert(JSON.stringify(option_data))
								//Main.data=JSON.parse(b);
								var k='';
													
								/*if(value['conditional'] == "yes") {
									k ="display:none";
								}
								
*/			       var  e ="";
				  // var showvalue = "dynamicname-"+value['option_id'];
				  
                                e += '<div  class="row" style="background-color:#f0eae6; padding:10px; margin-top:20px;width:568px;color:#686B6B;border-radius:10px;"><span class="caption" style="float:left;margin-top:10px; border-radius:10px 10px 0 0;color:black"><h3 style="margin:0px 0 15px 0;">' + option_data['review']['extras_details'][0]['text_to_end_user'] + '</h3></span><span style="float: left; margin: 10px 0 0 10px;font-size: 11px;color: rgb(201, 95, 95);">'
								
								if(option_data['review']['extras_details'][0]['min_sel']>0) {
								e +='(Required)';
								}
								e +='</span><div style="clear:both"></div>';
								
							 
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(option_value["choice_name"])
									var cname = "dynamicname-"+option_value['option_id'];
									
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0) {
										
										//alert(productOptionss)
							// e += '<div  class="select" ><div style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><span class="caption"><div class="inputbox">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],false,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],'',option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<span style="font-size: 12px;font-weight: 600;">'+  option_value['choice_name']  +'</span><br><br><span id='+option_value["choice_name"].replace(" ","1")+' style="margin:0 0 0 16px;">+$'+option_value['price']+'</span></div></span></div></div>';
					 e += '<div  class="select" ><div class="product_op"><div style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><span class="caption"><div class="inputbox">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],true,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],productOptionss,option_value['showoption'],option_value["choice_id"],option_value["set_id"])+'<span style="font-size: 12px;font-weight: 600;">'+  option_value['choice_name']  +'</span><br><br><span id='+option_value["choice_name"].replace(" ","1")+' style="margin:0 0 0 16px;">+$'+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div></div></div>';
					 
									}
										
							
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=1){
                                        /*  e += '<div class="row"><span class="caption">Conditional:</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_conditional",conditional,[], false,"Business.ConditionalSelected(this)") + "</div></div>";*/

                                       

                                        flag=1;
                                    }
                                    /*if(option_value['ingredients']=="t"){
                                        ingredients=1;
                                    }*/
                                  });
								// alert("22")	
								
                              if(flag==1) {
                               // e += '<div class="select" ><div style="float:left;"><span class="caption" ><div class="inputbox">' + Forms.CreateSelectPropertyChoice("extras_details", "choice_name_drop-"+value["option_id"],choices,[], false,"Shopping.ChangePrice(this,"+option_data['review']['extras_details'][0]['option_id']+","+option_data['review']['extras_details'][0]['set_id']+")") + '</div>&nbsp;&nbsp;</span><div id="choice_price'+value["option_id"]+'"style="padding:10px;display:none;"></div></div></div>';
								 e += '<div class="select" ><div class="product_op">';
								 
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
								
							
									//alert(option_value['choice_id'])
									/*if(option_value['choice_id'] == 76) {
										alert(option_value['showoption'])
										}*/
									/*if(option_value['showoption']){
										alert(option_value['showoption'])
										}*/
									//alert(JSON.stringify(option_data['review']['extras_details']))
									
									var cname = "dynamicname-"+option_value['option_id'];
									e += '<div style="float:left; margin: 0 30px 15px 0;"><span class="caption" ><div class="inputbox">' + Forms.CreateRadioPropertyChoice("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+option_value["option_id"],option_value['choice_id'], false,option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],'X') + '<span style="font-size: 12px;font-weight: 600;">'+option_value['choice_name']+"</span><br><br><span style='margin:0 0 0 16px;'>"+"+$"+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div>';	
									
									
								// e += '<div style="float:left; margin: 0 30px 15px 0;"><span class="caption" ><div class="inputbox"><input style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" type="radio" id="'+option_value['choice_id']+'" name="choice_name_drop'+value["option_id"]+'"><span style="font-size: 12px;font-weight: 600;">'+option_value['choice_name']+"</span><br><br><span style='margin:0 0 0 16px;'>"+"+$"+option_value['price']+'</span></div></span></div>';					
								 });			
								 e +='</div></div>';
							 }
							  e +='</div>';
                                i++;
							
                                /*if(ingredients==1){
                                    e += '<span class="caption" style="margin-top:-52px;float:right;color:gray;"><h3 style="margin-left:10px;"></h3></span><div style="clear:both"></div><div class="select" style="padding:10px; float:left;background-color:#f0eae6;margin-left:5px;width:568px; border-radius:0 0 10px 10px;"><div style="float:left;"><span class="caption" ><div class="inputbox"style="margin:0 16px 10px 16px !important;">' + Forms.CreateSelectPropertyChoiceext("extras_details", "choice_ingredients-"+option_value["option_id"],choices_ing,[], '',"Shopping.ChangeIngredient(this)",true) + '<span id="ing_1" style="display:none;position: relative; left: 100px; top: -19px;" ><img src="panel/theme/left.png" /></span><span id="ing_2"  style="display:none;position: relative; left: 100px; top: -19px;"><img src="panel/theme/whole.png" /></span><span id="ing_3"  style="display:none;position: relative; left: 100px; top: -19px;" ><img src="panel/theme/right.png" /></span></div>&nbsp;&nbsp;</span></div></div>';
                                    ingredients=0;
                                }*/
								
								//e +='<div id="'+showvalue+'" style="clear:both;"></div>';  
                     
                                if(i>=option_data['review']['extras_details'].length)
                                {
                                 e +="<div style='clear:both;'></div>";

                                }
								
								
								
								
                                count_temp++;
                                if(data['review']['option_counts'].length<=count_temp){

                                    set_temp_count++;
                                    count_temp=0;

                                }
								
                                if(set_temp_count>set_count)
                                {
                                  //  alert("hii");
								  var is=0;
                                    e += "</div>";
									
									
                                    e += "</div>";
									 e += "</div>";

                       
        
                                }

                       document.getElementById(fieldName).innerHTML = e;       
                    
		 },
    add_sets:function(id,set_id){

        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptionCount","id":'+ set_id +"}]", function (b)
        {
            data=JSON.parse(b);
            console.log(data);
            Shopping.ExtraChoiceForm(data);
        });
        div_data=null;
        div_data=id;
    },
SaveEndUserChoices: function(){
		
		
		//alert(JSON.stringify(Main.data['review']['extras_details'][0]))
	//alert(JSON.stringify(Forms.Form.extras_details.fields))
		//alert(JSON.stringify(Forms.Form.extras_details))
        if (Forms.CanSave("extras_details") == false) {
            return
        }
		var sp = new Array();
	//alert(JSON.stringify(Forms.Form.extras_details.fields))
	for(k in Forms.Form.extras_details.fields)
	{
		if(!ProductOption.in_array(Forms.Form.extras_details.fields[k].name,sp)) {
			if(Main.NullToEmpty(Forms.Form.extras_details.fields[k].name)!="") {
		 sp.push(Forms.Form.extras_details.fields[k].name)
			}
	 //alert(Forms.Form.extras_details.fields[k].name)	
		}
	}
	//(JSON.stringify(sp))
	for(s in Forms.Form ) {
		  // alert(JSON.stringify(sp))
			//alert(Forms.Form[s].name)
			//alert(JSON.stringify(Forms.Form[s]))
			
			if(ProductOption.in_array(Forms.Form[s].name,sp)) {
			
			//alert(JSON.stringify(Forms.Form[s]))
			if(Forms.Form[s].counti<Forms.Form[s].mini) {
				
			/*	if(Forms.Form[s].text == "Pizza ingredient") {
						alert("Please select Pizza ingredient");
						return false ;
				}
				else {*/
					alert("Minimum "+Forms.Form[s].mini+' need to be add in '+Forms.Form[s].text);
				    return false ;
				//	}
			}
				else {
					delete Forms.Form[s];
					}
		//alert(JSON.stringify(Forms.Form[s]));
		}
		}
	//	Shopping.Cart.business[0].dishes.quantity = quantitysec;
     //   Forms.PrepareForSaving("extras_details");
        /*delete Forms.Form.extra_details.extra_details;*/
        console.log( Forms.Form.extras_details.fields);
        console.log( Forms.Form.extras_details);
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
		
		
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetTotalPrices","ids":'+JSON.stringify(Forms.Form.extras_details)+"}]", function (b)
            {
				
			
				
				
                b=JSON.parse(b);
				
				//alert(b.review.choice_allid)

                mychoice_data[choice_count++]=b;
				//alert(div_data)
               var total_price = Main.GetPropertyValueOnPropertyValueFound(Shopping.Menu.dishes, "id", div_data, "price");
                total_price = parseFloat(parseFloat(total_price) + parseFloat(b['review']['price'])).toFixed(Main.IS_DECIMAL_POINT);
				
                total_price = Shopping.FormatPrice(Shopping.FixToDecimal(total_price.toString()));
               //document.getElementById("dish_" + div_data + "_price").innerHTML = total_price;
			   
			 //  alert(total_price)
			   
               var temp='';
			    if(Shopping.ingredientStore.length>0) {
			   temp=Shopping.ingredientStore.join(", ")+", ";
			   }
               var l=0;
                $.each(b['review']['choice_array'],function(choice_index,choice_value)
                {
                 if(l==0)
                        temp=temp+choice_value;
                    else
                        temp=temp+', '+choice_value;
                    l++
                 });
				 
				  
               console.log(temp);
			  if(b['review']['comments']) {
				  var comresolt = b['review']['comments']
				  } else {
					 var comresolt = "";  
					  }
					  
					 // alert(cart_id)
			  Shopping.AddToCart(cart_object,'' + cart_id + '',temp,comresolt,b.review.choice_allid,total_price);
			    quantitysec = 0;
                cart_object=null;
                cart_id=null;
            });

        Popup.Close();
        Forms.Clean("extras_details")
    },
	AddFromCart :function (c, d) {
		
//	alert(d)
		//alert(JSON.stringify(Shopping.Cart.business))
		  var  quantity=Shopping.Cart.business[c].dishes[d].quantity;
       if(quantity<1){
     /*   Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/remove/" + Shopping.Cart.business[c].name + "-" + Shopping.Cart.business[c].dishes[d].name);
        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart");
       
            Cart.business[c].dishes.splice(d, 1);
        if (Shopping.Cart.business[c].dishes.length == 0)
        {
            Shopping.Cart.business.splice(c, 1)
        }
	$(".rowid_"+d).remove();*/
	lastid -= 1;
	var n = "";
	if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
			//console.log(Shopping.Cart.business[0].dishes[i]);
			n += '<div class="rgt_lft row rowid_'+i+'">';
			n += '<div class="fst_lfg">';
			n += '<span>' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + '</span>';

			n += '<span class="vsml hand" onclick="ProductOption.AddFromCart(  0, ' + i + ')" >'+Shopping.Cart.business[0].dishes[i].quantity+'</span>';
			n += '<span class="xspn">X</span>';

            n += '</div>';
			n += '<div class="scd_lfg">';
			n += '<span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</span>';
			n += '<img src="../../images/07plus.png" style="width: 33px; cursor:pointer; float: right; margin-right: -14px; " onclick="ProductOption.AddFromCart(  0, ' + i + ')" /><div onclick="Shopping.RemoveFromCart(  0, ' + i + ')" class="removefromcart hand" style="float: right; margin-right: 3px; margin-top: -24px;"><img src="panel/theme/en/minus_img.png" /></div>';
			
			if(Shopping.Cart.business[0].dishes[i].options) {
            n +='<div style="font-size:12px; width: 190px;line-height: 16px; margin-left: -121px; word-wrap: break-word;"><a href="javascript:void(0)"   onclick="ProductOption.EditCartOptions('+choice_count+','+ i +')"  style="color: #f50;font-weight: bold;">'+Shopping.Cart.business[0].dishes[i].options+'</a></div>';	
			
			}
			if(Shopping.Cart.business[0].dishes[i].comments) {
		n +='<div style="font-size:12px; width: 190px;line-height: 16px; margin-left: -121px; word-wrap: break-word;"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+ i +')" style="display:block;margin:10px 0 0 0;color:#313131; font-weight: bold;">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].comments)+'</a></div>';
		}
            n += '</div>';
			n += '</div>';

			//$("#plc_rgt_in").append(n);
		}del = 1;
	}
                    Shopping.UpdateCartTotals();
        //Shopping.PopulateCart();
        if (Shopping.GetCartItemsCount() <= 0)
        {
            Popup.Close();
            // document.getElementById("popupmainbuttonok").style.display = "block"
        }
	$("#plc_rgt_in").html(n);
        }
        else{
			//alert("p")
  		 n ='';
	
         var total=parseFloat(Shopping.Cart.business[c].dishes[d].total);
           total=total/quantity;
          var quantity=quantity+1;
		  
		

		if(mychoice_data[d]) {
           mychoice_data[d]['review']['quantity']=quantity;
		}

           Shopping.Cart.business[c].dishes[d].quantity=quantity;
		   
           Shopping.Cart.business[c].dishes[d].total=parseFloat(Shopping.Cart.business[c].dishes[d].total)+total;
           if (Shopping.Cart.business.length != 0) {
               for (var i = 0;i <= lastid;i++){
				  
				  
                   //console.log(Shopping.Cart.business[0].dishes[i]);
                   n += '<div class="rgt_lft row rowid_'+i+'">';
                   n += '<div class="fst_lfg">';
                   n += '<span>' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + '</span>';

                   n += '<span class="vsml hand" onclick="ProductOption.AddFromCart(  0, ' + i + ')">'+Shopping.Cart.business[0].dishes[i].quantity+'</span>';
                   n += '<span class="xspn">X</span>';

                   n += '</div>';
                   n += '<div class="scd_lfg">';
                   n += '<span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</span>';
                    n += '<img src="../../images/07plus.png" style="width: 33px; cursor:pointer; float: right; margin-right: -14px; " onclick="ProductOption.AddFromCart(  0, ' + i + ')" /><div onclick="Shopping.RemoveFromCart(  0, ' + i + ')" class="removefromcart hand" style="float: right; margin-right: 3px; margin-top: -24px;"><img src="panel/theme/en/minus_img.png" /></div>';
                   
				   if(Shopping.Cart.business[0].dishes[i].options) {
				   n +='<div style="font-size:12px; width: 190px;line-height: 16px; margin-left: -121px; word-wrap: break-word;"><a href="javascript:void(0)"  onclick="ProductOption.EditCartOptions('+choice_count+','+i+')" style="color: #f50;font-weight: bold;">'+Shopping.Cart.business[0].dishes[i].options+'</a></div>';
				   }
				   if(Shopping.Cart.business[0].dishes[i].comments) {
		n +='<div style="font-size:12px; width: 190px;line-height: 16px; margin-left: -121px; word-wrap: break-word;"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+ i +')" style="display:block;margin:10px 0 0 0;color:#313131; font-weight: bold;">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].comments)+'</a></div>';
		}
			       n += '</div>';
                   n += '</div>';

                   //$("#plc_rgt_in").html(n);
               }
			   del = 1;
           }
		  
           Shopping.UpdateCartTotals();
           //Shopping.PopulateCart();
           if (Shopping.GetCartItemsCount() <= 0)
           {
               Popup.Close();
               // document.getElementById("popupmainbuttonok").style.display = "block"
           }
		   	 
           $("#plc_rgt_in").html(n);
		   	  

       }
		
		},
	in_array: function(search, array) {
				 for (i = 0; i < array.length; i++)
				{
				if(array[i] ==search )
				{
				return true;
				}
				}
				return false;
		},
	   add_to_cart:function(){
        Shopping.AddToCart(cart_object,'' + cart_id + '');
        cart_object=null;
        cart_id=null;
        Popup.Close();
    },
	
   
	 optionCommentUpdate:function(d){
		
		   Forms.Form.extras_details.comments = d.value;
		
		 },
    EditEndUserChoices:function(){
			//alert(JSON.stringify(Main.data['review']['extras_details'][0]))
	//	alert(JSON.stringify(Main.data))
		//alert(JSON.stringify(Forms.Form.extras_details))
		
        if (Forms.CanSave("extras_details") == false) {
            return
        }
		if(!Forms.Form.extras_details.comments) {
		//	alert(Forms.Form.extras_details.edit_id)
			var edit_id = Forms.Form.extras_details.edit_id;
			
			Forms.Form.extras_details.comments = Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments);
			}
	//alert(JSON.stringify(Forms.Form.extras_details))
/*	for(s in Forms.Form ) {
		if(Forms.Form[s].name) {
			//alert(JSON.stringify(Forms.Form[s]))
			if(Forms.Form[s].counti<Forms.Form[s].mini) {
				
				alert("Minimum "+Forms.Form[s].mini+' need to be add in '+Forms.Form[s].text);
				return ;
				}
		//alert(JSON.stringify(Forms.Form[s]));
		}
		}*/
	//	Shopping.Cart.business[0].dishes.quantity = quantitysec;
     //   Forms.PrepareForSaving("extras_details");
        /*delete Forms.Form.extra_details.extra_details;*/
		
        console.log( Forms.Form.extras_details.fields);
        console.log( Forms.Form.extras_details);
        var e = true;
        Main.Loading();
        var d = new Date().getTime();
        Main.Aid = d;
		edit_id=Forms.Form.extras_details.edit_id;
		//alert(edit_id)
		//alert(JSON.stringify(Forms.Form.extras_details))
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetTotalPrices","ids":'+JSON.stringify(Forms.Form.extras_details)+"}]", function (b)
            {
				alert(b)
                b=JSON.parse(b);

                mychoice_data[choice_count++]=b;
				Main.Ready()

              var item_id = Shopping.Cart.business[0].dishes[edit_id].id
			  var Fi = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", item_id);
			  var J = Shopping.Menu.dishes[Fi];
          
			var total_price = parseFloat(parseFloat(J.price) + parseFloat(b['review']['price'])).toFixed(Main.IS_DECIMAL_POINT);		
              //  total_price = parseFloat(b['review']['price'])+parseFloat.toFixed(Main.IS_DECIMAL_POINT)
               // total_price = Shopping.FormatPrice(Shopping.FixToDecimal(total_price.toString()));
               //document.getElementById("dish_" + div_data + "_price").innerHTML = total_price;
			  
               var temp='';
			   if(Shopping.ingredientStore.length>0) {
			   temp=Shopping.ingredientStore.join(", ")+", ";
			   }
			   
               var l=0;
                $.each(b['review']['choice_array'],function(choice_index,choice_value)
                {
                 if(l==0)
                        temp=temp+choice_value;
                    else
                        temp=temp+', '+choice_value;
                    l++
                 });
               console.log(temp);
			    if(b['review']['comments']) {
				  var comresolt = b['review']['comments']
				  } else {
					 var comresolt = "";  
					  }
			    Shopping.Cart.business[0].dishes[edit_id].quantity = quantitysec;
				Shopping.Cart.business[0].dishes[edit_id].options = temp;
				Shopping.Cart.business[0].dishes[edit_id].comments = comresolt;
				Shopping.Cart.business[0].dishes[edit_id].price = total_price;
				//alert(b['review']['choice_allid'])
				Shopping.Cart.business[0].dishes[edit_id].optionChoiceId = b['review']['choice_allid'];
				Shopping.Cart.business[0].dishes[edit_id].total = parseFloat(parseFloat(total_price)*quantitysec).toFixed(Main.IS_DECIMAL_POINT);
				
				
				
				///Shopping.Cart.business[0].dishes[edit_id].total = total_price;
				// Shopping.UpdateCartTotals();
			var n = "";	
                if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
			//console.log(Shopping.Cart.business[0].dishes[i]);
			n += '<div class="rgt_lft row rowid_'+i+'">';
			n += '<div class="fst_lfg">';
			n += '<span>' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + '</span>';

			n += '<span class="vsml hand" onclick="ProductOption.AddFromCart(  0, ' + i + ')" >'+Shopping.Cart.business[0].dishes[i].quantity+'</span>';
			n += '<span class="xspn">X</span>';

            n += '</div>';
			n += '<div class="scd_lfg">';
			n += '<span id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</span>';
			n += '<img src="../../images/07plus.png" style="width: 33px; cursor:pointer; float: right; margin-right: -14px; " onclick="ProductOption.AddFromCart(  0, ' + i + ')" /><div onclick="Shopping.RemoveFromCart(  0, ' + i + ')" class="removefromcart hand" style="float: right; margin-right: 3px; margin-top: -24px;"><img src="panel/theme/en/minus_img.png" /></div>';
			
			if(Shopping.Cart.business[0].dishes[i].options) {
            n +='<div style="font-size:12px; width: 190px;line-height: 16px; margin-left: -121px; word-wrap: break-word;"><a href="javascript:void(0)"   onclick="ProductOption.EditCartOptions('+choice_count+','+ i +')"  style="color: #f50;font-weight: bold;">'+Shopping.Cart.business[0].dishes[i].options+'</a></div>';	
			
			}
			if(Shopping.Cart.business[0].dishes[i].comments) {
		n +='<div style="font-size:12px; width: 190px;line-height: 16px; margin-left: -121px; word-wrap: break-word;"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+ i +')" style="display:block;margin:10px 0 0 0;color:#313131; font-weight: bold;">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].comments)+'</a></div>';
		}
            n += '</div>';
			n += '</div>';

		    $("#plc_rgt_in").html(n);
		}del = 1;
	}
                    Shopping.UpdateCartTotals();
			 // Shopping.AddToCart(cart_object,'' + edit_id + '',temp);
			    quantitysec = 0;
                cart_object=null;
                cart_id=null;
            });

        Popup.Close();
        Forms.Clean("extras_details")
    },
		additem: function (val)
    {
		
		if(val == 1)
		{
			quantitysec++;
			document.getElementById("amountsec").innerHTML = "Quantity ("+quantitysec+")";
			$("#amountsecminus").show();
			
			
		}
		else if(val == 2)
		
		{
			
			if(quantitysec == 1){$("#amountsecminus").hide();}else{
			quantitysec--;
			document.getElementById("amountsec").innerHTML = "Quantity ("+quantitysec+")";
			if(quantitysec == 1){$("#amountsecminus").hide();}
			
			}

							
		}
	},	
	 ChangeIngredient: function(b){
		
		var confirmingredient= confirm("Is this Pizza Ingredient ?");
    if (confirmingredient== true){
       ch_id=b.options[b.selectedIndex].value;
		
           if(ch_id.indexOf("Left")>-1)
           {
               $("#ing_1").css('display','block');
               $("#ing_2").css('display','none');
               $("#ing_3").css('display','none');
           }
        else if(ch_id.indexOf("Whole")>-1)
           {
               $("#ing_1").css('display','none');
               $("#ing_2").css('display','block');
               $("#ing_3").css('display','none');
           }
           else if(ch_id.indexOf("Right")>-1)
           {
               $("#ing_1").css('display','none');
               $("#ing_2").css('display','none');
               $("#ing_3").css('display','block');
           }
    }else{
     
	   document.getElementById(b.id).getElementsByTagName('option')[0].selected = 'selected';
	   		   $("#ing_1").css('display','none');
               $("#ing_2").css('display','none');
               $("#ing_3").css('display','none');
    }
	
        

        /*  for(i=1;i<=3;i++){
            if(i==ch_id)
            $("#ing_"+i).css('display','block');
            else
           $("#ing_"+i).css('display','none');
        }*/
    },
   
   ChangePrice:function(b,option_id,set_id){
        ch_id=b.options[b.selectedIndex].value;
         ids=[{"choice_id":''+ch_id+'',"set_id":''+set_id+'',"option_id":''+option_id+''}];
        console.log(ids);
        temp=JSON.stringify(ids);
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetPrices","ids":'+ temp +"}]", function (b)
            {
                data =JSON.parse(b);

                $("#popupbox").find("#choice_price"+option_id).html(data['review']['option_prices'][0]['price']);
                $.each(data['review']['choice_prices'],function(choice_index,choice_value)
                {
                    $("#popupbox").find("#"+choice_value['choice_name'].replace(" ","1")).html(choice_value['price']);
                    /*$("#popupbox").find("#"+choice_value['choice_id']).replace('<div id="'+choice_value['choice_id']+'" class="inputbox">' +Forms.CreateCheckBoxProperty("extras_details", 'choice_name-'+ch_id+'',false)+'</div>');*/
                    /*console.log(("#"+choice_value['choice_id']));*/
                });
            });
       },
	  EditCartOptions:function(count,i)
    {
		
    console.log(Shopping.Cart.business[0].dishes[i]);
    ProductOption.edit_product_options(Shopping.Cart.business[0].dishes[i].id,i);

    },  
    add_product_options:function(cart,id){
		
		//alert(Main.Busy);
	   if (Main.Busy) {
		   return false;
		   }
		Shopping.ingredientStore = new Array();
		Main.Loading();

        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
	
                data=JSON.parse(b);
			
				//alert(data.length)
          /*       r = '<div  id="' +id + '_extras"><h4>You can choose following Sets</h4><br/>';*/
                flag=0;
               count=0;
               var e='';
			   	set_count= data['review']['extras_details'].length;
				
				/*if(set_count == 0) {
					Main.Ready();
					Shopping.AddToCartOld(cart,id);
					return false;
					}*/
				
                Forms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
				
                Forms.Form.extras_details.type = "create";
                //*  if (Forms.Form.business.type == "modify") {
                ///Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
                var e=null;
                //}*//*
                Forms.Form.extras_details.extras_details = d;
                this.ActiveForm = "extras_details";
                
                set_temp_count=1;
				var	e = '';
				    e += '<div style="background-color:#c71100;color:white;height:50px;line-height:50px;font-weight:bold;font-size:18px; border-radius:10px 10px 0 0;">';
                    e += '<span class="title" style="margin-left:10px;"><?= $lang_resource['PRODUCT_POTIONS_SELECT_OPTIONS'] ?></span>'
					e += '<span class="title" style="margin-left:175px;" id="amountsec">Quantity  (1)</span>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="ProductOption.additem(1)" id="amountsecadd" ><img id="panelimgsu" src="../../images/06plus.png" alt="Add" title="Add" style="width: 24px; position: absolute; margin-top: 12px; margin-left: -5px;" /></a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="ProductOption.additem(2)" id="amountsecminus" style="display:none; "><img id="panelimgsu" src="../../images/05minus.png" style="position: absolute; width: 22px; margin-top: 13px; margin-left: 15px;" alt="minus" title="Minus" /></a>'
                    e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
                    e += "</div>";
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
					 
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
					///  alert(Shopping.Menu.dishes[F].ingredients);
					  
					var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
						
					  e += '<div  class="row" style="background-color:#f0eae6; padding:10px; margin-top:20px;width:568px;color:#686B6B;border-radius:10px;float: left;"><span class="caption" style="margin-top:10px; border-radius:10px 10px 0 0;color:black"><h3 style="margin:0px 0 15px 0;">Ingredient</h3></span><span style="float: left; margin: 10px 0 0 10px;font-size: 11px;color: rgb(201, 95, 95);">'
					  for(var ing in ingredientsAll ) {
						  
						   
						 Shopping.ingredientStore.push(ingredientsAll[ing]);		
								
								
					   e += '<div  class="select" style="float:left;"><div style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><div class="product_op"><span class="caption"><div class="inputbox" ><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="checkbox" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"><span style="font-size: 12px;font-weight: 600;float:left !important;margin-right:5px">'+ingredientsAll[ing]+'</span></div></span></div></div></div>';
					  }
					   
					  
					   
					  e += '</span></div>';
					}
				
                $.each(data['review']['extras_details'],function(index,value)
                {
				
				
                    $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptionCount","id":'+ value['set_id'] +"}]", function (b)
                    {
						
						
                        data=JSON.parse(b);
                        console.log(data);
                        ///Shopping.ExtraChoiceForm(data);

                        set_name=data['review']['extras'][0]['text_to_end_user'];
                       /* data=p;*/


                    
                        var i=0;
                        var j=0;
                        var option_count=data['review']['option_counts'].length;
                        var  ingredients=0;
                        count_temp=0;
                        $.each(data['review']['option_counts'],function(index,value)
                        {
							//alert(value['option_id'])
                            /*for(var i=0;i<value['count'];i++)
                             {*/
                            ids=[{"id":''+value['option_id']+'',"set_id":''+data['review']['extras'][0]['id']+''}];
                            temp=JSON.stringify(ids);
                            var choices=new Array();
                            var choices_ing=new Array();
                            var flag=0;
                            choices. push({
                                id: "-1",
                                caption: "Select"
                            });
                            choices_ing.push({
                                id:0,
                                caption:'<?=$lang_resource['SELECT_V21']?>'
                            });

                            choices_ing.push({
                                id:"Left_"+value['option_id'],
                                caption:'<?=$lang_resource['PRODUCT_OPTIONS_LEFT']?>'
                            });
                            choices_ing.push({
                                id:"Whole_"+value['option_id'],
                                caption:'<?=$lang_resource['PRODUCT_OPTIONS_WHOLE']?>'
                            });
                            choices_ing.push({
                                id:"Right_"+value['option_id'],
                                caption:'<?=$lang_resource['PRODUCT_OPTIONS_RIGHT']?>'
                            });


                            $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptions","id":'+ temp +"}]", function (b)
                            {
								//alert(b)
								Main.Ready();
                                option_data=JSON.parse(b);
								Main.data=JSON.parse(b);
								var k='';
								
								/*if(value['conditional'] == "yes") {
									k ="display:none";
								}
*/							   var showvalue = "dynamicname-"+value['option_id'];
                                e += '<div  class="row" style="background-color:#f0eae6; padding:10px; margin-top:20px;width:568px;color:#686B6B;border-radius:10px;"><span class="caption" style="float:left;margin-top:10px; border-radius:10px 10px 0 0;color:black"><h3 style="margin:0px 0 15px 0;">' + option_data['review']['extras_details'][0]['text_to_end_user'] + '</h3></span><span style="float: left; margin: 10px 0 0 10px;font-size: 11px;color: rgb(201, 95, 95);">'
								
								if(option_data['review']['extras_details'][0]['min_sel']>0) {
								e +='(Required)';
								}
								e +='</span><div style="clear:both"></div>';
								
								
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(option_value["choice_name"])
									var cname = "dynamicname-"+option_value['option_id'];
									
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0) {
										
                                        e += '<div  class="select" ><div class="product_op"><div  style="float:left; margin: 0 30px 15px 0; width: 105px !important;"><span class="caption"><div class="inputbox">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],false,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],'',option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<span style="font-size: 12px;font-weight: 600;">'+  option_value['choice_name']  +'</span><br><br><span id='+option_value["choice_name"].replace(" ","1")+' style="margin:0 0 0 16px;">+$'+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div></div></div>';
									}
										
										
								
										
                                    /*    e += '<div class="select" style="margin-left:30px;"><div style="float:left;"><span class="caption"><input style="width:10%;border:1px solid red;" type="checkbox" id="choice"'+j+' class="checkbox" value="' + option_value['choice_name'] + '"/>&nbsp;&nbsp;'+  option_value['choice_name']  +'&nbsp;&nbsp;</span><div style="margin-left:10px;">'+option_value['price']+'</div></div></div>';*/
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
                                        /*  e += '<div class="row"><span class="caption">Conditional:</span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_conditional",conditional,[], false,"Business.ConditionalSelected(this)") + "</div></div>";*/

                                        choices. push({
                                            id: option_value['choice_id'],
                                            caption: option_value['choice_name']+" - "+"Price: "+option_value['price']
                                        });

                                        flag=1;
                                    }
                                    if(option_value['ingredients']=="t"){
                                        ingredients=1;
                                    }
                                  });
								  
								
                              if(flag==1) {
                               // e += '<div class="select" ><div style="float:left;"><span class="caption" ><div class="inputbox">' + Forms.CreateSelectPropertyChoice("extras_details", "choice_name_drop-"+value["option_id"],choices,[], false,"Shopping.ChangePrice(this,"+option_data['review']['extras_details'][0]['option_id']+","+option_data['review']['extras_details'][0]['set_id']+")") + '</div>&nbsp;&nbsp;</span><div id="choice_price'+value["option_id"]+'"style="padding:10px;display:none;"></div></div></div>';
								 e += '<div class="select" ><div class="product_op">';
								 
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
								
									//alert(option_value['choice_id'])
									/*if(option_value['choice_id'] == 76) {
										alert(option_value['showoption'])
										}*/
									/*if(option_value['showoption']){
										alert(option_value['showoption'])
										}*/
									//alert(option_value['set_id'])
									var cname = "dynamicname-"+option_value['option_id'];
									e += '<div style="float:left; margin: 0 30px 15px 0;"><span class="caption" ><div class="inputbox">' + Forms.CreateRadioPropertyChoice("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], false,option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<span style="font-size: 12px;font-weight: 600;">'+option_value['choice_name']+"</span><br><br><span style='margin:0 0 0 16px;'>"+"+$"+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div></span></div>';	
									
									
								// e += '<div style="float:left; margin: 0 30px 15px 0;"><span class="caption" ><div class="inputbox"><input style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" type="radio" id="'+option_value['choice_id']+'" name="choice_name_drop'+value["option_id"]+'"><span style="font-size: 12px;font-weight: 600;">'+option_value['choice_name']+"</span><br><br><span style='margin:0 0 0 16px;'>"+"+$"+option_value['price']+'</span></div></span></div>';					
								 });			
								 e +='</div></div>';
							 }
							  e +='</div>';
                                i++;
							  
                                if(ingredients==1){
                                    e += '<span class="caption" style="margin-top:-52px;float:right;color:gray;"><h3 style="margin-left:10px;"></h3></span><div style="clear:both"></div><div class="select" style="padding:10px; float:left;background-color:#f0eae6;margin-left:5px;width:568px; border-radius:0 0 10px 10px;"><div style="float:left;"><span class="caption" ><div class="inputbox" style="margin:0 16px 10px 16px !important;">' + Forms.CreateSelectPropertyChoiceext("extras_details", "choiceingredients-"+value["option_id"],choices_ing,[], '',"ProductOption.ChangeIngredient(this)",true) + '<span id="ing_1" style="display:none;position: relative; left: 100px; top: -19px;" ><img src="panel/theme/left.png" /></span><span id="ing_2"  style="display:none;position: relative; left: 100px; top: -19px;"><img src="panel/theme/whole.png" /></span><span id="ing_3"  style="display:none;position: relative; left: 100px; top: -19px;" ><img src="panel/theme/right.png" /></span></div>&nbsp;&nbsp;</span></div></div>';
                                    ingredients=0;
                                }
								
								e +='<div id="'+showvalue+'" style="clear:both;"></div>';  
                     
                                if(i>=option_data['review']['extras_details'].length)
                                {
                                 e +="<div style='clear:both;'></div>";

                                }
								
								
								
								
                                count_temp++;
                                if(data['review']['option_counts'].length<=count_temp){

                                    set_temp_count++;
                                    count_temp=0;

                                }


							
							
							
                                if(set_temp_count>set_count)
                                {
                                 ////  alert("hii");
								  var is=0;
                                   e += "</div>";
									//alert("1")
									
									e += '<div style="clear:both; width:100%; margin: 20px 0 0 5px;float: left;"><h3 style="color:#000;margin: 0 0 10px 0;font-size: 15px; !important">Special Instruction</h3><textarea  style="border-radius:10px; box-shadow:inset 0 0 20px 1px rgba(0,0,0,0.1); width:587px; min-width:587px; max-width:587px; height:87px; max-height:87px; min-height:87px;" placeholder="Add Special Instruction" onkeyup="ProductOption.optionCommentUpdate(this)"></textarea></div>';
									
										e += '<div style="clear:both; width:100%; margin: 20px 0 0 5px;float: left; text-align:center"><input type="submit" name="submit" class="productopButton"></div>';
                                    e += "</div>";
									 e += "</div>";
									

                                  Popup.ShowNew(700, "", e,ProductOption.SaveEndUserChoices, null,null)
								  Forms.EnableSubmitButton(true)
								  
                                }

                            });

                        });

                    });

                    div_data=null;
                    div_data=id;


                    /*r += '&nbsp;&nbsp;<a style="color:gray;margin-top:10px;" href="javascript:void(0);" onclick="Shopping.add_sets('+id+','+value['set_id']+')">'+value['name']+'</a><br/>';
                    count++;
                    if(count>=data['review']['extras_details'].length){
                        {
                           r +='<br/>&nbsp;&nbsp;<a style="color:Red;margin-top:50px;" href="javascript:void(0);" onclick="Shopping.add_to_cart()">DO not add sets</a> </div>';
                          //Popup.ShowUp(300, 300, r,null, null,null);

                        }

                    }*/

                });

            });
        cart_object=cart;
        cart_id=id;
//    Shopping.AddToCart(cart,'' + id + '');
    }

	
	};
