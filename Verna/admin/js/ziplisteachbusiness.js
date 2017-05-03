var IS_PAYPAL_ENABLED = 1;

var ZipCode = {
    Main: function () {
		
        Main.Loading();

     var a = new Date().getTime();
        	Main.Aid = a;
		Main.businessid =Business.id;
		
		
			$.post("lib/zipseach.php", "f=Fetchdeliverycity", function (b) {		
			ZipCode.delicity = JSON.parse(b);			
		})

			$.post("lib/zipseach.php", "f=Fetchbusinessname&bid="+Business.id, function (s) {
			  console.log(s);
			  ZipCode.businessname = new Object();
			  ZipCode.businessname= s;
			  ZipCode.businessid= Business.id;

				$.post("lib/zipseach.php", "f=FetchAllOrdersData&bid="+Business.id, function (c) {

					if (a != Main.Aid) {
                return
            	}
					Main.Ready();
					if (c != "") {
						ZipCode.Orders = JSON.parse(c);
					   /* for (var b in ZipCode.Orders) {
						  //  ZipCode.Orders[b].cname = ZipCode.Orders[b].city.name
						}*/
					
						ZipCode.PrintMain(Business.id);
						
					} else {
						alert("Error")
					}
				})
		 	});
			
      
		
		  	
    },
    PrintMain: function (k) {
       
        var d ="";
		
		d +='<div class="panel panel-success panel-no-border">'
		d +='<div class="panel-heading panel-heading-2">'
		d +='<div class="row">'
		d +='<div class="col-md-3">'
		d +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_HEADING']?></h3>'
		d +='</div>'
		<!--col-md-4-->
		d +='<div class="col-md-3">'
		d +='<div class="panel-btn filtr_margin">'
		d +='<input type="text" id="zipsearch" class="form-control rounded panel-green-field white-placeholder" placeholder="Filter">'
		d +='</div>'
		d +='</div>'
		<!--col-md-4-->
		
		d +='<div class="col-md-6">'
		d +='<div class="panel-btn pull-right">'
		d +='<div class="inline-popups ">'
		d +='<span class=" panel-btn-2">'
		d +='<a class="btn btn-default btn-rounded-lg panel-green-btn panel-green-btn-2" href="javascript:ZipCode.ZipcodeForm()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_ADD']?></a>'
		d +='</span>'
		d +='<span class=" panel-btn-2">'
		d +='<a class="btn btn-default btn-rounded-lg panel-green-btn panel-green-btn-2" href="javascript:void(0)" onclick="ZipCode.ZipcodeEdit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_EDIT']?></a>'
		d +='</span>'
		d +='<span class=" panel-btn-2">'
		d +='<button class="btn btn-default btn-rounded-lg panel-green-btn panel-green-btn-2" href="javascript:void(0)" onclick="ZipCode.ZipcodeDelete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELETE']?></button>'
		d +='</span>'
		d +='<span class=" panel-btn-2">'
		d +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:ZipCode.UploadCSV()" data-effect="mfp-zoom-in"><i class="fa icon-upload"></i> Upload CSV</a>'
		d +='</span>'
		d +='</div>'
		
		d +='</div>'
		d +='</div>'
		<!--col-md-4-->
		d +='</div>'
		<!--row-->
		d +='</div>'
		
		d +='<div class="panel-body">'
		d +='<div class="table-responsive">'
		d +='<table class="table table-th-block table-striped">'
		d +='<thead>'
		d +='<tr>'
		d +='<th width="10%" onclick="ZipCode.PupulateTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_SL']?></th>'
		d +='<th width="20%" onclick="Main.ToogleAllCheckBoxes(\'deliveryzip\')"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_ALL']?></th>'
		d +='<th width="30%" onclick="ZipCode.PupulateTable(\'cname\')" ><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_ZIPCODE']?></th>'
		d +='<th width="20%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_PRICE']?></th>'
		d +='<th width="20%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_ENABLE']?></th>'
		d +='</tr>'
		d +='</thead>'
		d +='<tbody id="orders">'
		
		d +='</tbody>'
		d +='</table>'
		d +='</div>'
		<!--table-responsive-->
		d +='</div>'
		<!-- /.panel-body -->
		d +='</div>'
		
		
		$("#tab_delivery_3").empty().append(d);
		if(ZipCode.delicity == 1){
	   	DeliveryCity.Main();
		}
	   
      
        document.getElementById("zipsearch").onkeyup = function () {
            ZipCode.PupulateTable(Main.Config.Orders.List.SortBy, true)
        };
        ZipCode.PupulateTable(Main.Config.Orders.List.SortBy, true)
    },
    PupulateTable: function (a, d) {
		
        var e = "";
		
        if (d) {
            this.Orders.sort(Main.SortByProperty(a));
            if (Main.Config.Orders.List.SortByStatus == "max") {
                this.Orders.reverse()
            }
        } else {
            if (Main.Config.Orders.List.SortBy != a) {
                this.Orders.sort(Main.SortByProperty(a));
                Main.Config.Orders.List.SortByStatus = "min"
            } else {
                this.Orders.reverse();
                if (Main.Config.Orders.List.SortByStatus == "min") {
                    Main.Config.Orders.List.SortByStatus = "max"
                } else {
                    Main.Config.Orders.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Orders.List.SortBy = a;
        if (!d) {
            Main.SaveConfig()
        }
		 var l = new Array();
        var j = false;
        var g = "";
		 for (var f in this.Orders) {
           j = false;
            g = document.getElementById("zipsearch").value.toLowerCase();
            if (String(this.Orders[f].id).toLowerCase().indexOf(g) >= 0 || Main.NullToEmpty(this.Orders[f].zipcode).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(this.Orders[f])
            }
           
            if (j) {
				
				 e += '<tr>'
				 e += '<td>'+this.Orders[f].id + '</td>'
				 e += '<td><input type="checkbox" class="deliveryzip" value="' + this.Orders[f].id + '"></td>'
				 e += '<td class="hand" onclick="ZipCode.ZipcodeEdit(' + this.Orders[f].id + ')">'+ Main.NullToEmpty(this.Orders[f].zipcode) +'</td>'
				 e += '<td>' +this.Orders[f].currency+ + Main.NullToEmpty(parseFloat(this.Orders[f].cost).toFixed(IS_DECIMAL_POINT)) +'</td>'
				 e += '<td><div class="enebal" id="switch_' + this.Orders[f].id + '"></div></td>'
				 e += '</tr>'

            }
		
		}
        
        document.getElementById("orders").innerHTML = e
		
		  var h = false;
     /*Switch.Init();*/
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                ZipCode.SetEnabled(m.replace("switch_", ""), i,"deliveryzip")
            })
		}
    },
	 SetEnabled: function (b, a) {
		//alert(Main.businessid);
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/zipseach.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
        })
    },
	
	UploadCSV: function () {
		
	  $('div[id*=newpopup]').remove();	
		
	  var c = "";
	  
	  c +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_ZIPCODE_UPLOAD_HEADING']?></h3>'
	  c +='<form name="zipcode" id="csvzipcode" method="post" action="javascript:ZipCode.CsvUpload()" enctype="multipart/form-data" >'
	  c +='<div class="row">'
	  c +='<div class="col-md-12">'
	  c +='<div class="form-group">'
	  c +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_ZIPCODE_UPLOAD']?></label>'
	  c +='<input name="csvfile"  type="file" id="csvpath"  class="form-control" accept=".csv">'
	  c +='<input type="hidden" value="'+Main.businessid +'" name="businessid" id="businessid" >'
	  c +='<small data-bv-validator="notEmpty" class="help-block" id="csvpath_text" style="color:#F00;display:none;"><?=$lang_resource['BUSINESS_TAB_DELIVERY_PLEASE_CSV_UPLOAD']?></small>'
	  c +='<small data-bv-validator="notEmpty" class="help-block" id="csvpath_ext_text" style="color:#F00;display:none;"><?=$lang_resource['BUSINESS_TAB_DELIVERY_PLEASE_CSV_UPLOAD_ONLY']?></small>'
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-12-->
	  c +='</div>'
	  <!--row-->
	  
	  c +='<div class="row">'
	  c +='<div class="col-md-6 col-md-offset-3">'
	  c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" ><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_CREATE']?></button></center>'
	  c +='</div>'
	  <!--col-md--->
	  c +='</form>'
	  c +='</div>'
	  <!--row-->
	  
	  
	  Popup.Show(c);
	 
    },
	PreValidationCSV: function(){
		
   	var count = 0;	
    if(document.getElementById("csvpath").value == ""){
		$("#csvpath_text").show();
		$("#csvpath").addClass("error-text-field");
		$("#csvpath").removeClass("success-text-field");
		count ++;
	}else{
		$("#csvpath_text").hide();
		$("#csvpath").addClass("success-text-field");
		$("#csvpath").removeClass("error-text-field");
	}
	
	var csvfile=  document.getElementById("csvpath");
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
    if (!regex.test(csvfile.value.toLowerCase())) {
		 $("#csvpath_ext_text").show();
		 $("#csvpath").addClass("error-text-field");
		 $("#csvpath").removeClass("success-text-field");
            count ++;
	}else{
		$("#csvpath_ext_text").hide();
		$("#csvpath").addClass("success-text-field");
		$("#csvpath").removeClass("error-text-field");
	}
			
	
        
		if(count == 0){
			
			return true
		}
		else {
			return false
		}
		
		
			/*var csvfile=document.getElementById("csvpath").value;
           var ext = csvfile.substring(csvfile.lastIndexOf('.') + 1);
					if(csvfile=="")
					{
					alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_PLEASE_CSV_UPLOAD']?>");
					return false;
					}
					else if(ext!="csv")
					{
					alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_PLEASE_CSV_UPLOAD_ONLY']?>");
					return false;
					}
                    else
                    {
                   return true
                    
                    }*/
},
	
	CsvUpload: function(){
		
		//ZipCode.PreValidationCSV()
		var csvfile=document.getElementById("csvpath").value;
        var ext = csvfile.substring(csvfile.lastIndexOf('.') + 1);
		if (ext == "csv") {
	//    $("#csvzipcode").submit(function (event) {
			$("#csvpath_ext_text").hide();
			$("#csvpath").addClass("success-text-field");
			$("#csvpath").removeClass("error-text-field");
			Main.Loading()	 
		//	event.preventDefault();
			var formData = new FormData($("#csvzipcode")[0]);
		  $.ajax({
            url: 'csv/zipcode.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (zhtml) {
             var res = zhtml.split(",");
			 var executeitem = res[0];
			 var skipitem = res[1];
			 var html ='';
			
			 if(executeitem !=0){
			   html +=executeitem +' <?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_SUCCESSFULL_UPLOAD']?> ';	
			   if(skipitem !=0){
				 html +='<?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_EXIST_AND']?> '+skipitem +' <?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_EXIST_UPLOAD']?>';	
			   }
			 }else{
			   if(skipitem !=0){
				 html += skipitem +' <?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_EXIST_UPLOAD']?>';	
			   }
			 }
			 Popup.Close();
			 Main.Ready();
			 alert(html)
			 ZipCode.Main();
            },
            error: function(){
                alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_CSV_UPLOAD_ERROR']?>");
			}
      //  });
		
		});
		
		}else{
			$("#csvpath_ext_text").show();
			 $("#csvpath").addClass("error-text-field");
			 $("#csvpath").removeClass("success-text-field");
		}
	},
    ZipcodeEdit: function (a) {
		$('div[id*=newpopup]').remove();
        var d = false;
        if (a) {
            d = true
        } else {
			
            var c = Main.GetMarkedCheckBoxesValuesByClass('deliveryzip');
			
            if (c.length == 1) {
                a = c[0];
                d = true
            }
			else if(c.length >1)
			{
				alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_CHECBOX_SELECT_ONE']?>");
				return;
			}
			else
			{
				alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_CHECBOX_SELECT_EDIT'] ?>");
			    return;
			}
			
			
        } if (d) {
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
		
            $.post("lib/zipseach.php", "f=FetchEachzipData&id=" + a, function (e) {
				
				//alert(e)
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e != "") {
				
					
                    ZipCode.ZipcodeForm(JSON.parse(e))
                } else {
                    alert("Error")
                }
            })
        }
    },
     ZipcodeForm: function (b) {
    
     
        var c = "";
        Forms.Clean("category", "mainbuttonok");
		
		Forms.CreateValue("category", "businessid", Main.businessid);
        if (b) {
           
			 Forms.Form.category.type = "modify";
            Forms.Form.category.id = b[0].id
			
        } else {
			
            Forms.Form.category.type = "create"
        }
		  
		  
		if (Forms.Form.category.type == "create") {
		c +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_DELIVERY_CREATE_ZIP_CODE']?></h3>'
		}else{
		c +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_EDIT_HEADING']?></h3>'
		}
		if (b) {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_ADD_ZIP_CODE']?></label>'
		c +=Forms.CreateInputPropertyPopup("category", "zipcode",  b[0].zipcode, true,"ZipCode.PreValidation()")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="zipcode_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ZIPCODE']?></small>'

		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}else {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_ADD_ZIP_CODE']?></label>'
		c +=Forms.CreateInputPropertyPopup("category", "zipcode",  "", true,"ZipCode.PreValidation()")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="zipcode_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ZIPCODE']?></small>'

		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}
		if (b) {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_PRICE']?></label>'
		
		c +=Forms.CreateInputPropertyPopup("category","cost",  b[0].cost, true, "ZipCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="cost_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_DELIVERY_PRICE']?></small>'
		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}else {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_PRICE']?></label>'
		c +=Forms.CreateInputPropertyPopup("category","cost",  '', true, "ZipCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="cost_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_DELIVERY_PRICE']?></small>'
		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}
		if(Main.zipcodeordersetting=='1')
		{
		if (b) {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_DELIVERY_TIME']?></label>'
		Forms.CreateValue("category", "deliverytime", Main.NullToEmpty(b[0].deliverytime),true);
			if (Forms.Form.category.type != "create" && b[0].deliverytime) {
				var l = JSON.parse(b[0].deliverytime);
				o = l.deliverytime.hour+':'+l.deliverytime.minute;
			}
			else
			{
				o='';
		    }
        c +='<div class="input-group input-append bootstrap-timepicker" id="delivery_time" >'
		c +='<input type="text" id="deliverytime" class="form-control timepicker" value="'+o+'">'
		c +='<span class="input-group-addon add-on" id="check-open"><i class="fa icon-clock"></i></span>'
		c +='</div>'
		c +='<small data-bv-validator="notEmpty" class="help-block" id="deliverytime_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DELIVERY_TIME_IS_REQUIRED']?></small>'
		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}else {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['ADVERTISEMENT_CREATE_DELIVERY_TIME']?></label>'
		Forms.CreateValue("category", "deliverytime", '',true);
		c +='<div class="input-group input-append bootstrap-timepicker" id="delivery_time" >'
		c +='<input type="text" id="deliverytime" class="form-control timepicker" value="">'
		c +='<span class="input-group-addon add-on" id="check-open"><i class="fa icon-clock"></i></span>'
		c +='</div>'
		c +='<small data-bv-validator="notEmpty" class="help-block" id="deliverytime_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DELIVERY_TIME_IS_REQUIRED']?></small>'
		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}
		if (b) {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['CREATE_DELIVERY_MINIMUM_PRICE']?></label>'
		c +=Forms.CreateInputPropertyPopup("category","minimumprice",  b[0].minimumprice, true, "ZipCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="minimumprice_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_MINIMUM_PRICE_IS_REQUIRED']?></small>'
		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}else {
		c +='<div class="row">'
		c +='<div class="col-md-12">'
		c +='<div class="form-group">'
		c +='<label><?=$lang_resource['CREATE_DELIVERY_MINIMUM_PRICE']?></label>'
		c +=Forms.CreateInputPropertyPopup("category","minimumprice",  '', true, "ZipCode.PreValidation()", false, false, "return Main.IsNumberKey(event)")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="minimumprice_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_MINIMUM_PRICE_IS_REQUIRED']?></small>'
		c +='</div>'
		c +='</div>'
		<!--col-md-12-->
		c +='</div>'
		<!--row-->
		}
		}
		c +='<div class="row">'
		c +='<div class="col-md-6 col-md-offset-3">'
		if (Forms.Form.category.type == "create") {
		c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ZipCode.SaveZipcode()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CREATE']?></button></center>'
		}else{
		c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick=" ZipCode.SaveZipcode()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_UPDATE']?></button></center>'
		}
		c +='</div>'
		<!--col-md--->
		c +='</div>'
		<!--row-->
		
			
			Popup.Show(c);
			var input = $('#deliverytime');
			input.clockpicker({
			autoclose: true
		});
		
		$('#check-open').click(function(e){
			e.stopPropagation();
			$("#deliverytime").clockpicker('show')
					.clockpicker('toggleView', 'hours');
		});

        $("#name").focus()
    },
	PreValidation: function(){
   	var count = 0;	
    
    	if(document.getElementById("zipcode").value == ""){
            $("#zipcode_text").show();
            $("#zipcode").addClass("error-text-field");
            $("#zipcode").removeClass("success-text-field");
            count ++;
        }else{
        	$("#zipcode_text").hide();
            $("#zipcode").addClass("success-text-field");
            $("#zipcode").removeClass("error-text-field");
        }
		
		if(document.getElementById("cost").value == ""){
            $("#cost_text").show();
            $("#cost").addClass("error-text-field");
            $("#cost").removeClass("success-text-field");
            count ++;
        }else{
        	$("#cost_text").hide();
            $("#cost").addClass("success-text-field");
            $("#cost").removeClass("error-text-field");
        }
		if(Main.zipcodeordersetting=='1')
		{

			if(document.getElementById("deliverytime").value == ""){
				
				$("#deliverytime_text").show();
				$("#deliverytime").addClass("error-text-field");
				$("#deliverytime").removeClass("success-text-field");
				count ++;
			}else{
				$("#deliverytime_text").hide();
				$("#deliverytime").addClass("success-text-field");
				$("#deliverytime").removeClass("error-text-field");
			}
		   
			if(document.getElementById("minimumprice").value == ""){
				$("#minimumprice_text").show();
				$("#minimumprice").addClass("error-text-field");
				$("#minimumprice").removeClass("success-text-field");
				count ++;
			}else{
				$("#minimumprice_text").hide();
				$("#minimumprice").addClass("success-text-field");
				$("#minimumprice").removeClass("error-text-field");
			}
		}
        if(count == 0)
        	return true
        else 
        	return false
       
    },
	 ZipcodeDelete : function () {
        var b = Main.GetMarkedCheckBoxesValuesByClass('deliveryzip');
        if (b.length == 0) {
			alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_CHECBOX_SELECT']?>")
            return
        }
        var a = new Object();
        a.ids = b;
		//alert(1);
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/categories.php", "f=DeleteZipcode&data=" + JSON.stringify(a), function (e) {
						ZipCode.Main(Main.businessid)
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
    },
	  SaveZipcode: function () {
		  
		if(Main.zipcodeordersetting=='1')
		{
		 ZipCode.UpdateDeliverytime();
		}
		
		 ZipCode.PreValidation();
        if (Forms.CanSave("category") == false) {
            return
        }
    
		$.post("lib/zipseach.php", "f=SaveZipcode&data=" + JSON.stringify(Forms.Form.category), function (a) {
			
       	 Popup.Close();
         ZipCode.Main(Main.businessid)
        });

        Forms.Clean("category")
    },
    Export: function (b) {
		
		
       var c = Main.GetMarkedCheckBoxesValuesByClass('deliveryzip');
        if (c.length == 0) {
            return
        }
        var a = new Object();
        a.ids = c;
        a.type = b;
		
        document.getElementById("exp_data").value = c[0];
        document.exp_form.submit()
    },
	Gopdf: function (b,c) {	
	//alert(c);	
        document.getElementById("exp_data").value = b +"-"+c;
        document.exp_form.submit()
    },
	 UpdateDeliverytime: function () {
        var c = new Object();
        var d;
       
	    c.deliverytime = new Object();
		d = document.getElementById("deliverytime").value;
		var res = d.split(":");
		if(res[0] =='00'){
            var ohour = '0';
        }else{
            var ohour = res[0]; 
        }
        if(res[1] =='00'){
            var chour = '0';
        }else{
            var chour = res[1]; 
        }
		c.deliverytime.hour = ohour;
		c.deliverytime.minute = chour;
		

		Forms.UpdateValue("category", "deliverytime", JSON.stringify(c), true);
		
		
    },
    Delete: function () {
        var b =  Main.GetMarkedCheckBoxesValuesByClass('deliveryzip');
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("orders", null, "f=DeleteOrder&data=" + JSON.stringify(a), "Orders.Main()")
    }
};
