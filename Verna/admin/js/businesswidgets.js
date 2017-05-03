var BusinessWidget = {
    Main: function(){
       // OrderReservation.namelang = Array();
        if(Business.id){
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
            $.post("lib/business.php", "f=FetchWidgetIFrame&id="+Business.id, function (a) {
                BusinessWidget.widget = JSON.parse(a);
                if (b != Main.Aid) {
                return
            }
                Main.Ready();
                BusinessWidget.PrintMain();
                
            });
            
        }else{
            var N=''
            N += '<div class="col-md-12">'
            N += '<div class="the-box">'
            N += '<div class="clearfix" style="padding:5px 0">'
            N +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_GALLERY_BUSINESS_CREATE']?></p>'
            N += '</div></div></div>'
            document.getElementById("tab_widget").innerHTML = N;
        }
    },

    PrintMain:function(){


            
        var c = "";
       
        c+= '<h4 class="on_h4"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT']?></h4>'
        c+='<div class="row">'
       
         c+='<div class="col-md-4">'
        c+='<div class="the-box rounded">'
        c+='<a href="#">'
        c+='<h4 class="on-heaeing clearfix">'
        c+=' <span><img src="images/iframe-icon.png"></span> <?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_IFRAME']?>'
        c+='</h4>'
        c+='</a>'
        c+='<span class="pull-right on-right inline-popups">'

        c+='<a href="javascript:BusinessWidget.iframe()" data-effect="mfp-zoom-in">'

        c+='<i class="fa icon-plus3 wgd-plus-icon"></i>'
        c+='</a>'
        c+='</span>'
        // c+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
        // c+='</div>'
        c+='<hr style="clear:both; margin-bottom:10px;">'
        c+='<p class="widget_graphic"><img src="images/iframe-graphic.png"></p>'
        c+='</div>'<!--the-box-->
        c+='</div>'<!--col-md-4-->
/////////////////button/////////////
         c+='<div class="col-md-4">'
        c+='<div class="the-box rounded">'
        c+='<a href="#">'
        c+='<h4 class="on-heaeing clearfix">'
        c+='<span><img src="images/button-icon.png"> <?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_BUTTON']?></span> '
        c+='</h4>'
        c+='</a>'

        c+='<span class="pull-right on-right inline-popups">'
        
        c+='<a href="javascript:BusinessWidget.button()" data-effect="mfp-zoom-in">'
        c+='<i class="fa icon-plus3 wgd-plus-icon"></i></a>'
        c+='</span>'
        c+='<hr style="clear:both; margin-bottom:10px;">'
        c+=' <p class="widget_graphic"><img src="images/button-graphic.png"></p>'
        c+='</div>'<!--the-box-->
        c+='</div>'<!--col-md-4-->
//////////////////////////floating////////////////////
        c+='<div class="col-md-4">'
        c+='<div class="the-box rounded">'
        c+='<a href="#">'
        c+='<h4 class="on-heaeing clearfix">'
        c+='<span><img src="images/floating-icon.png"></span> <?=$lang_resource['ADMIN_PAGE_WIDGET_FLOATING']?>'
        c+='</h4>'
        c+=' </a>'
        c+='<span class="pull-right on-right inline-popups">'
        c+='<a href="javascript:BusinessWidget.floating()" data-effect="mfp-zoom-in"><i class="fa icon-plus3 wgd-plus-icon"></i></a>'
        c+='</span>'
        c+='<hr style="clear:both; margin-bottom:10px;">'
        c+='<p class="widget_graphic"><img src="images/floating-graphic.png"></p>'
        c+='</div>'<!--the-box-->
        c+='</div>'<!--col-md-4-->
        c+='</div>'

///////////////////////////////////////////        
        c+='<div class="panel panel-danger panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'
        c+='<div class="row">'
        c+='<div class="col-md-7">'
        c+='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_WIDGET_IFRAME_HEADING']?></h3>'
        c+='</div>'<!--col-md-9-->

        c+='<div class="col-md-5">'
        c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" onclick="BusinessWidget.View()" href="javascript:void(0)" data-effect="mfp-zoom-in"><i class="fa icon-eye"></i><?=$lang_resource['ADMIN_PAGE_WIDGET_VIEW']?></a>'
        c+=' </span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" onclick="BusinessWidget.Edit()" href="javascript:void(0)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i><?=$lang_resource['ADMIN_PAGE_WIDGET_EDIT']?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="BusinessWidget.Delete()" href="javascript:void(0)"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_WIDGET_DELETE']?></button></span>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
        //c+='<th width="7.5%"><?=$lang_resource['IFRAME_TABLE_ID']?></th>'
        c+='<th width="7.5%"><?=$lang_resource['IFRAME_TABLE_ID']?></th>'
        c+='<th width="15%" onclick="Main.ToogleAllCheckBoxes(\'BusinessWidget\')"><?=$lang_resource['IFRAME_TABLE_ALL']?></th>'
        c+='<th width="40%"><?=$lang_resource['IFRAME_TABLE_NAME']?></th>'
        c+='<th width="20%"><?=$lang_resource['IFRAME_TABLE_DATE']?></th>'
        c+='<th width="15%"><?=$lang_resource['IFRAME_TABLE_ENABLE']?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="iframedata">'
        c+='</tbody>'
        c+='</table>'
        c+='</div>'
        c+='</div>'<!-- /.panel-body -->
        c+='</div>'
////////////////////////////
        c+='<div class="panel panel-warning panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'
        c+='<div class="row">'
        c+='<div class="col-md-7">'
        c+='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_HEADING']?></h3>'
        c+='</div>'<!--col-md-9-->

        c+='<div class="col-md-5">'
        c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Button_Widget.View()" href="javascript:void(0)" data-effect="mfp-zoom-in"><i class="fa icon-eye"></i><?=$lang_resource['ADMIN_PAGE_WIDGET_VIEW']?></a>'
        c+=' </span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Button_Widget.Edit()" href="javascript:void(0)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i><?=$lang_resource['ADMIN_PAGE_WIDGET_EDIT']?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Button_Widget.Delete()" href="javascript:void(0)"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_WIDGET_DELETE']?></button></span>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
        //c+='<th width="7.5%"><?=$lang_resource['IFRAME_TABLE_ID']?></th>'
        c+='<th width="7.5%"><?=$lang_resource['BUTTON_TABLE_ID ']?></th>'
        c+='<th width="15%" onclick="Main.ToogleAllCheckBoxes(\'Button_Widget\')"><?=$lang_resource['BUTTON_TABLE_ALL']?></th>'
        c+='<th width="40%"><?=$lang_resource['BUTTON_TABLE_NAME']?></th>'
        c+='<th width="20%"><?=$lang_resource['BUTTON_TABLE_DATE']?></th>'
        c+='<th width="15%"><?=$lang_resource['BUTTON_TABLE_ENABLE']?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="buttondata">'
        c+='</tbody>'
        c+='</table>'
        c+='</div>'
        c+='</div>'<!-- /.panel-body -->
        c+='</div>'







/////////////////////////////////////////////////
       c+='<div class="panel panel-success panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'
        c+='<div class="row">'
        c+='<div class="col-md-7">'
        c+='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_WIDGET_FLOAT_HEADING']?></h3>'
        c+='</div>'<!--col-md-9-->

        c+='<div class="col-md-5">'
        c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Float_Widget.View()" href="javascript:void(0)" data-effect="mfp-zoom-in"><i class="fa icon-eye"></i><?=$lang_resource['ADMIN_PAGE_WIDGET_VIEW']?></a>'
        c+=' </span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Float_Widget.Edit()" href="javascript:void(0)" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i><?=$lang_resource['ADMIN_PAGE_WIDGET_EDIT']?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Float_Widget.Delete()" href="javascript:void(0)"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_WIDGET_DELETE']?></button></span>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
        //c+='<th width="7.5%"><?=$lang_resource['IFRAME_TABLE_ID']?></th>'
        c+='<th width="7.5%"><?=$lang_resource['FLOAT_TABLE_ID']?></th>'
        c+='<th width="15%" onclick="Main.ToogleAllCheckBoxes(\'Float_Widget\')"><?=$lang_resource['FLOAT_TABLE_ALL']?></th>'
        c+='<th width="40%"><?=$lang_resource['FLOAT_TABLE_NAME']?></th>'
        c+='<th width="20%"><?=$lang_resource['FLOAT_TABLE_DATE']?></th>'
        c+='<th width="15%"><?=$lang_resource['FLOAT_TABLE_ENABLE']?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="floatdata">'
        c+='</tbody>'
        c+='</table>'
        c+='</div>'
        c+='</div>'<!-- /.panel-body -->
        c+='</div>'


                            
            
      

            


        

         $("#tab_widget").empty().append(c);

        BusinessWidget.PupulateTable();
        Button_Widget.Main();
        Float_Widget.Main();
  
       
   
   



    },

    PupulateTable:function()
    {
        var d = "";

        var b = this.widget.length;
        var j = true;
        var g = "";
         var f = new Array();
        var l = new Array();
        //alert(JSON.stringify(Business_Review.Business_Review));
        for (var e in BusinessWidget.widget) {
             f.push(BusinessWidget.widget[e])
            j = true;
            if (j) {
                d += '<tr>'
                d += '<td>'+ this.widget[e].id +'</td>'
                
                d += '<td><input type="checkbox" class="BusinessWidget checkbox" value="' + this.widget[e].id + '"></td>'
      
                d += '<td class="hand" onclick="BusinessWidget.Edit(' + this.widget[e].id + ')">'+ Main.NullToEmpty(this.widget[e].name) +'</td>'
                
                d += '<td class="hand" onclick="BusinessWidget.Edit(' + this.widget[e].id + ')">' + this.widget[e].date +'</td>'

                d += '<td><div class="enebal" id="switchiframe_' + this.widget[e].id + '"></div></td>'
            }
        }
        
            document.getElementById("iframedata").innerHTML = d;

            var h = false;
        //Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switchiframe_" + f[d].id, h);
            Switch.OnChange("switchiframe_" + f[d].id, function (l, i) {
                BusinessWidget.SetEnabled(l.replace("switchiframe_", ""), i)
            })
        }
    },

    iframe:function()
    {
        $.post("lib/business.php", "f=FetchWidgetIFrame&id="+Business.id, function (a) {
            a=JSON.parse(a);
            BusinessWidget.id=a.id;
            BusinessWidget.background_color=a.background_color;
            BusinessWidget.business_id=a.business_id;
            BusinessWidget.width=a.width;
            BusinessWidget.height=a.height;
            BusinessWidget.display_device=a.display_device;
            BusinessWidget.footer_hide=a.footer_hide;
            BusinessWidget.header_hide=a.header_hide;
            BusinessWidget.progressbar_hide=a.progressbar_hide;
            BusinessWidget.embedded_code=a.embedded_code;
            BusinessWidget.IframeNew();
        });
    },

    IframeNew:function()
    {
        Forms.Clean("createIframe", "mainbuttonok");     
        var k = "";
        Forms.Form.createIframe.id = Business.id   
        //k+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
        k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_IFRAME']?></h3>'
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_IFRAME_POPUP_BACKGROUND_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createIframe", "IFRAMEBGCOLOR","", false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAMEBGCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_BGCOLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_IFRAME_POPUP_WIDTH']?></label>'
        k += Forms.CreateInputPropertySettings("createIframe", "IFRAMEWIDTH",Main.NullToEmpty(BusinessWidget.width), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAMEWIDTH" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_WIDTH_VALID']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='</div>'<!--row-->
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HEIGHT']?></label>'
        k += Forms.CreateInputPropertySettings("createIframe", "IFRAMEHEIGHT",Main.NullToEmpty(BusinessWidget.height), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAMEHEIGHT" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HEIGHT']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var m = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"desktop","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_DESKTOP'] ?>"},{"id":"mobile","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_MOBILE'] ?>"}]';
        m = JSON.parse(m);

        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SELECT_DEVICE_TYPE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_DEVICE_TYPE", m,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_DEVICE_TYPE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_DEVICE_TYPE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->
        k+='</div>'<!--row-->

        var n = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        n = JSON.parse(n);
        k+='<div class="row" style="display:none;">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HIDE_FOOTER']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_HIDE_FOOTER", n,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_HIDE_FOOTER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HIDE_FOOTER']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var p = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HIDE_HEADER']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_HIDE_HEADER", p,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_HIDE_HEADER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HIDE_HEADER']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row-->

        var o = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        o = JSON.parse(o);

        k+='<div class="row" style="display:none;">'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HIDE_PROGRESSBAR']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_HIDE_PGORESSBAR", o,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_HIDE_PGORESSBAR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HIDE_PROGRESSBAR']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row--> 

        
        k+='<div class="row">'
        k+='<div class="col-md-6 col-md-offset-3">'
        k+='<center><button type="submit" onclick="BusinessWidget.createiframeembcode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SUBMIT']?></button>'
        k+='</center>'
        k+=' </div>'<!--col-md--->
        k+='</div>'<!--row-->
        
        k+='<div class="row" id="emdiviframe" style="display:none;margin-top:10px;" >'  
        k+='<div class="row">'
        k+='<br>'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_GETC_CODE']?></label>'
        //Forms.CreateValue("createIframe", "embeddedcode", "",true)
        k+='<textarea class="form-control" id="embaededtxtiframe" style="width: 580px; height: 158px;" readonly></textarea>'
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


    prevalidation:function()
    {
        var count = 0; 
        bgcolor= document.getElementById("IFRAMEBGCOLOR").value;
        iframewidth=document.getElementById("IFRAMEWIDTH").value;
        iframeheight=document.getElementById("IFRAMEHEIGHT").value;

        devicetype=$("#IFRAME_DEVICE_TYPE option:selected").val();

        footerhide=$("#IFRAME_HIDE_FOOTER option:selected").val();

        headerhide=$("#IFRAME_HIDE_HEADER option:selected").val();
        progressbarhide=$("#IFRAME_HIDE_PGORESSBAR option:selected").val();

        if(bgcolor=="")
        {
             $("#valid_IFRAMEBGCOLOR").show();
             $("#IFRAMEBGCOLOR").addClass("error-text-field");
             $("#IFRAMEBGCOLOR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAMEBGCOLOR").hide();
            $("#IFRAMEBGCOLOR").addClass("success-text-field");
            $("#IFRAMEBGCOLOR").removeClass("error-text-field");
        }
        if(iframewidth=="")
         {
             $("#valid_IFRAMEWIDTH").show();
             $("#IFRAMEWIDTH").addClass("error-text-field");
             $("#IFRAMEWIDTH").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAMEWIDTH").hide();
            $("#IFRAMEWIDTH").addClass("success-text-field");
            $("#IFRAMEWIDTH").removeClass("error-text-field");
        }

        if(iframeheight=="")
         {
             $("#valid_IFRAMEHEIGHT").show();
             $("#IFRAMEHEIGHT").addClass("error-text-field");
             $("#IFRAMEHEIGHT").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAMEHEIGHT").hide();
            $("#IFRAMEHEIGHT").addClass("success-text-field");
            $("#IFRAMEHEIGHT").removeClass("error-text-field");
        }

        if(devicetype=="")
         {
             $("#valid_IFRAME_DEVICE_TYPE").show();
             $("#IFRAME_DEVICE_TYPE").addClass("error-text-field");
             $("#IFRAME_DEVICE_TYPE").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAME_DEVICE_TYPE").hide();
            $("#IFRAME_DEVICE_TYPE").addClass("success-text-field");
            $("#IFRAME_DEVICE_TYPE").removeClass("error-text-field");
        }

        /*if(footerhide=="")
         {
             $("#valid_IFRAME_HIDE_FOOTER").show();
             $("#IFRAME_HIDE_FOOTER").addClass("error-text-field");
             $("#IFRAME_HIDE_FOOTER").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAME_HIDE_FOOTER").hide();
            $("#IFRAME_HIDE_FOOTER").addClass("success-text-field");
            $("#IFRAME_HIDE_FOOTER").removeClass("error-text-field");
        }

        if(headerhide=="")
         {
             $("#valid_IFRAME_HIDE_HEADER").show();
             $("#IFRAME_HIDE_HEADER").addClass("error-text-field");
             $("#IFRAME_HIDE_HEADER").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAME_HIDE_HEADER").hide();
            $("#IFRAME_HIDE_HEADER").addClass("success-text-field");
            $("#IFRAME_HIDE_HEADER").removeClass("error-text-field");
        }

        if(progressbarhide=="")
         {
             $("#valid_IFRAME_HIDE_PGORESSBAR").show();
             $("#IFRAME_HIDE_PGORESSBAR").addClass("error-text-field");
             $("#IFRAME_HIDE_PGORESSBAR").removeClass("success-text-field");
              count ++;
        }
        else{
             $("#valid_IFRAME_HIDE_PGORESSBAR").hide();
            $("#IFRAME_HIDE_PGORESSBAR").addClass("success-text-field");
            $("#IFRAME_HIDE_PGORESSBAR").removeClass("error-text-field");
        }*/

        if(count == 0)
            return true
        else 
            return false
    },

    createiframeembcode:function()
    {
        if(BusinessWidget.prevalidation() == false){
            return false
        }
        bgcolor= document.getElementById("IFRAMEBGCOLOR").value; 
        //alert(bgcolor)
        iframewidth=document.getElementById("IFRAMEWIDTH").value;
        iframeheight=document.getElementById("IFRAMEHEIGHT").value;

        devicetype=$("#IFRAME_DEVICE_TYPE option:selected").val();

        footerhide=$("#IFRAME_HIDE_FOOTER option:selected").val();

        headerhide=$("#IFRAME_HIDE_HEADER option:selected").val();
        progressbarhide=$("#IFRAME_HIDE_PGORESSBAR option:selected").val();
        widgetiframe=new Array();
        widgetiframe = new Object();
        widgetiframe.bgcolor=bgcolor;
        widgetiframe.business_id=Business.id;
        widgetiframe.iframewidth=iframewidth;
        widgetiframe.iframeheight=iframeheight;
        widgetiframe.devicetype=devicetype;
        widgetiframe.footerhide=footerhide;
        widgetiframe.headerhide=headerhide;
        widgetiframe.progressbarhide=progressbarhide;
        $('#emdiviframe').show();
        main_site_url=$("#main_site_url").val();
          
           //Forms.CreateValue("createIframe","embeddedcode");
           //Forms.Form.createIframe.fields.embeddedcode.value=JSON(emtxt);
           Forms.UpdateValue("createIframe","IFRAMEBGCOLOR",bgcolor);
           //alert(JSON.stringify(Forms.Form.createIframe))

           //Forms.Form.createIframe.embeddedcode=emtxt;
          // Forms.UpdateValue("createIframe","embeddedcode",emtxt,true)
		   
           $.post("lib/business.php", "f=IframeSave&id="+Business.id+"&data=" + JSON.stringify(widgetiframe), function (a) {
          // alert(a)
		  
		  //url=main_site_url+'/restrowidget/widget.php?data='+encodeURIComponent(JSON.stringify(widgetiframe));
		  url=main_site_url+'/d2lkZ2V0VGhlbWVJZnJhbWU=?'+a;
		  
		  emtxt='<div id="main-online-shop"><iframe src="'+url+'" width="'+iframewidth+'" onload="resizeIframe(this)" id="idIframe" scrolling="auto"  style="width:'+iframewidth+'" frameborder="0"></iframe><script type="text/javascript" src="'+main_site_url+'/widgetscriptiframe.js"></script></div>';
		  
		  //emtxt='<div style="height:450px"><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0px;padding:0px;"><iframe src="'+url+'" width="'+iframewidth+'" height="'+iframeheight+'"  scrolling="auto"  style="overflow:hidden;height:'+iframeheight+';width:'+iframewidth+'" frameborder="0"></iframe></body></div>';
		  
		  
          $("#embaededtxtiframe").val(emtxt);
		  
           BusinessWidget.Main();
        });

    },


    button:function()
    {
        $.post("lib/business.php", "f=FetchWidgetIFrame&id="+Business.id, function (a) {
            a=JSON.parse(a);
            BusinessWidget.id=a.id;
            BusinessWidget.background_color=a.background_color;
            BusinessWidget.business_id=a.business_id;
            BusinessWidget.width=a.width;
            BusinessWidget.height=a.height;
            BusinessWidget.display_device=a.display_device;
            BusinessWidget.footer_hide=a.footer_hide;
            BusinessWidget.header_hide=a.header_hide;
            BusinessWidget.progressbar_hide=a.progressbar_hide;
            BusinessWidget.embedded_code=a.embedded_code;
            BusinessWidget.ButtonNew();
        });
    },

    ButtonNew:function()
    {
        Forms.Clean("createButton", "mainbuttonok");     
        var k = "";
        Forms.Form.createButton.id = Business.id   
        //k+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
        k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_BUTTON']?></h3>'
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        var u = '[{"id":"","caption":"Select"},{"id":"rounded","caption":"Rounded"}, {"id":"squared","caption":"Squared"}]';
        u = JSON.parse(u);
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_LOOK_OPTION']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "LOOK_OPTION", u,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_LOOK_OPTION" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_LOOK_OPTION']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_BUTTON_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createButton", "BUTTONCOLOR", "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTONCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_BUTTON_COLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='</div>'<!--row-->
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_TEXT_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createButton", "TEXT_COLOR",Main.NullToEmpty(BusinessWidget.height), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_TEXT_COLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_TEXT_COLOR']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->
        var m = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"aerial","caption":"Aerial"},{"id":"Times New Roman","caption":"Times New Roman"}]';
        
        m = JSON.parse(m);

        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_TEXT_FONT']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "TEXT_FONT", m,  false)
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
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_SIZE", n,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_SIZE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_SIZE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        
        var p = '[{"id":"","caption":"Select"},{"id":"12px","caption":"12px"}, {"id":"14px","caption":"14px"},{"id":"16px","caption":"16px"},{"id":"18px","caption":"18px"},{"id":"22px","caption":"22px"},{"id":"24px","caption":"24px"},{"id":"26px","caption":"26px"},{"id":"32px","caption":"32px"},{"id":"36px","caption":"36px"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_TEXT_SIZE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "TEXT_SIZE", p,  false)
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
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_HIDE_FOOTER", n,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_HIDE_FOOTER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_HIDE_FOOTER']?></small>'
        k+='</div>'
        k+='</div>'
		
        var p = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_HEADER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_HIDE_HEADER", p,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_HIDE_HEADER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_HIDE_HEADER']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/

        /*var o = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        o = JSON.parse(o);

        k+='<div class="row">'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_BUTTON_POPUP_PROGRESSBAR_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createButton", "BUTTON_HIDE_PGORESSBAR", o,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_BUTTON_HIDE_PGORESSBAR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_BUTTON_HIDE_PROGRESSBAR']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/<!--row--> 

        
        k+='<div class="row">'
        k+='<div class="col-md-6 col-md-offset-3">'
        k+='<center><button type="submit" onclick="BusinessWidget.createbuttonembcode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SUBMIT']?></button>'
        k+='</center>'
        k+=' </div>'<!--col-md--->
        k+='</div>'<!--row-->
        
        k+='<div class="row" id="emdiviframe" style="display:none;margin-top:10px;" >'  
        k+='<div class="row">'
        k+='<br>'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        //k+='<label><?=$lang_resource['ADMIN_PAGE_BUTTON_POPUP_GETC_CODE']?></label>'
        //Forms.CreateValue("createIframe", "embeddedcode", "",true)
        //k+='<textarea class="form-control" id="embaededtxtiframe" style="width: 580px; height: 158px;" readonly></textarea>'
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
        lookoption= $("#LOOK_OPTION option:selected").val();
        
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

        if(hidefooter=="")
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
        }

        if(count == 0)
            return true
        else 
            return false
    },

    createbuttonembcode:function()
    {
        if(BusinessWidget.prevalidationbutton() == false){
            return false
        }

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
        widgetiframe.business_id=Business.id;
        widgetiframe.lookoption=lookoption;
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
           $("#embaededtxtiframe").val(emtxt);
           Forms.UpdateValue("createButton","BUTTONCOLOR",buttoncolor);
           Forms.UpdateValue("createButton","TEXT_COLOR",textcolor);
           $.post("lib/business.php", "f=ButtonSave&id="+Business.id+"&data=" + JSON.stringify(widgetiframe), function (a) {
           //alert(a)
		   
           BusinessWidget.Main();
        });
		Popup.Close();

    },

    floating:function()
    {
        $.post("lib/business.php", "f=FetchWidgetIFrame&id="+Business.id, function (a) {
            a=JSON.parse(a);
            BusinessWidget.id=a.id;
            BusinessWidget.background_color=a.background_color;
            BusinessWidget.business_id=a.business_id;
            BusinessWidget.width=a.width;
            BusinessWidget.height=a.height;
            BusinessWidget.display_device=a.display_device;
            BusinessWidget.footer_hide=a.footer_hide;
            BusinessWidget.header_hide=a.header_hide;
            BusinessWidget.progressbar_hide=a.progressbar_hide;
            BusinessWidget.embedded_code=a.embedded_code;
            BusinessWidget.FloatingNew();
        });
    },

    FloatingNew:function()
    {
        Forms.Clean("createFloat", "mainbuttonok");     
        var k = "";
        Forms.Form.createFloat.id = Business.id   
        //k+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
        k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_FLOATING']?></h3>'
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_BUTTON_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createFloat", "FLOATBCOLOR",  "", false )
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATBCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_BUTTON_COLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_TEXT_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createFloat", "FLOATTEXTCOLOR",Main.NullToEmpty(BusinessWidget.width), false, "", false, false)
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
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOATTEXTFONT", v,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATTEXTFONT" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_TEXT_FONT']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var m = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"small","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_SMALL'] ?>"},{"id":"medium","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_MEDIUM'] ?>"},{"id":"large","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_LARGE'] ?>"},{"id":"extra large","caption":"<?=$lang_resource['FLOATING_BUTTON_SIZE_EXLARGE'] ?>"}]';
        m = JSON.parse(m);

        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_BUTTON_SIZE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_BUTTON_SIZE", m,  false)
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
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOATING_TEXT_SIZE", n,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOATING_TEXT_SIZE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_TEXT_SIZE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var p = '[{"id":"","caption":"Select"},{"id":"Right","caption":"Right"}, {"id":"Left","caption":"Left"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_LOCATION']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_LOCATION", p,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_LOCATION" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_LOCATION']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row-->

       /* var n = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        n = JSON.parse(n);
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_FOOTER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_HIDE_FOOTER", n,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_HIDE_FOOTER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_HIDE_FOOTER']?></small>'
        k+='</div>'
        k+='</div>'

        var p = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_POPUP_FLOATING_HEADER_HIDE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_HIDE_HEADER", p,  false)
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
        k+=Forms.CreateSelectPropertyPopup("createFloat", "FLOAT_HIDE_PGORESSBAR", o,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_FLOAT_HIDE_PGORESSBAR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_FLOAT_HIDE_PGORESSBAR']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'*/<!--row--> 

        
        k+='<div class="row">'
        k+='<div class="col-md-6 col-md-offset-3">'
        k+='<center><button type="submit" onclick="BusinessWidget.createfloatembcode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SUBMIT']?></button>'
        k+='</center>'
        k+=' </div>'<!--col-md--->
        k+='</div>'<!--row-->
        
        k+='<div class="row" id="emdiviframe" style="display:none;margin-top:10px;" >'  
        k+='<div class="row">'
        k+='<br>'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        //k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_GETC_CODE']?></label>'
        //Forms.CreateValue("createIframe", "embeddedcode", "",true)
        //k+='<textarea class="form-control" id="embaededtxtiframe" style="width: 580px; height: 158px;" readonly></textarea>'
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
         if(hidefooter=="")
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
        }
        if(count == 0)
            return true
        else 
            return false
    },

    createfloatembcode:function()
    {
       
        if(BusinessWidget.prevalidationfloat() == false){
          
            return false
        }
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
           $("#embaededtxtiframe").val(emtxt);
           //alert("6");
            Forms.UpdateValue("createFloat","FLOATBCOLOR",bgcolor);
            Forms.UpdateValue("createFloat","FLOATTEXTCOLOR",textcolor);
           // alert("7");
           $.post("lib/business.php", "f=FloatSave&id="+Business.id+"&data=" + JSON.stringify(widgetiframe), function (a) {
			   Popup.Close();
            BusinessWidget.Main();
			
           //alert(a);
           
        });

    },


     SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/business.php", "f=SetEnablediframe&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switchiframe_" + b, !a)
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
           // alert(a)
            $.post("lib/business.php", "f=FetchBusinesswidgetData&id=" + a, function (c) {
                //alert(c)
                if(c != ""){
                  
                  
                 // Estr = "true"
            
                   
                      //$("#read").show()
                       BusinessWidget.Form(JSON.parse(c))
                      Main.Ready();
                      //alert("Processing..")
                    
                  
                 


                }
            });
         }
    },


    Form: function (e) {

        var k = "";
        Forms.Clean("createIframe", "mainbuttonok");
        if (e == null) {
            e = new Object();

            Forms.Form.createIframe.type = "create"
        } else {
            Forms.Form.createIframe.type = "modify";
            Forms.Form.createIframe.id = e[0].id;
            // alert(JSON.stringify(e));
            // alert(e[0].width)
            var ef=JSON.parse(e[0].embedded_code);
            //alert(ef.bgcolor);
        }
        
        if (Forms.Form.createIframe.type == "create") {
        k +='<h3 class="popup-heading"><?=$lang_resource['BUSINESSREVIEW_CREATE_HEADING']?></h3>'
        }else{

         k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_IFRAME']?></h3>'
        }



          
        //k+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
       
        // k+='<div class="row">'
        // k+='<div class="col-md-12">'
        // k+='<div class="form-group">'
        
        // k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_IFRAME_POPUP_EMBED_CODE']?></label>'
        // k += Forms.CreateTextAreaPropertyPopup("createIframe", "iframeembcode",e[0].embedded_code, false, "", false, false)
        // k+='</div>'
        // k+=' </div>'<!--col-md-6-->
        
        // k+='</div>'<!--row-->
        

        
        // k+='<div class="row">'
        // k+='<div class="col-md-6 col-md-offset-3">'
        // k+='<center><button type="submit" onclick="BusinessWidget.UpdateIframeEmbCode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_UPDATE_SUBMIT']?></button>'
        // k+='</center>'
        // k+=' </div>'<!--col-md--->
        // k+='</div>'<!--row-->
        
        
        // k+='</div>'
        // k+='</div>'

        //k+='<div id="iframe-popup" class="white-popup mfp-with-anim mfp-hide">'
        //k+='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_WIDGET_RESTAURANT_IFRAME']?></h3>'
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<input type="hidden" value="'+e[0].id+'" id="ID">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_IFRAME_POPUP_BACKGROUND_COLOR']?></label>'
        k += Forms.CreateInputPropertyPopupWithColor("createIframe", "IFRAMEBGCOLOR",Main.NullToEmpty(ef.bgcolor), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAMEBGCOLOR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_BGCOLOR']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_WIDGET_IFRAME_POPUP_WIDTH']?></label>'
        k += Forms.CreateInputPropertySettings("createIframe", "IFRAMEWIDTH",Main.NullToEmpty(ef.iframewidth), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAMEWIDTH" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_WIDTH_VALID']?></small>'
        k+='</div>'
        k+=' </div>'<!--col-md-6-->
        k+='</div>'<!--row-->
        k+='<div class="row">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HEIGHT']?></label>'
        k += Forms.CreateInputPropertySettings("createIframe", "IFRAMEHEIGHT",Main.NullToEmpty(ef.iframeheight), false, "", false, false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAMEHEIGHT" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HEIGHT']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var m = '[{"id":"","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_SELECT'] ?>"},{"id":"desktop","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_DESKTOP'] ?>"},{"id":"mobile","caption":"<?=$lang_resource['IFRAME_DEVICE_TYPE_MOBILE'] ?>"}]';
        m = JSON.parse(m);

        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_SELECT_DEVICE_TYPE']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_DEVICE_TYPE", m,ef.devicetype,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_DEVICE_TYPE" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_DEVICE_TYPE']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->
        k+='</div>'<!--row-->

        var n = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        n = JSON.parse(n);
        k+='<div class="row" style="display:none;">'
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HIDE_FOOTER']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_HIDE_FOOTER",n,ef.footerhide , false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_HIDE_FOOTER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HIDE_FOOTER']?></small>'
        k+='</div>'
        k+='</div>'<!--col-md-6-->

        var p = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        p = JSON.parse(p);
        k+='<div class="col-md-6">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HIDE_HEADER']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_HIDE_HEADER",p,ef.headerhide,  false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_HIDE_HEADER" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HIDE_HEADER']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row-->

        var o = '[{"id":"","caption":"Select"},{"id":"f","caption":"No"}, {"id":"t","caption":"Yes"}]';
        o = JSON.parse(o);

        k+='<div class="row" style="display:none;">'
        k+='<div class="col-md-12">'
        k+='<div class="form-group">'
        k+='<label><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_HIDE_PROGRESSBAR']?></label>'
        k+=Forms.CreateSelectPropertyPopup("createIframe", "IFRAME_HIDE_PGORESSBAR",o,ef.progressbarhide,   false)
        k +='<small data-bv-validator="notEmpty" class="help-block" id="valid_IFRAME_HIDE_PGORESSBAR" style="color:#F00; display:none;"><?=$lang_resource['ADMIN_PAGE_RES_IFRAME_HIDE_PROGRESSBAR']?></small>'
        k+='</div>'
        k+='</div>'
        k+='</div>'<!--row--> 

        
        k+='<div class="row">'
        k+='<div class="col-md-6 col-md-offset-3">'
        k+='<center><button type="submit" onclick="BusinessWidget.updateiframeembcode()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_IFRAME_POPUP_UPDATE_SUBMIT']?></button>'
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
          //url=main_site_url+'/restrowidget/widget.php?data='+JSON.stringify(ef);
		  url=main_site_url+'/d2lkZ2V0VGhlbWVJZnJhbWU=?'+e[0].id;
         
		 emtxt='<div id="main-online-shop"><iframe src="'+url+'" width="'+ef.iframewidth+'"  scrolling="auto"  style="height:'+ef.iframeheight+';width:'+ef.iframewidth+'" frameborder="0"></iframe><script type="text/javascript" src="'+main_site_url+'/widgetscriptiframe.js"></script></div>';
		 
		 
		  //emtxt='<div style="height:450px"><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0px;padding:0px;"><iframe src="'+url+'" width="'+ef.iframewidth+'" height="'+ef.iframeheight+'"  scrolling="auto"  style="overflow:hidden;height:'+ef.iframeheight+';width:'+ef.iframewidth+'" frameborder="0"></iframe></body></div>';
          
		
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

    // prevalidation:function()
    // {

    // }

    updateiframeembcode:function()
    {
        if(BusinessWidget.prevalidation() == false){
            return false
        }
        id=document.getElementById("ID").value;
         bgcolor= document.getElementById("IFRAMEBGCOLOR").value; 
        //alert(bgcolor)
        iframewidth=document.getElementById("IFRAMEWIDTH").value;
        iframeheight=document.getElementById("IFRAMEHEIGHT").value;

        devicetype=$("#IFRAME_DEVICE_TYPE option:selected").val();

        footerhide=$("#IFRAME_HIDE_FOOTER option:selected").val();

        headerhide=$("#IFRAME_HIDE_HEADER option:selected").val();
        progressbarhide=$("#IFRAME_HIDE_PGORESSBAR option:selected").val();
        widgetiframe=new Array();
        widgetiframe = new Object();
        widgetiframe.bgcolor=bgcolor;
        widgetiframe.business_id=Business.id;
        widgetiframe.iframewidth=iframewidth;
        widgetiframe.iframeheight=iframeheight;
        widgetiframe.devicetype=devicetype;
        widgetiframe.footerhide=footerhide;
        widgetiframe.headerhide=headerhide;
        widgetiframe.progressbarhide=progressbarhide;
        //$('#emdiviframe').show();
        main_site_url=$("#main_site_url").val();
		url=main_site_url+'/d2lkZ2V0VGhlbWVJZnJhbWU=?'+id;
          //url=main_site_url+'/restrowidget/widget.php?data='+JSON.stringify(widgetiframe);
		  
		  
		  emtxt='<div id="main-online-shop"><iframe src="'+url+'" width="'+widgetiframe.iframewidth+'"  scrolling="auto"  style="height:'+widgetiframe.iframeheight+';width:'+widgetiframe.iframewidth+'" frameborder="0"></iframe><script type="text/javascript" src="'+main_site_url+'/widgetscriptiframe.js"></script></div>';
		  
		  
		  //emtxt='<div style="height:450px"><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0px;padding:0px;"><iframe src="'+url+'" width="'+widgetiframe.iframewidth+'" height="'+widgetiframe.iframeheight+'"  scrolling="auto"  style="overflow:hidden;height:'+widgetiframe.iframeheight+';width:'+widgetiframe.iframewidth+'" frameborder="0"></iframe></body></div>';
		  
          //emtxt='<iframe src="'+url+'" scrolling="no" style="width: '+iframewidth+"%"+'; height:'+iframeheight+"px"+';background-color:'+bgcolor+';" frameborder="0" ></iframe>';
          $("#embaededtxtiframe").val(emtxt);
           //Forms.CreateValue("createIframe","embeddedcode");
           //Forms.Form.createIframe.fields.embeddedcode.value=JSON(emtxt);
           Forms.UpdateValue("createIframe","IFRAMEBGCOLOR",bgcolor);
           //alert(JSON.stringify(Forms.Form.createIframe))

           //Forms.Form.createIframe.embeddedcode=emtxt;
          // Forms.UpdateValue("createIframe","embeddedcode",emtxt,true)
           $.post("lib/business.php", "f=UpdateIframeData&id="+id+"&data=" + JSON.stringify(widgetiframe), function (a) {
          // alert(a)
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
    //alert(JSON.stringify(a))
    $.fn.jAlert({
      'message': '<?=$lang_resource['WIDGETIFRAME_DELETE_MSG']?>',
      'btn': [
        {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
          $.post("lib/business.php", "f=Deleteiframewidget&data=" + JSON.stringify(a),  function (c) {
            alert('<?=$lang_resource['WIDGETIFRAME_DELETE_SUCCESS']?>');
            BusinessWidget.Main()
          
          });
        } },
        {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
      ],
      'closeBtn': false
      
      });
    },

   // UpdateIframeEmbCode: function()
   //   {

   //      $.post("lib/business.php", "f=UpdateIframeData&data=" + JSON.stringify(Forms.Form.createIframe), function (a) {
   //          BusinessWidget.Main();
   //         //alert(a);
   //         Popup.Close();
   //      });
   //   },


     View: function()
     {
        var b = Main.GetMarkedCheckBoxesValues();
       
        var a = new Object();
        a.ids = b;
        //alert(JSON.stringify(a))
        $.post("lib/business.php", "f=Fetchallembdataiframe&Business="+Business.id+"&data=" + JSON.stringify(a),  function (c) {
            if(c != ""){         
                BusinessWidget.Form1(JSON.parse(c))
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
                        //url=main_site_url+'/restrowidget/widget.php?data='+JSON.stringify(widgetlist);
						
						url=main_site_url+'/d2lkZ2V0VGhlbWVJZnJhbWU=?'+e12[u1].id;
						
						 var emtxt='<div id="main-online-shop"><iframe onload="resizeIframe(this)" id="idIframe" src="'+url+'" width="'+widgetlist.iframewidth+'"  scrolling="auto"  style="width:'+widgetlist.iframewidth+'" frameborder="0"></iframe><script type="text/javascript" src="'+main_site_url+'/widgetscriptiframe.js"></script></div>';
						
						
						//var emtxt='<div style="height:450px"><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0px;padding:0px;"><iframe src="'+url+'" width="'+widgetlist.iframewidth+'" height="'+widgetlist.iframeheight+'"  scrolling="auto"  style="overflow:hidden;height:'+widgetlist.iframeheight+';width:'+widgetlist.iframewidth+'" frameborder="0"></iframe></body></div>';
						
						
                        //var emtxt='<iframe src="'+url+'" style="width: '+widgetlist.iframewidth+"%"+'; height:'+widgetlist.iframeheight+"px"+';background-color:'+widgetlist.bgcolor+';" frameborder="0"></iframe>';  
						
						
                        l +='<textarea class="form-control rounded" readonly="readonly" style="height:150px;">'+emtxt+'</textarea>'

                     l +='</div>'
                l +='</div>'<!--col-md-12-->
            l +='</div>'<!--row-->
            l +='</div>'<!--row-->      
            }  
                
        Popup.Show(l);
     }

};
