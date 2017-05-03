var Businesspage = {	
	Main: function () {

        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetBusinessPageSettings", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if(b==''){
            b=new Object();
            b.prograssbarsetting=0;
            b.businesspageheadersetting=0;
            b.businesspagefootersetting=0;
			b.checkout_popup_settings = 0;
			//b.checkout_available_product_settings = 0;
            }else{
                b=JSON.parse(b);
            }
            Businesspage.PrintMain(b)         
        });
    },
	
	PrintMain: function(b){ 

        var c="";
        Forms.Clean("businesspagesettings", "mainbuttonok");
        e = new Object();
        Forms.Form.businesspagesettings.type = "modify";
     

        var d = new Array();
        d.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ADMIN_PAGE_No'] ?>"}'));
        d.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ADMIN_PAGE_YES'] ?>"}'));
		
		var f = new Array();
        f.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ADMIN_PAGE_No'] ?>"}'));
        f.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ADMIN_PAGE_YES'] ?>"}'));
		
		var g = new Array();
        g.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['BUSINESS_WISE'] ?>"}'));
        g.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['MENU_WISE'] ?>"}'));
		
		var popup = new Array();
		popup.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['CHECKOUT_POPUP_CHOOSE']?>"}'));
        popup.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['CHECKOUT_POPUP']?>"}'));
        popup.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['CHECKOUT_NORMAL']?>"}'));
		
		var availproduct = new Array();
		availproduct.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['AVAILABLE_PRODUCT_CHOOSE']?>"}'));
        availproduct.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['AVAILABLE_NO']?>"}'));
        availproduct.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['AVAILABLE_YES']?>"}'));
		
		

        c+= '<div class="tab-box">'
        c+= '<div class="row">'

        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['ADMIN_PAGE_HEADER_HIDE_SETTINGS'] ?></label>'

        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "businesspageheadersetting", d,b.businesspageheadersetting, false)
        c+= '</div>'
        <!--form-group-->
        c+= '</div>'
        <!--col-md-12-->
        c+= '</div>'
        <!--row-->

        c+= '<div class="row">'

        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['ADMIN_PAGE_FOOTER_HIDE_SETTINGS'] ?></label>'

        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "businesspagefootersetting", d,b.businesspagefootersetting, false)
        c+= '</div>'
        <!--form-group-->
        c+= '</div>'
        <!--col-md-12-->
        c+= '</div>'
        <!--row-->

        c+= '<div class="row">'

        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['ADMIN_PAGE_PROGRESS_HIDE_SETTINGS'] ?></label>'

        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "prograssbarsetting", d,b.prograssbarsetting, false)
        c+= '</div>'
        <!--form-group-->
        c+= '</div>'
        <!--col-md-12-->
        c+= '</div>'
        <!--row-->

        c+= '<div class="row">'

        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['ADMIN_PAGE_PROIMG_HIDE_SETTINGS'] ?></label>'

        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "businesspagimagesetting", d,b.businesspagimagesetting, false)
        c+= '</div>'
        <!--form-group-->
        c+= '</div>'
        <!--col-md-12-->
        c+= '</div>'
        <!--row-->

		<!--row-->
		c+= '<div class="row">'
        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['ADMIN_PAGE_PROIMG_SHOW_PERSON'] ?></label>'
        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "businesspagpersonsetting", f,b.businesspagpersonsetting, false)
        c+= '</div>'
        c+= '</div>'
        c+= '</div>'
        <!--row-->
		
		<!--row-->
		c+= '<div class="row">'
        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_MIN_QTY'] ?></label>'
        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "businesspagqtysetting", f,b.businesspagqtysetting, false)
        c+= '</div>'
        c+= '</div>'
        c+= '</div>'
        <!--row-->
		 var d = new Array();
        d.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        d.push(JSON.parse('{"id":"0","caption":"No"}'));
	  c+= '<div class="row">'	
      c += '<div class="col-md-12">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_EMAIL_SETTINGS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("businesspagesettings", "emailsettings", d,b.emailsettings, false)
	  
      c += '</div>'
      <!--form-group-->
      c += '</div>'
	  c+= '</div>'
	  if (Main.User.level == 0) {
	   var p = new Array();
        p.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        p.push(JSON.parse('{"id":"0","caption":"No"}'));
	  c+= '<div class="row">'	
      c += '<div class="col-md-12">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_POPULAR_SETTINGS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("businesspagesettings", "popularsettings", p,b.checkout_popup_settings, false)
	  
      c += '</div>'
      <!--form-group-->
      c += '</div>'
	  c+= '</div>'
	  }
	  
	c+= '<div class="row">'
	
	c+= '<div class="col-md-12">'
	c+= '<div class="form-group">'
	c+= '<label><?= $lang_resource['ADMIN_PAGE_CITYDELIVERY_HIDE_SETTINGS'] ?></label>'
	
	c+= Forms.CreateSelectPropertySettings("businesspagesettings", "deliverycitysetting", d,b.deliverycitysetting, false)
	c+= '</div>'
	<!--form-group-->
	c+= '</div>'
	<!--col-md-12-->
	c+= '</div>'
	<!--row-->
	c+= '<div class="row">'
	
	c+= '<div class="col-md-12">'
	c+= '<div class="form-group">'
	c+= '<label><?= $lang_resource['ADMIN_PAGE_ZIPCODE_HIDE_SETTINGS'] ?></label>'
	
	c+= Forms.CreateSelectPropertySettings("businesspagesettings", "zipcodeordersetting", d,b.zipcodeordersetting, false)
	c+= '</div>'
	<!--form-group-->
	c+= '</div>'
	<!--col-md-12-->
	c+= '</div>'
	<!--row-->
	c+= '<div class="row">'
	c+= '<div class="col-md-12">'
	c+= '<div class="form-group">'
	c+= '<label><?= $lang_resource['ADMIN_PAGE_PRODUCT_HIDE_SETTINGS'] ?></label>'
	c+= Forms.CreateSelectPropertySettings("businesspagesettings", "productordersetting", d,b.productordersetting, false)
	c+= '</div>'
	<!--form-group-->
	c+= '</div>'
	<!--col-md-12-->
	c+= '</div>'
	
	
	<!--row-->
	
	<!--row-->
	c+= '<div class="row">'
	c+= '<div class="col-md-12">'
	c+= '<div class="form-group">'
	c+= '<label><?= $lang_resource['ADMIN_BUSINESS_PAGE_POPUP_SETTINGS'] ?></label>'
	c+= Forms.CreateSelectPropertySettings("businesspagesettings", "checkout_popup_settings",popup,b.checkout_popup_settings, false)
	c+= '</div>'
	<!--form-group-->
	c+= '</div>'
	<!--col-md-12-->
	c+= '</div>'
	
	
	<!--row-->
	
	<!--row-->
	c+= '<div class="row">'
	c+= '<div class="col-md-12">'
	c+= '<div class="form-group">'
	c+= '<label><?= $lang_resource['ADMIN_BUSINESS_PAGE_AVAILABLE_PRODUCT_SETTINGS'] ?></label>'
	c+= Forms.CreateSelectPropertySettings("businesspagesettings", "checkout_available_product_settings",availproduct,b.checkout_available_product_settings, false)
	c+= '</div>'
	<!--form-group-->
	
	
	c+= '</div>'
	<!--col-md-12-->
	c+= '</div>'
	
	
	<!--row-->
	  
        <!--row-->
		<!--row-->
		/*c+= '<div class="row">'
        c+= '<div class="col-md-12">'
        c+= '<div class="form-group">'
        c+= '<label><?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_OPENTIME'] ?></label>'
        c+= Forms.CreateSelectPropertySettings("businesspagesettings", "businessopeningtime", g, b.businessopeningtime, false)
        c+= '</div>'
        c+= '</div>'
        c+= '</div>'*/
        <!--row-->
		

        c+= '</div>'
        <!--tab-box-->
		
 c+= '<div id="contentscript">'
  c+= '<h4 class="latest_heading" style="font-weight: normal;" id="dsktp_theme">Business Page Template</h4>'
  c+= '<div class="row">'
    c+= '<div class="col-md-6">'
      c+= '<div class="theme_dv"><img src="../../admin/images/menu1.jpg"></div>'
      c+= '<div class="thene_active_panel">'
        c+= '<h5 class="them_name">Template1</h5>'
        c+= '<div class="actv_btn_bg">'
          c+= '<div class="enebal" id="switch_business_1"></div>'
        c+= '</div>'
      c+= '</div>'
    c+= '</div>'
    c+= '<div class="col-md-6">'
      c+= '<div class="theme_dv"><img src="../../admin/images/menu2.jpg"></div>'
      c+= '<div class="thene_active_panel">'
        c+= '<h5 class="them_name">Template2</h5>'
        c+= '<div class="actv_btn_bg">'
          c+= '<div class="enebal" id="switch_business_2"></div>'
        c+= '</div>'
      c+= '</div>'
    c+= '</div>'
    c+= '<input type="hidden" id="desktpac" value="-1">'
  c+= '</div>'
  c+= '</div>'


        $("#websitesetting").empty().append(c);
		var h = false;
		var h1=false
        Switch.Init();
        
            if (b.businesstemplate == "1") {
                h = true
				h1=false
				 Switch.Create("switch_business_1", h);
				 Switch.Create("switch_business_2", h1);
					Switch.OnChange("switch_business_1", function (m, i) {
						Businesspage.SetEnabled(m.replace("switch_business_", ""), i)
					})
					Switch.OnChange("switch_business_2", function (m, i) {
						Businesspage.SetEnabled(m.replace("switch_business_", ""), i)
					})
            } else {
                h = true
				h1=false
				 Switch.Create("switch_business_1", h1);
				 Switch.Create("switch_business_2", h);
					Switch.OnChange("switch_business_2", function (m, i) {
						Businesspage.SetEnabled(m.replace("switch_business_", ""), i)
					})
					Switch.OnChange("switch_business_1", function (m, i) {
						Businesspage.SetEnabled(m.replace("switch_business_", ""), i)
					})
            }
           
       
    },

	
	SetEnabled: function (b, a) {
		//alert("aa")
		Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
       
        $.post("lib/tabsettings.php", "f=SetEnabled&id=" + b, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_business_" + b, !a)
            }
			Businesspage.Main();
        })
    },  

	
	Save: function () {	

        var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();
       //alert(JSON.stringify(Forms.Form.businesspagesettings));
        $.post("lib/tabsettings.php", "f=SaveBusinessPageSettings&data=" +JSON.stringify(Forms.Form.businesspagesettings), function (e) {           
          
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                Businesspage.Main();
        });
  
        Forms.Clean("businesspagesettings");		
    
    },
};