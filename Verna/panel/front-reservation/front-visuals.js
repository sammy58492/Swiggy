var Visuals = {
    CreateWhereAmIButton: function (a, c, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }		
        return "<div " + b + 'class="whereamibutton nonselectable"><div class="titlebox default"><span class="title"><?= $lang_resource['BODY_ORDER_FOOD_TITLE'] ?></span></div><div class="innerbox hand" onclick="' + c + '"><div class="captionbox"><span class="caption">' + a + "</span></div></div></div>"
    },
    
   
	CreateWhrYouButton: function (a, c, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
	   var list = Array(1,2,3,4);
	   var ralist = list[Math.floor((Math.random()*list.length))];

		if(Main.settingfront.map_posititon == 'f'){
			var h1_style="margin-top:190px !important;"
			//var banner_style = "margin-top:150px !important;"
		}
		var htms = '';

		if(Main.settingfront.sildersetiings == "f"){
			
			htms += '<div class="banner" style="background:url(panel/images/banner/home'+ralist+'/banner.jpg) no-repeat 0 0;width: 100%;height: 1102px;padding-top: 120px;background-size: cover !important; background-position: center center !important; background-repeat: no-repeat;">';
			htms += '<h1 style="color: #fff;font-size: 48px; font-weight: 300;text-align: center;margin: 120px auto 100px;"><?= $lang_resource['FRONT_VISUALS_DELIVERS_YOUR_NEIGHBORHOOD'] ?></h1>'
			
			
			//htms += '<div class="homepage_banner" style="background:url(panel/images/banner/home'+ralist+'/banner.jpg) no-repeat 0 0;">'
			//htms += '<h1><?= $lang_resource['FRONT_VISUALS_DELIVERS_YOUR_NEIGHBORHOOD'] ?></h1>'
			
			htms += '<div class="container">'

            htms += '<div class="row">'

			htms += '<div class="col-md-10 col-md-offset-1">'
            htms += '<div class="service search_setion" id="mid_lft">'//id="mid_lft"
			
			
			
			htms += '</div>'<!--service search_setion-->

			htms += '<div style="display:none;" id="map_canvas"></div>'
			htms += '</div>'
			htms += '</div>'
			htms += '</div>'
			
			htms += '</div>'

			
			
			
		}else{
			htms +='<div id="demo" style="position:absolute; width:100%; ">'
			htms +='<div class="">'
			htms +='<div class="">'
			htms +='<div id="owl-demo" class="owl-carousel">'
			
			htms +='<div class="item"><img src="panel/images/banner/home1/normal.jpg?time=<?=date('Ymdgis')?>" alt="Home 1"></div>'
			htms +='<div class="item"><img src="panel/images/banner/home2/normal.jpg?time=<?=date('Ymdgis')?>" alt="Home 2"></div>'
			htms +='<div class="item"><img src="panel/images/banner/home3/normal.jpg?time=<?=date('Ymdgis')?>" alt="Home 3"></div>'
			htms +='<div class="item"><img src="panel/images/banner/home4/normal.jpg?time=<?=date('Ymdgis')?>" alt="Home 4"></div>'

			/*htms +='<div class="item" ><img src="panel/images/banner/home1/banner.jpg?time=<?=time()?>" alt="Home 1"></div>'
			htms +='<div class="item" ><img src="panel/images/banner/home2/banner.jpg?time=<?=time()?>" alt="Home 2"></div>'
			htms +='<div class="item" ><img src="panel/images/banner/home3/banner.jpg?time=<?=time()?>" alt="Home 3"></div>'
			htms +='<div class="item" ><img src="panel/images/banner/home4/banner.jpg?time=<?=time()?>" alt="Home 4"></div>'*/

			htms +='</div>'
			htms +='</div>'
			htms +='</div>'
			htms +='</div>'

			htms += '<div class="homepage_banner" style="background:transparent !important">'
			htms += '<h1><?= $lang_resource['FRONT_VISUALS_DELIVERS_YOUR_NEIGHBORHOOD'] ?></h1>'
			
			htms += '<div class="container">'

            htms += '<div class="row">'

			htms += '<div class="col-md-10 col-md-offset-1">'
            htms += '<div class="service search_setion" id="mid_lft">'//id="mid_lft"
			
			
			
			htms += '</div>'<!--service search_setion-->

			htms += '<div style="display:none;" id="map_canvas"></div>'
			htms += '</div>'
			htms += '</div>'
			htms += '</div>'
			
			htms += '</div>'

		}



  		htms +='<div class="container">'
		if(Main.settingfront.how_it_works == "t")
			{
			htms +='<h2 class="heading"><?= $lang_resource['FRONT_VISUALS_HOW_IT_WORKS'] ?></h2>'
			htms +='<ul class="how_it_works">'
			htms +='<li>'
			htms +='<span class="icon"><img src="panel/<?=$moduleName?>/images/step-icon-1.png"></span>'
			htms +='<span class="text"><?= $lang_resource['SHOPPING_SELECT_LOCATION'] ?></span>'
			htms +='</li>'
			htms +='<li>'
			htms +='<span class="icon"><img src="panel/<?=$moduleName?>/images/step-icon-2.png"></span>'
			htms +='<span class="text"><?= $lang_resource['SHOPPING_PICKUP_RESTAURANT'] ?></span>'
			htms +='</li>'
			htms +='<li>'
			htms +='<span class="icon"><img src="panel/<?=$moduleName?>/images/step-icon-3.png"></span>'
			htms +='<span class="text"><?= $lang_resource['SHOPPING_PLACE_ORDER'] ?></span>'
			htms +='</li>'
			htms +='<li>'
			htms +='<span class="icon"><img src="panel/<?=$moduleName?>/images/step-icon-4.png"></span>'
			htms +='<span class="text"><?= $lang_resource['SHOPPING_MAKE_PAYMENT'] ?></span>'
			htms +='</li>'
			htms +='<li>'
			htms +='<span class="icon"><img src="panel/<?=$moduleName?>/images/step-icon-5.png"></span>'
			htms +='<span class="text"><?= $lang_resource['SHOPPING_GET_DELIVERED'] ?></span>'
			htms +='</li>'
			htms +='</ul>'
			}
			htms +='<div class="clearfix"></div>'
			
			
			if(Main.settingfront.popular_restaurant == 'f' || Main.settingfront.list_step == 'f' || Main.populars.length ==0) {
				var most_pop_style='style="display:none;"'	
			}

			htms += '<h2 class="heading" '+most_pop_style+'><?= $lang_resource['FRONT_VISUALS_MOST_POPULAR'] ?></h2>'      
			htms += '<div id="demo" '+most_pop_style+'>'
			htms += '<div class="row">'
			htms += '<div class=" col-md-12">'
			
			htms += '<div id="owl-demo1" class="owl-carousel">'
			
			var popularb = "";
			for (var b in Main.populars) {
			
			
			if(Main.populars[b].isimg == 1)
			popularb = "panel/images/business/" + Main.populars[b].id + "/panel.jpg?c="+Main.Random ;
			else
			popularb = "panel/images/dummy/mostpopular.jpg" ;
			
			var url = Main.populars[b].customslug;
			
			htms += '<div class="item"><a href="'+url+'" target="_top"><img src="'+popularb+'"></a></div>'			
			}
			htms += '</div>'
			
			htms += '</div>'
			htms += '</div>'
			
			htms += '</div>'
			


		
			if(Main.settingfront.popular_cuisine == 't' && Main.popularscategory.length>0){
				htms +='<h2 class="heading"><?= $lang_resource['FRONT_VISUALS_MOST_POPULAR_CUISINE'] ?></h2>'

				var link_url = "";
				var cu_counter = 1;
				for (var l in Main.popularscategory) {
					if(Main.popularscategory[l]["isimg"] == 1)
						link_url = "panel/images/categories/" + Main.popularscategory[l]['id'] + "/1/panel.jpg?c="+Main.Random ;
					else
						link_url = "panel/images/dummy/category_dummy.jpg" ;

					var catnm = Main.popularscategory[l]["name"].split(" ").join("");
					var catnm = catnm.split("/").join("");
					if(cu_counter % 2 == 1){
						htms +='<div class="row">'
					}

					htms += '<div class="col-md-6">'
					htms +='<div class="popular_cuisine">'
					htms +='<a href="cuisine_'+Main.popularscategory[l]['id']+'_'+catnm+'">'
					htms +='<img src="'+link_url+'" style="height:289px;">'
					htms +='<div class="cuisine_panel">' + Main.popularscategory[l]["name"] +'</div>'
					htms +='</a>'
					htms +='</div>'
					htms +='</div>'
					
					if(cu_counter % 2 == 0){
						htms +='</div>'
						if(cu_counter == 4){
							break;
						}
					}
					cu_counter++;
				}				
			}

			
			htms += '<div class="row">'
			if(Main.settingfront.recents_orders == "t"){
				htms += '<div class="col-md-6">'
				htms += '<h2 class="heading text-center"><?= $lang_resource['FRONT_VISUALS_RECENTS_ORDERS'] ?></h2>'
				htms += '<div class="recent_order">'
				htms += '<ul>'
				
				if (Main.recentactivity) {
					var c = Main.recentactivity.length - 1;
					var a = 0;
					var e = 0;
					var divct = 1;
					for (var d in Main.recentactivity) {
						if(Main.NullToEmpty(Main.recentactivity[d].recentdata) !=""){
							htms += '<li>'
							htms += '<div class="user_pic">'
							if(Main.recentactivity[d].isimg == 0){
								htms += '<img src="panel/images/dummy/user_order_default.jpg">';	
							}else{
								htms += '<img src="panel/images/users/'+Main.recentactivity[d].id+'/small.jpg">';
							}
							htms += '</div>'
							htms += '<div class="user_comment">'+ Main.TitleCase(Main.recentactivity[d].recentdata.user.name) + " <?= $lang_resource['FRONT_VISUALS_JUST_ORDERED'] ?> " + Main.recentactivity[d].recentdata.business.name + '</div>'
							htms += '</li>'
							if(divct == 3){
								break;
							}
							divct++;
						}						
					}
				}
				htms += '</ul>'
				htms += '</div>'
				htms += '</div>'
			}
			
			if(Main.settingfront.lets_be_friends == "t"){
			htms += '<div class="col-md-4 col-md-offset-2">'
			htms += '<h2 class="heading text-center"><?= $lang_resource['Lets_be_friends_V2'] ?></h2>'
			htms += '<div class="letsbe_frnd" id="facebookfanpage">'
			
			htms += '</div>'
			htms += '</div>'
			}
			htms += '</div>'
			
			if(Main.settingfront.browse_per_city == 't'){
			htms += '<h2 class="heading"><?= $lang_resource['BROWSEPERCITY'] ?></h2>'
			htms +='<div class="row">'
			htms +='<div class="col-md-6">'
			htms +='<div class="popular_cuisine">'
			htms +='<a href="javascript:void(0)" style="cursor:default">'
			htms +='<img src="panel/<?=$moduleName?>/images/city-1.jpg">'
			htms +='</a>'
			
			htms +='</div>'
			htms +='</div>'
			htms +='<div class="col-md-6">'
			htms +='<div class="popular_cuisine">'
			htms +='<a href="javascript:void(0)" style="cursor:default">'
			htms +='<img src="panel/<?=$moduleName?>/images/city-2.jpg">'
			htms +='</a>'
			
			htms +='</div>'
			htms +='</div>'
			htms +='</div>'
			htms +='<div class="row">'
			htms +='<div class="col-md-6">'
			htms +='<div class="popular_cuisine">'
			htms +='<a href="javascript:void(0)" style="cursor:default">'
			htms +='<img src="panel/<?=$moduleName?>/images/city-3.jpg">'
			htms +='</a>'
			
			htms +='</div>'<!--popular_cuisine-->
			htms +='</div>'<!--col-md-6-->
			htms +='<div class="col-md-6">'
			htms +='<div class="popular_cuisine">'
			htms +='<a href="javascript:void(0)" style="cursor:default">'
			htms +='<img src="panel/<?=$moduleName?>/images/city-4.jpg">'
			htms +='</a>'
			
			htms +='</div>'<!--popular_cuisine-->
			htms +='</div>'<!--col-md-6-->
			htms +='</div>'
			
			htms += '<div class="city_list_dv">'
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)	
			var countercountrycitylength = 0;
			for(dd in Main.countrycity) {											
				if($.inArray( Main.countrycity[dd].countryid, countrytag ) != -1 || $.inArray( "-1", countrytag ) != -1){
					countercountrycitylength = countercountrycitylength + 1;
				}
			}

			var countercountrycity = 1;
			for(dd in Main.countrycity) {
				if($.inArray( Main.countrycity[dd].countryid, countrytag ) != -1 || $.inArray( "-1", countrytag ) != -1){
					if(countercountrycity % 4 == 1){
						htms += '<div class="row">'
					}

					htms += '<div class="col-md-3">'
					htms += '<div class="city_list">'
					htms += '<ul>'
					htms += '<li>'+Main.countrycity[dd].countryname+'</li>';	
					var count = 0;
					for(ci in Main.countrycity[dd].cityname) { 			
						var citytag = Main.settingfront.citytag.split(",");
						citytag = JSON.parse(citytag)	
						var str=Main.countrycity[dd].cityname[ci].name;		
						if(citytag.length == 1 && $.inArray( "-1", citytag ) != -1){			
							
							if(str!='NULL'){
								var res=str.split(" ").join("");
								var lower="<?=base64_encode('City')?>_"+Main.countrycity[dd].cityname[ci].id+'_'+res.toLowerCase();
								htms += '<li><a href="'+lower+'">'+Main.countrycity[dd].cityname[ci].name+'</a></li>';
							}
						}else{		
							if($.inArray( Main.countrycity[dd].cityname[ci].id, citytag ) != -1){				
								var res=str.split(" ").join("");
								var lower="<?=base64_encode('City')?>_"+Main.countrycity[dd].cityname[ci].id+'_'+res.toLowerCase();			
								htms += '<li><a href="'+lower+'">'+Main.countrycity[dd].cityname[ci].name+'</a></li>';
							}
						}			
					}
					htms += '</ul>'
					htms += '</div>'
					htms += '</div>'

					if(countercountrycity % 4 == 0 || countercountrycitylength == countercountrycity){
						htms += '</div>'
					}
					countercountrycity++;
				}				
			} 
			htms += '</div>'
		}				
		htms +='</div>'

		if(Main.settingfront.foodof_the_week == "f" && Main.settingfront.amazing_apps == "f"){
			var hidediv = 'style="display:none;'
		}
		htms += '<div class=" home_banner_section" '+hidediv+'>'
		htms += '<div class="container">'
		if(Main.settingfront.foodof_the_week == "t"){
			htms += '<div class="first_banner">'
			htms += '<div class="row">'
			htms += '<div class="col-md-7">'
			htms += '<div class="first_banner_image_mobile">'
			htms += '<img src="panel/<?=$moduleName?>/images/first_banner.png">'
			htms += '</div>'
			htms += '<div class="text_section">'
			htms += '<h2><?=$lang_resource['FRONT_VISUALS_FOOD_OF_THE_WEEK']?></h2>'
			htms += '<p><?=$lang_resource['FRONT_VISUALS_FOOD_OF_THE_WEEK_DESCRIPTION']?><span><?=$lang_resource['FRONT_VISUALS_FOOD_OF_THE_WEEK_DESCRIPTION1']?></span></p>'
			htms += '</div>'
			htms += '</div>'
			htms += '<div class="col-md-5">'
			htms += '<div class="first_banner_image">'
			htms += '<img src="panel/<?=$moduleName?>/images/first_banner.png">'
			htms += '</div>'
			htms += '</div>'
			htms += '</div>'
			htms += '</div>'
		}

		if(Main.settingfront.amazing_apps == "t"){ 
			htms += '<div class="second_banner">'
			htms += '<div class="row">'          	
			htms += '<div class="col-md-5">'
			htms += '<div class="second_banner_image">'
			htms += '<img src="panel/<?=$moduleName?>/images/second_banner.png">'
			htms += '</div>'
			htms += '</div>'
			htms += '<div class="col-md-7">'
			htms += '<div class="text_section">'
			htms += '<h2><?=$lang_resource['FRONT_VISUALS_AMAZING_APPS_HEADING']?></h2>'
			htms += '<p><?=$lang_resource['FRONT_VISUALS_AMAZING_APPS_DESCRIPTION']?><span><?=$lang_resource['FRONT_VISUALS_AMAZING_APPS_DESCRIPTION1']?></span></p>'
			htms += '</div>'
			htms += '</div>'
			htms += '</div>'
			htms += '</div>'
		}
		htms += '</div>'
		htms += '</div>'


       		
			
			
			

		if(Main.settingfront.reviewsetting == "t" && Main.reviewsfont !=""){
		htms +='<div class="main" id="font_review" style="display:none;">';

		htms +='<div class="restarant_review_dv">'
		htms +='<h2 class="heading2"><?=$lang_resource['REVIEW_RESTAURANTS']?></h2>'
		htms +='<div id="seemore_div">'
		htms +='<ul id="myList" >'
		for (var b  in Main.reviewsfont){
		if(Main.reviewsfont[b].bname!=null)
		
		{
		
		htms +='<li>'
		htms +='<div class="restlogo">'

		if(Main.reviewsfont[b].existspic==true){
		htms +='<img src="../panel/images/business/'+Main.reviewsfont[b].id_w_business+'/small.jpg">'
		}
		else
		{
		htms +='<img src="../panel/images/business/dummy.jpg">'
		}
		
		
		
		htms +='</div>'
		htms += '<div class="rvw_rest_dsp">'
		htms +='<h4> <a href="/'+Main.reviewsfont[b].bcustomeslug+'">'+Main.reviewsfont[b].bname+'</a></h4>'
		//htms +='<h4>'+Main.reviewsfont[b].bname+'</h4>'
		htms +='<ul class="review-star">'
		if(Math.round(Main.reviewsfont[b].ratings)==1)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[b].ratings)==2)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[b].ratings)==3)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[b].ratings)==4)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[b].ratings)==5)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		}
		else
		{
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}


		htms +='</ul>'
		htms +='<span class="rating">'+Main.reviewsfont[b].ratings+'</span>'
		htms +='<div class="home_comment_dv">'
		if(Main.reviewsfont[b].user=='-1')
		{
		htms +='<span><img src="../panel/images/users/dummy.jpg"></span>'
		}
		else
		{
		htms +='<span><img src="../panel/images/users/'+Main.reviewsfont[b].user+'/small.jpg"></span>'
		}
		htms +='<p>'+Main.reviewsfont[b].comment+'</p>'

		htms +='</div>'<!--home_comment_dv-->
		htms +='</div>'<!--rvw_rest_dsp-->

		htms +='</li>'
			
		}
		}
		htms +='</ul>'
		htms +='</div>'
		//alert(Main.reviewsfont.length);
		if(Main.reviewsfont !=""){
		if(Main.reviewsfont[b].status==true)
		{
		htms +='<a href="javascript:Main.SeeMore()" class="see_more" id="loadMore">See more </a>'

		}
		else
		{
		htms +='<a href="javascript:Main.SeeMore()" class="see_more" id="loadMore" style="display:none">See more </a>'
		}
		}

		htms +='<div id="loading">'
		htms +='</div>'




		htms +='</div>'

		htms +='<div class="rvw_ofthe_day">'
		htms += '<h2 class="heading2"><?=$lang_resource['REVIEW_OF_THE_DAY']?></h2>'
		htms +='<div class="rvw_ofthe_day_dv">'
		htms += '<div class="user_pic_dv">'
		if(Main.reviewsfont[0].user=='-1')
		{
		htms +='<span><img src="../panel/images/users/dummy.jpg"></span>'
		}
		else
		{
		htms +='<span><img src="../panel/images/users/'+Main.reviewsfont[0].user+'/small.jpg"></span>'
		}
		htms +='</div>'<!--user_pic_dv-->
		htms += '<div class="dsp-dv">'
		htms += '<h4>'+Main.reviewsfont[0].uname +' <span>Reviewed</span> '+Main.reviewsfont[0].bname+'</h4>'
		htms += '<ul class="review-star">'
		if(Math.round(Main.reviewsfont[0].ratings)==1)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[0].ratings)==2)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[0].ratings)==3)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[0].ratings)==4)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.reviewsfont[0].ratings)==5)
		{
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		}
		else
		{
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		htms += '</ul>'
		htms += '<p>'+Main.reviewsfont[0].comment+'</p>'
		htms += '<a href="/'+Main.reviewsfont[0].bcustomeslug+'">Read More</a>'
		htms += '</div>'<!--dsp-dv-->
		htms +='</div>'<!--rvw_ofthe_day_dv-->
		htms +='</div>'<!--rvw_ofthe_day-->

		htms +='</div>';

		////////////////////////onclick///////////////////////



		///////////////////////////////////////////////

		htms += '</div>';


}

		

	
					
			
      
		$.post("panel/lib/front-main.php", "f=FetchAllsettingsCustomFacebook", function (h) {
			var s = JSON.parse(h);
			if(s !=""){
				if(document.getElementById("facebookfanpage")){
					if(Main.settingfront.browse_per_city == 'f'){
						document.getElementById("facebookfanpage").innerHTML = '<iframe height="100%" frameborder="0" width="900px" scrolling="no" allowtransparency="true" style="border:none; visibility: visible; width:100%; height:240px;" src="'+s.value+'"></iframe>';
					}else{
						document.getElementById("facebookfanpage").innerHTML = '<iframe height="100%" frameborder="0" width="300px" scrolling="no" allowtransparency="true" style="border:none; visibility: visible; width:300px; height:240px;" src="'+s.value+'"></iframe>';
					}
				}
			}
			
		});
		return htms;
		
		
		
    },
	CMSUrl: function(){
		top.location = '/Request';
		return false;
	},
	RequestCollectionHtml: function(){
		var page = "";		
		Main.requestCollction.customer_name='';
		Main.requestCollction.customer_address1='';
		Main.requestCollction.customer_address2='';
		Main.requestCollction.customer_town ='';
		Main.requestCollction.customer_postcode='';
		Main.requestCollction.customer_contactno ='';
		Main.requestCollction.resturent_name ='';
		Main.requestCollction.resturent_address1  ='';
		Main.requestCollction.resturent_address2 ='';
		Main.requestCollction.resturent_town ='';
		Main.requestCollction.resturent_postcode='';
		Main.requestCollction.resturent_contactno=='';

		Main.requestCollction.resturent_collection_time ='';
		Main.requestCollction.resturent_other_value  ='';
		Main.requestCollction.resturent_other_reference ='';
		page +='<div class="Request_Collection_wra">';
		page +='<div class="main">';
		page +='<h4><?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'] ?></h4>';
		page +='<div class="Req_Col_in">';


		<!--Req_Col_left-->
		page +='<div class="Req_Col_left">';
		page +='<div class="Req_Col_left_hd"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_DETAILS'] ?></div> ';                   
		page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] ?> <span>*</span></label><span class="cami">:</span><input  id="customer_name" name="customer_name" autocomplete="off" type="text"  onkeyup="Main.requestCollctionUpdate(this,\'customer_name\')"></div> ';
		page +='<div class="Customer_Add"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] ?> <span>*</span></div>';
		page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE1'] ?></label><span class="cami">:</span><input id="customer_address1" name="customer_address1" type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'customer_address1\')"></div>';
		page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE2'] ?></label><span class="cami">:</span><input id="customer_address2" name="customer_address2"  type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'customer_address2\')"></div>';
		page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_TOWN'] ?></label><span class="cami">:</span><input id="customer_town" name="customer_town" type="text" autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'customer_town\')"></div>';
		page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></label><span class="cami">:</span><input id="customer_postcode" name="customer_postcode" type="text" autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'customer_postcode\')"></div>';
		page +='<div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] ?> <span>*</span></label><span class="cami">:</span><input id="customer_contactno" name="customer_contactno" autocomplete="off" type="text" onkeyup="Main.requestCollctionUpdate(this,\'customer_contactno\')" ></div>';

		page +=' </div>';
		<!--Req_Col_left end-->


		<!--Req_Col_left-->
		page +='<div class="Req_Col_left Req_Col_right">';
		page +='<div class="Req_Col_left_hd"><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_DETAILS'] ?></div> ';                   
		page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] ?>  <span>*</span></label><span class="cami">:</span><input  name="resturent_name" id="resturent_name" type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'resturent_name\')"></div> ';

		page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?> <span>*</span></label><span class="cami">:</span><input name="resturent_postcode" id="resturent_postcode" autocomplete="off" type="text"   onkeyup="Main.requestCollctionUpdate(this,\'resturent_postcode\')"></div>';
		page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] ?>  <span>*</span> </label><span class="cami">:</span><input name="resturent_collection_time" id="resturent_collection_time" autocomplete="off" type="text"   onchange="Main.requestCollctionUpdate(this,\'resturent_collection_time\')"></div>';
		page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] ?> </label><span class="cami">:</span><input name="resturent_other_value" id="resturent_other_value"  type="text" autocomplete="off"  onkeyup="Main.requestCollctionUpdate(this,\'resturent_other_value\')"></div>';
		page +=' <div class="Req_Col_row"><label><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] ?> </label><span class="cami">:</span><input name="resturent_other_reference" id="resturent_other_reference"  type="text"  autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'resturent_other_reference\')"></div>';
		page +='<div class="Req_Col_row"><label class="note"><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'] ?></label><span class="cami2">:</span><textarea name="customer_note" id="customer_note" cols="" rows="" autocomplete="off" onkeyup="Main.requestCollctionUpdate(this,\'customer_note\')" ></textarea></div>';		 
		page +='</div>';
		<!--Req_Col_left end-->

		page +='<div class="clearfix"></div>';

		page +='<div class="confirm_row">';
		page +='<input type="checkbox" id="requestClooectioncheckremember" class="checkbox_2">';
		page +='  <label for="requestClooectioncheckremember"><span class="confirm"><?= $lang_resource['REQUEST_COLLECTION_CONDITION_CHK'] ?> </span></label>';
		page +='</div>';




		page +='  <div class="btn_Col_row"><button type="button" id="" class="Request_btn"  onclick="Main.placeRequestCollection();"><?= $lang_resource['REQUEST_COLLECTION'] ?> </button></div>';



		page +=' </div>';
		page +=' </div>';
		page +=' </div>';

		return page;
    },

	CheckSelect1: function(){		
		if ($("#checkbox1").is(':checked')) {
			Main.deliveryAccept = 1;
        	$("#checkbox2").prop('checked',false);
     	}
	},	
	CheckSelect2: function(){
		 if ($("#checkbox2").is(':checked')) {
			 Main.deliveryAccept = 2;
        	$("#checkbox1").prop('checked',false);
        }
	},	
    CreateFacepile: function () {
        return '<div class="facepile"><div class="innerbox hand"><div class="followbox"><span><?= $lang_resource['BODY_FOLLOW_US'] ?></span><a rel="nofollow" href="http://www.facebook.com/pages/Ordering-Online-System/267925886640412" target="_blank"></a><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOrdering-Online-System%2F267925886640412&amp;send=false&amp;layout=standard&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=80&amp;appId=410337302329626" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:600px; height:80px;" allowtransparency="true" allowTransparency="true"></iframe></div></div></div>​'
    },
    CreateMiniWhereAmIButton: function (a, c, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
        return "<div " + b + 'class="miniwhereamibutton"><div class="innerbox hand" onclick="' + c + '"><div class="captionbox"><span class="caption nonselectable">' + a + "</span></div></div></div>"
    },
    CreateRegularButton: function (d, c, a, e, b) {
        if (b) {
            b = 'id="' + b + '" '
        } else {
            b = ""
        }
        return "<div " + b + 'class="regularbutton"><div class="innerbox hand ' + c + '" onclick="' + e + '"><div class="img ' + d + '"></div><div class="captionbox"><span class="caption nonselectable caption' + c + '">' + a + "</span></div></div></div>"
    },
    CreateBigTagInput: function (d, b, a, c) {
        return '<div class="biginputbox" style="width:' + a + "px;" + c + '"><div class="biginnerbox">' + d + '<div class="tag ' + b + '"></div></div></div>'
    },
	CreateBigTagInputTextbox: function (d, b, a, c) {
        return '<div class="biginputbox" style="width:' + a + "px;" + c + '"><div class="biginnerbox">' + d +'<button type="button" class="geo_btn" style="background-color:#dcdcdc; height:44px !important;"  onclick="Main.GetUserLocation1()"><img src="images/homeimage/add-icon.png"></button><div class="tag ' + b + '"></div></div></div>'
    },
	CreateBigTagInputTextboxCitySearch: function (d, b, a, c) {
        return '<div class="biginputbox" style="width:' + a + "px;" + c + '"><div class="biginnerbox">' + d +'<button type="button" class="geo_btn" style="background-color:#dcdcdc; height:44px !important;"  onclick="Main.GetUserLocationFromCitySearch()"><img src="images/homeimage/add-icon.png"></button><div class="tag ' + b + '"></div></div></div>'
    },
    CreateMainStepsBox: function () {
		var hts = '';
		var hts = '<div class="lft_hm_div">';
        return hts;
    },
    CreateMainActivityBox: function () {
        var b = "";
        b = '<div class="activitybox"><div class="innerbox"><div class="tag1"></div><div class="tag2"></div>';
        b += '<div id="recentbox">';
        if (Main.recentactivity) {  
            var c = Main.recentactivity.length - 1;
            var a = 0;
            var e = 0;
            for (var d in Main.recentactivity) {
                b += '<span class="caption nonselectable default color' + e + '">' + Main.TitleCase(Main.recentactivity[d].user.name) + " <?= $lang_resource['JUST_ORDERED_V2'] ?> " + Main.recentactivity[d].business.name + "</span>";
                if (a < c) {
                    b += '<div class="recentdivider"></div>'
                }
                e++;
                if (e > 1) {
                    e = 0
                }
                a++
            }
        }
        b += '</div><div class="divider"></div>';
        b += '<div id="popularbox">';
        if (Main.populars) {
            for (var d in Main.populars) {
                BgStyle = "background-image:url('panel/images/business/" + Main.populars[d] + "/small.jpg?c=" + Main.Random + "');";
                b += '<div class="img" style="' + BgStyle + '"></div>'
            }
        }
        b += "</div></div></div>";
        return b
    },
    CreateLoginBox: function () {
    	var lgn = ''
		lgn +='<div class="modal-dialog modal-sm" role="document">'
		lgn +='<div class="modal-content">'
		lgn +='<div class="modal-header">'
		lgn +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		lgn +='<h4 class="modal-title" id="LoginHeading">Login</h4>'
		lgn +='</div>'
		lgn +='<div class="modal-body">'

		lgn +='<div id="loginbox">'
		lgn +='<div id="usermenu">'
		lgn +='</div>'		
		lgn +='</div>'

		lgn +='<div id="loginbottom">'
		lgn +='</div>'

		lgn +='</div>'
		lgn +='</div>'
		lgn +='</div>'
		
		return lgn;
    },
    UserMenuSection: function(){
		var em ="";
		var ps ="";
		var chk="";
		if((document.cookie.indexOf('emailID')!= -1)&&(document.cookie.indexOf('passVAL')!= -1)){
			var em = getCookie("emailID");
			var ps = getCookie("passVAL");
			if (em != "" && ps != ""){
				chk='checked="checked"';
			}
		}
		var em1 = getCookie("emailID");
		var ps1 = getCookie("passVAL");		
		if(em1==null){   
			chk ='';
		}

    	var lgn = ''
    	lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<label><?= $lang_resource['Email_ID_V2'] ?></label>'
		lgn +='<input type="text" class="form-control" id="loginemail" value="'+Main.NullToEmpty(em)+'">'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-12-->
		lgn +='</div>'<!--row-->
		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<label><?= $lang_resource['Password_V2'] ?></label>'
		lgn +='<input type="password" class="form-control" value="'+Main.NullToEmpty(ps)+'" id="loginpassword" onkeyup="Main.LoginPwdType(event)">'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-12-->
		lgn +='</div>'<!--row-->
		lgn +='<div class="checkbox remember_me">' 
		lgn +='<input type="checkbox" '+chk+' id="checkremember2">' 
		lgn +='<label for="checkremember2"><?=$lang_resource['MOBILE_MYACCOUNT_REMEMBER_ME'];?></label>'
		lgn +='</div>'

		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<button type="button" class="red_btn_small" onclick="Main.Login()"><?= $lang_resource['LOGIN_BUTTON_LOGIN'] ?></button>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->            
		lgn +='</div>'<!--row-->

		lgn +='<div class="row">'
		lgn +='<div class="col-md-6">'
		lgn +='<div class="form-group">'
		lgn +='<a href="javascript:Visuals.RecoverForm(true)" class="login_link_btn" ><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></a>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->
		lgn +='<div class="col-md-6">'
		lgn +='<div class="form-group text-right">'
		lgn +='<a href="javascript:Main.CommonAccount()" class="login_link_btn"><?= $lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] ?></a>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->
		lgn +='</div>'<!--row-->

		return lgn
    },
    LoginBoottomSection: function(){
    	var lgn = ''
    	lgn +='<div class="or_dv" id="elseces">Or</div>'<!--or_dv-->
		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'
		lgn +='<div class="form-group">'
		lgn +='<button type="button" class="login_with_fb" onclick="Facebook.Login()"><?= $lang_resource['LOGIN_WITH_FACEBOOK'] ?></button>'
		lgn +='</div>'<!--form-group-->
		lgn +='</div>'<!--col-md-6-->            
		lgn +='</div>'<!--row-->
		lgn +='</div>'<!--modal-body-->

		lgn +='</div>'
		lgn +='</div>'
		return lgn
    },
    AfterLoginHtml: function(){
    	var lgn = ''
		$("#LoginHeading").empty().append('<?= $lang_resource['LOGIN_WELCOME_TEXT'] ?> ' + Main.NullToEmpty(Main.User.name) + '!')

		if (Main.User.level != 3){
			lgn +='<div class="row">'
			lgn +='<div class="col-md-12">'			
			lgn +='<label onclick="top.location.href=\'admin\'" class="hand loginbox_inner_label"><?= $lang_resource['LOGIN_LINK_CONTROL_PANEL'] ?></label>'			
			lgn +='</div>'<!--col-md-12-->
			lgn +='</div>'<!--row-->
		}

		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'			
		lgn +='<label onclick="MyAccount.Start();" class="hand loginbox_inner_label"><?= $lang_resource['FRONT_MY_ACCOUNT'] ?></label>'			
		lgn +='</div>'<!--col-md-12-->
		lgn +='</div>'<!--row-->

		lgn +='<div class="row">'
		lgn +='<div class="col-md-12">'			
		lgn +='<label onclick="Main.LogOut()" class="hand loginbox_inner_label"><?= $lang_resource['LOGIN_LINK_SESSION_CLOSE'] ?></label>'			
		lgn +='</div>'<!--col-md-12-->
		lgn +='</div>'<!--row-->

	
		return lgn       
    },
    LoginDetails: function(){
		Forms.Clean("logindetails", "popupmainbuttonok");
        Main.ActiveForm = "logindetails";
        var b = false;
        var em ="";
        var ps ="";
        var chk="";

        if((document.cookie.indexOf('emailID')!= -1)&&(document.cookie.indexOf('passVAL')!= -1)){
        	var em = getCookie("emailID");
			var ps = getCookie("passVAL");
			if (em != "" && ps != ""){
				chk='checked="checked"';
			}
		}
		var em1 = getCookie("emailID");
		var ps1 = getCookie("passVAL");
		if(em1==null){   
			chk ='';
		}
		var html =''
		html +='<div class="modal-header">'
		html +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		html +='<h4 class="modal-title"></h4>'
		html +='</div>'
		html +='<div class="modal-body login_sign_up">'

		html +='<div class="row">'
		html +='<div class="col-md-6 login_sign_up_line">'
		html +='<div class="login_sign_up_devider_left">'
		html +='<h5 class="signup_heading"><?= $lang_resource['FRONT_RETURNING_CUSTOMER'] ?></h5>'
		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['LOGIN_INPUT_EMAIL'] ?></label>'
		html +='<input type="text" class="form-control" id="loginemail1" value="'+Main.NullToEmpty(em)+'">'
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?></label>'
		html +='<input type="password" id="loginpassword1" value="'+Main.NullToEmpty(ps)+'" class="form-control">'
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='<div class="checkbox remember_me">' 
		html +='<input type="checkbox" id="checkremember" '+chk+'>' 
		html +='<label for="checkremember"><?= $lang_resource['FRONT_REMEMBER_ME'] ?></label>'
		html +='</div>'


		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="form-group"><br>'
		html +='<button type="button" class="red_btn_small" onclick="Main.LoginCheck()"><?= $lang_resource['FRONT_SIGN_IN_TO_CHECKOUT'] ?></button>'
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-6-->            
		html +='</div>'<!--row-->

		html +='<div class="row">'
		html +='<div class="col-md-6">'
		html +='<div class="form-group">'
		html +='<a href="javascript:Visuals.RecoverForm(true)" class="login_link_btn" ><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></a>'
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-6-->

		html +='</div>'<!--row-->
		html +='</div>'<!--login_sign_up_devider_left-->
		html +='</div>'<!--col-md-6-->
		html +='<div class="col-md-6">'
		html +='<div class="login_sign_up_devider_right">'
		html +='<h5 class="signup_heading"><?= $lang_resource['FRONT_NEW_CUSTOMER'] ?></h5>'
		html +='<h5><strong><?= $lang_resource['FRONT_SAVE_TIME_NOW'] ?></strong></h5>'
		html +='<p><?= $lang_resource['FRONT_YOU_DONT_HAVE_ACCOUNT'] ?></p>'
		html +='<div class="form-group">'
		html +='<button type="button" class="red_btn_small" onclick="Shopping.OpenCartGuest()"><?= $lang_resource['FRONT_CONTINUE_AS_A_GUEST'] ?></button>'
		html +='</div>'<!--form-group-->

		html +='<h5><strong><?=$lang_resource['FRONT_SAVE_TIME_LATTER'];?></strong></h5>'
		html +='<p><?= $lang_resource['FRONT_CREATE_ACCOUNT_FOR_FAST_CHECKOUT'] ?></p>'
		html +='<div class="form-group">'
		html +='<button type="button" class="red_btn_small" onclick="Main.EditAccount1(true);Popup.Close();"><?= $lang_resource['FRONT_CREATE_ACCOUNT'] ?></button>'
		html +='</div>'<!--form-group-->
		html +='<div class="or_dv"><?= $lang_resource['ELSE_V2'] ?></div>'<!--or_dv-->
		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="form-group">'
		html +='<button type="button" class="login_with_fb" onclick="Facebook.Login()"><?=$lang_resource['LOGIN_IN_WITH_FACEBOOK']?></button>'
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-6-->            
		html +='</div>'<!--row-->
		html +='</div>'<!--login_sign_up_devider_right-->
		html +='</div>'<!--col-md-6-->
		html +='</div>'<!--row-->


		html +='</div>'<!--modal-body-->
		
		Popup.Show(html);	       
	},

    CreateSocialButtons: function () {
        var a = "";
      
        document.getElementById("socialbtns").innerHTML = Visuals.CreateMobileButton() + Visuals.CreateHelpButton() + a
    },
    CreateHelpButton: function () {
        return '<div class="helpbutton hand nonselectable" onclick="top.location.href=\'support.html\'"><span><?= $lang_resource['FRONT_VISUALS_HELP'] ?></span></div>'
    },
    CreateMobileButton: function () {
        return '<div class="mobilebutton hand nonselectable" onclick="top.location.href=\'mobile.php\'"><div class="icon"></div><span><?= $lang_resource['LOGIN_CREATE_MOBILE'] ?></span></div>'
    },
	Trackorder: function(){
		var n =''
		n +='<div class="modal-header">'
		n +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		n +='<h4 class="modal-title" id="myModalLabel"><?=$lang_resource['INDEX_TRACK_ORDER_1']?></h4>'
		n +='</div>'
		n +='<div class="modal-body">'
		n +='<div class="form-group">'
		n +='<label><?=$lang_resource['INDEX_ENTER_YOUR_ORDER_ID']?></label>'
		n +='<input type="text" class="form-control" id="consultorder" onKeyUp="Main.CheckOrderEnter(event);">'
		n +='</div>'<!--form-group-->



		n +='</div>'<!--modal-body-->
		n +='<div class="pop-message-dv showOrdhide" style="display:none;">'
		n +='<?=$lang_resource['INDEX_YOUR_ORDER_STATUS']?> <span class="odrstus">“Pending”</span>'
		n +='</div>'<!--pop-message-dv-->
		n +='<div class="modal-footer">'
		n +='<button type="button" class="popup_btn trck_order_button" onClick="Main.CheckOrder(event);"><?= $lang_resource['TRACKNOW_V21'] ?></button>'
		n +='<button type="button"  class="popup_btn trck_order_button show_order" style="display:none" onClick="Visuals.OpenEachOrderByID();" ><?= $lang_resource['INDEX_SHOW_ORDER'] ?></button>'
		n +='</div>'
		Popup.Show(n)
	},
	OpenEachOrderByID: function(){
		var html =''
		var bcar = Main.Temp.Order.bcar
		html +='<div class="modal-header modal-header-red">'
		html +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		if(Main.Temp.PseudoCart.buyer.deliveryType == "delivery"){
			if(Main.NullToEmpty(Main.Temp.Order.bdeliverytime) == "" || Main.NullToEmpty(Main.Temp.Order.bdeliverytime) == undefined){
				var dt = '00:00';							
			}else{
				var dt = Main.NullToEmpty(Main.Temp.Order.bdeliverytime)				
			}
			html +='<h4><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?></h4>'
			html +='<h1>'+dt+'</h1>'
		}else{
			if(Main.NullToEmpty(Main.Temp.Order.bpickuptime) == "" || Main.NullToEmpty(Main.Temp.Order.bpickuptime) == undefined){
				var pt = '00:00';							
			}else{
				var pt = Main.NullToEmpty(Main.Temp.Order.bpickuptime)				
			}
			html +='<h4><?=$lang_resource['MENULIST_ESTIMATE_PICKUP_TIME']?></h4>'
			html +='<h1>'+pt+'</h1>'
		}
		
		html +='</div>'
		html +='<div class="modal-body">'
		html +='<h4 class="order_no_heading"><?= $lang_resource['Order_V2'] ?> #' + Main.Temp.Order.id+' ( '+Main.Temp.Order.status+' )</h4>'
		if(Main.Temp.PseudoCart.business[0].dishes != ""){
			html +='<div class="product_details">'
			html +='<div class="row">'
			html +='<div class="col-md-6">'
			html +='<h4><?=$lang_resource['CONFIRMATION_FROM']?></h4>'
			html +='<p><strong>'+Main.NullToEmpty(Main.Temp.PseudoCart.business[0].name)+'</strong></p>'
			html +='<p>'+Main.NullToEmpty(Main.Temp.Order.bstreet)+'</p>'
			html +='<p>'+Main.NullToEmpty(Main.Temp.Order.bcolony)+'</p>'
			html +='<p>'+Main.NullToEmpty(Main.Temp.PseudoCart.business[0].tel)+'</p>'
			html +='</div>'<!--col-md-6-->
			html +='<div class="col-md-6">'
			html +='<h4><?=$lang_resource['CONFIRMATION_TO']?></h4>'		
			html +='<p><strong>'+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name)+'</strong></p>'
			html +='<p>'+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address)+'</p>'
			html +='<p>'+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.colony)+'</p>'
			html +='<p>'+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel)+'</p>'
			html +='</div>'<!--col-md-6-->
			html +='</div>'<!--row-->
			html +='</div>'<!--product_details-->
			html +='<div class="product_details">'
			html +='<div class="row">'
			html +='<div class="col-md-6">'
			html +='<h4><?=$lang_resource['TRACK_ORDER_COMMENTS']?> :</h4>'
			html +='<p class="comments">'+Main.NullToEmpty(Main.Temp.Order.comment)+'</p>'
			html +='</div>'<!--col-md-6-->
			html +='<div class="col-md-6">'
			html +='<h4><?=$lang_resource['TRACK_ORDER_DRIVER_COMMENTS']?> :</h4>'
			html +='<p class="comments">'+Main.NullToEmpty(Main.Temp.Order.driver_comment)+'</p>'
			html +='</div>'<!--col-md-6-->
			html +='</div>'<!--row-->
			html +='<div class="row">'
			html +='<div class="col-md-6">'
			html +='<h4><?=$lang_resource['TRACK_ORDER_USER_COMMENTS']?> :</h4>'
			html +='<p class="comments">'+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments)+'</p>'
			html +='</div>'<!--col-md-6-->
			html +='</div>'<!--row-->
			html +='</div>'<!--product_details-->
			html +='<div class="product_details_tbl">'

			html +='<div class="row">'
			html +='<div class="col-md-12">'
			html +='<div class="table-responsive">'
			html +='<table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%">'
			html +='<tbody>'

			for (j in Main.Temp.PseudoCart.business[0].dishes){
				html +='<tr>'
				html +='<td>1x</td>'
				html +='<td>'+Main.Temp.PseudoCart.business[0].dishes[j].name
				if(Main.Temp.PseudoCart.business[0].dishes[j].options) {
				html +'<br>'+ProductOption.Margeslash(Main.Temp.PseudoCart.business[0].dishes[j].options)
				}
				html +'<small id="' + j + "_" + Main.Temp.PseudoCart.business[0].dishes[j].id + '_pseudoingredients"><small>'
				html +'<small id="' + j + "_" + Main.Temp.PseudoCart.business[0].dishes[j].id + '_pseudoextras"><small>'
				html +='</td>'
				html +='<td id="dish_' + j + "_" + Main.Temp.PseudoCart.business[0].dishes[j].id + '_price">'+Shopping.FormatPrice(Main.Temp.PseudoCart.business[0].dishes[j].total,bcar)+'</td>'
				html +='</tr>'
			}		
			html +='</tbody></table>'
			html +='</div>'<!--table-responsive-->                                
			html +='</div>'<!--col-md-12-->                         
			html +='</div>'<!--row-->
			html +='</div>'<!--product_details_tbl-->
		}
		if(Main.Temp.PseudoCart.reservestatus){
			html +='<h4 class="order_no_heading"><?= $lang_resource['TRACK_ORDER_RESERVASTION_HEADING'] ?></h4>'

			html +='<div class="product_details_tbl">'

			html +='<div class="row">'
			html +='<div class="col-md-12">'
			html +='<div class="table-responsive">'
			html +='<table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%">'
			html +='<tbody>'
			html +='<tr>'
			html +='<td><?= $lang_resource['LOGIN_CREATE_NAME'] ?></td>'
			html +='<td>:</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserve.name)+'</td>'
			html +='<td>&nbsp;</td>'
			html +='</tr>'
			html +='<tr>'
			html +='<td><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></td>'
			html +='<td>:</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserve.email)+'</td>'
			html +='<td>&nbsp;</td>'
			html +='</tr>'
			html +='<tr>'
			html +='<td><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></td>'
			html +='<td>:</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserve.tel)+'</td>'
			html +='<td>&nbsp;</td>'
			html +='</tr>'
			html +='<tr>'
			html +='<td><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></td>'
			html +='<td>:</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rdate)+'</td>'
			html +='<td>&nbsp;</td>'
			html +='</tr>'
			html +='<tr>'
			html +='<td><?= $lang_resource['FRONT_DRIVER_TIME'] ?></td>'
			html +='<td>:</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rhour) + ':'+ Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rmin1) + '</td>'
			html +='<td>&nbsp;</td>'
			html +='</tr>'                            
			html +='</tbody>'
			html +='</table>'
			html +='</div>'<!--table-responsive-->                                
			html +='</div>'<!--col-md-12-->                         
			html +='</div>'<!--row-->
			html +='</div>'<!--product_details_tbl-->

			html +='<div class="product_details_tbl">'
			html +='<div class="row">'
			html +='<div class="col-md-12">'
			html +='<div class="table-responsive">'
			html +='<table class="table table-striped table-condensed rsv_tbl">'
			html +='<thead>'
			html +='<tr>'
			html +='<th><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></td>'
			html +='<th><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></td>'
			html +='<th><?= $lang_resource['FRONT_RESERVATION_FREE'] ?></td>'
			html +='<th><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></td>'
			html +='<th><?= $lang_resource['Price_V2'] ?></td>'
			html +='</tr>'
			html +='</thead>'
			html +='<tbody>'
			html +='<tr>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Table)+'</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Room)+'</td>'
			html +='<td>'+Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Free)+'</td>'
			html +='<td>'
			if(Main.Temp.PseudoCart.reserveQty.Table){
				if(Main.Temp.PseudoCart.reserveQty.Table.length != 0){
					html +='<?= $lang_resource['FRONT_RESERVATION_TABLE'] ?>  '+Main.Temp.PseudoCart.reserveQty.Table.length+' X '+(Main.NullToEmpty(Main.Temp.Order.tableprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.tableprice)
					html +='<br>'
				}
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
				if(Main.Temp.PseudoCart.reserveQty.Room.length != 0){
					html +='<?= $lang_resource['FRONT_RESERVATION_ROOM'] ?>  '+Main.Temp.PseudoCart.reserveQty.Room.length+' X '+(Main.NullToEmpty(Main.Temp.Order.roomprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.roomprice)
					html +='<br>'
				}
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
				if(Main.Temp.PseudoCart.reserveQty.Free.length != 0){
					html +='<?= $lang_resource['FRONT_RESERVATION_FREE'] ?>  '+Main.Temp.PseudoCart.reserveQty.Free.length+' X '+(Main.NullToEmpty(Main.Temp.Order.freeprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.freeprice)
				}
			}			
			html +='</td>'
			if(Main.Temp.PseudoCart.reserveQty.Table){
				var tableprice = Main.Temp.PseudoCart.reserveQty.Table.length * Main.Temp.Order.tableprice ;
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
				var roomprice = Main.Temp.PseudoCart.reserveQty.Room.length * Main.Temp.Order.roomprice ;
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
				var freeprice = Main.Temp.PseudoCart.reserveQty.Free.length * Main.Temp.Order.freeprice ;
			}
			html +='<td align="right">'
			if(Main.Temp.PseudoCart.reserveQty.Table){
				if(tableprice != 0){
					html += bcar+' '+tableprice.toFixed(Main.IS_DECIMAL_POINT)+'<br>'
				}		
			}
			if(Main.Temp.PseudoCart.reserveQty.Room){
				if(roomprice != 0){
					html += bcar+' '+roomprice.toFixed(Main.IS_DECIMAL_POINT)+'<br>'
				}		
			}
			if(Main.Temp.PseudoCart.reserveQty.Free){
				if(freeprice != 0){
					html += bcar+' '+freeprice.toFixed(2)
				}		
			}
			html +='</td>'
			html +='</tr>'
			html +='<tr>'
			html +='<td colspan="4"><?= $lang_resource['EXPORT_TOTAL'] ?></td>'
			html +='<td align="right">'+bcar+' '+parseFloat(Main.Temp.PseudoCart.reserveFee).toFixed(Main.IS_DECIMAL_POINT)+'</td>'
			html +='</tr>'

			html +='</tbody>'
			html +='</table>'
			html +='</div>'	
			html +='</div>'<!--col-md-12-->
			html +='</div>'<!--row-->
			html +='</div>'<!--product_details_tbl-->
		}

		html +='<div class="product_details_tbl">'
		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="table-responsive">'
		html +='<table class="confirmation_tbl order_dts_tbl" border="0" cellpadding="0" cellspacing="0" width="100%">'
		html +='<tbody>'
		var i=0;

		if(Main.Temp.PseudoCart.business[i].shipping != 'Pending'){
			//Delivery Shipping
			
			if (parseFloat(Main.Temp.PseudoCart.business[i].shipping) > 0){
				a = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
			}else{
				a = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
			}
			html +='<tr>'
			html +='<td colspan="2">'+ a + '<small><br>'+Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments)+'</small></td>'                                   
			html +='<td><strong id="' + Main.Temp.PseudoCart.business[i].id + '_shipping">'+Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].shipping,bcar)+'</strong></td>'
			html +='</tr>'
			//Delivery Shipping
		}
		

		//Discount
		if((Main.Temp.PseudoCart.discounttype > 0) && (Main.NullToEmpty(Main.Temp.PseudoCart.discountprice)!='')){
			if(Main.Temp.PseudoCart.discounttype == 1){
				var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?> ('+Main.Temp.PseudoCart.discountrate+'%)'
			}else{
				var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?>';
			}
			html +='<tr>'
			html +='<td colspan="2">'+discaption+'<small id="' + Main.Temp.PseudoCart.business[i].id + '_comments">'+Main.NullToEmpty(Main.Temp.PseudoCart.discountcomments)+'</small></td>'                                   
			html +='<td class="credit_price_text"><strong id="' + Main.Temp.PseudoCart.business[i].id + '_shipping">'+Shopping.FormatPrice(Main.Temp.PseudoCart.discountprice,bcar)+'</strong></td>'
			html +='</tr>'
		}
		//Discount

		//Tax
		if(Main.Temp.PseudoCart.buyer.tax){
			if(Main.Temp.PseudoCart.buyer.taxtype == 2){
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED']?>"
			}else{
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED']?>"
			}		
			html +='<tr>'
			html +='<td colspan="2"><?=$lang_resource['REORDER_CONFIRM_TAX']?> ('+Main.Temp.PseudoCart.buyer.tax+' %) ( '+taxstatus+' )</td>'                                   
			html +='<td><strong>'+Shopping.FormatPrice(Main.Temp.PseudoCart.tax,bcar)+'</strong></td>'
			html +='</tr>'
		}
		//Tax

		//Service Fee
		if(Main.Temp.PseudoCart.servicefeeTotal1){
			html +='<tr>'
			html +='<td colspan="2"><?=$lang_resource['SERVICE_FEE_V2']?> ('+Main.Temp.PseudoCart.servicefee+' %)</td>'                                   
			html +='<td><strong>'+Shopping.FormatPrice(Main.Temp.PseudoCart.servicefeeTotal1,bcar)+'</strong></td>'
			html +='</tr>'
		}
		//Service Fee

		//Tips
		if(parseInt(Main.Temp.PseudoCart.buyer.tips)>0) {
			html +='<tr>'
			html +='<td colspan="2"><?=$lang_resource['TRACKORDER_TIPS']?></td>'                                   
			html +='<td><strong>'+Shopping.FormatPrice(Main.Temp.PseudoCart.buyer.tips,bcar)+'</strong></td>'
			html +='</tr>'
		}
		//Tips

		//Point Section
		if(Main.Temp.PseudoCart.Total_Point_Used !=null){
			html +='<tr>'
			html +='<td colspan="2"><?=$lang_resource['TRACKORDER_TOTAL_VALUE']?></td>'                                   
			html +='<td class="credit_price_text"><strong>'+Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(2),bcar)+'</strong></td>'
			html +='</tr>'
		}
		if(Main.Temp.PseudoCart.Total_Point_Used !=null){
			html +='<tr>'
			html +='<td colspan="2"><?=$lang_resource['TRACKORDER_USED_POINTS']?></td>'                                   
			html +='<td class="credit_price_text"><strong>'+Main.Temp.PseudoCart.Total_Point_Used+'</strong></td>'
			html +='</tr>'
		}
		if(Main.Temp.PseudoCart.usedpointvalue !=null){
			html +='<tr>'
			html +='<td colspan="2"><?=$lang_resource['TRACKORDER_USED_POINTS_VALUE']?></td>'                                   
			html +='<td class="credit_price_text"><strong>'+Main.Temp.PseudoCart.usedpointvalue+'</strong></td>'
			html +='</tr>'
		}
		//Point Section
		html +='<tr>'
		html +='<td colspan="2" class=" total_text"><?= $lang_resource['Your_Total_V2'] ?></td>'  
		if(Main.Temp.PseudoCart.totalfinla !=null){
			html +='<td class="total_price_text"><strong>'+Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.totalfinla).toFixed(Main.IS_DECIMAL_POINT))+'</strong></td>'
		}else{
			html +='<td class="total_price_text"><strong>'+Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(Main.IS_DECIMAL_POINT),bcar)+'</strong></td>'
		}                               
		
		html +='</tr>'
		html +='</tbody></table>'
		html +='</div>'<!--table-responsive-->
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='</div>'<!--product_details_tbl-->

		html +='<br><br>'
		var payment = ''
		if(Main.Temp.PseudoCart.business[i].paymethod.cash == true) {
			payment += '<?=$lang_resource['FRONT_CASH']?>'
		} else if(Main.Temp.PseudoCart.business[i].paymethod.card == true) {
			payment += '<?=$lang_resource['FRONT_CARD']?>';  
		} else if(Main.Temp.PseudoCart.business[i].paymethod.braintree == true) {
			payment += '<?=$lang_resource['FRONT_BRAINTREE']?>';  
		} else if(Main.Temp.PseudoCart.business[i].paymethod.authorize == true) {
			payment += '<?=$lang_resource['FRONT_AUTHORIZE']?>';  
		} else if(Main.Temp.PseudoCart.business[i].paymethod.cardsave == true) {
			payment += '<?=$lang_resource['FRONT_CARDSAVE']?>';  
		} else if(Main.Temp.PseudoCart.business[i].paymethod.paypal == true) {
			payment += '<?=$lang_resource['FRONT_PAYPAL']?>';  
		}  else if(Main.Temp.PseudoCart.business[i].paymethod.marco == true) {
			payment += '<?=$lang_resource['FRONT_MACRO']?>';  
		} else if(Main.Temp.PseudoCart.business[i].paymethod.paypaladaptive == true) {
			payment += '<?=$lang_resource['FRONT_PAYPALADAPTIVE']?>';  
		} else if(Main.Temp.PseudoCart.business[i].paymethod.authorizednet == true) {
			payment += '<?=$lang_resource['FRONT_AUTHORIZEDOTNET']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.transactium == true) {
			payment += '<?=$lang_resource['FRONT_TRANSACTIUM']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.skrill == true) {
			payment += '<?=$lang_resource['PAYMENT_SKRILL_PAY']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.payeezy == true) {
			payment += '<?=$lang_resource['PAYMENT_PAYEEZY_PAY']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.voguepay == true) {
			payment += '<?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.pexpress == true) {
			payment += '<?=$lang_resource['PAYMENT_PEXPRESS_PAY']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.maksekeskus == true) {
			payment += '<?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?>';  
		}else if(Main.Temp.PseudoCart.business[i].paymethod.stripe == true) {
			if(Main.Temp.Order.stripe_result == null){
				payment +='<?=$lang_resource['PAYMENT_STRIPE_PAY_NOT']?>';
			}else{
				payment +='<?=$lang_resource['PAYMENT_STRIPE_PAY']?>';
			}
		}else if(Main.Temp.PseudoCart.business[i].paymethod.payu == true) {
			if(Main.Temp.Order.payu_result==null){
				payment +='<?=$lang_resource['PAYMENT_PAYUMONEY_PAY_NOT']?>';
			}else{
				payment +='<?=$lang_resource['PAYMENT_PAYUMONEY_PAY']?>';
			}
		}
		html +='<h4 class="method_text"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?>  '+payment+'</h4>'
		if(Main.Temp.PseudoCart.buyer.deliveryType == 'undefined' && Main.Temp.PseudoCart.reservestatus == true){
			html +='<h4 class="method_text"><?=$lang_resource['CONFIRMATION_DELIVERY_METHOD']?> : Reservation</h4>'
		}else{
			html +='<h4 class="method_text"><?=$lang_resource['CONFIRMATION_DELIVERY_METHOD']?> : '+Main.Temp.PseudoCart.buyer.deliveryType+'</h4>'
		}

		
		html +='<br><br>'
		if(Main.Temp.Order.bpermission == "t") {
			html +='<div class="row">'
			html +='<div class="col-md-6 col-md-offset-3">'
			html +='<button type="button" class="checkout_btn" onclick="Main.Reorderalert(' + Main.Temp.Order.id + ')"><?= $lang_resource['TRACK_REORDER'] ?></button>'
			html +='</div>'<!--col-md-4-->
			html +='</div>'<!--row-->
		}	
		if(Main.Temp.Order.gprs_url != null && Main.Temp.Order.statnum == 4){
			html +='<div class="row">'
			html +='<div class="col-md-6 col-md-offset-3">'
			html +='<a href="'+ Main.Temp.Order.gprs_url +'" target="_blank">'
			html +='<button type="button" class="checkout_btn"><?=$lang_resource['FRONT_TRACK_DRIVER_GPS'];?></button>'
			html +='</a>'
			html +='</div>'<!--col-md-4-->
			html +='</div>'<!--row-->
		}

		html +='</div>'<!--modal-body-->
		

		Popup.Show(html,Main.MyorderCalculation)
	},	
	CommonRegisterForm: function(){
		
		var htm = ''

		htm +='<div class=" inner_banner_black">'
		htm +='<div class="container">'
		htm +='<div class="restaurant_info">'
		htm +='<h3><?=$lang_resource['SIGN_UP_HEADING']?></h3>'

		htm +='</div>'<!--restaurant_info-->
		htm +='</div>'<!--container-->
		htm +='</div>'<!--inner_banner_black-->

		htm +='<div class="container">'
		htm +='<div class="row">'
		htm +='<div class="col-md-6">'         
		htm +='<div class="white_box">'
		htm +='<div class="sign_up_wrapper">'
		htm +='<p class="text-center"><img src="panel/<?=$moduleName?>/images/sign-up-icon-1.png"></p>'
		htm +='<h3><?=$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE1']?></h3>'
		htm +='<p class="infotext"><?=$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE2']?></p>'
		htm +='<p class="infotext"><?=$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE3']?></p>'
		htm +='<div class="row">'
		htm +='<div class="col-md-8 col-md-offset-2">'
		htm +='<button type="button" class="red_btn_small" onclick="Main.RegisterChoiceType(1);" ><?=$lang_resource['MAP_NEXT']?></button>'
		htm +='</div>'<!--col-md-6-->
		htm +='</div>'<!--row-->
		htm +='</div>'<!--sign_up_wrapper-->

		htm +='</div>'<!--white_box-->
		htm +='</div>'<!--col-md-8-->
		htm +='<div class="col-md-6">'          
		htm +='<div class="white_box">'
		htm +='<div class="sign_up_wrapper">'
		htm +='<p class="text-center"><img src="panel/<?=$moduleName?>/images/sign-up-icon-2.png"></p>'
		htm +='<h3><?=$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE1']?></h3>'
		htm +='<p class="infotext"><?=$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE2']?></p>'
		htm +='<p class="infotext"><?=$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE3']?></p>'
		htm +='<div class="row">'
		htm +='<div class="col-md-8 col-md-offset-2">'
		htm +='<button type="button" class="red_btn_small" onclick="Main.RegisterChoiceType(2);" ><?=$lang_resource['MAP_NEXT']?></button>'
		htm +='</div>'<!--col-md-6-->
		htm +='</div>'<!--row-->
		htm +='</div>'<!--sign_up_wrapper-->

		htm +='</div>'<!--white_box-->
		htm +='</div>'<!--col-md-8-->

		htm +='</div>'<!--row-->

		htm +='</div>'<!--container-->

		$("#frontvisual").empty().append(htm)
	
	},
	
	EditRegister: function(b){

		if (b){
			var FF = new Array();
			FF.push({
				id: "",
				caption: "<?=$lang_resource['PLEASE_SELECT']?>"
			});
			Forms.Form.user.type = "modify"
			Forms.Form.user.city = b.city;
		
			for (i in Main.Franchises){
				FF.push({
					id: Main.Franchises[i].id,
					caption: Main.Franchises[i].city
				})
			}
		}else{
			b = new Object();
			Forms.Form.user.type = "create";
			Forms.CreateValue("user", "config", "{}", false, false, true)

			var FF = new Array();
			FF.push({
				id: "",
				caption: "<?=$lang_resource['PLEASE_SELECT']?>"
			});
		}

		/* Choose country */
		var d = new Array();
		d.push({
			id: "",
			caption: "<?=$lang_resource['PLEASE_SELECT']?>"
		});
		for (i in Main.Countries){
			d.push({
				id: Main.Countries[i].id,
				caption: Main.Countries[i].name
			})
		}
		var FF1 = new Array();
		FF1.push({
			id: "",
			caption: "<?=$lang_resource['PLEASE_SELECT']?>"
		});
		/* Choose country */

		var html = ''
		html +='<div class=" inner_banner_black">'
		html +='<div class="container">'
		html +='<div class="restaurant_info">'
		html +='<h3><?= $lang_resource['MY_ACCOUNT_SETTINGS']?></h3>'
		html +='</div>'<!--restaurant_info-->
		html +='</div>'<!--container-->
		html +='</div>'<!--inner_banner_black-->
    
    	html +='<div class="container">'
    	html +='<div class="row">'
        html +='<div class="col-md-6 col-md-offset-3">'            
		html +='<div class="border_box">'

		if (Forms.Form.user.type == "create"){
			if(Main.CreateAccount[13].status == "t"){
				html +='<div class="row">'
				html +='<div class="col-md-3">'
				html +='<div class="form-group create_btn_dv">'
				html +='<button type="button" class="red_btn_small" onclick="GoogleMap.locateme()"><?= $lang_resource['LOCATE_ME'] ?></button>'
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-3-->
				html +='</div>'<!--row-->
			}

		}
		if (Forms.Form.user.type == "create"){
			html +='<h3 class="heading_3"><?= $lang_resource['LOGIN_CREATE_TITLE'] ?></h3>'			
		}else{
			Forms.CreateValue("user", "level", b.level, false, false)
			html +='<h3 class="heading_3"><?= $lang_resource['LOGIN_EDIT_TITLE'] ?></h3>'			
		}

		html +='<div class="narrow_wrapper">'
		
		html += Visuals.RegisterField(b,d,FF,FF1)

		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="form-group create_btn_dv">'
		if (Forms.Form.user.type == "modify"){
			html +='<button type="button" class=" red_btn_small" onclick="Main.PreUserForm()" id="pop_submit_btn"><?= $lang_resource['REGISTER_FORM_UPDATE_BUTTON'] ?></button>'
		}else{
			html +='<button type="button" class=" red_btn_small" onclick="Main.PreUserForm()" id="pop_submit_btn"><?= $lang_resource['REGISTER_FORM_CREATE_BUTTON'] ?></button>'
		}
		
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->


		if (Forms.Form.user.type == "create"){
			Forms.Clean("loginform");
			Forms.Form.loginform.type = "create";
			html +='<hr>'
			html +='<p class="or_text text-center"><?= $lang_resource['ELSE_V2'] ?></p>'
			html +='<h3 class="heading_3"><?= $lang_resource['HAVE_AN_ACCOUNT'] ?></h3>'
			html +='<div class="row">'
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['LOGIN_INPUT_EMAIL'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("loginform", "logemail","", true)
			html +='<a href="javascript:Visuals.RecoverForm(true)" class="forgot_password"><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></a>'
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['Password_V2'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("loginform", "logpassword", "", false, "Main.LoginPwdTypeEnter(event)", "", true)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->
			html +='</div>'<!--row-->

			html +='<div class="row">'
			html +='<div class="col-md-12">'
			html +='<div class="form-group create_btn_dv">'
			html +='<button type="button" class=" red_btn_small" onclick="Main.LoginSection()"><?= $lang_resource['LOGIN_BUTTON_LOGIN'] ?></button>'
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-12-->
			html +='</div>'<!--row-->
		}	
		html +='</div>'<!--narrow_wrapper-->

		html +='</div>'<!--border_box-->
		html +='</div>'<!--col-md-8-->

		html +='</div>'<!--row-->
		



		html +='</div>'<!--container-->

		$("#frontvisual").empty().append(html)
		Main.PreUserForm()

	},
	RegisterField: function(b,d,FF,FF1){
		var html =''
		html +='<div class="row">'
		
		var c = "";
		if (b.id){
			c = "panel/images/users/" + Main.NullToEmpty(b.id) + "/small.jpg?c=" + new Date().getTime()
		}else{
			c = "panel/images/users/front-dummy.jpg"
		}
		if(Main.CreateAccount[14].status == "t"){
			html +='<div class="col-md-4">'
			html +='<div class="user_pic">'
			html += '<form id="uform_bimg" name="uform_bimg" enctype="multipart/form-data" method="post" >'
			if( $.browser.safari ){
			html += '<input id="uploadImage" type="file" class="user_pic_upload"  name="uploadImage" onChange="Visuals.PreviewImage();" >'
			}else{
			html += '<input id="uploadImage" type="file" class="user_pic_upload"  name="uploadImage" onChange="Visuals.PreviewImage();" >'	
			}
			html += '<input id="showImage" name="showImage" type="hidden" value=""  />'
			html += '<input type="submit" name="submit" onclick="Visuals.triggerImageupload()" style="display:none" />'
			html += '</form>'
			Main.oldimg = c;
			html +='<img id="uploadPreview" class="user_img" src="' + c + '"  >'		
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-4-->			
		}
		if(Main.CreateAccount[15].status == "t"){
			html +='<div class="col-md-8">'
			html +='<div class="register_map" id="mapboxuser" class="">'
			html +='</div>'<!--register_map-->
			html +='</div>'<!--col-md-10-->
			html +='</div>'		
		}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		console.log(Main.CreateAccount);
		//html +='<div class="row">'
		if(Main.CreateAccount[0].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_NAME'] ?> *</label>'
			html +=Forms.CreateInputPropertyPopUp("user", "name", Main.NullToEmpty(b.name), false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_NAME'] ?> *</label>'
			html +=Forms.CreateInputPropertyPopUp("user", "name", Main.NullToEmpty(b.name), false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->			
		}
		if(Main.CreateAccount[1].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_MIDDLE_NAME'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "lastname", Main.NullToEmpty(b.lastname), false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_MIDDLE_NAME'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "lastname", Main.NullToEmpty(b.lastname), false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->			
		}
		if(Main.CreateAccount[2].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_LAST_NAME'] ?> *</label>'
			html +=Forms.CreateInputPropertyPopUp("user", "lastname2", Main.NullToEmpty(b.lastname2), false) 
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_LAST_NAME'] ?> *</label>'
			html +=Forms.CreateInputPropertyPopUp("user", "lastname2", Main.NullToEmpty(b.lastname2), false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->			
		}
		//if(Main.CreateAccount[3].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_EMAIL'] ?> *</label>'
			html +=Forms.CreateInputPropertyPopUp("user", "email", Main.NullToEmpty(b.email), false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		//}
		html +='<div class="col-md-6">'
		html +='<div class="form-group">'		
		if (Forms.Form.user.type == "modify"){
			html +='<label><?= $lang_resource['FRONT_VISUALS_PASSWORD'] ?></label>'
			html += Forms.CreateInputPropertyPopUp("user", "pwd", Main.NullToEmpty(b.pwd), false, "", "", true)
		} else {
			html +='<label><?= $lang_resource['FRONT_VISUALS_PASSWORD_M'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "pwd", Main.NullToEmpty(b.pwd), true,"", "", true)
		}
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-6-->
		
		if(Main.CreateAccount[5].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_STREET'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "street", b.street, false, "GoogleMap.UpdateUserPosition(this)")
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_STREET'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "street", b.street, false, "GoogleMap.UpdateUserPosition(this)")
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->			
		}
		if(Main.CreateAccount[6].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['Neighbourhood_V2'] ?></label>'
			if(Main.neighsettings == 't'){
				html +=Forms.CreateSelectPropertyNPopup("user", "colony", FF1, Main.NullToEmpty(b.colony), false, "GoogleMap.UpdateUserPosition(this)",true,"address2")
			}else{
				html += Forms.CreateInputPropertyPopUp("user", "colony", b.colony, false, "GoogleMap.UpdateUserPosition(this)")
			}		
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['Neighbourhood_V2'] ?></label>'
			if(Main.neighsettings == 't'){
				html +=Forms.CreateSelectPropertyNPopup("user", "colony", FF1, Main.NullToEmpty(b.colony), false, "GoogleMap.UpdateUserPosition(this)",true,"address2")
			}else{
				html += Forms.CreateInputPropertyPopUp("user", "colony", b.colony, false, "GoogleMap.UpdateUserPosition(this)")
			}		
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->
		}
		if(Main.fetchenterprise == 0){
			if(Main.CreateAccount[7].status == "t"){
				html +='<div class="col-md-6">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['FRONT_VISUALS_POST_CODE'] ?></label>'
				html +=Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false, "GoogleMap.UpdateUserPosition(this)")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->	
			}else{
				html +='<div class="col-md-6" style="display:none">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['FRONT_VISUALS_POST_CODE'] ?></label>'
				html +=Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false, "GoogleMap.UpdateUserPosition(this)")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->	
			}
			if(Main.CreateAccount[8].status == "t"){
				html +='<div class="col-md-6">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY']?> *</label>'
				html +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->		
			}else{
				html +='<div class="col-md-6" style="display:none">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY']?> *</label>'
				html +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "hide")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->				
			}
			if(Main.CreateAccount[9].status == "t"){
				html +='<div class="col-md-6">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['CITY_V2'] ?> *</label>'
				if(Main.neighsettings == 't'){
					html += Forms.CreateSelectPropertyCPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect2(null,null,1);",true,"cityregister")
				}else{
					html += Forms.CreateSelectPropertyCPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "GoogleMap.UpdateUserPosition(this);",true,"cityregister")
				}
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->		
			}else{
				html +='<div class="col-md-6" style="display:none">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['CITY_V2'] ?> *</label>'
				html += Forms.CreateSelectPropertyCPopup("user", "cityregister", FF, Main.NullToEmpty(b.city), true, "hide",true,"cityregister")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->				
			}
		}else{	
			if(Main.CreateAccount[8].status == "t"){
				html +='<div class="col-md-6">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY']?> *</label>'
				html +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "Main.CountrySelectRegister(this); GoogleMap.UpdateUserPosition(this)")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->		
			}else{
				html +='<div class="col-md-6" style="display:none">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY']?> *</label>'
				html +=Forms.CreateSelectPropertyPopup("user", "countryregister", d, Main.NullToEmpty(b.country), true, "hide")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->				
			}
			if(Main.CreateAccount[7].status == "t"){
				html +='<div class="col-md-6">'
				html +='<div class="form-group">'
				html +='<label><?= $lang_resource['FRONT_VISUALS_POST_CODE'] ?></label>'
				html +=Forms.CreateInputPropertyFetchByZip("user", "cp", b.cp, false, "GoogleMap.UpdateUserPositionzipcode(this)")
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->		
			}
			if(Main.CreateAccount[9].status == "t"){
				html +='<div class="col-md-6">'
				html +='<div class="form-group">'
				html +='<label><?=$lang_resource['FRONT_VISUALS_CITY_WITH_ZIPCODE']?></label>'
				if(Main.neighsettings == 't'){
					html += Forms.CreateInputPropertyPopUpreadonly("user", "cityregister", Main.NullToEmpty(b.cityname),false)
				}else{
					html += Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false)	
				}
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->		
			}else{
				html +='<div class="col-md-6"> style="display:none"'
				html +='<div class="form-group">'
				html +='<label><?=$lang_resource['FRONT_VISUALS_CITY_WITH_ZIPCODE']?></label>'
				if(Main.neighsettings == 't'){
					html += Forms.CreateInputPropertyPopUpreadonly("user", "cityregister", Main.NullToEmpty(b.cityname),false)
				}else{
					html += Forms.CreateInputPropertyPopUpreadonly("user", "cityregister",Main.NullToEmpty(b.cityname),false)	
				}
				html +='</div>'<!--form-group-->
				html +='</div>'<!--col-md-6-->					
			}
		}		
		
		if(Main.CreateAccount[10].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_LAND_PHONE'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "tel", b.tel, false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_LAND_PHONE'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "tel", b.tel, false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->			
		}
		if(Main.CreateAccount[11].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_MOBILE_PHONE'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "cel", b.cel, false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_MOBILE_PHONE'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "cel", b.cel, false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->				
		}
		if(Main.CreateAccount[12].status == "t"){
			html +='<div class="col-md-6">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_MOBILE_APT'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "api", b.api, false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->	
		}else{
			html +='<div class="col-md-6" style="display:none">'
			html +='<div class="form-group">'
			html +='<label><?= $lang_resource['FRONT_VISUALS_MOBILE_APT'] ?></label>'
			html +=Forms.CreateInputPropertyPopUp("user", "api", b.api, false)
			html +='</div>'<!--form-group-->
			html +='</div>'<!--col-md-6-->				
		}
		return html
	},
	Successpage: function(){
		var html = ''
		html +='<div class=" inner_banner_black">'
		html +='<div class="container">'
		html +='<div class="restaurant_info">'
		html +='<h3>SUCCESS PAGE</h3>'

		html +='</div>'<!--restaurant_info-->
		html +='</div>'<!--container-->
		html +='</div>'<!--inner_banner_black-->


		html +='<div class="container">'
		html +='<div class="row">'
		html +='<div class="col-md-6 col-md-offset-3">'            
		html +='<div class="border_box">'



		html +='<h3 class="heading_3 hand" onclick="Main.AdminUrl()">GO TO ADMIN PANEL</h3>'

		html +='</div>'<!--border_box-->
		html +='</div>'<!--col-md-8-->

		html +='</div>'<!--row-->



		html +='</div>'<!--container-->
		$("#frontvisual").empty().append(html)
	},
	


smsActivation: function(celno){
	//alert("ok");
		$(".popdiv_pop").hide();
		Forms.Clean("sms", "popupmainbuttonok");
   
		
		var a = '<div class="popup_wrapper">';
	   a += '<div class="pop_header">';
      	a +='<div class="pop_heading">';
	    	a +='<h3><?= $lang_resource['ACTIVATE_ACCOUNT'] ?></h3>';
        a +='</div>';<!--pop_heading-->
        a +='<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	a +='<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
        a +='</div>';<!--pull_right-->
    a +='</div>';<!--pop_header-->
    
    a +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl" >';
	  a +='<tr >';
       
       a +='<td colspan="3">We have sent you an activation sms to '+celno+'. Please just click on the link provided in sms if you have internet connectivity in your mobile or alternatively copy the code manually in below field</td>';
        
      a +='</tr>';
      a +='<tr>';
        a +='<td align="right" width="10%"><span class="pop_label" style="width: 100px;"><?= $lang_resource['ACTIVATE_CODE'] ?></span></td>';
       a +='<td width="48%">' + Forms.CreateInputPropertyPopUp("sms", "smscode", "", true) + "</td>";
        a +='<td><button type="button" class="pop_submit_btn" style="width:160px;" onclick="Main.smsActive()"><?= $lang_resource['FRONT_MY_SUBMIT'] ?></button></td>';
      a +='</tr>';
    a +='</table>';

a +='</div>';
		
		
       // Main.Ga("/profile/recoverpwd");
        Popup.ShowFP(640, 400, a, function ()
        {
           
        }, function ()
        {
            Forms.Clean("sms");
            Main.Ga(Main.ActiveView)
        })
	},
	ChooseDeliverOption: function (x,y,options,comments,optionsid,total_price,quantitysec){
		Main.Ready();
		Main.currentItem = y;
		Main.type = "modify";
		Main.currentX = x;
		Main.Itemoptions = options;
		Main.Itemcomments = comments;
		Main.Itemoptionsid = optionsid;
		Main.Itemtotal_price = total_price;
		Main.Itemquantitysec = quantitysec;

		var a=''
		a +='<div class="modal-header">'
		a +='<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="Popup.Close()"><span aria-hidden="true">&times;</span></button>'
		a +='<h4 class="modal-title">&nbsp;</h4>'
		a +='</div>'
		a +='<div class="modal-body">'
		a +='<div class="form-group">'
		a +='<label>Please choose delivery option</label>'
		a +='<select class="form-control blackselect" onChange="Visuals.ChoosDeliveryType(this)" id="deliverytypechoose">'
		a +='<option value="-1">Please Select</option>'
		
		if(Shopping.deliverystatus.pickup == true || Shopping.deliverystatus.pickup == 'true'){
			if(Main.settingfront.tab_pickup != 'f'){
        		a +='<option value="pickup"><?=$lang_resource['PICKUP']?></option>'
			}
		}
		if(Shopping.deliverystatus.delivery == true || Shopping.deliverystatus.delivery == 'true'){
			 if(Main.settingfront.tab_delivery != 'f'){
        		a +='<option value="delivery"><?=$lang_resource['DELIVERY']?></option>'
			 }
		}

		
		
		a +='</select>'
		a +='</div>'<!--form-group-->

		a +='<div id="deliverydv" >'
		a +='</div>'

		a +='</div>'<!--modal-body-->
		a +='<div class="pop-message-dv" style="display:none;" id="choose_delivery_warning">"Sorry, but we do not deliver to your location"</div>'<!--pop-message-dv-->
		a +='<div class="modal-footer">'
		a +='<button type="button" class="popup_btn" onclick="Main.VerifyLocation()"><?=$lang_resource['VERIFY_MY_LOCATION']?></button>'
		a +='</div>'


		Popup.Show(a);		
	},
	ChooseDeliverOptionMenu: function (){

		Main.Loading();
		var b = new Date().getTime();
		Main.Aid = b;
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (c){
			if (b != Main.Aid){
				return
			}
			Main.Ready();
			if (c != ""){
				c = JSON.parse(c);
            	Main.Countries = c.countries;
            	if (!Main.WhereAmIData && Main.User){
            		Main.WhereAmIData = new Object();
                    Main.WhereAmIData.location = Main.NullToEmpty(Main.User.location);
                    Main.WhereAmIData.country = Main.NullToEmpty(Main.User.country);
                    Main.WhereAmIData.city = Main.NullToEmpty(Main.User.city);

                    var add = Main.NullToEmpty(Main.User.street);
					if (add == ""){
						add = Main.NullToEmpty(Main.User.colony)
					}else{
						if (Main.NullToEmpty(Main.User.colony) == ""){
							add += Main.NullToEmpty(Main.User.colony)
						}else{
							add += ", " + Main.NullToEmpty(Main.User.colony)
						}
					}
					Main.WhereAmIData.address = add
            	}
				if(Main.WhereAmIData.addresspopulate && Main.WhereAmIData.addresspopulate !=""){
					Main.WhereAmIData.address = Main.WhereAmIData.addresspopulate
				}
            	Visuals.ChoosDeliveryTypeHtmlMenu(Main.WhereAmIData)
			}
		});	
	},
	ChoosDeliveryTypeHtmlMenu: function(c){
		
		Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
        var b = false;
        if (c){
            Forms.Form.whereami.type = "modify";
	        b = true
        }else{
            c = new Object();
            Forms.Form.whereami.type = "create"
        }

		var d = new Array();
		var FF = new Array();
		d.push({
			id: "",
			caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
		});
		FF.push({
			id: "",
			caption: "<?= $lang_resource['CITY_V2'] ?>"
		});
		var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries){
			if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray("-1", countrytag )!= -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
		var co_f ='';
		var ci_f ='';
		var add_f ='';
		var add_f1 ='';
		var counter =0;

		var cc ='';
		var cic ='';

		var re_f='';

		if(counter == 0){
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){
				b = JSON.parse(b);
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
			});
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){
				b = JSON.parse(b);
				var a = new Object();
				a.id = "city";
				a.value = b.cityname;
				GoogleMap.UpdateUserPosition(a);
			});
			if(Main.User){
				var a = new Object();
				a.id = "address";
				a.value = Main.User.street;
				GoogleMap.UpdateUserPosition(a);
			}
		}

		if(Main.settingfront.tab_delivery_country == 't'){
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray("-1", countrytag )  == -1){
				cc = countrytag[0];
				Main.PopulateCitySelect(cc);
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){
					b = JSON.parse(b);
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
				});
				co_f +='style="display:none;"'
				counter ++;
			}
			<!--Single Country-->

			<!--Single City-->

			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)			
			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){
				cic = citytag[0];
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' +cic+"}]", function (b){
					b = JSON.parse(b);
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
				});
				ci_f +='style="display:none;"'
				counter ++;
			}
			if(Main.User){
				var a = new Object();
				a.id = "address";
				a.value = Main.User.street;
				GoogleMap.UpdateUserPosition(a);
			}
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)

			if(restaurant.length == 1 && $.inArray("-1", restaurant )  == -1){
				re_f +='display:none;'
			}
			<!--Single Resturant-->
		}

		if(Main.settingfront.tab_delivery_country == 'f'){
			cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			cic = Main.settingfront.default_city;
			ci_f +='style="display:none;"'
			counter ++;
		}

		if(Main.settingfront.tab_delivery_address == 'f'){ 
			add_f +='style="display:none;"'
		}
		if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
			add_f1 +='style="display:none;"'
		}

		if((Main.settingfront.tab_delivery_address == 'f') && (Main.settingfront.tab_delivery_neighborhood == 'f')){ 
			counter ++;
		}

		var a =''
		a +='<style>'
		a +='.pac-container {' 
               a +='z-index: 10000 !important;'
               a +=' display: block !important;'
            a +='}'
			a +='</style>'
		a +='<div class="modal-header">'
		a +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		a +='<h4 class="modal-title">&nbsp;</h4>'
		a +='</div>'
		a +='<div class="modal-body">'

		if(counter != 0){
			a +='<div class="form-group" '+co_f+'>'	
			a +='<label>Country</label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true)		
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+ci_f+'>'
			a +='<label><?=$lang_resource['CITY']?></label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "city", FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true)
			a +='</div>'<!--form-group-->

			var cit1 = new Array();
			cit1.push({
				id: "",
				caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
			});

			a +='<div class="form-group" '+add_f1+'>'	
			a +='<label><?=$lang_resource['ADDRESS_OR_ZIP_CODE']?></label>'
			a +=Forms.CreateSelectProperty2Popup("whereami", "address", cit1,c.address, false, "GoogleMap.UpdateUserPosition(this);", true,"address1")
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+add_f+'>'
			a +='<label>Address or Zip Code</label>'
			a +=Forms.CreateinputTextAddressPopup("whereami", "address_del", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			a +='</div>'<!--form-group-->
		}else{
			a +='<div class="form-group" '+co_f+'>'	
			a +='<label>Country</label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "country", d,Main.NullToEmpty(Main.WhereAmIData.country), true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true)		
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+ci_f+'>'
			a +='<label><?=$lang_resource['CITY']?></label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "city", FF,Main.NullToEmpty(Main.WhereAmIData.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true)
			a +='</div>'<!--form-group-->

			var cit1 = new Array();
			cit1.push({
				id: "",
				caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
			});

			a +='<div class="form-group" '+add_f1+'>'	
			a +='<label><?=$lang_resource['ADDRESS_OR_ZIP_CODE']?></label>'
			a +=Forms.CreateSelectProperty2Popup("whereami", "address", cit1,c.address, false, "GoogleMap.UpdateUserPosition(this);", true,"address1")
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+add_f+'>'
			a +='<label>Address or Zip Code</label>'
			a +=Forms.CreateinputTextAddressPopup("whereami", "address_del", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			a +='</div>'<!--form-group-->
		}
		a +='<div id="mapbox" class="where_are_you_map_dv" ></div>'
		a +='<div class="current_location"><a href="javascript:Main.GetUserLocationMenu()"><span><img src="panel/<?=$moduleName?>/images/clocation-icon.png"></span><?=$lang_resource['USE_MY_CURRENT_LOCATION']?></a></div>'<!--current_location-->
		
		a +='</div>'<!--modal-body-->
		a +='<div class="pop-message-dv" style="display:none;" id="choose_delivery_warning">"Sorry, but we do not deliver to your location"</div>'<!--pop-message-dv-->
		a +='<div class="modal-footer">'
		a +='<button type="button" class="popup_btn" onclick="Main.VerifyLocationMenu(\'delivery\')"><?=$lang_resource['VERIFY_MY_LOCATION']?></button>'
		a +='</div>'

		Popup.Show(a);
		$( document ).ready(function() {
			AutoPop.Main3();
			});
		//AutoPop.Main();
		Main.PreWhereAmIInner();
		if(Main.WhereAmIData.country){
			Main.PopulateCitySelect(Main.WhereAmIData.country,Main.WhereAmIData.city)
		}
		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.street;
			GoogleMap.UpdateUserPosition(a);
		}
				
	},

	ChoosDeliveryType: function(val){
		if(val.value =='delivery'){
			Main.Loading();
			var b = new Date().getTime();
			Main.Aid = b;
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (c){
				if (b != Main.Aid){
					return
				}
				Main.Ready();
				if (c != ""){
					c = JSON.parse(c);
                	Main.Countries = c.countries;
                	if (!Main.WhereAmIData && Main.User){
                		Main.WhereAmIData = new Object();
	                    Main.WhereAmIData.location = Main.NullToEmpty(Main.User.location);
	                    Main.WhereAmIData.country = Main.NullToEmpty(Main.User.country);
	                    Main.WhereAmIData.city = Main.NullToEmpty(Main.User.city);

	                    var add = Main.NullToEmpty(Main.User.street);
						if (add == ""){
							add = Main.NullToEmpty(Main.User.colony)
						}else{
							if (Main.NullToEmpty(Main.User.colony) == ""){
								add += Main.NullToEmpty(Main.User.colony)
							}else{
								add += ", " + Main.NullToEmpty(Main.User.colony)
							}
						}
						Main.WhereAmIData.address = add
                	}
                	Visuals.ChoosDeliveryTypeHtml(Main.WhereAmIData)
				}
			});
		}else if(val.value =='pickup'){
			var a =''
			$("#deliverydv").empty().append(a);
		}else{
			var a =''
			$("#deliverydv").empty().append(a);
		}
	},
	ChoosDeliveryTypeHtml: function(c){
		Forms.Clean("whereami", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereami";
        Forms.Form.whereami.whereami = c;
        var b = false;
        if (c){
            Forms.Form.whereami.type = "modify";
	        b = true
        }else{
            c = new Object();
            Forms.Form.whereami.type = "create"
        }

		var d = new Array();
		var FF = new Array();
		d.push({
			id: "",
			caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
		});
		FF.push({
			id: "",
			caption: "<?= $lang_resource['CITY_V2'] ?>"
		});
		var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)

		for (i in Main.Countries){
			if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray("-1", countrytag )!= -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
		var co_f ='';
		var ci_f ='';
		var add_f ='';
		var add_f1 ='';
		var counter =0;

		var cc ='';
		var cic ='';

		var re_f='';

		if(counter == 0){
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){
				b = JSON.parse(b);
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
			});
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;

			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){
				b = JSON.parse(b);
				var a = new Object();
				a.id = "city";
				a.value = b.cityname;
				GoogleMap.UpdateUserPosition(a);
			});
			if(Main.User){
				var a = new Object();
				a.id = "address";
				a.value = Main.User.street;
				GoogleMap.UpdateUserPosition(a);
			}
		}

		if(Main.settingfront.tab_delivery_country == 't'){
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray("-1", countrytag )  == -1){
				cc = countrytag[0];
				Main.PopulateCitySelect(cc);
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){
					b = JSON.parse(b);
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
				});
				co_f +='style="display:none;"'
				counter ++;
			}
			<!--Single Country-->

			<!--Single City-->

			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)			
			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){
				cic = citytag[0];
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' +cic+"}]", function (b){
					b = JSON.parse(b);
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
				});
				ci_f +='style="display:none;"'
				counter ++;
			}
			if(Main.User){
				var a = new Object();
				a.id = "address";
				a.value = Main.User.street;
				GoogleMap.UpdateUserPosition(a);
			}
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)

			if(restaurant.length == 1 && $.inArray("-1", restaurant )  == -1){
				re_f +='display:none;'
			}
			<!--Single Resturant-->
		}

		if(Main.settingfront.tab_delivery_country == 'f'){
			cc = Main.settingfront.default_country;
			co_f +='style="display:none;"'
			counter ++;
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			cic = Main.settingfront.default_city;
			ci_f +='style="display:none;"'
			counter ++;
		}

		if(Main.settingfront.tab_delivery_address == 'f'){ 
			add_f +='style="display:none;"'
		}
		if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
			add_f1 +='style="display:none;"'
		}

		if((Main.settingfront.tab_delivery_address == 'f') && (Main.settingfront.tab_delivery_neighborhood == 'f')){ 
			counter ++;
		}

		var a =''
		a +='<style>'
		a +='.pac-container {' 
               a +='z-index: 10000 !important;'
               a +=' display: block !important;'
            a +='}'
			a +='</style>'
		if(counter != 0){
			a +='<div class="form-group" '+co_f+'>'	
			a +='<label>Country</label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "country", d,cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true)		
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+ci_f+'>'
			a +='<label><?=$lang_resource['CITY']?></label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "city", FF,cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true)
			a +='</div>'<!--form-group-->

			var cit1 = new Array();
			cit1.push({
				id: "",
				caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
			});
				
			a +='<div class="form-group" '+add_f1+'>'	
			a +='<label><?=$lang_resource['ADDRESS_OR_ZIP_CODE']?></label>'
			a +=Forms.CreateSelectProperty2Popup("whereami", "address", cit1,c.address, false, "GoogleMap.UpdateUserPosition(this);", true,"address1")
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+add_f+'>'
			if(c.address=="a"){c.address="";}
			a +='<label>Address or Zip Code</label>'
			a +=Forms.CreateTextAreaPropertyNewDeliverypop("whereami", "address_delpop", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			//a +=Forms.CreateInputPropertyforautoProperty("whereami", "address",c.address, true)
			a +='</div>'<!--form-group-->
		}else{
			a +='<div class="form-group" '+co_f+'>'	
			a +='<label>Country</label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "country", d,Main.NullToEmpty(Main.WhereAmIData.country), true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true)		
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+ci_f+'>'
			a +='<label><?=$lang_resource['CITY']?></label>'	
			a +=Forms.CreateSelectProperty2Popup("whereami", "city", FF,Main.NullToEmpty(Main.WhereAmIData.city), true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true)
			a +='</div>'<!--form-group-->

			var cit1 = new Array();
			cit1.push({
				id: "",
				caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
			});

			a +='<div class="form-group" '+add_f1+'>'	
			a +='<label><?=$lang_resource['ADDRESS_OR_ZIP_CODE']?></label>'
			a +=Forms.CreateSelectProperty2Popup("whereami", "address", cit1,c.address, false, "GoogleMap.UpdateUserPosition(this);", true,"address1")
			a +='</div>'<!--form-group-->

			a +='<div class="form-group" '+add_f+'>'
			if(c.address=="a"){c.address="";}
			a +='<label>Address or Zip Code</label>'
			a +=Forms.CreateTextAreaPropertyNewDeliverypop("whereami", "address_delpop", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			//a +=Forms.CreateInputPropertyforautoProperty("whereami", "address",c.address, true)
			//Forms.CreateinputTextAddressPopup("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			a +='</div>'<!--form-group-->
		}
		a +='<div id="mapbox" class="where_are_you_map_dv" ></div>'
		a +='<div class="current_location"><a href="javascript:Main.GetUserLocationMenu()"><span><img src="panel/<?=$moduleName?>/images/clocation-icon.png"></span><?=$lang_resource['USE_MY_CURRENT_LOCATION']?></a></div>'<!--current_location-->
		$("#deliverydv").empty().append(a);	
		//AutoPop.Main1();
		Main.PreWhereAmI();
		/*if(Main.WhereAmIData.country){
			Main.PopulateCitySelect(Main.WhereAmIData.country,Main.WhereAmIData.city)
		}
		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.street;
			GoogleMap.UpdateUserPosition(a);
		}	*/
		$( document ).ready(function() {
			AutoPop.Main2();
			});
		//google.maps.event.addDomListener(initialize1());	
	},
	SaveWhereAmICustom: function (){
		//alert(66)
		if(Main.Gibberish=='t'){
			if(Main.ActiveSearch == 1){
				$("#choose_delivery_warning").empty().append('<?=$lang_resource['LOGIN_AUTOLOCATION_ALERT'];?>')
				$("#choose_delivery_warning").show()				
				return
			}
		}
		if(Main.settingfront.tab_delivery_country == 'f'){
			Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;
		}else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray('-1', countrytag )  == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){
				Forms.Form['whereami'].fields['city'].value = citytag[0];
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;
		}
		if(Main.settingfront.tab_delivery_address == 'f' &&  Main.settingfront.tab_delivery_neighborhood == 'f'){
			Forms.Form['whereami'].fields['address_delpop'].value = Main.settingfront.city_name_default;
			var a = new Object();
			a.id = "address";
			a.value = Main.settingfront.city_name_default;
			if(Main.User){
				a.value = Main.User.cityname;
			}
			GoogleMap.UpdateUserPosition(a);
			console.log(Forms.Form['whereami'].fields['address_delpop'].value)
		}
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.cityname;
			GoogleMap.UpdateUserPosition(a);
		}
		if(document.getElementById("city"))
			Forms.Form.whereami.fields.city.value = document.getElementById("city").value;	 
		
		Forms.Form.whereami.fields.address.value = Forms.Form.whereami.fields.address.value.toLowerCase() 
		
		if(Forms.Form.whereami.fields.country.value == "") {
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_COUNTRY'];?>')	
			$("#choose_delivery_warning").show()			
			return
		}else if(Forms.Form.whereami.fields.city.value == "") {
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_CITY'];?>')	
			$("#choose_delivery_warning").show()
			return 
		}else if((Forms.Form.whereami.fields.address_delpop.value == "" ) && (Main.settingfront.tab_delivery_neighborhood == 'f')) {
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_ADDRESS'];?>')
			$("#choose_delivery_warning").show()
			return 
		}else if((document.getElementById("address").value == "") && (Main.settingfront.tab_delivery_neighborhood == 't')){
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_NEIBORHOOD'];?>')		
			$("#choose_delivery_warning").show()	
			return 
		}  

		Main.WhereAmIDataCus = new Object();
		Main.WhereAmIDataCus.country = Forms.Form.whereami.fields.country.value;
		Main.WhereAmIDataCus.city = Forms.Form.whereami.fields.city.value;
		var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Forms.Form.whereami.fields.city.value);


		Main.WhereAmIDataCus.currency = Main.Franchises[a].currency;
		Main.WhereAmIDataCus.ga = Main.Franchises[a].ga;

		Main.WhereAmIDataCus.cityname = Main.Franchises[a].city;
		Main.WhereAmIDataCus.collecttype = "delivery";
		Shopping.Cart.buyer.city = Forms.Form.whereami.fields.city.value;
		Shopping.Cart.buyer.cityname = Main.Franchises[a].city;

		Main.WhereAmIDataCus.address = Forms.Form.whereami.fields.address_delpop.value;
		Shopping.Cart.buyer.address = Forms.Form.whereami.fields.address_delpop.value;
		Main.WhereAmIDataCus.location =Forms.Form.whereami.fields.location.value;


		if(Main.settingfront.tab_delivery_neighborhood == 't') {
			Main.WhereAmIDataCus.delivery_neighborhoodStaus =  1; 
			Main.WhereAmIDataCus.delivery_neighborhood =  $("select[id='address'").find('option:selected').text();
			Main.WhereAmIDataCus.delivery_neighborhoodid =  $("select[id='address'").find('option:selected').val();
		}else{
			Main.WhereAmIDataCus.delivery_neighborhoodStaus =  0; 		
		}

		var op ='';
		var cm ='';
		var ops ='';
		var totl ='';
		
		var op = Main.Itemoptions
		var cm = Main.Itemcomments
		var ops = Main.Itemoptionsid
		var totl = Main.Itemtotal_price

		if(Forms.Form.whereami.total_price)
			var totl =Forms.Form.whereami.total_price;

		Main.WhereAmIDataCus.approved = true;
		Main.Loading(true);
		$.post("panel/lib/front-main.php", "f=FetchAllBusinessDeliveryLocation&data=" + Main.WhereAmIDataCus.location+"&alldata=" + JSON.stringify(Main.WhereAmIDataCus)+"&bid="+Shopping.ActiveBusiness, function (b){
			b = JSON.parse(b);
			Main.d_time = b[0].deliverytime


			Main.Ready(true);
			if(b[0].searchtype == "delivery" || b[0].searchtype == "neighbour"){
				var deldis = "delivery";
				if(Shopping.Cart.preorder){
					var dd = Shopping.Cart.Preordserdateback;
					dd = dd.replace("-","")
					dd = dd.replace("-","")

					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
						var melist = JSON.parse(a);
						var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);
						if(M!=-1){
							delete Shopping.Menu;
							Main.deliveryAccept = 1;
							Main.WhereAmIData.collecttype = "delivery";
							Main.deliveryType = "delivery";
							Main.WhereAmIData.reservestatus = "delivery"
							var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
							Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);							
							if(b[0].minimum != ""){
								Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
							}
							if(b[0].deliverycitysearch == true){					
								Shopping.Business[w].deliverycitysearch = true;
								Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
							}else{
								Shopping.Business[w].deliverycitysearch = false;
							}
							Shopping.Menu = melist.menu;
							RestMenuList.PrintBusinessAndDishes("");
							if(Main.WhereAmIDataCus.address)
								Main.WhereAmIData.address = Main.WhereAmIDataCus.address

							Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)
						}else{
							$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'];?>')
							$("#choose_delivery_warning").show()
							return false;
						}
					});
				}else{
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
						var melist = JSON.parse(a);
						var M = Main.GetIndexOnPropertyValueFound(melist.menu.dishes, "id",ProductOption.dis_id);
						if(M!=-1){
							delete Shopping.Menu;
							Main.deliveryAccept = 1;
							Main.WhereAmIData.collecttype = "delivery";
							Main.deliveryType = "delivery";
							Main.WhereAmIData.reservestatus = "delivery"
							var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
							Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);							
							if(b[0].minimum != ""){
								Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
							}
							if(b[0].deliverycitysearch == true){					
								Shopping.Business[w].deliverycitysearch = true;
								Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
							}else{
								Shopping.Business[w].deliverycitysearch = false;
							}
							Shopping.Menu = melist.menu;
							RestMenuList.PrintBusinessAndDishes("");
							if(Main.WhereAmIDataCus.address)
								Main.WhereAmIData.address = Main.WhereAmIDataCus.address

							Shopping.AddToCart('',Main.currentItem,op,cm,ops,totl)
						}else{
							$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'];?>')
							$("#choose_delivery_warning").show()
							return false;
						}
					});
				}
				Popup.Close()
			}else {
				$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'];?>')
				$("#choose_delivery_warning").show()
			}			
		});
		Forms.Clean("whereami");
		//GoogleMap.Clean();
		
		Main.RedirectToBusiness = null
	},
	SaveWhereAmICustomMenu: function (){
		if(Main.Gibberish=='t'){
			if(Main.ActiveSearch == 1){
				$("#choose_delivery_warning").empty().append('<?=$lang_resource['LOGIN_AUTOLOCATION_ALERT'];?>')
				$("#choose_delivery_warning").show()				
				return
			}
		}
		if(Main.settingfront.tab_delivery_country == 'f'){
			Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;
		}else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			if(countrytag.length == 1 && $.inArray('-1', countrytag )  == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 && $.inArray("-1", citytag ) == -1 ){
				Forms.Form['whereami'].fields['city'].value = citytag[0];
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}

		if(Main.settingfront.tab_delivery_city == 'f'){
			Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;
		}
		if(Main.settingfront.tab_delivery_address == 'f' && /*deliveryAccept == 1 &&*/ Main.settingfront.tab_delivery_neighborhood == 'f'){
			Forms.Form['whereami'].fields['address'].value = Main.settingfront.city_name_default;
			var a = new Object();
			a.id = "address";
			a.value = Main.settingfront.city_name_default;
			if(Main.User){
				a.value = Main.User.cityname;
			}
			GoogleMap.UpdateUserPosition(a);
			console.log(Forms.Form['whereami'].fields['address'].value)
		}
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.cityname;
			GoogleMap.UpdateUserPosition(a);
		}
		if(document.getElementById("city"))
			Forms.Form.whereami.fields.city.value = document.getElementById("city").value;	 
		
		Forms.Form.whereami.fields.address.value = Forms.Form.whereami.fields.address.value.toLowerCase() 
		
		if(Forms.Form.whereami.fields.country.value == "") {
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_COUNTRY'];?>')	
			$("#choose_delivery_warning").show()			
			return
		}else if(Forms.Form.whereami.fields.city.value == "") {
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_CITY'];?>')	
			$("#choose_delivery_warning").show()
			return 
		}else if((Forms.Form.whereami.fields.address.value == "" ) && (Main.settingfront.tab_delivery_neighborhood == 'f')) {
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_ADDRESS'];?>')
			$("#choose_delivery_warning").show()
			return 
		}else if((document.getElementById("address").value == "") && (Main.settingfront.tab_delivery_neighborhood == 't')){
			$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_SELECT_NEIBORHOOD'];?>')		
			$("#choose_delivery_warning").show()	
			return 
		}  

		Main.WhereAmIDataCus = new Object();
		Main.WhereAmIDataCus.country = Forms.Form.whereami.fields.country.value;
		Main.WhereAmIDataCus.city = Forms.Form.whereami.fields.city.value;
		var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Forms.Form.whereami.fields.city.value);


		Main.WhereAmIDataCus.currency = Main.Franchises[a].currency;
		Main.WhereAmIDataCus.ga = Main.Franchises[a].ga;

		Main.WhereAmIDataCus.cityname = Main.Franchises[a].city;
		Main.WhereAmIDataCus.collecttype = "delivery";
		Shopping.Cart.buyer.city = Forms.Form.whereami.fields.city.value;
		Shopping.Cart.buyer.cityname = Main.Franchises[a].city;

		Main.WhereAmIDataCus.address = Forms.Form.whereami.fields.address.value;
		Shopping.Cart.buyer.address = Forms.Form.whereami.fields.address.value;
		Main.WhereAmIDataCus.location =Forms.Form.whereami.fields.location.value;


		if(Main.settingfront.tab_delivery_neighborhood == 't') {
			Main.WhereAmIDataCus.delivery_neighborhoodStaus =  1; 
			Main.WhereAmIDataCus.delivery_neighborhood =  $("select[id='address'").find('option:selected').text();
			Main.WhereAmIDataCus.delivery_neighborhoodid =  $("select[id='address'").find('option:selected').val();
		}else{
			Main.WhereAmIDataCus.delivery_neighborhoodStaus =  0; 		
		}

		var op ='';
		var cm ='';
		var ops ='';
		var totl ='';
		
		var op = Main.Itemoptions
		var cm = Main.Itemcomments
		var ops = Main.Itemoptionsid
		var totl = Main.Itemtotal_price

		if(Forms.Form.whereami.total_price)
			var totl =Forms.Form.whereami.total_price;

		Main.WhereAmIDataCus.approved = true;
		Main.Loading(true);
		$.post("panel/lib/front-main.php", "f=FetchAllBusinessDeliveryLocation&data=" + Main.WhereAmIDataCus.location+"&alldata=" + JSON.stringify(Main.WhereAmIDataCus)+"&bid="+Shopping.ActiveBusiness, function (b){
			b = JSON.parse(b);
			Main.d_time = b[0].deliverytime


			Main.Ready(true);
			if(b[0].searchtype == "delivery" || b[0].searchtype == "neighbour"){
				var deldis = "delivery";
				if(Shopping.Cart.preorder){
					var dd = Shopping.Cart.Preordserdateback;
					dd = dd.replace("-","")
					dd = dd.replace("-","")

					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessPreOrderMenu","businessid":'+Shopping.ActiveBusiness+',"date":' + dd + ',"hour":' + Shopping.Cart.preordertimehh + ',"minute":' + Shopping.Cart.preordertimemm + ',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
						var melist = JSON.parse(a);
						Main.MenuVerified(melist)	
						delete Shopping.Menu;
						Main.deliveryAccept = 1;
						Main.WhereAmIData.collecttype = "delivery";
						Main.deliveryType = "delivery";
						Main.WhereAmIData.reservestatus = "delivery"
						var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
						Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);
						if(Shopping.Cart.business[0]){
							Shopping.Cart.business[0].shipping = Shopping.Business[w].shipping ; 							
						}
						if(b[0].minimum != ""){
							Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
						}
						if(b[0].deliverycitysearch == true){					
							Shopping.Business[w].deliverycitysearch = true;
							Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
						}else{
							Shopping.Business[w].deliverycitysearch = false;
						}
						Shopping.Menu = melist.menu;							
						RestMenuList.PrintBusinessAndDishes("");
						//Shopping.OpenBusiness(Shopping.ActiveBusiness)
						if(Main.WhereAmIDataCus.address)
							Main.WhereAmIData.address = Main.WhereAmIDataCus.address
						Popup.Close()					
					});
				}else{
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchBusinessMenu","businessid":'+Shopping.ActiveBusiness+',"deliverytype":' + JSON.stringify(deldis) + "}]", function (a){
						
						var melist = JSON.parse(a);
						Main.MenuVerified(melist)	
						delete Shopping.Menu;
						Main.deliveryAccept = 1;
						Main.WhereAmIData.collecttype = "delivery";
						Main.deliveryType = "delivery";
						Main.WhereAmIData.reservestatus = "delivery"
						var w = Main.GetIndexOnPropertyValueFound(Shopping.Business, "id", Shopping.ActiveBusiness);
						Shopping.Business[w].shipping = parseFloat(b[0].shipping).toFixed(Main.IS_DECIMAL_POINT);
						if(Shopping.Cart.business[0]){
							Shopping.Cart.business[0].shipping = Shopping.Business[w].shipping ; 							
						}
						if(b[0].minimum != ""){
							Shopping.Business[w].minimum = parseFloat(b[0].minimum).toFixed(Main.IS_DECIMAL_POINT);
						}
						if(b[0].deliverycitysearch == true){					
							Shopping.Business[w].deliverycitysearch = true;
							Shopping.Business[w].maxforfreedelivery = b[0].maxforfreedelivery;
						}else{
							Shopping.Business[w].deliverycitysearch = false;
						}
						Shopping.Menu = melist.menu;							
						//RestMenuList.PrintBusinessAndDishes("");
						Shopping.OpenBusiness(Shopping.ActiveBusiness)
						if(Main.WhereAmIDataCus.address)
							Main.WhereAmIData.address = Main.WhereAmIDataCus.address
						Popup.Close()						
					});
				}				
			}else {
				$("#choose_delivery_warning").empty().append('<?=$lang_resource['FRONT_CHOOSE_OPTIONS_DELIVERY_ALERT'];?>')
				$("#choose_delivery_warning").show()
			}			
		});
		Forms.Clean("whereami");
		GoogleMap.Clean();
		Main.RedirectToBusiness = null
	},
	RecoverForm: function(){
		Popup.LoginClose();
		Forms.Clean("recover", "popupmainbuttonok");
		var html = ''
		html +='<div class="modal-header">'
		html +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		html +='<h4 class="modal-title"><?= $lang_resource['RECOVER_PASS_TITLE'] ?></h4>'
		html +='</div>'
		html +='<div class="modal-body">'


		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['RECOVER_PASS_EMAIL'] ?></label>'
		html +=Forms.CreateInputPropertyPopUp("recover", "email", "", true)
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->



		html +='</div>'<!--modal-body-->      
		html +='<div class="modal-footer">'
		html +='<button type="button" class="popup_btn" onclick="Main.RecocerPassSend()"><?= $lang_resource['FRONT_MY_SUBMIT_RECOVER'] ?></button>'

		html +='</div>'

		Main.Ga("/profile/recoverpwd");
		Popup.Show(html)
	},
	

SearchCity: function(){
	var b = false;
	if(Main.customwhereami){
		var c= Main.customwhereami
		if(c.country)
			Main.PopulateCitySelect(c.country,c.city)	
	}else{
		c=new Array();	
	}

	var a = '';
	var d = new Array();
	d.push({
		id: "",
		caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
	});

	var countrytag = Main.settingfront.countrytag.split(",");
	countrytag = JSON.parse(countrytag)

	for (i in Main.Countries){
		if($.inArray( Main.Countries[i].id, countrytag ) != -1 || $.inArray( '-1', countrytag ) != -1){
			d.push({
				id: Main.Countries[i].id,
				caption: Main.Countries[i].name
			})
		}
	}

	var cit = new Array();
	cit.push({
		id: "",
		caption: "<?= $lang_resource['CITY_V2'] ?>"
	});


	if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
		c.country = Main.settingfront.default_country;
		cc = Main.settingfront.default_country;
		cic = Main.settingfront.default_city;
		Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);		 
	}else{		
		cc = c.country
		cic = c.city;
		Main.PopulateCitySelect(c.country,c.city);
	}
	$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){  
		b = JSON.parse(b); 
		var a = new Object();
		a.id = "country";
		a.value = b.countryname;
		GoogleMap.UpdateUserPosition(a);
		c.city = Main.settingfront.default_city;
		cic = Main.settingfront.default_city;
		if(b !=""){
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				b = JSON.parse(b);  
				var a = new Object();
				a.id = "city";
				a.value = b.cityname;
				GoogleMap.UpdateUserPosition(a);
				if(Main.User){
					var a = new Object();
					a.id = "address";
					a.value = Main.User.street;
					GoogleMap.UpdateUserPosition(a);
				}
			});
		}			
	});


	if(Main.settingfront.tab_delivery_country == 't'){			
		<!--Single Country-->
		var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		if(countrytag.length == 1 && $.inArray( '-1', countrytag ) == -1){
			cc = countrytag[0];
			Main.PopulateCitySelect(cc);
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
			});
			co_f +='style="display:none;"'
			counter ++;	
		} 
		<!--Single Country-->

		<!--Single City-->

		var citytag = Main.settingfront.citytag.split(",");
		citytag = JSON.parse(citytag)
		console.log(citytag)
	
		if(citytag.length == 1 && $.inArray( '-1', citytag ) == -1 ){ 
			cic = citytag[0];
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){ 
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "city";
				a.value = b.cityname;
				GoogleMap.UpdateUserPosition(a);
			});
			ci_f +='style="display:none;"'
			counter ++;	
		} 
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.street;
			GoogleMap.UpdateUserPosition(a);
		}
		<!--Single City-->
	}

	var ci_s ='width:818px !important;';

	MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
	var htms  = '<div class="SearchDelivery">';
	htms += '<input type="radio" id="deliveryType" style="display:none;" value="'+Main.deliveryAccept+'" checked="checked" name="deliveryType" >'
	

	htms += '<div class="field-dv" style="display:none;">';
	htms +=Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
	htms += '</div>';
	htms += '<div class="field-dv">';
	htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand", ci_s);
	htms += '</div>';
	Forms.CreateValue("whereami", "address", '', false, false);
	Forms.CreateValue("whereami", "resturants", '', false, false);
	Forms.CreateValue("whereami", "cuisines", '', false, false);
	
	if(Main.deliveryAccept == 3){
		htms += '<button type="button" class="search-btn" style="margin-left: 10px;" id="mainbuttonok" onclick="Visuals.SearchLocation2nd()"><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button>'
	}else{
		htms += '<button type="button" class="search-btn" style="margin-left: 10px;" onclick="Main.SaveWhereAmICity()"><?= $lang_resource['FRONT_VISUALS_LETS_GO'] ?></button>';
	}
	
	
	htms += '</div>';

	return htms;

	if(Main.settingfront.tab_delivery_country == 'f'){
		Main.PopulateCitySelect(Main.settingfront.default_country);
		var a = new Object();
		a.id = "country";
		a.value = Main.settingfront.default_country_name;
		GoogleMap.UpdateUserPosition(a);
	}

	if(Main.settingfront.tab_delivery_city == 'f'){
		var a = new Object();
		a.id = "city";
		a.value = Main.settingfront.default_city_name;
		GoogleMap.UpdateUserPosition(a);
	}
	if(Main.User){
		var a = new Object();
		a.id = "address";
		a.value = Main.User.street;
		GoogleMap.UpdateUserPosition(a);
	}

},
SearchDelivery: function(){
			
		var b = false;
			 
       if(Main.customwhereami){
		var c= Main.customwhereami
		if(c.country)
		Main.PopulateCitySelect(c.country,c.city)	
		}
		else{
			c=new Array();	
		}
       
		 var a = '';
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		

		var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		
		for (i in Main.Countries)
		{
			
			//alert(Main.Countries[i].id)			
		
				if($.inArray( Main.Countries[i].id, countrytag ) != -1 || $.inArray( '-1', countrytag ) != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
		 
		

	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		
		
		
		
		var counter = 0;
		var cc ='';
		var cic ='';
		
		var re_f='';
		//alert(JSON.stringify(Main.settingfront))
		
		if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			cic = Main.settingfront.default_city;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);		 
		}else{		
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		}
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){  
			b = JSON.parse(b); 
			var a = new Object();
			a.id = "country";
			a.value = b.countryname;
			GoogleMap.UpdateUserPosition(a);
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;
			if(b !=""){
				
				$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
					b = JSON.parse(b);  
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
					if(Main.User){
						var a = new Object();
						a.id = "address";
						a.value = Main.User.street;
						GoogleMap.UpdateUserPosition(a);
					}
				});
			}			
		});
		
		
		
		if(Main.settingfront.tab_delivery_country == 't'){			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			
			if(countrytag.length == 1 && $.inArray( '-1', countrytag ) == -1){
				
				
				
				cc = countrytag[0];
				
				Main.PopulateCitySelect(cc);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				   
					b = JSON.parse(b); 
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				co_f +='style="display:none;"'
				counter ++;	
			} 
			<!--Single Country-->
			
			<!--Single City-->
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			console.log(citytag)
			//console.log(citytag.indexOf('-1'))
			
			if(citytag.length == 1 && $.inArray( '-1', citytag ) == -1 ){ 
				
				cic = citytag[0];
			
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			if(Main.User){
					
					var a = new Object();
					a.id = "address";
					a.value = Main.User.street;
					GoogleMap.UpdateUserPosition(a);
				}
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && $.inArray( '-1', restaurant ) == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
			
		}
		
		var counter = 0;
		var co_f='t';
		var ci_f='t';
		var add_f='t';
		var add_f1='t';
		var of_f='t';
		if(Main.settingfront.citysearch == 't'){
			Main.settingfront.tab_delivery_country = 'f'
			Main.settingfront.tab_delivery_city = 't'
			Main.settingfront.tab_delivery_address = 'f'
			Main.settingfront.tab_delivery_neighborhood = 'f'
			Main.settingfront.tab_delivery_option = 'f'	
		}


		if(Main.settingfront.tab_delivery_country == 'f'){
			co_f ='f'
			counter ++;
			
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){			
			cic = Main.settingfront.default_city; 		
			ci_f ='f'
			counter ++;
			
		}		
		
		if(Main.settingfront.tab_delivery_address == 'f'){ 
			add_f ='f'	
		
		}
		if(Main.settingfront.tab_delivery_neighborhood == 'f'){ 
			add_f1 ='f'	
		
		}
		if((Main.settingfront.tab_delivery_address == 'f') && (Main.settingfront.tab_delivery_neighborhood == 'f')){ 
			counter ++;
	
		}
		
		if(Main.settingfront.tab_delivery_option == 'f'){
			of_f ='f'
			counter ++;
		
		}
		
		var co_s ='';
		var ci_s ='';
		var add_s ='';
		var of_s ='';
		
		var cocitycolsize = 2
		var buttoncolsize = 2
		var optaddcolsize = 3
		
		if(counter == 1){
			cocitycolsize = 3;
			optaddcolsize = 3;
			buttoncolsize = 3;		
		}
		if(counter == 2){
			cocitycolsize = 4;
			optaddcolsize = 4;
			buttoncolsize = 4;			
		}
		if(counter == 3){
			cocitycolsize = 9;
			optaddcolsize = 9;
			buttoncolsize = 3;
		}
		

			
		MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		var htms =''
		htms += '<input type="radio" id="deliveryType" style="display:none;" value="1" checked="checked" name="deliveryType" >'
		if(co_f == 't'){
			htms += '<div class="col-md-'+cocitycolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+cocitycolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}

		if(ci_f == 't'){
			htms += '<div class="col-md-'+cocitycolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+cocitycolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}
		
		if(add_f == 't'){
			htms += '<div class="col-md-'+optaddcolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateTextAreaPropertyNew33122("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+optaddcolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateTextAreaPropertyNew33122("whereami", "address", c.address, false, "GoogleMap.UpdateUserPosition(this)", true)
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}

		var cit1 = new Array();
		cit1.push({
            id: "",
            caption: "<?= $lang_resource['LOGIN_CREATE_SUBURB1'] ?>"
        });
        if(add_f1 == 't'){
			htms += '<div class="col-md-'+optaddcolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew34("whereami", "address", cit1,c.address, true, "GoogleMap.UpdateUserPosition(this);Main.neibhourUpdate(this)", true)
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+optaddcolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew34("whereami", "address", cit1,c.address, true, "GoogleMap.UpdateUserPosition(this);Main.neibhourUpdate(this)", true)
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}

		if(of_f == 'f'){
			var opd = 'style="display:none;"'
		}
		htms += '<div class="col-md-'+optaddcolsize+'" '+opd+'>'
		htms += '<div class="field_dv">'
		htms += '<div class="geo_bnt_field">' 
		htms += '<button type="button" class="form-control" onclick="WhereAmIBox.ShowHideOptionSearch()"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'

		htms += '</div>'<!-- geo_bnt_field -->
		htms += '</div>'<!-- field_dv -->

		htms += '<div class="filter-dv" style="display:none;">'
		htms += '<span class="arr"></span>'
		Forms.CreateValue("whereami", "resturants", '', false, false);
		htms += '<div class="multiinputbox filter_fil_dv" style="'+re_f+'"><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
		Forms.CreateValue("whereami", "cuisines", '', false, false);
		htms += '<div class="filter_fil_dv"><input type="text" id="cuisines" placeholder="cuisines" /></div>'
		htms += '<div class="filter_fil_dv"><button type="button" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		htms += '</div>'

		htms += '</div>'<!-- col-md-5 -->

		
					
	
		htms += '<div class="col-md-'+buttoncolsize+'">'
		htms += '<div class="field_dv">'
		htms += '<button type="button" class="letsgo_btn" onclick="Main.SaveWhereAmI()"><?= $lang_resource['FRONT_VISUALS_LETS_GO'] ?></button>'
		htms += '</div>'<!-- field_dv -->
		htms += '</div>'<!-- col-md-3 -->

		return htms;
		  
		if(Main.settingfront.tab_delivery_country == 'f'){
			Main.PopulateCitySelect(Main.settingfront.default_country);
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
			GoogleMap.UpdateUserPosition(a);
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			GoogleMap.UpdateUserPosition(a);
		}
		if(Main.User){
			var a = new Object();
			a.id = "address";
			a.value = Main.User.street;
			GoogleMap.UpdateUserPosition(a);
		}	
	},
	SearchPickup: function(){
			
		if(Main.customwhereami){
			var c= Main.customwhereami
			if(c.country)
				Main.PopulateCitySelect(c.country,c.city)	
		}
		else{
			c=new Array();	
		}

        var d = new Array();
        d.push({
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
		d.sort(Main.SortByProperty("caption"));
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		for (i in Main.Countries){
			//if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
			if($.inArray( Main.Countries[i].id, countrytag ) != -1 || $.inArray('-1', countrytag ) != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}

		var cit = new Array();
        cit.push({
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		 
		 
		var l="";
		var ls="";
		if(c.collecttype == "delivery"){
			l ="selected";
		}
		if(c.collecttype == "pickup"){
			ls ="selected";
		}
		   
		
		var counter = 0;
		
		
		var cc ='';
		var cic ='';
		
			
		var re_f='';
		
		if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
				
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
				
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;
			
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
              });
			 
		}else{
			
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		}
			
		if(Main.settingfront.tab_delivery_country == 't'){
			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1){
				
				
				
				cc = countrytag[0];
				 
				Main.PopulateCitySelect(cc);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				   
					b = JSON.parse(b); 
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				co_f +='style="display:none;"'
				counter ++;	
			} 
			<!--Single Country-->
			
			<!--Single City-->
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			console.log(citytag)
			//console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && $.inArray('-1', citytag ) == -1 ){ 
				
				cic = citytag[0];
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && $.inArray('-1', restaurant ) == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
			
		}
		
		
		var co_f='t';
		var ci_f='t';
		var add_f='t';
		var add_f1='t';
		var of_f='t';

		if(Main.settingfront.citysearch == 't'){
			Main.settingfront.tab_delivery_country = 'f'
			Main.settingfront.tab_delivery_city = 't'
			Main.settingfront.tab_pickup_option = 'f'	
		}



		if(Main.settingfront.tab_delivery_country == 'f'){
			cc = Main.settingfront.default_country;
			co_f ='f'
			counter ++;
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){			
			cic = Main.settingfront.default_city; 			
			ci_f ='f'
			counter ++;
		}		
		
		if(Main.settingfront.tab_pickup_option == 'f'){
			of_f ='f'
			counter ++;
		}
		var co_s ='';
		var ci_s ='';		
		var of_s ='';
		

		var cocitycolsize = 3
		var buttoncolsize = 3
		var optaddcolsize = 3
		if(counter == 1){
			cocitycolsize = 4;
			optaddcolsize = 4;
			buttoncolsize = 4;		
		}
		if(counter == 2){
			cocitycolsize = 9;
			optaddcolsize = 9;
			buttoncolsize = 3;			
		}
		


		MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		var htms =''
		htms += '<input type="radio" id="deliveryType" style="display:none;" value="2" checked="checked" name="deliveryType" >'
		if(co_f == 't'){
			htms += '<div class="col-md-'+cocitycolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+cocitycolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}

		if(ci_f == 't'){
			htms += '<div class="col-md-'+cocitycolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+cocitycolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}
		
		if(of_f != 't'){
			var opd = 'style="display:none;"'
		}
		htms += '<div class="col-md-'+optaddcolsize+'" '+opd+'>'
		htms += '<div class="field_dv">'
		htms += '<div class="geo_bnt_field">' 
		htms += '<button type="button" class="form-control" onclick="WhereAmIBox.ShowHideOptionSearch()"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'

		htms += '</div>'<!-- geo_bnt_field -->
		htms += '</div>'<!-- field_dv -->

		htms += '<div class="filter-dv" style="display:none;">'
		htms += '<span class="arr"></span>'
		Forms.CreateValue("whereami", "resturants", '', false, false);
		htms += '<div class="multiinputbox filter_fil_dv" style="'+re_f+'"><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
		Forms.CreateValue("whereami", "cuisines", '', false, false);
		htms += '<div class="filter_fil_dv"><input type="text" id="cuisines" placeholder="cuisines" /></div>'
		htms += '<div class="filter_fil_dv">'+Forms.CreateTextAreaPropertyNew3("whereami", "address", c.address, false,"GoogleMap.UpdateUserPosition(this)", false)+'</div>'
		htms += '<div class="filter_fil_dv"><button type="button" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		htms += '</div>'

		htms += '</div>'<!-- col-md-5 -->

	
		htms += '<div class="col-md-'+buttoncolsize+'">'
		htms += '<div class="field_dv">'
		htms += '<button type="button" class="letsgo_btn" onclick="Main.SaveWhereAmI()"><?= $lang_resource['FRONT_VISUALS_LETS_GO'] ?></button>'
		htms += '</div>'<!-- field_dv -->
		htms += '</div>'<!-- col-md-3 -->
		  
		  return htms; 
		  
		  if(Main.settingfront.tab_delivery_country == 'f'){
		
			Main.PopulateCitySelect(Main.settingfront.default_country);
			
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
				
			GoogleMap.UpdateUserPosition(a);
			
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
			
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			
			GoogleMap.UpdateUserPosition(a);
		}
		
	},
	SearchReservation: function(){
			
		if(Main.customwhereami){
		var c= Main.customwhereami
		if(c.country)
		Main.PopulateCitySelect(c.country,c.city)	
		}
		else{
			c=new Array();	
			
		}
        var d = new Array();
        d.push(
        {
            id: "",
            caption: "<?= $lang_resource['COUNTRY_V2'] ?>"
        });
        var countrytag = Main.settingfront.countrytag.split(",");
		countrytag = JSON.parse(countrytag)
		console.log(countrytag.length > 1)
		
		for (i in Main.Countries)
		{ $.inArray(Main.Countries[i].id, countrytag )
			//if(countrytag.indexOf(Main.Countries[i].id) != -1 || countrytag.indexOf('-1') != -1){
			if($.inArray(Main.Countries[i].id, countrytag ) != -1 || $.inArray("-1", countrytag ) != -1){
				d.push({
					id: Main.Countries[i].id,
					caption: Main.Countries[i].name
				})
			}
		}
	var cit = new Array();
        cit.push(
        {
            id: "",
            caption: "<?= $lang_resource['CITY_V2'] ?>"
        });
		 
		 
		 	 var l="";
		  	 var ls="";
		  if(c.collecttype == "delivery")
		  {
			  l ="selected";
		   }
		    if(c.collecttype == "pickup")
		  {
			  ls ="selected";
		   }
		   
		
		var counter = 0;
		 
		var cc ='';
		var cic ='';
		
		var re_f='';	
		
		  if(Main.settingfront.default_country !=-1 && Main.settingfront.default_city !=-1){
			c.country = Main.settingfront.default_country;
			cc = Main.settingfront.default_country;
			Main.PopulateCitySelect(Main.settingfront.default_country,Main.settingfront.default_city);
			
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
			   
				b = JSON.parse(b); 
				var a = new Object();
				a.id = "country";
				a.value = b.countryname;
				GoogleMap.UpdateUserPosition(a);
				   
			});
				
			
			c.city = Main.settingfront.default_city;
			cic = Main.settingfront.default_city;
				
			 $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  
					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
              });
			 
		}else{
			
			cc = c.country
			cic = c.city;
			Main.PopulateCitySelect(c.country,c.city);
		}
		
				
		if(Main.settingfront.tab_delivery_country == 't'){
			
			<!--Single Country-->
			var countrytag = Main.settingfront.countrytag.split(",");
			countrytag = JSON.parse(countrytag)
			
			//console.log(countrytag.length == 1 && countrytag.indexOf('-1') == -1)
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1){
				
				
				
				cc = countrytag[0];
				
				Main.PopulateCitySelect(cc);
				
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCountryName","countryid":' + cc +"}]", function (b){   
				   
					b = JSON.parse(b); 
					var a = new Object();
					a.id = "country";
					a.value = b.countryname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				co_f +='style="display:none;"'
				counter ++;	
			} 
			<!--Single Country-->
			
			<!--Single City-->
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			console.log(citytag)
			//console.log(citytag.indexOf('-1'))
			if(citytag.length == 1 && $.inArray('-1', citytag ) == -1 ){ 
				
				cic = citytag[0];
					
                $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchCityName","cityid":' + cic +"}]", function (b){   
				   
					b = JSON.parse(b);  

					
					var a = new Object();
					a.id = "city";
					a.value = b.cityname;
					GoogleMap.UpdateUserPosition(a);
                       
                });
				
				ci_f +='style="display:none;"'
				counter ++;	
			} 
			
			<!--Single City-->
			<!--Single Resturant-->
			var restaurant = Main.settingfront.restaurant.split(",");
			restaurant = JSON.parse(restaurant)
			
			if(restaurant.length == 1 && $.inArray('-1', restaurant ) == -1){
				re_f +='display:none;'
				
			} 
			<!--Single Resturant-->
			
		}
		
		
		var co_f='t';
		var ci_f='t';
		var add_f='t';
		var add_f1='t';
		var of_f='t';

		if(Main.settingfront.citysearch == 't'){
			Main.settingfront.tab_delivery_country = 'f'
			Main.settingfront.tab_delivery_city = 't'
			Main.settingfront.tab_reservation_option = 'f'	
		}



		if(Main.settingfront.tab_delivery_country == 'f'){
			cc = Main.settingfront.default_country;
			co_f ='f'
			counter ++;
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){			
			cic = Main.settingfront.default_city; 			
			ci_f ='f'
			counter ++;
		}		
		
		if(Main.settingfront.tab_reservation_option == 'f'){
			of_f ='f'
			counter ++;
		}
		var co_s ='';
		var ci_s ='';		
		var of_s ='';
		
		var cocitycolsize = 3
		var buttoncolsize = 3
		var optaddcolsize = 3
		if(counter == 1){
			cocitycolsize = 4;
			optaddcolsize = 4;
			buttoncolsize = 4;		
		}
		if(counter == 2){
			cocitycolsize = 9;
			optaddcolsize = 9;
			buttoncolsize = 3;			
		}


		MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChange");
		var htms =''
		htms += '<input type="radio" id="deliveryType" style="display:none;" value="3" checked="checked" name="deliveryType" >'
		if(co_f == 't'){
			htms += '<div class="col-md-'+cocitycolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+cocitycolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "country", d, cc, true, "Main.CountrySelected(this);GoogleMap.UpdateUserPosition(this)", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}

		if(ci_f == 't'){
			htms += '<div class="col-md-'+cocitycolsize+'">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}else{
			htms += '<div class="col-md-'+cocitycolsize+'" style="display:none">'
			htms += '<div class="field_dv">'
			htms += '<div class="geo_bnt_field">'
			htms += Forms.CreateSelectPropertyNew3("whereami", "city", cit, cic, true, "GoogleMap.UpdateUserPosition(this);Main.PopulateAddressSelect(null,null,1);", true, "hand");
			htms += '</div>'<!-- geo_bnt_field -->
			htms += '</div>'<!-- field_dv -->
			htms += '</div>'<!-- col-md-5 -->
		}
		
		
		
		if(of_f != 't'){
			var opd = 'style="display:none;"'
		}
		htms += '<div class="col-md-'+optaddcolsize+'" '+opd+'>'
		htms += '<div class="field_dv">'
		htms += '<div class="geo_bnt_field">' 
		htms += '<button type="button" class="form-control" onclick="WhereAmIBox.ShowHideOptionSearch()"><?=$lang_resource["SHOPPING_RESERVATION_FILTER_OPTION"]?></button>'

		htms += '</div>'<!-- geo_bnt_field -->
		htms += '</div>'<!-- field_dv -->

		htms += '<div class="filter-dv" style="display:none;">'
		htms += '<span class="arr"></span>'
		Forms.CreateValue("whereami", "resturants", '', false, false);
		htms += '<div class="multiinputbox filter_fil_dv" style="'+re_f+'"><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
		Forms.CreateValue("whereami", "cuisines", '', false, false);
		htms += '<div class="filter_fil_dv"><input type="text" id="cuisines" placeholder="cuisines" /></div>'
		htms += '<div class="filter_fil_dv">'+Forms.CreateTextAreaPropertyNew3("whereami", "address", c.address, false,"GoogleMap.UpdateUserPosition(this)", false)+'</div>'
		htms += '<div class="filter_fil_dv"><button type="button" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		htms += '</div>'

		htms += '</div>'<!-- col-md-5 -->
					
	
		htms += '<div class="col-md-'+buttoncolsize+'">'
		htms += '<div class="field_dv">'
		htms += '<button type="button" class="letsgo_btn" id="mainbuttonok" onclick="Visuals.SearchLocation2nd()"><?= $lang_resource['FRONT_VISUALS_LETS_GO'] ?></button>'
		htms += '</div>'<!-- field_dv -->
		htms += '</div>'<!-- col-md-3 -->
		 
		
	
		   
	
		 
		  
		  return htms;
		  
		  if(Main.settingfront.tab_delivery_country == 'f'){
		
			Main.PopulateCitySelect(Main.settingfront.default_country);
			
			var a = new Object();
			a.id = "country";
			a.value = Main.settingfront.default_country_name;
				
				
			GoogleMap.UpdateUserPosition(a);
			
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
			
			var a = new Object();
			a.id = "city";
			a.value = Main.settingfront.default_city_name;
			
			
			GoogleMap.UpdateUserPosition(a);
		}
		
	},
	SearchLocation2nd: function(){
		
		
		$(".filter-dv").hide();
		console.log(Forms.CanSave("whereami"));
		
		document.getElementById("citychoose").style.display = "none";
		
		var deliveryAccept = $("input[name=deliveryType]:checked").val()
		if(Main.settingfront.tab_delivery_country == 'f'){
			
		Forms.Form['whereami'].fields['country'].value = Main.settingfront.default_country;
			
		}
		else if(Main.settingfront.tab_delivery_country == 't'){
			var countrytag = Main.settingfront.countrytag.split(",");
			if(countrytag.length == 1 && $.inArray('-1', countrytag ) == -1 ){
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}else{
				Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
			}
			
			var citytag = Main.settingfront.citytag.split(",");
			citytag = JSON.parse(citytag)
			if(citytag.length == 1 &&  $.inArray('-1', citytag ) == -1 ){
				Forms.Form['whereami'].fields['city'].value = citytag[0];
				
			}else{
				Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;
			}
		}
		
		if(Main.settingfront.tab_delivery_city == 'f'){
		Forms.Form['whereami'].fields['city'].value = Main.settingfront.default_city;
		}
			
		if(Main.customwhereami){
			 Forms.Form['whereami'].fields['country'].save = true
			 Forms.Form['whereami'].fields['city'].save = true
		}
		/*Forms.Form['whereami'].fields['country'].value = document.getElementById("country").value;
		Forms.Form['whereami'].fields['city'].value = document.getElementById("city").value;*/
		
		
        if (Forms.CanSave("whereami") == false)
        {
			
			alert("<?= $lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] ?>")
            return
        }
		
		if(deliveryAccept== undefined)
		{
			alert("<?=$lang_resource['ALERT_PICKUP_DELIVERY']?> ");
            return
		}
		
        Main.WhereAmIData = new Object();
        Main.WhereAmIData.country = Forms.Form.whereami.fields.country.value;
        Main.WhereAmIData.city = Forms.Form.whereami.fields.city.value;
        var a = Main.GetIndexOnPropertyValueFound(Main.Franchises, "id", Main.WhereAmIData.city);
	console.log(a);
	
        if(IS_PAYPAL_ENABLED == 1)
			Main.WhereAmIData.currency = Main.Franchises[a].currency;
        Main.WhereAmIData.ga = Main.Franchises[a].ga;
        Main.WhereAmIData.cityname = Main.Franchises[a].city;
		
		if(deliveryAccept == "3")
		{
			Main.WhereAmIData.collecttype = "pickup" // for Reservation
			Main.WhereAmIData.reservestatus = "reservation"
			Main.deliveryType="pickup";
			Main.searchType ="Ordinary";
			Main.WhereAmIData.address = Forms.Form.whereami.fields.address.value;
	    	Main.WhereAmIData.resturant =Forms.Form.whereami.fields.resturants.value;
	    	Main.WhereAmIData.cuisines = Forms.Form.whereami.fields.cuisines.value;		
		}
		
        Main.WhereAmIData.location = Forms.Form.whereami.fields.location.value;
		
        Main.WhereAmIData.approved = true;
		
		
		Popup.Close()
        Forms.Clean("whereamiress", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "whereamiress";
		
        var b = false;
            c = new Object();
            Forms.Form.whereamiress.type = "create"
			
	  	var htms ='';
		htms +=Visuals.SearchReservation2nd();

	
		Popup.Show(htms,Visuals.PreDatepickerCall)

	},
	PreDatepickerCall: function(){
		$('#rdate').datepick({dateFormat: 'mm/dd/yyyy',minDate: 0,maxDate: 7, onSelect: function(date, instance) {

			var dd= $('#rdate').val();

			var dd1=dd.substr(3,2)

			var curr_date= Main.curr_date;
			var curr_hour = Main.curr_hour;
			var curr_minute=Main.curr_minute;

			////Hour function start	
			var a = '<select >';
			a+= '<option value="">Hour</option>';
			if(dd1 == curr_date){
				if(curr_minute>45){
					for(var i=curr_hour+1; i<24; i++){	
						if(time_format=="12"){
							capi= Main.convertTimeFormatHour(i);
						}else{
							capi=Main.zeroPad(i,2);
						}	
						a+= '<option value="' + i + '">' +capi + '</option>'
					}
				}else{
					for(var i=curr_hour; i<24; i++){
						if(time_format=="12"){
							capi= Main.convertTimeFormatHour(i);
						}else{
							capi=Main.zeroPad(i,2);
						}
						a+= '<option value="' + i + '">' +capi + '</option>'
					}
				}
				a +='</select>'
				document.getElementById("rhour").innerHTML=a
			}else{
				for(var i=0; i<24; i++){
					if(time_format=="12"){
						capi= Main.convertTimeFormatHour(i);
					}else{
						capi=Main.zeroPad(i,2);
					}					
					a+= '<option value="' + i + '">' + capi + '</option>'
				}
				a +='</select>';
				document.getElementById("rhour").innerHTML=a;
			}
			//Hour function end

			//Minute function start

			/*var b = '<select>';
			b+= '<option value="">Minute</option>';
			if(dd1 == curr_date){
				if(curr_minute<15){
					for (i=15;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b+= '<option value="' + j + '">' + j + '</option>';
					}
				}else if(curr_minute<30){
					for (i=30;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b+= '<option value="' + j + '">' + j + '</option>';
					}
				}else if(curr_minute<45){
					for (i=45;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b+= '<option value="' + j + '">' + j + '</option>';
					}
				}else{
					for (i=0;i<60;i=i+15){
						var j = Main.zeroPad(i,2);
						b+= '<option value="' + j + '">' + j + '</option>';
					}
				}
			}else{
				for (i=0;i<60;i=i+15){
					var j = Main.zeroPad(i,2);
					b+= '<option value="' + j + '">' + j + '</option>';
				}
			}
			b +='</select>';
			document.getElementById("rmin1").innerHTML=b;*/
			//Minute function end
		}});
	},

	BusinessReservation: function (){

        Forms.Clean("businesslist", "popupmainbuttonok");
        GoogleMap.Clean();
        Main.ActiveForm = "businesslist";
        var b = false;
        c = new Object();
        Forms.Form.businesslist.type = "create"
 
        var d = new Array();
        d.push({
            id: "",
            caption: "<?= $lang_resource['RESERVATION_NO_GUEST'] ?>"
        });
		
        for (i=1;i<=8;i++){
            d.push({
                id: i,
                caption: i
            })
        }
        MultipleInput.AddListener("tagschange", "Main.MultiInputTagsChangeBusiness");
  
        g = '[{"id":"","caption":"<?= $lang_resource['FRONT_VISUALS_SELECT_TYPE'] ?>"},{"id":"1","caption":"<?= $lang_resource['SHOPPING_SECOND_SEND_HEADER'] ?>"},{"id":"2","caption":"<?= $lang_resource['PICKUP'] ?>"},{"id":"3","caption":"<?= $lang_resource['RESERVATION_V21'] ?>"}]';
        g = JSON.parse(g);

        var htms =''
		htms +='<div class="modal-header">'
		htms +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		htms +='<h4 class="modal-title"><?=$lang_resource['RESERVATION_V21'] ?></h4>'
		htms +='</div>'
		htms +='<div class="modal-body">'


		htms +='<div class="row">'

		htms +='<div class="col-md-4">'
		htms +='<div class="form-group">'
		htms +='<label>Option Filter</label>'
		htms +='<button class="form-control" onclick="WhereAmIBox.ShowHideOptionSearch()">Optional filter</button>'

		//filter-dv
		htms += '<div class="filter-dv" style="display:none;">'
		htms += '<span class="arr"></span>'
		Forms.CreateValue("businesslist", "resturants", Main.WhereAmIData.resturant, false, false);
		htms += '<div class="multiinputbox filter_fil_dv"><input type="text" id="resturants" placeholder="<?= $lang_resource['FRONT_VISUALS_RESTAURANT'] ?>" /></div>'
		Forms.CreateValue("businesslist", "cuisines", Main.WhereAmIData.cuisines, false, false);
		htms += '<div class="filter_fil_dv"><input type="text" id="cuisines" placeholder="<?= $lang_resource['MULTITAG_LANGUAGE_CUISINES'] ?>" /></div>'
		htms += '<div class="filter_fil_dv"><button type="button" class="apply-btn" onclick="WhereAmIBox.ShowHideOptionSearch()"><?= $lang_resource['FRONT_VISUALS_APPLY'] ?></button></div>'
		htms += '</div>'
		//filter-dv


		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->

		htms += '<div id="fulldv">'
		htms +='<div class="col-md-4">'		
		htms +='<div class="form-group">'
		htms +='<label><?= $lang_resource['FRONT_VISUALS_MMDDYY'] ?></label>'		
		htms +='<input type="text" class="form-control" value="'+Main.NullToEmpty(Main.WhereAmIData.rdate)+'" id="rdate1" readonly="readonly" required="required">'
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->

		htms +='<div class="col-md-4">'
		htms +='<div class="form-group">'
		htms +='<label>Guest</label>'
		htms +=Forms.CreateSelectPropertyNew3("businesslist", "guest1", d, Main.WhereAmIData.guest, false,"", false)
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->	

		htms +='</div>'<!--fulldv-->
		htms +='</div>'<!--row-->



		htms +='</div>'<!--modal-body-->


		htms +='<div class="modal-footer">'
		htms +='<button type="button" class="popup_btn" onclick="Shopping.changeDelTypeNew(4)" ><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button>'

		htms +='</div>'

		Popup.Show(htms,Main.PreDatepickerCall2)
	
	},	
	
	OpenEachOrder: function (a,fromInput)
    {

        Main.Loading(true);
        var b = new Date().getTime();
        Main.Aid = b;
        $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchOrderData","id":' + a + "}]", function (d)
        {


            if (b != Main.Aid)
            {
                return
            }
            Main.Ready(true);
            Main.Ga("/orders/open/" + a);
            if (d != "" && d != '{"order":null}')
            {
                Main.Temp = new Object();
                Main.Temp.Order = JSON.parse(d).order;
                Main.Temp.PseudoCart = JSON.parse(Main.Temp.Order.data);
                //alert(Main.Temp.PseudoCart.Total_Point_Used)
				var c = "";
				c += '<div class="popup_wrapper">'
                c += '<div class="pop_header">';
                c += '<div class="pop_heading"><h3><?= $lang_resource['Order_V2'] ?> ' + Main.Temp.Order.id + " (" + Main.Temp.Order.status + ")</h3></div>";
			if((Main.Temp.Order.gprs_url!=null) && (Main.Temp.Order.statnum==4))
				{
					
				c+= '<div class="btota" ><a style="color:#FFF;font-weight:bold;" href="'+ Main.Temp.Order.gprs_url +'" target="_blank"><?=$lang_resource['FRONT_TRACK_DRIVER_GPS'];?></a></div>';
				}
			if( Main.Temp.Order.bpermission == "t") {
        c += '<div class="reorder_track"><button type="button" class="reorder" onclick="Main.Reorderalert(' + Main.Temp.Order.id + ')"><?= $lang_resource['TRACK_REORDER'] ?></button></div>'
					}
		
		c += '<div class="pull_right" style="margin:8px 8px 0px 0px">';
        c += '<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
        c += '</div>';
    c += '</div>';
	if(Main.Temp.PseudoCart.business[0].dishes != ""){
	c += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tracknow_pop">';

      c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_NAME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.name) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.email) + '" READONLY/></td>';
     c += '</tr>';

	 c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_STREET'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.address) + '" READONLY/"></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.tel) + '" READONLY/></td>';
      c += '</tr>';

      c += '<tr>';
        c += '<td align="left"><span class="pop_label" ><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_COMMENTS'] ?></span></td>';
     c += '</tr>';
     c += '<tr>';
        c += '<td><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.Order.comment) + "</textarea></td>";
        c += '<td><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.Order.driver_comment) + "</textarea></td>";
     c += '</tr>';
	 
      c += '<tr>';
        c += '<td align="left"><span class="pop_label" ><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_USER_HEADER'] ?></span></td>';
        c += '<td align="left"></td>';
     c += '</tr>';
	 c += '<tr>';
        c += '<td><textarea class="field_area_pop" READONLY>' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + "</textarea></td>";
        c += '<td></td>';
     c += '</tr>';

    c += '</table>';


	c += '<div id="cartresultsinner_track">';
                c += "</div>";

	}
	
	if(Main.Temp.PseudoCart.reservestatus){
		
		c += '<table width="95%" border="0" cellspacing="0" cellpadding="0" class="pop_tbl track_tbl" style=" margin:0px 0px 0px 5px">'
		
		c += '<tr>';
		c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_NAME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_EMAIL'] ?></span></td>';
		c += '</tr>';
		
		c += '<tr>';
		c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.name) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.email) + '" READONLY/></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['LOGIN_CREATE_PHONE'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?> :</span></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.tel) + '" READONLY/></td>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rdate) + '" READONLY/"></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td align="left"><span class="pop_label"><?= $lang_resource['FRONT_DRIVER_TIME'] ?></span></td>';
        c += '<td align="left"><span class="pop_label"></span></td>';
		c += '</tr>';
		
		c += '<tr>';
        c += '<td><input type="text" class="field_text_pop" placeholder="" value="'  + Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rhour) + ':'+ Main.NullToEmpty(Main.Temp.PseudoCart.reserve.rmin1) + '" READONLY/"></td>';
        c += '<td></td>';
		c += '</tr>';
		
		c += '</table>';
	
	

				
				
				c += '<table cellpadding="7"  class="pop_tbl track_tbl1" border="1" style="margin: 0 auto;border-spacing:0;border-collapse:collapse;border-style:solid;" width="95%"><tbody>';
        c += '<tr><th align="center"><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?></th><th align="center"><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?></th><th align="center"><?= $lang_resource['FRONT_RESERVATION_FREE'] ?></th><th align="center"><?= $lang_resource['PRODUCT_POTIONS_QUANTITY'] ?></th><th align="center"><?= $lang_resource['Price_V2'] ?></th></tr>';
		  			c += '<tr><td align="center">'
		  			c +=Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Table);
                   
				
					c +='</td>'
					c += '<td align="center">'
					
				    
					 c +=Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Room) 
					c +='</td>'
					c +='<td align="center">'
					
					c += Main.NullToEmpty(Main.Temp.PseudoCart.reserveQty.Free);
					
					c +='</td>'
                    c +='<td align="center">'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					if(Main.Temp.PseudoCart.reserveQty.Table.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_TABLE'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Table.length+'</span><span>  X  </span><span>'+(Main.NullToEmpty(Main.Temp.Order.tableprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.tableprice)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					if(Main.Temp.PseudoCart.reserveQty.Room.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_ROOM'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Room.length+'</span><span>  X  </span><span>'+(Main.NullToEmpty(Main.Temp.Order.roomprice)=="")? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.roomprice+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					if(Main.Temp.PseudoCart.reserveQty.Free.length != 0)
					c += '<span><?= $lang_resource['FRONT_RESERVATION_FREE'] ?>  </span><span>'+Main.Temp.PseudoCart.reserveQty.Free.length+'</span><span>  X  </span><span>'+Main.NullToEmpty(Main.Temp.Order.freeprice)==""? "<?= $lang_resource['SHOPPING_SECOND_FREE'] ?>" : Main.Temp.Order.freeprice+'</span><br>'					
					}
					c += '</td>'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					var tableprice = Main.Temp.PseudoCart.reserveQty.Table.length * Main.Temp.Order.tableprice ;
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					var roomprice = Main.Temp.PseudoCart.reserveQty.Room.length * Main.Temp.Order.roomprice ;
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					var freeprice = Main.Temp.PseudoCart.reserveQty.Free.length * Main.Temp.Order.freeprice ;
					}
					c += '<td align="center">'
					if(Main.Temp.PseudoCart.reserveQty.Table){
					if(tableprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+tableprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Room){
					if(roomprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+roomprice.toFixed(Main.IS_DECIMAL_POINT)+'</span><br>'
					}
					if(Main.Temp.PseudoCart.reserveQty.Free){
					if(freeprice != 0)
					c += '<span><?= $lang_resource['Panel_Currency'] ?>  '+freeprice.toFixed(2)+'</span><br>'
					}
					
					c +='</td>'
                    c += "</tr>";
					
                c += '<tr><td colspan="4" align="right">&nbsp;<?= $lang_resource['EXPORT_TOTAL'] ?>&nbsp;</td><td align="center" style="font-weight:bold;font-size:16"><?= $lang_resource['Panel_Currency'] ?>  '+parseFloat(Main.Temp.PseudoCart.reserveFee).toFixed(Main.IS_DECIMAL_POINT)+'</td></tr>'
					
                c += "</tbody></table>"
        c += "</td></tr>"	
		
	
		
		
		c +="</tbody></table>"
				


               
				}
	
		   c += '<div class="pop_footer">';
		   c += '<div class="pull_left" style=" margin:12px 0px 0px 12px"><button type="button" class="close_btn"  onclick="Visuals.MyOrders(false)"><?= $lang_resource['BACK_V21'] ?></button><button type="button" class="close_btn"  onclick="Popup.Close()"><?= $lang_resource['CLOSE_V21'] ?></button></div>';
		   c += '<div class="pull_left pull_custom_text" style="margin-left:0px;"><?= $lang_resource['Your_Total_V2'] ?> :</div>';
		   if(Main.Temp.PseudoCart.totalfinla !=null)
		   {
		   		c += '<div class="pull_left pull_custom" style="margin-left:0px;">' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.totalfinla).toFixed(Main.IS_DECIMAL_POINT)) + "</div>";
		   }
		   else
		   {
		   	c += '<div class="pull_left pull_custom" style="margin-left:0px;">' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(Main.IS_DECIMAL_POINT)) + "</div>";
		   }
		   c += '</div>';
           c += "</div>";


           Main.ordpopdt = c;
		   Main.ShowOrderPop();
		
            }
            else
            {
		$(".odrstus").html("");
		$(".showOrd").hide();
                alert("<?= $lang_resource['FRONT_No_TIENES_PERMISO'] ?>")
            }
        })
    },
	
	  PopulatePseudoCart: function ()
    {


        var b = "";
        var f = "";
        for (i in Main.Temp.PseudoCart.business)
        {
		      b += '<h3 class="text_center restaurant-name" style=" font-size:22px;">' + Main.Temp.PseudoCart.business[i].name.toUpperCase() + "</h3>";
			  b += '<p class="text_center drv_comment"><?= $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] ?><span>';
			  if(Main.Temp.PseudoCart.business[i].paymethod.cash == true) {
			  b += '<?=$lang_resource['FRONT_CASH']?>';
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.card == true) {
			  b += '<?=$lang_resource['FRONT_CARD']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.braintree == true) {
			  b += '<?=$lang_resource['FRONT_BRAINTREE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorize == true) {
			   b += '<?=$lang_resource['FRONT_AUTHORIZE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.cardsave == true) {
			  b += '<?=$lang_resource['FRONT_CARDSAVE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypal == true) {
			   b += '<?=$lang_resource['FRONT_PAYPAL']?>';  
			  }  else if(Main.Temp.PseudoCart.business[i].paymethod.marco == true) {
			   b += '<?=$lang_resource['FRONT_MACRO']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.paypaladaptive == true) {
			  b += '<?=$lang_resource['FRONT_PAYPALADAPTIVE']?>';  
			  } else if(Main.Temp.PseudoCart.business[i].paymethod.authorizednet == true) {
			   b += '<?=$lang_resource['FRONT_AUTHORIZEDOTNET']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.transactium == true) {
			   b += '<?=$lang_resource['FRONT_TRANSACTIUM']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.skrill == true) {
			   b += '<?=$lang_resource['PAYMENT_SKRILL_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.payeezy == true) {
			   b += '<?=$lang_resource['PAYMENT_PAYEEZY_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.voguepay == true) {
			   b += '<?=$lang_resource['PAYMENT_VOGUEPAY_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.pexpress == true) {
			   b += '<?=$lang_resource['PAYMENT_PEXPRESS_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.maksekeskus == true) {
			   b += '<?=$lang_resource['PAYMENT_MAKSEKSEKUS_PAY']?>';  
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.stripe == true) {
			  	if(Main.Temp.Order.stripe_result == null)
			  	{
			  		b +='<?=$lang_resource['PAYMENT_STRIPE_PAY_NOT']?>';
			  	}
			  	else
			  	{
			  		b +='<?=$lang_resource['PAYMENT_STRIPE_PAY']?>';
			  	}
			  	
			  }else if(Main.Temp.PseudoCart.business[i].paymethod.payu == true) {
			  	if(Main.Temp.Order.payu_result==null)
			  	{
			  		b +='<?=$lang_resource['PAYMENT_PAYUMONEY_PAY_NOT']?>';
			  	}
			  	else
			  	{
			  		b +='<?=$lang_resource['PAYMENT_PAYUMONEY_PAY']?>';
			  	}
			  }
			  
			  
			  b +='</span></p>';
			  if(Main.Temp.PseudoCart.business[i].paymethod.transactium == true) {
			  b += '<p class="text_center drv_comment"><?= $lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_CODE'] ?><span>'+Main.Temp.Order.transactium_tid+'</span></p>';
			  b += '<p class="text_center drv_comment"><?= $lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_STATUS'] ?><span>'+Main.Temp.Order.transactium_status+'</span></p>';
			  }
			  b += '<div class="pop-item-wrapper">';
          
            for (j in Main.Temp.PseudoCart.business[i].dishes)
            {
			 b += '<div class="pop-item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name">' + Main.Temp.PseudoCart.business[i].dishes[j].name.toUpperCase() + "</h3>";
			   if(Main.Temp.PseudoCart.business[i].dishes[j].options) {
			 b += '<div>'+ProductOption.Margeslash(Main.Temp.PseudoCart.business[i].dishes[j].options)+'</div>';
			 }
             b += '<div style="margin-top:7px;"><input type="text" class="field_text_pop" style="" id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_comments" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.business[i].dishes[j].comments) + '" READONLY></div>';
			 b += '<div id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_pseudoingredients"></div>';

             b += '<div id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_pseudoextras"></div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" id="dish_' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_price">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].dishes[j].total) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
             
            }

			if (parseFloat(Main.Temp.PseudoCart.business[i].shipping) > 0)
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_COST'] ?>"
            }
            else
            {
                a = "<?= $lang_resource['SHOPPING_SECOND_SEND_NO_COST'] ?>"
            }
			 b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name">' + a + "</h3>";
             b += '<div style="margin-top:7px;"><input type="text" class="field_text_pop" style="" id="' + j + "_" + Main.Temp.PseudoCart.business[i].dishes[j].id + '_comments" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="' + Main.NullToEmpty(Main.Temp.PseudoCart.buyer.comments) + '" READONLY></div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price"  id="' + Main.Temp.PseudoCart.business[i].id + '_shipping">' + Shopping.FormatPrice(Main.Temp.PseudoCart.business[i].shipping) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';

		/*	discount section*/

			if((Main.Temp.PseudoCart.discounttype > 0) && (Main.NullToEmpty(Main.Temp.PseudoCart.discountprice)!=''))
					{
						
						if(Main.Temp.PseudoCart.discounttype == 1)
						{
						var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?> ('+Main.Temp.PseudoCart.discountrate+'%)';
						}
						else
						{
						var discaption = '<?=$lang_resource['REORDER_CONFIRM_DISCOUNT']?>';
						}
						
		     b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name">' + discaption + "</h3>";
             b += '<div style="margin-top:7px;"><input type="text" class="field_text_pop" style="" id="' + Main.Temp.PseudoCart.business[i].id + '_comments" placeholder="<?= $lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] ?>" value="'  + Main.NullToEmpty(Main.Temp.PseudoCart.discountcomments) + '" READONLY></div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price"  id="' + Main.Temp.PseudoCart.business[i].id + '_shipping">' + parseFloat(Main.Temp.PseudoCart.discountprice).toFixed(Main.IS_DECIMAL_POINT) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
			 

					}
					/*	discount section*/



		/*	Tax section*/
		if(Main.Temp.PseudoCart.buyer.tax){
			if(Main.Temp.PseudoCart.buyer.taxtype == 2){
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED']?>"
			}else{
				var taxstatus="<?=$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED']?>"
			}
			
			 b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['REORDER_CONFIRM_TAX']?> ('+Main.Temp.PseudoCart.buyer.tax+' %)</h3>';
             b += '<div class="tax_text">'+taxstatus+'</div>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(Main.Temp.PseudoCart.tax) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}
		if(Main.Temp.PseudoCart.servicefeeTotal1){
			
			 b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['SERVICE_FEE_V2']?>('+Main.Temp.PseudoCart.servicefee+' %)</h3>';
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(Main.Temp.PseudoCart.servicefeeTotal1) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}
		/*	Tax section*/
			if(parseInt(Main.Temp.PseudoCart.buyer.tips)>0) {
			
			 b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_TIPS']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(Main.Temp.PseudoCart.buyer.tips) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		if(Main.Temp.PseudoCart.Total_Point_Used !=null)
		{
			b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_TOTAL_VALUE']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Shopping.FormatPrice(parseFloat(Main.Temp.PseudoCart.total).toFixed(Main.IS_DECIMAL_POINT)) + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		if(Main.Temp.PseudoCart.Total_Point_Used !=null)
		{
			b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_USED_POINTS']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Main.Temp.PseudoCart.Total_Point_Used + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		if(Main.Temp.PseudoCart.usedpointvalue !=null)
		{
			b += '<div class="item-dv">';
        	 b += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
             b += '<tr>';
             b += '<td><h3 class="pop-item-name"><?=$lang_resource['TRACKORDER_USED_POINTS_VALUE']?> </h3>';
            
             b += '</td>';
             b += '<td> <div class="pull_right pop-item-price" >' + Main.Temp.PseudoCart.usedpointvalue + "</div></td>";
             b += '</tr>';

             b += '</table>';
			 b += '</div>';
		}

		break;



        }
        document.getElementById("cartresultsinner_track").innerHTML = b;
        var e;
        var d;
        var a;
        var c;
        for (j in Main.Temp.PseudoCart.business)
        {
            Dishes = Main.Temp.PseudoCart.business[j].dishes;
            for (i in Dishes)
            {
                e = Dishes[i].ingredients;
                d = Dishes[i].extras;
                Tags.CreateContainer(i + "_" + Dishes[i].id + "_pseudoingredients");
                Tags.CreateContainer(i + "_" + Dishes[i].id + "_pseudoextras");
                for (k in e)
                {
                    a = e[k].caption.toLowerCase();
                    a = a.charAt(0).toUpperCase() + a.slice(1);
                    Tags.CreateTag(i + "_" + Dishes[i].id + "_pseudoingredients",
                    {
                        id: e[k].id,
                        caption: a,
                        cclass: "ingredient",
                        enabled: e[k].enabled,
                        dishindex: i,
                        businessindex: j,
                        ingredientindex: k
                    }, true)
                }
                for (k in d)
                {
                    a = d[k].name.toLowerCase();
                    a = a.charAt(0).toUpperCase() + a.slice(1);
                    Tags.CreateTag(i + "_" + Dishes[i].id + "_pseudoextras",
                    {
                        id: d[k].id,
                        caption: a,
                        cclass: "extra",
                        enabled: d[k].enabled,
                        dish: Dishes[i].id,
                        price: d[k].price,
                        enabled: d[k].enabled,
                        dishindex: i,
                        businessindex: j,
                        extraindex: k
                    }, true)
                }
            }
        }
    },
	SearchReservation2nd: function(){

		var d = new Array();
		d.push({
			id: "",
			caption: "<?= $lang_resource['RESERVATION_NO_GUEST'] ?>"
		});

		for (i=1;i<=8;i++){
			d.push({
				id: i,
				caption: i
			})
		}

		var h = new Array();
		h.push({
			id: "",
			caption: "<?= $lang_resource['RESERVATION_NO_HOUR'] ?>"
		});

		//Time selection settings. 
		time_format="<?=$lang_resource['TIME_FORMAT']?>";

		var date = new Date();
		Main.curr_date = date.getDate();
		Main.curr_hour=date.getHours();
		Main.curr_minute=date.getMinutes();

		for (i=0;i<24;i++){
			if(time_format=="12"){
				capi= Main.convertTimeFormatHour(i);
			}else{
				capi=Main.zeroPad(i,2);
			}

			h.push({
				id: i,
				caption: capi
			})	
		}

		var mi = new Array();
		mi.push({
			id: "",
			caption: "<?= $lang_resource['RESERVATION_NO_MUNITE'] ?>"
		});

		for (i=0;i<60;i=i+15){
			mi.push({
				id: i,
				caption: Main.zeroPad(i,2)
			})
		}


		var htms =''
		htms +='<div class="modal-header">'
		htms +='<button type="button" class="close" data-dismiss="modal" onclick="Popup.Close()" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		htms +='<h4 class="modal-title"><?=$lang_resource['RESERVATION_SEARCH']?></h4>'
		htms +='</div>'
		htms +='<div class="modal-body">'


		htms +='<div class="row">'
		htms +='<div class="col-md-3">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['FRONT_VISUALS_GUEST']?></label>'
		htms +=Forms.CreateSelectPropertyNew3("whereamiress", "guest", d, '', false,"", false);
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->
		htms +='<div class="col-md-3">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['FRONT_VISUALS_DATE']?></label>'
		htms +=Forms.CreateInputProperty11("whereamiress", "rdate", '','', false, "", false);
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->
		htms +='<div class="col-md-3">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['FRONT_VISUALS_HOUR']?></label>'
		htms +=Forms.CreateSelectPropertyNew31("whereamiress", "rhour", h, '', false, "", false);
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->
		htms +='<div class="col-md-3">'
		htms +='<div class="form-group">'
		htms +='<label><?=$lang_resource['FRONT_VISUALS_MINUTE']?></label>'
		htms +=Forms.CreateSelectPropertyNew("whereamiress", "rmin", mi, '', false, "", false);
		htms +='</div>'<!--form-group-->
		htms +='</div>'<!--col-md-3-->
		htms +='</div>'<!--row-->



		htms +='</div>'<!--modal-body-->


		htms +='<div class="modal-footer">'
		htms +='<button type="button" class="popup_btn" onclick="Main.SaveWhereReservationSkip()"><?= $lang_resource['FRONT_VISUALS_SKIP'] ?></button>'
		htms +='<button type="button" class="popup_btn" onclick="Main.SearchLocation2ndSave()"><?= $lang_resource['FRONT_VISUALS_SAVE_CONTINUE'] ?></button>'
		htms +='</div>'

		return htms;
	},
	
	
	
	


	SeeMoreDivAppend: function(){
		//alert(JSON.stringify(Main.SeeMoreAppend))
		$('#loadMore').show();
		htms ='';
		for (var b  in Main.SeeMoreAppend){
		if(Main.SeeMoreAppend[b].bname==null)	
		{
			
		}
		else
		{
		htms +='<ul id="myList" >'
		htms +='<li>'
		htms +='<div class="restlogo">'
		
		if(Main.SeeMoreAppend[b].existspic==true){
			htms +='<img src="../panel/images/business/'+Main.SeeMoreAppend[b].id_w_business+'/small.jpg">'
		}
		else
		{
			htms +='<img src="../panel/images/business/dummy.jpg">'
		}

		
		htms +='</div>'
		htms += '<div class="rvw_rest_dsp">'
		htms +='<h4> <a href="/'+Main.SeeMoreAppend[b].bcustomeslug+'">'+Main.SeeMoreAppend[b].bname+'</a></h4>'
		//htms +='<h4>'+Main.SeeMoreAppend[b].bname+'</h4>'
		htms +='<ul class="review-star">'
		if(Math.round(Main.SeeMoreAppend[b].ratings)==1)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==2)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==3)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==4)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}
		else if(Math.round(Main.SeeMoreAppend[b].ratings)==5)
		{
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-yellow2.png"></a></li>'
		}
		else
		{
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
			htms +='<li><a href="#"><img src="images/star-grey2.png"></a></li>'
		}

		
		htms +='</ul>'
		htms +='<span class="rating">'+Main.SeeMoreAppend[b].ratings+'</span>'
		htms +='<div class="home_comment_dv">'
		if(Main.SeeMoreAppend[b].user=='-1')
		{
			htms +='<span><img src="../panel/images/users/dummy.jpg"></span>'
		}
		else
		{
			htms +='<span><img src="../panel/images/users/'+Main.SeeMoreAppend[b].user+'/small.jpg"></span>'
		}
		htms +='<p>'+Main.SeeMoreAppend[b].comment+'</p>'
	
		htms +='</div>'<!--home_comment_dv-->
		htms +='</div>'<!--rvw_rest_dsp-->
	
		htms +='</li>'
		htms +='</ul>'	
		}
	}
		

		$("#seemore_div").append(htms);

		if(Main.SeeMoreAppend.length<4)
			$("#loadMore").hide();
	},
	
	triggerImageupload: function() {
		
		
		Main.a1 = 1;
		 $("#uform_bimg").submit(function (event) {
			if(Main.a1 == 1){ 
			 event.preventDefault();
		
		 var formData = new FormData($(this)[0]);
 $.ajax({
            url: 'panel/upload-image.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (html) {
				
               if(html == "false"){
				   Main.a1 = 0;
				    alert('<?= $lang_resource['IMAGE_UPLOAD_VALIDATION'] ?>');				   
				   delete formData;
				   
				  return;
			   }else{
				   
				  document.getElementById("showImage").value = html
				  if( $.browser.safari ){				   
					   document.getElementById("uploadPreview").src = "panel/images/temp/"+html				  
					}
			  
			   }
			   
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
		
		
			}
		
 		});
		 
		
		/*
		 $("#uform_bimg").submit(function (event) {
			 
			 event.preventDefault();
		
		var formData = new FormData($(this)[0]);
 $.ajax({
            url: 'panel/upload-image.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (html) {
               //alert(html)
			  document.getElementById("showImage").value = html
			  if( $.browser.safari ){				   
				   document.getElementById("uploadPreview").src = "panel/images/temp/"+html				  
				}
			   
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
 		});
		 */},

    PreviewImage: function() {
		 document.getElementById("uploadPreview").src ="";
		  
		$('form#uform_bimg').find('input[type="submit"]').trigger('click');
           var oFReader = new FileReader();
		
           oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
           oFReader.onload = function (oFREvent) {
			   if(Main.a1 == 1)			  
            document.getElementById("uploadPreview").src = oFREvent.target.result;
			else
			document.getElementById("uploadPreview").src = Main.oldimg;
           // document.getElementById("uploadPreview").src = oFREvent.target.result;
		    //document.getElementById("imagefile").value = document.getElementById("uploadImage").files[0].name;
			
        };
		
    },	
	changelabe: function(val){	
		$("#"+val).toggleClass("close")	
	},
};
