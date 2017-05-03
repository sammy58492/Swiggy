var widgetSettingFinal = {
	Main: function () {
		Main.Loading();
		var a = new Date().getTime();
		Main.Aid = a;
		$.post("lib/widget.php", "f=FetchAllBusinessData", function (b) {				
			widgetSettingFinal.allbusiness = JSON.parse(b);
			$.post("lib/widget.php", "f=FetchAllCountryData", function (bb) {
				widgetSettingFinal.country = JSON.parse(bb);		
				
				$.post("lib/widget.php", "f=FetchAllWidgetData", function (all) {	
							
							Main.Ready();	
							widgetSettingFinal.allwidget =  JSON.parse(all);
							
							widgetSettingFinal.WidgetList();
													
				});		
			});
		});		
	},
	
	
	WidgetList: function(){
	var c='';
					c +='<div class="row">'
					c +='<div class="top-bar">'
					c +='<div class=" col-md-6 col-md-offset-6">'
					c +='<div class=" pull-right">&nbsp; '
					c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
					c +='</div>'
					<!--col-md-5-->
					c +='</div>'
					<!--top-bar-->
					c +='</div>'
					<!--row-->
					
					c +='<div id="widgetedit"></div>'
					
					c +='<div class="panel panel-danger panel-no-border">'
					c +=' <div class="panel-heading panel-heading-2">'                    
					c +=' <div class="row">'
					c +='<div class="col-md-8">'
					c +='<h3 class="panel-title-2"><?= $lang_resource["WIDGET_LIST"] ?></h3>'
					c +='</div>'<!--col-md-5-->
					c +='<div class="col-md-4">'
					c +='<div class="panel-btn pull-right">'

					c +='<div class="inline-popups ">'

					c +=' <span class=" panel-btn-2">'
					c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="widgetSettingFinal.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i><?= $lang_resource["EDIT"] ?> </a>'
					c +='</span>'
					c +=' <span class=" panel-btn-2">'
					c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="widgetSettingFinal.View()" data-effect="mfp-zoom-in"><i class="fa icon-eye"></i><?= $lang_resource["ADMIN_PAGE_WIDGET_VIEW"] ?> 	</a>'
					c +='</span>'
					c +='<span class=" panel-btn-2">'
					c +=' <button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="widgetSettingFinal.Delete()" href="javascript:void(0)"><i class="fa icon-remove2"></i><?= $lang_resource["BUSINESS_DELETE"] ?></button></span>'

					c +=' </div>'


					c +=' </div>'
					c +=' </div>'<!--col-md-4-->
					
					
					c +='</div>'<!--row-->

					c +=' </div>'
					
					c +='<div class="panel-body">'
					c +='<div class="table-responsive">'
					c +='<table class="table table-th-block table-striped tbl_enebal">'
					c +=' <thead>'
					c +='<tr>'
					c +='<th width="5%"><?= $lang_resource["ID"] ?></th>'
					c +='<th width="15%"><?= $lang_resource["ORDER_TAB_ALL"] ?></th>'	
					c +='<th width="30%"><?= $lang_resource["ORDER_DETAILS_BUYER_NAME"] ?></th>'
					c +='<th width="30%"><?= $lang_resource["USERSPOINT_HISTORY_HEADING_DATE"] ?></th>'
					c +='<th width="20%"><?= $lang_resource["FRONT_VISUAL_REQUEST_COLLECTION_ENABLED2"] ?></th>'
					c +=' </tr>'
					c +=' </thead>'
					c +='<tbody>'
			//alert(JSON.stringify(widgetSettingFinal.allwidget))
			
			var allwidget = widgetSettingFinal.allwidget;
			for (var e in allwidget) {
				var cls;
				if(allwidget[e].enabled =='t'){ 
					cls = 'open';
				}else { 
					cls ='close';
				}
				
				//alert(allwidget[e].status)
				/*if(allwidget[e].status !=''){
					c +='<tr>'
					c +='<td colspan="5" style="text-align:center;">'+allwidget[e].status+'</td>'					
					c +='</tr>'					
				}else{*/
					c +='<tr>'
					c +='<td class="hand" onclick="widgetSettingFinal.Edit('+allwidget[e].id+')">'+allwidget[e].id+'</td>'
					c +='<td><input type="checkbox" class="widget_liost checkbox" value="' + allwidget[e].id + '"></td>'
					c +=' <td class="hand" onclick="widgetSettingFinal.Edit('+allwidget[e].id+')">'+allwidget[e].widget_name+'</td>'
					c +=' <td>'+allwidget[e].date+'</td>'
					c +=' <td><div id="idd'+allwidget[e].id+'" class="enebal" onclick="widgetSettingFinal.SetEnabled(' + allwidget[e].id + ',\'' + allwidget[e].enabled + '\');"><a href="javascript:void(0)" class="selector '+ cls +'">&nbsp;</a></div></td>'
					c +='</tr>'					
				//}
			}											
					c +='</tbody>'
					c +='</table>'
					c +='</div>'<!--table-responsive-->

					c +='</div>'<!-- /.panel-body -->
					
					c +='</div>'
					
					document.getElementById("main").innerHTML = c;	
					var dd ='';				
					widgetSettingFinal.PrintMain(dd);
		
	},
			
			
	PrintMain: function(m){
		
		
	if(m){		
		var e11 = JSON.parse(m);		
		//alert(e11[0].widget);		
		var s1 = '['+e11[0].widget+']';
		var id = e11[0].id;		
		s1 = JSON.parse(s1);
			
		for (var u in s1) {
			var delivery_tab = s1[u].delivery_tab;
			var pickup_tab = s1[u].pickup_tab;
			//var reservation_tab = s1[u].reservation_tab;
			var country_display = s1[u].country_display;
			var city_display = s1[u].city_display;
			var optional_display = s1[u].optional_display;
			var geolocation_display = s1[u].geolocation_display;
			var neighborhood = s1[u].neighborhood;
			var default_country = s1[u].default_country;
			var default_city = s1[u].default_city;
			var default_address_zipcode = s1[u].default_address_zipcode;
			var default_neighbourhood = s1[u].default_neighbourhood;
			var background_color = s1[u].background_color;
			var font_size = s1[u].font_size;
			var font_color = s1[u].font_color;
			var popup_color = s1[u].popup_color;
			var button_color = s1[u].button_color;
			var default_business = s1[u].default_business;
			var default_category = s1[u].default_category;
			var widget_name = s1[u].widget_name;
			var skip_homepage = s1[u].skip_homepage;
			var skip_business_listing = s1[u].skip_business_listing;
			var footer_text = s1[u].footer_text;
			var mobile_responsive = s1[u].mobile_responsive;
			var button_Text = s1[u].button_Text;
			var width = s1[u].width;
			
						
			//widgetSettingFinal.PopulateCitySelected(default_country,default_city);
			//widgetSettingFinal.PopulateNeighborhoodSelect(default_city,default_neighbourhood);			
        
		}
	
	}		

	
	Forms.Clean("widget", "mainbuttonok");		
	//this.Form()
	
		
					var c="";	
					
	
	var d = new Array();
	d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
	d.push(JSON.parse('{"id":"f","caption":"No"}'));
	
	var d2 = new Array();
	d2.push(JSON.parse('{"id":"12px","caption":"12px"}'));
	d2.push(JSON.parse('{"id":"14px","caption":"14px"}'));
	d2.push(JSON.parse('{"id":"16px","caption":"16px"}'));
	d2.push(JSON.parse('{"id":"18px","caption":"18px"}'));
	d2.push(JSON.parse('{"id":"22px","caption":"22px"}'));
	d2.push(JSON.parse('{"id":"24px","caption":"24px"}'));
	d2.push(JSON.parse('{"id":"26px","caption":"26px"}'));
	d2.push(JSON.parse('{"id":"32px","caption":"32px"}'));
	d2.push(JSON.parse('{"id":"36px","caption":"36px"}'));
	
	var d1 = new Array();
	d1.push(JSON.parse('{"id":"f","caption":"No"}'));
	d1.push(JSON.parse('{"id":"t","caption":"Yes"}'));
	
	var d3 = new Array();
	 d3.push({
			id: 0,
			caption: 'Please select business'
		})
	var b1 = widgetSettingFinal.allbusiness;		
	for (var j in b1) {			            
		 d3.push({
			id: b1[j].id,
			caption: b1[j].name
		})
	}
	
	var d7 = new Array();
	 d7.push({
			id: 0,
			caption: 'Please select country'
		})
	var b7 = widgetSettingFinal.country;		
	for (var n in b7) {			            
		 d7.push({
			id: b7[n].id,
			caption: b7[n].name
		})
	}
	
  
					c +='<div class="panel panel-danger panel-square panel-no-border">'
					c +='   <div class="panel-heading panel-heading">'
					c +='   <div class="row">'
					c +='  <div class="col-md-6">'
					c +='     <h3 class="panel-title"> <?=$lang_resource["WIDGET"]?></h3>'
					c +='    </div>'
					c +=' </div>'

					c +='   </div>'
					c +=' 	<div class="panel-body"> '
					c +=' 	<h4 class="border_heading">Configure Homepage Tabs</h4> '  
					c +='   <div class="row">'
					c +=' <div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='     <label><?=$lang_resource["WIDGET_DISPLAY_DELIVERY_TAB"]?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "delivery_tab", d,delivery_tab, false, "PanelSetting.ValueChangedWithType(this);PanelSetting.PreValidation()", false, false)
					c +='   </div>'
					c +='  </div>'<!--col-md-3-->
					c +='   <div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='     <label> <?=$lang_resource["WIDGET_DISPLAY_PICKUP_TAB"]?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "pickup_tab", d,pickup_tab, false, "", false, false)
					c +='    </div>'
					c +='   </div>'<!--col-md-3-->

					/*c +='   	<div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='       <label> <?=$lang_resource["WIDGET_DISPLAY_RESERVATION_TAB"]?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "reservation_tab", d,reservation_tab, false, "", false, false)
					c +='</div>'
					c +='   </div>'*/<!--col-md-3-->
					c +='   <div class="col-md-3">'
					c +='  	<div class="form-group"> ' 
					c +='      <label> <?=$lang_resource["WIDGET_DISPLAY_COUNTRY"]?></label>'  
					c +=Forms.CreateSelectPropertyAdmin("widget", "country_display", d,country_display, false, "", false, false)
					c +='   </div>'
					c +='  </div>'<!--col-md-3-->
					c +=' 	<div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='     <label> <?=$lang_resource["WIDGET_DISPLAY_CITY"]?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "city_display", d,city_display, false, "", false, false)
					c +='    </div>'
					c +='  </div>'<!--col-md-3-->
					c +='  </div>'<!--row-->
					c +='   <div class="row">'
					
					c +='   <div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='      <label> <?=$lang_resource["WIDGET_DISPLAY_OPTIONAL_FILETER"]?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "optional_display", d,optional_display, false, "", false, false)
					c +='  </div>'
					c +='  </div>'<!--col-md-3-->                      
					c +=' <div class="col-md-3">'
					c +=' <div class="form-group">'
					c +=' <label><?= $lang_resource["WIDGET_NEIGHBORHOOD"] ?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "neighborhood", d1,neighborhood, false, "", false, false)
					c +='  </div>'
					c +='  </div>'<!--col-md-3-->
					c +='  <div class="col-md-3">'
					c +=' <div class="form-group">'
					c +=' <div class="form-group">'
					c +=' <label><?=$lang_resource["WIDGET_DISPLAY_GEOLOCATION"]?></label>'
					c +=Forms.CreateSelectPropertyAdmin("widget", "geolocation_display", d,geolocation_display, false, "", false, false)
					c +='    </div>'                               

					c +='  </div>'
					c +='   </div>'<!--col-md-6-->
					c +=' </div>'<!--row-->

					c +=' 	<h4 class="border_heading"><?=$lang_resource["SHOW_DEFAULT_VALUE"]?></h4> '  
					c +='   <div class="row">'
					c +=' <div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='     <label><?=$lang_resource["DEFAULT_COUNTRY"]?></label>'
					//c +=Forms.CreateSelectPropertyAdmin("widget", "default_country", d,default_country, false, "", false, false)
					c +=Forms.CreateSelectPropertyAdmin("widget", "default_country", d7,default_country, true, "widgetSettingFinal.CountrySelected(this)")
					c +='   </div>'
					c +='  </div>'<!--col-md-3-->
					c +='   <div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='     <label> <?=$lang_resource["DEFAULT_CITY"]?></label>'
					
					//c +=Forms.CreateSelectPropertyAdmin("widget", "default_city", d,default_city, false, "", false, false)
					c +=Forms.CreateSelectPropertyAdmin("widget", "default_city", [],default_city, true, "widgetSettingFinal.CitySelected(this)") 
					c +='    </div>'
					c +='   </div>'<!--col-md-3-->

					c +='   	<div class="col-md-3">'
					c +=' 	<div class="form-group">'
					c +='   <label><?=$lang_resource["DEFAULT_ADDRESS_ZIPCODE"]?> </label>'
					c +=Forms.CreateInputPropertyPopup("widget", "default_address_zipcode",default_address_zipcode, false)
					c +='    </div>'		
					c +='   </div>'<!--col-md-3-->
					c +='   <div class="col-md-3">'
					c +='  	<div class="form-group"> ' 
					c +='   <label><?=$lang_resource["DEFAULT_NEIGHBOURHOOD"]?> </label>'
					//c +=Forms.CreateInputPropertyPopup("widget", "default_neighbourhood",default_neighbourhood, false)
					c +=Forms.CreateSelectPropertyAdmin("widget", "default_neighbourhood", [],default_neighbourhood, true) 
					c +='   </div>'
					c +='  </div>'<!--col-md-3-->
					c +='  </div>'<!--row-->

					c +=' 	<h4 class="border_heading"><?= $lang_resource["COLOR_FONT_SETTING"] ?></h4> '  
					c +='   <div class="row">'
					c +=' <div class="col-md-4">'
					c +=' 	<div class="form-group">'
					c +='     <label><?= $lang_resource["WIDGET_FONT_SIZE"] ?></label>'                                 
					c +=Forms.CreateSelectPropertyAdmin("widget", "font_size", d2,font_size, false, "", false, false)
					c +='   </div>'                           
					c +='   </div>'<!--col-md-4-->
					c +='   	<div class="col-md-4">'
					c +=' 	<div class="form-group">'
					c +='   <label><?= $lang_resource["WIDGET_RESERVATION_POPUP_HEADER_COLOR"] ?> </label>'
					c +=Forms.CreateInputPropertyPopupWithColor("widget", "popup_color",popup_color, false)
					c +='    </div>'		
					c +='   </div>'<!--col-md-4-->
					c +='   <div class="col-md-4">'
					c +='  	<div class="form-group"> ' 
					c +='    <label><?= $lang_resource["WIDGET_COLOR"] ?></label>'
					c +=Forms.CreateInputPropertyPopupWithColor("widget", "background_color",background_color, false)
					c +='   </div>'
					c +='  </div>'<!--col-md-4-->
					c +='  </div>'<!--row-->

					c +='   <div class="row">'                        	
					c +='   	<div class="col-md-4">'
					c +=' 	<div class="form-group">'
					c +='   <label><?= $lang_resource["WIDGET_BUTTON_COLOR"] ?></label>'
					c +=Forms.CreateInputPropertyPopupWithColor("widget", "button_color",button_color, false) 
					c +='    </div>'		
					c +='   </div>'<!--col-md-4-->
					c +='   <div class="col-md-4">'
					c +='  	<div class="form-group"> ' 
					c +='   <label><?= $lang_resource["WIDGET_FONT_COLOR"] ?></label>'
					c +=Forms.CreateInputPropertyPopupWithColor("widget", "font_color",font_color, false)
					c +='   </div>'
					c +='  </div>'<!--col-md-4-->
					c +='  </div>'<!--row-->


					c +=' 	<h4 class="border_heading"><?= $lang_resource["DIRECT_BUSINESS"] ?></h4> '  
					c +='   <div class="row">'
					c +=' <div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='     <label><?= $lang_resource["DEFAULT_BUSINESS"] ?></label>'                                 
					c +=Forms.CreateSelectPropertyAdmin("widget", "default_business", d3,default_business, true, "widgetSettingFinal.BusinessSelected(this)")
					c +='   </div>'                           
					c +='   </div>'<!--col-md-6-->
					c +='   	<div class="col-md-6">'
					c +=' 	<div class="form-group">'					
					c +='   <label><?= $lang_resource["DEFAULT_CATEGORY"] ?></label>'				
					c +=Forms.CreateSelectPropertyAdmin("widget", "default_category", [],default_category, true, "") 
					c +='    </div>'		
					c +='   </div>'<!--col-md-6-->

					c +='  </div>'<!--row-->

					c +=' 	<h4 class="border_heading"><?= $lang_resource["OTHER_SETTINGS"] ?></h4> ' 

					c +='   <div class="row">'
					c +=' <div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='     <label><?= $lang_resource["WIDGET_NAME"] ?></label>'
					c +=Forms.CreateInputPropertyPopup("widget", "widget_name",widget_name, false,"widgetSettingFinal.PreValidation()")
					c +='<small data-bv-validator="notEmpty" class="help-block" id="widget_name_text" style="color:#F00; display:none;"><?= $lang_resource['ADMIN_PAGE_NAME_IS_REQUIRED_WIDGETNAME'] ?></small>'
					c +='   </div>'                           
					c +='   </div>'<!--col-md-6-->
					c +='   	<div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='   <label><?= $lang_resource["WIDGET_WIDTH"] ?> % </label>'
					c +=Forms.CreateInputPropertyPopup("widget", "width",width, false,"widgetSettingFinal.PreValidation()",false, false,"return Main.IsNumberKey(event)")
					c +='<small data-bv-validator="notEmpty" class="help-block" id="width_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_WIDTH_REQUIRED'] ?></small>'
					c +='    </div>'		
					c +='   </div>'<!--col-md-6-->
					c +='  </div>'<!--row-->
					
					c +='   <div class="row">'
					c +=' <div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='     <label><?= $lang_resource["SKIP_HOMEPAGE"] ?></label>'                                
					c +=Forms.CreateSelectPropertyAdmin("widget", "skip_homepage",d,skip_homepage, false, "", false, false)
					c +='   </div>'                           
					c +='   </div>'<!--col-md-6-->
					c +='   	<div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='   <label><?= $lang_resource["SKIP_BUSINESS_LISTING"] ?> </label>'                                    
					c +=Forms.CreateSelectPropertyAdmin("widget", "skip_business_listing",d,skip_business_listing, false, "", false, false)
					c +='    </div>'		
					c +='   </div>'<!--col-md-6-->
					c +='  </div>'<!--row-->
					
					c +='   <div class="row">'
					c +=' <div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='     <label><?= $lang_resource["CUSTOMER_FOOTER_TEXT"] ?> </label>'
					c +=Forms.CreateInputPropertyPopup("widget", "footer_text",footer_text, false)
					c +='   </div>'                           
					c +='   </div>'<!--col-md-6-->
					c +='   	<div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +=' <label><?= $lang_resource["WIDGET_BUTTON_TEXT"] ?></label>'
					c +=Forms.CreateInputPropertyPopup("widget", "button_Text",button_Text, false)
					c +='    </div>'		
					c +='   </div>'<!--col-md-6-->

					c +='  </div>'<!--row-->
					c +='   <div class="row">'
					c +=' <div class="col-md-6">'
					c +=' 	<div class="form-group">'
					c +='     <label><?= $lang_resource["MOBILE_RESPONSIVE"] ?></label>'                                
					c +=Forms.CreateSelectPropertyAdmin("widget", "mobile_responsive",d,mobile_responsive, false, "", false, false)
					c +='   </div>'                           
					c +='   </div>'<!--col-md-6-->                     

					c +='  </div>'<!--row-->



					c +=' <div class="row">'
					c +=' <div class="col-md-3">'
					c +=' 	<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="widgetSettingFinal.createembadedcode('+id+')" ><?= $lang_resource["WIDGET_EMBADED_CODE1"] ?></button></center> '
					c +='  </div>'<!--col-md-4-->
					c +='  </div>'<!--row--> 
					c +='  </div>'
					c +='  <div class="row" id="emdiv" style="display:none;margin-top:10px;" >'
					c +=' <div class="col-md-12">'
					/*c +=' <div class="form-group">'
					c +=' <label><?= $lang_resource["WIDGET_BUTTON_TEXT"] ?></label>'
					c +='<textarea id="embaededtxt" class="form-control " readonly="readonly"   style="width: 928px; height: 193px;" ></textarea>'
					c +='  </div>'*/
					c +='  </div>'<!--col-md-12-->
					c +=' </div>'<!--row-->

					c +=' </div>'
					c +=' 	</div>'

					//c +='<div id="widgetlist"></div>'

					
	
	document.getElementById("widgetedit").innerHTML = c;
	
	$('.demo').each( function() {			              
			$(this).minicolors({
				control: $(this).attr('data-control') || 'hue',
				defaultValue: $(this).attr('data-defaultValue') || '',
				inline: $(this).attr('data-inline') === 'true',
				letterCase: $(this).attr('data-letterCase') || 'lowercase',
				opacity: $(this).attr('data-opacity'),
				position: $(this).attr('data-position') || 'bottom left',
				change: function(hex, opacity) {
					if( !hex ) return;
					if( opacity ) hex += ', ' + opacity;
					try {

						console.log(hex);
					} catch(e) {}
				},
				theme: 'bootstrap'
			});
			
		});
		
		if(m){	
	if(default_category){
	widgetSettingFinal.PopulateCategorySelect(default_business, default_category);	
	}
	widgetSettingFinal.PopulateCitySelected(default_country,default_city);
	if(default_neighbourhood){
	widgetSettingFinal.PopulateNeighborhoodSelect(default_city,default_neighbourhood);
	}
	
	}
	},
	
	SetEnabled: function (id,status) {
		//alert(status);
		var ena ='';
		if(status =='f'){
			ena ='TRUE';
		}else{
			ena ='FALSE';
		}
		
        $.post("lib/widget.php", "f=SetEnabled&id=" + id + "&enabled=" + ena, function (c) {
			$.post("lib/widget.php", "f=FetchAllWidgetData", function (all) {				
				Main.Ready();	
				widgetSettingFinal.allwidget =  JSON.parse(all);
				var dd ='';	
				widgetSettingFinal.PrintMain(dd);						
			});
			if(c == 't'){
				$("td div#idd"+id+" a").removeClass("close");
				$("td div#idd"+id+" a").addClass("open");
			}else {
				$("td div#idd"+id+" a").removeClass("open");
				$("td div#idd"+id+" a").addClass("close");
			}	
        });
    },
	
	
	   	

	BusinessSelected: function (a) {
		//alert(a.options[a.selectedIndex].value);
		widgetSettingFinal.PopulateCategorySelect(a.options[a.selectedIndex].value)		
	},
	PopulateCategorySelect: function (c,b) {		
		
		$.post("lib/widget.php", "f=FetchAllCategoryData&data=" + c, function (g) {
			
			if (g != "") {
				var f = JSON.parse(g);
				//alert(JSON.stringify(f));	
				
				var e = document.getElementById("default_category");
				e.options.length = 0;
				e.options[e.options.length] = new Option("", "");
								
				for (var d in f) {	
					if (b) {
                        if (f[d].id == b) {
                            h = d;
                            j = true
                        }
                    }
					e.options[e.options.length] = new Option(f[d].name, f[d].id)
				}					
				if (b && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.widgetSettingFinal.fields.default_category.value = "";
                   
                }				
			}
		})    
	},
	
	CountrySelected: function (a1) {
		//alert(a.options[a.selectedIndex].value);
		widgetSettingFinal.PopulateCitySelected(a1.options[a1.selectedIndex].value)		
	},
	PopulateCitySelected: function (c1,b17) {	

		/*Main.Loading();
		var a1 = new Date().getTime();
		Main.Aid = a1;
		if (!c1) {
			c1 = -1
		}*/

		$.post("lib/widget.php", "f=FetchAllCityData&data=" + c1, function (g1) {
			/*if (a1 != Main.Aid) {			
				 return
			}
			

			Main.Ready();*/
			if (g1 != "") {
			
				var f1 = JSON.parse(g1);
				//alert(JSON.stringify(f));	
				
				var e1 = document.getElementById("default_city");
				e1.options.length = 0;
				e1.options[e1.options.length] = new Option("", "");
					 var h3 = 0;
                var j3 = false;			
				for (var d1 in f1) {
				
					if (b17) {
					
                        if (f1[d1].id == b17) {
                            h3 = d1;
                            j3 = true
                        }
                    }
					e1.options[e1.options.length] = new Option(f1[d1].name, f1[d1].id)
				}
				
				if (b17 && j3) {
									
                    e1.selectedIndex = parseInt(h3) + 1
                } else {
                    Forms.Form.widgetSettingFinal.fields.default_city.value = "";
                   
                }	
						
				//Forms.Form.widgetSettingFinal.fields.default_city.value = "";				
			}
		})  
	},
	
	CitySelected: function (a12) {
		//alert(a1.options[a1.selectedIndex].value);
		widgetSettingFinal.PopulateNeighborhoodSelect(a12.options[a12.selectedIndex].value)		
	},
	PopulateNeighborhoodSelect: function (c12, b18) {
		
		Main.Loading();
		var a18 = new Date().getTime();
		Main.Aid = a18;
		if (!c12) {
			c12 = -1
		}
		var contry = $("#default_country").val();
		$.post("lib/widget.php", "f=FetchAllNeighborhoodData&city=" + c12+"&contry="+contry, function (g12) {
			if (a18 != Main.Aid) {			
				 return
			}
			//alert(g);
			Main.Ready();
			if (g12 != "") {
				var f12 = JSON.parse(g12);
				//alert(JSON.stringify(f));	
				
				var e2 = document.getElementById("default_neighbourhood");
				e2.options.length = 0;
				e2.options[e2.options.length] = new Option("", "");
					var h4 = 0;
                var j4 = false;			
				for (var d12 in f12) {
					if (b18) {
                        if (f12[d12].id == b18) {
                            h4 = d12;
                            j4 = true
                        }
                    }	
					e2.options[e2.options.length] = new Option(f12[d12].name, f12[d12].id)
				}
				if (b18 && j4) {				
                    e2.selectedIndex = parseInt(h4) + 1
                } else {
                    Forms.Form.widgetSettingFinal.fields.default_neighbourhood.value = "";
                   
                }			
				//Forms.Form.widgetSettingFinal.fields.default_neighbourhood.value = "";				
			}
		})    
	},
	
	PreValidation: function(){
        var count = 0;  
        
        if(document.getElementById("widget_name").value == ""){            
            $("#widget_name_text").show();
            $("#widget_name").addClass("error-text-field");
            $("#widget_name").removeClass("success-text-field");
            count ++;
        }else{
            $("#widget_name_text").hide();
            $("#widget_name").addClass("success-text-field");
            $("#widget_name").removeClass("error-text-field");
        }
		
		if(document.getElementById("width").value == ""){            
            $("#width_text").show();
            $("#width").addClass("error-text-field");
            $("#width").removeClass("success-text-field");
            count ++;
        }else{
            $("#width_text").hide();
            $("#width").addClass("success-text-field");
            $("#width").removeClass("error-text-field");
        }
		
		
		

            
        if(count == 0)
            return true
        else 
            return false
        
       
    },
	
		
	createembadedcode:function(id){
		
		
		
		if(document.getElementById("delivery_tab").value == 'f' && document.getElementById("pickup_tab").value == 'f'){
			alert("Please select 'YES' any one from delivery tab,pick up tab and reservation tab");
			return false;
		}
		if(document.getElementById("country_display").value == 't' && document.getElementById("city_display").value == 'f'){
			alert("Please select 'YES' for display city");
			return false;
		}
		
		if(document.getElementById("geolocation_display").value == 'f' && document.getElementById("neighborhood").value == 'f'){
			alert("Please select 'YES' any one from Area / Neighborhood and Display geolocation button tab");
			return false;
		}else if(document.getElementById("geolocation_display").value == 't' && document.getElementById("neighborhood").value == 't'){	
		alert("Please select 'YES' any one from Area / Neighborhood and Display geolocation button tab");
			return false;
		
		}
		
		if(widgetSettingFinal.PreValidation() !=true){
            return
        }
		
		
        delivery_tab=document.getElementById("delivery_tab").value;
        pickup_tab=document.getElementById("pickup_tab").value;
        //reservation_tab=document.getElementById("reservation_tab").value;
        country_display=document.getElementById("country_display").value;
        city_display=document.getElementById("city_display").value;
        optional_display=document.getElementById("optional_display").value;
        geolocation_display=document.getElementById("geolocation_display").value;
		neighborhood=document.getElementById("neighborhood").value;
		width=document.getElementById("width").value;
		
		default_country=document.getElementById("default_country").value;
		default_city=document.getElementById("default_city").value;
		default_address_zipcode=document.getElementById("default_address_zipcode").value;
		default_neighbourhood=document.getElementById("default_neighbourhood").value;
		
		
       
        background_color=document.getElementById("background_color").value;
		font_size=document.getElementById("font_size").value;
		font_color=document.getElementById("font_color").value;
		popup_color=document.getElementById("popup_color").value;
		button_color=document.getElementById("button_color").value;
		
		default_business=document.getElementById("default_business").value;
		default_category=document.getElementById("default_category").value;
		
		widget_name=document.getElementById("widget_name").value;
		skip_homepage=document.getElementById("skip_homepage").value;
		skip_business_listing=document.getElementById("skip_business_listing").value;
		footer_text=document.getElementById("footer_text").value;			
		mobile_responsive=document.getElementById("mobile_responsive").value;
		button_Text=document.getElementById("button_Text").value;  
		widget=new Array();
		widget = new Object();
		widget.delivery_tab=delivery_tab;
		widget.pickup_tab=pickup_tab;
		//widget.reservation_tab=reservation_tab;
		widget.country_display=country_display;
		
		widget.city_display=city_display;
		widget.optional_display=optional_display;
		widget.geolocation_display=geolocation_display;
		widget.neighborhood=neighborhood;
		
		widget.default_country=default_country;
		widget.default_city=default_city;
		widget.default_address_zipcode=default_address_zipcode;
		widget.default_neighbourhood=default_neighbourhood;
			

		widget.background_color=background_color;
		widget.font_size=font_size;
		widget.font_color=font_color;
		widget.popup_color=popup_color;
		widget.width=width;

		widget.button_color=button_color;
		
		widget.default_business=default_business;
		widget.default_category=default_category;
		widget.widget_name=widget_name;
		widget.skip_homepage=skip_homepage;  
		widget.skip_business_listing=skip_business_listing;
		widget.footer_text=footer_text;
		widget.mobile_responsive=mobile_responsive;
		
		widget.button_Text=button_Text;
        //alert(JSON.stringify(widget)); 
		$("#emdiv").show();
		main_site_url=$("#main_site_url").val();
		url=main_site_url+'/superadminwidget/widget.php?data='+encodeURIComponent(JSON.stringify(widget));
		
		
		var emtxt='<div id="main-online-shop"><iframe src="'+url+'" width="'+width+"%"+'"  scrolling="auto"  style="height:100%;width:'+width+"%"+'" frameborder="0"></iframe><script type="text/javascript" src="'+main_site_url+'/widgetscriptiframe.js"></script></div>';
		
		//var emtxt='<div style="height:450px"><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0px;padding:0px;"><iframe src="'+url+'" width="'+width+' %"  scrolling="auto"  style="overflow:hidden;height:100%;width:'+width+" %"+'" frameborder="0"></iframe></body></div>';
		
		//emtxt='<iframe src="'+url+'" scrolling="no" style="width: '+width+'px; height: 470px;" frameborder="0"></iframe>';
		$("#embaededtxt").val(emtxt);		   
		//console.log(JSON.stringify(widget));*/
			
		if(id){
			$.post("lib/widget.php", "f=SaveEditwidget&data="+ JSON.stringify(widget)+"&id="+id,  function (c) {				
				$.post("lib/widget.php", "f=FetchAllWidgetData", function (all) {				
					Main.Ready();	
					widgetSettingFinal.allwidget =  JSON.parse(all);
					alert('<?=$lang_resource['SUCCESSFULLY_UPDATED']?>');
					widgetSettingFinal.WidgetList();
					var dd ='';	
					widgetSettingFinal.PrintMain(dd);
					Popup.Close();	
				});		
			});
		}else{	
			$.post("lib/widget.php", "f=Savewidget&data=" + JSON.stringify(widget), function (f){						
				Main.Ready();
				alert("<?=$lang_resource['WIDGET_INSERTED']?>")	
				widgetSettingFinal.WidgetList();		
				widgetSettingFinal.Main();		
			}); 
		}	
    
    },

	Edit: function (a) {
        var d = false;
        if (a) {
            d = true
        } else {
			
            var c = Main.GetMarkedCheckBoxesValues();			
            if (c.length == 1) {
                a = c[0];				
                d = true
            }else if(c.length > 1){
				alert("<?=$lang_resource['BUSINESS_REVIEW_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_REVIEW_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
		
		if(d){            
            Main.Loading();
            $.post("lib/widget.php", "f=FetchWidgetDataById&id=" + a, function (c) {
				//alert(c);				
                if(c != ""){         
					//widgetSettingFinal.Form(JSON.parse(c))					
                     Main.Ready();
                     widgetSettingFinal.PrintMain(c);
               
				}
			});
        }
    },

	Form: function (e) {
		//var e11 = e;					
        var k = "";
        Forms.Clean("wid", "mainbuttonok");
			k+='<div class="mfp-with-anim mfp-hide">'
				k +='<h3 class="popup-heading"><?=$lang_resource['EDIT_WIDGET']?></h3>'
				/*var s1 = '['+e11[0].widget+']';
					//alert(s1);
					s1 = JSON.parse(s1);
				for (var u in s1) {
					alert(s1[u].delivery_tab);
				}	*/			
				/*k +='<div class="row">'
					k +='<div class="col-md-12">'
						k +='<div class="form-group">'
							k +='<label>'+ e11[u].widget_name +'</label> <span class="pull-right">'+ e11[u].date +'</span>'						
							k +=Forms.CreateTextAreaPropertyPopup("wid", "widget",e11[u].widget, false,"", false, false, "")
						 k +='</div>'
					k +='</div>'<!--col-md-12-->
				k +='</div>'<!--row-->		
				}
				k +='<div class="row">'
					k +='<div class="col-md-6 col-md-offset-3">'
						k +='<input type="hidden" id="id" value="'+e11[u].id+'">'
						k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="widgetSettingFinal.Save()"><?=$lang_resource['BUSINESSREVIEW_UPDATE']?></button></center>'
					k +='</div>'
				k +='</div>'*/
			k +='</div>'	
		Popup.Show(k);     
        
    },

	Delete: function () {    
        var b = Main.GetMarkedCheckBoxesValues();		
        if (b.length == 0) {
			alert("<?=$lang_resource['BUSINESSREVIEW_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
    
		$.fn.jAlert({
			'message': '<?=$lang_resource['WIDGET_DELETE_MSG']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/widget.php", "f=DeleteWidget&data=" + JSON.stringify(a),  function (c) {
						alert('<?=$lang_resource['BUSINESSREVIEW_DELETE_SUCCESS']?>');
						widgetSettingFinal.Main()

					});
				}
				},
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
		'closeBtn': false

		});
    },	
	
	Save: function () {
		var widget = encodeURIComponent(JSON.stringify(document.getElementById("widget").value));
		var id = document.getElementById("id").value;						
			$.post("lib/widget.php", "f=SaveEditwidget&data="+widget+"&id="+id,  function (c) {				
			$.post("lib/widget.php", "f=FetchAllWidgetData", function (all) {				
				Main.Ready();	
				widgetSettingFinal.allwidget =  JSON.parse(all);
				alert('<?=$lang_resource['SUCCESSFULLY_UPDATED']?>');
				var dd ='';	
				widgetSettingFinal.PrintMain(dd);
				Popup.Close();	
			});		
			}); 
		
    },
	
	View: function () {
		var b = Main.GetMarkedCheckBoxesValues();			
        var a = new Object();
        a.ids = b;		
		$.post("lib/widget.php", "f=ViewWidgetData&data=" + JSON.stringify(a),  function (c1) {		
	
			if(c1 != ""){         
				widgetSettingFinal.Form1(JSON.parse(c1))
				Main.Ready();        
               
			}

		});
		
	},
	
	Form1: function (e1) {		
	
		var e12 = e1;	
						
        var l = "";
			Forms.Clean("wid", "mainbuttonok");	
			l+='<div class="mfp-with-anim mfp-hide">'
			l +='<h3 class="popup-heading"><?=$lang_resource['VIEW_WIDGET']?></h3>'
			for (var u1 in e12) {
				
			var widgetlist = e12[u1].widget;
			
			l +='<div class="row">'
				l +='<div class="col-md-12">'
					l +='<div class="form-group">'
						l +='<label>'+ e12[u1].widget_name +'</label> <span class="pull-right">'+ e12[u1].date +'</span>'
						main_site_url=$("#main_site_url").val();
						
					
						
						url=main_site_url+'/d2lkZ2V0VGhlbWU=?'+e12[u1].id;
						var emtxt='<div id="main-online-shop"><iframe onload="resizeIframe(this)" id="idIframe" src="'+url+'" width="'+widgetlist.width+"%"+'"  scrolling="auto"  style="width:'+widgetlist.width+"%"+'" frameborder="0"></iframe><script type="text/javascript" src="'+main_site_url+'/widgetscriptiframe.js"></script></div>';
						
						l +='<textarea class="form-control rounded" readonly="readonly" style="height:150px;">'+emtxt+'</textarea>'
					 l +='</div>'
				l +='</div>'<!--col-md-12-->
			l +='</div>'<!--row-->
			l +='</div>'<!--row-->		
			}  
         		
		Popup.Show(l);
        
    },	
};    
   