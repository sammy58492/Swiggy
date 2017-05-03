var Button_Widget={
	
	Main:function(){
	
		$.post("lib/business.php", "f=FetchWidgetButton&id="+Business.id, function (a){
           // alert(e)
		   
             if(a !=""){
             	Button_Widget.Button_Widget = JSON.parse(a);
          Button_Widget.PupulateTable(JSON.parse(a));
		  
        }
    });

	},

  PupulateTable:function()
    {
        var d = "";

        var b = this.Button_Widget.length;
        var j = true;
        var g = "";
         var f = new Array();
        var l = new Array();
        //alert(JSON.stringify(Business_Review.Business_Review));
        for (var e in Button_Widget.Button_Widget) {
             f.push(Button_Widget.Button_Widget[e])
            j = true;
            if (j) {
                d += '<tr>'
                d += '<td>'+ this.Button_Widget[e].id +'</td>'
                
                d += '<td><input type="checkbox" class="Button_Widget checkbox" value="' + this.Button_Widget[e].id + '"></td>'
      
                d += '<td class="hand" onclick="Button_Widget.Edit(' + this.Button_Widget[e].id + ')">'+ Main.NullToEmpty(this.Button_Widget[e].name) +'</td>'
                
                d += '<td class="hand" onclick="Button_Widget.Edit(' + this.Button_Widget[e].id + ')">' + this.Button_Widget[e].date +'</td>'

                d += '<td><div class="enebal" id="switchbutton_' + this.Button_Widget[e].id + '"></div></td>'
            }
        }
        
            document.getElementById("buttondata").innerHTML = d;

            var h = false;
        //Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switchbutton_" + f[d].id, h);
            Switch.OnChange("switchbutton_" + f[d].id, function (l, i) {
                Button_Widget.SetEnabled(l.replace("switchbutton_", ""), i)
            })
        }
    },

     SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/business.php", "f=SetEnabledbutton&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switchbutton_" + b, !a)
            }

        })
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
        
         if (d) {
            
            
            Main.Loading();
           //alert(a)
            $.post("lib/business.php", "f=FetchButtonWidgetData&id=" + a, function (c) {
                //alert(c)
                if(c != ""){
                  
                  
                 // Estr = "true"
            
                   
                      //$("#read").show()
                       Button_Widget.Form(JSON.parse(c))
                      Main.Ready();
                      //alert("Processing..")
                    
                  
                 


                }
            });
         }
    },

    Form: function (e) {

        var k = "";
        Forms.Clean("createButton", "mainbuttonok");
        if (e == null) {
            e = new Object();

            Forms.Form.createButton.type = "create"
        } else {
            Forms.Form.createButton.type = "modify";
            Forms.Form.createButton.id = e[0].id;
            // alert(JSON.stringify(e));
            // alert(e[0].width)
            
        }
         var ef=JSON.parse(e[0].embedded_code);
            //alert(ef.lookoption);
        
        if (Forms.Form.createButton.type == "create") {
        k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_BUTTON']?></h3>'
        }else{

         k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_BUTTON']?></h3>'
        }



          
        //k+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
       k+='<input type="hidden" value="'+e[0].id+'" id="ID">'
       
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        var u = '[{"id":"","caption":"Select"},{"id":"rounded","caption":"Rounded"}, {"id":"squared","caption":"Squared"}]';
        u = JSON.parse(u);
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_LOOK_OPTION']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "LOOK_OPTION", u,ef.lookoption,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_LOOK_OPTION" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_LOOK_OPTION']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_BUTTON_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createButton", "BUTTONCOLOR", ef.buttoncolor, false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTONCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_BUTTON_COLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='</div>'<!--row-->
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_TEXT_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createButton", "TEXT_COLOR",Main.NullToEmpty(ef.textcolor), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_TEXT_COLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_TEXT_COLOR']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->
        var m = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"aerial","caption":"Aerial"},{"id":"Times New Roman","caption":"Times New Roman"}]';
        
        m = JSON.parse(m);

        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_TEXT_FONT']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "TEXT_FONT", m,ef.textfont , false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_TEXT_FONT" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_TEXTFONT']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->
        k+='</div>'<!--row-->

        var n = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"small","caption":"<?=$lang_resource['BUTTON_BUTTON_SIZE_SMALL'] ?>"},{"id":"medium","caption":"<?=$lang_resource['BUTTON_BUTTON_SIZE_MEDIUM'] ?>"},{"id":"large","caption":"<?=$lang_resource['BUTTON_BUTTON_SIZE_LARGE'] ?>"},{"id":"extra large","caption":"<?=$lang_resource['BUTTON_BUTTON_SIZE_EXLARGE'] ?>"}]';
        n = JSON.parse(n);
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_BUTTON_SIZE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_SIZE", n,ef.buttonsize,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_SIZE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_SIZE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        
        var p = '[{"id":"","caption":"Select"},{"id":"12px","caption":"12px"}, {"id":"14px","caption":"14px"},{"id":"16px","caption":"16px"},{"id":"18px","caption":"18px"},{"id":"22px","caption":"22px"},{"id":"24px","caption":"24px"},{"id":"26px","caption":"26px"},{"id":"32px","caption":"32px"},{"id":"36px","caption":"36px"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_TEXT_SIZE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "TEXT_SIZE", p,ef.textsize,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_TEXT_SIZE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_TEXT_SIZE']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row-->


        /*var n = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        n = JSON.parse(n);
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_FOOTER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_HIDE_FOOTER", n,ef.hidefooter,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_HIDE_FOOTER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_HIDE_FOOTER']?></small>'
        k+='</div>'
        k+='</div>'

        var p = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_HEADER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_HIDE_HEADER", p,ef.headerhide,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_HIDE_HEADER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_HIDE_HEADER']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/<!--row-->

        /*var o = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        o = JSON.parse(o);

        k+='<div class="row">'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_PROGRESSBAR_HIDE']?></label>'
         k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_HIDE_PGORESSBAR", o,ef.progressbarhide , false)
         k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_HIDE_PGORESSBAR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_HIDE_PROGRESSBAR']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/<!--row--> 

        
        k+='<div class="row">'
        k+='<div class="col-md-6 col-md-offset-3">'
        k+='<center><button type="submit" onclick="Button_Widget.UpdateButtonEmbCode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SUBMIT']?></button>'
        k+='</center>'
        k+=' </div>'<!--col-md--->
        k+='</div>'<!--row-->
        
        k+='<div class="row" id="emdiviframe" style="display:block;margin-top:10px;" >'  
        k+='<div class="row">'
        k+='<br>'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_BUTTON_POPUP_GETC_CODE']?></label>'
        //Forms.CreateValue("createIframe", "embeddedcode", "",true)
		
		main_site_url=$("#main_site_url").val();		
		//url="'"+main_site_url+'/d2lkZ2V0VGhlbWVJZnJhbWU=?'+e[0].id+"'"+","+"'popup'"+","+"'width=600,height=400,left=400,top=100'";
						
						if(ef.buttonsize == "small"){
							var wid = "90px";
							var hid = "30px";
						
						}else if(ef.buttonsize == "medium"){							
							var wid = "115px";
							var hid = "34px";
						}
						else if(ef.buttonsize == "large"){							
							var wid = "135px";
							var hid = "46px";
						}
						else if(ef.buttonsize == "extra large"){							
							var wid = "155px";
							var hid = "56px";
						}
						
						if(ef.lookoption == "rounded"){
						
							var emtxt='<button type="submit" onclick="widgetpopup('+e[0].id+')" style="font-family:'+ef.textfont+'; font-size:'+ef.textsize+'; color:'+ef.textcolor+'; background:'+ef.buttoncolor+';border:none;cursor:pointer;border-radius:5px;width:'+wid+'; height:'+hid+';">ORDER</button><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						}else{
							var emtxt='<button type="submit" onclick="widgetpopup('+e[0].id+')" style="font-family:'+ef.textfont+'; font-size:'+ef.textsize+'; color:'+ef.textcolor+'; background:'+ef.buttoncolor+';border:none;cursor:pointer;width:'+wid+'; height:'+hid+';">ORDER</button><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						}
						
		
		
		
        k+='<textarea class="form-control" id="embaededtxtiframe" style="width: 580px; height: 158px;" readonly>'+emtxt+'</textarea>'
        k+='</div>'
        k+='</div>'<!--col-md-12-->
        k+='</div>'
        k+='</div>'
        Popup.Show(k);

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

       
    },

    prevalidationbutton:function()
    {
        var count = 0; 
        lookoption= document.getElementById("LOOK_OPTION").value; 
        
        buttoncolor=document.getElementById("BUTTONCOLOR").value;
        textcolor=document.getElementById("TEXT_COLOR").value;

        textfont=$("#TEXT_FONT option:selected").val();

        buttonsize=$("#BUTTON_SIZE option:selected").val();
        textsize=$("#TEXT_SIZE option:selected").val();

        hidefooter=$("#BUTTON_HIDE_FOOTER option:selected").val();
        headerhide=$("#BUTTON_HIDE_HEADER option:selected").val();
        progressbarhide=$("#BUTTON_HIDE_PGORESSBAR option:selected").val();

        if(lookoption=="")
        {
             $("#valid_LOOK_OPTION").show();
             $("#LOOK_OPTION").addClass("error-text-field");
             $("#LOOK_OPTION").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_LOOK_OPTION").hide();
            $("#LOOK_OPTION").addClass("success-text-field");
            $("#LOOK_OPTION").removeClass("error-text-field");
        }

        if(buttoncolor=="")
        {
             $("#valid_BUTTONCOLOR").show();
             $("#BUTTONCOLOR").addClass("error-text-field");
             $("#BUTTONCOLOR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_BUTTONCOLOR").hide();
            $("#BUTTONCOLOR").addClass("success-text-field");
            $("#BUTTONCOLOR").removeClass("error-text-field");
        }

        if(textcolor=="")
        {
             $("#valid_TEXT_COLOR").show();
             $("#TEXT_COLOR").addClass("error-text-field");
             $("#TEXT_COLOR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_TEXT_COLOR").hide();
            $("#TEXT_COLOR").addClass("success-text-field");
            $("#TEXT_COLOR").removeClass("error-text-field");
        }

        if(textfont=="")
        {
             $("#valid_TEXT_FONT").show();
             $("#TEXT_FONT").addClass("error-text-field");
             $("#TEXT_FONT").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_TEXT_FONT").hide();
            $("#TEXT_FONT").addClass("success-text-field");
            $("#TEXT_FONT").removeClass("error-text-field");
        }

        if(buttonsize=="")
        {
             $("#valid_BUTTON_SIZE").show();
             $("#BUTTON_SIZE").addClass("error-text-field");
             $("#BUTTON_SIZE").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_BUTTON_SIZE").hide();
            $("#BUTTON_SIZE").addClass("success-text-field");
            $("#BUTTON_SIZE").removeClass("error-text-field");
        }
        if(textsize=="")
        {
             $("#valid_TEXT_SIZE").show();
             $("#TEXT_SIZE").addClass("error-text-field");
             $("#TEXT_SIZE").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_TEXT_SIZE").hide();
            $("#TEXT_SIZE").addClass("success-text-field");
            $("#TEXT_SIZE").removeClass("error-text-field");
        }

       /* if(hidefooter=="")
        {
             $("#valid_BUTTON_HIDE_FOOTER").show();
             $("#BUTTON_HIDE_FOOTER").addClass("error-text-field");
             $("#BUTTON_HIDE_FOOTER").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_BUTTON_HIDE_FOOTER").hide();
            $("#BUTTON_HIDE_FOOTER").addClass("success-text-field");
            $("#BUTTON_HIDE_FOOTER").removeClass("error-text-field");
        }

        if(headerhide=="")
        {
             $("#valid_BUTTON_HIDE_HEADER").show();
             $("#BUTTON_HIDE_HEADER").addClass("error-text-field");
             $("#BUTTON_HIDE_HEADER").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_BUTTON_HIDE_HEADER").hide();
            $("#BUTTON_HIDE_HEADER").addClass("success-text-field");
            $("#BUTTON_HIDE_HEADER").removeClass("error-text-field");
        }

        if(progressbarhide=="")
        {
             $("#valid_BUTTON_HIDE_PGORESSBAR").show();
             $("#BUTTON_HIDE_PGORESSBAR").addClass("error-text-field");
             $("#BUTTON_HIDE_PGORESSBAR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_BUTTON_HIDE_PGORESSBAR").hide();
            $("#BUTTON_HIDE_PGORESSBAR").addClass("success-text-field");
            $("#BUTTON_HIDE_PGORESSBAR").removeClass("error-text-field");
        }*/

        if(count == 0)
            return true
        else 
            return false
    },

    UpdateButtonEmbCode: function()
     {

        if(Button_Widget.prevalidationbutton() == false){
          
            return false
        }
        id=document.getElementById("ID").value;
        lookoption= document.getElementById("LOOK_OPTION").value; 
        
        buttoncolor=document.getElementById("BUTTONCOLOR").value;
        textcolor=document.getElementById("TEXT_COLOR").value;

        textfont=$("#TEXT_FONT option:selected").val();

        buttonsize=$("#BUTTON_SIZE option:selected").val();
        textsize=$("#TEXT_SIZE option:selected").val();

        hidefooter=$("#BUTTON_HIDE_FOOTER option:selected").val();
        headerhide=$("#BUTTON_HIDE_HEADER option:selected").val();
        progressbarhide=$("#BUTTON_HIDE_PGORESSBAR option:selected").val();
        widgetiframe=new Array();
        widgetiframe = new Object();
        widgetiframe.lookoption=lookoption;
        widgetiframe.business_id=Business.id;
        widgetiframe.buttoncolor=buttoncolor;
        widgetiframe.textcolor=textcolor;
        widgetiframe.textfont=textfont;
        widgetiframe.buttonsize=buttonsize;
        widgetiframe.textsize=textsize;
        widgetiframe.hidefooter=hidefooter;
        widgetiframe.headerhide=headerhide;
        widgetiframe.progressbarhide=progressbarhide;
        $('#emdiviframe').show();
        main_site_url=$("#main_site_url").val();
          url=main_site_url+'/restrowidget/buttonwidget.php?data='+encodeURIComponent(JSON.stringify(widgetiframe));
          emtxt='<iframe src="'+url+'" scrolling="no"  frameborder="0"></iframe>';
           //$("#embaededtxtiframe").val(emtxt);
           Forms.UpdateValue("createButton","BUTTONCOLOR",buttoncolor);
           Forms.UpdateValue("createButton","TEXT_COLOR",textcolor);
           $.post("lib/business.php", "f=UpdateButtonData&id="+id+"&data=" + JSON.stringify(widgetiframe), function (a) {
           //alert(a)
		   Popup.Close();
           BusinessWidget.Main();
        });
     },

     Delete: function () {
    
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
      alert("<?=$lang_resource['WIDGETIFRAME_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
    alert(JSON.stringify(a))
    $.fn.jAlert({
      'message': '<?=$lang_resource['WIDGETBUTTON_DELETE_MSG']?>',
      'btn': [
        {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
          $.post("lib/business.php", "f=DeleteButtonwidget&data=" + JSON.stringify(a),  function (c) {
            alert('<?=$lang_resource['WIDGETBUTTON_DELETE_SUCCESS']?>');
            BusinessWidget.Main()
          
          });
        } },
        {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
      ],
      'closeBtn': false
      
      });
    },


    View: function()
    { 
         var b = Main.GetMarkedCheckBoxesValues();
       
        var a = new Object();
        a.ids = b;
        //alert(JSON.stringify(a))
        $.post("lib/business.php", "f=Fetchallembdatabutton&Business="+Business.id+"&data=" + JSON.stringify(a),  function (c) {
            if(c != ""){         
                Button_Widget.Form1(JSON.parse(c))
                Main.Ready();        
               
            }
          
          });
 
    },

    Form1:function(e1)
     {
        var e12 = e1;                   
        var l = "";
            Forms.Clean("wid", "mainbuttonok"); 
            l+='<div class="mfp-with-anim mfp-hide">'
            l +='<h3 class="popup-heading"><?=$lang_resource['VIEW_WIDGET']?></h3>'
            for (var u1 in e12) { 
			var widgetlist = JSON.parse(e12[u1].widget);  
            l +='<div class="row">'
                l +='<div class="col-md-12">'
                    l +='<div class="form-group">'
                        l +='<label>'+ e12[u1].name +'</label> <span class="pull-right">'+ e12[u1].date +'</span>'                       
                        main_site_url=$("#main_site_url").val();
                        //url=main_site_url+'/restrowidget/buttonwidget.php?data='+encodeURIComponent(e12[u1].widget);
                        //var emtxt='<iframe src="'+url+'" scrolling="no" style="height: 470px;" frameborder="0"></iframe>';   
						
						
						
						//url="'"+main_site_url+'/d2lkZ2V0VGhlbWVJZnJhbWU=?'+e12[u1].id+"'"+","+"'popup'"+","+"'width=600,height=400,left=400,top=100'";
						
						if(widgetlist.buttonsize == "small"){
							var wid = "90px";
							var hid = "30px";
						
						}else if(widgetlist.buttonsize == "medium"){							
							var wid = "115px";
							var hid = "34px";
						}
						else if(widgetlist.buttonsize == "large"){							
							var wid = "135px";
							var hid = "46px";
						}
						else if(widgetlist.buttonsize == "extra large"){							
							var wid = "155px";
							var hid = "56px";
						}
						
						
						if(widgetlist.lookoption == "rounded"){
						
							var emtxt='<button type="submit" onclick="widgetpopup('+e12[u1].id+')" style="font-family:'+widgetlist.textfont+'; font-size:'+widgetlist.textsize+'; color:'+widgetlist.textcolor+'; background:'+widgetlist.buttoncolor+';border:none;cursor:pointer;border-radius:5px;width:'+wid+'; height:'+hid+';">ORDER</button><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						}else{
							var emtxt='<button type="submit" onclick="widgetpopup('+e12[u1].id+')" style="font-family:'+widgetlist.textfont+'; font-size:'+widgetlist.textsize+'; color:'+widgetlist.textcolor+'; background:'+widgetlist.buttoncolor+';border:none;cursor:pointer;width:'+wid+'; height:'+hid+';">ORDER</button><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						}
						
						//var emtxt='<button style="font-family:'+widgetlist.textfont+'; font-size:'+widgetlist.textsize+'; color:'+widgetlist.textcolor+'; background:'+widgetlist.buttoncolor+';" onClick="'+url+'"></button>'
						
						                
                        l +='<textarea class="form-control rounded" readonly="readonly" style="height:150px;">'+emtxt+'</textarea>'
                     l +='</div>'
                l +='</div>'<!--col-md-12-->
            l +='</div>'<!--row-->
            l +='</div>'<!--row-->      
            }  
                
        Popup.Show(l);
     }

};