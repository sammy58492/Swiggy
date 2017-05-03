var BResturantInfo = {
	Main: function(F){
		
         <!-------------------------------------------------------resturant info ------------------------------------------------> 
    var N = '<div class="row" id="tab_general">'
        N += '<div class="col-md-12">'
        N += '<div class="the-box">'
        N += '<div class="row">'
       
        var A = "";
        
        if (F.id) {
     	if(F.isimg == 1) {
            A = "images/business/" + Main.NullToEmpty(F.id) + "/panel.jpg?c=" + new Date().getTime();
            }
            else  {
               A = "images/dummy/default-logo.png";
            }
        }else{
        A = "images/dummy/default-logo.png";
        }
		if(F.isimgh == 1) {
            AH = "images/business/" + Main.NullToEmpty(F.id) + "/panel.jpg?c=" + new Date().getTime();
            }
            else  {
               AH = "images/dummy/default_banner.png";
            }
       
       
        
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_INPUT_SINGLE'] ?> <br><small style="font-weight:400"><?= $lang_resource['BUSINESS_TAB_RESTURANT_LOGO'] ?></small></label>'
        N += '<span class="clearfix logoupload" ><img id="uploadPreview1" src="' + A + '"  ></span>'
        N += '<div class="input-group">'
        N += '<input type="text" class="form-control rounded" id="imagefile1" readonly>'
        N += '<span class="input-group-btn">'
        N += '<span class="btn btn-default btn-file btn-light rounded">'
        N += '<?= $lang_resource['BUSINESS_TAB_RESTURANT_UPLOAD'] ?><input id="uploadImage1" type="file" name="uploadImage1" onChange="BResturantInfo.PreviewImage(1);" >'
        N += '</span>'
        N += '</span>'
        N += '</div>'
        <!-- /.input-group -->
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
       
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_INPUT_SINGLE'] ?> <br><small style="font-weight:400"><?= $lang_resource['BUSINESS_TAB_RESTURANT_BANNER'] ?></small></label>'
        N += '<span class="clearfix headerupload header-image" ><img id="uploadPreview2" src="'+AH+'" ></span>'
        N += '<div class="input-group">'
        N += '<input type="text" class="form-control rounded" readonly>'
        N += '<span class="input-group-btn">'
        N += '<span class="btn btn-default btn-file btn-light rounded">'
        N += '<?= $lang_resource['BUSINESS_TAB_RESTURANT_UPLOAD'] ?><input type="file" id="uploadImage2" name="uploadImage2" onChange="BResturantInfo.PreviewImage(2);"  >'
        N += '</span>'
        N += '</span>'
        N += '</div>'
        <!-- /.input-group -->
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        
        N += '</div>'
        <!--row-->
        N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_INFO'] ?></strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_NAME'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "name", F.name, true) 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_PHONE'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "tel", F.tel, true) 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
        
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_MOBILE'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "cel", F.cel, false) 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_EMAIL'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "email", F.email, true) 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
        
        N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS_INFO'] ?></strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "street", F.street, true) 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_ADDRESS2'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "colony", F.colony, false) 
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
        
        N += '<div class="row">'
        var K = new Array();
        K.push({
            id: "",
            caption: ""
        });
        for (E in Main.Countries) {
            K.push({
                id: Main.Countries[E].id,
                caption: Main.Countries[E].name
            })
        }
        if (Main.User.level < 2) {
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_COUNTRY'] ?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "country", K, Main.NullToEmpty(F.country), true, "Business.CountrySelected(this)")
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        var G = "";
            if (F.city) {
                G = F.city.id
            }
            
        N += '<div class="col-md-6">'
        N += '<div class="form-group">'
        N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_BASIC_CITY'] ?></label>'
        N += Forms.CreateSelectPropertyAdmin("business", "city", [], G, true)
        N += '</div>'
        N += '</div>'
        <!--col-md-6-->
        } else {
            Forms.CreateValue("business", "country", Main.User.country, false, true, true);
            Forms.CreateValue("business", "city", Main.User.city, false, true, true)
        }
        N += '</div>'
        <!--row-->
        
        N += '<h4 class="form-h4"><strong><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD'] ?> </strong></h4>'
        N += '<div class="row">'
        N += '<div class="col-md-3">'
        
        var AC = false;
        if (F.acceptcash == "t") {
            AC = true
        }       
        N += '<div class="">'+Forms.CreateCheckBoxPropertyAdmin("business", "acceptcash", AC)
        N += '<label for="acceptcash">&nbsp;</label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_CASH'] ?>'
        N += '<div class=" pay_logo">'
        N += '<img src="images/cod.png">'
        N += '</div>'
        <!--pay_logo-->
        N += '</div>'
        
        N += '</div>'
        <!--col-md-3-->
        N += '<div class="col-md-3">'
         var H = false;
        if (F.acceptcard == "t") {
            H = true
        } 
        N += '<div class="">'+Forms.CreateCheckBoxPropertyAdmin("business", "acceptcard", H)
        N += '<label for="acceptcard">&nbsp;</label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_CARD'] ?>'
        N += '<div class=" pay_logo">'
        N += '<img src="images/debit.png">'
        N += '</div>'
        <!--pay_logo-->
        N += '</div>'
        N += '</div>'
        <!--col-md-3-->
        
        N += '<div class="col-md-3">'
         var AP = false;
        if (F.acceptpaypal == "t") {
            AP = true
        } 
        N += '<div class="">'+Forms.CreateCheckBoxPropertyAdmin("business", "acceptpaypal", AP)
        N += '<label for="acceptpaypal">&nbsp;</label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_PAYPAL'] ?>'
        N += '<div class=" pay_logo" id="paypal_div">'
        N += '<img src="images/paypal.png">'
        N += '</div>'
        <!--pay_logo-->
		
		N += '<div class="pay_hide_dv" id="paypal_div_content" style="display:none;">'
		N += '<div class="row">'
		N += '<div class="col-md-12">'
		N += '<div class="form-group">'
		N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_PAYPAL_EMAIL'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "paypal", F.paypal, false) 
		N += '</div>'
		N += '</div>'
		<!--col-md-12-->
		N += '</div>'
		<!--row-->  
		N += '</div>'

        N += '</div>'
        N += '</div>'
        <!--col-md-3-->
        N += '<div class="col-md-3">'
         var AM = false;
        if (F.acceptmarco == "t") {
            AM = true
        } 
        N += '<div class="">'+Forms.CreateCheckBoxPropertyAdmin("business", "acceptmarco", AM)
        N += '<label for="acceptmarco">&nbsp;</label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_MARCO'] ?>'
        N += '<div class=" pay_logo" id="marco_div">'
        N += '<img src="images/pago.png">'
        N += '</div>'
        <!--pay_logo-->
		
		N += '<div class="pay_hide_dv" id="marco_div_content" style="display:none;">'
		N += '<div class="row">'
		N += '<div class="col-md-12">'
		N += '<div class="form-group">'
		N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_MARCO_CLIENTID'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "clientkey", F.clientkey, false) 
		N += '</div>'
		N += '</div>'
		<!--col-md-12-->
		N += '</div>'
		<!--row-->  
		N += '<div class="row">'
		N += '<div class="col-md-12">'
		N += '<div class="form-group">'
		N += '<label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_METHOD_MARCO_SECRETKEY'] ?></label>'
        N += Forms.CreateInputPropertyAdmin("business", "secretkey", F.secretkey, false) 
		N += '</div>'
		N += '</div>'
		<!--col-md-12-->
		N += '</div>'
		<!--row-->     

		N += '</div>'
		
        N += '</div>'
        N += '</div>'
        <!--col-md-3-->
        N += '</div>'
        <!--row-->
        
        N += '<div class="row">'
        N += '<div class="col-md-6">'
         var ANP = false;
        if (F.anotherpayment == "t") {
            ANP = true
        } 
        N += '<div class="">'
		N +=Forms.CreateCheckBoxPropertyAdmin("business", "anotherpayment", ANP)
        N += '<label for="anotherpayment">&nbsp;</label><?= $lang_resource['BUSINESS_TAB_RESTURANT_PAYMENT_ANOTHER'] ?>'
        N += '</div>'
		
		N += '<div class="pay_hide_dv" id="anotherpayment_content" style="display:none;">'
		N += '<div class="row">'
		N += '<div class="col-md-12">'
		N += '<div class="form-group">'
        N += Forms.CreateInputPropertyAdmin("business", "anotherpaymenttext", F.anotherpaymenttext, false) 
		N += '</div>'
		N += '</div>'
		<!--col-md-12-->
		N += '</div>'
		<!--row-->   
		N += '</div>'
		
		
        N += '</div>'
        <!--col-md-6-->
        N += '</div>'
        <!--row-->
        
        N += '<div class="row">'
        N += '<div class="col-md-3">'
        N += '<button type="button" class=" btn btn-danger" style="width:100%;" onclick="Business.PrintMain()"><?= $lang_resource['BUSINESS_CANCEL'] ?></button>'
        N += '</div>'
        <!--col-md-4-->
        N += '<div class="col-md-3">'
        N += '<button type="button" class=" btn btn-success" style="width:100%;" onclick="BResturantInfo.save()"><?= $lang_resource['BUSINESS_TAB_RESTURANT_SAVE_CONTINUE'] ?></button>'
        N += '</div>'
        <!--col-md-4-->
        N += '</div>'
        <!--row-->
        N += '</div>'
        <!--the-box-->
        N += '</div>'
        <!--col-md-12-->
        N += '</div>'
        <!--row-->
         <!-------------------------------------------------------resturant info ------------------------------------------------> 
		
		return N;
	},
	save: function (){
		
		$.post("lib/business.php", "f=SaveBusiness&data=" + JSON.stringify(Forms.Form.business), function (b) {
			
			$( "ul.business-nav li:eq(1) a").trigger('click');
        });
		
	},
	
	PreviewImage: function(no) {
        var oFReader = new FileReader();
		alert(JSON.stringify(document.getElementById("uploadImage"+no).files[0]));
        oFReader.readAsDataURL(document.getElementById("uploadImage"+no).files[0]);
        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview"+no).src = oFREvent.target.result;
		    document.getElementById("imagefile"+no).value = document.getElementById("uploadImage"+no).files[0];
			
        };
		
		
    },

};