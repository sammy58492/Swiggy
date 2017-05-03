var Catagories = {
	Main: function(){
		Catagories.namelang = Array(); 
		if(Business.id){
			Main.Loading();
			var a = new Date().getTime();
		    Main.Aid = a;
			Catagories.galleryflag = false;
			$.post("lib/catagories.php", "f=FetchAllCategoriesData&id="+Business.id, function (b) {
				Catagories.cat = JSON.parse(b);
				if (a != Main.Aid) {
                return
            }
	            Main.Ready();
	            Catagories.PrintMain();
	        });
		}else{
			var N=''
	        N += '<div class="col-md-12">'
			N += '<div class="the-box">'
			N += '<div class="clearfix" style="padding:5px 0">'
			N +='<p class="text-center"><?= $lang_resource['ADMIN_PAGE_PLEASE_CREATE_BUSINESS_FIRST'] ?></p>'
			N += '</div></div></div>'
			document.getElementById("tab_catagories").innerHTML = N;
		}
	},
	PrintMain: function(){

		var n =''
		n +='<div class="panel panel-danger panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'  
		n +='<div class="row">'
		n +='<div class="col-md-4">'
		n +='<h3 class="panel-title-2"><?= $lang_resource['ADMIN_PAGE_CATEGORIES'] ?></h3>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-3">'
		n +='<div class="panel-btn filtr_margin">'
		n +='<input type="text" id="catsearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-5">'
		n +='<div class="panel-btn pull-right">'
		n +='<div class="inline-popups ">'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Catagories.Form()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?= $lang_resource['BUSINESS_ADD'] ?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Catagories.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?= $lang_resource['BUSINESS_EDIT'] ?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" href="#" onclick="Catagories.Delete()"><i class="fa icon-remove2"></i> <?= $lang_resource['BUSINESS_DELETE'] ?></button></span>'
		n +='</div>'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='</div>'
		<!--row-->
		n +='</div>'
		n +='<div class="panel-body">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped tbl_enebal">'
		n +='<thead>'
		n +='<tr>'
		n +='<th width="10%">ID</th>'
		n +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'checkbox\')"><?=$lang_resource['ADMIN_PAGE_ALL'] ?></th>'
		n +='<th width="25%"><?=$lang_resource['ADMIN_PAGE_CATEGORY_NAME'] ?></th>'
		n +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_CATEGORY_RANK'] ?></th>'
		n +='<th width="25%"><?=$lang_resource['ADMIN_PAGE_CATEGORY_SELECT_RANK'] ?></th>'
		n +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_CATEGORY_ENABELED'] ?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="catagories_tab">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'

		$("#tab_catagories_1").empty().append(n);
		ExtraAdmin.SubCategories();
		document.getElementById("catsearch").onkeyup = function () {
          Catagories.PopulateTable();
        };
   		Catagories.PopulateTable();
	},
	PopulateTable: function(){
		var n =''
		var j = false;
        var g = "";
        var l = new Array();
		for (var f in Catagories.cat) {	
			j = false;
            g = document.getElementById("catsearch").value.toLowerCase();
            if (String(Catagories.cat[f].id).indexOf(g) >= 0 || Main.NullToEmpty(Catagories.cat[f].name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(Catagories.cat[f])
           }
        if(j){
		n +='<tr>'
		n +='<td>'+Catagories.cat[f].id+'</td>'
		n +='<td><input type="checkbox" class="checkbox" value="'+Catagories.cat[f].id+'"></td>'
		n +='<td class="hand" onclick="Catagories.Edit(' + Catagories.cat[f].id + ')">'+Catagories.cat[f].name+'</td>'
		n +='<td>'+Catagories.cat[f].rank+'</td>'
		n +='<td>'
		n +='<select class="status_combo" style="width:165px;" onchange="Catagories.SortCatagories(this.value,'+Catagories.cat[f].rank+')" >'
        for(var i=1; i<=Catagories.cat[f].maxrank; i++){
            if(Catagories.cat[f].rank == i){
            n +='<option value="'+i+'" selected="selected">'+i+'</option>'
            }else{
            n +='<option value="'+i+'">'+i+'</option>'
            }
        }
		n +='</select>'
		n +='</td>'
		n +='<td><div class="enebal" id="switch_catagories_' + Catagories.cat[f].id + '"></div></td>'
		n +='</tr>'
		
		}
		}
		document.getElementById("catagories_tab").innerHTML = n;
        
		var h = false;
       
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_catagories_" + l[e].id, h);
            Switch.OnChange("switch_catagories_" + l[e].id, function (m, i) {
                Catagories.SetEnabled(m.replace("switch_catagories_", ""), i)
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

		$.post("lib/catagories.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {			
			if (c != "ok") {
				Switch.SwitchTo("switch_catagories_" + b, !a)
			}
		})
    },
	SortCatagories:  function (h,l) {
	    $.post("lib/catagories.php", "f=ChangeRank&destrank="+h+"&sourcerank="+l+"&bid="+Business.id, function (a) {
	    	
	    	Catagories.Main();
	    });
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
           
		     $.post("lib/catagories.php", "f=FetchCategoriesData&id=" + a, function (b) {
				
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				Catagories.PreEdit(b);
				
			 })
        }
    },
	
	PreEdit: function (a) {
		//alert(a);
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
		
		this.Form(a);
		   
    },
	
	show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("cname_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("cname_"+id).style.display  = "block";
    },
	
	Form: function (e) {
		
		 Forms.Clean("catg", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.catg.type = "create"
        } else {
            Forms.Form.catg.type = "modify";
            Forms.Form.catg.id = e.id
        }
		 Forms.Form.catg.catg = e;
        this.ActiveForm = "catg";
		
         var k = "";
		 

		 if (Forms.Form.catg.type == "create") {
		 
        	k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_SELECT_CATEGORY'] ?></h3>'
		 }
		 else
		 {
			k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_UPDATE_CATEGORY'] ?></h3>' 
		 }
		 
		 k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Catagories.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Catagories.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Catagories.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->
		 
        k += '<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_CATEGORY'] ?></label>'
		
		Forms.CreateValue("catg", "name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.catg.type == "create") {
                if(flaginfo[p].id == Catagories.langdefault){   
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="Catagories.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="Catagories.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == Catagories.langdefault){   
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="Catagories.PreValidation()" value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="Catagories.PreValidation()" value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
		
        //k +=Forms.CreateInputPropertyPopup("catg", "cname", e.name, true, "Catagories.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="categoryyname_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_NAME_DM'] ?></small>'
		k +='<small data-bv-validator="notEmpty" class="help-block" id="categoryyname1_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_THE_CATEGORY_NAME_CAN_NOT_DUPLICATE'] ?></small>' 
		k +='</div>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
		
		
		
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_IMAGE'] ?></label>'
        k +='<div class="input-group">'
		k +='<input type="text" class="form-control rounded" id="imagefile9" readonly>'
		k +='<span class="input-group-btn">'
		k +='<span class="btn btn-default btn-file btn-light rounded">'
		
			
		k +='<form id="uform_bimg9" name="uform_bimg9" enctype="multipart/form-data" method="post" >';
		k +='<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD'] ?><input id="uploadImage9" type="file" name="uploadImage" onChange="Catagories.PreviewImage(9);" >'
		k += '<input id="showImage9" name="showImage9" type="hidden" value=""  />';
		k += '<input type="submit" name="submit" onclick="Catagories.triggerImageupload(9)" style="display:none" />';
		k += '</form>';
		   
		k +='</span>'
		k +='</span>'
		k +='</div>'<!-- /.input-group -->
        k +='<small style="font-weight:400; "><?=$lang_resource['ADMIN_PAGE_SIZE'] ?> 125 px X 125 px ( PNG or JPG file)</small>'
		var m = "";
        if (e.id) {
		  if(e.isimg == 0) {
		  	m = "../admin/images/dummy/product-img.png";
		  } else {
			Catagories.galleryflag = false;  
		  	m = "../panel/images/categories/" + Main.NullToEmpty(e.id) + "/1/panel.jpg?c=" + new Date().getTime();
		  }
		}else {
		  m = "../admin/images/dummy/product-img.png";
    	}
		
        k +='<span class=" clearfix logoupload-2"><img class="user-img" id="uploadPreview9" src="' + m + '"  ></span>'
									
		k +='</div>'
		//k +='<small data-bv-validator="notEmpty" class="help-block" id="user_img_text" style="color:#F00;display:none;">The Image Upload is required</small>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
		
		
		
		if (Forms.Form.catg.type == "create") {
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Catagories.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE'] ?></button></center>'
		}
		else
		{
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Catagories.Save()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE'] ?></button></center>'	
		}
        k +='</div>'<!--col-md--->
                  
        k +='</div>'<!--row-->
		Forms.CreateValue("catg", "business", Business.id,true);  
		
		Popup.Show(k);
		if (Forms.Form.catg.type == "create") {
		if(Catagories.cat[0]){
	    var	max1= parseInt(parseInt(Catagories.cat[0].maxrank)+1);
		}else{
		 var max1=1;	
		}
		Forms.CreateValue("catg", "rank", max1, true);  
		}else{
			Forms.CreateValue("catg", "rank", e.rank, true);  
		}
		
		 
		$("#name").focus()
    },
	
	Delete: function () {
        var c = Main.GetMarkedCheckBoxesValuesByClass('checkbox');
        if (c.length == 0) {
			alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_CHECBOX_SELECT']?>");
            return
        }
        var d = new Object();
        d.ids = c;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_CATEGORY']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/catagories.php", "f=DeleteCategory&data=" + JSON.stringify(d)+"&bid="+Business.id, function (e) {
						Catagories.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
			
			
       
    },
	
	PreValidation: function(){
        
    var count = 0;  
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Catagories.langdefault){
    	if(document.getElementById("cname_"+flaginfo[Z].id).value == ""){
            $("#categoryyname_text").show();
            $("#cname_"+flaginfo[Z].id).addClass("error-text-field");
            $("#cname_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#categoryyname_text").hide();
            $("#cname_"+flaginfo[Z].id).addClass("success-text-field");
            $("#cname_"+flaginfo[Z].id).removeClass("error-text-field");
        }
        
		}
			var namedata = document.getElementById("cname_"+flaginfo[Z].id).value;
            Catagories.namelang[flaginfo[Z].id] = namedata;
	}
    

		  /*if(Catagories.galleryflag == false && Forms.Form.catg.type == "create"){
            
            $("#user_img_text").show();
            $(".user-img").addClass("error-text-field");
            $(".user-img").removeClass("success-text-field");
            count ++;
        }else{
            $("#user_img_text").hide();
            $(".user-img").addClass("success-text-field");
            $(".user-img").removeClass("error-text-field");
        }*/
        
        
        
        if(count == 0)
            return true
        else 
            return false
        
       
    },
	
	Save: function () {
	  
		 if(Catagories.PreValidation() != true){
            return false     
         }
      
		Forms.UpdateValue("catg", "name", Catagories.namelang,true);
          

         if(document.getElementById("showImage9").value !="") {		
			Forms.Form.catg.image = document.getElementById("showImage9").value;
		}
        
		for(var s in Forms.Form.catg.fields){			
			Forms.Form.catg.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.catg.fields[s].value)))
			Forms.Form.catg.fields[s].value = Forms.Form.catg.fields[s].value.split("+").join("@@");
			Forms.Form.catg.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.catg.fields[s].ivalue)))
			Forms.Form.catg.fields[s].ivalue = Forms.Form.catg.fields[s].ivalue.split("+").join("@@");
		} 
		
		for(var k in Forms.Form.catg.catg){			
			Forms.Form.catg.catg[k] = window.btoa(unescape(encodeURIComponent(Forms.Form.catg.catg[k])))
			Forms.Form.catg.catg[k] = Forms.Form.catg.catg[k].split("+").join("@@");
			
		}
		
        /* Duplicate Name Validation */
        Main.Loading();		    
		
        $.post("lib/catagories.php", "f=GetNameAvailabilty&data=" + JSON.stringify(Forms.Form.catg), function (e) {
        	Main.Ready();
            if (e == "cancel") { 
            	$("#categoryyname1_text").show();
	            $("#cname").addClass("error-text-field");
	            $("#cname").removeClass("success-text-field");	
				
				for(var s in Forms.Form.catg.fields){			
				Forms.Form.catg.fields[s].value = decodeURIComponent(escape(window.atob(Forms.Form.catg.fields[s].value)))
				Forms.Form.catg.fields[s].ivalue = decodeURIComponent(escape(window.atob(Forms.Form.catg.fields[s].ivalue)))
				Forms.Form.catg.fields[s].value = Forms.Form.catg.fields[s].value.split("@@").join("+");
				Forms.Form.catg.fields[s].ivalue = Forms.Form.catg.fields[s].ivalue.split("@@").join("+");
			}
			for(var k in Forms.Form.catg.catg){			
			Forms.Form.catg.catg[k] = decodeURIComponent(escape(window.atob(Forms.Form.catg.catg[k])));
			Forms.Form.catg.catg[k] = Forms.Form.catg.catg[k].split("@@").join("+");
			
			}              
        	}else{
        	
	            var b = new Date().getTime();
		        Main.Aid = b;
		        Main.Loading();

			    $.post("lib/catagories.php", "f=SaveCategories&data=" + JSON.stringify(Forms.Form.catg), function (f){
		            Main.Ready();
		            if (b != Main.Aid){
		            	return;
		            }
				    Popup.Close();	
					Catagories.Main();
				});
			    Forms.Clean("catg")
        	}            
        })     	    
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
			Catagories.galleryflag = true;
			Catagories.PreValidation()
			
        };
		
    },
	
    
};