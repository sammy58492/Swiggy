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
				 var my_div= document.getElementById('dishesresultsinner');
			
            });
});




var ProductOption = {
	 add_product_options_db:function(cart,id,options,comments,optionsid,total_price){
   /* 
     $(cart).hide();*/
	
	    Main.Loading();
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
			
				Main.Ready();
				b = JSON.parse(b)
				var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
				
				if(Shopping.Menu.dishes[F].ingredients) {
				var  ingredientsAlls = JSON.parse(Shopping.Menu.dishes[F].ingredients);
				} else {
					var  ingredientsAlls = new Array();
					}
				if(Shopping.Menu.dishes[F].extras) {
				var  extrasAll = JSON.parse(Shopping.Menu.dishes[F].extras);
				} else {
					var  extrasAll = new Array();
					}
				
				
				
				   if(ingredientsAlls.length!= 0 && extrasAll.length == 0) {
					 	 
					//Shopping.AddToCart(cart,id,options,comments,optionsid,total_price)
					ProductOption.add_only_ingredient(cart,id,options,comments,optionsid,total_price)
					}
				   else if(b.review == 0) {
					   	 
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
	  add_only_ingredient:function(cart,id,options,comments,optionsid,total_price){
		 		 Shopping.ingredientStore = new Array();
		        Forms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
				
                 Forms.Form.extras_details.type = "create";
				
		 			var	e = '';
				    e += '<div class="popup_wrapper">';
				    e += '<div class="pop_header">';
                    e += '<div class="pop_heading"><h3><?= $lang_resource['PRODUCT_POTIONS_SELECT_OPTIONS'] ?></h3></div>'
					e += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
					e += '<button class="pop_close_btn" type="button" onclick="Popup.Close();">X</button>';
					e += '</div>';
					e += "</div>";
				
                    e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
					  
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
				
					 
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
					
					  
					var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
						
		
					  e += '<div class="pop_bloc">'
					  e += '<h3 class="option_heading"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  
					  for(var ing in ingredientsAll ) {
						  
						   
						 Shopping.ingredientStore.push(ingredientsAll[ing]);		
								
							
							  e += '<div class="pull_left ing-chekbox">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
					  
					  
					  }
					   
					  
					   
					  e += '</div>';
					  
					
					}
		 e += '</div>';			
												//alert("1")
	    e += '<div class="pop_bloc" style="padding-bottom: 10px;">';
    	e += '<h3 class="productoptionTextarea"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></h3>';
        e += '<textarea class="pop-textarea" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)"></textarea>';
  	    e += '</div>';
		
		
		e += '<div class="pop_bloc" style="background-color: transparent">';
   		e += '<div class="qnt_dv" >';
    	e += '<div class="pull_left pop_label_qun"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
        e += '<div class="pull_left pop_label_qun amountsec"  id="amountsec">1</div>';
        e += '<span class="pull_left m5"><a href="javascript:void(0)" onclick="ProductOption.additem(1)"><img src="images/step3-menu-list/qnt-add.png"></a></span>';
        e += '<span class="pull_left addItemPo" ><a href="javascript:void(0)" onclick="ProductOption.additem(2)"><img src="images/step3-menu-list/qnt-remove.png"></a></span>';
        e += '</div>';
    
    	 e += '<center><button type="button" id="pop_submit_btn" class="pop_submit_btn addtocartpo" onclick="ProductOption.SaveEndUserChoices()" ><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></center>';
    
   		 e += '</div>';
		
                                     e += "</div>";
									 e += "</div>";
									 e += "</div>";

 				cart_object=cart;
        		cart_id=id;		
				div_data=id;		
			Popup.ShowNewForProductOp(900, 700, e,ProductOption.SaveEndUserChoices)
			Forms.EnableSubmitButton(true)
		
	  },  
	  edit_only_ingredient:function(id,edit_id){
		 	
		 Main.Ready();
				quantitysec = Shopping.Cart.business[0].dishes[edit_id].quantity;
				 if(Shopping.Cart.business[0].dishes[edit_id].options)	
					var	productOption = Shopping.Cart.business[0].dishes[edit_id].options;
					
				if(productOption)	
					var arr_opption = productOption.split(", "); 
					else 
					var arr_opption = new Array(); 
		
		       
                Forms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
                Forms.Form.extras_details.type = "create";
		
                Forms.Form.extras_details.edit_id = edit_id;
			
				
		 			var	e = '';
				    e += '<div class="popup_wrapper">';
				    e += '<div class="pop_header">';
                    e += '<div class="pop_heading"><h3><?= $lang_resource['PRODUCT_POTIONS_SELECT_OPTIONS'] ?></h3></div>'
					e += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
					e += '<button class="pop_close_btn" type="button" onclick="Popup.Close();">X</button>';
					e += '</div>';
					e += "</div>";
				
                    e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
					  
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
					
					
				
					 
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
					///  alert(Shopping.Menu.dishes[F].ingredients);
					  
					var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
					  e += '<div class="pop_bloc">'
					  e += '<h3 class="option_heading"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  for(var ing in ingredientsAll ) {
						  if(ProductOption.in_array(ingredientsAll[ing],arr_opption)) {
							  
					        e += '<div class="pull_left ing-chekbox">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
						  }
						  else {
							  e += '<div class="pull_left ing-chekbox">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
							  }
						  
						  
					  }
					   
					  
					   
					e += '</div>';
					  
					
					}
						 e += '</div>';			
												//alert("1")
	    e += '<div class="pop_bloc" style="padding-bottom: 10px;">';
    	e += '<h3 class="productoptionTextarea"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></h3>';
        e += '<textarea class="pop-textarea" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)"></textarea>';
  	    e += '</div>';
		
		
		e += '<div class="pop_bloc" style="background-color: transparent">';
   		e += '<div class="qnt_dv" >';
    	e += '<div class="pull_left pop_label_qun"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
        e += '<div class="pull_left pop_label_qun amountsec"  id="amountsec">1</div>';
        e += '<span class="pull_left m5"><a href="javascript:void(0)" onclick="ProductOption.additem(1)"><img src="images/step3-menu-list/qnt-add.png"></a></span>';
        e += '<span class="pull_left addItemPo" ><a href="javascript:void(0)" onclick="ProductOption.additem(2)"><img src="images/step3-menu-list/qnt-remove.png"></a></span>';
        e += '</div>';
    
    	 e += '<center><button type="button" id="pop_submit_btn" class="pop_submit_btn addtocartpo" onclick="ProductOption.EditEndUserChoices()" ><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></center>';
    
   		 e += '</div>';
		
                                     e += "</div>";
									 e += "</div>";
									 e += "</div>";
				
        		cart_id=id;		
				div_data=id;		
			Popup.ShowNewForProductOp(900, "", e,ProductOption.EditEndUserChoices)
			Forms.EnableSubmitButton(true)
		
	  },   
	  edit_product_options:function(id,edit_id){
		//alert(edit_id)
		
		 if (Main.Busy) {
		   return false;
		   }
		quantitysec = Shopping.Cart.business[0].dishes[edit_id].quantity;
		
	if(Shopping.Cart.business[0].dishes[edit_id].options)	
	var	productOption = Shopping.Cart.business[0].dishes[edit_id].options;
	if(Shopping.Cart.business[0].dishes[edit_id].optionChoiceId)
	var	optionChoiceId = Shopping.Cart.business[0].dishes[edit_id].optionChoiceId;
	
	
	
	if(productOption)	
	var arr_opption = productOption.split(", "); 
	else 
	var arr_opption = new Array(); 
	
	//alert(optionChoiceId)
	if(optionChoiceId)
    var optionChoiceId_arr = optionChoiceId.split(","); 
	else 
	 var optionChoiceId_arr = new Array(); 
	//alert(JSON.stringify(optionChoiceId_arr))
		var FS = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
				
				if(Shopping.Menu.dishes[FS].ingredients) {
				var  ingredientsAlls = JSON.parse(Shopping.Menu.dishes[FS].ingredients);
				} else {
					var  ingredientsAlls = new Array();
					}
				if(Shopping.Menu.dishes[FS].extras) {
				var  extrasAll = JSON.parse(Shopping.Menu.dishes[FS].extras);
				} else {
					var  extrasAll = new Array();
					}
				
				
				
				if(ingredientsAlls.length!= 0 && extrasAll.length == 0) {
					
					ProductOption.edit_only_ingredient(id,edit_id)
					return false;
					}
		Main.Loading();
		
          $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
				
                data=JSON.parse(b);
			
                flag=0;
               count=0;
			   var option_count =0;
               var e='';
			   
				set_count= data['review']['extras_details'].length;
				
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
				   e += '<div class="popup_wrapper">';
				    e += '<div class="pop_header">';
                    e += '<div class="pop_heading"><h3><?= $lang_resource['PRODUCT_POTIONS_EDIT_YOUR_OPTIONS'] ?></h3></div>'
			
                    e += '<div class="pull_right pullrightDiv" >';
        	        e += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
       			    e += '</div>';
                    e += "</div>";
					
					 e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
				
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
						var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					
					  e += '<div class="pop_bloc">'
					  e += '<h3 class="option_heading"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  
					  for(var ing in ingredientsAll ) {
						  if(ProductOption.in_array(ingredientsAll[ing],arr_opption)) {
						
						    e += '<div class="pull_left ing-chekbox">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
						   
						  }
						  else {
							
							 
							  e += '<div class="pull_left ing-chekbox">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" class="ingredientPo" ></input><label for="' +"ing_"+ingredientsAll[ing] + '"  class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
							  }
						  
						  
					  }
					   
				
					   
					  e += '</div>';
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
                       // var option_count=data['review']['option_counts'].length;
					    option_count = option_count + data['review']['option_counts'].length;
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
								
								//alert(b)
								Main.Ready();
                                option_data=JSON.parse(b);
								Main.data=JSON.parse(b);
								 var showvalue = "dynamicname-"+value['option_id'];
                           
								e +='<div class="pop_bloc">';
									if(option_data['review']['extras_details'][0]['min_sel']>0) {
										  e +='<h3 class="option_heading">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' (Required)</h3>';
								
									}
									else {
										  e +='<h3 class="option_heading">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' </h3>';	
										}
    							 
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(JSON.stringify(option_data['review']['extras_details']))
									
									
									
									
									var cname = "dynamicname-"+option_value['option_id'];
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0)
									{
										
										var optionShowvalue = option_value['showoption'];
	/*******************************************************product option Checkbox COndition part*************************************/
		if(ProductOption.in_array(option_value["choice_id"],optionChoiceId_arr)) {
							
								 
						var optionShowvalue = option_value['showoption'];
									
				if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
					
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
								
							
							 });	
		  
		   
		    }
		   else {
			   
					   if(set_id != "X") {
						     
					  // document.getElementById(fieldName).innerHTML = "";
					   }
					 
			   }
		}
											
											
					/*******************************************product option Checkbox COndition part*************************************/						
								
									 e += '<div class="pull_left ing-chekbox">';
        								 //e += '<div class=""><input type="checkbox" id="po1" name="checkbox" checked="checked" value="2" style="" class="switch checkbox_2 hand"></input><label for="po1" checked="checked" class="pop_label">Asian food</label></div>';
								 var dyid = option_value["choice_name"]+"-@"+option_value["choice_id"];
										 e += '<div class="">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],true,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],optionChoiceId,option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<label for="'+dyid+'" >&nbsp;</label><span  class=" field_label"> '+  option_value['choice_name']  +'</span><span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
										 
         								 e += '</div>';	
									
											 
										
									}
								
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
                                       

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
                            
								
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									var ticksradio =''
									var cname = "dynamicname-"+option_value['option_id'];
									
							
									
				if(ProductOption.in_array(option_value["choice_id"],optionChoiceId_arr)) {
								
								 
						var optionShowvalue = option_value['showoption'];
									
				if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
					
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
								
							
							 });	
		  
		   
		    }
		   else {
			   
					   if(set_id != "X") {
						     
					  // document.getElementById(fieldName).innerHTML = "";
					   }
					 
			   }
		   
		   							e += '<div class="pull_left ing-chekbox">';
        							e += '<div class="">' + Forms.CreateRadioPropertyChoiceEdit("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], true,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id'],true) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'">&nbsp;</label><span  class=" pop_label">'+option_value['choice_name']+'</span><span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
       								 e += '</div>';
		   
										} else {
											
											e += '<div class="pull_left ing-chekbox">';
        							e += '<div class="">' + Forms.CreateRadioPropertyChoiceEdit("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], false,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'">&nbsp;</label><span  class=" pop_label">'+option_value['choice_name']+'</span><span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
       								 e += '</div>';
										
											}
											
												
								 });			
								
							 }
							
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
						    
							e += '<div class="pull_left"  style="width:80%;">' + Forms.CreateSelectPropertyChoiceext("extras_details", "choice_ingredients-"+value["option_id"],choices_ing,stores, '',"ProductOption.ChangeIngredient(this)",true,'','',optionChoiceId) + '<span id="ing_1" class="wholepo1" ><img src="images/common/left.png" /></span><span id="ing_2"  class="wholepo2"><img src="images/common/whole.png" /></span><span id="ing_3"  class="choosepizaText" ><img src="images/common/right.png" /></span></div>&nbsp;&nbsp;</span></div>';
							
                                    ingredients=0;
							//	}
                              }
							  
							  e +='</div><div id="'+showvalue+'" ></div>';  

                               
                                count_temp++;
                               

                               if(option_count == count_temp)
                                {
                                
								  var is=0;
								  
		e += '<div class="pop_bloc" style="padding-bottom: 10px;">';
    	e += '<h3 class="productoptionTextarea">Special Instruction</h3>';
        e += '<textarea class="pop-textarea" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)">'+Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments)+'</textarea>';
  	    e += '</div>';
		
		
		e += '<div class="pop_bloc" style="background-color: transparent">';
   		e += '<div class="qnt_dv" >';
    	e += '<div class="pull_left pop_label_qun"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
        e += '<div class="pull_left pop_label_qun" class="quantityShow" id="amountsec">'+Shopping.Cart.business[0].dishes[edit_id].quantity+'</div>';
        e += '<span class="pull_left m5"><a href="javascript:void(0)" onclick="ProductOption.additem(1)"><img src="images/step3-menu-list/qnt-add.png"></a></span>';
        e += '<span class="pull_left addItemPo" ><a href="javascript:void(0)" onclick="ProductOption.additem(2)"><img src="images/step3-menu-list/qnt-remove.png"></a></span>';
        e += '</div>';
    
    	 e += '<center><button type="button" id="pop_submit_btn" class="pop_submit_btn addtocartpo" onclick="ProductOption.EditEndUserChoices()" ><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></center>';
    
   		 e += '</div>';
		

                                  Popup.ShowNewForProductOp(900, 700, e,ProductOption.EditEndUserChoices, null,null)
								  
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


                });

            });
        cart_object=cart;
        cart_id=edit_id;

    },
	 showcondition:function(b,fieldName,productOptions){
	
		if(productOptions) {
           var	productOptionss = productOptions; 
		   var optionChoiceIds_arr = productOptions.split(","); 
	
		}
		else {
			var productOptionss = '';
			var optionChoiceIds_arr = new Array();
			}
					var i =0 ;
					
								 Main.Ready(true);
								option_data=JSON.parse(b);
							
								var k='';
													
							
			       var  e ="";
			
							   
							   	e +='<div class="pop_bloc">';
									if(option_data['review']['extras_details'][0]['min_sel']>0) {
										  e +='<h3 class="option_heading">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' (Required)</h3>';
								
									}
									else {
										  e +='<h3 class="option_heading">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' </h3>';	
										}
								
							
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(option_value["choice_name"])
									var cname = "dynamicname-"+option_value['option_id'];
									
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0) {
										
										
										 
										  e += '<div class="pull_left ing-chekbox">';
        								 
										 var dyid = option_value["choice_name"]+"-@"+option_value["choice_id"];
										 e += '<div class="">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],true,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],productOptionss,option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<label for="'+dyid+'" >&nbsp;</label><span  class=" field_label"> '+  option_value['choice_name']  +'</span><span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
										 
         								 e += '</div>';
				
					 
									}
										
							
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=1){
                                     
                                        flag=1;
                                    }
                            
                                  });
						
								
                              if(flag==1) {
                              
								 e += '<div class="select" >';
								 
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
								
							
									
									
									
									
									var cname = "dynamicname-"+option_value['option_id'];
									
									var chkv = false; 	
									  
									if(productOptionss) {
										if(ProductOption.in_array(option_value["choice_id"],optionChoiceIds_arr)) {
											
												var chkv = true; 
													}
													
													
										} 
									
									e += '<div class="pull_left ing-chekbox">';
        							e += '<div class="">' + Forms.CreateRadioPropertyChoice("extras_details","choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+option_value["option_id"],option_value['choice_id'], chkv,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],'X') + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'">&nbsp;</label><span  class=" pop_label">'+option_value['choice_name']+'</span>';
									
									e += '<span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
       								 e += '</div>';
									
											
								 });			
								// e +='</div>';
							 }
							  e +='</div>';
                                i++;
							
                              
                     
                                if(i>=option_data['review']['extras_details'].length)
                                {
                                // e +="<div style='clear:both;'></div>";

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
                                   /* e += "</div>";
									
									
                                    e += "</div>";*/
									 e += "</div>";

                       
        
                                }
						
						/*alert("ok13")
						alert(e)*/
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
	//alert(JSON.stringify(Forms.Form))
	for(s in Forms.Form ) {
		 
			
			if(ProductOption.in_array(Forms.Form[s].name,sp)) {
			
			//alert(JSON.stringify(Forms.Form[s]))
			if(Forms.Form[s].counti<Forms.Form[s].mini) {
				
			
					alert("Minimum "+Forms.Form[s].mini+' need to be add in '+Forms.Form[s].text);
				    return false ;
				
			}
				else {
					delete Forms.Form[s];
					}
	
		}
		}
	
        console.log( Forms.Form.extras_details.fields);
        console.log( Forms.Form.extras_details);
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
		
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetTotalPrices","ids":'+JSON.stringify(Forms.Form.extras_details)+"}]", function (b)
            {
			
                b=JSON.parse(b);
				mychoice_data[choice_count++]=b;
				var total_price = Main.GetPropertyValueOnPropertyValueFound(Shopping.Menu.dishes, "id", div_data, "price");
                total_price = parseFloat(parseFloat(total_price) + parseFloat(b['review']['price'])).toFixed(2);
				
                total_price = Shopping.FormatPrice(Shopping.FixToDecimal(total_price.toString()));
             
			   
               var temp='';
			    if(Shopping.ingredientStore.length>0) {
			   temp=Shopping.ingredientStore.join(", ");
			   }
			  
			   if(b['review']['choice_array'].length!=0) {
			   temp +=", ";
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
				 
				 if(temp.charAt(0) == ",") {
					 
					 temp = temp.slice( 1 );
					 
					 }
				  
               console.log(temp);
			  if(b['review']['comments']) {
				  var comresolt = b['review']['comments']
				  } else {
					 var comresolt = "";  
					  }
					  
				
			    Shopping.AddToCart(cart_object,'' + cart_id + '',temp,comresolt,b.review.choice_allid,total_price);
			    quantitysec = 0;
                cart_object=null;
                cart_id=null;
            });

        Popup.Close();
        Forms.Clean("extras_details")
    },
	
	
	
	AddFromCart :function (c, d) {
		
		  var  quantity=Shopping.Cart.business[c].dishes[d].quantity;
       if(quantity<1){
   
	lastid -= 1;
	var n = "";
	
	if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
			
 			n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			 if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #f50;font-weight: bold;">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].options)+'</a></span>';
				}
			if(Shopping.Cart.business[0].dishes[i].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';	
			  }		
			 n +='</td>';
             n +='<td width="30%" id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';

		}del = 1;
	}
	
                    Shopping.UpdateCartTotals();
        //Shopping.PopulateCart();
        if (Shopping.GetCartItemsCount() <= 0)
        {
            Popup.Close();
        
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
		   
		   if(viewDevice == "Mobile") {
			if(GlobalPagecheck == "2")
			{
			    Checkout.OrderDetails(true);
			}
			   if(GlobalPagecheck == "3")
			{
				
			    Checkout.OrderDetailsPage(true);
			}
			   return false;
		   }
           if (Shopping.Cart.business.length != 0) {
               for (var i = 0;i <= lastid;i++){
				  
				  
				   
				    n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			 if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #f50;font-weight: bold;">'+Shopping.Cart.business[0].dishes[i].options+'</a></span>';
				}
				if(Shopping.Cart.business[0].dishes[i].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Main.TitleCase(Shopping.Cart.business[0].dishes[i].comments)+'</a></span>';	
			  }
			 n +='</td>';
             n +='<td width="30%" id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';


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
	   
	   var qn = 0;
		
		
		
        for (var f in Shopping.Cart.business)
        {
          
            for (var e in Shopping.Cart.business[f].dishes)
            {
				
              
				qn +=Shopping.Cart.business[f].dishes[e].quantity;
				
            }
        }
	
	 if(Shopping.Cart.business) {
              $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> '+qn+' <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
				}
				else {
					$("#orderprice").html("0.00");
					$("#cart_taxid").html("");
					 $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> 0 <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
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
	
		
		
		
		if(!Forms.Form.extras_details.comments) {
		//	alert(Forms.Form.extras_details.edit_id)
			var edit_id = Forms.Form.extras_details.edit_id;
			
			Forms.Form.extras_details.comments = Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments);
			}
	
		
        console.log( Forms.Form.extras_details.fields);
        console.log( Forms.Form.extras_details);
        var e = true;
        Main.Loading();
        var d = new Date().getTime();
        Main.Aid = d;
		edit_id=Forms.Form.extras_details.edit_id;
		
		//alert(edit_id)
		
		
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetTotalPricesEdit","ids":'+JSON.stringify(Forms.Form.extras_details)+"}]", function (b)
            {
			
		
                b=JSON.parse(b);

                mychoice_data[choice_count++]=b;
				Main.Ready()

              var item_id = Shopping.Cart.business[0].dishes[edit_id].id
			  var Fi = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", item_id);
			  var J = Shopping.Menu.dishes[Fi];
          
			var total_price = parseFloat(parseFloat(J.price) + parseFloat(b['review']['price'])).toFixed(2);		
             
			  
               var temp='';
			   if(Shopping.ingredientStore.length>0) {
			   temp=Shopping.ingredientStore.join(", ");
			   }
			   
			   if(b['review']['choice_array'].length!=0) {
			   temp +=", ";
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
			   if(temp.charAt(0) == ",") {
					 
					 temp = temp.slice( 1 );
					 
					 }
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
				Shopping.Cart.business[0].dishes[edit_id].total = parseFloat(parseFloat(total_price)*quantitysec).toFixed(2);
				
				
			
			var n = "";	
                if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
			
			 n +='<tr>';
             n +=' <td width="50%">' + Shopping.Cart.business[0].dishes[i].name.toUpperCase() + ' X '+Shopping.Cart.business[0].dishes[i].quantity;
			 
			 	if(Shopping.Cart.business[0].dishes[i].options) {
			 n +='<br><span class="options"><a href="javascript:void(0)" onclick="ProductOption.EditCartOptions('+choice_count+','+i+')"  style="color: #f50;font-weight: bold;">'+Shopping.Cart.business[0].dishes[i].options+'</a></span>';
				}
				 if(Shopping.Cart.business[0].dishes[i].comments) {
			 n +='<br><span class="options"><a href="javascript:void(0)"   style="color: #333;text-decoration:none">'+Shopping.Cart.business[0].dishes[i].comments+'</a></span>';	
			  }	
			 
			 n +='</td>';
             n +='<td width="30%" id="dish_' + i + "_" + Shopping.Cart.business[0].dishes[i].id + '_price">'+Shopping.FormatPrice(Shopping.Cart.business[0].dishes[i].total)+'</td>';
             n +='<td width="10%"><a href="javascript:void(0)" onclick="ProductOption.AddFromCart(  0, ' + i + ')" ><img src="images/step3-menu-list/add-icon2.png"></a></td>';
             n +=' <td width="7%"><a href="javascript:void(0)" onclick="Shopping.RemoveFromCart(  0, ' + i + ')"><img src="images/step3-menu-list/remove-icon.png"></a></td>';
			 n +='</tr>';


		    $("#plc_rgt_in").html(n);
		}del = 1;
	}
			if(viewDevice == "Desktop")
			{
                    Shopping.UpdateCartTotals();
			}
			else {
				
				
			 if(GlobalPagecheck == "2")
			{
			    Checkout.OrderDetails(true);
			}
			else if(GlobalPagecheck == "3")
			{
			    Checkout.OrderDetailsPage(true);
			}
		 
				}
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
			document.getElementById("amountsec").innerHTML = quantitysec;
			$("#amountsecminus").show();
			
			
		}
		else if(val == 2)
		
		{
			
			if(quantitysec == 1){$("#amountsecminus").hide();}else{
			quantitysec--;
			document.getElementById("amountsec").innerHTML = quantitysec;
			if(quantitysec == 1){$("#amountsecminus").hide();}
			
			}

							
		}
	},	
	 ChangeIngredient: function(b){
		
		var confirmingredient= confirm("<?= $lang_resource['PRODUCT_POTIONS_PIZZA_INGREDIENT'] ?>");
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
                  
                });
            });
       },
	  EditCartOptions:function(count,i)
    {
		
    console.log(Shopping.Cart.business[0].dishes[i]);
    ProductOption.edit_product_options(Shopping.Cart.business[0].dishes[i].id,i);

    },  
    add_product_options:function(cart,id){
	
	   if (Main.Busy) {
		   return false;
		   }
		Shopping.ingredientStore = new Array();
		Main.Loading();

        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
				

                data=JSON.parse(b);
			
                   flag=0;
				   count=0;
				   option_count =0;
				
			   
			   
               var e='';
			   	set_count= data['review']['extras_details'].length;
				
                Forms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
				
                Forms.Form.extras_details.type = "create";
               
                var e=null;
               
                Forms.Form.extras_details.extras_details = d;
                this.ActiveForm = "extras_details";
                
                set_temp_count=1;
				var	e = '';
				    e += '<div class="popup_wrapper">';
				    e += '<div class="pop_header">';
                    e += '<div class="pop_heading"><h3><?= $lang_resource['PRODUCT_POTIONS_SELECT_OPTIONS'] ?></h3></div>'
					e += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
					e += '<button class="pop_close_btn" type="button" onclick="Popup.Close();">X</button>';
					e += '</div>';
					e += "</div>";
					
					  e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
					  
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
					
					
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
				 
					  
				
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
						
					 var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					 
					  e += '<div class="pop_bloc">'
					  e += '<h3 class="option_heading"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  
					  for(var ing in ingredientsAll ) {
						  
						   
						 Shopping.ingredientStore.push(ingredientsAll[ing]);		
								
							
							  e += '<div class="pull_left ing-chekbox">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="Forms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
					  
					  
					  }
					   
					  
					   
					  e += '</div>';
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
                        option_count = option_count + data['review']['option_counts'].length;
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
                                caption: "<?=$lang_resource['SELECT_V21']?>"
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
							
								 var showvalue = "dynamicname-"+value['option_id'];

									e +='<div class="pop_bloc">';
									if(option_data['review']['extras_details'][0]['min_sel']>0) {
										  e +='<h3 class="option_heading">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' (Required)</h3>';
								
									}
									else {
										  e +='<h3 class="option_heading">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' </h3>';	
										}
    							
								
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(option_value["choice_name"])
									var cname = "dynamicname-"+option_value['option_id'];
									
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0) {
										
                                    
										
										 e += '<div class="pull_left ing-chekbox">';
        								
										 var dyid = option_value["choice_name"]+"-@"+option_value["choice_id"];
										 e += '<div class="">' +Forms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],false,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],'',option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<label for="'+dyid+'" >&nbsp;</label><span  class=" field_label"> '+  option_value['choice_name']  +'</span><span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
										 
         								 e += '</div>';
									}
										
										
								
								
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
                                      

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
                              
								
								 
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
								
								
									var cname = "dynamicname-"+option_value['option_id'];
									
									e += '<div class="pull_left ing-chekbox">';
        							e += '<div class="">' + Forms.CreateRadioPropertyChoice("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], false,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'">&nbsp;</label><span  class=" pop_label">'+option_value['choice_name']+'</span><span class="pop-cnt"><?=$lang_resource['SITE_CURRENCY']?>'+parseFloat(option_value['price']).toFixed(2)+'</span></div>';
       								 e += '</div>';
									 
									 
													
								 });			
								
							 }
							
                                i++;
							  
                                if(ingredients==1){
									
									e += '<div class="pull_left"  class="pizzachoosePo">' + Forms.CreateSelectPropertyChoiceext("extras_details", "choiceingredients-"+value["option_id"],choices_ing,[], '',"ProductOption.ChangeIngredient(this)",true) + '<span id="ing_1" class="wholepo" ><img src="images/common/left.png" /></span><span id="ing_2"  class="wholepo"><img src="images/common/whole.png" /></span><span id="ing_3"  class="rightpo" ><img src="images/common/right.png" /></span></div>&nbsp;&nbsp;</span></div>';
									
									
									
                              
                                    ingredients=0;
                                }
								
								e +='</div>';
								
								e +='<div id="'+showvalue+'" ></div>';  
                     			
								count_temp++;
								
								
									
								if(option_count == count_temp)
									{
								
								  var is=0;

								e += '<div class="pop_bloc" style="padding-bottom: 10px;">';
								e += '<h3 class="productoptionTextarea">Special Instruction</h3>';
								e += '<textarea class="pop-textarea" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)"></textarea>';
								e += '</div>';
								
								
								e += '<div class="pop_bloc" style="background-color: transparent">';
								e += '<div class="qnt_dv" >';
								e += '<div class="pull_left pop_label_qun"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
								e += '<div class="pull_left pop_label_qun amountsec"  id="amountsec">1</div>';
								e += '<span class="pull_left m5"><a href="javascript:void(0)" onclick="ProductOption.additem(1)"><img src="images/step3-menu-list/qnt-add.png"></a></span>';
								e += '<span class="pull_left addItemPo" ><a href="javascript:void(0)" onclick="ProductOption.additem(2)"><img src="images/step3-menu-list/qnt-remove.png"></a></span>';
								e += '</div>';
							
								 e += '<center><button type="button" id="pop_submit_btn" class="pop_submit_btn addtocartpo" onclick="ProductOption.SaveEndUserChoices()" ><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></center>';
							
								 e += '</div>';
		
                                 e += "</div>";
							     e += "</div>";
								 e += "</div>";
									 
							


								 Popup.ShowNewForProductOp(900, 700, e,ProductOption.SaveEndUserChoices, null,null)
								  Forms.EnableSubmitButton(true)
                                	}

                            });
							

                        });

                    });
					
					  

                    div_data=null;
                    div_data=id;



                });

            });
        cart_object=cart;
        cart_id=id;

    }

	
	};
