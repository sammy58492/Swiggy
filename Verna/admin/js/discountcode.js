var DiscountCode = {
    Main: function () {
        Main.Loading();
		
       var a = new Date().getTime();
        Main.Aid = a;
	 	
        $.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
       
          DiscountCode.restaurants = JSON.parse(b);
          //alert( JSON.stringify(DiscountCode.restaurants));
		  
          if(DiscountCode.restaurants.length == 0){
            alert("<?=$lang_resource['ADMIN_PAGE_SORRY_NO_BUSINESS_AVAILABLE'] ?>")
            Admin.HomeUrl()
            return;
          }

        })
			
        $.post("lib/discountcode.php", "f=FetchAllDiscountData", function (b) {
			
			
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				
				 Main.Config.discount = new Object();
                 Main.Config.discount.List = new Object();
				 
                DiscountCode.discount = JSON.parse(b);
				DiscountCode.PrintMain()
				
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
        c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL'] ?></button>'
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
        c+='<h3 class="panel-title-2"><?=$lang_resource['DISCOUNT_CODES_HEADING'] ?></h3>'
        c+='</div>'
        <!--col-md-6-->
        c+='<div class="col-md-3">'
        c+='<div class="panel-btn filtr_margin">'
        c+='<input type="text" class="form-control rounded panel-red-field white-placeholder"  id="search" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+='</div>'
        c+='</div>'
        <!--col-md-3-->
        c+='<div class="col-md-5">'
        c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'                
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:DiscountCode.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['DISCOUNT_CODES_ADD'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:DiscountCode.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['DISCOUNT_CODES_EDIT'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn"  onclick="DiscountCode.Delete()"><i class="fa icon-remove2" ></i> <?=$lang_resource['DISCOUNT_CODES_DELETE'] ?></button>'
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
        c+='<th width="5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['DISCOUNT_CODES_ALL'] ?></th>'
        c+='<th width="15%" onclick="DiscountCode.PupulateTable(\'id\')"><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_ID'] ?></th>'
        c+='<th width="25%"><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_CODE'] ?></th>'
        c+='<th width="20%"><?=$lang_resource['DISCOUNT_CODES_EXPIRY_DATE'] ?></th>'
        c+='<th width="10%"><?=$lang_resource['DISCOUNT_CODES_HITS'] ?></th>'
        c+='<th width="10%"><?=$lang_resource['DISCOUNT_CODES_LIMIT'] ?></th>'
        c+='<th width="15%"><?=$lang_resource['DISCOUNT_CODES_ENABLE'] ?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="discount_code">'                    										
        c+='</tbody>'
        c+='</table>'
        c+='</div>'
        <!--table-responsive-->
        c+='</div>'
        <!--panel-body-->    


        c+='</div>';
        <!--panel panel-danger panel-no-border-->
       
		   
     
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
          DiscountCode.PupulateTable(Main.Config.discount.List.SortBy, true)
        };
        
		
		DiscountCode.PupulateTable(Main.Config.discount.List.SortBy, true)
    },
    PupulateTable: function (a, c) {
      
        var d = "";
        var b = this.discount.length;
		
        if (c) {
            this.discount.sort(Main.SortByProperty(a));
            if (Main.Config.discount.List.SortByStatus == "max") {
                this.discount.reverse()
            }
        } else {
            if (Main.Config.discount.List.SortBy != a) {
                this.discount.sort(Main.SortByProperty(a));
                Main.Config.discount.List.SortByStatus = "min"
            } else {
                this.discount.reverse();
                if (Main.Config.discount.List.SortByStatus == "min") {
                    Main.Config.discount.List.SortByStatus = "max"
                } else {
                    Main.Config.discount.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.discount.List.SortBy = a;
        if (!c) {
            Main.SaveConfig()
        }
        var j = false;
        var g = "";
        var l = new Array();
	

        for (var e in this.discount) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.discount[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].code).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].expirydate).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.discount[e])
           }
            if (j) {
                
 
			         d +='<tr>'
           	   d +='<td><input type="checkbox" class="checkbox" value="' + this.discount[e].id + '"></td>'
               d +='<td onclick="DiscountCode.Edit(' + this.discount[e].id + ')" class="hand">' + this.discount[e].id + '</td>'
               d +='<td onclick="DiscountCode.Edit(' + this.discount[e].id + ')" class="hand">'+ Main.NullToEmpty(this.discount[e].code).toUpperCase() +'</td>'
               d +='<td onclick="DiscountCode.Edit(' + this.discount[e].id + ')" class="hand">'+   Main.NullToEmpty(this.discount[e].expirydate) +'</td>'
               d +='<td>'+   Main.NullToEmpty(this.discount[e].hits) + '</td>'
               d +='<td>'+   Main.NullToEmpty(this.discount[e].maxallow) +'</td>'
               d += '<td><div class="enabled"><span class="caption"><div id="switch_' + this.discount[e].id + '"></div></span></div></td>'
			         d +='</tr>'
               
				
				 }
           
        }
	
        document.getElementById("discount_code").innerHTML = d;
        var h = false;
        Switch.Init();
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                DiscountCode.SetEnabled(m.replace("switch_", ""), i)
            })
        }
    },
    SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/discountcode.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    New: function () {
		 $('div[id*=newpopup]').remove();
        var a = this;
       
		$.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
			
			
			DiscountCode.restaurants = JSON.parse(b);
			//return false
			
			
			})
			
			 Main.GetFranchisesData("DiscountCode.Form()")
    },
    Edit: function (a) {
		$('div[id*=newpopup]').remove();
		
        var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValues();
            if (c.length == 1) {
                a = c[0];
                d = true
            }
			else if(c.length > 1){
            	alert("<?=$lang_resource['DISCOUNT_CODES_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['DISCOUNT_CODES_SELECT_EDIT']?>");
                return
            }
			
			
			
        } if (d) {
            Main.Loading();
		
			var gk = new Date().getTime();
			Main.Aid = gk;
           // Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDiscountData","id":"' + a + '"}]', "DiscountCode.PreEdit")
		     $.post("lib/discountcode.php", "f=FetchDiscountData&id=" + a, function (b) {
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				DiscountCode.PreEdit(b);
				//alert(b);
			 })
        }
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
		
		 MultipleInput.AddListener("tagschange", "DiscountCode.MultiInputTagsChange");
		
		
      
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
           k +=Forms.CreateInputPropertydisreadonlyPopupdis("ad", "code",'', true, "", false, false, "return DiscountCode.IsNumberKeyFour(this.value,event);","DiscountCode.codecheck(this.value)")
		   
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="code_text" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNT_CODES_REQUIRED']?></small>'
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="code_text_exist" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNT_CODES_EXIST']?></small>'
		   }else{
		   k +=Forms.CreateInputPropertydisreadonlyPopupdis("ad", "code",Main.NullToEmpty(e.code), false,"", false,false,"return DiscountCode.IsNumberKeyFour(this.value,event)","DiscountCode.codecheck(this.value)")  
		 
		   
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="code_text" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNT_CODES_REQUIRED']?></small>'
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="code_text_exist" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNT_CODES_EXIST']?></small>'
		   
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
        g = "[" + b + '{"id":"1","caption":"<?=$lang_resource['DISCOUNT_CODES_PERCENTAGE'] ?>"},{"id":"2","caption":"<?=$lang_resource['DISCOUNT_CODES_PRICE'] ?>"}]';
        g = JSON.parse(g);
		   
		   
		   
		   
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_VALID_UPTO'] ?></label>'
           k+=Forms.CreateInputPropertyPopup("ad", "validdays", Main.NullToEmpty(e.validdays), true, "DiscountCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="validdays_text" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNTCODE_VALIDATION_VALID_UPTO']?></small>'
           k +='</div>'
           k +='</div>'<!--col-md-6-->
           k +='</div>'<!--row-->
		
		   k+='<div class="row">'
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_MAXIMUM_LIMIT'] ?></label>'
           k +=Forms.CreateInputPropertyPopup("ad", "maxallow", Main.NullToEmpty(e.maxallow), true, "DiscountCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="maxallow_text" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNTCODE_VALIDATION_MAXIMUM_LIMIT']?></small>'
           k +='</div>'
           k +='</div>'<!--col-md-6-->
           k +='<div class="col-md-6">'
           k +='<div class="form-group">'
           k +='<label><?=$lang_resource['DISCOUNT_CODES_MINIMUM_PURCHASE'] ?></label>'
           k +=Forms.CreateInputPropertyPopup("ad", "minshop", Main.NullToEmpty(e.minshop), true, "DiscountCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="minshop_text" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNTCODE_VALIDATION_MINIMUM_PURCHASE']?></small>'
           k +='</div>'
           k +='</div>'<!--col-md-6-->
           k +='</div>'<!--row-->
		
		   k+='<div class="row">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_TYPE'] ?></label>'
           k+=Forms.CreateSelectPropertyPopup("ad", "payby", g, e.payby, true, "DiscountCode.TypeChanged(this.value)", "DiscountCode.PreValidation()")
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="payby_text" style="color:#F00;display:none;"><?=$lang_resource['DISCOUNTCODE_VALIDATION_DISCOUNT_TYPE']?></small>'
          
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
           k+=Forms.CreateInputPropertyPopup("ad", "commonratetype2", Main.NullToEmpty(per_price), true, "", false, false, "return Main.IsNumberKey(event)")
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
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="business_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_IS_REQUIRED'] ?></small>'
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
           k+='<div class="row">'
           k+='<div class="col-md-6 col-md-offset-3">'
		   if (Forms.Form.ad.type == "create") {
           k+='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DiscountCode.Save()"><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_CREATE'] ?></button></center>'
		   }
		   else
		   {
			k+='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DiscountCode.Save()"><?=$lang_resource['DISCOUNT_CODES_DISCOUNT_UPDATE'] ?></button></center>'   
		   }
           k+='</div>'<!--col-md--->
           k+='</div>'<!--row-->
		
		   Popup.Show(k);
		
		
		 MultipleInput.Init("business",DiscountCode.restaurants, true);
		 
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
	codecheck: function (b) {
		 
		
      $.post("lib/discountcode.php", "f=checkcode&data=" + b, function (e) {
		 
					 Main.check = e;
					 
						
						if(e=='ok'){
							$("#code_text_exist").show();
            				$("#code").addClass("error-text-field");
          					$("#code").removeClass("success-text-field");
							
							
						
						document.getElementById("code").focus()
						
						//DiscountCode.Main()
						
						}else{
							$("#code_text_exist").hide();
							$("#code").removeClass("error-text-field");
          					$("#code").addClass("success-text-field");
							return true
						}
					
					});
		
	if(Main.check == 'ok'){
			
			return false;
			//DiscountCode.Main()
		
		}			

	   
		/*else if(b.length>12)
		{
			  return false
		}
		 return true*/
		 //alert(b);
		
    },
	IsNumberKeyFour: function (b,c) {
      
	    var a = c.keyCode;
		
		
    	 if (a >= 48 && a <=57){
			
            return true;
        }
	   else if ((a < 65) || (a >90 && a < 97)){
			
            return false
        }
		
		else if(a > 122 )
		{
			  return false
		}
		
		/*else if(b.length>12)
		{
			  return false
		}*/
		
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
	var validdays = document.getElementById("validdays").value;
	var maxallow = document.getElementById("maxallow").value;
	var minshop = document.getElementById("minshop").value;
	
	
	

		if(document.getElementById("code").value == ""){
            $("#code_text").show();
            $("#validdays").addClass("error-text-field");
            $("#validdays").removeClass("success-text-field");
            count ++;
        }
		
    	if(document.getElementById("validdays").value == ""){
            $("#validdays_text").show();
            $("#validdays").addClass("error-text-field");
            $("#validdays").removeClass("success-text-field");
            count ++;
        }
		else if(validdays <= 0){
			$("#validdays_text").show();
            $("#validdays").addClass("error-text-field");
            $("#validdays").removeClass("success-text-field");
            count ++;
			}
		else{
        	$("#validdays_text").hide();
            $("#validdays").addClass("success-text-field");
            $("#validdays").removeClass("error-text-field");
        }
        
		
        if(document.getElementById("maxallow").value == ""){
            $("#maxallow_text").show();
            $("#maxallow").addClass("error-text-field");
            $("#maxallow").removeClass("success-text-field");
            count ++;
        }
		else if(maxallow <= 0){
            $("#maxallow_text").show();
            $("#maxallow").addClass("error-text-field");
            $("#maxallow").removeClass("success-text-field");
            count ++;
        }
		else{
        	$("#maxallow_text").hide();
            $("#maxallow").addClass("success-text-field");
            $("#maxallow").removeClass("error-text-field");
        }
        
        if(document.getElementById("minshop").value == ""){
            $("#minshop_text").show();
            $("#minshop").addClass("error-text-field");
            $("#minshop").removeClass("success-text-field");
            count ++;
        }
		else if(minshop <= 0){
            $("#minshop_text").show();
            $("#minshop").addClass("error-text-field");
            $("#minshop").removeClass("success-text-field");
            count ++;
        }
		else{
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
			/*$.post("lib/discountcode.php", "f=checkcode&data=" + JSON.stringify(Forms.Form.ad), function (e) {
					 Main.check = e;
					 Main.Loading();
						
						/*if(e=='ok'){
						alert("You have already use this code")
						return false;
						//DiscountCode.Main()
						
						
					
					});
		
		if(Main.check == 'ok'){
			alert("You have already use this code")
			
			document.getElementById("code").focus()
			return false;
			
		
		}			
*/
        if(count == 0)
        	return true
        else 
        	return false
        
      
    },
	
	
    Save: function () {
		
		if(DiscountCode.codecheck() == false){
		
		return	
		}
		if(DiscountCode.PreValidation() == false){
			return
		}
		if (Forms.Form.ad.type == "create") {
		if(Forms.Form.ad.fields.payby.value==2 && Forms.Form.ad.fields.commonrate.value!=""){

				var discount_price = Forms.Form.ad.fields.commonrate.value;
                var discount_price1 = parseInt(discount_price);
                var minimum_purchase = Forms.Form.ad.fields.minshop.value;
                var minimum_purchase1 = parseInt(minimum_purchase);
                if(discount_price1 > minimum_purchase1){
				alert("<?=$lang_resource['ADMIN_PAGE_DISCOUNT_PRICE'] ?>")
				return
			}
	
	}	
	}else{
		
		if(Forms.Form.ad.fields.commonratetype2.value!=""){

			if(Forms.Form.ad.fields.commonratetype2.value >= Forms.Form.ad.fields.minshop.value){
				alert("<?=$lang_resource['ADMIN_PAGE_DISCOUNT_PRICE'] ?>")
				return
			}
		}
		
	}
	

	

       /* if (Forms.CanSave("ad") == false) {
            return
        }*/
        /*Forms.PrepareForSaving("ad");
		
        if (a != null) {
            Forms.Form.ad.image = a
        }*/
		
      // Main.Request("ads", null, "f=SaveAd&data=" + JSON.stringify(Forms.Form.ad), "Discount.Main()");
	 /*alert(JSON.stringify(Forms.Form.ad));
	 return false;*/
	    
	//Main.Request("discountcode", null, "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.ad), "DiscountCode.Main()");
	    /*var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading(true);*/
		
	
					
		
	   $.post("lib/discountcode.php", "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.ad), function (s)
        {
			if(s == 'not'){
				alert("<?=$lang_resource['DISCOUNT_CODES_EXIST']?>");
				return;
			}
			DiscountCode.Main();
           
			 
		  });	
		 Popup.Close();
		 
		// DiscountCode.Main()
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
					$.post("lib/discountcode.php", "f=DeleteAd&data=" + JSON.stringify(a), function (e) {
						DiscountCode.Main()
						alert('<?=$lang_resource['DISCOUNT_CODES_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
		
		
       // Main.Request("discountcode", null, "f=DeleteAd&data=" + JSON.stringify(a), "DiscountCode.Main()")
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
			DiscountCode.PreValidation();
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
