var ab = new Array({
            id: "Kwajalein",
            caption: "International Date Line West (GMT-12:00)"
        },{
                id: "America/Anchorage",
                caption: "Alaska (GMT-9)"
        },{
            id: "Pacific/Honolulu",
            caption: "Hawaii (GMT-10:00)"
        }, {
            id: "America/Los_Angeles",
            caption: "Pacific Time (US &amp; Canada) (GMT-08:00)"
        }, {
            id: "America/Tijuana",
            caption: "Tijuana, Baja California (GMT-08:00)"
        }, {
            id: "America/Denver",
            caption: "Mountain Time (US &amp; Canada) (GMT-07:00)"
        }, {
            id: "America/Chihuahua",
            caption: "Chihuahua (GMT-07:00)"
        }, {
            id:"Europe/Netherlands",
            caption:"Netherlands (GMT+01:00)"
        }, {
            id: "America/Mazatlan",
            caption: "Mazatlan (GMT-07:00)"
        }, {
            id: "America/Phoenix",
            caption: "Arizona (GMT-07:00)"
        }, {
            id: "Europe/London",
            caption: "London (GMT+00:00)"
        }, {
            id: "America/Tegucigalpa",
            caption: "Central America (GMT-06:00)"
        }, {
            id: "America/Chicago",
            caption: "Central Time (US &amp; Canada) (GMT-06:00)"
        }, {
            id: "America/Mexico_City",
            caption: "Mexico City (GMT-06:00)"
        }, {
            id: "America/Monterrey",
            caption: "Monterrey (GMT-06:00)"
        }, {
            id: "America/New_York",
            caption: "Eastern Time (US &amp; Canada) (GMT-05:00)"
        }, {
            id: "America/Bogota",
            caption: "Bogota (GMT-05:00)"
        }, {
            id: "America/Lima",
            caption: "Lima (GMT-05:00)"
        }, {
            id: "America/Rio_Branco",
            caption: "Rio Branco (GMT-05:00)"
        }, {
            id: "America/Indiana/Indianapolis",
            caption: "Indiana (East) (GMT-05:00)"
        }, {
            id: "America/Caracas",
            caption: "Caracas (GMT-04:30)"
        }, {
            id: "America/Halifax",
            caption: "Atlantic Time (Canada) (GMT-04:00)"
        }, {
            id: "America/Manaus",
            caption: "Manaus (GMT-04:00)"
        }, {
            id: "America/Santiago",
            caption: "Santiago (GMT-04:00)"
        }, {
            id: "America/La_Paz",
            caption: "La Paz (GMT-04:00)"
        }, {
            id: "America/St_Johns",
            caption: "Newfoundland (GMT-03:30)"
        }, {
            id: "America/Argentina/Buenos_Aires",
            caption: "Buenos Aires (GMT-03:00)"
        }, {
            id: "America/Sao_Paulo",
            caption: "Brasilia (GMT-03:00)"
        }, {
            id: "America/Godthab",
            caption: "Greenland (GMT-03:00)"
        }, {
            id: "America/Montevideo",
            caption: "Montevideo (GMT-03:00)"
        }, {
            id: "Europe/Madrid",
            caption: "Madrid (GMT+01:00)"
        }, {
            id: "Europe/Paris",
            caption: "Paris (GMT+01:00)"
        },  {
            id: "Asia/Kolkata",
            caption: "India (GMT+05:30)"
        },  {
            id: "Pacific/Fiji",
            caption: "Fiji (GMT+12:00)"
        }, {
            id: "Etc/GMT-11",
            caption: "GMT -11 (GMT-11:00)"
        }, {
            id: "Etc/GMT-9",
            caption: "GMT -9 (GMT-09:00)"
        }, {
            id: "Etc/GMT-2",
            caption: "GMT -2 (GMT-02:00)"
        }, {
            id: "Etc/GMT-1",
            caption: "GMT -1 (GMT-01:00)"
        }, {
                id: "Africa/Windhoek",
                caption: "GMT +2 (GMT+02:00)"
            }, {
                id: "Asia/Riyadh",
                caption: "GMT +3 (GMT+03:00)"
            }, {
                id: "Asia/Yerevan",
                caption: "GMT +4 (GMT+04:00)"
            }, {
                id: "Asia/Karachi",
                caption: "GMT +5 (GMT+05:00)"
            }, {
                id: "Asia/Dhaka",
                caption: "GMT +6 (GMT+06:00)"
            }, {
                id: "Asia/Jakarta",
                caption: "GMT +7 (GMT+07:00)"
            }, {
                id: "Asia/Singapore",
                caption: "GMT +8 (GMT+08:00)"
            }, {
                id: "Asia/Seoul",
                caption: "GMT +9 (GMT+09:00)"
            }, {
                id: "Australia/Melbourne",
                caption: "GMT +10 (GMT+10:00)"
            }, {
                id: "Asia/Magadan",
                caption: "GMT +11 (GMT+11:00)"
            });

 var Business_Review = 
 {
    Main: function () {
		Business_Review.namelang = Array();
        Main.Loading();
        var a = new Date().getTime();
		Main.Aid = a;

        $.post("lib/Business_Review.php", "f=FetchAllBusinessReviewData",function (b) {				  
          if (a != Main.Aid) {
                return
            }
           
            Main.Ready();
            if (b != "") {
              
                Business_Review.Business_Review = JSON.parse(b);
                Business_Review.PrintMain()
            } else {
                alert("Error")
            }
            
           
        })
		
    },
		
		

    PrintMain: function () {

	  var c = "";
  
	  c +='<div class="row">'
	  c +='<div class="top-bar">'
	  c +='<div class=" col-md-6 col-md-offset-6">'
	  c +='<div class=" pull-right">'
	  c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource['ADMIN_PAGE_CANCEL'] ?></button>'
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-5-->
	  
	  c +='</div>'
	  <!--top-bar-->
	  c +='</div>'
	  <!--row-->
	  
	  
	  c +='<div class="panel panel-danger panel-square panel-no-border">'
	  c +='<div class="panel-heading panel-heading-2">'
	  c +='<div class="row">'
	  c +='<div class="col-md-4">'
	  c +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_REVIEW_HEADING']?></h3>'
	  c +='</div>'
	  <!--col-md-5--> 
	  c +='<div class="col-md-3">'
	  c +='<div class="panel-btn filtr_margin">'
	  c +='<input type="text" id="asearch" class="form-control rounded panel-red-field white-placeholder" style="display:none" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-3-->
	  c +='<div class="col-md-5">'
	  c +='<div class="panel-btn pull-right">'
	  c +='<div class="inline-popups ">'
	  c +='<span class=" panel-btn-2">'
	  c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Business_Review.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_REVIEW_ADD']?></a>'
	  c +='</span>'
	  c +='<span class=" panel-btn-2">'
	  c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="Business_Review.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_REVIEW_EDIT']?></a>'
	  c +='</span>'
	  c +='<span class=" panel-btn-2">'
	  c +='<button class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)" onclick="Business_Review.Delete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_REVIEW_DELETE']?></button>'
	  c +='</span>'
	  
	  c +='</div>'
	  
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-4-->
	  c +='</div>'
	  <!--row-->   
	  c +='</div>'
	  
	  c +='<div class="panel-body">'
	  c +='<div class="table-responsive">'
	  c +='<table class="table table-th-block table-striped tbl_enebal">'
	  c +='<thead>'
	  c +='<tr>'
	  c +='<th width="3%" onclick="Business_Review.PupulateTable(\'id\')"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_ID']?></th>'
	  c +='<th width="3%" onclick="Main.ToogleAllCheckBoxes(\'Business_Review\')"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_ALL']?></th>'
	  c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_NAME']?></th>'
	  c +='<th width="15%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_EMAIL']?></th>'
	  c +='<th width="15%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_BUSINESSNAME']?></th>'
	  c +='<th width="20%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_COMMENTS']?></th>'
    c +='<th width="20%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_REVIEWS']?></th>'
	  c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_STATUS']?></th>'
	  
	  c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_ENABLE']?></th>'
	  c +='</tr>'
	  c +='</thead>'
	  c +='<tbody id="Business_Review">'
	  c +='</tbody>'
	  c +='</table>'
	  c +='</div>'
	  <!--table-responsive-->
	  c +='</div>'
	  <!-- /.panel-body -->
	  c +='</div>'


    /////////////////////////////////////New Tab with Photo//////////////////////////////////
    c +='<div class="panel panel-warning panel-no-border">'
    c +='<div class="panel-heading panel-heading-2"> '
    c +='<div class="row">'
    c +='<div class="col-md-9">'
    c +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_REVIEW_HEADING_PHOTO']?></h3>'
    c +='</div>'
    <!--col-md-9-->
    c +='<div class="col-md-3">'
    c +='<div class="panel-btn pull-right">'
    c +='<div class="inline-popups ">'
	c +='<span class=" panel-btn-2">'
	  c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:Business_Photo.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADVERTISEMENT_ADD']?></a>'
	  c +='</span>'
    c +='<span class=" panel-btn-2">'
    c +='<a class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:void(0)" onclick="Business_Photo.Edit1()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_REVIEW_EDIT']?></a>'
    c +='</span>'
    c +='<span class=" panel-btn-2">'
    c +='<button class="btn btn-default btn-rounded-lg panel-yellow-btn" href="javascript:void(0)" onclick="Business_Photo.Delete()" ><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_REVIEW_DELETE']?></button>'
    c +='</span>'
    c +='</div>'
    
    c +='</div>'
    c +='</div>'
    <!--col-md-4-->
    c +='</div>'
    <!--row-->   
    c +='</div>'
    c +='<div class="panel-body">'
    c +='<div class="table-responsive">'
    c +='<table class="table table-th-block table-striped tbl_enebal">'
    c +='<thead>'
    c +='<tr>'
    c +='<th width="3%" onclick="Business_Review_Photo.PupulateTableBp(\'id\')"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_ID']?></th>'
    c +='<th width="3%" onclick="Main.ToogleAllCheckBoxes(\'Business_Review_Photo\')"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_ALL']?></th>'
    c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_NAME']?></th>'
    c +='<th width="15%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_EMAIL']?></th>'
    c +='<th width="15%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_BUSINESSNAME']?></th>'
    c +='<th width="15%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_PHOTO']?></th>'
    c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_COUNT_PHOTO']?></th>'
    c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_STATUS']?></th>'
    
    c +='<th width="10%"><?=$lang_resource['BUSINESSREVIEW_POPULATE_HEADING_ENABLE']?></th>'
    c +='</tr>'
    c +='</thead>'
    c +='<tbody id="Business_Review_Photo">'
    c +='</tbody>'
    c +='</table>'
    c +='</div>'
    <!--table-responsive-->
    c +='</div>'
    <!-- /.panel-body -->
    c +='</div>'



	  
		//alert(c);
      document.getElementById("main").innerHTML = c;

    // document.getElementById("asearch").onkeyup = function () {
        //  Business_Review.PupulateTable(Main.Config.Business_Review.List.SortBy, true)
     // };
		
      //Business_Review.PupulateTable(Main.Config.Business_Review.List.SortBy, true)
	  Business_Review.PupulateTable()
    Business_Photo.Main()

    },
	
    PupulateTable: function () {
		
        var d = "";

        var b = this.Business_Review.length;
        var j = true;
        var g = "";
		 var f = new Array();
        var l = new Array();
		//alert(JSON.stringify(Business_Review.Business_Review));
        for (var e in Business_Review.Business_Review) {
			 f.push(Business_Review.Business_Review[e])
            j = true;
            if (j) {
				
				d += '<tr>'
				d += '<td>'+ this.Business_Review[e].id +'</td>'
				d += '<td><input type="checkbox" class="Business_Review checkbox" value="' + this.Business_Review[e].id + '"></td>'
      
				d += '<td class="hand" onclick="Business_Review.Edit(' + this.Business_Review[e].id + ')">'+ Main.NullToEmpty(this.Business_Review[e].name) +'</td>'
				
				d += '<td class="hand" onclick="Business_Review.Edit(' + this.Business_Review[e].id + ')">' + this.Business_Review[e].email +'</td>'

				d += '<td class="hand" onclick="Business_Review.Edit(' + this.Business_Review[e].id + ')">' + this.Business_Review[e].bname +'</td>'
				d += '<td class="hand" onclick="Business_Review.Edit(' + this.Business_Review[e].id + ')">' + Main.NullToEmpty(this.Business_Review[e].comment) +'</td>'
                d += '<td><p class="review-star">'	
                if(Math.round(this.Business_Review[e].avg)==1)
                {
                
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
                 else if (Math.round(this.Business_Review[e].avg)==2) 
                 {
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                 }

                 else if (Math.round(this.Business_Review[e].avg)==3) 
                 {
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                 }

                else if (Math.round(this.Business_Review[e].avg)==4) 
                 {
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
                 else if (Math.round(this.Business_Review[e].avg)==5)
                 {
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     d +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                 }
                 else
                 {
                    d +=  '<i class="fa icon-star3 star-grey"></i>'
                    d +=  '<i class="fa icon-star3 star-grey"></i>'
                    d +=  '<i class="fa icon-star3 star-grey"></i>'
                    d +=  '<i class="fa icon-star3 star-grey"></i>'
                    d +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
                
                d +=  '<span>'+this.Business_Review[e].avg+' <?=$lang_resource['BUSINESSREVIEW_POPULATE_COLUMN_RATINGS']?></span>'
                d += '</td>'
                d += '<td>'
                if(this.Business_Review[e].view_status=='f'){
                    d += '<a href="javascript:void(0)" id="unread" class="text-unread" ><?=$lang_resource['BUSINESSREVIEW_STATUS_UNREAD']?></a>'
                    d += '<a href="javascript:void(0)" id="read" class="text-read" style="display:none;"><?=$lang_resource['BUSINESSREVIEW_STATUS_READ']?></a>'
                }else{
                    d += '<a href="javascript:void(0)" id="unread" class="text-unread" style="display:none;"><?=$lang_resource['BUSINESSREVIEW_STATUS_UNREAD']?></a>'
                    d += '<a href="javascript:void(0)" id="read" class="text-read" ><?=$lang_resource['BUSINESSREVIEW_STATUS_READ']?></a>'
                }
                d+='</td>'
				d += '<td><div class="enebal" id="switch_' + this.Business_Review[e].id + '"></div></td>'
				d += '</tr>'
       
        
            }
        }
        document.getElementById("Business_Review").innerHTML = d;
		  
       // var h = false;
	    
		 var h = false;
        Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + f[d].id, h);
            Switch.OnChange("switch_" + f[d].id, function (l, i) {
                Business_Review.SetEnabled(l.replace("switch_", ""), i)
            })
        }
        //Switch.Init();
//alert(JSON.stringify(l))
        /*for (e in l) {
           var h = false;
        
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            //alert(l[e].id);
  //          alert(h);
            Switch.Create("switch_" + l[e].id, h);
            
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                Business_Review.SetEnabled(m.replace("switch_", ""), i)
            })
       
        }
*/
    },


    

    SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/Business_Review.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }

        })
    },
    New: function () {
         Main.GetResturantData("Business_Review.Form()")
    },
    
    Edit: function (a) {
        var d = false;
        if (a) {
            d = true
        } else {
			
            var c = Main.GetMarkedCheckBoxesValues();
			
            if (c.length == 1) {
                a = c[0];
                d = true
            }else if(c.length > 1){
				alert("<?=$lang_resource['BUSINESS_REVIEW_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_REVIEW_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
		
		 if (d) {
			
            
            Main.Loading();
            $.post("lib/Business_Review.php", "f=FetchBusinessReviewData&id=" + a+"&zone1="+ab, function (c) {
                if(c != ""){
                  
                  $('#unread').hide()
                  Estr = "true"
                  $.post("lib/Business_Review.php", "f=SetRead&id=" + a + "&enabled=" + Estr, function (n) {
                    if (n != "ok") {
                      alert(n)
                    }else{
                      $("#read").show()
					  
                       Business_Review.Form(JSON.parse(c))
                      Main.Ready();
                      //alert("Processing..")
                    }
                  })
                 


                }
				Business_Review.Main();
            });
         }
    },

	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
    },
	
	
    Form: function (e) {

        var k = "";
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "create"
			Forms.Form.ad.id = ""
        } else {
            Forms.Form.ad.type = "modify";
            Forms.Form.ad.id = e.id
        }
		var d = new Array();
    d.push(
    {
        id: "",
        caption: "Select Business"
    });

    for (i in Main.ReviewBusinessAll){  
      d.push({
        id: Main.ReviewBusinessAll[i].id,
        caption: Main.ReviewBusinessAll[i].name
      })    
    }


		if (Forms.Form.ad.type == "create") {
		k +='<h3 class="popup-heading"><?=$lang_resource['BUSINESSREVIEW_CREATE_HEADING']?></h3>'
		}else{

		k +='<h3 class="popup-heading"><?=$lang_resource['BUSINESSREVIEW_EDIT_HEADING']?></h3>'
		}
		
		
        <!--row-->
		
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_NAME']?></label>'
		
	
    if (Forms.Form.ad.type == "create") {
      k +=Forms.CreateInputPropertyPopup("ad", "name", e.name, false,"Business_Review.PreValidation()") 
    }else{
      Forms.CreateValue("ad", "name", e.name,true)
      k +='<p>'+e.name+'</p>'
    }
	       
		k +='</div>'
		k +='</div>'<!--col-md-12-->
    k+='</div>' <!--row-->

		
    k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_EMAIL']?></label>'
       
		
    if (Forms.Form.ad.type == "create") {
      k +=Forms.CreateInputPropertyPopup("ad", "email", e.email, false,"") 
    }else{
      Forms.CreateValue("ad", "email", e.email,true)
      k +='<p>'+e.email+'</p>'
    }

		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->

		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESS']?></label>'
    if (Forms.Form.ad.type == "create") {
      k +=Forms.CreateSelectPropertyPopup("ad", "id_w_business", d, e.w_id_business ,true,"Business_Review.PreValidation()") 
    }else{
    Forms.CreateValue("ad", "id_w_business", e.w_id_business,true)
      k +='<p>'+e.bname+'</p>'
    }

		k +='</div>'
		k +='</div>'
		<!--col-md-12-->
    k +='</div>'<!--row-->

    if(Main.NullToEmpty(e.orderdetails) != ""){
    k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<h5><strong><?=$lang_resource['BUSINESS_REVIEW_ORDER_DETAILS']?></strong></h5>'
    k += '<div class="order-details-dv">'
    k += '<div class="bs-example">'
    k += '<table class="table table-condensed" style="margin-bottom:0;">'
    k += '<tbody>'
    k += '<tr>'
    k += '<td><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_ORDERID']?></td>'
	  k += '<td>:</td>'
    k += '<td>'+e.orderid+'</td></tr>'
	  k += '<tr>'
    k +=  '<td><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_DATE']?></td>'
    k +=  '<td>:</td>'
    k +=  '<td>'+e.orderdate+'</td>'
		k +=  '</tr>'

    
    var data = JSON.parse(e.orderdetails);
    k +=   '<tr>'
    k +=  '<td><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_ORDERPRODUCTS']?></td>'
    k +=  '<td>:</td>'
    k += '<td>'
  
    var dishes= data.business[0].dishes;
    for(var i in dishes)
    {
     // alert (dishes[i].name)
      k +=   dishes[i].quantity + 'x' +dishes[i].name+'<br>'
    } 
    k +=   '</td>'
    k += '</tr>'
    k += '<tr>'
    k +='<td><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_ORDERPRICE']?></td>'
    k +='<td>:</td>'
    var total =data.Total
    //alert(data.Total)
    k +='<td><strong>$</strong>'+total+'</td>'
    k +='</tr>'
    k +='</tbody>'
    k +='</table>'
		k +='</div>'
    
		k +='</div>'<!--order-details-dv-->    
    k+='</div>'<!--col-md-6-->
    k+= '</div>'<!--row-->
    }



		<!--row--> 
		 k +='<div class="row">'
     k +='<div class="col-md-12">'
     k +='<div class="form-group">'
     k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESSCOMMENT']?></label>'
     k +=Forms.CreateTextAreaPropertyPopup("ad", "comment", e.comment, false,"", false, false, "")
     k +='</div>'
     k+='</div>'<!--col-md-12-->
     k+= '</div>'<!--row-->

		<!--row-->



    <!--row--> 
     k +='<div class="row">'
     k +='<div class="col-md-12">'
     k +='<div class="form-group">'
     k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESSREVIEW']?></label>'
     k +='<table class="" width="" border="0" cellspacing="0" cellpadding="0">'
     k +='<tr>'
     k +='<td valign="top"><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESSREVIEW_QUALITY_FOOD']?></td>'
     k +='<td valign="top">&nbsp;&nbsp;:&nbsp;&nbsp;</td>'
     k +='<td valign="top">'
     k +='<p class="review-star" style="font-size:16px;">'         
     k +='<i style="cursor: pointer;" class="fa icon-star3 star-grey" id="quli_1" onclick="Business_Review.CalculateReviewRatings(this.id)" ></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="quli_2" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="quli_3" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="quli_4" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="quli_5" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<input type="hidden" id="quli">'
    

     /*if(e.quality==1){
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
      }
     else if(e.quality==2)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.quality==3)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.quality==4)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.quality==5)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                 }
              else
                {
                
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }   */ 
    
     k +='</td>'
     k +='</tr>'
     k +='<tr>'
     k +='<td valign="top"><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESSREVIEW_PUNCTUALITY']?></td>'
     k +='<td valign="top">&nbsp;&nbsp;:&nbsp;&nbsp;</td>'
     k +='<td valign="top">'

     k +='<p class="review-star" style="font-size:16px;">'

     
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="punc_1" onclick="Business_Review.CalculateReviewRatings(this.id)" ></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="punc_2" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="punc_3" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="punc_4" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="punc_5" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<input type="hidden" id="punc">'


    /* if(e.delivery==1)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
     else if(e.delivery==2)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.delivery==3)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.delivery==4)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.delivery==5)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                 }
              else
                {
                
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }  */  
    
     k +='</td>'

     k +='</td>'
     k +='</tr>'
     k +='<tr>'
     k +='<td valign="top"><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESSREVIEW_SERVICE']?></td>'
     k +='<td valign="top">&nbsp;&nbsp;:&nbsp;&nbsp;</td>'
     k +='<td valign="top">'

     k +='<p class="review-star" style="font-size:16px;">'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="serv_1" onclick="Business_Review.CalculateReviewRatings(this.id)" ></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="serv_2" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="serv_3" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="serv_4" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +=  '<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="serv_5" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<input type="hidden" id="serv">'
     /*if(e.service==1)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
     else if(e.service==2)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.service==3)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.service==4)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.service==5)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                 }
              else
                {
                
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 } */   
    
     k +='</td>'

     k +='</td>'
     k +='</tr>'
     k +='<tr>'
     k +='<td valign="top"><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESSREVIEW_FOOD_PACKAGING']?></td>'
     k +='<td valign="top">&nbsp;&nbsp;:&nbsp;&nbsp;</td>'
     k +='<td valign="top">'

     k +='<p class="review-star" style="font-size:16px;">'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="pack_1" onclick="Business_Review.CalculateReviewRatings(this.id)" ></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="pack_2" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="pack_3" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="pack_4" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<i style="cursor: pointer;"  class="fa icon-star3 star-grey" id="pack_5" onclick="Business_Review.CalculateReviewRatings(this.id)"></i>'
     k +='<input type="hidden" id="pack">'

     /*if(e.package==1)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
     else if(e.package==2)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.package==3)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.package==4)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }
      else if(e.package==5)
                {
                
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                     k +=  '<i class="fa icon-star3 text-warning star-yellow"></i>'
                 }
              else
                {
                
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                     k +=  '<i class="fa icon-star3 star-grey"></i>'
                 }  */  
    
     k +='</td>'

     k +='</td>'
     k +='</tr>'
     k +='</table>'
     k +='</div>'
     k+='</div>'<!--col-md-12-->
     k+= '</div>'<!--row-->


     k +='<div class="row">'
     k +='<div class="col-md-6 col-md-offset-3">'
	 
	 if (Forms.Form.ad.type == "create") {
			
				
				k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Business_Review.Save()"><?=$lang_resource['ADMIN_PAGE_DRIVER_CREATE'] ?></button></center>'
			} else {
				k += '<center><button type="submit" onclick="Business_Review.Save()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['BUSINESSREVIEW_UPDATE'] ?></button></center>'
			}
	 
     //k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Business_Review.Save()"><?=$lang_resource['BUSINESSREVIEW_UPDATE']?></button></center>'
     k +='</div>'
     k +='</div>'

    <!--row-->





		
		Popup.Show(k);


    if (Forms.Form.ad.type != "create") {      
      Business_Review.CalculateReviewRatings("quli_"+e.quality)
      Business_Review.CalculateReviewRatings("punc_"+e.delivery)
      Business_Review.CalculateReviewRatings("serv_"+e.service)
      Business_Review.CalculateReviewRatings("pack_"+e.package)
    }
		
       
      
        
    },

    Delete: function () {
    
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
      alert("<?=$lang_resource['BUSINESSREVIEW_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
    
    $.fn.jAlert({
      'message': '<?=$lang_resource['BUSIENESSREVIEW_DELETE_MSG']?>',
      'btn': [
        {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
          $.post("lib/Business_Review.php", "f=DeleteBusinessReview&data=" + JSON.stringify(a),  function (c) {
            alert('<?=$lang_resource['BUSINESSREVIEW_DELETE_SUCCESS']?>');
            Business_Review.Main()
          
          });
        } },
        {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
      ],
      'closeBtn': false
      
      });
    },
   
    PreValidation: function(){
        var count = 0;   
    },

    Save: function () {
		
		
		
		
		
      var quli = $('#quli').val();
      var punc = $('#punc').val();
      var serv = $('#serv').val();
      var pack = $('#pack').val();
	  
	
	if(e.w_id_business==''){
	//if(document.getElementById("id_w_business").value ==""){
		alert('<?= $lang_resource['ADD_PHOTO_SHOP_VALIDATION'] ?>');
		return false;
	}
	else if(!quli){
		alert('<?= $lang_resource['FRONT_QTY_RATING'] ?>');
		return false;
	}
	else if(!punc){
		alert('<?= $lang_resource['FRONT_PUNC_RATING'] ?>');
		return false;
	}
	else if(!serv){
		alert('<?= $lang_resource['FRONT_SERV_RATING'] ?>');
		return false;
	}
	else if(!pack){
		alert('<?= $lang_resource['FRONT_PACK_RATING'] ?>');
		return false;
	}
	  
	  
	  
      Forms.CreateValue("ad", "quality", quli,true)
      Forms.CreateValue("ad", "delivery", punc,true)
      Forms.CreateValue("ad", "dealer", serv,true)
      Forms.CreateValue("ad", "package", pack,true) 

      for(var s in Forms.Form.ad.fields){			
        Forms.Form.ad.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].value)))
        Forms.Form.ad.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].ivalue)))
      }

      Main.Request("Business_Review", null, "f=SaveBusinessReview&data=" + JSON.stringify(Forms.Form.ad), "Business_Review.Main()");

      Popup.Close();
      Forms.Clean("ad")
    },

    CalculateReviewRatings:function(id)
{

  var st_split = id.split("_");
  var hiddenfieldid = st_split[0];
  var hiddenfieldval = st_split[1]; 
  
  $("#"+hiddenfieldid).val(hiddenfieldval);
  for(var i = 1;i <= hiddenfieldval;i++){
  var iid = hiddenfieldid+"_";
  $("#"+iid+i).removeClass("star-grey");
  $("#"+iid+i).addClass("text-warning");
  $("#"+iid+i).addClass("star-yellow");
  }
  
  var idnext = (parseInt(hiddenfieldval) + 1);
  for(var j = idnext;j <= 5;j++){
  var jid = hiddenfieldid+"_";
  $("#"+jid+j).removeClass("star-grey");
  $("#"+jid+j).removeClass("yellow_star");
  $("#"+jid+j).removeClass("text-warning");
  $("#"+jid+j).addClass("star-grey");
  }

},
    
};
