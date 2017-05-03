var widgetSetting = {
		Main: function () {
		
			widgetSetting.PrintMain();
		
	},
	
		PrintMain: function(){
		Forms.Clean("widget", "mainbuttonok");
		var c="";	
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
   var d = new Array();
        d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"f","caption":"No"}'));
		   var d1 = new Array();
		     d1.push(JSON.parse('{"id":"f","caption":"No"}'));
        d1.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      
		c +='<div class="panel panel-danger panel-square panel-no-border">'
							c +='  <div class="panel-heading panel-heading">'
                           c +='   <div class="row">'
                              c +='  <div class="col-md-6">'
                               c +='     <h3 class="panel-title"> <?=$lang_resource["WIDGET"]?></h3>'
                                c +='    </div>'
        					  c +=' </div>'

             c +='   </div>'
					 c +=' 	<div class="panel-body"> '
                       c +='   <div class="row">'
                        	 c +=' <div class="col-md-6">'
                             c +=' 	<div class="form-group">'
                                c +='     <label><?=$lang_resource["WIDGET_DISPLAY_DELIVERY_TAB"]?></label>'
                                 c +=Forms.CreateSelectPropertyAdmin("widget", "delivery_tab", d,'', false, "PanelSetting.ValueChangedWithType(this);PanelSetting.PreValidation()", false, false)
                                c +='   </div>'
                            c +='  </div>'<!--col-md-6-->
                           c +='   <div class="col-md-6">'
                             c +=' 	<div class="form-group">'
                                 c +='     <label> <?=$lang_resource["WIDGET_DISPLAY_PICKUP_TAB"]?></label>'
                                     c +=Forms.CreateSelectPropertyAdmin("widget", "pickup_tab", d,'', false, "", false, false)
                               c +='    </div>'
                           c +='   </div>'<!--col-md-6-->
                     c +='     </div>'<!--row-->
                      c +='    <div class="row">'
                       c +='   	<div class="col-md-6">'
                             c +=' 	<div class="form-group">'
                              c +='       <label> <?=$lang_resource["WIDGET_DISPLAY_RESERVATION_TAB"]?></label>'
                                    c +=Forms.CreateSelectPropertyAdmin("widget", "reservation_tab", d,'', false, "", false, false)
                               c +='</div>'
                           c +='   </div>'<!--col-md-6-->
                           c +='   <div class="col-md-6">'
                            c +='  	<div class="form-group"> ' 
                                c +='      <label> <?=$lang_resource["WIDGET_DISPLAY_COUNTRY"]?></label>'  
                                     c +=Forms.CreateSelectPropertyAdmin("widget", "country_display", d,'', false, "", false, false)
                                c +='   </div>'
                            c +='  </div>'<!--col-md-6-->
                        c +='  </div>'<!--row-->
                       c +='   <div class="row">'
                         c +=' 	<div class="col-md-6">'
                             c +=' 	<div class="form-group">'
                                c +='     <label> <?=$lang_resource["WIDGET_DISPLAY_CITY"]?></label>'
                                    c +=Forms.CreateSelectPropertyAdmin("widget", "city_display", d,'', false, "", false, false)
                               c +='    </div>'
                            c +='  </div>'<!--col-md-6-->
                           c +='   <div class="col-md-6">'
                             c +=' 	<div class="form-group">'
                                 c +='      <label> <?=$lang_resource["WIDGET_DISPLAY_OPTIONAL_FILETER"]?></label>'
                                      c +=Forms.CreateSelectPropertyAdmin("widget", "optional_display", d,'', false, "", false, false)
                                 c +='  </div>'
                            c +='  </div>'<!--col-md-6-->
                      c +='    </div>'<!--row-->
					   c +='  <div class="row">'
                        	 c +=' <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                   c +=' <label><?= $lang_resource["WIDGET_NEIGHBORHOOD"] ?></label>'
                                     c +=Forms.CreateSelectPropertyAdmin("widget", "neighborhood", d1,'', false, "", false, false)
                                 c +='  </div>'
                            c +='  </div>'<!--col-md-6-->
							c +='  <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                   c +='   <label><?= $lang_resource["WIDGET_RESERVATION_POPUP_HEADER_COLOR"] ?> </label>'
                                    c +=Forms.CreateInputPropertyPopup("widget", "popup_color",'', false)
                                    
                                 c +='  </div>'
                           c +='   </div>'<!--col-md-6-->
                         c +=' </div>'<!--row-->
                      c +='    <div class="row">'
                        	 c +=' <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                    c +=' <label><?=$lang_resource["WIDGET_DISPLAY_GEOLOCATION"]?></label>'
                                           c +=Forms.CreateSelectPropertyAdmin("widget", "geolocation_display", d,'', false, "", false, false)
                               c +='    </div>'
                            c +='  </div>'<!--col-md-6-->
                            c +='  <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                   c +='   <label><?= $lang_resource["WIDGET_WIDTH"] ?> </label>'
                                    c +=Forms.CreateInputPropertyPopup("widget", "width",'', false)
                                    
                                 c +='  </div>'
                           c +='   </div>'<!--col-md-6-->
                        c +='  </div>'<!--row-->
                        c +='  <div class="row">'
                        	 c +=' <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                c +='    <label><?= $lang_resource["WIDGET_COLOR"] ?></label>'
                                      c +=Forms.CreateInputPropertyPopup("widget", "background_color",'', false)
                                 c +='  </div>'
                            c +='  </div>'<!--col-md-6-->
                            c +='  <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                   c +='   <label><?= $lang_resource["WIDGET_FONT_SIZE"] ?></label>'
                                     c +=Forms.CreateInputPropertyPopup("widget", "font_size",'', false)                         
                                c +='   </div>'
                            c +='  </div>'<!--col-md-6-->
                        c +='  </div>'<!--row-->
                      c +='    <div class="row">'
                        	 c +=' <div class="col-md-6">'
                             c +=' 	<div class="form-group">'
                                 c +='   <label><?= $lang_resource["WIDGET_FONT_COLOR"] ?></label>'
                                     c +=Forms.CreateInputPropertyPopup("widget", "font_color",'', false)
                                 c +='  </div>'
                            c +='  </div>'<!--col-md-6-->
                           c +='   <div class="col-md-6">'
                            	 c +=' <div class="form-group">'
                                   c +='   <label><?= $lang_resource["WIDGET_BUTTON_COLOR"] ?></label>'
                                     c +=Forms.CreateInputPropertyPopup("widget", "button_color",'', false)                     
                               c +='    </div>'
                           c +='   </div>'<!--col-md-6-->
                        c +='  </div>'<!--row-->
						
                        c +='  <div class="row">'
                        	 c +=' <div class="col-md-12">'
                            	 c +=' <div class="form-group">'
                                   c +=' <label><?= $lang_resource["WIDGET_BUTTON_TEXT"] ?></label>'
                                     c +=Forms.CreateInputPropertyPopup("widget", "button_Text",'', false)
                                 c +='  </div>'
                            c +='  </div>'<!--col-md-12-->
                         c +=' </div>'<!--row-->
						 
                         c +=' <div class="row">'
                        	 c +=' <div class="col-md-4">'
                             c +=' 	<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="widgetSetting.createembadedcode()" ><?= $lang_resource["WIDGET_EMBADED_CODE1"] ?></button></center> '
                            c +='  </div>'<!--col-md-4-->
                        c +='  </div>'<!--row--> 
						
						c +='  <div class="row" id="emdiv" style="display:none;margin-top:10px;" >'
                        	 c +=' <div class="col-md-12">'
                            	 c +=' <div class="form-group">'
                                   c +=' <label><?= $lang_resource["WIDGET_BUTTON_TEXT"] ?></label>'
                                     c +='<textarea id="embaededtxt" class="form-control " readonly="readonly"   style="width: 928px; height: 193px;" ></textarea>'
                                 c +='  </div>'
                            c +='  </div>'<!--col-md-12-->
                         c +=' </div>'<!--row-->
						             
                         c +=' </div>'
                        			 c +=' 	</div>'
		
		document.getElementById("main").innerHTML = c;
		},
		

	createembadedcode:function(){
        delivery_tab=document.getElementById("delivery_tab").value;
        pickup_tab=document.getElementById("pickup_tab").value;
        reservation_tab=document.getElementById("reservation_tab").value;
        country_display=document.getElementById("country_display").value;
        city_display=document.getElementById("city_display").value;
        optional_display=document.getElementById("optional_display").value;
        geolocation_display=document.getElementById("geolocation_display").value;
		neighborhood=document.getElementById("neighborhood").value;
       width=document.getElementById("width").value;
       
          background_color=document.getElementById("background_color").value;
           font_size=document.getElementById("font_size").value;
            font_color=document.getElementById("font_color").value;
			popup_color=document.getElementById("popup_color").value;
            button_color=document.getElementById("button_color").value;
            button_Text=document.getElementById("button_Text").value;
            widget=new Array();
            widget = new Object();
           widget.delivery_tab=delivery_tab;
            widget.pickup_tab=pickup_tab;
             widget.reservation_tab=reservation_tab;
              widget.country_display=country_display;
               widget.city_display=city_display;
              widget.optional_display=optional_display;
            widget.geolocation_display=geolocation_display;
			   widget.neighborhood=neighborhood;
           
              widget.background_color=background_color;
              widget.font_size=font_size;
            widget.font_color=font_color;
			  widget.popup_color=popup_color;
			
             widget.button_color=button_color;
              widget.button_Text=button_Text;
           
          $("#emdiv").show();
          main_site_url=$("#main_site_url").val();
          url=main_site_url+'/widget/widget.php?data='+encodeURIComponent(JSON.stringify(widget));
          emtxt='<iframe src="'+url+'" scrolling="no" style="width: '+width+'px; height: 470px;" frameborder="0"></iframe>';
           $("#embaededtxt").val(emtxt);
          
    console.log(JSON.stringify(widget));
    
    
    },
	
	
};