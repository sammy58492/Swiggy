var More = {
 Start: function ()
    {
	var t ="";	
		t +='<div class="main">';
    	t +='<div class="header grey" style="margin:0px;">';
        t +='<div class="header_pannel">';
        t +='<div class="wrapp">';
        t +='<div class="pull_left"><button type="button" class="close-btn" onclick="Main.InitInterface()">X</button></div>';
        t +='</div>';
        t +='</div>';
        t +='<div class="logo" style="margin-top:8px;"><a href="javascript:Main.HomeUrlCustom()"><img src="panel/images/logo/1/normal.jpg" width="192" height="47"></a></div>';
        t +='</div>';
    t +='</div>';
	t +='<div class=" main grey login">';
    t +='<div class="wrapp" >';
    t +='<h2 class="text_center heading" style="border:none; margin-bottom:0;"></h2>';
   	t +='</div>';
	t +='<div id="accordion2">';
	/*********************************************************Most popular***********************************************************************/
	
	if(Main.populars[0]){
		
	if(Main.settingfront.popular_restaurant != 'f' && Main.settingfront.list_step != 'f') {
	 
  	t +='<h3  style=" background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important;"><?=$lang_resource['MOBILE_MORE_MOST_POPULAR']?></h3>';
 	 t +='<div class="acco_dvdp" >';
 	 t +='<div class="info-dv">';
     t +='<div id="demo">';
     t +='<div class="container" style="height:260px">';
     t +='<div class="row">';
     t +='<div class="span12">';
	 t +='<div id="owl-example" class="owl-carousel" >';
	 
	   var link_url = "";
	  
	  var restaurant = Main.settingfront.restaurant.split(",");
		restaurant = JSON.parse(restaurant)
		
						if (Main.populars) {

									for (var d in Main.populars) {
				 
							
			 if(Main.populars[d].status == 1)
				link_url = "panel/images/business/" + Main.populars[d].id + "/panel.jpg?c='" + Main.Random ;
				else
				link_url = "panel/images/dummy/mostpopular.jpg" ;
										
						if (restaurant.indexOf('-1') != -1 || restaurant.indexOf(Main.populars[d].id) != -1 ){						
										
										BgStyle = "background-image:url('panel/images/business/" + Main.populars[d].id + "/panel.jpg?c=" + Main.Random + "');";
										t += '<div class="item"><a href="' + Main.NullToEmpty(Main.populars[d].customslug)+ '"><img src="'+link_url+'"></a></div>';
									}
								}
							}
              
                
          
        t +='</div>';


        t +='</div>';
        t +='</div>';

        t +='</div>';
       	t +='</div>';
        t +='</div>';
   t +='</div>';
	}
	}
/*****************Restraurant**************************/
	if(Main.settingfront.reviewsetting == "t" && Main.reviewsfont !=""){
	 t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important;"><?=$lang_resource['MOBILE_MORE_RESTAURANT_REVIEW']?></h3>';
 	 t +='<div class="acco_dvdp">';

 	 t +='<div class="info-dv">';
 	
  	 t +='<div class="more_shado">'
  	  t +='<div id="seemore_div">'
	 for (var b  in Main.reviewsfont){
			if(Main.reviewsfont[b].bname!=null)
			
			{
				
				
				t +='<div class="more_box">'
				t +='<div class="more_shado_logo">'
				if(Main.reviewsfont[b].existspic==true){
					t +='<img src="../panel/images/business/'+Main.reviewsfont[b].id_w_business+'/small.jpg">'
				}
				else
				{
					t +='<img src="../panel/images/business/dummy.jpg">'
				}
				t +='</div>'//more_shado_logo

				t += '<div class="more_shado_dsp">'
				t +='<h4> <a href="/'+Main.reviewsfont[b].bcustomeslug+'">'+Main.reviewsfont[b].bname+'</a></h4>'
			//htms +='<h4>'+Main.reviewsfont[b].bname+'</h4>'
				// t +='<ul class="review-star">'
				// t+='</li>'

			var roundTotal = Math.round(Main.reviewsfont[b].ratings);
			var rev_tot = roundTotal;
			var starsReview = "";
			var i = 1;
			for(i=1;i<=5;i++)
			{

				if(roundTotal>=1)
				{
						starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="images/step3-menu-list/star-yellow2.png"></a></li>'
						
						roundTotal=roundTotal-1;
				}
				else if(roundTotal<=0)
				{
					 starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="images/step3-menu-list/star-grey2.png"></a></li>'
				
				}
			}
			t+='<ul class="morestar">'
			
			t+=starsReview;
			t+='</ul>'
			t+='<span class="morerating"> ('+Main.reviewsfont[b].ratings+' <?=$lang_resource['MOBILE_MORE_RESTAURANT_REVIEW_RATING']?>)</span>'
			t+='<div class="more_comment_dv">'
			if(Main.reviewsfont[b].user=='-1')
			{
			t +='<span><img src="../panel/images/users/dummy.jpg"></span>'
			}
			else
			{
			t +='<span><img src="../panel/images/users/'+Main.reviewsfont[b].user+'/small.jpg"></span>'
			}

			t +='<p>'+Main.reviewsfont[b].comment+'</p>'
			
			
			t+='</div>'
			t+='</div>'
			t+='</div>'

			}
		}
		t+='</div>'
		t+='</div>'
		if(Main.reviewsfont !=""){
			if(Main.reviewsfont[b].status==true)
			{
			t +='<a href="javascript:Main.SeeMore()" class="see_more" id="loadMore">See more </a>'

			}
			else
			{
			t +='<a href="javascript:Main.SeeMore()" class="see_more" id="loadMore" style="display:none">See more </a>'
			}
			}
			t +='<div id="loading">'
			t +='</div>'

	
	
	t+='</div>';
	t+='</div>';

	

/*************************Review of the day***********************************/	
t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important;"><?=$lang_resource['MOBILE_MORE_RESTAURANT_REVIEW_OF_THE_DAY']?></h3>';
 	 t +='<div class="acco_dvdp">';
 	 t +='<div class="info-dv">';
  


		t+='<div class="more_box">'          
        t+='<div class="more_shado_logo">'
        if(Main.reviewsfont[0].user=='-1')
			{
			t +='<span><img src="../panel/images/users/dummy.jpg"></span>'
			}
			else
			{
			t +='<span><img src="../panel/images/users/'+Main.reviewsfont[0].user+'/small.jpg"></span>'
			}
       t+='</div>'
         t+='<div class="more_shado_dsp">'
         t+='<h4>'+Main.reviewsfont[0].uname +' <?=$lang_resource['MOBILE_MORE_RESTAURANT_REVIEW_OF_THE_DAY_REVIEWED']?><a href="/theyrestaurant"> '+Main.reviewsfont[0].bname+'</a></h4>'  
         var roundTotal = Math.round(Main.reviewsfont[b].ratings);
			var rev_tot = roundTotal;
			var starsReview = "";
			var i = 1;
			for(i=1;i<=5;i++)
			{

				if(roundTotal>=1)
				{
						starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="images/step3-menu-list/star-yellow2.png"></a></li>'
						
						roundTotal=roundTotal-1;
				}
				else if(roundTotal<=0)
				{
					 starsReview +='<li><a href="javascript:Shopping.Menuskiptab(3)"><img src="images/step3-menu-list/star-grey2.png"></a></li>'
				
				}
			}
         t+='<ul class="morestar">'
         t+=starsReview;
         t+='</ul>'
         
         t+='<div class="more_comment_dv">'
         t+='<p>'+Main.reviewsfont[0].comment+'</p>'
         t+='<a href="/'+Main.reviewsfont[0].bcustomeslug+'">Read More</a>'
         t+='</div>'
         t+='</div>'
       t+='</div>'
	 
	 t+='</div>';
	 t+='</div>';


}
   /****************cuisine part*****************************/
   if(Main.settingfront.popular_restaurant == 't'){
			 
			
   t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important;"><?=$lang_resource['MOBILE_MORE_MOST_POPULAR_CUISINE']?></h3>';
 	 t +='<div class="acco_dvdp">';
 	 t +='<div class="info-dv">';
     t +='<div id="demo2">';
     t +='<div class="container" style="height:265px">';
     t +='<div class="row">';
     t +='<div class="span12">';
	 t +='<div id="owl-example2" class="owl-carousel">';

     var link_url = "";

	if (Main.popularscategory) {
			for (var l in Main.popularscategory) {
				
				   if(Main.popularscategory[l]["isimg"] == 1)
				link_url = "panel/images/categories/" + Main.popularscategory[l]['id'] + "/1/panel.jpg?c='" + Main.Random ;
				else
				link_url = "panel/images/dummy/category_dummy.jpg" ;
				var catnm = Main.popularscategory[l]["name"].split(" ").join("@-@");
                  	t += '<div class="item"><a href="Cuisine_'+Main.popularscategory[l]["id"]+'_'+catnm + '"><img src="'+link_url+'" style="height:195px"></a>';
				    t += '<span style="width:100%; float:left; margin-top:10px;text-align:center"><a style="text-decoration:none;color:#333;" href="Cuisine_'+Main.popularscategory[l]["id"]+'_'+catnm + '">' + Main.popularscategory[l]["name"] +'</a></span></div>';
				   
              
                	}
		}
       
        t +='</div>';


        t +='</div>';
        t +='</div>';

        t +='</div>';
       	t +='</div>';
        t +='</div>';
   t +='</div>';
   }
   /****************cuisine part*****************************/
   if(Main.settingfront.how_it_works == 't'){
   t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important"><?=$lang_resource['MOBILE_MORE_HOW_IT_WORKS']?></h3>';
 
  t +=' <div class="acco_dvdp">';
   	 t +='<div class="delivery_map_dv nohand" >';
                 	 t +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="step_tbl">';
                       t +='<tr>';
                         t +='<td>';
                         t +='<div class="work_step"><div class="step_pic"><img src="images/homeimage/p-icon-1.png"></div> <div class="step_name"><?=$lang_resource['MOBILE_MORE_SELECT_LOCATION']?></div></div>';
                         t +='</td>';
                        t +=' <td>';
                         t +='<div class="work_step"><div class="step_pic"><img src="images/homeimage/p-icon-2.png"></div> <div class="step_name"><?=$lang_resource['MOBILE_MORE_PICKUP_RESTAURANT']?></div></div>';
                         t +='</td>';
                       t +='</tr>';
                       t +='<tr>';
                         t +='<td>';
                         t +='<div class="work_step"><div class="step_pic"><img src="images/homeimage/p-icon-3.png"></div> <div class="step_name"><?=$lang_resource['MOBILE_MORE_PLACE_ORDER']?></div></div>';
                         t +='</td>';
                         t +='<td>';
                         t +='<div class="work_step"><div class="step_pic"><img src="images/homeimage/p-icon-4.png"></div> <div class="step_name"><?=$lang_resource['MOBILE_MORE_MAKE_PAYMENT']?></div></div>';
                         t +='</td>';
                       t +='</tr>';
                       t +='<tr>';
                         t +='<td>';
                        t +=' <div class="work_step"><div class="step_pic"><img src="images/homeimage/p-icon-5.png"></div> <div class="step_name"><?=$lang_resource['MOBILE_MORE_GET_DELIVERED']?></div></div>';
                         t +='</td>';
                         t +='<td>';
                       
                       t +='</td>';
                       t +='</tr>';
                       t +='</table>';


                  		t +='</div>';
   t +='</div>';
}
/***********************************************************recent orders*************************************************************************/
if(Main.settingfront.recent_orders == "t")
{
   t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important"><?=$lang_resource['MOBILE_MORE_RECENT_ORDERS']?></h3>';
 	   t +='<div class="acco_dvdp">';
       t +='<div class="info_text_dv">';
       t +='<table border="0" cellspacing="0" cellpadding="0" class="recent_order_table">';
       t +='<tbody>';
	   
	   
	   						if (Main.recentactivity) {
							var c = Main.recentactivity.length - 1;
							var a = 0;
							var e = 0;
							var divct = 1;
							for (var d in Main.recentactivity) {
							
						 t += '<tr>';
						 
					
						if(Main.recentactivity[d].isimg == 0){
						
						 t += '<td  class="order_user"><img src="panel/images/dummy/user_order_default.jpg"></td>';	
						}else{
                        t += '<td class="order_user"><img src="panel/images/users/'+Main.recentactivity[d].id+'/small.jpg"></td>';
						}
						
                        t += ' <td><p class="order_text">'+ Main.TitleCase(Main.recentactivity[d].recentdata.user.name) + " <?=$lang_resource['MOBILE_MORE_RECENT_ORDERS_JUST']?> " + Main.recentactivity[d].recentdata.business.name + "</p></td>";
                        t += '</tr>';
                      
					  
					  
							
							divct++;	
							}
						}
			
      
          t +='</tbody>';
          t +='</table>';
          t +='</div>';
    
   t +='</div>';
}
/********************************** LETS BE FRIENDS ************************************************/	if(Main.settingfront.lets_be_friends == "t"){	
   t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important"><?=$lang_resource['MOBILE_MORE_LETS_BE_FRIENDS']?></h3>';
   t +='<div class="acco_dvdp">';
    t +='<div class="gallery_dv" >';
                    	 t +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="photo_gallery_tbl">';
                              t +='<tbody>';
							  t +='<tr>';
                                 t +='<td id="facebookfanpage" colspan="3" ></td>';
                              t +='</tr>';
                             
                            t +='</tbody></table>';
	
                    t +='</div>';

  	t +='</div>';
	}
	/********************************** Usefull Links ************************************************/
	t +='<h3 style="background:#e64949 !important; text-align:left !important; border-radius:0px !important; padding: 0.7em 0.5em 0.7em 0.7em !important; font-size:17px !important; color:#fff; margin-top:0 !important"><?=$lang_resource['MOBILE_MORE_USEFULLINKS']?></h3>';
  t +='<div class="acco_dv" style=" height:700px !important">';
   t +='<div class="gallery_dv">';
                t +='<div class="ft_coll">';
                    t +='<h4><?=$lang_resource['FOOTER_SITE_MAP'];?></h4>';
                     t +='<ul>';
					 for(d1 in  Main.footerlink.Panel1) {
	
                       //t +='<li><a href="'+Main.footerlink.Panel1[d1].pageurl+'" target="">'+Main.footerlink.Panel1[d1].pagename+'</a></li>';
                       t +='<li><a href="'+Main.footerlink.Panel1[d1].pageurl_footer+'" target="">'+Main.footerlink.Panel1[d1].pagename+'</a></li>';
					 }
                       
                
                t +='<div class="ft_coll">';
				 t +='<h4><?=$lang_resource['FOOTER_BUSINESS_OWNERS'];?></h4>';
				 t +='<ul>';
				  for(d2 in  Main.footerlink.Panel2) {
	
                      // t +='<li><a href="'+Main.footerlink.Panel2[d2].pageurl+'" target="">'+Main.footerlink.Panel2[d2].pagename+'</a></li>';
                      t +='<li><a href="'+Main.footerlink.Panel2[d2].pageurl_footer+'" target="">'+Main.footerlink.Panel2[d2].pagename+'</a></li>';
					 }
				 t +='</ul>';
                t +='</div>';
                
                t +='<div class="ft_coll">';
				t +='<h4><?=$lang_resource['FOOTER_SUPPORT_INFORMATION'];?></h4>';
				t +='<ul>';
				 for(d3 in  Main.footerlink.Panel3) {
	
                 // t +='<li><a href="'+Main.footerlink.Panel3[d3].pageurl+'" target="">'+Main.footerlink.Panel3[d3].pagename+'</a></li>';
                 t +='<li><a href="'+Main.footerlink.Panel3[d3].pageurl_footer+'" target="">'+Main.footerlink.Panel3[d3].pagename+'</a></li>';
					 }
				t +='</ul>';
                t +='</div>';
			    t +='</div>';
				
				t +='</div>';
	
	
	t +='</div>';
	t +='<div class="wrapp" >';
	if(Main.settingfront.browse_per_city != 'f'){
        	 t +='<div class="field">';
                	 t +='<select class="field-select" id="Browsecity" onchange="Main.BrowseCity()" style="margin-top:2%">';
                    	t += '<option value=""><?=$lang_resource['MOBILE_MORE_BROWSE_PER_CITY']?> </option>';
						
						
						var countrytag = Main.settingfront.countrytag.split(",");
						countrytag = JSON.parse(countrytag)
						
						var citytag = Main.settingfront.citytag.split(",");
						citytag = JSON.parse(citytag)	
						
						  for(dd in Main.countrycity) {
							if(countrytag.indexOf(Main.countrycity[dd].countryid) != -1 || countrytag.indexOf('-1') != -1){
                           
                            var count = 0;
							  
							 for(ci in Main.countrycity[dd].cityname) {      
							if(citytag.length == 1 && citytag.indexOf('-1') != -1){
							 var str=Main.countrycity[dd].cityname[ci].name;
							 var res=str.replace(" ","");
							 var lower=res.toLowerCase();
                                t += '<option value="'+Main.countrycity[dd].cityname[ci].id+'">'+Main.countrycity[dd].cityname[ci].name+'</option>';
								
							}
							else{
								if(citytag.indexOf(Main.countrycity[dd].cityname[ci].id) != -1){
								   var str=Main.countrycity[dd].cityname[ci].name;
								   var res=str.replace(" ","");
								   var lower=res.toLowerCase();
                                t += '<option value="'+Main.countrycity[dd].cityname[ci].id+'">'+Main.countrycity[dd].cityname[ci].name+'</option>';
								}
							}
							 }
							}
                          }     
                    t +='</select>';
                 t +='</div>';
	}

 	    document.getElementById("top").innerHTML = t;	
		if(document.getElementById("shoppingbox"))	 
		document.getElementById("shoppingbox").innerHTML ="";
		if(document.getElementById("headerSearch"))	 
		document.getElementById("headerSearch").innerHTML = "";	
		
		$.post("panel/lib/front-main.php", "f=FetchAllsettingsCustomFacebook", function (h) {
		
				var s = JSON.parse(h);
		
			document.getElementById("facebookfanpage").innerHTML = '<iframe class="facebookfanpage" scrolling="no" allowtransparency="true"  src="'+s.value+'"></iframe>';
			
			});
	
		  $( "#accordion2" ).accordion({ heightStyle: "fill"  });
		  $("#owl-example").owlCarousel();
		    $("#owl-example2").owlCarousel();
			
			
		  
	}


};