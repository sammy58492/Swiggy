var Reviews ={
	Main: function(){
		if(Business.id){
			Main.Loading();
     		var a = new Date().getTime();
        	Main.Aid = a;				
			$.post("lib/reviews_settings.php", "f=FetchReviewSettingsDataByID&id="+Business.id, function (c) {	
				Main.Ready();
				Reviews.PrintMain(JSON.parse(c));
			});		
		}else{
            var N=''
            N += '<div class="col-md-12">'
            N += '<div class="the-box">'
            N += '<div class="clearfix" style="padding:5px 0">'
            N +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_PRODUCTS_PLEASE_CREATE_BUSINESS']?></p>'
            N += '</div></div></div>'
            document.getElementById("tab_reviews").innerHTML = N;
        }
	},//end of main	
	
	PrintMain: function(c){
		//alert(Business.id);
		Forms.Clean("reviews", "popupmainbuttonok");
		
		if(c){
            Forms.Form.reviews.type = "modify";  
			Forms.CreateValue("reviews", "businessid", Business.id, false, true, true)
        }else{
            c = new Object();
            Forms.Form.reviews.type = "create";  
            Forms.CreateValue("reviews", "businessid", Forms.Form.business.id, false, true, true)          
        }

		
		var n = '<div class="the-box">'
		n += '<h4 class="on_h4"><strong>Review Settings</strong></h4>'
		n += '<div class="row">'
		n += '<div class="col-md-6">'
		n += '<div class="form-group">'
		n += '<label><?= $lang_resource['BUSINESS_TAB_REVIEWS'] ?></label>'
		var yn="";
        yn ='[{"id":"0","caption":"No"},{"id":"1","caption":"Yes"}]';
        yn = JSON.parse(yn);
		n +=Forms.CreateSelectPropertyPopup("reviews", "review_status",yn, c.review_status, false)		
		n += '</div>'<!--form-group-->
		n += '</div>'<!--col-md-6-->
		n += '<div class="col-md-6">'
		n += '<div class="form-group">'
		n += '<label><?= $lang_resource['BUSINESS_TAB_REVIEWS_PHOTO_UPLOAD'] ?></label>'
		n +=Forms.CreateSelectPropertyPopup("reviews", "photo_upload_status",yn, c.photo_upload_status, false)	
		n += '</div>'<!--form-group-->
		n += '</div>'<!--col-md-6-->
		n += '</div>'<!--row-->
		n += '<div class="row">'
		n += '<div class="col-md-3">'
		n += '<button type="submit" class="btn btn-primary popup-submit-btn" onclick="Reviews.UpdateReviewStatus()">Save</button>'
		n += '</div>'<!--col-md-3-->
		n += '</div>'<!--row-->
		n += '</div>';
		
		document.getElementById("tab_reviews").innerHTML = n;
	},
	
	UpdateReviewStatus: function(){
		$.post("lib/reviews_settings.php", "f=UpdateReviewSettingsDataByID&data="+JSON.stringify(Forms.Form.reviews), function(c){	alert(c);
		Main.Ready();
		//Reviews.PrintMain(JSON.parse(c));
		});
		},//end of function UpdateReviewStatus
};