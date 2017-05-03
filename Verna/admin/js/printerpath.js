var Printerpath = {
    Main: function () {
		
		
		Main.Loading();
		//Printerpath.galleryflag = false;
        var a = new Date().getTime();
		
        Main.Aid = a;
		
		  $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllPrinterData"}]', function (b) {
      
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
           
		  
			if (b != "") {
				
				 Main.Config.printerpath = new Object();
                 Main.Config.printerpath.List = new Object();
				 
				 b = JSON.parse(b);
				 Printerpath.AllList = b.printerdata;
				
				Printerpath.PrintMain()
				
            } else {
                alert("Error")
            }
			
			
			
        })
		  
  
	},
	
	PrintMain: function () {

	//	a = JSON.parse(a);
       // var b = "";
        var c = "";
		
		
		
		c+='<div class="row">'
        c+='<div class="top-bar">'
                        
        c+='<div class=" col-md-6 col-md-offset-6">'
                       
        c+='<div class=" pull-right">' 
                                    
                                   
        c+='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource['ADMIN_PAGE_SITESECTION_CANCEL'] ?></button></div>'
                    
        c+='</div>'<!--col-md-5-->
                                                            
        c+='</div>'<!--top-bar-->
        c+='</div>'<!--row-->
		
		
		c+='<div class="panel panel-danger panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'                    
        c+='<div class="row">'
        c+='<div class="col-md-4">'
        c+='<h3 class="panel-title-2"><?= $lang_resource['ADMIN_PANEL_MENU_PRINTER_PATH_SETTING'] ?></h3>'
        c+='</div>'<!--col-md-6-->
        c+='<div class="col-md-3">'
        c+='<div class="panel-btn filtr_margin">'
        c+='<input type="text" class="form-control rounded panel-red-field white-placeholder" id="search" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
        c+='</div>'
        c+='</div>'<!--col-md-3-->
        c+='<div class="col-md-5">'
		c+='<div class="panel-btn pull-right">'
        c+='<div class="inline-popups ">'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Printerpath.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?= $lang_resource['BUSINESS_ADD'] ?></a>'
        c+='</span>'
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Printerpath.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?= $lang_resource['BUSINESS_EDIT'] ?></a>'
        c+='</span>' 
        c+='<span class=" panel-btn-2">'
        c+='<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Printerpath.Delete()"><i class="fa icon-remove2"></i> <?= $lang_resource['BUSINESS_DELETE'] ?></button></span>'                      
        c+='</div>'<!--inline-popups-->
							
        
        c+='</div>'
        c+='</div>'<!--col-md-4-->
                            
        c+='</div>'<!--row-->

        c+='</div>'
        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
        c+='<th width="10%" onclick="Printerpath.PupulateTable(\'id\')"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_ID']?></th>'
		c+='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['ADVERTISEMENT_POPULATE_HEADING_ALL']?></th>'
        c+='<th width="20%"><?= $lang_resource['ADMIN_PANEL_MENU_PRINTER_PATH'] ?></th>'
		c+='<th width="20%"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_BUSINESS'] ?></th>'
        c+='</tr>'
        c+='</thead>'
        c+='<tbody id="printerpath_code">'
        										
        c+='</tbody>'
        c+='</table>'
        c+='</div>'<!--table-responsive-->

        c+='</div>'<!-- /.panel-body -->
        c+='</div>'
		
		
               
        document.getElementById("main").innerHTML = c;
        $("#ga").focus()
		
		//Printerpath.PupulateTable("id", true)
		
		document.getElementById("search").onkeyup = function () {
         Printerpath.PupulateTable(Main.Config.printerpath.List.SortBy, true)
        };
		
		
		Printerpath.PupulateTable(Main.Config.printerpath.List.SortBy, true)
		//Printerpath.PupulateTable(true, true)
		
    },
	 PupulateTable: function (a, c) {
      
        var d = "";
		
		this.printerpath = Printerpath.AllList;
    	
        if (c) {
            this.printerpath.sort(Main.SortByProperty(a));
            if (Main.Config.printerpath.List.SortByStatus == "max") {
                this.printerpath.reverse()
            }
        } else {
            if (Main.Config.printerpath.List.SortBy != a) {
                this.printerpath.sort(Main.SortByProperty(a));
                Main.Config.printerpath.List.SortByStatus = "min"
            } else {
                this.printerpath.reverse();
                if (Main.Config.printerpath.List.SortByStatus == "min") {
                    Main.Config.printerpath.List.SortByStatus = "max"
                } else {
                    Main.Config.printerpath.List.SortByStatus = "min"
                }
            }
        }
       
      
		
        var j = false;
        var g = "";
        var l = new Array();
		
		var cnt = 1;
		
        for (var e in Printerpath.AllList) {
				
            j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (Main.NullToEmpty(Printerpath.AllList[e].pathtxt).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(Printerpath.AllList[e].printer_restaurantlist).toLowerCase().indexOf(g) >= 0) {
			  j = true;
                l.push(Printerpath.AllList[e])
           }
            if (j) {
           
				
				 d+='<tr>'
       			 d+='<td>'+ cnt +'</td>'
		         d+='<td><input type="checkbox" class="checkbox" value="' + Printerpath.AllList[e].id + '"></td>'
                 d+='<td class="hand" onClick="Printerpath.Edit(' + Printerpath.AllList[e].id + ')">' + Main.NullToEmpty(Printerpath.AllList[e].pathtxt) + '</td>'
		         d+='<td class="hand" onClick="Printerpath.Edit(' + Printerpath.AllList[e].id + ')">' + Main.NullToEmpty(Printerpath.AllList[e].printer_restaurantlist) + '</td>'
				 
				
				 
                 d+='</tr>'
				 
			}
				
				cnt++;
           
        }
	
        document.getElementById("printerpath_code").innerHTML = d;
        
       
    },
	
	SetDefault: function(val){	
    	$.post("lib/panel-configs.php", "f=SetDefault&id="+ val, function(h){
    	
    	})		
	},
	
	
	SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/panel-configs.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
	
	
	New: function () {   
        var a = this;
       /* $.post("lib/panel-configs.php", "f=GetPrinterPathConfig", function (b) {
            Printerpath.restaurants = JSON.parse(b);
        });
        Main.GetFranchisesData("Printerpath.Form()")*/
		$.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessPrinterPath"},{"operation":"FetchAllBusinessPrinterPathOnly"}]', function (b) {
           /* if (a != Main.Aid) {
                return
            }*/
			
            Main.Ready();
            if (b != "") {
                b = JSON.parse(b);
                 
        Printerpath.PrinterRestaurant = b.businessprinterpath; 
        Printerpath.PrinterRestaurantID = b.businessprinterpathonly;
                
			Printerpath.Form();
            } else {
                alert("Error")
            }
        })
		
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
         
		     $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessPrinterPathEdit","id":"' + a + '"},{"operation":"FetchAllBusinessPrinterPathOnly"},{"operation":"FetchPrinterData","id":"' + a + '"}]', function (b) {
    
      
      if(b!="") {
            Main.Ready();
	 
	         b = JSON.parse(b);
                 
        Printerpath.PrinterRestaurant = b.businessprinterpath; 
        Printerpath.PrinterRestaurantID = b.businessprinterpathonly;
	 
	         Printerpath.PreEdit(b);  
        }
	
	
		});
        }
		
		/*Main.Loading();
		
		$.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllBusinessPrinterPath","id":"' + a + '"},{"operation":"FetchAllBusinessPrinterPathOnly"},{"operation":"FetchPrinterData","id":"' + a + '"}]', function (b) {
    
      
      if(b!="") {
            Main.Ready();
	 
	         b = JSON.parse(b);
                 
        Printerpath.PrinterRestaurant = b.businessprinterpath; 
        Printerpath.PrinterRestaurantID = b.businessprinterpathonly;
	 
	         Printerpath.PreEdit(b);  
        }
	
	
		});*/
		
		
    },
	
	PreEdit: function (a) {
	
		
        if (a == "") {
            alert("Error")
        }
        a = a.printerdata;
	
		
        this.Form(a);
		   
    },
	
	
	Form: function (e) {	
	
	
	 MultipleInput.AddListener("tagschange", "Printerpath.MultiInputTagsChange");
		
        Forms.Clean("printerpath", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.printerpath.type = "create"
        } else {
            Forms.Form.printerpath.type = "modify";
            Forms.Form.printerpath.id = e.id
        }
		// Forms.Form.lang.lang = e;
        this.ActiveForm = "printerpath";
		
         var k = "";
       if (Forms.Form.printerpath.type == "create") {
	    
        k += '<h3 class="popup-heading"><?= $lang_resource['ADMIN_PANEL_MENU_PRINTER_PATH_SETTING_CREATE'] ?></h3>'
	   }
	   else
	   {
		k += '<h3 class="popup-heading"><?= $lang_resource['ADMIN_PANEL_MENU_PRINTER_PATH_SETTING_UPDATE'] ?></h3>'   
	   }
	   
        k += '<div class="flage_wrapper">'
        
		 k+='<div class="row">'
           k+='<div class="col-md-12">'
           k+='<div class="form-group">'
           k+='<label><?=$lang_resource["DISCOUNT_CODES_BUSINESS"] ?></label>'
           Forms.CreateValue("printerpath", "printer_restaurant",Main.NullToEmpty(e.printer_restaurant));
		  k+='<input type="text" id="printer_restaurant"/>'
		   k +='<small data-bv-validator="notEmpty" class="help-block" id="business_text" style="color:#F00;display:none;"><?=$lang_resource["ADMIN_PAGE_BUSINESS_IS_REQUIRED"] ?></small>'
           k+='</div>'
           k+='</div>'<!--col-md-12-->
           k+='</div>'<!--row-->
		
		
		if( Forms.Form.printerpath.type == "modify") {
			
			
          var K = new Array();
         
          K.push({
            id: "",
            caption: ""
        });
         
         for (E in Printerpath.PrinterRestaurantID) {
         
            K.push({
                id: Printerpath.PrinterRestaurantID[E].id,
                caption: Printerpath.PrinterRestaurantID[E].path
            })
        }
      
         
         }
         else
         {
           var K = new Array();
         
          K.push({
            id: "",
            caption: ""
        });
         
         for (E in Printerpath.PrinterRestaurantID) {
            K.push({
                id: Printerpath.PrinterRestaurantID[E].id,
                caption: Printerpath.PrinterRestaurantID[E].path
            })
        }
         
         
         }
		
		
		k += '<div class="row">'
        k += '<div class="col-md-12">'
        k += '<div class="form-group">'
        k += '<label><?= $lang_resource['ADMIN_PANEL_MENU_PRINTER_PATH'] ?> *</label>'
       k +=Forms.CreateSelectPropertyPopup("printerpath", "path", K, Main.NullToEmpty(e.path), true, "Printerpath.TypeChanged(this.value);Printerpath.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="path_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SUPERADMIN_PRINTER_PATH_VALIDATION']?></small>'
        k += '</div>'
        k += '</div>'<!--col-md-12-->
        k += '</div>'<!--row-->
		
		
 
        k += '<div class="row">'
        k += '<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.printerpath.type == "create") {
        k +=  '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Printerpath.Save()">Create</button></center>'
		}
		else
		{
		k +=  '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Printerpath.Save()">Update</button></center>'	
		}
		
        k += '</div>'<!--col-md--->
        k += '</div>'<!--row-->
            
		 
		Popup.Show(k);
		
			
		/* MultipleInput.Init("printer_restaurant",Printerpath.PrinterRestaurant, true);
		 
		  if (Forms.Form.printerpath.type == "modify") {
				if (Forms.Form.printerpath.printerpath.business != "") {
					var d = JSON.parse(Forms.Form.printerpath.printerpath.business);
					for (var e in d) {
						MultipleInput.AddTagById("printer_restaurant", d[e])
					}
					Forms.Form.ad.fields.business.save = false
				}
		   }*/
		 
		 
	
          MultipleInput.Init("printer_restaurant", Printerpath.PrinterRestaurant, true); 
        
         
        if (Forms.Form.printerpath.type == "modify") {
      
   
				if (Forms.Form.printerpath.fields.printer_restaurant.value != "") {
					var d = JSON.parse(e.printer_restaurant);
					for (var t in d) {
                        console.log("d="+d[t])     
						MultipleInput.AddTagById("printer_restaurant", d[t])
					}
					Forms.Form.printerpath.fields.printer_restaurant.save = false
				}
		   }
        
		
		
	  $("#name").focus()
    },
	
	 TypeChanged: function (a) {
	
		if(document.getElementById("path").value == ""){
            $("#path_text").show();
            $("#path").addClass("error-text-field");
            $("#path").removeClass("success-text-field");
            count ++;
        }else{
        	$("#path_text").hide();
            $("#path").addClass("success-text-field");
            $("#path").removeClass("error-text-field");
        }
		
	 },
	
	
	PreValidation: function(){
   	var count = 0;	
    
    	var e = MultipleInput.GetTagsIds('printer_restaurant');
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
		
		if(document.getElementById("path").value == ""){
            $("#path_text").show();
            $("#path").addClass("error-text-field");
            $("#path").removeClass("success-text-field");
            count ++;
        }else{
        	$("#path_text").hide();
            $("#path").addClass("success-text-field");
            $("#path").removeClass("error-text-field");
        }
        
		
		
		
		if(count == 0)
        	return true
        else 
        	return false
        
       
    },
	
	
	
	
	
	Save: function () {
	
	 if(Printerpath.PreValidation() == false){
			return
		}
	
		
	    var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();
		
		
		
	   $.post("lib/printerpath.php", "f=SavePrinterPath&data=" + JSON.stringify(Forms.Form.printerpath), function (f)
        {
		
            Main.Ready();
            if (b != Main.Aid)
            {
                return;
            }
			
		  Popup.Close();
		  Printerpath.Main()
		  });	
		
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
					$.post("lib/printerpath.php", "f=DeletePrinterPath&data=" + JSON.stringify(a), function (e) {
						Printerpath.Main()
						alert('<?=$lang_resource['DISCOUNT_CODES_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
		
		
       // Main.Request("discountcode", null, "f=DeleteAd&data=" + JSON.stringify(a), "DiscountCode.Main()")
    },
	
	triggerImageupload: function(no) {
		
		 $("#uform_bimg"+no).submit(function (event) {
			 
			 event.preventDefault();
		
		var formData = new FormData($(this)[0]);
 $.ajax({
            url: 'upload-image.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (html) {
              
			  document.getElementById("showImage"+no).value = html
			   
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
 		});
		 },
		 
	PreviewImage: function(no) {
		 
		 document.getElementById("uploadPreview"+no).src ="";
		
		$('form#uform_bimg'+no).find('input[type="submit"]').trigger('click');
		 
           var oFReader = new FileReader();
		
           oFReader.readAsDataURL(document.getElementById("uploadImage"+no).files[0]);
           oFReader.onload = function (oFREvent) {
			 //  alert(oFREvent.target.result)
			   
            document.getElementById("uploadPreview"+no).src = oFREvent.target.result;
		    document.getElementById("imagefile"+no).value = document.getElementById("uploadImage"+no).files[0].name;
			Printerpath.galleryflag = true;
			Printerpath.PreValidation()
			
        };
		
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
			Printerpath.PreValidation();
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
           // Forms.EnableSubmitButton(true)
        } else {
            //Forms.EnableSubmitButton(false)
        }
    }	
	
	
};
	
