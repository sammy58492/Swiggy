var Visuals = {
	
    CreateWhereAmIButton: function (a, c, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
        return "<div " + b + 'class="whereamibutton nonselectable"><div class="titlebox default"><span class="title"><?= $lang_resource['BODY_ORDER_FOOD_TITLE'] ?></span></div><div class="innerbox hand" onclick="' + c + '"><div class="captionbox"><span class="caption">' + a + "</span></div></div></div>"
    },
	SearchLocation2nd: function(){
		
	
		console.log(Forms.CanSave("whereami"));
		$(".filter-dv").hide();
		console.log(Forms.CanSave("whereami"));
		
		document.getElementById("citychoose").style.display = "none";
		
		var deliveryAccept = $("input[name=deliveryType]:checked").val()
		
		if(Main.settingfront.tab_delivery_country == 'f'){
		Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;
		}
		else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			if(countrytag.length == 1 && countrytag.indexOf('-1') == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && citytag.indexOf('-1') == -1 ){
				Forms.Form['whereami'].fields['city'].value = citytag[0];
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
		Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;
		} 

		if(Main.customwhereami){
			 Forms.Form['whereami'].fields['country'].save = true
			 Forms.Form['whereami'].fields['city'].save = true
		}
		
        if (Forms.CanSave("whereami") == false)
        {
			
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
            return
        }
		
		if(deliveryAccept== undefined)
		{
			alert("<?=$lang_resource['ALERT_PICKUP_DELIVERY']?> ");
            return
		}
		
        Main.WhereAmIData = new Object();
        Main.WhereAmIData.country = Forms.Form.whereami.fields.country.value;
        Main.WhereAmIData.city = Forms.Form.whereami.fields.city.value;
        var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
	console.log(a);
	
        if(IS_PAYPAL_ENABLED == 1)
			Main.WhereAmIData.currency = Main.Franchises[a].currency;
        Main.WhereAmIData.ga = Main.Franchises[a].ga;
        Main.WhereAmIData.cityname = Main.Franchises[a].city;
		
		if(deliveryAccept == "3")
		{
			Main.WhereAmIData.collecttype = "pickup" // for Reservation
			Main.WhereAmIData.reservestatus = "reservation"
			Main.deliveryType="pickup";
			Main.searchType ="Ordinary";
			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;		
		}
		
        Main.WhereAmIData.location = Forms.Form.whereami.fields.location.value;
		
        Main.WhereAmIData.approved = true;
		
		
		
        
		
	
	    Forms.Clean("whereamiress", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereamiress";
		
        var b = false;
            c = new Object();
        Forms.Form.whereamiress.type = "create"
			
	  var htms ='';
		  
          htms += '<div class="teb-content">'
		
		  htms +=Visuals.SearchReservation2nd();

		   
		
		Popup.Show(911, '', htms, null, function (){
        }, Main.PreDatepickerCall)
		

		$("#rhour option:selected").prop("selected", false);
		$("#rhour option:first").prop("selected", "selected");

		$("#rmin option:selected").prop("selected", false);
		$("#rmin option:first").prop("selected", "selected");



	},


	SeeMoreDivAppend: function(){
		//alert(JSON.stringify(Main.SeeMoreAppend))
		$('#loadMore').show();
		htms ='';
		for (var b  in Main.SeeMoreAppend){
		if(Main.SeeMoreAppend[b].bname==null)	
		{
			
		}
		else
		{
		htms +='<div class="more_box">'
		htms+='<div class="more_shado_logo">'
		
		if(Main.SeeMoreAppend[b].existspic==true){
			htms +='<img src="../panel/images/business/'+Main.SeeMoreAppend[b].id_w_business+'/small.jpg">'
		}
		else
		{
			htms +='<img src="../panel/images/business/dummy.jpg">'
		}

		
		htms +='</div>'//more_shado_logo
		htms += '<div class="more_shado_dsp">'
		htms +='<h4> <a href="/'+Main.SeeMoreAppend[b].bcustomeslug+'">'+Main.SeeMoreAppend[b].bname+'</a></h4>'
		//htms +='<h4>'+Main.SeeMoreAppend[b].bname+'</h4>'
		var roundTotal = Math.round(Main.SeeMoreAppend[b].ratings);
			var rev_tot = roundTotal;
			var starsReview = "";
			var i = 1;
			for(i=1;i<=5;i++)
			{

				if(roundTotal>=1)
				{
						starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="images/step3-menu-list/star-yellow2.png"></a></li>'
						
						roundTotal=roundTotal-1;
				}
				else if(roundTotal<=0)
				{
					 starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="images/step3-menu-list/star-grey2.png"></a></li>'
				
				}
			}

		htms+='<ul class="morestar">'
			
		htms+=starsReview;
		htms+='</ul>'	

		htms +='<span class="morerating">('+Main.SeeMoreAppend[b].ratings+' <?=$lang_resource['MOBILE_MORE_RESTAURANT_REVIEW_RATING']?>)</span>'
		htms +='<div class="more_comment_dv">'
		if(Main.SeeMoreAppend[b].user=='-1')
		{
			htms +='<span><img src="../panel/images/users/dummy.jpg"></span>'
			
		}
		else
		{
			htms +='<span><img src="../panel/images/users/'+Main.SeeMoreAppend[b].user+'/small.jpg"></span>'
		}
		htms +='<p>'+Main.SeeMoreAppend[b].comment+'</p>'
	
		
		htms +='</div>'
	
		htms+='</div>'
		htms+='</div>'
		}
	}
		

		$("#seemore_div").append(htms);

		if(Main.SeeMoreAppend.length<4)
			$("#loadMore").hide();
	},




	MyOrders: function (a)
    {
        var b = new Date().getTime();
        Main.Loading(a);
        Main.Aid = b;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchMyOrders"}]', function (c)
        {
            if (b != Main.Aid)
            {
                return
            }
            Main.Ready(a);
            if (c != "")
            {
                Main.Ga("/orders");
                Main.Orders = JSON.parse(c).orders;
                var d = '<div class="popup_wrapper">';
				d += '<div class="pop_header">';
                d += '<span class="pop_heading"><h3><?= $lang_resource['ORDERS_BOX_TITLE'] ?></h3></span>';
				d += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	    d += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>'
       		    d += '</div>';
				 d += "</div>";

				d += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
				
				d += '<div class="responsive_tbl">';
                d += '<table width="85%" border="0" cellspacing="0" cellpadding="0" class="ordertable table"  id="orders">';


				 d += "</table>";
				 d += "</div>"
				  d += "</div>"

                Popup.Show(662, 662, d, null, function ()
                {
					document.getElementById("hedlogbox").style.display=""
                    Main.Ga(Main.ActiveView)
                }, function ()
                {

                    document.getElementById("hedlogbox").style.display = "none";
                    var h = "";
                    var g = Main.Orders.length;

				
					h += '<thead>';
					
					h += '<tr>';

				 h +=  '<th><span class="pop_label">#</span></th>';
				h += '<th><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></th>';
				h += '<th><?= $lang_resource['ORDERS_BOX_BUSINESS_HEADER'] ?></th>';
				h += '<th><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></th>';
				h += '<th><?= $lang_resource['ORDERS_BOX_STATUS_HEADER'] ?></th>';

               	 h += "</tr>";
				 h += '</thead>';
				  h += "<tbody>";
				 
                    for (var e in Main.Orders)
                    {
                        var f;
                        if (e % 2 == 0)
                        {
                            f = " grey"
                        }
                        else
                        {
                            f = ""
                        }
                        h += '<tr onclick="Visuals.OpenMyOrderOrder(' + Main.Quote(Main.NullToEmpty(Main.Orders[e].id)) + ',true)" >';
                        h += '<td><div class="cap"><span class="caption">' + Main.Orders[e].id + "</span></div></td>";
						//Time selection settings. 
						time_format="<?=$lang_resource['TIME_FORMAT']?>";
						   if(time_format=="12"){
							
							closetime1='';
							opentime1='';
							opentime=new Array();
							closetime=new Array();
							openclosetime=new Array();
							openclosetime1='';
							openclosetime=Main.Orders[e].date.split(" ");
							closetime=openclosetime[1].split(":");
							closetime1= Main.convertTimeFormat(closetime[0],closetime[1]);
							openclosetime1=openclosetime[0]+' '+closetime1;
				   }else{
					   openclosetime1=Main.Orders[e].date;
				   }
                        h += '<td ><div class="cap"><span class="caption">' + Main.NullToEmpty(openclosetime1) + "</span></div></td>";
						h += '<td ><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].busname) + "</span></div></td>";
                        h += '<td><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].city) + "</span></div></td>";
                        h += '<td><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].statustext) + "</span></div></td>";
						h += '</tr>';

                    }
 					h += "</tbody>";
					 document.getElementById("hedlogbox").style.display="none"
                    document.getElementById("orders").innerHTML = h
                })
            }
            else
            {
                alert("Error")
            }
        })
    },
	SearchReservation2nd: function(){
 
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?=$lang_resource['RESERVATION_NO_GUEST']?>"
        });
		
        for (i=1;i<=8;i++)
        {
            d.push(
            {
                id: i,
                caption: i
            })
        }
		
        var h = new Array();
        h.push(
        {
            id: "",
            caption: "<?=$lang_resource['RESERVATION_NO_HOUR']?>"
        });
		 //Time selection settings. 
			time_format="<?=$lang_resource['TIME_FORMAT']?>";
        for (i=0;i<24;i++)
        {
			if(time_format=="12"){
					capi= Main.convertTimeFormatHour(i);
				}else{
					capi=Main.zeroPad(i,2);
				}	
			
            h.push(
            {
                id: i,
                caption: capi
            })
        }

        var mi = new Array();
        mi.push(
        {
            id: "",
            caption: "<?=$lang_resource['RESERVATION_NO_MUNITE']?>"
        });
		
        for (i=0;i<60;i++)
        {
            mi.push(
            {
                id: i,
                caption: Main.zeroPad(i,2)
            })
        }
	
var htms = '<div class="popup_wrapper" >'
				htms += '<div class="pop_header">'
				htms += '<div class="pop_heading">'
				htms += '<h3><?=$lang_resource['RESERVATION_SEARCH']?></h3>'
				htms += '</div>'
				htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
				htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
				htms += '</div>'
				htms += '</div>'
	 
			  htms += '<div class="reservpopBox wrapp">'
			  htms +='<div class="field">';
			  htms += Forms.CreateSelectWhereAmIBox("whereamiress", "guest", d, '', false,"", false);
			  htms += '</div>'
			  
			   htms +='<div class="field">';
			
			  htms += Forms.CreateInputProperty10("whereamiress", "rdate", '','', false, "", false);
			 
			  htms += '</div>'
			 
			 htms +='<div class="field">';
			  htms += Forms.CreateSelectWhereAmIBox("whereamiress", "rhour", h, '', false, "", false);
			  htms += '</div>'
			  
			  htms +='<div class="field">';
			  htms += Forms.CreateSelectWhereAmIBox("whereamiress", "rmin", mi, '', false, "", false);
			  htms += '</div>'
		
			   htms +='<div class="field">';
			    htms +='<button type="submit" class="btn-red" style=" font-size:24px" onclick="Main.SaveWhereReservationSkip()"><?=$lang_resource['MOBILE_FRONT_VISUALS_SKIP']?></button>';
				
			  htms += '</div>'
			  
			    htms +='<div class="field">';
			    htms +='<button type="submit" class="btn-red" style=" font-size:24px" onclick="Main.SearchLocation2ndSave()"><?=$lang_resource['MOBILE_FRONT_VISUALS_SAVE_CONTINUE']?></button>';
				
			  htms += '</div>'
			  
			  htms += '</div>'
			  htms += '</div>'
			
		  return htms;

	},
	
	smsActivation: function(celno){
	//alert("ok");
		$(".popdiv_pop").hide();
		Forms.Clean("sms", "popupmainbuttonok");
   
		
		var a = '<div class="popup_wrapper">';
	   a += '<div class="pop_header">';
      	a +='<div class="pop_heading">';
	    	a +='<h3><?= $lang_resource['ACTIVATE_ACCOUNT'] ?></h3>';
        a +='</div>';<!--pop_heading-->
        a +='<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	a +='<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
        a +='</div>';<!--pull_right-->
    a +='</div>';<!--pop_header-->
   
    a +='<table width="100%" border="0" cellspacing="5" cellpadding="5" class="pop_tbl" >';
	
	 a +='<tr >';
       
       a +='<td colspan="3">We have sent you an activation sms to '+celno+'. Please just click on the link provided in sms if you have internet connectivity in your mobile or alternatively copy the code manually in below field</td>';
        
      a +='</tr>';
      a +='<tr>';
        a +='<td align="right" width="10%"><span class="pop_label" style="width: 100px;"><?= $lang_resource['ACTIVATE_CODE'] ?></span></td>';
       a +='<td width="88%">' + Forms.CreateInputPropertyPopUp("sms", "smscode", "", true) + "</td>";
       
      a +='</tr>';
	  a +='<tr style=" padding-top:10px;">';
        a +='<td align="right" width="10%"></td>';
      
        a +='<td width="48%"><button type="button" class="pop_submit_btn" style="width:160px;" onclick="Main.smsActive()"><?= $lang_resource['FRONT_MY_SUBMIT'] ?></button></td>';
      a +='</tr>';
    a +='</table>';

a +='</div>';
		
		
       // Main.Ga("/profile/recoverpwd");
       Popup.Show(911, '', a, null, function (){
        }, Main.PreDatepickerCall)
	},
	
	
	
	SearchDelivery: function(c){
		
		
		var b = false;
        if (c)
        {
            Forms.Form.whereami.type = "modify";
            b = true
        }
        else
        {
            c = new Object();
            Forms.Form.whereami.type = "create"
        }
		
		
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		
		for (i in Main.Countries)
		{
			if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}

	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		
		<!--Variable Assign-->
		var co_f='';
		var ci_f='';
		var add_f='';
		var add_f1 ='';
		var of_f='';
		
		var counter = 0;
		var cc ='';
		var cic ='';
		
		var re_f='';
		<!--Variable Assign-->
		
		<!--IF Field off -->
		
		if(Main.settingfront.tab_delivery_country == 'f'){
			cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
			cic = Main.settingfront.default_city; 
			ci_f +='style="display:none;"'
			counter ++;
		}
		
		if(Main.settingfront.tab_delivery_address == 'f'){		
			add_f +='style="display:none;"'			
		}
		
		if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
			add_f1 +='style="display:none;"'			
		}
		if((Main.settingfront.tab_delivery_address == 'f') && (Main.settingfront.tab_delivery_neighborhood == 'f')){ 
			counter ++;
		}		
		
		if(Main.settingfront.tab_delivery_option == 'f'){
			of_f +='style="display:none;"'
			counter ++;
		}
		<!--IF Field off -->

		if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
				
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;
			
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
					
					
					if(Main.User){
					
					var a = new Object();
					a.id = "address";
					a.value = Main.User.street;
					GoogleMap.UpdateUserPosition(a);
				}
                       
					
                       
              });
		}else{
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(cc,cic);
		}
	
		if(Main.settingfront.tab_delivery_country == 't'){
			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && countrytag.indexOf('-1') == -1){
				
				
				
				cc = countrytag[0];
				Main.PopulateCitySelect(countrytag[0]);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + countrytag[0] +"}]", function (b){   
				   
					b = JSON.parse(b); 
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				co_f +='style="display:none;"'
				counter ++;	
			} 
			<!--Single Country-->
			
			<!--Single City-->
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			console.log(citytag)
			console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && citytag.indexOf('-1') == -1 ){ 
				
				cic = citytag[0];
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + citytag[0] +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && restaurant.indexOf('-1') == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
			
		}
		
		/*Add Class to wrappermain for center*/
		if(counter == 0){			
			$("#wrappermain").addClass("for-4-field");

			$("#wrappermain").removeClass("for-3-field");
			$("#wrappermain").removeClass("for-2-field");
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 1){
			$("#wrappermain").addClass("for-3-field"); 

			$("#wrappermain").removeClass("for-4-field");
			$("#wrappermain").removeClass("for-2-field");
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 2){
			$("#wrappermain").addClass("for-2-field"); 
			
			$("#wrappermain").removeClass("for-4-field");
			$("#wrappermain").removeClass("for-3-field");
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 3){			
			$("#wrappermain").removeClass("for-4-field");
			$("#wrappermain").removeClass("for-3-field");
			$("#wrappermain").removeClass("for-2-field");
			$("#wrappermain").removeClass("for-1-field");
		}
		/*Add Class to wrappermain for center*/





	



		var htms = ''
		MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		
		htms += '<input type="radio" id="deliveryType" style="display:none;" value="1" checked="checked" name="deliveryType" >'
		if(counter != 0){			
		htms +='<div class="select-box" '+co_f+'>'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect")
		htms +='</div>'
		<!--field-->
		htms +='<div class="select-box" '+ci_f+'>'

		htms +=Forms.CreateSelectWhereAmIBox("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "selectdropdownselect");
            
		htms +='</div>'
		
		<!--field-->
		if(!c.address){
			var add ='';
			if(Main.User){
				add=Main.WhereAmIData.address;
			}
			c.address=add
		}
		htms +='<div class="select-box" id="locationField" '+add_f+'>'
		htms +=Forms.CreateTextWhereAmIBoxAddress("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true);
		htms +='</div>'
		<!--field-->

		var cit1 = new Array();
		cit1.push({
            id: "",
            caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
        });
		htms +='<div class="field" '+add_f1+'>'

		htms +=Forms.CreateSelectWhereAmIBoxNeighborhood("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this);Main.neibhourUpdate(this)", true);
               
		htms +='</div>'
		<!--field-->

		htms +='<div class="select-box" '+of_f+'>'
		htms +='<button type="button" class="field-select" id="whrDelivery" onclick="WhereAmIBox.ShowHideOptionSearch(1)"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
		htms +='</div>'
		<!--field--> 
		}else{
		htms +='<div class="select-box">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect")
		htms +='</div>'
		<!--field-->
		htms +='<div class="select-box">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "selectdropdownselect");
      
		htms +='</div>'
		<!--field-->
		if(!c.address){
			var add ='';
			if(Main.User){
				add=Main.WhereAmIData.address;
			}
			c.address=add
		}
		
		if(Main.settingfront.tab_delivery_neighborhood == 'f') {
			
		htms +='<div class="select-box">'
		htms +=Forms.CreateTextWhereAmIBoxAddress("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true);
		htms +='</div>'
		
		} else {
		<!--field-->

		var cit1 = new Array();
		cit1.push({
            id: "",
            caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
        });

		htms +='<div class="select-box" '+add_f1+'>'
		htms +=Forms.CreateSelectWhereAmIBoxNeighborhood("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this);Main.neibhourUpdate(this)", true);
               
		htms +='</div>'
		}
		
		<!--field-->

		htms +='<div class="field">'
		htms +='<button type="button" class="field-select" id="whrDelivery" onclick="WhereAmIBox.ShowHideOptionSearch(1)"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
		htms +='</div>'
		<!--field--> 	
		}
		Forms.CreateValue("whereami", "resturants", '', false, false);
		Forms.CreateValue("whereami", "cuisines", '', false, false);
	
		htms +='<ul class="filter-mob-dv tog3" style="display:none" >'
		htms +='<li><div class="multiinputbox pull_left"><input type="text" id="resturants" /></div></li>';
		htms +='<li><div class="multiinputbox pull_left"><input type="text" id="cuisines" placeholder="<?=$lang_resource["WHEREAMIBOX_CUISINES"]?>"  /></div></li>';
		htms +='</ul>'

		return htms;


		  
		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}	  
	
	},
	SearchReservation: function(c){
			
		 var b = false;
        if (c)
        {
            Forms.Form.whereami.type = "modify";
            b = true
        }
        else
        {
            c = new Object();
            Forms.Form.whereami.type = "create"
        }
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
         var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		console.log(countrytag.length > 1)
		
		for (i in Main.Countries)
		{
			if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		 
		 
		 	 var l="";
		  	 var ls="";
		  if(c.collecttype == "delivery")
		  {
			  l ="selected";
		   }
		    if(c.collecttype == "pickup")
		  {
			  ls ="selected";
		   }
		   
		   
		   var co_f='';
		var ci_f='';
		var of_f='';
		var counter = 0;
		 
		var cc ='';
		var cic ='';
		
		var re_f='';	
		
		if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
				
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;
			
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
              });
		}else{
			
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		}
		
		if(Main.settingfront.tab_delivery_country == 't'){
			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && countrytag.indexOf('-1') == -1){
				
				
				
				cc = countrytag[0];
				Main.PopulateCitySelect(countrytag[0]);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + countrytag[0] +"}]", function (b){   
				   
					b = JSON.parse(b); 
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				co_f +='style="display:none;"'
				counter ++;	
			} 
			<!--Single Country-->
			
			<!--Single City-->
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			console.log(citytag)
			console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && citytag.indexOf('-1') == -1 ){ 
				
				cic = citytag[0];
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + citytag[0] +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && restaurant.indexOf('-1') == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
		}
		
		
		if(Main.settingfront.tab_delivery_country == 'f'){
		
			cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
			
			cic = Main.settingfront.default_city; 
			
			ci_f +='style="display:none;"'
			counter ++;
		}
		
		
		if(Main.settingfront.tab_reservation_option == 'f'){
			of_f +='style="display:none;"'
			counter ++;
		}




		
		/*Add Class to wrappermain for center*/
		if(counter == 0){			
			$("#wrappermain").addClass("for-3-field");
		
			$("#wrappermain").removeClass("for-2-field");
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 1){
			$("#wrappermain").addClass("for-2-field"); 

			$("#wrappermain").removeClass("for-3-field");			
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 2){
			$("#wrappermain").addClass("for-1-field");			
			
			$("#wrappermain").removeClass("for-3-field");
			$("#wrappermain").removeClass("for-2-field");
		}
		/*Add Class to wrappermain for center*/


		var htms =''
		MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		htms += '<input type="radio" id="deliveryType" style="display:none;" value="3" checked="checked" name="deliveryType" >'
		if(counter != 0){
		htms +='<div class="field" '+co_f+'>'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect")
		htms +='</span>'
		htms +='</div>'
		htms +='</div>'
		<!--field-->
		htms +='<div class="field" '+ci_f+'>'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect");
		htms +='</span>'
		htms +='</div>'                
		htms +='</div>'
		<!--field-->
		
		htms +='<div class="field" '+of_f+'>'
		htms +='<button type="button" class="field-select" id="whrDeliveryReserve" onclick="WhereAmIBox.ShowHideOptionSearch(3)"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
		htms +='</div>'
		<!--field--> 
		}else{
		htms +='<div class="field">'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect")
		htms +='</span>'
		htms +='</div>'
		htms +='</div>'
		<!--field-->
		htms +='<div class="field">'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect");
		htms +='</span>'
		htms +='</div>'                
		htms +='</div>'
		<!--field-->
		
		htms +='<div class="field">'
		htms +='<button type="button" class="field-select" id="whrDeliveryReserve" onclick="WhereAmIBox.ShowHideOptionSearch(3)"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
		htms +='</div>'
		<!--field--> 	
		}
		Forms.CreateValue("whereami", "resturants", '', false, false);
		Forms.CreateValue("whereami", "cuisines", '', false, false);
	
		htms +='<ul class="filter-mob-dv tog3" style="display:none" >'
		htms +='<li><div class="multiinputbox pull_left"><input type="text" id="resturants" /></div></li>';
		htms +='<li><div class="multiinputbox pull_left"><input type="text" id="cuisines" placeholder="<?=$lang_resource["WHEREAMIBOX_CUISINES"]?>"  /></div></li>';
		htms +='</ul>'

		return htms;
		  
		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}		  
	},
	SearchPickup: function(c){
		
		 var b = false;
        if (c)
        {
            Forms.Form.whereami.type = "modify";
            b = true
        }
        else
        {
            c = new Object();
            Forms.Form.whereami.type = "create"
        }
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		for (i in Main.Countries)
		{
			if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
		var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		 
		 
		 	 var l="";
		  	 var ls="";
		  if(c.collecttype == "delivery")
		  {
			  l ="selected";
		   }
		    if(c.collecttype == "pickup")
		  {
			  ls ="selected";
		   }
		   
		   
		var co_f='';
		var ci_f='';
		
		var of_f='';
		var counter = 0;
		
		
		var cc ='';
		var cic ='';
		
			
		var re_f='';
		
		
		if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
				
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;
			
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
              });
		}else{
			
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		}
			
		if(Main.settingfront.tab_delivery_country == 't'){
			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && countrytag.indexOf('-1') == -1){
				
				
				
				cc = countrytag[0];
				Main.PopulateCitySelect(countrytag[0]);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + countrytag[0] +"}]", function (b){   
				   
					b = JSON.parse(b); 
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				co_f +='style="display:none;"'
				counter ++;	
			} 
			<!--Single Country-->
			
			<!--Single City-->
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			console.log(citytag)
			console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && citytag.indexOf('-1') == -1 ){ 
				
				cic = citytag[0];
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + citytag[0] +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && restaurant.indexOf('-1') == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
			
		}
		
		
		if(Main.settingfront.tab_delivery_country == 'f'){
		
			cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
			
			
			cic = Main.settingfront.default_city; 
			
			ci_f +='style="display:none;"'
			counter ++;
		}
		
		
		if(Main.settingfront.tab_pickup_option == 'f'){
			of_f +='style="display:none;"'
			counter ++;
		}


		/*Add Class to wrappermain for center*/
		if(counter == 0){			
			$("#wrappermain").addClass("for-3-field");
		
			$("#wrappermain").removeClass("for-2-field");
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 1){
			$("#wrappermain").addClass("for-2-field"); 

			$("#wrappermain").removeClass("for-3-field");			
			$("#wrappermain").removeClass("for-1-field");
		}else if(counter == 2){
			$("#wrappermain").addClass("for-1-field");			
			
			$("#wrappermain").removeClass("for-3-field");
			$("#wrappermain").removeClass("for-2-field");
		}
		/*Add Class to wrappermain for center*/
		   

		 MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		var htms ='' 
		htms += '<input type="radio" id="deliveryType" style="display:none;" value="2" checked="checked" name="deliveryType" >'
		if(counter != 0){
		htms +='<div class="field" '+co_f+'>'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect")
		htms +='</span>'
		htms +='</div>'
		htms +='</div>'
		<!--field-->
		htms +='<div class="field" '+ci_f+'>'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect");
		htms +='</span>'
		htms +='</div>'                
		htms +='</div>'
		<!--field-->
		
		htms +='<div class="field" '+of_f+'>'
		htms +='<button type="button" class="field-select" id="whrSearchPickup" onclick="WhereAmIBox.ShowHideOptionSearch(2)"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
		htms +='</div>'
		<!--field--> 
		}else{
		htms +='<div class="field">'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect")
		htms +='</span>'
		htms +='</div>'
		htms +='</div>'
		<!--field-->
		htms +='<div class="field">'
		htms +='<div class="selectfield">'
		htms +='<span class="selectdropdown">'
		htms +=Forms.CreateSelectWhereAmIBox("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this)", true, "selectdropdownselect");
		htms +='</span>'
		htms +='</div>'                
		htms +='</div>'
		<!--field-->
		
		htms +='<div class="field">'
		htms +='<button type="button" class="field-select" id="whrSearchPickup" onclick="WhereAmIBox.ShowHideOptionSearch(2)"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
		htms +='</div>'
		<!--field--> 
		}
		Forms.CreateValue("whereami", "resturants", '', false, false);
		Forms.CreateValue("whereami", "cuisines", '', false, false);
	
		htms +='<ul class="filter-mob-dv tog3" style="display:none" >'
		htms +='<li><div class="multiinputbox pull_left"><input type="text" id="resturants" /></div></li>';
		htms +='<li><div class="multiinputbox pull_left"><input type="text" id="cuisines" placeholder="<?=$lang_resource["WHEREAMIBOX_CUISINES"]?>"  /></div></li>';
		htms +='<li><div class=" "><input type="text" id="address" class="field-text"  placeholder="<?=$lang_resource["ADDRESS_V2"]?>"/></div></li>';
		htms +='</ul>'

		return htms;
		  
		  
		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}	 
	},
	CreateWhrYouButton: function (a, c, b) {

		if (b) {
			b = 'id="' + b + '" '
		} else {
			b = ""
		}


		var list = Array(1,2,3,4);
		var ralist = list[Math.floor((Math.random()*list.length))];

		var htms =''

		var k='panel/images/banner/homemobile'+ralist+'/banner.jpg';
		//htms +='<img src="panel/images/banner/'+ralist+'/banner.jpg" class="bg">'
		if(Main.settingfront.sildersetiings == "t"){
		htms +='<div class="main">'
		htms +='<div id="maximage">'
		htms +='<img src="panel/images/banner/homemobile1/banner.jpg" alt="" width="1400" height="1050" />'
		htms +='<img src="panel/images/banner/homemobile2/banner.jpg" alt="Coalesse" width="1400" height="1050" />'
		htms +='<img src="panel/images/banner/homemobile3/banner.jpg" alt="" width="1400" height="1050" />'
		htms +='<img src="panel/images/banner/homemobile4/banner.jpg" alt="" width="2048" height="1536" />'

		htms +='</div>'


		//htms +='<div class="contener">'
		}else{
		htms +='<div id="bg">'
		htms +='<img src="'+k+'" alt="">'
	    htms +='</div>'
		}
		htms +='<div class="home_wra" id="wrappermain">'
		if(Main.dlang.length > 1){
			htms +='<div class="langdv">'
			htms +='<select id="lang" onchange="Visuals.langChange(this.value)">'
			for(var v in Main.dlang){		
				htms +='<option value="'+Main.dlang[v].id+'" '+Main.dlang[v].langselect+'>'+Main.dlang[v].lang_text+'</option>'		
			}
			htms +='</select>'
			htms +='</div>'
		}		
		
		htms +='<div class="logo"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" alt=""></a></div>'
		htms +='<div class="select-box">'
		
		htms +='<div class="lft-dv">'
		htms +='<select class="business" onchange="WhereAmIBox.BusinessTypeChange(this.value)">'
		if(Main.settingfront.tab_food == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms +='<option value="tab_food"><?=$lang_resource['FRONT_VISUALS_TAB_FOOD']?></option>'
		}
		if(Main.settingfront.tab_alcohol == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms +='<option value="tab_alcohol"><?=$lang_resource['FRONT_VISUALS_TAB_ALCOHOL']?></option>'
		}
		if(Main.settingfront.tab_groceries == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms +='<option value="tab_groceries"><?=$lang_resource['FRONT_VISUALS_TAB_GROCERIES']?></option>'
		}
		if(Main.settingfront.tab_laundry == "t" && (Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't')){
			htms +='<option value="tab_laundry"><?=$lang_resource['FRONT_VISUALS_TAB_LAUNDRY']?></option>'
		}
		if(Main.settingfront.tab_reservation != 'f'){
			htms +='<option value="tab_reservation"><?=$lang_resource['CONTROL_PANEL_BUSINESS_TAB_RESERVE']?></option>'
		}	
		htms +='</select>'
		htms +='</div>'
		if(Main.settingfront.tab_delivery == 't' || Main.settingfront.tab_pickup == 't'){
		htms +='<div class="rgh-dv">'
		htms +='<select class="pickup" onchange="WhereAmIBox.SearchTypeId(this.value)">'
		if(Main.settingfront.tab_delivery != 'f'){
			htms +='<option value="1"><?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY']?></option>'
		}
		if(Main.settingfront.tab_pickup != 'f'){
			htms +='<option value="2"><?=$lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP']?></option>'
		}
		}	
		htms +='</select>'
		htms +='</div>'
		htms +='</div>'
		htms +='<div id="mid_lft">'
		htms +='<input name="" type="text" class="addtext" placeholder="Address or Zip Code">'               
		htms +='</div>'
		

		htms +='<div id="mid_button_search">'
		htms +='<button type="button" class="search-btn" onclick="Main.SaveWhereAmI()"><?=$lang_resource['NEW_MOBILE_HOME_START_FIND_RESTAURANT']?></button>'
		htms +='</div>'
		htms +='<p class="or">OR</p>'
		htms +='<button type="button" class="geo-btn" onclick="Main.GetUserLocation()"><img src="panel/<?=$moduleName?>/images/geo-location-icon.png" alt="">Use my current location </button>'
		htms +='<div class="btn_div">'
		if(Main.User) {
		htms +='<button type="button" class="login-btn" onclick="Visuals.AccountBlock()">'+ Main.User.name + " " + Main.NullToEmpty(Main.User.lastname2)+'</button>'
		}else{
		htms +='<button type="button" class="login-btn" onclick="Visuals.LoginMob()"><?=$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_REGISTER']?></button>'
		}
		htms +='<button type="button" class="track-btn" onclick="Visuals.TrackOrderMob()"><?=$lang_resource['MOBILE_FRONT_VISUALS_TRACK_ORDER']?></button>'
		htms +='<button type="button" class="more-btn" onclick="More.Start()"><?=$lang_resource['MOBILE_FRONT_VISUALS_MORE']?></button>'
		
		htms +='</div>'
		htms +='</div>'



		htms +='<div id="map_canvas"></div>';

		return htms;
		
		/*$( function() {
    $("#lang option:selected").attr("selected", "selected");
});*/
    },
	CMSUrl: function()
	{
		
		top.location = '/Request';
		return false;
	},
		RequestCollectionHtml: function()
	{
		
		
		var page = "";

	
Main.requestCollction.customer_name='';
Main.requestCollction.customer_address1='';
Main.requestCollction.customer_address2='';
Main.requestCollction.customer_town ='';
Main.requestCollction.customer_postcode='';
Main.requestCollction.customer_contactno ='';
Main.requestCollction.resturent_name ='';
Main.requestCollction.resturent_address1  ='';
Main.requestCollction.resturent_address2 ='';

Main.requestCollction.resturent_town ='';
Main.requestCollction.resturent_postcode='';
Main.requestCollction.resturent_contactno=='';

Main.requestCollction.resturent_collection_time ='';
Main.requestCollction.resturent_other_value  ='';
Main.requestCollction.resturent_other_reference ='';

		if(Main.User){
		Main.requestCollction.customer_name=Main.User.name;
	
	Main.requestCollction.customer_address1=Main.User.street;
	
	Main.requestCollction.customer_address2=Main.User.colony;
	
	Main.requestCollction.customer_town=Main.User.cityname;
	
	Main.requestCollction.customer_postcode=Main.User.cp;
	
	Main.requestCollction.customer_contactno=Main.User.cel;
	
		}

   var page ='<div class="main">'
    	 page +='<div class="header">'
         page +='<div class="header_pannel">';
		 
		 page +='<div class="wrapp">';
		 page +='<div class="pull_left"><button type="button" class="close-btn" onclick="Main.HomeUrlCustom()">X</button></div>';
		 page +='</div>';
		 page +='</div>';
		 page +='<div class="logo" style="margin-top:5px;"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" ></a></div>';
		 page +='</div>';
		 
         page +='</div>';
		 
		 
       
		 page +='<div class=" main ">';
    	page +='<div class="wrapp">';
		 page +=' <div class="main">';
page +='<div class="Request_Collection">';
   		page +='<h4><?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'] ?></h4>';
		page +='<div class="Req_Col_in">';
		
			page +='<div class="Req_Col_left">';
                           	page +=' <div class="Req_Col_left_hd"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_DETAILS'] ?></div> ';                   
                          	page +='  <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] ?> <span>*</span></label><input  id="customer_name" name="customer_name" value="'+Main.requestCollction.customer_name+'"  type="text"  onkeyup="Main.requestCollctionUpdate(this,\'customer_name\')"></div>'; 
                          	page +='  <div class="Customer_Add"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] ?> <span>*</span></div>';
                          	page +='  <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE1'] ?></label><input id="customer_address1" name="customer_address1" type="text"  value="'+Main.requestCollction.customer_address1+'"  onkeyup="Main.requestCollctionUpdate(this,\'customer_address1\')"></div>';
                           	page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE2'] ?></label><input id="customer_address2" name="customer_address2"  type="text"   value="'+Main.requestCollction.customer_address2+'"  onkeyup="Main.requestCollctionUpdate(this,\'customer_address2\')"></div>';
                           	page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_TOWN'] ?></label><input id="customer_town" name="customer_town" type="text"  value="'+Main.requestCollction.customer_town+'"  onkeyup="Main.requestCollctionUpdate(this,\'customer_town\')"></div>';
                           	page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></label><input id="customer_postcode" name="customer_postcode" type="text"  value="'+Main.requestCollction.customer_postcode+'"  onkeyup="Main.requestCollctionUpdate(this,\'customer_postcode\')"></div>';
                           	page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] ?>  <span>*</span></label><input id="customer_contactno" name="customer_contactno"   value="'+Main.requestCollction.customer_contactno+'" type="text" onkeyup="Main.requestCollctionUpdate(this,\'customer_contactno\')" ></div>';
                        
                       	page +=' </div>';
						
						  	page +='<div class="Req_Col_left Req_Col_right">';
                             	page +='<div class="Req_Col_left_hd"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_DETAILS'] ?></div>  ';                  
                             	page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] ?>  <span>*</span></label><input  name="resturent_name" id="resturent_name" type="text"   onkeyup="Main.requestCollctionUpdate(this,\'resturent_name\')"></div>';
                             
                            
                             	page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?>*</label><input name="resturent_postcode" id="resturent_postcode"  type="text"   onkeyup="Main.requestCollctionUpdate(this,\'resturent_postcode\')"></div>';
                             	page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] ?> <span>*</span></label><input name="resturent_collection_time" id="resturent_collection_time"  type="text"   onchange="Main.requestCollctionUpdate(this,\'resturent_collection_time\')"></div>';
									page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] ?> <span>*</span></label><input name="resturent_other_value" id="resturent_other_value"  type="text"   onkeyup="Main.requestCollctionUpdate(this,\'resturent_other_value\')"></div>';
										page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] ?> <span>*</span></label><input name="resturent_other_reference" id="resturent_other_reference"  type="text"   onkeyup="Main.requestCollctionUpdate(this,\'resturent_other_reference\')"></div>';
											page +=' <div class="Req_Col_row"><label class="note"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'] ?></label><textarea name="customer_note" id="customer_note" cols="" rows=""  onkeyup="Main.requestCollctionUpdate(this,\'customer_note\')" ></textarea></textarea></div>';
                         	page +='</div>';
						
						  	page +=' <div class="clearfix"></div>';
                        
                       	page +='  <div class="confirm_row">';
                         	page +='<input type="checkbox" id="requestClooectioncheckremember" class="checkbox_2">';
                        	page +=' <label for="requestClooectioncheckremember"><span class="confirm"><?= $lang_resource['REQUEST_COLLECTION_CONDITION_CHK'] ?></span></label>';
                         	page +='</div>';
                        
                        
                        
                        
                         	page +='<div class="btn_Col_row"><button type="button" id="" onclick="Main.placeRequestCollection();" class="Request_btn" ><?= $lang_resource['REQUEST_COLLECTION'] ?></button></div>';
                        
						
						
	 page +=' </div>';	
   page +=' </div>';
   page +=' </div>'; 
		
		  page +='</div>';
   		 page +='</div>';
		

   return page;
   },
	AccountBlock: function(){
		   var htms ='<div class="main">'
    	 htms +='<div class="header">'
         htms +='<div class="header_pannel">';
		 
		 htms +='<div class="wrapp">';
		 htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Main.InitInterface()">X</button></div>';
		 htms +='</div>';
		 htms +='</div>';
		 htms +='<div class="logo" style="margin-top:5px;"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg"></a></div>';
		 htms +='</div>';
		 
         htms +='</div>';
		 
		 
       
		 htms +='<div class=" main login">';
    	htms +='<div class="wrapp">';
		htms += Main.GetUserBoxHtml();
		
		  htms +='</div>';
   		 htms +='</div>';
		
		 document.getElementById("top").innerHTML = htms;	
		},
	CheckSelect1: function(){
		
		if ($("#checkbox1").is(':checked')) {
        	$("#checkbox2").prop('checked',false);
       
 		 }
	},
	
	CheckSelect2: function(){
		 if ($("#checkbox2").is(':checked')) {
        	$("#checkbox1").prop('checked',false);
       
 		 }
	},
	TrackOrderMob: function()
   {
	   
	   var htms ='<div class="main">'
    	 htms +='<div class="header grey">'
         htms +='<div class="header_pannel">';
		 
		 htms +='<div class="wrapp">';
		 htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Main.InitInterface()">X</button></div>';
		 htms +='</div>';
		 htms +='</div>';
		 htms +='<div class="logo" style="margin-top: 8px"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" ></a></div>';
		 htms +='</div>';
		 
         htms +='</div>';
		 
       
		 htms +='<div class=" main grey login">';
    	htms +='<div class="wrapp">';
        	htms +='<h2 class="text_center heading"><?=$lang_resource['MOBILE_FRONT_VISUALS_TRACK_ORDER'] ?></h2>';
        	htms +='<div class="field">';
                	htms +='<input type="text" class="field-text" id="consultorder" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_ENTER_YOUR_ORDER_ID']?>" onkeyup="Main.CheckOrderEnter(event);">';
                htms +='</div>';
                htms +='<div class="field">';
                	htms +='<button type="button" class="btn-red" onclick="Main.CheckOrder(event);"><?=$lang_resource['MOBILE_FRONT_VISUALS_TRACK_NOW']?></button>';
                htms +='</div>';
               
        htms +='</div>';
    htms +='</div>';
   
   
        document.getElementById("top").innerHTML = htms;		 
		 
	   
   },
	
    CreateFacepile: function () {
        return '<div class="facepile"><div class="innerbox hand"><div class="followbox"><span><?= $lang_resource['BODY_FOLLOW_US'] ?></span><a rel="nofollow" href="http://www.facebook.com/pages/Ordering-Online-System/267925886640412" target="_blank"></a><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOrdering-Online-System%2F267925886640412&amp;send=false&amp;layout=standard&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=80&amp;appId=410337302329626" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:600px; height:80px;" allowtransparency="true" allowTransparency="true"></iframe></div></div></div>​'
    },
    CreateMiniWhereAmIButton: function (a, c, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
        return "<div " + b + 'class="miniwhereamibutton"><div class="innerbox hand" onclick="' + c + '"><div class="captionbox"><span class="caption nonselectable">' + a + "</span></div></div></div>"
    },
    CreateRegularButton: function (d, c, a, e, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
        return "<div " + b + 'class="regularbutton"><div class="innerbox hand ' + c + '" onclick="' + e + '"><div class="img ' + d + '"></div><div class="captionbox"><span class="caption nonselectable caption' + c + '">' + a + "</span></div></div></div>"
    },
    CreateBigTagInput: function (d, b, a, c) {
        return '<div class="biginputbox" style="width:' + a + "px;" + c + '"><div class="biginnerbox">' + d + '<div class="tag ' + b + '"></div></div></div>'
    },
    CreateMainStepsBox: function () {
		var hts = '';
		var hts = '<div class="lft_hm_div">';
				
        return hts;
    },
    CreateMainActivityBox: function () {
        var b = "";
        b = '<div class="activitybox"><div class="innerbox"><div class="tag1"></div><div class="tag2"></div>';
        b += '<div id="recentbox">';
        if (Main.recentactivity) {
            var c = Main.recentactivity.length - 1;
            var a = 0;
            var e = 0;
            for (var d in Main.recentactivity) {
                b += '<span class="caption nonselectable default color' + e + '">' + Main.TitleCase(Main.recentactivity[d].user.name) + " <?= $lang_resource['JUST_ORDERED_V2'] ?> " + Main.recentactivity[d].business.name + "</span>";
                if (a < c) {
                    b += '<div class="recentdivider"></div>'
                }
                e++;
                if (e > 1) {
                    e = 0
                }
                a++
            }
        }
        b += '</div><div class="divider"></div>';
        b += '<div id="popularbox">';
        if (Main.populars) {
            for (var d in Main.populars) {
                BgStyle = "background-image:url('panel/images/business/" + Main.populars[d] + "/small.jpg?c=" + Main.Random + "');";
                b += '<div class="img" style="' + BgStyle + '"></div>'
            }
        }
        b += "</div></div></div>";
        return b
    },
    CreateLoginBox: function () {
		var lgn = '<div class="popdiv_pop" style="display:none;">';		
				lgn += '<div class="pops_divs">';
					lgn += '<div class="pop_top"></div>';
					lgn += '<div class="pop_mid" style="height:375px;">';
						lgn += '<p>Login</p>';
						lgn += '<div class="sprt_line"></div>';
						lgn += '<div class="loginbox" id="loginbox">';
						lgn += '<div class="innerbox"><div class="ubox"><div id="usermenu"></div></div></div></div>';
						lgn += '<br clear="all" />';
						lgn += '<span class="elseclass" style="text-align: center;width: 100%;display:block;"><?= $lang_resource['ELSE_V2'] ?></span>';
						lgn += '<div class="sprt_line"></div>';
						lgn += '<div class="loginbottom" id="loginbottom"></div>';
					lgn += '</div>';
					lgn += '<div class="pop_btm"></div>';
				lgn += '</div>';
			lgn += '</div>';


	   return lgn;
    },
    CreateSocialButtons: function () {
        var a = "";
  
        document.getElementById("socialbtns").innerHTML = Visuals.CreateMobileButton() + Visuals.CreateHelpButton() + a
    },
	<!----------------------------------------------Login portion---------------------------------------------------------------->
	LoginMob: function()
   {
	    var htms ='<div class="main">'
    	 htms +='<div class="header grey ">'
         htms +='<div class="header_pannel">';
	  // var htms ='<div class="main">'
	   htms +='<div class="wrapp">';
	
	    htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Main.InitInterface()">X</button></div>';
		 htms +='</div>';
		  htms +='</div>';
		  
    	 htms +='<div class="header" style="height:49px">'
         htms +='<div class="logo" style="margin-top: 5px" ><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" ></a></div>';
         htms +='</div>';
		  htms +='</div>';
		 
		 
		 htms +='<div class=" main grey login">';
		 htms +='<div class="wrapp">';
	    htms +='<h2 class="text_center heading"><?=$lang_resource['LOGIN_BUTTON_LOGIN']?></h2>';
        	htms +='<div class="field">';
                	htms +='<input type="text" class="field-text" placeholder="<?=$lang_resource['CONTROL_PANEL_USERS_EMAIL_HEADER']?>" id="loginemailMob">';
                htms +='</div>';
                htms +='<div class="field">';
                	htms +='<input type="password" class="field-text" placeholder="<?=$lang_resource['Password_V2']?>" id="loginpasswordMob">';
                htms +='</div>';
                htms +='<div class="field">';
                	htms +='<button type="button" class="btn-red" onclick="Main.Login();"><?=$lang_resource['MOBILE_FRONT_VISUALS_LOGIN']?></button>';
                    htms +='<p class="text_center forot-pass"><a href="javascript: void(0)"  onclick="Main.RecoverPassword(true)"><?=$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_YOUR_PASSWORD']?></a></p>';          
                htms +='</div>';
                htms +='<div class="field" style="margin-bottom:5px;">';
                	htms +='<button type="button" class="btn-red btn-yellow" onclick="Main.CommonAccount();"><?=$lang_resource['MOBILE_FRONT_VISUALS_REGISTER']?></button>';
                    htms +='<p class="text_center or"><?=$lang_resource['MOBILE_FRONT_VISUALS_OR']?></p>';          
                htms +='</div>';
                htms +='<div class="field">';
                	htms +='<button type="button" class="btn-red btn-fb" onclick="Facebook.Login()"><?=$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_WITH_FACEBOOK']?></button>';     
                htms +='</div>';
        htms +='</div>';
    htms +='</div>';
   
   
        document.getElementById("top").innerHTML = htms;	
		if(document.getElementById("shoppingbox"))	 
		document.getElementById("shoppingbox").innerHTML ="";
		document.getElementById("headerSearch").innerHTML = "";			
	   
   },
   	<!----------------------------------------------Login portion---------------------------------------------------------------->
	
	
	<!---------------------------------------------Register Portion--------------------------------------------------------------------->   
	
CommonRegisterForm: function()
	{
		
		var htm = "";
		
		
		 htm += '<div class="popup_wrapper">';
        htm += '<div class="pop_header">';
		
		 
		 htm += '<div class="pop_header"><span class="pop_heading"><h3><?=$lang_resource['BUSINESS_USER_REGISTER']?></h3></span>';
		 htm += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
		 htm += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
		 htm += '</div></div>';
		
      
       htm += "</div>";
		
		htm += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
		
		htm +='<div class="reg_as_wrapper">';
	htm +='<div class="foodlover_section">';
        	htm +='<div class="foodlover_icon"><img src="images/homeimage/food_lover.png"></div>';<!--foodlover_icon-->
            htm +='<h3><?=$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE1']?></h3>';
            htm +='<p><?=$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE2']?></p>';
            htm +='<div class="reg_checkbox">';
            htm +='<input type="radio" id="t1" name="cr" value="u" class="single_radio">';
            htm +='<label for="t1">&nbsp;</label></div>';
            htm +='<p class="label_text"><?=$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE3']?></p>';
    
    htm +='</div>';<!--foodlover_section-->
    
    htm +='<div class="home_chef_section">';
        	htm +='<div class="foodlover_icon"><img src="images/homeimage/home_chef.png"></div>';<!--foodlover_icon-->
            htm +='<h3><?=$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE1']?></h3>';
            htm +='<p><?=$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE2']?></p>';
            htm +='<div class="reg_checkbox">';
            htm +='<input type="radio" id="t2" name="cr"  value="b" class="single_radio">';
            htm +='<label for="t2">&nbsp;</label></div>';
            htm +='<p class="label_text"><?=$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE3']?></p>';
    
    htm +='</div>';<!--home_chef_section-->
    htm +='<center>';
    	htm +='<button type="button" id="pop_submit_btn" class="pop_submit_btn" onclick="Main.ChooseTypeRegister();" style="margin-top:20px;"><?=$lang_resource['MOBILE_MENU_LIST_NEXT']?></button>';
    htm +='</center>';
    
htm +='</div>';

htm +='</div>';
		
		
		 Popup.Show(700, 660, htm, null);
		
	},	
	
	
EditRegister: function(b)
   {
	   // alert(JSON.stringify(b.colony));
	   
	   if(document.getElementById("headerSearch")){
		$("#headerSearch").hide();
		}
		$("#shoppingbox").empty();
	   
	           if (b)
        {
		
			///////////////////////////
			var ZZ = new Array();
			ZZ.push(
			{
				id: "",
				caption: "Colony"
			});
            Forms.Form.user.type = "modify"
			Forms.Form.user.colony = b.colony;
		 
			
			for (i in Main.Franchises)
			{
				ZZ.push(
				{
					id: Main.Franchises[i].id,
					caption: Main.Franchises[i].colony
				})
			}
			
			var FF = new Array();
			FF.push(
			{
				id: "",
				caption: "<?= $lang_resource['CITY_V2'] ?>"
			});
            Forms.Form.user.type = "modify"
			Forms.Form.user.city = b.city;
		    Main.PopulateCitySelectRegister(b.country, b.city)
			
			 Main.PopulateColonySelectRegister(b.city, b.colony)
			
			for (i in Main.Franchises)
			{
				FF.push(
				{
					id: Main.Franchises[i].id,
					caption: Main.Franchises[i].city
				})
			}
			
			
		}
			else
			{
				b = new Object();
				Forms.Form.user.type = "create";
				Forms.CreateValue("user", "config", "{}", false, false, true)
				
				var ZZ = new Array();
				ZZ.push(
				{
					id: "",
					caption: "<?= $lang_resource['Neighbourhood_V2'] ?> "
				});
			


				b = new Object();
				Forms.Form.user.type = "create";
				Forms.CreateValue("user", "config", "{}", false, false, true)
				
				var FF = new Array();
				FF.push(
				{
					id: "",
					caption: "<?= $lang_resource['CITY_V2'] ?> *"
				});
			}

				
		/* Choose country */
		var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?=$lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY']?> *"
        });
        for (i in Main.Countries)
        {
            d.push(
            {
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }
		/* Choose country */
	   
	   
	   
	   var htms ='<div class="main">'
	    htms +='<div class="header grey">'
         htms +='<div class="header_pannel">';
	   htms +='<div class="wrapp">';
		if(Main.User) {
	   htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Visuals.AccountBlock()">X</button></div>';
		} else {
	   htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Visuals.LoginMob()">X</button></div>';
		}
	   htms +='</div>';
	   htms +='</div>';
       htms +='<div class="header grey" style="height:49px">'
       htms +='<div class="logo" style="margin-top: 5px"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg"></a></div>';
       htms +='</div>';
		htms +='</div>'; 
		 
	   htms +='<div class=" main grey login">';
       htms +='<div class="wrapp">';
	   htms +='<h2 class="text_center heading"><?=$lang_resource['MOBILE_FRONT_VISUALS_REGISTER']?></h2>';
		
       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "name", Main.NullToEmpty(b.name), true,'',"<?=$lang_resource['MOBILE_FRONT_VISUALS_NAME']?>*")
	   htms +='</div>'
	   
       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "lastname", Main.NullToEmpty(b.lastname), false,'',"<?=$lang_resource['FRONT_VISUALS_MIDDLE_NAME']?>")
	   htms +='</div>'
	   
       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "lastname2", Main.NullToEmpty(b.lastname2), true,'',"<?=$lang_resource['FRONT_VISUALS_LAST_NAME']?> *")
	   htms +='</div>'
	   
       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "email", Main.NullToEmpty(b.email), true,'',"<?=$lang_resource['Email_ID_V2']?> *")
	   htms +='</div>'
	   
       htms +='<div class="field">'
	   if (Forms.Form.user.type == "modify"){
		  
	   htms +=Forms.CreateInputPropertyPopUp("user", "pwd", Main.NullToEmpty(b.pwd), false,'',"<?=$lang_resource['Password_V2']?> *",true)
	   } else {
	   htms +=Forms.CreateInputPropertyPopUp("user", "pwd", Main.NullToEmpty(b.pwd), true,'',"<?=$lang_resource['Password_V2']?> *",true)
	   }
	   htms +='</div>'
	   
       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "street", b.street, true, "GoogleMap.UpdateUserPosition(this)","<?=$lang_resource['FRONT_VISUALS_STREET']?>")
	   htms +='</div>'
	   
	  

    /*   htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "colony", b.colony, false, "GoogleMap.UpdateUserPosition(this)","<?=$lang_resource['FRONT_VISUALS_COLONY']?> *")
	   htms +='</div>'*/
	   
	  /* 
	   htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUpreadonly("user", "countryregister",Main.NullToEmpty(b.countryname), false,"", "Country")
	   htms +='</div>'*/
	   
	   ///////////////////////////////////////////
	  
	   if(Main.fetchenterprise == 0)
		{
			 htms +='<div class="field">'
	 		  htms +=Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false,'GoogleMap.UpdateUserPositionzipcode(this)',"<?=$lang_resource['FRONT_VISUALS_POST_CODE1']?> *")
	  		 htms +='</div>'
	   
			
	   		 htms +='<div class="field">'
	  		 htms +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)")
	  		 htms +='</div>' 
	   
				htms +='<div class="field">'
			   if(Main.neighsettings == 't'){
			   htms +=Forms.CreateSelectPropertyPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect2(null,null,this);",true,"cityregister")
			   }else{
			   htms +=Forms.CreateSelectPropertyPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "GoogleMap.UpdateUserPosition(this);",true,"cityregister")	
			   }
			   htms +='</div>'

			
		}else{
			
			   htms +='<div class="field">'
			   htms +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)")
			   htms +='</div>'
	   
			   htms +='<div class="field">'
			   htms +=Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false,'GoogleMap.UpdateUserPositionzipcode(this)',"<?=$lang_resource['FRONT_VISUALS_POST_CODE1']?> *")
			   htms +='</div>'
	   
       		
			   htms +='<div class="field">'
			   if(Main.neighsettings == 't'){
			   htms +=Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false,"", "City")
			   }else{
			   htms +=Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false,"", "City")	
			   }
			   htms +='</div>'
				
		}
		
	   
	   
	     if(Main.neighsettings == 't'){
	   htms +='<div class="field">'
	   htms +=Forms.CreateSelectPropertyCPopup("user", "colony", ZZ, Main.NullToEmpty(b.colony), false, "GoogleMap.UpdateUserPosition(this)",true,"address2")
	   htms +='</div>'
	   }else{
	   htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "colony", b.colony, false, "GoogleMap.UpdateUserPosition(this)","<?=$lang_resource['Neighbourhood_V2']?> ")
	   htms +='</div>'
	   }
	   
	   
	   
	   ///////////////////////////////////////////////////////////
	   
	   
	   
	   
	   
	   
	   
	    /*htms +='<div class="field">'
	   htms +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)")
	   htms +='</div>' 
	   
	  
	   htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false,'GoogleMap.UpdateUserPositionzipcode(this)',"<?=$lang_resource['FRONT_VISUALS_POST_CODE1']?> *")
	   htms +='</div>'
	   
	   

       htms +='<div class="field">'
       if(Main.neighsettings == 't'){
	   htms +=Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false,"", "City")
	   }else{
	   htms +=Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false,"", "City")	
	   }
	   htms +='</div>'
*/
      

	  

       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "tel", b.tel, false,'',"<?=$lang_resource['FRONT_VISUALS_LAND_PHONE']?>")
	   htms +='</div>'

       htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "cel", b.cel, false,'',"<?=$lang_resource['FRONT_VISUALS_MOBILE_PHONE']?>")
	   htms +='</div>'
	   
	    htms +='<div class="field">'
	   htms +=Forms.CreateInputPropertyPopUp("user", "api", b.api, false,'',"<?=$lang_resource['FRONT_VISUALS_MOBILE_APT']?>")
	   htms +='</div>'
	   
	   
	   
	   htms +='<div id="mapboxuser"  style="display:none;" class="smallmapbox"></div>'
				
       htms +='<div class="field" style="margin-bottom:5px;">';
	   if (Forms.Form.user.type == "create")
        {
       htms +='<button type="button" class="btn-red btn-yellow" onclick="Main.TryToStartSaveUser()"><?=$lang_resource['MOBILE_FRONT_VISUALS_REGISTER1']?></button>';
		}
		else
		{
			 htms +='<button type="button" class="btn-red btn-yellow" onclick="Main.TryToStartSaveUser()"><?=$lang_resource['MOBILE_FRONT_VISUALS_REGISTER2']?></button>';
		}
       htms +='</div>';
	   if (Forms.Form.user.type == "create")
        {
	   htms +='<div class="field" style="margin-bottom:5px;">';
       htms +='<button type="button" class="btn-red" onclick="GoogleMap.locateme()"><?=$lang_resource['LOCATE_ME']?></button>';
       htms +='</div>';
		}
	   
	   htms +='</div>';
	   htms +='</div>';
   
   
        document.getElementById("top").innerHTML = htms;		 
		//document.getElementById("shoppingbox").innerHTML = "";
		//document.getElementById("headerSearch").innerHTML = "";			
	   
	   
   },
   
	<!---------------------------------------------Register Portion--------------------------------------------------------------------->   
   
   
		
	<!---------------------------------------------Forgot password Portion--------------------------------------------------------------------->   

   RecoverForm: function(){
	   
	   Forms.Clean("recover", "popupmainbuttonok");
	   
	   var htms ='<div class="main">'
	  	   htms +='<div class="wrapp">'
		   
		   htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Visuals.LoginMob()">X</button></div>'
		   htms +='</div>'
		   htms +='<div class="header" style="height:49px">'
		   htms +='<div class="logo" style="margin-top: 5px"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" ></a></div>'
		   htms +='</div>'
		   
		   htms +='<div class=" main grey login">'
		   htms +='<div class="wrapp">'
		   htms +='<h2 class="text_center heading"><?=$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_PASSWORD']?></h2>'
		   
		   htms +='<div class="field">'
		   htms +=Forms.CreateInputPropertyPopUp("recover", "email", "", true,'',"<?=$lang_resource['MOBILE_FRONT_VISUALS_OR_ENTER_EMAIL_ADDRESS']?>")
		   htms +='</div>'
		   
		   htms +='<div class="field">'
		   htms +='<button type="button" class="btn-red" onclick="Main.RecocerPassSend()"><?=$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT']?></button>'
		   htms +='</div>'
		   
		   htms +='</div>'
		   htms +='</div>'
   
   
        document.getElementById("top").innerHTML = htms;	
		document.getElementById("shoppingbox").innerHTML = "";	
		document.getElementById("headerSearch").innerHTML = "";			
			 
	},
   
	<!---------------------------------------------Forgot password Portion--------------------------------------------------------------------->   
	
	ChangeForm: function(){
			Forms.Clean("change", "popupmainbuttonok");
				
		var htms ='<div class="main">'
		htms +='<div class="wrapp">';
		
		htms +='<div class="pull_left"><button type="button" class="close-btn" onclick="Visuals.LoginMob()">X</button></div>';
		htms +='</div>';
		htms +='<div class="header" style="height:49px">'
		htms +='<div class="logo" style="margin-top: 5px" ><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" ></a></div>';
		htms +='</div>';
		
		
		htms +='<div class=" main grey login">';
		htms +='<div class="wrapp">';
		htms +='<h2 class="text_center heading"><?=$lang_resource['MOBILE_CHANGE_PASSWORD_TITLE']?></h2>';
		
		htms +='<div class="field">';
		htms +=Forms.CreateInputPropertyPopUp("change", "current", "", true,'',"<?=$lang_resource['MOBILE_CHANGE_PASSWORD_CURRENT']?>",true)
		htms +='</div>';
		htms +='<div class="field">';
		htms +=Forms.CreateInputPropertyPopUp("change", "newpwd", "", true,'',"<?=$lang_resource['MOBILE_CHANGE_PASSWORD_NEW']?>",true)
		htms +='</div>';
		htms +='<div class="field">';
		htms +=Forms.CreateInputPropertyPopUp("change", "retype", "", true,'',"<?=$lang_resource['MOBILE_CHANGE_PASSWORD_CONFIRM']?>",true)
		htms +='</div>';
		htms +='<div class="field">';
		htms +='<button type="button" class="btn-red" onclick="Main.ChangePassSend();"><?=$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT']?></button>';
		        
		htms +='</div>';	
		

		htms +='</div>';
		htms +='</div>';
   
   
        document.getElementById("top").innerHTML = htms;	
		if(document.getElementById("shoppingbox"))	 
		document.getElementById("shoppingbox").innerHTML ="";
		document.getElementById("headerSearch").innerHTML = "";			
	   
   
        
	},
	
//************************************* End Of Change Password*************************************//	
	LoginDetails: function (c)
    {
		
        Forms.Clean("logindetails", "popupmainbuttonok");
        Main.ActiveForm = "logindetails";
        var b = false;

	var bd = "";
		
		
		bd +='<div class="main">';
    	bd +='<div class="header-grey">';
        	bd +='<div class="header_top">';
            	bd +='<div class="wrapp">';
                	bd +='<div class="left_btn_dv"><button type="button" class="red-link-btn" onclick="Shopping.OpenBusiness('+currentshop+')">< <?=$lang_resource['MOBILE_FRONT_VISUALS_BUSINESS']?></button></div>';
                          bd +='<div class="center_heading">&nbsp;</div>';
                	bd +='<div class="left_btn_dv pull_right"><button type="button" class="red-link-btn" onclick="Main.InitInterface()"><?=$lang_resource['MOBILE_CHECKOUT_CANCEL']?></button></div>';
              
                bd +='</div>';
            bd +='</div>'

        bd +='</div>';
		 bd +='<div class="blank-top"></div>'
   bd +='</div>';
   
   document.getElementById("headerSearch").innerHTML = bd;
	     var em ="";	
				 var ps ="";
				 var chk="";
				if((document.cookie.indexOf('emailID')!= -1)&&(document.cookie.indexOf('passVAL')!= -1)){
					 var em = getCookie("emailID");
					 var ps = getCookie("passVAL");
					if (em != "" && ps != "")
					{
						chk='checked="checked"';
					}
				}
	 var a = "";
	    a +='<div class=" main grey login">';
    	a +='<div class="wrapp">';
	    a +='<h2 class="text_center heading"><?=$lang_resource['MOBILE_FRONT_VISUALS_LOGIN']?></h2>';
        a +='<div class="field">';
        a +='<input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_EMAIL']?>" id="loginemail1">';
        a +='</div>';
        a +='<div class="field">';
       	a +='<input type="password" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_PASSWORD']?>" id="loginpassword1">';
        a +='</div>';
        a +='<div class="field">';
		
        a +='<button type="button" class="btn-red" onclick="Main.LoginCheck();"><?=$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_SIGN_IN_TO_CHECKOUT']?></button>';
        a +='<p class="text_center forot-pass"><a href="javascript: void(0)"  onclick="Main.RecoverPassword(true)"><?=$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_YOUR_PASSWORD']?></a></p>';          
        a +='</div>';
		a +='<div class="wrapp">';
	    a +='<h2 class="text_center heading"><?=$lang_resource['MOBILE_FRONT_VISUALS_NEW_CUSTOMER']?></h2>';
        a +='<div class="field">';
		a += '<p class="text_center forot-pass"><a><?=$lang_resource['MOBILE_FRONT_VISUALS_YOU_DONT_ACCOUNT']?></a></p>'
		a +='<button type="button" class="btn-red btn-yellow" onclick="Shopping.OpenCartGuest();"><?=$lang_resource['MOBILE_FRONT_VISUALS_COUNTINUE_AS_GUEST']?></button>';
		a +='</div>';
		a +='<div class="field">';
		a += '<p class="text_center forot-pass"><a><?=$lang_resource['MOBILE_FRONT_VISUALS_CREATE_ACCOUNT_FAST']?></a></p>'
      	a +='<button type="button" class="btn-red" onclick="Main.EditAccount1(true)"><?=$lang_resource['MOBILE_FRONT_VISUALS_CREATE_ACCOUNT']?></button>';   
		a +='<p class="text_center or"><?=$lang_resource['MOBILE_FRONT_VISUALS_OR']?></p>';   
        a +='</div>';
		a +='<div class="field">';
        a +='<button type="button" class="btn-red btn-fb" onclick="Facebook.Login()"><?=$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_WITH_FACEBOOK']?></button>';     
        a +='</div>';
		
			
		document.getElementById("shoppingbox").innerHTML = a;
			
	
		
    },
	
ChooseDeliverOption: function (x,y,options,comments,optionsid,total_price,quantitysec)
    {
		 Main.Ready();
		 Main.currentItem = y;
		 Main.type = "modify";
		 Main.currentX = x;
		 Main.Itemoptions = options;
		 Main.Itemcomments = comments;
		 Main.Itemoptionsid = optionsid;
		 Main.Itemtotal_price = total_price;
		 Main.Itemquantitysec = quantitysec;
		 
		Forms.Clean("recover13", "popupmainbuttonok");
        
       var   a = '<div class="popup_wrapper">';
		a += '<div class="pop_header">';
        a += '<div class="pop_heading"><h3><?=$lang_resource['Delivery_Option']?></div>';
	     a += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	 a += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>';
         a += '</div>';
        a += "</div>";
		
		
		a += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">';
      
		var qs = new Array();
        qs.push(JSON.parse('{"id":"","caption":"<?=$lang_resource['PICKUP_DELIVERY']?>"}'));
        if(Shopping.deliverystatus.pickup == true || Shopping.deliverystatus.pickup == 'true'){
			if(Main.settingfront.tab_pickup != 'f'){
        		qs.push(JSON.parse('{"id":"pickup","caption":"<?=$lang_resource['PICKUP']?>"}'));
			}
		}
		if(Shopping.deliverystatus.delivery == true || Shopping.deliverystatus.delivery == 'true'){
			 if(Main.settingfront.tab_delivery != 'f'){
        qs.push(JSON.parse('{"id":"delivery","caption":"<?=$lang_resource['DELIVERY']?>"}'));
			 }
		}
       /* qs.push(JSON.parse('{"id":"pickup","caption":"<?=$lang_resource['PICKUP']?>"}'));
        qs.push(JSON.parse('{"id":"delivery","caption":"<?=$lang_resource['DELIVERY']?>"}'));*/
		
	    a += '<tr>';
        a += '<td align="center" colspan="2">' +  Forms.CreateSelectPropertyPopup("recover13", "deliveryoption", qs, "", true) + '</td>';
        a += '</tr>';
		a += '<tr>';
        a += '<td align="center" colspan="2">&nbsp;</td>';
        a += '</tr>';
		  a += '<tr>';
        a += '<td align="center" colspan="2"><button type="button" class="pop_submit_btn" style="width:250px;" onclick="Main.DeliveryAction()"><?=$lang_resource['MOBILE_FRONT_VISUALS_CONTINUE']?></button></td>';
        a += '</tr>';
	

        a += "</table>";
      
        Popup.Show(440, 240, a, function ()
        {
		
			
        }, function ()
        {
            Forms.Clean("recover13");
            Main.Ga(Main.ActiveView)
        })
},
OpenOrder: function (a,fromInput)
    {
    	if(document.getElementById("headerSearch")){
    		$("#headerSearch").hide();
    	}
		
        Main.Loading(true);
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchOrderData","id":' + a + "}]", function (d)
        {
			
			
            if (b != Main.Aid)
            {
                return
            }
            Main.Ready(true);
            if (d != "" && d != '{"order":null}')
            {
				Popup.Close();
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
				if(!Main.Temp.Order.statusshow){
					alert("<?=$lang_resource['MOBILE_NO_PERMISSION_TO_SHOW_ORDER']?>")	
					return;
				}
				if(document.getElementById("consultorder")) {
				document.getElementById("consultorder").value = Main.Temp.Order.id;
				}
				
               
				var c ="";
				 var i=0;
				if(document.getElementById("shoppingbox")) {
				
				     c +='<div class="main">'
					 c +='<div class="header" style="height:84px">'
					 c +='<div class="header_pannel">';
					 
					 c +='<div class="wrapp">';
					 c +='<div class="pull_left"><button type="button" class="close-btn" onclick="Main.InitInterface()">X</button></div>';
					 c +='</div>';
					 c +='</div>';
					 c +='<div class="logo" style="margin-top:5px;"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" ></a></div>';
					 c +='</div>';
					 c +='</div>';
					}
			
			
			
			 c += '<div class="orderBlock">';
			 c += '<div class=" main grey login">';
			 
    		 c += '<div class="wrapp" >';
        	 c += '<h2 class="text_center heading" style="font-size:20px;"><?= $lang_resource['Order_V2'] ?> ' + Main.Temp.Order.id + " (" + Main.Temp.Order.status + ")</h2>";
			 	 if(Main.Temp.Order.requestcollectiondata!=true){
			 if(Main.Temp.PseudoCart.business[0].dishes != ""){
        	 c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_NAME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_EMAIL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.email) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_ADDRESS']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_TEL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.Order.comment) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" readonly  class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_DRIVER_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + '"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_USER_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '"></div>';
			 }
			
			 if(Main.Temp.PseudoCart.reservestatus){
        	 c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_NAME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.name) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_EMAIL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.email) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_TEL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.tel) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_DATE']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rdate) + '" readonly="readonly" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_TIME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rhour) + ':'+ Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rmin) +'"></div>';
			 }
			  }else{
				  c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_name) + '" readonly="readonly"></div>';
				   c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_postcode) + '" readonly="readonly"></div>';
				    c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_address1)+','+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_address2) + '" readonly="readonly"></div>';
					 c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_contactno) + '" readonly="readonly"></div>';
					 
					   c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_RESTURENT_NAME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_name) + '" readonly="readonly"></div>';
				   c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_postcode) + '" readonly="readonly"></div>';
				    c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_collection_time) + '" readonly="readonly"></div>';
					 c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_other_value) + '" readonly="readonly"></div>';
					  c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.resturent.resturent_other_reference) + '" readonly="readonly"></div>';
					   c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.Order.comment) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_DRIVER_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + '"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_USER_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.customer_note) + '"></div>';
				  
			 }
       		 c +='</div>';
			 
			 
		 
        	c +='<div class="grey">';
            c += '<div class="wrapp">';
             
			 if(Main.Temp.Order.requestcollectiondata!=true){ 
			if(Main.Temp.PseudoCart.business[0].dishes != ""){           
                        
                        c += '<table class="sh_order_tbl grey" border="0" width="100%" cellpadding="0" cellspacing="0">';
         	c += '<thead>';
            	c += '<tr>';
                	c += '<th colspan="3"><div class="category_name">' + Main.Temp.PseudoCart.business[i].name.toUpperCase() + '<br><span class="rest_add" style="font-size:14px; color:#666"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?> </span><span>'
					
					 if(Main.Temp.PseudoCart.business[i].paymethod.cash == true) {
					  c += '<?=$lang_resource['FRONT_CASH']?>';
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.card == true) {
					  c += '<?=$lang_resource['FRONT_CARD']?>';  
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.braintree == true) {
					  c += '<?=$lang_resource['FRONT_BRAINTREE']?>';  
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorize == true) {
					  c += '<?=$lang_resource['FRONT_AUTHORIZE']?>';  
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.cardsave == true) {
					  c += '<?=$lang_resource['FRONT_CARDSAVE']?>';  
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypal == true) {
					  c += '<?=$lang_resource['FRONT_PAYPAL']?>';  
					  }  else if(Main.Temp.PseudoCart.business[i].paymethod.marco == true) {
					  c += '<?=$lang_resource['FRONT_MACRO']?>';  
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypaladaptive == true) {
					  c += '<?=$lang_resource['FRONT_PAYPALADAPTIVE']?>';  
					  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorizednet == true) {
					  c += '<?=$lang_resource['FRONT_AUTHORIZEDOTNET']?>';  
					  }
					
					c += '</span></div>';
					c += '</th>';
                  
                 c += '</tr>';
           		 c += '</thead>';
                 c += '<tbody>';
			  for (j in Main.Temp.PseudoCart.business[i].dishes)
            {
				c += '<tr>';
                c += '<td><span class="label-2">' + Main.Temp.PseudoCart.business[i].dishes[j].name.toUpperCase() +"</span>";
				if(Main.Temp.PseudoCart.business[i].dishes[j].options)
				c += "<br><p style='float:left;clear:both'>"+ ProductOption.Margeslash(Main.Temp.PseudoCart.business[i].dishes[j].options) + '</p>';
				 
			
			
                	c += '<span><input type="text" class="field-comment" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>"  value="' + Main.NullToEmpty(Main.Temp.PseudoCart.business[i].dishes[j].comments) + '" readonly="readonly"></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].dishes[j].total) + '</span>';
                c += '</td>';
              c += '</tr>';
			}
			if (parseFloat(Main.Temp.PseudoCart.business[i].shipping) > 0)
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
            }
            else
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
            }
             
              c += '<tr>';
                c += '<td><span class="label-2">' + a + '</span>';
                	c += '<span><input type="text" class="field-comment" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '" READONLY></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].shipping) + '</span>';
                c += '</td>';
              c += '</tr>';
              c += '<tr>';
			  /*	discount section*/
			  if((Main.Temp.PseudoCart.discounttype > 0) && (Main.NullToEmpty(Main.Temp.PseudoCart.discountprice)!=''))
					{
						if(Main.Temp.PseudoCart.discounttype == 1)
						{
						var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?> ('+Main.Temp.PseudoCart.discountrate+'%)';
						}
						else
						{
						var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?>';
						}
			       c += '<tr>';
                c += '<td><span class="label-2">' + discaption + '</span>';
                	c += '<span><input type="text" class="field-comment" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.discountcomments) + '" READONLY></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + parseFloat(Main.Temp.PseudoCart.discountprice).toFixed(Main.IS_DECIMAL_POINT) + '</span>';
                c += '</td>';
              c += '</tr>';
              c += '<tr>';
	
					}
					/*	Tax section*/
					if(Main.Temp.PseudoCart.buyer.tax){
			if(Main.Temp.PseudoCart.buyer.taxtype == 2){
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED']?>";
			}else{
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED']?>";
			}	
					
                c += '<td><span class="label-2"><?= $lang_resource['REORDER_CONFIRM_TAX'] ?> ('+Main.Temp.PseudoCart.buyer.tax+' %)</span>';
                	c += '<span><input type="text" class="field-comment" value="'+taxstatus+'" readonly="readonly"></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.tax) + '</span>';
                c += '</td>';
              c += '</tr>';
			  
			  if(parseInt(Main.Temp.PseudoCart.buyer.tips)>0){
			 c += '<tr>';
				
              c += '<td><span class="label-2"><?= $lang_resource['TRACKORDER_TIPS'] ?></span>';
             
              c += '</td>';
              c += '<td valign="top" align="right">';
			  c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.buyer.tips) + '</span>';
              c += '</td>';
              c += '</tr>';
			  }
			   if(Main.Temp.PseudoCart.servicefeeTotal1){
			 c += '<tr>';
				
              c += '<td><span class="label-2"><?= $lang_resource['SERVICE_FEE_V2'] ?>('+Main.Temp.PseudoCart.servicefee+' %)</span>';
             
              c += '</td>';
              c += '<td valign="top" align="right">';
			  c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.servicefeeTotal1) + '</span>';
              c += '</td>';
              c += '</tr>';
			  }
              c += '<tr>';
                c += '<td><span class="total"><?= $lang_resource['Your_Total_V2'] ?> :</span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name" style="font-size:20px;">' + Shopping.FormatPrice(Main.Temp.PseudoCart.total) + '</span>';
                c += '</td>';
              c += '</tr>';
					}
					

  				 c += '</tbody>';
				 c += '</table>';
				 
			   

				 
			}
			
			if(Main.Temp.PseudoCart.reservestatus){
			
			if(Main.NullToEmpty(Main.Temp.Order.tableprice) == ""){
			var tprice=0;
			}else{
			var tprice=Main.Temp.Order.tableprice;	
			}	
			if(Main.NullToEmpty(Main.Temp.Order.roomprice) == ""){
			var rprice=0;
			}else{
			var rprice=Main.Temp.Order.roomprice;	
			}
			if(Main.NullToEmpty(Main.Temp.Order.freeprice) == ""){
			var fprice=0;
			}else{
			var fprice=Main.Temp.Order.freeprice;	
			}
				
			
			c += '<table class="sh_order" border="0" width="100%" cellpadding="0" cellspacing="0"><tbody>';
			c += '<tr>'
			c +='<td align="center">Table</td><td align="center">Room</td><td align="center"><?=$lang_resource['MOBILE_FRONT_VISUALS_FREE']?></td><td align="center"><?=$lang_resource['MOBILE_FRONT_VISUALS_QUANTITY']?></td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
			c +='<tr>'
			if(Main.Temp.PseudoCart.reserveQty.Table){
			c += '<td align="center" style="width:22%">'+Main.Temp.PseudoCart.reserveQty.Table+'</td></td>'
			}else{
			c += '<td align="center" style="width:22%"></td></td>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
			c += '<td align="center"style="width:22%">'+Main.Temp.PseudoCart.reserveQty.Room+'</td>'
			}else{
			c += '<td align="center" style="width:22%"></td></td>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
			c += '<td align="center" style="width:22%">'+Main.Temp.PseudoCart.reserveQty.Free+'</td>'
			}else{
			c += '<td align="center" style="width:22%"></td></td>'
			}
			c += '<td align="center" style="width:19%">'
			if(Main.Temp.PseudoCart.reserveQty.Table){
			if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)			
			c += '<span>Table  </span><span>'+Main.Temp.PseudoCart.reserveQty.Table.length+'</span><span>  X  </span><span>'+tprice+'</span><br>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
			if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
			c += '<span>Room  </span><span>'+Main.Temp.PseudoCart.reserveQty.Room.length+'</span><span>  X  </span><span>'+rprice+'</span><br>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
			if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
			c += '<span>Free  </span><span>'+Main.Temp.PseudoCart.reserveQty.Free.length+'</span><span>  X  </span><span>'+fprice+'</span><br>'	
			}
			c += '</td>'
			if(Main.Temp.PseudoCart.reserveQty.Table){
			var tableprice = Main.Temp.PseudoCart.reserveQty.Table.length * tprice ;
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
			var roomprice = Main.Temp.PseudoCart.reserveQty.Room.length * rprice ;
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
			var freeprice = Main.Temp.PseudoCart.reserveQty.Free.length * fprice ;
			}
			
			c += '<td align="center"  style="width:19%">'
			//if(tableprice != 0)
			if(Main.Temp.PseudoCart.reserveQty.Table){
			if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)
			c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
			}
			//if(roomprice != 0)
			if(Main.Temp.PseudoCart.reserveQty.Room){
			if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
			c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
			}
			//if(freeprice != 0)
			if(Main.Temp.PseudoCart.reserveQty.Free){
			if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
			c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
			}
			c +='</td>'
			c += "</tr>";
			c += '<tr>';
            c += '<td colspan="2">';
            c += '</td>';
			 c += '<td valign="top" align="center" colspan="2"><span class="total"><?= $lang_resource['Your_Total_V2'] ?> :';
			c += '</span></td>';
            c += '<td valign="top" align="center">';
			
            c += '<span class="category_name" style="font-size:20px;"><?= $lang_resource['Panel_Currency'] ?> ' + Shopping.FormatPriceNotFree(Main.Temp.PseudoCart.reserveFee) + '</span>';
            c += '</td>';
            c += '</tr>';
			 
			c += "</tbody></table>"
			c += "</td></tr>"	
			c +="</tbody></table>"
			
			}

			}else{
				  c += '<table class="sh_order_tbl grey" border="0" width="100%" cellpadding="0" cellspacing="0">';
         	c += '<thead>';
            	c += '<tr>';
                	c += '<th colspan="3"><div class="category_name">' + Main.Temp.PseudoCart.resturent.resturent_name.toUpperCase() + '<br><span class="rest_add" style="font-size:14px; color:#666"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?> </span><span><?=$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPAL']?></span></div>';
					c += '</th>';
                  
                c += '</tr>';
            c += '</thead>';
              c += '<tbody>';
              
               c += '<tr>';
                c += '<td><span class="total"><?= $lang_resource['Your_Total_V2'] ?> :</span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name" style="font-size:20px;">' + Shopping.FormatPrice(Main.Temp.Order.deliveryprice) + '</span>';
                c += '</td>';
              c += '</tr>';
               c += '</tbody>';
				 c += '</table>';
				 
			 }
			if( Main.Temp.Order.bpermission == "t") {
			   c +='<div class="field" style="margin-bottom:5px;">';
			   c +='<button type="button" class="btn-red" onclick="Main.Reorderalert('+Main.Temp.Order.id+')"><?=$lang_resource['TRACK_REORDER']?></button>';
			   c +='</div>';
			}
			
			
			
			
                c += ' <div class="field">';
                        
                           
                        c += '</div>';
                        
                 c += '</div>';
          		 c += ' </div>';
   				 c += '</div>';
				 c += '</div>';
				$('.orderBlock').remove();
				$("#top").append(c);
				
				if(document.getElementById("shoppingbox")) {
					document.getElementById("shoppingbox").innerHTML="";
					}
	
	
				
      
            }
            else
            {
		$(".odrstus").html("");
		$(".showOrdhide").hide();
                alert("<?= $lang_resource['NO_PERMISSION_V2'] ?>")
            }
        })
    },
closecurrentorder: function(){
	Visuals.AccountBlock();
	Visuals.MyOrders(false)
},	
OpenMyOrderOrder: function (a,fromInput)
    {
		
        Main.Loading(true);
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchOrderData","id":' + a + "}]", function (d)
        {
			
			
            if (b != Main.Aid)
            {
                return
            }
            Main.Ready(true);
            if (d != "" && d != '{"order":null}')
            {
				Popup.Close();
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
				if(!Main.Temp.Order.statusshow){
					alert("<?=$lang_resource['MOBILE_NO_PERMISSION_TO_SHOW_ORDER']?>")	
					return;
				}
				if(document.getElementById("consultorder")) {
				document.getElementById("consultorder").value = Main.Temp.Order.id;
				}
				
               
				var c ="";
				 var i=0;
				
				     c +='<div class="main">'
					 c +='<div class="header" style="height:84px">'
					 c +='<div class="header_pannel">';
					 
					 c +='<div class="wrapp">';
					 c +='<div class="pull_left"><button type="button" class="close-btn" onclick="Visuals.closecurrentorder()">X</button></div>';
					 c +='</div>';
					 c +='</div>';
					 c +='</div>';
					 c +='</div>';
			
			
			
			 c += '<div class="orderBlock">';
			 c += '<div class=" main grey login">';
			 
    		 c += '<div class="wrapp" >';
        	 c += '<h2 class="text_center heading" style="font-size:20px;"><?= $lang_resource['Order_V2'] ?> ' + Main.Temp.Order.id + " (" + Main.Temp.Order.status + ")</h2>";
			 
			 if(Main.Temp.PseudoCart.business[0].dishes != ""){
        	 c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_NAME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_EMAIL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.email) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_ADDRESS']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_TEL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.Order.comment) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text"  readonly class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_DRIVER_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + '"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_USER_COMMENTS']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '"></div>';
			 }
			
			 if(Main.Temp.PseudoCart.reservestatus){
        	 c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_NAME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.name) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_EMAIL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.email) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_TEL']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.tel) + '" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_DATE']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rdate) + '" readonly="readonly" readonly="readonly"></div>';
             c += '<div class="field"><input type="text" class="field-text" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_TIME']?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rhour) + ':'+ Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rmin) +'"></div>';
			 }
       		 c +='</div>';
			 
			 
		 
        	c +='<div class="grey">';
            c += '<div class="wrapp">';
             
			 
			if(Main.Temp.PseudoCart.business[0].dishes != ""){           
                        
                        c += '<table class="sh_order_tbl grey" border="0" width="100%" cellpadding="0" cellspacing="0">';
         	c += '<thead>';
            	c += '<tr>';
                	c += '<th colspan="3"><div class="category_name">' + Main.Temp.PseudoCart.business[i].name.toUpperCase() + '<br><span class="rest_add" style="font-size:14px; color:#666"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?> </span><span>'
					 if(Main.Temp.PseudoCart.business[i].paymethod.cash == true) {
			  c += '<?=$lang_resource['FRONT_CASH']?>';
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.card == true) {
			  c += '<?=$lang_resource['FRONT_CARD']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.braintree == true) {
			  c += '<?=$lang_resource['FRONT_BRAINTREE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorize == true) {
			  c += '<?=$lang_resource['FRONT_AUTHORIZE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.cardsave == true) {
			  c += '<?=$lang_resource['FRONT_CARDSAVE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypal == true) {
			  c += '<?=$lang_resource['FRONT_PAYPAL']?>';  
			  }  else if(Main.Temp.PseudoCart.business[i].paymethod.marco == true) {
			  c += '<?=$lang_resource['FRONT_MACRO']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypaladaptive == true) {
			  c += '<?=$lang_resource['FRONT_PAYPALADAPTIVE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorizednet == true) {
			  c += '<?=$lang_resource['FRONT_AUTHORIZEDOTNET']?>';  
			  }
					
					
					c += '</span></div>';
					c += '</th>';
                  
                c += '</tr>';
            c += '</thead>';
              c += '<tbody>';
			  for (j in Main.Temp.PseudoCart.business[i].dishes)
            {
				c += '<tr>';
                c += '<td><span class="label-2">' + Main.Temp.PseudoCart.business[i].dishes[j].name.toUpperCase() +"</span>";
				if(Main.Temp.PseudoCart.business[i].dishes[j].options)
				c += "<br><p style='float:left;clear:both'>"+ ProductOption.Margeslash(Main.Temp.PseudoCart.business[i].dishes[j].options) + '</p>';
				 
			
			
                	c += '<span><input type="text" class="field-comment" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>"  value="' + Main.NullToEmpty(Main.Temp.PseudoCart.business[i].dishes[j].comments) + '" readonly="readonly"></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].dishes[j].total) + '</span>';
                c += '</td>';
              c += '</tr>';
			}
			if (parseFloat(Main.Temp.PseudoCart.business[i].shipping) > 0)
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
            }
            else
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
            }
             
              c += '<tr>';
                c += '<td><span class="label-2">' + a + '</span>';
                	c += '<span><input type="text" class="field-comment" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '" READONLY></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].shipping) + '</span>';
                c += '</td>';
              c += '</tr>';
              c += '<tr>';
			  /*	discount section*/
			  if((Main.Temp.PseudoCart.discounttype > 0) && (Main.NullToEmpty(Main.Temp.PseudoCart.discountprice)!=''))
					{
						if(Main.Temp.PseudoCart.discounttype == 1)
						{
						var discaption = 'Discount ('+Main.Temp.PseudoCart.discountrate+'%)';
						}
						else
						{
						var discaption = 'Discount';
						}
			       c += '<tr>';
                c += '<td><span class="label-2">' + discaption + '</span>';
                	c += '<span><input type="text" class="field-comment" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.discountcomments) + '" READONLY></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + parseFloat(Main.Temp.PseudoCart.discountprice).toFixed(Main.IS_DECIMAL_POINT) + '</span>';
                c += '</td>';
              c += '</tr>';
              c += '<tr>';
	
					}
					/*	Tax section*/
					if(Main.Temp.PseudoCart.buyer.tax){
			if(Main.Temp.PseudoCart.buyer.taxtype == 2){
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED']?>";
			}else{
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED']?>";
			}	
					
                c += '<td><span class="label-2"><?= $lang_resource['REORDER_CONFIRM_TAX'] ?> ('+Main.Temp.PseudoCart.buyer.tax+' %)</span>';
                	c += '<span><input type="text" class="field-comment" value="'+taxstatus+'" readonly="readonly"></span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.tax) + '</span>';
                c += '</td>';
              c += '</tr>';
			   if(parseInt(Main.Temp.PseudoCart.buyer.tips)>0){
				
			   c += '<tr>';
              c += '<td><span class="label-2"><?= $lang_resource['TRACKORDER_TIPS'] ?></span>';
             
              c += '</td>';
              c += '<td valign="top" align="right">';
			  c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.buyer.tips) + '</span>';
              c += '</td>';
              c += '</tr>';
			  }
			   if(Main.Temp.PseudoCart.servicefeeTotal1){
			 c += '<tr>';
				
              c += '<td><span class="label-2"><?= $lang_resource['SERVICE_FEE_V2'] ?>('+Main.Temp.PseudoCart.servicefee+' %)</span>';
             
              c += '</td>';
              c += '<td valign="top" align="right">';
			  c += '<span class="category_name">' + Shopping.FormatPrice(Main.Temp.PseudoCart.servicefeeTotal1) + '</span>';
              c += '</td>';
              c += '</tr>';
			  }
              c += '<tr>';
                c += '<td><span class="total"><?= $lang_resource['Your_Total_V2'] ?> :</span>';
                c += '</td>';
                c += '<td valign="top" align="right">';
                	c += '<span class="category_name" style="font-size:20px;">' + Shopping.FormatPrice(Main.Temp.PseudoCart.total) + '</span>';
                c += '</td>';
              c += '</tr>';
					}
					
  				 c += '</tbody>';
				 c += '</table>';
				 
			}
			
			if(Main.Temp.PseudoCart.reservestatus){
			
			if(Main.NullToEmpty(Main.Temp.Order.tableprice) == ""){
			var tprice=0;
			}else{
			var tprice=Main.Temp.Order.tableprice;	
			}	
			if(Main.NullToEmpty(Main.Temp.Order.roomprice) == ""){
			var rprice=0;
			}else{
			var rprice=Main.Temp.Order.roomprice;	
			}
			if(Main.NullToEmpty(Main.Temp.Order.freeprice) == ""){
			var fprice=0;
			}else{
			var fprice=Main.Temp.Order.freeprice;	
			}
				
			c += '<div class="table-responsive" style="float:left">';
			c += '<table class="sh_order" border="0" width="100%" cellpadding="0" cellspacing="0"><tbody>';
			c += '<tr>'
			c +='<td align="center">Table</td><td align="center">Room</td><td align="center"><?=$lang_resource['MOBILE_FRONT_VISUALS_FREE']?></td><td align="center"><?=$lang_resource['MOBILE_FRONT_VISUALS_QUANTITY']?></td><td align="center"><?= $lang_resource['Price_V2'] ?></td></tr>';
			c +='<tr>'
			if(Main.Temp.PseudoCart.reserveQty.Table){
			c += '<td align="center" style="width:22%">'+Main.Temp.PseudoCart.reserveQty.Table+'</td></td>'
			}else{
			c += '<td align="center" style="width:22%"></td></td>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
			c += '<td align="center"style="width:22%">'+Main.Temp.PseudoCart.reserveQty.Room+'</td>'
			}else{
			c += '<td align="center" style="width:22%"></td></td>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
			c += '<td align="center" style="width:22%">'+Main.Temp.PseudoCart.reserveQty.Free+'</td>'
			}else{
			c += '<td align="center" style="width:22%"></td></td>'
			}
			c += '<td align="center" style="width:19%">'
			if(Main.Temp.PseudoCart.reserveQty.Table){
			if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)			
			c += '<span>Table  </span><span>'+Main.Temp.PseudoCart.reserveQty.Table.length+'</span><span>  X  </span><span>'+tprice+'</span><br>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
			if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
			c += '<span>Room  </span><span>'+Main.Temp.PseudoCart.reserveQty.Room.length+'</span><span>  X  </span><span>'+rprice+'</span><br>'
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
			if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
			c += '<span>Free  </span><span>'+Main.Temp.PseudoCart.reserveQty.Free.length+'</span><span>  X  </span><span>'+fprice+'</span><br>'	
			}
			c += '</td>'
			if(Main.Temp.PseudoCart.reserveQty.Table){
			var tableprice = Main.Temp.PseudoCart.reserveQty.Table.length * tprice ;
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
			var roomprice = Main.Temp.PseudoCart.reserveQty.Room.length * rprice ;
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
			var freeprice = Main.Temp.PseudoCart.reserveQty.Free.length * fprice ;
			}
			
			c += '<td align="center"  style="width:19%">'
			//if(tableprice != 0)
			if(Main.Temp.PseudoCart.reserveQty.Table){
			if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)
			c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
			}
			//if(roomprice != 0)
			if(Main.Temp.PseudoCart.reserveQty.Room){
			if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
			c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
			}
			//if(freeprice != 0)
			if(Main.Temp.PseudoCart.reserveQty.Free){
			if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
			c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
			}
			c +='</td>'
			c += "</tr>";
			c += '<tr>';
            c += '<td colspan="2">';
            c += '</td>';
			 c += '<td valign="top" align="center" colspan="2"><span class="total"><?= $lang_resource['Your_Total_V2'] ?> :';
			c += '</span></td>';
            c += '<td valign="top" align="center">';
			
            c += '<span class="category_name" style="font-size:20px;"><?= $lang_resource['Panel_Currency'] ?> ' + Shopping.FormatPriceNotFree(Main.Temp.PseudoCart.reserveFee) + '</span>';
            c += '</td>';
            c += '</tr>';
			 
			c += "</tbody></table>"
			c += "</td></tr>"	
			c +="</tbody></table>"
			c += "</div>"
			}
        
		if( Main.Temp.Order.bpermission == "t") {
			 c +='<div class="field" style="margin-bottom:5px;">';
			 c +='<button type="button" class="btn-red" onclick="Main.Reorderalert('+Main.Temp.Order.id+')"><?=$lang_resource['TRACK_REORDER']?></button>';
			 c +='</div>';
		}
			
			
			
                c += ' <div class="field">';
                        
                           
                        c += '</div>';
                        
                 c += '</div>';
          		 c += ' </div>';
   				 c += '</div>';
				 c += '</div>';
				$('.orderBlock').remove();
				$("#top").append(c);
				
				if(document.getElementById("shoppingbox")) {
					document.getElementById("shoppingbox").innerHTML="";
					}
	
	
				
      
            }
            else
            {
		$(".odrstus").html("");
		$(".showOrdhide").hide();
                alert("<?= $lang_resource['NO_PERMISSION_V2'] ?>")
            }
        })
    },
	
	CreateHelpButton: function () {
        return '<div class="helpbutton hand nonselectable" onclick="top.location.href=\'support.html\'"><span><?=$lang_resource['MOBILE_FRONT_VISUALS_HELP']?></span></div>'
    },
    CreateMobileButton: function () {
        return '<div class="mobilebutton hand nonselectable" onclick="top.location.href=\'mobile.php\'"><div class="icon"></div><span><?=$lang_resource['MOBILE_FRONT_VISUALS_MOBILE']?></span></div>'
    },
	BusinessReservation: function ()
    {
			
        Forms.Clean("businesslist", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "businesslist";

        var b = false;
            c = new Object();
            Forms.Form.businesslist.type = "create"
 
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?=$lang_resource['RESERVATION_NO_GUEST']?>"
        });
		
        for (i=1;i<=8;i++)
        {
            d.push(
            {
                id: i,
                caption: i
            })
        }
           
		MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChangeBusiness");
  			
        g = '[{"id":"","caption":"<?=$lang_resource['MOBILE_FRONT_VISUALS_SELECT_TYPE']?>"},{"id":"1","caption":"<?=$lang_resource['MOBILE_FRONT_VISUALS_DELIVERY']?>"},{"id":"2","caption":"<?=$lang_resource['MOBILE_FRONT_VISUALS_PICKUP']?>"},{"id":"3","caption":"<?=$lang_resource['MOBILE_FRONT_VISUALS_RESERVATION']?>"}]';
        g = JSON.parse(g);


				var htms = '<div class="popup_wrapper">'
				htms += '<div class="pop_header">'
				htms += '<div class="pop_heading"><h3><?=$lang_resource['RESERVATION_V21'] ?></h3>'
				htms += '</div>'
				htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
				htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
				htms += '</div>'
				htms += '</div>'
				
				
				htms +='<div class="reservpopBox wrapp">';
				htms +='<div class="field"><button type="button" class="field-select" onclick="WhereAmIBox.ShowHideOptionSearch()" style="margin-bottom:5px !important;"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>';
                
				Forms.CreateValue("businesslist", "resturants", '', false, false);
				Forms.CreateValue("businesslist", "cuisines", '', false, false);


				htms +='<ul class="filter-mob-dv tog3" style="display:none" >'
				htms +='<li><div class="multiinputbox pull_left"><input type="text" id="resturants" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_RESTAURANTS']?>" /></div></li>';
				htms +='<li><div class="multiinputbox pull_left"><input type="text" id="cuisines" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_CUISINES']?>"  /></div></li>';
				htms +='</ul>'
				<!--filter-dv-->	 
                 htms +='</div>';
				 
			htms +='<div class="field">';
       	 	htms +='<input type="text" class="field-text" value="'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'" id="rdate1" placeholder="<?=$lang_resource['MOBILE_FRONT_VISUALS_MMDDYY']?>" readonly="readonly"  required="required"/>'
            htms +='</div>';
			
			htms +='<div class="field">';
       	 	htms += Forms.CreateSelectWhereAmIBox("businesslist", "guest1", d, Main.WhereAmIData.guest, false,"", false);
            htms +='</div>';
			
		
	
			htms +='<div class="field tab-lets-go">';
                	 htms +='<button type="button" class="btn-red" style=" font-size:24px" onclick="Shopping.changeDelTypeNew(4)"><?=$lang_resource['MOBILE_FRONT_VISUALS_SEARCH']?></button>';
            htms +='</div>';

			htms +='</div>'
			htms +='</div>'
			htms +='</div>'
			htms +='</div>'
			htms +='</div>';
			
		 Popup.Show(911, 220, htms, null, function (){
          //  Main.Ga(Main.ActiveView)
        }, Main.PreDatepickerCall2)

		$("#guest1 option:selected").prop("selected", false);
		$("#guest1 option:first").prop("selected", "selected");
	},	
	
langChange: function(a){
	
  $.post("panel/lib/front-main.php", "f=langchangehistory&id="+a, function (f) {    
    location.reload();
	
  })
},
UserMenuSection: function(){
		var em ="";
		var ps ="";
		var chk="";
		if((document.cookie.indexOf('emailID')!= -1)&&(document.cookie.indexOf('passVAL')!= -1)){
			var em = getCookie("emailID");
			var ps = getCookie("passVAL");
			if (em != "" && ps != ""){
				chk='checked="checked"';
			}
		}
		var em1 = getCookie("emailID");
		var ps1 = getCookie("passVAL");		
		if(em1==null){   
			chk ='';
		}

    	var lgn = ''
    	lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<label><?= $lang_resource['Email_ID_V2'] ?></label>'
		lgn +='<input type="text" class="form-control" id="loginemail" value="'+Main.NullToEmpty(em)+'">'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-12-->
		lgn +='</div>'<!--row-->
		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<label><?= $lang_resource['Password_V2'] ?></label>'
		lgn +='<input type="password" class="form-control" value="'+Main.NullToEmpty(ps)+'" id="loginpassword" onkeyup="Main.LoginPwdType(event)">'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-12-->
		lgn +='</div>'<!--row-->
		lgn +='<div class="checkbox remember_me">' 
		lgn +='<input type="checkbox" '+chk+' id="checkremember2">' 
		lgn +='<label for="checkremember2"><?=$lang_resource['MOBILE_MYACCOUNT_REMEMBER_ME'];?></label>'
		lgn +='</div>'

		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<button type="button" class="red_btn_small" onclick="Main.Login()"><?= $lang_resource['LOGIN_BUTTON_LOGIN'] ?></button>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->            
		lgn +='</div>'<!--row-->

		lgn +='<div class="row">'
		lgn +='<div class="col-md-6">'
		lgn +='<div class="form-group">'
		lgn +='<a href="javascript:Visuals.RecoverForm(true)" class="login_link_btn" ><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></a>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->
		lgn +='<div class="col-md-6">'
		lgn +='<div class="form-group text-right">'
		lgn +='<a href="javascript:Main.CommonAccount()" class="login_link_btn"><?= $lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] ?></a>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->
		lgn +='</div>'<!--row-->

		return lgn
    },
    LoginBoottomSection: function(){
    	var lgn = ''
    	lgn +='<div class="or_dv" id="elseces">Or</div>'<!--or_dv-->
		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<button type="button" class="login_with_fb" onclick="Facebook.Login()"><?= $lang_resource['LOGIN_WITH_FACEBOOK'] ?></button>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->            
		lgn +='</div>'<!--row-->
		lgn +='</div>'<!--modal-body-->

		lgn +='</div>'
		lgn +='</div>'
		return lgn
    },


};
