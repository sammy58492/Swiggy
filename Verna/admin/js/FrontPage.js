var FrontPage = {
		Main: function () {	
        Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;
		$.post("lib/panel-configs.php", "f=GetFrontSettings", function (c) {
			
   		if (a != Main.Aid) {
                return
            }
        Main.Ready(); 
	          //alert(c);
        FrontPage.PrintMain(JSON.parse(c))
						
		})	
		
		
	},
		PrintMain: function(a){
		
		MultipleInput.AddListener("tagschange", "FrontPage.MultiInputTagsChange");
		var g = false;	
		Forms.Clean("frontset", "mainbuttonok");
		if (e == null) {
            e = new Object();
            Forms.Form.frontset.type = "create";
       
        } else {
            g = true;
            Forms.Form.frontset.type = "modify";
            Forms.Form.frontset.id = e.id
        }
		var d = new Array();
      	d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      	d.push(JSON.parse('{"id":"f","caption":"No"}'));
		var c="";			
		c += '<div class="tab-box">'

        c += '<div class="row">'
        Forms.CreateValue("frontset", "countrytag", a[0].countrytag, true,true);
        c += '<div class="col-md-4">'
        c += '<div class="form-group">'
        c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_COUNTRY']?>:</label>'
        c += '<input type="text" id="countrytag" class="form-control rounded" style="min-height:70px;">'
        c += '</div>'
        <!--form-group-->
        c += '</div>'
        <!--col-md-4-->
        c += '<div class="col-md-4">'
        Forms.CreateValue("frontset", "citytag",a[0].citytag, true,true);
        c += '<div class="form-group">'
        c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_CITY']?>:</label>'
        c += '<input type="text" id="citytag" class="form-control rounded" style="min-height:70px;">'
        c += '</div>'
        <!--form-group-->
        c += '</div>'
        <!--col-md-4-->
        c += '<div class="col-md-4">'
        //alert(JSON.stringify(a[0].restaurant));
        Forms.CreateValue("frontset", "restaurant",  a[0].restaurant, true,'',true);
        c += '<div class="form-group">'
        c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_RESTAURANTS']?>:</label>'
        c += '<input type="text" id="restaurant" class="form-control rounded" style="min-height:70px;">'
        c += '</div>'
        <!--form-group-->
        c += '</div>'
        <!--col-md-4-->
        c += '</div>'
        <!--row-->


	
      c += '<div class="row">'
      <!--col-md-6-->
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_POPULAR_RESTAURANT']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "popular_restaurant", d,a[0].popular_restaurant, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['FRONT_VISUALS_MOST_POPULAR_CUISINE']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "popular_cuisine", d,a[0].popular_cuisine, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->
      c += '</div>'
		  <!--row-->     



      c += '<div class="row">'

      var d = new Array();
      d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      d.push(JSON.parse('{"id":"f","caption":"No"}'));

      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_BROWSER_SLIDER_SETTINGS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "sildersetiings", d,a[0].sildersetiings, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6--> 

      var t = new Array();
      for(var i =1 ; i<=60; ){
        t.push(JSON.parse('{"id":"'+i+'","caption":"'+i+' Sec"}'));
        i= i+1
      }
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_SLIDER_TIME_DURATION']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "slider_duration", t,a[0].slider_duration, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->	        
      
      c += '</div>'
      <!--row-->


      c += '<div class="row">' 

      var ct = new Array();
      ct.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      ct.push(JSON.parse('{"id":"f","caption":"No"}'));

      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_CITYHOMEPAGE_SETTINGS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "cityhomepage", ct,a[0].cityhomepage, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6--> 

      var city = new Array(); 
      for(dd in Main.Franchises) {
        var str=Main.Franchises[dd].city;
        if(str!='NULL'){
          var res=str.split(" ").join("");
          var lower="<?=base64_encode('City')?>_"+Main.Franchises[dd].id+'_'+res.toLowerCase();
          city.push(JSON.parse('{"id":"'+lower+'","caption":"'+str+'"}'));
        } 
      }         
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_SELECTCITYHOMEPAGE_SETTINGS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "homedefaultcity", city,a[0].homedefaultcity, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6--> 


      c += '</div>'
      <!--row-->

	    c += '<div class="row">'

      
      var w = new Array();
      w.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      w.push(JSON.parse('{"id":"f","caption":"No"}'));
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_VISUALS_HOW_IT_WORKS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "how_it_works", w,a[0].how_it_works, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->

      var z = new Array();
      z.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      z.push(JSON.parse('{"id":"f","caption":"No"}'));
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_AMAZING_APPS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "amazing_apps", z,a[0].amazing_apps, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->
      
		  c += '</div>'
      <!--row-->
		  
		  
		  
		  c += '<div class="row">'		
      var f = new Array();
      f.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      f.push(JSON.parse('{"id":"f","caption":"No"}'));
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_VISUALS_FOOD_OF_THE_WEEK']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "foodof_the_week", f,a[0].foodof_the_week, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->       	
		
      var r = new Array();
      r.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      r.push(JSON.parse('{"id":"f","caption":"No"}'));
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_VISUALS_RECENTS_ORDERS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "recent_orders", r,a[0].recent_orders, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->
      c += '</div>'
      <!--row-->



      c += '<div class="row">'
      var bp = new Array();
      bp.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      bp.push(JSON.parse('{"id":"f","caption":"No"}'));
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_BROWSEPERCITY']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "browse_per_city", bp,a[0].browse_per_city, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->
      var l = new Array();
      l.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      l.push(JSON.parse('{"id":"f","caption":"No"}'));
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_LETS_BE_FRIENDS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "lets_be_friends", l,a[0].lets_be_friends, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->
      c += '</div>'
      <!--row-->




      c += '<div class="row">'
      

      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_REGISTER_AS_A_BUSINESS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "business_owner_register", d,a[0].business_owner_register, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->


      c += '</div>'
      <!--row-->



      /*c += '<div class="row">'
      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_MAP_POSITION']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "map_posititon", d,a[0].map_posititon, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6-->

      var d = new Array();
      d.push(JSON.parse('{"id":"t","caption":"Yes"}'));
      d.push(JSON.parse('{"id":"f","caption":"No"}'));

      c += '<div class="col-md-6">'
      c += '<div class="form-group">'
      c += '<label><?=$lang_resource['ADMIN_PAGE_FRONT_REVIEW_SETTINGS']?>:</label>'
      c += Forms.CreateSelectPropertySettings("frontset", "reviewsetting", d,a[0].reviewsetting, false)
      c += '</div>'
      <!--form-group-->
      c += '</div>'
      <!--col-md-6--> 
      c += '</div>'
      <!--row-->*/
		
		
		
     c += '</div>'

					
		$("#websitesetting").empty().append(c);
			
		 $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCountriesDataFrontSet"}]', function (b) {
         
         b = JSON.parse(b);
         console.log(b)
         MultipleInput.InitFrontCountry("countrytag", b.countriesfrontset, true,'','FrontPage.setCityList()');
         MultipleInput.Tags['countrytag'] = new Array();
         for(r in a[0].countrytag){
        	
         MultipleInput.AddTagByElem('countrytag',a[0].countrytag[r],true);
         MultipleInput.Tags["countrytag"][r]=a[0].countrytag[r];
         MultipleInput.ForceFilters["countrytag"]="FrontPage.setCityList()";
            
        }
        FrontPage.setCityList();      
         
      });
	  
	  $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCitiesDataFrontSet"}]', function (b) {
          
             b = JSON.parse(b);
             console.log(b)
      
     		 MultipleInput.InitFrontCountry("citytag", '', true,'','FrontPage.setRestaurantsList()');
             
                MultipleInput.Tags['citytag'] = new Array();
                   for(r in a[0].citytag){
        	
        
    	
         MultipleInput.AddTagByElem('citytag',a[0].citytag[r],true);
          	 MultipleInput.Tags["citytag"][r]=a[0].citytag[r]; 
             MultipleInput.ForceFilters["citytag"]="FrontPage.setRestaurantsList()";
            
        }
         FrontPage.setRestaurantsList();
          });
		  
		  $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessDataFrontSet"}]', function (b) {
          
             b = JSON.parse(b);
             console.log(b)
   
        
           MultipleInput.InitFrontCountry("restaurant", '', true,'','FrontPage.setRestaurantsvalue()');
          MultipleInput.Tags['restaurant'] = new Array();
        
                   for(r in a[0].restaurant){
        	
          MultipleInput.AddTagByElem('restaurant',a[0].restaurant[r],true);
             MultipleInput.Tags["restaurant"][r]=a[0].restaurant[r];
              MultipleInput.ForceFilters["restaurant"]="";
          
            
        }
          });
        
        
    
        if (a[0].frontset) {
            F.categories = JSON.parse(F.categories);
            for (E in F.categories) {
                MultipleInput.AddTagById("categories", F.categories[E])
            }
        }
		
	},
	
	setRestaurantsList:function(y){
         $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessDataFrontSet"}]', function (a) {
          
        a = JSON.parse(a);
        console.log(a)
        FrontPage.businessfrontset=a.businessfrontset;
        //////////////////////////////////////
            for (e in  FrontPage.businessfrontset) {
                
                    if(( FrontPage.businessfrontset[e].city==y) ||(y=='-1')){
                   		elemt=document.getElementById("restaurant" + "_" + FrontPage.businessfrontset[e].id + "tag");
                    	
                        if( elemt!=null){
                            MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + FrontPage.businessfrontset[e].id + "close")
                        }
                        if((y!='-1')){
                            for (e1 in MultipleInput.Tags["citytag"]) {
                                
                                if(FrontPage.businessfrontset[e].city==MultipleInput.Tags["citytag"][e1].id){
                                     delete MultipleInput.Tags["citytag"][e1]; 
                                }
                            }
                        }
                        for (e2 in MultipleInput.Tags["restaurant"]) {
                        
                            if(FrontPage.businessfrontset[e].id==MultipleInput.Tags["restaurant"][e2].id){
                             delete MultipleInput.Tags["restaurant"][e2]; 
                            }
                        }
                    }
             
             }
    
        ///////////////////////////////////////////////////////
      citylist='';
      for (e in MultipleInput.Tags["citytag"]) {
      if(MultipleInput.Tags["citytag"][e]!=''){
      	citylist+=MultipleInput.Tags["citytag"][e].id+',';
      
        }
      }
        cityStr = citylist.substr(0, (citylist.length-1));
        cityArr=  cityStr.split(',');  
     
             for (e in  FrontPage.businessfrontset) {
         		if(jQuery.inArray("-1", cityArr) < 0){
             
                      if( ((jQuery.inArray( FrontPage.businessfrontset[e].city, cityArr ) < 0 ) && ( FrontPage.businessfrontset[e].city!='-1') )|| ( FrontPage.businessfrontset[e].id==null)){
                        delete FrontPage.businessfrontset[e]; 
                       
                      }
                }else{
              		   countrylist='';
                      for (e in MultipleInput.Tags["countrytag"]) {
                      if(MultipleInput.Tags["countrytag"][e]!=''){
                        countrylist+=MultipleInput.Tags["countrytag"][e].id+',';
                      
                        }
                      }
                     
                    countryStr = countrylist.substr(0, (countrylist.length-1));
                    countryArr=  countryStr.split(',');       
                         for (e in  FrontPage.businessfrontset) {
                       
                            if(jQuery.inArray("-1", countryArr) < 0){
                          
                          if( ((jQuery.inArray( FrontPage.businessfrontset[e].country, countryArr ) < 0 ) && ( FrontPage.businessfrontset[e].country!='-1') )|| ( FrontPage.businessfrontset[e].id==null)){
                            delete FrontPage.businessfrontset[e]; 
                           
                          }
                            }
                         }
                          
              
              }
         }
        
         ////////////////////////////////////////////////////////////////
         
           restaurantList='';
         for (e5 in FrontPage.businessfrontset) {
      if(FrontPage.businessfrontset[e5]!=''){
      	restaurantList+=FrontPage.businessfrontset[e5].id+',';
      
        }
      }
      
   	   restaurantList = restaurantList.substr(0, (restaurantList.length-1));
       if((restaurantList=='') ){
       	delete FrontPage.businessfrontset;
       }
       if(y=='-1'){
        	delete FrontPage.businessfrontset;
     

        for (e in MultipleInput.Tags["citytag"]) {
        
            if(MultipleInput.Tags["citytag"][e]!=''){
           		elemt=document.getElementById("citytag" + "_" + MultipleInput.Tags["citytag"][e].id + "tag");
                
                if( elemt!=null){
                	MultipleInput.DeleteTag('citytag', "citytag" + "_" + MultipleInput.Tags["citytag"][e].id+ "close")
                }
                  delete MultipleInput.Tags["citytag"][e]; 
                   delete MultipleInput.Tags["restaurant"][e]; 
            
            }
        }
            
            
       }else{
          if((restaurantList=='-1') ){
         
      	 	delete FrontPage.businessfrontset;
           for (e in MultipleInput.Tags["restaurant"]) {
        
            if(MultipleInput.Tags["restaurant"][e]!=''){
           		elemt=document.getElementById("restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id + "tag");
               
                if( elemt!=null){
                	MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id+ "close")
                }
                 
                   delete MultipleInput.Tags["restaurant"][e]; 
            
            }
        }
        
      	 }
       }
         /////////////////////////////////////////////////////////////////////
           
        MultipleInput.Init2("restaurant", FrontPage.businessfrontset, true);
          MultipleInput.TagsChange("countrytag");
        MultipleInput.TagsChange("citytag");
            MultipleInput.TagsChange("restaurant");  
          });
    
    },
	
	setCityList:function (y) {

   $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllCitiesDataFrontSet"}]', function (a) {
          a = JSON.parse(a);
		
            for (e in  a.citiesfrontset) {
               
                    if(( a.citiesfrontset[e].country==y) ||(y=='-1')){
                   		elemt=document.getElementById("citytag" + "_" + a.citiesfrontset[e].id + "tag");
						
                  
                        if( (elemt!=null)){
							
                           	  
                            	MultipleInput.DeleteTag('citytag', "citytag" + "_" + a.citiesfrontset[e].id + "close")
							
                            	    
                                for (e7 in MultipleInput.Tags["restaurant"]) {
                           
                                if((a.citiesfrontset[e].id==MultipleInput.Tags["restaurant"][e7].city) || (MultipleInput.Tags["restaurant"][e7].city==-1)){
									
									
								
								 if((MultipleInput.Tags["restaurant"][e7].id!='-1') ){
									 
							
									  MultipleInput.DeleteTag('restaurant', "restaurant" + "_" +MultipleInput.Tags["restaurant"][e7].id + "close")
                                     delete MultipleInput.Tags["restaurant"][e7]; 
                                      delete FrontPage.businessfrontset[e7];
								 }
                                 
                                     
                                }
                           	 }
                               MultipleInput.Init2("restaurant", FrontPage.businessfrontset, true);
                            
                        }
                        if((y!='-1')){
                            for (e1 in MultipleInput.Tags["countrytag"]) {
                                
                                if(a.citiesfrontset[e].country==MultipleInput.Tags["countrytag"][e1].id){
                                     delete MultipleInput.Tags["countrytag"][e1]; 
                                }
                            }
                            
                            
                        }
                        for (e2 in MultipleInput.Tags["citytag"]) {
                        
                            if(a.citiesfrontset[e].id==MultipleInput.Tags["citytag"][e2].id){
                             delete MultipleInput.Tags["citytag"][e2]; 
                             
                            }
                        }
                    }
             
             }
             
      countrylist='';
      for (e in MultipleInput.Tags["countrytag"]) {
      if(MultipleInput.Tags["countrytag"][e]!=''){
      	countrylist+=MultipleInput.Tags["countrytag"][e].id+',';
      
        }
      }
        countryStr = countrylist.substr(0, (countrylist.length-1));
        countryArr=  countryStr.split(',');       
             for (e in  a.citiesfrontset) {
         		if(jQuery.inArray("-1", countryArr) < 0){
        	  if( (jQuery.inArray( a.citiesfrontset[e].country, countryArr ) < 0 ) && ( a.citiesfrontset[e].country!='-1')){
              	delete a.citiesfrontset[e]; 
               
              }
                }
         }
         cityList='';
         for (e5 in a.citiesfrontset) {
      if(a.citiesfrontset[e5]!=''){
      	cityList+=a.citiesfrontset[e5].id+',';
      
        }
      }
      
   	   cityList = cityList.substr(0, (cityList.length-1));
      
       if((cityList=='') ){
       	delete a.citiesfrontset;
       }
       if(y=='-1'){
        	delete a.citiesfrontset;
     
        for (e in MultipleInput.Tags["countrytag"]) {
        
            if(MultipleInput.Tags["countrytag"][e]!=''){
           		elemt=document.getElementById("countrytag" + "_" + MultipleInput.Tags["countrytag"][e].id + "tag");
                
                if( elemt!=null){
                	MultipleInput.DeleteTag('countrytag', "countrytag" + "_" + MultipleInput.Tags["countrytag"][e].id+ "close")
                }
                  delete MultipleInput.Tags["countrytag"][e]; 
                   delete MultipleInput.Tags["citytag"][e]; 
            
            }
        }
        
        
        	delete FrontPage.businessfrontset;
     
        for (e in MultipleInput.Tags["restaurant"]) {
        
            if(MultipleInput.Tags["restaurant"][e]!=''){
           		elemt=document.getElementById("restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id + "tag");
                
                if( elemt!=null){
                	MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id+ "close")
                }
                  delete MultipleInput.Tags["restaurant"][e]; 
                   delete MultipleInput.Tags["citytag"][e]; 
            
            }
        }
            
			
			
          MultipleInput.Init2("restaurant", FrontPage.businessfrontset, true); 
          
       }else{
          if((cityList=='-1') ){
         
      	 	delete a.citiesfrontset;
           for (e in MultipleInput.Tags["citytag"]) {
        
            if(MultipleInput.Tags["citytag"][e]!=''){
           		elemt=document.getElementById("citytag" + "_" + MultipleInput.Tags["citytag"][e].id + "tag");
               
                if( elemt!=null){
                	MultipleInput.DeleteTag('citytag', "citytag" + "_" + MultipleInput.Tags["citytag"][e].id+ "close")
                }
                 
                   delete MultipleInput.Tags["citytag"][e]; 
            
            }
        }
        
      	 }
       }
       
         restaurantList='';
         for (e5 in FrontPage.businessfrontset) {
      if(FrontPage.businessfrontset[e5]!=''){
      	restaurantList+=FrontPage.businessfrontset[e5].id+',';
      
        }
      }
      
   	   restaurantList = restaurantList.substr(0, (restaurantList.length-1));
     
       if((restaurantList=='-1') ){
       
      	 	delete FrontPage.businessfrontset;
           for (e in MultipleInput.Tags["restaurant"]) {
        
            if(MultipleInput.Tags["restaurant"][e]!=''){
           		elemt=document.getElementById("restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id + "tag");
               
                if( elemt!=null){
                	MultipleInput.DeleteTag('restaurant', "restaurant" + "_" + MultipleInput.Tags["restaurant"][e].id+ "close")
                }
                 
                   delete MultipleInput.Tags["restaurant"][e]; 
            
            }
        }
          MultipleInput.Init2("restaurant", FrontPage.businessfrontset, true);
      	 }
		 //////////////////////////////
		 var countryempty=1;
       for (e in MultipleInput.Tags["countrytag"]) {
		   
		   if( MultipleInput.Tags["countrytag"][e]!="undefined"){
			   countryempty=0;
		   }
		  
	   }
	    console.log(countryempty);
	   if(countryempty==1){
		     for (e1 in MultipleInput.Tags["restaurant"]) {
				   delete MultipleInput.Tags["restaurant"][e1]; 
				    
				   
			 }
			  for (e3 in FrontPage.businessfrontset) {
				   delete FrontPage.businessfrontset[e3];
			  }
			  for (e2 in MultipleInput.Tags["citytag"]) {
				   delete MultipleInput.Tags["citytag"][e2]; 
				  
				     
			 }
			 if(document.getElementById("restaurant_-1close")){
			MultipleInput.DeleteTag('restaurant', "restaurant_-1close")
			 }
			  if(document.getElementById("citytag_-1close")){
			  MultipleInput.DeleteTag('citytag', "citytag_-1close")
			  }
			
			
			  MultipleInput.Init2("restaurant", FrontPage.businessfrontset, true); 
	   }
	     
	    
			
			
			
			
			/////////////////////////////
			
			
			
			
			
			
			
      MultipleInput.Init2("citytag", a.citiesfrontset, true);
      
       MultipleInput.TagsChange("countrytag");
        MultipleInput.TagsChange("citytag");
            MultipleInput.TagsChange("restaurant");   
          });
    },
	setRestaurantsvalue:function (y){
    
       for (e in MultipleInput.Tags["restaurant"]) {
  		if(y!='-1'){
            if(MultipleInput.Tags["restaurant"][e].id==y){
            	delete MultipleInput.Tags["restaurant"][e]; 
            }
        }else{
          delete MultipleInput.Tags["restaurant"][e]; 
        }
  }
      MultipleInput.TagsChange("countrytag");
        MultipleInput.TagsChange("citytag");
            MultipleInput.TagsChange("restaurant");  
      
      
    },
		MultiInputTagsChange: function (d) {
        switch (d) {
        case "dish_ingredients":
        var e = MultipleInput.GetTagsNames(d);
        if (e.length > 0) {
        Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(e))
        } else {
        Forms.UpdateValue(this.ActiveForm, d, "")
        }
        break;
        case "days":
        Business.UpdateSchedule();
        break;
        default:
                
        var f = MultipleInput.GetTagsIds(d);
        if (f.length > 0) {
        this.ActiveForm = "frontset";
        Forms.UpdateValue("frontset", d, JSON.stringify(f))
        } else {
        Forms.UpdateValue("frontset", d, "")
        }
        break
        }
        },
		
		
		Save: function ()
    	{
		
      
    	 if (Forms.CanSave("frontset") == false) {
            return
        	}
			var qq = MultipleInput.GetTagsIds('restaurant');
            
            if (qq.length > 0) {
                
                
            }else{
            
                
                 alert("<?=$lang_resource['CHOOSE_A_RESTAURANTS']?>")
                return
                
            }
			Main.Loading();
			//alert(JSON.stringify(Forms.Form.frontset));
			$.post("lib/frontpage.php", "f=SaveFrontSettings&data=" + JSON.stringify(Forms.Form.frontset), function (f)
        	{
				//alert(f);
			 Main.Ready();
			FrontPage.Main();
			
			}); 
			Forms.Clean("frontset");

      
    },
	
};