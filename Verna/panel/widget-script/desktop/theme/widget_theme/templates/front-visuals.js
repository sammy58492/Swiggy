var Visuals = {
    CreateWhereAmIButton: function (a, c, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
		
        return "<div " + b + 'class="whereamibutton nonselectable"><div class="titlebox default"><span class="title"><?= $lang_resource['BODY_ORDER_FOOD_TITLE'] ?></span></div><div class="innerbox hand" onclick="' + c + '"><div class="captionbox"><span class="caption">' + a + "</span></div></div></div>"
    },
    
   
	CreateWhrYouButton: function (a, c, b) {
        IS_SCRIPTID = 5
				
		//alert(JSON.stringify(Main.WidgetSettings));
		var mm = JSON.stringify(Main.WidgetSettings);
		var ee = JSON.parse(mm);	
	
		Main.adstle = '';
		
		
		document.getElementsByTagName("body")[0].style.backgroundColor = ee.site_settings.background_color;
		document.getElementsByTagName("body")[0].style.fontSize = ee.site_settings.font_size;
		document.getElementsByTagName("body")[0].style.color = ee.site_settings.font_color;
		
		if(Main.WidgetSettings) {
	    	 Main.adstle =ee.site_settings.font_color;
			}
		
		
		
		//$(".form-control").css("color","red");
		
		//$('.simpleClass').css({display:'none'});
		//$("button").css("background","black");
		
		/*var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.cssClass { background-color: #000 !important; }';*/
		//document.getElementsByTagName('button').className = 'cssClass';
		//$("button").addClass("cssClass");
//document.getElementById('someElementId').className = 'cssClass';
		
		//document.getElementsByTagName('button').style.backgroundColor=ee.site_settings.background_color;
		
		
		var htms = '<div class="container">'
		htms +='<div class="wrapper" id="mid_lft">'


		htms += '</div>';
		htms += '</div>';
		
		return htms;	
    },

	//request collection start
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
page +='<div class="Request_Collection_wra">';
   		page +='<div class="main">';
        	page +='<h4><?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'] ?></h4>';
        	page +='<div class="Req_Col_in">';
            	
                
                <!--Req_Col_left-->
                page +='<div class="Req_Col_left">';
                	page +='<div class="Req_Col_left_hd"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_DETAILS'] ?></div> ';                   
                    page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] ?> <span>*</span></label><span class="cami">:</span><input  id="customer_name" name="customer_name" autocomplete="off" type="text"  onkeyup="Main.requestCollctionUpdate(this,\'customer_name\')"></div> ';
                    page +='<div class="Customer_Add"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] ?> <span>*</span></div>';
                    page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE1'] ?></label><span class="cami">:</span><input id="customer_address1" name="customer_address1" type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'customer_address1\')"></div>';
                    page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE2'] ?></label><span class="cami">:</span><input id="customer_address2" name="customer_address2"  type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'customer_address2\')"></div>';
                    page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_TOWN'] ?></label><span class="cami">:</span><input id="customer_town" name="customer_town" type="text" autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'customer_town\')"></div>';
                    page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></label><span class="cami">:</span><input id="customer_postcode" name="customer_postcode" type="text" autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'customer_postcode\')"></div>';
                    page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] ?> <span>*</span></label><span class="cami">:</span><input id="customer_contactno" name="customer_contactno" autocomplete="off" type="text" onkeyup="Main.requestCollctionUpdate(this,\'customer_contactno\')" ></div>';
                 
               page +=' </div>';
                <!--Req_Col_left end-->
                
                
                <!--Req_Col_left-->
                page +='<div class="Req_Col_left Req_Col_right">';
                	page +='<div class="Req_Col_left_hd"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_DETAILS'] ?></div> ';                   
                   page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] ?>  <span>*</span></label><span class="cami">:</span><input  name="resturent_name" id="resturent_name" type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'resturent_name\')"></div> ';
                 
                   page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?> <span>*</span></label><span class="cami">:</span><input name="resturent_postcode" id="resturent_postcode" autocomplete="off" type="text"   onkeyup="Main.requestCollctionUpdate(this,\'resturent_postcode\')"></div>';
                   page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] ?>  <span>*</span> </label><span class="cami">:</span><input name="resturent_collection_time" id="resturent_collection_time" autocomplete="off" type="text"   onchange="Main.requestCollctionUpdate(this,\'resturent_collection_time\')"></div>';
				        page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] ?> </label><span class="cami">:</span><input name="resturent_other_value" id="resturent_other_value"  type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'resturent_other_value\')"></div>';
						     page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] ?> </label><span class="cami">:</span><input name="resturent_other_reference" id="resturent_other_reference"  type="text"  autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'resturent_other_reference\')"></div>';
					   page +='<div class="Req_Col_row"><label class="note"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'] ?></label><span class="cami2">:</span><textarea name="customer_note" id="customer_note" cols="" rows="" autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'customer_note\')" ></textarea></div>';		 
                page +='</div>';
                <!--Req_Col_left end-->
                
                page +='<div class="clearfix"></div>';
				
				page +='<div class="confirm_row">';
                page +='<input type="checkbox" id="requestClooectioncheckremember" class="checkbox_2">';
              page +='  <label for="requestClooectioncheckremember"><span class="confirm"><?= $lang_resource['REQUEST_COLLECTION_CONDITION_CHK'] ?> </span></label>';
                page +='</div>';
                
                
                
                
              page +='  <div class="btn_Col_row"><button type="button" id="" class="Request_btn"  onclick="Main.placeRequestCollection();"><?= $lang_resource['REQUEST_COLLECTION'] ?> </button></div>';
                
                
                
           page +=' </div>';
      page +=' </div>';
   page +=' </div>';
   
   return page;
   },
   //request collection end
	CheckSelect1: function(){
		
		if ($("#checkbox1").is(':checked')) {
			Main.deliveryAccept = 1;
        	$("#checkbox2").prop('checked',false);
       
 		 }
	},
	
	CheckSelect2: function(){
		 if ($("#checkbox2").is(':checked')) {
			 Main.deliveryAccept = 2;
        	$("#checkbox1").prop('checked',false);
       
 		 }
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
	CreateBigTagInputTextbox: function (d, b, a, c) {
        return '<div class="biginputbox" style="width:' + a + "px;" + c + '"><div class="biginnerbox">' + d +'<button type="button" class="geo_btn" style="background-color:#dcdcdc; height:44px !important; position: absolute;right: 0;border: 0;"  onclick="Main.GetUserLocation1()"><img src="images/homeimage/add-icon.png"></button><div class="tag ' + b + '"></div></div></div>'
    },
	CreateBigTagInputTextboxCitySearch: function (d, b, a, c) {
        return '<div class="biginputbox" style="width:' + a + "px;" + c + '"><div class="biginnerbox">' + d +'<button type="button" class="geo_btn" style="background-color:#dcdcdc; height:44px !important; position: absolute;right: 0;border: 0;"  onclick="Main.GetUserLocationFromCitySearch()"><img src="images/homeimage/add-icon.png"></button><div class="tag ' + b + '"></div></div></div>'
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
		lgn += '<div class="pop_mid" style="height:481px;">';
		lgn += '<p><?= $lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN'] ?></p>';
		lgn += '<div class="sprt_line"></div>';
		lgn += '<div class="loginbox" id="loginbox">';
		lgn += '<div class="innerbox"><div class="ubox"><div id="usermenu"></div></div></div></div>';
		lgn += '<br clear="all" />';
		lgn += '<div class="loginbottom" id="loginbottom"></div>';
		lgn += '</div>';
		lgn += '</div>';
		lgn += '</div>';
		
		return lgn;
    },
    CreateSocialButtons: function () {
        var a = "";
      
        document.getElementById("socialbtns").innerHTML = Visuals.CreateMobileButton() + Visuals.CreateHelpButton() + a
    },
    CreateHelpButton: function () {
        return '<div class="helpbutton hand nonselectable" onclick="top.location.href=\'support.html\'"><span><?= $lang_resource['FRONT_VISUALS_HELP'] ?></span></div>'
    },
    CreateMobileButton: function () {
        return '<div class="mobilebutton hand nonselectable" onclick="top.location.href=\'mobile.php\'"><div class="icon"></div><span><?= $lang_resource['LOGIN_CREATE_MOBILE'] ?></span></div>'
    },
	
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
    	htm +='<button type="button" id="pop_submit_btn" class="pop_submit_btn" onclick="Main.ChooseTypeRegister();" style="width:362px;margin-top:20px;"><?=$lang_resource['MAP_NEXT']?></button>';
    htm +='</center>';
    
htm +='</div>';

htm +='</div>';
		
		
		 Popup.Show(700, 660, htm, null);
		
	},
	
	EditRegister: function(b){

		if (b){
			var FF = new Array();
			FF.push({
				id: "",
				caption: "<?= $lang_resource['CITY_V2'] ?>"
			});
			Forms.Form.user.type = "modify"
			Forms.Form.user.city = b.city;
			//Main.PopulateCitySelectRegister(b.country, b.city)

			for (i in Main.Franchises)		{
				FF.push({
					id: Main.Franchises[i].id,
					caption: Main.Franchises[i].city
				})
			}
		}else{
			b = new Object();
			Forms.Form.user.type = "create";
			Forms.CreateValue("user", "config", "{}", false, false, true)

			var FF = new Array();
			FF.push({
				id: "",
				caption: "<?= $lang_resource['CITY_V2'] ?> *"
			});
		}
		/* Choose country */
		var d = new Array();
		d.push({
			id: "",
			caption: "<?= $lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY']?> *"
		});
		for (i in Main.Countries){
			d.push({
				id: Main.Countries[i].id,
				caption: Main.Countries[i].name
			})
		}
		var FF1 = new Array();
		FF1.push({
			id: "",
			caption: "<?= $lang_resource['Neighbourhood_V2'] ?> "
		});
		/* Choose country */


		var a= '<div class="popup_wrapper">';
		a += '<div class="pop_header">';
		if (Forms.Form.user.type == "create"){
			a += '<span class="pop_heading"><h3><?= $lang_resource['LOGIN_CREATE_TITLE'] ?></h3></span>'
		}else{
			Forms.CreateValue("user", "level", b.level, false, false)
			a += '<span class="pop_heading"><h3> <?= $lang_resource['LOGIN_EDIT_TITLE'] ?></h3></span>'
		}
		
		a += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
		a += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
		a += '</div>';
		if (Forms.Form.user.type == "create"){
			a += '<div class="locatme"><button type="button" class="track_order_btn loctm" onclick="GoogleMap.locateme()" ><img src="images/common/locate-icon.png" class="locate_img" ><?= $lang_resource['LOCATE_ME'] ?></button></div>';
		}

		a += "</div>";

		a += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
		a += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="UseregClass">';
		a += '<tr>';
		a += '<td>'
		/*a +='<form id="uform" enctype="multipart/form-data" method="post" action="panel/upload.php">';
		var c = "";
		if (b.id){
			c = "background-image:url('panel/images/users/" + Main.NullToEmpty(b.id) + "/small.jpg?c=" + new Date().getTime() + "'); "
		}
		a += '<input type="file" name="file[]" style="' + c + '" />'*/
		
		var c = "";		
		if (b.id){
			c = "panel/images/users/" + Main.NullToEmpty(b.id) + "/small.jpg?c=" + new Date().getTime()
		}else{
			c = "panel/images/users/front-dummy.jpg"
		}
		a +='<div class="user-img">'        
        a += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >';
        
    	a += '<input id="uploadImage" type="file"  style="margin: 5px 0px 0px 0px;" class="user_pic"  name="uploadImage" onChange="Visuals.PreviewImage();" >'	
    	
	    a += '<input id="showImage" name="showImage" type="hidden" value=""  />';
		a += '<input type="submit" name="submit" onclick="Visuals.triggerImageupload()" style="display:none" />';
		a += '</form>';
        a +='<img id="uploadPreview" src="' + c + '"  >'
        a +='</div>'
		
		
		a +='</td>';
		a += '<td><div id="mapboxuser" class="smallmapbox"></div></td>';
		a += '</tr>';
		a += '</table>';
		a += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="catbl">';
		a += '<tr>';
		a += '<td>' + Forms.CreateInputPropertyPopUp("user", "name", Main.NullToEmpty(b.name), true,'',"<?= $lang_resource['FRONT_VISUALS_NAME'] ?> *") + "</td>";
		a += '<td>' + Forms.CreateInputPropertyPopUp("user", "lastname", Main.NullToEmpty(b.lastname), false,'',"<?= $lang_resource['FRONT_VISUALS_MIDDLE_NAME'] ?>") + "</td>";
		a += '</tr>';
		a += '<tr>';
		a += '<td>' + Forms.CreateInputPropertyPopUp("user", "lastname2", Main.NullToEmpty(b.lastname2), true,'',"<?= $lang_resource['FRONT_VISUALS_LAST_NAME'] ?> *") + "</td>";
		a += '<td>' + Forms.CreateInputPropertyPopUp("user", "email", Main.NullToEmpty(b.email), true,'',"<?= $lang_resource['FRONT_VISUALS_EMAIL'] ?> *") + "</td>";
		a += '</tr>';
		a += '<tr>';
		if (Forms.Form.user.type == "modify"){
			a += '<td>' + Forms.CreateInputPropertyPopUp("user", "pwd", Main.NullToEmpty(b.pwd), false, "", "<?= $lang_resource['FRONT_VISUALS_PASSWORD'] ?>", true) + "</td>";
		} else {
			a += '<td>' + Forms.CreateInputPropertyPopUp("user", "pwd", Main.NullToEmpty(b.pwd), true,"", "<?= $lang_resource['FRONT_VISUALS_PASSWORD_M'] ?>", true) + "</td>";	
		}
		a += '<td>' + Forms.CreateInputPropertyPopUp("user", "street", b.street, true, "GoogleMap.UpdateUserPosition(this)","<?= $lang_resource['FRONT_VISUALS_STREET'] ?>") + "</td>";
		a += '</tr>';

		a += '<tr>';
		/*a += '<td>' + Forms.CreateInputPropertyPopUp("user", "colony", b.colony, false, "GoogleMap.UpdateUserPosition(this)","<?= $lang_resource['FRONT_VISUALS_COLONY'] ?> *") + "</td>";*/
		if(Main.neighsettings == 't'){
			a += '<td>' + Forms.CreateSelectPropertyNPopup("user", "colony", FF1, Main.NullToEmpty(b.colony), false, "GoogleMap.UpdateUserPosition(this)",true,"colony") + "</td>";
		}else{
			a += '<td>' + Forms.CreateInputPropertyPopUp("user", "colony", b.colony, false, "GoogleMap.UpdateUserPosition(this)","<?= $lang_resource['Neighbourhood_V2'] ?> ") + "</td>";	
		}

		if(Main.fetchenterprise == 0){
			a += '<td>' + Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false, "GoogleMap.UpdateUserPosition(this)","<?= $lang_resource['FRONT_VISUALS_POST_CODE'] ?>") + "</td>";
			a += '<tr>';
			a += '</tr>';
			a += '<td>' +Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)") + "</td>"; 
			if(Main.neighsettings == 't'){
			a += '<td>' + Forms.CreateSelectPropertyCPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect2(null,null,1);",true,"cityregister") + "</td>";
			}else{
			a += '<td>' + Forms.CreateSelectPropertyCPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "GoogleMap.UpdateUserPosition(this);",true,"cityregister") + "</td>";	
			}
			a += '</tr>';
		}else{
			a += '<td>' +Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)") + "</td>";
			a += '<tr>';
			a += '</tr>';
			a += '<td>' + Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false, "GoogleMap.UpdateUserPositionzipcode(this)","<?= $lang_resource['FRONT_VISUALS_POST_CODE'] ?>") + "</td>";
			if(Main.neighsettings == 't'){
			a += '<td>' + Forms.CreateInputPropertyPopUpreadonly("user", "cityregister", Main.NullToEmpty(b.cityname),false,'',"<?=$lang_resource['FRONT_VISUALS_CITY_WITH_ZIPCODE']?>") + "</td>";
			}else{
			a += '<td>' + Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false,'',"<?=$lang_resource['FRONT_VISUALS_CITY_WITH_ZIPCODE']?>") + "</td>";	
			}
			a += '</tr>';
		}

		a += '<tr>';
		a += '<td>' +Forms.CreateInputPropertyPopUp("user", "tel", b.tel, false,'',"<?= $lang_resource['FRONT_VISUALS_LAND_PHONE'] ?>") + "</td>";
		a += '<td>' + Forms.CreateInputPropertyPopUp("user", "cel", b.cel, false,'',"<?= $lang_resource['FRONT_VISUALS_MOBILE_PHONE'] ?>") + "</td>";
		a += '</tr>';

		a += '<tr>';
		a += '<td>' +Forms.CreateInputPropertyPopUp("user", "api", b.api, false,'',"<?= $lang_resource['FRONT_VISUALS_MOBILE_APT'] ?>") + "</td>";
		a += '<td></td>';
		a += '</tr>';

		a += '<tr>';
		if (Forms.Form.user.type == "modify"){
			a += '<td colspan="2" align="center"><button type="button" id="pop_submit_btn" class="pop_submit_btn" onclick="Main.PreUserForm()" style="width:362px;margin-top:20px;"><?= $lang_resource['REGISTER_FORM_UPDATE_BUTTON'] ?></button></td>';
		} else  {
			a += '<td colspan="2" align="center"><button type="button" id="pop_submit_btn" class="pop_submit_btn" onclick="Main.PreUserForm()" style="width:362px;margin-top:20px;"><?= $lang_resource['REGISTER_FORM_CREATE_BUTTON'] ?></button></td>';	
		}
		a += '</tr>';
		a += '</table>';



		Popup.Show(700, 660, a, null, function ()
		{
		Main.Ga(Main.ActiveView)
		}, Main.PreUserForm)
	
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
    
    a +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl" >';
	  a +='<tr >';
       
       a +='<td colspan="3">We have sent you an activation sms to '+celno+'. Please just click on the link provided in sms if you have internet connectivity in your mobile or alternatively copy the code manually in below field</td>';
        
      a +='</tr>';
      a +='<tr>';
        a +='<td align="right" width="10%"><span class="pop_label" style="width: 100px;"><?= $lang_resource['ACTIVATE_CODE'] ?></span></td>';
       a +='<td width="48%">' + Forms.CreateInputPropertyPopUp("sms", "smscode", "", true) + "</td>";
        a +='<td><button type="button" class="pop_submit_btn" style="width:160px;" onclick="Main.smsActive()"><?= $lang_resource['FRONT_MY_SUBMIT'] ?></button></td>';
      a +='</tr>';
    a +='</table>';

a +='</div>';
		
		
       // Main.Ga("/profile/recoverpwd");
        Popup.ShowFP(640, 400, a, function ()
        {
           
        }, function ()
        {
            Forms.Clean("sms");
            Main.Ga(Main.ActiveView)
        })
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
        

		
		
       var   a = '<div class="wrapper">';
        a += '<div class="option_popup_header"><h3><?=$lang_resource['Delivery_Option']?></div>';
		a += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button></div>';
       
		
		
		a += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 0px">';
      
  
		
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

	    a += '<tr>';
        a += '<td align="" colspan="2"><div class="biginnerbox" style="margin: 10px;">' +  Forms.CreateSelectPropertyPopup("recover13", "deliveryoption", qs, "", true) + '</div></td>';
        a += '</tr>';
		a += '<tr>';
        a += '<td align="" colspan="2">&nbsp;</td>';
        a += '</tr>';
		  a += '<tr>';
        a += '<td align="center" colspan="2"><button type="button" class="pop_submit_btn" style="width:250px; margin: 10px;" onclick="Main.DeliveryAction()"><?= $lang_resource['CONTINUE'] ?></button></td>';
        a += '</tr>';

        a += "</table>";
      
	  
       Main.Ga("/profile/recoverpwd");
        Popup.Show(440, 240, a, function ()
        {
			
        }, function ()
        {
            Forms.Clean("recover13");
            Main.Ga(Main.ActiveView)
        })
},
	RecoverForm: function(){
		$(".popdiv_pop").hide();
		Forms.Clean("recover", "popupmainbuttonok");
   
		
		var a = '<div class="popup_wrapper">';
	   a += '<div class="pop_header">';
      	a +='<div class="pop_heading">';
	    	a +='<h3><?= $lang_resource['RECOVER_PASS_TITLE'] ?></h3>';
        a +='</div>';<!--pop_heading-->
        a +='<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	a +='<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
        a +='</div>';<!--pull_right-->
    a +='</div>';<!--pop_header-->
    
    a +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl" >';
      a +='<tr>';
        a +='<td align="right" width="10%"><span class="pop_label" style="width: 100px;"><?= $lang_resource['RECOVER_PASS_EMAIL'] ?></span></td>';
       a +='<td width="48%">' + Forms.CreateInputPropertyPopUp("recover", "email", "", true) + "</td>";
        a +='<td><button type="button" class="pop_submit_btn" style="width:160px;" onclick="Main.RecocerPassSend()"><?= $lang_resource['FRONT_MY_SUBMIT'] ?></button></td>';
      a +='</tr>';
    a +='</table>';

a +='</div>';
		
		
        Main.Ga("/profile/recoverpwd");
        Popup.ShowFP(640, 400, a, function ()
        {
           
        }, function ()
        {
            Forms.Clean("recover");
            Main.Ga(Main.ActiveView)
        })
	},
SearchDelivery: function(){
			
		var b = false;
		var m = JSON.stringify(Main.WidgetSettings);
		var e11 = JSON.parse(m);
		
		var delivery_tab = e11.tab_settings.tab_delivery;
		var pickup_tab = e11.tab_settings.tab_pickup;
		var tab_reservation = e11.tab_settings.tab_reservation;
		
		var country_display = e11.location_settings.country_display;
		var city_display = e11.location_settings.city_display;
		var optional_display = e11.location_settings.optional_display;
		var geolocation_display = e11.location_settings.geolocation_display;		
		var neighborhood = e11.location_settings.neighborhood;
		Main.neighborhood = e11.location_settings.neighborhood;
		var default_country = e11.default_settings.default_country;
		var default_city = e11.default_settings.default_city;
		var default_address_zipcode = e11.default_settings.default_address_zipcode;
		var default_neighbourhood = e11.default_settings.default_neighbourhood;
		var default_business = e11.default_settings.default_business;
		var default_category = e11.default_settings.default_category;
		
		var background_color = e11.site_settings.background_color;
		var font_size = e11.site_settings.font_size;
		var font_color = e11.site_settings.font_color;
		var popup_color = e11.site_settings.popup_color;
		var width = e11.site_settings.width;
		var widget_name = e11.site_settings.widget_name;
		
		var skip_homepage = e11.site_settings.skip_homepage;
		var skip_business_listing = e11.site_settings.skip_business_listing;
		var footer_text = e11.site_settings.footer_text;
		var button_color = e11.site_settings.button_color;
		var mobile_responsive = e11.site_settings.mobile_responsive;
		var button_Text = e11.site_settings.button_Text;	
			 
       if(Main.customwhereami){
		var c= Main.customwhereami
		if(c.country)
		Main.PopulateCitySelect(c.country,c.city)	
		}
		else{
			c=new Array();	
		}
       
		 var a = '';
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
			
			//alert(Main.Countries[i].id)			
		
				if($.inArray( Main.Countries[i].id, countrytag ) != -1 || $.inArray( '-1', countrytag ) != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
		 
	if(default_address_zipcode){
		
	c.address = default_address_zipcode;	
	}

	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		
		var co_f='';
		var ci_f='';
		var add_f='';
		var add_f1='';
		var of_f='';
		
		
		var counter = 0;
		var cc ='';
		var cic ='';
		
		var re_f='';
		//alert(JSON.stringify(Main.settingfront))
		
		if(default_country !=-1 && default_city !=-1){
			
			c.country = default_country;
			cc = default_country;
			cic =default_city;
			Main.PopulateCitySelect(default_country,default_city);		 
		}else{		
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		}
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){  
			b = JSON.parse(b); 
			var a = new Object();
			a.id = "country";
			a.value = b.countryname;
			GoogleMap.UpdateUserPosition(a);
			c.city = default_city;
			cic = default_city;
			if(b !=""){
				
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
			}			
		});
		
		
		
		if(country_display == 't'){			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			
			if(countrytag.length == 1 && $.inArray( '-1', countrytag ) == -1){
				
				
				
				cc = countrytag[0];
				
				Main.PopulateCitySelect(cc);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				   
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
			//console.log(citytag.indexOf('-1'))
			
			if(citytag.length == 1 && $.inArray( '-1', citytag ) == -1 ){ 
				
				cic = citytag[0];
			
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			if(Main.User){
					
					var a = new Object();
					a.id = "address";
					a.value = Main.User.street;
					GoogleMap.UpdateUserPosition(a);
				}
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && $.inArray( '-1', restaurant ) == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
			
		}
		
		
		if(country_display == 'f'){
				
			//cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}
		
		if(city_display == 'f'){
			
			cic = default_city; 
		
			ci_f +='style="display:none;"'
			counter ++;
		}
		
		
		
		if(geolocation_display == 'f'){ 
			add_f +='style="display:none;"'
		
		}
		if(neighborhood == 'f'){ 
			add_f1 +='style="display:none;"'
			
		}
		if((geolocation_display == 'f') && (neighborhood == 'f')){ 
		counter ++;
		}
		
		if(delivery_tab == 'f'){
			of_f +='style="display:none;"'
			counter ++;
		}
		
		var co_s ='';
		var ci_s ='';
		var add_s ='';
		var of_s ='';
		
		if(counter == 1){


			var co_s ='';
			var ci_s ='';
			var add_s ='';
			var of_s ='background-position: 210px 17px !important;';	
		}
		if(counter == 2){
			var co_s ='width:375px !important;';
			var ci_s ='width:375px !important;';
			var add_s ='width:375px !important;';
			var of_s ='width:375px !important; background-position: 340px 17px !important;';	
		}
		if(counter == 3){
			var co_s ='width:750px !important;';
			var ci_s ='width:750px !important;';
			var add_s ='width:750px !important;';
			var of_s ='width:750px !important; background-position: 710px 17px !important;';	
		}
		
			
		   MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		   var htms  = '';
		   //var htms  = '<div class="SearchDelivery">';
		  			htms += '<input type="radio" id="deliveryType" style="display:none;" value="1" checked="checked" name="deliveryType" >'
					if(counter != 0){	
					
						
                	htms += '<div class="row" '+co_f+'>'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms +=Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand",co_s);
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="row" '+ci_f+'>'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand", ci_s);
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
                   
                    htms += '<div id="locationField" class="giol" '+add_f+'>'+ Forms.CreateTextAreaPropertyNew331("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx",add_s) +'</div>';
					var cit1 = new Array();
					   cit1.push(
        {
            id: "",
            caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
        });
					   	 htms += '<div class="giol" '+add_f1+'>'+ Forms.CreateSelectPropertyNew34("whereami", "address", cit1,c.address, true, "GoogleMap.UpdateUserPosition(this);Main.neibhourUpdate(this)", true, "hm_txtbx",add_s) +'</div>';
					
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="row" '+of_f+'>'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<button type="button" style="'+Main.adstle+'" onclick="WhereAmIBox.ShowHideOptionSearch()" style="'+of_s+'" class="btn btn-yellow"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="filter-dv" style="margin-left: 545px !important;display:none;">' 
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					Forms.CreateValue("whereami", "cuisines", '', false, false);
					htms += '<input type="text" class="form-control" id="cuisines" placeholder="Cuisine" />'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<span class="arr"></span>'
					Forms.CreateValue("whereami", "resturants", '', false, false);
					htms += '<input type="text" id="resturants" class="form-control" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" />'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					
					/*htms += '<div class="filter-dv" style="margin-left: 545px !important;display:none;">'
					htms += '<span class="arr"></span>'
					Forms.CreateValue("whereami", "resturants", '', false, false);
					htms += '<div class="multiinputbox pull_left" style="margin:6px 0px 0px 3px; '+re_f+'"><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
					Forms.CreateValue("whereami", "cuisines", '', false, false);
					htms += '<div class=" pull_left" style="margin:6px 0px 0px 3px"><input type="text" id="cuisines" placeholder="cuisines" /></div>'
					htms += '<div class=" pull_left" style="margin:6px 0px 0px 3px">'+Forms.CreateTextAreaPropertyNew3("whereami", "address", c.address, false, "", false)+'</div>'
					htms += '<div class=" pull_left" style="margin:6px 0px 8px 3px"><button type="button" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
					htms += '</div>'*/
				
					}else{
						
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms +=Forms.CreateSelectPropertyNew3("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand",co_s);
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand", ci_s);
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'	
					
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'	
                	
                    htms += '<div class="giol" '+add_f+' >'+ Forms.CreateTextAreaPropertyNew331("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true, "hm_txtbx",add_s) +'</div>';
					var cit1 = new Array();
					   cit1.push(
        {
            id: "",
            caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
        });
					 htms += '<div class="giol" '+add_f1+'>'+ Forms.CreateSelectPropertyNew34("whereami", "address",cit1, c.address, false, "GoogleMap.UpdateUserPosition(this);Main.neibhourUpdate(this)", true, "hm_txtbx",add_s) +'</div>';
					
					htms += '</div>'
					htms += '</div>'
					htms += '</div>' 
					 
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<button type="button" style="'+Main.adstle+'" onclick="WhereAmIBox.ShowHideOptionSearch()" class="btn btn-yellow"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="filter-dv" style="top:85px;display:none;">' 
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					Forms.CreateValue("whereami", "cuisines", '', false, false);
					htms += '<input type="text" class="form-control" id="cuisines" placeholder="Cuisine" />'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<span class="arr"></span>'
					Forms.CreateValue("whereami", "resturants", '', false, false);
					htms += '<input type="text" id="resturants" class="form-control" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" />'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					
					

					}
					
					
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<button type="button" class="btn btn-red" onclick="Main.SaveWhereAmI()">Find Restaurant</button>'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'

                
          
		
		  return htms;
		  
		  
		  
		  if(country_display == 'f'){
				
			Main.PopulateCitySelect(default_country);
			
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
				
			GoogleMap.UpdateUserPosition(a);
			
		}
		
		if(city_display == 'f'){
			
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			
			GoogleMap.UpdateUserPosition(a);
			
		}
		if(Main.User){
					
					var a = new Object();
					a.id = "address";
					a.value = Main.User.street;
					GoogleMap.UpdateUserPosition(a);
				}
	
	},
	SearchPickup: function(){
//alert('dfhdf');		
		var m = JSON.stringify(Main.WidgetSettings);
				var e11 = JSON.parse(m);				
				var delivery_tab = e11.tab_settings.tab_delivery;
				var pickup_tab = e11.tab_settings.tab_pickup;
				var tab_reservation = e11.tab_settings.tab_reservation;
				
				var country_display = e11.location_settings.country_display;
				var city_display = e11.location_settings.city_display;
				var optional_display = e11.location_settings.optional_display;
				var geolocation_display = e11.location_settings.geolocation_display;		
				var neighborhood = e11.location_settings.neighborhood;
				
				var default_country = e11.default_settings.default_country;
				var default_city = e11.default_settings.default_city;
				var default_address_zipcode = e11.default_settings.default_address_zipcode;
				var default_neighbourhood = e11.default_settings.default_neighbourhood;
				var default_business = e11.default_settings.default_business;
				var default_category = e11.default_settings.default_category;
				
				var background_color = e11.site_settings.background_color;
				var font_size = e11.site_settings.font_size;
				var font_color = e11.site_settings.font_color;
				var popup_color = e11.site_settings.popup_color;
				var width = e11.site_settings.width;
				var widget_name = e11.site_settings.widget_name;
				
				var skip_homepage = e11.site_settings.skip_homepage;
				var skip_business_listing = e11.site_settings.skip_business_listing;
				var footer_text = e11.site_settings.footer_text;
				var button_color = e11.site_settings.button_color;
				var mobile_responsive = e11.site_settings.mobile_responsive;
				var button_Text = e11.site_settings.button_Text;
			
		if(Main.customwhereami){		
		var c= Main.customwhereami
		if(c.country)
		Main.PopulateCitySelect(c.country,c.city)	
		}
		else{
			c=new Array();	
		}
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		d.sort(Main.SortByProperty("caption"));
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		for (i in Main.Countries)
		{
			
			
			//alert(Main.Countries[i].id)			
		
				if($.inArray( Main.Countries[i].id, countrytag ) != -1 || $.inArray( '-1', countrytag ) != -1){
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
		
		if(default_country !=-1 && default_city !=-1){
			
			
			c.country = default_country;
			cc = default_country;
			cic =default_city;
			Main.PopulateCitySelect(default_country,default_city);
			
				
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = default_city;
			cic = default_city;
			
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
			
		if(country_display == 't'){
			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1){
				
				
				
				cc = countrytag[0];
				 
				Main.PopulateCitySelect(cc);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				   
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
			//console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && $.inArray('-1', citytag ) == -1 ){ 
				
				cic = citytag[0];
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
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
			
			if(restaurant.length == 1 && $.inArray('-1', restaurant ) == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->			
			
		}
		
		
		if(country_display == 'f'){
		
			cc = default_country;
			
			co_f +='style="display:none;"'
			counter ++;
		}
		
		if(city_display == 'f'){
			
			cic = default_city; 
			
			ci_f +='style="display:none;"'
			counter ++;
		}
		
		
		if(pickup_tab == 'f'){
			of_f +='style="display:none;"'
			counter ++;
		}
		var co_s ='';
		var ci_s ='';
		
		var of_s ='';
		
		
		if(counter == 1){
			var co_s ='width:375px !important;';
			var ci_s ='width:375px !important;';
			
			var of_s ='width:375px !important; background-position: 340px 17px !important;';	
		}
		if(counter == 2){
			var co_s ='width:750px !important;';
			var ci_s ='width:750px !important;';
			
			var of_s ='width:750px !important; background-position: 710px 17px !important;';	
		}
		
		
		 
		
		 MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		 
		var htms  = '<div class="SearchPickup">';
	      htms += '<input type="radio" id="deliveryType" style="display:none;" value="2" checked="checked" name="deliveryType" >'
		  if(counter != 0){	
						
		  htms += '<div class="field-dv" '+co_f+'>';
		  htms +=Forms.CreateSelectPropertyNew3("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand",co_s);
		  htms += '</div>';
		  htms += '<div class="field-dv" '+ci_f+'>';
		  htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit,cic, true, "GoogleMap.UpdateUserPosition(this)", true, "hand", ci_s);
		  htms += '</div>';
		  htms += '<div class="field-dv" '+of_f+'><button type="button" class="filter-btn" onclick="WhereAmIBox.ShowHideOptionSearch()" style="'+of_s+';'+Main.adstle+'"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button></div>';
		  }else{
			  
		  htms += '<div class=" pull_left field-dv" '+co_f+'>'
		  htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, c.country, true,"Main.CountrySelected(this); GoogleMap.UpdateUserPosition(this)", true,"",co_s);
		  htms += '</div>'
		  htms += '<div class=" pull_left field-dv" '+ci_f+'>'
		  htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this)", true, "",ci_s);
		  htms += '</div>'
		  htms += '<div class=" pull_left field-dv" '+of_f+' ><button type="button" class="filter-btn" onclick="WhereAmIBox.ShowHideOptionSearch()" style="'+of_s+';'+Main.adstle+'"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button></div>'
		  }
		  htms += '<div class="filter-dv" style="display:none;top:85px;margin-left:545px !important;">'
		  htms += '<span class="arr"></span>'
		  Forms.CreateValue("whereami", "resturants", '', false, false);
		  htms += '<div class="multiinputbox pull_left" style="margin:6px 0px 0px 3px; '+re_f+'"><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
		  Forms.CreateValue("whereami", "cuisines", '', false, false);
		  htms += '<div class="multiinputbox pull_left" style="margin:6px 0px 0px 3px"><input type="text" id="cuisines" placeholder="<?= $lang_resource['MULTITAG_LANGUAGE_CUISINES'] ?>" /></div>'
		  htms += '<div class=" pull_left" style="margin:6px 0px 0px 3px">'+Forms.CreateTextAreaPropertyNew3("whereami", "address", c.address, false, "", false)+'</div>'
		  htms += '<div class=" pull_left" style="margin:6px 0px 8px 3px"><button type="button" style="'+Main.adstle+'" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		  htms += '</div>'
		  <!--filter-dv-->
		  htms += '<div class=" pull_left field-dv">'
		  htms += '<button type="button" class="search-btn" id="mainbuttonok" onclick="MainCustom.SaveWhereAmI()"><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button></div>'
		  htms += '</div>'
		  htms += '</div>'
		  
		  //return htms;


		var htms = '';
				htms += '<input type="radio" id="deliveryType" style="display:none;" value="2" checked="checked" name="deliveryType" >'
				htms += '<div class="row">';
				htms += '<div class="col-md-12">';
				htms += '<div class="form-group">';
				//alert(d);
				if(default_country > 0 && default_country !=0){
					htms +=Forms.CreateSelectPropertyNew4("whereami", "country", d, default_country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "",co_s);
				}else{
					htms +=Forms.CreateSelectPropertyNew4("whereami", "country", d, c.country, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "",co_s);	
				}
				htms += '</div>';
				htms += '</div>';
				htms += '</div>';
				htms += '<div class="row">';
				htms += '<div class="col-md-12">';
				htms += '<div class="form-group">';
				if(default_city !=''){
					htms += Forms.CreateSelectPropertyNew4("whereami", "city", cit, default_city, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand", ci_s);
				}else{
					htms += Forms.CreateSelectPropertyNew4("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand", ci_s);
				}
				htms += '</div>';
				htms += '</div>';
				htms += '</div>';
				
				
				if(optional_display == 't'){
					htms += '<div class="row">';
					htms += '<div class="col-md-12">';
					htms += '<div class="form-group">';
					htms += '<button type="button" class="btn btn-yellow" style="'+Main.adstle+'" onclick="WhereAmIBox.ShowHideOptionSearch()">Optional filters</button>';
					htms += '</div>';
					htms += '</div>';
					htms += '</div>';
					
					htms += '<div class="filter-d" style="display:none;">';
					
					htms += '<div class="row">';
					htms += '<div class="col-md-12">';
					htms += '<div class="form-group">';
					Forms.CreateValue("whereami", "cuisines", '', false, false);
					htms += '<input type="text" id="cuisines" placeholder="cuisines" class="form-control"/>';
					htms += ' </div>';
					htms += '</div>';
					htms += '</div>';
					
					htms += '<div class="row">';
					htms += '<div class="col-md-12">';
					htms += '<div class="form-group">';
					htms += '<span class="arr"></span>';
					Forms.CreateValue("whereami", "resturants", '', false, false);
					htms += '<input type="text" class="form-control" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" />'
					htms += '</div>';
					htms += '</div>';
					htms += '</div>';
					
					/*htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<input type="text" class="form-control" placeholder="Cuisine">'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'
					htms += '<div class="row">'
					htms += '<div class="col-md-12">'
					htms += '<div class="form-group">'
					htms += '<input type="text" class="form-control" placeholder="Restaurants">'
					htms += '</div>'
					htms += '</div>'
					htms += '</div>'*/
					
					htms += '</div>';
				}
				htms += '<div class="row">';
				htms += '<div class="col-md-12">';
				htms += '<div class="form-group">';
				htms += '<button type="button" class="btn btn-red" id="modelboxnew" onclick="MainCustom.SaveWhereAmI()">Find Restaurant</button>';
				htms += '</div>';
				htms += '</div>';
				htms += '</div>';
                
          
		
		  return htms;	
		  
		  if(country_display == 'f'){
		
			Main.PopulateCitySelect(default_country);
			
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
				
			GoogleMap.UpdateUserPosition(a);
			
		}
		
		if(city_display == 'f'){
			
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			
			GoogleMap.UpdateUserPosition(a);
		}
		
	},
	SearchReservation: function(){
			
		if(Main.customwhereami){
		var c= Main.customwhereami
		if(c.country)
		Main.PopulateCitySelect(c.country,c.city)	
		}
		else{
			c=new Array();	
			
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
		{ $.inArray(Main.Countries[i].id, countrytag )
			//if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
			if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray("-1", countrytag ) != -1){
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
			
			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1){
				
				
				
				cc = countrytag[0];
				
				Main.PopulateCitySelect(cc);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				   
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
			//console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && $.inArray('-1', citytag ) == -1 ){ 
				
				cic = citytag[0];
					
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
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
			
			if(restaurant.length == 1 && $.inArray('-1', restaurant ) == -1){
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
		var co_s ='';
		var ci_s ='';
		
		var of_s ='';
		
		
		if(counter == 1){
			var co_s ='width:375px !important;';
			var ci_s ='width:375px !important;';
			
			var of_s ='width:375px !important; background-position: 340px 17px !important;';	
		}
		if(counter == 2){
			var co_s ='width:750px !important;';
			var ci_s ='width:750px !important;';
			
			var of_s ='width:750px !important; background-position: 710px 17px !important;';	
		}
		 
		
	
		   
	var   htms  = '<div class="SearchReservation">';
	  	  htms += '<input type="radio" id="deliveryType" style="display:none;" value="3" checked="checked" name="deliveryType" >'
		   if(counter != 0){	
						
		  htms += '<div class="field-dv" '+co_f+'>';
		  htms +=Forms.CreateSelectPropertyNew3("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand",co_s);
		  htms += '</div>';
		  htms += '<div class="field-dv" '+ci_f+'>';
		  htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit,cic, true, "GoogleMap.UpdateUserPosition(this)", true, "hand", ci_s);
		  htms += '</div>';
		  htms += '<div class="field-dv" '+of_f+'><button type="button" class="filter-btn" onclick="WhereAmIBox.ShowHideOptionSearch()" style="'+of_s+';'+Main.adstle+'"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button></div>';
		  }else{
		  htms += '<div class=" pull_left field-dv" '+co_f+' >'
		  htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, c.country, true,"Main.CountrySelected(this); GoogleMap.UpdateUserPosition(this)", true,"", co_s);
		  htms += '</div>'
		  htms += '<div class=" pull_left field-dv" '+ci_f+'>'
		  htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, c.city, true, "GoogleMap.UpdateUserPosition(this)", true, "", ci_s);
		  htms += '</div>'
		  htms += '<div class=" pull_left field-dv" '+of_f+'><button type="button" class="filter-btn" onclick="WhereAmIBox.ShowHideOptionSearch()" style="'+of_s+';'+Main.adstle+'"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button></div>'
		  }
		  htms += '<div class="filter-dv" style="display:none; top:85px !important;margin-left:545px !important;">'
		  htms += '<span class="arr"></span>'
		  Forms.CreateValue("whereami", "resturants", '', false, false);
		  htms += '<div class="multiinputbox pull_left" style="margin:6px 0px 0px 3px; '+re_f+'"><input type="text" id="resturants" data-placeholder="true" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANTS'] ?>"/></div>'
		  Forms.CreateValue("whereami", "cuisines", '', false, false);
		  htms += '<div class="multiinputbox pull_left" style="margin:6px 0px 0px 3px"><input type="text" id="cuisines" placeholder="<?= $lang_resource['MULTITAG_LANGUAGE_CUISINES'] ?>" /></div>'
		  htms += '<div class=" pull_left" style="margin:6px 0px 0px 3px">'+Forms.CreateTextAreaPropertyNew3("whereami", "address", c.address, false, "", false)+'</div>'
		  htms += '<div class=" pull_left" style="margin:6px 0px 8px 3px"><button type="button" style="'+Main.adstle+'" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		  htms += '</div>'
		  <!--filter-dv-->
		  htms += '<div class=" pull_left field-dv">'
		  htms += '<button type="button" class="search-btn" id="mainbuttonok" onclick="Visuals.SearchLocation2nd()"><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button></div>'
		  htms += '</div>'
		  htms += '</div>'
		 
		  
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
	SearchLocation2nd: function(){
		
		
		$(".filter-dv").hide();
		console.log(Forms.CanSave("whereami"));
		
		document.getElementById("citychoose").style.display = "none";
		
		var deliveryAccept = $("input[name=deliveryType]:checked").val()
		if(Main.settingfront.tab_delivery_country == 'f'){
			
		Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;
			
		}
		else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 &&  $.inArray('-1', citytag ) == -1 ){
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
		/*Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
		Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;*/
		
		
        if (Forms.CanSave("whereami") == false)
        {
			
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
            return
        }
		
		if(deliveryAccept== undefined)
		{
            swal("Error","<?= $lang_resource['ALERT_PICKUP_DELIVERY'] ?>","error");
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
		
		
		Popup.Close()
        Forms.Clean("whereamiress", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereamiress";
		
        var b = false;
            c = new Object();
            Forms.Form.whereamiress.type = "create"
			
	  var htms ='';
		  
          htms += '<div class="teb-content">'
		 
		  htms +=Visuals.SearchReservation2nd();
	
		Popup.ShowSearch(911, '', htms, null, function (){
        }, Main.PreDatepickerCall)

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
            caption: "<?= $lang_resource['RESERVATION_NO_GUEST'] ?>"
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
  
        g = '[{"id":"","caption":"<?= $lang_resource['FRONT_VISUALS_SELECT_TYPE'] ?>"},{"id":"1","caption":"<?= $lang_resource['SHOPPING_SECOND_SEND_HEADER'] ?>"},{"id":"2","caption":"<?= $lang_resource['PICKUP'] ?>"},{"id":"3","caption":"<?= $lang_resource['RESERVATION_V21'] ?>"}]';
        g = JSON.parse(g);

				var htms = '<div class="popup_wrapper"  style="width:883px; min-height:160px; " >'
				htms += '<div class="pop_header" style="width:883px;margin-bottom:25px">'
				htms += '<div class="pop_heading"><h3><?=$lang_resource['RESERVATION_V21'] ?></h3>'
				htms += '</div>'
				htms += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
				htms += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
				htms += '</div>'
				htms += '</div>'
				
			htms += '<div class=" pull_left field-dv"><button type="button" class="filter-btn" style="'+Main.adstle+';font-size: 14px; width:200px; background-position:170px 17px;" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_RESTAURANTS_CUISINES'] ?></button></div>'
			htms += '<div class="filter-dv filter-dvabc step2-filter" style="display:none;">'
		    htms += '<span class="arr"></span>'
		    Forms.CreateValue("businesslist", "resturants", Main.WhereAmIData.resturant, false, false);
		    htms += '<div ><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
		    Forms.CreateValue("businesslist", "cuisines", Main.WhereAmIData.cuisines, false, false);
		    htms += '<div ><input type="text" id="cuisines" placeholder="<?= $lang_resource['MULTITAG_LANGUAGE_CUISINES'] ?>" /></div>'
			
		    htms += '<div class="pull_left" style="margin:6px 0px 8px 3px"><button type="button" style="'+Main.adstle+'" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		    htms += '</div>'
		  <!--filter-dv-->
			htms += '<div id="fulldv">'
			
		    htms += '<div class="pull_left field-dv">'
			htms +='<input type="text" class="field_text" value="'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'" id="rdate1" placeholder="<?= $lang_resource['FRONT_VISUALS_MMDDYY'] ?>" readonly="readonly" required="required"/>'
		  
		    htms += '</div>'
			
			htms += '<div class="pull_left field-dv">'
		    htms += Forms.CreateSelectPropertyNew3("businesslist", "guest1", d, Main.WhereAmIData.guest, false,"", false);
		    htms += '</div>'
			
			htms += '</div>'
	
			

		    htms += '<div class=" pull_left field-dv" style="margin-left:13px;">'
		    htms += '<button type="button" class="search-btn" style="" onclick="Shopping.changeDelTypeNew(4)"><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button>'
			htms += '</div>'
			htms +='</div>'
			htms +='</div>'
			htms +='</div>'
			htms +='</div>'
			
		 Popup.ShowSearch(911, 220, htms, null, function (){
        }, Main.PreDatepickerCall2)
	},	
		 OpenEachOrder: function (a,fromInput)
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
            Main.Ga("/orders/open/" + a);
            if (d != "" && d != '{"order":null}')
            {
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
                //alert(Main.Temp.PseudoCart.Total_Point_Used)
				var c = "";
				c += '<div class="wrapper trackorder_popup">'
				
				c += '<div class="option_popup_header"><h3><?= $lang_resource['Order_V2'] ?> ' + Main.Temp.Order.id + ' (' + Main.Temp.Order.status +' )</h3>';
			if((Main.Temp.Order.gprs_url!=null) && (Main.Temp.Order.statnum==4))
				{
					
				c+= '<div class="btota" ><a style="color:#FFF;font-weight:bold;" href="'+ Main.Temp.Order.gprs_url +'" target="_blank"><?=$lang_resource['FRONT_TRACK_DRIVER_GPS'];?></a></div>';
				}
			if( Main.Temp.Order.bpermission == "t") {
        c += '<div class="reorder_track"><button type="button" class="reorder" onclick="Main.Reorderalert(' + Main.Temp.Order.id + ')"><?= $lang_resource['TRACK_REORDER'] ?></button></div>'
					}	
			c += '<div class="option_popup_close"><button class="option_popup_close_btn" onclick="Popup.Close();" >X</button>			</div>';
			c += '</div>';
				
				
               
	if(Main.Temp.PseudoCart.business[0].dishes != ""){
		
		
		
	c += '<div class="track_order_css">'	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_NAME'] ?></span><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name) + '" READONLY/></div>'	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></span><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.email) + '" READONLY/></div>'	
	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_STREET'] ?></span><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address) + '" READONLY/"></div>'	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></span><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel) + '" READONLY/></div>'	
	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] ?></span><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.Order.comment) + "</textarea></div>"	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_COMMENTS'] ?></span><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + "</textarea></div>"	
	
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><span class="pop_label"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_USER_HEADER'] ?></span><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + "</textarea></div>"
	c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">&nbsp;</div>'	
	c += '</div>'
	c += '<div id="cartresultsinner_track">';
    c += "</div>";

	}
	
	if(Main.Temp.PseudoCart.reservestatus){
		
		c += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">'
		
		c += '<tr>';
		c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_NAME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></span></td>';
		c += '</tr>';
		
		c += '<tr>';
		c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.name) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.email) + '" READONLY/></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?> :</span></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.tel) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rdate) + '" READONLY/"></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_TIME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"></span></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="'  + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rhour) + ':'+ Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rmin) + '" READONLY/"></td>';
        c += '<td></td>';
		c += '</tr>';
		
		c += '</table>';
	
	

				
				
				c += '<table cellpadding="7"  class="pop_tbl track_tbl1" border="1" style="margin: 0 auto;border-spacing:0;border-collapse:collapse;border-style:solid;" width="95%"><tbody>';
        c += '<tr><th align="center"><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></th><th align="center"><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></th><th align="center"><?= $lang_resource['FRONT_RESERVATION_FREE'] ?></th><th align="center"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></th><th align="center"><?= $lang_resource['Price_V2'] ?></th></tr>';
		  			c += '<tr><td align="center">'
		  			c +=Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Table);
                   
				
					c +='</td>'
					c += '<td align="center">'
					
				    
					 c +=Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Room) 
					c +='</td>'
					c +='<td align="center">'
					
					c += Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Free);
					
					c +='</td>'
                    c +='<td align="center">'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Table.length+'</span><span>  X  </span><span>'+(Main.NullToEmpty(Main.Temp.Order.tableprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.tableprice)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Room.length+'</span><span>  X  </span><span>'+(Main.NullToEmpty(Main.Temp.Order.roomprice)=="")? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.roomprice+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_FREE'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Free.length+'</span><span>  X  </span><span>'+Main.NullToEmpty(Main.Temp.Order.freeprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.freeprice+'</span><br>'					
					}
					c += '</td>'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					var tableprice = Main.Temp.PseudoCart.reserveQty.Table.length * Main.Temp.Order.tableprice ;
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					var roomprice = Main.Temp.PseudoCart.reserveQty.Room.length * Main.Temp.Order.roomprice ;
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					var freeprice = Main.Temp.PseudoCart.reserveQty.Free.length * Main.Temp.Order.freeprice ;
					}
					c += '<td align="center">'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					if(tableprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice.toFixed(2)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					if(roomprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice.toFixed(2)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					if(freeprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice.toFixed(2)+'</span><br>'
					}
					
					c +='</td>'
                    c += "</tr>";
					
                c += '<tr><td colspan="4" align="right">&nbsp;<?= $lang_resource['EXPORT_TOTAL'] ?>&nbsp;</td><td align="center" style="font-weight:bold;font-size:16"><?= $lang_resource['Panel_Currency'] ?>  '+parseFloat(Main.Temp.PseudoCart.reserveFee).toFixed(2)+'</td></tr>'
					
                c += "</tbody></table>"
        c += "</td></tr>"	
		
	
		
		
		c +="</tbody></table>"
				


               
				}
	
		   c += '<div class="pop_footer2">';
		   
		   c += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"><button type="button" class="close_btn2"  onclick="Visuals.MyOrders(false)"><?= $lang_resource['BACK_V21'] ?>';		   
		    c += '</div>'
			c += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"><button type="button" class="close_btn2"  onclick="Popup.Close()"><?= $lang_resource['CLOSE_V21'] ?></button>';		   
		    c += '</div>'
		   
		   //c += '<div class="pull_left" style=" margin:12px 0px 0px 12px"><button type="button" class="close_btn"  onclick="Visuals.MyOrders(false)"><?= $lang_resource['BACK_V21'] ?></button><button type="button" class="close_btn"  onclick="Popup.Close()"><?= $lang_resource['CLOSE_V21'] ?></button></div>';
		   
		   c += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">';
		   c += '<div class="pull_custom_text2"><?= $lang_resource['Your_Total_V2'] ?> :</div>';
		   if(Main.Temp.PseudoCart.totalfinla !=null)
		   {
		   		c += '<div class="pull_custom2" style="margin-left:0px;">' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.totalfinla).toFixed(2)) + "</div>";
		   }
		   else
		   {
		   	c += '<div class="pull_custom2" style="margin-left:0px;">' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(2)) + "</div>";
		   }		   
		    c += '</div>'
		   
		  /* c += '<div class="pull_left pull_custom_text" style="margin-left:0px;"><?= $lang_resource['Your_Total_V2'] ?> :</div>';
		   if(Main.Temp.PseudoCart.totalfinla !=null)
		   {
		   		c += '<div class="pull_left pull_custom" style="margin-left:0px;">' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.totalfinla).toFixed(2)) + "</div>";
		   }
		   else
		   {
		   	c += '<div class="pull_left pull_custom" style="margin-left:0px;">' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(2)) + "</div>";
		   }*/
		   c += '</div>';
           c += "</div>";


           Main.ordpopdt = c;
		   Main.ShowOrderPop();
		
            }
            else
            {
		$(".odrstus").html("");
		$(".showOrd").hide();
                alert("<?= $lang_resource['FRONT_No_TIENES_PERMISO'] ?>")
            }
        })
    },
	 MyOrders: function (a)
    {
        var b = new Date().getTime();
        Main.Loading(a);
        Main.Aid = b;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchMyOrders"}]', function (c)
        {
			console.log(c)
            if (b != Main.Aid)
            {
                return
            }
            Main.Ready(a);
            if (c != "")
            {
                Main.Ga("/orders");
                Main.Orders = JSON.parse(c).orders;
                var d = '<div class="popup_wrapper" style="width:940px;">';
				d += '<div class="pop_header" style="width:940px;">';
                d += '<span class="pop_heading"><h3><?= $lang_resource['ORDERS_BOX_TITLE'] ?></h3></span>';
				d += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	    d += '<button class="pop_close_btn" type="button" onclick="Popup.Close()">X</button>'
       		    d += '</div>';
				 d += "</div>";

				d += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';

                d += '<table width="85%" border="0" cellspacing="0" cellpadding="0" class="ordertable table"  id="orders">';


				 d += "</table>";
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

					h += '<tr>';

				 h +=  '<td align="left"><span class="pop_label">#</span></td>';
				h += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></span></td>';
				h += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_BUSINESS_HEADER'] ?></span></td>';
				h += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></span></td>';
				h += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_STATUS_HEADER'] ?></span></td>';

               	 h += "</tr>";
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
						
                        h += '<tr class="nonselectable hand row' + f + '" style="border-bottom:1px solid #e4e4e4;" onclick="Visuals.OpenEachOrder(' + Main.Quote(Main.NullToEmpty(Main.Orders[e].id)) + ',true)" >';
                        h += '<td class="oid"><div class="cap"><span class="caption">' + Main.Orders[e].id + "</span></div></td>";
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
                        h += '<td class="businessprovider"><div class="cap"><span class="caption">' + Main.NullToEmpty(openclosetime1) + "</span></div></td>";
						
						
                        h += '<td class="ordercity"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].busname) + "</span></div></td>";
						
						h += '<td class="ordercity"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].city) + "</span></div></td>";
						
                        h += '<td class="orderstatus"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].statustext) + "</span></div></td>";
						h += '</tr>';

                    }

					 document.getElementById("hedlogbox").style.display="none"
                    document.getElementById("orders").innerHTML = h
					
					//$("#popupbox").css("left","224px");
                })
            }
            else
            {
                alert("Error")
            }
        })
    },
	  PopulatePseudoCart: function ()
    {


        var b = "";
        var f = "";
        for (i in Main.Temp.PseudoCart.business)
        {
		      b += '<h3 class="text_center restaurant-name" style=" font-size:22px;">' + Main.Temp.PseudoCart.business[i].name.toUpperCase() + "</h3>";
			  b += '<p class="text_center drv_comment"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?><span>';
			  if(Main.Temp.PseudoCart.business[i].paymethod.cash == true) {
			  b += '<?=$lang_resource['FRONT_CASH']?>';
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.card == true) {
			  b += '<?=$lang_resource['FRONT_CARD']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.braintree == true) {
			  b += '<?=$lang_resource['FRONT_BRAINTREE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorize == true) {
			   b += '<?=$lang_resource['FRONT_AUTHORIZE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.cardsave == true) {
			  b += '<?=$lang_resource['FRONT_CARDSAVE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypal == true) {
			   b += '<?=$lang_resource['FRONT_PAYPAL']?>';  
			  }  else if(Main.Temp.PseudoCart.business[i].paymethod.marco == true) {
			   b += '<?=$lang_resource['FRONT_MACRO']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypaladaptive == true) {
			  b += '<?=$lang_resource['FRONT_PAYPALADAPTIVE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorizednet == true) {
			   b += '<?=$lang_resource['FRONT_AUTHORIZEDOTNET']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.transactium == true) {
			   b += '<?=$lang_resource['FRONT_TRANSACTIUM']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.skrill == true) {
			   b += '<?=$lang_resource['PAYMENT_SKRILL_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.payeezy == true) {
			   b += '<?=$lang_resource['PAYMENT_PAYEEZY_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.voguepay == true) {
			   b += '<?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.pexpress == true) {
			   b += '<?=$lang_resource['PAYMENT_PEXPRESS_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.maksekeskus == true) {
			   b += '<?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?>';  
			  }
			  
			  
			  b +='</span></p>';
			  if(Main.Temp.PseudoCart.business[i].paymethod.transactium == true) {
			  b += '<p class="text_center drv_comment"><?= $lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_CODE'] ?><span>'+Main.Temp.Order.transactium_tid+'</span></p>';
			  b += '<p class="text_center drv_comment"><?= $lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_STATUS'] ?><span>'+Main.Temp.Order.transactium_status+'</span></p>';
			  }
			  b += '<div class="pop-item-wrapper2">';
          
            for (j in Main.Temp.PseudoCart.business[i].dishes)
            {
			 b += '<div class="pop-item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name">' + Main.Temp.PseudoCart.business[i].dishes[j].name.toUpperCase() + "</h3>";
			   if(Main.Temp.PseudoCart.business[i].dishes[j].options) {
			 b += '<div>'+ProductOption.Margeslash(Main.Temp.PseudoCart.business[i].dishes[j].options)+'</div>';
			 }
             b += '<div style="margin-top:7px;"><input type="text" class="field_text_pop" id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_comments" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.business[i].dishes[j].comments) + '" READONLY></div>';
			 b += '<div id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_pseudoingredients"></div>';

             b += '<div id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_pseudoextras"></div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" id="dish_' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_price">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].dishes[j].total) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
             
            }

			if (parseFloat(Main.Temp.PseudoCart.business[i].shipping) > 0)
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
            }
            else
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
            }
			 b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name">' + a + "</h3>";
             b += '<div style="margin-top:7px;"><input type="text" class="field_text_pop" id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_comments" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '" READONLY></div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price"  id="' + Main.Temp.PseudoCart.business[i].id + '_shipping">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].shipping) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';

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
						
		     b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name">' + discaption + "</h3>";
             b += '<div style="margin-top:7px;"><input type="text" class="field_text_pop" id="' + Main.Temp.PseudoCart.business[i].id + '_comments" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="'  + Main.NullToEmpty(Main.Temp.PseudoCart.discountcomments) + '" READONLY></div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price"  id="' + Main.Temp.PseudoCart.business[i].id + '_shipping">' + parseFloat(Main.Temp.PseudoCart.discountprice).toFixed(2) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
			 

					}
					/*	discount section*/



		/*	Tax section*/
		if(Main.Temp.PseudoCart.buyer.tax){
			if(Main.Temp.PseudoCart.buyer.taxtype == 2){
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED']?>"
			}else{
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED']?>"
			}
			
			 b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['REORDER_CONFIRM_TAX']?> ('+Main.Temp.PseudoCart.buyer.tax+' %)</h3>';
             b += '<div class="tax_text">'+taxstatus+'</div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(Main.Temp.PseudoCart.tax) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}
		if(Main.Temp.PseudoCart.servicefeeTotal1){
			
			 b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['SERVICE_FEE_V2']?>('+Main.Temp.PseudoCart.servicefee+' %)</h3>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(Main.Temp.PseudoCart.servicefeeTotal1) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}
		/*	Tax section*/
			if(parseInt(Main.Temp.PseudoCart.buyer.tips)>0) {
			
			 b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_TIPS']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(Main.Temp.PseudoCart.buyer.tips) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		if(Main.Temp.PseudoCart.Total_Point_Used !=null)
		{
			b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_TOTAL_VALUE']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(2)) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		if(Main.Temp.PseudoCart.Total_Point_Used !=null)
		{
			b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_USED_POINTS']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Main.Temp.PseudoCart.Total_Point_Used + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		if(Main.Temp.PseudoCart.usedpointvalue !=null)
		{
			b += '<div class="item-dv2">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_USED_POINTS_VALUE']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Main.Temp.PseudoCart.usedpointvalue + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}





        }
        document.getElementById("cartresultsinner_track").innerHTML = b;
        var e;
        var d;
        var a;
        var c;
        for (j in Main.Temp.PseudoCart.business)
        {
            Dishes = Main.Temp.PseudoCart.business[j].dishes;
            for (i in Dishes)
            {
                e = Dishes[i].ingredients;
                d = Dishes[i].extras;
                Tags.CreateContainer(i + "_" + Dishes[i].id + "_pseudoingredients");
                Tags.CreateContainer(i + "_" + Dishes[i].id + "_pseudoextras");
                for (k in e)
                {
                    a = e[k].caption.toLowerCase();
                    a = a.charAt(0).toUpperCase() + a.slice(1);
                    Tags.CreateTag(i + "_" + Dishes[i].id + "_pseudoingredients",
                    {
                        id: e[k].id,
                        caption: a,
                        cclass: "ingredient",
                        enabled: e[k].enabled,
                        dishindex: i,
                        businessindex: j,
                        ingredientindex: k
                    }, true)
                }
                for (k in d)
                {
                    a = d[k].name.toLowerCase();
                    a = a.charAt(0).toUpperCase() + a.slice(1);
                    Tags.CreateTag(i + "_" + Dishes[i].id + "_pseudoextras",
                    {
                        id: d[k].id,
                        caption: a,
                        cclass: "extra",
                        enabled: d[k].enabled,
                        dish: Dishes[i].id,
                        price: d[k].price,
                        enabled: d[k].enabled,
                        dishindex: i,
                        businessindex: j,
                        extraindex: k
                    }, true)
                }
            }
        }
    },
	SearchReservation2nd: function(){

        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['RESERVATION_NO_GUEST'] ?>"
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
            caption: "<?= $lang_resource['RESERVATION_NO_HOUR'] ?>"
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
            caption: "<?= $lang_resource['RESERVATION_NO_MUNITE'] ?>"
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
		
			  htms += '<div class="reservpopBox">'
			  htms += '<div class="pull_left field-dv">'
			  htms += Forms.CreateSelectPropertyNew3("whereamiress", "guest", d, '', false,"", false);
			  htms += '</div>'
			  htms += '<div class="pull_left field-dv">'
			  htms += Forms.CreateInputProperty10("whereamiress", "rdate", '','', false, "", false);
			  htms += '</div>'
			  htms += '<div class="pull_left field-dv">'
			  htms += Forms.CreateSelectPropertyNew31("whereamiress", "rhour", h, '', false, "", false);
			  htms += '</div>'
			  htms += '<div class="pull_left field-dv">'
			  htms += Forms.CreateSelectPropertyNew31("whereamiress", "rmin", mi, '', false, "", false);
			  htms += '</div>'
			  htms += '<div class=" pull_left field-dv" style="margin-left: 100px;">'
			  htms += '<button type="button" class="search-btn" id="mainbuttonok" style="margin-right:12px;" onclick="Main.SaveWhereReservationSkip()"><?= $lang_resource['FRONT_VISUALS_SKIP'] ?></button><button type="button" class="search-btn" id="mainbuttonok" onclick="Main.SearchLocation2ndSave()"><?= $lang_resource['FRONT_VISUALS_SAVE_CONTINUE'] ?></button></div>'
			  htms += '</div>'
			  htms += '</div>'
			  htms += '</div>'
		  return htms;

	
	
	
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
		htms +='<ul id="myList" >'
		htms +='<li>'
		htms +='<div class="restlogo">'
		
		if(Main.SeeMoreAppend[b].existspic==true){
			htms +='<img src="../panel/images/business/'+Main.SeeMoreAppend[b].id_w_business+'/small.jpg">'
		}
		else
		{
			htms +='<img src="../panel/images/business/dummy.jpg">'
		}

		
		htms +='</div>'
		htms += '<div class="rvw_rest_dsp">'
		htms +='<h4> <a href="/'+Main.SeeMoreAppend[b].bcustomeslug+'">'+Main.SeeMoreAppend[b].bname+'</a></h4>'
		//htms +='<h4>'+Main.SeeMoreAppend[b].bname+'</h4>'
		htms +='<ul class="review-star">'
		if(Math.round(Main.SeeMoreAppend[b].ratings)==1)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==2)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==3)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==4)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==5)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		}
		else
		{
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}

		
		htms +='</ul>'
		htms +='<span class="rating">'+Main.SeeMoreAppend[b].ratings+'</span>'
		htms +='<div class="home_comment_dv">'
		if(Main.SeeMoreAppend[b].user=='-1')
		{
			htms +='<span><img src="../panel/images/users/dummy.jpg"></span>'
		}
		else
		{
			htms +='<span><img src="../panel/images/users/'+Main.SeeMoreAppend[b].user+'/small.jpg"></span>'
		}
		htms +='<p>'+Main.SeeMoreAppend[b].comment+'</p>'
	
		htms +='</div>'<!--home_comment_dv-->
		htms +='</div>'<!--rvw_rest_dsp-->
	
		htms +='</li>'
		htms +='</ul>'	
		}
	}
		

		$("#seemore_div").append(htms);

		if(Main.SeeMoreAppend.length<4)
			$("#loadMore").hide();
	},
	
    LoginDetailsView: function(){
        Forms.Clean("logindetails", "popupmainbuttonok");
        Main.ActiveForm = "logindetails";
        var b = false;
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

        var a = '<div class="popup_wrapper">'
            a += '<div class="pop_header">'
            a += '<div class="pop_heading">'
            a += '</div>'

            a += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
            a += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
            a += '</div>'

            a += '</div>'
			
			
			    a += '<div class="login-left">'
            a += '<h3 class="login-heading" style=" font-size:20px;"><?= $lang_resource['FRONT_RETURNING_CUSTOMER'] ?></h3>'
            a += '<div class="pop_label pull_left"><?= $lang_resource['LOGIN_INPUT_EMAIL'] ?></div>'

            a += '<span class="pull_left" style="margin-top:7px;"><input type="text" id="loginemail1" class=" field_text_pop" value="'+Main.NullToEmpty(em)+'" placeholder="E-mail"></span>'
            a += '<div class="pop_label pull_left"  style="margin-top:20px;"><?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?></div>'

            a += '<span class="pull_left " style="margin-top:7px;"><input type="password" id="loginpassword1" value="'+Main.NullToEmpty(ps)+'" class=" field_text_pop" placeholder="<?=$lang_resource['FRONT_VISUALS_PASSWORD']?>"></span>'
            a += '<span class="pull_left " style="margin: 7px 0 0 0;"><input type="checkbox" id="checkremember" class="checkbox_2" '+chk+'/><label for="checkremember"><span class="pop_label"><?= $lang_resource['FRONT_REMEMBER_ME'] ?></span></label></span>';

            a += '<span class="pull_left " style="margin-top:25px;"><button type="button" class="pop_login_btn" onclick="Main.LoginCheck()" ><?= $lang_resource['FRONT_SIGN_IN_TO_CHECKOUT'] ?></button></span>'
            a += '<p class="pull_left forgot" onclick="Main.RecoverPassword(true)" style="cursor:pointer;"><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></p>'
            a += '</div>'

            a += '<div class="login-right">'
            a += '<h3 class="login-heading" style=" font-size:20px;"><?= $lang_resource['FRONT_NEW_CUSTOMER'] ?></h3>'
            a += '<p class="log-text-2"><?= $lang_resource['FRONT_SAVE_TIME_NOW'] ?></p>'
            a += '<p class="log-text"><?= $lang_resource['FRONT_YOU_DONT_HAVE_ACCOUNT'] ?></p>'
            a += ' <span class="pull_left " style="margin-top:0px;"><button type="button" class="pop_login_btn" onclick="Shopping.OpenCartGuest()"><?= $lang_resource['FRONT_CONTINUE_AS_A_GUEST'] ?></button></span>'
            a += '<p class="log-text-2" style="margin-top:20px;"><?=$lang_resource['FRONT_SAVE_TIME_LATTER'];?></p>'
            a += '<p class="log-text"><?= $lang_resource['FRONT_CREATE_ACCOUNT_FOR_FAST_CHECKOUT'] ?></p>'
            a += '<span class="pull_left " style="margin-top:0px;"><button type="button" class="pop_login_btn" onclick="Main.EditAccount1(true)"><?= $lang_resource['FRONT_CREATE_ACCOUNT'] ?></button></span>'
            a += '<span class="or"><?= $lang_resource['ELSE_V2'] ?></span>'
            a += '<span class="pull_left " style="margin-top:5px;"><button type="button" class="fb_login_btn" onclick="Facebook.Login()"><?=$lang_resource['LOGIN_IN_WITH_FACEBOOK']?></button></span>'
            a += '</div>'

            a += '</div>'


            var popupSize = 575;
            if(IS_PAYPAL_ENABLED == 1)
                popupSize == 590;

            Popup.Show(590, popupSize, a, Main.SaveWhereAmICustom, null, null, b);
            if (b){
            }
    },
    CreateLoginBox: function () {
        var lgn = ''
        lgn +='<div class="modal-dialog modal-sm" role="document">'
        lgn +='<div class="modal-content">'
        lgn +='<div class="modal-header">'
        lgn +='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        lgn +='<h4 class="modal-title" id="LoginHeading">Login</h4>'
        lgn +='</div>'
        lgn +='<div class="modal-body">'

        lgn +='<div id="loginbox">'
        lgn +='<div id="usermenu">'
        lgn +='</div>'      
        lgn +='</div>'

        lgn +='<div id="loginbottom">'
        lgn +='</div>'

        lgn +='</div>'
        lgn +='</div>'
        lgn +='</div>'
        
        return lgn;
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
    AfterLoginHtml: function(){
        var lgn = ''
        $("#LoginHeading").empty().append('<?= $lang_resource['LOGIN_WELCOME_TEXT'] ?> ' + Main.NullToEmpty(Main.User.name) + '!')

        if (Main.User.level != 3){
            lgn +='<div class="row">'
            lgn +='<div class="col-md-12">'         
            lgn +='<label onclick="top.location.href=\'admin\'" class="hand loginbox_inner_label"><?= $lang_resource['LOGIN_LINK_CONTROL_PANEL'] ?></label>'            
            lgn +='</div>'<!--col-md-12-->
            lgn +='</div>'<!--row-->
        }

        lgn +='<div class="row">'
        lgn +='<div class="col-md-12">'         
        lgn +='<label onclick="MyAccount.Start();" class="hand loginbox_inner_label"><?= $lang_resource['FRONT_MY_ACCOUNT'] ?></label>'         
        lgn +='</div>'<!--col-md-12-->
        lgn +='</div>'<!--row-->

        lgn +='<div class="row">'
        lgn +='<div class="col-md-12">'         
        lgn +='<label onclick="Main.LogOut()" class="hand loginbox_inner_label"><?= $lang_resource['LOGIN_LINK_SESSION_CLOSE'] ?></label>'          
        lgn +='</div>'<!--col-md-12-->
        lgn +='</div>'<!--row-->

    
        return lgn       
    },
    LoginDetails: function(){
        Forms.Clean("logindetails", "popupmainbuttonok");
        Main.ActiveForm = "logindetails";
        var b = false;
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

        var a = '<div class="popup_wrapper">'
            a += '<div class="pop_header">'
            a += '<div class="pop_heading">'
            a += '</div>'

            a += '<div class="pull_right" style="margin:8px 8px 0px 0px">'
            a += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>'
            a += '</div>'

            a += '</div>'
	
a +='<div class="row">'
			a +='<div class="col-md-6 login_sign_up_line">'
			a +='<div class="login_sign_up_devider_left">'
			a +='<h5 class="signup_heading"><?= $lang_resource['FRONT_RETURNING_CUSTOMER'] ?></h5>'
			a +='<div class="row">'
			a +='<div class="col-md-12">'
			a +='<div class="form-group">'
			a +='<label><?= $lang_resource['LOGIN_INPUT_EMAIL'] ?></label>'
			a +='<input type="text" class="form-control" id="loginemail1" value="'+Main.NullToEmpty(em)+'">'
			a +='</div>'<!--form-group-->
			a +='</div>'<!--col-md-12-->
			a +='</div>'<!--row-->
			a +='<div class="row">'
			a +='<div class="col-md-12">'
			a +='<div class="form-group">'
			a +='<label><?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?></label>'
			a +='<input type="password" id="loginpassword1" value="'+Main.NullToEmpty(ps)+'" class="form-control">'
			a +='</div>'<!--form-group-->
			a +='</div>'<!--col-md-12-->
			a +='</div>'<!--row-->
			a +='<div class="checkbox remember_me">' 
			a +='<input type="checkbox" id="checkremember" '+chk+'>' 
			a +='<label for="checkremember"><?= $lang_resource['FRONT_REMEMBER_ME'] ?></label>'
			a +='</div>'
	
	
			a +='<div class="row">'
			a +='<div class="col-md-12">'
			a +='<div class="form-group"><br>'
			a +='<button type="button" class="red_btn_small" onclick="Main.LoginCheck()"><?= $lang_resource['FRONT_SIGN_IN_TO_CHECKOUT'] ?></button>'
			a +='</div>'<!--form-group-->
			a +='</div>'<!--col-md-6-->            
			a +='</div>'<!--row-->
	
			a +='<div class="row">'
			a +='<div class="col-md-6">'
			a +='<div class="form-group">'
			a +='<a href="javascript:Main.RecoverPassword(true)" class="login_link_btn" ><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></a>'
			a +='</div>'<!--form-group-->
			a +='</div>'<!--col-md-6-->
	
			a +='</div>'<!--row-->
			a +='</div>'<!--login_sign_up_devider_left-->
			a +='</div>'<!--col-md-6-->
			a +='<div class="col-md-6">'
			a +='<div class="login_sign_up_devider_right">'
			a +='<h5 class="signup_heading"><?= $lang_resource['FRONT_NEW_CUSTOMER'] ?></h5>'
			a +='<h5><strong><?= $lang_resource['FRONT_SAVE_TIME_NOW'] ?></strong></h5>'
			a +='<p><?= $lang_resource['FRONT_YOU_DONT_HAVE_ACCOUNT'] ?></p>'
			a +='<div class="form-group">'
			a +='<button type="button" class="red_btn_small" onclick="Shopping.OpenCartGuest()"><?= $lang_resource['FRONT_CONTINUE_AS_A_GUEST'] ?></button>'
			a +='</div>'<!--form-group-->
	
			a +='<h5><strong><?=$lang_resource['FRONT_SAVE_TIME_LATTER'];?></strong></h5>'
			a +='<p><?= $lang_resource['FRONT_CREATE_ACCOUNT_FOR_FAST_CHECKOUT'] ?></p>'
			a +='<div class="form-group">'
			a +='<button type="button" class="red_btn_small" onclick="Main.EditAccount1(true);"><?= $lang_resource['FRONT_CREATE_ACCOUNT'] ?></button>'
			a +='</div>'<!--form-group-->
			a +='<div class="or_dv"><?= $lang_resource['ELSE_V2'] ?></div>'<!--or_dv-->
			a +='<div class="row">'
			a +='<div class="col-md-12">'
			a +='<div class="form-group">'
			a +='<button type="button" class="login_with_fb" onclick="Facebook.Login()"><?=$lang_resource['LOGIN_IN_WITH_FACEBOOK']?></button>'
			a +='</div>'<!--form-group-->
			a +='</div>'<!--col-md-6-->            
			a +='</div>'<!--row-->
			a +='</div>'<!--login_sign_up_devider_right-->
			a +='</div>'<!--col-md-6-->
			a +='</div>'<!--row-->
            /*a += '<div class="login-left">'
            a += '<h3 class="login-heading" style=" font-size:20px;"><?= $lang_resource['FRONT_RETURNING_CUSTOMER'] ?></h3>'
            a += '<div class="pop_label pull_left"><?= $lang_resource['LOGIN_INPUT_EMAIL'] ?></div>'

            a += '<span class="pull_left" style="margin-top:7px;"><input type="text" id="loginemail1" class=" field_text_pop" value="'+Main.NullToEmpty(em)+'" placeholder="E-mail"></span>'
            a += '<div class="pop_label pull_left"  style="margin-top:20px;"><?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?></div>'

            a += '<span class="pull_left " style="margin-top:7px;"><input type="password" id="loginpassword1" value="'+Main.NullToEmpty(ps)+'" class=" field_text_pop" placeholder="<?=$lang_resource['FRONT_VISUALS_PASSWORD']?>"></span>'
            a += '<span class="pull_left " style="margin: 7px 0 0 0;"><input type="checkbox" id="checkremember" class="checkbox_2" '+chk+'/><label for="checkremember"><span class="pop_label"><?= $lang_resource['FRONT_REMEMBER_ME'] ?></span></label></span>';

            a += '<span class="pull_left " style="margin-top:25px;"><button type="button" class="pop_login_btn" onclick="Main.LoginCheck()" ><?= $lang_resource['FRONT_SIGN_IN_TO_CHECKOUT'] ?></button></span>'
            a += '<p class="pull_left forgot" onclick="Main.RecoverPassword(true)" style="cursor:pointer;"><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></p>'
            a += '</div>'

            a += '<div class="login-right">'
            a += '<h3 class="login-heading" style=" font-size:20px;"><?= $lang_resource['FRONT_NEW_CUSTOMER'] ?></h3>'
            a += '<p class="log-text-2"><?= $lang_resource['FRONT_SAVE_TIME_NOW'] ?></p>'
            a += '<p class="log-text"><?= $lang_resource['FRONT_YOU_DONT_HAVE_ACCOUNT'] ?></p>'
            a += ' <span class="pull_left " style="margin-top:0px;"><button type="button" class="pop_login_btn" onclick="Shopping.OpenCartGuest()"><?= $lang_resource['FRONT_CONTINUE_AS_A_GUEST'] ?></button></span>'
            a += '<p class="log-text-2" style="margin-top:20px;"><?=$lang_resource['FRONT_SAVE_TIME_LATTER'];?></p>'
            a += '<p class="log-text"><?= $lang_resource['FRONT_CREATE_ACCOUNT_FOR_FAST_CHECKOUT'] ?></p>'
            a += '<span class="pull_left " style="margin-top:0px;"><button type="button" class="pop_login_btn" onclick="Main.EditAccount1(true)"><?= $lang_resource['FRONT_CREATE_ACCOUNT'] ?></button></span>'
            a += '<span class="or"><?= $lang_resource['ELSE_V2'] ?></span>'
            a += '<span class="pull_left " style="margin-top:5px;"><button type="button" class="fb_login_btn" onclick="Facebook.Login()"><?=$lang_resource['LOGIN_IN_WITH_FACEBOOK']?></button></span>'
            a += '</div>'*/

            a += '</div>'

            var popupSize = 575;
            if(IS_PAYPAL_ENABLED == 1)
                popupSize == 590;

            Popup.Show(590, popupSize, a, Main.SaveWhereAmICustom, null, null, b);
            if (b){
            }        
    },
};
