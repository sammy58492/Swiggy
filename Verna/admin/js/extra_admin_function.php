<?php
session_start();
require_once('../login/common.php');
require_authentication(0);      
?>
 
ExtraAdmin = {
    Dishform: function (j,p) {
   
     return;
   
    },
    SubCategories: function(){
    
    return;
    
    },
    
    DishformSubcategory:function(j,p){
    
    	var c = '';
        c +='<div class="row">'	 
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_CATEGORY'] ?></label>'
        c +=Forms.CreateSelectPropertyPopup("dish", "dish_category", j, p.category, true,"Products.PreValidation();Products.jsFunction(this.value);")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="category_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_CATEGORY']?></small>'
        c +='</div>'
        c +='</div>'
       
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_PRICE'] ?></label>'
        c +=Forms.CreateInputPropertyPopup("dish", "dish_price", p.price, true,"Products.PreValidation()",false, false, "return Main.IsNumberKey(event)","")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="dish_price_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_PRICE']?></small>'
        c +='</div>'
        c +='</div>'
		
		<!--col-md-4-->
        c +='</div>'<!--row-->
        var H1 = false;
        if (p.feature == "t") {
            H1 = true
        }

      if(Main.PointPermission=='1')
            { 
      
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_POINTS'] ?></label>'
        c +=Forms.CreateInputPropertyPopup("dish", "dish_points", p.points, true,"Products.PreValidation()",false, false, "return Main.IsNumberKey(event)","")
        c +='</div>'
        c +='</div>'<!--col-md-4-->
        
        
		if(Main.productordersetting=='1'){
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_DELIVERY_PRICE'] ?></label>'
        c +=Forms.CreateInputPropertyPopup("dish", "deliveryprice", p.deliveryprice, false,"",false, false, "return Main.IsNumberKey(event)","")
        c +='<small data-bv-validator="notEmpty" class="help-block" id="deliveryprice_text" style="color:#F00;display:none;"></small>'
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->
        }
		
		
		
		c +='</div>'
		
		
		
        
        c +='<div class="row">' 
       
        c +='<div class="col-md-6" style="margin-top: 30px;">'
        c +='<div class="form-group">'
        c +='<label>&nbsp;</label>'
        c +=Forms.CreateCheckBoxPropertyAdmin("dish", "dish_feature", H1)
        c +='<label for="dish_feature" class="hand">&nbsp;</label><?=$lang_resource['PRODUCT_FEATURED']?></div>'
    
        
        c +='</div>'
        <!--col-md-12-->
        c +='</div>'
        <!--row-->  
          } else {

            c +='<div class="row">'
            if(Main.productordersetting=='1')
			{
            c +='<div class="col-md-6">'
            c +='<div class="form-group">'
            c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_DELIVERY_PRICE'] ?></label>'
            c +=Forms.CreateInputPropertyPopup("dish", "deliveryprice", p.deliveryprice, false,"",false, false, "return Main.IsNumberKey(event)","")
            c +='<small data-bv-validator="notEmpty" class="help-block" id="deliveryprice_text" style="color:#F00;display:none;"></small>'
            c +='</div>'
            c +='</div>'
            }
            c +='<div class="col-md-6">'
      		c +='<div class="form-group">'
        	c +=Forms.CreateCheckBoxPropertyAdmin("dish", "dish_feature", H1)
       		c +='<label for="dish_feature" class="hand">&nbsp;</label><?=$lang_resource['PRODUCT_FEATURED']?></div>'
       		c +='</div>'
        	<!--col-md-12-->
       		c +='</div>'
            
        c +='</div>'
         } 
        return c;
    
    },
    templateSettingMenubar: function(){
    
           var  c = '<li><a href="javascript:Logoimage.Main();" onClick="Website.addBtn(1);" class="active"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_LOGO']?></a></li>'
            c += '<li><a href="javascript:HomeHeader.Main();" onClick="Website.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_HOMEPAGE_HEADER']?></a></li>'
            c += '<li><a href="javascript:FrontPage.Main();" onClick="Website.addBtn(3);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_HOMEPAGE_SECTION']?></a></li>'
            c += '<li><a href="javascript:SearchBox.Main();" onClick="Website.addBtn(4);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_SEARCHBOX']?></a></li>'
            c += '<li><a href="javascript:FooterPage.Main();" onClick="Website.addBtn(5);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_FOOTER']?></a></li>'
            c += '<li><a href="javascript:Businesspage.Main();" onClick="Website.addBtn(6);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_BUSINESS_PAGE']?></a></li>'
            c += '<li><a href="javascript:Checkout.Main();" onClick="Website.addBtn(7);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_CHECKOUT']?></a></li>'
            
            return c;

          }
};
