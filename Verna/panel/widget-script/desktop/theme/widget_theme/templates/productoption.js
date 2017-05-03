//     AddToCart,GetCartItemsCount,RemoveFromCart,PopulateCart and PopulateDishesList function need to overwrite from v3 // frontend functionality (from shopping.js)
//     pop up css and right side bar of shopping page  css need to add // frontend design
//     images 07plus.png,06plus.png,05minus.png,04delete.png,03edit.png,02copy.png,01add.png  frontend image
//     left.png,whole.png,right.png  Panel/theme
//     panel/theme/en bgp.jpg;
//     popup.js and froms.js need to overwirte (Please back up of that side)
//     For delivery popup front.js


/* $(function() {
            
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
*/



var ProductOption = {
	
	 add_product_options_db:function(cart,id,options,comments,optionsid,total_price){

	ProductOption.dis_id = id;
		
		 if(Main.NullToEmpty(total_price)==''){
			 total_price=0;
		 }
		  
 
	Main.Loading();
	    
	
        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
			//alert(b);	
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
					//hiddenqty = 0; 
					personsec = 0;	
					
					Shopping.AddToCart(cart,id,options,comments,optionsid,total_price)
					}
					else if(b.review.extras_details.length == 0) {
					//hiddenqty = 0;
					personsec = 0;		
					
					Shopping.AddToCart(cart,id,options,comments,optionsid,total_price)
					}else {
						Main.p1 = 1;
						$('#loader_dv').addClass( "addloader" );
						$("#dish_"+id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + id + '_imglink" ><img src="images/step3-menu-list/add-icon-big.png"></a>');	 
						ProductOption.add_product_options(cart,id);
					}
			 });
	// 
		
	 },
	  add_only_ingredient:function(cart,id,options,comments,optionsid,total_price){
		 		 Shopping.ingredientStore = new Array();
		        ProductOptionsForms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
				
                 ProductOptionsForms.Form.extras_details.type = "create";
				
		 				
					 
					 var pindex = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);  
					var productDetail = Shopping.Menu.dishes[pindex];
					var curIdex = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
					
					//alert(JSON.stringify(productDetail));
					  var e = '<div class="wrapper">';
					 e += '<div class="option_popup_header"><h3>'+Main.TitleCase(productDetail.name)+' '+Shopping.Business[curIdex].currency+''+productDetail.price+'</h3> <span></span>';
					 e += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button>			</div>';
					 e += '</div>';
					 
					  e += '<div class="inwrap">';
					  
					   e += '<div class="cont">';
					 e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
					 e += '<select name="" class="selectbox" onchange="ProductOption.updateOptionsquantity(this)">';
					  for(var s=1;s<21;s++) { 
					 e += '<option value="'+s+'">'+s+'</option>';
					  }
					
                
           			 e += '</select>';
       				 e += '</div>';
					  
					  e += '</div>';
					
					  
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
				
					 
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
					
					  
					var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
						
		
					  e += '<div class="pop_bloc">'
					  e += '<h3 class="allheader"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  
					  for(var ing in ingredientsAll ) {
						  
						   
						 Shopping.ingredientStore.push(ingredientsAll[ing]);		
								
							
							  e += '<div class="pull_left ing-chekboxdp">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox3 hand"" onchange="ProductOptionsForms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label" >'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
					  
					  
					  }
					   
					  
					   
					  e += '</div>';
					  
					
					}
		 e += '</div>';			
												//alert("1")
	   e += '<div class="inwrapbox">';
								    e += '<div class="cont">';
									e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></div>';
									e += '<textarea  placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)"></textarea>';
									e += '</div>';
									e += '<div style="margin: 0px auto; text-align: center;"><button type="button" class="addcart addcartwine" onclick="ProductOption.SaveEndUserChoices()"><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></div>';
									e += ' </div>';
									e += ' </div>';
							     e += "</div>";
								 e += "</div>";

 				cart_object=cart;
        		cart_id=id;		
				div_data=id;	
					
				$('#loader_dv').removeClass( "addloader" );
				$("#dish_"+id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + id + '_imglink"  onclick="ProductOption.add_product_options_db(this,' + id + ')"><img src="images/step3-menu-list/add-icon-big.png"></a>');
					
			Popup.ShowNewForProductOp(900, 700, e,ProductOption.SaveEndUserChoices)
			ProductOptionsForms.EnableSubmitButton(true)
		
	  },  
	  checkedval:function(frm,ck){
		  //ck=1 // checkbox
		  //ck=2 // radio
		  if(document.getElementById(frm).checked) {
		  
		   if(ck==1) {  
		  	document.getElementById(frm).checked = false;
		  }
		  } else {
		 
		   document.getElementById(frm).checked = true;
			if(ck==2) {
		   document.getElementById(frm).click();
		  } else if(ck==1) {
			  
			  ProductOptionsForms.CheckTextInputForProductoption('extras_details',document.getElementById(frm))
			  
			  }
		  }
		  
		 },  
	  edit_only_ingredient:function(id,edit_id){
		 	
		 Main.Ready();
				quantitysec = Shopping.Cart.business[0].dishes[edit_id].quantity;
				 if(Shopping.Cart.business[0].dishes[edit_id].ingredients)	
					var	productOption = Shopping.Cart.business[0].dishes[edit_id].ingredients;
					
				if(productOption)	
					var arr_opption = productOption.split(", "); 
					else 
					var arr_opption = new Array(); 
					
				
		
		       
                ProductOptionsForms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
                ProductOptionsForms.Form.extras_details.type = "create";
		
                ProductOptionsForms.Form.extras_details.edit_id = edit_id;
			
				
		 			
						  var pindex = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);  
					var productDetail = Shopping.Menu.dishes[pindex];
					var curIdex = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
					
					//alert(JSON.stringify(productDetail));
					  var e = '<div class="wrapper">';
					 e += '<div class="option_popup_header"><h3>'+Main.TitleCase(productDetail.name)+' '+Shopping.Business[curIdex].currency+''+productDetail.price+'</h3> <span></span>';
					 e += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button>			</div>';
					 e += '</div>';
					 
					  e += '<div class="inwrap">';
					  
					   e += '<div class="cont">';
					 e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
					 e += '<select name="" class="selectbox" onchange="ProductOption.updateOptionsquantity(this)">';
					 for(var s=1;s<21;s++) { 
					 if(Shopping.Cart.business[0].dishes[edit_id].quantity ==s) {
						 e += '<option value="'+s+'" selected>'+s+'</option>';
						 }
						 else {
							 e += '<option value="'+s+'">'+s+'</option>'; 
							 
							 }
					 
					 }
                
           			 e += '</select>';
       				 e += '</div>';
					  
					  e += '</div>';
					
					  
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';
					
					
					
				
					 
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
					///  alert(Shopping.Menu.dishes[F].ingredients);
					  
					var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
					 
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
					  e += '<div class="pop_bloc">'
					  e += '<h3 class="allheader"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  for(var ing in ingredientsAll ) {
						  if(ProductOption.in_array(ingredientsAll[ing],arr_opption)) {
							  
					          e += '<div class="pull_left ing-chekboxdp">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox3 hand"" onchange="ProductOptionsForms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label" >'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
						  }
						  else {
							  e += '<div class="pull_left ing-chekboxdp">';
        					  e += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox3 hand"" onchange="ProductOptionsForms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label">'+ingredientsAll[ing]+'</label></div>';
       					      e += '</div>';
							  }
						  
						  
					  }
					   
					  
					   
					e += '</div>';
					  
					
					}
						 e += '</div>';			
												//alert("1")
				 e += '<div class="inwrapbox">';
								    e += '<div class="cont">';
									e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></div>';
									e += '<textarea  placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)">'+Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments)+'</textarea>';
									e += '</div>';
									e += '<div style="margin: 0px auto; text-align: center;"><button type="button" class="addcart addcartwine" onclick="ProductOption.EditEndUserChoices()"><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></div>';
									e += ' </div>';
									e += ' </div>';
							     e += "</div>";
								 e += "</div>";								
												
												
												
			
				
        		cart_id=id;		
				div_data=id;	
				$('#loader_dv').removeClass( "addloader" );
				$("#dish_"+id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + id + '_imglink"  onclick="ProductOption.add_product_options_db(this,' + id + ')"><img src="images/step3-menu-list/add-icon-big.png"></a>');
					
			Popup.ShowNewForProductOp(900, "", e,ProductOption.EditEndUserChoices)
			ProductOptionsForms.EnableSubmitButton(true)
		
	  },   
	  edit_product_options:function(id,edit_id){
		  
		
	if (Main.Busy) {
		   return false;
		}
	
	
	var storeOptions = new Array();
	quantitysec = Shopping.Cart.business[0].dishes[edit_id].quantity;
	
	if(Shopping.Cart.business[0].dishes[edit_id].nofperson)	{
		var personsec = Shopping.Cart.business[0].dishes[edit_id].nofperson;
	}
	if(Shopping.Cart.business[0].dishes[edit_id].options)	
	var	productOption = Shopping.Cart.business[0].dishes[edit_id].options;
	
	if(Shopping.Cart.business[0].dishes[edit_id].ingredients)	
	var	ingredients = Shopping.Cart.business[0].dishes[edit_id].ingredients;
	
	if(Shopping.Cart.business[0].dishes[edit_id].optionChoiceId)
	var	optionChoiceId = Shopping.Cart.business[0].dishes[edit_id].optionChoiceId;
	
	
	
	
	
	if(productOption)	
	var arr_opption = productOption.split(", "); 
	else 
	var arr_opption = new Array(); 
	
	if(ingredients)	
	var arr_ingredients = ingredients.split(", "); 
	else 
	var arr_ingredients = new Array(); 
	
	
	
	
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
		
		
		
          $.post("panel/lib/productoption.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b)
            {
				//alert(b);
                data=JSON.parse(b);
			
                flag=0;
               count=0;
			   var option_count =0;
               var e='';
			   
				set_count= data['review']['extras_details'].length;
				
				var qty_stat = data.review.extras_details[0].qty;
				var person_stat = data.review.extras_details[0].person;
				//alert('qty y/n : '+qty_stat);
				//alert('person y/n : '+person_stat);
				
				
				if(qty_stat == 1)
				{
					var qty_count = parseInt(data.review.extras_details[0].qty_count);
					var person_count = parseInt(data.review.extras_details[0].person_count);
				}
				else
				{
					var qty_count = 1;
					var person_count = 1;
				}
				//alert('qty start from : '+qty_count);
				//alert('person start from : '+person_count);
				
                ProductOptionsForms.Clean("extras_details", "popupmainbuttonok");
                d = new Object();
                ProductOptionsForms.Form.extras_details.type = "create";
				
				ProductOptionsForms.Form.extras_details.setid = data['review']['extras_details'];
		
                ProductOptionsForms.Form.extras_details.edit_id = edit_id;
                //*  if (ProductOptionsForms.Form.business.type == "modify") {
                ///ProductOptionsForms.CreateValue("extra", "extra_business", ProductOptionsForms.Form.business.id, false, true, true)
                var e=null;
                //}*//*
                ProductOptionsForms.Form.extras_details.extras_details = d;
                Shopping.ActiveForm = "extras_details";
                
                set_temp_count=1;
				var ArHtml = new Array(); 
				/*var	e = '';
				   e += '<div class="popup_wrapper">';
				    e += '<div class="pop_header">';
                    e += '<div class="pop_heading"><h3><?= $lang_resource['PRODUCT_POTIONS_EDIT_YOUR_OPTIONS'] ?></h3></div>'
			
                    e += '<div class="pull_right pullrightDiv" >';
        	        e += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
       			    e += '</div>';
                    e += "</div>";
					
					 e += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
                    e += '<div class="editform">';
                    e += '<div class="leftcol">';*/
					var pindex = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);  
					var productDetail = Shopping.Menu.dishes[pindex];
					var curIdex = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
					
					//alert(JSON.stringify(productDetail));
						var e = '<div class="wrapper">';
					 e += '<div class="option_popup_header"><h3>'+Main.TitleCase(productDetail.name)+' '+Shopping.Business[curIdex].currency+''+productDetail.price+'</h3><span></span>';
					 e += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button>			</div>';
					 e += '</div>';					
					 e += '<div class="inwrap">';					  
					 e += '<div class="cont"><p style="font-size:12px;">'+Main.TitleCase(productDetail.description)+'</p>';
					 e += '<input type="hidden" id="hiddenqty" value="'+qty_count+'">';
					 e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
					 //alert(JSON.stringify(Shopping.Cart.business[0].dishes[edit_id]));
					 e += '<select name="" class="selectbox" onchange="ProductOption.updateOptionsquantity(this)">';
					 for(q = qty_count; q <= parseInt(qty_count+10); q++)
					 {
						if(Shopping.Cart.business[0].dishes[edit_id].quantity == q)
						{
							e += '<option value="'+q+'" selected>'+q+'</option>';
						}
						else
						{
							e += '<option value="'+q+'">'+q+'</option>';
						}
					 }//end of for
					 e += '</select>';
       				 e += '</div>';
					 
					 
					 if(person_stat == 1){
				     e += '<div class="cont">';
					 e += '<div class="allheader"><?=$lang_resource['SHOPPING_NO_OF_PERSON']?></div>';
					 e += '<select name="" class="selectbox" onchange="ProductOption.updateOptionsperson(this)">';
					 for(p = person_count; p <= parseInt(person_count+10); p++)
					 {
						if(Shopping.Cart.business[0].dishes[edit_id].nofperson == p)
						{
							e += '<option value="'+p+'" selected>'+p+' Person</option>';
						}
						else
						{
							e += '<option value="'+p+'">'+p+' Person</option>';
						}
						
					 }//end of for
					 e += '</select>';
					 e += '</div>';
					 }//end of person status
					 e += '</div>';	
					 
                     e += '<div class="editform">';
                     e += '<div class="leftcol">';
					
					var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);
				
					if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
						var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
						
						aObj = new Object();
						aObj.option_id = 0;
						aObj.setposition = 100;
					  
					    storeOptions.push(aObj);
					
					 ArHtml[0] = '<div class="pop_bloc">'
					 ArHtml[0] += '<h3 class="allheader"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
					  
					  for(var ing in ingredientsAll ) {
						
						  if(ProductOption.in_array(ingredientsAll[ing],arr_ingredients)) {
						
						ArHtml[0] += '<div class="pull_left ing-chekboxdp">';
        				ArHtml[0] += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="ProductOptionsForms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label" >'+ingredientsAll[ing]+'</label></div>';
       					ArHtml[0] += '</div>';
						   
						  }
						  else {
							
							 
						ArHtml[0] += '<div class="pull_left ing-chekboxdp">';
        				ArHtml[0] += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox_2 hand"" onchange="ProductOptionsForms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" class="ingredientPo" ></input><label for="' +"ing_"+ingredientsAll[ing] + '"  class="pop_label" >'+ingredientsAll[ing]+'</label></div>';
       					ArHtml[0] += '</div>';
							  }
						  
						  
					  }
					   
				
					   
					 ArHtml[0] += '</div>';
					}
					
					
					
                for(var qw=0;qw<data['review']['extras_details'].length;qw++) {
				//alert("1")
				
				  $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptionCount","id":'+ data['review']['extras_details'][qw]['set_id'] +',"position":'+ data['review']['extras_details'][qw]['position'] +"}]", function (b)
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
                            ids=[{"id":''+value['option_id']+'',"setposition":''+value['setposition']+'',"set_id":''+data['review']['extras'][0]['id']+''}];
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

							
                            $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptions","id":'+ temp +"}]", function (b)
                            {
								
								//alert(b)
								Main.Ready();
                                option_data=JSON.parse(b);
								Main.data=JSON.parse(b);
								
								aObj = new Object();
								aObj.option_id = value['option_id'];
								aObj.setposition = option_data['review']['extras_details'][0]['setposition'];
								
								
								storeOptions.push(aObj);
								
								cur_option =value['option_id'];
								
								
								 var showvalue = "dynamicname-"+value['option_id'];
                           
								ArHtml[cur_option] ='<div class="pop_bloc">';
									if(option_data['review']['extras_details'][0]['min_sel']>0) {
								ArHtml[cur_option] +='<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' (<?= $lang_resource['PRODUCT_POTIONS_ADD_REQUIRED'] ?>)</h3>';
								
									}
									else {
								ArHtml[cur_option] +='<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' </h3>';	
										}
    							 
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									//alert(JSON.stringify(option_data['review']['extras_details']))
									
									
									
									
									var cname = "dynamicname-"+option_value['option_id'];
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0)
									{
										
										var optionShowvalue = option_value['showoption'];
	/*******************************************************product option Checkbox Condition part*************************************/
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
		   $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
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
											
											
	/*******************************************product option Checkbox Condition part*************************************/						
								
									ArHtml[cur_option] += '<div class="pull_left ing-chekboxdp">';
        								 //e += '<div class=""><input type="checkbox" id="po1" name="checkbox" checked="checked" value="2" style="" class="switch checkbox_2 hand"></input><label for="po1" checked="checked" class="pop_label">Asian food</label></div>';
								    var dyid = option_value["choice_name"]+"-@"+option_value["choice_id"];
									//choice_name_drop-127
									ArHtml[cur_option] += '<div class="">' +ProductOptionsForms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],true,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],optionChoiceId,option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<label for="'+dyid+'" >&nbsp;</label><span  class=" field_label" onclick="ProductOption.checkedval(\'' + dyid + '\',1)" style="cursor:pointer"> '+  option_value['choice_name']  +'</span><span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
										 
         							ArHtml[cur_option] += '</div>';	
									
											 
										
									}
								
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
                                       

                                        choices. push({
                                            id: option_value['choice_id'],
                                            caption: option_value['choice_name']+" + "+"Price: "+option_value['price']
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
		     $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
                            {
								  
								
								   ProductOption.showcondition(b,fieldName,optionChoiceId)
								
							
							 });	
		  
		   
		    }
		   else {
			   
					   if(set_id != "X") {
						     
					  // document.getElementById(fieldName).innerHTML = "";
					   }
					 
			   }
		  				  var   idrs = "choice_name_drop-"+option_value['choice_id'];
		   							ArHtml[cur_option] += '<div class="pull_left ing-chekboxdp">';
        							ArHtml[cur_option] += '<div class="">' + ProductOptionsForms.CreateRadioPropertyChoiceEdit("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], true,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id'],true) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'">&nbsp;</label><span  class=" pop_label" onclick="ProductOption.checkedval(\'' + idrs + '\',2)"  style="cursor:pointer">'+option_value['choice_name']+'</span><span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
       								ArHtml[cur_option] += '</div>';
		   
										} else {
											
											
									 var   idrs = "choice_name_drop-"+option_value['choice_id'];
											
									ArHtml[cur_option] +='<div class="pull_left ing-chekboxdp">';
        							ArHtml[cur_option] += '<div class="">' + ProductOptionsForms.CreateRadioPropertyChoiceEdit("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], false,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'">&nbsp;</label><span  class=" pop_label" onclick="ProductOption.checkedval(\'' + idrs + '\',2)"  style="cursor:pointer">'+option_value['choice_name']+'</span><span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
       								 ArHtml[cur_option] += '</div>';
										
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
						    
							ArHtml[cur_option] += '<div class="pull_left"  style="width:80%;">' + ProductOptionsForms.CreateSelectPropertyChoiceext("extras_details", "choice_ingredients-"+value["option_id"],choices_ing,stores, '',"ProductOption.ChangeIngredient(this)",true,'','',optionChoiceId) + '<span id="ing_1_choice_ingredients-'+value["option_id"]+'" class="wholepo1" ><img src="images/common/left.png" /></span><span id="ing_2_choice_ingredients-'+value["option_id"]+'"  class="wholepo2"><img src="images/common/whole.png" /></span><span id="ing_3_choice_ingredients-'+value["option_id"]+'"  class="choosepizaText" ><img src="images/common/right.png" /></span></div>&nbsp;&nbsp;</span></div>';
							
                                    ingredients=0;
							//	}
                              }
							  
							  ArHtml[cur_option] +='</div><div id="'+showvalue+'" ></div>';  

                               
                                count_temp++;
                               

                               if(option_count == count_temp)
                                {
                                storeOptions.sort(Main.SortByProperty('setposition'));	
		/******************************************************Rank Checking*******************************************************/						
								for (var D in storeOptions) {
									
									var Dy = storeOptions[D].option_id;
									
									e += ArHtml[Dy];
									}
		/******************************************************Rank Checking*******************************************************/
								  var is=0;
								  
		e += '<div class="inwrapbox">';
		e += '<div class="cont">';
									e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></div>';
									e += '<textarea  placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)">'+Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments)+'</textarea>';
									e += '</div>';
									e += '<div style="margin: 0px auto; text-align: center;"><button type="button" class="addcart addcartwine" onclick="ProductOption.EditEndUserChoices()"><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></div>';
									e += ' </div>';
									e += ' </div>';
							     e += "</div>";
								 e += "</div>";
    
    	/* e += '<center><button type="button" id="pop_submit_btn" class="pop_submit_btn addtocartpo" onclick="ProductOption.EditEndUserChoices()" ><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></center>';*/
    
   		 e += '</div>';
		 		$('#loader_dv').removeClass( "addloader" );
				
				 $("#dish_"+id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + id + '_imglink"  onclick="ProductOption.add_product_options_db(this,' + id + ')"><img src="images/step3-menu-list/add-icon-big.png"></a>');
		

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


				}

            });
        cart_object=cart;
        cart_id=edit_id;

    },
	 showcondition:function(b,fieldName,productOptions){
		 /*alert(JSON.stringify(b));*/
		 
	
		
	var flag = 0;
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
								//alert(option_data['review']['extras_details'][0]['option_id'])
							
								var k='';
													
							
			       var  e ="";
			
							   
							   	e +='<div class="pop_bloc">';
									if(option_data['review']['extras_details'][0]['min_sel']>0) {
										  e +='<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' (<?= $lang_resource['PRODUCT_POTIONS_ADD_REQUIRED'] ?>)</h3>';
								
									}
									else {
										  e +='<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' </h3>';	
										}
								
							
                                $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
									
									if(ProductOption.in_array(option_value["choice_id"],optionChoiceIds_arr)) {
										
											 
								var optionShowvalue = option_value['showoption'];
													
								if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
									
									  var set_id = option_value['set_id'];
									  var optionShowvalue = option_value['showoption'];
									  var fieldName = showvalue;
							  
							  
							
						  var idss=[{"id":''+optionShowvalue+'',"set_id":set_id}];
						  
						  
						 
						   temps=JSON.stringify(idss);
						 
							//  alert(temps)
						   Main.Loading(true)
						   $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
											{
												  
												var showvalue = "dynamicname-"+option_data['review']['extras_details'][0]['option_id'];
												   ProductOption.showcondition(b,showvalue,productOptions)
												
											
											 });	
						  
						   
							}
						   else {
							   
									   if(set_id != "X") {
											 
									  // document.getElementById(fieldName).innerHTML = "";
									   }
									 
							   }
						}	
									//alert(option_value["choice_name"])
									var cname = "dynamicname-"+option_value['option_id'];
									
                                    if(option_value['max_sel']>1 && option_value['min_sel']>=0) {
										
										var ConditionRecord = new Object();
									    var  with_respect_parent = 	option_value['with_respect_to'].split(",");
										ConditionRecord.status = true;
										ConditionRecord.parentBox = fieldName;
										ConditionRecord.parentBoxid = with_respect_parent[0];
										ConditionRecord.parentclickid = with_respect_parent[1];
										ConditionRecord.parenrText = option_value['choice_name_prn'];
										
										
										  e += '<div class="pull_left ing-chekboxdp">';
        								
										 var dyid = option_value["choice_name"]+"-@"+option_value["choice_id"];
										 e += '<div class="">' +ProductOptionsForms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],true,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],productOptionss,option_value['showoption'],option_value["choice_id"],option_value['set_id'],JSON.stringify(ConditionRecord))+'<label for="'+dyid+'" >&nbsp;</label><span  class=" field_label" style="cursor:pointer"  onclick="ProductOption.checkedval(\'' + dyid + '\',1)"> '+  option_value['choice_name']  +'</span><span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
										 
         								 e += '</div>';
				
					 
									}
										
							
                                    else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
                                     
                                        flag=1;
                                    }
                            
                                  });
						
								
                              if(flag==1) {
                            
								 e += '<div class="select" >';
								 
								   $.each(option_data['review']['extras_details'],function(option_index,option_value)
                                {
								
						if(ProductOption.in_array(option_value["choice_id"],optionChoiceIds_arr)) {/*
										
											 
								var optionShowvalue = option_value['showoption'];
													
								if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
									
									  var set_id = option_value['set_id'];
									  var optionShowvalue = option_value['showoption'];
									  var fieldName = showvalue;
							  
							  
							
						  var idss=[{"id":''+optionShowvalue+'',"set_id":set_id}];
						  
						  
						 
						   temps=JSON.stringify(idss);
						 
							//  alert(temps)
						   Main.Loading(true)
						   $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
											{
											
												  
												var showvalue = "dynamicname-"+option_data['review']['extras_details'][0]['option_id'];
												   ProductOption.showcondition(b,showvalue,productOptions)
												
											
											 });	
						  
						   
							}
						   else {
							   
									   if(set_id != "X") {
											 
									  // document.getElementById(fieldName).innerHTML = "";
									   }
									 
							   }
						*/}	
							
									
									
									
									
									var cname = "dynamicname-"+option_value['option_id'];
									
									var chkv = false; 	
									  
									if(productOptionss) {
										if(ProductOption.in_array(option_value["choice_id"],optionChoiceIds_arr)) {
											
												var chkv = true; 
													}
													
													
										} 
									var ConditionRecord = new Object();
									    var  with_respect_parent = 	option_value['with_respect_to'].split(",");
										ConditionRecord.status = true;
										ConditionRecord.parentBox = fieldName;
										ConditionRecord.parentBoxid = with_respect_parent[0];
										ConditionRecord.parentclickid = with_respect_parent[1];
										ConditionRecord.parenrText = option_value['choice_name_prn'];
										
									 var   idrs = "choice_name_drop-"+option_value['choice_id'];
									e += '<div class="pull_left ing-chekboxdp">';
        							e += '<div class="">' + ProductOptionsForms.CreateRadioPropertyChoice("extras_details","choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+option_value["option_id"],option_value['choice_id'], chkv,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id'],'',JSON.stringify(ConditionRecord)) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'"  style="cursor:pointer">&nbsp;</label><span  class=" pop_label" onclick="ProductOption.checkedval(\'' + idrs + '\',2)" >'+option_value['choice_name']+'</span>';
									
									e += '<span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
       								 e += '</div>';
									
											
								 });			
								// e +='</div>';
							 }
							  e +='</div>';
                                i++;
							
                               var showvalue = "dynamicname-"+option_data['review']['extras_details'][0]['option_id'];
							   
                     
                                
								
								
								
								
                                count_temp_old++;
								//alert(JSON.stringify(data['review']['option_counts']))
                                if(option_count_old<=count_temp_old){

                                    set_temp_count++;
                                    count_temp_old=0;

                                }
								
                                if(set_temp_count>set_count)
                                {
                                  //  alert("hii");
								  var is=0;
                                  
									 e += "</div>";

                       
        
                                }
								e +='<div id="'+showvalue+'" ></div>';  
								
					
						/*alert("ok13")
						alert(e)*/
                       document.getElementById(fieldName).innerHTML = e;       
                    
		 },
    add_sets:function(id,set_id){

        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptionCount","id":'+ set_id +"}]", function (b)
        {
            data=JSON.parse(b);
            console.log(data);
            Shopping.ExtraChoiceForm(data);
        });
        div_data=null;
        div_data=id;
    },
SaveEndUserChoices: function(){
	
	var qty_count = $('#qty_count').val();
	var person_count = $('#person_count').val();
	var hiddenperson = $('#hiddenperson').val();
	if(document.getElementById("hiddenqty")) {
	 hiddenqty = $('#hiddenqty').val();
	}
	else
	{
		hiddenqty = 0;	
	}
	//hiddenqty_status
	if(document.getElementById("hiddenqty_status")) {
		hiddenqty_status = $('#hiddenqty_status').val();//quantity status Y/N
	}
	else
	{
		hiddenqty_status = 0;	
	}
	
	if(qty_count == 0)
	{
		alert('Please select Quantity');
		return false;	
	}
	if(hiddenperson == 1){
		if(person_count == 0)
		{
			alert('Please select No of Person');
			return false;	
		}
	}
	else
	{
		var personsec = 0;
	}
	
	
	
	var sp = new Array();
	for(k in ProductOptionsForms.Form.extras_details.fields)
	{
		if(ProductOptionsForms.Form.extras_details.fields[k].parentclickid){
			
			
			var checOptionkval = "choice_name_drop"+ProductOptionsForms.Form.extras_details.fields[k].parentBoxid; // for radio
			var checkboxKey = k.split("@"); // for checkbox
			
			
			if(ProductOptionsForms.Form.extras_details.fields[checOptionkval]) {
				
						if(ProductOptionsForms.Form.extras_details.fields[checOptionkval].id != ProductOptionsForms.Form.extras_details.fields[k].parentclickid) {
							
							delete ProductOptionsForms.Form.extras_details.fields[k];
						
						}
			}
			else if(checkboxKey[2]) {
				
				
				
				
				
				
				}
			
		}
		
		
	}
	for(k in ProductOptionsForms.Form.extras_details.fields)
	{
		if(!ProductOption.in_array(ProductOptionsForms.Form.extras_details.fields[k].name,sp)) {
			if(Main.NullToEmpty(ProductOptionsForms.Form.extras_details.fields[k].name)!="") {
		 sp.push(ProductOptionsForms.Form.extras_details.fields[k].name)
			}
	 //alert(ProductOptionsForms.Form.extras_details.fields[k].name)	
		}
	}
	//alert(JSON.stringify(ProductOptionsForms.Form))
	for(s in ProductOptionsForms.Form ) {
		 
			
			if(ProductOption.in_array(ProductOptionsForms.Form[s].name,sp)) {
			
			//alert(JSON.stringify(ProductOptionsForms.Form[s]))
			if(ProductOptionsForms.Form[s].counti<ProductOptionsForms.Form[s].mini) {
				
			
					alert("<?=$lang_resource['PRODUCTOPTION_ADDTOCART_ERROR']?> "+ProductOptionsForms.Form[s].mini+' <?=$lang_resource['PRODUCTOPTION_ADDTOCART_ERROR_NEED_ADD']?> '+ProductOptionsForms.Form[s].text);
				    return false ;
				
			}
				else {
					delete ProductOptionsForms.Form[s];
					}
	
		}
		}
	
        console.log( ProductOptionsForms.Form.extras_details.fields);
        console.log( ProductOptionsForms.Form.extras_details);
		
		if(ProductOptionsForms.Form.extras_details.comments != "" && ProductOptionsForms.Form.extras_details.comments) {
		ProductOptionsForms.Form.extras_details.comments  = encodeURIComponent(ProductOptionsForms.Form.extras_details.comments);
		}
		else {
		ProductOptionsForms.Form.extras_details.comments  = "";	
		}
        var e = true;
        Main.Loading(true);
      
        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetTotalPrices","ids":'+JSON.stringify(ProductOptionsForms.Form.extras_details)+"}]", function (b)
            {
			
			
                b=JSON.parse(b);
				mychoice_data[choice_count++]=b;
				var total_price = Main.GetPropertyValueOnPropertyValueFound(Shopping.Menu.dishes, "id", div_data, "price");
				if(total_price == "") {
					total_price =0;
					}
					
                total_price = parseFloat(parseFloat(total_price) + parseFloat(b['review']['price'])).toFixed(Main.IS_DECIMAL_POINT);
				
                total_price = Shopping.FormatPriceNotFree(Shopping.FixToDecimal(total_price.toString()));
             
			 
               var temp='<span class="pdct_op_block">';
			   if(Shopping.ingredientStore.length>0) {
				   
			     var ingredients = Shopping.ingredientStore.join(", ");
			  
			   } else {
				   
				  var ingredients = "";   
				  
				   }
			  
			   var temPoOnly = ""
			   var temOnlyOptions  = ""
			  
			  if(Shopping.ingredientStore.length>0) {
				  
				  
			 
			   for(var ing in Shopping.ingredientStore) {
				   
				    
					temPoOnly += Shopping.ingredientStore[ing]+",";
					
				    
					temOnlyOptions +=  "_@_<?=$lang_resource['Ingredients_V2']?>@u@"+Shopping.ingredientStore[ing];
				
				   }
				  
			  }
			  
               var l=0;
			   
			    b['review']['product_option_element'].sort(Main.SortByProperty("option_id"));
				var store_option_id = 0;
				
				
				 
			   for(var e in b['review']['product_option_element']) {
				   
				  
				   
				   if(e == 0)
					{
					
					temPoOnly += b['review']['product_option_element'][e].option_text_to_end_user+" : ";
	
					}
					

			if(b['review']['product_option_element'][e].extraprice == "0" || b['review']['product_option_element'][e].extraprice == 0 || b['review']['product_option_element'][e].extraprice =="0.00") {           
			         
						temPoOnly += b['review']['product_option_element'][e].text+",";
						temOnlyOptions +=  "_@_"+b['review']['product_option_element'][e].option_text_to_end_user+"@u@"+b['review']['product_option_element'][e].text;
					
				   } else {
						
						temPoOnly += b['review']['product_option_element'][e].text+",";
						temOnlyOptions +=  "_@_"+b['review']['product_option_element'][e].option_text_to_end_user+"@u@"+b['review']['product_option_element'][e].text+' +  '+Shopping.ActiveBusinesscurrency+''+parseFloat(b['review']['product_option_element'][e].extraprice).toFixed(Main.IS_DECIMAL_POINT);
				 
				    	
				   }
				  
				store_option_id = b['review']['product_option_element'][e].option_id;
						
					
					
			   }
				  
				   
				   if(temPoOnly !="") {
				 Main.temPoOnly = temPoOnly;
				 Main.temOnlyOptions = temOnlyOptions;
				 }
				   
				   
               console.log(temp);
			  if(b['review']['comments']) {
				  var comresolt = b['review']['comments']
				  } else {
					 var comresolt = "";  
					  }
				
			    if(ingredients) {
					Main.ingredients  = ingredients;
				} else  {
					Main.ingredients  = '';
					}
			
			    Shopping.AddToCart(cart_object,'' + cart_id + '',temOnlyOptions,comresolt,b.review.choice_allid,total_price,'',Main.ingredients);
			    quantitysec = 0;
                cart_object=null;
                cart_id=null;
            });

        Popup.Close();
        ProductOptionsForms.Clean("extras_details")
    },
	Margeslash : function (text){

	
	var res = text.split("_@_");
	var p = Array();
	for(var po in res){
	
	
	var poption = res[po].split("@u@");
	
	
	var a = Object();
	a.optionheader=poption[0];
	a.optionchoice=poption[1];
	
	
	
	if(poption[0]!=""){
	p.push(a)	
	}
	
	}

	
	var c ='';
	var previousHeader = '';
	c+='<ul class="pdct_op">'
	var lasti =0;
	for(var e in p){
		
	if(lasti == 0 ) {
	c+='<h4>'+p[e].optionheader+'</h4>'
	c+='<li>'+p[e].optionchoice+'</li>'
		}
	else if(previousHeader == p[e].optionheader ) {
	
    c+='<li>'+ p[e].optionchoice+'</li>';
	}
	else if(previousHeader != p[e].optionheader ) {
		
	c+='<h4>'+p[e].optionheader+'</h4>'
    c+='<li>'+p[e].optionchoice+'</li>';
	}
	previousHeader = p[e].optionheader;
	lasti++;
	}
	c+='</ul>'


	return c;

		},
	
	AddFromCart :function (c, d) {
		
		  var  quantity=Shopping.Cart.business[c].dishes[d].quantity;

       if(quantity<1){
   
	lastid -= 1;
	var n = "";
	
	if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
			
			
			n += RestMenuList.MenuCartlist(i)
			
 			

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
  		   //points;
  		// alert(Shopping.Cart.business[c].dishes[d].points)
  		 
  		 	//alert("inside")
  		 	var points=Shopping.Cart.business[c].dishes[d].points;
  		 	if(points==null)
			{

			}
			else if(points=="NaN")
			{

			}

         else
         {
         	//alert("dfsdfsd")
         	//alert(points)
          	  //var points=Shopping.Cart.business[c].dishes[d].points;
        	  points=points/quantity; 
      	}
		// var points=parseInt(Shopping.Cart.business[c].dishes[d].points)/quantity;
		 
		 
		  
         var total=parseFloat(Shopping.Cart.business[c].dishes[d].total);
           total=total/quantity;
          var quantity=quantity+1;
		  
		

		if(mychoice_data[d]) {
           mychoice_data[d]['review']['quantity']=quantity;
		}

           Shopping.Cart.business[c].dishes[d].quantity=quantity;
		   
           Shopping.Cart.business[c].dishes[d].total=parseFloat(Shopping.Cart.business[c].dishes[d].total)+total;
           if(Main.User!=null)
		   {
		   //	alert(Main.User)
		   	if(Main.ItemPointPermission==1){
		   		if(Main.GlobalPointSettings==0)
		   		{
		 	 	 Shopping.Cart.business[c].dishes[d].points=parseInt(Shopping.Cart.business[c].dishes[d].points)+points;
		 		}
		 		else
		 		{
					Shopping.Cart.business[c].dishes[d].points=parseInt(Shopping.Cart.business[c].dishes[d].points)+points;		 			
		 		}

		   	}
		   }
		   if(viewDevice == "Mobile") {
			if(GlobalPagecheck == "2")
			{
			    Checkout.OrderDetails(true);
			}
			   if(GlobalPagecheck == "3")
			{
				Shopping.GetCartItemsCount();
			    Checkout.OrderDetailsPage(true);
			}
			   return false;
		   }
           if (Shopping.Cart.business.length != 0) {
               for (var i = 0;i <= lastid;i++){
				  
				  
				   
				   n += RestMenuList.MenuCartlist(i)


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
           
           if(Shopping.Cart.business[c].dishes[d].points !=0)
           {
           		ProductOption.CalculatePointValue();
           }
           else if(Shopping.Cart.business[c].dishes[d].points !=null)
           {
           		ProductOption.CalculatePointValue();
           }
           else
           {

           }
		   // for(var beido in Main.fetchbusinesspointsenabled)
					//    	{
					//    		if(Shopping.ActiveBusiness==Main.fetchbusinesspointsenabled[beido].business_id)
					//    //	alert(Main.availablepoint)
					// 		{  
     //       						ProductOption.CalculatePointValue();
     //       						break;
     //       					}
     //       				}
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
					$("#cart_servicefeeid").html("0.00");
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
		
		   ProductOptionsForms.Form.extras_details.comments = d.value;
		
		 },
    EditEndUserChoices:function(){
	
		//alert(JSON.stringify(ProductOptionsForms.Form.extras_details.fields))
		//alert('inside Edit');
		
		
		if(!ProductOptionsForms.Form.extras_details.comments) {
		//	alert(ProductOptionsForms.Form.extras_details.edit_id)
			var edit_id = ProductOptionsForms.Form.extras_details.edit_id;
			
			ProductOptionsForms.Form.extras_details.comments = Main.NullToEmpty(Shopping.Cart.business[0].dishes[edit_id].comments);
			}
			
			for(k in ProductOptionsForms.Form.extras_details.fields)
	{
		if(ProductOptionsForms.Form.extras_details.fields[k].parentclickid){
			
			
			var checOptionkval = "choice_name_drop"+ProductOptionsForms.Form.extras_details.fields[k].parentBoxid; // for radio
			var checkboxKey = k.split("@"); // for checkbox
			
			
			if(ProductOptionsForms.Form.extras_details.fields[checOptionkval]) {
				
						if(ProductOptionsForms.Form.extras_details.fields[checOptionkval].id != ProductOptionsForms.Form.extras_details.fields[k].parentclickid) {
							
							delete ProductOptionsForms.Form.extras_details.fields[k];
						
						}
			}
			else if(checkboxKey[2]) {
				
				
				
				
				
				
				}
			
		}
		
		
	}
	
		
        console.log( ProductOptionsForms.Form.extras_details.fields);
        console.log( ProductOptionsForms.Form.extras_details);
		
		if(ProductOptionsForms.Form.extras_details.comments != "" && ProductOptionsForms.Form.extras_details.comments) {
		ProductOptionsForms.Form.extras_details.comments  = encodeURIComponent(ProductOptionsForms.Form.extras_details.comments);
		}
		else {
		ProductOptionsForms.Form.extras_details.comments  = "";	
		}
        var e = true;
        Main.Loading();
        
		edit_id=ProductOptionsForms.Form.extras_details.edit_id;
		
		//alert(edit_id)
		
		//alert(JSON.stringify(ProductOptionsForms.Form.extras_details));
        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetTotalPricesEdit","ids":'+JSON.stringify(ProductOptionsForms.Form.extras_details)+"}]", function (b)
            {
			
				//alert(b);
                b=JSON.parse(b);

                mychoice_data[choice_count++]=b;
				Main.Ready()

              var item_id = Shopping.Cart.business[0].dishes[edit_id].id
			  var Fi = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", item_id);
			  var J = Shopping.Menu.dishes[Fi];
          
			var total_price = parseFloat(parseFloat(J.price) + parseFloat(b['review']['price'])).toFixed(Main.IS_DECIMAL_POINT);		
             
			  
  var temp='';
  var temOnlyOptions ='';
  var temPoOnly = "";
			    if(Shopping.ingredientStore.length>0) {
			   var  ingredients = Shopping.ingredientStore.join(", ");
			   } else {
			   var  ingredients = " "; 
				   
				   }
			  
			 
			  if(Shopping.ingredientStore.length>0) {
				  
				  
			 temp +='<ul class="pdct_op">';
			 temp +='<h4><?=$lang_resource['Ingredients_V2']?></h4>';
			   for(var ing in Shopping.ingredientStore) {
				   
				    
					temPoOnly +=Shopping.ingredientStore[ing]+",";
					temp +='<li>'+Shopping.ingredientStore[ing]+'</li>';
					temOnlyOptions +=  "_@_<?=$lang_resource['Ingredients_V2']?>@u@"+Shopping.ingredientStore[ing];
				    
				
				
				   }
				   temp +='</ul>';
			  }
			  
               var l=0;
			   
			    b['review']['product_option_element'].sort(Main.SortByProperty("option_id"));
				var store_option_id = 0;
				
				
			   for(var e in b['review']['product_option_element']) {
				   
				   
				   if(b['review']['product_option_element'][e].extraprice == "0" || b['review']['product_option_element'][e].extraprice == 0 || b['review']['product_option_element'][e].extraprice =="0.00") {
                     
                      	temp +='<li>'+b['review']['product_option_element'][e].text+'</li>';
						 temPoOnly +=b['review']['product_option_element'][e].option_text_to_end_user+" : ";
						 
						  temOnlyOptions +=  "_@_"+b['review']['product_option_element'][e].option_text_to_end_user+"@u@"+b['review']['product_option_element'][e].text;	
				   

					} else {
						 temp +='<li>'+b['review']['product_option_element'][e].text+' +  '+Shopping.ActiveBusinesscurrency+''+parseFloat(b['review']['product_option_element'][e].extraprice).toFixed(Main.IS_DECIMAL_POINT);	+'</li>';
						  temPoOnly +=b['review']['product_option_element'][e].option_text_to_end_user+" : ";
						  temOnlyOptions +=  "_@_"+b['review']['product_option_element'][e].option_text_to_end_user+"@u@"+b['review']['product_option_element'][e].text+' +  '+Shopping.ActiveBusinesscurrency+''+parseFloat(b['review']['product_option_element'][e].extraprice).toFixed(Main.IS_DECIMAL_POINT);	
				
				   }
					
					
				   
					
				store_option_id = b['review']['product_option_element'][e].option_id;
						
					
					
			   }
				   temp +='</span>';
			    if(b['review']['comments']) {
				  var comresolt = b['review']['comments']
				  } else {
					 var comresolt = "";  
					  }
				
				
				//alert(JSON.stringify(Shopping.Cart.business[0].dishes[edit_id].quantity));	  
			    Shopping.Cart.business[0].dishes[edit_id].quantity = quantitysec;
				Shopping.Cart.business[0].dishes[edit_id].nofperson = personsec;
				Shopping.Cart.business[0].dishes[edit_id].options = temOnlyOptions;
				Shopping.Cart.business[0].dishes[edit_id].optionsOnlytext = temPoOnly;
				Shopping.Cart.business[0].dishes[edit_id].ingredients = ingredients;
				Shopping.Cart.business[0].dishes[edit_id].comments = comresolt;
				Shopping.Cart.business[0].dishes[edit_id].price = total_price;
				//alert(b['review']['choice_allid'])
				Shopping.Cart.business[0].dishes[edit_id].optionChoiceId = b['review']['choice_allid'];
				Shopping.Cart.business[0].dishes[edit_id].total = parseFloat(parseFloat(total_price)*quantitysec).toFixed(Main.IS_DECIMAL_POINT);
				
				if(Shopping.Cart.business) {
              $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> '+quantitysec+' <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
				}
				else {
					$("#orderprice").html("0.00");
					$("#cart_taxid").html("");
					$("#cart_servicefeeid").html("0.00");
					 $("#itemCount").html('<?= $lang_resource['SHOPPING_YOU_HAVE'] ?> <span> 0 <?= $lang_resource['SHOPPING_ITEMS'] ?></span>');
		}
			
			var n = "";	
                if (Shopping.Cart.business.length != 0) {
		for (var i = 0;i <= lastid;i++){
			
			n += RestMenuList.MenuCartlist(i)


		    $("#plc_rgt_in").html(n);
		}del = 1;
	}
			if(viewDevice == "Desktop")
			{
                    Shopping.UpdateCartTotals();
                    Shopping.GetCartItemsCount();
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
        ProductOptionsForms.Clean("extras_details")
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
			   $("#ing_1_"+b.id).css('display','block');
               $("#ing_2_"+b.id).css('display','none');
               $("#ing_3_"+b.id).css('display','none');
           }
        else if(ch_id.indexOf("Whole")>-1)
           {
			     
               $("#ing_1_"+b.id).css('display','none');
               $("#ing_2_"+b.id).css('display','block');
               $("#ing_3_"+b.id).css('display','none');
           }
           else if(ch_id.indexOf("Right")>-1)
           {
			    
               $("#ing_1_"+b.id).css('display','none');
               $("#ing_2_"+b.id).css('display','none');
               $("#ing_3_"+b.id).css('display','block');
           }
		   else {
			    $("#ing_1_"+b.id).css('display','none');
               $("#ing_2_"+b.id).css('display','none');
               $("#ing_3_"+b.id).css('display','none');
			   
			   }
    }else{
     
	    
	   		   $("#ing_1_"+b.id).css('display','none');
               $("#ing_2_"+b.id).css('display','none');
               $("#ing_3_"+b.id).css('display','none');
			    document.getElementById(b.id).getElementsByTagName('option')[0].selected = 'selected';
    }
	
       
    },
   
CalculatePointValue:function(){
	if(Main.User)
	{
		if(Main.ItemPointPermission==1)
		{
		if(Main.GlobalPointSettings==1)
		{
			// alert("b")
			// alert(Main.availablepoint)
			// if(Main.GlobalPointSettings==1)
			// 	{
		for(var ooid in Main.fetchusersorderbusiness)
		{
			if(Main.fetchusersorderbusiness[ooid].business_id == Shopping.ActiveBusiness)
			{
			if(Main.availablepoint!=0)
				{
					var totalpointwantuse= $("#pointssubmit").attr('value');
					// alert("ddfd");
					// alert(totalpointwantuse);
					if(totalpointwantuse!=null)
					{
					
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetPointValue","business_id":'+ Shopping.ActiveBusiness +'}]', function (b)
			            {
			            	if(b!="")
			            	{
			            		//alert(b)
			            		b = JSON.parse(b);
			            		var totalpointwantuse= $("#pointssubmit").attr('value');

			            		if(totalpointwantuse <= Main.availablepoint)
			            		{
					            	pointvalue=b.pointvalue;

				            		totalpointsvalues=pointvalue*totalpointwantuse;

				            		if(totalpointsvalues>=Shopping.Cart.total)
				            		{
				            			//alert(totalpointsvalues);
				            			alert("Please Enter less amount of points which is less than or equals to the total price");
				            		}
				            		else
				            		{
				            			//alert( $("#orderprice").attr('value') );
					            		var finalvalue=Shopping.Cart.total-totalpointsvalues;
					            		var availablepointsaftr=Main.availablepoint-totalpointwantuse;

					            		$("#availablepoints").html(' <span>'+availablepointsaftr.toFixed(Main.IS_DECIMAL_POINT)+'</span>');
					            		$("#pointsapplied").html(' <span>'+totalpointwantuse+'</span>');
					            		$("#totalorderprice").html(' <span>'+finalvalue.toFixed(Main.IS_DECIMAL_POINT)+'</span>');
					            		Shopping.Cart.totalfinla=finalvalue.toFixed(Main.IS_DECIMAL_POINT);
					            		//alert(Shopping.Cart.totalfinla);
					            		//Shopping.Cart.
					            		Shopping.Cart.AvailablePointsAftr=Main.availablepoint-totalpointwantuse;
					            		Shopping.Cart.Total_Point_Used=totalpointwantuse;
					            		Shopping.Cart.usedpointvalue=totalpointsvalues;
				            			//	Shopping.UpdateCartTotals();
				            			//Shopping.UpdateTotals();
				            		}
				            	}
				            	else
				            	{
				            		alert("Sorry!! You have entered greater than the points you have.");
				            	}
			            		
			            	}

			            });
						}
					}
				}
				}
		}
		else
		{
			//alert("b")
			//alert(Main.availablepoint)
			// if(Main.GlobalPointSettings==1)
			// 	{
		// for(var ooid in Main.fetchusersorderbusiness)
		// {
			// if(Main.fetchusersorderbusiness[ooid].business_id == Shopping.ActiveBusiness)
			// {
			if(Main.availablepoint!=0)
				{
					var totalpointwantuse= $("#pointssubmit").attr('value');
					// alert("a");
					// alert(totalpointwantuse);
					if(totalpointwantuse!=null)
					{
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetPointValue","business_id":'+ Shopping.ActiveBusiness +'}]', function (b)
			            {
			            	//alert("c")
			            	if(b!="")
			            	{
			            		//alert(b)
			            		b = JSON.parse(b);
			            		var totalpointwantuse= $("#pointssubmit").attr('value');
			            		if(totalpointwantuse <= Main.availablepoint)
			            		{
					            	pointvalue=b.pointvalue;

				            		totalpointsvalues=pointvalue*totalpointwantuse;
				            		if(totalpointsvalues>=Shopping.Cart.total)
				            		{
				            			//alert(totalpointsvalues);
				            			alert("Please Enter less amount of points which is less than or equals to the total price");
				            		}
				            		else
				            		{

						            		//alert( $("#orderprice").attr('value') );
						            		var finalvalue=Shopping.Cart.total-totalpointsvalues;
						            		var availablepointsaftr=Main.availablepoint-totalpointwantuse;

						            		$("#availablepoints").html(' <span>'+availablepointsaftr+'</span>');
						            		$("#pointsapplied").html(' <span>'+totalpointwantuse+'</span>');
						            		$("#totalorderprice").html(' <span>'+finalvalue.toFixed(Main.IS_DECIMAL_POINT)+'</span>');
						            		Shopping.Cart.totalfinla=finalvalue.toFixed(Main.IS_DECIMAL_POINT);

						            		//alert(Shopping.Cart.totalfinla);
						            		//Shopping.Cart.
						            		Shopping.Cart.AvailablePointsAftr=Main.availablepoint-totalpointwantuse;
						            		Shopping.Cart.Total_Point_Used=totalpointwantuse;
						            		Shopping.Cart.usedpointvalue=totalpointsvalues;
						            	//	Shopping.UpdateCartTotals();
						            		//Shopping.UpdateTotals();
				            		}
				            	}
				            	else
				            	{
				            		alert("Sorry!! You have entered greater than the points you have.");
				            	}
			            		
			            	}

			            });
					 }
					}
				//}
				//}
		}
		//}
	}
	}

	},
	CheckPointValueGreaterThanTotalValue:function(){
		var totalpointwantuse= $("#pointssubmit").attr('value');
		if(totalpointwantuse!=null)
					{
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetPointValue","business_id":'+ Shopping.ActiveBusiness +'}]', function (b)
			            {
			            	//alert("c")
			            	if(b!="")
			            	{
			            		b = JSON.parse(b);
			            		
			            		if(totalpointwantuse <= Main.availablepoint)
			            		{
					            	pointvalue=b.pointvalue;

				            		totalpointsvalues=pointvalue*totalpointwantuse;
				            		if(totalpointsvalues>=Shopping.Cart.total)
				            		{
				            			alert(totalpointsvalues);
				            			alert("Please Enter less amount of points which is less than or equals to the total price");
				            		}
				            	}
			            	}
			            });
				}

	},

   ChangePrice:function(b,option_id,set_id){
        ch_id=b.options[b.selectedIndex].value;
         ids=[{"choice_id":''+ch_id+'',"set_id":''+set_id+'',"option_id":''+option_id+''}];
        console.log(ids);
        temp=JSON.stringify(ids);
        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetPrices","ids":'+ temp +"}]", function (b)
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
 $('#loader_dv').addClass( "addloader" );
   $("#dish_"+Shopping.Cart.business[0].dishes[i].id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + Shopping.Cart.business[0].dishes[i].id + '_imglink"  onclick="ProductOption.add_product_options_db(this,' + Shopping.Cart.business[0].dishes[i].id + ')"><img src="images/step3-menu-list/add-icon-big.png"></a>');
   
    console.log(Shopping.Cart.business[0].dishes[i]);
    ProductOption.edit_product_options(Shopping.Cart.business[0].dishes[i].id,i);

    },  
	updateOptionsquantity : function(frm) {
		quantitysec = parseInt(frm.value);
		
		},
	updateOptionsperson : function(frm) {
		personsec = parseInt(frm.value);
		},
    add_product_options:function(cart,id){
	   if (Main.Busy) {
		   return false;
		   }
		 var storeOptions = new Array();
		  Shopping.ingredientStore = new Array();
		
		
        $.post("panel/lib/productoption.php", 'data=[{"operation":"GetAllSets","id":'+id+"}]", function (b){

			var data=JSON.parse(b);
			var qty_stat = data.review.extras_details[0].qty;
			var qty_count = data.review.extras_details[0].qty_count;
			var person_count = data.review.extras_details[0].person_count;
			
			var set_total_option_count = data.review.option_count;
			var count_temp=0;
			
			if(qty_stat == 1){
				var qty_count1 = parseInt(qty_count);
				var person_count1 = parseInt(person_count);
			}else{
				var qty_count1 = 1;
				var person_count1 = 1;
			}
			
            var flag=0;
			var count=0;
			var option_count =0;
				
			var e='';
			set_count= data['review']['extras_details'].length;
			ProductOptionsForms.Clean("extras_details", "popupmainbuttonok");
			d = new Object();
			ProductOptionsForms.Form.extras_details.type = "create";
			ProductOptionsForms.Form.extras_details.setid = data['review']['extras_details'];
			var e=null;
			ProductOptionsForms.Form.extras_details.extras_details = d;
			this.ActiveForm = "extras_details";
			set_temp_count=1;
		
			var pindex = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);  
			var productDetail = Shopping.Menu.dishes[pindex];
			var curIdex = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);


			var e = '<div class="wrapper">';
			e += '<div class="option_popup_header"><h3>'+Main.TitleCase(productDetail.name)+' '+Shopping.Business[curIdex].currency+''+productDetail.price+'</h3> <span></span>';
			e += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button>			</div>';
			e += '</div>';

			e += '<div class="inwrap">';
			e += '<input type="hidden" id="hiddenqty" value="'+qty_count+'">';
			e += '<input type="hidden" id="hiddenqty_status" value="'+qty_stat+'">';
			e += '<div class="cont"><p style="font-size:12px;">'+Main.TitleCase(productDetail.description)+'</p>';
			e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?> :</div>';
			e += '<select name="" id="qty_count" class="selectbox" onchange="ProductOption.updateOptionsquantity(this)">';
			e += '<option value="0"><?= $lang_resource['PLEASE_SELECT_QUANTITY'] ?> '+qty_count1+'</option>';
			var s = 0;


			for(l = qty_count1; l <= qty_count1+10;l++){var s = s + 1;
				if(s == 1){
					quantitysec = l;
					e += '<option value="'+l+'" selected>'+l+'</option>';
				}else{
					e += '<option value="'+l+'">'+l+'</option>';
				}
			}

			e += '</select>';
			e += '</div>';

			e += '<input type="hidden" id="hiddenperson" value="'+data.review.extras_details[0].person+'" />';

			if(data.review.extras_details[0].person == 1){
				e += '<div class="cont">';
				e += '<div class="allheader"><?=$lang_resource['SHOPPING_NO_OF_PERSON']?> :</div>';
				e += '<select name="" id="person_count" class="selectbox" onchange="ProductOption.updateOptionsperson(this)">';
				e += '<option value="0"><?= $lang_resource['PLEASE_SELECT_PERSON'] ?> '+person_count1+'</option>';
				var s1 = 0;
				for(m = person_count1; m <= person_count1+10; m++){
					var s1 = s1 + 1;
					if(s1 == 1){
						personsec = m;
						e += '<option value="'+m+'" selected>'+m+' Person</option>';
					}else{
						e += '<option value="'+m+'">'+m+' Person</option>';
					}
					//e += '<option value="'+m+'">'+m+' Person</option>';
				}
				e += '</select>';
				e += '</div>';
			}
					 
			e += '</div>';
			e += '<div class="editform">';
			e += '<div class="leftcol">';
					  
                 
					
			var ArHtml = new Array(); 
			var F = Main.GetIndexOnPropertyValueFound(Shopping.Menu.dishes, "id", id);

			if(Main.NullToEmpty(Shopping.Menu.dishes[F].ingredients)!="") {
				var  ingredientsAll = JSON.parse(Shopping.Menu.dishes[F].ingredients);
				aObj = new Object();
				aObj.option_id = 0;
				aObj.setposition = 100;
				storeOptions.push(aObj);
				ArHtml[0] = '<div class="pop_bloc">'
				ArHtml[0] += '<h3 class="allheader"><?=$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']?></h3>';
				for(var ing in ingredientsAll ) {
					Shopping.ingredientStore.push(ingredientsAll[ing]);	
					ArHtml[0] += '<div class="pull_left ing-chekboxdp">';
					ArHtml[0] += '<div class=""><input type="checkbox"  id="' +"ing_"+ingredientsAll[ing] + '" value="'+ingredientsAll[ing]+'" class="switch checkbox3 hand"" onchange="ProductOptionsForms.CheckTextInputForIngredient(' + Main.Quote(ingredientsAll[ing]) + ',this);" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" checked="checked"></input><label for="' +"ing_"+ingredientsAll[ing] + '" checked="checked" class="pop_label" >'+ingredientsAll[ing]+'</label></div>';
					ArHtml[0] += '</div>';
				}
				ArHtml[0] += '</div>';
			}			
           
            
			for(var qw=0;qw<data['review']['extras_details'].length;qw++) {
				$.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptionCount","id":'+ data['review']['extras_details'][qw]['set_id'] +',"position":'+ data['review']['extras_details'][qw]['position'] +"}]", function (bc){
					
					if(bc !=""){					
						var data=JSON.parse(bc);
						set_name=data['review']['extras'][0]['text_to_end_user'];

						var i=0;
						var j=0;
						option_count = option_count + data['review']['option_counts'].length;
					     option_count_old = data['review']['option_counts'].length;
						var  ingredients=0;
						count_temp_old=0;
						
						$.each(data['review']['option_counts'],function(index,value){

							ids=[{"id":''+value['option_id']+'',"setposition":''+value['setposition']+'',"set_id":''+data['review']['extras'][0]['id']+''}];
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

							$.post("panel/lib/productoption.php", 'data=[{"operation":"GetOptions","id":'+ temp +'}]', function (b){
						
								if(b !=""){
									//Main.Ready();
									option_data=JSON.parse(b);
									Main.data=JSON.parse(b);
									if(option_data['review']['extras_details'][0]['choice_name'] == null ){
										Main.NullOption = true;	
									}

									aObj = new Object();
									aObj.option_id = value['option_id'];
									aObj.setposition = option_data['review']['extras_details'][0]['setposition'];

									storeOptions.push(aObj);
									cur_option =value['option_id'];
									var k='';
									var showvalue = "dynamicname-"+value['option_id'];
									ArHtml[cur_option] ='<div class="pop_bloc">';
									if(option_data['review']['extras_details'][0]['min_sel']>0) {
										ArHtml[cur_option] +='<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' (<?= $lang_resource['PRODUCT_POTIONS_ADD_REQUIRED'] ?>)</h3>';
									}else{
										ArHtml[cur_option] +='<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'] + ' </h3>';	
									}

					$.each(option_data['review']['extras_details'],function(option_index,option_value){
										var cname = "dynamicname-"+option_value['option_id'];
										if(option_value['max_sel']>1 && option_value['min_sel']>=0) {
											ArHtml[cur_option] += '<div class="pull_left ing-chekboxdp">';
											var dyid = option_value["choice_name"]+"-@"+option_value["choice_id"];
											ArHtml[cur_option] += '<div class="">' +ProductOptionsForms.CreateCheckBoxPropertyChoiceext("extras_details", option_value["choice_name"],false,'','',option_value['max_sel'],option_value['min_sel'],cname,option_value['text_to_end_user'],'',option_value['showoption'],option_value["choice_id"],option_value['set_id'])+'<label for="'+dyid+'" >&nbsp;</label><span  class=" field_label"  style="cursor:pointer" onclick="ProductOption.checkedval(\'' + dyid + '\',1)" > '+  option_value['choice_name']  +'</span><span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
											ArHtml[cur_option] += '</div>';

										}else if(option_value['max_sel']==1 && option_value['min_sel']>=0){
											choices. push({
												id: option_value['choice_id'],
												caption: option_value['choice_name']+" + "+"Price: "+option_value['price']
											});
											flag=1;
										}

										if(option_value['ingredients']=="t"){
											ingredients=1;
										}
										
									});

									if(flag==1) {
										$.each(option_data['review']['extras_details'],function(option_index,option_value){
											var cname = "dynamicname-"+option_value['option_id'];
											var   idrs = "choice_name_drop-"+option_value['choice_id'];
											ArHtml[cur_option] += '<div class="pull_left ing-chekboxdp">';
											ArHtml[cur_option] += '<div class="">' + ProductOptionsForms.CreateRadioPropertyChoice("extras_details", "choice_name_drop-"+option_value['choice_id'],"choice_name_drop"+value["option_id"],option_value['choice_id'], false,option_value['min_sel'],option_value['max_sel'],cname,option_value['text_to_end_user'],option_value['showoption'],option_value['set_id']) + '<label for="'+"choice_name_drop-"+option_value['choice_id']+'"  >&nbsp;</label><span  class=" pop_label" onclick="ProductOption.checkedval(\'' + idrs + '\',2)"  style="cursor:pointer" >'+option_value['choice_name']+'</span><span class="pop-cnt">'+Shopping.ActiveBusinesscurrency+''+parseFloat(option_value['price']).toFixed(Main.IS_DECIMAL_POINT)+'</span></div>';
											ArHtml[cur_option] += '</div>';
										});
									}
									i++;

									if(ingredients==1){
										ArHtml[cur_option] += '<div class="pull_left"  class="pizzachoosePo">' + ProductOptionsForms.CreateSelectPropertyChoiceext("extras_details", "choiceingredients-"+value["option_id"],choices_ing,[], '',"ProductOption.ChangeIngredient(this)",true) + '<span id="ing_1_choiceingredients-'+value["option_id"]+'" class="wholepo" ><img src="images/common/left.png" /></span><span id="ing_2_choiceingredients-'+value["option_id"]+'"  class="wholepo"><img src="images/common/whole.png" /></span><span id="ing_3_choiceingredients-'+value["option_id"]+'"  class="rightpo" ><img src="images/common/right.png" /></span></div>&nbsp;&nbsp;</span></div>';
										ingredients=0;
									}

									ArHtml[cur_option] +='</div>';
									ArHtml[cur_option] +='<div id="'+showvalue+'" ></div>';
									count_temp++; 
									count_temp_old++;
									//alert('<h3 class="allheader">' + option_data['review']['extras_details'][0]['text_to_end_user'])
								//	alert(count_temp)
								//	alert("1x"+set_total_option_count+"-"+count_temp)
									if(set_total_option_count == count_temp){
									//alert("2x"+set_total_option_count+"-"+count_temp)
										storeOptions.sort(Main.SortByProperty('setposition'));	
										/***************************************Rank Checking*******************************/						
										for (var D in storeOptions) {
											var Dy = storeOptions[D].option_id;
											e += ArHtml[Dy];
										}
										/****************************Rank Checking**********************************/							
										var is=0;
										e += '<div class="inwrapbox">';
										e += '<div class="cont">';
										e += '<div class="allheader"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></div>';
										e += '<textarea  placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" onkeyup="ProductOption.optionCommentUpdate(this)"></textarea>';
										e += '</div>';
										e += '<div style="margin: 0px auto; text-align: center;"><button type="button" class="addcart" onclick="ProductOption.SaveEndUserChoices()"><?= $lang_resource['PRODUCT_POTIONS_ADD_CART'] ?></button></div>';
										e += ' </div>';
										e += ' </div>';
										e += "</div>";
										e += "</div>";

										$('#loader_dv').removeClass( "addloader" );
										$("#dish_"+id+"_imghide").html('<a href="javascript:void(0)" id="dish_' + id + '_imglink"  onclick="ProductOption.add_product_options_db(this,' + id + ')"><img src="images/step3-menu-list/add-icon-big.png"></a>');
										
										
										
										if(Main.NullOption != true){
											if(Main.RedirectTowidget) {
										parent.ShowNewForProductOp(900, 700, e,ProductOption.SaveEndUserChoices, null,null)
										} else {
											Popup.ShowNewForProductOp(900, 700, e,ProductOption.SaveEndUserChoices, null,null)
											ProductOptionsForms.EnableSubmitButton(true)
										}	
										}else{
											Shopping.AddToCart(cart,id,'','','','')
											return false	
										}
														
																		
									}
								}

							});
						});
					}
				});
				
				div_data=null;
				div_data=id;
				

			}

        });
        cart_object=cart;
        cart_id=id;
    }

	};
