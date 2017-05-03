
 var DeliveryZoneByZip = {
		Main: function () {
			Main.pageid = 1;
			startp =1;
 			endp =5;
		
        Main.Loading();
		var a = new Date().getTime();
        	Main.Aid = a;
		$.post("lib/discountcode.php", "f=FetchAllRestData", function (b) {		
			DeliveryZoneByZip.businessrest = JSON.parse(b);
			DeliveryZoneByZip.businessrest.sort(Main.SortByProperty("name"));			
		})
			
		
				$.post("lib/multizonezipcode.php", "f=FetchAllZipData", function (c) {
					//alert(JSON.stringify(c));

					if (a != Main.Aid) {
                return
            }	
					Main.Ready();
					if (c != "") {
						DeliveryZoneByZip.Orders = JSON.parse(c);
					  
						DeliveryZoneByZip.PrintMain();
						
					} else {
						alert("Error")
					}
				})

    },
        
        
        PrintMain: function(k,hp){
        var c="";
		c +='<div class="panel panel-success panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
		c +='<div class="row">'
        c +='<div class="col-md-4">'
        c +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_HEADING']?></h3>'
        c +='</div>'
		<!--col-md-4-->
        c +='<div class="col-md-3">'
        c +='<div class="panel-btn filtr_margin">'
        c +='<input type="text" id="multizipsearch" class="form-control rounded panel-green-field white-placeholder" placeholder="Filter">'
        c +='</div>'
        c +='</div>'
		<!--col-md-4-->
        c +='<div class="col-md-5">'
		c +='<div class="panel-btn pull-right">'
        c +='<div class="inline-popups ">'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:DeliveryZoneByZip.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:DeliveryZoneByZip.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></a>'
        c +='</span>'
        c +='<span class=" panel-btn-2">'
        c +='<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="DeliveryZoneByZip.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button></span>'
        
		c +='</div>'
        c +='</div>'
		<!--col-md-4-->
        c +='</div>'
		<!--row-->
		c +='</div>'
        c +='</div>'
		c +='<div class="panel-body">'
        c +='<div class="table-responsive">'
        c +='<table class="table table-th-block table-striped">'
        c +='<thead>'
        c +='<tr>'
        c +='<th width="10%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_SL']?></th>'
        c +='<th width="20%" onclick="Main.ToogleAllCheckBoxes(\'deliveryzonezip\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ALL']?></th>'
        c +='<th width="30%"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_NAME']?></th>'
        c +='<th width="20%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_PRICE']?></th>'
        c +='<th width="20%"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZIP_DELIVERY_ENABLE']?></th>'
        c +='</tr>'
        c +='</thead>'
		c +='<tbody id="zipcodelist">'
		c +='</tbody>'
        c +='</table>'
		c +='<div class="page" id="page" style="margin-left:5px">'

		if(DeliveryZoneByZip.Orders[0]){
			Main.zipcodetotalrecord = Main.NullToEmpty(DeliveryZoneByZip.Orders[0].totalrecord)			
			var pageBox ='';
			if(Math.ceil(Main.zipcodetotalrecord)>=5){
				c +='<span class="prevoius" id="backword"><a  href="javascript:DeliveryZoneByZip.gobackward()"><<</a></span><div id="allpagination">';
			}else{
				pageBox +='<span type="hidden" class="prevoius" id="backword"><a  href="javascript:DeliveryZoneByZip.gobackward()"><<</a></span><div id="allpagination">';
			}			
		
			var counter = 1;
			for(var i=1;i<=Math.ceil(Main.zipcodetotalrecord);i++){
				if(i % 5 == 1) {
					c +='<span  class="allpages" ><a style="cursor: pointer" onclick="DeliveryZoneByZip.pageopen(' + counter + ','+ this.Orders[0].id +')">'+ counter +'</a></span>';
					counter++;
				}
			}
		
			if(Math.ceil(Main.zipcodetotalrecord)>=5){
				c +='</div><span class="next"  id="forward"><a href="javascript:void(0)" onclick="DeliveryZoneByZip.goforward()">>></a></span>';
			}
		}
		c +='</div>';
        c +='</div>'
		<!--table-responsive-->
		c +='</div>'
		<!-- /.panel-body -->
        c +='</div>'
        
		$("#deliverybyzip").empty().append(c);
		document.getElementById("multizipsearch").onkeyup = function () {
          DeliveryZoneByZip.PupulateTable(Main.Config.Orders.List.SortBy, true,hp)
        };
		DeliveryZoneByZip.PupulateTable(Main.Config.Orders.List.SortBy, true,hp)
		
        },
		
		
		PupulateTable: function(a, d,hp){
			
			
		
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
            g = document.getElementById("multizipsearch").value;

            if (String(this.Orders[f].id).indexOf(g) >= 0 || String(this.Orders[f].zipcode).indexOf(g) >= 0) {
                j = true;
                l.push(this.Orders[f])
            }
           
            if (j) {
				
				 e += '<tr>'
				 e += '<td>'+this.Orders[f].id + '</td>'
				 e += '<td><input type="checkbox" class="deliveryzonezip" value="' + this.Orders[f].id + '"></td>'
				 e += '<td class="hand" onclick="DeliveryZoneByZip.Edit(' + this.Orders[f].id + ')">'+ Main.NullToEmpty(this.Orders[f].zipcode) +'</td>'
				 e += '<td class="hand" onclick="DeliveryZoneByZip.Edit(' + this.Orders[f].id + ')"> '+ Main.NullToEmpty(parseFloat(this.Orders[f].cost).toFixed(IS_DECIMAL_POINT)) +'</td>'
				 e += '<td><div class="enebal" id="switch_Zip_' + this.Orders[f].id + '"></div></td>'
				 e += '</tr>'

            }
		
		}
		if(l.length >0 ){
			$("#page").show();
		}else{
			$("#page").hide();
		}

		//code for pagination//
		
		startp = ((Main.pageid - 1) * 5)+1;
		endp = Main.pageid * 5;
		e += "<input type='hidden' id='pageboxstart' value='"+startp+"'/>";
		e += "<input type='hidden' id='pageboxend' value='"+endp+"'/>";
		if(Main.pageid == 1){
			$("#backword").hide();
		}else{
			$("#backword").show()
		}
		if(endp >this.Orders[f].totalrecord){
			$("#forward").hide();
		}else{
			$("#forward").show()
		}
		

        document.getElementById("zipcodelist").innerHTML = e
		
		//code for pagination//
		
		
		  var h = false;
     
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_Zip_" + l[e].id, h);
            Switch.OnChange("switch_Zip_" + l[e].id, function (m, i) {
               
				DeliveryZoneByZip.SetEnabled(m.replace("switch_Zip_", ""), i)
            })
		}
	
		},
	gobackward: function(){		
		a = Main.pageid - 1;
		Main.pageid = a;		
		Main.Loading();		
		$.post("lib/multizonezipcode.php", "f=FetchAllDataperpage&id=" + a, function (c) {		
			
			p ="";
			Main.Ready();
			if (c != "") {
				DeliveryZoneByZip.Orders = JSON.parse(c);
				Main.pageid = a;
				DeliveryZoneByZip.PupulateTable(Main.Config.Orders.List.SortBy,true);

			} else {
				alert("Error")
			}
		})
	},

	
	goforward: function(){
		a = Main.pageid + 1;
		Main.pageid = a;
		Main.Loading();		
		$.post("lib/multizonezipcode.php", "f=FetchAllDataperpage&id=" + a, function (c) {	
			p ="";
			Main.Ready();
			if (c != "") {
				DeliveryZoneByZip.Orders = JSON.parse(c);
				Main.pageid = a;
				DeliveryZoneByZip.PupulateTable(Main.Config.Orders.List.SortBy,true);

			} else {
				alert("Error")
			}
		})
	},
				
	
	goMiddle: function(){
			
	if(document.getElementById('pageboxstart')){
		var boxstart = document.getElementById('pageboxstart').value;
	}
	if(document.getElementById('pageboxstart')){
		var boxend = document.getElementById('pageboxend').value;
	}
		
		
		boxstart1 = boxstart;
		boxend1 = boxend;
		
		var pageBox ='';
	
		for(var i=boxstart;i<=Math.ceil(Main.zipcodetotalrecord);i++)
		{
		
	
				if(boxstart1 < 0 ) {
					
			    document.getElementById('pageboxstart').value = 1;	
				document.getElementById('pageboxend').value = 5;	
				return false
				
				}
					if(parseInt(i) <= parseInt(boxend1)){
						//alert("ok");
					if(Main.pageid == i) {
		
					pageBox +='<span  class="allpages active" ><a style="cursor: pointer" onclick="DeliveryZoneByZip.pageopen(' + i + ','+ this.Orders[0].id +')">'+ i +'</a></span>';
					
					} else {
										
			    	pageBox +='<span  class="allpages" ><a style="cursor: pointer" onclick="DeliveryZoneByZip.pageopen(' + i + ','+ this.Orders[0].id +')">'+ i +'</a></span>';		
						
						}				
					
				}
				
		}
		

		
		 document.getElementById("allpagination").innerHTML = pageBox
		
		if(document.getElementById('pageboxend')){
		 if(document.getElementById('pageboxend').value >= Math.ceil(Main.zipcodetotalrecord)){

			if(document.getElementById('forward'))

			document.getElementById('forward').style.display = 'none';	
				
			}
		}
			if(document.getElementById('pageboxstart')){
			if(document.getElementById('pageboxstart').value >= 5){
				
			document.getElementById('backword').style.display = 'block';	
				
			}
			}
			
		 return false;
		
	},

	pageopen: function (a,bid) {
		Main.Loading();		
		$.post("lib/multizonezipcode.php", "f=FetchAllDataperpage&id=" + a, function (c) {	
			
			p ="";
			Main.Ready();
			if (c != "") {
				DeliveryZoneByZip.Orders = JSON.parse(c);
				Main.pageid = a;
				DeliveryZoneByZip.PupulateTable(Main.Config.Orders.List.SortBy,true);

			} else {
				alert("Error")
			}
		})
	},


		SetEnabled: function (b, a) {
		//alert(Main.businessid);
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/multizonezipcode.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			if (c != "ok") {
                Switch.SwitchTo("switch_Zip_" + b, !a)
            }
        })
    },
	
	New: function () {
		$('div[id*=newpopup]').remove();
        var a = this;
		Main.GetFranchisesData("DeliveryZoneByZip.Form()")
		
    },
	Edit: function (a) {
	  $('div[id*=newpopup]').remove();
	  
	  var d = false;
	  if (a) {
		  d = true
	  } else {
		  var c = Main.GetMarkedCheckBoxesValuesByClass('deliveryzonezip');
		  if (c.length == 1) {
			  a = c[0];
			  d = true
		  }else if(c.length > 1){
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_DELIVERY_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_DELIVERY_CHECBOX_SELECT_EDIT']?>");
                return
            }
	  } 
	  
	  if (d) {
		  Main.Loading();
		  
	  
		  $.post("lib/multizonezipcode.php", "f=FetchDeliveryZipData&id=" + a, function (b) {
		 		
			  Main.Ready();
			  DeliveryZoneByZip.Form(JSON.parse(b))
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
		  
    },
	
	Form: function (e) {  

        MultipleInput.AddListener("tagschange", "DeliveryZoneByZip.MultiInputTagsChange");
        Forms.Clean("ad", "mainbuttonok");
        	if (e == null) {
           e = new Object();
            Forms.Form.ad.type = "create"
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
			
        } 
        var k = "";
		var k = "";
		if (Forms.Form.ad.type == "create") {
		k +='<h3 class="popup-heading"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_ADD_ZIPCODE_ZONE'] ?></h3>'
		}else{
		k +='<h3 class="popup-heading"><?= $lang_resource['BUSINESS_TAB_DELIVERY_ZONE_EDIT_ZIPCODE_ZONE'] ?></h3>'	
		}
		
        k+= '<div class="row">'
        k+= '<div class="col-md-12">'
        k+= '<div class="form-group">'
        k+= '<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_ADD_ZIP_CODE']?></label>'
		k+=Forms.CreateInputPropertyPopup("ad", "zipcode",Main.NullToEmpty(e.zipcode), true,"DeliveryZoneByZip.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="zipcode_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_ZIPCODE']?></small>'
        k+= '</div>'
        k+= '</div>'
		<!--col-md-12-->
        k+= '</div>'
		<!--row-->
        k+= '<div class="row">'
        k+= '<div class="col-md-12">'
        k+= '<div class="form-group">'
        k+= '<label><?=$lang_resource['BUSINESS_TAB_DELIVERY_PRICE']?></label>'
        k+=Forms.CreateInputPropertyPopup("ad", "cost",Main.NullToEmpty(e.cost), true,"DeliveryZoneByZip.PreValidation()",false, false, "return Main.IsNumberKey(event)")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="cost_text" style="color:#F00;display:none;"><?=$lang_resource['DELIVERYZONE_VALIDATION_DELIVERYPRICE']?></small>'
        k+= '</div>'
        k+= '</div>'
		<!--col-md-12-->
        k+= '</div>'
		<!--row-->
		k+= '<div class="row">'
        k+= '<div class="col-md-12">'
        k+= '<div class="form-group">'
        k+= '<label><?=$lang_resource['ADVERTISEMENT_CREATE_DELIVERY_BUSINESS']?></label>'
		Forms.CreateValue("ad", "business",Main.NullToEmpty(e.business), true);
        k+= '<input type="text" class="form-control" id="business">'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="business_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_BUSINESS_IS_REQUIRED']?></small>'
        k+= '</div>'
        k+= '</div>'
		<!--col-md-12-->
        k+= '</div>'
		<!--row-->
		if(Main.zipcodeordersetting=='1')
		{
		k+= '<div class="row">'
        k+= '<div class="col-md-12">'
        k+= '<div class="form-group">'
        k+= '<label><?=$lang_resource['ADVERTISEMENT_CREATE_DELIVERY_TIME']?></label>'
//alert(e.deliverytime)
		Forms.CreateValue("ad", "deliverytime", Main.NullToEmpty(e.deliverytime),true);
			if (Forms.Form.ad.type != "create" && e.deliverytime) {
				var l = JSON.parse(e.deliverytime);
				o = l.deliverytime.hour+':'+l.deliverytime.minute;
			}
			else
			{
				o = '';
			}
        k +='<div class="input-group input-append bootstrap-timepicker" id="delivery_time" >'
		k +='<input type="text" id="deliverytime" class="form-control timepicker" value="'+o+'">'
		k +='<span class="input-group-addon add-on" id="check-open"><i class="fa icon-clock"></i></span>'
		k +='</div>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="deliverytime_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_DELIVERY_TIME_IS_REQUIRED']?></small>'
        k+= '</div>'
        k+= '</div>'
		<!--col-md-12-->
        k+= '</div>'
		<!--row-->
		
		
		k+= '<div class="row">'
        k+= '<div class="col-md-12">'
        k+= '<div class="form-group">'
        k+= '<label><?=$lang_resource['CREATE_DELIVERY_MINIMUM_PRICE']?></label>'
		k+=Forms.CreateInputPropertyPopup("ad", "minimumprice", Main.NullToEmpty(e.minimumprice), true,"DeliveryZoneByZip.PreValidation()",false, false, "return Main.IsNumberKey(event)")
       
		k +='<small data-bv-validator="notEmpty" class="help-block" id="minimumprice_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_MINIMUM_PRICE_IS_REQUIRED']?></small>'
        k+= '</div>'
        k+= '</div>'
		<!--col-md-12-->
        k+= '</div>'
		<!--row-->
		}
        k+= '<div class="row">'
        k+= '<div class="col-md-6 col-md-offset-3">'
        k+= '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="DeliveryZoneByZip.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button></center>'
        k+= '</div>'
		<!--col-md--->
        k+= '</div>'
		<!--row-->
		
		Popup.Show(k);
       
        var input = $('#deliverytime');
		input.clockpicker({
			autoclose: true
		});
		
		$('#check-open').click(function(e){
			e.stopPropagation();
			$("#deliverytime").clockpicker('show')
					.clockpicker('toggleView', 'hours');
		});
		
        MultipleInput.Init("business",DeliveryZoneByZip.businessrest, true);        
       if (Forms.Form.ad.type == "modify") {
            if (e.business != "") {
				var d = e.business.split(",");
				for (var e in d) {
					MultipleInput.AddTagById("business", d[e])
				}
				Forms.Form.ad.fields.business.save = false
			}
		}
		
		
		
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
        	return true
        
       
    },
   
   Save: function(){
	   if(Main.zipcodeordersetting=='1')
		{
	   		DeliveryZoneByZip.UpdateDeliverytime();
		}
	   if(DeliveryZoneByZip.PreValidation() == false){
		
			return   
	   }
	   // alert(JSON.stringify(Forms.Form.ad));
        if (Forms.CanSave("ad") == false) {
			Popup.Close();
            return
        }
   		//alert(JSON.stringify(Forms.Form.ad))
		$.post("lib/multizonezipcode.php", "f=SaveZipcode&data=" + JSON.stringify(Forms.Form.ad), function (a) {
			//alert(a)
       	 Popup.Close();
         DeliveryZoneByZip.Main()
        });

        Forms.Clean("ad")
	   
	   
   },
   
   Delete: function () { 
  
        var b = Main.GetMarkedCheckBoxesValuesByClass('deliveryzonezip');
        if (b.length == 0) {
			alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_DELIVERY_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/multizonezipcode.php", "f=DeleteZipcode&data=" + JSON.stringify(a), function (e) {
						DeliveryZoneByZip.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_KM_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
    },
   
   MultiInputTagsChange: function (d) {
   		this.ActiveForm = "ad";
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
                Forms.UpdateValue("ad", d, JSON.stringify(f))
            } else {
                Forms.UpdateValue("ad", d, "")
            }
           	DeliveryZoneByZip.PreValidation();
            break
        }
        
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
		

		Forms.UpdateValue("ad", "deliverytime", JSON.stringify(c), true);
		
		
    },

};