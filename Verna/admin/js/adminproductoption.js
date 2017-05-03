var AdminProductOption = {	
	
	ChooseDeliverOption:function(bid,disc_id){
		
		Forms.Clean("deliveryaction", "popupmainbuttonok");
		var k='';	
		k +='<h3 class="popup-heading"><?=$lang_resource['Delivery_Option']?></h3>'
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		
		 var qs = new Array();
		 qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PICKUP_DELIVERY']?>"}'));
		 qs.push(JSON.parse('{"id":"delivery","caption":"<?=$lang_resource['DELIVERY']?>"}'));
		 qs.push(JSON.parse('{"id":"pickup","caption":"<?=$lang_resource['PICKUP']?>"}'));

		k +=Forms.CreateSelectPropertyPopup("deliveryaction", "deliveryoption", qs, "", true)	
		k +='</div>'
		k +='</div>'
		k +='</div>'
		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'		
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminProductOption.DeliveryAction('+bid+','+disc_id+')"><?=$lang_resource['CONTINUE']?></button></center>'		
		k +='</div>'
		<!--col-md--->
		k +='</div>';
		<!--row-->
		
		Popup.Show(k);	
		
	},
	DeliveryAction: function (bid,disc_id) {
	AdminProductOption.bid=bid;
	AdminProductOption.disc_id=disc_id;
	if(Forms.Form.deliveryaction.fields.deliveryoption.value == "" ) {
	
	alert("<?=$lang_resource['FRONT_CHOOSE_OPTIONS'];?>")
	}else if(Forms.Form.deliveryaction.fields.deliveryoption.value == "pickup"){
	Popup.Close();
	var pval = Forms.Form.deliveryaction.fields.deliveryoption.value;
	
	$.post("lib/createproduct.php", "f=fetchproductdeliveryaction&data=" + bid+ "&deliac="+pval, function (c) {
	//$.post("lib/createproduct.php", "f=fetchproductdeliveryactionformenu&data=" + bid+ "&deliac="+AdminProductOption.deliveryType, function (c) {
		
			
		var dishl = JSON.parse(c);
		var M = CreateOrder.GetIndexOnDishValueFound(dishl.menudish, "id",disc_id);
		
		if(M!=-1){
			AdminProductOption.deliveryType = "pickup";
			var w = CreateOrder.GetIndexOnDishValueFound(CreateOrder.Orders, "id",bid);
			CreateOrder.Orders[w].shipping = 0;
			AdminProductOption.shipping = 0;
			
			delete CreateOrder.dish;
			CreateOrder.dish = dishl;
			CreateOrder.showresult();	
			CreateOrder.AddToCart(bid,disc_id)
			//break;
		}
		else{
			alert("<?=$lang_resource['FRONT_CHOOSE_OPTIONS_PICKUP_ALERT'];?>")
			return false;
		}
	
		
		//AdminProductOption.ShowMenu(bid);
				
		
	});
	
	Forms.Clean("deliveryaction");
	}else{
	
	AdminProductOption.OpenWhereAmIDeliveryBox();
	
	}
				
	},
	
	OpenWhereAmIDeliveryBox: function(){
		//alert(JSON.stringify(Main.User))
		
                Popup.Close();
                    AdminProductOption.WhereAmIData = new Object();
                    AdminProductOption.WhereAmIData.location = Main.NullToEmpty(Main.User.location);
                    AdminProductOption.WhereAmIData.country = Main.NullToEmpty(Main.User.country);
                    AdminProductOption.WhereAmIData.city = Main.NullToEmpty(Main.User.city);  
               		AdminProductOption.WhereAmIData.address = Main.NullToEmpty(Main.User.street);	

        
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllNeighborhoodData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + AdminProductOption.WhereAmIData.city + '"}]}]', function (g) {				
				
                AdminProductOption.f = JSON.parse(g).colony;	
				
				AdminProductOption.WhereAmIDelivery(AdminProductOption.WhereAmIData,AdminProductOption.f)			
        });
				 	
			

		
	},
	WhereAmIDelivery: function (c,M){
		GoogleMap.Clean();
		
		Forms.Clean("whereami", "popupmainbuttonok");
		var kk='';	
		kk +='<h3 class="popup-heading"><?=$lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I']?></h3>'
		kk +='<div class="row">'
		kk +='<div class="col-md-12">'
		kk +='<div class="form-group">'
		var P = new Array();
        P.push({
            id: "-1",
            caption: ""
        });
		
        for (E in M) {
            P.push({
                id: M[E].id,
                caption: M[E].name
            })
        }		
		if(Main.neighsettings == 't'){
	    kk += Forms.CreateSelectPropertyAdmin("whereami", "address", P,'',false,"GoogleMap.UpdateUserPosition(this);")
        }else{
			if(CreateOrder.street){
				kk += Forms.CreateInputPropertyAdmin("whereami", "address", CreateOrder.street,false,"GoogleMap.UpdateUserPosition(this);")
			}else{
			kk += Forms.CreateInputPropertyAdmin("whereami", "address", '',false,"GoogleMap.UpdateUserPosition(this);")	
			}
		}
		kk +='</div>'
		kk +='</div>'
		kk +='</div>'
		kk +='<div class="row">'
		kk +='<div class="col-md-12">'
		kk +='<div class="form-group">'
		kk +='<div class="businessmapbox" style="width:100%;" id="mapbox">'  
		kk +='</div>'
		kk +='</div>'
		kk +='</div>'
		kk +='<div class="row">'
		kk +='<div class="col-md-6 col-md-offset-3">'		
		kk +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminProductOption.SaveWhereAmi()"><?=$lang_resource['CONTINUE']?></button></center>'		
		kk +='</div>'
		<!--col-md--->
		kk +='</div>';
		<!--row-->		
		Popup.Show(kk);
		Forms.CreateValue("whereami", "location", Main.User.location);	
		 var f;
		 if (Main.User.location == "" || Main.User.location == null) {
            f = new Object();
            f.latitud = 23.634501;
            f.longitud = -102.552784;
            f.zoom = 4
        } else {
            f = JSON.parse(Main.User.location)
        }
        GoogleMap.Init("mapbox", f.latitud, f.longitud, f.zoom, AdminProductOption.LocationUpdated);
		
	},
	LocationUpdated: function (a) {
		
        Forms.UpdateValue("whereami", "location", JSON.stringify(a), true);
		
        
    },
	SaveWhereAmi: function(){
		if((Forms.Form.whereami.fields.address.value == "" ) && (Main.neighsettings == 'f')) {
			alert("<?=$lang_resource['FRONT_SELECT_ADDRESS'];?>");
			return ;
			}
	  else if((Forms.Form.whereami.fields.address.value == "") && (Main.neighsettings == 't'))
	     {
              alert("<?=$lang_resource['FRONT_SELECT_NEIBORHOOD'];?>");
			return ;
			} 
			
		Main.WhereAmIDataCus = new Object();
        Main.WhereAmIDataCus.country = Main.User.country;
        Main.WhereAmIDataCus.city = Main.User.city;
        var a = CreateOrder.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.User.city);


		Main.WhereAmIDataCus.currency = Main.Franchises[a].currency;
        Main.WhereAmIDataCus.ga = Main.Franchises[a].ga;

        Main.WhereAmIDataCus.cityname = Main.Franchises[a].city;
		Main.WhereAmIDataCus.collecttype = "delivery";
		//CreateOrder.Cart.buyer.city = Main.User.city;
		//CreateOrder.Cart.buyer.cityname = Main.Franchises[a].city;

	    Main.WhereAmIDataCus.address = Forms.Form.whereami.fields.address.value;
		//CreateOrder.Cart.buyer.address = Forms.Form.whereami.fields.address.value;
        Main.WhereAmIDataCus.location =Forms.Form.whereami.fields.location.value; 
		if(Main.neighsettings == 't') {
			
			Main.WhereAmIDataCus.delivery_neighborhoodStaus =  1; 
			Main.WhereAmIDataCus.delivery_neighborhood =  $("select[id='address'").find('option:selected').text();
			Main.WhereAmIDataCus.delivery_neighborhoodid =  $("select[id='address'").find('option:selected').val();
			
			}
			else {
		Main.WhereAmIDataCus.delivery_neighborhoodStaus =  0; 		
				
				}
		Main.WhereAmIDataCus.approved = true;
		
		Main.Loading(true);
        $.post("lib/createproduct.php", "f=FetchAllBusinessDeliveryLocation&data=" + Main.WhereAmIDataCus.location+"&alldata=" + JSON.stringify(Main.WhereAmIDataCus)+"&bid="+CreateOrder.ActiveBusiness, function (b)
        {
			
			  b = JSON.parse(b);


            Main.Ready(true);
            //$("#top").html("");
			//alert(b[0].searchtype)
			if(b[0].searchtype == "delivery" || b[0].searchtype == "neighbour")
			{

				
				
			var pval = "delivery";

				Popup.Close()
		$.post("lib/createproduct.php", "f=fetchproductdeliveryaction&data=" + CreateOrder.ActiveBusiness+ "&deliac="+pval, function (c) {
		
		//AdminProductOption.ShowMenu(AdminProductOption.bid);
		
		var dishl = JSON.parse(c);
		var M = CreateOrder.GetIndexOnDishValueFound(dishl.menudish, "id",AdminProductOption.disc_id);
		
		if(M!=-1){
			AdminProductOption.deliveryType = "delivery";

		   var w = CreateOrder.GetIndexOnPropertyValueFound(CreateOrder.Orders, "id", CreateOrder.ActiveBusiness);
			CreateOrder.Orders[w].shipping = parseFloat(b[0].shipping).toFixed(IS_DECIMAL_POINT);
			//CreateOrder.Business[w].minimum = parseFloat(b[0].minimum).toFixed(IS_DECIMAL_POINT);
			AdminProductOption.shipping = CreateOrder.Orders[w].shipping;
			
			delete CreateOrder.dish;
			CreateOrder.dish = dishl;
			CreateOrder.showresult();
			CreateOrder.AddToCart(AdminProductOption.bid,AdminProductOption.disc_id)
			//break;
		}
		else{
			alert("<?=$lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'];?>")
			return false;
		}

		
		});
			}
			else {
			alert("<?= $lang_resource['FRONT_SORRY_DELIVERY_OPTION'] ?>");

			}
		   Popup.Close()
        });
        Forms.Clean("whereami");
		
	},
	
	add_product_options:function(bid,disc_id,p,dish_no){
		AdminProductOption.qtyiselect="";
		if(p == 1){
		
		CreateOrder.optionChoiceId=CreateOrder.Cart.business[0].dishes[dish_no].optionChoiceId;
		CreateOrder.ingredients=CreateOrder.Cart.business[0].dishes[dish_no].ingredients;
		if(CreateOrder.Cart.business[0].dishes[dish_no].comments){
		CreateOrder.comments=CreateOrder.Cart.business[0].dishes[dish_no].comments;
		}
		CreateOrder.qtyi=CreateOrder.Cart.business[0].dishes[dish_no].quantity;
		if(CreateOrder.Cart.business[0].dishes[dish_no].nofperson){
		CreateOrder.pers=CreateOrder.Cart.business[0].dishes[dish_no].nofperson;
		}
		}
		AdminProductOption.Dishno = dish_no;
		AdminProductOption.Editstatus = p;
		if(p == 1){
			if(CreateOrder.ingredients){
				var ingredientsselect = CreateOrder.ingredients;
				AdminProductOption.ingredientsselect = ingredientsselect.split(",");
			}
			if(CreateOrder.optionChoiceId){				
				var optionChoiceIdselect = CreateOrder.optionChoiceId;
				AdminProductOption.optionChoiceIdselect = optionChoiceIdselect.split(",");
			}
			
			if(CreateOrder.comments){
				AdminProductOption.commentsselect=CreateOrder.comments;
			}
			
			if(CreateOrder.qtyi){
				AdminProductOption.qtyiselect=CreateOrder.qtyi;
			}
			
			if(CreateOrder.pers){
				AdminProductOption.persselect=CreateOrder.pers;
			}

		}		
		

		AdminProductOption.disc_id = disc_id
		AdminProductOption.bid = bid
		var F =  CreateOrder.GetIndexOnDishValueFound(CreateOrder.dish.menudish, "id",disc_id);	
		if(CreateOrder.dish.menudish[F].extras || CreateOrder.dish.menudish[F].ingredients){ // Check PRoduct option OR Ingredients Exist or Not
			AdminProductOption.CondTArray = new Array(); //Conditional true "options" 
			AdminProductOption.CondFArray = new Array(); //Conditional false "options"
			
			
			
			
			
			for(var w in CreateOrder.dish.menudish[F].extra_option){
			if(CreateOrder.dish.menudish[F].extras){
				var p = CreateOrder.dish.menudish[F].extra_option[w].options;
				
				for(var n in p){
					if(p[n].conditional == "no"){
						AdminProductOption.CondFArray.push(p[n]);
					}else{
						AdminProductOption.CondTArray.push(p[n]);
					}
				}	//Separate Conditional True and False
			}
			
			}
			//alert(JSON.stringify(AdminProductOption.CondFArray))
			//alert(JSON.stringify(AdminProductOption.CondTArray))
			AdminProductOption.Form(F); //Call ProductOption Or Ingredients Form
		}else{		 
			CreateOrder.AddToCart(bid,disc_id);
		}
	},
	Form: function(F){
		//alert(AdminProductOption.currency)
		var e = '';
		e +='<h3 class="adminproheader" style="pading-bottom: 10px;text-align:left; border-bottom: 1px solid #ccc">'+CreateOrder.dish.menudish[F].name+" "+AdminProductOption.currency+CreateOrder.dish.menudish[F].price+'</h3>'
		AdminProductOption.DishOptionPrice =CreateOrder.dish.menudish[F].price;	
		


		
		if(CreateOrder.dish.menudish[F].ingredients){ //Show Ingredients Section
			var ing = JSON.parse(CreateOrder.dish.menudish[F].ingredients)
			var counter = 1;
			e +='<h4 class="allheader"><?= $lang_resource['ADMIN_PLACE_ORDER_INGREDIENTS'] ?></h4>'			
			for(var s in ing){ //Ingredients Show Dynamically
				if(counter%2 == 1){ // Row Start When ODD
					e +='<div class="row">'
				}				
				if(AdminProductOption.Editstatus==1){					
					if($.inArray(ing[s], AdminProductOption.ingredientsselect) != -1){
						var inchecked = 'checked="checked"'
					}else{
						var inchecked = ''
					}				
				}else{
					var inchecked = 'checked="checked"'
				}

				e +='<div class="col-md-6">'
				e +='<p>'
				e +='<input type="checkbox" '+inchecked+' id="ingredients_'+ing[s]+'" class="" >'
				e +='<label for="ingredients_'+ing[s]+'" class="lclass">'+ing[s]+'</label>'
				e +='</p>'
				e +='</div>'
				<!--col-md-6-->
				if(counter%2 == 0){ // Row End When Even
					e +='</div>'
					<!--row-->					
				}
				counter++;
			}
			if(counter%2==0){
				e +='</div>'
				<!--row-->
			}		
		}

		if(CreateOrder.dish.menudish[F].extra_option){

			var qty_yes = CreateOrder.dish.menudish[F].extra_option[0].qty;				

			var qty_count = CreateOrder.dish.menudish[F].extra_option[0].qty_count;
			var person_count = CreateOrder.dish.menudish[F].extra_option[0].person_count;
			if(qty_yes == 1){
				var qty_count1 = parseInt(qty_count);
				var person_count1 = parseInt(person_count);
				if(qty_count1==0){
					qty_count1=1;	
				}
				if(person_count1==0){
					person_count1=1;	
				}
			}else{
				var qty_count1 = 1;
				var person_count1 = 1;
			}		

			e +='<h4 class="allheader"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></h4>'
			e +='<select name="" id="qty" class="selectbox" onchange="AdminProductOption.updateQuantity(this)">'

			var s = 0;
			for(p = qty_count1; p <= qty_count1+10;p++){
				var s = s + 1;
				if(s == 1){
					AdminProductOption.quantitysec=p;
					e += '<option value="'+p+'" selected>'+p+'</option>';
				}else{
					if(AdminProductOption.qtyiselect == p){
						AdminProductOption.quantitysec=p;
						e += '<option value="'+p+'" selected>'+p+'</option>';
					}else{
						e += '<option value="'+p+'">'+p+'</option>';	
					}
				}
			}
			e +='</select>'
			if(CreateOrder.dish.menudish[F].extra_option[0].person == 1){
				e +='<h4 class="allheader"><?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_SET_PERSON'] ?></h4>'
				e +='<select name="" id="person" class="selectbox" onchange="AdminProductOption.updateperson(this)">'
				var sp = 0;
				for(pe = person_count1; pe <= person_count1+10;pe++){
					var sp = sp + 1;
					if(sp == 1){
						AdminProductOption.personsec=pe;
						e += '<option value="'+pe+'" selected>'+pe+'</option>';
					}else{
						if(AdminProductOption.persselect == pe){
							AdminProductOption.personsec=pe;
							e += '<option value="'+pe+'" selected>'+pe+'</option>';
						}else{
							e += '<option value="'+pe+'">'+pe+'</option>';
						}
					}
				}
				e +='</select>'
			}

			
			if(AdminProductOption.CondFArray.length>0){ //Show Product Option Section			
				for(var p in AdminProductOption.CondFArray){
					var count = 1;
					
					var choicesarray = AdminProductOption.CondFArray[p].choices

					if((parseInt(AdminProductOption.CondFArray[p].maxsel) == 1 && parseInt(AdminProductOption.CondFArray[p].minsel) == 1) || (parseInt(AdminProductOption.CondFArray[p].maxsel) == 1 && parseInt(AdminProductOption.CondFArray[p].minsel)==0) ){
						var inputtype = "radio"
						var inputname = "radio"+AdminProductOption.CondFArray[p].id
					}else{
						var inputtype = "checkbox"
						var inputname = ""
					}
					if(parseInt(AdminProductOption.CondFArray[p].minsel) > 0){
						var req = '<?= $lang_resource['ADMIN_PLACE_ORDER_REQUIRED_FIELD'] ?>'
					}else{
						var req = ''
					}
					e +='<h4 class="allheader">'+AdminProductOption.CondFArray[p].option_text_to_end_user+'  '+req+'</h4>'
					for(var cs in choicesarray){	
						if(Main.NullToEmpty(choicesarray[cs].price)!=""){
							if(count%2 == 1){ // Row Start When ODD
								e +='<div class="row">'
							}
							e +='<div class="col-md-6">'
							e +='<p>'
							if(Main.NullToEmpty(choicesarray[cs].conditionoptionid) == ""){
								var opt = 0;
							}else{
								var opt = Main.NullToEmpty(choicesarray[cs].conditionoptionid);
							}
							if(AdminProductOption.Editstatus==1){
								if($.inArray(choicesarray[cs].id, AdminProductOption.optionChoiceIdselect) != -1){								
									var inchecked = 'checked="checked"'
								}else{
									var inchecked = ''	
								}
							}else{
								var inchecked = ''
							}
							
							//e +='<input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" /><label for="checkboxG1" class="css-label">Monterrey Cheddar</label>'
							
							
							e +='<input type="'+inputtype+'" id="choice_'+choicesarray[cs].id+'" '+inchecked+' name="'+inputname+'" class="" onclick="AdminProductOption.ChangeOption(this,'+AdminProductOption.CondFArray[p].id+','+opt+')"  >'
							e +='<label for="choice_'+choicesarray[cs].id+'" class="lclass">'+choicesarray[cs].name+'</label><span style="font-size: 13px;">'+AdminProductOption.currency+' ' +parseFloat(choicesarray[cs].price).toFixed(IS_DECIMAL_POINT)+'</span>'
							e +='</p>'
							e +='</div>'
							<!--col-md-6-->
							if(count%2 == 0){ // Row End When Even
								e +='</div>'
								<!--row-->					
							}
							count++;
						}
					}
					if(count%2==0){
						e +='</div>'
						<!--row-->
					}
					e +='<div  id="option_'+AdminProductOption.CondFArray[p].id+'"></div>'
				}		
			}
		}
		
		
		e +='<h4 class="allheader"><?= $lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION'] ?></h4>'
		
		if(AdminProductOption.Editstatus==1 && AdminProductOption.commentsselect){
			e +='<textarea class="adminprotextarea" onkeyup="AdminProductOption.optionCommentUpdate(this)" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" rows="" cols="" name="">'+AdminProductOption.commentsselect+'</textarea>'
		}else{
			e +='<textarea class="adminprotextarea" onkeyup="AdminProductOption.optionCommentUpdate(this)" placeholder="<?= $lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION'] ?>" rows="" cols="" name=""></textarea>'
		}
		e +='<div class="row">'
		e +='<div class="col-md-6 col-md-offset-3">'
		
		e +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminProductOption.Submit()"><?= $lang_resource['SUBMIT'] ?></button></center>'
		
		//e +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminProductOption.Submit()">Submit</button></center>'
		
		e +='</div>'
		<!--col-md--->
		e +='</div>'
		<!--row-->	


		Popup.Show(e);	
		if(AdminProductOption.Editstatus==1){
			if(AdminProductOption.CondFArray.length>0){ //Show Product Option Section			
				for(var p in AdminProductOption.CondFArray){
					var choicesarray = AdminProductOption.CondFArray[p].choices
					for(var cs in choicesarray){
						if(Main.NullToEmpty(choicesarray[cs].conditionoptionid) == ""){
							var opt = 0;
						}else{
							var opt = Main.NullToEmpty(choicesarray[cs].conditionoptionid);
						}
						if($.inArray(choicesarray[cs].id, AdminProductOption.optionChoiceIdselect) != -1){								
							if(opt!=0){
								AdminProductOption.Form1(opt)
							}							
						}
					}
				}
			}
		}
	},

	ChangeOption: function(a,c,val){
		if(val != 0){			
			if($(a).is(':checkbox') && $(a).prop("checked") == true){		
				AdminProductOption.Form1(val)
			}else if(!$(a).is(':checkbox')){
				AdminProductOption.Form1(val)
			}else if($(a).is(':checkbox') && $(a).prop("checked") == false){
				$("#option_"+c).empty();
			}
		}else{			
			if(!$(a).is(':checkbox')){				
				$("#option_"+c).empty();
			}
		}
			
	},

	Form1: function(val){

		if(AdminProductOption.CondTArray.length>0){
			for(var p in AdminProductOption.CondTArray){
				if(val == AdminProductOption.CondTArray[p].id){
					var f=''
					var countT = 1;
					
					var choicesarray = AdminProductOption.CondTArray[p].choices

					if(parseInt(AdminProductOption.CondTArray[p].maxsel) == 1 && parseInt(AdminProductOption.CondTArray[p].minsel) == 1 || (parseInt(AdminProductOption.CondTArray[p].maxsel) == 1 && parseInt(AdminProductOption.CondTArray[p].minsel)==0)){
						var inputtype = "radio"
						var inputname = "radio"+AdminProductOption.CondTArray[p].id
					}else{
						var inputtype = "checkbox"
						var inputname = ""
					}
					if(parseInt(AdminProductOption.CondTArray[p].minsel) > 0){
						var req = '<?= $lang_resource['ADMIN_PLACE_ORDER_REQUIRED_FIELD'] ?>'
					}else{
						var req = ''
					}
					f +='<h4 class="allheader">'+AdminProductOption.CondTArray[p].option_text_to_end_user+'  '+req+'</h4>'
					for(var cs in choicesarray){	
						if(Main.NullToEmpty(choicesarray[cs].price)!=""){
							if(countT%2 == 1){ // Row Start When ODD
								f +='<div class="row">'
							}
							f +='<div class="col-md-6">'
							f +='<p>'
							if(Main.NullToEmpty(choicesarray[cs].conditionoptionid) == ""){
								var opt = 0;
							}else{
								var opt = Main.NullToEmpty(choicesarray[cs].conditionoptionid);
							}
							if(AdminProductOption.Editstatus==1){
								if($.inArray(choicesarray[cs].id, AdminProductOption.optionChoiceIdselect) != -1){								
									var inchecked = 'checked="checked"'
								}else{
									var inchecked = ''	
								}
							}else{
								var inchecked = ''
							}
							f +='<input type="'+inputtype+'" '+inchecked+' id="choice_'+choicesarray[cs].id+'" name="'+inputname+'" class="" onclick="AdminProductOption.ChangeOption(this,'+AdminProductOption.CondTArray[p].id+','+opt+')">'
							f +='<label for="choice_'+choicesarray[cs].id+'" class="lclass">'+choicesarray[cs].name+'</label><span style="font-size: 13px;">'+AdminProductOption.currency+' ' +parseFloat(choicesarray[cs].price).toFixed(IS_DECIMAL_POINT)+'</span>'
							f +='</p>'
							f +='</div>'
							<!--col-md-6-->
							if(countT%2 == 0){ // Row End When Even
								f +='</div>'
								<!--row-->					
							}
							countT++;
						}
					}
					if(countT%2==0){
						f +='</div>'
						<!--row-->
					}
					f +='<div id="option_'+AdminProductOption.CondTArray[p].id+'" style="display:none;"></div>'
					var wrt = AdminProductOption.CondTArray[p].with_respect_to
					wrt = wrt.split(",")
					$("#option_"+wrt[0]).empty().append(f)	
				}						
			}
		}
		if(AdminProductOption.CondTArray.length>0){ //Show Product Option Section			
			for(var p in AdminProductOption.CondTArray){
				var choicesarray = AdminProductOption.CondTArray[p].choices
				for(var cs in choicesarray){
					if(Main.NullToEmpty(choicesarray[cs].conditionoptionid) == ""){
						var opt = 0;
					}else{
						var opt = Main.NullToEmpty(choicesarray[cs].conditionoptionid);
					}
					if($.inArray(choicesarray[cs].id, AdminProductOption.optionChoiceIdselect) != -1){								
						if(opt!=0){
							AdminProductOption.Form1(opt)
						}							
					}
				}
			}
		}
	},
	Submit: function(){

		
		AdminProductOption.options1 = ''
		AdminProductOption.optionsOnlytext1  = ''
		AdminProductOption.optionChoiceId1 = new Array();

		AdminProductOption.optionprice = new Array();

		var F =  CreateOrder.GetIndexOnDishValueFound(CreateOrder.dish.menudish, "id",AdminProductOption.disc_id);	
		
		/*if(CreateOrder.dish.menudish[F].extra_option){
			AdminProductOption.SuceessCheck();
			return false
		}*/

		Maincopunter = 0;
		AdminProductOption.ConditionalArray = new Array() 
		for(var p in AdminProductOption.CondFArray){			
			var choicesarray = AdminProductOption.CondFArray[p].choices
			reqmin = parseInt(AdminProductOption.CondFArray[p].minsel);
			reqmax = parseInt(AdminProductOption.CondFArray[p].maxsel);	
		
			var count = 0;
			for(var cf in choicesarray){				
				if(document.getElementById('choice_'+choicesarray[cf].id).checked){
					AdminProductOption.options1 +='_@_'+AdminProductOption.CondFArray[p].option_text_to_end_user+'@u@'+choicesarray[cf].name+'  '+AdminProductOption.currency+' ' +parseFloat(choicesarray[cf].price).toFixed(IS_DECIMAL_POINT);
					AdminProductOption.optionsOnlytext1 +=choicesarray[cf].name+',';
					AdminProductOption.optionChoiceId1.push(choicesarray[cf].id)
					AdminProductOption.optionprice.push(parseFloat(choicesarray[cf].price).toFixed(IS_DECIMAL_POINT))
					
					count++;
					if(choicesarray[cf].conditionoptionid){
						AdminProductOption.ConditionalArray.push(choicesarray[cf].conditionoptionid)
					}
				}				
			}					
			if(count<reqmin){
				alert("<?= $lang_resource['ADMIN_PLACE_ORDER_SELECT_AT_LEAST'] ?> "+reqmin+" <?= $lang_resource['ADMIN_PLACE_ORDER_CHOICE_IN'] ?> "+ AdminProductOption.CondFArray[p].option_text_to_end_user)
				Maincopunter++;
				return false
			}else if(count>reqmax){
				alert("<?= $lang_resource['ADMIN_PLACE_ORDER_SELECT_MAXIMUM'] ?> "+reqmax+" <?= $lang_resource['ADMIN_PLACE_ORDER_CHOICE_IN'] ?> "+ AdminProductOption.CondFArray[p].option_text_to_end_user)
				Maincopunter++;
				return false
			}	
		}
		if(Maincopunter == 0){
			AdminProductOption.CheckCondT()			
		}
	},
	CheckCondT: function(){
		MainTCounter = 0;
		AdminProductOption.ConditionalArr = new Array()
		for(var n in AdminProductOption.ConditionalArray){			
			for(var S in AdminProductOption.CondTArray){
				if(AdminProductOption.ConditionalArray[n] == AdminProductOption.CondTArray[S].id){			
					var choicesarrayT = AdminProductOption.CondTArray[S].choices
					reqminT = parseInt(AdminProductOption.CondTArray[S].minsel);
					reqmaxT = parseInt(AdminProductOption.CondTArray[S].maxsel);	
				
					var counT = 0;
					for(var cTf in choicesarrayT){				
						if(document.getElementById('choice_'+choicesarrayT[cTf].id).checked){
							AdminProductOption.options1 +='_@_'+AdminProductOption.CondTArray[S].option_text_to_end_user+'@u@'+choicesarrayT[cTf].name+'  '+AdminProductOption.currency+' ' +parseFloat(choicesarrayT[cTf].price).toFixed(IS_DECIMAL_POINT);
							AdminProductOption.optionsOnlytext1 +=choicesarrayT[cTf].name+',';
							AdminProductOption.optionChoiceId1.push(choicesarrayT[cTf].id)
							AdminProductOption.optionprice.push(parseFloat(choicesarrayT[cTf].price).toFixed(IS_DECIMAL_POINT))
							counT++;
							if(choicesarrayT[cTf].conditionoptionid){
								AdminProductOption.ConditionalArr.push(choicesarrayT[cTf].conditionoptionid)
							}
						}				
					}			
					if(counT<reqminT){
						alert("<?= $lang_resource['ADMIN_PLACE_ORDER_SELECT_AT_LEAST'] ?> "+reqminT+" <?= $lang_resource['ADMIN_PLACE_ORDER_CHOICE_IN'] ?> "+ AdminProductOption.CondTArray[S].option_text_to_end_user)
						MainTCounter++;
						return false
					}else if(counT<reqmaxT){
						alert("<?= $lang_resource['ADMIN_PLACE_ORDER_SELECT_MAXIMUM'] ?> "+reqmaxT+" <?= $lang_resource['ADMIN_PLACE_ORDER_CHOICE_IN'] ?> "+ AdminProductOption.CondTArray[S].option_text_to_end_user)
						MainTCounter++;
						return false
					}
				}
			}
		}	
		if(MainTCounter == 0){
			if(AdminProductOption.ConditionalArr.length == 0){
				AdminProductOption.SuceessCheck();
			}else{
				AdminProductOption.ConditionalArray = new Array()
				AdminProductOption.ConditionalArray = AdminProductOption.ConditionalArr;
				AdminProductOption.CheckCondT()
			}
		}		
	},
	SuceessCheck: function(){
		
		
		AdminProductOption.options = ''
		AdminProductOption.optionsOnlytext =''
		var F =  CreateOrder.GetIndexOnDishValueFound(CreateOrder.dish.menudish, "id",AdminProductOption.disc_id);	

		/*Ingredients Part*/
		Ingredients = new Array()
		if(CreateOrder.dish.menudish[F].ingredients){
			var ing = JSON.parse(CreateOrder.dish.menudish[F].ingredients)			
			for(var s in ing){ 
				if(document.getElementById('ingredients_'+ing[s]).checked){
					Ingredients.push(ing[s])
					AdminProductOption.options +='_@_Ingredients@u@'+ing[s]
					AdminProductOption.optionsOnlytext +=ing[s]+',';
				}
			}
		}
		AdminProductOption.ingredients = Ingredients.join();
		/*Ingredients Part*/
		
		AdminProductOption.options += AdminProductOption.options1;
		AdminProductOption.optionsOnlytext += AdminProductOption.optionsOnlytext1;
		AdminProductOption.optionChoiceId = AdminProductOption.optionChoiceId1.join();
		
		if(AdminProductOption.Editstatus==1){
		
		
			if(CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].options)	
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].options = AdminProductOption.options;
			
			if(CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].ingredients)	
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].ingredients = AdminProductOption.ingredients;
			
			if(CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].optionChoiceId)
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].optionChoiceId=AdminProductOption.optionChoiceId;
			
			if(CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].optionsOnlytext)
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].optionsOnlytext=AdminProductOption.optionsOnlytext;
			
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].comments=AdminProductOption.comments;
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].quantity=AdminProductOption.quantitysec;
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].nofperson=AdminProductOption.personsec;
			
			if(CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].price)
				var pricetotal = parseFloat(AdminProductOption.DishOptionPrice);
				if(AdminProductOption.optionprice){
					for(var i=0; i<AdminProductOption.optionprice.length;i++){
						var val2 = parseFloat(AdminProductOption.optionprice[i]);
								if( !isNaN( val2 )){
								   pricetotal += val2;
								}
					}
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].price=pricetotal.toFixed(IS_DECIMAL_POINT);
			CreateOrder.Cart.business[0].dishes[AdminProductOption.Dishno].total=pricetotal.toFixed(IS_DECIMAL_POINT);
				}
		CreateOrder.ShowProduct();	
		Popup.Close();	
			//CreateOrder.AddToCart(AdminProductOption.bid,AdminProductOption.disc_id);
		}else{
			Popup.Close();	
			CreateOrder.AddToCart(AdminProductOption.bid,AdminProductOption.disc_id);
		}
		
		/*alert(JSON.stringify(AdminProductOption.ingredients))
		alert(JSON.stringify(AdminProductOption.options))
		alert(JSON.stringify(AdminProductOption.optionsOnlytext))
		alert(JSON.stringify(AdminProductOption.optionChoiceId))
		alert(JSON.stringify(AdminProductOption.optionprice))*/
		
		//alert(JSON.stringify(AdminProductOption.personsec))
		//alert(JSON.stringify(AdminProductOption.quantitysec))
	},
	
	
	updateperson : function(p) {
		AdminProductOption.personsec = parseInt(p.value);
		},
		
	updateQuantity : function(p) {
		AdminProductOption.quantitysec = parseInt(p.value);
		},
	optionCommentUpdate: function(comment) {
		AdminProductOption.comments = comment.value;
		},
	
	
	AddOptionToCart: function(d){
		if(CreateOrder.Cart.business[0].dishes[d].quantity)	
			CreateOrder.Cart.business[0].dishes[d].quantity = CreateOrder.Cart.business[0].dishes[d].quantity+1;
		
		if(CreateOrder.Cart.business[0].dishes[d].total)	
			CreateOrder.Cart.business[0].dishes[d].total = (CreateOrder.Cart.business[0].dishes[d].price*CreateOrder.Cart.business[0].dishes[d].quantity).toFixed(IS_DECIMAL_POINT);
		CreateOrder.ShowProduct();	
	},
	
	RemoveOptionToCart:function(d){
	if(CreateOrder.Cart.business[0].dishes[d].quantity)	
			CreateOrder.Cart.business[0].dishes[d].quantity = CreateOrder.Cart.business[0].dishes[d].quantity-1;	
			
	if(CreateOrder.Cart.business[0].dishes[d].total)	
			CreateOrder.Cart.business[0].dishes[d].total = (CreateOrder.Cart.business[0].dishes[d].price*CreateOrder.Cart.business[0].dishes[d].quantity).toFixed(IS_DECIMAL_POINT);		
		CreateOrder.ShowProduct();
	},
	
	ShowProductOption : function (text){

	

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
	c+='<h5>'+p[e].optionheader+'</h5>'
	c+='<li>'+p[e].optionchoice+'</li>'
		}
	else if(previousHeader == p[e].optionheader ) {
	
    c+='<li>'+ p[e].optionchoice+'</li>';
	}
	else if(previousHeader != p[e].optionheader ) {
		
	c+='<h5>'+p[e].optionheader+'</h5>'
    c+='<li>'+p[e].optionchoice+'</li>';
	}
	previousHeader = p[e].optionheader;
	lasti++;
	}
	c+='</ul>'


	return c;

		},
		
weekname: function(id){

	
               if(id==0){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_EVERYDAY'] ?>"
            	}
				if(id==1){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_MONDAY'] ?>"
            	}
				if(id==2){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_TUESDAY'] ?>"
            	}
				if(id==3){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_WEDNESDAY'] ?>"
            	}
				if(id==4){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_THURSDAY'] ?>"
            	}
				if(id==5){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_FRIDAY'] ?>"
            	}
				if(id==6){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_SATURDAY'] ?>"
            	}
				if(id==7){
                var name="<?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_DATE_SUNDAY'] ?>"
            	}
				
			
			return name;
	
},
ShowMenu:function(bid){
	
	
	var k='';	
		k +='<h3 class="popup-heading"><?=$lang_resource['CREATE_ORDER_DELIVERY_PICKUP_MENU_OPEN_TIME']?></h3>'
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
/*		alert(JSON.stringify(CreateOrder.dish.menudish.menucatalog))
		var first = {};
		var data = CreateOrder.dish.menudish;
		for(key in CreateOrder.dish.menudish){
			if(CreateOrder.dish.menudish.hasOwnProperty(key)){
				//alert('1')
				first.key = key;
				first.content =  CreateOrder.dish.menudish[key];
				//alert(JSON.stringify(first))
				break;
			}
		}
		console.log(first);
		
		menucat = CreateOrder.dish.menudish[0].menulist;
		
				
		for(var s in menucat){
			var asdf = menucat[s];
			for( var pq in asdf){
				alert(asdf[pq].id)
			}
		
		}
			
			
		
		for(var p in CreateOrder.dish.menudish){*/
			
			 

//alert(JSON.stringify(CreateOrder.dish.menudish))
			
			var menucat = CreateOrder.dish.menucatalog;
		
		//alert(JSON.stringify(menucat))	
		for(var s in menucat){
			
			
		
		
		var opentime=menucat[s].openhour+":"+menucat[s].openmin;
		var closetime=menucat[s].closehour+":"+menucat[s].closemin;
		var ddtime = "("+opentime+"-"+closetime+")";
		k +='<div class="ordercatalogtime hand" onclick="AdminProductOption.ShowMenuCheck('+menucat[s].menuid+','+bid+')">'
		k +='<div style="text-align:center">'
		k +='<span class="micon"><img src="../../images/step2-business-listing/m-icon.png"></span><b>'+menucat[s].menuname+'</b> '+ddtime+'</div>'
		var da = JSON.parse(menucat[s].days);
		var L = ["", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		for(var g in da){
			var pp = AdminProductOption.weekname(da[g]);
		var days = "["+pp+"]";
		k +='<div class="menu-day">'+days+'</div>'
		}
		k +='</div>'
		}
		k +='</div>'
		k +='</div>'
		k +='</div>'
		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'	
		k +='</div>'
		<!--col-md--->
		k +='</div>';
		<!--row-->
		
		Popup.Show(k);	
	
	
},
ShowMenuCheck:function(menuid, bid){
	Popup.Close()
	delete CreateOrder.dish;
	$.post("lib/createproduct.php", "f=fetchproductdeliveryactionformenu&data=" + bid+ "&menuid="+menuid, function (c) {
	//$.post("lib/createproduct.php", "f=fetchproductdeliveryactionformenu&data=" + bid+ "&deliac="+AdminProductOption.deliveryType, function (c) {	
		CreateOrder.dish = JSON.parse(c);			
	AdminProductOption.NextDatePopupShow();	
	AdminProductOption.menuid=menuid;
		
		});
},
NextDatePopupShow: function(){
	var c='';
		c +='<h3 class="popup-heading"><?=$lang_resource['CREATE_ORDER_DELIVERY_PICKUP_TIME_PLACEORDER']?></h3>'
		c +='<div class="row">'
		c +=' <div class="col-md-12">'
        c +='<div class="form-group">'
		c +='<label><?=$lang_resource['CREATE_ORDER_DELIVERY_DATE']?></label>'
		c += '<select class="form-control" id="check_datep" onchange="AdminProductOption.DelDateSave(this);">';
		c += '<option value="ASAP" SELECTED>ASAP</option>';
		c += '</select>';
		c +='</div>'
		c +='</div>'
				
		c +='</div>'
		c +='<div class="row">'      	
		c +=' <div class="col-md-12">'
        c +='<div class="form-group">'
		c +='<label><?=$lang_resource['CREATE_ORDER_DELIVERY_TIME']?></label>'
		c += '<select class="form-control" id="check_timep" onchange="AdminProductOption.DelTimeSave(this);">';
		c += '<option value="">HH:MM</option>';
		c += '</select>';
		c +='</div>'
		c +='</div>'				
		c +='</div>'
		c +='<div class="row">'
		c +='<div class="col-md-6 col-md-offset-3">'		
		c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminProductOption.SaveDeliveryTime();"><?=$lang_resource['SUBMIT']?></button></center>'		
		c +='</div>'
		<!--col-md--->
		c +='</div>';
		
		Popup.Show(c);
		CreateOrder.showdate();
		CreateOrder.showtime();
},

DelDateSave: function(d){
	
	AdminProductOption.Deliverydate = d.value;	
},

DelTimeSave: function(d){
	
	var str = d.value;
	var str_sub = str.split(":");
AdminProductOption.deliveryhoursminute=d.value;
	AdminProductOption.deliveryhours = str_sub[0];
	AdminProductOption.deliveryminute = str_sub[1];	
},
SaveDeliveryTime:function(){
	Popup.Close();
	CreateOrder.showresult();
	CreateOrder.AddToCart(AdminProductOption.bid,AdminProductOption.disc_id)
	
},

	
};
