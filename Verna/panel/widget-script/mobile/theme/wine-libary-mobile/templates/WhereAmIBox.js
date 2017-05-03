var WhereAmIBox = {
     WhereAmI: function (c)
    {
		
        Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
		
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
		 var a = '';
       // var a = '<div class="titlebox nonselectable">';
        // a += '<span class="title">&gt;&gt; <?= $lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I'] ?></span>';
      
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
        for (i in Main.Countries)
        {
            d.push(
            {
                id: Main.Countries[i].id,
                caption: Main.Countries[i].name
            })
        }

	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		
		Forms.CreateValue("whereami", "country", Main.settingfront.default_country);
		Forms.CreateValue("whereami", "city", Main.settingfront.default_city);
		Forms.CreateValue("whereami", "sriptvalue", "<?=$script_id?>");
		
		
        var htms ='';
        /*************************************************** Only WhereAMI Bo***********************************************/
        htms += Forms.CreateTextAreaPropertyNewWineMob("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true);
		htms +='<div class="home_search_btns_dv">'
        htms +='<button type="button" class="geo_btn" onclick="Main.GetUserLocation()"><img src="panel/images/winemobilebanner/add-icon.png"></button>'
        htms +='<button type="button" class="home_search_btn" onclick="MainCustom.SaveWhereAmI()">VAI</button>'
        htms +='</div>'<!--home_search_btns_dv-->    
        //htms += '<button type="button" class="geo_btn_front"  onclick="Main.GetUserLocation()"><img src="<?=$module_image_link?>/images/add-icon.png" alt=""></button>';       
         //htms += "<button type='button' class='letsgo_btn' onclick='MainCustom.SaveWhereAmI()'><?= $lang_resource["BODY_ORDER_LETS_GO"] ?></button>"; 
         htms += '<div id="map_canvas" style="display:none"></div>';    



        var ABN = '';		
        ABN += '<div id="mapbox" class="mediummapbox" ></div>';
		
		if (b) {
            Popup.EnableSubmitButton(true)
        } else {
            Popup.EnableSubmitButton(false)
        }
		
		document.getElementById("mid_lft").innerHTML = htms;
		document.getElementById("map_canvas").innerHTML = ABN;
		var popupSize = 685;
		
		Main.PreWhereAmI();
		$('#address').keypress(function (e) {
					
					 var key = e.which;
					 if(key == 13)  // the enter key code
					  {
						MainCustom.SaveWhereAmI();
					  }
				});
		if(IS_PAYPAL_ENABLED == 1)
			popupSize == 590;
        
        if (b)
        {
            Forms.Form.whereami.fields.city.save = true;
            if(IS_PAYPAL_ENABLED != 1)
				Forms.Form.whereami.fields.address.save = true;
				Forms.Form.whereami.fields.location.save = true;
           
        }
    },
  
};
