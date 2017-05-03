var Float_Widget={
	
	Main:function(){
	
		$.post("lib/business.php", "f=FetchWidgetFloat&id="+Business.id, function (a){
           //alert(a)
             if(a !=""){
             	Float_Widget.Float_Widget = JSON.parse(a);
          Float_Widget.PupulateTable(JSON.parse(a));
        }
    });

	},

  PupulateTable:function()
    {
        var d = "";

        var b = this.Float_Widget.length;
        var j = true;
        var g = "";
         var f = new Array();
        var l = new Array();
        //alert(JSON.stringify(Business_Review.Business_Review));
        for (var e in Float_Widget.Float_Widget) {
             f.push(Float_Widget.Float_Widget[e])
            j = true;
            if (j) {
                d += '<tr>'
                d += '<td class="hand">'+ this.Float_Widget[e].id +'</td>'
                
                d += '<td><input type="checkbox" class="Float_Widget checkbox" value="' + this.Float_Widget[e].id + '"></td>'
      
                d += '<td class="hand" onclick="Float_Widget.Edit(' + this.Float_Widget[e].id + ')">'+ Main.NullToEmpty(this.Float_Widget[e].name) +'</td>'
                
                d += '<td class="hand" onclick="Float_Widget.Edit(' + this.Float_Widget[e].id + ')">' + this.Float_Widget[e].date +'</td>'

                d += '<td><div class="enebal" id="switchfloat_' + this.Float_Widget[e].id + '"></div></td>'
            }
        }
        
            document.getElementById("floatdata").innerHTML = d;

            var h = false;
        //Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switchfloat_" + f[d].id, h);
            Switch.OnChange("switchfloat_" + f[d].id, function (l, i) {
                Float_Widget.SetEnabled(l.replace("switchfloat_", ""), i)
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
        $.post("lib/business.php", "f=SetEnabledfloat&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switchfloat_" + b, !a)
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
            $.post("lib/business.php", "f=FetchFloatWidgetData&id=" + a, function (c) {
                //alert(c)
                if(c != ""){
                  
                  
                 // Estr = "true"
            
                   
                      //$("#read").show()
                       Float_Widget.Form(JSON.parse(c))
                      Main.Ready();
                      //alert("Processing..")
                    
                  
                 


                }
            });
         }
    },

    Form: function (e) {

        var k = "";
        Forms.Clean("createFloat", "mainbuttonok");
        if (e == null) {
            e = new Object();

            Forms.Form.createFloat.type = "create"
        } else {
            Forms.Form.createFloat.type = "modify";
            Forms.Form.createFloat.id = e[0].id;
            // alert(JSON.stringify(e));
            // alert(e[0].width)
             var ef=JSON.parse(e[0].embedded_code);
            //alert(ef.bgcolor);
        }
        k+='<input type="hidden" value="'+e[0].id+'" id="ID">'
        k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_FLOATING']?></h3>'
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_BUTTON_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createFloat", "FLOATBCOLOR",Main.NullToEmpty(ef.bgcolor) , "", false )
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATBCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_BUTTON_COLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_TEXT_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createFloat", "FLOATTEXTCOLOR",Main.NullToEmpty(ef.textcolor), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATTEXTCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_TEXT_COLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='</div>'<!--row-->
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        var v = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"aerial","caption":"Aerial"},{"id":"Times New Roman","caption":"Times New Roman"}]';
        v= JSON.parse(v);
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_TEXT_FONT']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOATTEXTFONT", v,ef.textfont,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATTEXTFONT" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_TEXT_FONT']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var m = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"small","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_SMALL'] ?>"},{"id":"medium","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_MEDIUM'] ?>"},{"id":"large","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_LARGE'] ?>"},{"id":"extra large","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_EXLARGE'] ?>"}]';
        m = JSON.parse(m);

        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_BUTTON_SIZE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_BUTTON_SIZE", m, ef.buttonsize,false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_BUTTON_SIZE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_BUTTON_SIZE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->
        k+='</div>'<!--row-->

        var n = '[{"id":"","caption":"Select"},{"id":"12px","caption":"12px"}, {"id":"14px","caption":"14px"},{"id":"16px","caption":"16px"},{"id":"18px","caption":"18px"},{"id":"22px","caption":"22px"},{"id":"24px","caption":"24px"},{"id":"26px","caption":"26px"},{"id":"32px","caption":"32px"},{"id":"36px","caption":"36px"}]';
        n = JSON.parse(n);
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_TEXT_SIZE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOATING_TEXT_SIZE", n, ef.textsize, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATING_TEXT_SIZE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_TEXT_SIZE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var p = '[{"id":"","caption":"Select"},{"id":"Right","caption":"Right"}, {"id":"Left","caption":"Left"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_LOCATION']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_LOCATION", p,ef.locations , false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_LOCATION" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_LOCATION']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row-->

        /*var n = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        n = JSON.parse(n);
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_FOOTER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_HIDE_FOOTER", n, ef.hidefooter, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_HIDE_FOOTER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_HIDE_FOOTER']?></small>'
        k+='</div>'
        k+='</div>'

        var p = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_HEADER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_HIDE_HEADER", p, ef.headerhide, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_HIDE_HEADER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_HIDE_HEADER']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/<!--row-->

       /* var o = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        o = JSON.parse(o);

        k+='<div class="row">'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_PROGRESSBAR_HIDE']?></label>'
         k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_HIDE_PGORESSBAR", o, ef.progressbarhide, false)
         k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_HIDE_PGORESSBAR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_HIDE_PGORESSBAR']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/<!--row--> 

        
        k+='<div class="row">'
        k+='<div class="col-md-6 col-md-offset-3">'
        k+='<center><button type="submit" onclick="Float_Widget.UpdateFloatEmbCode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SUBMIT']?></button>'
        k+='</center>'
        k+=' </div>'<!--col-md--->
        k+='</div>'<!--row-->
        
        k+='<div class="row" id="emdiviframe" style="display:block;margin-top:10px;" >'  
        k+='<div class="row">'
        k+='<br>'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_GETC_CODE']?></label>'
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
						
						if(ef.locations == "Right"){
						
						var emtxt='<div id="slideout" style="position: fixed;max-width: 155px;top: 45%;right:-100px; padding-left: 20px"><div id="slidecontent" style=float:right;""><button type="submit" onclick="widgetpopup('+e[0].id+')" style="font-family:'+ef.textfont+'; font-size:'+ef.textsize+'; color:'+ef.textcolor+'; background:'+ef.bgcolor+';border:none;cursor:pointer; right: 0;z-index: 9999;top:50%;width:'+wid+'; height:'+hid+';">ORDER</button></div><div id="clickme" style="position:absolute;top: 0;left: 13px;height: 20px;width: 15px;background:url('+main_site_url+'/admin/js/arrow.png) no-repeat -6px 0;cursor:pointer;"></div></div><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						
						}else{
							
							var emtxt='<div id="slideout" style="position: fixed;max-width: 155px;top: 45%;right:-100px; padding-left: 20px"><div id="slidecontent" style=float:left;""><button type="submit" onclick="widgetpopup('+e[0].id+')" style="font-family:'+ef.textfont+'; font-size:'+ef.textsize+'; color:'+ef.textcolor+'; background:'+ef.bgcolor+';border:none;cursor:pointer; left: 0;z-index: 9999;top:50%;width:'+wid+'; height:'+hid+';">ORDER</button></div><div id="clickme" style="position:absolute;top: 0;left: 13px;height: 20px;width: 15px;background:url('+main_site_url+'/admin/js/arrow.png) no-repeat -6px 0;cursor:pointer;"></div></div><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						
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


    prevalidationfloat:function(){
         var count = 0; 
        bgcolor= document.getElementById("FLOATBCOLOR").value; 
        
       //alert("1");
        textcolor=document.getElementById("FLOATTEXTCOLOR").value;
        

        textfont=$("#FLOATTEXTFONT option:selected").val();

        buttonsize=$("#FLOAT_BUTTON_SIZE option:selected").val();
        textsize=$("#FLOATING_TEXT_SIZE option:selected").val();
        locations=$("#FLOAT_LOCATION option:selected").val();
        //alert("2");
        hidefooter=$("#FLOAT_HIDE_FOOTER option:selected").val();
        headerhide=$("#FLOAT_HIDE_HEADER option:selected").val();
       // alert("3");
        progressbarhide=$("#FLOAT_HIDE_PGORESSBAR option:selected").val();

        if(bgcolor=="")
        {
             $("#valid_FLOATBCOLOR").show();
             $("#FLOATBCOLOR").addClass("error-text-field");
             $("#FLOATBCOLOR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOATBCOLOR").hide();
            $("#FLOATBCOLOR").addClass("success-text-field");
            $("#FLOATBCOLOR").removeClass("error-text-field");
        }
        if(textcolor=="")
        {
             $("#valid_FLOATTEXTCOLOR").show();
             $("#FLOATTEXTCOLOR").addClass("error-text-field");
             $("#FLOATTEXTCOLOR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOATTEXTCOLOR").hide();
            $("#FLOATTEXTCOLOR").addClass("success-text-field");
            $("#FLOATTEXTCOLOR").removeClass("error-text-field");
        }
        if(textfont=="")
        {
             $("#valid_FLOATTEXTFONT").show();
             $("#FLOATTEXTFONT").addClass("error-text-field");
             $("#FLOATTEXTFONT").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOATTEXTFONT").hide();
            $("#FLOATTEXTFONT").addClass("success-text-field");
            $("#FLOATTEXTFONT").removeClass("error-text-field");
        }

        if(buttonsize=="")
        {
             $("#valid_FLOAT_BUTTON_SIZE").show();
             $("#FLOAT_BUTTON_SIZE").addClass("error-text-field");
             $("#FLOAT_BUTTON_SIZE").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOAT_BUTTON_SIZE").hide();
            $("#FLOAT_BUTTON_SIZE").addClass("success-text-field");
            $("#FLOAT_BUTTON_SIZE").removeClass("error-text-field");
        }

        if(textsize=="")
        {
             $("#valid_FLOATING_TEXT_SIZE").show();
             $("#FLOATING_TEXT_SIZE").addClass("error-text-field");
             $("#FLOATING_TEXT_SIZE").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOATING_TEXT_SIZE").hide();
            $("#FLOATING_TEXT_SIZE").addClass("success-text-field");
            $("#FLOATING_TEXT_SIZE").removeClass("error-text-field");
        }

        if(locations=="")
        {
             $("#valid_FLOAT_LOCATION").show();
             $("#FLOAT_LOCATION").addClass("error-text-field");
             $("#FLOAT_LOCATION").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOAT_LOCATION").hide();
            $("#FLOAT_LOCATION").addClass("success-text-field");
            $("#FLOAT_LOCATION").removeClass("error-text-field");
        }
         /*if(hidefooter=="")
        {
             $("#valid_FLOAT_HIDE_FOOTER").show();
             $("#FLOAT_HIDE_FOOTER").addClass("error-text-field");
             $("#FLOAT_HIDE_FOOTER").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOAT_HIDE_FOOTER").hide();
            $("#FLOAT_HIDE_FOOTER").addClass("success-text-field");
            $("#FLOAT_HIDE_FOOTER").removeClass("error-text-field");
        }

        if(hidefooter=="")
        {
             $("#valid_FLOAT_HIDE_HEADER").show();
             $("#FLOAT_HIDE_HEADER").addClass("error-text-field");
             $("#FLOAT_HIDE_HEADER").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOAT_HIDE_HEADER").hide();
            $("#FLOAT_HIDE_HEADER").addClass("success-text-field");
            $("#FLOAT_HIDE_HEADER").removeClass("error-text-field");
        }

        if(progressbarhide=="")
        {
             $("#valid_FLOAT_HIDE_PGORESSBAR").show();
             $("#FLOAT_HIDE_PGORESSBAR").addClass("error-text-field");
             $("#FLOAT_HIDE_PGORESSBAR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_FLOAT_HIDE_PGORESSBAR").hide();
            $("#FLOAT_HIDE_PGORESSBAR").addClass("success-text-field");
            $("#FLOAT_HIDE_PGORESSBAR").removeClass("error-text-field");
        }*/
        if(count == 0)
            return true
        else 
            return false
    },

    UpdateFloatEmbCode: function()
     {

        if(Float_Widget.prevalidationfloat() == false){
          
            return false
        }
        id=document.getElementById("ID").value;
        bgcolor= document.getElementById("FLOATBCOLOR").value; 
        
       //alert("1");
        textcolor=document.getElementById("FLOATTEXTCOLOR").value;
        

        textfont=$("#FLOATTEXTFONT option:selected").val();

        buttonsize=$("#FLOAT_BUTTON_SIZE option:selected").val();
        textsize=$("#FLOATING_TEXT_SIZE option:selected").val();
        locations=$("#FLOAT_LOCATION option:selected").val();
        //alert("2");
        hidefooter=$("#FLOAT_HIDE_FOOTER option:selected").val();
        headerhide=$("#FLOAT_HIDE_HEADER option:selected").val();
       // alert("3");
        progressbarhide=$("#FLOAT_HIDE_PGORESSBAR option:selected").val();
        widgetiframe=new Array();
        widgetiframe = new Object();
        widgetiframe.bgcolor=bgcolor;
        widgetiframe.business_id=Business.id;
        widgetiframe.textcolor=textcolor;
        widgetiframe.textfont=textfont;
        //alert("4");
        widgetiframe.locations=locations;
        widgetiframe.buttonsize=buttonsize;
        widgetiframe.textsize=textsize;
        widgetiframe.hidefooter=hidefooter;
        widgetiframe.headerhide=headerhide;
        widgetiframe.progressbarhide=progressbarhide;
        //alert("5");
        $('#emdiviframe').show();
        main_site_url=$("#main_site_url").val();
          url=main_site_url+'/restrowidget/floatingwidget.php?data='+encodeURIComponent(JSON.stringify(widgetiframe));
          emtxt='<iframe src="'+url+'" style="width:100%;" frameborder="0"></iframe>';
           //$("#embaededtxtiframe").val(emtxt);
           //alert("6");
            Forms.UpdateValue("createFloat","FLOATBCOLOR",bgcolor);
            Forms.UpdateValue("createFloat","FLOATTEXTCOLOR",textcolor);
           // alert("7");
           $.post("lib/business.php", "f=UpdateFloatData&id="+id+"&data=" + JSON.stringify(widgetiframe), function (a) {
			   Popup.Close();
            BusinessWidget.Main();
           //alert(a);
           
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
      'message': '<?=$lang_resource['WIDGETFLOAT_DELETE_MSG']?>',
      'btn': [
        {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
          $.post("lib/business.php", "f=DeleteFloatwidget&data=" + JSON.stringify(a),  function (c) {
            alert('<?=$lang_resource['WIDGETFLOAT_DELETE_SUCCESS']?>');
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
       // alert(JSON.stringify(a))
        $.post("lib/business.php", "f=Fetchallembdatafloat&Business="+Business.id+"&data=" + JSON.stringify(a),  function (c) {
            if(c != ""){         
                Float_Widget.Form1(JSON.parse(c))
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
						
					
						if(widgetlist.locations == "Right"){
						

							var emtxt='<div id="slideout" style="position: fixed;max-width: 155px;top: 45%;right:-100px; padding-left: 20px"><div id="slidecontent" style=float:right;""><button type="submit" onclick="widgetpopup('+e12[u1].id+')" style="font-family:'+widgetlist.textfont+'; font-size:'+widgetlist.textsize+'; color:'+widgetlist.textcolor+'; background:'+widgetlist.bgcolor+';border:none;cursor:pointer; right: 0;z-index: 9999;top:50%;width:'+wid+'; height:'+hid+';">ORDER</button></div><div id="clickme" style="position:absolute;top: 0;left: 13px;height: 20px;width: 15px;background:url('+main_site_url+'/admin/js/arrow.png) no-repeat -6px 0;cursor:pointer;"></div></div><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						}else{
							var emtxt='<div id="slideout" style="position: fixed;max-width: 155px;top: 45%;right:-100px; padding-left: 20px"><div id="slidecontent" style=float:left;""><button type="submit" onclick="widgetpopup('+e12[u1].id+')" style="font-family:'+widgetlist.textfont+'; font-size:'+widgetlist.textsize+'; color:'+widgetlist.textcolor+'; background:'+widgetlist.bgcolor+';border:none;cursor:pointer; left: 0;z-index: 9999;top:50%;width:'+wid+'; height:'+hid+';">ORDER</button></div><div id="clickme" style="position:absolute;top: 0;left: 13px;height: 20px;width: 15px;background:url('+main_site_url+'/admin/js/arrow.png) no-repeat -6px 0;cursor:pointer;"></div></div><script type="text/javascript" id="widgetjs" data-name="'+main_site_url+'" src="'+main_site_url+'/widgetscript.js"></script>'
						}
						
						
						                       
                        /*main_site_url=$("#main_site_url").val();
                        url=main_site_url+'/restrowidget/floatingwidget.php?data='+encodeURIComponent(e12[u1].widget);
                        var emtxt='<iframe src="'+url+'" scrolling="no" style="height: 470px;" frameborder="0"></iframe>';*/
                        l +='<textarea class="form-control rounded" readonly="readonly" style="height:150px;">'+emtxt+'</textarea>'
                     l +='</div>'
                l +='</div>'<!--col-md-12-->
            l +='</div>'<!--row-->
            l +='</div>'<!--row-->      
            }  
                
        Popup.Show(l);
     }

};