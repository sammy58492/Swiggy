var Fromtype = 1;
var DiscountOffer = {
    Main: function () {
        Main.Loading();
		DiscountOffer.discounttextlang = Array();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/discountoffer.php", "f=FetchAllDiscountData", function (b) {
			
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
				//alert(b);
				 Main.Config.discount = new Object();
                 Main.Config.discount.List = new Object();
				 
                DiscountOffer.discount = JSON.parse(b);
				DiscountOffer.PrintMain()
				
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


        c+='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['BUSINESS_CANCEL'] ?></button></div>'

        c+='</div>'<!--col-md-5-->

        c+='</div>'<!--top-bar-->
        c+='</div>'<!--row-->


        c+='<div class="panel panel-danger panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'
        c+='<div class="row">'
        c+='<div class="col-md-4">'
        c+='<h3 class="panel-title-2"><?=$lang_resource['AUTOMATIC_DISCOUNT_HEADING'] ?></h3>'
        c+='</div>'<!--col-md-5-->

        c+='<div class="col-md-3">'
        c+='<div class="panel-btn filtr_margin">'
        c+='<input type="text" class="form-control rounded panel-red-field white-placeholder" id="search" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+= '</div>'
        c+='</div>'<!--col-md-3-->

        c+='<div class="col-md-5">'
        c+='<div class="panel-btn pull-right">'

        c+='<div class="inline-popups ">'

        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:DiscountOffer.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['AUTOMATIC_DISCOUNT_ADD'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:DiscountOffer.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['AUTOMATIC_DISCOUNT_EDIT'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="DiscountOffer.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['AUTOMATIC_DISCOUNT_DELETE'] ?></button></span>'

        c+='</div>'
        c+='</div>'
        c+='</div>'
        c+='</div>'<!--col-md-4-->

        c+='</div>'


        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+= '<tr>'
        c+='<th width="5%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['AUTOMATIC_DISCOUNT_ALL'] ?></th>'
        c+='<th width="15%" onclick="DiscountOffer.PupulateTable(\'id\')"><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_ID'] ?></th>'
        c+='<th width="20%"><?=$lang_resource['AUTOMATIC_DISCOUNT_NAME_OF_DISCOUNT'] ?></th>'
        c+='<th width="20%"><?=$lang_resource['AUTOMATIC_DISCOUNT_BUSINESS_NAME'] ?></th>'
        c+='<th width="12.5%"><?=$lang_resource['AUTOMATIC_DISCOUNT_START_DATE'] ?></th>'
        c+='<th width="12.5%"><?=$lang_resource['AUTOMATIC_DISCOUNT_END_DATE'] ?></th>'
        c+='<th width="15%"><?=$lang_resource['AUTOMATIC_DISCOUNT_ENABLE'] ?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="ads">'


        c+='</tbody>'
        c+='</table>'
        c+='</div>'<!--table-responsive-->

        c+='</div>' 
        c+='</div>'
		 
		 
		 
       // var b = new Array();
        var a = Visuals.CreateSearchBox();
       
		
		
        document.getElementById("main").innerHTML = c;
        document.getElementById("search").onkeyup = function () {
			
			
          DiscountOffer.PupulateTable(Main.Config.discount.List.SortBy, true)
        };
        
		
		DiscountOffer.PupulateTable(Main.Config.discount.List.SortBy, true)
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
        /*if (!c) {
            Main.SaveConfig()
        }*/
        var j = false;
        var g = "";
        var l = new Array();
		var sdate = ""; 
		var edate = "";
		
		//alert(this.Discount);
		//return 
		
        for (var e in this.discount) {
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.discount[e].id).indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].discounttext).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.discount[e].business).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.discount[e])
           }
            if (j) {
                var k;
                if (e % 2 == 0) {
                    k = " grey"
                } else {
                    k = ""
                }
				
			d +='<tr>'
            d +='<td><input type="checkbox" class="checkbox" value="' + this.discount[e].id + '"/></td>'
            d +='<td onclick="DiscountOffer.Edit(' + this.discount[e].id + ')" class="caption hand">' + this.discount[e].id +'</td>'
            d +='<td onclick="DiscountOffer.Edit(' + this.discount[e].id + ')" class="caption hand">'+ Main.NullToEmpty(this.discount[e].discounttext).toUpperCase() +'</td>'
            d +='<td onclick="DiscountOffer.Edit(' + this.discount[e].id + ')" class="caption hand">'+ Main.NullToEmpty(this.discount[e].business).toUpperCase() +'</td>'
			
			 if(Main.NullToEmpty(this.discount[e].startdate) == "")
			  {
				  sdate = "--";
			  }
			  else
			  {
				   sdate = this.discount[e].startdate;
			  }
			   if(Main.NullToEmpty(this.discount[e].enddate) == "")
			  {
				  edate = "--";
			  }
			  else
			  {
				   edate = this.discount[e].enddate;
			  }
			
            d +='<td class="caption">'+ sdate +'</td>'
            d +='<td class="caption">'+ edate +'</td>'
            d +='<td><div class="enabled"><span class="caption"><div id="switch_' + this.discount[e].id + '"></div></span></div></td>'
            d +='</tr>'
				
				}
           
        }
	
        document.getElementById("ads").innerHTML = d;
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
                DiscountOffer.SetEnabled(m.replace("switch_", ""), i)
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
		
        $.post("lib/discountoffer.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                //Switch.SwitchTo("switch_" + b, !a)
				DiscountOffer.Main();
				
            }
        })
    },
    New: function () {
		 $('div[id*=newpopup]').remove();
       var a = this;
	   var i=0;
		$.post("lib/discountoffer.php", "f=FetchAllRestData", function (b) {
			
			
			var totalrec = JSON.parse(b);
			 var d = new Array();
				d.push(JSON.parse('{"id":"-1","caption":""}'));
				for (var c in totalrec) {
					var e = new Object();
					e.id = totalrec[c].id;
					e.caption = totalrec[c].caption ;
					d.push(e)
				}
		
		DiscountOffer.restaurants = d;
			//alert(JSON.stringify(d))
			//return false
			
			})
        Main.GetFranchisesData("DiscountOffer.Form()")
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
            	alert("<?=$lang_resource['AUTOMATIC_DISCOUNT_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['AUTOMATIC_DISCOUNT_SELECT_EDIT']?>");
                return
            }
			
			
			
        } if (d) {
            Main.Loading();
		
			var gk = new Date().getTime();
			Main.Aid = gk;
           // Main.BulkRequest('data=[{"operation":"FetchAllFranchisesData"},{"operation":"FetchDiscountData","id":"' + a + '"}]', "DiscountOffer.PreEdit")
		  
		     $.post("lib/discountoffer.php", "f=FetchDiscountData&id=" + a, function (b) {
				 
				
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				DiscountOffer.PreEdit(b);
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
		   /*if(a.discountype==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(a.discountype==2)
			{
			   document.getElementById("idprice").style.display="";
			}*/
    },
    Form: function (e) {
       
        var k = "";
		
		 MultipleInput.AddListener("tagschange", "DiscountOffer.MultiInputTagsChange");
		 
        
        Forms.Clean("off", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.off.type = "create"
			Fromtype = 1;
			
        } else {
            Forms.Form.off.type = "modify";
            Forms.Form.off.id = e.id
			Fromtype =2;
        }
		 Forms.Form.off.ad = e;
         this.ActiveForm = "off";
        
		
        if (Forms.Form.off.type == "create") {
            k += '<h3 class="popup-heading"><?=$lang_resource['AUTOMATIC_DISCOUNT_CREATE_SPECIFIC_DISCOUNT'] ?></h3>'
        } else {
            k += '<h3 class="popup-heading"><?=$lang_resource['AUTOMATIC_DISCOUNT_EDIT_SPECIFIC_DISCOUNT'] ?></h3>'
        }
		
			k +='<div class="row">'
			k +='<ul class="pop_lang_img">'
			flaginfo=Main.languageinfo;
			for(Z in flaginfo){
			var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
				DiscountOffer.langdefault = flaginfo[Z].admindefaulelang;                             
				k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="DiscountOffer.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
			}else{
				k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="DiscountOffer.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
			}
			}
			k +='</ul>'
			k +='</div>'
       		<!--row-->
			Forms.CreateValue("off", "discounttext", "",true)
            k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
			k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_TEXT'] ?></label>'
			
			flaginfo=Main.languageinfo;
       	 for(p in flaginfo){
            if (Forms.Form.off.type == "create") {
                if(flaginfo[p].id == DiscountOffer.langdefault){   
                    k +='<input type="text" id="discounttext_'+flaginfo[p].id+'" class="form-control"  value="" onkeyup="DiscountOffer.PreValidation()" />' 
                }else{
                    k +='<input type="text" id="discounttext_'+flaginfo[p].id+'" class="form-control" onkeyup="DiscountOffer.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == DiscountOffer.langdefault){   
                    k +='<input type="text" id="discounttext_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.discounttext[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="discounttext_'+flaginfo[p].id+'" class="form-control"  value="'+Main.NullToEmpty(e.discounttext[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
			
			
			
            
            //k +=Forms.CreateInputPropertyPopup("off", "discounttext", Main.NullToEmpty(e.discounttext), true, "DiscountOffer.PreValidation()", false, false,"")
			
			k +='<small data-bv-validator="notEmpty" class="help-block" id="discount_text" style="color:#F00;display:none;"><?=$lang_resource['AUTOMATIC_DISCOUNT_VALIDATION_DISCOUNT_TEXT']?></small>'
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row-->
             
			var g = "";
            var b;
		
            if (Forms.Form.off.type == "modify") {
			
			/*if(e.payby==1) { 
              document.getElementById("idpercent").style.display="";
			}
			else if(e.payby==2)
			{
			   document.getElementById("idprice").style.display="";
			}*/
			 b = "";
            } else {
            b = '{"id":"-1","caption":""},'
            }
            g = "[" + b + '{"id":"1","caption":"<?=$lang_resource['DISCOUNT_CODES_PERCENTAGE'] ?>"},{"id":"2","caption":"<?=$lang_resource['DISCOUNT_CODES_PRICE'] ?>"}]';
            g = JSON.parse(g);
			 
			 
			 
			   
            k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
            k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_TYPE'] ?></label>'			
            k += Forms.CreateSelectPropertyPopup("off", "discountype", g, e.discountype, true, "DiscountOffer.TypeChanged(this.value)", true) 
			k +='<small data-bv-validator="notEmpty" class="help-block" id="discountype_text" style="color:#F00;display:none;"><?=$lang_resource['AUTOMATIC_DISCOUNT_VALIDATION_DISCOUNT_TYPE']?></small>'
            
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row-->
				   
            
            k +='<div id="mm">'
			if(e.discountype){
			k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
			if(e.discountype==1){
            k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_PERCENTAGE'] ?></label>'
			}else{
			k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_PRICE'] ?></label>'	
			}
            k +=Forms.CreateInputPropertyPopup("off", "commonrate", Main.NullToEmpty(e.rate), false, "DiscountOffer.PreValidation()", false, false, "Main.IsNumberKey(event)")
			k +='<small data-bv-validator="notEmpty" class="help-block" id="commonrate_text" style="color:#F00;display:none;"><?=$lang_resource['AUTOMATIC_DISCOUNT_VALIDATION_DISCOUNT_PERCENTAGE']?></small>'
            k +='</div>'
            k +='</div>'<!--col-md-12-->
			k +='</div>'
			}
            k +='</div>'<!--row-->
	
			k +='<div id="type_change">'
			k +='</div>'
			
			
            k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
            k += '<label><?=$lang_resource['AUTOMATIC_DISCOUNT_VALID_UPTO'] ?></label>'
            k +=Forms.CreateInputPropertyPopup("off", "validdays", Main.NullToEmpty(e.validdays), true, "DiscountOffer.PreValidation()", false, false, "return Main.IsNumberKey(event)")
			 k +='<small data-bv-validator="notEmpty" class="help-block" id="validdays_text" style="color:#F00;display:none;"><?=$lang_resource['AUTOMATIC_DISCOUNT_VALIDATION_VALID_UPTO']?></small>'
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row-->
            k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
            k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_MINIMUM_PURCHASE'] ?></label>'
            k +=Forms.CreateInputPropertyPopup("off", "minshop", Main.NullToEmpty(e.minshop), false, "DiscountOffer.PreValidation()", false, false, "return Main.IsNumberKey(event)")
			k +='<small data-bv-validator="notEmpty" class="help-block" id="minshop_text" style="color:#F00;display:none;"><?=$lang_resource['AUTOMATIC_DISCOUNT_VALIDATION_MINIMUM_PURCHASE']?></small>'
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row-->
			
			 if (Forms.Form.off.type == "create") {
			
            k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
            k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_BUSINESS'] ?></label>'
            Forms.CreateValue("off", "offerbusiness", '');
			k +='<input type="text" id="offerbusiness" />'
			k +='<small data-bv-validator="notEmpty" class="help-block" id="offerbusiness_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_IS_REQUIRED'] ?></small>'
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row-->
			 }
			 else
			 {
			 k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
            k +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_BUSINESS'] ?></label>'
            
			k += '<span class="caption" style="font-size:13px; font-weight:bold;padding-left:20px;">'+e.bname+'</span>';
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row-->
			 }
			
			
            k +='<div class="row">'
            k +='<div class="col-md-6 col-md-offset-3">'
			
			if (Forms.Form.off.type == "create") {
            k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DiscountOffer.Save()"><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_CREATE'] ?></button></center>'
			}
			else
			{
			 k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DiscountOffer.Save()"><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_UPDATE']?></button></center>'	
			}
            k +='</div>'<!--col-md--->
            k +='</div>'<!--row--> 
		    
			 Popup.Show(k);
			
			
		   
		
		
		 if (Forms.Form.off.type == "create") {
		$.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {
			
			
			//DiscountOffer.restaurants = ;
			 MultipleInput.Init("offerbusiness",JSON.parse(b), true); ///NASIM EDITED
			//return false
			
			
			})
			
			 if (Forms.Form.off.type == "modify") {
				if (Forms.Form.ad.ad.business != "") {
					var d = JSON.parse(Forms.Form.ad.ad.business);
					for (var e in d) {
						MultipleInput.AddTagById("business", d[e])
					}
					Forms.Form.ad.fields.business.save = false
				}
		   }
			//alert(JSON.stringify(DiscountOffer.restaurants));
		
		 }
      
	   
	   $("#name").focus()
    },
	
	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("discounttext_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("discounttext_"+id).style.display  = "block";
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
		if(document.getElementById("discountype").value == "-1"){
            $("#discountype_text").show();
            $("#discountype").addClass("error-text-field");
            $("#discountype").removeClass("success-text-field");
            count ++;
        }else{
        	$("#discountype_text").hide();
            $("#discountype").addClass("success-text-field");
            $("#discountype").removeClass("error-text-field");
        }
		
		
        if(a == 1 || a == 2)
		{
			document.getElementById("mm").style.display="none";
			var k ="";
			
			k +='<div class="row">'
            k +='<div class="col-md-12">'
            k +='<div class="form-group">'
			if(a==1){
            k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_PERCENTAGE'] ?></label>'
			}else{
			k +='<label><?=$lang_resource['AUTOMATIC_DISCOUNT_DISCOUNT_PRICE'] ?></label>'	
			}
            k +=Forms.CreateInputPropertyPopup("off", "commonrate",Main.NullToEmpty(e.rate), true, "DiscountOffer.PreValidation()", false, false, "return Main.IsNumberKey(event)")
			k +='<small data-bv-validator="notEmpty" class="help-block" id="commonrate_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PRICE_OR_PERCENTAGE'] ?></small>'
            k +='</div>'
            k +='</div>'<!--col-md-12-->
            k +='</div>'<!--row--> 
			document.getElementById("mm").style.display="none";
		}
		
		$("#type_change").empty().append(k);
		
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
	var minshop = document.getElementById("minshop").value;
		
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == DiscountOffer.langdefault){                  
                if(document.getElementById("discounttext_"+flaginfo[Z].id).value == ""){            
                    $("#discount_text").show();
                    $("#discounttext_"+flaginfo[Z].id).addClass("error-text-field");
                    $("#discounttext_"+flaginfo[Z].id).removeClass("success-text-field");
                    count ++;
                }else{
                    $("#discount_text").hide();
                    $("#discounttext_"+flaginfo[Z].id).addClass("success-text-field");
                    $("#discounttext_"+flaginfo[Z].id).removeClass("error-text-field");
                }       
            }
			
			var discountofferdata = document.getElementById("discounttext_"+flaginfo[Z].id).value;
            DiscountOffer.discounttextlang[flaginfo[Z].id] = discountofferdata;
		}
        
        if(document.getElementById("discountype").value == "-1"){
			//alert(1);
            $("#discountype_text").show();
            $("#discountype").addClass("error-text-field");
            $("#discountype").removeClass("success-text-field");
            count ++;
        }else{
        	$("#discountype_text").hide();
            $("#discountype").addClass("success-text-field");
            $("#discountype").removeClass("error-text-field");
        }
		
		
		
		if(Fromtype == 1) {	 
			if(document.getElementById("discountype").value == 1 || document.getElementById("discountype").value == 2){	
			if(document.getElementById("commonrate").value == ""){
				$("#commonrate_text").show();
				$("#commonrate").addClass("error-text-field");
				$("#commonrate").removeClass("success-text-field");
				count ++;
			}else{
				$("#commonrate_text").hide();
				$("#commonrate").addClass("success-text-field");
				$("#commonrate").removeClass("error-text-field");
			}
			}

		}
		
		
		if(document.getElementById("validdays").value == ""){
			//alert(1);
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
		
		if(document.getElementById("minshop").value == ""){
			//alert(1);
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
		
		if (Forms.Form.off.type == "create") {
		var e = MultipleInput.GetTagsIds('offerbusiness');
        if (e.length > 0) {
            $("#offerbusiness_text").hide();
            $("#offerbusinesscontainer").addClass("success-text-field");
            $("#offerbusinesscontainer").removeClass("error-text-field");
        }else{
            $("#offerbusiness_text").show();
            $("#offerbusinesscontainer").addClass("error-text-field");
            $("#offerbusinesscontainer").removeClass("success-text-field");
            count ++;
        }
		}
		
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
	
	
    Save: function () {
		if(DiscountOffer.PreValidation() == false){
        return
        }
		
		
		
		Forms.UpdateValue("off", "discounttext", DiscountOffer.discounttextlang,true);
		
		for(var s in Forms.Form.off.fields){			
			Forms.Form.off.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.off.fields[s].value)))
			Forms.Form.off.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.off.fields[s].ivalue)))
			
			Forms.Form.off.fields[s].value = Forms.Form.off.fields[s].value.split("+").join("@@");
			Forms.Form.off.fields[s].ivalue = Forms.Form.off.fields[s].ivalue.split("+").join("@@");
		} 
		
		for(var k in Forms.Form.off.ad){			
			Forms.Form.off.ad[k] = window.btoa(unescape(encodeURIComponent(Forms.Form.off.ad[k])))
			
			Forms.Form.off.ad[k] = Forms.Form.off.ad[k].split("+").join("@@");
			
		}
		//Forms.Form.off.ad = window.btoa(escape(Forms.Form.off.ad));
	
	    Main.Request("discountoffer", null, "f=SaveDiscount&data=" + JSON.stringify(Forms.Form.off), "DiscountOffer.Main()");
	   
		Popup.Close();
		//DiscountOffer.Main()
			
        //Uploader.Clean();
        Forms.Clean("off")
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
			DiscountOffer.PreValidation();
            break
        }
        /*if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }*/
    },
	
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("<?=$lang_resource['AUTOMATIC_DISCOUNT_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		/*alert(JSON.stringify(a));
		return false;*/
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['AUTOMATIC_DISCOUNT_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/discountoffer.php", "f=DeleteAd&data=" + JSON.stringify(a), function (e) {
						DiscountOffer.Main()
						alert('<?=$lang_resource['AUTOMATIC_DISCOUNT_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
		
		
		
        //Main.Request("discountoffer", null, "f=DeleteAd&data=" + JSON.stringify(a), "DiscountOffer.Main()")
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