var Website={
	
		Main: function () {
        Main.Loading();
		var b = new Date().getTime();
        Main.Aid = b;
		
		if (b != Main.Aid)
                {
                    return
                }
        Main.Ready(); 
       	Website.PrintMain();
    },
	
		PrintMain: function(a){
			var c="";
			c += '<div class="row">'
            c += '<div class="top-bar">'
            c += '<div class=" col-md-6 col-md-offset-6">'
            c += '<div class=" pull-right">'
			c += '<span id="websitesave"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Logoimage.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button></span>'		
			c += '&nbsp;<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
            c += '</div>'
			<!--col-md-5-->
            c += '</div>'
			<!--top-bar-->
            c += '</div>'
			<!--row-->
            c += '<div class="tab-nav">'
            c += '<ul id="websitemenu">'
			c += ExtraAdmin.templateSettingMenubar();
            c += '</ul>'
            c += '</div>'
			c +='<div id="websitesetting"></div>'
			
			document.getElementById("main").innerHTML = c;
			
			Logoimage.Main();
			
			var selectmenu = '#websitemenu li a';
			
			$(selectmenu).on('click', function(){
				$(selectmenu).removeClass('active');
				$(this).addClass('active');
			});			
		}, 
		
	   addBtn: function (val){
		   var htms = ''
		   if(val == 1){
				htms +='<button class="btn btn-default btn-rounded-lg close-btn  " onclick="Logoimage.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'   
		   } else if(val == 2){
			    htms +='<button class="btn btn-default btn-rounded-lg close-btn " onclick="HomeHeader.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'
		   } else if(val == 3){
			    htms +='<button class="btn btn-default btn-rounded-lg close-btn " onclick="FrontPage.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'
		   } else if(val == 4){
			    htms +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="SearchBox.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'
		   } else if(val == 5){
			    htms +='<button class="btn btn-default btn-rounded-lg close-btn  " onclick="FooterPage.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'
		   }else if(val == 6){
			    htms +='<button class="btn btn-default btn-rounded-lg close-btn  " onclick="Businesspage.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'
		   }else if(val == 7){
			    htms +='<button class="btn btn-default btn-rounded-lg close-btn  " onclick="Checkout.Save()"><i class="fa icon-save"></i> <?=$lang_resource['ADMIN_PAGE_WEBSITE_SAVE']?></button>'
		   }
		   
		   
		   $("#websitesave").empty().append(htms);
		
   
	   },

	    
	
	
	
};