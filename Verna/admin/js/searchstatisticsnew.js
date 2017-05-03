var searchstatisticsnew = {
    Main: function () {
        Main.Loading();
		
       var a = new Date().getTime();
        Main.Aid = a;
	 
        $.post("lib/searchstatisticsnew.php", "f=FetchAllData", function (b) {
			
			//alert(b);
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				
				 Main.Config.searchstatistics = new Object();
                 Main.Config.searchstatistics.List = new Object();
				 
                searchstatisticsnew.searchstatistics = JSON.parse(b);
				//alert(JSON.stringify(searchstatisticsnew.searchstatistics));
				searchstatisticsnew.PrintMain()
				
            } else {
                alert("Error")
            }
        })
		 
    },
    PrintMain: function () {
		
        var c = "";
        c+='<div class="row">'
        c+='<div class="top-bar">'
        c+='<div class=" col-md-6 col-md-offset-6">'
        c+='<div class=" pull-right">'
        c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button>'
        c +='</div>'
        c +='</div>'
        c+='</div>'
        <!--top-bar-->
        c+='</div>'
        <!--row-->

        c+='<div class="panel panel-danger panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'

        c+='<div class="row">'
        c+='<div class="col-md-4">'
		if(!e){
		var e = 0	
		}
		
		if(searchstatisticsnew.searchstatistics[e].search_type=='All')
		 c+='<h3 class="panel-title-2"><?=$lang_resource['CONTROL_PANEL_MENU_SEARCH_STATISTICS'] ?> Daily</h3>'
		 else
        c+='<h3 class="panel-title-2"><?=$lang_resource['CONTROL_PANEL_MENU_SEARCH_STATISTICS'] ?> ' +searchstatisticsnew.searchstatistics[e].search_type+'</h3>'
        c+='</div>'
        <!--col-md-6-->
        c+='<div class="col-md-3">'
        c+='<div class="panel-btn filtr_margin">'
        c+='<input type="text" class="form-control rounded panel-red-field white-placeholder"  id="search" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+='</div>'
        c+='</div>'
        <!--col-md-3-->
        c+='<div class="col-md-5">'
        c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'                
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:searchstatisticsnew.Daily()" data-effect="mfp-zoom-in"><i class=""></i> <?=$lang_resource['SEARCH_STATISTICS_DAILY'] ?></a>'
        c+='</span>'
		 c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:searchstatisticsnew.Weekly()" data-effect="mfp-zoom-in"><i class=""></i> <?=$lang_resource['SEARCH_STATISTICS_WEEKLY'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:searchstatisticsnew.Monthly()" data-effect="mfp-zoom-in"><i class=""></i> <?=$lang_resource['SEARCH_STATISTICS_MONTHLY'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn"  onclick="searchstatisticsnew.Yearly()"><i class="" ></i> <?=$lang_resource['SEARCH_STATISTICS_YEARLY'] ?></button>'
        c +='</span>'
		 c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn"  onclick="searchstatisticsnew.Export()"><i class="" ></i> <?=$lang_resource['SEARCH_STATISTICS_EXPORT'] ?></button>'
        c +='</span>'
        c+='</div>'
        c+='</div>'
        c+='</div>'
        <!--col-md-3-->
        c+='</div>'
        <!--row-->
        c+='</div>'
        <!--panel-heading-->

        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
		
        c +='<td><?=$lang_resource["SEARCH_STATISTICS_COUNTRY"]?></td>'
        c +='<td><?=$lang_resource["SEARCH_STATISTICS_CITY"]?></td>'
		//c +='<td></td>'
		c +='<td><?=$lang_resource["SEARCH_STATISTICS_ADDRESS"]?> / <?=$lang_resource["SEARCH_STATISTICS_POSTCODE"]?></td>'
		c +='<td><?=$lang_resource["SEARCH_STATISTICS_REGTURANT"]?></td>'
		c +='<td><?=$lang_resource["SEARCH_STATISTICS_CATEGORY"]?></td>'
		c +='<td><?=$lang_resource["SEARCH_STATISTICS_HITS"]?></td>'
		c +='<td><?=$lang_resource["SEARCH_STATISTICS_CONVERSION"]?></td>'
		c +='<td><?=$lang_resource["SEARCH_STATISTICS_RESULT"]?></td>'
		
		
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="ads">'                    										
        c+='</tbody>'
        c+='</table>'
		
		c += '<div class="container" id="ads"></div>';
        c += "</div>";
		
		c += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/exportpdf.php">';
        c += '<input type="hidden" name="f" value="Exportstatistic"/>';
        c += '<input id="exp_data" type="hidden" name="data" value=""/>';
        c += '<input type="hidden" name="name" value="orders"/>';
        c += "</form>";
		
		
        c+='</div>'
        <!--table-responsive-->
        c+='</div>'
        <!--panel-body-->    


        c+='</div>';
        <!--panel panel-danger panel-no-border-->
       
		   
     
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeydown = function () {
			
          searchstatisticsnew.PupulateTable(Main.Config.searchstatistics.List.SortBy, true)
        };
        
		
		searchstatisticsnew.PupulateTable(Main.Config.searchstatistics.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
	
		
		var d = "";
		
		 if (c) { 
            this.searchstatistics.sort(Main.SortByProperty(a));
            if (Main.Config.searchstatistics.List.SortByStatus == "max") { 
                this.searchstatistics.reverse()
            }
        } else { 
            if (Main.Config.searchstatistics.List.SortBy != a) {
                this.searchstatistics.sort(Main.SortByProperty(a));
                Main.Config.searchstatistics.List.SortByStatus = "min"
            } else {
                this.searchstatistics.reverse();
                if (Main.Config.searchstatistics.List.SortByStatus == "min") {
                    Main.Config.searchstatistics.List.SortByStatus = "max"
                } else {
                    Main.Config.searchstatistics.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.searchstatistics.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
		
		
		
		
		
		
		
		
		
		
        var j = false;
        var g = "";
        var l = new Array();
		
		
	  
        for (var e in searchstatisticsnew.searchstatistics) {
			 j = false;
			  g = document.getElementById("search").value.toLowerCase();
            if (( Main.NullToEmpty(this.searchstatistics[e].address).toLowerCase().indexOf(g) >= 0) || ( Main.NullToEmpty(this.searchstatistics[e].country).toLowerCase().indexOf(g) >= 0) || ( Main.NullToEmpty(this.searchstatistics[e].city).toLowerCase().indexOf(g) >= 0) || ( Main.NullToEmpty(this.searchstatistics[e].resturant).toLowerCase().indexOf(g) >= 0)) {
                j = true;
                l.push(this.searchstatistics[e])
           }
            //j = true;
          
            if (j) {
			
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
				
			/*	if(Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].address)!=''){
					
					if(Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].categories)!=''){*/
					
            //    d += '<div class="default row' + k + '" style="border-bottom:1px solid #e4e4e4;">';
           
               
           		d += '<tr>';
                d += '<td>' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].country) + "</td>";
               
                d += '<td >' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].city) + "</td>";
			   // d += '<td >' + 'New York' + "</td>";
				// d += '<td>' + searchstatisticsnew.searchstatistics[e].zipcode + "</td>";
                d += '<td  >' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].address)	 + "</td>";
			
				 d += '<td  >' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].resturant )+ "</td>";
                d += '<td  >' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].categories )+ "</td>";
				 d += '<td  >' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].total) + "</td>";
         if(Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].conversion) !=""){
          var conv = Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].conversion) + "%";
         }else{
          var conv = '';
         }
				  d += '<td  >' + conv+"</td>";
				   d += '<td  >' + Main.NullToEmpty(searchstatisticsnew.searchstatistics[e].result) + "</td>";
                d += "</tr>"
               
              // d += "</div>"
				/*}
            }*/
			}
        }
	
		
        document.getElementById("ads").innerHTML = d;
   
    
		
		
		},
    SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/searchstatisticsnew.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    Daily: function () {
		// $('div[id*=newpopup]').remove();
        var a = this;
       
		$.post("lib/searchstatisticsnew.php", "f=FetchAllData", function (b) { 
			
			
			searchstatisticsnew.searchstatistics = JSON.parse(b);
			//return false
			searchstatisticsnew.PrintMain()
			
			})
			
			// Main.GetFranchisesData("searchstatisticsnew.Form()")
    },
	 Weekly: function (a) {
		  var a = this;
       
		$.post("lib/searchstatisticsnew.php", "f=FetchAllSearchStatisticWeeklyData", function (b) {		
			
			searchstatisticsnew.searchstatistics = JSON.parse(b);
			//return false
			searchstatisticsnew.PrintMain()
			
			})
		
		},
		
    Monthly: function (a) {
		  var a = this;
       
		$.post("lib/searchstatisticsnew.php", "f=FetchAllSearchStatisticMonthlyData", function (b) { 

			//alert(b);
			
			searchstatisticsnew.searchstatistics = JSON.parse(b);
			//return false
			searchstatisticsnew.PrintMain()
			
			})
		
		},
		Yearly: function (a) {
		  var a = this;
       
		$.post("lib/searchstatisticsnew.php", "f=FetchAllSearchStatisticYearlyData", function (b) {
			
			
			searchstatisticsnew.searchstatistics = JSON.parse(b);
			//return false
			searchstatisticsnew.PrintMain()
			
			})
		
		},
		 Export: function (a) {
			 var a = new Object();
		a = searchstatisticsnew.searchstatistics[e].search_type;
		
       // a.ids = c;
       // a.type = b;
        document.getElementById("exp_data").value = JSON.stringify(a);
		
        document.getElementById("exp_form").submit()		 
			 
			 },
    PreEdit: function (a) {
		//alert(a);
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
		//alert(JSON.stringify(a));
        //Main.Franchises = a.franchises;
		
		
        this.Form(a)
		   if(a.payby==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(a.payby==2)
			{
			   document.getElementById("idprice").style.display="";
			}
    },
    Form: function (e) {
		
		//alert(JSON.stringify(e))
		
		 MultipleInput.AddListener("tagschange", "searchstatisticsnew.MultiInputTagsChange");
		
		
      
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
        }
		 Forms.Form.ad.ad = e;
        this.ActiveForm = "ad";
		
         var k = "";
       
        if (Forms.Form.ad.type == "create") {
            k += '<h3 class="popup-heading"><?=$lang_resource['DISCOUNT_CODES_CREATE_DISCOUNT_CODE'] ?></h3>'
        } else {
            k += '<h3 class="popup-heading"><?=$lang_resource['DISCOUNT_CODES_EDIT_DISCOUNT_CODE'] ?></h3>'
        }
		
		
		   k +='<div class="row">'
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_DISCOUNT'] ?></label>'
		   if (Forms.Form.ad.type == "create") {
           k +=Forms.CreateInputPropertydisreadonlyPopup("ad", "code",randomString(10), true, "", false, false, "return searchstatisticsnew.IsNumberKeyFour(this.value,event)")
		   }else{
		   k +=Forms.CreateInputPropertydisreadonlyPopup("ad", "code",Main.NullToEmpty(e.code), false, false, "return searchstatisticsnew.IsNumberKeyFour(this.value,event)")  
		   }
           k +='</div>'
           k +='</div>'<!--col-md-6-->
		   
		     var g = "";
        var b;
        if (Forms.Form.ad.type == "modify") {
			
			/*if(e.payby==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(e.payby==2)
			{
			   document.getElementById("idprice").style.display="";
			}*/
			 b = "";
        } else {
            b = '{"id":"","caption":""},'
        }
        g = "[" + b + '{"id":"1","caption":"Percentage"},{"id":"2","caption":"Price"}]';
        g = JSON.parse(g);
		   
		   
		   
		   
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_VALID_UPTO'] ?></label>'
           k+=Forms.CreateInputPropertyPopup("ad", "validdays", Main.NullToEmpty(e.validdays), true, "searchstatisticsnew.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="validdays_text" style="color:#F00;display:none;"><?=$lang_resource['searchstatisticsnew_VALIDATION_VALID_UPTO']?></small>'
           k +='</div>'
           k +='</div>'<!--col-md-6-->
           k +='</div>'<!--row-->
		
		   k+='<div class="row">'
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_MAXIMUM_LIMIT'] ?></label>'
           k +=Forms.CreateInputPropertyPopup("ad", "maxallow", Main.NullToEmpty(e.maxallow), true, "searchstatisticsnew.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="maxallow_text" style="color:#F00;display:none;"><?=$lang_resource['searchstatisticsnew_VALIDATION_MAXIMUM_LIMIT']?></small>'
           k +='</div>'
           k +='</div>'<!--col-md-6-->
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_MINIMUM_PURCHASE'] ?></label>'
           k +=Forms.CreateInputPropertyPopup("ad", "minshop", Main.NullToEmpty(e.minshop), true, "searchstatisticsnew.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="minshop_text" style="color:#F00;display:none;"><?=$lang_resource['searchstatisticsnew_VALIDATION_MINIMUM_PURCHASE']?></small>'
           k +='</div>'
           k +='</div>'<!--col-md-6-->
           k +='</div>'<!--row-->
		
		   k+='<div class="row">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_TYPE'] ?></label>'
           k+=Forms.CreateSelectPropertyPopup("ad", "payby", g, e.payby, true, "searchstatisticsnew.TypeChanged(this.value)", "searchstatisticsnew.PreValidation()")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="payby_text" style="color:#F00;display:none;"><?=$lang_resource['searchstatisticsnew_VALIDATION_DISCOUNT_TYPE']?></small>'
          
		    if (Forms.Form.ad.type == "modify") {	   
        	 if(e.payby==1)
		 	{
			 var per_percent = e.commonrate;
	     	}
		   
          
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
           k+='<div class="row" style="display: none" id="idpercent" >'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_PERCENTAGE'] ?></label>'
           k+=Forms.CreateInputPropertyPopup("ad", "commonratetype1", Main.NullToEmpty(per_percent), false, "", false, false, "return Main.IsNumberKey(event)")
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
		   
		   if(e.payby==2)
		 {
			 var per_price = e.commonrate;
	     }
		   k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
           k+='<div class="row" style="display: none" id="idprice">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_PRICE'] ?></label>'
           k+=Forms.CreateInputPropertyPopup("ad", "commonratetype2", Main.NullToEmpty(per_price), false, "", false, false, "return Main.IsNumberKey(event)")
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
			}
			else
		    {
		   k+='<div class="row" style="display: none" id="idpercent">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_PERCENTAGE'] ?> </label>'
           k+=Forms.CreateInputPropertyPopup("ad", "commonrate", Main.NullToEmpty(per_percent), false, "", false, false, "return Main.IsNumberKey(event)")
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
		   
		   k+='<div class="row" style="display: none" id="idprice">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_PRICE'] ?> </label>'
           k+=Forms.CreateInputPropertyPopup("ad", "commonrate", Main.NullToEmpty(per_price), false, "", false, false, "return Main.IsNumberKey(event)")
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
		   }
		   
		   
		   k+='<div class="row">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_BUSINESS'] ?></label>'
           Forms.CreateValue("ad", "business",Main.NullToEmpty(e.business));
		   k+='<input type="text" id="business"/>'
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="business_text" style="color:#F00;display:none;">The Business is required and cant be empty</small>'
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
           k+='<div class="row">'
           k+='<div class="col-md-6 col-md-offset-3">'
		   if (Forms.Form.ad.type == "create") {
           k+='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="searchstatisticsnew.Save()"><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_CREATE'] ?></button></center>'
		   }
		   else
		   {
			k+='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="searchstatisticsnew.Save()"><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_UPDATE'] ?></button></center>'   
		   }
           k+='</div>'<!--col-md--->
           k+='</div>'<!--row-->
		
		   Popup.Show(k);
		
		
		 MultipleInput.Init("business",searchstatisticsnew.restaurants, true);
		 
		  if (Forms.Form.ad.type == "modify") {
				if (Forms.Form.ad.ad.business != "") {
					var d = JSON.parse(Forms.Form.ad.ad.business);
					for (var e in d) {
						MultipleInput.AddTagById("business", d[e])
					}
					Forms.Form.ad.fields.business.save = false
				}
		   }
		 
		  
       
        $("#name").focus()
    },
	IsNumberKeyFour: function (b,c) {
      
	    var a = c.keyCode;
		
		//alert(a);
      
	    if (a == 8 || a == 46) {
            return true
        }
		else if(b.length>5)
		{
			  return false
		}
		 return true
		 //alert(b);
		
    },
	IsNumberKeytwo: function (b,c) {
      
	     var a = c.keyCode;
		 
		if (a == 8 || a == 46) {
            return true
        }
		
		 return true
		 //alert(b);
		
    },
    TypeChanged: function (a) {
		//alert(JSON.stringify(a));
		if(document.getElementById("payby").value == ""){
            $("#payby_text").show();
            $("#payby").addClass("error-text-field");
            $("#payby").removeClass("success-text-field");
            count ++;
        }else{
        	$("#payby_text").hide();
            $("#payby").addClass("success-text-field");
            $("#payby").removeClass("error-text-field");
        }
		
        if(a == 1)
		{
			document.getElementById("idpercent").style.display = "";
			document.getElementById("idprice").style.display = "none";
		}
		else if(a == 2)
		{
			document.getElementById("idpercent").style.display = "none";
			document.getElementById("idprice").style.display = "";
		}
		else
		{
			document.getElementById("idpercent").style.display = "none";
			document.getElementById("idprice").style.display = "none";
			
		}
    },
    ProfileImageSelected: function (b, a) {
        Forms.UpdateValue("ad", "imgupload" + a, b, true);
        if (Forms.CanSave("ad")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (b) {
        Response = JSON.parse(b);
        if (Response.status == "no files selected") {
            Discount.Save()
        } else {
            var c = true;
            for (var a in Response) {
                if (Response[a].status == "failed") {
                    c = false
                }
            }
            if (c) {
                Discount.Save(Response[0].name)
            }
        }
    },
    ProfileStartUpload: function () {
        Forms.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
        }
    },
	PreValidation: function(){
   	var count = 0;	
    
    	if(document.getElementById("validdays").value == ""){
            $("#validdays_text").show();
            $("#validdays").addClass("error-text-field");
            $("#validdays").removeClass("success-text-field");
            count ++;
        }else{
        	$("#validdays_text").hide();
            $("#validdays").addClass("success-text-field");
            $("#validdays").removeClass("error-text-field");
        }
        
        if(document.getElementById("maxallow").value == ""){
            $("#maxallow_text").show();
            $("#maxallow").addClass("error-text-field");
            $("#maxallow").removeClass("success-text-field");
            count ++;
        }else{
        	$("#maxallow_text").hide();
            $("#maxallow").addClass("success-text-field");
            $("#maxallow").removeClass("error-text-field");
        }
        
        if(document.getElementById("minshop").value == ""){
            $("#minshop_text").show();
            $("#minshop").addClass("error-text-field");
            $("#minshop").removeClass("success-text-field");
            count ++;
        }else{
        	$("#minshop_text").hide();
            $("#minshop").addClass("success-text-field");
            $("#minshop").removeClass("error-text-field");
        }
		 if(document.getElementById("payby").value == ""){
            $("#payby_text").show();
            $("#payby").addClass("error-text-field");
            $("#payby").removeClass("success-text-field");
            count ++;
        }else{
        	$("#payby_text").hide();
            $("#payby").addClass("success-text-field");
            $("#payby").removeClass("error-text-field");
        }
		var e = MultipleInput.GetTagsIds('business');
        if (e.length > 0) {
            $("#business_text").hide();
            $("#businesscontainer").addClass("success-text-field");
            $("#businesscontainer").removeClass("error-text-field");
        }else{
            $("#business_text").show();
            $("#businesscontainer").addClass("error-text-field");
            $("#businesscontainer").removeClass("success-text-field");
            count ++;
        }
        
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
    Save: function () {
		
		if(searchstatisticsnew.PreValidation() == false){
			return
		}
			
		
        if (Forms.CanSave("ad") == false) {
            return
        }
        
	    
	    Main.Request("searchstatisticsnew", null, "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.ad), "searchstatisticsnew.Main()");
	   
		 Popup.Close();
		 
		 //searchstatisticsnew.Main()
		 //alert("ok");
			
       // Uploader.Clean();
        Forms.Clean("ad")
    },
	
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("<?=$lang_resource['DISCOUNT_CODES_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		/*alert(JSON.stringify(a));
		return false;*/
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['DISCOUNT_CODES_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/searchstatisticsnew.php", "f=DeleteAd&data=" + JSON.stringify(a), function (e) {
						searchstatisticsnew.Main()
						alert('<?=$lang_resource['DISCOUNT_CODES_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
		
		
       // Main.Request("searchstatisticsnew", null, "f=DeleteAd&data=" + JSON.stringify(a), "searchstatisticsnew.Main()")
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
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
			searchstatisticsnew.PreValidation();
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
           // Forms.EnableSubmitButton(true)
        } else {
            //Forms.EnableSubmitButton(false)
        }
    }
};

function randomString (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
		}
