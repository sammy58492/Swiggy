var Products={
    Main: function(){
        
        Products.namelang = Array();
        Products.descriptionlang = Array();
        Products.origin = Array();
        Products.seller = Array();
        
        Main.businessid =Business.id;    
        
        if(Business.id){
            Main.Loading(); 
            
             var a = new Date().getTime();
             Main.Aid = a;  
             
             if (a != Main.Aid) {
                return
            }
                Main.Ready();
                Products.PrintMain();
               
             
            
            

        }else{

            var N='';
            N += '<div class="col-md-12">'
            N += '<div class="the-box">'
            N += '<div class="clearfix" style="padding:5px 0">'
            N +='<p class="text-center"><?=$lang_resource['ADMIN_PAGE_PRODUCTS_PLEASE_CREATE_BUSINESS']?></p>'
            N += '</div></div></div>'
           $("#tab_dishes").empty().append(N); 
        }
        
        
        
        
        
        
        
    },

    
PrintMain: function(){
    
    var N ='<div class="panel panel-danger panel-no-border">'
            N +='<div class="panel-heading panel-heading-2">'
            N +='<div class="row">'
            N +='<div class="col-md-2">'
            N +='<h3 class="panel-title-2"><?=$lang_resource['BUSINESS_TAB_PRODUCT_HEADING'] ?></h3>'
            N +='</div>'
            <!--col-md-5-->
            N +='<div class="col-md-3">'
            N +='<div class="panel-btn filtr_margin">'
            N +='<input type="text" id="search"  onkeyup="Products.keyupsearch(this)" class="form-control rounded panel-red-field white-placeholder" placeholder="Filter">'
            N +='</div>'
            N +='</div>'
            <!--col-md-3-->
            N +='<div class="col-md-7">'
            N +='<div class="panel-btn pull-right">'
            N +='<div class="inline-popups ">'
            N +='<span class=" panel-btn-2">'
            N +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Products.ProductCatagoriesDish()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i><?=$lang_resource['BUSINESS_TAB_PRODUCT_ADD'] ?></a>'
            N +='</span>'
            N +='<span class=" panel-btn-2">'
            N +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Products.EditDish()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_TAB_PRODUCT_EDIT'] ?></a>'
            N +='</span>'
            N +='<span class=" panel-btn-2">'
            N +='<button class="btn btn-default btn-rounded-lg panel-red-btn" href="#" onclick="Products.DeleteDish()"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_TAB_PRODUCT_DELETE'] ?></button></span>'
            N +='<span class=" panel-btn-2">'
            N +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Products.FileCsvDish()" data-effect="mfp-zoom-in"><i class="fa icon-upload"></i> <?=$lang_resource['ADMIN_PAGE_PRODUCTS_UPLOA_CSV']?></a>'
            N +='</span>'
            
            N +='</div>'
            N +='</div>'
            N +='</div>'
            <!--col-md-4-->
            N +='</div>'
            <!--row-->
            N +='</div>'
            N +='<div class="panel-body">'
            N +='<div class="table-responsive">'
            N +='<table class="table table-th-block table-striped tbl_enebal">'
            N +='<thead>'
            N +='<tr>'
            N +='<th width="7.5%" onclick="Products.PupulateDishesTable(\'id\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_SL'] ?></th>'
            N +='<th width="7.5%" onclick="Main.ToogleAllCheckBoxes(\'productselement\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_ALL'] ?></th>'
            N +='<th width="20%" onclick="Products.PupulateDishesTable(\'name\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_NAME'] ?></th>'
            N +='<th width="20%" onclick="Products.PupulateDishesTable(\'category\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_CATEGORY'] ?></th>'
            N +='<th width="20%" onclick="Products.PupulateDishesTable(\'price\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_PRICE'] ?></th>'
			
			if(Main.configsettings == 1){	
            N +='<th width="20%" onclick="Products.PupulateDishesTable(\'stock_qty\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_AVAILABLE_STOCK'] ?></th>' 
			}
            if(Main.PointPermission=='1' && IS_SCRIPTID == '0'){
           
            N +='<th width="20%" onclick="Products.PupulateDishesTable(\'price\')"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_POINTS'] ?></th>'
            }
            N +='<th width="15%"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_ENABLE'] ?></th>'
            N +='</tr>'
            N +='</thead>'
            N +='<tbody id="dishes">'
            N +='</tbody>'
            N +='</table>'
            N +='</div>'
            <!--table-responsive-->
            N +='</div>'
            <!-- /.panel-body -->
            N +='</div>'
    
     $("#tab_dishes").empty().append(N); 
    Products.GetDishes(null, true);
        /*if (!c) {
            Main.SaveConfig()
        }*/

      /*  document.getElementById("bproducts").onkeyup = function () {
            Products.PupulateDishesTable(Main.Config.Business.List.SortBy, true)
        };*/
    
},
    
 keyupsearch: function(a){
    document.getElementById("search").value = a.value;
    Products.PupulateDishesTable(Main.Config.Business.List.SortBy, true)   
},   
    
    PupulateDishesTable: function (j, h) {
        var k = "";
        var l = this.Dishes.length;
        if (h) {
            this.Dishes.sort(Main.SortByProperty(j));
            if (Main.Config.Dishes.List.SortByStatus == "max") {
                this.Dishes.reverse()
            }
        } else {
            if (Main.Config.Dishes.List.SortBy != j) {
                this.Dishes.sort(Main.SortByProperty(j));
                Main.Config.Dishes.List.SortByStatus = "min"
            } else {
                this.Dishes.reverse();
                if (Main.Config.Dishes.List.SortByStatus == "min") {
                    Main.Config.Dishes.List.SortByStatus = "max"
                } else {
                    Main.Config.Dishes.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Dishes.List.SortBy = j;
        if (!h) {
            Main.SaveConfig()
        }
        var pl = false;
        var pg ='';
        var l = new Array();
        //alert(JSON.stringify(this.Dishes))
        for (var n in this.Dishes) {
            
            pl = false;
            pg = document.getElementById("search").value.toLowerCase();
            if (String(this.Dishes[n].id).toLowerCase().indexOf(pg) >= 0 || this.Dishes[n].name.toLowerCase().indexOf(pg) >= 0 || this.Dishes[n].category.toLowerCase().indexOf(pg) >= 0) {
                pl = true;
                l.push(this.Dishes[n])
            }
            
            if(pl){
            //alert( this.Dishes[n].currency)
            k +='<tr >'
            k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand">' + this.Dishes[n].id +'</td>' 
            k +='<td><input type="checkbox" class="productselement hand" value="' + this.Dishes[n].id + '"></td>'
            k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand">'+ this.Dishes[n].name +'</td>'
            k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand">' + Main.NullToEmpty(this.Dishes[n].category) +'</td>'
            k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand">' +this.Dishes[n].currency+ + this.Dishes[n].price + '</td>'
			
			if(Main.configsettings == 1){
			k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand">'+ this.Dishes[n].stock_qty +'</td>'
			}
            if(Main.PointPermission=='1' && IS_SCRIPTID == '0')
            {
        
            
            if(this.Dishes[n].points==null){
            k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand"></td>'    
            }
            else
            k +='<td onclick="Products.EditDish('+ this.Dishes[n].id +')" class="hand">' + this.Dishes[n].points + '</td>'
            } 
            k +='<td><div class="enebal" id="switch_' + this.Dishes[n].id + '"></div></td>'
            k +='</tr>'

            }
        }
        document.getElementById("dishes").innerHTML = k;
        
        var i = false;
        Switch.Init();
        for (n in l) {
            
            if (l[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switch_" + l[n].id, i);
            Switch.OnChange("switch_" + l[n].id, function (a, b) {
                Products.SetEnabled(a.replace("switch_", ""), b)
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
        $.post("lib/business.php", "f=DishSetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
            
        })
    },
    

    GetDishes: function (e, f) {
        
        if (Forms.Form.business.type == "create") {         
            if (Business.DishesIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchDishesDataByBusiness&id=" + Business.id, function (a) {
                
                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        Products.Dishes = JSON.parse(a);
                        if (f) {
                            Products.PupulateDishesTable(Main.Config.Dishes.List.SortBy, true)
                        } else {
                            Popup.Show(700, 693, e, Business.SaveMenu, null, MenuCatalog.PreEditMenu)
                        }
                    } else {
                        Business.Dishes = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 693, e, Business.SaveMenu, null, MenuCatalog.PreEditMenu)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchDishesDataByBusiness&id=" + Business.id, function (a) {
                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    Products.Dishes = JSON.parse(a);
                    if (f) {
                        Products.PupulateDishesTable(Main.Config.Dishes.List.SortBy, true)
                    } else {
                        Popup.Show(e,MenuCatalog.PreEditMenu)
                    }
                }
            })
        }
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
        default:
            var f = MultipleInput.GetTagsIds(d);
            if (f.length > 0) {
                Forms.UpdateValue(this.ActiveForm, d, JSON.stringify(f))
            } else {
                Forms.UpdateValue(this.ActiveForm, d, "")
            }
            Products.PreValidation()
            break
        }
    },
    EditDish: function (h, l) {
        //$('div[id*=newpopup]').remove();
        var i = false;
        if (h) {
            i = true;
            Visuals.ForceMainButtonCancelEvent = l
        } else {
            var j = Main.GetMarkedCheckBoxesValuesByClass('productselement');
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
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetDishData&id=" + h, function (a) {                
                if (a != "") {
                    $.post("lib/business.php", "f=FetchAllCategory&id=" + Business.id, function (b) {           
                            Products.categories = JSON.parse(b); 
                            k.DishForm(JSON.parse(a))  

                    }); 
                    
                } else {
                    alert("Error")
                }
            })
        }
    },

    ProductCatagoriesDish: function(){
        $.post("lib/business.php", "f=FetchAllCategory&id=" + Business.id, function (a) {           
                Products.categories = JSON.parse(a); 
                Products.DishForm()                
        }); 
    },
     jsFunction:function(value)
{
    //alert(value);
    document.getElementById("catvalue").value= value;
},

    show_id: function(id){
        //alert()
        // $("#dish_category").change(function () {
        //         alert($(this).val());
        //     });
        var b = document.getElementById("dish_category").value;
        var c=document.getElementById("catvalue").value;
         $.post("lib/business.php", "f=FetchAllBusinessCategoryIDData&data=" + id+"&id=" + Main.businessid, function (d) {      
            if (d != "") {
              var f = JSON.parse(d);
              //alert(JSON.stringify(f))
             var e = document.getElementById("dish_category");
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
                    else
                    {
                       
                        //alert(c)
                        if (f[d].id == c) {
                            h = d;
                            j = true
                        }
                    }
                    
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
                
                if (b && j) {               
                    e.selectedIndex = parseInt(h) + 1
                }else if(c && j){
                    e.selectedIndex = parseInt(h) + 1
                }
                 else {
                    Forms.Form.dish.fields.dish_category.value = "";                   
                }
                
                
             }
        });
        
        
        
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("dish_name_"+flaginfo[Z].id).style.display  = "none";
            document.getElementById("dish_description_"+flaginfo[Z].id).style.display  = "none";
            if(document.getElementById("dish_origin_winelibary_"+flaginfo[Z].id)){
            document.getElementById("dish_origin_winelibary_"+flaginfo[Z].id).style.display  = "none";
            }
            if(document.getElementById("dish_seller_winelibary_"+flaginfo[Z].id)){
            document.getElementById("dish_seller_winelibary_"+flaginfo[Z].id).style.display  = "none";
            }
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("dish_name_"+id).style.display  = "block";
        document.getElementById("dish_description_"+id).style.display  = "block";
        if(document.getElementById("dish_origin_winelibary_"+id)){
        document.getElementById("dish_origin_winelibary_"+id).style.display  = "block";
        }
        if(document.getElementById("dish_seller_winelibary_"+id)){
        document.getElementById("dish_seller_winelibary_"+id).style.display  = "block";
        }
    },
         
        DishForm: function (p) {
            $('div[id*=newpopup]').remove();
        Forms.Clean("dish", "popupmainbuttonok");
        
        if (p) {
            Forms.Form.dish.type = "modify";
            Forms.Form.dish.id = p.id
            
        } else {
            p = new Object();
            Forms.Form.dish.type = "create";
            /*if (Forms.Form.business.type == "create") {           
            Forms.CreateValue("dish", "dish_businessddd", Business.id);             
            }*/
            //Forms.CreateValue("dish", "dish_business", Business.id,true);  
            /*if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("dish", "dish_business", Business.id, false, true, true)
            }else{
            Forms.CreateValue("dish", "dish_business", Business.id, false, true, true)  
                
            }*/
        }
        Forms.Form.dish.dish = p;
        this.ActiveForm = "dish";
          MultipleInput.AddListener("tagschange", "Products.MultiInputTagsChange");
        var c = ""; 
       if (Forms.Form.dish.type == "create") {
        c +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT'] ?></h3>'
       }
       else
       {
        c +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_EDIT_HEADING'] ?></h3>'   
       }
       
        c +='<div class="row">'
        c +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var m = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                Products.langdefault = flaginfo[Z].admindefaulelang;                             
                c+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Products.show_id('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'
            }else{
                c+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Products.show_id('+flaginfo[Z].id+')"><img src="'+m+'"" ></a></li>'  
            }
        }
        c +='</ul>'
        c +='</div>'
        <!--row-->
        c +='<input type="hidden" id="catvalue" value="'+p.category+'">'
        c +='<div class="row">'
        c +='<div class="col-md-4">'
        c +='<div class="form-group">'
        if(IS_SCRIPTID==4){
            var imgtxt = "<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD_LABEL_FOR_WINE'] ?>";
        }else{
            var imgtxt = "<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD_LABEL'] ?>";
        }
        var m = "";
        if (p.id) {
          if(p.isimg == 0) {
            m = "../admin/images/dummy/product-img.png";
          } else {
            m = "../panel/images/dishes/" + Main.NullToEmpty(p.id) + "/1/panel.jpg?c=" + new Date().getTime();
          }
        }else {
          m = "../admin/images/dummy/product-img.png";
        }
        
        
        c +='<span class=" clearfix productupload"><small style="font-weight:400">'+imgtxt+'</small><img id="uploadPreview3" src="' + m + '"  >'
        if(p.isimg == 1){
        c +='<span class="deleteimg" onclick="Products.DeleteImg('+p.id+',1); return false;"></span>'  
        }
        c +='</span>'
        c +='<div class="input-group">'
        c +='<input type="text" class="form-control" id="imagefile3" readonly>'
        c +='<span class="input-group-btn">'
        c +='<span class="btn btn-default btn-file btn-light rounded">'
        c +='<form id="uform_bimg3" name="uform_bimg3" enctype="multipart/form-data" method="post" >';
        c +='<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD'] ?><input id="uploadImage3" type="file" name="uploadImage" onChange="Products.PreviewImage(3);" >'
        c += '<input id="showImage3" name="showImage3" type="hidden" value=""  />';
        c += '<input type="submit" name="submit" onclick="Products.triggerImageupload(3)" style="display:none" />';
        c += '</form>';
        c +='</span>'
        c +='</span>'
        c +='</div>'
         <!-- .input-group -->                             
        c +='</div>'
        c +='</div>'<!--col-md-4-->
        c +='<div class="col-md-4">'
        c +='<div class="form-group">'
        var m1 = "";
        if (p.id) {
          if(p.isimg2 == 0) {
            m1 = "../admin/images/dummy/product-img.png";
          } else {
            m1 = "../panel/images/dishes/" + Main.NullToEmpty(p.id) + "/2/panel.jpg?c=" + new Date().getTime();
          }
        }else {
          m1 = "../admin/images/dummy/product-img.png";
        }
        c +='<span class=" clearfix productupload"><small style="font-weight:400">'+imgtxt+'</small><img id="uploadPreview4" src="' + m1 + '"  >'
        if(p.isimg2 == 1){
        c +='<span class="deleteimg" onclick="Products.DeleteImg('+p.id+',2); return false;"></span>'  
        }
        c +='</span>'
        c +='<div class="input-group">'
        c +='<input type="text" class="form-control" id="imagefile4" readonly>'
        c +='<span class="input-group-btn">'
        c +='<span class="btn btn-default btn-file btn-light rounded">'
        c +='<form id="uform_bimg4" name="uform_bimg4" enctype="multipart/form-data" method="post" >';
        c +='<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD'] ?><input id="uploadImage4" type="file" name="uploadImage1" onChange="Products.PreviewImage(4);" >'
        c += '<input id="showImage4" name="showImage4" type="hidden" value=""  />';
        c += '<input type="submit" name="submit" onclick="Products.triggerImageupload(4)" style="display:none" />';
        c += '</form>';
        c +='</span>'
        c +='</span>'
        c +='</div>'
        <!-- input-group -->                              
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->
        c +='<div class="col-md-4">'
        c +='<div class="form-group">'
        var m2 = "";
        if (p.id) {
          if(p.isimg3 == 0) {
            m2 = "../admin/images/dummy/product-img.png";
          } else {
            m2 = "../panel/images/dishes/" + Main.NullToEmpty(p.id) + "/3/panel.jpg?c=" + new Date().getTime();
          }
        }else {
          m2 = "../admin/images/dummy/product-img.png";
        }
        c +='<span class=" clearfix productupload"><small style="font-weight:400">'+imgtxt+'</small><img id="uploadPreview5" src="' + m2 + '"  >'
        if(p.isimg3 == 1){
        c +='<span class="deleteimg" onclick="Products.DeleteImg('+p.id+',3); return false;"></span>'  
        }
        c +='</span>'
        c +='<div class="input-group">'
        c +='<input type="text" class="form-control" id="imagefile5" readonly>'
        c +='<span class="input-group-btn">'
        c +='<span class="btn btn-default btn-file btn-light rounded">'
        c +='<form id="uform_bimg5" name="uform_bimg5" enctype="multipart/form-data" method="post" >';
        c +='<?= $lang_resource['BUSINESS_TAB_PRODUCT_UPLOAD'] ?><input id="uploadImage5" type="file" name="uploadImage2" onChange="Products.PreviewImage(5);" >'
        c += '<input id="showImage5" name="showImage5" type="hidden" value=""  />';
        c += '<input type="submit" name="submit" onclick="Products.triggerImageupload(5)" style="display:none" />';
        c += '</form>';
        c +='</span>'
        c +='</span>'
        c +='</div>'<!-- input-group -->                              
        c +='</div>'
        c +='</div>'<!--col-md-4-->
        c +='</div>'<!--row-->
        
        c +='<div class="row">'
        
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_NAME'] ?></label>'
        Forms.CreateValue("dish", "dish_name", "",true)
        flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if (Forms.Form.dish.type == "create") {
                if(flaginfo[v].id == Products.langdefault){   
                    c +='<input type="text" id="dish_name_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="" />' 
                }else{
                    c +='<input type="text" id="dish_name_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[v].id == Products.langdefault){   
                    c +='<input type="text" id="dish_name_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.name[flaginfo[v].id])+'" />' 
                }else{
                    c +='<input type="text" id="dish_name_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.name[flaginfo[v].id])+'" style="display:none;" />' 
                }  
            }     
        }
        
        //c +=Forms.CreateInputPropertyPopup("dish", "dish_name",p.name, true,"Products.PreValidation()","","")
        c +='<small data-bv-validator="notEmpty" class="help-block" id="dish_name_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_NAME']?></small>'
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->

         c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_PRODUCT_OPTION'] ?> </label>'
        Forms.CreateValue("dish", "dish_extras", Main.NullToEmpty(p.extras));
        c +='<input type="text" id="dish_extras" />'
        c +='<small data-bv-validator="notEmpty" class="help-block" id="ingredients_text" style="color:#F00;display:none;"></small>'
        c +='</div>'
        c +='</div>'
        
        <!--col-md-4-->
        c +='</div>'
        <!--row-->


        c +='<div class="row">'
    
        
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_DESCRIPTION'] ?></label>'
        
        
        Forms.CreateValue("dish", "dish_description", "",true)
        
        flaginfo=Main.languageinfo;
        for(v in flaginfo){
            if (Forms.Form.dish.type == "create") {
                if(flaginfo[v].id == Products.langdefault){   
                    c +='<textarea id="dish_description_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"></textarea>' 
                }else{
                    c +='<textarea id="dish_description_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control" style="display:none;" /></textarea>' 
                }   
            }else{
                if(flaginfo[v].id == Products.langdefault){   
                    c +='<textarea id="dish_description_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control">'+Main.NullToEmpty(p.description[flaginfo[v].id])+'</textarea>' 
                }else{
                    c +='<textarea id="dish_description_'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control" style="display:none;">'+Main.NullToEmpty(p.description[flaginfo[v].id])+'</textarea>' 
                } 
            }     
        }
        
        
        //c +=Forms.CreateTextAreaPropertyPopup("dish", "dish_description", p.description, true,"")
        c +='<small data-bv-validator="notEmpty" class="help-block" id="description_text" style="color:#F00;display:none;"></small>'
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->
        
        
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_INGREDIENTS'] ?></label>'
        
        Forms.CreateValue("dish", "dish_ingredients", Main.NullToEmpty(p.ingredients))
        c +='<input type="text" id="dish_ingredients" />'
        c +='<small data-bv-validator="notEmpty" class="help-block" id="ingredients_text" style="color:#F00;display:none;"></small>'
        c +='</div>'
        c +='</div>'
        
        <!--col-md-4-->
        c +='</div>'
        <!--row-->


        //c +='<div class="row">'       
    
        var j = new Array();
        j.push(JSON.parse('{"id":"","caption":""}'));
        Products.categories.sort(Main.SortByProperty('name'));

        for(var pc in Products.categories){
            var n = new Object();
            n.id = Products.categories[pc].id;
            n.caption = Products.categories[pc].name;
            j.push(n);
        }
        
        
        c +='<div class="DishformSubcategory">'<!--row-->

        var dishrecsub = ExtraAdmin.DishformSubcategory(j,p);
        if(dishrecsub) {
        c +=dishrecsub;
        //Forms.CreateValue("catid", "cat_id", "",true)

  //       flaginfo=Main.languageinfo;
  //       for(v in flaginfo){
            
  //               if(flaginfo[v].id == Products.langdefault){   
  //                   c +='<input type="text" id="cat_id'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.name[flaginfo[v].id])+'"/>' 
  //               }else{
  //                   c +='<input type="text" id="cat_id'+flaginfo[v].id+'" onkeyup="Products.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(p.name[flaginfo[v].id])+'" style="display:none;" />' 
  //               }  
  //           }     
        

         }
        c +='</div>'
        
      /*  c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_CATEGORY'] ?></label>'
        c +=Forms.CreateSelectPropertyPopup("dish", "dish_category", j, p.category, true,"Products.PreValidation()")
        c +='<small data-bv-validator="notEmpty" class="help-block" id="category_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_CATEGORY']?></small>'
        c +='</div>'
        c +='</div>'*/<!--col-md-4-->
        
                
        /*c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_PRICE'] ?></label>'
        c +=Forms.CreateInputPropertyPopup("dish", "dish_price", p.price, true,"Products.PreValidation()",false, false, "return Main.IsNumberKey(event)","")
        c +='<small data-bv-validator="notEmpty" class="help-block" id="dish_price_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_PRODUCT_PRICE']?></small>'
        c +='</div>'
        c +='</div>'*/
        
        <!--col-md-4-->
        //c +='</div>'<!--row-->
        
        
        if(Main.configsettings == 1){    
    	<!--col-md-4-->
		c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_AVAILABLE_STOCK'] ?></label>'
        c +=Forms.CreateInputPropertyPopup("dish", "stock_qty", p.stock_qty, true,"Products.PreValidation()",false, false, "return Main.IsNumberKey(event)","")
        c +='<small data-bv-validator="notEmpty" class="help-block" id="stock_qty_text" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_AVAILABLE_STOCK']?></small>'
        c +='</div>'
        c +='</div>'
        c +='</div>'
		<!--col-md-4-->
		}
         
         c +='<div class="DishformExtraNew">'<!--row-->
        var dishrec = ExtraAdmin.Dishform(j,p);
        if(dishrec) {
        c +=dishrec;
        }
        c +='</div>'

       
         
        
        
        
        
        
        

        c +='<div class="row">'
        c +='<div class="col-md-6 col-md-offset-3">'
        if (Forms.Form.dish.type == "create") {
        c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Products.SaveDish()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_CREATE'] ?></button></center>'
        }else{
        c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Products.SaveDish()"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_UPDATE'] ?></button></center>'
        }
        c +='</div>'
        <!--col-md--->
                  
        c +='</div>'<!--row-->

       


        this.category = p.category;
        
        this.subcategory = p.subcategory;
       
        
        this.GetExtras(c)
        

    },
     GetIndexOnPropertyValueFound: function (b, a, d)
    {
        for (var c in b)
        {
            if (b[c][a] == d)
            {
                return c
            }
        }
        return -1
    },
    
    PreValidation: function(){
    var count = 0;  
    
         flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == Products.langdefault){
        if(document.getElementById("dish_name_"+flaginfo[Z].id).value == ""){
            $("#dish_name_text").show();
            $("#dish_name_"+flaginfo[Z].id).addClass("error-text-field");
            $("#dish_name_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
            $("#dish_name_text").hide();
            $("#dish_name_"+flaginfo[Z].id).addClass("success-text-field");
            $("#dish_name_"+flaginfo[Z].id).removeClass("error-text-field");
        }       
               
        }
        
        var namedata = document.getElementById("dish_name_"+flaginfo[Z].id).value;
            Products.namelang[flaginfo[Z].id] = namedata.split(",").join("@@@");
            
        /*var descriptiondata = document.getElementById("dish_description_"+flaginfo[Z].id).value;
            Products.descriptionlang[flaginfo[Z].id] = descriptiondata;*/
            
            var descriptiondata = document.getElementById("dish_description_"+flaginfo[Z].id).value;
    
           if(document.getElementById("dish_description_"+flaginfo[Z].id)) {
            if(descriptiondata !='')
            Products.descriptionlang[flaginfo[Z].id] = descriptiondata.split(",").join("@@@");
            else
             Products.descriptionlang[flaginfo[Z].id] = descriptiondata;
                
           }
           
           if(document.getElementById("dish_origin_winelibary_"+flaginfo[Z].id)){
               var origindata = document.getElementById("dish_origin_winelibary_"+flaginfo[Z].id).value;
               if(origindata !='')
            Products.origin[flaginfo[Z].id] = origindata.split(",").join("@@@");
            else
             Products.origin[flaginfo[Z].id] = origindata;
                
           }
           if(document.getElementById("dish_seller_winelibary_"+flaginfo[Z].id)){
               var sellerdata = document.getElementById("dish_seller_winelibary_"+flaginfo[Z].id).value;
               if(sellerdata !='')
            Products.seller[flaginfo[Z].id] = sellerdata.split(",").join("@@@");
            else
             Products.seller[flaginfo[Z].id] = sellerdata;
                
           }

    }

        if(document.getElementById("dish_category").value == ""){
            $("#category_text").show();
            $("#dish_category").addClass("error-text-field");
            $("#dish_category").removeClass("success-text-field");
            count ++;
        }else{
            $("#category_text").hide();
            $("#dish_category").addClass("success-text-field");
            $("#dish_category").removeClass("error-text-field");
        }
         if(document.getElementById("dish_price").value == ""){
             var e = MultipleInput.GetTagsIds("dish_extras");
            if (e.length > 0) {               
                $.post("lib/business.php", "f=FetchOptionTotalPrice&ids=" + JSON.stringify(e), function (a) {
                    if(a <= 0){
                        $("#dish_price_text").show();
                        $("#dish_price").addClass("error-text-field");
                        $("#dish_price").removeClass("success-text-field");
                        count ++;
                    }else{
                        $("#dish_price_text").hide();
                        $("#dish_price").addClass("success-text-field");
                        $("#dish_price").removeClass("error-text-field");
                    }
                });                              
            }else{
                $("#dish_price_text").show();
                $("#dish_price").addClass("error-text-field");
                $("#dish_price").removeClass("success-text-field");
                count ++;
            }            
            
        }else{
            $("#dish_price_text").hide();
            $("#dish_price").addClass("success-text-field");
            $("#dish_price").removeClass("error-text-field");
        }
        if(Main.configsettings == 1){	
        if(document.getElementById("stock_qty").value == ""){
            $("#stock_qty_text").show();
            $("#stock_qty").addClass("error-text-field");
            $("#stock_qty").removeClass("success-text-field");
            count ++;
        }else{
            $("#stock_qty_text").hide();
            $("#stock_qty").addClass("success-text-field");
            $("#stock_qty").removeClass("error-text-field");
        }
		}
		
        if(count == 0)
            return true
        else 
            return false
        
       
    },
    
    
    
    
     New: function () {
        if (Main.User.level < 2) {
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchAllCategoriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"2"}]}]', "Business.PreNew")
        } else {
            Main.BulkRequest('data=[{"operation":"FetchAllCategoriesData"}]', "Business.PreNew")
        }
    },
    
    PreNew: function (b) {
        
        if (b == "") {
            alert("Error")
        }
        b = JSON.parse(b);
         if (Main.User.level < 2) {
        Main.Franchises = b.franchises;
        this.Providers = b.users;
        
         }
        Main.Countries = b.countries;
        this.Categories = b.categories;
        
        this.Form()
    },
     GetExtras: function (e, f) {
        
        
        if (Forms.Form.business.type == "create") {
            
            
            if (Business.ExtrasIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchExtrasDataByIds&ids=" + Business.ExtrasIds, function (a) {
                
              
                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        
                        Business.Extras = JSON.parse(a);
                        if (f) {
                            
                            Business.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)
                        } else {
                             Popup.Show(e,Business.PreEditDish)
                        }
                    } else {
                        Business.Extras = null
                    }
                })
            } else {
                if (!f) {
                     Popup.Show(e,Products.PreEditDish)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchExtrasDataByBusiness&id=" + Business.id, function (a) {
           
                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {

                    <!--%PRODUCT OPTION%-->
                    data=JSON.parse(a);
                    Business.Extras = JSON.parse(a);

                     if(data['id']){
                    $.post("lib/business.php", "f=GetExtrasDetails&data=" + data['id'], function (b) {

/*
                        Business.Extras = JSON.parse(a);
                        Business.ExtrasDetails=JSON.parse(b);
*/
                        console.log(b);
//                        console.log(Business.Extras);
                    });
                     }
                    <!--%PRODUCT OPTION%-->

                    if (f) {
                        Business.PupulateExtrasTable(Main.Config.Extras.List.SortBy, true)
                    } else {
                        
                        Popup.Show(e,Products.PreEditDish)
                    }
                    
                    if (Products.subcategory !=null) {
                        Products.PopulateSubCateSelect(Products.category, Products.subcategory)
                    }
                }
            })
            
        }
        
    },
    
     PreEditDish: function () {
        
        MultipleInput.Init("dish_ingredients", []);
        MultipleInput.Init("dish_extras", Business.Extras, true);
        if (Forms.Form.dish.type == "modify") {
            if (Forms.Form.dish.dish.extras != "") {
                var d = JSON.parse(Forms.Form.dish.dish.extras);
                for (var e in d) {
                    MultipleInput.AddTagById("dish_extras", d[e])
                }
                Forms.Form.dish.fields.dish_extras.save = false
            }
            if (Forms.Form.dish.dish.ingredients != "") {
                var f = JSON.parse(Forms.Form.dish.dish.ingredients);
                for (e in f) {
                    MultipleInput.AddTagByElem("dish_ingredients", {
                        name: f[e]
                    })
                }
                Forms.Form.dish.fields.dish_ingredients.save = false
            }
            
        }
        
        
        $("#dish_name").focus()
    },
    
    
     SaveDish: function () {
          
         if(Products.PreValidation() != true){
            return false     
         }
         
                
            Forms.CreateValue("dish", "dish_business", Business.id);            
    
        
        Forms.UpdateValue("dish", "dish_name", Products.namelang,true);
        //Forms.UpdateValue("dish", "dish_business", Business.id,true); 
        var prob = "";
        var count1 = 1;
        prob +='|';
        
        for(var x in Products.descriptionlang){

            prob += Products.descriptionlang[x];
            if(count1<Products.descriptionlang.length){
                prob +='|';
                count1++;
            }
        }
        
        Forms.UpdateValue("dish", "dish_description", Products.descriptionlang,true);
        
        
        if(Products.origin.length != 0){
        Forms.UpdateValue("dish", "dish_origin_winelibary", Products.origin,true);  
        }
        if(Products.seller.length != 0){
        Forms.UpdateValue("dish", "dish_seller_winelibary", Products.seller,true);  
        }
        
        
        delete Forms.Form.dish.dish;
        Forms.Form.dish.fields = Main.RemoveFromPropertyNames(Forms.Form.dish.fields, "dish_");
       // alert(JSON.stringify(Forms.Form.dish))
        if(Forms.Form.dish.fields.price.value != ""){
            Forms.Form.dish.fields.price.value = Main.FixToDecimal(Forms.Form.dish.fields.price.value);
        }
       
        
        
        
    
        if(document.getElementById("showImage3").value !="") {
            Forms.Form.dish.image1 = document.getElementById("showImage3").value;
            }
        if(document.getElementById("showImage4").value !="") {
            Forms.Form.dish.image2 = document.getElementById("showImage4").value;
        }
        if(document.getElementById("showImage5").value !="") {
            Forms.Form.dish.image3 = document.getElementById("showImage5").value;
        }
        
      
        Main.Loading();
        var d = new Date().getTime();
        Main.Aid = d;
        
        for(var s in Forms.Form.dish.fields){           
            Forms.Form.dish.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.dish.fields[s].value)))
            Forms.Form.dish.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.dish.fields[s].ivalue)))

            Forms.Form.dish.fields[s].value = Forms.Form.dish.fields[s].value.split("+").join("@@");
            Forms.Form.dish.fields[s].ivalue = Forms.Form.dish.fields[s].ivalue.split("+").join("@@");
        }
        
        
        $.post("lib/business.php", "f=SaveDish&data=" + JSON.stringify(Forms.Form.dish), function (a) {
        
            if (d != Main.Aid) {
                return
            }
            Main.Ready();
            if (e) {
                if (Main.IsNumber(a)) {
                    if (Business.DishesIds) {
                        Business.DishesIds += "," + a
                    } else {
                        Business.DishesIds = a
                    }
                }
            }
            Popup.Close(Products.DishesIds);
             
            Products.GetDishes(null, true)
        });
        Forms.Clean("dish")
    },
    SubCategorySelected: function (a) {
        Products.PopulateSubCateSelect(a.options[a.selectedIndex].value)
    },
    PopulateSubCateSelect: function (c, b) {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/business.php", "f=FetchAllSubCateIDData&data=" + Business.id+"&id="+c, function (g) {

            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (g != "") {
                var f = JSON.parse(g);
                //f.sort(Main.SortByProperty("city"));
                var e = document.getElementById("dish_subcategory");
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
                    
                    Forms.Form.dish.fields.dish_subcategory.value = "";
                    
                }
            }
        })
    },
    
    DeleteDish: function () {
        var c = Main.GetMarkedCheckBoxesValuesByClass('productselement');
        if (c.length == 0) {
            alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_CHECBOX_SELECT']?>");
            return
        }
        var d = new Object();
        d.ids = c;
        
        $.fn.jAlert({
            'message': '<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PRODUCT']?>',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                    $.post("lib/business.php", "f=DeleteDish&data=" + JSON.stringify(d), function (e) {
                        Products.GetDishes(null,true)
                        alert('<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_WARNING_DELETE_PERMANENTLY']?>');
                    
                    });
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false
            
        });
            
            
       // Main.Request("business", null, "f=DeleteDish&data=" + JSON.stringify(d), "Products.GetDishes(null,true)")
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
            
            
        };
        
    },
    
    FileCsvDish: function () {
        
        
        $('div[id*=newpopup]').remove();    
        
        var c = "";
        
        c +='<h3 class="popup-heading"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_UPLOAD_HEADING']?></h3>'
        c +='<form name="zipcode" id="csvzipcode" method="post" action="javascript:Products.csvFile()" enctype="multipart/form-data" >'
        c +='<div class="row">'
        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_UPLOAD']?></label>'
        c +='<input name="csvfile"  type="file" id="csvpath"  class="form-control" accept=".csv">'
        c +='<input type="hidden" value="'+Main.businessid +'" name="businessid" id="businessid" >'
        c +='<small data-bv-validator="notEmpty" class="help-block" id="csvpath_text" style="color:#F00;display:none;"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PLEASE_CSV_UPLOAD']?></small>'
        c +='<small data-bv-validator="notEmpty" class="help-block" id="csvpath_ext_text" style="color:#F00;display:none;"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PLEASE_CSV_UPLOAD_ONLY']?></small>'
        c +='</div>'
        c +='</div>'
        <!--col-md-12-->
        c +='</div>'
        <!--row-->
        
        c +='<div class="row">'
        c +='<div class="col-md-6 col-md-offset-3">'
        c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" ><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_PRODUCT_CREATE']?></button></center>'
        c +='</div>'
        <!--col-md--->
        c +='</form>'
        c +='</div>'
        <!--row-->
        
        
        Popup.Show(c);

    
    },
     csvFile: function () {

        var csvfile=document.getElementById("csvpath").value;
        var ext = csvfile.substring(csvfile.lastIndexOf('.') + 1);
        if (ext == "csv") {
    //    $("#csvzipcode").submit(function (event) {
            $("#csvpath_ext_text").hide();
            $("#csvpath").addClass("success-text-field");
            $("#csvpath").removeClass("error-text-field");
            Main.Loading()   
        //  event.preventDefault();
            var formData = new FormData($("#csvzipcode")[0]);
          $.ajax({
            url: 'csv/product_uplode.php',
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
               html +=executeitem +' <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CSV_SUCCESSFULL_UPLOAD']?> ';   
               if(skipitem !=0){
                 html +='<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CSV_EXIST_AND']?> '+skipitem +' <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CSV_EXIST_UPLOAD']?>';   
               }
             }else{
               if(skipitem !=0){
                 html += skipitem +' <?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CSV_EXIST_UPLOAD']?>';  
               }
             }
             Popup.Close();
             Main.Ready();
             //alert(html)
             Products.GetDishes(null, true);
            },
            error: function(){
                alert("<?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_CSV_UPLOAD_ERROR']?>");
            }
      //  });
        
        });
        
        }else{
            $("#csvpath_ext_text").show();
             $("#csvpath").addClass("error-text-field");
             $("#csvpath").removeClass("success-text-field");
        }
    },
    DeleteImg: function(id,val){
        $.fn.jAlert({
            'message': 'Are you Sure Want to Delete This Image',
            'btn': [
                {'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                    $.post("lib/business.php", "f=DeleteImage&id=" + id+"&imageid="+val, function (e) {
                        $.post("lib/business.php", "f=GetDishData&id=" + id, function (a) {                
                            if (a != "") {
                                $.post("lib/business.php", "f=FetchAllCategory&id=" + Main.businessid, function (b) {           
                                        Products.categories = JSON.parse(b); 
                                        Popup.Close();
                                        Products.DishForm(JSON.parse(a))                  
                                }); 
                                
                            } else {
                                alert("Error")
                            }
                        });                             
                    });
                } },
                {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
            ],
            'closeBtn': false            
        });
    }
};
