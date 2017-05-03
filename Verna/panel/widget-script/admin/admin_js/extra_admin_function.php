<?php
session_start();
require_once('../login/common.php');
require_authentication(0);      
?>
var IS_GLOBAL_SELLER = '';
var IS_GLOBAL_ORIGIN = '';
ExtraAdmin = {
    Dishform: function (j,p) {
    var c ='<div class="row">';	
    c +='<div class="col-md-6">'
    c +='<div class="form-group">'
    c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_ORIGIN'] ?></label>'
    
    
    Forms.CreateValue("dish", "dish_origin_winelibary", "",true)
		flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if(p.thirdparty) {
            	 if(flaginfo[v].id == Products.langdefault){   
                    c +='<input type="text" id="dish_origin_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.origin_winelibary[flaginfo[v].id])+'" />' 
                }else{
                    c +='<input type="text" id="dish_origin_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.origin_winelibary[flaginfo[v].id])+'" style="display:none;" />' 
                } 
                   
            }else{
               if(flaginfo[v].id == Products.langdefault){   
                    c +='<input type="text" id="dish_origin_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="" />' 
                }else{
                    c +='<input type="text" id="dish_origin_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                } 
            }     
        }
    
    
    
    
    
    
    <!--c +='<small data-bv-validator="notEmpty" class="help-block"  style="color:#F00;display:none;"><?//$lang_resource['VALIDATION_PRODUCT_CATEGORY']?></small>'-->
    c +='</div>'
    c +='</div>'<!--col-md-4-->


    c +='<div class="col-md-6">'
    c +='<div class="form-group">'
    c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_SELLER'] ?></label>'
    /*if(p.thirdparty) {
      c +=Forms.CreateInputPropertyPopup("dish", "dish_seller_winelibary", p.thirdparty.seller_winelibary, false,"Products.PreValidation()")
    }  else  {
      c +=Forms.CreateInputPropertyPopup("dish", "dish_seller_winelibary", "", false,"Products.PreValidation()")
    }*/
    
     Forms.CreateValue("dish", "dish_seller_winelibary", "",true)
		flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if(p.thirdparty) {
            	 if(flaginfo[v].id == Products.langdefault){   
                    c +='<input type="text" id="dish_seller_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.seller_winelibary[flaginfo[v].id])+'" />' 
                }else{
                    c +='<input type="text" id="dish_seller_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.seller_winelibary[flaginfo[v].id])+'" style="display:none;" />' 
                } 
                   
            }else{
               if(flaginfo[v].id == Products.langdefault){   
                    c +='<input type="text" id="dish_seller_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="" />' 
                }else{
                    c +='<input type="text" id="dish_seller_winelibary_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                } 
            }     
        }
    
    
    
    
    c +='<small data-bv-validator="notEmpty" class="help-block"  style="color:#F00;display:none;"><? //$lang_resource['VALIDATION_PRODUCT_PRICE']?></small>'
    c +='</div>'
    c +='</div>'
    c +='</div>';

    return c;
  },
  DishformSubcategory:function(j,p){
    
    	var c = '';
        c +='<div class="row">'	 
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_CATEGORY'] ?></label>'
        c +=Forms.CreateSelectPropertyPopup("dish", "dish_category", j, p.category, true,"Products.SubCategorySelected(this);Products.PreValidation()")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="category_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_CATEGORY']?></small>'
        c +='</div>'
        c +='</div>'
       
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_PRICE'] ?></label>'
        c +=Forms.CreateInputPropertyPopup("dish", "dish_price", p.price, true,"Products.PreValidation()",false, false, "return Main.IsNumberKey(event)","")
		c +='<small data-bv-validator="notEmpty" class="help-block" id="dish_price_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_PRICE']?></small>'
        c +='</div>'
        c +='</div>'
		
		<!--col-md-4-->
        c +='</div>'<!--row-->
        c +='<div class="row">'	
         c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_SUBCATEGORY'] ?></label>'
        c += Forms.CreateSelectPropertyPopup("dish", "dish_subcategory", [], Main.NullToEmpty(p.subcategory), true,"Products.PreValidation()")
		//c +='<small data-bv-validator="notEmpty" class="help-block" id="dish_price_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_PRICE']?></small>'
        c +='</div>'
        c +='</div>'
         var H1 = false;
        if (p.feature == "t") {
            H1 = true
        }
         c +='<div class="col-md-6" style="margin-top:25px;">'
        c +='<div class="form-group">'
        c +=Forms.CreateCheckBoxPropertyAdmin("dish", "dish_feature", H1)
        c +='<label for="dish_feature" class="hand">&nbsp;</label><?=$lang_resource['PRODUCT_FEATURED']?></div>'
    
        
        c +='</div>'
        <!--col-md-12-->
        c +='</div>'
        
        c +='</div>'<!--row--> 
        
       

        
        return c;
    
    },
  
  SubCategories: function(){

			Main.Loading();
			var a = new Date().getTime();
		    Main.Aid = a;
            ExtraAdmin.namelang = Array();
			$.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=FetchAllSubCategoriesData&id="+Business.id, function (b) {
				ExtraAdmin.Subcat = JSON.parse(b);
              
				if (a != Main.Aid) {
                return
            }
	            Main.Ready();
	            ExtraAdmin.PrintMainSubcate();
	        });

    },
    PrintMainSubcate: function(){
    var n =''
		n +='<div class="panel panel-danger panel-no-border">'
		n +='<div class="panel-heading panel-heading-2">'  
		n +='<div class="row">'
		n +='<div class="col-md-4">'
		n +='<h3 class="panel-title-2"><?= $lang_resource['BUSINESS_TAB_PRODUCT_SUBCATEGORY'] ?></h3>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-3">'
		n +='<div class="panel-btn filtr_margin">'
		n +='<input type="text" id="subcatsearch" class="form-control rounded panel-red-field white-placeholder" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
		n +='</div>'
		n +='</div>'
		<!--col-md-4-->
		n +='<div class="col-md-5">'
		n +='<div class="panel-btn pull-right">'
		n +='<div class="inline-popups ">'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:ExtraAdmin.ProductCatagories()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?= $lang_resource['BUSINESS_ADD'] ?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:ExtraAdmin.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?= $lang_resource['BUSINESS_EDIT'] ?></a>'
		n +='</span>'
		n +='<span class=" panel-btn-2">'
		n +='<button class="btn btn-default btn-rounded-lg panel-red-btn" href="#" onclick="ExtraAdmin.SubcateDelete()"><i class="fa icon-remove2"></i> <?= $lang_resource['BUSINESS_DELETE'] ?></button></span>'
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
		n +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'subcate\')"><?=$lang_resource['ADMIN_PAGE_ALL'] ?></th>'
		n +='<th width="25%"><?=$lang_resource['ADMIN_PAGE_CATEGORY_NAME'] ?></th>'
		n +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_CATEGORY_ENABELED'] ?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody id="catagories_subtab">'
		
		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		<!--table-responsive-->
		n +='</div>'
		<!-- /.panel-body -->
		n +='</div>'
        $("#tab_catagories_2").empty().append(n);
        document.getElementById("subcatsearch").onkeyup = function () {
          ExtraAdmin.PopulateTable();
        };
   		ExtraAdmin.PopulateTable();
    
    },
    PopulateTable: function(){
		var n =''
		var j = false;
        var g = "";
        var l = new Array();
		for (var f in ExtraAdmin.Subcat) {	
			j = false;
            g = document.getElementById("subcatsearch").value.toLowerCase();
            if (String(ExtraAdmin.Subcat[f].id).indexOf(g) >= 0 || Main.NullToEmpty(ExtraAdmin.Subcat[f].name).toLowerCase().indexOf(g) >= 0) {
                j = true;
                l.push(ExtraAdmin.Subcat[f])
           }
        if(j){
		n +='<tr>'
		n +='<td>'+ExtraAdmin.Subcat[f].id+'</td>'
		n +='<td><input type="checkbox" class="checkbox subcate" value="'+ExtraAdmin.Subcat[f].id+'"></td>'
		n +='<td class="hand" onclick="ExtraAdmin.Edit(' + ExtraAdmin.Subcat[f].id + ')">'+ExtraAdmin.Subcat[f].name+'</td>'
		
		n +='<td><div class="enebal" id="switch_subcatagories_' + ExtraAdmin.Subcat[f].id + '"></div></td>'
		n +='</tr>'
		
		}
		}
		document.getElementById("catagories_subtab").innerHTML = n;
        
		var h = false;
       
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_subcatagories_" + l[e].id, h);
            Switch.OnChange("switch_subcatagories_" + l[e].id, function (m, i) {
                ExtraAdmin.SetEnabled(m.replace("switch_subcatagories_", ""), i)
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

		$.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {			
			if (c != "ok") {
				Switch.SwitchTo("switch_subcatagories_" + b, !a)
			}
		})
    },
    show_id: function(id){
    
    	var b = document.getElementById("category").value;
    	 $.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=FetchAllBusinessCategoryIDData&data=" + id+"&id=" + Business.id, function (d) {		
            if (d != "") {
              var f = JSON.parse(d);
            
             var e = document.getElementById("category");
             e.options.length = 0;
             e.options[e.options.length] = new Option("", "");
             
             
             var h = 0;
                var j = false;
				
                for (var d in f) {
                    if (b) {
                        if (f[d].id == b) {
                            h = d;
                            j = true
                        }
                    }
					
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {				
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.subcatg.fields.category.value = "";                   
                }
                
                
             }
        });
    
    
    
    
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("cname_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("cname_"+id).style.display  = "block";
    },
    
    ProductCatagories: function(){
        $.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=FetchAllCategory&id=" + Business.id, function (a) {           
                ExtraAdmin.categories = JSON.parse(a);
                ExtraAdmin.SubcateForm()                
        }); 
    },
	
    
    Edit: function (h, l) {
		//$('div[id*=newpopup]').remove();
        var i = false;
        if (h) {
            i = true;
            Visuals.ForceMainButtonCancelEvent = l
        } else {
            var j = Main.GetMarkedCheckBoxesValuesByClass('subcate');
            if (j.length == 1) {
                h = j[0];
                i = true
            }
			else if(j.length >1)
			{
				alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CHECBOX_SELECT_ONE']?>");
				return;
			}
			else
			{
				alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CHECBOX_SELECT_EDIT'] ?>");
			    return;
			}
			
        } if (i) {
            var k = this;
       
            $.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=GetSubCategoryData&id=" + h, function (a) {                
                if (a != "") {
                   $.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=FetchAllCategory&id=" + Business.id, function (b) {        
                             ExtraAdmin.categories = JSON.parse(b);
                            ExtraAdmin.SubcateForm(JSON.parse(a))                  
                    }); 
                    
                } else {
                    alert("Error")
                }
            })
        }
    },
    
    
    
    
	SubcateForm: function (e) {
		
		 Forms.Clean("subcatg", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.subcatg.type = "create"
        } else {
            Forms.Form.subcatg.type = "modify";
            Forms.Form.subcatg.id = e.id
        }
		 //Forms.Form.subcatg.subcatg = e;
        this.ActiveForm = "subcatg";
		
         var k = "";
		 

		 if (Forms.Form.subcatg.type == "create") {
		 
        	k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_SELECT_SUBCATEGORY'] ?></h3>'
		 }
		 else
		 {
			k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_UPDATE_SUBCATEGORY'] ?></h3>' 
		 }
		 
		 k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                ExtraAdmin.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="ExtraAdmin.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
                k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="ExtraAdmin.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->
		 
        k += '<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_SUBCATEGORY'] ?></label>'
		
		Forms.CreateValue("subcatg", "name", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.subcatg.type == "create") {
                if(flaginfo[p].id == ExtraAdmin.langdefault){   
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="ExtraAdmin.PreValidation()"  value="" />' 
                }else{
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="ExtraAdmin.PreValidation()"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == ExtraAdmin.langdefault){   
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="ExtraAdmin.PreValidation()" value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="cname_'+flaginfo[p].id+'" class="form-control" onkeyup="ExtraAdmin.PreValidation()" value="'+Main.NullToEmpty(e.name[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }

		k +='<small data-bv-validator="notEmpty" class="help-block" id="subcategoryname_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_NAME_DM'] ?></small>'
		
		k +='</div>'
        k +='</div>'<!--col-md-12-->
        k +='</div>'<!--row-->
		
        
        k +='<div class="row">'		
	
		var j = new Array();
        j.push(JSON.parse('{"id":"","caption":""}'));
       
        for(var pc in ExtraAdmin.categories){
            var n = new Object();
            n.id = ExtraAdmin.categories[pc].id;
            n.caption = ExtraAdmin.categories[pc].name;
            j.push(n);
        }
		
		
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_CATEGORY'] ?></label>'
        k +=Forms.CreateSelectPropertyPopup("subcatg", "category", j, e.category, true,"ExtraAdmin.PreValidation()")
		k +='<small data-bv-validator="notEmpty" class="help-block" id="category_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_CATEGORY']?></small>'
        k +='</div>'
        k +='</div>'<!--col-md-4-->
        k +='</div>'
        
        
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
		
		
		
		if (Forms.Form.subcatg.type == "create") {
        k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ExtraAdmin.SubcategorySave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE'] ?></button></center>'
		}
		else
		{
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ExtraAdmin.SubcategorySave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE'] ?></button></center>'	
		}
        k +='</div>'<!--col-md--->
                  
        k +='</div>'<!--row-->
		Forms.CreateValue("subcatg", "business", Business.id,true);  
		Popup.Show(k);

		
		 
		$("#name").focus()
    },
    PreValidation: function(){
        
    var count = 0;  
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == ExtraAdmin.langdefault){
    	if(document.getElementById("cname_"+flaginfo[Z].id).value == ""){
            $("#subcategoryname_text").show();
            $("#cname_"+flaginfo[Z].id).addClass("error-text-field");
            $("#cname_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#subcategoryname_text").hide();
            $("#cname_"+flaginfo[Z].id).addClass("success-text-field");
            $("#cname_"+flaginfo[Z].id).removeClass("error-text-field");
        }
        
		}
			var namedata = document.getElementById("cname_"+flaginfo[Z].id).value;
            ExtraAdmin.namelang[flaginfo[Z].id] = namedata;
	}
   
    if(document.getElementById("category").value == ""){
            $("#category_text").show();
            $("#category").addClass("error-text-field");
            $("#category").removeClass("success-text-field");
            count ++;
        }else{
        	$("#category_text").hide();
            $("#category").addClass("success-text-field");
            $("#category").removeClass("error-text-field");
        }
       
        
        if(count == 0)
            return true
        else 
            return false
        
       
    },
    
    SubcategorySave: function () {
	  
		 if(ExtraAdmin.PreValidation() != true){
            return false     
         }
         Forms.UpdateValue("subcatg", "name", ExtraAdmin.namelang,true);
        
         for(var s in Forms.Form.subcatg.fields){			
			Forms.Form.subcatg.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.subcatg.fields[s].value)))
			Forms.Form.subcatg.fields[s].value = Forms.Form.subcatg.fields[s].value.split("+").join("@@");
			Forms.Form.subcatg.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.subcatg.fields[s].ivalue)))
			Forms.Form.subcatg.fields[s].ivalue = Forms.Form.subcatg.fields[s].ivalue.split("+").join("@@");
            
		} 
        var b = new Date().getTime();
		        Main.Aid = b;
		        Main.Loading();
    	$.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=SaveSubCategories&data=" + JSON.stringify(Forms.Form.subcatg), function (f){
		            Main.Ready();
		            if (b != Main.Aid){
		            	return;
		            }
				    Popup.Close();	
					Catagories.Main();
				});
			    Forms.Clean("catg")    
        
    },
    
    SubcateDelete: function () {
		var b = Main.GetMarkedCheckBoxesValuesByClass('subcate');
        if (b.length == 0) {
			alert("Please select at least one item");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("../panel/wine-libery/admin/admin_lib/commonadmin.php", "f=DeleteSubCate&data=" + JSON.stringify(a), function (e) {
						Catagories.Main();
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});		
	
    },
     templateSettingMenubar: function(){
    
           var  c = '<li><a href="javascript:Logoimage.Main();" onClick="Website.addBtn(1);" class="active"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_LOGO']?></a></li>'
            c += '<li><a href="javascript:HomeHeader.Main();" onClick="Website.addBtn(2);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_HOMEPAGE_HEADER']?></a></li>'
            c += '<li><a href="javascript:FooterPage.Main();" onClick="Website.addBtn(5);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_FOOTER']?></a></li>'
            c += '<li><a href="javascript:Checkout.Main();" onClick="Website.addBtn(7);"><?=$lang_resource['ADMIN_PAGE_WEBSITE_SETTING_CHECKOUT']?></a></li>'
            
            return c;

          }
        
};
